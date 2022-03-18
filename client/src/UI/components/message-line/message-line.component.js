import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {messageLineTemplate} from "./message-line.template";
import MessageComponent from "../message/message.component";


export default class MessageLineComponent extends Block {
  constructor(onSubmit) {
    super('div', {
      onSubmit
    });
  }


  render() {
    return compile(messageLineTemplate, this.props);
  }
}










