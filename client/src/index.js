import {routerInit} from "./UI/initialization/router.initialization";
import {storeInit} from "./UI/initialization/store.initialization";
import { applyErrorEventListener, getErrorEvent  } from "./UI/events/error.event";
import {dispatcher} from "./web-sockets/dispatcher";
import {sendMessage} from "./web-sockets/send-message";


//  Что-то с роутером. Нельзя перейти через /messenger, но можно стрелочками

(async function() {

  await storeInit();

  window.getErrorEvent = getErrorEvent;

  routerInit();

  applyErrorEventListener();

  let socket = new WebSocket("ws://localhost/ws");

  socket.onopen = function(event) {
    console.log("[open] Соединение установлено");
    console.log(event);

  };

  socket.onmessage = function(event) {

    const message = JSON.parse(event.data);

    dispatcher(message);
  };

  socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
  };

  window.sendWsMessage = sendMessage.bind(null, socket);

})();


