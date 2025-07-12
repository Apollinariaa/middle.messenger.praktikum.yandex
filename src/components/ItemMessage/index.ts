import Block from '../../services/Block';
import './ItemMessage.scss';
import { template } from './ItemMessage';

export default class ItemMessage extends Block {
    render() {
        return this.compile(template, { attr: {class: 'item-message'}});
    }
}
