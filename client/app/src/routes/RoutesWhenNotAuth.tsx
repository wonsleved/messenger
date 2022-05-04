import React, {FC, ReactElement} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const RoutesWhenNotAuth: FC = (): ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="login" element={<SignInPage/>}/>
            <Route path="register" element={<SignUpPage/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    );
};


export default RoutesWhenNotAuth;