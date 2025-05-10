import Block from '../../services/Block';
import { template } from './Chat';
import './Chat.scss'

export default class ChatTemplate extends Block {
    render() {
        return this.compile(template);
    }
}
