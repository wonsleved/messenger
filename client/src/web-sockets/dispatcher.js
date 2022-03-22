import { CHAT_MESSAGE } from './message-events';
import {appendMessage} from "../UI/general/append-message";


export function dispatcher(message) {
  console.log(message);
  switch (message.event) {
    case CHAT_MESSAGE: {
      return chatMessageEvent(message);
    }
    default: {
      alert('unknown type of message');
    }
  }

}

async function chatMessageEvent(message) {
  if (!message.payload || !message.payload.body)
    alert('error with payload');

  if (message.payload.chatId !== window.store.getState().currentChat?.id)
    return;


  let messageInfo = {
    name: message.payload.authorName,
    content: message.payload.body,
    isOwner: false,
    date: message.payload.date
  }

  appendMessage(messageInfo);
}


