
import { renderAuthPage } from './src/pages/auth/index';
import { renderServerErrorPage } from './src/pages/500/index';
import { renderChatPage } from './src/pages/chat/index';
import { renderNotFoundPage } from './src/pages/404/index';
import { renderChangeDataPage } from './src/pages/profile/changeData/index';
import  { renderChangePasswordPage } from './src/pages/profile/changePassword/index';
import { renderRegistrationPage } from './src/pages/registration/index';
import { renderProfilePage } from './src/pages/profile/profile/index';
import './styles.scss';

const app = document.getElementById('app');

// Функция для отображения главной страницы
const renderHomePage = () => {
    if (app) {
        const nav = document.createElement('nav');

        const buttons = [
            { text: '404 страница', id: 'not_found',},
            { text: '500 страница', id: 'server_error'},
            { text: 'Авторизация', id: 'auth'},
            { text: 'Регистрация', id: 'registration' },
            { text: 'Профиль',  id: 'profile' },
            { text: 'Изменение данных', id: 'change_data_page' },
            { text: 'Изменение пароля', id: 'change_password_page'},
            { text: 'Чат', id: 'chat'},
        ];

        buttons.forEach(button => {
            const btn = document.createElement('button');
            btn.id = button.id;
            btn.textContent = button.text;
            nav.appendChild(btn);
        });

        app.appendChild(nav);
    }

    document.getElementById('not_found')?.addEventListener('click', () => {
        history.pushState('Ошибка 400', '/400');
        renderNotFoundPage(app);
    });

    document.getElementById('server_error')?.addEventListener('click', () => {
        history.pushState('Ошибка 500', '/500');
        renderServerErrorPage(app);
    });

    document.getElementById('auth')?.addEventListener('click', () => {
        history.pushState('Авторизация', '/auth');
        renderAuthPage(app);
    });

    document.getElementById('registration')?.addEventListener('click', () => {
        history.pushState('Регистрация', '/registration');
        renderRegistrationPage(app);
    });

    document.getElementById('profile')?.addEventListener('click', () => {
        history.pushState('Профиль', '/profile');
        renderProfilePage(app);
    });

    document.getElementById('change_data_page')?.addEventListener('click', () => {
        history.pushState('Изменение данных', '/profile/change_data');
        renderChangeDataPage(app);
    });

    document.getElementById('change_password_page')?.addEventListener('click', () => {
        history.pushState('Изменение пароля', '/profile/change_password');
        renderChangePasswordPage(app);
    });
    document.getElementById('chat')?.addEventListener('click', () => {
        history.pushState('Чат', '/chat');
        renderChatPage(app);
    });


};

const init = () => {
    renderHomePage();
};

init();
