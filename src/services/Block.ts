import { v4 as MakeID } from 'uuid';
import EventBus from './EventBus.ts';
import Handlebars from 'handlebars';

export type EventHandler = (event: Event) => void;

export type TChildren = Record<string, Block>;
export type TLists = Record<string, Block[]>;
export type TProps = {
    [key: string]: unknown;
    attr?: Record<string, string>;
    events?: Record<string, EventHandler>;
}

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _element: HTMLElement | null = null;
  private _lists: TLists = {};
  private _meta: { tagName: string; props: TProps } | null = null;
  protected _props: TProps;
  private _children: TChildren;
  private _setUpdate: boolean;

  private _id: string;

  private eventBus: () => EventBus;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
  constructor(tagName = 'div', allProps = {}) {
    const eventBus = new EventBus();

    const {children, props, lists} = this.getChildren(allProps);
    this._id = MakeID();

    this._meta = {
      tagName,
      props,
    };

    this._props = this._makePropsProxy(props) as TProps;
    this._lists = this._makePropsProxy(lists) as TLists;
    this._children = this._makePropsProxy(children) as TChildren;
    this._setUpdate = false;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  getChildren(allProps: TProps) {
    const children: TChildren = {};
    const props: TProps = {};
    const lists: TLists = {};

    Object.keys(allProps).forEach((key) => {
        const value = allProps[key];

        if (value instanceof Block) {
            children[key] = value;
        } else if (Array.isArray(value)) {
            lists[key] = value;
        } else {
            props[key] = value;
        }
    });

    return { children, props, lists };
  }

  compile(template: string, props?: TProps) {
    const newProps = {
      ...this._props,
      attr: {
        ...props?.attr,
        ...this._props?.attr,
        ...(props?.attr?.class && this._props?.attr?.class &&
        {class: props.attr?.class + ' ' + this._props?.attr?.class}),
      },
    };

    this._props = newProps;

    const propsAndStubs = typeof(props) === 'undefined' ? {...this._props} : {...newProps} as Record<string, unknown>;;

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="child_${child._id}"></div>`
    });

    Object.entries(this._lists).forEach(([key, child]) => {
      child.forEach((i) => {
        if (propsAndStubs[key] === undefined)  {
          propsAndStubs[key] = `<${i._meta?.tagName} data-id="list_${i._id}"></${i._meta?.tagName}>`
        } else {
          propsAndStubs[key] += `<${i._meta?.tagName} data-id="list_${i._id}"></${i._meta?.tagName}>`;
        }
      });
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment?.content.querySelector(`[data-id="child_${child._id}"]`);
      if (stub && child) {
        const content = child.getContent();
        if (content) stub.replaceWith(content);
      }
    });

    Object.values(this._lists).forEach((child) => {
      child.forEach((item) => {
        const stub = fragment?.content.querySelector(`[data-id="list_${item._id}"]`);
        if (!stub) return;

        const listContent = this._createDocumentElement('template') as HTMLTemplateElement;

        const content = item.getContent();
        if (content) listContent.content.append(content);

        stub.replaceWith(listContent.content);
      })
    });

    return fragment.content;
  }

  _createResources() {
    const tagName = this._meta?.tagName;
    if (tagName) this._element = this._createDocumentElement(tagName);
  }


  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this._render();
  }

  componentDidUpdate(): boolean {
    return true;
  }

  setProps = (newProps: TProps) => {
    if (!newProps) {
      return;
    }
    this._setUpdate = false;

    const {children, props, lists } = this.getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
      this._setUpdate = true;
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
      this._setUpdate = true;
    }

    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
      this._setUpdate = true;
    }

    if (this._setUpdate) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
      this._setUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    if (this._element && block) {
      this._element.innerHTML = '';
      this._element.appendChild(block);
    }
    this.addAttribute();
    this.addEvents();
  }

  render(): DocumentFragment | null { return null };

  addAttribute() {
    const {attr = {}} = this._props;

    Object.entries(attr).forEach(([key, value]) => {
      if (typeof key === 'string' && typeof value === 'string') {
        this._element?.setAttribute(key, value);
      }
    })
  }

  addEvents() {
    const { events = {}} = this._props;

    if (typeof events === 'object' && events !== null) {
        Object.keys(events).forEach((eventName) => {
            const eventHandler = events[eventName];

            if (typeof eventHandler === 'function') {
              this._element?.addEventListener(eventName, eventHandler);
            }
        });
    }

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    })
  }

  removeEvents() {
    const {events = {}} = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    })
  }

  getContent(): HTMLElement | null {
    return this._element;
  }

  _makePropsProxy(props: TChildren | TLists | TProps) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }

        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },

    });
  };

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  };

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'flex';
    }
  };

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  };
}

export default Block;
