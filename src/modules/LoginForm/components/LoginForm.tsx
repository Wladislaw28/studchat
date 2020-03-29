import React from 'react';
import { Form, Icon, Input } from 'antd';
import { Button, WhiteBlock } from '../../../components';
import { Link } from 'react-router-dom';
import { validateField } from '../../../utils/helper';
import { FormikProps } from 'formik';

export interface LoginFormValues {
    login: string;
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
        isValid
    } = props;
    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <WhiteBlock>
                <Form className="login-form">
                    <Form.Item validateStatus={validateField("login", touched, errors)}
                        help={!touched.login ? '' : errors.login} hasFeedback>
                        <Input
                            id="login"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Логин"
                            size="large"
                            value={values.login}
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
                    {!isValid && 'Error'}
                    <Form.Item>
                        <Button type="primary" size='large' onClick={handleSubmit}>
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