export function closeImbeddedModal(event) {
  const rootElement = document.getElementsByClassName('page')[0];
  const modalWindow = document.querySelector('[data-modal="imbedded"]');
  if (rootElement && modalWindow)
    rootElement.removeChild(modalWindow);
}