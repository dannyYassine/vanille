import { render } from '../../src/jsx';

type RenderingOptions = {
  props: Record<string, unknown>;
};

export function mount(
  template,
  renderingOptions?: RenderingOptions
): typeof ShadowRoot | null {
  let $el = null;
  try {
    if (!(template instanceof HTMLElement)) {
      template = new template();
    }
    template.props = { ...renderingOptions?.props };
    document.body.appendChild(template);

    return template;
  } catch (e) {
    $el = render(template, document);
  }

  document.body.appendChild($el);

  return $el;
}
