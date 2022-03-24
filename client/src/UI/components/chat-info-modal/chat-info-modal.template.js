export const chatInfoModalTemplate = (function () {
  return `
        <div 
            onmousedown="{{ outsideModalClick }}"
            class="modal page__modal _show" 
            data-modal="chat-info"
        >

            <div class="modal__content modal-content modal-info">

                <h6 class="modal-content__title">
                    {{ title }}
                </h6>
                
                {{{  
                    this.isPrivate ? '' : (\`
                    <section class="modal-info__options">
                        <button 
                            class="modal-button _green"
                            onmousedown="{{ showParticipants }}"
                        >
                            Participants
                        </button>
                        <button 
                            class="modal-button _red"
                            onmousedown="{{ leaveChat }}"
                        >
                            Leave
                        </button>
                        <button 
                            class="modal-button _warning"
                            onmousedown="{{ removeChat }}"
                        >
                            Delete chat
                        </button>
                    
                    
                    </section>\`)
                
                }}}
                
                <button type="button"
                        class="modal-button _red modal-info__close-button"
                        onclick="{{ toggleModal }}"
                >
                    Close
                </button>


            </div>

        </div>
`;
})()

