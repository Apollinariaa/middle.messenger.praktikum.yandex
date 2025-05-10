import Block from '../../services/Block';
import { template } from './TemplateErrorPage';
import './TemplateErrorPage.scss';

export default class TemplateErrorPage extends Block {
    render() {
        return this.compile(template, {attr: {class: 'error-page'}});
    }
}
