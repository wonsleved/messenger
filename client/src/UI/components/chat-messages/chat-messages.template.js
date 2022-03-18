


export const chatMessagesTemplate = (function () {
  return `
        <header class="conversation-header messenger-chat__header">
            <div class="conversation-header__title">
                {{ title }}
            </div>

            <div class="conversation-header__menu">
                <button class="go-back-button">
                    Leave
                </button>
            </div>
        </header>

        <section class="messages-list messenger-chat__messages-list">
        
            {{{ this.messages }}}

        </section>

        {{ messageLine }}
`;
})()

