export const contactTemplate = (function () {
  return `
        <div 
            class="contact list__item"
            onmousedown="{{ openContactInfoModal }}"   
        >
            <div class="contact__name">{{ name }}</div>
            <div class="contact__username">{{ username }}</div>
        </div>
`;
})()

