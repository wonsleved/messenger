import React, {FC, ReactElement} from 'react';

type PropsType = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const BurgerButton: FC<PropsType> = ({onClick}): ReactElement => {

    return (
        <button
            className="burger-button"
            onClick={onClick}
        >
            <span className="burger-button__row"></span>
            <span className="burger-button__row"></span>
            <span className="burger-button__row"></span>
        </button>
    );

};


export default BurgerButton;