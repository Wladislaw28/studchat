import React from 'react';
import { Form, Icon, Input } from 'antd';
import { Button, WhiteBlock } from '../../../components';
import { Link } from 'react-router-dom';
import { validateField } from '../../../utils/helper/validateField';
import { FormikProps } from 'formik';

export interface LoginFormValues {
    email: string;
    password: string;
}

export const LoginForm = (props: FormikProps<LoginFormValues>) => {
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
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <WhiteBlock>
                <Form className="login-form">
                    <Form.Item validateStatus={validateField("email", touched, errors)}
                        help={!touched.email ? '' : errors.email} hasFeedback>
                        <Input
                            id="email"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            size="large"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item validateStatus={validateField("password", touched, errors)}
                        help={!touched.password ? '' : errors.password} hasFeedback>
                        <Input
                            id="password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Пароль"
                            size="large"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    {isSubmitting && !isValid && 'Ошибка'}
                    <Form.Item>
                        <Button disabled={isSubmitting} type="primary" size='large' onClick={handleSubmit}>
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Link className="auth__registr-link" to='/register'>
                        Зарегистироваться
                    </Link>
                </Form>
            </WhiteBlock>
        </div>
    );
};