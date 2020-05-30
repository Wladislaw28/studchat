import React from "react";
import classNames from "classnames";
import format from "date-fns/format";
import isToday from "date-fns/isToday";

import { IconReaded, Avatar } from "../";

interface IDialogItemProps {
    user: any;
    undread: any;
    created_at: any;
    text: any;
    isMe: any;
}

const getMessageTime = (created_at: any) => {
    if (isToday(created_at)) {
        return format(new Date(created_at), "HH:mm");
    } else {
        return format(new Date(created_at), "dd.MM.yyyy");
    }
};

const DialogItem = (props: any) => {
    console.log(props)
    const { _id, user, undread, created_at, text, isMe, currentDialogId, onSelect, lastMessage } = props;
    return (
        <div
            className={classNames("dialogs__item", {
                "dialogs__item--online": lastMessage.user.isOnline,
                "dialogs__item--selected": _id === currentDialogId
            })}
            // @ts-ignore
            onClick={onSelect.bind(this, _id)}
        >
            <div className="dialogs__item-avatar">
                <Avatar user={lastMessage.user} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{lastMessage.user.fullName}</b>
                    <span>{getMessageTime(lastMessage.createdAt)}</span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{lastMessage.text}</p>
                    {isMe && <IconReaded isMe={true} isReaded={false} />}
                    {lastMessage.undread > 0 && (
                        <div className="dialogs__item-info-bottom-count">
                            {lastMessage.undread > 9 ? "+9" : lastMessage.undread}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default DialogItem;