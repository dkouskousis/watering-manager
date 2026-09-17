"""WebSocket API used by the Watering Manager panel."""

from __future__ import annotations

import logging

import probatio

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .manager import WateringManager

_LOGGER = logging.getLogger(__name__)


def async_register_websocket_api(
    hass: HomeAssistant, manager: WateringManager
) -> None:
    """Register panel commands."""

    @websocket_api.websocket_command(
        {probatio.Required("type"): "watering_manager/get_state"}
    )
    @websocket_api.async_response
    async def get_state(hass, connection, msg):
        connection.send_result(msg["id"], manager.snapshot())

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/create_system",
            probatio.Required("system"): dict,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def create_system(hass, connection, msg):
        try:
            system = await manager.async_create_system(msg["system"])
        except Exception as err:
            _LOGGER.exception("Unable to create watering system")
            connection.send_error(
                msg["id"], "create_failed", f"Unable to create system: {err}"
            )
            return
        connection.send_result(msg["id"], system)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/update_system",
            probatio.Required("system_id"): str,
            probatio.Required("system"): dict,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def update_system(hass, connection, msg):
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
            probatio.Required("type"): "watering_manager/delete_system",
            probatio.Required("system_id"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def delete_system(hass, connection, msg):
        try:
            await manager.async_delete_system(msg["system_id"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], None)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/run_system",
            probatio.Required("system_id"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def run_system(hass, connection, msg):
        try:
            decision = await manager.async_run_system(msg["system_id"], "manual")
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], decision)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/stop_system",
            probatio.Required("system_id"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def stop_system(hass, connection, msg):
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
