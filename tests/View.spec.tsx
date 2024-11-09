import { describe, expect, test, afterEach } from 'vitest';
import { mount } from './test-utils';
import { Test, TestWithData, TestWithPropListeners } from './test-utils/Test';
import { computed, state } from '../src/signals';

describe.only('View.tsx', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

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

  describe('rendering as class', () => {
    test('can render its own template with JSX', () => {
      const $component = mount(Test);

      const $el = $component.shadowRoot.querySelector('[data-id="test"');

      expect($el).toBeTruthy();
    });
  });

  describe('getter refs', () => {
    test('dynamically queries DOM element as getter properties', () => {
      const $component = mount(<v-test name={'vanille'} />);

      const $el = $component.refs.name;

      expect($el).toBeTruthy();
      expect($el instanceof HTMLElement).toBeTruthy();
      expect($el.textContent).toBe('vanille');
    });
  });

  describe('function updateRender', () => {
    test('does a full refresh of the DOM template', () => {
      const $component = mount<{name: string}>(<v-test name={'vanille'} />);

      let $el = $component.refs.name;

      $component.props.name = 'strawberry';

      expect($el.textContent).toBe('vanille');

      $component.updateRender();
      
      $el = $component.refs.name;

      expect($el.textContent).toBe('strawberry');
    });
  });

  describe('props', () => {
    test('trigger listeners when lower properties changed', () => {
      const user = state({
        name: 'vanille' 
    });
      const $component = mount(<v-test-with-prop-listeners user={user} />);

      let $el = $component.refs.username;

      expect($el.textContent).toBe('vanille');

      user.set({
        name: 'strawberry' 
      });

      expect($el.textContent).toBe('strawberry');
    });
  });

  describe('jsx template', () => {
    test('can assign events starting with <on*>', () => {
      const user = {
          name: 'vanille' 
      };
      const $component = mount(<v-test user={user} onclick={() => user.name = 'strawberry'} />);

      expect($component.onclick).toBeDefined();
      $component.onclick();
      expect(user.name).toBe('strawberry');
    });

    test('can render html element as expressions', () => {
      const $p = document.createElement('p');
      $p.setAttribute('ref', 'slotvanilla');
      $p.textContent = 'slot vanilla';

      const $component = mount(
        <v-test>
          {$p}
        </v-test>
      );

      expect($component.querySelector('[ref="slotvanilla"]')).not.toBeNull();
      expect($component.querySelector('[ref="slotvanilla"]').textContent).toBe('slot vanilla');
    });

    test('can render signal as expressions', () => {
      const name = state('name');
      
      const $component = mount(
        <v-test>
          {name}
        </v-test>
      );

      expect($component.textContent).toBe('name');
    });

    test('can render signal as reactive expressions', () => {
      const name = state('name');
      
      const $component = mount(
        <v-test>
          {name}
        </v-test>
      );

      expect($component.textContent).toBe('name');

      name.set('new name');

      expect($component.textContent).toBe('new name');
    });

    test('can render computed as expressions', () => {
      const name = state('name');
      const nameFormatted = computed(() => `name: ${name.get()}`);
      
      const $component = mount(
        <v-test>
          {nameFormatted}
        </v-test>
      );

      expect($component.textContent).toBe(`name: name`);
    });

    test('can render computed as reactive expressions', () => {
      const name = state('name');
      const nameFormatted = computed(() => `name: ${name.get()}`);
      
      const $component = mount(
        <v-test>
          {nameFormatted}
        </v-test>
      );

      expect($component.textContent).toBe(`name: name`);

      name.set('new name');

      expect($component.textContent).toBe(`name: new name`);
    });

    test('can render computed as child function expressions', () => {
      const name = state('name');
      const nameFormatted = () => `name: ${name.get()}`;
      
      const $component = mount(
        <v-test>
          {nameFormatted}
        </v-test>
      );

      expect($component.textContent).toBe(`name: name`);
    });

    test('can render computed as child reactive expressions', () => {
      const name = state('name');
      const nameFormatted = () => `name: ${name.get()}`;

      const $component = mount(
        <v-test>
          {nameFormatted}
        </v-test>
      );

      expect($component.textContent).toBe(`name: name`);

      name.set('new name');

      expect($component.textContent).toBe(`name: new name`);
    });


    test('can render signal as child function attributes', () => {
      const name = state('name');
      
      const $component = mount(
        <v-test>
          <p test-id="computed" value={name}></p>
        </v-test>
      );

      expect($component.querySelector('p[test-id="computed"]')?.getAttribute('value')).toBe(`name`);
    });

    test('can render signal as child reactive expressions', () => {
      const name = state('name');
      
      const $component = mount(
        <v-test>
          <p test-id="computed" value={name}></p>
        </v-test>
      );

      expect($component.querySelector('p[test-id="computed"]')?.getAttribute('value')).toBe(`name`);
      name.set('new name');

      expect($component.querySelector('p[test-id="computed"]')?.getAttribute('value')).toBe(`new name`);
    });

    test('can render computed as child function attributes', () => {
      const name = state('name');
      const nameFormatted = () => `name: ${name.get()}`;
      
      const $component = mount(
        <v-test>
          <p test-id="computed" value={nameFormatted}></p>
        </v-test>
      );

      expect($component.querySelector('p[test-id="computed"]')?.getAttribute('value')).toBe(`name: name`);
    });

    test('can render computed as child reactive expressions', () => {
      const name = state('name');
      const nameFormatted = () => `name: ${name.get()}`;

      const $component = mount(
        <v-test>
          <p test-id="computed" value={nameFormatted}></p>
        </v-test>
      );

      expect($component.querySelector('p[test-id="computed"]')?.getAttribute('value')).toBe(`name: name`);
      name.set('new name');

      expect($component.querySelector('p[test-id="computed"]')?.getAttribute('value')).toBe(`name: new name`);    
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
