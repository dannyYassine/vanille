export interface ObservableEvent {
  $$listeners: { string: unknown };
  $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}

export type Observable<T> = T & ObservableEvent;

export function observable<T>(data: T): Observable<T> | null {
  const obj = isArray(data) ? wrapArrayMethods([]) : {};
  initialSetup(obj);

  mapObject(obj, data);

  return buildNode(obj);
}

function mapObject(obj, data) {
  Object.entries(data).forEach(([key, value]) => {
    if (value && isObject(value) && !('$$listeners' in (value as object))) {
      obj[key] = observable(value);
    } else if (isArray(value)) {
      const valueArray: Array<unknown> = value as Array<unknown>;
      if (valueArray.length) {
        const val = valueArray[0];
        if (isObject(val) && !('$$listeners' in (val as object))) {
          const obArray = observable(valueArray.map((val) => observable(val)));
          obj[key] = obArray;
        } else if (!isObject(val) && !isArray(val)) {
          obj[key] = observable(value);
        } else {
          obj[key] = value;
        }
      } else {
        const obArray = [];
        initialSetup(obArray);
        add$on(obArray);

        obj[key] = obArray;
      }
    } else {
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

function add$on(data: Object) {
  Object.defineProperty(data, '$on', {
    enumerable: false,
    configurable: false,
    writable: false,
    value(event: string, cb: () => void) {
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
    newObject.$$listeners[key] = [...(value as unknown[])];
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

function wrapArrayMethods(newArray) {
  newArray.push = ((f) =>
    function push() {
      var ret = f.apply(this, arguments);
      this.$$listeners['push'].forEach((cb) => {
        cb([...arguments], this, this);
      });
      return ret;
    })(newArray.push);

  newArray.pop = ((f) =>
    function pop() {
      var ret = f.apply(this, arguments);
      this.$$listeners['pop'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.pop);

  newArray.shift = ((f) =>
    function shift() {
      var ret = f.apply(this, arguments);
      this.$$listeners['shift'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.shift);

  newArray.unshift = ((f) =>
    function unshift() {
      var ret = f.apply(this, arguments);
      this.$$listeners['unshift'].forEach((cb) => {
        cb([...arguments], this, this);
      });
      return ret;
    })(newArray.unshift);

  newArray.splice = ((f) =>
    function splice() {
      var ret = f.apply(this, arguments);
      this.$$listeners['splice'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.splice);

  newArray.sort = ((f) =>
    function sort() {
      var ret = f.apply(this, arguments);
      this.$$listeners['sort'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.sort);

  newArray.reverse = ((f) =>
    function reverse() {
      var ret = f.apply(this, arguments);
      this.$$listeners['reverse'].forEach((cb) => {
        cb(ret, this, this);
      });
      return ret;
    })(newArray.reverse);

  return newArray;
}
