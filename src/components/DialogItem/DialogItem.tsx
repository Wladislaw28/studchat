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

const DialogItem = ({ _id, user, undread, created_at, text, isMe, onSelect }: any) => (
    <div
        className={classNames("dialogs__item", {
            "dialogs__item--online": user.isOnline
        })}
        // @ts-ignore
        onClick={onSelect.bind(this,_id)}
    >
        <div className="dialogs__item-avatar">
            <Avatar user={user} />
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>{user.fullname}</b>
                <span>{getMessageTime(created_at)}</span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>{text}</p>
                {isMe && <IconReaded isMe={true} isReaded={false} />}
                {undread > 0 && (
                    <div className="dialogs__item-info-bottom-count">
                        {undread > 9 ? "+9" : undread}
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default DialogItem;