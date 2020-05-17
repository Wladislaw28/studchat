import { withFormik, FormikErrors } from 'formik';

import { connect } from 'react-redux';

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

    handleSubmit: (values: LoginFormValues, { setSubmitting }) => {
        store.dispatch(userActions.fetchUserLogin(values))
            .then(() => {
                setSubmitting(false);
            })
    },

    displayName: 'LoginForm', // helps with React DevTools
})(LoginForm);


export default LoginFormContainer;