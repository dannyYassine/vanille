import { makeID } from './helpers/makeId';
import { snakeCase } from './helpers/snakeCase';

export function h(...args: any[]): any[] {
  return [...args];
}

window.h = h;

export function render(jsx: Array<unknown>, document) {
  const $scopedId = jsx.$scopedId ?? makeID();
  const el: string = jsx[0] as string;
  const attrs: null | object = jsx[1] as null | object;
  const children: Array<string | HTMLElement | Array<unknown>> = (() => {
    delete jsx[0];
    delete jsx[1];

    return [...jsx].filter((a) => !!a);
  })() as Array<string | HTMLElement | Array<unknown>>;

  const $elConstructor = el.name ? customElements.get(`v-${snakeCase(el.name)}`) : null;
  const $el: HTMLElement = $elConstructor ? new $elConstructor() : document.createElement(el);

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key.startsWith('on') && value instanceof Function) {
        if (key in $el) {
          $el[key.toLowerCase()] = value;
        } else {
          const event = key.substring(2);
          $el.addEventListener(event, value);
        }
        return;
      }
      if (!$el.props) {
        $el.props = {};
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
    children.forEach((child: string | HTMLElement | Array<unknown>) => {
      if (['string', 'number'].includes(typeof child)) {
        return $el.append(child);
      }

      child.$scopedId = $el.$scopedId;

      if ('nodeName' in child || child instanceof HTMLElement) {
        return $el.append(child);
      }
      $el.appendChild(render(child, document));
    });
  }

  return $el;
}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .replace('-', '');
}
