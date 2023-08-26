import { describe, expect, test, vi } from 'vitest';
import { BaseView } from '../src/BaseElement';
import { render } from '../src/jsx';
import { define } from '../src/decorators';
import { JSDOM } from 'jsdom';

describe('BaseView.tsx', () => {
  // describe('rendering', () => {
  //   test('can render', () => {
  //     const $el = render(<v-test />);

  //     expect($el.querySelector('test')).toBeTruthy();
  //   });
  // });

  describe('props', () => {
    test('can pass object props', () => {
      const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { runScripts: 'dangerously', resources: 'usable' });
      global.window = dom.window;
      const $el = render(<div><span test-id="test"></span></div>, dom.window.document);
      dom.window.document.body.appendChild($el);
      expect(dom.window.document.body.querySelector('[test-id="test"')).toBeTruthy();
    });
  });
});

@define()
class Test extends BaseView {
  render() {
    return <div test-id="test"></div>;
  }
}
