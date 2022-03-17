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


