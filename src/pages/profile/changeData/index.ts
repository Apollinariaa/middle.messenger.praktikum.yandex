import Button from '../../../components/Button/index';
import SubmitButton from '../../../components/SubmitButton/index';
import Input from '../../../components/Input/index';
import ChangeDataTemplate from './ChangeDataTemplate';
import ChangeDataController from './ChangeDataController';
import Page from '../../../services/Page';

export default class ChangeDataPage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Вернуться назад',
            attr: { class: 'style-weigth'}
        });

        const submitButton = new SubmitButton('button',{
            children: 'Сохранить',
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

        const inputDisplayName = new Input('div', {
            code: 'display_name',
            name: 'Ник',
            type: 'text',
            value: 'Иваныч',
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
            inputDisplayName,
            inputSecondName,
            inputPhone,
            inputPassword
        ];

        const changeDataPage = new ChangeDataTemplate('main',{
            input_form: inputForm,
            back_button: button,
            submit_button: submitButton,
            code_img: 'avatar'
        });

        return changeDataPage;
    }
}

// Функция для страницы изменение данных
export const renderChangeDataPage = (app: HTMLElement | null) => {
    if (app) app.textContent = '';
    const сhangeDataPage = new ChangeDataPage();
    сhangeDataPage.render();
    new ChangeDataController();
};
