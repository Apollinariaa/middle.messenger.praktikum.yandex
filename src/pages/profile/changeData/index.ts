import Button from '../../../components/Button/index';
import SubmitButton from '../../../components/SubmitButton/index';
import Input from '../../../components/Input/index';
import Block from '../../../services/Block';
import { template } from './ChangeData';
import { collectFormData, validateForOptionalFieldsInputs, validateForm } from '../../../utils/validation';
import { changeUserData } from '../../../api/user/user';
import { RoutesLinks } from '../../../utils/regex';
import Router from '../../../services/router/Router';

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
        click: (e: Event) => {
            e.preventDefault();
            if (validateForm('#change_data_form', true)) {
                const collectForm = collectFormData('#change_data_form');
                const formData = {
                    ...(collectForm.first_name && { first_name: collectForm.first_name }),
                    ...(collectForm.second_name && { second_name: collectForm.second_name }),
                    ...(collectForm.display_name && { display_name: collectForm.display_name }),
                    ...(collectForm.email && { email: collectForm.email }),
                    ...(collectForm.login && { login: collectForm.login }),
                    ...(collectForm.phone && { phone: collectForm.phone }),
                };
                changeUserData(formData);
            }

        }
    }
});

const inputLogin = new Input('div', {
    code: 'login',
    name: 'Логин',
    type: 'text',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('login', target);
        }
    }
})

const inputFirstName = new Input('div', {
    code: 'first_name',
    name: 'Имя',
    type: 'text',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('first_name', target);
        }
    }
})

const inputDisplayName = new Input('div', {
    code: 'display_name',
    name: 'Ник',
    type: 'text',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('display_name', target);
        }
    }
})

const inputSecondName = new Input('div', {
    code: 'second_name',
    name: 'Фамилия',
    type: 'text',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('second_name', target);
        }
    }
})

const inputPhone = new Input('div', {
    code: 'phone',
    name: 'Телефон',
    type: 'tel',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('phone', target);
        }
    }
})

const inputEmail = new Input('div', {
    code: 'email',
    name: 'Почта',
    type: 'text',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('email', target);
        }
    }
})

const inputForm = [
    inputLogin,
    inputEmail,
    inputFirstName,
    inputDisplayName,
    inputSecondName,
    inputPhone,
];

export default class ChangeDataPage extends Block {
    constructor() {
        super('main', {
            input_form: inputForm,
            back_button: button,
            submit_button: submitButton,
            code_img: 'avatar'
        });
    };
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
