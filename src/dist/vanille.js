var y = Object.defineProperty;
var A = (s, t, e) => t in s ? y(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var h = (s, t, e) => (A(s, typeof t != "symbol" ? t + "" : t, e), e);
function b(s = 8) {
  let t = "";
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = e.length;
  let n = 0;
  for (; n < s; )
    t += e.charAt(Math.floor(Math.random() * r)), n += 1;
  return `v${t}`;
}
function _(s) {
  return s.split(/(?=[A-Z])/).join("-").toLowerCase();
}
function I(...s) {
  return [...s];
}
window.h = I;
function C(s, t) {
  const e = s.$scopedId ?? b(), r = s[0], n = s[1], i = (() => (delete s[0], delete s[1], [...s].filter((l) => !!l)))(), o = r.name ? customElements.get(`v-${_(r.name)}`) : null, a = o ? new o() : t.createElement(r);
  return a.props = {}, n && Object.entries(n).forEach(([l, p]) => {
    if (l.startsWith("on") && p instanceof Function) {
      if (l in a)
        a[l.toLowerCase()] = p;
      else {
        const v = l.substring(2);
        a.addEventListener(v, p);
      }
      return;
    }
    a.props[S(l)] = p;
    try {
      a.setAttribute(l, p);
    } catch {
    }
  }), a.$scopedId = e, a.setAttribute(a.$scopedId, ""), i.length && i.forEach((l) => {
    if (["string", "number"].includes(typeof l) || (l.$scopedId = a.$scopedId, "nodeName" in l || l instanceof HTMLElement))
      return a.append(l);
    a.appendChild(C(l, t));
  }), a;
}
function S(s) {
  return s.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(t, e) {
    return e === 0 ? t.toLowerCase() : t.toUpperCase();
  }).replace("-", "");
}
function R() {
  return (s) => {
    s.prototype.renderTemplate = function() {
      var n, i, o;
      const t = (n = this.render) == null ? void 0 : n.call(this), e = document.createElement("style");
      let r = ((i = this.styles) == null ? void 0 : i.call(this)) ?? "";
      r !== "" && (r = r.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `)), e.textContent = `${((o = this.globalStylesheet) == null ? void 0 : o.call(this)) ?? ""}${r}`, this.shadowRoot.appendChild(e), t && (t.$scopedId = this.$scopedId, this.shadowRoot.appendChild(C(t, window.document)));
    };
  };
}
function c(s) {
  const t = $(s) ? [] : {};
  return w(t), L(t, s), D(t);
}
function L(s, t) {
  Object.entries(t).forEach(([e, r]) => {
    if (r && f(r) && !("$$listeners" in r))
      s[e] = c(r);
    else if ($(r)) {
      const n = r;
      if (n.length) {
        const i = n[0];
        if (f(i) && !("$$listeners" in i)) {
          const o = n.map((a) => c(a));
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
function D(s) {
  return d(s), new Proxy(s, {
    get: (t, e) => t[e],
    set: (t, e, r) => {
      const n = t[e];
      return !r.$$listeners && f(r) && (r = c(r), O(t[e], r)), t[e] = r, t.$$listeners[e] && t.$$listeners[e].forEach((i) => {
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
function O(s, t) {
  f(s) && (Object.entries(s.$$listeners).forEach(([e, r]) => {
    t.$$listeners[e] || (t.$$listeners[e] = []), t.$$listeners[e] = [...r];
  }), Object.entries(s).forEach(([e]) => {
    s.$$listeners[e] && s[e] !== t[e] && s.$$listeners[e].forEach((r) => {
      r(t[e], s[e], t);
    }), O(s[e], t[e]);
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
function T() {
  return (s) => {
    s.prototype.buildProps = function() {
      this.props = c(this.props);
    };
  };
}
function W() {
  return (s) => {
    s.prototype.buildState = function() {
      var t;
      this.data && (this.state = c((t = this.data) == null ? void 0 : t.call(this)));
    };
  };
}
function m(s) {
  return (t) => {
    const e = s ?? _(t.name);
    customElements.get(`v-${e}`) || customElements.define(`v-${e}`, t);
  };
}
function B() {
  return (s) => {
    s.prototype.emit = function(t, e) {
      setTimeout(() => {
        let r = { bubbles: !0 };
        e && (r = { ...r }, typeof e == "object" ? r.detail = { ...e } : r.detail = e), this.dispatchEvent(new CustomEvent(t, r));
      }, 0);
    };
  };
}
var x = Object.defineProperty, M = Object.getOwnPropertyDescriptor, H = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? M(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && x(t, e, n), n;
};
let u = class extends HTMLElement {
  constructor() {
    super();
    h(this, "refs");
    h(this, "$scopedId");
    this.attachShadow({ mode: "open" }), this.$scopedId = b(), this.props = {}, this.state = {}, this.refs = new Proxy(
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
u = H([
  R(),
  T(),
  W(),
  B()
], u);
var N = Object.defineProperty, V = Object.getOwnPropertyDescriptor, Z = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? V(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && N(t, e, n), n;
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
let g = class extends u {
  constructor() {
    super();
    h(this, "props", {});
    h(this, "matchesRoute", !1);
    h(this, "location");
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
g = Z([
  m()
], g);
var q = Object.defineProperty, z = Object.getOwnPropertyDescriptor, F = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? z(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && q(t, e, n), n;
};
let E = class extends u {
  constructor() {
    super(...arguments);
    h(this, "props");
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
E = F([
  m()
], E);
var J = Object.defineProperty, U = Object.getOwnPropertyDescriptor, G = (s, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? U(t, e) : t, i = s.length - 1, o; i >= 0; i--)
    (o = s[i]) && (n = (r ? o(t, e, n) : o(n)) || n);
  return r && n && J(t, e, n), n;
};
let P = class extends u {
  constructor() {
    super(...arguments);
    h(this, "props");
  }
  setBindings() {
    this.props.$on("value", () => {
      this.update();
    });
  }
  render() {
    const t = this.props.value.map((e) => (console.log(this.props.item(e)), this.props.item(e)));
    return console.log(["div", {}, ...t]), t.length ? ["div", {}, ...t] : "";
  }
};
P = G([
  m()
], P);
export {
  u as BaseView,
  E as If,
  P as List,
  g as Route,
  m as define,
  I as h,
  B as hasEmit,
  R as hasJsxTemplate,
  T as hasObservableProps,
  W as hasObservableState,
  c as observable,
  C as render
};
