import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.919e884c.js";const h=JSON.parse('{"title":"Simple routes","description":"","frontmatter":{},"headers":[],"relativePath":"simple-routes.md","filePath":"simple-routes.md"}'),o={name:"simple-routes.md"},p=l(`<h1 id="simple-routes" tabindex="-1">Simple routes <a class="header-anchor" href="#simple-routes" aria-label="Permalink to &quot;Simple routes&quot;">​</a></h1><h2 id="v-route-component" tabindex="-1"><code>v-route</code> component <a class="header-anchor" href="#v-route-component" aria-label="Permalink to &quot;\`v-route\` component&quot;">​</a></h2><p><code>vanille</code> implements a very simple and straightforward routing system.</p><p>Simply import:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core/Route&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core/Route&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>This will add <code>Route</code> to <code>customElements</code> and you can use it as:</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt;Home&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt;Home&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="path-attribute" tabindex="-1"><code>path</code> attribute <a class="header-anchor" href="#path-attribute" aria-label="Permalink to &quot;\`path\` attribute&quot;">​</a></h2><p>When the <code>location</code> matches the given value set to <code>path</code>, the <code>slot</code> will be rendered.</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// https://dannyyassine.github.io/vanille</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  Home // not rendered</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/vanille&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  Dashboard // rendered</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// https://dannyyassine.github.io/vanille</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  Home // not rendered</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/vanille&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  Dashboard // rendered</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="startswith-attribute" tabindex="-1"><code>startsWith</code> attribute <a class="header-anchor" href="#startswith-attribute" aria-label="Permalink to &quot;\`startsWith\` attribute&quot;">​</a></h2><p>Similar to <code>String.prototype.startsWith</code>, <code>v-route</code> checks if the url path matches the beginning pattern set in the <code>startsWith</code> attribute.</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">startsWith</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/app&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">startsWith</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/app&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>All routes beginning with <code>/app</code> will be rendered:</p><ul><li><code>/app/dashboard</code></li><li><code>/app/settings</code></li><li><code>/app/user/1</code></li></ul><p>Very useful when configuring routes based on a mandatory login screen:</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/login&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  Login</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">starsWith</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">nav</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">nav</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/app/dashboard&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Dashboard</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/app/settings&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Dashboard</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/login&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  Login</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">starsWith</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">nav</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">nav</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/app/dashboard&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    Dashboard</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/app/settings&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    Dashboard</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h2 id="params-in-the-url" tabindex="-1">Params in the url <a class="header-anchor" href="#params-in-the-url" aria-label="Permalink to &quot;Params in the url&quot;">​</a></h2><p><code>vanille</code> offers very simple matching logic to render routes with params like <code>:id</code>:</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/users/:id&quot;</span><span style="color:#E1E4E8;">&gt;User with id&lt;/</span><span style="color:#79B8FF;">v-route</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/users/:id&quot;</span><span style="color:#24292E;">&gt;User with id&lt;/</span><span style="color:#005CC5;">v-route</span><span style="color:#24292E;">&gt;</span></span></code></pre></div>`,20),t=[p];function e(r,c,i,y,E,d){return a(),n("div",null,t)}const g=s(o,[["render",e]]);export{h as __pageData,g as default};
