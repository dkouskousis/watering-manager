"""Watering Manager integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import (
    add_extra_js_url,
    async_register_built_in_panel,
    async_remove_panel,
    remove_extra_js_url,
)
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace.const import LOVELACE_DATA, MODE_STORAGE
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import (
    CARD_MODULE_URL,
    CARD_STATIC_URL,
    DOMAIN,
    PANEL_ELEMENT,
    PANEL_MODULE_URL,
    PANEL_STATIC_URL,
    PANEL_URL,
    PLATFORMS,
)
from .manager import WateringManager
from .websocket import async_register_websocket_api


async def _async_register_lovelace_resource(hass: HomeAssistant) -> None:
    """Register the dashboard card as a Lovelace module resource."""
    lovelace = hass.data[LOVELACE_DATA]
    if lovelace.resource_mode != MODE_STORAGE:
        return

    resources = lovelace.resources
    await resources.async_get_info()
    existing = next(
        (
            item
            for item in resources.async_items()
            if item.get("url", "").startswith(CARD_STATIC_URL)
        ),
        None,
    )
    if existing is None:
        await resources.async_create_item(
            {"res_type": "module", "url": CARD_MODULE_URL}
        )
        return

    if existing.get("url") != CARD_MODULE_URL or existing.get("type") != "module":
        await resources.async_update_item(
            existing["id"],
            {"res_type": "module", "url": CARD_MODULE_URL},
        )


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Watering Manager."""
    manager = WateringManager(hass)
    await manager.async_setup()

    registry = er.async_get(hass)
    for system_id in manager.systems:
        entity_id = registry.async_get_entity_id(
            "sensor", DOMAIN, f"{system_id}_water_deficit"
        )
        if entity_id:
            registry.async_remove(entity_id)

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = manager
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    frontend_dir = Path(__file__).parent / "frontend"
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                PANEL_STATIC_URL,
                str(frontend_dir / "watering-manager-panel.js"),
                cache_headers=False,
            ),
            StaticPathConfig(
                CARD_STATIC_URL,
                str(frontend_dir / "watering-manager-card.js"),
                cache_headers=False,
            ),
        ]
    )

    add_extra_js_url(hass, CARD_MODULE_URL)
    await _async_register_lovelace_resource(hass)

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
    remove_extra_js_url(hass, CARD_MODULE_URL)
    async_remove_panel(hass, PANEL_URL)
    return True
