import { describe, expect, test, vi } from 'vitest';
import { state } from '../src/signals';

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
  });
});