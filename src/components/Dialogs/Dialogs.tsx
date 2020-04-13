import React from 'react';
import { DialogItem } from '../../components';
import orderBy from 'lodash/orderBy';
import isToday from 'date-fns/isToday';

import './Dialogs.scss';

interface IDialogsProps {
    items?: Array<any>;
    currentId: number;
}

const Dialogs = ({ items, currentId }: IDialogsProps) => (
    <div className="dialogs">
        {items && orderBy(items.map((item) => {
            return <DialogItem key={item._id} user={item.user}
                message={item} unreaded={0} isMe={item.user._id === currentId} isReaded={item.isReaded} />;
        }), ['created_at'], ['asc'])}
        {/* <DialogItem user={{
            fullName: 'Arrarat Muhamed',
            isOnline: true
        }} unreaded={3} />
        <DialogItem user={{
            fullName: 'Valdis Miha',
            isOnline: false
        }} unreaded={100} />
        <DialogItem user={{
            fullName: 'Pidoras Pidorski',
            isOnline: true
        }} /> */}
    </div>
);

export default Dialogs;