
import Button from '../../../components/Button/index';
import SubmitButton from '../../../components/SubmitButton/index';
import Input from '../../../components/Input/index';
import Page from "../../../services/Page";
import ChangePasswordTemplate from "./ChangePasswordTemplate";
import ChangePasswordController from './ChangePasswordController';

export default class ChangePasswordPage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Вернуться назад',
            attr: { class: 'style-weigth'}
        });

        const submitButton = new SubmitButton('button',{
            children: 'Сохранить',
            attr: { class: 'submit-button', type: 'submit'}
        });

        const inputOldPassword = new Input('div', {
            code: 'oldPassword',
            name: 'Старый пароль',
            type: 'password',
            value: '••••••••••',
        })

        const inputNewPassword = new Input('div', {
            code: 'newPassword',
            name: 'Новый пароль',
            type: 'password',
            value: '••••••••••',
        })

        const inputForm = [
            inputOldPassword,
            inputNewPassword,
        ];

        const changePasswordPage = new ChangePasswordTemplate('main',{
            input_form: inputForm,
            back_button: button,
            submit_button: submitButton,
        });

        return changePasswordPage;
    }
}

// Функция для отображения страницы изменение пароля
export const renderChangePasswordPage = (app: HTMLElement | null) => {
    if (app) app.textContent = ``;
    const changePasswordPage = new ChangePasswordPage();
    changePasswordPage.render();
    new ChangePasswordController();
};
