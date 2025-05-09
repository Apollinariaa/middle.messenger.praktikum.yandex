import Button from '../../components/Button/index';
import SubmitButton from '../../components/SubmitButton/index';
import Input from '../../components/Input/index';
import Page from '../../services/Page';
import AuthTemplate from './AuthTemplate';
import AuthPageController from './AuthController';

export default class AuthPage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Нет аккаунта?',
        });

        const submitButton = new SubmitButton('button',{
            children: 'Войти',
            attr: { class: 'style-margin'},
        });

        const inputLogin = new Input('div', {
            code: 'login',
            name: 'Логин',
            type: 'text',
            value: 'pochta@yandex.ru',
        })

        const inputPassword = new Input('div', {
            code: 'password',
            name: 'Пароль',
            type: 'password',
            value: '•••••••••••',
        })

        const inputForm = [inputLogin, inputPassword];

        const authTemplate = new AuthTemplate('main',{
            input_form: inputForm,
            submit_button: submitButton,
            button

        });

        return authTemplate;
    }
}

// Функция для отображения страницы авторизации
export const renderAuthPage = (app: HTMLElement | null) => {
    if (app) app.textContent = '';
    const authPage = new AuthPage();
    authPage.render();
    new AuthPageController();
};
