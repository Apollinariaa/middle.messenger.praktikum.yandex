
import Block from "../../../services/Block";
import { template } from "./ChangeData";
import '../Profile.scss';

export default class ChangeDataTemplate extends Block {
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
