import React, {FC, ReactElement, memo, useState, ChangeEventHandler, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import {AuthService} from "../services/auth.service";
import {userLoaded} from "../store/reducers/auth.slice";
import {useAppDispatch} from "../hooks/store.hook";
import Headline from "../components/Headline";

interface CredentialsType {
    username: string,
    name: string,
    password: string
}

const SignUpPage: FC = (): ReactElement => {

    const [credentials, setCredentials] =
        useState<CredentialsType>({
            username: '',
            name: '',
            password: ''
        });

    const dispatch = useAppDispatch();

    function onChangeName({currentTarget}: React.ChangeEvent<HTMLInputElement>) {
        setCredentials(prev => {return {...prev, name: currentTarget.value}});
    }

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
        autoComplete: "off",
        minLength: 3,
        maxLength: 33,
    }

    const nameParams = {
        type: "text",
        value: credentials.name,
        name: "name",
        onChange: onChangeName,
        required: true,
        pattern: "^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$",
        autoComplete: "new-password",
        minLength: 3,
        maxLength: 64,
    }

    const passwordParams = {
        type: "password",
        value: credentials.password,
        name: "password",
        onChange: onChangePassword,
        required: true,
        pattern: ".{0,40}",
        autoComplete: "new-password",
        minLength: 8,
        maxLength: 41,
    }

    const navigate = useNavigate();
    function goBack():void {
        navigate(-1);
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userInfo = await AuthService.register(credentials);
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
                    <Link className="button _auth _sign-in" to="/login" >Sign In</Link>
                    <button className="button _out" onClick={goBack}>Go back</button>
                </div>

            </Headline>

            <main className="page__auth-form">

                <form className="auth-form" onSubmit={onSubmit}>

                    <span className="auth-form__title">Sign up</span>

                    <Input {...usernameParams} className="auth-form__input-field"/>

                    <Input {...nameParams} className="auth-form__input-field"/>

                    <Input {...passwordParams} className="auth-form__input-field"/>

                    <button type="submit" className="auth-form__submit button _submit">
                        Sign Up
                    </button>

                </form>

            </main>
        </>
    )

};


export default memo<FC>(SignUpPage);