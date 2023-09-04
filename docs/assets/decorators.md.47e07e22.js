import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.919e884c.js";const F=JSON.parse('{"title":"Decorators","description":"","frontmatter":{},"headers":[],"relativePath":"decorators.md","filePath":"decorators.md"}'),p={name:"decorators.md"},o=l(`<h1 id="decorators" tabindex="-1">Decorators <a class="header-anchor" href="#decorators" aria-label="Permalink to &quot;Decorators&quot;">​</a></h1><h2 id="base-flavour" tabindex="-1">Base flavour <a class="header-anchor" href="#base-flavour" aria-label="Permalink to &quot;Base flavour&quot;">​</a></h2><p><code>vanille</code> comes pack with syntactic sugar decorators, all of which are already sprinkled on the base web component class <code>BaseView</code>.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  define,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasJsxTemplate,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasObservableProps,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasObservableState,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasRefs,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasShadowDom,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasEmit</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  define,</span></span>
<span class="line"><span style="color:#24292E;">  hasJsxTemplate,</span></span>
<span class="line"><span style="color:#24292E;">  hasObservableProps,</span></span>
<span class="line"><span style="color:#24292E;">  hasObservableState,</span></span>
<span class="line"><span style="color:#24292E;">  hasRefs,</span></span>
<span class="line"><span style="color:#24292E;">  hasShadowDom,</span></span>
<span class="line"><span style="color:#24292E;">  hasEmit</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>The base class <code>Basev iew</code> has all these decorators to create the base flavour of <code>vanille</code> to get started:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasRefs</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasShadowDom</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasJsxTemplate</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasObservableProps</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasObservableState</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasEmit</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BaseView</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;"> {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasRefs</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasShadowDom</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasJsxTemplate</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasObservableProps</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasObservableState</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasEmit</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BaseView</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;"> {}</span></span></code></pre></div><h2 id="creating-your-own-flavour" tabindex="-1">Creating your own flavour <a class="header-anchor" href="#creating-your-own-flavour" aria-label="Permalink to &quot;Creating your own flavour&quot;">​</a></h2><p>Since <code>vanille</code> exposes all decorators, you can create your own flavours of web components.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  define,</span></span>
<span class="line"><span style="color:#E1E4E8;">  hasJsxTemplate</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">define</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasShadowDom</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasJsxTemplate</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AnotherFlavour</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">connectedCallback</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">renderTemplate</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;My </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> flavour</span><span style="color:#F97583;">!&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  define,</span></span>
<span class="line"><span style="color:#24292E;">  hasJsxTemplate</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">define</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasShadowDom</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasJsxTemplate</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AnotherFlavour</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">connectedCallback</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">renderTemplate</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;My </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> flavour</span><span style="color:#D73A49;">!&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>We were able to add JSX to a web component with a few lines of codes.</p>`,10),e=[o];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const v=s(p,[["render",c]]);export{F as __pageData,v as default};
