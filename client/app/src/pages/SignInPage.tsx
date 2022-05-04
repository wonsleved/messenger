import React, {FC, ReactElement, memo, useState, FormEventHandler} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { AuthService } from "../services/auth.service";
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import { userLoaded } from "../store/reducers/auth.slice";
import Headline from "../components/Headline";

interface CredentialsType {
    username: string,
    password: string
}

const SignInPage: FC = (): ReactElement => {

    const dispatch = useAppDispatch();

    const [credentials, setCredentials] =
        useState<CredentialsType>({
            username: '',
            password: ''
        })

    function onChangeUsername({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setCredentials(prev => {return {...prev, username: currentTarget.value}});
    }

    function onChangePassword({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setCredentials(prev => {return {...prev, password: currentTarget.value}});
    }

    const usernameParams = {
        type: "text",
        value: credentials.username,
        name: "username",
        onChange: onChangeUsername,
        required: true,
        autoFocus: true,
        pattern: "[a-zA-Z0-9]{0,32}",
        minLength: 3,
        maxLength: 33,
    }

    const passwordParams = {
        type: "password",
        value: credentials.password,
        name: "password",
        onChange: onChangePassword,
        required: true,
        pattern: ".{0,40}",
        minLength: 8,
        maxLength: 41,
    }

    const navigate = useNavigate();

    function goBack():void {
        navigate(-1);
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userInfo = await AuthService.login(credentials);
        if (!userInfo)
            return;

        dispatch(userLoaded(userInfo));
        navigate('/');
    }

    return (
    <>
        <Headline>

            <Link to="/" className="headline__logo-text">Messenger</Link>

            <div className="headline__auth">
                <Link to="/register" className="button _auth _sign-up" >Sign Up</Link>
                <button className="button _out" onClick={goBack}>Go back</button>
            </div>

        </Headline>

        <main className="page__auth-form">

        <form className="auth-form" onSubmit={onSubmit}>

            <span className="auth-form__title">Sign in</span>

            <Input {...usernameParams} className="auth-form__input-field"/>

            <Input {...passwordParams} className="auth-form__input-field"/>

            <button
                type="submit"
                className="auth-form__submit button _submit"
            >
                Sign In
            </button>

        </form>

    </main>
    </>
    )

};


export default memo<FC>(SignInPage);