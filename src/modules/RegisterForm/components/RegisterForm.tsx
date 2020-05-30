import React from 'react';
import { Form, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { FormikProps } from 'formik';

import { Button, WhiteBlock, FormField } from '../../../components';

const success = false;

export interface RegisterFormValues {
    fullName: string;
    password: string;
    email: string;
}

export const RegisterForm = (props: FormikProps<RegisterFormValues>) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистироваться</p>
            </div>
            <WhiteBlock>
                {!success ?
                    <Form onSubmit={handleSubmit} className="login-form">
                        <FormField name="email" placeholder="Email" touched={touched}
                            errors={errors} icon="mail" handleChange={handleChange} handleBlur={handleBlur} values={values} />

                        <FormField name="fullName" placeholder="Ваше имя" touched={touched}
                            errors={errors} icon="user" handleChange={handleChange} handleBlur={handleBlur} values={values} />

                        <FormField type="password" name="password" placeholder="Пароль" touched={touched}
                            errors={errors} icon="lock" handleChange={handleChange} handleBlur={handleBlur} values={values} />

                        <FormField type="password" name="password_2" placeholder="Повторите пароль" touched={touched}
                            errors={errors} icon="lock" handleChange={handleChange} handleBlur={handleBlur} values={values} />

                        {isSubmitting && !isValid && 'Ошибка'}
                        <Form.Item>
                            <Button disabled={isSubmitting} type="primary" size='large' onClick={handleSubmit}>
                                Зарегистироваться
                            </Button>
                        </Form.Item>
                        <Link className="auth__registr-link" to='/login'>
                            Войти в аккаунт
                    </Link>
                    </Form> :
                    <div className='auth__success-block'>
                        <div>
                            <Icon type='info-circle' theme='twoTone' style={{ fontSize: '50px' }} />
                        </div>
                        <h3>Подтвердите свой аккаунт</h3>
                        <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                    </div>}
            </WhiteBlock>
        </div>
    );
};