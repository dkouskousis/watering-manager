"""WebSocket API used by the Watering Manager panel."""

from __future__ import annotations

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .manager import WateringManager


def async_register_websocket_api(
    hass: HomeAssistant, manager: WateringManager
) -> None:
    """Register panel commands."""

    @websocket_api.websocket_command(
        {vol.Required("type"): "watering_manager/get_state"}
    )
    @websocket_api.async_response
    async def get_state(hass, connection, msg):
        connection.send_result(msg["id"], manager.snapshot())

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "watering_manager/create_system",
            vol.Required("system"): dict,
        }
    )
    @websocket_api.async_response
    async def create_system(hass, connection, msg):
        connection.require_admin()
        system = await manager.async_create_system(msg["system"])
        connection.send_result(msg["id"], system)

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "watering_manager/update_system",
            vol.Required("system_id"): str,
            vol.Required("system"): dict,
        }
    )
    @websocket_api.async_response
    async def update_system(hass, connection, msg):
        connection.require_admin()
        try:
            system = await manager.async_update_system(
                msg["system_id"], msg["system"]
            )
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], system)

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "watering_manager/delete_system",
            vol.Required("system_id"): str,
        }
    )
    @websocket_api.async_response
    async def delete_system(hass, connection, msg):
        connection.require_admin()
        try:
            await manager.async_delete_system(msg["system_id"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], None)

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "watering_manager/run_system",
            vol.Required("system_id"): str,
        }
    )
    @websocket_api.async_response
    async def run_system(hass, connection, msg):
        connection.require_admin()
        try:
            decision = await manager.async_run_system(msg["system_id"], "manual")
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], decision)

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "watering_manager/stop_system",
            vol.Required("system_id"): str,
        }
    )
    @websocket_api.async_response
    async def stop_system(hass, connection, msg):
        connection.require_admin()
        try:
            await manager.async_stop_system(msg["system_id"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], None)

    for command in (
        get_state,
        create_system,
        update_system,
        delete_system,
        run_system,
        stop_system,
    ):
        websocket_api.async_register_command(hass, command)
