import React from 'react';
import { IconReaded } from '../../components';
import classNames from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

import './DialogItem.scss';

interface IDialogItemProps {
    user?: any;
    message?: any;
    unreaded?: number;
    isMe: boolean;
    isReaded: boolean;
}

const getMessageTime = (created_at: Date) => {
    if (isToday(created_at)) {
        return format(created_at, 'HH:mm');
    } else {
        return format(created_at, 'dd.MM.yyyy');
    }
}

const DialogItem = ({ user, message, unreaded, isMe, isReaded }: IDialogItemProps) => (
    <div className={classNames("dialogs__item", { 'dialogs__item--online': user.isOnline })}>
        <div className="dialogs__item-avatar">
            {user.avatar && <img src={user.avatar} alt={`${user.fullName} avatar`} />}
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <h1>{user.fullName}</h1>
                {/* <Time dateProps={message.created_at} /> */}
                <span className="time">{getMessageTime(message.created_at)}</span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>{message.text}</p>
                {!!unreaded
                    ? <div className="dialogs__item-info-bottom-count">{unreaded}</div>
                    : <IconReaded isMe={true} isReaded={isReaded} />}
            </div>
        </div>
    </div>
);

export default DialogItem;