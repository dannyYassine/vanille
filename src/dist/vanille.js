var S = Object.defineProperty;
var I = (e, t, s) => t in e ? S(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var p = (e, t, s) => (I(e, typeof t != "symbol" ? t + "" : t, s), s);
function P(e = 8) {
  let t = "";
  const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = s.length;
  let n = 0;
  for (; n < e; )
    t += s.charAt(Math.floor(Math.random() * r)), n += 1;
  return `v${t}`;
}
function b(e) {
  return e.split(/(?=[A-Z])/).join("-").toLowerCase();
}
function R(...e) {
  return [...e];
}
window.h = R;
function $(e, t) {
  const s = e.$scopedId ?? P(), r = e[0], n = e[1], i = (() => (delete e[0], delete e[1], [...e].filter((a) => !!a)))(), o = r.name ? customElements.get(`v-${b(r.name)}`) : null, h = o ? new o() : t.createElement(r);
  return h.props = {}, n && Object.entries(n).forEach(([a, u]) => {
    if (a.startsWith("on") && u instanceof Function) {
      if (a in h)
        h[a.toLowerCase()] = u;
      else {
        const v = a.substring(2);
        h.addEventListener(v, u);
      }
      return;
    }
    h.props[y(a)] = u;
    try {
      h.setAttribute(a, u);
    } catch {
    }
  }), h.$scopedId = s, h.setAttribute(h.$scopedId, ""), i.length && i.forEach((a) => {
    if (["string", "number"].includes(typeof a) || (a.$scopedId = h.$scopedId, "nodeName" in a || a instanceof HTMLElement))
      return h.append(a);
    h.appendChild($(a, t));
  }), h;
}
function y(e) {
  return e.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(t, s) {
    return s === 0 ? t.toLowerCase() : t.toUpperCase();
  }).replace("-", "");
}
function L() {
  return (e) => {
    e.prototype.renderTemplate = function() {
      var n, i, o;
      const t = (n = this.render) == null ? void 0 : n.call(this), s = document.createElement("style");
      let r = ((i = this.styles) == null ? void 0 : i.call(this)) ?? "";
      if (r !== "" && (r = r.trim().replaceAll(/(\S+)(h*.*\{)/gm, `$1[${this.$scopedId}]$2 `)), s.textContent = `${((o = this.globalStylesheet) == null ? void 0 : o.call(this)) ?? ""}${r}`, this.shadowRoot ? this.shadowRoot.appendChild(s) : this.appendChild(s), t) {
        t.$scopedId = this.$scopedId;
        const h = $(t, window.document);
        this.shadowRoot ? this.shadowRoot.appendChild(h) : this.appendChild(h);
      }
    };
  };
}
function l(e) {
  const t = d(e) ? W([]) : {};
  return O(t), D(t, e), T(t);
}
function D(e, t) {
  Object.entries(t).forEach(([s, r]) => {
    if (r && c(r) && !("$$listeners" in r))
      e[s] = l(r);
    else if (d(r)) {
      const n = r;
      if (n.length) {
        const i = n[0];
        if (c(i) && !("$$listeners" in i)) {
          const o = l(n.map((h) => l(h)));
          e[s] = o;
        } else
          !c(i) && !d(i) && (e[s] = l(r));
      } else {
        const i = [];
        O(i), C(i), e[s] = i;
      }
    } else
      e[s] = r;
  });
}
function T(e) {
  return C(e), new Proxy(e, {
    get: (t, s) => t[s],
    set: (t, s, r) => {
      const n = t[s];
      return !r.$$listeners && c(r) && (r = l(r), _(t[s], r)), t[s] = r, t.$$listeners[s] && t.$$listeners[s].forEach((i) => {
        i(r, n, t);
      }), !0;
    }
  });
}
function C(e) {
  Object.defineProperty(e, "$on", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value(t, s) {
      this.$$listeners[t] || (this.$$listeners[t] = []), this.$$listeners[t].push(s);
    }
  });
}
function _(e, t) {
  c(e) && (Object.entries(e.$$listeners).forEach(([s, r]) => {
    t.$$listeners[s] || (t.$$listeners[s] = []), t.$$listeners[s] = [...r];
  }), Object.entries(e).forEach(([s]) => {
    e.$$listeners[s] && e[s] !== t[s] && e.$$listeners[s].forEach((r) => {
      r(t[s], e[s], t);
    }), _(e[s], t[s]);
  }));
}
function c(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function d(e) {
  return typeof e == "object" && Array.isArray(e);
}
function O(e) {
  Object.defineProperty(e, "$$listeners", {
    enumerable: !1,
    configurable: !1,
    writable: !1,
    value: {}
  });
}
function W(e) {
  return e.push = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.push.forEach((n) => {
      n(arguments, this, this);
    }), r;
  })(e.push), e.pop = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.pop.forEach((n) => {
      n(r, this, this);
    }), r;
  })(e.pop), e.shift = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.shift.forEach((n) => {
      n(r, this, this);
    }), r;
  })(e.shift), e.unshift = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.unshift.forEach((n) => {
      n(arguments, this, this);
    }), r;
  })(e.unshift), e.splice = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.splice.forEach((n) => {
      n(r, this, this);
    }), r;
  })(e.splice), e.sort = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.sort.forEach((n) => {
      n(r, this, this);
    }), r;
  })(e.sort), e.reverse = ((t) => function() {
    var r = t.apply(this, arguments);
    return this.$$listeners.reverse.forEach((n) => {
      n(r, this, this);
    }), r;
  })(e.reverse), e;
}
function B() {
  return (e) => {
    e.prototype.buildProps = function() {
      this.props = l(this.props);
    };
  };
}
function x() {
  return (e) => {
    e.prototype.buildState = function() {
      var t;
      this.data && (this.state = l((t = this.data) == null ? void 0 : t.call(this)));
    };
  };
}
function m(e) {
  return (t) => {
    const s = e ?? b(t.name);
    customElements.get(`v-${s}`) || customElements.define(`v-${s}`, t);
  };
}
function M() {
  return (e) => {
    e.prototype.emit = function(t, s) {
      setTimeout(() => {
        let r = { bubbles: !0 };
        s && (r = { ...r }, typeof s == "object" ? r.detail = { ...s } : r.detail = s), this.dispatchEvent(new CustomEvent(t, r));
      }, 0);
    };
  };
}
var A = Object.defineProperty, H = Object.getOwnPropertyDescriptor, N = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? H(t, s) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = (r ? o(t, s, n) : o(n)) || n);
  return r && n && A(t, s, n), n;
};
let f = class extends HTMLElement {
  constructor(t = {}) {
    super();
    p(this, "refs");
    p(this, "$scopedId");
    t != null && t.noShadow || this.attachShadow({ mode: "open" }), this.$scopedId = P(), this.props = {}, this.state = {}, this.refs = new Proxy(
      {},
      {
        get: (s, r) => this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${r}]`)
      }
    );
  }
  setBindings() {
  }
  connectedCallback() {
    this.buildProps(), this.buildState(), this.renderTemplate(), this.setBindings();
  }
  removeAllChildren() {
    const t = this.shadowRoot ? this.shadowRoot : this;
    for (; t.firstChild; )
      t.removeChild(t.lastChild);
  }
  update() {
    this.removeAllChildren(), this.renderTemplate();
  }
};
f = N([
  L(),
  B(),
  x(),
  M()
], f);
var V = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, q = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? Z(t, s) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = (r ? o(t, s, n) : o(n)) || n);
  return r && n && V(t, s, n), n;
};
history.pushState = ((e) => function() {
  var s = e.apply(this, arguments);
  return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), s;
})(history.pushState);
history.replaceState = ((e) => function() {
  var s = e.apply(this, arguments);
  return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), s;
})(history.replaceState);
window.addEventListener("popstate", () => {
  window.dispatchEvent(new Event("locationchange"));
});
window.$location = window.location;
let w = class extends f {
  constructor() {
    super();
    p(this, "props", {});
    p(this, "matchesRoute", !1);
    p(this, "location");
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
    let s = this.props.startWith ? this.props.startWith.split("/") : this.props.path.split("/");
    if (s = s.filter((i) => i !== ""), this.props.path && t.length !== s.length)
      return !1;
    if (this.props.path)
      return s.filter((i, o) => i.startsWith(":") ? !0 : i === t[o]).length === t.length;
    const r = s.filter((i) => (i.startsWith(":"), !0));
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
w = q([
  m()
], w);
var z = Object.defineProperty, F = Object.getOwnPropertyDescriptor, J = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? F(t, s) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = (r ? o(t, s, n) : o(n)) || n);
  return r && n && z(t, s, n), n;
};
let E = class extends f {
  constructor() {
    super({ noShadow: !0 });
    p(this, "props");
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
E = J([
  m()
], E);
var U = Object.defineProperty, G = Object.getOwnPropertyDescriptor, K = (e, t, s, r) => {
  for (var n = r > 1 ? void 0 : r ? G(t, s) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = (r ? o(t, s, n) : o(n)) || n);
  return r && n && U(t, s, n), n;
};
let g = class extends f {
  constructor() {
    super({ noShadow: !0 });
    p(this, "props");
    this.style.display = "contents";
  }
  setBindings() {
    this.props.$on("value", () => {
      this.update();
    }), this.props.value.$on("push", () => {
      this.update();
    }), this.props.value.$on("pop", () => {
      this.update();
    }), this.props.value.$on("shift", () => {
      this.update();
    }), this.props.value.$on("unshift", () => {
      this.update();
    }), this.props.value.$on("splice", () => {
      this.update();
    }), this.props.value.$on("sort", () => {
      this.update();
    }), this.props.value.$on("reverse", () => {
      this.update();
    });
  }
  render() {
    this.props.value.map((s) => this.props.item(s)).map((s) => this.appendChild($(s, window.document)));
  }
};
g = K([
  m()
], g);
export {
  f as BaseView,
  E as If,
  g as List,
  w as Route,
  m as define,
  R as h,
  M as hasEmit,
  L as hasJsxTemplate,
  B as hasObservableProps,
  x as hasObservableState,
  l as observable,
  $ as render
};
