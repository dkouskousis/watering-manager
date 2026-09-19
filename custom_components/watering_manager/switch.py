"""Native switches exposed by Watering Manager."""

from __future__ import annotations

from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, EVENT_UPDATED
from .entity import WateringManagerEntity
from .manager import WateringManager


class WateringSettingSwitch(WateringManagerEntity, SwitchEntity):
    def __init__(
        self, manager: WateringManager, system_id: str, key: str, name: str
    ) -> None:
        super().__init__(manager, system_id, key)
        self.setting_key = key
        self._attr_translation_key = key

    @property
    def is_on(self) -> bool:
        return bool(self.system and self.system.get(self.setting_key))

    async def async_turn_on(self, **kwargs) -> None:
        await self.manager.async_update_system(self.system_id, {self.setting_key: True})

    async def async_turn_off(self, **kwargs) -> None:
        await self.manager.async_update_system(
            self.system_id, {self.setting_key: False}
        )


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
                        WateringSettingSwitch(manager, sid, "enabled", "Enabled"),
                        WateringSettingSwitch(
                            manager, sid, "maintenance_mode", "Maintenance mode"
                        ),
                    )
                ]
            )

    add_new()
    entry.async_on_unload(hass.bus.async_listen(EVENT_UPDATED, add_new))
