import React, {FC, ReactElement} from 'react';
import ErrorMessage from "./ErrorMessage";
import {useAppSelector} from "../../hooks/store.hook";

type PropsType = {}

const ErrorsList: FC<PropsType> = ({}): ReactElement => {

    const errors = useAppSelector(state => state.rootReducer.error.errors);

    const errorsList = errors.map((error, i) => <ErrorMessage message={error} key={i}/>)

    return (
        <ul className="errors-list">
            { errorsList }
        </ul>
    )

};


export default ErrorsList;