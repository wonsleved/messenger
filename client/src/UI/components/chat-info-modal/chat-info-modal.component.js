import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {chatInfoModalTemplate} from "./chat-info-modal.template";
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {loadContacts} from "../../general/load-contacts";
import {loadChats} from "../../general/load-chats";
import {ChatService} from "../../../services/chat.service";
import ImbeddedModalComponent from "../imbedded-modal/imbedded-modal.component";
import ChatMessagesComponent from "../chat-messages/chat-messages.component";
import {closeChat} from "../../general/close-chat";
import {imbeddedInputModalTemplate} from "./imbedded-input-modal.template";
import {imbeddedParticipantsModalTemplate} from "./imbedded-participants-modal.template";
import {loadParticipants} from "../../general/load-participants";

const MODAL_CLASS = 'modal';
const SHOW_MODAL = '_show';

export default class ChatInfoModalComponent extends Block {
  constructor(chat, closeModal, openModal) {
    super('div', {
      outsideModalClick,
      toggleModal,
      title: chat.title,
      isPrivate: chat.isPrivate,
      addParticipant,
      removeParticipant,
      leaveChat,
      removeChat,
      showParticipants
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

      closeModal(modalWindow);
    }

    function addParticipant(event) {
      event.preventDefault();
      closeImbeddedModal();

      const payload = {
        onSubmit: addUserToChat,
        title: 'Add user to chat',
        labelName: 'Username',
        inputInfo: 'add-user-to-chat',
        buttonName: 'Add',
        imbeddedTemplate: imbeddedInputModalTemplate,
        goBack: goBack
      }

      closeModal();
      openImbeddedChatInfo(payload);
    }

    function goBack(event) {
      event.preventDefault();

      closeImbeddedModal();
      openModal(event);
    }

    async function addUserToChat(event) {
      event.preventDefault();

      let username = event.currentTarget['add-user-to-chat'].value.trim();

      if (!username)
        return;

      let result = await ChatService.addToChat(chat.id, username);

      if (result) {
        closeImbeddedModal();
        showParticipants();
      }

    }

    async function leaveChat(event) {
      event.preventDefault();

      let result = await ChatService.leaveFromChat(chat.id);

      if (!result)
        return;

      await loadChats();
      closeModal(event);
      closeChat();
    }

    function removeParticipant(event) {
      event.preventDefault();
      closeImbeddedModal();

      const payload = {
        onSubmit: removeUserFromChat,
        title: 'Remove user from chat',
        labelName: 'Username',
        inputInfo: 'remove-user-from-chat',
        buttonName: 'Remove',
        imbeddedTemplate: imbeddedInputModalTemplate,
        goBack: goBack
      }

      closeModal();
      openImbeddedChatInfo(payload);
    }

    async function removeUserFromChat(event) {
      event.preventDefault();

      let username = event.currentTarget['remove-user-from-chat'].value.trim();

      if (!username)
        return;

      let result = await ChatService.removeFromChat(chat.id, username);

      if (result) {
        closeImbeddedModal();
        showParticipants();
      }
    }

    async function removeChat(event) {
      event.preventDefault();
      const answer = confirm('Do you really want to delete chat?');


      if (!answer)
        return;

      let result = await ChatService.deleteChat(chat.id);
      if (!result)
        return;

      await loadChats();
      closeModal(event);
      closeChat();
    }

    function showParticipants(event) {
      event ? event.preventDefault() : null;

      const payload = {
        title: 'Participants',
        buttonClass: 'modal-info__close-button',
        addParticipant,
        removeParticipant,
        imbeddedTemplate: imbeddedParticipantsModalTemplate,
        goBack: goBack
      }

      let didMountFunctions = [loadParticipants.bind(null, chat.id)]

      closeModal();
      openImbeddedChatInfo(payload);
    }

    async function openImbeddedChatInfo(payload, didMountFunctions = []) {

      let rootElement = document.getElementsByClassName('page')[0];

      const parser = new DOMParser();
      const imbeddedModalComponent = new ImbeddedModalComponent(payload, closeImbeddedModal);
      const doc = parser.parseFromString(imbeddedModalComponent.render(), 'text/html');

      rootElement.prepend(doc.body.children[0]);
      await loadParticipants(chat.id);
    }

  }

  render() {
    return compile(chatInfoModalTemplate, this.props);
  }
}


function openImbeddedChatParticipants(payload) {

  let rootElement = document.getElementsByClassName('page')[0];

  const parser = new DOMParser();
  const imbeddedModalComponent = new ImbeddedModalComponent(payload, closeImbeddedModal); // Нет смысла передавать туда close
  const doc = parser.parseFromString(imbeddedModalComponent.render(), 'text/html');

  rootElement.prepend(doc.body.children[0]);
}

function closeImbeddedModal(event) {
  const rootElement = document.getElementsByClassName('page')[0];
  const modalWindow = document.querySelector('[data-modal="imbedded"]');
  if (rootElement && modalWindow)
    rootElement.removeChild(modalWindow);
}
