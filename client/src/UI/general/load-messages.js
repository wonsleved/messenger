import {MessageService} from "../../services/message.service";
import ContactComponent from "../components/contact/contact.component";
import MessageComponent from "../components/message/message.component";


export async function loadMessages(chatId) {
  let messages = await MessageService.getChatMessages(chatId);

  const messagesList = document.querySelector('[data-list="messages"]');
  if (!messagesList || !messages)
    return;

  let parser = new DOMParser();

  let fragment = document.createDocumentFragment();

  for(let message of messages) {

    const messageComponent = new MessageComponent(message); // message
    let doc = parser.parseFromString(messageComponent.render(), "text/html");

    let contactElement = doc.body.children[0];
    fragment.appendChild(contactElement);
  }

  messagesList.textContent = '';
  messagesList.appendChild(fragment);
  messagesList.scrollTop = messagesList.scrollHeight;
}

