import { CHAT_MESSAGE, ERROR_OCCUR, CHATS_UPDATE } from './message-events';
import {appendMessage} from "../UI/general/append-message";
import {handleError} from "../services/error-handlers";
import {loadChats} from "../UI/general/load-chats";
import {throttle} from "../UI/general/throttle"
import {CHATS_UPDATE as CHATS_UPDATE_STORE} from "../web-sockets/message-events";
const THROTTLE_TIME = 5000;

export async function dispatcher(message) {
  switch (message.event) {
    case CHAT_MESSAGE: {
      return chatMessageEvent(message.payload);
    }
    case ERROR_OCCUR: {
      return handleError(message.payload);
    }
    case CHATS_UPDATE: {
      return updateChatsThrottled();
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
    authorName: payload.authorName,
    body: payload.body,
    registry: payload.registry,
    date: payload.date,
  }

  appendMessage(messageInfo);
}

async function updateChats() {
  await loadChats();
}

const updateChatsThrottled = throttle(updateChats, THROTTLE_TIME);


