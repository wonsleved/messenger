import {routerInit} from "./UI/initialization/router.initialization";
import {storeInit} from "./UI/initialization/store.initialization";
import { applyErrorEventListener, getErrorEvent  } from "./UI/events/error.event";
import {wsInitialization} from "./web-sockets/initialization";


(async function() {

  await storeInit();

  wsInitialization();

  window.getErrorEvent = getErrorEvent;

  routerInit();

  applyErrorEventListener();



})();


