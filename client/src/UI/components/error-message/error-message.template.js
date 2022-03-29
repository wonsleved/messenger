export const errorMessageTemplate = (function () {
  return `
        <ul class="errors-list">
            {{{
               this.messages.map(message => '<li class="errors-list__message">' + message + '</li>')
            }}}
        </ul>
`;
})()

