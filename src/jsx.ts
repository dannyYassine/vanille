import { Engine } from './Engine';
import { generateRandomString } from './helpers/random';
import { computed, Signal } from './signals';

export function h(...args: any[]): any[] {
  return [...args];
}

type HasScopedId = { $scopedId: string };
type HasProps = { props: { string: any } };
// @ts-ignore
window.h = h;

export function render(
  jsx: Array<unknown>,
  engine: Engine = new Engine()
): HTMLElement & HasScopedId & HasProps {
  const [tagName, attrs, ...children] = jsx;
  const $scopedId = (jsx as any).$scopedId ?? `v${generateRandomString(8)}`;

  const $el = engine.buildElement(tagName as string);
  initializeElement($el, $scopedId);

  if (attrs) {
    applyAttributes($el, attrs as object);
  }

  if (children.length) {
    children.filter(Boolean).forEach((child) => renderChild($el, child as any, engine));
  }

  return $el;
}

function initializeElement(
  $el: HTMLElement & HasScopedId & HasProps,
  $scopedId: string
): void {
  $el.props = {};
  $el.$scopedId = $scopedId;
  $el.setAttribute($scopedId, '');
}

function applyAttributes(
  $el: HTMLElement & HasScopedId & HasProps,
  attrs: object
): void {
  Object.entries(attrs).forEach(([key, value]) => {
    if (isEventHandler(key, value)) {
      handleEvent($el, key, value);
      return;
    }

    $el.props[key] = value;
    handleAttributeValue($el, key, value);
  });
}

function isEventHandler(key: string, value: any): boolean {
  return key.startsWith('on') && value instanceof Function;
}

function handleEvent($el: HTMLElement, key: string, handler: Function): void {
  if (key in $el) {
    ($el as any)[key.toLowerCase()] = handler;
  } else {
    $el.addEventListener(key, handler as EventListener);
  }
}

function handleAttributeValue(
  $el: HTMLElement & HasProps,
  key: string,
  value: any
): void {
  if (typeof value === 'function') {
    handleComputedValue($el, key, value);
  } else if (value instanceof Signal) {
    handleSignalValue($el, key, value);
  } else {
    safeSetAttribute($el, key, value);
  }
}

function handleComputedValue(
  $el: HTMLElement & HasProps,
  key: string,
  value: Function
): void {
  const $c = computed(value.bind($el));
  if (!$el.$c) $el.$c = [];
  $el.$c.push($c);

  $c.subscribe((val) => {
    if (key in $el) {
      $el[key] = val;
    }
    safeSetAttribute($el, key, val);
  });

  safeSetAttribute($el, key, $c.get());
}

function handleSignalValue(
  $el: HTMLElement,
  key: string,
  signal: Signal
): void {
  signal.subscribe((val) => {
    if (key in $el) {
      $el[key] = val;
    }
    safeSetAttribute($el, key, val);
  });
  safeSetAttribute($el, key, signal.get());
}

function safeSetAttribute($el: HTMLElement, key: string, value: any): void {
  try {
    if (key in $el) {
      $el[key] = value;
    }
    $el.setAttribute(key, value);
  } catch (e) {
    // Silently handle invalid attribute values
  }
}

function renderChild(
  $el: HTMLElement,
  child: (string | HTMLElement | Array<unknown>) & HasScopedId,
  engine: Engine
): void {
  if (isNestedArray(child)) {
    (child as Array<unknown>).forEach((c) => renderChild($el, c as any, engine));
    return;
  }

  if (isPrimitive(child)) {
    $el.append(child as string | Node);
    return;
  }

  if (child instanceof Signal) {
    renderSignalChild($el, child);
    return;
  }

  if (typeof child === 'function') {
    renderComputedChild($el, child);
    return;
  }

  if (isHTMLElement(child)) {
    (child as any).$scopedId = $el.$scopedId;
    $el.append(child as HTMLElement);
    return;
  }

  (child as any).$scopedId = $el.$scopedId;
  $el.appendChild(render(child as Array<unknown>, engine));
}

function isNestedArray(child: any): boolean {
  return (
    Array.isArray(child) &&
    ((typeof child[0] === 'string' && typeof child[1] !== 'object') ||
      Array.isArray(child[0]))
  );
}

function isPrimitive(child: any): boolean {
  return ['string', 'number'].includes(typeof child);
}

function isHTMLElement(child: any): boolean {
  return 'nodeName' in child || child instanceof HTMLElement;
}

function renderSignalChild($el: HTMLElement, signal: Signal): void {
  const uuid = generateRandomString(8);

  $el.insertAdjacentHTML(
    'beforeend',
    `<!--${uuid}-->${signal.get()}<!--${uuid}-->`
  );

  signal.subscribe((newValue) => {
    updateSignalContent($el, uuid, newValue);
  });
}

function renderComputedChild($el: HTMLElement, f: Function): void {
  const uuid = generateRandomString(8);

  const $c = computed(f);

  if (!$el.$c) $el.$c = [];
  $el.$c.push($c);

  $el.insertAdjacentHTML(
    'beforeend',
    `<!--${uuid}-->${$c.get()}<!--${uuid}-->`
  );

  $c.subscribe((newValue) => {
    updateSignalContent($el, uuid, newValue);
  });
}

function updateSignalContent(
  $el: HTMLElement,
  uuid: string,
  newValue: string
): void {
  const range = new Range();
  const [startComment, endComment] = findCommentPair($el, uuid);

  if (startComment && endComment) {
    range.setStartAfter(startComment);
    range.setEndBefore(endComment);
    range.deleteContents();
    range.insertNode(document.createTextNode(newValue));
  }
}

function findCommentPair($el: HTMLElement, uuid: string): [Comment?, Comment?] {
  const comments = Array.from($el.childNodes).filter(
    (node) => node.nodeType === 8 && node.textContent === uuid
  );
  return [comments[0] as Comment, comments[1] as Comment];
}
