import Button from '../../components/Button/index';
import SubmitButton from '../../components/SubmitButton/index';
import Input from '../../components/Input/index';
import Page from '../../services/Page';
import RegistrationTemplate from './RegistrationTemplate';
import RegistrationPageController from './RegistrationController';

export default class RegistrationPage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Нет аккаунта?',
        });

        const submitButton = new SubmitButton('button',{
            children: 'Зарегистрироваться',
            attr: { class: 'style-margin'}
        });

        const inputLogin = new Input('div', {
            code: 'login',
            name: 'Логин',
            type: 'text',
            value: 'ivanivanov',
        })

        const inputPassword = new Input('div', {
            code: 'password',
            name: 'Пароль',
            type: 'password',
            value: '•••••••••••',
        })

        const inputFirstName = new Input('div', {
            code: 'first_name',
            name: 'Имя',
            type: 'text',
            value: 'Иван',
        })

        const inputSecondName = new Input('div', {
            code: 'second_name',
            name: 'Фамилия',
            type: 'text',
            value: 'Иванов',
        })

        const inputPhone = new Input('div', {
            code: 'phone',
            name: 'Телефон',
            type: 'tel',
            value: '+7 (999) 999 99 99',
        })

        const inputEmail = new Input('div', {
            code: 'email',
            name: 'Почта',
            type: 'text',
            value: 'pochta@yandex.ru',
        })

        const inputForm = [
            inputLogin,
            inputEmail,
            inputFirstName,
            inputSecondName,
            inputPhone,
            inputPassword
        ];

        const registrationPage = new RegistrationTemplate('main',{
            input_form: inputForm,
            submit_button: submitButton,
            button
        });

        return registrationPage;
    }
}

// Функция для отображения страницы регистрации
export const renderRegistrationPage = (app: HTMLElement | null) => {
    if (app) app.textContent = '';
    const registrationPage = new RegistrationPage();
    registrationPage.render();
    new RegistrationPageController();

};
