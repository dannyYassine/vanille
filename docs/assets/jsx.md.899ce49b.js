import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.919e884c.js";const u=JSON.parse('{"title":"JSX","description":"","frontmatter":{},"headers":[],"relativePath":"jsx.md","filePath":"jsx.md"}'),p={name:"jsx.md"},o=l(`<h1 id="jsx" tabindex="-1">JSX <a class="header-anchor" href="#jsx" aria-label="Permalink to &quot;JSX&quot;">​</a></h1><h2 id="standardized-jsx" tabindex="-1">Standardized JSX <a class="header-anchor" href="#standardized-jsx" aria-label="Permalink to &quot;Standardized JSX&quot;">​</a></h2><p>You can quickly get started with fast templating with JSX</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark has-focused-lines vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { define, BaseView } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">define</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BaseView</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">  </span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#B392F0;">span</span><span style="color:#E1E4E8;">&gt;</span><span style="color:#79B8FF;">JSX</span><span style="color:#F97583;">!&lt;/</span><span style="color:#E1E4E8;">span</span><span style="color:#F97583;">&gt;</span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line has-focus"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-focused-lines vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { define, BaseView } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">define</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BaseView</span><span style="color:#24292E;"> {</span></span>
<span class="line has-focus"><span style="color:#24292E;">  </span></span>
<span class="line has-focus"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line has-focus"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line has-focus"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line has-focus"><span style="color:#24292E;">        &lt;</span><span style="color:#6F42C1;">span</span><span style="color:#24292E;">&gt;</span><span style="color:#005CC5;">JSX</span><span style="color:#D73A49;">!&lt;/</span><span style="color:#24292E;">span</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line has-focus"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line has-focus"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="render-function" tabindex="-1"><code>render</code> function <a class="header-anchor" href="#render-function" aria-label="Permalink to &quot;\`render\` function&quot;">​</a></h2><p><code>BaseView</code> already has the <code>hasJsxTemplate</code> decorator so you can quickly get started. You will need to implement the <code>render</code> funtion</p><h2 id="hasjsxtemplate-decorator" tabindex="-1"><code>hasJsxTemplate</code> decorator <a class="header-anchor" href="#hasjsxtemplate-decorator" aria-label="Permalink to &quot;\`hasJsxTemplate\` decorator&quot;">​</a></h2><p>Since <code>vanille</code> exposes all decorators, you can create your own flavours of web components.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { define, hasShadowDom, hasJsxTemplate } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@vanille/core&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">define</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasShadowDom</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#B392F0;">hasJsxTemplate</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AnotherFlavour</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLElement</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">connectedCallback</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">renderTemplate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;My </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> flavour</span><span style="color:#F97583;">!&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { define, hasShadowDom, hasJsxTemplate } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@vanille/core&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">define</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasShadowDom</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#6F42C1;">hasJsxTemplate</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AnotherFlavour</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLElement</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">connectedCallback</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">renderTemplate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;My </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> flavour</span><span style="color:#D73A49;">!&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>The decorator <code>hasJsxTemplate</code> adds the <code>renderTemplate</code> function to the <code>HTMLElement.prototype</code>, thus you simply need to call it.</p></div><p>And just like that, we were able to add JSX to a web component with a few lines of codes.</p>`,11),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const F=s(p,[["render",t]]);export{u as __pageData,F as default};
