import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});

const { window } = jsdom;

(global as any).window = window;
(global as any).document = window.document;
(global as any).MouseEvent = window.MouseEvent;
(global as any).Node = window.Node;
(global as any).XMLHttpRequest = window.XMLHttpRequest;

class LocalStorageMock {
  private store: Record<string, unknown> = {};

  clear() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: unknown) {
    this.store[key] = value;
  }
  removeItem(key: string) {
    delete this.store[key];
  }
}

(global as any).localStorage = new LocalStorageMock();
