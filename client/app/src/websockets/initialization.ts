import {dispatcher} from "./dispatcher";
import {getAccessToken} from "../services/access-token-action";
import {AuthService} from "../services/auth.service";
import {HOST_NAME} from "../config";

const UNAUTHORIZED_CODE: number = 4001;
const CLIENT_CLOSE: number = 4000;
const REOPEN_TIME: number = 2000;

export let ws: WebSocket;

export function wsInitialization() {
    if (getAccessToken()) {
        wsConfigure();
    }
}

export function wsConfigure() {

    if (ws && ws.readyState === WebSocket.OPEN)
        ws.close(CLIENT_CLOSE);

    if (window.location.protocol === 'https:')
        ws = new WebSocket(`wss://${HOST_NAME}/ws`);
    else
        ws = new WebSocket(`ws://${HOST_NAME}/ws`);

    ws.onopen = onOpen;

    ws.onmessage = onMessage;

    ws.onerror = onError;

    ws.onclose = onClose;
}


function onOpen(event: Event) {}

async function onMessage(event: MessageEvent) {
    const message = JSON.parse(event.data);

    await dispatcher(message);
}

function onError(error: Event) {}


async function onClose(event: CloseEvent) {
    if (event.code === CLIENT_CLOSE)
        return;

    if (event.code === UNAUTHORIZED_CODE) {
        const token = await AuthService.refresh();
        if (token)
            setTimeout(tryReopen, REOPEN_TIME);
        else
            return;
    }

    setTimeout(tryReopen, REOPEN_TIME);
}

function tryReopen() {
    if (ws && ws.readyState === WebSocket.OPEN) return;

    wsInitialization();
}

