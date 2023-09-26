import { makeID } from './helpers/makeId';
import { snakeCase } from './helpers/snakeCase';
import { camelize } from './helpers/camelize';

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
        let mods = undefined;
        if (key.includes(':')) {
          mods = key.split(':');
          key = mods[0];
          delete mods[0];
          mods = mods[1].split('-');
        }
        if (key in $el) {
          if (mods?.includes('outside')) {
            mods = mods.filter((mod) => mod !== 'outside');
            handleClickOutside($el, value, mods);
          } else {
            // @ts-ignore
            $el[key.toLowerCase()] = buildFn($el, value, mods);
          }
        } else {
          const event = key.substring(2);
          $el.addEventListener(event, buildFn($el, value, mods));
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

const buildFn = ($el, value, mods: string[] = []) => {
  return function (e): Function {
    if (mods.length) {
      const results = mods.filter((mod: string) => {
        return !eventModifiersMap[mod]($el)(e);
      });
      if (results.length) {
        return;
      }
    }

    return value(...arguments);
  };
};

const handleClickOutside = ($el, value, mods = []) => {
  document.addEventListener('click', function (e) {
    const rects = $el.getBoundingClientRect();
    if (
      e.clientX < rects.x ||
      e.clientX > rects.x + rects.width ||
      e.clientY < rects.y ||
      e.clientY > rects.y + rects.height
    ) {
      buildFn($el, value, mods)(e);
    }
  });
};

const eventModifiersMap = {
  prevent: ($el) => {
    return (e: Event) => {
      e.preventDefault();
      return true;
    };
  },
  stop: ($el) => {
    return (e: Event) => {
      e.stopPropagation();
      return true;
    };
  },
  once: function ($el) {
    return function (e: Event) {
      const result = !!$el._clicked;
      $el._clicked = true;
      return !result;
    };
  }
};
