import React, {FC, ReactElement} from 'react';
import {useModal} from "../hooks/modal.hook";
import ContactInfoModal from "./Modal/ContactInfoModal";
import IUser from "../models/IUser";

type PropsType = {
    user: IUser
}

const ContactItem: FC<PropsType> = ({user}): ReactElement => {

    const [show, openModal, closeModal] = useModal();

    return (
        <>
            <ContactInfoModal show={show} closeModal={closeModal} user={user}/>
            <div
                className="contact list__item"
                onClick={openModal}
            >
                <div className="contact__name">{ user.name }</div>
                <div className="contact__username">{ user.username }</div>
            </div>
        </>
    )

};


export default ContactItem;