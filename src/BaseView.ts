import { hasJsxTemplate, hasObservableState, hasRefs, hasObservableProps, hasEmit } from './decorators';

@hasRefs()
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
