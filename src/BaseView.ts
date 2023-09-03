import { hasJsxTemplate, hasObservableState, hasRefs, hasObservableProps } from './decorators';

@hasRefs()
@hasJsxTemplate()
@hasObservableProps()
@hasObservableState()
export abstract class BaseView extends HTMLElement {
  props: unknown = {};
  state: unknown = {};
  refs: typeof Proxy;
  shadowDom: ShadowRoot;

  abstract render(): any;

  // globalStylesheet() {
  //   return `@import url("${window.location.origin}/style.css");`;
  // }

  setBindings() { }

  protected connectedCallback() {
    this.buildProps();
    this.buildState();
    this.renderTemplate();
    this.setBindings();
  }

  removeAllChildren() {
    while (this.shadowDom.firstChild) {
      this.shadowDom.removeChild(this.shadowDom.lastChild);
    }
  }

  update() {
    this.removeAllChildren();
    this.renderTemplate();
  }
}