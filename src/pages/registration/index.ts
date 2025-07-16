import Button from '../../components/Button/index';
import SubmitButton from '../../components/SubmitButton/index';
import Input from '../../components/Input/index';
import Block from '../../services/Block';
import { template } from './Registration';
import { RoutesLinks } from '../../utils/regex';
import Router from '../../services/router/Router';
import { collectFormData, validateForm, validateInput } from '../../utils/validation';
import { registrationUser } from '../../api/auth/auth';

const button = new Button('button',{
    children: 'Уже есть аккаунт?',
    events: {
        click: () => Router.getInstance().go(RoutesLinks.login)
    }
});

const submitButton = new SubmitButton('button',{
    children: 'Зарегистрироваться',
    attr: { class: 'style-margin'},
    events: {
        click: (e: Event) => {
            e.preventDefault();
            if (validateForm('#registration_form')) {
                const collectForm = collectFormData('#registration_form');
                const formData = {
                    first_name: collectForm.first_name,
                    second_name: collectForm.second_name,
                    email: collectForm.email,
                    login: collectForm.login,
                    password: collectForm.password,
                    phone: collectForm.phone,
                };
                registrationUser(formData);
            }
        }
    }
});

const inputLogin = new Input('div', {
    code: 'login',
    name: 'Логин',
    type: 'text',
    value: 'ivanivanov',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('login', target);
        }
    }
})

const inputPassword = new Input('div', {
    code: 'password',
    name: 'Пароль',
    type: 'password',
    value: '•••••••••••',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('password', target);
        }
    }
})

const inputFirstName = new Input('div', {
    code: 'first_name',
    name: 'Имя',
    type: 'text',
    value: 'Иван',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('first_name', target);
        }
    }
})

const inputSecondName = new Input('div', {
    code: 'second_name',
    name: 'Фамилия',
    type: 'text',
    value: 'Иванов',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('second_name', target);
        }
    }
})

const inputPhone = new Input('div', {
    code: 'phone',
    name: 'Телефон',
    type: 'tel',
    value: '+7 (999) 999 99 99',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('phone', target);
        }
    }
})

const inputEmail = new Input('div', {
    code: 'email',
    name: 'Почта',
    type: 'text',
    value: 'pochta@yandex.ru',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('email', target);
        }
    }
})

const inputForm = [
    inputLogin,
    inputEmail,
    inputFirstName,
    inputSecondName,
    inputPhone,
    inputPassword
];

export default class RegistrationPage extends Block {
    constructor() {
        super('main', {
            input_form: inputForm,
            submit_button: submitButton,
            button
        });
    };
    render() {
        return this.compile(template, {attr: {class: 'auth-block block-blue'}});
    }
}
