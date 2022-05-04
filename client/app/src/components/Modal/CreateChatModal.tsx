import React, {FC, ReactElement, useState} from 'react';
import {ModalPropsType} from "../../type";
import Input from "../Input";
import Modal from "./Modal";
import {useAppDispatch} from "../../hooks/store.hook";
import {addChat} from "../../store/reducers/messenger.slice";
import {ChatService} from "../../services/chat.service";

const CreateChatModal: FC<ModalPropsType> = ({show, closeModal}): ReactElement => {

    const [title, setTitle] = useState('');

    function onChangeTitle({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setTitle(prev => currentTarget.value);
    }

    const inputParams = {
        type: "text",
        value: title,
        name: "title",
        onChange: onChangeTitle,
        required: true,
        autoFocus: true,
    }

    const dispatch = useAppDispatch();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const chat = await ChatService.newGroupChat(title);
        if (!chat)
            return;

        dispatch(addChat(chat));
        closeModal();
        setTitle('');
    }

    return (
        <Modal show={show} closeModal={closeModal}>
            <form
                className="modal__content modal-content"
                onSubmit={onSubmit}
            >

                <h6 className="modal-content__title">
                    Chat
                </h6>

                <Input {...inputParams} className=""/>

                <button type="submit"
                        className="modal-content__button button _modal _green"
                >
                    Add
                </button>
                <button type="button"
                        className="modal-content__button button _modal _red"
                        onClick={closeModal}
                >
                    Close
                </button>


            </form>

        </Modal>
    )

};


export default CreateChatModal;