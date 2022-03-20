import {routerInit} from "./initialization/router.initialization";
import {storeInit} from "./initialization/store.initialization";
import { applyErrorEventListener, getErrorEvent  } from "./events/error.event";


//  Что-то с роутером. Нельзя перейти через /messenger, но можно стрелочками

(async function() {

  await storeInit();

  window.getErrorEvent = getErrorEvent;

  routerInit();

  applyErrorEventListener();

  let socket = new WebSocket("ws://localhost/ws");

  socket.onopen = function(e) {
    alert("[open] Соединение установлено");
  };

  socket.onmessage = function(event) {
    alert(`[message] Данные получены с сервера: ${event.data}`);
  };

  socket.onerror = function(error) {
    alert(`[error] ${error.message}`);
  };

})();


