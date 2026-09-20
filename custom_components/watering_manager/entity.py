"""Shared native entities for Watering Manager."""

from __future__ import annotations

from typing import Any

from homeassistant.core import Event, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity import Entity

from .const import DOMAIN, EVENT_UPDATED
from .manager import WateringManager


class WateringManagerEntity(Entity):
    """Base entity backed by one configured watering system."""

    _attr_has_entity_name = True

    def __init__(self, manager: WateringManager, system_id: str, key: str) -> None:
        self.manager = manager
        self.system_id = system_id
        self._attr_unique_id = f"{system_id}_{key}"

    @property
    def system(self) -> dict[str, Any] | None:
        return self.manager.systems.get(self.system_id)

    @property
    def available(self) -> bool:
        return self.system is not None

    @property
    def device_info(self) -> DeviceInfo:
        system = self.system or {}
        return DeviceInfo(
            identifiers={(DOMAIN, self.system_id)},
            name=system.get("name", "Watering system"),
            manufacturer="Watering Manager",
            model="Managed irrigation zone",
            sw_version="0.4.1",
        )

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(
            self.hass.bus.async_listen(EVENT_UPDATED, self._handle_update)
        )

    @callback
    def _handle_update(self, event: Event) -> None:
        self.async_write_ha_state()
