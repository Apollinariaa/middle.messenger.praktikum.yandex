import TemplateErrorPage from '../../components/TemplateErrorPage';
import Button from '../../components/Button';
import Block from '../../services/Block';
import Router from '../../services/router/Router';
import { RoutesLinks } from '../../utils/regex';

const button = new Button('button',{
    children: 'Вернуться к чату',
    events: {
        click: () => {
            Router.getInstance().go(RoutesLinks.chats);
        },
    }}
);

const templateErrorPage = new TemplateErrorPage('div', {
    attr: { className: 'error-page'},
    children: button,
    code: '404',
    comment: 'Ты не туда попал'}
);

export default class NotFoundPage extends Block {
    constructor() {
        super('main', {
            children: templateErrorPage,
        });
    };
    render() {
        return this.compile('{{{children}}}');
    };
};
