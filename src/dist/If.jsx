"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const View_1 = require("./View");
class If extends View_1.View {
    static observedAttributes = ['value'];
    attributeChanged() {
        this.updateRender();
    }
    render() {
        if (this.getAttribute('value') && ['true', true, 1].includes(this.getAttribute('value'))) {
            return <slot></slot>;
        }
        return '';
    }
}
exports.If = If;
customElements.define('v-if', If);
//# sourceMappingURL=If.jsx.map