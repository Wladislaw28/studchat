import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { Dialogs as BaseDialogs } from "../components";
import { dialogsActions } from '../redux/actions';

const Dialogs = ({ fetchMessages, items }: any) => {
    const [inputValue, setValue] = useState("");
    const [filtred, setFiltredItems] = useState(Array.from(items));

    useEffect(() => {
        if (!items.length) {
            fetchMessages();
        } else {
            setFiltredItems(items);
        }
    }, [items]);

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
            onSearch={onChangeInput}
            inputValue={inputValue}
            onSelectDialog={setCurrentDialog}
        />
    );
};

export default connect(({ dialogs }: any) => dialogs, dialogsActions)(Dialogs);