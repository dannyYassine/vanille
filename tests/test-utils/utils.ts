import { render } from '../../src/jsx';

type RenderingOptions = {
  props: Record<string, unknown>;
};

export function mount(
  template,
  renderingOptions?: RenderingOptions
): typeof HTMLElement | null {
  let $el = null;

  if (Array.isArray(template)) {
    $el = render(template, document);
  } else {
    $el = typeof template === 'function' ? new template() : template;
    $el.props = { ...$el.props, ...renderingOptions?.props };
  }

  document.body.appendChild($el);

  return $el;
}
