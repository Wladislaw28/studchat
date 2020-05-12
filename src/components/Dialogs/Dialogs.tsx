import React from 'react';
import { DialogItem } from '../../components';
import orderBy from 'lodash/orderBy';
import { Input, Empty } from "antd";

import './Dialogs.scss';

interface IDialogsProps {
    items?: Array<any>;
    userId: number;
    onSearch?: any;
    inputValue?: any;
}

// const Dialogs = ({ items, currentId }: IDialogsProps): JSX.Element => (
//     <div className="dialogs">
//         {items && orderBy(items, dialog => +dialog.created_at, ['desc']).map((item) => {
//             return <DialogItem {...item} key={item._id} message={item} isMe={item.user._id === currentId} />;
//         })}
//     </div>
// );

const Dialogs = ({ items, userId, onSearch, inputValue }: IDialogsProps): JSX.Element => (
    <div className="dialogs">
        <div className="dialogs__search">
            <Input.Search
                placeholder="Поиск среди контактов"
                onChange={e => onSearch(e.target.value)}
                value={inputValue}
            />
        </div>
        {items && items.length ? (
            orderBy(items, ["created_at"], ["desc"]).map(item => (
                <DialogItem key={item._id} isMe={item.user._id === userId} {...item} />
            ))
        ) : (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Ничего не найдено"
                />
            )}
    </div>
);

export default Dialogs;