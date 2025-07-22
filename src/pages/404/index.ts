import TemplateErrorPage from '../../components/TemplateErrorPage/index.ts';
import Button from '../../components/Button/index.ts';
import Block from '../../services/Block.ts';
import Router from '../../services/router/Router.ts';
import { RoutesLinks } from '../../utils/regex.ts';

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
