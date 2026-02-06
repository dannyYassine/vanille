import { describe, expect, test, vi } from 'vitest';
import { computed, state } from '../src/signals';

describe('Computed', () => {
  describe('function constructor', () => {
    test.each([
      ['string', ''],
      ['number', 0],
      ['object', {}],
      ['array', []]
    ])('should hold value: %s', (name, value) => {
      const computedSignal = computed(() => value);

      const result = computedSignal.get();

      expect(result).toEqual(value);
    });
  });

  describe('function get', () => {
    test('should get value', () => {
      const computedSignal = computed(() => 1);

      let result = computedSignal.get();

      expect(result).toEqual(1);
    });

    test('should get value when dependencies change', () => {
      const signal = state(0);
      const computedSignal = computed(() => signal.get());

      let result = computedSignal.get();
      expect(result).toEqual(0);

      signal.set(1);

      result = computedSignal.get();

      expect(result).toEqual(1);
    });
  });

  describe('function set', () => {
    test('should set new value as function', () => {
      const computedSignal = computed(() => 1);

      let result = computedSignal.get();
      expect(result).toEqual(1);

      computedSignal.set((c) => c+= 1);
      
      result = computedSignal.get();
      expect(result).toEqual(2);
    });

    test.each([
      ['string', '', '1'],
      ['number', 0, 1],
      ['object', {}, {name: ''}],
      ['array', [], [1]]
    ])('should set new value: %s', (name, value, newValue) => {
      const computedSignal = computed(() => value);

      let result = computedSignal.get();
      expect(result).toEqual(value);

      computedSignal.set(newValue);
      result = computedSignal.get();
      expect(result).toEqual(newValue);
    });
  });

  describe('function subscribe', () => {
    test('should subscribe to changes', async () => {
      const computedSignal = computed(() => 0);

      const promise = new Promise((resolve) => {
        computedSignal.subscribe((nV, oV) => {
          resolve({nV, oV});
        });
      });

      const result = computedSignal.set(1);

      const {nV, oV} = await promise;

      expect(nV).toEqual(1);
      expect(oV).toEqual(0);
    });

    test('should subscribe to changes from other signals', async () => {
        const signal = state(0);
        const computedSignal = computed(() => signal.get());
  
        const promise = new Promise((resolve) => {
          computedSignal.subscribe((nV, oV) => {
            resolve({nV, oV});
          });
        });
  
        const result = signal.set(1);
  
        const {nV, oV} = await promise;
  
        expect(nV).toEqual(1);
        expect(oV).toEqual(0);
      });


  test('can unsubscribe', async () => {
    const signal = state(0);
    const computedSignal = computed(() => signal.get());

    let unsubscribe = null;
    const promise = new Promise((resolve) => {
        unsubscribe = computedSignal.subscribe((nV, oV) => {
        resolve({nV, oV});
      });
    });

    let result = signal.set(1);

    let {nV, oV} = await promise;

    expect(nV).toEqual(1);
    expect(oV).toEqual(0);

    unsubscribe();

     result = signal.set(1);

    let {nV2, oV2} = await promise;

    expect(nV2).toEqual(undefined);
    expect(oV2).toEqual(undefined);
  });
  });

  describe('multiple dependencies', () => {
    test('should recompute when any dependency changes', () => {
      const a = state(1);
      const b = state(2);
      const sum = computed(() => a.get() + b.get());

      expect(sum.get()).toBe(3);

      a.set(10);
      expect(sum.get()).toBe(12);

      b.set(20);
      expect(sum.get()).toBe(30);
    });

    test('should track all dependencies', () => {
      const a = state(1);
      const b = state(2);
      const c = state(3);
      const sum = computed(() => a.get() + b.get() + c.get());

      expect(sum.dependencies.size).toBe(3);
      expect(sum.get()).toBe(6);
    });
  });

  describe('chained computed', () => {
    test('should update when upstream computed changes', () => {
      const base = state(2);
      const doubled = computed(() => base.get() * 2);
      const quadrupled = computed(() => doubled.get() * 2);

      expect(quadrupled.get()).toBe(8);

      base.set(3);
      expect(doubled.get()).toBe(6);
      expect(quadrupled.get()).toBe(12);
    });
  });

  describe('no-change optimization', () => {
    test('should not notify subscribers when recomputed value is unchanged', () => {
      const signal = state(5);
      const clamped = computed(() => Math.min(signal.get(), 10));
      const callback = vi.fn();
      clamped.subscribe(callback);

      // Both values clamp to the same result
      signal.set(8);
      expect(clamped.get()).toBe(8);
      expect(callback).toHaveBeenCalledTimes(1);

      signal.set(8);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});