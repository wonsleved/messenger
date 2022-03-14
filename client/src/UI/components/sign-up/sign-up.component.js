import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatsTemplate} from './sign-up.template.js';

import {AuthService} from "../../../services/auth.service.js";

async function register(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = await AuthService.register(username, name, password);

  if (!user)
    return;

  const action = {
    type: "AUTH",
    payload: user
  }

  window.store.dispatch(action);

  window.router.go('/messenger');
}

export default class SignUpComponent extends Block {
  constructor() {
    super('div', {
      signIn: () => window.router.go('/login'),
      goMain: () => window.router.go('/'),
      submitAction: register
    });
  }

  componentDidMount() {
    // setTimeout(() => {
    //     console.log(`change props`);
    //     this.props.items = [4,5,6];
    // }, 5000);
  }

  render() {
    return compile(chatsTemplate, this.props);
  }
}
