import { describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import { Test } from './test-utils/Test';

describe('BaseView.tsx', () => {
  describe('rendering as jsx template', () => {
    test('can render its own template with JSX', () => {
      const $shadow = mount(<v-test />)

      const $el = $shadow.querySelector('[data-id="test"');

      expect($el).toBeTruthy();
    });

    test('can render with attributes', () => {
      const name = 'vanille';
      const $shadow = mount(<v-test name={name} />)

      const $el = $shadow.querySelector('[data-id="name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(name);
    });
  });

  describe('rendeing as web component class', () => {
    test('can render its own template with web component class', () => {
      const $shadow = mount(Test)

      const $el = $shadow.querySelector('[data-id="test"');

      expect($el).toBeTruthy();
    });

    test('can render its own template with web component class', () => {
      const name = 'vanille';
      const $shadow = mount(Test, { props: { name } })

      const $el = $shadow.querySelector('[data-id="name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(name);
    });
  })
});