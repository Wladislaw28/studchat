import React from 'react';
import { Time } from '../../components';

import './DialogItem.scss';

interface IDialogItemProps {
    user?: object;
    message?: any;
}

const DialogItem = ({ user, message }: IDialogItemProps) => (
    <div className="dialogs__item">
        <div className="dialogs__item-avatar">
            {/* <img src={user.avatar} alt={`${user.fullName} avatar`} /> */}
            <img src={'https://sun9-55.userapi.com/c850428/v850428459/8d1f9/9cZ1YRjKx3Y.jpg?ava=1'}
                alt={`Виктор Блуд avatar`} />
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <h1>Виктор Блуд</h1>
                <Time dateProps={'Mon Apr 06 2020 00:34:38 GMT+0300'} />
            </div>
            <div className="dialogs__item-info-bottom">

            </div>
        </div>
    </div>
);

export default DialogItem;