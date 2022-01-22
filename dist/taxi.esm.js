import t from"@unseenco/e";function e(){return e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},e.apply(this,arguments)}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i=new DOMParser;function o(t){var e=new URL(t,window.location.origin),n=null;return e.hash.length&&(n=t.replace(e.hash,"")),{hasHash:e.hash.length>0,pathname:e.pathname,raw:t,href:n||e.href}}function a(t){"HEAD"===t.parentNode.tagName?document.head.appendChild(c(t)):document.body.appendChild(c(t))}function c(t){for(var e=document.createElement("SCRIPT"),n=0;n<t.attributes.length;n++){var r=t.attributes[n];e.setAttribute(r.nodeName,r.nodeValue)}return t.innerHTML&&(e.innerHTML=t.innerHTML),e}var s=/*#__PURE__*/function(){function t(){this.data=new Map,this.regexCache=new Map}var e=t.prototype;return e.add=function(t,e,n){this.data.has(t)||(this.data.set(t,new Map),this.regexCache.set(t,new RegExp("^"+t+"$"))),this.data.get(t).set(e,n),this.regexCache.set(e,new RegExp("^"+e+"$"))},e.findMatch=function(t,e){for(var n,i=r(this.data);!(n=i()).done;){var o=n.value,a=o[1];if(t.pathname.match(this.regexCache.get(o[0]))){for(var c,s=r(a);!(c=s()).done;){var h=c.value,u=h[1];if(e.pathname.match(this.regexCache.get(h[0])))return u}break}}return null},t}(),h=/*#__PURE__*/function(){function e(t){var e=this;void 0===t&&(t={}),this.isTransitioning=!1,this.currentView=null,this.cache=new Map,this.onClick=function(t){if(!t.metaKey&&!t.ctrlKey){var n=o(t.currentTarget.href);if(e.currentLocation=o(window.location.href),e.currentLocation.href!==n.href||e.currentLocation.hasHash&&!n.hasHash)return t.preventDefault(),void e.navigate(n.raw,t.currentTarget.dataset.taxiTransition||!1,t.currentTarget);e.currentLocation.hasHash||n.hasHash||t.preventDefault()}},this.onPopstate=function(){return window.location.pathname!==e.currentLocation.pathname&&(e.isTransitioning?(window.history.pushState({},"",e.currentLocation.href),!1):void e.navigate(window.location.href,!1,"popstate"))};var n=t.links,r=void 0===n?"a:not([target]):not([href^=\\#]):not([data-taxi-ignore])":n,i=t.views,a=t.transitions,c=void 0===a?{default:u}:a,s=t.reloadJsFilter,h=void 0===s?function(t){return!("__bs_script__"===(null==t?void 0:t.id)||null!=t&&t.src.includes("browser-sync-client.js"))}:s;this.views=void 0===i?{default:f}:i,this.transitions=c,this.defaultView=this.views.default||f,this.defaultTransition=this.transitions.default||u,this.wrapper=document.querySelector("[data-taxi]"),this.reloadJsFilter=h,this.cache=new Map,this.attachEvents(r),this.currentLocation=o(window.location.href),this.cache.set(this.currentLocation.href,this.createCacheEntry(document.cloneNode(!0))),this.currentView=this.cache.get(this.currentLocation.href),this.currentView.view.initialLoad()}var n=e.prototype;return n.setDefaultView=function(t){this.defaultView=this.views[t]},n.setDefaultTransition=function(t){this.defaultTransition=this.transitions[t]},n.addRoute=function(t,e,n){this.router||(this.router=new s),this.router.add(t,e,n)},n.preload=function(t){var e=this;return t=o(t).href,this.cache.has(t)||this.fetch(t).then(function(n){try{return e.cache.set(t,e.createCacheEntry(n)),Promise.resolve()}catch(t){return Promise.reject(t)}}),this},n.navigate=function(t,e,n){var r=this;return void 0===e&&(e=!1),void 0===n&&(n=!1),this.targetLocation=o(t),new Promise(function(t,i){if(r.isTransitioning)i(new Error("A transition is currently in progress"));else{var o=new(r.chooseTransition(e))({wrapper:r.wrapper});r.beforeFetch(r.targetLocation,o,n).then(function(){try{return r.cache.has(r.targetLocation.href)?Promise.resolve(r.afterFetch(r.targetLocation,o,r.cache.get(r.targetLocation.href),n)):Promise.resolve(r.fetch(r.targetLocation.raw).then(function(t){try{return Promise.resolve(r.afterFetch(r.targetLocation,o,r.createCacheEntry(t),n))}catch(t){return Promise.reject(t)}}))}catch(t){return Promise.reject(t)}}).then(function(){t()})}})},n.beforeFetch=function(e,n,r){var i=this;return this.isTransitioning=!0,console.log("NAVIGATE_OUT"),t.emit("NAVIGATE_OUT",{from:this.currentView,trigger:r}),new Promise(function(t){i.currentView.view.leave(n,r).then(function(){"popstate"!==r&&window.history.pushState({},"",e.raw),t()})})},n.afterFetch=function(e,n,r,i){var o=this;return this.cache.has(e.href)||this.cache.set(e.href,r),this.currentLocation=e,console.log("NAVIGATE_IN"),t.emit("NAVIGATE_IN",{from:this.currentView,to:r,trigger:i}),new Promise(function(e){r.view.update(),o.loadScripts(r.scripts),r.view.enter(n,i).then(function(){console.log("NAVIGATE_COMPLETE",o.cache),t.emit("NAVIGATE_COMPLETE",{from:o.currentView,to:r,trigger:i}),o.currentView=r,o.isTransitioning=!1,e()})})},n.loadScripts=function(t){for(var e,n=[].concat(t),i=[].concat(document.querySelectorAll("script:not([data-no-reload])")).filter(this.reloadJsFilter),o=0;o<i.length;o++)for(var s=0;s<n.length;s++)if(i[o].outerHTML===n[s].outerHTML){(e=i[o]).parentNode.replaceChild(c(e),e),n.splice(s,1);break}for(var h,u=r(n);!(h=u()).done;)a(h.value)},n.attachEvents=function(e){t.delegate("click",e,this.onClick),t.on("popstate",window,this.onPopstate)},n.fetch=function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return new Promise(function(e){fetch(t,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Taxi"},credentials:"same-origin"}).then(function(e){return e.ok||(console.warn("Taxi encountered a non 2xx HTTP status code"),window.location.href=t),e.text()}).then(function(t){var n;e("string"==typeof(n=t)?i.parseFromString(n,"text/html"):n)}).catch(function(e){console.warn(e),window.location.href=t})})}),n.chooseTransition=function(t){var e;if(t)return this.transitions[t];var n=null==(e=this.router)?void 0:e.findMatch(this.currentLocation,this.targetLocation);return n?this.transitions[n]:this.defaultTransition},n.createCacheEntry=function(t){var e=t.querySelector("[data-taxi-view]"),n=e.dataset.taxiView.length?this.views[e.dataset.taxiView]:this.defaultView;return{page:t,content:e,scripts:[].concat(t.querySelectorAll("script:not([data-no-reload])")).filter(this.reloadJsFilter),title:t.title,view:new n({wrapper:this.wrapper,title:t.title,content:e,page:t})}},e}(),u=/*#__PURE__*/function(){function t(t){this.wrapper=t.wrapper}var n=t.prototype;return n.leave=function(t){var n=this;return new Promise(function(r){n.onLeave(e({},t,{done:r}))})},n.enter=function(t){var n=this;return new Promise(function(r){n.onEnter(e({},t,{done:r}))})},n.onLeave=function(t){(0,t.done)()},n.onEnter=function(t){(0,t.done)()},t}(),f=/*#__PURE__*/function(){function t(t){var e=t.page,n=t.title,r=t.wrapper;this.content=t.content,this.page=e,this.title=n,this.wrapper=r}var e=t.prototype;return e.onEnter=function(){},e.onEnterCompleted=function(){},e.onLeave=function(){},e.onLeaveCompleted=function(){},e.initialLoad=function(){this.onEnter(),this.onEnterCompleted()},e.update=function(){document.title=this.title,this.wrapper.insertAdjacentHTML("beforeend",this.content.outerHTML)},e.remove=function(){this.wrapper.firstElementChild.remove()},e.enter=function(t,e){var n=this;return new Promise(function(r){n.onEnter(),t.enter({trigger:e,to:n.content}).then(function(){n.onEnterCompleted(),r()})})},e.leave=function(t,e){var n=this;return new Promise(function(r){n.onLeave(),t.leave({trigger:e,from:n.content}).then(function(){n.remove(),n.onLeaveCompleted(),r()})})},t}();export{h as Core,u as Transition,f as View};
//# sourceMappingURL=taxi.esm.js.map
