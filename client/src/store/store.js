export default function createStore(rootReducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = rootReducer(state, action);
    listeners.forEach(listener => listener(state, action));
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  function unsubscribe(listener) {
    listeners = listeners.filter(li => li !== listener);
  }

  return { getState, dispatch, subscribe, unsubscribe };
}

