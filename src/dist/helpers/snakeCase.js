"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeCase = void 0;
function snakeCase(name) {
    return name.split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
}
exports.snakeCase = snakeCase;
//# sourceMappingURL=snakeCase.js.map