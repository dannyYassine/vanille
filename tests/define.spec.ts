import { describe, expect, test } from 'vitest';
import { define } from '../src/decorators/define';
import { BaseView } from '../src/BaseView';

describe('decorator define', () => {
  test('calling define should add web component to registry', () => {
    define()(TestDefine);

    expect(window.customElements.get('v-test-define')).toBe(TestDefine);
  });

  test('loading the same web components multiple time causes no error', () => {
    define()(TestDefine);
    define()(TestDefine);

    expect(window.customElements.get('v-test-define')).toBe(TestDefine);
  });
});

class TestDefine extends BaseView {
  render() {
    return [];
  }
}
