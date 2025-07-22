import { expect } from 'chai';
import sinon from 'sinon';
import Store from './Store.ts';

describe('Store', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('проверка получения дефолтных данных', () => {
    const state = Store.getState();

    expect(state).to.deep.equal({
      user: null,
      chats: undefined,
      messages: [],
      tokenChat: '',
      chatId: null,
    });
  });
});
