"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const snakeCase_1 = require("./../helpers/snakeCase");
function define(name) {
    return (target) => {
        const key = name ?? (0, snakeCase_1.snakeCase)(target.name);
        if (customElements.get(`v-${key}`)) {
            return;
        }
        customElements.define(`v-${key}`, target);
    };
}
exports.define = define;
//# sourceMappingURL=define.js.map