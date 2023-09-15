"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeID = void 0;
function makeID(length = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return `v${result}`;
}
exports.makeID = makeID;
//# sourceMappingURL=makeId.js.map