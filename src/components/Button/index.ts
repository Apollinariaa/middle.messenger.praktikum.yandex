import Block from '../../services/Block';
import './Button.scss';

export default class Button extends Block {
    render() {
        return this.compile('{{{ children }}}', { attr: {class: 'nav-button'}});
    }
}
