"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.h = void 0;
const makeId_1 = require("./helpers/makeId");
const snakeCase_1 = require("./helpers/snakeCase");
function h(...args) {
    return [...args];
}
exports.h = h;
// @ts-ignore
window.h = h;
function render(jsx, document) {
    // @ts-ignore
    const $scopedId = jsx.$scopedId ?? (0, makeId_1.makeID)();
    const el = jsx[0];
    const attrs = jsx[1];
    const children = (() => {
        delete jsx[0];
        delete jsx[1];
        return [...jsx].filter((a) => !!a);
    })();
    // @ts-ignore
    const $elConstructor = el.name ? customElements.get(`v-${(0, snakeCase_1.snakeCase)(el.name)}`) : null;
    const $el = $elConstructor
        ? new $elConstructor()
        : document.createElement(el);
    // @ts-ignore
    $el.props = {};
    if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            if (key.startsWith('on') && value instanceof Function) {
                if (key in $el) {
                    // @ts-ignore
                    $el[key.toLowerCase()] = value;
                }
                else {
                    const event = key.substring(2);
                    $el.addEventListener(event, value);
                }
                return;
            }
            $el.props[camelize(key)] = value;
            try {
                $el.setAttribute(key, value);
            }
            catch (e) { }
        });
    }
    $el.$scopedId = $scopedId;
    $el.setAttribute($el.$scopedId, '');
    if (children.length) {
        children.forEach((child) => {
            if (['string', 'number'].includes(typeof child)) {
                return $el.append(child);
            }
            child.$scopedId = $el.$scopedId;
            if ('nodeName' in child || child instanceof HTMLElement) {
                return $el.append(child);
            }
            $el.appendChild(render(child, document));
        });
    }
    return $el;
}
exports.render = render;
function camelize(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
        .replace('-', '');
}
//# sourceMappingURL=jsx.js.map