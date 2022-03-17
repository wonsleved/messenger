const ERROR_EVENT = 'erroroccur';
import ErrorMessageComponent from "../components/error-message/error-message.module";
import { ERROR_CLEAR, ERROR_OCCUR } from "../../store/actions";

const ERROR_ROOT_ELEMENT = '.page';

export function getErrorEvent(message = '') {
  return new CustomEvent(ERROR_EVENT, {
    detail: { message }
  });
}

export function applyErrorEventListener() {
  document.addEventListener(ERROR_EVENT, (event) => errorHandler(event.detail.message));
}

function errorHandler(message) {
  window.store.dispatch({type: ERROR_OCCUR, payload: message});
  showError();
}

function showError() {
  let rootElement = document.querySelector(ERROR_ROOT_ELEMENT);
  let messageComponent = new ErrorMessageComponent(window.store.getState().errors);

  let parser = new DOMParser();
  let doc = parser.parseFromString(messageComponent.render(), "text/html");

  let errorElement = doc.body.children[0];

  rootElement.prepend(errorElement);

  const timerId = setTimeout(hideError.bind(null, rootElement, errorElement), 5000);

  window.store.subscribe(ifNewErrorOccur);

  function ifNewErrorOccur(state, action) {
    if (action.type === ERROR_OCCUR) {
      window.store.unsubscribe(ifNewErrorOccur);
      rootElement.removeChild(errorElement);
      clearTimeout(timerId);
    }
  }

  function hideError(rootElement, errorElement) {
    window.store.unsubscribe(ifNewErrorOccur);
    rootElement.removeChild(errorElement);
    window.store.dispatch({type: ERROR_CLEAR});
  }
}




