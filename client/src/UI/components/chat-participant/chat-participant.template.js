export const chatParticipantTemplate = (function () {
  return `
            <div class="chat-participants__participant">
                <span class="chat-participants__name">
                    {{ name }}
                </span>
                <span class="chat-participants__username">
                    {{ username }}
                </span>
            </div>
`;
})()

