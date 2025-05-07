import Block from "../../services/Block";
import './SubmitButton.scss';

export default class SubmitButton extends Block {
    render() {
        return this.compile(`{{{ children }}}`, { attr: {class: 'submit-button'}});
    }
}
