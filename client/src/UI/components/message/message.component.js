import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {messageTemplate} from "./message.template";


export default class MessageComponent extends Block {
  constructor(messageInfo) {
    super('div', {
      isOwner: messageInfo.isOwner,
      name: messageInfo.name,
      date: messageInfo.date,
      content: messageInfo.content
    });
  }

  render() {
    return compile(messageTemplate, this.props);
  }
}
