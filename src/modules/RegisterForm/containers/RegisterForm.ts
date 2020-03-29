import { withFormik, FormikErrors } from 'formik';
import { RegisterForm, RegisterFormValues } from '../components/RegisterForm';
import { validateForm } from '../../../utils/validate';

export default withFormik<{}, RegisterFormValues>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        login: '',
        password: '',
        email: ''
    }),
    validate: (values: RegisterFormValues) => {
        let errors: FormikErrors<RegisterFormValues> = {};
        validateForm({ isAuth: false, values, errors });
        return errors;
    },

    handleSubmit: (values: RegisterFormValues, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);