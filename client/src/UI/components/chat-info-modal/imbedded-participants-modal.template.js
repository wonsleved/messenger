export const imbeddedParticipantsModalTemplate = (function () {
  return `
        <section class="chat-participants" data-list="chat-participants">
        </section>
        <section class="modal-info__options">
            <button 
                class="modal-button _green"
                onmousedown="{{ addParticipant }}"
            >
                Add participant
            </button>
            <button 
                class="modal-button _red"
                onmousedown="{{ removeParticipant }}"
            >
                Remove participant
            </button>
        </section>
`;
})()

