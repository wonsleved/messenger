import MessageComponent from "../components/message/message.component";

export function appendMessage(messageInfo) {
  let messagesList = document.getElementsByClassName('messages-list')[0];
  const parser = new DOMParser();
  const doc = parser.parseFromString(new MessageComponent(messageInfo).render(), 'text/html');
  messagesList.prepend(doc.body.children[0]);
}