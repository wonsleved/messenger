import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatTemplate} from './chat.template';
import personImgSrc from '../../images/person.svg';
import ChatMessagesComponent from "../chat-messages/chat-messages.module";
import CloneDeep from "../../utils/cloneDeep";


export default class ChatComponent extends Block {
  constructor(chat) {
    super('div', {
      personImgSrc,
      chat,
      openChat: openChat(chat)
    });
  }


  render() {
    return compile(chatTemplate, this.props);
  }
}

function openChat(chat) {

  function openConversation(event) {
    event.preventDefault();

    let chatWindow = document.getElementsByClassName('messenger-chat')[0];

    const chatComponent = new ChatMessagesComponent(chat);

    chatWindow.innerHTML = chatComponent.render();
  }

  return openConversation;
}




