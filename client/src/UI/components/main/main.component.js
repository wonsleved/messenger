import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {mainTemplate} from './main.template.js';


export default class ChatsComponent extends Block {
  constructor() {
    super('div', {
      signUp: () => window.router.go('/register'),
      signIn: () => window.router.go('/login'),
    });



  }

  render() {
    return compile(mainTemplate, this.props);
  }
}
