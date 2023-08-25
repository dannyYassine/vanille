export interface ObservableEvent {
  $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}

export type Observable<T> = T & ObservableEvent;

export function observable<T>(data: T): Observable<T> {
  const obj = {};
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

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      obj[key] = observable(value);
    } else if (
      typeof value === 'object' &&
      Array.isArray(value) &&
      value.length
    ) {
      const val = value[0];
      if (typeof val === 'object' && !Array.isArray(val)) {
        obj[key] = value.map((val) => observable(val));
      }
    } else {
      obj[key] = value;
    }
  });

  return buildNode(obj);
}

function buildNode(data) {
  data.$on = (event, cb) => {
    if (!data.$$listeners[event]) {
      data.$$listeners[event] = [];
    }
    data.$$listeners[event].push(cb);
  };

  return new Proxy(data, {
    get: (target, prop, receiver) => {
      if (prop.startsWith('$') && !prop.startsWith('$on')) {
        const event = prop.replace('$', '').toLowerCase();
        target.$$subs[event] = (fn) => {
          target.$$listeners[event] = fn;
        };

        return target.$$subs[event];
      }

      const node = target[prop];

      return node;
    },
    set: (obj, prop, value) => {
      const oldValue = obj[prop];
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
