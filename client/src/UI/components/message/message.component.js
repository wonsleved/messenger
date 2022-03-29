import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {messageTemplate} from "./message.template";
import {dateFormatting} from "../../general/date-formatting";
import {sanitizeTextContent} from "../../general/sanitize-text-content";

const MY_NOT_READ = 0;
const OTHER_NOT_READ = 2;

export default class MessageComponent extends Block {
  constructor(messageInfo) {
    super('div', {
      isOwner: messageInfo.registry === MY_NOT_READ,
      name: sanitizeTextContent(messageInfo.authorName),
      date: dateFormatting(messageInfo.date),
      content: sanitizeTextContent(messageInfo.body)
    });
  }

  render() {
    return compile(messageTemplate, this.props);
  }
}
