export const imbeddedParticipantsModalTemplate = (function () {
  return `
        <section class="chat-participants" data-list="chat-participants">
        </section>
        <section class="modal-info__options">
            <button 
                class="button _modal _green"
                onmousedown="{{ addParticipant }}"
            >
                Add participant
            </button>
            <button 
                class="button _modal _red"
                onmousedown="{{ removeParticipant }}"
            >
                Remove participant
            </button>
        </section>
`;
})()

