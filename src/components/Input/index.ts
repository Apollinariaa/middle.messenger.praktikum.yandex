import Block from "../../services/Block";
import { template } from "./Input";
import './Input.scss';

export default class Input extends Block {
    render() {
        return this.compile(template, {class: 'block-input'});
    }
}
