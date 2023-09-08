(function(o,l){typeof exports=="object"&&typeof module<"u"?l(exports):typeof define=="function"&&define.amd?define(["exports"],l):(o=typeof globalThis<"u"?globalThis:o||self,l(o.vanille={}))})(this,function(o){"use strict";var M=Object.defineProperty;var H=(o,l,f)=>l in o?M(o,l,{enumerable:!0,configurable:!0,writable:!0,value:f}):o[l]=f;var d=(o,l,f)=>(H(o,typeof l!="symbol"?l+"":l,f),f);function l(t=8){let s="";const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=e.length;let i=0;for(;i<t;)s+=e.charAt(Math.floor(Math.random()*n)),i+=1;return`v${s}`}function f(t){return t.split(/(?=[A-Z])/).join("-").toLowerCase()}function E(...t){return[...t]}window.h=E;function w(t,s){const e=t.$scopedId??l(),n=t[0],i=t[1],r=(()=>(delete t[0],delete t[1],[...t].filter(c=>!!c)))(),a=n.name?customElements.get(`v-${f(n.name)}`):null,h=a?new a:s.createElement(n);return i&&Object.entries(i).forEach(([c,$])=>{if(c.startsWith("on")&&$ instanceof Function){if(c in h)h[c.toLowerCase()]=$;else{const R=c.substring(2);h.addEventListener(R,$)}return}h.props={[I(c)]:$};try{h.setAttribute(c,$)}catch{}}),h.$scopedId=e,h.setAttribute(h.$scopedId,""),r.length&&r.forEach(c=>{if(["string","number"].includes(typeof c)||(c.$scopedId=h.$scopedId,"nodeName"in c||c instanceof HTMLElement))return h.append(c);h.appendChild(w(c,s))}),h}function I(t){return t.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(s,e){return e===0?s.toLowerCase():s.toUpperCase()}).replace("-","")}function v(){return t=>{t.prototype.renderTemplate=function(){var i,r,a;this.$scopedId||(this.$scopedId=l());const s=(i=this.render)==null?void 0:i.call(this),e=document.createElement("style");let n=((r=this.styles)==null?void 0:r.call(this))??"";n!==""&&(n=n.trim().replaceAll(/(\S+)(h*.*\{)/gm,`$1[${this.$scopedId}]$2 `)),e.textContent=`${((a=this.globalStylesheet)==null?void 0:a.call(this))??""}${n}`,this.shadowRoot.appendChild(e),s&&(s.$scopedId=this.$scopedId,this.shadowRoot.appendChild(w(s,window.document)))}}}function u(t){if(!t)return null;const s=b(t)?[]:{};return g(s),O(s,t),_(s)}function O(t,s){Object.entries(s).forEach(([e,n])=>{if(n&&p(n)&&!("$$listeners"in n))t[e]=u(n);else if(b(n)){const i=n;if(i.length){const r=i[0];if(p(r)&&!("$$listeners"in r)){const a=i.map(h=>u(h));g(a),m(a),t[e]=a}else!p(r)&&!b(r)&&(t[e]=u(n))}else{const r=[];g(r),m(r),t[e]=r}}else t[e]=n})}function _(t){return m(t),new Proxy(t,{get:(s,e)=>s[e],set:(s,e,n)=>{const i=s[e];return!n.$$listeners&&p(n)&&(n=u(n),P(s[e],n)),s[e]=n,s.$$listeners[e]&&s.$$listeners[e].forEach(r=>{r(n,i,s)}),!0}})}function m(t){Object.defineProperty(t,"$on",{enumerable:!1,configurable:!1,writable:!1,value(s,e){this.$$listeners[s]||(this.$$listeners[s]=[]),this.$$listeners[s].push(e)}})}function P(t,s){p(t)&&(Object.entries(t.$$listeners).forEach(([e,n])=>{s.$$listeners[e]||(s.$$listeners[e]=[]),s.$$listeners[e]=[...n]}),Object.entries(t).forEach(([e])=>{t.$$listeners[e]&&t[e]!==s[e]&&t.$$listeners[e].forEach(n=>{n(s[e],t[e],s)}),P(t[e],s[e])}))}function p(t){return typeof t=="object"&&!Array.isArray(t)}function b(t){return typeof t=="object"&&Array.isArray(t)}function g(t){Object.defineProperty(t,"$$listeners",{enumerable:!1,configurable:!1,writable:!1,value:{}})}function y(){return t=>{t.prototype.buildProps=function(){this.props=u(this.props)}}}function C(){return t=>{t.prototype.buildState=function(){var s;this.data&&(this.state=u((s=this.data)==null?void 0:s.call(this)))}}}function S(t){return s=>{const e=t??f(s.name);customElements.get(`v-${e}`)||customElements.define(`v-${e}`,s)}}function A(){return t=>{t.prototype.emit=function(s,e){setTimeout(()=>{let n={bubbles:!0};e&&(n={...n},typeof e=="object"?n.detail={...e}:n.detail=e),this.dispatchEvent(new CustomEvent(s,n))},0)}}}var T=Object.defineProperty,L=Object.getOwnPropertyDescriptor,B=(t,s,e,n)=>{for(var i=n>1?void 0:n?L(s,e):s,r=t.length-1,a;r>=0;r--)(a=t[r])&&(i=(n?a(s,e,i):a(i))||i);return n&&i&&T(s,e,i),i};o.BaseView=class extends HTMLElement{constructor(){super();d(this,"refs");d(this,"$scopedId");this.attachShadow({mode:"open"}),this.$scopedId=l(),this.props={},this.state={},this.refs=new Proxy({},{get:(e,n)=>this.shadowRoot.querySelector(`[${this.$scopedId}][ref=${n}]`)})}setBindings(){}connectedCallback(){this.buildProps(),this.buildState(),this.renderTemplate(),this.setBindings()}removeAllChildren(){for(;this.shadowRoot.firstChild;)this.shadowRoot.removeChild(this.shadowRoot.lastChild)}update(){this.removeAllChildren(),this.renderTemplate()}},o.BaseView=B([v(),y(),C(),A()],o.BaseView);var W=Object.defineProperty,V=Object.getOwnPropertyDescriptor,D=(t,s,e,n)=>{for(var i=n>1?void 0:n?V(s,e):s,r=t.length-1,a;r>=0;r--)(a=t[r])&&(i=(n?a(s,e,i):a(i))||i);return n&&i&&W(s,e,i),i};history.pushState=(t=>function(){var e=t.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("locationchange")),e})(history.pushState),history.replaceState=(t=>function(){var e=t.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("locationchange")),e})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("locationchange"))}),window.$location=window.location,o.Route=class extends o.BaseView{constructor(){super();d(this,"props",{});d(this,"matchesRoute",!1);d(this,"location");this.location=window.$location}setBindings(){window.addEventListener("locationchange",()=>{this.checkPath()}),this.checkPath()}checkPath(){this.location.pathname===this.props.path||this.matchesPattern()?this.matchesRoute||(this.matchesRoute=!0,this.update()):this.matchesRoute&&(this.matchesRoute=!1,this.update())}matchesPattern(){if(!this.props.startWith&&!this.props.path)return!1;const e=this.location.pathname.split("/").filter(a=>a!=="");let n=this.props.startWith?this.props.startWith.split("/"):this.props.path.split("/");if(n=n.filter(a=>a!==""),this.props.path&&e.length!==n.length)return!1;if(this.props.path)return n.filter((a,h)=>a.startsWith(":")?!0:a===e[h]).length===e.length;const i=n.filter(a=>(a.startsWith(":"),!0));let r=0;for(;r<i.length;){if(i[r].startsWith(":")){r++;continue}if(i[r]!==e[r])return!1;r++}return!0}render(){return this.matchesRoute?["slot",{ref:"slot"}]:""}},o.Route=D([S()],o.Route),o.define=S,o.h=E,o.hasEmit=A,o.hasJsxTemplate=v,o.hasObservableProps=y,o.hasObservableState=C,o.observable=u,o.render=w,Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
