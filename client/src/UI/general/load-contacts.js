import {UserService} from "../../services/user.service";
import ContactComponent from "../components/contact/contact.component";


export async function loadContacts() {
  let contacts = await UserService.getContacts();
  const contactsList = document.querySelector('[data-list="contacts"]');
  if (!contactsList || !contacts)
    return;

  let parser = new DOMParser();

  let fragment = document.createDocumentFragment();

  for(let contact of contacts) {
    const contactComponent = new ContactComponent(contact.name, contact.username);
    let doc = parser.parseFromString(contactComponent.render(), "text/html");

    let contactElement = doc.body.children[0];
    fragment.prepend(contactElement);
  }

  contactsList.textContent = '';
  contactsList.append(fragment);
}

