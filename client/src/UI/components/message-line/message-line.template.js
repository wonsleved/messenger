export const messageLineTemplate = (function () {
  return `
        <form 
            class="message-line messenger-chat__message-line"
            onsubmit="{{ onSubmit }}"
        >
            <input
                type="text"
                class="message-line__input"
                placeholder="Write message..."
                name="content"
                autocomplete="off"
            >
            <button
                    type="submit"
                    class="message-line__button"
            >
                Send
            </button>
    </form>
`;
})()

