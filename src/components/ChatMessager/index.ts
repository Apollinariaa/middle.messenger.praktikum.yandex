import Block from '../../services/Block';
import './ChatMessager.scss';
import { template } from './ChatMessager';

export default class ChatMessager extends Block {
    render() {
        return this.compile(template, { attr: {class: 'chat-window'}});
    }
}
