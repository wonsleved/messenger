import React, {FC, ReactElement, memo, useState} from 'react';
import Chat from "../components/Chat";
import ChatsAndContacts from "../components/ChatsAndContacts";
import UserInfoModal from "../components/Modal/UserInfoModal";
import {useModal} from "../hooks/modal.hook";
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {toggle} from "../store/reducers/menu.slice";
import Headline from "../components/Headline";
import BurgerButton from "../components/BurgerButton";


const MessengerPage: FC = (): ReactElement => {

    const [show, openModal, closeModal] = useModal();
    const dispatch = useAppDispatch();

    const currentChat = useAppSelector(state => state.rootReducer.messenger.currentChat);
    const activeMenu = useAppSelector(state => state.rootReducer.menu.isActive);

    const { user } = useAppSelector(state => state.rootReducer.auth);
    if (!user) return <></>;


    function toggleSideMenu(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        dispatch(toggle());
    }

    return (
        <>
            <UserInfoModal show={show} closeModal={closeModal} user={user}/>

            <Headline>

                <span className="headline__logo-text">
                    Messenger
                </span>

                <div className="headline__auth">
                    <button className="user-profile headline__user-profile" onClick={openModal}>
                        { user.username }
                    </button>
                </div>

            </Headline>

            <main className="page__messenger">

                <div className={"messenger " + (activeMenu ? "_menu" : "")}>

                    <section className="messenger__headline">

                        <BurgerButton onClick={toggleSideMenu}/>

                    </section>

                    <section className="messenger__menu messenger-menu">

                        <ChatsAndContacts />

                    </section>

                    <section className="messenger__chat messenger-chat">

                        {currentChat ? <Chat chat={currentChat}/> : <></>}

                    </section>

                </div>


            </main>
        </>
    )

};


export default memo<FC>(MessengerPage);