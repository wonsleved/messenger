import React, {FC, ReactElement} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {chatChange} from "../store/reducers/messenger.slice";
import IChat from "../models/IChat";
import {toggle} from "../store/reducers/menu.slice";
const personImgSrc = 'person.svg'

type PropsType = {
    chat: IChat
}

const ChatItem: FC<PropsType> = ({chat}): ReactElement => {

    const dispatch = useAppDispatch();

    async function openChat(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();

        dispatch(chatChange(chat));
        dispatch(toggle());
    }

    return (
        <div
            className="chat list__item"
            onClick={openChat}
        >
            <div className="chat__title">
                { chat.title }
            </div>
            { chat.isPrivate ?
                <img alt="person" className="chat__icon" src={personImgSrc} /> : ''
            }
        </div>
    )

};


export default ChatItem;