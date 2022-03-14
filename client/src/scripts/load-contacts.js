import {UserService} from "../services/user.service.js";

window.addEventListener('load', drawContacts);




async function drawContacts() {
  let contactsArray = await UserService.getContacts();
  // let contactsArray = Array.from(contacts);

  let contactList = document.getElementsByClassName('list')[0];

  let fragment = document.createDocumentFragment();

  let contactElement = document.createElement('div');
  contactElement.className = 'contact list__contact';

  let usernameElement = document.createElement('div');
  usernameElement.className = 'contact__username';

  let nameElement = document.createElement('div');
  nameElement.className = 'contact__name';

  for (let contactInfo of contactsArray) {
    let contactEl = contactElement.cloneNode(true);
    let nameEl = nameElement.cloneNode(true);
    let usernameEl = usernameElement.cloneNode(true);

    nameEl.textContent = contactInfo.name;
    contactEl.prepend(nameEl);

    usernameEl.textContent = contactInfo.username;
    contactEl.append(usernameEl);

    fragment.append(contactEl);
  }

  contactList.append(fragment);
}