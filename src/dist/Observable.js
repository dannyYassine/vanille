"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = void 0;
function observable(data) {
    const obj = isArray(data) ? [] : {};
    initialSetup(obj);
    mapObject(obj, data);
    return buildNode(obj);
}
exports.observable = observable;
function mapObject(obj, data) {
    Object.entries(data).forEach(([key, value]) => {
        if (value && isObject(value) && !('$$listeners' in value)) {
            obj[key] = observable(value);
        }
        else if (isArray(value)) {
            const valueArray = value;
            if (valueArray.length) {
                const val = valueArray[0];
                if (isObject(val) && !('$$listeners' in val)) {
                    const obArray = valueArray.map((val) => observable(val));
                    initialSetup(obArray);
                    add$on(obArray);
                    obj[key] = obArray;
                }
                else if (!isObject(val) && !isArray(val)) {
                    obj[key] = observable(value);
                }
            }
            else {
                const obArray = [];
                initialSetup(obArray);
                add$on(obArray);
                obj[key] = obArray;
            }
        }
        else {
            obj[key] = value;
        }
    });
}
function buildNode(data) {
    add$on(data);
    return new Proxy(data, {
        get: (target, prop) => {
            if (prop === '$$listeners' || prop === '$on') {
                return target[prop];
            }
            const node = target[prop];
            return node;
        },
        set: (obj, prop, value) => {
            const oldValue = obj[prop];
            if (!value.$$listeners && isObject(value)) {
                value = observable(value);
                triggerListeners(obj[prop], value);
            }
            obj[prop] = value;
            if (obj.$$listeners[prop]) {
                obj.$$listeners[prop].forEach((cb) => {
                    cb(value, oldValue, obj);
                });
            }
            return true;
        }
    });
}
function add$on(data) {
    Object.defineProperty(data, '$on', {
        enumerable: false,
        configurable: false,
        writable: false,
        value(event, cb) {
            if (!this.$$listeners[event]) {
                this.$$listeners[event] = [];
            }
            this.$$listeners[event].push(cb);
        }
    });
}
function triggerListeners(obj, newObject) {
    if (!isObject(obj)) {
        return;
    }
    Object.entries(obj.$$listeners).forEach(([key, value]) => {
        if (!newObject.$$listeners[key]) {
            newObject.$$listeners[key] = [];
        }
        newObject.$$listeners[key] = [...value];
    });
    Object.entries(obj).forEach(([key]) => {
        if (obj.$$listeners[key]) {
            if (obj[key] !== newObject[key]) {
                obj.$$listeners[key].forEach((cb) => {
                    cb(newObject[key], obj[key], newObject);
                });
            }
        }
        // const val = obj[key];
        // if (Array.isArray(val)) {
        //   val.forEach(() => {
        //     triggerListeners(val, newObject[key]);
        //   });
        // } else {
        triggerListeners(obj[key], newObject[key]);
        // }
    });
}
function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value);
}
function isArray(value) {
    return typeof value === 'object' && Array.isArray(value);
}
function initialSetup(obj) {
    Object.defineProperty(obj, '$$listeners', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {}
    });
}
//# sourceMappingURL=Observable.js.map