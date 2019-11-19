import React from 'react';
import { Form, Icon, Input } from 'antd';
import { Button, WhiteBlock } from '../../../components';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <div className="auth__top">
                    <h2>Войти в аккаунт</h2>
                    <p>Пожалуйста, войдите в свой аккаунт</p>
                </div>
                <WhiteBlock>
                    <Form className="login-form">
                        <Form.Item validateStatus='success' hasFeedback>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Логин" size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Пароль"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size='large'>
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
    }
}