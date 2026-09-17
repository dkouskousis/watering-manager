"""Diagnostics for Watering Manager."""

from __future__ import annotations

from copy import deepcopy
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .manager import WateringManager


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    """Return diagnostics without notes."""
    manager: WateringManager = hass.data[DOMAIN][entry.entry_id]
    data = deepcopy(manager.snapshot())
    for system in data["systems"]:
        system["notes"] = "REDACTED"
    return data
