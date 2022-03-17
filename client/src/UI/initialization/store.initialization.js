import {UserService} from "../../services/user.service";
import createStore from "../../store/store";
import reducer from "../../store/root-reducer";
import {AUTH, LOGOUT} from "../../store/actions";
import MessengerComponent from "../components/messenger/messenger.component";
import Main from "../components/main/main.component";
import SignUpComponent from "../components/sign-up/sign-up.component";
import SignInComponent from "../components/sign-in/sign-in.component";


export async function storeInit() {
  let user = await UserService.getMyInfo();
  const initialState = {
    user,
    errors: []
  };
  window.store = createStore(reducer, initialState);

  window.store.subscribe(manipulateRouter);
}

function manipulateRouter(state, action) {
  if (action.type === AUTH && state.user) {
    router.clear()
      .use('/', MessengerComponent)
    ;
  }
  else if (action.type === LOGOUT) {
    router.clear()
      .use('/', Main)
      .use('/register', SignUpComponent)
      .use('/login', SignInComponent)
  }
}
