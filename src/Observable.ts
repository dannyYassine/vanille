export interface ObservableEvent {
  $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}

export type Observable<T> = T & ObservableEvent;

export function observable<T>(data: T): Observable<T> {
  const obj = isArray(data) ? [] : {};
  initialSetup(obj);

  mapObject(obj, data);

  return buildNode(obj);
}

function mapObject(obj, data) {
  Object.entries(data).forEach(([key, value]) => {
    if (isObject(value) && !value?.$$subs) {
      obj[key] = observable(value);
    } else if (isArray(value)) {
      if (value.length) {
        const val = value[0];
        if (isObject(val) && !val.$$subs) {
          const obArray = value.map((val) => observable(val));
          initialSetup(obArray);
          add$on(obArray);
          obj[key] = obArray;
        } else if (!isObject(val) && !isArray(val)) {
          obj[key] = observable(value);
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
    get: (target, prop, receiver) => {
      if (prop === '$$listeners' || prop === '$$subs' || prop === '$on') {
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
  }) as Observable<T>;
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
  Object.entries(obj).forEach(([key, value]) => {
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

function isOnlyObject(value) {
  return typeof value === 'object';
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

  Object.defineProperty(obj, '$$subs', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: {}
  });
}
