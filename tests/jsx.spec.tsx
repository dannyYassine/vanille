import { describe, expect, test, vi } from 'vitest';
import { mount } from './test-utils';
import { BaseView } from './../src/BaseView';
import { Test, TestWithClassComponents } from './test-utils/Test';
import { View } from '../src/View';

describe('jsx.tsx', () => {
  describe('function render', () => {
    test('renders template with no children', () => {
      const $component = mount(<div test-id="test"></div>);

      const $el = document.querySelector('[test-id="test"');

      expect($component).toBeTruthy();
      expect($el).toBeTruthy();
    });

    test('able to render jsx with class', () => {
      const $component = mount(<TestWithClassComponents />);

      const $el = $component.refs.test.shadowRoot.querySelector('[data-id="test"]');

      expect($el).toBeTruthy();
    });

    test('able to listen to custom events using "on" at beginning of the event name', async () => {
      const spyFn = vi.fn();
      const $component = mount(<v-emit-test onEmit={() => spyFn()}></v-emit-test>);

      const $button = $component.refs.button;

      $button.click();

      expect(spyFn).toHaveBeenCalled();
    });

    test('able propagate data up in the event', async () => {
      const spyFn = vi.fn();
      const spyFunction = (e) => {
        expect(e.detail).toEqual({ customData: '' });
        spyFn();
      };
      const $component = mount(<v-parent-test onParentEvent={(e) => spyFunction(e)}></v-parent-test>);

      const $button = $component.refs.child.refs.button;

      $button.click();

      expect(spyFn).toHaveBeenCalled();
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


class ParentTest extends View {
  render() {
    return <v-child-test ref="child" onTestEvent={(e) => this.onEvent(e)}></v-child-test>;
  }

  onEvent(e) {
    this.emit('ParentEvent', e.detail);
  }
}
customElements.define(`v-parent-test`, ParentTest);


class ChildTest extends View {
  render() {
    return <button ref="button" onclick={() => this.emit('onTestEvent', { customData: '' })}></button>;
  }
}
customElements.define(`v-child-test`, ChildTest);


class EmitTest extends View {
  render() {
    return <button ref="button" onclick={(e) => this.emit('onEmit')}></button>;
  }
}
customElements.define(`v-emit-test`, EmitTest);
