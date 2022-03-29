import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {signInTemplate} from './sign-in.template.js';
import {AUTH} from '../../../store/actions';

import {AuthService} from "../../../services/auth.service.js";

export default class SignInComponent extends Block {
  constructor() {
    super('div', {
      signUp: () => window.router.go('/register'),
      goMain: () => window.router.go('/'),
      submitAction: login
    });
  }

  render() {
    return compile(signInTemplate, this.props);
  }
}

async function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;


  const user = await AuthService.login(username, password);

  if (!user)
    return;

  const action = {
    type: AUTH,
    payload: user
  }

  window.store.dispatch(action);

  window.router.go('/messenger');
}
