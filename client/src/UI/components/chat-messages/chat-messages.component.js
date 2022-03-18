import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatMessagesTemplate} from './chat-messages.template.js';
import MessageComponent from "../message/message.component";
import MessageLineComponent from "../message-line/message-line.component";


export default class ChatMessagesComponent extends Block {
  constructor(chat) {
    super('div', {
      title: chat.title,
      messages: getMessages(),
      messageLine: new MessageLineComponent(onSubmit).render()
    });

    this.chat = chat;
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
  let content = event.currentTarget.content.value;

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












