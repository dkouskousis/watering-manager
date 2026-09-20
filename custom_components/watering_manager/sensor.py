"""Native sensors exposed by Watering Manager."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, UnitOfTime, UnitOfVolume
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, EVENT_UPDATED
from .entity import WateringManagerEntity
from .manager import WateringManager


class WateringSensor(WateringManagerEntity, SensorEntity):
    def __init__(
        self,
        manager: WateringManager,
        system_id: str,
        key: str,
        name: str,
        value: Callable[[WateringManager, str], Any],
        *,
        unit: str | None = None,
        device_class: SensorDeviceClass | None = None,
        state_class: SensorStateClass | None = None,
        options: list[str] | None = None,
    ) -> None:
        super().__init__(manager, system_id, key)
        self._attr_translation_key = key
        self._value = value
        self._attr_native_unit_of_measurement = unit
        self._attr_device_class = device_class
        self._attr_state_class = state_class
        self._attr_options = options

    @property
    def native_value(self):
        return self._value(self.manager, self.system_id)


def _status(manager: WateringManager, system_id: str) -> str:
    if system_id in manager.active_runs or system_id in manager._calibration_tasks:
        return "running"
    system = manager.systems[system_id]
    if system.get("maintenance_mode"):
        return "maintenance"
    if not system.get("enabled"):
        return "disabled"
    return "idle"


def _last_volume(manager: WateringManager, system_id: str):
    for entry in reversed(manager.logs):
        if (
            entry.get("system_id") == system_id
            and entry.get("water_volume_liters") is not None
        ):
            return entry["water_volume_liters"]
    return None


def _definitions(manager: WateringManager, system_id: str) -> list[SensorEntity]:
    return [
        WateringSensor(
            manager,
            system_id,
            "status",
            "Status",
            _status,
            device_class=SensorDeviceClass.ENUM,
            options=["idle", "running", "maintenance", "disabled"],
        ),
        WateringSensor(
            manager,
            system_id,
            "next_run",
            "Next run",
            lambda m, sid: m.next_run(sid),
            device_class=SensorDeviceClass.TIMESTAMP,
        ),
        WateringSensor(
            manager,
            system_id,
            "last_water_volume",
            "Last water volume",
            _last_volume,
            unit=UnitOfVolume.LITERS,
            state_class=SensorStateClass.MEASUREMENT,
        ),
        WateringSensor(
            manager,
            system_id,
            "total_water",
            "Total water",
            lambda m, sid: m.total_water_liters(sid),
            unit=UnitOfVolume.LITERS,
            device_class=SensorDeviceClass.WATER,
            state_class=SensorStateClass.TOTAL_INCREASING,
        ),
        WateringSensor(
            manager,
            system_id,
            "total_duration",
            "Total watering time",
            lambda m, sid: m.total_duration_minutes(sid),
            unit=UnitOfTime.MINUTES,
            device_class=SensorDeviceClass.DURATION,
            state_class=SensorStateClass.TOTAL_INCREASING,
        ),
        WateringSensor(
            manager,
            system_id,
            "moisture_1",
            "Soil moisture 1",
            lambda m, sid: m._read_numeric(m.systems[sid].get("moisture_sensor_1", "")),
            unit=PERCENTAGE,
            device_class=SensorDeviceClass.MOISTURE,
            state_class=SensorStateClass.MEASUREMENT,
        ),
        WateringSensor(
            manager,
            system_id,
            "moisture_2",
            "Soil moisture 2",
            lambda m, sid: m._read_numeric(m.systems[sid].get("moisture_sensor_2", "")),
            unit=PERCENTAGE,
            device_class=SensorDeviceClass.MOISTURE,
            state_class=SensorStateClass.MEASUREMENT,
        ),
    ]


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    manager: WateringManager = hass.data[DOMAIN][entry.entry_id]
    known: set[str] = set()

    @callback
    def add_new(_event=None) -> None:
        new_ids = set(manager.systems) - known
        if new_ids:
            known.update(new_ids)
            async_add_entities(
                [
                    entity
                    for system_id in new_ids
                    for entity in _definitions(manager, system_id)
                ]
            )

    add_new()
    entry.async_on_unload(hass.bus.async_listen(EVENT_UPDATED, add_new))
