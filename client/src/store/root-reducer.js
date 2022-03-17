import * as actions from "./actions";


export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case actions.AUTH: return {...state, user: action.payload}

    case actions.LOGOUT: return {...state, user: null};

    case actions.ERROR_OCCUR: return {...state, errors: [...state.errors, action.payload]}

    case actions.ERROR_CLEAR: return {...state, errors: []}

    default: return;
  }
}

