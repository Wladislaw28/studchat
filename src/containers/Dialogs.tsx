import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { Dialogs as BaseDialogs } from "../components";
import { dialogsActions } from '../redux/actions';

const Dialogs = ({ setCurrentDialogId, currentDialogId, fetchDialogs, items, userId, isLoading }: any) => {
    const [inputValue, setValue] = useState("");
    const [filtred, setFiltredItems] = useState(Array.from(items));

    // useEffect(() => {
    //     if (!items.length) {
    //         fetchDialogs();
    //     } else {
    //         setFiltredItems(items);
    //     }
    // }, [items]);

    const onChangeInput = (value: any) => {
        setFiltredItems(
            items.filter(
                (dialog: any) =>
                    dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        setValue(value);
    };

    return (
        <BaseDialogs
            userId={userId}
            items={filtred}
            isLoading={isLoading}
            onSearch={onChangeInput}
            inputValue={inputValue}
            onSelectDialog={setCurrentDialogId}
            currentDialogId={currentDialogId}
        />
    );
};

export default connect(({ dialogs }: any) => ({
    items: dialogs.items,
    isLoading: dialogs.isLoading,
    currentDialogId: dialogs.currentDialogId
}), dialogsActions)(Dialogs);