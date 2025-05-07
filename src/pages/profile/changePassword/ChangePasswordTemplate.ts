
import Block from "../../../services/Block";
import { template } from "./ChangePassword";
import '../Profile.scss';

export default class ChangePasswordTemplate extends Block {
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
