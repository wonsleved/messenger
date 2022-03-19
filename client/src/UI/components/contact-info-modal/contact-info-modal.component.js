import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {contactInfoModalTemplate} from "./contact-info-modal.template";

const MODAL_CLASS = 'modal';
const SHOW_MODAL = '_show';

export default class ContactInfoModalComponent extends Block {
  constructor(contact, closeModal) {
    super('div', {
      outsideModalClick,
      toggleModal,
      username: contact.username,
      name: contact.name
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

  }

  render() {
    return compile(contactInfoModalTemplate, this.props);
  }
}




