import React from 'react';
import { DialogItem } from '../../components';
import orderBy from 'lodash/orderBy';
import classNames from 'classnames';
import { Input, Empty, Spin } from "antd";

import './Dialogs.scss';

interface IDialogsProps {
    items?: Array<any>;
    userId?: any;
    onSearch?: any;
    inputValue?: any;
}

const Dialogs = ({ isLoading, items, userId, onSearch, inputValue, currentDialogId, onSelectDialog }: any): JSX.Element => {
    console.log(items);
    return (
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
                        <DialogItem  {...item} key={item._id} onSelect={onSelectDialog}
                            isMe={item.author._id === userId} currentDialogId={currentDialogId} />
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
    )
};

export default Dialogs;