import { spy } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport.ts';

describe('HTTPTransport', () => {
  const url = 'https://example.com/test';

  const openSpy = spy();
  const sendSpy = spy();

  beforeEach(() => {
    const originalOpen = window.XMLHttpRequest.prototype.open;

    window.XMLHttpRequest.prototype.open = function (
      method: string,
      url: string | URL,
    ) {
      openSpy(method, url);
      originalOpen.apply(this, [method, url] as unknown as Parameters<
        typeof window.XMLHttpRequest.prototype.open
      >);
    };
    window.XMLHttpRequest.prototype.send = function (...args) {
      sendSpy(...args);
      this.onload?.({ target: this } as unknown as ProgressEvent<EventTarget>);
    };
  });

  afterEach(() => {
    openSpy.resetHistory();
    sendSpy.resetHistory();
  });

  it('GET запрос', async () => {
    await HTTPTransport.get(url);

    expect(openSpy.calledWith('GET', url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it('PUT запрос', async () => {
    await HTTPTransport.put(url);

    expect(openSpy.calledWith('PUT', url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it('POST запрос', async () => {
    await HTTPTransport.post(url);

    expect(openSpy.calledWith('POST', url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it('DELETE запрос', async () => {
    await HTTPTransport.delete(url);

    expect(openSpy.calledWith('DELETE', url)).to.be.true;
    expect(sendSpy.calledWith()).to.be.true;
  });

  it('отправление гет данных', async () => {
    await HTTPTransport.get(url, { data: { test: 'test', code: 123 } });

    expect(openSpy.calledWith('GET', `${url}?test=test&code=123`)).to.be
      .true;
    expect(sendSpy.calledWith()).to.be.true;
  });
});
