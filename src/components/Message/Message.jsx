import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru';
import classNames from 'classnames';
import readed from 'assets/img/readed.svg';
import noreaded from 'assets/img/noreaded.svg';

import './Message.scss';

const Message = ({ avatar, user, text, date, isMe, isReaded }) => (
    <div className={classNames("message", { "message--isme": isMe })}>
        <div className="message__content">
            {isMe && <img className="message__icon-readed"
                src={isReaded === true ? readed : noreaded} alt="Checked icon" />}
            <div className="message__avatar">
                <img src={avatar} alt={`Avatar ${user.fullname}`} />
            </div>
            <div className="message__info">
                <div className="message__bubble">
                    <p className="message__text">{text}</p>
                </div>
                <span className="message__date">{formatDistanceToNow(new Date(date), { addSuffix: true, locale: ruLocale })}</span>
            </div>
        </div>
    </div>
);

Message.defaultProps = {
    user: {}
}

export default Message;