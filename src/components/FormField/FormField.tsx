import React from 'react';
import { Form, Icon, Input } from 'antd';
import { validateField } from '../../utils/helper/validateField';

const FormField = ({ name, placeholder, icon, handleChange, handleBlur, touched, errors, values, type }: any) => {
    return (
        <div>
            <Form.Item validateStatus={validateField(name, touched, errors)}
                help={!touched[name] ? '' : errors[name]} hasFeedback>
                <Input
                    id={name}
                    type={!!type ? type : name}
                    prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder={placeholder}
                    size="large"
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
        </div>
    );
}

export default FormField;