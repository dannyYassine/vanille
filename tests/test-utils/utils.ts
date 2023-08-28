import { render } from '../../src/jsx';

type RenderingOptions = {
    props: Record<string, unknown>
}

export function mount(template, renderingOptions?: RenderingOptions): typeof ShadowRoot | null {
    let $el = null
    try {
        template = new template();
        template.props = {...renderingOptions?.props};
        document.body.appendChild(template);

        return template.shadowRoot;
    } catch (e) {
        $el = render(template, document);
    }

    document.body.appendChild($el);

    return $el.shadowRoot;
}