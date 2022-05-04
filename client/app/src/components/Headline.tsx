import React, {FC, ReactElement} from 'react';

type PropsType = {
    children: React.ReactNode,
}

const Headline: FC<PropsType> = ({children}): ReactElement => {

    return (
        <header className="headline page__header">

            { children }

        </header>
    );

};


export default Headline;