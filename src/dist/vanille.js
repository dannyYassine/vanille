var y = Object.defineProperty;
var C = (t, e, s) => e in t ? y(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var c = (t, e, s) => (C(t, typeof e != "symbol" ? e + "" : e, s), s);
function m(t = 8) {
  let e = "";
  const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = s.length;
  let r = 0;
  for (; r < t; )
    e += s.charAt(Math.floor(Math.random() * n)), r += 1;
  return `v${e}`;
}
function b(t) {
  return t.split(/(?=[A-Z])/).join("-").toLowerCase();
}
function R(...t) {
  return [...t];
}
window.h = R;
function P(t, e) {
  const s = t.$scopedId ?? m(), n = t[0], r = t[1], i = (() => (delete t[0], delete t[1], [...t].filter((a) => !!a)))(), o = n.name ? customElements.get(`v-${b(n.name)}`) : null, h = o ? new o() : e.createElement(n);
  return r && Object.entries(r).forEach(([a, p]) => {
    if (a.startsWith("on") && p instanceof Function) {
      if (a in h)
        h[a.toLowerCase()] = p;
      else {
        const g = a.substring(2);
        h.addEventListener(g, p);
      }
      return;
    }
    h.props = {
      [S(a)]: p
    };
    try {
      h.setAttribute(a, p);
    } catch {
    }
  }), h.$scopedId = s, h.setAttribute(h.$scopedId, ""), i.length && i.forEach((a) => {
    if (["string", "number"].includes(typeof a) || (a.$scopedId = h.$scopedId, "nodeName" in a || a instanceof HTMLElement))
      return h.append(a);
    h.appendChild(P(a, e));
  }), h;
}
function S(t) {
  return t.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(e, s) {
    return s === 0 ? e.toLowerCase() : e.toUpperCase();
  }).replace("-", "");
}
function A() {
  return (t) => {
    t.prototype.renderTemplate = function() {
      var r, i, o;
      this.$scopedId || (this.$scopedId = m());
      const e = (r = this.render) == null ? void 0 : r.call(this), s = document.createElement("style");
      let n = ((i = this.styles) == null ? void 0 : i.call(this)) ?? "";
      n !== "" && (n = n.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `)), s.textContent = `${((o = this.globalStylesheet) == null ? void 0 : o.call(this)) ?? ""}${n}`, this.shadowRoot.appendChild(s), e && (e.$scopedId = this.$scopedId, this.shadowRoot.appendChild(P(e, window.document)));
    };
  };
}
function l(t) {
  if (!t)
    return null;
  const e = d(t) ? [] : {};
  return $(e), I(e, t), O(e);
}
function I(t, e) {
  Object.entries(e).forEach(([s, n]) => {
    if (n && f(n) && !("$$listeners" in n))
      t[s] = l(n);
    else if (d(n)) {
      const r = n;
      if (r.length) {
        const i = r[0];
        if (f(i) && !("$$listeners" in i)) {
          const o = r.map((h) => l(h));
          $(o), u(o), t[s] = o;
        } else
          !f(i) && !d(i) && (t[s] = l(n));
      } else {
        const i = [];
        $(i), u(i), t[s] = i;
      }
    } else
      t[s] = n;
  });
}
function O(t) {
  return u(t), new Proxy(t, {
    get: (e, s) => e[s],
    set: (e, s, n) => {
      const r = e[s];
      return !n.$$listeners && f(n) && (n = l(n), v(e[s], n)), e[s] = n, e.$$listeners[s] && e.$$listeners[s].forEach((i) => {
        i(n, r, e);
      }), !0;
    }
  });
}
function u(t) {
  Object.defineProperty(t, "$on", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value(e, s) {
      this.$$listeners[e] || (this.$$listeners[e] = []), this.$$listeners[e].push(s);
    }
  });
}
function v(t, e) {
  f(t) && (Object.entries(t.$$listeners).forEach(([s, n]) => {
    e.$$listeners[s] || (e.$$listeners[s] = []), e.$$listeners[s] = [...n];
  }), Object.entries(t).forEach(([s]) => {
    t.$$listeners[s] && t[s] !== e[s] && t.$$listeners[s].forEach((n) => {
      n(e[s], t[s], e);
    }), v(t[s], e[s]);
  }));
}
function f(t) {
  return typeof t == "object" && !Array.isArray(t);
}
function d(t) {
  return typeof t == "object" && Array.isArray(t);
}
function $(t) {
  Object.defineProperty(t, "$$listeners", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: {}
  });
}
function _() {
  return (t) => {
    t.prototype.buildProps = function() {
      this.props = l(this.props);
    };
  };
}
function L() {
  return (t) => {
    t.prototype.buildState = function() {
      var e;
      this.data && (this.state = l((e = this.data) == null ? void 0 : e.call(this)));
    };
  };
}
function D() {
  return (t) => {
    t.prototype.refs = new Proxy(
      {},
      {
        get: (e, s) => this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${s}]`)
      }
    );
  };
}
function Z(t = "open") {
  return (e) => {
    "shadowDom" in e.prototype || Object.defineProperty(e.prototype, "shadowDom", {
      get() {
        return this.shadowRoot || this.attachShadow({ mode: t }), this.shadowRoot;
      }
    });
  };
}
function T(t) {
  return (e) => {
    const s = t ?? b(e.name);
    customElements.get(`v-${s}`) || customElements.define(`v-${s}`, e);
  };
}
function W() {
  return (t) => {
    t.prototype.emit = function(e, s) {
      setTimeout(() => {
        let n = { bubbles: !0 };
        s && (n = { ...n }, typeof s == "object" ? n.detail = { ...s } : n.detail = s), this.dispatchEvent(new CustomEvent(e, n));
      }, 0);
    };
  };
}
var x = Object.defineProperty, B = Object.getOwnPropertyDescriptor, M = (t, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? B(e, s) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (r = (n ? o(e, s, r) : o(r)) || r);
  return n && r && x(e, s, r), r;
};
let w = class extends HTMLElement {
  constructor() {
    super();
    c(this, "refs");
    c(this, "$scopedId");
    this.attachShadow({ mode: "open" }), this.$scopedId = m(), this.props = {}, this.state = {}, this.refs = new Proxy(
      {},
      {
        get: (e, s) => this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${s}]`)
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
  D(),
  A(),
  _(),
  L(),
  W()
], w);
var q = Object.defineProperty, H = Object.getOwnPropertyDescriptor, N = (t, e, s, n) => {
  for (var r = n > 1 ? void 0 : n ? H(e, s) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (r = (n ? o(e, s, r) : o(r)) || r);
  return n && r && q(e, s, r), r;
};
history.pushState = ((t) => function() {
  var s = t.apply(this, arguments);
  return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), s;
})(history.pushState);
history.replaceState = ((t) => function() {
  var s = t.apply(this, arguments);
  return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), s;
})(history.replaceState);
window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
window.$location = window.location;
let E = class extends w {
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
    const e = this.location.pathname.split("/").filter((i) => i !== "");
    let s = this.props.startWith ? this.props.startWith.split("/") : this.props.path.split("/");
    if (s = s.filter((i) => i !== ""), this.props.path && e.length !== s.length)
      return !1;
    if (this.props.path)
      return s.filter((i, o) => i.startsWith(":") ? !0 : i === e[o]).length === e.length;
    const n = s.filter((i) => (i.startsWith(":"), !0));
    let r = 0;
    for (; r < n.length; ) {
      if (n[r].startsWith(":")) {
        r++;
        continue;
      }
      if (n[r] !== e[r])
        return !1;
      r++;
    }
    return !0;
  }
  render() {
    return this.matchesRoute ? ["slot", { ref: "slot" }] : "";
  }
};
E = N([
  T()
], E);
export {
  w as BaseView,
  E as Route,
  T as define,
  R as h,
  W as hasEmit,
  A as hasJsxTemplate,
  _ as hasObservableProps,
  L as hasObservableState,
  D as hasRefs,
  Z as hasShadowDom,
  l as observable,
  P as render
};
