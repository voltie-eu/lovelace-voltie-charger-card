var rt=Object.defineProperty;var st=(s,e,t)=>e in s?rt(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var H=(s,e,t)=>st(s,typeof e!="symbol"?e+"":e,t);var W=globalThis,j=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),Ce=new WeakMap,T=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(j&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ce.set(t,e))}return e}toString(){return this.cssText}},ve=s=>new T(typeof s=="string"?s:s+"",void 0,ee),k=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,r,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new T(t,s,ee)},ye=(s,e)=>{if(j)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),r=W.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},te=j?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return ve(t)})(s):s;var{is:nt,defineProperty:at,getOwnPropertyDescriptor:ot,getOwnPropertyNames:lt,getOwnPropertySymbols:ht,getPrototypeOf:dt}=Object,w=globalThis,we=w.trustedTypes,ct=we?we.emptyScript:"",ft=w.reactiveElementPolyfillSupport,R=(s,e)=>s,ie={toAttribute(s,e){switch(e){case Boolean:s=s?ct:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Se=(s,e)=>!nt(s,e),xe={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:Se};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=xe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&at(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:n}=ot(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:r,set(a){let o=r?.call(this);n?.call(this,a),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??xe}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;let e=dt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){let t=this.properties,i=[...lt(t),...ht(t)];for(let r of i)this.createProperty(r,t[r])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let r of i)t.unshift(te(r))}else e!==void 0&&t.push(te(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ye(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:ie).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let n=i.getPropertyOptions(r),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ie;this._$Em=r;let o=a.fromAttribute(t,n.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(e,t,i,r=!1,n){if(e!==void 0){let a=this.constructor;if(r===!1&&(n=this[e]),i??(i=a.getPropertyOptions(e)),!((i.hasChanged??Se)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),n!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,n]of i){let{wrapped:a}=n,o=this[r];a!==!0||this._$AL.has(r)||o===void 0||this.C(r,void 0,n,o)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[R("elementProperties")]=new Map,C[R("finalized")]=new Map,ft?.({ReactiveElement:C}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.1.2");var U=globalThis,$e=s=>s,q=U.trustedTypes,be=q?q.createPolicy("lit-html",{createHTML:s=>s}):void 0,Be="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+x,pt=`<${Te}>`,M=document,P=()=>M.createComment(""),I=s=>s===null||typeof s!="object"&&typeof s!="function",he=Array.isArray,ut=s=>he(s)||typeof s?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,Me=/>/g,b=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,Ve=/"/g,ke=/^(?:script|style|textarea|title)$/i,de=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),p=de(1),Zt=de(2),Nt=de(3),v=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Ee=new WeakMap,A=M.createTreeWalker(M,129);function Re(s,e){if(!he(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(e):e}var _t=(s,e)=>{let t=s.length-1,i=[],r,n=e===2?"<svg>":e===3?"<math>":"",a=F;for(let o=0;o<t;o++){let l=s[o],h,c,f=-1,u=0;for(;u<l.length&&(a.lastIndex=u,c=a.exec(l),c!==null);)u=a.lastIndex,a===F?c[1]==="!--"?a=Ae:c[1]!==void 0?a=Me:c[2]!==void 0?(ke.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=b):c[3]!==void 0&&(a=b):a===b?c[0]===">"?(a=r??F,f=-1):c[1]===void 0?f=-2:(f=a.lastIndex-c[2].length,h=c[1],a=c[3]===void 0?b:c[3]==='"'?Ve:He):a===Ve||a===He?a=b:a===Ae||a===Me?a=F:(a=b,r=void 0);let _=a===b&&s[o+1].startsWith("/>")?" ":"";n+=a===F?l+pt:f>=0?(i.push(h),l.slice(0,f)+Be+l.slice(f)+x+_):l+x+(f===-2?o:_)}return[Re(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},O=class s{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,a=0,o=e.length-1,l=this.parts,[h,c]=_t(e,t);if(this.el=s.createElement(h,i),A.currentNode=this.el.content,t===2||t===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=A.nextNode())!==null&&l.length<o;){if(r.nodeType===1){if(r.hasAttributes())for(let f of r.getAttributeNames())if(f.endsWith(Be)){let u=c[a++],_=r.getAttribute(f).split(x),$=/([.?@])?(.*)/.exec(u);l.push({type:1,index:n,name:$[2],strings:_,ctor:$[1]==="."?ne:$[1]==="?"?ae:$[1]==="@"?oe:E}),r.removeAttribute(f)}else f.startsWith(x)&&(l.push({type:6,index:n}),r.removeAttribute(f));if(ke.test(r.tagName)){let f=r.textContent.split(x),u=f.length-1;if(u>0){r.textContent=q?q.emptyScript:"";for(let _=0;_<u;_++)r.append(f[_],P()),A.nextNode(),l.push({type:2,index:++n});r.append(f[u],P())}}}else if(r.nodeType===8)if(r.data===Te)l.push({type:2,index:n});else{let f=-1;for(;(f=r.data.indexOf(x,f+1))!==-1;)l.push({type:7,index:n}),f+=x.length-1}n++}}static createElement(e,t){let i=M.createElement("template");return i.innerHTML=e,i}};function V(s,e,t=s,i){if(e===v)return e;let r=i!==void 0?t._$Co?.[i]:t._$Cl,n=I(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=V(s,r._$AS(s,e.values),r,i)),e}var se=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??M).importNode(t,!0);A.currentNode=r;let n=A.nextNode(),a=0,o=0,l=i[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new D(n,n.nextSibling,this,e):l.type===1?h=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(h=new le(n,this,e)),this._$AV.push(h),l=i[++o]}a!==l?.index&&(n=A.nextNode(),a++)}return A.currentNode=M,r}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},D=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),I(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==v&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ut(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(Re(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let n=new se(r,this),a=n.u(this.options);n.p(t),this.T(a),this._$AH=n}}_$AC(e){let t=Ee.get(e.strings);return t===void 0&&Ee.set(e.strings,t=new O(e)),t}k(e){he(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let n of e)r===t.length?t.push(i=new s(this.O(P()),this.O(P()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=$e(e).nextSibling;$e(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,r){let n=this.strings,a=!1;if(n===void 0)e=V(this,e,t,0),a=!I(e)||e!==this._$AH&&e!==v,a&&(this._$AH=e);else{let o=e,l,h;for(e=n[0],l=0;l<n.length-1;l++)h=V(this,o[i+l],t,l),h===v&&(h=this._$AH[l]),a||(a=!I(h)||h!==this._$AH[l]),h===d?e=d:e!==d&&(e+=(h??"")+n[l+1]),this._$AH[l]=h}a&&!r&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ne=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},ae=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},oe=class extends E{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=V(this,e,t,0)??d)===v)return;let i=this._$AH,r=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==d&&(i===d||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},le=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}};var gt=U.litHtmlPolyfillSupport;gt?.(O,D),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.2");var Fe=(s,e,t)=>{let i=t?.renderBefore??e,r=i._$litPart$;if(r===void 0){let n=t?.renderBefore??null;i._$litPart$=r=new D(e.insertBefore(P(),n),n,void 0,t??{})}return r._$AI(s),r};var G=globalThis,g=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};g._$litElement$=!0,g.finalized=!0,G.litElementHydrateSupport?.({LitElement:g});var mt=G.litElementPolyfillSupport;mt?.({LitElement:g});(G.litElementVersions??(G.litElementVersions=[])).push("4.2.2");var Ue={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pe=s=>(...e)=>({_$litDirective$:s,values:e}),K=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var Z=class extends K{constructor(e){if(super(e),this.it=d,e.type!==Ue.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===d||e==null)return this._t=void 0,this.it=e;if(e===v)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Z.directiveName="unsafeHTML",Z.resultType=1;var B=Pe(Z);var Ie=k`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  /* ---- Hero panel (gradient background + state-specific palette) ---- */
  .panel {
    position: relative;
    width: 100%;
    border-radius: 12px;
    padding: 24px 0;
    color: #ffffff;
    overflow: hidden;
  }

  :host([card-state="offline"]) .panel {
    background-color: #e4e6ef;
    color: #181c32;
  }
  :host([card-state="idle"]) .panel,
  :host([card-state="ready"]) .panel {
    background: linear-gradient(rgb(87, 217, 186), rgb(9, 188, 166));
  }
  :host([card-state="charging"]) .panel {
    background: linear-gradient(rgb(43, 113, 245), rgb(80, 215, 223));
  }
  :host([card-state="fault"]) .panel {
    background: linear-gradient(rgb(235, 81, 114), rgb(253, 78, 78));
  }

  .label {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin: 0;
  }
  .label--sub {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.92;
    margin: 0;
    text-align: center;
  }

  .illustration {
    display: block;
    width: 40%;
    margin: 24px auto;
    line-height: 0;
  }
  .illustration :first-child { width: 100%; height: auto; }

  .charger-id {
    position: absolute;
    top: 16px;
    right: 16px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    margin: 0;
  }
  :host([card-state="offline"]) .charger-id {
    color: rgba(24, 28, 50, 0.6);
  }

  .refresh-btn {
    position: absolute;
    top: 12px;
    left: 12px;
    background: transparent;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.75);
    border-radius: 999px;
    line-height: 0;
    z-index: 2;
    transition: color 150ms ease, background 150ms ease;
  }
  .refresh-btn:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
  }
  .refresh-btn:active { transform: scale(0.92); }
  .refresh-btn ha-icon {
    --mdc-icon-size: 20px;
    color: inherit;
    display: inline-block;
    pointer-events: none;
  }
  :host([card-state="offline"]) .refresh-btn {
    color: rgba(24, 28, 50, 0.6);
  }
  :host([card-state="offline"]) .refresh-btn:hover {
    color: rgba(24, 28, 50, 0.9);
    background: rgba(24, 28, 50, 0.08);
  }
  .refresh-btn[data-spinning] ha-icon {
    animation: vc-spin 1s linear infinite;
    transform-origin: 50% 50%;
  }
  @keyframes vc-spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ---- Slide-to-action ---- */
  .slide {
    position: relative;
    width: calc(100% - 32px);
    margin: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slide__text {
    position: absolute;
    color: white;
    font-weight: 600;
    font-size: 14px;
    pointer-events: none;
    user-select: none;
    letter-spacing: 0.02em;
  }
  .slide__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 42px;
    border-radius: 42px;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    cursor: grab;
  }
  .slide__input:active { cursor: grabbing; }
  .slide__input.start {
    background: linear-gradient(90deg, rgb(42, 111, 244) 0%, rgb(86, 242, 223) 100%);
  }
  .slide__input.stop {
    background: linear-gradient(90deg, rgb(42, 111, 244) 0%, rgb(226, 89, 75) 100%);
  }
  .slide__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background: #ffffff;
    cursor: grab;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    margin-left: 3px;
    transition: transform 0.15s ease;
  }
  .slide__input::-moz-range-thumb {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background: #ffffff;
    cursor: grab;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }

  /* ---- Stats strip ---- */
  .stats {
    display: flex;
    margin: 24px 0 0;
    padding: 0 8px;
  }
  .stat {
    flex: 1;
    min-width: 0;
    text-align: center;
  }
  .stat__value {
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    margin: 0;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: opacity 200ms ease;
  }
  /* Stale-value dim state. */
  .stat__value--stale {
    opacity: 0.55;
  }
  .stat__label {
    color: #ffffff;
    font-weight: 500;
    font-size: 11px;
    opacity: 0.85;
    margin: 2px 0 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* ---- Sparkline ---- */
  .sparkline {
    display: block;
    width: calc(100% - 32px);
    height: 36px;
    margin: 12px 16px 0;
    overflow: visible;
  }
  .sparkline__fill { fill: #ffffff; opacity: 0.18; }
  .sparkline__stroke {
    fill: none;
    stroke: #ffffff;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.85;
  }
  .sparkline__dot { fill: #ffffff; }

  /* ---- Fault hint ---- */
  .hint {
    margin: 12px 24px 0;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    color: #ffffff;
    font-size: 13px;
    line-height: 1.35;
    text-align: center;
  }

  /* ---- Drawer ---- */
  .drawer-toggle {
    display: block;
    width: 100%;
    margin: 12px 0 -8px;
    padding: 0;
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
    font-family: inherit;
    opacity: 0.85;
    text-align: center;
  }
  :host([card-state="offline"]) .drawer-toggle { color: #181c32; }
  .drawer-toggle[aria-expanded="true"] { margin-bottom: 4px; }
  .drawer-toggle:hover { opacity: 1; }

  .drawer-body {
    padding: 4px 16px 0;
  }
  .drawer-sep {
    height: 1px;
    background: rgba(255, 255, 255, 0.4);
    margin: 12px 0;
  }
  :host([card-state="offline"]) .drawer-sep {
    background: rgba(24, 28, 50, 0.18);
  }

  .phase-grid {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr);
    gap: 4px 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    margin: 6px 0 0;
  }
  .phase-grid__cell {
    text-align: right;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .phase-grid__header {
    text-align: right;
    font-weight: 800;
    opacity: 0.9;
  }
  .phase-grid__label { text-align: left; font-weight: 500; opacity: 0.85; }

  .aux-grid {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr);
    gap: 4px 10px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
  }

  .periods__header {
    font-weight: 700;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.85);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .periods__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    padding: 2px 0;
  }
  .periods__row + .periods__row {
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
  .periods__row strong {
    font-weight: 700;
  }
  .periods__num {
    display: inline-block;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    margin-right: 8px;
    min-width: 22px;
  }
  .periods__more {
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    padding: 6px 0 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .aux-grid__meta {
    text-align: left;
    font-weight: 700;
    opacity: 0.95;
    white-space: nowrap;
  }

  /* ---- Gentle setup-hint (no device selected) ---- */
  .setup-hint {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px 20px;
    color: var(--secondary-text-color, #888);
  }
  .setup-hint ha-icon {
    --mdc-icon-size: 28px;
    color: var(--secondary-text-color, #888);
    flex-shrink: 0;
  }
  .setup-hint strong {
    display: block;
    color: var(--primary-text-color, #222);
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .setup-hint span {
    font-size: 0.85rem;
  }
`;var De="voltie_charger",Oe=`${De}_`,ce=26;async function Ge(s){if(!s)return null;try{return await s.callWS({type:"config/entity_registry/list"})}catch{return null}}function fe(s,e){let t={};if(!s||!e)return t;for(let i of s){if(i.device_id!==e)continue;let r=i.unique_id;if(!r||!r.startsWith(Oe))continue;let n=r.slice(Oe.length);if(n.length<ce+1||n[n.length-ce-1]!=="_")continue;let a=n.slice(0,n.length-ce-1);t[a]=i.entity_id}return t.switch&&!t.charging&&(t.charging=t.switch),t}function Ze(s){if(!s||!s.entities)return[];let e=new Set;for(let t of Object.values(s.entities))t.platform===De&&t.device_id&&e.add(t.device_id);return[...e].map(t=>{let i=s.devices?.[t]??{};return{device_id:t,name:i.name_by_user||i.name||t}})}function Ne(s,e){let t=s?.devices?.[e];return t?.name_by_user||t?.name||null}function Ct(s){return s?.locale?.language||s?.language||"en"}function Y(s,e,t){if(s==null||s==="")return null;let i=typeof s=="number"?s:Number(s);if(!Number.isFinite(i))return null;try{return new Intl.NumberFormat(Ct(e),t).format(i)}catch{return String(i)}}function pe(s,e,{compact:t=!1}={}){let i=Y(s,e,{minimumFractionDigits:t?0:1,maximumFractionDigits:2});return i===null?null:`${i} kW`}function Le(s,e){let t=Y(s,e,{minimumFractionDigits:0,maximumFractionDigits:2});return t===null?null:`${t} kWh`}function X(s,e,{precision:t=0}={}){let i=Y(s,e,{minimumFractionDigits:t,maximumFractionDigits:t});return i===null?null:`${i} A`}function ze(s,e){let t=Y(s,e,{maximumFractionDigits:0});return t===null?null:`${t} V`}function We(s){let e=Math.max(0,Math.floor(Number(s)||0)),t=Math.floor(e/3600),i=Math.floor(e%3600/60),r=e%60;return t>0?`${t}h ${String(i).padStart(2,"0")}m`:i>0?`${i}m ${String(r).padStart(2,"0")}s`:`${r}s`}function m(s,e){if(!e)return null;let t=s?.states?.[e];if(!t||t.state==="unknown"||t.state==="unavailable"||t.state==="")return null;let i=Number(t.state);return Number.isFinite(i)?i:null}function S(s,e){if(!e)return null;let t=s?.states?.[e];return!t||t.state==="unknown"||t.state==="unavailable"?null:t.state}function je(s,e){if(!e)return!1;let t=s?.states?.[e];return t?t.state!=="unavailable":!1}function J(s,e,t){let i=m(s,e);return i!==null?(t.set(e,i),{value:i,stale:!1}):t.has(e)?{value:t.get(e),stale:!0}:{value:null,stale:!1}}var Q={diode_check_failed:"The charger's diode self-check failed. The charging cable or vehicle interface may be faulty \u2014 try unplugging and reconnecting; if it persists, service is needed.",gfci_fault:"Ground fault detected. The GFCI has tripped. Unplug the vehicle, check for moisture or damage at the plug, and clear the fault once safe.",no_ground:"No protective earth connection detected. Do not use the charger until an electrician has verified the grounding.",stuck_relay:"A relay is stuck. The charger has isolated itself for safety \u2014 power-cycle it; if the fault reappears, service is needed.",gfi_self_test_failure:"The ground-fault self-test failed. Power-cycle the charger; if it persists, the GFI module needs service.",over_temperature:"The charger has overheated and stopped charging. Let it cool down, clear airflow obstructions, and try again.",over_current:"The vehicle drew more current than allowed. Check the current limit setting and the vehicle's onboard charger.",i2c_bus_error:"Internal communication error. Power-cycle the charger; if it persists, service is needed.",ev_fault:"The vehicle is reporting a fault. Try unplugging and reconnecting; if it persists, check the car.",over_humidity:"Humidity inside the charger is too high. Let it dry and check for water ingress at the enclosure.",phase_misconnected:"The charger's supply phases look wrong. An electrician should check the wiring and breaker configuration.",overvoltage:"Grid voltage is too high. Wait for it to stabilize; if it persists, call your electrician or utility.",undervoltage:"Grid voltage is too low. Wait for it to stabilize; if it persists, check your supply or call an electrician.",error:"The charger reported an error. Inspect the charger's display or app for details."},qe=new Set(Object.keys(Q).filter(s=>s!=="error"));var ue=`<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M70.002 140.004C108.663 140.004 140.004 108.663 140.004 70.0019C140.004 31.3409 108.663 0 70.002 0C31.3409 0 0 31.3409 0 70.0019C0 108.663 31.3409 140.004 70.002 140.004Z" fill="#141518"/>
<path d="M136.581 70.0032C136.581 106.777 106.769 136.588 69.9954 136.588C33.2214 136.588 3.41016 106.777 3.41016 70.0032C3.41016 33.2292 33.2214 3.41797 69.9954 3.41797C106.769 3.41797 136.581 33.2292 136.581 70.0032Z" fill="#141518" stroke="url(#paint0_linear_3640_144938)"/>
<path d="M70.2252 101.488C63.4043 101.498 56.6326 100.333 50.2071 98.044C50.0158 97.9773 49.8397 97.8734 49.6889 97.7382C49.538 97.6029 49.4156 97.4392 49.3285 97.2563C49.2414 97.0734 49.1914 96.8751 49.1815 96.6728C49.1716 96.4705 49.2019 96.2682 49.2707 96.0777C49.3386 95.8828 49.4449 95.7034 49.5833 95.5503C49.7216 95.3971 49.8893 95.2733 50.0763 95.186C50.2633 95.0987 50.466 95.0498 50.6722 95.0421C50.8785 95.0344 51.0842 95.0681 51.2772 95.1413C57.3716 97.3045 63.7918 98.4062 70.2587 98.3985C76.5827 98.4052 82.8631 97.3517 88.8388 95.2818C89.0303 95.2142 89.2332 95.1852 89.4359 95.1964C89.6385 95.2077 89.837 95.2589 90.0198 95.3472C90.2026 95.4355 90.3661 95.5591 90.5009 95.7108C90.6357 95.8626 90.7391 96.0396 90.8052 96.2315C90.8717 96.4225 90.8999 96.6248 90.8882 96.8267C90.8765 97.0286 90.825 97.2263 90.7368 97.4083C90.6486 97.5903 90.5253 97.7532 90.3741 97.8875C90.2229 98.0219 90.0466 98.125 89.8555 98.1912C83.5435 100.384 76.9073 101.499 70.2252 101.488Z" fill="white"/>
<path d="M51.6205 47.8574H49.7131C49.6429 47.8574 49.5859 47.9138 49.5859 47.9834V49.9985C49.5859 50.068 49.6429 50.1244 49.7131 50.1244H51.6205C51.6907 50.1244 51.7477 50.068 51.7477 49.9985V47.9834C51.7477 47.9138 51.6907 47.8574 51.6205 47.8574Z" fill="white"/>
<path d="M51.6205 50.3867H49.7131C49.6429 50.3867 49.5859 50.4431 49.5859 50.5127V52.5278C49.5859 52.5973 49.6429 52.6537 49.7131 52.6537H51.6205C51.6907 52.6537 51.7477 52.5973 51.7477 52.5278V50.5127C51.7477 50.4431 51.6907 50.3867 51.6205 50.3867Z" fill="white"/>
<path d="M51.6205 52.9375H49.7131C49.6429 52.9375 49.5859 52.9939 49.5859 53.0634V55.0786C49.5859 55.1481 49.6429 55.2045 49.7131 55.2045H51.6205C51.6907 55.2045 51.7477 55.1481 51.7477 55.0786V53.0634C51.7477 52.9939 51.6907 52.9375 51.6205 52.9375Z" fill="white"/>
<path d="M51.6205 55.4551H49.7131C49.6429 55.4551 49.5859 55.5115 49.5859 55.581V57.5961C49.5859 57.6657 49.6429 57.7221 49.7131 57.7221H51.6205C51.6907 57.7221 51.7477 57.6657 51.7477 57.5961V55.581C51.7477 55.5115 51.6907 55.4551 51.6205 55.4551Z" fill="white"/>
<path d="M51.6205 57.9922H49.7131C49.6429 57.9922 49.5859 58.0486 49.5859 58.1181V60.1332C49.5859 60.2028 49.6429 60.2592 49.7131 60.2592H51.6205C51.6907 60.2592 51.7477 60.2028 51.7477 60.1332V58.1181C51.7477 58.0486 51.6907 57.9922 51.6205 57.9922Z" fill="white"/>
<path d="M54.0346 45.3164H52.1272C52.0569 45.3164 52 45.3728 52 45.4424V47.4575C52 47.527 52.0569 47.5834 52.1272 47.5834H54.0346C54.1048 47.5834 54.1617 47.527 54.1617 47.4575V45.4424C54.1617 45.3728 54.1048 45.3164 54.0346 45.3164Z" fill="white"/>
<path d="M54.0346 60.5215H52.1272C52.0569 60.5215 52 60.5779 52 60.6474V62.6625C52 62.7321 52.0569 62.7885 52.1272 62.7885H54.0346C54.1048 62.7885 54.1617 62.7321 54.1617 62.6625V60.6474C54.1617 60.5779 54.1048 60.5215 54.0346 60.5215Z" fill="white"/>
<path d="M56.4525 45.3164H54.5451C54.4749 45.3164 54.418 45.3728 54.418 45.4424V47.4575C54.418 47.527 54.4749 47.5834 54.5451 47.5834H56.4525C56.5228 47.5834 56.5797 47.527 56.5797 47.4575V45.4424C56.5797 45.3728 56.5228 45.3164 56.4525 45.3164Z" fill="white"/>
<path d="M56.4525 60.5215H54.5451C54.4749 60.5215 54.418 60.5779 54.418 60.6474V62.6625C54.418 62.7321 54.4749 62.7885 54.5451 62.7885H56.4525C56.5228 62.7885 56.5797 62.7321 56.5797 62.6625V60.6474C56.5797 60.5779 56.5228 60.5215 56.4525 60.5215Z" fill="white"/>
<path d="M58.8744 45.3164H56.967C56.8968 45.3164 56.8398 45.3728 56.8398 45.4424V47.4575C56.8398 47.527 56.8968 47.5834 56.967 47.5834H58.8744C58.9446 47.5834 59.0016 47.527 59.0016 47.4575V45.4424C59.0016 45.3728 58.9446 45.3164 58.8744 45.3164Z" fill="white"/>
<path d="M58.8744 60.5215H56.967C56.8968 60.5215 56.8398 60.5779 56.8398 60.6474V62.6625C56.8398 62.7321 56.8968 62.7885 56.967 62.7885H58.8744C58.9446 62.7885 59.0016 62.7321 59.0016 62.6625V60.6474C59.0016 60.5779 58.9446 60.5215 58.8744 60.5215Z" fill="white"/>
<path d="M61.2846 47.8574H59.3772C59.3069 47.8574 59.25 47.9138 59.25 47.9834V49.9985C59.25 50.068 59.3069 50.1244 59.3772 50.1244H61.2846C61.3548 50.1244 61.4117 50.068 61.4117 49.9985V47.9834C61.4117 47.9138 61.3548 47.8574 61.2846 47.8574Z" fill="white"/>
<path d="M61.2846 50.3711H59.3772C59.3069 50.3711 59.25 50.4275 59.25 50.497V52.5121C59.25 52.5817 59.3069 52.6381 59.3772 52.6381H61.2846C61.3548 52.6381 61.4117 52.5817 61.4117 52.5121V50.497C61.4117 50.4275 61.3548 50.3711 61.2846 50.3711Z" fill="white"/>
<path d="M61.2846 52.9375H59.3772C59.3069 52.9375 59.25 52.9939 59.25 53.0634V55.0786C59.25 55.1481 59.3069 55.2045 59.3772 55.2045H61.2846C61.3548 55.2045 61.4117 55.1481 61.4117 55.0786V53.0634C61.4117 52.9939 61.3548 52.9375 61.2846 52.9375Z" fill="white"/>
<path d="M61.2846 55.4551H59.3772C59.3069 55.4551 59.25 55.5115 59.25 55.581V57.5961C59.25 57.6657 59.3069 57.7221 59.3772 57.7221H61.2846C61.3548 57.7221 61.4117 57.6657 61.4117 57.5961V55.581C61.4117 55.5115 61.3548 55.4551 61.2846 55.4551Z" fill="white"/>
<path d="M61.2846 57.9922H59.3772C59.3069 57.9922 59.25 58.0486 59.25 58.1181V60.1332C59.25 60.2028 59.3069 60.2592 59.3772 60.2592H61.2846C61.3548 60.2592 61.4117 60.2028 61.4117 60.1332V58.1181C61.4117 58.0486 61.3548 57.9922 61.2846 57.9922Z" fill="white"/>
<path d="M80.6596 52.9102H78.7522C78.6819 52.9102 78.625 52.9665 78.625 53.0361V55.0512C78.625 55.1208 78.6819 55.1772 78.7522 55.1772H80.6596C80.7298 55.1772 80.7867 55.1208 80.7867 55.0512V53.0361C80.7867 52.9665 80.7298 52.9102 80.6596 52.9102Z" fill="white"/>
<path d="M83.0736 52.9102H81.1662C81.096 52.9102 81.0391 52.9665 81.0391 53.0361V55.0512C81.0391 55.1208 81.096 55.1772 81.1662 55.1772H83.0736C83.1439 55.1772 83.2008 55.1208 83.2008 55.0512V53.0361C83.2008 52.9665 83.1439 52.9102 83.0736 52.9102Z" fill="white"/>
<path d="M85.4916 52.9102H83.5842C83.514 52.9102 83.457 52.9665 83.457 53.0361V55.0512C83.457 55.1208 83.514 55.1772 83.5842 55.1772H85.4916C85.5618 55.1772 85.6188 55.1208 85.6188 55.0512V53.0361C85.6188 52.9665 85.5618 52.9102 85.4916 52.9102Z" fill="white"/>
<path d="M87.9135 52.9102H86.0061C85.9358 52.9102 85.8789 52.9665 85.8789 53.0361V55.0512C85.8789 55.1208 85.9358 55.1772 86.0061 55.1772H87.9135C87.9837 55.1772 88.0406 55.1208 88.0406 55.0512V53.0361C88.0406 52.9665 87.9837 52.9102 87.9135 52.9102Z" fill="white"/>
<path d="M90.3236 52.9102H88.4162C88.346 52.9102 88.2891 52.9665 88.2891 53.0361V55.0512C88.2891 55.1208 88.346 55.1772 88.4162 55.1772H90.3236C90.3939 55.1772 90.4508 55.1208 90.4508 55.0512V53.0361C90.4508 52.9665 90.3939 52.9102 90.3236 52.9102Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3640_144938" x1="137.081" y1="137.088" x2="2.91016" y2="137.088" gradientUnits="userSpaceOnUse">
<stop stop-color="#64FFEB"/>
<stop offset="1" stop-color="#3CCAAA"/>
</linearGradient>
</defs>
</svg>
`;var Ke=`<svg width="160" height="161" viewBox="0 0 160 161" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M80 160.5C124.183 160.5 160 124.683 160 80.5C160 36.3172 124.183 0.5 80 0.5C35.8172 0.5 0 36.3172 0 80.5C0 124.683 35.8172 160.5 80 160.5Z" fill="#141518"/>
<path d="M156.158 80.5006C156.158 122.566 122.057 156.667 79.9909 156.667C37.9252 156.667 3.82422 122.566 3.82422 80.5006C3.82422 38.4349 37.9252 4.33398 79.9909 4.33398C122.057 4.33398 156.158 38.4349 156.158 80.5006Z" fill="#141518" stroke="#A1A5B7"/>
<path d="M80.2584 116.484C72.4632 116.494 64.7245 115.163 57.3811 112.547C57.1626 112.471 56.9613 112.352 56.7889 112.198C56.6166 112.043 56.4766 111.856 56.3771 111.647C56.2776 111.438 56.2205 111.211 56.2091 110.98C56.1978 110.749 56.2325 110.518 56.3111 110.3C56.3887 110.077 56.5101 109.872 56.6682 109.697C56.8264 109.522 57.018 109.381 57.2317 109.281C57.4455 109.181 57.677 109.125 57.9127 109.116C58.1485 109.108 58.3836 109.146 58.6041 109.23C65.5689 111.702 72.9061 112.961 80.2966 112.952C87.5239 112.96 94.7013 111.756 101.531 109.39C101.749 109.313 101.981 109.28 102.213 109.293C102.444 109.306 102.671 109.364 102.88 109.465C103.089 109.566 103.276 109.707 103.43 109.881C103.584 110.054 103.702 110.256 103.778 110.476C103.854 110.694 103.886 110.925 103.873 111.156C103.859 111.387 103.8 111.613 103.7 111.821C103.599 112.029 103.458 112.215 103.285 112.368C103.112 112.522 102.911 112.64 102.692 112.715C95.4789 115.222 87.8949 116.496 80.2584 116.484Z" fill="white"/>
<path d="M93.3252 60.9668H91.1453C91.0651 60.9668 91 61.0312 91 61.1107V63.4137C91 63.4931 91.0651 63.5576 91.1453 63.5576H93.3252C93.4054 63.5576 93.4705 63.4931 93.4705 63.4137V61.1107C93.4705 61.0312 93.4054 60.9668 93.3252 60.9668Z" fill="white"/>
<path d="M96.083 60.9668H93.9031C93.8229 60.9668 93.7578 61.0312 93.7578 61.1107V63.4137C93.7578 63.4931 93.8229 63.5576 93.9031 63.5576H96.083C96.1632 63.5576 96.2283 63.4931 96.2283 63.4137V61.1107C96.2283 61.0312 96.1632 60.9668 96.083 60.9668Z" fill="white"/>
<path d="M98.8486 60.9668H96.6688C96.5885 60.9668 96.5234 61.0312 96.5234 61.1107V63.4137C96.5234 63.4931 96.5885 63.5576 96.6688 63.5576H98.8486C98.9289 63.5576 98.9939 63.4931 98.9939 63.4137V61.1107C98.9939 61.0312 98.9289 60.9668 98.8486 60.9668Z" fill="white"/>
<path d="M101.614 60.9668H99.4344C99.3541 60.9668 99.2891 61.0312 99.2891 61.1107V63.4137C99.2891 63.4931 99.3541 63.5576 99.4344 63.5576H101.614C101.694 63.5576 101.76 63.4931 101.76 63.4137V61.1107C101.76 61.0312 101.694 60.9668 101.614 60.9668Z" fill="white"/>
<path d="M104.372 60.9668H102.192C102.112 60.9668 102.047 61.0312 102.047 61.1107V63.4137C102.047 63.4931 102.112 63.5576 102.192 63.5576H104.372C104.452 63.5576 104.517 63.4931 104.517 63.4137V61.1107C104.517 61.0312 104.452 60.9668 104.372 60.9668Z" fill="white"/>
<path d="M57.1845 60.9668H55.0047C54.9244 60.9668 54.8594 61.0312 54.8594 61.1107V63.4137C54.8594 63.4931 54.9244 63.5576 55.0047 63.5576H57.1845C57.2648 63.5576 57.3299 63.4931 57.3299 63.4137V61.1107C57.3299 61.0312 57.2648 60.9668 57.1845 60.9668Z" fill="white"/>
<path d="M59.9423 60.9668H57.7625C57.6823 60.9668 57.6172 61.0312 57.6172 61.1107V63.4137C57.6172 63.4931 57.6823 63.5576 57.7625 63.5576H59.9423C60.0226 63.5576 60.0877 63.4931 60.0877 63.4137V61.1107C60.0877 61.0312 60.0226 60.9668 59.9423 60.9668Z" fill="white"/>
<path d="M62.708 60.9668H60.5281C60.4479 60.9668 60.3828 61.0312 60.3828 61.1107V63.4137C60.3828 63.4931 60.4479 63.5576 60.5281 63.5576H62.708C62.7882 63.5576 62.8533 63.4931 62.8533 63.4137V61.1107C62.8533 61.0312 62.7882 60.9668 62.708 60.9668Z" fill="white"/>
<path d="M65.4736 60.9668H63.2938C63.2135 60.9668 63.1484 61.0312 63.1484 61.1107V63.4137C63.1484 63.4931 63.2135 63.5576 63.2938 63.5576H65.4736C65.5539 63.5576 65.6189 63.4931 65.6189 63.4137V61.1107C65.6189 61.0312 65.5539 60.9668 65.4736 60.9668Z" fill="white"/>
<path d="M68.2314 60.9668H66.0516C65.9713 60.9668 65.9062 61.0312 65.9062 61.1107V63.4137C65.9062 63.4931 65.9713 63.5576 66.0516 63.5576H68.2314C68.3117 63.5576 68.3767 63.4931 68.3767 63.4137V61.1107C68.3767 61.0312 68.3117 60.9668 68.2314 60.9668Z" fill="white"/>
</svg>
`;var Ye=`<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M70.002 140.004C108.663 140.004 140.004 108.663 140.004 70.0019C140.004 31.3409 108.663 0 70.002 0C31.3409 0 0 31.3409 0 70.0019C0 108.663 31.3409 140.004 70.002 140.004Z" fill="#141518"/>
<path d="M136.581 70.0032C136.581 106.777 106.769 136.588 69.9954 136.588C33.2214 136.588 3.41016 106.777 3.41016 70.0032C3.41016 33.2292 33.2214 3.41797 69.9954 3.41797C106.769 3.41797 136.581 33.2292 136.581 70.0032Z" fill="#141518" stroke="url(#paint0_linear_3868_51915)"/>
<path d="M70.2252 101.488C63.4043 101.498 56.6326 100.333 50.2071 98.044C50.0158 97.9773 49.8397 97.8734 49.6889 97.7382C49.538 97.6029 49.4156 97.4392 49.3285 97.2563C49.2414 97.0734 49.1914 96.8751 49.1815 96.6728C49.1716 96.4705 49.2019 96.2682 49.2707 96.0777C49.3386 95.8828 49.4449 95.7034 49.5833 95.5503C49.7216 95.3971 49.8893 95.2733 50.0763 95.186C50.2633 95.0987 50.466 95.0498 50.6722 95.0421C50.8785 95.0344 51.0842 95.0681 51.2772 95.1413C57.3716 97.3045 63.7918 98.4062 70.2587 98.3985C76.5827 98.4052 82.8631 97.3517 88.8388 95.2818C89.0303 95.2142 89.2332 95.1852 89.4359 95.1964C89.6385 95.2077 89.837 95.2589 90.0198 95.3472C90.2026 95.4355 90.3661 95.5591 90.5009 95.7108C90.6357 95.8626 90.7391 96.0396 90.8052 96.2315C90.8717 96.4225 90.8999 96.6248 90.8882 96.8267C90.8765 97.0286 90.825 97.2263 90.7368 97.4083C90.6486 97.5903 90.5253 97.7532 90.3741 97.8875C90.2229 98.0219 90.0466 98.125 89.8555 98.1912C83.5435 100.384 76.9073 101.499 70.2252 101.488Z" fill="white"/>
<path d="M51.6205 47.8574H49.7131C49.6429 47.8574 49.5859 47.9138 49.5859 47.9834V49.9985C49.5859 50.068 49.6429 50.1244 49.7131 50.1244H51.6205C51.6907 50.1244 51.7477 50.068 51.7477 49.9985V47.9834C51.7477 47.9138 51.6907 47.8574 51.6205 47.8574Z" fill="white"/>
<path d="M51.6205 50.3867H49.7131C49.6429 50.3867 49.5859 50.4431 49.5859 50.5127V52.5278C49.5859 52.5973 49.6429 52.6537 49.7131 52.6537H51.6205C51.6907 52.6537 51.7477 52.5973 51.7477 52.5278V50.5127C51.7477 50.4431 51.6907 50.3867 51.6205 50.3867Z" fill="white"/>
<path d="M51.6205 52.9375H49.7131C49.6429 52.9375 49.5859 52.9939 49.5859 53.0634V55.0786C49.5859 55.1481 49.6429 55.2045 49.7131 55.2045H51.6205C51.6907 55.2045 51.7477 55.1481 51.7477 55.0786V53.0634C51.7477 52.9939 51.6907 52.9375 51.6205 52.9375Z" fill="white"/>
<path d="M51.6205 55.4551H49.7131C49.6429 55.4551 49.5859 55.5115 49.5859 55.581V57.5961C49.5859 57.6657 49.6429 57.7221 49.7131 57.7221H51.6205C51.6907 57.7221 51.7477 57.6657 51.7477 57.5961V55.581C51.7477 55.5115 51.6907 55.4551 51.6205 55.4551Z" fill="white"/>
<path d="M51.6205 57.9922H49.7131C49.6429 57.9922 49.5859 58.0486 49.5859 58.1181V60.1332C49.5859 60.2028 49.6429 60.2592 49.7131 60.2592H51.6205C51.6907 60.2592 51.7477 60.2028 51.7477 60.1332V58.1181C51.7477 58.0486 51.6907 57.9922 51.6205 57.9922Z" fill="white"/>
<path d="M54.0346 45.3164H52.1272C52.0569 45.3164 52 45.3728 52 45.4424V47.4575C52 47.527 52.0569 47.5834 52.1272 47.5834H54.0346C54.1048 47.5834 54.1617 47.527 54.1617 47.4575V45.4424C54.1617 45.3728 54.1048 45.3164 54.0346 45.3164Z" fill="white"/>
<path d="M54.0346 60.5215H52.1272C52.0569 60.5215 52 60.5779 52 60.6474V62.6625C52 62.7321 52.0569 62.7885 52.1272 62.7885H54.0346C54.1048 62.7885 54.1617 62.7321 54.1617 62.6625V60.6474C54.1617 60.5779 54.1048 60.5215 54.0346 60.5215Z" fill="white"/>
<path d="M56.4525 45.3164H54.5451C54.4749 45.3164 54.418 45.3728 54.418 45.4424V47.4575C54.418 47.527 54.4749 47.5834 54.5451 47.5834H56.4525C56.5228 47.5834 56.5797 47.527 56.5797 47.4575V45.4424C56.5797 45.3728 56.5228 45.3164 56.4525 45.3164Z" fill="white"/>
<path d="M56.4525 60.5215H54.5451C54.4749 60.5215 54.418 60.5779 54.418 60.6474V62.6625C54.418 62.7321 54.4749 62.7885 54.5451 62.7885H56.4525C56.5228 62.7885 56.5797 62.7321 56.5797 62.6625V60.6474C56.5797 60.5779 56.5228 60.5215 56.4525 60.5215Z" fill="white"/>
<path d="M58.8744 45.3164H56.967C56.8968 45.3164 56.8398 45.3728 56.8398 45.4424V47.4575C56.8398 47.527 56.8968 47.5834 56.967 47.5834H58.8744C58.9446 47.5834 59.0016 47.527 59.0016 47.4575V45.4424C59.0016 45.3728 58.9446 45.3164 58.8744 45.3164Z" fill="white"/>
<path d="M58.8744 60.5215H56.967C56.8968 60.5215 56.8398 60.5779 56.8398 60.6474V62.6625C56.8398 62.7321 56.8968 62.7885 56.967 62.7885H58.8744C58.9446 62.7885 59.0016 62.7321 59.0016 62.6625V60.6474C59.0016 60.5779 58.9446 60.5215 58.8744 60.5215Z" fill="white"/>
<path d="M61.2846 47.8574H59.3772C59.3069 47.8574 59.25 47.9138 59.25 47.9834V49.9985C59.25 50.068 59.3069 50.1244 59.3772 50.1244H61.2846C61.3548 50.1244 61.4117 50.068 61.4117 49.9985V47.9834C61.4117 47.9138 61.3548 47.8574 61.2846 47.8574Z" fill="white"/>
<path d="M61.2846 50.3711H59.3772C59.3069 50.3711 59.25 50.4275 59.25 50.497V52.5121C59.25 52.5817 59.3069 52.6381 59.3772 52.6381H61.2846C61.3548 52.6381 61.4117 52.5817 61.4117 52.5121V50.497C61.4117 50.4275 61.3548 50.3711 61.2846 50.3711Z" fill="white"/>
<path d="M61.2846 52.9375H59.3772C59.3069 52.9375 59.25 52.9939 59.25 53.0634V55.0786C59.25 55.1481 59.3069 55.2045 59.3772 55.2045H61.2846C61.3548 55.2045 61.4117 55.1481 61.4117 55.0786V53.0634C61.4117 52.9939 61.3548 52.9375 61.2846 52.9375Z" fill="white"/>
<path d="M61.2846 55.4551H59.3772C59.3069 55.4551 59.25 55.5115 59.25 55.581V57.5961C59.25 57.6657 59.3069 57.7221 59.3772 57.7221H61.2846C61.3548 57.7221 61.4117 57.6657 61.4117 57.5961V55.581C61.4117 55.5115 61.3548 55.4551 61.2846 55.4551Z" fill="white"/>
<path d="M61.2846 57.9922H59.3772C59.3069 57.9922 59.25 58.0486 59.25 58.1181V60.1332C59.25 60.2028 59.3069 60.2592 59.3772 60.2592H61.2846C61.3548 60.2592 61.4117 60.2028 61.4117 60.1332V58.1181C61.4117 58.0486 61.3548 57.9922 61.2846 57.9922Z" fill="white"/>
<path d="M81.0346 47.8574H79.1272C79.0569 47.8574 79 47.9138 79 47.9834V49.9985C79 50.068 79.0569 50.1244 79.1272 50.1244H81.0346C81.1048 50.1244 81.1617 50.068 81.1617 49.9985V47.9834C81.1617 47.9138 81.1048 47.8574 81.0346 47.8574Z" fill="white"/>
<path d="M81.0346 50.3867H79.1272C79.0569 50.3867 79 50.4431 79 50.5127V52.5278C79 52.5973 79.0569 52.6537 79.1272 52.6537H81.0346C81.1048 52.6537 81.1617 52.5973 81.1617 52.5278V50.5127C81.1617 50.4431 81.1048 50.3867 81.0346 50.3867Z" fill="white"/>
<path d="M81.0346 52.9375H79.1272C79.0569 52.9375 79 52.9939 79 53.0634V55.0786C79 55.1481 79.0569 55.2045 79.1272 55.2045H81.0346C81.1048 55.2045 81.1617 55.1481 81.1617 55.0786V53.0634C81.1617 52.9939 81.1048 52.9375 81.0346 52.9375Z" fill="white"/>
<path d="M81.0346 55.4551H79.1272C79.0569 55.4551 79 55.5115 79 55.581V57.5961C79 57.6657 79.0569 57.7221 79.1272 57.7221H81.0346C81.1048 57.7221 81.1617 57.6657 81.1617 57.5961V55.581C81.1617 55.5115 81.1048 55.4551 81.0346 55.4551Z" fill="white"/>
<path d="M81.0346 57.9922H79.1272C79.0569 57.9922 79 58.0486 79 58.1181V60.1332C79 60.2028 79.0569 60.2592 79.1272 60.2592H81.0346C81.1048 60.2592 81.1617 60.2028 81.1617 60.1332V58.1181C81.1617 58.0486 81.1048 57.9922 81.0346 57.9922Z" fill="white"/>
<path d="M83.4486 45.3164H81.5412C81.471 45.3164 81.4141 45.3728 81.4141 45.4424V47.4575C81.4141 47.527 81.471 47.5834 81.5412 47.5834H83.4486C83.5189 47.5834 83.5758 47.527 83.5758 47.4575V45.4424C83.5758 45.3728 83.5189 45.3164 83.4486 45.3164Z" fill="white"/>
<path d="M83.4486 60.5215H81.5412C81.471 60.5215 81.4141 60.5779 81.4141 60.6474V62.6625C81.4141 62.7321 81.471 62.7885 81.5412 62.7885H83.4486C83.5189 62.7885 83.5758 62.7321 83.5758 62.6625V60.6474C83.5758 60.5779 83.5189 60.5215 83.4486 60.5215Z" fill="white"/>
<path d="M85.8666 45.3164H83.9592C83.889 45.3164 83.832 45.3728 83.832 45.4424V47.4575C83.832 47.527 83.889 47.5834 83.9592 47.5834H85.8666C85.9368 47.5834 85.9938 47.527 85.9938 47.4575V45.4424C85.9938 45.3728 85.9368 45.3164 85.8666 45.3164Z" fill="white"/>
<path d="M85.8666 60.5215H83.9592C83.889 60.5215 83.832 60.5779 83.832 60.6474V62.6625C83.832 62.7321 83.889 62.7885 83.9592 62.7885H85.8666C85.9368 62.7885 85.9938 62.7321 85.9938 62.6625V60.6474C85.9938 60.5779 85.9368 60.5215 85.8666 60.5215Z" fill="white"/>
<path d="M88.2885 45.3164H86.3811C86.3108 45.3164 86.2539 45.3728 86.2539 45.4424V47.4575C86.2539 47.527 86.3108 47.5834 86.3811 47.5834H88.2885C88.3587 47.5834 88.4156 47.527 88.4156 47.4575V45.4424C88.4156 45.3728 88.3587 45.3164 88.2885 45.3164Z" fill="white"/>
<path d="M88.2885 60.5215H86.3811C86.3108 60.5215 86.2539 60.5779 86.2539 60.6474V62.6625C86.2539 62.7321 86.3108 62.7885 86.3811 62.7885H88.2885C88.3587 62.7885 88.4156 62.7321 88.4156 62.6625V60.6474C88.4156 60.5779 88.3587 60.5215 88.2885 60.5215Z" fill="white"/>
<path d="M90.6986 47.8574H88.7912C88.721 47.8574 88.6641 47.9138 88.6641 47.9834V49.9985C88.6641 50.068 88.721 50.1244 88.7912 50.1244H90.6986C90.7689 50.1244 90.8258 50.068 90.8258 49.9985V47.9834C90.8258 47.9138 90.7689 47.8574 90.6986 47.8574Z" fill="white"/>
<path d="M90.6986 50.3711H88.7912C88.721 50.3711 88.6641 50.4275 88.6641 50.497V52.5121C88.6641 52.5817 88.721 52.6381 88.7912 52.6381H90.6986C90.7689 52.6381 90.8258 52.5817 90.8258 52.5121V50.497C90.8258 50.4275 90.7689 50.3711 90.6986 50.3711Z" fill="white"/>
<path d="M90.6986 52.9375H88.7912C88.721 52.9375 88.6641 52.9939 88.6641 53.0634V55.0786C88.6641 55.1481 88.721 55.2045 88.7912 55.2045H90.6986C90.7689 55.2045 90.8258 55.1481 90.8258 55.0786V53.0634C90.8258 52.9939 90.7689 52.9375 90.6986 52.9375Z" fill="white"/>
<path d="M90.6986 55.4551H88.7912C88.721 55.4551 88.6641 55.5115 88.6641 55.581V57.5961C88.6641 57.6657 88.721 57.7221 88.7912 57.7221H90.6986C90.7689 57.7221 90.8258 57.6657 90.8258 57.5961V55.581C90.8258 55.5115 90.7689 55.4551 90.6986 55.4551Z" fill="white"/>
<path d="M90.6986 57.9922H88.7912C88.721 57.9922 88.6641 58.0486 88.6641 58.1181V60.1332C88.6641 60.2028 88.721 60.2592 88.7912 60.2592H90.6986C90.7689 60.2592 90.8258 60.2028 90.8258 60.1332V58.1181C90.8258 58.0486 90.7689 57.9922 90.6986 57.9922Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_3868_51915" x1="137.081" y1="137.088" x2="2.91016" y2="137.088" gradientUnits="userSpaceOnUse">
<stop stop-color="#64FFEB"/>
<stop offset="1" stop-color="#2A6FF4"/>
</linearGradient>
</defs>
</svg>
`;var Xe=`<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M70.002 140C108.663 140 140.004 108.659 140.004 69.998C140.004 31.337 108.663 -0.00390625 70.002 -0.00390625C31.3409 -0.00390625 0 31.337 0 69.998C0 108.659 31.3409 140 70.002 140Z" fill="#141518"/>
<path d="M136.581 69.9993C136.581 106.773 106.769 136.584 69.9954 136.584C33.2214 136.584 3.41016 106.773 3.41016 69.9993C3.41016 33.2253 33.2214 3.41406 69.9954 3.41406C106.769 3.41406 136.581 33.2253 136.581 69.9993Z" fill="#141518" stroke="#FD4E4E"/>
<g filter="url(#filter0_d_3868_33253)">
<path d="M58.9576 47.5273H57.0854C57.0124 47.5273 56.9531 47.5867 56.9531 47.6599V49.6613C56.9531 49.7345 57.0124 49.7938 57.0854 49.7938H58.9576C59.0307 49.7938 59.09 49.7345 59.09 49.6613V47.6599C59.09 47.5867 59.0307 47.5273 58.9576 47.5273Z" fill="white"/>
</g>
<g filter="url(#filter1_d_3868_33253)">
<path d="M58.9772 57.6543H57.105C57.0319 57.6543 56.9727 57.7136 56.9727 57.7868V59.7882C56.9727 59.8614 57.0319 59.9208 57.105 59.9208H58.9772C59.0502 59.9208 59.1095 59.8614 59.1095 59.7882V57.7868C59.1095 57.7136 59.0502 57.6543 58.9772 57.6543Z" fill="white"/>
</g>
<g filter="url(#filter2_d_3868_33253)">
<path d="M61.3405 44.998H59.4682C59.3952 44.998 59.3359 45.0574 59.3359 45.1306V47.132C59.3359 47.2052 59.3952 47.2645 59.4682 47.2645H61.3405C61.4135 47.2645 61.4728 47.2052 61.4728 47.132V45.1306C61.4728 45.0574 61.4135 44.998 61.3405 44.998Z" fill="white"/>
</g>
<g filter="url(#filter3_d_3868_33253)">
<path d="M61.3405 60.2129H59.4682C59.3952 60.2129 59.3359 60.2722 59.3359 60.3454V62.3468C59.3359 62.42 59.3952 62.4794 59.4682 62.4794H61.3405C61.4135 62.4794 61.4728 62.42 61.4728 62.3468V60.3454C61.4728 60.2722 61.4135 60.2129 61.3405 60.2129Z" fill="white"/>
</g>
<g filter="url(#filter4_d_3868_33253)">
<path d="M47.0045 44.998H45.1323C45.0592 44.998 45 45.0574 45 45.1306V47.132C45 47.2052 45.0592 47.2645 45.1323 47.2645H47.0045C47.0776 47.2645 47.1368 47.2052 47.1368 47.132V45.1306C47.1368 45.0574 47.0776 44.998 47.0045 44.998Z" fill="white"/>
</g>
<g filter="url(#filter5_d_3868_33253)">
<path d="M47.0045 60.2129H45.1323C45.0592 60.2129 45 60.2722 45 60.3454V62.3468C45 62.42 45.0592 62.4794 45.1323 62.4794H47.0045C47.0776 62.4794 47.1368 62.42 47.1368 62.3468V60.3454C47.1368 60.2722 47.0776 60.2129 47.0045 60.2129Z" fill="white"/>
</g>
<g filter="url(#filter6_d_3868_33253)">
<path d="M49.4069 47.5078H47.5347C47.4616 47.5078 47.4023 47.5672 47.4023 47.6404V49.6417C47.4023 49.7149 47.4616 49.7743 47.5347 49.7743H49.4069C49.4799 49.7743 49.5392 49.7149 49.5392 49.6417V47.6404C49.5392 47.5672 49.4799 47.5078 49.4069 47.5078Z" fill="white"/>
</g>
<g filter="url(#filter7_d_3868_33253)">
<path d="M49.4069 57.6543H47.5347C47.4616 57.6543 47.4023 57.7136 47.4023 57.7868V59.7882C47.4023 59.8614 47.4616 59.9208 47.5347 59.9208H49.4069C49.4799 59.9208 49.5392 59.8614 49.5392 59.7882V57.7868C49.5392 57.7136 49.4799 57.6543 49.4069 57.6543Z" fill="white"/>
</g>
<g filter="url(#filter8_d_3868_33253)">
<path d="M51.7897 50.0469H49.9175C49.8444 50.0469 49.7852 50.1062 49.7852 50.1794V52.1808C49.7852 52.254 49.8444 52.3133 49.9175 52.3133H51.7897C51.8627 52.3133 51.922 52.254 51.922 52.1808V50.1794C51.922 50.1062 51.8627 50.0469 51.7897 50.0469Z" fill="white"/>
</g>
<g filter="url(#filter9_d_3868_33253)">
<path d="M51.7897 55.1152H49.9175C49.8444 55.1152 49.7852 55.1746 49.7852 55.2478V57.2492C49.7852 57.3224 49.8444 57.3817 49.9175 57.3817H51.7897C51.8627 57.3817 51.922 57.3224 51.922 57.2492V55.2478C51.922 55.1746 51.8627 55.1152 51.7897 55.1152Z" fill="white"/>
</g>
<g filter="url(#filter10_d_3868_33253)">
<path d="M54.192 52.5859H52.3198C52.2467 52.5859 52.1875 52.6453 52.1875 52.7185V54.7199C52.1875 54.7931 52.2467 54.8524 52.3198 54.8524H54.192C54.2651 54.8524 54.3243 54.7931 54.3243 54.7199V52.7185C54.3243 52.6453 54.2651 52.5859 54.192 52.5859Z" fill="white"/>
</g>
<g filter="url(#filter11_d_3868_33253)">
<path d="M56.5553 50.0566H54.6831C54.61 50.0566 54.5508 50.116 54.5508 50.1892V52.1906C54.5508 52.2638 54.61 52.3231 54.6831 52.3231H56.5553C56.6284 52.3231 56.6876 52.2638 56.6876 52.1906V50.1892C56.6876 50.116 56.6284 50.0566 56.5553 50.0566Z" fill="white"/>
</g>
<g filter="url(#filter12_d_3868_33253)">
<path d="M56.5748 55.1152H54.7026C54.6296 55.1152 54.5703 55.1746 54.5703 55.2478V57.2492C54.5703 57.3224 54.6296 57.3817 54.7026 57.3817H56.5748C56.6479 57.3817 56.7071 57.3224 56.7071 57.2492V55.2478C56.7071 55.1746 56.6479 55.1152 56.5748 55.1152Z" fill="white"/>
</g>
<g filter="url(#filter13_d_3868_33253)">
<path d="M93.9576 47.5273H92.0854C92.0124 47.5273 91.9531 47.5867 91.9531 47.6599V49.6613C91.9531 49.7345 92.0124 49.7938 92.0854 49.7938H93.9576C94.0307 49.7938 94.09 49.7345 94.09 49.6613V47.6599C94.09 47.5867 94.0307 47.5273 93.9576 47.5273Z" fill="white"/>
</g>
<g filter="url(#filter14_d_3868_33253)">
<path d="M93.9772 57.6543H92.105C92.0319 57.6543 91.9727 57.7136 91.9727 57.7868V59.7882C91.9727 59.8614 92.0319 59.9208 92.105 59.9208H93.9772C94.0502 59.9208 94.1095 59.8614 94.1095 59.7882V57.7868C94.1095 57.7136 94.0502 57.6543 93.9772 57.6543Z" fill="white"/>
</g>
<g filter="url(#filter15_d_3868_33253)">
<path d="M96.3405 44.998H94.4682C94.3952 44.998 94.3359 45.0574 94.3359 45.1306V47.132C94.3359 47.2052 94.3952 47.2645 94.4682 47.2645H96.3405C96.4135 47.2645 96.4728 47.2052 96.4728 47.132V45.1306C96.4728 45.0574 96.4135 44.998 96.3405 44.998Z" fill="white"/>
</g>
<g filter="url(#filter16_d_3868_33253)">
<path d="M96.3405 60.2129H94.4682C94.3952 60.2129 94.3359 60.2722 94.3359 60.3454V62.3468C94.3359 62.42 94.3952 62.4794 94.4682 62.4794H96.3405C96.4135 62.4794 96.4728 62.42 96.4728 62.3468V60.3454C96.4728 60.2722 96.4135 60.2129 96.3405 60.2129Z" fill="white"/>
</g>
<g filter="url(#filter17_d_3868_33253)">
<path d="M82.0045 44.998H80.1323C80.0592 44.998 80 45.0574 80 45.1306V47.132C80 47.2052 80.0592 47.2645 80.1323 47.2645H82.0045C82.0776 47.2645 82.1368 47.2052 82.1368 47.132V45.1306C82.1368 45.0574 82.0776 44.998 82.0045 44.998Z" fill="white"/>
</g>
<g filter="url(#filter18_d_3868_33253)">
<path d="M82.0045 60.2129H80.1323C80.0592 60.2129 80 60.2722 80 60.3454V62.3468C80 62.42 80.0592 62.4794 80.1323 62.4794H82.0045C82.0776 62.4794 82.1368 62.42 82.1368 62.3468V60.3454C82.1368 60.2722 82.0776 60.2129 82.0045 60.2129Z" fill="white"/>
</g>
<g filter="url(#filter19_d_3868_33253)">
<path d="M84.4069 47.5078H82.5347C82.4616 47.5078 82.4023 47.5672 82.4023 47.6404V49.6417C82.4023 49.7149 82.4616 49.7743 82.5347 49.7743H84.4069C84.4799 49.7743 84.5392 49.7149 84.5392 49.6417V47.6404C84.5392 47.5672 84.4799 47.5078 84.4069 47.5078Z" fill="white"/>
</g>
<g filter="url(#filter20_d_3868_33253)">
<path d="M84.4069 57.6543H82.5347C82.4616 57.6543 82.4023 57.7136 82.4023 57.7868V59.7882C82.4023 59.8614 82.4616 59.9208 82.5347 59.9208H84.4069C84.4799 59.9208 84.5392 59.8614 84.5392 59.7882V57.7868C84.5392 57.7136 84.4799 57.6543 84.4069 57.6543Z" fill="white"/>
</g>
<g filter="url(#filter21_d_3868_33253)">
<path d="M86.7897 50.0469H84.9175C84.8444 50.0469 84.7852 50.1062 84.7852 50.1794V52.1808C84.7852 52.254 84.8444 52.3133 84.9175 52.3133H86.7897C86.8627 52.3133 86.922 52.254 86.922 52.1808V50.1794C86.922 50.1062 86.8627 50.0469 86.7897 50.0469Z" fill="white"/>
</g>
<g filter="url(#filter22_d_3868_33253)">
<path d="M86.7897 55.1152H84.9175C84.8444 55.1152 84.7852 55.1746 84.7852 55.2478V57.2492C84.7852 57.3224 84.8444 57.3817 84.9175 57.3817H86.7897C86.8627 57.3817 86.922 57.3224 86.922 57.2492V55.2478C86.922 55.1746 86.8627 55.1152 86.7897 55.1152Z" fill="white"/>
</g>
<g filter="url(#filter23_d_3868_33253)">
<path d="M89.192 52.5859H87.3198C87.2467 52.5859 87.1875 52.6453 87.1875 52.7185V54.7199C87.1875 54.7931 87.2467 54.8524 87.3198 54.8524H89.192C89.2651 54.8524 89.3243 54.7931 89.3243 54.7199V52.7185C89.3243 52.6453 89.2651 52.5859 89.192 52.5859Z" fill="white"/>
</g>
<g filter="url(#filter24_d_3868_33253)">
<path d="M91.5553 50.0566H89.6831C89.61 50.0566 89.5508 50.116 89.5508 50.1892V52.1906C89.5508 52.2638 89.61 52.3231 89.6831 52.3231H91.5553C91.6284 52.3231 91.6876 52.2638 91.6876 52.1906V50.1892C91.6876 50.116 91.6284 50.0566 91.5553 50.0566Z" fill="white"/>
</g>
<g filter="url(#filter25_d_3868_33253)">
<path d="M91.5748 55.1152H89.7026C89.6296 55.1152 89.5703 55.1746 89.5703 55.2478V57.2492C89.5703 57.3224 89.6296 57.3817 89.7026 57.3817H91.5748C91.6479 57.3817 91.7071 57.3224 91.7071 57.2492V55.2478C91.7071 55.1746 91.6479 55.1152 91.5748 55.1152Z" fill="white"/>
</g>
<path d="M69.8451 95.0369C76.666 95.0277 83.4377 96.1929 89.8633 98.4814C90.0545 98.548 90.2306 98.652 90.3815 98.7872C90.5323 98.9225 90.6547 99.0862 90.7418 99.2691C90.8289 99.452 90.8789 99.6503 90.8888 99.8526C90.8987 100.055 90.8684 100.257 90.7996 100.448C90.7317 100.643 90.6254 100.822 90.4871 100.975C90.3487 101.128 90.181 101.252 89.994 101.339C89.807 101.427 89.6043 101.476 89.3981 101.483C89.1918 101.491 88.9861 101.457 88.7931 101.384C82.6988 99.2209 76.2785 98.1192 69.8116 98.1269C63.4876 98.1202 57.2072 99.1737 51.2315 101.244C51.0401 101.311 50.8371 101.34 50.6344 101.329C50.4318 101.318 50.2333 101.266 50.0505 101.178C49.8677 101.09 49.7042 100.966 49.5694 100.815C49.4346 100.663 49.3312 100.486 49.2651 100.294C49.1986 100.103 49.1704 99.9006 49.1821 99.6987C49.1939 99.4967 49.2453 99.2991 49.3335 99.1171C49.4217 98.9351 49.545 98.7722 49.6962 98.6379C49.8475 98.5035 50.0237 98.4004 50.2148 98.3342C56.5268 96.1411 63.163 95.0264 69.8451 95.0369Z" fill="white"/>
<defs>
<filter id="filter0_d_3868_33253" x="42.3817" y="32.9559" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter1_d_3868_33253" x="42.4012" y="43.0829" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter2_d_3868_33253" x="44.7645" y="30.4266" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter3_d_3868_33253" x="44.7645" y="45.6415" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter4_d_3868_33253" x="30.4286" y="30.4266" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter5_d_3868_33253" x="30.4286" y="45.6415" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter6_d_3868_33253" x="32.8309" y="32.9364" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter7_d_3868_33253" x="32.8309" y="43.0829" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter8_d_3868_33253" x="35.2137" y="35.4754" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter9_d_3868_33253" x="35.2137" y="40.5438" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter10_d_3868_33253" x="37.6161" y="38.0145" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter11_d_3868_33253" x="39.9794" y="35.4852" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter12_d_3868_33253" x="39.9989" y="40.5438" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter13_d_3868_33253" x="77.3817" y="32.9559" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter14_d_3868_33253" x="77.4012" y="43.0829" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter15_d_3868_33253" x="79.7645" y="30.4266" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter16_d_3868_33253" x="79.7645" y="45.6415" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter17_d_3868_33253" x="65.4286" y="30.4266" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter18_d_3868_33253" x="65.4286" y="45.6415" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter19_d_3868_33253" x="67.8309" y="32.9364" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter20_d_3868_33253" x="67.8309" y="43.0829" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter21_d_3868_33253" x="70.2137" y="35.4754" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter22_d_3868_33253" x="70.2137" y="40.5438" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter23_d_3868_33253" x="72.6161" y="38.0145" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter24_d_3868_33253" x="74.9794" y="35.4852" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
<filter id="filter25_d_3868_33253" x="74.9989" y="40.5438" width="31.2796" height="31.4085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="7.28571"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.75 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3868_33253"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3868_33253" result="shape"/>
</filter>
</defs>
</svg>
`;var Je=[{name:"device_id",required:!0,selector:{device:{filter:[{integration:"voltie_charger"}]}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_power_graph",default:!0,selector:{boolean:{}}},{name:"show_advanced",default:!0,selector:{boolean:{}}}]},{name:"debug",default:!1,selector:{boolean:{}}}],St={device_id:"Voltie Charger device",name:"Custom name (optional)",show_power_graph:"Live power graph (while charging)",show_advanced:"Show the Advanced drawer",debug:"Debug logging (browser console)"},$t=(()=>{let s={},e=t=>{for(let i of t)i.schema?e(i.schema):i.name&&"default"in i&&(s[i.name]=i.default)};return e(Je),s})(),N=class extends g{setConfig(e){this._config=e}render(){return!this.hass||!this._config?p``:p`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Je}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_computeLabel(e){return St[e.name]??e.name}_valueChanged(e){e.stopPropagation();let i={...e.detail?.value??{}};for(let[r,n]of Object.entries(i)){if(n===""||n===void 0||n===null){delete i[r];continue}let a=$t[r];a!==void 0&&n===a&&delete i[r]}this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};H(N,"properties",{hass:{attribute:!1},_config:{state:!0}}),H(N,"styles",k`
    :host { display: block; }
    ha-form { display: block; }
  `);customElements.get("voltie-charger-card-editor")||customElements.define("voltie-charger-card-editor",N);var z="voltie-charger-card",bt="0.2.0",At=30*60*1e3,Mt=12*60*60*1e3,_e=2e3,Ht=30*1e3,Vt=300,Et=36,Bt=2,Tt=2.5,kt=90,Qe=5e3,Rt=3e3,Ft=600,et=[2e3,5e3,15e3,3e4,6e4],Ut=250,tt=10,L=class extends g{constructor(){super(),this._config=null,this._expanded=!1,this._cardState="offline",this._slideValue=0,this._entities={},this._graph={samples:[],sessionStartMs:null,lastPowerUpdated:null,historyPromise:null,renderTicker:null},this._prevInSession=!1,this._registry=null,this._registryPromise=null,this._registryStatus="loading",this._registryRetryAttempt=0,this._registryRetryTimer=null,this._unsubRegistryEvents=null,this._registrySubscribing=!1,this._registryEventDebounceTimer=null,this._pendingToggle=null,this._pendingRefreshTimer=null,this._pendingClearTimer=null,this._refreshing=!1,this._refreshPromise=null,this._refreshCooldownUntil=0,this._refreshMinSpinUntil=0,this._refreshSpinStopTimer=null,this._valueCache=new Map,this._lastEvseSig=null,this._lastFallthroughSig=null}connectedCallback(){super.connectedCallback(),this.hass&&(this._ensureRegistry(),this._subscribeRegistryEvents())}disconnectedCallback(){super.disconnectedCallback();let e=this._unsubRegistryEvents;this._unsubRegistryEvents=null,typeof e=="function"&&e(),clearTimeout(this._pendingRefreshTimer),clearTimeout(this._pendingClearTimer),clearTimeout(this._refreshSpinStopTimer),clearTimeout(this._registryRetryTimer),clearTimeout(this._registryEventDebounceTimer),this._pendingRefreshTimer=null,this._pendingClearTimer=null,this._refreshSpinStopTimer=null,this._registryRetryTimer=null,this._registryEventDebounceTimer=null,this._pendingToggle=null,this._refreshing=!1,this._stopRenderTicker(),this._graph.samples=[],this._graph.lastPowerUpdated=null,this._graph.historyPromise=null,this._graph.sessionStartMs=null,this._prevInSession=!1}_ensureRegistry(e=!1){return this.hass?this._registryPromise?this._registryPromise:!e&&this._registry?Promise.resolve():(clearTimeout(this._registryRetryTimer),this._registryPromise=Ge(this.hass).then(t=>{t?(this._registry=t,this._registryStatus="ok",this._registryRetryAttempt=0,this._entities=fe(t,this._config?.device_id),this._cardState=this._computeCardState(),this.requestUpdate()):this._scheduleRegistryRetry()}).catch(()=>{this._scheduleRegistryRetry()}).finally(()=>{this._registryPromise=null}),this._registryPromise):this._registryPromise??Promise.resolve()}_scheduleRegistryRetry(){let e=Math.min(this._registryRetryAttempt,et.length-1),t=et[e];this._registryRetryAttempt+=1,this._registryRetryAttempt>=3&&this._registryStatus!=="ok"&&(this._registryStatus="failed"),clearTimeout(this._registryRetryTimer),this._registryRetryTimer=setTimeout(()=>{this._ensureRegistry(!0)},t)}async _subscribeRegistryEvents(){if(!(this._unsubRegistryEvents||this._registrySubscribing)&&this.hass?.connection){this._registrySubscribing=!0;try{let e=await this.hass.connection.subscribeEvents(()=>this._onRegistryEvent(),"entity_registry_updated");if(!this.isConnected){e();return}this._unsubRegistryEvents=e}catch{}finally{this._registrySubscribing=!1}}}_onRegistryEvent(){clearTimeout(this._registryEventDebounceTimer),this._registryEventDebounceTimer=setTimeout(()=>{this._ensureRegistry(!0)},Ut)}static getConfigElement(){return document.createElement("voltie-charger-card-editor")}static getStubConfig(e){let t=Ze(e);return{type:`custom:${z}`,device_id:t.length===1?t[0].device_id:""}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid configuration");this._config={show_power_graph:!0,show_advanced:!0,...e},this._expanded=!1}_estimateRows(){let t={offline:5,idle:6,ready:8,charging:10,fault:7}[this._cardState]??8;return this._config?.show_advanced!==!1&&this._cardState!=="offline"?this._expanded?t+5:t+1:t}getCardSize(){return this._estimateRows()}getLayoutOptions(){return{grid_columns:4,grid_rows:"auto",grid_min_rows:4}}willUpdate(e){if(!this.hass||!this._config)return;e.has("hass")&&(this._ensureRegistry(),!this._unsubRegistryEvents&&!this._registrySubscribing&&this._subscribeRegistryEvents()),(e.has("hass")||e.has("_config"))&&(this._entities=fe(this._registry,this._config.device_id),this._clearPendingToggleIfRealMatches(),this._cardState=this._computeCardState());let t=this._isInSession();t&&!this._prevInSession?this._enterSession():!t&&this._prevInSession?this._exitSession():t&&this._graph.samples.length===0&&!this._graph.historyPromise&&this._config.show_power_graph!==!1&&this._fetchGraphHistory(),this._prevInSession=t,e.has("hass")&&(this._captureLiveSample(),this._logEvseChanges())}_clearPendingToggleIfRealMatches(){if(!this._pendingToggle)return;let e=S(this.hass,this._entities.is_charging);this._pendingToggle==="start"&&e==="on"?this._pendingToggle=null:this._pendingToggle==="stop"&&e!=="on"&&(this._pendingToggle=null)}_logEvseChanges(){if(!this._config?.debug)return;let e=this._entities.evse_state;if(!e)return;let t=this.hass?.states?.[e];if(!t)return;let i=t.attributes?.raw_code,r=`${t.state}@${i}@${t.last_changed||t.last_updated}`;if(r===this._lastEvseSig)return;this._lastEvseSig=r;let n=new Date().toLocaleTimeString(),a=i!==void 0?`, raw_code=${i}`:"";console.log(`[voltie-card] evse_state \u2192 "${t.state}"${a} (state_ts ${t.last_changed||t.last_updated}, local ${n})`)}_isInSession(){return this._cardState==="ready"||this._cardState==="charging"}_deriveSessionStartMs(){let e=m(this.hass,this._entities.session_charge_time),t=m(this.hass,this._entities.session_idle_time);if(e===null&&t===null)return Date.now()-At;let i=(e??0)+(t??0);return Date.now()-Math.min(i*1e3,Mt)}_currentPowerValue(){return m(this.hass,this._entities.charge_power)}_enterSession(){this._graph.samples=[],this._graph.lastPowerUpdated=null,this._graph.historyPromise=null,this._graph.sessionStartMs=this._deriveSessionStartMs(),this._config?.show_power_graph!==!1&&(this._fetchGraphHistory(),this._startRenderTicker())}_exitSession(){this._stopRenderTicker(),this._graph.samples=[],this._graph.lastPowerUpdated=null,this._graph.historyPromise=null,this._graph.sessionStartMs=null}_startRenderTicker(){this._stopRenderTicker(),this._graph.renderTicker=setInterval(()=>{this._isInSession()&&this._graph.samples.length>0&&this.requestUpdate()},Ht)}_stopRenderTicker(){this._graph.renderTicker&&(clearInterval(this._graph.renderTicker),this._graph.renderTicker=null)}_fetchGraphHistory(){if(this._graph.historyPromise)return this._graph.historyPromise;let e=this._entities.charge_power;if(!e||!this.hass?.callWS)return Promise.resolve();this._graph.sessionStartMs===null&&(this._graph.sessionStartMs=this._deriveSessionStartMs());let t=new Date(this._graph.sessionStartMs).toISOString(),i=new Date().toISOString();return this._graph.historyPromise=(async()=>{try{let n=(await this.hass.callWS({type:"history/history_during_period",start_time:t,end_time:i,entity_ids:[e],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}))?.[e];if(!Array.isArray(n)||!n.length)return;let a=[];for(let h of n){let c=Number(h.lu)*1e3,f=Number(h.s);Number.isFinite(c)&&Number.isFinite(f)&&a.push({t:c,v:f})}if(!a.length)return;a.sort((h,c)=>h.t-c.t);let o=[];for(let h=0;h<a.length;h++){let c=a[h],f=a[h-1];f&&f.v!==c.v&&o.push({t:c.t-1,v:f.v}),o.push(c)}let l=new Map;for(let h of o)l.set(h.t,h);for(let h of this._graph.samples)l.set(h.t,h);this._graph.samples=[...l.values()].sort((h,c)=>h.t-c.t).filter(h=>h.t>=this._graph.sessionStartMs).slice(-_e),this.requestUpdate()}catch{}finally{this._graph.historyPromise=null}})(),this._graph.historyPromise}_computeCardState(){let e=this._entities;if(!je(this.hass,e.charging))return"offline";let t=S(this.hass,e.evse_state);if(t&&qe.has(t))return"fault";let i=S(this.hass,e.car_connected),r=S(this.hass,e.is_charging),n=this._pendingToggle==="start"?"on":this._pendingToggle==="stop"?"off":r;if(i==="off")return"idle";if(i==="on"&&n==="off")return"ready";if(i==="on"&&n==="on")return"charging";if(t==="ev_not_connected")return"idle";if(t==="ev_connected_not_charging")return"ready";if(t==="ev_connected_charging")return n==="on"?"charging":"ready";if(this._config?.debug){let a=`${t??"null"}|${i??"null"}|${r??"null"}`;a!==this._lastFallthroughSig&&(this._lastFallthroughSig=a,console.warn(`[voltie-card] ambiguous state fallback (idle): evse_state=${t}, car_connected=${i}, is_charging=${r}`))}return"idle"}_captureLiveSample(){if(!this._isInSession())return;let e=this._entities.charge_power;if(!e)return;let t=this.hass?.states?.[e];if(!t)return;let i=Number(t.state);if(!Number.isFinite(i))return;let r=new Date(t.last_updated||t.last_changed).getTime();if(!Number.isFinite(r)||r===this._graph.lastPowerUpdated)return;this._graph.lastPowerUpdated=r;let n=new Date(t.last_changed).getTime(),a=this._graph.samples[this._graph.samples.length-1];a&&Number.isFinite(n)&&n>a.t&&a.v===0!=(i===0)&&(this._appendGraphSample(n-1,a.v),this._appendGraphSample(n,i)),this._appendGraphSample(r,i)}_appendGraphSample(e,t){if(!Number.isFinite(e)||!Number.isFinite(t))return;let i=this._graph.sessionStartMs??this._deriveSessionStartMs();if(e<i)return;let r=this._graph.samples[this._graph.samples.length-1];r&&e<=r.t||(this._graph.samples.push({t:e,v:t}),this._graph.samples.length>_e&&this._graph.samples.splice(0,this._graph.samples.length-_e))}_onSlideInput(e){this._slideValue=Number(e.target.value)}_onSlideCommit(e){if(Number(e.target.value)>kt){let i=this._entities.charging;i&&(this._pendingToggle=this._cardState==="charging"?"stop":"start",this.hass.callService("switch","toggle",{entity_id:i}),this._scheduleOptimisticResync())}e.target.value=0,this._slideValue=0}_scheduleOptimisticResync(){clearTimeout(this._pendingRefreshTimer),clearTimeout(this._pendingClearTimer),this._pendingRefreshTimer=setTimeout(()=>{let e=[this._entities.is_charging,this._entities.charging,this._entities.charge_power,this._entities.charge_current,this._entities.evse_state].filter(Boolean);e.length&&this.hass.callService("homeassistant","update_entity",{entity_id:e})},Qe-1e3),this._pendingClearTimer=setTimeout(()=>{this._pendingToggle=null},Qe)}_onToggleDrawer(){this._expanded=!this._expanded}_onRefreshClick(e){e?.stopPropagation?.();let t=Date.now();if(this._refreshPromise||t<this._refreshCooldownUntil)return;let i=this._entities.charging||this._entities.is_charging||this._entities.evse_state||this._entities.charge_power;i&&(this._refreshCooldownUntil=t+Rt,this._refreshMinSpinUntil=t+Ft,this._refreshing=!0,clearTimeout(this._refreshSpinStopTimer),this._refreshPromise=Promise.resolve(this.hass.callService("homeassistant","update_entity",{entity_id:i})).catch(()=>{}).finally(()=>{this._refreshPromise=null;let r=Math.max(0,this._refreshMinSpinUntil-Date.now());this._refreshSpinStopTimer=setTimeout(()=>{this._refreshing=!1},r)}))}render(){return!this._config||!this.hass?d:this._config.device_id?this._registryStatus==="failed"&&!this._registry?p`<ha-card>
        <div class="setup-hint">
          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
          <div>
            <strong>Can't reach Home Assistant's entity registry</strong>
            <span>Retrying in the background. Check your HA connection.</span>
          </div>
        </div>
      </ha-card>`:p`
      <ha-card>
        <div class="panel">
          ${this._renderRefreshButton()}
          ${this._renderChargerId()}
          ${this._renderStateBody()}
          ${this._config.show_advanced?this._renderDrawer():d}
        </div>
      </ha-card>
    `:p`<ha-card>
        <div class="setup-hint">
          <ha-icon icon="mdi:tune"></ha-icon>
          <div>
            <strong>Choose a charger</strong>
            <span>Edit this card and pick a Voltie Charger device.</span>
          </div>
        </div>
      </ha-card>`}_renderRefreshButton(){return p`
      <button
        class="refresh-btn"
        ?data-spinning=${this._refreshing}
        @click=${this._onRefreshClick}
        aria-label="Refresh"
        title="Refresh"
      >
        <ha-icon icon="mdi:refresh"></ha-icon>
      </button>
    `}_renderChargerId(){let e=Ne(this.hass,this._config.device_id),t=e&&e.match(/([0-9a-f]{4})\s*$/i);return t?p`<p class="charger-id">${t[1].toUpperCase()}</p>`:d}_renderStateBody(){switch(this._cardState){case"offline":return this._renderOffline();case"idle":return this._renderIdle();case"ready":return this._renderReady();case"charging":return this._renderCharging();case"fault":return this._renderFault();default:return d}}_renderOffline(){return p`
      <p class="label">Offline</p>
      <div class="illustration">${B(Ke)}</div>
    `}_renderIdle(){return p`
      <p class="label">Online</p>
      <p class="label--sub">Car not connected</p>
      <div class="illustration">${B(ue)}</div>
    `}_renderReady(){return p`
      <p class="label">Car plugged in</p>
      <div class="illustration">${B(ue)}</div>
      ${this._renderSlider("start","Slide to START charging")}
      ${this._renderStats()}
      ${this._config.show_power_graph?this._renderSparkline():d}
    `}_renderCharging(){return p`
      <p class="label">Charging</p>
      <div class="illustration">${B(Ye)}</div>
      ${this._renderSlider("stop","Slide to STOP charging")}
      ${this._renderStats()}
      ${this._config.show_power_graph?this._renderSparkline():d}
    `}_renderFault(){let e=S(this.hass,this._entities.evse_state)??"error",t=this._localizeEvseState()||"Fault",i=Q[e]??Q.error;return p`
      <p class="label">${t}</p>
      <div class="illustration">${B(Xe)}</div>
      <div class="hint">${i}</div>
    `}_localizeEvseState(){let e=this._entities.evse_state;if(!e)return null;let t=this.hass.states?.[e];if(!t)return null;if(typeof this.hass.formatEntityState=="function")try{return this.hass.formatEntityState(t)}catch{}let i=`component.voltie_charger.entity.sensor.evse_state.state.${t.state}`,r=this.hass.localize?.(i);return r&&r!==i?r:null}_renderSlider(e,t){let i=this._slideValue;return p`
      <div class="slide">
        <input
          class="slide__input ${e}"
          type="range"
          min="0"
          max="100"
          .value=${String(i)}
          @input=${this._onSlideInput}
          @change=${this._onSlideCommit}
          aria-label=${t}
        />
        <div class="slide__text">${t}</div>
      </div>
    `}_renderStats(){let e=J(this.hass,this._entities.session_energy,this._valueCache),t=J(this.hass,this._entities.charge_power,this._valueCache),i=J(this.hass,this._entities.session_charge_time,this._valueCache),r=e.value!==null?Le(e.value,this.hass)??"\u2014":"\u2014",n=t.value!==null?pe(t.value,this.hass)??"\u2014":"\u2014",a=i.value!==null?We(i.value):"\u2014",o=l=>`stat__value${l.stale?" stat__value--stale":""}`;return p`
      <div class="stats">
        <div class="stat">
          <p class=${o(e)}>${r}</p>
          <p class="stat__label">Session energy</p>
        </div>
        <div class="stat">
          <p class=${o(i)}>${a}</p>
          <p class="stat__label">Session time</p>
        </div>
        <div class="stat">
          <p class=${o(t)}>${n}</p>
          <p class="stat__label">Charge power</p>
        </div>
      </div>
    `}_renderSparkline(){let e=this._graph.samples;if(e.length===0)return d;let t=Date.now(),i=e[e.length-1],r=this._currentPowerValue()??i.v,n=t>i.t?[...e,{t,v:r}]:e;if(n.length<2)return d;let a=Vt,o=Et,l=Bt,h=n[0].t,c=n[n.length-1].t,f=Math.max(1,c-h),u=Math.max(...n.map(y=>y.v),1),_=y=>(y-h)/f*a,$=y=>o-Math.max(y,0)/u*(o-2*l)-l,ge=n.map(y=>`${_(y.t).toFixed(1)},${$(y.v).toFixed(1)}`).join(" "),me=_(c),it=$(n[n.length-1].v);return p`
      <svg class="sparkline" viewBox="0 0 ${a} ${o}" preserveAspectRatio="none">
        <polyline
          class="sparkline__fill"
          points="0,${o} ${ge} ${me.toFixed(1)},${o}"
        ></polyline>
        <polyline class="sparkline__stroke" points=${ge}></polyline>
        <circle
          class="sparkline__dot"
          cx=${me.toFixed(1)}
          cy=${it.toFixed(1)}
          r=${Tt}
        ></circle>
      </svg>
    `}_renderDrawer(){if(this._cardState==="offline")return d;let e=this._entities.voltage_l1||this._entities.current_l1||this._entities.power_l1,t=this._getSessionPeriods().length>0;return!e&&!t?d:p`
      <button
        class="drawer-toggle"
        aria-expanded=${this._expanded}
        @click=${this._onToggleDrawer}
      >
        ${this._expanded?"\u23F6":"\u23F7"}
      </button>
      ${this._expanded?p`<div class="drawer-body">
            ${e?this._renderPhaseGrid():d}
            ${e&&t?p`<div class="drawer-sep"></div>`:d}
            ${t?this._renderPeriods():d}
          </div>`:d}
    `}_getSessionPeriods(){let e=this._entities.session_energy;if(!e)return[];let t=this.hass?.states?.[e]?.attributes?.periods;return Array.isArray(t)?t:[]}_renderPeriods(){let e=this._getSessionPeriods();if(!e.length)return d;let t=o=>{if(!o)return"\u2014";try{return new Date(o*1e3).toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",hour12:!1})}catch{return"\u2014"}},i=o=>{if(o==null)return"\u2014";let l=Number(o);return Number.isFinite(l)?`${l.toFixed(2)} kWh`:"\u2014"},r=e.map((o,l)=>({num:(o.index??l)+1,start:t(o.p_start),end:o.p_end?t(o.p_end):"",energy:i(o.p_energy)}));r.reverse();let n=Math.max(0,r.length-tt),a=r.slice(0,tt);return p`
      <div class="periods__header">Periods this session</div>
      ${a.map(o=>p`
          <div class="periods__row">
            <span><span class="periods__num">#${o.num}</span> ${o.start} – ${o.end}</span>
            <strong>${o.energy}</strong>
          </div>
        `)}
      ${n>0?p`<div class="periods__more">+ ${n} more</div>`:d}
    `}_renderPhaseGrid(){let e=c=>ze(m(this.hass,this._entities[`voltage_l${c}`]),this.hass)??"\u2014",t=c=>X(m(this.hass,this._entities[`current_l${c}`]),this.hass,{precision:1})??"\u2014",i=c=>pe(m(this.hass,this._entities[`power_l${c}`]),this.hass)??"\u2014",r=S(this.hass,this._entities.dlm_valid),n=S(this.hass,this._entities.ipm_valid),a=!!this._entities.dlm_current_l1,o=!!this._entities.ipm_current_l1,l=c=>X(m(this.hass,this._entities[`dlm_current_l${c}`]),this.hass,{precision:1})??"\u2014",h=c=>X(m(this.hass,this._entities[`ipm_current_l${c}`]),this.hass,{precision:1})??"\u2014";return p`
      <div class="phase-grid">
        <span class="phase-grid__label"></span>
        <span class="phase-grid__header">Phase 1</span>
        <span class="phase-grid__header">Phase 2</span>
        <span class="phase-grid__header">Phase 3</span>

        <span class="phase-grid__label">Voltage</span>
        <span class="phase-grid__cell">${e(1)}</span>
        <span class="phase-grid__cell">${e(2)}</span>
        <span class="phase-grid__cell">${e(3)}</span>

        <span class="phase-grid__label">Current</span>
        <span class="phase-grid__cell">${t(1)}</span>
        <span class="phase-grid__cell">${t(2)}</span>
        <span class="phase-grid__cell">${t(3)}</span>

        <span class="phase-grid__label">Power</span>
        <span class="phase-grid__cell">${i(1)}</span>
        <span class="phase-grid__cell">${i(2)}</span>
        <span class="phase-grid__cell">${i(3)}</span>
      </div>
      ${a||o?p`<div class="drawer-sep"></div>
            <div class="aux-grid">
              ${a?p`
                    <span class="aux-grid__meta">
                      DLM ${r==="on"?"active":"inactive"}
                    </span>
                    <span class="phase-grid__cell">${l(1)}</span>
                    <span class="phase-grid__cell">${l(2)}</span>
                    <span class="phase-grid__cell">${l(3)}</span>
                  `:d}
              ${o?p`
                    <span class="aux-grid__meta">
                      IPM ${n==="on"?"active":"inactive"}
                    </span>
                    <span class="phase-grid__cell">${h(1)}</span>
                    <span class="phase-grid__cell">${h(2)}</span>
                    <span class="phase-grid__cell">${h(3)}</span>
                  `:d}
            </div>`:d}
    `}};H(L,"properties",{hass:{attribute:!1},_config:{state:!0},_expanded:{state:!0},_cardState:{reflect:!0,attribute:"card-state"},_slideValue:{state:!0},_pendingToggle:{state:!0},_refreshing:{state:!0},_registryStatus:{state:!0}}),H(L,"styles",Ie);customElements.get(z)||customElements.define(z,L);window.customCards=window.customCards||[];window.customCards.find(s=>s.type===z)||window.customCards.push({type:z,name:"Voltie Charger",description:"Control and monitor a Voltie EV charger",preview:!0,documentationURL:"https://github.com/voltie-eu/homeassistant-voltie_charger"});console.info(`%c VOLTIE-CHARGER-CARD %c v${bt} `,"color:white;background:#09bca6;font-weight:700;padding:2px 6px;border-radius:3px 0 0 3px;","color:#09bca6;background:#222;padding:2px 6px;border-radius:0 3px 3px 0;");
