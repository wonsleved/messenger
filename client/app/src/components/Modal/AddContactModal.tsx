import React, {FC, ReactElement, useState} from 'react';
import Modal from "./Modal";
import {ModalPropsType} from "../../type";
import Input from "../Input";
import {UserService} from "../../services/user.service";
import {useAppDispatch} from "../../hooks/store.hook";
import {contactsLoaded} from "../../store/reducers/messenger.slice";

const AddContactModal: FC<ModalPropsType> = ({show, closeModal}): ReactElement => {

    const [username, setUsername] = useState<string>('');

    function onChangeUsername({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setUsername(prev => currentTarget.value);
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

    const dispatch = useAppDispatch();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const user = await UserService.addToContacts(username);
        if (!user)
            return;

        const users = await  UserService.getContacts();
        dispatch(contactsLoaded(users));
        closeModal();
        setUsername('');
    }

    return (
        <Modal show={show} closeModal={closeModal}>
            <form className="modal__content modal-content" onSubmit={onSubmit}>

                <h6 className="modal-content__title">
                    Contact
                </h6>

                <Input {...inputParams} className="modal-content__input"/>

                <button type="submit"
                        className="modal-content__button button _modal _green"
                >
                    Add
                </button>
                <button
                    type="button"
                    className="modal-content__button button _modal _red"
                    onClick={closeModal}
                >
                    Close
                </button>
            </form>
        </Modal>
    )

};


export default AddContactModal;