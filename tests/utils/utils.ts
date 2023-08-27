import { render } from '../../src/jsx';

export function mount(jsx) {
    const $el = render(jsx, document);
    document.body.appendChild($el);
    return $el.shadowRoot;
}