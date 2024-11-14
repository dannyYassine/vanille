var S = Object.defineProperty;
var T = (s, e, t) => e in s ? S(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var c = (s, e, t) => (T(s, typeof e != "symbol" ? e + "" : e, t), t);
const f = (s) => {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: s },
    () => e.charAt(Math.floor(Math.random() * e.length))
  ).join("");
};
class m {
  constructor(e) {
    c(this, "value");
    c(this, "subscribers");
    this.value = e, this.subscribers = /* @__PURE__ */ new Set();
  }
  get() {
    return globalThis.trackDependency && globalThis.trackDependency(this), this.value;
  }
  set(e) {
    if (typeof e == "function" && (e = e(this.value)), this.value !== e) {
      const t = this.value;
      this.value = e, this.notifySubscribers(this.value, t);
    }
  }
  mutSet(e) {
    const t = this.value;
    typeof e == "function" && e(this.value), this.notifySubscribers(this.value, t);
  }
  subscribe(e) {
    const t = () => {
      this.unsubscribe(e);
    };
    return this.subscribers.add(e), t;
  }
  // Unsubscribe from changes
  unsubscribe(e) {
    this.subscribers.delete(e);
  }
  notifySubscribers(e, t) {
    this.subscribers.forEach((n) => n(this.value, t));
  }
}
class I extends m {
  constructor(t) {
    super();
    c(this, "computeFn");
    c(this, "dependencies");
    // Method to call when a dependency changes
    c(this, "update", () => {
      this.compute();
    });
    this.computeFn = t, this.value = void 0, this.subscribers = /* @__PURE__ */ new Set(), this.dependencies = /* @__PURE__ */ new Set(), this.compute(!0);
  }
  // Get the computed value
  get() {
    return globalThis.trackDependency && globalThis.trackDependency(this), this.value;
  }
  // Compute the value and track dependencies
  compute(t) {
    if (t) {
      const r = (i) => {
        this.dependencies.add(i), i.subscribe(this.update);
      };
      globalThis.trackDependency = r;
    }
    const n = this.computeFn();
    if (delete globalThis.trackDependency, n !== this.value) {
      const r = this.value;
      this.value = n, this.notifySubscribers(this.value, r);
    }
  }
  // Subscribe to changes
  subscribe(t) {
    const n = () => {
      this.unsubscribe(t);
    };
    return this.subscribers.add(t), n;
  }
  // Unsubscribe from changes
  unsubscribe(t) {
    this.subscribers.delete(t);
  }
  // Notify subscribers of value change
  notifySubscribers(t, n) {
    this.subscribers.forEach((r) => r(this.value, n));
  }
}
function A(s) {
  const e = [];
  return globalThis.trackDependency = (n) => {
    n.subscribe(s), e.push(n);
  }, s(), delete globalThis.trackDependency, () => {
    e.forEach((n) => {
      n.unsubscribe(s);
    });
  };
}
const U = (s) => new m(s), g = (s) => new I(s);
class $ {
  constructor() {
    c(this, "styles", "");
  }
  setStyles(e) {
    this.styles = e;
  }
  getStyles() {
    return this.styles;
  }
}
const w = new $();
var y = /* @__PURE__ */ ((s) => (s.OPEN = "open", s.CLOSED = "closed", s[s.NONE = void 0] = "NONE", s))(y || {});
class p extends HTMLElement {
  constructor(t = y.OPEN) {
    super();
    c(this, "props");
    c(this, "styleTag");
    c(this, "refs");
    c(this, "$c");
    c(this, "$scopedId");
    this.$c = [], t && this.attachShadow({ mode: t }), this.refs = new Proxy(
      {},
      {
        get: (n, r) => this.root.querySelector(
          `[${this.$scopedId}][ref=${r}]`
        )
      }
    );
  }
  get root() {
    return this.shadowRoot ? this.shadowRoot : this;
  }
  styles() {
    return "";
  }
  def() {
    const t = (r, i) => {
      const o = this[i];
      return typeof o == "function" ? r[i] = o.bind(this) : r[i] = o, r;
    }, n = Object.getOwnPropertyNames(this).reduce(t, {});
    return Object.getOwnPropertyNames(this.__proto__).reduce(t, n);
  }
  connectedCallback() {
    this.updateRender(), this.connected();
  }
  disconnectedCallback() {
    this.disconnected();
  }
  adoptedCallback() {
    this.adopted();
  }
  attributeChangedCallback(t, n, r) {
    this.attributeChanged(t, n, r);
  }
  connected() {
  }
  disconnected() {
  }
  adopted() {
  }
  attributeChanged(t, n, r) {
  }
  createStyleTag() {
    `${this.styles()} ${w.getStyles()}` && (this.styleTag = document.createElement("style"), A(() => {
      this.updateStyles();
    }), this.root.appendChild(this.styleTag));
  }
  updateStyles() {
    const n = `${this.styles()} ${w.getStyles()}`.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `);
    this.styleTag.textContent = n;
  }
  updateRender() {
    var n;
    this.root.innerHTML = "";
    const t = (n = this.render) == null ? void 0 : n.call(this, this.props);
    if (t) {
      this.createStyleTag(), this.$scopedId || (this.$scopedId = `v${f(8)}`, this.setAttribute(this.$scopedId, "")), t.$scopedId = this.$scopedId;
      const r = l(t);
      this.root.appendChild(r);
    }
  }
  emit(t, n) {
    setTimeout(() => {
      let r = { bubbles: !0 };
      n && (r = { ...r }, typeof n == "object" ? r.detail = { ...n } : r.detail = n), this.dispatchEvent(new CustomEvent(t, r));
    }, 0);
  }
}
customElements.define("v-view", p);
class L {
  buildElement(e) {
    if (e == null ? void 0 : e.name) {
      if (e instanceof Function && e.__proto__.name !== "")
        return this.getElement(e);
      if (e instanceof Function && e.__proto__.name === "") {
        const n = new p();
        return n.render = e.bind(n), n;
      }
      return this.createElement(e);
    }
    return this.createElement(e);
  }
  getElement(e) {
    let t = window.customElements.get(`v-${e.name.toLowerCase()}`);
    return t || (window.customElements.define(`v-${e.name.toLowerCase()}`, e), t = window.customElements.get(`v-${e.name.toLowerCase()}`)), new t();
  }
  createElement(e) {
    return window.document.createElement(e);
  }
}
function R(...s) {
  return [...s];
}
window.h = R;
function l(s, e = new L()) {
  const [t, n, ...r] = s, i = s.$scopedId ?? `v${f(8)}`, o = e.buildElement(t);
  return B(o, i), n && K(o, n), r.length && r.filter(Boolean).forEach((a) => E(o, a, e)), o;
}
function B(s, e) {
  s.props = {}, s.$scopedId = e, s.setAttribute(e, "");
}
function K(s, e) {
  Object.entries(e).forEach(([t, n]) => {
    if (P(t, n)) {
      O(s, t, n);
      return;
    }
    s.props[t] = n, x(s, t, n);
  });
}
function P(s, e) {
  return s.startsWith("on") && e instanceof Function;
}
function O(s, e, t) {
  e in s ? s[e.toLowerCase()] = t : s.addEventListener(e, t);
}
function x(s, e, t) {
  typeof t == "function" ? _(s, e, t) : t instanceof m ? k(s, e, t) : d(s, e, t);
}
function _(s, e, t) {
  const n = g(t.bind(s));
  s.$c || (s.$c = []), s.$c.push(n), n.subscribe((r) => {
    s[e] = r, d(s, e, r);
  }), d(s, e, n.get());
}
function k(s, e, t) {
  t.subscribe((n) => {
    s.props[e] = n, s[e] = n, d(s, e, n);
  }), d(s, e, t.get());
}
function d(s, e, t) {
  try {
    s.setAttribute(e, t);
  } catch {
  }
}
function E(s, e, t) {
  if (D(e)) {
    e.forEach((n) => E(s, n, t));
    return;
  }
  if (M(e)) {
    s.append(e);
    return;
  }
  if (e instanceof m) {
    j(s, e);
    return;
  }
  if (typeof e == "function") {
    H(s, e);
    return;
  }
  if (N(e)) {
    e.$scopedId = s.$scopedId, s.append(e);
    return;
  }
  e.$scopedId = s.$scopedId, s.appendChild(l(e, t));
}
function D(s) {
  return Array.isArray(s) && (typeof s[0] == "string" && typeof s[1] != "object" || Array.isArray(s[0]));
}
function M(s) {
  return ["string", "number"].includes(typeof s);
}
function N(s) {
  return "nodeName" in s || s instanceof HTMLElement;
}
function j(s, e) {
  const t = f(8);
  s.insertAdjacentHTML(
    "beforeend",
    `<!--${t}-->${e.get()}<!--${t}-->`
  ), e.subscribe((n) => {
    v(s, t, n);
  });
}
function H(s, e) {
  const t = f(8), n = g(e);
  s.$c || (s.$c = []), s.$c.push(n), s.insertAdjacentHTML(
    "beforeend",
    `<!--${t}-->${n.get()}<!--${t}-->`
  ), n.subscribe((r) => {
    v(s, t, r);
  });
}
function v(s, e, t) {
  const n = new Range(), [r, i] = F(s, e);
  r && i && (n.setStartAfter(r), n.setEndBefore(i), n.deleteContents(), n.insertNode(document.createTextNode(t)));
}
function F(s, e) {
  const t = Array.from(s.childNodes).filter(
    (n) => n.nodeType === 8 && n.textContent === e
  );
  return [t[0], t[1]];
}
history.pushState = ((s) => function() {
  var t = s.apply(this, arguments);
  return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), t;
})(history.pushState);
history.replaceState = ((s) => function() {
  var t = s.apply(this, arguments);
  return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), t;
})(history.replaceState);
window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
window.$location = window.location;
class W extends p {
  constructor() {
    super();
    c(this, "matchesRoute", !1);
    c(this, "location");
    this.location = window.$location;
  }
  connected() {
    window.addEventListener("locationchange", () => {
      this.checkPath();
    }), this.checkPath();
  }
  checkPath() {
    this.location.pathname === this.props.path || this.matchesPattern() ? this.matchesRoute || (this.matchesRoute = !0, this.updateRender()) : this.matchesRoute && (this.matchesRoute = !1, this.shadowRoot.innerHTML = "");
  }
  matchesPattern() {
    if (!this.props.startWith && !this.props.path)
      return !1;
    const t = this.location.pathname.split("/").filter((o) => o !== "");
    let n = this.props.startWith ? this.props.startWith.split("/") : this.props.path.split("/");
    if (n = n.filter((o) => o !== ""), this.props.path && t.length !== n.length)
      return !1;
    if (this.props.path)
      return n.filter((o, a) => o.startsWith(":") ? !0 : o === t[a]).length === t.length;
    const r = n.filter((o) => (o.startsWith(":"), !0));
    let i = 0;
    for (; i < r.length; ) {
      if (r[i].startsWith(":")) {
        i++;
        continue;
      }
      if (r[i] !== t[i])
        return !1;
      i++;
    }
    return !0;
  }
  render() {
    return this.matchesRoute ? ["slot", { ref: "slot" }] : "";
  }
}
customElements.define("v-route", W);
class C extends p {
  attributeChanged() {
    this.updateRender();
  }
  render() {
    return this.getAttribute("value") && ["true", !0, 1].includes(this.getAttribute("value")) ? /* @__PURE__ */ h("slot", null) : "";
  }
}
c(C, "observedAttributes", ["value"]);
customElements.define("v-if", C);
class V extends p {
  constructor() {
    super(y.CLOSED);
    c(this, "markersByKey", /* @__PURE__ */ new Map());
    c(this, "itemsByKey", /* @__PURE__ */ new Map());
  }
  connectedCallback() {
    var n;
    if (!((n = this.props) != null && n.items))
      return;
    const { items: t } = this.props;
    t.subscribe((r, i) => {
      this.updateList(r, i);
    }), this.updateList(t.get(), []);
  }
  getItemKey(t, n) {
    var r;
    return `item-${(r = this.props) != null && r.key ? t[this.props.key] : n}`;
  }
  shouldUpdateItem(t, n) {
    return typeof t != "object" || t === null ? t !== n : JSON.stringify(t) !== JSON.stringify(n);
  }
  updateList(t, n) {
    const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
    t.forEach((o, a) => {
      const u = this.getItemKey(o, a);
      if (r.set(u, o), i.add(u), !this.markersByKey.has(u))
        this.createNewItem(o, u, a);
      else {
        const b = this.itemsByKey.get(u);
        this.shouldUpdateItem(o, b) && this.updateExistingItem(o, u, a);
      }
    });
    for (const [o, a] of this.markersByKey.entries())
      i.has(o) || this.removeItem(o);
    this.itemsByKey = r;
  }
  createNewItem(t, n, r) {
    const i = document.createComment(`for-${n}`), o = document.createComment(`/for-${n}`);
    if (this.markersByKey.set(n, [i, o]), this.root.appendChild(i), this.props.template) {
      const a = this.props.template(t, r), u = l(a);
      this.root.appendChild(u);
    } else
      this.root.appendChild(document.createTextNode(String(t)));
    this.root.appendChild(o);
  }
  updateExistingItem(t, n, r) {
    const [i, o] = this.markersByKey.get(n), a = new Range();
    if (a.setStartAfter(i), a.setEndBefore(o), a.deleteContents(), this.props.template) {
      const u = this.props.template(t, r), b = l(u);
      a.insertNode(b);
    } else
      a.insertNode(document.createTextNode(String(t)));
  }
  removeItem(t) {
    const [n, r] = this.markersByKey.get(t), i = new Range();
    i.setStartBefore(n), i.setEndAfter(r), i.deleteContents(), this.markersByKey.delete(t), this.itemsByKey.delete(t);
  }
}
customElements.define("v-for", V);
export {
  V as For,
  C as If,
  W as Route,
  p as View,
  y as ViewMode,
  g as computed,
  w as default,
  R as h,
  l as render,
  U as state
};
