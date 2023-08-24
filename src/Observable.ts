export interface ObservableEvent {
  $on<T>(event: string, cb: (nv: T, ov: T, obj: object) => void): void;
}

export type Observable<T> = T & ObservableEvent;

export class ObservableFactory {
  static listeners = {};
  static subs = {};

  static build<T>(data: T): Observable<T> {
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
        return target[prop];
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
