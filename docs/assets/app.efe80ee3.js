import{s,Z as p,$ as u,a0 as c,a1 as l,a2 as f,a3 as d,a4 as m,a5 as h,a6 as g,a7 as A,a8 as y,d as v,u as C,j as P,y as w,a9 as E,aa as R,ab as _,ac as b}from"./chunks/framework.4345dae5.js";import{t as r}from"./chunks/theme.deb95c57.js";r.themeConfig={footer:{message:"Released under the MIT License.",copyright:"Copyright © 2019-present Evan You"}};function i(e){if(e.extends){const t=i(e.extends);return{...t,...e,async enhanceApp(a){t.enhanceApp&&await t.enhanceApp(a),e.enhanceApp&&await e.enhanceApp(a)}}}return e}const o=i(r),D=v({name:"VitePressApp",setup(){const{site:e}=C();return P(()=>{w(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),E(),R(),_(),o.setup&&o.setup(),()=>b(o.Layout)}});async function T(){const e=L(),t=j();t.provide(u,e);const a=c(e.route);return t.provide(l,a),t.component("Content",f),t.component("ClientOnly",d),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return a.frontmatter.value}},$params:{get(){return a.page.value.params}}}),o.enhanceApp&&await o.enhanceApp({app:t,router:e,siteData:m}),{app:t,router:e,data:a}}function j(){return h(D)}function L(){let e=s,t;return g(a=>{let n=A(a);return n?(e&&(t=n),(e||t===n)&&(n=n.replace(/\.js$/,".lean.js")),s&&(e=!1),y(()=>import(n),[])):null},o.NotFound)}s&&T().then(({app:e,router:t,data:a})=>{t.go().then(()=>{p(t.route,a.site),e.mount("#app")})});export{T as createApp};
