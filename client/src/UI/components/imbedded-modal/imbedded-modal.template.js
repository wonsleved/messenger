export const imbeddedModalTemplate = (function () {
  return `
        <div 
            onmousedown="{{ outsideModalClick }}"
            class="modal page__modal _show" 
            data-modal="imbedded"
        >

            <form 
                class="modal__content modal-content modal-info"
                onsubmit="{{ onSubmit }}"
            >

                <h6 class="modal-content__title">
                    {{ title }}
                </h6>

                {{{ this.imbeddedTemplate }}}

                <button type="button"
                        class="modal-content__button modal-button _red {{buttonClass}}"
                        onclick="{{ goBack }}"
                >
                    Back
                </button>


            </form>

        </div>
`;
})()

