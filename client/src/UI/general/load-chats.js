import {UserService} from "../../services/user.service";
import ChatComponent from "../components/chat/chat.component";

export async function loadChats() {
  let chats = await UserService.getChats();
  const chatsList = document.querySelector('[data-list="chats"]');
  if (!chatsList || !chats)
    return;

  let parser = new DOMParser();

  let fragment = document.createDocumentFragment();

  for(let chat of chats) {
    const contactComponent = new ChatComponent(chat);
    let doc = parser.parseFromString(contactComponent.render(), "text/html");

    let contactElement = doc.body.children[0];
    fragment.prepend(contactElement);
  }

  chatsList.textContent = '';
  chatsList.append(fragment);
}

