import { withFormik, FormikErrors } from 'formik';

import { LoginForm, LoginFormValues } from '../components/LoginForm';
import { validateForm } from '../../../utils/validate';

import { userActions } from '../../../redux/actions';
import store from '../../../redux/store';

const LoginFormContainer = withFormik<{}, LoginFormValues>({
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

    handleSubmit: (values: LoginFormValues, { setSubmitting, props }: any) => {
        store.dispatch(userActions.fetchUserLogin(values))
            .then(({ status }: any) => {
                if (status === "success") {
                    setTimeout(() => {
                        props.history.push("/");
                    }, 3000);
                }
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            })
    },

    displayName: 'LoginForm', // helps with React DevTools
})(LoginForm);


export default LoginFormContainer;