import React from "react";
import { Empty, Spin } from "antd";
import { Message } from "../../components";
import classNames from 'classnames';

import './Messages.scss';

const Messages = ({ blockRef, isLoading, items }: any) => {
    return (<div ref={blockRef} className={classNames('messages', { 'messages--loading': isLoading })}>
        {isLoading
            ? <Spin size="large" tip="Загрузка..." /> 
            : items && !isLoading
                ? (items.length > 0
                    ? items.map((item: any) =>
                        (<Message key={item._id} {...item} />)
                    )
                    : <Empty description="Нет сообщений " />)
                : <Empty description="Откройте диалог" />
        }
    </div>)
};

export default Messages;