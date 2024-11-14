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
  } else if (template instanceof HTMLElement) {
    $el = template;
  } else {
    const engine = new TestEngine();
    $el = engine.buildElement(template);
  }
  $el.props = { ...$el.props, ...renderingOptions?.props };


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
  } else if (template instanceof HTMLElement) {
    $el = template;
  } else {
    const engine = new TestEngine();
    $el = engine.buildElement(template);
  }
  $el.props = { ...$el.props, ...renderingOptions?.props };

  document.body.appendChild($el);

  return $el!;
}