"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = exports.h = void 0;
const Engine_1 = require("./Engine");
const random_1 = require("./helpers/random");
const signals_1 = require("./signals");
function h(...args) {
    return [...args];
}
exports.h = h;
// @ts-ignore
window.h = h;
function render(jsx, engine = new Engine_1.Engine()) {
    const [tagName, attrs, ...children] = jsx;
    const $scopedId = jsx.$scopedId ?? `v${(0, random_1.generateRandomString)(8)}`;
    const $el = engine.buildElement(tagName);
    initializeElement($el, $scopedId);
    if (attrs) {
        applyAttributes($el, attrs);
    }
    if (children.length) {
        children.filter(Boolean).forEach((child) => renderChild($el, child, engine));
    }
    return $el;
}
exports.render = render;
function initializeElement($el, $scopedId) {
    $el.props = {};
    $el.$scopedId = $scopedId;
    $el.setAttribute($scopedId, '');
}
function applyAttributes($el, attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
        if (isEventHandler(key, value)) {
            handleEvent($el, key, value);
            return;
        }
        $el.props[key] = value;
        handleAttributeValue($el, key, value);
    });
}
function isEventHandler(key, value) {
    return key.startsWith('on') && value instanceof Function;
}
function handleEvent($el, key, handler) {
    if (key in $el) {
        $el[key.toLowerCase()] = handler;
    }
    else {
        $el.addEventListener(key, handler);
    }
}
function handleAttributeValue($el, key, value) {
    if (typeof value === 'function') {
        handleComputedValue($el, key, value);
    }
    else if (value instanceof signals_1.Signal) {
        handleSignalValue($el, key, value);
    }
    else {
        safeSetAttribute($el, key, value);
    }
}
function handleComputedValue($el, key, value) {
    const $c = (0, signals_1.computed)(value.bind($el));
    if (!$el.$c)
        $el.$c = [];
    $el.$c.push($c);
    $c.subscribe((val) => {
        if (key in $el) {
            $el[key] = val;
        }
        safeSetAttribute($el, key, val);
    });
    safeSetAttribute($el, key, $c.get());
}
function handleSignalValue($el, key, signal) {
    signal.subscribe((val) => {
        if (key in $el) {
            $el[key] = val;
        }
        safeSetAttribute($el, key, val);
    });
    safeSetAttribute($el, key, signal.get());
}
function safeSetAttribute($el, key, value) {
    try {
        if (key in $el) {
            $el[key] = value;
        }
        $el.setAttribute(key, value);
    }
    catch (e) {
        // Silently handle invalid attribute values
    }
}
function renderChild($el, child, engine) {
    if (isNestedArray(child)) {
        child.forEach((c) => renderChild($el, c, engine));
        return;
    }
    if (isPrimitive(child)) {
        $el.append(child);
        return;
    }
    if (child instanceof signals_1.Signal) {
        renderSignalChild($el, child);
        return;
    }
    if (typeof child === 'function') {
        renderComputedChild($el, child);
        return;
    }
    if (isHTMLElement(child)) {
        child.$scopedId = $el.$scopedId;
        $el.append(child);
        return;
    }
    child.$scopedId = $el.$scopedId;
    $el.appendChild(render(child, engine));
}
function isNestedArray(child) {
    return (Array.isArray(child) &&
        ((typeof child[0] === 'string' && typeof child[1] !== 'object') ||
            Array.isArray(child[0])));
}
function isPrimitive(child) {
    return ['string', 'number'].includes(typeof child);
}
function isHTMLElement(child) {
    return 'nodeName' in child || child instanceof HTMLElement;
}
function renderSignalChild($el, signal) {
    const uuid = (0, random_1.generateRandomString)(8);
    $el.insertAdjacentHTML('beforeend', `<!--${uuid}-->${signal.get()}<!--${uuid}-->`);
    signal.subscribe((newValue) => {
        updateSignalContent($el, uuid, newValue);
    });
}
function renderComputedChild($el, f) {
    const uuid = (0, random_1.generateRandomString)(8);
    const $c = (0, signals_1.computed)(f);
    if (!$el.$c)
        $el.$c = [];
    $el.$c.push($c);
    $el.insertAdjacentHTML('beforeend', `<!--${uuid}-->${$c.get()}<!--${uuid}-->`);
    $c.subscribe((newValue) => {
        updateSignalContent($el, uuid, newValue);
    });
}
function updateSignalContent($el, uuid, newValue) {
    const range = new Range();
    const [startComment, endComment] = findCommentPair($el, uuid);
    if (startComment && endComment) {
        range.setStartAfter(startComment);
        range.setEndBefore(endComment);
        range.deleteContents();
        range.insertNode(document.createTextNode(newValue));
    }
}
function findCommentPair($el, uuid) {
    const comments = Array.from($el.childNodes).filter((node) => node.nodeType === 8 && node.textContent === uuid);
    return [comments[0], comments[1]];
}
//# sourceMappingURL=jsx.js.map