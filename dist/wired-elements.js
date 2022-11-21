/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class o{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}}const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new o(s,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var a;const l=window,d=l.trustedTypes,h=d?d.emptyScript:"",c=l.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},u=(e,t)=>t!==e&&(t==t||e==e),f={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:u};class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=f){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||f}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=t.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=f){var s;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,o=s._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=s.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=o,this[o]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||u)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var v;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.4.2");const y=window,b=y.trustedTypes,m=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,k=`<${x}>`,R=document,$=(e="")=>R.createComment(e),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,S=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,j=/>/g,C=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),_=/'/g,E=/"/g,M=/^(?:script|style|textarea|title)$/i,P=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),I=P(1),L=(P(2),Symbol.for("lit-noChange")),N=Symbol.for("lit-nothing"),B=new WeakMap,T=R.createTreeWalker(R,129,null,!1),H=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":"",r=A;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===A?"!--"===l[1]?r=z:void 0!==l[1]?r=j:void 0!==l[2]?(M.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=C):void 0!==l[3]&&(r=C):r===C?">"===l[0]?(r=null!=o?o:A,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?C:'"'===l[3]?E:_):r===E||r===_?r=C:r===z||r===j?r=A:(r=C,o=void 0);const c=r===C&&e[t+1].startsWith("/>")?" ":"";n+=r===A?i+k:d>=0?(s.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+w+c):i+w+(-2===d?(s.push(void 0),t):c)}const a=n+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==m?m.createHTML(a):a,s]};class D{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[l,d]=H(e,t);if(this.el=D.createElement(l,i),T.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=T.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(w)){const i=d[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split(w),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?F:"?"===t[1]?K:"@"===t[1]?Y:W})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(M.test(s.tagName)){const e=s.textContent.split(w),t=e.length-1;if(t>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],$()),T.nextNode(),a.push({type:2,index:++o});s.append(e[t],$())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(w,e+1));)a.push({type:7,index:o}),e+=w.length-1}o++}}static createElement(e,t){const i=R.createElement("template");return i.innerHTML=e,i}}function U(e,t,i=e,s){var o,n,r,a;if(t===L)return t;let l=void 0!==s?null===(o=i._$Co)||void 0===o?void 0:o[s]:i._$Cl;const d=O(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,s)),void 0!==s?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=U(e,l._$AS(e,t.values),l,s)),t}class V{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:i},parts:s}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:R).importNode(i,!0);T.currentNode=o;let n=T.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new q(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new X(n,this,e)),this.u.push(t),l=s[++a]}r!==(null==l?void 0:l.index)&&(n=T.nextNode(),r++)}return o}p(e){let t=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class q{constructor(e,t,i,s){var o;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cm=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),O(e)?e===N||null==e||""===e?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==L&&this.g(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>S(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==N&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=D.createElement(s.h,this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.p(i);else{const e=new V(o,this),t=e.v(this.options);e.p(i),this.T(t),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new D(e)),t}k(e){S(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new q(this.O($()),this.O($()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cm=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class W{constructor(e,t,i,s,o){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=U(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==L,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=U(this,s[i+r],t,r),a===L&&(a=this._$AH[r]),n||(n=!O(a)||a!==this._$AH[r]),a===N?e=N:e!==N&&(e+=(null!=a?a:"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class F extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}const G=b?b.emptyScript:"";class K extends W{constructor(){super(...arguments),this.type=4}j(e){e&&e!==N?this.element.setAttribute(this.name,G):this.element.removeAttribute(this.name)}}class Y extends W{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=U(this,e,t,0))&&void 0!==i?i:N)===L)return;const s=this._$AH,o=e===N&&s!==N||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==N&&(s===N||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class X{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}}const Z=y.litHtmlPolyfillSupport;var J,Q;null==Z||Z(D,q),(null!==(v=y.litHtmlVersions)&&void 0!==v?v:y.litHtmlVersions=[]).push("2.4.0");class ee extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let r=n._$litPart$;if(void 0===r){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new q(t.insertBefore($(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return L}}ee.finalized=!0,ee._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:ee});const te=globalThis.litElementPolyfillSupport;null==te||te({LitElement:ee}),(null!==(Q=globalThis.litElementVersions)&&void 0!==Q?Q:globalThis.litElementVersions=[]).push("3.2.2");const ie=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t),se=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function oe(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):se(e,t)}function ne(e,t){return(({finisher:e,descriptor:t})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,n=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(n.finisher=function(t){e(t,s)}),n}{const o=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(o,s)}})({descriptor:i=>{const s={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[t]&&(this[t]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==s?s:null),this[t]}}return s}})}var re;null===(re=window.HTMLSlotElement)||void 0===re||re.prototype.assignedElements;const ae=n`
:host {
  opacity: 0;
}
:host(.wired-rendered) {
  opacity: 1;
}
#overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
svg {
  display: block;
}
path {
  stroke: currentColor;
  stroke-width: 0.7;
  fill: transparent;
}
.hidden {
  display: none !important;
}
`;class le extends ee{constructor(){super(...arguments),this.lastSize=[0,0],this.seed=Math.floor(Math.random()*2**31)}updated(e){this.wiredRender()}wiredRender(e=!1){if(this.svg){const t=this.canvasSize();if(!e&&t[0]===this.lastSize[0]&&t[1]===this.lastSize[1])return;for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);this.svg.setAttribute("width",`${t[0]}`),this.svg.setAttribute("height",`${t[1]}`),this.draw(this.svg,t),this.lastSize=t,this.classList.add("wired-rendered")}}fire(e,t){de(this,e,t)}}function de(e,t,i){e.dispatchEvent(new CustomEvent(t,{composed:!0,bubbles:!0,detail:i}))}!function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);n>3&&r&&Object.defineProperty(t,i,r)}([ne("svg"),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:type",SVGSVGElement)],le.prototype,"svg",void 0);class he{constructor(e){this.seed=e}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function ce(e,t,i,s,o){return{type:"path",ops:be(e,t,i,s,o)}}function pe(e,t){return function(e,t,i){const s=(e||[]).length;if(s>2){const t=[];for(let o=0;o<s-1;o++)t.push(...be(e[o][0],e[o][1],e[o+1][0],e[o+1][1],i));return t.push(...be(e[s-1][0],e[s-1][1],e[0][0],e[0][1],i)),{type:"path",ops:t}}return 2===s?ce(e[0][0],e[0][1],e[1][0],e[1][1],i):{type:"path",ops:[]}}(e,0,t)}function ue(e,t,i,s,o){return function(e,t,i,s){const[o,n]=xe(s.increment,e,t,s.rx,s.ry,1,s.increment*ve(.1,ve(.4,1,i),i),i);let r=we(o,null,i);if(!i.disableMultiStroke&&0!==i.roughness){const[o]=xe(s.increment,e,t,s.rx,s.ry,1.5,0,i),n=we(o,null,i);r=r.concat(n)}return{estimatedPoints:n,opset:{type:"path",ops:r}}}(e,t,o,fe(i,s,o)).opset}function fe(e,t,i){const s=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(e/2,2)+Math.pow(t/2,2))/2)),o=Math.max(i.curveStepCount,i.curveStepCount/Math.sqrt(200)*s),n=2*Math.PI/o;let r=Math.abs(e/2),a=Math.abs(t/2);const l=1-i.curveFitting;return r+=ye(r*l,i),a+=ye(a*l,i),{increment:n,rx:r,ry:a}}function ge(e){return e.randomizer||(e.randomizer=new he(e.seed||0)),e.randomizer.next()}function ve(e,t,i,s=1){return i.roughness*s*(ge(i)*(t-e)+e)}function ye(e,t,i=1){return ve(-e,e,t,i)}function be(e,t,i,s,o,n=!1){const r=n?o.disableMultiStrokeFill:o.disableMultiStroke,a=me(e,t,i,s,o,!0,!1);if(r)return a;const l=me(e,t,i,s,o,!0,!0);return a.concat(l)}function me(e,t,i,s,o,n,r){const a=Math.pow(e-i,2)+Math.pow(t-s,2),l=Math.sqrt(a);let d=1;d=l<200?1:l>500?.4:-.0016668*l+1.233334;let h=o.maxRandomnessOffset||0;h*h*100>a&&(h=l/10);const c=h/2,p=.2+.2*ge(o);let u=o.bowing*o.maxRandomnessOffset*(s-t)/200,f=o.bowing*o.maxRandomnessOffset*(e-i)/200;u=ye(u,o,d),f=ye(f,o,d);const g=[],v=()=>ye(c,o,d),y=()=>ye(h,o,d),b=o.preserveVertices;return n&&(r?g.push({op:"move",data:[e+(b?0:v()),t+(b?0:v())]}):g.push({op:"move",data:[e+(b?0:ye(h,o,d)),t+(b?0:ye(h,o,d))]})),r?g.push({op:"bcurveTo",data:[u+e+(i-e)*p+v(),f+t+(s-t)*p+v(),u+e+2*(i-e)*p+v(),f+t+2*(s-t)*p+v(),i+(b?0:v()),s+(b?0:v())]}):g.push({op:"bcurveTo",data:[u+e+(i-e)*p+y(),f+t+(s-t)*p+y(),u+e+2*(i-e)*p+y(),f+t+2*(s-t)*p+y(),i+(b?0:y()),s+(b?0:y())]}),g}function we(e,t,i){const s=e.length,o=[];if(s>3){const n=[],r=1-i.curveTightness;o.push({op:"move",data:[e[1][0],e[1][1]]});for(let t=1;t+2<s;t++){const i=e[t];n[0]=[i[0],i[1]],n[1]=[i[0]+(r*e[t+1][0]-r*e[t-1][0])/6,i[1]+(r*e[t+1][1]-r*e[t-1][1])/6],n[2]=[e[t+1][0]+(r*e[t][0]-r*e[t+2][0])/6,e[t+1][1]+(r*e[t][1]-r*e[t+2][1])/6],n[3]=[e[t+1][0],e[t+1][1]],o.push({op:"bcurveTo",data:[n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]]})}if(t&&2===t.length){const e=i.maxRandomnessOffset;o.push({op:"lineTo",data:[t[0]+ye(e,i),t[1]+ye(e,i)]})}}else 3===s?(o.push({op:"move",data:[e[1][0],e[1][1]]}),o.push({op:"bcurveTo",data:[e[1][0],e[1][1],e[2][0],e[2][1],e[2][0],e[2][1]]})):2===s&&o.push(...be(e[0][0],e[0][1],e[1][0],e[1][1],i));return o}function xe(e,t,i,s,o,n,r,a){const l=[],d=[],h=ye(.5,a)-Math.PI/2,c=0===a.roughness;c||d.push([ye(n,a)+t+.9*s*Math.cos(h-e),ye(n,a)+i+.9*o*Math.sin(h-e)]);const p=2*Math.PI+(c?0:h-.01);for(let r=h;r<p;r+=e){const e=[ye(n,a)+t+s*Math.cos(r),ye(n,a)+i+o*Math.sin(r)];l.push(e),d.push(e)}return c||(d.push([ye(n,a)+t+s*Math.cos(h+2*Math.PI+.5*r),ye(n,a)+i+o*Math.sin(h+2*Math.PI+.5*r)]),d.push([ye(n,a)+t+.98*s*Math.cos(h+r),ye(n,a)+i+.98*o*Math.sin(h+r)]),d.push([ye(n,a)+t+.9*s*Math.cos(h+.5*r),ye(n,a)+i+.9*o*Math.sin(h+.5*r)])),[d,l]}function ke(e,t,i){if(e&&e.length){const[s,o]=t,n=Math.PI/180*i,r=Math.cos(n),a=Math.sin(n);e.forEach((e=>{const[t,i]=e;e[0]=(t-s)*r-(i-o)*a+s,e[1]=(t-s)*a+(i-o)*r+o}))}}function Re(e){const t=e[0],i=e[1];return Math.sqrt(Math.pow(t[0]-i[0],2)+Math.pow(t[1]-i[1],2))}function $e(e,t,i,s){const o=t[1]-e[1],n=e[0]-t[0],r=o*e[0]+n*e[1],a=s[1]-i[1],l=i[0]-s[0],d=a*i[0]+l*i[1],h=o*l-a*n;return h?[(l*r-n*d)/h,(o*d-a*r)/h]:null}function Oe(e,t,i){const s=e.length;if(s<3)return!1;const o=[Number.MAX_SAFE_INTEGER,i],n=[t,i];let r=0;for(let t=0;t<s;t++){const i=e[t],a=e[(t+1)%s];if(ze(i,a,n,o)){if(0===Ae(i,n,a))return Se(i,n,a);r++}}return r%2==1}function Se(e,t,i){return t[0]<=Math.max(e[0],i[0])&&t[0]>=Math.min(e[0],i[0])&&t[1]<=Math.max(e[1],i[1])&&t[1]>=Math.min(e[1],i[1])}function Ae(e,t,i){const s=(t[1]-e[1])*(i[0]-t[0])-(t[0]-e[0])*(i[1]-t[1]);return 0===s?0:s>0?1:2}function ze(e,t,i,s){const o=Ae(e,t,i),n=Ae(e,t,s),r=Ae(i,s,e),a=Ae(i,s,t);return o!==n&&r!==a||!(0!==o||!Se(e,i,t))||!(0!==n||!Se(e,s,t))||!(0!==r||!Se(i,e,s))||!(0!==a||!Se(i,t,s))}class je{constructor(e){this.helper=e}fillPolygon(e,t){return this._fillPolygon(e,t)}_fillPolygon(e,t,i=!1){let s=function(e,t){const i=[0,0],s=Math.round(t.hachureAngle+90);s&&ke(e,i,s);const o=function(e,t){const i=[...e];i[0].join(",")!==i[i.length-1].join(",")&&i.push([i[0][0],i[0][1]]);const s=[];if(i&&i.length>2){let e=t.hachureGap;e<0&&(e=4*t.strokeWidth),e=Math.max(e,.1);const o=[];for(let e=0;e<i.length-1;e++){const t=i[e],s=i[e+1];if(t[1]!==s[1]){const e=Math.min(t[1],s[1]);o.push({ymin:e,ymax:Math.max(t[1],s[1]),x:e===t[1]?t[0]:s[0],islope:(s[0]-t[0])/(s[1]-t[1])})}}if(o.sort(((e,t)=>e.ymin<t.ymin?-1:e.ymin>t.ymin?1:e.x<t.x?-1:e.x>t.x?1:e.ymax===t.ymax?0:(e.ymax-t.ymax)/Math.abs(e.ymax-t.ymax))),!o.length)return s;let n=[],r=o[0].ymin;for(;n.length||o.length;){if(o.length){let e=-1;for(let t=0;t<o.length&&!(o[t].ymin>r);t++)e=t;o.splice(0,e+1).forEach((e=>{n.push({s:r,edge:e})}))}if(n=n.filter((e=>!(e.edge.ymax<=r))),n.sort(((e,t)=>e.edge.x===t.edge.x?0:(e.edge.x-t.edge.x)/Math.abs(e.edge.x-t.edge.x))),n.length>1)for(let e=0;e<n.length;e+=2){const t=e+1;if(t>=n.length)break;const i=n[e].edge,o=n[t].edge;s.push([[Math.round(i.x),r],[Math.round(o.x),r]])}r+=e,n.forEach((t=>{t.edge.x=t.edge.x+e*t.edge.islope}))}}return s}(e,t);return s&&(ke(e,i,-s),function(e,t,i){const s=[];e.forEach((e=>s.push(...e))),ke(s,t,i)}(o,i,-s)),o}(e,t);if(i){const t=this.connectingLines(e,s);s=s.concat(t)}return{type:"fillSketch",ops:this.renderLines(s,t)}}renderLines(e,t){const i=[];for(const s of e)i.push(...this.helper.doubleLineOps(s[0][0],s[0][1],s[1][0],s[1][1],t));return i}connectingLines(e,t){const i=[];if(t.length>1)for(let s=1;s<t.length;s++){const o=t[s-1];if(Re(o)<3)continue;const n=[t[s][0],o[1]];if(Re(n)>3){const t=this.splitOnIntersections(e,n);i.push(...t)}}return i}midPointInPolygon(e,t){return Oe(e,(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2)}splitOnIntersections(e,t){const i=Math.max(5,.1*Re(t)),s=[];for(let o=0;o<e.length;o++){const n=e[o],r=e[(o+1)%e.length];if(ze(n,r,...t)){const e=$e(n,r,t[0],t[1]);if(e){const o=Re([e,t[0]]),n=Re([e,t[1]]);o>i&&n>i&&s.push({point:e,distance:o})}}}if(s.length>1){const i=s.sort(((e,t)=>e.distance-t.distance)).map((e=>e.point));if(Oe(e,...t[0])||i.shift(),Oe(e,...t[1])||i.pop(),i.length<=1)return this.midPointInPolygon(e,t)?[t]:[];const o=[t[0],...i,t[1]],n=[];for(let t=0;t<o.length-1;t+=2){const i=[o[t],o[t+1]];this.midPointInPolygon(e,i)&&n.push(i)}return n}return this.midPointInPolygon(e,t)?[t]:[]}}class Ce extends je{fillPolygon(e,t){return this._fillPolygon(e,t,!0)}}const _e={randOffset:(e,t)=>e,randOffsetWithRange:(e,t,i)=>(e+t)/2,ellipse:(e,t,i,s,o)=>ue(e,t,i,s,o),doubleLineOps:(e,t,i,s,o)=>function(e,t,i,s,o){return be(e,t,i,s,o,!0)}(e,t,i,s,o)};function Ee(e){return{maxRandomnessOffset:2,roughness:1,bowing:.85,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:3.5,hachureAngle:-41,hachureGap:5,dashOffset:-1,dashGap:-1,zigzagOffset:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1,seed:e}}function Me(e,t){let i="";for(const s of e.ops){const e=s.data;switch(s.op){case"move":if(t&&i)break;i+=`M${e[0]} ${e[1]} `;break;case"bcurveTo":i+=`C${e[0]} ${e[1]}, ${e[2]} ${e[3]}, ${e[4]} ${e[5]} `;break;case"lineTo":i+=`L${e[0]} ${e[1]} `}}return i.trim()}function Pe(e,t){const i=document.createElementNS("http://www.w3.org/2000/svg",e);if(t)for(const e in t)i.setAttributeNS(null,e,t[e]);return i}function Ie(e,t,i=!1){const s=Pe("path",{d:Me(e,i)});return t&&t.appendChild(s),s}function Le(e,t,i,s,o,n){return Ie(function(e,t,i,s,o){return pe([[e,t],[e+i,t],[e+i,t+s],[e,t+s]],o)}(t+2,i+2,s-4,o-4,Ee(n)),e)}function Ne(e,t,i,s,o,n){return Ie(ce(t,i,s,o,Ee(n)),e)}function Be(e,t,i,s,o,n){return Ie(ue(t,i,s=Math.max(s>10?s-4:s-1,1),o=Math.max(o>10?o-4:o-1,1),Ee(n)),e)}function Te(e,t){return Ie(new Ce(_e).fillPolygon(e,Ee(t)),null)}function He(e,t,i,s,o){const n=fe(i,s,Ee(o)),r=[];let a=0;for(;a<=2*Math.PI;)r.push([e+n.rx*Math.cos(a),t+n.ry*Math.sin(a)]),a+=n.increment;return Te(r,o)}var De=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Ue=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ve=class extends le{constructor(){super(),this.elevation=1,this.disabled=!1,this.roAttached=!1,window.ResizeObserver&&(this.ro=new window.ResizeObserver((()=>{this.svg&&this.wiredRender(!0)})))}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
      `]}render(){return I`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}focus(){this.button?this.button.focus():super.focus()}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0]-2*(i-1),height:t[1]-2*(i-1)};Le(e,0,0,s.width,s.height,this.seed);for(let t=1;t<i;t++)Ne(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Ne(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100,Ne(e,2*t,s.height+2*t,s.width+2*t,s.height+2*t,this.seed).style.opacity=""+(75-10*t)/100,Ne(e,s.width+2*t,s.height+2*t,s.width+2*t,2*t,this.seed).style.opacity=""+(75-10*t)/100}updated(){super.updated(),this.roAttached||this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.button&&this.ro&&(this.ro.observe(this.button),this.roAttached=!0)}detachResizeListener(){this.button&&this.ro&&this.ro.unobserve(this.button),this.roAttached=!1}};De([oe({type:Number}),Ue("design:type",Object)],Ve.prototype,"elevation",void 0),De([oe({type:Boolean,reflect:!0}),Ue("design:type",Object)],Ve.prototype,"disabled",void 0),De([ne("button"),Ue("design:type",HTMLButtonElement)],Ve.prototype,"button",void 0),Ve=De([ie("wired-button"),Ue("design:paramtypes",[])],Ve);var qe=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},We=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Fe=class extends le{constructor(){super(),this.elevation=1,this.roAttached=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
        path.cardFill {
          stroke-width: 3.5;
          stroke: var(--wired-card-background-fill);
        }
        path {
          stroke: var(--wired-card-background-fill, currentColor);
        }
      `]}render(){return I`
    <div id="overlay"><svg></svg></div>
    <div style="position: relative;">
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    `}updated(e){const t=e.has("fill");this.wiredRender(t),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.resizeObserver?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0})),this.roAttached=!0)}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler),this.roAttached=!1}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),o=t[1]-2*(i-1);if(this.fill&&this.fill.trim()){const t=Te([[2,2],[s-4,2],[s-2,o-4],[2,o-4]],this.seed);t.classList.add("cardFill"),e.style.setProperty("--wired-card-background-fill",this.fill.trim()),e.appendChild(t)}Le(e,2,2,s-4,o-4,this.seed);for(let t=1;t<i;t++)Ne(e,2*t,o-4+2*t,s-4+2*t,o-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ne(e,s-4+2*t,o-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Ne(e,2*t,o-4+2*t,s-4+2*t,o-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ne(e,s-4+2*t,o-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};qe([oe({type:Number}),We("design:type",Object)],Fe.prototype,"elevation",void 0),qe([oe({type:String}),We("design:type",String)],Fe.prototype,"fill",void 0),Fe=qe([ie("wired-card"),We("design:paramtypes",[])],Fe);var Ge=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Ke=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ye=class extends le{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-checkbox-icon-color, currentColor);
        stroke-width: var(--wired-checkbox-default-swidth, 0.7);
      }
      g path {
        stroke-width: 2.5;
      }
      #container.focused {
        --wired-checkbox-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return I`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),this.fire("change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Le(e,0,0,t[0],t[1],this.seed),this.svgCheck=Pe("g"),e.appendChild(this.svgCheck),Ne(this.svgCheck,.3*t[0],.4*t[1],.5*t[0],.7*t[1],this.seed),Ne(this.svgCheck,.5*t[0],.7*t[1],t[0]+5,-5,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};Ge([oe({type:Boolean}),Ke("design:type",Object)],Ye.prototype,"checked",void 0),Ge([oe({type:Boolean,reflect:!0}),Ke("design:type",Object)],Ye.prototype,"disabled",void 0),Ge([oe({state:!0}),Ke("design:type",Object)],Ye.prototype,"focused",void 0),Ge([ne("input"),Ke("design:type",HTMLInputElement)],Ye.prototype,"input",void 0),Ye=Ge([ie("wired-checkbox")],Ye);var Xe=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Ze=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Je=class extends le{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        font-size: 14px;
        text-align: left;
      }
      button {
        cursor: pointer;
        outline: none;
        overflow: hidden;
        color: inherit;
        user-select: none;
        position: relative;
        font-family: inherit;
        text-align: inherit;
        font-size: inherit;
        letter-spacing: 1.25px;
        padding: 1px 10px;
        min-height: 36px;
        text-transform: inherit;
        background: none;
        border: none;
        transition: background-color 0.3s ease, color 0.3s ease;
        width: 100%;
        box-sizing: border-box;
        white-space: nowrap;
      }
      button.selected {
        color: var(--wired-item-selected-color, #fff);
      }
      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: 0;
      }
      button span {
        display: inline-block;
        transition: transform 0.2s ease;
        position: relative;
      }
      button:active span {
        transform: scale(1.02);
      }
      #overlay {
        display: none;
      }
      button.selected #overlay {
        display: block;
      }
      svg path {
        stroke: var(--wired-item-selected-bg, #000);
        stroke-width: 2.75;
        fill: transparent;
        transition: transform 0.05s ease;
      }
      @media (hover: hover) {
        button:hover::before {
          opacity: 0.05;
        }
      }
      `]}render(){return I`
    <button class="${this.selected?"selected":""}">
      <div id="overlay"><svg></svg></div>
      <span><slot></slot></span>
    </button>`}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){const i=Te([[0,0],[t[0],0],[t[0],t[1]],[0,t[1]]],this.seed);e.appendChild(i)}};Xe([oe(),Ze("design:type",Object)],Je.prototype,"value",void 0),Xe([oe(),Ze("design:type",Object)],Je.prototype,"name",void 0),Xe([oe({type:Boolean}),Ze("design:type",Object)],Je.prototype,"selected",void 0),Je=Xe([ie("wired-item")],Je);var Qe=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},et=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let tt=class extends ee{constructor(){super(...arguments),this.disabled=!1,this.seed=Math.floor(Math.random()*2**31),this.cardShowing=!1,this.itemNodes=[]}static get styles(){return n`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        outline: none;
        opacity: 0;
      }
    
      :host(.wired-disabled) {
        opacity: 0.5 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.02);
      }
      
      :host(.wired-rendered) {
        opacity: 1;
      }
  
      :host(:focus) path {
        stroke-width: 1.5;
      }
    
      #container {
        white-space: nowrap;
        position: relative;
      }
    
      .inline {
        display: inline-block;
        vertical-align: top
      }
    
      #textPanel {
        min-width: 90px;
        min-height: 18px;
        padding: 8px;
      }
    
      #dropPanel {
        width: 34px;
        cursor: pointer;
      }
    
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    
      svg {
        display: block;
      }
    
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
      }
    
      #card {
        display: block;
        position: absolute;
        background: var(--wired-combo-popup-bg, white);
        z-index: 1;
        box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
        padding: 8px;
      }
  
      ::slotted(wired-item) {
        display: block;
      }
    `}render(){return I`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}" style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",(()=>{this.cardShowing&&this.setCardShowing(!1)})),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext();break;case 27:e.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:e.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:e.preventDefault(),this.cardShowing||this.setCardShowing(!0)}}))}updated(e){e.has("disabled")&&this.refreshDisabledState();const t=this.svg;for(;t.hasChildNodes();)t.removeChild(t.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();t.setAttribute("width",`${i.width}`),t.setAttribute("height",`${i.height}`);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Le(t,0,0,s.width,s.height,this.seed);const o=s.width-4;Le(t,o,0,34,s.height,this.seed);const n=Math.max(0,Math.abs((s.height-24)/2)),r=(a=t,Ie(pe([[o+8,5+n],[o+26,5+n],[o+17,n+Math.min(s.height,18)]],Ee(this.seed)),a,!0));var a;if(r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||s.getAttribute("value")||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}setCardShowing(e){this.card&&(this.cardShowing=e,this.card.style.display=e?"":"none",e&&setTimeout((()=>{const e=this.shadowRoot.getElementById("slot").assignedNodes().filter((e=>e.nodeType===Node.ELEMENT_NODE));e.forEach((e=>{const t=e;t.requestUpdate&&t.requestUpdate()}))}),10),this.setAttribute("aria-expanded",`${this.cardShowing}`))}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected(),setTimeout((()=>{this.setCardShowing(!1)}))}fireSelected(){de(this,"selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(e){e.stopPropagation(),this.setCardShowing(!this.cardShowing)}};Qe([oe({type:Object}),et("design:type",Object)],tt.prototype,"value",void 0),Qe([oe({type:String,reflect:!0}),et("design:type",String)],tt.prototype,"selected",void 0),Qe([oe({type:Boolean,reflect:!0}),et("design:type",Object)],tt.prototype,"disabled",void 0),Qe([ne("svg"),et("design:type",SVGSVGElement)],tt.prototype,"svg",void 0),Qe([ne("#card"),et("design:type",HTMLDivElement)],tt.prototype,"card",void 0),tt=Qe([ie("wired-combo")],tt);var it=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},st=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ot=class extends ee{constructor(){super(...arguments),this.elevation=5,this.open=!1}static get styles(){return n`
      #container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: var(--wired-dialog-z-index, 100);
      }
      #container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      #overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transform: translateY(150px);
        transition: transform 0.5s ease, opacity 0.5s ease;
      }
      .layout.vertical {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      .flex {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      }
      wired-card {
        display: inline-block;
        background: white;
        text-align: left;
      }

      :host([open]) #container {
        pointer-events: auto;
      }
      :host([open]) #container::before {
        opacity: 1;
      }
      :host([open]) #overlay {
        opacity: 1;
        transform: none;
      }
    `}render(){return I`
    <div id="container">
      <div id="overlay" class="vertical layout">
        <div class="flex"></div>
        <div style="text-align: center; padding: 5px;">
          <wired-card .elevation="${this.elevation}"><slot></slot></wired-card>
        </div>
        <div class="flex"></div>
      </div>
    </div>
    `}updated(){this.card&&this.card.wiredRender(!0)}};it([oe({type:Number}),st("design:type",Object)],ot.prototype,"elevation",void 0),it([oe({type:Boolean,reflect:!0}),st("design:type",Object)],ot.prototype,"open",void 0),it([ne("wired-card"),st("design:type",Fe)],ot.prototype,"card",void 0),ot=it([ie("wired-dialog")],ot);var nt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let rt=class extends le{constructor(){super(...arguments),this.elevation=1,this.roAttached=!1}static get styles(){return[ae,n`
        :host {
          display: block;
          position: relative;
        }
      `]}render(){return I`<svg></svg>`}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,6*t]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5);for(let s=0;s<i;s++)Ne(e,0,6*s+3,t[0],6*s+3,this.seed)}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.resizeObserver?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0})),this.roAttached=!0)}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler),this.roAttached=!1}};nt([oe({type:Number}),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:type",Object)],rt.prototype,"elevation",void 0),rt=nt([ie("wired-divider")],rt);var at=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},lt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let dt=class extends le{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          font-size: 14px;
          color: #fff;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 16px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0.85;
        }
        path {
          stroke: var(--wired-fab-bg-color, #018786);
          stroke-width: 3;
          fill: transparent;
        }

        button:focus ::slotted(*) {
          opacity: 1;
        }
        button:active ::slotted(*) {
          opacity: 1;
          transform: scale(1.15);
        }
      `]}render(){return I`
    <button ?disabled="${this.disabled}">
      <div id="overlay">
        <svg></svg>
      </div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </button>
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]),s=He(i/2,i/2,i,i,this.seed);e.appendChild(s)}};at([oe({type:Boolean,reflect:!0}),lt("design:type",Object)],dt.prototype,"disabled",void 0),at([ne("button"),lt("design:type",HTMLButtonElement)],dt.prototype,"button",void 0),dt=at([ie("wired-fab")],dt);var ht=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},ct=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let pt=class extends le{constructor(){super(...arguments),this.disabled=!1}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          font-size: 14px;
        }
        path {
          transition: transform 0.05s ease;
        }
        button {
          position: relative;
          user-select: none;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          cursor: pointer;
          letter-spacing: 1.25px;
          text-transform: uppercase;
          text-align: center;
          padding: 10px;
          color: inherit;
          outline: none;
          border-radius: 50%;
        }
        button[disabled] {
          opacity: 0.6 !important;
          background: rgba(0, 0, 0, 0.07);
          cursor: default;
          pointer-events: none;
        }
        button:active path {
          transform: scale(0.97) translate(1.5%, 1.5%);
        }
        button:focus path {
          stroke-width: 1.5;
        }
        button::-moz-focus-inner {
          border: 0;
        }
        button ::slotted(*) {
          position: relative;
          font-size: var(--wired-icon-size, 24px);
        }
      `]}render(){return I`
    <button ?disabled="${this.disabled}">
      <slot @slotchange="${this.wiredRender}"></slot>
      <div id="overlay">
        <svg></svg>
      </div>
    </button>
    `}canvasSize(){if(this.button){const e=this.button.getBoundingClientRect();return[e.width,e.height]}return this.lastSize}draw(e,t){const i=Math.min(t[0],t[1]);e.setAttribute("width",`${i}`),e.setAttribute("height",`${i}`),Be(e,i/2,i/2,i,i,this.seed)}};ht([oe({type:Boolean,reflect:!0}),ct("design:type",Object)],pt.prototype,"disabled",void 0),ht([ne("button"),ct("design:type",HTMLButtonElement)],pt.prototype,"button",void 0),pt=ht([ie("wired-icon-button")],pt);var ut=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},ft=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let gt=class extends le{constructor(){super(),this.elevation=1,this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",this.roAttached=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px;
        }
        img {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
      `]}render(){return I`
    <img src="${this.src}">
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0})),this.roAttached=!0)}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler),this.roAttached=!1}canvasSize(){const e=this.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width+2*(t-1),e.height+2*(t-1)]}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s=t[0]-2*(i-1),o=t[1]-2*(i-1);Le(e,2,2,s-4,o-4,this.seed);for(let t=1;t<i;t++)Ne(e,2*t,o-4+2*t,s-4+2*t,o-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ne(e,s-4+2*t,o-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100,Ne(e,2*t,o-4+2*t,s-4+2*t,o-4+2*t,this.seed).style.opacity=""+(85-10*t)/100,Ne(e,s-4+2*t,o-4+2*t,s-4+2*t,2*t,this.seed).style.opacity=""+(85-10*t)/100}};ut([oe({type:Number}),ft("design:type",Object)],gt.prototype,"elevation",void 0),ut([oe({type:String}),ft("design:type",String)],gt.prototype,"src",void 0),gt=ut([ie("wired-image"),ft("design:paramtypes",[])],gt);var vt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},yt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let bt=class extends le{constructor(){super(),this.disabled=!1,this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.required=!1,this.autofocus=!1,this.readonly=!1,this.roAttached=!1,window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender(!0)})))}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `]}render(){return I`
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,2,2,t[0]-2,t[1]-2,this.seed)}refire(e){e.stopPropagation(),this.fire(e.type,{sourceEvent:e})}focus(){this.textInput?this.textInput.focus():super.focus()}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.roAttached||(this.textInput&&this.resizeObserver&&this.resizeObserver.observe(this.textInput),this.roAttached=!0)}detachResizeListener(){this.textInput&&this.resizeObserver&&this.resizeObserver.unobserve(this.textInput),this.roAttached=!1}};vt([oe({type:Boolean,reflect:!0}),yt("design:type",Object)],bt.prototype,"disabled",void 0),vt([oe({type:String}),yt("design:type",Object)],bt.prototype,"placeholder",void 0),vt([oe({type:String}),yt("design:type",String)],bt.prototype,"name",void 0),vt([oe({type:String}),yt("design:type",String)],bt.prototype,"min",void 0),vt([oe({type:String}),yt("design:type",String)],bt.prototype,"max",void 0),vt([oe({type:String}),yt("design:type",String)],bt.prototype,"step",void 0),vt([oe({type:String}),yt("design:type",Object)],bt.prototype,"type",void 0),vt([oe({type:String}),yt("design:type",Object)],bt.prototype,"autocomplete",void 0),vt([oe({type:String}),yt("design:type",Object)],bt.prototype,"autocapitalize",void 0),vt([oe({type:String}),yt("design:type",Object)],bt.prototype,"autocorrect",void 0),vt([oe({type:Boolean}),yt("design:type",Object)],bt.prototype,"required",void 0),vt([oe({type:Boolean}),yt("design:type",Object)],bt.prototype,"autofocus",void 0),vt([oe({type:Boolean}),yt("design:type",Object)],bt.prototype,"readonly",void 0),vt([oe({type:Number}),yt("design:type",Number)],bt.prototype,"minlength",void 0),vt([oe({type:Number}),yt("design:type",Number)],bt.prototype,"maxlength",void 0),vt([oe({type:Number}),yt("design:type",Number)],bt.prototype,"size",void 0),vt([ne("input"),yt("design:type",HTMLInputElement)],bt.prototype,"textInput",void 0),bt=vt([ie("wired-input"),yt("design:paramtypes",[])],bt);var mt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},wt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let xt=class extends le{constructor(){super(...arguments),this.elevation=1}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
        }
        a, a:hover, a:visited {
          color: inherit;
          outline: none;
          display: inline-block;
          white-space: nowrap;
          text-decoration: none;
          border: none;
        }
        path {
          stroke: var(--wired-link-decoration-color, blue);
          stroke-opacity: 0.45;
        }
        a:focus path {
          stroke-opacity: 1;
        }
      `]}render(){return I`
    <a href="${this.href}" target="${this.target||""}">
      <slot></slot>
      <div id="overlay"><svg></svg></div>
    </a>
    `}focus(){this.anchor?this.anchor.focus():super.focus()}canvasSize(){if(this.anchor){const e=this.anchor.getBoundingClientRect(),t=Math.min(Math.max(1,this.elevation),5);return[e.width,e.height+2*(t-1)]}return this.lastSize}draw(e,t){const i=Math.min(Math.max(1,this.elevation),5),s={width:t[0],height:t[1]-2*(i-1)};for(let t=0;t<i;t++)Ne(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed),Ne(e,0,s.height+2*t-2,s.width,s.height+2*t-2,this.seed)}};mt([oe({type:Number}),wt("design:type",Object)],xt.prototype,"elevation",void 0),mt([oe({type:String}),wt("design:type",String)],xt.prototype,"href",void 0),mt([oe({type:String}),wt("design:type",String)],xt.prototype,"target",void 0),mt([ne("a"),wt("design:type",HTMLAnchorElement)],xt.prototype,"anchor",void 0),xt=mt([ie("wired-link")],xt);var kt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Rt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let $t=class extends le{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        padding: 5px;
        outline: none;
      }
      :host(:focus) path {
        stroke-width: 1.5;
      }
      ::slotted(wired-item) {
        display: block;
      }
      :host(.wired-horizontal) ::slotted(wired-item) {
        display: inline-block;
      }
      `]}render(){return I`
    <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
    <div id="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}}))}updated(){if(super.updated(),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(e){e.stopPropagation(),this.selected=e.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const e=this.shadowRoot.getElementById("slot").assignedNodes();if(e){let t=null;for(let i=0;i<e.length;i++){const s=e[i];if("WIRED-ITEM"===s.tagName){const e=s.value||"";if(this.selected&&e===this.selected){t=s;break}}}this.lastSelectedItem=t||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=t?{value:t.value||"",text:t.textContent||""}:void 0}}fireSelected(){this.fire("selected",{selected:this.selected})}selectPrevious(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const e=this.itemNodes;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.lastSelectedItem){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].value||"",this.refreshSelection(),this.fireSelected()}}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,0,0,t[0],t[1],this.seed)}};kt([oe({type:Object}),Rt("design:type",Object)],$t.prototype,"value",void 0),kt([oe({type:String}),Rt("design:type",String)],$t.prototype,"selected",void 0),kt([oe({type:Boolean}),Rt("design:type",Object)],$t.prototype,"horizontal",void 0),$t=kt([ie("wired-listbox")],$t);var Ot=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},St=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let At=class extends le{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        height: 42px;
        font-family: sans-serif;
      }
      .labelContainer {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .progressLabel {
        color: var(--wired-progress-label-color, #000);
        font-size: var(--wired-progress-font-size, 14px);
        background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      path.progbox {
        stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
        stroke-width: 2.75;
        fill: none;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
      `]}render(){return I`
    <div id="overlay" class="overlay">
      <svg></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `}getProgressLabel(){return this.percentage?this.max===this.min?"%":Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%":""+this.value}wiredRender(e=!1){super.wiredRender(e),this.refreshProgressFill()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,2,2,t[0]-2,t[1]-2,this.seed)}refreshProgressFill(){if(this.progBox&&(this.progBox.parentElement&&this.progBox.parentElement.removeChild(this.progBox),this.progBox=void 0),this.svg){let e=0;const t=this.getBoundingClientRect();if(this.max>this.min){e=(this.value-this.min)/(this.max-this.min);const i=t.width*Math.max(0,Math.min(e,100));this.progBox=Te([[0,0],[i,0],[i,t.height],[0,t.height]],this.seed),this.svg.appendChild(this.progBox),this.progBox.classList.add("progbox")}}}};Ot([oe({type:Number}),St("design:type",Object)],At.prototype,"value",void 0),Ot([oe({type:Number}),St("design:type",Object)],At.prototype,"min",void 0),Ot([oe({type:Number}),St("design:type",Object)],At.prototype,"max",void 0),Ot([oe({type:Boolean}),St("design:type",Object)],At.prototype,"percentage",void 0),At=Ot([ie("wired-progress")],At);var zt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Ct=class extends le{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.focused=!1}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-radio-icon-color, currentColor);
        stroke-width: var(--wired-radio-default-swidth, 0.7);
      }
      g path {
        stroke-width: 0;
        fill: var(--wired-radio-icon-color, currentColor);
      }
      #container.focused {
        --wired-radio-default-swidth: 1.5;
      }
      `]}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshCheckVisibility()}render(){return I`
    <label id="container" class="${this.focused?"focused":""}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${()=>this.focused=!0}"
        @blur="${()=>this.focused=!1}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `}onChange(){this.checked=this.input.checked,this.refreshCheckVisibility(),this.fire("change",{checked:this.checked})}canvasSize(){return[24,24]}draw(e,t){Be(e,t[0]/2,t[1]/2,t[0],t[1],this.seed),this.svgCheck=Pe("g"),e.appendChild(this.svgCheck);const i=Math.max(.6*t[0],5),s=Math.max(.6*t[1],5);Be(this.svgCheck,t[0]/2,t[1]/2,i,s,this.seed)}refreshCheckVisibility(){this.svgCheck&&(this.svgCheck.style.display=this.checked?"":"none")}};zt([oe({type:Boolean}),jt("design:type",Object)],Ct.prototype,"checked",void 0),zt([oe({type:Boolean,reflect:!0}),jt("design:type",Object)],Ct.prototype,"disabled",void 0),zt([oe({type:String}),jt("design:type",String)],Ct.prototype,"name",void 0),zt([oe(),jt("design:type",Object)],Ct.prototype,"focused",void 0),zt([ne("input"),jt("design:type",HTMLInputElement)],Ct.prototype,"input",void 0),Ct=zt([ie("wired-radio")],Ct);var _t=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r};let Et=class extends ee{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return n`
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `}render(){return I`<slot id="slot" @slotchange="${this.slotChange}"></slot>`}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",this.checkListener)}handleChecked(e){const t=e.detail.checked,i=e.target,s=i.name||"";t?(this.selected=t&&s||"",this.fireSelected()):i.checked=!0}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}}))}updated(){const e=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],e&&e.length)for(let t=0;t<e.length;t++){const i=e[t];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const e=i.name||"";this.selected&&e===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++)if(e[t].name===this.selected){i=t;break}i<0?t=e[0]:(i--,i<0&&(i=e.length-1),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}selectNext(){const e=this.radioNodes;if(e.length){let t=null,i=-1;if(this.selected){for(let t=0;t<e.length;t++)if(e[t].name===this.selected){i=t;break}i<0?t=e[0]:(i++,i>=e.length&&(i=0),t=e[i])}else t=e[0];t&&(t.focus(),this.selected=t.name,this.fireSelected())}}fireSelected(){de(this,"selected",{selected:this.selected})}};_t([oe({type:String}),function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}("design:type",String)],Et.prototype,"selected",void 0),Et=_t([ie("wired-radio-group")],Et);var Mt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Pt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let It=class extends le{constructor(){super(...arguments),this.disabled=!1,this.placeholder="",this.autocomplete="",this.autocorrect="",this.autofocus=!1}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px 40px 10px 5px;
          font-family: sans-serif;
          width: 180px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        
        input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
        input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        .thicker path {
          stroke-width: 1.5;
        }

        button {
          position: absolute;
          top: 0;
          right: 2px;
          width: 32px;
          height: 100%;
          box-sizing: border-box;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          opacity: 0;
        }
      `]}render(){return I`
    <input type="search" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" 
      autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    <button @click="${()=>this.value=""}"></button>
    `}get input(){return this.textInput}get value(){const e=this.input;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.input;t&&(t.value=e),this.refreshIconState()}else this.pendingValue=e}wiredRender(e=!1){super.wiredRender(e),this.refreshIconState()}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,2,2,t[0]-2,t[1]-2,this.seed),this.searchIcon=Pe("g"),this.searchIcon.classList.add("thicker"),e.appendChild(this.searchIcon),Be(this.searchIcon,t[0]-30,(t[1]-30)/2+10,20,20,this.seed),Ne(this.searchIcon,t[0]-10,(t[1]-30)/2+30,t[0]-25,(t[1]-30)/2+15,this.seed),this.closeIcon=Pe("g"),this.closeIcon.classList.add("thicker"),e.appendChild(this.closeIcon),Ne(this.closeIcon,t[0]-33,(t[1]-30)/2+2,t[0]-7,(t[1]-30)/2+28,this.seed),Ne(this.closeIcon,t[0]-7,(t[1]-30)/2+2,t[0]-33,(t[1]-30)/2+28,this.seed)}refreshIconState(){this.searchIcon&&this.closeIcon&&(this.searchIcon.style.display=this.value.trim()?"none":"",this.closeIcon.style.display=this.value.trim()?"":"none")}refire(e){this.refreshIconState(),e.stopPropagation(),this.fire(e.type,{sourceEvent:e})}};Mt([oe({type:Boolean,reflect:!0}),Pt("design:type",Object)],It.prototype,"disabled",void 0),Mt([oe({type:String}),Pt("design:type",Object)],It.prototype,"placeholder",void 0),Mt([oe({type:String}),Pt("design:type",Object)],It.prototype,"autocomplete",void 0),Mt([oe({type:String}),Pt("design:type",Object)],It.prototype,"autocorrect",void 0),Mt([oe({type:Boolean}),Pt("design:type",Object)],It.prototype,"autofocus",void 0),Mt([ne("input"),Pt("design:type",HTMLInputElement)],It.prototype,"textInput",void 0),It=Mt([ie("wired-search-input")],It);var Lt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Nt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Bt=class extends le{constructor(){super(...arguments),this.min=0,this.max=100,this.step=1,this.disabled=!1,this.canvasWidth=300}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        position: relative;
        width: 300px;
        box-sizing: border-box;
      }
      :host([disabled]) {
        opacity: 0.45 !important;
        cursor: default;
        pointer-events: none;
        background: rgba(0, 0, 0, 0.07);
        border-radius: 5px;
      }
      input[type=range] {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin: 0;
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        position: relative;
      }
      input[type=range]:focus {
        outline: none;
      }
      input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      input[type=range]::-moz-focus-outer {
        outline: none;
        border: 0;
      }
      input[type=range]::-moz-range-thumb {
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        margin: 0;
        height: 20px;
        width: 20px;
        line-height: 1;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border-radius: 50px;
        background: none;
        cursor: pointer;
        border: none;
        height: 20px;
        width: 20px;
        margin: 0;
        line-height: 1;
      }
      .knob{
        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
      }
      .bar {
        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
      }
      input:focus + div svg .knob {
        stroke: var(--wired-slider-knob-outline-color, #000);
        fill-opacity: 0.8;
      }
      `]}get value(){return this.input?+this.input.value:this.min}set value(e){this.input?this.input.value=`${e}`:this.pendingValue=e,this.updateThumbPosition()}firstUpdated(){this.value=this.pendingValue||+(this.getAttribute("value")||this.value||this.min),delete this.pendingValue}render(){return I`
    <div id="container">
      <input type="range" 
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
        ?disabled="${this.disabled}"
        @input="${this.onInput}">
      <div id="overlay">
        <svg></svg>
      </div>
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}onInput(e){e.stopPropagation(),this.updateThumbPosition(),this.input&&this.fire("change",{value:+this.input.value})}wiredRender(e=!1){super.wiredRender(e),this.updateThumbPosition()}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){this.canvasWidth=t[0];const i=Math.round(t[1]/2);Ne(e,0,i,t[0],i,this.seed).classList.add("bar"),this.knob=Be(e,10,i,20,20,this.seed),this.knob.classList.add("knob")}updateThumbPosition(){if(this.input){const e=+this.input.value,t=Math.max(this.step,this.max-this.min),i=(e-this.min)/t;this.knob&&(this.knob.style.transform=`translateX(${i*(this.canvasWidth-20)}px)`)}}};Lt([oe({type:Number}),Nt("design:type",Object)],Bt.prototype,"min",void 0),Lt([oe({type:Number}),Nt("design:type",Object)],Bt.prototype,"max",void 0),Lt([oe({type:Number}),Nt("design:type",Object)],Bt.prototype,"step",void 0),Lt([oe({type:Boolean,reflect:!0}),Nt("design:type",Object)],Bt.prototype,"disabled",void 0),Lt([ne("input"),Nt("design:type",HTMLInputElement)],Bt.prototype,"input",void 0),Bt=Lt([ie("wired-slider")],Bt);var Tt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Ht=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Dt=class extends le{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
        }
        path {
          stroke: currentColor;
          stroke-opacity: 0.65;
          stroke-width: 1.5;
          fill: none;
        }
        .knob {
          stroke-width: 2.8 !important;
          stroke-opacity: 1;
        }
      `]}render(){return I`<svg></svg>`}canvasSize(){return[76,76]}draw(e,t){Be(e,t[0]/2,t[1]/2,Math.floor(.8*t[0]),Math.floor(.8*t[1]),this.seed),this.knob=He(0,0,20,20,this.seed),this.knob.classList.add("knob"),e.appendChild(this.knob),this.updateCursor()}updateCursor(){if(this.knob){const e=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${e[0]}px, ${e[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}updated(){super.updated(),this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame((e=>this.tick(e)))}tick(e){this.spinning?(this.timerstart||(this.timerstart=e),this.value=Math.min(1,(e-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}};Tt([oe({type:Boolean}),Ht("design:type",Object)],Dt.prototype,"spinning",void 0),Tt([oe({type:Number}),Ht("design:type",Object)],Dt.prototype,"duration",void 0),Dt=Tt([ie("wired-spinner")],Dt);var Ut=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Vt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let qt=class extends le{constructor(){super(),this.name="",this.label="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          padding: 10px;
        }
      `]}render(){return I`
    <div>
      <slot @slotchange="${this.wiredRender}"></slot>
    </div>
    <div id="overlay"><svg></svg></div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,2,2,t[0]-4,t[1]-4,this.seed)}};Ut([oe({type:String}),Vt("design:type",Object)],qt.prototype,"name",void 0),Ut([oe({type:String}),Vt("design:type",Object)],qt.prototype,"label",void 0),qt=Ut([ie("wired-tab"),Vt("design:paramtypes",[])],qt);var Wt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Ft=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Gt=class extends ee{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return[ae,n`
        :host {
          display: block;
          opacity: 1;
        }
        ::slotted(.hidden) {
          display: none !important;
        }
    
        :host ::slotted(.hidden) {
          display: none !important;
        }
        #bar {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
      `]}render(){return I`
    <div id="bar">
      ${this.pages.map((e=>I`
      <wired-item role="tab" .value="${e.name}" .selected="${e.name===this.selected}" ?aria-selected="${e.name===this.selected}"
        @click="${()=>this.selected=e.name}">${e.label||e.name}</wired-item>
      `))}
    </div>
    <div>
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const e=this.slotElement.assignedNodes();if(e&&e.length){for(let t=0;t<e.length;t++){const i=e[t];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const e=i;this.pages.push(e);const t=e.getAttribute("name")||"";t&&t.trim().split(" ").forEach((t=>{t&&this.pageMap.set(t,e)}))}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",(e=>{switch(e.keyCode){case 37:case 38:e.preventDefault(),this.selectPrevious();break;case 39:case 40:e.preventDefault(),this.selectNext()}}))}updated(){const e=this.getElement();for(let t=0;t<this.pages.length;t++){const i=this.pages[t];i===e?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=e||void 0,this.current&&this.current.wiredRender&&requestAnimationFrame((()=>requestAnimationFrame((()=>this.current.wiredRender()))))}getElement(){let e;return this.selected&&(e=this.pageMap.get(this.selected)),e||(e=this.pages[0]),e||null}selectPrevious(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0?t=0:0===t?t=e.length-1:t--,this.selected=e[t].name||""}}selectNext(){const e=this.pages;if(e.length){let t=-1;for(let i=0;i<e.length;i++)if(e[i]===this.current){t=i;break}t<0||t>=e.length-1?t=0:t++,this.selected=e[t].name||""}}};Wt([oe({type:String}),Ft("design:type",String)],Gt.prototype,"selected",void 0),Wt([ne("slot"),Ft("design:type",HTMLSlotElement)],Gt.prototype,"slotElement",void 0),Gt=Wt([ie("wired-tabs")],Gt);var Kt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Yt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Xt=class extends le{constructor(){super(...arguments),this.disabled=!1,this.rows=2,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          font-family: sans-serif;
          width: 400px;
          outline: none;
          padding: 4px;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        textarea {
          position: relative;
          outline: none;
          border: none;
          resize: none;
          background: inherit;
          color: inherit;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
          text-align: inherit;
          padding: 10px;
          box-sizing: border-box;
        }
      `]}render(){return I`
    <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
      placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
      rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}"
      @change="${this.refire}" @input="${this.refire}"></textarea>
    <div id="overlay">
      <svg></svg>
    </div>
    `}get textarea(){return this.textareaInput}get value(){const e=this.textarea;return e&&e.value||""}set value(e){if(this.shadowRoot){const t=this.textarea;if(t)return void(t.value=e)}this.pendingValue=e}firstUpdated(){this.value=this.pendingValue||this.value||this.getAttribute("value")||"",delete this.pendingValue}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,4,4,t[0]-4,t[1]-4,this.seed)}refire(e){e.stopPropagation(),this.fire(e.type,{sourceEvent:e})}};Kt([oe({type:Boolean,reflect:!0}),Yt("design:type",Object)],Xt.prototype,"disabled",void 0),Kt([oe({type:Number}),Yt("design:type",Object)],Xt.prototype,"rows",void 0),Kt([oe({type:Number}),Yt("design:type",Object)],Xt.prototype,"maxrows",void 0),Kt([oe({type:String}),Yt("design:type",Object)],Xt.prototype,"autocomplete",void 0),Kt([oe({type:Boolean}),Yt("design:type",Object)],Xt.prototype,"autofocus",void 0),Kt([oe({type:String}),Yt("design:type",Object)],Xt.prototype,"inputmode",void 0),Kt([oe({type:String}),Yt("design:type",Object)],Xt.prototype,"placeholder",void 0),Kt([oe({type:Boolean}),Yt("design:type",Object)],Xt.prototype,"required",void 0),Kt([oe({type:Boolean}),Yt("design:type",Object)],Xt.prototype,"readonly",void 0),Kt([oe({type:Number}),Yt("design:type",Number)],Xt.prototype,"minlength",void 0),Kt([oe({type:Number}),Yt("design:type",Number)],Xt.prototype,"maxlength",void 0),Kt([ne("textarea"),Yt("design:type",HTMLTextAreaElement)],Xt.prototype,"textareaInput",void 0),Xt=Kt([ie("wired-textarea")],Xt);var Zt=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},Jt=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let Qt=class extends le{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return[ae,n`
      :host {
        display: inline-block;
        cursor: pointer;
        position: relative;
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        opacity: 0;
      }
      .knob {
        transition: transform 0.3s ease;
      }
      .knob path {
        stroke-width: 0.7;
      }
      .knob.checked {
        transform: translateX(48px);
      }
      path.knobfill {
        stroke-width: 3 !important;
        fill: transparent;
      }
      .knob.unchecked path.knobfill {
        stroke: var(--wired-toggle-off-color, gray);
      }
      .knob.checked path.knobfill {
        stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
      }
      `]}render(){return I`
    <div style="position: relative;">
      <svg></svg>
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}"  @change="${this.onChange}">
    </div>
    `}focus(){this.input?this.input.focus():super.focus()}wiredRender(e=!1){super.wiredRender(e),this.refreshKnob()}onChange(){this.checked=this.input.checked,this.refreshKnob(),this.fire("change",{checked:this.checked})}canvasSize(){return[80,34]}draw(e,t){Le(e,16,8,t[0]-32,18,this.seed).classList.add("toggle-bar"),this.knob=Pe("g"),this.knob.classList.add("knob"),e.appendChild(this.knob);const i=He(16,16,32,32,this.seed);i.classList.add("knobfill"),this.knob.appendChild(i),Be(this.knob,16,16,32,32,this.seed)}refreshKnob(){if(this.knob){const e=this.knob.classList;this.checked?(e.remove("unchecked"),e.add("checked")):(e.remove("checked"),e.add("unchecked"))}}};Zt([oe({type:Boolean}),Jt("design:type",Object)],Qt.prototype,"checked",void 0),Zt([oe({type:Boolean,reflect:!0}),Jt("design:type",Object)],Qt.prototype,"disabled",void 0),Zt([ne("input"),Jt("design:type",HTMLInputElement)],Qt.prototype,"input",void 0),Qt=Zt([ie("wired-toggle")],Qt);var ei=function(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r},ti=function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};let ii=class extends le{constructor(){super(),this.src="",this.autoplay=!1,this.loop=!1,this.muted=!1,this.playsinline=!1,this.playing=!1,this.timeDisplay="",window.ResizeObserver&&(this.resizeObserver=new window.ResizeObserver((()=>{this.svg&&this.wiredRender()})))}static get styles(){return[ae,n`
        :host {
          display: inline-block;
          position: relative;
          line-height: 1;
          padding: 3px 3px 68px;
          --wired-progress-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
          --wired-slider-knob-color: var(--wired-video-highlight-color, rgb(51, 103, 214));
        }
        video {
          display: block;
          box-sizing: border-box;
          max-width: 100%;
          max-height: 100%;
        }
        path {
          stroke-width: 1;
        }
        #controls {
          position: absolute;
          pointer-events: auto;
          left: 0;
          bottom: 0;
          width: 100%;
          box-sizing: border-box;
          height: 70px;
        }
        .layout.horizontal {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
          padding: 5px 10px;
        }
        .flex {
          -ms-flex: 1 1 0.000000001px;
          -webkit-flex: 1;
          flex: 1;
          -webkit-flex-basis: 0.000000001px;
          flex-basis: 0.000000001px;
        }
        wired-progress {
          display: block;
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          --wired-progress-label-color: transparent;
          --wired-progress-label-background: transparent;
        }
        wired-icon-button span {
          font-size: 16px;
          line-height: 16px;
          width: 16px;
          height: 16px;
          padding: 0px;
          font-family: sans-serif;
          display: inline-block;
        }
        #timeDisplay {
          padding: 0 20px 0 8px;
          font-size: 13px;
        }
        wired-slider {
          display: block;
          max-width: 200px;
          margin: 0 6px 0 auto;
        }
      `]}render(){return I`
    <video 
      .autoplay="${this.autoplay}"
      .loop="${this.loop}"
      .muted="${this.muted}"
      .playsinline="${this.playsinline}"
      src="${this.src}"
      @play="${()=>this.playing=!0}"
      @pause="${()=>this.playing=!1}"
      @canplay="${this.canPlay}"
      @timeupdate="${this.updateTime}">
    </video>
    <div id="overlay">
      <svg></svg>
    </div>
    <div id="controls">
      <wired-progress></wired-progress>
      <div class="horizontal layout center">
        <wired-icon-button @click="${this.togglePause}">
          <span>${this.playing?"||":"▶"}</span>
        </wired-icon-button>
        <div id="timeDisplay">${this.timeDisplay}</div>
        <div class="flex">
          <wired-slider @change="${this.volumeChange}"></wired-slider>
        </div>
        <div style="width: 24px; height: 24px;">
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g><path style="stroke: none; fill: currentColor;" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></g></svg>
        </div>
      </div>
    </div>
    `}updated(){super.updated(),this.attachResizeListener()}disconnectedCallback(){this.detachResizeListener()}attachResizeListener(){this.resizeObserver&&this.resizeObserver.observe?this.resizeObserver.observe(this):this.windowResizeHandler||(this.windowResizeHandler=()=>this.wiredRender(),window.addEventListener("resize",this.windowResizeHandler,{passive:!0}))}detachResizeListener(){this.resizeObserver&&this.resizeObserver.unobserve&&this.resizeObserver.unobserve(this),this.windowResizeHandler&&window.removeEventListener("resize",this.windowResizeHandler)}wiredRender(){super.wiredRender(),this.progressBar&&this.progressBar.wiredRender(!0)}canvasSize(){const e=this.getBoundingClientRect();return[e.width,e.height]}draw(e,t){Le(e,2,2,t[0]-4,t[1]-4,this.seed)}updateTime(){this.video&&this.progressBar&&(this.progressBar.value=this.video.duration?Math.round(this.video.currentTime/this.video.duration*100):0,this.timeDisplay=`${this.getTimeDisplay(this.video.currentTime)} / ${this.getTimeDisplay(this.video.duration)}`)}getTimeDisplay(e){const t=Math.floor(e/60);return`${t}:${Math.round(e-60*t)}`}togglePause(){this.video&&(this.playing?this.video.pause():this.video.play())}volumeChange(){this.video&&this.slider&&(this.video.volume=this.slider.value/100)}canPlay(){this.slider&&this.video&&(this.slider.value=100*this.video.volume)}};ei([oe({type:String}),ti("design:type",Object)],ii.prototype,"src",void 0),ei([oe({type:Boolean}),ti("design:type",Object)],ii.prototype,"autoplay",void 0),ei([oe({type:Boolean}),ti("design:type",Object)],ii.prototype,"loop",void 0),ei([oe({type:Boolean}),ti("design:type",Object)],ii.prototype,"muted",void 0),ei([oe({type:Boolean}),ti("design:type",Object)],ii.prototype,"playsinline",void 0),ei([oe(),ti("design:type",Object)],ii.prototype,"playing",void 0),ei([oe(),ti("design:type",Object)],ii.prototype,"timeDisplay",void 0),ei([ne("wired-progress"),ti("design:type",At)],ii.prototype,"progressBar",void 0),ei([ne("wired-slider"),ti("design:type",Bt)],ii.prototype,"slider",void 0),ei([ne("video"),ti("design:type",HTMLVideoElement)],ii.prototype,"video",void 0),ii=ei([ie("wired-video"),ti("design:paramtypes",[])],ii)})();