import { describe, expect, test, vi } from 'vitest';
import { computed } from '../src/signals';

describe('Computed', () => {
  describe('function constructor', () => {
    test.each([
      ['string', ''],
      ['number', 0],
      ['object', {}],
      ['array', []]
    ])('should hold value: %s', (name, value) => {
      const signal = computed(() => value);

      const result = signal.get();

      expect(result).toEqual(value);
    });
  });

  describe('function set', () => {
    test('should set new value as function', () => {
      const signal = computed(() => 1);

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
      const signal = computed(() => value);

      let result = signal.get();
      expect(result).toEqual(value);

      signal.set(newValue);
      result = signal.get();
      expect(result).toEqual(newValue);
    });
  });

  describe('function subscribe', () => {
    test('should subscribe to changes', async () => {
      const signal = computed(() => 0);

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
  });
});