const SHOWMODAL = '_show';
const MODALCLASS = 'modal';

window.toggleModal = function (event) {
  const modalWindow = event.currentTarget.closest('.' + MODALCLASS);

  if (!modalWindow)
    return;

  const contains = modalWindow.contains(event.target);
  if (!contains)
    return;

  modalWindow.classList.toggle(SHOWMODAL);
}

function outsideModalClick({target}) {
  if (target.classList.contains(MODALCLASS))
    target.classList.toggle(SHOWMODAL);
}

Array.from(document.getElementsByClassName(MODALCLASS))
  .forEach(modal => modal.addEventListener('click', outsideModalClick));

// /**
//  *
//  * @param title - string
//  * @param buttonText - string
//  * @param elements - array of {type: 'input'/'text', text: string}
//  */
// function createModal(title, buttonText = '', elements = []) {
//   const modal = document.createElement('');
//   modal.className = 'modal page__modal';
//
//   const modalForm = document.createElement('form');
//   modalForm.className = 'modal__content modal-content';
//   modal.append(modalForm);
//
//   const titleH6 = document.createElement('h6');
//   titleH6.className = 'modal-content__title';
//   titleH6.textContent = title;
//   modalForm.append(titleH6);
//
// }



