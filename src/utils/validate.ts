interface IValidateForm {
    isAuth: boolean;
    values: any;
    errors: any;
}

interface IRules {
    email: (value: any) => void;
    password: (value: any) => void;
    login: (value: any) => void;
}

export const validateForm = ({ isAuth, values, errors }: IValidateForm): void => {
    const rules: any = {
        email: (value: any) => {
            if (!value) {
                errors.email = 'Введите email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = 'Неверный email';
            }
        },
        password: (value: any) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
                errors.password = isAuth ? 'Неверный пароль' : 'Пароль должен содержать минимум восемь символов, как минимум одна буква и одна цифра';
            }
        },
        login: (value: any) => {
            if (!value) {
                errors.login = 'Введите имя пользователя';
            }
        }
    };

    Object.keys(values).forEach(
        (key: string) => rules[key] && rules[key](values[key])
    );
};