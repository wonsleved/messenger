export const imbeddedInputModalTemplate = (function () {
  return `
      <div class="input-field modal-content__input">
          <input id="{{inputInfo}}" name="{{inputInfo}}" type="text" class="input-field__input" placeholder=" " required>
          <label for="{{inputInfo}}" class="input-field__label"> {{ labelName }} </label>
      </div>
      <button type="submit"
              class="modal-content__button button _modal _green"
      >
          {{ buttonName }}
      </button>
`;
})()

