import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru';

import './Time.scss';

interface ITimeProps {
    dateProps: string
}

const Time = ({ dateProps }: ITimeProps): JSX.Element => (
    <span className="time">
        {formatDistanceToNow(new Date(dateProps), { addSuffix: true, locale: ruLocale })}
    </span>
);

export default Time;