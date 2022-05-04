import {useState} from "react";
import {ModalHookType} from "../type";

export function useModal(initial: boolean = false): ModalHookType  {
    const [show, setShow] = useState(initial);

    function openModal(): void {
        if (!show){
            setShow(sh => !sh)
        }
    }

    function closeModal(): void {
        if (show)
            setShow(sh => !sh)
    }

    return [show, openModal, closeModal]
}
