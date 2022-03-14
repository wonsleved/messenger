export default function createStore(rootReducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    console.log(state);
    return state;
  }

  function dispatch(action) {
    console.log(action);
    state = rootReducer(state, action);
    listeners.forEach(listener => listener(state, action));
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  // dispatch({});

  return { getState, dispatch, subscribe, state };
}

