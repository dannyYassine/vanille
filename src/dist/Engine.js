"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = void 0;
const View_1 = require("./View");
class Engine {
    buildElement(tagName) {
        const isCustomElement = tagName?.name;
        if (isCustomElement) {
            // class component
            if (tagName instanceof Function && tagName.__proto__.name !== '') {
                return this.getElement(tagName);
            }
            // functional component
            if (tagName instanceof Function && tagName.__proto__.name === '') {
                const view = new View_1.View();
                view.render = tagName.bind(view);
                return view;
            }
            return this.createElement(tagName);
        }
        return this.createElement(tagName);
    }
    getElement(tag) {
        let Constructor = window.customElements.get(`v-${tag.name.toLowerCase()}`);
        if (!Constructor) {
            window.customElements.define(`v-${tag.name.toLowerCase()}`, tag);
            Constructor = window.customElements.get(`v-${tag.name.toLowerCase()}`);
        }
        return new Constructor();
    }
    createElement(tagName) {
        return window.document.createElement(tagName);
    }
}
exports.Engine = Engine;
//# sourceMappingURL=Engine.js.map