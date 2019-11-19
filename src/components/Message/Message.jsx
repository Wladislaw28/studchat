import React from 'react';
import { Button as BaseButton } from 'antd';

import './Message.scss';

const Message = ({ avatar, user, text, date }) => (
    <div className='message'>
        <div className="message__avatar">
            <img src={avatar} alt={`Avatar ${user.fullname}`} />
        </div>
        <div className="message__content">
            <div className="message__bubble">
                <p className="message__text">{text}</p>
            </div>
            <span className="message__date">{date}</span>
        </div>
    </div>
);

Message.defaultProps = {
    user: {}
}

export default Message;