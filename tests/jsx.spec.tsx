import { describe, expect, test } from 'vitest';
import { mount } from './test-utils';

describe('jsx.tsx', () => {
  describe('function render', () => {
    test('renders template with no children', () => {
      const $component = mount(<div test-id="test"></div>);

      const $el = document.querySelector('[test-id="test"');

      expect($component).toBeTruthy();
      expect($el).toBeTruthy();
    });

    test('add scoped-id to all html elements in component', () => {
      const $component = mount(
        <div>
          <a></a>
        </div>
      );
      const $a = $component.querySelector('a');

      const $divAttributes = $component.getAttributeNames();
      const $aAttributes = $a.getAttributeNames();
      expect($aAttributes).toEqual($divAttributes);
      expect($divAttributes.length).toEqual(1);
      expect($aAttributes.length).toEqual(1);

      const $aScopedId = $aAttributes[0];
      expect($aScopedId.startsWith('v')).toBeTruthy();
      let id = $aScopedId.substring(1);
      expect(/^[A-Za-z0-9]*$/.test(id)).toBe(true);
      expect(id.length).toBe(8);

      const $divScopedId = $divAttributes[0];
      expect($divScopedId.startsWith('v')).toBeTruthy();
      id = $divScopedId.substring(1);
      expect(/^[A-Za-z0-9]*$/.test(id)).toBe(true);
      expect(id.length).toBe(8);
    });
  });
});
