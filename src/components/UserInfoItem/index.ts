import Block from '../../services/Block';
import { template } from './UserInfoItem';
import './UserInfoItem.scss';

export default class UserInfoItem extends Block {
    render() {
        return this.compile(template, {class: 'block-info'});
    }
};

