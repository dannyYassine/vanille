import { describe, expect, test, vi } from 'vitest';
import { mount } from './test-utils';
import './test-utils/Test';

describe('function emit', () => {
  test('emitting object, object can be found in customEvent.detail', async () => {
    const $component = mount(<v-test />);
    const callback = vi.fn();
    $component.addEventListener('onObject', callback);

    $component.emit('onObject', { custom: 'data' });

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(callback).toHaveBeenCalledWith(new CustomEvent('onObject'));
        expect(callback.mock.calls[0][0].detail).toEqual({ custom: 'data' });
        resolve();
      }, 500);
    });
  });

  test('emitting non object, primitive can be found in customEvent.detail', async () => {
    const $component = mount(<v-test />);
    const callback = vi.fn();
    $component.addEventListener('onObject', callback);

    $component.emit('onObject', 'primitive');

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(callback).toHaveBeenCalledWith(new CustomEvent('onObject'));
        expect(callback.mock.calls[0][0].detail).toEqual('primitive');
        resolve();
      }, 500);
    });
  });
});
