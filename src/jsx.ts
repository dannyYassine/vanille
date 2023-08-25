export function h(...args: any[]): any[] {
  return [...args];
}

window.h = h;

export function render(jsx: Array<unknown>) {
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
      $el.props[key] = value;
      $el.setAttribute(key, value);
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
      $el.appendChild(render(child));
    });
  }

  return $el;
}
