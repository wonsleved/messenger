import React, {FC, ReactElement, useEffect, useState} from 'react';
import Participant from "../Participant";
import IChat from "../../../models/IChat";
import IUser from "../../../models/IUser";
import {ChatService} from "../../../services/chat.service";

type PropsType = {
    openMain: React.EventHandler<any>,
    openAddParticipant: React.EventHandler<any>,
    openRemoveParticipant: React.EventHandler<any>,
    chat: IChat
}

const ParticipantsInfo: FC<PropsType> = ({openMain, openAddParticipant, openRemoveParticipant, chat}): ReactElement => {
    // add participants list

    const [participantsList, setParticipantsList] = useState<IUser[]>([]);

    useEffect(() => {
       ChatService.getChatParticipants(chat.id).then(users => {
           setParticipantsList(users);
       });
    }, );

    const participants = participantsList.map((user, i) =>
        <Participant name={user.name} username={user.username} key={i}/>)

    return (
        <div className="modal__content modal-content modal-info">

            <h6 className="modal-content__title">
                Participants
            </h6>
            <section className="chat-participants" data-list="chat-participants">
                { participants }
            </section>
            <section className="modal-info__options">
                <button
                    className="button _modal _green"
                    onClick={openAddParticipant}
                >
                    Add participant
                </button>
                <button
                    className="button _modal _red"
                    onClick={openRemoveParticipant}
                >
                    Remove participant
                </button>
            </section>
            <button type="button"
                    className="modal-content__button button _modal _red modal-info__close-button"
                    onClick={openMain}
            >
                Back
            </button>
        </div>
    )

};


export default ParticipantsInfo;