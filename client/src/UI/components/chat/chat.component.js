import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatTemplate} from './chat.template';
import personImgSrc from '../../images/person.svg';
import ChatMessagesComponent from "../chat-messages/chat-messages.module";
import CloneDeep from "../../utils/cloneDeep";
import {openChat} from "../../general/open-chat";


export default class ChatComponent extends Block {
  constructor(chat) {
    super('div', {
      personImgSrc,
      chat,
      openChat: openChatCreator(chat)
    });
  }


  render() {
    return compile(chatTemplate, this.props);
  }
}

function openChatCreator(chat) {

  async function openConversation(event) {
    event.preventDefault();

    await openChat(chat);
  }

  return openConversation;
}




