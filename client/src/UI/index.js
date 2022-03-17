import {routerInit} from "./initialization/router.initialization";
import {storeInit} from "./initialization/store.initialization";
import { applyErrorEventListener, getErrorEvent  } from "./events/error.event";


//  Что-то с роутером. Нельзя перейти через /messenger, но можно стрелочками

(async function() {

  await storeInit();

  window.getErrorEvent = getErrorEvent;

  routerInit();

  applyErrorEventListener();

})();


