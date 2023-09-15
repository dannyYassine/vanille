"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasEmit = void 0;
function hasEmit() {
    return (target) => {
        target.prototype.emit = function (name, data) {
            setTimeout(() => {
                let options = { bubbles: true };
                if (data) {
                    options = { ...options };
                    if (typeof data === 'object') {
                        options.detail = { ...data };
                    }
                    else {
                        options.detail = data;
                    }
                }
                this.dispatchEvent(new CustomEvent(name, options));
            }, 0);
        };
    };
}
exports.hasEmit = hasEmit;
//# sourceMappingURL=hasEmit.js.map