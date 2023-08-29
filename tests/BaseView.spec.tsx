import { describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import { Test, TestWithData } from './test-utils/Test';

describe('BaseView.tsx', () => {
  describe('rendering as jsx template', () => {
    test('can render its own template with JSX', () => {
      const $component = mount(<v-test />);

      const $el = $component.shadowRoot.querySelector('[data-id="test"');

      expect($el).toBeTruthy();
    });

    test('can render with attributes', () => {
      const name = 'vanille';
      const $component = mount(<v-test name={name} />);

      const $el = $component.shadowRoot.querySelector('[data-id="name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(name);
    });

    test('can render with attributes as objects', () => {
      const user = { name: 'vanille' };
      const $component = mount(<v-test user={user} />);

      const $el = $component.shadowRoot.querySelector('[data-id="user.name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(user.name);
    });
  });

  describe('function data', () => {
    test('data function becomes observable state', () => {
      const state = {
        user: {
          name: 'vanille' 
        }
      };
      const $component = mount(<v-test-with-data />);

      const $el = $component.shadowRoot.querySelector('[data-id="user.name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(state.user.name);
      expect($component.state.$$listeners).toBeDefined();
      expect($component.state.$$subs).toBeDefined();
    });
  });

  describe('rendering as web component class', () => {
    test('can render its own template with web component class', () => {
      const $component = mount(Test);

      const $el = $component.shadowRoot.querySelector('[data-id="test"');

      expect($el).toBeTruthy();
    });

    test('can render its own template with web component class', () => {
      const name = 'vanille';
      const $component = mount(Test, { props: { name } });

      const $el = $component.shadowRoot.querySelector('[data-id="name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(name);
    });

    test('can render with attributes as objects', () => {
      const user = { name: 'vanille' };
      const $component = mount(Test, { props: { user } });

      const $el = $component.shadowRoot.querySelector('[data-id="user.name"]');

      expect($el).toBeTruthy();
      expect($el.textContent).toBe(user.name);
    });
  });
});
