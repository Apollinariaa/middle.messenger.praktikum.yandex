import Block from '../../services/Block';
import './InputMessage.scss';

export default class InputMessage extends Block {
    render() {
        return this.compile('{{{children}}}', {attr: {
            class: 'message-input',
            type: 'text',
            placeholder: 'Cообщение...'
        }});
    }
}
