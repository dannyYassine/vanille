import { describe, expect, test } from 'vitest';
import { mount } from './test-utils';

describe('jsx.tsx', () => {
  describe('function render', () => {
    test.only('renders template with no children', () => {
      const $component = mount(<div test-id="test"></div>);

      const $el = document.querySelector('[test-id="test"');

      expect($component).toBeTruthy();
      expect($el).toBeTruthy();
    });
    });
});
