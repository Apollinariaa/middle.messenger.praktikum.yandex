import Block from "../../services/Block";
import { template } from "./Auth";

export default class AuthTemplate extends Block {
    render() {
        return this.compile(template, {attr: {class: 'profile-block block-blue'}});
    }
}
