import React, {FC, ReactElement} from 'react';

type PropsType = {
    name: string,
    username: string
}

const Participant: FC<PropsType> = ({username, name}): ReactElement => {

    return (
        <div className="chat-participants__participant">
            <span className="chat-participants__name">
                {name}
            </span>
            <span className="chat-participants__username">
                {username}
            </span>
        </div>
    )

};


export default Participant;