import React from 'react';
import { DialogItem } from '../../components';
import orderBy from 'lodash/orderBy';
import classNames from 'classnames';
import { Input, Empty, Spin, Alert } from "antd";

import './Dialogs.scss';

interface IDialogsProps {
    items?: Array<any>;
    userId?: any;
    onSearch?: any;
    inputValue?: any;
}

const Dialogs = ({ isLoading, items, userId, onSearch, inputValue, onSelectDialog }: any): JSX.Element => (
    <div className='dialogs'>
        <div className="dialogs__search">
            <Input.Search
                placeholder="Поиск среди контактов"
                onChange={e => onSearch(e.target.value)}
                value={inputValue}
            />
        </div>
        <div className={classNames('dialogs__dialogsItem', { 'dialogs__dialogsItem--loading': isLoading })}>
            {(items && items.length) && !isLoading ? (
                orderBy(items, ["created_at"], ["desc"]).map(item => (
                    <DialogItem onSelect={onSelectDialog} key={item._id} isMe={item.user._id === userId} {...item} />
                ))
            ) : isLoading ?
                    <Spin size="large" tip="Загрузка..." />
                    : (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Ничего не найдено"
                        />
                    )
            }
        </div>
    </div>
);

export default Dialogs;