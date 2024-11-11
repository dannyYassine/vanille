import { View } from '../../src/View';
import { render } from '../../src/jsx';
import { TestEngine } from './TestEngine';

type RenderingOptions = {
  props: Record<string, unknown>;
};

export function mount<V>(
  template,
  renderingOptions?: RenderingOptions
): typeof HTMLElement & View<V> {
  let $el = null;

  if (Array.isArray(template)) {
    $el = render(template);
  } else {
    $el = typeof template === 'function' ? new template() : template;
    $el.props = { ...$el.props, ...renderingOptions?.props };
  }

  document.body.appendChild($el);

  return $el!;
}

export function shallowMount<V>(
  template,
  renderingOptions?: RenderingOptions
): typeof HTMLElement & View<V> {
  let $el = null;

  if (Array.isArray(template)) {
    $el = render(template, new TestEngine());
  } else {
    // customElements.define(`v-${template.name.toLowerCase()}`, template);

    $el = typeof template === 'function' ? new template() : template;
    $el.props = { ...$el.props, ...renderingOptions?.props };
  }

  document.body.appendChild($el);

  return $el!;
}