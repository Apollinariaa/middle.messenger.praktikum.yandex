import Block from '../../services/Block';
import './ChatItem.scss';
import { template } from './ChatItem';

export default class ChatItem extends Block {
    render() {
        return this.compile(template, { attr: {class: 'chat-info__wrapper'}});
    }
};
