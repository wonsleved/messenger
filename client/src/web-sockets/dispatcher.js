import { CHAT_MESSAGE, ERROR_OCCUR } from './message-events';
import {appendMessage} from "../UI/general/append-message";
import {handleError} from "../services/error-handlers";



export function dispatcher(message) {
  switch (message.event) {
    case CHAT_MESSAGE: {
      return chatMessageEvent(message.payload);
    }
    case ERROR_OCCUR: {
      return handleError(message.payload)
    }
    default: {
      console.log(message.event);
      alert('unknown type of message');
    }
  }

}

async function chatMessageEvent(payload) {
  if (!payload || !payload.body)
    alert('error with payload');

  if (payload.chatId !== window.store.getState().currentChat?.id)
    return;


  let messageInfo = {
    name: payload.authorName,
    content: payload.body,
    isOwner: false,
    date: payload.date
  }

  appendMessage(messageInfo);
}


