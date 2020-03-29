import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm';

export default withFormik({
    validate: values => {
        let errors: any = {};
        if (!values.email) {
            errors.email = 'Введите email';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Введите пароль'
        } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(
                values.password
            )
        ) {
            errors.password = 'Пароль должен содержать минимум восемь символов, как минимум одна буква и одна цифра'
        }
        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm', // helps with React DevTools
})(RegisterForm);;