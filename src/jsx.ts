import { makeID } from './helpers/makeId';
import { snakeCase } from './helpers/snakeCase';

export function h(...args: any[]): any[] {
  return [...args];
}
type HasScopedId = { $scopedId: string };
type HasProps = { props: { string: any } };
// @ts-ignore
window.h = h;

export function render(jsx: Array<unknown>, document: Document) {
  // @ts-ignore
  const $scopedId = jsx.$scopedId ?? makeID();
  const el: string = jsx[0] as string;
  const attrs: null | object = jsx[1] as null | object;
  const children: Array<(string | HTMLElement | Array<unknown>) & HasScopedId> = (() => {
    delete jsx[0];
    delete jsx[1];

    return [...jsx].filter((a) => !!a);
  })() as Array<(string | HTMLElement | Array<unknown>) & HasScopedId>;

  // @ts-ignore
  const $elConstructor = el?.name ? customElements.get(`v-${snakeCase(el.name)}`) : null;
  const $el: HTMLElement & HasScopedId & HasProps = $elConstructor
    ? (new $elConstructor() as HTMLElement & HasScopedId & HasProps)
    : (document.createElement(el) as HTMLElement & HasScopedId & HasProps);
  // @ts-ignore
  $el.props = {};

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key.startsWith('on') && value instanceof Function) {
        if (key in $el) {
          // @ts-ignore
          $el[key.toLowerCase()] = value;
        } else {
          const event = key.substring(2);
          $el.addEventListener(event, value);
        }
        return;
      }
      $el.props[camelize(key)] = value;
      try {
        $el.setAttribute(key, value);
      } catch (e) {}
    });
  }

  $el.$scopedId = $scopedId;
  $el.setAttribute($el.$scopedId, '');

  if (children.length) {
    children.forEach((child: (string | HTMLElement | Array<unknown>) & HasScopedId) => {
      if (['string', 'number'].includes(typeof child)) {
        return $el.append(child as string | Node);
      }

      child.$scopedId = $el.$scopedId;

      if ('nodeName' in (child as HTMLElement) || child instanceof HTMLElement) {
        return $el.append(child as HTMLElement);
      }
      $el.appendChild(render(child as Array<unknown>, document));
    });
  }

  return $el;
}

function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match: string, index: number) {
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .replace('-', '');
}
