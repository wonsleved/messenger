import React, {FC, ReactElement, useState} from 'react';
import {ModalPropsType} from "../../type";
import Modal from "./Modal";
import ChatInfo from "./ChatInfo/ChatInfo";
import ParticipantsInfo from "./ChatInfo/ParticipantsInfo";
import AddParticipant from "./ChatInfo/AddParticipant";
import RemoveParticipant from "./ChatInfo/RemoveParticipant";
import IChat from "../../models/IChat";

type PropsType = ModalPropsType & {chat: IChat};

const ChatInfoModal: FC<PropsType> = ({show, closeModal, chat}): ReactElement => {

    enum Modals {
        Main,
        Participants,
        AddParticipant,
        RemoveParticipant
    }

    const [modal, setModal] = useState<Modals>(Modals.Main);

    function openMain() {
        setModal(_ => Modals.Main);
    }

    function openParticipants() {
        setModal(_ => Modals.Participants);
    }

    function openAddParticipant() {
        setModal(_ => Modals.AddParticipant);
    }

    function openRemoveParticipant() {
        setModal(_ => Modals.RemoveParticipant);
    }

    function onCloseModal() {
        closeModal();
        openMain();
    }

    return (
        <Modal show={show} closeModal={onCloseModal}>

            {modal === Modals.Main ?
                <ChatInfo
                    closeModal={closeModal}
                    openParticipants={openParticipants}
                    chat={chat}
                /> : ''}
            {modal === Modals.Participants ?
                <ParticipantsInfo
                    openMain={openMain}
                    openAddParticipant={openAddParticipant}
                    openRemoveParticipant={openRemoveParticipant}
                    chat={chat}
                /> : ''}
            {modal === Modals.AddParticipant ?
                <AddParticipant
                    openParticipants={openParticipants}
                    chat={chat}
                /> : ''}
            {modal === Modals.RemoveParticipant ?
                <RemoveParticipant
                    openParticipants={openParticipants}
                    chat={chat}
                /> : ''}

        </Modal>
    )

};


export default ChatInfoModal;