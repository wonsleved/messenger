import React, {FC, ReactElement, memo} from 'react';
import { Link } from "react-router-dom";
import Headline from "../components/Headline";


const MainPage: FC = (): ReactElement => {

    return (
        <>
            <Headline>

                <Link to="/" className="headline__logo-text">Messenger</Link>

                <div className="headline__auth">
                    <Link to="/register" className="button _auth _sign-up" >Sign Up</Link>
                    <Link to="/login" className="button _auth _sign-in">Sign In</Link>
                </div>

            </Headline>

            <main className="page__main">

                <div className="first-look-content page__first-look-content">

                    <h1 className="first-look-content__title">Messenger</h1>

                    <p className="first-look-content__info">
                        Communicate with your friends in real time, add them to contacts, create group chats and more.
                    </p>
                    <p className="first-look-content__info">
                        Try it now!
                    </p>

                </div>

            </main>
        </>
    )

};


export default memo<FC>(MainPage);