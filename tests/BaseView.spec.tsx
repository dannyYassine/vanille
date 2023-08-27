import { describe, expect, test } from 'vitest';
import { mount } from './utils/utils';
import './utils/Test';

describe('BaseView.tsx', () => {
  describe('rendering', () => {
    test('can render its own template', () => {
      const $shadow = mount(<v-test />)

      const $el = $shadow.querySelector('#test');

      expect($el).toBeTruthy();
    });
  });
});