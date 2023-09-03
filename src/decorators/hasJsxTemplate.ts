import { hasShadowDom } from "./hasShadowDom";
import { render } from "../jsx";

export function hasJsxTemplate(): (target: Function) => void {
    return (target: Function) => {
      hasShadowDom()(target);
      target.prototype.renderTemplate = function () {
        const node = this.render?.();
        let style = document.createElement('style');
        if (!style) {
          if (!this.$scopedId) {
            this.$scopedId = makeid();
          }
          style = style.replaceAll(/^\s+(\S+)(h*.*\{$)/gm, `$1[${this.$scopedId}]$2 `);
        }
        style.textContent =
          this.globalStylesheet?.() + this.styles?.();
        this.shadowDom?.appendChild(style);
  
        if (node) {
          this.shadowDom?.appendChild(render(node, window.document));
        }
      };
    };
  }
  
  function makeid(length = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}