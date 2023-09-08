import { render } from '../jsx';
import { makeID } from '../helpers/makeId';

export function hasJsxTemplate(): (target: Function) => void {
  return (target: Function) => {
    target.prototype.renderTemplate = function () {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      if (!this.$scopedId) {
        this.$scopedId = makeID();
      }
      const node = this.render?.();

      if (typeof node === 'string' && node.startsWith('<slot')) {
        node.replace('<slot', `<slot ${this.$scopedId}`);
        this.shadowRoot.innerHTML = node;
        return;
      }

      const style = document.createElement('style');
      let styles = this.styles?.() ?? '';
      if (styles !== '') {
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
