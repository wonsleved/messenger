export const contactInfoModalTemplate = (function () {
  return `
        <div 
            onmousedown="{{ outsideModalClick }}"
            class="modal page__modal _show" 
            data-modal="contact-info"
        >

            <div class="modal__content modal-content modal-info">

                <header class="modal-info__header">
                    <div class="modal-info__field">
                        <span class="modal-info__property">
                            username: 
                        </span>
                        <span class="modal-info__value">
                            {{ username }}
                        </span>
                    </div>
                    <div class="modal-info__field">
                        <span class="modal-info__property">
                            name: 
                        </span>
                        <span class="modal-info__value">
                            {{ name }}
                        </span>
                    </div>
                </header>
                
                <section class="modal-info__options">
                    <button 
                        class="modal-button _green"
                        onmousedown="{{ writeToUser }}",
                    >
                        Write
                    </button>
                    
                    <button 
                        class="modal-button _red"
                        onmousedown="{{ removeContact }}",
                    >
                        Remove contact
                    </button>
                    
                </section>
                
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

