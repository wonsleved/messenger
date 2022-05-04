import React, {FC, ReactElement} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MessengerPage from "../pages/MessengerPage";

const RoutesWhenAuth: FC = (): ReactElement => {

    return (
        <Routes>
            <Route path="/" element={<MessengerPage/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
    );

};

export default RoutesWhenAuth;