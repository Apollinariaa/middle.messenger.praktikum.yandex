import { expect } from 'chai';
import sinon from 'sinon';
import Router from './router/Router.ts';
import {Route} from './router/Route.ts';
import NotFoundPage from '../pages/404/index.ts'
import Block, { type TProps } from './Block.ts';

describe('Router', () => {
  let PageComponent: new (props: TProps) => Block;
  
  before(() => {
    class Page extends Block {
      constructor(props: TProps) {
        super('div', props);
      }

      render() {
        return this.compile(
          '<span id=\'test-text\'>{{text}}</span><button id=\'test-button\'>{{textBtn}}</button>'
        );
      }
    }
    PageComponent = Page;
  });

  it('должен рендерить правильный Route при переходе', () => {
    const router = new Router('#app');
    const renderSpy = sinon.spy(Route.prototype, 'render');
    const text = 'Hello';

    const pageComp = new PageComponent({ text: text });

    router.use('/test', pageComp);
    router.start();
    router.go('/test');

    expect(renderSpy.called).to.be.true;
    renderSpy.restore();
  });
  it('должен отрендерить NotFoundPage для неизвестного маршрута', () => {
    const router = new Router('#app');
    const notFoundRenderSpy = sinon.spy(NotFoundPage.prototype, 'render');

    router.go('/unknown-route');
    expect(notFoundRenderSpy.calledOnce).to.be.true;
    notFoundRenderSpy.restore();
  });
  it('обновление pathname', () => {
    const router = new Router('#app');
    const text = 'Hello';
    const pageComp = new PageComponent({ text: text });
    router.use('/abc', pageComp);
    router.start();
    router.go('/abc');

    expect(window.location.pathname).to.eq('/abc');
  });
});
