"""Persistent systems, scheduler and watering engine."""

from __future__ import annotations

import asyncio
from copy import deepcopy
from datetime import datetime, timedelta
import logging
from typing import Any
from uuid import uuid4

from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    DEFAULT_SYSTEM,
    EVENT_UPDATED,
    LOG_LIMIT,
    SCHEDULER_INTERVAL_SECONDS,
    STORAGE_KEY,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)


class WateringManager:
    """Manage watering systems and safely execute runs."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.systems: dict[str, dict[str, Any]] = {}
        self.logs: list[dict[str, Any]] = []
        self.active_runs: dict[str, asyncio.Task[None]] = {}
        self._last_schedule_keys: dict[str, str] = {}
        self._cancel_scheduler = None

    async def async_setup(self) -> None:
        """Load stored data and start the scheduler."""
        data = await self.store.async_load() or {}
        self.systems = data.get("systems", {})
        self.logs = data.get("logs", [])[-LOG_LIMIT:]
        self._cancel_scheduler = async_track_time_interval(
            self.hass,
            self._async_scheduler_tick,
            timedelta(seconds=SCHEDULER_INTERVAL_SECONDS),
        )

    async def async_unload(self) -> None:
        """Stop timers and active runs."""
        if self._cancel_scheduler:
            self._cancel_scheduler()
            self._cancel_scheduler = None
        for task in list(self.active_runs.values()):
            task.cancel()
        if self.active_runs:
            await asyncio.gather(*self.active_runs.values(), return_exceptions=True)

    def snapshot(self) -> dict[str, Any]:
        """Return JSON-safe application state."""
        return {
            "systems": list(self.systems.values()),
            "logs": self.logs[-100:],
            "active_system_ids": list(self.active_runs),
        }

    async def async_create_system(self, values: dict[str, Any]) -> dict[str, Any]:
        """Create a watering system."""
        system = deepcopy(DEFAULT_SYSTEM)
        system.update({key: value for key, value in values.items() if key in DEFAULT_SYSTEM})
        system["id"] = uuid4().hex
        now = dt_util.utcnow().isoformat()
        system["created_at"] = now
        system["updated_at"] = now
        system["last_run_at"] = None
        system["last_duration"] = None
        system["last_reason"] = None
        self.systems[system["id"]] = system
        await self._async_changed()
        return system

    async def async_update_system(
        self, system_id: str, values: dict[str, Any]
    ) -> dict[str, Any]:
        """Update a watering system."""
        system = self._get_system(system_id)
        protected = {"id", "created_at", "last_run_at", "last_duration", "last_reason"}
        for key, value in values.items():
            if key not in protected and key in DEFAULT_SYSTEM:
                system[key] = value
        system["updated_at"] = dt_util.utcnow().isoformat()
        await self._async_changed()
        return system

    async def async_delete_system(self, system_id: str) -> None:
        """Delete a stopped watering system."""
        if system_id in self.active_runs:
            raise ValueError("system_is_running")
        for active_id in self.active_runs:
            active = self.systems.get(active_id)
            if active and active.get("simultaneous_group") == system.get("simultaneous_group"):
                raise ValueError("watering_group_is_busy")
        self._get_system(system_id)
        del self.systems[system_id]
        self.logs = [log for log in self.logs if log["system_id"] != system_id]
        await self._async_changed()

    async def async_run_system(self, system_id: str, trigger: str) -> dict[str, Any]:
        """Evaluate and start a watering system."""
        system = self._get_system(system_id)
        if system_id in self.active_runs:
            raise ValueError("system_is_running")
        if not system["valve_entity"]:
            raise ValueError("valve_entity_required")

        decision = self._calculate_decision(system, trigger)
        if decision["duration"] <= 0:
            await self._async_log(system, trigger, "skipped", decision)
            return decision

        task = self.hass.async_create_task(
            self._async_execute_run(system, trigger, decision),
            f"watering_manager_run_{system_id}",
        )
        self.active_runs[system_id] = task
        await self._async_notify()
        return decision

    async def async_stop_system(self, system_id: str) -> None:
        """Stop an active run and close its valve."""
        system = self._get_system(system_id)
        task = self.active_runs.get(system_id)
        if task:
            task.cancel()
        await self._async_set_valve(system["valve_entity"], False)

    def _calculate_decision(self, system: dict[str, Any], trigger: str) -> dict[str, Any]:
        """Calculate duration and preserve every input used by the decision."""
        if not system["enabled"] and trigger == "schedule":
            return {"duration": 0, "reason": "system_disabled", "inputs": {}}

        if trigger == "manual" or system["mode"] == "manual":
            duration = float(system["manual_duration"])
            return {
                "duration": self._bounded_duration(system, duration),
                "reason": "manual_duration",
                "inputs": {},
            }

        readings = [
            self._read_sensor(system.get("moisture_sensor_1", ""), system),
            self._read_sensor(system.get("moisture_sensor_2", ""), system),
        ]
        valid = [reading for reading in readings if reading["valid"]]
        inputs: dict[str, Any] = {"moisture": readings}

        if not valid:
            if system["sensor_failure"] == "base_duration":
                return {
                    "duration": self._bounded_duration(system, system["base_duration"]),
                    "reason": "sensors_unavailable_base_duration",
                    "inputs": inputs,
                }
            return {"duration": 0, "reason": "sensors_unavailable", "inputs": inputs}

        values = [reading["value"] for reading in valid]
        dry = float(system["dry_threshold"])
        wet = float(system["wet_threshold"])

        if len(values) == 2 and min(values) < dry <= max(values):
            duration = float(system["conflict_duration"])
            reason = "sensor_conflict_short_run"
        elif all(value >= wet for value in values):
            return {"duration": 0, "reason": "soil_wet", "inputs": inputs}
        else:
            average = sum(values) / len(values)
            if average <= dry:
                deficit_factor = 1 + min(0.5, (dry - average) / max(dry, 1) * 0.5)
                duration = float(system["base_duration"]) * deficit_factor
                reason = "soil_dry"
            else:
                ratio = (wet - average) / max(wet - dry, 1)
                duration = float(system["base_duration"]) * max(0.25, ratio)
                reason = "soil_partly_dry"

        weather = self._weather_adjustment(system)
        inputs["weather"] = weather
        duration *= weather["factor"]

        rain = self._read_numeric(system.get("rain_sensor", ""))
        inputs["rain_mm"] = rain
        exposure_factor = {"exposed": 1.0, "partial": 0.5, "covered": 0.0}.get(
            system["exposure"], 1.0
        )
        rain_reach = exposure_factor * float(system["rain_reach_percent"]) / 100
        if rain is not None and rain * rain_reach >= float(system["measured_rain_threshold"]):
            return {"duration": 0, "reason": "measured_rain", "inputs": inputs}

        if self._within_minimum_interval(system):
            return {"duration": 0, "reason": "minimum_interval", "inputs": inputs}

        return {
            "duration": self._bounded_duration(system, duration),
            "reason": reason,
            "inputs": inputs,
        }

    async def _async_execute_run(
        self, system: dict[str, Any], trigger: str, decision: dict[str, Any]
    ) -> None:
        """Run valve cycles and always close the valve."""
        system_id = system["id"]
        total_seconds = int(round(float(decision["duration"]) * 60))
        cycles = max(1, int(system["soak_cycles"]))
        cycle_seconds = max(1, total_seconds // cycles)
        started = dt_util.utcnow()
        loop = asyncio.get_running_loop()
        valve_opened_at: float | None = None
        total_open_seconds = 0.0
        status = "completed"
        try:
            for cycle in range(cycles):
                await self._async_set_valve(system["valve_entity"], True)
                valve_opened_at = loop.time()
                grace = min(int(system["flow_grace_seconds"]), cycle_seconds)
                await asyncio.sleep(grace)
                self._validate_flow(system)
                await asyncio.sleep(max(0, cycle_seconds - grace))
                await self._async_set_valve(system["valve_entity"], False)
                total_open_seconds += loop.time() - valve_opened_at
                valve_opened_at = None
                if cycle < cycles - 1:
                    await asyncio.sleep(int(system["soak_pause_minutes"]) * 60)
        except asyncio.CancelledError:
            status = "stopped"
        except Exception as err:
            status = "failed"
            decision = dict(decision)
            decision["reason"] = str(err)
            _LOGGER.exception("Watering run failed for %s", system["name"])
        finally:
            await self._async_set_valve(system["valve_entity"], False)
            if valve_opened_at is not None:
                total_open_seconds += loop.time() - valve_opened_at
            actual = total_open_seconds / 60
            finished_decision = dict(decision)
            finished_decision["actual_duration"] = round(actual, 1)
            system["last_run_at"] = started.isoformat()
            system["last_duration"] = finished_decision["actual_duration"]
            system["last_reason"] = decision["reason"]
            self.active_runs.pop(system_id, None)
            await self._async_log(system, trigger, status, finished_decision)

    async def _async_scheduler_tick(self, now: datetime) -> None:
        """Start systems whose local schedule matches the current minute."""
        local_now = dt_util.as_local(now)
        schedule_key = local_now.strftime("%Y-%m-%d %H:%M")
        current_time = local_now.strftime("%H:%M")
        for system_id, system in list(self.systems.items()):
            if not system["enabled"] or local_now.weekday() not in system["days"]:
                continue
            if system["start_time"] != current_time:
                continue
            if self._last_schedule_keys.get(system_id) == schedule_key:
                continue
            self._last_schedule_keys[system_id] = schedule_key
            try:
                await self.async_run_system(system_id, "schedule")
            except ValueError as err:
                _LOGGER.warning("Could not start %s: %s", system["name"], err)

    def _read_sensor(self, entity_id: str, system: dict[str, Any]) -> dict[str, Any]:
        if not entity_id:
            return {"entity_id": "", "valid": False, "reason": "not_configured"}
        state = self.hass.states.get(entity_id)
        if state is None or state.state in {"unknown", "unavailable"}:
            return {"entity_id": entity_id, "valid": False, "reason": "unavailable"}
        try:
            value = float(state.state)
        except ValueError:
            return {"entity_id": entity_id, "valid": False, "reason": "not_numeric"}
        age = dt_util.utcnow() - state.last_updated
        max_age = timedelta(minutes=int(system["sensor_max_age_minutes"]))
        if age > max_age:
            return {
                "entity_id": entity_id,
                "valid": False,
                "reason": "stale",
                "value": value,
                "age_minutes": round(age.total_seconds() / 60),
            }
        return {
            "entity_id": entity_id,
            "valid": True,
            "value": value,
            "age_minutes": round(age.total_seconds() / 60),
        }

    def _read_numeric(self, entity_id: str) -> float | None:
        if not entity_id:
            return None
        state = self.hass.states.get(entity_id)
        if state is None or state.state in {"unknown", "unavailable"}:
            return None
        try:
            return float(state.state)
        except ValueError:
            return None

    def _validate_flow(self, system: dict[str, Any]) -> None:
        """Abort when a configured flow sensor reports an unsafe value."""
        entity_id = system.get("flow_sensor", "")
        if not entity_id:
            return
        flow = self._read_numeric(entity_id)
        if flow is None:
            raise RuntimeError("flow_sensor_unavailable")
        if flow < float(system["flow_minimum"]):
            raise RuntimeError("flow_too_low")
        if flow > float(system["flow_maximum"]):
            raise RuntimeError("flow_too_high")

    def _weather_adjustment(self, system: dict[str, Any]) -> dict[str, Any]:
        entity_id = system.get("weather_entity", "")
        state = self.hass.states.get(entity_id) if entity_id else None
        if state is None:
            return {"factor": 1.0, "condition": None, "temperature": None}
        temperature = state.attributes.get("temperature")
        condition = state.state
        raw_factor = 1.0
        if isinstance(temperature, (int, float)):
            if temperature >= 32:
                raw_factor += 0.2
            elif temperature >= 27:
                raw_factor += 0.1
            elif temperature <= 15:
                raw_factor -= 0.15
        if condition in {"sunny", "clear-night"}:
            raw_factor += 0.1
        elif condition in {"rainy", "pouring", "snowy", "snowy-rainy"}:
            raw_factor -= 0.35
        sensitivity = float(system["weather_sensitivity"]) / 100
        factor = 1 + (raw_factor - 1) * sensitivity
        return {
            "factor": round(max(0.5, min(1.5, factor)), 2),
            "condition": condition,
            "temperature": temperature,
        }

    def _within_minimum_interval(self, system: dict[str, Any]) -> bool:
        last_run = system.get("last_run_at")
        if not last_run:
            return False
        try:
            last = datetime.fromisoformat(last_run)
        except ValueError:
            return False
        return dt_util.utcnow() - last < timedelta(
            hours=float(system["minimum_interval_hours"])
        )

    def _bounded_duration(self, system: dict[str, Any], duration: float) -> float:
        return round(
            max(
                float(system["minimum_duration"]),
                min(float(system["maximum_duration"]), float(duration)),
            ),
            1,
        )

    async def _async_set_valve(self, entity_id: str, open_valve: bool) -> None:
        domain = entity_id.split(".", 1)[0]
        if domain == "valve":
            service = "open_valve" if open_valve else "close_valve"
        else:
            domain = "homeassistant"
            service = "turn_on" if open_valve else "turn_off"
        await self.hass.services.async_call(
            domain,
            service,
            {"entity_id": entity_id},
            blocking=True,
        )

    async def _async_log(
        self,
        system: dict[str, Any],
        trigger: str,
        status: str,
        decision: dict[str, Any],
    ) -> None:
        self.logs.append(
            {
                "id": uuid4().hex,
                "system_id": system["id"],
                "system_name": system["name"],
                "timestamp": dt_util.utcnow().isoformat(),
                "trigger": trigger,
                "mode": system["mode"],
                "status": status,
                "reason": decision["reason"],
                "planned_duration": decision["duration"],
                "actual_duration": decision.get("actual_duration"),
                "inputs": decision.get("inputs", {}),
            }
        )
        self.logs = self.logs[-LOG_LIMIT:]
        await self._async_changed()

    async def _async_changed(self) -> None:
        await self.store.async_save({"systems": self.systems, "logs": self.logs})
        await self._async_notify()

    async def _async_notify(self) -> None:
        self.hass.bus.async_fire(EVENT_UPDATED, self.snapshot())

    def _get_system(self, system_id: str) -> dict[str, Any]:
        system = self.systems.get(system_id)
        if system is None:
            raise ValueError("system_not_found")
        return system
