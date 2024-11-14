import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.919e884c.js";const u=JSON.parse('{"title":"Native web components","description":"","frontmatter":{},"headers":[],"relativePath":"always-web-component.md","filePath":"always-web-component.md"}'),o={name:"always-web-component.md"},p=l(`<h1 id="native-web-components" tabindex="-1">Native web components <a class="header-anchor" href="#native-web-components" aria-label="Permalink to &quot;Native web components&quot;">​</a></h1><h2 id="basic-usage" tabindex="-1">Basic usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic usage&quot;">​</a></h2><p><code>vanille</code> will use native browser features to improve performance as much as possible. The core functionality behind this is to leverage web components.</p><p>Import the base web component:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { View } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { View } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p><code>View</code> extends the <code>HTMLElement</code> class</p></div><p>Then start building your components:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { View } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyComponent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">View</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  [</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { View } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyComponent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">View</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>There&#39;s no neet to use <code>customElements.define()</code> to register your custom web components since <code>vanille</code> will automatically do that for you behind the scenes.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">prefix</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;v&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">customElements.</span><span style="color:#B392F0;">define</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`\${</span><span style="color:#E1E4E8;">prefix</span><span style="color:#9ECBFF;">}-\${</span><span style="color:#E1E4E8;">MyComponent</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">name</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#9ECBFF;">()</span><span style="color:#9ECBFF;">}&#39;, MyComponent);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">prefix</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;v&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">customElements.</span><span style="color:#6F42C1;">define</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`\${</span><span style="color:#24292E;">prefix</span><span style="color:#032F62;">}-\${</span><span style="color:#24292E;">MyComponent</span><span style="color:#032F62;">.</span><span style="color:#24292E;">name</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#032F62;">()</span><span style="color:#032F62;">}&#39;, MyComponent);</span></span></code></pre></div></div><h2 id="class-components" tabindex="-1">Class components <a class="header-anchor" href="#class-components" aria-label="Permalink to &quot;Class components&quot;">​</a></h2><p>Next, start building your UI with built-in jsx:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { View } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyComponent</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">View</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;Hello world</span><span style="color:#F97583;">!&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { View } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyComponent</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">View</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;Hello world</span><span style="color:#D73A49;">!&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="functional-components" tabindex="-1">Functional components <a class="header-anchor" href="#functional-components" aria-label="Permalink to &quot;Functional components&quot;">​</a></h2><p><code>vanille</code> also supports functional components for smaller and less use case driven UIs:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyComponent</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;Hello world</span><span style="color:#F97583;">!&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyComponent</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;Hello world</span><span style="color:#D73A49;">!&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="available-class-methods" tabindex="-1">Available class methods <a class="header-anchor" href="#available-class-methods" aria-label="Permalink to &quot;Available class methods&quot;">​</a></h2><p><code>vanille</code> comes pack with syntactic sugar methods, all of which are already sprinkled on the base web component class <code>View</code>.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { View } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> MyComponent extends View {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// your JSX code here</span></span>
<span class="line"><span style="color:#E1E4E8;">  render() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// custom scoped styles</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">styles</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// wrapper for connectedCallback</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">connected</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// wrapper for disconnectedCallback</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">disconnected</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// wrapper for adoptedCallback</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">adopted</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// wrapper for attributeChangedCallback</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">attributeChanged</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { View } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> MyComponent extends View {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// your JSX code here</span></span>
<span class="line"><span style="color:#24292E;">  render() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// custom scoped styles</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">styles</span><span style="color:#24292E;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// wrapper for connectedCallback</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">connected</span><span style="color:#24292E;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// wrapper for disconnectedCallback</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">disconnected</span><span style="color:#24292E;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// wrapper for adoptedCallback</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">adopted</span><span style="color:#24292E;">() {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// wrapper for attributeChangedCallback</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">attributeChanged</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="built-in-methods" tabindex="-1">Built-in methods <a class="header-anchor" href="#built-in-methods" aria-label="Permalink to &quot;Built-in methods&quot;">​</a></h2><h4 id="emit" tabindex="-1">emit <a class="header-anchor" href="#emit" aria-label="Permalink to &quot;emit&quot;">​</a></h4><p>Send an event to the parent component:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;on-counter-clicked&#39;</span><span style="color:#E1E4E8;">, count);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;on-counter-clicked&#39;</span><span style="color:#24292E;">, count);</span></span></code></pre></div><h2 id="functional-components-1" tabindex="-1">Functional components <a class="header-anchor" href="#functional-components-1" aria-label="Permalink to &quot;Functional components&quot;">​</a></h2><p>All <code>vanille</code> and built-in web components methods are available to be used inside functional components:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyComponent</span><span style="color:#E1E4E8;">({ </span><span style="color:#FFAB70;">count</span><span style="color:#E1E4E8;"> }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">connected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// mounted to the DOM!</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;count&quot;</span><span style="color:#E1E4E8;">&gt;{count}</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyComponent</span><span style="color:#24292E;">({ </span><span style="color:#E36209;">count</span><span style="color:#24292E;"> }) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">connected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// mounted to the DOM!</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;count&quot;</span><span style="color:#24292E;">&gt;{count}</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p><code>Functional components</code> are converted into <code>class components</code> under the hood, thus <code>this</code> refers to the instance of your component.</p><p>This creates a nice developer experience without worrying about class sematics.</p></div>`,26),e=[p];function t(c,r,i,y,E,d){return n(),a("div",null,e)}const m=s(o,[["render",t]]);export{u as __pageData,m as default};
