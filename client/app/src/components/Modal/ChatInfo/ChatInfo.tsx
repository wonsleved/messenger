import React, {FC, ReactElement} from 'react';
import IChat from "../../../models/IChat";
import {ChatService} from "../../../services/chat.service";
import {useAppDispatch} from "../../../hooks/store.hook";
import {chatChange, removeChat} from "../../../store/reducers/messenger.slice";

type PropsType = {
    closeModal: React.EventHandler<any>,
    openParticipants: React.EventHandler<any>,
    chat: IChat
}


const ChatInfo: FC<PropsType> = ({closeModal, openParticipants, chat}): ReactElement => {

    const dispatch = useAppDispatch();

    async function leaveChat(event: React.MouseEvent<HTMLButtonElement>) {
        const chatInfo = await ChatService.leaveFromChat(chat.id);
        if (!chatInfo) return;

        dispatch(chatChange(null));
        dispatch(removeChat(chat));

        closeModal(event);
    }

    async function deleteChat(event: React.MouseEvent<HTMLButtonElement>) {
        const confirmation = window.confirm('Do you really want to delete chat?');
        if (!confirmation) return;

        const chatInfo = await ChatService.deleteChat(chat.id);
        if (!chatInfo) return;

        dispatch(chatChange(null));
        dispatch(removeChat(chat));

        closeModal(event);
    }

    return (
        <div className="modal__content modal-content modal-info">

        {chat.isPrivate ?
            (
                <h6 className="modal-content__title">
                    {chat.title}
                </h6>
            )
            : (
            <>
                <h6 className="modal-content__title">
                    {chat.title}
                </h6>
                <section className="modal-info__options">
                    <button
                        className="button _modal _green"
                        onClick={openParticipants}
                    >
                        Participants
                    </button>
                    <button
                        className="button _modal _red"
                        onClick={leaveChat}
                    >
                        Leave
                    </button>
                    <button
                        className="button _modal _warning"
                        onClick={deleteChat}
                    >
                        Delete chat
                    </button>

                </section>
            </>)
            }

            <button
                type="button"
                className="button _modal _red modal-info__close-button"
                onClick={closeModal}
            >
                Close
            </button>
        </div>
    )

};


export default ChatInfo;