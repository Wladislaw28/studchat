import React from 'react';
import classNames from 'classnames';
import { Time } from '../../components';
import { IconReaded } from '../../components';

import './Message.scss';

interface IMessageProps {
    avatar: string;
    text?: string;
    date?: string;
    user?: any;
    attachments?: Array<any>;
    isTyping?: boolean;
    isReaded?: boolean;
    isMe?: boolean;
}

const Message = ({ avatar, user, text, date, isMe, isReaded, attachments, isTyping }: IMessageProps) => (
    <div className={classNames("message", { "message--isme": isMe, "message--is-typing": isTyping })}>
        <div className="message__content">
            {(isMe && isReaded) && <IconReaded isMe={isMe} isReaded={isReaded} />}
            <div className="message__avatar">
                <img src={avatar} alt={`${avatar}- users avatar`} />
            </div>
            <div className="message__info">
                {(text || isTyping) && <div className="message__bubble">
                    {text && <p className="message__text">{text}</p>}
                    {isTyping && <div className="message__is-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>}
                </div>}
                <div className="message__attachments">
                    {attachments && attachments.map((item) => (
                        <div className={attachments.length !== 1 ? 'message__attachments-items' : 'message__attachments-item'}>
                            <img src={item.url} alt={item.filename} />
                        </div>
                    ))}
                </div>
                {date && <Time dateProps={date} />}
            </div>
        </div>
    </div>
);
export default Message;