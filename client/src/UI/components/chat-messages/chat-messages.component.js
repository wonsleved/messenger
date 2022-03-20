import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatMessagesTemplate} from './chat-messages.template.js';
import MessageComponent from "../message/message.component";
import MessageLineComponent from "../message-line/message-line.component";
import ChatInfoModalComponent from "../chat-info-modal/chat-info-modal.component";

export default class ChatMessagesComponent extends Block {
  constructor(chat) {
    super('div', {
      title: chat.title,
      messages: getMessages(),
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
  }


  render() {
    return compile(chatMessagesTemplate, this.props);
  }
}



function getMessages() {
  let messageInfo = {
    name: 'Sanya',
    content: 'Hello world!',
    isOwner: false,
    date: '18.03.2022 17:10'
  }

  return [new MessageComponent(messageInfo).render()];
}

function onSubmit(event) {
  event.preventDefault();
  let content = event.currentTarget.content.value.trim();

  if (!content)
    return;

  let messageInfo = {
    name: window.store.getState().user.name,
    content,
    isOwner: true,
    date: '18.03.2022 17:10'
  }

  appendMessage(messageInfo);

  event.currentTarget.content.value = '';
}

function appendMessage(messageInfo) {
  let messagesList = document.getElementsByClassName('messages-list')[0];
  const parser = new DOMParser();
  const doc = parser.parseFromString(new MessageComponent(messageInfo).render(), 'text/html');
  messagesList.prepend(doc.body.children[0]);
}












