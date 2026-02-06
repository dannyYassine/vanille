import { isPrimitive } from './helpers/isPrimitive';

type SignalCallback<P> = (newValue: P, oldValue: P) => void;

export class Signal<P> {
    value: P;
    subscribers: Set<SignalCallback<P>>;

    constructor(initialValue?: P) {
      this.value = initialValue;
      this.subscribers = new Set();
    }
  
    get(): P {
      if (globalThis.trackDependency) {
        globalThis.trackDependency(this);
      }
      return this.value;
    }
  
    set(newValue: P | ((current: P) => P)) {
      if (typeof newValue === 'function') {
        newValue = newValue(this.value);
      }
  
      if (this.value !== newValue) {
        const oldValue = this.value;
        this.value = newValue;
        this.notifySubscribers(this.value, oldValue);
      }
    }
  
    mutSet(newValue: P | ((current: P) => P)) {
      const oldValue = this.value;
      if (typeof newValue === 'function') {
        newValue = newValue(this.value);
      }

      if (isPrimitive(this.value)) {
        this.value = newValue;
      }
  
      this.notifySubscribers(this.value, oldValue);
    }
  
    subscribe(callback: SignalCallback<P>) {
      const unsubscribe = () => {
        this.unsubscribe(callback);
      };
      this.subscribers.add(callback);
  
      return unsubscribe;
    }
  
    unsubscribe(callback: SignalCallback<P>) {
      this.subscribers.delete(callback);
    }
  
    notifySubscribers(_newValue: P, oldValue: P) {
      this.subscribers.forEach((callback) => callback(this.value, oldValue));
    }
  }
  
  export class Computed<P> extends Signal<P> {
    computeFn: () => P;
    dependencies: Set<Signal<P>>;

    constructor(computeFn: () => P) {
      super();
  
      this.computeFn = computeFn;
      this.value = undefined;
      this.subscribers = new Set();
      this.dependencies = new Set();
  
      this.compute(true);
    }
  
    compute(initial?: boolean) {
      if (initial) {
        const trackDependency = (signal: Signal<P>) => {
          this.dependencies.add(signal);
          signal.subscribe(this.update);
        };
  
        globalThis.trackDependency = trackDependency;
      }
  
      const newValue = this.computeFn();
  
      delete globalThis.trackDependency;
  
      if (newValue !== this.value) {
        const oldValue = this.value;
        this.value = newValue;
        this.notifySubscribers(this.value, oldValue);
      }
    }
  
    update = () => {
      this.compute();
    };
  }
  
  export function effect(fn: () => void) {
    const signals: Signal<unknown>[] = [];
    globalThis.trackDependency = (signal: Signal<unknown>) => {
      signal.subscribe(fn);
      signals.push(signal);
    };
  
    fn();
  
    delete globalThis.trackDependency;
  
    return () => {
      signals.forEach((signal) => {
        signal.unsubscribe(fn);
      });
    };
  }

  export function state<P>(value: P): Signal<P> {
    return new Signal<P>(value);
  }
  
  export function stateArray<P>(value: P[]): Signal<Signal<P>[]> {
    return new Signal<Signal<P>[]>(value.map((val) => new Signal(val)));
  }
  
  export function computed<P>(cb: () => P): Computed<P> {
    return new Computed<P>(cb);
  }
  