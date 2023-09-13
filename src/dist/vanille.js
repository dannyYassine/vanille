var y = Object.defineProperty;
var A = (s, t, e) => t in s ? y(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var l = (s, t, e) => (A(s, typeof t != "symbol" ? t + "" : t, e), e);
function E(s = 8) {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = e.length;
  let n = 0;
  for (; n < s; )
    t += e.charAt(Math.floor(Math.random() * r)), n += 1;
  return `v${t}`;
}
function b(s) {
  return s.split(/(?=[A-Z])/).join("-").toLowerCase();
}
function O(...s) {
  return [...s];
}
window.h = O;
function P(s, t) {
  const e = s.$scopedId ?? E(), r = s[0], n = s[1], i = (() => (delete s[0], delete s[1], [...s].filter((a) => !!a)))(), o = r.name ? customElements.get(`v-${b(r.name)}`) : null, h = o ? new o() : t.createElement(r);
  return n && Object.entries(n).forEach(([a, p]) => {
    if (a.startsWith("on") && p instanceof Function) {
      if (a in h)
        h[a.toLowerCase()] = p;
      else {
        const m = a.substring(2);
        h.addEventListener(m, p);
      }
      return;
    }
    h.props = {
      [I(a)]: p
    };
    try {
      h.setAttribute(a, p);
    } catch {
    }
  }), h.$scopedId = e, h.setAttribute(h.$scopedId, ""), i.length && i.forEach((a) => {
    if (["string", "number"].includes(typeof a) || (a.$scopedId = h.$scopedId, "nodeName" in a || a instanceof HTMLElement))
      return h.append(a);
    h.appendChild(P(a, t));
  }), h;
}
function I(s) {
  return s.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(t, e) {
    return e === 0 ? t.toLowerCase() : t.toUpperCase();
  }).replace("-", "");
}
function S() {
  return (s) => {
    s.prototype.renderTemplate = function() {
      var n, i, o;
      const t = (n = this.render) == null ? void 0 : n.call(this), e = document.createElement("style");
      let r = ((i = this.styles) == null ? void 0 : i.call(this)) ?? "";
      r !== "" && (r = r.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `)), e.textContent = `${((o = this.globalStylesheet) == null ? void 0 : o.call(this)) ?? ""}${r}`, this.shadowRoot.appendChild(e), t && (t.$scopedId = this.$scopedId, this.shadowRoot.appendChild(P(t, window.document)));
    };
  };
}
function c(s) {
  const t = $(s) ? [] : {};
  return w(t), R(t, s), L(t);
}
function R(s, t) {
  Object.entries(t).forEach(([e, r]) => {
    if (r && f(r) && !("$$listeners" in r))
      s[e] = c(r);
    else if ($(r)) {
      const n = r;
      if (n.length) {
        const i = n[0];
        if (f(i) && !("$$listeners" in i)) {
          const o = n.map((h) => c(h));
          w(o), d(o), s[e] = o;
        } else
          !f(i) && !$(i) && (s[e] = c(r));
      } else {
        const i = [];
        w(i), d(i), s[e] = i;
      }
    } else
      s[e] = r;
  });
}
function L(s) {
  return d(s), new Proxy(s, {
    get: (t, e) => t[e],
    set: (t, e, r) => {
      const n = t[e];
      return !r.$$listeners && f(r) && (r = c(r), C(t[e], r)), t[e] = r, t.$$listeners[e] && t.$$listeners[e].forEach((i) => {
        i(r, n, t);
      }), !0;
    }
  });
}
function d(s) {
  Object.defineProperty(s, "$on", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value(t, e) {
      this.$$listeners[t] || (this.$$listeners[t] = []), this.$$listeners[t].push(e);
    }
  });
}
function C(s, t) {
  f(s) && (Object.entries(s.$$listeners).forEach(([e, r]) => {
    t.$$listeners[e] || (t.$$listeners[e] = []), t.$$listeners[e] = [...r];
  }), Object.entries(s).forEach(([e]) => {
    s.$$listeners[e] && s[e] !== t[e] && s.$$listeners[e].forEach((r) => {
      r(t[e], s[e], t);
    }), C(s[e], t[e]);
  }));
}
function f(s) {
  return typeof s == "object" && !Array.isArray(s);
}
function $(s) {
  return typeof s == "object" && Array.isArray(s);
}
function w(s) {
  Object.defineProperty(s, "$$listeners", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: {}
  });
}
function D() {
  return (s) => {
    s.prototype.buildProps = function() {
      this.props = c(this.props);
    };
  };
}
function T() {
  return (s) => {
    s.prototype.buildState = function() {
      var t;
      this.data && (this.state = c((t = this.data) == null ? void 0 : t.call(this)));
    };
  };
}
function _(s) {
  return (t) => {
    const e = s ?? b(t.name);
    customElements.get(`v-${e}`) || customElements.define(`v-${e}`, t);
  };
}
function W() {
  return (s) => {
    s.prototype.emit = function(t, e) {
      setTimeout(() => {
        let r = { bubbles: !0 };
        e && (r = { ...r }, typeof e == "object" ? r.detail = { ...e } : r.detail = e), this.dispatchEvent(new CustomEvent(t, r));
      }, 0);
    };
  };
}
var B = Object.defineProperty, x = Object.getOwnPropertyDescriptor, M = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? x(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && B(t, e, n), n;
};
let u = class extends HTMLElement {
  constructor() {
    super();
    l(this, "refs");
    l(this, "$scopedId");
    this.attachShadow({ mode: "open" }), this.$scopedId = E(), this.props = {}, this.state = {}, this.refs = new Proxy(
      {},
      {
        get: (t, e) => this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${e}]`)
      }
    );
  }
  setBindings() {
  }
  connectedCallback() {
    this.buildProps(), this.buildState(), this.renderTemplate(), this.setBindings();
  }
  removeAllChildren() {
    for (; this.shadowRoot.firstChild; )
      this.shadowRoot.removeChild(this.shadowRoot.lastChild);
  }
  update() {
    this.removeAllChildren(), this.renderTemplate();
  }
};
u = M([
  S(),
  D(),
  T(),
  W()
], u);
var H = Object.defineProperty, N = Object.getOwnPropertyDescriptor, V = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? N(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && H(t, e, n), n;
};
history.pushState = ((s) => function() {
  var e = s.apply(this, arguments);
  return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), e;
})(history.pushState);
history.replaceState = ((s) => function() {
  var e = s.apply(this, arguments);
  return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), e;
})(history.replaceState);
window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
window.$location = window.location;
let v = class extends u {
  constructor() {
    super();
    l(this, "props", {});
    l(this, "matchesRoute", !1);
    l(this, "location");
    this.location = window.$location;
  }
  setBindings() {
    window.addEventListener("locationchange", () => {
      this.checkPath();
    }), this.checkPath();
  }
  checkPath() {
    this.location.pathname === this.props.path || this.matchesPattern() ? this.matchesRoute || (this.matchesRoute = !0, this.update()) : this.matchesRoute && (this.matchesRoute = !1, this.update());
  }
  matchesPattern() {
    if (!this.props.startWith && !this.props.path)
      return !1;
    const t = this.location.pathname.split("/").filter((i) => i !== "");
    let e = this.props.startWith ? this.props.startWith.split("/") : this.props.path.split("/");
    if (e = e.filter((i) => i !== ""), this.props.path && t.length !== e.length)
      return !1;
    if (this.props.path)
      return e.filter((i, o) => i.startsWith(":") ? !0 : i === t[o]).length === t.length;
    const r = e.filter((i) => (i.startsWith(":"), !0));
    let n = 0;
    for (; n < r.length; ) {
      if (r[n].startsWith(":")) {
        n++;
        continue;
      }
      if (r[n] !== t[n])
        return !1;
      n++;
    }
    return !0;
  }
  render() {
    return this.matchesRoute ? ["slot", { ref: "slot" }] : "";
  }
};
v = V([
  _()
], v);
var Z = Object.defineProperty, q = Object.getOwnPropertyDescriptor, z = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? q(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && Z(t, e, n), n;
};
let g = class extends u {
  constructor() {
    super(...arguments);
    l(this, "props");
  }
  setBindings() {
    this.props.$on("value", () => {
      this.update();
    });
  }
  render() {
    return this.props.value ? ["slot", { ref: "slot" }] : "";
  }
};
g = z([
  _()
], g);
export {
  u as BaseView,
  g as If,
  v as Route,
  _ as define,
  O as h,
  W as hasEmit,
  S as hasJsxTemplate,
  D as hasObservableProps,
  T as hasObservableState,
  c as observable,
  P as render
};
