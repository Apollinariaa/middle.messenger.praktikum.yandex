import Block from '../../services/Block.ts';
import { template } from './TemplateErrorPage.ts';
//import './TemplateErrorPage.scss';

export default class TemplateErrorPage extends Block {
    render() {
        return this.compile(template, {attr: {class: 'error-page'}});
    }
}
