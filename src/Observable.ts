export interface ObservableEvent {
  $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}

export type Observable<T> = T & ObservableEvent;

export class ObservableFactory {
  static listeners = {};
  static subs = {};

  static build<T>(data: T): Observable<T> {
    return ObservableFactory.buildNode(data);
  }

  static buildNode(data) {
    data.__proto__.$on = (event, cb) => {
      ObservableFactory.listeners[event] = cb;
    };
    
    return new Proxy(data, {
      get: (target, prop, receiver) => {
        if (prop.startsWith("$") && !prop.startsWith("$on")) {
          const event = prop.replace("$", "").toLowerCase();
          ObservableFactory.subs[event] = (fn) => {
            ObservableFactory.listeners[event] = fn;
          };

          return ObservableFactory.subs[event];
        }

        const node = target[prop];
        if (typeof node === 'object' &&
        !Array.isArray(node)) {
          return ObservableFactory.buildNode(node);
        }

        // array of obj
        if (typeof node === 'object' &&
        Array.isArray(node) && node.length) {
          const val = node[0];
          if (typeof val === 'object' &&
        !Array.isArray(val)) {
          return node.map((val)=> ObservableFactory.buildNode(val));
        }
        }

        return node;
      },
      set: (obj, prop, value) => {
        const oldValue = obj[prop];
        obj[prop] = value;
        if (ObservableFactory.listeners[prop]) {
          ObservableFactory.listeners[prop](value, oldValue, obj);
        }
        return true;
      },
    }) as Observable<T>;
  }
}
