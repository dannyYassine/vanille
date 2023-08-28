import { observable } from "./Observable";
import { render } from "./jsx";

export function define(): (target: Function) => void  {
  return (target: Function) => {
    const key = target.name
      .split(/(?=[A-Z])/)
      .join('-')
      .toLowerCase();
    customElements.define(`v-${key}`, target as CustomElementConstructor);
  };
}

export function hasShadowDom(mode: string = 'open'): (target: Function) => void  {
  return (target: Function) => {
    Object.defineProperty(target.prototype, 'shadowDom', {
      get() {
        if (!this._shadowDom) {
          this._shadowDom = this.attachShadow({ mode });;
        }
        return this._shadowDom
      }
    });
  };
}

export function hasJsxTemplate(): (target: Function) => void {
  return (target: Function) => {
    hasShadowDom()(target);
    target.prototype.renderTemplate = function () {
      const node = this.render?.();
      const style = document.createElement('style');
      style.textContent =
        this.globalStylesheet?.() + this.styles?.();
      this.shadowDom?.appendChild(style);

      this.shadowDom?.appendChild(render(node, window.document));
    };
  };
}

export function hasObservableProps(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.buildProps = function () {
      this.props = observable(this.props);
    }
  };
}

export function hasObservableState(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.buildState = function () {
      if (this.data) {
        this.state = observable(this.data?.());
      }
    };
  };
}

export function hasRefs(): (target: Function) => void {
  return (target: Function) => {
    Object.defineProperty(target.prototype, 'refs', {
      get(): typeof Proxy {
        return new Proxy(
          {},
          {
            get: (_, prop: string) => {
              return this.shadowDom?.querySelector(`[ref=${prop}]`);
            }
          }
        ) as typeof Proxy;
      }
    });
  };
}
