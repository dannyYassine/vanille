import { afterEach, describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import '../src/List';
import { List } from '../src/List';

describe('List.tsx', () => {
  describe('props value', () => {
    test('does render slot when value is empty', () => {
      const array = [];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      const $el = $component.childNodes[1];
      expect($el).toBeFalsy();
    });

    test('does render slot when value has entries', () => {
      const array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      const $el = $component.childNodes[1];
      expect($el).toBeTruthy();

      const $elDiv = $component.querySelector('div[index="1"]');
      expect($elDiv).toBeTruthy();
    });

    test('does full update list when setting value', () => {
      let array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      const $el = $component.childNodes[1];
      expect($el).toBeTruthy();

      let $elDiv = $component.querySelector('div[index="1"]');
      expect($elDiv).toBeTruthy();
      $elDiv = $component.querySelector('div[index="2"]');
      expect($elDiv).toBeTruthy();

      $component.props.value = [3, 4];

      $elDiv = $component.querySelector('div[index="1"]');
      expect($elDiv).toBeFalsy();
      $elDiv = $component.querySelector('div[index="2"]');
      expect($elDiv).toBeFalsy();

      $elDiv = $component.querySelector('div[index="3"]');
      expect($elDiv).toBeTruthy();
      $elDiv = $component.querySelector('div[index="4"]');
      expect($elDiv).toBeTruthy();
    });
  });
});
