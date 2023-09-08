import { render } from '../jsx';
import { makeID } from '../helpers/makeId';

export function hasJsxTemplate(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.renderTemplate = function () {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      const node = this.render?.();
      const style = document.createElement('style');
      let styles = this.styles?.() ?? '';
      if (styles !== '') {
        if (!this.$scopedId) {
          this.$scopedId = makeID();
        }
        styles = styles.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);
      }
      style.textContent = `${this.globalStylesheet?.() ?? ''}${styles}`;
      this.shadowRoot.appendChild(style);

      if (node) {
        node.$scopedId = this.$scopedId;
        this.shadowRoot.appendChild(render(node, window.document));
      }
    };
  };
}
