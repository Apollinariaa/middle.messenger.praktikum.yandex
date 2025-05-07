import Button from '../../../components/Button/index';
import UserInfoItem from '../../../components/UserInfoItem/index';
import ProfileTemplate from './ProfileTemplate';
import Page from '../../../services/Page';

export default class ProfilePage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Вернуться назад',
            attr: { class: 'style-weigth'}
        });

        const changeDataButton = new Button('button',{
            children: 'Изменить данные',
            attr: { class: 'style-margin'}
        });

        const changePasswordButton = new Button('button',{
            children: 'Изменить пароль',
            attr: { class: 'style-margin'}
        });

        const logoutButton = new Button('button',{
            children: 'Выйти',
            attr: { class: 'color-red style-margin'}
        });

        const actionButtons = [changeDataButton, changePasswordButton, logoutButton];

        const inputLogin = new UserInfoItem('div', {
            value: 'login',
            name: 'Логин',
        })

        const inputPassword = new UserInfoItem('div', {
            value: 'password',
            name: 'Пароль',
        })

        const inputFirstName = new UserInfoItem('div', {
            value: 'first_name',
            name: 'Имя',
        })

        const inputSecondName = new UserInfoItem('div', {
            value: 'second_name',
            name: 'Фамилия',
        })

        const inputPhone = new UserInfoItem('div', {
            value: 'phone',
            name: 'Телефон',
        })

        const inputEmail = new UserInfoItem('div', {
            value: 'email',
            name: 'Почта',
        })

        const inputForm = [
            inputLogin,
            inputEmail,
            inputFirstName,
            inputSecondName,
            inputPhone,
            inputPassword
        ];

        const profilePage = new ProfileTemplate('main',{
            input_form: inputForm,
            back_button: button,
            action_buttons: actionButtons,
        });

        return profilePage;
    }
}

// Функция для отображения страницы профиля
export const renderProfilePage = (app: HTMLElement | null) => {
    if (app) app.textContent = ``;
    const profilePage = new ProfilePage();
    profilePage.render();
};
