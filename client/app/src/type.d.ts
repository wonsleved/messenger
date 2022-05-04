import React, {ChangeEventHandler, EventHandler, MouseEventHandler} from "react";

type ModalHookType = [
    show: boolean,
    openModal: MouseEventHandler<any>,
    closeModal: MouseEventHandler<any>,
]

type ModalPropsType = {
    show: boolean,
    closeModal: EventHandler
    children?: React.ReactNode,
    openModal?: EventHandler
}

type InputPropsType = {
    onChange: ChangeEventHandler<any>;
    value: any;
    type: string;
    name: Lowercase<string>;
    className: string;
    required?: boolean;
    autoFocus?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    autoComplete?: string;
}

type TokenType = string;




