import { hasJsxTemplate, hasObservableState, hasObservableProps, hasEmit } from './decorators';
import { makeID } from './helpers/makeId';

@hasJsxTemplate()
@hasObservableProps()
@hasObservableState()
@hasEmit()
export abstract class BaseView extends HTMLElement {
  refs: typeof Proxy;
  $scopedId: string;
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.$scopedId = makeID()
    // @ts-ignore
    this.props = {};
    // @ts-ignore
    this.state = {};
    this.refs = new Proxy(
      {},
      {
        get: (_, prop: string) => {
          return this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${prop}]`);
        }
      }
    ) as typeof Proxy;
  }

  abstract render(): any;

  setBindings() {}

  protected connectedCallback() {
    // @ts-ignore
    this.buildProps();
    // @ts-ignore
    this.buildState();
    // @ts-ignore
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
    // @ts-ignore
    this.renderTemplate();
  }
}
