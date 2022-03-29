


export const chatMessagesTemplate = (function () {
  return `
        <header 
            class="conversation-header messenger-chat__header"
            onclick="{{ showChatInfo }}"
        >
            <div class="conversation-header__title">
                {{ title }}
            </div>
        </header>

        <section class="messages-list messenger-chat__messages-list" data-list="messages">
        
            {{ messages }}

        </section>

        {{ messageLine }}
`;
})()

