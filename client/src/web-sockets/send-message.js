import {CHAT_MESSAGE} from "./message-events";

export function sendMessage(socket, chatId, body) {
  const message = {
    event: CHAT_MESSAGE,
    payload: {
      chatId,
      body
    }
  }

  socket.send(JSON.stringify(message));
}

