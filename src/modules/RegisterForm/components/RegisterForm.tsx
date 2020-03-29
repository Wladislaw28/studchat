import React from 'react';
import { Form, Icon, Input } from 'antd';
import { Button, WhiteBlock } from '../../../components';
import { Link, Route } from 'react-router-dom';

const success = false;

const RegisterForm = (props: any) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
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
                        <Form.Item validateStatus={!touched.email ? '' : errors.email ? 'error' : 'success'}
                            help={!touched.email ? '' : errors.email} hasFeedback>
                            <Input
                                id="email"
                                type="email"
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email" 
                                size="large"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item hasFeedback>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Ваше имя"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item validateStatus={!touched.password ? '' : errors.password ? 'error' : 'success'}
                            help={!touched.password ? '' : errors.password} hasFeedback>
                            <Input
                                id="password"
                                type="password"
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                size="large"
                                placeholder="Пароль"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Повторите пароль"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={handleSubmit} type="primary" size='large'>
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
}

export default RegisterForm;
