import ChatMessagesComponent from "../components/chat-messages/chat-messages.component";

export function openChat(chat) {
  let chatWindow = document.getElementsByClassName('messenger-chat')[0];

  const chatComponent = new ChatMessagesComponent(chat);

  chatWindow.innerHTML = chatComponent.render();
}