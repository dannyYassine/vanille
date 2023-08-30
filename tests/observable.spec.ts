import { describe, expect, test, vi } from 'vitest';
import { observable } from '../src/Observable';

describe('observables', () => {
  describe('function observable', () => {
    test('can build with literals', () => {
      const obj = observable({});

      expect(obj).toBeTruthy();
    });

    test('can build with nested objects', () => {
      const name: string = 'vanille';
      const obj = observable({
        user: {
          contact: {
            firstName: name
          }
        }
      });

      expect(obj.user.contact.firstName).toEqual(name);
    });

    test('can build with nested arrays', () => {
      const name: string = 'vanille';
      const obj = observable({
        users: [
          {
            contact: {
              firstName: name
            }
          }
        ]
      });

      expect(obj.users[0].contact.firstName).toEqual(name);
    });

    test('can build with array of objects', () => {
      const name: string = 'vanille';
      const obj = observable({
        users: [
          {
            contact: {
              firstName: name
            }
          }
        ]
      });

      expect(obj.users[0].contact.firstName).toEqual(name);
    });
  });

  describe('function $on', () => {
    test('triggers first level changes', async () => {
      const name: string = 'vanille';
      const obj = observable({
        email: 'old'
      });
      const promise = new Promise((resolve) => {
        obj.$on('email', (newValue: string, oldValue: string, target) => {
          expect(newValue).toBe(name);
          expect(oldValue).toBe('old');
          expect(target).toEqual(obj);
          resolve({});
        });
      });

      obj.email = name;

      await promise;
    });

    test('triggers nested level changes', async () => {
      const name: string = 'vanille';
      const obj = observable({
        user: { email: 'old' }
      });
      const promise = new Promise((resolve) => {
        obj.user.$on('email', (newValue: string, oldValue: string, target) => {
          expect(newValue).toBe(name);
          expect(oldValue).toBe('old');
          expect(target).toEqual(obj.user);
          resolve({});
        });
      });

      obj.user.email = name;

      await promise;
    });

    test('triggers deeply nested level changes', async () => {
      const name: string = 'vanille';
      const obj = observable({
        user: { email: '', contact: { firstName: 'old' } }
      });
      const promise = new Promise((resolve) => {
        obj.user.contact.$on(
          'firstName',
          (newValue: string, oldValue: string, target) => {
            expect(newValue).toBe(name);
            expect(oldValue).toBe('old');
            expect(target).toEqual(obj.user.contact);
            resolve({});
          }
        );
      });

      obj.user.contact.firstName = name;

      await promise;
    });

    test('triggers when array object changes', async () => {
      const obj = observable({
        users: []
      });
      const promise = new Promise((resolve) => {
        obj.$on('users', (newValue: string, oldValue: string, target) => {
          expect(newValue).toEqual([
            {email: 'email'}
          ]);
          expect(oldValue).toEqual([]);
          expect(target).toEqual(obj);
          resolve({});
        });
      });

      obj.users = [
        { email: 'email' }
      ];

      await promise;
    });


    test('triggers when object in array changes', async () => {
      const obj = observable({
        users: [{ email: 'email' }]
      });
      const promise = new Promise((resolve) => {
        obj.users[0].$on('email', (newValue: string, oldValue: string, target) => {
          expect(newValue).toEqual('new');
          expect(oldValue).toEqual('email');
          expect(target).toEqual(obj.users[0]);
          resolve({});
        });
      });

      obj.users[0].email = 'new';

      await promise;
    });
  });

  describe('when setting objects', () => {
    test('should trigger all listeners when prop values changed', async () => {
      const name: string = 'vanille';
      const obj = observable({
        user: { email: 'old' }
      });
      const promise = new Promise((resolve) => {
        obj.user.$on('email', (newValue: string, oldValue: string, target) => {
          expect(newValue).toBe(name);
          expect(oldValue).toBe('old');
          expect(target.email).toBe(name);
          resolve({});
        });
      });

      obj.user = { email: name };

      await promise;
    });

    test('should not trigger listeners when prop values changed', async () => {
      const name: string = 'same';
      const obj = observable({
        user: { email: 'same' }
      });
      const cbSpy = vi.fn();

      obj.user.$on('email', cbSpy);
      obj.user = { email: name };

      expect(cbSpy).not.toHaveBeenCalled();
    });
  });
});
