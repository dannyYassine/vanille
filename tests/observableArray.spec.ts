import { describe, expect, test, vi } from 'vitest';
import { observableArray } from '../src/ObservableArray';

describe('observables', () => {
  describe('function observableArray', () => {
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
  });

  describe('function push', () => {
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

  describe('function pop', () => {
    test('emits on pop event', async () => {
      const obj = observableArray([1, 2]);

      const promise = new Promise((resolve) => {
        obj.$on('pop', (newValue: string, oldValue: string, target) => {
          expect(newValue).toEqual(2);
          resolve({});
        });
      });

      obj.pop();

      await promise;

      expect([...obj]).toEqual([1]);
    });
  });

  describe('function shift', () => {
    test('emits on shift event', async () => {
      const obj = observableArray([1, 2]);

      const promise = new Promise((resolve) => {
        obj.$on('shift', (newValue: string, oldValue: string, target) => {
          expect(newValue).toEqual(1);
          resolve({});
        });
      });

      obj.shift();

      await promise;

      expect([...obj]).toEqual([2]);
    });
  });

  describe('function unshift', () => {
    test('emits on unshift event', async () => {
      const obj = observableArray([1, 2]);

      const promise = new Promise((resolve) => {
        obj.$on('unshift', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([3, 4]);
          resolve({});
        });
      });

      obj.unshift(3, 4);

      await promise;

      expect([...obj]).toEqual([3, 4, 1, 2]);
    });
  });

  describe('function splice', () => {
    test('emits on splice event', async () => {
      const obj = observableArray([1, 2]);

      const promise = new Promise((resolve) => {
        obj.$on('splice', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([1]);
          resolve({});
        });
      });

      obj.splice(0, 1, 5);

      await promise;

      expect([...obj]).toEqual([5, 2]);
    });
  });

  describe('function sort', () => {
    test('emits on sort event with compareFn', async () => {
      const obj = observableArray([1, 2]);

      const promise = new Promise((resolve) => {
        obj.$on('sort', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([2, 1]);
          resolve({});
        });
      });

      // @ts-ignore
      obj.sort((a: number, b: number) => (a % 2) - (b % 2));

      await promise;

      expect([...obj]).toEqual([2, 1]);
    });

    test('emits on sort event', async () => {
      const obj = observableArray([2, 1]);

      const promise = new Promise((resolve) => {
        obj.$on('sort', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([1, 2]);
          resolve({});
        });
      });

      obj.sort();

      await promise;

      expect([...obj]).toEqual([1, 2]);
    });
  });

  describe('function reverse', () => {
    test('emits on reverse event', async () => {
      const obj = observableArray([1, 2]);

      const promise = new Promise((resolve) => {
        obj.$on('reverse', (newValue: string, oldValue: string, target) => {
          expect([...newValue]).toEqual([2, 1]);
          resolve({});
        });
      });

      obj.reverse();

      await promise;

      expect([...obj]).toEqual([2, 1]);
    });
  });
});
