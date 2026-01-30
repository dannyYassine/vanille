import { describe, expect, test, vi } from 'vitest';
import { Signal, state, stateArray } from '../src/signals';

describe('Signal', () => {
  describe('function constructor', () => {
    test.each([
      ['string', ''],
      ['number', 0],
      ['object', {}],
      ['array', []]
    ])('should hold value: %s', (name, value) => {
      const signal = state(value);

      const result = signal.get();

      expect(result).toEqual(value);
    });

    test('should default to undefined when no initial value', () => {
      const signal = new Signal();

      expect(signal.get()).toBeUndefined();
    });

    test('should initialize subscribers as empty set', () => {
      const signal = state(0);

      expect(signal.subscribers.size).toBe(0);
    });
  });

  describe('function get', () => {
    test('should track dependency when globalThis.trackDependency exists', () => {
      const signal = state(1);
      const tracker = vi.fn();
      globalThis.trackDependency = tracker;

      signal.get();

      expect(tracker).toHaveBeenCalledWith(signal);
      delete globalThis.trackDependency;
    });

    test('should not throw when globalThis.trackDependency does not exist', () => {
      delete globalThis.trackDependency;
      const signal = state(1);

      expect(() => signal.get()).not.toThrow();
      expect(signal.get()).toBe(1);
    });
  });

  describe('function set', () => {
    test('should set new value as function', () => {
      const signal = state(1);

      let result = signal.get();
      expect(result).toEqual(1);

      signal.set((c) => c+= 1);

      result = signal.get();
      expect(result).toEqual(2);
    });

    test.each([
      ['string', '', '1'],
      ['number', 0, 1],
      ['object', {}, {name: ''}],
      ['array', [], [1]]
    ])('should set new value: %s', (name, value, newValue) => {
      const signal = state(value);

      let result = signal.get();
      expect(result).toEqual(value);

      signal.set(newValue);
      result = signal.get();
      expect(result).toEqual(newValue);
    });

    test('should not notify subscribers when value is the same', () => {
      const signal = state(5);
      const callback = vi.fn();
      signal.subscribe(callback);

      signal.set(5);

      expect(callback).not.toHaveBeenCalled();
    });

    test('should not notify subscribers when function returns the same value', () => {
      const signal = state(5);
      const callback = vi.fn();
      signal.subscribe(callback);

      signal.set((c) => c);

      expect(callback).not.toHaveBeenCalled();
    });

    test('should notify subscribers with new and old value', () => {
      const signal = state(1);
      const callback = vi.fn();
      signal.subscribe(callback);

      signal.set(2);

      expect(callback).toHaveBeenCalledWith(2, 1);
    });
  });

  describe('function mutSet', () => {
    test('should set new value as function', () => {
      const signal = state(1);

      let result = signal.get();
      expect(result).toEqual(1);

      signal.mutSet((c) => c += 1);

      result = signal.get();
      expect(result).toEqual(2);
    });

    test.each([
      ['string', '', '1'],
      ['number', 0, 1]
    ])('should set new value: %s', (name, value, newValue) => {
      const signal = state(value);

      let result = signal.get();
      expect(result).toEqual(value);

      signal.mutSet(newValue);
      result = signal.get();
      expect(result).toEqual(newValue);
    });

    test('should set new value as object', () => {
      const value = {};
      const newValue = {name: ''};

      const signal = state(value);

      let result = signal.get();
      expect(result).toEqual(value);

      signal.mutSet((v) => {
        v.name = '';
      });
      result = signal.get();
      expect(result).toEqual(newValue);
    });

    test('should set new value as array', () => {
      const value = [];
      const newValue = [1];

      const signal = state(value);

      let result = signal.get();
      expect(result).toEqual(value);

      signal.mutSet((v) => v.push(1));
      result = signal.get();
      expect(result).toEqual(newValue);
    });

    test('should always notify subscribers even if value unchanged', () => {
      const obj = { a: 1 };
      const signal = state(obj);
      const callback = vi.fn();
      signal.subscribe(callback);

      signal.mutSet((v) => {
        v.a = 1;
      });

      expect(callback).toHaveBeenCalledOnce();
    });

    test('should pass old value to subscribers', () => {
      const signal = state(10);
      const callback = vi.fn();
      signal.subscribe(callback);

      signal.mutSet(20);

      expect(callback).toHaveBeenCalledWith(20, 10);
    });
  });

  describe('function subscribe', () => {
    test('should subscribe to changes when using set', async () => {
      const signal = state(0);

      const promise = new Promise((resolve) => {
        signal.subscribe((nV, oV) => {
          resolve({nV, oV});
        });
      });

      const result = signal.set(1);

      const {nV, oV} = await promise;

      expect(nV).toEqual(1);
      expect(oV).toEqual(0);
    });

    test('should subscribe to changes when using mutSet', async () => {
      const signal = state(0);

      const promise = new Promise((resolve) => {
        signal.subscribe((nV, oV) => {
          resolve({nV, oV});
        });
      });

      const result = signal.mutSet(1);

      const {nV, oV} = await promise;

      expect(nV).toEqual(1);
      expect(oV).toEqual(0);
    });

    test('should return an unsubscribe function', () => {
      const signal = state(0);
      const callback = vi.fn();

      const unsubscribe = signal.subscribe(callback);

      signal.set(1);
      expect(callback).toHaveBeenCalledOnce();

      unsubscribe();

      signal.set(2);
      expect(callback).toHaveBeenCalledOnce();
    });

    test('should support multiple subscribers', () => {
      const signal = state(0);
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      const cb3 = vi.fn();

      signal.subscribe(cb1);
      signal.subscribe(cb2);
      signal.subscribe(cb3);

      signal.set(1);

      expect(cb1).toHaveBeenCalledWith(1, 0);
      expect(cb2).toHaveBeenCalledWith(1, 0);
      expect(cb3).toHaveBeenCalledWith(1, 0);
    });

    test('should not add the same callback twice', () => {
      const signal = state(0);
      const callback = vi.fn();

      signal.subscribe(callback);
      signal.subscribe(callback);

      signal.set(1);

      expect(callback).toHaveBeenCalledOnce();
    });
  });

  describe('function unsubscribe', () => {
    test('should remove callback from subscribers', () => {
      const signal = state(0);
      const callback = vi.fn();

      signal.subscribe(callback);
      signal.unsubscribe(callback);

      signal.set(1);

      expect(callback).not.toHaveBeenCalled();
    });

    test('should not throw when unsubscribing a non-subscribed callback', () => {
      const signal = state(0);
      const callback = vi.fn();

      expect(() => signal.unsubscribe(callback)).not.toThrow();
    });
  });
});

describe('stateArray', () => {
  test('should create a signal of signals from an array', () => {
    const arr = stateArray([1, 2, 3]);

    const inner = arr.get();
    expect(inner).toHaveLength(3);
    expect(inner[0]).toBeInstanceOf(Signal);
    expect(inner[1]).toBeInstanceOf(Signal);
    expect(inner[2]).toBeInstanceOf(Signal);
  });

  test('should wrap each value in a Signal', () => {
    const arr = stateArray(['a', 'b']);

    const inner = arr.get();
    expect(inner[0].get()).toBe('a');
    expect(inner[1].get()).toBe('b');
  });

  test('should create an empty signal array from empty input', () => {
    const arr = stateArray([]);

    expect(arr.get()).toHaveLength(0);
  });

  test('inner signals should be independently settable', () => {
    const arr = stateArray([1, 2]);

    arr.get()[0].set(10);

    expect(arr.get()[0].get()).toBe(10);
    expect(arr.get()[1].get()).toBe(2);
  });
});