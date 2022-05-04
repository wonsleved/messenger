import React, {FC, ReactElement, memo} from 'react';
import Modal from "./Modal";
import {ModalPropsType} from "../../type";
import IUser from "../../models/IUser";
import {UserService} from "../../services/user.service";
import {useAppDispatch} from "../../hooks/store.hook";
import {addChat, chatChange, removeContact} from "../../store/reducers/messenger.slice";
import {ChatService} from "../../services/chat.service";

type PropsType = ModalPropsType & {user: IUser}

const ContactInfoModal: FC<PropsType> = ({show, closeModal, user}): ReactElement => {

    const dispatch = useAppDispatch();

    async function remove() {
        const result = await UserService.removeFromContacts(user.username);
        if (!result) return;

        dispatch(removeContact(user));

        closeModal();
    }

    async function writeUser(event: React.MouseEvent<HTMLButtonElement>) {
        const chat = await ChatService.writeUser(user.id);
        if (!chat) return;

        dispatch(addChat(chat));
        dispatch(chatChange(chat));

        closeModal();
    }

    return (
        <Modal show={show} closeModal={closeModal}>

            <div className="modal__content modal-content modal-info">

                <header className="modal-info__header">
                    <div className="modal-info__field">
                        <span className="modal-info__property">
                            username:
                        </span>
                        <span className="modal-info__value">
                            { user.username }
                        </span>
                    </div>
                    <div className="modal-info__field">
                        <span className="modal-info__property">
                            name:
                        </span>
                        <span className="modal-info__value">
                            { user.name }
                        </span>
                    </div>
                </header>

                <section className="modal-info__options">
                    <button
                        className="button _modal _green"
                        onClick={writeUser}
                    >
                        Write
                    </button>

                    <button
                        className="button _modal _red"
                        onClick={remove}
                    >
                        Remove contact
                    </button>

                </section>

                <button
                    type="button"
                    className="button _modal _red modal-info__close-button"
                    onClick={closeModal}
                >
                    Close
                </button>

            </div>

        </Modal>
    )

};


export default memo(ContactInfoModal);