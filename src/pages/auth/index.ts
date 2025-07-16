import Button from '../../components/Button/index';
import SubmitButton from '../../components/SubmitButton/index';
import Input from '../../components/Input/index';
import Block from '../../services/Block';
import { template } from './Auth';
import Router from '../../services/router/Router';
import { RoutesLinks } from '../../utils/regex';
import { collectFormData, validateForm, validateInput } from '../../utils/validation';
import { loginUser } from '../../api/auth/auth';

const button = new Button('button',{
    children: 'Нет аккаунта?',
    events: {
        click: () => Router.getInstance().go(RoutesLinks.registration)
    }
});

const submitButton = new SubmitButton('button',{
    children: 'Войти',
    attr: { class: 'style-margin'},
    events: {
        click: (e: Event) => {
            e.preventDefault();
            if (validateForm('#auth_form')) {
                const collectForm = collectFormData('#auth_form');
                const formData = { login: collectForm.login, password: collectForm.password };
                loginUser(formData);
            };
        }
    }
});

const inputLogin = new Input('div', {
    code: 'login',
    name: 'Логин',
    type: 'text',
    value: 'pochta@yandex.ru',
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

const inputForm = [inputLogin, inputPassword];

export default class AuthPage extends Block {
    constructor() {
        super('main', {
            input_form: inputForm,
            submit_button: submitButton,
            button
        });
    };
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
