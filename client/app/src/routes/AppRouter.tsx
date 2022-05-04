import React, {FC, memo, ReactElement, useEffect} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import RoutesWhenNotAuth from "./RoutesWhenNotAuth";
import RoutesWhenAuth from "./RoutesWhenAuth";
import {useAppSelector} from "../hooks/store.hook";

const AppRouter: FC = (): ReactElement => {

    const { user } = useAppSelector(state => state.rootReducer.auth);

    return (
        <Router>
            { user ? <RoutesWhenAuth/> : <RoutesWhenNotAuth />}
        </Router>
    );

};


export default memo<FC>(AppRouter);