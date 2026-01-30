import { describe, expect, test, vi } from 'vitest';
import { mount } from './test-utils';
import { computed, effect, state } from '../src/signals';

describe('effect', () => {
    test('should execute when loaded', () => {
        let value = null;

        effect(() => {
            value = 1;
        });

        expect(value).toEqual(1);
    });

    test('should re-execute when signal changes', () => {
        let value = state(0);
        let count = 0;

        effect(() => {
            value.get();
            count += 1;
        });
        expect(count).toEqual(1);
        expect(value.get()).toEqual(0);

        value.set(1);
        expect(count).toEqual(2);
    });

    test('should re-execute when computed changes', () => {
        let value = state(0);
        let c = computed(() => value.get());
        let count = 0;

        effect(() => {
            c.get();
            count += 1;
        });
        expect(count).toEqual(1);
        expect(value.get()).toEqual(0);

        value.set(1);
        expect(count).toEqual(2);
    });

    test('should not longer execute when calling unsubscribe', () => {
        let value = state(0);
        let c = computed(() => value.get());
        let count = 0;

        const unsubscribe = effect(() => {
            c.get();
            count += 1;
        });
        expect(count).toEqual(1);
        expect(value.get()).toEqual(0);

        value.set(1);
        expect(count).toEqual(2);

        unsubscribe();

        value.set(1);
        expect(count).toEqual(2);
    });

    test('should track multiple signals in one effect', () => {
        const a = state(0);
        const b = state(0);
        let count = 0;

        effect(() => {
            a.get();
            b.get();
            count += 1;
        });
        expect(count).toEqual(1);

        a.set(1);
        expect(count).toEqual(2);

        b.set(1);
        expect(count).toEqual(3);
    });

    test('should unsubscribe from all tracked signals', () => {
        const a = state(0);
        const b = state(0);
        let count = 0;

        const unsubscribe = effect(() => {
            a.get();
            b.get();
            count += 1;
        });
        expect(count).toEqual(1);

        unsubscribe();

        a.set(1);
        b.set(1);
        expect(count).toEqual(1);
    });

    test('should see latest signal value inside effect callback', () => {
        const value = state('hello');
        let captured = '';

        effect(() => {
            captured = value.get();
        });
        expect(captured).toBe('hello');

        value.set('world');
        expect(captured).toBe('world');
    });

    test('should clean up globalThis.trackDependency after running', () => {
        effect(() => {});

        expect(globalThis.trackDependency).toBeUndefined();
    });
});