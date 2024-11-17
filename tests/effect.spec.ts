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
});