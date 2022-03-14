import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatsTemplate} from './messenger.template.js';
import {AuthService} from "../../../services/auth.service";

async function logout(event) {
  event.preventDefault();

  let userData = await AuthService.logout();

  window.store.dispatch({ type: "LOGOUT" });

  window.router.go('/');
}

export default class MessengerComponent extends Block {
  constructor() {
    super('div', {
      logoutAction: logout,
      username: window.store.getState().user.username
    });



  }

  render() {
    return compile(chatsTemplate, this.props);
  }
}
