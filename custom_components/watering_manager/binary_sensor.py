"""Native binary sensors exposed by Watering Manager."""

from __future__ import annotations

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, EVENT_UPDATED
from .entity import WateringManagerEntity
from .manager import WateringManager


class WateringActiveBinarySensor(WateringManagerEntity, BinarySensorEntity):
    _attr_translation_key = "active"
    _attr_device_class = BinarySensorDeviceClass.RUNNING

    def __init__(self, manager: WateringManager, system_id: str) -> None:
        super().__init__(manager, system_id, "active")

    @property
    def is_on(self) -> bool:
        return (
            self.system_id in self.manager.active_runs
            or self.system_id in self.manager._calibration_tasks
        )


class WateringProblemBinarySensor(WateringManagerEntity, BinarySensorEntity):
    _attr_translation_key = "problem"
    _attr_device_class = BinarySensorDeviceClass.PROBLEM

    def __init__(self, manager: WateringManager, system_id: str) -> None:
        super().__init__(manager, system_id, "problem")

    @property
    def is_on(self) -> bool:
        system = self.system
        return bool(system and self.manager._diagnostics(system)["status"] != "healthy")


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
                    for sid in new_ids
                    for entity in (
                        WateringActiveBinarySensor(manager, sid),
                        WateringProblemBinarySensor(manager, sid),
                    )
                ]
            )

    add_new()
    entry.async_on_unload(hass.bus.async_listen(EVENT_UPDATED, add_new))
