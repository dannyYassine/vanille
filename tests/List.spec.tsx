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

    test('does re-render when using push', () => {
      const array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.push(3);

      expect($component.querySelector('div[index="3"]')).toBeTruthy();
    });

    test('does re-render when using pop', () => {
      const array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.pop();

      expect($component.querySelector('div[index="2"]')).toBeFalsy();
    });

    test('does re-render when using shift', () => {
      const array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.shift();

      expect($component.querySelector('div[index="1"]')).toBeFalsy();
    });

    test('does re-render when using unshift', () => {
      const array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.unshift(3);

      expect($component.querySelector('div[index="3"]')).toBeTruthy();
    });

    test('does re-render when using splice', () => {
      const array = [1, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.splice(0, 1);

      expect($component.querySelector('div[index="1"]')).toBeFalsy();
    });

    test('does re-render when using sort', () => {
      const array = [2, 1];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.sort();

      expect($component.querySelector('div[index="1"]')).toEqual($component.children[0]);
      expect($component.querySelector('div[index="2"]')).toEqual($component.children[1]);
    });

    test('does re-render when using sort', () => {
      const array = [1, 3, 2];
      const $component = mount(<List value={array} item={(i) => <div index={i}>{i}</div>} />);

      $component.props.value.reverse();

      expect($component.querySelector('div[index="2"]')).toEqual($component.children[0]);
      expect($component.querySelector('div[index="3"]')).toEqual($component.children[1]);
      expect($component.querySelector('div[index="1"]')).toEqual($component.children[2]);
    });
  });
});
