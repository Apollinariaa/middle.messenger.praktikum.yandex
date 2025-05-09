import Block from '../../../services/Block';
import { template } from './Profile';
import '../Profile.scss';

export default class ProfileTemplate extends Block {
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
