import { hasShadowDom } from "./hasShadowDom";
import { render } from "../jsx";

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
  