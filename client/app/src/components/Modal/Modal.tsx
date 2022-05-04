import React, {FC, ReactElement, MouseEventHandler, KeyboardEvent, useEffect} from 'react';
import {ModalPropsType} from "../../type";

const Modal: FC<ModalPropsType> = ({show, children, closeModal}): ReactElement => {

    function onClose(event: React.MouseEvent<HTMLInputElement>) {
        if (event.currentTarget === event.target)
            closeModal(event);
    }

    function onEsc(event: React.KeyboardEvent<HTMLElement>): any {
        if(event.key === "Escape") {
            closeModal(event);
        }
    }

    if (!show) return <></>

    return (
        <div
            onMouseDown={onClose}
            className="modal page__modal"
            data-modal="add-contact"
            onKeyDown={onEsc}
        >

            { children }

        </div>
    )

};


export default Modal;