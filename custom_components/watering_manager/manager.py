"""Persistent systems, scheduler and watering engine."""

from __future__ import annotations

import asyncio
import logging
from contextlib import suppress
from copy import deepcopy
from datetime import UTC, date, datetime, timedelta
from typing import Any
from uuid import uuid4

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    DATA_SCHEMA_VERSION,
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
        self.persisted_runs: dict[str, dict[str, Any]] = {}
        self.pending_checks: dict[str, dict[str, Any]] = {}
        self.calibrations: dict[str, dict[str, Any]] = {}
        self.aggregates: dict[str, dict[str, dict[str, Any]]] = {}
        self.notification_logs: list[dict[str, Any]] = []
        self.battery_alerts: dict[str, bool] = {}
        self._post_check_tasks: dict[str, asyncio.Task[None]] = {}
        self._calibration_tasks: dict[str, asyncio.Task[None]] = {}
        self._watchdog_tasks: dict[str, asyncio.Task[None]] = {}
        self._watchdog_failures: set[str] = set()
        self._last_schedule_keys: dict[str, str] = {}
        self._cancel_scheduler = None

    async def async_setup(self) -> None:
        """Load stored data and start the scheduler."""
        data = await self.store.async_load() or {}
        legacy_data_removed = "water_balances" in data
        self.systems = data.get("systems", {})
        for system in self.systems.values():
            for key, value in DEFAULT_SYSTEM.items():
                system.setdefault(key, deepcopy(value))
            legacy_data_removed |= self._remove_legacy_rain_settings(system)
            legacy_data_removed |= self._remove_legacy_et_settings(system)
            legacy_data_removed |= self._migrate_notification_target(system)
        self.logs = data.get("logs", [])[-LOG_LIMIT:]
        self.persisted_runs = data.get("active_runs", {})
        self.pending_checks = data.get("pending_checks", {})
        self.calibrations = data.get("calibrations", {})
        self.aggregates = data.get("aggregates", {})
        for days in self.aggregates.values():
            for bucket in days.values():
                if "moisture_sum" in bucket or "moisture_count" in bucket:
                    bucket.pop("moisture_sum", None)
                    bucket.pop("moisture_count", None)
                    legacy_data_removed = True
                for index in (1, 2):
                    bucket.setdefault(f"moisture_{index}_sum", 0.0)
                    bucket.setdefault(f"moisture_{index}_count", 0)
        self.notification_logs = data.get("notification_logs", [])[-200:]
        self.battery_alerts = data.get("battery_alerts", {})
        if not self.aggregates and self.logs:
            self._rebuild_aggregates()
        await self._async_recover_interrupted_runs()
        self._recover_calibration_states()
        self._restore_pending_checks()
        if legacy_data_removed:
            await self._async_save()
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
        for task in [
            *self._post_check_tasks.values(),
            *self._calibration_tasks.values(),
            *self._watchdog_tasks.values(),
        ]:
            task.cancel()
        tasks = [
            *self.active_runs.values(),
            *self._post_check_tasks.values(),
            *self._calibration_tasks.values(),
            *self._watchdog_tasks.values(),
        ]
        if tasks:
            await asyncio.gather(*tasks, return_exceptions=True)

    def snapshot(self) -> dict[str, Any]:
        """Return JSON-safe application state."""
        return {
            "systems": list(self.systems.values()),
            "logs": self.logs[-LOG_LIMIT:],
            "active_system_ids": list({*self.active_runs, *self._calibration_tasks}),
            "diagnostics": {
                system_id: self._diagnostics(system)
                for system_id, system in self.systems.items()
            },
            "calibrations": self.calibrations,
            "pending_checks": list(self.pending_checks.values()),
            "aggregates": self.aggregates,
            "schema_version": DATA_SCHEMA_VERSION,
            "notification_logs": self.notification_logs[-100:],
            "battery_alerts": self.battery_alerts,
        }

    async def async_create_system(self, values: dict[str, Any]) -> dict[str, Any]:
        """Create a watering system."""
        system = deepcopy(DEFAULT_SYSTEM)
        system.update(
            {key: value for key, value in values.items() if key in DEFAULT_SYSTEM}
        )
        self._validate_system(system)
        system["id"] = uuid4().hex
        now = datetime.now(UTC).isoformat()
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
        candidate = deepcopy(system)
        protected = {"id", "created_at", "last_run_at", "last_duration", "last_reason"}
        for key, value in values.items():
            if key not in protected and key in DEFAULT_SYSTEM:
                candidate[key] = value
        self._validate_system(candidate)
        system.update(candidate)
        system["updated_at"] = datetime.now(UTC).isoformat()
        await self._async_changed()
        return system

    async def async_delete_system(self, system_id: str) -> None:
        """Delete a stopped watering system."""
        system = self._get_system(system_id)
        if system_id in self.active_runs or system_id in self._calibration_tasks:
            raise ValueError("system_is_running")
        for active_id in {*self.active_runs, *self._calibration_tasks}:
            active = self.systems.get(active_id)
            if active and active.get("simultaneous_group") == system.get(
                "simultaneous_group"
            ):
                raise ValueError("watering_group_is_busy")
        del self.systems[system_id]
        self.logs = [log for log in self.logs if log["system_id"] != system_id]
        self.notification_logs = [
            log for log in self.notification_logs if log["system_id"] != system_id
        ]
        for check_id, check in list(self.pending_checks.items()):
            if check.get("system_id") == system_id:
                self.pending_checks.pop(check_id, None)
                task = self._post_check_tasks.pop(check_id, None)
                if task:
                    task.cancel()
        self.calibrations.pop(system_id, None)
        self.aggregates.pop(system_id, None)
        self.battery_alerts.pop(system_id, None)
        await self._async_changed()

    async def async_run_system(self, system_id: str, trigger: str) -> dict[str, Any]:
        """Evaluate and start a watering system."""
        system = self._get_system(system_id)
        self._ensure_can_start(system)
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
        task = self.active_runs.get(system_id) or self._calibration_tasks.get(system_id)
        if task:
            task.cancel()
            with suppress(asyncio.CancelledError):
                await task
            return
        await self._async_close_and_verify(system)

    async def async_test_valve(self, system_id: str) -> None:
        """Run a short maintenance test through the same safety path as watering."""
        system = self._get_system(system_id)
        if not system.get("maintenance_mode"):
            raise ValueError("maintenance_mode_required")
        if not system.get("valve_entity"):
            raise ValueError("valve_entity_required")
        self._ensure_can_start(system)
        task = self.hass.async_create_task(
            self._async_execute_valve_test(system),
            f"watering_manager_valve_test_{system_id}",
        )
        self.active_runs[system_id] = task
        await self._async_notify()

    async def _async_execute_valve_test(self, system: dict[str, Any]) -> None:
        seconds = max(2, min(60, int(system.get("valve_test_seconds", 10))))
        status = "completed"
        reason = "valve_test_passed"
        started = datetime.now(UTC)
        try:
            await self._async_open_valve(system, "valve_test", seconds)
            grace = min(int(system.get("flow_grace_seconds", 10)), seconds)
            await asyncio.sleep(grace)
            self._validate_flow(system)
            await asyncio.sleep(max(0, seconds - grace))
        except asyncio.CancelledError:
            if system["id"] in self._watchdog_failures:
                self._watchdog_failures.discard(system["id"])
                status, reason = "failed", "emergency_runtime_exceeded"
            else:
                status, reason = "stopped", "stopped_by_user"
        except Exception as err:  # noqa: BLE001 - maintenance must always close safely
            status, reason = "failed", str(err)
        finally:
            try:
                await self._async_close_and_verify(system)
            except Exception as err:  # noqa: BLE001 - surface any close failure
                status, reason = "failed", str(err)
                self._create_repair_notification(system, reason)
            self.active_runs.pop(system["id"], None)
            await self._async_log(
                system,
                "test",
                status,
                {
                    "duration": round(seconds / 60, 2),
                    "actual_duration": round(
                        (datetime.now(UTC) - started).total_seconds() / 60, 2
                    ),
                    "reason": reason,
                    "water_volume_liters": None,
                    "inputs": {},
                },
            )

    def _ensure_can_start(self, system: dict[str, Any]) -> None:
        if system["id"] in self.active_runs or system["id"] in self._calibration_tasks:
            raise ValueError("system_is_running")
        group = system.get("simultaneous_group", "default")
        for active_id in {*self.active_runs, *self._calibration_tasks}:
            active = self.systems.get(active_id)
            if active and active.get("simultaneous_group", "default") == group:
                raise ValueError("watering_group_is_busy")

    @staticmethod
    def _validate_system(system: dict[str, Any]) -> None:
        """Reject unsafe or inconsistent settings received outside the UI."""
        if not str(system.get("name", "")).strip():
            raise ValueError("name_required")
        if float(system["dry_threshold"]) >= float(system["wet_threshold"]):
            raise ValueError("wet_threshold_must_exceed_dry_threshold")
        if float(system["minimum_duration"]) > float(system["maximum_duration"]):
            raise ValueError("maximum_duration_too_low")
        positive = (
            "maximum_duration",
            "emergency_max_runtime",
            "valve_confirmation_seconds",
            "post_check_delay_minutes",
            "flow_calibration_seconds",
            "duration_calibration_minutes",
            "duration_calibration_wait_minutes",
            "flow_tolerance_percent",
            "valve_test_seconds",
        )
        if any(float(system[key]) <= 0 for key in positive):
            raise ValueError("positive_value_required")
        if float(system["flow_minimum"]) > float(system["flow_maximum"]):
            raise ValueError("flow_limits_invalid")
        if float(system["flow_tolerance_percent"]) > 100:
            raise ValueError("flow_tolerance_invalid")
        if float(system["normal_flow_rate"]) < 0:
            raise ValueError("normal_flow_invalid")
        if not 0 <= float(system["battery_low_threshold"]) <= 100:
            raise ValueError("battery_threshold_invalid")
        paused_until = str(system.get("paused_until", "")).strip()
        if paused_until:
            try:
                date.fromisoformat(paused_until)
            except ValueError as err:
                raise ValueError("paused_until_invalid") from err
        valve = str(system.get("valve_entity", ""))
        if valve and valve.split(".", 1)[0] not in {"valve", "switch", "input_boolean"}:
            raise ValueError("unsupported_valve_entity")
        targets = system.get("notification_targets", [])
        if not isinstance(targets, list) or len(targets) > 20:
            raise ValueError("notification_targets_invalid")
        destinations: set[str] = set()
        for target in targets:
            if not isinstance(target, dict):
                raise ValueError("notification_target_invalid")  # noqa: TRY004
            destination = str(target.get("destination", ""))
            if not destination.startswith(("entity:notify.", "service:notify.")):
                raise ValueError("notification_destination_invalid")
            if destination in destinations:
                raise ValueError("notification_destination_duplicate")
            destinations.add(destination)
            if not str(target.get("name", "")).strip():
                raise ValueError("notification_recipient_name_required")

    @staticmethod
    def _remove_legacy_rain_settings(system: dict[str, Any]) -> bool:
        """Remove measured-rain settings retired in version 0.3.1."""
        removed = False
        for key in (
            "rain_sensor",
            "exposure",
            "rain_reach_percent",
            "measured_rain_threshold",
        ):
            if key in system:
                system.pop(key)
                removed = True
        return removed

    @staticmethod
    def _remove_legacy_et_settings(system: dict[str, Any]) -> bool:
        """Remove ET settings retired in version 0.3.2."""
        removed = False
        for key in (
            "et0_sensor",
            "plant_profile",
            "crop_coefficient",
            "pot_shape",
            "pot_count",
            "pot_diameter_cm",
            "pot_length_cm",
            "pot_width_cm",
            "irrigation_efficiency_percent",
            "water_balance_enabled",
            "water_balance_capacity_mm",
            "water_balance_trigger_mm",
        ):
            if key in system:
                system.pop(key)
                removed = True
        return removed

    @staticmethod
    def _migrate_notification_target(system: dict[str, Any]) -> bool:
        """Convert the previous single notifier setting once, preserving choices."""
        changed = False
        if not system.get("notification_targets") and system.get(
            "notification_service"
        ):
            service = str(system["notification_service"])
            if not service.startswith("notify."):
                service = f"notify.{service}"
            system["notification_targets"] = [
                {
                    "name": "Primary recipient",
                    "destination": f"service:{service}",
                    "failure": bool(system.get("notify_failures", True)),
                    "warning": bool(system.get("notify_warnings", True)),
                    "success": bool(system.get("notify_success", False)),
                    "low_battery": True,
                }
            ]
            changed = True
        for target in system.get("notification_targets", []):
            if "low_battery" not in target:
                target["low_battery"] = True
                changed = True
        return changed

    def _calculate_decision(
        self, system: dict[str, Any], trigger: str
    ) -> dict[str, Any]:
        """Calculate duration and preserve every input used by the decision."""
        gates = self._decision_gates(system, trigger)
        inputs: dict[str, Any] = {"gates": gates}
        blocked = next((gate for gate in gates if not gate["passed"]), None)
        if blocked:
            return {"duration": 0, "reason": blocked["key"], "inputs": inputs}

        if trigger == "manual" or system["mode"] == "manual":
            duration = float(system["manual_duration"])
            result = {
                "duration": self._bounded_duration(system, duration),
                "reason": "manual_duration",
                "inputs": inputs,
            }
            inputs.update(self._environment_inputs(system))
            result["expected_volume_liters"] = self._expected_volume(
                system, result["duration"]
            )
            return result

        readings = [
            self._read_sensor(system.get("moisture_sensor_1", ""), system),
            self._read_sensor(system.get("moisture_sensor_2", ""), system),
        ]
        valid = [reading for reading in readings if reading["valid"]]
        inputs.update(self._environment_inputs(system))
        inputs["moisture"] = readings
        configured = [reading for reading in readings if reading["entity_id"]]

        if configured and not valid:
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
        moisture_factor = 1.0

        if len(values) == 2 and min(values) < dry <= max(values):
            duration = float(system["conflict_duration"])
            reason = "sensor_conflict_short_run"
            inputs["moisture_factor"] = None
            return {
                "duration": self._bounded_duration(system, duration),
                "reason": reason,
                "expected_volume_liters": self._expected_volume(system, duration),
                "inputs": inputs,
            }
        elif values and all(value >= wet for value in values):
            return {"duration": 0, "reason": "soil_wet", "inputs": inputs}
        elif values:
            average = sum(values) / len(values)
            if average <= dry:
                moisture_factor = 1 + min(0.5, (dry - average) / max(dry, 1) * 0.5)
                reason = "soil_dry"
            else:
                ratio = (wet - average) / max(wet - dry, 1)
                moisture_factor = max(0.25, ratio)
                reason = "soil_partly_dry"
        else:
            reason = "no_moisture_sensors"
        inputs["moisture_factor"] = round(moisture_factor, 3)
        duration = float(system["base_duration"]) * moisture_factor
        weather = inputs["weather"]
        duration *= weather["factor"]

        result = {
            "duration": self._bounded_duration(system, duration),
            "reason": reason,
            "inputs": inputs,
        }
        result["expected_volume_liters"] = self._expected_volume(
            system, result["duration"]
        )
        return result

    def _decision_gates(
        self, system: dict[str, Any], trigger: str
    ) -> list[dict[str, Any]]:
        local_today = dt_util.now().date()
        paused_until = str(system.get("paused_until", "")).strip()
        paused = bool(paused_until and local_today < date.fromisoformat(paused_until))
        return [
            {
                "key": "system_disabled",
                "passed": bool(system["enabled"]) or trigger == "manual",
            },
            {
                "key": "maintenance_mode",
                "passed": not bool(system.get("maintenance_mode")),
            },
            {
                "key": "paused",
                "passed": not paused or trigger == "manual",
                "detail": paused_until or None,
            },
            {
                "key": "minimum_interval",
                "passed": not self._within_minimum_interval(system)
                or trigger == "manual",
            },
            {
                "key": "valve_entity_required",
                "passed": bool(system.get("valve_entity")),
            },
        ]

    def _environment_inputs(self, system: dict[str, Any]) -> dict[str, Any]:
        return {
            "soil_temperatures": [
                self._read_numeric(system.get("soil_temperature_sensor", "")),
                self._read_numeric(system.get("soil_temperature_sensor_2", "")),
            ],
            "weather": self._weather_adjustment(system),
            "battery": self._battery_status(system),
        }

    async def async_preview_decision(self, system_id: str) -> dict[str, Any]:
        """Return a complete, read-only explanation of the next scheduled decision."""
        system = self._get_system(system_id)
        decision = self._calculate_decision(system, "schedule")
        return {
            **decision,
            "will_run": decision["duration"] > 0,
            "generated_at": datetime.now(UTC).isoformat(),
        }

    async def _async_execute_run(
        self, system: dict[str, Any], trigger: str, decision: dict[str, Any]
    ) -> None:
        """Run valve cycles with persisted recovery state and verified shutdown."""
        system_id = system["id"]
        total_seconds = round(float(decision["duration"]) * 60)
        cycles = max(1, int(system["soak_cycles"]))
        cycle_seconds = max(1, total_seconds // cycles)
        started = datetime.now(UTC)
        meter_start = self._read_cumulative_meter(system)
        loop = asyncio.get_running_loop()
        valve_opened_at: float | None = None
        total_open_seconds = 0.0
        current_flow_lpm: float | None = None
        total_volume_liters = 0.0
        volume_available = False
        status = "completed"
        final_reason = decision["reason"]
        close_error: Exception | None = None
        try:
            for cycle in range(cycles):
                if cycle_seconds > int(float(system["emergency_max_runtime"]) * 60):
                    raise RuntimeError("emergency_runtime_exceeded")
                await self._async_open_valve(system, "watering", cycle_seconds)
                valve_opened_at = loop.time()
                current_flow_lpm = None
                grace = min(int(system["flow_grace_seconds"]), cycle_seconds)
                await asyncio.sleep(grace)
                flow, unit = self._validate_flow(system)
                current_flow_lpm = self._flow_to_liters_per_minute(flow, unit)
                if current_flow_lpm is not None:
                    volume_available = True
                await asyncio.sleep(max(0, cycle_seconds - grace))
                await self._async_close_and_verify(system)
                cycle_open_seconds = loop.time() - valve_opened_at
                total_open_seconds += cycle_open_seconds
                if current_flow_lpm is not None:
                    total_volume_liters += current_flow_lpm * cycle_open_seconds / 60
                valve_opened_at = None
                current_flow_lpm = None
                if cycle < cycles - 1:
                    await asyncio.sleep(int(system["soak_pause_minutes"]) * 60)
        except asyncio.CancelledError:
            if system_id in self._watchdog_failures:
                status = "failed"
                final_reason = "emergency_runtime_exceeded"
                self._watchdog_failures.discard(system_id)
            else:
                status = "stopped"
                final_reason = "stopped_by_user"
        except Exception as err:
            status = "failed"
            final_reason = str(err)
            _LOGGER.exception("Watering run failed for %s", system["name"])
        finally:
            try:
                await self._async_close_and_verify(system)
            except Exception as err:  # The run must still be logged and surfaced.
                close_error = err
                status = "failed"
                final_reason = str(err)
                _LOGGER.exception("Valve shutdown failed for %s", system["name"])
            if valve_opened_at is not None:
                cycle_open_seconds = loop.time() - valve_opened_at
                total_open_seconds += cycle_open_seconds
                if current_flow_lpm is not None:
                    total_volume_liters += current_flow_lpm * cycle_open_seconds / 60
            actual = total_open_seconds / 60
            meter_end = self._read_cumulative_meter(system)
            exact_volume = self._meter_delta_liters(meter_start, meter_end)
            finished_decision = dict(decision)
            finished_decision["reason"] = final_reason
            finished_decision["actual_duration"] = round(actual, 1)
            if exact_volume is not None:
                finished_decision["water_volume_liters"] = round(exact_volume, 3)
                finished_decision["water_volume_source"] = "cumulative_meter"
            elif volume_available:
                finished_decision["water_volume_liters"] = round(total_volume_liters, 3)
                finished_decision["water_volume_source"] = "flow_estimate"
            elif self._normal_flow_lpm(system):
                finished_decision["water_volume_liters"] = round(
                    self._normal_flow_lpm(system) * actual, 3
                )
                finished_decision["water_volume_source"] = "flow_estimate"
            else:
                finished_decision["water_volume_liters"] = None
                finished_decision["water_volume_source"] = None
            system["last_run_at"] = started.isoformat()
            system["last_duration"] = finished_decision["actual_duration"]
            system["last_reason"] = final_reason
            self.active_runs.pop(system_id, None)
            self.persisted_runs.pop(system_id, None)
            await self._async_log(system, trigger, status, finished_decision)
            if status == "completed":
                await self._async_notify_user(
                    system,
                    "success",
                    "watering_completed",
                    f"{actual:.1f} min",
                )
                if system.get("post_check_enabled") and actual > 0:
                    await self._schedule_post_check(system, decision, started)
            elif status == "stopped":
                await self._async_notify_user(system, "warning", final_reason)
            else:
                await self._async_notify_user(system, "failure", final_reason)
            if close_error:
                self._create_repair_notification(system, final_reason)

    async def _async_open_valve(
        self, system: dict[str, Any], purpose: str, planned_seconds: int
    ) -> None:
        """Persist intent before opening so a hard restart can recover safely."""
        now = datetime.now(UTC)
        self.persisted_runs[system["id"]] = {
            "system_id": system["id"],
            "system_name": system["name"],
            "valve_entity": system["valve_entity"],
            "purpose": purpose,
            "started_at": now.isoformat(),
            "deadline_at": (
                now
                + timedelta(
                    seconds=min(
                        planned_seconds,
                        int(float(system["emergency_max_runtime"]) * 60),
                    )
                )
            ).isoformat(),
        }
        await self._async_save()
        watchdog = self._watchdog_tasks.pop(system["id"], None)
        if watchdog:
            watchdog.cancel()
        self._watchdog_tasks[system["id"]] = self.hass.async_create_task(
            self._async_runtime_watchdog(system),
            f"watering_manager_watchdog_{system['id']}",
        )
        await self._async_set_valve(system["valve_entity"], True)

    async def _async_close_and_verify(self, system: dict[str, Any]) -> None:
        """Close a valve, retry once and verify both entity state and residual flow."""
        entity_id = system["valve_entity"]
        delay = max(1, int(system.get("valve_confirmation_seconds", 5)))
        for attempt in range(2):
            await self._async_set_valve(entity_id, False)
            await asyncio.sleep(delay)
            if self._valve_is_closed(entity_id):
                break
            if attempt:
                raise RuntimeError("valve_failed_to_close")
        flow_entity = system.get("flow_sensor", "")
        if flow_entity:
            flow = self._read_numeric(flow_entity)
            threshold = float(system.get("leak_flow_threshold", 0.05))
            if flow is not None and flow > threshold:
                raise RuntimeError("flow_after_close")
        self.persisted_runs.pop(system["id"], None)
        watchdog = self._watchdog_tasks.pop(system["id"], None)
        if watchdog and watchdog is not asyncio.current_task():
            watchdog.cancel()
        await self._async_save()

    async def _async_runtime_watchdog(self, system: dict[str, Any]) -> None:
        """Independently force closure if a valve stays open beyond its hard limit."""
        system_id = system["id"]
        try:
            await asyncio.sleep(float(system["emergency_max_runtime"]) * 60)
            if system_id not in self.persisted_runs:
                return
            await self._async_close_and_verify(system)
            await self._async_notify_user(
                system, "failure", "emergency_runtime_exceeded"
            )
            task = self.active_runs.get(system_id) or self._calibration_tasks.get(
                system_id
            )
            if task and task is not asyncio.current_task():
                self._watchdog_failures.add(system_id)
                task.cancel()
        except asyncio.CancelledError:
            raise
        except Exception as err:  # noqa: BLE001 - watchdog handles every failure
            self._create_repair_notification(system, str(err))
            await self._async_notify_user(system, "failure", str(err))
        finally:
            if self._watchdog_tasks.get(system_id) is asyncio.current_task():
                self._watchdog_tasks.pop(system_id, None)

    def _valve_is_closed(self, entity_id: str) -> bool:
        state = self.hass.states.get(entity_id)
        if state is None:
            return False
        domain = entity_id.split(".", 1)[0]
        return state.state == ("closed" if domain == "valve" else "off")

    async def _schedule_post_check(
        self,
        system: dict[str, Any],
        decision: dict[str, Any],
        run_started: datetime,
    ) -> None:
        before = decision.get("inputs", {}).get("moisture", [])
        if not any(item.get("valid") for item in before):
            return
        check_id = uuid4().hex
        due = datetime.now(UTC) + timedelta(
            minutes=float(system.get("post_check_delay_minutes", 30))
        )
        self.pending_checks[check_id] = {
            "id": check_id,
            "system_id": system["id"],
            "run_started_at": run_started.isoformat(),
            "due_at": due.isoformat(),
            "before": before,
        }
        await self._async_changed()
        self._start_post_check_task(check_id)

    def _restore_pending_checks(self) -> None:
        for check_id in list(self.pending_checks):
            self._start_post_check_task(check_id)

    def _start_post_check_task(self, check_id: str) -> None:
        if check_id in self._post_check_tasks:
            return
        task = self.hass.async_create_task(
            self._async_post_check(check_id), f"watering_manager_post_check_{check_id}"
        )
        self._post_check_tasks[check_id] = task

    async def _async_post_check(self, check_id: str) -> None:
        try:
            check = self.pending_checks.get(check_id)
            if not check:
                return
            due = datetime.fromisoformat(check["due_at"])
            wait_seconds = max(0.0, (due - datetime.now(UTC)).total_seconds())
            await asyncio.sleep(wait_seconds)
            system = self.systems.get(check["system_id"])
            if not system:
                self.pending_checks.pop(check_id, None)
                await self._async_changed()
                return
            after = [
                self._read_sensor(system.get("moisture_sensor_1", ""), system),
                self._read_sensor(system.get("moisture_sensor_2", ""), system),
            ]
            minimum = float(system.get("post_check_min_increase", 5))
            results = []
            for index, before in enumerate(check.get("before", [])):
                if not before.get("valid"):
                    continue
                current = after[index] if index < len(after) else {"valid": False}
                delta = (
                    round(float(current["value"]) - float(before["value"]), 1)
                    if current.get("valid")
                    else None
                )
                results.append(
                    {
                        "sensor": before.get("entity_id"),
                        "before": before.get("value"),
                        "after": current.get("value"),
                        "delta": delta,
                        "passed": delta is not None and delta >= minimum,
                    }
                )
            passed = bool(results) and all(item["passed"] for item in results)
            decision = {
                "duration": 0,
                "reason": "moisture_verified" if passed else "moisture_not_increased",
                "actual_duration": 0,
                "water_volume_liters": None,
                "inputs": {"verification": results},
            }
            await self._async_log(
                system, "verification", "completed" if passed else "warning", decision
            )
            await self._async_notify_user(
                system,
                "success" if passed else "warning",
                decision["reason"],
            )
            self.pending_checks.pop(check_id, None)
            await self._async_changed()
        except asyncio.CancelledError:
            raise
        except Exception:
            _LOGGER.exception("Post-watering verification failed")
        finally:
            self._post_check_tasks.pop(check_id, None)

    async def _async_recover_interrupted_runs(self) -> None:
        """Close only valves recorded as open before the previous interruption."""
        if not self.persisted_runs:
            return
        for system_id, recovery in list(self.persisted_runs.items()):
            system = self.systems.get(system_id)
            if system is None:
                system = deepcopy(DEFAULT_SYSTEM)
                system.update(
                    {
                        "id": system_id,
                        "name": recovery.get("system_name", "Unknown system"),
                        "valve_entity": recovery.get("valve_entity", ""),
                    }
                )
            try:
                await self._async_close_and_verify(system)
            except Exception as err:
                _LOGGER.exception(
                    "Could not recover interrupted valve %s", system["valve_entity"]
                )
                self._create_repair_notification(system, str(err))
                continue
            if system_id in self.systems:
                started_at = recovery.get("started_at")
                actual = 0.0
                with suppress(ValueError, TypeError):
                    actual = max(
                        0.0,
                        (
                            datetime.now(UTC) - datetime.fromisoformat(started_at)
                        ).total_seconds()
                        / 60,
                    )
                decision = {
                    "duration": 0,
                    "reason": "interrupted_by_restart",
                    "actual_duration": round(actual, 1),
                    "water_volume_liters": None,
                    "inputs": {"recovery": recovery},
                }
                await self._async_log(system, "recovery", "failed", decision)
                await self._async_notify_user(
                    system, "failure", "interrupted_by_restart"
                )

    async def _async_notify_user(
        self,
        system: dict[str, Any],
        level: str,
        reason: str,
        detail: str | None = None,
    ) -> None:
        greek = self.hass.config.language.startswith("el")
        title = (
            f"Πότισμα · {system['name']}" if greek else f"Watering · {system['name']}"
        )
        reason_text = (
            ("Χαμηλή μπαταρία βάνας" if greek else "Low valve battery")
            if reason == "battery_low"
            else reason.replace("_", " ")
        )
        message = f"Συμβάν: {reason_text}" if greek else f"Event: {reason_text}"
        if detail:
            message += f" · {detail}"
        if level in {"failure", "warning", "low_battery"}:
            persistent_notification.async_create(
                self.hass,
                message,
                title,
                f"watering_manager_{system['id']}_{level}",
            )
        recorded = False
        for target in system.get("notification_targets", []):
            if not target.get(level, False):
                continue
            try:
                await self._async_send_notification(
                    str(target["destination"]), title, message
                )
                self._record_notification(
                    system, target, level, reason, "sent", detail=detail
                )
                recorded = True
            except (ValueError, RuntimeError, HomeAssistantError) as err:
                self._record_notification(
                    system,
                    target,
                    level,
                    reason,
                    "failed",
                    detail=detail,
                    error=str(err),
                )
                recorded = True
                _LOGGER.exception(
                    "Unable to notify %s for %s", target.get("name"), system["name"]
                )
        if recorded:
            await self._async_changed()

    async def _async_check_battery_levels(self) -> None:
        """Notify once when a configured valve battery crosses its low threshold."""
        state_changed = False
        for system_id, system in list(self.systems.items()):
            battery = self._battery_status(system)
            if not battery["entity_id"]:
                if self.battery_alerts.pop(system_id, None) is not None:
                    state_changed = True
                continue
            if not battery["available"]:
                continue
            was_low = bool(self.battery_alerts.get(system_id, False))
            is_low = bool(battery["low"])
            if is_low == was_low:
                continue
            self.battery_alerts[system_id] = is_low
            state_changed = True
            if is_low:
                await self._async_notify_user(
                    system,
                    "low_battery",
                    "battery_low",
                    f"{battery['value']:g}{battery['unit']}",
                )
        if state_changed:
            await self._async_changed()

    def _create_repair_notification(self, system: dict[str, Any], reason: str) -> None:
        persistent_notification.async_create(
            self.hass,
            f"The valve {system.get('valve_entity') or '—'} could not be confirmed closed. "
            f"Check the water supply immediately. Reason: {reason}",
            f"Watering Manager · CRITICAL · {system.get('name', 'System')}",
            f"watering_manager_critical_{system.get('id', 'unknown')}",
        )

    async def async_test_notification(self, system_id: str, destination: str) -> None:
        system = self._get_system(system_id)
        target = next(
            (
                item
                for item in system.get("notification_targets", [])
                if str(item.get("destination")) == destination
            ),
            None,
        )
        if target is None:
            raise ValueError("notification_destination_not_configured")
        greek = self.hass.config.language.startswith("el")
        try:
            await self._async_send_notification(
                destination,
                f"Watering Manager · {system['name']}",
                "Δοκιμαστική ειδοποίηση" if greek else "Test notification",
            )
        except (ValueError, RuntimeError, HomeAssistantError) as err:
            self._record_notification(
                system, target, "test", "test_notification", "failed", error=str(err)
            )
            await self._async_changed()
            raise
        self._record_notification(system, target, "test", "test_notification", "sent")
        await self._async_changed()

    def _record_notification(
        self,
        system: dict[str, Any],
        target: dict[str, Any],
        level: str,
        reason: str,
        status: str,
        *,
        detail: str | None = None,
        error: str | None = None,
    ) -> None:
        self.notification_logs.append(
            {
                "id": uuid4().hex,
                "system_id": system["id"],
                "system_name": system["name"],
                "timestamp": datetime.now(UTC).isoformat(),
                "recipient_name": str(target.get("name", "")),
                "destination": str(target.get("destination", "")),
                "level": level,
                "reason": reason,
                "detail": detail,
                "status": status,
                "error": error,
            }
        )
        self.notification_logs = self.notification_logs[-200:]

    async def _async_send_notification(
        self, destination: str, title: str, message: str
    ) -> None:
        """Send to a modern notify entity or an explicitly selected legacy service."""
        destination_type, separator, value = destination.partition(":")
        if not separator or not value.startswith("notify."):
            raise ValueError("notification_destination_invalid")
        if destination_type == "entity":
            state = self.hass.states.get(value)
            if state is None or state.state in {"unknown", "unavailable"}:
                raise RuntimeError("notification_entity_unavailable")
            if not self.hass.services.has_service("notify", "send_message"):
                raise RuntimeError("notification_send_message_unavailable")
            await self.hass.services.async_call(
                "notify",
                "send_message",
                {"entity_id": value, "title": title, "message": message},
                blocking=True,
            )
            return
        if destination_type == "service":
            service = value.split(".", 1)[1]
            if not self.hass.services.has_service("notify", service):
                raise RuntimeError("notification_service_unavailable")
            await self.hass.services.async_call(
                "notify", service, {"title": title, "message": message}, blocking=True
            )
            return
        raise ValueError("notification_destination_invalid")

    async def async_start_calibration(self, system_id: str, kind: str) -> None:
        system = self._get_system(system_id)
        self._ensure_can_start(system)
        if not system.get("valve_entity"):
            raise ValueError("valve_entity_required")
        if kind == "flow" and not system.get("flow_sensor"):
            raise ValueError("flow_sensor_required")
        if kind == "duration" and not any(
            system.get(key) for key in ("moisture_sensor_1", "moisture_sensor_2")
        ):
            raise ValueError("moisture_sensor_required")
        self.calibrations[system_id] = {
            "kind": kind,
            "status": "running",
            "phase": "starting",
            "started_at": datetime.now(UTC).isoformat(),
            "result": None,
            "error": None,
        }
        await self._async_changed()
        coroutine = (
            self._async_flow_calibration(system)
            if kind == "flow"
            else self._async_duration_calibration(system)
        )
        task = self.hass.async_create_task(
            coroutine, f"watering_manager_{kind}_calibration_{system_id}"
        )
        self._calibration_tasks[system_id] = task

    async def async_apply_calibration(self, system_id: str) -> dict[str, Any]:
        system = self._get_system(system_id)
        calibration = self.calibrations.get(system_id, {})
        if calibration.get("status") != "completed" or not calibration.get("result"):
            raise ValueError("calibration_result_required")
        result = calibration["result"]
        if calibration["kind"] == "flow":
            system["normal_flow_rate"] = result["normal_flow_lpm"]
            system["flow_tolerance_percent"] = result["tolerance_percent"]
            system["flow_minimum"] = result["suggested_minimum"]
            system["flow_maximum"] = result["suggested_maximum"]
        else:
            system["base_duration"] = result["recommended_minutes"]
        system["updated_at"] = datetime.now(UTC).isoformat()
        calibration["applied_at"] = datetime.now(UTC).isoformat()
        await self._async_changed()
        return system

    async def _async_flow_calibration(self, system: dict[str, Any]) -> None:
        system_id = system["id"]
        calibration = self.calibrations[system_id]
        seconds = max(10, min(120, int(system.get("flow_calibration_seconds", 30))))
        readings: list[float] = []
        close_failed = False
        try:
            calibration["phase"] = "measuring"
            await self._async_changed()
            await self._async_open_valve(system, "flow_calibration", seconds)
            grace = min(max(1, int(system.get("flow_grace_seconds", 10))), seconds - 2)
            await asyncio.sleep(grace)
            remaining = max(2, seconds - grace)
            for _ in range(max(1, remaining // 2)):
                value = self._read_numeric(system["flow_sensor"])
                if value is not None and value >= 0:
                    readings.append(value)
                await asyncio.sleep(2)
            if not readings:
                raise RuntimeError("flow_sensor_unavailable")
            state = self.hass.states.get(system["flow_sensor"])
            unit = state.attributes.get("unit_of_measurement") if state else None
            average = sum(readings) / len(readings)
            normal_lpm = self._flow_to_liters_per_minute(average, unit)
            if normal_lpm is None:
                raise RuntimeError("flow_unit_unsupported")
            tolerance = float(system.get("flow_tolerance_percent", 30))
            calibration.update(
                {
                    "status": "completed",
                    "phase": "complete",
                    "completed_at": datetime.now(UTC).isoformat(),
                    "result": {
                        "average": round(average, 3),
                        "minimum_sample": round(min(readings), 3),
                        "maximum_sample": round(max(readings), 3),
                        "samples": len(readings),
                        "unit": unit,
                        "normal_flow_lpm": round(normal_lpm, 3),
                        "tolerance_percent": tolerance,
                        "suggested_minimum": round(average * 0.7, 3),
                        "suggested_maximum": round(average * 1.3, 3),
                    },
                }
            )
        except asyncio.CancelledError:
            calibration.update(status="failed", phase="cancelled", error="cancelled")
            raise
        except Exception as err:  # noqa: BLE001 - calibration reports hardware failures
            calibration.update(status="failed", phase="failed", error=str(err))
            await self._async_notify_user(system, "failure", f"flow_calibration_{err}")
        finally:
            try:
                await self._async_close_and_verify(system)
            except Exception as err:  # noqa: BLE001 - valve closure is mandatory
                close_failed = True
                calibration.update(status="failed", phase="failed", error=str(err))
                self._create_repair_notification(system, str(err))
            self.persisted_runs.pop(system_id, None)
            self._calibration_tasks.pop(system_id, None)
            await self._async_changed()
            if close_failed:
                await self._async_notify_user(
                    system, "failure", "valve_failed_to_close"
                )

    async def _async_duration_calibration(self, system: dict[str, Any]) -> None:
        system_id = system["id"]
        calibration = self.calibrations[system_id]
        test_minutes = max(
            0.5, min(float(system.get("duration_calibration_minutes", 2)), 10)
        )
        test_seconds = int(test_minutes * 60)
        before = [
            self._read_sensor(system.get("moisture_sensor_1", ""), system),
            self._read_sensor(system.get("moisture_sensor_2", ""), system),
        ]
        if not any(item.get("valid") for item in before):
            calibration.update(
                status="failed", phase="failed", error="sensors_unavailable"
            )
            await self._async_changed()
            self._calibration_tasks.pop(system_id, None)
            return
        try:
            calibration.update(phase="watering", before=before)
            await self._async_changed()
            await self._async_open_valve(system, "duration_calibration", test_seconds)
            grace = min(int(system.get("flow_grace_seconds", 10)), test_seconds)
            await asyncio.sleep(grace)
            self._validate_flow(system)
            await asyncio.sleep(max(0, test_seconds - grace))
            await self._async_close_and_verify(system)
            wait_minutes = max(
                1, min(float(system.get("duration_calibration_wait_minutes", 15)), 120)
            )
            due = datetime.now(UTC) + timedelta(minutes=wait_minutes)
            calibration.update(phase="absorbing", measurement_due_at=due.isoformat())
            await self._async_changed()
            await asyncio.sleep(wait_minutes * 60)
            after = [
                self._read_sensor(system.get("moisture_sensor_1", ""), system),
                self._read_sensor(system.get("moisture_sensor_2", ""), system),
            ]
            estimates = []
            details = []
            wet = float(system["wet_threshold"])
            for index, initial in enumerate(before):
                current = after[index]
                if not initial.get("valid") or not current.get("valid"):
                    continue
                delta = float(current["value"]) - float(initial["value"])
                estimate = None
                if delta > 0.2:
                    rate = delta / test_minutes
                    estimate = max(0.5, (wet - float(initial["value"])) / rate)
                    estimate = min(float(system["maximum_duration"]), estimate)
                    estimates.append(estimate)
                details.append(
                    {
                        "sensor": initial.get("entity_id"),
                        "before": initial.get("value"),
                        "after": current.get("value"),
                        "increase": round(delta, 1),
                        "estimated_minutes": round(estimate, 1) if estimate else None,
                    }
                )
            if not estimates:
                raise RuntimeError("moisture_response_not_detected")
            recommendation = self._bounded_duration(system, max(estimates))
            calibration.update(
                status="completed",
                phase="complete",
                completed_at=datetime.now(UTC).isoformat(),
                result={
                    "test_minutes": test_minutes,
                    "recommended_minutes": recommendation,
                    "sensors": details,
                },
            )
        except asyncio.CancelledError:
            calibration.update(status="failed", phase="cancelled", error="cancelled")
            raise
        except Exception as err:  # noqa: BLE001 - calibration reports hardware failures
            calibration.update(status="failed", phase="failed", error=str(err))
            await self._async_notify_user(
                system, "failure", f"duration_calibration_{err}"
            )
        finally:
            try:
                await self._async_close_and_verify(system)
            except Exception as err:  # noqa: BLE001 - valve closure is mandatory
                calibration.update(status="failed", phase="failed", error=str(err))
                self._create_repair_notification(system, str(err))
            self.persisted_runs.pop(system_id, None)
            self._calibration_tasks.pop(system_id, None)
            await self._async_changed()

    def _recover_calibration_states(self) -> None:
        for calibration in self.calibrations.values():
            if calibration.get("status") == "running":
                calibration.update(
                    status="failed", phase="interrupted", error="interrupted_by_restart"
                )

    def _diagnostics(self, system: dict[str, Any]) -> dict[str, Any]:
        checks: list[dict[str, Any]] = []

        def add(
            key: str,
            configured: bool,
            healthy: bool,
            detail: Any = None,
            *,
            required: bool = False,
        ) -> None:
            checks.append(
                {
                    "key": key,
                    "status": (
                        "ok"
                        if configured and healthy
                        else ("error" if configured or required else "not_configured")
                    ),
                    "detail": detail,
                }
            )

        valve = system.get("valve_entity", "")
        valve_state = self.hass.states.get(valve) if valve else None
        add(
            "valve",
            bool(valve),
            bool(valve_state and valve_state.state not in {"unknown", "unavailable"}),
            valve_state.state if valve_state else None,
            required=True,
        )
        for index, key in enumerate(("moisture_sensor_1", "moisture_sensor_2"), 1):
            entity_id = system.get(key, "")
            reading = self._read_sensor(entity_id, system)
            add(
                f"moisture_{index}",
                bool(entity_id),
                reading.get("valid", False),
                reading,
            )
        for index, key in enumerate(
            ("soil_temperature_sensor", "soil_temperature_sensor_2"), 1
        ):
            entity_id = system.get(key, "")
            value = self._read_numeric(entity_id)
            add(f"soil_temperature_{index}", bool(entity_id), value is not None, value)
        for key, entity_key in (
            ("weather", "weather_entity"),
            ("flow", "flow_sensor"),
        ):
            entity_id = system.get(entity_key, "")
            state = self.hass.states.get(entity_id) if entity_id else None
            add(
                key,
                bool(entity_id),
                bool(state and state.state not in {"unknown", "unavailable"}),
                state.state if state else None,
            )
        meter_entity = system.get("water_meter_sensor", "")
        meter = self._read_cumulative_meter(system)
        add("water_meter", bool(meter_entity), meter is not None, meter)
        battery = self._battery_status(system)
        add(
            "battery",
            bool(battery["entity_id"]),
            bool(battery["available"] and not battery["low"]),
            battery,
        )
        targets = system.get("notification_targets", [])
        available_targets = sum(
            1
            for target in targets
            if self._notification_destination_available(
                str(target.get("destination", ""))
            )
        )
        add(
            "notifications",
            bool(targets),
            bool(targets) and available_targets == len(targets),
            f"{available_targets}/{len(targets)}" if targets else None,
        )
        critical = (
            any(item["status"] == "error" and item["key"] == "valve" for item in checks)
            or system["id"] in self.persisted_runs
        )
        warning = any(item["status"] == "error" for item in checks)
        return {
            "status": "critical" if critical else ("warning" if warning else "healthy"),
            "checks": checks,
            "active_recovery": self.persisted_runs.get(system["id"]),
            "pending_post_checks": sum(
                1
                for item in self.pending_checks.values()
                if item.get("system_id") == system["id"]
            ),
            "calibration": self.calibrations.get(system["id"]),
            "maintenance_mode": bool(system.get("maintenance_mode")),
        }

    def _notification_destination_available(self, destination: str) -> bool:
        destination_type, separator, value = destination.partition(":")
        if not separator or not value.startswith("notify."):
            return False
        if destination_type == "entity":
            state = self.hass.states.get(value)
            return bool(
                state
                and state.state not in {"unknown", "unavailable"}
                and self.hass.services.has_service("notify", "send_message")
            )
        if destination_type == "service":
            return self.hass.services.has_service("notify", value.split(".", 1)[1])
        return False

    def _battery_status(self, system: dict[str, Any]) -> dict[str, Any]:
        """Return normalized status for the optional valve battery sensor."""
        entity_id = str(system.get("battery_sensor", ""))
        threshold = float(system.get("battery_low_threshold", 20))
        value = self._read_numeric(entity_id) if entity_id else None
        state = self.hass.states.get(entity_id) if entity_id else None
        unit = str(state.attributes.get("unit_of_measurement") or "%") if state else "%"
        low = value is not None and value <= threshold
        return {
            "entity_id": entity_id,
            "value": value,
            "unit": unit,
            "threshold": threshold,
            "available": value is not None,
            "low": low,
            "valid": value is not None and not low,
            "reason": (
                "not_configured"
                if not entity_id
                else "unavailable"
                if value is None
                else "battery_low"
                if low
                else None
            ),
        }

    async def _async_scheduler_tick(self, now: datetime) -> None:
        """Start systems whose local schedule matches the current minute."""
        await self._async_check_battery_levels()
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
        age = datetime.now(UTC) - state.last_updated
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

    def _validate_flow(self, system: dict[str, Any]) -> tuple[float | None, str | None]:
        """Abort when a configured flow sensor reports an unsafe value."""
        entity_id = system.get("flow_sensor", "")
        if not entity_id:
            return None, None
        state = self.hass.states.get(entity_id)
        flow = self._read_numeric(entity_id)
        if flow is None:
            raise RuntimeError("flow_sensor_unavailable")
        unit = state.attributes.get("unit_of_measurement") if state else None
        normal_lpm = self._normal_flow_lpm(system)
        current_lpm = self._flow_to_liters_per_minute(flow, unit)
        if normal_lpm and current_lpm is not None:
            tolerance = float(system.get("flow_tolerance_percent", 30)) / 100
            if current_lpm < normal_lpm * (1 - tolerance):
                raise RuntimeError("flow_too_low")
            if current_lpm > normal_lpm * (1 + tolerance):
                raise RuntimeError("flow_too_high")
        else:
            if flow < float(system["flow_minimum"]):
                raise RuntimeError("flow_too_low")
            if flow > float(system["flow_maximum"]):
                raise RuntimeError("flow_too_high")
        return flow, unit

    @staticmethod
    def _flow_to_liters_per_minute(
        flow: float | None, unit: str | None
    ) -> float | None:
        """Convert supported flow-rate units to litres per minute."""
        if flow is None or not unit:
            return None
        normalized = unit.strip().lower().replace("³", "3").replace(" ", "")
        factors = {
            "l/min": 1.0,
            "l/m": 1.0,
            "l/h": 1 / 60,
            "m3/h": 1000 / 60,
            "m3/min": 1000,
            "gal/min": 3.785411784,
            "gpm": 3.785411784,
            "gal/h": 3.785411784 / 60,
        }
        factor = factors.get(normalized)
        return flow * factor if factor is not None else None

    def _read_cumulative_meter(self, system: dict[str, Any]) -> dict[str, Any] | None:
        entity_id = system.get("water_meter_sensor", "")
        if not entity_id:
            return None
        state = self.hass.states.get(entity_id)
        value = self._read_numeric(entity_id)
        if state is None or value is None:
            return None
        unit = state.attributes.get("unit_of_measurement")
        factor = self._volume_unit_to_liters(unit)
        if factor is None:
            return None
        return {"value": value, "unit": unit, "liters": value * factor}

    @staticmethod
    def _volume_unit_to_liters(unit: str | None) -> float | None:
        normalized = str(unit or "").strip().lower().replace("³", "3").replace(" ", "")
        return {
            "l": 1.0,
            "liter": 1.0,
            "litre": 1.0,
            "ml": 0.001,
            "m3": 1000.0,
            "gal": 3.785411784,
            "ft3": 28.316846592,
        }.get(normalized)

    @staticmethod
    def _meter_delta_liters(
        start: dict[str, Any] | None, end: dict[str, Any] | None
    ) -> float | None:
        if not start or not end or start.get("unit") != end.get("unit"):
            return None
        delta = float(end["liters"]) - float(start["liters"])
        return delta if delta >= 0 else None

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

    @staticmethod
    def _normal_flow_lpm(system: dict[str, Any]) -> float | None:
        value = float(system.get("normal_flow_rate", 0) or 0)
        return value if value > 0 else None

    def _expected_volume(self, system: dict[str, Any], duration: float) -> float | None:
        flow = self._normal_flow_lpm(system)
        return round(flow * float(duration), 3) if flow else None

    def _within_minimum_interval(self, system: dict[str, Any]) -> bool:
        last_run = system.get("last_run_at")
        if not last_run:
            return False
        try:
            last = datetime.fromisoformat(last_run)
        except ValueError:
            return False
        return datetime.now(UTC) - last < timedelta(
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
        entry = {
            "id": uuid4().hex,
            "system_id": system["id"],
            "system_name": system["name"],
            "timestamp": datetime.now(UTC).isoformat(),
            "trigger": trigger,
            "mode": system["mode"],
            "status": status,
            "reason": decision["reason"],
            "planned_duration": decision["duration"],
            "actual_duration": decision.get("actual_duration"),
            "water_volume_liters": decision.get("water_volume_liters"),
            "water_volume_source": decision.get("water_volume_source"),
            "inputs": decision.get("inputs", {}),
        }
        self.logs.append(entry)
        self._update_aggregate(entry)
        self.logs = self.logs[-LOG_LIMIT:]
        await self._async_changed()

    def _rebuild_aggregates(self) -> None:
        self.aggregates = {}
        for entry in self.logs:
            self._update_aggregate(entry)

    def _update_aggregate(self, entry: dict[str, Any]) -> None:
        if entry.get("trigger") not in {"schedule", "manual", "recovery"}:
            return
        timestamp = datetime.fromisoformat(entry["timestamp"])
        day = dt_util.as_local(timestamp).date().isoformat()
        system_id = entry["system_id"]
        bucket = self.aggregates.setdefault(system_id, {}).setdefault(
            day,
            {
                "date": day,
                "runs": 0,
                "completed": 0,
                "skipped": 0,
                "failed": 0,
                "stopped": 0,
                "duration_minutes": 0.0,
                "water_liters": 0.0,
                "volume_known_runs": 0,
                "exact_volume_runs": 0,
                "estimated_volume_runs": 0,
                "air_temperature_sum": 0.0,
                "air_temperature_count": 0,
                "soil_temperature_1_sum": 0.0,
                "soil_temperature_1_count": 0,
                "soil_temperature_2_sum": 0.0,
                "soil_temperature_2_count": 0,
                "moisture_1_sum": 0.0,
                "moisture_1_count": 0,
                "moisture_2_sum": 0.0,
                "moisture_2_count": 0,
            },
        )
        bucket["runs"] += 1
        status = entry.get("status")
        if status in {"completed", "skipped", "failed", "stopped"}:
            bucket[status] += 1
        duration = entry.get("actual_duration")
        if isinstance(duration, (int, float)):
            bucket["duration_minutes"] = round(bucket["duration_minutes"] + duration, 3)
        volume = entry.get("water_volume_liters")
        if isinstance(volume, (int, float)):
            bucket["water_liters"] = round(bucket["water_liters"] + volume, 3)
            bucket["volume_known_runs"] += 1
            source = entry.get("water_volume_source")
            if source == "cumulative_meter":
                bucket["exact_volume_runs"] += 1
            elif source == "flow_estimate":
                bucket["estimated_volume_runs"] += 1
        inputs = entry.get("inputs", {})
        temperature = inputs.get("weather", {}).get("temperature")
        if isinstance(temperature, (int, float)):
            bucket["air_temperature_sum"] += temperature
            bucket["air_temperature_count"] += 1
        for index, value in enumerate(inputs.get("soil_temperatures", [])[:2], 1):
            if isinstance(value, (int, float)):
                bucket[f"soil_temperature_{index}_sum"] += value
                bucket[f"soil_temperature_{index}_count"] += 1
        for index, reading in enumerate(inputs.get("moisture", [])[:2], 1):
            if reading.get("valid") and isinstance(reading.get("value"), (int, float)):
                bucket[f"moisture_{index}_sum"] += reading["value"]
                bucket[f"moisture_{index}_count"] += 1

    def total_water_liters(self, system_id: str) -> float:
        return round(
            sum(
                day.get("water_liters", 0)
                for day in self.aggregates.get(system_id, {}).values()
            ),
            3,
        )

    def total_duration_minutes(self, system_id: str) -> float:
        return round(
            sum(
                day.get("duration_minutes", 0)
                for day in self.aggregates.get(system_id, {}).values()
            ),
            3,
        )

    def next_run(self, system_id: str) -> datetime | None:
        system = self.systems.get(system_id)
        if not system or not system.get("enabled") or system.get("maintenance_mode"):
            return None
        try:
            hour, minute = (int(part) for part in system["start_time"].split(":"))
        except (ValueError, AttributeError):
            return None
        now = dt_util.now()
        paused_until = str(system.get("paused_until", "")).strip()
        resume_date = date.fromisoformat(paused_until) if paused_until else now.date()
        for offset in range(15):
            candidate = (now + timedelta(days=offset)).replace(
                hour=hour, minute=minute, second=0, microsecond=0
            )
            if candidate < now or candidate.date() < resume_date:
                continue
            if candidate.weekday() in system.get("days", []):
                return dt_util.as_utc(candidate)
        return None

    async def _async_changed(self) -> None:
        await self._async_save()
        await self._async_notify()

    async def _async_save(self) -> None:
        await self.store.async_save(
            {
                "systems": self.systems,
                "logs": self.logs,
                "active_runs": self.persisted_runs,
                "pending_checks": self.pending_checks,
                "calibrations": self.calibrations,
                "aggregates": self.aggregates,
                "notification_logs": self.notification_logs,
                "battery_alerts": self.battery_alerts,
                "schema_version": DATA_SCHEMA_VERSION,
            }
        )

    async def _async_notify(self) -> None:
        self.hass.bus.async_fire(EVENT_UPDATED, self.snapshot())

    def _get_system(self, system_id: str) -> dict[str, Any]:
        system = self.systems.get(system_id)
        if system is None:
            raise ValueError("system_not_found")
        return system
