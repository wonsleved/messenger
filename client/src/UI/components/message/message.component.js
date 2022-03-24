import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {messageTemplate} from "./message.template";
import {dateFormatting} from "../../general/date-formatting";

const MY_NOT_READ = 0;
const OTHER_NOT_READ = 2;

export default class MessageComponent extends Block {
  constructor(messageInfo) {
    super('div', {
      isOwner: messageInfo.registry === MY_NOT_READ,
      name: messageInfo.authorName,
      date: dateFormatting(messageInfo.date),
      content: messageInfo.body
    });
  }

  render() {
    return compile(messageTemplate, this.props);
  }
}
