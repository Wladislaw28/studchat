import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';

import { Messages as BaseMessages } from "../components";
import { messagesActions } from '../redux/actions';

const Messages = ({ fetchMessages, currentDialogId, items, isLoading }: any) => {
    const messagesRef: any = useRef(null);

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
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

export default connect(({ dialogs, messages }: any) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading
}), messagesActions)(Messages);