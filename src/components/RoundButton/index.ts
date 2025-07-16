import Block from '../../services/Block';
import './RoundButton.scss';

export default class RoundButton extends Block {
    render() {
        return this.compile('<img src="/arrow.svg" alt="arrow" class="chat-form__arrow-icon">',
        { attr: {class: 'chat-form__send-button', type: 'submit'}});
    }
}
