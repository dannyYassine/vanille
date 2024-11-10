import { afterEach, describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import '../src/For';
import { For } from '../src/For';
import { state } from '../src/signals';

describe('For.tsx', () => {
  describe('props value', () => {
    test('does render slot when value is empty', () => {
      const array = state([]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      const $el = $component.childNodes[1];
      expect($el).toBeFalsy();
    });

    test('does render slot when value has entries', () => {
      const array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      const $el = $component.childNodes[1];
      expect($el).toBeTruthy();

      const $elDiv = $component.querySelector('div[index="1"]');
      expect($elDiv).toBeTruthy();
    });

    test('does full update For when setting value', () => {
      let array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      const $el = $component.childNodes[1];
      expect($el).toBeTruthy();

      let $elDiv = $component.querySelector('div[index="1"]');
      expect($elDiv).toBeTruthy();
      $elDiv = $component.querySelector('div[index="2"]');
      expect($elDiv).toBeTruthy();

      $component.props.items.set([3, 4]);

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
      const array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.push(3));

      expect($component.querySelector('div[index="3"]')).toBeTruthy();
    });

    test('does re-render when using pop', () => {
      const array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.pop());

      expect($component.querySelector('div[index="2"]')).toBeFalsy();
    });

    test('does re-render when using shift', () => {
      const array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.shift());

      expect($component.querySelector('div[index="1"]')).toBeFalsy();
    });

    test('does re-render when using unshift', () => {
      const array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.unshift(3));

      expect($component.querySelector('div[index="3"]')).toBeTruthy();
    });

    test('does re-render when using splice', () => {
      const array = state([1, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.splice(0, 1));

      expect($component.querySelector('div[index="1"]')).toBeFalsy();
    });

    test('does re-render when using sort', () => {
      const array = state([2, 1]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.sort());

      expect($component.root.querySelector('div[index="1"]')).toEqual($component.root.children[0]);
      expect($component.root.querySelector('div[index="2"]')).toEqual($component.root.children[1]);
    });

    test('does re-render when using reverse', () => {
      const array = state([1, 3, 2]);
      const $component = mount(<For items={array} template={(i) => <div index={i}>{i}</div>} />);

      $component.props.items.mutSet((a) => a.reverse());
      
      expect($component.root.querySelector('div[index="2"]')).toEqual($component.root.children[0]);
      expect($component.root.querySelector('div[index="3"]')).toEqual($component.root.children[1]);
      expect($component.root.querySelector('div[index="1"]')).toEqual($component.root.children[2]);
    });
  });
});
