"""WebSocket API used by the Watering Manager panel."""

from __future__ import annotations

import logging

import probatio
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from .manager import WateringManager

_LOGGER = logging.getLogger(__name__)


def async_register_websocket_api(hass: HomeAssistant, manager: WateringManager) -> None:
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
            system = await manager.async_update_system(msg["system_id"], msg["system"])
        except (ValueError, HomeAssistantError) as err:
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
        except (ValueError, HomeAssistantError) as err:
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

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/preview_decision",
            probatio.Required("system_id"): str,
        }
    )
    @websocket_api.async_response
    async def preview_decision(hass, connection, msg):
        try:
            preview = await manager.async_preview_decision(msg["system_id"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], preview)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/test_valve",
            probatio.Required("system_id"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def test_valve(hass, connection, msg):
        try:
            await manager.async_test_valve(msg["system_id"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], None)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/test_notification",
            probatio.Required("system_id"): str,
            probatio.Required("destination"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def test_notification(hass, connection, msg):
        try:
            await manager.async_test_notification(msg["system_id"], msg["destination"])
        except (ValueError, RuntimeError, HomeAssistantError) as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], None)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/start_calibration",
            probatio.Required("system_id"): str,
            probatio.Required("kind"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def start_calibration(hass, connection, msg):
        if msg["kind"] not in {"flow", "duration"}:
            connection.send_error(msg["id"], "invalid_kind", "invalid_kind")
            return
        try:
            await manager.async_start_calibration(msg["system_id"], msg["kind"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], None)

    @websocket_api.websocket_command(
        {
            probatio.Required("type"): "watering_manager/apply_calibration",
            probatio.Required("system_id"): str,
        }
    )
    @websocket_api.require_admin
    @websocket_api.async_response
    async def apply_calibration(hass, connection, msg):
        try:
            system = await manager.async_apply_calibration(msg["system_id"])
        except ValueError as err:
            connection.send_error(msg["id"], str(err), str(err))
            return
        connection.send_result(msg["id"], system)

    for command in (
        get_state,
        create_system,
        update_system,
        delete_system,
        run_system,
        stop_system,
        preview_decision,
        test_valve,
        test_notification,
        start_calibration,
        apply_calibration,
    ):
        websocket_api.async_register_command(hass, command)
