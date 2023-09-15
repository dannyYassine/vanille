"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasJsxTemplate = void 0;
const jsx_1 = require("../jsx");
function hasJsxTemplate() {
    return (target) => {
        target.prototype.renderTemplate = function () {
            const node = this.render?.();
            const style = document.createElement('style');
            let styles = this.styles?.() ?? '';
            if (styles !== '') {
                styles = styles.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);
            }
            style.textContent = `${this.globalStylesheet?.() ?? ''}${styles}`;
            this.shadowRoot.appendChild(style);
            if (node) {
                node.$scopedId = this.$scopedId;
                this.shadowRoot.appendChild((0, jsx_1.render)(node, window.document));
            }
        };
    };
}
exports.hasJsxTemplate = hasJsxTemplate;
//# sourceMappingURL=hasJsxTemplate.js.map