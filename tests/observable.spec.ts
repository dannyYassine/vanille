import { describe, expect, test, vi } from 'vitest';
import { observable } from '../src/Observable';

describe('observables', () => {
  describe('function observable', () => {
    test('can build with literals', () => {
      const obj = observable({});

      expect(obj).toBeTruthy();
      expect(obj.$$listeners).toBeTruthy();
      expect(obj.$on).toBeTruthy();
    });

    test('can build with array', () => {
      const obj = observable([]);

      expect(obj).toBeTruthy();
      expect(obj.$$listeners).toBeTruthy();
      expect(obj.$on).toBeTruthy();
    });

    test('can build an object with null values', () => {
      const obj = observable({
        user: {
          name: null
        }
      });

      expect(obj.user.name).toBe(null);
      expect(obj.user).toBeTruthy();
      expect(obj.user.$$listeners).toBeTruthy();
      expect(obj.user.$on).toBeTruthy();
    });

    test('can build with array of primitives', () => {
      const obj = observable([1, 2, 3]);

      expect(obj).toBeTruthy();
      expect([...obj]).toEqual([1, 2, 3]);
      expect(obj.$$listeners).toBeTruthy();
      expect(obj.$on).toBeTruthy();
    });

    test('can build nested array of primitives', async () => {
      const obj = observable({
        users: [{ contact_ids: [1, 2] }]
      });

      expect([...obj.users[0].contact_ids]).toEqual([1, 2]);
      expect(obj.users[0].contact_ids.$$listeners).toBeTruthy();
      expect(obj.users[0].contact_ids.$on).toBeTruthy();
    });

    test('can build nested empty ', async () => {
      const obj = observable({
        users: [{ contact_ids: [] }]
      });

      expect([...obj.users[0].contact_ids]).toEqual([]);
      expect(obj.users[0].contact_ids.$$listeners).toBeTruthy();
      expect(obj.users[0].contact_ids.$on).toBeTruthy();
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
      expect(obj.user.contact.$$listeners).toBeTruthy();
      expect(obj.user.contact.$on).toBeTruthy();
    });

    test('can build with nested arrays', () => {
      const name: string = 'vanille';
      const obj = observable({
        users: [
          {
            contacts: [
              {
                firstName: name
              }
            ]
          }
        ]
      });

      expect(obj.users.$$listeners).toBeTruthy();
      expect(obj.users.$on).toBeTruthy();

      expect(obj.users[0].contacts.$$listeners).toBeTruthy();
      expect(obj.users[0].contacts.$on).toBeTruthy();

      expect(obj.users[0].contacts[0].firstName).toEqual(name);
      expect(obj.users[0].contacts[0].$$listeners).toBeTruthy();
      expect(obj.users[0].contacts[0].$on).toBeTruthy();
    });

    test('can build with nested empty arrays', () => {
      const name: string = 'vanille';
      const obj = observable({
        users: [
          {
            contacts: []
          }
        ]
      });

      expect(obj.users.$$listeners).toBeTruthy();
      expect(obj.users.$on).toBeTruthy();

      expect(obj.users[0].contacts.$$listeners).toBeTruthy();
      expect(obj.users[0].contacts.$on).toBeTruthy();
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
      expect(obj.users[0].contact.$$listeners).toBeTruthy();
      expect(obj.users[0].contact.$on).toBeTruthy();
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

    test('can have multiple listeners', async () => {
      const name: string = 'vanille1';
      const obj = observable({
        email: 'old'
      });
      const promise1 = new Promise((resolve) => {
        obj.$on('email', (newValue: string, oldValue: string, target) => {
          expect(newValue).toBe(name);
          expect(oldValue).toBe('old');
          expect(target).toEqual(obj);
          resolve({});
        });
      });
      const promise2 = new Promise((resolve) => {
        obj.$on('email', (newValue: string, oldValue: string, target) => {
          expect(newValue).toBe(name);
          expect(oldValue).toBe('old');
          expect(target).toEqual(obj);
          resolve({});
        });
      });

      obj.email = name;

      await promise1;
      await promise2;
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
        obj.user.contact.$on('firstName', (newValue: string, oldValue: string, target) => {
          expect(newValue).toBe(name);
          expect(oldValue).toBe('old');
          expect(target).toEqual(obj.user.contact);
          resolve({});
        });
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
          expect(newValue).toEqual([{ email: 'email' }]);
          expect(oldValue).toEqual([]);
          expect(target).toEqual(obj);
          resolve({});
        });
      });

      obj.users = [{ email: 'email' }];

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

    test('triggers when object is updated containing an array objects', async () => {
      const obj = observable({
        users: []
      });
      const promise = new Promise((resolve) => {
        obj.$on('users', (newValue: string, oldValue: string, target) => {
          expect(newValue).toEqual([{ email: 'email' }]);
          expect(oldValue).toEqual([{ email: 'email' }]);
          expect(target).toEqual(obj);
          resolve({});
        });
      });

      const users = obj.users;
      users.push({ email: 'email' });
      obj.users = users;

      await promise;
    });

    test('triggers when object is updated containing an array objects', async () => {
      const obj = observable({
        users: [{ contacts: [{ firstName: '' }] }]
      });
      const promise1 = new Promise((resolve) => {
        obj.$on('users', (newValue: string, oldValue: string) => {
          expect(newValue[0].contacts[0].firstName).toEqual('newname');
          expect(oldValue[0].contacts[0].firstName).toEqual('newname');
          resolve({});
        });
      });
      const promise2 = new Promise((resolve) => {
        obj.users[0].contacts[0].$on('firstName', (newValue: string, oldValue: string) => {
          expect(newValue).toEqual('newname');
          expect(oldValue).toEqual('');
          resolve({});
        });
      });

      const users = obj.users;
      users[0].contacts[0].firstName = 'newname';
      obj.users = users;

      await Promise.all([promise1, promise2]);
    });

    test('triggers when non object property is updated inside an array', async () => {
      const obj = observable({
        users: [{ contacts: [], email: '' }]
      });
      const promise = new Promise((resolve) => {
        obj.$on('users', (newValue: string, oldValue: string) => {
          expect(newValue[0].email).toEqual('email');
          expect([...newValue[0].contacts]).toEqual([]);
          expect(oldValue[0].email).toEqual('email');
          expect([...oldValue[0].contacts]).toEqual([]);
          resolve({});
        });
      });

      const users = obj.users;
      users[0].email = 'email';
      obj.users = users;

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

    test('should trigger listeners when setting multiple times a primitive type', async () => {
      const name: string = 'vanille';
      const obj = observable({
        user: { email: 'old' }
      });
      let count = 0;
      const promise = new Promise((resolve) => {
        obj.user.$on('email', (newValue: string, oldValue: string, target) => {
          count++;
          if (count === 2) {
            resolve({});
          }
        });
      });

      obj.user.email = name;
      obj.user.email = name;

      await promise;
    });

    test('should trigger listeners when setting multiple times an object', async () => {
      const name: string = 'vanille';
      const obj = observable({
        user: { email: 'old' }
      });
      let count = 0;
      const promise = new Promise((resolve) => {
        obj.user.$on('email', (newValue: string, oldValue: string, target) => {
          count++;
          if (count === 2) {
            resolve({});
          }
        });
      });

      obj.user = { email: 'yo' };
      obj.user = { email: 'yo2' };

      await promise;
    });
  });
});
