import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {contactInfoModalTemplate} from "./contact-info-modal.template";
import {UserService} from "../../../services/user.service";
import {loadContacts} from "../../general/load-contacts";
import {openChat} from "../../general/open-chat";
import {ChatService} from "../../../services/chat.service";
import {loadChats} from "../../general/load-chats";
import {toggleSideMenu} from "../../general/toggleSideMenu";


const MODAL_CLASS = 'modal';
const SHOW_MODAL = '_show';

export default class ContactInfoModalComponent extends Block {
  constructor(contact, closeModal) {
    super('div', {
      outsideModalClick,
      toggleModal,
      username: contact.username,
      name: contact.name,
      removeContact,
      writeToUser
    });

    function outsideModalClick({target}) {
      if (target.classList.contains(MODAL_CLASS)) {
        closeModal(target);
        // target.classList.remove(SHOW_MODAL);
      }
    }

    function toggleModal(event) {
      const modalWindow = event.currentTarget.closest('.' + MODAL_CLASS);

      if (!modalWindow)
        return;

      const contains = modalWindow.contains(event.target);
      if (!contains)
        return;

      // modalWindow.classList.toggle(SHOW_MODAL);
      closeModal(modalWindow);
    }

    async function removeContact(event) {
      event.preventDefault();

      await UserService.removeFromContacts(contact.username);
      await loadContacts();

      closeModal();
    }

    async function writeToUser(event) {
      event.preventDefault();

      const chatInfo = await ChatService.writeUser(contact.id);

      await loadChats();

      openChat(chatInfo);

      closeModal();
      toggleSideMenu(event);
    }


  }

  render() {
    return compile(contactInfoModalTemplate, this.props);
  }
}




