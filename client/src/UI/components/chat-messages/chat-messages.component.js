import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatMessagesTemplate} from './chat-messages.template.js';
import MessageComponent from "../message/message.component";
import MessageLineComponent from "../message-line/message-line.component";
import ChatInfoModalComponent from "../chat-info-modal/chat-info-modal.component";
import {appendMessage} from "../../general/append-message";
import {MessageService} from "../../../services/message.service";
import {dateFormatting} from "../../general/date-formatting";
import {getErrorEvent} from "../../events/error.event";

export default class ChatMessagesComponent extends Block {
  constructor(chat) {
    super('div', {
      title: chat.title,
      messageLine: new MessageLineComponent(onSubmit).render(),
      showChatInfo
    });

    this.chat = chat;

    function showChatInfo(event) {
      event.preventDefault();

      let rootElement = document.getElementsByClassName('page')[0];

      const parser = new DOMParser();
      const chatInfoModalComponent = new ChatInfoModalComponent(chat, closeContactInfoModal, showChatInfo);
      const doc = parser.parseFromString(chatInfoModalComponent.render(), 'text/html');

      rootElement.prepend(doc.body.children[0]);
    }

    function closeContactInfoModal(event) {
      const rootElement = document.getElementsByClassName('page')[0];
      const modalWindow = document.querySelector('[data-modal="chat-info"]');
      if (rootElement && modalWindow)
        rootElement.removeChild(modalWindow);
    }



    function onSubmit(event) {
      event.preventDefault();
      let content = event.currentTarget.content.value.trim();

      if (content.length > 255)
        return document.dispatchEvent(getErrorEvent(`Length must be less than 255, now ${content.length}`));

      if (!content)
        return;

      let messageInfo = {
        authorName: window.store.getState().user.name,
        body: content,
        registry: 0,
        date: new Date()
      }

      appendMessage(messageInfo);

      window.sendWsMessage(chat.id, content);

      event.currentTarget.content.value = '';
    }

    async function getMessages() {

      let messages = await MessageService.getChatMessages(chat.id);

      let messageComponents = messages.map(mess => new MessageComponent(mess).render());

      return messageComponents;
    }
  }


  render() {
    return compile(chatMessagesTemplate, this.props);
  }
}

















