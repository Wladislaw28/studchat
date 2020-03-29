import { withFormik, FormikErrors } from 'formik';
import { LoginForm, LoginFormValues } from '../components/LoginForm';
import { validateForm } from '../../../utils/validate';

export default withFormik<{}, LoginFormValues>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        login: '',
        password: ''
    }),
    validate: (values: LoginFormValues) => {
        let errors: FormikErrors<LoginFormValues> = {};
        validateForm({ isAuth: true, values, errors });
        return errors;
    },

    handleSubmit: (values: LoginFormValues, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(LoginForm);