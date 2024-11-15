import { afterEach, describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import '../src/Route';

let originalLocation = window.location;
describe('Route.tsx', () => {
  afterEach(() => {
    window.$location = originalLocation;
    document.body.innerHTML = '';
  });

  describe('missing path and startWith props', () => {
    test('does not render slot', () => {
      const $location = {
        pathname: '/'
      };
      window.$location = $location;

      const $component = mount(
        <v-route>
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.querySelector('slot');

      expect($el).toBeFalsy();
    });
  });

  describe('prop path', () => {
    test('can render its slot on matching path', () => {
      const $location = {
        pathname: '/'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/">
          <div test-id="test"></div>
        </v-route>
      );
        
      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('can render its slot on matching path with variables', () => {
      const $location = {
        pathname: '/users/1'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/users/:id">
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('cannot render its slot on none matching path', () => {
      const $location = {
        pathname: '/random_path'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/">
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeFalsy();
    });
  });

  describe('prop startWith', () => {
    test('can render its slot when path matches pathname', () => {
      const $location = {
        pathname: '/'
      };

      window.$location = $location;

      const $component = mount(
        <v-route startWith="/">
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('can render its slot on path starts with pathname', () => {
      const $location = {
        pathname: '/long/url'
      };

      window.$location = $location;

      const $component = mount(
        <v-route startWith="/long">
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('can render its slot on path starts with pathname with variables in uri', () => {
      const $location = {
        pathname: '/long/1/url'
      };

      window.$location = $location;

      const $component = mount(
        <v-route startWith="/long/:id">
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('cannot render its slot when path does not starts with pathname', () => {
      const $location = {
        pathname: '/random_path'
      };

      window.$location = $location;

      const $component = mount(
        <v-route startWith="/another">
          <div test-id="test"></div>
        </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeFalsy();
    });
  });

  describe('using history.pushState', () => {
    test('going to new route, renders slot', () => {
      let $location = {
        pathname: '/'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/home">
          <div test-id="test"></div>
        </v-route>
      );

      expect($component.shadowRoot.querySelector('slot')).toBeFalsy();

      window.$location.pathname = '/home';
      window.history.pushState({}, '', '/home');

      expect($component.shadowRoot.querySelector('slot')).toBeTruthy();
    });

    test('when navigating to new route, does not render slot', () => {
      let $location = {
        pathname: '/home'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/home">
          <div test-id="test"></div>
        </v-route>
      );

      expect($component.shadowRoot.querySelector('slot')).toBeTruthy();

      window.$location.pathname = '/';
      window.history.pushState({}, '', '/');

      expect($component.shadowRoot.querySelector('slot')).toBeFalsy();
    });
  });

  describe('using history.replaceState', () => {
    test('going to new route, renders slot', () => {
      let $location = {
        pathname: '/'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/home">
          <div test-id="test"></div>
        </v-route>
      );

      expect($component.shadowRoot.querySelector('slot')).toBeFalsy();

      window.$location.pathname = '/home';
      window.history.replaceState({}, '', '/home');

      expect($component.shadowRoot.querySelector('slot')).toBeTruthy();
    });

    test('when navigating to new route, does not render slot', () => {
      let $location = {
        pathname: '/home'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/home">
          <div test-id="test"></div>
        </v-route>
      );

      expect($component.shadowRoot.querySelector('slot')).toBeTruthy();

      window.$location.pathname = '/';
      window.history.replaceState({}, '', '/');

      expect($component.shadowRoot.querySelector('slot')).toBeFalsy();
    });
  });

  describe('triggering popstate', () => {
    test('going to new route, then back, renders slot', async () => {
      let $location = {
        pathname: '/'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/home">
          <div test-id="test"></div>
        </v-route>
      );

      expect($component.shadowRoot.querySelector('slot')).toBeFalsy();

      window.$location.pathname = '/home';
      window.history.pushState({}, '', '/home');

      expect($component.shadowRoot.querySelector('slot')).toBeTruthy();

      window.$location.pathname = '/';
      window.history.back();

      setTimeout(() => {
        expect($component.shadowRoot.querySelector('slot')).toBeFalsy();
      }, 1000);
    });

    test('going to new route, then back, renders slot', async () => {
      let $location = {
        pathname: '/home'
      };

      window.$location = $location;

      const $component = mount(
        <v-route path="/home">
          <div test-id="test"></div>
        </v-route>
      );

      expect($component.shadowRoot.querySelector('slot')).toBeTruthy();

      window.$location.pathname = '/';
      window.history.pushState({}, '', '/');

      expect($component.shadowRoot.querySelector('slot')).toBeFalsy();

      window.$location.pathname = '/home';
      window.history.back();

      setTimeout(() => {
        expect($component.shadowRoot.querySelector('slot')).toBeTruthy();
      }, 1000);
    });
  });
});
