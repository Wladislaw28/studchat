import { openNotification } from '../../utils/helper/openNotification';
import { userApi } from '../../utils/api';

const actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool,
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({ data }) => {
            dispatch(actions.setUserData(data));
        })
            .catch(err => {
                if (err.response.status === 403) {
                    dispatch(actions.setIsAuth(false));
                    delete window.localStorage.token;
                }
            });
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
                dispatch(actions.setIsAuth(true));
            }
            return data;
        })
    },
    fetchUserRegister: postData => () => {
        return userApi.register(postData).then(({ data }) => {
            console.log(data);
            return data;
        })
    }
};

export default actions;