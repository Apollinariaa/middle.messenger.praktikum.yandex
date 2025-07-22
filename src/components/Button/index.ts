import Block from '../../services/Block.ts';
//import './Button.scss';

export default class Button extends Block {
    render() {
        return this.compile('{{{ children }}}', { attr: {class: 'nav-button'}});
    }
}
