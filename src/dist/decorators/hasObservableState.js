"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasObservableState = void 0;
const Observable_1 = require("../Observable");
function hasObservableState() {
    return (target) => {
        target.prototype.buildState = function () {
            if (this.data) {
                this.state = (0, Observable_1.observable)(this.data?.());
            }
        };
    };
}
exports.hasObservableState = hasObservableState;
//# sourceMappingURL=hasObservableState.js.map