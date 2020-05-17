import { openNotification } from '../../utils/helper/openNotification';
import { userApi } from '../../utils/api';

const actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    fetchUserData: () => dispatch => {
        dispatch(actions.setUserData(data));
    },
    fetchUserLogin: postData => dispatch => {
        return userApi.login(postData).then(({ data }) => {
            const { status, token } = data;
            if (status === "error" || status === "fail") {
                openNotification({
                    text: "Неверный логин или пароль",
                    type: 'error',
                    title: "Ошибка при авторизации"
                });
            } else {
                openNotification({
                    type: 'success',
                    title: "Успешный вход"
                });
                dispatch(actions.setUserData(data));
            }
            // window.token = token;
        })
    }
};

export default actions;