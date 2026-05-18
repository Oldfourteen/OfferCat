(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function $c(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const he={},Hs=[],kn=()=>{},hd=()=>!1,xa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ya=n=>n.startsWith("onUpdate:"),Ne=Object.assign,Kc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Om=Object.prototype.hasOwnProperty,le=(n,t)=>Om.call(n,t),Xt=Array.isArray,Vs=n=>Zr(n)==="[object Map]",dd=n=>Zr(n)==="[object Set]",ku=n=>Zr(n)==="[object Date]",Yt=n=>typeof n=="function",xe=n=>typeof n=="string",Hn=n=>typeof n=="symbol",ue=n=>n!==null&&typeof n=="object",pd=n=>(ue(n)||Yt(n))&&Yt(n.then)&&Yt(n.catch),md=Object.prototype.toString,Zr=n=>md.call(n),Fm=n=>Zr(n).slice(8,-1),gd=n=>Zr(n)==="[object Object]",Zc=n=>xe(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Dr=$c(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ma=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Bm=/-\w/g,Ze=Ma(n=>n.replace(Bm,t=>t.slice(1).toUpperCase())),zm=/\B([A-Z])/g,zi=Ma(n=>n.replace(zm,"-$1").toLowerCase()),Sa=Ma(n=>n.charAt(0).toUpperCase()+n.slice(1)),Va=Ma(n=>n?`on${Sa(n)}`:""),zn=(n,t)=>!Object.is(n,t),Wo=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},_d=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Jc=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Hu;const Ea=()=>Hu||(Hu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function ba(n){if(Xt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=xe(i)?Gm(i):ba(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(xe(n)||ue(n))return n}const km=/;(?![^(]*\))/g,Hm=/:([^]+)/,Vm=/\/\*[^]*?\*\//g;function Gm(n){const t={};return n.replace(Vm,"").split(km).forEach(e=>{if(e){const i=e.split(Hm);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Ui(n){let t="";if(xe(n))t=n;else if(Xt(n))for(let e=0;e<n.length;e++){const i=Ui(n[e]);i&&(t+=i+" ")}else if(ue(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Wm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Xm=$c(Wm);function vd(n){return!!n||n===""}function jm(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=Qc(n[i],t[i]);return e}function Qc(n,t){if(n===t)return!0;let e=ku(n),i=ku(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=Hn(n),i=Hn(t),e||i)return n===t;if(e=Xt(n),i=Xt(t),e||i)return e&&i?jm(n,t):!1;if(e=ue(n),i=ue(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!Qc(n[o],t[o]))return!1}}return String(n)===String(t)}const xd=n=>!!(n&&n.__v_isRef===!0),It=n=>xe(n)?n:n==null?"":Xt(n)||ue(n)&&(n.toString===md||!Yt(n.toString))?xd(n)?It(n.value):JSON.stringify(n,yd,2):String(n),yd=(n,t)=>xd(t)?yd(n,t.value):Vs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Ga(i,r)+" =>"]=s,e),{})}:dd(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ga(e))}:Hn(t)?Ga(t):ue(t)&&!Xt(t)&&!gd(t)?String(t):t,Ga=(n,t="")=>{var e;return Hn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ue;class qm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ue&&(Ue.active?(this.parent=Ue,this.index=(Ue.scopes||(Ue.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Ue;try{return Ue=this,t()}finally{Ue=e}}}on(){++this._on===1&&(this.prevScope=Ue,Ue=this)}off(){if(this._on>0&&--this._on===0){if(Ue===this)Ue=this.prevScope;else{let t=Ue;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ym(){return Ue}let me;const Wa=new WeakSet;class Md{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ue&&(Ue.active?Ue.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Wa.has(this)&&(Wa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ed(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Vu(this),bd(this);const t=me,e=Cn;me=this,Cn=!0;try{return this.fn()}finally{Td(this),me=t,Cn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)nu(t);this.deps=this.depsTail=void 0,Vu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Wa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Fl(this)&&this.run()}get dirty(){return Fl(this)}}let Sd=0,Ir,Lr;function Ed(n,t=!1){if(n.flags|=8,t){n.next=Lr,Lr=n;return}n.next=Ir,Ir=n}function tu(){Sd++}function eu(){if(--Sd>0)return;if(Lr){let t=Lr;for(Lr=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Ir;){let t=Ir;for(Ir=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function bd(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Td(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),nu(i),$m(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Fl(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Ad(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Ad(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===kr)||(n.globalVersion=kr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Fl(n))))return;n.flags|=2;const t=n.dep,e=me,i=Cn;me=n,Cn=!0;try{bd(n);const s=n.fn(n._value);(t.version===0||zn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{me=e,Cn=i,Td(n),n.flags&=-3}}function nu(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)nu(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function $m(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Cn=!0;const wd=[];function fi(){wd.push(Cn),Cn=!1}function hi(){const n=wd.pop();Cn=n===void 0?!0:n}function Vu(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=me;me=void 0;try{t()}finally{me=e}}}let kr=0;class Km{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class iu{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!me||!Cn||me===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==me)e=this.activeLink=new Km(me,this),me.deps?(e.prevDep=me.depsTail,me.depsTail.nextDep=e,me.depsTail=e):me.deps=me.depsTail=e,Rd(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=me.depsTail,e.nextDep=void 0,me.depsTail.nextDep=e,me.depsTail=e,me.deps===e&&(me.deps=i)}return e}trigger(t){this.version++,kr++,this.notify(t)}notify(t){tu();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{eu()}}}function Rd(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Rd(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Bl=new WeakMap,ns=Symbol(""),zl=Symbol(""),Hr=Symbol("");function Be(n,t,e){if(Cn&&me){let i=Bl.get(n);i||Bl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new iu),s.map=i,s.key=e),s.track()}}function si(n,t,e,i,s,r){const o=Bl.get(n);if(!o){kr++;return}const a=l=>{l&&l.trigger()};if(tu(),t==="clear")o.forEach(a);else{const l=Xt(n),c=l&&Zc(e);if(l&&e==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===Hr||!Hn(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Hr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(ns)),Vs(n)&&a(o.get(zl)));break;case"delete":l||(a(o.get(ns)),Vs(n)&&a(o.get(zl)));break;case"set":Vs(n)&&a(o.get(ns));break}}eu()}function _s(n){const t=ae(n);return t===n?t:(Be(t,"iterate",Hr),xn(n)?t:t.map(Dn))}function Ta(n){return Be(n=ae(n),"iterate",Hr),n}function On(n,t){return di(n)?Ks(is(n)?Dn(t):t):Dn(t)}const Zm={__proto__:null,[Symbol.iterator](){return Xa(this,Symbol.iterator,n=>On(this,n))},concat(...n){return _s(this).concat(...n.map(t=>Xt(t)?_s(t):t))},entries(){return Xa(this,"entries",n=>(n[1]=On(this,n[1]),n))},every(n,t){return Yn(this,"every",n,t,void 0,arguments)},filter(n,t){return Yn(this,"filter",n,t,e=>e.map(i=>On(this,i)),arguments)},find(n,t){return Yn(this,"find",n,t,e=>On(this,e),arguments)},findIndex(n,t){return Yn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Yn(this,"findLast",n,t,e=>On(this,e),arguments)},findLastIndex(n,t){return Yn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Yn(this,"forEach",n,t,void 0,arguments)},includes(...n){return ja(this,"includes",n)},indexOf(...n){return ja(this,"indexOf",n)},join(n){return _s(this).join(n)},lastIndexOf(...n){return ja(this,"lastIndexOf",n)},map(n,t){return Yn(this,"map",n,t,void 0,arguments)},pop(){return pr(this,"pop")},push(...n){return pr(this,"push",n)},reduce(n,...t){return Gu(this,"reduce",n,t)},reduceRight(n,...t){return Gu(this,"reduceRight",n,t)},shift(){return pr(this,"shift")},some(n,t){return Yn(this,"some",n,t,void 0,arguments)},splice(...n){return pr(this,"splice",n)},toReversed(){return _s(this).toReversed()},toSorted(n){return _s(this).toSorted(n)},toSpliced(...n){return _s(this).toSpliced(...n)},unshift(...n){return pr(this,"unshift",n)},values(){return Xa(this,"values",n=>On(this,n))}};function Xa(n,t,e){const i=Ta(n),s=i[t]();return i!==n&&!xn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const Jm=Array.prototype;function Yn(n,t,e,i,s,r){const o=Ta(n),a=o!==n&&!xn(n),l=o[t];if(l!==Jm[t]){const f=l.apply(n,r);return a?Dn(f):f}let c=e;o!==n&&(a?c=function(f,h){return e.call(this,On(n,f),h,n)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Gu(n,t,e,i){const s=Ta(n),r=s!==n&&!xn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=On(n,c)),e.call(this,c,On(n,u),f,n)}):e.length>3&&(o=function(c,u,f){return e.call(this,c,u,f,n)}));const l=s[t](o,...i);return a?On(n,l):l}function ja(n,t,e){const i=ae(n);Be(i,"iterate",Hr);const s=i[t](...e);return(s===-1||s===!1)&&ou(e[0])?(e[0]=ae(e[0]),i[t](...e)):s}function pr(n,t,e=[]){fi(),tu();const i=ae(n)[t].apply(n,e);return eu(),hi(),i}const Qm=$c("__proto__,__v_isRef,__isVue"),Cd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Hn));function tg(n){Hn(n)||(n=String(n));const t=ae(this);return Be(t,"has",n),t.hasOwnProperty(n)}class Pd{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?ug:Ud:r?Ld:Id).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Xt(t);if(!s){let l;if(o&&(l=Zm[e]))return l;if(e==="hasOwnProperty")return tg}const a=Reflect.get(t,e,He(t)?t:i);if((Hn(e)?Cd.has(e):Qm(e))||(s||Be(t,"get",e),r))return a;if(He(a)){const l=o&&Zc(e)?a:a.value;return s&&ue(l)?Hl(l):l}return ue(a)?s?Hl(a):Aa(a):a}}class Dd extends Pd{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Xt(t)&&Zc(e);if(!this._isShallow){const c=di(r);if(!xn(i)&&!di(i)&&(r=ae(r),i=ae(i)),!o&&He(r)&&!He(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:le(t,e),l=Reflect.set(t,e,i,He(t)?t:s);return t===ae(s)&&(a?zn(i,r)&&si(t,"set",e,i):si(t,"add",e,i)),l}deleteProperty(t,e){const i=le(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&si(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Hn(e)||!Cd.has(e))&&Be(t,"has",e),i}ownKeys(t){return Be(t,"iterate",Xt(t)?"length":ns),Reflect.ownKeys(t)}}class eg extends Pd{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const ng=new Dd,ig=new eg,sg=new Dd(!0);const kl=n=>n,ho=n=>Reflect.getPrototypeOf(n);function rg(n,t,e){return function(...i){const s=this.__v_raw,r=ae(s),o=Vs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?kl:t?Ks:Dn;return!t&&Be(r,"iterate",l?zl:ns),Ne(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function po(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function og(n,t){const e={get(s){const r=this.__v_raw,o=ae(r),a=ae(s);n||(zn(s,a)&&Be(o,"get",s),Be(o,"get",a));const{has:l}=ho(o),c=t?kl:n?Ks:Dn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Be(ae(s),"iterate",ns),s.size},has(s){const r=this.__v_raw,o=ae(r),a=ae(s);return n||(zn(s,a)&&Be(o,"has",s),Be(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ae(a),c=t?kl:n?Ks:Dn;return!n&&Be(l,"iterate",ns),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return Ne(e,n?{add:po("add"),set:po("set"),delete:po("delete"),clear:po("clear")}:{add(s){const r=ae(this),o=ho(r),a=ae(s),l=!t&&!xn(s)&&!di(s)?a:s;return o.has.call(r,l)||zn(s,l)&&o.has.call(r,s)||zn(a,l)&&o.has.call(r,a)||(r.add(l),si(r,"add",l,l)),this},set(s,r){!t&&!xn(r)&&!di(r)&&(r=ae(r));const o=ae(this),{has:a,get:l}=ho(o);let c=a.call(o,s);c||(s=ae(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?zn(r,u)&&si(o,"set",s,r):si(o,"add",s,r),this},delete(s){const r=ae(this),{has:o,get:a}=ho(r);let l=o.call(r,s);l||(s=ae(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&si(r,"delete",s,void 0),c},clear(){const s=ae(this),r=s.size!==0,o=s.clear();return r&&si(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=rg(s,n,t)}),e}function su(n,t){const e=og(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(le(e,s)&&s in i?e:i,s,r)}const ag={get:su(!1,!1)},lg={get:su(!1,!0)},cg={get:su(!0,!1)};const Id=new WeakMap,Ld=new WeakMap,Ud=new WeakMap,ug=new WeakMap;function fg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function hg(n){return n.__v_skip||!Object.isExtensible(n)?0:fg(Fm(n))}function Aa(n){return di(n)?n:ru(n,!1,ng,ag,Id)}function Nd(n){return ru(n,!1,sg,lg,Ld)}function Hl(n){return ru(n,!0,ig,cg,Ud)}function ru(n,t,e,i,s){if(!ue(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=hg(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function is(n){return di(n)?is(n.__v_raw):!!(n&&n.__v_isReactive)}function di(n){return!!(n&&n.__v_isReadonly)}function xn(n){return!!(n&&n.__v_isShallow)}function ou(n){return n?!!n.__v_raw:!1}function ae(n){const t=n&&n.__v_raw;return t?ae(t):n}function dg(n){return!le(n,"__v_skip")&&Object.isExtensible(n)&&_d(n,"__v_skip",!0),n}const Dn=n=>ue(n)?Aa(n):n,Ks=n=>ue(n)?Hl(n):n;function He(n){return n?n.__v_isRef===!0:!1}function Wt(n){return Od(n,!1)}function Zs(n){return Od(n,!0)}function Od(n,t){return He(n)?n:new pg(n,t)}class pg{constructor(t,e){this.dep=new iu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ae(t),this._value=e?t:Dn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||xn(t)||di(t);t=i?t:ae(t),zn(t,e)&&(this._rawValue=t,this._value=i?t:Dn(t),this.dep.trigger())}}function hn(n){return He(n)?n.value:n}const mg={get:(n,t,e)=>t==="__v_raw"?n:hn(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return He(s)&&!He(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Fd(n){return is(n)?n:new Proxy(n,mg)}class gg{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new iu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=kr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return Ed(this,!0),!0}get value(){const t=this.dep.track();return Ad(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function _g(n,t,e=!1){let i,s;return Yt(n)?i=n:(i=n.get,s=n.set),new gg(i,s,e)}const mo={},na=new WeakMap;let $i;function vg(n,t=!1,e=$i){if(e){let i=na.get(e);i||na.set(e,i=[]),i.push(n)}}function xg(n,t,e=he){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:xn(M)||s===!1||s===0?ri(M,1):ri(M);let u,f,h,d,g=!1,_=!1;if(He(n)?(f=()=>n.value,g=xn(n)):is(n)?(f=()=>c(n),g=!0):Xt(n)?(_=!0,g=n.some(M=>is(M)||xn(M)),f=()=>n.map(M=>{if(He(M))return M.value;if(is(M))return c(M);if(Yt(M))return l?l(M,2):M()})):Yt(n)?t?f=l?()=>l(n,2):n:f=()=>{if(h){fi();try{h()}finally{hi()}}const M=$i;$i=u;try{return l?l(n,3,[d]):n(d)}finally{$i=M}}:f=kn,t&&s){const M=f,N=s===!0?1/0:s;f=()=>ri(M(),N)}const m=Ym(),p=()=>{u.stop(),m&&m.active&&Kc(m.effects,u)};if(r&&t){const M=t;t=(...N)=>{M(...N),p()}}let b=_?new Array(n.length).fill(mo):mo;const w=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const N=u.run();if(s||g||(_?N.some((I,D)=>zn(I,b[D])):zn(N,b))){h&&h();const I=$i;$i=u;try{const D=[N,b===mo?void 0:_&&b[0]===mo?[]:b,d];b=N,l?l(t,3,D):t(...D)}finally{$i=I}}}else u.run()};return a&&a(w),u=new Md(f),u.scheduler=o?()=>o(w,!1):w,d=M=>vg(M,!1,u),h=u.onStop=()=>{const M=na.get(u);if(M){if(l)l(M,4);else for(const N of M)N();na.delete(u)}},t?i?w(!0):b=u.run():o?o(w.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function ri(n,t=1/0,e){if(t<=0||!ue(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,He(n))ri(n.value,t,e);else if(Xt(n))for(let i=0;i<n.length;i++)ri(n[i],t,e);else if(dd(n)||Vs(n))n.forEach(i=>{ri(i,t,e)});else if(gd(n)){for(const i in n)ri(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ri(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Jr(n,t,e,i){try{return i?n(...i):n()}catch(s){wa(s,t,e)}}function Vn(n,t,e,i){if(Yt(n)){const s=Jr(n,t,e,i);return s&&pd(s)&&s.catch(r=>{wa(r,t,e)}),s}if(Xt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Vn(n[r],t,e,i));return s}}function wa(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||he;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){fi(),Jr(r,null,10,[n,l,c]),hi();return}}yg(n,e,s,i,o)}function yg(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const Ye=[];let Nn=-1;const Gs=[];let Ai=null,Ls=0;const Bd=Promise.resolve();let ia=null;function rs(n){const t=ia||Bd;return n?t.then(this?n.bind(this):n):t}function Mg(n){let t=Nn+1,e=Ye.length;for(;t<e;){const i=t+e>>>1,s=Ye[i],r=Vr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function au(n){if(!(n.flags&1)){const t=Vr(n),e=Ye[Ye.length-1];!e||!(n.flags&2)&&t>=Vr(e)?Ye.push(n):Ye.splice(Mg(t),0,n),n.flags|=1,zd()}}function zd(){ia||(ia=Bd.then(Hd))}function Sg(n){Xt(n)?Gs.push(...n):Ai&&n.id===-1?Ai.splice(Ls+1,0,n):n.flags&1||(Gs.push(n),n.flags|=1),zd()}function Wu(n,t,e=Nn+1){for(;e<Ye.length;e++){const i=Ye[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Ye.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function kd(n){if(Gs.length){const t=[...new Set(Gs)].sort((e,i)=>Vr(e)-Vr(i));if(Gs.length=0,Ai){Ai.push(...t);return}for(Ai=t,Ls=0;Ls<Ai.length;Ls++){const e=Ai[Ls];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Ai=null,Ls=0}}const Vr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Hd(n){try{for(Nn=0;Nn<Ye.length;Nn++){const t=Ye[Nn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Jr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Nn<Ye.length;Nn++){const t=Ye[Nn];t&&(t.flags&=-2)}Nn=-1,Ye.length=0,kd(),ia=null,(Ye.length||Gs.length)&&Hd()}}let un=null,Vd=null;function sa(n){const t=un;return un=n,Vd=n&&n.type.__scopeId||null,t}function Eg(n,t=un,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&aa(-1);const r=sa(t);let o;try{o=n(...s)}finally{sa(r),i._d&&aa(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Gd(n,t){if(un===null)return n;const e=La(un),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=he]=t[s];r&&(Yt(r)&&(r={mounted:r,updated:r}),r.deep&&ri(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Hi(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(fi(),Vn(l,e,8,[n.el,a,n,t]),hi())}}function Xo(n,t){if(ze){let e=ze.provides;const i=ze.parent&&ze.parent.provides;i===e&&(e=ze.provides=Object.create(i)),e[n]=t}}function yn(n,t,e=!1){const i=A_();if(i||Ws){let s=Ws?Ws._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Yt(t)?t.call(i&&i.proxy):t}}const bg=Symbol.for("v-scx"),Tg=()=>yn(bg);function rn(n,t,e){return Wd(n,t,e)}function Wd(n,t,e=he){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ne({},e),l=t&&i||!t&&r!=="post";let c;if(Xr){if(r==="sync"){const d=Tg();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=kn,d.resume=kn,d.pause=kn,d}}const u=ze;a.call=(d,g,_)=>Vn(d,u,g,_);let f=!1;r==="post"?a.scheduler=d=>{je(d,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():au(d)}),a.augmentJob=d=>{t&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=xg(n,t,a);return Xr&&(c?c.push(h):l&&h()),h}function Ag(n,t,e){const i=this.proxy,s=xe(n)?n.includes(".")?Xd(i,n):()=>i[n]:n.bind(i,i);let r;Yt(t)?r=t:(r=t.handler,e=t);const o=Qr(this),a=Wd(s,r.bind(i),e);return o(),a}function Xd(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const Ti=new WeakMap,jd=Symbol("_vte"),wg=n=>n.__isTeleport,Zi=n=>n&&(n.disabled||n.disabled===""),Rg=n=>n&&(n.defer||n.defer===""),Xu=n=>typeof SVGElement<"u"&&n instanceof SVGElement,ju=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Vl=(n,t)=>{const e=n&&n.to;return xe(e)?t?t(e):null:e},Cg={name:"Teleport",__isTeleport:!0,process(n,t,e,i,s,r,o,a,l,c){const{mc:u,pc:f,pbc:h,o:{insert:d,querySelector:g,createText:_,createComment:m,parentNode:p}}=c,b=Zi(t.props);let{dynamicChildren:w}=t;const M=(D,L,T)=>{D.shapeFlag&16&&u(D.children,L,T,s,r,o,a,l)},N=(D=t)=>{const L=Zi(D.props),T=D.target=Vl(D.props,g),S=Gl(T,D,_,d);T&&(o!=="svg"&&Xu(T)?o="svg":o!=="mathml"&&ju(T)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(T),L||(M(D,T,S),Ar(D,!1)))},I=D=>{const L=()=>{if(Ti.get(D)===L){if(Ti.delete(D),Zi(D.props)){const T=p(D.el)||e;M(D,T,D.anchor),Ar(D,!0)}N(D)}};Ti.set(D,L),je(L,r)};if(n==null){const D=t.el=_(""),L=t.anchor=_("");if(d(D,e,i),d(L,e,i),Rg(t.props)||r&&r.pendingBranch){I(t);return}b&&(M(t,e,L),Ar(t,!0)),N()}else{t.el=n.el;const D=t.anchor=n.anchor,L=Ti.get(n);if(L){L.flags|=8,Ti.delete(n),I(t);return}t.targetStart=n.targetStart;const T=t.target=n.target,S=t.targetAnchor=n.targetAnchor,R=Zi(n.props),U=R?e:T,F=R?D:S;if(o==="svg"||Xu(T)?o="svg":(o==="mathml"||ju(T))&&(o="mathml"),w?(h(n.dynamicChildren,w,U,s,r,o,a),fu(n,t,!0)):l||f(n,t,U,F,s,r,o,a,!1),b)R?t.props&&n.props&&t.props.to!==n.props.to&&(t.props.to=n.props.to):go(t,e,D,c,1);else if((t.props&&t.props.to)!==(n.props&&n.props.to)){const O=t.target=Vl(t.props,g);O&&go(t,O,null,c,0)}else R&&go(t,T,S,c,1);Ar(t,b)}},remove(n,t,e,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:f,props:h}=n;let d=r||!Zi(h);const g=Ti.get(n);if(g&&(g.flags|=8,Ti.delete(n),d=!1),f&&(s(c),s(u)),r&&s(l),o&16)for(let _=0;_<a.length;_++){const m=a[_];i(m,t,e,d,!!m.dynamicChildren)}},move:go,hydrate:Pg};function go(n,t,e,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,t,e);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=r===2;if(f&&i(o,t,e),!Ti.has(n)&&(!f||Zi(u))&&l&16)for(let h=0;h<c.length;h++)s(c[h],t,e,2);f&&i(a,t,e)}function Pg(n,t,e,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},f){function h(m,p){let b=p;for(;b;){if(b&&b.nodeType===8){if(b.data==="teleport start anchor")t.targetStart=b;else if(b.data==="teleport anchor"){t.targetAnchor=b,m._lpa=t.targetAnchor&&o(t.targetAnchor);break}}b=o(b)}}function d(m,p){p.anchor=f(o(m),p,a(m),e,i,s,r)}const g=t.target=Vl(t.props,l),_=Zi(t.props);if(g){const m=g._lpa||g.firstChild;t.shapeFlag&16&&(_?(d(n,t),h(g,m),t.targetAnchor||Gl(g,t,u,c,a(n)===g?n:null)):(t.anchor=o(n),h(g,m),t.targetAnchor||Gl(g,t,u,c),f(m&&o(m),t,g,e,i,s,r))),Ar(t,_)}else _&&t.shapeFlag&16&&(d(n,t),t.targetStart=n,t.targetAnchor=o(n));return t.anchor&&o(t.anchor)}const Gr=Cg;function Ar(n,t){const e=n.ctx;if(e&&e.ut){let i,s;for(t?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",e.uid),i=i.nextSibling;e.ut()}}function Gl(n,t,e,i,s=null){const r=t.targetStart=e(""),o=t.targetAnchor=e("");return r[jd]=o,n&&(i(r,n,s),i(o,n,s)),o}const Dg=Symbol("_leaveCb");function lu(n,t){n.shapeFlag&6&&n.component?(n.transition=t,lu(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function pi(n,t){return Yt(n)?Ne({name:n.name},t,{setup:n}):n}function qd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function qu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const ra=new WeakMap;function Ur(n,t,e,i,s=!1){if(Xt(n)){n.forEach((_,m)=>Ur(_,t&&(Xt(t)?t[m]:t),e,i,s));return}if(Nr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Ur(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?La(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===he?a.refs={}:a.refs,f=a.setupState,h=ae(f),d=f===he?hd:_=>qu(u,_)?!1:le(h,_),g=(_,m)=>!(m&&qu(u,m));if(c!=null&&c!==l){if(Yu(t),xe(c))u[c]=null,d(c)&&(f[c]=null);else if(He(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(Yt(l))Jr(l,a,12,[o,u]);else{const _=xe(l),m=He(l);if(_||m){const p=()=>{if(n.f){const b=_?d(l)?f[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Xt(b)&&Kc(b,r);else if(Xt(b))b.includes(r)||b.push(r);else if(_)u[l]=[r],d(l)&&(f[l]=u[l]);else{const w=[r];g(l,n.k)&&(l.value=w),n.k&&(u[n.k]=w)}}else _?(u[l]=o,d(l)&&(f[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const b=()=>{p(),ra.delete(n)};b.id=-1,ra.set(n,b),je(b,e)}else Yu(n),p()}}}function Yu(n){const t=ra.get(n);t&&(t.flags|=8,ra.delete(n))}Ea().requestIdleCallback;Ea().cancelIdleCallback;const Nr=n=>!!n.type.__asyncLoader,Yd=n=>n.type.__isKeepAlive;function Ig(n,t){$d(n,"a",t)}function Lg(n,t){$d(n,"da",t)}function $d(n,t,e=ze){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ra(t,i,e),e){let s=e.parent;for(;s&&s.parent;)Yd(s.parent.vnode)&&Ug(i,t,e,s),s=s.parent}}function Ug(n,t,e,i){const s=Ra(t,n,i,!0);Kd(()=>{Kc(i[t],s)},e)}function Ra(n,t,e=ze,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{fi();const a=Qr(e),l=Vn(t,e,n,o);return a(),hi(),l});return i?s.unshift(r):s.push(r),r}}const mi=n=>(t,e=ze)=>{(!Xr||n==="sp")&&Ra(n,(...i)=>t(...i),e)},Ng=mi("bm"),Ca=mi("m"),Og=mi("bu"),Fg=mi("u"),Pa=mi("bum"),Kd=mi("um"),Bg=mi("sp"),zg=mi("rtg"),kg=mi("rtc");function Hg(n,t=ze){Ra("ec",n,t)}const Vg="components";function Gg(n,t){return Xg(Vg,n,!0,t)||n}const Wg=Symbol.for("v-ndc");function Xg(n,t,e=!0,i=!1){const s=un||ze;if(s){const r=s.type;{const a=D_(r,!1);if(a&&(a===t||a===Ze(t)||a===Sa(Ze(t))))return r}const o=$u(s[n]||r[n],t)||$u(s.appContext[n],t);return!o&&i?r:o}}function $u(n,t){return n&&(n[t]||n[Ze(t)]||n[Sa(Ze(t))])}function Ni(n,t,e,i){let s;const r=e,o=Xt(n);if(o||xe(n)){const a=o&&is(n);let l=!1,c=!1;a&&(l=!xn(n),c=di(n),n=Ta(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=t(l?c?Ks(Dn(n[u])):Dn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ue(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Wl=n=>n?mp(n)?La(n):Wl(n.parent):null,Or=Ne(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Wl(n.parent),$root:n=>Wl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Jd(n),$forceUpdate:n=>n.f||(n.f=()=>{au(n.update)}),$nextTick:n=>n.n||(n.n=rs.bind(n.proxy)),$watch:n=>Ag.bind(n)}),qa=(n,t)=>n!==he&&!n.__isScriptSetup&&le(n,t),jg={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(qa(i,t))return o[t]=1,i[t];if(s!==he&&le(s,t))return o[t]=2,s[t];if(le(r,t))return o[t]=3,r[t];if(e!==he&&le(e,t))return o[t]=4,e[t];Xl&&(o[t]=0)}}const c=Or[t];let u,f;if(c)return t==="$attrs"&&Be(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==he&&le(e,t))return o[t]=4,e[t];if(f=l.config.globalProperties,le(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return qa(s,t)?(s[t]=e,!0):i!==he&&le(i,t)?(i[t]=e,!0):le(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==he&&a[0]!=="$"&&le(n,a)||qa(t,a)||le(r,a)||le(i,a)||le(Or,a)||le(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:le(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Ku(n){return Xt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Xl=!0;function qg(n){const t=Jd(n),e=n.proxy,i=n.ctx;Xl=!1,t.beforeCreate&&Zu(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:b,destroyed:w,unmounted:M,render:N,renderTracked:I,renderTriggered:D,errorCaptured:L,serverPrefetch:T,expose:S,inheritAttrs:R,components:U,directives:F,filters:O}=t;if(c&&Yg(c,i,null),o)for(const et in o){const Y=o[et];Yt(Y)&&(i[et]=Y.bind(e))}if(s){const et=s.call(e,e);ue(et)&&(n.data=Aa(et))}if(Xl=!0,r)for(const et in r){const Y=r[et],mt=Yt(Y)?Y.bind(e,e):Yt(Y.get)?Y.get.bind(e,e):kn,Mt=!Yt(Y)&&Yt(Y.set)?Y.set.bind(e):kn,Ct=Jt({get:mt,set:Mt});Object.defineProperty(i,et,{enumerable:!0,configurable:!0,get:()=>Ct.value,set:Ft=>Ct.value=Ft})}if(a)for(const et in a)Zd(a[et],i,e,et);if(l){const et=Yt(l)?l.call(e):l;Reflect.ownKeys(et).forEach(Y=>{Xo(Y,et[Y])})}u&&Zu(u,n,"c");function K(et,Y){Xt(Y)?Y.forEach(mt=>et(mt.bind(e))):Y&&et(Y.bind(e))}if(K(Ng,f),K(Ca,h),K(Og,d),K(Fg,g),K(Ig,_),K(Lg,m),K(Hg,L),K(kg,I),K(zg,D),K(Pa,b),K(Kd,M),K(Bg,T),Xt(S))if(S.length){const et=n.exposed||(n.exposed={});S.forEach(Y=>{Object.defineProperty(et,Y,{get:()=>e[Y],set:mt=>e[Y]=mt,enumerable:!0})})}else n.exposed||(n.exposed={});N&&n.render===kn&&(n.render=N),R!=null&&(n.inheritAttrs=R),U&&(n.components=U),F&&(n.directives=F),T&&qd(n)}function Yg(n,t,e=kn){Xt(n)&&(n=jl(n));for(const i in n){const s=n[i];let r;ue(s)?"default"in s?r=yn(s.from||i,s.default,!0):r=yn(s.from||i):r=yn(s),He(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function Zu(n,t,e){Vn(Xt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Zd(n,t,e,i){let s=i.includes(".")?Xd(e,i):()=>e[i];if(xe(n)){const r=t[n];Yt(r)&&rn(s,r)}else if(Yt(n))rn(s,n.bind(e));else if(ue(n))if(Xt(n))n.forEach(r=>Zd(r,t,e,i));else{const r=Yt(n.handler)?n.handler.bind(e):t[n.handler];Yt(r)&&rn(s,r,n)}}function Jd(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>oa(l,c,o,!0)),oa(l,t,o)),ue(t)&&r.set(t,l),l}function oa(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&oa(n,r,e,!0),s&&s.forEach(o=>oa(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=$g[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const $g={data:Ju,props:Qu,emits:Qu,methods:wr,computed:wr,beforeCreate:We,created:We,beforeMount:We,mounted:We,beforeUpdate:We,updated:We,beforeDestroy:We,beforeUnmount:We,destroyed:We,unmounted:We,activated:We,deactivated:We,errorCaptured:We,serverPrefetch:We,components:wr,directives:wr,watch:Zg,provide:Ju,inject:Kg};function Ju(n,t){return t?n?function(){return Ne(Yt(n)?n.call(this,this):n,Yt(t)?t.call(this,this):t)}:t:n}function Kg(n,t){return wr(jl(n),jl(t))}function jl(n){if(Xt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function We(n,t){return n?[...new Set([].concat(n,t))]:t}function wr(n,t){return n?Ne(Object.create(null),n,t):t}function Qu(n,t){return n?Xt(n)&&Xt(t)?[...new Set([...n,...t])]:Ne(Object.create(null),Ku(n),Ku(t??{})):t}function Zg(n,t){if(!n)return t;if(!t)return n;const e=Ne(Object.create(null),n);for(const i in t)e[i]=We(n[i],t[i]);return e}function Qd(){return{app:null,config:{isNativeTag:hd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Jg=0;function Qg(n,t){return function(i,s=null){Yt(i)||(i=Ne({},i)),s!=null&&!ue(s)&&(s=null);const r=Qd(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Jg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:L_,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&Yt(u.install)?(o.add(u),u.install(c,...f)):Yt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||Ke(i,s);return d.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,La(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Vn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=Ws;Ws=c;try{return u()}finally{Ws=f}}};return c}}let Ws=null;const t_=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Ze(t)}Modifiers`]||n[`${zi(t)}Modifiers`];function e_(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||he;let s=e;const r=t.startsWith("update:"),o=r&&t_(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>xe(u)?u.trim():u)),o.number&&(s=e.map(Jc)));let a,l=i[a=Va(t)]||i[a=Va(Ze(t))];!l&&r&&(l=i[a=Va(zi(t))]),l&&Vn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Vn(c,n,6,s)}}const n_=new WeakMap;function tp(n,t,e=!1){const i=e?n_:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Yt(n)){const l=c=>{const u=tp(c,t,!0);u&&(a=!0,Ne(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ue(n)&&i.set(n,null),null):(Xt(r)?r.forEach(l=>o[l]=null):Ne(o,r),ue(n)&&i.set(n,o),o)}function Da(n,t){return!n||!xa(t)?!1:(t=t.slice(2).replace(/Once$/,""),le(n,t[0].toLowerCase()+t.slice(1))||le(n,zi(t))||le(n,t))}function tf(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=n,m=sa(n);let p,b;try{if(e.shapeFlag&4){const M=s||i,N=M;p=Fn(c.call(N,M,u,f,d,h,g)),b=a}else{const M=t;p=Fn(M.length>1?M(f,{attrs:a,slots:o,emit:l}):M(f,null)),b=t.props?a:i_(a)}}catch(M){Fr.length=0,wa(M,n,1),p=Ke(Oi)}let w=p;if(b&&_!==!1){const M=Object.keys(b),{shapeFlag:N}=w;M.length&&N&7&&(r&&M.some(ya)&&(b=s_(b,r)),w=Js(w,b,!1,!0))}return e.dirs&&(w=Js(w,null,!1,!0),w.dirs=w.dirs?w.dirs.concat(e.dirs):e.dirs),e.transition&&lu(w,e.transition),p=w,sa(m),p}const i_=n=>{let t;for(const e in n)(e==="class"||e==="style"||xa(e))&&((t||(t={}))[e]=n[e]);return t},s_=(n,t)=>{const e={};for(const i in n)(!ya(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function r_(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?ef(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(ep(o,i,h)&&!Da(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?ef(i,o,c):!0:!!o;return!1}function ef(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(ep(t,n,r)&&!Da(e,r))return!0}return!1}function ep(n,t,e){const i=n[e],s=t[e];return e==="style"&&ue(i)&&ue(s)?!Qc(i,s):i!==s}function o_({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const np={},ip=()=>Object.create(np),sp=n=>Object.getPrototypeOf(n)===np;function a_(n,t,e,i=!1){const s={},r=ip();n.propsDefaults=Object.create(null),rp(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Nd(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function l_(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ae(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Da(n.emitsOptions,h))continue;const d=t[h];if(l)if(le(r,h))d!==r[h]&&(r[h]=d,c=!0);else{const g=Ze(h);s[g]=ql(l,a,g,d,n,!1)}else d!==r[h]&&(r[h]=d,c=!0)}}}else{rp(n,t,s,r)&&(c=!0);let u;for(const f in a)(!t||!le(t,f)&&((u=zi(f))===f||!le(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(s[f]=ql(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!t||!le(t,f))&&(delete r[f],c=!0)}c&&si(n.attrs,"set","")}function rp(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(Dr(l))continue;const c=t[l];let u;s&&le(s,u=Ze(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Da(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ae(e),c=a||he;for(let u=0;u<r.length;u++){const f=r[u];e[f]=ql(s,l,f,c[f],n,!le(c,f))}}return o}function ql(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=le(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Yt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Qr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===zi(e))&&(i=!0))}return i}const c_=new WeakMap;function op(n,t,e=!1){const i=e?c_:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Yt(n)){const u=f=>{l=!0;const[h,d]=op(f,t,!0);Ne(o,h),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ue(n)&&i.set(n,Hs),Hs;if(Xt(r))for(let u=0;u<r.length;u++){const f=Ze(r[u]);nf(f)&&(o[f]=he)}else if(r)for(const u in r){const f=Ze(u);if(nf(f)){const h=r[u],d=o[f]=Xt(h)||Yt(h)?{type:h}:Ne({},h),g=d.type;let _=!1,m=!0;if(Xt(g))for(let p=0;p<g.length;++p){const b=g[p],w=Yt(b)&&b.name;if(w==="Boolean"){_=!0;break}else w==="String"&&(m=!1)}else _=Yt(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||le(d,"default"))&&a.push(f)}}const c=[o,a];return ue(n)&&i.set(n,c),c}function nf(n){return n[0]!=="$"&&!Dr(n)}const cu=n=>n==="_"||n==="_ctx"||n==="$stable",uu=n=>Xt(n)?n.map(Fn):[Fn(n)],u_=(n,t,e)=>{if(t._n)return t;const i=Eg((...s)=>uu(t(...s)),e);return i._c=!1,i},ap=(n,t,e)=>{const i=n._ctx;for(const s in n){if(cu(s))continue;const r=n[s];if(Yt(r))t[s]=u_(s,r,i);else if(r!=null){const o=uu(r);t[s]=()=>o}}},lp=(n,t)=>{const e=uu(t);n.slots.default=()=>e},cp=(n,t,e)=>{for(const i in t)(e||!cu(i))&&(n[i]=t[i])},f_=(n,t,e)=>{const i=n.slots=ip();if(n.vnode.shapeFlag&32){const s=t._;s?(cp(i,t,e),e&&_d(i,"_",s,!0)):ap(t,i)}else t&&lp(n,t)},h_=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=he;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:cp(s,t,e):(r=!t.$stable,ap(t,s)),o=t}else t&&(lp(n,t),o={default:1});if(r)for(const a in s)!cu(a)&&o[a]==null&&delete s[a]},je=__;function d_(n){return p_(n)}function p_(n,t){const e=Ea();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=kn,insertStaticContent:g}=n,_=(E,P,y,Q=null,tt=null,J=null,ot=void 0,X=null,k=!!P.dynamicChildren)=>{if(E===P)return;E&&!mr(E,P)&&(Q=z(E),Ft(E,tt,J,!0),E=null),P.patchFlag===-2&&(k=!1,P.dynamicChildren=null);const{type:x,ref:v,shapeFlag:C}=P;switch(x){case Ia:m(E,P,y,Q);break;case Oi:p(E,P,y,Q);break;case jo:E==null&&b(P,y,Q,ot);break;case Re:U(E,P,y,Q,tt,J,ot,X,k);break;default:C&1?N(E,P,y,Q,tt,J,ot,X,k):C&6?F(E,P,y,Q,tt,J,ot,X,k):(C&64||C&128)&&x.process(E,P,y,Q,tt,J,ot,X,k,gt)}v!=null&&tt?Ur(v,E&&E.ref,J,P||E,!P):v==null&&E&&E.ref!=null&&Ur(E.ref,null,J,E,!0)},m=(E,P,y,Q)=>{if(E==null)i(P.el=a(P.children),y,Q);else{const tt=P.el=E.el;P.children!==E.children&&c(tt,P.children)}},p=(E,P,y,Q)=>{E==null?i(P.el=l(P.children||""),y,Q):P.el=E.el},b=(E,P,y,Q)=>{[E.el,E.anchor]=g(E.children,P,y,Q,E.el,E.anchor)},w=({el:E,anchor:P},y,Q)=>{let tt;for(;E&&E!==P;)tt=h(E),i(E,y,Q),E=tt;i(P,y,Q)},M=({el:E,anchor:P})=>{let y;for(;E&&E!==P;)y=h(E),s(E),E=y;s(P)},N=(E,P,y,Q,tt,J,ot,X,k)=>{if(P.type==="svg"?ot="svg":P.type==="math"&&(ot="mathml"),E==null)I(P,y,Q,tt,J,ot,X,k);else{const x=E.el&&E.el._isVueCE?E.el:null;try{x&&x._beginPatch(),T(E,P,tt,J,ot,X,k)}finally{x&&x._endPatch()}}},I=(E,P,y,Q,tt,J,ot,X)=>{let k,x;const{props:v,shapeFlag:C,transition:B,dirs:V}=E;if(k=E.el=o(E.type,J,v&&v.is,v),C&8?u(k,E.children):C&16&&L(E.children,k,null,Q,tt,Ya(E,J),ot,X),V&&Hi(E,null,Q,"created"),D(k,E,E.scopeId,ot,Q),v){for(const vt in v)vt!=="value"&&!Dr(vt)&&r(k,vt,null,v[vt],J,Q);"value"in v&&r(k,"value",null,v.value,J),(x=v.onVnodeBeforeMount)&&Un(x,Q,E)}V&&Hi(E,null,Q,"beforeMount");const W=m_(tt,B);W&&B.beforeEnter(k),i(k,P,y),((x=v&&v.onVnodeMounted)||W||V)&&je(()=>{try{x&&Un(x,Q,E),W&&B.enter(k),V&&Hi(E,null,Q,"mounted")}finally{}},tt)},D=(E,P,y,Q,tt)=>{if(y&&d(E,y),Q)for(let J=0;J<Q.length;J++)d(E,Q[J]);if(tt){let J=tt.subTree;if(P===J||hp(J.type)&&(J.ssContent===P||J.ssFallback===P)){const ot=tt.vnode;D(E,ot,ot.scopeId,ot.slotScopeIds,tt.parent)}}},L=(E,P,y,Q,tt,J,ot,X,k=0)=>{for(let x=k;x<E.length;x++){const v=E[x]=X?ii(E[x]):Fn(E[x]);_(null,v,P,y,Q,tt,J,ot,X)}},T=(E,P,y,Q,tt,J,ot)=>{const X=P.el=E.el;let{patchFlag:k,dynamicChildren:x,dirs:v}=P;k|=E.patchFlag&16;const C=E.props||he,B=P.props||he;let V;if(y&&Vi(y,!1),(V=B.onVnodeBeforeUpdate)&&Un(V,y,P,E),v&&Hi(P,E,y,"beforeUpdate"),y&&Vi(y,!0),(C.innerHTML&&B.innerHTML==null||C.textContent&&B.textContent==null)&&u(X,""),x?S(E.dynamicChildren,x,X,y,Q,Ya(P,tt),J):ot||Y(E,P,X,null,y,Q,Ya(P,tt),J,!1),k>0){if(k&16)R(X,C,B,y,tt);else if(k&2&&C.class!==B.class&&r(X,"class",null,B.class,tt),k&4&&r(X,"style",C.style,B.style,tt),k&8){const W=P.dynamicProps;for(let vt=0;vt<W.length;vt++){const ct=W[vt],dt=C[ct],Pt=B[ct];(Pt!==dt||ct==="value")&&r(X,ct,dt,Pt,tt,y)}}k&1&&E.children!==P.children&&u(X,P.children)}else!ot&&x==null&&R(X,C,B,y,tt);((V=B.onVnodeUpdated)||v)&&je(()=>{V&&Un(V,y,P,E),v&&Hi(P,E,y,"updated")},Q)},S=(E,P,y,Q,tt,J,ot)=>{for(let X=0;X<P.length;X++){const k=E[X],x=P[X],v=k.el&&(k.type===Re||!mr(k,x)||k.shapeFlag&198)?f(k.el):y;_(k,x,v,null,Q,tt,J,ot,!0)}},R=(E,P,y,Q,tt)=>{if(P!==y){if(P!==he)for(const J in P)!Dr(J)&&!(J in y)&&r(E,J,P[J],null,tt,Q);for(const J in y){if(Dr(J))continue;const ot=y[J],X=P[J];ot!==X&&J!=="value"&&r(E,J,X,ot,tt,Q)}"value"in y&&r(E,"value",P.value,y.value,tt)}},U=(E,P,y,Q,tt,J,ot,X,k)=>{const x=P.el=E?E.el:a(""),v=P.anchor=E?E.anchor:a("");let{patchFlag:C,dynamicChildren:B,slotScopeIds:V}=P;V&&(X=X?X.concat(V):V),E==null?(i(x,y,Q),i(v,y,Q),L(P.children||[],y,v,tt,J,ot,X,k)):C>0&&C&64&&B&&E.dynamicChildren&&E.dynamicChildren.length===B.length?(S(E.dynamicChildren,B,y,tt,J,ot,X),(P.key!=null||tt&&P===tt.subTree)&&fu(E,P,!0)):Y(E,P,y,v,tt,J,ot,X,k)},F=(E,P,y,Q,tt,J,ot,X,k)=>{P.slotScopeIds=X,E==null?P.shapeFlag&512?tt.ctx.activate(P,y,Q,ot,k):O(P,y,Q,tt,J,ot,k):G(E,P,k)},O=(E,P,y,Q,tt,J,ot)=>{const X=E.component=T_(E,Q,tt);if(Yd(E)&&(X.ctx.renderer=gt),w_(X,!1,ot),X.asyncDep){if(tt&&tt.registerDep(X,K,ot),!E.el){const k=X.subTree=Ke(Oi);p(null,k,P,y),E.placeholder=k.el}}else K(X,E,P,y,tt,J,ot)},G=(E,P,y)=>{const Q=P.component=E.component;if(r_(E,P,y))if(Q.asyncDep&&!Q.asyncResolved){et(Q,P,y);return}else Q.next=P,Q.update();else P.el=E.el,Q.vnode=P},K=(E,P,y,Q,tt,J,ot)=>{const X=()=>{if(E.isMounted){let{next:C,bu:B,u:V,parent:W,vnode:vt}=E;{const pt=up(E);if(pt){C&&(C.el=vt.el,et(E,C,ot)),pt.asyncDep.then(()=>{je(()=>{E.isUnmounted||x()},tt)});return}}let ct=C,dt;Vi(E,!1),C?(C.el=vt.el,et(E,C,ot)):C=vt,B&&Wo(B),(dt=C.props&&C.props.onVnodeBeforeUpdate)&&Un(dt,W,C,vt),Vi(E,!0);const Pt=tf(E),st=E.subTree;E.subTree=Pt,_(st,Pt,f(st.el),z(st),E,tt,J),C.el=Pt.el,ct===null&&o_(E,Pt.el),V&&je(V,tt),(dt=C.props&&C.props.onVnodeUpdated)&&je(()=>Un(dt,W,C,vt),tt)}else{let C;const{el:B,props:V}=P,{bm:W,m:vt,parent:ct,root:dt,type:Pt}=E,st=Nr(P);Vi(E,!1),W&&Wo(W),!st&&(C=V&&V.onVnodeBeforeMount)&&Un(C,ct,P),Vi(E,!0);{dt.ce&&dt.ce._hasShadowRoot()&&dt.ce._injectChildStyle(Pt,E.parent?E.parent.type:void 0);const pt=E.subTree=tf(E);_(null,pt,y,Q,E,tt,J),P.el=pt.el}if(vt&&je(vt,tt),!st&&(C=V&&V.onVnodeMounted)){const pt=P;je(()=>Un(C,ct,pt),tt)}(P.shapeFlag&256||ct&&Nr(ct.vnode)&&ct.vnode.shapeFlag&256)&&E.a&&je(E.a,tt),E.isMounted=!0,P=y=Q=null}};E.scope.on();const k=E.effect=new Md(X);E.scope.off();const x=E.update=k.run.bind(k),v=E.job=k.runIfDirty.bind(k);v.i=E,v.id=E.uid,k.scheduler=()=>au(v),Vi(E,!0),x()},et=(E,P,y)=>{P.component=E;const Q=E.vnode.props;E.vnode=P,E.next=null,l_(E,P.props,Q,y),h_(E,P.children,y),fi(),Wu(E),hi()},Y=(E,P,y,Q,tt,J,ot,X,k=!1)=>{const x=E&&E.children,v=E?E.shapeFlag:0,C=P.children,{patchFlag:B,shapeFlag:V}=P;if(B>0){if(B&128){Mt(x,C,y,Q,tt,J,ot,X,k);return}else if(B&256){mt(x,C,y,Q,tt,J,ot,X,k);return}}V&8?(v&16&&Tt(x,tt,J),C!==x&&u(y,C)):v&16?V&16?Mt(x,C,y,Q,tt,J,ot,X,k):Tt(x,tt,J,!0):(v&8&&u(y,""),V&16&&L(C,y,Q,tt,J,ot,X,k))},mt=(E,P,y,Q,tt,J,ot,X,k)=>{E=E||Hs,P=P||Hs;const x=E.length,v=P.length,C=Math.min(x,v);let B;for(B=0;B<C;B++){const V=P[B]=k?ii(P[B]):Fn(P[B]);_(E[B],V,y,null,tt,J,ot,X,k)}x>v?Tt(E,tt,J,!0,!1,C):L(P,y,Q,tt,J,ot,X,k,C)},Mt=(E,P,y,Q,tt,J,ot,X,k)=>{let x=0;const v=P.length;let C=E.length-1,B=v-1;for(;x<=C&&x<=B;){const V=E[x],W=P[x]=k?ii(P[x]):Fn(P[x]);if(mr(V,W))_(V,W,y,null,tt,J,ot,X,k);else break;x++}for(;x<=C&&x<=B;){const V=E[C],W=P[B]=k?ii(P[B]):Fn(P[B]);if(mr(V,W))_(V,W,y,null,tt,J,ot,X,k);else break;C--,B--}if(x>C){if(x<=B){const V=B+1,W=V<v?P[V].el:Q;for(;x<=B;)_(null,P[x]=k?ii(P[x]):Fn(P[x]),y,W,tt,J,ot,X,k),x++}}else if(x>B)for(;x<=C;)Ft(E[x],tt,J,!0),x++;else{const V=x,W=x,vt=new Map;for(x=W;x<=B;x++){const yt=P[x]=k?ii(P[x]):Fn(P[x]);yt.key!=null&&vt.set(yt.key,x)}let ct,dt=0;const Pt=B-W+1;let st=!1,pt=0;const Et=new Array(Pt);for(x=0;x<Pt;x++)Et[x]=0;for(x=V;x<=C;x++){const yt=E[x];if(dt>=Pt){Ft(yt,tt,J,!0);continue}let kt;if(yt.key!=null)kt=vt.get(yt.key);else for(ct=W;ct<=B;ct++)if(Et[ct-W]===0&&mr(yt,P[ct])){kt=ct;break}kt===void 0?Ft(yt,tt,J,!0):(Et[kt-W]=x+1,kt>=pt?pt=kt:st=!0,_(yt,P[kt],y,null,tt,J,ot,X,k),dt++)}const Ht=st?g_(Et):Hs;for(ct=Ht.length-1,x=Pt-1;x>=0;x--){const yt=W+x,kt=P[yt],Vt=P[yt+1],te=yt+1<v?Vt.el||fp(Vt):Q;Et[x]===0?_(null,kt,y,te,tt,J,ot,X,k):st&&(ct<0||x!==Ht[ct]?Ct(kt,y,te,2):ct--)}}},Ct=(E,P,y,Q,tt=null)=>{const{el:J,type:ot,transition:X,children:k,shapeFlag:x}=E;if(x&6){Ct(E.component.subTree,P,y,Q);return}if(x&128){E.suspense.move(P,y,Q);return}if(x&64){ot.move(E,P,y,gt);return}if(ot===Re){i(J,P,y);for(let C=0;C<k.length;C++)Ct(k[C],P,y,Q);i(E.anchor,P,y);return}if(ot===jo){w(E,P,y);return}if(Q!==2&&x&1&&X)if(Q===0)X.beforeEnter(J),i(J,P,y),je(()=>X.enter(J),tt);else{const{leave:C,delayLeave:B,afterLeave:V}=X,W=()=>{E.ctx.isUnmounted?s(J):i(J,P,y)},vt=()=>{J._isLeaving&&J[Dg](!0),C(J,()=>{W(),V&&V()})};B?B(J,W,vt):vt()}else i(J,P,y)},Ft=(E,P,y,Q=!1,tt=!1)=>{const{type:J,props:ot,ref:X,children:k,dynamicChildren:x,shapeFlag:v,patchFlag:C,dirs:B,cacheIndex:V,memo:W}=E;if(C===-2&&(tt=!1),X!=null&&(fi(),Ur(X,null,y,E,!0),hi()),V!=null&&(P.renderCache[V]=void 0),v&256){P.ctx.deactivate(E);return}const vt=v&1&&B,ct=!Nr(E);let dt;if(ct&&(dt=ot&&ot.onVnodeBeforeUnmount)&&Un(dt,P,E),v&6)_t(E.component,y,Q);else{if(v&128){E.suspense.unmount(y,Q);return}vt&&Hi(E,null,P,"beforeUnmount"),v&64?E.type.remove(E,P,y,gt,Q):x&&!x.hasOnce&&(J!==Re||C>0&&C&64)?Tt(x,P,y,!1,!0):(J===Re&&C&384||!tt&&v&16)&&Tt(k,P,y),Q&&Qt(E)}const Pt=W!=null&&V==null;(ct&&(dt=ot&&ot.onVnodeUnmounted)||vt||Pt)&&je(()=>{dt&&Un(dt,P,E),vt&&Hi(E,null,P,"unmounted"),Pt&&(E.el=null)},y)},Qt=E=>{const{type:P,el:y,anchor:Q,transition:tt}=E;if(P===Re){at(y,Q);return}if(P===jo){M(E);return}const J=()=>{s(y),tt&&!tt.persisted&&tt.afterLeave&&tt.afterLeave()};if(E.shapeFlag&1&&tt&&!tt.persisted){const{leave:ot,delayLeave:X}=tt,k=()=>ot(y,J);X?X(E.el,J,k):k()}else J()},at=(E,P)=>{let y;for(;E!==P;)y=h(E),s(E),E=y;s(P)},_t=(E,P,y)=>{const{bum:Q,scope:tt,job:J,subTree:ot,um:X,m:k,a:x}=E;sf(k),sf(x),Q&&Wo(Q),tt.stop(),J&&(J.flags|=8,Ft(ot,E,P,y)),X&&je(X,P),je(()=>{E.isUnmounted=!0},P)},Tt=(E,P,y,Q=!1,tt=!1,J=0)=>{for(let ot=J;ot<E.length;ot++)Ft(E[ot],P,y,Q,tt)},z=E=>{if(E.shapeFlag&6)return z(E.component.subTree);if(E.shapeFlag&128)return E.suspense.next();const P=h(E.anchor||E.el),y=P&&P[jd];return y?h(y):P};let ut=!1;const lt=(E,P,y)=>{let Q;E==null?P._vnode&&(Ft(P._vnode,null,null,!0),Q=P._vnode.component):_(P._vnode||null,E,P,null,null,null,y),P._vnode=E,ut||(ut=!0,Wu(Q),kd(),ut=!1)},gt={p:_,um:Ft,m:Ct,r:Qt,mt:O,mc:L,pc:Y,pbc:S,n:z,o:n};return{render:lt,hydrate:void 0,createApp:Qg(lt)}}function Ya({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Vi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function m_(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function fu(n,t,e=!1){const i=n.children,s=t.children;if(Xt(i)&&Xt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ii(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&fu(o,a)),a.type===Ia&&(a.patchFlag===-1&&(a=s[r]=ii(a)),a.el=o.el),a.type===Oi&&!a.el&&(a.el=o.el)}}function g_(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function up(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:up(t)}function sf(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function fp(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?fp(t.subTree):null}const hp=n=>n.__isSuspense;function __(n,t){t&&t.pendingBranch?Xt(n)?t.effects.push(...n):t.effects.push(n):Sg(n)}const Re=Symbol.for("v-fgt"),Ia=Symbol.for("v-txt"),Oi=Symbol.for("v-cmt"),jo=Symbol.for("v-stc"),Fr=[];let fn=null;function Dt(n=!1){Fr.push(fn=n?null:[])}function v_(){Fr.pop(),fn=Fr[Fr.length-1]||null}let Wr=1;function aa(n,t=!1){Wr+=n,n<0&&fn&&t&&(fn.hasOnce=!0)}function dp(n){return n.dynamicChildren=Wr>0?fn||Hs:null,v_(),Wr>0&&fn&&fn.push(n),n}function Ot(n,t,e,i,s,r){return dp(Z(n,t,e,i,s,r,!0))}function os(n,t,e,i,s){return dp(Ke(n,t,e,i,s,!0))}function la(n){return n?n.__v_isVNode===!0:!1}function mr(n,t){return n.type===t.type&&n.key===t.key}const pp=({key:n})=>n??null,qo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?xe(n)||He(n)||Yt(n)?{i:un,r:n,k:t,f:!!e}:n:null);function Z(n,t=null,e=null,i=0,s=null,r=n===Re?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&pp(t),ref:t&&qo(t),scopeId:Vd,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:un};return a?(hu(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=xe(e)?8:16),Wr>0&&!o&&fn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&fn.push(l),l}const Ke=x_;function x_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Wg)&&(n=Oi),la(n)){const a=Js(n,t,!0);return e&&hu(a,e),Wr>0&&!r&&fn&&(a.shapeFlag&6?fn[fn.indexOf(n)]=a:fn.push(a)),a.patchFlag=-2,a}if(I_(n)&&(n=n.__vccOpts),t){t=y_(t);let{class:a,style:l}=t;a&&!xe(a)&&(t.class=Ui(a)),ue(l)&&(ou(l)&&!Xt(l)&&(l=Ne({},l)),t.style=ba(l))}const o=xe(n)?1:hp(n)?128:wg(n)?64:ue(n)?4:Yt(n)?2:0;return Z(n,t,e,i,s,o,r,!0)}function y_(n){return n?ou(n)||sp(n)?Ne({},n):n:null}function Js(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?S_(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&pp(c),ref:t&&t.ref?e&&r?Xt(r)?r.concat(qo(t)):[r,qo(t)]:qo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Re?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Js(n.ssContent),ssFallback:n.ssFallback&&Js(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&lu(u,l.clone(u)),u}function Yl(n=" ",t=0){return Ke(Ia,null,n,t)}function M_(n,t){const e=Ke(jo,null,n);return e.staticCount=t,e}function Le(n="",t=!1){return t?(Dt(),os(Oi,null,n)):Ke(Oi,null,n)}function Fn(n){return n==null||typeof n=="boolean"?Ke(Oi):Xt(n)?Ke(Re,null,n.slice()):la(n)?ii(n):Ke(Ia,null,String(n))}function ii(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Js(n)}function hu(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Xt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),hu(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!sp(t)?t._ctx=un:s===3&&un&&(un.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Yt(t)?(t={default:t,_ctx:un},e=32):(t=String(t),i&64?(e=16,t=[Yl(t)]):e=8);n.children=t,n.shapeFlag|=e}function S_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Ui([t.class,i.class]));else if(s==="style")t.style=ba([t.style,i.style]);else if(xa(s)){const r=t[s],o=i[s];o&&r!==o&&!(Xt(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ya(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Un(n,t,e,i=null){Vn(n,t,7,[e,i])}const E_=Qd();let b_=0;function T_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||E_,r={uid:b_++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new qm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:op(i,s),emitsOptions:tp(i,s),emit:null,emitted:null,propsDefaults:he,inheritAttrs:i.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=e_.bind(null,r),n.ce&&n.ce(r),r}let ze=null;const A_=()=>ze||un;let ca,$l;{const n=Ea(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};ca=t("__VUE_INSTANCE_SETTERS__",e=>ze=e),$l=t("__VUE_SSR_SETTERS__",e=>Xr=e)}const Qr=n=>{const t=ze;return ca(n),n.scope.on(),()=>{n.scope.off(),ca(t)}},rf=()=>{ze&&ze.scope.off(),ca(null)};function mp(n){return n.vnode.shapeFlag&4}let Xr=!1;function w_(n,t=!1,e=!1){t&&$l(t);const{props:i,children:s}=n.vnode,r=mp(n);a_(n,i,r,t),f_(n,s,e||t);const o=r?R_(n,t):void 0;return t&&$l(!1),o}function R_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,jg);const{setup:i}=e;if(i){fi();const s=n.setupContext=i.length>1?P_(n):null,r=Qr(n),o=Jr(i,n,0,[n.props,s]),a=pd(o);if(hi(),r(),(a||n.sp)&&!Nr(n)&&qd(n),a){if(o.then(rf,rf),t)return o.then(l=>{of(n,l)}).catch(l=>{wa(l,n,0)});n.asyncDep=o}else of(n,o)}else gp(n)}function of(n,t,e){Yt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ue(t)&&(n.setupState=Fd(t)),gp(n)}function gp(n,t,e){const i=n.type;n.render||(n.render=i.render||kn);{const s=Qr(n);fi();try{qg(n)}finally{hi(),s()}}}const C_={get(n,t){return Be(n,"get",""),n[t]}};function P_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,C_),slots:n.slots,emit:n.emit,expose:t}}function La(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Fd(dg(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Or)return Or[e](n)},has(t,e){return e in t||e in Or}})):n.proxy}function D_(n,t=!0){return Yt(n)?n.displayName||n.name:n.name||t&&n.__name}function I_(n){return Yt(n)&&"__vccOpts"in n}const Jt=(n,t)=>_g(n,t,Xr);function _p(n,t,e){try{aa(-1);const i=arguments.length;return i===2?ue(t)&&!Xt(t)?la(t)?Ke(n,null,[t]):Ke(n,t):Ke(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&la(e)&&(e=[e]),Ke(n,t,e))}finally{aa(1)}}const L_="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Kl;const af=typeof window<"u"&&window.trustedTypes;if(af)try{Kl=af.createPolicy("vue",{createHTML:n=>n})}catch{}const vp=Kl?n=>Kl.createHTML(n):n=>n,U_="http://www.w3.org/2000/svg",N_="http://www.w3.org/1998/Math/MathML",ni=typeof document<"u"?document:null,lf=ni&&ni.createElement("template"),O_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ni.createElementNS(U_,n):t==="mathml"?ni.createElementNS(N_,n):e?ni.createElement(n,{is:e}):ni.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ni.createTextNode(n),createComment:n=>ni.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ni.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{lf.innerHTML=vp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=lf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},F_=Symbol("_vtc");function B_(n,t,e){const i=n[F_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ua=Symbol("_vod"),xp=Symbol("_vsh"),z_={name:"show",beforeMount(n,{value:t},{transition:e}){n[ua]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):gr(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),gr(n,!0),i.enter(n)):i.leave(n,()=>{gr(n,!1)}):gr(n,t))},beforeUnmount(n,{value:t}){gr(n,t)}};function gr(n,t){n.style.display=t?n[ua]:"none",n[xp]=!t}const k_=Symbol(""),H_=/(?:^|;)\s*display\s*:/;function V_(n,t,e){const i=n.style,s=xe(e);let r=!1;if(e&&!s){if(t)if(xe(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Rr(i,a,"")}else for(const o in t)e[o]==null&&Rr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?W_(n,o,!xe(t)&&t?t[o]:void 0,a)||Rr(i,o,a):Rr(i,o,"")}}else if(s){if(t!==e){const o=i[k_];o&&(e+=";"+o),i.cssText=e,r=H_.test(e)}}else t&&n.removeAttribute("style");ua in n&&(n[ua]=r?i.display:"",n[xp]&&(i.display="none"))}const cf=/\s*!important$/;function Rr(n,t,e){if(Xt(e))e.forEach(i=>Rr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=G_(n,t);cf.test(e)?n.setProperty(zi(i),e.replace(cf,""),"important"):n[i]=e}}const uf=["Webkit","Moz","ms"],$a={};function G_(n,t){const e=$a[t];if(e)return e;let i=Ze(t);if(i!=="filter"&&i in n)return $a[t]=i;i=Sa(i);for(let s=0;s<uf.length;s++){const r=uf[s]+i;if(r in n)return $a[t]=r}return t}function W_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&xe(i)&&e===i}const ff="http://www.w3.org/1999/xlink";function hf(n,t,e,i,s,r=Xm(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(ff,t.slice(6,t.length)):n.setAttributeNS(ff,t,e):e==null||r&&!vd(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Hn(e)?String(e):e)}function df(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?vp(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=vd(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Us(n,t,e,i){n.addEventListener(t,e,i)}function X_(n,t,e,i){n.removeEventListener(t,e,i)}const pf=Symbol("_vei");function j_(n,t,e,i,s=null){const r=n[pf]||(n[pf]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=q_(t);if(i){const c=r[t]=K_(i,s);Us(n,a,c,l)}else o&&(X_(n,a,o,l),r[t]=void 0)}}const mf=/(?:Once|Passive|Capture)$/;function q_(n){let t;if(mf.test(n)){t={};let i;for(;i=n.match(mf);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):zi(n.slice(2)),t]}let Ka=0;const Y_=Promise.resolve(),$_=()=>Ka||(Y_.then(()=>Ka=0),Ka=Date.now());function K_(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Vn(Z_(i,e.value),t,5,[i])};return e.value=n,e.attached=$_(),e}function Z_(n,t){if(Xt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const gf=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,J_=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?B_(n,i,o):t==="style"?V_(n,e,i):xa(t)?ya(t)||j_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Q_(n,t,i,o))?(df(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&hf(n,t,i,o,r,t!=="value")):n._isVueCE&&(tv(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!xe(i)))?df(n,Ze(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),hf(n,t,i,o))};function Q_(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&gf(t)&&Yt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return gf(t)&&xe(e)?!1:t in n}function tv(n,t){const e=n._def.props;if(!e)return!1;const i=Ze(t);return Array.isArray(e)?e.some(s=>Ze(s)===i):Object.keys(e).some(s=>Ze(s)===i)}const _f=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Xt(t)?e=>Wo(t,e):t};function ev(n){n.target.composing=!0}function vf(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Za=Symbol("_assign");function xf(n,t,e){return t&&(n=n.trim()),e&&(n=Jc(n)),n}const nv={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n[Za]=_f(s);const r=i||s.props&&s.props.type==="number";Us(n,t?"change":"input",o=>{o.target.composing||n[Za](xf(n.value,e,r))}),(e||r)&&Us(n,"change",()=>{n.value=xf(n.value,e,r)}),t||(Us(n,"compositionstart",ev),Us(n,"compositionend",vf),Us(n,"change",vf))},mounted(n,{value:t}){n.value=t??""},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[Za]=_f(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?Jc(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},iv=["ctrl","shift","alt","meta"],sv={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>iv.some(e=>n[`${e}Key`]&&!t.includes(e))},Ii=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=sv[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},rv={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},ov=(n,t)=>{const e=n._withKeys||(n._withKeys={}),i=t.join(".");return e[i]||(e[i]=(s=>{if(!("key"in s))return;const r=zi(s.key);if(t.some(o=>o===r||rv[o]===r))return n(s)}))},av=Ne({patchProp:J_},O_);let yf;function lv(){return yf||(yf=d_(av))}const cv=((...n)=>{const t=lv().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=fv(i);if(!s)return;const r=t._component;!Yt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,uv(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function uv(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function fv(n){return xe(n)?document.querySelector(n):n}const ki=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},hv={};function dv(n,t){const e=Gg("router-view");return Dt(),os(e)}const pv=ki(hv,[["render",dv]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ns=typeof document<"u";function yp(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function mv(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&yp(n.default)}const oe=Object.assign;function Ja(n,t){const e={};for(const i in t){const s=t[i];e[i]=In(s)?s.map(n):n(s)}return e}const Br=()=>{},In=Array.isArray;function Mf(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const Mp=/#/g,gv=/&/g,_v=/\//g,vv=/=/g,xv=/\?/g,Sp=/\+/g,yv=/%5B/g,Mv=/%5D/g,Ep=/%5E/g,Sv=/%60/g,bp=/%7B/g,Ev=/%7C/g,Tp=/%7D/g,bv=/%20/g;function du(n){return n==null?"":encodeURI(""+n).replace(Ev,"|").replace(yv,"[").replace(Mv,"]")}function Tv(n){return du(n).replace(bp,"{").replace(Tp,"}").replace(Ep,"^")}function Zl(n){return du(n).replace(Sp,"%2B").replace(bv,"+").replace(Mp,"%23").replace(gv,"%26").replace(Sv,"`").replace(bp,"{").replace(Tp,"}").replace(Ep,"^")}function Av(n){return Zl(n).replace(vv,"%3D")}function wv(n){return du(n).replace(Mp,"%23").replace(xv,"%3F")}function Rv(n){return wv(n).replace(_v,"%2F")}function jr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const Cv=/\/$/,Pv=n=>n.replace(Cv,"");function Qa(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=Uv(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:jr(o)}}function Dv(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function Sf(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function Iv(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&Qs(t.matched[i],e.matched[s])&&Ap(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function Qs(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function Ap(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!Lv(n[e],t[e]))return!1;return!0}function Lv(n,t){return In(n)?Ef(n,t):In(t)?Ef(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function Ef(n,t){return In(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function Uv(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const vi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Jl=(function(n){return n.pop="pop",n.push="push",n})({}),tl=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function Nv(n){if(!n)if(Ns){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Pv(n)}const Ov=/^[^#]+#/;function Fv(n,t){return n.replace(Ov,"#")+t}function Bv(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const Ua=()=>({left:window.scrollX,top:window.scrollY});function zv(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=Bv(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function bf(n,t){return(history.state?history.state.position-t:-1)+n}const Ql=new Map;function kv(n,t){Ql.set(n,t)}function Hv(n){const t=Ql.get(n);return Ql.delete(n),t}function Vv(n){return typeof n=="string"||n&&typeof n=="object"}function wp(n){return typeof n=="string"||typeof n=="symbol"}let ye=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Rp=Symbol("");ye.MATCHER_NOT_FOUND+"",ye.NAVIGATION_GUARD_REDIRECT+"",ye.NAVIGATION_ABORTED+"",ye.NAVIGATION_CANCELLED+"",ye.NAVIGATION_DUPLICATED+"";function tr(n,t){return oe(new Error,{type:n,[Rp]:!0},t)}function $n(n,t){return n instanceof Error&&Rp in n&&(t==null||!!(n.type&t))}const Gv=["params","query","hash"];function Wv(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of Gv)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function Xv(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(Sp," "),r=s.indexOf("="),o=jr(r<0?s:s.slice(0,r)),a=r<0?null:jr(s.slice(r+1));if(o in t){let l=t[o];In(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function Tf(n){let t="";for(let e in n){const i=n[e];if(e=Av(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(In(i)?i.map(s=>s&&Zl(s)):[i&&Zl(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function jv(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=In(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const qv=Symbol(""),Af=Symbol(""),to=Symbol(""),pu=Symbol(""),tc=Symbol("");function _r(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function wi(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(tr(ye.NAVIGATION_ABORTED,{from:e,to:t})):h instanceof Error?l(h):Vv(h)?l(tr(ye.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(o&&i.enterCallbacks[s]===o&&typeof h=="function"&&o.push(h),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function el(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(yp(l)){const c=(l.__vccOpts||l)[t];c&&r.push(wi(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=mv(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[t];return h&&wi(h,e,i,o,a,s)()}))}}return r}function Yv(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>Qs(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>Qs(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let $v=()=>location.protocol+"//"+location.host;function Cp(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),Sf(a,"")}return Sf(e,n)+i+s}function Kv(n,t,e,i){let s=[],r=[],o=null;const a=({state:h})=>{const d=Cp(n,location),g=e.value,_=t.value;let m=0;if(h){if(e.value=d,t.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(d);s.forEach(p=>{p(e.value,g,{delta:m,type:Jl.pop,direction:m?m>0?tl.forward:tl.back:tl.unknown})})};function l(){o=e.value}function c(h){s.push(h);const d=()=>{const g=s.indexOf(h);g>-1&&s.splice(g,1)};return r.push(d),d}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(oe({},h.state,{scroll:Ua()}),"")}}function f(){for(const h of r)h();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function wf(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?Ua():null}}function Zv(n){const{history:t,location:e}=window,i={value:Cp(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const f=n.indexOf("#"),h=f>-1?(e.host&&document.querySelector("base")?n:n.slice(f))+l:$v()+n+l;try{t[u?"replaceState":"pushState"](c,"",h),s.value=c}catch(d){console.error(d),e[u?"replace":"assign"](h)}}function o(l,c){r(l,oe({},t.state,wf(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=oe({},s.value,t.state,{forward:l,scroll:Ua()});r(u.current,u,!0),r(l,oe({},wf(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function Jv(n){n=Nv(n);const t=Zv(n),e=Kv(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=oe({location:"",base:n,go:i,createHref:Fv.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function Qv(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),Jv(n)}let ts=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Ae=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Ae||{});const t0={type:ts.Static,value:""},e0=/[a-zA-Z0-9_]/;function n0(n){if(!n)return[[]];if(n==="/")return[[t0]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(d){throw new Error(`ERR (${e})/"${c}": ${d}`)}let e=Ae.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function f(){c&&(e===Ae.Static?r.push({type:ts.Static,value:c}):e===Ae.Param||e===Ae.ParamRegExp||e===Ae.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:ts.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==Ae.ParamRegExp){i=e,e=Ae.EscapeNext;continue}switch(e){case Ae.Static:l==="/"?(c&&f(),o()):l===":"?(f(),e=Ae.Param):h();break;case Ae.EscapeNext:h(),e=i;break;case Ae.Param:l==="("?e=Ae.ParamRegExp:e0.test(l)?h():(f(),e=Ae.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Ae.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=Ae.ParamRegExpEnd:u+=l;break;case Ae.ParamRegExpEnd:f(),e=Ae.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===Ae.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),f(),o(),s}const Rf="[^/]+?",i0={sensitive:!1,strict:!1,start:!0,end:!0};var qe=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(qe||{});const s0=/[.+*?^${}()[\]/\\]/g;function r0(n,t){const e=oe({},i0,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[qe.Root];e.strict&&!c.length&&(s+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=qe.Segment+(e.sensitive?qe.BonusCaseSensitive:0);if(h.type===ts.Static)f||(s+="/"),s+=h.value.replace(s0,"\\$&"),d+=qe.Static;else if(h.type===ts.Param){const{value:g,repeatable:_,optional:m,regexp:p}=h;r.push({name:g,repeatable:_,optional:m});const b=p||Rf;if(b!==Rf){d+=qe.BonusCustomRegExp;try{`${b}`}catch(M){throw new Error(`Invalid custom RegExp for param "${g}" (${b}): `+M.message)}}let w=_?`((?:${b})(?:/(?:${b}))*)`:`(${b})`;f||(w=m&&c.length<2?`(?:/${w})`:"/"+w),m&&(w+="?"),s+=w,d+=qe.Dynamic,m&&(d+=qe.BonusOptional),_&&(d+=qe.BonusRepeatable),b===".*"&&(d+=qe.BonusWildcard)}u.push(d)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=qe.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=r[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===ts.Static)u+=d.value;else if(d.type===ts.Param){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(In(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const b=In(p)?p.join("/"):p;if(!b)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=b}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function o0(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===qe.Static+qe.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===qe.Static+qe.Segment?1:-1:0}function Pp(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=o0(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(Cf(i))return 1;if(Cf(s))return-1}return s.length-i.length}function Cf(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const a0={strict:!1,end:!0,sensitive:!1};function l0(n,t,e){const i=r0(n0(n.path),e),s=oe(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function c0(n,t){const e=[],i=new Map;t=Mf(a0,t);function s(f){return i.get(f)}function r(f,h,d){const g=!d,_=Df(f);_.aliasOf=d&&d.record;const m=Mf(t,f),p=[_];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const N of M)p.push(Df(oe({},_,{components:d?d.record.components:_.components,path:N,aliasOf:d?d.record:_})))}let b,w;for(const M of p){const{path:N}=M;if(h&&N[0]!=="/"){const I=h.record.path,D=I[I.length-1]==="/"?"":"/";M.path=h.record.path+(N&&D+N)}if(b=l0(M,h,m),d?d.alias.push(b):(w=w||b,w!==b&&w.alias.push(b),g&&f.name&&!If(b)&&o(f.name)),Dp(b)&&l(b),_.children){const I=_.children;for(let D=0;D<I.length;D++)r(I[D],b,d&&d.children[D])}d=d||b}return w?()=>{o(w)}:Br}function o(f){if(wp(f)){const h=i.get(f);h&&(i.delete(f),e.splice(e.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=e.indexOf(f);h>-1&&(e.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return e}function l(f){const h=h0(f,e);e.splice(h,0,f),f.record.name&&!If(f)&&i.set(f.record.name,f)}function c(f,h){let d,g={},_,m;if("name"in f&&f.name){if(d=i.get(f.name),!d)throw tr(ye.MATCHER_NOT_FOUND,{location:f});m=d.record.name,g=oe(Pf(h.params,d.keys.filter(w=>!w.optional).concat(d.parent?d.parent.keys.filter(w=>w.optional):[]).map(w=>w.name)),f.params&&Pf(f.params,d.keys.map(w=>w.name))),_=d.stringify(g)}else if(f.path!=null)_=f.path,d=e.find(w=>w.re.test(_)),d&&(g=d.parse(_),m=d.record.name);else{if(d=h.name?i.get(h.name):e.find(w=>w.re.test(h.path)),!d)throw tr(ye.MATCHER_NOT_FOUND,{location:f,currentLocation:h});m=d.record.name,g=oe({},h.params,f.params),_=d.stringify(g)}const p=[];let b=d;for(;b;)p.unshift(b.record),b=b.parent;return{name:m,path:_,params:g,matched:p,meta:f0(p)}}n.forEach(f=>r(f));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Pf(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function Df(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:u0(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function u0(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function If(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function f0(n){return n.reduce((t,e)=>oe(t,e.meta),{})}function h0(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Pp(n,t[r])<0?i=r:e=r+1}const s=d0(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function d0(n){let t=n;for(;t=t.parent;)if(Dp(t)&&Pp(n,t)===0)return t}function Dp({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Lf(n){const t=yn(to),e=yn(pu),i=Jt(()=>{const l=hn(n.to);return t.resolve(l)}),s=Jt(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=e.matched;if(!u||!f.length)return-1;const h=f.findIndex(Qs.bind(null,u));if(h>-1)return h;const d=Uf(l[c-2]);return c>1&&Uf(u)===d&&f[f.length-1].path!==d?f.findIndex(Qs.bind(null,l[c-2])):h}),r=Jt(()=>s.value>-1&&v0(e.params,i.value.params)),o=Jt(()=>s.value>-1&&s.value===e.matched.length-1&&Ap(e.params,i.value.params));function a(l={}){if(_0(l)){const c=t[hn(n.replace)?"replace":"push"](hn(n.to)).catch(Br);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Jt(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function p0(n){return n.length===1?n[0]:n}const m0=pi({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Lf,setup(n,{slots:t}){const e=Aa(Lf(n)),{options:i}=yn(to),s=Jt(()=>({[Nf(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[Nf(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&p0(t.default(e));return n.custom?r:_p("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),g0=m0;function _0(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function v0(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!In(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function Uf(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Nf=(n,t,e)=>n??t??e,x0=pi({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=yn(tc),s=Jt(()=>n.route||i.value),r=yn(Af,0),o=Jt(()=>{let c=hn(r);const{matched:u}=s.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Jt(()=>s.value.matched[o.value]);Xo(Af,Jt(()=>o.value+1)),Xo(qv,a),Xo(tc,s);const l=Wt();return rn(()=>[l.value,a.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!Qs(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return Of(e.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=_p(h,oe({},g,t,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return Of(e.default,{Component:m,route:c})||m}}});function Of(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const y0=x0;function M0(n){const t=c0(n.routes,n),e=n.parseQuery||Xv,i=n.stringifyQuery||Tf,s=n.history,r=_r(),o=_r(),a=_r(),l=Zs(vi);let c=vi;Ns&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Ja.bind(null,z=>""+z),f=Ja.bind(null,Rv),h=Ja.bind(null,jr);function d(z,ut){let lt,gt;return wp(z)?(lt=t.getRecordMatcher(z),gt=ut):gt=z,t.addRoute(gt,lt)}function g(z){const ut=t.getRecordMatcher(z);ut&&t.removeRoute(ut)}function _(){return t.getRoutes().map(z=>z.record)}function m(z){return!!t.getRecordMatcher(z)}function p(z,ut){if(ut=oe({},ut||l.value),typeof z=="string"){const y=Qa(e,z,ut.path),Q=t.resolve({path:y.path},ut),tt=s.createHref(y.fullPath);return oe(y,Q,{params:h(Q.params),hash:jr(y.hash),redirectedFrom:void 0,href:tt})}let lt;if(z.path!=null)lt=oe({},z,{path:Qa(e,z.path,ut.path).path});else{const y=oe({},z.params);for(const Q in y)y[Q]==null&&delete y[Q];lt=oe({},z,{params:f(y)}),ut.params=f(ut.params)}const gt=t.resolve(lt,ut),ht=z.hash||"";gt.params=u(h(gt.params));const E=Dv(i,oe({},z,{hash:Tv(ht),path:gt.path})),P=s.createHref(E);return oe({fullPath:E,hash:ht,query:i===Tf?jv(z.query):z.query||{}},gt,{redirectedFrom:void 0,href:P})}function b(z){return typeof z=="string"?Qa(e,z,l.value.path):oe({},z)}function w(z,ut){if(c!==z)return tr(ye.NAVIGATION_CANCELLED,{from:ut,to:z})}function M(z){return D(z)}function N(z){return M(oe(b(z),{replace:!0}))}function I(z,ut){const lt=z.matched[z.matched.length-1];if(lt&&lt.redirect){const{redirect:gt}=lt;let ht=typeof gt=="function"?gt(z,ut):gt;return typeof ht=="string"&&(ht=ht.includes("?")||ht.includes("#")?ht=b(ht):{path:ht},ht.params={}),oe({query:z.query,hash:z.hash,params:ht.path!=null?{}:z.params},ht)}}function D(z,ut){const lt=c=p(z),gt=l.value,ht=z.state,E=z.force,P=z.replace===!0,y=I(lt,gt);if(y)return D(oe(b(y),{state:typeof y=="object"?oe({},ht,y.state):ht,force:E,replace:P}),ut||lt);const Q=lt;Q.redirectedFrom=ut;let tt;return!E&&Iv(i,gt,lt)&&(tt=tr(ye.NAVIGATION_DUPLICATED,{to:Q,from:gt}),Ct(gt,gt,!0,!1)),(tt?Promise.resolve(tt):S(Q,gt)).catch(J=>$n(J)?$n(J,ye.NAVIGATION_GUARD_REDIRECT)?J:Mt(J):Y(J,Q,gt)).then(J=>{if(J){if($n(J,ye.NAVIGATION_GUARD_REDIRECT))return D(oe({replace:P},b(J.to),{state:typeof J.to=="object"?oe({},ht,J.to.state):ht,force:E}),ut||Q)}else J=U(Q,gt,!0,P,ht);return R(Q,gt,J),J})}function L(z,ut){const lt=w(z,ut);return lt?Promise.reject(lt):Promise.resolve()}function T(z){const ut=at.values().next().value;return ut&&typeof ut.runWithContext=="function"?ut.runWithContext(z):z()}function S(z,ut){let lt;const[gt,ht,E]=Yv(z,ut);lt=el(gt.reverse(),"beforeRouteLeave",z,ut);for(const y of gt)y.leaveGuards.forEach(Q=>{lt.push(wi(Q,z,ut))});const P=L.bind(null,z,ut);return lt.push(P),Tt(lt).then(()=>{lt=[];for(const y of r.list())lt.push(wi(y,z,ut));return lt.push(P),Tt(lt)}).then(()=>{lt=el(ht,"beforeRouteUpdate",z,ut);for(const y of ht)y.updateGuards.forEach(Q=>{lt.push(wi(Q,z,ut))});return lt.push(P),Tt(lt)}).then(()=>{lt=[];for(const y of E)if(y.beforeEnter)if(In(y.beforeEnter))for(const Q of y.beforeEnter)lt.push(wi(Q,z,ut));else lt.push(wi(y.beforeEnter,z,ut));return lt.push(P),Tt(lt)}).then(()=>(z.matched.forEach(y=>y.enterCallbacks={}),lt=el(E,"beforeRouteEnter",z,ut,T),lt.push(P),Tt(lt))).then(()=>{lt=[];for(const y of o.list())lt.push(wi(y,z,ut));return lt.push(P),Tt(lt)}).catch(y=>$n(y,ye.NAVIGATION_CANCELLED)?y:Promise.reject(y))}function R(z,ut,lt){a.list().forEach(gt=>T(()=>gt(z,ut,lt)))}function U(z,ut,lt,gt,ht){const E=w(z,ut);if(E)return E;const P=ut===vi,y=Ns?history.state:{};lt&&(gt||P?s.replace(z.fullPath,oe({scroll:P&&y&&y.scroll},ht)):s.push(z.fullPath,ht)),l.value=z,Ct(z,ut,lt,P),Mt()}let F;function O(){F||(F=s.listen((z,ut,lt)=>{if(!_t.listening)return;const gt=p(z),ht=I(gt,_t.currentRoute.value);if(ht){D(oe(ht,{replace:!0,force:!0}),gt).catch(Br);return}c=gt;const E=l.value;Ns&&kv(bf(E.fullPath,lt.delta),Ua()),S(gt,E).catch(P=>$n(P,ye.NAVIGATION_ABORTED|ye.NAVIGATION_CANCELLED)?P:$n(P,ye.NAVIGATION_GUARD_REDIRECT)?(D(oe(b(P.to),{force:!0}),gt).then(y=>{$n(y,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&!lt.delta&&lt.type===Jl.pop&&s.go(-1,!1)}).catch(Br),Promise.reject()):(lt.delta&&s.go(-lt.delta,!1),Y(P,gt,E))).then(P=>{P=P||U(gt,E,!1),P&&(lt.delta&&!$n(P,ye.NAVIGATION_CANCELLED)?s.go(-lt.delta,!1):lt.type===Jl.pop&&$n(P,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),R(gt,E,P)}).catch(Br)}))}let G=_r(),K=_r(),et;function Y(z,ut,lt){Mt(z);const gt=K.list();return gt.length?gt.forEach(ht=>ht(z,ut,lt)):console.error(z),Promise.reject(z)}function mt(){return et&&l.value!==vi?Promise.resolve():new Promise((z,ut)=>{G.add([z,ut])})}function Mt(z){return et||(et=!z,O(),G.list().forEach(([ut,lt])=>z?lt(z):ut()),G.reset()),z}function Ct(z,ut,lt,gt){const{scrollBehavior:ht}=n;if(!Ns||!ht)return Promise.resolve();const E=!lt&&Hv(bf(z.fullPath,0))||(gt||!lt)&&history.state&&history.state.scroll||null;return rs().then(()=>ht(z,ut,E)).then(P=>P&&zv(P)).catch(P=>Y(P,z,ut))}const Ft=z=>s.go(z);let Qt;const at=new Set,_t={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:_,resolve:p,options:n,push:M,replace:N,go:Ft,back:()=>Ft(-1),forward:()=>Ft(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:K.add,isReady:mt,install(z){z.component("RouterLink",g0),z.component("RouterView",y0),z.config.globalProperties.$router=_t,Object.defineProperty(z.config.globalProperties,"$route",{enumerable:!0,get:()=>hn(l)}),Ns&&!Qt&&l.value===vi&&(Qt=!0,M(s.location).catch(gt=>{}));const ut={};for(const gt in vi)Object.defineProperty(ut,gt,{get:()=>l.value[gt],enumerable:!0});z.provide(to,_t),z.provide(pu,Nd(ut)),z.provide(tc,l);const lt=z.unmount;at.add(z),z.unmount=function(){at.delete(z),at.size<1&&(c=vi,F&&F(),F=null,l.value=vi,Qt=!1,et=!1),lt()}}};function Tt(z){return z.reduce((ut,lt)=>ut.then(()=>T(lt)),Promise.resolve())}return _t}function eo(){return yn(to)}function Ip(n){return yn(pu)}function Lp(n){var e;const t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}function Up(){Lp({type:"close",source:"galaxy-h5"})}function ec(n){const t=n==null?"":String(n);Lp({type:"galaxy-route",source:"galaxy-h5",name:t})}const zr=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],fa="galaxy_majors",S0={class:"select-page"},E0={class:"picked","aria-live":"polite"},b0={class:"picked-row"},T0={class:"value"},A0={class:"picked-row"},w0={class:"value"},R0={class:"grid"},C0=["onClick"],P0={class:"card-title"},D0={class:"card-tag"},I0={class:"footer"},L0=["disabled"],U0={key:0,class:"toast",role:"status"},N0=pi({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=eo(),i=Wt(null),s=Wt(null),r=Wt(""),o=Jt(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(f){r.value=f,window.setTimeout(()=>{r.value=""},1800)}function l(f){if(f===i.value){i.value=null;return}if(f===s.value){s.value=null;return}if(!i.value){i.value=f;return}if(!s.value){if(f===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=f;return}s.value=f}function c(){if(!o.value)return;const f={fromId:i.value,toId:s.value};sessionStorage.setItem(fa,JSON.stringify(f)),e.push({name:"galaxy"})}function u(){Up()}return(f,h)=>{var d,g;return Dt(),Ot("div",S0,[h[4]||(h[4]=Z("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),Z("div",{class:"custom-nav"},[Z("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[Z("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),h[0]||(h[0]=Z("div",{class:"nav-title"},"专业星系",-1)),h[1]||(h[1]=Z("div",{class:"nav-right"},null,-1))]),h[5]||(h[5]=M_('<div class="nav-spacer" data-v-315c5a7f></div><header class="header" data-v-315c5a7f><p class="eyebrow" data-v-315c5a7f>专业交叉星系</p><h1 class="title" data-v-315c5a7f>选择你的星域</h1><p class="subtitle" data-v-315c5a7f>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),Z("section",E0,[Z("div",b0,[h[2]||(h[2]=Z("span",{class:"label"},"主修 / 起点",-1)),Z("span",T0,It(i.value?(d=hn(zr).find(_=>_.id===i.value))==null?void 0:d.label:"未选择"),1)]),Z("div",A0,[h[3]||(h[3]=Z("span",{class:"label"},"交叉意向",-1)),Z("span",w0,It(s.value?(g=hn(zr).find(_=>_.id===s.value))==null?void 0:g.label:"未选择"),1)])]),Z("div",R0,[(Dt(!0),Ot(Re,null,Ni(hn(zr),_=>(Dt(),Ot("button",{key:_.id,type:"button",class:Ui(["card",{"is-from":_.id===i.value,"is-to":_.id===s.value}]),onClick:m=>l(_.id)},[Z("span",P0,It(_.label),1),Z("span",D0,It(_.tagline),1)],10,C0))),128))]),Z("footer",I0,[Z("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,L0)]),r.value?(Dt(),Ot("div",U0,It(r.value),1)):Le("",!0)])}}}),O0=ki(N0,[["__scopeId","data-v-315c5a7f"]]),F0="modulepreload",B0=function(n,t){return new URL(n,t).href},Ff={},fs=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let o=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=o(e.map(u=>{if(u=B0(u,i),u in Ff)return;Ff[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!i)for(let _=a.length-1;_>=0;_--){const m=a[_];if(m.href===u&&(!f||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const g=document.createElement("link");if(g.rel=f?"stylesheet":F0,f||(g.as="script"),g.crossOrigin="",g.href=u,c&&g.setAttribute("nonce",c),document.head.appendChild(g),f)return new Promise((_,m)=>{g.addEventListener("load",_),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function Na(){if(typeof window>"u")return"";const n=window.__GALAXY_API_BASE__;return n!=null&&String(n).trim()!==""?String(n).trim().replace(/\/+$/,""):""}function Np(){if(typeof window>"u")return null;const n=window.__GALAXY_USER_ID__;if(n===""||n==null)return null;const t=typeof n=="number"?n:Number(n);return!Number.isFinite(t)||t<=0?null:t}function z0(){return Na().length>0&&Np()!=null}const no=z0,hs=Np;function Bf(){return Na()||"./mock"}function Os(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function zf(n="/mock"){const t=Os("manifest.json",n),e=await fetch(t).then(f=>{if(!f.ok)throw new Error(`manifest ${f.status}`);return f.json()}),i=Os(e.nodes_url,n),s=Os(e.edges_url,n),r=Os(e.hyperedges_url,n),o=Os(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(f=>{if(!f.ok)throw new Error(`nodes ${f.status}`);return f.json()}),fetch(s).then(f=>{if(!f.ok)throw new Error(`edges ${f.status}`);return f.json()}),fetch(r).then(f=>{if(!f.ok)throw new Error(`hyperedges ${f.status}`);return f.json()}),fetch(o).then(f=>{if(!f.ok)throw new Error(`layout ${f.status}`);return f.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function nl(n="/mock",t){const e=Na();if(e&&n===e)try{const{fetchRecommend:o}=await fs(async()=>{const{fetchRecommend:a}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchRecommend:a}},[],import.meta.url);return o(t)}catch{}const i=t?`?selectedNodeId=${encodeURIComponent(t)}`:"",s=Os(`recommend.json${i}`,n),r=await fetch(s);if(!r.ok)throw new Error(`recommend ${r.status}`);return r.json()}function k0(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function ss(n,t){const e=[],i=new Set;for(const s of t){const r=s.member_node_ids;if(r!=null&&r.length&&r.includes(n)){e.push(s.id);for(const o of r)i.add(o)}}return{hyperedgeIds:e,memberIds:i}}const ha={major_electrical:"电气工程",major_law:"法学",major_accounting:"会计学",major_cs:"计算机科学",major_finance:"金融学",major_clinical:"临床医学",major_swe:"软件工程",major_marketing:"市场营销",major_ds:"数据科学",major_english:"英语"};function H0(n,t){const e=ha[n],i=ha[t];return!e||!i?["",""]:[`${e}×${i}`,`${i}×${e}`]}const kf=Object.fromEntries(Object.entries(ha).map(([n,t])=>[t,n]));function Op(n){const t=n.split("×").map(s=>s.trim());if(t.length!==2)return null;const e=kf[t[0]],i=kf[t[1]];return!e||!i?null:[e,i]}function Fp(n,t){return n<=t?`${n}|${t}`:`${t}|${n}`}function V0(n){const t=n.split(/\r?\n/).filter(i=>i.trim().length>0),e=[];for(let i=0;i<t.length;i++){const s=t[i];if(s.startsWith("序号")||s.startsWith("	序号"))continue;const r=s.split("	");if(r.length<11)continue;const o=Number.parseInt(r[0],10);Number.isFinite(o)&&e.push({idx:o,pair:r[1].trim(),title:r[2].trim(),heat:r[3].trim(),salaryJunior:r[4].trim(),salaryMid:r[5].trim(),salarySenior:r[6].trim(),workIntensity:r[7].trim(),competition:r[8].trim(),education:r[9].trim(),skills:r[10].trim()})}return e}let vr=null;const Yo=new Map;function G0(n){Yo.clear();for(const t of n){const e=Op(t.pair);if(!e)continue;const i=Fp(e[0],e[1]);Yo.has(i)||Yo.set(i,e)}}function W0(n,t,e){if(e){const s=Op(e);if(s)return s}const i=Yo.get(Fp(n,t));return i||(n<=t?[n,t]:[t,n])}async function mu(){if(vr)return vr;const n="./data/cross_job_catalog.tsv".replace(/\/{2,}/g,"/"),t=await fetch(n);if(!t.ok)throw new Error(`无法加载岗位表: ${t.status}`);const e=await t.text();return vr=V0(e),G0(vr),vr}async function da(n,t){const[e,i]=H0(n,t);if(!e)return[];const r=(await mu()).filter(o=>o.pair===e||o.pair===i);return r.length>=3?r.slice(0,3):r}function Pi(n,t){var o;const e=(n??"").trim();if(!e)return"";const i=t==null?void 0:t.find(a=>a.id===e);if(i!=null&&i.majorId)return i.majorId;const s=t==null?void 0:t.find(a=>a.label===e);if(s!=null&&s.majorId)return s.majorId;if(e.startsWith("m_")){const a=/^m_(.+)_\d+$/.exec(e);if(a!=null&&a[1])return a[1]}return e.startsWith("major_")?e:((o=Object.entries(ha).find(([,a])=>a===e))==null?void 0:o[0])??""}function X0(n){var t;return n.jobSlot!=null&&n.jobSlot>=0&&n.jobSlot<=2?n.jobSlot:((t=n.row)==null?void 0:t.idx)!=null?((n.row.idx-1)%3+3)%3:0}function Fi(n,t){var a,l;if((a=n.packKey)!=null&&a.trim())return n.packKey.trim();const e=Pi(n.majorA,t),i=Pi(n.majorB,t);if(!e||!i)return null;const[s,r]=W0(e,i,(l=n.row)==null?void 0:l.pair),o=X0(n);return`${s}__${r}:${o}`}function j0(n,t,e){const i=t.find(s=>s.id===n);return i?Fi(i,e):null}const Bp="offercat_personal_galaxy_v1",Hf=6;function q0(n,t){const e={},i=n.length;for(let s=0;s<i;s++){const r=n[s],o=2*Math.PI*s/Math.max(i,1);e[r.id]={x:Hf*Math.cos(o),y:.25,z:Hf*Math.sin(o)}}for(const s of t){const r=e[s.majorA],o=e[s.majorB];if(!r||!o)continue;const a={x:(r.x+o.x)*.5,y:(r.y+o.y)*.5+.6,z:(r.z+o.z)*.5};e[s.id]=a}return e}function Y0(n){return{subtitle:`${n.heat} · 初${n.salaryJunior} / 中${n.salaryMid} / 高${n.salarySenior}`,tagline:`${n.workIntensity}级强度 · 竞争${n.competition}`,heat:n.heat,salaryJunior:n.salaryJunior,salaryMid:n.salaryMid,salarySenior:n.salarySenior,workIntensity:n.workIntensity,competition:n.competition,education:n.education,skills:n.skills,catalogIdx:String(n.idx),pair:n.pair}}function zp(n,t){const e=q0(n,t),i=[];for(const o of n)i.push({id:o.id,type:"major",label:o.label,meta:{tagline:"个人星系 · 大行星"}});for(const o of t)i.push({id:o.id,type:"fusion",label:o.title,meta:o.row?Y0(o.row):{tagline:"个人星系 · 小行星"}});const s=t.flatMap(o=>[{u:o.id,v:o.majorA},{u:o.id,v:o.majorB}]),r=t.map(o=>({id:`he_${o.id}`,member_node_ids:[o.majorA,o.majorB,o.id],style_hint:"personal"}));return{nodes:i,edges:s,hyperedges:r,layout:e}}function $0(n,t){return{v:1,majors:[...n],fusions:[...t],updatedAt:Date.now()}}function Oa(){try{const n=localStorage.getItem(Bp);if(!n)return null;const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.majors)||!Array.isArray(t.fusions)?null:t}catch{return null}}function kp(n){try{localStorage.setItem(Bp,JSON.stringify(n))}catch{}}function K0(n){const t=n;return!!t&&t.v===1&&Array.isArray(t.majors)&&Array.isArray(t.fusions)}async function Vf(n){var s;try{await mu()}catch{}const t=n.majors;let e=!1;const i=[];for(const r of n.fusions){let o=r;const a=Pi(r.majorA,t),l=Pi(r.majorB,t);if(a&&l&&(!r.row||r.jobSlot==null||!r.packKey))try{const u=await da(a,l);if(u.length>0){let f=r.jobSlot??0,h=r.row;if((s=r.title)!=null&&s.trim()){const d=u.findIndex(g=>g.title===r.title);d>=0&&(f=d,h=u[d])}h||(h=u[f]??u[0]),o={...o,row:h,jobSlot:f},e=!0}}catch{}const c=Fi(o,t)??o.packKey;c&&c!==o.packKey&&(o={...o,packKey:c},e=!0),i.push(o)}return e?{...n,fusions:i,updatedAt:Date.now()}:n}async function qr(){const n=Oa(),t=async i=>i?Vf(i):null;if(!no())return t(n);const e=hs();if(!e)return t(n);try{const{loadPersonalGalaxy:i}=await fs(async()=>{const{loadPersonalGalaxy:r}=await import("./galaxy-chunk-Bck2YTPA.js");return{loadPersonalGalaxy:r}},[],import.meta.url),s=await i(e);if(s&&K0(s)){const r={...s,updatedAt:s.updatedAt??Date.now()};if(!n||(r.updatedAt??0)>=(n.updatedAt??0)){const o=await Vf(r);return kp(o),o}}}catch{}return t(n)}async function Z0(n,t){const e=hs();if(e==null||e<=0)return{ok:!1};if(!no())return{ok:!1};try{const{savePersonalGalaxy:i}=await fs(async()=>{const{savePersonalGalaxy:s}=await import("./galaxy-chunk-Bck2YTPA.js");return{savePersonalGalaxy:s}},[],import.meta.url);return await i(e,n),{ok:!0}}catch{return{ok:!1}}}const Hp="offercat_personal_starlit_v1",as=50,Gf=50;function il(){return{v:1,byFusionId:{},updatedAt:Date.now()}}function Fa(){try{const n=localStorage.getItem(Hp);if(!n)return il();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||typeof t.byFusionId!="object"?il():t}catch{return il()}}function Vp(n){n.updatedAt=Date.now();try{localStorage.setItem(Hp,JSON.stringify(n))}catch{}}async function J0(n,t){if(!no())return;const e=hs();if(!e)return;const i=Oa();if(!i)return;const s=j0(n,i.fusions,i.majors);if(s)try{const{upsertStarlitProgress:r}=await fs(async()=>{const{upsertStarlitProgress:o}=await import("./galaxy-chunk-Bck2YTPA.js");return{upsertStarlitProgress:o}},[],import.meta.url);await r(e,s,t.starsLit,t.lastQuestionIndex)}catch{}}async function nc(n){var o,a;if(!no())return;const t=hs();if(!t)return;const e=Oa(),i=n??(e==null?void 0:e.fusions)??[],s=(e==null?void 0:e.majors)??[];if(!i.length)return;const r=new Map;for(const l of i){const c=Fi(l,s);c&&r.set(c,l.id)}try{const{fetchStarlitProgress:l}=await fs(async()=>{const{fetchStarlitProgress:h}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchStarlitProgress:h}},[],import.meta.url),c=await l(t),u=Fa();let f=!1;for(const h of c){const d=r.get(h.packKey);if(!d)continue;const g=Math.max(0,Math.floor(h.starsLit)),_=((o=u.byFusionId[d])==null?void 0:o.starsLit)??0,m=Math.max(_,g);(m!==_||!u.byFusionId[d])&&(u.byFusionId[d]={starsLit:m,lastQuestionIndex:h.lastQuestionNo??((a=u.byFusionId[d])==null?void 0:a.lastQuestionIndex)??0,updatedAt:Date.now()},f=!0)}f&&Vp(u)}catch{}}function io(n,t=as){var s;const e=((s=Fa().byFusionId[n])==null?void 0:s.starsLit)??0,i=Math.max(1,Math.floor(t));return Math.min(i,Math.max(0,Math.floor(e)))}function Q0(){const n=Fa();return Object.keys(n.byFusionId).reduce((t,e)=>t+io(e),0)}function Gp(n){return n.reduce((t,e)=>t+io(e),0)}function gu(n){const t=n.filter(i=>i.type==="fusion");if(!t.length)return 0;const e=t.reduce((i,s)=>i+io(s.id),0);return Math.min(1,e/(t.length*as))}function tx(n){const t=Fa(),e=t.byFusionId[n],i=(e==null?void 0:e.starsLit)??0,s=Math.min(as,i+1),r={starsLit:s,lastQuestionIndex:((e==null?void 0:e.lastQuestionIndex)??0)+1,updatedAt:Date.now()};return t.byFusionId[n]=r,Vp(t),J0(n,r),s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _u="170",Xs={ROTATE:0,DOLLY:1,PAN:2},Fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ex=0,Wf=1,nx=2,Wp=1,ix=2,ei=3,Bi=0,on=1,An=2,li=0,js=1,qs=2,Xf=3,jf=4,sx=5,Ji=100,rx=101,ox=102,ax=103,lx=104,cx=200,ux=201,fx=202,hx=203,ic=204,sc=205,dx=206,px=207,mx=208,gx=209,_x=210,vx=211,xx=212,yx=213,Mx=214,rc=0,oc=1,ac=2,er=3,lc=4,cc=5,uc=6,fc=7,Xp=0,Sx=1,Ex=2,Li=0,jp=1,qp=2,Yp=3,vu=4,bx=5,$p=6,Kp=7,Zp=300,nr=301,ir=302,hc=303,dc=304,Ba=306,Yr=1e3,es=1001,pc=1002,dn=1003,Tx=1004,_o=1005,Rn=1006,sl=1007,Di=1008,Gn=1009,Jp=1010,Qp=1011,$r=1012,xu=1013,ls=1014,oi=1015,ci=1016,yu=1017,Mu=1018,sr=1020,tm=35902,em=1021,nm=1022,vn=1023,im=1024,sm=1025,Ys=1026,rr=1027,rm=1028,Su=1029,om=1030,Eu=1031,bu=1033,$o=33776,Ko=33777,Zo=33778,Jo=33779,mc=35840,gc=35841,_c=35842,vc=35843,xc=36196,yc=37492,Mc=37496,Sc=37808,Ec=37809,bc=37810,Tc=37811,Ac=37812,wc=37813,Rc=37814,Cc=37815,Pc=37816,Dc=37817,Ic=37818,Lc=37819,Uc=37820,Nc=37821,Qo=36492,Oc=36494,Fc=36495,am=36283,Bc=36284,zc=36285,kc=36286,Ax=3200,wx=3201,lm=0,Rx=1,Ci="",sn="srgb",lr="srgb-linear",za="linear",ce="srgb",vs=7680,qf=519,Cx=512,Px=513,Dx=514,cm=515,Ix=516,Lx=517,Ux=518,Nx=519,Yf=35044,$f="300 es",ai=2e3,pa=2001;class ds{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ta=Math.PI/180,Hc=180/Math.PI;function so(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function $e(n,t,e){return Math.max(t,Math.min(e,n))}function Ox(n,t){return(n%t+t)%t}function rl(n,t,e){return(1-e)*n+e*t}function xr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function en(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Fx={DEG2RAD:ta};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,i,s,r,o,a,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=s[0],m=s[3],p=s[6],b=s[1],w=s[4],M=s[7],N=s[2],I=s[5],D=s[8];return r[0]=o*_+a*b+l*N,r[3]=o*m+a*w+l*I,r[6]=o*p+a*M+l*D,r[1]=c*_+u*b+f*N,r[4]=c*m+u*w+f*I,r[7]=c*p+u*M+f*D,r[2]=h*_+d*b+g*N,r[5]=h*m+d*w+g*I,r[8]=h*p+d*M+g*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*r,d=c*r-o*l,g=e*f+i*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=h*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ol.makeScale(t,e)),this}rotate(t){return this.premultiply(ol.makeRotation(-t)),this}translate(t,e){return this.premultiply(ol.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ol=new Kt;function um(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ma(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Bx(){const n=ma("canvas");return n.style.display="block",n}const Kf={};function Cr(n){n in Kf||(Kf[n]=!0,console.warn(n))}function zx(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function kx(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(n.r=ui(n.r),n.g=ui(n.g),n.b=ui(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(n.r=$s(n.r),n.g=$s(n.g),n.b=$s(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ci?za:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $s(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Zf=[.64,.33,.3,.6,.15,.06],Jf=[.2126,.7152,.0722],Qf=[.3127,.329],th=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eh=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[lr]:{primaries:Zf,whitePoint:Qf,transfer:za,toXYZ:th,fromXYZ:eh,luminanceCoefficients:Jf,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:Zf,whitePoint:Qf,transfer:ce,toXYZ:th,fromXYZ:eh,luminanceCoefficients:Jf,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}});let xs;class Vx{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{xs===void 0&&(xs=ma("canvas")),xs.width=t.width,xs.height=t.height;const i=xs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=xs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ma("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ui(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ui(e[i]/255)*255):e[i]=ui(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Gx=0;class fm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gx++}),this.uuid=so(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(al(s[o].image)):r.push(al(s[o]))}else r=al(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function al(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vx.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wx=0;class Je extends ds{constructor(t=Je.DEFAULT_IMAGE,e=Je.DEFAULT_MAPPING,i=es,s=es,r=Rn,o=Di,a=vn,l=Gn,c=Je.DEFAULT_ANISOTROPY,u=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wx++}),this.uuid=so(),this.name="",this.source=new fm(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yr:t.x=t.x-Math.floor(t.x);break;case es:t.x=t.x<0?0:1;break;case pc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yr:t.y=t.y-Math.floor(t.y);break;case es:t.y=t.y<0?0:1;break;case pc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Je.DEFAULT_IMAGE=null;Je.DEFAULT_MAPPING=Zp;Je.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,i=0,s=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,M=(d+1)/2,N=(p+1)/2,I=(u+h)/4,D=(f+_)/4,L=(g+m)/4;return w>M&&w>N?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=I/i,r=D/i):M>N?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=I/s,r=L/s):N<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(N),i=D/r,s=L/r),this.set(i,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(h-u)/b,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xx extends ds{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Je(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new fm(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends Xx{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class hm extends Je{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class jx extends Je{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,b=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const N=Math.sqrt(w),I=Math.atan2(N,p*b);m=Math.sin(m*I)/N,a=Math.sin(a*I)/N}const M=a*b;if(l=l*m+h*M,c=c*m+d*M,u=u*m+g*M,f=f*m+_*M,m===1-a){const N=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=N,c*=N,u*=N,f*=N}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-a*d,t[e+2]=c*g+u*d+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),h=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($e(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(t=0,e=0,i=0){q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ll.copy(this).projectOnVector(t),this.sub(ll)}reflect(t){return this.sub(ll.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ll=new q,nh=new cs;class us{constructor(t=new q(1/0,1/0,1/0),e=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(t.matrixWorld),this.union(vo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(yr),xo.subVectors(this.max,yr),ys.subVectors(t.a,yr),Ms.subVectors(t.b,yr),Ss.subVectors(t.c,yr),xi.subVectors(Ms,ys),yi.subVectors(Ss,Ms),Gi.subVectors(ys,Ss);let e=[0,-xi.z,xi.y,0,-yi.z,yi.y,0,-Gi.z,Gi.y,xi.z,0,-xi.x,yi.z,0,-yi.x,Gi.z,0,-Gi.x,-xi.y,xi.x,0,-yi.y,yi.x,0,-Gi.y,Gi.x,0];return!cl(e,ys,Ms,Ss,xo)||(e=[1,0,0,0,1,0,0,0,1],!cl(e,ys,Ms,Ss,xo))?!1:(yo.crossVectors(xi,yi),e=[yo.x,yo.y,yo.z],cl(e,ys,Ms,Ss,xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Kn=[new q,new q,new q,new q,new q,new q,new q,new q],En=new q,vo=new us,ys=new q,Ms=new q,Ss=new q,xi=new q,yi=new q,Gi=new q,yr=new q,xo=new q,yo=new q,Wi=new q;function cl(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Wi.fromArray(n,r);const a=s.x*Math.abs(Wi.x)+s.y*Math.abs(Wi.y)+s.z*Math.abs(Wi.z),l=t.dot(Wi),c=e.dot(Wi),u=i.dot(Wi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const qx=new us,Mr=new q,ul=new q;class cr{constructor(t=new q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):qx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Mr.subVectors(t,this.center);const e=Mr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Mr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ul.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Mr.copy(t.center).add(ul)),this.expandByPoint(Mr.copy(t.center).sub(ul))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zn=new q,fl=new q,Mo=new q,Mi=new q,hl=new q,So=new q,dl=new q;class ro{constructor(t=new q,e=new q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){fl.copy(t).add(e).multiplyScalar(.5),Mo.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(fl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Mo),a=Mi.dot(this.direction),l=-Mi.dot(Mo),c=Mi.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(fl).addScaledVector(Mo,h),d}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const i=Zn.dot(this.direction),s=Zn.dot(Zn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,i,s,r){hl.subVectors(e,t),So.subVectors(i,t),dl.crossVectors(hl,So);let o=this.direction.dot(dl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mi.subVectors(this.origin,t);const l=a*this.direction.dot(So.crossVectors(Mi,So));if(l<0)return null;const c=a*this.direction.dot(hl.cross(Mi));if(c<0||l+c>o)return null;const u=-a*Mi.dot(dl);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Es.setFromMatrixColumn(t,0).length(),r=1/Es.setFromMatrixColumn(t,1).length(),o=1/Es.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yx,t,$x)}lookAt(t,e,i){const s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Si.crossVectors(i,ln),Si.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Si.crossVectors(i,ln)),Si.normalize(),Eo.crossVectors(ln,Si),s[0]=Si.x,s[4]=Eo.x,s[8]=ln.x,s[1]=Si.y,s[5]=Eo.y,s[9]=ln.y,s[2]=Si.z,s[6]=Eo.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],b=i[3],w=i[7],M=i[11],N=i[15],I=s[0],D=s[4],L=s[8],T=s[12],S=s[1],R=s[5],U=s[9],F=s[13],O=s[2],G=s[6],K=s[10],et=s[14],Y=s[3],mt=s[7],Mt=s[11],Ct=s[15];return r[0]=o*I+a*S+l*O+c*Y,r[4]=o*D+a*R+l*G+c*mt,r[8]=o*L+a*U+l*K+c*Mt,r[12]=o*T+a*F+l*et+c*Ct,r[1]=u*I+f*S+h*O+d*Y,r[5]=u*D+f*R+h*G+d*mt,r[9]=u*L+f*U+h*K+d*Mt,r[13]=u*T+f*F+h*et+d*Ct,r[2]=g*I+_*S+m*O+p*Y,r[6]=g*D+_*R+m*G+p*mt,r[10]=g*L+_*U+m*K+p*Mt,r[14]=g*T+_*F+m*et+p*Ct,r[3]=b*I+w*S+M*O+N*Y,r[7]=b*D+w*R+M*G+N*mt,r[11]=b*L+w*U+M*K+N*Mt,r[15]=b*T+w*F+M*et+N*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*f-s*c*f-r*a*h+i*c*h+s*a*d-i*l*d)+_*(+e*l*d-e*c*h+r*o*h-s*o*d+s*c*u-r*l*u)+m*(+e*c*f-e*a*d-r*o*f+i*o*d+r*a*u-i*c*u)+p*(-s*a*u-e*l*f+e*a*h+s*o*f-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,w=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,M=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,N=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,I=e*b+i*w+s*M+r*N;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/I;return t[0]=b*D,t[1]=(_*h*r-f*m*r-_*s*d+i*m*d+f*s*p-i*h*p)*D,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*D,t[3]=(f*l*r-a*h*r-f*s*c+i*h*c+a*s*d-i*l*d)*D,t[4]=w*D,t[5]=(u*m*r-g*h*r+g*s*d-e*m*d-u*s*p+e*h*p)*D,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*D,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*d+e*l*d)*D,t[8]=M*D,t[9]=(g*f*r-u*_*r-g*i*d+e*_*d+u*i*p-e*f*p)*D,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*p+e*a*p)*D,t[11]=(u*a*r-o*f*r-u*i*c+e*f*c+o*i*d-e*a*d)*D,t[12]=N*D,t[13]=(u*_*s-g*f*s+g*i*h-e*_*h-u*i*m+e*f*m)*D,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*D,t[15]=(o*f*s-u*a*s+u*i*l-e*f*l-o*i*h+e*a*h)*D,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,f=a+a,h=r*c,d=r*u,g=r*f,_=o*u,m=o*f,p=a*f,b=l*c,w=l*u,M=l*f,N=i.x,I=i.y,D=i.z;return s[0]=(1-(_+p))*N,s[1]=(d+M)*N,s[2]=(g-w)*N,s[3]=0,s[4]=(d-M)*I,s[5]=(1-(h+p))*I,s[6]=(m+b)*I,s[7]=0,s[8]=(g+w)*D,s[9]=(m-b)*D,s[10]=(1-(h+_))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Es.set(s[0],s[1],s[2]).length();const o=Es.set(s[4],s[5],s[6]).length(),a=Es.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],bn.copy(this);const c=1/r,u=1/o,f=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=f,bn.elements[9]*=f,bn.elements[10]*=f,e.setFromRotationMatrix(bn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ai){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),h=(i+s)/(i-s);let d,g;if(a===ai)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===pa)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ai){const l=this.elements,c=1/(e-t),u=1/(i-s),f=1/(o-r),h=(e+t)*c,d=(i+s)*u;let g,_;if(a===ai)g=(o+r)*f,_=-2*f;else if(a===pa)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Es=new q,bn=new de,Yx=new q(0,0,0),$x=new q(1,1,1),Si=new q,Eo=new q,ln=new q,ih=new de,sh=new cs;class Wn{constructor(t=0,e=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ih.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ih,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sh.setFromEuler(this),this.setFromQuaternion(sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kx=0;const rh=new q,bs=new cs,Jn=new de,bo=new q,Sr=new q,Zx=new q,Jx=new cs,oh=new q(1,0,0),ah=new q(0,1,0),lh=new q(0,0,1),ch={type:"added"},Qx={type:"removed"},Ts={type:"childadded",child:null},pl={type:"childremoved",child:null};class be extends ds{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=so(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new q,e=new Wn,i=new cs,s=new q(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Kt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return bs.setFromAxisAngle(t,e),this.quaternion.multiply(bs),this}rotateOnWorldAxis(t,e){return bs.setFromAxisAngle(t,e),this.quaternion.premultiply(bs),this}rotateX(t){return this.rotateOnAxis(oh,t)}rotateY(t){return this.rotateOnAxis(ah,t)}rotateZ(t){return this.rotateOnAxis(lh,t)}translateOnAxis(t,e){return rh.copy(t).applyQuaternion(this.quaternion),this.position.add(rh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oh,t)}translateY(t){return this.translateOnAxis(ah,t)}translateZ(t){return this.translateOnAxis(lh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?bo.copy(t):bo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Sr,bo,this.up):Jn.lookAt(bo,Sr,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),bs.setFromRotationMatrix(Jn),this.quaternion.premultiply(bs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ch),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qx),pl.child=t,this.dispatchEvent(pl),pl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ch),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,t,Zx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sr,Jx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}be.DEFAULT_UP=new q(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new q,Qn=new q,ml=new q,ti=new q,As=new q,ws=new q,uh=new q,gl=new q,_l=new q,vl=new q,xl=new Me,yl=new Me,Ml=new Me;class wn{constructor(t=new q,e=new q,i=new q){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Tn.subVectors(t,e),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Tn.subVectors(s,e),Qn.subVectors(i,e),ml.subVectors(t,e);const o=Tn.dot(Tn),a=Tn.dot(Qn),l=Tn.dot(ml),c=Qn.dot(Qn),u=Qn.dot(ml),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return xl.setScalar(0),yl.setScalar(0),Ml.setScalar(0),xl.fromBufferAttribute(t,e),yl.fromBufferAttribute(t,i),Ml.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(xl,r.x),o.addScaledVector(yl,r.y),o.addScaledVector(Ml,r.z),o}static isFrontFacing(t,e,i,s){return Tn.subVectors(i,e),Qn.subVectors(t,e),Tn.cross(Qn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Tn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return wn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;As.subVectors(s,i),ws.subVectors(r,i),gl.subVectors(t,i);const l=As.dot(gl),c=ws.dot(gl);if(l<=0&&c<=0)return e.copy(i);_l.subVectors(t,s);const u=As.dot(_l),f=ws.dot(_l);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(As,o);vl.subVectors(t,r);const d=As.dot(vl),g=ws.dot(vl);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(ws,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return uh.subVectors(r,s),a=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(uh,a);const p=1/(m+_+h);return o=_*p,a=h*p,e.copy(i).addScaledVector(As,o).addScaledVector(ws,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const dm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},To={h:0,s:0,l:0};function Sl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class qt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=Ox(t,1),e=$e(e,0,1),i=$e(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Sl(o,r,t+1/3),this.g=Sl(o,r,t),this.b=Sl(o,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=sn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const i=dm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ui(t.r),this.g=ui(t.g),this.b=ui(t.b),this}copyLinearToSRGB(t){return this.r=$s(t.r),this.g=$s(t.g),this.b=$s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return ee.fromWorkingColorSpace(Fe.copy(this),t),Math.round($e(Fe.r*255,0,255))*65536+Math.round($e(Fe.g*255,0,255))*256+Math.round($e(Fe.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=sn){ee.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(To);const i=rl(Ei.h,To.h,e),s=rl(Ei.s,To.s,e),r=rl(Ei.l,To.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new qt;qt.NAMES=dm;let ty=0;class ps extends ds{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=so(),this.name="",this.blending=js,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ic,this.blendDst=sc,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vs,this.stencilZFail=vs,this.stencilZPass=vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(i.blending=this.blending),this.side!==Bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ic&&(i.blendSrc=this.blendSrc),this.blendDst!==sc&&(i.blendDst=this.blendDst),this.blendEquation!==Ji&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==er&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gn extends ps{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=Xp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new q,Ao=new zt;class Mn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Yf,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ao.fromBufferAttribute(this,e),Ao.applyMatrix3(t),this.setXY(e,Ao.x,Ao.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=xr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=en(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=xr(e,this.array)),e}setX(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=xr(e,this.array)),e}setY(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=xr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=xr(e,this.array)),e}setW(t,e){return this.normalized&&(e=en(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=en(e,this.array),i=en(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=en(e,this.array),i=en(i,this.array),s=en(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=en(e,this.array),i=en(i,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Yf&&(t.usage=this.usage),t}}class pm extends Mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class mm extends Mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Se extends Mn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ey=0;const mn=new de,El=new be,Rs=new q,cn=new us,Er=new us,Ie=new q;class Ve extends ds{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ey++}),this.uuid=so(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(um(t)?mm:pm)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,i){return mn.makeTranslation(t,e,i),this.applyMatrix4(mn),this}scale(t,e,i){return mn.makeScale(t,e,i),this.applyMatrix4(mn),this}lookAt(t){return El.lookAt(t),El.updateMatrix(),this.applyMatrix4(El.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rs).negate(),this.translate(Rs.x,Rs.y,Rs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new us);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ie.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ie),Ie.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ie)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(t){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Er.setFromBufferAttribute(a),this.morphTargetsRelative?(Ie.addVectors(cn.min,Er.min),cn.expandByPoint(Ie),Ie.addVectors(cn.max,Er.max),cn.expandByPoint(Ie)):(cn.expandByPoint(Er.min),cn.expandByPoint(Er.max))}cn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ie.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ie));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ie.fromBufferAttribute(a,c),l&&(Rs.fromBufferAttribute(t,c),Ie.add(Rs)),s=Math.max(s,i.distanceToSquared(Ie))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new q,l[L]=new q;const c=new q,u=new q,f=new q,h=new zt,d=new zt,g=new zt,_=new q,m=new q;function p(L,T,S){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,S),h.fromBufferAttribute(r,L),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,S),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const R=1/(d.x*g.y-g.x*d.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(R),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(R),a[L].add(_),a[T].add(_),a[S].add(_),l[L].add(m),l[T].add(m),l[S].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let L=0,T=b.length;L<T;++L){const S=b[L],R=S.start,U=S.count;for(let F=R,O=R+U;F<O;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const w=new q,M=new q,N=new q,I=new q;function D(L){N.fromBufferAttribute(s,L),I.copy(N);const T=a[L];w.copy(T),w.sub(N.multiplyScalar(N.dot(T))).normalize(),M.crossVectors(I,T);const R=M.dot(l[L])<0?-1:1;o.setXYZW(L,w.x,w.y,w.z,R)}for(let L=0,T=b.length;L<T;++L){const S=b[L],R=S.start,U=S.count;for(let F=R,O=R+U;F<O;F+=3)D(t.getX(F+0)),D(t.getX(F+1)),D(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new q,r=new q,o=new q,a=new q,l=new q,c=new q,u=new q,f=new q;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ie.fromBufferAttribute(t,e),Ie.normalize(),t.setXYZ(e,Ie.x,Ie.y,Ie.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Mn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fh=new de,Xi=new ro,wo=new cr,hh=new q,Ro=new q,Co=new q,Po=new q,bl=new q,Do=new q,dh=new q,Io=new q;class we extends be{constructor(t=new Ve,e=new gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(bl.fromBufferAttribute(f,t),o?Do.addScaledVector(bl,u):Do.addScaledVector(bl.sub(e),u))}e.add(Do)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wo.copy(i.boundingSphere),wo.applyMatrix4(r),Xi.copy(t.ray).recast(t.near),!(wo.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(wo,hh)===null||Xi.origin.distanceToSquared(hh)>(t.far-t.near)**2))&&(fh.copy(r).invert(),Xi.copy(t.ray).applyMatrix4(fh),!(i.boundingBox!==null&&Xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Xi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),w=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=b,N=w;M<N;M+=3){const I=a.getX(M),D=a.getX(M+1),L=a.getX(M+2);s=Lo(this,p,t,i,c,u,f,I,D,L),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),w=a.getX(m+1),M=a.getX(m+2);s=Lo(this,o,t,i,c,u,f,b,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),w=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=b,N=w;M<N;M+=3){const I=M,D=M+1,L=M+2;s=Lo(this,p,t,i,c,u,f,I,D,L),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const b=m,w=m+1,M=m+2;s=Lo(this,o,t,i,c,u,f,b,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function ny(n,t,e,i,s,r,o,a){let l;if(t.side===on?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Bi,a),l===null)return null;Io.copy(a),Io.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Io);return c<e.near||c>e.far?null:{distance:c,point:Io.clone(),object:n}}function Lo(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Ro),n.getVertexPosition(l,Co),n.getVertexPosition(c,Po);const u=ny(n,t,e,i,Ro,Co,Po,dh);if(u){const f=new q;wn.getBarycoord(dh,Ro,Co,Po,f),s&&(u.uv=wn.getInterpolatedAttribute(s,a,l,c,f,new zt)),r&&(u.uv1=wn.getInterpolatedAttribute(r,a,l,c,f,new zt)),o&&(u.normal=wn.getInterpolatedAttribute(o,a,l,c,f,new q),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new q,materialIndex:0};wn.getNormal(Ro,Co,Po,h.normal),u.face=h,u.barycoord=f}return u}class oo extends Ve{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(f,2));function g(_,m,p,b,w,M,N,I,D,L,T){const S=M/D,R=N/L,U=M/2,F=N/2,O=I/2,G=D+1,K=L+1;let et=0,Y=0;const mt=new q;for(let Mt=0;Mt<K;Mt++){const Ct=Mt*R-F;for(let Ft=0;Ft<G;Ft++){const Qt=Ft*S-U;mt[_]=Qt*b,mt[m]=Ct*w,mt[p]=O,c.push(mt.x,mt.y,mt.z),mt[_]=0,mt[m]=0,mt[p]=I>0?1:-1,u.push(mt.x,mt.y,mt.z),f.push(Ft/D),f.push(1-Mt/L),et+=1}}for(let Mt=0;Mt<L;Mt++)for(let Ct=0;Ct<D;Ct++){const Ft=h+Ct+G*Mt,Qt=h+Ct+G*(Mt+1),at=h+(Ct+1)+G*(Mt+1),_t=h+(Ct+1)+G*Mt;l.push(Ft,Qt,_t),l.push(Qt,at,_t),Y+=6}a.addGroup(d,Y,T),d+=Y,h+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function or(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Xe(n){const t={};for(let e=0;e<n.length;e++){const i=or(n[e]);for(const s in i)t[s]=i[s]}return t}function iy(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function gm(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Kr={clone:or,merge:Xe};var sy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ry=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ke extends ps{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sy,this.fragmentShader=ry,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=or(t.uniforms),this.uniformsGroups=iy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class _m extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=ai}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bi=new q,ph=new zt,mh=new zt;class _n extends _m{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Hc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ta*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Hc*2*Math.atan(Math.tan(ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,ph,mh),e.subVectors(mh,ph)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ta*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Cs=-90,Ps=1;class oy extends be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(Cs,Ps,t,e);s.layers=this.layers,this.add(s);const r=new _n(Cs,Ps,t,e);r.layers=this.layers,this.add(r);const o=new _n(Cs,Ps,t,e);o.layers=this.layers,this.add(o);const a=new _n(Cs,Ps,t,e);a.layers=this.layers,this.add(a);const l=new _n(Cs,Ps,t,e);l.layers=this.layers,this.add(l);const c=new _n(Cs,Ps,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class vm extends Je{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:nr,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ay extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new vm(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new oo(5,5,5),r=new ke({name:"CubemapFromEquirect",uniforms:or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:li});r.uniforms.tEquirect.value=e;const o=new we(s,r),a=e.minFilter;return e.minFilter===Di&&(e.minFilter=Rn),new oy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Tl=new q,ly=new q,cy=new Kt;class Ri{constructor(t=new q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Tl.subVectors(i,e).cross(ly.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Tl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||cy.getNormalMatrix(t),s=this.coplanarPoint(Tl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ji=new cr,Uo=new q;class Au{constructor(t=new Ri,e=new Ri,i=new Ri,s=new Ri,r=new Ri,o=new Ri){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ai){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],f=s[6],h=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],w=s[14],M=s[15];if(i[0].setComponents(l-r,h-c,m-d,M-p).normalize(),i[1].setComponents(l+r,h+c,m+d,M+p).normalize(),i[2].setComponents(l+o,h+u,m+g,M+b).normalize(),i[3].setComponents(l-o,h-u,m-g,M-b).normalize(),i[4].setComponents(l-a,h-f,m-_,M-w).normalize(),e===ai)i[5].setComponents(l+a,h+f,m+_,M+w).normalize();else if(e===pa)i[5].setComponents(a,f,_,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(t){return ji.center.set(0,0,0),ji.radius=.7071067811865476,ji.applyMatrix4(t.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Uo.x=s.normal.x>0?t.max.x:t.min.x,Uo.y=s.normal.y>0?t.max.y:t.min.y,Uo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Uo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function xm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function uy(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class ka extends Ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=t/a,h=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*h-o;for(let w=0;w<c;w++){const M=w*f-r;g.push(M,-b,0),_.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const w=b+c*p,M=b+c*(p+1),N=b+1+c*(p+1),I=b+1+c*p;d.push(w,M,I),d.push(M,N,I)}this.setIndex(d),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ka(t.width,t.height,t.widthSegments,t.heightSegments)}}var fy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hy=`#ifdef USE_ALPHAHASH
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
#endif`,dy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,py=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,my=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_y=`#ifdef USE_AOMAP
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
#endif`,vy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xy=`#ifdef USE_BATCHING
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
#endif`,yy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,My=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ey=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,by=`#ifdef USE_IRIDESCENCE
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
#endif`,Ty=`#ifdef USE_BUMPMAP
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
#endif`,Ay=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,wy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ry=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Py=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Iy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ly=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Uy=`#define PI 3.141592653589793
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
} // validated`,Ny=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Oy=`vec3 transformedNormal = objectNormal;
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
#endif`,Fy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,By=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ky=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gy=`#ifdef USE_ENVMAP
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
#endif`,Wy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xy=`#ifdef USE_ENVMAP
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
#endif`,jy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qy=`#ifdef USE_ENVMAP
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
#endif`,Yy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$y=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ky=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jy=`#ifdef USE_GRADIENTMAP
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
}`,Qy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nM=`uniform bool receiveShadow;
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
#endif`,iM=`#ifdef USE_ENVMAP
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
#endif`,sM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,oM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,aM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lM=`PhysicalMaterial material;
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
#endif`,cM=`struct PhysicalMaterial {
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
}`,uM=`
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
#endif`,fM=`#if defined( RE_IndirectDiffuse )
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
#endif`,hM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_M=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yM=`#if defined( USE_POINTS_UV )
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
#endif`,MM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,SM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,EM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,TM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,AM=`#ifdef USE_MORPHTARGETS
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
#endif`,wM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,CM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,PM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,IM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,LM=`#ifdef USE_NORMALMAP
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
#endif`,UM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,NM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,OM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,FM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,BM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,HM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,VM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,GM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,WM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,XM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,YM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$M=`float getShadowMask() {
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
}`,KM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ZM=`#ifdef USE_SKINNING
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
#endif`,JM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QM=`#ifdef USE_SKINNING
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
#endif`,tS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,iS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sS=`#ifdef USE_TRANSMISSION
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
#endif`,rS=`#ifdef USE_TRANSMISSION
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
#endif`,oS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fS=`uniform sampler2D t2D;
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
}`,hS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gS=`#include <common>
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
}`,_S=`#if DEPTH_PACKING == 3200
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
}`,vS=`#define DISTANCE
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
}`,xS=`#define DISTANCE
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
}`,yS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,MS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SS=`uniform float scale;
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
}`,ES=`uniform vec3 diffuse;
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
}`,bS=`#include <common>
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
}`,TS=`uniform vec3 diffuse;
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
}`,AS=`#define LAMBERT
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
}`,wS=`#define LAMBERT
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
}`,RS=`#define MATCAP
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
}`,CS=`#define MATCAP
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
}`,PS=`#define NORMAL
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
}`,DS=`#define NORMAL
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
}`,IS=`#define PHONG
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
}`,LS=`#define PHONG
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
}`,US=`#define STANDARD
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
}`,NS=`#define STANDARD
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
}`,OS=`#define TOON
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
}`,FS=`#define TOON
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
}`,BS=`uniform float size;
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
}`,zS=`uniform vec3 diffuse;
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
}`,kS=`#include <common>
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
}`,HS=`uniform vec3 color;
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
}`,VS=`uniform float rotation;
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
}`,GS=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:fy,alphahash_pars_fragment:hy,alphamap_fragment:dy,alphamap_pars_fragment:py,alphatest_fragment:my,alphatest_pars_fragment:gy,aomap_fragment:_y,aomap_pars_fragment:vy,batching_pars_vertex:xy,batching_vertex:yy,begin_vertex:My,beginnormal_vertex:Sy,bsdfs:Ey,iridescence_fragment:by,bumpmap_pars_fragment:Ty,clipping_planes_fragment:Ay,clipping_planes_pars_fragment:wy,clipping_planes_pars_vertex:Ry,clipping_planes_vertex:Cy,color_fragment:Py,color_pars_fragment:Dy,color_pars_vertex:Iy,color_vertex:Ly,common:Uy,cube_uv_reflection_fragment:Ny,defaultnormal_vertex:Oy,displacementmap_pars_vertex:Fy,displacementmap_vertex:By,emissivemap_fragment:zy,emissivemap_pars_fragment:ky,colorspace_fragment:Hy,colorspace_pars_fragment:Vy,envmap_fragment:Gy,envmap_common_pars_fragment:Wy,envmap_pars_fragment:Xy,envmap_pars_vertex:jy,envmap_physical_pars_fragment:iM,envmap_vertex:qy,fog_vertex:Yy,fog_pars_vertex:$y,fog_fragment:Ky,fog_pars_fragment:Zy,gradientmap_pars_fragment:Jy,lightmap_pars_fragment:Qy,lights_lambert_fragment:tM,lights_lambert_pars_fragment:eM,lights_pars_begin:nM,lights_toon_fragment:sM,lights_toon_pars_fragment:rM,lights_phong_fragment:oM,lights_phong_pars_fragment:aM,lights_physical_fragment:lM,lights_physical_pars_fragment:cM,lights_fragment_begin:uM,lights_fragment_maps:fM,lights_fragment_end:hM,logdepthbuf_fragment:dM,logdepthbuf_pars_fragment:pM,logdepthbuf_pars_vertex:mM,logdepthbuf_vertex:gM,map_fragment:_M,map_pars_fragment:vM,map_particle_fragment:xM,map_particle_pars_fragment:yM,metalnessmap_fragment:MM,metalnessmap_pars_fragment:SM,morphinstance_vertex:EM,morphcolor_vertex:bM,morphnormal_vertex:TM,morphtarget_pars_vertex:AM,morphtarget_vertex:wM,normal_fragment_begin:RM,normal_fragment_maps:CM,normal_pars_fragment:PM,normal_pars_vertex:DM,normal_vertex:IM,normalmap_pars_fragment:LM,clearcoat_normal_fragment_begin:UM,clearcoat_normal_fragment_maps:NM,clearcoat_pars_fragment:OM,iridescence_pars_fragment:FM,opaque_fragment:BM,packing:zM,premultiplied_alpha_fragment:kM,project_vertex:HM,dithering_fragment:VM,dithering_pars_fragment:GM,roughnessmap_fragment:WM,roughnessmap_pars_fragment:XM,shadowmap_pars_fragment:jM,shadowmap_pars_vertex:qM,shadowmap_vertex:YM,shadowmask_pars_fragment:$M,skinbase_vertex:KM,skinning_pars_vertex:ZM,skinning_vertex:JM,skinnormal_vertex:QM,specularmap_fragment:tS,specularmap_pars_fragment:eS,tonemapping_fragment:nS,tonemapping_pars_fragment:iS,transmission_fragment:sS,transmission_pars_fragment:rS,uv_pars_fragment:oS,uv_pars_vertex:aS,uv_vertex:lS,worldpos_vertex:cS,background_vert:uS,background_frag:fS,backgroundCube_vert:hS,backgroundCube_frag:dS,cube_vert:pS,cube_frag:mS,depth_vert:gS,depth_frag:_S,distanceRGBA_vert:vS,distanceRGBA_frag:xS,equirect_vert:yS,equirect_frag:MS,linedashed_vert:SS,linedashed_frag:ES,meshbasic_vert:bS,meshbasic_frag:TS,meshlambert_vert:AS,meshlambert_frag:wS,meshmatcap_vert:RS,meshmatcap_frag:CS,meshnormal_vert:PS,meshnormal_frag:DS,meshphong_vert:IS,meshphong_frag:LS,meshphysical_vert:US,meshphysical_frag:NS,meshtoon_vert:OS,meshtoon_frag:FS,points_vert:BS,points_frag:zS,shadow_vert:kS,shadow_frag:HS,sprite_vert:VS,sprite_frag:GS},At={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Bn={basic:{uniforms:Xe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Xe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Xe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Xe([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Xe([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Xe([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Xe([At.points,At.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Xe([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Xe([At.common,At.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Xe([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Xe([At.sprite,At.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Xe([At.common,At.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Xe([At.lights,At.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Bn.physical={uniforms:Xe([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const No={r:0,b:0,g:0},qi=new Wn,WS=new de;function XS(n,t,e,i,s,r,o){const a=new qt(0);let l=r===!0?0:1,c,u,f=null,h=0,d=null;function g(b){let w=b.isScene===!0?b.background:null;return w&&w.isTexture&&(w=(b.backgroundBlurriness>0?e:t).get(w)),w}function _(b){let w=!1;const M=g(b);M===null?p(a,l):M&&M.isColor&&(p(M,1),w=!0);const N=n.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,w){const M=g(w);M&&(M.isCubeTexture||M.mapping===Ba)?(u===void 0&&(u=new we(new oo(1,1,1),new ke({name:"BackgroundCubeMaterial",uniforms:or(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(N,I,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),qi.copy(w.backgroundRotation),qi.x*=-1,qi.y*=-1,qi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(WS.makeRotationFromEuler(qi)),u.material.toneMapped=ee.getTransfer(M.colorSpace)!==ce,(f!==M||h!==M.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=M,h=M.version,d=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new we(new ka(2,2),new ke({name:"BackgroundMaterial",uniforms:or(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ee.getTransfer(M.colorSpace)!==ce,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||h!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=M,h=M.version,d=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,w){b.getRGB(No,gm(n)),i.buffers.color.setClear(No.r,No.g,No.b,w,o)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),l=w,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:m}}function jS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(S,R,U,F,O){let G=!1;const K=f(F,U,R);r!==K&&(r=K,c(r.object)),G=d(S,F,U,O),G&&g(S,F,U,O),O!==null&&t.update(O,n.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,M(S,R,U,F),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function f(S,R,U){const F=U.wireframe===!0;let O=i[S.id];O===void 0&&(O={},i[S.id]=O);let G=O[R.id];G===void 0&&(G={},O[R.id]=G);let K=G[F];return K===void 0&&(K=h(l()),G[F]=K),K}function h(S){const R=[],U=[],F=[];for(let O=0;O<e;O++)R[O]=0,U[O]=0,F[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:U,attributeDivisors:F,object:S,attributes:{},index:null}}function d(S,R,U,F){const O=r.attributes,G=R.attributes;let K=0;const et=U.getAttributes();for(const Y in et)if(et[Y].location>=0){const Mt=O[Y];let Ct=G[Y];if(Ct===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(Ct=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(Ct=S.instanceColor)),Mt===void 0||Mt.attribute!==Ct||Ct&&Mt.data!==Ct.data)return!0;K++}return r.attributesNum!==K||r.index!==F}function g(S,R,U,F){const O={},G=R.attributes;let K=0;const et=U.getAttributes();for(const Y in et)if(et[Y].location>=0){let Mt=G[Y];Mt===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(Mt=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(Mt=S.instanceColor));const Ct={};Ct.attribute=Mt,Mt&&Mt.data&&(Ct.data=Mt.data),O[Y]=Ct,K++}r.attributes=O,r.attributesNum=K,r.index=F}function _(){const S=r.newAttributes;for(let R=0,U=S.length;R<U;R++)S[R]=0}function m(S){p(S,0)}function p(S,R){const U=r.newAttributes,F=r.enabledAttributes,O=r.attributeDivisors;U[S]=1,F[S]===0&&(n.enableVertexAttribArray(S),F[S]=1),O[S]!==R&&(n.vertexAttribDivisor(S,R),O[S]=R)}function b(){const S=r.newAttributes,R=r.enabledAttributes;for(let U=0,F=R.length;U<F;U++)R[U]!==S[U]&&(n.disableVertexAttribArray(U),R[U]=0)}function w(S,R,U,F,O,G,K){K===!0?n.vertexAttribIPointer(S,R,U,O,G):n.vertexAttribPointer(S,R,U,F,O,G)}function M(S,R,U,F){_();const O=F.attributes,G=U.getAttributes(),K=R.defaultAttributeValues;for(const et in G){const Y=G[et];if(Y.location>=0){let mt=O[et];if(mt===void 0&&(et==="instanceMatrix"&&S.instanceMatrix&&(mt=S.instanceMatrix),et==="instanceColor"&&S.instanceColor&&(mt=S.instanceColor)),mt!==void 0){const Mt=mt.normalized,Ct=mt.itemSize,Ft=t.get(mt);if(Ft===void 0)continue;const Qt=Ft.buffer,at=Ft.type,_t=Ft.bytesPerElement,Tt=at===n.INT||at===n.UNSIGNED_INT||mt.gpuType===xu;if(mt.isInterleavedBufferAttribute){const z=mt.data,ut=z.stride,lt=mt.offset;if(z.isInstancedInterleavedBuffer){for(let gt=0;gt<Y.locationSize;gt++)p(Y.location+gt,z.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let gt=0;gt<Y.locationSize;gt++)m(Y.location+gt);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let gt=0;gt<Y.locationSize;gt++)w(Y.location+gt,Ct/Y.locationSize,at,Mt,ut*_t,(lt+Ct/Y.locationSize*gt)*_t,Tt)}else{if(mt.isInstancedBufferAttribute){for(let z=0;z<Y.locationSize;z++)p(Y.location+z,mt.meshPerAttribute);S.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let z=0;z<Y.locationSize;z++)m(Y.location+z);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let z=0;z<Y.locationSize;z++)w(Y.location+z,Ct/Y.locationSize,at,Mt,Ct*_t,Ct/Y.locationSize*z*_t,Tt)}}else if(K!==void 0){const Mt=K[et];if(Mt!==void 0)switch(Mt.length){case 2:n.vertexAttrib2fv(Y.location,Mt);break;case 3:n.vertexAttrib3fv(Y.location,Mt);break;case 4:n.vertexAttrib4fv(Y.location,Mt);break;default:n.vertexAttrib1fv(Y.location,Mt)}}}}b()}function N(){L();for(const S in i){const R=i[S];for(const U in R){const F=R[U];for(const O in F)u(F[O].object),delete F[O];delete R[U]}delete i[S]}}function I(S){if(i[S.id]===void 0)return;const R=i[S.id];for(const U in R){const F=R[U];for(const O in F)u(F[O].object),delete F[O];delete R[U]}delete i[S.id]}function D(S){for(const R in i){const U=i[R];if(U[S.id]===void 0)continue;const F=U[S.id];for(const O in F)u(F[O].object),delete F[O];delete U[S.id]}}function L(){T(),o=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:T,dispose:N,releaseStatesOfGeometry:I,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function qS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,i,1)}function l(c,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function YS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==vn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const L=D===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==Gn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==oi&&!L)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),N=g>0,I=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:N,maxSamples:I}}function $S(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Ri,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const b=r?0:i,w=b*4;let M=p.clippingState||null;l.value=M,M=u(g,h,w,d);for(let N=0;N!==w;++N)M[N]=e[N];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,b=h.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=d;w!==_;++w,M+=4)o.copy(f[w]).applyMatrix4(b,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function KS(n){let t=new WeakMap;function e(o,a){return a===hc?o.mapping=nr:a===dc&&(o.mapping=ir),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===hc||a===dc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ay(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class wu extends _m{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Bs=4,gh=[.125,.215,.35,.446,.526,.582],Qi=20,Al=new wu,_h=new qt;let wl=null,Rl=0,Cl=0,Pl=!1;const Ki=(1+Math.sqrt(5))/2,Ds=1/Ki,vh=[new q(-Ki,Ds,0),new q(Ki,Ds,0),new q(-Ds,0,Ki),new q(Ds,0,Ki),new q(0,Ki,-Ds),new q(0,Ki,Ds),new q(-1,1,-1),new q(1,1,-1),new q(-1,1,1),new q(1,1,1)];class xh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){wl=this._renderer.getRenderTarget(),Rl=this._renderer.getActiveCubeFace(),Cl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wl,Rl,Cl),this._renderer.xr.enabled=Pl,t.scissorTest=!1,Oo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===nr||t.mapping===ir?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wl=this._renderer.getRenderTarget(),Rl=this._renderer.getActiveCubeFace(),Cl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:ci,format:vn,colorSpace:lr,depthBuffer:!1},s=yh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ZS(r)),this._blurMaterial=JS(r,t,e)}return s}_compileMaterial(t){const e=new we(this._lodPlanes[0],t);this._renderer.compile(e,Al)}_sceneToCubeUV(t,e,i,s){const a=new _n(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(_h),u.toneMapping=Li,u.autoClear=!1;const d=new gn({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),g=new we(new oo,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(_h),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const w=this._cubeSize;Oo(s,b*w,p>2?w:0,w,w),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===nr||t.mapping===ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Oo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Al)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=vh[(s-r-1)%vh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new we(this._lodPlanes[s],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Qi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Qi;m>Qi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qi}`);const p=[];let b=0;for(let D=0;D<Qi;++D){const L=D/_,T=Math.exp(-L*L/2);p.push(T),D===0?b+=T:D<m&&(b+=2*T)}for(let D=0;D<p.length;D++)p[D]=p[D]/b;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-i;const M=this._sizeLods[s],N=3*M*(s>w-Bs?s-w+Bs:0),I=4*(this._cubeSize-M);Oo(e,N,I,3*M,2*M),l.setRenderTarget(e),l.render(f,Al)}}function ZS(n){const t=[],e=[],i=[];let s=n;const r=n-Bs+1+gh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Bs?l=gh[o-n+Bs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),w=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let I=0;I<d;I++){const D=I%3*2/3-1,L=I>2?0:-1,T=[D,L,0,D+2/3,L,0,D+2/3,L+1,0,D,L,0,D+2/3,L+1,0,D,L+1,0];b.set(T,_*g*I),w.set(h,m*g*I);const S=[I,I,I,I,I,I];M.set(S,p*g*I)}const N=new Ve;N.setAttribute("position",new Mn(b,_)),N.setAttribute("uv",new Mn(w,m)),N.setAttribute("faceIndex",new Mn(M,p)),t.push(N),s>Bs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function yh(n,t,e){const i=new Pn(n,t,e);return i.texture.mapping=Ba,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Oo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function JS(n,t,e){const i=new Float32Array(Qi),s=new q(0,1,0);return new ke({name:"SphericalGaussianBlur",defines:{n:Qi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ru(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Mh(){return new ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ru(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Sh(){return new ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Ru(){return`

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
	`}function QS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===hc||l===dc,u=l===nr||l===ir;if(c||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new xh(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(e===null&&(e=new xh(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function tE(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Cr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function eE(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const b=d.array;_=d.version;for(let w=0,M=b.length;w<M;w+=3){const N=b[w+0],I=b[w+1],D=b[w+2];h.push(N,I,I,D,D,N)}}else if(g!==void 0){const b=g.array;_=g.version;for(let w=0,M=b.length/3-1;w<M;w+=3){const N=w+0,I=w+1,D=w+2;h.push(N,I,I,D,D,N)}}else return;const m=new(um(h)?mm:pm)(h,1);m.version=_;const p=r.get(f);p&&t.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function nE(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,r,h*o),e.update(d,i,1)}function c(h,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,h*o,g),e.update(d,i,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function f(h,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,h,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=d[b]*_[b];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function iE(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function sE(n,t,e){const i=new WeakMap,s=new Me;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let T=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let w=0;d===!0&&(w=1),g===!0&&(w=2),_===!0&&(w=3);let M=a.attributes.position.count*w,N=1;M>t.maxTextureSize&&(N=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const I=new Float32Array(M*N*4*f),D=new hm(I,M,N,f);D.type=oi,D.needsUpdate=!0;const L=w*4;for(let S=0;S<f;S++){const R=m[S],U=p[S],F=b[S],O=M*N*4*S;for(let G=0;G<R.count;G++){const K=G*L;d===!0&&(s.fromBufferAttribute(R,G),I[O+K+0]=s.x,I[O+K+1]=s.y,I[O+K+2]=s.z,I[O+K+3]=0),g===!0&&(s.fromBufferAttribute(U,G),I[O+K+4]=s.x,I[O+K+5]=s.y,I[O+K+6]=s.z,I[O+K+7]=0),_===!0&&(s.fromBufferAttribute(F,G),I[O+K+8]=s.x,I[O+K+9]=s.y,I[O+K+10]=s.z,I[O+K+11]=F.itemSize===4?s.w:1)}}h={count:f,texture:D,size:new zt(M,N)},i.set(a,h),a.addEventListener("dispose",T)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function rE(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=t.get(l,u);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class ym extends Je{constructor(t,e,i,s,r,o,a,l,c,u=Ys){if(u!==Ys&&u!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ys&&(i=ls),i===void 0&&u===rr&&(i=sr),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:dn,this.minFilter=l!==void 0?l:dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Mm=new Je,Eh=new ym(1,1),Sm=new hm,Em=new jx,bm=new vm,bh=[],Th=[],Ah=new Float32Array(16),wh=new Float32Array(9),Rh=new Float32Array(4);function ur(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=bh[s];if(r===void 0&&(r=new Float32Array(s),bh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ce(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Pe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ha(n,t){let e=Th[t];e===void 0&&(e=new Int32Array(t),Th[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function oE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function aE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2fv(this.addr,t),Pe(e,t)}}function lE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;n.uniform3fv(this.addr,t),Pe(e,t)}}function cE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4fv(this.addr,t),Pe(e,t)}}function uE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;Rh.set(i),n.uniformMatrix2fv(this.addr,!1,Rh),Pe(e,i)}}function fE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;wh.set(i),n.uniformMatrix3fv(this.addr,!1,wh),Pe(e,i)}}function hE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;Ah.set(i),n.uniformMatrix4fv(this.addr,!1,Ah),Pe(e,i)}}function dE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function pE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2iv(this.addr,t),Pe(e,t)}}function mE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3iv(this.addr,t),Pe(e,t)}}function gE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4iv(this.addr,t),Pe(e,t)}}function _E(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function vE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2uiv(this.addr,t),Pe(e,t)}}function xE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3uiv(this.addr,t),Pe(e,t)}}function yE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4uiv(this.addr,t),Pe(e,t)}}function ME(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Eh.compareFunction=cm,r=Eh):r=Mm,e.setTexture2D(t||r,s)}function SE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Em,s)}function EE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||bm,s)}function bE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Sm,s)}function TE(n){switch(n){case 5126:return oE;case 35664:return aE;case 35665:return lE;case 35666:return cE;case 35674:return uE;case 35675:return fE;case 35676:return hE;case 5124:case 35670:return dE;case 35667:case 35671:return pE;case 35668:case 35672:return mE;case 35669:case 35673:return gE;case 5125:return _E;case 36294:return vE;case 36295:return xE;case 36296:return yE;case 35678:case 36198:case 36298:case 36306:case 35682:return ME;case 35679:case 36299:case 36307:return SE;case 35680:case 36300:case 36308:case 36293:return EE;case 36289:case 36303:case 36311:case 36292:return bE}}function AE(n,t){n.uniform1fv(this.addr,t)}function wE(n,t){const e=ur(t,this.size,2);n.uniform2fv(this.addr,e)}function RE(n,t){const e=ur(t,this.size,3);n.uniform3fv(this.addr,e)}function CE(n,t){const e=ur(t,this.size,4);n.uniform4fv(this.addr,e)}function PE(n,t){const e=ur(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function DE(n,t){const e=ur(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function IE(n,t){const e=ur(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function LE(n,t){n.uniform1iv(this.addr,t)}function UE(n,t){n.uniform2iv(this.addr,t)}function NE(n,t){n.uniform3iv(this.addr,t)}function OE(n,t){n.uniform4iv(this.addr,t)}function FE(n,t){n.uniform1uiv(this.addr,t)}function BE(n,t){n.uniform2uiv(this.addr,t)}function zE(n,t){n.uniform3uiv(this.addr,t)}function kE(n,t){n.uniform4uiv(this.addr,t)}function HE(n,t,e){const i=this.cache,s=t.length,r=Ha(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Mm,r[o])}function VE(n,t,e){const i=this.cache,s=t.length,r=Ha(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Em,r[o])}function GE(n,t,e){const i=this.cache,s=t.length,r=Ha(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||bm,r[o])}function WE(n,t,e){const i=this.cache,s=t.length,r=Ha(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Sm,r[o])}function XE(n){switch(n){case 5126:return AE;case 35664:return wE;case 35665:return RE;case 35666:return CE;case 35674:return PE;case 35675:return DE;case 35676:return IE;case 5124:case 35670:return LE;case 35667:case 35671:return UE;case 35668:case 35672:return NE;case 35669:case 35673:return OE;case 5125:return FE;case 36294:return BE;case 36295:return zE;case 36296:return kE;case 35678:case 36198:case 36298:case 36306:case 35682:return HE;case 35679:case 36299:case 36307:return VE;case 35680:case 36300:case 36308:case 36293:return GE;case 36289:case 36303:case 36311:case 36292:return WE}}class jE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=TE(e.type)}}class qE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=XE(e.type)}}class YE{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Dl=/(\w+)(\])?(\[|\.)?/g;function Ch(n,t){n.seq.push(t),n.map[t.id]=t}function $E(n,t,e){const i=n.name,s=i.length;for(Dl.lastIndex=0;;){const r=Dl.exec(i),o=Dl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ch(e,c===void 0?new jE(a,n,t):new qE(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new YE(a),Ch(e,f)),e=f}}}class ea{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);$E(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Ph(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const KE=37297;let ZE=0;function JE(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Dh=new Kt;function QE(n){ee._getMatrix(Dh,ee.workingColorSpace,n);const t=`mat3( ${Dh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case za:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ih(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+JE(n.getShaderSource(t),o)}else return s}function tb(n,t){const e=QE(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function eb(n,t){let e;switch(t){case jp:e="Linear";break;case qp:e="Reinhard";break;case Yp:e="Cineon";break;case vu:e="ACESFilmic";break;case $p:e="AgX";break;case Kp:e="Neutral";break;case bx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fo=new q;function nb(){ee.getLuminanceCoefficients(Fo);const n=Fo.x.toFixed(4),t=Fo.y.toFixed(4),e=Fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ib(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Pr).join(`
`)}function sb(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function rb(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Pr(n){return n!==""}function Lh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ob=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vc(n){return n.replace(ob,lb)}const ab=new Map;function lb(n,t){let e=Zt[t];if(e===void 0){const i=ab.get(t);if(i!==void 0)e=Zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Vc(e)}const cb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nh(n){return n.replace(cb,ub)}function ub(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function fb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Wp?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ix?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ei&&(t="SHADOWMAP_TYPE_VSM"),t}function hb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case nr:case ir:t="ENVMAP_TYPE_CUBE";break;case Ba:t="ENVMAP_TYPE_CUBE_UV";break}return t}function db(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ir:t="ENVMAP_MODE_REFRACTION";break}return t}function pb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Xp:t="ENVMAP_BLENDING_MULTIPLY";break;case Sx:t="ENVMAP_BLENDING_MIX";break;case Ex:t="ENVMAP_BLENDING_ADD";break}return t}function mb(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function gb(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=fb(e),c=hb(e),u=db(e),f=pb(e),h=mb(e),d=ib(e),g=sb(r),_=s.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Pr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Pr).join(`
`),p.length>0&&(p+=`
`)):(m=[Oh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Pr).join(`
`),p=[Oh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Li?"#define TONE_MAPPING":"",e.toneMapping!==Li?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Li?eb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,tb("linearToOutputTexel",e.outputColorSpace),nb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Pr).join(`
`)),o=Vc(o),o=Lh(o,e),o=Uh(o,e),a=Vc(a),a=Lh(a,e),a=Uh(a,e),o=Nh(o),a=Nh(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$f?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$f?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=b+m+o,M=b+p+a,N=Ph(s,s.VERTEX_SHADER,w),I=Ph(s,s.FRAGMENT_SHADER,M);s.attachShader(_,N),s.attachShader(_,I),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function D(R){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),F=s.getShaderInfoLog(N).trim(),O=s.getShaderInfoLog(I).trim();let G=!0,K=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,N,I);else{const et=Ih(s,N,"vertex"),Y=Ih(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+U+`
`+et+`
`+Y)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(F===""||O==="")&&(K=!1);K&&(R.diagnostics={runnable:G,programLog:U,vertexShader:{log:F,prefix:m},fragmentShader:{log:O,prefix:p}})}s.deleteShader(N),s.deleteShader(I),L=new ea(s,_),T=rb(s,_)}let L;this.getUniforms=function(){return L===void 0&&D(this),L};let T;this.getAttributes=function(){return T===void 0&&D(this),T};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,KE)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ZE++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=N,this.fragmentShader=I,this}let _b=0;class vb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new xb(t),e.set(t,i)),i}}class xb{constructor(t){this.id=_b++,this.code=t,this.usedTimes=0}}function yb(n,t,e,i,s,r,o){const a=new Tu,l=new vb,c=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,S,R,U,F){const O=U.fog,G=F.geometry,K=T.isMeshStandardMaterial?U.environment:null,et=(T.isMeshStandardMaterial?e:t).get(T.envMap||K),Y=et&&et.mapping===Ba?et.image.height:null,mt=g[T.type];T.precision!==null&&(d=s.getMaxPrecision(T.precision),d!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",d,"instead."));const Mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ct=Mt!==void 0?Mt.length:0;let Ft=0;G.morphAttributes.position!==void 0&&(Ft=1),G.morphAttributes.normal!==void 0&&(Ft=2),G.morphAttributes.color!==void 0&&(Ft=3);let Qt,at,_t,Tt;if(mt){const ie=Bn[mt];Qt=ie.vertexShader,at=ie.fragmentShader}else Qt=T.vertexShader,at=T.fragmentShader,l.update(T),_t=l.getVertexShaderID(T),Tt=l.getFragmentShaderID(T);const z=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),lt=F.isInstancedMesh===!0,gt=F.isBatchedMesh===!0,ht=!!T.map,E=!!T.matcap,P=!!et,y=!!T.aoMap,Q=!!T.lightMap,tt=!!T.bumpMap,J=!!T.normalMap,ot=!!T.displacementMap,X=!!T.emissiveMap,k=!!T.metalnessMap,x=!!T.roughnessMap,v=T.anisotropy>0,C=T.clearcoat>0,B=T.dispersion>0,V=T.iridescence>0,W=T.sheen>0,vt=T.transmission>0,ct=v&&!!T.anisotropyMap,dt=C&&!!T.clearcoatMap,Pt=C&&!!T.clearcoatNormalMap,st=C&&!!T.clearcoatRoughnessMap,pt=V&&!!T.iridescenceMap,Et=V&&!!T.iridescenceThicknessMap,Ht=W&&!!T.sheenColorMap,yt=W&&!!T.sheenRoughnessMap,kt=!!T.specularMap,Vt=!!T.specularColorMap,te=!!T.specularIntensityMap,H=vt&&!!T.transmissionMap,bt=vt&&!!T.thicknessMap,rt=!!T.gradientMap,ft=!!T.alphaMap,St=T.alphaTest>0,wt=!!T.alphaHash,Gt=!!T.extensions;let ve=Li;T.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(ve=n.toneMapping);const De={shaderID:mt,shaderType:T.type,shaderName:T.name,vertexShader:Qt,fragmentShader:at,defines:T.defines,customVertexShaderID:_t,customFragmentShaderID:Tt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:d,batching:gt,batchingColor:gt&&F._colorsTexture!==null,instancing:lt,instancingColor:lt&&F.instanceColor!==null,instancingMorph:lt&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:lr,alphaToCoverage:!!T.alphaToCoverage,map:ht,matcap:E,envMap:P,envMapMode:P&&et.mapping,envMapCubeUVHeight:Y,aoMap:y,lightMap:Q,bumpMap:tt,normalMap:J,displacementMap:h&&ot,emissiveMap:X,normalMapObjectSpace:J&&T.normalMapType===Rx,normalMapTangentSpace:J&&T.normalMapType===lm,metalnessMap:k,roughnessMap:x,anisotropy:v,anisotropyMap:ct,clearcoat:C,clearcoatMap:dt,clearcoatNormalMap:Pt,clearcoatRoughnessMap:st,dispersion:B,iridescence:V,iridescenceMap:pt,iridescenceThicknessMap:Et,sheen:W,sheenColorMap:Ht,sheenRoughnessMap:yt,specularMap:kt,specularColorMap:Vt,specularIntensityMap:te,transmission:vt,transmissionMap:H,thicknessMap:bt,gradientMap:rt,opaque:T.transparent===!1&&T.blending===js&&T.alphaToCoverage===!1,alphaMap:ft,alphaTest:St,alphaHash:wt,combine:T.combine,mapUv:ht&&_(T.map.channel),aoMapUv:y&&_(T.aoMap.channel),lightMapUv:Q&&_(T.lightMap.channel),bumpMapUv:tt&&_(T.bumpMap.channel),normalMapUv:J&&_(T.normalMap.channel),displacementMapUv:ot&&_(T.displacementMap.channel),emissiveMapUv:X&&_(T.emissiveMap.channel),metalnessMapUv:k&&_(T.metalnessMap.channel),roughnessMapUv:x&&_(T.roughnessMap.channel),anisotropyMapUv:ct&&_(T.anisotropyMap.channel),clearcoatMapUv:dt&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:yt&&_(T.sheenRoughnessMap.channel),specularMapUv:kt&&_(T.specularMap.channel),specularColorMapUv:Vt&&_(T.specularColorMap.channel),specularIntensityMapUv:te&&_(T.specularIntensityMap.channel),transmissionMapUv:H&&_(T.transmissionMap.channel),thicknessMapUv:bt&&_(T.thicknessMap.channel),alphaMapUv:ft&&_(T.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(J||v),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!G.attributes.uv&&(ht||ft),fog:!!O,useFog:T.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:ut,skinning:F.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Ft,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:ht&&T.map.isVideoTexture===!0&&ee.getTransfer(T.map.colorSpace)===ce,decodeVideoTextureEmissive:X&&T.emissiveMap.isVideoTexture===!0&&ee.getTransfer(T.emissiveMap.colorSpace)===ce,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===An,flipSided:T.side===on,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Gt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&T.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function p(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const R in T.defines)S.push(R),S.push(T.defines[R]);return T.isRawShaderMaterial===!1&&(b(S,T),w(S,T),S.push(n.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function b(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function w(T,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),T.push(a.mask)}function M(T){const S=g[T.type];let R;if(S){const U=Bn[S];R=Kr.clone(U.uniforms)}else R=T.uniforms;return R}function N(T,S){let R;for(let U=0,F=u.length;U<F;U++){const O=u[U];if(O.cacheKey===S){R=O,++R.usedTimes;break}}return R===void 0&&(R=new gb(n,S,T,r),u.push(R)),R}function I(T){if(--T.usedTimes===0){const S=u.indexOf(T);u[S]=u[u.length-1],u.pop(),T.destroy()}}function D(T){l.remove(T)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:N,releaseProgram:I,releaseShaderCache:D,programs:u,dispose:L}}function Mb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Sb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Fh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Bh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f,h,d,g,_,m){let p=n[t];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(f,h){e.length>1&&e.sort(f||Sb),i.length>1&&i.sort(h||Fh),s.length>1&&s.sort(h||Fh)}function u(){for(let f=t,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function Eb(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Bh,n.set(i,[o])):s>=r.length?(o=new Bh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function bb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new q,color:new qt};break;case"SpotLight":e={position:new q,direction:new q,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new q,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new q,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new q,halfWidth:new q,halfHeight:new q};break}return n[t.id]=e,e}}}function Tb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Ab=0;function wb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Rb(n){const t=new bb,e=Tb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const s=new q,r=new de,o=new de;function a(c){let u=0,f=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,b=0,w=0,M=0,N=0,I=0,D=0;c.sort(wb);for(let T=0,S=c.length;T<S;T++){const R=c[T],U=R.color,F=R.intensity,O=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=U.r*F,f+=U.g*F,h+=U.b*F;else if(R.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(R.sh.coefficients[K],F);D++}else if(R.isDirectionalLight){const K=t.get(R);if(K.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const et=R.shadow,Y=e.get(R);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,i.directionalShadow[d]=Y,i.directionalShadowMap[d]=G,i.directionalShadowMatrix[d]=R.shadow.matrix,b++}i.directional[d]=K,d++}else if(R.isSpotLight){const K=t.get(R);K.position.setFromMatrixPosition(R.matrixWorld),K.color.copy(U).multiplyScalar(F),K.distance=O,K.coneCos=Math.cos(R.angle),K.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),K.decay=R.decay,i.spot[_]=K;const et=R.shadow;if(R.map&&(i.spotLightMap[N]=R.map,N++,et.updateMatrices(R),R.castShadow&&I++),i.spotLightMatrix[_]=et.matrix,R.castShadow){const Y=e.get(R);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,i.spotShadow[_]=Y,i.spotShadowMap[_]=G,M++}_++}else if(R.isRectAreaLight){const K=t.get(R);K.color.copy(U).multiplyScalar(F),K.halfWidth.set(R.width*.5,0,0),K.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=K,m++}else if(R.isPointLight){const K=t.get(R);if(K.color.copy(R.color).multiplyScalar(R.intensity),K.distance=R.distance,K.decay=R.decay,R.castShadow){const et=R.shadow,Y=e.get(R);Y.shadowIntensity=et.intensity,Y.shadowBias=et.bias,Y.shadowNormalBias=et.normalBias,Y.shadowRadius=et.radius,Y.shadowMapSize=et.mapSize,Y.shadowCameraNear=et.camera.near,Y.shadowCameraFar=et.camera.far,i.pointShadow[g]=Y,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=R.shadow.matrix,w++}i.point[g]=K,g++}else if(R.isHemisphereLight){const K=t.get(R);K.skyColor.copy(R.color).multiplyScalar(F),K.groundColor.copy(R.groundColor).multiplyScalar(F),i.hemi[p]=K,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==b||L.numPointShadows!==w||L.numSpotShadows!==M||L.numSpotMaps!==N||L.numLightProbes!==D)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=M+N-I,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=D,L.directionalLength=d,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=b,L.numPointShadows=w,L.numSpotShadows=M,L.numSpotMaps=N,L.numLightProbes=D,i.version=Ab++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const w=c[p];if(w.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(w.isSpotLight){const M=i.spot[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(w.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(w.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function zh(n){const t=new Rb(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Cb(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new zh(n),t.set(s,[a])):r>=o.length?(a=new zh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Pb extends ps{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ax,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Db extends ps{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ib=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lb=`uniform sampler2D shadow_pass;
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
}`;function Ub(n,t,e){let i=new Au;const s=new zt,r=new zt,o=new Me,a=new Pb({depthPacking:wx}),l=new Db,c={},u=e.maxTextureSize,f={[Bi]:on,[on]:Bi,[An]:An},h=new ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:Ib,fragmentShader:Lb}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ve;g.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wp;let p=this.type;this.render=function(I,D,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const T=n.getRenderTarget(),S=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),U=n.state;U.setBlending(li),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=p!==ei&&this.type===ei,O=p===ei&&this.type!==ei;for(let G=0,K=I.length;G<K;G++){const et=I[G],Y=et.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const mt=Y.getFrameExtents();if(s.multiply(mt),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/mt.x),s.x=r.x*mt.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/mt.y),s.y=r.y*mt.y,Y.mapSize.y=r.y)),Y.map===null||F===!0||O===!0){const Ct=this.type!==ei?{minFilter:dn,magFilter:dn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Pn(s.x,s.y,Ct),Y.map.texture.name=et.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const Mt=Y.getViewportCount();for(let Ct=0;Ct<Mt;Ct++){const Ft=Y.getViewport(Ct);o.set(r.x*Ft.x,r.y*Ft.y,r.x*Ft.z,r.y*Ft.w),U.viewport(o),Y.updateMatrices(et,Ct),i=Y.getFrustum(),M(D,L,Y.camera,et,this.type)}Y.isPointLightShadow!==!0&&this.type===ei&&b(Y,L),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(T,S,R)};function b(I,D){const L=t.update(_);h.defines.VSM_SAMPLES!==I.blurSamples&&(h.defines.VSM_SAMPLES=I.blurSamples,d.defines.VSM_SAMPLES=I.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Pn(s.x,s.y)),h.uniforms.shadow_pass.value=I.map.texture,h.uniforms.resolution.value=I.mapSize,h.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(D,null,L,h,_,null),d.uniforms.shadow_pass.value=I.mapPass.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(D,null,L,d,_,null)}function w(I,D,L,T){let S=null;const R=L.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(R!==void 0)S=R;else if(S=L.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const U=S.uuid,F=D.uuid;let O=c[U];O===void 0&&(O={},c[U]=O);let G=O[F];G===void 0&&(G=S.clone(),O[F]=G,D.addEventListener("dispose",N)),S=G}if(S.visible=D.visible,S.wireframe=D.wireframe,T===ei?S.side=D.shadowSide!==null?D.shadowSide:D.side:S.side=D.shadowSide!==null?D.shadowSide:f[D.side],S.alphaMap=D.alphaMap,S.alphaTest=D.alphaTest,S.map=D.map,S.clipShadows=D.clipShadows,S.clippingPlanes=D.clippingPlanes,S.clipIntersection=D.clipIntersection,S.displacementMap=D.displacementMap,S.displacementScale=D.displacementScale,S.displacementBias=D.displacementBias,S.wireframeLinewidth=D.wireframeLinewidth,S.linewidth=D.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=n.properties.get(S);U.light=L}return S}function M(I,D,L,T,S){if(I.visible===!1)return;if(I.layers.test(D.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&S===ei)&&(!I.frustumCulled||i.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,I.matrixWorld);const F=t.update(I),O=I.material;if(Array.isArray(O)){const G=F.groups;for(let K=0,et=G.length;K<et;K++){const Y=G[K],mt=O[Y.materialIndex];if(mt&&mt.visible){const Mt=w(I,mt,T,S);I.onBeforeShadow(n,I,D,L,F,Mt,Y),n.renderBufferDirect(L,null,F,Mt,I,Y),I.onAfterShadow(n,I,D,L,F,Mt,Y)}}}else if(O.visible){const G=w(I,O,T,S);I.onBeforeShadow(n,I,D,L,F,G,null),n.renderBufferDirect(L,null,F,G,I,null),I.onAfterShadow(n,I,D,L,F,G,null)}}const U=I.children;for(let F=0,O=U.length;F<O;F++)M(U[F],D,L,T,S)}function N(I){I.target.removeEventListener("dispose",N);for(const L in c){const T=c[L],S=I.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const Nb={[rc]:oc,[ac]:uc,[lc]:fc,[er]:cc,[oc]:rc,[uc]:ac,[fc]:lc,[cc]:er};function Ob(n,t){function e(){let H=!1;const bt=new Me;let rt=null;const ft=new Me(0,0,0,0);return{setMask:function(St){rt!==St&&!H&&(n.colorMask(St,St,St,St),rt=St)},setLocked:function(St){H=St},setClear:function(St,wt,Gt,ve,De){De===!0&&(St*=ve,wt*=ve,Gt*=ve),bt.set(St,wt,Gt,ve),ft.equals(bt)===!1&&(n.clearColor(St,wt,Gt,ve),ft.copy(bt))},reset:function(){H=!1,rt=null,ft.set(-1,0,0,0)}}}function i(){let H=!1,bt=!1,rt=null,ft=null,St=null;return{setReversed:function(wt){if(bt!==wt){const Gt=t.get("EXT_clip_control");bt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const ve=St;St=null,this.setClear(ve)}bt=wt},getReversed:function(){return bt},setTest:function(wt){wt?z(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(wt){rt!==wt&&!H&&(n.depthMask(wt),rt=wt)},setFunc:function(wt){if(bt&&(wt=Nb[wt]),ft!==wt){switch(wt){case rc:n.depthFunc(n.NEVER);break;case oc:n.depthFunc(n.ALWAYS);break;case ac:n.depthFunc(n.LESS);break;case er:n.depthFunc(n.LEQUAL);break;case lc:n.depthFunc(n.EQUAL);break;case cc:n.depthFunc(n.GEQUAL);break;case uc:n.depthFunc(n.GREATER);break;case fc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ft=wt}},setLocked:function(wt){H=wt},setClear:function(wt){St!==wt&&(bt&&(wt=1-wt),n.clearDepth(wt),St=wt)},reset:function(){H=!1,rt=null,ft=null,St=null,bt=!1}}}function s(){let H=!1,bt=null,rt=null,ft=null,St=null,wt=null,Gt=null,ve=null,De=null;return{setTest:function(ie){H||(ie?z(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(ie){bt!==ie&&!H&&(n.stencilMask(ie),bt=ie)},setFunc:function(ie,Ge,Qe){(rt!==ie||ft!==Ge||St!==Qe)&&(n.stencilFunc(ie,Ge,Qe),rt=ie,ft=Ge,St=Qe)},setOp:function(ie,Ge,Qe){(wt!==ie||Gt!==Ge||ve!==Qe)&&(n.stencilOp(ie,Ge,Qe),wt=ie,Gt=Ge,ve=Qe)},setLocked:function(ie){H=ie},setClear:function(ie){De!==ie&&(n.clearStencil(ie),De=ie)},reset:function(){H=!1,bt=null,rt=null,ft=null,St=null,wt=null,Gt=null,ve=null,De=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,w=null,M=null,N=null,I=null,D=new qt(0,0,0),L=0,T=!1,S=null,R=null,U=null,F=null,O=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,et=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(Y)[1]),K=et>=1):Y.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),K=et>=2);let mt=null,Mt={};const Ct=n.getParameter(n.SCISSOR_BOX),Ft=n.getParameter(n.VIEWPORT),Qt=new Me().fromArray(Ct),at=new Me().fromArray(Ft);function _t(H,bt,rt,ft){const St=new Uint8Array(4),wt=n.createTexture();n.bindTexture(H,wt),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Gt=0;Gt<rt;Gt++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(bt,0,n.RGBA,1,1,ft,0,n.RGBA,n.UNSIGNED_BYTE,St):n.texImage2D(bt+Gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,St);return wt}const Tt={};Tt[n.TEXTURE_2D]=_t(n.TEXTURE_2D,n.TEXTURE_2D,1),Tt[n.TEXTURE_CUBE_MAP]=_t(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[n.TEXTURE_2D_ARRAY]=_t(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Tt[n.TEXTURE_3D]=_t(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),z(n.DEPTH_TEST),o.setFunc(er),tt(!1),J(Wf),z(n.CULL_FACE),y(li);function z(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function ut(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function lt(H,bt){return f[H]!==bt?(n.bindFramebuffer(H,bt),f[H]=bt,H===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=bt),H===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=bt),!0):!1}function gt(H,bt){let rt=d,ft=!1;if(H){rt=h.get(bt),rt===void 0&&(rt=[],h.set(bt,rt));const St=H.textures;if(rt.length!==St.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Gt=St.length;wt<Gt;wt++)rt[wt]=n.COLOR_ATTACHMENT0+wt;rt.length=St.length,ft=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,ft=!0);ft&&n.drawBuffers(rt)}function ht(H){return g!==H?(n.useProgram(H),g=H,!0):!1}const E={[Ji]:n.FUNC_ADD,[rx]:n.FUNC_SUBTRACT,[ox]:n.FUNC_REVERSE_SUBTRACT};E[ax]=n.MIN,E[lx]=n.MAX;const P={[cx]:n.ZERO,[ux]:n.ONE,[fx]:n.SRC_COLOR,[ic]:n.SRC_ALPHA,[_x]:n.SRC_ALPHA_SATURATE,[mx]:n.DST_COLOR,[dx]:n.DST_ALPHA,[hx]:n.ONE_MINUS_SRC_COLOR,[sc]:n.ONE_MINUS_SRC_ALPHA,[gx]:n.ONE_MINUS_DST_COLOR,[px]:n.ONE_MINUS_DST_ALPHA,[vx]:n.CONSTANT_COLOR,[xx]:n.ONE_MINUS_CONSTANT_COLOR,[yx]:n.CONSTANT_ALPHA,[Mx]:n.ONE_MINUS_CONSTANT_ALPHA};function y(H,bt,rt,ft,St,wt,Gt,ve,De,ie){if(H===li){_===!0&&(ut(n.BLEND),_=!1);return}if(_===!1&&(z(n.BLEND),_=!0),H!==sx){if(H!==m||ie!==T){if((p!==Ji||M!==Ji)&&(n.blendEquation(n.FUNC_ADD),p=Ji,M=Ji),ie)switch(H){case js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qs:n.blendFunc(n.ONE,n.ONE);break;case Xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qs:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}b=null,w=null,N=null,I=null,D.set(0,0,0),L=0,m=H,T=ie}return}St=St||bt,wt=wt||rt,Gt=Gt||ft,(bt!==p||St!==M)&&(n.blendEquationSeparate(E[bt],E[St]),p=bt,M=St),(rt!==b||ft!==w||wt!==N||Gt!==I)&&(n.blendFuncSeparate(P[rt],P[ft],P[wt],P[Gt]),b=rt,w=ft,N=wt,I=Gt),(ve.equals(D)===!1||De!==L)&&(n.blendColor(ve.r,ve.g,ve.b,De),D.copy(ve),L=De),m=H,T=!1}function Q(H,bt){H.side===An?ut(n.CULL_FACE):z(n.CULL_FACE);let rt=H.side===on;bt&&(rt=!rt),tt(rt),H.blending===js&&H.transparent===!1?y(li):y(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);const ft=H.stencilWrite;a.setTest(ft),ft&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),X(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?z(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function tt(H){S!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),S=H)}function J(H){H!==ex?(z(n.CULL_FACE),H!==R&&(H===Wf?n.cullFace(n.BACK):H===nx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),R=H}function ot(H){H!==U&&(K&&n.lineWidth(H),U=H)}function X(H,bt,rt){H?(z(n.POLYGON_OFFSET_FILL),(F!==bt||O!==rt)&&(n.polygonOffset(bt,rt),F=bt,O=rt)):ut(n.POLYGON_OFFSET_FILL)}function k(H){H?z(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function x(H){H===void 0&&(H=n.TEXTURE0+G-1),mt!==H&&(n.activeTexture(H),mt=H)}function v(H,bt,rt){rt===void 0&&(mt===null?rt=n.TEXTURE0+G-1:rt=mt);let ft=Mt[rt];ft===void 0&&(ft={type:void 0,texture:void 0},Mt[rt]=ft),(ft.type!==H||ft.texture!==bt)&&(mt!==rt&&(n.activeTexture(rt),mt=rt),n.bindTexture(H,bt||Tt[H]),ft.type=H,ft.texture=bt)}function C(){const H=Mt[mt];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function B(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function V(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function W(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function vt(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ct(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Pt(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function st(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function pt(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ht(H){Qt.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Qt.copy(H))}function yt(H){at.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),at.copy(H))}function kt(H,bt){let rt=c.get(bt);rt===void 0&&(rt=new WeakMap,c.set(bt,rt));let ft=rt.get(H);ft===void 0&&(ft=n.getUniformBlockIndex(bt,H.name),rt.set(H,ft))}function Vt(H,bt){const ft=c.get(bt).get(H);l.get(bt)!==ft&&(n.uniformBlockBinding(bt,ft,H.__bindingPointIndex),l.set(bt,ft))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},mt=null,Mt={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,b=null,w=null,M=null,N=null,I=null,D=new qt(0,0,0),L=0,T=!1,S=null,R=null,U=null,F=null,O=null,Qt.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:z,disable:ut,bindFramebuffer:lt,drawBuffers:gt,useProgram:ht,setBlending:y,setMaterial:Q,setFlipSided:tt,setCullFace:J,setLineWidth:ot,setPolygonOffset:X,setScissorTest:k,activeTexture:x,bindTexture:v,unbindTexture:C,compressedTexImage2D:B,compressedTexImage3D:V,texImage2D:pt,texImage3D:Et,updateUBOMapping:kt,uniformBlockBinding:Vt,texStorage2D:Pt,texStorage3D:st,texSubImage2D:W,texSubImage3D:vt,compressedTexSubImage2D:ct,compressedTexSubImage3D:dt,scissor:Ht,viewport:yt,reset:te}}function kh(n,t,e,i){const s=Fb(i);switch(e){case em:return n*t;case im:return n*t;case sm:return n*t*2;case rm:return n*t/s.components*s.byteLength;case Su:return n*t/s.components*s.byteLength;case om:return n*t*2/s.components*s.byteLength;case Eu:return n*t*2/s.components*s.byteLength;case nm:return n*t*3/s.components*s.byteLength;case vn:return n*t*4/s.components*s.byteLength;case bu:return n*t*4/s.components*s.byteLength;case $o:case Ko:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Zo:case Jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gc:case vc:return Math.max(n,16)*Math.max(t,8)/4;case mc:case _c:return Math.max(n,8)*Math.max(t,8)/2;case xc:case yc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Sc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ec:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case bc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ac:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case wc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Rc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Cc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Pc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Lc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Uc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Nc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Qo:case Oc:case Fc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case am:case Bc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case zc:case kc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Fb(n){switch(n){case Gn:case Jp:return{byteLength:1,components:1};case $r:case Qp:case ci:return{byteLength:2,components:1};case yu:case Mu:return{byteLength:2,components:4};case ls:case xu:case oi:return{byteLength:4,components:1};case tm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Bb(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,v){return d?new OffscreenCanvas(x,v):ma("canvas")}function _(x,v,C){let B=1;const V=k(x);if((V.width>C||V.height>C)&&(B=C/Math.max(V.width,V.height)),B<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const W=Math.floor(B*V.width),vt=Math.floor(B*V.height);f===void 0&&(f=g(W,vt));const ct=v?g(W,vt):f;return ct.width=W,ct.height=vt,ct.getContext("2d").drawImage(x,0,0,W,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+V.width+"x"+V.height+") to ("+W+"x"+vt+")."),ct}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+V.width+"x"+V.height+")."),x;return x}function m(x){return x.generateMipmaps}function p(x){n.generateMipmap(x)}function b(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(x,v,C,B,V=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let W=v;if(v===n.RED&&(C===n.FLOAT&&(W=n.R32F),C===n.HALF_FLOAT&&(W=n.R16F),C===n.UNSIGNED_BYTE&&(W=n.R8)),v===n.RED_INTEGER&&(C===n.UNSIGNED_BYTE&&(W=n.R8UI),C===n.UNSIGNED_SHORT&&(W=n.R16UI),C===n.UNSIGNED_INT&&(W=n.R32UI),C===n.BYTE&&(W=n.R8I),C===n.SHORT&&(W=n.R16I),C===n.INT&&(W=n.R32I)),v===n.RG&&(C===n.FLOAT&&(W=n.RG32F),C===n.HALF_FLOAT&&(W=n.RG16F),C===n.UNSIGNED_BYTE&&(W=n.RG8)),v===n.RG_INTEGER&&(C===n.UNSIGNED_BYTE&&(W=n.RG8UI),C===n.UNSIGNED_SHORT&&(W=n.RG16UI),C===n.UNSIGNED_INT&&(W=n.RG32UI),C===n.BYTE&&(W=n.RG8I),C===n.SHORT&&(W=n.RG16I),C===n.INT&&(W=n.RG32I)),v===n.RGB_INTEGER&&(C===n.UNSIGNED_BYTE&&(W=n.RGB8UI),C===n.UNSIGNED_SHORT&&(W=n.RGB16UI),C===n.UNSIGNED_INT&&(W=n.RGB32UI),C===n.BYTE&&(W=n.RGB8I),C===n.SHORT&&(W=n.RGB16I),C===n.INT&&(W=n.RGB32I)),v===n.RGBA_INTEGER&&(C===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),C===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),C===n.UNSIGNED_INT&&(W=n.RGBA32UI),C===n.BYTE&&(W=n.RGBA8I),C===n.SHORT&&(W=n.RGBA16I),C===n.INT&&(W=n.RGBA32I)),v===n.RGB&&C===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),v===n.RGBA){const vt=V?za:ee.getTransfer(B);C===n.FLOAT&&(W=n.RGBA32F),C===n.HALF_FLOAT&&(W=n.RGBA16F),C===n.UNSIGNED_BYTE&&(W=vt===ce?n.SRGB8_ALPHA8:n.RGBA8),C===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),C===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function M(x,v){let C;return x?v===null||v===ls||v===sr?C=n.DEPTH24_STENCIL8:v===oi?C=n.DEPTH32F_STENCIL8:v===$r&&(C=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ls||v===sr?C=n.DEPTH_COMPONENT24:v===oi?C=n.DEPTH_COMPONENT32F:v===$r&&(C=n.DEPTH_COMPONENT16),C}function N(x,v){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==dn&&x.minFilter!==Rn?Math.log2(Math.max(v.width,v.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?v.mipmaps.length:1}function I(x){const v=x.target;v.removeEventListener("dispose",I),L(v),v.isVideoTexture&&u.delete(v)}function D(x){const v=x.target;v.removeEventListener("dispose",D),S(v)}function L(x){const v=i.get(x);if(v.__webglInit===void 0)return;const C=x.source,B=h.get(C);if(B){const V=B[v.__cacheKey];V.usedTimes--,V.usedTimes===0&&T(x),Object.keys(B).length===0&&h.delete(C)}i.remove(x)}function T(x){const v=i.get(x);n.deleteTexture(v.__webglTexture);const C=x.source,B=h.get(C);delete B[v.__cacheKey],o.memory.textures--}function S(x){const v=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(v.__webglFramebuffer[B]))for(let V=0;V<v.__webglFramebuffer[B].length;V++)n.deleteFramebuffer(v.__webglFramebuffer[B][V]);else n.deleteFramebuffer(v.__webglFramebuffer[B]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[B])}else{if(Array.isArray(v.__webglFramebuffer))for(let B=0;B<v.__webglFramebuffer.length;B++)n.deleteFramebuffer(v.__webglFramebuffer[B]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let B=0;B<v.__webglColorRenderbuffer.length;B++)v.__webglColorRenderbuffer[B]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[B]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const C=x.textures;for(let B=0,V=C.length;B<V;B++){const W=i.get(C[B]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(C[B])}i.remove(x)}let R=0;function U(){R=0}function F(){const x=R;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),R+=1,x}function O(x){const v=[];return v.push(x.wrapS),v.push(x.wrapT),v.push(x.wrapR||0),v.push(x.magFilter),v.push(x.minFilter),v.push(x.anisotropy),v.push(x.internalFormat),v.push(x.format),v.push(x.type),v.push(x.generateMipmaps),v.push(x.premultiplyAlpha),v.push(x.flipY),v.push(x.unpackAlignment),v.push(x.colorSpace),v.join()}function G(x,v){const C=i.get(x);if(x.isVideoTexture&&ot(x),x.isRenderTargetTexture===!1&&x.version>0&&C.__version!==x.version){const B=x.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(C,x,v);return}}e.bindTexture(n.TEXTURE_2D,C.__webglTexture,n.TEXTURE0+v)}function K(x,v){const C=i.get(x);if(x.version>0&&C.__version!==x.version){at(C,x,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,C.__webglTexture,n.TEXTURE0+v)}function et(x,v){const C=i.get(x);if(x.version>0&&C.__version!==x.version){at(C,x,v);return}e.bindTexture(n.TEXTURE_3D,C.__webglTexture,n.TEXTURE0+v)}function Y(x,v){const C=i.get(x);if(x.version>0&&C.__version!==x.version){_t(C,x,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+v)}const mt={[Yr]:n.REPEAT,[es]:n.CLAMP_TO_EDGE,[pc]:n.MIRRORED_REPEAT},Mt={[dn]:n.NEAREST,[Tx]:n.NEAREST_MIPMAP_NEAREST,[_o]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[sl]:n.LINEAR_MIPMAP_NEAREST,[Di]:n.LINEAR_MIPMAP_LINEAR},Ct={[Cx]:n.NEVER,[Nx]:n.ALWAYS,[Px]:n.LESS,[cm]:n.LEQUAL,[Dx]:n.EQUAL,[Ux]:n.GEQUAL,[Ix]:n.GREATER,[Lx]:n.NOTEQUAL};function Ft(x,v){if(v.type===oi&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Rn||v.magFilter===sl||v.magFilter===_o||v.magFilter===Di||v.minFilter===Rn||v.minFilter===sl||v.minFilter===_o||v.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,mt[v.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,mt[v.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,mt[v.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,Mt[v.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,Mt[v.minFilter]),v.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,Ct[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===dn||v.minFilter!==_o&&v.minFilter!==Di||v.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const C=t.get("EXT_texture_filter_anisotropic");n.texParameterf(x,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Qt(x,v){let C=!1;x.__webglInit===void 0&&(x.__webglInit=!0,v.addEventListener("dispose",I));const B=v.source;let V=h.get(B);V===void 0&&(V={},h.set(B,V));const W=O(v);if(W!==x.__cacheKey){V[W]===void 0&&(V[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,C=!0),V[W].usedTimes++;const vt=V[x.__cacheKey];vt!==void 0&&(V[x.__cacheKey].usedTimes--,vt.usedTimes===0&&T(v)),x.__cacheKey=W,x.__webglTexture=V[W].texture}return C}function at(x,v,C){let B=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(B=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(B=n.TEXTURE_3D);const V=Qt(x,v),W=v.source;e.bindTexture(B,x.__webglTexture,n.TEXTURE0+C);const vt=i.get(W);if(W.version!==vt.__version||V===!0){e.activeTexture(n.TEXTURE0+C);const ct=ee.getPrimaries(ee.workingColorSpace),dt=v.colorSpace===Ci?null:ee.getPrimaries(v.colorSpace),Pt=v.colorSpace===Ci||ct===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let st=_(v.image,!1,s.maxTextureSize);st=X(v,st);const pt=r.convert(v.format,v.colorSpace),Et=r.convert(v.type);let Ht=w(v.internalFormat,pt,Et,v.colorSpace,v.isVideoTexture);Ft(B,v);let yt;const kt=v.mipmaps,Vt=v.isVideoTexture!==!0,te=vt.__version===void 0||V===!0,H=W.dataReady,bt=N(v,st);if(v.isDepthTexture)Ht=M(v.format===rr,v.type),te&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,Ht,st.width,st.height):e.texImage2D(n.TEXTURE_2D,0,Ht,st.width,st.height,0,pt,Et,null));else if(v.isDataTexture)if(kt.length>0){Vt&&te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,kt[0].width,kt[0].height);for(let rt=0,ft=kt.length;rt<ft;rt++)yt=kt[rt],Vt?H&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,pt,Et,yt.data):e.texImage2D(n.TEXTURE_2D,rt,Ht,yt.width,yt.height,0,pt,Et,yt.data);v.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,st.width,st.height),H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,st.width,st.height,pt,Et,st.data)):e.texImage2D(n.TEXTURE_2D,0,Ht,st.width,st.height,0,pt,Et,st.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Vt&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Ht,kt[0].width,kt[0].height,st.depth);for(let rt=0,ft=kt.length;rt<ft;rt++)if(yt=kt[rt],v.format!==vn)if(pt!==null)if(Vt){if(H)if(v.layerUpdates.size>0){const St=kh(yt.width,yt.height,v.format,v.type);for(const wt of v.layerUpdates){const Gt=yt.data.subarray(wt*St/yt.data.BYTES_PER_ELEMENT,(wt+1)*St/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,wt,yt.width,yt.height,1,pt,Gt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,yt.width,yt.height,st.depth,pt,yt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Ht,yt.width,yt.height,st.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?H&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,yt.width,yt.height,st.depth,pt,Et,yt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Ht,yt.width,yt.height,st.depth,0,pt,Et,yt.data)}else{Vt&&te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,kt[0].width,kt[0].height);for(let rt=0,ft=kt.length;rt<ft;rt++)yt=kt[rt],v.format!==vn?pt!==null?Vt?H&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,pt,yt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Ht,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?H&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,pt,Et,yt.data):e.texImage2D(n.TEXTURE_2D,rt,Ht,yt.width,yt.height,0,pt,Et,yt.data)}else if(v.isDataArrayTexture)if(Vt){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Ht,st.width,st.height,st.depth),H)if(v.layerUpdates.size>0){const rt=kh(st.width,st.height,v.format,v.type);for(const ft of v.layerUpdates){const St=st.data.subarray(ft*rt/st.data.BYTES_PER_ELEMENT,(ft+1)*rt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ft,st.width,st.height,1,pt,Et,St)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,pt,Et,st.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ht,st.width,st.height,st.depth,0,pt,Et,st.data);else if(v.isData3DTexture)Vt?(te&&e.texStorage3D(n.TEXTURE_3D,bt,Ht,st.width,st.height,st.depth),H&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,pt,Et,st.data)):e.texImage3D(n.TEXTURE_3D,0,Ht,st.width,st.height,st.depth,0,pt,Et,st.data);else if(v.isFramebufferTexture){if(te)if(Vt)e.texStorage2D(n.TEXTURE_2D,bt,Ht,st.width,st.height);else{let rt=st.width,ft=st.height;for(let St=0;St<bt;St++)e.texImage2D(n.TEXTURE_2D,St,Ht,rt,ft,0,pt,Et,null),rt>>=1,ft>>=1}}else if(kt.length>0){if(Vt&&te){const rt=k(kt[0]);e.texStorage2D(n.TEXTURE_2D,bt,Ht,rt.width,rt.height)}for(let rt=0,ft=kt.length;rt<ft;rt++)yt=kt[rt],Vt?H&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,pt,Et,yt):e.texImage2D(n.TEXTURE_2D,rt,Ht,pt,Et,yt);v.generateMipmaps=!1}else if(Vt){if(te){const rt=k(st);e.texStorage2D(n.TEXTURE_2D,bt,Ht,rt.width,rt.height)}H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,Et,st)}else e.texImage2D(n.TEXTURE_2D,0,Ht,pt,Et,st);m(v)&&p(B),vt.__version=W.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function _t(x,v,C){if(v.image.length!==6)return;const B=Qt(x,v),V=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+C);const W=i.get(V);if(V.version!==W.__version||B===!0){e.activeTexture(n.TEXTURE0+C);const vt=ee.getPrimaries(ee.workingColorSpace),ct=v.colorSpace===Ci?null:ee.getPrimaries(v.colorSpace),dt=v.colorSpace===Ci||vt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Pt=v.isCompressedTexture||v.image[0].isCompressedTexture,st=v.image[0]&&v.image[0].isDataTexture,pt=[];for(let ft=0;ft<6;ft++)!Pt&&!st?pt[ft]=_(v.image[ft],!0,s.maxCubemapSize):pt[ft]=st?v.image[ft].image:v.image[ft],pt[ft]=X(v,pt[ft]);const Et=pt[0],Ht=r.convert(v.format,v.colorSpace),yt=r.convert(v.type),kt=w(v.internalFormat,Ht,yt,v.colorSpace),Vt=v.isVideoTexture!==!0,te=W.__version===void 0||B===!0,H=V.dataReady;let bt=N(v,Et);Ft(n.TEXTURE_CUBE_MAP,v);let rt;if(Pt){Vt&&te&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,kt,Et.width,Et.height);for(let ft=0;ft<6;ft++){rt=pt[ft].mipmaps;for(let St=0;St<rt.length;St++){const wt=rt[St];v.format!==vn?Ht!==null?Vt?H&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,Ht,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,kt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,Ht,yt,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,kt,wt.width,wt.height,0,Ht,yt,wt.data)}}}else{if(rt=v.mipmaps,Vt&&te){rt.length>0&&bt++;const ft=k(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,kt,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(st){Vt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,pt[ft].width,pt[ft].height,Ht,yt,pt[ft].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,kt,pt[ft].width,pt[ft].height,0,Ht,yt,pt[ft].data);for(let St=0;St<rt.length;St++){const Gt=rt[St].image[ft].image;Vt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Gt.width,Gt.height,Ht,yt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,kt,Gt.width,Gt.height,0,Ht,yt,Gt.data)}}else{Vt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Ht,yt,pt[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,kt,Ht,yt,pt[ft]);for(let St=0;St<rt.length;St++){const wt=rt[St];Vt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Ht,yt,wt.image[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,kt,Ht,yt,wt.image[ft])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),W.__version=V.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function Tt(x,v,C,B,V,W){const vt=r.convert(C.format,C.colorSpace),ct=r.convert(C.type),dt=w(C.internalFormat,vt,ct,C.colorSpace),Pt=i.get(v),st=i.get(C);if(st.__renderTarget=v,!Pt.__hasExternalTextures){const pt=Math.max(1,v.width>>W),Et=Math.max(1,v.height>>W);V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?e.texImage3D(V,W,dt,pt,Et,v.depth,0,vt,ct,null):e.texImage2D(V,W,dt,pt,Et,0,vt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,x),J(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,B,V,st.__webglTexture,0,tt(v)):(V===n.TEXTURE_2D||V>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&V<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,B,V,st.__webglTexture,W),e.bindFramebuffer(n.FRAMEBUFFER,null)}function z(x,v,C){if(n.bindRenderbuffer(n.RENDERBUFFER,x),v.depthBuffer){const B=v.depthTexture,V=B&&B.isDepthTexture?B.type:null,W=M(v.stencilBuffer,V),vt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=tt(v);J(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,W,v.width,v.height):C?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,W,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,W,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,x)}else{const B=v.textures;for(let V=0;V<B.length;V++){const W=B[V],vt=r.convert(W.format,W.colorSpace),ct=r.convert(W.type),dt=w(W.internalFormat,vt,ct,W.colorSpace),Pt=tt(v);C&&J(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,dt,v.width,v.height):J(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt,dt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,dt,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(x,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,x),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=i.get(v.depthTexture);B.__renderTarget=v,(!B.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);const V=B.__webglTexture,W=tt(v);if(v.depthTexture.format===Ys)J(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,V,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,V,0);else if(v.depthTexture.format===rr)J(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,V,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function lt(x){const v=i.get(x),C=x.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==x.depthTexture){const B=x.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),B){const V=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,B.removeEventListener("dispose",V)};B.addEventListener("dispose",V),v.__depthDisposeCallback=V}v.__boundDepthTexture=B}if(x.depthTexture&&!v.__autoAllocateDepthBuffer){if(C)throw new Error("target.depthTexture not supported in Cube render targets");ut(v.__webglFramebuffer,x)}else if(C){v.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[B]),v.__webglDepthbuffer[B]===void 0)v.__webglDepthbuffer[B]=n.createRenderbuffer(),z(v.__webglDepthbuffer[B],x,!1);else{const V=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=v.__webglDepthbuffer[B];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,V,n.RENDERBUFFER,W)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),z(v.__webglDepthbuffer,x,!1);else{const B=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,V),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,V)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(x,v,C){const B=i.get(x);v!==void 0&&Tt(B.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),C!==void 0&&lt(x)}function ht(x){const v=x.texture,C=i.get(x),B=i.get(v);x.addEventListener("dispose",D);const V=x.textures,W=x.isWebGLCubeRenderTarget===!0,vt=V.length>1;if(vt||(B.__webglTexture===void 0&&(B.__webglTexture=n.createTexture()),B.__version=v.version,o.memory.textures++),W){C.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0){C.__webglFramebuffer[ct]=[];for(let dt=0;dt<v.mipmaps.length;dt++)C.__webglFramebuffer[ct][dt]=n.createFramebuffer()}else C.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){C.__webglFramebuffer=[];for(let ct=0;ct<v.mipmaps.length;ct++)C.__webglFramebuffer[ct]=n.createFramebuffer()}else C.__webglFramebuffer=n.createFramebuffer();if(vt)for(let ct=0,dt=V.length;ct<dt;ct++){const Pt=i.get(V[ct]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=n.createTexture(),o.memory.textures++)}if(x.samples>0&&J(x)===!1){C.__webglMultisampledFramebuffer=n.createFramebuffer(),C.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let ct=0;ct<V.length;ct++){const dt=V[ct];C.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,C.__webglColorRenderbuffer[ct]);const Pt=r.convert(dt.format,dt.colorSpace),st=r.convert(dt.type),pt=w(dt.internalFormat,Pt,st,dt.colorSpace,x.isXRRenderTarget===!0),Et=tt(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,pt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,C.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(C.__webglDepthRenderbuffer=n.createRenderbuffer(),z(C.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,v);for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)Tt(C.__webglFramebuffer[ct][dt],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt);else Tt(C.__webglFramebuffer[ct],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(v)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let ct=0,dt=V.length;ct<dt;ct++){const Pt=V[ct],st=i.get(Pt);e.bindTexture(n.TEXTURE_2D,st.__webglTexture),Ft(n.TEXTURE_2D,Pt),Tt(C.__webglFramebuffer,x,Pt,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),m(Pt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ct=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,B.__webglTexture),Ft(ct,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)Tt(C.__webglFramebuffer[dt],x,v,n.COLOR_ATTACHMENT0,ct,dt);else Tt(C.__webglFramebuffer,x,v,n.COLOR_ATTACHMENT0,ct,0);m(v)&&p(ct),e.unbindTexture()}x.depthBuffer&&lt(x)}function E(x){const v=x.textures;for(let C=0,B=v.length;C<B;C++){const V=v[C];if(m(V)){const W=b(x),vt=i.get(V).__webglTexture;e.bindTexture(W,vt),p(W),e.unbindTexture()}}}const P=[],y=[];function Q(x){if(x.samples>0){if(J(x)===!1){const v=x.textures,C=x.width,B=x.height;let V=n.COLOR_BUFFER_BIT;const W=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(x),ct=v.length>1;if(ct)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(V|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(V|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[dt]);const Pt=i.get(v[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pt,0)}n.blitFramebuffer(0,0,C,B,0,0,C,B,V,n.NEAREST),l===!0&&(P.length=0,y.length=0,P.push(n.COLOR_ATTACHMENT0+dt),x.depthBuffer&&x.resolveDepthBuffer===!1&&(P.push(W),y.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,P))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,vt.__webglColorRenderbuffer[dt]);const Pt=i.get(v[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const v=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function tt(x){return Math.min(s.maxSamples,x.samples)}function J(x){const v=i.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ot(x){const v=o.render.frame;u.get(x)!==v&&(u.set(x,v),x.update())}function X(x,v){const C=x.colorSpace,B=x.format,V=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||C!==lr&&C!==Ci&&(ee.getTransfer(C)===ce?(B!==vn||V!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",C)),v}function k(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=et,this.setTextureCube=Y,this.rebindTextures=gt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=E,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=J}function zb(n,t){function e(i,s=Ci){let r;const o=ee.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===yu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Mu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===tm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Jp)return n.BYTE;if(i===Qp)return n.SHORT;if(i===$r)return n.UNSIGNED_SHORT;if(i===xu)return n.INT;if(i===ls)return n.UNSIGNED_INT;if(i===oi)return n.FLOAT;if(i===ci)return n.HALF_FLOAT;if(i===em)return n.ALPHA;if(i===nm)return n.RGB;if(i===vn)return n.RGBA;if(i===im)return n.LUMINANCE;if(i===sm)return n.LUMINANCE_ALPHA;if(i===Ys)return n.DEPTH_COMPONENT;if(i===rr)return n.DEPTH_STENCIL;if(i===rm)return n.RED;if(i===Su)return n.RED_INTEGER;if(i===om)return n.RG;if(i===Eu)return n.RG_INTEGER;if(i===bu)return n.RGBA_INTEGER;if(i===$o||i===Ko||i===Zo||i===Jo)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===$o)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===$o)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Jo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===mc||i===gc||i===_c||i===vc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_c)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xc||i===yc||i===Mc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===xc||i===yc)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Mc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Sc||i===Ec||i===bc||i===Tc||i===Ac||i===wc||i===Rc||i===Cc||i===Pc||i===Dc||i===Ic||i===Lc||i===Uc||i===Nc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Sc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ec)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===bc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Tc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ac)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===wc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Rc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Cc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Pc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Dc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ic)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Lc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Uc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Nc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Qo||i===Oc||i===Fc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Qo)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===am||i===Bc||i===zc||i===kc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Qo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===zc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===sr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class kb extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class zs extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hb={type:"move"};class Il{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new zs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Vb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gb=`
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

}`;class Wb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Je,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ke({vertexShader:Vb,fragmentShader:Gb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new ka(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xb extends ds{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new Wb,m=e.getContextAttributes();let p=null,b=null;const w=[],M=[],N=new zt;let I=null;const D=new _n;D.viewport=new Me;const L=new _n;L.viewport=new Me;const T=[D,L],S=new kb;let R=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let _t=w[at];return _t===void 0&&(_t=new Il,w[at]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(at){let _t=w[at];return _t===void 0&&(_t=new Il,w[at]=_t),_t.getGripSpace()},this.getHand=function(at){let _t=w[at];return _t===void 0&&(_t=new Il,w[at]=_t),_t.getHandSpace()};function F(at){const _t=M.indexOf(at.inputSource);if(_t===-1)return;const Tt=w[_t];Tt!==void 0&&(Tt.update(at.inputSource,at.frame,c||o),Tt.dispatchEvent({type:at.type,data:at.inputSource}))}function O(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",G);for(let at=0;at<w.length;at++){const _t=M[at];_t!==null&&(M[at]=null,w[at].disconnect(_t))}R=null,U=null,_.reset(),t.setRenderTarget(p),d=null,h=null,f=null,s=null,b=null,Qt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){r=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){a=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(at){c=at},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(at){if(s=at,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",O),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const _t={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Pn(d.framebufferWidth,d.framebufferHeight,{format:vn,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let _t=null,Tt=null,z=null;m.depth&&(z=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=m.stencil?rr:Ys,Tt=m.stencil?sr:ls);const ut={colorFormat:e.RGBA8,depthFormat:z,scaleFactor:r};f=new XRWebGLBinding(s,e),h=f.createProjectionLayer(ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),b=new Pn(h.textureWidth,h.textureHeight,{format:vn,type:Gn,depthTexture:new ym(h.textureWidth,h.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Qt.setContext(s),Qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function G(at){for(let _t=0;_t<at.removed.length;_t++){const Tt=at.removed[_t],z=M.indexOf(Tt);z>=0&&(M[z]=null,w[z].disconnect(Tt))}for(let _t=0;_t<at.added.length;_t++){const Tt=at.added[_t];let z=M.indexOf(Tt);if(z===-1){for(let lt=0;lt<w.length;lt++)if(lt>=M.length){M.push(Tt),z=lt;break}else if(M[lt]===null){M[lt]=Tt,z=lt;break}if(z===-1)break}const ut=w[z];ut&&ut.connect(Tt)}}const K=new q,et=new q;function Y(at,_t,Tt){K.setFromMatrixPosition(_t.matrixWorld),et.setFromMatrixPosition(Tt.matrixWorld);const z=K.distanceTo(et),ut=_t.projectionMatrix.elements,lt=Tt.projectionMatrix.elements,gt=ut[14]/(ut[10]-1),ht=ut[14]/(ut[10]+1),E=(ut[9]+1)/ut[5],P=(ut[9]-1)/ut[5],y=(ut[8]-1)/ut[0],Q=(lt[8]+1)/lt[0],tt=gt*y,J=gt*Q,ot=z/(-y+Q),X=ot*-y;if(_t.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(X),at.translateZ(ot),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),ut[10]===-1)at.projectionMatrix.copy(_t.projectionMatrix),at.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const k=gt+ot,x=ht+ot,v=tt-X,C=J+(z-X),B=E*ht/x*k,V=P*ht/x*k;at.projectionMatrix.makePerspective(v,C,B,V,k,x),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function mt(at,_t){_t===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(_t.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(s===null)return;let _t=at.near,Tt=at.far;_.texture!==null&&(_.depthNear>0&&(_t=_.depthNear),_.depthFar>0&&(Tt=_.depthFar)),S.near=L.near=D.near=_t,S.far=L.far=D.far=Tt,(R!==S.near||U!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,U=S.far),D.layers.mask=at.layers.mask|2,L.layers.mask=at.layers.mask|4,S.layers.mask=D.layers.mask|L.layers.mask;const z=at.parent,ut=S.cameras;mt(S,z);for(let lt=0;lt<ut.length;lt++)mt(ut[lt],z);ut.length===2?Y(S,D,L):S.projectionMatrix.copy(D.projectionMatrix),Mt(at,S,z)};function Mt(at,_t,Tt){Tt===null?at.matrix.copy(_t.matrixWorld):(at.matrix.copy(Tt.matrixWorld),at.matrix.invert(),at.matrix.multiply(_t.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(_t.projectionMatrix),at.projectionMatrixInverse.copy(_t.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=Hc*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(at){l=at,h!==null&&(h.fixedFoveation=at),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=at)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let Ct=null;function Ft(at,_t){if(u=_t.getViewerPose(c||o),g=_t,u!==null){const Tt=u.views;d!==null&&(t.setRenderTargetFramebuffer(b,d.framebuffer),t.setRenderTarget(b));let z=!1;Tt.length!==S.cameras.length&&(S.cameras.length=0,z=!0);for(let lt=0;lt<Tt.length;lt++){const gt=Tt[lt];let ht=null;if(d!==null)ht=d.getViewport(gt);else{const P=f.getViewSubImage(h,gt);ht=P.viewport,lt===0&&(t.setRenderTargetTextures(b,P.colorTexture,h.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(b))}let E=T[lt];E===void 0&&(E=new _n,E.layers.enable(lt),E.viewport=new Me,T[lt]=E),E.matrix.fromArray(gt.transform.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale),E.projectionMatrix.fromArray(gt.projectionMatrix),E.projectionMatrixInverse.copy(E.projectionMatrix).invert(),E.viewport.set(ht.x,ht.y,ht.width,ht.height),lt===0&&(S.matrix.copy(E.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),z===!0&&S.cameras.push(E)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const lt=f.getDepthInformation(Tt[0]);lt&&lt.isValid&&lt.texture&&_.init(t,lt,s.renderState)}}for(let Tt=0;Tt<w.length;Tt++){const z=M[Tt],ut=w[Tt];z!==null&&ut!==void 0&&ut.update(z,_t,c||o)}Ct&&Ct(at,_t),_t.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_t}),g=null}const Qt=new xm;Qt.setAnimationLoop(Ft),this.setAnimationLoop=function(at){Ct=at},this.dispose=function(){}}}const Yi=new Wn,jb=new de;function qb(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,gm(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,w,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===on&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===on&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),w=b.envMap,M=b.envMapRotation;w&&(m.envMap.value=w,Yi.copy(M),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),m.envMapRotation.value.setFromMatrix4(jb.makeRotationFromEuler(Yi)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===on&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Yb(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,w){const M=w.program;i.uniformBlockBinding(b,M)}function c(b,w){let M=s[b.id];M===void 0&&(g(b),M=u(b),s[b.id]=M,b.addEventListener("dispose",m));const N=w.program;i.updateUBOMapping(b,N);const I=t.render.frame;r[b.id]!==I&&(h(b),r[b.id]=I)}function u(b){const w=f();b.__bindingPointIndex=w;const M=n.createBuffer(),N=b.__size,I=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,N,I),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const w=s[b.id],M=b.uniforms,N=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let I=0,D=M.length;I<D;I++){const L=Array.isArray(M[I])?M[I]:[M[I]];for(let T=0,S=L.length;T<S;T++){const R=L[T];if(d(R,I,T,N)===!0){const U=R.__offset,F=Array.isArray(R.value)?R.value:[R.value];let O=0;for(let G=0;G<F.length;G++){const K=F[G],et=_(K);typeof K=="number"||typeof K=="boolean"?(R.__data[0]=K,n.bufferSubData(n.UNIFORM_BUFFER,U+O,R.__data)):K.isMatrix3?(R.__data[0]=K.elements[0],R.__data[1]=K.elements[1],R.__data[2]=K.elements[2],R.__data[3]=0,R.__data[4]=K.elements[3],R.__data[5]=K.elements[4],R.__data[6]=K.elements[5],R.__data[7]=0,R.__data[8]=K.elements[6],R.__data[9]=K.elements[7],R.__data[10]=K.elements[8],R.__data[11]=0):(K.toArray(R.__data,O),O+=et.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(b,w,M,N){const I=b.value,D=w+"_"+M;if(N[D]===void 0)return typeof I=="number"||typeof I=="boolean"?N[D]=I:N[D]=I.clone(),!0;{const L=N[D];if(typeof I=="number"||typeof I=="boolean"){if(L!==I)return N[D]=I,!0}else if(L.equals(I)===!1)return L.copy(I),!0}return!1}function g(b){const w=b.uniforms;let M=0;const N=16;for(let D=0,L=w.length;D<L;D++){const T=Array.isArray(w[D])?w[D]:[w[D]];for(let S=0,R=T.length;S<R;S++){const U=T[S],F=Array.isArray(U.value)?U.value:[U.value];for(let O=0,G=F.length;O<G;O++){const K=F[O],et=_(K),Y=M%N,mt=Y%et.boundary,Mt=Y+mt;M+=mt,Mt!==0&&N-Mt<et.storage&&(M+=N-Mt),U.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=M,M+=et.storage}}}const I=M%N;return I>0&&(M+=N-I),b.__size=M,b.__cache={},this}function _(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),w}function m(b){const w=b.target;w.removeEventListener("dispose",m);const M=o.indexOf(w.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const b in s)n.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class $b{constructor(t={}){const{canvas:e=Bx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=sn,this.toneMapping=Li,this.toneMappingExposure=1;const M=this;let N=!1,I=0,D=0,L=null,T=-1,S=null;const R=new Me,U=new Me;let F=null;const O=new qt(0);let G=0,K=e.width,et=e.height,Y=1,mt=null,Mt=null;const Ct=new Me(0,0,K,et),Ft=new Me(0,0,K,et);let Qt=!1;const at=new Au;let _t=!1,Tt=!1;const z=new de,ut=new de,lt=new q,gt=new Me,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let E=!1;function P(){return L===null?Y:1}let y=i;function Q(A,j){return e.getContext(A,j)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_u}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",wt,!1),y===null){const j="webgl2";if(y=Q(j,A),y===null)throw Q(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let tt,J,ot,X,k,x,v,C,B,V,W,vt,ct,dt,Pt,st,pt,Et,Ht,yt,kt,Vt,te,H;function bt(){tt=new tE(y),tt.init(),Vt=new zb(y,tt),J=new YS(y,tt,t,Vt),ot=new Ob(y,tt),J.reverseDepthBuffer&&h&&ot.buffers.depth.setReversed(!0),X=new iE(y),k=new Mb,x=new Bb(y,tt,ot,k,J,Vt,X),v=new KS(M),C=new QS(M),B=new uy(y),te=new jS(y,B),V=new eE(y,B,X,te),W=new rE(y,V,B,X),Ht=new sE(y,J,x),st=new $S(k),vt=new yb(M,v,C,tt,J,te,st),ct=new qb(M,k),dt=new Eb,Pt=new Cb(tt),Et=new XS(M,v,C,ot,W,d,l),pt=new Ub(M,W,J),H=new Yb(y,X,J,ot),yt=new qS(y,tt,X),kt=new nE(y,tt,X),X.programs=vt.programs,M.capabilities=J,M.extensions=tt,M.properties=k,M.renderLists=dt,M.shadowMap=pt,M.state=ot,M.info=X}bt();const rt=new Xb(M,y);this.xr=rt,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const A=tt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=tt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(A){A!==void 0&&(Y=A,this.setSize(K,et,!1))},this.getSize=function(A){return A.set(K,et)},this.setSize=function(A,j,nt=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=A,et=j,e.width=Math.floor(A*Y),e.height=Math.floor(j*Y),nt===!0&&(e.style.width=A+"px",e.style.height=j+"px"),this.setViewport(0,0,A,j)},this.getDrawingBufferSize=function(A){return A.set(K*Y,et*Y).floor()},this.setDrawingBufferSize=function(A,j,nt){K=A,et=j,Y=nt,e.width=Math.floor(A*nt),e.height=Math.floor(j*nt),this.setViewport(0,0,A,j)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(Ct)},this.setViewport=function(A,j,nt,it){A.isVector4?Ct.set(A.x,A.y,A.z,A.w):Ct.set(A,j,nt,it),ot.viewport(R.copy(Ct).multiplyScalar(Y).round())},this.getScissor=function(A){return A.copy(Ft)},this.setScissor=function(A,j,nt,it){A.isVector4?Ft.set(A.x,A.y,A.z,A.w):Ft.set(A,j,nt,it),ot.scissor(U.copy(Ft).multiplyScalar(Y).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(A){ot.setScissorTest(Qt=A)},this.setOpaqueSort=function(A){mt=A},this.setTransparentSort=function(A){Mt=A},this.getClearColor=function(A){return A.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(A=!0,j=!0,nt=!0){let it=0;if(A){let $=!1;if(L!==null){const xt=L.texture.format;$=xt===bu||xt===Eu||xt===Su}if($){const xt=L.texture.type,Rt=xt===Gn||xt===ls||xt===$r||xt===sr||xt===yu||xt===Mu,Lt=Et.getClearColor(),Ut=Et.getClearAlpha(),jt=Lt.r,$t=Lt.g,Nt=Lt.b;Rt?(g[0]=jt,g[1]=$t,g[2]=Nt,g[3]=Ut,y.clearBufferuiv(y.COLOR,0,g)):(_[0]=jt,_[1]=$t,_[2]=Nt,_[3]=Ut,y.clearBufferiv(y.COLOR,0,_))}else it|=y.COLOR_BUFFER_BIT}j&&(it|=y.DEPTH_BUFFER_BIT),nt&&(it|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),dt.dispose(),Pt.dispose(),k.dispose(),v.dispose(),C.dispose(),W.dispose(),te.dispose(),H.dispose(),vt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",ao),rt.removeEventListener("sessionend",lo),Xn.stop()};function ft(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const A=X.autoReset,j=pt.enabled,nt=pt.autoUpdate,it=pt.needsUpdate,$=pt.type;bt(),X.autoReset=A,pt.enabled=j,pt.autoUpdate=nt,pt.needsUpdate=it,pt.type=$}function wt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Gt(A){const j=A.target;j.removeEventListener("dispose",Gt),ve(j)}function ve(A){De(A),k.remove(A)}function De(A){const j=k.get(A).programs;j!==void 0&&(j.forEach(function(nt){vt.releaseProgram(nt)}),A.isShaderMaterial&&vt.releaseShaderCache(A))}this.renderBufferDirect=function(A,j,nt,it,$,xt){j===null&&(j=ht);const Rt=$.isMesh&&$.matrixWorld.determinant()<0,Lt=Lm(A,j,nt,it,$);ot.setMaterial(it,Rt);let Ut=nt.index,jt=1;if(it.wireframe===!0){if(Ut=V.getWireframeAttribute(nt),Ut===void 0)return;jt=2}const $t=nt.drawRange,Nt=nt.attributes.position;let ne=$t.start*jt,pe=($t.start+$t.count)*jt;xt!==null&&(ne=Math.max(ne,xt.start*jt),pe=Math.min(pe,(xt.start+xt.count)*jt)),Ut!==null?(ne=Math.max(ne,0),pe=Math.min(pe,Ut.count)):Nt!=null&&(ne=Math.max(ne,0),pe=Math.min(pe,Nt.count));const ge=pe-ne;if(ge<0||ge===1/0)return;te.setup($,it,Lt,nt,Ut);let tn,se=yt;if(Ut!==null&&(tn=B.get(Ut),se=kt,se.setIndex(tn)),$.isMesh)it.wireframe===!0?(ot.setLineWidth(it.wireframeLinewidth*P()),se.setMode(y.LINES)):se.setMode(y.TRIANGLES);else if($.isLine){let Bt=it.linewidth;Bt===void 0&&(Bt=1),ot.setLineWidth(Bt*P()),$.isLineSegments?se.setMode(y.LINES):$.isLineLoop?se.setMode(y.LINE_LOOP):se.setMode(y.LINE_STRIP)}else $.isPoints?se.setMode(y.POINTS):$.isSprite&&se.setMode(y.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)se.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))se.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Bt=$._multiDrawStarts,qn=$._multiDrawCounts,re=$._multiDrawCount,Sn=Ut?B.get(Ut).bytesPerElement:1,gs=k.get(it).currentProgram.getUniforms();for(let an=0;an<re;an++)gs.setValue(y,"_gl_DrawID",an),se.render(Bt[an]/Sn,qn[an])}else if($.isInstancedMesh)se.renderInstances(ne,ge,$.count);else if(nt.isInstancedBufferGeometry){const Bt=nt._maxInstanceCount!==void 0?nt._maxInstanceCount:1/0,qn=Math.min(nt.instanceCount,Bt);se.renderInstances(ne,ge,qn)}else se.render(ne,ge)};function ie(A,j,nt){A.transparent===!0&&A.side===An&&A.forceSinglePass===!1?(A.side=on,A.needsUpdate=!0,fo(A,j,nt),A.side=Bi,A.needsUpdate=!0,fo(A,j,nt),A.side=An):fo(A,j,nt)}this.compile=function(A,j,nt=null){nt===null&&(nt=A),p=Pt.get(nt),p.init(j),w.push(p),nt.traverseVisible(function($){$.isLight&&$.layers.test(j.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),A!==nt&&A.traverseVisible(function($){$.isLight&&$.layers.test(j.layers)&&(p.pushLight($),$.castShadow&&p.pushShadow($))}),p.setupLights();const it=new Set;return A.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const xt=$.material;if(xt)if(Array.isArray(xt))for(let Rt=0;Rt<xt.length;Rt++){const Lt=xt[Rt];ie(Lt,nt,$),it.add(Lt)}else ie(xt,nt,$),it.add(xt)}),w.pop(),p=null,it},this.compileAsync=function(A,j,nt=null){const it=this.compile(A,j,nt);return new Promise($=>{function xt(){if(it.forEach(function(Rt){k.get(Rt).currentProgram.isReady()&&it.delete(Rt)}),it.size===0){$(A);return}setTimeout(xt,10)}tt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Ge=null;function Qe(A){Ge&&Ge(A)}function ao(){Xn.stop()}function lo(){Xn.start()}const Xn=new xm;Xn.setAnimationLoop(Qe),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(A){Ge=A,rt.setAnimationLoop(A),A===null?Xn.stop():Xn.start()},rt.addEventListener("sessionstart",ao),rt.addEventListener("sessionend",lo),this.render=function(A,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(j),j=rt.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,j,L),p=Pt.get(A,w.length),p.init(j),w.push(p),ut.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),at.setFromProjectionMatrix(ut),Tt=this.localClippingEnabled,_t=st.init(this.clippingPlanes,Tt),m=dt.get(A,b.length),m.init(),b.push(m),rt.enabled===!0&&rt.isPresenting===!0){const xt=M.xr.getDepthSensingMesh();xt!==null&&jn(xt,j,-1/0,M.sortObjects)}jn(A,j,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(mt,Mt),E=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,E&&Et.addToRenderList(m,A),this.info.render.frame++,_t===!0&&st.beginShadows();const nt=p.state.shadowsArray;pt.render(nt,A,j),_t===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const it=m.opaque,$=m.transmissive;if(p.setupLights(),j.isArrayCamera){const xt=j.cameras;if($.length>0)for(let Rt=0,Lt=xt.length;Rt<Lt;Rt++){const Ut=xt[Rt];uo(it,$,A,Ut)}E&&Et.render(A);for(let Rt=0,Lt=xt.length;Rt<Lt;Rt++){const Ut=xt[Rt];co(m,A,Ut,Ut.viewport)}}else $.length>0&&uo(it,$,A,j),E&&Et.render(A),co(m,A,j);L!==null&&(x.updateMultisampleRenderTarget(L),x.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(M,A,j),te.resetDefaultState(),T=-1,S=null,w.pop(),w.length>0?(p=w[w.length-1],_t===!0&&st.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function jn(A,j,nt,it){if(A.visible===!1)return;if(A.layers.test(j.layers)){if(A.isGroup)nt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(j);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||at.intersectsSprite(A)){it&&gt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ut);const Rt=W.update(A),Lt=A.material;Lt.visible&&m.push(A,Rt,Lt,nt,gt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||at.intersectsObject(A))){const Rt=W.update(A),Lt=A.material;if(it&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),gt.copy(A.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),gt.copy(Rt.boundingSphere.center)),gt.applyMatrix4(A.matrixWorld).applyMatrix4(ut)),Array.isArray(Lt)){const Ut=Rt.groups;for(let jt=0,$t=Ut.length;jt<$t;jt++){const Nt=Ut[jt],ne=Lt[Nt.materialIndex];ne&&ne.visible&&m.push(A,Rt,ne,nt,gt.z,Nt)}}else Lt.visible&&m.push(A,Rt,Lt,nt,gt.z,null)}}const xt=A.children;for(let Rt=0,Lt=xt.length;Rt<Lt;Rt++)jn(xt[Rt],j,nt,it)}function co(A,j,nt,it){const $=A.opaque,xt=A.transmissive,Rt=A.transparent;p.setupLightsView(nt),_t===!0&&st.setGlobalState(M.clippingPlanes,nt),it&&ot.viewport(R.copy(it)),$.length>0&&ms($,j,nt),xt.length>0&&ms(xt,j,nt),Rt.length>0&&ms(Rt,j,nt),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function uo(A,j,nt,it){if((nt.isScene===!0?nt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[it.id]===void 0&&(p.state.transmissionRenderTarget[it.id]=new Pn(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?ci:Gn,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const xt=p.state.transmissionRenderTarget[it.id],Rt=it.viewport||R;xt.setSize(Rt.z,Rt.w);const Lt=M.getRenderTarget();M.setRenderTarget(xt),M.getClearColor(O),G=M.getClearAlpha(),G<1&&M.setClearColor(16777215,.5),M.clear(),E&&Et.render(nt);const Ut=M.toneMapping;M.toneMapping=Li;const jt=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),p.setupLightsView(it),_t===!0&&st.setGlobalState(M.clippingPlanes,it),ms(A,nt,it),x.updateMultisampleRenderTarget(xt),x.updateRenderTargetMipmap(xt),tt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Nt=0,ne=j.length;Nt<ne;Nt++){const pe=j[Nt],ge=pe.object,tn=pe.geometry,se=pe.material,Bt=pe.group;if(se.side===An&&ge.layers.test(it.layers)){const qn=se.side;se.side=on,se.needsUpdate=!0,Ou(ge,nt,it,tn,se,Bt),se.side=qn,se.needsUpdate=!0,$t=!0}}$t===!0&&(x.updateMultisampleRenderTarget(xt),x.updateRenderTargetMipmap(xt))}M.setRenderTarget(Lt),M.setClearColor(O,G),jt!==void 0&&(it.viewport=jt),M.toneMapping=Ut}function ms(A,j,nt){const it=j.isScene===!0?j.overrideMaterial:null;for(let $=0,xt=A.length;$<xt;$++){const Rt=A[$],Lt=Rt.object,Ut=Rt.geometry,jt=it===null?Rt.material:it,$t=Rt.group;Lt.layers.test(nt.layers)&&Ou(Lt,j,nt,Ut,jt,$t)}}function Ou(A,j,nt,it,$,xt){A.onBeforeRender(M,j,nt,it,$,xt),A.modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),$.onBeforeRender(M,j,nt,it,A,xt),$.transparent===!0&&$.side===An&&$.forceSinglePass===!1?($.side=on,$.needsUpdate=!0,M.renderBufferDirect(nt,j,it,$,A,xt),$.side=Bi,$.needsUpdate=!0,M.renderBufferDirect(nt,j,it,$,A,xt),$.side=An):M.renderBufferDirect(nt,j,it,$,A,xt),A.onAfterRender(M,j,nt,it,$,xt)}function fo(A,j,nt){j.isScene!==!0&&(j=ht);const it=k.get(A),$=p.state.lights,xt=p.state.shadowsArray,Rt=$.state.version,Lt=vt.getParameters(A,$.state,xt,j,nt),Ut=vt.getProgramCacheKey(Lt);let jt=it.programs;it.environment=A.isMeshStandardMaterial?j.environment:null,it.fog=j.fog,it.envMap=(A.isMeshStandardMaterial?C:v).get(A.envMap||it.environment),it.envMapRotation=it.environment!==null&&A.envMap===null?j.environmentRotation:A.envMapRotation,jt===void 0&&(A.addEventListener("dispose",Gt),jt=new Map,it.programs=jt);let $t=jt.get(Ut);if($t!==void 0){if(it.currentProgram===$t&&it.lightsStateVersion===Rt)return Bu(A,Lt),$t}else Lt.uniforms=vt.getUniforms(A),A.onBeforeCompile(Lt,M),$t=vt.acquireProgram(Lt,Ut),jt.set(Ut,$t),it.uniforms=Lt.uniforms;const Nt=it.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Nt.clippingPlanes=st.uniform),Bu(A,Lt),it.needsLights=Nm(A),it.lightsStateVersion=Rt,it.needsLights&&(Nt.ambientLightColor.value=$.state.ambient,Nt.lightProbe.value=$.state.probe,Nt.directionalLights.value=$.state.directional,Nt.directionalLightShadows.value=$.state.directionalShadow,Nt.spotLights.value=$.state.spot,Nt.spotLightShadows.value=$.state.spotShadow,Nt.rectAreaLights.value=$.state.rectArea,Nt.ltc_1.value=$.state.rectAreaLTC1,Nt.ltc_2.value=$.state.rectAreaLTC2,Nt.pointLights.value=$.state.point,Nt.pointLightShadows.value=$.state.pointShadow,Nt.hemisphereLights.value=$.state.hemi,Nt.directionalShadowMap.value=$.state.directionalShadowMap,Nt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Nt.spotShadowMap.value=$.state.spotShadowMap,Nt.spotLightMatrix.value=$.state.spotLightMatrix,Nt.spotLightMap.value=$.state.spotLightMap,Nt.pointShadowMap.value=$.state.pointShadowMap,Nt.pointShadowMatrix.value=$.state.pointShadowMatrix),it.currentProgram=$t,it.uniformsList=null,$t}function Fu(A){if(A.uniformsList===null){const j=A.currentProgram.getUniforms();A.uniformsList=ea.seqWithValue(j.seq,A.uniforms)}return A.uniformsList}function Bu(A,j){const nt=k.get(A);nt.outputColorSpace=j.outputColorSpace,nt.batching=j.batching,nt.batchingColor=j.batchingColor,nt.instancing=j.instancing,nt.instancingColor=j.instancingColor,nt.instancingMorph=j.instancingMorph,nt.skinning=j.skinning,nt.morphTargets=j.morphTargets,nt.morphNormals=j.morphNormals,nt.morphColors=j.morphColors,nt.morphTargetsCount=j.morphTargetsCount,nt.numClippingPlanes=j.numClippingPlanes,nt.numIntersection=j.numClipIntersection,nt.vertexAlphas=j.vertexAlphas,nt.vertexTangents=j.vertexTangents,nt.toneMapping=j.toneMapping}function Lm(A,j,nt,it,$){j.isScene!==!0&&(j=ht),x.resetTextureUnits();const xt=j.fog,Rt=it.isMeshStandardMaterial?j.environment:null,Lt=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:lr,Ut=(it.isMeshStandardMaterial?C:v).get(it.envMap||Rt),jt=it.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,$t=!!nt.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),Nt=!!nt.morphAttributes.position,ne=!!nt.morphAttributes.normal,pe=!!nt.morphAttributes.color;let ge=Li;it.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ge=M.toneMapping);const tn=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,se=tn!==void 0?tn.length:0,Bt=k.get(it),qn=p.state.lights;if(_t===!0&&(Tt===!0||A!==S)){const pn=A===S&&it.id===T;st.setState(it,A,pn)}let re=!1;it.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==qn.state.version||Bt.outputColorSpace!==Lt||$.isBatchedMesh&&Bt.batching===!1||!$.isBatchedMesh&&Bt.batching===!0||$.isBatchedMesh&&Bt.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Bt.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Bt.instancing===!1||!$.isInstancedMesh&&Bt.instancing===!0||$.isSkinnedMesh&&Bt.skinning===!1||!$.isSkinnedMesh&&Bt.skinning===!0||$.isInstancedMesh&&Bt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Bt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Bt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Bt.instancingMorph===!1&&$.morphTexture!==null||Bt.envMap!==Ut||it.fog===!0&&Bt.fog!==xt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==st.numPlanes||Bt.numIntersection!==st.numIntersection)||Bt.vertexAlphas!==jt||Bt.vertexTangents!==$t||Bt.morphTargets!==Nt||Bt.morphNormals!==ne||Bt.morphColors!==pe||Bt.toneMapping!==ge||Bt.morphTargetsCount!==se)&&(re=!0):(re=!0,Bt.__version=it.version);let Sn=Bt.currentProgram;re===!0&&(Sn=fo(it,j,$));let gs=!1,an=!1,hr=!1;const _e=Sn.getUniforms(),Ln=Bt.uniforms;if(ot.useProgram(Sn.program)&&(gs=!0,an=!0,hr=!0),it.id!==T&&(T=it.id,an=!0),gs||S!==A){ot.buffers.depth.getReversed()?(z.copy(A.projectionMatrix),kx(z),Hx(z),_e.setValue(y,"projectionMatrix",z)):_e.setValue(y,"projectionMatrix",A.projectionMatrix),_e.setValue(y,"viewMatrix",A.matrixWorldInverse);const gi=_e.map.cameraPosition;gi!==void 0&&gi.setValue(y,lt.setFromMatrixPosition(A.matrixWorld)),J.logarithmicDepthBuffer&&_e.setValue(y,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&_e.setValue(y,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,an=!0,hr=!0)}if($.isSkinnedMesh){_e.setOptional(y,$,"bindMatrix"),_e.setOptional(y,$,"bindMatrixInverse");const pn=$.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),_e.setValue(y,"boneTexture",pn.boneTexture,x))}$.isBatchedMesh&&(_e.setOptional(y,$,"batchingTexture"),_e.setValue(y,"batchingTexture",$._matricesTexture,x),_e.setOptional(y,$,"batchingIdTexture"),_e.setValue(y,"batchingIdTexture",$._indirectTexture,x),_e.setOptional(y,$,"batchingColorTexture"),$._colorsTexture!==null&&_e.setValue(y,"batchingColorTexture",$._colorsTexture,x));const dr=nt.morphAttributes;if((dr.position!==void 0||dr.normal!==void 0||dr.color!==void 0)&&Ht.update($,nt,Sn),(an||Bt.receiveShadow!==$.receiveShadow)&&(Bt.receiveShadow=$.receiveShadow,_e.setValue(y,"receiveShadow",$.receiveShadow)),it.isMeshGouraudMaterial&&it.envMap!==null&&(Ln.envMap.value=Ut,Ln.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),it.isMeshStandardMaterial&&it.envMap===null&&j.environment!==null&&(Ln.envMapIntensity.value=j.environmentIntensity),an&&(_e.setValue(y,"toneMappingExposure",M.toneMappingExposure),Bt.needsLights&&Um(Ln,hr),xt&&it.fog===!0&&ct.refreshFogUniforms(Ln,xt),ct.refreshMaterialUniforms(Ln,it,Y,et,p.state.transmissionRenderTarget[A.id]),ea.upload(y,Fu(Bt),Ln,x)),it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(ea.upload(y,Fu(Bt),Ln,x),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&_e.setValue(y,"center",$.center),_e.setValue(y,"modelViewMatrix",$.modelViewMatrix),_e.setValue(y,"normalMatrix",$.normalMatrix),_e.setValue(y,"modelMatrix",$.matrixWorld),it.isShaderMaterial||it.isRawShaderMaterial){const pn=it.uniformsGroups;for(let gi=0,_i=pn.length;gi<_i;gi++){const zu=pn[gi];H.update(zu,Sn),H.bind(zu,Sn)}}return Sn}function Um(A,j){A.ambientLightColor.needsUpdate=j,A.lightProbe.needsUpdate=j,A.directionalLights.needsUpdate=j,A.directionalLightShadows.needsUpdate=j,A.pointLights.needsUpdate=j,A.pointLightShadows.needsUpdate=j,A.spotLights.needsUpdate=j,A.spotLightShadows.needsUpdate=j,A.rectAreaLights.needsUpdate=j,A.hemisphereLights.needsUpdate=j}function Nm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,j,nt){k.get(A.texture).__webglTexture=j,k.get(A.depthTexture).__webglTexture=nt;const it=k.get(A);it.__hasExternalTextures=!0,it.__autoAllocateDepthBuffer=nt===void 0,it.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),it.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,j){const nt=k.get(A);nt.__webglFramebuffer=j,nt.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(A,j=0,nt=0){L=A,I=j,D=nt;let it=!0,$=null,xt=!1,Rt=!1;if(A){const Ut=k.get(A);if(Ut.__useDefaultFramebuffer!==void 0)ot.bindFramebuffer(y.FRAMEBUFFER,null),it=!1;else if(Ut.__webglFramebuffer===void 0)x.setupRenderTarget(A);else if(Ut.__hasExternalTextures)x.rebindTextures(A,k.get(A.texture).__webglTexture,k.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Nt=A.depthTexture;if(Ut.__boundDepthTexture!==Nt){if(Nt!==null&&k.has(Nt)&&(A.width!==Nt.image.width||A.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(A)}}const jt=A.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Rt=!0);const $t=k.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray($t[j])?$=$t[j][nt]:$=$t[j],xt=!0):A.samples>0&&x.useMultisampledRTT(A)===!1?$=k.get(A).__webglMultisampledFramebuffer:Array.isArray($t)?$=$t[nt]:$=$t,R.copy(A.viewport),U.copy(A.scissor),F=A.scissorTest}else R.copy(Ct).multiplyScalar(Y).floor(),U.copy(Ft).multiplyScalar(Y).floor(),F=Qt;if(ot.bindFramebuffer(y.FRAMEBUFFER,$)&&it&&ot.drawBuffers(A,$),ot.viewport(R),ot.scissor(U),ot.setScissorTest(F),xt){const Ut=k.get(A.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ut.__webglTexture,nt)}else if(Rt){const Ut=k.get(A.texture),jt=j||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,Ut.__webglTexture,nt||0,jt)}T=-1},this.readRenderTargetPixels=function(A,j,nt,it,$,xt,Rt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=k.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt){ot.bindFramebuffer(y.FRAMEBUFFER,Lt);try{const Ut=A.texture,jt=Ut.format,$t=Ut.type;if(!J.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=A.width-it&&nt>=0&&nt<=A.height-$&&y.readPixels(j,nt,it,$,Vt.convert(jt),Vt.convert($t),xt)}finally{const Ut=L!==null?k.get(L).__webglFramebuffer:null;ot.bindFramebuffer(y.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(A,j,nt,it,$,xt,Rt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=k.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Rt!==void 0&&(Lt=Lt[Rt]),Lt){const Ut=A.texture,jt=Ut.format,$t=Ut.type;if(!J.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=A.width-it&&nt>=0&&nt<=A.height-$){ot.bindFramebuffer(y.FRAMEBUFFER,Lt);const Nt=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,Nt),y.bufferData(y.PIXEL_PACK_BUFFER,xt.byteLength,y.STREAM_READ),y.readPixels(j,nt,it,$,Vt.convert(jt),Vt.convert($t),0);const ne=L!==null?k.get(L).__webglFramebuffer:null;ot.bindFramebuffer(y.FRAMEBUFFER,ne);const pe=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await zx(y,pe,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,Nt),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,xt),y.deleteBuffer(Nt),y.deleteSync(pe),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,j=null,nt=0){A.isTexture!==!0&&(Cr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,A=arguments[1]);const it=Math.pow(2,-nt),$=Math.floor(A.image.width*it),xt=Math.floor(A.image.height*it),Rt=j!==null?j.x:0,Lt=j!==null?j.y:0;x.setTexture2D(A,0),y.copyTexSubImage2D(y.TEXTURE_2D,nt,0,0,Rt,Lt,$,xt),ot.unbindTexture()},this.copyTextureToTexture=function(A,j,nt=null,it=null,$=0){A.isTexture!==!0&&(Cr("WebGLRenderer: copyTextureToTexture function signature has changed."),it=arguments[0]||null,A=arguments[1],j=arguments[2],$=arguments[3]||0,nt=null);let xt,Rt,Lt,Ut,jt,$t,Nt,ne,pe;const ge=A.isCompressedTexture?A.mipmaps[$]:A.image;nt!==null?(xt=nt.max.x-nt.min.x,Rt=nt.max.y-nt.min.y,Lt=nt.isBox3?nt.max.z-nt.min.z:1,Ut=nt.min.x,jt=nt.min.y,$t=nt.isBox3?nt.min.z:0):(xt=ge.width,Rt=ge.height,Lt=ge.depth||1,Ut=0,jt=0,$t=0),it!==null?(Nt=it.x,ne=it.y,pe=it.z):(Nt=0,ne=0,pe=0);const tn=Vt.convert(j.format),se=Vt.convert(j.type);let Bt;j.isData3DTexture?(x.setTexture3D(j,0),Bt=y.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(x.setTexture2DArray(j,0),Bt=y.TEXTURE_2D_ARRAY):(x.setTexture2D(j,0),Bt=y.TEXTURE_2D),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,j.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,j.unpackAlignment);const qn=y.getParameter(y.UNPACK_ROW_LENGTH),re=y.getParameter(y.UNPACK_IMAGE_HEIGHT),Sn=y.getParameter(y.UNPACK_SKIP_PIXELS),gs=y.getParameter(y.UNPACK_SKIP_ROWS),an=y.getParameter(y.UNPACK_SKIP_IMAGES);y.pixelStorei(y.UNPACK_ROW_LENGTH,ge.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,ge.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Ut),y.pixelStorei(y.UNPACK_SKIP_ROWS,jt),y.pixelStorei(y.UNPACK_SKIP_IMAGES,$t);const hr=A.isDataArrayTexture||A.isData3DTexture,_e=j.isDataArrayTexture||j.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Ln=k.get(A),dr=k.get(j),pn=k.get(Ln.__renderTarget),gi=k.get(dr.__renderTarget);ot.bindFramebuffer(y.READ_FRAMEBUFFER,pn.__webglFramebuffer),ot.bindFramebuffer(y.DRAW_FRAMEBUFFER,gi.__webglFramebuffer);for(let _i=0;_i<Lt;_i++)hr&&y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,k.get(A).__webglTexture,$,$t+_i),A.isDepthTexture?(_e&&y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,k.get(j).__webglTexture,$,pe+_i),y.blitFramebuffer(Ut,jt,xt,Rt,Nt,ne,xt,Rt,y.DEPTH_BUFFER_BIT,y.NEAREST)):_e?y.copyTexSubImage3D(Bt,$,Nt,ne,pe+_i,Ut,jt,xt,Rt):y.copyTexSubImage2D(Bt,$,Nt,ne,pe+_i,Ut,jt,xt,Rt);ot.bindFramebuffer(y.READ_FRAMEBUFFER,null),ot.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else _e?A.isDataTexture||A.isData3DTexture?y.texSubImage3D(Bt,$,Nt,ne,pe,xt,Rt,Lt,tn,se,ge.data):j.isCompressedArrayTexture?y.compressedTexSubImage3D(Bt,$,Nt,ne,pe,xt,Rt,Lt,tn,ge.data):y.texSubImage3D(Bt,$,Nt,ne,pe,xt,Rt,Lt,tn,se,ge):A.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,$,Nt,ne,xt,Rt,tn,se,ge.data):A.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,$,Nt,ne,ge.width,ge.height,tn,ge.data):y.texSubImage2D(y.TEXTURE_2D,$,Nt,ne,xt,Rt,tn,se,ge);y.pixelStorei(y.UNPACK_ROW_LENGTH,qn),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,re),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Sn),y.pixelStorei(y.UNPACK_SKIP_ROWS,gs),y.pixelStorei(y.UNPACK_SKIP_IMAGES,an),$===0&&j.generateMipmaps&&y.generateMipmap(Bt),ot.unbindTexture()},this.copyTextureToTexture3D=function(A,j,nt=null,it=null,$=0){return A.isTexture!==!0&&(Cr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),nt=arguments[0]||null,it=arguments[1]||null,A=arguments[2],j=arguments[3],$=arguments[4]||0),Cr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,j,nt,it,$)},this.initRenderTarget=function(A){k.get(A).__webglFramebuffer===void 0&&x.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?x.setTextureCube(A,0):A.isData3DTexture?x.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?x.setTexture2DArray(A,0):x.setTexture2D(A,0),ot.unbindTexture()},this.resetState=function(){I=0,D=0,L=null,ot.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class Cu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new Cu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Kb extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Zb extends Je{constructor(t=null,e=1,i=1,s,r,o,a,l,c=dn,u=dn,f,h){super(null,o,a,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gc extends ps{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ga=new q,_a=new q,Hh=new de,br=new ro,Bo=new cr,Ll=new q,Vh=new q;class Jb extends be{constructor(t=new Ve,e=new Gc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)ga.fromBufferAttribute(e,s-1),_a.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=ga.distanceTo(_a);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bo.copy(i.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=r,t.ray.intersectsSphere(Bo)===!1)return;Hh.copy(s).invert(),br.copy(t.ray).applyMatrix4(Hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),b=u.getX(_+1),w=zo(this,t,br,l,p,b);w&&e.push(w)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=zo(this,t,br,l,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=zo(this,t,br,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=zo(this,t,br,l,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zo(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(ga.fromBufferAttribute(o,s),_a.fromBufferAttribute(o,r),e.distanceSqToSegment(ga,_a,Ll,Vh)>i)return;Ll.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ll);if(!(l<t.near||l>t.far))return{distance:l,point:Vh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const Gh=new q,Wh=new q;class Xh extends Jb{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Gh.fromBufferAttribute(e,s),Wh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Gh.distanceTo(Wh);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qb extends ps{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const jh=new de,Wc=new ro,ko=new cr,Ho=new q;class tT extends be{constructor(t=new Ve,e=new Qb){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(s),ko.radius+=r,t.ray.intersectsSphere(ko)===!1)return;jh.copy(s).invert(),Wc.copy(t.ray).applyMatrix4(jh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);Ho.fromBufferAttribute(f,m),qh(Ho,m,l,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)Ho.fromBufferAttribute(f,g),qh(Ho,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function qh(n,t,e,i,s,r,o){const a=Wc.distanceSqToPoint(n);if(a<e){const l=new q;Wc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Pu extends Ve{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let f=t;const h=(e-t)/s,d=new q,g=new zt;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=r+m/i*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const b=p+m,w=b,M=b+i+1,N=b+i+2,I=b+1;a.push(w,M,I),a.push(M,N,I)}}this.setIndex(a),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ks extends Ve{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new q,h=new q,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const b=[],w=p/i;let M=0;p===0&&o===0?M=.5/e:p===i&&l===Math.PI&&(M=-.5/e);for(let N=0;N<=e;N++){const I=N/e;f.x=-t*Math.cos(s+I*r)*Math.sin(o+w*a),f.y=t*Math.cos(o+w*a),f.z=t*Math.sin(s+I*r)*Math.sin(o+w*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(I+M,1-w),b.push(c++)}u.push(b)}for(let p=0;p<i;p++)for(let b=0;b<e;b++){const w=u[p][b+1],M=u[p][b],N=u[p+1][b],I=u[p+1][b+1];(p!==0||o>0)&&d.push(w,M,I),(p!==i-1||l<Math.PI)&&d.push(M,N,I)}this.setIndex(d),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ks(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Du extends Ve{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new q,f=new q,h=new q;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){const _=g/s*r,m=d/i*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,b=(s+1)*d+g;o.push(_,m,b),o.push(m,p,b)}this.setIndex(o),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Du(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class eT extends ke{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Yh extends ps{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=lm,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Tm extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class nT extends Tm{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ul=new de,$h=new q,Kh=new q;class iT{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Au,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;$h.setFromMatrixPosition(t.matrixWorld),e.position.copy($h),Kh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Kh),e.updateMatrixWorld(),Ul.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ul)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class sT extends iT{constructor(){super(new wu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zh extends Tm{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new sT}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Am{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Jh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Jh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Jh(){return performance.now()}const Qh=new de;class rT{constructor(t,e,i=0,s=1/0){this.ray=new ro(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Tu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Qh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qh),this}intersectObject(t,e=!0,i=[]){return Xc(t,this,i,e),i.sort(td),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Xc(t[s],this,i,e);return i.sort(td),i}}function td(n,t){return n.distance-t.distance}function Xc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Xc(r[o],t,e,!0)}}class ed{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos($e(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class oT extends ds{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_u}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_u);const nd={type:"change"},Iu={type:"start"},wm={type:"end"},Vo=new ro,id=new Ri,aT=Math.cos(70*Fx.DEG2RAD),Te=new q,nn=2*Math.PI,fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nl=1e-6;class lT extends oT{constructor(t,e=null){super(t,e),this.state=fe.NONE,this.enabled=!0,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xs.ROTATE,MIDDLE:Xs.DOLLY,RIGHT:Xs.PAN},this.touches={ONE:Fs.ROTATE,TWO:Fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new q,this._lastQuaternion=new cs,this._lastTargetPosition=new q,this._quat=new cs().setFromUnitVectors(t.up,new q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ed,this._sphericalDelta=new ed,this._scale=1,this._panOffset=new q,this._rotateStart=new zt,this._rotateEnd=new zt,this._rotateDelta=new zt,this._panStart=new zt,this._panEnd=new zt,this._panDelta=new zt,this._dollyStart=new zt,this._dollyEnd=new zt,this._dollyDelta=new zt,this._dollyDirection=new q,this._mouse=new zt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uT.bind(this),this._onPointerDown=cT.bind(this),this._onPointerUp=fT.bind(this),this._onContextMenu=vT.bind(this),this._onMouseWheel=pT.bind(this),this._onKeyDown=mT.bind(this),this._onTouchStart=gT.bind(this),this._onTouchMove=_T.bind(this),this._onMouseDown=hT.bind(this),this._onMouseMove=dT.bind(this),this._interceptControlDown=xT.bind(this),this._interceptControlUp=yT.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nd),this.update(),this.state=fe.NONE}update(t=null){const e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=nn:i>Math.PI&&(i-=nn),s<-Math.PI?s+=nn:s>Math.PI&&(s-=nn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Te.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new q(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new q(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Vo.origin.copy(this.object.position),Vo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vo.direction))<aT?this.object.lookAt(this.target):(id.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vo.intersectPlane(id,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Nl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nl||this._lastTargetPosition.distanceToSquared(this.target)>Nl?(this.dispatchEvent(nd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?nn/60*this.autoRotateSpeed*t:nn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-nn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new zt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function cT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function uT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function fT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(wm),this.state=fe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function hT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Xs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=fe.DOLLY;break;case Xs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}break;case Xs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(Iu)}function dT(n){switch(this.state){case fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function pT(n){this.enabled===!1||this.enableZoom===!1||this.state!==fe.NONE||(n.preventDefault(),this.dispatchEvent(Iu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(wm))}function mT(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function gT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=fe.TOUCH_ROTATE;break;case Fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=fe.TOUCH_PAN;break;default:this.state=fe.NONE}break;case 2:switch(this.touches.TWO){case Fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=fe.TOUCH_DOLLY_PAN;break;case Fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=fe.TOUCH_DOLLY_ROTATE;break;default:this.state=fe.NONE}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(Iu)}function _T(n){switch(this._trackPointer(n),this.state){case fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=fe.NONE}}function vT(n){this.enabled!==!1&&n.preventDefault()}function xT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Rm={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class fr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const MT=new wu(-1,1,1,-1,0,1);class ST extends Ve{constructor(){super(),this.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Se([0,2,0,0,2,0],2))}}const ET=new ST;class Lu{constructor(t){this._mesh=new we(ET,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,MT)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class bT extends fr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ke?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Kr.clone(t.uniforms),this.material=new ke({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Lu(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class sd extends fr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class TT extends fr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class AT{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new zt);this._width=i.width,this._height=i.height,e=new Pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ci}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new bT(Rm),this.copyPass.material.blending=li,this.clock=new Am}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}sd!==void 0&&(o instanceof sd?i=!0:o instanceof TT&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const wT={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class RT extends fr{constructor(){super();const t=wT;this.uniforms=Kr.clone(t.uniforms),this.material=new eT({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Lu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===jp?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===qp?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===vu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===$p?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Kp&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class CT extends fr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new qt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const PT={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ar extends fr{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new qt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Pn(r,o,{type:ci}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const h=new Pn(r,o,{type:ci});h.texture.name="UnrealBloomPass.h"+f,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new Pn(r,o,{type:ci});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=PT;this.highPassUniforms=Kr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ke({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new zt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new q(1,1,1),new q(1,1,1),new q(1,1,1),new q(1,1,1),new q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Rm;this.copyUniforms=Kr.clone(u.uniforms),this.blendMaterial=new ke({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:qs,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new qt,this.oldClearAlpha=1,this.basic=new gn,this.fsQuad=new Lu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new zt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ar.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ar.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new ke({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new ke({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ar.BlurDirectionX=new zt(1,0);ar.BlurDirectionY=new zt(0,1);class Tr extends be{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new zt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Is=new q,rd=new de,od=new de,ad=new q,ld=new q;class DT{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),rd.copy(_.matrixWorldInverse),od.multiplyMatrices(_.projectionMatrix,rd),u(g,g,_),d(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Is.setFromMatrixPosition(g.matrixWorld),Is.applyMatrix4(od);const p=Is.z>=-1&&Is.z<=1&&g.layers.test(m.layers)===!0,b=g.element;b.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,m),b.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Is.x*r+r)+"px,"+(-Is.y*o+o)+"px)",b.parentNode!==l&&l.appendChild(b),g.onAfterRender(e,_,m));const w={distanceToCameraSquared:f(m,g)};a.objects.set(g,w)}for(let p=0,b=g.children.length;p<b;p++)u(g.children[p],_,m)}function f(g,_){return ad.setFromMatrixPosition(g.matrixWorld),ld.setFromMatrixPosition(_.matrixWorld),ad.distanceToSquared(ld)}function h(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function d(g){const _=h(g).sort(function(p,b){if(p.renderOrder!==b.renderOrder)return b.renderOrder-p.renderOrder;const w=a.objects.get(p).distanceToCameraSquared,M=a.objects.get(b).distanceToCameraSquared;return w-M}),m=_.length;for(let p=0,b=_.length;p<b;p++)_[p].element.style.zIndex=m-p}}}const IT="v5";function LT(n,t){return`${IT}-${n}-${t}`}const va=new Map;function cd(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function UT(n){return n-Math.floor(n)}function Go(n,t,e){return UT(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function jc(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=Go(i,s,e),u=Go(i+1,s,e),f=Go(i,s+1,e),h=Go(i+1,s+1,e);return c+(u-c)*a+(f-c)*l+(h-f-(u-c))*a*l}function NT(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*jc(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function OT(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function FT(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,f=NT(c*4.2+t*.002,u*4.2-t*.001,t),d=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,jc(c*14,u*14,t+11)-.38),1.4),_=jc(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*f)*d*(1-g*.55)*_;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[p,b,w]=OT(e,r,m),M=(a*n+l)*4;s[M]=p,s[M+1]=b,s[M+2]=w,s[M+3]=255}const o=new Zb(s,n,n);return o.format=vn,o.type=Gn,o.colorSpace=sn,o.wrapS=Yr,o.wrapT=Yr,o.generateMipmaps=!0,o.minFilter=Di,o.magFilter=Rn,o.flipY=!0,o.needsUpdate=!0,o}function BT(n,t){const e=cd(n)%14,i=LT(t,e);let s=va.get(i);if(!s){const r=cd(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=FT(256,r,o,t),va.set(i,s)}return{map:s}}function zT(){for(const n of va.values())n.dispose();va.clear()}const kT=461586,HT=4874368,VT=9103615,ud=12101887,GT=4873336,WT=6091007,fd=13165823,XT=10205416,jT=1.35,qT=4e3,YT=["热度/年薪","强度/竞争","学历门槛","学科技能"];function Uu(n,t,e,i,s){const r=n.clientWidth||window.innerWidth,o=n.clientHeight||window.innerHeight,a=new Kb;a.background=new qt(kT),a.fog=new Cu(HT,.032);const l=new _n(55,r/o,.1,200);l.position.set(12,10,16);const c=new $b({antialias:!0,alpha:!1,powerPreference:"high-performance"});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(r,o),c.outputColorSpace=sn,c.toneMapping=vu,c.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(c.domElement);const u=document.createElement("div");u.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(u);const f=new DT({element:u});f.setSize(r,o);const h=Math.min(window.devicePixelRatio,2),d=new AT(c);d.setPixelRatio(h);const g=new CT(a,l),_=new zt(Math.max(128,Math.floor(r*h/2)),Math.max(128,Math.floor(o*h/2))),m=new ar(_,.34,.34,.88),p=new RT;d.addPass(g),d.addPass(m),d.addPass(p);const b=new nT(9088744,1382432,.62);a.add(b);const w=new Zh(15791871,.55);w.position.set(8,14,10),a.add(w);const M=new Zh(6324424,.22);M.position.set(-12,-2,-8),a.add(M);const N=new lT(l,c.domElement);N.enableDamping=!0,N.dampingFactor=.06,N.minDistance=4,N.maxDistance=48,N.autoRotate=!0,N.autoRotateSpeed=jT;let I=null,D=!1;const L=()=>{I!==null&&(window.clearTimeout(I),I=null)},T=()=>{L(),I=window.setTimeout(()=>{D||(N.autoRotate=!0)},qT)},S=()=>{D=!0,N.autoRotate=!1,L()},R=()=>{D=!1,T()},U=()=>{N.autoRotate=!1,T()},F=Math.min(1,Math.max(0,(s==null?void 0:s.ambientStarBoost)??0)),O=new Map,G=new Map;let K=null,et=null;const mt=(()=>{const X=Math.min(9200,Math.floor(1100+F*7200)),k=new Float32Array(X*3),x=new Float32Array(X);for(let W=0;W<X;W++){const vt=Math.random(),ct=Math.random(),dt=2*Math.PI*vt,Pt=Math.acos(2*ct-1),st=26+Math.random()*78,pt=Math.sin(Pt);k[W*3]=st*pt*Math.cos(dt),k[W*3+1]=st*pt*Math.sin(dt),k[W*3+2]=st*Math.cos(Pt);const Et=.04+Math.random()*.12+F*.06;x[W]=Math.min(.26,Et)}const v=new Ve;v.setAttribute("position",new Mn(k,3)),v.setAttribute("size",new Mn(x,1));const C=.42+F*.58,B=new ke({uniforms:{uColor:{value:new qt(XT)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uAlphaMul:{value:C}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:qs}),V=new tT(v,B);return V.frustumCulled=!1,a.add(V),V})(),Mt=(X,k,x)=>{X.traverse(v=>{v instanceof Tr||(v.userData.nodeId=k,v.userData.nodeType=x)})},Ct=(X,k)=>{const x=document.createElement("div");x.textContent=X,x.setAttribute("role","presentation");const v=k==="fusion",C=v?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",B=v?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",V=v?"#f4ecff":"#eaf6ff";return x.style.cssText=[`max-width:${v?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${V}`,`background:${C}`,`border:${B}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),x},Ft=X=>{const k=document.createElement("div");return k.textContent=X,k.setAttribute("role","presentation"),k.style.cssText=["max-width: 52px","padding: 2px 5px","border-radius: 5px","font-size: 8px","font-weight: 650","line-height: 1.2","text-align: center","letter-spacing: 0.01em","color: #ede6ff","background: rgba(28, 20, 42, 0.82)","border: 1px solid rgba(200, 170, 255, 0.42)","box-shadow: 0 1px 5px rgba(0,0,0,0.35)","text-shadow: 0 1px 2px rgba(0,0,0,0.7)","display: -webkit-box","-webkit-box-orient: vertical","-webkit-line-clamp: 2","overflow: hidden","word-break: break-all","overflow-wrap: anywhere","opacity: 0","visibility: hidden","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),k},Qt=(X,k,x)=>{const v=X==="major",C=new zs,B=v?"major":"fusion",{map:V}=BT(k,B),W=v?.23:.15,vt=new ks(W,v?48:36,v?32:26),ct=new gn({map:V,color:new qt(16777215),transparent:!0,opacity:1,fog:!1}),dt=new we(vt,ct);dt.userData.part="core",C.add(dt);const Pt=v?VT:ud,st=new ks(W*1.52,18,14),pt=new gn({color:Pt,transparent:!0,opacity:v?.045:.032,depthWrite:!1,blending:qs,fog:!1}),Et=new we(st,pt);if(Et.renderOrder=-1,Et.userData.part="glow",C.add(Et),v){const kt=new gn({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:An,fog:!1}),Vt=(H,bt,rt)=>{const ft=new Du(H,bt,10,80),St=new we(ft,kt.clone());return St.rotation.x=Math.PI/2,St.rotation.z=rt,St.userData.part="ring",St};C.add(Vt(.46,.014,Math.random()*Math.PI));const te=Vt(.38,.01,Math.PI/2.8);te.rotation.y=Math.PI/3.2,C.add(te)}else{const kt=Math.max(W*5.55,.78),Vt=kt*1.2,te=kt*.82,H=kt*1.22,bt=new Pu(te,H,80),rt=new gn({color:ud,transparent:!0,opacity:.5,depthWrite:!1,side:An,fog:!1,blending:qs}),ft=new we(bt,rt);ft.rotation.x=Math.PI/2,ft.renderOrder=0,ft.userData.part="ring",C.add(ft);const St=Math.max(W*.34,.052),wt=[.02,.14,.55,.42];for(let Gt=0;Gt<4;Gt++){const ve=new ks(St,14,12),De=new qt().setHSL(wt[Gt],.55,.62),ie=new gn({color:De,transparent:!0,opacity:.94,fog:!1}),Ge=new we(ve,ie),Qe=Gt/4*Math.PI*2-Math.PI/4,ao=Math.cos(Qe)*kt,lo=Math.sin(Qe)*kt;Ge.position.set(ao,0,lo),Ge.userData.part="satellite",C.add(Ge);const Xn=Ft(YT[Gt]),jn=new Tr(Xn),co=Math.cos(Qe)*Vt,uo=Math.sin(Qe)*Vt,ms=St*.55+Gt%2*.018;jn.position.set(co,ms,uo),jn.center.set(.5,1),jn.renderOrder=8,jn.userData.isFusionQuadrantLabel=!0,C.add(jn)}}const Ht=Ct(x,X),yt=new Tr(Ht);return yt.position.set(0,W*1.38,0),yt.center.set(.5,1),yt.renderOrder=10,yt.userData.isNodeLabel=!0,C.add(yt),C.userData.nodeVisual={core:dt,glow:Et},C};for(const X of t.nodes){const k=t.layout[X.id];if(!k)continue;const x=Qt(X.type,X.id,X.label);x.position.set(k.x,k.y,k.z),x.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),x.userData.nodeId=X.id,x.userData.nodeType=X.type,Mt(x,X.id,X.type),a.add(x),O.set(X.id,x)}const at=(X,k)=>X<k?`${X}|${k}`:`${k}|${X}`,_t=()=>{const X=[];for(const v of t.edges){const C=t.layout[v.u],B=t.layout[v.v];!C||!B||X.push(C.x,C.y,C.z,B.x,B.y,B.z)}const k=new Ve;k.setAttribute("position",new Se(X,3));const x=new Gc({color:GT,transparent:!0,opacity:.32,depthWrite:!1});return new Xh(k,x)},Tt=X=>{const k=[...X],x=[],v=new Set(t.edges.map(V=>at(V.u,V.v)));for(let V=0;V<k.length-1;V++){const W=k[V],vt=k[V+1];if(!v.has(at(W,vt)))continue;const ct=t.layout[W],dt=t.layout[vt];!ct||!dt||x.push(ct.x,ct.y,ct.z,dt.x,dt.y,dt.z)}const C=new Ve;C.setAttribute("position",new Se(x,3));const B=new Gc({color:WT,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new Xh(C,B)};K=_t(),a.add(K),et=Tt(e.pathIds),a.add(et);const z=new zs;a.add(z),(()=>{for(;z.children.length;)z.remove(z.children[0]);G.clear();const X=new ks(1,20,20);for(const k of t.hyperedges){const x=[];for(const vt of k.member_node_ids){const ct=t.layout[vt];ct&&x.push(new q(ct.x,ct.y,ct.z))}if(!x.length)continue;const v=new us().setFromPoints(x),C=new cr;v.getBoundingSphere(C);const B=new gn({color:fd,transparent:!0,opacity:.07,depthWrite:!1}),V=new we(X,B);V.position.copy(C.center);const W=Math.max(C.radius*1.45,.65);V.scale.setScalar(W),V.userData.hyperedgeId=k.id,z.add(V),G.set(k.id,V)}})();const lt=new rT,gt=new zt,ht=(X,k)=>{const x=c.domElement.getBoundingClientRect();gt.x=(X-x.left)/x.width*2-1,gt.y=-((k-x.top)/x.height)*2+1,lt.setFromCamera(gt,l);const v=[...O.values()],B=lt.intersectObjects(v,!0).find(W=>W.object instanceof we&&typeof W.object.userData.nodeId=="string");if(!B){i(null);return}const V=B.object.userData.nodeId;i(V??null)},E=X=>{X.button===0&&(S(),ht(X.clientX,X.clientY))};c.domElement.addEventListener("pointerdown",E),c.domElement.addEventListener("pointerup",R),c.domElement.addEventListener("wheel",U,{passive:!0}),c.domElement.addEventListener("touchstart",S,{passive:!0}),c.domElement.addEventListener("touchend",R,{passive:!0}),N.addEventListener("start",S),N.addEventListener("end",R);let P=0;const y=new Am,Q=()=>{const X=y.getDelta(),k=y.getElapsedTime();N.update();for(const x of O.values())x.rotation.y+=X*.1,x.rotation.z+=X*.02*Math.sin(k*.6+x.position.x*.2);d.render(),f.render(a,l),P=requestAnimationFrame(Q)};Q();const tt=()=>{const X=n.clientWidth||window.innerWidth,k=n.clientHeight||window.innerHeight;l.aspect=X/k,l.updateProjectionMatrix(),c.setSize(X,k),d.setSize(X,k),f.setSize(X,k),mt.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",tt);const J=X=>{et&&(a.remove(et),et.geometry.dispose(),et.material.dispose(),et=Tt(X.pathIds),a.add(et));const k=new Set([...X.pathIds,...X.hyperMemberIds]);for(const[x,v]of O){const C=X.pathIds.has(x),B=X.hyperMemberIds.has(x),V=X.selectedId===x,W=!k.has(x)&&(X.pathIds.size>0||X.hyperMemberIds.size>0),vt=W?.32:1,ct=v.userData.nodeType||"major";v.traverse(dt=>{if(dt instanceof Tr&&dt.userData.isNodeLabel){const st=dt.element;let pt=W?.36:.96;(C||B)&&(pt=Math.max(pt,.94)),V&&(pt=1),st.style.opacity=String(pt),st.style.filter=V?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":C||B?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",st.style.fontWeight=V?"800":"650",dt.renderOrder=V?20:10;return}if(dt instanceof Tr&&dt.userData.isFusionQuadrantLabel){const st=dt.element;if(!(ct==="fusion"&&V)){st.style.opacity="0",st.style.visibility="hidden",dt.renderOrder=1;return}st.style.visibility="visible";let Et=W?.3:.92;(C||B)&&(Et=Math.max(Et,.9)),V&&(Et=1),st.style.opacity=String(Et),st.style.filter=V?"drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))":C||B?"drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))":"none",dt.renderOrder=V?18:8;return}if(!(dt instanceof we))return;const Pt=dt.material;if(Pt instanceof gn&&(dt.userData.part||"other")==="core"){let pt=W?.34:1;(C||B)&&(pt=Math.max(pt,.98)),V&&(pt=1),Pt.opacity=pt,Pt.transparent=pt<.999,Pt.color.set(V?16777215:C||B?15924223:16777215);return}if(Pt instanceof Yh){let st=W?.38:1,pt=ct==="major"?.11:.09;(C||B)&&(st=Math.max(st,.98),pt=.26),V&&(pt=.38,st=1),W&&(pt*=.55),Pt.transparent=st<.999,Pt.opacity=st,Pt.emissiveIntensity=pt}else if(Pt instanceof gn){const st=dt.userData.part||"other";let pt=.42;st==="glow"?pt=ct==="major"?.048:.036:st==="shard"?pt=.36:st==="ring"?pt=ct==="major"?.48:.52:st==="satellite"&&(pt=.9);let Et=pt*vt;(C||B)&&(st==="glow"||st==="shard"?Et=Math.max(Et,.22):Et=Math.max(Et,.82)),V&&(st==="glow"||st==="shard"||st==="satellite")&&(Et=Math.max(Et,.34)),V&&st==="ring"&&ct==="fusion"&&(Et=Math.max(Et,.78)),Pt.opacity=Et,Pt.transparent=!0}})}for(const[x,v]of G){const C=v.material,B=X.activeHyperedgeIds.has(x);C.opacity=B?.22:.06,C.color=new qt(B?14216447:fd)}};return J(e),{dispose(){L(),cancelAnimationFrame(P),window.removeEventListener("resize",tt),c.domElement.removeEventListener("pointerdown",E),c.domElement.removeEventListener("pointerup",R),c.domElement.removeEventListener("wheel",U),c.domElement.removeEventListener("touchstart",S),c.domElement.removeEventListener("touchend",R),N.removeEventListener("start",S),N.removeEventListener("end",R);for(const X of O.values())a.remove(X),X.traverse(k=>{var x;if(k instanceof we){const v=Array.isArray(k.material)?k.material:[k.material];for(const C of v)C instanceof Yh?(C.map=null,C.bumpMap=null,C.roughnessMap=null):C instanceof gn&&(C.map=null),C==null||C.dispose();(x=k.geometry)==null||x.dispose()}});O.clear(),K&&(a.remove(K),K.geometry.dispose(),K.material.dispose(),K=null),et&&(a.remove(et),et.geometry.dispose(),et.material.dispose(),et=null);for(const X of G.values())z.remove(X),X.geometry.dispose(),X.material.dispose();G.clear(),a.remove(z),a.remove(mt),mt.geometry.dispose(),mt.material.dispose(),m.dispose(),p.dispose(),d.dispose(),zT(),u.parentElement===n&&n.removeChild(u),N.dispose(),c.dispose(),c.domElement.parentElement&&c.domElement.parentElement.removeChild(c.domElement)},setVisualState(X){J(X)},frameBounds:X=>{const k=[];for(const V of X){const W=t.layout[V];W&&k.push(new q(W.x,W.y,W.z))}if(!k.length)return;const x=new us().setFromPoints(k),v=new q;x.getCenter(v);const C=new q;x.getSize(C);const B=Math.max(C.length()*.65,4);N.target.copy(v),l.position.copy(v.clone().add(new q(B*.9,B*.55,B*.95))),N.update()},getCamera:()=>l}}function Nu(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const $T={class:"galaxy-page"},KT={key:0,class:"overlay center"},ZT={key:1,class:"overlay center error-panel"},JT={class:"error-msg"},QT={class:"panel-card"},tA={class:"side-title"},eA={class:"side-desc"},nA={key:0,class:"block"},iA={class:"pill-list"},sA={class:"members"},rA={class:"panel-card rec"},oA={class:"rec-head"},aA={class:"block-label"},lA={key:0,class:"rec-list"},cA={class:"rec-node"},uA={class:"rec-reason"},fA={key:2,class:"hint-promo",role:"note"},hA=pi({__name:"GalaxyView",setup(n){const t=eo(),e=Wt("loading"),i=Wt(""),s=Wt(null),r=Wt([]),o=Wt(""),a=Wt(!1),l=Wt(!0),c=Wt(null),u=Zs(null),f=Wt(new Set),h=Zs(null),d=Jt(()=>{if(!s.value||!u.value)return"";const ht=u.value.nodes.find(E=>E.id===s.value);return(ht==null?void 0:ht.label)??""}),g=Jt(()=>{var P,y;if(!s.value||!u.value)return"";const ht=u.value.nodes.find(Q=>Q.id===s.value);if(!ht)return"";if(ht.type==="fusion"){const Q=((P=ht.meta)==null?void 0:P.subtitle)??"";return Q?`交叉关卡 · ${Q}`:"交叉学科关卡"}const E=((y=ht.meta)==null?void 0:y.tagline)??"";return E?`专业入口 · ${E}`:"专业节点"}),_=Jt(()=>{if(!s.value||!u.value)return{ids:[],members:[]};const{hyperedgeIds:ht,memberIds:E}=ss(s.value,u.value.hyperedges),P=[...E].map(y=>{var Q;return((Q=u.value.nodes.find(tt=>tt.id===y))==null?void 0:Q.label)??y}).filter(y=>y);return{ids:ht,members:P}}),m=Jt(()=>!s.value||!u.value?new Set:new Set(ss(s.value,u.value.hyperedges).hyperedgeIds)),p=Jt(()=>!s.value||!u.value?new Set:ss(s.value,u.value.hyperedges).memberIds),b=Jt(()=>({pathIds:f.value,selectedId:s.value,hyperMemberIds:p.value,activeHyperedgeIds:m.value}));rn(b,ht=>{var E;(E=h.value)==null||E.setVisualState(ht)}),rn(s,()=>{a.value=!1,Qt(),e.value==="ready"&&w()});async function w(){try{const ht=Bf(),E=await nl(ht,s.value);r.value=E.suggestions??[],o.value=E.algorithm||E.note||""}catch{}}function M(){a.value=!a.value,a.value&&w()}function N(){try{const ht=sessionStorage.getItem(fa);if(!ht)return null;const E=JSON.parse(ht);return!E.fromId||!E.toId||E.fromId===E.toId?null:E}catch{return null}}async function I(){if(e.value="loading",i.value="",!Nu()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const ht=N();if(!ht){t.replace({name:"select"});return}c.value=ht;try{const E=Bf();let P,y;try{P=await zf(E),y=await nl(E)}catch(tt){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&E!=="./mock")P=await zf("./mock"),y=await nl("./mock");else throw tt}r.value=y.suggestions??[],o.value=y.algorithm||y.note||"",u.value={nodes:P.nodes,edges:P.edges,hyperedges:P.hyperedges,layout:P.layout};const Q=k0(u.value.edges,ht.fromId,ht.toId);f.value=new Set(Q??[ht.fromId,ht.toId]),e.value="ready"}catch(E){e.value="error",i.value=E instanceof Error?E.message:"加载失败"}}function D(ht){var tt;if((tt=h.value)==null||tt.dispose(),h.value=null,!ht||!u.value||e.value!=="ready")return;const E={pathIds:f.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},P=gu(u.value.nodes),y=Uu(ht,u.value,E,J=>{s.value=J},{ambientStarBoost:P});h.value=y,y.setVisualState(b.value);const Q=[...f.value];y.frameBounds(Q.length?Q:[...u.value.nodes.map(J=>J.id)].slice(0,6))}const L=Wt(null),T=Wt(null),S=Wt(!0),R=Wt(null),U=Wt(null);let F=!1,O=0,G=0,K=0,et=0;function Y(ht,E,P){return Math.max(E,Math.min(P,ht))}function mt(){F&&(F=!1,window.removeEventListener("pointermove",Mt),window.removeEventListener("pointerup",mt))}function Mt(ht){if(!F||!T.value)return;const E=T.value,P=ht.clientX-O,y=ht.clientY-G,Q=E.getBoundingClientRect(),tt=Q.width,J=Q.height;let ot=K+P,X=et+y;ot=Y(ot,8,window.innerWidth-tt-8),X=Y(X,8,window.innerHeight-J-8),R.value=ot,U.value=X}function Ct(ht){if(ht.button!==0||!T.value)return;mt(),ht.preventDefault();const E=T.value.getBoundingClientRect();F=!0,O=ht.clientX,G=ht.clientY,K=E.left,et=E.top,R.value=E.left,U.value=E.top,window.addEventListener("pointermove",Mt),window.addEventListener("pointerup",mt)}const Ft=Jt(()=>{if(!(R.value==null||U.value==null))return{left:`${R.value}px`,top:`${U.value}px`,right:"auto",bottom:"auto"}});function Qt(){S.value=!0,R.value=null,U.value=null,mt()}Ca(async()=>{await I()}),rn(e,async ht=>{ht==="ready"&&(await rs(),D(L.value))}),Pa(()=>{var ht;mt(),(ht=h.value)==null||ht.dispose()});function at(){I()}function _t(){t.push({name:"select"})}function Tt(){try{sessionStorage.removeItem(fa)}catch{}Up(),t.replace({name:"select"})}function z(ht){var E,P;return((P=(E=u.value)==null?void 0:E.nodes.find(y=>y.id===ht))==null?void 0:P.label)??ht}function ut(){lt(),t.push({path:"/personal"})}function lt(){l.value=!1}function gt(){const ht=s.value;if(!ht||!u.value)return;const E=u.value.nodes.find(P=>P.id===ht);!E||E.type!=="fusion"||t.push({name:"personalStarlit",query:{fusionId:ht,title:E.label,source:"galaxy"}})}return(ht,E)=>{var P,y;return Dt(),Ot("div",$T,[e.value==="loading"?(Dt(),Ot("div",KT,[...E[1]||(E[1]=[Z("div",{class:"spinner","aria-hidden":"true"},null,-1),Z("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(Dt(),Ot("div",ZT,[E[2]||(E[2]=Z("p",{class:"error-title"},"无法进入星系",-1)),Z("p",JT,It(i.value),1),Z("div",{class:"error-actions"},[Z("button",{type:"button",class:"btn ghost",onClick:_t},"返回选择"),Z("button",{type:"button",class:"btn primary",onClick:at},"重试")]),E[3]||(E[3]=Z("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(Dt(),Ot(Re,{key:2},[Z("div",{ref_key:"canvasHost",ref:L,class:"canvas-host"},null,512),Z("div",{class:"top-bar"},[E[4]||(E[4]=Z("div",{class:"top-left-spacer"},null,-1)),E[5]||(E[5]=Z("div",{class:"top-title"},"专业星系",-1)),Z("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:Tt},"×")]),s.value?(Dt(),Ot("button",{key:0,type:"button",class:"side-toggle",onClick:E[0]||(E[0]=Q=>S.value=!S.value)},It(S.value?"隐藏":"显示"),1)):Le("",!0),s.value?Gd((Dt(),Ot("aside",{key:1,ref_key:"sidePanelEl",ref:T,class:"side",style:ba(Ft.value)},[Z("div",{class:"side-drag-handle",onPointerdown:Ct},"信息面板",32),Z("section",QT,[E[8]||(E[8]=Z("p",{class:"side-eyebrow"},"选中",-1)),Z("h2",tA,It(d.value),1),Z("p",eA,It(g.value),1),_.value.ids.length?(Dt(),Ot("section",nA,[E[6]||(E[6]=Z("p",{class:"block-label"},"相关超边（融合域）",-1)),Z("ul",iA,[(Dt(!0),Ot(Re,null,Ni(_.value.ids,Q=>(Dt(),Ot("li",{key:Q,class:"pill"},It(Q),1))),128))]),E[7]||(E[7]=Z("p",{class:"block-label"},"成员节点",-1)),Z("p",sA,It(_.value.members.join("、")),1)])):Le("",!0),((y=(P=u.value)==null?void 0:P.nodes.find(Q=>Q.id===s.value))==null?void 0:y.type)==="fusion"?(Dt(),Ot("button",{key:1,type:"button",class:"btn primary full",onClick:gt}," 去练 ")):Le("",!0)]),Z("section",rA,[Z("div",oA,[Z("p",aA,"推荐下一步"+It(o.value?`（${o.value}）`:""),1),Z("button",{type:"button",class:"btn rec-toggle",onClick:M},It(a.value?"收起":"展开"),1)]),a.value?(Dt(),Ot("ul",lA,[(Dt(!0),Ot(Re,null,Ni(r.value,Q=>(Dt(),Ot("li",{key:Q.nodeId},[Z("span",cA,It(z(Q.nodeId)),1),Z("span",uA,It(Q.reason),1)]))),128))])):Le("",!0)])],4)),[[z_,S.value]]):l.value?(Dt(),Ot("div",fA,[Z("button",{type:"button",class:"hint-dismiss","aria-label":"关闭",onClick:Ii(lt,["stop"])},"×"),E[9]||(E[9]=Z("p",{class:"promo-title"},"个人专业星图",-1)),Z("button",{type:"button",class:"btn promo-cta",onClick:ut},"进入个人星图")])):Le("",!0)],64))])}}}),dA=ki(hA,[["__scopeId","data-v-c1da94b7"]]),pA={class:"hub"},mA=pi({__name:"PersonalGalaxyHubView",setup(n){const t=yn(to);if(!t)throw new Error("[PersonalGalaxyHubView] router inject failed");function e(){t.push({path:"/personal/design"})}function i(){t.push({path:"/personal/showcase"})}function s(){t.replace({path:"/galaxy"})}return(r,o)=>(Dt(),Ot("div",pA,[Z("header",{class:"bar"},[Z("button",{type:"button",class:"ghost",onClick:s},"← 大星图"),o[0]||(o[0]=Z("div",{class:"bar-center"},[Z("p",{class:"eyebrow"},"OfferCat · Galaxy"),Z("h1",{class:"title"},"个人专业星图")],-1)),o[1]||(o[1]=Z("span",{class:"spacer","aria-hidden":"true"},null,-1))]),Z("main",{class:"main"},[o[4]||(o[4]=Z("p",{class:"lead"}," 与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。 ",-1)),Z("button",{type:"button",class:"card card--primary",onClick:e},[...o[2]||(o[2]=[Z("span",{class:"card-kicker"},"编辑",-1),Z("span",{class:"card-title"},"设计专属星图",-1),Z("span",{class:"card-desc"},"添加大行星、连边、三选一岗位，保存到本机。",-1)])]),Z("button",{type:"button",class:"card card--ghost",onClick:i},[...o[3]||(o[3]=[Z("span",{class:"card-kicker"},"只读",-1),Z("span",{class:"card-title"},"展示已保存星图",-1),Z("span",{class:"card-desc"},"进入前请先在设计页保存至少一颗大行星或一条融合。",-1)])])])]))}}),gA=ki(mA,[["__scopeId","data-v-02210880"]]);function _A(){try{const n=sessionStorage.getItem(fa);if(!n)return!1;const t=JSON.parse(n);return!!(t!=null&&t.fromId&&(t!=null&&t.toId)&&t.fromId!==t.toId)}catch{return!1}}function vA(n){if(!_A()){n.replace({name:"select"});return}n.replace({name:"galaxy"})}function xA(n){n.push({name:"personalDesign"})}function yA(){try{const n=window.history.state;return n!=null&&n.back!=null&&n.back!==""}catch{return!1}}function Cm(n,t){if(yA()){n.back();return}n.replace(t)}function MA(n){vA(n)}const SA={class:"personal-root"},EA={key:0,class:"loading-overlay"},bA={key:1,class:"err-banner"},TA={key:2,class:"save-toast"},AA={class:"control-panel"},wA={class:"tb-block"},RA={class:"major-grid"},CA=["onClick"],PA=["disabled"],DA={class:"tb-block"},IA={key:0,class:"hint"},LA={key:0,class:"tb-block fusion-strip"},UA={class:"fusion-strip-title"},NA={key:1,class:"tb-block"},OA={class:"mono"},FA={key:2,class:"tb-block muted"},BA={id:"fusion-sheet-heading",class:"fusion-sheet-title"},zA={class:"fusion-sheet-dl"},kA={class:"modal"},HA=["onClick"],VA={class:"jt"},GA={class:"jd"},WA=pi({__name:"PersonalGalaxyView",setup(n){const t=eo(),e=Wt("loading"),i=Wt(""),s=Wt(null),r=Wt(!1),o=Wt(null),a=Wt([]),l=Wt([]),c=Wt({open:!1,aId:"",bId:"",options:[]}),u=Wt(null),f=Wt(""),h=Wt(null),d=Zs(null),g=Jt(()=>zp(a.value,l.value)),_=Jt(()=>u.value?ss(u.value,g.value.hyperedges).memberIds:new Set),m=Jt(()=>u.value?new Set(ss(u.value,g.value.hyperedges).hyperedgeIds):new Set),p=Jt(()=>({pathIds:new Set,selectedId:u.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));rn(p,R=>{var U;(U=d.value)==null||U.setVisualState(R)});const b=Jt(()=>u.value?l.value.find(R=>R.id===u.value)??null:null),w=Jt(()=>u.value?a.value.find(R=>R.id===u.value)??null:null);function M(){var O;const R=h.value,U=g.value;if((O=d.value)==null||O.dispose(),d.value=null,!R||U.nodes.length===0)return;const F=gu(U.nodes);d.value=Uu(R,U,p.value,G=>{if(u.value=G,!G||!r.value||!a.value.some(mt=>mt.id===G))return;if(!o.value){o.value=G;return}if(o.value===G)return;const et=a.value.find(mt=>mt.id===o.value),Y=a.value.find(mt=>mt.id===G);!et||!Y||N(et,Y)},{ambientStarBoost:F}),d.value.setVisualState(p.value),d.value.frameBounds(U.nodes.map(G=>G.id))}rn(g,async()=>{e.value==="ready"&&(await rs(),M())});async function N(R,U){try{const F=await da(R.majorId,U.majorId);if(F.length===0){i.value=`《具体专业》表中暂无「${R.label}×${U.label}」组合的三岗数据，请换一对学科。`,o.value=null;return}c.value={open:!0,aId:R.id,bId:U.id,options:F}}catch(F){i.value=F instanceof Error?F.message:"加载岗位表失败"}finally{o.value=null}}function I(R){const{aId:U,bId:F,options:O}=c.value,G=`f_${Date.now()}`,K=O.findIndex(mt=>mt.idx===R.idx),et={id:G,title:R.title,majorA:U,majorB:F,row:R,jobSlot:K>=0?K:void 0},Y=Fi(et,a.value);l.value.push({...et,packKey:Y??void 0}),c.value.open=!1,c.value.options=[],r.value=!1,u.value=G}function D(){c.value.open=!1,c.value.options=[],o.value=null}function L(){if(!s.value)return;const R=zr.find(F=>F.id===s.value);if(!R)return;const U=`m_${s.value}_${Date.now()}`;a.value.push({id:U,majorId:R.id,label:R.label}),s.value=null}async function T(){const R=$0(a.value,l.value);kp(R),(await Z0(R)).ok?f.value="已保存到本地，并已同步服务端。":no()?f.value="已保存到本地（同步服务端失败，请稍后重试）。":hs()?f.value="已保存到本机（星图 API 未注入，未同步云端）。":f.value="已保存到本机（未识别登录用户，未同步云端）。",window.setTimeout(()=>{f.value=""},3200)}function S(){Cm(t,{name:"personalHub"})}return Ca(async()=>{var U;if(!Nu()){e.value="error",i.value="当前环境不支持 WebGL";return}try{await da("major_electrical","major_law")}catch(F){e.value="error",i.value=F instanceof Error?F.message:"预加载岗位表失败";return}const R=await qr();(U=R==null?void 0:R.majors)!=null&&U.length&&(a.value=[...R.majors],l.value=[...R.fusions]),e.value="ready",await rs(),M()}),Pa(()=>{var R;(R=d.value)==null||R.dispose(),d.value=null}),(R,U)=>(Dt(),Ot("div",SA,[e.value==="loading"?(Dt(),Ot("div",EA,"加载岗位数据…")):Le("",!0),e.value==="error"?(Dt(),Ot("div",bA,It(i.value),1)):Le("",!0),Z("header",{class:"top-bar"},[Z("button",{type:"button",class:"back-btn",onClick:S},"返回"),U[4]||(U[4]=Z("div",{class:"top-titles"},[Z("h1",{class:"title"},"设计专属星图"),Z("p",{class:"subtitle"},"与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。")],-1)),Z("button",{type:"button",class:"save-btn",onClick:T},"保存星系")]),f.value?(Dt(),Ot("p",TA,It(f.value),1)):Le("",!0),Z("div",{ref_key:"canvasHost",ref:h,class:"canvas-wrap"},null,512),Z("div",AA,[Z("section",wA,[U[5]||(U[5]=Z("p",{class:"label"},"① 添加大行星（10 学科）",-1)),Z("div",RA,[(Dt(!0),Ot(Re,null,Ni(hn(zr),F=>(Dt(),Ot("button",{key:F.id,type:"button",class:Ui(["chip",{active:s.value===F.id}]),onClick:O=>s.value=F.id},It(F.label),11,CA))),128))]),Z("button",{type:"button",class:"primary full",disabled:!s.value,onClick:L}," 放入星空 ",8,PA)]),Z("section",DA,[U[6]||(U[6]=Z("p",{class:"label"},"② 连边并生成交叉岗位",-1)),Z("button",{type:"button",class:Ui(["secondary full",{on:r.value}]),onClick:U[0]||(U[0]=F=>{r.value=!r.value,o.value=null})},It(r.value?"连边模式已开 · 依次点两颗大行星":"开启连边模式"),3),r.value?(Dt(),Ot("p",IA,"在星空中先点一颗，再点另一颗；有数据则弹出三选一。")):Le("",!0)]),b.value?(Dt(),Ot("section",LA,[U[7]||(U[7]=Z("p",{class:"label"},"当前小行星",-1)),Z("p",UA,It(b.value.title),1),U[8]||(U[8]=Z("p",{class:"hint fusion-strip-hint"},"四象详情见下方弹层；点击星空空白处可取消选中。",-1))])):w.value?(Dt(),Ot("section",NA,[U[9]||(U[9]=Z("p",{class:"label"},"当前选中",-1)),Z("p",OA,"大行星 · "+It(w.value.label),1)])):(Dt(),Ot("section",FA,[...U[10]||(U[10]=[Z("p",{class:"hint"},"提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。",-1)])]))]),(Dt(),os(Gr,{to:"body"},[b.value?(Dt(),Ot("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"fusion-sheet-heading",onClick:U[3]||(U[3]=Ii(F=>u.value=null,["self"]))},[Z("div",{class:"fusion-sheet",onClick:U[2]||(U[2]=Ii(()=>{},["stop"]))},[U[15]||(U[15]=Z("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),Z("h3",BA,It(b.value.title),1),U[16]||(U[16]=Z("p",{class:"fusion-sheet-sub"},"四象属性（岗位表 · 完整）",-1)),Z("dl",zA,[U[11]||(U[11]=Z("dt",null,"热度/年薪",-1)),Z("dd",null,It(b.value.row.heat)+" · 初级年薪 "+It(b.value.row.salaryJunior)+" · 中级年薪 "+It(b.value.row.salaryMid),1),U[12]||(U[12]=Z("dt",null,"强度/竞争",-1)),Z("dd",null,It(b.value.row.workIntensity)+"级 · "+It(b.value.row.competition),1),U[13]||(U[13]=Z("dt",null,"学历门槛",-1)),Z("dd",null,It(b.value.row.education),1),U[14]||(U[14]=Z("dt",null,"学科技能",-1)),Z("dd",null,It(b.value.row.skills),1)]),Z("button",{type:"button",class:"fusion-sheet-close",onClick:U[1]||(U[1]=F=>u.value=null)},"收起")])])):Le("",!0)])),(Dt(),os(Gr,{to:"body"},[c.value.open?(Dt(),Ot("div",{key:0,class:"modal-mask",onClick:Ii(D,["self"])},[Z("div",kA,[U[17]||(U[17]=Z("h2",null,"三选一 · 确立小行星",-1)),U[18]||(U[18]=Z("p",{class:"modal-sub"},"数据来源：《具体专业》岗位表（同组合前三条）",-1)),Z("ul",null,[(Dt(!0),Ot(Re,null,Ni(c.value.options,(F,O)=>(Dt(),Ot("li",{key:O},[Z("button",{type:"button",class:"job-btn",onClick:G=>I(F)},[Z("span",VA,It(F.title),1),Z("span",GA,It(F.heat)+" · 中级年薪 "+It(F.salaryMid)+" · 竞争 "+It(F.competition),1)],8,HA)]))),128))]),Z("button",{type:"button",class:"ghost full",onClick:D},"取消")])])):Le("",!0)]))]))}}),XA=ki(WA,[["__scopeId","data-v-509d4d3f"]]),Pm="offercat_starlit_leaderboard_v1",Dm="offercat_starlit_self_name_v1";function Ol(){return{v:1,entries:[]}}function jA(){try{const n=localStorage.getItem(Pm);if(!n)return Ol();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.entries)?Ol():t}catch{return Ol()}}function qA(n){try{localStorage.setItem(Pm,JSON.stringify(n))}catch{}}function qc(){var n;try{const t=(n=localStorage.getItem(Dm))==null?void 0:n.trim();if(t)return t}catch{}return"我"}function YA(n){try{localStorage.setItem(Dm,n.trim().slice(0,20)||"我")}catch{}}async function $A(n,t){const e=n??hs()??0;if(e>0)try{const{fetchStarlitLeaderboard:i}=await fs(async()=>{const{fetchStarlitLeaderboard:r}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchStarlitLeaderboard:r}},[],import.meta.url);return(await i(e,t)).rows.map(r=>({id:r.self?"__self__":`u_${r.userId}`,displayName:r.displayName,totalStars:r.totalStars,updatedAt:Date.now(),isSelf:r.self}))}catch{}return Yc()}function Yc(){const n=Q0(),t=qc(),e="__self__",i=Date.now();let r=jA().entries.filter(l=>l.id!==e);r.length||(r=[{id:"demo_1",displayName:"星尘旅人",totalStars:Math.max(0,n-12),updatedAt:i-864e5},{id:"demo_2",displayName:"交叉探索者",totalStars:Math.max(0,n-28),updatedAt:i-1728e5},{id:"demo_3",displayName:"轨道观测员",totalStars:Math.max(0,n-45),updatedAt:i-2592e5}]);const o={id:e,displayName:t,totalStars:n,updatedAt:i,isSelf:!0},a=[...r.filter(l=>l.id!==e),o];return a.sort((l,c)=>c.totalStars-l.totalStars||l.displayName.localeCompare(c.displayName,"zh")),qA({v:1,entries:a.map(({isSelf:l,...c})=>c)}),a.map(l=>({...l,isSelf:l.id===e}))}const KA={class:"lb-head"},ZA={class:"lb-sub"},JA={class:"lb-name-row"},QA={class:"lb-hint"},tw={class:"lb-list"},ew={class:"lb-rank"},nw={class:"lb-name"},iw={class:"lb-stars"},sw=pi({__name:"StarlitLeaderboardPanel",props:{open:{type:Boolean},fusionIds:{},userId:{},packKeys:{}},emits:["close"],setup(n,{emit:t}){const e=n,i=t,s=Wt(Yc()),r=Wt(qc()),o=Jt(()=>Gp(e.fusionIds));async function a(){const c=e.userId??0;s.value=c>0?await $A(c,e.packKeys):Yc(),r.value=qc()}function l(){YA(r.value),a()}return rn(()=>e.open,c=>{c&&a()}),rn(()=>e.fusionIds,()=>{e.open&&a()},{deep:!0}),(c,u)=>(Dt(),os(Gr,{to:"body"},[n.open?(Dt(),Ot("div",{key:0,class:"lb-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"starlit-lb-title",onClick:u[3]||(u[3]=Ii(f=>i("close"),["self"]))},[Z("div",{class:"lb-card",onClick:u[2]||(u[2]=Ii(()=>{},["stop"]))},[Z("header",KA,[Z("div",null,[u[4]||(u[4]=Z("h2",{id:"starlit-lb-title",class:"lb-title"},"点亮排行榜",-1)),Z("p",ZA,"按已点亮星数排序 · 本星系合计 "+It(o.value)+" 星",1)]),Z("button",{type:"button",class:"lb-close","aria-label":"关闭",onClick:u[0]||(u[0]=f=>i("close"))},"×")]),Z("div",JA,[u[5]||(u[5]=Z("label",{class:"lb-name-label",for:"lb-self-name"},"我的昵称",-1)),Gd(Z("input",{id:"lb-self-name","onUpdate:modelValue":u[1]||(u[1]=f=>r.value=f),class:"lb-name-input",maxlength:"20",placeholder:"展示在榜上",onChange:l,onKeydown:ov(l,["enter"])},null,544),[[nv,r.value]])]),Z("p",QA," 总星数 = 各小行星点亮之和（每颗最多 "+It(hn(as))+"）。已配置网关时从服务端拉取全站排行。 ",1),Z("ol",tw,[(Dt(!0),Ot(Re,null,Ni(s.value,(f,h)=>(Dt(),Ot("li",{key:f.id,class:Ui(["lb-row",{self:f.isSelf}])},[Z("span",ew,It(h+1),1),Z("span",nw,It(f.displayName),1),Z("span",iw,It(f.totalStars)+" 星",1)],2))),128))])])])):Le("",!0)]))}}),rw=ki(sw,[["__scopeId","data-v-d6ee7af2"]]),ow={class:"showcase-root"},aw={class:"bar"},lw={class:"mid"},cw={key:0,class:"sub"},uw={key:1,class:"sub muted"},fw={key:0,class:"overlay"},hw={key:1,class:"overlay err"},dw={key:2,class:"overlay empty"},pw={class:"lb-fab-sub"},mw={id:"showcase-fusion-title",class:"fusion-sheet-title"},gw={class:"fusion-sheet-dl"},_w={class:"starlit-hint"},vw=pi({__name:"PersonalGalaxyShowcaseView",setup(n){const t=eo(),e=Ip(),i=Wt("loading"),s=Wt(""),r=Zs(null),o=Wt(null),a=Wt(!1),l=Wt(0),c=Wt([]),u=Jt(()=>hs()),f=Wt(null),h=Zs(null),d=Jt(()=>{const O=r.value;return O?zp(O.majors,O.fusions):null}),g=Jt(()=>!o.value||!d.value?new Set:ss(o.value,d.value.hyperedges).memberIds),_=Jt(()=>!o.value||!d.value?new Set:new Set(ss(o.value,d.value.hyperedges).hyperedgeIds)),m=Jt(()=>({pathIds:new Set,selectedId:o.value,hyperMemberIds:g.value,activeHyperedgeIds:_.value}));rn(m,O=>{var G;(G=h.value)==null||G.setVisualState(O)});const p=Jt(()=>!o.value||!r.value?null:r.value.fusions.find(O=>O.id===o.value)??null),b=Jt(()=>{var O;return!o.value||!d.value?"":((O=d.value.nodes.find(G=>G.id===o.value))==null?void 0:O.label)??""}),w=Jt(()=>{var O;return l.value,((O=r.value)==null?void 0:O.fusions.map(G=>G.id))??[]}),M=Jt(()=>(l.value,Gp(w.value)));function N(){l.value+=1,i.value==="ready"&&L()}async function I(){var G;N();const O=((G=r.value)==null?void 0:G.fusions)??[];c.value=O.map(K=>{var et;return Fi(K,(et=r.value)==null?void 0:et.majors)}).filter(K=>!!K),a.value=!0}function D(O){(O.key===null||O.key==="offercat_personal_starlit_v1")&&N()}function L(){var et;const O=f.value,G=d.value;if((et=h.value)==null||et.dispose(),h.value=null,!O||!G||G.nodes.length===0)return;const K=gu(G.nodes);h.value=Uu(O,G,m.value,Y=>{o.value=Y},{ambientStarBoost:K}),h.value.setVisualState(m.value),h.value.frameBounds(G.nodes.map(Y=>Y.id))}function T(){xA(t)}function S(){Cm(t,{name:"personalHub"})}function R(){o.value=null}function U(){var K;const O=p.value;if(!O)return;const G=O.packKey??Fi(O,(K=r.value)==null?void 0:K.majors)??"";t.push({name:"personalStarlit",query:{fusionId:O.id,title:O.title,...G?{packKey:G}:{}}})}rn(()=>e.fullPath,async()=>{var O,G;e.name==="personalShowcase"&&(N(),i.value==="ready"&&(r.value=await qr(),(G=(O=r.value)==null?void 0:O.fusions)!=null&&G.length&&await nc(r.value.fusions),N(),await rs(),L()))});const F=()=>I();return Ca(async()=>{var G;if(window.addEventListener("storage",D),window.addEventListener("galaxy-open-leaderboard",F),window.__GALAXY_OPEN_LEADERBOARD__=()=>window.dispatchEvent(new CustomEvent("galaxy-open-leaderboard")),ec("personalShowcase"),!Nu()){i.value="error",s.value="当前环境不支持 WebGL";return}const O=await qr();if(r.value=O,(G=O==null?void 0:O.fusions)!=null&&G.length&&await nc(O.fusions),!O||O.majors.length===0&&O.fusions.length===0){i.value="empty";return}i.value="ready",await rs(),N(),L()}),Pa(()=>{var O;window.removeEventListener("storage",D),window.removeEventListener("galaxy-open-leaderboard",F),delete window.__GALAXY_OPEN_LEADERBOARD__,ec(e.name),(O=h.value)==null||O.dispose(),h.value=null}),(O,G)=>(Dt(),Ot("div",ow,[Z("header",aw,[Z("button",{type:"button",class:"ghost",onClick:S},"返回"),Z("div",lw,[G[2]||(G[2]=Z("h1",{class:"title"},"展示星图",-1)),b.value?(Dt(),Ot("p",cw,It(b.value),1)):(Dt(),Ot("p",uw,"点击小行星查看四象与点亮星辰"))]),Z("button",{type:"button",class:"lb-trigger",onClick:I}," 排行榜 · "+It(M.value)+" 星 ",1)]),i.value==="loading"?(Dt(),Ot("div",fw,"加载…")):i.value==="error"?(Dt(),Ot("div",hw,It(s.value),1)):i.value==="empty"?(Dt(),Ot("div",dw,[G[3]||(G[3]=Z("p",null,"还没有已保存的个人星系。",-1)),Z("button",{type:"button",class:"cta",onClick:T},"返回去设计")])):(Dt(),Ot("div",{key:3,ref_key:"canvasHost",ref:f,class:"canvas"},null,512)),(Dt(),os(Gr,{to:"body"},[i.value==="ready"?(Dt(),Ot("button",{key:0,type:"button",class:"lb-fab","aria-label":"打开点亮排行榜",onClick:I},[G[4]||(G[4]=Z("span",{class:"lb-fab-title"},"排行榜",-1)),Z("span",pw,It(M.value)+" 星",1)])):Le("",!0)])),(Dt(),os(Gr,{to:"body"},[p.value?(Dt(),Ot("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"showcase-fusion-title",onClick:Ii(R,["self"])},[Z("div",{class:"fusion-sheet",onClick:G[0]||(G[0]=Ii(()=>{},["stop"]))},[G[10]||(G[10]=Z("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),Z("h2",mw,It(p.value.title),1),G[11]||(G[11]=Z("p",{class:"fusion-sheet-sub"},"四象属性 · 已保存数据",-1)),Z("dl",gw,[G[5]||(G[5]=Z("dt",null,"热度/年薪",-1)),Z("dd",null,It(p.value.row.heat)+" · 初级年薪 "+It(p.value.row.salaryJunior)+" · 中级年薪 "+It(p.value.row.salaryMid),1),G[6]||(G[6]=Z("dt",null,"强度/竞争",-1)),Z("dd",null,It(p.value.row.workIntensity)+"级 · "+It(p.value.row.competition),1),G[7]||(G[7]=Z("dt",null,"学历门槛",-1)),Z("dd",null,It(p.value.row.education),1),G[8]||(G[8]=Z("dt",null,"学科技能",-1)),Z("dd",null,It(p.value.row.skills),1)]),Z("p",_w,[G[9]||(G[9]=Yl(" 已点亮 ",-1)),Z("strong",null,It(hn(io)(p.value.id)),1),Yl(" / "+It(hn(as))+" 颗星（本图合计 "+It(M.value)+" 星）；答题正确可继续点亮。 ",1)]),Z("button",{type:"button",class:"fusion-sheet-primary",onClick:U},"点亮星辰 · 去答题"),Z("button",{type:"button",class:"fusion-sheet-close",onClick:R},"收起")])])):Le("",!0)])),Ke(rw,{open:a.value,"fusion-ids":w.value,"user-id":u.value??void 0,"pack-keys":c.value,onClose:G[1]||(G[1]=K=>a.value=!1)},null,8,["open","fusion-ids","user-id","pack-keys"])]))}}),xw=ki(vw,[["__scopeId","data-v-c784bf6e"]]),yw={class:"quiz-root"},Mw={class:"bar"},Sw={class:"mid"},Ew={class:"sub"},bw={key:0,class:"sub api-tag"},Tw={key:0,class:"empty"},Aw={class:"star-strip","aria-label":"已点亮星数"},ww={class:"star-label"},Rw={class:"star-dots",role:"list"},Cw={key:0,class:"loading"},Pw={key:1,class:"load-err"},Dw={key:2,class:"done"},Iw={key:3,class:"q-card"},Lw={class:"q-text"},Uw={class:"q-opts"},Nw=["onClick"],Ow={key:4,class:"toast",role:"status"},Fw={class:"foot"},Bw=pi({__name:"PersonalStarlitQuizView",setup(n){const t=Ip(),e=eo(),i=Jt(()=>String(t.query.fusionId||"")),s=Jt(()=>{const L=t.query.packKey;return typeof L=="string"&&L.trim()?L.trim():""}),r=Jt(()=>{const L=t.query.title;if(typeof L=="string"&&L.trim())return L;const T=i.value;if(!T)return"小行星";const S=Oa(),R=S==null?void 0:S.fusions.find(U=>U.id===T);return(R==null?void 0:R.title)??"小行星"});function o(L){const T=[],S=["正确","错误","视场景而定","以上皆非"];for(let R=0;R<Gf;R++){const U=R%4,F=`【${L}】第 ${R+1} / ${Gf} 题（占位）：与交叉岗位相关的表述，选项「${S[U]}」为本题预设答案。`;T.push({idx:R,text:F,options:[...S],correct:U})}return T}const a=Wt([]),l=Wt(0),c=Wt(0),u=Wt(""),f=Wt(!1),h=Wt(!1),d=Wt("mock"),g=Wt(""),_=Wt(""),m=Jt(()=>{const L=a.value.length;return L>0?Math.min(as,L):as});async function p(L,T){var F;let S=Fi(L,T);if(S)return S;const R=Pi(L.majorA,T),U=Pi(L.majorB,T);if(!R||!U)return null;try{const O=await da(R,U);if(!O.length)return null;let G=L.jobSlot??0,K=L.row;if((F=L.title)!=null&&F.trim()){const et=O.findIndex(Y=>Y.title===L.title);et>=0&&(G=et,K=O[et])}return K||(K=O[G]??O[0]),S=Fi({...L,row:K,jobSlot:G},T),S}catch{return null}}async function b(L,T){var S;h.value=!0,g.value="",_.value="",a.value=[];try{const R=await qr();if(!(Na().length>0))g.value="未注入星图 API（请从 App 星图入口进入并确认网关地址）";else if(!((S=R==null?void 0:R.fusions)!=null&&S.length))g.value="未找到个人星图数据，请先在「设计专属星图」保存后再答题";else{const F=R.fusions.find(O=>O.id===L);if(!F)g.value="当前小行星不在已保存星图中，请返回展示页重试";else{const O=s.value||await p(F,R.majors)||"";if(O){_.value=O;const{fetchStarlitQuestions:G}=await fs(async()=>{const{fetchStarlitQuestions:et}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchStarlitQuestions:et}},[],import.meta.url),K=await G(O);if(K.length>0){a.value=K.map(Y=>({idx:Y.questionNo-1,text:Y.stem,options:Y.options,correct:Y.correctIndex})),d.value="api";const et=m.value;c.value>et&&(c.value=et);return}g.value=`题库包「${O}」暂无题目，请确认已导入 starlit_question_bank.sql`}else{const G=Pi(F.majorA,R.majors),K=Pi(F.majorB,R.majors);g.value=!G||!K?"无法识别两颗大行星学科，请回设计页重新放入星空并连边保存":"无法解析本题库 pack_key，请重新连边选择岗位后保存星系"}}}}catch(R){const U=R instanceof Error?R.message:"加载题库失败";g.value=_.value?`${U}（pack_key: ${_.value}）`:U}finally{a.value.length||(a.value=o(T),d.value="mock"),h.value=!1}}rn([i,r],async([L])=>{var S;if(!L)return;const T=await qr();(S=T==null?void 0:T.fusions)!=null&&S.length&&await nc(T.fusions),c.value=io(L),l.value=0,f.value=!1,await b(L,r.value)},{immediate:!0});const w=Jt(()=>a.value[l.value]??null);function M(L){u.value=L,window.setTimeout(()=>{u.value=""},1400)}function N(L){if(!i.value||f.value||!w.value)return;const T=w.value;if(L===T.correct){if(c.value=tx(i.value),M("点亮 +1 星"),l.value>=a.value.length-1||c.value>=m.value){f.value=!0;return}l.value+=1}else M("再想想看")}function I(){MA(e)}function D(){if(d.value==="api"){M("当前已是服务端题库");return}M(g.value||"题库未接通，请检查网关与 SQL 导入")}return(L,T)=>(Dt(),Ot("div",yw,[Z("header",Mw,[Z("button",{type:"button",class:"ghost",onClick:I},"← 退出"),Z("div",Sw,[T[0]||(T[0]=Z("h1",{class:"title"},"点亮星辰",-1)),Z("p",Ew,It(r.value),1),d.value==="api"?(Dt(),Ot("p",bw,"题库来自服务端")):Le("",!0)]),T[1]||(T[1]=Z("span",{class:"spacer"},null,-1))]),i.value?(Dt(),Ot(Re,{key:1},[Z("section",Aw,[Z("div",ww,"已点亮 "+It(c.value)+" / "+It(m.value)+" 星",1),Z("div",Rw,[(Dt(!0),Ot(Re,null,Ni(m.value,S=>(Dt(),Ot("span",{key:S,class:Ui(["dot",{on:S<=c.value}]),role:"listitem"},null,2))),128))])]),h.value?(Dt(),Ot("div",Cw,"加载题目…")):g.value&&d.value==="mock"?(Dt(),Ot("p",Pw,It(g.value),1)):f.value?(Dt(),Ot("section",Dw,[T[3]||(T[3]=Z("p",null,"本套题目已完成或已达星数上限。",-1)),Z("button",{type:"button",class:"cta",onClick:I},"返回展示星图")])):w.value?(Dt(),Ot("section",Iw,[Z("p",Lw,It(w.value.text),1),Z("div",Uw,[(Dt(!0),Ot(Re,null,Ni(w.value.options,(S,R)=>(Dt(),Ot("button",{key:R,type:"button",class:"q-opt",onClick:U=>N(R)},It(String.fromCharCode(65+R))+". "+It(S),9,Nw))),128))])])):Le("",!0),u.value?(Dt(),Ot("p",Ow,It(u.value),1)):Le("",!0),Z("footer",Fw,[Z("button",{type:"button",class:"ghost wide",onClick:D},It(d.value==="api"?"题库已接通":"题库未接通 · 查看原因"),1)])],64)):(Dt(),Ot("div",Tw,[T[2]||(T[2]=Z("p",null,"缺少小行星参数。",-1)),Z("button",{type:"button",class:"cta",onClick:I},"退出")]))]))}}),zw=ki(Bw,[["__scopeId","data-v-8b5b9be4"]]),kw=Qv(void 0),Im=M0({history:kw,routes:[{path:"/",name:"select",component:O0},{path:"/galaxy",name:"galaxy",component:dA},{path:"/personal/design",name:"personalDesign",component:XA},{path:"/personal/showcase",name:"personalShowcase",component:xw},{path:"/personal/starlit",name:"personalStarlit",component:zw},{path:"/personal",name:"personalHub",component:gA},{path:"/personal-galaxy",redirect:{name:"personalHub"}}]});Im.afterEach(n=>{ec(n.name)});mu().catch(()=>{});cv(pv).use(Im).mount("#app");export{Na as a,Np as g};
