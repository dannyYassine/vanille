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

});