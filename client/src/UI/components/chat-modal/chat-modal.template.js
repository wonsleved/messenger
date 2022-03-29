export const chatModalTemplate = (function () {
  return `
        <div 
            onmousedown="{{ outsideModalClick }}"
            class="modal page__modal" 
            data-modal="add-chat"
            onsubmit="{{ createChatAction }}"
        >

            <form class="modal__content modal-content">

                <h6 class="modal-content__title">
                    Chat
                </h6>


                <div class="input-field modal-content__input">
                    <input id="create-chat-title" type="text" class="input-field__input" placeholder=" " required>
                    <label for="create-chat-title" class="input-field__label">Title</label>
                </div>

                <button type="submit"
                        class="modal-content__button button _modal _green"
                >
                    Add
                </button>
                <button type="button"
                        class="modal-content__button button _modal _red"
                        onclick="{{ toggleModal }}"
                >
                    Close
                </button>


            </form>

        </div>
`;
})()

