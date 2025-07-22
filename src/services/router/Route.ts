import { render } from '../../utils/render.ts';
import Block from '../Block.ts';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

type RouterProps = {rootQuery: string};
// у нас есть url и блок соотвествующий ему
export class Route {
    private _pathname: string;
    private _block: Block;
    private _props: RouterProps;

    constructor(pathname: string, block: Block, props: RouterProps) {
        this._pathname = pathname;
        this._block = block;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (this._block) {
            render(this._props.rootQuery, this._block);
            this._block.show();
            return;
        }
    }
}
