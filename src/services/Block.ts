import EventBus from './EventBus';
import Handlebars from 'handlebars';

type EventHandler = (event: Event) => void;

interface Props {
    [key: string]: unknown;
    attr?: Record<string, string>;
    events?: Record<string, EventHandler>;
}

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;
  private _lists: Record<string, unknown[]> = {};
  private _meta: { tagName: string; props: Props } | null = null;
  private _props: Props;
  private _children: Record<string, Block>;


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

    this._meta = {
      tagName,
      props,
    };

    this._props = this._makePropsProxy(props);
    this._lists = this._makePropsProxy(lists);
    this._children = this._makePropsProxy(children);

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

  getChildren(allProps: Props) {
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};
    const lists: Record<string, unknown[]> = {};

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


  compile(template: string, props?: any) {
    const propsAndStubs = typeof(props) == 'undefined'
      ? {...this._props} : {
        ...props,
        ...this._props,
        attr: {
          ...props?.attr,
          ...this._props?.attr,
          ...(props?.attr?.class && this._props?.attr?.class &&
          {class: props.attr?.class + ' ' + this._props?.attr?.class}),
        },
      };

    this._props = propsAndStubs;

    Object.keys(this._children).forEach((key: string) => {
      propsAndStubs[key] = `<div data-id="child"></div>`
    })

    Object.keys(this._lists).forEach((key: string) => {
      propsAndStubs[key] = `<div data-id="list"></div>`
    })

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child: any) => {
      const stub = fragment?.content.querySelector(`[data-id="child"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this._lists).forEach(([_, child]) => {
      const stub = fragment?.content.querySelector(`[data-id="list_"]`);
      if (!stub) {
        return;
      }

      const listContent = this._createDocumentElement('template') as HTMLTemplateElement;

      child.forEach((item) => {
        if (item instanceof Block) {
          const content = item.getContent();
          if (content) {
            listContent.content.append(content);
          }
        } else {
          listContent.content.append(`${item}`);
        }
      })


      stub.replaceWith(listContent.content);
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

  setProps = (newProps: Props) => {
    if (!newProps) {
      return;
    }

    const {children, props, lists } = this.getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
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

  // to do: поправить в следующем спринте тип any
  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target: any , prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: unknown) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },

    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = "block";
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = "none";
    }
  }
}

export default Block;
