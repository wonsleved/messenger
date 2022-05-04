import React, {FC, memo, ReactElement, useEffect, useRef, useState} from 'react';
import MessageLine from "./MessageLine";
import Message from "./Message";
import {useModal} from "../hooks/modal.hook";
import ChatInfoModal from "./Modal/ChatInfoModal";
import IChat from "../models/IChat";
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {MessageService} from "../services/message.service";
import {addMessage, messagesLoaded} from "../store/reducers/messenger.slice";
import {sendMessage} from "../websockets/send-message";

type PropsType = {
    chat: IChat
}

const MY_NOT_READ = 0;

const Chat: FC<PropsType> = ({chat}): ReactElement => {

    const list = useRef(null);
    const dispatch = useAppDispatch();

    let messages = useAppSelector(state => state.rootReducer.messenger.currentMessages);

    let messageList = messages.map((m, i) => <Message {...m} key={i}/>);

    useEffect(() => {
        dispatch(messagesLoaded([]));
        MessageService.getChatMessages(chat.id).then(msgs => {
            dispatch(messagesLoaded(msgs));
        })
    }, [chat]);

    useEffect(() => {
        const mListElem = list.current as unknown as HTMLElement;
        setTimeout(() => {
            mListElem.scrollTop = mListElem.scrollHeight;
        }, 0);
    }, [messages]);

    const [show, openModal, closeModal] = useModal();

    const user = useAppSelector(state => state.rootReducer.auth.user);
    if (!user) return <></>;

    function onSubmit(content: string) {
        if (!user) return;

        const params = {
            authorName: user.name,
            date: (new Date).toUTCString(),
            body: content,
            registry: MY_NOT_READ,
            key: Date.now()
        };

        sendMessage(chat.id, content);

        dispatch(addMessage(params));
    }

    return (
        <>
            <ChatInfoModal show={show} closeModal={closeModal} chat={chat}/>

            <header className="conversation-header messenger-chat__header" onClick={openModal}>
                <div className="conversation-header__title">
                    {chat.title}
                </div>
            </header>

            <section className="messages-list messenger-chat__messages-list" ref={list}>

                { messageList }

            </section>

            <MessageLine sendMessage={onSubmit}/>
        </>
    )

};


export default memo<FC<PropsType>>(Chat);