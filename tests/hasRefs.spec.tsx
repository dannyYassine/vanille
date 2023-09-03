import { describe, expect, test } from 'vitest';
import { define } from '../src/decorators/define';
import { BaseView } from '../src/BaseView';
import { mount } from './test-utils';

describe('function hasJsxTemplate', () => {
  test("using refs retrieves the scoped html element in component's template", () => {
    const component: TestScoppedStyles = new TestScoppedStyles();
    component.$scopedId = 'v123456';

    const component2: TestScoppedStyles = new TestScoppedStyles();
    component2.$scopedId = 'v789012';

    const $component = mount(component);
    const $component2 = mount(component2);

    const $button = component.refs.button;
    const $button2 = component2.refs.button;

    expect($button).toBeTruthy();
    expect($button2).toBeTruthy();
    expect($button).not.toBe($button2);
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
