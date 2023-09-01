export function h(...args: any[]): any[] {
  return [...args];
}

window.h = h;

export function render(jsx: Array<unknown>, document) {
  const el: string = jsx[0] as string;
  const attrs: null | object = jsx[1] as null | object;
  const children: Array<string | HTMLElement | Array<unknown>> = (() => {
    delete jsx[0];
    delete jsx[1];

    return [...jsx].filter((a) => !!a);
  })() as Array<string | HTMLElement | Array<unknown>>;

  const $el: HTMLElement = document.createElement(el);

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key.startsWith('on') && value instanceof Function) {
        $el[key.toLowerCase()] = value;
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
  if (children) {
    children.forEach((child: string | HTMLElement | Array<unknown>) => {
      if (['string', 'number'].includes(typeof child)) {
        return $el.append(child);
      }
      if ('nodeName' in child || child instanceof HTMLElement) {
        return $el.append(child);
      }
      $el.appendChild(render(child, document));
    });
  }

  return $el;
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  }).replace('-', '');
}
