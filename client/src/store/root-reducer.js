import * as actions from "./actions";
import {CHAT_OPEN} from "./actions";


export default function reducer(state = {}, action = {}) {
  switch (action.type) {

    case actions.AUTH: return {...state, user: action.payload}

    case actions.LOGOUT: return {...state, user: null};

    case actions.ERROR_OCCUR: return {...state, errors: [...state.errors, action.payload]}

    case actions.ERROR_CLEAR: return {...state, errors: []}

    case actions.CONTACTS_UPDATE: return {...state, contacts: action.payload}

    case actions.CHATS_UPDATE: return {...state, chats: action.payload}

    case actions.CHAT_OPEN : return {...state, currentChat: action.payload}

    default: return state;
  }
}

