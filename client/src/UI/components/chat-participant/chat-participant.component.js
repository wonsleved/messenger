import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatParticipantTemplate} from "./chat-participant.template";

export default class ChatParticipantComponent extends Block {
  constructor(name, username) {
    super('div', {
      name,
      username
    });

  }

  render() {
    return compile(chatParticipantTemplate, this.props);
  }
}


