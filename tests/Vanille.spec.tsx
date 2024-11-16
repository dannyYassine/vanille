import { describe, expect, test, afterEach } from 'vitest';
import { mount } from './test-utils';
import Vanille from '../src/Vanille';

describe('Vanille.ts', () => {
  afterEach(() => {
    Vanille.setStyles('');
  });

  describe('setStyles', () => {
    test('can set styles', () => {
      const styles = '<style>123</style>';
      Vanille.setStyles(styles);

      const result = Vanille.getStyles();

      expect(result).toEqual(styles);
    });

    test('can set styles to each component', () => {
        function App() {
            return <div></div>;
        }
        const styles = '<style>div { color: red }</style>';
        Vanille.setStyles(styles);
  
        const $component = mount(App);
        
        expect($component.root.children.item(0)?.innerHTML).toEqual(`<style>div[${$component.$scopedId}] {  color: red }</style>`);
      });
  });
});