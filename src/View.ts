import { render } from './jsx';
import { generateRandomString } from './helpers/random';
import { Signal, effect } from './signals';
import Vanille from './Vanille';
import { ViewMode } from './ViewMode';

export class View<P = {}> extends HTMLElement {
  props: P;
  styleTag?: HTMLStyleElement;
  refs: ProxyConstructor;
  $c: Signal<unknown>[];
  $scopedId: string;

  constructor(viewMode: ViewMode = ViewMode.OPEN) {
    super();
    this.props = {};
    this.$c = [];
    if ([ViewMode.OPEN, ViewMode.CLOSED].includes(viewMode)) {
        this.attachShadow({ mode: viewMode });
    }
    
    this.refs = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          return this.root.querySelector(
            `[${this.$scopedId}][ref=${prop}]`
          );
        },
      }
    ) as typeof Proxy;
  }

  get root(): ShadowRoot | Element {
    return this.shadowRoot ? this.shadowRoot : this;
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
    this.root.appendChild(this.styleTag);
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
    this.root.innerHTML = '';

    const node = this.render?.(this.props);

    if (node) {
      this.createStyleTag();

      // for root only
      if (!this.$scopedId) {
        this.$scopedId = `v${generateRandomString(8)}`;
        this.setAttribute(this.$scopedId, '');
      }
      node.$scopedId = this.$scopedId;
      const content = render(node);

      this.root.appendChild(content);
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
