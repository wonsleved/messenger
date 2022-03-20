export function closeChat() {
  let chatWindow = document.getElementsByClassName('messenger-chat')[0];

  chatWindow.innerHTML = ' ';
}