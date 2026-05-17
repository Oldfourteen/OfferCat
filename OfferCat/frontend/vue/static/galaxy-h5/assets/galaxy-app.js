(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Gc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const he={},Bs=[],kn=()=>{},ad=()=>!1,pa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ma=n=>n.startsWith("onUpdate:"),Ne=Object.assign,Wc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Pm=Object.prototype.hasOwnProperty,le=(n,t)=>Pm.call(n,t),Wt=Array.isArray,zs=n=>$r(n)==="[object Map]",ld=n=>$r(n)==="[object Set]",Nu=n=>$r(n)==="[object Date]",Yt=n=>typeof n=="function",xe=n=>typeof n=="string",Hn=n=>typeof n=="symbol",ue=n=>n!==null&&typeof n=="object",cd=n=>(ue(n)||Yt(n))&&Yt(n.then)&&Yt(n.catch),ud=Object.prototype.toString,$r=n=>ud.call(n),Dm=n=>$r(n).slice(8,-1),fd=n=>$r(n)==="[object Object]",Xc=n=>xe(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Pr=Gc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ga=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Lm=/-\w/g,Ze=ga(n=>n.replace(Lm,t=>t.slice(1).toUpperCase())),Im=/\B([A-Z])/g,Bi=ga(n=>n.replace(Im,"-$1").toLowerCase()),_a=ga(n=>n.charAt(0).toUpperCase()+n.slice(1)),Na=ga(n=>n?`on${_a(n)}`:""),zn=(n,t)=>!Object.is(n,t),Vo=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},hd=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},jc=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Ou;const va=()=>Ou||(Ou=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function xa(n){if(Wt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=xe(i)?Fm(i):xa(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(xe(n)||ue(n))return n}const Um=/;(?![^(]*\))/g,Nm=/:([^]+)/,Om=/\/\*[^]*?\*\//g;function Fm(n){const t={};return n.replace(Om,"").split(Um).forEach(e=>{if(e){const i=e.split(Nm);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Ui(n){let t="";if(xe(n))t=n;else if(Wt(n))for(let e=0;e<n.length;e++){const i=Ui(n[e]);i&&(t+=i+" ")}else if(ue(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Bm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",zm=Gc(Bm);function dd(n){return!!n||n===""}function km(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=qc(n[i],t[i]);return e}function qc(n,t){if(n===t)return!0;let e=Nu(n),i=Nu(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=Hn(n),i=Hn(t),e||i)return n===t;if(e=Wt(n),i=Wt(t),e||i)return e&&i?km(n,t):!1;if(e=ue(n),i=ue(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!qc(n[o],t[o]))return!1}}return String(n)===String(t)}const pd=n=>!!(n&&n.__v_isRef===!0),Lt=n=>xe(n)?n:n==null?"":Wt(n)||ue(n)&&(n.toString===ud||!Yt(n.toString))?pd(n)?Lt(n.value):JSON.stringify(n,md,2):String(n),md=(n,t)=>pd(t)?md(n,t.value):zs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Oa(i,r)+" =>"]=s,e),{})}:ld(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Oa(e))}:Hn(t)?Oa(t):ue(t)&&!Wt(t)&&!fd(t)?String(t):t,Oa=(n,t="")=>{var e;return Hn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ue;class Hm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ue&&(Ue.active?(this.parent=Ue,this.index=(Ue.scopes||(Ue.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Ue;try{return Ue=this,t()}finally{Ue=e}}}on(){++this._on===1&&(this.prevScope=Ue,Ue=this)}off(){if(this._on>0&&--this._on===0){if(Ue===this)Ue=this.prevScope;else{let t=Ue;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Vm(){return Ue}let me;const Fa=new WeakSet;class gd{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ue&&(Ue.active?Ue.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Fa.has(this)&&(Fa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||vd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fu(this),xd(this);const t=me,e=Cn;me=this,Cn=!0;try{return this.fn()}finally{yd(this),me=t,Cn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Kc(t);this.deps=this.depsTail=void 0,Fu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Fa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Pl(this)&&this.run()}get dirty(){return Pl(this)}}let _d=0,Dr,Lr;function vd(n,t=!1){if(n.flags|=8,t){n.next=Lr,Lr=n;return}n.next=Dr,Dr=n}function Yc(){_d++}function $c(){if(--_d>0)return;if(Lr){let t=Lr;for(Lr=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Dr;){let t=Dr;for(Dr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function xd(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function yd(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),Kc(i),Gm(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Pl(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Md(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Md(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===zr)||(n.globalVersion=zr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Pl(n))))return;n.flags|=2;const t=n.dep,e=me,i=Cn;me=n,Cn=!0;try{xd(n);const s=n.fn(n._value);(t.version===0||zn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{me=e,Cn=i,yd(n),n.flags&=-3}}function Kc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)Kc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Gm(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Cn=!0;const Sd=[];function fi(){Sd.push(Cn),Cn=!1}function hi(){const n=Sd.pop();Cn=n===void 0?!0:n}function Fu(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=me;me=void 0;try{t()}finally{me=e}}}let zr=0;class Wm{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Zc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!me||!Cn||me===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==me)e=this.activeLink=new Wm(me,this),me.deps?(e.prevDep=me.depsTail,me.depsTail.nextDep=e,me.depsTail=e):me.deps=me.depsTail=e,Ed(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=me.depsTail,e.nextDep=void 0,me.depsTail.nextDep=e,me.depsTail=e,me.deps===e&&(me.deps=i)}return e}trigger(t){this.version++,zr++,this.notify(t)}notify(t){Yc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{$c()}}}function Ed(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Ed(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Dl=new WeakMap,es=Symbol(""),Ll=Symbol(""),kr=Symbol("");function Be(n,t,e){if(Cn&&me){let i=Dl.get(n);i||Dl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new Zc),s.map=i,s.key=e),s.track()}}function si(n,t,e,i,s,r){const o=Dl.get(n);if(!o){zr++;return}const a=l=>{l&&l.trigger()};if(Yc(),t==="clear")o.forEach(a);else{const l=Wt(n),c=l&&Xc(e);if(l&&e==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===kr||!Hn(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(kr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(es)),zs(n)&&a(o.get(Ll)));break;case"delete":l||(a(o.get(es)),zs(n)&&a(o.get(Ll)));break;case"set":zs(n)&&a(o.get(es));break}}$c()}function ps(n){const t=ae(n);return t===n?t:(Be(t,"iterate",kr),xn(n)?t:t.map(Dn))}function ya(n){return Be(n=ae(n),"iterate",kr),n}function On(n,t){return di(n)?Ys(ns(n)?Dn(t):t):Dn(t)}const Xm={__proto__:null,[Symbol.iterator](){return Ba(this,Symbol.iterator,n=>On(this,n))},concat(...n){return ps(this).concat(...n.map(t=>Wt(t)?ps(t):t))},entries(){return Ba(this,"entries",n=>(n[1]=On(this,n[1]),n))},every(n,t){return Yn(this,"every",n,t,void 0,arguments)},filter(n,t){return Yn(this,"filter",n,t,e=>e.map(i=>On(this,i)),arguments)},find(n,t){return Yn(this,"find",n,t,e=>On(this,e),arguments)},findIndex(n,t){return Yn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Yn(this,"findLast",n,t,e=>On(this,e),arguments)},findLastIndex(n,t){return Yn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Yn(this,"forEach",n,t,void 0,arguments)},includes(...n){return za(this,"includes",n)},indexOf(...n){return za(this,"indexOf",n)},join(n){return ps(this).join(n)},lastIndexOf(...n){return za(this,"lastIndexOf",n)},map(n,t){return Yn(this,"map",n,t,void 0,arguments)},pop(){return pr(this,"pop")},push(...n){return pr(this,"push",n)},reduce(n,...t){return Bu(this,"reduce",n,t)},reduceRight(n,...t){return Bu(this,"reduceRight",n,t)},shift(){return pr(this,"shift")},some(n,t){return Yn(this,"some",n,t,void 0,arguments)},splice(...n){return pr(this,"splice",n)},toReversed(){return ps(this).toReversed()},toSorted(n){return ps(this).toSorted(n)},toSpliced(...n){return ps(this).toSpliced(...n)},unshift(...n){return pr(this,"unshift",n)},values(){return Ba(this,"values",n=>On(this,n))}};function Ba(n,t,e){const i=ya(n),s=i[t]();return i!==n&&!xn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const jm=Array.prototype;function Yn(n,t,e,i,s,r){const o=ya(n),a=o!==n&&!xn(n),l=o[t];if(l!==jm[t]){const f=l.apply(n,r);return a?Dn(f):f}let c=e;o!==n&&(a?c=function(f,h){return e.call(this,On(n,f),h,n)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Bu(n,t,e,i){const s=ya(n),r=s!==n&&!xn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=On(n,c)),e.call(this,c,On(n,u),f,n)}):e.length>3&&(o=function(c,u,f){return e.call(this,c,u,f,n)}));const l=s[t](o,...i);return a?On(n,l):l}function za(n,t,e){const i=ae(n);Be(i,"iterate",kr);const s=i[t](...e);return(s===-1||s===!1)&&tu(e[0])?(e[0]=ae(e[0]),i[t](...e)):s}function pr(n,t,e=[]){fi(),Yc();const i=ae(n)[t].apply(n,e);return $c(),hi(),i}const qm=Gc("__proto__,__v_isRef,__isVue"),bd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Hn));function Ym(n){Hn(n)||(n=String(n));const t=ae(this);return Be(t,"has",n),t.hasOwnProperty(n)}class Td{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?sg:Cd:r?Rd:wd).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Wt(t);if(!s){let l;if(o&&(l=Xm[e]))return l;if(e==="hasOwnProperty")return Ym}const a=Reflect.get(t,e,He(t)?t:i);if((Hn(e)?bd.has(e):qm(e))||(s||Be(t,"get",e),r))return a;if(He(a)){const l=o&&Xc(e)?a:a.value;return s&&ue(l)?Ul(l):l}return ue(a)?s?Ul(a):Ma(a):a}}class Ad extends Td{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Wt(t)&&Xc(e);if(!this._isShallow){const c=di(r);if(!xn(i)&&!di(i)&&(r=ae(r),i=ae(i)),!o&&He(r)&&!He(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:le(t,e),l=Reflect.set(t,e,i,He(t)?t:s);return t===ae(s)&&(a?zn(i,r)&&si(t,"set",e,i):si(t,"add",e,i)),l}deleteProperty(t,e){const i=le(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&si(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Hn(e)||!bd.has(e))&&Be(t,"has",e),i}ownKeys(t){return Be(t,"iterate",Wt(t)?"length":es),Reflect.ownKeys(t)}}class $m extends Td{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Km=new Ad,Zm=new $m,Jm=new Ad(!0);const Il=n=>n,co=n=>Reflect.getPrototypeOf(n);function Qm(n,t,e){return function(...i){const s=this.__v_raw,r=ae(s),o=zs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Il:t?Ys:Dn;return!t&&Be(r,"iterate",l?Ll:es),Ne(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function uo(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function tg(n,t){const e={get(s){const r=this.__v_raw,o=ae(r),a=ae(s);n||(zn(s,a)&&Be(o,"get",s),Be(o,"get",a));const{has:l}=co(o),c=t?Il:n?Ys:Dn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Be(ae(s),"iterate",es),s.size},has(s){const r=this.__v_raw,o=ae(r),a=ae(s);return n||(zn(s,a)&&Be(o,"has",s),Be(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ae(a),c=t?Il:n?Ys:Dn;return!n&&Be(l,"iterate",es),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return Ne(e,n?{add:uo("add"),set:uo("set"),delete:uo("delete"),clear:uo("clear")}:{add(s){const r=ae(this),o=co(r),a=ae(s),l=!t&&!xn(s)&&!di(s)?a:s;return o.has.call(r,l)||zn(s,l)&&o.has.call(r,s)||zn(a,l)&&o.has.call(r,a)||(r.add(l),si(r,"add",l,l)),this},set(s,r){!t&&!xn(r)&&!di(r)&&(r=ae(r));const o=ae(this),{has:a,get:l}=co(o);let c=a.call(o,s);c||(s=ae(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?zn(r,u)&&si(o,"set",s,r):si(o,"add",s,r),this},delete(s){const r=ae(this),{has:o,get:a}=co(r);let l=o.call(r,s);l||(s=ae(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&si(r,"delete",s,void 0),c},clear(){const s=ae(this),r=s.size!==0,o=s.clear();return r&&si(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Qm(s,n,t)}),e}function Jc(n,t){const e=tg(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(le(e,s)&&s in i?e:i,s,r)}const eg={get:Jc(!1,!1)},ng={get:Jc(!1,!0)},ig={get:Jc(!0,!1)};const wd=new WeakMap,Rd=new WeakMap,Cd=new WeakMap,sg=new WeakMap;function rg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function og(n){return n.__v_skip||!Object.isExtensible(n)?0:rg(Dm(n))}function Ma(n){return di(n)?n:Qc(n,!1,Km,eg,wd)}function Pd(n){return Qc(n,!1,Jm,ng,Rd)}function Ul(n){return Qc(n,!0,Zm,ig,Cd)}function Qc(n,t,e,i,s){if(!ue(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=og(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function ns(n){return di(n)?ns(n.__v_raw):!!(n&&n.__v_isReactive)}function di(n){return!!(n&&n.__v_isReadonly)}function xn(n){return!!(n&&n.__v_isShallow)}function tu(n){return n?!!n.__v_raw:!1}function ae(n){const t=n&&n.__v_raw;return t?ae(t):n}function ag(n){return!le(n,"__v_skip")&&Object.isExtensible(n)&&hd(n,"__v_skip",!0),n}const Dn=n=>ue(n)?Ma(n):n,Ys=n=>ue(n)?Ul(n):n;function He(n){return n?n.__v_isRef===!0:!1}function Xt(n){return Dd(n,!1)}function $s(n){return Dd(n,!0)}function Dd(n,t){return He(n)?n:new lg(n,t)}class lg{constructor(t,e){this.dep=new Zc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ae(t),this._value=e?t:Dn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||xn(t)||di(t);t=i?t:ae(t),zn(t,e)&&(this._rawValue=t,this._value=i?t:Dn(t),this.dep.trigger())}}function Je(n){return He(n)?n.value:n}const cg={get:(n,t,e)=>t==="__v_raw"?n:Je(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return He(s)&&!He(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Ld(n){return ns(n)?n:new Proxy(n,cg)}class ug{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Zc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=zr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return vd(this,!0),!0}get value(){const t=this.dep.track();return Md(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function fg(n,t,e=!1){let i,s;return Yt(n)?i=n:(i=n.get,s=n.set),new ug(i,s,e)}const fo={},Qo=new WeakMap;let Yi;function hg(n,t=!1,e=Yi){if(e){let i=Qo.get(e);i||Qo.set(e,i=[]),i.push(n)}}function dg(n,t,e=he){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=y=>s?y:xn(y)||s===!1||s===0?ri(y,1):ri(y);let u,f,h,p,g=!1,_=!1;if(He(n)?(f=()=>n.value,g=xn(n)):ns(n)?(f=()=>c(n),g=!0):Wt(n)?(_=!0,g=n.some(y=>ns(y)||xn(y)),f=()=>n.map(y=>{if(He(y))return y.value;if(ns(y))return c(y);if(Yt(y))return l?l(y,2):y()})):Yt(n)?t?f=l?()=>l(n,2):n:f=()=>{if(h){fi();try{h()}finally{hi()}}const y=Yi;Yi=u;try{return l?l(n,3,[p]):n(p)}finally{Yi=y}}:f=kn,t&&s){const y=f,I=s===!0?1/0:s;f=()=>ri(y(),I)}const m=Vm(),d=()=>{u.stop(),m&&m.active&&Wc(m.effects,u)};if(r&&t){const y=t;t=(...I)=>{y(...I),d()}}let E=_?new Array(n.length).fill(fo):fo;const T=y=>{if(!(!(u.flags&1)||!u.dirty&&!y))if(t){const I=u.run();if(s||g||(_?I.some((L,P)=>zn(L,E[P])):zn(I,E))){h&&h();const L=Yi;Yi=u;try{const P=[I,E===fo?void 0:_&&E[0]===fo?[]:E,p];E=I,l?l(t,3,P):t(...P)}finally{Yi=L}}}else u.run()};return a&&a(T),u=new gd(f),u.scheduler=o?()=>o(T,!1):T,p=y=>hg(y,!1,u),h=u.onStop=()=>{const y=Qo.get(u);if(y){if(l)l(y,4);else for(const I of y)I();Qo.delete(u)}},t?i?T(!0):E=u.run():o?o(T.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function ri(n,t=1/0,e){if(t<=0||!ue(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,He(n))ri(n.value,t,e);else if(Wt(n))for(let i=0;i<n.length;i++)ri(n[i],t,e);else if(ld(n)||zs(n))n.forEach(i=>{ri(i,t,e)});else if(fd(n)){for(const i in n)ri(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ri(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Kr(n,t,e,i){try{return i?n(...i):n()}catch(s){Sa(s,t,e)}}function Vn(n,t,e,i){if(Yt(n)){const s=Kr(n,t,e,i);return s&&cd(s)&&s.catch(r=>{Sa(r,t,e)}),s}if(Wt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Vn(n[r],t,e,i));return s}}function Sa(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||he;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){fi(),Kr(r,null,10,[n,l,c]),hi();return}}pg(n,e,s,i,o)}function pg(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const Ye=[];let Nn=-1;const ks=[];let Ai=null,Ps=0;const Id=Promise.resolve();let ta=null;function ss(n){const t=ta||Id;return n?t.then(this?n.bind(this):n):t}function mg(n){let t=Nn+1,e=Ye.length;for(;t<e;){const i=t+e>>>1,s=Ye[i],r=Hr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function eu(n){if(!(n.flags&1)){const t=Hr(n),e=Ye[Ye.length-1];!e||!(n.flags&2)&&t>=Hr(e)?Ye.push(n):Ye.splice(mg(t),0,n),n.flags|=1,Ud()}}function Ud(){ta||(ta=Id.then(Od))}function gg(n){Wt(n)?ks.push(...n):Ai&&n.id===-1?Ai.splice(Ps+1,0,n):n.flags&1||(ks.push(n),n.flags|=1),Ud()}function zu(n,t,e=Nn+1){for(;e<Ye.length;e++){const i=Ye[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Ye.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Nd(n){if(ks.length){const t=[...new Set(ks)].sort((e,i)=>Hr(e)-Hr(i));if(ks.length=0,Ai){Ai.push(...t);return}for(Ai=t,Ps=0;Ps<Ai.length;Ps++){const e=Ai[Ps];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Ai=null,Ps=0}}const Hr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Od(n){try{for(Nn=0;Nn<Ye.length;Nn++){const t=Ye[Nn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Kr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Nn<Ye.length;Nn++){const t=Ye[Nn];t&&(t.flags&=-2)}Nn=-1,Ye.length=0,Nd(),ta=null,(Ye.length||ks.length)&&Od()}}let fn=null,Fd=null;function ea(n){const t=fn;return fn=n,Fd=n&&n.type.__scopeId||null,t}function _g(n,t=fn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&sa(-1);const r=ea(t);let o;try{o=n(...s)}finally{ea(r),i._d&&sa(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Bd(n,t){if(fn===null)return n;const e=Ra(fn),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=he]=t[s];r&&(Yt(r)&&(r={mounted:r,updated:r}),r.deep&&ri(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function ki(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(fi(),Vn(l,e,8,[n.el,a,n,t]),hi())}}function Go(n,t){if(ze){let e=ze.provides;const i=ze.parent&&ze.parent.provides;i===e&&(e=ze.provides=Object.create(i)),e[n]=t}}function yn(n,t,e=!1){const i=y_();if(i||Hs){let s=Hs?Hs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Yt(t)?t.call(i&&i.proxy):t}}const vg=Symbol.for("v-scx"),xg=()=>yn(vg);function on(n,t,e){return zd(n,t,e)}function zd(n,t,e=he){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ne({},e),l=t&&i||!t&&r!=="post";let c;if(Wr){if(r==="sync"){const p=xg();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=kn,p.resume=kn,p.pause=kn,p}}const u=ze;a.call=(p,g,_)=>Vn(p,u,g,_);let f=!1;r==="post"?a.scheduler=p=>{je(p,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(p,g)=>{g?p():eu(p)}),a.augmentJob=p=>{t&&(p.flags|=4),f&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const h=dg(n,t,a);return Wr&&(c?c.push(h):l&&h()),h}function yg(n,t,e){const i=this.proxy,s=xe(n)?n.includes(".")?kd(i,n):()=>i[n]:n.bind(i,i);let r;Yt(t)?r=t:(r=t.handler,e=t);const o=Zr(this),a=zd(s,r.bind(i),e);return o(),a}function kd(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const Ti=new WeakMap,Hd=Symbol("_vte"),Mg=n=>n.__isTeleport,Ki=n=>n&&(n.disabled||n.disabled===""),Sg=n=>n&&(n.defer||n.defer===""),ku=n=>typeof SVGElement<"u"&&n instanceof SVGElement,Hu=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Nl=(n,t)=>{const e=n&&n.to;return xe(e)?t?t(e):null:e},Eg={name:"Teleport",__isTeleport:!0,process(n,t,e,i,s,r,o,a,l,c){const{mc:u,pc:f,pbc:h,o:{insert:p,querySelector:g,createText:_,createComment:m,parentNode:d}}=c,E=Ki(t.props);let{dynamicChildren:T}=t;const y=(P,N,w)=>{P.shapeFlag&16&&u(P.children,N,w,s,r,o,a,l)},I=(P=t)=>{const N=Ki(P.props),w=P.target=Nl(P.props,g),b=Ol(w,P,_,p);w&&(o!=="svg"&&ku(w)?o="svg":o!=="mathml"&&Hu(w)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(w),N||(y(P,w,b),Tr(P,!1)))},L=P=>{const N=()=>{if(Ti.get(P)===N){if(Ti.delete(P),Ki(P.props)){const w=d(P.el)||e;y(P,w,P.anchor),Tr(P,!0)}I(P)}};Ti.set(P,N),je(N,r)};if(n==null){const P=t.el=_(""),N=t.anchor=_("");if(p(P,e,i),p(N,e,i),Sg(t.props)||r&&r.pendingBranch){L(t);return}E&&(y(t,e,N),Tr(t,!0)),I()}else{t.el=n.el;const P=t.anchor=n.anchor,N=Ti.get(n);if(N){N.flags|=8,Ti.delete(n),L(t);return}t.targetStart=n.targetStart;const w=t.target=n.target,b=t.targetAnchor=n.targetAnchor,D=Ki(n.props),F=D?e:w,H=D?P:b;if(o==="svg"||ku(w)?o="svg":(o==="mathml"||Hu(w))&&(o="mathml"),T?(h(n.dynamicChildren,T,F,s,r,o,a),ru(n,t,!0)):l||f(n,t,F,H,s,r,o,a,!1),E)D?t.props&&n.props&&t.props.to!==n.props.to&&(t.props.to=n.props.to):ho(t,e,P,c,1);else if((t.props&&t.props.to)!==(n.props&&n.props.to)){const V=t.target=Nl(t.props,g);V&&ho(t,V,null,c,0)}else D&&ho(t,w,b,c,1);Tr(t,E)}},remove(n,t,e,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:f,props:h}=n;let p=r||!Ki(h);const g=Ti.get(n);if(g&&(g.flags|=8,Ti.delete(n),p=!1),f&&(s(c),s(u)),r&&s(l),o&16)for(let _=0;_<a.length;_++){const m=a[_];i(m,t,e,p,!!m.dynamicChildren)}},move:ho,hydrate:bg};function ho(n,t,e,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,t,e);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=r===2;if(f&&i(o,t,e),!Ti.has(n)&&(!f||Ki(u))&&l&16)for(let h=0;h<c.length;h++)s(c[h],t,e,2);f&&i(a,t,e)}function bg(n,t,e,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},f){function h(m,d){let E=d;for(;E;){if(E&&E.nodeType===8){if(E.data==="teleport start anchor")t.targetStart=E;else if(E.data==="teleport anchor"){t.targetAnchor=E,m._lpa=t.targetAnchor&&o(t.targetAnchor);break}}E=o(E)}}function p(m,d){d.anchor=f(o(m),d,a(m),e,i,s,r)}const g=t.target=Nl(t.props,l),_=Ki(t.props);if(g){const m=g._lpa||g.firstChild;t.shapeFlag&16&&(_?(p(n,t),h(g,m),t.targetAnchor||Ol(g,t,u,c,a(n)===g?n:null)):(t.anchor=o(n),h(g,m),t.targetAnchor||Ol(g,t,u,c),f(m&&o(m),t,g,e,i,s,r))),Tr(t,_)}else _&&t.shapeFlag&16&&(p(n,t),t.targetStart=n,t.targetAnchor=o(n));return t.anchor&&o(t.anchor)}const Vr=Eg;function Tr(n,t){const e=n.ctx;if(e&&e.ut){let i,s;for(t?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",e.uid),i=i.nextSibling;e.ut()}}function Ol(n,t,e,i,s=null){const r=t.targetStart=e(""),o=t.targetAnchor=e("");return r[Hd]=o,n&&(i(r,n,s),i(o,n,s)),o}const Tg=Symbol("_leaveCb");function nu(n,t){n.shapeFlag&6&&n.component?(n.transition=t,nu(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function pi(n,t){return Yt(n)?Ne({name:n.name},t,{setup:n}):n}function Vd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Vu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const na=new WeakMap;function Ir(n,t,e,i,s=!1){if(Wt(n)){n.forEach((_,m)=>Ir(_,t&&(Wt(t)?t[m]:t),e,i,s));return}if(Ur(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Ir(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Ra(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===he?a.refs={}:a.refs,f=a.setupState,h=ae(f),p=f===he?ad:_=>Vu(u,_)?!1:le(h,_),g=(_,m)=>!(m&&Vu(u,m));if(c!=null&&c!==l){if(Gu(t),xe(c))u[c]=null,p(c)&&(f[c]=null);else if(He(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(Yt(l))Kr(l,a,12,[o,u]);else{const _=xe(l),m=He(l);if(_||m){const d=()=>{if(n.f){const E=_?p(l)?f[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Wt(E)&&Wc(E,r);else if(Wt(E))E.includes(r)||E.push(r);else if(_)u[l]=[r],p(l)&&(f[l]=u[l]);else{const T=[r];g(l,n.k)&&(l.value=T),n.k&&(u[n.k]=T)}}else _?(u[l]=o,p(l)&&(f[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const E=()=>{d(),na.delete(n)};E.id=-1,na.set(n,E),je(E,e)}else Gu(n),d()}}}function Gu(n){const t=na.get(n);t&&(t.flags|=8,na.delete(n))}va().requestIdleCallback;va().cancelIdleCallback;const Ur=n=>!!n.type.__asyncLoader,Gd=n=>n.type.__isKeepAlive;function Ag(n,t){Wd(n,"a",t)}function wg(n,t){Wd(n,"da",t)}function Wd(n,t,e=ze){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ea(t,i,e),e){let s=e.parent;for(;s&&s.parent;)Gd(s.parent.vnode)&&Rg(i,t,e,s),s=s.parent}}function Rg(n,t,e,i){const s=Ea(t,n,i,!0);Xd(()=>{Wc(i[t],s)},e)}function Ea(n,t,e=ze,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{fi();const a=Zr(e),l=Vn(t,e,n,o);return a(),hi(),l});return i?s.unshift(r):s.push(r),r}}const mi=n=>(t,e=ze)=>{(!Wr||n==="sp")&&Ea(n,(...i)=>t(...i),e)},Cg=mi("bm"),ba=mi("m"),Pg=mi("bu"),Dg=mi("u"),Ta=mi("bum"),Xd=mi("um"),Lg=mi("sp"),Ig=mi("rtg"),Ug=mi("rtc");function Ng(n,t=ze){Ea("ec",n,t)}const Og="components";function Fg(n,t){return zg(Og,n,!0,t)||n}const Bg=Symbol.for("v-ndc");function zg(n,t,e=!0,i=!1){const s=fn||ze;if(s){const r=s.type;{const a=T_(r,!1);if(a&&(a===t||a===Ze(t)||a===_a(Ze(t))))return r}const o=Wu(s[n]||r[n],t)||Wu(s.appContext[n],t);return!o&&i?r:o}}function Wu(n,t){return n&&(n[t]||n[Ze(t)]||n[_a(Ze(t))])}function Ni(n,t,e,i){let s;const r=e,o=Wt(n);if(o||xe(n)){const a=o&&ns(n);let l=!1,c=!1;a&&(l=!xn(n),c=di(n),n=ya(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=t(l?c?Ys(Dn(n[u])):Dn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ue(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Fl=n=>n?up(n)?Ra(n):Fl(n.parent):null,Nr=Ne(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Fl(n.parent),$root:n=>Fl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>qd(n),$forceUpdate:n=>n.f||(n.f=()=>{eu(n.update)}),$nextTick:n=>n.n||(n.n=ss.bind(n.proxy)),$watch:n=>yg.bind(n)}),ka=(n,t)=>n!==he&&!n.__isScriptSetup&&le(n,t),kg={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(ka(i,t))return o[t]=1,i[t];if(s!==he&&le(s,t))return o[t]=2,s[t];if(le(r,t))return o[t]=3,r[t];if(e!==he&&le(e,t))return o[t]=4,e[t];Bl&&(o[t]=0)}}const c=Nr[t];let u,f;if(c)return t==="$attrs"&&Be(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==he&&le(e,t))return o[t]=4,e[t];if(f=l.config.globalProperties,le(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return ka(s,t)?(s[t]=e,!0):i!==he&&le(i,t)?(i[t]=e,!0):le(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==he&&a[0]!=="$"&&le(n,a)||ka(t,a)||le(r,a)||le(i,a)||le(Nr,a)||le(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:le(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Xu(n){return Wt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let Bl=!0;function Hg(n){const t=qd(n),e=n.proxy,i=n.ctx;Bl=!1,t.beforeCreate&&ju(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:p,updated:g,activated:_,deactivated:m,beforeDestroy:d,beforeUnmount:E,destroyed:T,unmounted:y,render:I,renderTracked:L,renderTriggered:P,errorCaptured:N,serverPrefetch:w,expose:b,inheritAttrs:D,components:F,directives:H,filters:V}=t;if(c&&Vg(c,i,null),o)for(const it in o){const K=o[it];Yt(K)&&(i[it]=K.bind(e))}if(s){const it=s.call(e,e);ue(it)&&(n.data=Ma(it))}if(Bl=!0,r)for(const it in r){const K=r[it],mt=Yt(K)?K.bind(e,e):Yt(K.get)?K.get.bind(e,e):kn,Mt=!Yt(K)&&Yt(K.set)?K.set.bind(e):kn,Ct=Qt({get:mt,set:Mt});Object.defineProperty(i,it,{enumerable:!0,configurable:!0,get:()=>Ct.value,set:Ft=>Ct.value=Ft})}if(a)for(const it in a)jd(a[it],i,e,it);if(l){const it=Yt(l)?l.call(e):l;Reflect.ownKeys(it).forEach(K=>{Go(K,it[K])})}u&&ju(u,n,"c");function tt(it,K){Wt(K)?K.forEach(mt=>it(mt.bind(e))):K&&it(K.bind(e))}if(tt(Cg,f),tt(ba,h),tt(Pg,p),tt(Dg,g),tt(Ag,_),tt(wg,m),tt(Ng,N),tt(Ug,L),tt(Ig,P),tt(Ta,E),tt(Xd,y),tt(Lg,w),Wt(b))if(b.length){const it=n.exposed||(n.exposed={});b.forEach(K=>{Object.defineProperty(it,K,{get:()=>e[K],set:mt=>e[K]=mt,enumerable:!0})})}else n.exposed||(n.exposed={});I&&n.render===kn&&(n.render=I),D!=null&&(n.inheritAttrs=D),F&&(n.components=F),H&&(n.directives=H),w&&Vd(n)}function Vg(n,t,e=kn){Wt(n)&&(n=zl(n));for(const i in n){const s=n[i];let r;ue(s)?"default"in s?r=yn(s.from||i,s.default,!0):r=yn(s.from||i):r=yn(s),He(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function ju(n,t,e){Vn(Wt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function jd(n,t,e,i){let s=i.includes(".")?kd(e,i):()=>e[i];if(xe(n)){const r=t[n];Yt(r)&&on(s,r)}else if(Yt(n))on(s,n.bind(e));else if(ue(n))if(Wt(n))n.forEach(r=>jd(r,t,e,i));else{const r=Yt(n.handler)?n.handler.bind(e):t[n.handler];Yt(r)&&on(s,r,n)}}function qd(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>ia(l,c,o,!0)),ia(l,t,o)),ue(t)&&r.set(t,l),l}function ia(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&ia(n,r,e,!0),s&&s.forEach(o=>ia(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Gg[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Gg={data:qu,props:Yu,emits:Yu,methods:Ar,computed:Ar,beforeCreate:We,created:We,beforeMount:We,mounted:We,beforeUpdate:We,updated:We,beforeDestroy:We,beforeUnmount:We,destroyed:We,unmounted:We,activated:We,deactivated:We,errorCaptured:We,serverPrefetch:We,components:Ar,directives:Ar,watch:Xg,provide:qu,inject:Wg};function qu(n,t){return t?n?function(){return Ne(Yt(n)?n.call(this,this):n,Yt(t)?t.call(this,this):t)}:t:n}function Wg(n,t){return Ar(zl(n),zl(t))}function zl(n){if(Wt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function We(n,t){return n?[...new Set([].concat(n,t))]:t}function Ar(n,t){return n?Ne(Object.create(null),n,t):t}function Yu(n,t){return n?Wt(n)&&Wt(t)?[...new Set([...n,...t])]:Ne(Object.create(null),Xu(n),Xu(t??{})):t}function Xg(n,t){if(!n)return t;if(!t)return n;const e=Ne(Object.create(null),n);for(const i in t)e[i]=We(n[i],t[i]);return e}function Yd(){return{app:null,config:{isNativeTag:ad,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let jg=0;function qg(n,t){return function(i,s=null){Yt(i)||(i=Ne({},i)),s!=null&&!ue(s)&&(s=null);const r=Yd(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:jg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:w_,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&Yt(u.install)?(o.add(u),u.install(c,...f)):Yt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const p=c._ceVNode||Ke(i,s);return p.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(p,u,h),l=!0,c._container=u,u.__vue_app__=c,Ra(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Vn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=Hs;Hs=c;try{return u()}finally{Hs=f}}};return c}}let Hs=null;const Yg=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Ze(t)}Modifiers`]||n[`${Bi(t)}Modifiers`];function $g(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||he;let s=e;const r=t.startsWith("update:"),o=r&&Yg(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>xe(u)?u.trim():u)),o.number&&(s=e.map(jc)));let a,l=i[a=Na(t)]||i[a=Na(Ze(t))];!l&&r&&(l=i[a=Na(Bi(t))]),l&&Vn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Vn(c,n,6,s)}}const Kg=new WeakMap;function $d(n,t,e=!1){const i=e?Kg:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Yt(n)){const l=c=>{const u=$d(c,t,!0);u&&(a=!0,Ne(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ue(n)&&i.set(n,null),null):(Wt(r)?r.forEach(l=>o[l]=null):Ne(o,r),ue(n)&&i.set(n,o),o)}function Aa(n,t){return!n||!pa(t)?!1:(t=t.slice(2).replace(/Once$/,""),le(n,t[0].toLowerCase()+t.slice(1))||le(n,Bi(t))||le(n,t))}function $u(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:p,ctx:g,inheritAttrs:_}=n,m=ea(n);let d,E;try{if(e.shapeFlag&4){const y=s||i,I=y;d=Fn(c.call(I,y,u,f,p,h,g)),E=a}else{const y=t;d=Fn(y.length>1?y(f,{attrs:a,slots:o,emit:l}):y(f,null)),E=t.props?a:Zg(a)}}catch(y){Or.length=0,Sa(y,n,1),d=Ke(Oi)}let T=d;if(E&&_!==!1){const y=Object.keys(E),{shapeFlag:I}=T;y.length&&I&7&&(r&&y.some(ma)&&(E=Jg(E,r)),T=Ks(T,E,!1,!0))}return e.dirs&&(T=Ks(T,null,!1,!0),T.dirs=T.dirs?T.dirs.concat(e.dirs):e.dirs),e.transition&&nu(T,e.transition),d=T,ea(m),d}const Zg=n=>{let t;for(const e in n)(e==="class"||e==="style"||pa(e))&&((t||(t={}))[e]=n[e]);return t},Jg=(n,t)=>{const e={};for(const i in n)(!ma(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function Qg(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?Ku(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(Kd(o,i,h)&&!Aa(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?Ku(i,o,c):!0:!!o;return!1}function Ku(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Kd(t,n,r)&&!Aa(e,r))return!0}return!1}function Kd(n,t,e){const i=n[e],s=t[e];return e==="style"&&ue(i)&&ue(s)?!qc(i,s):i!==s}function t_({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const Zd={},Jd=()=>Object.create(Zd),Qd=n=>Object.getPrototypeOf(n)===Zd;function e_(n,t,e,i=!1){const s={},r=Jd();n.propsDefaults=Object.create(null),tp(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Pd(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function n_(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ae(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Aa(n.emitsOptions,h))continue;const p=t[h];if(l)if(le(r,h))p!==r[h]&&(r[h]=p,c=!0);else{const g=Ze(h);s[g]=kl(l,a,g,p,n,!1)}else p!==r[h]&&(r[h]=p,c=!0)}}}else{tp(n,t,s,r)&&(c=!0);let u;for(const f in a)(!t||!le(t,f)&&((u=Bi(f))===f||!le(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(s[f]=kl(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!t||!le(t,f))&&(delete r[f],c=!0)}c&&si(n.attrs,"set","")}function tp(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(Pr(l))continue;const c=t[l];let u;s&&le(s,u=Ze(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Aa(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ae(e),c=a||he;for(let u=0;u<r.length;u++){const f=r[u];e[f]=kl(s,l,f,c[f],n,!le(c,f))}}return o}function kl(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=le(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Yt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Zr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Bi(e))&&(i=!0))}return i}const i_=new WeakMap;function ep(n,t,e=!1){const i=e?i_:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Yt(n)){const u=f=>{l=!0;const[h,p]=ep(f,t,!0);Ne(o,h),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ue(n)&&i.set(n,Bs),Bs;if(Wt(r))for(let u=0;u<r.length;u++){const f=Ze(r[u]);Zu(f)&&(o[f]=he)}else if(r)for(const u in r){const f=Ze(u);if(Zu(f)){const h=r[u],p=o[f]=Wt(h)||Yt(h)?{type:h}:Ne({},h),g=p.type;let _=!1,m=!0;if(Wt(g))for(let d=0;d<g.length;++d){const E=g[d],T=Yt(E)&&E.name;if(T==="Boolean"){_=!0;break}else T==="String"&&(m=!1)}else _=Yt(g)&&g.name==="Boolean";p[0]=_,p[1]=m,(_||le(p,"default"))&&a.push(f)}}const c=[o,a];return ue(n)&&i.set(n,c),c}function Zu(n){return n[0]!=="$"&&!Pr(n)}const iu=n=>n==="_"||n==="_ctx"||n==="$stable",su=n=>Wt(n)?n.map(Fn):[Fn(n)],s_=(n,t,e)=>{if(t._n)return t;const i=_g((...s)=>su(t(...s)),e);return i._c=!1,i},np=(n,t,e)=>{const i=n._ctx;for(const s in n){if(iu(s))continue;const r=n[s];if(Yt(r))t[s]=s_(s,r,i);else if(r!=null){const o=su(r);t[s]=()=>o}}},ip=(n,t)=>{const e=su(t);n.slots.default=()=>e},sp=(n,t,e)=>{for(const i in t)(e||!iu(i))&&(n[i]=t[i])},r_=(n,t,e)=>{const i=n.slots=Jd();if(n.vnode.shapeFlag&32){const s=t._;s?(sp(i,t,e),e&&hd(i,"_",s,!0)):np(t,i)}else t&&ip(n,t)},o_=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=he;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:sp(s,t,e):(r=!t.$stable,np(t,s)),o=t}else t&&(ip(n,t),o={default:1});if(r)for(const a in s)!iu(a)&&o[a]==null&&delete s[a]},je=f_;function a_(n){return l_(n)}function l_(n,t){const e=va();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:p=kn,insertStaticContent:g}=n,_=(S,C,M,J=null,Q=null,Z=null,ot=void 0,W=null,B=!!C.dynamicChildren)=>{if(S===C)return;S&&!mr(S,C)&&(J=O(S),Ft(S,Q,Z,!0),S=null),C.patchFlag===-2&&(B=!1,C.dynamicChildren=null);const{type:x,ref:v,shapeFlag:R}=C;switch(x){case wa:m(S,C,M,J);break;case Oi:d(S,C,M,J);break;case Wo:S==null&&E(C,M,J,ot);break;case Re:F(S,C,M,J,Q,Z,ot,W,B);break;default:R&1?I(S,C,M,J,Q,Z,ot,W,B):R&6?H(S,C,M,J,Q,Z,ot,W,B):(R&64||R&128)&&x.process(S,C,M,J,Q,Z,ot,W,B,gt)}v!=null&&Q?Ir(v,S&&S.ref,Z,C||S,!C):v==null&&S&&S.ref!=null&&Ir(S.ref,null,Z,S,!0)},m=(S,C,M,J)=>{if(S==null)i(C.el=a(C.children),M,J);else{const Q=C.el=S.el;C.children!==S.children&&c(Q,C.children)}},d=(S,C,M,J)=>{S==null?i(C.el=l(C.children||""),M,J):C.el=S.el},E=(S,C,M,J)=>{[S.el,S.anchor]=g(S.children,C,M,J,S.el,S.anchor)},T=({el:S,anchor:C},M,J)=>{let Q;for(;S&&S!==C;)Q=h(S),i(S,M,J),S=Q;i(C,M,J)},y=({el:S,anchor:C})=>{let M;for(;S&&S!==C;)M=h(S),s(S),S=M;s(C)},I=(S,C,M,J,Q,Z,ot,W,B)=>{if(C.type==="svg"?ot="svg":C.type==="math"&&(ot="mathml"),S==null)L(C,M,J,Q,Z,ot,W,B);else{const x=S.el&&S.el._isVueCE?S.el:null;try{x&&x._beginPatch(),w(S,C,Q,Z,ot,W,B)}finally{x&&x._endPatch()}}},L=(S,C,M,J,Q,Z,ot,W)=>{let B,x;const{props:v,shapeFlag:R,transition:U,dirs:k}=S;if(B=S.el=o(S.type,Z,v&&v.is,v),R&8?u(B,S.children):R&16&&N(S.children,B,null,J,Q,Ha(S,Z),ot,W),k&&ki(S,null,J,"created"),P(B,S,S.scopeId,ot,J),v){for(const vt in v)vt!=="value"&&!Pr(vt)&&r(B,vt,null,v[vt],Z,J);"value"in v&&r(B,"value",null,v.value,Z),(x=v.onVnodeBeforeMount)&&Un(x,J,S)}k&&ki(S,null,J,"beforeMount");const G=c_(Q,U);G&&U.beforeEnter(B),i(B,C,M),((x=v&&v.onVnodeMounted)||G||k)&&je(()=>{try{x&&Un(x,J,S),G&&U.enter(B),k&&ki(S,null,J,"mounted")}finally{}},Q)},P=(S,C,M,J,Q)=>{if(M&&p(S,M),J)for(let Z=0;Z<J.length;Z++)p(S,J[Z]);if(Q){let Z=Q.subTree;if(C===Z||ap(Z.type)&&(Z.ssContent===C||Z.ssFallback===C)){const ot=Q.vnode;P(S,ot,ot.scopeId,ot.slotScopeIds,Q.parent)}}},N=(S,C,M,J,Q,Z,ot,W,B=0)=>{for(let x=B;x<S.length;x++){const v=S[x]=W?ii(S[x]):Fn(S[x]);_(null,v,C,M,J,Q,Z,ot,W)}},w=(S,C,M,J,Q,Z,ot)=>{const W=C.el=S.el;let{patchFlag:B,dynamicChildren:x,dirs:v}=C;B|=S.patchFlag&16;const R=S.props||he,U=C.props||he;let k;if(M&&Hi(M,!1),(k=U.onVnodeBeforeUpdate)&&Un(k,M,C,S),v&&ki(C,S,M,"beforeUpdate"),M&&Hi(M,!0),(R.innerHTML&&U.innerHTML==null||R.textContent&&U.textContent==null)&&u(W,""),x?b(S.dynamicChildren,x,W,M,J,Ha(C,Q),Z):ot||K(S,C,W,null,M,J,Ha(C,Q),Z,!1),B>0){if(B&16)D(W,R,U,M,Q);else if(B&2&&R.class!==U.class&&r(W,"class",null,U.class,Q),B&4&&r(W,"style",R.style,U.style,Q),B&8){const G=C.dynamicProps;for(let vt=0;vt<G.length;vt++){const ct=G[vt],dt=R[ct],Pt=U[ct];(Pt!==dt||ct==="value")&&r(W,ct,dt,Pt,Q,M)}}B&1&&S.children!==C.children&&u(W,C.children)}else!ot&&x==null&&D(W,R,U,M,Q);((k=U.onVnodeUpdated)||v)&&je(()=>{k&&Un(k,M,C,S),v&&ki(C,S,M,"updated")},J)},b=(S,C,M,J,Q,Z,ot)=>{for(let W=0;W<C.length;W++){const B=S[W],x=C[W],v=B.el&&(B.type===Re||!mr(B,x)||B.shapeFlag&198)?f(B.el):M;_(B,x,v,null,J,Q,Z,ot,!0)}},D=(S,C,M,J,Q)=>{if(C!==M){if(C!==he)for(const Z in C)!Pr(Z)&&!(Z in M)&&r(S,Z,C[Z],null,Q,J);for(const Z in M){if(Pr(Z))continue;const ot=M[Z],W=C[Z];ot!==W&&Z!=="value"&&r(S,Z,W,ot,Q,J)}"value"in M&&r(S,"value",C.value,M.value,Q)}},F=(S,C,M,J,Q,Z,ot,W,B)=>{const x=C.el=S?S.el:a(""),v=C.anchor=S?S.anchor:a("");let{patchFlag:R,dynamicChildren:U,slotScopeIds:k}=C;k&&(W=W?W.concat(k):k),S==null?(i(x,M,J),i(v,M,J),N(C.children||[],M,v,Q,Z,ot,W,B)):R>0&&R&64&&U&&S.dynamicChildren&&S.dynamicChildren.length===U.length?(b(S.dynamicChildren,U,M,Q,Z,ot,W),(C.key!=null||Q&&C===Q.subTree)&&ru(S,C,!0)):K(S,C,M,v,Q,Z,ot,W,B)},H=(S,C,M,J,Q,Z,ot,W,B)=>{C.slotScopeIds=W,S==null?C.shapeFlag&512?Q.ctx.activate(C,M,J,ot,B):V(C,M,J,Q,Z,ot,B):$(S,C,B)},V=(S,C,M,J,Q,Z,ot)=>{const W=S.component=x_(S,J,Q);if(Gd(S)&&(W.ctx.renderer=gt),M_(W,!1,ot),W.asyncDep){if(Q&&Q.registerDep(W,tt,ot),!S.el){const B=W.subTree=Ke(Oi);d(null,B,C,M),S.placeholder=B.el}}else tt(W,S,C,M,Q,Z,ot)},$=(S,C,M)=>{const J=C.component=S.component;if(Qg(S,C,M))if(J.asyncDep&&!J.asyncResolved){it(J,C,M);return}else J.next=C,J.update();else C.el=S.el,J.vnode=C},tt=(S,C,M,J,Q,Z,ot)=>{const W=()=>{if(S.isMounted){let{next:R,bu:U,u:k,parent:G,vnode:vt}=S;{const pt=rp(S);if(pt){R&&(R.el=vt.el,it(S,R,ot)),pt.asyncDep.then(()=>{je(()=>{S.isUnmounted||x()},Q)});return}}let ct=R,dt;Hi(S,!1),R?(R.el=vt.el,it(S,R,ot)):R=vt,U&&Vo(U),(dt=R.props&&R.props.onVnodeBeforeUpdate)&&Un(dt,G,R,vt),Hi(S,!0);const Pt=$u(S),st=S.subTree;S.subTree=Pt,_(st,Pt,f(st.el),O(st),S,Q,Z),R.el=Pt.el,ct===null&&t_(S,Pt.el),k&&je(k,Q),(dt=R.props&&R.props.onVnodeUpdated)&&je(()=>Un(dt,G,R,vt),Q)}else{let R;const{el:U,props:k}=C,{bm:G,m:vt,parent:ct,root:dt,type:Pt}=S,st=Ur(C);Hi(S,!1),G&&Vo(G),!st&&(R=k&&k.onVnodeBeforeMount)&&Un(R,ct,C),Hi(S,!0);{dt.ce&&dt.ce._hasShadowRoot()&&dt.ce._injectChildStyle(Pt,S.parent?S.parent.type:void 0);const pt=S.subTree=$u(S);_(null,pt,M,J,S,Q,Z),C.el=pt.el}if(vt&&je(vt,Q),!st&&(R=k&&k.onVnodeMounted)){const pt=C;je(()=>Un(R,ct,pt),Q)}(C.shapeFlag&256||ct&&Ur(ct.vnode)&&ct.vnode.shapeFlag&256)&&S.a&&je(S.a,Q),S.isMounted=!0,C=M=J=null}};S.scope.on();const B=S.effect=new gd(W);S.scope.off();const x=S.update=B.run.bind(B),v=S.job=B.runIfDirty.bind(B);v.i=S,v.id=S.uid,B.scheduler=()=>eu(v),Hi(S,!0),x()},it=(S,C,M)=>{C.component=S;const J=S.vnode.props;S.vnode=C,S.next=null,n_(S,C.props,J,M),o_(S,C.children,M),fi(),zu(S),hi()},K=(S,C,M,J,Q,Z,ot,W,B=!1)=>{const x=S&&S.children,v=S?S.shapeFlag:0,R=C.children,{patchFlag:U,shapeFlag:k}=C;if(U>0){if(U&128){Mt(x,R,M,J,Q,Z,ot,W,B);return}else if(U&256){mt(x,R,M,J,Q,Z,ot,W,B);return}}k&8?(v&16&&Tt(x,Q,Z),R!==x&&u(M,R)):v&16?k&16?Mt(x,R,M,J,Q,Z,ot,W,B):Tt(x,Q,Z,!0):(v&8&&u(M,""),k&16&&N(R,M,J,Q,Z,ot,W,B))},mt=(S,C,M,J,Q,Z,ot,W,B)=>{S=S||Bs,C=C||Bs;const x=S.length,v=C.length,R=Math.min(x,v);let U;for(U=0;U<R;U++){const k=C[U]=B?ii(C[U]):Fn(C[U]);_(S[U],k,M,null,Q,Z,ot,W,B)}x>v?Tt(S,Q,Z,!0,!1,R):N(C,M,J,Q,Z,ot,W,B,R)},Mt=(S,C,M,J,Q,Z,ot,W,B)=>{let x=0;const v=C.length;let R=S.length-1,U=v-1;for(;x<=R&&x<=U;){const k=S[x],G=C[x]=B?ii(C[x]):Fn(C[x]);if(mr(k,G))_(k,G,M,null,Q,Z,ot,W,B);else break;x++}for(;x<=R&&x<=U;){const k=S[R],G=C[U]=B?ii(C[U]):Fn(C[U]);if(mr(k,G))_(k,G,M,null,Q,Z,ot,W,B);else break;R--,U--}if(x>R){if(x<=U){const k=U+1,G=k<v?C[k].el:J;for(;x<=U;)_(null,C[x]=B?ii(C[x]):Fn(C[x]),M,G,Q,Z,ot,W,B),x++}}else if(x>U)for(;x<=R;)Ft(S[x],Q,Z,!0),x++;else{const k=x,G=x,vt=new Map;for(x=G;x<=U;x++){const yt=C[x]=B?ii(C[x]):Fn(C[x]);yt.key!=null&&vt.set(yt.key,x)}let ct,dt=0;const Pt=U-G+1;let st=!1,pt=0;const Et=new Array(Pt);for(x=0;x<Pt;x++)Et[x]=0;for(x=k;x<=R;x++){const yt=S[x];if(dt>=Pt){Ft(yt,Q,Z,!0);continue}let kt;if(yt.key!=null)kt=vt.get(yt.key);else for(ct=G;ct<=U;ct++)if(Et[ct-G]===0&&mr(yt,C[ct])){kt=ct;break}kt===void 0?Ft(yt,Q,Z,!0):(Et[kt-G]=x+1,kt>=pt?pt=kt:st=!0,_(yt,C[kt],M,null,Q,Z,ot,W,B),dt++)}const Ht=st?u_(Et):Bs;for(ct=Ht.length-1,x=Pt-1;x>=0;x--){const yt=G+x,kt=C[yt],Vt=C[yt+1],te=yt+1<v?Vt.el||op(Vt):J;Et[x]===0?_(null,kt,M,te,Q,Z,ot,W,B):st&&(ct<0||x!==Ht[ct]?Ct(kt,M,te,2):ct--)}}},Ct=(S,C,M,J,Q=null)=>{const{el:Z,type:ot,transition:W,children:B,shapeFlag:x}=S;if(x&6){Ct(S.component.subTree,C,M,J);return}if(x&128){S.suspense.move(C,M,J);return}if(x&64){ot.move(S,C,M,gt);return}if(ot===Re){i(Z,C,M);for(let R=0;R<B.length;R++)Ct(B[R],C,M,J);i(S.anchor,C,M);return}if(ot===Wo){T(S,C,M);return}if(J!==2&&x&1&&W)if(J===0)W.beforeEnter(Z),i(Z,C,M),je(()=>W.enter(Z),Q);else{const{leave:R,delayLeave:U,afterLeave:k}=W,G=()=>{S.ctx.isUnmounted?s(Z):i(Z,C,M)},vt=()=>{Z._isLeaving&&Z[Tg](!0),R(Z,()=>{G(),k&&k()})};U?U(Z,G,vt):vt()}else i(Z,C,M)},Ft=(S,C,M,J=!1,Q=!1)=>{const{type:Z,props:ot,ref:W,children:B,dynamicChildren:x,shapeFlag:v,patchFlag:R,dirs:U,cacheIndex:k,memo:G}=S;if(R===-2&&(Q=!1),W!=null&&(fi(),Ir(W,null,M,S,!0),hi()),k!=null&&(C.renderCache[k]=void 0),v&256){C.ctx.deactivate(S);return}const vt=v&1&&U,ct=!Ur(S);let dt;if(ct&&(dt=ot&&ot.onVnodeBeforeUnmount)&&Un(dt,C,S),v&6)_t(S.component,M,J);else{if(v&128){S.suspense.unmount(M,J);return}vt&&ki(S,null,C,"beforeUnmount"),v&64?S.type.remove(S,C,M,gt,J):x&&!x.hasOnce&&(Z!==Re||R>0&&R&64)?Tt(x,C,M,!1,!0):(Z===Re&&R&384||!Q&&v&16)&&Tt(B,C,M),J&&Jt(S)}const Pt=G!=null&&k==null;(ct&&(dt=ot&&ot.onVnodeUnmounted)||vt||Pt)&&je(()=>{dt&&Un(dt,C,S),vt&&ki(S,null,C,"unmounted"),Pt&&(S.el=null)},M)},Jt=S=>{const{type:C,el:M,anchor:J,transition:Q}=S;if(C===Re){at(M,J);return}if(C===Wo){y(S);return}const Z=()=>{s(M),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave()};if(S.shapeFlag&1&&Q&&!Q.persisted){const{leave:ot,delayLeave:W}=Q,B=()=>ot(M,Z);W?W(S.el,Z,B):B()}else Z()},at=(S,C)=>{let M;for(;S!==C;)M=h(S),s(S),S=M;s(C)},_t=(S,C,M)=>{const{bum:J,scope:Q,job:Z,subTree:ot,um:W,m:B,a:x}=S;Ju(B),Ju(x),J&&Vo(J),Q.stop(),Z&&(Z.flags|=8,Ft(ot,S,C,M)),W&&je(W,C),je(()=>{S.isUnmounted=!0},C)},Tt=(S,C,M,J=!1,Q=!1,Z=0)=>{for(let ot=Z;ot<S.length;ot++)Ft(S[ot],C,M,J,Q)},O=S=>{if(S.shapeFlag&6)return O(S.component.subTree);if(S.shapeFlag&128)return S.suspense.next();const C=h(S.anchor||S.el),M=C&&C[Hd];return M?h(M):C};let ut=!1;const lt=(S,C,M)=>{let J;S==null?C._vnode&&(Ft(C._vnode,null,null,!0),J=C._vnode.component):_(C._vnode||null,S,C,null,null,null,M),C._vnode=S,ut||(ut=!0,zu(J),Nd(),ut=!1)},gt={p:_,um:Ft,m:Ct,r:Jt,mt:V,mc:N,pc:K,pbc:b,n:O,o:n};return{render:lt,hydrate:void 0,createApp:qg(lt)}}function Ha({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Hi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function c_(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function ru(n,t,e=!1){const i=n.children,s=t.children;if(Wt(i)&&Wt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ii(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&ru(o,a)),a.type===wa&&(a.patchFlag===-1&&(a=s[r]=ii(a)),a.el=o.el),a.type===Oi&&!a.el&&(a.el=o.el)}}function u_(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function rp(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:rp(t)}function Ju(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function op(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?op(t.subTree):null}const ap=n=>n.__isSuspense;function f_(n,t){t&&t.pendingBranch?Wt(n)?t.effects.push(...n):t.effects.push(n):gg(n)}const Re=Symbol.for("v-fgt"),wa=Symbol.for("v-txt"),Oi=Symbol.for("v-cmt"),Wo=Symbol.for("v-stc"),Or=[];let hn=null;function Dt(n=!1){Or.push(hn=n?null:[])}function h_(){Or.pop(),hn=Or[Or.length-1]||null}let Gr=1;function sa(n,t=!1){Gr+=n,n<0&&hn&&t&&(hn.hasOnce=!0)}function lp(n){return n.dynamicChildren=Gr>0?hn||Bs:null,h_(),Gr>0&&hn&&hn.push(n),n}function Ot(n,t,e,i,s,r){return lp(Y(n,t,e,i,s,r,!0))}function rs(n,t,e,i,s){return lp(Ke(n,t,e,i,s,!0))}function ra(n){return n?n.__v_isVNode===!0:!1}function mr(n,t){return n.type===t.type&&n.key===t.key}const cp=({key:n})=>n??null,Xo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?xe(n)||He(n)||Yt(n)?{i:fn,r:n,k:t,f:!!e}:n:null);function Y(n,t=null,e=null,i=0,s=null,r=n===Re?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&cp(t),ref:t&&Xo(t),scopeId:Fd,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:fn};return a?(ou(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=xe(e)?8:16),Gr>0&&!o&&hn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&hn.push(l),l}const Ke=d_;function d_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Bg)&&(n=Oi),ra(n)){const a=Ks(n,t,!0);return e&&ou(a,e),Gr>0&&!r&&hn&&(a.shapeFlag&6?hn[hn.indexOf(n)]=a:hn.push(a)),a.patchFlag=-2,a}if(A_(n)&&(n=n.__vccOpts),t){t=p_(t);let{class:a,style:l}=t;a&&!xe(a)&&(t.class=Ui(a)),ue(l)&&(tu(l)&&!Wt(l)&&(l=Ne({},l)),t.style=xa(l))}const o=xe(n)?1:ap(n)?128:Mg(n)?64:ue(n)?4:Yt(n)?2:0;return Y(n,t,e,i,s,o,r,!0)}function p_(n){return n?tu(n)||Qd(n)?Ne({},n):n:null}function Ks(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?g_(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&cp(c),ref:t&&t.ref?e&&r?Wt(r)?r.concat(Xo(t)):[r,Xo(t)]:Xo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Re?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ks(n.ssContent),ssFallback:n.ssFallback&&Ks(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&nu(u,l.clone(u)),u}function Hl(n=" ",t=0){return Ke(wa,null,n,t)}function m_(n,t){const e=Ke(Wo,null,n);return e.staticCount=t,e}function Ie(n="",t=!1){return t?(Dt(),rs(Oi,null,n)):Ke(Oi,null,n)}function Fn(n){return n==null||typeof n=="boolean"?Ke(Oi):Wt(n)?Ke(Re,null,n.slice()):ra(n)?ii(n):Ke(wa,null,String(n))}function ii(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ks(n)}function ou(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Wt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),ou(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Qd(t)?t._ctx=fn:s===3&&fn&&(fn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Yt(t)?(t={default:t,_ctx:fn},e=32):(t=String(t),i&64?(e=16,t=[Hl(t)]):e=8);n.children=t,n.shapeFlag|=e}function g_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Ui([t.class,i.class]));else if(s==="style")t.style=xa([t.style,i.style]);else if(pa(s)){const r=t[s],o=i[s];o&&r!==o&&!(Wt(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ma(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Un(n,t,e,i=null){Vn(n,t,7,[e,i])}const __=Yd();let v_=0;function x_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||__,r={uid:v_++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Hm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ep(i,s),emitsOptions:$d(i,s),emit:null,emitted:null,propsDefaults:he,inheritAttrs:i.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=$g.bind(null,r),n.ce&&n.ce(r),r}let ze=null;const y_=()=>ze||fn;let oa,Vl;{const n=va(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};oa=t("__VUE_INSTANCE_SETTERS__",e=>ze=e),Vl=t("__VUE_SSR_SETTERS__",e=>Wr=e)}const Zr=n=>{const t=ze;return oa(n),n.scope.on(),()=>{n.scope.off(),oa(t)}},Qu=()=>{ze&&ze.scope.off(),oa(null)};function up(n){return n.vnode.shapeFlag&4}let Wr=!1;function M_(n,t=!1,e=!1){t&&Vl(t);const{props:i,children:s}=n.vnode,r=up(n);e_(n,i,r,t),r_(n,s,e||t);const o=r?S_(n,t):void 0;return t&&Vl(!1),o}function S_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,kg);const{setup:i}=e;if(i){fi();const s=n.setupContext=i.length>1?b_(n):null,r=Zr(n),o=Kr(i,n,0,[n.props,s]),a=cd(o);if(hi(),r(),(a||n.sp)&&!Ur(n)&&Vd(n),a){if(o.then(Qu,Qu),t)return o.then(l=>{tf(n,l)}).catch(l=>{Sa(l,n,0)});n.asyncDep=o}else tf(n,o)}else fp(n)}function tf(n,t,e){Yt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ue(t)&&(n.setupState=Ld(t)),fp(n)}function fp(n,t,e){const i=n.type;n.render||(n.render=i.render||kn);{const s=Zr(n);fi();try{Hg(n)}finally{hi(),s()}}}const E_={get(n,t){return Be(n,"get",""),n[t]}};function b_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,E_),slots:n.slots,emit:n.emit,expose:t}}function Ra(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ld(ag(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Nr)return Nr[e](n)},has(t,e){return e in t||e in Nr}})):n.proxy}function T_(n,t=!0){return Yt(n)?n.displayName||n.name:n.name||t&&n.__name}function A_(n){return Yt(n)&&"__vccOpts"in n}const Qt=(n,t)=>fg(n,t,Wr);function hp(n,t,e){try{sa(-1);const i=arguments.length;return i===2?ue(t)&&!Wt(t)?ra(t)?Ke(n,null,[t]):Ke(n,t):Ke(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&ra(e)&&(e=[e]),Ke(n,t,e))}finally{sa(1)}}const w_="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Gl;const ef=typeof window<"u"&&window.trustedTypes;if(ef)try{Gl=ef.createPolicy("vue",{createHTML:n=>n})}catch{}const dp=Gl?n=>Gl.createHTML(n):n=>n,R_="http://www.w3.org/2000/svg",C_="http://www.w3.org/1998/Math/MathML",ni=typeof document<"u"?document:null,nf=ni&&ni.createElement("template"),P_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ni.createElementNS(R_,n):t==="mathml"?ni.createElementNS(C_,n):e?ni.createElement(n,{is:e}):ni.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ni.createTextNode(n),createComment:n=>ni.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ni.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{nf.innerHTML=dp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=nf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},D_=Symbol("_vtc");function L_(n,t,e){const i=n[D_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const aa=Symbol("_vod"),pp=Symbol("_vsh"),I_={name:"show",beforeMount(n,{value:t},{transition:e}){n[aa]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):gr(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),gr(n,!0),i.enter(n)):i.leave(n,()=>{gr(n,!1)}):gr(n,t))},beforeUnmount(n,{value:t}){gr(n,t)}};function gr(n,t){n.style.display=t?n[aa]:"none",n[pp]=!t}const U_=Symbol(""),N_=/(?:^|;)\s*display\s*:/;function O_(n,t,e){const i=n.style,s=xe(e);let r=!1;if(e&&!s){if(t)if(xe(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&wr(i,a,"")}else for(const o in t)e[o]==null&&wr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?B_(n,o,!xe(t)&&t?t[o]:void 0,a)||wr(i,o,a):wr(i,o,"")}}else if(s){if(t!==e){const o=i[U_];o&&(e+=";"+o),i.cssText=e,r=N_.test(e)}}else t&&n.removeAttribute("style");aa in n&&(n[aa]=r?i.display:"",n[pp]&&(i.display="none"))}const sf=/\s*!important$/;function wr(n,t,e){if(Wt(e))e.forEach(i=>wr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=F_(n,t);sf.test(e)?n.setProperty(Bi(i),e.replace(sf,""),"important"):n[i]=e}}const rf=["Webkit","Moz","ms"],Va={};function F_(n,t){const e=Va[t];if(e)return e;let i=Ze(t);if(i!=="filter"&&i in n)return Va[t]=i;i=_a(i);for(let s=0;s<rf.length;s++){const r=rf[s]+i;if(r in n)return Va[t]=r}return t}function B_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&xe(i)&&e===i}const of="http://www.w3.org/1999/xlink";function af(n,t,e,i,s,r=zm(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(of,t.slice(6,t.length)):n.setAttributeNS(of,t,e):e==null||r&&!dd(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Hn(e)?String(e):e)}function lf(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?dp(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=dd(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Ds(n,t,e,i){n.addEventListener(t,e,i)}function z_(n,t,e,i){n.removeEventListener(t,e,i)}const cf=Symbol("_vei");function k_(n,t,e,i,s=null){const r=n[cf]||(n[cf]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=H_(t);if(i){const c=r[t]=W_(i,s);Ds(n,a,c,l)}else o&&(z_(n,a,o,l),r[t]=void 0)}}const uf=/(?:Once|Passive|Capture)$/;function H_(n){let t;if(uf.test(n)){t={};let i;for(;i=n.match(uf);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Bi(n.slice(2)),t]}let Ga=0;const V_=Promise.resolve(),G_=()=>Ga||(V_.then(()=>Ga=0),Ga=Date.now());function W_(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Vn(X_(i,e.value),t,5,[i])};return e.value=n,e.attached=G_(),e}function X_(n,t){if(Wt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const ff=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,j_=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?L_(n,i,o):t==="style"?O_(n,e,i):pa(t)?ma(t)||k_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):q_(n,t,i,o))?(lf(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&af(n,t,i,o,r,t!=="value")):n._isVueCE&&(Y_(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!xe(i)))?lf(n,Ze(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),af(n,t,i,o))};function q_(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&ff(t)&&Yt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ff(t)&&xe(e)?!1:t in n}function Y_(n,t){const e=n._def.props;if(!e)return!1;const i=Ze(t);return Array.isArray(e)?e.some(s=>Ze(s)===i):Object.keys(e).some(s=>Ze(s)===i)}const hf=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Wt(t)?e=>Vo(t,e):t};function $_(n){n.target.composing=!0}function df(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Wa=Symbol("_assign");function pf(n,t,e){return t&&(n=n.trim()),e&&(n=jc(n)),n}const K_={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n[Wa]=hf(s);const r=i||s.props&&s.props.type==="number";Ds(n,t?"change":"input",o=>{o.target.composing||n[Wa](pf(n.value,e,r))}),(e||r)&&Ds(n,"change",()=>{n.value=pf(n.value,e,r)}),t||(Ds(n,"compositionstart",$_),Ds(n,"compositionend",df),Ds(n,"change",df))},mounted(n,{value:t}){n.value=t??""},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[Wa]=hf(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?jc(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},Z_=["ctrl","shift","alt","meta"],J_={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>Z_.some(e=>n[`${e}Key`]&&!t.includes(e))},Di=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=J_[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},Q_={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},tv=(n,t)=>{const e=n._withKeys||(n._withKeys={}),i=t.join(".");return e[i]||(e[i]=(s=>{if(!("key"in s))return;const r=Bi(s.key);if(t.some(o=>o===r||Q_[o]===r))return n(s)}))},ev=Ne({patchProp:j_},P_);let mf;function nv(){return mf||(mf=a_(ev))}const iv=((...n)=>{const t=nv().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=rv(i);if(!s)return;const r=t._component;!Yt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,sv(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function sv(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function rv(n){return xe(n)?document.querySelector(n):n}const zi=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},ov={};function av(n,t){const e=Fg("router-view");return Dt(),rs(e)}const lv=zi(ov,[["render",av]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ls=typeof document<"u";function mp(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function cv(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&mp(n.default)}const oe=Object.assign;function Xa(n,t){const e={};for(const i in t){const s=t[i];e[i]=Ln(s)?s.map(n):n(s)}return e}const Fr=()=>{},Ln=Array.isArray;function gf(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const gp=/#/g,uv=/&/g,fv=/\//g,hv=/=/g,dv=/\?/g,_p=/\+/g,pv=/%5B/g,mv=/%5D/g,vp=/%5E/g,gv=/%60/g,xp=/%7B/g,_v=/%7C/g,yp=/%7D/g,vv=/%20/g;function au(n){return n==null?"":encodeURI(""+n).replace(_v,"|").replace(pv,"[").replace(mv,"]")}function xv(n){return au(n).replace(xp,"{").replace(yp,"}").replace(vp,"^")}function Wl(n){return au(n).replace(_p,"%2B").replace(vv,"+").replace(gp,"%23").replace(uv,"%26").replace(gv,"`").replace(xp,"{").replace(yp,"}").replace(vp,"^")}function yv(n){return Wl(n).replace(hv,"%3D")}function Mv(n){return au(n).replace(gp,"%23").replace(dv,"%3F")}function Sv(n){return Mv(n).replace(fv,"%2F")}function Xr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const Ev=/\/$/,bv=n=>n.replace(Ev,"");function ja(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=Rv(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:Xr(o)}}function Tv(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function _f(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function Av(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&Zs(t.matched[i],e.matched[s])&&Mp(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function Zs(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function Mp(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!wv(n[e],t[e]))return!1;return!0}function wv(n,t){return Ln(n)?vf(n,t):Ln(t)?vf(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function vf(n,t){return Ln(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function Rv(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const vi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Xl=(function(n){return n.pop="pop",n.push="push",n})({}),qa=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function Cv(n){if(!n)if(Ls){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),bv(n)}const Pv=/^[^#]+#/;function Dv(n,t){return n.replace(Pv,"#")+t}function Lv(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const Ca=()=>({left:window.scrollX,top:window.scrollY});function Iv(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=Lv(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function xf(n,t){return(history.state?history.state.position-t:-1)+n}const jl=new Map;function Uv(n,t){jl.set(n,t)}function Nv(n){const t=jl.get(n);return jl.delete(n),t}function Ov(n){return typeof n=="string"||n&&typeof n=="object"}function Sp(n){return typeof n=="string"||typeof n=="symbol"}let ye=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Ep=Symbol("");ye.MATCHER_NOT_FOUND+"",ye.NAVIGATION_GUARD_REDIRECT+"",ye.NAVIGATION_ABORTED+"",ye.NAVIGATION_CANCELLED+"",ye.NAVIGATION_DUPLICATED+"";function Js(n,t){return oe(new Error,{type:n,[Ep]:!0},t)}function $n(n,t){return n instanceof Error&&Ep in n&&(t==null||!!(n.type&t))}const Fv=["params","query","hash"];function Bv(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of Fv)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function zv(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(_p," "),r=s.indexOf("="),o=Xr(r<0?s:s.slice(0,r)),a=r<0?null:Xr(s.slice(r+1));if(o in t){let l=t[o];Ln(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function yf(n){let t="";for(let e in n){const i=n[e];if(e=yv(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(Ln(i)?i.map(s=>s&&Wl(s)):[i&&Wl(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function kv(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=Ln(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const Hv=Symbol(""),Mf=Symbol(""),Jr=Symbol(""),lu=Symbol(""),ql=Symbol("");function _r(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function wi(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(Js(ye.NAVIGATION_ABORTED,{from:e,to:t})):h instanceof Error?l(h):Ov(h)?l(Js(ye.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(o&&i.enterCallbacks[s]===o&&typeof h=="function"&&o.push(h),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function Ya(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(mp(l)){const c=(l.__vccOpts||l)[t];c&&r.push(wi(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=cv(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[t];return h&&wi(h,e,i,o,a,s)()}))}}return r}function Vv(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>Zs(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>Zs(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Gv=()=>location.protocol+"//"+location.host;function bp(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),_f(a,"")}return _f(e,n)+i+s}function Wv(n,t,e,i){let s=[],r=[],o=null;const a=({state:h})=>{const p=bp(n,location),g=e.value,_=t.value;let m=0;if(h){if(e.value=p,t.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(p);s.forEach(d=>{d(e.value,g,{delta:m,type:Xl.pop,direction:m?m>0?qa.forward:qa.back:qa.unknown})})};function l(){o=e.value}function c(h){s.push(h);const p=()=>{const g=s.indexOf(h);g>-1&&s.splice(g,1)};return r.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(oe({},h.state,{scroll:Ca()}),"")}}function f(){for(const h of r)h();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function Sf(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?Ca():null}}function Xv(n){const{history:t,location:e}=window,i={value:bp(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const f=n.indexOf("#"),h=f>-1?(e.host&&document.querySelector("base")?n:n.slice(f))+l:Gv()+n+l;try{t[u?"replaceState":"pushState"](c,"",h),s.value=c}catch(p){console.error(p),e[u?"replace":"assign"](h)}}function o(l,c){r(l,oe({},t.state,Sf(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=oe({},s.value,t.state,{forward:l,scroll:Ca()});r(u.current,u,!0),r(l,oe({},Sf(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function jv(n){n=Cv(n);const t=Xv(n),e=Wv(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=oe({location:"",base:n,go:i,createHref:Dv.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function qv(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),jv(n)}let Qi=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Ae=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Ae||{});const Yv={type:Qi.Static,value:""},$v=/[a-zA-Z0-9_]/;function Kv(n){if(!n)return[[]];if(n==="/")return[[Yv]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(p){throw new Error(`ERR (${e})/"${c}": ${p}`)}let e=Ae.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function f(){c&&(e===Ae.Static?r.push({type:Qi.Static,value:c}):e===Ae.Param||e===Ae.ParamRegExp||e===Ae.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:Qi.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==Ae.ParamRegExp){i=e,e=Ae.EscapeNext;continue}switch(e){case Ae.Static:l==="/"?(c&&f(),o()):l===":"?(f(),e=Ae.Param):h();break;case Ae.EscapeNext:h(),e=i;break;case Ae.Param:l==="("?e=Ae.ParamRegExp:$v.test(l)?h():(f(),e=Ae.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Ae.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=Ae.ParamRegExpEnd:u+=l;break;case Ae.ParamRegExpEnd:f(),e=Ae.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===Ae.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),f(),o(),s}const Ef="[^/]+?",Zv={sensitive:!1,strict:!1,start:!0,end:!0};var qe=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(qe||{});const Jv=/[.+*?^${}()[\]/\\]/g;function Qv(n,t){const e=oe({},Zv,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[qe.Root];e.strict&&!c.length&&(s+="/");for(let f=0;f<c.length;f++){const h=c[f];let p=qe.Segment+(e.sensitive?qe.BonusCaseSensitive:0);if(h.type===Qi.Static)f||(s+="/"),s+=h.value.replace(Jv,"\\$&"),p+=qe.Static;else if(h.type===Qi.Param){const{value:g,repeatable:_,optional:m,regexp:d}=h;r.push({name:g,repeatable:_,optional:m});const E=d||Ef;if(E!==Ef){p+=qe.BonusCustomRegExp;try{`${E}`}catch(y){throw new Error(`Invalid custom RegExp for param "${g}" (${E}): `+y.message)}}let T=_?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;f||(T=m&&c.length<2?`(?:/${T})`:"/"+T),m&&(T+="?"),s+=T,p+=qe.Dynamic,m&&(p+=qe.BonusOptional),_&&(p+=qe.BonusRepeatable),E===".*"&&(p+=qe.BonusWildcard)}u.push(p)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=qe.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const p=u[h]||"",g=r[h-1];f[g.name]=p&&g.repeatable?p.split("/"):p}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const p of h)if(p.type===Qi.Static)u+=p.value;else if(p.type===Qi.Param){const{value:g,repeatable:_,optional:m}=p,d=g in c?c[g]:"";if(Ln(d)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const E=Ln(d)?d.join("/"):d;if(!E)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=E}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function t0(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===qe.Static+qe.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===qe.Static+qe.Segment?1:-1:0}function Tp(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=t0(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(bf(i))return 1;if(bf(s))return-1}return s.length-i.length}function bf(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const e0={strict:!1,end:!0,sensitive:!1};function n0(n,t,e){const i=Qv(Kv(n.path),e),s=oe(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function i0(n,t){const e=[],i=new Map;t=gf(e0,t);function s(f){return i.get(f)}function r(f,h,p){const g=!p,_=Af(f);_.aliasOf=p&&p.record;const m=gf(t,f),d=[_];if("alias"in f){const y=typeof f.alias=="string"?[f.alias]:f.alias;for(const I of y)d.push(Af(oe({},_,{components:p?p.record.components:_.components,path:I,aliasOf:p?p.record:_})))}let E,T;for(const y of d){const{path:I}=y;if(h&&I[0]!=="/"){const L=h.record.path,P=L[L.length-1]==="/"?"":"/";y.path=h.record.path+(I&&P+I)}if(E=n0(y,h,m),p?p.alias.push(E):(T=T||E,T!==E&&T.alias.push(E),g&&f.name&&!wf(E)&&o(f.name)),Ap(E)&&l(E),_.children){const L=_.children;for(let P=0;P<L.length;P++)r(L[P],E,p&&p.children[P])}p=p||E}return T?()=>{o(T)}:Fr}function o(f){if(Sp(f)){const h=i.get(f);h&&(i.delete(f),e.splice(e.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=e.indexOf(f);h>-1&&(e.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return e}function l(f){const h=o0(f,e);e.splice(h,0,f),f.record.name&&!wf(f)&&i.set(f.record.name,f)}function c(f,h){let p,g={},_,m;if("name"in f&&f.name){if(p=i.get(f.name),!p)throw Js(ye.MATCHER_NOT_FOUND,{location:f});m=p.record.name,g=oe(Tf(h.params,p.keys.filter(T=>!T.optional).concat(p.parent?p.parent.keys.filter(T=>T.optional):[]).map(T=>T.name)),f.params&&Tf(f.params,p.keys.map(T=>T.name))),_=p.stringify(g)}else if(f.path!=null)_=f.path,p=e.find(T=>T.re.test(_)),p&&(g=p.parse(_),m=p.record.name);else{if(p=h.name?i.get(h.name):e.find(T=>T.re.test(h.path)),!p)throw Js(ye.MATCHER_NOT_FOUND,{location:f,currentLocation:h});m=p.record.name,g=oe({},h.params,f.params),_=p.stringify(g)}const d=[];let E=p;for(;E;)d.unshift(E.record),E=E.parent;return{name:m,path:_,params:g,matched:d,meta:r0(d)}}n.forEach(f=>r(f));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Tf(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function Af(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:s0(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function s0(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function wf(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function r0(n){return n.reduce((t,e)=>oe(t,e.meta),{})}function o0(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Tp(n,t[r])<0?i=r:e=r+1}const s=a0(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function a0(n){let t=n;for(;t=t.parent;)if(Ap(t)&&Tp(n,t)===0)return t}function Ap({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Rf(n){const t=yn(Jr),e=yn(lu),i=Qt(()=>{const l=Je(n.to);return t.resolve(l)}),s=Qt(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=e.matched;if(!u||!f.length)return-1;const h=f.findIndex(Zs.bind(null,u));if(h>-1)return h;const p=Cf(l[c-2]);return c>1&&Cf(u)===p&&f[f.length-1].path!==p?f.findIndex(Zs.bind(null,l[c-2])):h}),r=Qt(()=>s.value>-1&&h0(e.params,i.value.params)),o=Qt(()=>s.value>-1&&s.value===e.matched.length-1&&Mp(e.params,i.value.params));function a(l={}){if(f0(l)){const c=t[Je(n.replace)?"replace":"push"](Je(n.to)).catch(Fr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Qt(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function l0(n){return n.length===1?n[0]:n}const c0=pi({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Rf,setup(n,{slots:t}){const e=Ma(Rf(n)),{options:i}=yn(Jr),s=Qt(()=>({[Pf(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[Pf(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&l0(t.default(e));return n.custom?r:hp("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),u0=c0;function f0(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function h0(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!Ln(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function Cf(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Pf=(n,t,e)=>n??t??e,d0=pi({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=yn(ql),s=Qt(()=>n.route||i.value),r=yn(Mf,0),o=Qt(()=>{let c=Je(r);const{matched:u}=s.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Qt(()=>s.value.matched[o.value]);Go(Mf,Qt(()=>o.value+1)),Go(Hv,a),Go(ql,s);const l=Xt();return on(()=>[l.value,a.value,n.name],([c,u,f],[h,p,g])=>{u&&(u.instances[f]=c,p&&p!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Zs(u,p)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return Df(e.default,{Component:h,route:c});const p=f.props[u],g=p?p===!0?c.params:typeof p=="function"?p(c):p:null,m=hp(h,oe({},g,t,{onVnodeUnmounted:d=>{d.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return Df(e.default,{Component:m,route:c})||m}}});function Df(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const p0=d0;function m0(n){const t=i0(n.routes,n),e=n.parseQuery||zv,i=n.stringifyQuery||yf,s=n.history,r=_r(),o=_r(),a=_r(),l=$s(vi);let c=vi;Ls&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Xa.bind(null,O=>""+O),f=Xa.bind(null,Sv),h=Xa.bind(null,Xr);function p(O,ut){let lt,gt;return Sp(O)?(lt=t.getRecordMatcher(O),gt=ut):gt=O,t.addRoute(gt,lt)}function g(O){const ut=t.getRecordMatcher(O);ut&&t.removeRoute(ut)}function _(){return t.getRoutes().map(O=>O.record)}function m(O){return!!t.getRecordMatcher(O)}function d(O,ut){if(ut=oe({},ut||l.value),typeof O=="string"){const M=ja(e,O,ut.path),J=t.resolve({path:M.path},ut),Q=s.createHref(M.fullPath);return oe(M,J,{params:h(J.params),hash:Xr(M.hash),redirectedFrom:void 0,href:Q})}let lt;if(O.path!=null)lt=oe({},O,{path:ja(e,O.path,ut.path).path});else{const M=oe({},O.params);for(const J in M)M[J]==null&&delete M[J];lt=oe({},O,{params:f(M)}),ut.params=f(ut.params)}const gt=t.resolve(lt,ut),ht=O.hash||"";gt.params=u(h(gt.params));const S=Tv(i,oe({},O,{hash:xv(ht),path:gt.path})),C=s.createHref(S);return oe({fullPath:S,hash:ht,query:i===yf?kv(O.query):O.query||{}},gt,{redirectedFrom:void 0,href:C})}function E(O){return typeof O=="string"?ja(e,O,l.value.path):oe({},O)}function T(O,ut){if(c!==O)return Js(ye.NAVIGATION_CANCELLED,{from:ut,to:O})}function y(O){return P(O)}function I(O){return y(oe(E(O),{replace:!0}))}function L(O,ut){const lt=O.matched[O.matched.length-1];if(lt&&lt.redirect){const{redirect:gt}=lt;let ht=typeof gt=="function"?gt(O,ut):gt;return typeof ht=="string"&&(ht=ht.includes("?")||ht.includes("#")?ht=E(ht):{path:ht},ht.params={}),oe({query:O.query,hash:O.hash,params:ht.path!=null?{}:O.params},ht)}}function P(O,ut){const lt=c=d(O),gt=l.value,ht=O.state,S=O.force,C=O.replace===!0,M=L(lt,gt);if(M)return P(oe(E(M),{state:typeof M=="object"?oe({},ht,M.state):ht,force:S,replace:C}),ut||lt);const J=lt;J.redirectedFrom=ut;let Q;return!S&&Av(i,gt,lt)&&(Q=Js(ye.NAVIGATION_DUPLICATED,{to:J,from:gt}),Ct(gt,gt,!0,!1)),(Q?Promise.resolve(Q):b(J,gt)).catch(Z=>$n(Z)?$n(Z,ye.NAVIGATION_GUARD_REDIRECT)?Z:Mt(Z):K(Z,J,gt)).then(Z=>{if(Z){if($n(Z,ye.NAVIGATION_GUARD_REDIRECT))return P(oe({replace:C},E(Z.to),{state:typeof Z.to=="object"?oe({},ht,Z.to.state):ht,force:S}),ut||J)}else Z=F(J,gt,!0,C,ht);return D(J,gt,Z),Z})}function N(O,ut){const lt=T(O,ut);return lt?Promise.reject(lt):Promise.resolve()}function w(O){const ut=at.values().next().value;return ut&&typeof ut.runWithContext=="function"?ut.runWithContext(O):O()}function b(O,ut){let lt;const[gt,ht,S]=Vv(O,ut);lt=Ya(gt.reverse(),"beforeRouteLeave",O,ut);for(const M of gt)M.leaveGuards.forEach(J=>{lt.push(wi(J,O,ut))});const C=N.bind(null,O,ut);return lt.push(C),Tt(lt).then(()=>{lt=[];for(const M of r.list())lt.push(wi(M,O,ut));return lt.push(C),Tt(lt)}).then(()=>{lt=Ya(ht,"beforeRouteUpdate",O,ut);for(const M of ht)M.updateGuards.forEach(J=>{lt.push(wi(J,O,ut))});return lt.push(C),Tt(lt)}).then(()=>{lt=[];for(const M of S)if(M.beforeEnter)if(Ln(M.beforeEnter))for(const J of M.beforeEnter)lt.push(wi(J,O,ut));else lt.push(wi(M.beforeEnter,O,ut));return lt.push(C),Tt(lt)}).then(()=>(O.matched.forEach(M=>M.enterCallbacks={}),lt=Ya(S,"beforeRouteEnter",O,ut,w),lt.push(C),Tt(lt))).then(()=>{lt=[];for(const M of o.list())lt.push(wi(M,O,ut));return lt.push(C),Tt(lt)}).catch(M=>$n(M,ye.NAVIGATION_CANCELLED)?M:Promise.reject(M))}function D(O,ut,lt){a.list().forEach(gt=>w(()=>gt(O,ut,lt)))}function F(O,ut,lt,gt,ht){const S=T(O,ut);if(S)return S;const C=ut===vi,M=Ls?history.state:{};lt&&(gt||C?s.replace(O.fullPath,oe({scroll:C&&M&&M.scroll},ht)):s.push(O.fullPath,ht)),l.value=O,Ct(O,ut,lt,C),Mt()}let H;function V(){H||(H=s.listen((O,ut,lt)=>{if(!_t.listening)return;const gt=d(O),ht=L(gt,_t.currentRoute.value);if(ht){P(oe(ht,{replace:!0,force:!0}),gt).catch(Fr);return}c=gt;const S=l.value;Ls&&Uv(xf(S.fullPath,lt.delta),Ca()),b(gt,S).catch(C=>$n(C,ye.NAVIGATION_ABORTED|ye.NAVIGATION_CANCELLED)?C:$n(C,ye.NAVIGATION_GUARD_REDIRECT)?(P(oe(E(C.to),{force:!0}),gt).then(M=>{$n(M,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&!lt.delta&&lt.type===Xl.pop&&s.go(-1,!1)}).catch(Fr),Promise.reject()):(lt.delta&&s.go(-lt.delta,!1),K(C,gt,S))).then(C=>{C=C||F(gt,S,!1),C&&(lt.delta&&!$n(C,ye.NAVIGATION_CANCELLED)?s.go(-lt.delta,!1):lt.type===Xl.pop&&$n(C,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),D(gt,S,C)}).catch(Fr)}))}let $=_r(),tt=_r(),it;function K(O,ut,lt){Mt(O);const gt=tt.list();return gt.length?gt.forEach(ht=>ht(O,ut,lt)):console.error(O),Promise.reject(O)}function mt(){return it&&l.value!==vi?Promise.resolve():new Promise((O,ut)=>{$.add([O,ut])})}function Mt(O){return it||(it=!O,V(),$.list().forEach(([ut,lt])=>O?lt(O):ut()),$.reset()),O}function Ct(O,ut,lt,gt){const{scrollBehavior:ht}=n;if(!Ls||!ht)return Promise.resolve();const S=!lt&&Nv(xf(O.fullPath,0))||(gt||!lt)&&history.state&&history.state.scroll||null;return ss().then(()=>ht(O,ut,S)).then(C=>C&&Iv(C)).catch(C=>K(C,O,ut))}const Ft=O=>s.go(O);let Jt;const at=new Set,_t={currentRoute:l,listening:!0,addRoute:p,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:_,resolve:d,options:n,push:y,replace:I,go:Ft,back:()=>Ft(-1),forward:()=>Ft(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:tt.add,isReady:mt,install(O){O.component("RouterLink",u0),O.component("RouterView",p0),O.config.globalProperties.$router=_t,Object.defineProperty(O.config.globalProperties,"$route",{enumerable:!0,get:()=>Je(l)}),Ls&&!Jt&&l.value===vi&&(Jt=!0,y(s.location).catch(gt=>{}));const ut={};for(const gt in vi)Object.defineProperty(ut,gt,{get:()=>l.value[gt],enumerable:!0});O.provide(Jr,_t),O.provide(lu,Pd(ut)),O.provide(ql,l);const lt=O.unmount;at.add(O),O.unmount=function(){at.delete(O),at.size<1&&(c=vi,H&&H(),H=null,l.value=vi,Jt=!1,it=!1),lt()}}};function Tt(O){return O.reduce((ut,lt)=>ut.then(()=>w(lt)),Promise.resolve())}return _t}function Qr(){return yn(Jr)}function wp(n){return yn(lu)}function Rp(n){var e;const t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}function Cp(){Rp({type:"close",source:"galaxy-h5"})}function Yl(n){const t=n==null?"":String(n);Rp({type:"galaxy-route",source:"galaxy-h5",name:t})}const Br=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],la="galaxy_majors",g0={class:"select-page"},_0={class:"picked","aria-live":"polite"},v0={class:"picked-row"},x0={class:"value"},y0={class:"picked-row"},M0={class:"value"},S0={class:"grid"},E0=["onClick"],b0={class:"card-title"},T0={class:"card-tag"},A0={class:"footer"},w0=["disabled"],R0={key:0,class:"toast",role:"status"},C0=pi({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=Qr(),i=Xt(null),s=Xt(null),r=Xt(""),o=Qt(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(f){r.value=f,window.setTimeout(()=>{r.value=""},1800)}function l(f){if(f===i.value){i.value=null;return}if(f===s.value){s.value=null;return}if(!i.value){i.value=f;return}if(!s.value){if(f===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=f;return}s.value=f}function c(){if(!o.value)return;const f={fromId:i.value,toId:s.value};sessionStorage.setItem(la,JSON.stringify(f)),e.push({name:"galaxy"})}function u(){Cp()}return(f,h)=>{var p,g;return Dt(),Ot("div",g0,[h[4]||(h[4]=Y("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),Y("div",{class:"custom-nav"},[Y("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[Y("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),h[0]||(h[0]=Y("div",{class:"nav-title"},"专业星系",-1)),h[1]||(h[1]=Y("div",{class:"nav-right"},null,-1))]),h[5]||(h[5]=m_('<div class="nav-spacer" data-v-500dcac5></div><header class="header" data-v-500dcac5><p class="eyebrow" data-v-500dcac5>专业交叉星系</p><h1 class="title" data-v-500dcac5>选择你的星域</h1><p class="subtitle" data-v-500dcac5>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),Y("section",_0,[Y("div",v0,[h[2]||(h[2]=Y("span",{class:"label"},"主修 / 起点",-1)),Y("span",x0,Lt(i.value?(p=Je(Br).find(_=>_.id===i.value))==null?void 0:p.label:"未选择"),1)]),Y("div",y0,[h[3]||(h[3]=Y("span",{class:"label"},"交叉意向",-1)),Y("span",M0,Lt(s.value?(g=Je(Br).find(_=>_.id===s.value))==null?void 0:g.label:"未选择"),1)])]),Y("div",S0,[(Dt(!0),Ot(Re,null,Ni(Je(Br),_=>(Dt(),Ot("button",{key:_.id,type:"button",class:Ui(["card",{"is-from":_.id===i.value,"is-to":_.id===s.value}]),onClick:m=>l(_.id)},[Y("span",b0,Lt(_.label),1),Y("span",T0,Lt(_.tagline),1)],10,E0))),128))]),Y("footer",A0,[Y("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,w0)]),r.value?(Dt(),Ot("div",R0,Lt(r.value),1)):Ie("",!0)])}}}),P0=zi(C0,[["__scopeId","data-v-500dcac5"]]),D0="modulepreload",L0=function(n,t){return new URL(n,t).href},Lf={},cs=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let o=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=o(e.map(u=>{if(u=L0(u,i),u in Lf)return;Lf[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!i)for(let _=a.length-1;_>=0;_--){const m=a[_];if(m.href===u&&(!f||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const g=document.createElement("link");if(g.rel=f?"stylesheet":D0,f||(g.as="script"),g.crossOrigin="",g.href=u,c&&g.setAttribute("nonce",c),document.head.appendChild(g),f)return new Promise((_,m)=>{g.addEventListener("load",_),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function cu(){if(typeof window>"u")return"";const n=window.__GALAXY_API_BASE__;return n!=null&&String(n).trim()!==""?String(n).trim().replace(/\/+$/,""):""}function Pp(){if(typeof window>"u")return null;const n=window.__GALAXY_USER_ID__;if(n===""||n==null)return null;const t=typeof n=="number"?n:Number(n);return!Number.isFinite(t)||t<=0?null:t}function I0(){return cu().length>0&&Pp()!=null}const or=I0,ar=Pp;function If(){return cu()||"./mock"}function Is(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function Uf(n="/mock"){const t=Is("manifest.json",n),e=await fetch(t).then(f=>{if(!f.ok)throw new Error(`manifest ${f.status}`);return f.json()}),i=Is(e.nodes_url,n),s=Is(e.edges_url,n),r=Is(e.hyperedges_url,n),o=Is(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(f=>{if(!f.ok)throw new Error(`nodes ${f.status}`);return f.json()}),fetch(s).then(f=>{if(!f.ok)throw new Error(`edges ${f.status}`);return f.json()}),fetch(r).then(f=>{if(!f.ok)throw new Error(`hyperedges ${f.status}`);return f.json()}),fetch(o).then(f=>{if(!f.ok)throw new Error(`layout ${f.status}`);return f.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function $a(n="/mock",t){const e=cu();if(e&&n===e)try{const{fetchRecommend:o}=await cs(async()=>{const{fetchRecommend:a}=await import("./galaxy-chunk-d6bTbbna.js");return{fetchRecommend:a}},[],import.meta.url);return o(t)}catch{}const i=t?`?selectedNodeId=${encodeURIComponent(t)}`:"",s=Is(`recommend.json${i}`,n),r=await fetch(s);if(!r.ok)throw new Error(`recommend ${r.status}`);return r.json()}function U0(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function is(n,t){const e=[],i=new Set;for(const s of t)if(s.member_node_ids.includes(n)){e.push(s.id);for(const r of s.member_node_ids)i.add(r)}return{hyperedgeIds:e,memberIds:i}}const Dp="offercat_personal_galaxy_v1",Nf=6;function N0(n,t){const e={},i=n.length;for(let s=0;s<i;s++){const r=n[s],o=2*Math.PI*s/Math.max(i,1);e[r.id]={x:Nf*Math.cos(o),y:.25,z:Nf*Math.sin(o)}}for(const s of t){const r=e[s.majorA],o=e[s.majorB];if(!r||!o)continue;const a={x:(r.x+o.x)*.5,y:(r.y+o.y)*.5+.6,z:(r.z+o.z)*.5};e[s.id]=a}return e}function O0(n){return{subtitle:`${n.heat} · 初${n.salaryJunior} / 中${n.salaryMid} / 高${n.salarySenior}`,tagline:`${n.workIntensity}级强度 · 竞争${n.competition}`,heat:n.heat,salaryJunior:n.salaryJunior,salaryMid:n.salaryMid,salarySenior:n.salarySenior,workIntensity:n.workIntensity,competition:n.competition,education:n.education,skills:n.skills,catalogIdx:String(n.idx),pair:n.pair}}function Lp(n,t){const e=N0(n,t),i=[];for(const o of n)i.push({id:o.id,type:"major",label:o.label,meta:{tagline:"个人星系 · 大行星"}});for(const o of t)i.push({id:o.id,type:"fusion",label:o.title,meta:O0(o.row)});const s=t.flatMap(o=>[{u:o.id,v:o.majorA},{u:o.id,v:o.majorB}]),r=t.map(o=>({id:`he_${o.id}`,members:[o.majorA,o.majorB,o.id],style_hint:"personal"}));return{nodes:i,edges:s,hyperedges:r,layout:e}}function F0(n,t){return{v:1,majors:[...n],fusions:[...t],updatedAt:Date.now()}}function Vs(){try{const n=localStorage.getItem(Dp);if(!n)return null;const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.majors)||!Array.isArray(t.fusions)?null:t}catch{return null}}function Ip(n){try{localStorage.setItem(Dp,JSON.stringify(n))}catch{}}function B0(n){const t=n;return!!t&&t.v===1&&Array.isArray(t.majors)&&Array.isArray(t.fusions)}async function $l(){const n=Vs();if(!or())return n;const t=ar();if(!t)return n;try{const{loadPersonalGalaxy:e}=await cs(async()=>{const{loadPersonalGalaxy:s}=await import("./galaxy-chunk-d6bTbbna.js");return{loadPersonalGalaxy:s}},[],import.meta.url),i=await e(t);if(i&&B0(i)){const s={...i,updatedAt:i.updatedAt??Date.now()};if(!n||(s.updatedAt??0)>=(n.updatedAt??0))return Ip(s),s}}catch{}return n}async function z0(n,t){const e=ar();if(e==null||e<=0)return{ok:!1};if(!or())return{ok:!1};try{const{savePersonalGalaxy:i}=await cs(async()=>{const{savePersonalGalaxy:s}=await import("./galaxy-chunk-d6bTbbna.js");return{savePersonalGalaxy:s}},[],import.meta.url);return await i(e,n),{ok:!0}}catch{return{ok:!1}}}function uu(n){var a,l;const t=(a=n.majorA)==null?void 0:a.trim(),e=(l=n.majorB)==null?void 0:l.trim();if(!t||!e||!n.row)return null;let s=((n.row.idx-1)%3+3)%3;const r=t<=e?t:e,o=t<=e?e:t;return t!==r&&(s=2-s),`${r}__${o}:${s}`}function Up(n,t){const e=t.find(i=>i.id===n);return e?uu(e):null}const Np="offercat_personal_starlit_v1",Li=50,Of=50;function Ka(){return{v:1,byFusionId:{},updatedAt:Date.now()}}function Pa(){try{const n=localStorage.getItem(Np);if(!n)return Ka();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||typeof t.byFusionId!="object"?Ka():t}catch{return Ka()}}function Op(n){n.updatedAt=Date.now();try{localStorage.setItem(Np,JSON.stringify(n))}catch{}}async function k0(n,t){if(!or())return;const e=ar();if(!e)return;const i=Vs();if(!i)return;const s=Up(n,i.fusions);if(s)try{const{upsertStarlitProgress:r}=await cs(async()=>{const{upsertStarlitProgress:o}=await import("./galaxy-chunk-d6bTbbna.js");return{upsertStarlitProgress:o}},[],import.meta.url);await r(e,s,t.starsLit,t.lastQuestionIndex)}catch{}}async function Kl(n){var s,r,o;if(!or())return;const t=ar();if(!t)return;const e=n??((s=Vs())==null?void 0:s.fusions)??[];if(!e.length)return;const i=new Map;for(const a of e){const l=uu(a);l&&i.set(l,a.id)}try{const{fetchStarlitProgress:a}=await cs(async()=>{const{fetchStarlitProgress:f}=await import("./galaxy-chunk-d6bTbbna.js");return{fetchStarlitProgress:f}},[],import.meta.url),l=await a(t),c=Pa();let u=!1;for(const f of l){const h=i.get(f.packKey);if(!h)continue;const p=Math.max(0,Math.floor(f.starsLit)),g=((r=c.byFusionId[h])==null?void 0:r.starsLit)??0,_=Math.max(g,p);(_!==g||!c.byFusionId[h])&&(c.byFusionId[h]={starsLit:_,lastQuestionIndex:f.lastQuestionNo??((o=c.byFusionId[h])==null?void 0:o.lastQuestionIndex)??0,updatedAt:Date.now()},u=!0)}u&&Op(c)}catch{}}function to(n,t=Li){var s;const e=((s=Pa().byFusionId[n])==null?void 0:s.starsLit)??0,i=Math.max(1,Math.floor(t));return Math.min(i,Math.max(0,Math.floor(e)))}function H0(){const n=Pa();return Object.keys(n.byFusionId).reduce((t,e)=>t+to(e),0)}function Fp(n){return n.reduce((t,e)=>t+to(e),0)}function fu(n){const t=n.filter(i=>i.type==="fusion");if(!t.length)return 0;const e=t.reduce((i,s)=>i+to(s.id),0);return Math.min(1,e/(t.length*Li))}function V0(n){const t=Pa(),e=t.byFusionId[n],i=(e==null?void 0:e.starsLit)??0,s=Math.min(Li,i+1),r={starsLit:s,lastQuestionIndex:((e==null?void 0:e.lastQuestionIndex)??0)+1,updatedAt:Date.now()};return t.byFusionId[n]=r,Op(t),k0(n,r),s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hu="170",Gs={ROTATE:0,DOLLY:1,PAN:2},Us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},G0=0,Ff=1,W0=2,Bp=1,X0=2,ei=3,Fi=0,an=1,An=2,li=0,Ws=1,Xs=2,Bf=3,zf=4,j0=5,Zi=100,q0=101,Y0=102,$0=103,K0=104,Z0=200,J0=201,Q0=202,tx=203,Zl=204,Jl=205,ex=206,nx=207,ix=208,sx=209,rx=210,ox=211,ax=212,lx=213,cx=214,Ql=0,tc=1,ec=2,Qs=3,nc=4,ic=5,sc=6,rc=7,zp=0,ux=1,fx=2,Ii=0,kp=1,Hp=2,Vp=3,du=4,hx=5,Gp=6,Wp=7,Xp=300,tr=301,er=302,oc=303,ac=304,Da=306,jr=1e3,ts=1001,lc=1002,dn=1003,dx=1004,po=1005,Rn=1006,Za=1007,Pi=1008,Gn=1009,jp=1010,qp=1011,qr=1012,pu=1013,os=1014,oi=1015,ci=1016,mu=1017,gu=1018,nr=1020,Yp=35902,$p=1021,Kp=1022,vn=1023,Zp=1024,Jp=1025,js=1026,ir=1027,Qp=1028,_u=1029,tm=1030,vu=1031,xu=1033,jo=33776,qo=33777,Yo=33778,$o=33779,cc=35840,uc=35841,fc=35842,hc=35843,dc=36196,pc=37492,mc=37496,gc=37808,_c=37809,vc=37810,xc=37811,yc=37812,Mc=37813,Sc=37814,Ec=37815,bc=37816,Tc=37817,Ac=37818,wc=37819,Rc=37820,Cc=37821,Ko=36492,Pc=36494,Dc=36495,em=36283,Lc=36284,Ic=36285,Uc=36286,px=3200,mx=3201,nm=0,gx=1,Ci="",rn="srgb",lr="srgb-linear",La="linear",ce="srgb",ms=7680,kf=519,_x=512,vx=513,xx=514,im=515,yx=516,Mx=517,Sx=518,Ex=519,Hf=35044,Vf="300 es",ai=2e3,ca=2001;class us{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zo=Math.PI/180,Nc=180/Math.PI;function eo(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function $e(n,t,e){return Math.max(t,Math.min(e,n))}function bx(n,t){return(n%t+t)%t}function Ja(n,t,e){return(1-e)*n+e*t}function vr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Tx={DEG2RAD:Zo};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,i,s,r,o,a,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],g=i[8],_=s[0],m=s[3],d=s[6],E=s[1],T=s[4],y=s[7],I=s[2],L=s[5],P=s[8];return r[0]=o*_+a*E+l*I,r[3]=o*m+a*T+l*L,r[6]=o*d+a*y+l*P,r[1]=c*_+u*E+f*I,r[4]=c*m+u*T+f*L,r[7]=c*d+u*y+f*P,r[2]=h*_+p*E+g*I,r[5]=h*m+p*T+g*L,r[8]=h*d+p*y+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*r,p=c*r-o*l,g=e*f+i*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=h*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Qa.makeScale(t,e)),this}rotate(t){return this.premultiply(Qa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Qa=new Kt;function sm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ua(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ax(){const n=ua("canvas");return n.style.display="block",n}const Gf={};function Rr(n){n in Gf||(Gf[n]=!0,console.warn(n))}function wx(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Rx(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Cx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(n.r=ui(n.r),n.g=ui(n.g),n.b=ui(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(n.r=qs(n.r),n.g=qs(n.g),n.b=qs(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ci?La:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Wf=[.64,.33,.3,.6,.15,.06],Xf=[.2126,.7152,.0722],jf=[.3127,.329],qf=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yf=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[lr]:{primaries:Wf,whitePoint:jf,transfer:La,toXYZ:qf,fromXYZ:Yf,luminanceCoefficients:Xf,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:Wf,whitePoint:jf,transfer:ce,toXYZ:qf,fromXYZ:Yf,luminanceCoefficients:Xf,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}});let gs;class Px{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gs===void 0&&(gs=ua("canvas")),gs.width=t.width,gs.height=t.height;const i=gs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=gs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ua("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ui(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ui(e[i]/255)*255):e[i]=ui(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Dx=0;class rm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dx++}),this.uuid=eo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(tl(s[o].image)):r.push(tl(s[o]))}else r=tl(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function tl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Px.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Lx=0;class Qe extends us{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,i=ts,s=ts,r=Rn,o=Pi,a=vn,l=Gn,c=Qe.DEFAULT_ANISOTROPY,u=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=eo(),this.name="",this.source=new rm(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jr:t.x=t.x-Math.floor(t.x);break;case ts:t.x=t.x<0?0:1;break;case lc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jr:t.y=t.y-Math.floor(t.y);break;case ts:t.y=t.y<0?0:1;break;case lc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=Xp;Qe.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,i=0,s=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,y=(p+1)/2,I=(d+1)/2,L=(u+h)/4,P=(f+_)/4,N=(g+m)/4;return T>y&&T>I?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=L/i,r=P/i):y>I?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=L/s,r=N/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=P/r,s=N/r),this.set(i,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(f-_)/E,this.z=(h-u)/E,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ix extends us{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Qe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new rm(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pn extends Ix{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class om extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ux extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class as{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==p||u!==g){let m=1-a;const d=l*h+c*p+u*g+f*_,E=d>=0?1:-1,T=1-d*d;if(T>Number.EPSILON){const I=Math.sqrt(T),L=Math.atan2(I,d*E);m=Math.sin(m*L)/I,a=Math.sin(a*L)/I}const y=a*E;if(l=l*m+h*y,c=c*m+p*y,u=u*m+g*y,f=f*m+_*y,m===1-a){const I=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=I,c*=I,u*=I,f*=I}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],h=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*f+l*p-c*h,t[e+1]=l*g+u*h+c*f-a*p,t[e+2]=c*g+u*p+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),h=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f+h*p*g;break;case"YZX":this._x=h*u*f+c*p*g,this._y=c*p*f+h*u*g,this._z=c*u*g-h*p*f,this._w=c*u*f-h*p*g;break;case"XZY":this._x=h*u*f-c*p*g,this._y=c*p*f-h*u*g,this._z=c*u*g+h*p*f,this._w=c*u*f+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($e(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(t=0,e=0,i=0){j.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion($f.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion($f.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return el.copy(this).projectOnVector(t),this.sub(el)}reflect(t){return this.sub(el.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const el=new j,$f=new as;class ls{constructor(t=new j(1/0,1/0,1/0),e=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),mo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),mo.copy(i.boundingBox)),mo.applyMatrix4(t.matrixWorld),this.union(mo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xr),go.subVectors(this.max,xr),_s.subVectors(t.a,xr),vs.subVectors(t.b,xr),xs.subVectors(t.c,xr),xi.subVectors(vs,_s),yi.subVectors(xs,vs),Vi.subVectors(_s,xs);let e=[0,-xi.z,xi.y,0,-yi.z,yi.y,0,-Vi.z,Vi.y,xi.z,0,-xi.x,yi.z,0,-yi.x,Vi.z,0,-Vi.x,-xi.y,xi.x,0,-yi.y,yi.x,0,-Vi.y,Vi.x,0];return!nl(e,_s,vs,xs,go)||(e=[1,0,0,0,1,0,0,0,1],!nl(e,_s,vs,xs,go))?!1:(_o.crossVectors(xi,yi),e=[_o.x,_o.y,_o.z],nl(e,_s,vs,xs,go))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Kn=[new j,new j,new j,new j,new j,new j,new j,new j],En=new j,mo=new ls,_s=new j,vs=new j,xs=new j,xi=new j,yi=new j,Vi=new j,xr=new j,go=new j,_o=new j,Gi=new j;function nl(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Gi.fromArray(n,r);const a=s.x*Math.abs(Gi.x)+s.y*Math.abs(Gi.y)+s.z*Math.abs(Gi.z),l=t.dot(Gi),c=e.dot(Gi),u=i.dot(Gi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Nx=new ls,yr=new j,il=new j;class cr{constructor(t=new j,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Nx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;yr.subVectors(t,this.center);const e=yr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(yr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(il.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(yr.copy(t.center).add(il)),this.expandByPoint(yr.copy(t.center).sub(il))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Zn=new j,sl=new j,vo=new j,Mi=new j,rl=new j,xo=new j,ol=new j;class no{constructor(t=new j,e=new j(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){sl.copy(t).add(e).multiplyScalar(.5),vo.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(sl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(vo),a=Mi.dot(this.direction),l=-Mi.dot(vo),c=Mi.lengthSq(),u=Math.abs(1-o*o);let f,h,p,g;if(u>0)if(f=o*l-a,h=o*a-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),p=h*(h+2*l)+c):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+h*(h+2*l)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(sl).addScaledVector(vo,h),p}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const i=Zn.dot(this.direction),s=Zn.dot(Zn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,i,s,r){rl.subVectors(e,t),xo.subVectors(i,t),ol.crossVectors(rl,xo);let o=this.direction.dot(ol),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mi.subVectors(this.origin,t);const l=a*this.direction.dot(xo.crossVectors(Mi,xo));if(l<0)return null;const c=a*this.direction.dot(rl.cross(Mi));if(c<0||l+c>o)return null;const u=-a*Mi.dot(ol);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,i,s,r,o,a,l,c,u,f,h,p,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,f,h,p,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,f,h,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ys.setFromMatrixColumn(t,0).length(),r=1/ys.setFromMatrixColumn(t,1).length(),o=1/ys.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,p=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,p=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,p=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-p,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+p,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=p*f-g,e[2]=g*f-p,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ox,t,Fx)}lookAt(t,e,i){const s=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),Si.crossVectors(i,cn),Si.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),Si.crossVectors(i,cn)),Si.normalize(),yo.crossVectors(cn,Si),s[0]=Si.x,s[4]=yo.x,s[8]=cn.x,s[1]=Si.y,s[5]=yo.y,s[9]=cn.y,s[2]=Si.z,s[6]=yo.z,s[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],E=i[3],T=i[7],y=i[11],I=i[15],L=s[0],P=s[4],N=s[8],w=s[12],b=s[1],D=s[5],F=s[9],H=s[13],V=s[2],$=s[6],tt=s[10],it=s[14],K=s[3],mt=s[7],Mt=s[11],Ct=s[15];return r[0]=o*L+a*b+l*V+c*K,r[4]=o*P+a*D+l*$+c*mt,r[8]=o*N+a*F+l*tt+c*Mt,r[12]=o*w+a*H+l*it+c*Ct,r[1]=u*L+f*b+h*V+p*K,r[5]=u*P+f*D+h*$+p*mt,r[9]=u*N+f*F+h*tt+p*Mt,r[13]=u*w+f*H+h*it+p*Ct,r[2]=g*L+_*b+m*V+d*K,r[6]=g*P+_*D+m*$+d*mt,r[10]=g*N+_*F+m*tt+d*Mt,r[14]=g*w+_*H+m*it+d*Ct,r[3]=E*L+T*b+y*V+I*K,r[7]=E*P+T*D+y*$+I*mt,r[11]=E*N+T*F+y*tt+I*Mt,r[15]=E*w+T*H+y*it+I*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*f-s*c*f-r*a*h+i*c*h+s*a*p-i*l*p)+_*(+e*l*p-e*c*h+r*o*h-s*o*p+s*c*u-r*l*u)+m*(+e*c*f-e*a*p-r*o*f+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*f+e*a*h+s*o*f-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],E=f*m*c-_*h*c+_*l*p-a*m*p-f*l*d+a*h*d,T=g*h*c-u*m*c-g*l*p+o*m*p+u*l*d-o*h*d,y=u*_*c-g*f*c+g*a*p-o*_*p-u*a*d+o*f*d,I=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,L=e*E+i*T+s*y+r*I;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return t[0]=E*P,t[1]=(_*h*r-f*m*r-_*s*p+i*m*p+f*s*d-i*h*d)*P,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*d+i*l*d)*P,t[3]=(f*l*r-a*h*r-f*s*c+i*h*c+a*s*p-i*l*p)*P,t[4]=T*P,t[5]=(u*m*r-g*h*r+g*s*p-e*m*p-u*s*d+e*h*d)*P,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*P,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*p+e*l*p)*P,t[8]=y*P,t[9]=(g*f*r-u*_*r-g*i*p+e*_*p+u*i*d-e*f*d)*P,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*d+e*a*d)*P,t[11]=(u*a*r-o*f*r-u*i*c+e*f*c+o*i*p-e*a*p)*P,t[12]=I*P,t[13]=(u*_*s-g*f*s+g*i*h-e*_*h-u*i*m+e*f*m)*P,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*P,t[15]=(o*f*s-u*a*s+u*i*l-e*f*l-o*i*h+e*a*h)*P,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,f=a+a,h=r*c,p=r*u,g=r*f,_=o*u,m=o*f,d=a*f,E=l*c,T=l*u,y=l*f,I=i.x,L=i.y,P=i.z;return s[0]=(1-(_+d))*I,s[1]=(p+y)*I,s[2]=(g-T)*I,s[3]=0,s[4]=(p-y)*L,s[5]=(1-(h+d))*L,s[6]=(m+E)*L,s[7]=0,s[8]=(g+T)*P,s[9]=(m-E)*P,s[10]=(1-(h+_))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=ys.set(s[0],s[1],s[2]).length();const o=ys.set(s[4],s[5],s[6]).length(),a=ys.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],bn.copy(this);const c=1/r,u=1/o,f=1/a;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=f,bn.elements[9]*=f,bn.elements[10]*=f,e.setFromRotationMatrix(bn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ai){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),h=(i+s)/(i-s);let p,g;if(a===ai)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ca)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ai){const l=this.elements,c=1/(e-t),u=1/(i-s),f=1/(o-r),h=(e+t)*c,p=(i+s)*u;let g,_;if(a===ai)g=(o+r)*f,_=-2*f;else if(a===ca)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ys=new j,bn=new de,Ox=new j(0,0,0),Fx=new j(1,1,1),Si=new j,yo=new j,cn=new j,Kf=new de,Zf=new as;class Wn{constructor(t=0,e=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin($e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-$e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Kf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zf.setFromEuler(this),this.setFromQuaternion(Zf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class yu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Bx=0;const Jf=new j,Ms=new as,Jn=new de,Mo=new j,Mr=new j,zx=new j,kx=new as,Qf=new j(1,0,0),th=new j(0,1,0),eh=new j(0,0,1),nh={type:"added"},Hx={type:"removed"},Ss={type:"childadded",child:null},al={type:"childremoved",child:null};class be extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bx++}),this.uuid=eo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new j,e=new Wn,i=new as,s=new j(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Kt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ms.setFromAxisAngle(t,e),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(t,e){return Ms.setFromAxisAngle(t,e),this.quaternion.premultiply(Ms),this}rotateX(t){return this.rotateOnAxis(Qf,t)}rotateY(t){return this.rotateOnAxis(th,t)}rotateZ(t){return this.rotateOnAxis(eh,t)}translateOnAxis(t,e){return Jf.copy(t).applyQuaternion(this.quaternion),this.position.add(Jf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Qf,t)}translateY(t){return this.translateOnAxis(th,t)}translateZ(t){return this.translateOnAxis(eh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Mo.copy(t):Mo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Mr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Mr,Mo,this.up):Jn.lookAt(Mo,Mr,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(Jn),this.quaternion.premultiply(Ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nh),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Hx),al.child=t,this.dispatchEvent(al),al.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nh),Ss.child=t,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,t,zx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mr,kx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}be.DEFAULT_UP=new j(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Tn=new j,Qn=new j,ll=new j,ti=new j,Es=new j,bs=new j,ih=new j,cl=new j,ul=new j,fl=new j,hl=new Me,dl=new Me,pl=new Me;class wn{constructor(t=new j,e=new j,i=new j){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Tn.subVectors(t,e),s.cross(Tn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Tn.subVectors(s,e),Qn.subVectors(i,e),ll.subVectors(t,e);const o=Tn.dot(Tn),a=Tn.dot(Qn),l=Tn.dot(ll),c=Qn.dot(Qn),u=Qn.dot(ll),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ti.x),l.addScaledVector(o,ti.y),l.addScaledVector(a,ti.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return hl.setScalar(0),dl.setScalar(0),pl.setScalar(0),hl.fromBufferAttribute(t,e),dl.fromBufferAttribute(t,i),pl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(hl,r.x),o.addScaledVector(dl,r.y),o.addScaledVector(pl,r.z),o}static isFrontFacing(t,e,i,s){return Tn.subVectors(i,e),Qn.subVectors(t,e),Tn.cross(Qn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Tn.subVectors(this.c,this.b),Qn.subVectors(this.a,this.b),Tn.cross(Qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return wn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Es.subVectors(s,i),bs.subVectors(r,i),cl.subVectors(t,i);const l=Es.dot(cl),c=bs.dot(cl);if(l<=0&&c<=0)return e.copy(i);ul.subVectors(t,s);const u=Es.dot(ul),f=bs.dot(ul);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Es,o);fl.subVectors(t,r);const p=Es.dot(fl),g=bs.dot(fl);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(bs,a);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return ih.subVectors(r,s),a=(f-u)/(f-u+(p-g)),e.copy(s).addScaledVector(ih,a);const d=1/(m+_+h);return o=_*d,a=h*d,e.copy(i).addScaledVector(Es,o).addScaledVector(bs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},So={h:0,s:0,l:0};function ml(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class qt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=bx(t,1),e=$e(e,0,1),i=$e(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ml(o,r,t+1/3),this.g=ml(o,r,t),this.b=ml(o,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=rn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){const i=am[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ui(t.r),this.g=ui(t.g),this.b=ui(t.b),this}copyLinearToSRGB(t){return this.r=qs(t.r),this.g=qs(t.g),this.b=qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return ee.fromWorkingColorSpace(Fe.copy(this),t),Math.round($e(Fe.r*255,0,255))*65536+Math.round($e(Fe.g*255,0,255))*256+Math.round($e(Fe.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=rn){ee.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(So);const i=Ja(Ei.h,So.h,e),s=Ja(Ei.s,So.s,e),r=Ja(Ei.l,So.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new qt;qt.NAMES=am;let Vx=0;class fs extends us{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=eo(),this.name="",this.blending=Ws,this.side=Fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zl,this.blendDst=Jl,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ms,this.stencilZFail=ms,this.stencilZPass=ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(i.blending=this.blending),this.side!==Fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Zl&&(i.blendSrc=this.blendSrc),this.blendDst!==Jl&&(i.blendDst=this.blendDst),this.blendEquation!==Zi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ms&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ms&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ms&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gn extends fs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=zp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new j,Eo=new zt;class Mn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Hf,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Eo.fromBufferAttribute(this,e),Eo.applyMatrix3(t),this.setXY(e,Eo.x,Eo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=vr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=nn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vr(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vr(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vr(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Hf&&(t.usage=this.usage),t}}class lm extends Mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class cm extends Mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Se extends Mn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Gx=0;const mn=new de,gl=new be,Ts=new j,un=new ls,Sr=new ls,Le=new j;class Ve extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gx++}),this.uuid=eo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sm(t)?cm:lm)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return mn.makeRotationFromQuaternion(t),this.applyMatrix4(mn),this}rotateX(t){return mn.makeRotationX(t),this.applyMatrix4(mn),this}rotateY(t){return mn.makeRotationY(t),this.applyMatrix4(mn),this}rotateZ(t){return mn.makeRotationZ(t),this.applyMatrix4(mn),this}translate(t,e,i){return mn.makeTranslation(t,e,i),this.applyMatrix4(mn),this}scale(t,e,i){return mn.makeScale(t,e,i),this.applyMatrix4(mn),this}lookAt(t){return gl.lookAt(t),gl.updateMatrix(),this.applyMatrix4(gl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(un.min,Sr.min),un.expandByPoint(Le),Le.addVectors(un.max,Sr.max),un.expandByPoint(Le)):(un.expandByPoint(Sr.min),un.expandByPoint(Sr.max))}un.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Le.fromBufferAttribute(a,c),l&&(Ts.fromBufferAttribute(t,c),Le.add(Ts)),s=Math.max(s,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new j,l[N]=new j;const c=new j,u=new j,f=new j,h=new zt,p=new zt,g=new zt,_=new j,m=new j;function d(N,w,b){c.fromBufferAttribute(i,N),u.fromBufferAttribute(i,w),f.fromBufferAttribute(i,b),h.fromBufferAttribute(r,N),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,b),u.sub(c),f.sub(c),p.sub(h),g.sub(h);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(D),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),a[N].add(_),a[w].add(_),a[b].add(_),l[N].add(m),l[w].add(m),l[b].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let N=0,w=E.length;N<w;++N){const b=E[N],D=b.start,F=b.count;for(let H=D,V=D+F;H<V;H+=3)d(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const T=new j,y=new j,I=new j,L=new j;function P(N){I.fromBufferAttribute(s,N),L.copy(I);const w=a[N];T.copy(w),T.sub(I.multiplyScalar(I.dot(w))).normalize(),y.crossVectors(L,w);const D=y.dot(l[N])<0?-1:1;o.setXYZW(N,T.x,T.y,T.z,D)}for(let N=0,w=E.length;N<w;++N){const b=E[N],D=b.start,F=b.count;for(let H=D,V=D+F;H<V;H+=3)P(t.getX(H+0)),P(t.getX(H+1)),P(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new j,r=new j,o=new j,a=new j,l=new j,c=new j,u=new j,f=new j;if(t)for(let h=0,p=t.count;h<p;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=e.count;h<p;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)h[g++]=c[p++]}return new Mn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=t(h,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sh=new de,Wi=new no,bo=new cr,rh=new j,To=new j,Ao=new j,wo=new j,_l=new j,Ro=new j,oh=new j,Co=new j;class we extends be{constructor(t=new Ve,e=new gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ro.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(_l.fromBufferAttribute(f,t),o?Ro.addScaledVector(_l,u):Ro.addScaledVector(_l.sub(e),u))}e.add(Ro)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bo.copy(i.boundingSphere),bo.applyMatrix4(r),Wi.copy(t.ray).recast(t.near),!(bo.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(bo,rh)===null||Wi.origin.distanceToSquared(rh)>(t.far-t.near)**2))&&(sh.copy(r).invert(),Wi.copy(t.ray).applyMatrix4(sh),!(i.boundingBox!==null&&Wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Wi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],d=o[m.materialIndex],E=Math.max(m.start,p.start),T=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,I=T;y<I;y+=3){const L=a.getX(y),P=a.getX(y+1),N=a.getX(y+2);s=Po(this,d,t,i,c,u,f,L,P,N),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const E=a.getX(m),T=a.getX(m+1),y=a.getX(m+2);s=Po(this,o,t,i,c,u,f,E,T,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],d=o[m.materialIndex],E=Math.max(m.start,p.start),T=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=E,I=T;y<I;y+=3){const L=y,P=y+1,N=y+2;s=Po(this,d,t,i,c,u,f,L,P,N),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const E=m,T=m+1,y=m+2;s=Po(this,o,t,i,c,u,f,E,T,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Wx(n,t,e,i,s,r,o,a){let l;if(t.side===an?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Fi,a),l===null)return null;Co.copy(a),Co.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Co);return c<e.near||c>e.far?null:{distance:c,point:Co.clone(),object:n}}function Po(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,To),n.getVertexPosition(l,Ao),n.getVertexPosition(c,wo);const u=Wx(n,t,e,i,To,Ao,wo,oh);if(u){const f=new j;wn.getBarycoord(oh,To,Ao,wo,f),s&&(u.uv=wn.getInterpolatedAttribute(s,a,l,c,f,new zt)),r&&(u.uv1=wn.getInterpolatedAttribute(r,a,l,c,f,new zt)),o&&(u.normal=wn.getInterpolatedAttribute(o,a,l,c,f,new j),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new j,materialIndex:0};wn.getNormal(To,Ao,wo,h.normal),u.face=h,u.barycoord=f}return u}class io extends Ve{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(f,2));function g(_,m,d,E,T,y,I,L,P,N,w){const b=y/P,D=I/N,F=y/2,H=I/2,V=L/2,$=P+1,tt=N+1;let it=0,K=0;const mt=new j;for(let Mt=0;Mt<tt;Mt++){const Ct=Mt*D-H;for(let Ft=0;Ft<$;Ft++){const Jt=Ft*b-F;mt[_]=Jt*E,mt[m]=Ct*T,mt[d]=V,c.push(mt.x,mt.y,mt.z),mt[_]=0,mt[m]=0,mt[d]=L>0?1:-1,u.push(mt.x,mt.y,mt.z),f.push(Ft/P),f.push(1-Mt/N),it+=1}}for(let Mt=0;Mt<N;Mt++)for(let Ct=0;Ct<P;Ct++){const Ft=h+Ct+$*Mt,Jt=h+Ct+$*(Mt+1),at=h+(Ct+1)+$*(Mt+1),_t=h+(Ct+1)+$*Mt;l.push(Ft,Jt,_t),l.push(Jt,at,_t),K+=6}a.addGroup(p,K,w),p+=K,h+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function sr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Xe(n){const t={};for(let e=0;e<n.length;e++){const i=sr(n[e]);for(const s in i)t[s]=i[s]}return t}function Xx(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function um(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Yr={clone:sr,merge:Xe};var jx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ke extends fs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jx,this.fragmentShader=qx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=sr(t.uniforms),this.uniformsGroups=Xx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class fm extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=ai}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const bi=new j,ah=new zt,lh=new zt;class _n extends fm{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Nc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nc*2*Math.atan(Math.tan(Zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(bi.x,bi.y).multiplyScalar(-t/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(bi.x,bi.y).multiplyScalar(-t/bi.z)}getViewSize(t,e){return this.getViewBounds(t,ah,lh),e.subVectors(lh,ah)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const As=-90,ws=1;class Yx extends be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new _n(As,ws,t,e);s.layers=this.layers,this.add(s);const r=new _n(As,ws,t,e);r.layers=this.layers,this.add(r);const o=new _n(As,ws,t,e);o.layers=this.layers,this.add(o);const a=new _n(As,ws,t,e);a.layers=this.layers,this.add(a);const l=new _n(As,ws,t,e);l.layers=this.layers,this.add(l);const c=new _n(As,ws,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ca)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(f,h,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class hm extends Qe{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:tr,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class $x extends Pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new hm(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new io(5,5,5),r=new ke({name:"CubemapFromEquirect",uniforms:sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:li});r.uniforms.tEquirect.value=e;const o=new we(s,r),a=e.minFilter;return e.minFilter===Pi&&(e.minFilter=Rn),new Yx(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const vl=new j,Kx=new j,Zx=new Kt;class Ri{constructor(t=new j(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=vl.subVectors(i,e).cross(Kx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(vl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Zx.getNormalMatrix(t),s=this.coplanarPoint(vl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xi=new cr,Do=new j;class Mu{constructor(t=new Ri,e=new Ri,i=new Ri,s=new Ri,r=new Ri,o=new Ri){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ai){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],f=s[6],h=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],E=s[13],T=s[14],y=s[15];if(i[0].setComponents(l-r,h-c,m-p,y-d).normalize(),i[1].setComponents(l+r,h+c,m+p,y+d).normalize(),i[2].setComponents(l+o,h+u,m+g,y+E).normalize(),i[3].setComponents(l-o,h-u,m-g,y-E).normalize(),i[4].setComponents(l-a,h-f,m-_,y-T).normalize(),e===ai)i[5].setComponents(l+a,h+f,m+_,y+T).normalize();else if(e===ca)i[5].setComponents(a,f,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(t){return Xi.center.set(0,0,0),Xi.radius=.7071067811865476,Xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Do.x=s.normal.x>0?t.max.x:t.min.x,Do.y=s.normal.y>0?t.max.y:t.min.y,Do.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Do)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Jx(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],_=f[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const _=f[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ia extends Ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=t/a,h=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const E=d*h-o;for(let T=0;T<c;T++){const y=T*f-r;g.push(y,-E,0),_.push(0,0,1),m.push(T/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<a;E++){const T=E+c*d,y=E+c*(d+1),I=E+1+c*(d+1),L=E+1+c*d;p.push(T,y,L),p.push(y,I,L)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ia(t.width,t.height,t.widthSegments,t.heightSegments)}}var Qx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ty=`#ifdef USE_ALPHAHASH
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
#endif`,ey=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ny=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ry=`#ifdef USE_AOMAP
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
#endif`,oy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ay=`#ifdef USE_BATCHING
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
#endif`,ly=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hy=`#ifdef USE_IRIDESCENCE
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
#endif`,dy=`#ifdef USE_BUMPMAP
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
#endif`,py=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,my=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_y=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,My=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Sy=`#define PI 3.141592653589793
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
} // validated`,Ey=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,by=`vec3 transformedNormal = objectNormal;
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
#endif`,Ty=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ay=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ry=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Py=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dy=`#ifdef USE_ENVMAP
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
#endif`,Ly=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Iy=`#ifdef USE_ENVMAP
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
#endif`,Uy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ny=`#ifdef USE_ENVMAP
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
#endif`,Oy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,By=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ky=`#ifdef USE_GRADIENTMAP
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
}`,Hy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wy=`uniform bool receiveShadow;
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
#endif`,Xy=`#ifdef USE_ENVMAP
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
#endif`,jy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$y=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ky=`PhysicalMaterial material;
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
#endif`,Zy=`struct PhysicalMaterial {
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
}`,Jy=`
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
#endif`,Qy=`#if defined( RE_IndirectDiffuse )
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
#endif`,tM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,eM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,aM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lM=`#if defined( USE_POINTS_UV )
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
#endif`,cM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pM=`#ifdef USE_MORPHTARGETS
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
#endif`,mM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_M=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,MM=`#ifdef USE_NORMALMAP
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
#endif`,SM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,EM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,TM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,AM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,RM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,CM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,PM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,DM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,LM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,IM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,UM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,NM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,OM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,FM=`float getShadowMask() {
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
}`,BM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zM=`#ifdef USE_SKINNING
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
#endif`,kM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,HM=`#ifdef USE_SKINNING
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
#endif`,VM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,GM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,WM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,XM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jM=`#ifdef USE_TRANSMISSION
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
#endif`,qM=`#ifdef USE_TRANSMISSION
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
#endif`,YM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$M=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,KM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ZM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const JM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,QM=`uniform sampler2D t2D;
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
}`,tS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sS=`#include <common>
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
}`,rS=`#if DEPTH_PACKING == 3200
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
}`,oS=`#define DISTANCE
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
}`,aS=`#define DISTANCE
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
}`,lS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uS=`uniform float scale;
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
}`,fS=`uniform vec3 diffuse;
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
}`,hS=`#include <common>
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
}`,dS=`uniform vec3 diffuse;
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
}`,pS=`#define LAMBERT
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
}`,mS=`#define LAMBERT
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
}`,gS=`#define MATCAP
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
}`,_S=`#define MATCAP
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
}`,vS=`#define NORMAL
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
}`,xS=`#define NORMAL
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
}`,yS=`#define PHONG
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
}`,MS=`#define PHONG
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
}`,SS=`#define STANDARD
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
}`,ES=`#define STANDARD
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
}`,bS=`#define TOON
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
}`,TS=`#define TOON
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
}`,AS=`uniform float size;
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
}`,wS=`uniform vec3 diffuse;
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
}`,RS=`#include <common>
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
}`,CS=`uniform vec3 color;
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
}`,PS=`uniform float rotation;
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
}`,DS=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:Qx,alphahash_pars_fragment:ty,alphamap_fragment:ey,alphamap_pars_fragment:ny,alphatest_fragment:iy,alphatest_pars_fragment:sy,aomap_fragment:ry,aomap_pars_fragment:oy,batching_pars_vertex:ay,batching_vertex:ly,begin_vertex:cy,beginnormal_vertex:uy,bsdfs:fy,iridescence_fragment:hy,bumpmap_pars_fragment:dy,clipping_planes_fragment:py,clipping_planes_pars_fragment:my,clipping_planes_pars_vertex:gy,clipping_planes_vertex:_y,color_fragment:vy,color_pars_fragment:xy,color_pars_vertex:yy,color_vertex:My,common:Sy,cube_uv_reflection_fragment:Ey,defaultnormal_vertex:by,displacementmap_pars_vertex:Ty,displacementmap_vertex:Ay,emissivemap_fragment:wy,emissivemap_pars_fragment:Ry,colorspace_fragment:Cy,colorspace_pars_fragment:Py,envmap_fragment:Dy,envmap_common_pars_fragment:Ly,envmap_pars_fragment:Iy,envmap_pars_vertex:Uy,envmap_physical_pars_fragment:Xy,envmap_vertex:Ny,fog_vertex:Oy,fog_pars_vertex:Fy,fog_fragment:By,fog_pars_fragment:zy,gradientmap_pars_fragment:ky,lightmap_pars_fragment:Hy,lights_lambert_fragment:Vy,lights_lambert_pars_fragment:Gy,lights_pars_begin:Wy,lights_toon_fragment:jy,lights_toon_pars_fragment:qy,lights_phong_fragment:Yy,lights_phong_pars_fragment:$y,lights_physical_fragment:Ky,lights_physical_pars_fragment:Zy,lights_fragment_begin:Jy,lights_fragment_maps:Qy,lights_fragment_end:tM,logdepthbuf_fragment:eM,logdepthbuf_pars_fragment:nM,logdepthbuf_pars_vertex:iM,logdepthbuf_vertex:sM,map_fragment:rM,map_pars_fragment:oM,map_particle_fragment:aM,map_particle_pars_fragment:lM,metalnessmap_fragment:cM,metalnessmap_pars_fragment:uM,morphinstance_vertex:fM,morphcolor_vertex:hM,morphnormal_vertex:dM,morphtarget_pars_vertex:pM,morphtarget_vertex:mM,normal_fragment_begin:gM,normal_fragment_maps:_M,normal_pars_fragment:vM,normal_pars_vertex:xM,normal_vertex:yM,normalmap_pars_fragment:MM,clearcoat_normal_fragment_begin:SM,clearcoat_normal_fragment_maps:EM,clearcoat_pars_fragment:bM,iridescence_pars_fragment:TM,opaque_fragment:AM,packing:wM,premultiplied_alpha_fragment:RM,project_vertex:CM,dithering_fragment:PM,dithering_pars_fragment:DM,roughnessmap_fragment:LM,roughnessmap_pars_fragment:IM,shadowmap_pars_fragment:UM,shadowmap_pars_vertex:NM,shadowmap_vertex:OM,shadowmask_pars_fragment:FM,skinbase_vertex:BM,skinning_pars_vertex:zM,skinning_vertex:kM,skinnormal_vertex:HM,specularmap_fragment:VM,specularmap_pars_fragment:GM,tonemapping_fragment:WM,tonemapping_pars_fragment:XM,transmission_fragment:jM,transmission_pars_fragment:qM,uv_pars_fragment:YM,uv_pars_vertex:$M,uv_vertex:KM,worldpos_vertex:ZM,background_vert:JM,background_frag:QM,backgroundCube_vert:tS,backgroundCube_frag:eS,cube_vert:nS,cube_frag:iS,depth_vert:sS,depth_frag:rS,distanceRGBA_vert:oS,distanceRGBA_frag:aS,equirect_vert:lS,equirect_frag:cS,linedashed_vert:uS,linedashed_frag:fS,meshbasic_vert:hS,meshbasic_frag:dS,meshlambert_vert:pS,meshlambert_frag:mS,meshmatcap_vert:gS,meshmatcap_frag:_S,meshnormal_vert:vS,meshnormal_frag:xS,meshphong_vert:yS,meshphong_frag:MS,meshphysical_vert:SS,meshphysical_frag:ES,meshtoon_vert:bS,meshtoon_frag:TS,points_vert:AS,points_frag:wS,shadow_vert:RS,shadow_frag:CS,sprite_vert:PS,sprite_frag:DS},At={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Bn={basic:{uniforms:Xe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Xe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Xe([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Xe([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Xe([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Xe([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Xe([At.points,At.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Xe([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Xe([At.common,At.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Xe([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Xe([At.sprite,At.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Xe([At.common,At.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Xe([At.lights,At.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Bn.physical={uniforms:Xe([Bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const Lo={r:0,b:0,g:0},ji=new Wn,LS=new de;function IS(n,t,e,i,s,r,o){const a=new qt(0);let l=r===!0?0:1,c,u,f=null,h=0,p=null;function g(E){let T=E.isScene===!0?E.background:null;return T&&T.isTexture&&(T=(E.backgroundBlurriness>0?e:t).get(T)),T}function _(E){let T=!1;const y=g(E);y===null?d(a,l):y&&y.isColor&&(d(y,1),T=!0);const I=n.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(E,T){const y=g(T);y&&(y.isCubeTexture||y.mapping===Da)?(u===void 0&&(u=new we(new io(1,1,1),new ke({name:"BackgroundCubeMaterial",uniforms:sr(Bn.backgroundCube.uniforms),vertexShader:Bn.backgroundCube.vertexShader,fragmentShader:Bn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,L,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ji.copy(T.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(LS.makeRotationFromEuler(ji)),u.material.toneMapped=ee.getTransfer(y.colorSpace)!==ce,(f!==y||h!==y.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=y,h=y.version,p=n.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new we(new Ia(2,2),new ke({name:"BackgroundMaterial",uniforms:sr(Bn.background.uniforms),vertexShader:Bn.background.vertexShader,fragmentShader:Bn.background.fragmentShader,side:Fi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=ee.getTransfer(y.colorSpace)!==ce,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||h!==y.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,h=y.version,p=n.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,T){E.getRGB(Lo,um(n)),i.buffers.color.setClear(Lo.r,Lo.g,Lo.b,T,o)}return{getClearColor:function(){return a},setClearColor:function(E,T=1){a.set(E),l=T,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,d(a,l)},render:_,addToRenderList:m}}function US(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(b,D,F,H,V){let $=!1;const tt=f(H,F,D);r!==tt&&(r=tt,c(r.object)),$=p(b,H,F,V),$&&g(b,H,F,V),V!==null&&t.update(V,n.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,y(b,D,F,H),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function f(b,D,F){const H=F.wireframe===!0;let V=i[b.id];V===void 0&&(V={},i[b.id]=V);let $=V[D.id];$===void 0&&($={},V[D.id]=$);let tt=$[H];return tt===void 0&&(tt=h(l()),$[H]=tt),tt}function h(b){const D=[],F=[],H=[];for(let V=0;V<e;V++)D[V]=0,F[V]=0,H[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:H,object:b,attributes:{},index:null}}function p(b,D,F,H){const V=r.attributes,$=D.attributes;let tt=0;const it=F.getAttributes();for(const K in it)if(it[K].location>=0){const Mt=V[K];let Ct=$[K];if(Ct===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(Ct=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(Ct=b.instanceColor)),Mt===void 0||Mt.attribute!==Ct||Ct&&Mt.data!==Ct.data)return!0;tt++}return r.attributesNum!==tt||r.index!==H}function g(b,D,F,H){const V={},$=D.attributes;let tt=0;const it=F.getAttributes();for(const K in it)if(it[K].location>=0){let Mt=$[K];Mt===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(Mt=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(Mt=b.instanceColor));const Ct={};Ct.attribute=Mt,Mt&&Mt.data&&(Ct.data=Mt.data),V[K]=Ct,tt++}r.attributes=V,r.attributesNum=tt,r.index=H}function _(){const b=r.newAttributes;for(let D=0,F=b.length;D<F;D++)b[D]=0}function m(b){d(b,0)}function d(b,D){const F=r.newAttributes,H=r.enabledAttributes,V=r.attributeDivisors;F[b]=1,H[b]===0&&(n.enableVertexAttribArray(b),H[b]=1),V[b]!==D&&(n.vertexAttribDivisor(b,D),V[b]=D)}function E(){const b=r.newAttributes,D=r.enabledAttributes;for(let F=0,H=D.length;F<H;F++)D[F]!==b[F]&&(n.disableVertexAttribArray(F),D[F]=0)}function T(b,D,F,H,V,$,tt){tt===!0?n.vertexAttribIPointer(b,D,F,V,$):n.vertexAttribPointer(b,D,F,H,V,$)}function y(b,D,F,H){_();const V=H.attributes,$=F.getAttributes(),tt=D.defaultAttributeValues;for(const it in $){const K=$[it];if(K.location>=0){let mt=V[it];if(mt===void 0&&(it==="instanceMatrix"&&b.instanceMatrix&&(mt=b.instanceMatrix),it==="instanceColor"&&b.instanceColor&&(mt=b.instanceColor)),mt!==void 0){const Mt=mt.normalized,Ct=mt.itemSize,Ft=t.get(mt);if(Ft===void 0)continue;const Jt=Ft.buffer,at=Ft.type,_t=Ft.bytesPerElement,Tt=at===n.INT||at===n.UNSIGNED_INT||mt.gpuType===pu;if(mt.isInterleavedBufferAttribute){const O=mt.data,ut=O.stride,lt=mt.offset;if(O.isInstancedInterleavedBuffer){for(let gt=0;gt<K.locationSize;gt++)d(K.location+gt,O.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let gt=0;gt<K.locationSize;gt++)m(K.location+gt);n.bindBuffer(n.ARRAY_BUFFER,Jt);for(let gt=0;gt<K.locationSize;gt++)T(K.location+gt,Ct/K.locationSize,at,Mt,ut*_t,(lt+Ct/K.locationSize*gt)*_t,Tt)}else{if(mt.isInstancedBufferAttribute){for(let O=0;O<K.locationSize;O++)d(K.location+O,mt.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let O=0;O<K.locationSize;O++)m(K.location+O);n.bindBuffer(n.ARRAY_BUFFER,Jt);for(let O=0;O<K.locationSize;O++)T(K.location+O,Ct/K.locationSize,at,Mt,Ct*_t,Ct/K.locationSize*O*_t,Tt)}}else if(tt!==void 0){const Mt=tt[it];if(Mt!==void 0)switch(Mt.length){case 2:n.vertexAttrib2fv(K.location,Mt);break;case 3:n.vertexAttrib3fv(K.location,Mt);break;case 4:n.vertexAttrib4fv(K.location,Mt);break;default:n.vertexAttrib1fv(K.location,Mt)}}}}E()}function I(){N();for(const b in i){const D=i[b];for(const F in D){const H=D[F];for(const V in H)u(H[V].object),delete H[V];delete D[F]}delete i[b]}}function L(b){if(i[b.id]===void 0)return;const D=i[b.id];for(const F in D){const H=D[F];for(const V in H)u(H[V].object),delete H[V];delete D[F]}delete i[b.id]}function P(b){for(const D in i){const F=i[D];if(F[b.id]===void 0)continue;const H=F[b.id];for(const V in H)u(H[V].object),delete H[V];delete F[b.id]}}function N(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:L,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function NS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let g=0;g<f;g++)p+=u[g];e.update(p,i,1)}function l(c,u,f,h){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function OS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==vn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const N=P===ci&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Gn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==oi&&!N)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:E,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:I,maxSamples:L}}function FS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Ri,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const E=r?0:i,T=E*4;let y=d.clippingState||null;l.value=y,y=u(g,h,T,p);for(let I=0;I!==T;++I)y[I]=e[I];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,p,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,E=h.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<d)&&(m=new Float32Array(d));for(let T=0,y=p;T!==_;++T,y+=4)o.copy(f[T]).applyMatrix4(E,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function BS(n){let t=new WeakMap;function e(o,a){return a===oc?o.mapping=tr:a===ac&&(o.mapping=er),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===oc||a===ac)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new $x(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Su extends fm{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ns=4,ch=[.125,.215,.35,.446,.526,.582],Ji=20,xl=new Su,uh=new qt;let yl=null,Ml=0,Sl=0,El=!1;const $i=(1+Math.sqrt(5))/2,Rs=1/$i,fh=[new j(-$i,Rs,0),new j($i,Rs,0),new j(-Rs,0,$i),new j(Rs,0,$i),new j(0,$i,-Rs),new j(0,$i,Rs),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class hh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){yl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),El=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(yl,Ml,Sl),this._renderer.xr.enabled=El,t.scissorTest=!1,Io(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===tr||t.mapping===er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),Sl=this._renderer.getActiveMipmapLevel(),El=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:ci,format:vn,colorSpace:lr,depthBuffer:!1},s=dh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zS(r)),this._blurMaterial=kS(r,t,e)}return s}_compileMaterial(t){const e=new we(this._lodPlanes[0],t);this._renderer.compile(e,xl)}_sceneToCubeUV(t,e,i,s){const a=new _n(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(uh),u.toneMapping=Ii,u.autoClear=!1;const p=new gn({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),g=new we(new io,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(uh),_=!0);for(let d=0;d<6;d++){const E=d%3;E===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):E===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const T=this._cubeSize;Io(s,E*T,d>2?T:0,T,T),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===tr||t.mapping===er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ph());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Io(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,xl)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=fh[(s-r-1)%fh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new we(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ji-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Ji;m>Ji&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ji}`);const d=[];let E=0;for(let P=0;P<Ji;++P){const N=P/_,w=Math.exp(-N*N/2);d.push(w),P===0?E+=w:P<m&&(E+=2*w)}for(let P=0;P<d.length;P++)d[P]=d[P]/E;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-i;const y=this._sizeLods[s],I=3*y*(s>T-Ns?s-T+Ns:0),L=4*(this._cubeSize-y);Io(e,I,L,3*y,2*y),l.setRenderTarget(e),l.render(f,xl)}}function zS(n){const t=[],e=[],i=[];let s=n;const r=n-Ns+1+ch.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ns?l=ch[o-n+Ns-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,_=3,m=2,d=1,E=new Float32Array(_*g*p),T=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let L=0;L<p;L++){const P=L%3*2/3-1,N=L>2?0:-1,w=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];E.set(w,_*g*L),T.set(h,m*g*L);const b=[L,L,L,L,L,L];y.set(b,d*g*L)}const I=new Ve;I.setAttribute("position",new Mn(E,_)),I.setAttribute("uv",new Mn(T,m)),I.setAttribute("faceIndex",new Mn(y,d)),t.push(I),s>Ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function dh(n,t,e){const i=new Pn(n,t,e);return i.texture.mapping=Da,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Io(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function kS(n,t,e){const i=new Float32Array(Ji),s=new j(0,1,0);return new ke({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Eu(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function ph(){return new ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eu(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function mh(){return new ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Eu(){return`

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
	`}function HS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===oc||l===ac,u=l===tr||l===er;if(c||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new hh(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new hh(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function VS(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Rr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function GS(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];const p=r.get(h);p&&(t.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,g=f.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let T=0,y=E.length;T<y;T+=3){const I=E[T+0],L=E[T+1],P=E[T+2];h.push(I,L,L,P,P,I)}}else if(g!==void 0){const E=g.array;_=g.version;for(let T=0,y=E.length/3-1;T<y;T+=3){const I=T+0,L=T+1,P=T+2;h.push(I,L,L,P,P,I)}}else return;const m=new(sm(h)?cm:lm)(h,1);m.version=_;const d=r.get(f);d&&t.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function WS(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,p){n.drawElements(i,p,r,h*o),e.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,h*o,g),e.update(p,i,g))}function u(h,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,h,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function f(h,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,h,0,_,0,g);let d=0;for(let E=0;E<g;E++)d+=p[E]*_[E];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function XS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function jS(n,t,e){const i=new WeakMap,s=new Me;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let w=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",w)};h!==void 0&&h.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let T=0;p===!0&&(T=1),g===!0&&(T=2),_===!0&&(T=3);let y=a.attributes.position.count*T,I=1;y>t.maxTextureSize&&(I=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const L=new Float32Array(y*I*4*f),P=new om(L,y,I,f);P.type=oi,P.needsUpdate=!0;const N=T*4;for(let b=0;b<f;b++){const D=m[b],F=d[b],H=E[b],V=y*I*4*b;for(let $=0;$<D.count;$++){const tt=$*N;p===!0&&(s.fromBufferAttribute(D,$),L[V+tt+0]=s.x,L[V+tt+1]=s.y,L[V+tt+2]=s.z,L[V+tt+3]=0),g===!0&&(s.fromBufferAttribute(F,$),L[V+tt+4]=s.x,L[V+tt+5]=s.y,L[V+tt+6]=s.z,L[V+tt+7]=0),_===!0&&(s.fromBufferAttribute(H,$),L[V+tt+8]=s.x,L[V+tt+9]=s.y,L[V+tt+10]=s.z,L[V+tt+11]=H.itemSize===4?s.w:1)}}h={count:f,texture:P,size:new zt(y,I)},i.set(a,h),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function qS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=t.get(l,u);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class pm extends Qe{constructor(t,e,i,s,r,o,a,l,c,u=js){if(u!==js&&u!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===js&&(i=os),i===void 0&&u===ir&&(i=nr),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:dn,this.minFilter=l!==void 0?l:dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const mm=new Qe,gh=new pm(1,1),gm=new om,_m=new Ux,vm=new hm,_h=[],vh=[],xh=new Float32Array(16),yh=new Float32Array(9),Mh=new Float32Array(4);function ur(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=_h[s];if(r===void 0&&(r=new Float32Array(s),_h[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ce(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Pe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ua(n,t){let e=vh[t];e===void 0&&(e=new Int32Array(t),vh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function YS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function $S(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2fv(this.addr,t),Pe(e,t)}}function KS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;n.uniform3fv(this.addr,t),Pe(e,t)}}function ZS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4fv(this.addr,t),Pe(e,t)}}function JS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;Mh.set(i),n.uniformMatrix2fv(this.addr,!1,Mh),Pe(e,i)}}function QS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;yh.set(i),n.uniformMatrix3fv(this.addr,!1,yh),Pe(e,i)}}function tE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;xh.set(i),n.uniformMatrix4fv(this.addr,!1,xh),Pe(e,i)}}function eE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function nE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2iv(this.addr,t),Pe(e,t)}}function iE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3iv(this.addr,t),Pe(e,t)}}function sE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4iv(this.addr,t),Pe(e,t)}}function rE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function oE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2uiv(this.addr,t),Pe(e,t)}}function aE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3uiv(this.addr,t),Pe(e,t)}}function lE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4uiv(this.addr,t),Pe(e,t)}}function cE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(gh.compareFunction=im,r=gh):r=mm,e.setTexture2D(t||r,s)}function uE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||_m,s)}function fE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||vm,s)}function hE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||gm,s)}function dE(n){switch(n){case 5126:return YS;case 35664:return $S;case 35665:return KS;case 35666:return ZS;case 35674:return JS;case 35675:return QS;case 35676:return tE;case 5124:case 35670:return eE;case 35667:case 35671:return nE;case 35668:case 35672:return iE;case 35669:case 35673:return sE;case 5125:return rE;case 36294:return oE;case 36295:return aE;case 36296:return lE;case 35678:case 36198:case 36298:case 36306:case 35682:return cE;case 35679:case 36299:case 36307:return uE;case 35680:case 36300:case 36308:case 36293:return fE;case 36289:case 36303:case 36311:case 36292:return hE}}function pE(n,t){n.uniform1fv(this.addr,t)}function mE(n,t){const e=ur(t,this.size,2);n.uniform2fv(this.addr,e)}function gE(n,t){const e=ur(t,this.size,3);n.uniform3fv(this.addr,e)}function _E(n,t){const e=ur(t,this.size,4);n.uniform4fv(this.addr,e)}function vE(n,t){const e=ur(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function xE(n,t){const e=ur(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function yE(n,t){const e=ur(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ME(n,t){n.uniform1iv(this.addr,t)}function SE(n,t){n.uniform2iv(this.addr,t)}function EE(n,t){n.uniform3iv(this.addr,t)}function bE(n,t){n.uniform4iv(this.addr,t)}function TE(n,t){n.uniform1uiv(this.addr,t)}function AE(n,t){n.uniform2uiv(this.addr,t)}function wE(n,t){n.uniform3uiv(this.addr,t)}function RE(n,t){n.uniform4uiv(this.addr,t)}function CE(n,t,e){const i=this.cache,s=t.length,r=Ua(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||mm,r[o])}function PE(n,t,e){const i=this.cache,s=t.length,r=Ua(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||_m,r[o])}function DE(n,t,e){const i=this.cache,s=t.length,r=Ua(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||vm,r[o])}function LE(n,t,e){const i=this.cache,s=t.length,r=Ua(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||gm,r[o])}function IE(n){switch(n){case 5126:return pE;case 35664:return mE;case 35665:return gE;case 35666:return _E;case 35674:return vE;case 35675:return xE;case 35676:return yE;case 5124:case 35670:return ME;case 35667:case 35671:return SE;case 35668:case 35672:return EE;case 35669:case 35673:return bE;case 5125:return TE;case 36294:return AE;case 36295:return wE;case 36296:return RE;case 35678:case 36198:case 36298:case 36306:case 35682:return CE;case 35679:case 36299:case 36307:return PE;case 35680:case 36300:case 36308:case 36293:return DE;case 36289:case 36303:case 36311:case 36292:return LE}}class UE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=dE(e.type)}}class NE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=IE(e.type)}}class OE{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const bl=/(\w+)(\])?(\[|\.)?/g;function Sh(n,t){n.seq.push(t),n.map[t.id]=t}function FE(n,t,e){const i=n.name,s=i.length;for(bl.lastIndex=0;;){const r=bl.exec(i),o=bl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Sh(e,c===void 0?new UE(a,n,t):new NE(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new OE(a),Sh(e,f)),e=f}}}class Jo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);FE(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Eh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const BE=37297;let zE=0;function kE(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const bh=new Kt;function HE(n){ee._getMatrix(bh,ee.workingColorSpace,n);const t=`mat3( ${bh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case La:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Th(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+kE(n.getShaderSource(t),o)}else return s}function VE(n,t){const e=HE(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function GE(n,t){let e;switch(t){case kp:e="Linear";break;case Hp:e="Reinhard";break;case Vp:e="Cineon";break;case du:e="ACESFilmic";break;case Gp:e="AgX";break;case Wp:e="Neutral";break;case hx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Uo=new j;function WE(){ee.getLuminanceCoefficients(Uo);const n=Uo.x.toFixed(4),t=Uo.y.toFixed(4),e=Uo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function jE(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function qE(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Cr(n){return n!==""}function Ah(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const YE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(n){return n.replace(YE,KE)}const $E=new Map;function KE(n,t){let e=Zt[t];if(e===void 0){const i=$E.get(t);if(i!==void 0)e=Zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Oc(e)}const ZE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rh(n){return n.replace(ZE,JE)}function JE(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ch(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function QE(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Bp?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===X0?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ei&&(t="SHADOWMAP_TYPE_VSM"),t}function tb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case tr:case er:t="ENVMAP_TYPE_CUBE";break;case Da:t="ENVMAP_TYPE_CUBE_UV";break}return t}function eb(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case er:t="ENVMAP_MODE_REFRACTION";break}return t}function nb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case zp:t="ENVMAP_BLENDING_MULTIPLY";break;case ux:t="ENVMAP_BLENDING_MIX";break;case fx:t="ENVMAP_BLENDING_ADD";break}return t}function ib(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function sb(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=QE(e),c=tb(e),u=eb(e),f=nb(e),h=ib(e),p=XE(e),g=jE(r),_=s.createProgram();let m,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Cr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Cr).join(`
`),d.length>0&&(d+=`
`)):(m=[Ch(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),d=[Ch(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ii?"#define TONE_MAPPING":"",e.toneMapping!==Ii?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Ii?GE("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,VE("linearToOutputTexel",e.outputColorSpace),WE(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Cr).join(`
`)),o=Oc(o),o=Ah(o,e),o=wh(o,e),a=Oc(a),a=Ah(a,e),a=wh(a,e),o=Rh(o),a=Rh(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Vf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const T=E+m+o,y=E+d+a,I=Eh(s,s.VERTEX_SHADER,T),L=Eh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,I),s.attachShader(_,L),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(D){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(_).trim(),H=s.getShaderInfoLog(I).trim(),V=s.getShaderInfoLog(L).trim();let $=!0,tt=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,I,L);else{const it=Th(s,I,"vertex"),K=Th(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+it+`
`+K)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(H===""||V==="")&&(tt=!1);tt&&(D.diagnostics={runnable:$,programLog:F,vertexShader:{log:H,prefix:m},fragmentShader:{log:V,prefix:d}})}s.deleteShader(I),s.deleteShader(L),N=new Jo(s,_),w=qE(s,_)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,BE)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=zE++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=L,this}let rb=0;class ob{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new ab(t),e.set(t,i)),i}}class ab{constructor(t){this.id=rb++,this.code=t,this.usedTimes=0}}function lb(n,t,e,i,s,r,o){const a=new yu,l=new ob,c=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,b,D,F,H){const V=F.fog,$=H.geometry,tt=w.isMeshStandardMaterial?F.environment:null,it=(w.isMeshStandardMaterial?e:t).get(w.envMap||tt),K=it&&it.mapping===Da?it.image.height:null,mt=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const Mt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Ct=Mt!==void 0?Mt.length:0;let Ft=0;$.morphAttributes.position!==void 0&&(Ft=1),$.morphAttributes.normal!==void 0&&(Ft=2),$.morphAttributes.color!==void 0&&(Ft=3);let Jt,at,_t,Tt;if(mt){const ie=Bn[mt];Jt=ie.vertexShader,at=ie.fragmentShader}else Jt=w.vertexShader,at=w.fragmentShader,l.update(w),_t=l.getVertexShaderID(w),Tt=l.getFragmentShaderID(w);const O=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),lt=H.isInstancedMesh===!0,gt=H.isBatchedMesh===!0,ht=!!w.map,S=!!w.matcap,C=!!it,M=!!w.aoMap,J=!!w.lightMap,Q=!!w.bumpMap,Z=!!w.normalMap,ot=!!w.displacementMap,W=!!w.emissiveMap,B=!!w.metalnessMap,x=!!w.roughnessMap,v=w.anisotropy>0,R=w.clearcoat>0,U=w.dispersion>0,k=w.iridescence>0,G=w.sheen>0,vt=w.transmission>0,ct=v&&!!w.anisotropyMap,dt=R&&!!w.clearcoatMap,Pt=R&&!!w.clearcoatNormalMap,st=R&&!!w.clearcoatRoughnessMap,pt=k&&!!w.iridescenceMap,Et=k&&!!w.iridescenceThicknessMap,Ht=G&&!!w.sheenColorMap,yt=G&&!!w.sheenRoughnessMap,kt=!!w.specularMap,Vt=!!w.specularColorMap,te=!!w.specularIntensityMap,z=vt&&!!w.transmissionMap,bt=vt&&!!w.thicknessMap,rt=!!w.gradientMap,ft=!!w.alphaMap,St=w.alphaTest>0,wt=!!w.alphaHash,Gt=!!w.extensions;let ve=Ii;w.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ve=n.toneMapping);const De={shaderID:mt,shaderType:w.type,shaderName:w.name,vertexShader:Jt,fragmentShader:at,defines:w.defines,customVertexShaderID:_t,customFragmentShaderID:Tt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:gt,batchingColor:gt&&H._colorsTexture!==null,instancing:lt,instancingColor:lt&&H.instanceColor!==null,instancingMorph:lt&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:O===null?n.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:lr,alphaToCoverage:!!w.alphaToCoverage,map:ht,matcap:S,envMap:C,envMapMode:C&&it.mapping,envMapCubeUVHeight:K,aoMap:M,lightMap:J,bumpMap:Q,normalMap:Z,displacementMap:h&&ot,emissiveMap:W,normalMapObjectSpace:Z&&w.normalMapType===gx,normalMapTangentSpace:Z&&w.normalMapType===nm,metalnessMap:B,roughnessMap:x,anisotropy:v,anisotropyMap:ct,clearcoat:R,clearcoatMap:dt,clearcoatNormalMap:Pt,clearcoatRoughnessMap:st,dispersion:U,iridescence:k,iridescenceMap:pt,iridescenceThicknessMap:Et,sheen:G,sheenColorMap:Ht,sheenRoughnessMap:yt,specularMap:kt,specularColorMap:Vt,specularIntensityMap:te,transmission:vt,transmissionMap:z,thicknessMap:bt,gradientMap:rt,opaque:w.transparent===!1&&w.blending===Ws&&w.alphaToCoverage===!1,alphaMap:ft,alphaTest:St,alphaHash:wt,combine:w.combine,mapUv:ht&&_(w.map.channel),aoMapUv:M&&_(w.aoMap.channel),lightMapUv:J&&_(w.lightMap.channel),bumpMapUv:Q&&_(w.bumpMap.channel),normalMapUv:Z&&_(w.normalMap.channel),displacementMapUv:ot&&_(w.displacementMap.channel),emissiveMapUv:W&&_(w.emissiveMap.channel),metalnessMapUv:B&&_(w.metalnessMap.channel),roughnessMapUv:x&&_(w.roughnessMap.channel),anisotropyMapUv:ct&&_(w.anisotropyMap.channel),clearcoatMapUv:dt&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:yt&&_(w.sheenRoughnessMap.channel),specularMapUv:kt&&_(w.specularMap.channel),specularColorMapUv:Vt&&_(w.specularColorMap.channel),specularIntensityMapUv:te&&_(w.specularIntensityMap.channel),transmissionMapUv:z&&_(w.transmissionMap.channel),thicknessMapUv:bt&&_(w.thicknessMap.channel),alphaMapUv:ft&&_(w.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Z||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!$.attributes.uv&&(ht||ft),fog:!!V,useFog:w.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:ut,skinning:H.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Ft,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:ht&&w.map.isVideoTexture===!0&&ee.getTransfer(w.map.colorSpace)===ce,decodeVideoTextureEmissive:W&&w.emissiveMap.isVideoTexture===!0&&ee.getTransfer(w.emissiveMap.colorSpace)===ce,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===An,flipSided:w.side===an,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Gt&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&w.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function d(w){const b=[];if(w.shaderID?b.push(w.shaderID):(b.push(w.customVertexShaderID),b.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)b.push(D),b.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(E(b,w),T(b,w),b.push(n.outputColorSpace)),b.push(w.customProgramCacheKey),b.join()}function E(w,b){w.push(b.precision),w.push(b.outputColorSpace),w.push(b.envMapMode),w.push(b.envMapCubeUVHeight),w.push(b.mapUv),w.push(b.alphaMapUv),w.push(b.lightMapUv),w.push(b.aoMapUv),w.push(b.bumpMapUv),w.push(b.normalMapUv),w.push(b.displacementMapUv),w.push(b.emissiveMapUv),w.push(b.metalnessMapUv),w.push(b.roughnessMapUv),w.push(b.anisotropyMapUv),w.push(b.clearcoatMapUv),w.push(b.clearcoatNormalMapUv),w.push(b.clearcoatRoughnessMapUv),w.push(b.iridescenceMapUv),w.push(b.iridescenceThicknessMapUv),w.push(b.sheenColorMapUv),w.push(b.sheenRoughnessMapUv),w.push(b.specularMapUv),w.push(b.specularColorMapUv),w.push(b.specularIntensityMapUv),w.push(b.transmissionMapUv),w.push(b.thicknessMapUv),w.push(b.combine),w.push(b.fogExp2),w.push(b.sizeAttenuation),w.push(b.morphTargetsCount),w.push(b.morphAttributeCount),w.push(b.numDirLights),w.push(b.numPointLights),w.push(b.numSpotLights),w.push(b.numSpotLightMaps),w.push(b.numHemiLights),w.push(b.numRectAreaLights),w.push(b.numDirLightShadows),w.push(b.numPointLightShadows),w.push(b.numSpotLightShadows),w.push(b.numSpotLightShadowsWithMaps),w.push(b.numLightProbes),w.push(b.shadowMapType),w.push(b.toneMapping),w.push(b.numClippingPlanes),w.push(b.numClipIntersection),w.push(b.depthPacking)}function T(w,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),w.push(a.mask)}function y(w){const b=g[w.type];let D;if(b){const F=Bn[b];D=Yr.clone(F.uniforms)}else D=w.uniforms;return D}function I(w,b){let D;for(let F=0,H=u.length;F<H;F++){const V=u[F];if(V.cacheKey===b){D=V,++D.usedTimes;break}}return D===void 0&&(D=new sb(n,b,w,r),u.push(D)),D}function L(w){if(--w.usedTimes===0){const b=u.indexOf(w);u[b]=u[u.length-1],u.pop(),w.destroy()}}function P(w){l.remove(w)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:I,releaseProgram:L,releaseShaderCache:P,programs:u,dispose:N}}function cb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function ub(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Ph(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Dh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f,h,p,g,_,m){let d=n[t];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=g,d.renderOrder=f.renderOrder,d.z=_,d.group=m),t++,d}function a(f,h,p,g,_,m){const d=o(f,h,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(f,h,p,g,_,m){const d=o(f,h,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(f,h){e.length>1&&e.sort(f||ub),i.length>1&&i.sort(h||Ph),s.length>1&&s.sort(h||Ph)}function u(){for(let f=t,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function fb(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Dh,n.set(i,[o])):s>=r.length?(o=new Dh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function hb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new j,color:new qt};break;case"SpotLight":e={position:new j,direction:new j,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new j,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new j,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new j,halfWidth:new j,halfHeight:new j};break}return n[t.id]=e,e}}}function db(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let pb=0;function mb(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function gb(n){const t=new hb,e=db(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new j);const s=new j,r=new de,o=new de;function a(c){let u=0,f=0,h=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,E=0,T=0,y=0,I=0,L=0,P=0;c.sort(mb);for(let w=0,b=c.length;w<b;w++){const D=c[w],F=D.color,H=D.intensity,V=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=F.r*H,f+=F.g*H,h+=F.b*H;else if(D.isLightProbe){for(let tt=0;tt<9;tt++)i.probe[tt].addScaledVector(D.sh.coefficients[tt],H);P++}else if(D.isDirectionalLight){const tt=t.get(D);if(tt.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const it=D.shadow,K=e.get(D);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize=it.mapSize,i.directionalShadow[p]=K,i.directionalShadowMap[p]=$,i.directionalShadowMatrix[p]=D.shadow.matrix,E++}i.directional[p]=tt,p++}else if(D.isSpotLight){const tt=t.get(D);tt.position.setFromMatrixPosition(D.matrixWorld),tt.color.copy(F).multiplyScalar(H),tt.distance=V,tt.coneCos=Math.cos(D.angle),tt.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),tt.decay=D.decay,i.spot[_]=tt;const it=D.shadow;if(D.map&&(i.spotLightMap[I]=D.map,I++,it.updateMatrices(D),D.castShadow&&L++),i.spotLightMatrix[_]=it.matrix,D.castShadow){const K=e.get(D);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize=it.mapSize,i.spotShadow[_]=K,i.spotShadowMap[_]=$,y++}_++}else if(D.isRectAreaLight){const tt=t.get(D);tt.color.copy(F).multiplyScalar(H),tt.halfWidth.set(D.width*.5,0,0),tt.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=tt,m++}else if(D.isPointLight){const tt=t.get(D);if(tt.color.copy(D.color).multiplyScalar(D.intensity),tt.distance=D.distance,tt.decay=D.decay,D.castShadow){const it=D.shadow,K=e.get(D);K.shadowIntensity=it.intensity,K.shadowBias=it.bias,K.shadowNormalBias=it.normalBias,K.shadowRadius=it.radius,K.shadowMapSize=it.mapSize,K.shadowCameraNear=it.camera.near,K.shadowCameraFar=it.camera.far,i.pointShadow[g]=K,i.pointShadowMap[g]=$,i.pointShadowMatrix[g]=D.shadow.matrix,T++}i.point[g]=tt,g++}else if(D.isHemisphereLight){const tt=t.get(D);tt.skyColor.copy(D.color).multiplyScalar(H),tt.groundColor.copy(D.groundColor).multiplyScalar(H),i.hemi[d]=tt,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const N=i.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==d||N.numDirectionalShadows!==E||N.numPointShadows!==T||N.numSpotShadows!==y||N.numSpotMaps!==I||N.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+I-L,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=P,N.directionalLength=p,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=d,N.numDirectionalShadows=E,N.numPointShadows=T,N.numSpotShadows=y,N.numSpotMaps=I,N.numLightProbes=P,i.version=pb++)}function l(c,u){let f=0,h=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,E=c.length;d<E;d++){const T=c[d];if(T.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(T.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(T.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(T.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),h++}else if(T.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Lh(n){const t=new gb(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function _b(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Lh(n),t.set(s,[a])):r>=o.length?(a=new Lh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class vb extends fs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=px,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xb extends fs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const yb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mb=`uniform sampler2D shadow_pass;
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
}`;function Sb(n,t,e){let i=new Mu;const s=new zt,r=new zt,o=new Me,a=new vb({depthPacking:mx}),l=new xb,c={},u=e.maxTextureSize,f={[Fi]:an,[an]:Fi,[An]:An},h=new ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:yb,fragmentShader:Mb}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ve;g.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bp;let d=this.type;this.render=function(L,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;const w=n.getRenderTarget(),b=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(li),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const H=d!==ei&&this.type===ei,V=d===ei&&this.type!==ei;for(let $=0,tt=L.length;$<tt;$++){const it=L[$],K=it.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const mt=K.getFrameExtents();if(s.multiply(mt),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/mt.x),s.x=r.x*mt.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/mt.y),s.y=r.y*mt.y,K.mapSize.y=r.y)),K.map===null||H===!0||V===!0){const Ct=this.type!==ei?{minFilter:dn,magFilter:dn}:{};K.map!==null&&K.map.dispose(),K.map=new Pn(s.x,s.y,Ct),K.map.texture.name=it.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const Mt=K.getViewportCount();for(let Ct=0;Ct<Mt;Ct++){const Ft=K.getViewport(Ct);o.set(r.x*Ft.x,r.y*Ft.y,r.x*Ft.z,r.y*Ft.w),F.viewport(o),K.updateMatrices(it,Ct),i=K.getFrustum(),y(P,N,K.camera,it,this.type)}K.isPointLightShadow!==!0&&this.type===ei&&E(K,N),K.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(w,b,D)};function E(L,P){const N=t.update(_);h.defines.VSM_SAMPLES!==L.blurSamples&&(h.defines.VSM_SAMPLES=L.blurSamples,p.defines.VSM_SAMPLES=L.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Pn(s.x,s.y)),h.uniforms.shadow_pass.value=L.map.texture,h.uniforms.resolution.value=L.mapSize,h.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(P,null,N,h,_,null),p.uniforms.shadow_pass.value=L.mapPass.texture,p.uniforms.resolution.value=L.mapSize,p.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(P,null,N,p,_,null)}function T(L,P,N,w){let b=null;const D=N.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(D!==void 0)b=D;else if(b=N.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const F=b.uuid,H=P.uuid;let V=c[F];V===void 0&&(V={},c[F]=V);let $=V[H];$===void 0&&($=b.clone(),V[H]=$,P.addEventListener("dispose",I)),b=$}if(b.visible=P.visible,b.wireframe=P.wireframe,w===ei?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:f[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=n.properties.get(b);F.light=N}return b}function y(L,P,N,w,b){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&b===ei)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,L.matrixWorld);const H=t.update(L),V=L.material;if(Array.isArray(V)){const $=H.groups;for(let tt=0,it=$.length;tt<it;tt++){const K=$[tt],mt=V[K.materialIndex];if(mt&&mt.visible){const Mt=T(L,mt,w,b);L.onBeforeShadow(n,L,P,N,H,Mt,K),n.renderBufferDirect(N,null,H,Mt,L,K),L.onAfterShadow(n,L,P,N,H,Mt,K)}}}else if(V.visible){const $=T(L,V,w,b);L.onBeforeShadow(n,L,P,N,H,$,null),n.renderBufferDirect(N,null,H,$,L,null),L.onAfterShadow(n,L,P,N,H,$,null)}}const F=L.children;for(let H=0,V=F.length;H<V;H++)y(F[H],P,N,w,b)}function I(L){L.target.removeEventListener("dispose",I);for(const N in c){const w=c[N],b=L.target.uuid;b in w&&(w[b].dispose(),delete w[b])}}}const Eb={[Ql]:tc,[ec]:sc,[nc]:rc,[Qs]:ic,[tc]:Ql,[sc]:ec,[rc]:nc,[ic]:Qs};function bb(n,t){function e(){let z=!1;const bt=new Me;let rt=null;const ft=new Me(0,0,0,0);return{setMask:function(St){rt!==St&&!z&&(n.colorMask(St,St,St,St),rt=St)},setLocked:function(St){z=St},setClear:function(St,wt,Gt,ve,De){De===!0&&(St*=ve,wt*=ve,Gt*=ve),bt.set(St,wt,Gt,ve),ft.equals(bt)===!1&&(n.clearColor(St,wt,Gt,ve),ft.copy(bt))},reset:function(){z=!1,rt=null,ft.set(-1,0,0,0)}}}function i(){let z=!1,bt=!1,rt=null,ft=null,St=null;return{setReversed:function(wt){if(bt!==wt){const Gt=t.get("EXT_clip_control");bt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const ve=St;St=null,this.setClear(ve)}bt=wt},getReversed:function(){return bt},setTest:function(wt){wt?O(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(wt){rt!==wt&&!z&&(n.depthMask(wt),rt=wt)},setFunc:function(wt){if(bt&&(wt=Eb[wt]),ft!==wt){switch(wt){case Ql:n.depthFunc(n.NEVER);break;case tc:n.depthFunc(n.ALWAYS);break;case ec:n.depthFunc(n.LESS);break;case Qs:n.depthFunc(n.LEQUAL);break;case nc:n.depthFunc(n.EQUAL);break;case ic:n.depthFunc(n.GEQUAL);break;case sc:n.depthFunc(n.GREATER);break;case rc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ft=wt}},setLocked:function(wt){z=wt},setClear:function(wt){St!==wt&&(bt&&(wt=1-wt),n.clearDepth(wt),St=wt)},reset:function(){z=!1,rt=null,ft=null,St=null,bt=!1}}}function s(){let z=!1,bt=null,rt=null,ft=null,St=null,wt=null,Gt=null,ve=null,De=null;return{setTest:function(ie){z||(ie?O(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(ie){bt!==ie&&!z&&(n.stencilMask(ie),bt=ie)},setFunc:function(ie,Ge,tn){(rt!==ie||ft!==Ge||St!==tn)&&(n.stencilFunc(ie,Ge,tn),rt=ie,ft=Ge,St=tn)},setOp:function(ie,Ge,tn){(wt!==ie||Gt!==Ge||ve!==tn)&&(n.stencilOp(ie,Ge,tn),wt=ie,Gt=Ge,ve=tn)},setLocked:function(ie){z=ie},setClear:function(ie){De!==ie&&(n.clearStencil(ie),De=ie)},reset:function(){z=!1,bt=null,rt=null,ft=null,St=null,wt=null,Gt=null,ve=null,De=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,E=null,T=null,y=null,I=null,L=null,P=new qt(0,0,0),N=0,w=!1,b=null,D=null,F=null,H=null,V=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let tt=!1,it=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(K)[1]),tt=it>=1):K.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),tt=it>=2);let mt=null,Mt={};const Ct=n.getParameter(n.SCISSOR_BOX),Ft=n.getParameter(n.VIEWPORT),Jt=new Me().fromArray(Ct),at=new Me().fromArray(Ft);function _t(z,bt,rt,ft){const St=new Uint8Array(4),wt=n.createTexture();n.bindTexture(z,wt),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Gt=0;Gt<rt;Gt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(bt,0,n.RGBA,1,1,ft,0,n.RGBA,n.UNSIGNED_BYTE,St):n.texImage2D(bt+Gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,St);return wt}const Tt={};Tt[n.TEXTURE_2D]=_t(n.TEXTURE_2D,n.TEXTURE_2D,1),Tt[n.TEXTURE_CUBE_MAP]=_t(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[n.TEXTURE_2D_ARRAY]=_t(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Tt[n.TEXTURE_3D]=_t(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),O(n.DEPTH_TEST),o.setFunc(Qs),Q(!1),Z(Ff),O(n.CULL_FACE),M(li);function O(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function ut(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function lt(z,bt){return f[z]!==bt?(n.bindFramebuffer(z,bt),f[z]=bt,z===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=bt),z===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=bt),!0):!1}function gt(z,bt){let rt=p,ft=!1;if(z){rt=h.get(bt),rt===void 0&&(rt=[],h.set(bt,rt));const St=z.textures;if(rt.length!==St.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Gt=St.length;wt<Gt;wt++)rt[wt]=n.COLOR_ATTACHMENT0+wt;rt.length=St.length,ft=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,ft=!0);ft&&n.drawBuffers(rt)}function ht(z){return g!==z?(n.useProgram(z),g=z,!0):!1}const S={[Zi]:n.FUNC_ADD,[q0]:n.FUNC_SUBTRACT,[Y0]:n.FUNC_REVERSE_SUBTRACT};S[$0]=n.MIN,S[K0]=n.MAX;const C={[Z0]:n.ZERO,[J0]:n.ONE,[Q0]:n.SRC_COLOR,[Zl]:n.SRC_ALPHA,[rx]:n.SRC_ALPHA_SATURATE,[ix]:n.DST_COLOR,[ex]:n.DST_ALPHA,[tx]:n.ONE_MINUS_SRC_COLOR,[Jl]:n.ONE_MINUS_SRC_ALPHA,[sx]:n.ONE_MINUS_DST_COLOR,[nx]:n.ONE_MINUS_DST_ALPHA,[ox]:n.CONSTANT_COLOR,[ax]:n.ONE_MINUS_CONSTANT_COLOR,[lx]:n.CONSTANT_ALPHA,[cx]:n.ONE_MINUS_CONSTANT_ALPHA};function M(z,bt,rt,ft,St,wt,Gt,ve,De,ie){if(z===li){_===!0&&(ut(n.BLEND),_=!1);return}if(_===!1&&(O(n.BLEND),_=!0),z!==j0){if(z!==m||ie!==w){if((d!==Zi||y!==Zi)&&(n.blendEquation(n.FUNC_ADD),d=Zi,y=Zi),ie)switch(z){case Ws:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xs:n.blendFunc(n.ONE,n.ONE);break;case Bf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ws:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xs:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Bf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}E=null,T=null,I=null,L=null,P.set(0,0,0),N=0,m=z,w=ie}return}St=St||bt,wt=wt||rt,Gt=Gt||ft,(bt!==d||St!==y)&&(n.blendEquationSeparate(S[bt],S[St]),d=bt,y=St),(rt!==E||ft!==T||wt!==I||Gt!==L)&&(n.blendFuncSeparate(C[rt],C[ft],C[wt],C[Gt]),E=rt,T=ft,I=wt,L=Gt),(ve.equals(P)===!1||De!==N)&&(n.blendColor(ve.r,ve.g,ve.b,De),P.copy(ve),N=De),m=z,w=!1}function J(z,bt){z.side===An?ut(n.CULL_FACE):O(n.CULL_FACE);let rt=z.side===an;bt&&(rt=!rt),Q(rt),z.blending===Ws&&z.transparent===!1?M(li):M(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const ft=z.stencilWrite;a.setTest(ft),ft&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),W(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?O(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Q(z){b!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),b=z)}function Z(z){z!==G0?(O(n.CULL_FACE),z!==D&&(z===Ff?n.cullFace(n.BACK):z===W0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),D=z}function ot(z){z!==F&&(tt&&n.lineWidth(z),F=z)}function W(z,bt,rt){z?(O(n.POLYGON_OFFSET_FILL),(H!==bt||V!==rt)&&(n.polygonOffset(bt,rt),H=bt,V=rt)):ut(n.POLYGON_OFFSET_FILL)}function B(z){z?O(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function x(z){z===void 0&&(z=n.TEXTURE0+$-1),mt!==z&&(n.activeTexture(z),mt=z)}function v(z,bt,rt){rt===void 0&&(mt===null?rt=n.TEXTURE0+$-1:rt=mt);let ft=Mt[rt];ft===void 0&&(ft={type:void 0,texture:void 0},Mt[rt]=ft),(ft.type!==z||ft.texture!==bt)&&(mt!==rt&&(n.activeTexture(rt),mt=rt),n.bindTexture(z,bt||Tt[z]),ft.type=z,ft.texture=bt)}function R(){const z=Mt[mt];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function U(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function k(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function G(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function vt(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ct(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Pt(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function st(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pt(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ht(z){Jt.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Jt.copy(z))}function yt(z){at.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),at.copy(z))}function kt(z,bt){let rt=c.get(bt);rt===void 0&&(rt=new WeakMap,c.set(bt,rt));let ft=rt.get(z);ft===void 0&&(ft=n.getUniformBlockIndex(bt,z.name),rt.set(z,ft))}function Vt(z,bt){const ft=c.get(bt).get(z);l.get(bt)!==ft&&(n.uniformBlockBinding(bt,ft,z.__bindingPointIndex),l.set(bt,ft))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},mt=null,Mt={},f={},h=new WeakMap,p=[],g=null,_=!1,m=null,d=null,E=null,T=null,y=null,I=null,L=null,P=new qt(0,0,0),N=0,w=!1,b=null,D=null,F=null,H=null,V=null,Jt.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:O,disable:ut,bindFramebuffer:lt,drawBuffers:gt,useProgram:ht,setBlending:M,setMaterial:J,setFlipSided:Q,setCullFace:Z,setLineWidth:ot,setPolygonOffset:W,setScissorTest:B,activeTexture:x,bindTexture:v,unbindTexture:R,compressedTexImage2D:U,compressedTexImage3D:k,texImage2D:pt,texImage3D:Et,updateUBOMapping:kt,uniformBlockBinding:Vt,texStorage2D:Pt,texStorage3D:st,texSubImage2D:G,texSubImage3D:vt,compressedTexSubImage2D:ct,compressedTexSubImage3D:dt,scissor:Ht,viewport:yt,reset:te}}function Ih(n,t,e,i){const s=Tb(i);switch(e){case $p:return n*t;case Zp:return n*t;case Jp:return n*t*2;case Qp:return n*t/s.components*s.byteLength;case _u:return n*t/s.components*s.byteLength;case tm:return n*t*2/s.components*s.byteLength;case vu:return n*t*2/s.components*s.byteLength;case Kp:return n*t*3/s.components*s.byteLength;case vn:return n*t*4/s.components*s.byteLength;case xu:return n*t*4/s.components*s.byteLength;case jo:case qo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Yo:case $o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case uc:case hc:return Math.max(n,16)*Math.max(t,8)/4;case cc:case fc:return Math.max(n,8)*Math.max(t,8)/2;case dc:case pc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case _c:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case vc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case xc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case yc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Mc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Sc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ec:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case bc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ac:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case wc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Rc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Cc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Ko:case Pc:case Dc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case em:case Lc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Ic:case Uc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Tb(n){switch(n){case Gn:case jp:return{byteLength:1,components:1};case qr:case qp:case ci:return{byteLength:2,components:1};case mu:case gu:return{byteLength:2,components:4};case os:case pu:case oi:return{byteLength:4,components:1};case Yp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Ab(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,v){return p?new OffscreenCanvas(x,v):ua("canvas")}function _(x,v,R){let U=1;const k=B(x);if((k.width>R||k.height>R)&&(U=R/Math.max(k.width,k.height)),U<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const G=Math.floor(U*k.width),vt=Math.floor(U*k.height);f===void 0&&(f=g(G,vt));const ct=v?g(G,vt):f;return ct.width=G,ct.height=vt,ct.getContext("2d").drawImage(x,0,0,G,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+k.width+"x"+k.height+") to ("+G+"x"+vt+")."),ct}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+k.width+"x"+k.height+")."),x;return x}function m(x){return x.generateMipmaps}function d(x){n.generateMipmap(x)}function E(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(x,v,R,U,k=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let G=v;if(v===n.RED&&(R===n.FLOAT&&(G=n.R32F),R===n.HALF_FLOAT&&(G=n.R16F),R===n.UNSIGNED_BYTE&&(G=n.R8)),v===n.RED_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.R8UI),R===n.UNSIGNED_SHORT&&(G=n.R16UI),R===n.UNSIGNED_INT&&(G=n.R32UI),R===n.BYTE&&(G=n.R8I),R===n.SHORT&&(G=n.R16I),R===n.INT&&(G=n.R32I)),v===n.RG&&(R===n.FLOAT&&(G=n.RG32F),R===n.HALF_FLOAT&&(G=n.RG16F),R===n.UNSIGNED_BYTE&&(G=n.RG8)),v===n.RG_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.RG8UI),R===n.UNSIGNED_SHORT&&(G=n.RG16UI),R===n.UNSIGNED_INT&&(G=n.RG32UI),R===n.BYTE&&(G=n.RG8I),R===n.SHORT&&(G=n.RG16I),R===n.INT&&(G=n.RG32I)),v===n.RGB_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.RGB8UI),R===n.UNSIGNED_SHORT&&(G=n.RGB16UI),R===n.UNSIGNED_INT&&(G=n.RGB32UI),R===n.BYTE&&(G=n.RGB8I),R===n.SHORT&&(G=n.RGB16I),R===n.INT&&(G=n.RGB32I)),v===n.RGBA_INTEGER&&(R===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),R===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),R===n.UNSIGNED_INT&&(G=n.RGBA32UI),R===n.BYTE&&(G=n.RGBA8I),R===n.SHORT&&(G=n.RGBA16I),R===n.INT&&(G=n.RGBA32I)),v===n.RGB&&R===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),v===n.RGBA){const vt=k?La:ee.getTransfer(U);R===n.FLOAT&&(G=n.RGBA32F),R===n.HALF_FLOAT&&(G=n.RGBA16F),R===n.UNSIGNED_BYTE&&(G=vt===ce?n.SRGB8_ALPHA8:n.RGBA8),R===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),R===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function y(x,v){let R;return x?v===null||v===os||v===nr?R=n.DEPTH24_STENCIL8:v===oi?R=n.DEPTH32F_STENCIL8:v===qr&&(R=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===os||v===nr?R=n.DEPTH_COMPONENT24:v===oi?R=n.DEPTH_COMPONENT32F:v===qr&&(R=n.DEPTH_COMPONENT16),R}function I(x,v){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==dn&&x.minFilter!==Rn?Math.log2(Math.max(v.width,v.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?v.mipmaps.length:1}function L(x){const v=x.target;v.removeEventListener("dispose",L),N(v),v.isVideoTexture&&u.delete(v)}function P(x){const v=x.target;v.removeEventListener("dispose",P),b(v)}function N(x){const v=i.get(x);if(v.__webglInit===void 0)return;const R=x.source,U=h.get(R);if(U){const k=U[v.__cacheKey];k.usedTimes--,k.usedTimes===0&&w(x),Object.keys(U).length===0&&h.delete(R)}i.remove(x)}function w(x){const v=i.get(x);n.deleteTexture(v.__webglTexture);const R=x.source,U=h.get(R);delete U[v.__cacheKey],o.memory.textures--}function b(x){const v=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(v.__webglFramebuffer[U]))for(let k=0;k<v.__webglFramebuffer[U].length;k++)n.deleteFramebuffer(v.__webglFramebuffer[U][k]);else n.deleteFramebuffer(v.__webglFramebuffer[U]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[U])}else{if(Array.isArray(v.__webglFramebuffer))for(let U=0;U<v.__webglFramebuffer.length;U++)n.deleteFramebuffer(v.__webglFramebuffer[U]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let U=0;U<v.__webglColorRenderbuffer.length;U++)v.__webglColorRenderbuffer[U]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[U]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const R=x.textures;for(let U=0,k=R.length;U<k;U++){const G=i.get(R[U]);G.__webglTexture&&(n.deleteTexture(G.__webglTexture),o.memory.textures--),i.remove(R[U])}i.remove(x)}let D=0;function F(){D=0}function H(){const x=D;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),D+=1,x}function V(x){const v=[];return v.push(x.wrapS),v.push(x.wrapT),v.push(x.wrapR||0),v.push(x.magFilter),v.push(x.minFilter),v.push(x.anisotropy),v.push(x.internalFormat),v.push(x.format),v.push(x.type),v.push(x.generateMipmaps),v.push(x.premultiplyAlpha),v.push(x.flipY),v.push(x.unpackAlignment),v.push(x.colorSpace),v.join()}function $(x,v){const R=i.get(x);if(x.isVideoTexture&&ot(x),x.isRenderTargetTexture===!1&&x.version>0&&R.__version!==x.version){const U=x.image;if(U===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(R,x,v);return}}e.bindTexture(n.TEXTURE_2D,R.__webglTexture,n.TEXTURE0+v)}function tt(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){at(R,x,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,R.__webglTexture,n.TEXTURE0+v)}function it(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){at(R,x,v);return}e.bindTexture(n.TEXTURE_3D,R.__webglTexture,n.TEXTURE0+v)}function K(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){_t(R,x,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+v)}const mt={[jr]:n.REPEAT,[ts]:n.CLAMP_TO_EDGE,[lc]:n.MIRRORED_REPEAT},Mt={[dn]:n.NEAREST,[dx]:n.NEAREST_MIPMAP_NEAREST,[po]:n.NEAREST_MIPMAP_LINEAR,[Rn]:n.LINEAR,[Za]:n.LINEAR_MIPMAP_NEAREST,[Pi]:n.LINEAR_MIPMAP_LINEAR},Ct={[_x]:n.NEVER,[Ex]:n.ALWAYS,[vx]:n.LESS,[im]:n.LEQUAL,[xx]:n.EQUAL,[Sx]:n.GEQUAL,[yx]:n.GREATER,[Mx]:n.NOTEQUAL};function Ft(x,v){if(v.type===oi&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Rn||v.magFilter===Za||v.magFilter===po||v.magFilter===Pi||v.minFilter===Rn||v.minFilter===Za||v.minFilter===po||v.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,mt[v.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,mt[v.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,mt[v.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,Mt[v.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,Mt[v.minFilter]),v.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,Ct[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===dn||v.minFilter!==po&&v.minFilter!==Pi||v.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const R=t.get("EXT_texture_filter_anisotropic");n.texParameterf(x,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Jt(x,v){let R=!1;x.__webglInit===void 0&&(x.__webglInit=!0,v.addEventListener("dispose",L));const U=v.source;let k=h.get(U);k===void 0&&(k={},h.set(U,k));const G=V(v);if(G!==x.__cacheKey){k[G]===void 0&&(k[G]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,R=!0),k[G].usedTimes++;const vt=k[x.__cacheKey];vt!==void 0&&(k[x.__cacheKey].usedTimes--,vt.usedTimes===0&&w(v)),x.__cacheKey=G,x.__webglTexture=k[G].texture}return R}function at(x,v,R){let U=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(U=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(U=n.TEXTURE_3D);const k=Jt(x,v),G=v.source;e.bindTexture(U,x.__webglTexture,n.TEXTURE0+R);const vt=i.get(G);if(G.version!==vt.__version||k===!0){e.activeTexture(n.TEXTURE0+R);const ct=ee.getPrimaries(ee.workingColorSpace),dt=v.colorSpace===Ci?null:ee.getPrimaries(v.colorSpace),Pt=v.colorSpace===Ci||ct===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let st=_(v.image,!1,s.maxTextureSize);st=W(v,st);const pt=r.convert(v.format,v.colorSpace),Et=r.convert(v.type);let Ht=T(v.internalFormat,pt,Et,v.colorSpace,v.isVideoTexture);Ft(U,v);let yt;const kt=v.mipmaps,Vt=v.isVideoTexture!==!0,te=vt.__version===void 0||k===!0,z=G.dataReady,bt=I(v,st);if(v.isDepthTexture)Ht=y(v.format===ir,v.type),te&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,Ht,st.width,st.height):e.texImage2D(n.TEXTURE_2D,0,Ht,st.width,st.height,0,pt,Et,null));else if(v.isDataTexture)if(kt.length>0){Vt&&te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,kt[0].width,kt[0].height);for(let rt=0,ft=kt.length;rt<ft;rt++)yt=kt[rt],Vt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,pt,Et,yt.data):e.texImage2D(n.TEXTURE_2D,rt,Ht,yt.width,yt.height,0,pt,Et,yt.data);v.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,st.width,st.height),z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,st.width,st.height,pt,Et,st.data)):e.texImage2D(n.TEXTURE_2D,0,Ht,st.width,st.height,0,pt,Et,st.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Vt&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Ht,kt[0].width,kt[0].height,st.depth);for(let rt=0,ft=kt.length;rt<ft;rt++)if(yt=kt[rt],v.format!==vn)if(pt!==null)if(Vt){if(z)if(v.layerUpdates.size>0){const St=Ih(yt.width,yt.height,v.format,v.type);for(const wt of v.layerUpdates){const Gt=yt.data.subarray(wt*St/yt.data.BYTES_PER_ELEMENT,(wt+1)*St/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,wt,yt.width,yt.height,1,pt,Gt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,yt.width,yt.height,st.depth,pt,yt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Ht,yt.width,yt.height,st.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?z&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,yt.width,yt.height,st.depth,pt,Et,yt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Ht,yt.width,yt.height,st.depth,0,pt,Et,yt.data)}else{Vt&&te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,kt[0].width,kt[0].height);for(let rt=0,ft=kt.length;rt<ft;rt++)yt=kt[rt],v.format!==vn?pt!==null?Vt?z&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,pt,yt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Ht,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,yt.width,yt.height,pt,Et,yt.data):e.texImage2D(n.TEXTURE_2D,rt,Ht,yt.width,yt.height,0,pt,Et,yt.data)}else if(v.isDataArrayTexture)if(Vt){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Ht,st.width,st.height,st.depth),z)if(v.layerUpdates.size>0){const rt=Ih(st.width,st.height,v.format,v.type);for(const ft of v.layerUpdates){const St=st.data.subarray(ft*rt/st.data.BYTES_PER_ELEMENT,(ft+1)*rt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ft,st.width,st.height,1,pt,Et,St)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,pt,Et,st.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ht,st.width,st.height,st.depth,0,pt,Et,st.data);else if(v.isData3DTexture)Vt?(te&&e.texStorage3D(n.TEXTURE_3D,bt,Ht,st.width,st.height,st.depth),z&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,pt,Et,st.data)):e.texImage3D(n.TEXTURE_3D,0,Ht,st.width,st.height,st.depth,0,pt,Et,st.data);else if(v.isFramebufferTexture){if(te)if(Vt)e.texStorage2D(n.TEXTURE_2D,bt,Ht,st.width,st.height);else{let rt=st.width,ft=st.height;for(let St=0;St<bt;St++)e.texImage2D(n.TEXTURE_2D,St,Ht,rt,ft,0,pt,Et,null),rt>>=1,ft>>=1}}else if(kt.length>0){if(Vt&&te){const rt=B(kt[0]);e.texStorage2D(n.TEXTURE_2D,bt,Ht,rt.width,rt.height)}for(let rt=0,ft=kt.length;rt<ft;rt++)yt=kt[rt],Vt?z&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,pt,Et,yt):e.texImage2D(n.TEXTURE_2D,rt,Ht,pt,Et,yt);v.generateMipmaps=!1}else if(Vt){if(te){const rt=B(st);e.texStorage2D(n.TEXTURE_2D,bt,Ht,rt.width,rt.height)}z&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt,Et,st)}else e.texImage2D(n.TEXTURE_2D,0,Ht,pt,Et,st);m(v)&&d(U),vt.__version=G.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function _t(x,v,R){if(v.image.length!==6)return;const U=Jt(x,v),k=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+R);const G=i.get(k);if(k.version!==G.__version||U===!0){e.activeTexture(n.TEXTURE0+R);const vt=ee.getPrimaries(ee.workingColorSpace),ct=v.colorSpace===Ci?null:ee.getPrimaries(v.colorSpace),dt=v.colorSpace===Ci||vt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Pt=v.isCompressedTexture||v.image[0].isCompressedTexture,st=v.image[0]&&v.image[0].isDataTexture,pt=[];for(let ft=0;ft<6;ft++)!Pt&&!st?pt[ft]=_(v.image[ft],!0,s.maxCubemapSize):pt[ft]=st?v.image[ft].image:v.image[ft],pt[ft]=W(v,pt[ft]);const Et=pt[0],Ht=r.convert(v.format,v.colorSpace),yt=r.convert(v.type),kt=T(v.internalFormat,Ht,yt,v.colorSpace),Vt=v.isVideoTexture!==!0,te=G.__version===void 0||U===!0,z=k.dataReady;let bt=I(v,Et);Ft(n.TEXTURE_CUBE_MAP,v);let rt;if(Pt){Vt&&te&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,kt,Et.width,Et.height);for(let ft=0;ft<6;ft++){rt=pt[ft].mipmaps;for(let St=0;St<rt.length;St++){const wt=rt[St];v.format!==vn?Ht!==null?Vt?z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,Ht,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,kt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,Ht,yt,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,kt,wt.width,wt.height,0,Ht,yt,wt.data)}}}else{if(rt=v.mipmaps,Vt&&te){rt.length>0&&bt++;const ft=B(pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,kt,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(st){Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,pt[ft].width,pt[ft].height,Ht,yt,pt[ft].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,kt,pt[ft].width,pt[ft].height,0,Ht,yt,pt[ft].data);for(let St=0;St<rt.length;St++){const Gt=rt[St].image[ft].image;Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Gt.width,Gt.height,Ht,yt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,kt,Gt.width,Gt.height,0,Ht,yt,Gt.data)}}else{Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Ht,yt,pt[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,kt,Ht,yt,pt[ft]);for(let St=0;St<rt.length;St++){const wt=rt[St];Vt?z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Ht,yt,wt.image[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,kt,Ht,yt,wt.image[ft])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),G.__version=k.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function Tt(x,v,R,U,k,G){const vt=r.convert(R.format,R.colorSpace),ct=r.convert(R.type),dt=T(R.internalFormat,vt,ct,R.colorSpace),Pt=i.get(v),st=i.get(R);if(st.__renderTarget=v,!Pt.__hasExternalTextures){const pt=Math.max(1,v.width>>G),Et=Math.max(1,v.height>>G);k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?e.texImage3D(k,G,dt,pt,Et,v.depth,0,vt,ct,null):e.texImage2D(k,G,dt,pt,Et,0,vt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,x),Z(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,U,k,st.__webglTexture,0,Q(v)):(k===n.TEXTURE_2D||k>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&k<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,U,k,st.__webglTexture,G),e.bindFramebuffer(n.FRAMEBUFFER,null)}function O(x,v,R){if(n.bindRenderbuffer(n.RENDERBUFFER,x),v.depthBuffer){const U=v.depthTexture,k=U&&U.isDepthTexture?U.type:null,G=y(v.stencilBuffer,k),vt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=Q(v);Z(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,G,v.width,v.height):R?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,G,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,G,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,vt,n.RENDERBUFFER,x)}else{const U=v.textures;for(let k=0;k<U.length;k++){const G=U[k],vt=r.convert(G.format,G.colorSpace),ct=r.convert(G.type),dt=T(G.internalFormat,vt,ct,G.colorSpace),Pt=Q(v);R&&Z(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,dt,v.width,v.height):Z(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pt,dt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,dt,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(x,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,x),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const U=i.get(v.depthTexture);U.__renderTarget=v,(!U.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),$(v.depthTexture,0);const k=U.__webglTexture,G=Q(v);if(v.depthTexture.format===js)Z(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0);else if(v.depthTexture.format===ir)Z(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0,G):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function lt(x){const v=i.get(x),R=x.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==x.depthTexture){const U=x.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),U){const k=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,U.removeEventListener("dispose",k)};U.addEventListener("dispose",k),v.__depthDisposeCallback=k}v.__boundDepthTexture=U}if(x.depthTexture&&!v.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");ut(v.__webglFramebuffer,x)}else if(R){v.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[U]),v.__webglDepthbuffer[U]===void 0)v.__webglDepthbuffer[U]=n.createRenderbuffer(),O(v.__webglDepthbuffer[U],x,!1);else{const k=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,G=v.__webglDepthbuffer[U];n.bindRenderbuffer(n.RENDERBUFFER,G),n.framebufferRenderbuffer(n.FRAMEBUFFER,k,n.RENDERBUFFER,G)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),O(v.__webglDepthbuffer,x,!1);else{const U=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,k=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,k),n.framebufferRenderbuffer(n.FRAMEBUFFER,U,n.RENDERBUFFER,k)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(x,v,R){const U=i.get(x);v!==void 0&&Tt(U.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),R!==void 0&&lt(x)}function ht(x){const v=x.texture,R=i.get(x),U=i.get(v);x.addEventListener("dispose",P);const k=x.textures,G=x.isWebGLCubeRenderTarget===!0,vt=k.length>1;if(vt||(U.__webglTexture===void 0&&(U.__webglTexture=n.createTexture()),U.__version=v.version,o.memory.textures++),G){R.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0){R.__webglFramebuffer[ct]=[];for(let dt=0;dt<v.mipmaps.length;dt++)R.__webglFramebuffer[ct][dt]=n.createFramebuffer()}else R.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){R.__webglFramebuffer=[];for(let ct=0;ct<v.mipmaps.length;ct++)R.__webglFramebuffer[ct]=n.createFramebuffer()}else R.__webglFramebuffer=n.createFramebuffer();if(vt)for(let ct=0,dt=k.length;ct<dt;ct++){const Pt=i.get(k[ct]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=n.createTexture(),o.memory.textures++)}if(x.samples>0&&Z(x)===!1){R.__webglMultisampledFramebuffer=n.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let ct=0;ct<k.length;ct++){const dt=k[ct];R.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,R.__webglColorRenderbuffer[ct]);const Pt=r.convert(dt.format,dt.colorSpace),st=r.convert(dt.type),pt=T(dt.internalFormat,Pt,st,dt.colorSpace,x.isXRRenderTarget===!0),Et=Q(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,pt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,R.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(R.__webglDepthRenderbuffer=n.createRenderbuffer(),O(R.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(G){e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,v);for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)Tt(R.__webglFramebuffer[ct][dt],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,dt);else Tt(R.__webglFramebuffer[ct],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let ct=0,dt=k.length;ct<dt;ct++){const Pt=k[ct],st=i.get(Pt);e.bindTexture(n.TEXTURE_2D,st.__webglTexture),Ft(n.TEXTURE_2D,Pt),Tt(R.__webglFramebuffer,x,Pt,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),m(Pt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ct=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,U.__webglTexture),Ft(ct,v),v.mipmaps&&v.mipmaps.length>0)for(let dt=0;dt<v.mipmaps.length;dt++)Tt(R.__webglFramebuffer[dt],x,v,n.COLOR_ATTACHMENT0,ct,dt);else Tt(R.__webglFramebuffer,x,v,n.COLOR_ATTACHMENT0,ct,0);m(v)&&d(ct),e.unbindTexture()}x.depthBuffer&&lt(x)}function S(x){const v=x.textures;for(let R=0,U=v.length;R<U;R++){const k=v[R];if(m(k)){const G=E(x),vt=i.get(k).__webglTexture;e.bindTexture(G,vt),d(G),e.unbindTexture()}}}const C=[],M=[];function J(x){if(x.samples>0){if(Z(x)===!1){const v=x.textures,R=x.width,U=x.height;let k=n.COLOR_BUFFER_BIT;const G=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,vt=i.get(x),ct=v.length>1;if(ct)for(let dt=0;dt<v.length;dt++)e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let dt=0;dt<v.length;dt++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(k|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(k|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,vt.__webglColorRenderbuffer[dt]);const Pt=i.get(v[dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pt,0)}n.blitFramebuffer(0,0,R,U,0,0,R,U,k,n.NEAREST),l===!0&&(C.length=0,M.length=0,C.push(n.COLOR_ATTACHMENT0+dt),x.depthBuffer&&x.resolveDepthBuffer===!1&&(C.push(G),M.push(G),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,M)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let dt=0;dt<v.length;dt++){e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,vt.__webglColorRenderbuffer[dt]);const Pt=i.get(v[dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,vt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,Pt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const v=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Q(x){return Math.min(s.maxSamples,x.samples)}function Z(x){const v=i.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ot(x){const v=o.render.frame;u.get(x)!==v&&(u.set(x,v),x.update())}function W(x,v){const R=x.colorSpace,U=x.format,k=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||R!==lr&&R!==Ci&&(ee.getTransfer(R)===ce?(U!==vn||k!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),v}function B(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=F,this.setTexture2D=$,this.setTexture2DArray=tt,this.setTexture3D=it,this.setTextureCube=K,this.rebindTextures=gt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=S,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=Z}function wb(n,t){function e(i,s=Ci){let r;const o=ee.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===mu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===gu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===jp)return n.BYTE;if(i===qp)return n.SHORT;if(i===qr)return n.UNSIGNED_SHORT;if(i===pu)return n.INT;if(i===os)return n.UNSIGNED_INT;if(i===oi)return n.FLOAT;if(i===ci)return n.HALF_FLOAT;if(i===$p)return n.ALPHA;if(i===Kp)return n.RGB;if(i===vn)return n.RGBA;if(i===Zp)return n.LUMINANCE;if(i===Jp)return n.LUMINANCE_ALPHA;if(i===js)return n.DEPTH_COMPONENT;if(i===ir)return n.DEPTH_STENCIL;if(i===Qp)return n.RED;if(i===_u)return n.RED_INTEGER;if(i===tm)return n.RG;if(i===vu)return n.RG_INTEGER;if(i===xu)return n.RGBA_INTEGER;if(i===jo||i===qo||i===Yo||i===$o)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===jo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Yo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===$o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===jo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===qo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Yo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===$o)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===cc||i===uc||i===fc||i===hc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===cc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===uc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===hc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===dc||i===pc||i===mc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===dc||i===pc)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===mc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===gc||i===_c||i===vc||i===xc||i===yc||i===Mc||i===Sc||i===Ec||i===bc||i===Tc||i===Ac||i===wc||i===Rc||i===Cc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===gc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===_c)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===vc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===yc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Mc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Sc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ec)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===bc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Tc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ac)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===wc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Rc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ko||i===Pc||i===Dc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ko)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===em||i===Lc||i===Ic||i===Uc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ko)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Lc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ic)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===nr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Rb extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Os extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cb={type:"move"};class Tl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Os;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Pb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Db=`
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

}`;class Lb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ke({vertexShader:Pb,fragmentShader:Db,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new we(new Ia(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ib extends us{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,g=null;const _=new Lb,m=e.getContextAttributes();let d=null,E=null;const T=[],y=[],I=new zt;let L=null;const P=new _n;P.viewport=new Me;const N=new _n;N.viewport=new Me;const w=[P,N],b=new Rb;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let _t=T[at];return _t===void 0&&(_t=new Tl,T[at]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(at){let _t=T[at];return _t===void 0&&(_t=new Tl,T[at]=_t),_t.getGripSpace()},this.getHand=function(at){let _t=T[at];return _t===void 0&&(_t=new Tl,T[at]=_t),_t.getHandSpace()};function H(at){const _t=y.indexOf(at.inputSource);if(_t===-1)return;const Tt=T[_t];Tt!==void 0&&(Tt.update(at.inputSource,at.frame,c||o),Tt.dispatchEvent({type:at.type,data:at.inputSource}))}function V(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",$);for(let at=0;at<T.length;at++){const _t=y[at];_t!==null&&(y[at]=null,T[at].disconnect(_t))}D=null,F=null,_.reset(),t.setRenderTarget(d),p=null,h=null,f=null,s=null,E=null,Jt.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){r=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){a=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(at){c=at},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(at){if(s=at,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",V),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const _t={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Pn(p.framebufferWidth,p.framebufferHeight,{format:vn,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let _t=null,Tt=null,O=null;m.depth&&(O=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=m.stencil?ir:js,Tt=m.stencil?nr:os);const ut={colorFormat:e.RGBA8,depthFormat:O,scaleFactor:r};f=new XRWebGLBinding(s,e),h=f.createProjectionLayer(ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),E=new Pn(h.textureWidth,h.textureHeight,{format:vn,type:Gn,depthTexture:new pm(h.textureWidth,h.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Jt.setContext(s),Jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(at){for(let _t=0;_t<at.removed.length;_t++){const Tt=at.removed[_t],O=y.indexOf(Tt);O>=0&&(y[O]=null,T[O].disconnect(Tt))}for(let _t=0;_t<at.added.length;_t++){const Tt=at.added[_t];let O=y.indexOf(Tt);if(O===-1){for(let lt=0;lt<T.length;lt++)if(lt>=y.length){y.push(Tt),O=lt;break}else if(y[lt]===null){y[lt]=Tt,O=lt;break}if(O===-1)break}const ut=T[O];ut&&ut.connect(Tt)}}const tt=new j,it=new j;function K(at,_t,Tt){tt.setFromMatrixPosition(_t.matrixWorld),it.setFromMatrixPosition(Tt.matrixWorld);const O=tt.distanceTo(it),ut=_t.projectionMatrix.elements,lt=Tt.projectionMatrix.elements,gt=ut[14]/(ut[10]-1),ht=ut[14]/(ut[10]+1),S=(ut[9]+1)/ut[5],C=(ut[9]-1)/ut[5],M=(ut[8]-1)/ut[0],J=(lt[8]+1)/lt[0],Q=gt*M,Z=gt*J,ot=O/(-M+J),W=ot*-M;if(_t.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(W),at.translateZ(ot),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),ut[10]===-1)at.projectionMatrix.copy(_t.projectionMatrix),at.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const B=gt+ot,x=ht+ot,v=Q-W,R=Z+(O-W),U=S*ht/x*B,k=C*ht/x*B;at.projectionMatrix.makePerspective(v,R,U,k,B,x),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function mt(at,_t){_t===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(_t.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(s===null)return;let _t=at.near,Tt=at.far;_.texture!==null&&(_.depthNear>0&&(_t=_.depthNear),_.depthFar>0&&(Tt=_.depthFar)),b.near=N.near=P.near=_t,b.far=N.far=P.far=Tt,(D!==b.near||F!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,F=b.far),P.layers.mask=at.layers.mask|2,N.layers.mask=at.layers.mask|4,b.layers.mask=P.layers.mask|N.layers.mask;const O=at.parent,ut=b.cameras;mt(b,O);for(let lt=0;lt<ut.length;lt++)mt(ut[lt],O);ut.length===2?K(b,P,N):b.projectionMatrix.copy(P.projectionMatrix),Mt(at,b,O)};function Mt(at,_t,Tt){Tt===null?at.matrix.copy(_t.matrixWorld):(at.matrix.copy(Tt.matrixWorld),at.matrix.invert(),at.matrix.multiply(_t.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(_t.projectionMatrix),at.projectionMatrixInverse.copy(_t.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=Nc*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(at){l=at,h!==null&&(h.fixedFoveation=at),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=at)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(b)};let Ct=null;function Ft(at,_t){if(u=_t.getViewerPose(c||o),g=_t,u!==null){const Tt=u.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let O=!1;Tt.length!==b.cameras.length&&(b.cameras.length=0,O=!0);for(let lt=0;lt<Tt.length;lt++){const gt=Tt[lt];let ht=null;if(p!==null)ht=p.getViewport(gt);else{const C=f.getViewSubImage(h,gt);ht=C.viewport,lt===0&&(t.setRenderTargetTextures(E,C.colorTexture,h.ignoreDepthValues?void 0:C.depthStencilTexture),t.setRenderTarget(E))}let S=w[lt];S===void 0&&(S=new _n,S.layers.enable(lt),S.viewport=new Me,w[lt]=S),S.matrix.fromArray(gt.transform.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale),S.projectionMatrix.fromArray(gt.projectionMatrix),S.projectionMatrixInverse.copy(S.projectionMatrix).invert(),S.viewport.set(ht.x,ht.y,ht.width,ht.height),lt===0&&(b.matrix.copy(S.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),O===!0&&b.cameras.push(S)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const lt=f.getDepthInformation(Tt[0]);lt&&lt.isValid&&lt.texture&&_.init(t,lt,s.renderState)}}for(let Tt=0;Tt<T.length;Tt++){const O=y[Tt],ut=T[Tt];O!==null&&ut!==void 0&&ut.update(O,_t,c||o)}Ct&&Ct(at,_t),_t.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_t}),g=null}const Jt=new dm;Jt.setAnimationLoop(Ft),this.setAnimationLoop=function(at){Ct=at},this.dispose=function(){}}}const qi=new Wn,Ub=new de;function Nb(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,um(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,E,T,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,E,T):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===an&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===an&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const E=t.get(d),T=E.envMap,y=E.envMapRotation;T&&(m.envMap.value=T,qi.copy(y),qi.x*=-1,qi.y*=-1,qi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ub.makeRotationFromEuler(qi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,E,T){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*E,m.scale.value=T*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,E){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===an&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const E=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Ob(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,T){const y=T.program;i.uniformBlockBinding(E,y)}function c(E,T){let y=s[E.id];y===void 0&&(g(E),y=u(E),s[E.id]=y,E.addEventListener("dispose",m));const I=T.program;i.updateUBOMapping(E,I);const L=t.render.frame;r[E.id]!==L&&(h(E),r[E.id]=L)}function u(E){const T=f();E.__bindingPointIndex=T;const y=n.createBuffer(),I=E.__size,L=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,I,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,y),y}function f(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(E){const T=s[E.id],y=E.uniforms,I=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let L=0,P=y.length;L<P;L++){const N=Array.isArray(y[L])?y[L]:[y[L]];for(let w=0,b=N.length;w<b;w++){const D=N[w];if(p(D,L,w,I)===!0){const F=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let V=0;for(let $=0;$<H.length;$++){const tt=H[$],it=_(tt);typeof tt=="number"||typeof tt=="boolean"?(D.__data[0]=tt,n.bufferSubData(n.UNIFORM_BUFFER,F+V,D.__data)):tt.isMatrix3?(D.__data[0]=tt.elements[0],D.__data[1]=tt.elements[1],D.__data[2]=tt.elements[2],D.__data[3]=0,D.__data[4]=tt.elements[3],D.__data[5]=tt.elements[4],D.__data[6]=tt.elements[5],D.__data[7]=0,D.__data[8]=tt.elements[6],D.__data[9]=tt.elements[7],D.__data[10]=tt.elements[8],D.__data[11]=0):(tt.toArray(D.__data,V),V+=it.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,T,y,I){const L=E.value,P=T+"_"+y;if(I[P]===void 0)return typeof L=="number"||typeof L=="boolean"?I[P]=L:I[P]=L.clone(),!0;{const N=I[P];if(typeof L=="number"||typeof L=="boolean"){if(N!==L)return I[P]=L,!0}else if(N.equals(L)===!1)return N.copy(L),!0}return!1}function g(E){const T=E.uniforms;let y=0;const I=16;for(let P=0,N=T.length;P<N;P++){const w=Array.isArray(T[P])?T[P]:[T[P]];for(let b=0,D=w.length;b<D;b++){const F=w[b],H=Array.isArray(F.value)?F.value:[F.value];for(let V=0,$=H.length;V<$;V++){const tt=H[V],it=_(tt),K=y%I,mt=K%it.boundary,Mt=K+mt;y+=mt,Mt!==0&&I-Mt<it.storage&&(y+=I-Mt),F.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=it.storage}}}const L=y%I;return L>0&&(y+=I-L),E.__size=y,E.__cache={},this}function _(E){const T={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(T.boundary=4,T.storage=4):E.isVector2?(T.boundary=8,T.storage=8):E.isVector3||E.isColor?(T.boundary=16,T.storage=12):E.isVector4?(T.boundary=16,T.storage=16):E.isMatrix3?(T.boundary=48,T.storage=48):E.isMatrix4?(T.boundary=64,T.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),T}function m(E){const T=E.target;T.removeEventListener("dispose",m);const y=o.indexOf(T.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function d(){for(const E in s)n.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class Fb{constructor(t={}){const{canvas:e=Ax(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const E=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rn,this.toneMapping=Ii,this.toneMappingExposure=1;const y=this;let I=!1,L=0,P=0,N=null,w=-1,b=null;const D=new Me,F=new Me;let H=null;const V=new qt(0);let $=0,tt=e.width,it=e.height,K=1,mt=null,Mt=null;const Ct=new Me(0,0,tt,it),Ft=new Me(0,0,tt,it);let Jt=!1;const at=new Mu;let _t=!1,Tt=!1;const O=new de,ut=new de,lt=new j,gt=new Me,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let S=!1;function C(){return N===null?K:1}let M=i;function J(A,X){return e.getContext(A,X)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hu}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",wt,!1),M===null){const X="webgl2";if(M=J(X,A),M===null)throw J(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Q,Z,ot,W,B,x,v,R,U,k,G,vt,ct,dt,Pt,st,pt,Et,Ht,yt,kt,Vt,te,z;function bt(){Q=new VS(M),Q.init(),Vt=new wb(M,Q),Z=new OS(M,Q,t,Vt),ot=new bb(M,Q),Z.reverseDepthBuffer&&h&&ot.buffers.depth.setReversed(!0),W=new XS(M),B=new cb,x=new Ab(M,Q,ot,B,Z,Vt,W),v=new BS(y),R=new HS(y),U=new Jx(M),te=new US(M,U),k=new GS(M,U,W,te),G=new qS(M,k,U,W),Ht=new jS(M,Z,x),st=new FS(B),vt=new lb(y,v,R,Q,Z,te,st),ct=new Nb(y,B),dt=new fb,Pt=new _b(Q),Et=new IS(y,v,R,ot,G,p,l),pt=new Sb(y,G,Z),z=new Ob(M,W,Z,ot),yt=new NS(M,Q,W),kt=new WS(M,Q,W),W.programs=vt.programs,y.capabilities=Z,y.extensions=Q,y.properties=B,y.renderLists=dt,y.shadowMap=pt,y.state=ot,y.info=W}bt();const rt=new Ib(y,M);this.xr=rt,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){const A=Q.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Q.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(tt,it,!1))},this.getSize=function(A){return A.set(tt,it)},this.setSize=function(A,X,et=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}tt=A,it=X,e.width=Math.floor(A*K),e.height=Math.floor(X*K),et===!0&&(e.style.width=A+"px",e.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(tt*K,it*K).floor()},this.setDrawingBufferSize=function(A,X,et){tt=A,it=X,K=et,e.width=Math.floor(A*et),e.height=Math.floor(X*et),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(Ct)},this.setViewport=function(A,X,et,nt){A.isVector4?Ct.set(A.x,A.y,A.z,A.w):Ct.set(A,X,et,nt),ot.viewport(D.copy(Ct).multiplyScalar(K).round())},this.getScissor=function(A){return A.copy(Ft)},this.setScissor=function(A,X,et,nt){A.isVector4?Ft.set(A.x,A.y,A.z,A.w):Ft.set(A,X,et,nt),ot.scissor(F.copy(Ft).multiplyScalar(K).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(A){ot.setScissorTest(Jt=A)},this.setOpaqueSort=function(A){mt=A},this.setTransparentSort=function(A){Mt=A},this.getClearColor=function(A){return A.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(A=!0,X=!0,et=!0){let nt=0;if(A){let q=!1;if(N!==null){const xt=N.texture.format;q=xt===xu||xt===vu||xt===_u}if(q){const xt=N.texture.type,Rt=xt===Gn||xt===os||xt===qr||xt===nr||xt===mu||xt===gu,It=Et.getClearColor(),Ut=Et.getClearAlpha(),jt=It.r,$t=It.g,Nt=It.b;Rt?(g[0]=jt,g[1]=$t,g[2]=Nt,g[3]=Ut,M.clearBufferuiv(M.COLOR,0,g)):(_[0]=jt,_[1]=$t,_[2]=Nt,_[3]=Ut,M.clearBufferiv(M.COLOR,0,_))}else nt|=M.COLOR_BUFFER_BIT}X&&(nt|=M.DEPTH_BUFFER_BIT),et&&(nt|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),M.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),dt.dispose(),Pt.dispose(),B.dispose(),v.dispose(),R.dispose(),G.dispose(),te.dispose(),z.dispose(),vt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",so),rt.removeEventListener("sessionend",ro),Xn.stop()};function ft(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const A=W.autoReset,X=pt.enabled,et=pt.autoUpdate,nt=pt.needsUpdate,q=pt.type;bt(),W.autoReset=A,pt.enabled=X,pt.autoUpdate=et,pt.needsUpdate=nt,pt.type=q}function wt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Gt(A){const X=A.target;X.removeEventListener("dispose",Gt),ve(X)}function ve(A){De(A),B.remove(A)}function De(A){const X=B.get(A).programs;X!==void 0&&(X.forEach(function(et){vt.releaseProgram(et)}),A.isShaderMaterial&&vt.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,et,nt,q,xt){X===null&&(X=ht);const Rt=q.isMesh&&q.matrixWorld.determinant()<0,It=wm(A,X,et,nt,q);ot.setMaterial(nt,Rt);let Ut=et.index,jt=1;if(nt.wireframe===!0){if(Ut=k.getWireframeAttribute(et),Ut===void 0)return;jt=2}const $t=et.drawRange,Nt=et.attributes.position;let ne=$t.start*jt,pe=($t.start+$t.count)*jt;xt!==null&&(ne=Math.max(ne,xt.start*jt),pe=Math.min(pe,(xt.start+xt.count)*jt)),Ut!==null?(ne=Math.max(ne,0),pe=Math.min(pe,Ut.count)):Nt!=null&&(ne=Math.max(ne,0),pe=Math.min(pe,Nt.count));const ge=pe-ne;if(ge<0||ge===1/0)return;te.setup(q,nt,It,et,Ut);let en,se=yt;if(Ut!==null&&(en=U.get(Ut),se=kt,se.setIndex(en)),q.isMesh)nt.wireframe===!0?(ot.setLineWidth(nt.wireframeLinewidth*C()),se.setMode(M.LINES)):se.setMode(M.TRIANGLES);else if(q.isLine){let Bt=nt.linewidth;Bt===void 0&&(Bt=1),ot.setLineWidth(Bt*C()),q.isLineSegments?se.setMode(M.LINES):q.isLineLoop?se.setMode(M.LINE_LOOP):se.setMode(M.LINE_STRIP)}else q.isPoints?se.setMode(M.POINTS):q.isSprite&&se.setMode(M.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)se.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))se.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const Bt=q._multiDrawStarts,qn=q._multiDrawCounts,re=q._multiDrawCount,Sn=Ut?U.get(Ut).bytesPerElement:1,ds=B.get(nt).currentProgram.getUniforms();for(let ln=0;ln<re;ln++)ds.setValue(M,"_gl_DrawID",ln),se.render(Bt[ln]/Sn,qn[ln])}else if(q.isInstancedMesh)se.renderInstances(ne,ge,q.count);else if(et.isInstancedBufferGeometry){const Bt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,qn=Math.min(et.instanceCount,Bt);se.renderInstances(ne,ge,qn)}else se.render(ne,ge)};function ie(A,X,et){A.transparent===!0&&A.side===An&&A.forceSinglePass===!1?(A.side=an,A.needsUpdate=!0,lo(A,X,et),A.side=Fi,A.needsUpdate=!0,lo(A,X,et),A.side=An):lo(A,X,et)}this.compile=function(A,X,et=null){et===null&&(et=A),d=Pt.get(et),d.init(X),T.push(d),et.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(d.pushLight(q),q.castShadow&&d.pushShadow(q))}),A!==et&&A.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(d.pushLight(q),q.castShadow&&d.pushShadow(q))}),d.setupLights();const nt=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const xt=q.material;if(xt)if(Array.isArray(xt))for(let Rt=0;Rt<xt.length;Rt++){const It=xt[Rt];ie(It,et,q),nt.add(It)}else ie(xt,et,q),nt.add(xt)}),T.pop(),d=null,nt},this.compileAsync=function(A,X,et=null){const nt=this.compile(A,X,et);return new Promise(q=>{function xt(){if(nt.forEach(function(Rt){B.get(Rt).currentProgram.isReady()&&nt.delete(Rt)}),nt.size===0){q(A);return}setTimeout(xt,10)}Q.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Ge=null;function tn(A){Ge&&Ge(A)}function so(){Xn.stop()}function ro(){Xn.start()}const Xn=new dm;Xn.setAnimationLoop(tn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(A){Ge=A,rt.setAnimationLoop(A),A===null?Xn.stop():Xn.start()},rt.addEventListener("sessionstart",so),rt.addEventListener("sessionend",ro),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(X),X=rt.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,X,N),d=Pt.get(A,T.length),d.init(X),T.push(d),ut.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),at.setFromProjectionMatrix(ut),Tt=this.localClippingEnabled,_t=st.init(this.clippingPlanes,Tt),m=dt.get(A,E.length),m.init(),E.push(m),rt.enabled===!0&&rt.isPresenting===!0){const xt=y.xr.getDepthSensingMesh();xt!==null&&jn(xt,X,-1/0,y.sortObjects)}jn(A,X,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(mt,Mt),S=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,S&&Et.addToRenderList(m,A),this.info.render.frame++,_t===!0&&st.beginShadows();const et=d.state.shadowsArray;pt.render(et,A,X),_t===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=m.opaque,q=m.transmissive;if(d.setupLights(),X.isArrayCamera){const xt=X.cameras;if(q.length>0)for(let Rt=0,It=xt.length;Rt<It;Rt++){const Ut=xt[Rt];ao(nt,q,A,Ut)}S&&Et.render(A);for(let Rt=0,It=xt.length;Rt<It;Rt++){const Ut=xt[Rt];oo(m,A,Ut,Ut.viewport)}}else q.length>0&&ao(nt,q,A,X),S&&Et.render(A),oo(m,A,X);N!==null&&(x.updateMultisampleRenderTarget(N),x.updateRenderTargetMipmap(N)),A.isScene===!0&&A.onAfterRender(y,A,X),te.resetDefaultState(),w=-1,b=null,T.pop(),T.length>0?(d=T[T.length-1],_t===!0&&st.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function jn(A,X,et,nt){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)et=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)d.pushLight(A),A.castShadow&&d.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||at.intersectsSprite(A)){nt&&gt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ut);const Rt=G.update(A),It=A.material;It.visible&&m.push(A,Rt,It,et,gt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||at.intersectsObject(A))){const Rt=G.update(A),It=A.material;if(nt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),gt.copy(A.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),gt.copy(Rt.boundingSphere.center)),gt.applyMatrix4(A.matrixWorld).applyMatrix4(ut)),Array.isArray(It)){const Ut=Rt.groups;for(let jt=0,$t=Ut.length;jt<$t;jt++){const Nt=Ut[jt],ne=It[Nt.materialIndex];ne&&ne.visible&&m.push(A,Rt,ne,et,gt.z,Nt)}}else It.visible&&m.push(A,Rt,It,et,gt.z,null)}}const xt=A.children;for(let Rt=0,It=xt.length;Rt<It;Rt++)jn(xt[Rt],X,et,nt)}function oo(A,X,et,nt){const q=A.opaque,xt=A.transmissive,Rt=A.transparent;d.setupLightsView(et),_t===!0&&st.setGlobalState(y.clippingPlanes,et),nt&&ot.viewport(D.copy(nt)),q.length>0&&hs(q,X,et),xt.length>0&&hs(xt,X,et),Rt.length>0&&hs(Rt,X,et),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function ao(A,X,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[nt.id]===void 0&&(d.state.transmissionRenderTarget[nt.id]=new Pn(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?ci:Gn,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const xt=d.state.transmissionRenderTarget[nt.id],Rt=nt.viewport||D;xt.setSize(Rt.z,Rt.w);const It=y.getRenderTarget();y.setRenderTarget(xt),y.getClearColor(V),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear(),S&&Et.render(et);const Ut=y.toneMapping;y.toneMapping=Ii;const jt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),d.setupLightsView(nt),_t===!0&&st.setGlobalState(y.clippingPlanes,nt),hs(A,et,nt),x.updateMultisampleRenderTarget(xt),x.updateRenderTargetMipmap(xt),Q.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Nt=0,ne=X.length;Nt<ne;Nt++){const pe=X[Nt],ge=pe.object,en=pe.geometry,se=pe.material,Bt=pe.group;if(se.side===An&&ge.layers.test(nt.layers)){const qn=se.side;se.side=an,se.needsUpdate=!0,Du(ge,et,nt,en,se,Bt),se.side=qn,se.needsUpdate=!0,$t=!0}}$t===!0&&(x.updateMultisampleRenderTarget(xt),x.updateRenderTargetMipmap(xt))}y.setRenderTarget(It),y.setClearColor(V,$),jt!==void 0&&(nt.viewport=jt),y.toneMapping=Ut}function hs(A,X,et){const nt=X.isScene===!0?X.overrideMaterial:null;for(let q=0,xt=A.length;q<xt;q++){const Rt=A[q],It=Rt.object,Ut=Rt.geometry,jt=nt===null?Rt.material:nt,$t=Rt.group;It.layers.test(et.layers)&&Du(It,X,et,Ut,jt,$t)}}function Du(A,X,et,nt,q,xt){A.onBeforeRender(y,X,et,nt,q,xt),A.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(y,X,et,nt,A,xt),q.transparent===!0&&q.side===An&&q.forceSinglePass===!1?(q.side=an,q.needsUpdate=!0,y.renderBufferDirect(et,X,nt,q,A,xt),q.side=Fi,q.needsUpdate=!0,y.renderBufferDirect(et,X,nt,q,A,xt),q.side=An):y.renderBufferDirect(et,X,nt,q,A,xt),A.onAfterRender(y,X,et,nt,q,xt)}function lo(A,X,et){X.isScene!==!0&&(X=ht);const nt=B.get(A),q=d.state.lights,xt=d.state.shadowsArray,Rt=q.state.version,It=vt.getParameters(A,q.state,xt,X,et),Ut=vt.getProgramCacheKey(It);let jt=nt.programs;nt.environment=A.isMeshStandardMaterial?X.environment:null,nt.fog=X.fog,nt.envMap=(A.isMeshStandardMaterial?R:v).get(A.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,jt===void 0&&(A.addEventListener("dispose",Gt),jt=new Map,nt.programs=jt);let $t=jt.get(Ut);if($t!==void 0){if(nt.currentProgram===$t&&nt.lightsStateVersion===Rt)return Iu(A,It),$t}else It.uniforms=vt.getUniforms(A),A.onBeforeCompile(It,y),$t=vt.acquireProgram(It,Ut),jt.set(Ut,$t),nt.uniforms=It.uniforms;const Nt=nt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Nt.clippingPlanes=st.uniform),Iu(A,It),nt.needsLights=Cm(A),nt.lightsStateVersion=Rt,nt.needsLights&&(Nt.ambientLightColor.value=q.state.ambient,Nt.lightProbe.value=q.state.probe,Nt.directionalLights.value=q.state.directional,Nt.directionalLightShadows.value=q.state.directionalShadow,Nt.spotLights.value=q.state.spot,Nt.spotLightShadows.value=q.state.spotShadow,Nt.rectAreaLights.value=q.state.rectArea,Nt.ltc_1.value=q.state.rectAreaLTC1,Nt.ltc_2.value=q.state.rectAreaLTC2,Nt.pointLights.value=q.state.point,Nt.pointLightShadows.value=q.state.pointShadow,Nt.hemisphereLights.value=q.state.hemi,Nt.directionalShadowMap.value=q.state.directionalShadowMap,Nt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Nt.spotShadowMap.value=q.state.spotShadowMap,Nt.spotLightMatrix.value=q.state.spotLightMatrix,Nt.spotLightMap.value=q.state.spotLightMap,Nt.pointShadowMap.value=q.state.pointShadowMap,Nt.pointShadowMatrix.value=q.state.pointShadowMatrix),nt.currentProgram=$t,nt.uniformsList=null,$t}function Lu(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Jo.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function Iu(A,X){const et=B.get(A);et.outputColorSpace=X.outputColorSpace,et.batching=X.batching,et.batchingColor=X.batchingColor,et.instancing=X.instancing,et.instancingColor=X.instancingColor,et.instancingMorph=X.instancingMorph,et.skinning=X.skinning,et.morphTargets=X.morphTargets,et.morphNormals=X.morphNormals,et.morphColors=X.morphColors,et.morphTargetsCount=X.morphTargetsCount,et.numClippingPlanes=X.numClippingPlanes,et.numIntersection=X.numClipIntersection,et.vertexAlphas=X.vertexAlphas,et.vertexTangents=X.vertexTangents,et.toneMapping=X.toneMapping}function wm(A,X,et,nt,q){X.isScene!==!0&&(X=ht),x.resetTextureUnits();const xt=X.fog,Rt=nt.isMeshStandardMaterial?X.environment:null,It=N===null?y.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:lr,Ut=(nt.isMeshStandardMaterial?R:v).get(nt.envMap||Rt),jt=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,$t=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Nt=!!et.morphAttributes.position,ne=!!et.morphAttributes.normal,pe=!!et.morphAttributes.color;let ge=Ii;nt.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ge=y.toneMapping);const en=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,se=en!==void 0?en.length:0,Bt=B.get(nt),qn=d.state.lights;if(_t===!0&&(Tt===!0||A!==b)){const pn=A===b&&nt.id===w;st.setState(nt,A,pn)}let re=!1;nt.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==qn.state.version||Bt.outputColorSpace!==It||q.isBatchedMesh&&Bt.batching===!1||!q.isBatchedMesh&&Bt.batching===!0||q.isBatchedMesh&&Bt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Bt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Bt.instancing===!1||!q.isInstancedMesh&&Bt.instancing===!0||q.isSkinnedMesh&&Bt.skinning===!1||!q.isSkinnedMesh&&Bt.skinning===!0||q.isInstancedMesh&&Bt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Bt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Bt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Bt.instancingMorph===!1&&q.morphTexture!==null||Bt.envMap!==Ut||nt.fog===!0&&Bt.fog!==xt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==st.numPlanes||Bt.numIntersection!==st.numIntersection)||Bt.vertexAlphas!==jt||Bt.vertexTangents!==$t||Bt.morphTargets!==Nt||Bt.morphNormals!==ne||Bt.morphColors!==pe||Bt.toneMapping!==ge||Bt.morphTargetsCount!==se)&&(re=!0):(re=!0,Bt.__version=nt.version);let Sn=Bt.currentProgram;re===!0&&(Sn=lo(nt,X,q));let ds=!1,ln=!1,hr=!1;const _e=Sn.getUniforms(),In=Bt.uniforms;if(ot.useProgram(Sn.program)&&(ds=!0,ln=!0,hr=!0),nt.id!==w&&(w=nt.id,ln=!0),ds||b!==A){ot.buffers.depth.getReversed()?(O.copy(A.projectionMatrix),Rx(O),Cx(O),_e.setValue(M,"projectionMatrix",O)):_e.setValue(M,"projectionMatrix",A.projectionMatrix),_e.setValue(M,"viewMatrix",A.matrixWorldInverse);const gi=_e.map.cameraPosition;gi!==void 0&&gi.setValue(M,lt.setFromMatrixPosition(A.matrixWorld)),Z.logarithmicDepthBuffer&&_e.setValue(M,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&_e.setValue(M,"isOrthographic",A.isOrthographicCamera===!0),b!==A&&(b=A,ln=!0,hr=!0)}if(q.isSkinnedMesh){_e.setOptional(M,q,"bindMatrix"),_e.setOptional(M,q,"bindMatrixInverse");const pn=q.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),_e.setValue(M,"boneTexture",pn.boneTexture,x))}q.isBatchedMesh&&(_e.setOptional(M,q,"batchingTexture"),_e.setValue(M,"batchingTexture",q._matricesTexture,x),_e.setOptional(M,q,"batchingIdTexture"),_e.setValue(M,"batchingIdTexture",q._indirectTexture,x),_e.setOptional(M,q,"batchingColorTexture"),q._colorsTexture!==null&&_e.setValue(M,"batchingColorTexture",q._colorsTexture,x));const dr=et.morphAttributes;if((dr.position!==void 0||dr.normal!==void 0||dr.color!==void 0)&&Ht.update(q,et,Sn),(ln||Bt.receiveShadow!==q.receiveShadow)&&(Bt.receiveShadow=q.receiveShadow,_e.setValue(M,"receiveShadow",q.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(In.envMap.value=Ut,In.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&X.environment!==null&&(In.envMapIntensity.value=X.environmentIntensity),ln&&(_e.setValue(M,"toneMappingExposure",y.toneMappingExposure),Bt.needsLights&&Rm(In,hr),xt&&nt.fog===!0&&ct.refreshFogUniforms(In,xt),ct.refreshMaterialUniforms(In,nt,K,it,d.state.transmissionRenderTarget[A.id]),Jo.upload(M,Lu(Bt),In,x)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Jo.upload(M,Lu(Bt),In,x),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&_e.setValue(M,"center",q.center),_e.setValue(M,"modelViewMatrix",q.modelViewMatrix),_e.setValue(M,"normalMatrix",q.normalMatrix),_e.setValue(M,"modelMatrix",q.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const pn=nt.uniformsGroups;for(let gi=0,_i=pn.length;gi<_i;gi++){const Uu=pn[gi];z.update(Uu,Sn),z.bind(Uu,Sn)}}return Sn}function Rm(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Cm(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(A,X,et){B.get(A.texture).__webglTexture=X,B.get(A.depthTexture).__webglTexture=et;const nt=B.get(A);nt.__hasExternalTextures=!0,nt.__autoAllocateDepthBuffer=et===void 0,nt.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),nt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){const et=B.get(A);et.__webglFramebuffer=X,et.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,et=0){N=A,L=X,P=et;let nt=!0,q=null,xt=!1,Rt=!1;if(A){const Ut=B.get(A);if(Ut.__useDefaultFramebuffer!==void 0)ot.bindFramebuffer(M.FRAMEBUFFER,null),nt=!1;else if(Ut.__webglFramebuffer===void 0)x.setupRenderTarget(A);else if(Ut.__hasExternalTextures)x.rebindTextures(A,B.get(A.texture).__webglTexture,B.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Nt=A.depthTexture;if(Ut.__boundDepthTexture!==Nt){if(Nt!==null&&B.has(Nt)&&(A.width!==Nt.image.width||A.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(A)}}const jt=A.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Rt=!0);const $t=B.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray($t[X])?q=$t[X][et]:q=$t[X],xt=!0):A.samples>0&&x.useMultisampledRTT(A)===!1?q=B.get(A).__webglMultisampledFramebuffer:Array.isArray($t)?q=$t[et]:q=$t,D.copy(A.viewport),F.copy(A.scissor),H=A.scissorTest}else D.copy(Ct).multiplyScalar(K).floor(),F.copy(Ft).multiplyScalar(K).floor(),H=Jt;if(ot.bindFramebuffer(M.FRAMEBUFFER,q)&&nt&&ot.drawBuffers(A,q),ot.viewport(D),ot.scissor(F),ot.setScissorTest(H),xt){const Ut=B.get(A.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ut.__webglTexture,et)}else if(Rt){const Ut=B.get(A.texture),jt=X||0;M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,Ut.__webglTexture,et||0,jt)}w=-1},this.readRenderTargetPixels=function(A,X,et,nt,q,xt,Rt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let It=B.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Rt!==void 0&&(It=It[Rt]),It){ot.bindFramebuffer(M.FRAMEBUFFER,It);try{const Ut=A.texture,jt=Ut.format,$t=Ut.type;if(!Z.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Z.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-nt&&et>=0&&et<=A.height-q&&M.readPixels(X,et,nt,q,Vt.convert(jt),Vt.convert($t),xt)}finally{const Ut=N!==null?B.get(N).__webglFramebuffer:null;ot.bindFramebuffer(M.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(A,X,et,nt,q,xt,Rt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let It=B.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Rt!==void 0&&(It=It[Rt]),It){const Ut=A.texture,jt=Ut.format,$t=Ut.type;if(!Z.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Z.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-nt&&et>=0&&et<=A.height-q){ot.bindFramebuffer(M.FRAMEBUFFER,It);const Nt=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,Nt),M.bufferData(M.PIXEL_PACK_BUFFER,xt.byteLength,M.STREAM_READ),M.readPixels(X,et,nt,q,Vt.convert(jt),Vt.convert($t),0);const ne=N!==null?B.get(N).__webglFramebuffer:null;ot.bindFramebuffer(M.FRAMEBUFFER,ne);const pe=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await wx(M,pe,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,Nt),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,xt),M.deleteBuffer(Nt),M.deleteSync(pe),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,et=0){A.isTexture!==!0&&(Rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);const nt=Math.pow(2,-et),q=Math.floor(A.image.width*nt),xt=Math.floor(A.image.height*nt),Rt=X!==null?X.x:0,It=X!==null?X.y:0;x.setTexture2D(A,0),M.copyTexSubImage2D(M.TEXTURE_2D,et,0,0,Rt,It,q,xt),ot.unbindTexture()},this.copyTextureToTexture=function(A,X,et=null,nt=null,q=0){A.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture function signature has changed."),nt=arguments[0]||null,A=arguments[1],X=arguments[2],q=arguments[3]||0,et=null);let xt,Rt,It,Ut,jt,$t,Nt,ne,pe;const ge=A.isCompressedTexture?A.mipmaps[q]:A.image;et!==null?(xt=et.max.x-et.min.x,Rt=et.max.y-et.min.y,It=et.isBox3?et.max.z-et.min.z:1,Ut=et.min.x,jt=et.min.y,$t=et.isBox3?et.min.z:0):(xt=ge.width,Rt=ge.height,It=ge.depth||1,Ut=0,jt=0,$t=0),nt!==null?(Nt=nt.x,ne=nt.y,pe=nt.z):(Nt=0,ne=0,pe=0);const en=Vt.convert(X.format),se=Vt.convert(X.type);let Bt;X.isData3DTexture?(x.setTexture3D(X,0),Bt=M.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(x.setTexture2DArray(X,0),Bt=M.TEXTURE_2D_ARRAY):(x.setTexture2D(X,0),Bt=M.TEXTURE_2D),M.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,X.flipY),M.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),M.pixelStorei(M.UNPACK_ALIGNMENT,X.unpackAlignment);const qn=M.getParameter(M.UNPACK_ROW_LENGTH),re=M.getParameter(M.UNPACK_IMAGE_HEIGHT),Sn=M.getParameter(M.UNPACK_SKIP_PIXELS),ds=M.getParameter(M.UNPACK_SKIP_ROWS),ln=M.getParameter(M.UNPACK_SKIP_IMAGES);M.pixelStorei(M.UNPACK_ROW_LENGTH,ge.width),M.pixelStorei(M.UNPACK_IMAGE_HEIGHT,ge.height),M.pixelStorei(M.UNPACK_SKIP_PIXELS,Ut),M.pixelStorei(M.UNPACK_SKIP_ROWS,jt),M.pixelStorei(M.UNPACK_SKIP_IMAGES,$t);const hr=A.isDataArrayTexture||A.isData3DTexture,_e=X.isDataArrayTexture||X.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const In=B.get(A),dr=B.get(X),pn=B.get(In.__renderTarget),gi=B.get(dr.__renderTarget);ot.bindFramebuffer(M.READ_FRAMEBUFFER,pn.__webglFramebuffer),ot.bindFramebuffer(M.DRAW_FRAMEBUFFER,gi.__webglFramebuffer);for(let _i=0;_i<It;_i++)hr&&M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,B.get(A).__webglTexture,q,$t+_i),A.isDepthTexture?(_e&&M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,B.get(X).__webglTexture,q,pe+_i),M.blitFramebuffer(Ut,jt,xt,Rt,Nt,ne,xt,Rt,M.DEPTH_BUFFER_BIT,M.NEAREST)):_e?M.copyTexSubImage3D(Bt,q,Nt,ne,pe+_i,Ut,jt,xt,Rt):M.copyTexSubImage2D(Bt,q,Nt,ne,pe+_i,Ut,jt,xt,Rt);ot.bindFramebuffer(M.READ_FRAMEBUFFER,null),ot.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else _e?A.isDataTexture||A.isData3DTexture?M.texSubImage3D(Bt,q,Nt,ne,pe,xt,Rt,It,en,se,ge.data):X.isCompressedArrayTexture?M.compressedTexSubImage3D(Bt,q,Nt,ne,pe,xt,Rt,It,en,ge.data):M.texSubImage3D(Bt,q,Nt,ne,pe,xt,Rt,It,en,se,ge):A.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,q,Nt,ne,xt,Rt,en,se,ge.data):A.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,q,Nt,ne,ge.width,ge.height,en,ge.data):M.texSubImage2D(M.TEXTURE_2D,q,Nt,ne,xt,Rt,en,se,ge);M.pixelStorei(M.UNPACK_ROW_LENGTH,qn),M.pixelStorei(M.UNPACK_IMAGE_HEIGHT,re),M.pixelStorei(M.UNPACK_SKIP_PIXELS,Sn),M.pixelStorei(M.UNPACK_SKIP_ROWS,ds),M.pixelStorei(M.UNPACK_SKIP_IMAGES,ln),q===0&&X.generateMipmaps&&M.generateMipmap(Bt),ot.unbindTexture()},this.copyTextureToTexture3D=function(A,X,et=null,nt=null,q=0){return A.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),et=arguments[0]||null,nt=arguments[1]||null,A=arguments[2],X=arguments[3],q=arguments[4]||0),Rr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,et,nt,q)},this.initRenderTarget=function(A){B.get(A).__webglFramebuffer===void 0&&x.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?x.setTextureCube(A,0):A.isData3DTexture?x.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?x.setTexture2DArray(A,0):x.setTexture2D(A,0),ot.unbindTexture()},this.resetState=function(){L=0,P=0,N=null,ot.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class bu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new bu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Bb extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class zb extends Qe{constructor(t=null,e=1,i=1,s,r,o,a,l,c=dn,u=dn,f,h){super(null,o,a,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fc extends fs{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const fa=new j,ha=new j,Uh=new de,Er=new no,No=new cr,Al=new j,Nh=new j;class kb extends be{constructor(t=new Ve,e=new Fc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)fa.fromBufferAttribute(e,s-1),ha.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=fa.distanceTo(ha);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),No.copy(i.boundingSphere),No.applyMatrix4(s),No.radius+=r,t.ray.intersectsSphere(No)===!1)return;Uh.copy(s).invert(),Er.copy(t.ray).applyMatrix4(Uh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=u.getX(_),E=u.getX(_+1),T=Oo(this,t,Er,l,d,E);T&&e.push(T)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),d=Oo(this,t,Er,l,_,m);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=Oo(this,t,Er,l,_,_+1);d&&e.push(d)}if(this.isLineLoop){const _=Oo(this,t,Er,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Oo(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(fa.fromBufferAttribute(o,s),ha.fromBufferAttribute(o,r),e.distanceSqToSegment(fa,ha,Al,Nh)>i)return;Al.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Al);if(!(l<t.near||l>t.far))return{distance:l,point:Nh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const Oh=new j,Fh=new j;class Bh extends kb{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Oh.fromBufferAttribute(e,s),Fh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Oh.distanceTo(Fh);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Hb extends fs{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const zh=new de,Bc=new no,Fo=new cr,Bo=new j;class Vb extends be{constructor(t=new Ve,e=new Hb){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fo.copy(i.boundingSphere),Fo.applyMatrix4(s),Fo.radius+=r,t.ray.intersectsSphere(Fo)===!1)return;zh.copy(s).invert(),Bc.copy(t.ray).applyMatrix4(zh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=h,_=p;g<_;g++){const m=c.getX(g);Bo.fromBufferAttribute(f,m),kh(Bo,m,l,s,t,e,this)}}else{const h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=h,_=p;g<_;g++)Bo.fromBufferAttribute(f,g),kh(Bo,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function kh(n,t,e,i,s,r,o){const a=Bc.distanceSqToPoint(n);if(a<e){const l=new j;Bc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Tu extends Ve{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let f=t;const h=(e-t)/s,p=new j,g=new zt;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const d=r+m/i*o;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let d=0;d<i;d++){const E=d+m,T=E,y=E+i+1,I=E+i+2,L=E+1;a.push(T,y,L),a.push(y,I,L)}}this.setIndex(a),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Fs extends Ve{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new j,h=new j,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const E=[],T=d/i;let y=0;d===0&&o===0?y=.5/e:d===i&&l===Math.PI&&(y=-.5/e);for(let I=0;I<=e;I++){const L=I/e;f.x=-t*Math.cos(s+L*r)*Math.sin(o+T*a),f.y=t*Math.cos(o+T*a),f.z=t*Math.sin(s+L*r)*Math.sin(o+T*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(L+y,1-T),E.push(c++)}u.push(E)}for(let d=0;d<i;d++)for(let E=0;E<e;E++){const T=u[d][E+1],y=u[d][E],I=u[d+1][E],L=u[d+1][E+1];(d!==0||o>0)&&p.push(T,y,L),(d!==i-1||l<Math.PI)&&p.push(y,I,L)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Au extends Ve{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new j,f=new j,h=new j;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/i*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,E=(s+1)*p+g;o.push(_,m,E),o.push(m,d,E)}this.setIndex(o),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Au(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Gb extends ke{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Hh extends fs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nm,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class xm extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Wb extends xm{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const wl=new de,Vh=new j,Gh=new j;class Xb{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mu,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Vh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vh),Gh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Gh),e.updateMatrixWorld(),wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class jb extends Xb{constructor(){super(new Su(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wh extends xm{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new jb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ym{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Xh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Xh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Xh(){return performance.now()}const jh=new de;class qb{constructor(t,e,i=0,s=1/0){this.ray=new no(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new yu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return jh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jh),this}intersectObject(t,e=!0,i=[]){return zc(t,this,i,e),i.sort(qh),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)zc(t[s],this,i,e);return i.sort(qh),i}}function qh(n,t){return n.distance-t.distance}function zc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)zc(r[o],t,e,!0)}}class Yh{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos($e(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Yb extends us{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hu);const $h={type:"change"},wu={type:"start"},Mm={type:"end"},zo=new no,Kh=new Ri,$b=Math.cos(70*Tx.DEG2RAD),Te=new j,sn=2*Math.PI,fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Rl=1e-6;class Kb extends Yb{constructor(t,e=null){super(t,e),this.state=fe.NONE,this.enabled=!0,this.target=new j,this.cursor=new j,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Gs.ROTATE,MIDDLE:Gs.DOLLY,RIGHT:Gs.PAN},this.touches={ONE:Us.ROTATE,TWO:Us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new j,this._lastQuaternion=new as,this._lastTargetPosition=new j,this._quat=new as().setFromUnitVectors(t.up,new j(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yh,this._sphericalDelta=new Yh,this._scale=1,this._panOffset=new j,this._rotateStart=new zt,this._rotateEnd=new zt,this._rotateDelta=new zt,this._panStart=new zt,this._panEnd=new zt,this._panDelta=new zt,this._dollyStart=new zt,this._dollyEnd=new zt,this._dollyDelta=new zt,this._dollyDirection=new j,this._mouse=new zt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Jb.bind(this),this._onPointerDown=Zb.bind(this),this._onPointerUp=Qb.bind(this),this._onContextMenu=oT.bind(this),this._onMouseWheel=nT.bind(this),this._onKeyDown=iT.bind(this),this._onTouchStart=sT.bind(this),this._onTouchMove=rT.bind(this),this._onMouseDown=tT.bind(this),this._onMouseMove=eT.bind(this),this._interceptControlDown=aT.bind(this),this._interceptControlUp=lT.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($h),this.update(),this.state=fe.NONE}update(t=null){const e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Te.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new j(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new j(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(zo.origin.copy(this.object.position),zo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zo.direction))<$b?this.object.lookAt(this.target):(Kh.setFromNormalAndCoplanarPoint(this.object.up,this.target),zo.intersectPlane(Kh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Rl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Rl||this._lastTargetPosition.distanceToSquared(this.target)>Rl?(this.dispatchEvent($h),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new zt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Zb(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Jb(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Qb(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Mm),this.state=fe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function tT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=fe.DOLLY;break;case Gs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}break;case Gs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(wu)}function eT(n){switch(this.state){case fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function nT(n){this.enabled===!1||this.enableZoom===!1||this.state!==fe.NONE||(n.preventDefault(),this.dispatchEvent(wu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Mm))}function iT(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function sT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Us.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=fe.TOUCH_ROTATE;break;case Us.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=fe.TOUCH_PAN;break;default:this.state=fe.NONE}break;case 2:switch(this.touches.TWO){case Us.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=fe.TOUCH_DOLLY_PAN;break;case Us.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=fe.TOUCH_DOLLY_ROTATE;break;default:this.state=fe.NONE}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(wu)}function rT(n){switch(this._trackPointer(n),this.state){case fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=fe.NONE}}function oT(n){this.enabled!==!1&&n.preventDefault()}function aT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function lT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Sm={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class fr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cT=new Su(-1,1,1,-1,0,1);class uT extends Ve{constructor(){super(),this.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Se([0,2,0,0,2,0],2))}}const fT=new uT;class Ru{constructor(t){this._mesh=new we(fT,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,cT)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class hT extends fr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ke?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Yr.clone(t.uniforms),this.material=new ke({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ru(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Zh extends fr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class dT extends fr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class pT{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new zt);this._width=i.width,this._height=i.height,e=new Pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ci}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new hT(Sm),this.copyPass.material.blending=li,this.clock=new ym}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Zh!==void 0&&(o instanceof Zh?i=!0:o instanceof dT&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const mT={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class gT extends fr{constructor(){super();const t=mT;this.uniforms=Yr.clone(t.uniforms),this.material=new Gb({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ru(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===kp?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Hp?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===du?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Gp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Wp&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class _T extends fr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new qt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const vT={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class rr extends fr{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new qt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Pn(r,o,{type:ci}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const h=new Pn(r,o,{type:ci});h.texture.name="UnrealBloomPass.h"+f,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new Pn(r,o,{type:ci});p.texture.name="UnrealBloomPass.v"+f,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=vT;this.highPassUniforms=Yr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ke({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new zt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Sm;this.copyUniforms=Yr.clone(u.uniforms),this.blendMaterial=new ke({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Xs,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new qt,this.oldClearAlpha=1,this.basic=new gn,this.fsQuad=new Ru(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new zt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=rr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=rr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new ke({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}rr.BlurDirectionX=new zt(1,0);rr.BlurDirectionY=new zt(0,1);class br extends be{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new zt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Cs=new j,Jh=new de,Qh=new de,td=new j,ed=new j;class xT{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Jh.copy(_.matrixWorldInverse),Qh.multiplyMatrices(_.projectionMatrix,Jh),u(g,g,_),p(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Cs.setFromMatrixPosition(g.matrixWorld),Cs.applyMatrix4(Qh);const d=Cs.z>=-1&&Cs.z<=1&&g.layers.test(m.layers)===!0,E=g.element;E.style.display=d===!0?"":"none",d===!0&&(g.onBeforeRender(e,_,m),E.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Cs.x*r+r)+"px,"+(-Cs.y*o+o)+"px)",E.parentNode!==l&&l.appendChild(E),g.onAfterRender(e,_,m));const T={distanceToCameraSquared:f(m,g)};a.objects.set(g,T)}for(let d=0,E=g.children.length;d<E;d++)u(g.children[d],_,m)}function f(g,_){return td.setFromMatrixPosition(g.matrixWorld),ed.setFromMatrixPosition(_.matrixWorld),td.distanceToSquared(ed)}function h(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function p(g){const _=h(g).sort(function(d,E){if(d.renderOrder!==E.renderOrder)return E.renderOrder-d.renderOrder;const T=a.objects.get(d).distanceToCameraSquared,y=a.objects.get(E).distanceToCameraSquared;return T-y}),m=_.length;for(let d=0,E=_.length;d<E;d++)_[d].element.style.zIndex=m-d}}}const yT="v5";function MT(n,t){return`${yT}-${n}-${t}`}const da=new Map;function nd(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function ST(n){return n-Math.floor(n)}function ko(n,t,e){return ST(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function kc(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=ko(i,s,e),u=ko(i+1,s,e),f=ko(i,s+1,e),h=ko(i+1,s+1,e);return c+(u-c)*a+(f-c)*l+(h-f-(u-c))*a*l}function ET(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*kc(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function bT(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function TT(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,f=ET(c*4.2+t*.002,u*4.2-t*.001,t),p=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,kc(c*14,u*14,t+11)-.38),1.4),_=kc(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*f)*p*(1-g*.55)*_;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[d,E,T]=bT(e,r,m),y=(a*n+l)*4;s[y]=d,s[y+1]=E,s[y+2]=T,s[y+3]=255}const o=new zb(s,n,n);return o.format=vn,o.type=Gn,o.colorSpace=rn,o.wrapS=jr,o.wrapT=jr,o.generateMipmaps=!0,o.minFilter=Pi,o.magFilter=Rn,o.flipY=!0,o.needsUpdate=!0,o}function AT(n,t){const e=nd(n)%14,i=MT(t,e);let s=da.get(i);if(!s){const r=nd(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=TT(256,r,o,t),da.set(i,s)}return{map:s}}function wT(){for(const n of da.values())n.dispose();da.clear()}const RT=461586,CT=4874368,PT=9103615,id=12101887,DT=4873336,LT=6091007,sd=13165823,IT=10205416,UT=1.35,NT=4e3,OT=["热度/年薪","强度/竞争","学历门槛","学科技能"];function Cu(n,t,e,i,s){const r=n.clientWidth||window.innerWidth,o=n.clientHeight||window.innerHeight,a=new Bb;a.background=new qt(RT),a.fog=new bu(CT,.032);const l=new _n(55,r/o,.1,200);l.position.set(12,10,16);const c=new Fb({antialias:!0,alpha:!1,powerPreference:"high-performance"});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(r,o),c.outputColorSpace=rn,c.toneMapping=du,c.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(c.domElement);const u=document.createElement("div");u.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(u);const f=new xT({element:u});f.setSize(r,o);const h=Math.min(window.devicePixelRatio,2),p=new pT(c);p.setPixelRatio(h);const g=new _T(a,l),_=new zt(Math.max(128,Math.floor(r*h/2)),Math.max(128,Math.floor(o*h/2))),m=new rr(_,.34,.34,.88),d=new gT;p.addPass(g),p.addPass(m),p.addPass(d);const E=new Wb(9088744,1382432,.62);a.add(E);const T=new Wh(15791871,.55);T.position.set(8,14,10),a.add(T);const y=new Wh(6324424,.22);y.position.set(-12,-2,-8),a.add(y);const I=new Kb(l,c.domElement);I.enableDamping=!0,I.dampingFactor=.06,I.minDistance=4,I.maxDistance=48,I.autoRotate=!0,I.autoRotateSpeed=UT;let L=null,P=!1;const N=()=>{L!==null&&(window.clearTimeout(L),L=null)},w=()=>{N(),L=window.setTimeout(()=>{P||(I.autoRotate=!0)},NT)},b=()=>{P=!0,I.autoRotate=!1,N()},D=()=>{P=!1,w()},F=()=>{I.autoRotate=!1,w()},H=Math.min(1,Math.max(0,(s==null?void 0:s.ambientStarBoost)??0)),V=new Map,$=new Map;let tt=null,it=null;const mt=(()=>{const W=Math.min(9200,Math.floor(1100+H*7200)),B=new Float32Array(W*3),x=new Float32Array(W);for(let G=0;G<W;G++){const vt=Math.random(),ct=Math.random(),dt=2*Math.PI*vt,Pt=Math.acos(2*ct-1),st=26+Math.random()*78,pt=Math.sin(Pt);B[G*3]=st*pt*Math.cos(dt),B[G*3+1]=st*pt*Math.sin(dt),B[G*3+2]=st*Math.cos(Pt);const Et=.04+Math.random()*.12+H*.06;x[G]=Math.min(.26,Et)}const v=new Ve;v.setAttribute("position",new Mn(B,3)),v.setAttribute("size",new Mn(x,1));const R=.42+H*.58,U=new ke({uniforms:{uColor:{value:new qt(IT)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uAlphaMul:{value:R}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:Xs}),k=new Vb(v,U);return k.frustumCulled=!1,a.add(k),k})(),Mt=(W,B,x)=>{W.traverse(v=>{v instanceof br||(v.userData.nodeId=B,v.userData.nodeType=x)})},Ct=(W,B)=>{const x=document.createElement("div");x.textContent=W,x.setAttribute("role","presentation");const v=B==="fusion",R=v?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",U=v?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",k=v?"#f4ecff":"#eaf6ff";return x.style.cssText=[`max-width:${v?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${k}`,`background:${R}`,`border:${U}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),x},Ft=W=>{const B=document.createElement("div");return B.textContent=W,B.setAttribute("role","presentation"),B.style.cssText=["max-width: 52px","padding: 2px 5px","border-radius: 5px","font-size: 8px","font-weight: 650","line-height: 1.2","text-align: center","letter-spacing: 0.01em","color: #ede6ff","background: rgba(28, 20, 42, 0.82)","border: 1px solid rgba(200, 170, 255, 0.42)","box-shadow: 0 1px 5px rgba(0,0,0,0.35)","text-shadow: 0 1px 2px rgba(0,0,0,0.7)","display: -webkit-box","-webkit-box-orient: vertical","-webkit-line-clamp: 2","overflow: hidden","word-break: break-all","overflow-wrap: anywhere","opacity: 0","visibility: hidden","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),B},Jt=(W,B,x)=>{const v=W==="major",R=new Os,U=v?"major":"fusion",{map:k}=AT(B,U),G=v?.23:.15,vt=new Fs(G,v?48:36,v?32:26),ct=new gn({map:k,color:new qt(16777215),transparent:!0,opacity:1,fog:!1}),dt=new we(vt,ct);dt.userData.part="core",R.add(dt);const Pt=v?PT:id,st=new Fs(G*1.52,18,14),pt=new gn({color:Pt,transparent:!0,opacity:v?.045:.032,depthWrite:!1,blending:Xs,fog:!1}),Et=new we(st,pt);if(Et.renderOrder=-1,Et.userData.part="glow",R.add(Et),v){const kt=new gn({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:An,fog:!1}),Vt=(z,bt,rt)=>{const ft=new Au(z,bt,10,80),St=new we(ft,kt.clone());return St.rotation.x=Math.PI/2,St.rotation.z=rt,St.userData.part="ring",St};R.add(Vt(.46,.014,Math.random()*Math.PI));const te=Vt(.38,.01,Math.PI/2.8);te.rotation.y=Math.PI/3.2,R.add(te)}else{const kt=Math.max(G*5.55,.78),Vt=kt*1.2,te=kt*.82,z=kt*1.22,bt=new Tu(te,z,80),rt=new gn({color:id,transparent:!0,opacity:.5,depthWrite:!1,side:An,fog:!1,blending:Xs}),ft=new we(bt,rt);ft.rotation.x=Math.PI/2,ft.renderOrder=0,ft.userData.part="ring",R.add(ft);const St=Math.max(G*.34,.052),wt=[.02,.14,.55,.42];for(let Gt=0;Gt<4;Gt++){const ve=new Fs(St,14,12),De=new qt().setHSL(wt[Gt],.55,.62),ie=new gn({color:De,transparent:!0,opacity:.94,fog:!1}),Ge=new we(ve,ie),tn=Gt/4*Math.PI*2-Math.PI/4,so=Math.cos(tn)*kt,ro=Math.sin(tn)*kt;Ge.position.set(so,0,ro),Ge.userData.part="satellite",R.add(Ge);const Xn=Ft(OT[Gt]),jn=new br(Xn),oo=Math.cos(tn)*Vt,ao=Math.sin(tn)*Vt,hs=St*.55+Gt%2*.018;jn.position.set(oo,hs,ao),jn.center.set(.5,1),jn.renderOrder=8,jn.userData.isFusionQuadrantLabel=!0,R.add(jn)}}const Ht=Ct(x,W),yt=new br(Ht);return yt.position.set(0,G*1.38,0),yt.center.set(.5,1),yt.renderOrder=10,yt.userData.isNodeLabel=!0,R.add(yt),R.userData.nodeVisual={core:dt,glow:Et},R};for(const W of t.nodes){const B=t.layout[W.id];if(!B)continue;const x=Jt(W.type,W.id,W.label);x.position.set(B.x,B.y,B.z),x.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),x.userData.nodeId=W.id,x.userData.nodeType=W.type,Mt(x,W.id,W.type),a.add(x),V.set(W.id,x)}const at=(W,B)=>W<B?`${W}|${B}`:`${B}|${W}`,_t=()=>{const W=[];for(const v of t.edges){const R=t.layout[v.u],U=t.layout[v.v];!R||!U||W.push(R.x,R.y,R.z,U.x,U.y,U.z)}const B=new Ve;B.setAttribute("position",new Se(W,3));const x=new Fc({color:DT,transparent:!0,opacity:.32,depthWrite:!1});return new Bh(B,x)},Tt=W=>{const B=[...W],x=[],v=new Set(t.edges.map(k=>at(k.u,k.v)));for(let k=0;k<B.length-1;k++){const G=B[k],vt=B[k+1];if(!v.has(at(G,vt)))continue;const ct=t.layout[G],dt=t.layout[vt];!ct||!dt||x.push(ct.x,ct.y,ct.z,dt.x,dt.y,dt.z)}const R=new Ve;R.setAttribute("position",new Se(x,3));const U=new Fc({color:LT,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new Bh(R,U)};tt=_t(),a.add(tt),it=Tt(e.pathIds),a.add(it);const O=new Os;a.add(O),(()=>{for(;O.children.length;)O.remove(O.children[0]);$.clear();const W=new Fs(1,20,20);for(const B of t.hyperedges){const x=[];for(const vt of B.member_node_ids){const ct=t.layout[vt];ct&&x.push(new j(ct.x,ct.y,ct.z))}if(!x.length)continue;const v=new ls().setFromPoints(x),R=new cr;v.getBoundingSphere(R);const U=new gn({color:sd,transparent:!0,opacity:.07,depthWrite:!1}),k=new we(W,U);k.position.copy(R.center);const G=Math.max(R.radius*1.45,.65);k.scale.setScalar(G),k.userData.hyperedgeId=B.id,O.add(k),$.set(B.id,k)}})();const lt=new qb,gt=new zt,ht=(W,B)=>{const x=c.domElement.getBoundingClientRect();gt.x=(W-x.left)/x.width*2-1,gt.y=-((B-x.top)/x.height)*2+1,lt.setFromCamera(gt,l);const v=[...V.values()],U=lt.intersectObjects(v,!0).find(G=>G.object instanceof we&&typeof G.object.userData.nodeId=="string");if(!U){i(null);return}const k=U.object.userData.nodeId;i(k??null)},S=W=>{W.button===0&&(b(),ht(W.clientX,W.clientY))};c.domElement.addEventListener("pointerdown",S),c.domElement.addEventListener("pointerup",D),c.domElement.addEventListener("wheel",F,{passive:!0}),c.domElement.addEventListener("touchstart",b,{passive:!0}),c.domElement.addEventListener("touchend",D,{passive:!0}),I.addEventListener("start",b),I.addEventListener("end",D);let C=0;const M=new ym,J=()=>{const W=M.getDelta(),B=M.getElapsedTime();I.update();for(const x of V.values())x.rotation.y+=W*.1,x.rotation.z+=W*.02*Math.sin(B*.6+x.position.x*.2);p.render(),f.render(a,l),C=requestAnimationFrame(J)};J();const Q=()=>{const W=n.clientWidth||window.innerWidth,B=n.clientHeight||window.innerHeight;l.aspect=W/B,l.updateProjectionMatrix(),c.setSize(W,B),p.setSize(W,B),f.setSize(W,B),mt.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",Q);const Z=W=>{it&&(a.remove(it),it.geometry.dispose(),it.material.dispose(),it=Tt(W.pathIds),a.add(it));const B=new Set([...W.pathIds,...W.hyperMemberIds]);for(const[x,v]of V){const R=W.pathIds.has(x),U=W.hyperMemberIds.has(x),k=W.selectedId===x,G=!B.has(x)&&(W.pathIds.size>0||W.hyperMemberIds.size>0),vt=G?.32:1,ct=v.userData.nodeType||"major";v.traverse(dt=>{if(dt instanceof br&&dt.userData.isNodeLabel){const st=dt.element;let pt=G?.36:.96;(R||U)&&(pt=Math.max(pt,.94)),k&&(pt=1),st.style.opacity=String(pt),st.style.filter=k?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":R||U?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",st.style.fontWeight=k?"800":"650",dt.renderOrder=k?20:10;return}if(dt instanceof br&&dt.userData.isFusionQuadrantLabel){const st=dt.element;if(!(ct==="fusion"&&k)){st.style.opacity="0",st.style.visibility="hidden",dt.renderOrder=1;return}st.style.visibility="visible";let Et=G?.3:.92;(R||U)&&(Et=Math.max(Et,.9)),k&&(Et=1),st.style.opacity=String(Et),st.style.filter=k?"drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))":R||U?"drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))":"none",dt.renderOrder=k?18:8;return}if(!(dt instanceof we))return;const Pt=dt.material;if(Pt instanceof gn&&(dt.userData.part||"other")==="core"){let pt=G?.34:1;(R||U)&&(pt=Math.max(pt,.98)),k&&(pt=1),Pt.opacity=pt,Pt.transparent=pt<.999,Pt.color.set(k?16777215:R||U?15924223:16777215);return}if(Pt instanceof Hh){let st=G?.38:1,pt=ct==="major"?.11:.09;(R||U)&&(st=Math.max(st,.98),pt=.26),k&&(pt=.38,st=1),G&&(pt*=.55),Pt.transparent=st<.999,Pt.opacity=st,Pt.emissiveIntensity=pt}else if(Pt instanceof gn){const st=dt.userData.part||"other";let pt=.42;st==="glow"?pt=ct==="major"?.048:.036:st==="shard"?pt=.36:st==="ring"?pt=ct==="major"?.48:.52:st==="satellite"&&(pt=.9);let Et=pt*vt;(R||U)&&(st==="glow"||st==="shard"?Et=Math.max(Et,.22):Et=Math.max(Et,.82)),k&&(st==="glow"||st==="shard"||st==="satellite")&&(Et=Math.max(Et,.34)),k&&st==="ring"&&ct==="fusion"&&(Et=Math.max(Et,.78)),Pt.opacity=Et,Pt.transparent=!0}})}for(const[x,v]of $){const R=v.material,U=W.activeHyperedgeIds.has(x);R.opacity=U?.22:.06,R.color=new qt(U?14216447:sd)}};return Z(e),{dispose(){N(),cancelAnimationFrame(C),window.removeEventListener("resize",Q),c.domElement.removeEventListener("pointerdown",S),c.domElement.removeEventListener("pointerup",D),c.domElement.removeEventListener("wheel",F),c.domElement.removeEventListener("touchstart",b),c.domElement.removeEventListener("touchend",D),I.removeEventListener("start",b),I.removeEventListener("end",D);for(const W of V.values())a.remove(W),W.traverse(B=>{var x;if(B instanceof we){const v=Array.isArray(B.material)?B.material:[B.material];for(const R of v)R instanceof Hh?(R.map=null,R.bumpMap=null,R.roughnessMap=null):R instanceof gn&&(R.map=null),R==null||R.dispose();(x=B.geometry)==null||x.dispose()}});V.clear(),tt&&(a.remove(tt),tt.geometry.dispose(),tt.material.dispose(),tt=null),it&&(a.remove(it),it.geometry.dispose(),it.material.dispose(),it=null);for(const W of $.values())O.remove(W),W.geometry.dispose(),W.material.dispose();$.clear(),a.remove(O),a.remove(mt),mt.geometry.dispose(),mt.material.dispose(),m.dispose(),d.dispose(),p.dispose(),wT(),u.parentElement===n&&n.removeChild(u),I.dispose(),c.dispose(),c.domElement.parentElement&&c.domElement.parentElement.removeChild(c.domElement)},setVisualState(W){Z(W)},frameBounds:W=>{const B=[];for(const k of W){const G=t.layout[k];G&&B.push(new j(G.x,G.y,G.z))}if(!B.length)return;const x=new ls().setFromPoints(B),v=new j;x.getCenter(v);const R=new j;x.getSize(R);const U=Math.max(R.length()*.65,4);I.target.copy(v),l.position.copy(v.clone().add(new j(U*.9,U*.55,U*.95))),I.update()},getCamera:()=>l}}function Pu(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const FT={class:"galaxy-page"},BT={key:0,class:"overlay center"},zT={key:1,class:"overlay center error-panel"},kT={class:"error-msg"},HT={class:"panel-card"},VT={class:"side-title"},GT={class:"side-desc"},WT={key:0,class:"block"},XT={class:"pill-list"},jT={class:"members"},qT={class:"panel-card rec"},YT={class:"rec-head"},$T={class:"block-label"},KT={key:0,class:"rec-list"},ZT={class:"rec-node"},JT={class:"rec-reason"},QT={key:2,class:"hint-promo",role:"note"},tA=pi({__name:"GalaxyView",setup(n){const t=Qr(),e=Xt("loading"),i=Xt(""),s=Xt(null),r=Xt([]),o=Xt(""),a=Xt(!1),l=Xt(!0),c=Xt(null),u=$s(null),f=Xt(new Set),h=$s(null),p=Qt(()=>{if(!s.value||!u.value)return"";const ht=u.value.nodes.find(S=>S.id===s.value);return(ht==null?void 0:ht.label)??""}),g=Qt(()=>{var C,M;if(!s.value||!u.value)return"";const ht=u.value.nodes.find(J=>J.id===s.value);if(!ht)return"";if(ht.type==="fusion"){const J=((C=ht.meta)==null?void 0:C.subtitle)??"";return J?`交叉关卡 · ${J}`:"交叉学科关卡"}const S=((M=ht.meta)==null?void 0:M.tagline)??"";return S?`专业入口 · ${S}`:"专业节点"}),_=Qt(()=>{if(!s.value||!u.value)return{ids:[],members:[]};const{hyperedgeIds:ht,memberIds:S}=is(s.value,u.value.hyperedges),C=[...S].map(M=>{var J;return((J=u.value.nodes.find(Q=>Q.id===M))==null?void 0:J.label)??M}).filter(M=>M);return{ids:ht,members:C}}),m=Qt(()=>!s.value||!u.value?new Set:new Set(is(s.value,u.value.hyperedges).hyperedgeIds)),d=Qt(()=>!s.value||!u.value?new Set:is(s.value,u.value.hyperedges).memberIds),E=Qt(()=>({pathIds:f.value,selectedId:s.value,hyperMemberIds:d.value,activeHyperedgeIds:m.value}));on(E,ht=>{var S;(S=h.value)==null||S.setVisualState(ht)}),on(s,()=>{a.value=!1,Jt(),e.value==="ready"&&T()});async function T(){try{const ht=If(),S=await $a(ht,s.value);r.value=S.suggestions??[],o.value=S.algorithm||S.note||""}catch{}}function y(){a.value=!a.value,a.value&&T()}function I(){try{const ht=sessionStorage.getItem(la);if(!ht)return null;const S=JSON.parse(ht);return!S.fromId||!S.toId||S.fromId===S.toId?null:S}catch{return null}}async function L(){if(e.value="loading",i.value="",!Pu()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const ht=I();if(!ht){t.replace({name:"select"});return}c.value=ht;try{const S=If();let C,M;try{C=await Uf(S),M=await $a(S)}catch(Q){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&S!=="./mock")C=await Uf("./mock"),M=await $a("./mock");else throw Q}r.value=M.suggestions??[],o.value=M.algorithm||M.note||"",u.value={nodes:C.nodes,edges:C.edges,hyperedges:C.hyperedges,layout:C.layout};const J=U0(u.value.edges,ht.fromId,ht.toId);f.value=new Set(J??[ht.fromId,ht.toId]),e.value="ready"}catch(S){e.value="error",i.value=S instanceof Error?S.message:"加载失败"}}function P(ht){var Q;if((Q=h.value)==null||Q.dispose(),h.value=null,!ht||!u.value||e.value!=="ready")return;const S={pathIds:f.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},C=fu(u.value.nodes),M=Cu(ht,u.value,S,Z=>{s.value=Z},{ambientStarBoost:C});h.value=M,M.setVisualState(E.value);const J=[...f.value];M.frameBounds(J.length?J:[...u.value.nodes.map(Z=>Z.id)].slice(0,6))}const N=Xt(null),w=Xt(null),b=Xt(!0),D=Xt(null),F=Xt(null);let H=!1,V=0,$=0,tt=0,it=0;function K(ht,S,C){return Math.max(S,Math.min(C,ht))}function mt(){H&&(H=!1,window.removeEventListener("pointermove",Mt),window.removeEventListener("pointerup",mt))}function Mt(ht){if(!H||!w.value)return;const S=w.value,C=ht.clientX-V,M=ht.clientY-$,J=S.getBoundingClientRect(),Q=J.width,Z=J.height;let ot=tt+C,W=it+M;ot=K(ot,8,window.innerWidth-Q-8),W=K(W,8,window.innerHeight-Z-8),D.value=ot,F.value=W}function Ct(ht){if(ht.button!==0||!w.value)return;mt(),ht.preventDefault();const S=w.value.getBoundingClientRect();H=!0,V=ht.clientX,$=ht.clientY,tt=S.left,it=S.top,D.value=S.left,F.value=S.top,window.addEventListener("pointermove",Mt),window.addEventListener("pointerup",mt)}const Ft=Qt(()=>{if(!(D.value==null||F.value==null))return{left:`${D.value}px`,top:`${F.value}px`,right:"auto",bottom:"auto"}});function Jt(){b.value=!0,D.value=null,F.value=null,mt()}ba(async()=>{await L()}),on(e,async ht=>{ht==="ready"&&(await ss(),P(N.value))}),Ta(()=>{var ht;mt(),(ht=h.value)==null||ht.dispose()});function at(){L()}function _t(){t.push({name:"select"})}function Tt(){try{sessionStorage.removeItem(la)}catch{}Cp(),t.replace({name:"select"})}function O(ht){var S,C;return((C=(S=u.value)==null?void 0:S.nodes.find(M=>M.id===ht))==null?void 0:C.label)??ht}function ut(){lt(),t.push({path:"/personal"})}function lt(){l.value=!1}function gt(){const ht=s.value;if(!ht||!u.value)return;const S=u.value.nodes.find(C=>C.id===ht);!S||S.type!=="fusion"||t.push({name:"personalStarlit",query:{fusionId:ht,title:S.label,source:"galaxy"}})}return(ht,S)=>{var C,M;return Dt(),Ot("div",FT,[e.value==="loading"?(Dt(),Ot("div",BT,[...S[1]||(S[1]=[Y("div",{class:"spinner","aria-hidden":"true"},null,-1),Y("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(Dt(),Ot("div",zT,[S[2]||(S[2]=Y("p",{class:"error-title"},"无法进入星系",-1)),Y("p",kT,Lt(i.value),1),Y("div",{class:"error-actions"},[Y("button",{type:"button",class:"btn ghost",onClick:_t},"返回选择"),Y("button",{type:"button",class:"btn primary",onClick:at},"重试")]),S[3]||(S[3]=Y("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(Dt(),Ot(Re,{key:2},[Y("div",{ref_key:"canvasHost",ref:N,class:"canvas-host"},null,512),Y("div",{class:"top-bar"},[S[4]||(S[4]=Y("div",{class:"top-left-spacer"},null,-1)),S[5]||(S[5]=Y("div",{class:"top-title"},"专业星系",-1)),Y("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:Tt},"×")]),s.value?(Dt(),Ot("button",{key:0,type:"button",class:"side-toggle",onClick:S[0]||(S[0]=J=>b.value=!b.value)},Lt(b.value?"隐藏":"显示"),1)):Ie("",!0),s.value?Bd((Dt(),Ot("aside",{key:1,ref_key:"sidePanelEl",ref:w,class:"side",style:xa(Ft.value)},[Y("div",{class:"side-drag-handle",onPointerdown:Ct},"信息面板",32),Y("section",HT,[S[8]||(S[8]=Y("p",{class:"side-eyebrow"},"选中",-1)),Y("h2",VT,Lt(p.value),1),Y("p",GT,Lt(g.value),1),_.value.ids.length?(Dt(),Ot("section",WT,[S[6]||(S[6]=Y("p",{class:"block-label"},"相关超边（融合域）",-1)),Y("ul",XT,[(Dt(!0),Ot(Re,null,Ni(_.value.ids,J=>(Dt(),Ot("li",{key:J,class:"pill"},Lt(J),1))),128))]),S[7]||(S[7]=Y("p",{class:"block-label"},"成员节点",-1)),Y("p",jT,Lt(_.value.members.join("、")),1)])):Ie("",!0),((M=(C=u.value)==null?void 0:C.nodes.find(J=>J.id===s.value))==null?void 0:M.type)==="fusion"?(Dt(),Ot("button",{key:1,type:"button",class:"btn primary full",onClick:gt}," 去练 ")):Ie("",!0)]),Y("section",qT,[Y("div",YT,[Y("p",$T,"推荐下一步"+Lt(o.value?`（${o.value}）`:""),1),Y("button",{type:"button",class:"btn rec-toggle",onClick:y},Lt(a.value?"收起":"展开"),1)]),a.value?(Dt(),Ot("ul",KT,[(Dt(!0),Ot(Re,null,Ni(r.value,J=>(Dt(),Ot("li",{key:J.nodeId},[Y("span",ZT,Lt(O(J.nodeId)),1),Y("span",JT,Lt(J.reason),1)]))),128))])):Ie("",!0)])],4)),[[I_,b.value]]):l.value?(Dt(),Ot("div",QT,[Y("button",{type:"button",class:"hint-dismiss","aria-label":"关闭",onClick:Di(lt,["stop"])},"×"),S[9]||(S[9]=Y("p",{class:"promo-title"},"个人专业星图",-1)),Y("button",{type:"button",class:"btn promo-cta",onClick:ut},"进入个人星图")])):Ie("",!0)],64))])}}}),eA=zi(tA,[["__scopeId","data-v-ba173f4d"]]),nA={class:"hub"},iA=pi({__name:"PersonalGalaxyHubView",setup(n){const t=yn(Jr);if(!t)throw new Error("[PersonalGalaxyHubView] router inject failed");function e(){t.push({path:"/personal/design"})}function i(){t.push({path:"/personal/showcase"})}function s(){t.replace({path:"/galaxy"})}return(r,o)=>(Dt(),Ot("div",nA,[Y("header",{class:"bar"},[Y("button",{type:"button",class:"ghost",onClick:s},"← 大星图"),o[0]||(o[0]=Y("div",{class:"bar-center"},[Y("p",{class:"eyebrow"},"OfferCat · Galaxy"),Y("h1",{class:"title"},"个人专业星图")],-1)),o[1]||(o[1]=Y("span",{class:"spacer","aria-hidden":"true"},null,-1))]),Y("main",{class:"main"},[o[4]||(o[4]=Y("p",{class:"lead"}," 与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。 ",-1)),Y("button",{type:"button",class:"card card--primary",onClick:e},[...o[2]||(o[2]=[Y("span",{class:"card-kicker"},"编辑",-1),Y("span",{class:"card-title"},"设计专属星图",-1),Y("span",{class:"card-desc"},"添加大行星、连边、三选一岗位，保存到本机。",-1)])]),Y("button",{type:"button",class:"card card--ghost",onClick:i},[...o[3]||(o[3]=[Y("span",{class:"card-kicker"},"只读",-1),Y("span",{class:"card-title"},"展示已保存星图",-1),Y("span",{class:"card-desc"},"进入前请先在设计页保存至少一颗大行星或一条融合。",-1)])])])]))}}),sA=zi(iA,[["__scopeId","data-v-6f79a23c"]]),rd={major_electrical:"电气工程",major_law:"法学",major_accounting:"会计学",major_cs:"计算机科学",major_finance:"金融学",major_clinical:"临床医学",major_swe:"软件工程",major_marketing:"市场营销",major_ds:"数据科学",major_english:"英语"};function rA(n,t){const e=rd[n],i=rd[t];return!e||!i?["",""]:[`${e}×${i}`,`${i}×${e}`]}function oA(n){const t=n.split(/\r?\n/).filter(i=>i.trim().length>0),e=[];for(let i=0;i<t.length;i++){const s=t[i];if(s.startsWith("序号")||s.startsWith("	序号"))continue;const r=s.split("	");if(r.length<11)continue;const o=Number.parseInt(r[0],10);Number.isFinite(o)&&e.push({idx:o,pair:r[1].trim(),title:r[2].trim(),heat:r[3].trim(),salaryJunior:r[4].trim(),salaryMid:r[5].trim(),salarySenior:r[6].trim(),workIntensity:r[7].trim(),competition:r[8].trim(),education:r[9].trim(),skills:r[10].trim()})}return e}let Ho=null;async function aA(){if(Ho)return Ho;const n="./data/cross_job_catalog.tsv".replace(/\/{2,}/g,"/"),t=await fetch(n);if(!t.ok)throw new Error(`无法加载岗位表: ${t.status}`);const e=await t.text();return Ho=oA(e),Ho}async function od(n,t){const[e,i]=rA(n,t);if(!e)return[];const r=(await aA()).filter(o=>o.pair===e||o.pair===i);return r.length>=3?r.slice(0,3):r}function lA(){try{const n=sessionStorage.getItem(la);if(!n)return!1;const t=JSON.parse(n);return!!(t!=null&&t.fromId&&(t!=null&&t.toId)&&t.fromId!==t.toId)}catch{return!1}}function cA(n){if(!lA()){n.replace({name:"select"});return}n.replace({name:"galaxy"})}function uA(n){n.push({name:"personalDesign"})}function fA(){try{const n=window.history.state;return n!=null&&n.back!=null&&n.back!==""}catch{return!1}}function Em(n,t){if(fA()){n.back();return}n.replace(t)}function hA(n){cA(n)}const dA={class:"personal-root"},pA={key:0,class:"loading-overlay"},mA={key:1,class:"err-banner"},gA={key:2,class:"save-toast"},_A={class:"control-panel"},vA={class:"tb-block"},xA={class:"major-grid"},yA=["onClick"],MA=["disabled"],SA={class:"tb-block"},EA={key:0,class:"hint"},bA={key:0,class:"tb-block fusion-strip"},TA={class:"fusion-strip-title"},AA={key:1,class:"tb-block"},wA={class:"mono"},RA={key:2,class:"tb-block muted"},CA={id:"fusion-sheet-heading",class:"fusion-sheet-title"},PA={class:"fusion-sheet-dl"},DA={class:"modal"},LA=["onClick"],IA={class:"jt"},UA={class:"jd"},NA=pi({__name:"PersonalGalaxyView",setup(n){const t=Qr(),e=Xt("loading"),i=Xt(""),s=Xt(null),r=Xt(!1),o=Xt(null),a=Xt([]),l=Xt([]),c=Xt({open:!1,aId:"",bId:"",options:[]}),u=Xt(null),f=Xt(""),h=Xt(null),p=$s(null),g=Qt(()=>Lp(a.value,l.value)),_=Qt(()=>u.value?is(u.value,g.value.hyperedges).memberIds:new Set),m=Qt(()=>u.value?new Set(is(u.value,g.value.hyperedges).hyperedgeIds):new Set),d=Qt(()=>({pathIds:new Set,selectedId:u.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));on(d,D=>{var F;(F=p.value)==null||F.setVisualState(D)});const E=Qt(()=>u.value?l.value.find(D=>D.id===u.value)??null:null),T=Qt(()=>u.value?a.value.find(D=>D.id===u.value)??null:null);function y(){var V;const D=h.value,F=g.value;if((V=p.value)==null||V.dispose(),p.value=null,!D||F.nodes.length===0)return;const H=fu(F.nodes);p.value=Cu(D,F,d.value,$=>{if(u.value=$,!$||!r.value||!a.value.some(mt=>mt.id===$))return;if(!o.value){o.value=$;return}if(o.value===$)return;const it=a.value.find(mt=>mt.id===o.value),K=a.value.find(mt=>mt.id===$);!it||!K||I(it,K)},{ambientStarBoost:H}),p.value.setVisualState(d.value),p.value.frameBounds(F.nodes.map($=>$.id))}on(g,async()=>{e.value==="ready"&&(await ss(),y())});async function I(D,F){try{const H=await od(D.majorId,F.majorId);if(H.length===0){i.value=`《具体专业》表中暂无「${D.label}×${F.label}」组合的三岗数据，请换一对学科。`,o.value=null;return}c.value={open:!0,aId:D.id,bId:F.id,options:H}}catch(H){i.value=H instanceof Error?H.message:"加载岗位表失败"}finally{o.value=null}}function L(D){const{aId:F,bId:H}=c.value,V=`f_${Date.now()}`;l.value.push({id:V,title:D.title,majorA:F,majorB:H,row:D}),c.value.open=!1,c.value.options=[],r.value=!1,u.value=V}function P(){c.value.open=!1,c.value.options=[],o.value=null}function N(){if(!s.value)return;const D=Br.find(H=>H.id===s.value);if(!D)return;const F=`m_${s.value}_${Date.now()}`;a.value.push({id:F,majorId:D.id,label:D.label}),s.value=null}async function w(){const D=F0(a.value,l.value);Ip(D),(await z0(D)).ok?f.value="已保存到本地，并已同步服务端。":or()?f.value="已保存到本地（同步服务端失败，请稍后重试）。":f.value="已保存到本机（未配置 galaxyApiBase / 未登录，未同步云端）。",window.setTimeout(()=>{f.value=""},3200)}function b(){Em(t,{name:"personalHub"})}return ba(async()=>{var F;if(!Pu()){e.value="error",i.value="当前环境不支持 WebGL";return}try{await od("major_electrical","major_law")}catch(H){e.value="error",i.value=H instanceof Error?H.message:"预加载岗位表失败";return}const D=await $l();(F=D==null?void 0:D.majors)!=null&&F.length&&(a.value=[...D.majors],l.value=[...D.fusions]),e.value="ready",await ss(),y()}),Ta(()=>{var D;(D=p.value)==null||D.dispose(),p.value=null}),(D,F)=>(Dt(),Ot("div",dA,[e.value==="loading"?(Dt(),Ot("div",pA,"加载岗位数据…")):Ie("",!0),e.value==="error"?(Dt(),Ot("div",mA,Lt(i.value),1)):Ie("",!0),Y("header",{class:"top-bar"},[Y("button",{type:"button",class:"back-btn",onClick:b},"返回"),F[4]||(F[4]=Y("div",{class:"top-titles"},[Y("h1",{class:"title"},"设计专属星图"),Y("p",{class:"subtitle"},"与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。")],-1)),Y("button",{type:"button",class:"save-btn",onClick:w},"保存星系")]),f.value?(Dt(),Ot("p",gA,Lt(f.value),1)):Ie("",!0),Y("div",{ref_key:"canvasHost",ref:h,class:"canvas-wrap"},null,512),Y("div",_A,[Y("section",vA,[F[5]||(F[5]=Y("p",{class:"label"},"① 添加大行星（10 学科）",-1)),Y("div",xA,[(Dt(!0),Ot(Re,null,Ni(Je(Br),H=>(Dt(),Ot("button",{key:H.id,type:"button",class:Ui(["chip",{active:s.value===H.id}]),onClick:V=>s.value=H.id},Lt(H.label),11,yA))),128))]),Y("button",{type:"button",class:"primary full",disabled:!s.value,onClick:N}," 放入星空 ",8,MA)]),Y("section",SA,[F[6]||(F[6]=Y("p",{class:"label"},"② 连边并生成交叉岗位",-1)),Y("button",{type:"button",class:Ui(["secondary full",{on:r.value}]),onClick:F[0]||(F[0]=H=>{r.value=!r.value,o.value=null})},Lt(r.value?"连边模式已开 · 依次点两颗大行星":"开启连边模式"),3),r.value?(Dt(),Ot("p",EA,"在星空中先点一颗，再点另一颗；有数据则弹出三选一。")):Ie("",!0)]),E.value?(Dt(),Ot("section",bA,[F[7]||(F[7]=Y("p",{class:"label"},"当前小行星",-1)),Y("p",TA,Lt(E.value.title),1),F[8]||(F[8]=Y("p",{class:"hint fusion-strip-hint"},"四象详情见下方弹层；点击星空空白处可取消选中。",-1))])):T.value?(Dt(),Ot("section",AA,[F[9]||(F[9]=Y("p",{class:"label"},"当前选中",-1)),Y("p",wA,"大行星 · "+Lt(T.value.label),1)])):(Dt(),Ot("section",RA,[...F[10]||(F[10]=[Y("p",{class:"hint"},"提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。",-1)])]))]),(Dt(),rs(Vr,{to:"body"},[E.value?(Dt(),Ot("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"fusion-sheet-heading",onClick:F[3]||(F[3]=Di(H=>u.value=null,["self"]))},[Y("div",{class:"fusion-sheet",onClick:F[2]||(F[2]=Di(()=>{},["stop"]))},[F[15]||(F[15]=Y("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),Y("h3",CA,Lt(E.value.title),1),F[16]||(F[16]=Y("p",{class:"fusion-sheet-sub"},"四象属性（岗位表 · 完整）",-1)),Y("dl",PA,[F[11]||(F[11]=Y("dt",null,"热度/年薪",-1)),Y("dd",null,Lt(E.value.row.heat)+" · 初级年薪 "+Lt(E.value.row.salaryJunior)+" · 中级年薪 "+Lt(E.value.row.salaryMid),1),F[12]||(F[12]=Y("dt",null,"强度/竞争",-1)),Y("dd",null,Lt(E.value.row.workIntensity)+"级 · "+Lt(E.value.row.competition),1),F[13]||(F[13]=Y("dt",null,"学历门槛",-1)),Y("dd",null,Lt(E.value.row.education),1),F[14]||(F[14]=Y("dt",null,"学科技能",-1)),Y("dd",null,Lt(E.value.row.skills),1)]),Y("button",{type:"button",class:"fusion-sheet-close",onClick:F[1]||(F[1]=H=>u.value=null)},"收起")])])):Ie("",!0)])),(Dt(),rs(Vr,{to:"body"},[c.value.open?(Dt(),Ot("div",{key:0,class:"modal-mask",onClick:Di(P,["self"])},[Y("div",DA,[F[17]||(F[17]=Y("h2",null,"三选一 · 确立小行星",-1)),F[18]||(F[18]=Y("p",{class:"modal-sub"},"数据来源：《具体专业》岗位表（同组合前三条）",-1)),Y("ul",null,[(Dt(!0),Ot(Re,null,Ni(c.value.options,(H,V)=>(Dt(),Ot("li",{key:V},[Y("button",{type:"button",class:"job-btn",onClick:$=>L(H)},[Y("span",IA,Lt(H.title),1),Y("span",UA,Lt(H.heat)+" · 中级年薪 "+Lt(H.salaryMid)+" · 竞争 "+Lt(H.competition),1)],8,LA)]))),128))]),Y("button",{type:"button",class:"ghost full",onClick:P},"取消")])])):Ie("",!0)]))]))}}),OA=zi(NA,[["__scopeId","data-v-664062ed"]]),bm="offercat_starlit_leaderboard_v1",Tm="offercat_starlit_self_name_v1";function Cl(){return{v:1,entries:[]}}function FA(){try{const n=localStorage.getItem(bm);if(!n)return Cl();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.entries)?Cl():t}catch{return Cl()}}function BA(n){try{localStorage.setItem(bm,JSON.stringify(n))}catch{}}function Hc(){var n;try{const t=(n=localStorage.getItem(Tm))==null?void 0:n.trim();if(t)return t}catch{}return"我"}function zA(n){try{localStorage.setItem(Tm,n.trim().slice(0,20)||"我")}catch{}}async function kA(n,t){const e=n??ar()??0;if(e>0)try{const{fetchStarlitLeaderboard:i}=await cs(async()=>{const{fetchStarlitLeaderboard:r}=await import("./galaxy-chunk-d6bTbbna.js");return{fetchStarlitLeaderboard:r}},[],import.meta.url);return(await i(e,t)).rows.map(r=>({id:r.self?"__self__":`u_${r.userId}`,displayName:r.displayName,totalStars:r.totalStars,updatedAt:Date.now(),isSelf:r.self}))}catch{}return Vc()}function Vc(){const n=H0(),t=Hc(),e="__self__",i=Date.now();let r=FA().entries.filter(l=>l.id!==e);r.length||(r=[{id:"demo_1",displayName:"星尘旅人",totalStars:Math.max(0,n-12),updatedAt:i-864e5},{id:"demo_2",displayName:"交叉探索者",totalStars:Math.max(0,n-28),updatedAt:i-1728e5},{id:"demo_3",displayName:"轨道观测员",totalStars:Math.max(0,n-45),updatedAt:i-2592e5}]);const o={id:e,displayName:t,totalStars:n,updatedAt:i,isSelf:!0},a=[...r.filter(l=>l.id!==e),o];return a.sort((l,c)=>c.totalStars-l.totalStars||l.displayName.localeCompare(c.displayName,"zh")),BA({v:1,entries:a.map(({isSelf:l,...c})=>c)}),a.map(l=>({...l,isSelf:l.id===e}))}const HA={class:"lb-head"},VA={class:"lb-sub"},GA={class:"lb-name-row"},WA={class:"lb-hint"},XA={class:"lb-list"},jA={class:"lb-rank"},qA={class:"lb-name"},YA={class:"lb-stars"},$A=pi({__name:"StarlitLeaderboardPanel",props:{open:{type:Boolean},fusionIds:{},userId:{},packKeys:{}},emits:["close"],setup(n,{emit:t}){const e=n,i=t,s=Xt(Vc()),r=Xt(Hc()),o=Qt(()=>Fp(e.fusionIds));async function a(){const c=e.userId??0;s.value=c>0?await kA(c,e.packKeys):Vc(),r.value=Hc()}function l(){zA(r.value),a()}return on(()=>e.open,c=>{c&&a()}),on(()=>e.fusionIds,()=>{e.open&&a()},{deep:!0}),(c,u)=>(Dt(),rs(Vr,{to:"body"},[n.open?(Dt(),Ot("div",{key:0,class:"lb-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"starlit-lb-title",onClick:u[3]||(u[3]=Di(f=>i("close"),["self"]))},[Y("div",{class:"lb-card",onClick:u[2]||(u[2]=Di(()=>{},["stop"]))},[Y("header",HA,[Y("div",null,[u[4]||(u[4]=Y("h2",{id:"starlit-lb-title",class:"lb-title"},"点亮排行榜",-1)),Y("p",VA,"按已点亮星数排序 · 本星系合计 "+Lt(o.value)+" 星",1)]),Y("button",{type:"button",class:"lb-close","aria-label":"关闭",onClick:u[0]||(u[0]=f=>i("close"))},"×")]),Y("div",GA,[u[5]||(u[5]=Y("label",{class:"lb-name-label",for:"lb-self-name"},"我的昵称",-1)),Bd(Y("input",{id:"lb-self-name","onUpdate:modelValue":u[1]||(u[1]=f=>r.value=f),class:"lb-name-input",maxlength:"20",placeholder:"展示在榜上",onChange:l,onKeydown:tv(l,["enter"])},null,544),[[K_,r.value]])]),Y("p",WA," 总星数 = 各小行星点亮之和（每颗最多 "+Lt(Je(Li))+"）。已配置网关时从服务端拉取全站排行。 ",1),Y("ol",XA,[(Dt(!0),Ot(Re,null,Ni(s.value,(f,h)=>(Dt(),Ot("li",{key:f.id,class:Ui(["lb-row",{self:f.isSelf}])},[Y("span",jA,Lt(h+1),1),Y("span",qA,Lt(f.displayName),1),Y("span",YA,Lt(f.totalStars)+" 星",1)],2))),128))])])])):Ie("",!0)]))}}),KA=zi($A,[["__scopeId","data-v-d6ee7af2"]]),ZA={class:"showcase-root"},JA={class:"bar"},QA={class:"mid"},tw={key:0,class:"sub"},ew={key:1,class:"sub muted"},nw={key:0,class:"overlay"},iw={key:1,class:"overlay err"},sw={key:2,class:"overlay empty"},rw={class:"lb-fab-sub"},ow={id:"showcase-fusion-title",class:"fusion-sheet-title"},aw={class:"fusion-sheet-dl"},lw={class:"starlit-hint"},cw=pi({__name:"PersonalGalaxyShowcaseView",setup(n){const t=Qr(),e=wp(),i=Xt("loading"),s=Xt(""),r=$s(null),o=Xt(null),a=Xt(!1),l=Xt(0),c=Xt([]),u=Qt(()=>ar()),f=Xt(null),h=$s(null),p=Qt(()=>{const V=r.value;return V?Lp(V.majors,V.fusions):null}),g=Qt(()=>!o.value||!p.value?new Set:is(o.value,p.value.hyperedges).memberIds),_=Qt(()=>!o.value||!p.value?new Set:new Set(is(o.value,p.value.hyperedges).hyperedgeIds)),m=Qt(()=>({pathIds:new Set,selectedId:o.value,hyperMemberIds:g.value,activeHyperedgeIds:_.value}));on(m,V=>{var $;($=h.value)==null||$.setVisualState(V)});const d=Qt(()=>!o.value||!r.value?null:r.value.fusions.find(V=>V.id===o.value)??null),E=Qt(()=>{var V;return!o.value||!p.value?"":((V=p.value.nodes.find($=>$.id===o.value))==null?void 0:V.label)??""}),T=Qt(()=>{var V;return l.value,((V=r.value)==null?void 0:V.fusions.map($=>$.id))??[]}),y=Qt(()=>(l.value,Fp(T.value)));function I(){l.value+=1,i.value==="ready"&&N()}async function L(){var $;I();const V=(($=r.value)==null?void 0:$.fusions)??[];c.value=V.map(tt=>uu(tt)).filter(tt=>!!tt),a.value=!0}function P(V){(V.key===null||V.key==="offercat_personal_starlit_v1")&&I()}function N(){var it;const V=f.value,$=p.value;if((it=h.value)==null||it.dispose(),h.value=null,!V||!$||$.nodes.length===0)return;const tt=fu($.nodes);h.value=Cu(V,$,m.value,K=>{o.value=K},{ambientStarBoost:tt}),h.value.setVisualState(m.value),h.value.frameBounds($.nodes.map(K=>K.id))}function w(){uA(t)}function b(){Em(t,{name:"personalHub"})}function D(){o.value=null}function F(){const V=d.value;V&&t.push({name:"personalStarlit",query:{fusionId:V.id}})}on(()=>e.fullPath,async()=>{var V,$;e.name==="personalShowcase"&&(I(),i.value==="ready"&&(r.value=await $l(),($=(V=r.value)==null?void 0:V.fusions)!=null&&$.length&&await Kl(r.value.fusions),I(),await ss(),N()))});const H=()=>L();return ba(async()=>{var $;if(window.addEventListener("storage",P),window.addEventListener("galaxy-open-leaderboard",H),window.__GALAXY_OPEN_LEADERBOARD__=()=>window.dispatchEvent(new CustomEvent("galaxy-open-leaderboard")),Yl("personalShowcase"),!Pu()){i.value="error",s.value="当前环境不支持 WebGL";return}const V=await $l();if(r.value=V,($=V==null?void 0:V.fusions)!=null&&$.length&&await Kl(V.fusions),!V||V.majors.length===0&&V.fusions.length===0){i.value="empty";return}i.value="ready",await ss(),I(),N()}),Ta(()=>{var V;window.removeEventListener("storage",P),window.removeEventListener("galaxy-open-leaderboard",H),delete window.__GALAXY_OPEN_LEADERBOARD__,Yl(e.name),(V=h.value)==null||V.dispose(),h.value=null}),(V,$)=>(Dt(),Ot("div",ZA,[Y("header",JA,[Y("button",{type:"button",class:"ghost",onClick:b},"返回"),Y("div",QA,[$[2]||($[2]=Y("h1",{class:"title"},"展示星图",-1)),E.value?(Dt(),Ot("p",tw,Lt(E.value),1)):(Dt(),Ot("p",ew,"点击小行星查看四象与点亮星辰"))]),Y("button",{type:"button",class:"lb-trigger",onClick:L}," 排行榜 · "+Lt(y.value)+" 星 ",1)]),i.value==="loading"?(Dt(),Ot("div",nw,"加载…")):i.value==="error"?(Dt(),Ot("div",iw,Lt(s.value),1)):i.value==="empty"?(Dt(),Ot("div",sw,[$[3]||($[3]=Y("p",null,"还没有已保存的个人星系。",-1)),Y("button",{type:"button",class:"cta",onClick:w},"返回去设计")])):(Dt(),Ot("div",{key:3,ref_key:"canvasHost",ref:f,class:"canvas"},null,512)),(Dt(),rs(Vr,{to:"body"},[i.value==="ready"?(Dt(),Ot("button",{key:0,type:"button",class:"lb-fab","aria-label":"打开点亮排行榜",onClick:L},[$[4]||($[4]=Y("span",{class:"lb-fab-title"},"排行榜",-1)),Y("span",rw,Lt(y.value)+" 星",1)])):Ie("",!0)])),(Dt(),rs(Vr,{to:"body"},[d.value?(Dt(),Ot("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"showcase-fusion-title",onClick:Di(D,["self"])},[Y("div",{class:"fusion-sheet",onClick:$[0]||($[0]=Di(()=>{},["stop"]))},[$[10]||($[10]=Y("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),Y("h2",ow,Lt(d.value.title),1),$[11]||($[11]=Y("p",{class:"fusion-sheet-sub"},"四象属性 · 已保存数据",-1)),Y("dl",aw,[$[5]||($[5]=Y("dt",null,"热度/年薪",-1)),Y("dd",null,Lt(d.value.row.heat)+" · 初级年薪 "+Lt(d.value.row.salaryJunior)+" · 中级年薪 "+Lt(d.value.row.salaryMid),1),$[6]||($[6]=Y("dt",null,"强度/竞争",-1)),Y("dd",null,Lt(d.value.row.workIntensity)+"级 · "+Lt(d.value.row.competition),1),$[7]||($[7]=Y("dt",null,"学历门槛",-1)),Y("dd",null,Lt(d.value.row.education),1),$[8]||($[8]=Y("dt",null,"学科技能",-1)),Y("dd",null,Lt(d.value.row.skills),1)]),Y("p",lw,[$[9]||($[9]=Hl(" 已点亮 ",-1)),Y("strong",null,Lt(Je(to)(d.value.id)),1),Hl(" / "+Lt(Je(Li))+" 颗星（本图合计 "+Lt(y.value)+" 星）；答题正确可继续点亮。 ",1)]),Y("button",{type:"button",class:"fusion-sheet-primary",onClick:F},"点亮星辰 · 去答题"),Y("button",{type:"button",class:"fusion-sheet-close",onClick:D},"收起")])])):Ie("",!0)])),Ke(KA,{open:a.value,"fusion-ids":T.value,"user-id":u.value??void 0,"pack-keys":c.value,onClose:$[1]||($[1]=tt=>a.value=!1)},null,8,["open","fusion-ids","user-id","pack-keys"])]))}}),uw=zi(cw,[["__scopeId","data-v-73a45d70"]]),fw={class:"quiz-root"},hw={class:"bar"},dw={class:"mid"},pw={class:"sub"},mw={key:0,class:"sub api-tag"},gw={key:0,class:"empty"},_w={class:"star-strip","aria-label":"已点亮星数"},vw={class:"star-label"},xw={class:"star-dots",role:"list"},yw={key:0,class:"loading"},Mw={key:1,class:"done"},Sw={key:2,class:"q-card"},Ew={class:"q-text"},bw={class:"q-opts"},Tw=["onClick"],Aw={key:3,class:"toast",role:"status"},ww=pi({__name:"PersonalStarlitQuizView",setup(n){const t=wp(),e=Qr(),i=Qt(()=>String(t.query.fusionId||"")),s=Qt(()=>{const T=t.query.title;if(typeof T=="string"&&T.trim())return T;const y=i.value;if(!y)return"小行星";const I=Vs(),L=I==null?void 0:I.fusions.find(P=>P.id===y);return(L==null?void 0:L.title)??"小行星"});function r(T){const y=[],I=["正确","错误","视场景而定","以上皆非"];for(let L=0;L<Of;L++){const P=L%4,N=`【${T}】第 ${L+1} / ${Of} 题（占位）：与交叉岗位相关的表述，选项「${I[P]}」为本题预设答案。`;y.push({idx:L,text:N,options:[...I],correct:P})}return y}const o=Xt([]),a=Xt(0),l=Xt(0),c=Xt(""),u=Xt(!1),f=Xt(!1),h=Xt("mock");async function p(T,y){f.value=!0,o.value=[];try{const I=Vs();if(or()&&I){const L=Up(T,I.fusions);if(L){const{fetchStarlitQuestions:P}=await cs(async()=>{const{fetchStarlitQuestions:w}=await import("./galaxy-chunk-d6bTbbna.js");return{fetchStarlitQuestions:w}},[],import.meta.url),N=await P(L);if(N.length>0){o.value=N.map(w=>({idx:w.questionNo-1,text:w.stem,options:w.options,correct:w.correctIndex})),h.value="api";return}}}}catch{}finally{o.value.length||(o.value=r(y),h.value="mock"),f.value=!1}}on([i,s],async([T])=>{var I;if(!T)return;const y=Vs();(I=y==null?void 0:y.fusions)!=null&&I.length&&await Kl(y.fusions),l.value=to(T),a.value=0,u.value=!1,await p(T,s.value)},{immediate:!0});const g=Qt(()=>o.value[a.value]??null);function _(T){c.value=T,window.setTimeout(()=>{c.value=""},1400)}function m(T){if(!i.value||u.value||!g.value)return;const y=g.value;if(T===y.correct){if(l.value=V0(i.value),_("点亮 +1 星"),a.value>=o.value.length-1||l.value>=Li){u.value=!0;return}a.value+=1}else _("再想想看")}function d(){hA(e)}function E(){_("对接题库：uni.navigateTo 刷题页（占位）")}return(T,y)=>(Dt(),Ot("div",fw,[Y("header",hw,[Y("button",{type:"button",class:"ghost",onClick:d},"← 退出"),Y("div",dw,[y[0]||(y[0]=Y("h1",{class:"title"},"点亮星辰",-1)),Y("p",pw,Lt(s.value),1),h.value==="api"?(Dt(),Ot("p",mw,"题库来自服务端")):Ie("",!0)]),y[1]||(y[1]=Y("span",{class:"spacer"},null,-1))]),i.value?(Dt(),Ot(Re,{key:1},[Y("section",_w,[Y("div",vw,"已点亮 "+Lt(l.value)+" / "+Lt(Je(Li))+" 星",1),Y("div",xw,[(Dt(!0),Ot(Re,null,Ni(Je(Li),I=>(Dt(),Ot("span",{key:I,class:Ui(["dot",{on:I<=l.value}]),role:"listitem"},null,2))),128))])]),f.value?(Dt(),Ot("div",yw,"加载题目…")):u.value?(Dt(),Ot("section",Mw,[y[3]||(y[3]=Y("p",null,"本套题目已完成或已达星数上限。",-1)),Y("button",{type:"button",class:"cta",onClick:d},"返回展示星图")])):g.value?(Dt(),Ot("section",Sw,[Y("p",Ew,Lt(g.value.text),1),Y("div",bw,[(Dt(!0),Ot(Re,null,Ni(g.value.options,(I,L)=>(Dt(),Ot("button",{key:L,type:"button",class:"q-opt",onClick:P=>m(L)},Lt(String.fromCharCode(65+L))+". "+Lt(I),9,Tw))),128))])])):Ie("",!0),c.value?(Dt(),Ot("p",Aw,Lt(c.value),1)):Ie("",!0),Y("footer",{class:"foot"},[Y("button",{type:"button",class:"ghost wide",onClick:E},"去题库刷题（占位）")])],64)):(Dt(),Ot("div",gw,[y[2]||(y[2]=Y("p",null,"缺少小行星参数。",-1)),Y("button",{type:"button",class:"cta",onClick:d},"退出")]))]))}}),Rw=zi(ww,[["__scopeId","data-v-dae7909b"]]),Cw=qv(void 0),Am=m0({history:Cw,routes:[{path:"/",name:"select",component:P0},{path:"/galaxy",name:"galaxy",component:eA},{path:"/personal/design",name:"personalDesign",component:OA},{path:"/personal/showcase",name:"personalShowcase",component:uw},{path:"/personal/starlit",name:"personalStarlit",component:Rw},{path:"/personal",name:"personalHub",component:sA},{path:"/personal-galaxy",redirect:{name:"personalHub"}}]});Am.afterEach(n=>{Yl(n.name)});iv(lv).use(Am).mount("#app");export{cu as a,Pp as g};
