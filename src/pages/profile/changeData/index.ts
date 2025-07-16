import Button from '../../../components/Button/index';
import SubmitButton from '../../../components/SubmitButton/index';
import Input from '../../../components/Input/index';
import Block from '../../../services/Block';
import { template } from './ChangeData';
import { collectFormData, validateForOptionalFieldsInputs, validateForm } from '../../../utils/validation';
import { changeUserData } from '../../../api/user/user';
import { RoutesLinks } from '../../../utils/regex';
import Router from '../../../services/router/Router';
import Store from '../../../services/Store';

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
    value: Store.getState().user?.login || '',
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
    value: Store.getState().user?.first_name || '',
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
    value: Store.getState().user?.display_name || '',
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
    value: Store.getState().user?.second_name || '',
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
    value: Store.getState().user?.phone || '',
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
    value: Store.getState().user?.email || '',
    events: {
        focusout: (event: Event) => {
            const target = event.target as HTMLInputElement;
            validateForOptionalFieldsInputs('email', target);
        }
    }
})

export default class ChangeDataPage extends Block {
    private login: Input;
    private first_name: Input;
    private display_name: Input;
    private second_name: Input;
    private phone: Input;
    private email: Input;
    private value_avatar_src: string;

    constructor() {
        super('main', {});
        this.login = inputLogin;
        this.first_name = inputFirstName;
        this.display_name = inputDisplayName;
        this.second_name = inputSecondName;
        this.phone = inputPhone;
        this.email = inputEmail;
        this.value_avatar_src = Store.getState().user?.avatar || '';

        Store.on('update', this.updateProps.bind(this));

        this.setProps({
            input_form: [
                this.login,
                this.first_name,
                this.display_name,
                this.second_name,
                this.phone,
                this.email
            ],
            back_button: button,
            submit_button: submitButton,
            code_img: 'avatar',
            value_avatar_src: this.value_avatar_src,
        });
    };
    updateProps(): void {
        const user = Store.getState().user;
        if (!user) return;

        this.login.setProps({ value: user.login });
        this.first_name.setProps({ value: user.first_name });
        this.display_name.setProps({ value: user.display_name });
        this.second_name.setProps({ value: user.second_name });
        this.phone.setProps({ value: user.phone });
        this.email.setProps({ value: user.email });
        this.value_avatar_src = user.avatar;
    }
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
