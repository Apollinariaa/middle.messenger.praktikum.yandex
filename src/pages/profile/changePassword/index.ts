
import Button from '../../../components/Button/index';
import SubmitButton from '../../../components/SubmitButton/index';
import Input from '../../../components/Input/index';
import Block from '../../../services/Block';
import { template } from './ChangePassword';
import { collectFormData, validateForm, validateInput } from '../../../utils/validation';
import { RoutesLinks } from '../../../utils/regex';
import Router from '../../../services/router/Router';
import { changeUserPassword } from '../../../api/user/user';

const button = new Button('button',{
    children: 'Вернуться назад',
    attr: { class: 'style-weigth'},
    events: {
        click: () => Router.getInstance().go(RoutesLinks.profile)
    }
});

const submitButton = new SubmitButton('button',{
    children: 'Сохранить',
    events: {
        click: async (e: Event) => {
            e.preventDefault();
            if (validateForm('#change_password_form')) {
                const collectForm = collectFormData('#change_password_form');
                const formData = {
                    oldPassword: collectForm.oldPassword,
                    newPassword: collectForm.newPassword,
                };
                await changeUserPassword(formData);
            }
        }
    }
});

const inputOldPassword = new Input('div', {
    code: 'oldPassword',
    name: 'Старый пароль',
    type: 'password',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('oldPassword', target);
        }
    }
})

const inputNewPassword = new Input('div', {
    code: 'newPassword',
    name: 'Новый пароль',
    type: 'password',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateInput('newPassword', target);
        }
    }
})

const inputForm = [
    inputOldPassword,
    inputNewPassword,
];

export default class ChangePasswordPage extends Block {
    constructor() {
        super('main', {
            input_form: inputForm,
            back_button: button,
            submit_button: submitButton,
        });
    };
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
