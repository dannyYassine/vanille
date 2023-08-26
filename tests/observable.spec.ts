import { describe, expect, test } from 'vitest';
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
  });

  describe('function $on', () => {
    test('triggers first level changes', async () => {
      const name: string = 'vanille';
      const obj = observable({
        email: ''
      });
      const promise = new Promise((resolve) => {
        obj.$on('email', () => {
          resolve({});
        });
      });
      obj.email = name;
      await promise;
    });

    test('triggers nested level changes', async () => {
      const name: string = 'vanille';
      const obj = observable({
        user: { email: '' }
      });
      const promise = new Promise((resolve) => {
        obj.user.$on('email', () => {
          resolve({});
        });
      });
      obj.user.email = 'name';
      await promise;
    });
  });
});
