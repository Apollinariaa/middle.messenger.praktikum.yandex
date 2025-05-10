import ErrorPage from '../../components/ErrorPage';
import TemplateErrorPage from '../../components/TemplateErrorPage';
import Button from '../../components/Button';
import Page from '../../services/Page';

export default class NotFoundPage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Вернуться к чату',
            attr: { class: 'co-co'}
        }
        );

        const templateErrorPage = new TemplateErrorPage('div', {
            attr: { className: 'error-page'},
            children: button,
            code: '404',
            comment: 'Ты не туда попал'}
        );

        const notFoundPage = new ErrorPage('main',{
            children: templateErrorPage,
        });

        return notFoundPage;
    }
}

// Функция для страницы 404
export const renderNotFoundPage = (app: HTMLElement | null) => {
    if (app) app.textContent = '';
    const notFoundPage = new NotFoundPage();
    notFoundPage.render();
};
