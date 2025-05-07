import Block from "../../services/Block";
import { template } from "./Registration";

export default class RegistrationTemplatePage extends Block {
    render() {
        return this.compile(template, {attr: {class: 'auth-block block-blue'}});
    }
}
