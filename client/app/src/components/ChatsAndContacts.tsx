import React, {FC, ReactElement, useEffect, useState} from 'react';
import ContactItem from "./ContactItem";
import ChatItem from "./ChatItem";
import {useModal} from "../hooks/modal.hook";
import AddContactModal from "./Modal/AddContactModal";
import CreateChatModal from "./Modal/CreateChatModal";
import {UserService} from "../services/user.service";
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {chatsLoaded, contactsLoaded} from "../store/reducers/messenger.slice";

const ChatsAndContacts: FC = (): ReactElement => {

    const [tab, setTab] = useState<string>("contacts");

    const contactsList = useAppSelector(state => state.rootReducer.messenger.contacts);
    const chatsList = useAppSelector(state => state.rootReducer.messenger.chats);

    const dispatch = useAppDispatch();

    function switchToChats() {
        if (tab !== "chats")
            setTab("chats");
    }

    function switchToContacts() {
        if (tab !== "contacts")
            setTab("contacts");
    }

    const [showAddContact, openContactModal, closeContactModal] = useModal();
    const [showCreateChat, openChatModal, closeChatModal] = useModal();

    useEffect(() => {
        UserService.getContacts().then(users => {
            dispatch(contactsLoaded(users));
        });
        UserService.getChats().then(chats => {
            dispatch(chatsLoaded(chats));
        })
    }, []);

    const contacts = contactsList.map((contact, i) => <ContactItem key={i} user={contact}/>);
    const chats = chatsList.map((chat, i) => <ChatItem key={i} chat={chat} />)

    return (
        <>
            <AddContactModal show={showAddContact} closeModal={closeContactModal}/>
            <CreateChatModal show={showCreateChat} closeModal={closeChatModal}/>
        <div className="messenger-menu__chats-and-contacts chats-and-contacts">

            <header className="chats-and-contacts__header tabs-list">
                <button
                    className={"tabs-list__tab " + (tab === "contacts" ? "_active" : "")}
                    onClick={switchToContacts}
                >
                    Contacts
                </button>
                <div
                    className={"tabs-list__tab " + (tab === "chats" ? "_active" : "")}
                    onClick={switchToChats}
                >
                    Chats
                </div>
            </header>

            <div className="chats-and-contacts__tab" style={tab === "contacts" ? {} : {"display": "none"}}>
                <div className="chats-and-contacts__list list">

                    { contacts }

                </div>

                <footer className="chats-and-contacts__footer">
                    <button
                        className="button _add"
                        onClick={openContactModal}
                    >
                        Add contact
                    </button>
                </footer>
            </div>

            <div className="chats-and-contacts__tab" style={tab === "chats" ? {} : {"display": "none"}}>
                <div className="chats-and-contacts__list list" data-list="chats">

                    { chats }

                </div>
                <footer className="chats-and-contacts__footer" data-list="chats">
                    <button
                        className="button _add"
                        onClick={openChatModal}
                    >
                        Create chat
                    </button>
                </footer>
            </div>

        </div>
        </>
    )

};


export default ChatsAndContacts;