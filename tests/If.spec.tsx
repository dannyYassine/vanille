import { afterEach, describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import '../src/If';

describe('If.tsx', () => {
  describe('props value', () => {
    test('does render slot when value is true', () => {
      const $component = mount(
        <v-if value={true}>
          <div test-id="test-if"></div>
        </v-if>
      );

      const $el = $component.querySelector('slot');

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
      const $component = mount(
        <v-if value={false}>
          <div test-id="test-if"></div>
        </v-if>
      );

      let $el = $component.querySelector('slot');
      expect($el).toBeFalsy();

      $component.props.value = true;

      $el = $component.querySelector('slot');
      expect($el).toBeTruthy();
    });

    test('does not render slot when value is false', () => {
      const $component = mount(
        <v-if value={true}>
          <div test-id="test-if-2"></div>
        </v-if>
      );

      let $el = $component.querySelector('slot');
      expect($el).toBeTruthy();

      $component.props.value = false;

      $el = $component.querySelector('slot');
      expect($el).toBeFalsy();
    });
  });
});
