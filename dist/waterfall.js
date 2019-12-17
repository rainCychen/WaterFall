/*!
 *  waterfall.js 
 *  by fengshangbin 2019-09-04 
 *  https://github.com/fengshangbin/WaterFall 
 *  H5 easy water fall list Component
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.WaterFall=e():t.WaterFall=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.builder=a,n(1);var o,r=n(5),i={minWidth:null,columns:null,width:null,gap:null,minGap:null,itemSelector:null,scrollParent:window,loading:'<div class="water-fall-loading"><svg viewBox="0 0 50 50" class="loading"><defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#000" stop-opacity="1.0" /><stop offset="90%" stop-color="#000" stop-opacity="0" /></linearGradient></defs><circle cx="25" cy="25" r="20" stroke-width="5" stroke="url(#linear)" fill="none" /></svg><div>'};function a(t,e){var n=this;r.C3EventDispatcher.call(n);var o,a,l=(0,r.extend)(i,e),s=l.scrollParent;n.updateOptions=function(t){l=(0,r.extend)(i,t),s!=l.scrollParent&&(s.removeEventListener("scroll",h),(s=l.scrollParent).addEventListener("scroll",h)),n.update()},t!=document.body&&t.classList.add("water-fall-container"),n.measure=function(){var e=t.innerWidth||t.clientWidth,n=getComputedStyle(document.documentElement)["font-size"].replace(/px$/i,""),o=getComputedStyle(t)["font-size"].replace(/px$/i,""),r=0,i=0,a=0,s=0;if(null!=l.columns)r=l.columns,a=i=u(l.gap),s=(e-i*(r-1))/r;else if(null!=l.minWidth)a=i=u(l.gap),r=Math.floor((e+i)/(u(l.minWidth)+i)),s=(e-i*(r-1))/r;else if(null!=l.width){s=u(l.width);var c=u(l.minGap);a=c,r=Math.floor((e+c)/(s+c)),i=(e-s*r)/(r-1)}function u(t){return function(t,e,n,o){if(null==t)return 0;var r=/(^\d+(\.\d+)?)px$/i.exec(t);return r?parseFloat(r[1]):(r=/(^\d+(\.\d+)?)%$/.exec(t))?e*parseFloat(r[1])/100:(r=/(^\d+(\.\d+)?)rem$/i.exec(t))?n*parseFloat(r[1]):(r=/(^\d+(\.\d+)?)em$/i.exec(t))?o*parseFloat(r[1]):NaN==parseFloat(t)?0:parseFloat(t)}(t,e,n,o)}return{contaierWidth:e,columns:r,itemWidth:s,gap:i,vGap:a}},n.update=function(){var e=n.measure(),r=e.contaierWidth,i=e.columns,s=e.itemWidth,u=e.gap,p=e.vGap,m=l.itemSelector?t.querySelectorAll(l.itemSelector):t.children,v=[];if(0!=i){for(var g=0;g<i;g++)v.push({top:c,col:g});d=0;for(g=0;g<m.length;g++){var y=m[g];if(y!=o&&y!=a){v.sort(function(t,e){return t.top>e.top?1:t.top<e.top?-1:t.col>e.col?1:t.col<e.col?-1:0});var b=0==v[0].col?0:v[0].col*(s+u),w=v[0].top;y.classList.add("water-fall-item"),y.style.width=s+"px",y.style.left=b+"px",y.style.top=w+"px",v[0].top+=y.offsetHeight+p,v[0].top>=v[i-1].top&&(d=v[0].top)}}f(),(t.innerWidth||t.clientWidth)!=r?window.setTimeout(n.update,20):window.setTimeout(h,20)}};var c=0,u=0,d=0;function f(){t.style.height=d+u+"px"}n.showLoading=function(e){var r;e?(t.insertAdjacentHTML("afterbegin",l.loading),o=t.firstChild||t.firstElementChild,c=o.offsetHeight,n.update(),r=c,s.scrollTo(0,(s==window?document.documentElement.scrollTop||document.body.scrollTop:s.scrollTop)-r)):(t.insertAdjacentHTML("beforeend",l.loading),(a=t.lastChild||t.lastElementChild).classList.add("bottom"),u=a.offsetHeight,f(),function(t){s.scrollTo(0,(s==window?document.documentElement.scrollTop||document.body.scrollTop:s.scrollTop)+t)}(u))},n.hideLoading=function(){o&&(o.remove(),o=null,c=0,n.update()),a&&(a.remove(),a=null,u=0,f())};var p=(0,r.debounce)(function(){n.update(),m=s==window?document.documentElement.scrollTop||document.body.scrollTop:s.scrollTop},100);window.addEventListener("resize",p);var m=0,h=(0,r.debounce)(function(){if(t.parentElement){var e=s.innerHeight||s.clientHeight,i=s==window?document.documentElement.scrollTop||document.body.scrollTop:s.scrollTop,l=s==window?document.documentElement.scrollHeight||document.body.scrollHeight:s.scrollHeight;0==i&&m>i&&null==o&&n.dispatchEvent(new r.C3Event("touchtop")),i+e+1>=l&&m<=i&&null==a&&n.dispatchEvent(new r.C3Event("touchbottom")),m=i}},10);return s.addEventListener("scroll",h),n.destroy=function(){window.removeEventListener("resize",p),s.removeEventListener("scroll",h)},n.update(),n}(o=function(){}).prototype=r.C3EventDispatcher.prototype,a.prototype=new o},function(t,e,n){var o=n(2);"string"==typeof o&&(o=[[t.i,o,""]]);var r={insert:"head",singleton:!1};n(4)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".water-fall-container {\n  position: relative;\n}\n.water-fall-item {\n  position: absolute;\n  box-sizing: border-box;\n}\n.water-fall-loading {\n  width: 50px;\n  height: 50px;\n  padding: 1rem;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.water-fall-loading.bottom {\n  bottom: 0;\n}\n.water-fall-loading svg {\n  -webkit-animation: water-fall-loading-spin 1s linear infinite;\n  animation: water-fall-loading-spin 1s linear infinite;\n}\n@-webkit-keyframes water-fall-loading-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes water-fall-loading-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n",""])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(a=o,l=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(s," */")),i=o.sources.map(function(t){return"/*# sourceURL=".concat(o.sourceRoot).concat(t," */")});return[n].concat(i).concat([r]).join("\n")}var a,l,s;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];null!=i&&(o[i]=!0)}for(var a=0;a<t.length;a++){var l=t[a];null!=l[0]&&o[l[0]]||(n&&!l[2]?l[2]=n:n&&(l[2]="(".concat(l[2],") and (").concat(n,")")),e.push(l))}},e}},function(t,e,n){"use strict";var o,r={},i=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},a=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}();function l(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],l={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(l):n.push(o[a]={id:a,parts:[l]})}return n}function s(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=r[o.id],a=0;if(i){for(i.refs++;a<i.parts.length;a++)i.parts[a](o.parts[a]);for(;a<o.parts.length;a++)i.parts.push(v(o.parts[a],e))}else{for(var l=[];a<o.parts.length;a++)l.push(v(o.parts[a],e));r[o.id]={id:o.id,refs:1,parts:l}}}}function c(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var o=n.nc;o&&(t.attributes.nonce=o)}if(Object.keys(t.attributes).forEach(function(n){e.setAttribute(n,t.attributes[n])}),"function"==typeof t.insert)t.insert(e);else{var r=a(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var u,d=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function f(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=d(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function p(t,e,n){var o=n.css,r=n.media,i=n.sourceMap;if(r&&t.setAttribute("media",r),i&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var m=null,h=0;function v(t,e){var n,o,r;if(e.singleton){var i=h++;n=m||(m=c(e)),o=f.bind(null,n,i,!1),r=f.bind(null,n,i,!0)}else n=c(e),o=p.bind(null,n,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=i());var n=l(t,e);return s(n,e),function(t){for(var o=[],i=0;i<n.length;i++){var a=n[i],c=r[a.id];c&&(c.refs--,o.push(c))}t&&s(l(t,e),e);for(var u=0;u<o.length;u++){var d=o[u];if(0===d.refs){for(var f=0;f<d.parts.length;f++)d.parts[f]();delete r[d.id]}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.extend=function(t,e){var n={};for(var o in t)n[o]=t[o];for(var r in e)n[r]=e[r];return n},e.C3Event=function(t,e){this.type=t,this.data=e,this.target=null},e.C3EventDispatcher=function(){var t={};this.addEventListener=function(e,n){null==t[e]&&(t[e]=[]),-1==t[e].indexOf(n)&&t[e].push(n)},this.removeEventListener=function(e,n){if(null==t[e]&&(t[e]=[]),null==n)t[e].length>0&&(t[e]=[]);else{var o=t[e].indexOf(n);o>-1&&t[e].splice(o,1)}},this.dispatchEvent=function(e){if(e.target=this,null!=t[e.type])for(var n=0;n<t[e.type].length;n++)t[e.type][n](e)},this.hasEventListener=function(e){return null==t[e]&&(t[e]=[]),t[e].length>0}},e.debounce=function(t,e){var n;return function(){for(var o=this,r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];n?("immediate"!=n&&clearTimeout(n),n=setTimeout(function(){n=null,t.apply(o,i)},e)):(n="immediate",t.apply(this,i))}},e.throttle=function(t,e){var n;return function(){for(var o=this,r=arguments.length,i=new Array(r),a=0;a<r;a++)i[a]=arguments[a];n||(n=setTimeout(function(){n=null,t.apply(o,i)},e))}}}])});