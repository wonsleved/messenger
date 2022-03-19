export const contactInfoModalTemplate = (function () {
  return `
        <div 
            onmousedown="{{ outsideModalClick }}"
            class="modal page__modal _show" 
            data-modal="contact-info"
        >

            <div class="modal__content modal-content contact-info">

                <header class="contact-info__header">
                    <div class="contact-info__field">
                        <span class="contact-info__property">
                            username: 
                        </span>
                        <span class="contact-info__value">
                            {{ username }}
                        </span>
                    </div>
                    <div class="contact-info__field">
                        <span class="contact-info__property">
                            name: 
                        </span>
                        <span class="contact-info__value">
                            {{ name }}
                        </span>
                    </div>
                </header>
                
                <section class="contact-info__options">
                    oa
                </section>


            </div>

        </div>
`;
})()

