import ChatMessagesComponent from "../components/chat-messages/chat-messages.component";
import {CHAT_OPEN} from "../../store/actions";

export function openChat(chat) {
  let chatWindow = document.getElementsByClassName('messenger-chat')[0];

  window.store.dispatch({type: CHAT_OPEN, payload: chat});

  const chatComponent = new ChatMessagesComponent(chat);

  chatWindow.innerHTML = chatComponent.render();
}