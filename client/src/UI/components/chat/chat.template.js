export const chatTemplate = (function () {
  return `
        <div class="chat list__item" onclick="{{ openChat }}">
            <div class="chat__title">
                {{ chat.title }}
            </div>
            {{{
                if (this.chat.isPrivate)
                    '<img class="chat__icon" src="{{ personImgSrc }}" >'
            }}}
        </div>
`;
})()

