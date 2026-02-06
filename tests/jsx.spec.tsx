import { afterEach, describe, expect, test, vi } from 'vitest';
import { mount } from './test-utils';
import { Test, TestWithClassComponents } from './test-utils/Test';
import { View } from '../src/View';
import { shallowMount } from './test-utils/utils';
import { Signal, computed, state } from '../src/signals';

describe('jsx.tsx', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('function render', () => {
    test('renders template with no children', () => {
      const $component = mount(<div test-id="test"></div>);

      const $el = document.querySelector('[test-id="test"');

      expect($component).toBeTruthy();
      expect($el).toBeTruthy();
    });

    test('renders template with children as array', () => {
      function App() {
        const array = [<div id="1"></div>, <div id="2"></div>];

        return (<div parent>
          {array}
        </div>);
      }

      const $component = mount(App);
      const $parent = $component.root.querySelector('[parent]');

      expect($parent?.children.length).toEqual(2);
      expect($parent.querySelector('[id="1"]')).toBeTruthy();
      expect($parent.querySelector('[id="2"]')).toBeTruthy();
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

      await new Promise((resolve) => {
        setTimeout(() => {
          expect(spyFn).toHaveBeenCalled();
          resolve();
        }, 1000);
      });
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

      await new Promise((resolve) => {
        setTimeout(() => {
          expect(spyFn).toHaveBeenCalled();
          resolve();
        }, 1000);
      });
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

    test('should render computed as a child', () => {
      const signal = state(0);

      function App() {
        const compute = computed(() => signal.get());

        return <div>{compute}</div>
      }

      const $component = mount(App);

      expect($component.root.querySelector('div')!.textContent).toEqual("0");

      signal.set(1);

      expect($component.root.querySelector('div')!.textContent).toEqual("1");
    });

    test('should render computed as an attribute', () => {
      const signal = state(0);

      function App() {
        const compute = computed(() => signal.get());

        return <div value={compute}></div>
      }

      const $component = mount(App);

      expect($component.root.querySelector('div')?.getAttribute('value')).toEqual("0");

      signal.set(1);

      expect($component.root.querySelector('div')?.getAttribute('value')).toEqual("1");
    });
  });

  describe('render functional', () => {
    test('def outputs all methods', () => {
      function App(){
        this.myMethod = () => {

        };
        return <div data-test="app"></div>
      }
      const $component = mount(App);

      expect($component.def().myMethod).toBeTruthy();
    });

    test('def bind this context to all methods', () => {
      let self = null;
      let didExecuteMethod = false;
      class App extends View {
        render() {
          return <div data-test="app" onclick={this.def().myMethod}></div>
        }

        myMethod() {
          didExecuteMethod = true;
          expect(this).toEqual(self);
        }
      }
      const $component = mount(App);
      self = $component!;

      $component.root.querySelector('[data-test="app"]').onclick()

      expect(didExecuteMethod).toBeTruthy();
    });
  })

  describe.skip('shallow mount', () => {
    test('can shallow mount', () => {
      const $component = shallowMount(ParentTest);

      expect($component.refs.child).toBeFalsy();
    });
  })
});

class ParentTest extends View {
  render() {
    return <v-child-test ref="child" onTestEvent={(e) => this.onEvent(e)}></v-child-test>;
  }

  onEvent(e) {
    this.emit('onParentEvent', e.detail);
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
