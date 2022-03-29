import {dispatcher} from "./dispatcher";
import {sendMessage} from "./send-message";
import {getAccessToken} from "../services/access-token-action";
import {AuthService} from "../services/auth.service";
import {HOST_NAME} from "../config";

const UNAUTHORIZED_CODE = 4001;
const CLIENT_CLOSE = 4000;


export function wsInitialization() {
  if (getAccessToken()) {
    wsConfigure();
  }
}

export function wsConfigure() {
  if (window.webSocket && window.webSocket.readyState === WebSocket.OPEN)
    window.webSocket.close(CLIENT_CLOSE);

  let socket;

  if (location.protocol === 'https:')
    socket = new WebSocket(`wss://${HOST_NAME}/ws`);
  else
    socket = new WebSocket(`ws://${HOST_NAME}/ws`);

  socket.onopen = onOpen;

  socket.onmessage = onMessage;

  socket.onerror = onError;

  socket.onclose = onClose;

  window.sendWsMessage = sendMessage.bind(null, socket); // remove from window and add to 'socket'

  window.webSocket = socket; // mb move to store
}


function onOpen(event) {
  // console.log("[open] Соединение установлено");
}

async function onMessage(event) {
  console.log(event);
  const message = JSON.parse(event.data);

  await dispatcher(message);
}

function onError(error) {
  console.log(error.message);
}


async function onClose(event) {
  // console.log('[close]');
  if (event.code === CLIENT_CLOSE)
    return;

  console.log(event);
  if (event.code === UNAUTHORIZED_CODE) {
    const token = await AuthService.refresh();
    if (token)
      setTimeout(tryReopen, 2000);
    else
      return;
  }


  console.log('Try to reopen...');
  setTimeout(tryReopen, 2000);
}

function tryReopen() {
  if (window.webSocket && window.webSocket.readyState === WebSocket.OPEN)
    return;

  wsInitialization();
}

