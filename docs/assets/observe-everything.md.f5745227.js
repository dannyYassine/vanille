import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.919e884c.js";const m=JSON.parse('{"title":"Observables","description":"","frontmatter":{},"headers":[],"relativePath":"observe-everything.md","filePath":"observe-everything.md"}'),o={name:"observe-everything.md"},p=l(`<h1 id="observables" tabindex="-1">Observables <a class="header-anchor" href="#observables" aria-label="Permalink to &quot;Observables&quot;">​</a></h1><p>Coming soon</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">object</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">observable</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  user: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    email: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    contact: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      firstName: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">object.user.</span><span style="color:#B392F0;">$on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;email&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">user</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newValue, oldValue, user);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">object.user.contact.</span><span style="color:#B392F0;">$on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;firstName&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">newValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">oldValue</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">user</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(newValue, oldValue, user);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">object.user.email </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;mycoolemail@js.com&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// log: &#39;vanille@js.com&#39; &#39;&#39; { email: &#39;&#39;, contact: { firstName: &#39;&#39; } }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">object.user.contact.firstName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vanille&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// log: &#39;vanille&#39; &#39;&#39; { contact: { firstName: &#39;&#39; } }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">object</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">observable</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  user: {</span></span>
<span class="line"><span style="color:#24292E;">    email: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    contact: {</span></span>
<span class="line"><span style="color:#24292E;">      firstName: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">object.user.</span><span style="color:#6F42C1;">$on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;email&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">user</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newValue, oldValue, user);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">object.user.contact.</span><span style="color:#6F42C1;">$on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;firstName&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">newValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">oldValue</span><span style="color:#24292E;">, </span><span style="color:#E36209;">user</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(newValue, oldValue, user);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">object.user.email </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;mycoolemail@js.com&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// log: &#39;vanille@js.com&#39; &#39;&#39; { email: &#39;&#39;, contact: { firstName: &#39;&#39; } }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">object.user.contact.firstName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vanille&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// log: &#39;vanille&#39; &#39;&#39; { contact: { firstName: &#39;&#39; } }</span></span></code></pre></div>`,3),e=[p];function c(t,r,E,y,i,F){return a(),n("div",null,e)}const d=s(o,[["render",c]]);export{m as __pageData,d as default};
