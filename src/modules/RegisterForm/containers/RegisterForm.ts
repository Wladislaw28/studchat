import { withFormik, FormikErrors } from 'formik';
import { RegisterForm, RegisterFormValues } from '../components/RegisterForm';
import { validateForm } from '../../../utils/validate';

import { userActions } from '../../../redux/actions';
import store from '../../../redux/store';

export default withFormik<{}, RegisterFormValues>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        fullName: '',
        password: '',
        password_2: '',
        email: ''
    }),
    validate: (values: RegisterFormValues) => {
        let errors: FormikErrors<RegisterFormValues> = {};
        validateForm({ isAuth: false, values, errors });
        return errors;
    },

    handleSubmit: (values: any, { setSubmitting, props }: any) => {
        store.dispatch(userActions.fetchUserRegister(values))
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

    displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);