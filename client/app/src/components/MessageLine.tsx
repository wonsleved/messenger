import React, {FC, ReactElement, useState} from 'react';

type PropsType = {
    sendMessage: (_:string) => void;
}

const MessageLine: FC<PropsType> = ({sendMessage}): ReactElement => {

    const [content, setContent] = useState('');

    function onChange({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setContent(prev => currentTarget.value);
    }

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        sendMessage(content);
        setContent(prev => '');
    }

    const inputParams = {
        type: "text",
        placeholder: "Write message...",
        name: "content",
        autoComplete: "off",
        value: content,
        onChange: onChange
    }



    return (
        <form
            className="message-line messenger-chat__message-line"
            onSubmit={onSubmit}
        >
            <input
                className="message-line__input"
                {...inputParams}
            ></input>
            <button
                type="submit"
                className="message-line__button"
            >
                Send
            </button>
        </form>
    )

};


export default MessageLine;