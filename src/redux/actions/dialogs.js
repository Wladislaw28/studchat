import { dialogsApi } from '../../utils/api';

const actions = {
    setDialogs: items => ({
        type: "DIALOGS:SET_ITEMS",
        payload: items
    }),
    setIsLoading: bool => ({
        type: "DIALOGS:SET_IS_LOADING",
        payload: bool
    }),
    setCurrentDialogId: id => ({
        type: "DIALOGS:SET_CURRENT_DIALOG_ID",
        payload: id
    }),
    fetchDialogs: () => dispatch => {
        dispatch(actions.setIsLoading(true));
        dialogsApi.getAll()
            .then(({ data }) => {
                dispatch(actions.setDialogs(data));
            })
            .catch(() => {
                dispatch(actions.setIsLoading(false));
            });
    }
};

export default actions;