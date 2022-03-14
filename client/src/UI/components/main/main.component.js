import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatsTemplate} from './main.template.js';


export default class ChatsComponent extends Block {
  constructor() {
    super('div', {
      signUp: () => window.router.go('/register'),
      signIn: () => window.router.go('/login')
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
