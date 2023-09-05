import { hasShadowDom } from './hasShadowDom';
import { render } from '../jsx';
import { makeID } from '../helpers/makeId';

export function hasJsxTemplate(): (target: Function) => void {
  return (target: Function) => {
    hasShadowDom()(target);
    target.prototype.renderTemplate = function () {
      const node = this.render?.();
      const style = document.createElement('style');
      let styles = this.styles?.() ?? '';
      if (styles !== '') {
        if (!this.$scopedId) {
          this.$scopedId = makeID();
        }
        styles = styles.replaceAll(/^\s+(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);
      }
      style.textContent = `${this.globalStylesheet?.() ?? ''}${styles}`;
      this.shadowDom?.appendChild(style);

      if (node) {
        node.$scopedId = this.$scopedId;
        this.shadowDom?.appendChild(render(node, window.document));
      }
    };
  };
}
