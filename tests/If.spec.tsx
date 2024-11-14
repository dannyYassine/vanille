import { afterEach, describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import '../src/If';
import { state } from '../src/signals';

describe('If.tsx', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props value', () => {
    test('does render slot when value is true', () => {
      const $component = mount(
        <v-if value={true}>
          <div test-id="test-if"></div>
        </v-if>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('does not render slot when value is false', () => {
      const $component = mount(
        <v-if value={false}>
          <div test-id="test-if-2"></div>
        </v-if>
      );

      const $el = $component.querySelector('slot');

      expect($el).toBeFalsy();
    });
  });

  describe('props value reactivity', () => {
    test('does render slot when value changes to true', () => {
      const value = state(false);

      const $component = mount(
        <v-if value={value}>
          <div test-id="test-if"></div>
        </v-if>
      );

      let $el = $component.shadowRoot.querySelector('slot');
      expect($el).toBeFalsy();

      value.set(true);

      $el = $component.shadowRoot.querySelector('slot');
      expect($el).toBeTruthy();
    });

    test('does not render slot when value is false', () => {
      const value = state(true);

      const $component = mount(
        <v-if value={value}>
          <div test-id="test-if-2"></div>
        </v-if>
      );

      let $el = $component.shadowRoot.querySelector('slot');
      expect($el).toBeTruthy();

      value.set(false);

      $el = $component.shadowRoot.querySelector('slot');
      expect($el).toBeFalsy();
    });
  });
});
