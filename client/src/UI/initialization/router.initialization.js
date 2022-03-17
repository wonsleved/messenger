import {Router} from "../modules/router";
import MessengerComponent from "../components/messenger/messenger.component";
import Main from "../components/main/main.component";
import SignUpComponent from "../components/sign-up/sign-up.component";
import SignInComponent from "../components/sign-in/sign-in.component";


export function routerInit() {
  const router = new Router('.root');

  router.default('/');

  if (window.store.getState().user)
    router
      .use('/', MessengerComponent);
  else
    router
      .use('/', Main)
      .use('/register', SignUpComponent)
      .use('/login', SignInComponent);

  router.start();

  window.router = router;

  return router;
}
