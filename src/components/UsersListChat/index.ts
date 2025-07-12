import Block from '../../services/Block';
import './UsersListChat.scss';

export default class UsersListChat extends Block {
    render() {
        return this.compile('{{ text }}  {{{del_button}}}', { attr: {class: 'user-list-chat'}});
    }
}
 