import Block from '../../services/Block';

export default class ErrorPage extends Block {
    render() {
        return this.compile('{{{children}}}');
    }
}
