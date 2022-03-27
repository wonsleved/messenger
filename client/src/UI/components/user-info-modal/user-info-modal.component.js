import Block from '../../modules/block/index.js';
import {compile} from '../../utils/templator.js';
import {userInfoModalTemplate} from "./user-info-modal.template";
import {AuthService} from "../../../services/auth.service";
import {LOGOUT} from "../../../store/actions";


const MODAL_CLASS = 'modal';

export default class UserInfoModalComponent extends Block {
  constructor() {
    super('div', {
      outsideModalClick,
      toggleModal,
      username: window.store.getState().user.username,
      name: window.store.getState().user.name,
      logout
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

async function logout(event) {
  event.preventDefault();

  let userData = await AuthService.logout();

  window.store.dispatch({ type: LOGOUT });

  window.router.go('/');
}

