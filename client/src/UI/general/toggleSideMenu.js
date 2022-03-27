export function toggleSideMenu(event) {
  event.preventDefault();

  const messengerElement = document.getElementsByClassName('messenger')[0];
  if (!messengerElement)
    return;

  messengerElement.classList.toggle('_menu');
}