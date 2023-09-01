import { afterEach, describe, expect, test } from 'vitest';
import { mount } from './test-utils';
import '../src/Route';

let originalLocation = window.location;
describe('Route.tsx', () => {
  afterEach(() => {
    window.$location = originalLocation;
  });
  
    describe('prop path', () => {
      test('can render its slot on matching path', () => {
        const $location = {
          pathname: '/'
        }

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
          pathname: '/users/:id'
        }

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
        }

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

   describe('prop start-with', () => {
    test('can render its slot when path matches pathname', () => {
      const $location = {
        pathname: '/'
      }

      window.$location = $location;
      
      const $component = mount(
          <v-route start-with="/">
              <div test-id="test"></div>
          </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('can render its slot on path starts with pathname', () => {
      const $location = {
        pathname: '/long/url'
      }

      window.$location = $location;
      
      const $component = mount(
          <v-route start-with="/long">
              <div test-id="test"></div>
          </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('can render its slot on path starts with pathname with variables in uri', () => {
      const $location = {
        pathname: '/long/1/url'
      }

      window.$location = $location;

      const $component = mount(
          <v-route start-with="/long/:id">
              <div test-id="test"></div>
          </v-route>
      );

      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeTruthy();
    });

    test('cannot render its slot when path does not starts with pathname', () => {
      const $location = {
        pathname: '/random_path'
      }

      window.$location = $location;
      
      const $component = mount(
          <v-route start-with="/another">
              <div test-id="test"></div>
          </v-route>
      );
    
      const $el = $component.shadowRoot.querySelector('slot');

      expect($el).toBeFalsy();
    });
 });
});