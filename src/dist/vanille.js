var C = Object.defineProperty;
var y = (e, s, t) => s in e ? C(e, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[s] = t;
var c = (e, s, t) => (y(e, typeof s != "symbol" ? s + "" : s, t), t);
function m(e = 8) {
  let s = "";
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = t.length;
  let r = 0;
  for (; r < e; )
    s += t.charAt(Math.floor(Math.random() * n)), r += 1;
  return `v${s}`;
}
function b(e) {
  return e.split(/(?=[A-Z])/).join("-").toLowerCase();
}
function A(...e) {
  return [...e];
}
window.h = A;
function v(e, s) {
  const t = e.$scopedId ?? m(), n = e[0], r = e[1], i = (() => (delete e[0], delete e[1], [...e].filter((a) => !!a)))(), o = n.name ? customElements.get(`v-${b(n.name)}`) : null, h = o ? new o() : s.createElement(n);
  return r && Object.entries(r).forEach(([a, p]) => {
    if (a.startsWith("on") && p instanceof Function) {
      if (a in h)
        h[a.toLowerCase()] = p;
      else {
        const E = a.substring(2);
        h.addEventListener(E, p);
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
  }), h.$scopedId = t, h.setAttribute(h.$scopedId, ""), i.length && i.forEach((a) => {
    if (["string", "number"].includes(typeof a) || (a.$scopedId = h.$scopedId, "nodeName" in a || a instanceof HTMLElement))
      return h.append(a);
    h.appendChild(v(a, s));
  }), h;
}
function I(e) {
  return e.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(s, t) {
    return t === 0 ? s.toLowerCase() : s.toUpperCase();
  }).replace("-", "");
}
function S() {
  return (e) => {
    e.prototype.renderTemplate = function() {
      var r, i, o;
      this.$scopedId || (this.$scopedId = m());
      const s = (r = this.render) == null ? void 0 : r.call(this), t = document.createElement("style");
      let n = ((i = this.styles) == null ? void 0 : i.call(this)) ?? "";
      n !== "" && (n = n.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `)), t.textContent = `${((o = this.globalStylesheet) == null ? void 0 : o.call(this)) ?? ""}${n}`, this.shadowRoot.appendChild(t), s && (s.$scopedId = this.$scopedId, this.shadowRoot.appendChild(v(s, window.document)));
    };
  };
}
function l(e) {
  if (!e)
    return null;
  const s = d(e) ? [] : {};
  return $(s), R(s, e), O(s);
}
function R(e, s) {
  Object.entries(s).forEach(([t, n]) => {
    if (n && f(n) && !("$$listeners" in n))
      e[t] = l(n);
    else if (d(n)) {
      const r = n;
      if (r.length) {
        const i = r[0];
        if (f(i) && !("$$listeners" in i)) {
          const o = r.map((h) => l(h));
          $(o), u(o), e[t] = o;
        } else
          !f(i) && !d(i) && (e[t] = l(n));
      } else {
        const i = [];
        $(i), u(i), e[t] = i;
      }
    } else
      e[t] = n;
  });
}
function O(e) {
  return u(e), new Proxy(e, {
    get: (s, t) => s[t],
    set: (s, t, n) => {
      const r = s[t];
      return !n.$$listeners && f(n) && (n = l(n), P(s[t], n)), s[t] = n, s.$$listeners[t] && s.$$listeners[t].forEach((i) => {
        i(n, r, s);
      }), !0;
    }
  });
}
function u(e) {
  Object.defineProperty(e, "$on", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value(s, t) {
      this.$$listeners[s] || (this.$$listeners[s] = []), this.$$listeners[s].push(t);
    }
  });
}
function P(e, s) {
  f(e) && (Object.entries(e.$$listeners).forEach(([t, n]) => {
    s.$$listeners[t] || (s.$$listeners[t] = []), s.$$listeners[t] = [...n];
  }), Object.entries(e).forEach(([t]) => {
    e.$$listeners[t] && e[t] !== s[t] && e.$$listeners[t].forEach((n) => {
      n(s[t], e[t], s);
    }), P(e[t], s[t]);
  }));
}
function f(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function d(e) {
  return typeof e == "object" && Array.isArray(e);
}
function $(e) {
  Object.defineProperty(e, "$$listeners", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: {}
  });
}
function _() {
  return (e) => {
    e.prototype.buildProps = function() {
      this.props = l(this.props);
    };
  };
}
function L() {
  return (e) => {
    e.prototype.buildState = function() {
      var s;
      this.data && (this.state = l((s = this.data) == null ? void 0 : s.call(this)));
    };
  };
}
function T(e) {
  return (s) => {
    const t = e ?? b(s.name);
    customElements.get(`v-${t}`) || customElements.define(`v-${t}`, s);
  };
}
function W() {
  return (e) => {
    e.prototype.emit = function(s, t) {
      setTimeout(() => {
        let n = { bubbles: !0 };
        t && (n = { ...n }, typeof t == "object" ? n.detail = { ...t } : n.detail = t), this.dispatchEvent(new CustomEvent(s, n));
      }, 0);
    };
  };
}
var D = Object.defineProperty, B = Object.getOwnPropertyDescriptor, M = (e, s, t, n) => {
  for (var r = n > 1 ? void 0 : n ? B(s, t) : s, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (r = (n ? o(s, t, r) : o(r)) || r);
  return n && r && D(s, t, r), r;
};
let w = class extends HTMLElement {
  constructor() {
    super();
    c(this, "refs");
    c(this, "$scopedId");
    this.attachShadow({ mode: "open" }), this.$scopedId = m(), this.props = {}, this.state = {}, this.refs = new Proxy(
      {},
      {
        get: (s, t) => this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${t}]`)
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
w = M([
  S(),
  _(),
  L(),
  W()
], w);
var x = Object.defineProperty, H = Object.getOwnPropertyDescriptor, N = (e, s, t, n) => {
  for (var r = n > 1 ? void 0 : n ? H(s, t) : s, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (r = (n ? o(s, t, r) : o(r)) || r);
  return n && r && x(s, t, r), r;
};
history.pushState = ((e) => function() {
  var t = e.apply(this, arguments);
  return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), t;
})(history.pushState);
history.replaceState = ((e) => function() {
  var t = e.apply(this, arguments);
  return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), t;
})(history.replaceState);
window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
window.$location = window.location;
let g = class extends w {
  constructor() {
    super();
    c(this, "props", {});
    c(this, "matchesRoute", !1);
    c(this, "location");
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
    const s = this.location.pathname.split("/").filter((i) => i !== "");
    let t = this.props.startWith ? this.props.startWith.split("/") : this.props.path.split("/");
    if (t = t.filter((i) => i !== ""), this.props.path && s.length !== t.length)
      return !1;
    if (this.props.path)
      return t.filter((i, o) => i.startsWith(":") ? !0 : i === s[o]).length === s.length;
    const n = t.filter((i) => (i.startsWith(":"), !0));
    let r = 0;
    for (; r < n.length; ) {
      if (n[r].startsWith(":")) {
        r++;
        continue;
      }
      if (n[r] !== s[r])
        return !1;
      r++;
    }
    return !0;
  }
  render() {
    return this.matchesRoute ? ["slot", { ref: "slot" }] : "";
  }
};
g = N([
  T()
], g);
export {
  w as BaseView,
  g as Route,
  T as define,
  A as h,
  W as hasEmit,
  S as hasJsxTemplate,
  _ as hasObservableProps,
  L as hasObservableState,
  l as observable,
  v as render
};
