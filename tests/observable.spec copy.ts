import { describe, expect, test, vi } from 'vitest';
import { observableArray } from '../src/ObservableArray';

describe('observables', () => {
  describe('function observable', () => {
    test('can build with empty array', () => {
      const obj = observableArray([]);

      expect(obj).toBeTruthy();
      expect(obj.$$listeners).toBeTruthy();
      expect(obj.$on).toBeTruthy();
    });

    test('can build with primitive', () => {
      const obj = observableArray([1, 2, 3]);

      expect(obj).toBeTruthy();
      expect(obj.$$listeners).toBeTruthy();
      expect(obj.$on).toBeTruthy();
    });

    test('can build with objects', () => {
      const obj = observableArray([{}, {}, {}]);

      expect(obj).toBeTruthy();
      expect(obj.$$listeners).toBeTruthy();
      expect(obj.$on).toBeTruthy();
    });

    test('emits push event when pushing elements', async () => {
      const obj = observableArray([]);

      const promise = new Promise((resolve) => {
        obj.$on('push', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([1]);
          resolve({});
        });
      });

      obj.push(1);

      await promise;
    });

    test('emits push event when pushing multiple elements', async () => {
      const obj = observableArray([]);

      const promise = new Promise((resolve) => {
        obj.$on('push', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([1, 2]);
          resolve({});
        });
      });

      obj.push(1, 2);

      await promise;
    });
  });
});
