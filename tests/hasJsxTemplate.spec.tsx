import { describe, expect, test } from 'vitest';
import { define } from '../src/decorators/define';
import { BaseView } from '../src/BaseView';
import { mount } from './test-utils';

describe('function hasJsxTemplate', () => {
  test('add scopped data attributes', () => {
    const component: TestScoppedStyles = new TestScoppedStyles();
    component.$scopedId = 'v123456';

    const $component = mount(component);

    const $div = $component.shadowRoot.querySelector('div');
    const $a = $component.shadowRoot.querySelector('div a');

    expect($div.hasAttribute('v123456')).toBeTruthy();
    expect($a.hasAttribute('v123456')).toBeTruthy();
  });
});

@define()
class TestScoppedStyles extends BaseView {
  render() {
    return (
      <div ref="container">
        <a></a>
        <button ref="button"></button>
      </div>
    );
  }
}
