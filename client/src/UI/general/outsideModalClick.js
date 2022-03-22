const MODAL_CLASS = 'modal';

export function outsideModalClick(closeFunction) {
  function _outsideModalClick({target}) {
    if (target.classList.contains(MODAL_CLASS)) {
      closeFunction(target);
    }
  }

  return _outsideModalClick;
}


