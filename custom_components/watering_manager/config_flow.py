"""Config flow for Watering Manager."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class WateringManagerConfigFlow(ConfigFlow, domain=DOMAIN):
    """Configure Watering Manager."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create the single Watering Manager entry."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            return self.async_create_entry(title="Watering Manager", data={})

        return self.async_show_form(step_id="user")
