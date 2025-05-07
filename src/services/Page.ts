import { renderDOM } from "../utils/renderDOM";

class Page {
    public element;

    constructor() {
        this.element = document.createElement('main');
    }

    render() {
        const contentPage = this.getContent();
        renderDOM('app', contentPage);
    }

    getContent() {}
}
export default Page;
