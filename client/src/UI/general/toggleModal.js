const MODAL_CLASS = 'modal';

export function toggleModal(closeFunction) {

  function _toggleModal(event) {
    const modalWindow = event.currentTarget.closest('.' + MODAL_CLASS);

    if (!modalWindow)
      return;

    const contains = modalWindow.contains(event.target);
    if (!contains)
      return;

    closeFunction(modalWindow);
  }

  return _toggleModal;

}


