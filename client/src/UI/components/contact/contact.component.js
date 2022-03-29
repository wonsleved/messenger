import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {contactTemplate} from './contact.template';
import ContactInfoModalComponent from "../contact-info-modal/contact-info-modal.component";

export default class ContactComponent extends Block {
  constructor(contact) {
    super('div', {
      name: contact.name,
      username: contact.username,
      openContactInfoModal
    });

    this.contact = contact;

    function openContactInfoModal(event) {
      let rootElement = document.getElementsByClassName('page')[0];

      const parser = new DOMParser();
      const contactInfoModalComponent = new ContactInfoModalComponent(contact, closeContactInfoModal);
      const doc = parser.parseFromString(contactInfoModalComponent.render(), 'text/html');

      rootElement.prepend(doc.body.children[0]);
    }

    function closeContactInfoModal(event) {
      const rootElement = document.getElementsByClassName('page')[0];
      const modalWindow = document.querySelector('[data-modal="contact-info"]');
      if (rootElement && modalWindow)
        rootElement.removeChild(modalWindow);
    }
  }

  render() {
    return compile(contactTemplate, this.props);
  }
}




