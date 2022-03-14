export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case 'AUTH': {
      return {...state, user: action.payload}
    }
    case 'LOGOUT': {
      return {...state, user: null};
    }
    default: {
      return;
    }

  }


}