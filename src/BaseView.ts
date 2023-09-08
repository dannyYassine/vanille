import { hasJsxTemplate, hasObservableState, hasRefs, hasObservableProps, hasEmit } from './decorators';

@hasJsxTemplate()
@hasObservableProps()
@hasObservableState()
@hasEmit()
export abstract class BaseView extends HTMLElement {
  props: unknown = {};
  state: unknown = {};
  refs: typeof Proxy;
  shadowDom: ShadowRoot;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    Object.defineProperty(this, 'refs', {
      get(): typeof Proxy {
        return new Proxy(
          {},
          {
            get: (_, prop: string) => {
              return this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${prop}]`);
            }
          }
        ) as typeof Proxy;
      }
    });
  }

  abstract render(): any;

  setBindings() {}

  protected connectedCallback() {
    this.buildProps();
    this.buildState();
    this.renderTemplate();
    this.setBindings();
  }

  removeAllChildren() {
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.lastChild);
    }
  }

  update() {
    this.removeAllChildren();
    this.renderTemplate();
  }
}
