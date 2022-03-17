export const contactModalTemplate = (function () {
  return `
        <div 
            onmousedown="{{ outsideModalClick }}"
            class="modal page__modal" 
            data-modal="add-contact"
            onsubmit="{{ addContactAction }}"
        >

            <form class="modal__content modal-content">

                <h6 class="modal-content__title">
                    Contact
                </h6>


                <div class="input-field modal-content__input">
                    <input id="add-contact-username" type="text" class="input-field__input" placeholder=" " required>
                    <label for="add-contact-username" class="input-field__label">Username</label>
                </div>

                <button type="submit"
                        class="modal-content__button modal-button _green"
                >
                    Add
                </button>
                <button type="button"
                        class="modal-content__button modal-button _red"
                        onclick="{{ toggleModal }}"
                >
                    Close
                </button>


            </form>

        </div>
`;
})()

