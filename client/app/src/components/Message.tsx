import React, {FC, KeyboardEvent, ReactElement} from 'react';
import IMessage from "../models/IMessage";

const MY_NOT_READ = 0;
const OTHER_NOT_READ = 2;


type PropsType = IMessage;

const Message: FC<PropsType> = ({authorName, body, date, registry}): ReactElement => {

    const isOwner = registry === MY_NOT_READ;

    const dateFormatted: string = formatDate(date);

    return (
        <div className={"message messages-list__message " + (isOwner ? '_own' : '')} >
            <div className="message__owner-name">
                {authorName}
            </div>

            <div className="message__content">
                {body}
            </div>

            <div className="message__date">
                {dateFormatted}
            </div>
        </div>
    )

};

function formatDate(dateIso: string): string {
    enum MONTHS {
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    }

    const date = new Date(dateIso);

    const YY = date.getFullYear();
    const MM = MONTHS[date.getMonth()];
    const DD = formatNumberForDate(date.getDate());

    const hh = formatNumberForDate(date.getHours());
    const mm = formatNumberForDate(date.getMinutes());

    return `${DD} ${MM} ${YY} ${hh}:${mm}`;
}

function formatNumberForDate(num: number): string {
    return (num < 10 ? '0' : '') + num;
}


export default Message;