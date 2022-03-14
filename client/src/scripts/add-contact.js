import './modal.js';
import {UserService} from "../services/user.service.js";

let addContact = document.getElementsByClassName('add-button')[0];

let addContactModal = Array.from(document.getElementsByClassName('modal'))
  .filter(elem => elem.dataset.modal === 'add-contact')[0];

addContactModal.children[0].addEventListener('submit', async (event) => {
  event.preventDefault();
  let username = document.getElementById('add-contact-username').value;

  console.log(await UserService.addToContacts(username));

});

addContact.addEventListener('click', () => addContactModal.classList.toggle('_show'));
