import { messagesApi } from '../../utils/api';

const actions = {
  setMessages: items => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items
  }),
  addMessage: message => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;

    if (currentDialogId === message.dialog._id) {
      dispatch({
        type: "MESSAGES:ADD_MESSAGE",
        payload: message
      });
    }
  },
  fetchSendMessage: (text, dialogId) => dispatch => {
    messagesApi.send(text, dialogId);
  },
  setIsLoading: bool => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool
  }),
  fetchMessages: dialogId => dispatch => {
    dispatch(actions.setIsLoading(true));
    messagesApi
      .getAllByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(actions.setMessages(data));
      })
      .catch(() => {
        dispatch(actions.setIsLoading(false));
      });
  }
};

export default actions;