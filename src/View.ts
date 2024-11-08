import { render } from './jsx';
import { generateRandomString } from './helpers/random';
import { Signal, effect } from './signals';
import Vanille from './Vanille';

export class View<P = {}> extends HTMLElement {
  props?: P;
  styleTag?: HTMLStyleElement;
  refs: ProxyConstructor;
  $c: Signal[];
  $scopedId: string;

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

  protected connectedCallback() {
    this.updateRender();
    this.connected();
  }

  disconnectedCallback() {
    this.disconnected();
  }

  adoptedCallback() {
    this.adopted();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.attributeChanged(name, oldValue, newValue);
  }

  public connected() {}

  public disconnected() {}

  public adopted() {}

  public attributeChanged(name, oldValue, newValue) {}

  protected createStyleTag(): void {
    const styleTagContent = `${this.styles()} ${Vanille.getStyles()}`;
    
    if (!styleTagContent) {
      return;
    }
    
    this.styleTag = document.createElement('style');
    effect(() => {
        this.updateStyles();
      });
    this.shadowRoot.appendChild(this.styleTag);
  }

  protected updateStyles(): void {
    const styleTagContent = `${this.styles()} ${Vanille.getStyles()}`;

    const styles = styleTagContent
      .trim()
      .replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);

    this.styleTag.textContent = styles;
  }

  updateRender() {
    // temp, optimize
    this.shadowRoot.innerHTML = '';

    const node = this.render?.(this.props);

    if (node) {
      this.createStyleTag();

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
