import { withFormik, FormikErrors } from 'formik';
import { LoginForm, LoginFormValues } from '../components/LoginForm';
import { validateForm } from '../../../utils/validate';
import { openNotification } from '../../../utils/helper/openNotification';

import axios from '../../../core/axios';

export default withFormik<{}, LoginFormValues>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: (values: LoginFormValues) => {
        let errors: FormikErrors<LoginFormValues> = {};
        validateForm({ isAuth: true, values, errors });
        return errors;
    },

    handleSubmit: (values: LoginFormValues, { setSubmitting }) => {
        //@ts-ignore
        return axios.post('/user/login', values)
            .then(({ data }: any) => {
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
                }
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            })
    },

    displayName: 'LoginForm', // helps with React DevTools
})(LoginForm);