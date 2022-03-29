import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {signUpTemplate} from './sign-up.template.js';
import {AUTH} from '../../../store/actions';

import {AuthService} from "../../../services/auth.service.js";


export default class SignUpComponent extends Block {
  constructor() {
    super('div', {
      signIn: () => window.router.go('/login'),
      goMain: () => window.router.go('/'),
      submitAction: register
    });
  }

  render() {
    return compile(signUpTemplate, this.props);
  }
}


async function register(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = await AuthService.register(username, name, password);

  if (!user)
    return;

  const action = {
    type: AUTH,
    payload: user
  }

  window.store.dispatch(action);

  window.router.go('/messenger');
}
