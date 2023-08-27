import { describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import './test-utils/Test';

describe('BaseView.tsx', () => {
  describe('rendering', () => {
    test('can render its own template', () => {
      const $shadow = mount(<v-test />)

      const $el = $shadow.querySelector('[data-id="test"');

      expect($el).toBeTruthy();
    });
  });
});