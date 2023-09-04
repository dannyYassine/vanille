import { describe, expect, test } from 'vitest';
import { define } from '../src/decorators/define';
import { BaseView } from '../src/BaseView';
import { mount } from './test-utils';

describe('function hasJsxTemplate', () => {
  test('add scopped data attributes', () => {
    const component: TestScoppedId = new TestScoppedId();
    component.$scopedId = 'v123456';

    const $component = mount(component);

    const $div = $component.shadowRoot.querySelector('div');
    const $a = $component.shadowRoot.querySelector('div a');

    expect($div.hasAttribute('v123456')).toBeTruthy();
    expect($a.hasAttribute('v123456')).toBeTruthy();
  });

  test('add scopped id to custom styles', () => {
    const component: TestScoppedStyles = new TestScoppedStyles();

    const $component = mount(component);

    const $div = $component.shadowRoot.querySelector('div');
    const $a = $component.shadowRoot.querySelector('div a');

    expect($component.shadowRoot.firstChild.textContent)
      .toBe(`div[${$component.$scopedId}] { 
      color: red;
    }
div[${$component.$scopedId}] a { 
      color: red;
    }
    `);
  });
});

@define()
class TestScoppedId extends BaseView {
  render() {
    return (
      <div ref="container">
        <a></a>
        <button ref="button"></button>
      </div>
    );
  }
}

@define()
class TestScoppedStyles extends BaseView {
  styles() {
    return `
    div {
      color: red;
    }
    div a {
      color: red;
    }
    `;
  }

  render() {
    return (
      <div ref="container">
        <a></a>
        <button ref="button"></button>
      </div>
    );
  }
}
