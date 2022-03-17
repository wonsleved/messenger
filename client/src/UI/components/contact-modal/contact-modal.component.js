import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {contactModalTemplate} from './contact-modal.template';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {loadContacts} from "../../general/load-contacts";


const MODAL_CLASS = 'modal';
const SHOW_MODAL = '_show';

export default class ContactModalComponent extends Block {
  constructor() {
    super('div', {
      outsideModalClick,
      toggleModal,
      addContactAction
    });

  }

  render() {
    return compile(contactModalTemplate, this.props);
  }
}

function outsideModalClick({target}) {
  if (target.classList.contains(MODAL_CLASS))
    target.classList.remove(SHOW_MODAL);
}

function toggleModal(event) {
  const modalWindow = event.currentTarget.closest('.' + MODAL_CLASS);

  if (!modalWindow)
    return;

  const contains = modalWindow.contains(event.target);
  if (!contains)
    return;

  modalWindow.classList.toggle(SHOW_MODAL);
}

async function addContactAction(event) {
  event.preventDefault();
  //  change to name
  let username = document.getElementById('add-contact-username').value;

  let result = await UserService.addToContacts(username);
  if (result) {

    //  close modal if success

    loadContacts().then();
    document.getElementById('add-contact-username').value = '';
    const modalWindow = event.target.closest('.' + MODAL_CLASS);
    modalWindow.classList.remove(SHOW_MODAL);

  }

}