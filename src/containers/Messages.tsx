import React, { useEffect } from "react";
import { connect } from 'react-redux';

import { Messages as BaseMessages } from "../components";
import { messagesActions } from '../redux/actions';

const Messages = ({ fetchMessages, currentDialogId, items, isLoading }: any) => {
    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
    }, [currentDialogId]);

    return (
        <BaseMessages
            isLoading={isLoading}
            items={items}
        />
    );
};

export default connect(({ dialogs, messages }: any) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading
}), messagesActions)(Messages);