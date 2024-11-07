import { render } from './jsx';
import { generateRandomString } from './helpers/random';
import { effect } from './signals';
import './style.css';

export class View<P extends Record<string, unknown>> extends HTMLElement {
  props?: P;
  styleTag: StyleSheet;

  constructor(mode = 'open') {
    super();
    this.$c = [];
    this.attachShadow({ mode: mode });
    this.refs = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          return this.shadowRoot.querySelector(
            `[${this.$scopedId}][ref=${prop}]`
          );
        },
      }
    ) as typeof Proxy;
  }

  styles(): string {
    return '';
  }

  def(): object {
    const define = (accum, key) => {
      const val = this[key];
      if (typeof val === 'function') {
        accum[key] = val.bind(this);
      } else {
        accum[key] = val;
      }
      return accum;
    };
    const accum = Object.getOwnPropertyNames(this).reduce(define, {});
    return Object.getOwnPropertyNames(this.__proto__).reduce(define, accum);
  }

  bindings() {}

  protected connectedCallback() {
    this.updateRender();
  }

  protected link(): string {
    return '/src/style.css';
  }

  protected createLink(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = this.link();

    this.shadowRoot.appendChild(link);
  }

  protected createStyle(): void {
    if (!this.styles()) {
      return;
    }

    this.styleTag = document.createElement('style');
    this.updateStyles();
    this.shadowRoot.appendChild(this.styleTag);
    effect(() => {
      this.updateStyles();
    });
  }

  protected updateStyles(): void {
    const styles = this.styles()
      .trim()
      .replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);

    this.styleTag.textContent = styles;
  }

  updateRender() {
    const node = this.render?.(this.props);

    if (node) {
      this.createLink();
      this.createStyle();
      // for root only
      if (!this.$scopedId) {
        this.$scopedId = `v${generateRandomString(8)}`;
        this.setAttribute(this.$scopedId, '');
      }
      node.$scopedId = this.$scopedId;
      const content = render(node, window.document);
      this.shadowRoot
        ? this.shadowRoot.appendChild(content)
        : this.appendChild(content);
    }

    this.bindings();
  }

  emit(name: string, data?: unknown) {
    setTimeout(() => {
      let options: { bubbles: boolean; detail?: unknown } = { bubbles: true };
      if (data) {
        options = { ...options };
        if (typeof data === 'object') {
          options.detail = { ...data };
        } else {
          options.detail = data;
        }
      }
      this.dispatchEvent(new CustomEvent(name, options));
    }, 0);
  }
}
customElements.define('v-view', View);
