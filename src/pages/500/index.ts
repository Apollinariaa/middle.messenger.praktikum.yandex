import ErrorPage from '../../components/ErrorPage';
import TemplateErrorPage from '../../components/TemplateErrorPage';
import Button from '../../components/Button';
import Page from '../../services/Page';

export default class ServerErrorPage extends Page {
    getContent() {
        const button = new Button('button',{
            children: 'Вернуться к чату',
            attr: { class: 'co-co'}
        }
        );

        const templateErrorPage = new TemplateErrorPage('div', {
            attr: { className: 'error-page'},
            children: button,
            code: '500',
            comment: 'Что-то случилось, но мы уже фиксим'}
        );

        const serverErrorPage = new ErrorPage('main',{
            children: templateErrorPage,
        });

        return serverErrorPage;
    }
}

// Функция для страницы 500
export const renderServerErrorPage = (app: HTMLElement | null) => {
    if (app) app.textContent = ``;
    const serverErrorPage = new ServerErrorPage();
    serverErrorPage.render();
};
