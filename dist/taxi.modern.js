import t from"@unseenco/e";const e=new DOMParser;function r(t){const e=new URL(t,window.location.origin);let r=null;return e.hash.length&&(r=t.replace(e.hash,"")),{hasHash:e.hash.length>0,pathname:e.pathname,host:e.host,raw:t,href:r||e.href}}function i(t){"HEAD"===t.parentNode.tagName?document.head.appendChild(n(t)):document.body.appendChild(n(t))}function n(t){const e=document.createElement("SCRIPT");for(let r=0;r<t.attributes.length;r++){const i=t.attributes[r];e.setAttribute(i.nodeName,i.nodeValue)}return t.innerHTML&&(e.innerHTML=t.innerHTML),e}function s(){return s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},s.apply(this,arguments)}class a{constructor({wrapper:t}){this.wrapper=t}leave(t){return new Promise(e=>{this.onLeave(s({},t,{done:e}))})}enter(t){return new Promise(e=>{this.onEnter(s({},t,{done:e}))})}onLeave({done:t}){t()}onEnter({done:t}){t()}}class o{constructor({content:t,page:e,title:r,wrapper:i}){this._contentString=t.outerHTML,this._DOM=null,this.page=e,this.title=r,this.wrapper=i,this.content=this.wrapper.lastElementChild}onEnter(){}onEnterCompleted(){}onLeave(){}onLeaveCompleted(){}initialLoad(){this.onEnter(),this.onEnterCompleted()}update(){document.title=this.title,this.wrapper.appendChild(this._DOM.firstElementChild),this.content=this.wrapper.lastElementChild,this._DOM=null}createDom(){this._DOM||(this._DOM=document.createElement("div"),this._DOM.innerHTML=this._contentString)}remove(){this.wrapper.firstElementChild.remove()}enter(t,e){return new Promise(r=>{this.onEnter(),t.enter({trigger:e,to:this.content}).then(()=>{this.onEnterCompleted(),r()})})}leave(t,e,r){return new Promise(i=>{this.onLeave(),t.leave({trigger:e,from:this.content}).then(()=>{r&&this.remove(),this.onLeaveCompleted(),i()})})}}class h{constructor(){this.data=new Map,this.regexCache=new Map}add(t,e,r){this.data.has(t)||(this.data.set(t,new Map),this.regexCache.set(t,new RegExp(`^${t}$`))),this.data.get(t).set(e,r),this.regexCache.set(e,new RegExp(`^${e}$`))}findMatch(t,e){for(const[r,i]of this.data)if(t.pathname.match(this.regexCache.get(r))){for(const[t,r]of i)if(e.pathname.match(this.regexCache.get(t)))return r;break}return null}}const c="A transition is currently in progress";class l{constructor(t={}){this.isTransitioning=!1,this.currentCacheEntry=null,this.cache=new Map,this.activePromises=new Map,this.onClick=t=>{if(!t.metaKey&&!t.ctrlKey){const e=r(t.currentTarget.href);if(this.currentLocation=r(window.location.href),this.currentLocation.host!==e.host)return;if(this.currentLocation.href!==e.href||this.currentLocation.hasHash&&!e.hasHash)return t.preventDefault(),void this.navigateTo(e.raw,t.currentTarget.dataset.transition||!1,t.currentTarget).catch(t=>console.warn(t));this.currentLocation.hasHash||e.hasHash||t.preventDefault()}},this.onPopstate=()=>!(window.location.pathname===this.currentLocation.pathname&&!this.isPopping)&&(this.allowInterruption||!this.isTransitioning&&!this.isPopping?(this.isPopping||(this.popTarget=window.location.href),this.isPopping=!0,void this.navigateTo(window.location.href,!1,"popstate")):(window.history.pushState({},"",this.popTarget),console.warn(c),!1)),this.onPrefetch=t=>{const e=r(t.currentTarget.href);this.currentLocation.host===e.host&&this.preload(t.currentTarget.href,!1)};const{links:e="a:not([target]):not([href^=\\#]):not([data-taxi-ignore])",removeOldContent:i=!0,allowInterruption:n=!1,bypassCache:s=!1,enablePrefetch:h=!0,renderers:l={default:o},transitions:d={default:a},reloadJsFilter:u=(t=>void 0!==t.dataset.taxiReload),reloadCssFilter:p=(t=>!0)}=t;this.renderers=l,this.transitions=d,this.defaultRenderer=this.renderers.default||o,this.defaultTransition=this.transitions.default||a,this.wrapper=document.querySelector("[data-taxi]"),this.reloadJsFilter=u,this.reloadCssFilter=p,this.removeOldContent=i,this.allowInterruption=n,this.bypassCache=s,this.enablePrefetch=h,this.cache=new Map,this.isPopping=!1,this.attachEvents(e),this.currentLocation=r(window.location.href),this.cache.set(this.currentLocation.href,this.createCacheEntry(document.cloneNode(!0),window.location.href)),this.currentCacheEntry=this.cache.get(this.currentLocation.href),this.currentCacheEntry.renderer.initialLoad()}setDefaultRenderer(t){this.defaultRenderer=this.renderers[t]}setDefaultTransition(t){this.defaultTransition=this.transitions[t]}addRoute(t,e,r){this.router||(this.router=new h),this.router.add(t,e,r)}preload(t,e=!1){var i=this;return t=r(t).href,this.cache.has(t)?Promise.resolve():this.fetch(t,!1).then(async function(r){i.cache.set(t,i.createCacheEntry(r.html,r.url)),e&&i.cache.get(t).renderer.createDom()})}updateCache(t){const e=r(t||window.location.href).href;this.cache.has(e)&&this.cache.delete(e),this.cache.set(e,this.createCacheEntry(document.cloneNode(!0),e))}clearCache(t){const e=r(t||window.location.href).href;this.cache.has(e)&&this.cache.delete(e)}navigateTo(t,e=!1,i=!1){var n=this;return new Promise((s,a)=>{if(!this.allowInterruption&&this.isTransitioning)return void a(new Error(c));this.isTransitioning=!0,this.isPopping=!0,this.targetLocation=r(t),this.popTarget=window.location.href;const o=new(this.chooseTransition(e))({wrapper:this.wrapper});let h;if(this.bypassCache||!this.cache.has(this.targetLocation.href)||this.cache.get(this.targetLocation.href).skipCache){const t=this.fetch(this.targetLocation.href).then(t=>{this.cache.set(this.targetLocation.href,this.createCacheEntry(t.html,t.url)),this.cache.get(this.targetLocation.href).renderer.createDom()});h=this.beforeFetch(this.targetLocation,o,i).then(async function(){return t.then(async function(){return await n.afterFetch(n.targetLocation,o,n.cache.get(n.targetLocation.href),i)})})}else this.cache.get(this.targetLocation.href).renderer.createDom(),h=this.beforeFetch(this.targetLocation,o,i).then(async function(){return await n.afterFetch(n.targetLocation,o,n.cache.get(n.targetLocation.href),i)});h.then(()=>{s()})})}on(e,r){t.on(e,r)}off(e,r){t.off(e,r)}beforeFetch(e,r,i){return t.emit("NAVIGATE_OUT",{from:this.currentCacheEntry,trigger:i}),new Promise(t=>{this.currentCacheEntry.renderer.leave(r,i,this.removeOldContent).then(()=>{"popstate"!==i&&(console.log("ass",e),window.history.pushState({},"",e.raw)),t()})})}afterFetch(e,r,i,n){return this.currentLocation=e,this.popTarget=this.currentLocation.href,new Promise(s=>{i.renderer.update(),t.emit("NAVIGATE_IN",{from:this.currentCacheEntry,to:i,trigger:n}),this.reloadJsFilter&&this.loadScripts(i.scripts),this.reloadCssFilter&&this.loadStyles(i.styles),"popstate"!==n&&e.href!==i.finalUrl&&window.history.replaceState({},"",i.finalUrl),i.renderer.enter(r,n).then(()=>{t.emit("NAVIGATE_END",{from:this.currentCacheEntry,to:i,trigger:n}),this.currentCacheEntry=i,this.isTransitioning=!1,this.isPopping=!1,s()})})}loadScripts(t){const e=[...t],r=Array.from(document.querySelectorAll("script")).filter(this.reloadJsFilter);for(let t=0;t<r.length;t++)for(let i=0;i<e.length;i++)if(r[t].outerHTML===e[i].outerHTML){(s=r[t]).parentNode.replaceChild(n(s),s),e.splice(i,1);break}var s;for(const t of e)i(t)}loadStyles(t){const e=Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter(this.reloadCssFilter);t.forEach(t=>{t.href&&!e.find(e=>e.href===t.href)&&document.body.append(t)})}attachEvents(e){t.delegate("click",e,this.onClick),t.on("popstate",window,this.onPopstate),this.enablePrefetch&&t.delegate("mouseenter focus",e,this.onPrefetch)}fetch(t,r=!0){if(this.activePromises.has(t))return this.activePromises.get(t);const i=new Promise((i,n)=>{let s;fetch(t,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Taxi"},credentials:"same-origin"}).then(e=>(e.ok||(n("Taxi encountered a non 2xx HTTP status code"),r&&(window.location.href=t)),s=e.url,e.text())).then(t=>{var r;i({html:(r=t,"string"==typeof r?e.parseFromString(r,"text/html"):r),url:s})}).catch(e=>{n(e),r&&(window.location.href=t)}).finally(()=>{this.activePromises.delete(t)})});return this.activePromises.set(t,i),i}chooseTransition(t){var e;if(t)return this.transitions[t];const r=null==(e=this.router)?void 0:e.findMatch(this.currentLocation,this.targetLocation);return r?this.transitions[r]:this.defaultTransition}createCacheEntry(t,e){const r=t.querySelector("[data-taxi-view]"),i=r.dataset.taxiView.length?this.renderers[r.dataset.taxiView]:this.defaultRenderer;return i||console.warn(`The Renderer "${r.dataset.taxiView}" was set in the data-taxi-view of the requested page, but not registered in Taxi.`),{page:t,content:r,finalUrl:e,skipCache:r.hasAttribute("data-taxi-nocache"),scripts:this.reloadJsFilter?Array.from(t.querySelectorAll("script")).filter(this.reloadJsFilter):[],styles:this.reloadCssFilter?Array.from(t.querySelectorAll('link[rel="stylesheet"]')).filter(this.reloadCssFilter):[],title:t.title,renderer:new i({wrapper:this.wrapper,title:t.title,content:r,page:t})}}}export{l as Core,o as Renderer,a as Transition};
//# sourceMappingURL=taxi.modern.js.map
