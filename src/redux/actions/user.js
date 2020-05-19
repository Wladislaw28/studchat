import { openNotification } from '../../utils/helper/openNotification';
import { userApi } from '../../utils/api';

const actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data));
        })
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
                window.axios.defaults.headers.common["token"] = token;
                window.localStorage["token"] = token;
                dispatch(actions.fetchUserData());
            }
            return data;
        })
    }
};

export default actions;