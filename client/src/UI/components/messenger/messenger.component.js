import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {messengerTemplate} from './messenger.template.js';
import {AuthService} from "../../../services/auth.service";
import ContactModalComponent from "../contact-modal/contact-modal.component";
import ChatModalComponent from "../chat-modal/chat-modal.component";
import { LOGOUT } from '../../../store/actions';
import ContactComponent from "../contact/contact.component";
import {UserService} from "../../../services/user.service";
import {loadContacts} from "../../general/load-contacts";
import {loadChats} from "../../general/load-chats";
import ChatMessagesComponent from "../chat-messages/chat-messages.module";
import ContactInfoModalComponent from "../contact-info-modal/contact-info-modal.component";
import UserInfoModalComponent from "../user-info-modal/user-info-modal.component";



export default class MessengerComponent extends Block {
  constructor() {
    let { showContacts, showChats } = swapListFunc();

    super('div', {
      logoutAction: logout,
      username: window.store.getState().user.username,
      ContactModalComponent: new ContactModalComponent().render(),
      ChatModalComponent: new ChatModalComponent().render(),
      openContactModal,
      openChatModal,
      showContacts,
      showChats,
      showUserInfo
    });
  }

  componentDidMount() {
    loadContacts().then();
    loadChats().then();
  }

  render() {
    return compile(messengerTemplate, this.props);
  }
}

async function logout(event) {
  event.preventDefault();

  let userData = await AuthService.logout();

  window.store.dispatch({ type: LOGOUT });

  window.router.go('/');
}

function openContactModal(event) {
  const SHOW_MODAL = '_show';

  let modal = document.querySelector('[data-modal="add-contact"]');

  modal.classList.add(SHOW_MODAL);
}

function openChatModal(event) {
  const SHOW_MODAL = '_show';

  let modal = document.querySelector('[data-modal="add-chat"]');

  modal.classList.add(SHOW_MODAL);
}

function swapListFunc() {
  let state = 'contacts';
  function showContacts(event) {
    if (state === 'contacts')
      return;

    state = 'contacts';
    const contactsList = document.querySelectorAll('[data-list="contacts"]');
    const chatsList = document.querySelectorAll('[data-list="chats"]');
    // chatsList.style.display = 'none';
    // contactsList.style.display = 'block';

    chatsList.forEach(element => element.style.display = 'none');
    contactsList.forEach(element => element.style.display = 'block');

    event.currentTarget.nextElementSibling.classList.toggle('_active');
    event.currentTarget.classList.toggle('_active');
  }

  function showChats(event) {
    if (state === 'chats')
      return;

    state = 'chats';
    const contactsList = document.querySelectorAll('[data-list="contacts"]');
    const chatsList = document.querySelectorAll('[data-list="chats"]');
    chatsList.forEach(element => element.style.display = 'block');
    contactsList.forEach(element => element.style.display = 'none');

    event.currentTarget.previousElementSibling.classList.toggle('_active');
    event.currentTarget.classList.toggle('_active');
  }
  return { showContacts, showChats }
}

function showUserInfo(event) {
  event.preventDefault();

  let rootElement = document.getElementsByClassName('page')[0];

  const parser = new DOMParser();
  const doc = parser.parseFromString(new UserInfoModalComponent().render(), 'text/html');

  rootElement.prepend(doc.body.children[0]);
}


