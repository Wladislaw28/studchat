import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';

import { Messages as BaseMessages } from "../components";
import { messagesActions } from '../redux/actions';
import socket from "../core/socket";

const Messages = (props: any) => {
    const { fetchMessages, currentDialogId, items, isLoading } = props;
    const messagesRef: any = useRef(null);
    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
        socket.on("SERVER:NEW_MESSAGE", (data: any) => {
            console.log(data);
            fetchMessages(currentDialogId);
        })
    }, [currentDialogId]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo(0, 99999);
        }
    }, [items])

    return (
        <BaseMessages
            isLoading={isLoading}
            items={items}
            blockRef={messagesRef}
        />
    );
};

export default connect(
    ({ dialogs, messages }: any) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading
    }), messagesActions)(Messages);