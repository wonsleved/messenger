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
                            class="button _modal _green"
                            onmousedown="{{ showParticipants }}"
                        >
                            Participants
                        </button>
                        <button 
                            class="button _modal _red"
                            onmousedown="{{ leaveChat }}"
                        >
                            Leave
                        </button>
                        <button 
                            class="button _modal _warning"
                            onmousedown="{{ removeChat }}"
                        >
                            Delete chat
                        </button>
                    
                    
                    </section>\`)
                
                }}}
                
                <button type="button"
                        class="button _modal _red modal-info__close-button"
                        onclick="{{ toggleModal }}"
                >
                    Close
                </button>


            </div>

        </div>
`;
})()

