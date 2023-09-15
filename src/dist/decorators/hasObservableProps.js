"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasObservableProps = void 0;
const Observable_1 = require("../Observable");
function hasObservableProps() {
    return (target) => {
        target.prototype.buildProps = function () {
            this.props = (0, Observable_1.observable)(this.props);
        };
    };
}
exports.hasObservableProps = hasObservableProps;
//# sourceMappingURL=hasObservableProps.js.map