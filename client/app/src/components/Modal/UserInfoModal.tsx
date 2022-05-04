import React, {FC, ReactElement} from 'react';
import {ModalPropsType} from "../../type";
import Modal from "./Modal";
import IUser from "../../models/IUser";
import {AuthService} from "../../services/auth.service";
import {userLoaded} from "../../store/reducers/auth.slice";
import {useAppDispatch} from "../../hooks/store.hook";

type PropsType = ModalPropsType & { user: IUser };

const UserInfoModal: FC<PropsType> = ({show, closeModal, user}): ReactElement => {

    const dispatch = useAppDispatch();

    function logout() {
        AuthService.logout().then(info => dispatch(userLoaded(null)));
    }

    return (
        <Modal show={show} closeModal={closeModal}>

            <div className="modal__content modal-content modal-info">

                <header className="modal-info__header">

                    <div className="modal-info__field">
                        <span className="modal-info__property">
                            username:
                        </span>
                        <span className="modal-info__value">
                            { user.username }
                        </span>
                    </div>

                    <div className="modal-info__field">
                        <span className="modal-info__property">
                            name:
                        </span>
                        <span className="modal-info__value">
                            { user.name }
                        </span>
                    </div>

                </header>

                <section className="modal-info__options">
                    <button
                        className="button _modal _warning"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </section>

                <button
                    type="button"
                    className="button _modal _red modal-info__close-button"
                    onClick={closeModal}
                >
                    Close
                </button>


            </div>

        </Modal>
    )

};


export default UserInfoModal;