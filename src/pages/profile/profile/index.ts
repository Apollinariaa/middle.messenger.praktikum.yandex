import { logoutUser } from '../../../api/auth/auth';
import Button from '../../../components/Button/index';
import UserInfoItem from '../../../components/UserInfoItem/index';
import Block from '../../../services/Block';
import Router from '../../../services/router/Router';
import { RoutesLinks } from '../../../utils/regex';
import { template } from './Profile';
import '../Profile.scss';
import Store from '../../../services/Store';

const button = new Button('button',{
    children: 'Вернуться назад',
    attr: { class: 'style-weigth'},
    events: {
        click: () => {
            Router.getInstance().go(RoutesLinks.chats);
        },
    }
});

const changeDataButton = new Button('button',{
    children: 'Изменить данные',
    attr: { class: 'style-margin'},
    events: {
        click: () => {
            Router.getInstance().go(RoutesLinks.changeData);
        },
    }
});

const changePasswordButton = new Button('button',{
    children: 'Изменить пароль',
    attr: { class: 'style-margin'},
    events: {
        click: () => {
            Router.getInstance().go(RoutesLinks.changePassword);
        },
    }
});

const logoutButton = new Button('button',{
    children: 'Выйти',
    attr: { class: 'color-red style-margin'},
    events: {
        click: () => logoutUser()
    }
});

const actionButtons = [changeDataButton, changePasswordButton, logoutButton];

export default class ProfilePage extends Block {
    private login: UserInfoItem;
    private first_name: UserInfoItem;
    private display_name: UserInfoItem;
    private second_name: UserInfoItem;
    private phone: UserInfoItem;
    private email: UserInfoItem;

    constructor() {
        super('main', {});
        this.login = new UserInfoItem('div', {
            value: Store.getState().user?.login  || '',
            name: 'Логин',
        })
        this.first_name = new UserInfoItem('div', {
            value: Store.getState().user?.first_name  || '',
            name: 'Имя',
        })
        this.display_name = new UserInfoItem('div', {
            value: Store.getState().user?.display_name  || '',
            name: 'Ник',
        })
        this.second_name = new UserInfoItem('div', {
            value: Store.getState().user?.second_name  || '',
            name: 'Фамилия',
            code: 'second_name',
        })
        this.phone =  new UserInfoItem('div', {
            value: Store.getState().user?.phone  || '',
            code: 'phone',
            name: 'Телефон',
        })
        this.email =  new UserInfoItem('div', {
            value: Store.getState().user?.email  || '',
            name: 'Почта',
            code: 'email',
        })

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
            action_buttons: actionButtons,
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
    }
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'},
            login: this.login,
            first_name: this.first_name,
            display_name: this.display_name,
            second_name: this.second_name,
            phone: this.phone,
            email: this.email
        });
    }
}
