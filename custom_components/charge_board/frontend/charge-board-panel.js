var ee=globalThis,te=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,he=Symbol(),Le=new WeakMap,j=class{constructor(s,e,t){if(this._$cssResult$=!0,t!==he)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=e}get styleSheet(){let s=this.o,e=this.t;if(te&&s===void 0){let t=e!==void 0&&e.length===1;t&&(s=Le.get(e)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),t&&Le.set(e,s))}return s}toString(){return this.cssText}},Ue=i=>new j(typeof i=="string"?i:i+"",void 0,he),$=(i,...s)=>{let e=i.length===1?i[0]:s.reduce((t,r,n)=>t+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new j(e,i,he)},Ne=(i,s)=>{if(te)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of s){let t=document.createElement("style"),r=ee.litNonce;r!==void 0&&t.setAttribute("nonce",r),t.textContent=e.cssText,i.appendChild(t)}},de=te?i=>i:i=>i instanceof CSSStyleSheet?(s=>{let e="";for(let t of s.cssRules)e+=t.cssText;return Ue(e)})(i):i;var{is:xt,defineProperty:kt,getOwnPropertyDescriptor:wt,getOwnPropertyNames:St,getOwnPropertySymbols:At,getPrototypeOf:Ct}=Object,se=globalThis,Ve=se.trustedTypes,Et=Ve?Ve.emptyScript:"",Ot=se.reactiveElementPolyfillSupport,q=(i,s)=>i,pe={toAttribute(i,s){switch(s){case Boolean:i=i?Et:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,s){let e=i;switch(s){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ke=(i,s)=>!xt(i,s),ze={attribute:!0,type:String,converter:pe,reflect:!1,useDefault:!1,hasChanged:Ke};Symbol.metadata??=Symbol("metadata"),se.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(s){this._$Ei(),(this.l??=[]).push(s)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(s,e=ze){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(s)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(s,e),!e.noAccessor){let t=Symbol(),r=this.getPropertyDescriptor(s,t,e);r!==void 0&&kt(this.prototype,s,r)}}static getPropertyDescriptor(s,e,t){let{get:r,set:n}=wt(this.prototype,s)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){let a=r?.call(this);n?.call(this,o),this.requestUpdate(s,a,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(s){return this.elementProperties.get(s)??ze}static _$Ei(){if(this.hasOwnProperty(q("elementProperties")))return;let s=Ct(this);s.finalize(),s.l!==void 0&&(this.l=[...s.l]),this.elementProperties=new Map(s.elementProperties)}static finalize(){if(this.hasOwnProperty(q("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(q("properties"))){let e=this.properties,t=[...St(e),...At(e)];for(let r of t)this.createProperty(r,e[r])}let s=this[Symbol.metadata];if(s!==null){let e=litPropertyMetadata.get(s);if(e!==void 0)for(let[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let r=this._$Eu(e,t);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){let e=[];if(Array.isArray(s)){let t=new Set(s.flat(1/0).reverse());for(let r of t)e.unshift(de(r))}else s!==void 0&&e.push(de(s));return e}static _$Eu(s,e){let t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof s=="string"?s.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(s=>s(this))}addController(s){(this._$EO??=new Set).add(s),this.renderRoot!==void 0&&this.isConnected&&s.hostConnected?.()}removeController(s){this._$EO?.delete(s)}_$E_(){let s=new Map,e=this.constructor.elementProperties;for(let t of e.keys())this.hasOwnProperty(t)&&(s.set(t,this[t]),delete this[t]);s.size>0&&(this._$Ep=s)}createRenderRoot(){let s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(s=>s.hostConnected?.())}enableUpdating(s){}disconnectedCallback(){this._$EO?.forEach(s=>s.hostDisconnected?.())}attributeChangedCallback(s,e,t){this._$AK(s,t)}_$ET(s,e){let t=this.constructor.elementProperties.get(s),r=this.constructor._$Eu(s,t);if(r!==void 0&&t.reflect===!0){let n=(t.converter?.toAttribute!==void 0?t.converter:pe).toAttribute(e,t.type);this._$Em=s,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(s,e){let t=this.constructor,r=t._$Eh.get(s);if(r!==void 0&&this._$Em!==r){let n=t.getPropertyOptions(r),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:pe;this._$Em=r;let a=o.fromAttribute(e,n.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(s,e,t,r=!1,n){if(s!==void 0){let o=this.constructor;if(r===!1&&(n=this[s]),t??=o.getPropertyOptions(s),!((t.hasChanged??Ke)(n,e)||t.useDefault&&t.reflect&&n===this._$Ej?.get(s)&&!this.hasAttribute(o._$Eu(s,t))))return;this.C(s,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(s,e,{useDefault:t,reflect:r,wrapped:n},o){t&&!(this._$Ej??=new Map).has(s)&&(this._$Ej.set(s,o??e??this[s]),n!==!0||o!==void 0)||(this._$AL.has(s)||(this.hasUpdated||t||(e=void 0),this._$AL.set(s,e)),r===!0&&this._$Em!==s&&(this._$Eq??=new Set).add(s))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let s=this.scheduleUpdate();return s!=null&&await s,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[r,n]of t){let{wrapped:o}=n,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let s=!1,e=this._$AL;try{s=this.shouldUpdate(e),s?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(t){throw s=!1,this._$EM(),t}s&&this._$AE(e)}willUpdate(s){}_$AE(s){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(s)),this.updated(s)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(s){return!0}update(s){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(s){}firstUpdated(s){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[q("elementProperties")]=new Map,A[q("finalized")]=new Map,Ot?.({ReactiveElement:A}),(se.reactiveElementVersions??=[]).push("2.1.2");var be=globalThis,Ie=i=>i,re=be.trustedTypes,je=re?re.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ze="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Ge="?"+E,Pt=`<${Ge}>`,L=document,B=()=>L.createComment(""),W=i=>i===null||typeof i!="object"&&typeof i!="function",$e=Array.isArray,Ht=i=>$e(i)||typeof i?.[Symbol.iterator]=="function",ue=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qe=/-->/g,Fe=/>/g,T=RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Be=/'/g,We=/"/g,Je=/^(?:script|style|textarea|title)$/i,ye=i=>(s,...e)=>({_$litType$:i,strings:s,values:e}),l=ye(1),O=ye(2),Wt=ye(3),U=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ye=new WeakMap,R=L.createTreeWalker(L,129);function Xe(i,s){if(!$e(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return je!==void 0?je.createHTML(s):s}var Mt=(i,s)=>{let e=i.length-1,t=[],r,n=s===2?"<svg>":s===3?"<math>":"",o=F;for(let a=0;a<e;a++){let c=i[a],d,u,h=-1,m=0;for(;m<c.length&&(o.lastIndex=m,u=o.exec(c),u!==null);)m=o.lastIndex,o===F?u[1]==="!--"?o=qe:u[1]!==void 0?o=Fe:u[2]!==void 0?(Je.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=T):u[3]!==void 0&&(o=T):o===T?u[0]===">"?(o=r??F,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?T:u[3]==='"'?We:Be):o===We||o===Be?o=T:o===qe||o===Fe?o=F:(o=T,r=void 0);let g=o===T&&i[a+1].startsWith("/>")?" ":"";n+=o===F?c+Pt:h>=0?(t.push(d),c.slice(0,h)+Ze+c.slice(h)+E+g):c+E+(h===-2?a:g)}return[Xe(i,n+(i[e]||"<?>")+(s===2?"</svg>":s===3?"</math>":"")),t]},Y=class i{constructor({strings:s,_$litType$:e},t){let r;this.parts=[];let n=0,o=0,a=s.length-1,c=this.parts,[d,u]=Mt(s,e);if(this.el=i.createElement(d,t),R.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=R.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(Ze)){let m=u[o++],g=r.getAttribute(h).split(E),S=/([.?@])?(.*)/.exec(m);c.push({type:1,index:n,name:S[2],strings:g,ctor:S[1]==="."?me:S[1]==="?"?ge:S[1]==="@"?fe:z}),r.removeAttribute(h)}else h.startsWith(E)&&(c.push({type:6,index:n}),r.removeAttribute(h));if(Je.test(r.tagName)){let h=r.textContent.split(E),m=h.length-1;if(m>0){r.textContent=re?re.emptyScript:"";for(let g=0;g<m;g++)r.append(h[g],B()),R.nextNode(),c.push({type:2,index:++n});r.append(h[m],B())}}}else if(r.nodeType===8)if(r.data===Ge)c.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(E,h+1))!==-1;)c.push({type:7,index:n}),h+=E.length-1}n++}}static createElement(s,e){let t=L.createElement("template");return t.innerHTML=s,t}};function V(i,s,e=i,t){if(s===U)return s;let r=t!==void 0?e._$Co?.[t]:e._$Cl,n=W(s)?void 0:s._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,t)),t!==void 0?(e._$Co??=[])[t]=r:e._$Cl=r),r!==void 0&&(s=V(i,r._$AS(i,s.values),r,t)),s}var _e=class{constructor(s,e){this._$AV=[],this._$AN=void 0,this._$AD=s,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(s){let{el:{content:e},parts:t}=this._$AD,r=(s?.creationScope??L).importNode(e,!0);R.currentNode=r;let n=R.nextNode(),o=0,a=0,c=t[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new Z(n,n.nextSibling,this,s):c.type===1?d=new c.ctor(n,c.name,c.strings,this,s):c.type===6&&(d=new ve(n,this,s)),this._$AV.push(d),c=t[++a]}o!==c?.index&&(n=R.nextNode(),o++)}return R.currentNode=L,r}p(s){let e=0;for(let t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(s,t,e),e+=t.strings.length-2):t._$AI(s[e])),e++}},Z=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(s,e,t,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=s,this._$AB=e,this._$AM=t,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let s=this._$AA.parentNode,e=this._$AM;return e!==void 0&&s?.nodeType===11&&(s=e.parentNode),s}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(s,e=this){s=V(this,s,e),W(s)?s===p||s==null||s===""?(this._$AH!==p&&this._$AR(),this._$AH=p):s!==this._$AH&&s!==U&&this._(s):s._$litType$!==void 0?this.$(s):s.nodeType!==void 0?this.T(s):Ht(s)?this.k(s):this._(s)}O(s){return this._$AA.parentNode.insertBefore(s,this._$AB)}T(s){this._$AH!==s&&(this._$AR(),this._$AH=this.O(s))}_(s){this._$AH!==p&&W(this._$AH)?this._$AA.nextSibling.data=s:this.T(L.createTextNode(s)),this._$AH=s}$(s){let{values:e,_$litType$:t}=s,r=typeof t=="number"?this._$AC(s):(t.el===void 0&&(t.el=Y.createElement(Xe(t.h,t.h[0]),this.options)),t);if(this._$AH?._$AD===r)this._$AH.p(e);else{let n=new _e(r,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(s){let e=Ye.get(s.strings);return e===void 0&&Ye.set(s.strings,e=new Y(s)),e}k(s){$e(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,t,r=0;for(let n of s)r===e.length?e.push(t=new i(this.O(B()),this.O(B()),this,this.options)):t=e[r],t._$AI(n),r++;r<e.length&&(this._$AR(t&&t._$AB.nextSibling,r),e.length=r)}_$AR(s=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);s!==this._$AB;){let t=Ie(s).nextSibling;Ie(s).remove(),s=t}}setConnected(s){this._$AM===void 0&&(this._$Cv=s,this._$AP?.(s))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(s,e,t,r,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=s,this.name=e,this._$AM=r,this.options=n,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=p}_$AI(s,e=this,t,r){let n=this.strings,o=!1;if(n===void 0)s=V(this,s,e,0),o=!W(s)||s!==this._$AH&&s!==U,o&&(this._$AH=s);else{let a=s,c,d;for(s=n[0],c=0;c<n.length-1;c++)d=V(this,a[t+c],e,c),d===U&&(d=this._$AH[c]),o||=!W(d)||d!==this._$AH[c],d===p?s=p:s!==p&&(s+=(d??"")+n[c+1]),this._$AH[c]=d}o&&!r&&this.j(s)}j(s){s===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,s??"")}},me=class extends z{constructor(){super(...arguments),this.type=3}j(s){this.element[this.name]=s===p?void 0:s}},ge=class extends z{constructor(){super(...arguments),this.type=4}j(s){this.element.toggleAttribute(this.name,!!s&&s!==p)}},fe=class extends z{constructor(s,e,t,r,n){super(s,e,t,r,n),this.type=5}_$AI(s,e=this){if((s=V(this,s,e,0)??p)===U)return;let t=this._$AH,r=s===p&&t!==p||s.capture!==t.capture||s.once!==t.once||s.passive!==t.passive,n=s!==p&&(t===p||r);r&&this.element.removeEventListener(this.name,this,t),n&&this.element.addEventListener(this.name,this,s),this._$AH=s}handleEvent(s){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,s):this._$AH.handleEvent(s)}},ve=class{constructor(s,e,t){this.element=s,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(s){V(this,s)}};var Dt=be.litHtmlPolyfillSupport;Dt?.(Y,Z),(be.litHtmlVersions??=[]).push("3.3.3");var Qe=(i,s,e)=>{let t=e?.renderBefore??s,r=t._$litPart$;if(r===void 0){let n=e?.renderBefore??null;t._$litPart$=r=new Z(s.insertBefore(B(),n),n,void 0,e??{})}return r._$AI(i),r};var xe=globalThis,f=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let s=super.createRenderRoot();return this.renderOptions.renderBefore??=s.firstChild,s}update(s){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(s),this._$Do=Qe(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};f._$litElement$=!0,f.finalized=!0,xe.litElementHydrateSupport?.({LitElement:f});var Tt=xe.litElementPolyfillSupport;Tt?.({LitElement:f});(xe.litElementVersions??=[]).push("4.2.2");var C=(i,s,e={})=>i.connection.sendMessagePromise({type:`charge_board/${s}`,...e}),P=i=>C(i,"overview"),ie=(i,s={})=>C(i,"sessions",{...s}),et=(i,s)=>C(i,"session",{session_id:s}),tt=(i,s,e)=>C(i,"set_vehicle",{session_id:s,vehicle_id:e}),st=(i,s)=>C(i,"delete",{session_id:s}),ke=(i,s,e)=>C(i,"merge",{session_id:s,other_id:e}),rt=(i,s,e)=>C(i,"split",{session_id:s,at:e}),it=(i,s,e)=>C(i,"stats",{year:s,...e&&{vehicle_id:e}}),nt=(i,s)=>C(i,"vehicle",{vehicle_id:s});async function ot(i,s,e,t){return((await i.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:new Date(e*1e3).toISOString(),end_time:new Date(t*1e3).toISOString(),statistic_ids:[s],period:"hour",types:["mean"]}))[s]??[]).filter(n=>n.mean!=null).map(n=>({t:(typeof n.start=="number"?n.start:Date.parse(n.start))/1e3,v:n.mean}))}var at=(i,s)=>i.connection.subscribeMessage(s,{type:"charge_board/subscribe"});var Rt={title:"EVChargeData",tab_overview:"Aper\xE7u",tab_sessions:"Sessions",loading:"Chargement\u2026",error:"Impossible de charger les donn\xE9es",not_loaded:"EVChargeData n'est pas charg\xE9",no_chargers:"Aucun chargeur configur\xE9. Ajoutez-en un dans les param\xE8tres de l'int\xE9gration EVChargeData.",charging:"En charge",plugged:"Branch\xE9",free:"Libre",power:"puissance",session:"session",cost:"co\xFBt",end:"fin estim\xE9e",end_short:"fin {time}",plugged_since:"Branch\xE9e depuis {time}",charging_since:"en charge depuis {time}",charge_started:"d\xE9but de charge {time}",off_peak:"{share} heures creuses",last_session:"Derni\xE8re session : {summary}",no_session:"Aucune session enregistr\xE9e",no_vehicle:"aucun v\xE9hicule",menu:"Menu",close:"Fermer",all_vehicles:"Tous les v\xE9hicules",all_chargers:"Tous les chargeurs",month:"Mois",sessions_count:"{n} sessions",off_peak_short:"{share} HC",col_start:"D\xE9but",col_end:"Fin",col_vehicle:"V\xE9hicule",col_battery:"Batterie",col_kwh:"kWh",col_duration:"Dur\xE9e de charge",col_cost:"Co\xFBt",edited:"modifi\xE9e",estimated_note:"* co\xFBt estim\xE9",unpriced_note:"\u2265 : {n} session(s) sans prix",no_sessions:"Aucune session pour ces filtres",back:"Retour",session_of:"Session du {day}",energy:"\xE9nergie",battery:"batterie",average:"moyenne",chart_hint:"Touchez le graphique pour choisir o\xF9 couper la session.",plugged_at:"Branch\xE9e",charge:"Charge",unplugged_at:"D\xE9branch\xE9e",off_peak_slice:"Heures creuses",peak_slice:"Heures pleines",base:"Base",price_slice:"{price} /kWh",unknown_price:"Prix inconnu",charging_time:"Temps de charge",plugged_time:"{time} branch\xE9e",vehicle:"V\xE9hicule",delete:"Supprimer",merge_prev:"Fusionner avec la pr\xE9c\xE9dente",merge_next:"Fusionner avec la suivante",split:"Couper",confirm_delete:"Supprimer d\xE9finitivement cette session ?",confirm_split:"Couper la session \xE0 {time} ?",confirm:"Confirmer",cancel:"Annuler",in_progress_note:"Session en cours : corrections impossibles.",err_invalid:"Correction refus\xE9e : op\xE9ration invalide pour cette session.",err_in_progress:"Correction refus\xE9e : la session est encore en cours.",err_not_found:"Cette session n'existe plus.",tab_vehicles:"V\xE9hicules",tab_stats:"Statistiques",year:"Ann\xE9e",current_month:"{month} (en cours)",vs_prev:"vs mois pr\xE9c\xE9dent",last_30_days:"30 derniers jours",vs_prev_30:"vs 30 jours pr\xE9c\xE9dents",sessions_n:"{n} sessions",off_peak_label:"heures creuses",per_100km:"aux 100 km",km_n:"{km} km",vs_petrol:"vs essence",petrol_ref:"{l100} L/100 \xB7 {price}/L",cost_by_month:"Co\xFBt par mois",col_month:"Mois",col_sessions:"Sessions",col_hc:"HC",col_km:"km",col_per_100:"\u20AC/100 km",col_vs_petrol:"vs essence",col_kwh_100:"kWh/100 km",total_year:"Total {year}",km_note:"* km partiels : le compteur n'est suivi que depuis une partie du mois.",stats_settings_note:"Kilom\xE9trage et consommation essence de r\xE9f\xE9rence dans la fiche du v\xE9hicule ; prix de l'essence dans les options de EVChargeData.",no_vehicles:"Aucun v\xE9hicule configur\xE9.",battery_now:"batterie",target_n:"objectif {n} %",consumption_30d:"aux 100 km (30 j)",odometer:"compteur",autonomy:"autonomie estim\xE9e",battery_30d:"Batterie sur 30 jours",recharges:"recharges",consumption_by_month:"Consommation par mois (\xE9nergie recharg\xE9e \xF7 km)",consumption_since:"Depuis la derni\xE8re recharge : {value} kWh/100 km (c\xF4t\xE9 batterie)",configuration:"Configuration",edit:"Modifier",cfg_soc_entity:"Batterie",cfg_target:"Objectif",cfg_odometer_entity:"Kilom\xE9trage",cfg_fuel_price:"Prix de l'essence",cfg_fuel_l100:"Essence de r\xE9f\xE9rence",cfg_capacity:"Capacit\xE9",target_vehicle:"fix\xE9 par le v\xE9hicule",target_home:"maison : EVChargeData coupe la charge",cut_ignored:"Objectif maison sans effet : aucun chargeur n'a \xE0 la fois une entit\xE9 de branchement et un interrupteur.",fixed_value:"valeur fixe"},Lt={title:"EVChargeData",tab_overview:"Overview",tab_sessions:"Sessions",loading:"Loading\u2026",error:"Could not load the data",not_loaded:"EVChargeData is not loaded",no_chargers:"No charger configured. Add one in the EVChargeData integration settings.",charging:"Charging",plugged:"Plugged in",free:"Free",power:"power",session:"session",cost:"cost",end:"estimated end",end_short:"end {time}",plugged_since:"Plugged in since {time}",charging_since:"charging since {time}",charge_started:"charge started {time}",off_peak:"{share} off-peak",last_session:"Last session: {summary}",no_session:"No session recorded",no_vehicle:"no vehicle",menu:"Menu",close:"Close",all_vehicles:"All vehicles",all_chargers:"All chargers",month:"Month",sessions_count:"{n} sessions",off_peak_short:"{share} off-peak",col_start:"Start",col_end:"End",col_vehicle:"Vehicle",col_battery:"Battery",col_kwh:"kWh",col_duration:"Charging time",col_cost:"Cost",edited:"edited",estimated_note:"* estimated cost",unpriced_note:"\u2265: {n} session(s) without a price",no_sessions:"No session for these filters",back:"Back",session_of:"Session of {day}",energy:"energy",battery:"battery",average:"average",chart_hint:"Tap the chart to choose where to split the session.",plugged_at:"Plugged in",charge:"Charge",unplugged_at:"Unplugged",off_peak_slice:"Off-peak",peak_slice:"Peak",base:"Base",price_slice:"{price} /kWh",unknown_price:"Unknown price",charging_time:"Charging time",plugged_time:"{time} plugged in",vehicle:"Vehicle",delete:"Delete",merge_prev:"Merge with previous",merge_next:"Merge with next",split:"Split",confirm_delete:"Delete this session permanently?",confirm_split:"Split the session at {time}?",confirm:"Confirm",cancel:"Cancel",in_progress_note:"Session in progress: no corrections.",err_invalid:"Correction refused: invalid operation for this session.",err_in_progress:"Correction refused: the session is still in progress.",err_not_found:"This session no longer exists.",tab_vehicles:"Vehicles",tab_stats:"Statistics",year:"Year",current_month:"{month} (in progress)",vs_prev:"vs previous month",last_30_days:"Last 30 days",vs_prev_30:"vs previous 30 days",sessions_n:"{n} sessions",off_peak_label:"off-peak",per_100km:"per 100 km",km_n:"{km} km",vs_petrol:"vs petrol",petrol_ref:"{l100} L/100 \xB7 {price}/L",cost_by_month:"Cost per month",col_month:"Month",col_sessions:"Sessions",col_hc:"Off-peak",col_km:"km",col_per_100:"/100 km",col_vs_petrol:"vs petrol",col_kwh_100:"kWh/100 km",total_year:"Total {year}",km_note:"* partial km: the odometer is tracked for part of the month only.",stats_settings_note:"Odometer and reference petrol consumption in the vehicle settings; petrol price in the EVChargeData options.",no_vehicles:"No vehicle configured.",battery_now:"battery",target_n:"target {n}%",consumption_30d:"per 100 km (30 d)",odometer:"odometer",autonomy:"estimated range",battery_30d:"Battery over 30 days",recharges:"charges",consumption_by_month:"Consumption per month (energy charged \xF7 km)",consumption_since:"Since the last charge: {value} kWh/100 km (battery side)",configuration:"Settings",edit:"Edit",cfg_soc_entity:"Battery",cfg_target:"Target",cfg_odometer_entity:"Odometer",cfg_fuel_price:"Petrol price",cfg_fuel_l100:"Reference petrol car",cfg_capacity:"Capacity",target_vehicle:"set by the vehicle",target_home:"home: EVChargeData stops the charge",cut_ignored:"Home target has no effect: no charger has both a plug entity and a switch.",fixed_value:"fixed value"},Ut={fr:Rt,en:Lt},y=i=>i.language?.startsWith("fr")?"fr":"en",v=i=>i.locale?.language??i.language??"en";function x(i,s,e={}){return Ut[i][s].replace(/\{(\w+)\}/g,(t,r)=>e[r]??"")}function w(i){let s=i?.code;return s==="not_loaded"?"not_loaded":s==="invalid"||s==="in_progress"||s==="not_found"?`err_${s}`:"error"}var we=i=>i.replace(/[  ]/g," "),ct=(i,s,e)=>we(i.toLocaleString(s,{minimumFractionDigits:e,maximumFractionDigits:e}));function k(i,s){return i==null?"\u2014":`${ct(i,s,1)} kWh`}function K(i,s){return i==null?"\u2014":`${ct(i/1e3,s,1)} kW`}function b(i,s,e){return i==null?"\u2014":we(new Intl.NumberFormat(e,{style:"currency",currency:s}).format(i))}function G(i,s){let e=Math.round(i/60),t=Math.floor(e/60),r=e%60;if(t===0)return`${r} min`;let n=String(r).padStart(2,"0");return s==="fr"?`${t} h ${n}`:`${t} h ${n} min`}function I(i,s){if(i==null&&s==null)return"\u2014";let e=t=>t==null?"\u2014":String(Math.round(t));return`${e(i)} \u2192 ${e(s)} %`}function M(i,s){return we(i.toLocaleString(s,{style:"percent",maximumFractionDigits:0}))}var ne=(i,s,e,t)=>new Intl.DateTimeFormat(s,{timeZone:e,...t}).format(new Date(i*1e3));function N(i,s,e){return ne(i,s,e,{hour:"2-digit",minute:"2-digit"})}function H(i,s,e){return ne(i,s,e,{day:"2-digit",month:"2-digit"})}function J(i,s,e,t=Date.now()/1e3){let r=N(i,s,e),n=H(i,s,e);return n===H(t,s,e)?r:`${n} ${r}`}function oe(i,s,e){return`${ne(i,s,e,{weekday:"short"})} ${H(i,s,e)} ${N(i,s,e)}`}function X(i,s){return ne(i,"en-CA",s,{year:"numeric",month:"2-digit"})}function lt(i,s){return`${i<0?"\u25BC":"\u25B2"} ${M(Math.abs(i),s)}`}var ht={charging:"var(--success-color, #43a047)",plugged:"var(--info-color, #039be5)",free:"var(--disabled-text-color, #9e9e9e)"},Se=class extends f{constructor(){super(...arguments);this.version=0;this._req=0}static{this.properties={hass:{attribute:!1},version:{type:Number},_data:{state:!0},_error:{state:!0},_open:{state:!0}}}updated(e){e.has("version")&&this.hass&&this._fetch(),e.has("_open")&&this._open&&this.renderRoot.querySelector("dialog")?.showModal()}async _fetch(){let e=++this._req;try{let t=await P(this.hass);if(e!==this._req)return;this._data=t,this._error=void 0}catch(t){e===this._req&&(this._error=w(t))}}_t(e,t){return x(y(this.hass),e,t)}render(){if(this._error)return l`<p class="message">${this._t(this._error)}</p>`;if(!this._data)return l`<p class="message">${this._t("loading")}</p>`;let{chargers:e,style:t}=this._data;if(!e.length)return l`<p class="message">${this._t("no_chargers")}</p>`;if(t!=="compact")return l`<div class="grid">${e.map(n=>this._card(n))}</div>`;let r=e.find(n=>n.id===this._open);return l`
      <div class="grid compact">${e.map(n=>this._tile(n))}</div>
      ${r?l`<dialog @close=${()=>this._open=void 0} @click=${this._backdropClose}>
            <div class="dialog-bar">
              <button aria-label=${this._t("close")} @click=${this._close}>×</button>
            </div>
            ${this._card(r)}
          </dialog>`:p}
    `}_backdropClose(e){e.target===e.currentTarget&&this._close()}_close(){this.renderRoot.querySelector("dialog")?.close()}get _fmt(){let e=v(this.hass),t=this.hass.config.time_zone;return{locale:e,when:r=>J(r,e,t),time:r=>N(r,e,t),day:r=>H(r,e,t),cost:r=>b(r,this._data.currency,e)}}_stateLabel(e){return this._t(e.state)}_idle(e){return e.state==="free"&&!e.session}_card(e){let t=this._fmt,r=e.session,n=e.vehicle?.soc??null,o=r?[r.plugged_at!=null?this._t("plugged_since",{time:t.when(r.plugged_at)}):null,r.charge_start!=null?this._t(e.state==="charging"?"charging_since":"charge_started",{time:t.when(r.charge_start)}):null,r.has_off_peak_source&&r.energy_kwh>0?this._t("off_peak",{share:M(r.off_peak.kwh/r.energy_kwh,t.locale)}):null].filter(Boolean):[];return l`
      <ha-card class="card" style="--state:${ht[e.state]}">
        <div class="head">
          <span class="name"><ha-icon icon="mdi:ev-station"></ha-icon>${e.name}</span>
          <span class="state">${this._stateLabel(e)}</span>
        </div>
        ${this._idle(e)?l`<div class="muted">${this._lastSession(e)}</div>`:l`
              <div class="vehicle">
                <ha-icon icon="mdi:car-electric"></ha-icon>
                <b>${e.vehicle?.name??"\u2014"}</b> ·
                ${n==null?"\u2014":I(n,e.vehicle?.target)}
              </div>
              ${n==null?p:l`<div class="bar"><div style="width:${Math.min(100,Math.max(0,n))}%"></div></div>`}
              <div class="stats">
                ${this._stat(K(e.power_w,t.locale),"power")}
                ${this._stat(k(r?.energy_kwh,t.locale),"session")}
                ${this._stat(t.cost(r?.cost),"cost")}
                ${e.estimated_end==null?p:this._stat(t.time(e.estimated_end),"end")}
              </div>
              ${o.length?l`<div class="muted">${o.join(" \xB7 ")}</div>`:p}
            `}
      </ha-card>
    `}_stat(e,t){return l`<div><div class="value">${e}</div><div class="muted">${this._t(t)}</div></div>`}_lastSession(e){let t=e.last_session;if(!t)return this._t("no_session");let r=this._fmt,n=t.charge_start??t.plugged_at,o=[t.vehicle_name??"\u2014",n!=null?r.day(n):null,k(t.energy_kwh,r.locale),r.cost(t.cost)].filter(Boolean);return this._t("last_session",{summary:o.join(" \xB7 ")})}_tile(e){let t=this._fmt,r=this._idle(e)?null:e.vehicle?.soc??null,n=r==null?"0":String(Math.min(100,Math.max(0,r))),o=this._idle(e)?this._t("free").toLowerCase():r==null?"\u2014":`${Math.round(r)} %`,a=[K(e.power_w,t.locale),t.cost(e.session?.cost),e.estimated_end==null?null:this._t("end_short",{time:t.time(e.estimated_end)})].filter(Boolean);return l`
      <ha-card class="tile" style="--state:${ht[e.state]}">
        <button @click=${()=>this._open=e.id}>
          <div class="gauge" style="--soc:${n}%"><span>${o}</span></div>
          <b>${e.name}</b>
          ${this._idle(e)?l`<div class="muted">${this._t("no_vehicle")}</div>`:l`
                <div>${e.vehicle?.name??"\u2014"} · ${this._stateLabel(e).toLowerCase()}</div>
                <div class="muted">${a.join(" \xB7 ")}</div>
              `}
        </button>
      </ha-card>
    `}static{this.styles=$`
    :host {
      display: block;
      padding: 16px;
    }
    .message {
      color: var(--secondary-text-color);
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .grid.compact {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    @media (max-width: 600px) {
      :host {
        padding: 8px;
      }
      .grid,
      .grid.compact {
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }
    ha-card {
      display: block;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .card {
      padding: 16px;
      border-left: 5px solid var(--state);
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }
    .name,
    .vehicle {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .state {
      color: var(--state);
      white-space: nowrap;
    }
    .state::before {
      content: "● ";
    }
    .vehicle {
      margin: 12px 0 6px;
    }
    ha-icon {
      --mdc-icon-size: 20px;
      color: var(--secondary-text-color);
    }
    .bar {
      height: 10px;
      border-radius: 5px;
      background: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }
    .bar > div {
      height: 100%;
      background: var(--state);
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
      gap: 8px;
      margin: 12px 0 8px;
      text-align: center;
    }
    .value {
      font-size: 1.15em;
      font-weight: 600;
      white-space: nowrap;
    }
    .muted {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      margin-top: 4px;
    }
    .tile > button {
      all: unset;
      box-sizing: border-box;
      display: block;
      width: 100%;
      padding: 16px;
      text-align: center;
      cursor: pointer;
      border-radius: inherit;
    }
    .tile > button:focus-visible {
      outline: 2px solid var(--primary-color);
    }
    .gauge {
      width: 72px;
      height: 72px;
      margin: 0 auto 8px;
      border-radius: 50%;
      background: conic-gradient(var(--state) var(--soc), var(--divider-color, #e0e0e0) 0);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .gauge span {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--card-background-color, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
    dialog {
      border: none;
      padding: 0;
      width: min(480px, calc(100vw - 32px));
      background: transparent;
      color: var(--primary-text-color);
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
    }
    .dialog-bar {
      text-align: right;
    }
    .dialog-bar button {
      all: unset;
      cursor: pointer;
      font-size: 28px;
      line-height: 1;
      padding: 4px 8px;
      color: #fff;
    }
  `}};customElements.define("charge-board-overview",Se);var Nt={bleu:{hc:"#88c2e3",hp:"#1999e2",rank:0},blanc:{hc:"#8f8f8f",hp:"#e0e0e0",rank:1},rouge:{hc:"#e38888",hp:"#e42323",rank:2}},Vt={blue:"bleu",white:"blanc",red:"rouge"},Ae=i=>{let s=i.lastIndexOf("|");return{day:i.slice(0,s),part:i.slice(s+1)}},dt=i=>Nt[Vt[i.toLowerCase()]??i.toLowerCase()];function zt(i){let s=0;for(let e of i)s=(s*31+e.charCodeAt(0))%360;return s}function Ce(i){let{day:s,part:e}=Ae(i);if(!s)return e==="hc"?"var(--info-color, #3b82f6)":e==="hp"?"var(--warning-color, #f59e0b)":"var(--primary-color, #03a9f4)";let t=dt(s);return t?e==="hc"?t.hc:t.hp:`hsl(${zt(s)} 60% ${e==="hc"?70:42}%)`}function ae(i){let s=e=>{let{day:t,part:r}=Ae(e),n=t?dt(t):void 0;return[n?n.rank:t?3:4,t,r==="hc"?0:r==="hp"?1:2]};return[...i].sort((e,t)=>{let[r,n,o]=s(e),[a,c,d]=s(t);return r-a||n.localeCompare(c)||o-d})}function pt(i,s){let{day:e,part:t}=Ae(i);return e?t?`${e} ${t.toUpperCase()}`:e:s(t==="hc"?"off_peak_slice":t==="hp"?"peak_slice":"base")}function ut(i,s,e,t){return e+Math.min(Math.max(i,0),s)/s*(t-e)}var Kt=360,_t=(i,s,e)=>Math.max(Math.min(s+1<i.length?i[s+1].t:e,i[s].t+Kt),i[s].t),D=i=>Math.round(i*10)/10;function mt(i,s,e,t=i[0]?.t??0,r=i[i.length-1]?.t??0){if(!i.length)return"";let n=Math.max(...i.map(u=>u.w),1),o=r-t||1,a=u=>D((u-t)/o*s),c=u=>D(e-Math.max(u,0)/n*e);return i.map((u,h)=>{let m=_t(i,h,r),g=h+1<i.length?i[h+1].t:r,S=`${h?"L":"M"}${a(u.t)} ${c(u.w)} L${a(m)} ${c(u.w)}`;return m<g?`${S} L${a(m)} ${c(0)} L${a(g)} ${c(0)}`:S}).join(" ")}function gt(i,s){let e=[];return i.forEach((t,r)=>{if(!t.off_peak)return;let n=_t(i,r,s),o=e[e.length-1];o&&o.to===t.t?o.to=n:e.push({from:t.t,to:n})}),e}function ft(i,s){let e=n=>Object.values(n.band_cost).reduce((o,a)=>o+a,0),t=Math.max(...i.map(e),0)||1,r=100/(i.length||1);return i.map((n,o)=>{let a=s,c=ae(Object.keys(n.band_cost).filter(d=>n.band_cost[d]>0)).map(d=>{let u=n.band_cost[d]/t*s;return a-=u,{key:d,y:D(a),h:D(u)}});return{x:D(o*r+r*.15),w:D(r*.7),parts:c}})}function vt(i,s,e,t,r,n=100){if(!i.length)return"";let o=r-t||1;return i.map((a,c)=>`${c?"L":"M"}${D((a.t-t)/o*s)} ${D(e-a.v/n*e)}`).join(" ")}var ce=600,Q=160,Ee=class extends f{constructor(){super(...arguments);this.version=0;this.currency="EUR";this.vehicles=[];this._busy=!1;this._req=0}static{this.properties={hass:{attribute:!1},sessionId:{attribute:!1},version:{type:Number},currency:{attribute:!1},vehicles:{attribute:!1},_s:{state:!0},_prev:{state:!0},_next:{state:!0},_pending:{state:!0},_busy:{state:!0}}}updated(e){e.has("sessionId")&&(this._s=void 0,this._pending=void 0),(e.has("sessionId")||e.has("version"))&&this.hass&&this._fetch()}async _fetch(){let e=++this._req;try{let t=await et(this.hass,this.sessionId),{sessions:r}=await ie(this.hass,{charger_id:t.charger_id});if(e!==this._req)return;let n=c=>c.charge_start??c.plugged_at??0,o=[...r].sort((c,d)=>n(c)-n(d)),a=o.findIndex(c=>c.id===t.id);this._prev=a>0?o[a-1].id:void 0,this._next=a>=0&&a+1<o.length?o[a+1].id:void 0,this._s=t}catch(t){e===this._req&&this._emit("session-changed",{id:void 0,error:w(t)})}}_emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}async _run(e){this._pending=void 0,this._busy=!0;try{let{sessions:t}=await e();this._emit("session-changed",{id:t[0]}),t[0]===this.sessionId&&this._fetch()}catch(t){let r=w(t);this._emit("session-changed",{id:r==="err_not_found"?void 0:this.sessionId,error:r}),this._fetch()}finally{this._busy=!1}}_t(e,t){return x(y(this.hass),e,t)}get _range(){let e=this._s,t=e.charge_start??e.curve[0]?.t??0;return{start:t,end:Math.max(e.charge_end??t,t+1)}}_chartClick(e){if(this._s.open)return;let r=e.currentTarget.getBoundingClientRect(),{start:n,end:o}=this._range,a=Math.round(ut(e.clientX-r.left,r.width,n,o));n<a&&a<o&&(this._pending={kind:"split",at:a})}render(){if(!this._s)return l`<div class="card"><p class="muted">${this._t("loading")}</p></div>`;let e=this._s,t=v(this.hass),r=this.hass.config.time_zone,n=e.charge_start??void 0,o=m=>m==null?"\u2014":J(m,t,r,n),a=m=>b(m,this.currency,t),c=e.charging_s>0?e.energy_kwh*36e5/e.charging_s:null,d=e.plugged_at!=null&&e.unplugged_at!=null?e.unplugged_at-e.plugged_at:null,u=y(this.hass),h=[e.charge_start!=null?this._t("session_of",{day:oe(e.charge_start,t,r)}):null,e.vehicle_name,e.charger_name].filter(Boolean);return l`
      <div class="card">
        <button class="back" @click=${()=>this._emit("back")}>← ${this._t("back")}</button>
        <div class="head">
          <b>${h.join(" \xB7 ")}</b>
          ${e.edited?l`<span class="badge">${this._t("edited")}</span>`:p}
        </div>
        <div class="figures">
          ${this._figure(k(e.energy_kwh,t),"energy")}
          ${this._figure(`${a(e.cost)}${e.estimated?" *":""}`,"cost")}
          ${this._figure(I(e.soc_start,e.soc_end),"battery")}
          ${this._figure(K(c,t),"average")}
        </div>
        ${this._chart()}
        <table class="facts">
          <tr><td>${this._t("plugged_at")}</td><td>${o(e.plugged_at)}</td></tr>
          <tr><td>${this._t("charge")}</td><td>${o(e.charge_start)} → ${o(e.charge_end)}</td></tr>
          <tr><td>${this._t("unplugged_at")}</td><td>${o(e.unplugged_at)}</td></tr>
          ${this._slices(t).map(([m,g])=>l`<tr><td>${m}</td><td>${k(g.kwh,t)} · ${a(g.cost)}</td></tr>`)}
          <tr>
            <td>${this._t("charging_time")}</td>
            <td>
              ${G(e.charging_s,u)}
              ${d==null?p:l` / ${this._t("plugged_time",{time:G(d,u)})}`}
            </td>
          </tr>
        </table>
        ${e.open?l`<p class="muted">${this._t("in_progress_note")}</p>`:this._actions()}
      </div>
    `}_figure(e,t){return l`<div><div class="value">${e}</div><div class="muted">${this._t(t)}</div></div>`}_slices(e){let t=this._s;return t.has_off_peak_source?[[this._t("off_peak_slice"),t.off_peak],[this._t("peak_slice"),t.peak]]:Object.entries(t.by_price).map(([r,n])=>[r==="none"?this._t("unknown_price"):this._t("price_slice",{price:new Intl.NumberFormat(e,{style:"currency",currency:this.currency,maximumFractionDigits:4}).format(Number(r))}),n])}_chart(){let e=this._s,{start:t,end:r}=this._range,n=u=>(u-t)/(r-t)*ce,o=v(this.hass),a=this.hass.config.time_zone,c=Math.max(0,...e.curve.map(u=>u.w)),d=this._pending?.kind==="split"?this._pending.at:void 0;return l`
      <svg
        class="chart ${e.open?"":"clickable"}"
        viewBox="0 0 ${ce} ${Q}"
        preserveAspectRatio="none"
        role="img"
        @click=${this._chartClick}
      >
        ${e.has_off_peak_source?O`<rect class="peak" x="0" y="0" width=${ce} height=${Q}></rect>
              ${gt(e.curve,r).map(u=>O`<rect class="off-peak" x=${n(u.from)} y="0" width=${n(u.to)-n(u.from)} height=${Q}></rect>`)}`:p}
        <path class="line" d=${mt(e.curve,ce,Q-4,t,r)} transform="translate(0 4)"></path>
        ${d==null?p:O`<line class="cut" x1=${n(d)} x2=${n(d)} y1="0" y2=${Q}></line>`}
      </svg>
      <div class="axis muted">
        <span>${N(t,o,a)}</span>
        <span>${c?`max ${K(c,o)}`:""}</span>
        <span>${N(r,o,a)}</span>
      </div>
      ${e.has_off_peak_source?l`<div class="legend muted">
            <span><i class="off-peak"></i>${this._t("off_peak_slice")}</span>
            <span><i class="peak"></i>${this._t("peak_slice")}</span>
          </div>`:p}
    `}_actions(){let e=this._s,t=e.id,r=this._pending,n=this.hass.config.time_zone,o=(a,c)=>l`
      <div class="confirm">
        <span>${a}</span>
        <button class="primary" ?disabled=${this._busy} @click=${()=>this._run(c)}>${this._t("confirm")}</button>
        <button @click=${()=>this._pending=void 0}>${this._t("cancel")}</button>
      </div>
    `;return l`
      <p class="muted">${this._t("chart_hint")}</p>
      ${r?.kind==="split"?o(this._t("confirm_split",{time:J(r.at,v(this.hass),n,e.charge_start??void 0)}),()=>rt(this.hass,t,r.at)):p}
      ${r?.kind==="delete"?o(this._t("confirm_delete"),()=>st(this.hass,t)):p}
      <div class="actions">
        <label>
          ${this._t("vehicle")}
          <select
            ?disabled=${this._busy}
            @change=${a=>{let c=a.target,d=c.value;c.value=e.vehicle_id??"",d&&d!==e.vehicle_id&&this._run(()=>tt(this.hass,t,d))}}
          >
            ${e.vehicle_id==null?l`<option value="" selected>${"\u2014"}</option>`:p}
            ${this.vehicles.map(a=>l`<option value=${a.id} .selected=${a.id===e.vehicle_id}>${a.name}</option>`)}
          </select>
        </label>
        <button
          ?disabled=${this._busy||!this._prev}
          @click=${()=>this._run(()=>ke(this.hass,t,this._prev))}
        >
          ${this._t("merge_prev")}
        </button>
        <button
          ?disabled=${this._busy||!this._next}
          @click=${()=>this._run(()=>ke(this.hass,t,this._next))}
        >
          ${this._t("merge_next")}
        </button>
        <button class="danger" ?disabled=${this._busy} @click=${()=>this._pending={kind:"delete"}}>
          ${this._t("delete")}
        </button>
      </div>
    `}static{this.styles=$`
    :host {
      display: block;
      --cb-off-peak: rgba(3, 155, 229, 0.15);
      --cb-peak: rgba(255, 166, 0, 0.18);
    }
    .card {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
      padding: 16px;
    }
    .muted {
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .badge {
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.8em;
      background: var(--warning-color, #ffa600);
      color: var(--text-primary-color, #fff);
    }
    .figures {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      text-align: center;
      margin-bottom: 12px;
    }
    .value {
      font-size: 1.1em;
      font-weight: 600;
      white-space: nowrap;
    }
    .chart {
      display: block;
      width: 100%;
      height: 160px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .chart.clickable {
      cursor: crosshair;
    }
    .line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
    }
    rect.off-peak,
    i.off-peak {
      fill: var(--cb-off-peak);
      background: var(--cb-off-peak);
    }
    rect.peak,
    i.peak {
      fill: var(--cb-peak);
      background: var(--cb-peak);
    }
    .cut {
      stroke: var(--error-color, #db4437);
      stroke-width: 2;
      stroke-dasharray: 4 3;
      vector-effect: non-scaling-stroke;
    }
    .axis,
    .legend {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
    }
    .legend {
      justify-content: flex-start;
      gap: 16px;
    }
    .legend i {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 4px;
      vertical-align: middle;
      border: 1px solid var(--divider-color, #e0e0e0);
    }
    .facts {
      width: 100%;
      margin: 12px 0;
      border-collapse: collapse;
    }
    .facts td {
      padding: 4px 0;
    }
    .facts td:first-child {
      color: var(--secondary-text-color);
      padding-right: 12px;
    }
    .actions,
    .confirm {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }
    .confirm {
      padding: 8px;
      margin-bottom: 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .confirm span {
      flex: 1 1 100%;
    }
    button,
    select {
      font: inherit;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    select {
      margin-left: 4px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: transparent;
    }
    button.danger {
      color: var(--error-color, #db4437);
    }
    .back {
      display: none;
      margin-bottom: 8px;
    }
    @media (max-width: 900px) {
      .back {
        display: inline-block;
      }
    }
    @media (max-width: 600px) {
      .figures {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `}};customElements.define("charge-board-session-detail",Ee);var Oe=class extends f{constructor(){super(...arguments);this.version=0;this._vehicle="";this._charger="";this._req=0}static{this.properties={hass:{attribute:!1},version:{type:Number},_sessions:{state:!0},_summary:{state:!0},_overview:{state:!0},_error:{state:!0},_message:{state:!0},_vehicle:{state:!0},_charger:{state:!0},_month:{state:!0},_selected:{state:!0}}}willUpdate(){this._month===void 0&&this.hass&&(this._month=X(Date.now()/1e3,this.hass.config.time_zone))}updated(e){["version","_vehicle","_charger","_month"].some(t=>e.has(t))&&this.hass&&this._fetch()}async _fetch(){let e=++this._req,t={...this._vehicle&&{vehicle_id:this._vehicle},...this._charger&&{charger_id:this._charger},...this._month&&{month:this._month}};try{let[r,n]=await Promise.all([ie(this.hass,t),P(this.hass)]);if(e!==this._req)return;this._sessions=r.sessions,this._summary=r.summary,this._overview=n,this._error=void 0}catch(r){e===this._req&&(this._error=w(r))}}_t(e,t){return x(y(this.hass),e,t)}_changed(e){this._selected=e.detail.id,this._message=e.detail.error,this._fetch()}render(){if(this._error&&!this._sessions)return l`<p class="message">${this._t(this._error)}</p>`;if(!this._sessions||!this._overview)return l`<p class="message">${this._t("loading")}</p>`;let e=this._overview,t=(r,n,o,a)=>l`<select @change=${c=>a(c.target.value)}>
        <option value="" ?selected=${!r}>${this._t(n)}</option>
        ${o.map(c=>l`<option value=${c.id} ?selected=${c.id===r}>${c.name}</option>`)}
      </select>`;return l`
      <div class="filters">
        ${t(this._vehicle,"all_vehicles",e.vehicles,r=>this._vehicle=r)}
        ${t(this._charger,"all_chargers",e.chargers,r=>this._charger=r)}
        <input
          type="month"
          aria-label=${this._t("month")}
          .value=${this._month??""}
          @change=${r=>this._month=r.target.value}
        />
      </div>
      ${this._error?l`<p class="error">${this._t(this._error)}</p>`:p}
      ${this._message?l`<p class="error">${this._t(this._message)}</p>`:p}
      <div class="layout ${this._selected?"has-detail":""}">
        <div class="list">${this._banner()} ${this._table()}</div>
        ${this._selected?l`<charge-board-session-detail
              .hass=${this.hass}
              .sessionId=${this._selected}
              .version=${this.version}
              .currency=${e.currency}
              .vehicles=${e.vehicles}
              @session-changed=${this._changed}
              @back=${()=>this._selected=void 0}
            ></charge-board-session-detail>`:p}
      </div>
    `}_banner(){let e=this._summary,t=v(this.hass),r=b(e.cost,this._overview.currency,t);e.cost!=null&&e.unpriced_count>0&&(r=`\u2265 ${r}`);let o=[this._month?new Date(`${this._month}-15T12:00:00Z`).toLocaleString(t,{month:"long",year:"numeric",timeZone:"UTC"}):null,this._t("sessions_count",{n:String(e.count)}),k(e.energy_kwh,t),l`<b>${r}</b>`,e.off_peak_share==null?"\u2014":this._t("off_peak_short",{share:M(e.off_peak_share,t)})].filter(a=>a!=null);return l`<div class="banner">${o.map((a,c)=>l`${c?" \xB7 ":""}${a}`)}</div>`}_table(){let e=this._sessions;if(!e.length)return l`<p class="message">${this._t("no_sessions")}</p>`;let t=v(this.hass),r=this.hass.config.time_zone,n=c=>c==null?"\u2014":oe(c,t,r),o=["col_start","col_end","col_vehicle","col_battery","col_kwh","col_duration","col_cost"],a=this._summary.unpriced_count;return l`
      <div class="scroll">
        <table>
          <thead>
            <tr>${o.map(c=>l`<th>${this._t(c)}</th>`)}</tr>
          </thead>
          <tbody>
            ${e.map(c=>l`<tr
                class=${c.id===this._selected?"selected":""}
                tabindex="0"
                @click=${()=>this._selected=c.id}
                @keydown=${d=>d.key==="Enter"&&(this._selected=c.id)}
              >
                <td>${n(c.charge_start)}</td>
                <td>${n(c.charge_end)}</td>
                <td>${c.vehicle_name??"\u2014"}</td>
                <td>${I(c.soc_start,c.soc_end)}</td>
                <td>${c.energy_kwh.toLocaleString(t,{minimumFractionDigits:1,maximumFractionDigits:1})}</td>
                <td>${G(c.charging_s,y(this.hass))}</td>
                <td>
                  ${b(c.cost,this._overview.currency,t)}${c.estimated?" *":""}
                  ${c.edited?l`<span class="badge">${this._t("edited")}</span>`:p}
                </td>
              </tr>`)}
          </tbody>
        </table>
      </div>
      <div class="note">
        ${this._t("estimated_note")}${a?l` · ${this._t("unpriced_note",{n:String(a)})}`:p}
      </div>
    `}static{this.styles=$`
    :host {
      display: block;
      padding: 16px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .message,
    .note {
      color: var(--secondary-text-color);
    }
    .message {
      text-align: center;
    }
    .note {
      font-size: 0.85em;
      margin-top: 6px;
    }
    .error {
      color: var(--error-color, #db4437);
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    select,
    input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .layout {
      display: grid;
      gap: 16px;
      align-items: start;
    }
    .layout.has-detail {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    }
    .banner,
    .scroll {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .banner {
      padding: 12px;
      margin-bottom: 8px;
    }
    .scroll {
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95em;
    }
    th {
      text-align: left;
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    th,
    td {
      padding: 8px;
      white-space: nowrap;
    }
    tbody tr {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
    }
    tbody tr:hover,
    tbody tr.selected {
      background: var(--secondary-background-color, #f5f5f5);
    }
    tbody tr:focus-visible {
      outline: 2px solid var(--primary-color);
    }
    .badge {
      margin-left: 4px;
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.8em;
      background: var(--warning-color, #ffa600);
      color: var(--text-primary-color, #fff);
    }
    /* One column: the detail replaces the list (back button in the detail). */
    @media (max-width: 900px) {
      .layout.has-detail {
        grid-template-columns: 1fr;
      }
      .layout.has-detail .list {
        display: none;
      }
    }
    @media (max-width: 600px) {
      :host {
        padding: 8px;
      }
    }
  `}};customElements.define("charge-board-sessions",Oe);var le=$`
  :host {
    display: block;
    padding: 16px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .message,
  .note,
  .label,
  small {
    color: var(--secondary-text-color);
  }
  .message {
    text-align: center;
  }
  .note {
    font-size: 0.85em;
    margin-top: 6px;
  }
  .error {
    color: var(--error-color, #db4437);
  }
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
  select,
  button.chip {
    font: inherit;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    cursor: pointer;
  }
  button.chip[aria-pressed="true"] {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  .card,
  .scroll {
    background: var(--card-background-color, #fff);
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: var(--ha-card-border-radius, 12px);
    margin-bottom: 12px;
  }
  .card {
    padding: 12px;
  }
  .label {
    margin-bottom: 8px;
  }
  .figs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    text-align: center;
  }
  .fig b {
    display: block;
    font-size: 1.3em;
  }
  .fig span,
  .fig small {
    display: block;
    font-size: 0.85em;
  }
  .good {
    color: var(--success-color, #16a34a);
  }
  .bad {
    color: var(--error-color, #db4437);
  }
  .scroll {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95em;
  }
  th {
    text-align: left;
    color: var(--secondary-text-color);
    font-weight: 500;
  }
  th,
  td {
    padding: 8px;
    white-space: nowrap;
  }
  tbody tr {
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }
  @media (max-width: 600px) {
    :host {
      padding: 8px;
    }
  }
`;var Pe=110,He=class extends f{constructor(){super(...arguments);this.version=0;this._year=new Date().getFullYear();this._req=0}static{this.properties={hass:{attribute:!1},version:{type:Number},_stats:{state:!0},_overview:{state:!0},_error:{state:!0},_vehicle:{state:!0},_year:{state:!0}}}updated(e){["version","_vehicle","_year"].some(t=>e.has(t))&&this.hass&&this._fetch()}async _fetch(){let e=++this._req;try{let t=this._overview??await P(this.hass);this._vehicle===void 0&&(this._vehicle=t.vehicles[0]?.id??"");let r=await it(this.hass,this._year,this._vehicle||void 0);if(e!==this._req)return;this._overview=t,this._stats=r,this._error=void 0}catch(t){e===this._req&&(this._error=w(t))}}_t(e,t){return x(y(this.hass),e,t)}_monthName(e,t="long"){return new Date(`${e}-15T12:00:00Z`).toLocaleString(v(this.hass),{month:t,...t==="long"&&{year:"numeric"},timeZone:"UTC"})}render(){if(this._error&&!this._stats)return l`<p class="message">${this._t(this._error)}</p>`;if(!this._stats||!this._overview)return l`<p class="message">${this._t("loading")}</p>`;let e=Array.from({length:5},(t,r)=>new Date().getFullYear()-r);return l`
      <div class="filters">
        <select @change=${t=>this._vehicle=t.target.value}>
          ${this._overview.vehicles.map(t=>l`<option value=${t.id} ?selected=${t.id===this._vehicle}>${t.name}</option>`)}
          <option value="" ?selected=${this._vehicle===""}>${this._t("all_vehicles")}</option>
        </select>
        <select
          aria-label=${this._t("year")}
          @change=${t=>this._year=Number(t.target.value)}
        >
          ${e.map(t=>l`<option value=${t} ?selected=${t===this._year}>${t}</option>`)}
        </select>
      </div>
      ${this._error?l`<p class="error">${this._t(this._error)}</p>`:p} ${this._rolling()} ${this._head()} ${this._bars()}
      ${this._table()}
      <div class="note">${this._t("km_note")}<br />${this._t("stats_settings_note")}</div>
    `}_rolling(){let{current:e,previous:t}=this._stats.rolling;return this._figures(this._t("last_30_days"),e,t,"vs_prev_30")}_head(){let{rows:e,total:t}=this._stats,r=X(Date.now()/1e3,this.hass.config.time_zone),n=e.findIndex(a=>a.month===r),o=n>=0?this._t("current_month",{month:this._monthName(r)}):this._t("total_year",{year:String(this._year)});return this._figures(o,n>=0?e[n]:t,n>0?e[n-1]:null,"vs_prev")}_figures(e,t,r,n){let{currency:o}=this._stats,a=v(this.hass),c=r&&r.cost&&t.cost!=null?l`<small class="delta ${t.cost<=r.cost?"good":"bad"}"
          >${lt(t.cost/r.cost-1,a)} ${this._t(n)}</small
        >`:p,d=(m,g,S=p,yt="")=>l`<div class="fig"><b class=${yt}>${m}</b><span>${g}</span>${S}</div>`,u=t.fuel_l100!=null&&t.fuel_price!=null?l`<small
            >${this._t("petrol_ref",{l100:t.fuel_l100.toLocaleString(a,{maximumFractionDigits:1}),price:b(t.fuel_price,o,a)})}</small
          >`:p,h=t.savings==null?"\u2014":b(-t.savings,o,a);return l`<div class="card">
      <div class="label">${e}</div>
      <div class="figs">
        ${d(b(t.cost,o,a),this._t("cost"),c)}
        ${d(k(t.energy_kwh,a),this._t("sessions_n",{n:String(t.sessions)}))}
        ${d(t.off_peak_share==null?"\u2014":M(t.off_peak_share,a),this._t("off_peak_label"))}
        ${d(b(t.cost_per_100km,o,a),this._t("per_100km"),t.km==null?p:l`<small>${this._t("km_n",{km:Math.round(t.km).toLocaleString(a)})}</small>`)}
        ${d(h,this._t("vs_petrol"),u,t.savings!=null&&t.savings>0?"good":"")}
      </div>
    </div>`}_bars(){let e=this._stats.rows,t=ft(e,Pe),r=ae([...new Set(t.flatMap(n=>n.parts.map(o=>o.key)))]);return l`<div class="card">
      <div class="label">
        ${this._t("cost_by_month")}
        <span class="legend">
          ${r.map(n=>l`<span><i style="background:${Ce(n)}"></i>${pt(n,o=>this._t(o))}</span>`)}
        </span>
      </div>
      <svg viewBox="0 0 100 ${Pe}" preserveAspectRatio="none" class="bars" role="img">
        ${t.map(n=>n.parts.map(o=>O`<rect x=${n.x} width=${n.w} y=${o.y} height=${o.h} style="fill:${Ce(o.key)}"></rect>`))}
      </svg>
      <div class="months">${e.map(n=>l`<span>${this._monthName(n.month,"short")}</span>`)}</div>
    </div>`}_table(){let{rows:e,total:t,currency:r}=this._stats,n=v(this.hass),o=X(Date.now()/1e3,this.hass.config.time_zone),a=e.filter(h=>h.month<=o&&(h.sessions||h.km!=null)),c=h=>h.toLocaleString(n,{minimumFractionDigits:1,maximumFractionDigits:1}),d=(h,m,g="")=>l`<tr class=${g}>
      <td>${m}</td>
      <td>${h.sessions}</td>
      <td>${c(h.energy_kwh)}</td>
      <td><b>${b(h.cost,r,n)}</b></td>
      <td>${h.off_peak_share==null?"\u2014":M(h.off_peak_share,n)}</td>
      <td>
        ${h.km==null?"\u2014":Math.round(h.km).toLocaleString(n)}${h.km_partial?" *":""}
      </td>
      <td>${h.cost_per_100km==null?"\u2014":b(h.cost_per_100km,r,n)}</td>
      <td class=${h.savings!=null&&h.savings>0?"good":""}>
        ${h.savings==null?"\u2014":b(-h.savings,r,n)}
      </td>
    </tr>`;return l`<div class="scroll">
      <table>
        <thead>
          <tr>${["col_month","col_sessions","col_kwh","col_cost","col_hc","col_km","col_per_100","col_vs_petrol"].map(h=>l`<th>${this._t(h)}</th>`)}</tr>
        </thead>
        <tbody>
          ${a.reverse().map(h=>d(h,this._monthName(h.month)))}
          ${d(t,this._t("total_year",{year:String(this._year)}),"total")}
        </tbody>
      </table>
    </div>`}static{this.styles=[le,$`
      .bars {
        width: 100%;
        height: ${Pe}px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .legend {
        display: inline-flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        margin-left: 8px;
      }
      .legend i {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 4px;
        border-radius: 2px;
        outline: 1px solid var(--divider-color, #e0e0e0);
        vertical-align: -1px;
      }
      .months {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        text-align: center;
        font-size: 0.75em;
        color: var(--secondary-text-color);
      }
      tr.total {
        font-weight: 600;
      }
    `]}};customElements.define("charge-board-stats",He);var bt=30,Me=300,De=80,Te=class extends f{constructor(){super(...arguments);this.version=0;this._soc=[];this._req=0}static{this.properties={hass:{attribute:!1},version:{type:Number},_overview:{state:!0},_card:{state:!0},_soc:{state:!0},_error:{state:!0},_vehicle:{state:!0}}}updated(e){["version","_vehicle"].some(t=>e.has(t))&&this.hass&&this._fetch()}async _fetch(){let e=++this._req;try{let t=await P(this.hass);if(e!==this._req||(this._overview=t,(!this._vehicle||!t.vehicles.some(o=>o.id===this._vehicle))&&(this._vehicle=t.vehicles[0]?.id,!this._vehicle)))return;let r=await nt(this.hass,this._vehicle);if(e!==this._req)return;this._card=r,this._error=void 0;let n=r.config.find(o=>o.key==="soc_entity")?.entity_id;if(n&&this._socFor!==r.id){let o=Date.now()/1e3;this._soc=await ot(this.hass,n,o-bt*86400,o).catch(()=>[]),this._socFor=r.id}}catch(t){e===this._req&&(this._error=w(t))}}_t(e,t){return x(y(this.hass),e,t)}render(){return this._error&&!this._card?l`<p class="message">${this._t(this._error)}</p>`:this._overview&&!this._overview.vehicles.length?l`<p class="message">${this._t("no_vehicles")}</p>`:!this._card||!this._overview?l`<p class="message">${this._t("loading")}</p>`:l`
      <div class="filters">
        ${this._overview.vehicles.map(e=>l`<button
            class="chip"
            aria-pressed=${e.id===this._vehicle}
            @click=${()=>{e.id!==this._vehicle&&(this._vehicle=e.id,this._soc=[])}}
          >
            ${e.name}
          </button>`)}
      </div>
      ${this._card.cut_ignored&&this._card.target_source==="home"?l`<p class="error">${this._t("cut_ignored")}</p>`:p}
      ${this._figures()} ${this._chart()} ${this._table()} ${this._config()}
    `}_figures(){let e=this._card,t=v(this.hass),r=(o,a=0)=>o==null?"\u2014":o.toLocaleString(t,{maximumFractionDigits:a,minimumFractionDigits:a}),n=(o,a,c)=>l`<div class="fig"><b>${o}</b><span>${a}</span>${c?l`<small>${c}</small>`:p}</div>`;return l`<div class="card">
      <div class="figs">
        ${n(e.soc==null?"\u2014":`${r(e.soc)} %`,this._t("battery_now"),e.target==null?void 0:this._t("target_n",{n:r(e.target)}))}
        ${n(e.consumption_30d==null?"\u2014":`${r(e.consumption_30d,1)} kWh`,this._t("consumption_30d"))}
        ${n(e.odometer==null?"\u2014":`${r(e.odometer)} km`,this._t("odometer"))}
        ${n(e.autonomy_km==null?"\u2014":`\u2248 ${r(e.autonomy_km)} km`,this._t("autonomy"))}
      </div>
      ${e.consumption_since==null?p:l`<div class="note">${this._t("consumption_since",{value:r(e.consumption_since,1)})}</div>`}
    </div>`}_chart(){let e=Date.now()/1e3,t=e-bt*86400,r=this.hass.config.time_zone,n=v(this.hass),o=a=>(Math.max(a,t)-t)/(e-t)*Me;return l`<div class="card">
      <div class="label">${this._t("battery_30d")} · <span class="band">▮</span> ${this._t("recharges")}</div>
      <svg viewBox="0 0 ${Me} ${De}" preserveAspectRatio="none" class="line" role="img">
        ${this._card.sessions.map(a=>O`<rect class="band" x=${o(a.start)} y="0" height=${De}
            width=${Math.max(o(a.end??e)-o(a.start),1.5)}></rect>`)}
        <path d=${vt(this._soc,Me,De,t,e)}></path>
      </svg>
      <div class="axis">
        <span>${H(t,n,r)}</span><span>${H(e,n,r)}</span>
      </div>
    </div>`}_table(){let e=this._card,t=v(this.hass),r=e.rows.filter(a=>a.sessions||a.km!=null).reverse();if(!r.length)return p;let n=a=>new Date(`${a}-15T12:00:00Z`).toLocaleString(t,{month:"long",year:"numeric",timeZone:"UTC"}),o=["col_month","col_km","col_kwh","col_kwh_100","col_per_100"];return l`<div class="card">
      <div class="label">${this._t("consumption_by_month")}</div>
      <div class="scroll flat">
        <table>
          <thead>
            <tr>${o.map(a=>l`<th>${this._t(a)}</th>`)}</tr>
          </thead>
          <tbody>
            ${r.map(a=>l`<tr>
                <td>${n(a.month)}</td>
                <td>
                  ${a.km==null?"\u2014":Math.round(a.km).toLocaleString(t)}${a.km_partial?" *":""}
                </td>
                <td>${k(a.energy_kwh,t)}</td>
                <td>${a.kwh_100km==null?"\u2014":a.kwh_100km.toLocaleString(t,{maximumFractionDigits:1})}</td>
                <td>${b(a.cost_per_100km,e.currency,t)}</td>
              </tr>`)}
          </tbody>
        </table>
      </div>
    </div>`}_config(){let e=this._card,t=v(this.hass),r=a=>l`<span class=${a.ok?"good":"bad"}>●</span> ${a.value==null?"\u2014":a.value.toLocaleString(t,{maximumFractionDigits:3})}`,n=(a,c,d)=>l`<tr>
      <td>${this._t(a)}</td>
      <td>
        ${c.entity_id??(c.key==="target"||c.key==="fuel_price"?this._t("fixed_value"):"\u2014")}
        ${r(c)}${d?l` <small>${d}</small>`:p}</td>
    </tr>`,o=a=>e.config.find(c=>c.key===a);return l`<div class="card">
      <div class="head">
        <span class="label">${this._t("configuration")}</span>
        <a href="/config/integrations/integration/charge_board">${this._t("edit")} ↗</a>
      </div>
      <table class="cfg">
        <tbody>
          <tr>
            <td>${this._t("cfg_capacity")}</td>
            <td>${e.capacity_kwh==null?"\u2014":`${e.capacity_kwh.toLocaleString(t)} kWh`}</td>
          </tr>
          ${n("cfg_soc_entity",o("soc_entity"))}
          ${n("cfg_target",o("target"),this._t(e.target_source==="home"?"target_home":"target_vehicle"))}
          ${n("cfg_odometer_entity",o("odometer_entity"))} ${n("cfg_fuel_price",o("fuel_price"))}
          <tr>
            <td>${this._t("cfg_fuel_l100")}</td>
            <td>${e.fuel_l100==null?"\u2014":`${e.fuel_l100.toLocaleString(t)} L/100 km`}</td>
          </tr>
        </tbody>
      </table>
    </div>`}static{this.styles=[le,$`
      .line {
        width: 100%;
        height: 90px;
      }
      .line path {
        fill: none;
        stroke: var(--info-color, #3b82f6);
        stroke-width: 2;
        vector-effect: non-scaling-stroke;
      }
      rect.band {
        fill: var(--success-color, #22c55e);
        opacity: 0.25;
      }
      span.band {
        color: var(--success-color, #22c55e);
      }
      .axis,
      .head {
        display: flex;
        justify-content: space-between;
      }
      .axis {
        font-size: 0.75em;
        color: var(--secondary-text-color);
      }
      .head a {
        color: var(--primary-color);
        text-decoration: none;
      }
      .flat {
        border: none;
        margin: 0;
      }
      table.cfg td:first-child {
        color: var(--secondary-text-color);
      }
      table.cfg tr {
        border: none;
      }
    `]}};customElements.define("charge-board-vehicles",Te);var It="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",$t={overview:"tab_overview",sessions:"tab_sessions",vehicles:"tab_vehicles",stats:"tab_stats"},Re=class extends f{constructor(){super(...arguments);this.narrow=!1;this._tab="overview";this._version=0}static{this.properties={hass:{attribute:!1},narrow:{type:Boolean},route:{attribute:!1},panel:{attribute:!1},_tab:{state:!0},_version:{state:!0}}}connectedCallback(){super.connectedCallback(),this._subscribe()}disconnectedCallback(){super.disconnectedCallback(),this._unsub?.then(e=>e()).catch(()=>{}),this._unsub=void 0}updated(e){e.has("hass")&&this._subscribe()}_subscribe(){if(!this.hass||this._unsub)return;let e=at(this.hass,()=>this._version++);this._unsub=e,e.then(()=>this._version++).catch(()=>{this._unsub===e&&(this._unsub=void 0)})}_t(e){return x(y(this.hass),e)}_toggleMenu(){this.dispatchEvent(new CustomEvent("hass-toggle-menu",{bubbles:!0,composed:!0}))}render(){return this.hass?l`
      <header>
        <div class="toolbar">
          ${this.narrow?l`<button class="menu" aria-label=${this._t("menu")} @click=${this._toggleMenu}>
                <svg viewBox="0 0 24 24"><path d=${It}></path></svg>
              </button>`:l``}
          <div class="title">${this._t("title")}</div>
        </div>
        <nav role="tablist">
          ${Object.keys($t).map(e=>l`<button
              role="tab"
              aria-selected=${this._tab===e}
              @click=${()=>this._tab=e}
            >
              ${this._t($t[e])}
            </button>`)}
        </nav>
      </header>
      <main>
        ${this._content()}
      </main>
    `:l``}_content(){let e={hass:this.hass,version:this._version};switch(this._tab){case"sessions":return l`<charge-board-sessions .hass=${e.hass} .version=${e.version}></charge-board-sessions>`;case"vehicles":return l`<charge-board-vehicles .hass=${e.hass} .version=${e.version}></charge-board-vehicles>`;case"stats":return l`<charge-board-stats .hass=${e.hass} .version=${e.version}></charge-board-stats>`;default:return l`<charge-board-overview .hass=${e.hass} .version=${e.version}></charge-board-overview>`}}static{this.styles=$`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    header {
      position: sticky;
      top: 0;
      z-index: 2;
      background: var(--app-header-background-color, var(--primary-color));
      color: var(--app-header-text-color, var(--text-primary-color, #fff));
      border-bottom: var(--app-header-border-bottom, none);
      padding-top: env(safe-area-inset-top);
    }
    .toolbar {
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 12px;
      gap: 12px;
    }
    .title {
      font-size: 20px;
      font-weight: 400;
      margin-left: 12px;
    }
    .menu + .title {
      margin-left: 0;
    }
    button {
      all: unset;
      cursor: pointer;
    }
    button:focus-visible {
      outline: 2px solid currentColor;
    }
    .menu {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .menu svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    nav {
      display: flex;
      padding: 0 12px;
      overflow-x: auto;
    }
    nav button {
      padding: 12px 16px;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 500;
      opacity: 0.7;
      border-bottom: 2px solid transparent;
    }
    nav button[aria-selected="true"] {
      opacity: 1;
      border-bottom-color: currentColor;
    }
  `}};customElements.define("charge-board-panel",Re);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
