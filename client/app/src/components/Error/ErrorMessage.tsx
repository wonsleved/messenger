import React, {FC, ReactElement} from 'react';

type PropsType = {
    message: string;
}

const ErrorMessage: FC<PropsType> = ({message}): ReactElement => {

    return <li className="errors-list__message">{message}</li>

};


export default ErrorMessage;