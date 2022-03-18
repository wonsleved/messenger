import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatModalTemplate} from './chat-modal.template';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {loadContacts} from "../../general/load-contacts";
import {loadChats} from "../../general/load-chats";
import {ChatService} from "../../../services/chat.service";

const MODAL_CLASS = 'modal';
const SHOW_MODAL = '_show';

export default class ChatModalComponent extends Block {
  constructor() {
    super('div', {
      outsideModalClick,
      toggleModal,
      createChatAction
    });

  }

  render() {
    return compile(chatModalTemplate, this.props);
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

async function createChatAction(event) {
  event.preventDefault();
  //  change to name
  let title = document.getElementById('create-chat-title').value;

  let result = await ChatService.newGroupChat(title);
  if (result) {

    //  close modal if success

    loadContacts().then();
    loadChats().then();


    document.getElementById('create-chat-title').value = '';
    const modalWindow = event.target.closest('.' + MODAL_CLASS);
    modalWindow.classList.remove(SHOW_MODAL);
  }

}