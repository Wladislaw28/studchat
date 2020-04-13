import React from 'react';
import { IconReaded, Time } from '../../components';
import classNames from 'classnames';

import './DialogItem.scss';

interface IDialogItemProps {
    user?: any;
    message?: any;
    unreaded?: number;
}

const DialogItem = ({ user, message, unreaded }: IDialogItemProps) => (
    <div className={classNames("dialogs__item", { 'dialogs__item--online': user.isOnline })}>
        <div className="dialogs__item-avatar">
            {/* <img src={user.avatar} alt={`${user.fullName} avatar`} /> */}
            <img src={'https://sun9-55.userapi.com/c850428/v850428459/8d1f9/9cZ1YRjKx3Y.jpg?ava=1'}
                alt={`Виктор Блуд avatar`} />
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <h1>{user.fullName}</h1>
                {/* <Time dateProps={'Mon Apr 06 2020 00:34:38 GMT+0300'} /> */}
                <span>13:03</span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>Thanks, Men.Thanks, Men.Thanks, Men.Thanks, Men.Thanks, Men.Thanks, Men.Thanks, Men</p>
                {!!unreaded ? <div className="dialogs__item-info-bottom-count">{unreaded}</div> : <IconReaded isMe={true} isReaded={true} />}
            </div>
        </div>
    </div>
);

export default DialogItem;