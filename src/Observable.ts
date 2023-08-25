export interface ObservableEvent {
  $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}

export type Observable<T> = T & ObservableEvent;

export class ObservableFactory {
  static listeners = {};
  static subs = {};

  static build<T>(data: T): Observable<T> {
    const obj = {};
    obj.$$listeners = {};
    obj.$$subs = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object' &&
        !Array.isArray(value)) {
          obj[key] =  ObservableFactory.build(value);
        } else if (typeof value === 'object' &&
        Array.isArray(value) && value.length) {
          const val = value[0];
          if (typeof val === 'object' &&
        !Array.isArray(val)) {
          obj[key] = value.map((val)=> ObservableFactory.build(val));
        }
        } else {
          obj[key] = value;
        }
    });

    return ObservableFactory.buildNode(obj);
  }

  static buildNode(data) {
    data.$on = (event, cb) => {
      if (!data.$$listeners[event]) {
        data.$$listeners[event] = [];
      }
     data.$$listeners[event].push(cb);
    };
    
    return new Proxy(data, {
      get: (target, prop, receiver) => {
        if (prop.startsWith("$") && !prop.startsWith("$on")) {
          const event = prop.replace("$", "").toLowerCase();
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
      },
    }) as Observable<T>;
  }
}
