import React from 'react';
import { DialogItem } from '../../components';
import orderBy from 'lodash/orderBy';
import { Input, Empty } from "antd";

import './Dialogs.scss';

interface IDialogsProps {
    items?: Array<any>;
    userId?: any;
    onSearch?: any;
    inputValue?: any;
}

const Dialogs = ({ items, userId, onSearch, inputValue, onSelectDialog }: any): JSX.Element => (
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
                <DialogItem onSelect={onSelectDialog} key={item._id} isMe={item.user._id === userId} {...item} />
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