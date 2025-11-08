import Block,  { TProps } from './Block.ts';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Block', () => {
  let PageComponent: new (props: TProps) => Block;

  before(() => {
    class Page extends Block {
      constructor(props: TProps) {
        super('div', props);
      }

      render() {
        return this.compile(
          '<span id=\'text\'>{{text}}</span><button id=\'button\'>{{textBtn}}</button>'
        );
      }
    }
    PageComponent = Page;
  });

  it('создание компонента с пропсами', () => {
    const text = 'Tect Text';

    const pageComp = new PageComponent({ text: text });

    const spanText = pageComp.element?.querySelector('#text')?.innerHTML;
    expect(spanText).to.be.eq(text);
  });

  it('проверка корректного добавления аттрибутов', () => {
    const attr = {
      id: 'test-id'
    };

    const pageComp = new PageComponent({ attr });
    const testAttr = pageComp.element?.getAttribute('id');

    expect(testAttr).to.be.eq(attr.id);
  });

  it('обновление свойств', () => {
    const pageComp = new PageComponent({ text: 'Text' });

    const newProp = 'create new text';

    pageComp.setProps({ text: newProp });
    const spanText = pageComp.element?.querySelector('#text')?.innerHTML;
    expect(spanText).to.be.eq(newProp);
  });

  it('проверка добавления события', () => {
    const stubHandler = sinon.stub();
    const pageComp = new PageComponent({
      events: {
        click: stubHandler
      }
    });
    pageComp.element?.dispatchEvent(new MouseEvent('click'));
    expect(stubHandler.calledOnce).to.be.true;
  });

  it('проверка корректного скрытия компонента', () => {
    const pageComp = new PageComponent({});

    pageComp.hide();

    expect(pageComp.element?.style.display).to.equal('none');
  });
});
