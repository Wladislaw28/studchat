import React from "react";
import { Empty, Spin } from "antd";
import { Message } from "../../components";
import classNames from 'classnames';

import './Messages.scss';

const Messages = ({ isLoading, items }: any) => {
    return (<div className={classNames('messages', { 'messages--loading': isLoading })}>
        {isLoading
            ? <Spin size="large" tip="Загрузка..." /> : items && !isLoading
                ? items.map((item: any) =>
                    (<Message {...item} />)
                )
                : <Empty description="Откройте диалог" />
        }
    </div>)
};

export default Messages;