export const messageTemplate = (function () {
  return `
  <div class="message {{{ this.isOwner ? '_own' : '' }}}">
    <div class="message__owner-name">
        {{ name }}
    </div>
    
    <div class="message__content">
        {{ content }}
    </div>

    <div class="message__date">
        {{ date }}
    </div>
  </div>
`;
})()

