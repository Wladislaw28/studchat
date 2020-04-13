import React from 'react';
import readed from 'assets/img/readed.svg';
import noreaded from 'assets/img/noreaded.svg';

import './IconReaded.scss';

interface IIconReadedProps {
    isMe: boolean;
    isReaded: boolean;
}

const IconReaded = ({ isMe, isReaded }: IIconReadedProps): JSX.Element => (
    <>
        {isMe && <img className="icon-readed"
            src={isReaded === true ? readed : noreaded} alt="Checked icon" />}
    </>
);

export default IconReaded;