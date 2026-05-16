(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Pc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const fe={},Is=[],Hn=()=>{},kf=()=>!1,la=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ca=n=>n.startsWith("onUpdate:"),Ue=Object.assign,Dc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},em=Object.prototype.hasOwnProperty,le=(n,t)=>em.call(n,t),Wt=Array.isArray,Us=n=>Gr(n)==="[object Map]",Vf=n=>Gr(n)==="[object Set]",Mu=n=>Gr(n)==="[object Date]",qt=n=>typeof n=="function",xe=n=>typeof n=="string",kn=n=>typeof n=="symbol",ue=n=>n!==null&&typeof n=="object",Gf=n=>(ue(n)||qt(n))&&qt(n.then)&&qt(n.catch),Wf=Object.prototype.toString,Gr=n=>Wf.call(n),nm=n=>Gr(n).slice(8,-1),Xf=n=>Gr(n)==="[object Object]",Lc=n=>xe(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,br=Pc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ua=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},im=/-\w/g,Ke=ua(n=>n.replace(im,t=>t.slice(1).toUpperCase())),sm=/\B([A-Z])/g,ss=ua(n=>n.replace(sm,"-$1").toLowerCase()),ha=ua(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ra=ua(n=>n?`on${ha(n)}`:""),zn=(n,t)=>!Object.is(n,t),Ca=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},jf=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},rm=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let yu;const fa=()=>yu||(yu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function da(n){if(Wt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=xe(i)?cm(i):da(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(xe(n)||ue(n))return n}const om=/;(?![^(]*\))/g,am=/:([^]+)/,lm=/\/\*[^]*?\*\//g;function cm(n){const t={};return n.replace(lm,"").split(om).forEach(e=>{if(e){const i=e.split(am);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Ji(n){let t="";if(xe(n))t=n;else if(Wt(n))for(let e=0;e<n.length;e++){const i=Ji(n[e]);i&&(t+=i+" ")}else if(ue(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const um="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",hm=Pc(um);function qf(n){return!!n||n===""}function fm(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=Ic(n[i],t[i]);return e}function Ic(n,t){if(n===t)return!0;let e=Mu(n),i=Mu(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=kn(n),i=kn(t),e||i)return n===t;if(e=Wt(n),i=Wt(t),e||i)return e&&i?fm(n,t):!1;if(e=ue(n),i=ue(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!Ic(n[o],t[o]))return!1}}return String(n)===String(t)}const Yf=n=>!!(n&&n.__v_isRef===!0),zt=n=>xe(n)?n:n==null?"":Wt(n)||ue(n)&&(n.toString===Wf||!qt(n.toString))?Yf(n)?zt(n.value):JSON.stringify(n,$f,2):String(n),$f=(n,t)=>Yf(t)?$f(n,t.value):Us(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Pa(i,r)+" =>"]=s,e),{})}:Vf(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Pa(e))}:kn(t)?Pa(t):ue(t)&&!Wt(t)&&!Xf(t)?String(t):t,Pa=(n,t="")=>{var e;return kn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ie;class dm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ie&&(Ie.active?(this.parent=Ie,this.index=(Ie.scopes||(Ie.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Ie;try{return Ie=this,t()}finally{Ie=e}}}on(){++this._on===1&&(this.prevScope=Ie,Ie=this)}off(){if(this._on>0&&--this._on===0){if(Ie===this)Ie=this.prevScope;else{let t=Ie;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function pm(){return Ie}let me;const Da=new WeakSet;class Kf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ie&&(Ie.active?Ie.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Da.has(this)&&(Da.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Jf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Su(this),Qf(this);const t=me,e=Cn;me=this,Cn=!0;try{return this.fn()}finally{td(this),me=t,Cn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Oc(t);this.deps=this.depsTail=void 0,Su(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Da.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){yl(this)&&this.run()}get dirty(){return yl(this)}}let Zf=0,Tr,Ar;function Jf(n,t=!1){if(n.flags|=8,t){n.next=Ar,Ar=n;return}n.next=Tr,Tr=n}function Uc(){Zf++}function Nc(){if(--Zf>0)return;if(Ar){let t=Ar;for(Ar=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Tr;){let t=Tr;for(Tr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function Qf(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function td(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),Oc(i),mm(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function yl(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(ed(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function ed(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Ir)||(n.globalVersion=Ir,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!yl(n))))return;n.flags|=2;const t=n.dep,e=me,i=Cn;me=n,Cn=!0;try{Qf(n);const s=n.fn(n._value);(t.version===0||zn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{me=e,Cn=i,td(n),n.flags&=-3}}function Oc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)Oc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function mm(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Cn=!0;const nd=[];function hi(){nd.push(Cn),Cn=!1}function fi(){const n=nd.pop();Cn=n===void 0?!0:n}function Su(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=me;me=void 0;try{t()}finally{me=e}}}let Ir=0;class gm{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Fc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!me||!Cn||me===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==me)e=this.activeLink=new gm(me,this),me.deps?(e.prevDep=me.depsTail,me.depsTail.nextDep=e,me.depsTail=e):me.deps=me.depsTail=e,id(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=me.depsTail,e.nextDep=void 0,me.depsTail.nextDep=e,me.depsTail=e,me.deps===e&&(me.deps=i)}return e}trigger(t){this.version++,Ir++,this.notify(t)}notify(t){Uc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Nc()}}}function id(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)id(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Sl=new WeakMap,$i=Symbol(""),El=Symbol(""),Ur=Symbol("");function Fe(n,t,e){if(Cn&&me){let i=Sl.get(n);i||Sl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new Fc),s.map=i,s.key=e),s.track()}}function si(n,t,e,i,s,r){const o=Sl.get(n);if(!o){Ir++;return}const a=l=>{l&&l.trigger()};if(Uc(),t==="clear")o.forEach(a);else{const l=Wt(n),c=l&&Lc(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===Ur||!kn(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Ur)),t){case"add":l?c&&a(o.get("length")):(a(o.get($i)),Us(n)&&a(o.get(El)));break;case"delete":l||(a(o.get($i)),Us(n)&&a(o.get(El)));break;case"set":Us(n)&&a(o.get($i));break}}Nc()}function us(n){const t=ae(n);return t===n?t:(Fe(t,"iterate",Ur),vn(n)?t:t.map(Dn))}function pa(n){return Fe(n=ae(n),"iterate",Ur),n}function On(n,t){return di(n)?Ws(Ki(n)?Dn(t):t):Dn(t)}const _m={__proto__:null,[Symbol.iterator](){return La(this,Symbol.iterator,n=>On(this,n))},concat(...n){return us(this).concat(...n.map(t=>Wt(t)?us(t):t))},entries(){return La(this,"entries",n=>(n[1]=On(this,n[1]),n))},every(n,t){return Yn(this,"every",n,t,void 0,arguments)},filter(n,t){return Yn(this,"filter",n,t,e=>e.map(i=>On(this,i)),arguments)},find(n,t){return Yn(this,"find",n,t,e=>On(this,e),arguments)},findIndex(n,t){return Yn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Yn(this,"findLast",n,t,e=>On(this,e),arguments)},findLastIndex(n,t){return Yn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Yn(this,"forEach",n,t,void 0,arguments)},includes(...n){return Ia(this,"includes",n)},indexOf(...n){return Ia(this,"indexOf",n)},join(n){return us(this).join(n)},lastIndexOf(...n){return Ia(this,"lastIndexOf",n)},map(n,t){return Yn(this,"map",n,t,void 0,arguments)},pop(){return lr(this,"pop")},push(...n){return lr(this,"push",n)},reduce(n,...t){return Eu(this,"reduce",n,t)},reduceRight(n,...t){return Eu(this,"reduceRight",n,t)},shift(){return lr(this,"shift")},some(n,t){return Yn(this,"some",n,t,void 0,arguments)},splice(...n){return lr(this,"splice",n)},toReversed(){return us(this).toReversed()},toSorted(n){return us(this).toSorted(n)},toSpliced(...n){return us(this).toSpliced(...n)},unshift(...n){return lr(this,"unshift",n)},values(){return La(this,"values",n=>On(this,n))}};function La(n,t,e){const i=pa(n),s=i[t]();return i!==n&&!vn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const vm=Array.prototype;function Yn(n,t,e,i,s,r){const o=pa(n),a=o!==n&&!vn(n),l=o[t];if(l!==vm[t]){const h=l.apply(n,r);return a?Dn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,On(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Eu(n,t,e,i){const s=pa(n),r=s!==n&&!vn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=On(n,c)),e.call(this,c,On(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?On(n,l):l}function Ia(n,t,e){const i=ae(n);Fe(i,"iterate",Ur);const s=i[t](...e);return(s===-1||s===!1)&&Hc(e[0])?(e[0]=ae(e[0]),i[t](...e)):s}function lr(n,t,e=[]){hi(),Uc();const i=ae(n)[t].apply(n,e);return Nc(),fi(),i}const xm=Pc("__proto__,__v_isRef,__isVue"),sd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(kn));function Mm(n){kn(n)||(n=String(n));const t=ae(this);return Fe(t,"has",n),t.hasOwnProperty(n)}class rd{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Pm:cd:r?ld:ad).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Wt(t);if(!s){let l;if(o&&(l=_m[e]))return l;if(e==="hasOwnProperty")return Mm}const a=Reflect.get(t,e,He(t)?t:i);if((kn(e)?sd.has(e):xm(e))||(s||Fe(t,"get",e),r))return a;if(He(a)){const l=o&&Lc(e)?a:a.value;return s&&ue(l)?Tl(l):l}return ue(a)?s?Tl(a):ma(a):a}}class od extends rd{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Wt(t)&&Lc(e);if(!this._isShallow){const c=di(r);if(!vn(i)&&!di(i)&&(r=ae(r),i=ae(i)),!o&&He(r)&&!He(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:le(t,e),l=Reflect.set(t,e,i,He(t)?t:s);return t===ae(s)&&(a?zn(i,r)&&si(t,"set",e,i):si(t,"add",e,i)),l}deleteProperty(t,e){const i=le(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&si(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!kn(e)||!sd.has(e))&&Fe(t,"has",e),i}ownKeys(t){return Fe(t,"iterate",Wt(t)?"length":$i),Reflect.ownKeys(t)}}class ym extends rd{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Sm=new od,Em=new ym,bm=new od(!0);const bl=n=>n,no=n=>Reflect.getPrototypeOf(n);function Tm(n,t,e){return function(...i){const s=this.__v_raw,r=ae(s),o=Us(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?bl:t?Ws:Dn;return!t&&Fe(r,"iterate",l?El:$i),Ue(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function io(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function Am(n,t){const e={get(s){const r=this.__v_raw,o=ae(r),a=ae(s);n||(zn(s,a)&&Fe(o,"get",s),Fe(o,"get",a));const{has:l}=no(o),c=t?bl:n?Ws:Dn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Fe(ae(s),"iterate",$i),s.size},has(s){const r=this.__v_raw,o=ae(r),a=ae(s);return n||(zn(s,a)&&Fe(o,"has",s),Fe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ae(a),c=t?bl:n?Ws:Dn;return!n&&Fe(l,"iterate",$i),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Ue(e,n?{add:io("add"),set:io("set"),delete:io("delete"),clear:io("clear")}:{add(s){const r=ae(this),o=no(r),a=ae(s),l=!t&&!vn(s)&&!di(s)?a:s;return o.has.call(r,l)||zn(s,l)&&o.has.call(r,s)||zn(a,l)&&o.has.call(r,a)||(r.add(l),si(r,"add",l,l)),this},set(s,r){!t&&!vn(r)&&!di(r)&&(r=ae(r));const o=ae(this),{has:a,get:l}=no(o);let c=a.call(o,s);c||(s=ae(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?zn(r,u)&&si(o,"set",s,r):si(o,"add",s,r),this},delete(s){const r=ae(this),{has:o,get:a}=no(r);let l=o.call(r,s);l||(s=ae(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&si(r,"delete",s,void 0),c},clear(){const s=ae(this),r=s.size!==0,o=s.clear();return r&&si(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Tm(s,n,t)}),e}function Bc(n,t){const e=Am(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(le(e,s)&&s in i?e:i,s,r)}const wm={get:Bc(!1,!1)},Rm={get:Bc(!1,!0)},Cm={get:Bc(!0,!1)};const ad=new WeakMap,ld=new WeakMap,cd=new WeakMap,Pm=new WeakMap;function Dm(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Lm(n){return n.__v_skip||!Object.isExtensible(n)?0:Dm(nm(n))}function ma(n){return di(n)?n:zc(n,!1,Sm,wm,ad)}function ud(n){return zc(n,!1,bm,Rm,ld)}function Tl(n){return zc(n,!0,Em,Cm,cd)}function zc(n,t,e,i,s){if(!ue(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=Lm(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function Ki(n){return di(n)?Ki(n.__v_raw):!!(n&&n.__v_isReactive)}function di(n){return!!(n&&n.__v_isReadonly)}function vn(n){return!!(n&&n.__v_isShallow)}function Hc(n){return n?!!n.__v_raw:!1}function ae(n){const t=n&&n.__v_raw;return t?ae(t):n}function Im(n){return!le(n,"__v_skip")&&Object.isExtensible(n)&&jf(n,"__v_skip",!0),n}const Dn=n=>ue(n)?ma(n):n,Ws=n=>ue(n)?Tl(n):n;function He(n){return n?n.__v_isRef===!0:!1}function Jt(n){return hd(n,!1)}function Xs(n){return hd(n,!0)}function hd(n,t){return He(n)?n:new Um(n,t)}class Um{constructor(t,e){this.dep=new Fc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ae(t),this._value=e?t:Dn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||vn(t)||di(t);t=i?t:ae(t),zn(t,e)&&(this._rawValue=t,this._value=i?t:Dn(t),this.dep.trigger())}}function rn(n){return He(n)?n.value:n}const Nm={get:(n,t,e)=>t==="__v_raw"?n:rn(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return He(s)&&!He(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function fd(n){return Ki(n)?n:new Proxy(n,Nm)}class Om{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Fc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ir-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return Jf(this,!0),!0}get value(){const t=this.dep.track();return ed(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Fm(n,t,e=!1){let i,s;return qt(n)?i=n:(i=n.get,s=n.set),new Om(i,s,e)}const so={},jo=new WeakMap;let Vi;function Bm(n,t=!1,e=Vi){if(e){let i=jo.get(e);i||jo.set(e,i=[]),i.push(n)}}function zm(n,t,e=fe){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:vn(M)||s===!1||s===0?ri(M,1):ri(M);let u,h,f,p,g=!1,_=!1;if(He(n)?(h=()=>n.value,g=vn(n)):Ki(n)?(h=()=>c(n),g=!0):Wt(n)?(_=!0,g=n.some(M=>Ki(M)||vn(M)),h=()=>n.map(M=>{if(He(M))return M.value;if(Ki(M))return c(M);if(qt(M))return l?l(M,2):M()})):qt(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){hi();try{f()}finally{fi()}}const M=Vi;Vi=u;try{return l?l(n,3,[p]):n(p)}finally{Vi=M}}:h=Hn,t&&s){const M=h,L=s===!0?1/0:s;h=()=>ri(M(),L)}const m=pm(),d=()=>{u.stop(),m&&m.active&&Dc(m.effects,u)};if(r&&t){const M=t;t=(...L)=>{M(...L),d()}}let y=_?new Array(n.length).fill(so):so;const T=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const L=u.run();if(s||g||(_?L.some((I,C)=>zn(I,y[C])):zn(L,y))){f&&f();const I=Vi;Vi=u;try{const C=[L,y===so?void 0:_&&y[0]===so?[]:y,p];y=L,l?l(t,3,C):t(...C)}finally{Vi=I}}}else u.run()};return a&&a(T),u=new Kf(h),u.scheduler=o?()=>o(T,!1):T,p=M=>Bm(M,!1,u),f=u.onStop=()=>{const M=jo.get(u);if(M){if(l)l(M,4);else for(const L of M)L();jo.delete(u)}},t?i?T(!0):y=u.run():o?o(T.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function ri(n,t=1/0,e){if(t<=0||!ue(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,He(n))ri(n.value,t,e);else if(Wt(n))for(let i=0;i<n.length;i++)ri(n[i],t,e);else if(Vf(n)||Us(n))n.forEach(i=>{ri(i,t,e)});else if(Xf(n)){for(const i in n)ri(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ri(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Wr(n,t,e,i){try{return i?n(...i):n()}catch(s){ga(s,t,e)}}function Vn(n,t,e,i){if(qt(n)){const s=Wr(n,t,e,i);return s&&Gf(s)&&s.catch(r=>{ga(r,t,e)}),s}if(Wt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Vn(n[r],t,e,i));return s}}function ga(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||fe;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){hi(),Wr(r,null,10,[n,l,c]),fi();return}}Hm(n,e,s,i,o)}function Hm(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const qe=[];let Nn=-1;const Ns=[];let Ti=null,As=0;const dd=Promise.resolve();let qo=null;function Qi(n){const t=qo||dd;return n?t.then(this?n.bind(this):n):t}function km(n){let t=Nn+1,e=qe.length;for(;t<e;){const i=t+e>>>1,s=qe[i],r=Nr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function kc(n){if(!(n.flags&1)){const t=Nr(n),e=qe[qe.length-1];!e||!(n.flags&2)&&t>=Nr(e)?qe.push(n):qe.splice(km(t),0,n),n.flags|=1,pd()}}function pd(){qo||(qo=dd.then(gd))}function Vm(n){Wt(n)?Ns.push(...n):Ti&&n.id===-1?Ti.splice(As+1,0,n):n.flags&1||(Ns.push(n),n.flags|=1),pd()}function bu(n,t,e=Nn+1){for(;e<qe.length;e++){const i=qe[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;qe.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function md(n){if(Ns.length){const t=[...new Set(Ns)].sort((e,i)=>Nr(e)-Nr(i));if(Ns.length=0,Ti){Ti.push(...t);return}for(Ti=t,As=0;As<Ti.length;As++){const e=Ti[As];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Ti=null,As=0}}const Nr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function gd(n){try{for(Nn=0;Nn<qe.length;Nn++){const t=qe[Nn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Wr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Nn<qe.length;Nn++){const t=qe[Nn];t&&(t.flags&=-2)}Nn=-1,qe.length=0,md(),qo=null,(qe.length||Ns.length)&&gd()}}let un=null,_d=null;function Yo(n){const t=un;return un=n,_d=n&&n.type.__scopeId||null,t}function Gm(n,t=un,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&Zo(-1);const r=Yo(t);let o;try{o=n(...s)}finally{Yo(r),i._d&&Zo(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Wm(n,t){if(un===null)return n;const e=Sa(un),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=fe]=t[s];r&&(qt(r)&&(r={mounted:r,updated:r}),r.deep&&ri(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Ui(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(hi(),Vn(l,e,8,[n.el,a,n,t]),fi())}}function Oo(n,t){if(Be){let e=Be.provides;const i=Be.parent&&Be.parent.provides;i===e&&(e=Be.provides=Object.create(i)),e[n]=t}}function xn(n,t,e=!1){const i=qg();if(i||Os){let s=Os?Os._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&qt(t)?t.call(i&&i.proxy):t}}const Xm=Symbol.for("v-scx"),jm=()=>xn(Xm);function Mn(n,t,e){return vd(n,t,e)}function vd(n,t,e=fe){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ue({},e),l=t&&i||!t&&r!=="post";let c;if(Br){if(r==="sync"){const p=jm();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Hn,p.resume=Hn,p.pause=Hn,p}}const u=Be;a.call=(p,g,_)=>Vn(p,u,g,_);let h=!1;r==="post"?a.scheduler=p=>{Xe(p,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(p,g)=>{g?p():kc(p)}),a.augmentJob=p=>{t&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=zm(n,t,a);return Br&&(c?c.push(f):l&&f()),f}function qm(n,t,e){const i=this.proxy,s=xe(n)?n.includes(".")?xd(i,n):()=>i[n]:n.bind(i,i);let r;qt(t)?r=t:(r=t.handler,e=t);const o=Xr(this),a=vd(s,r.bind(i),e);return o(),a}function xd(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const bi=new WeakMap,Md=Symbol("_vte"),Ym=n=>n.__isTeleport,Wi=n=>n&&(n.disabled||n.disabled===""),$m=n=>n&&(n.defer||n.defer===""),Tu=n=>typeof SVGElement<"u"&&n instanceof SVGElement,Au=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Al=(n,t)=>{const e=n&&n.to;return xe(e)?t?t(e):null:e},Km={name:"Teleport",__isTeleport:!0,process(n,t,e,i,s,r,o,a,l,c){const{mc:u,pc:h,pbc:f,o:{insert:p,querySelector:g,createText:_,createComment:m,parentNode:d}}=c,y=Wi(t.props);let{dynamicChildren:T}=t;const M=(C,U,w)=>{C.shapeFlag&16&&u(C.children,U,w,s,r,o,a,l)},L=(C=t)=>{const U=Wi(C.props),w=C.target=Al(C.props,g),E=Rl(w,C,_,p);w&&(o!=="svg"&&Tu(w)?o="svg":o!=="mathml"&&Au(w)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(w),U||(M(C,w,E),xr(C,!1)))},I=C=>{const U=()=>{if(bi.get(C)===U){if(bi.delete(C),Wi(C.props)){const w=d(C.el)||e;M(C,w,C.anchor),xr(C,!0)}L(C)}};bi.set(C,U),Xe(U,r)};if(n==null){const C=t.el=_(""),U=t.anchor=_("");if(p(C,e,i),p(U,e,i),$m(t.props)||r&&r.pendingBranch){I(t);return}y&&(M(t,e,U),xr(t,!0)),L()}else{t.el=n.el;const C=t.anchor=n.anchor,U=bi.get(n);if(U){U.flags|=8,bi.delete(n),I(t);return}t.targetStart=n.targetStart;const w=t.target=n.target,E=t.targetAnchor=n.targetAnchor,D=Wi(n.props),B=D?e:w,V=D?C:E;if(o==="svg"||Tu(w)?o="svg":(o==="mathml"||Au(w))&&(o="mathml"),T?(f(n.dynamicChildren,T,B,s,r,o,a),Xc(n,t,!0)):l||h(n,t,B,V,s,r,o,a,!1),y)D?t.props&&n.props&&t.props.to!==n.props.to&&(t.props.to=n.props.to):ro(t,e,C,c,1);else if((t.props&&t.props.to)!==(n.props&&n.props.to)){const ot=t.target=Al(t.props,g);ot&&ro(t,ot,null,c,0)}else D&&ro(t,w,E,c,1);xr(t,y)}},remove(n,t,e,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:h,props:f}=n;let p=r||!Wi(f);const g=bi.get(n);if(g&&(g.flags|=8,bi.delete(n),p=!1),h&&(s(c),s(u)),r&&s(l),o&16)for(let _=0;_<a.length;_++){const m=a[_];i(m,t,e,p,!!m.dynamicChildren)}},move:ro,hydrate:Zm};function ro(n,t,e,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,t,e);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,h=r===2;if(h&&i(o,t,e),!bi.has(n)&&(!h||Wi(u))&&l&16)for(let f=0;f<c.length;f++)s(c[f],t,e,2);h&&i(a,t,e)}function Zm(n,t,e,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},h){function f(m,d){let y=d;for(;y;){if(y&&y.nodeType===8){if(y.data==="teleport start anchor")t.targetStart=y;else if(y.data==="teleport anchor"){t.targetAnchor=y,m._lpa=t.targetAnchor&&o(t.targetAnchor);break}}y=o(y)}}function p(m,d){d.anchor=h(o(m),d,a(m),e,i,s,r)}const g=t.target=Al(t.props,l),_=Wi(t.props);if(g){const m=g._lpa||g.firstChild;t.shapeFlag&16&&(_?(p(n,t),f(g,m),t.targetAnchor||Rl(g,t,u,c,a(n)===g?n:null)):(t.anchor=o(n),f(g,m),t.targetAnchor||Rl(g,t,u,c),h(m&&o(m),t,g,e,i,s,r))),xr(t,_)}else _&&t.shapeFlag&16&&(p(n,t),t.targetStart=n,t.targetAnchor=o(n));return t.anchor&&o(t.anchor)}const wl=Km;function xr(n,t){const e=n.ctx;if(e&&e.ut){let i,s;for(t?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",e.uid),i=i.nextSibling;e.ut()}}function Rl(n,t,e,i,s=null){const r=t.targetStart=e(""),o=t.targetAnchor=e("");return r[Md]=o,n&&(i(r,n,s),i(o,n,s)),o}const Jm=Symbol("_leaveCb");function Vc(n,t){n.shapeFlag&6&&n.component?(n.transition=t,Vc(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function Ii(n,t){return qt(n)?Ue({name:n.name},t,{setup:n}):n}function yd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function wu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const $o=new WeakMap;function wr(n,t,e,i,s=!1){if(Wt(n)){n.forEach((_,m)=>wr(_,t&&(Wt(t)?t[m]:t),e,i,s));return}if(Rr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&wr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Sa(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===fe?a.refs={}:a.refs,h=a.setupState,f=ae(h),p=h===fe?kf:_=>wu(u,_)?!1:le(f,_),g=(_,m)=>!(m&&wu(u,m));if(c!=null&&c!==l){if(Ru(t),xe(c))u[c]=null,p(c)&&(h[c]=null);else if(He(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(qt(l))Wr(l,a,12,[o,u]);else{const _=xe(l),m=He(l);if(_||m){const d=()=>{if(n.f){const y=_?p(l)?h[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Wt(y)&&Dc(y,r);else if(Wt(y))y.includes(r)||y.push(r);else if(_)u[l]=[r],p(l)&&(h[l]=u[l]);else{const T=[r];g(l,n.k)&&(l.value=T),n.k&&(u[n.k]=T)}}else _?(u[l]=o,p(l)&&(h[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const y=()=>{d(),$o.delete(n)};y.id=-1,$o.set(n,y),Xe(y,e)}else Ru(n),d()}}}function Ru(n){const t=$o.get(n);t&&(t.flags|=8,$o.delete(n))}fa().requestIdleCallback;fa().cancelIdleCallback;const Rr=n=>!!n.type.__asyncLoader,Sd=n=>n.type.__isKeepAlive;function Qm(n,t){Ed(n,"a",t)}function tg(n,t){Ed(n,"da",t)}function Ed(n,t,e=Be){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(_a(t,i,e),e){let s=e.parent;for(;s&&s.parent;)Sd(s.parent.vnode)&&eg(i,t,e,s),s=s.parent}}function eg(n,t,e,i){const s=_a(t,n,i,!0);bd(()=>{Dc(i[t],s)},e)}function _a(n,t,e=Be,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{hi();const a=Xr(e),l=Vn(t,e,n,o);return a(),fi(),l});return i?s.unshift(r):s.push(r),r}}const pi=n=>(t,e=Be)=>{(!Br||n==="sp")&&_a(n,(...i)=>t(...i),e)},ng=pi("bm"),va=pi("m"),ig=pi("bu"),sg=pi("u"),xa=pi("bum"),bd=pi("um"),rg=pi("sp"),og=pi("rtg"),ag=pi("rtc");function lg(n,t=Be){_a("ec",n,t)}const cg="components";function ug(n,t){return fg(cg,n,!0,t)||n}const hg=Symbol.for("v-ndc");function fg(n,t,e=!0,i=!1){const s=un||Be;if(s){const r=s.type;{const a=Jg(r,!1);if(a&&(a===t||a===Ke(t)||a===ha(Ke(t))))return r}const o=Cu(s[n]||r[n],t)||Cu(s.appContext[n],t);return!o&&i?r:o}}function Cu(n,t){return n&&(n[t]||n[Ke(t)]||n[ha(Ke(t))])}function ts(n,t,e,i){let s;const r=e,o=Wt(n);if(o||xe(n)){const a=o&&Ki(n);let l=!1,c=!1;a&&(l=!vn(n),c=di(n),n=pa(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Ws(Dn(n[u])):Dn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ue(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Cl=n=>n?Gd(n)?Sa(n):Cl(n.parent):null,Cr=Ue(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Cl(n.parent),$root:n=>Cl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Ad(n),$forceUpdate:n=>n.f||(n.f=()=>{kc(n.update)}),$nextTick:n=>n.n||(n.n=Qi.bind(n.proxy)),$watch:n=>qm.bind(n)}),Ua=(n,t)=>n!==fe&&!n.__isScriptSetup&&le(n,t),dg={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Ua(i,t))return o[t]=1,i[t];if(s!==fe&&le(s,t))return o[t]=2,s[t];if(le(r,t))return o[t]=3,r[t];if(e!==fe&&le(e,t))return o[t]=4,e[t];Pl&&(o[t]=0)}}const c=Cr[t];let u,h;if(c)return t==="$attrs"&&Fe(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==fe&&le(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,le(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Ua(s,t)?(s[t]=e,!0):i!==fe&&le(i,t)?(i[t]=e,!0):le(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==fe&&a[0]!=="$"&&le(n,a)||Ua(t,a)||le(r,a)||le(i,a)||le(Cr,a)||le(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:le(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Pu(n){return Wt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Pl=!0;function pg(n){const t=Ad(n),e=n.proxy,i=n.ctx;Pl=!1,t.beforeCreate&&Du(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:g,activated:_,deactivated:m,beforeDestroy:d,beforeUnmount:y,destroyed:T,unmounted:M,render:L,renderTracked:I,renderTriggered:C,errorCaptured:U,serverPrefetch:w,expose:E,inheritAttrs:D,components:B,directives:V,filters:ot}=t;if(c&&mg(c,i,null),o)for(const Q in o){const $=o[Q];qt($)&&(i[Q]=$.bind(e))}if(s){const Q=s.call(e,e);ue(Q)&&(n.data=ma(Q))}if(Pl=!0,r)for(const Q in r){const $=r[Q],_t=qt($)?$.bind(e,e):qt($.get)?$.get.bind(e,e):Hn,yt=!qt($)&&qt($.set)?$.set.bind(e):Hn,Ct=ee({get:_t,set:yt});Object.defineProperty(i,Q,{enumerable:!0,configurable:!0,get:()=>Ct.value,set:Ut=>Ct.value=Ut})}if(a)for(const Q in a)Td(a[Q],i,e,Q);if(l){const Q=qt(l)?l.call(e):l;Reflect.ownKeys(Q).forEach($=>{Oo($,Q[$])})}u&&Du(u,n,"c");function tt(Q,$){Wt($)?$.forEach(_t=>Q(_t.bind(e))):$&&Q($.bind(e))}if(tt(ng,h),tt(va,f),tt(ig,p),tt(sg,g),tt(Qm,_),tt(tg,m),tt(lg,U),tt(ag,I),tt(og,C),tt(xa,y),tt(bd,M),tt(rg,w),Wt(E))if(E.length){const Q=n.exposed||(n.exposed={});E.forEach($=>{Object.defineProperty(Q,$,{get:()=>e[$],set:_t=>e[$]=_t,enumerable:!0})})}else n.exposed||(n.exposed={});L&&n.render===Hn&&(n.render=L),D!=null&&(n.inheritAttrs=D),B&&(n.components=B),V&&(n.directives=V),w&&yd(n)}function mg(n,t,e=Hn){Wt(n)&&(n=Dl(n));for(const i in n){const s=n[i];let r;ue(s)?"default"in s?r=xn(s.from||i,s.default,!0):r=xn(s.from||i):r=xn(s),He(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function Du(n,t,e){Vn(Wt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Td(n,t,e,i){let s=i.includes(".")?xd(e,i):()=>e[i];if(xe(n)){const r=t[n];qt(r)&&Mn(s,r)}else if(qt(n))Mn(s,n.bind(e));else if(ue(n))if(Wt(n))n.forEach(r=>Td(r,t,e,i));else{const r=qt(n.handler)?n.handler.bind(e):t[n.handler];qt(r)&&Mn(s,r,n)}}function Ad(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Ko(l,c,o,!0)),Ko(l,t,o)),ue(t)&&r.set(t,l),l}function Ko(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Ko(n,r,e,!0),s&&s.forEach(o=>Ko(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=gg[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const gg={data:Lu,props:Iu,emits:Iu,methods:Mr,computed:Mr,beforeCreate:Ge,created:Ge,beforeMount:Ge,mounted:Ge,beforeUpdate:Ge,updated:Ge,beforeDestroy:Ge,beforeUnmount:Ge,destroyed:Ge,unmounted:Ge,activated:Ge,deactivated:Ge,errorCaptured:Ge,serverPrefetch:Ge,components:Mr,directives:Mr,watch:vg,provide:Lu,inject:_g};function Lu(n,t){return t?n?function(){return Ue(qt(n)?n.call(this,this):n,qt(t)?t.call(this,this):t)}:t:n}function _g(n,t){return Mr(Dl(n),Dl(t))}function Dl(n){if(Wt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Ge(n,t){return n?[...new Set([].concat(n,t))]:t}function Mr(n,t){return n?Ue(Object.create(null),n,t):t}function Iu(n,t){return n?Wt(n)&&Wt(t)?[...new Set([...n,...t])]:Ue(Object.create(null),Pu(n),Pu(t??{})):t}function vg(n,t){if(!n)return t;if(!t)return n;const e=Ue(Object.create(null),n);for(const i in t)e[i]=Ge(n[i],t[i]);return e}function wd(){return{app:null,config:{isNativeTag:kf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let xg=0;function Mg(n,t){return function(i,s=null){qt(i)||(i=Ue({},i)),s!=null&&!ue(s)&&(s=null);const r=wd(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:xg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:t_,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&qt(u.install)?(o.add(u),u.install(c,...h)):qt(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||sn(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,Sa(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Vn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Os;Os=c;try{return u()}finally{Os=h}}};return c}}let Os=null;const yg=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Ke(t)}Modifiers`]||n[`${ss(t)}Modifiers`];function Sg(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||fe;let s=e;const r=t.startsWith("update:"),o=r&&yg(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>xe(u)?u.trim():u)),o.number&&(s=e.map(rm)));let a,l=i[a=Ra(t)]||i[a=Ra(Ke(t))];!l&&r&&(l=i[a=Ra(ss(t))]),l&&Vn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Vn(c,n,6,s)}}const Eg=new WeakMap;function Rd(n,t,e=!1){const i=e?Eg:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!qt(n)){const l=c=>{const u=Rd(c,t,!0);u&&(a=!0,Ue(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ue(n)&&i.set(n,null),null):(Wt(r)?r.forEach(l=>o[l]=null):Ue(o,r),ue(n)&&i.set(n,o),o)}function Ma(n,t){return!n||!la(t)?!1:(t=t.slice(2).replace(/Once$/,""),le(n,t[0].toLowerCase()+t.slice(1))||le(n,ss(t))||le(n,t))}function Uu(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:g,inheritAttrs:_}=n,m=Yo(n);let d,y;try{if(e.shapeFlag&4){const M=s||i,L=M;d=Fn(c.call(L,M,u,h,p,f,g)),y=a}else{const M=t;d=Fn(M.length>1?M(h,{attrs:a,slots:o,emit:l}):M(h,null)),y=t.props?a:bg(a)}}catch(M){Pr.length=0,ga(M,n,1),d=sn(Di)}let T=d;if(y&&_!==!1){const M=Object.keys(y),{shapeFlag:L}=T;M.length&&L&7&&(r&&M.some(ca)&&(y=Tg(y,r)),T=js(T,y,!1,!0))}return e.dirs&&(T=js(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(e.dirs):e.dirs),e.transition&&Vc(T,e.transition),d=T,Yo(m),d}const bg=n=>{let t;for(const e in n)(e==="class"||e==="style"||la(e))&&((t||(t={}))[e]=n[e]);return t},Tg=(n,t)=>{const e={};for(const i in n)(!ca(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Ag(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?Nu(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(Cd(o,i,f)&&!Ma(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Nu(i,o,c):!0:!!o;return!1}function Nu(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Cd(t,n,r)&&!Ma(e,r))return!0}return!1}function Cd(n,t,e){const i=n[e],s=t[e];return e==="style"&&ue(i)&&ue(s)?!Ic(i,s):i!==s}function wg({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const Pd={},Dd=()=>Object.create(Pd),Ld=n=>Object.getPrototypeOf(n)===Pd;function Rg(n,t,e,i=!1){const s={},r=Dd();n.propsDefaults=Object.create(null),Id(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:ud(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Cg(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ae(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Ma(n.emitsOptions,f))continue;const p=t[f];if(l)if(le(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const g=Ke(f);s[g]=Ll(l,a,g,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{Id(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!le(t,h)&&((u=ss(h))===h||!le(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=Ll(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!le(t,h))&&(delete r[h],c=!0)}c&&si(n.attrs,"set","")}function Id(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(br(l))continue;const c=t[l];let u;s&&le(s,u=Ke(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Ma(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ae(e),c=a||fe;for(let u=0;u<r.length;u++){const h=r[u];e[h]=Ll(s,l,h,c[h],n,!le(c,h))}}return o}function Ll(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=le(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&qt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Xr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ss(e))&&(i=!0))}return i}const Pg=new WeakMap;function Ud(n,t,e=!1){const i=e?Pg:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!qt(n)){const u=h=>{l=!0;const[f,p]=Ud(h,t,!0);Ue(o,f),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ue(n)&&i.set(n,Is),Is;if(Wt(r))for(let u=0;u<r.length;u++){const h=Ke(r[u]);Ou(h)&&(o[h]=fe)}else if(r)for(const u in r){const h=Ke(u);if(Ou(h)){const f=r[u],p=o[h]=Wt(f)||qt(f)?{type:f}:Ue({},f),g=p.type;let _=!1,m=!0;if(Wt(g))for(let d=0;d<g.length;++d){const y=g[d],T=qt(y)&&y.name;if(T==="Boolean"){_=!0;break}else T==="String"&&(m=!1)}else _=qt(g)&&g.name==="Boolean";p[0]=_,p[1]=m,(_||le(p,"default"))&&a.push(h)}}const c=[o,a];return ue(n)&&i.set(n,c),c}function Ou(n){return n[0]!=="$"&&!br(n)}const Gc=n=>n==="_"||n==="_ctx"||n==="$stable",Wc=n=>Wt(n)?n.map(Fn):[Fn(n)],Dg=(n,t,e)=>{if(t._n)return t;const i=Gm((...s)=>Wc(t(...s)),e);return i._c=!1,i},Nd=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Gc(s))continue;const r=n[s];if(qt(r))t[s]=Dg(s,r,i);else if(r!=null){const o=Wc(r);t[s]=()=>o}}},Od=(n,t)=>{const e=Wc(t);n.slots.default=()=>e},Fd=(n,t,e)=>{for(const i in t)(e||!Gc(i))&&(n[i]=t[i])},Lg=(n,t,e)=>{const i=n.slots=Dd();if(n.vnode.shapeFlag&32){const s=t._;s?(Fd(i,t,e),e&&jf(i,"_",s,!0)):Nd(t,i)}else t&&Od(n,t)},Ig=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=fe;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Fd(s,t,e):(r=!t.$stable,Nd(t,s)),o=t}else t&&(Od(n,t),o={default:1});if(r)for(const a in s)!Gc(a)&&o[a]==null&&delete s[a]},Xe=Bg;function Ug(n){return Ng(n)}function Ng(n,t){const e=fa();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=Hn,insertStaticContent:g}=n,_=(A,P,S,it=null,J=null,Z=null,lt=void 0,q=null,F=!!P.dynamicChildren)=>{if(A===P)return;A&&!cr(A,P)&&(it=O(A),Ut(A,J,Z,!0),A=null),P.patchFlag===-2&&(F=!1,P.dynamicChildren=null);const{type:x,ref:v,shapeFlag:R}=P;switch(x){case ya:m(A,P,S,it);break;case Di:d(A,P,S,it);break;case Fo:A==null&&y(P,S,it,lt);break;case Le:B(A,P,S,it,J,Z,lt,q,F);break;default:R&1?L(A,P,S,it,J,Z,lt,q,F):R&6?V(A,P,S,it,J,Z,lt,q,F):(R&64||R&128)&&x.process(A,P,S,it,J,Z,lt,q,F,ut)}v!=null&&J?wr(v,A&&A.ref,Z,P||A,!P):v==null&&A&&A.ref!=null&&wr(A.ref,null,Z,A,!0)},m=(A,P,S,it)=>{if(A==null)i(P.el=a(P.children),S,it);else{const J=P.el=A.el;P.children!==A.children&&c(J,P.children)}},d=(A,P,S,it)=>{A==null?i(P.el=l(P.children||""),S,it):P.el=A.el},y=(A,P,S,it)=>{[A.el,A.anchor]=g(A.children,P,S,it,A.el,A.anchor)},T=({el:A,anchor:P},S,it)=>{let J;for(;A&&A!==P;)J=f(A),i(A,S,it),A=J;i(P,S,it)},M=({el:A,anchor:P})=>{let S;for(;A&&A!==P;)S=f(A),s(A),A=S;s(P)},L=(A,P,S,it,J,Z,lt,q,F)=>{if(P.type==="svg"?lt="svg":P.type==="math"&&(lt="mathml"),A==null)I(P,S,it,J,Z,lt,q,F);else{const x=A.el&&A.el._isVueCE?A.el:null;try{x&&x._beginPatch(),w(A,P,J,Z,lt,q,F)}finally{x&&x._endPatch()}}},I=(A,P,S,it,J,Z,lt,q)=>{let F,x;const{props:v,shapeFlag:R,transition:N,dirs:H}=A;if(F=A.el=o(A.type,Z,v&&v.is,v),R&8?u(F,A.children):R&16&&U(A.children,F,null,it,J,Na(A,Z),lt,q),H&&Ui(A,null,it,"created"),C(F,A,A.scopeId,lt,it),v){for(const gt in v)gt!=="value"&&!br(gt)&&r(F,gt,null,v[gt],Z,it);"value"in v&&r(F,"value",null,v.value,Z),(x=v.onVnodeBeforeMount)&&Un(x,it,A)}H&&Ui(A,null,it,"beforeMount");const G=Og(J,N);G&&N.beforeEnter(F),i(F,P,S),((x=v&&v.onVnodeMounted)||G||H)&&Xe(()=>{try{x&&Un(x,it,A),G&&N.enter(F),H&&Ui(A,null,it,"mounted")}finally{}},J)},C=(A,P,S,it,J)=>{if(S&&p(A,S),it)for(let Z=0;Z<it.length;Z++)p(A,it[Z]);if(J){let Z=J.subTree;if(P===Z||Hd(Z.type)&&(Z.ssContent===P||Z.ssFallback===P)){const lt=J.vnode;C(A,lt,lt.scopeId,lt.slotScopeIds,J.parent)}}},U=(A,P,S,it,J,Z,lt,q,F=0)=>{for(let x=F;x<A.length;x++){const v=A[x]=q?ii(A[x]):Fn(A[x]);_(null,v,P,S,it,J,Z,lt,q)}},w=(A,P,S,it,J,Z,lt)=>{const q=P.el=A.el;let{patchFlag:F,dynamicChildren:x,dirs:v}=P;F|=A.patchFlag&16;const R=A.props||fe,N=P.props||fe;let H;if(S&&Ni(S,!1),(H=N.onVnodeBeforeUpdate)&&Un(H,S,P,A),v&&Ui(P,A,S,"beforeUpdate"),S&&Ni(S,!0),(R.innerHTML&&N.innerHTML==null||R.textContent&&N.textContent==null)&&u(q,""),x?E(A.dynamicChildren,x,q,S,it,Na(P,J),Z):lt||$(A,P,q,null,S,it,Na(P,J),Z,!1),F>0){if(F&16)D(q,R,N,S,J);else if(F&2&&R.class!==N.class&&r(q,"class",null,N.class,J),F&4&&r(q,"style",R.style,N.style,J),F&8){const G=P.dynamicProps;for(let gt=0;gt<G.length;gt++){const ht=G[gt],dt=R[ht],Pt=N[ht];(Pt!==dt||ht==="value")&&r(q,ht,dt,Pt,J,S)}}F&1&&A.children!==P.children&&u(q,P.children)}else!lt&&x==null&&D(q,R,N,S,J);((H=N.onVnodeUpdated)||v)&&Xe(()=>{H&&Un(H,S,P,A),v&&Ui(P,A,S,"updated")},it)},E=(A,P,S,it,J,Z,lt)=>{for(let q=0;q<P.length;q++){const F=A[q],x=P[q],v=F.el&&(F.type===Le||!cr(F,x)||F.shapeFlag&198)?h(F.el):S;_(F,x,v,null,it,J,Z,lt,!0)}},D=(A,P,S,it,J)=>{if(P!==S){if(P!==fe)for(const Z in P)!br(Z)&&!(Z in S)&&r(A,Z,P[Z],null,J,it);for(const Z in S){if(br(Z))continue;const lt=S[Z],q=P[Z];lt!==q&&Z!=="value"&&r(A,Z,q,lt,J,it)}"value"in S&&r(A,"value",P.value,S.value,J)}},B=(A,P,S,it,J,Z,lt,q,F)=>{const x=P.el=A?A.el:a(""),v=P.anchor=A?A.anchor:a("");let{patchFlag:R,dynamicChildren:N,slotScopeIds:H}=P;H&&(q=q?q.concat(H):H),A==null?(i(x,S,it),i(v,S,it),U(P.children||[],S,v,J,Z,lt,q,F)):R>0&&R&64&&N&&A.dynamicChildren&&A.dynamicChildren.length===N.length?(E(A.dynamicChildren,N,S,J,Z,lt,q),(P.key!=null||J&&P===J.subTree)&&Xc(A,P,!0)):$(A,P,S,v,J,Z,lt,q,F)},V=(A,P,S,it,J,Z,lt,q,F)=>{P.slotScopeIds=q,A==null?P.shapeFlag&512?J.ctx.activate(P,S,it,lt,F):ot(P,S,it,J,Z,lt,F):at(A,P,F)},ot=(A,P,S,it,J,Z,lt)=>{const q=A.component=jg(A,it,J);if(Sd(A)&&(q.ctx.renderer=ut),Yg(q,!1,lt),q.asyncDep){if(J&&J.registerDep(q,tt,lt),!A.el){const F=q.subTree=sn(Di);d(null,F,P,S),A.placeholder=F.el}}else tt(q,A,P,S,J,Z,lt)},at=(A,P,S)=>{const it=P.component=A.component;if(Ag(A,P,S))if(it.asyncDep&&!it.asyncResolved){Q(it,P,S);return}else it.next=P,it.update();else P.el=A.el,it.vnode=P},tt=(A,P,S,it,J,Z,lt)=>{const q=()=>{if(A.isMounted){let{next:R,bu:N,u:H,parent:G,vnode:gt}=A;{const pt=Bd(A);if(pt){R&&(R.el=gt.el,Q(A,R,lt)),pt.asyncDep.then(()=>{Xe(()=>{A.isUnmounted||x()},J)});return}}let ht=R,dt;Ni(A,!1),R?(R.el=gt.el,Q(A,R,lt)):R=gt,N&&Ca(N),(dt=R.props&&R.props.onVnodeBeforeUpdate)&&Un(dt,G,R,gt),Ni(A,!0);const Pt=Uu(A),st=A.subTree;A.subTree=Pt,_(st,Pt,h(st.el),O(st),A,J,Z),R.el=Pt.el,ht===null&&wg(A,Pt.el),H&&Xe(H,J),(dt=R.props&&R.props.onVnodeUpdated)&&Xe(()=>Un(dt,G,R,gt),J)}else{let R;const{el:N,props:H}=P,{bm:G,m:gt,parent:ht,root:dt,type:Pt}=A,st=Rr(P);Ni(A,!1),G&&Ca(G),!st&&(R=H&&H.onVnodeBeforeMount)&&Un(R,ht,P),Ni(A,!0);{dt.ce&&dt.ce._hasShadowRoot()&&dt.ce._injectChildStyle(Pt,A.parent?A.parent.type:void 0);const pt=A.subTree=Uu(A);_(null,pt,S,it,A,J,Z),P.el=pt.el}if(gt&&Xe(gt,J),!st&&(R=H&&H.onVnodeMounted)){const pt=P;Xe(()=>Un(R,ht,pt),J)}(P.shapeFlag&256||ht&&Rr(ht.vnode)&&ht.vnode.shapeFlag&256)&&A.a&&Xe(A.a,J),A.isMounted=!0,P=S=it=null}};A.scope.on();const F=A.effect=new Kf(q);A.scope.off();const x=A.update=F.run.bind(F),v=A.job=F.runIfDirty.bind(F);v.i=A,v.id=A.uid,F.scheduler=()=>kc(v),Ni(A,!0),x()},Q=(A,P,S)=>{P.component=A;const it=A.vnode.props;A.vnode=P,A.next=null,Cg(A,P.props,it,S),Ig(A,P.children,S),hi(),bu(A),fi()},$=(A,P,S,it,J,Z,lt,q,F=!1)=>{const x=A&&A.children,v=A?A.shapeFlag:0,R=P.children,{patchFlag:N,shapeFlag:H}=P;if(N>0){if(N&128){yt(x,R,S,it,J,Z,lt,q,F);return}else if(N&256){_t(x,R,S,it,J,Z,lt,q,F);return}}H&8?(v&16&&Et(x,J,Z),R!==x&&u(S,R)):v&16?H&16?yt(x,R,S,it,J,Z,lt,q,F):Et(x,J,Z,!0):(v&8&&u(S,""),H&16&&U(R,S,it,J,Z,lt,q,F))},_t=(A,P,S,it,J,Z,lt,q,F)=>{A=A||Is,P=P||Is;const x=A.length,v=P.length,R=Math.min(x,v);let N;for(N=0;N<R;N++){const H=P[N]=F?ii(P[N]):Fn(P[N]);_(A[N],H,S,null,J,Z,lt,q,F)}x>v?Et(A,J,Z,!0,!1,R):U(P,S,it,J,Z,lt,q,F,R)},yt=(A,P,S,it,J,Z,lt,q,F)=>{let x=0;const v=P.length;let R=A.length-1,N=v-1;for(;x<=R&&x<=N;){const H=A[x],G=P[x]=F?ii(P[x]):Fn(P[x]);if(cr(H,G))_(H,G,S,null,J,Z,lt,q,F);else break;x++}for(;x<=R&&x<=N;){const H=A[R],G=P[N]=F?ii(P[N]):Fn(P[N]);if(cr(H,G))_(H,G,S,null,J,Z,lt,q,F);else break;R--,N--}if(x>R){if(x<=N){const H=N+1,G=H<v?P[H].el:it;for(;x<=N;)_(null,P[x]=F?ii(P[x]):Fn(P[x]),S,G,J,Z,lt,q,F),x++}}else if(x>N)for(;x<=R;)Ut(A[x],J,Z,!0),x++;else{const H=x,G=x,gt=new Map;for(x=G;x<=N;x++){const Mt=P[x]=F?ii(P[x]):Fn(P[x]);Mt.key!=null&&gt.set(Mt.key,x)}let ht,dt=0;const Pt=N-G+1;let st=!1,pt=0;const bt=new Array(Pt);for(x=0;x<Pt;x++)bt[x]=0;for(x=H;x<=R;x++){const Mt=A[x];if(dt>=Pt){Ut(Mt,J,Z,!0);continue}let Bt;if(Mt.key!=null)Bt=gt.get(Mt.key);else for(ht=G;ht<=N;ht++)if(bt[ht-G]===0&&cr(Mt,P[ht])){Bt=ht;break}Bt===void 0?Ut(Mt,J,Z,!0):(bt[Bt-G]=x+1,Bt>=pt?pt=Bt:st=!0,_(Mt,P[Bt],S,null,J,Z,lt,q,F),dt++)}const kt=st?Fg(bt):Is;for(ht=kt.length-1,x=Pt-1;x>=0;x--){const Mt=G+x,Bt=P[Mt],Vt=P[Mt+1],Qt=Mt+1<v?Vt.el||zd(Vt):it;bt[x]===0?_(null,Bt,S,Qt,J,Z,lt,q,F):st&&(ht<0||x!==kt[ht]?Ct(Bt,S,Qt,2):ht--)}}},Ct=(A,P,S,it,J=null)=>{const{el:Z,type:lt,transition:q,children:F,shapeFlag:x}=A;if(x&6){Ct(A.component.subTree,P,S,it);return}if(x&128){A.suspense.move(P,S,it);return}if(x&64){lt.move(A,P,S,ut);return}if(lt===Le){i(Z,P,S);for(let R=0;R<F.length;R++)Ct(F[R],P,S,it);i(A.anchor,P,S);return}if(lt===Fo){T(A,P,S);return}if(it!==2&&x&1&&q)if(it===0)q.beforeEnter(Z),i(Z,P,S),Xe(()=>q.enter(Z),J);else{const{leave:R,delayLeave:N,afterLeave:H}=q,G=()=>{A.ctx.isUnmounted?s(Z):i(Z,P,S)},gt=()=>{Z._isLeaving&&Z[Jm](!0),R(Z,()=>{G(),H&&H()})};N?N(Z,G,gt):gt()}else i(Z,P,S)},Ut=(A,P,S,it=!1,J=!1)=>{const{type:Z,props:lt,ref:q,children:F,dynamicChildren:x,shapeFlag:v,patchFlag:R,dirs:N,cacheIndex:H,memo:G}=A;if(R===-2&&(J=!1),q!=null&&(hi(),wr(q,null,S,A,!0),fi()),H!=null&&(P.renderCache[H]=void 0),v&256){P.ctx.deactivate(A);return}const gt=v&1&&N,ht=!Rr(A);let dt;if(ht&&(dt=lt&&lt.onVnodeBeforeUnmount)&&Un(dt,P,A),v&6)mt(A.component,S,it);else{if(v&128){A.suspense.unmount(S,it);return}gt&&Ui(A,null,P,"beforeUnmount"),v&64?A.type.remove(A,P,S,ut,it):x&&!x.hasOnce&&(Z!==Le||R>0&&R&64)?Et(x,P,S,!1,!0):(Z===Le&&R&384||!J&&v&16)&&Et(F,P,S),it&&Zt(A)}const Pt=G!=null&&H==null;(ht&&(dt=lt&&lt.onVnodeUnmounted)||gt||Pt)&&Xe(()=>{dt&&Un(dt,P,A),gt&&Ui(A,null,P,"unmounted"),Pt&&(A.el=null)},S)},Zt=A=>{const{type:P,el:S,anchor:it,transition:J}=A;if(P===Le){ct(S,it);return}if(P===Fo){M(A);return}const Z=()=>{s(S),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(A.shapeFlag&1&&J&&!J.persisted){const{leave:lt,delayLeave:q}=J,F=()=>lt(S,Z);q?q(A.el,Z,F):F()}else Z()},ct=(A,P)=>{let S;for(;A!==P;)S=f(A),s(A),A=S;s(P)},mt=(A,P,S)=>{const{bum:it,scope:J,job:Z,subTree:lt,um:q,m:F,a:x}=A;Fu(F),Fu(x),it&&Ca(it),J.stop(),Z&&(Z.flags|=8,Ut(lt,A,P,S)),q&&Xe(q,P),Xe(()=>{A.isUnmounted=!0},P)},Et=(A,P,S,it=!1,J=!1,Z=0)=>{for(let lt=Z;lt<A.length;lt++)Ut(A[lt],P,S,it,J)},O=A=>{if(A.shapeFlag&6)return O(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const P=f(A.anchor||A.el),S=P&&P[Md];return S?f(S):P};let Y=!1;const k=(A,P,S)=>{let it;A==null?P._vnode&&(Ut(P._vnode,null,null,!0),it=P._vnode.component):_(P._vnode||null,A,P,null,null,null,S),P._vnode=A,Y||(Y=!0,bu(it),md(),Y=!1)},ut={p:_,um:Ut,m:Ct,r:Zt,mt:ot,mc:U,pc:$,pbc:E,n:O,o:n};return{render:k,hydrate:void 0,createApp:Mg(k)}}function Na({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Ni({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function Og(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Xc(n,t,e=!1){const i=n.children,s=t.children;if(Wt(i)&&Wt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ii(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Xc(o,a)),a.type===ya&&(a.patchFlag===-1&&(a=s[r]=ii(a)),a.el=o.el),a.type===Di&&!a.el&&(a.el=o.el)}}function Fg(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Bd(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Bd(t)}function Fu(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function zd(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?zd(t.subTree):null}const Hd=n=>n.__isSuspense;function Bg(n,t){t&&t.pendingBranch?Wt(n)?t.effects.push(...n):t.effects.push(n):Vm(n)}const Le=Symbol.for("v-fgt"),ya=Symbol.for("v-txt"),Di=Symbol.for("v-cmt"),Fo=Symbol.for("v-stc"),Pr=[];let hn=null;function Ot(n=!1){Pr.push(hn=n?null:[])}function zg(){Pr.pop(),hn=Pr[Pr.length-1]||null}let Or=1;function Zo(n,t=!1){Or+=n,n<0&&hn&&t&&(hn.hasOnce=!0)}function kd(n){return n.dynamicChildren=Or>0?hn||Is:null,zg(),Or>0&&hn&&hn.push(n),n}function Ht(n,t,e,i,s,r){return kd(K(n,t,e,i,s,r,!0))}function Fr(n,t,e,i,s){return kd(sn(n,t,e,i,s,!0))}function Jo(n){return n?n.__v_isVNode===!0:!1}function cr(n,t){return n.type===t.type&&n.key===t.key}const Vd=({key:n})=>n??null,Bo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?xe(n)||He(n)||qt(n)?{i:un,r:n,k:t,f:!!e}:n:null);function K(n,t=null,e=null,i=0,s=null,r=n===Le?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&Vd(t),ref:t&&Bo(t),scopeId:_d,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:un};return a?(jc(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=xe(e)?8:16),Or>0&&!o&&hn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&hn.push(l),l}const sn=Hg;function Hg(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===hg)&&(n=Di),Jo(n)){const a=js(n,t,!0);return e&&jc(a,e),Or>0&&!r&&hn&&(a.shapeFlag&6?hn[hn.indexOf(n)]=a:hn.push(a)),a.patchFlag=-2,a}if(Qg(n)&&(n=n.__vccOpts),t){t=kg(t);let{class:a,style:l}=t;a&&!xe(a)&&(t.class=Ji(a)),ue(l)&&(Hc(l)&&!Wt(l)&&(l=Ue({},l)),t.style=da(l))}const o=xe(n)?1:Hd(n)?128:Ym(n)?64:ue(n)?4:qt(n)?2:0;return K(n,t,e,i,s,o,r,!0)}function kg(n){return n?Hc(n)||Ld(n)?Ue({},n):n:null}function js(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?Gg(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Vd(c),ref:t&&t.ref?e&&r?Wt(r)?r.concat(Bo(t)):[r,Bo(t)]:Bo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Le?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&js(n.ssContent),ssFallback:n.ssFallback&&js(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Vc(u,l.clone(u)),u}function Il(n=" ",t=0){return sn(ya,null,n,t)}function Vg(n,t){const e=sn(Fo,null,n);return e.staticCount=t,e}function Ye(n="",t=!1){return t?(Ot(),Fr(Di,null,n)):sn(Di,null,n)}function Fn(n){return n==null||typeof n=="boolean"?sn(Di):Wt(n)?sn(Le,null,n.slice()):Jo(n)?ii(n):sn(ya,null,String(n))}function ii(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:js(n)}function jc(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Wt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),jc(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Ld(t)?t._ctx=un:s===3&&un&&(un.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else qt(t)?(t={default:t,_ctx:un},e=32):(t=String(t),i&64?(e=16,t=[Il(t)]):e=8);n.children=t,n.shapeFlag|=e}function Gg(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Ji([t.class,i.class]));else if(s==="style")t.style=da([t.style,i.style]);else if(la(s)){const r=t[s],o=i[s];o&&r!==o&&!(Wt(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ca(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Un(n,t,e,i=null){Vn(n,t,7,[e,i])}const Wg=wd();let Xg=0;function jg(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||Wg,r={uid:Xg++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new dm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ud(i,s),emitsOptions:Rd(i,s),emit:null,emitted:null,propsDefaults:fe,inheritAttrs:i.inheritAttrs,ctx:fe,data:fe,props:fe,attrs:fe,slots:fe,refs:fe,setupState:fe,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Sg.bind(null,r),n.ce&&n.ce(r),r}let Be=null;const qg=()=>Be||un;let Qo,Ul;{const n=fa(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Qo=t("__VUE_INSTANCE_SETTERS__",e=>Be=e),Ul=t("__VUE_SSR_SETTERS__",e=>Br=e)}const Xr=n=>{const t=Be;return Qo(n),n.scope.on(),()=>{n.scope.off(),Qo(t)}},Bu=()=>{Be&&Be.scope.off(),Qo(null)};function Gd(n){return n.vnode.shapeFlag&4}let Br=!1;function Yg(n,t=!1,e=!1){t&&Ul(t);const{props:i,children:s}=n.vnode,r=Gd(n);Rg(n,i,r,t),Lg(n,s,e||t);const o=r?$g(n,t):void 0;return t&&Ul(!1),o}function $g(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,dg);const{setup:i}=e;if(i){hi();const s=n.setupContext=i.length>1?Zg(n):null,r=Xr(n),o=Wr(i,n,0,[n.props,s]),a=Gf(o);if(fi(),r(),(a||n.sp)&&!Rr(n)&&yd(n),a){if(o.then(Bu,Bu),t)return o.then(l=>{zu(n,l)}).catch(l=>{ga(l,n,0)});n.asyncDep=o}else zu(n,o)}else Wd(n)}function zu(n,t,e){qt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ue(t)&&(n.setupState=fd(t)),Wd(n)}function Wd(n,t,e){const i=n.type;n.render||(n.render=i.render||Hn);{const s=Xr(n);hi();try{pg(n)}finally{fi(),s()}}}const Kg={get(n,t){return Fe(n,"get",""),n[t]}};function Zg(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,Kg),slots:n.slots,emit:n.emit,expose:t}}function Sa(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(fd(Im(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Cr)return Cr[e](n)},has(t,e){return e in t||e in Cr}})):n.proxy}function Jg(n,t=!0){return qt(n)?n.displayName||n.name:n.name||t&&n.__name}function Qg(n){return qt(n)&&"__vccOpts"in n}const ee=(n,t)=>Fm(n,t,Br);function Xd(n,t,e){try{Zo(-1);const i=arguments.length;return i===2?ue(t)&&!Wt(t)?Jo(t)?sn(n,null,[t]):sn(n,t):sn(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&Jo(e)&&(e=[e]),sn(n,t,e))}finally{Zo(1)}}const t_="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Nl;const Hu=typeof window<"u"&&window.trustedTypes;if(Hu)try{Nl=Hu.createPolicy("vue",{createHTML:n=>n})}catch{}const jd=Nl?n=>Nl.createHTML(n):n=>n,e_="http://www.w3.org/2000/svg",n_="http://www.w3.org/1998/Math/MathML",ni=typeof document<"u"?document:null,ku=ni&&ni.createElement("template"),i_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ni.createElementNS(e_,n):t==="mathml"?ni.createElementNS(n_,n):e?ni.createElement(n,{is:e}):ni.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ni.createTextNode(n),createComment:n=>ni.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ni.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{ku.innerHTML=jd(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=ku.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},s_=Symbol("_vtc");function r_(n,t,e){const i=n[s_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ta=Symbol("_vod"),qd=Symbol("_vsh"),o_={name:"show",beforeMount(n,{value:t},{transition:e}){n[ta]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):ur(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),ur(n,!0),i.enter(n)):i.leave(n,()=>{ur(n,!1)}):ur(n,t))},beforeUnmount(n,{value:t}){ur(n,t)}};function ur(n,t){n.style.display=t?n[ta]:"none",n[qd]=!t}const a_=Symbol(""),l_=/(?:^|;)\s*display\s*:/;function c_(n,t,e){const i=n.style,s=xe(e);let r=!1;if(e&&!s){if(t)if(xe(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&yr(i,a,"")}else for(const o in t)e[o]==null&&yr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?h_(n,o,!xe(t)&&t?t[o]:void 0,a)||yr(i,o,a):yr(i,o,"")}}else if(s){if(t!==e){const o=i[a_];o&&(e+=";"+o),i.cssText=e,r=l_.test(e)}}else t&&n.removeAttribute("style");ta in n&&(n[ta]=r?i.display:"",n[qd]&&(i.display="none"))}const Vu=/\s*!important$/;function yr(n,t,e){if(Wt(e))e.forEach(i=>yr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=u_(n,t);Vu.test(e)?n.setProperty(ss(i),e.replace(Vu,""),"important"):n[i]=e}}const Gu=["Webkit","Moz","ms"],Oa={};function u_(n,t){const e=Oa[t];if(e)return e;let i=Ke(t);if(i!=="filter"&&i in n)return Oa[t]=i;i=ha(i);for(let s=0;s<Gu.length;s++){const r=Gu[s]+i;if(r in n)return Oa[t]=r}return t}function h_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&xe(i)&&e===i}const Wu="http://www.w3.org/1999/xlink";function Xu(n,t,e,i,s,r=hm(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Wu,t.slice(6,t.length)):n.setAttributeNS(Wu,t,e):e==null||r&&!qf(e)?n.removeAttribute(t):n.setAttribute(t,r?"":kn(e)?String(e):e)}function ju(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?jd(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=qf(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function f_(n,t,e,i){n.addEventListener(t,e,i)}function d_(n,t,e,i){n.removeEventListener(t,e,i)}const qu=Symbol("_vei");function p_(n,t,e,i,s=null){const r=n[qu]||(n[qu]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=m_(t);if(i){const c=r[t]=v_(i,s);f_(n,a,c,l)}else o&&(d_(n,a,o,l),r[t]=void 0)}}const Yu=/(?:Once|Passive|Capture)$/;function m_(n){let t;if(Yu.test(n)){t={};let i;for(;i=n.match(Yu);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ss(n.slice(2)),t]}let Fa=0;const g_=Promise.resolve(),__=()=>Fa||(g_.then(()=>Fa=0),Fa=Date.now());function v_(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Vn(x_(i,e.value),t,5,[i])};return e.value=n,e.attached=__(),e}function x_(n,t){if(Wt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const $u=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,M_=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?r_(n,i,o):t==="style"?c_(n,e,i):la(t)?ca(t)||p_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):y_(n,t,i,o))?(ju(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Xu(n,t,i,o,r,t!=="value")):n._isVueCE&&(S_(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!xe(i)))?ju(n,Ke(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Xu(n,t,i,o))};function y_(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&$u(t)&&qt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return $u(t)&&xe(e)?!1:t in n}function S_(n,t){const e=n._def.props;if(!e)return!1;const i=Ke(t);return Array.isArray(e)?e.some(s=>Ke(s)===i):Object.keys(e).some(s=>Ke(s)===i)}const E_=["ctrl","shift","alt","meta"],b_={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>E_.some(e=>n[`${e}Key`]&&!t.includes(e))},Fs=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=b_[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},T_=Ue({patchProp:M_},i_);let Ku;function A_(){return Ku||(Ku=Ug(T_))}const w_=((...n)=>{const t=A_().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=C_(i);if(!s)return;const r=t._component;!qt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,R_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function R_(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function C_(n){return xe(n)?document.querySelector(n):n}const rs=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},P_={};function D_(n,t){const e=ug("router-view");return Ot(),Fr(e)}const L_=rs(P_,[["render",D_]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const ws=typeof document<"u";function Yd(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function I_(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Yd(n.default)}const oe=Object.assign;function Ba(n,t){const e={};for(const i in t){const s=t[i];e[i]=Ln(s)?s.map(n):n(s)}return e}const Dr=()=>{},Ln=Array.isArray;function Zu(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const $d=/#/g,U_=/&/g,N_=/\//g,O_=/=/g,F_=/\?/g,Kd=/\+/g,B_=/%5B/g,z_=/%5D/g,Zd=/%5E/g,H_=/%60/g,Jd=/%7B/g,k_=/%7C/g,Qd=/%7D/g,V_=/%20/g;function qc(n){return n==null?"":encodeURI(""+n).replace(k_,"|").replace(B_,"[").replace(z_,"]")}function G_(n){return qc(n).replace(Jd,"{").replace(Qd,"}").replace(Zd,"^")}function Ol(n){return qc(n).replace(Kd,"%2B").replace(V_,"+").replace($d,"%23").replace(U_,"%26").replace(H_,"`").replace(Jd,"{").replace(Qd,"}").replace(Zd,"^")}function W_(n){return Ol(n).replace(O_,"%3D")}function X_(n){return qc(n).replace($d,"%23").replace(F_,"%3F")}function j_(n){return X_(n).replace(N_,"%2F")}function zr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const q_=/\/$/,Y_=n=>n.replace(q_,"");function za(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=J_(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:zr(o)}}function $_(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function Ju(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function K_(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&qs(t.matched[i],e.matched[s])&&tp(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function qs(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function tp(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!Z_(n[e],t[e]))return!1;return!0}function Z_(n,t){return Ln(n)?Qu(n,t):Ln(t)?Qu(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function Qu(n,t){return Ln(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function J_(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const _i={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Fl=(function(n){return n.pop="pop",n.push="push",n})({}),Ha=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function Q_(n){if(!n)if(ws){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Y_(n)}const tv=/^[^#]+#/;function ev(n,t){return n.replace(tv,"#")+t}function nv(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const Ea=()=>({left:window.scrollX,top:window.scrollY});function iv(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=nv(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function th(n,t){return(history.state?history.state.position-t:-1)+n}const Bl=new Map;function sv(n,t){Bl.set(n,t)}function rv(n){const t=Bl.get(n);return Bl.delete(n),t}function ov(n){return typeof n=="string"||n&&typeof n=="object"}function ep(n){return typeof n=="string"||typeof n=="symbol"}let Me=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const np=Symbol("");Me.MATCHER_NOT_FOUND+"",Me.NAVIGATION_GUARD_REDIRECT+"",Me.NAVIGATION_ABORTED+"",Me.NAVIGATION_CANCELLED+"",Me.NAVIGATION_DUPLICATED+"";function Ys(n,t){return oe(new Error,{type:n,[np]:!0},t)}function $n(n,t){return n instanceof Error&&np in n&&(t==null||!!(n.type&t))}const av=["params","query","hash"];function lv(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of av)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function cv(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(Kd," "),r=s.indexOf("="),o=zr(r<0?s:s.slice(0,r)),a=r<0?null:zr(s.slice(r+1));if(o in t){let l=t[o];Ln(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function eh(n){let t="";for(let e in n){const i=n[e];if(e=W_(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(Ln(i)?i.map(s=>s&&Ol(s)):[i&&Ol(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function uv(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=Ln(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const hv=Symbol(""),nh=Symbol(""),jr=Symbol(""),Yc=Symbol(""),zl=Symbol("");function hr(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function Ai(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=f=>{f===!1?l(Ys(Me.NAVIGATION_ABORTED,{from:e,to:t})):f instanceof Error?l(f):ov(f)?l(Ys(Me.NAVIGATION_GUARD_REDIRECT,{from:t,to:f})):(o&&i.enterCallbacks[s]===o&&typeof f=="function"&&o.push(f),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let h=Promise.resolve(u);n.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function ka(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Yd(l)){const c=(l.__vccOpts||l)[t];c&&r.push(Ai(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=I_(u)?u.default:u;o.mods[a]=u,o.components[a]=h;const f=(h.__vccOpts||h)[t];return f&&Ai(f,e,i,o,a,s)()}))}}return r}function fv(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>qs(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>qs(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let dv=()=>location.protocol+"//"+location.host;function ip(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),Ju(a,"")}return Ju(e,n)+i+s}function pv(n,t,e,i){let s=[],r=[],o=null;const a=({state:f})=>{const p=ip(n,location),g=e.value,_=t.value;let m=0;if(f){if(e.value=p,t.value=f,o&&o===g){o=null;return}m=_?f.position-_.position:0}else i(p);s.forEach(d=>{d(e.value,g,{delta:m,type:Fl.pop,direction:m?m>0?Ha.forward:Ha.back:Ha.unknown})})};function l(){o=e.value}function c(f){s.push(f);const p=()=>{const g=s.indexOf(f);g>-1&&s.splice(g,1)};return r.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(oe({},f.state,{scroll:Ea()}),"")}}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:h}}function ih(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?Ea():null}}function mv(n){const{history:t,location:e}=window,i={value:ip(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const h=n.indexOf("#"),f=h>-1?(e.host&&document.querySelector("base")?n:n.slice(h))+l:dv()+n+l;try{t[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(p){console.error(p),e[u?"replace":"assign"](f)}}function o(l,c){r(l,oe({},t.state,ih(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=oe({},s.value,t.state,{forward:l,scroll:Ea()});r(u.current,u,!0),r(l,oe({},ih(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function gv(n){n=Q_(n);const t=mv(n),e=pv(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=oe({location:"",base:n,go:i,createHref:ev.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function _v(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),gv(n)}let qi=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Ae=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Ae||{});const vv={type:qi.Static,value:""},xv=/[a-zA-Z0-9_]/;function Mv(n){if(!n)return[[]];if(n==="/")return[[vv]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(p){throw new Error(`ERR (${e})/"${c}": ${p}`)}let e=Ae.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function h(){c&&(e===Ae.Static?r.push({type:qi.Static,value:c}):e===Ae.Param||e===Ae.ParamRegExp||e===Ae.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:qi.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==Ae.ParamRegExp){i=e,e=Ae.EscapeNext;continue}switch(e){case Ae.Static:l==="/"?(c&&h(),o()):l===":"?(h(),e=Ae.Param):f();break;case Ae.EscapeNext:f(),e=i;break;case Ae.Param:l==="("?e=Ae.ParamRegExp:xv.test(l)?f():(h(),e=Ae.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Ae.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=Ae.ParamRegExpEnd:u+=l;break;case Ae.ParamRegExpEnd:h(),e=Ae.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===Ae.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),h(),o(),s}const sh="[^/]+?",yv={sensitive:!1,strict:!1,start:!0,end:!0};var je=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(je||{});const Sv=/[.+*?^${}()[\]/\\]/g;function Ev(n,t){const e=oe({},yv,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[je.Root];e.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=je.Segment+(e.sensitive?je.BonusCaseSensitive:0);if(f.type===qi.Static)h||(s+="/"),s+=f.value.replace(Sv,"\\$&"),p+=je.Static;else if(f.type===qi.Param){const{value:g,repeatable:_,optional:m,regexp:d}=f;r.push({name:g,repeatable:_,optional:m});const y=d||sh;if(y!==sh){p+=je.BonusCustomRegExp;try{`${y}`}catch(M){throw new Error(`Invalid custom RegExp for param "${g}" (${y}): `+M.message)}}let T=_?`((?:${y})(?:/(?:${y}))*)`:`(${y})`;h||(T=m&&c.length<2?`(?:/${T})`:"/"+T),m&&(T+="?"),s+=T,p+=je.Dynamic,m&&(p+=je.BonusOptional),_&&(p+=je.BonusRepeatable),y===".*"&&(p+=je.BonusWildcard)}u.push(p)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=je.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",g=r[f-1];h[g.name]=p&&g.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of n){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===qi.Static)u+=p.value;else if(p.type===qi.Param){const{value:g,repeatable:_,optional:m}=p,d=g in c?c[g]:"";if(Ln(d)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const y=Ln(d)?d.join("/"):d;if(!y)if(m)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${g}"`);u+=y}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function bv(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===je.Static+je.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===je.Static+je.Segment?1:-1:0}function sp(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=bv(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(rh(i))return 1;if(rh(s))return-1}return s.length-i.length}function rh(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const Tv={strict:!1,end:!0,sensitive:!1};function Av(n,t,e){const i=Ev(Mv(n.path),e),s=oe(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function wv(n,t){const e=[],i=new Map;t=Zu(Tv,t);function s(h){return i.get(h)}function r(h,f,p){const g=!p,_=ah(h);_.aliasOf=p&&p.record;const m=Zu(t,h),d=[_];if("alias"in h){const M=typeof h.alias=="string"?[h.alias]:h.alias;for(const L of M)d.push(ah(oe({},_,{components:p?p.record.components:_.components,path:L,aliasOf:p?p.record:_})))}let y,T;for(const M of d){const{path:L}=M;if(f&&L[0]!=="/"){const I=f.record.path,C=I[I.length-1]==="/"?"":"/";M.path=f.record.path+(L&&C+L)}if(y=Av(M,f,m),p?p.alias.push(y):(T=T||y,T!==y&&T.alias.push(y),g&&h.name&&!lh(y)&&o(h.name)),rp(y)&&l(y),_.children){const I=_.children;for(let C=0;C<I.length;C++)r(I[C],y,p&&p.children[C])}p=p||y}return T?()=>{o(T)}:Dr}function o(h){if(ep(h)){const f=i.get(h);f&&(i.delete(h),e.splice(e.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=e.indexOf(h);f>-1&&(e.splice(f,1),h.record.name&&i.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return e}function l(h){const f=Pv(h,e);e.splice(f,0,h),h.record.name&&!lh(h)&&i.set(h.record.name,h)}function c(h,f){let p,g={},_,m;if("name"in h&&h.name){if(p=i.get(h.name),!p)throw Ys(Me.MATCHER_NOT_FOUND,{location:h});m=p.record.name,g=oe(oh(f.params,p.keys.filter(T=>!T.optional).concat(p.parent?p.parent.keys.filter(T=>T.optional):[]).map(T=>T.name)),h.params&&oh(h.params,p.keys.map(T=>T.name))),_=p.stringify(g)}else if(h.path!=null)_=h.path,p=e.find(T=>T.re.test(_)),p&&(g=p.parse(_),m=p.record.name);else{if(p=f.name?i.get(f.name):e.find(T=>T.re.test(f.path)),!p)throw Ys(Me.MATCHER_NOT_FOUND,{location:h,currentLocation:f});m=p.record.name,g=oe({},f.params,h.params),_=p.stringify(g)}const d=[];let y=p;for(;y;)d.unshift(y.record),y=y.parent;return{name:m,path:_,params:g,matched:d,meta:Cv(d)}}n.forEach(h=>r(h));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function oh(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function ah(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Rv(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Rv(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function lh(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function Cv(n){return n.reduce((t,e)=>oe(t,e.meta),{})}function Pv(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;sp(n,t[r])<0?i=r:e=r+1}const s=Dv(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function Dv(n){let t=n;for(;t=t.parent;)if(rp(t)&&sp(n,t)===0)return t}function rp({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function ch(n){const t=xn(jr),e=xn(Yc),i=ee(()=>{const l=rn(n.to);return t.resolve(l)}),s=ee(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],h=e.matched;if(!u||!h.length)return-1;const f=h.findIndex(qs.bind(null,u));if(f>-1)return f;const p=uh(l[c-2]);return c>1&&uh(u)===p&&h[h.length-1].path!==p?h.findIndex(qs.bind(null,l[c-2])):f}),r=ee(()=>s.value>-1&&Ov(e.params,i.value.params)),o=ee(()=>s.value>-1&&s.value===e.matched.length-1&&tp(e.params,i.value.params));function a(l={}){if(Nv(l)){const c=t[rn(n.replace)?"replace":"push"](rn(n.to)).catch(Dr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:ee(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function Lv(n){return n.length===1?n[0]:n}const Iv=Ii({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:ch,setup(n,{slots:t}){const e=ma(ch(n)),{options:i}=xn(jr),s=ee(()=>({[hh(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[hh(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&Lv(t.default(e));return n.custom?r:Xd("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),Uv=Iv;function Nv(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function Ov(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!Ln(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function uh(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const hh=(n,t,e)=>n??t??e,Fv=Ii({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=xn(zl),s=ee(()=>n.route||i.value),r=xn(nh,0),o=ee(()=>{let c=rn(r);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=ee(()=>s.value.matched[o.value]);Oo(nh,ee(()=>o.value+1)),Oo(hv,a),Oo(zl,s);const l=Jt();return Mn(()=>[l.value,a.value,n.name],([c,u,h],[f,p,g])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!qs(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,h=a.value,f=h&&h.components[u];if(!f)return fh(e.default,{Component:f,route:c});const p=h.props[u],g=p?p===!0?c.params:typeof p=="function"?p(c):p:null,m=Xd(f,oe({},g,t,{onVnodeUnmounted:d=>{d.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return fh(e.default,{Component:m,route:c})||m}}});function fh(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const Bv=Fv;function zv(n){const t=wv(n.routes,n),e=n.parseQuery||cv,i=n.stringifyQuery||eh,s=n.history,r=hr(),o=hr(),a=hr(),l=Xs(_i);let c=_i;ws&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Ba.bind(null,O=>""+O),h=Ba.bind(null,j_),f=Ba.bind(null,zr);function p(O,Y){let k,ut;return ep(O)?(k=t.getRecordMatcher(O),ut=Y):ut=O,t.addRoute(ut,k)}function g(O){const Y=t.getRecordMatcher(O);Y&&t.removeRoute(Y)}function _(){return t.getRoutes().map(O=>O.record)}function m(O){return!!t.getRecordMatcher(O)}function d(O,Y){if(Y=oe({},Y||l.value),typeof O=="string"){const S=za(e,O,Y.path),it=t.resolve({path:S.path},Y),J=s.createHref(S.fullPath);return oe(S,it,{params:f(it.params),hash:zr(S.hash),redirectedFrom:void 0,href:J})}let k;if(O.path!=null)k=oe({},O,{path:za(e,O.path,Y.path).path});else{const S=oe({},O.params);for(const it in S)S[it]==null&&delete S[it];k=oe({},O,{params:h(S)}),Y.params=h(Y.params)}const ut=t.resolve(k,Y),xt=O.hash||"";ut.params=u(f(ut.params));const A=$_(i,oe({},O,{hash:G_(xt),path:ut.path})),P=s.createHref(A);return oe({fullPath:A,hash:xt,query:i===eh?uv(O.query):O.query||{}},ut,{redirectedFrom:void 0,href:P})}function y(O){return typeof O=="string"?za(e,O,l.value.path):oe({},O)}function T(O,Y){if(c!==O)return Ys(Me.NAVIGATION_CANCELLED,{from:Y,to:O})}function M(O){return C(O)}function L(O){return M(oe(y(O),{replace:!0}))}function I(O,Y){const k=O.matched[O.matched.length-1];if(k&&k.redirect){const{redirect:ut}=k;let xt=typeof ut=="function"?ut(O,Y):ut;return typeof xt=="string"&&(xt=xt.includes("?")||xt.includes("#")?xt=y(xt):{path:xt},xt.params={}),oe({query:O.query,hash:O.hash,params:xt.path!=null?{}:O.params},xt)}}function C(O,Y){const k=c=d(O),ut=l.value,xt=O.state,A=O.force,P=O.replace===!0,S=I(k,ut);if(S)return C(oe(y(S),{state:typeof S=="object"?oe({},xt,S.state):xt,force:A,replace:P}),Y||k);const it=k;it.redirectedFrom=Y;let J;return!A&&K_(i,ut,k)&&(J=Ys(Me.NAVIGATION_DUPLICATED,{to:it,from:ut}),Ct(ut,ut,!0,!1)),(J?Promise.resolve(J):E(it,ut)).catch(Z=>$n(Z)?$n(Z,Me.NAVIGATION_GUARD_REDIRECT)?Z:yt(Z):$(Z,it,ut)).then(Z=>{if(Z){if($n(Z,Me.NAVIGATION_GUARD_REDIRECT))return C(oe({replace:P},y(Z.to),{state:typeof Z.to=="object"?oe({},xt,Z.to.state):xt,force:A}),Y||it)}else Z=B(it,ut,!0,P,xt);return D(it,ut,Z),Z})}function U(O,Y){const k=T(O,Y);return k?Promise.reject(k):Promise.resolve()}function w(O){const Y=ct.values().next().value;return Y&&typeof Y.runWithContext=="function"?Y.runWithContext(O):O()}function E(O,Y){let k;const[ut,xt,A]=fv(O,Y);k=ka(ut.reverse(),"beforeRouteLeave",O,Y);for(const S of ut)S.leaveGuards.forEach(it=>{k.push(Ai(it,O,Y))});const P=U.bind(null,O,Y);return k.push(P),Et(k).then(()=>{k=[];for(const S of r.list())k.push(Ai(S,O,Y));return k.push(P),Et(k)}).then(()=>{k=ka(xt,"beforeRouteUpdate",O,Y);for(const S of xt)S.updateGuards.forEach(it=>{k.push(Ai(it,O,Y))});return k.push(P),Et(k)}).then(()=>{k=[];for(const S of A)if(S.beforeEnter)if(Ln(S.beforeEnter))for(const it of S.beforeEnter)k.push(Ai(it,O,Y));else k.push(Ai(S.beforeEnter,O,Y));return k.push(P),Et(k)}).then(()=>(O.matched.forEach(S=>S.enterCallbacks={}),k=ka(A,"beforeRouteEnter",O,Y,w),k.push(P),Et(k))).then(()=>{k=[];for(const S of o.list())k.push(Ai(S,O,Y));return k.push(P),Et(k)}).catch(S=>$n(S,Me.NAVIGATION_CANCELLED)?S:Promise.reject(S))}function D(O,Y,k){a.list().forEach(ut=>w(()=>ut(O,Y,k)))}function B(O,Y,k,ut,xt){const A=T(O,Y);if(A)return A;const P=Y===_i,S=ws?history.state:{};k&&(ut||P?s.replace(O.fullPath,oe({scroll:P&&S&&S.scroll},xt)):s.push(O.fullPath,xt)),l.value=O,Ct(O,Y,k,P),yt()}let V;function ot(){V||(V=s.listen((O,Y,k)=>{if(!mt.listening)return;const ut=d(O),xt=I(ut,mt.currentRoute.value);if(xt){C(oe(xt,{replace:!0,force:!0}),ut).catch(Dr);return}c=ut;const A=l.value;ws&&sv(th(A.fullPath,k.delta),Ea()),E(ut,A).catch(P=>$n(P,Me.NAVIGATION_ABORTED|Me.NAVIGATION_CANCELLED)?P:$n(P,Me.NAVIGATION_GUARD_REDIRECT)?(C(oe(y(P.to),{force:!0}),ut).then(S=>{$n(S,Me.NAVIGATION_ABORTED|Me.NAVIGATION_DUPLICATED)&&!k.delta&&k.type===Fl.pop&&s.go(-1,!1)}).catch(Dr),Promise.reject()):(k.delta&&s.go(-k.delta,!1),$(P,ut,A))).then(P=>{P=P||B(ut,A,!1),P&&(k.delta&&!$n(P,Me.NAVIGATION_CANCELLED)?s.go(-k.delta,!1):k.type===Fl.pop&&$n(P,Me.NAVIGATION_ABORTED|Me.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),D(ut,A,P)}).catch(Dr)}))}let at=hr(),tt=hr(),Q;function $(O,Y,k){yt(O);const ut=tt.list();return ut.length?ut.forEach(xt=>xt(O,Y,k)):console.error(O),Promise.reject(O)}function _t(){return Q&&l.value!==_i?Promise.resolve():new Promise((O,Y)=>{at.add([O,Y])})}function yt(O){return Q||(Q=!O,ot(),at.list().forEach(([Y,k])=>O?k(O):Y()),at.reset()),O}function Ct(O,Y,k,ut){const{scrollBehavior:xt}=n;if(!ws||!xt)return Promise.resolve();const A=!k&&rv(th(O.fullPath,0))||(ut||!k)&&history.state&&history.state.scroll||null;return Qi().then(()=>xt(O,Y,A)).then(P=>P&&iv(P)).catch(P=>$(P,O,Y))}const Ut=O=>s.go(O);let Zt;const ct=new Set,mt={currentRoute:l,listening:!0,addRoute:p,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:_,resolve:d,options:n,push:M,replace:L,go:Ut,back:()=>Ut(-1),forward:()=>Ut(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:tt.add,isReady:_t,install(O){O.component("RouterLink",Uv),O.component("RouterView",Bv),O.config.globalProperties.$router=mt,Object.defineProperty(O.config.globalProperties,"$route",{enumerable:!0,get:()=>rn(l)}),ws&&!Zt&&l.value===_i&&(Zt=!0,M(s.location).catch(ut=>{}));const Y={};for(const ut in _i)Object.defineProperty(Y,ut,{get:()=>l.value[ut],enumerable:!0});O.provide(jr,mt),O.provide(Yc,ud(Y)),O.provide(zl,l);const k=O.unmount;ct.add(O),O.unmount=function(){ct.delete(O),ct.size<1&&(c=_i,V&&V(),V=null,l.value=_i,Zt=!1,Q=!1),k()}}};function Et(O){return O.reduce((Y,k)=>Y.then(()=>w(k)),Promise.resolve())}return mt}function qr(){return xn(jr)}function op(n){return xn(Yc)}const Lr=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],ea="galaxy_majors";function ap(){var e;const n={type:"close",source:"galaxy-h5"},t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}const Hv={class:"select-page"},kv={class:"picked","aria-live":"polite"},Vv={class:"picked-row"},Gv={class:"value"},Wv={class:"picked-row"},Xv={class:"value"},jv={class:"grid"},qv=["onClick"],Yv={class:"card-title"},$v={class:"card-tag"},Kv={class:"footer"},Zv=["disabled"],Jv={key:0,class:"toast",role:"status"},Qv=Ii({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=qr(),i=Jt(null),s=Jt(null),r=Jt(""),o=ee(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(h){r.value=h,window.setTimeout(()=>{r.value=""},1800)}function l(h){if(h===i.value){i.value=null;return}if(h===s.value){s.value=null;return}if(!i.value){i.value=h;return}if(!s.value){if(h===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=h;return}s.value=h}function c(){if(!o.value)return;const h={fromId:i.value,toId:s.value};sessionStorage.setItem(ea,JSON.stringify(h)),e.push({name:"galaxy"})}function u(){ap()}return(h,f)=>{var p,g;return Ot(),Ht("div",Hv,[f[4]||(f[4]=K("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),K("div",{class:"custom-nav"},[K("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[K("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),f[0]||(f[0]=K("div",{class:"nav-title"},"专业星系",-1)),f[1]||(f[1]=K("div",{class:"nav-right"},null,-1))]),f[5]||(f[5]=Vg('<div class="nav-spacer" data-v-500dcac5></div><header class="header" data-v-500dcac5><p class="eyebrow" data-v-500dcac5>专业交叉星系</p><h1 class="title" data-v-500dcac5>选择你的星域</h1><p class="subtitle" data-v-500dcac5>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),K("section",kv,[K("div",Vv,[f[2]||(f[2]=K("span",{class:"label"},"主修 / 起点",-1)),K("span",Gv,zt(i.value?(p=rn(Lr).find(_=>_.id===i.value))==null?void 0:p.label:"未选择"),1)]),K("div",Wv,[f[3]||(f[3]=K("span",{class:"label"},"交叉意向",-1)),K("span",Xv,zt(s.value?(g=rn(Lr).find(_=>_.id===s.value))==null?void 0:g.label:"未选择"),1)])]),K("div",jv,[(Ot(!0),Ht(Le,null,ts(rn(Lr),_=>(Ot(),Ht("button",{key:_.id,type:"button",class:Ji(["card",{"is-from":_.id===i.value,"is-to":_.id===s.value}]),onClick:m=>l(_.id)},[K("span",Yv,zt(_.label),1),K("span",$v,zt(_.tagline),1)],10,qv))),128))]),K("footer",Kv,[K("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,Zv)]),r.value?(Ot(),Ht("div",Jv,zt(r.value),1)):Ye("",!0)])}}}),t0=rs(Qv,[["__scopeId","data-v-500dcac5"]]);function e0(){if(typeof window<"u"){const n=window.__GALAXY_API_BASE__;if(n!=null&&String(n).trim()!=="")return String(n).trim().replace(/\/+$/,"")}return"./mock"}function Rs(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function dh(n="/mock"){const t=Rs("manifest.json",n),e=await fetch(t).then(h=>{if(!h.ok)throw new Error(`manifest ${h.status}`);return h.json()}),i=Rs(e.nodes_url,n),s=Rs(e.edges_url,n),r=Rs(e.hyperedges_url,n),o=Rs(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(h=>{if(!h.ok)throw new Error(`nodes ${h.status}`);return h.json()}),fetch(s).then(h=>{if(!h.ok)throw new Error(`edges ${h.status}`);return h.json()}),fetch(r).then(h=>{if(!h.ok)throw new Error(`hyperedges ${h.status}`);return h.json()}),fetch(o).then(h=>{if(!h.ok)throw new Error(`layout ${h.status}`);return h.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function ph(n="/mock"){const t=Rs("recommend.json",n),e=await fetch(t);if(!e.ok)throw new Error(`recommend ${e.status}`);return e.json()}function n0(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function Zi(n,t){const e=[],i=new Set;for(const s of t)if(s.member_node_ids.includes(n)){e.push(s.id);for(const r of s.member_node_ids)i.add(r)}return{hyperedgeIds:e,memberIds:i}}const lp="offercat_personal_starlit_v1",Bs=50,oo=50;function Va(){return{v:1,byFusionId:{},updatedAt:Date.now()}}function cp(){try{const n=localStorage.getItem(lp);if(!n)return Va();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||typeof t.byFusionId!="object"?Va():t}catch{return Va()}}function i0(n){n.updatedAt=Date.now();try{localStorage.setItem(lp,JSON.stringify(n))}catch{}}function $c(n){var e;const t=((e=cp().byFusionId[n])==null?void 0:e.starsLit)??0;return Math.min(Bs,Math.max(0,Math.floor(t)))}function Kc(n){const t=n.filter(i=>i.type==="fusion");if(!t.length)return 0;const e=t.reduce((i,s)=>i+$c(s.id),0);return Math.min(1,e/(t.length*Bs))}function s0(n){const t=cp(),e=t.byFusionId[n],i=(e==null?void 0:e.starsLit)??0,s=Math.min(Bs,i+1);return t.byFusionId[n]={starsLit:s,lastQuestionIndex:((e==null?void 0:e.lastQuestionIndex)??0)+1,updatedAt:Date.now()},i0(t),s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zc="170",zs={ROTATE:0,DOLLY:1,PAN:2},Cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},r0=0,mh=1,o0=2,up=1,a0=2,ei=3,Li=0,on=1,An=2,li=0,Hs=1,ks=2,gh=3,_h=4,l0=5,Xi=100,c0=101,u0=102,h0=103,f0=104,d0=200,p0=201,m0=202,g0=203,Hl=204,kl=205,_0=206,v0=207,x0=208,M0=209,y0=210,S0=211,E0=212,b0=213,T0=214,Vl=0,Gl=1,Wl=2,$s=3,Xl=4,jl=5,ql=6,Yl=7,hp=0,A0=1,w0=2,Pi=0,fp=1,dp=2,pp=3,Jc=4,R0=5,mp=6,gp=7,_p=300,Ks=301,Zs=302,$l=303,Kl=304,ba=306,Hr=1e3,Yi=1001,Zl=1002,fn=1003,C0=1004,ao=1005,Rn=1006,Ga=1007,Ci=1008,Gn=1009,vp=1010,xp=1011,kr=1012,Qc=1013,es=1014,oi=1015,ci=1016,tu=1017,eu=1018,Js=1020,Mp=35902,yp=1021,Sp=1022,_n=1023,Ep=1024,bp=1025,Vs=1026,Qs=1027,Tp=1028,nu=1029,Ap=1030,iu=1031,su=1033,zo=33776,Ho=33777,ko=33778,Vo=33779,Jl=35840,Ql=35841,tc=35842,ec=35843,nc=36196,ic=37492,sc=37496,rc=37808,oc=37809,ac=37810,lc=37811,cc=37812,uc=37813,hc=37814,fc=37815,dc=37816,pc=37817,mc=37818,gc=37819,_c=37820,vc=37821,Go=36492,xc=36494,Mc=36495,wp=36283,yc=36284,Sc=36285,Ec=36286,P0=3200,D0=3201,Rp=0,L0=1,Ri="",nn="srgb",nr="srgb-linear",Ta="linear",ce="srgb",hs=7680,vh=519,I0=512,U0=513,N0=514,Cp=515,O0=516,F0=517,B0=518,z0=519,xh=35044,Mh="300 es",ai=2e3,na=2001;class os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wo=Math.PI/180,bc=180/Math.PI;function Yr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function $e(n,t,e){return Math.max(t,Math.min(e,n))}function H0(n,t){return(n%t+t)%t}function Wa(n,t,e){return(1-e)*n+e*t}function fr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function tn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const k0={DEG2RAD:Wo};class Ft{constructor(t=0,e=0){Ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,i,s,r,o,a,l,c){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=s[0],m=s[3],d=s[6],y=s[1],T=s[4],M=s[7],L=s[2],I=s[5],C=s[8];return r[0]=o*_+a*y+l*L,r[3]=o*m+a*T+l*I,r[6]=o*d+a*M+l*C,r[1]=c*_+u*y+h*L,r[4]=c*m+u*T+h*I,r[7]=c*d+u*M+h*C,r[2]=f*_+p*y+g*L,r[5]=f*m+p*T+g*I,r[8]=f*d+p*M+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,p=c*r-o*l,g=e*h+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=f*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xa.makeScale(t,e)),this}rotate(t){return this.premultiply(Xa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Xa=new $t;function Pp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ia(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function V0(){const n=ia("canvas");return n.style.display="block",n}const yh={};function Sr(n){n in yh||(yh[n]=!0,console.warn(n))}function G0(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function W0(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function X0(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const te={enabled:!0,workingColorSpace:nr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(n.r=ui(n.r),n.g=ui(n.g),n.b=ui(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(n.r=Gs(n.r),n.g=Gs(n.g),n.b=Gs(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ri?Ta:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Sh=[.64,.33,.3,.6,.15,.06],Eh=[.2126,.7152,.0722],bh=[.3127,.329],Th=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ah=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);te.define({[nr]:{primaries:Sh,whitePoint:bh,transfer:Ta,toXYZ:Th,fromXYZ:Ah,luminanceCoefficients:Eh,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:Sh,whitePoint:bh,transfer:ce,toXYZ:Th,fromXYZ:Ah,luminanceCoefficients:Eh,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}});let fs;class j0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{fs===void 0&&(fs=ia("canvas")),fs.width=t.width,fs.height=t.height;const i=fs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=fs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ia("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ui(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ui(e[i]/255)*255):e[i]=ui(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let q0=0;class Dp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=Yr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ja(s[o].image)):r.push(ja(s[o]))}else r=ja(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ja(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?j0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Y0=0;class Ze extends os{constructor(t=Ze.DEFAULT_IMAGE,e=Ze.DEFAULT_MAPPING,i=Yi,s=Yi,r=Rn,o=Ci,a=_n,l=Gn,c=Ze.DEFAULT_ANISOTROPY,u=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=Yr(),this.name="",this.source=new Dp(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_p)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hr:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case Zl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hr:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case Zl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ze.DEFAULT_IMAGE=null;Ze.DEFAULT_MAPPING=_p;Ze.DEFAULT_ANISOTROPY=1;class ye{constructor(t=0,e=0,i=0,s=1){ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,M=(p+1)/2,L=(d+1)/2,I=(u+f)/4,C=(h+_)/4,U=(g+m)/4;return T>M&&T>L?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=I/i,r=C/i):M>L?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=I/s,r=U/s):L<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),i=C/r,s=U/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(h-_)/y,this.z=(f-u)/y,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $0 extends os{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ze(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Dp(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends $0{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Lp extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class K0 extends Ze{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let m=1-a;const d=l*f+c*p+u*g+h*_,y=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){const L=Math.sqrt(T),I=Math.atan2(L,d*y);m=Math.sin(m*I)/L,a=Math.sin(a*I)/L}const M=a*y;if(l=l*m+f*M,c=c*m+p*M,u=u*m+g*M,h=h*m+_*M,m===1-a){const L=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=L,c*=L,u*=L,h*=L}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-a*p,t[e+2]=c*g+u*p+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($e(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(t=0,e=0,i=0){X.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return qa.copy(this).projectOnVector(t),this.sub(qa)}reflect(t){return this.sub(qa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qa=new X,wh=new ns;class is{constructor(t=new X(1/0,1/0,1/0),e=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),lo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),lo.copy(i.boundingBox)),lo.applyMatrix4(t.matrixWorld),this.union(lo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(dr),co.subVectors(this.max,dr),ds.subVectors(t.a,dr),ps.subVectors(t.b,dr),ms.subVectors(t.c,dr),vi.subVectors(ps,ds),xi.subVectors(ms,ps),Oi.subVectors(ds,ms);let e=[0,-vi.z,vi.y,0,-xi.z,xi.y,0,-Oi.z,Oi.y,vi.z,0,-vi.x,xi.z,0,-xi.x,Oi.z,0,-Oi.x,-vi.y,vi.x,0,-xi.y,xi.x,0,-Oi.y,Oi.x,0];return!Ya(e,ds,ps,ms,co)||(e=[1,0,0,0,1,0,0,0,1],!Ya(e,ds,ps,ms,co))?!1:(uo.crossVectors(vi,xi),e=[uo.x,uo.y,uo.z],Ya(e,ds,ps,ms,co))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Kn=[new X,new X,new X,new X,new X,new X,new X,new X],En=new X,lo=new is,ds=new X,ps=new X,ms=new X,vi=new X,xi=new X,Oi=new X,dr=new X,co=new X,uo=new X,Fi=new X;function Ya(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Fi.fromArray(n,r);const a=s.x*Math.abs(Fi.x)+s.y*Math.abs(Fi.y)+s.z*Math.abs(Fi.z),l=t.dot(Fi),c=e.dot(Fi),u=i.dot(Fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Z0=new is,pr=new X,$a=new X;class ir{constructor(t=new X,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Z0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;pr.subVectors(t,this.center);const e=pr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(pr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(pr.copy(t.center).add($a)),this.expandByPoint(pr.copy(t.center).sub($a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zn=new X,Ka=new X,ho=new X,Mi=new X,Za=new X,fo=new X,Ja=new X;class $r{constructor(t=new X,e=new X(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ka.copy(t).add(e).multiplyScalar(.5),ho.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(Ka);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ho),a=Mi.dot(this.direction),l=-Mi.dot(ho),c=Mi.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Ka).addScaledVector(ho,f),p}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const i=Zn.dot(this.direction),s=Zn.dot(Zn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,i,s,r){Za.subVectors(e,t),fo.subVectors(i,t),Ja.crossVectors(Za,fo);let o=this.direction.dot(Ja),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mi.subVectors(this.origin,t);const l=a*this.direction.dot(fo.crossVectors(Mi,fo));if(l<0)return null;const c=a*this.direction.dot(Za.cross(Mi));if(c<0||l+c>o)return null;const u=-a*Mi.dot(Ja);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/gs.setFromMatrixColumn(t,0).length(),r=1/gs.setFromMatrixColumn(t,1).length(),o=1/gs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(J0,t,Q0)}lookAt(t,e,i){const s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),yi.crossVectors(i,ln),yi.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),yi.crossVectors(i,ln)),yi.normalize(),po.crossVectors(ln,yi),s[0]=yi.x,s[4]=po.x,s[8]=ln.x,s[1]=yi.y,s[5]=po.y,s[9]=ln.y,s[2]=yi.z,s[6]=po.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],y=i[3],T=i[7],M=i[11],L=i[15],I=s[0],C=s[4],U=s[8],w=s[12],E=s[1],D=s[5],B=s[9],V=s[13],ot=s[2],at=s[6],tt=s[10],Q=s[14],$=s[3],_t=s[7],yt=s[11],Ct=s[15];return r[0]=o*I+a*E+l*ot+c*$,r[4]=o*C+a*D+l*at+c*_t,r[8]=o*U+a*B+l*tt+c*yt,r[12]=o*w+a*V+l*Q+c*Ct,r[1]=u*I+h*E+f*ot+p*$,r[5]=u*C+h*D+f*at+p*_t,r[9]=u*U+h*B+f*tt+p*yt,r[13]=u*w+h*V+f*Q+p*Ct,r[2]=g*I+_*E+m*ot+d*$,r[6]=g*C+_*D+m*at+d*_t,r[10]=g*U+_*B+m*tt+d*yt,r[14]=g*w+_*V+m*Q+d*Ct,r[3]=y*I+T*E+M*ot+L*$,r[7]=y*C+T*D+M*at+L*_t,r[11]=y*U+T*B+M*tt+L*yt,r[15]=y*w+T*V+M*Q+L*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*p-i*l*p)+_*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+e*c*h-e*a*p-r*o*h+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],y=h*m*c-_*f*c+_*l*p-a*m*p-h*l*d+a*f*d,T=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,M=u*_*c-g*h*c+g*a*p-o*_*p-u*a*d+o*h*d,L=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,I=e*y+i*T+s*M+r*L;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/I;return t[0]=y*C,t[1]=(_*f*r-h*m*r-_*s*p+i*m*p+h*s*d-i*f*d)*C,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*d+i*l*d)*C,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*p-i*l*p)*C,t[4]=T*C,t[5]=(u*m*r-g*f*r+g*s*p-e*m*p-u*s*d+e*f*d)*C,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*C,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*p+e*l*p)*C,t[8]=M*C,t[9]=(g*h*r-u*_*r-g*i*p+e*_*p+u*i*d-e*h*d)*C,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*d+e*a*d)*C,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*p-e*a*p)*C,t[12]=L*C,t[13]=(u*_*s-g*h*s+g*i*f-e*_*f-u*i*m+e*h*m)*C,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*C,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*C,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,p=r*u,g=r*h,_=o*u,m=o*h,d=a*h,y=l*c,T=l*u,M=l*h,L=i.x,I=i.y,C=i.z;return s[0]=(1-(_+d))*L,s[1]=(p+M)*L,s[2]=(g-T)*L,s[3]=0,s[4]=(p-M)*I,s[5]=(1-(f+d))*I,s[6]=(m+y)*I,s[7]=0,s[8]=(g+T)*C,s[9]=(m-y)*C,s[10]=(1-(f+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=gs.set(s[0],s[1],s[2]).length();const o=gs.set(s[4],s[5],s[6]).length(),a=gs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],bn.copy(this);const c=1/r,u=1/o,h=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=h,bn.elements[9]*=h,bn.elements[10]*=h,e.setFromRotationMatrix(bn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ai){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let p,g;if(a===ai)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===na)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ai){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(o-r),f=(e+t)*c,p=(i+s)*u;let g,_;if(a===ai)g=(o+r)*h,_=-2*h;else if(a===na)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const gs=new X,bn=new de,J0=new X(0,0,0),Q0=new X(1,1,1),yi=new X,po=new X,ln=new X,Rh=new de,Ch=new ns;class Wn{constructor(t=0,e=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class ru{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tx=0;const Ph=new X,_s=new ns,Jn=new de,mo=new X,mr=new X,ex=new X,nx=new ns,Dh=new X(1,0,0),Lh=new X(0,1,0),Ih=new X(0,0,1),Uh={type:"added"},ix={type:"removed"},vs={type:"childadded",child:null},Qa={type:"childremoved",child:null};class be extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=Yr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new X,e=new Wn,i=new ns,s=new X(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new $t}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ru,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.multiply(_s),this}rotateOnWorldAxis(t,e){return _s.setFromAxisAngle(t,e),this.quaternion.premultiply(_s),this}rotateX(t){return this.rotateOnAxis(Dh,t)}rotateY(t){return this.rotateOnAxis(Lh,t)}rotateZ(t){return this.rotateOnAxis(Ih,t)}translateOnAxis(t,e){return Ph.copy(t).applyQuaternion(this.quaternion),this.position.add(Ph.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Dh,t)}translateY(t){return this.translateOnAxis(Lh,t)}translateZ(t){return this.translateOnAxis(Ih,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?mo.copy(t):mo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(mr,mo,this.up):Jn.lookAt(mo,mr,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(Jn),this.quaternion.premultiply(_s.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uh),vs.child=t,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ix),Qa.child=t,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uh),vs.child=t,this.dispatchEvent(vs),vs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,t,ex),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mr,nx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}be.DEFAULT_UP=new X(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new X,Qn=new X,tl=new X,ti=new X,xs=new X,Ms=new X,Nh=new X,el=new X,nl=new X,il=new X,sl=new ye,rl=new ye,ol=new ye;class wn{constructor(t=new X,e=new X,i=new X){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Tn.subVectors(t,e),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Tn.subVectors(s,e),Qn.subVectors(i,e),tl.subVectors(t,e);const o=Tn.dot(Tn),a=Tn.dot(Qn),l=Tn.dot(tl),c=Qn.dot(Qn),u=Qn.dot(tl),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return sl.setScalar(0),rl.setScalar(0),ol.setScalar(0),sl.fromBufferAttribute(t,e),rl.fromBufferAttribute(t,i),ol.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(sl,r.x),o.addScaledVector(rl,r.y),o.addScaledVector(ol,r.z),o}static isFrontFacing(t,e,i,s){return Tn.subVectors(i,e),Qn.subVectors(t,e),Tn.cross(Qn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Tn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return wn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;xs.subVectors(s,i),Ms.subVectors(r,i),el.subVectors(t,i);const l=xs.dot(el),c=Ms.dot(el);if(l<=0&&c<=0)return e.copy(i);nl.subVectors(t,s);const u=xs.dot(nl),h=Ms.dot(nl);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(xs,o);il.subVectors(t,r);const p=xs.dot(il),g=Ms.dot(il);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Ms,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Nh.subVectors(r,s),a=(h-u)/(h-u+(p-g)),e.copy(s).addScaledVector(Nh,a);const d=1/(m+_+f);return o=_*d,a=f*d,e.copy(i).addScaledVector(xs,o).addScaledVector(Ms,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ip={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},go={h:0,s:0,l:0};function al(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class jt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=i,te.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=te.workingColorSpace){if(t=H0(t,1),e=$e(e,0,1),i=$e(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=al(o,r,t+1/3),this.g=al(o,r,t),this.b=al(o,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=nn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const i=Ip[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ui(t.r),this.g=ui(t.g),this.b=ui(t.b),this}copyLinearToSRGB(t){return this.r=Gs(t.r),this.g=Gs(t.g),this.b=Gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return te.fromWorkingColorSpace(Oe.copy(this),t),Math.round($e(Oe.r*255,0,255))*65536+Math.round($e(Oe.g*255,0,255))*256+Math.round($e(Oe.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Oe.copy(this),e);const i=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=nn){te.fromWorkingColorSpace(Oe.copy(this),t);const e=Oe.r,i=Oe.g,s=Oe.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Si),this.setHSL(Si.h+t,Si.s+e,Si.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Si),t.getHSL(go);const i=Wa(Si.h,go.h,e),s=Wa(Si.s,go.s,e),r=Wa(Si.l,go.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new jt;jt.NAMES=Ip;let sx=0;class as extends os{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sx++}),this.uuid=Yr(),this.name="",this.blending=Hs,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hl,this.blendDst=kl,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hs&&(i.blending=this.blending),this.side!==Li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hl&&(i.blendSrc=this.blendSrc),this.blendDst!==kl&&(i.blendDst=this.blendDst),this.blendEquation!==Xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class mn extends as{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=hp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new X,_o=new Ft;class yn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=xh,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)_o.fromBufferAttribute(this,e),_o.applyMatrix3(t),this.setXY(e,_o.x,_o.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=fr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=tn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fr(e,this.array)),e}setX(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fr(e,this.array)),e}setY(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fr(e,this.array)),e}setW(t,e){return this.normalized&&(e=tn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),i=tn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),i=tn(i,this.array),s=tn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=tn(e,this.array),i=tn(i,this.array),s=tn(s,this.array),r=tn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==xh&&(t.usage=this.usage),t}}class Up extends yn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Np extends yn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Se extends yn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let rx=0;const pn=new de,ll=new be,ys=new X,cn=new is,gr=new is,De=new X;class ke extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=Yr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pp(t)?Np:Up)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return pn.makeRotationFromQuaternion(t),this.applyMatrix4(pn),this}rotateX(t){return pn.makeRotationX(t),this.applyMatrix4(pn),this}rotateY(t){return pn.makeRotationY(t),this.applyMatrix4(pn),this}rotateZ(t){return pn.makeRotationZ(t),this.applyMatrix4(pn),this}translate(t,e,i){return pn.makeTranslation(t,e,i),this.applyMatrix4(pn),this}scale(t,e,i){return pn.makeScale(t,e,i),this.applyMatrix4(pn),this}lookAt(t){return ll.lookAt(t),ll.updateMatrix(),this.applyMatrix4(ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ir);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(t){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];gr.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(cn.min,gr.min),cn.expandByPoint(De),De.addVectors(cn.max,gr.max),cn.expandByPoint(De)):(cn.expandByPoint(gr.min),cn.expandByPoint(gr.max))}cn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)De.fromBufferAttribute(a,c),l&&(ys.fromBufferAttribute(t,c),De.add(ys)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new X,l[U]=new X;const c=new X,u=new X,h=new X,f=new Ft,p=new Ft,g=new Ft,_=new X,m=new X;function d(U,w,E){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,w),h.fromBufferAttribute(i,E),f.fromBufferAttribute(r,U),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,E),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(D),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),a[U].add(_),a[w].add(_),a[E].add(_),l[U].add(m),l[w].add(m),l[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let U=0,w=y.length;U<w;++U){const E=y[U],D=E.start,B=E.count;for(let V=D,ot=D+B;V<ot;V+=3)d(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const T=new X,M=new X,L=new X,I=new X;function C(U){L.fromBufferAttribute(s,U),I.copy(L);const w=a[U];T.copy(w),T.sub(L.multiplyScalar(L.dot(w))).normalize(),M.crossVectors(I,w);const D=M.dot(l[U])<0?-1:1;o.setXYZW(U,T.x,T.y,T.z,D)}for(let U=0,w=y.length;U<w;++U){const E=y[U],D=E.start,B=E.count;for(let V=D,ot=D+B;V<ot;V+=3)C(t.getX(V+0)),C(t.getX(V+1)),C(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new yn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new X,r=new X,o=new X,a=new X,l=new X,c=new X,u=new X,h=new X;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new yn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ke,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oh=new de,Bi=new $r,vo=new ir,Fh=new X,xo=new X,Mo=new X,yo=new X,cl=new X,So=new X,Bh=new X,Eo=new X;class we extends be{constructor(t=new ke,e=new mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){So.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(cl.fromBufferAttribute(h,t),o?So.addScaledVector(cl,u):So.addScaledVector(cl.sub(e),u))}e.add(So)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),vo.copy(i.boundingSphere),vo.applyMatrix4(r),Bi.copy(t.ray).recast(t.near),!(vo.containsPoint(Bi.origin)===!1&&(Bi.intersectSphere(vo,Fh)===null||Bi.origin.distanceToSquared(Fh)>(t.far-t.near)**2))&&(Oh.copy(r).invert(),Bi.copy(t.ray).applyMatrix4(Oh),!(i.boundingBox!==null&&Bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Bi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],y=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,L=T;M<L;M+=3){const I=a.getX(M),C=a.getX(M+1),U=a.getX(M+2);s=bo(this,d,t,i,c,u,h,I,C,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const y=a.getX(m),T=a.getX(m+1),M=a.getX(m+2);s=bo(this,o,t,i,c,u,h,y,T,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],y=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,L=T;M<L;M+=3){const I=M,C=M+1,U=M+2;s=bo(this,d,t,i,c,u,h,I,C,U),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const y=m,T=m+1,M=m+2;s=bo(this,o,t,i,c,u,h,y,T,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function ox(n,t,e,i,s,r,o,a){let l;if(t.side===on?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Li,a),l===null)return null;Eo.copy(a),Eo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Eo);return c<e.near||c>e.far?null:{distance:c,point:Eo.clone(),object:n}}function bo(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,xo),n.getVertexPosition(l,Mo),n.getVertexPosition(c,yo);const u=ox(n,t,e,i,xo,Mo,yo,Bh);if(u){const h=new X;wn.getBarycoord(Bh,xo,Mo,yo,h),s&&(u.uv=wn.getInterpolatedAttribute(s,a,l,c,h,new Ft)),r&&(u.uv1=wn.getInterpolatedAttribute(r,a,l,c,h,new Ft)),o&&(u.normal=wn.getInterpolatedAttribute(o,a,l,c,h,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new X,materialIndex:0};wn.getNormal(xo,Mo,yo,f.normal),u.face=f,u.barycoord=h}return u}class Kr extends ke{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(h,2));function g(_,m,d,y,T,M,L,I,C,U,w){const E=M/C,D=L/U,B=M/2,V=L/2,ot=I/2,at=C+1,tt=U+1;let Q=0,$=0;const _t=new X;for(let yt=0;yt<tt;yt++){const Ct=yt*D-V;for(let Ut=0;Ut<at;Ut++){const Zt=Ut*E-B;_t[_]=Zt*y,_t[m]=Ct*T,_t[d]=ot,c.push(_t.x,_t.y,_t.z),_t[_]=0,_t[m]=0,_t[d]=I>0?1:-1,u.push(_t.x,_t.y,_t.z),h.push(Ut/C),h.push(1-yt/U),Q+=1}}for(let yt=0;yt<U;yt++)for(let Ct=0;Ct<C;Ct++){const Ut=f+Ct+at*yt,Zt=f+Ct+at*(yt+1),ct=f+(Ct+1)+at*(yt+1),mt=f+(Ct+1)+at*yt;l.push(Ut,Zt,mt),l.push(Zt,ct,mt),$+=6}a.addGroup(p,$,w),p+=$,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function tr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function We(n){const t={};for(let e=0;e<n.length;e++){const i=tr(n[e]);for(const s in i)t[s]=i[s]}return t}function ax(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Op(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const Vr={clone:tr,merge:We};var lx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ze extends as{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lx,this.fragmentShader=cx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=tr(t.uniforms),this.uniformsGroups=ax(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Fp extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=ai}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new X,zh=new Ft,Hh=new Ft;class gn extends Fp{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=bc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Wo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bc*2*Math.atan(Math.tan(Wo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ei.x,Ei.y).multiplyScalar(-t/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ei.x,Ei.y).multiplyScalar(-t/Ei.z)}getViewSize(t,e){return this.getViewBounds(t,zh,Hh),e.subVectors(Hh,zh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Wo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ss=-90,Es=1;class ux extends be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gn(Ss,Es,t,e);s.layers=this.layers,this.add(s);const r=new gn(Ss,Es,t,e);r.layers=this.layers,this.add(r);const o=new gn(Ss,Es,t,e);o.layers=this.layers,this.add(o);const a=new gn(Ss,Es,t,e);a.layers=this.layers,this.add(a);const l=new gn(Ss,Es,t,e);l.layers=this.layers,this.add(l);const c=new gn(Ss,Es,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===na)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Bp extends Ze{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Ks,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class hx extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Bp(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Kr(5,5,5),r=new ze({name:"CubemapFromEquirect",uniforms:tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:li});r.uniforms.tEquirect.value=e;const o=new we(s,r),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=Rn),new ux(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const ul=new X,fx=new X,dx=new $t;class wi{constructor(t=new X(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=ul.subVectors(i,e).cross(fx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(ul),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||dx.getNormalMatrix(t),s=this.coplanarPoint(ul).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new ir,To=new X;class ou{constructor(t=new wi,e=new wi,i=new wi,s=new wi,r=new wi,o=new wi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ai){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],y=s[13],T=s[14],M=s[15];if(i[0].setComponents(l-r,f-c,m-p,M-d).normalize(),i[1].setComponents(l+r,f+c,m+p,M+d).normalize(),i[2].setComponents(l+o,f+u,m+g,M+y).normalize(),i[3].setComponents(l-o,f-u,m-g,M-y).normalize(),i[4].setComponents(l-a,f-h,m-_,M-T).normalize(),e===ai)i[5].setComponents(l+a,f+h,m+_,M+T).normalize();else if(e===na)i[5].setComponents(a,h,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(t){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(To.x=s.normal.x>0?t.max.x:t.min.x,To.y=s.normal.y>0?t.max.y:t.min.y,To.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(To)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zp(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function px(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Aa extends ke{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const y=d*f-o;for(let T=0;T<c;T++){const M=T*h-r;g.push(M,-y,0),_.push(0,0,1),m.push(T/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let y=0;y<a;y++){const T=y+c*d,M=y+c*(d+1),L=y+1+c*(d+1),I=y+1+c*d;p.push(T,M,I),p.push(M,L,I)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Aa(t.width,t.height,t.widthSegments,t.heightSegments)}}var mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_x=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ex=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,bx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ax=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Cx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ux=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ox=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Bx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,kx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xx="gl_FragColor = linearToOutputTexel( gl_FragColor );",jx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Yx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$x=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Jx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,iM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,aM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_M=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,MM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,SM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,EM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,TM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,AM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,RM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,CM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,PM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,DM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,IM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,UM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,NM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,FM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,BM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,HM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,VM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,GM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,WM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,XM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,YM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$M=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,KM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ZM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,JM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,QM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ty=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ey=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ny=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ry=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ay=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ly=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,dy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const py=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,my=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_y=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,My=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Sy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ey=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,by=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ty=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ay=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ry=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Cy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Py=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ly=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Iy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ny=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Oy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,By=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ky=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:mx,alphahash_pars_fragment:gx,alphamap_fragment:_x,alphamap_pars_fragment:vx,alphatest_fragment:xx,alphatest_pars_fragment:Mx,aomap_fragment:yx,aomap_pars_fragment:Sx,batching_pars_vertex:Ex,batching_vertex:bx,begin_vertex:Tx,beginnormal_vertex:Ax,bsdfs:wx,iridescence_fragment:Rx,bumpmap_pars_fragment:Cx,clipping_planes_fragment:Px,clipping_planes_pars_fragment:Dx,clipping_planes_pars_vertex:Lx,clipping_planes_vertex:Ix,color_fragment:Ux,color_pars_fragment:Nx,color_pars_vertex:Ox,color_vertex:Fx,common:Bx,cube_uv_reflection_fragment:zx,defaultnormal_vertex:Hx,displacementmap_pars_vertex:kx,displacementmap_vertex:Vx,emissivemap_fragment:Gx,emissivemap_pars_fragment:Wx,colorspace_fragment:Xx,colorspace_pars_fragment:jx,envmap_fragment:qx,envmap_common_pars_fragment:Yx,envmap_pars_fragment:$x,envmap_pars_vertex:Kx,envmap_physical_pars_fragment:aM,envmap_vertex:Zx,fog_vertex:Jx,fog_pars_vertex:Qx,fog_fragment:tM,fog_pars_fragment:eM,gradientmap_pars_fragment:nM,lightmap_pars_fragment:iM,lights_lambert_fragment:sM,lights_lambert_pars_fragment:rM,lights_pars_begin:oM,lights_toon_fragment:lM,lights_toon_pars_fragment:cM,lights_phong_fragment:uM,lights_phong_pars_fragment:hM,lights_physical_fragment:fM,lights_physical_pars_fragment:dM,lights_fragment_begin:pM,lights_fragment_maps:mM,lights_fragment_end:gM,logdepthbuf_fragment:_M,logdepthbuf_pars_fragment:vM,logdepthbuf_pars_vertex:xM,logdepthbuf_vertex:MM,map_fragment:yM,map_pars_fragment:SM,map_particle_fragment:EM,map_particle_pars_fragment:bM,metalnessmap_fragment:TM,metalnessmap_pars_fragment:AM,morphinstance_vertex:wM,morphcolor_vertex:RM,morphnormal_vertex:CM,morphtarget_pars_vertex:PM,morphtarget_vertex:DM,normal_fragment_begin:LM,normal_fragment_maps:IM,normal_pars_fragment:UM,normal_pars_vertex:NM,normal_vertex:OM,normalmap_pars_fragment:FM,clearcoat_normal_fragment_begin:BM,clearcoat_normal_fragment_maps:zM,clearcoat_pars_fragment:HM,iridescence_pars_fragment:kM,opaque_fragment:VM,packing:GM,premultiplied_alpha_fragment:WM,project_vertex:XM,dithering_fragment:jM,dithering_pars_fragment:qM,roughnessmap_fragment:YM,roughnessmap_pars_fragment:$M,shadowmap_pars_fragment:KM,shadowmap_pars_vertex:ZM,shadowmap_vertex:JM,shadowmask_pars_fragment:QM,skinbase_vertex:ty,skinning_pars_vertex:ey,skinning_vertex:ny,skinnormal_vertex:iy,specularmap_fragment:sy,specularmap_pars_fragment:ry,tonemapping_fragment:oy,tonemapping_pars_fragment:ay,transmission_fragment:ly,transmission_pars_fragment:cy,uv_pars_fragment:uy,uv_pars_vertex:hy,uv_vertex:fy,worldpos_vertex:dy,background_vert:py,background_frag:my,backgroundCube_vert:gy,backgroundCube_frag:_y,cube_vert:vy,cube_frag:xy,depth_vert:My,depth_frag:yy,distanceRGBA_vert:Sy,distanceRGBA_frag:Ey,equirect_vert:by,equirect_frag:Ty,linedashed_vert:Ay,linedashed_frag:wy,meshbasic_vert:Ry,meshbasic_frag:Cy,meshlambert_vert:Py,meshlambert_frag:Dy,meshmatcap_vert:Ly,meshmatcap_frag:Iy,meshnormal_vert:Uy,meshnormal_frag:Ny,meshphong_vert:Oy,meshphong_frag:Fy,meshphysical_vert:By,meshphysical_frag:zy,meshtoon_vert:Hy,meshtoon_frag:ky,points_vert:Vy,points_frag:Gy,shadow_vert:Wy,shadow_frag:Xy,sprite_vert:jy,sprite_frag:qy},At={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Bn={basic:{uniforms:We([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:We([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new jt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:We([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:We([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:We([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new jt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:We([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:We([At.points,At.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:We([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:We([At.common,At.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:We([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:We([At.sprite,At.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:We([At.common,At.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:We([At.lights,At.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};Bn.physical={uniforms:We([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Ao={r:0,b:0,g:0},Hi=new Wn,Yy=new de;function $y(n,t,e,i,s,r,o){const a=new jt(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function g(y){let T=y.isScene===!0?y.background:null;return T&&T.isTexture&&(T=(y.backgroundBlurriness>0?e:t).get(T)),T}function _(y){let T=!1;const M=g(y);M===null?d(a,l):M&&M.isColor&&(d(M,1),T=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,T){const M=g(T);M&&(M.isCubeTexture||M.mapping===ba)?(u===void 0&&(u=new we(new Kr(1,1,1),new ze({name:"BackgroundCubeMaterial",uniforms:tr(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,I,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Hi.copy(T.backgroundRotation),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Yy.makeRotationFromEuler(Hi)),u.material.toneMapped=te.getTransfer(M.colorSpace)!==ce,(h!==M||f!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new we(new Aa(2,2),new ze({name:"BackgroundMaterial",uniforms:tr(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=te.getTransfer(M.colorSpace)!==ce,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,T){y.getRGB(Ao,Op(n)),i.buffers.color.setClear(Ao.r,Ao.g,Ao.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(y,T=1){a.set(y),l=T,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,d(a,l)},render:_,addToRenderList:m}}function Ky(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(E,D,B,V,ot){let at=!1;const tt=h(V,B,D);r!==tt&&(r=tt,c(r.object)),at=p(E,V,B,ot),at&&g(E,V,B,ot),ot!==null&&t.update(ot,n.ELEMENT_ARRAY_BUFFER),(at||o)&&(o=!1,M(E,D,B,V),ot!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ot).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function h(E,D,B){const V=B.wireframe===!0;let ot=i[E.id];ot===void 0&&(ot={},i[E.id]=ot);let at=ot[D.id];at===void 0&&(at={},ot[D.id]=at);let tt=at[V];return tt===void 0&&(tt=f(l()),at[V]=tt),tt}function f(E){const D=[],B=[],V=[];for(let ot=0;ot<e;ot++)D[ot]=0,B[ot]=0,V[ot]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:V,object:E,attributes:{},index:null}}function p(E,D,B,V){const ot=r.attributes,at=D.attributes;let tt=0;const Q=B.getAttributes();for(const $ in Q)if(Q[$].location>=0){const yt=ot[$];let Ct=at[$];if(Ct===void 0&&($==="instanceMatrix"&&E.instanceMatrix&&(Ct=E.instanceMatrix),$==="instanceColor"&&E.instanceColor&&(Ct=E.instanceColor)),yt===void 0||yt.attribute!==Ct||Ct&&yt.data!==Ct.data)return!0;tt++}return r.attributesNum!==tt||r.index!==V}function g(E,D,B,V){const ot={},at=D.attributes;let tt=0;const Q=B.getAttributes();for(const $ in Q)if(Q[$].location>=0){let yt=at[$];yt===void 0&&($==="instanceMatrix"&&E.instanceMatrix&&(yt=E.instanceMatrix),$==="instanceColor"&&E.instanceColor&&(yt=E.instanceColor));const Ct={};Ct.attribute=yt,yt&&yt.data&&(Ct.data=yt.data),ot[$]=Ct,tt++}r.attributes=ot,r.attributesNum=tt,r.index=V}function _(){const E=r.newAttributes;for(let D=0,B=E.length;D<B;D++)E[D]=0}function m(E){d(E,0)}function d(E,D){const B=r.newAttributes,V=r.enabledAttributes,ot=r.attributeDivisors;B[E]=1,V[E]===0&&(n.enableVertexAttribArray(E),V[E]=1),ot[E]!==D&&(n.vertexAttribDivisor(E,D),ot[E]=D)}function y(){const E=r.newAttributes,D=r.enabledAttributes;for(let B=0,V=D.length;B<V;B++)D[B]!==E[B]&&(n.disableVertexAttribArray(B),D[B]=0)}function T(E,D,B,V,ot,at,tt){tt===!0?n.vertexAttribIPointer(E,D,B,ot,at):n.vertexAttribPointer(E,D,B,V,ot,at)}function M(E,D,B,V){_();const ot=V.attributes,at=B.getAttributes(),tt=D.defaultAttributeValues;for(const Q in at){const $=at[Q];if($.location>=0){let _t=ot[Q];if(_t===void 0&&(Q==="instanceMatrix"&&E.instanceMatrix&&(_t=E.instanceMatrix),Q==="instanceColor"&&E.instanceColor&&(_t=E.instanceColor)),_t!==void 0){const yt=_t.normalized,Ct=_t.itemSize,Ut=t.get(_t);if(Ut===void 0)continue;const Zt=Ut.buffer,ct=Ut.type,mt=Ut.bytesPerElement,Et=ct===n.INT||ct===n.UNSIGNED_INT||_t.gpuType===Qc;if(_t.isInterleavedBufferAttribute){const O=_t.data,Y=O.stride,k=_t.offset;if(O.isInstancedInterleavedBuffer){for(let ut=0;ut<$.locationSize;ut++)d($.location+ut,O.meshPerAttribute);E.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let ut=0;ut<$.locationSize;ut++)m($.location+ut);n.bindBuffer(n.ARRAY_BUFFER,Zt);for(let ut=0;ut<$.locationSize;ut++)T($.location+ut,Ct/$.locationSize,ct,yt,Y*mt,(k+Ct/$.locationSize*ut)*mt,Et)}else{if(_t.isInstancedBufferAttribute){for(let O=0;O<$.locationSize;O++)d($.location+O,_t.meshPerAttribute);E.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let O=0;O<$.locationSize;O++)m($.location+O);n.bindBuffer(n.ARRAY_BUFFER,Zt);for(let O=0;O<$.locationSize;O++)T($.location+O,Ct/$.locationSize,ct,yt,Ct*mt,Ct/$.locationSize*O*mt,Et)}}else if(tt!==void 0){const yt=tt[Q];if(yt!==void 0)switch(yt.length){case 2:n.vertexAttrib2fv($.location,yt);break;case 3:n.vertexAttrib3fv($.location,yt);break;case 4:n.vertexAttrib4fv($.location,yt);break;default:n.vertexAttrib1fv($.location,yt)}}}}y()}function L(){U();for(const E in i){const D=i[E];for(const B in D){const V=D[B];for(const ot in V)u(V[ot].object),delete V[ot];delete D[B]}delete i[E]}}function I(E){if(i[E.id]===void 0)return;const D=i[E.id];for(const B in D){const V=D[B];for(const ot in V)u(V[ot].object),delete V[ot];delete D[B]}delete i[E.id]}function C(E){for(const D in i){const B=i[D];if(B[E.id]===void 0)continue;const V=B[E.id];for(const ot in V)u(V[ot].object),delete V[ot];delete B[E.id]}}function U(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:w,dispose:L,releaseStatesOfGeometry:I,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function Zy(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Jy(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==_n&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const U=C===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Gn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==oi&&!U)}function l(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,I=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:M,vertexTextures:L,maxSamples:I}}function Qy(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new wi,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const y=r?0:i,T=y*4;let M=d.clippingState||null;l.value=M,M=u(g,f,T,p);for(let L=0;L!==T;++L)M[L]=e[L];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<d)&&(m=new Float32Array(d));for(let T=0,M=p;T!==_;++T,M+=4)o.copy(h[T]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function tS(n){let t=new WeakMap;function e(o,a){return a===$l?o.mapping=Ks:a===Kl&&(o.mapping=Zs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===$l||a===Kl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new hx(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class au extends Fp{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ps=4,kh=[.125,.215,.35,.446,.526,.582],ji=20,hl=new au,Vh=new jt;let fl=null,dl=0,pl=0,ml=!1;const Gi=(1+Math.sqrt(5))/2,bs=1/Gi,Gh=[new X(-Gi,bs,0),new X(Gi,bs,0),new X(-bs,0,Gi),new X(bs,0,Gi),new X(0,Gi,-bs),new X(0,Gi,bs),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)];class Wh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){fl=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,dl,pl),this._renderer.xr.enabled=ml,t.scissorTest=!1,wo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ks||t.mapping===Zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),dl=this._renderer.getActiveCubeFace(),pl=this._renderer.getActiveMipmapLevel(),ml=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:ci,format:_n,colorSpace:nr,depthBuffer:!1},s=Xh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=eS(r)),this._blurMaterial=nS(r,t,e)}return s}_compileMaterial(t){const e=new we(this._lodPlanes[0],t);this._renderer.compile(e,hl)}_sceneToCubeUV(t,e,i,s){const a=new gn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Vh),u.toneMapping=Pi,u.autoClear=!1;const p=new mn({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),g=new we(new Kr,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Vh),_=!0);for(let d=0;d<6;d++){const y=d%3;y===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):y===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const T=this._cubeSize;wo(s,y*T,d>2?T:0,T,T),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ks||t.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;wo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,hl)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Gh[(s-r-1)%Gh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new we(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ji-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):ji;m>ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ji}`);const d=[];let y=0;for(let C=0;C<ji;++C){const U=C/_,w=Math.exp(-U*U/2);d.push(w),C===0?y+=w:C<m&&(y+=2*w)}for(let C=0;C<d.length;C++)d[C]=d[C]/y;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:T}=this;f.dTheta.value=g,f.mipInt.value=T-i;const M=this._sizeLods[s],L=3*M*(s>T-Ps?s-T+Ps:0),I=4*(this._cubeSize-M);wo(e,L,I,3*M,2*M),l.setRenderTarget(e),l.render(h,hl)}}function eS(n){const t=[],e=[],i=[];let s=n;const r=n-Ps+1+kh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ps?l=kh[o-n+Ps-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,y=new Float32Array(_*g*p),T=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let I=0;I<p;I++){const C=I%3*2/3-1,U=I>2?0:-1,w=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];y.set(w,_*g*I),T.set(f,m*g*I);const E=[I,I,I,I,I,I];M.set(E,d*g*I)}const L=new ke;L.setAttribute("position",new yn(y,_)),L.setAttribute("uv",new yn(T,m)),L.setAttribute("faceIndex",new yn(M,d)),t.push(L),s>Ps&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Xh(n,t,e){const i=new Pn(n,t,e);return i.texture.mapping=ba,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function nS(n,t,e){const i=new Float32Array(ji),s=new X(0,1,0);return new ze({name:"SphericalGaussianBlur",defines:{n:ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function jh(){return new ze({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function qh(){return new ze({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function lu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function iS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===$l||l===Kl,u=l===Ks||l===Zs;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Wh(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new Wh(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function sS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Sr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function rS(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let T=0,M=y.length;T<M;T+=3){const L=y[T+0],I=y[T+1],C=y[T+2];f.push(L,I,I,C,C,L)}}else if(g!==void 0){const y=g.array;_=g.version;for(let T=0,M=y.length/3-1;T<M;T+=3){const L=T+0,I=T+1,C=T+2;f.push(L,I,I,C,C,L)}}else return;const m=new(Pp(f)?Np:Up)(f,1);m.version=_;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function oS(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),e.update(p,i,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function h(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,_,0,g);let d=0;for(let y=0;y<g;y++)d+=p[y]*_[y];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function aS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function lS(n,t,e){const i=new WeakMap,s=new ye;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let E=function(){U.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var p=E;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let L=a.attributes.position.count*M,I=1;L>t.maxTextureSize&&(I=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const C=new Float32Array(L*I*4*h),U=new Lp(C,L,I,h);U.type=oi,U.needsUpdate=!0;const w=M*4;for(let D=0;D<h;D++){const B=d[D],V=y[D],ot=T[D],at=L*I*4*D;for(let tt=0;tt<B.count;tt++){const Q=tt*w;g===!0&&(s.fromBufferAttribute(B,tt),C[at+Q+0]=s.x,C[at+Q+1]=s.y,C[at+Q+2]=s.z,C[at+Q+3]=0),_===!0&&(s.fromBufferAttribute(V,tt),C[at+Q+4]=s.x,C[at+Q+5]=s.y,C[at+Q+6]=s.z,C[at+Q+7]=0),m===!0&&(s.fromBufferAttribute(ot,tt),C[at+Q+8]=s.x,C[at+Q+9]=s.y,C[at+Q+10]=s.z,C[at+Q+11]=ot.itemSize===4?s.w:1)}}f={count:h,texture:U,size:new Ft(L,I)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function cS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Hp extends Ze{constructor(t,e,i,s,r,o,a,l,c,u=Vs){if(u!==Vs&&u!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Vs&&(i=es),i===void 0&&u===Qs&&(i=Js),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:fn,this.minFilter=l!==void 0?l:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const kp=new Ze,Yh=new Hp(1,1),Vp=new Lp,Gp=new K0,Wp=new Bp,$h=[],Kh=[],Zh=new Float32Array(16),Jh=new Float32Array(9),Qh=new Float32Array(4);function sr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=$h[s];if(r===void 0&&(r=new Float32Array(s),$h[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Re(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ce(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function wa(n,t){let e=Kh[t];e===void 0&&(e=new Int32Array(t),Kh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function uS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function hS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2fv(this.addr,t),Ce(e,t)}}function fS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;n.uniform3fv(this.addr,t),Ce(e,t)}}function dS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4fv(this.addr,t),Ce(e,t)}}function pS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;Qh.set(i),n.uniformMatrix2fv(this.addr,!1,Qh),Ce(e,i)}}function mS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;Jh.set(i),n.uniformMatrix3fv(this.addr,!1,Jh),Ce(e,i)}}function gS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Re(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,i))return;Zh.set(i),n.uniformMatrix4fv(this.addr,!1,Zh),Ce(e,i)}}function _S(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function vS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2iv(this.addr,t),Ce(e,t)}}function xS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3iv(this.addr,t),Ce(e,t)}}function MS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4iv(this.addr,t),Ce(e,t)}}function yS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function SS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;n.uniform2uiv(this.addr,t),Ce(e,t)}}function ES(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;n.uniform3uiv(this.addr,t),Ce(e,t)}}function bS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;n.uniform4uiv(this.addr,t),Ce(e,t)}}function TS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Yh.compareFunction=Cp,r=Yh):r=kp,e.setTexture2D(t||r,s)}function AS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Gp,s)}function wS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Wp,s)}function RS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Vp,s)}function CS(n){switch(n){case 5126:return uS;case 35664:return hS;case 35665:return fS;case 35666:return dS;case 35674:return pS;case 35675:return mS;case 35676:return gS;case 5124:case 35670:return _S;case 35667:case 35671:return vS;case 35668:case 35672:return xS;case 35669:case 35673:return MS;case 5125:return yS;case 36294:return SS;case 36295:return ES;case 36296:return bS;case 35678:case 36198:case 36298:case 36306:case 35682:return TS;case 35679:case 36299:case 36307:return AS;case 35680:case 36300:case 36308:case 36293:return wS;case 36289:case 36303:case 36311:case 36292:return RS}}function PS(n,t){n.uniform1fv(this.addr,t)}function DS(n,t){const e=sr(t,this.size,2);n.uniform2fv(this.addr,e)}function LS(n,t){const e=sr(t,this.size,3);n.uniform3fv(this.addr,e)}function IS(n,t){const e=sr(t,this.size,4);n.uniform4fv(this.addr,e)}function US(n,t){const e=sr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function NS(n,t){const e=sr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function OS(n,t){const e=sr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function FS(n,t){n.uniform1iv(this.addr,t)}function BS(n,t){n.uniform2iv(this.addr,t)}function zS(n,t){n.uniform3iv(this.addr,t)}function HS(n,t){n.uniform4iv(this.addr,t)}function kS(n,t){n.uniform1uiv(this.addr,t)}function VS(n,t){n.uniform2uiv(this.addr,t)}function GS(n,t){n.uniform3uiv(this.addr,t)}function WS(n,t){n.uniform4uiv(this.addr,t)}function XS(n,t,e){const i=this.cache,s=t.length,r=wa(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||kp,r[o])}function jS(n,t,e){const i=this.cache,s=t.length,r=wa(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Gp,r[o])}function qS(n,t,e){const i=this.cache,s=t.length,r=wa(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wp,r[o])}function YS(n,t,e){const i=this.cache,s=t.length,r=wa(e,s);Re(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Vp,r[o])}function $S(n){switch(n){case 5126:return PS;case 35664:return DS;case 35665:return LS;case 35666:return IS;case 35674:return US;case 35675:return NS;case 35676:return OS;case 5124:case 35670:return FS;case 35667:case 35671:return BS;case 35668:case 35672:return zS;case 35669:case 35673:return HS;case 5125:return kS;case 36294:return VS;case 36295:return GS;case 36296:return WS;case 35678:case 36198:case 36298:case 36306:case 35682:return XS;case 35679:case 36299:case 36307:return jS;case 35680:case 36300:case 36308:case 36293:return qS;case 36289:case 36303:case 36311:case 36292:return YS}}class KS{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=CS(e.type)}}class ZS{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$S(e.type)}}class JS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const gl=/(\w+)(\])?(\[|\.)?/g;function tf(n,t){n.seq.push(t),n.map[t.id]=t}function QS(n,t,e){const i=n.name,s=i.length;for(gl.lastIndex=0;;){const r=gl.exec(i),o=gl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){tf(e,c===void 0?new KS(a,n,t):new ZS(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new JS(a),tf(e,h)),e=h}}}class Xo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);QS(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function ef(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const tE=37297;let eE=0;function nE(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const nf=new $t;function iE(n){te._getMatrix(nf,te.workingColorSpace,n);const t=`mat3( ${nf.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(n)){case Ta:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function sf(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+nE(n.getShaderSource(t),o)}else return s}function sE(n,t){const e=iE(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rE(n,t){let e;switch(t){case fp:e="Linear";break;case dp:e="Reinhard";break;case pp:e="Cineon";break;case Jc:e="ACESFilmic";break;case mp:e="AgX";break;case gp:e="Neutral";break;case R0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ro=new X;function oE(){te.getLuminanceCoefficients(Ro);const n=Ro.x.toFixed(4),t=Ro.y.toFixed(4),e=Ro.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function lE(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function cE(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Er(n){return n!==""}function rf(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function of(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const uE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(n){return n.replace(uE,fE)}const hE=new Map;function fE(n,t){let e=Kt[t];if(e===void 0){const i=hE.get(t);if(i!==void 0)e=Kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Tc(e)}const dE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function af(n){return n.replace(dE,pE)}function pE(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mE(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===up?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===a0?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ei&&(t="SHADOWMAP_TYPE_VSM"),t}function gE(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ks:case Zs:t="ENVMAP_TYPE_CUBE";break;case ba:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _E(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Zs:t="ENVMAP_MODE_REFRACTION";break}return t}function vE(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case hp:t="ENVMAP_BLENDING_MULTIPLY";break;case A0:t="ENVMAP_BLENDING_MIX";break;case w0:t="ENVMAP_BLENDING_ADD";break}return t}function xE(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function ME(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=mE(e),c=gE(e),u=_E(e),h=vE(e),f=xE(e),p=aE(e),g=lE(r),_=s.createProgram();let m,d,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Er).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Er).join(`
`),d.length>0&&(d+=`
`)):(m=[lf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),d=[lf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?Kt.tonemapping_pars_fragment:"",e.toneMapping!==Pi?rE("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,sE("linearToOutputTexel",e.outputColorSpace),oE(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Er).join(`
`)),o=Tc(o),o=rf(o,e),o=of(o,e),a=Tc(a),a=rf(a,e),a=of(a,e),o=af(o),a=af(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const T=y+m+o,M=y+d+a,L=ef(s,s.VERTEX_SHADER,T),I=ef(s,s.FRAGMENT_SHADER,M);s.attachShader(_,L),s.attachShader(_,I),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(D){if(n.debug.checkShaderErrors){const B=s.getProgramInfoLog(_).trim(),V=s.getShaderInfoLog(L).trim(),ot=s.getShaderInfoLog(I).trim();let at=!0,tt=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(at=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,L,I);else{const Q=sf(s,L,"vertex"),$=sf(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+Q+`
`+$)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(V===""||ot==="")&&(tt=!1);tt&&(D.diagnostics={runnable:at,programLog:B,vertexShader:{log:V,prefix:m},fragmentShader:{log:ot,prefix:d}})}s.deleteShader(L),s.deleteShader(I),U=new Xo(s,_),w=cE(s,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,tE)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=eE++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=I,this}let yE=0;class SE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new EE(t),e.set(t,i)),i}}class EE{constructor(t){this.id=yE++,this.code=t,this.usedTimes=0}}function bE(n,t,e,i,s,r,o){const a=new ru,l=new SE,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,E,D,B,V){const ot=B.fog,at=V.geometry,tt=w.isMeshStandardMaterial?B.environment:null,Q=(w.isMeshStandardMaterial?e:t).get(w.envMap||tt),$=Q&&Q.mapping===ba?Q.image.height:null,_t=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const yt=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,Ct=yt!==void 0?yt.length:0;let Ut=0;at.morphAttributes.position!==void 0&&(Ut=1),at.morphAttributes.normal!==void 0&&(Ut=2),at.morphAttributes.color!==void 0&&(Ut=3);let Zt,ct,mt,Et;if(_t){const ie=Bn[_t];Zt=ie.vertexShader,ct=ie.fragmentShader}else Zt=w.vertexShader,ct=w.fragmentShader,l.update(w),mt=l.getVertexShaderID(w),Et=l.getFragmentShaderID(w);const O=n.getRenderTarget(),Y=n.state.buffers.depth.getReversed(),k=V.isInstancedMesh===!0,ut=V.isBatchedMesh===!0,xt=!!w.map,A=!!w.matcap,P=!!Q,S=!!w.aoMap,it=!!w.lightMap,J=!!w.bumpMap,Z=!!w.normalMap,lt=!!w.displacementMap,q=!!w.emissiveMap,F=!!w.metalnessMap,x=!!w.roughnessMap,v=w.anisotropy>0,R=w.clearcoat>0,N=w.dispersion>0,H=w.iridescence>0,G=w.sheen>0,gt=w.transmission>0,ht=v&&!!w.anisotropyMap,dt=R&&!!w.clearcoatMap,Pt=R&&!!w.clearcoatNormalMap,st=R&&!!w.clearcoatRoughnessMap,pt=H&&!!w.iridescenceMap,bt=H&&!!w.iridescenceThicknessMap,kt=G&&!!w.sheenColorMap,Mt=G&&!!w.sheenRoughnessMap,Bt=!!w.specularMap,Vt=!!w.specularColorMap,Qt=!!w.specularIntensityMap,z=gt&&!!w.transmissionMap,Tt=gt&&!!w.thicknessMap,rt=!!w.gradientMap,ft=!!w.alphaMap,St=w.alphaTest>0,wt=!!w.alphaHash,Gt=!!w.extensions;let ve=Pi;w.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ve=n.toneMapping);const Pe={shaderID:_t,shaderType:w.type,shaderName:w.name,vertexShader:Zt,fragmentShader:ct,defines:w.defines,customVertexShaderID:mt,customFragmentShaderID:Et,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:ut,batchingColor:ut&&V._colorsTexture!==null,instancing:k,instancingColor:k&&V.instanceColor!==null,instancingMorph:k&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:O===null?n.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:nr,alphaToCoverage:!!w.alphaToCoverage,map:xt,matcap:A,envMap:P,envMapMode:P&&Q.mapping,envMapCubeUVHeight:$,aoMap:S,lightMap:it,bumpMap:J,normalMap:Z,displacementMap:f&&lt,emissiveMap:q,normalMapObjectSpace:Z&&w.normalMapType===L0,normalMapTangentSpace:Z&&w.normalMapType===Rp,metalnessMap:F,roughnessMap:x,anisotropy:v,anisotropyMap:ht,clearcoat:R,clearcoatMap:dt,clearcoatNormalMap:Pt,clearcoatRoughnessMap:st,dispersion:N,iridescence:H,iridescenceMap:pt,iridescenceThicknessMap:bt,sheen:G,sheenColorMap:kt,sheenRoughnessMap:Mt,specularMap:Bt,specularColorMap:Vt,specularIntensityMap:Qt,transmission:gt,transmissionMap:z,thicknessMap:Tt,gradientMap:rt,opaque:w.transparent===!1&&w.blending===Hs&&w.alphaToCoverage===!1,alphaMap:ft,alphaTest:St,alphaHash:wt,combine:w.combine,mapUv:xt&&_(w.map.channel),aoMapUv:S&&_(w.aoMap.channel),lightMapUv:it&&_(w.lightMap.channel),bumpMapUv:J&&_(w.bumpMap.channel),normalMapUv:Z&&_(w.normalMap.channel),displacementMapUv:lt&&_(w.displacementMap.channel),emissiveMapUv:q&&_(w.emissiveMap.channel),metalnessMapUv:F&&_(w.metalnessMap.channel),roughnessMapUv:x&&_(w.roughnessMap.channel),anisotropyMapUv:ht&&_(w.anisotropyMap.channel),clearcoatMapUv:dt&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(w.sheenRoughnessMap.channel),specularMapUv:Bt&&_(w.specularMap.channel),specularColorMapUv:Vt&&_(w.specularColorMap.channel),specularIntensityMapUv:Qt&&_(w.specularIntensityMap.channel),transmissionMapUv:z&&_(w.transmissionMap.channel),thicknessMapUv:Tt&&_(w.thicknessMap.channel),alphaMapUv:ft&&_(w.alphaMap.channel),vertexTangents:!!at.attributes.tangent&&(Z||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!at.attributes.uv&&(xt||ft),fog:!!ot,useFog:w.fog===!0,fogExp2:!!ot&&ot.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Y,skinning:V.isSkinnedMesh===!0,morphTargets:at.morphAttributes.position!==void 0,morphNormals:at.morphAttributes.normal!==void 0,morphColors:at.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Ut,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:xt&&w.map.isVideoTexture===!0&&te.getTransfer(w.map.colorSpace)===ce,decodeVideoTextureEmissive:q&&w.emissiveMap.isVideoTexture===!0&&te.getTransfer(w.emissiveMap.colorSpace)===ce,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===An,flipSided:w.side===on,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Gt&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&w.extensions.multiDraw===!0||ut)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function d(w){const E=[];if(w.shaderID?E.push(w.shaderID):(E.push(w.customVertexShaderID),E.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)E.push(D),E.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(y(E,w),T(E,w),E.push(n.outputColorSpace)),E.push(w.customProgramCacheKey),E.join()}function y(w,E){w.push(E.precision),w.push(E.outputColorSpace),w.push(E.envMapMode),w.push(E.envMapCubeUVHeight),w.push(E.mapUv),w.push(E.alphaMapUv),w.push(E.lightMapUv),w.push(E.aoMapUv),w.push(E.bumpMapUv),w.push(E.normalMapUv),w.push(E.displacementMapUv),w.push(E.emissiveMapUv),w.push(E.metalnessMapUv),w.push(E.roughnessMapUv),w.push(E.anisotropyMapUv),w.push(E.clearcoatMapUv),w.push(E.clearcoatNormalMapUv),w.push(E.clearcoatRoughnessMapUv),w.push(E.iridescenceMapUv),w.push(E.iridescenceThicknessMapUv),w.push(E.sheenColorMapUv),w.push(E.sheenRoughnessMapUv),w.push(E.specularMapUv),w.push(E.specularColorMapUv),w.push(E.specularIntensityMapUv),w.push(E.transmissionMapUv),w.push(E.thicknessMapUv),w.push(E.combine),w.push(E.fogExp2),w.push(E.sizeAttenuation),w.push(E.morphTargetsCount),w.push(E.morphAttributeCount),w.push(E.numDirLights),w.push(E.numPointLights),w.push(E.numSpotLights),w.push(E.numSpotLightMaps),w.push(E.numHemiLights),w.push(E.numRectAreaLights),w.push(E.numDirLightShadows),w.push(E.numPointLightShadows),w.push(E.numSpotLightShadows),w.push(E.numSpotLightShadowsWithMaps),w.push(E.numLightProbes),w.push(E.shadowMapType),w.push(E.toneMapping),w.push(E.numClippingPlanes),w.push(E.numClipIntersection),w.push(E.depthPacking)}function T(w,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),w.push(a.mask)}function M(w){const E=g[w.type];let D;if(E){const B=Bn[E];D=Vr.clone(B.uniforms)}else D=w.uniforms;return D}function L(w,E){let D;for(let B=0,V=u.length;B<V;B++){const ot=u[B];if(ot.cacheKey===E){D=ot,++D.usedTimes;break}}return D===void 0&&(D=new ME(n,E,w,r),u.push(D)),D}function I(w){if(--w.usedTimes===0){const E=u.indexOf(w);u[E]=u[u.length-1],u.pop(),w.destroy()}}function C(w){l.remove(w)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:L,releaseProgram:I,releaseShaderCache:C,programs:u,dispose:U}}function TE(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function AE(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function cf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function uf(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,p,g,_,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),t++,d}function a(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||AE),i.length>1&&i.sort(f||cf),s.length>1&&s.sort(f||cf)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function wE(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new uf,n.set(i,[o])):s>=r.length?(o=new uf,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function RE(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new X,color:new jt};break;case"SpotLight":e={position:new X,direction:new X,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new X,halfWidth:new X,halfHeight:new X};break}return n[t.id]=e,e}}}function CE(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let PE=0;function DE(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function LE(n){const t=new RE,e=CE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new X);const s=new X,r=new de,o=new de;function a(c){let u=0,h=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,y=0,T=0,M=0,L=0,I=0,C=0;c.sort(DE);for(let w=0,E=c.length;w<E;w++){const D=c[w],B=D.color,V=D.intensity,ot=D.distance,at=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=B.r*V,h+=B.g*V,f+=B.b*V;else if(D.isLightProbe){for(let tt=0;tt<9;tt++)i.probe[tt].addScaledVector(D.sh.coefficients[tt],V);C++}else if(D.isDirectionalLight){const tt=t.get(D);if(tt.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,$=e.get(D);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize=Q.mapSize,i.directionalShadow[p]=$,i.directionalShadowMap[p]=at,i.directionalShadowMatrix[p]=D.shadow.matrix,y++}i.directional[p]=tt,p++}else if(D.isSpotLight){const tt=t.get(D);tt.position.setFromMatrixPosition(D.matrixWorld),tt.color.copy(B).multiplyScalar(V),tt.distance=ot,tt.coneCos=Math.cos(D.angle),tt.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),tt.decay=D.decay,i.spot[_]=tt;const Q=D.shadow;if(D.map&&(i.spotLightMap[L]=D.map,L++,Q.updateMatrices(D),D.castShadow&&I++),i.spotLightMatrix[_]=Q.matrix,D.castShadow){const $=e.get(D);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize=Q.mapSize,i.spotShadow[_]=$,i.spotShadowMap[_]=at,M++}_++}else if(D.isRectAreaLight){const tt=t.get(D);tt.color.copy(B).multiplyScalar(V),tt.halfWidth.set(D.width*.5,0,0),tt.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=tt,m++}else if(D.isPointLight){const tt=t.get(D);if(tt.color.copy(D.color).multiplyScalar(D.intensity),tt.distance=D.distance,tt.decay=D.decay,D.castShadow){const Q=D.shadow,$=e.get(D);$.shadowIntensity=Q.intensity,$.shadowBias=Q.bias,$.shadowNormalBias=Q.normalBias,$.shadowRadius=Q.radius,$.shadowMapSize=Q.mapSize,$.shadowCameraNear=Q.camera.near,$.shadowCameraFar=Q.camera.far,i.pointShadow[g]=$,i.pointShadowMap[g]=at,i.pointShadowMatrix[g]=D.shadow.matrix,T++}i.point[g]=tt,g++}else if(D.isHemisphereLight){const tt=t.get(D);tt.skyColor.copy(D.color).multiplyScalar(V),tt.groundColor.copy(D.groundColor).multiplyScalar(V),i.hemi[d]=tt,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const U=i.hash;(U.directionalLength!==p||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==d||U.numDirectionalShadows!==y||U.numPointShadows!==T||U.numSpotShadows!==M||U.numSpotMaps!==L||U.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=M+L-I,i.spotLightMap.length=L,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=C,U.directionalLength=p,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=d,U.numDirectionalShadows=y,U.numPointShadows=T,U.numSpotShadows=M,U.numSpotMaps=L,U.numLightProbes=C,i.version=PE++)}function l(c,u){let h=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,y=c.length;d<y;d++){const T=c[d];if(T.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(T.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(m),f++}else if(T.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function hf(n){const t=new LE(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function IE(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new hf(n),t.set(s,[a])):r>=o.length?(a=new hf(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class UE extends as{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=P0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class NE extends as{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const OE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,FE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function BE(n,t,e){let i=new ou;const s=new Ft,r=new Ft,o=new ye,a=new UE({depthPacking:D0}),l=new NE,c={},u=e.maxTextureSize,h={[Li]:on,[on]:Li,[An]:An},f=new ze({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:OE,fragmentShader:FE}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new ke;g.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=up;let d=this.type;this.render=function(I,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const w=n.getRenderTarget(),E=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),B=n.state;B.setBlending(li),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const V=d!==ei&&this.type===ei,ot=d===ei&&this.type!==ei;for(let at=0,tt=I.length;at<tt;at++){const Q=I[at],$=Q.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const _t=$.getFrameExtents();if(s.multiply(_t),r.copy($.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/_t.x),s.x=r.x*_t.x,$.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/_t.y),s.y=r.y*_t.y,$.mapSize.y=r.y)),$.map===null||V===!0||ot===!0){const Ct=this.type!==ei?{minFilter:fn,magFilter:fn}:{};$.map!==null&&$.map.dispose(),$.map=new Pn(s.x,s.y,Ct),$.map.texture.name=Q.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const yt=$.getViewportCount();for(let Ct=0;Ct<yt;Ct++){const Ut=$.getViewport(Ct);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),B.viewport(o),$.updateMatrices(Q,Ct),i=$.getFrustum(),M(C,U,$.camera,Q,this.type)}$.isPointLightShadow!==!0&&this.type===ei&&y($,U),$.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(w,E,D)};function y(I,C){const U=t.update(_);f.defines.VSM_SAMPLES!==I.blurSamples&&(f.defines.VSM_SAMPLES=I.blurSamples,p.defines.VSM_SAMPLES=I.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Pn(s.x,s.y)),f.uniforms.shadow_pass.value=I.map.texture,f.uniforms.resolution.value=I.mapSize,f.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(C,null,U,f,_,null),p.uniforms.shadow_pass.value=I.mapPass.texture,p.uniforms.resolution.value=I.mapSize,p.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(C,null,U,p,_,null)}function T(I,C,U,w){let E=null;const D=U.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(D!==void 0)E=D;else if(E=U.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const B=E.uuid,V=C.uuid;let ot=c[B];ot===void 0&&(ot={},c[B]=ot);let at=ot[V];at===void 0&&(at=E.clone(),ot[V]=at,C.addEventListener("dispose",L)),E=at}if(E.visible=C.visible,E.wireframe=C.wireframe,w===ei?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:h[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const B=n.properties.get(E);B.light=U}return E}function M(I,C,U,w,E){if(I.visible===!1)return;if(I.layers.test(C.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&E===ei)&&(!I.frustumCulled||i.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,I.matrixWorld);const V=t.update(I),ot=I.material;if(Array.isArray(ot)){const at=V.groups;for(let tt=0,Q=at.length;tt<Q;tt++){const $=at[tt],_t=ot[$.materialIndex];if(_t&&_t.visible){const yt=T(I,_t,w,E);I.onBeforeShadow(n,I,C,U,V,yt,$),n.renderBufferDirect(U,null,V,yt,I,$),I.onAfterShadow(n,I,C,U,V,yt,$)}}}else if(ot.visible){const at=T(I,ot,w,E);I.onBeforeShadow(n,I,C,U,V,at,null),n.renderBufferDirect(U,null,V,at,I,null),I.onAfterShadow(n,I,C,U,V,at,null)}}const B=I.children;for(let V=0,ot=B.length;V<ot;V++)M(B[V],C,U,w,E)}function L(I){I.target.removeEventListener("dispose",L);for(const U in c){const w=c[U],E=I.target.uuid;E in w&&(w[E].dispose(),delete w[E])}}}const zE={[Vl]:Gl,[Wl]:ql,[Xl]:Yl,[$s]:jl,[Gl]:Vl,[ql]:Wl,[Yl]:Xl,[jl]:$s};function HE(n,t){function e(){let z=!1;const Tt=new ye;let rt=null;const ft=new ye(0,0,0,0);return{setMask:function(St){rt!==St&&!z&&(n.colorMask(St,St,St,St),rt=St)},setLocked:function(St){z=St},setClear:function(St,wt,Gt,ve,Pe){Pe===!0&&(St*=ve,wt*=ve,Gt*=ve),Tt.set(St,wt,Gt,ve),ft.equals(Tt)===!1&&(n.clearColor(St,wt,Gt,ve),ft.copy(Tt))},reset:function(){z=!1,rt=null,ft.set(-1,0,0,0)}}}function i(){let z=!1,Tt=!1,rt=null,ft=null,St=null;return{setReversed:function(wt){if(Tt!==wt){const Gt=t.get("EXT_clip_control");Tt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const ve=St;St=null,this.setClear(ve)}Tt=wt},getReversed:function(){return Tt},setTest:function(wt){wt?O(n.DEPTH_TEST):Y(n.DEPTH_TEST)},setMask:function(wt){rt!==wt&&!z&&(n.depthMask(wt),rt=wt)},setFunc:function(wt){if(Tt&&(wt=zE[wt]),ft!==wt){switch(wt){case Vl:n.depthFunc(n.NEVER);break;case Gl:n.depthFunc(n.ALWAYS);break;case Wl:n.depthFunc(n.LESS);break;case $s:n.depthFunc(n.LEQUAL);break;case Xl:n.depthFunc(n.EQUAL);break;case jl:n.depthFunc(n.GEQUAL);break;case ql:n.depthFunc(n.GREATER);break;case Yl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ft=wt}},setLocked:function(wt){z=wt},setClear:function(wt){St!==wt&&(Tt&&(wt=1-wt),n.clearDepth(wt),St=wt)},reset:function(){z=!1,rt=null,ft=null,St=null,Tt=!1}}}function s(){let z=!1,Tt=null,rt=null,ft=null,St=null,wt=null,Gt=null,ve=null,Pe=null;return{setTest:function(ie){z||(ie?O(n.STENCIL_TEST):Y(n.STENCIL_TEST))},setMask:function(ie){Tt!==ie&&!z&&(n.stencilMask(ie),Tt=ie)},setFunc:function(ie,Ve,Je){(rt!==ie||ft!==Ve||St!==Je)&&(n.stencilFunc(ie,Ve,Je),rt=ie,ft=Ve,St=Je)},setOp:function(ie,Ve,Je){(wt!==ie||Gt!==Ve||ve!==Je)&&(n.stencilOp(ie,Ve,Je),wt=ie,Gt=Ve,ve=Je)},setLocked:function(ie){z=ie},setClear:function(ie){Pe!==ie&&(n.clearStencil(ie),Pe=ie)},reset:function(){z=!1,Tt=null,rt=null,ft=null,St=null,wt=null,Gt=null,ve=null,Pe=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,y=null,T=null,M=null,L=null,I=null,C=new jt(0,0,0),U=0,w=!1,E=null,D=null,B=null,V=null,ot=null;const at=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let tt=!1,Q=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec($)[1]),tt=Q>=1):$.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),tt=Q>=2);let _t=null,yt={};const Ct=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),Zt=new ye().fromArray(Ct),ct=new ye().fromArray(Ut);function mt(z,Tt,rt,ft){const St=new Uint8Array(4),wt=n.createTexture();n.bindTexture(z,wt),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Gt=0;Gt<rt;Gt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(Tt,0,n.RGBA,1,1,ft,0,n.RGBA,n.UNSIGNED_BYTE,St):n.texImage2D(Tt+Gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,St);return wt}const Et={};Et[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),Et[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Et[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),O(n.DEPTH_TEST),o.setFunc($s),J(!1),Z(mh),O(n.CULL_FACE),S(li);function O(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function Y(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function k(z,Tt){return h[z]!==Tt?(n.bindFramebuffer(z,Tt),h[z]=Tt,z===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Tt),z===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Tt),!0):!1}function ut(z,Tt){let rt=p,ft=!1;if(z){rt=f.get(Tt),rt===void 0&&(rt=[],f.set(Tt,rt));const St=z.textures;if(rt.length!==St.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Gt=St.length;wt<Gt;wt++)rt[wt]=n.COLOR_ATTACHMENT0+wt;rt.length=St.length,ft=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,ft=!0);ft&&n.drawBuffers(rt)}function xt(z){return g!==z?(n.useProgram(z),g=z,!0):!1}const A={[Xi]:n.FUNC_ADD,[c0]:n.FUNC_SUBTRACT,[u0]:n.FUNC_REVERSE_SUBTRACT};A[h0]=n.MIN,A[f0]=n.MAX;const P={[d0]:n.ZERO,[p0]:n.ONE,[m0]:n.SRC_COLOR,[Hl]:n.SRC_ALPHA,[y0]:n.SRC_ALPHA_SATURATE,[x0]:n.DST_COLOR,[_0]:n.DST_ALPHA,[g0]:n.ONE_MINUS_SRC_COLOR,[kl]:n.ONE_MINUS_SRC_ALPHA,[M0]:n.ONE_MINUS_DST_COLOR,[v0]:n.ONE_MINUS_DST_ALPHA,[S0]:n.CONSTANT_COLOR,[E0]:n.ONE_MINUS_CONSTANT_COLOR,[b0]:n.CONSTANT_ALPHA,[T0]:n.ONE_MINUS_CONSTANT_ALPHA};function S(z,Tt,rt,ft,St,wt,Gt,ve,Pe,ie){if(z===li){_===!0&&(Y(n.BLEND),_=!1);return}if(_===!1&&(O(n.BLEND),_=!0),z!==l0){if(z!==m||ie!==w){if((d!==Xi||M!==Xi)&&(n.blendEquation(n.FUNC_ADD),d=Xi,M=Xi),ie)switch(z){case Hs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ks:n.blendFunc(n.ONE,n.ONE);break;case gh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _h:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ks:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case gh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _h:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}y=null,T=null,L=null,I=null,C.set(0,0,0),U=0,m=z,w=ie}return}St=St||Tt,wt=wt||rt,Gt=Gt||ft,(Tt!==d||St!==M)&&(n.blendEquationSeparate(A[Tt],A[St]),d=Tt,M=St),(rt!==y||ft!==T||wt!==L||Gt!==I)&&(n.blendFuncSeparate(P[rt],P[ft],P[wt],P[Gt]),y=rt,T=ft,L=wt,I=Gt),(ve.equals(C)===!1||Pe!==U)&&(n.blendColor(ve.r,ve.g,ve.b,Pe),C.copy(ve),U=Pe),m=z,w=!1}function it(z,Tt){z.side===An?Y(n.CULL_FACE):O(n.CULL_FACE);let rt=z.side===on;Tt&&(rt=!rt),J(rt),z.blending===Hs&&z.transparent===!1?S(li):S(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const ft=z.stencilWrite;a.setTest(ft),ft&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),q(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?O(n.SAMPLE_ALPHA_TO_COVERAGE):Y(n.SAMPLE_ALPHA_TO_COVERAGE)}function J(z){E!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),E=z)}function Z(z){z!==r0?(O(n.CULL_FACE),z!==D&&(z===mh?n.cullFace(n.BACK):z===o0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Y(n.CULL_FACE),D=z}function lt(z){z!==B&&(tt&&n.lineWidth(z),B=z)}function q(z,Tt,rt){z?(O(n.POLYGON_OFFSET_FILL),(V!==Tt||ot!==rt)&&(n.polygonOffset(Tt,rt),V=Tt,ot=rt)):Y(n.POLYGON_OFFSET_FILL)}function F(z){z?O(n.SCISSOR_TEST):Y(n.SCISSOR_TEST)}function x(z){z===void 0&&(z=n.TEXTURE0+at-1),_t!==z&&(n.activeTexture(z),_t=z)}function v(z,Tt,rt){rt===void 0&&(_t===null?rt=n.TEXTURE0+at-1:rt=_t);let ft=yt[rt];ft===void 0&&(ft={type:void 0,texture:void 0},yt[rt]=ft),(ft.type!==z||ft.texture!==Tt)&&(_t!==rt&&(n.activeTexture(rt),_t=rt),n.bindTexture(z,Tt||Et[z]),ft.type=z,ft.texture=Tt)}function R(){const z=yt[_t];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function N(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function H(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function G(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ht(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Pt(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function st(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pt(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function bt(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function kt(z){Zt.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Zt.copy(z))}function Mt(z){ct.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),ct.copy(z))}function Bt(z,Tt){let rt=c.get(Tt);rt===void 0&&(rt=new WeakMap,c.set(Tt,rt));let ft=rt.get(z);ft===void 0&&(ft=n.getUniformBlockIndex(Tt,z.name),rt.set(z,ft))}function Vt(z,Tt){const ft=c.get(Tt).get(z);l.get(Tt)!==ft&&(n.uniformBlockBinding(Tt,ft,z.__bindingPointIndex),l.set(Tt,ft))}function Qt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},_t=null,yt={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,y=null,T=null,M=null,L=null,I=null,C=new jt(0,0,0),U=0,w=!1,E=null,D=null,B=null,V=null,ot=null,Zt.set(0,0,n.canvas.width,n.canvas.height),ct.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:O,disable:Y,bindFramebuffer:k,drawBuffers:ut,useProgram:xt,setBlending:S,setMaterial:it,setFlipSided:J,setCullFace:Z,setLineWidth:lt,setPolygonOffset:q,setScissorTest:F,activeTexture:x,bindTexture:v,unbindTexture:R,compressedTexImage2D:N,compressedTexImage3D:H,texImage2D:pt,texImage3D:bt,updateUBOMapping:Bt,uniformBlockBinding:Vt,texStorage2D:Pt,texStorage3D:st,texSubImage2D:G,texSubImage3D:gt,compressedTexSubImage2D:ht,compressedTexSubImage3D:dt,scissor:kt,viewport:Mt,reset:Qt}}function ff(n,t,e,i){const s=kE(i);switch(e){case yp:return n*t;case Ep:return n*t;case bp:return n*t*2;case Tp:return n*t/s.components*s.byteLength;case nu:return n*t/s.components*s.byteLength;case Ap:return n*t*2/s.components*s.byteLength;case iu:return n*t*2/s.components*s.byteLength;case Sp:return n*t*3/s.components*s.byteLength;case _n:return n*t*4/s.components*s.byteLength;case su:return n*t*4/s.components*s.byteLength;case zo:case Ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ko:case Vo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ql:case ec:return Math.max(n,16)*Math.max(t,8)/4;case Jl:case tc:return Math.max(n,8)*Math.max(t,8)/2;case nc:case ic:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case sc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case rc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case oc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ac:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case lc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case cc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case uc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case hc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case fc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case dc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case pc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case mc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case gc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case _c:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case vc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Go:case xc:case Mc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case wp:case yc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Sc:case Ec:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kE(n){switch(n){case Gn:case vp:return{byteLength:1,components:1};case kr:case xp:case ci:return{byteLength:2,components:1};case tu:case eu:return{byteLength:2,components:4};case es:case Qc:case oi:return{byteLength:4,components:1};case Mp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function VE(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ft,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,v){return p?new OffscreenCanvas(x,v):ia("canvas")}function _(x,v,R){let N=1;const H=F(x);if((H.width>R||H.height>R)&&(N=R/Math.max(H.width,H.height)),N<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const G=Math.floor(N*H.width),gt=Math.floor(N*H.height);h===void 0&&(h=g(G,gt));const ht=v?g(G,gt):h;return ht.width=G,ht.height=gt,ht.getContext("2d").drawImage(x,0,0,G,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+G+"x"+gt+")."),ht}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),x;return x}function m(x){return x.generateMipmaps}function d(x){n.generateMipmap(x)}function y(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(x,v,R,N,H=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let G=v;if(v===n.RED&&(R===n.FLOAT&&(G=n.R32F),R===n.HALF_FLOAT&&(G=n.R16F),R===n.UNSIGNED_BYTE&&(G=n.R8)),v===n.RED_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.R8UI),R===n.UNSIGNED_SHORT&&(G=n.R16UI),R===n.UNSIGNED_INT&&(G=n.R32UI),R===n.BYTE&&(G=n.R8I),R===n.SHORT&&(G=n.R16I),R===n.INT&&(G=n.R32I)),v===n.RG&&(R===n.FLOAT&&(G=n.RG32F),R===n.HALF_FLOAT&&(G=n.RG16F),R===n.UNSIGNED_BYTE&&(G=n.RG8)),v===n.RG_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.RG8UI),R===n.UNSIGNED_SHORT&&(G=n.RG16UI),R===n.UNSIGNED_INT&&(G=n.RG32UI),R===n.BYTE&&(G=n.RG8I),R===n.SHORT&&(G=n.RG16I),R===n.INT&&(G=n.RG32I)),v===n.RGB_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.RGB8UI),R===n.UNSIGNED_SHORT&&(G=n.RGB16UI),R===n.UNSIGNED_INT&&(G=n.RGB32UI),R===n.BYTE&&(G=n.RGB8I),R===n.SHORT&&(G=n.RGB16I),R===n.INT&&(G=n.RGB32I)),v===n.RGBA_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),R===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),R===n.UNSIGNED_INT&&(G=n.RGBA32UI),R===n.BYTE&&(G=n.RGBA8I),R===n.SHORT&&(G=n.RGBA16I),R===n.INT&&(G=n.RGBA32I)),v===n.RGB&&R===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),v===n.RGBA){const gt=H?Ta:te.getTransfer(N);R===n.FLOAT&&(G=n.RGBA32F),R===n.HALF_FLOAT&&(G=n.RGBA16F),R===n.UNSIGNED_BYTE&&(G=gt===ce?n.SRGB8_ALPHA8:n.RGBA8),R===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),R===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function M(x,v){let R;return x?v===null||v===es||v===Js?R=n.DEPTH24_STENCIL8:v===oi?R=n.DEPTH32F_STENCIL8:v===kr&&(R=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===es||v===Js?R=n.DEPTH_COMPONENT24:v===oi?R=n.DEPTH_COMPONENT32F:v===kr&&(R=n.DEPTH_COMPONENT16),R}function L(x,v){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==fn&&x.minFilter!==Rn?Math.log2(Math.max(v.width,v.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?v.mipmaps.length:1}function I(x){const v=x.target;v.removeEventListener("dispose",I),U(v),v.isVideoTexture&&u.delete(v)}function C(x){const v=x.target;v.removeEventListener("dispose",C),E(v)}function U(x){const v=i.get(x);if(v.__webglInit===void 0)return;const R=x.source,N=f.get(R);if(N){const H=N[v.__cacheKey];H.usedTimes--,H.usedTimes===0&&w(x),Object.keys(N).length===0&&f.delete(R)}i.remove(x)}function w(x){const v=i.get(x);n.deleteTexture(v.__webglTexture);const R=x.source,N=f.get(R);delete N[v.__cacheKey],o.memory.textures--}function E(x){const v=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(v.__webglFramebuffer[N]))for(let H=0;H<v.__webglFramebuffer[N].length;H++)n.deleteFramebuffer(v.__webglFramebuffer[N][H]);else n.deleteFramebuffer(v.__webglFramebuffer[N]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[N])}else{if(Array.isArray(v.__webglFramebuffer))for(let N=0;N<v.__webglFramebuffer.length;N++)n.deleteFramebuffer(v.__webglFramebuffer[N]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let N=0;N<v.__webglColorRenderbuffer.length;N++)v.__webglColorRenderbuffer[N]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[N]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const R=x.textures;for(let N=0,H=R.length;N<H;N++){const G=i.get(R[N]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(R[N])}i.remove(x)}let D=0;function B(){D=0}function V(){const x=D;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),D+=1,x}function ot(x){const v=[];return v.push(x.wrapS),v.push(x.wrapT),v.push(x.wrapR||0),v.push(x.magFilter),v.push(x.minFilter),v.push(x.anisotropy),v.push(x.internalFormat),v.push(x.format),v.push(x.type),v.push(x.generateMipmaps),v.push(x.premultiplyAlpha),v.push(x.flipY),v.push(x.unpackAlignment),v.push(x.colorSpace),v.join()}function at(x,v){const R=i.get(x);if(x.isVideoTexture&&lt(x),x.isRenderTargetTexture===!1&&x.version>0&&R.__version!==x.version){const N=x.image;if(N===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(N.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(R,x,v);return}}e.bindTexture(n.TEXTURE_2D,R.__webglTexture,n.TEXTURE0+v)}function tt(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){ct(R,x,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,R.__webglTexture,n.TEXTURE0+v)}function Q(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){ct(R,x,v);return}e.bindTexture(n.TEXTURE_3D,R.__webglTexture,n.TEXTURE0+v)}function $(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){mt(R,x,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+v)}const _t={[Hr]:n.REPEAT,[Yi]:n.CLAMP_TO_EDGE,[Zl]:n.MIRRORED_REPEAT},yt={[fn]:n.NEAREST,[C0]:n.NEAREST_MIPMAP_NEAREST,[ao]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[Ga]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},Ct={[I0]:n.NEVER,[z0]:n.ALWAYS,[U0]:n.LESS,[Cp]:n.LEQUAL,[N0]:n.EQUAL,[B0]:n.GEQUAL,[O0]:n.GREATER,[F0]:n.NOTEQUAL};function Ut(x,v){if(v.type===oi&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Rn||v.magFilter===Ga||v.magFilter===ao||v.magFilter===Ci||v.minFilter===Rn||v.minFilter===Ga||v.minFilter===ao||v.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,_t[v.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,_t[v.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,_t[v.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,yt[v.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,yt[v.minFilter]),v.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,Ct[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===fn||v.minFilter!==ao&&v.minFilter!==Ci||v.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const R=t.get("EXT_texture_filter_anisotropic");n.texParameterf(x,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Zt(x,v){let R=!1;x.__webglInit===void 0&&(x.__webglInit=!0,v.addEventListener("dispose",I));const N=v.source;let H=f.get(N);H===void 0&&(H={},f.set(N,H));const G=ot(v);if(G!==x.__cacheKey){H[G]===void 0&&(H[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,R=!0),H[G].usedTimes++;const gt=H[x.__cacheKey];gt!==void 0&&(H[x.__cacheKey].usedTimes--,gt.usedTimes===0&&w(v)),x.__cacheKey=G,x.__webglTexture=H[G].texture}return R}function ct(x,v,R){let N=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(N=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(N=n.TEXTURE_3D);const H=Zt(x,v),G=v.source;e.bindTexture(N,x.__webglTexture,n.TEXTURE0+R);const gt=i.get(G);if(G.version!==gt.__version||H===!0){e.activeTexture(n.TEXTURE0+R);const ht=te.getPrimaries(te.workingColorSpace),dt=v.colorSpace===Ri?null:te.getPrimaries(v.colorSpace),Pt=v.colorSpace===Ri||ht===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let st=_(v.image,!1,s.maxTextureSize);st=q(v,st);const pt=r.convert(v.format,v.colorSpace),bt=r.convert(v.type);let kt=T(v.internalFormat,pt,bt,v.colorSpace,v.isVideoTexture);Ut(N,v);let Mt;const Bt=v.mipmaps,Vt=v.isVideoTexture!==!0,Qt=gt.__version===void 0||H===!0,z=G.dataReady,Tt=L(v,st);if(v.isDepthTexture)kt=M(v.format===Qs,v.type),Qt&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,kt,st.width,st.height):e.texImage2D(n.TEXTURE_2D,0,kt,st.width,st.height,0,pt,bt,null));else if(v.isDataTexture)if(Bt.length>0){Vt&&Qt&&e.texStorage2D(n.TEXTURE_2D,Tt,kt,Bt[0].width,Bt[0].height);for(let rt=0,ft=Bt.length;rt<ft;rt++)Mt=Bt[rt],Vt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,Mt.width,Mt.height,pt,bt,Mt.data):e.texImage2D(n.TEXTURE_2D,rt,kt,Mt.width,Mt.height,0,pt,bt,Mt.data);v.generateMipmaps=!1}else Vt?(Qt&&e.texStorage2D(n.TEXTURE_2D,Tt,kt,st.width,st.height),z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,st.width,st.height,pt,bt,st.data)):e.texImage2D(n.TEXTURE_2D,0,kt,st.width,st.height,0,pt,bt,st.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Vt&&Qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Tt,kt,Bt[0].width,Bt[0].height,st.depth);for(let rt=0,ft=Bt.length;rt<ft;rt++)if(Mt=Bt[rt],v.format!==_n)if(pt!==null)if(Vt){if(z)if(v.layerUpdates.size>0){const St=ff(Mt.width,Mt.height,v.format,v.type);for(const wt of v.layerUpdates){const Gt=Mt.data.subarray(wt*St/Mt.data.BYTES_PER_ELEMENT,(wt+1)*St/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,wt,Mt.width,Mt.height,1,pt,Gt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,Mt.width,Mt.height,st.depth,pt,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,kt,Mt.width,Mt.height,st.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,Mt.width,Mt.height,st.depth,pt,bt,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,kt,Mt.width,Mt.height,st.depth,0,pt,bt,Mt.data)}else{Vt&&Qt&&e.texStorage2D(n.TEXTURE_2D,Tt,kt,Bt[0].width,Bt[0].height);for(let rt=0,ft=Bt.length;rt<ft;rt++)Mt=Bt[rt],v.format!==_n?pt!==null?Vt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,Mt.width,Mt.height,pt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,Mt.width,Mt.height,pt,bt,Mt.data):e.texImage2D(n.TEXTURE_2D,rt,kt,Mt.width,Mt.height,0,pt,bt,Mt.data)}else if(v.isDataArrayTexture)if(Vt){if(Qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Tt,kt,st.width,st.height,st.depth),z)if(v.layerUpdates.size>0){const rt=ff(st.width,st.height,v.format,v.type);for(const ft of v.layerUpdates){const St=st.data.subarray(ft*rt/st.data.BYTES_PER_ELEMENT,(ft+1)*rt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ft,st.width,st.height,1,pt,bt,St)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,pt,bt,st.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,kt,st.width,st.height,st.depth,0,pt,bt,st.data);else if(v.isData3DTexture)Vt?(Qt&&e.texStorage3D(n.TEXTURE_3D,Tt,kt,st.width,st.height,st.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,pt,bt,st.data)):e.texImage3D(n.TEXTURE_3D,0,kt,st.width,st.height,st.depth,0,pt,bt,st.data);else if(v.isFramebufferTexture){if(Qt)if(Vt)e.texStorage2D(n.TEXTURE_2D,Tt,kt,st.width,st.height);else{let rt=st.width,ft=st.height;for(let St=0;St<Tt;St++)e.texImage2D(n.TEXTURE_2D,St,kt,rt,ft,0,pt,bt,null),rt>>=1,ft>>=1}}else if(Bt.length>0){if(Vt&&Qt){const rt=F(Bt[0]);e.texStorage2D(n.TEXTURE_2D,Tt,kt,rt.width,rt.height)}for(let rt=0,ft=Bt.length;rt<ft;rt++)Mt=Bt[rt],Vt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,pt,bt,Mt):e.texImage2D(n.TEXTURE_2D,rt,kt,pt,bt,Mt);v.generateMipmaps=!1}else if(Vt){if(Qt){const rt=F(st);e.texStorage2D(n.TEXTURE_2D,Tt,kt,rt.width,rt.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,bt,st)}else e.texImage2D(n.TEXTURE_2D,0,kt,pt,bt,st);m(v)&&d(N),gt.__version=G.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function mt(x,v,R){if(v.image.length!==6)return;const N=Zt(x,v),H=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+R);const G=i.get(H);if(H.version!==G.__version||N===!0){e.activeTexture(n.TEXTURE0+R);const gt=te.getPrimaries(te.workingColorSpace),ht=v.colorSpace===Ri?null:te.getPrimaries(v.colorSpace),dt=v.colorSpace===Ri||gt===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Pt=v.isCompressedTexture||v.image[0].isCompressedTexture,st=v.image[0]&&v.image[0].isDataTexture,pt=[];for(let ft=0;ft<6;ft++)!Pt&&!st?pt[ft]=_(v.image[ft],!0,s.maxCubemapSize):pt[ft]=st?v.image[ft].image:v.image[ft],pt[ft]=q(v,pt[ft]);const bt=pt[0],kt=r.convert(v.format,v.colorSpace),Mt=r.convert(v.type),Bt=T(v.internalFormat,kt,Mt,v.colorSpace),Vt=v.isVideoTexture!==!0,Qt=G.__version===void 0||N===!0,z=H.dataReady;let Tt=L(v,bt);Ut(n.TEXTURE_CUBE_MAP,v);let rt;if(Pt){Vt&&Qt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,Bt,bt.width,bt.height);for(let ft=0;ft<6;ft++){rt=pt[ft].mipmaps;for(let St=0;St<rt.length;St++){const wt=rt[St];v.format!==_n?kt!==null?Vt?z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,kt,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,Bt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,kt,Mt,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,Bt,wt.width,wt.height,0,kt,Mt,wt.data)}}}else{if(rt=v.mipmaps,Vt&&Qt){rt.length>0&&Tt++;const ft=F(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,Bt,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(st){Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,pt[ft].width,pt[ft].height,kt,Mt,pt[ft].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,Bt,pt[ft].width,pt[ft].height,0,kt,Mt,pt[ft].data);for(let St=0;St<rt.length;St++){const Gt=rt[St].image[ft].image;Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Gt.width,Gt.height,kt,Mt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,Bt,Gt.width,Gt.height,0,kt,Mt,Gt.data)}}else{Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,kt,Mt,pt[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,Bt,kt,Mt,pt[ft]);for(let St=0;St<rt.length;St++){const wt=rt[St];Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,kt,Mt,wt.image[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,Bt,kt,Mt,wt.image[ft])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),G.__version=H.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function Et(x,v,R,N,H,G){const gt=r.convert(R.format,R.colorSpace),ht=r.convert(R.type),dt=T(R.internalFormat,gt,ht,R.colorSpace),Pt=i.get(v),st=i.get(R);if(st.__renderTarget=v,!Pt.__hasExternalTextures){const pt=Math.max(1,v.width>>G),bt=Math.max(1,v.height>>G);H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?e.texImage3D(H,G,dt,pt,bt,v.depth,0,gt,ht,null):e.texImage2D(H,G,dt,pt,bt,0,gt,ht,null)}e.bindFramebuffer(n.FRAMEBUFFER,x),Z(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,N,H,st.__webglTexture,0,J(v)):(H===n.TEXTURE_2D||H>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,N,H,st.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function O(x,v,R){if(n.bindRenderbuffer(n.RENDERBUFFER,x),v.depthBuffer){const N=v.depthTexture,H=N&&N.isDepthTexture?N.type:null,G=M(v.stencilBuffer,H),gt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ht=J(v);Z(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ht,G,v.width,v.height):R?n.renderbufferStorageMultisample(n.RENDERBUFFER,ht,G,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,G,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,x)}else{const N=v.textures;for(let H=0;H<N.length;H++){const G=N[H],gt=r.convert(G.format,G.colorSpace),ht=r.convert(G.type),dt=T(G.internalFormat,gt,ht,G.colorSpace),Pt=J(v);R&&Z(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,dt,v.width,v.height):Z(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt,dt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,dt,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Y(x,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,x),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const N=i.get(v.depthTexture);N.__renderTarget=v,(!N.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),at(v.depthTexture,0);const H=N.__webglTexture,G=J(v);if(v.depthTexture.format===Vs)Z(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,H,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,H,0);else if(v.depthTexture.format===Qs)Z(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,H,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,H,0);else throw new Error("Unknown depthTexture format")}function k(x){const v=i.get(x),R=x.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==x.depthTexture){const N=x.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),N){const H=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,N.removeEventListener("dispose",H)};N.addEventListener("dispose",H),v.__depthDisposeCallback=H}v.__boundDepthTexture=N}if(x.depthTexture&&!v.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");Y(v.__webglFramebuffer,x)}else if(R){v.__webglDepthbuffer=[];for(let N=0;N<6;N++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[N]),v.__webglDepthbuffer[N]===void 0)v.__webglDepthbuffer[N]=n.createRenderbuffer(),O(v.__webglDepthbuffer[N],x,!1);else{const H=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer[N];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,G)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),O(v.__webglDepthbuffer,x,!1);else{const N=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,N,n.RENDERBUFFER,H)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ut(x,v,R){const N=i.get(x);v!==void 0&&Et(N.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),R!==void 0&&k(x)}function xt(x){const v=x.texture,R=i.get(x),N=i.get(v);x.addEventListener("dispose",C);const H=x.textures,G=x.isWebGLCubeRenderTarget===!0,gt=H.length>1;if(gt||(N.__webglTexture===void 0&&(N.__webglTexture=n.createTexture()),N.__version=v.version,o.memory.textures++),G){R.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(v.mipmaps&&v.mipmaps.length>0){R.__webglFramebuffer[ht]=[];for(let dt=0;dt<v.mipmaps.length;dt++)R.__webglFramebuffer[ht][dt]=n.createFramebuffer()}else R.__webglFramebuffer[ht]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){R.__webglFramebuffer=[];for(let ht=0;ht<v.mipmaps.length;ht++)R.__webglFramebuffer[ht]=n.createFramebuffer()}else R.__webglFramebuffer=n.createFramebuffer();if(gt)for(let ht=0,dt=H.length;ht<dt;ht++){const Pt=i.get(H[ht]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=n.createTexture(),o.memory.textures++)}if(x.samples>0&&Z(x)===!1){R.__webglMultisampledFramebuffer=n.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let ht=0;ht<H.length;ht++){const dt=H[ht];R.__webglColorRenderbuffer[ht]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,R.__webglColorRenderbuffer[ht]);const Pt=r.convert(dt.format,dt.colorSpace),st=r.convert(dt.type),pt=T(dt.internalFormat,Pt,st,dt.colorSpace,x.isXRRenderTarget===!0),bt=J(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,bt,pt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,R.__webglColorRenderbuffer[ht])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(R.__webglDepthRenderbuffer=n.createRenderbuffer(),O(R.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture),Ut(n.TEXTURE_CUBE_MAP,v);for(let ht=0;ht<6;ht++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)Et(R.__webglFramebuffer[ht][dt],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,dt);else Et(R.__webglFramebuffer[ht],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let ht=0,dt=H.length;ht<dt;ht++){const Pt=H[ht],st=i.get(Pt);e.bindTexture(n.TEXTURE_2D,st.__webglTexture),Ut(n.TEXTURE_2D,Pt),Et(R.__webglFramebuffer,x,Pt,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,0),m(Pt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let ht=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ht=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ht,N.__webglTexture),Ut(ht,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)Et(R.__webglFramebuffer[dt],x,v,n.COLOR_ATTACHMENT0,ht,dt);else Et(R.__webglFramebuffer,x,v,n.COLOR_ATTACHMENT0,ht,0);m(v)&&d(ht),e.unbindTexture()}x.depthBuffer&&k(x)}function A(x){const v=x.textures;for(let R=0,N=v.length;R<N;R++){const H=v[R];if(m(H)){const G=y(x),gt=i.get(H).__webglTexture;e.bindTexture(G,gt),d(G),e.unbindTexture()}}}const P=[],S=[];function it(x){if(x.samples>0){if(Z(x)===!1){const v=x.textures,R=x.width,N=x.height;let H=n.COLOR_BUFFER_BIT;const G=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(x),ht=v.length>1;if(ht)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(H|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(H|=n.STENCIL_BUFFER_BIT)),ht){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);const Pt=i.get(v[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pt,0)}n.blitFramebuffer(0,0,R,N,0,0,R,N,H,n.NEAREST),l===!0&&(P.length=0,S.length=0,P.push(n.COLOR_ATTACHMENT0+dt),x.depthBuffer&&x.resolveDepthBuffer===!1&&(P.push(G),S.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,S)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,P))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ht)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,gt.__webglColorRenderbuffer[dt]);const Pt=i.get(v[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const v=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function J(x){return Math.min(s.maxSamples,x.samples)}function Z(x){const v=i.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function lt(x){const v=o.render.frame;u.get(x)!==v&&(u.set(x,v),x.update())}function q(x,v){const R=x.colorSpace,N=x.format,H=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||R!==nr&&R!==Ri&&(te.getTransfer(R)===ce?(N!==_n||H!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),v}function F(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=B,this.setTexture2D=at,this.setTexture2DArray=tt,this.setTexture3D=Q,this.setTextureCube=$,this.rebindTextures=ut,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=A,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=k,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=Z}function GE(n,t){function e(i,s=Ri){let r;const o=te.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===tu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===eu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===vp)return n.BYTE;if(i===xp)return n.SHORT;if(i===kr)return n.UNSIGNED_SHORT;if(i===Qc)return n.INT;if(i===es)return n.UNSIGNED_INT;if(i===oi)return n.FLOAT;if(i===ci)return n.HALF_FLOAT;if(i===yp)return n.ALPHA;if(i===Sp)return n.RGB;if(i===_n)return n.RGBA;if(i===Ep)return n.LUMINANCE;if(i===bp)return n.LUMINANCE_ALPHA;if(i===Vs)return n.DEPTH_COMPONENT;if(i===Qs)return n.DEPTH_STENCIL;if(i===Tp)return n.RED;if(i===nu)return n.RED_INTEGER;if(i===Ap)return n.RG;if(i===iu)return n.RG_INTEGER;if(i===su)return n.RGBA_INTEGER;if(i===zo||i===Ho||i===ko||i===Vo)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===zo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===zo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ho)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ko)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Jl||i===Ql||i===tc||i===ec)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Jl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ql)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===tc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ec)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===nc||i===ic||i===sc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===nc||i===ic)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===sc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===rc||i===oc||i===ac||i===lc||i===cc||i===uc||i===hc||i===fc||i===dc||i===pc||i===mc||i===gc||i===_c||i===vc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===rc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===oc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ac)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===lc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===uc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===hc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===dc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===mc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===gc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===_c)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Go||i===xc||i===Mc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Go)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wp||i===yc||i===Sc||i===Ec)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Go)return r.COMPRESSED_RED_RGTC1_EXT;if(i===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Sc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ec)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Js?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class WE extends gn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ds extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XE={type:"move"};class _l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ds,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ds,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ds,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(XE)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ds;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const jE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class YE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ze,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ze({vertexShader:jE,fragmentShader:qE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new Aa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $E extends os{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=new YE,m=e.getContextAttributes();let d=null,y=null;const T=[],M=[],L=new Ft;let I=null;const C=new gn;C.viewport=new ye;const U=new gn;U.viewport=new ye;const w=[C,U],E=new WE;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ct){let mt=T[ct];return mt===void 0&&(mt=new _l,T[ct]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(ct){let mt=T[ct];return mt===void 0&&(mt=new _l,T[ct]=mt),mt.getGripSpace()},this.getHand=function(ct){let mt=T[ct];return mt===void 0&&(mt=new _l,T[ct]=mt),mt.getHandSpace()};function V(ct){const mt=M.indexOf(ct.inputSource);if(mt===-1)return;const Et=T[mt];Et!==void 0&&(Et.update(ct.inputSource,ct.frame,c||o),Et.dispatchEvent({type:ct.type,data:ct.inputSource}))}function ot(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",ot),s.removeEventListener("inputsourceschange",at);for(let ct=0;ct<T.length;ct++){const mt=M[ct];mt!==null&&(M[ct]=null,T[ct].disconnect(mt))}D=null,B=null,_.reset(),t.setRenderTarget(d),p=null,f=null,h=null,s=null,y=null,Zt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ct){r=ct,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ct){a=ct,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ct){c=ct},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ct){if(s=ct,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",ot),s.addEventListener("inputsourceschange",at),m.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const mt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Pn(p.framebufferWidth,p.framebufferHeight,{format:_n,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let mt=null,Et=null,O=null;m.depth&&(O=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=m.stencil?Qs:Vs,Et=m.stencil?Js:es);const Y={colorFormat:e.RGBA8,depthFormat:O,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer(Y),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),y=new Pn(f.textureWidth,f.textureHeight,{format:_n,type:Gn,depthTexture:new Hp(f.textureWidth,f.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Zt.setContext(s),Zt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function at(ct){for(let mt=0;mt<ct.removed.length;mt++){const Et=ct.removed[mt],O=M.indexOf(Et);O>=0&&(M[O]=null,T[O].disconnect(Et))}for(let mt=0;mt<ct.added.length;mt++){const Et=ct.added[mt];let O=M.indexOf(Et);if(O===-1){for(let k=0;k<T.length;k++)if(k>=M.length){M.push(Et),O=k;break}else if(M[k]===null){M[k]=Et,O=k;break}if(O===-1)break}const Y=T[O];Y&&Y.connect(Et)}}const tt=new X,Q=new X;function $(ct,mt,Et){tt.setFromMatrixPosition(mt.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const O=tt.distanceTo(Q),Y=mt.projectionMatrix.elements,k=Et.projectionMatrix.elements,ut=Y[14]/(Y[10]-1),xt=Y[14]/(Y[10]+1),A=(Y[9]+1)/Y[5],P=(Y[9]-1)/Y[5],S=(Y[8]-1)/Y[0],it=(k[8]+1)/k[0],J=ut*S,Z=ut*it,lt=O/(-S+it),q=lt*-S;if(mt.matrixWorld.decompose(ct.position,ct.quaternion,ct.scale),ct.translateX(q),ct.translateZ(lt),ct.matrixWorld.compose(ct.position,ct.quaternion,ct.scale),ct.matrixWorldInverse.copy(ct.matrixWorld).invert(),Y[10]===-1)ct.projectionMatrix.copy(mt.projectionMatrix),ct.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const F=ut+lt,x=xt+lt,v=J-q,R=Z+(O-q),N=A*xt/x*F,H=P*xt/x*F;ct.projectionMatrix.makePerspective(v,R,N,H,F,x),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert()}}function _t(ct,mt){mt===null?ct.matrixWorld.copy(ct.matrix):ct.matrixWorld.multiplyMatrices(mt.matrixWorld,ct.matrix),ct.matrixWorldInverse.copy(ct.matrixWorld).invert()}this.updateCamera=function(ct){if(s===null)return;let mt=ct.near,Et=ct.far;_.texture!==null&&(_.depthNear>0&&(mt=_.depthNear),_.depthFar>0&&(Et=_.depthFar)),E.near=U.near=C.near=mt,E.far=U.far=C.far=Et,(D!==E.near||B!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),D=E.near,B=E.far),C.layers.mask=ct.layers.mask|2,U.layers.mask=ct.layers.mask|4,E.layers.mask=C.layers.mask|U.layers.mask;const O=ct.parent,Y=E.cameras;_t(E,O);for(let k=0;k<Y.length;k++)_t(Y[k],O);Y.length===2?$(E,C,U):E.projectionMatrix.copy(C.projectionMatrix),yt(ct,E,O)};function yt(ct,mt,Et){Et===null?ct.matrix.copy(mt.matrixWorld):(ct.matrix.copy(Et.matrixWorld),ct.matrix.invert(),ct.matrix.multiply(mt.matrixWorld)),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.updateMatrixWorld(!0),ct.projectionMatrix.copy(mt.projectionMatrix),ct.projectionMatrixInverse.copy(mt.projectionMatrixInverse),ct.isPerspectiveCamera&&(ct.fov=bc*2*Math.atan(1/ct.projectionMatrix.elements[5]),ct.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(ct){l=ct,f!==null&&(f.fixedFoveation=ct),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ct)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let Ct=null;function Ut(ct,mt){if(u=mt.getViewerPose(c||o),g=mt,u!==null){const Et=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let O=!1;Et.length!==E.cameras.length&&(E.cameras.length=0,O=!0);for(let k=0;k<Et.length;k++){const ut=Et[k];let xt=null;if(p!==null)xt=p.getViewport(ut);else{const P=h.getViewSubImage(f,ut);xt=P.viewport,k===0&&(t.setRenderTargetTextures(y,P.colorTexture,f.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(y))}let A=w[k];A===void 0&&(A=new gn,A.layers.enable(k),A.viewport=new ye,w[k]=A),A.matrix.fromArray(ut.transform.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale),A.projectionMatrix.fromArray(ut.projectionMatrix),A.projectionMatrixInverse.copy(A.projectionMatrix).invert(),A.viewport.set(xt.x,xt.y,xt.width,xt.height),k===0&&(E.matrix.copy(A.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),O===!0&&E.cameras.push(A)}const Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")){const k=h.getDepthInformation(Et[0]);k&&k.isValid&&k.texture&&_.init(t,k,s.renderState)}}for(let Et=0;Et<T.length;Et++){const O=M[Et],Y=T[Et];O!==null&&Y!==void 0&&Y.update(O,mt,c||o)}Ct&&Ct(ct,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),g=null}const Zt=new zp;Zt.setAnimationLoop(Ut),this.setAnimationLoop=function(ct){Ct=ct},this.dispose=function(){}}}const ki=new Wn,KE=new de;function ZE(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Op(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,y,T,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,y,T):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===on&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===on&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const y=t.get(d),T=y.envMap,M=y.envMapRotation;T&&(m.envMap.value=T,ki.copy(M),ki.x*=-1,ki.y*=-1,ki.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),m.envMapRotation.value.setFromMatrix4(KE.makeRotationFromEuler(ki)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,y,T){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*y,m.scale.value=T*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,y){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===on&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const y=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function JE(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){const M=T.program;i.uniformBlockBinding(y,M)}function c(y,T){let M=s[y.id];M===void 0&&(g(y),M=u(y),s[y.id]=M,y.addEventListener("dispose",m));const L=T.program;i.updateUBOMapping(y,L);const I=t.render.frame;r[y.id]!==I&&(f(y),r[y.id]=I)}function u(y){const T=h();y.__bindingPointIndex=T;const M=n.createBuffer(),L=y.__size,I=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,L,I),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,M),M}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const T=s[y.id],M=y.uniforms,L=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let I=0,C=M.length;I<C;I++){const U=Array.isArray(M[I])?M[I]:[M[I]];for(let w=0,E=U.length;w<E;w++){const D=U[w];if(p(D,I,w,L)===!0){const B=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let ot=0;for(let at=0;at<V.length;at++){const tt=V[at],Q=_(tt);typeof tt=="number"||typeof tt=="boolean"?(D.__data[0]=tt,n.bufferSubData(n.UNIFORM_BUFFER,B+ot,D.__data)):tt.isMatrix3?(D.__data[0]=tt.elements[0],D.__data[1]=tt.elements[1],D.__data[2]=tt.elements[2],D.__data[3]=0,D.__data[4]=tt.elements[3],D.__data[5]=tt.elements[4],D.__data[6]=tt.elements[5],D.__data[7]=0,D.__data[8]=tt.elements[6],D.__data[9]=tt.elements[7],D.__data[10]=tt.elements[8],D.__data[11]=0):(tt.toArray(D.__data,ot),ot+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,T,M,L){const I=y.value,C=T+"_"+M;if(L[C]===void 0)return typeof I=="number"||typeof I=="boolean"?L[C]=I:L[C]=I.clone(),!0;{const U=L[C];if(typeof I=="number"||typeof I=="boolean"){if(U!==I)return L[C]=I,!0}else if(U.equals(I)===!1)return U.copy(I),!0}return!1}function g(y){const T=y.uniforms;let M=0;const L=16;for(let C=0,U=T.length;C<U;C++){const w=Array.isArray(T[C])?T[C]:[T[C]];for(let E=0,D=w.length;E<D;E++){const B=w[E],V=Array.isArray(B.value)?B.value:[B.value];for(let ot=0,at=V.length;ot<at;ot++){const tt=V[ot],Q=_(tt),$=M%L,_t=$%Q.boundary,yt=$+_t;M+=_t,yt!==0&&L-yt<Q.storage&&(M+=L-yt),B.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=M,M+=Q.storage}}}const I=M%L;return I>0&&(M+=L-I),y.__size=M,y.__cache={},this}function _(y){const T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),T}function m(y){const T=y.target;T.removeEventListener("dispose",m);const M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class QE{constructor(t={}){const{canvas:e=V0(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const y=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nn,this.toneMapping=Pi,this.toneMappingExposure=1;const M=this;let L=!1,I=0,C=0,U=null,w=-1,E=null;const D=new ye,B=new ye;let V=null;const ot=new jt(0);let at=0,tt=e.width,Q=e.height,$=1,_t=null,yt=null;const Ct=new ye(0,0,tt,Q),Ut=new ye(0,0,tt,Q);let Zt=!1;const ct=new ou;let mt=!1,Et=!1;const O=new de,Y=new de,k=new X,ut=new ye,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let A=!1;function P(){return U===null?$:1}let S=i;function it(b,W){return e.getContext(b,W)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zc}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",wt,!1),S===null){const W="webgl2";if(S=it(W,b),S===null)throw it(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let J,Z,lt,q,F,x,v,R,N,H,G,gt,ht,dt,Pt,st,pt,bt,kt,Mt,Bt,Vt,Qt,z;function Tt(){J=new sS(S),J.init(),Vt=new GE(S,J),Z=new Jy(S,J,t,Vt),lt=new HE(S,J),Z.reverseDepthBuffer&&f&&lt.buffers.depth.setReversed(!0),q=new aS(S),F=new TE,x=new VE(S,J,lt,F,Z,Vt,q),v=new tS(M),R=new iS(M),N=new px(S),Qt=new Ky(S,N),H=new rS(S,N,q,Qt),G=new cS(S,H,N,q),kt=new lS(S,Z,x),st=new Qy(F),gt=new bE(M,v,R,J,Z,Qt,st),ht=new ZE(M,F),dt=new wE,Pt=new IE(J),bt=new $y(M,v,R,lt,G,p,l),pt=new BE(M,G,Z),z=new JE(S,q,Z,lt),Mt=new Zy(S,J,q),Bt=new oS(S,J,q),q.programs=gt.programs,M.capabilities=Z,M.extensions=J,M.properties=F,M.renderLists=dt,M.shadowMap=pt,M.state=lt,M.info=q}Tt();const rt=new $E(M,S);this.xr=rt,this.getContext=function(){return S},this.getContextAttributes=function(){return S.getContextAttributes()},this.forceContextLoss=function(){const b=J.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=J.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(b){b!==void 0&&($=b,this.setSize(tt,Q,!1))},this.getSize=function(b){return b.set(tt,Q)},this.setSize=function(b,W,et=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}tt=b,Q=W,e.width=Math.floor(b*$),e.height=Math.floor(W*$),et===!0&&(e.style.width=b+"px",e.style.height=W+"px"),this.setViewport(0,0,b,W)},this.getDrawingBufferSize=function(b){return b.set(tt*$,Q*$).floor()},this.setDrawingBufferSize=function(b,W,et){tt=b,Q=W,$=et,e.width=Math.floor(b*et),e.height=Math.floor(W*et),this.setViewport(0,0,b,W)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(Ct)},this.setViewport=function(b,W,et,nt){b.isVector4?Ct.set(b.x,b.y,b.z,b.w):Ct.set(b,W,et,nt),lt.viewport(D.copy(Ct).multiplyScalar($).round())},this.getScissor=function(b){return b.copy(Ut)},this.setScissor=function(b,W,et,nt){b.isVector4?Ut.set(b.x,b.y,b.z,b.w):Ut.set(b,W,et,nt),lt.scissor(B.copy(Ut).multiplyScalar($).round())},this.getScissorTest=function(){return Zt},this.setScissorTest=function(b){lt.setScissorTest(Zt=b)},this.setOpaqueSort=function(b){_t=b},this.setTransparentSort=function(b){yt=b},this.getClearColor=function(b){return b.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor.apply(bt,arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha.apply(bt,arguments)},this.clear=function(b=!0,W=!0,et=!0){let nt=0;if(b){let j=!1;if(U!==null){const vt=U.texture.format;j=vt===su||vt===iu||vt===nu}if(j){const vt=U.texture.type,Rt=vt===Gn||vt===es||vt===kr||vt===Js||vt===tu||vt===eu,Dt=bt.getClearColor(),Lt=bt.getClearAlpha(),Xt=Dt.r,Yt=Dt.g,It=Dt.b;Rt?(g[0]=Xt,g[1]=Yt,g[2]=It,g[3]=Lt,S.clearBufferuiv(S.COLOR,0,g)):(_[0]=Xt,_[1]=Yt,_[2]=It,_[3]=Lt,S.clearBufferiv(S.COLOR,0,_))}else nt|=S.COLOR_BUFFER_BIT}W&&(nt|=S.DEPTH_BUFFER_BIT),et&&(nt|=S.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),S.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),dt.dispose(),Pt.dispose(),F.dispose(),v.dispose(),R.dispose(),G.dispose(),Qt.dispose(),z.dispose(),gt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Zr),rt.removeEventListener("sessionend",Jr),Xn.stop()};function ft(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const b=q.autoReset,W=pt.enabled,et=pt.autoUpdate,nt=pt.needsUpdate,j=pt.type;Tt(),q.autoReset=b,pt.enabled=W,pt.autoUpdate=et,pt.needsUpdate=nt,pt.type=j}function wt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Gt(b){const W=b.target;W.removeEventListener("dispose",Gt),ve(W)}function ve(b){Pe(b),F.remove(b)}function Pe(b){const W=F.get(b).programs;W!==void 0&&(W.forEach(function(et){gt.releaseProgram(et)}),b.isShaderMaterial&&gt.releaseShaderCache(b))}this.renderBufferDirect=function(b,W,et,nt,j,vt){W===null&&(W=xt);const Rt=j.isMesh&&j.matrixWorld.determinant()<0,Dt=Jp(b,W,et,nt,j);lt.setMaterial(nt,Rt);let Lt=et.index,Xt=1;if(nt.wireframe===!0){if(Lt=H.getWireframeAttribute(et),Lt===void 0)return;Xt=2}const Yt=et.drawRange,It=et.attributes.position;let ne=Yt.start*Xt,pe=(Yt.start+Yt.count)*Xt;vt!==null&&(ne=Math.max(ne,vt.start*Xt),pe=Math.min(pe,(vt.start+vt.count)*Xt)),Lt!==null?(ne=Math.max(ne,0),pe=Math.min(pe,Lt.count)):It!=null&&(ne=Math.max(ne,0),pe=Math.min(pe,It.count));const ge=pe-ne;if(ge<0||ge===1/0)return;Qt.setup(j,nt,Dt,et,Lt);let Qe,se=Mt;if(Lt!==null&&(Qe=N.get(Lt),se=Bt,se.setIndex(Qe)),j.isMesh)nt.wireframe===!0?(lt.setLineWidth(nt.wireframeLinewidth*P()),se.setMode(S.LINES)):se.setMode(S.TRIANGLES);else if(j.isLine){let Nt=nt.linewidth;Nt===void 0&&(Nt=1),lt.setLineWidth(Nt*P()),j.isLineSegments?se.setMode(S.LINES):j.isLineLoop?se.setMode(S.LINE_LOOP):se.setMode(S.LINE_STRIP)}else j.isPoints?se.setMode(S.POINTS):j.isSprite&&se.setMode(S.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)se.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))se.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Nt=j._multiDrawStarts,qn=j._multiDrawCounts,re=j._multiDrawCount,Sn=Lt?N.get(Lt).bytesPerElement:1,cs=F.get(nt).currentProgram.getUniforms();for(let an=0;an<re;an++)cs.setValue(S,"_gl_DrawID",an),se.render(Nt[an]/Sn,qn[an])}else if(j.isInstancedMesh)se.renderInstances(ne,ge,j.count);else if(et.isInstancedBufferGeometry){const Nt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,qn=Math.min(et.instanceCount,Nt);se.renderInstances(ne,ge,qn)}else se.render(ne,ge)};function ie(b,W,et){b.transparent===!0&&b.side===An&&b.forceSinglePass===!1?(b.side=on,b.needsUpdate=!0,eo(b,W,et),b.side=Li,b.needsUpdate=!0,eo(b,W,et),b.side=An):eo(b,W,et)}this.compile=function(b,W,et=null){et===null&&(et=b),d=Pt.get(et),d.init(W),T.push(d),et.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),b!==et&&b.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(d.pushLight(j),j.castShadow&&d.pushShadow(j))}),d.setupLights();const nt=new Set;return b.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const vt=j.material;if(vt)if(Array.isArray(vt))for(let Rt=0;Rt<vt.length;Rt++){const Dt=vt[Rt];ie(Dt,et,j),nt.add(Dt)}else ie(vt,et,j),nt.add(vt)}),T.pop(),d=null,nt},this.compileAsync=function(b,W,et=null){const nt=this.compile(b,W,et);return new Promise(j=>{function vt(){if(nt.forEach(function(Rt){F.get(Rt).currentProgram.isReady()&&nt.delete(Rt)}),nt.size===0){j(b);return}setTimeout(vt,10)}J.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Ve=null;function Je(b){Ve&&Ve(b)}function Zr(){Xn.stop()}function Jr(){Xn.start()}const Xn=new zp;Xn.setAnimationLoop(Je),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(b){Ve=b,rt.setAnimationLoop(b),b===null?Xn.stop():Xn.start()},rt.addEventListener("sessionstart",Zr),rt.addEventListener("sessionend",Jr),this.render=function(b,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(W),W=rt.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,W,U),d=Pt.get(b,T.length),d.init(W),T.push(d),Y.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ct.setFromProjectionMatrix(Y),Et=this.localClippingEnabled,mt=st.init(this.clippingPlanes,Et),m=dt.get(b,y.length),m.init(),y.push(m),rt.enabled===!0&&rt.isPresenting===!0){const vt=M.xr.getDepthSensingMesh();vt!==null&&jn(vt,W,-1/0,M.sortObjects)}jn(b,W,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(_t,yt),A=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,A&&bt.addToRenderList(m,b),this.info.render.frame++,mt===!0&&st.beginShadows();const et=d.state.shadowsArray;pt.render(et,b,W),mt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=m.opaque,j=m.transmissive;if(d.setupLights(),W.isArrayCamera){const vt=W.cameras;if(j.length>0)for(let Rt=0,Dt=vt.length;Rt<Dt;Rt++){const Lt=vt[Rt];to(nt,j,b,Lt)}A&&bt.render(b);for(let Rt=0,Dt=vt.length;Rt<Dt;Rt++){const Lt=vt[Rt];Qr(m,b,Lt,Lt.viewport)}}else j.length>0&&to(nt,j,b,W),A&&bt.render(b),Qr(m,b,W);U!==null&&(x.updateMultisampleRenderTarget(U),x.updateRenderTargetMipmap(U)),b.isScene===!0&&b.onAfterRender(M,b,W),Qt.resetDefaultState(),w=-1,E=null,T.pop(),T.length>0?(d=T[T.length-1],mt===!0&&st.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function jn(b,W,et,nt){if(b.visible===!1)return;if(b.layers.test(W.layers)){if(b.isGroup)et=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(W);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||ct.intersectsSprite(b)){nt&&ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Y);const Rt=G.update(b),Dt=b.material;Dt.visible&&m.push(b,Rt,Dt,et,ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||ct.intersectsObject(b))){const Rt=G.update(b),Dt=b.material;if(nt&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),ut.copy(b.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),ut.copy(Rt.boundingSphere.center)),ut.applyMatrix4(b.matrixWorld).applyMatrix4(Y)),Array.isArray(Dt)){const Lt=Rt.groups;for(let Xt=0,Yt=Lt.length;Xt<Yt;Xt++){const It=Lt[Xt],ne=Dt[It.materialIndex];ne&&ne.visible&&m.push(b,Rt,ne,et,ut.z,It)}}else Dt.visible&&m.push(b,Rt,Dt,et,ut.z,null)}}const vt=b.children;for(let Rt=0,Dt=vt.length;Rt<Dt;Rt++)jn(vt[Rt],W,et,nt)}function Qr(b,W,et,nt){const j=b.opaque,vt=b.transmissive,Rt=b.transparent;d.setupLightsView(et),mt===!0&&st.setGlobalState(M.clippingPlanes,et),nt&&lt.viewport(D.copy(nt)),j.length>0&&ls(j,W,et),vt.length>0&&ls(vt,W,et),Rt.length>0&&ls(Rt,W,et),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function to(b,W,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[nt.id]===void 0&&(d.state.transmissionRenderTarget[nt.id]=new Pn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?ci:Gn,minFilter:Ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const vt=d.state.transmissionRenderTarget[nt.id],Rt=nt.viewport||D;vt.setSize(Rt.z,Rt.w);const Dt=M.getRenderTarget();M.setRenderTarget(vt),M.getClearColor(ot),at=M.getClearAlpha(),at<1&&M.setClearColor(16777215,.5),M.clear(),A&&bt.render(et);const Lt=M.toneMapping;M.toneMapping=Pi;const Xt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),d.setupLightsView(nt),mt===!0&&st.setGlobalState(M.clippingPlanes,nt),ls(b,et,nt),x.updateMultisampleRenderTarget(vt),x.updateRenderTargetMipmap(vt),J.has("WEBGL_multisampled_render_to_texture")===!1){let Yt=!1;for(let It=0,ne=W.length;It<ne;It++){const pe=W[It],ge=pe.object,Qe=pe.geometry,se=pe.material,Nt=pe.group;if(se.side===An&&ge.layers.test(nt.layers)){const qn=se.side;se.side=on,se.needsUpdate=!0,gu(ge,et,nt,Qe,se,Nt),se.side=qn,se.needsUpdate=!0,Yt=!0}}Yt===!0&&(x.updateMultisampleRenderTarget(vt),x.updateRenderTargetMipmap(vt))}M.setRenderTarget(Dt),M.setClearColor(ot,at),Xt!==void 0&&(nt.viewport=Xt),M.toneMapping=Lt}function ls(b,W,et){const nt=W.isScene===!0?W.overrideMaterial:null;for(let j=0,vt=b.length;j<vt;j++){const Rt=b[j],Dt=Rt.object,Lt=Rt.geometry,Xt=nt===null?Rt.material:nt,Yt=Rt.group;Dt.layers.test(et.layers)&&gu(Dt,W,et,Lt,Xt,Yt)}}function gu(b,W,et,nt,j,vt){b.onBeforeRender(M,W,et,nt,j,vt),b.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),j.onBeforeRender(M,W,et,nt,b,vt),j.transparent===!0&&j.side===An&&j.forceSinglePass===!1?(j.side=on,j.needsUpdate=!0,M.renderBufferDirect(et,W,nt,j,b,vt),j.side=Li,j.needsUpdate=!0,M.renderBufferDirect(et,W,nt,j,b,vt),j.side=An):M.renderBufferDirect(et,W,nt,j,b,vt),b.onAfterRender(M,W,et,nt,j,vt)}function eo(b,W,et){W.isScene!==!0&&(W=xt);const nt=F.get(b),j=d.state.lights,vt=d.state.shadowsArray,Rt=j.state.version,Dt=gt.getParameters(b,j.state,vt,W,et),Lt=gt.getProgramCacheKey(Dt);let Xt=nt.programs;nt.environment=b.isMeshStandardMaterial?W.environment:null,nt.fog=W.fog,nt.envMap=(b.isMeshStandardMaterial?R:v).get(b.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&b.envMap===null?W.environmentRotation:b.envMapRotation,Xt===void 0&&(b.addEventListener("dispose",Gt),Xt=new Map,nt.programs=Xt);let Yt=Xt.get(Lt);if(Yt!==void 0){if(nt.currentProgram===Yt&&nt.lightsStateVersion===Rt)return vu(b,Dt),Yt}else Dt.uniforms=gt.getUniforms(b),b.onBeforeCompile(Dt,M),Yt=gt.acquireProgram(Dt,Lt),Xt.set(Lt,Yt),nt.uniforms=Dt.uniforms;const It=nt.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=st.uniform),vu(b,Dt),nt.needsLights=tm(b),nt.lightsStateVersion=Rt,nt.needsLights&&(It.ambientLightColor.value=j.state.ambient,It.lightProbe.value=j.state.probe,It.directionalLights.value=j.state.directional,It.directionalLightShadows.value=j.state.directionalShadow,It.spotLights.value=j.state.spot,It.spotLightShadows.value=j.state.spotShadow,It.rectAreaLights.value=j.state.rectArea,It.ltc_1.value=j.state.rectAreaLTC1,It.ltc_2.value=j.state.rectAreaLTC2,It.pointLights.value=j.state.point,It.pointLightShadows.value=j.state.pointShadow,It.hemisphereLights.value=j.state.hemi,It.directionalShadowMap.value=j.state.directionalShadowMap,It.directionalShadowMatrix.value=j.state.directionalShadowMatrix,It.spotShadowMap.value=j.state.spotShadowMap,It.spotLightMatrix.value=j.state.spotLightMatrix,It.spotLightMap.value=j.state.spotLightMap,It.pointShadowMap.value=j.state.pointShadowMap,It.pointShadowMatrix.value=j.state.pointShadowMatrix),nt.currentProgram=Yt,nt.uniformsList=null,Yt}function _u(b){if(b.uniformsList===null){const W=b.currentProgram.getUniforms();b.uniformsList=Xo.seqWithValue(W.seq,b.uniforms)}return b.uniformsList}function vu(b,W){const et=F.get(b);et.outputColorSpace=W.outputColorSpace,et.batching=W.batching,et.batchingColor=W.batchingColor,et.instancing=W.instancing,et.instancingColor=W.instancingColor,et.instancingMorph=W.instancingMorph,et.skinning=W.skinning,et.morphTargets=W.morphTargets,et.morphNormals=W.morphNormals,et.morphColors=W.morphColors,et.morphTargetsCount=W.morphTargetsCount,et.numClippingPlanes=W.numClippingPlanes,et.numIntersection=W.numClipIntersection,et.vertexAlphas=W.vertexAlphas,et.vertexTangents=W.vertexTangents,et.toneMapping=W.toneMapping}function Jp(b,W,et,nt,j){W.isScene!==!0&&(W=xt),x.resetTextureUnits();const vt=W.fog,Rt=nt.isMeshStandardMaterial?W.environment:null,Dt=U===null?M.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:nr,Lt=(nt.isMeshStandardMaterial?R:v).get(nt.envMap||Rt),Xt=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,Yt=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),It=!!et.morphAttributes.position,ne=!!et.morphAttributes.normal,pe=!!et.morphAttributes.color;let ge=Pi;nt.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(ge=M.toneMapping);const Qe=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,se=Qe!==void 0?Qe.length:0,Nt=F.get(nt),qn=d.state.lights;if(mt===!0&&(Et===!0||b!==E)){const dn=b===E&&nt.id===w;st.setState(nt,b,dn)}let re=!1;nt.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==qn.state.version||Nt.outputColorSpace!==Dt||j.isBatchedMesh&&Nt.batching===!1||!j.isBatchedMesh&&Nt.batching===!0||j.isBatchedMesh&&Nt.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Nt.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Nt.instancing===!1||!j.isInstancedMesh&&Nt.instancing===!0||j.isSkinnedMesh&&Nt.skinning===!1||!j.isSkinnedMesh&&Nt.skinning===!0||j.isInstancedMesh&&Nt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Nt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Nt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Nt.instancingMorph===!1&&j.morphTexture!==null||Nt.envMap!==Lt||nt.fog===!0&&Nt.fog!==vt||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==st.numPlanes||Nt.numIntersection!==st.numIntersection)||Nt.vertexAlphas!==Xt||Nt.vertexTangents!==Yt||Nt.morphTargets!==It||Nt.morphNormals!==ne||Nt.morphColors!==pe||Nt.toneMapping!==ge||Nt.morphTargetsCount!==se)&&(re=!0):(re=!0,Nt.__version=nt.version);let Sn=Nt.currentProgram;re===!0&&(Sn=eo(nt,W,j));let cs=!1,an=!1,or=!1;const _e=Sn.getUniforms(),In=Nt.uniforms;if(lt.useProgram(Sn.program)&&(cs=!0,an=!0,or=!0),nt.id!==w&&(w=nt.id,an=!0),cs||E!==b){lt.buffers.depth.getReversed()?(O.copy(b.projectionMatrix),W0(O),X0(O),_e.setValue(S,"projectionMatrix",O)):_e.setValue(S,"projectionMatrix",b.projectionMatrix),_e.setValue(S,"viewMatrix",b.matrixWorldInverse);const mi=_e.map.cameraPosition;mi!==void 0&&mi.setValue(S,k.setFromMatrixPosition(b.matrixWorld)),Z.logarithmicDepthBuffer&&_e.setValue(S,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&_e.setValue(S,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,an=!0,or=!0)}if(j.isSkinnedMesh){_e.setOptional(S,j,"bindMatrix"),_e.setOptional(S,j,"bindMatrixInverse");const dn=j.skeleton;dn&&(dn.boneTexture===null&&dn.computeBoneTexture(),_e.setValue(S,"boneTexture",dn.boneTexture,x))}j.isBatchedMesh&&(_e.setOptional(S,j,"batchingTexture"),_e.setValue(S,"batchingTexture",j._matricesTexture,x),_e.setOptional(S,j,"batchingIdTexture"),_e.setValue(S,"batchingIdTexture",j._indirectTexture,x),_e.setOptional(S,j,"batchingColorTexture"),j._colorsTexture!==null&&_e.setValue(S,"batchingColorTexture",j._colorsTexture,x));const ar=et.morphAttributes;if((ar.position!==void 0||ar.normal!==void 0||ar.color!==void 0)&&kt.update(j,et,Sn),(an||Nt.receiveShadow!==j.receiveShadow)&&(Nt.receiveShadow=j.receiveShadow,_e.setValue(S,"receiveShadow",j.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(In.envMap.value=Lt,In.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&W.environment!==null&&(In.envMapIntensity.value=W.environmentIntensity),an&&(_e.setValue(S,"toneMappingExposure",M.toneMappingExposure),Nt.needsLights&&Qp(In,or),vt&&nt.fog===!0&&ht.refreshFogUniforms(In,vt),ht.refreshMaterialUniforms(In,nt,$,Q,d.state.transmissionRenderTarget[b.id]),Xo.upload(S,_u(Nt),In,x)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Xo.upload(S,_u(Nt),In,x),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&_e.setValue(S,"center",j.center),_e.setValue(S,"modelViewMatrix",j.modelViewMatrix),_e.setValue(S,"normalMatrix",j.normalMatrix),_e.setValue(S,"modelMatrix",j.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const dn=nt.uniformsGroups;for(let mi=0,gi=dn.length;mi<gi;mi++){const xu=dn[mi];z.update(xu,Sn),z.bind(xu,Sn)}}return Sn}function Qp(b,W){b.ambientLightColor.needsUpdate=W,b.lightProbe.needsUpdate=W,b.directionalLights.needsUpdate=W,b.directionalLightShadows.needsUpdate=W,b.pointLights.needsUpdate=W,b.pointLightShadows.needsUpdate=W,b.spotLights.needsUpdate=W,b.spotLightShadows.needsUpdate=W,b.rectAreaLights.needsUpdate=W,b.hemisphereLights.needsUpdate=W}function tm(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(b,W,et){F.get(b.texture).__webglTexture=W,F.get(b.depthTexture).__webglTexture=et;const nt=F.get(b);nt.__hasExternalTextures=!0,nt.__autoAllocateDepthBuffer=et===void 0,nt.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),nt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,W){const et=F.get(b);et.__webglFramebuffer=W,et.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(b,W=0,et=0){U=b,I=W,C=et;let nt=!0,j=null,vt=!1,Rt=!1;if(b){const Lt=F.get(b);if(Lt.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(S.FRAMEBUFFER,null),nt=!1;else if(Lt.__webglFramebuffer===void 0)x.setupRenderTarget(b);else if(Lt.__hasExternalTextures)x.rebindTextures(b,F.get(b.texture).__webglTexture,F.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const It=b.depthTexture;if(Lt.__boundDepthTexture!==It){if(It!==null&&F.has(It)&&(b.width!==It.image.width||b.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(b)}}const Xt=b.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(Rt=!0);const Yt=F.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Yt[W])?j=Yt[W][et]:j=Yt[W],vt=!0):b.samples>0&&x.useMultisampledRTT(b)===!1?j=F.get(b).__webglMultisampledFramebuffer:Array.isArray(Yt)?j=Yt[et]:j=Yt,D.copy(b.viewport),B.copy(b.scissor),V=b.scissorTest}else D.copy(Ct).multiplyScalar($).floor(),B.copy(Ut).multiplyScalar($).floor(),V=Zt;if(lt.bindFramebuffer(S.FRAMEBUFFER,j)&&nt&&lt.drawBuffers(b,j),lt.viewport(D),lt.scissor(B),lt.setScissorTest(V),vt){const Lt=F.get(b.texture);S.framebufferTexture2D(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,S.TEXTURE_CUBE_MAP_POSITIVE_X+W,Lt.__webglTexture,et)}else if(Rt){const Lt=F.get(b.texture),Xt=W||0;S.framebufferTextureLayer(S.FRAMEBUFFER,S.COLOR_ATTACHMENT0,Lt.__webglTexture,et||0,Xt)}w=-1},this.readRenderTargetPixels=function(b,W,et,nt,j,vt,Rt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=F.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Dt=Dt[Rt]),Dt){lt.bindFramebuffer(S.FRAMEBUFFER,Dt);try{const Lt=b.texture,Xt=Lt.format,Yt=Lt.type;if(!Z.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Z.textureTypeReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=b.width-nt&&et>=0&&et<=b.height-j&&S.readPixels(W,et,nt,j,Vt.convert(Xt),Vt.convert(Yt),vt)}finally{const Lt=U!==null?F.get(U).__webglFramebuffer:null;lt.bindFramebuffer(S.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(b,W,et,nt,j,vt,Rt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=F.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Dt=Dt[Rt]),Dt){const Lt=b.texture,Xt=Lt.format,Yt=Lt.type;if(!Z.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Z.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=b.width-nt&&et>=0&&et<=b.height-j){lt.bindFramebuffer(S.FRAMEBUFFER,Dt);const It=S.createBuffer();S.bindBuffer(S.PIXEL_PACK_BUFFER,It),S.bufferData(S.PIXEL_PACK_BUFFER,vt.byteLength,S.STREAM_READ),S.readPixels(W,et,nt,j,Vt.convert(Xt),Vt.convert(Yt),0);const ne=U!==null?F.get(U).__webglFramebuffer:null;lt.bindFramebuffer(S.FRAMEBUFFER,ne);const pe=S.fenceSync(S.SYNC_GPU_COMMANDS_COMPLETE,0);return S.flush(),await G0(S,pe,4),S.bindBuffer(S.PIXEL_PACK_BUFFER,It),S.getBufferSubData(S.PIXEL_PACK_BUFFER,0,vt),S.deleteBuffer(It),S.deleteSync(pe),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,W=null,et=0){b.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,b=arguments[1]);const nt=Math.pow(2,-et),j=Math.floor(b.image.width*nt),vt=Math.floor(b.image.height*nt),Rt=W!==null?W.x:0,Dt=W!==null?W.y:0;x.setTexture2D(b,0),S.copyTexSubImage2D(S.TEXTURE_2D,et,0,0,Rt,Dt,j,vt),lt.unbindTexture()},this.copyTextureToTexture=function(b,W,et=null,nt=null,j=0){b.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),nt=arguments[0]||null,b=arguments[1],W=arguments[2],j=arguments[3]||0,et=null);let vt,Rt,Dt,Lt,Xt,Yt,It,ne,pe;const ge=b.isCompressedTexture?b.mipmaps[j]:b.image;et!==null?(vt=et.max.x-et.min.x,Rt=et.max.y-et.min.y,Dt=et.isBox3?et.max.z-et.min.z:1,Lt=et.min.x,Xt=et.min.y,Yt=et.isBox3?et.min.z:0):(vt=ge.width,Rt=ge.height,Dt=ge.depth||1,Lt=0,Xt=0,Yt=0),nt!==null?(It=nt.x,ne=nt.y,pe=nt.z):(It=0,ne=0,pe=0);const Qe=Vt.convert(W.format),se=Vt.convert(W.type);let Nt;W.isData3DTexture?(x.setTexture3D(W,0),Nt=S.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(x.setTexture2DArray(W,0),Nt=S.TEXTURE_2D_ARRAY):(x.setTexture2D(W,0),Nt=S.TEXTURE_2D),S.pixelStorei(S.UNPACK_FLIP_Y_WEBGL,W.flipY),S.pixelStorei(S.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),S.pixelStorei(S.UNPACK_ALIGNMENT,W.unpackAlignment);const qn=S.getParameter(S.UNPACK_ROW_LENGTH),re=S.getParameter(S.UNPACK_IMAGE_HEIGHT),Sn=S.getParameter(S.UNPACK_SKIP_PIXELS),cs=S.getParameter(S.UNPACK_SKIP_ROWS),an=S.getParameter(S.UNPACK_SKIP_IMAGES);S.pixelStorei(S.UNPACK_ROW_LENGTH,ge.width),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,ge.height),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Lt),S.pixelStorei(S.UNPACK_SKIP_ROWS,Xt),S.pixelStorei(S.UNPACK_SKIP_IMAGES,Yt);const or=b.isDataArrayTexture||b.isData3DTexture,_e=W.isDataArrayTexture||W.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const In=F.get(b),ar=F.get(W),dn=F.get(In.__renderTarget),mi=F.get(ar.__renderTarget);lt.bindFramebuffer(S.READ_FRAMEBUFFER,dn.__webglFramebuffer),lt.bindFramebuffer(S.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let gi=0;gi<Dt;gi++)or&&S.framebufferTextureLayer(S.READ_FRAMEBUFFER,S.COLOR_ATTACHMENT0,F.get(b).__webglTexture,j,Yt+gi),b.isDepthTexture?(_e&&S.framebufferTextureLayer(S.DRAW_FRAMEBUFFER,S.COLOR_ATTACHMENT0,F.get(W).__webglTexture,j,pe+gi),S.blitFramebuffer(Lt,Xt,vt,Rt,It,ne,vt,Rt,S.DEPTH_BUFFER_BIT,S.NEAREST)):_e?S.copyTexSubImage3D(Nt,j,It,ne,pe+gi,Lt,Xt,vt,Rt):S.copyTexSubImage2D(Nt,j,It,ne,pe+gi,Lt,Xt,vt,Rt);lt.bindFramebuffer(S.READ_FRAMEBUFFER,null),lt.bindFramebuffer(S.DRAW_FRAMEBUFFER,null)}else _e?b.isDataTexture||b.isData3DTexture?S.texSubImage3D(Nt,j,It,ne,pe,vt,Rt,Dt,Qe,se,ge.data):W.isCompressedArrayTexture?S.compressedTexSubImage3D(Nt,j,It,ne,pe,vt,Rt,Dt,Qe,ge.data):S.texSubImage3D(Nt,j,It,ne,pe,vt,Rt,Dt,Qe,se,ge):b.isDataTexture?S.texSubImage2D(S.TEXTURE_2D,j,It,ne,vt,Rt,Qe,se,ge.data):b.isCompressedTexture?S.compressedTexSubImage2D(S.TEXTURE_2D,j,It,ne,ge.width,ge.height,Qe,ge.data):S.texSubImage2D(S.TEXTURE_2D,j,It,ne,vt,Rt,Qe,se,ge);S.pixelStorei(S.UNPACK_ROW_LENGTH,qn),S.pixelStorei(S.UNPACK_IMAGE_HEIGHT,re),S.pixelStorei(S.UNPACK_SKIP_PIXELS,Sn),S.pixelStorei(S.UNPACK_SKIP_ROWS,cs),S.pixelStorei(S.UNPACK_SKIP_IMAGES,an),j===0&&W.generateMipmaps&&S.generateMipmap(Nt),lt.unbindTexture()},this.copyTextureToTexture3D=function(b,W,et=null,nt=null,j=0){return b.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),et=arguments[0]||null,nt=arguments[1]||null,b=arguments[2],W=arguments[3],j=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,W,et,nt,j)},this.initRenderTarget=function(b){F.get(b).__webglFramebuffer===void 0&&x.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?x.setTextureCube(b,0):b.isData3DTexture?x.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?x.setTexture2DArray(b,0):x.setTexture2D(b,0),lt.unbindTexture()},this.resetState=function(){I=0,C=0,U=null,lt.reset(),Qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class cu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new jt(t),this.density=e}clone(){return new cu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tb extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class eb extends Ze{constructor(t=null,e=1,i=1,s,r,o,a,l,c=fn,u=fn,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ac extends as{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const sa=new X,ra=new X,df=new de,_r=new $r,Co=new ir,vl=new X,pf=new X;class nb extends be{constructor(t=new ke,e=new Ac){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)sa.fromBufferAttribute(e,s-1),ra.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=sa.distanceTo(ra);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Co.copy(i.boundingSphere),Co.applyMatrix4(s),Co.radius+=r,t.ray.intersectsSphere(Co)===!1)return;df.copy(s).invert(),_r.copy(t.ray).applyMatrix4(df);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=u.getX(_),y=u.getX(_+1),T=Po(this,t,_r,l,d,y);T&&e.push(T)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),d=Po(this,t,_r,l,_,m);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=Po(this,t,_r,l,_,_+1);d&&e.push(d)}if(this.isLineLoop){const _=Po(this,t,_r,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Po(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(sa.fromBufferAttribute(o,s),ra.fromBufferAttribute(o,r),e.distanceSqToSegment(sa,ra,vl,pf)>i)return;vl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(vl);if(!(l<t.near||l>t.far))return{distance:l,point:pf.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const mf=new X,gf=new X;class _f extends nb{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)mf.fromBufferAttribute(e,s),gf.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+mf.distanceTo(gf);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ib extends as{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const vf=new de,wc=new $r,Do=new ir,Lo=new X;class sb extends be{constructor(t=new ke,e=new ib){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Do.copy(i.boundingSphere),Do.applyMatrix4(s),Do.radius+=r,t.ray.intersectsSphere(Do)===!1)return;vf.copy(s).invert(),wc.copy(t.ray).applyMatrix4(vf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);Lo.fromBufferAttribute(h,m),xf(Lo,m,l,s,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,_=p;g<_;g++)Lo.fromBufferAttribute(h,g),xf(Lo,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function xf(n,t,e,i,s,r,o){const a=wc.distanceSqToPoint(n);if(a<e){const l=new X;wc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class uu extends ke{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let h=t;const f=(e-t)/s,p=new X,g=new Ft;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const d=r+m/i*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,u.push(g.x,g.y)}h+=f}for(let _=0;_<s;_++){const m=_*(i+1);for(let d=0;d<i;d++){const y=d+m,T=y,M=y+i+1,L=y+i+2,I=y+1;a.push(T,M,I),a.push(M,L,I)}}this.setIndex(a),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ls extends ke{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new X,f=new X,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const y=[],T=d/i;let M=0;d===0&&o===0?M=.5/e:d===i&&l===Math.PI&&(M=-.5/e);for(let L=0;L<=e;L++){const I=L/e;h.x=-t*Math.cos(s+I*r)*Math.sin(o+T*a),h.y=t*Math.cos(o+T*a),h.z=t*Math.sin(s+I*r)*Math.sin(o+T*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(I+M,1-T),y.push(c++)}u.push(y)}for(let d=0;d<i;d++)for(let y=0;y<e;y++){const T=u[d][y+1],M=u[d][y],L=u[d+1][y],I=u[d+1][y+1];(d!==0||o>0)&&p.push(T,M,I),(d!==i-1||l<Math.PI)&&p.push(M,L,I)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hu extends ke{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new X,h=new X,f=new X;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/i*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(_),h.y=(t+e*Math.cos(m))*Math.sin(_),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,y=(s+1)*p+g;o.push(_,m,y),o.push(m,d,y)}this.setIndex(o),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class rb extends ze{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Mf extends as{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rp,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xp extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ob extends Xp{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const xl=new de,yf=new X,Sf=new X;class ab{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ou,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;yf.setFromMatrixPosition(t.matrixWorld),e.position.copy(yf),Sf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Sf),e.updateMatrixWorld(),xl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class lb extends ab{constructor(){super(new au(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ef extends Xp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new lb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class jp{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=bf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function bf(){return performance.now()}const Tf=new de;class cb{constructor(t,e,i=0,s=1/0){this.ray=new $r(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new ru,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Tf.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tf),this}intersectObject(t,e=!0,i=[]){return Rc(t,this,i,e),i.sort(Af),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Rc(t[s],this,i,e);return i.sort(Af),i}}function Af(n,t){return n.distance-t.distance}function Rc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Rc(r[o],t,e,!0)}}class wf{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos($e(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ub extends os{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zc);const Rf={type:"change"},fu={type:"start"},qp={type:"end"},Io=new $r,Cf=new wi,hb=Math.cos(70*k0.DEG2RAD),Te=new X,en=2*Math.PI,he={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ml=1e-6;class fb extends ub{constructor(t,e=null){super(t,e),this.state=he.NONE,this.enabled=!0,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zs.ROTATE,MIDDLE:zs.DOLLY,RIGHT:zs.PAN},this.touches={ONE:Cs.ROTATE,TWO:Cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new X,this._lastQuaternion=new ns,this._lastTargetPosition=new X,this._quat=new ns().setFromUnitVectors(t.up,new X(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wf,this._sphericalDelta=new wf,this._scale=1,this._panOffset=new X,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new X,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pb.bind(this),this._onPointerDown=db.bind(this),this._onPointerUp=mb.bind(this),this._onContextMenu=Sb.bind(this),this._onMouseWheel=vb.bind(this),this._onKeyDown=xb.bind(this),this._onTouchStart=Mb.bind(this),this._onTouchMove=yb.bind(this),this._onMouseDown=gb.bind(this),this._onMouseMove=_b.bind(this),this._interceptControlDown=Eb.bind(this),this._interceptControlUp=bb.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rf),this.update(),this.state=he.NONE}update(t=null){const e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===he.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=en:i>Math.PI&&(i-=en),s<-Math.PI?s+=en:s>Math.PI&&(s-=en),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Te.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new X(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new X(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Io.origin.copy(this.object.position),Io.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Io.direction))<hb?this.object.lookAt(this.target):(Cf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Io.intersectPlane(Cf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ml||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ml||this._lastTargetPosition.distanceToSquared(this.target)>Ml?(this.dispatchEvent(Rf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?en/60*this.autoRotateSpeed*t:en/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(en*this._rotateDelta.x/e.clientHeight),this._rotateUp(en*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(en*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-en*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(en*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-en*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(en*this._rotateDelta.x/e.clientHeight),this._rotateUp(en*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function db(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function pb(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function mb(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qp),this.state=he.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function gb(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case zs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=he.DOLLY;break;case zs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}break;case zs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(fu)}function _b(n){switch(this.state){case he.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case he.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case he.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function vb(n){this.enabled===!1||this.enableZoom===!1||this.state!==he.NONE||(n.preventDefault(),this.dispatchEvent(fu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(qp))}function xb(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function Mb(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Cs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=he.TOUCH_ROTATE;break;case Cs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=he.TOUCH_PAN;break;default:this.state=he.NONE}break;case 2:switch(this.touches.TWO){case Cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=he.TOUCH_DOLLY_PAN;break;case Cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=he.TOUCH_DOLLY_ROTATE;break;default:this.state=he.NONE}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(fu)}function yb(n){switch(this._trackPointer(n),this.state){case he.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case he.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case he.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case he.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=he.NONE}}function Sb(n){this.enabled!==!1&&n.preventDefault()}function Eb(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bb(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Yp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class rr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Tb=new au(-1,1,1,-1,0,1);class Ab extends ke{constructor(){super(),this.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Se([0,2,0,0,2,0],2))}}const wb=new Ab;class du{constructor(t){this._mesh=new we(wb,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Tb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Rb extends rr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ze?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Vr.clone(t.uniforms),this.material=new ze({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new du(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Pf extends rr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Cb extends rr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Pb{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Ft);this._width=i.width,this._height=i.height,e=new Pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ci}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Rb(Yp),this.copyPass.material.blending=li,this.clock=new jp}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Pf!==void 0&&(o instanceof Pf?i=!0:o instanceof Cb&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Ft);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Db={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Lb extends rr{constructor(){super();const t=Db;this.uniforms=Vr.clone(t.uniforms),this.material=new rb({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new du(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},te.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===fp?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===dp?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===pp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Jc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===mp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===gp&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ib extends rr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new jt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const Ub={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new jt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class er extends rr{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Ft(t.x,t.y):new Ft(256,256),this.clearColor=new jt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Pn(r,o,{type:ci}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new Pn(r,o,{type:ci});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new Pn(r,o,{type:ci});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=Ub;this.highPassUniforms=Vr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ze({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ft(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new X(1,1,1),new X(1,1,1),new X(1,1,1),new X(1,1,1),new X(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Yp;this.copyUniforms=Vr.clone(u.uniforms),this.blendMaterial=new ze({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ks,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new jt,this.oldClearAlpha=1,this.basic=new mn,this.fsQuad=new du(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ft(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=er.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=er.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new ze({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Ft(.5,.5)},direction:{value:new Ft(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new ze({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}er.BlurDirectionX=new Ft(1,0);er.BlurDirectionY=new Ft(0,1);class vr extends be{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ft(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Ts=new X,Df=new de,Lf=new de,If=new X,Uf=new X;class Nb{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Df.copy(_.matrixWorldInverse),Lf.multiplyMatrices(_.projectionMatrix,Df),u(g,g,_),p(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Ts.setFromMatrixPosition(g.matrixWorld),Ts.applyMatrix4(Lf);const d=Ts.z>=-1&&Ts.z<=1&&g.layers.test(m.layers)===!0,y=g.element;y.style.display=d===!0?"":"none",d===!0&&(g.onBeforeRender(e,_,m),y.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Ts.x*r+r)+"px,"+(-Ts.y*o+o)+"px)",y.parentNode!==l&&l.appendChild(y),g.onAfterRender(e,_,m));const T={distanceToCameraSquared:h(m,g)};a.objects.set(g,T)}for(let d=0,y=g.children.length;d<y;d++)u(g.children[d],_,m)}function h(g,_){return If.setFromMatrixPosition(g.matrixWorld),Uf.setFromMatrixPosition(_.matrixWorld),If.distanceToSquared(Uf)}function f(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function p(g){const _=f(g).sort(function(d,y){if(d.renderOrder!==y.renderOrder)return y.renderOrder-d.renderOrder;const T=a.objects.get(d).distanceToCameraSquared,M=a.objects.get(y).distanceToCameraSquared;return T-M}),m=_.length;for(let d=0,y=_.length;d<y;d++)_[d].element.style.zIndex=m-d}}}const Ob="v5";function Fb(n,t){return`${Ob}-${n}-${t}`}const oa=new Map;function Nf(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function Bb(n){return n-Math.floor(n)}function Uo(n,t,e){return Bb(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function Cc(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=Uo(i,s,e),u=Uo(i+1,s,e),h=Uo(i,s+1,e),f=Uo(i+1,s+1,e);return c+(u-c)*a+(h-c)*l+(f-h-(u-c))*a*l}function zb(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*Cc(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function Hb(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function kb(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,h=zb(c*4.2+t*.002,u*4.2-t*.001,t),p=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,Cc(c*14,u*14,t+11)-.38),1.4),_=Cc(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*h)*p*(1-g*.55)*_;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[d,y,T]=Hb(e,r,m),M=(a*n+l)*4;s[M]=d,s[M+1]=y,s[M+2]=T,s[M+3]=255}const o=new eb(s,n,n);return o.format=_n,o.type=Gn,o.colorSpace=nn,o.wrapS=Hr,o.wrapT=Hr,o.generateMipmaps=!0,o.minFilter=Ci,o.magFilter=Rn,o.flipY=!0,o.needsUpdate=!0,o}function Vb(n,t){const e=Nf(n)%14,i=Fb(t,e);let s=oa.get(i);if(!s){const r=Nf(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=kb(256,r,o,t),oa.set(i,s)}return{map:s}}function Gb(){for(const n of oa.values())n.dispose();oa.clear()}const Wb=461586,Xb=4874368,jb=9103615,Of=12101887,qb=4873336,Yb=6091007,Ff=13165823,$b=10205416,Kb=1.35,Zb=4e3,Jb=["热度/年薪","强度/竞争","学历门槛","学科技能"];function pu(n,t,e,i,s){const r=n.clientWidth||window.innerWidth,o=n.clientHeight||window.innerHeight,a=new tb;a.background=new jt(Wb),a.fog=new cu(Xb,.032);const l=new gn(55,r/o,.1,200);l.position.set(12,10,16);const c=new QE({antialias:!0,alpha:!1,powerPreference:"high-performance"});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(r,o),c.outputColorSpace=nn,c.toneMapping=Jc,c.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(c.domElement);const u=document.createElement("div");u.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(u);const h=new Nb({element:u});h.setSize(r,o);const f=Math.min(window.devicePixelRatio,2),p=new Pb(c);p.setPixelRatio(f);const g=new Ib(a,l),_=new Ft(Math.max(128,Math.floor(r*f/2)),Math.max(128,Math.floor(o*f/2))),m=new er(_,.34,.34,.88),d=new Lb;p.addPass(g),p.addPass(m),p.addPass(d);const y=new ob(9088744,1382432,.62);a.add(y);const T=new Ef(15791871,.55);T.position.set(8,14,10),a.add(T);const M=new Ef(6324424,.22);M.position.set(-12,-2,-8),a.add(M);const L=new fb(l,c.domElement);L.enableDamping=!0,L.dampingFactor=.06,L.minDistance=4,L.maxDistance=48,L.autoRotate=!0,L.autoRotateSpeed=Kb;let I=null,C=!1;const U=()=>{I!==null&&(window.clearTimeout(I),I=null)},w=()=>{U(),I=window.setTimeout(()=>{C||(L.autoRotate=!0)},Zb)},E=()=>{C=!0,L.autoRotate=!1,U()},D=()=>{C=!1,w()},B=()=>{L.autoRotate=!1,w()},V=Math.min(1,Math.max(0,(s==null?void 0:s.ambientStarBoost)??0)),ot=new Map,at=new Map;let tt=null,Q=null;const _t=(()=>{const q=Math.min(9200,Math.floor(1100+V*7200)),F=new Float32Array(q*3),x=new Float32Array(q);for(let G=0;G<q;G++){const gt=Math.random(),ht=Math.random(),dt=2*Math.PI*gt,Pt=Math.acos(2*ht-1),st=26+Math.random()*78,pt=Math.sin(Pt);F[G*3]=st*pt*Math.cos(dt),F[G*3+1]=st*pt*Math.sin(dt),F[G*3+2]=st*Math.cos(Pt);const bt=.04+Math.random()*.12+V*.06;x[G]=Math.min(.26,bt)}const v=new ke;v.setAttribute("position",new yn(F,3)),v.setAttribute("size",new yn(x,1));const R=.42+V*.58,N=new ze({uniforms:{uColor:{value:new jt($b)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uAlphaMul:{value:R}},vertexShader:`
        attribute float size;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vAlpha = 0.35 + 0.65 * (size - 0.04) / 0.18;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (220.0 * uPixelRatio) / (-mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        uniform vec3 uColor;
        uniform float uAlphaMul;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float soft = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, soft * vAlpha * uAlphaMul);
        }
      `,transparent:!0,depthWrite:!1,blending:ks}),H=new sb(v,N);return H.frustumCulled=!1,a.add(H),H})(),yt=(q,F,x)=>{q.traverse(v=>{v instanceof vr||(v.userData.nodeId=F,v.userData.nodeType=x)})},Ct=(q,F)=>{const x=document.createElement("div");x.textContent=q,x.setAttribute("role","presentation");const v=F==="fusion",R=v?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",N=v?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",H=v?"#f4ecff":"#eaf6ff";return x.style.cssText=[`max-width:${v?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${H}`,`background:${R}`,`border:${N}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),x},Ut=q=>{const F=document.createElement("div");return F.textContent=q,F.setAttribute("role","presentation"),F.style.cssText=["max-width: 52px","padding: 2px 5px","border-radius: 5px","font-size: 8px","font-weight: 650","line-height: 1.2","text-align: center","letter-spacing: 0.01em","color: #ede6ff","background: rgba(28, 20, 42, 0.82)","border: 1px solid rgba(200, 170, 255, 0.42)","box-shadow: 0 1px 5px rgba(0,0,0,0.35)","text-shadow: 0 1px 2px rgba(0,0,0,0.7)","display: -webkit-box","-webkit-box-orient: vertical","-webkit-line-clamp: 2","overflow: hidden","word-break: break-all","overflow-wrap: anywhere","opacity: 0","visibility: hidden","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),F},Zt=(q,F,x)=>{const v=q==="major",R=new Ds,N=v?"major":"fusion",{map:H}=Vb(F,N),G=v?.23:.15,gt=new Ls(G,v?48:36,v?32:26),ht=new mn({map:H,color:new jt(16777215),transparent:!0,opacity:1,fog:!1}),dt=new we(gt,ht);dt.userData.part="core",R.add(dt);const Pt=v?jb:Of,st=new Ls(G*1.52,18,14),pt=new mn({color:Pt,transparent:!0,opacity:v?.045:.032,depthWrite:!1,blending:ks,fog:!1}),bt=new we(st,pt);if(bt.renderOrder=-1,bt.userData.part="glow",R.add(bt),v){const Bt=new mn({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:An,fog:!1}),Vt=(z,Tt,rt)=>{const ft=new hu(z,Tt,10,80),St=new we(ft,Bt.clone());return St.rotation.x=Math.PI/2,St.rotation.z=rt,St.userData.part="ring",St};R.add(Vt(.46,.014,Math.random()*Math.PI));const Qt=Vt(.38,.01,Math.PI/2.8);Qt.rotation.y=Math.PI/3.2,R.add(Qt)}else{const Bt=Math.max(G*5.55,.78),Vt=Bt*1.2,Qt=Bt*.82,z=Bt*1.22,Tt=new uu(Qt,z,80),rt=new mn({color:Of,transparent:!0,opacity:.5,depthWrite:!1,side:An,fog:!1,blending:ks}),ft=new we(Tt,rt);ft.rotation.x=Math.PI/2,ft.renderOrder=0,ft.userData.part="ring",R.add(ft);const St=Math.max(G*.34,.052),wt=[.02,.14,.55,.42];for(let Gt=0;Gt<4;Gt++){const ve=new Ls(St,14,12),Pe=new jt().setHSL(wt[Gt],.55,.62),ie=new mn({color:Pe,transparent:!0,opacity:.94,fog:!1}),Ve=new we(ve,ie),Je=Gt/4*Math.PI*2-Math.PI/4,Zr=Math.cos(Je)*Bt,Jr=Math.sin(Je)*Bt;Ve.position.set(Zr,0,Jr),Ve.userData.part="satellite",R.add(Ve);const Xn=Ut(Jb[Gt]),jn=new vr(Xn),Qr=Math.cos(Je)*Vt,to=Math.sin(Je)*Vt,ls=St*.55+Gt%2*.018;jn.position.set(Qr,ls,to),jn.center.set(.5,1),jn.renderOrder=8,jn.userData.isFusionQuadrantLabel=!0,R.add(jn)}}const kt=Ct(x,q),Mt=new vr(kt);return Mt.position.set(0,G*1.38,0),Mt.center.set(.5,1),Mt.renderOrder=10,Mt.userData.isNodeLabel=!0,R.add(Mt),R.userData.nodeVisual={core:dt,glow:bt},R};for(const q of t.nodes){const F=t.layout[q.id];if(!F)continue;const x=Zt(q.type,q.id,q.label);x.position.set(F.x,F.y,F.z),x.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),x.userData.nodeId=q.id,x.userData.nodeType=q.type,yt(x,q.id,q.type),a.add(x),ot.set(q.id,x)}const ct=(q,F)=>q<F?`${q}|${F}`:`${F}|${q}`,mt=()=>{const q=[];for(const v of t.edges){const R=t.layout[v.u],N=t.layout[v.v];!R||!N||q.push(R.x,R.y,R.z,N.x,N.y,N.z)}const F=new ke;F.setAttribute("position",new Se(q,3));const x=new Ac({color:qb,transparent:!0,opacity:.32,depthWrite:!1});return new _f(F,x)},Et=q=>{const F=[...q],x=[],v=new Set(t.edges.map(H=>ct(H.u,H.v)));for(let H=0;H<F.length-1;H++){const G=F[H],gt=F[H+1];if(!v.has(ct(G,gt)))continue;const ht=t.layout[G],dt=t.layout[gt];!ht||!dt||x.push(ht.x,ht.y,ht.z,dt.x,dt.y,dt.z)}const R=new ke;R.setAttribute("position",new Se(x,3));const N=new Ac({color:Yb,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new _f(R,N)};tt=mt(),a.add(tt),Q=Et(e.pathIds),a.add(Q);const O=new Ds;a.add(O),(()=>{for(;O.children.length;)O.remove(O.children[0]);at.clear();const q=new Ls(1,20,20);for(const F of t.hyperedges){const x=[];for(const gt of F.member_node_ids){const ht=t.layout[gt];ht&&x.push(new X(ht.x,ht.y,ht.z))}if(!x.length)continue;const v=new is().setFromPoints(x),R=new ir;v.getBoundingSphere(R);const N=new mn({color:Ff,transparent:!0,opacity:.07,depthWrite:!1}),H=new we(q,N);H.position.copy(R.center);const G=Math.max(R.radius*1.45,.65);H.scale.setScalar(G),H.userData.hyperedgeId=F.id,O.add(H),at.set(F.id,H)}})();const k=new cb,ut=new Ft,xt=(q,F)=>{const x=c.domElement.getBoundingClientRect();ut.x=(q-x.left)/x.width*2-1,ut.y=-((F-x.top)/x.height)*2+1,k.setFromCamera(ut,l);const v=[...ot.values()],N=k.intersectObjects(v,!0).find(G=>G.object instanceof we&&typeof G.object.userData.nodeId=="string");if(!N){i(null);return}const H=N.object.userData.nodeId;i(H??null)},A=q=>{q.button===0&&(E(),xt(q.clientX,q.clientY))};c.domElement.addEventListener("pointerdown",A),c.domElement.addEventListener("pointerup",D),c.domElement.addEventListener("wheel",B,{passive:!0}),c.domElement.addEventListener("touchstart",E,{passive:!0}),c.domElement.addEventListener("touchend",D,{passive:!0}),L.addEventListener("start",E),L.addEventListener("end",D);let P=0;const S=new jp,it=()=>{const q=S.getDelta(),F=S.getElapsedTime();L.update();for(const x of ot.values())x.rotation.y+=q*.1,x.rotation.z+=q*.02*Math.sin(F*.6+x.position.x*.2);p.render(),h.render(a,l),P=requestAnimationFrame(it)};it();const J=()=>{const q=n.clientWidth||window.innerWidth,F=n.clientHeight||window.innerHeight;l.aspect=q/F,l.updateProjectionMatrix(),c.setSize(q,F),p.setSize(q,F),h.setSize(q,F),_t.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",J);const Z=q=>{Q&&(a.remove(Q),Q.geometry.dispose(),Q.material.dispose(),Q=Et(q.pathIds),a.add(Q));const F=new Set([...q.pathIds,...q.hyperMemberIds]);for(const[x,v]of ot){const R=q.pathIds.has(x),N=q.hyperMemberIds.has(x),H=q.selectedId===x,G=!F.has(x)&&(q.pathIds.size>0||q.hyperMemberIds.size>0),gt=G?.32:1,ht=v.userData.nodeType||"major";v.traverse(dt=>{if(dt instanceof vr&&dt.userData.isNodeLabel){const st=dt.element;let pt=G?.36:.96;(R||N)&&(pt=Math.max(pt,.94)),H&&(pt=1),st.style.opacity=String(pt),st.style.filter=H?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":R||N?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",st.style.fontWeight=H?"800":"650",dt.renderOrder=H?20:10;return}if(dt instanceof vr&&dt.userData.isFusionQuadrantLabel){const st=dt.element;if(!(ht==="fusion"&&H)){st.style.opacity="0",st.style.visibility="hidden",dt.renderOrder=1;return}st.style.visibility="visible";let bt=G?.3:.92;(R||N)&&(bt=Math.max(bt,.9)),H&&(bt=1),st.style.opacity=String(bt),st.style.filter=H?"drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))":R||N?"drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))":"none",dt.renderOrder=H?18:8;return}if(!(dt instanceof we))return;const Pt=dt.material;if(Pt instanceof mn&&(dt.userData.part||"other")==="core"){let pt=G?.34:1;(R||N)&&(pt=Math.max(pt,.98)),H&&(pt=1),Pt.opacity=pt,Pt.transparent=pt<.999,Pt.color.set(H?16777215:R||N?15924223:16777215);return}if(Pt instanceof Mf){let st=G?.38:1,pt=ht==="major"?.11:.09;(R||N)&&(st=Math.max(st,.98),pt=.26),H&&(pt=.38,st=1),G&&(pt*=.55),Pt.transparent=st<.999,Pt.opacity=st,Pt.emissiveIntensity=pt}else if(Pt instanceof mn){const st=dt.userData.part||"other";let pt=.42;st==="glow"?pt=ht==="major"?.048:.036:st==="shard"?pt=.36:st==="ring"?pt=ht==="major"?.48:.52:st==="satellite"&&(pt=.9);let bt=pt*gt;(R||N)&&(st==="glow"||st==="shard"?bt=Math.max(bt,.22):bt=Math.max(bt,.82)),H&&(st==="glow"||st==="shard"||st==="satellite")&&(bt=Math.max(bt,.34)),H&&st==="ring"&&ht==="fusion"&&(bt=Math.max(bt,.78)),Pt.opacity=bt,Pt.transparent=!0}})}for(const[x,v]of at){const R=v.material,N=q.activeHyperedgeIds.has(x);R.opacity=N?.22:.06,R.color=new jt(N?14216447:Ff)}};return Z(e),{dispose(){U(),cancelAnimationFrame(P),window.removeEventListener("resize",J),c.domElement.removeEventListener("pointerdown",A),c.domElement.removeEventListener("pointerup",D),c.domElement.removeEventListener("wheel",B),c.domElement.removeEventListener("touchstart",E),c.domElement.removeEventListener("touchend",D),L.removeEventListener("start",E),L.removeEventListener("end",D);for(const q of ot.values())a.remove(q),q.traverse(F=>{var x;if(F instanceof we){const v=Array.isArray(F.material)?F.material:[F.material];for(const R of v)R instanceof Mf?(R.map=null,R.bumpMap=null,R.roughnessMap=null):R instanceof mn&&(R.map=null),R==null||R.dispose();(x=F.geometry)==null||x.dispose()}});ot.clear(),tt&&(a.remove(tt),tt.geometry.dispose(),tt.material.dispose(),tt=null),Q&&(a.remove(Q),Q.geometry.dispose(),Q.material.dispose(),Q=null);for(const q of at.values())O.remove(q),q.geometry.dispose(),q.material.dispose();at.clear(),a.remove(O),a.remove(_t),_t.geometry.dispose(),_t.material.dispose(),m.dispose(),d.dispose(),p.dispose(),Gb(),u.parentElement===n&&n.removeChild(u),L.dispose(),c.dispose(),c.domElement.parentElement&&c.domElement.parentElement.removeChild(c.domElement)},setVisualState(q){Z(q)},frameBounds:q=>{const F=[];for(const H of q){const G=t.layout[H];G&&F.push(new X(G.x,G.y,G.z))}if(!F.length)return;const x=new is().setFromPoints(F),v=new X;x.getCenter(v);const R=new X;x.getSize(R);const N=Math.max(R.length()*.65,4);L.target.copy(v),l.position.copy(v.clone().add(new X(N*.9,N*.55,N*.95))),L.update()},getCamera:()=>l}}function mu(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const Qb={class:"galaxy-page"},tT={key:0,class:"overlay center"},eT={key:1,class:"overlay center error-panel"},nT={class:"error-msg"},iT={class:"panel-card"},sT={class:"side-title"},rT={class:"side-desc"},oT={key:0,class:"block"},aT={class:"pill-list"},lT={class:"members"},cT={class:"panel-card rec"},uT={class:"rec-head"},hT={key:0,class:"rec-list"},fT={class:"rec-node"},dT={class:"rec-reason"},pT={key:2,class:"hint-promo",role:"note"},mT=Ii({__name:"GalaxyView",setup(n){const t=qr(),e=Jt("loading"),i=Jt(""),s=Jt(null),r=Jt([]),o=Jt(!1),a=Jt(!0),l=Jt(null),c=Xs(null),u=Jt(new Set),h=Xs(null),f=ee(()=>{if(!s.value||!c.value)return"";const Y=c.value.nodes.find(k=>k.id===s.value);return(Y==null?void 0:Y.label)??""}),p=ee(()=>{var ut,xt;if(!s.value||!c.value)return"";const Y=c.value.nodes.find(A=>A.id===s.value);if(!Y)return"";if(Y.type==="fusion"){const A=((ut=Y.meta)==null?void 0:ut.subtitle)??"";return A?`交叉关卡 · ${A}`:"交叉学科关卡"}const k=((xt=Y.meta)==null?void 0:xt.tagline)??"";return k?`专业入口 · ${k}`:"专业节点"}),g=ee(()=>{if(!s.value||!c.value)return{ids:[],members:[]};const{hyperedgeIds:Y,memberIds:k}=Zi(s.value,c.value.hyperedges),ut=[...k].map(xt=>{var A;return((A=c.value.nodes.find(P=>P.id===xt))==null?void 0:A.label)??xt}).filter(xt=>xt);return{ids:Y,members:ut}}),_=ee(()=>!s.value||!c.value?new Set:new Set(Zi(s.value,c.value.hyperedges).hyperedgeIds)),m=ee(()=>!s.value||!c.value?new Set:Zi(s.value,c.value.hyperedges).memberIds),d=ee(()=>({pathIds:u.value,selectedId:s.value,hyperMemberIds:m.value,activeHyperedgeIds:_.value}));Mn(d,Y=>{var k;(k=h.value)==null||k.setVisualState(Y)}),Mn(s,()=>{o.value=!1,yt()});function y(){try{const Y=sessionStorage.getItem(ea);if(!Y)return null;const k=JSON.parse(Y);return!k.fromId||!k.toId||k.fromId===k.toId?null:k}catch{return null}}async function T(){if(e.value="loading",i.value="",!mu()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const Y=y();if(!Y){t.replace({name:"select"});return}l.value=Y;try{const k=e0();let ut,xt;try{ut=await dh(k),xt=await ph(k)}catch(P){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&k!=="./mock")ut=await dh("./mock"),xt=await ph("./mock");else throw P}r.value=xt.suggestions??[],c.value={nodes:ut.nodes,edges:ut.edges,hyperedges:ut.hyperedges,layout:ut.layout};const A=n0(c.value.edges,Y.fromId,Y.toId);u.value=new Set(A??[Y.fromId,Y.toId]),e.value="ready"}catch(k){e.value="error",i.value=k instanceof Error?k.message:"加载失败"}}function M(Y){var P;if((P=h.value)==null||P.dispose(),h.value=null,!Y||!c.value||e.value!=="ready")return;const k={pathIds:u.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},ut=Kc(c.value.nodes),xt=pu(Y,c.value,k,S=>{s.value=S},{ambientStarBoost:ut});h.value=xt,xt.setVisualState(d.value);const A=[...u.value];xt.frameBounds(A.length?A:[...c.value.nodes.map(S=>S.id)].slice(0,6))}const L=Jt(null),I=Jt(null),C=Jt(!0),U=Jt(null),w=Jt(null);let E=!1,D=0,B=0,V=0,ot=0;function at(Y,k,ut){return Math.max(k,Math.min(ut,Y))}function tt(){E&&(E=!1,window.removeEventListener("pointermove",Q),window.removeEventListener("pointerup",tt))}function Q(Y){if(!E||!I.value)return;const k=I.value,ut=Y.clientX-D,xt=Y.clientY-B,A=k.getBoundingClientRect(),P=A.width,S=A.height;let it=V+ut,J=ot+xt;it=at(it,8,window.innerWidth-P-8),J=at(J,8,window.innerHeight-S-8),U.value=it,w.value=J}function $(Y){if(Y.button!==0||!I.value)return;tt(),Y.preventDefault();const k=I.value.getBoundingClientRect();E=!0,D=Y.clientX,B=Y.clientY,V=k.left,ot=k.top,U.value=k.left,w.value=k.top,window.addEventListener("pointermove",Q),window.addEventListener("pointerup",tt)}const _t=ee(()=>{if(!(U.value==null||w.value==null))return{left:`${U.value}px`,top:`${w.value}px`,right:"auto",bottom:"auto"}});function yt(){C.value=!0,U.value=null,w.value=null,tt()}va(async()=>{await T()}),Mn(e,async Y=>{Y==="ready"&&(await Qi(),M(L.value))}),xa(()=>{var Y;tt(),(Y=h.value)==null||Y.dispose()});function Ct(){T()}function Ut(){t.push({name:"select"})}function Zt(){try{sessionStorage.removeItem(ea)}catch{}ap(),t.replace({name:"select"})}function ct(Y){var k,ut;return((ut=(k=c.value)==null?void 0:k.nodes.find(xt=>xt.id===Y))==null?void 0:ut.label)??Y}function mt(){Et(),t.push({path:"/personal"})}function Et(){a.value=!1}function O(){const Y=s.value;if(!Y||!c.value)return;const k=c.value.nodes.find(ut=>ut.id===Y);!k||k.type!=="fusion"||t.push({name:"personalStarlit",query:{fusionId:Y,title:k.label,source:"galaxy"}})}return(Y,k)=>{var ut,xt;return Ot(),Ht("div",Qb,[e.value==="loading"?(Ot(),Ht("div",tT,[...k[2]||(k[2]=[K("div",{class:"spinner","aria-hidden":"true"},null,-1),K("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(Ot(),Ht("div",eT,[k[3]||(k[3]=K("p",{class:"error-title"},"无法进入星系",-1)),K("p",nT,zt(i.value),1),K("div",{class:"error-actions"},[K("button",{type:"button",class:"btn ghost",onClick:Ut},"返回选择"),K("button",{type:"button",class:"btn primary",onClick:Ct},"重试")]),k[4]||(k[4]=K("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(Ot(),Ht(Le,{key:2},[K("div",{ref_key:"canvasHost",ref:L,class:"canvas-host"},null,512),K("div",{class:"top-bar"},[k[5]||(k[5]=K("div",{class:"top-left-spacer"},null,-1)),k[6]||(k[6]=K("div",{class:"top-title"},"专业星系",-1)),K("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:Zt},"×")]),s.value?(Ot(),Ht("button",{key:0,type:"button",class:"side-toggle",onClick:k[0]||(k[0]=A=>C.value=!C.value)},zt(C.value?"隐藏":"显示"),1)):Ye("",!0),s.value?Wm((Ot(),Ht("aside",{key:1,ref_key:"sidePanelEl",ref:I,class:"side",style:da(_t.value)},[K("div",{class:"side-drag-handle",onPointerdown:$},"信息面板",32),K("section",iT,[k[9]||(k[9]=K("p",{class:"side-eyebrow"},"选中",-1)),K("h2",sT,zt(f.value),1),K("p",rT,zt(p.value),1),g.value.ids.length?(Ot(),Ht("section",oT,[k[7]||(k[7]=K("p",{class:"block-label"},"相关超边（融合域）",-1)),K("ul",aT,[(Ot(!0),Ht(Le,null,ts(g.value.ids,A=>(Ot(),Ht("li",{key:A,class:"pill"},zt(A),1))),128))]),k[8]||(k[8]=K("p",{class:"block-label"},"成员节点",-1)),K("p",lT,zt(g.value.members.join("、")),1)])):Ye("",!0),((xt=(ut=c.value)==null?void 0:ut.nodes.find(A=>A.id===s.value))==null?void 0:xt.type)==="fusion"?(Ot(),Ht("button",{key:1,type:"button",class:"btn primary full",onClick:O}," 去练 ")):Ye("",!0)]),K("section",cT,[K("div",uT,[k[10]||(k[10]=K("p",{class:"block-label"},"推荐下一步（mock）",-1)),K("button",{type:"button",class:"btn rec-toggle",onClick:k[1]||(k[1]=A=>o.value=!o.value)},zt(o.value?"收起":"展开"),1)]),o.value?(Ot(),Ht("ul",hT,[(Ot(!0),Ht(Le,null,ts(r.value,A=>(Ot(),Ht("li",{key:A.nodeId},[K("span",fT,zt(ct(A.nodeId)),1),K("span",dT,zt(A.reason),1)]))),128))])):Ye("",!0)])],4)),[[o_,C.value]]):a.value?(Ot(),Ht("div",pT,[K("button",{type:"button",class:"hint-dismiss","aria-label":"关闭",onClick:Fs(Et,["stop"])},"×"),k[11]||(k[11]=K("p",{class:"promo-title"},"个人专业星图",-1)),K("button",{type:"button",class:"btn promo-cta",onClick:mt},"进入个人星图")])):Ye("",!0)],64))])}}}),gT=rs(mT,[["__scopeId","data-v-2f336367"]]),_T={class:"hub"},vT=Ii({__name:"PersonalGalaxyHubView",setup(n){const t=xn(jr);if(!t)throw new Error("[PersonalGalaxyHubView] router inject failed");function e(){t.push({path:"/personal/design"})}function i(){t.push({path:"/personal/showcase"})}function s(){t.replace({path:"/galaxy"})}return(r,o)=>(Ot(),Ht("div",_T,[K("header",{class:"bar"},[K("button",{type:"button",class:"ghost",onClick:s},"← 大星图"),o[0]||(o[0]=K("div",{class:"bar-center"},[K("p",{class:"eyebrow"},"OfferCat · Galaxy"),K("h1",{class:"title"},"个人专业星图")],-1)),o[1]||(o[1]=K("span",{class:"spacer","aria-hidden":"true"},null,-1))]),K("main",{class:"main"},[o[4]||(o[4]=K("p",{class:"lead"}," 与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。 ",-1)),K("button",{type:"button",class:"card card--primary",onClick:e},[...o[2]||(o[2]=[K("span",{class:"card-kicker"},"编辑",-1),K("span",{class:"card-title"},"设计专属星图",-1),K("span",{class:"card-desc"},"添加大行星、连边、三选一岗位，保存到本机。",-1)])]),K("button",{type:"button",class:"card card--ghost",onClick:i},[...o[3]||(o[3]=[K("span",{class:"card-kicker"},"只读",-1),K("span",{class:"card-title"},"展示已保存星图",-1),K("span",{class:"card-desc"},"进入前请先在设计页保存至少一颗大行星或一条融合。",-1)])])])]))}}),xT=rs(vT,[["__scopeId","data-v-02210880"]]),Bf={major_electrical:"电气工程",major_law:"法学",major_accounting:"会计学",major_cs:"计算机科学",major_finance:"金融学",major_clinical:"临床医学",major_swe:"软件工程",major_marketing:"市场营销",major_ds:"数据科学",major_english:"英语"};function MT(n,t){const e=Bf[n],i=Bf[t];return!e||!i?["",""]:[`${e}×${i}`,`${i}×${e}`]}function yT(n){const t=n.split(/\r?\n/).filter(i=>i.trim().length>0),e=[];for(let i=0;i<t.length;i++){const s=t[i];if(s.startsWith("序号")||s.startsWith("	序号"))continue;const r=s.split("	");if(r.length<11)continue;const o=Number.parseInt(r[0],10);Number.isFinite(o)&&e.push({idx:o,pair:r[1].trim(),title:r[2].trim(),heat:r[3].trim(),salaryJunior:r[4].trim(),salaryMid:r[5].trim(),salarySenior:r[6].trim(),workIntensity:r[7].trim(),competition:r[8].trim(),education:r[9].trim(),skills:r[10].trim()})}return e}let No=null;async function ST(){if(No)return No;const n="./data/cross_job_catalog.tsv".replace(/\/{2,}/g,"/"),t=await fetch(n);if(!t.ok)throw new Error(`无法加载岗位表: ${t.status}`);const e=await t.text();return No=yT(e),No}async function zf(n,t){const[e,i]=MT(n,t);if(!e)return[];const r=(await ST()).filter(o=>o.pair===e||o.pair===i);return r.length>=3?r.slice(0,3):r}const $p="offercat_personal_galaxy_v1",Hf=6;function ET(n,t){const e={},i=n.length;for(let s=0;s<i;s++){const r=n[s],o=2*Math.PI*s/Math.max(i,1);e[r.id]={x:Hf*Math.cos(o),y:.25,z:Hf*Math.sin(o)}}for(const s of t){const r=e[s.majorA],o=e[s.majorB];if(!r||!o)continue;const a={x:(r.x+o.x)*.5,y:(r.y+o.y)*.5+.6,z:(r.z+o.z)*.5};e[s.id]=a}return e}function bT(n){return{subtitle:`${n.heat} · 初${n.salaryJunior} / 中${n.salaryMid} / 高${n.salarySenior}`,tagline:`${n.workIntensity}级强度 · 竞争${n.competition}`,heat:n.heat,salaryJunior:n.salaryJunior,salaryMid:n.salaryMid,salarySenior:n.salarySenior,workIntensity:n.workIntensity,competition:n.competition,education:n.education,skills:n.skills,catalogIdx:String(n.idx),pair:n.pair}}function Kp(n,t){const e=ET(n,t),i=[];for(const o of n)i.push({id:o.id,type:"major",label:o.label,meta:{tagline:"个人星系 · 大行星"}});for(const o of t)i.push({id:o.id,type:"fusion",label:o.title,meta:bT(o.row)});const s=[];for(const o of t)s.push({u:o.id,v:o.majorA,kind:"fusion-major"}),s.push({u:o.id,v:o.majorB,kind:"fusion-major"});const r=t.map(o=>({id:`he_${o.id}`,member_node_ids:[o.id,o.majorA,o.majorB],style_hint:"personal"}));return{nodes:i,edges:s,hyperedges:r,layout:e}}function TT(n,t){return{v:1,majors:[...n],fusions:[...t],updatedAt:Date.now()}}function aa(){try{const n=localStorage.getItem($p);if(!n)return null;const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.majors)||!Array.isArray(t.fusions)?null:t}catch{return null}}function AT(n){try{localStorage.setItem($p,JSON.stringify(n))}catch{}}async function wT(n){return{ok:!1}}function RT(){try{const n=sessionStorage.getItem(ea);if(!n)return!1;const t=JSON.parse(n);return!!(t!=null&&t.fromId&&(t!=null&&t.toId)&&t.fromId!==t.toId)}catch{return!1}}function CT(n){if(!RT()){n.replace({name:"select"});return}n.replace({name:"galaxy"})}function PT(n){n.push({name:"personalDesign"})}function DT(){try{const n=window.history.state;return n!=null&&n.back!=null&&n.back!==""}catch{return!1}}function Zp(n,t){if(DT()){n.back();return}n.replace(t)}function LT(n){CT(n)}const IT={class:"personal-root"},UT={key:0,class:"loading-overlay"},NT={key:1,class:"err-banner"},OT={key:2,class:"save-toast"},FT={class:"control-panel"},BT={class:"tb-block"},zT={class:"major-grid"},HT=["onClick"],kT=["disabled"],VT={class:"tb-block"},GT={key:0,class:"hint"},WT={key:0,class:"tb-block fusion-strip"},XT={class:"fusion-strip-title"},jT={key:1,class:"tb-block"},qT={class:"mono"},YT={key:2,class:"tb-block muted"},$T={id:"fusion-sheet-heading",class:"fusion-sheet-title"},KT={class:"fusion-sheet-dl"},ZT={class:"modal"},JT=["onClick"],QT={class:"jt"},tA={class:"jd"},eA=Ii({__name:"PersonalGalaxyView",setup(n){const t=qr(),e=Jt("loading"),i=Jt(""),s=Jt(null),r=Jt(!1),o=Jt(null),a=Jt([]),l=Jt([]),c=Jt({open:!1,aId:"",bId:"",options:[]}),u=Jt(null),h=Jt(""),f=Jt(null),p=Xs(null),g=ee(()=>Kp(a.value,l.value)),_=ee(()=>u.value?Zi(u.value,g.value.hyperedges).memberIds:new Set),m=ee(()=>u.value?new Set(Zi(u.value,g.value.hyperedges).hyperedgeIds):new Set),d=ee(()=>({pathIds:new Set,selectedId:u.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));Mn(d,D=>{var B;(B=p.value)==null||B.setVisualState(D)});const y=ee(()=>u.value?l.value.find(D=>D.id===u.value)??null:null),T=ee(()=>u.value?a.value.find(D=>D.id===u.value)??null:null);function M(){var ot;const D=f.value,B=g.value;if((ot=p.value)==null||ot.dispose(),p.value=null,!D||B.nodes.length===0)return;const V=Kc(B.nodes);p.value=pu(D,B,d.value,at=>{if(u.value=at,!at||!r.value||!a.value.some(_t=>_t.id===at))return;if(!o.value){o.value=at;return}if(o.value===at)return;const Q=a.value.find(_t=>_t.id===o.value),$=a.value.find(_t=>_t.id===at);!Q||!$||L(Q,$)},{ambientStarBoost:V}),p.value.setVisualState(d.value),p.value.frameBounds(B.nodes.map(at=>at.id))}Mn(g,async()=>{e.value==="ready"&&(await Qi(),M())});async function L(D,B){try{const V=await zf(D.majorId,B.majorId);if(V.length===0){i.value=`《具体专业》表中暂无「${D.label}×${B.label}」组合的三岗数据，请换一对学科。`,o.value=null;return}c.value={open:!0,aId:D.id,bId:B.id,options:V}}catch(V){i.value=V instanceof Error?V.message:"加载岗位表失败"}finally{o.value=null}}function I(D){const{aId:B,bId:V}=c.value,ot=`f_${Date.now()}`;l.value.push({id:ot,title:D.title,majorA:B,majorB:V,row:D}),c.value.open=!1,c.value.options=[],r.value=!1,u.value=ot}function C(){c.value.open=!1,c.value.options=[],o.value=null}function U(){if(!s.value)return;const D=Lr.find(V=>V.id===s.value);if(!D)return;const B=`m_${s.value}_${Date.now()}`;a.value.push({id:B,majorId:D.id,label:D.label}),s.value=null}async function w(){const D=TT(a.value,l.value);AT(D);const B=await wT();h.value=B.ok?"已保存到本地，并已尝试同步服务端。":"已保存到本机（服务端同步接口待接入）。",window.setTimeout(()=>{h.value=""},3200)}function E(){Zp(t,{name:"personalHub"})}return va(async()=>{var B;if(!mu()){e.value="error",i.value="当前环境不支持 WebGL";return}try{await zf("major_electrical","major_law")}catch(V){e.value="error",i.value=V instanceof Error?V.message:"预加载岗位表失败";return}const D=aa();(B=D==null?void 0:D.majors)!=null&&B.length&&(a.value=[...D.majors],l.value=[...D.fusions]),e.value="ready",await Qi(),M()}),xa(()=>{var D;(D=p.value)==null||D.dispose(),p.value=null}),(D,B)=>(Ot(),Ht("div",IT,[e.value==="loading"?(Ot(),Ht("div",UT,"加载岗位数据…")):Ye("",!0),e.value==="error"?(Ot(),Ht("div",NT,zt(i.value),1)):Ye("",!0),K("header",{class:"top-bar"},[K("button",{type:"button",class:"back-btn",onClick:E},"返回"),B[4]||(B[4]=K("div",{class:"top-titles"},[K("h1",{class:"title"},"设计专属星图"),K("p",{class:"subtitle"},"与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。")],-1)),K("button",{type:"button",class:"save-btn",onClick:w},"保存星系")]),h.value?(Ot(),Ht("p",OT,zt(h.value),1)):Ye("",!0),K("div",{ref_key:"canvasHost",ref:f,class:"canvas-wrap"},null,512),K("div",FT,[K("section",BT,[B[5]||(B[5]=K("p",{class:"label"},"① 添加大行星（10 学科）",-1)),K("div",zT,[(Ot(!0),Ht(Le,null,ts(rn(Lr),V=>(Ot(),Ht("button",{key:V.id,type:"button",class:Ji(["chip",{active:s.value===V.id}]),onClick:ot=>s.value=V.id},zt(V.label),11,HT))),128))]),K("button",{type:"button",class:"primary full",disabled:!s.value,onClick:U}," 放入星空 ",8,kT)]),K("section",VT,[B[6]||(B[6]=K("p",{class:"label"},"② 连边并生成交叉岗位",-1)),K("button",{type:"button",class:Ji(["secondary full",{on:r.value}]),onClick:B[0]||(B[0]=V=>{r.value=!r.value,o.value=null})},zt(r.value?"连边模式已开 · 依次点两颗大行星":"开启连边模式"),3),r.value?(Ot(),Ht("p",GT,"在星空中先点一颗，再点另一颗；有数据则弹出三选一。")):Ye("",!0)]),y.value?(Ot(),Ht("section",WT,[B[7]||(B[7]=K("p",{class:"label"},"当前小行星",-1)),K("p",XT,zt(y.value.title),1),B[8]||(B[8]=K("p",{class:"hint fusion-strip-hint"},"四象详情见下方弹层；点击星空空白处可取消选中。",-1))])):T.value?(Ot(),Ht("section",jT,[B[9]||(B[9]=K("p",{class:"label"},"当前选中",-1)),K("p",qT,"大行星 · "+zt(T.value.label),1)])):(Ot(),Ht("section",YT,[...B[10]||(B[10]=[K("p",{class:"hint"},"提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。",-1)])]))]),(Ot(),Fr(wl,{to:"body"},[y.value?(Ot(),Ht("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"fusion-sheet-heading",onClick:B[3]||(B[3]=Fs(V=>u.value=null,["self"]))},[K("div",{class:"fusion-sheet",onClick:B[2]||(B[2]=Fs(()=>{},["stop"]))},[B[15]||(B[15]=K("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),K("h3",$T,zt(y.value.title),1),B[16]||(B[16]=K("p",{class:"fusion-sheet-sub"},"四象属性（岗位表 · 完整）",-1)),K("dl",KT,[B[11]||(B[11]=K("dt",null,"热度/年薪",-1)),K("dd",null,zt(y.value.row.heat)+" · 初级年薪 "+zt(y.value.row.salaryJunior)+" · 中级年薪 "+zt(y.value.row.salaryMid),1),B[12]||(B[12]=K("dt",null,"强度/竞争",-1)),K("dd",null,zt(y.value.row.workIntensity)+"级 · "+zt(y.value.row.competition),1),B[13]||(B[13]=K("dt",null,"学历门槛",-1)),K("dd",null,zt(y.value.row.education),1),B[14]||(B[14]=K("dt",null,"学科技能",-1)),K("dd",null,zt(y.value.row.skills),1)]),K("button",{type:"button",class:"fusion-sheet-close",onClick:B[1]||(B[1]=V=>u.value=null)},"收起")])])):Ye("",!0)])),(Ot(),Fr(wl,{to:"body"},[c.value.open?(Ot(),Ht("div",{key:0,class:"modal-mask",onClick:Fs(C,["self"])},[K("div",ZT,[B[17]||(B[17]=K("h2",null,"三选一 · 确立小行星",-1)),B[18]||(B[18]=K("p",{class:"modal-sub"},"数据来源：《具体专业》岗位表（同组合前三条）",-1)),K("ul",null,[(Ot(!0),Ht(Le,null,ts(c.value.options,(V,ot)=>(Ot(),Ht("li",{key:ot},[K("button",{type:"button",class:"job-btn",onClick:at=>I(V)},[K("span",QT,zt(V.title),1),K("span",tA,zt(V.heat)+" · 中级年薪 "+zt(V.salaryMid)+" · 竞争 "+zt(V.competition),1)],8,JT)]))),128))]),K("button",{type:"button",class:"ghost full",onClick:C},"取消")])])):Ye("",!0)]))]))}}),nA=rs(eA,[["__scopeId","data-v-3c969e7f"]]),iA={class:"showcase-root"},sA={class:"bar"},rA={class:"mid"},oA={key:0,class:"sub"},aA={key:1,class:"sub muted"},lA={key:0,class:"overlay"},cA={key:1,class:"overlay err"},uA={key:2,class:"overlay empty"},hA={id:"showcase-fusion-title",class:"fusion-sheet-title"},fA={class:"fusion-sheet-dl"},dA={class:"starlit-hint"},pA=Ii({__name:"PersonalGalaxyShowcaseView",setup(n){const t=qr(),e=op(),i=Jt("loading"),s=Jt(""),r=Xs(null),o=Jt(null),a=Jt(null),l=Xs(null),c=ee(()=>{const M=r.value;return M?Kp(M.majors,M.fusions):null}),u=ee(()=>!o.value||!c.value?new Set:Zi(o.value,c.value.hyperedges).memberIds),h=ee(()=>!o.value||!c.value?new Set:new Set(Zi(o.value,c.value.hyperedges).hyperedgeIds)),f=ee(()=>({pathIds:new Set,selectedId:o.value,hyperMemberIds:u.value,activeHyperedgeIds:h.value}));Mn(f,M=>{var L;(L=l.value)==null||L.setVisualState(M)});const p=ee(()=>!o.value||!r.value?null:r.value.fusions.find(M=>M.id===o.value)??null),g=ee(()=>{var M;return!o.value||!c.value?"":((M=c.value.nodes.find(L=>L.id===o.value))==null?void 0:M.label)??""});function _(){var C;const M=a.value,L=c.value;if((C=l.value)==null||C.dispose(),l.value=null,!M||!L||L.nodes.length===0)return;const I=Kc(L.nodes);l.value=pu(M,L,f.value,U=>{o.value=U},{ambientStarBoost:I}),l.value.setVisualState(f.value),l.value.frameBounds(L.nodes.map(U=>U.id))}function m(){PT(t)}function d(){Zp(t,{name:"personalHub"})}function y(){o.value=null}function T(){const M=p.value;M&&t.push({name:"personalStarlit",query:{fusionId:M.id}})}return Mn(()=>e.fullPath,async()=>{e.name!=="personalShowcase"||i.value!=="ready"||(r.value=aa(),await Qi(),_())}),va(async()=>{if(!mu()){i.value="error",s.value="当前环境不支持 WebGL";return}const M=aa();if(r.value=M,!M||M.majors.length===0&&M.fusions.length===0){i.value="empty";return}i.value="ready",await Qi(),_()}),xa(()=>{var M;(M=l.value)==null||M.dispose(),l.value=null}),(M,L)=>(Ot(),Ht("div",iA,[K("header",sA,[K("button",{type:"button",class:"ghost",onClick:d},"返回"),K("div",rA,[L[1]||(L[1]=K("h1",{class:"title"},"展示星图",-1)),g.value?(Ot(),Ht("p",oA,zt(g.value),1)):(Ot(),Ht("p",aA,"点击小行星查看四象与点亮星辰"))]),L[2]||(L[2]=K("span",{class:"spacer","aria-hidden":"true"},null,-1))]),i.value==="loading"?(Ot(),Ht("div",lA,"加载…")):i.value==="error"?(Ot(),Ht("div",cA,zt(s.value),1)):i.value==="empty"?(Ot(),Ht("div",uA,[L[3]||(L[3]=K("p",null,"还没有已保存的个人星系。",-1)),K("button",{type:"button",class:"cta",onClick:m},"返回去设计")])):(Ot(),Ht("div",{key:3,ref_key:"canvasHost",ref:a,class:"canvas"},null,512)),(Ot(),Fr(wl,{to:"body"},[p.value?(Ot(),Ht("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"showcase-fusion-title",onClick:Fs(y,["self"])},[K("div",{class:"fusion-sheet",onClick:L[0]||(L[0]=Fs(()=>{},["stop"]))},[L[10]||(L[10]=K("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),K("h2",hA,zt(p.value.title),1),L[11]||(L[11]=K("p",{class:"fusion-sheet-sub"},"四象属性 · 已保存数据",-1)),K("dl",fA,[L[4]||(L[4]=K("dt",null,"热度/年薪",-1)),K("dd",null,zt(p.value.row.heat)+" · 初级年薪 "+zt(p.value.row.salaryJunior)+" · 中级年薪 "+zt(p.value.row.salaryMid),1),L[5]||(L[5]=K("dt",null,"强度/竞争",-1)),K("dd",null,zt(p.value.row.workIntensity)+"级 · "+zt(p.value.row.competition),1),L[6]||(L[6]=K("dt",null,"学历门槛",-1)),K("dd",null,zt(p.value.row.education),1),L[7]||(L[7]=K("dt",null,"学科技能",-1)),K("dd",null,zt(p.value.row.skills),1)]),K("p",dA,[L[8]||(L[8]=Il(" 已点亮 ",-1)),K("strong",null,zt(rn($c)(p.value.id)),1),L[9]||(L[9]=Il(" / 50 颗星；答题正确可继续点亮（本页为前端占位，数据存本机）。 ",-1))]),K("button",{type:"button",class:"fusion-sheet-primary",onClick:T},"点亮星辰 · 去答题"),K("button",{type:"button",class:"fusion-sheet-close",onClick:y},"收起")])])):Ye("",!0)]))]))}}),mA=rs(pA,[["__scopeId","data-v-42b0156a"]]),gA={class:"quiz-root"},_A={class:"bar"},vA={class:"mid"},xA={class:"sub"},MA={key:0,class:"empty"},yA={class:"star-strip","aria-label":"已点亮星数"},SA={class:"star-label"},EA={class:"star-dots",role:"list"},bA={key:0,class:"card done"},TA={class:"done-desc"},AA={key:1,class:"card"},wA={class:"progress"},RA={class:"qtext"},CA={class:"opts"},PA=["onClick"],DA={key:2,class:"toast",role:"status"},LA=Ii({__name:"PersonalStarlitQuizView",setup(n){const t=op(),e=qr(),i=ee(()=>String(t.query.fusionId||"")),s=ee(()=>{const m=t.query.title;if(typeof m=="string"&&m.trim())return m;const d=i.value;if(!d)return"小行星";const y=aa(),T=y==null?void 0:y.fusions.find(M=>M.id===d);return(T==null?void 0:T.title)??"小行星"});function r(m){const d=[],y=["正确","错误","视场景而定","以上皆非"];for(let T=0;T<oo;T++){const M=T%4,L=`【${m}】第 ${T+1} / ${oo} 题（占位）：与交叉岗位相关的表述，选项「${y[M]}」为本题预设答案。`;d.push({idx:T,text:L,options:[...y],correct:M})}return d}const o=Jt([]),a=Jt(0),l=Jt(0),c=Jt(""),u=Jt(!1);Mn([i,s],([m])=>{m&&(l.value=$c(m),o.value=r(s.value),a.value=0,u.value=!1)},{immediate:!0});const h=ee(()=>o.value[a.value]??null);function f(m){c.value=m,window.setTimeout(()=>{c.value=""},1400)}function p(m){if(!i.value||u.value||!h.value)return;const d=h.value;if(m===d.correct){if(l.value=s0(i.value),f("点亮 +1 星"),a.value>=oo-1||l.value>=Bs){u.value=!0;return}a.value+=1}else f("再想想看")}function g(){LT(e)}function _(){f("对接题库：uni.navigateTo 刷题页（占位）")}return(m,d)=>(Ot(),Ht("div",gA,[K("header",_A,[K("button",{type:"button",class:"ghost",onClick:g},"← 退出"),K("div",vA,[d[0]||(d[0]=K("h1",{class:"title"},"点亮星辰",-1)),K("p",xA,zt(s.value),1)]),d[1]||(d[1]=K("span",{class:"spacer"},null,-1))]),i.value?(Ot(),Ht(Le,{key:1},[K("section",yA,[K("div",SA,"已点亮 "+zt(l.value)+" / "+zt(rn(Bs))+" 星",1),K("div",EA,[(Ot(!0),Ht(Le,null,ts(rn(Bs),y=>(Ot(),Ht("span",{key:y,class:Ji(["dot",{on:y<=l.value}]),role:"listitem"},null,2))),128))])]),u.value?(Ot(),Ht("section",bA,[d[3]||(d[3]=K("p",{class:"done-title"},"本轮已完成",-1)),K("p",TA,"已点亮 "+zt(l.value)+" 颗星；数据已写入本机（占位）。退出后将回到专业星系（大星图）。",1),K("button",{type:"button",class:"cta",onClick:g},"退出"),K("button",{type:"button",class:"secondary",onClick:_},"进入题库刷题（占位）")])):h.value?(Ot(),Ht("section",AA,[K("p",wA,"题目 "+zt(a.value+1)+" / "+zt(rn(oo)),1),K("p",RA,zt(h.value.text),1),K("div",CA,[(Ot(!0),Ht(Le,null,ts(h.value.options,(y,T)=>(Ot(),Ht("button",{key:T,type:"button",class:"opt",onClick:M=>p(T)},zt(y),9,PA))),128))])])):Ye("",!0),c.value?(Ot(),Ht("p",DA,zt(c.value),1)):Ye("",!0)],64)):(Ot(),Ht("div",MA,[d[2]||(d[2]=K("p",null,"缺少小行星参数。",-1)),K("button",{type:"button",class:"cta",onClick:g},"退出")]))]))}}),IA=rs(LA,[["__scopeId","data-v-590a5341"]]),UA=_v(void 0),NA=zv({history:UA,routes:[{path:"/",name:"select",component:t0},{path:"/galaxy",name:"galaxy",component:gT},{path:"/personal/design",name:"personalDesign",component:nA},{path:"/personal/showcase",name:"personalShowcase",component:mA},{path:"/personal/starlit",name:"personalStarlit",component:IA},{path:"/personal",name:"personalHub",component:xT},{path:"/personal-galaxy",redirect:{name:"personalHub"}}]});w_(L_).use(NA).mount("#app");
