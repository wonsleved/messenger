import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {userInfoModalTemplate} from "./user-info-modal.template";


const MODAL_CLASS = 'modal';

export default class UserInfoModalComponent extends Block {
  constructor() {
    super('div', {
      outsideModalClick,
      toggleModal,
      username: window.store.getState().user.username,
      name: window.store.getState().user.name,
    });


  }

  render() {
    return compile(userInfoModalTemplate, this.props);
  }
}

function outsideModalClick({target}) {
  if (target.classList.contains(MODAL_CLASS)) {
    closeContactInfoModal(target);
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

  closeContactInfoModal(modalWindow);
}

function closeContactInfoModal(event) {
  const rootElement = document.getElementsByClassName('page')[0];
  const modalWindow = document.querySelector('[data-modal="user-info"]');
  if (rootElement && modalWindow)
    rootElement.removeChild(modalWindow);
}

