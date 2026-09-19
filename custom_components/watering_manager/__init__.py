"""Watering Manager integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import (
    async_register_built_in_panel,
    async_remove_panel,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    PANEL_ELEMENT,
    PANEL_MODULE_URL,
    PANEL_STATIC_URL,
    PANEL_URL,
    PLATFORMS,
)
from .manager import WateringManager
from .websocket import async_register_websocket_api


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Watering Manager."""
    manager = WateringManager(hass)
    await manager.async_setup()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = manager
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    frontend_path = Path(__file__).parent / "frontend" / "watering-manager-panel.js"
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                PANEL_STATIC_URL,
                str(frontend_path),
                cache_headers=False,
            )
        ]
    )

    async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title="Πότισμα"
        if hass.config.language.startswith("el")
        else "Watering",
        sidebar_icon="mdi:sprinkler-variant",
        frontend_url_path=PANEL_URL,
        config={
            "_panel_custom": {
                "name": PANEL_ELEMENT,
                "module_url": PANEL_MODULE_URL,
                "embed_iframe": False,
                "trust_external": False,
            }
        },
        require_admin=False,
    )
    async_register_websocket_api(hass, manager)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload Watering Manager."""
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    manager: WateringManager = hass.data[DOMAIN].pop(entry.entry_id)
    await manager.async_unload()
    async_remove_panel(hass, PANEL_URL)
    return True
