import React from 'react';
import { DialogItem } from '../../components';
import orderBy from 'lodash/orderBy';

import './Dialogs.scss';

interface IDialogsProps {
    items?: Array<any>;
    currentId: number;
}

const Dialogs = ({ items, currentId }: IDialogsProps): JSX.Element => (
    <div className="dialogs">
        {items && orderBy(items, dialog => +dialog.created_at, ['desc']).map((item) => {
            return <DialogItem {...item} key={item._id} message={item} isMe={item.user._id === currentId} />;
        })}
    </div>
);

export default Dialogs;