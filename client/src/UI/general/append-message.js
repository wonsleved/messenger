import MessageComponent from "../components/message/message.component";

export function appendMessage(messageInfo) {
  console.log('ee')
  let messagesList = document.getElementsByClassName('messages-list')[0];
  const parser = new DOMParser();
  const doc = parser.parseFromString(new MessageComponent(messageInfo).render(), 'text/html');
  messagesList.appendChild(doc.body.children[0]);
  messagesList.scrollTop = messagesList.scrollHeight;
}