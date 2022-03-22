import {dispatcher} from "./dispatcher";
import {sendMessage} from "./send-message";
import {getAccessToken} from "../services/access-token-action";


export function wsInitialization() {
  if (getAccessToken()) {
    wsConfigure();
  }
}


export function wsConfigure() {
  if (window.webSocket && window.webSocket.readyState === WebSocket.OPEN)
    window.webSocket.close();

  let socket = new WebSocket("ws://localhost/ws");

  socket.onopen = onOpen;

  socket.onmessage = onMessage;

  socket.onerror = onError;

  socket.onclose = onClose;

  window.sendWsMessage = sendMessage.bind(null, socket); // remove from window and add to 'socket'

  window.webSocket = socket; // mb move to store
}


function onOpen(event) {
  console.log("[open] Соединение установлено");
}

async function onMessage(event) {
  console.log(event);
  const message = JSON.parse(event.data);

  await dispatcher(message);
}

function onError(error) {
  console.log(error.message);
}


function onClose(event) {
  console.log('Try to reopen...');
  setTimeout(wsInitialization, 2000);
}
