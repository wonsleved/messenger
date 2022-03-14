import {Router} from './modules/router/index.js'
import Main from './components/main/main.module.js';
import SignUpComponent from './components/sign-up/sign-up.module.js';
import SignInComponent from './components/sign-in/sign-in.module.js';
import MessengerComponent from "./components/messenger/messenger.component";

import createStore from "../store/store";
import reducer from "../store/rootReducer";

import {UserService} from "../services/user.service";
let user;

(async function() {
  user = await UserService.getMyInfo();

  const initialState = {
    user
  };

  window.store = createStore(reducer, initialState);

  const router = new Router('.root');

  router.default('/');

  console.log('state:   ');
  console.log(window.store.state);

  if (window.store.getState().user) {
    router
      .use('/', MessengerComponent)
      .start();
  } else {
    router
      .use('/', Main)
      .use('/register', SignUpComponent)
      .use('/login', SignInComponent)
      .start();
  }


  window.router = router;
  window.store.subscribe(manipulateRouter);

  function manipulateRouter(state, action) {
    console.log(action);
    console.log(state);
    if (action.type === "AUTH" && state.user) {
      router.clear()
        .use('/', MessengerComponent)
      ;
    }
    else if (action.type === "LOGOUT") {
      router.clear()
        .use('/', Main)
        .use('/register', SignUpComponent)
        .use('/login', SignInComponent)

    }
  }
})();
