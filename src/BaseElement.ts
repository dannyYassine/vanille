import { render } from './jsx';
import { observable } from './Observable';

export abstract class BaseView extends HTMLElement {
  props: unknown = {};
  state: unknown = {};
  refs: typeof Proxy;
  shadowDom: ShadowRoot;

  abstract render(): any;

  constructor() {
    super();
    this.shadowDom = this.attachShadow({ mode: 'open' });

    this.refs = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          return this.shadowDom!.querySelector(`[ref=${prop}]`);
        }
      }
    ) as typeof Proxy;
  }

  data() {
    return {};
  }

  styles() {
    return ``;
  }

  setBindings() {}

  protected connectedCallback() {
    this.buildState();
    this.startRender();
    this.setBindings();
  }

  buildState() {
    this.props = observable(this.props);
    this.state = observable(this.data());
  }

  startRender() {
    this.removeAllChildren();
    this.renderTemplate();
  }

  removeAllChildren() {
    while (this.shadowDom.firstChild) {
      this.shadowDom.removeChild(this.shadowDom.firstChild);
    }
  }

  renderTemplate() {
    const node = this.render();

    const style = document.createElement('style');
    style.textContent =
      `@import url("${window.location.origin}/style.css");` + this.styles();
    this.shadowDom?.appendChild(style);

    this.shadowDom?.appendChild(render(node));
  }

  update() {
    this.startRender();
  }

  attributeChanged(prop) {
    this.update();
  }
}
