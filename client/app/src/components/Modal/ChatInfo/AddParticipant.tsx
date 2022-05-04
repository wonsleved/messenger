import React, {FC, ReactElement, useState} from 'react';
import Input from "../../Input";
import IChat from "../../../models/IChat";
import {ChatService} from "../../../services/chat.service";

type PropsType = {
    openParticipants: React.EventHandler<any>,
    chat: IChat
}

const AddParticipant: FC<PropsType> = ({openParticipants, chat}): ReactElement => {

    const [username, setUsername] = useState<string>('');

    function onChangeUsername({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setUsername(_ => currentTarget.value);
    }

    const inputParams = {
        type: "text",
        value: username,
        name: "username",
        onChange: onChangeUsername,
        required: true,
        autoFocus: true,
        pattern: "[a-zA-Z0-9]{0,32}",
        minLength: 3,
        maxLength: 33,
    }

    async function addParticipant(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const chatInfo = await ChatService.addToChat(chat.id, username);
        if (!chatInfo) return;

        openParticipants(event);
        setUsername('');
    }

    return (
        <form
            className="modal__content modal-content modal-info"
            onSubmit={addParticipant}
        >

            <h6 className="modal-content__title">
                Add user to chat
            </h6>

            <Input {...inputParams} className="modal-content__input"/>

            <button
                type="submit"
                className="modal-content__button button _modal _green"
            >
                Add
            </button>
            <button type="button"
                    className="modal-content__button button _modal _red"
                    onClick={openParticipants}
            >
                Back
            </button>

        </form>
    )

};


export default AddParticipant;