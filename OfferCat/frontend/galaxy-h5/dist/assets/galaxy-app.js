(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Jc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const he={},Ws=[],Hn=()=>{},vd=()=>!1,Ea=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ba=n=>n.startsWith("onUpdate:"),Ne=Object.assign,Qc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Hm=Object.prototype.hasOwnProperty,le=(n,t)=>Hm.call(n,t),Xt=Array.isArray,Xs=n=>Qr(n)==="[object Map]",xd=n=>Qr(n)==="[object Set]",Gu=n=>Qr(n)==="[object Date]",Yt=n=>typeof n=="function",xe=n=>typeof n=="string",Vn=n=>typeof n=="symbol",ue=n=>n!==null&&typeof n=="object",yd=n=>(ue(n)||Yt(n))&&Yt(n.then)&&Yt(n.catch),Md=Object.prototype.toString,Qr=n=>Md.call(n),Vm=n=>Qr(n).slice(8,-1),Sd=n=>Qr(n)==="[object Object]",tu=n=>xe(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Lr=Jc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ta=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Gm=/-\w/g,Je=Ta(n=>n.replace(Gm,t=>t.slice(1).toUpperCase())),Wm=/\B([A-Z])/g,Vi=Ta(n=>n.replace(Wm,"-$1").toLowerCase()),Aa=Ta(n=>n.charAt(0).toUpperCase()+n.slice(1)),ja=Ta(n=>n?`on${Aa(n)}`:""),kn=(n,t)=>!Object.is(n,t),jo=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Ed=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},eu=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Wu;const wa=()=>Wu||(Wu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ra(n){if(Xt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=xe(i)?Ym(i):Ra(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(xe(n)||ue(n))return n}const Xm=/;(?![^(]*\))/g,jm=/:([^]+)/,qm=/\/\*[^]*?\*\//g;function Ym(n){const t={};return n.replace(qm,"").split(Xm).forEach(e=>{if(e){const i=e.split(jm);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Fi(n){let t="";if(xe(n))t=n;else if(Xt(n))for(let e=0;e<n.length;e++){const i=Fi(n[e]);i&&(t+=i+" ")}else if(ue(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const $m="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Km=Jc($m);function bd(n){return!!n||n===""}function Zm(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=nu(n[i],t[i]);return e}function nu(n,t){if(n===t)return!0;let e=Gu(n),i=Gu(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=Vn(n),i=Vn(t),e||i)return n===t;if(e=Xt(n),i=Xt(t),e||i)return e&&i?Zm(n,t):!1;if(e=ue(n),i=ue(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!nu(n[o],t[o]))return!1}}return String(n)===String(t)}const Td=n=>!!(n&&n.__v_isRef===!0),It=n=>xe(n)?n:n==null?"":Xt(n)||ue(n)&&(n.toString===Md||!Yt(n.toString))?Td(n)?It(n.value):JSON.stringify(n,Ad,2):String(n),Ad=(n,t)=>Td(t)?Ad(n,t.value):Xs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[qa(i,r)+" =>"]=s,e),{})}:xd(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>qa(e))}:Vn(t)?qa(t):ue(t)&&!Xt(t)&&!Sd(t)?String(t):t,qa=(n,t="")=>{var e;return Vn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ue;class Jm{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ue&&(Ue.active?(this.parent=Ue,this.index=(Ue.scopes||(Ue.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Ue;try{return Ue=this,t()}finally{Ue=e}}}on(){++this._on===1&&(this.prevScope=Ue,Ue=this)}off(){if(this._on>0&&--this._on===0){if(Ue===this)Ue=this.prevScope;else{let t=Ue;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Qm(){return Ue}let me;const Ya=new WeakSet;class wd{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ue&&(Ue.active?Ue.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ya.has(this)&&(Ya.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Cd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Xu(this),Pd(this);const t=me,e=Pn;me=this,Pn=!0;try{return this.fn()}finally{Dd(this),me=t,Pn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)ru(t);this.deps=this.depsTail=void 0,Xu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ya.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Hl(this)&&this.run()}get dirty(){return Hl(this)}}let Rd=0,Ur,Nr;function Cd(n,t=!1){if(n.flags|=8,t){n.next=Nr,Nr=n;return}n.next=Ur,Ur=n}function iu(){Rd++}function su(){if(--Rd>0)return;if(Nr){let t=Nr;for(Nr=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Ur;){let t=Ur;for(Ur=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function Pd(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Dd(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),ru(i),tg(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Hl(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Id(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Id(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Vr)||(n.globalVersion=Vr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Hl(n))))return;n.flags|=2;const t=n.dep,e=me,i=Pn;me=n,Pn=!0;try{Pd(n);const s=n.fn(n._value);(t.version===0||kn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{me=e,Pn=i,Dd(n),n.flags&=-3}}function ru(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)ru(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function tg(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Pn=!0;const Ld=[];function hi(){Ld.push(Pn),Pn=!1}function di(){const n=Ld.pop();Pn=n===void 0?!0:n}function Xu(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=me;me=void 0;try{t()}finally{me=e}}}let Vr=0;class eg{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ou{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!me||!Pn||me===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==me)e=this.activeLink=new eg(me,this),me.deps?(e.prevDep=me.depsTail,me.depsTail.nextDep=e,me.depsTail=e):me.deps=me.depsTail=e,Ud(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=me.depsTail,e.nextDep=void 0,me.depsTail.nextDep=e,me.depsTail=e,me.deps===e&&(me.deps=i)}return e}trigger(t){this.version++,Vr++,this.notify(t)}notify(t){iu();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{su()}}}function Ud(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Ud(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Vl=new WeakMap,rs=Symbol(""),Gl=Symbol(""),Gr=Symbol("");function Be(n,t,e){if(Pn&&me){let i=Vl.get(n);i||Vl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new ou),s.map=i,s.key=e),s.track()}}function ri(n,t,e,i,s,r){const o=Vl.get(n);if(!o){Vr++;return}const a=l=>{l&&l.trigger()};if(iu(),t==="clear")o.forEach(a);else{const l=Xt(n),c=l&&tu(e);if(l&&e==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===Gr||!Vn(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Gr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(rs)),Xs(n)&&a(o.get(Gl)));break;case"delete":l||(a(o.get(rs)),Xs(n)&&a(o.get(Gl)));break;case"set":Xs(n)&&a(o.get(rs));break}}su()}function ys(n){const t=ae(n);return t===n?t:(Be(t,"iterate",Gr),yn(n)?t:t.map(In))}function Ca(n){return Be(n=ae(n),"iterate",Gr),n}function Fn(n,t){return pi(n)?Qs(os(n)?In(t):t):In(t)}const ng={__proto__:null,[Symbol.iterator](){return $a(this,Symbol.iterator,n=>Fn(this,n))},concat(...n){return ys(this).concat(...n.map(t=>Xt(t)?ys(t):t))},entries(){return $a(this,"entries",n=>(n[1]=Fn(this,n[1]),n))},every(n,t){return $n(this,"every",n,t,void 0,arguments)},filter(n,t){return $n(this,"filter",n,t,e=>e.map(i=>Fn(this,i)),arguments)},find(n,t){return $n(this,"find",n,t,e=>Fn(this,e),arguments)},findIndex(n,t){return $n(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return $n(this,"findLast",n,t,e=>Fn(this,e),arguments)},findLastIndex(n,t){return $n(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return $n(this,"forEach",n,t,void 0,arguments)},includes(...n){return Ka(this,"includes",n)},indexOf(...n){return Ka(this,"indexOf",n)},join(n){return ys(this).join(n)},lastIndexOf(...n){return Ka(this,"lastIndexOf",n)},map(n,t){return $n(this,"map",n,t,void 0,arguments)},pop(){return _r(this,"pop")},push(...n){return _r(this,"push",n)},reduce(n,...t){return ju(this,"reduce",n,t)},reduceRight(n,...t){return ju(this,"reduceRight",n,t)},shift(){return _r(this,"shift")},some(n,t){return $n(this,"some",n,t,void 0,arguments)},splice(...n){return _r(this,"splice",n)},toReversed(){return ys(this).toReversed()},toSorted(n){return ys(this).toSorted(n)},toSpliced(...n){return ys(this).toSpliced(...n)},unshift(...n){return _r(this,"unshift",n)},values(){return $a(this,"values",n=>Fn(this,n))}};function $a(n,t,e){const i=Ca(n),s=i[t]();return i!==n&&!yn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const ig=Array.prototype;function $n(n,t,e,i,s,r){const o=Ca(n),a=o!==n&&!yn(n),l=o[t];if(l!==ig[t]){const f=l.apply(n,r);return a?In(f):f}let c=e;o!==n&&(a?c=function(f,h){return e.call(this,Fn(n,f),h,n)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function ju(n,t,e,i){const s=Ca(n),r=s!==n&&!yn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=Fn(n,c)),e.call(this,c,Fn(n,u),f,n)}):e.length>3&&(o=function(c,u,f){return e.call(this,c,u,f,n)}));const l=s[t](o,...i);return a?Fn(n,l):l}function Ka(n,t,e){const i=ae(n);Be(i,"iterate",Gr);const s=i[t](...e);return(s===-1||s===!1)&&cu(e[0])?(e[0]=ae(e[0]),i[t](...e)):s}function _r(n,t,e=[]){hi(),iu();const i=ae(n)[t].apply(n,e);return su(),di(),i}const sg=Jc("__proto__,__v_isRef,__isVue"),Nd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Vn));function rg(n){Vn(n)||(n=String(n));const t=ae(this);return Be(t,"has",n),t.hasOwnProperty(n)}class Od{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?mg:kd:r?zd:Bd).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Xt(t);if(!s){let l;if(o&&(l=ng[e]))return l;if(e==="hasOwnProperty")return rg}const a=Reflect.get(t,e,He(t)?t:i);if((Vn(e)?Nd.has(e):sg(e))||(s||Be(t,"get",e),r))return a;if(He(a)){const l=o&&tu(e)?a:a.value;return s&&ue(l)?Xl(l):l}return ue(a)?s?Xl(a):Pa(a):a}}class Fd extends Od{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Xt(t)&&tu(e);if(!this._isShallow){const c=pi(r);if(!yn(i)&&!pi(i)&&(r=ae(r),i=ae(i)),!o&&He(r)&&!He(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:le(t,e),l=Reflect.set(t,e,i,He(t)?t:s);return t===ae(s)&&(a?kn(i,r)&&ri(t,"set",e,i):ri(t,"add",e,i)),l}deleteProperty(t,e){const i=le(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&ri(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Vn(e)||!Nd.has(e))&&Be(t,"has",e),i}ownKeys(t){return Be(t,"iterate",Xt(t)?"length":rs),Reflect.ownKeys(t)}}class og extends Od{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const ag=new Fd,lg=new og,cg=new Fd(!0);const Wl=n=>n,mo=n=>Reflect.getPrototypeOf(n);function ug(n,t,e){return function(...i){const s=this.__v_raw,r=ae(s),o=Xs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Wl:t?Qs:In;return!t&&Be(r,"iterate",l?Gl:rs),Ne(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function go(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function fg(n,t){const e={get(s){const r=this.__v_raw,o=ae(r),a=ae(s);n||(kn(s,a)&&Be(o,"get",s),Be(o,"get",a));const{has:l}=mo(o),c=t?Wl:n?Qs:In;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Be(ae(s),"iterate",rs),s.size},has(s){const r=this.__v_raw,o=ae(r),a=ae(s);return n||(kn(s,a)&&Be(o,"has",s),Be(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ae(a),c=t?Wl:n?Qs:In;return!n&&Be(l,"iterate",rs),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return Ne(e,n?{add:go("add"),set:go("set"),delete:go("delete"),clear:go("clear")}:{add(s){const r=ae(this),o=mo(r),a=ae(s),l=!t&&!yn(s)&&!pi(s)?a:s;return o.has.call(r,l)||kn(s,l)&&o.has.call(r,s)||kn(a,l)&&o.has.call(r,a)||(r.add(l),ri(r,"add",l,l)),this},set(s,r){!t&&!yn(r)&&!pi(r)&&(r=ae(r));const o=ae(this),{has:a,get:l}=mo(o);let c=a.call(o,s);c||(s=ae(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?kn(r,u)&&ri(o,"set",s,r):ri(o,"add",s,r),this},delete(s){const r=ae(this),{has:o,get:a}=mo(r);let l=o.call(r,s);l||(s=ae(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&ri(r,"delete",s,void 0),c},clear(){const s=ae(this),r=s.size!==0,o=s.clear();return r&&ri(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=ug(s,n,t)}),e}function au(n,t){const e=fg(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(le(e,s)&&s in i?e:i,s,r)}const hg={get:au(!1,!1)},dg={get:au(!1,!0)},pg={get:au(!0,!1)};const Bd=new WeakMap,zd=new WeakMap,kd=new WeakMap,mg=new WeakMap;function gg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function _g(n){return n.__v_skip||!Object.isExtensible(n)?0:gg(Vm(n))}function Pa(n){return pi(n)?n:lu(n,!1,ag,hg,Bd)}function Hd(n){return lu(n,!1,cg,dg,zd)}function Xl(n){return lu(n,!0,lg,pg,kd)}function lu(n,t,e,i,s){if(!ue(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=_g(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function os(n){return pi(n)?os(n.__v_raw):!!(n&&n.__v_isReactive)}function pi(n){return!!(n&&n.__v_isReadonly)}function yn(n){return!!(n&&n.__v_isShallow)}function cu(n){return n?!!n.__v_raw:!1}function ae(n){const t=n&&n.__v_raw;return t?ae(t):n}function vg(n){return!le(n,"__v_skip")&&Object.isExtensible(n)&&Ed(n,"__v_skip",!0),n}const In=n=>ue(n)?Pa(n):n,Qs=n=>ue(n)?Xl(n):n;function He(n){return n?n.__v_isRef===!0:!1}function Wt(n){return Vd(n,!1)}function tr(n){return Vd(n,!0)}function Vd(n,t){return He(n)?n:new xg(n,t)}class xg{constructor(t,e){this.dep=new ou,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ae(t),this._value=e?t:In(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||yn(t)||pi(t);t=i?t:ae(t),kn(t,e)&&(this._rawValue=t,this._value=i?t:In(t),this.dep.trigger())}}function dn(n){return He(n)?n.value:n}const yg={get:(n,t,e)=>t==="__v_raw"?n:dn(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return He(s)&&!He(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Gd(n){return os(n)?n:new Proxy(n,yg)}class Mg{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new ou(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Vr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return Cd(this,!0),!0}get value(){const t=this.dep.track();return Id(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Sg(n,t,e=!1){let i,s;return Yt(n)?i=n:(i=n.get,s=n.set),new Mg(i,s,e)}const _o={},sa=new WeakMap;let Ji;function Eg(n,t=!1,e=Ji){if(e){let i=sa.get(e);i||sa.set(e,i=[]),i.push(n)}}function bg(n,t,e=he){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:yn(M)||s===!1||s===0?oi(M,1):oi(M);let u,f,h,d,g=!1,_=!1;if(He(n)?(f=()=>n.value,g=yn(n)):os(n)?(f=()=>c(n),g=!0):Xt(n)?(_=!0,g=n.some(M=>os(M)||yn(M)),f=()=>n.map(M=>{if(He(M))return M.value;if(os(M))return c(M);if(Yt(M))return l?l(M,2):M()})):Yt(n)?t?f=l?()=>l(n,2):n:f=()=>{if(h){hi();try{h()}finally{di()}}const M=Ji;Ji=u;try{return l?l(n,3,[d]):n(d)}finally{Ji=M}}:f=Hn,t&&s){const M=f,G=s===!0?1/0:s;f=()=>oi(M(),G)}const m=Qm(),p=()=>{u.stop(),m&&m.active&&Qc(m.effects,u)};if(r&&t){const M=t;t=(...G)=>{M(...G),p()}}let S=_?new Array(n.length).fill(_o):_o;const A=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const G=u.run();if(s||g||(_?G.some((I,D)=>kn(I,S[D])):kn(G,S))){h&&h();const I=Ji;Ji=u;try{const D=[G,S===_o?void 0:_&&S[0]===_o?[]:S,d];S=G,l?l(t,3,D):t(...D)}finally{Ji=I}}}else u.run()};return a&&a(A),u=new wd(f),u.scheduler=o?()=>o(A,!1):A,d=M=>Eg(M,!1,u),h=u.onStop=()=>{const M=sa.get(u);if(M){if(l)l(M,4);else for(const G of M)G();sa.delete(u)}},t?i?A(!0):S=u.run():o?o(A.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function oi(n,t=1/0,e){if(t<=0||!ue(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,He(n))oi(n.value,t,e);else if(Xt(n))for(let i=0;i<n.length;i++)oi(n[i],t,e);else if(xd(n)||Xs(n))n.forEach(i=>{oi(i,t,e)});else if(Sd(n)){for(const i in n)oi(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&oi(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function to(n,t,e,i){try{return i?n(...i):n()}catch(s){Da(s,t,e)}}function Gn(n,t,e,i){if(Yt(n)){const s=to(n,t,e,i);return s&&yd(s)&&s.catch(r=>{Da(r,t,e)}),s}if(Xt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Gn(n[r],t,e,i));return s}}function Da(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||he;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){hi(),to(r,null,10,[n,l,c]),di();return}}Tg(n,e,s,i,o)}function Tg(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const $e=[];let On=-1;const js=[];let Ri=null,Os=0;const Wd=Promise.resolve();let ra=null;function ls(n){const t=ra||Wd;return n?t.then(this?n.bind(this):n):t}function Ag(n){let t=On+1,e=$e.length;for(;t<e;){const i=t+e>>>1,s=$e[i],r=Wr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function uu(n){if(!(n.flags&1)){const t=Wr(n),e=$e[$e.length-1];!e||!(n.flags&2)&&t>=Wr(e)?$e.push(n):$e.splice(Ag(t),0,n),n.flags|=1,Xd()}}function Xd(){ra||(ra=Wd.then(qd))}function wg(n){Xt(n)?js.push(...n):Ri&&n.id===-1?Ri.splice(Os+1,0,n):n.flags&1||(js.push(n),n.flags|=1),Xd()}function qu(n,t,e=On+1){for(;e<$e.length;e++){const i=$e[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;$e.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function jd(n){if(js.length){const t=[...new Set(js)].sort((e,i)=>Wr(e)-Wr(i));if(js.length=0,Ri){Ri.push(...t);return}for(Ri=t,Os=0;Os<Ri.length;Os++){const e=Ri[Os];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Ri=null,Os=0}}const Wr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function qd(n){try{for(On=0;On<$e.length;On++){const t=$e[On];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),to(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;On<$e.length;On++){const t=$e[On];t&&(t.flags&=-2)}On=-1,$e.length=0,jd(),ra=null,($e.length||js.length)&&qd()}}let fn=null,Yd=null;function oa(n){const t=fn;return fn=n,Yd=n&&n.type.__scopeId||null,t}function Rg(n,t=fn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&ca(-1);const r=oa(t);let o;try{o=n(...s)}finally{oa(r),i._d&&ca(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function $d(n,t){if(fn===null)return n;const e=Fa(fn),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=he]=t[s];r&&(Yt(r)&&(r={mounted:r,updated:r}),r.deep&&oi(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Wi(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(hi(),Gn(l,e,8,[n.el,a,n,t]),di())}}function qo(n,t){if(ze){let e=ze.provides;const i=ze.parent&&ze.parent.provides;i===e&&(e=ze.provides=Object.create(i)),e[n]=t}}function Mn(n,t,e=!1){const i=D_();if(i||qs){let s=qs?qs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Yt(t)?t.call(i&&i.proxy):t}}const Cg=Symbol.for("v-scx"),Pg=()=>Mn(Cg);function on(n,t,e){return Kd(n,t,e)}function Kd(n,t,e=he){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ne({},e),l=t&&i||!t&&r!=="post";let c;if(qr){if(r==="sync"){const d=Pg();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=Hn,d.resume=Hn,d.pause=Hn,d}}const u=ze;a.call=(d,g,_)=>Gn(d,u,g,_);let f=!1;r==="post"?a.scheduler=d=>{qe(d,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():uu(d)}),a.augmentJob=d=>{t&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=bg(n,t,a);return qr&&(c?c.push(h):l&&h()),h}function Dg(n,t,e){const i=this.proxy,s=xe(n)?n.includes(".")?Zd(i,n):()=>i[n]:n.bind(i,i);let r;Yt(t)?r=t:(r=t.handler,e=t);const o=eo(this),a=Kd(s,r.bind(i),e);return o(),a}function Zd(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const wi=new WeakMap,Jd=Symbol("_vte"),Ig=n=>n.__isTeleport,ts=n=>n&&(n.disabled||n.disabled===""),Lg=n=>n&&(n.defer||n.defer===""),Yu=n=>typeof SVGElement<"u"&&n instanceof SVGElement,$u=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,jl=(n,t)=>{const e=n&&n.to;return xe(e)?t?t(e):null:e},Ug={name:"Teleport",__isTeleport:!0,process(n,t,e,i,s,r,o,a,l,c){const{mc:u,pc:f,pbc:h,o:{insert:d,querySelector:g,createText:_,createComment:m,parentNode:p}}=c,S=ts(t.props);let{dynamicChildren:A}=t;const M=(D,L,b)=>{D.shapeFlag&16&&u(D.children,L,b,s,r,o,a,l)},G=(D=t)=>{const L=ts(D.props),b=D.target=jl(D.props,g),E=ql(b,D,_,d);b&&(o!=="svg"&&Yu(b)?o="svg":o!=="mathml"&&$u(b)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(b),L||(M(D,b,E),Rr(D,!1)))},I=D=>{const L=()=>{if(wi.get(D)===L){if(wi.delete(D),ts(D.props)){const b=p(D.el)||e;M(D,b,D.anchor),Rr(D,!0)}G(D)}};wi.set(D,L),qe(L,r)};if(n==null){const D=t.el=_(""),L=t.anchor=_("");if(d(D,e,i),d(L,e,i),Lg(t.props)||r&&r.pendingBranch){I(t);return}S&&(M(t,e,L),Rr(t,!0)),G()}else{t.el=n.el;const D=t.anchor=n.anchor,L=wi.get(n);if(L){L.flags|=8,wi.delete(n),I(t);return}t.targetStart=n.targetStart;const b=t.target=n.target,E=t.targetAnchor=n.targetAnchor,P=ts(n.props),N=P?e:b,O=P?D:E;if(o==="svg"||Yu(b)?o="svg":(o==="mathml"||$u(b))&&(o="mathml"),A?(h(n.dynamicChildren,A,N,s,r,o,a),pu(n,t,!0)):l||f(n,t,N,O,s,r,o,a,!1),S)P?t.props&&n.props&&t.props.to!==n.props.to&&(t.props.to=n.props.to):vo(t,e,D,c,1);else if((t.props&&t.props.to)!==(n.props&&n.props.to)){const Q=t.target=jl(t.props,g);Q&&vo(t,Q,null,c,0)}else P&&vo(t,b,E,c,1);Rr(t,S)}},remove(n,t,e,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:f,props:h}=n;let d=r||!ts(h);const g=wi.get(n);if(g&&(g.flags|=8,wi.delete(n),d=!1),f&&(s(c),s(u)),r&&s(l),o&16)for(let _=0;_<a.length;_++){const m=a[_];i(m,t,e,d,!!m.dynamicChildren)}},move:vo,hydrate:Ng};function vo(n,t,e,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,t,e);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=r===2;if(f&&i(o,t,e),!wi.has(n)&&(!f||ts(u))&&l&16)for(let h=0;h<c.length;h++)s(c[h],t,e,2);f&&i(a,t,e)}function Ng(n,t,e,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},f){function h(m,p){let S=p;for(;S;){if(S&&S.nodeType===8){if(S.data==="teleport start anchor")t.targetStart=S;else if(S.data==="teleport anchor"){t.targetAnchor=S,m._lpa=t.targetAnchor&&o(t.targetAnchor);break}}S=o(S)}}function d(m,p){p.anchor=f(o(m),p,a(m),e,i,s,r)}const g=t.target=jl(t.props,l),_=ts(t.props);if(g){const m=g._lpa||g.firstChild;t.shapeFlag&16&&(_?(d(n,t),h(g,m),t.targetAnchor||ql(g,t,u,c,a(n)===g?n:null)):(t.anchor=o(n),h(g,m),t.targetAnchor||ql(g,t,u,c),f(m&&o(m),t,g,e,i,s,r))),Rr(t,_)}else _&&t.shapeFlag&16&&(d(n,t),t.targetStart=n,t.targetAnchor=o(n));return t.anchor&&o(t.anchor)}const Xr=Ug;function Rr(n,t){const e=n.ctx;if(e&&e.ut){let i,s;for(t?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",e.uid),i=i.nextSibling;e.ut()}}function ql(n,t,e,i,s=null){const r=t.targetStart=e(""),o=t.targetAnchor=e("");return r[Jd]=o,n&&(i(r,n,s),i(o,n,s)),o}const Og=Symbol("_leaveCb");function fu(n,t){n.shapeFlag&6&&n.component?(n.transition=t,fu(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function mi(n,t){return Yt(n)?Ne({name:n.name},t,{setup:n}):n}function Qd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Ku(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const aa=new WeakMap;function Or(n,t,e,i,s=!1){if(Xt(n)){n.forEach((_,m)=>Or(_,t&&(Xt(t)?t[m]:t),e,i,s));return}if(Fr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Or(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Fa(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===he?a.refs={}:a.refs,f=a.setupState,h=ae(f),d=f===he?vd:_=>Ku(u,_)?!1:le(h,_),g=(_,m)=>!(m&&Ku(u,m));if(c!=null&&c!==l){if(Zu(t),xe(c))u[c]=null,d(c)&&(f[c]=null);else if(He(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(Yt(l))to(l,a,12,[o,u]);else{const _=xe(l),m=He(l);if(_||m){const p=()=>{if(n.f){const S=_?d(l)?f[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Xt(S)&&Qc(S,r);else if(Xt(S))S.includes(r)||S.push(r);else if(_)u[l]=[r],d(l)&&(f[l]=u[l]);else{const A=[r];g(l,n.k)&&(l.value=A),n.k&&(u[n.k]=A)}}else _?(u[l]=o,d(l)&&(f[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{p(),aa.delete(n)};S.id=-1,aa.set(n,S),qe(S,e)}else Zu(n),p()}}}function Zu(n){const t=aa.get(n);t&&(t.flags|=8,aa.delete(n))}wa().requestIdleCallback;wa().cancelIdleCallback;const Fr=n=>!!n.type.__asyncLoader,tp=n=>n.type.__isKeepAlive;function Fg(n,t){ep(n,"a",t)}function Bg(n,t){ep(n,"da",t)}function ep(n,t,e=ze){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ia(t,i,e),e){let s=e.parent;for(;s&&s.parent;)tp(s.parent.vnode)&&zg(i,t,e,s),s=s.parent}}function zg(n,t,e,i){const s=Ia(t,n,i,!0);np(()=>{Qc(i[t],s)},e)}function Ia(n,t,e=ze,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{hi();const a=eo(e),l=Gn(t,e,n,o);return a(),di(),l});return i?s.unshift(r):s.push(r),r}}const gi=n=>(t,e=ze)=>{(!qr||n==="sp")&&Ia(n,(...i)=>t(...i),e)},kg=gi("bm"),La=gi("m"),Hg=gi("bu"),Vg=gi("u"),Ua=gi("bum"),np=gi("um"),Gg=gi("sp"),Wg=gi("rtg"),Xg=gi("rtc");function jg(n,t=ze){Ia("ec",n,t)}const qg="components";function Yg(n,t){return Kg(qg,n,!0,t)||n}const $g=Symbol.for("v-ndc");function Kg(n,t,e=!0,i=!1){const s=fn||ze;if(s){const r=s.type;{const a=O_(r,!1);if(a&&(a===t||a===Je(t)||a===Aa(Je(t))))return r}const o=Ju(s[n]||r[n],t)||Ju(s.appContext[n],t);return!o&&i?r:o}}function Ju(n,t){return n&&(n[t]||n[Je(t)]||n[Aa(Je(t))])}function Bi(n,t,e,i){let s;const r=e,o=Xt(n);if(o||xe(n)){const a=o&&os(n);let l=!1,c=!1;a&&(l=!yn(n),c=pi(n),n=Ca(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=t(l?c?Qs(In(n[u])):In(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ue(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Yl=n=>n?Mp(n)?Fa(n):Yl(n.parent):null,Br=Ne(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Yl(n.parent),$root:n=>Yl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>sp(n),$forceUpdate:n=>n.f||(n.f=()=>{uu(n.update)}),$nextTick:n=>n.n||(n.n=ls.bind(n.proxy)),$watch:n=>Dg.bind(n)}),Za=(n,t)=>n!==he&&!n.__isScriptSetup&&le(n,t),Zg={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Za(i,t))return o[t]=1,i[t];if(s!==he&&le(s,t))return o[t]=2,s[t];if(le(r,t))return o[t]=3,r[t];if(e!==he&&le(e,t))return o[t]=4,e[t];$l&&(o[t]=0)}}const c=Br[t];let u,f;if(c)return t==="$attrs"&&Be(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==he&&le(e,t))return o[t]=4,e[t];if(f=l.config.globalProperties,le(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Za(s,t)?(s[t]=e,!0):i!==he&&le(i,t)?(i[t]=e,!0):le(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==he&&a[0]!=="$"&&le(n,a)||Za(t,a)||le(r,a)||le(i,a)||le(Br,a)||le(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:le(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Qu(n){return Xt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let $l=!0;function Jg(n){const t=sp(n),e=n.proxy,i=n.ctx;$l=!1,t.beforeCreate&&tf(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:S,destroyed:A,unmounted:M,render:G,renderTracked:I,renderTriggered:D,errorCaptured:L,serverPrefetch:b,expose:E,inheritAttrs:P,components:N,directives:O,filters:Q}=t;if(c&&Qg(c,i,null),o)for(const nt in o){const X=o[nt];Yt(X)&&(i[nt]=X.bind(e))}if(s){const nt=s.call(e,e);ue(nt)&&(n.data=Pa(nt))}if($l=!0,r)for(const nt in r){const X=r[nt],pt=Yt(X)?X.bind(e,e):Yt(X.get)?X.get.bind(e,e):Hn,Mt=!Yt(X)&&Yt(X.set)?X.set.bind(e):Hn,At=Zt({get:pt,set:Mt});Object.defineProperty(i,nt,{enumerable:!0,configurable:!0,get:()=>At.value,set:Ft=>At.value=Ft})}if(a)for(const nt in a)ip(a[nt],i,e,nt);if(l){const nt=Yt(l)?l.call(e):l;Reflect.ownKeys(nt).forEach(X=>{qo(X,nt[X])})}u&&tf(u,n,"c");function U(nt,X){Xt(X)?X.forEach(pt=>nt(pt.bind(e))):X&&nt(X.bind(e))}if(U(kg,f),U(La,h),U(Hg,d),U(Vg,g),U(Fg,_),U(Bg,m),U(jg,L),U(Xg,I),U(Wg,D),U(Ua,S),U(np,M),U(Gg,b),Xt(E))if(E.length){const nt=n.exposed||(n.exposed={});E.forEach(X=>{Object.defineProperty(nt,X,{get:()=>e[X],set:pt=>e[X]=pt,enumerable:!0})})}else n.exposed||(n.exposed={});G&&n.render===Hn&&(n.render=G),P!=null&&(n.inheritAttrs=P),N&&(n.components=N),O&&(n.directives=O),b&&Qd(n)}function Qg(n,t,e=Hn){Xt(n)&&(n=Kl(n));for(const i in n){const s=n[i];let r;ue(s)?"default"in s?r=Mn(s.from||i,s.default,!0):r=Mn(s.from||i):r=Mn(s),He(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function tf(n,t,e){Gn(Xt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function ip(n,t,e,i){let s=i.includes(".")?Zd(e,i):()=>e[i];if(xe(n)){const r=t[n];Yt(r)&&on(s,r)}else if(Yt(n))on(s,n.bind(e));else if(ue(n))if(Xt(n))n.forEach(r=>ip(r,t,e,i));else{const r=Yt(n.handler)?n.handler.bind(e):t[n.handler];Yt(r)&&on(s,r,n)}}function sp(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>la(l,c,o,!0)),la(l,t,o)),ue(t)&&r.set(t,l),l}function la(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&la(n,r,e,!0),s&&s.forEach(o=>la(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=t_[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const t_={data:ef,props:nf,emits:nf,methods:Cr,computed:Cr,beforeCreate:Xe,created:Xe,beforeMount:Xe,mounted:Xe,beforeUpdate:Xe,updated:Xe,beforeDestroy:Xe,beforeUnmount:Xe,destroyed:Xe,unmounted:Xe,activated:Xe,deactivated:Xe,errorCaptured:Xe,serverPrefetch:Xe,components:Cr,directives:Cr,watch:n_,provide:ef,inject:e_};function ef(n,t){return t?n?function(){return Ne(Yt(n)?n.call(this,this):n,Yt(t)?t.call(this,this):t)}:t:n}function e_(n,t){return Cr(Kl(n),Kl(t))}function Kl(n){if(Xt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Xe(n,t){return n?[...new Set([].concat(n,t))]:t}function Cr(n,t){return n?Ne(Object.create(null),n,t):t}function nf(n,t){return n?Xt(n)&&Xt(t)?[...new Set([...n,...t])]:Ne(Object.create(null),Qu(n),Qu(t??{})):t}function n_(n,t){if(!n)return t;if(!t)return n;const e=Ne(Object.create(null),n);for(const i in t)e[i]=Xe(n[i],t[i]);return e}function rp(){return{app:null,config:{isNativeTag:vd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let i_=0;function s_(n,t){return function(i,s=null){Yt(i)||(i=Ne({},i)),s!=null&&!ue(s)&&(s=null);const r=rp(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:i_++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:B_,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&Yt(u.install)?(o.add(u),u.install(c,...f)):Yt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||Ze(i,s);return d.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,Fa(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Gn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=qs;qs=c;try{return u()}finally{qs=f}}};return c}}let qs=null;const r_=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Je(t)}Modifiers`]||n[`${Vi(t)}Modifiers`];function o_(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||he;let s=e;const r=t.startsWith("update:"),o=r&&r_(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>xe(u)?u.trim():u)),o.number&&(s=e.map(eu)));let a,l=i[a=ja(t)]||i[a=ja(Je(t))];!l&&r&&(l=i[a=ja(Vi(t))]),l&&Gn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Gn(c,n,6,s)}}const a_=new WeakMap;function op(n,t,e=!1){const i=e?a_:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Yt(n)){const l=c=>{const u=op(c,t,!0);u&&(a=!0,Ne(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ue(n)&&i.set(n,null),null):(Xt(r)?r.forEach(l=>o[l]=null):Ne(o,r),ue(n)&&i.set(n,o),o)}function Na(n,t){return!n||!Ea(t)?!1:(t=t.slice(2).replace(/Once$/,""),le(n,t[0].toLowerCase()+t.slice(1))||le(n,Vi(t))||le(n,t))}function sf(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=n,m=oa(n);let p,S;try{if(e.shapeFlag&4){const M=s||i,G=M;p=Bn(c.call(G,M,u,f,d,h,g)),S=a}else{const M=t;p=Bn(M.length>1?M(f,{attrs:a,slots:o,emit:l}):M(f,null)),S=t.props?a:l_(a)}}catch(M){zr.length=0,Da(M,n,1),p=Ze(zi)}let A=p;if(S&&_!==!1){const M=Object.keys(S),{shapeFlag:G}=A;M.length&&G&7&&(r&&M.some(ba)&&(S=c_(S,r)),A=er(A,S,!1,!0))}return e.dirs&&(A=er(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(e.dirs):e.dirs),e.transition&&fu(A,e.transition),p=A,oa(m),p}const l_=n=>{let t;for(const e in n)(e==="class"||e==="style"||Ea(e))&&((t||(t={}))[e]=n[e]);return t},c_=(n,t)=>{const e={};for(const i in n)(!ba(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function u_(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?rf(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(ap(o,i,h)&&!Na(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?rf(i,o,c):!0:!!o;return!1}function rf(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(ap(t,n,r)&&!Na(e,r))return!0}return!1}function ap(n,t,e){const i=n[e],s=t[e];return e==="style"&&ue(i)&&ue(s)?!nu(i,s):i!==s}function f_({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const lp={},cp=()=>Object.create(lp),up=n=>Object.getPrototypeOf(n)===lp;function h_(n,t,e,i=!1){const s={},r=cp();n.propsDefaults=Object.create(null),fp(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Hd(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function d_(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ae(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Na(n.emitsOptions,h))continue;const d=t[h];if(l)if(le(r,h))d!==r[h]&&(r[h]=d,c=!0);else{const g=Je(h);s[g]=Zl(l,a,g,d,n,!1)}else d!==r[h]&&(r[h]=d,c=!0)}}}else{fp(n,t,s,r)&&(c=!0);let u;for(const f in a)(!t||!le(t,f)&&((u=Vi(f))===f||!le(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(s[f]=Zl(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!t||!le(t,f))&&(delete r[f],c=!0)}c&&ri(n.attrs,"set","")}function fp(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(Lr(l))continue;const c=t[l];let u;s&&le(s,u=Je(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Na(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ae(e),c=a||he;for(let u=0;u<r.length;u++){const f=r[u];e[f]=Zl(s,l,f,c[f],n,!le(c,f))}}return o}function Zl(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=le(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Yt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=eo(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Vi(e))&&(i=!0))}return i}const p_=new WeakMap;function hp(n,t,e=!1){const i=e?p_:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Yt(n)){const u=f=>{l=!0;const[h,d]=hp(f,t,!0);Ne(o,h),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ue(n)&&i.set(n,Ws),Ws;if(Xt(r))for(let u=0;u<r.length;u++){const f=Je(r[u]);of(f)&&(o[f]=he)}else if(r)for(const u in r){const f=Je(u);if(of(f)){const h=r[u],d=o[f]=Xt(h)||Yt(h)?{type:h}:Ne({},h),g=d.type;let _=!1,m=!0;if(Xt(g))for(let p=0;p<g.length;++p){const S=g[p],A=Yt(S)&&S.name;if(A==="Boolean"){_=!0;break}else A==="String"&&(m=!1)}else _=Yt(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||le(d,"default"))&&a.push(f)}}const c=[o,a];return ue(n)&&i.set(n,c),c}function of(n){return n[0]!=="$"&&!Lr(n)}const hu=n=>n==="_"||n==="_ctx"||n==="$stable",du=n=>Xt(n)?n.map(Bn):[Bn(n)],m_=(n,t,e)=>{if(t._n)return t;const i=Rg((...s)=>du(t(...s)),e);return i._c=!1,i},dp=(n,t,e)=>{const i=n._ctx;for(const s in n){if(hu(s))continue;const r=n[s];if(Yt(r))t[s]=m_(s,r,i);else if(r!=null){const o=du(r);t[s]=()=>o}}},pp=(n,t)=>{const e=du(t);n.slots.default=()=>e},mp=(n,t,e)=>{for(const i in t)(e||!hu(i))&&(n[i]=t[i])},g_=(n,t,e)=>{const i=n.slots=cp();if(n.vnode.shapeFlag&32){const s=t._;s?(mp(i,t,e),e&&Ed(i,"_",s,!0)):dp(t,i)}else t&&pp(n,t)},__=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=he;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:mp(s,t,e):(r=!t.$stable,dp(t,s)),o=t}else t&&(pp(n,t),o={default:1});if(r)for(const a in s)!hu(a)&&o[a]==null&&delete s[a]},qe=S_;function v_(n){return x_(n)}function x_(n,t){const e=wa();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=Hn,insertStaticContent:g}=n,_=(R,w,y,tt=null,Z=null,V=null,st=void 0,W=null,F=!!w.dynamicChildren)=>{if(R===w)return;R&&!vr(R,w)&&(tt=z(R),Ft(R,Z,V,!0),R=null),w.patchFlag===-2&&(F=!1,w.dynamicChildren=null);const{type:x,ref:v,shapeFlag:C}=w;switch(x){case Oa:m(R,w,y,tt);break;case zi:p(R,w,y,tt);break;case Yo:R==null&&S(w,y,tt,st);break;case be:N(R,w,y,tt,Z,V,st,W,F);break;default:C&1?G(R,w,y,tt,Z,V,st,W,F):C&6?O(R,w,y,tt,Z,V,st,W,F):(C&64||C&128)&&x.process(R,w,y,tt,Z,V,st,W,F,gt)}v!=null&&Z?Or(v,R&&R.ref,V,w||R,!w):v==null&&R&&R.ref!=null&&Or(R.ref,null,V,R,!0)},m=(R,w,y,tt)=>{if(R==null)i(w.el=a(w.children),y,tt);else{const Z=w.el=R.el;w.children!==R.children&&c(Z,w.children)}},p=(R,w,y,tt)=>{R==null?i(w.el=l(w.children||""),y,tt):w.el=R.el},S=(R,w,y,tt)=>{[R.el,R.anchor]=g(R.children,w,y,tt,R.el,R.anchor)},A=({el:R,anchor:w},y,tt)=>{let Z;for(;R&&R!==w;)Z=h(R),i(R,y,tt),R=Z;i(w,y,tt)},M=({el:R,anchor:w})=>{let y;for(;R&&R!==w;)y=h(R),s(R),R=y;s(w)},G=(R,w,y,tt,Z,V,st,W,F)=>{if(w.type==="svg"?st="svg":w.type==="math"&&(st="mathml"),R==null)I(w,y,tt,Z,V,st,W,F);else{const x=R.el&&R.el._isVueCE?R.el:null;try{x&&x._beginPatch(),b(R,w,Z,V,st,W,F)}finally{x&&x._endPatch()}}},I=(R,w,y,tt,Z,V,st,W)=>{let F,x;const{props:v,shapeFlag:C,transition:B,dirs:H}=R;if(F=R.el=o(R.type,V,v&&v.is,v),C&8?u(F,R.children):C&16&&L(R.children,F,null,tt,Z,Ja(R,V),st,W),H&&Wi(R,null,tt,"created"),D(F,R,R.scopeId,st,tt),v){for(const _t in v)_t!=="value"&&!Lr(_t)&&r(F,_t,null,v[_t],V,tt);"value"in v&&r(F,"value",null,v.value,V),(x=v.onVnodeBeforeMount)&&Nn(x,tt,R)}H&&Wi(R,null,tt,"beforeMount");const q=y_(Z,B);q&&B.beforeEnter(F),i(F,w,y),((x=v&&v.onVnodeMounted)||q||H)&&qe(()=>{try{x&&Nn(x,tt,R),q&&B.enter(F),H&&Wi(R,null,tt,"mounted")}finally{}},Z)},D=(R,w,y,tt,Z)=>{if(y&&d(R,y),tt)for(let V=0;V<tt.length;V++)d(R,tt[V]);if(Z){let V=Z.subTree;if(w===V||vp(V.type)&&(V.ssContent===w||V.ssFallback===w)){const st=Z.vnode;D(R,st,st.scopeId,st.slotScopeIds,Z.parent)}}},L=(R,w,y,tt,Z,V,st,W,F=0)=>{for(let x=F;x<R.length;x++){const v=R[x]=W?si(R[x]):Bn(R[x]);_(null,v,w,y,tt,Z,V,st,W)}},b=(R,w,y,tt,Z,V,st)=>{const W=w.el=R.el;let{patchFlag:F,dynamicChildren:x,dirs:v}=w;F|=R.patchFlag&16;const C=R.props||he,B=w.props||he;let H;if(y&&Xi(y,!1),(H=B.onVnodeBeforeUpdate)&&Nn(H,y,w,R),v&&Wi(w,R,y,"beforeUpdate"),y&&Xi(y,!0),(C.innerHTML&&B.innerHTML==null||C.textContent&&B.textContent==null)&&u(W,""),x?E(R.dynamicChildren,x,W,y,tt,Ja(w,Z),V):st||X(R,w,W,null,y,tt,Ja(w,Z),V,!1),F>0){if(F&16)P(W,C,B,y,Z);else if(F&2&&C.class!==B.class&&r(W,"class",null,B.class,Z),F&4&&r(W,"style",C.style,B.style,Z),F&8){const q=w.dynamicProps;for(let _t=0;_t<q.length;_t++){const ct=q[_t],ht=C[ct],Ct=B[ct];(Ct!==ht||ct==="value")&&r(W,ct,ht,Ct,Z,y)}}F&1&&R.children!==w.children&&u(W,w.children)}else!st&&x==null&&P(W,C,B,y,Z);((H=B.onVnodeUpdated)||v)&&qe(()=>{H&&Nn(H,y,w,R),v&&Wi(w,R,y,"updated")},tt)},E=(R,w,y,tt,Z,V,st)=>{for(let W=0;W<w.length;W++){const F=R[W],x=w[W],v=F.el&&(F.type===be||!vr(F,x)||F.shapeFlag&198)?f(F.el):y;_(F,x,v,null,tt,Z,V,st,!0)}},P=(R,w,y,tt,Z)=>{if(w!==y){if(w!==he)for(const V in w)!Lr(V)&&!(V in y)&&r(R,V,w[V],null,Z,tt);for(const V in y){if(Lr(V))continue;const st=y[V],W=w[V];st!==W&&V!=="value"&&r(R,V,W,st,Z,tt)}"value"in y&&r(R,"value",w.value,y.value,Z)}},N=(R,w,y,tt,Z,V,st,W,F)=>{const x=w.el=R?R.el:a(""),v=w.anchor=R?R.anchor:a("");let{patchFlag:C,dynamicChildren:B,slotScopeIds:H}=w;H&&(W=W?W.concat(H):H),R==null?(i(x,y,tt),i(v,y,tt),L(w.children||[],y,v,Z,V,st,W,F)):C>0&&C&64&&B&&R.dynamicChildren&&R.dynamicChildren.length===B.length?(E(R.dynamicChildren,B,y,Z,V,st,W),(w.key!=null||Z&&w===Z.subTree)&&pu(R,w,!0)):X(R,w,y,v,Z,V,st,W,F)},O=(R,w,y,tt,Z,V,st,W,F)=>{w.slotScopeIds=W,R==null?w.shapeFlag&512?Z.ctx.activate(w,y,tt,st,F):Q(w,y,tt,Z,V,st,F):j(R,w,F)},Q=(R,w,y,tt,Z,V,st)=>{const W=R.component=P_(R,tt,Z);if(tp(R)&&(W.ctx.renderer=gt),I_(W,!1,st),W.asyncDep){if(Z&&Z.registerDep(W,U,st),!R.el){const F=W.subTree=Ze(zi);p(null,F,w,y),R.placeholder=F.el}}else U(W,R,w,y,Z,V,st)},j=(R,w,y)=>{const tt=w.component=R.component;if(u_(R,w,y))if(tt.asyncDep&&!tt.asyncResolved){nt(tt,w,y);return}else tt.next=w,tt.update();else w.el=R.el,tt.vnode=w},U=(R,w,y,tt,Z,V,st)=>{const W=()=>{if(R.isMounted){let{next:C,bu:B,u:H,parent:q,vnode:_t}=R;{const dt=gp(R);if(dt){C&&(C.el=_t.el,nt(R,C,st)),dt.asyncDep.then(()=>{qe(()=>{R.isUnmounted||x()},Z)});return}}let ct=C,ht;Xi(R,!1),C?(C.el=_t.el,nt(R,C,st)):C=_t,B&&jo(B),(ht=C.props&&C.props.onVnodeBeforeUpdate)&&Nn(ht,q,C,_t),Xi(R,!0);const Ct=sf(R),rt=R.subTree;R.subTree=Ct,_(rt,Ct,f(rt.el),z(rt),R,Z,V),C.el=Ct.el,ct===null&&f_(R,Ct.el),H&&qe(H,Z),(ht=C.props&&C.props.onVnodeUpdated)&&qe(()=>Nn(ht,q,C,_t),Z)}else{let C;const{el:B,props:H}=w,{bm:q,m:_t,parent:ct,root:ht,type:Ct}=R,rt=Fr(w);Xi(R,!1),q&&jo(q),!rt&&(C=H&&H.onVnodeBeforeMount)&&Nn(C,ct,w),Xi(R,!0);{ht.ce&&ht.ce._hasShadowRoot()&&ht.ce._injectChildStyle(Ct,R.parent?R.parent.type:void 0);const dt=R.subTree=sf(R);_(null,dt,y,tt,R,Z,V),w.el=dt.el}if(_t&&qe(_t,Z),!rt&&(C=H&&H.onVnodeMounted)){const dt=w;qe(()=>Nn(C,ct,dt),Z)}(w.shapeFlag&256||ct&&Fr(ct.vnode)&&ct.vnode.shapeFlag&256)&&R.a&&qe(R.a,Z),R.isMounted=!0,w=y=tt=null}};R.scope.on();const F=R.effect=new wd(W);R.scope.off();const x=R.update=F.run.bind(F),v=R.job=F.runIfDirty.bind(F);v.i=R,v.id=R.uid,F.scheduler=()=>uu(v),Xi(R,!0),x()},nt=(R,w,y)=>{w.component=R;const tt=R.vnode.props;R.vnode=w,R.next=null,d_(R,w.props,tt,y),__(R,w.children,y),hi(),qu(R),di()},X=(R,w,y,tt,Z,V,st,W,F=!1)=>{const x=R&&R.children,v=R?R.shapeFlag:0,C=w.children,{patchFlag:B,shapeFlag:H}=w;if(B>0){if(B&128){Mt(x,C,y,tt,Z,V,st,W,F);return}else if(B&256){pt(x,C,y,tt,Z,V,st,W,F);return}}H&8?(v&16&&yt(x,Z,V),C!==x&&u(y,C)):v&16?H&16?Mt(x,C,y,tt,Z,V,st,W,F):yt(x,Z,V,!0):(v&8&&u(y,""),H&16&&L(C,y,tt,Z,V,st,W,F))},pt=(R,w,y,tt,Z,V,st,W,F)=>{R=R||Ws,w=w||Ws;const x=R.length,v=w.length,C=Math.min(x,v);let B;for(B=0;B<C;B++){const H=w[B]=F?si(w[B]):Bn(w[B]);_(R[B],H,y,null,Z,V,st,W,F)}x>v?yt(R,Z,V,!0,!1,C):L(w,y,tt,Z,V,st,W,F,C)},Mt=(R,w,y,tt,Z,V,st,W,F)=>{let x=0;const v=w.length;let C=R.length-1,B=v-1;for(;x<=C&&x<=B;){const H=R[x],q=w[x]=F?si(w[x]):Bn(w[x]);if(vr(H,q))_(H,q,y,null,Z,V,st,W,F);else break;x++}for(;x<=C&&x<=B;){const H=R[C],q=w[B]=F?si(w[B]):Bn(w[B]);if(vr(H,q))_(H,q,y,null,Z,V,st,W,F);else break;C--,B--}if(x>C){if(x<=B){const H=B+1,q=H<v?w[H].el:tt;for(;x<=B;)_(null,w[x]=F?si(w[x]):Bn(w[x]),y,q,Z,V,st,W,F),x++}}else if(x>B)for(;x<=C;)Ft(R[x],Z,V,!0),x++;else{const H=x,q=x,_t=new Map;for(x=q;x<=B;x++){const xt=w[x]=F?si(w[x]):Bn(w[x]);xt.key!=null&&_t.set(xt.key,x)}let ct,ht=0;const Ct=B-q+1;let rt=!1,dt=0;const Et=new Array(Ct);for(x=0;x<Ct;x++)Et[x]=0;for(x=H;x<=C;x++){const xt=R[x];if(ht>=Ct){Ft(xt,Z,V,!0);continue}let kt;if(xt.key!=null)kt=_t.get(xt.key);else for(ct=q;ct<=B;ct++)if(Et[ct-q]===0&&vr(xt,w[ct])){kt=ct;break}kt===void 0?Ft(xt,Z,V,!0):(Et[kt-q]=x+1,kt>=dt?dt=kt:rt=!0,_(xt,w[kt],y,null,Z,V,st,W,F),ht++)}const Ht=rt?M_(Et):Ws;for(ct=Ht.length-1,x=Ct-1;x>=0;x--){const xt=q+x,kt=w[xt],Vt=w[xt+1],te=xt+1<v?Vt.el||_p(Vt):tt;Et[x]===0?_(null,kt,y,te,Z,V,st,W,F):rt&&(ct<0||x!==Ht[ct]?At(kt,y,te,2):ct--)}}},At=(R,w,y,tt,Z=null)=>{const{el:V,type:st,transition:W,children:F,shapeFlag:x}=R;if(x&6){At(R.component.subTree,w,y,tt);return}if(x&128){R.suspense.move(w,y,tt);return}if(x&64){st.move(R,w,y,gt);return}if(st===be){i(V,w,y);for(let C=0;C<F.length;C++)At(F[C],w,y,tt);i(R.anchor,w,y);return}if(st===Yo){A(R,w,y);return}if(tt!==2&&x&1&&W)if(tt===0)W.beforeEnter(V),i(V,w,y),qe(()=>W.enter(V),Z);else{const{leave:C,delayLeave:B,afterLeave:H}=W,q=()=>{R.ctx.isUnmounted?s(V):i(V,w,y)},_t=()=>{V._isLeaving&&V[Og](!0),C(V,()=>{q(),H&&H()})};B?B(V,q,_t):_t()}else i(V,w,y)},Ft=(R,w,y,tt=!1,Z=!1)=>{const{type:V,props:st,ref:W,children:F,dynamicChildren:x,shapeFlag:v,patchFlag:C,dirs:B,cacheIndex:H,memo:q}=R;if(C===-2&&(Z=!1),W!=null&&(hi(),Or(W,null,y,R,!0),di()),H!=null&&(w.renderCache[H]=void 0),v&256){w.ctx.deactivate(R);return}const _t=v&1&&B,ct=!Fr(R);let ht;if(ct&&(ht=st&&st.onVnodeBeforeUnmount)&&Nn(ht,w,R),v&6)mt(R.component,y,tt);else{if(v&128){R.suspense.unmount(y,tt);return}_t&&Wi(R,null,w,"beforeUnmount"),v&64?R.type.remove(R,w,y,gt,tt):x&&!x.hasOnce&&(V!==be||C>0&&C&64)?yt(x,w,y,!1,!0):(V===be&&C&384||!Z&&v&16)&&yt(F,w,y),tt&&Qt(R)}const Ct=q!=null&&H==null;(ct&&(ht=st&&st.onVnodeUnmounted)||_t||Ct)&&qe(()=>{ht&&Nn(ht,w,R),_t&&Wi(R,null,w,"unmounted"),Ct&&(R.el=null)},y)},Qt=R=>{const{type:w,el:y,anchor:tt,transition:Z}=R;if(w===be){at(y,tt);return}if(w===Yo){M(R);return}const V=()=>{s(y),Z&&!Z.persisted&&Z.afterLeave&&Z.afterLeave()};if(R.shapeFlag&1&&Z&&!Z.persisted){const{leave:st,delayLeave:W}=Z,F=()=>st(y,V);W?W(R.el,V,F):F()}else V()},at=(R,w)=>{let y;for(;R!==w;)y=h(R),s(R),R=y;s(w)},mt=(R,w,y)=>{const{bum:tt,scope:Z,job:V,subTree:st,um:W,m:F,a:x}=R;af(F),af(x),tt&&jo(tt),Z.stop(),V&&(V.flags|=8,Ft(st,R,w,y)),W&&qe(W,w),qe(()=>{R.isUnmounted=!0},w)},yt=(R,w,y,tt=!1,Z=!1,V=0)=>{for(let st=V;st<R.length;st++)Ft(R[st],w,y,tt,Z)},z=R=>{if(R.shapeFlag&6)return z(R.component.subTree);if(R.shapeFlag&128)return R.suspense.next();const w=h(R.anchor||R.el),y=w&&w[Jd];return y?h(y):w};let ut=!1;const lt=(R,w,y)=>{let tt;R==null?w._vnode&&(Ft(w._vnode,null,null,!0),tt=w._vnode.component):_(w._vnode||null,R,w,null,null,null,y),w._vnode=R,ut||(ut=!0,qu(tt),jd(),ut=!1)},gt={p:_,um:Ft,m:At,r:Qt,mt:Q,mc:L,pc:X,pbc:E,n:z,o:n};return{render:lt,hydrate:void 0,createApp:s_(lt)}}function Ja({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Xi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function y_(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function pu(n,t,e=!1){const i=n.children,s=t.children;if(Xt(i)&&Xt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=si(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&pu(o,a)),a.type===Oa&&(a.patchFlag===-1&&(a=s[r]=si(a)),a.el=o.el),a.type===zi&&!a.el&&(a.el=o.el)}}function M_(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function gp(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:gp(t)}function af(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function _p(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?_p(t.subTree):null}const vp=n=>n.__isSuspense;function S_(n,t){t&&t.pendingBranch?Xt(n)?t.effects.push(...n):t.effects.push(n):wg(n)}const be=Symbol.for("v-fgt"),Oa=Symbol.for("v-txt"),zi=Symbol.for("v-cmt"),Yo=Symbol.for("v-stc"),zr=[];let hn=null;function Pt(n=!1){zr.push(hn=n?null:[])}function E_(){zr.pop(),hn=zr[zr.length-1]||null}let jr=1;function ca(n,t=!1){jr+=n,n<0&&hn&&t&&(hn.hasOnce=!0)}function xp(n){return n.dynamicChildren=jr>0?hn||Ws:null,E_(),jr>0&&hn&&hn.push(n),n}function Lt(n,t,e,i,s,r){return xp(J(n,t,e,i,s,r,!0))}function cs(n,t,e,i,s){return xp(Ze(n,t,e,i,s,!0))}function ua(n){return n?n.__v_isVNode===!0:!1}function vr(n,t){return n.type===t.type&&n.key===t.key}const yp=({key:n})=>n??null,$o=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?xe(n)||He(n)||Yt(n)?{i:fn,r:n,k:t,f:!!e}:n:null);function J(n,t=null,e=null,i=0,s=null,r=n===be?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&yp(t),ref:t&&$o(t),scopeId:Yd,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:fn};return a?(mu(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=xe(e)?8:16),jr>0&&!o&&hn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&hn.push(l),l}const Ze=b_;function b_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===$g)&&(n=zi),ua(n)){const a=er(n,t,!0);return e&&mu(a,e),jr>0&&!r&&hn&&(a.shapeFlag&6?hn[hn.indexOf(n)]=a:hn.push(a)),a.patchFlag=-2,a}if(F_(n)&&(n=n.__vccOpts),t){t=T_(t);let{class:a,style:l}=t;a&&!xe(a)&&(t.class=Fi(a)),ue(l)&&(cu(l)&&!Xt(l)&&(l=Ne({},l)),t.style=Ra(l))}const o=xe(n)?1:vp(n)?128:Ig(n)?64:ue(n)?4:Yt(n)?2:0;return J(n,t,e,i,s,o,r,!0)}function T_(n){return n?cu(n)||up(n)?Ne({},n):n:null}function er(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?w_(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&yp(c),ref:t&&t.ref?e&&r?Xt(r)?r.concat($o(t)):[r,$o(t)]:$o(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==be?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&er(n.ssContent),ssFallback:n.ssFallback&&er(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&fu(u,l.clone(u)),u}function Jl(n=" ",t=0){return Ze(Oa,null,n,t)}function A_(n,t){const e=Ze(Yo,null,n);return e.staticCount=t,e}function Ce(n="",t=!1){return t?(Pt(),cs(zi,null,n)):Ze(zi,null,n)}function Bn(n){return n==null||typeof n=="boolean"?Ze(zi):Xt(n)?Ze(be,null,n.slice()):ua(n)?si(n):Ze(Oa,null,String(n))}function si(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:er(n)}function mu(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Xt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),mu(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!up(t)?t._ctx=fn:s===3&&fn&&(fn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Yt(t)?(t={default:t,_ctx:fn},e=32):(t=String(t),i&64?(e=16,t=[Jl(t)]):e=8);n.children=t,n.shapeFlag|=e}function w_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Fi([t.class,i.class]));else if(s==="style")t.style=Ra([t.style,i.style]);else if(Ea(s)){const r=t[s],o=i[s];o&&r!==o&&!(Xt(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ba(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Nn(n,t,e,i=null){Gn(n,t,7,[e,i])}const R_=rp();let C_=0;function P_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||R_,r={uid:C_++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Jm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:hp(i,s),emitsOptions:op(i,s),emit:null,emitted:null,propsDefaults:he,inheritAttrs:i.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=o_.bind(null,r),n.ce&&n.ce(r),r}let ze=null;const D_=()=>ze||fn;let fa,Ql;{const n=wa(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};fa=t("__VUE_INSTANCE_SETTERS__",e=>ze=e),Ql=t("__VUE_SSR_SETTERS__",e=>qr=e)}const eo=n=>{const t=ze;return fa(n),n.scope.on(),()=>{n.scope.off(),fa(t)}},lf=()=>{ze&&ze.scope.off(),fa(null)};function Mp(n){return n.vnode.shapeFlag&4}let qr=!1;function I_(n,t=!1,e=!1){t&&Ql(t);const{props:i,children:s}=n.vnode,r=Mp(n);h_(n,i,r,t),g_(n,s,e||t);const o=r?L_(n,t):void 0;return t&&Ql(!1),o}function L_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Zg);const{setup:i}=e;if(i){hi();const s=n.setupContext=i.length>1?N_(n):null,r=eo(n),o=to(i,n,0,[n.props,s]),a=yd(o);if(di(),r(),(a||n.sp)&&!Fr(n)&&Qd(n),a){if(o.then(lf,lf),t)return o.then(l=>{cf(n,l)}).catch(l=>{Da(l,n,0)});n.asyncDep=o}else cf(n,o)}else Sp(n)}function cf(n,t,e){Yt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ue(t)&&(n.setupState=Gd(t)),Sp(n)}function Sp(n,t,e){const i=n.type;n.render||(n.render=i.render||Hn);{const s=eo(n);hi();try{Jg(n)}finally{di(),s()}}}const U_={get(n,t){return Be(n,"get",""),n[t]}};function N_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,U_),slots:n.slots,emit:n.emit,expose:t}}function Fa(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Gd(vg(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Br)return Br[e](n)},has(t,e){return e in t||e in Br}})):n.proxy}function O_(n,t=!0){return Yt(n)?n.displayName||n.name:n.name||t&&n.__name}function F_(n){return Yt(n)&&"__vccOpts"in n}const Zt=(n,t)=>Sg(n,t,qr);function Ep(n,t,e){try{ca(-1);const i=arguments.length;return i===2?ue(t)&&!Xt(t)?ua(t)?Ze(n,null,[t]):Ze(n,t):Ze(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&ua(e)&&(e=[e]),Ze(n,t,e))}finally{ca(1)}}const B_="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let tc;const uf=typeof window<"u"&&window.trustedTypes;if(uf)try{tc=uf.createPolicy("vue",{createHTML:n=>n})}catch{}const bp=tc?n=>tc.createHTML(n):n=>n,z_="http://www.w3.org/2000/svg",k_="http://www.w3.org/1998/Math/MathML",ii=typeof document<"u"?document:null,ff=ii&&ii.createElement("template"),H_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ii.createElementNS(z_,n):t==="mathml"?ii.createElementNS(k_,n):e?ii.createElement(n,{is:e}):ii.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ii.createTextNode(n),createComment:n=>ii.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ii.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{ff.innerHTML=bp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=ff.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},V_=Symbol("_vtc");function G_(n,t,e){const i=n[V_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ha=Symbol("_vod"),Tp=Symbol("_vsh"),W_={name:"show",beforeMount(n,{value:t},{transition:e}){n[ha]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):xr(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),xr(n,!0),i.enter(n)):i.leave(n,()=>{xr(n,!1)}):xr(n,t))},beforeUnmount(n,{value:t}){xr(n,t)}};function xr(n,t){n.style.display=t?n[ha]:"none",n[Tp]=!t}const X_=Symbol(""),j_=/(?:^|;)\s*display\s*:/;function q_(n,t,e){const i=n.style,s=xe(e);let r=!1;if(e&&!s){if(t)if(xe(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Pr(i,a,"")}else for(const o in t)e[o]==null&&Pr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?$_(n,o,!xe(t)&&t?t[o]:void 0,a)||Pr(i,o,a):Pr(i,o,"")}}else if(s){if(t!==e){const o=i[X_];o&&(e+=";"+o),i.cssText=e,r=j_.test(e)}}else t&&n.removeAttribute("style");ha in n&&(n[ha]=r?i.display:"",n[Tp]&&(i.display="none"))}const hf=/\s*!important$/;function Pr(n,t,e){if(Xt(e))e.forEach(i=>Pr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=Y_(n,t);hf.test(e)?n.setProperty(Vi(i),e.replace(hf,""),"important"):n[i]=e}}const df=["Webkit","Moz","ms"],Qa={};function Y_(n,t){const e=Qa[t];if(e)return e;let i=Je(t);if(i!=="filter"&&i in n)return Qa[t]=i;i=Aa(i);for(let s=0;s<df.length;s++){const r=df[s]+i;if(r in n)return Qa[t]=r}return t}function $_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&xe(i)&&e===i}const pf="http://www.w3.org/1999/xlink";function mf(n,t,e,i,s,r=Km(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(pf,t.slice(6,t.length)):n.setAttributeNS(pf,t,e):e==null||r&&!bd(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Vn(e)?String(e):e)}function gf(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?bp(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=bd(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Fs(n,t,e,i){n.addEventListener(t,e,i)}function K_(n,t,e,i){n.removeEventListener(t,e,i)}const _f=Symbol("_vei");function Z_(n,t,e,i,s=null){const r=n[_f]||(n[_f]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=J_(t);if(i){const c=r[t]=e0(i,s);Fs(n,a,c,l)}else o&&(K_(n,a,o,l),r[t]=void 0)}}const vf=/(?:Once|Passive|Capture)$/;function J_(n){let t;if(vf.test(n)){t={};let i;for(;i=n.match(vf);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Vi(n.slice(2)),t]}let tl=0;const Q_=Promise.resolve(),t0=()=>tl||(Q_.then(()=>tl=0),tl=Date.now());function e0(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Gn(n0(i,e.value),t,5,[i])};return e.value=n,e.attached=t0(),e}function n0(n,t){if(Xt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const xf=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,i0=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?G_(n,i,o):t==="style"?q_(n,e,i):Ea(t)?ba(t)||Z_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):s0(n,t,i,o))?(gf(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&mf(n,t,i,o,r,t!=="value")):n._isVueCE&&(r0(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!xe(i)))?gf(n,Je(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),mf(n,t,i,o))};function s0(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&xf(t)&&Yt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return xf(t)&&xe(e)?!1:t in n}function r0(n,t){const e=n._def.props;if(!e)return!1;const i=Je(t);return Array.isArray(e)?e.some(s=>Je(s)===i):Object.keys(e).some(s=>Je(s)===i)}const yf=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Xt(t)?e=>jo(t,e):t};function o0(n){n.target.composing=!0}function Mf(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const el=Symbol("_assign");function Sf(n,t,e){return t&&(n=n.trim()),e&&(n=eu(n)),n}const a0={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n[el]=yf(s);const r=i||s.props&&s.props.type==="number";Fs(n,t?"change":"input",o=>{o.target.composing||n[el](Sf(n.value,e,r))}),(e||r)&&Fs(n,"change",()=>{n.value=Sf(n.value,e,r)}),t||(Fs(n,"compositionstart",o0),Fs(n,"compositionend",Mf),Fs(n,"change",Mf))},mounted(n,{value:t}){n.value=t??""},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[el]=yf(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?eu(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},l0=["ctrl","shift","alt","meta"],c0={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>l0.some(e=>n[`${e}Key`]&&!t.includes(e))},Ni=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=c0[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},u0={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},f0=(n,t)=>{const e=n._withKeys||(n._withKeys={}),i=t.join(".");return e[i]||(e[i]=(s=>{if(!("key"in s))return;const r=Vi(s.key);if(t.some(o=>o===r||u0[o]===r))return n(s)}))},h0=Ne({patchProp:i0},H_);let Ef;function d0(){return Ef||(Ef=v_(h0))}const p0=((...n)=>{const t=d0().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=g0(i);if(!s)return;const r=t._component;!Yt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,m0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function m0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function g0(n){return xe(n)?document.querySelector(n):n}const Gi=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},_0={};function v0(n,t){const e=Yg("router-view");return Pt(),cs(e)}const x0=Gi(_0,[["render",v0]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Bs=typeof document<"u";function Ap(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function y0(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Ap(n.default)}const oe=Object.assign;function nl(n,t){const e={};for(const i in t){const s=t[i];e[i]=Ln(s)?s.map(n):n(s)}return e}const kr=()=>{},Ln=Array.isArray;function bf(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const wp=/#/g,M0=/&/g,S0=/\//g,E0=/=/g,b0=/\?/g,Rp=/\+/g,T0=/%5B/g,A0=/%5D/g,Cp=/%5E/g,w0=/%60/g,Pp=/%7B/g,R0=/%7C/g,Dp=/%7D/g,C0=/%20/g;function gu(n){return n==null?"":encodeURI(""+n).replace(R0,"|").replace(T0,"[").replace(A0,"]")}function P0(n){return gu(n).replace(Pp,"{").replace(Dp,"}").replace(Cp,"^")}function ec(n){return gu(n).replace(Rp,"%2B").replace(C0,"+").replace(wp,"%23").replace(M0,"%26").replace(w0,"`").replace(Pp,"{").replace(Dp,"}").replace(Cp,"^")}function D0(n){return ec(n).replace(E0,"%3D")}function I0(n){return gu(n).replace(wp,"%23").replace(b0,"%3F")}function L0(n){return I0(n).replace(S0,"%2F")}function Yr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const U0=/\/$/,N0=n=>n.replace(U0,"");function il(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=z0(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:Yr(o)}}function O0(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function Tf(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function F0(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&nr(t.matched[i],e.matched[s])&&Ip(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function nr(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function Ip(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!B0(n[e],t[e]))return!1;return!0}function B0(n,t){return Ln(n)?Af(n,t):Ln(t)?Af(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function Af(n,t){return Ln(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function z0(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const xi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let nc=(function(n){return n.pop="pop",n.push="push",n})({}),sl=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function k0(n){if(!n)if(Bs){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),N0(n)}const H0=/^[^#]+#/;function V0(n,t){return n.replace(H0,"#")+t}function G0(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const Ba=()=>({left:window.scrollX,top:window.scrollY});function W0(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=G0(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function wf(n,t){return(history.state?history.state.position-t:-1)+n}const ic=new Map;function X0(n,t){ic.set(n,t)}function j0(n){const t=ic.get(n);return ic.delete(n),t}function q0(n){return typeof n=="string"||n&&typeof n=="object"}function Lp(n){return typeof n=="string"||typeof n=="symbol"}let ye=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Up=Symbol("");ye.MATCHER_NOT_FOUND+"",ye.NAVIGATION_GUARD_REDIRECT+"",ye.NAVIGATION_ABORTED+"",ye.NAVIGATION_CANCELLED+"",ye.NAVIGATION_DUPLICATED+"";function ir(n,t){return oe(new Error,{type:n,[Up]:!0},t)}function Kn(n,t){return n instanceof Error&&Up in n&&(t==null||!!(n.type&t))}const Y0=["params","query","hash"];function $0(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of Y0)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function K0(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(Rp," "),r=s.indexOf("="),o=Yr(r<0?s:s.slice(0,r)),a=r<0?null:Yr(s.slice(r+1));if(o in t){let l=t[o];Ln(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function Rf(n){let t="";for(let e in n){const i=n[e];if(e=D0(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(Ln(i)?i.map(s=>s&&ec(s)):[i&&ec(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function Z0(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=Ln(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const J0=Symbol(""),Cf=Symbol(""),no=Symbol(""),_u=Symbol(""),sc=Symbol("");function yr(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function Ci(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(ir(ye.NAVIGATION_ABORTED,{from:e,to:t})):h instanceof Error?l(h):q0(h)?l(ir(ye.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(o&&i.enterCallbacks[s]===o&&typeof h=="function"&&o.push(h),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function rl(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Ap(l)){const c=(l.__vccOpts||l)[t];c&&r.push(Ci(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=y0(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[t];return h&&Ci(h,e,i,o,a,s)()}))}}return r}function Q0(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>nr(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>nr(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let tv=()=>location.protocol+"//"+location.host;function Np(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),Tf(a,"")}return Tf(e,n)+i+s}function ev(n,t,e,i){let s=[],r=[],o=null;const a=({state:h})=>{const d=Np(n,location),g=e.value,_=t.value;let m=0;if(h){if(e.value=d,t.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(d);s.forEach(p=>{p(e.value,g,{delta:m,type:nc.pop,direction:m?m>0?sl.forward:sl.back:sl.unknown})})};function l(){o=e.value}function c(h){s.push(h);const d=()=>{const g=s.indexOf(h);g>-1&&s.splice(g,1)};return r.push(d),d}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(oe({},h.state,{scroll:Ba()}),"")}}function f(){for(const h of r)h();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function Pf(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?Ba():null}}function nv(n){const{history:t,location:e}=window,i={value:Np(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const f=n.indexOf("#"),h=f>-1?(e.host&&document.querySelector("base")?n:n.slice(f))+l:tv()+n+l;try{t[u?"replaceState":"pushState"](c,"",h),s.value=c}catch(d){console.error(d),e[u?"replace":"assign"](h)}}function o(l,c){r(l,oe({},t.state,Pf(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=oe({},s.value,t.state,{forward:l,scroll:Ba()});r(u.current,u,!0),r(l,oe({},Pf(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function iv(n){n=k0(n);const t=nv(n),e=ev(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=oe({location:"",base:n,go:i,createHref:V0.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function sv(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),iv(n)}let is=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var we=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(we||{});const rv={type:is.Static,value:""},ov=/[a-zA-Z0-9_]/;function av(n){if(!n)return[[]];if(n==="/")return[[rv]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(d){throw new Error(`ERR (${e})/"${c}": ${d}`)}let e=we.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function f(){c&&(e===we.Static?r.push({type:is.Static,value:c}):e===we.Param||e===we.ParamRegExp||e===we.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:is.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==we.ParamRegExp){i=e,e=we.EscapeNext;continue}switch(e){case we.Static:l==="/"?(c&&f(),o()):l===":"?(f(),e=we.Param):h();break;case we.EscapeNext:h(),e=i;break;case we.Param:l==="("?e=we.ParamRegExp:ov.test(l)?h():(f(),e=we.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case we.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=we.ParamRegExpEnd:u+=l;break;case we.ParamRegExpEnd:f(),e=we.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===we.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),f(),o(),s}const Df="[^/]+?",lv={sensitive:!1,strict:!1,start:!0,end:!0};var Ye=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(Ye||{});const cv=/[.+*?^${}()[\]/\\]/g;function uv(n,t){const e=oe({},lv,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[Ye.Root];e.strict&&!c.length&&(s+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=Ye.Segment+(e.sensitive?Ye.BonusCaseSensitive:0);if(h.type===is.Static)f||(s+="/"),s+=h.value.replace(cv,"\\$&"),d+=Ye.Static;else if(h.type===is.Param){const{value:g,repeatable:_,optional:m,regexp:p}=h;r.push({name:g,repeatable:_,optional:m});const S=p||Df;if(S!==Df){d+=Ye.BonusCustomRegExp;try{`${S}`}catch(M){throw new Error(`Invalid custom RegExp for param "${g}" (${S}): `+M.message)}}let A=_?`((?:${S})(?:/(?:${S}))*)`:`(${S})`;f||(A=m&&c.length<2?`(?:/${A})`:"/"+A),m&&(A+="?"),s+=A,d+=Ye.Dynamic,m&&(d+=Ye.BonusOptional),_&&(d+=Ye.BonusRepeatable),S===".*"&&(d+=Ye.BonusWildcard)}u.push(d)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=Ye.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=r[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===is.Static)u+=d.value;else if(d.type===is.Param){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(Ln(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const S=Ln(p)?p.join("/"):p;if(!S)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=S}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function fv(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===Ye.Static+Ye.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===Ye.Static+Ye.Segment?1:-1:0}function Op(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=fv(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(If(i))return 1;if(If(s))return-1}return s.length-i.length}function If(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const hv={strict:!1,end:!0,sensitive:!1};function dv(n,t,e){const i=uv(av(n.path),e),s=oe(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function pv(n,t){const e=[],i=new Map;t=bf(hv,t);function s(f){return i.get(f)}function r(f,h,d){const g=!d,_=Uf(f);_.aliasOf=d&&d.record;const m=bf(t,f),p=[_];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const G of M)p.push(Uf(oe({},_,{components:d?d.record.components:_.components,path:G,aliasOf:d?d.record:_})))}let S,A;for(const M of p){const{path:G}=M;if(h&&G[0]!=="/"){const I=h.record.path,D=I[I.length-1]==="/"?"":"/";M.path=h.record.path+(G&&D+G)}if(S=dv(M,h,m),d?d.alias.push(S):(A=A||S,A!==S&&A.alias.push(S),g&&f.name&&!Nf(S)&&o(f.name)),Fp(S)&&l(S),_.children){const I=_.children;for(let D=0;D<I.length;D++)r(I[D],S,d&&d.children[D])}d=d||S}return A?()=>{o(A)}:kr}function o(f){if(Lp(f)){const h=i.get(f);h&&(i.delete(f),e.splice(e.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=e.indexOf(f);h>-1&&(e.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return e}function l(f){const h=_v(f,e);e.splice(h,0,f),f.record.name&&!Nf(f)&&i.set(f.record.name,f)}function c(f,h){let d,g={},_,m;if("name"in f&&f.name){if(d=i.get(f.name),!d)throw ir(ye.MATCHER_NOT_FOUND,{location:f});m=d.record.name,g=oe(Lf(h.params,d.keys.filter(A=>!A.optional).concat(d.parent?d.parent.keys.filter(A=>A.optional):[]).map(A=>A.name)),f.params&&Lf(f.params,d.keys.map(A=>A.name))),_=d.stringify(g)}else if(f.path!=null)_=f.path,d=e.find(A=>A.re.test(_)),d&&(g=d.parse(_),m=d.record.name);else{if(d=h.name?i.get(h.name):e.find(A=>A.re.test(h.path)),!d)throw ir(ye.MATCHER_NOT_FOUND,{location:f,currentLocation:h});m=d.record.name,g=oe({},h.params,f.params),_=d.stringify(g)}const p=[];let S=d;for(;S;)p.unshift(S.record),S=S.parent;return{name:m,path:_,params:g,matched:p,meta:gv(p)}}n.forEach(f=>r(f));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Lf(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function Uf(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:mv(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function mv(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function Nf(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function gv(n){return n.reduce((t,e)=>oe(t,e.meta),{})}function _v(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Op(n,t[r])<0?i=r:e=r+1}const s=vv(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function vv(n){let t=n;for(;t=t.parent;)if(Fp(t)&&Op(n,t)===0)return t}function Fp({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Of(n){const t=Mn(no),e=Mn(_u),i=Zt(()=>{const l=dn(n.to);return t.resolve(l)}),s=Zt(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=e.matched;if(!u||!f.length)return-1;const h=f.findIndex(nr.bind(null,u));if(h>-1)return h;const d=Ff(l[c-2]);return c>1&&Ff(u)===d&&f[f.length-1].path!==d?f.findIndex(nr.bind(null,l[c-2])):h}),r=Zt(()=>s.value>-1&&Ev(e.params,i.value.params)),o=Zt(()=>s.value>-1&&s.value===e.matched.length-1&&Ip(e.params,i.value.params));function a(l={}){if(Sv(l)){const c=t[dn(n.replace)?"replace":"push"](dn(n.to)).catch(kr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Zt(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function xv(n){return n.length===1?n[0]:n}const yv=mi({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Of,setup(n,{slots:t}){const e=Pa(Of(n)),{options:i}=Mn(no),s=Zt(()=>({[Bf(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[Bf(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&xv(t.default(e));return n.custom?r:Ep("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),Mv=yv;function Sv(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function Ev(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!Ln(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function Ff(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Bf=(n,t,e)=>n??t??e,bv=mi({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=Mn(sc),s=Zt(()=>n.route||i.value),r=Mn(Cf,0),o=Zt(()=>{let c=dn(r);const{matched:u}=s.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Zt(()=>s.value.matched[o.value]);qo(Cf,Zt(()=>o.value+1)),qo(J0,a),qo(sc,s);const l=Wt();return on(()=>[l.value,a.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!nr(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return zf(e.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=Ep(h,oe({},g,t,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return zf(e.default,{Component:m,route:c})||m}}});function zf(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const Tv=bv;function Av(n){const t=pv(n.routes,n),e=n.parseQuery||K0,i=n.stringifyQuery||Rf,s=n.history,r=yr(),o=yr(),a=yr(),l=tr(xi);let c=xi;Bs&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=nl.bind(null,z=>""+z),f=nl.bind(null,L0),h=nl.bind(null,Yr);function d(z,ut){let lt,gt;return Lp(z)?(lt=t.getRecordMatcher(z),gt=ut):gt=z,t.addRoute(gt,lt)}function g(z){const ut=t.getRecordMatcher(z);ut&&t.removeRoute(ut)}function _(){return t.getRoutes().map(z=>z.record)}function m(z){return!!t.getRecordMatcher(z)}function p(z,ut){if(ut=oe({},ut||l.value),typeof z=="string"){const y=il(e,z,ut.path),tt=t.resolve({path:y.path},ut),Z=s.createHref(y.fullPath);return oe(y,tt,{params:h(tt.params),hash:Yr(y.hash),redirectedFrom:void 0,href:Z})}let lt;if(z.path!=null)lt=oe({},z,{path:il(e,z.path,ut.path).path});else{const y=oe({},z.params);for(const tt in y)y[tt]==null&&delete y[tt];lt=oe({},z,{params:f(y)}),ut.params=f(ut.params)}const gt=t.resolve(lt,ut),Dt=z.hash||"";gt.params=u(h(gt.params));const R=O0(i,oe({},z,{hash:P0(Dt),path:gt.path})),w=s.createHref(R);return oe({fullPath:R,hash:Dt,query:i===Rf?Z0(z.query):z.query||{}},gt,{redirectedFrom:void 0,href:w})}function S(z){return typeof z=="string"?il(e,z,l.value.path):oe({},z)}function A(z,ut){if(c!==z)return ir(ye.NAVIGATION_CANCELLED,{from:ut,to:z})}function M(z){return D(z)}function G(z){return M(oe(S(z),{replace:!0}))}function I(z,ut){const lt=z.matched[z.matched.length-1];if(lt&&lt.redirect){const{redirect:gt}=lt;let Dt=typeof gt=="function"?gt(z,ut):gt;return typeof Dt=="string"&&(Dt=Dt.includes("?")||Dt.includes("#")?Dt=S(Dt):{path:Dt},Dt.params={}),oe({query:z.query,hash:z.hash,params:Dt.path!=null?{}:z.params},Dt)}}function D(z,ut){const lt=c=p(z),gt=l.value,Dt=z.state,R=z.force,w=z.replace===!0,y=I(lt,gt);if(y)return D(oe(S(y),{state:typeof y=="object"?oe({},Dt,y.state):Dt,force:R,replace:w}),ut||lt);const tt=lt;tt.redirectedFrom=ut;let Z;return!R&&F0(i,gt,lt)&&(Z=ir(ye.NAVIGATION_DUPLICATED,{to:tt,from:gt}),At(gt,gt,!0,!1)),(Z?Promise.resolve(Z):E(tt,gt)).catch(V=>Kn(V)?Kn(V,ye.NAVIGATION_GUARD_REDIRECT)?V:Mt(V):X(V,tt,gt)).then(V=>{if(V){if(Kn(V,ye.NAVIGATION_GUARD_REDIRECT))return D(oe({replace:w},S(V.to),{state:typeof V.to=="object"?oe({},Dt,V.to.state):Dt,force:R}),ut||tt)}else V=N(tt,gt,!0,w,Dt);return P(tt,gt,V),V})}function L(z,ut){const lt=A(z,ut);return lt?Promise.reject(lt):Promise.resolve()}function b(z){const ut=at.values().next().value;return ut&&typeof ut.runWithContext=="function"?ut.runWithContext(z):z()}function E(z,ut){let lt;const[gt,Dt,R]=Q0(z,ut);lt=rl(gt.reverse(),"beforeRouteLeave",z,ut);for(const y of gt)y.leaveGuards.forEach(tt=>{lt.push(Ci(tt,z,ut))});const w=L.bind(null,z,ut);return lt.push(w),yt(lt).then(()=>{lt=[];for(const y of r.list())lt.push(Ci(y,z,ut));return lt.push(w),yt(lt)}).then(()=>{lt=rl(Dt,"beforeRouteUpdate",z,ut);for(const y of Dt)y.updateGuards.forEach(tt=>{lt.push(Ci(tt,z,ut))});return lt.push(w),yt(lt)}).then(()=>{lt=[];for(const y of R)if(y.beforeEnter)if(Ln(y.beforeEnter))for(const tt of y.beforeEnter)lt.push(Ci(tt,z,ut));else lt.push(Ci(y.beforeEnter,z,ut));return lt.push(w),yt(lt)}).then(()=>(z.matched.forEach(y=>y.enterCallbacks={}),lt=rl(R,"beforeRouteEnter",z,ut,b),lt.push(w),yt(lt))).then(()=>{lt=[];for(const y of o.list())lt.push(Ci(y,z,ut));return lt.push(w),yt(lt)}).catch(y=>Kn(y,ye.NAVIGATION_CANCELLED)?y:Promise.reject(y))}function P(z,ut,lt){a.list().forEach(gt=>b(()=>gt(z,ut,lt)))}function N(z,ut,lt,gt,Dt){const R=A(z,ut);if(R)return R;const w=ut===xi,y=Bs?history.state:{};lt&&(gt||w?s.replace(z.fullPath,oe({scroll:w&&y&&y.scroll},Dt)):s.push(z.fullPath,Dt)),l.value=z,At(z,ut,lt,w),Mt()}let O;function Q(){O||(O=s.listen((z,ut,lt)=>{if(!mt.listening)return;const gt=p(z),Dt=I(gt,mt.currentRoute.value);if(Dt){D(oe(Dt,{replace:!0,force:!0}),gt).catch(kr);return}c=gt;const R=l.value;Bs&&X0(wf(R.fullPath,lt.delta),Ba()),E(gt,R).catch(w=>Kn(w,ye.NAVIGATION_ABORTED|ye.NAVIGATION_CANCELLED)?w:Kn(w,ye.NAVIGATION_GUARD_REDIRECT)?(D(oe(S(w.to),{force:!0}),gt).then(y=>{Kn(y,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&!lt.delta&&lt.type===nc.pop&&s.go(-1,!1)}).catch(kr),Promise.reject()):(lt.delta&&s.go(-lt.delta,!1),X(w,gt,R))).then(w=>{w=w||N(gt,R,!1),w&&(lt.delta&&!Kn(w,ye.NAVIGATION_CANCELLED)?s.go(-lt.delta,!1):lt.type===nc.pop&&Kn(w,ye.NAVIGATION_ABORTED|ye.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),P(gt,R,w)}).catch(kr)}))}let j=yr(),U=yr(),nt;function X(z,ut,lt){Mt(z);const gt=U.list();return gt.length?gt.forEach(Dt=>Dt(z,ut,lt)):console.error(z),Promise.reject(z)}function pt(){return nt&&l.value!==xi?Promise.resolve():new Promise((z,ut)=>{j.add([z,ut])})}function Mt(z){return nt||(nt=!z,Q(),j.list().forEach(([ut,lt])=>z?lt(z):ut()),j.reset()),z}function At(z,ut,lt,gt){const{scrollBehavior:Dt}=n;if(!Bs||!Dt)return Promise.resolve();const R=!lt&&j0(wf(z.fullPath,0))||(gt||!lt)&&history.state&&history.state.scroll||null;return ls().then(()=>Dt(z,ut,R)).then(w=>w&&W0(w)).catch(w=>X(w,z,ut))}const Ft=z=>s.go(z);let Qt;const at=new Set,mt={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:_,resolve:p,options:n,push:M,replace:G,go:Ft,back:()=>Ft(-1),forward:()=>Ft(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:U.add,isReady:pt,install(z){z.component("RouterLink",Mv),z.component("RouterView",Tv),z.config.globalProperties.$router=mt,Object.defineProperty(z.config.globalProperties,"$route",{enumerable:!0,get:()=>dn(l)}),Bs&&!Qt&&l.value===xi&&(Qt=!0,M(s.location).catch(gt=>{}));const ut={};for(const gt in xi)Object.defineProperty(ut,gt,{get:()=>l.value[gt],enumerable:!0});z.provide(no,mt),z.provide(_u,Hd(ut)),z.provide(sc,l);const lt=z.unmount;at.add(z),z.unmount=function(){at.delete(z),at.size<1&&(c=xi,O&&O(),O=null,l.value=xi,Qt=!1,nt=!1),lt()}}};function yt(z){return z.reduce((ut,lt)=>ut.then(()=>b(lt)),Promise.resolve())}return mt}function io(){return Mn(no)}function Bp(n){return Mn(_u)}function zp(n){var e;const t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}function kp(){zp({type:"close",source:"galaxy-h5"})}function wv(n){if(typeof window>"u")return;const t=n==null?"":String(n);window.__GALAXY_ROUTE_NAME__=t}function da(n){const t=n==null?"":String(n);wv(t),zp({type:"galaxy-route",source:"galaxy-h5",name:t})}const Hr=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],pa="galaxy_majors",Rv={class:"select-page"},Cv={class:"picked","aria-live":"polite"},Pv={class:"picked-row"},Dv={class:"value"},Iv={class:"picked-row"},Lv={class:"value"},Uv={class:"grid"},Nv=["onClick"],Ov={class:"card-title"},Fv={class:"card-tag"},Bv={class:"footer"},zv=["disabled"],kv={key:0,class:"toast",role:"status"},Hv=mi({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=io(),i=Wt(null),s=Wt(null),r=Wt(""),o=Zt(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(f){r.value=f,window.setTimeout(()=>{r.value=""},1800)}function l(f){if(f===i.value){i.value=null;return}if(f===s.value){s.value=null;return}if(!i.value){i.value=f;return}if(!s.value){if(f===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=f;return}s.value=f}function c(){if(!o.value)return;const f={fromId:i.value,toId:s.value};sessionStorage.setItem(pa,JSON.stringify(f)),e.push({name:"galaxy"})}function u(){kp()}return(f,h)=>{var d,g;return Pt(),Lt("div",Rv,[h[4]||(h[4]=J("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),J("div",{class:"custom-nav"},[J("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[J("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),h[0]||(h[0]=J("div",{class:"nav-title"},"专业星系",-1)),h[1]||(h[1]=J("div",{class:"nav-right"},null,-1))]),h[5]||(h[5]=A_('<div class="nav-spacer" data-v-ea557b8b></div><header class="header" data-v-ea557b8b><p class="eyebrow" data-v-ea557b8b>专业交叉星系</p><h1 class="title" data-v-ea557b8b>选择你的星域</h1><p class="subtitle" data-v-ea557b8b>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),J("section",Cv,[J("div",Pv,[h[2]||(h[2]=J("span",{class:"label"},"主修 / 起点",-1)),J("span",Dv,It(i.value?(d=dn(Hr).find(_=>_.id===i.value))==null?void 0:d.label:"未选择"),1)]),J("div",Iv,[h[3]||(h[3]=J("span",{class:"label"},"交叉意向",-1)),J("span",Lv,It(s.value?(g=dn(Hr).find(_=>_.id===s.value))==null?void 0:g.label:"未选择"),1)])]),J("div",Uv,[(Pt(!0),Lt(be,null,Bi(dn(Hr),_=>(Pt(),Lt("button",{key:_.id,type:"button",class:Fi(["card",{"is-from":_.id===i.value,"is-to":_.id===s.value}]),onClick:m=>l(_.id)},[J("span",Ov,It(_.label),1),J("span",Fv,It(_.tagline),1)],10,Nv))),128))]),J("footer",Bv,[J("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,zv)]),r.value?(Pt(),Lt("div",kv,It(r.value),1)):Ce("",!0)])}}}),Vv=Gi(Hv,[["__scopeId","data-v-ea557b8b"]]),Gv="modulepreload",Wv=function(n,t){return new URL(n,t).href},kf={},ps=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let o=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=o(e.map(u=>{if(u=Wv(u,i),u in kf)return;kf[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!i)for(let _=a.length-1;_>=0;_--){const m=a[_];if(m.href===u&&(!f||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const g=document.createElement("link");if(g.rel=f?"stylesheet":Gv,f||(g.as="script"),g.crossOrigin="",g.href=u,c&&g.setAttribute("nonce",c),document.head.appendChild(g),f)return new Promise((_,m)=>{g.addEventListener("load",_),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function za(){if(typeof window>"u")return"";const n=window.__GALAXY_API_BASE__;return n!=null&&String(n).trim()!==""?String(n).trim().replace(/\/+$/,""):""}function Hp(){if(typeof window>"u")return null;const n=window.__GALAXY_USER_ID__;if(n===""||n==null)return null;const t=typeof n=="number"?n:Number(n);return!Number.isFinite(t)||t<=0?null:t}function Xv(){return za().length>0&&Hp()!=null}const so=Xv,ms=Hp;function Hf(){return za()||"./mock"}function zs(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function Vf(n="/mock"){const t=zs("manifest.json",n),e=await fetch(t).then(f=>{if(!f.ok)throw new Error(`manifest ${f.status}`);return f.json()}),i=zs(e.nodes_url,n),s=zs(e.edges_url,n),r=zs(e.hyperedges_url,n),o=zs(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(f=>{if(!f.ok)throw new Error(`nodes ${f.status}`);return f.json()}),fetch(s).then(f=>{if(!f.ok)throw new Error(`edges ${f.status}`);return f.json()}),fetch(r).then(f=>{if(!f.ok)throw new Error(`hyperedges ${f.status}`);return f.json()}),fetch(o).then(f=>{if(!f.ok)throw new Error(`layout ${f.status}`);return f.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function ol(n="/mock",t){const e=za();if(e&&n===e)try{const{fetchRecommend:o}=await ps(async()=>{const{fetchRecommend:a}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchRecommend:a}},[],import.meta.url);return o(t)}catch{}const i=t?`?selectedNodeId=${encodeURIComponent(t)}`:"",s=zs(`recommend.json${i}`,n),r=await fetch(s);if(!r.ok)throw new Error(`recommend ${r.status}`);return r.json()}function jv(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function as(n,t){const e=[],i=new Set;for(const s of t){const r=s.member_node_ids;if(r!=null&&r.length&&r.includes(n)){e.push(s.id);for(const o of r)i.add(o)}}return{hyperedgeIds:e,memberIds:i}}const ma={major_electrical:"电气工程",major_law:"法学",major_accounting:"会计学",major_cs:"计算机科学",major_finance:"金融学",major_clinical:"临床医学",major_swe:"软件工程",major_marketing:"市场营销",major_ds:"数据科学",major_english:"英语"};function qv(n,t){const e=ma[n],i=ma[t];return!e||!i?["",""]:[`${e}×${i}`,`${i}×${e}`]}const Gf=Object.fromEntries(Object.entries(ma).map(([n,t])=>[t,n]));function Vp(n){const t=n.split("×").map(s=>s.trim());if(t.length!==2)return null;const e=Gf[t[0]],i=Gf[t[1]];return!e||!i?null:[e,i]}function Gp(n,t){return n<=t?`${n}|${t}`:`${t}|${n}`}const Wf=`\r
序号	学科组合	岗位名称	热度	初级年薪	中级年薪	高级年薪	工作强度	竞争比	学历门槛	核心技能\r
1	电气工程×法学	电力法规工程师	中	18-25	30-40	45-60	2	15:1	本科70% 硕士30%	电力系统基础,法律法规检索,合规报告撰写\r
2	电气工程×法学	能源法律顾问	中	20-28	32-45	50-70	2	12:1	本科60% 硕士40%	能源法,合同审核,项目管理\r
3	电气工程×法学	智能电网合规专员	中	16-24	28-38	42-55	2	10:1	本科80% 硕士20%	电网标准,数据隐私,风险评估\r
4	电气工程×会计学	电力行业财务分析师	中	15-22	25-35	40-50	2	10:1	本科80% 硕士20%	财务建模,电力成本,Excel/VBA\r
5	电气工程×会计学	能源项目成本控制	中	14-20	24-32	38-48	2	8:1	本科85% 硕士15%	成本会计,项目预算,ERP\r
6	电气工程×会计学	资产折旧专员	低	12-18	20-28	30-40	1	6:1	本科90% 硕士10%	固定资产管理,税法,折旧计算\r
7	电气工程×计算机科学	嵌入式系统工程师	高	20-30	35-50	60-80	3	20:1	本科60% 硕士40%	C/C++,RTOS,硬件接口\r
8	电气工程×计算机科学	工业物联网开发	高	18-28	32-45	55-75	3	18:1	本科70% 硕士30%	MQTT,边缘计算,传感器\r
9	电气工程×计算机科学	电力自动化工程师	高	19-29	34-48	58-78	3	16:1	本科65% 硕士35%	变电站自动化,IEC61850,PLC\r
10	电气工程×金融学	电力市场交易员	中	16-24	28-40	45-60	3	12:1	本科70% 硕士30%	电力市场,数据分析,Python\r
11	电气工程×金融学	能源金融分析师	中	18-26	32-45	50-70	3	15:1	本科50% 硕士50%	金融衍生品,碳交易,量化模型\r
12	电气工程×金融学	碳交易产品经理	高	20-30	36-50	60-85	3	18:1	本科40% 硕士60%	碳市场政策,产品设计,数据分析\r
13	电气工程×临床医学	医疗设备硬件工程师	高	18-28	35-50	60-85	3	18:1	本科50% 硕士50%	模电/数电,EMC设计,医疗器械标准\r
14	电气工程×临床医学	电生理信号处理工程师	高	20-30	38-55	65-90	3	15:1	本科40% 硕士60%	信号处理,Python/MATLAB,生物医学工程\r
15	电气工程×临床医学	医学影像设备研发	高	22-32	40-58	70-100	3	20:1	本科30% 硕士70%	成像原理,FPGA,系统集成\r
16	电气工程×软件工程	工业控制软件工程师	高	16-25	30-42	50-70	3	15:1	本科70% 硕士30%	PLC编程,C#/C++,SCADA\r
17	电气工程×软件工程	智能硬件开发	高	18-28	32-48	55-80	3	18:1	本科60% 硕士40%	嵌入式Linux,ARM,物联网协议\r
18	电气工程×软件工程	PLC编程专家	中	15-22	28-38	45-60	3	12:1	本科80% 硕士20%	梯形图,结构化文本,现场总线\r
19	电气工程×市场营销	电气产品销售工程师	高	12-20(提成)	25-40	45-70	4	10:1	本科85% 硕士15%	技术理解,客户关系,招投标流程\r
20	电气工程×市场营销	能源方案顾问	中	15-24	28-42	50-70	3	8:1	本科70% 硕士30%	能耗分析,方案设计,商务谈判\r
21	电气工程×市场营销	工业品品牌经理	中	14-22	26-38	45-65	2	6:1	本科80% 硕士20%	品牌策划,市场调研,B2B营销\r
22	电气工程×数据科学	工业大数据分析师	高	18-26	32-45	55-75	3	20:1	本科40% 硕士60%	Python/SQL,时序分析,Spark\r
23	电气工程×数据科学	设备预测维护工程师	高	17-25	30-44	52-72	3	15:1	本科50% 硕士50%	机器学习,振动分析,SCADA数据\r
24	电气工程×数据科学	电力系统优化建模	高	20-30	36-52	60-85	3	18:1	本科30% 硕士70%	运筹优化,Python,电力系统分析\r
25	电气工程×英语	电气技术文档工程师	低	10-16	18-25	28-35	1	8:1	本科90% 硕士10%	技术写作,AutoCAD阅读,英语翻译\r
26	电气工程×英语	国际电力项目协调	中	14-22	25-38	40-60	2	10:1	本科70% 硕士30%	项目管理,商务英语,跨文化沟通\r
27	电气工程×英语	英文专利分析(电气方向)	中	12-20	22-35	40-55	2	6:1	本科80% 硕士20%	专利检索,电气知识,英译中\r
28	法学×会计学	法务会计	高	20-30	35-55	60-90	3	25:1	本科30% 硕士70%	会计原理,证据法,舞弊调查\r
29	法学×会计学	税务律师	高	22-35	40-65	70-110	3	20:1	本科20% 硕士80%	税法,税务筹划,争议解决\r
30	法学×会计学	合规审计师	中	18-28	32-48	55-80	2	15:1	本科50% 硕士50%	内部审计,合规框架,风险评估\r
31	法学×计算机科学	网络与信息安全律师	高	25-40	45-70	80-120	3	30:1	本科10% 硕士90%	网络安全法,电子取证,ISO27001\r
32	法学×计算机科学	数据隐私合规官	极高	25-40	45-70	80-120	3	30:1	本科20% 硕士80%	GDPR/CCPA,风险评估,法律写作\r
33	法学×计算机科学	电子取证专家	高	20-32	38-55	65-90	3	20:1	本科40% 硕士60%	数字取证,逆向分析,法律程序\r
34	法学×金融学	金融监管律师	高	20-35	40-65	70-110	4	35:1	本科10% 硕士90%	证券法,银行法,合规调查\r
35	法学×金融学	证券合规官	高	22-36	42-68	75-120	3	30:1	本科20% 硕士80%	信息披露,内幕交易防范,监管报送\r
36	法学×金融学	反洗钱分析师	高	18-28	32-48	55-80	3	25:1	本科50% 硕士50%	反洗钱法规,交易监控,可疑报告\r
37	法学×临床医学	医疗合规官	高	22-32	38-55	60-85	3	20:1	本科40% 硕士60%	医疗法规(HIPAA),临床试验GCP,风险管理\r
38	法学×临床医学	医事律师	高	20-30	35-55	65-95	3	25:1	本科10% 硕士90%	医疗纠纷,侵权法,病历审查\r
39	法学×临床医学	临床试验法规专员	中	18-26	30-45	50-70	2	15:1	本科50% 硕士50%	ICH-GCP,伦理审查,IND/NDA申报\r
40	法学×软件工程	软件许可合规顾问	中	18-26	30-45	50-70	2	12:1	本科70% 硕士30%	开源许可证,软件资产管理,合同审核\r
41	法学×软件工程	开源协议专家	中	20-30	35-52	60-85	2	15:1	本科40% 硕士60%	开源法律,许可证兼容性,企业合规\r
42	法学×软件工程	知识产权律师(软件方向)	高	22-35	42-65	75-110	3	30:1	本科20% 硕士80%	专利法,软件著作权,侵权分析\r
43	法学×市场营销	广告法合规专员	中	15-22	25-35	40-55	2	10:1	本科80% 硕士20%	广告法,市场监管,文案审核\r
44	法学×市场营销	消费者权益律师	中	18-26	30-45	50-70	3	15:1	本科50% 硕士50%	消费者保护法,诉讼,调解\r
45	法学×市场营销	营销合同审核	低	12-18	20-30	35-50	2	8:1	本科90% 硕士10%	合同法,风险识别,谈判\r
46	法学×数据科学	算法合规顾问	高	30-45	50-80	90-140	3	25:1	本科10% 硕士90%	机器学习可解释性,公平性评估,法律知识\r
47	法学×数据科学	数据治理专家	高	25-38	45-70	80-120	3	20:1	本科30% 硕士70%	数据分类,数据生命周期,合规工具\r
48	法学×数据科学	隐私保护工程师	高	22-35	42-65	75-110	3	25:1	本科20% 硕士80%	匿名化技术,数据映射,DPIA\r
49	法学×英语	涉外法务	高	18-28	35-55	60-90	4	20:1	本科20% 硕士80%	国际商法,英语法律文书,谈判\r
50	法学×英语	法律翻译	中	12-20	22-35	40-60	2	10:1	本科70% 硕士30%	法律术语,中英互译,审校\r
51	法学×英语	国际仲裁助理	中	16-24	28-42	50-70	3	12:1	本科30% 硕士70%	仲裁规则,案件管理,法律检索\r
52	会计学×计算机科学	会计信息系统实施	高	15-22	28-38	45-60	3	15:1	本科70% 硕士30%	用友/金蝶,SQL,业务流程\r
53	会计学×计算机科学	财务数据分析师	高	18-28	32-48	55-80	3	20:1	本科40% 硕士60%	Python/SQL,数据可视化,财务指标\r
54	会计学×计算机科学	ERP财务顾问	高	16-25	30-45	55-75	3	18:1	本科60% 硕士40%	SAP/Oracle,财务模块,业务蓝图\r
55	会计学×金融学	财务分析师	极高	18-25	35-50	60-85	3	30:1	本科40% 硕士60%	三张表分析,估值建模,Excel/PPT\r
56	会计学×金融学	投资银行分析师	极高	25-40	50-80	100-150	5	50:1	本科10% 硕士90%	财务建模,行业研究,尽调\r
57	会计学×金融学	估值建模专员	高	20-30	40-60	70-100	3	25:1	本科30% 硕士70%	DCF/LBO模型,可比分析,财务预测\r
58	会计学×临床医学	医院成本核算	中	12-18	20-28	30-40	2	8:1	本科80% 硕士20%	医院财务制度,成本分配,HIS系统\r
59	会计学×临床医学	医保财务管理	中	14-20	24-34	40-55	2	10:1	本科70% 硕士30%	医保政策,结算审核,数据分析\r
60	会计学×临床医学	医疗项目预算专员	中	12-18	22-30	35-48	2	6:1	本科85% 硕士15%	项目预算,成本控制,医疗设备采购\r
61	会计学×软件工程	财务软件开发	高	18-28	35-50	60-80	3	18:1	本科60% 硕士40%	Java/Go,会计原理,财务接口\r
62	会计学×软件工程	SaaS财务产品经理	高	20-30	38-55	65-90	3	20:1	本科40% 硕士60%	财务知识,产品设计,API\r
63	会计学×软件工程	会计系统测试工程师	中	14-20	25-35	45-60	2	12:1	本科80% 硕士20%	测试用例,财务逻辑,自动化测试\r
64	会计学×市场营销	营销财务分析	中	14-20	25-35	40-55	2	10:1	本科80% 硕士20%	营销ROI,Excel,财务模型\r
65	会计学×市场营销	促销效益评估	低	12-18	22-30	35-50	2	8:1	本科90% 硕士10%	成本效益分析,数据统计,促销策略\r
66	会计学×市场营销	渠道成本控制	中	13-19	24-34	40-55	2	8:1	本科85% 硕士15%	渠道返利,预算管理,谈判\r
67	会计学×数据科学	财务大数据分析	高	20-30	38-55	65-90	3	25:1	本科30% 硕士70%	Python,SQL,数据仓库,财务建模\r
68	会计学×数据科学	智能风控建模	高	22-35	42-65	75-110	3	30:1	本科20% 硕士80%	信用风险模型,机器学习,内控\r
69	会计学×数据科学	审计数据分析师	高	18-26	32-45	55-75	3	15:1	本科40% 硕士60%	SQL,Python,审计抽样,ACL\r
70	会计学×英语	ACCA双语讲师	中	12-18(兼职)	25-40	45-60	2	8:1	硕士80% 博士20%	ACCA全科,英语教学,课件制作\r
71	会计学×英语	国际财务报告翻译	中	10-16	20-30	35-50	1	6:1	本科80% 硕士20%	财务英语,翻译技巧,IFRS准则\r
72	会计学×英语	外资企业总账会计	高	15-22	28-40	50-70	2	12:1	本科70% 硕士30%	国际会计准则,英语工作,ERP\r
73	计算机科学×金融学	量化开发工程师	极高	30-50	60-100	120-200	5	40:1	本科20% 硕士80%	C++/Python,低延迟,金融数学\r
74	计算机科学×金融学	金融科技产品经理	高	22-35	42-65	75-110	3	25:1	本科30% 硕士70%	支付/借贷,产品设计,数据分析\r
75	计算机科学×金融学	高频交易系统开发	极高	35-60	70-120	150-250	5	50:1	本科10% 硕士90%	C++,网络编程,低延迟优化\r
76	计算机科学×临床医学	医学影像AI工程师	极高	25-40	45-75	90-140	3	35:1	本科10% 硕士90%	PyTorch,医学图像处理,模型部署\r
77	计算机科学×临床医学	医疗信息系统开发	高	18-28	32-48	55-80	3	20:1	本科50% 硕士50%	HL7/FHIR,Java,数据库\r
78	计算机科学×临床医学	临床数据分析师	高	18-28	35-50	60-85	3	22:1	本科30% 硕士70%	统计学,SAS/R,电子病历\r
79	计算机科学×软件工程	全栈开发工程师	极高	20-30	40-60	70-100	4	25:1	本科70% 硕士30%	JavaScript/TS,React,Node.js/Spring\r
80	计算机科学×软件工程	架构师	极高	30-50	60-90	100-160	3	30:1	本科40% 硕士60%	系统设计,微服务,高并发\r
81	计算机科学×软件工程	DevOps工程师	高	20-32	40-60	70-100	4	20:1	本科60% 硕士40%	CI/CD,K8s,云计算\r
82	计算机科学×市场营销	营销技术专家(MarTech)	高	18-28	35-50	60-85	3	15:1	本科60% 硕士40%	营销自动化,CDP,SQL/API\r
83	计算机科学×市场营销	SEO/SEM策略师	中	15-24	28-42	50-75	3	12:1	本科80% 硕士20%	搜索引擎算法,数据分析,Google Ads\r
84	计算机科学×市场营销	推荐系统产品经理	高	22-35	45-70	80-120	3	25:1	本科30% 硕士70%	推荐算法,用户画像,A/B测试\r
85	计算机科学×数据科学	机器学习工程师	极高	30-45	55-85	100-150	3	40:1	本科10% 硕士90%	Python,ML框架,数据结构\r
86	计算机科学×数据科学	大数据平台开发	极高	25-38	45-70	80-120	3	30:1	本科20% 硕士80%	Spark/Flink,Java/Scala,Hadoop\r
87	计算机科学×数据科学	AI算法专家	极高	35-55	70-110	130-200	3	50:1	博士60% 硕士40%	深度学习,论文复现,大规模训练\r
88	计算机科学×英语	技术文档工程师	低	10-16	18-25	28-35	1	8:1	本科90% 硕士10%	技术写作,DITA,英语六级\r
89	计算机科学×英语	英文技术支持	中	12-18	20-30	35-50	3	10:1	本科80% 硕士20%	计算机知识,英语口语,问题解决\r
90	计算机科学×英语	计算机双语教学	中	12-20	22-35	40-60	2	8:1	硕士70% 博士30%	编程能力,英语授课,课程设计\r
91	金融学×临床医学	医疗健康投资分析师	高	20-30	40-60	70-100	4	30:1	本科20% 硕士80%	财务建模,医疗行业研究,估值\r
92	金融学×临床医学	医药行业研究员	高	18-28	35-55	65-95	3	25:1	本科30% 硕士70%	药物研发流程,财报分析,市场预测\r
93	金融学×临床医学	医保精算师	中	18-28	32-48	55-80	2	15:1	本科40% 硕士60%	精算模型,医保政策,数据分析\r
94	金融学×软件工程	金融软件产品经理	高	18-28	35-55	60-90	3	20:1	本科50% 硕士50%	金融知识,Axure,项目管理\r
95	金融学×软件工程	交易系统开发	极高	25-40	50-80	90-140	4	35:1	本科20% 硕士80%	C++/Java,低延迟,交易所接口\r
96	金融学×软件工程	量化交易平台工程师	高	20-35	45-70	80-120	3	30:1	本科30% 硕士70%	Python,回测系统,金融API\r
97	金融学×市场营销	金融产品营销经理	高	16-25	30-45	55-80	3	18:1	本科70% 硕士30%	市场营销,金融产品,合规基础\r
98	金融学×市场营销	财富管理顾问	高	15-30(提成)	30-60	70-120	4	20:1	本科60% 硕士40%	投资理财,客户关系,资产配置\r
99	金融学×市场营销	投资者关系专员	中	14-22	25-38	45-65	2	12:1	本科80% 硕士20%	财报解读,沟通能力,IR活动\r
100	金融学×数据科学	金融数据分析师	极高	20-32	38-58	70-100	3	35:1	本科20% 硕士80%	Python/SQL,金融建模,量化分析\r
101	金融学×数据科学	风险建模专家	极高	25-40	45-75	90-130	3	35:1	本科20% 硕士80%	统计学,Python/R,信用风险模型\r
102	金融学×数据科学	智能投顾算法工程师	高	28-45	55-90	100-160	3	40:1	本科10% 硕士90%	投资组合优化,机器学习,回测\r
103	金融学×英语	国际金融分析师(CFA)	高	18-28	35-55	65-100	4	25:1	本科30% 硕士70%	财务报表,公司金融,英语(商务)\r
104	金融学×英语	外汇交易员	高	20-35	40-70	80-130	5	30:1	本科20% 硕士80%	宏观分析,技术分析,英语新闻\r
105	金融学×英语	跨境并购翻译	中	15-24	28-45	55-80	3	15:1	本科50% 硕士50%	金融英语,合同翻译,尽调支持\r
106	临床医学×软件工程	医疗软件产品经理	高	18-28	35-50	60-85	3	20:1	本科50% 硕士50%	医疗信息系统,需求分析,HL7/FHIR\r
107	临床医学×软件工程	医院信息系统实施	中	14-22	25-38	45-65	2	12:1	本科70% 硕士30%	HIS/EMR,项目管理,医疗流程\r
108	临床医学×软件工程	电子病历开发工程师	高	18-28	32-48	55-80	3	18:1	本科50% 硕士50%	Java/C#,HL7标准,数据库\r
109	临床医学×市场营销	医药代表	高	15-25(提成)	30-50	60-90	4	15:1	本科85% 硕士15%	医学知识,销售技巧,合规(RDPAC)\r
110	临床医学×市场营销	医疗器械产品经理	高	18-28	35-52	65-95	3	20:1	本科40% 硕士60%	临床需求,产品规划,市场分析\r
111	临床医学×市场营销	医疗市场专员	中	12-18	22-32	40-55	2	10:1	本科80% 硕士20%	市场调研,活动策划,医学基础\r
112	临床医学×数据科学	生物信息分析师	高	20-30	35-55	60-90	3	25:1	本科20% 硕士80%	Python/R,基因组学,统计\r
113	临床医学×数据科学	真实世界研究数据专家	高	22-35	42-65	75-110	3	20:1	本科20% 硕士80%	RWE,流行病学,SAS,数据清洗\r
114	临床医学×数据科学	临床预测模型开发	高	20-32	38-58	70-100	3	25:1	本科10% 硕士90%	机器学习,临床知识,模型验证\r
115	临床医学×英语	医学翻译	中	12-18	20-30	35-50	2	10:1	本科70% 硕士30%	医学英语,术语库,翻译软件\r
116	临床医学×英语	国际医疗协调员	中	14-22	25-38	45-65	3	12:1	本科60% 硕士40%	医疗流程,英语口语,病历摘要\r
117	临床医学×英语	SCI论文编辑	中	15-24	28-45	50-75	2	15:1	硕士70% 博士30%	学术写作,医学统计,英语润色\r
118	软件工程×市场营销	技术产品经理	极高	22-35	45-70	80-120	3	30:1	本科40% 硕士60%	技术理解,用户研究,数据分析\r
119	软件工程×市场营销	开发者关系工程师	高	18-30	35-55	65-95	3	15:1	本科60% 硕士40%	技术社区,演讲,API文档\r
120	软件工程×市场营销	软件售前顾问	高	15-25(提成)	30-50	60-85	4	12:1	本科70% 硕士30%	方案讲解,技术演示,客户沟通\r
121	软件工程×数据科学	数据平台开发工程师	极高	25-38	45-70	80-120	3	30:1	本科30% 硕士70%	Spark/Flink,Java/Scala,Hadoop\r
122	软件工程×数据科学	数据仓库工程师	高	20-32	38-58	70-100	3	25:1	本科40% 硕士60%	SQL,ETL,数据建模\r
123	软件工程×数据科学	机器学习平台开发	高	28-45	55-85	100-150	3	35:1	本科20% 硕士80%	K8s,MLOps,Python/Go\r
124	软件工程×英语	软件本地化工程师	中	14-20	25-35	40-55	2	12:1	本科80% 硕士20%	本地化工具(SDL),正则表达式,英语\r
125	软件工程×英语	技术文档写作	低	10-16	18-25	28-35	1	8:1	本科90% 硕士10%	技术写作,DITA,英语\r
126	软件工程×英语	海外技术支持	中	12-18	20-30	35-50	3	10:1	本科80% 硕士20%	英语口语,软件调试,客户沟通\r
127	市场营销×数据科学	市场数据分析师	极高	18-28	35-50	60-85	3	30:1	本科40% 硕士60%	SQL,Excel/Tableau,统计学\r
128	市场营销×数据科学	用户增长分析师	高	18-30	35-55	65-95	3	25:1	本科30% 硕士70%	增长模型,A/B测试,Python\r
129	市场营销×数据科学	客户画像建模	高	20-32	38-58	70-100	3	20:1	本科40% 硕士60%	聚类分析,SQL,用户标签\r
130	市场营销×英语	海外营销专员	高	12-20(提成)	25-40	50-80	3	15:1	本科70% 硕士30%	跨境电商,英语,数据分析\r
131	市场营销×英语	跨境电商运营	高	12-20(提成)	25-42	55-85	3	18:1	本科60% 硕士40%	平台规则(Amazon),英语,选品\r
132	市场营销×英语	国际品牌策划	中	15-25	28-45	55-80	2	12:1	本科50% 硕士50%	品牌战略,跨文化传播,英语\r
133	数据科学×英语	数据科学翻译	低	10-15	18-25	28-40	1	6:1	本科80% 硕士20%	数据科学基础,翻译技巧,LaTeX\r
134	数据科学×英语	海外数据竞赛选手	中	奖金制	20-50(项目)	60-100	2	8:1	本科40% 硕士60%	Kaggle,Python,英语读写\r
135	数据科学×英语	双语数据报告撰写	中	12-18	22-32	40-55	1	8:1	本科70% 硕士30%	数据可视化,商务英语,报告写作`;function Xf(n){const t=n.split(/\r?\n/).filter(i=>i.trim().length>0),e=[];for(let i=0;i<t.length;i++){const s=t[i];if(s.startsWith("序号")||s.startsWith("	序号"))continue;const r=s.split("	");if(r.length<11)continue;const o=Number.parseInt(r[0],10);Number.isFinite(o)&&e.push({idx:o,pair:r[1].trim(),title:r[2].trim(),heat:r[3].trim(),salaryJunior:r[4].trim(),salaryMid:r[5].trim(),salarySenior:r[6].trim(),workIntensity:r[7].trim(),competition:r[8].trim(),education:r[9].trim(),skills:r[10].trim()})}return e}let yi=null;const Ko=new Map;function jf(n){Ko.clear();for(const t of n){const e=Vp(t.pair);if(!e)continue;const i=Gp(e[0],e[1]);Ko.has(i)||Ko.set(i,e)}}function Yv(n,t,e){if(e){const s=Vp(e);if(s)return s}const i=Ko.get(Gp(n,t));return i||(n<=t?[n,t]:[t,n])}async function vu(){if(yi)return yi;if(String(Wf).trim().length>0)return yi=Xf(String(Wf)),jf(yi),yi;const n="./data/cross_job_catalog.tsv".replace(/\/{2,}/g,"/");try{const t=await fetch(n);if(!t.ok)throw new Error(`无法加载岗位表: ${t.status}`);yi=Xf(await t.text())}catch(t){const e=t instanceof Error?t.message:"网络异常";throw new Error(`无法加载岗位表（${e}）`)}return jf(yi),yi}async function ga(n,t){const[e,i]=qv(n,t);if(!e)return[];const r=(await vu()).filter(o=>o.pair===e||o.pair===i);return r.length>=3?r.slice(0,3):r}function Li(n,t){var o;const e=(n??"").trim();if(!e)return"";const i=t==null?void 0:t.find(a=>a.id===e);if(i!=null&&i.majorId)return i.majorId;const s=t==null?void 0:t.find(a=>a.label===e);if(s!=null&&s.majorId)return s.majorId;if(e.startsWith("m_")){const a=/^m_(.+)_\d+$/.exec(e);if(a!=null&&a[1])return a[1]}return e.startsWith("major_")?e:((o=Object.entries(ma).find(([,a])=>a===e))==null?void 0:o[0])??""}function $v(n){var t;return n.jobSlot!=null&&n.jobSlot>=0&&n.jobSlot<=2?n.jobSlot:((t=n.row)==null?void 0:t.idx)!=null?((n.row.idx-1)%3+3)%3:0}function ki(n,t){var a,l;if((a=n.packKey)!=null&&a.trim())return n.packKey.trim();const e=Li(n.majorA,t),i=Li(n.majorB,t);if(!e||!i)return null;const[s,r]=Yv(e,i,(l=n.row)==null?void 0:l.pair),o=$v(n);return`${s}__${r}:${o}`}function Kv(n,t,e){const i=t.find(s=>s.id===n);return i?ki(i,e):null}const Wp="offercat_personal_galaxy_v1",qf=6;function Zv(n,t){const e={},i=n.length;for(let s=0;s<i;s++){const r=n[s],o=2*Math.PI*s/Math.max(i,1);e[r.id]={x:qf*Math.cos(o),y:.25,z:qf*Math.sin(o)}}for(const s of t){const r=e[s.majorA],o=e[s.majorB];if(!r||!o)continue;const a={x:(r.x+o.x)*.5,y:(r.y+o.y)*.5+.6,z:(r.z+o.z)*.5};e[s.id]=a}return e}function Jv(n){return{subtitle:`${n.heat} · 初${n.salaryJunior} / 中${n.salaryMid} / 高${n.salarySenior}`,tagline:`${n.workIntensity}级强度 · 竞争${n.competition}`,heat:n.heat,salaryJunior:n.salaryJunior,salaryMid:n.salaryMid,salarySenior:n.salarySenior,workIntensity:n.workIntensity,competition:n.competition,education:n.education,skills:n.skills,catalogIdx:String(n.idx),pair:n.pair}}function Xp(n,t){const e=Zv(n,t),i=[];for(const o of n)i.push({id:o.id,type:"major",label:o.label,meta:{tagline:"个人星系 · 大行星"}});for(const o of t)i.push({id:o.id,type:"fusion",label:o.title,meta:o.row?Jv(o.row):{tagline:"个人星系 · 小行星"}});const s=t.flatMap(o=>[{u:o.id,v:o.majorA},{u:o.id,v:o.majorB}]),r=t.map(o=>({id:`he_${o.id}`,member_node_ids:[o.majorA,o.majorB,o.id],style_hint:"personal"}));return{nodes:i,edges:s,hyperedges:r,layout:e}}function Qv(n,t){return{v:1,majors:[...n],fusions:[...t],updatedAt:Date.now()}}function ka(){try{const n=localStorage.getItem(Wp);if(!n)return null;const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.majors)||!Array.isArray(t.fusions)?null:t}catch{return null}}function jp(n){try{localStorage.setItem(Wp,JSON.stringify(n))}catch{}}function tx(n){const t=n;return!!t&&t.v===1&&Array.isArray(t.majors)&&Array.isArray(t.fusions)}async function Yf(n){var s;try{await vu()}catch{}const t=n.majors;let e=!1;const i=[];for(const r of n.fusions){let o=r;const a=Li(r.majorA,t),l=Li(r.majorB,t);if(a&&l&&(!r.row||r.jobSlot==null||!r.packKey))try{const u=await ga(a,l);if(u.length>0){let f=r.jobSlot??0,h=r.row;if((s=r.title)!=null&&s.trim()){const d=u.findIndex(g=>g.title===r.title);d>=0&&(f=d,h=u[d])}h||(h=u[f]??u[0]),o={...o,row:h,jobSlot:f},e=!0}}catch{}const c=ki(o,t)??o.packKey;c&&c!==o.packKey&&(o={...o,packKey:c},e=!0),i.push(o)}return e?{...n,fusions:i,updatedAt:Date.now()}:n}async function $r(){const n=ka(),t=async i=>i?Yf(i):null;if(!so())return t(n);const e=ms();if(!e)return t(n);try{const{loadPersonalGalaxy:i}=await ps(async()=>{const{loadPersonalGalaxy:r}=await import("./galaxy-chunk-Bck2YTPA.js");return{loadPersonalGalaxy:r}},[],import.meta.url),s=await i(e);if(s&&tx(s)){const r={...s,updatedAt:s.updatedAt??Date.now()};if(!n||(r.updatedAt??0)>=(n.updatedAt??0)){const o=await Yf(r);return jp(o),o}}}catch{}return t(n)}async function ex(n,t){const e=ms();if(e==null||e<=0)return{ok:!1};if(!so())return{ok:!1};try{const{savePersonalGalaxy:i}=await ps(async()=>{const{savePersonalGalaxy:s}=await import("./galaxy-chunk-Bck2YTPA.js");return{savePersonalGalaxy:s}},[],import.meta.url);return await i(e,n),{ok:!0}}catch{return{ok:!1}}}const qp="offercat_personal_starlit_v1",us=50,$f=50;function al(){return{v:1,byFusionId:{},updatedAt:Date.now()}}function Ha(){try{const n=localStorage.getItem(qp);if(!n)return al();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||typeof t.byFusionId!="object"?al():t}catch{return al()}}function Yp(n){n.updatedAt=Date.now();try{localStorage.setItem(qp,JSON.stringify(n))}catch{}}async function nx(n,t){if(!so())return;const e=ms();if(!e)return;const i=ka();if(!i)return;const s=Kv(n,i.fusions,i.majors);if(s)try{const{upsertStarlitProgress:r}=await ps(async()=>{const{upsertStarlitProgress:o}=await import("./galaxy-chunk-Bck2YTPA.js");return{upsertStarlitProgress:o}},[],import.meta.url);await r(e,s,t.starsLit,t.lastQuestionIndex)}catch{}}async function rc(n){var o,a;if(!so())return;const t=ms();if(!t)return;const e=ka(),i=n??(e==null?void 0:e.fusions)??[],s=(e==null?void 0:e.majors)??[];if(!i.length)return;const r=new Map;for(const l of i){const c=ki(l,s);c&&r.set(c,l.id)}try{const{fetchStarlitProgress:l}=await ps(async()=>{const{fetchStarlitProgress:h}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchStarlitProgress:h}},[],import.meta.url),c=await l(t),u=Ha();let f=!1;for(const h of c){const d=r.get(h.packKey);if(!d)continue;const g=Math.max(0,Math.floor(h.starsLit)),_=((o=u.byFusionId[d])==null?void 0:o.starsLit)??0,m=Math.max(_,g);(m!==_||!u.byFusionId[d])&&(u.byFusionId[d]={starsLit:m,lastQuestionIndex:h.lastQuestionNo??((a=u.byFusionId[d])==null?void 0:a.lastQuestionIndex)??0,updatedAt:Date.now()},f=!0)}f&&Yp(u)}catch{}}function ro(n,t=us){var s;const e=((s=Ha().byFusionId[n])==null?void 0:s.starsLit)??0,i=Math.max(1,Math.floor(t));return Math.min(i,Math.max(0,Math.floor(e)))}function ix(){const n=Ha();return Object.keys(n.byFusionId).reduce((t,e)=>t+ro(e),0)}function $p(n){return n.reduce((t,e)=>t+ro(e),0)}function xu(n){const t=n.filter(i=>i.type==="fusion");if(!t.length)return 0;const e=t.reduce((i,s)=>i+ro(s.id),0);return Math.min(1,e/(t.length*us))}function sx(n){const t=Ha(),e=t.byFusionId[n],i=(e==null?void 0:e.starsLit)??0,s=Math.min(us,i+1),r={starsLit:s,lastQuestionIndex:((e==null?void 0:e.lastQuestionIndex)??0)+1,updatedAt:Date.now()};return t.byFusionId[n]=r,Yp(t),nx(n,r),s}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yu="170",Ys={ROTATE:0,DOLLY:1,PAN:2},ks={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},rx=0,Kf=1,ox=2,Kp=1,ax=2,ni=3,Hi=0,an=1,wn=2,ci=0,$s=1,Ks=2,Zf=3,Jf=4,lx=5,es=100,cx=101,ux=102,fx=103,hx=104,dx=200,px=201,mx=202,gx=203,oc=204,ac=205,_x=206,vx=207,xx=208,yx=209,Mx=210,Sx=211,Ex=212,bx=213,Tx=214,lc=0,cc=1,uc=2,sr=3,fc=4,hc=5,dc=6,pc=7,Zp=0,Ax=1,wx=2,Oi=0,Jp=1,Qp=2,tm=3,Mu=4,Rx=5,em=6,nm=7,im=300,rr=301,or=302,mc=303,gc=304,Va=306,Kr=1e3,ss=1001,_c=1002,pn=1003,Cx=1004,xo=1005,Cn=1006,ll=1007,Ui=1008,Wn=1009,sm=1010,rm=1011,Zr=1012,Su=1013,fs=1014,ai=1015,ui=1016,Eu=1017,bu=1018,ar=1020,om=35902,am=1021,lm=1022,xn=1023,cm=1024,um=1025,Zs=1026,lr=1027,fm=1028,Tu=1029,hm=1030,Au=1031,wu=1033,Zo=33776,Jo=33777,Qo=33778,ta=33779,vc=35840,xc=35841,yc=35842,Mc=35843,Sc=36196,Ec=37492,bc=37496,Tc=37808,Ac=37809,wc=37810,Rc=37811,Cc=37812,Pc=37813,Dc=37814,Ic=37815,Lc=37816,Uc=37817,Nc=37818,Oc=37819,Fc=37820,Bc=37821,ea=36492,zc=36494,kc=36495,dm=36283,Hc=36284,Vc=36285,Gc=36286,Px=3200,Dx=3201,pm=0,Ix=1,Di="",rn="srgb",fr="srgb-linear",Ga="linear",ce="srgb",Ms=7680,Qf=519,Lx=512,Ux=513,Nx=514,mm=515,Ox=516,Fx=517,Bx=518,zx=519,th=35044,eh="300 es",li=2e3,_a=2001;class gs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],na=Math.PI/180,Wc=180/Math.PI;function oo(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Ke(n,t,e){return Math.max(t,Math.min(e,n))}function kx(n,t){return(n%t+t)%t}function cl(n,t,e){return(1-e)*n+e*t}function Mr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Hx={DEG2RAD:na};class zt{constructor(t=0,e=0){zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,i,s,r,o,a,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=s[0],m=s[3],p=s[6],S=s[1],A=s[4],M=s[7],G=s[2],I=s[5],D=s[8];return r[0]=o*_+a*S+l*G,r[3]=o*m+a*A+l*I,r[6]=o*p+a*M+l*D,r[1]=c*_+u*S+f*G,r[4]=c*m+u*A+f*I,r[7]=c*p+u*M+f*D,r[2]=h*_+d*S+g*G,r[5]=h*m+d*A+g*I,r[8]=h*p+d*M+g*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*r,d=c*r-o*l,g=e*f+i*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=h*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ul.makeScale(t,e)),this}rotate(t){return this.premultiply(ul.makeRotation(-t)),this}translate(t,e){return this.premultiply(ul.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ul=new Kt;function gm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function va(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vx(){const n=va("canvas");return n.style.display="block",n}const nh={};function Dr(n){n in nh||(nh[n]=!0,console.warn(n))}function Gx(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Wx(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(n.r=fi(n.r),n.g=fi(n.g),n.b=fi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(n.r=Js(n.r),n.g=Js(n.g),n.b=Js(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Di?Ga:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function fi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ih=[.64,.33,.3,.6,.15,.06],sh=[.2126,.7152,.0722],rh=[.3127,.329],oh=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ah=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[fr]:{primaries:ih,whitePoint:rh,transfer:Ga,toXYZ:oh,fromXYZ:ah,luminanceCoefficients:sh,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:ih,whitePoint:rh,transfer:ce,toXYZ:oh,fromXYZ:ah,luminanceCoefficients:sh,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}});let Ss;class jx{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ss===void 0&&(Ss=va("canvas")),Ss.width=t.width,Ss.height=t.height;const i=Ss.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ss}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=va("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=fi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(fi(e[i]/255)*255):e[i]=fi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qx=0;class _m{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=oo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(fl(s[o].image)):r.push(fl(s[o]))}else r=fl(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function fl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jx.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yx=0;class Qe extends gs{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,i=ss,s=ss,r=Cn,o=Ui,a=xn,l=Wn,c=Qe.DEFAULT_ANISOTROPY,u=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yx++}),this.uuid=oo(),this.name="",this.source=new _m(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new zt(0,0),this.repeat=new zt(1,1),this.center=new zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==im)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Kr:t.x=t.x-Math.floor(t.x);break;case ss:t.x=t.x<0?0:1;break;case _c:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Kr:t.y=t.y-Math.floor(t.y);break;case ss:t.y=t.y<0?0:1;break;case _c:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=im;Qe.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,i=0,s=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,M=(d+1)/2,G=(p+1)/2,I=(u+h)/4,D=(f+_)/4,L=(g+m)/4;return A>M&&A>G?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=I/i,r=D/i):M>G?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=I/s,r=L/s):G<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(G),i=D/r,s=L/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-_)/S,this.z=(h-u)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $x extends gs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Qe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new _m(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends $x{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class vm extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=pn,this.minFilter=pn,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kx extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=pn,this.minFilter=pn,this.wrapR=ss,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,S=p>=0?1:-1,A=1-p*p;if(A>Number.EPSILON){const G=Math.sqrt(A),I=Math.atan2(G,p*S);m=Math.sin(m*I)/G,a=Math.sin(a*I)/G}const M=a*S;if(l=l*m+h*M,c=c*m+d*M,u=u*m+g*M,f=f*m+_*M,m===1-a){const G=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=G,c*=G,u*=G,f*=G}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-a*d,t[e+2]=c*g+u*d+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),h=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ke(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(t=0,e=0,i=0){$.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(lh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(lh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return hl.copy(this).projectOnVector(t),this.sub(hl)}reflect(t){return this.sub(hl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hl=new $,lh=new hs;class ds{constructor(t=new $(1/0,1/0,1/0),e=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bn):bn.fromBufferAttribute(r,o),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),yo.copy(i.boundingBox)),yo.applyMatrix4(t.matrixWorld),this.union(yo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Sr),Mo.subVectors(this.max,Sr),Es.subVectors(t.a,Sr),bs.subVectors(t.b,Sr),Ts.subVectors(t.c,Sr),Mi.subVectors(bs,Es),Si.subVectors(Ts,bs),ji.subVectors(Es,Ts);let e=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-ji.z,ji.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,ji.z,0,-ji.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-ji.y,ji.x,0];return!dl(e,Es,bs,Ts,Mo)||(e=[1,0,0,0,1,0,0,0,1],!dl(e,Es,bs,Ts,Mo))?!1:(So.crossVectors(Mi,Si),e=[So.x,So.y,So.z],dl(e,Es,bs,Ts,Mo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Zn=[new $,new $,new $,new $,new $,new $,new $,new $],bn=new $,yo=new ds,Es=new $,bs=new $,Ts=new $,Mi=new $,Si=new $,ji=new $,Sr=new $,Mo=new $,So=new $,qi=new $;function dl(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){qi.fromArray(n,r);const a=s.x*Math.abs(qi.x)+s.y*Math.abs(qi.y)+s.z*Math.abs(qi.z),l=t.dot(qi),c=e.dot(qi),u=i.dot(qi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Zx=new ds,Er=new $,pl=new $;class hr{constructor(t=new $,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Zx.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Er.subVectors(t,this.center);const e=Er.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Er,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Er.copy(t.center).add(pl)),this.expandByPoint(Er.copy(t.center).sub(pl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Jn=new $,ml=new $,Eo=new $,Ei=new $,gl=new $,bo=new $,_l=new $;class ao{constructor(t=new $,e=new $(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ml.copy(t).add(e).multiplyScalar(.5),Eo.copy(e).sub(t).normalize(),Ei.copy(this.origin).sub(ml);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Eo),a=Ei.dot(this.direction),l=-Ei.dot(Eo),c=Ei.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ml).addScaledVector(Eo,h),d}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);const i=Jn.dot(this.direction),s=Jn.dot(Jn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,i,s,r){gl.subVectors(e,t),bo.subVectors(i,t),_l.crossVectors(gl,bo);let o=this.direction.dot(_l),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ei.subVectors(this.origin,t);const l=a*this.direction.dot(bo.crossVectors(Ei,bo));if(l<0)return null;const c=a*this.direction.dot(gl.cross(Ei));if(c<0||l+c>o)return null;const u=-a*Ei.dot(_l);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/As.setFromMatrixColumn(t,0).length(),r=1/As.setFromMatrixColumn(t,1).length(),o=1/As.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jx,t,Qx)}lookAt(t,e,i){const s=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),bi.crossVectors(i,cn),bi.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),bi.crossVectors(i,cn)),bi.normalize(),To.crossVectors(cn,bi),s[0]=bi.x,s[4]=To.x,s[8]=cn.x,s[1]=bi.y,s[5]=To.y,s[9]=cn.y,s[2]=bi.z,s[6]=To.z,s[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],S=i[3],A=i[7],M=i[11],G=i[15],I=s[0],D=s[4],L=s[8],b=s[12],E=s[1],P=s[5],N=s[9],O=s[13],Q=s[2],j=s[6],U=s[10],nt=s[14],X=s[3],pt=s[7],Mt=s[11],At=s[15];return r[0]=o*I+a*E+l*Q+c*X,r[4]=o*D+a*P+l*j+c*pt,r[8]=o*L+a*N+l*U+c*Mt,r[12]=o*b+a*O+l*nt+c*At,r[1]=u*I+f*E+h*Q+d*X,r[5]=u*D+f*P+h*j+d*pt,r[9]=u*L+f*N+h*U+d*Mt,r[13]=u*b+f*O+h*nt+d*At,r[2]=g*I+_*E+m*Q+p*X,r[6]=g*D+_*P+m*j+p*pt,r[10]=g*L+_*N+m*U+p*Mt,r[14]=g*b+_*O+m*nt+p*At,r[3]=S*I+A*E+M*Q+G*X,r[7]=S*D+A*P+M*j+G*pt,r[11]=S*L+A*N+M*U+G*Mt,r[15]=S*b+A*O+M*nt+G*At,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*f-s*c*f-r*a*h+i*c*h+s*a*d-i*l*d)+_*(+e*l*d-e*c*h+r*o*h-s*o*d+s*c*u-r*l*u)+m*(+e*c*f-e*a*d-r*o*f+i*o*d+r*a*u-i*c*u)+p*(-s*a*u-e*l*f+e*a*h+s*o*f-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,A=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,M=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,G=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,I=e*S+i*A+s*M+r*G;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/I;return t[0]=S*D,t[1]=(_*h*r-f*m*r-_*s*d+i*m*d+f*s*p-i*h*p)*D,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*D,t[3]=(f*l*r-a*h*r-f*s*c+i*h*c+a*s*d-i*l*d)*D,t[4]=A*D,t[5]=(u*m*r-g*h*r+g*s*d-e*m*d-u*s*p+e*h*p)*D,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*D,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*d+e*l*d)*D,t[8]=M*D,t[9]=(g*f*r-u*_*r-g*i*d+e*_*d+u*i*p-e*f*p)*D,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*p+e*a*p)*D,t[11]=(u*a*r-o*f*r-u*i*c+e*f*c+o*i*d-e*a*d)*D,t[12]=G*D,t[13]=(u*_*s-g*f*s+g*i*h-e*_*h-u*i*m+e*f*m)*D,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*D,t[15]=(o*f*s-u*a*s+u*i*l-e*f*l-o*i*h+e*a*h)*D,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,f=a+a,h=r*c,d=r*u,g=r*f,_=o*u,m=o*f,p=a*f,S=l*c,A=l*u,M=l*f,G=i.x,I=i.y,D=i.z;return s[0]=(1-(_+p))*G,s[1]=(d+M)*G,s[2]=(g-A)*G,s[3]=0,s[4]=(d-M)*I,s[5]=(1-(h+p))*I,s[6]=(m+S)*I,s[7]=0,s[8]=(g+A)*D,s[9]=(m-S)*D,s[10]=(1-(h+_))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=As.set(s[0],s[1],s[2]).length();const o=As.set(s[4],s[5],s[6]).length(),a=As.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Tn.copy(this);const c=1/r,u=1/o,f=1/a;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=f,Tn.elements[9]*=f,Tn.elements[10]*=f,e.setFromRotationMatrix(Tn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=li){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),h=(i+s)/(i-s);let d,g;if(a===li)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===_a)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=li){const l=this.elements,c=1/(e-t),u=1/(i-s),f=1/(o-r),h=(e+t)*c,d=(i+s)*u;let g,_;if(a===li)g=(o+r)*f,_=-2*f;else if(a===_a)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const As=new $,Tn=new de,Jx=new $(0,0,0),Qx=new $(1,1,1),bi=new $,To=new $,cn=new $,ch=new de,uh=new hs;class Xn{constructor(t=0,e=0,i=0,s=Xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ch.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ch,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uh.setFromEuler(this),this.setFromQuaternion(uh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xn.DEFAULT_ORDER="XYZ";class Ru{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ty=0;const fh=new $,ws=new hs,Qn=new de,Ao=new $,br=new $,ey=new $,ny=new hs,hh=new $(1,0,0),dh=new $(0,1,0),ph=new $(0,0,1),mh={type:"added"},iy={type:"removed"},Rs={type:"childadded",child:null},vl={type:"childremoved",child:null};class Te extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=oo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new $,e=new Xn,i=new hs,s=new $(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Kt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ru,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.multiply(ws),this}rotateOnWorldAxis(t,e){return ws.setFromAxisAngle(t,e),this.quaternion.premultiply(ws),this}rotateX(t){return this.rotateOnAxis(hh,t)}rotateY(t){return this.rotateOnAxis(dh,t)}rotateZ(t){return this.rotateOnAxis(ph,t)}translateOnAxis(t,e){return fh.copy(t).applyQuaternion(this.quaternion),this.position.add(fh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(hh,t)}translateY(t){return this.translateOnAxis(dh,t)}translateZ(t){return this.translateOnAxis(ph,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ao.copy(t):Ao.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(br,Ao,this.up):Qn.lookAt(Ao,br,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),ws.setFromRotationMatrix(Qn),this.quaternion.premultiply(ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(mh),Rs.child=t,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(iy),vl.child=t,this.dispatchEvent(vl),vl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(mh),Rs.child=t,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,t,ey),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,ny,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Te.DEFAULT_UP=new $(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new $,ti=new $,xl=new $,ei=new $,Cs=new $,Ps=new $,gh=new $,yl=new $,Ml=new $,Sl=new $,El=new Me,bl=new Me,Tl=new Me;class Rn{constructor(t=new $,e=new $,i=new $){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),An.subVectors(t,e),s.cross(An);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){An.subVectors(s,e),ti.subVectors(i,e),xl.subVectors(t,e);const o=An.dot(An),a=An.dot(ti),l=An.dot(xl),c=ti.dot(ti),u=ti.dot(xl),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ei.x),l.addScaledVector(o,ei.y),l.addScaledVector(a,ei.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return El.setScalar(0),bl.setScalar(0),Tl.setScalar(0),El.fromBufferAttribute(t,e),bl.fromBufferAttribute(t,i),Tl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(El,r.x),o.addScaledVector(bl,r.y),o.addScaledVector(Tl,r.z),o}static isFrontFacing(t,e,i,s){return An.subVectors(i,e),ti.subVectors(t,e),An.cross(ti).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),An.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Rn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Cs.subVectors(s,i),Ps.subVectors(r,i),yl.subVectors(t,i);const l=Cs.dot(yl),c=Ps.dot(yl);if(l<=0&&c<=0)return e.copy(i);Ml.subVectors(t,s);const u=Cs.dot(Ml),f=Ps.dot(Ml);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Cs,o);Sl.subVectors(t,r);const d=Cs.dot(Sl),g=Ps.dot(Sl);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Ps,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return gh.subVectors(r,s),a=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(gh,a);const p=1/(m+_+h);return o=_*p,a=h*p,e.copy(i).addScaledVector(Cs,o).addScaledVector(Ps,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},wo={h:0,s:0,l:0};function Al(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class qt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=kx(t,1),e=Ke(e,0,1),i=Ke(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Al(o,r,t+1/3),this.g=Al(o,r,t),this.b=Al(o,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=rn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){const i=xm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fi(t.r),this.g=fi(t.g),this.b=fi(t.b),this}copyLinearToSRGB(t){return this.r=Js(t.r),this.g=Js(t.g),this.b=Js(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return ee.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ke(Fe.r*255,0,255))*65536+Math.round(Ke(Fe.g*255,0,255))*256+Math.round(Ke(Fe.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=rn){ee.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(wo);const i=cl(Ti.h,wo.h,e),s=cl(Ti.s,wo.s,e),r=cl(Ti.l,wo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new qt;qt.NAMES=xm;let sy=0;class _s extends gs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=oo(),this.name="",this.blending=$s,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oc,this.blendDst=ac,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==$s&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==oc&&(i.blendSrc=this.blendSrc),this.blendDst!==ac&&(i.blendDst=this.blendDst),this.blendEquation!==es&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class _n extends _s{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Zp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new $,Ro=new zt;class Sn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=th,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ro.fromBufferAttribute(this,e),Ro.applyMatrix3(t),this.setXY(e,Ro.x,Ro.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Mr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=nn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mr(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mr(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mr(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==th&&(t.usage=this.usage),t}}class ym extends Sn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Mm extends Sn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Se extends Sn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ry=0;const gn=new de,wl=new Te,Ds=new $,un=new ds,Tr=new ds,Le=new $;class Ve extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ry++}),this.uuid=oo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gm(t)?Mm:ym)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,i){return gn.makeTranslation(t,e,i),this.applyMatrix4(gn),this}scale(t,e,i){return gn.makeScale(t,e,i),this.applyMatrix4(gn),this}lookAt(t){return wl.lookAt(t),wl.updateMatrix(),this.applyMatrix4(wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ds).negate(),this.translate(Ds.x,Ds.y,Ds.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ds);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Tr.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(un.min,Tr.min),un.expandByPoint(Le),Le.addVectors(un.max,Tr.max),un.expandByPoint(Le)):(un.expandByPoint(Tr.min),un.expandByPoint(Tr.max))}un.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Le.fromBufferAttribute(a,c),l&&(Ds.fromBufferAttribute(t,c),Le.add(Ds)),s=Math.max(s,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Sn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<i.count;L++)a[L]=new $,l[L]=new $;const c=new $,u=new $,f=new $,h=new zt,d=new zt,g=new zt,_=new $,m=new $;function p(L,b,E){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,E),h.fromBufferAttribute(r,L),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,E),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[L].add(_),a[b].add(_),a[E].add(_),l[L].add(m),l[b].add(m),l[E].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let L=0,b=S.length;L<b;++L){const E=S[L],P=E.start,N=E.count;for(let O=P,Q=P+N;O<Q;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const A=new $,M=new $,G=new $,I=new $;function D(L){G.fromBufferAttribute(s,L),I.copy(G);const b=a[L];A.copy(b),A.sub(G.multiplyScalar(G.dot(b))).normalize(),M.crossVectors(I,b);const P=M.dot(l[L])<0?-1:1;o.setXYZW(L,A.x,A.y,A.z,P)}for(let L=0,b=S.length;L<b;++L){const E=S[L],P=E.start,N=E.count;for(let O=P,Q=P+N;O<Q;O+=3)D(t.getX(O+0)),D(t.getX(O+1)),D(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Sn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new $,r=new $,o=new $,a=new $,l=new $,c=new $,u=new $,f=new $;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Sn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _h=new de,Yi=new ao,Co=new hr,vh=new $,Po=new $,Do=new $,Io=new $,Rl=new $,Lo=new $,xh=new $,Uo=new $;class Re extends Te{constructor(t=new Ve,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Lo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(Rl.fromBufferAttribute(f,t),o?Lo.addScaledVector(Rl,u):Lo.addScaledVector(Rl.sub(e),u))}e.add(Lo)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Co.copy(i.boundingSphere),Co.applyMatrix4(r),Yi.copy(t.ray).recast(t.near),!(Co.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(Co,vh)===null||Yi.origin.distanceToSquared(vh)>(t.far-t.near)**2))&&(_h.copy(r).invert(),Yi.copy(t.ray).applyMatrix4(_h),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),A=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let M=S,G=A;M<G;M+=3){const I=a.getX(M),D=a.getX(M+1),L=a.getX(M+2);s=No(this,p,t,i,c,u,f,I,D,L),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),A=a.getX(m+1),M=a.getX(m+2);s=No(this,o,t,i,c,u,f,S,A,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),A=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let M=S,G=A;M<G;M+=3){const I=M,D=M+1,L=M+2;s=No(this,p,t,i,c,u,f,I,D,L),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=m,A=m+1,M=m+2;s=No(this,o,t,i,c,u,f,S,A,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function oy(n,t,e,i,s,r,o,a){let l;if(t.side===an?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Hi,a),l===null)return null;Uo.copy(a),Uo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Uo);return c<e.near||c>e.far?null:{distance:c,point:Uo.clone(),object:n}}function No(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Po),n.getVertexPosition(l,Do),n.getVertexPosition(c,Io);const u=oy(n,t,e,i,Po,Do,Io,xh);if(u){const f=new $;Rn.getBarycoord(xh,Po,Do,Io,f),s&&(u.uv=Rn.getInterpolatedAttribute(s,a,l,c,f,new zt)),r&&(u.uv1=Rn.getInterpolatedAttribute(r,a,l,c,f,new zt)),o&&(u.normal=Rn.getInterpolatedAttribute(o,a,l,c,f,new $),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new $,materialIndex:0};Rn.getNormal(Po,Do,Io,h.normal),u.face=h,u.barycoord=f}return u}class lo extends Ve{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(f,2));function g(_,m,p,S,A,M,G,I,D,L,b){const E=M/D,P=G/L,N=M/2,O=G/2,Q=I/2,j=D+1,U=L+1;let nt=0,X=0;const pt=new $;for(let Mt=0;Mt<U;Mt++){const At=Mt*P-O;for(let Ft=0;Ft<j;Ft++){const Qt=Ft*E-N;pt[_]=Qt*S,pt[m]=At*A,pt[p]=Q,c.push(pt.x,pt.y,pt.z),pt[_]=0,pt[m]=0,pt[p]=I>0?1:-1,u.push(pt.x,pt.y,pt.z),f.push(Ft/D),f.push(1-Mt/L),nt+=1}}for(let Mt=0;Mt<L;Mt++)for(let At=0;At<D;At++){const Ft=h+At+j*Mt,Qt=h+At+j*(Mt+1),at=h+(At+1)+j*(Mt+1),mt=h+(At+1)+j*Mt;l.push(Ft,Qt,mt),l.push(Qt,at,mt),X+=6}a.addGroup(d,X,b),d+=X,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function cr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function je(n){const t={};for(let e=0;e<n.length;e++){const i=cr(n[e]);for(const s in i)t[s]=i[s]}return t}function ay(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Sm(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Jr={clone:cr,merge:je};var ly=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ke extends _s{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ly,this.fragmentShader=cy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=cr(t.uniforms),this.uniformsGroups=ay(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Em extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ai=new $,yh=new zt,Mh=new zt;class vn extends Em{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(na*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wc*2*Math.atan(Math.tan(na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z)}getViewSize(t,e){return this.getViewBounds(t,yh,Mh),e.subVectors(Mh,yh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(na*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Is=-90,Ls=1;class uy extends Te{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new vn(Is,Ls,t,e);s.layers=this.layers,this.add(s);const r=new vn(Is,Ls,t,e);r.layers=this.layers,this.add(r);const o=new vn(Is,Ls,t,e);o.layers=this.layers,this.add(o);const a=new vn(Is,Ls,t,e);a.layers=this.layers,this.add(a);const l=new vn(Is,Ls,t,e);l.layers=this.layers,this.add(l);const c=new vn(Is,Ls,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===_a)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class bm extends Qe{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:rr,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fy extends Dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new bm(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Cn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new lo(5,5,5),r=new ke({name:"CubemapFromEquirect",uniforms:cr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:ci});r.uniforms.tEquirect.value=e;const o=new Re(s,r),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=Cn),new uy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Cl=new $,hy=new $,dy=new Kt;class Pi{constructor(t=new $(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Cl.subVectors(i,e).cross(hy.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Cl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||dy.getNormalMatrix(t),s=this.coplanarPoint(Cl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new hr,Oo=new $;class Cu{constructor(t=new Pi,e=new Pi,i=new Pi,s=new Pi,r=new Pi,o=new Pi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=li){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],f=s[6],h=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],S=s[13],A=s[14],M=s[15];if(i[0].setComponents(l-r,h-c,m-d,M-p).normalize(),i[1].setComponents(l+r,h+c,m+d,M+p).normalize(),i[2].setComponents(l+o,h+u,m+g,M+S).normalize(),i[3].setComponents(l-o,h-u,m-g,M-S).normalize(),i[4].setComponents(l-a,h-f,m-_,M-A).normalize(),e===li)i[5].setComponents(l+a,h+f,m+_,M+A).normalize();else if(e===_a)i[5].setComponents(a,f,_,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Oo.x=s.normal.x>0?t.max.x:t.min.x,Oo.y=s.normal.y>0?t.max.y:t.min.y,Oo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Tm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function py(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Wa extends Ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=t/a,h=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const S=p*h-o;for(let A=0;A<c;A++){const M=A*f-r;g.push(M,-S,0),_.push(0,0,1),m.push(A/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const A=S+c*p,M=S+c*(p+1),G=S+1+c*(p+1),I=S+1+c*p;d.push(A,M,I),d.push(M,G,I)}this.setIndex(d),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wa(t.width,t.height,t.widthSegments,t.heightSegments)}}var my=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gy=`#ifdef USE_ALPHAHASH
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
#endif`,_y=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,My=`#ifdef USE_AOMAP
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
#endif`,Sy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ey=`#ifdef USE_BATCHING
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
#endif`,by=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ty=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ay=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ry=`#ifdef USE_IRIDESCENCE
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
#endif`,Cy=`#ifdef USE_BUMPMAP
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
#endif`,Py=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Iy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ly=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ny=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Oy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,By=`#define PI 3.141592653589793
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
} // validated`,zy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ky=`vec3 transformedNormal = objectNormal;
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
#endif`,Hy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xy="gl_FragColor = linearToOutputTexel( gl_FragColor );",jy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qy=`#ifdef USE_ENVMAP
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
#endif`,Yy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$y=`#ifdef USE_ENVMAP
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
#endif`,Ky=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zy=`#ifdef USE_ENVMAP
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
#endif`,Jy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qy=`#ifdef USE_FOG
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
material.specularStrength = specularStrength;`,fM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hM=`PhysicalMaterial material;
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
#endif`,yM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,MM=`#ifdef USE_MAP
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
#endif`,IM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,LM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,kM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,HM=`#ifdef USE_IRIDESCENCEMAP
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
}`,tS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eS=`#ifdef USE_SKINNING
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
#endif`,nS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iS=`#ifdef USE_SKINNING
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
#endif`,sS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,aS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lS=`#ifdef USE_TRANSMISSION
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
#endif`,cS=`#ifdef USE_TRANSMISSION
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
#endif`,uS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mS=`uniform sampler2D t2D;
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
}`,gS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_S=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yS=`#include <common>
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
}`,MS=`#if DEPTH_PACKING == 3200
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
}`,SS=`#define DISTANCE
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
}`,ES=`#define DISTANCE
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
}`,bS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,TS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AS=`uniform float scale;
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
}`,wS=`uniform vec3 diffuse;
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
}`,RS=`#include <common>
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
}`,CS=`uniform vec3 diffuse;
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
}`,PS=`#define LAMBERT
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
}`,DS=`#define LAMBERT
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
}`,IS=`#define MATCAP
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
}`,LS=`#define MATCAP
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
}`,US=`#define NORMAL
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
}`,NS=`#define NORMAL
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
}`,OS=`#define PHONG
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
}`,FS=`#define PHONG
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
}`,BS=`#define STANDARD
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
}`,zS=`#define STANDARD
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
}`,kS=`#define TOON
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
}`,HS=`#define TOON
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
}`,VS=`uniform float size;
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
}`,GS=`uniform vec3 diffuse;
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
}`,WS=`#include <common>
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
}`,XS=`uniform vec3 color;
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
}`,jS=`uniform float rotation;
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
}`,qS=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:my,alphahash_pars_fragment:gy,alphamap_fragment:_y,alphamap_pars_fragment:vy,alphatest_fragment:xy,alphatest_pars_fragment:yy,aomap_fragment:My,aomap_pars_fragment:Sy,batching_pars_vertex:Ey,batching_vertex:by,begin_vertex:Ty,beginnormal_vertex:Ay,bsdfs:wy,iridescence_fragment:Ry,bumpmap_pars_fragment:Cy,clipping_planes_fragment:Py,clipping_planes_pars_fragment:Dy,clipping_planes_pars_vertex:Iy,clipping_planes_vertex:Ly,color_fragment:Uy,color_pars_fragment:Ny,color_pars_vertex:Oy,color_vertex:Fy,common:By,cube_uv_reflection_fragment:zy,defaultnormal_vertex:ky,displacementmap_pars_vertex:Hy,displacementmap_vertex:Vy,emissivemap_fragment:Gy,emissivemap_pars_fragment:Wy,colorspace_fragment:Xy,colorspace_pars_fragment:jy,envmap_fragment:qy,envmap_common_pars_fragment:Yy,envmap_pars_fragment:$y,envmap_pars_vertex:Ky,envmap_physical_pars_fragment:aM,envmap_vertex:Zy,fog_vertex:Jy,fog_pars_vertex:Qy,fog_fragment:tM,fog_pars_fragment:eM,gradientmap_pars_fragment:nM,lightmap_pars_fragment:iM,lights_lambert_fragment:sM,lights_lambert_pars_fragment:rM,lights_pars_begin:oM,lights_toon_fragment:lM,lights_toon_pars_fragment:cM,lights_phong_fragment:uM,lights_phong_pars_fragment:fM,lights_physical_fragment:hM,lights_physical_pars_fragment:dM,lights_fragment_begin:pM,lights_fragment_maps:mM,lights_fragment_end:gM,logdepthbuf_fragment:_M,logdepthbuf_pars_fragment:vM,logdepthbuf_pars_vertex:xM,logdepthbuf_vertex:yM,map_fragment:MM,map_pars_fragment:SM,map_particle_fragment:EM,map_particle_pars_fragment:bM,metalnessmap_fragment:TM,metalnessmap_pars_fragment:AM,morphinstance_vertex:wM,morphcolor_vertex:RM,morphnormal_vertex:CM,morphtarget_pars_vertex:PM,morphtarget_vertex:DM,normal_fragment_begin:IM,normal_fragment_maps:LM,normal_pars_fragment:UM,normal_pars_vertex:NM,normal_vertex:OM,normalmap_pars_fragment:FM,clearcoat_normal_fragment_begin:BM,clearcoat_normal_fragment_maps:zM,clearcoat_pars_fragment:kM,iridescence_pars_fragment:HM,opaque_fragment:VM,packing:GM,premultiplied_alpha_fragment:WM,project_vertex:XM,dithering_fragment:jM,dithering_pars_fragment:qM,roughnessmap_fragment:YM,roughnessmap_pars_fragment:$M,shadowmap_pars_fragment:KM,shadowmap_pars_vertex:ZM,shadowmap_vertex:JM,shadowmask_pars_fragment:QM,skinbase_vertex:tS,skinning_pars_vertex:eS,skinning_vertex:nS,skinnormal_vertex:iS,specularmap_fragment:sS,specularmap_pars_fragment:rS,tonemapping_fragment:oS,tonemapping_pars_fragment:aS,transmission_fragment:lS,transmission_pars_fragment:cS,uv_pars_fragment:uS,uv_pars_vertex:fS,uv_vertex:hS,worldpos_vertex:dS,background_vert:pS,background_frag:mS,backgroundCube_vert:gS,backgroundCube_frag:_S,cube_vert:vS,cube_frag:xS,depth_vert:yS,depth_frag:MS,distanceRGBA_vert:SS,distanceRGBA_frag:ES,equirect_vert:bS,equirect_frag:TS,linedashed_vert:AS,linedashed_frag:wS,meshbasic_vert:RS,meshbasic_frag:CS,meshlambert_vert:PS,meshlambert_frag:DS,meshmatcap_vert:IS,meshmatcap_frag:LS,meshnormal_vert:US,meshnormal_frag:NS,meshphong_vert:OS,meshphong_frag:FS,meshphysical_vert:BS,meshphysical_frag:zS,meshtoon_vert:kS,meshtoon_frag:HS,points_vert:VS,points_frag:GS,shadow_vert:WS,shadow_frag:XS,sprite_vert:jS,sprite_frag:qS},Tt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},zn={basic:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:je([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:je([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:je([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:je([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:je([Tt.points,Tt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:je([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:je([Tt.common,Tt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:je([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:je([Tt.sprite,Tt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:je([Tt.common,Tt.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:je([Tt.lights,Tt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};zn.physical={uniforms:je([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Fo={r:0,b:0,g:0},Ki=new Xn,YS=new de;function $S(n,t,e,i,s,r,o){const a=new qt(0);let l=r===!0?0:1,c,u,f=null,h=0,d=null;function g(S){let A=S.isScene===!0?S.background:null;return A&&A.isTexture&&(A=(S.backgroundBlurriness>0?e:t).get(A)),A}function _(S){let A=!1;const M=g(S);M===null?p(a,l):M&&M.isColor&&(p(M,1),A=!0);const G=n.xr.getEnvironmentBlendMode();G==="additive"?i.buffers.color.setClear(0,0,0,1,o):G==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,A){const M=g(A);M&&(M.isCubeTexture||M.mapping===Va)?(u===void 0&&(u=new Re(new lo(1,1,1),new ke({name:"BackgroundCubeMaterial",uniforms:cr(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(G,I,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ki.copy(A.backgroundRotation),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(YS.makeRotationFromEuler(Ki)),u.material.toneMapped=ee.getTransfer(M.colorSpace)!==ce,(f!==M||h!==M.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=M,h=M.version,d=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Re(new Wa(2,2),new ke({name:"BackgroundMaterial",uniforms:cr(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=ee.getTransfer(M.colorSpace)!==ce,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||h!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=M,h=M.version,d=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,A){S.getRGB(Fo,Sm(n)),i.buffers.color.setClear(Fo.r,Fo.g,Fo.b,A,o)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),l=A,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m}}function KS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(E,P,N,O,Q){let j=!1;const U=f(O,N,P);r!==U&&(r=U,c(r.object)),j=d(E,O,N,Q),j&&g(E,O,N,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,M(E,P,N,O),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function f(E,P,N){const O=N.wireframe===!0;let Q=i[E.id];Q===void 0&&(Q={},i[E.id]=Q);let j=Q[P.id];j===void 0&&(j={},Q[P.id]=j);let U=j[O];return U===void 0&&(U=h(l()),j[O]=U),U}function h(E){const P=[],N=[],O=[];for(let Q=0;Q<e;Q++)P[Q]=0,N[Q]=0,O[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:O,object:E,attributes:{},index:null}}function d(E,P,N,O){const Q=r.attributes,j=P.attributes;let U=0;const nt=N.getAttributes();for(const X in nt)if(nt[X].location>=0){const Mt=Q[X];let At=j[X];if(At===void 0&&(X==="instanceMatrix"&&E.instanceMatrix&&(At=E.instanceMatrix),X==="instanceColor"&&E.instanceColor&&(At=E.instanceColor)),Mt===void 0||Mt.attribute!==At||At&&Mt.data!==At.data)return!0;U++}return r.attributesNum!==U||r.index!==O}function g(E,P,N,O){const Q={},j=P.attributes;let U=0;const nt=N.getAttributes();for(const X in nt)if(nt[X].location>=0){let Mt=j[X];Mt===void 0&&(X==="instanceMatrix"&&E.instanceMatrix&&(Mt=E.instanceMatrix),X==="instanceColor"&&E.instanceColor&&(Mt=E.instanceColor));const At={};At.attribute=Mt,Mt&&Mt.data&&(At.data=Mt.data),Q[X]=At,U++}r.attributes=Q,r.attributesNum=U,r.index=O}function _(){const E=r.newAttributes;for(let P=0,N=E.length;P<N;P++)E[P]=0}function m(E){p(E,0)}function p(E,P){const N=r.newAttributes,O=r.enabledAttributes,Q=r.attributeDivisors;N[E]=1,O[E]===0&&(n.enableVertexAttribArray(E),O[E]=1),Q[E]!==P&&(n.vertexAttribDivisor(E,P),Q[E]=P)}function S(){const E=r.newAttributes,P=r.enabledAttributes;for(let N=0,O=P.length;N<O;N++)P[N]!==E[N]&&(n.disableVertexAttribArray(N),P[N]=0)}function A(E,P,N,O,Q,j,U){U===!0?n.vertexAttribIPointer(E,P,N,Q,j):n.vertexAttribPointer(E,P,N,O,Q,j)}function M(E,P,N,O){_();const Q=O.attributes,j=N.getAttributes(),U=P.defaultAttributeValues;for(const nt in j){const X=j[nt];if(X.location>=0){let pt=Q[nt];if(pt===void 0&&(nt==="instanceMatrix"&&E.instanceMatrix&&(pt=E.instanceMatrix),nt==="instanceColor"&&E.instanceColor&&(pt=E.instanceColor)),pt!==void 0){const Mt=pt.normalized,At=pt.itemSize,Ft=t.get(pt);if(Ft===void 0)continue;const Qt=Ft.buffer,at=Ft.type,mt=Ft.bytesPerElement,yt=at===n.INT||at===n.UNSIGNED_INT||pt.gpuType===Su;if(pt.isInterleavedBufferAttribute){const z=pt.data,ut=z.stride,lt=pt.offset;if(z.isInstancedInterleavedBuffer){for(let gt=0;gt<X.locationSize;gt++)p(X.location+gt,z.meshPerAttribute);E.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let gt=0;gt<X.locationSize;gt++)m(X.location+gt);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let gt=0;gt<X.locationSize;gt++)A(X.location+gt,At/X.locationSize,at,Mt,ut*mt,(lt+At/X.locationSize*gt)*mt,yt)}else{if(pt.isInstancedBufferAttribute){for(let z=0;z<X.locationSize;z++)p(X.location+z,pt.meshPerAttribute);E.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let z=0;z<X.locationSize;z++)m(X.location+z);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let z=0;z<X.locationSize;z++)A(X.location+z,At/X.locationSize,at,Mt,At*mt,At/X.locationSize*z*mt,yt)}}else if(U!==void 0){const Mt=U[nt];if(Mt!==void 0)switch(Mt.length){case 2:n.vertexAttrib2fv(X.location,Mt);break;case 3:n.vertexAttrib3fv(X.location,Mt);break;case 4:n.vertexAttrib4fv(X.location,Mt);break;default:n.vertexAttrib1fv(X.location,Mt)}}}}S()}function G(){L();for(const E in i){const P=i[E];for(const N in P){const O=P[N];for(const Q in O)u(O[Q].object),delete O[Q];delete P[N]}delete i[E]}}function I(E){if(i[E.id]===void 0)return;const P=i[E.id];for(const N in P){const O=P[N];for(const Q in O)u(O[Q].object),delete O[Q];delete P[N]}delete i[E.id]}function D(E){for(const P in i){const N=i[P];if(N[E.id]===void 0)continue;const O=N[E.id];for(const Q in O)u(O[Q].object),delete O[Q];delete N[E.id]}}function L(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:b,dispose:G,releaseStatesOfGeometry:I,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function ZS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,i,1)}function l(c,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function JS(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==xn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const L=D===ui&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==Wn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==ai&&!L)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),G=g>0,I=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:M,vertexTextures:G,maxSamples:I}}function QS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Pi,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,A=S*4;let M=p.clippingState||null;l.value=M,M=u(g,h,A,d);for(let G=0;G!==A;++G)M[G]=e[G];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,M=d;A!==_;++A,M+=4)o.copy(f[A]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function tE(n){let t=new WeakMap;function e(o,a){return a===mc?o.mapping=rr:a===gc&&(o.mapping=or),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===mc||a===gc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new fy(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Pu extends Em{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Hs=4,Sh=[.125,.215,.35,.446,.526,.582],ns=20,Pl=new Pu,Eh=new qt;let Dl=null,Il=0,Ll=0,Ul=!1;const Qi=(1+Math.sqrt(5))/2,Us=1/Qi,bh=[new $(-Qi,Us,0),new $(Qi,Us,0),new $(-Us,0,Qi),new $(Us,0,Qi),new $(0,Qi,-Us),new $(0,Qi,Us),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)];class Th{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Dl=this._renderer.getRenderTarget(),Il=this._renderer.getActiveCubeFace(),Ll=this._renderer.getActiveMipmapLevel(),Ul=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Dl,Il,Ll),this._renderer.xr.enabled=Ul,t.scissorTest=!1,Bo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rr||t.mapping===or?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Dl=this._renderer.getRenderTarget(),Il=this._renderer.getActiveCubeFace(),Ll=this._renderer.getActiveMipmapLevel(),Ul=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Cn,minFilter:Cn,generateMipmaps:!1,type:ui,format:xn,colorSpace:fr,depthBuffer:!1},s=Ah(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ah(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=eE(r)),this._blurMaterial=nE(r,t,e)}return s}_compileMaterial(t){const e=new Re(this._lodPlanes[0],t);this._renderer.compile(e,Pl)}_sceneToCubeUV(t,e,i,s){const a=new vn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Eh),u.toneMapping=Oi,u.autoClear=!1;const d=new _n({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),g=new Re(new lo,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Eh),_=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):S===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const A=this._cubeSize;Bo(s,S*A,p>2?A:0,A,A),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===rr||t.mapping===or;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Re(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Bo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Pl)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=bh[(s-r-1)%bh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Re(this._lodPlanes[s],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ns-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):ns;m>ns&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ns}`);const p=[];let S=0;for(let D=0;D<ns;++D){const L=D/_,b=Math.exp(-L*L/2);p.push(b),D===0?S+=b:D<m&&(S+=2*b)}for(let D=0;D<p.length;D++)p[D]=p[D]/S;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:A}=this;h.dTheta.value=g,h.mipInt.value=A-i;const M=this._sizeLods[s],G=3*M*(s>A-Hs?s-A+Hs:0),I=4*(this._cubeSize-M);Bo(e,G,I,3*M,2*M),l.setRenderTarget(e),l.render(f,Pl)}}function eE(n){const t=[],e=[],i=[];let s=n;const r=n-Hs+1+Sh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Hs?l=Sh[o-n+Hs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*d),A=new Float32Array(m*g*d),M=new Float32Array(p*g*d);for(let I=0;I<d;I++){const D=I%3*2/3-1,L=I>2?0:-1,b=[D,L,0,D+2/3,L,0,D+2/3,L+1,0,D,L,0,D+2/3,L+1,0,D,L+1,0];S.set(b,_*g*I),A.set(h,m*g*I);const E=[I,I,I,I,I,I];M.set(E,p*g*I)}const G=new Ve;G.setAttribute("position",new Sn(S,_)),G.setAttribute("uv",new Sn(A,m)),G.setAttribute("faceIndex",new Sn(M,p)),t.push(G),s>Hs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Ah(n,t,e){const i=new Dn(n,t,e);return i.texture.mapping=Va,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Bo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function nE(n,t,e){const i=new Float32Array(ns),s=new $(0,1,0);return new ke({name:"SphericalGaussianBlur",defines:{n:ns,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Du(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function wh(){return new ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Du(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Rh(){return new ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Du(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Du(){return`

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
	`}function iE(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===mc||l===gc,u=l===rr||l===or;if(c||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Th(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(e===null&&(e=new Th(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function sE(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Dr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function rE(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const S=d.array;_=d.version;for(let A=0,M=S.length;A<M;A+=3){const G=S[A+0],I=S[A+1],D=S[A+2];h.push(G,I,I,D,D,G)}}else if(g!==void 0){const S=g.array;_=g.version;for(let A=0,M=S.length/3-1;A<M;A+=3){const G=A+0,I=A+1,D=A+2;h.push(G,I,I,D,D,G)}}else return;const m=new(gm(h)?Mm:ym)(h,1);m.version=_;const p=r.get(f);p&&t.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function oE(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,r,h*o),e.update(d,i,1)}function c(h,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,h*o,g),e.update(d,i,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function f(h,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,h,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=d[S]*_[S];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function aE(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function lE(n,t,e){const i=new WeakMap,s=new Me;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let b=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let A=0;d===!0&&(A=1),g===!0&&(A=2),_===!0&&(A=3);let M=a.attributes.position.count*A,G=1;M>t.maxTextureSize&&(G=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const I=new Float32Array(M*G*4*f),D=new vm(I,M,G,f);D.type=ai,D.needsUpdate=!0;const L=A*4;for(let E=0;E<f;E++){const P=m[E],N=p[E],O=S[E],Q=M*G*4*E;for(let j=0;j<P.count;j++){const U=j*L;d===!0&&(s.fromBufferAttribute(P,j),I[Q+U+0]=s.x,I[Q+U+1]=s.y,I[Q+U+2]=s.z,I[Q+U+3]=0),g===!0&&(s.fromBufferAttribute(N,j),I[Q+U+4]=s.x,I[Q+U+5]=s.y,I[Q+U+6]=s.z,I[Q+U+7]=0),_===!0&&(s.fromBufferAttribute(O,j),I[Q+U+8]=s.x,I[Q+U+9]=s.y,I[Q+U+10]=s.z,I[Q+U+11]=O.itemSize===4?s.w:1)}}h={count:f,texture:D,size:new zt(M,G)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function cE(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=t.get(l,u);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Am extends Qe{constructor(t,e,i,s,r,o,a,l,c,u=Zs){if(u!==Zs&&u!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Zs&&(i=fs),i===void 0&&u===lr&&(i=ar),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:pn,this.minFilter=l!==void 0?l:pn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const wm=new Qe,Ch=new Am(1,1),Rm=new vm,Cm=new Kx,Pm=new bm,Ph=[],Dh=[],Ih=new Float32Array(16),Lh=new Float32Array(9),Uh=new Float32Array(4);function dr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Ph[s];if(r===void 0&&(r=new Float32Array(s),Ph[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function De(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Xa(n,t){let e=Dh[t];e===void 0&&(e=new Int32Array(t),Dh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function uE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function fE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),De(e,t)}}function hE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),De(e,t)}}function dE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),De(e,t)}}function pE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Pe(e,i))return;Uh.set(i),n.uniformMatrix2fv(this.addr,!1,Uh),De(e,i)}}function mE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Pe(e,i))return;Lh.set(i),n.uniformMatrix3fv(this.addr,!1,Lh),De(e,i)}}function gE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Pe(e,i))return;Ih.set(i),n.uniformMatrix4fv(this.addr,!1,Ih),De(e,i)}}function _E(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function vE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),De(e,t)}}function xE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),De(e,t)}}function yE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),De(e,t)}}function ME(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function SE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),De(e,t)}}function EE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),De(e,t)}}function bE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),De(e,t)}}function TE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ch.compareFunction=mm,r=Ch):r=wm,e.setTexture2D(t||r,s)}function AE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Cm,s)}function wE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Pm,s)}function RE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Rm,s)}function CE(n){switch(n){case 5126:return uE;case 35664:return fE;case 35665:return hE;case 35666:return dE;case 35674:return pE;case 35675:return mE;case 35676:return gE;case 5124:case 35670:return _E;case 35667:case 35671:return vE;case 35668:case 35672:return xE;case 35669:case 35673:return yE;case 5125:return ME;case 36294:return SE;case 36295:return EE;case 36296:return bE;case 35678:case 36198:case 36298:case 36306:case 35682:return TE;case 35679:case 36299:case 36307:return AE;case 35680:case 36300:case 36308:case 36293:return wE;case 36289:case 36303:case 36311:case 36292:return RE}}function PE(n,t){n.uniform1fv(this.addr,t)}function DE(n,t){const e=dr(t,this.size,2);n.uniform2fv(this.addr,e)}function IE(n,t){const e=dr(t,this.size,3);n.uniform3fv(this.addr,e)}function LE(n,t){const e=dr(t,this.size,4);n.uniform4fv(this.addr,e)}function UE(n,t){const e=dr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function NE(n,t){const e=dr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function OE(n,t){const e=dr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function FE(n,t){n.uniform1iv(this.addr,t)}function BE(n,t){n.uniform2iv(this.addr,t)}function zE(n,t){n.uniform3iv(this.addr,t)}function kE(n,t){n.uniform4iv(this.addr,t)}function HE(n,t){n.uniform1uiv(this.addr,t)}function VE(n,t){n.uniform2uiv(this.addr,t)}function GE(n,t){n.uniform3uiv(this.addr,t)}function WE(n,t){n.uniform4uiv(this.addr,t)}function XE(n,t,e){const i=this.cache,s=t.length,r=Xa(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||wm,r[o])}function jE(n,t,e){const i=this.cache,s=t.length,r=Xa(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Cm,r[o])}function qE(n,t,e){const i=this.cache,s=t.length,r=Xa(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Pm,r[o])}function YE(n,t,e){const i=this.cache,s=t.length,r=Xa(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Rm,r[o])}function $E(n){switch(n){case 5126:return PE;case 35664:return DE;case 35665:return IE;case 35666:return LE;case 35674:return UE;case 35675:return NE;case 35676:return OE;case 5124:case 35670:return FE;case 35667:case 35671:return BE;case 35668:case 35672:return zE;case 35669:case 35673:return kE;case 5125:return HE;case 36294:return VE;case 36295:return GE;case 36296:return WE;case 35678:case 36198:case 36298:case 36306:case 35682:return XE;case 35679:case 36299:case 36307:return jE;case 35680:case 36300:case 36308:case 36293:return qE;case 36289:case 36303:case 36311:case 36292:return YE}}class KE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=CE(e.type)}}class ZE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$E(e.type)}}class JE{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Nl=/(\w+)(\])?(\[|\.)?/g;function Nh(n,t){n.seq.push(t),n.map[t.id]=t}function QE(n,t,e){const i=n.name,s=i.length;for(Nl.lastIndex=0;;){const r=Nl.exec(i),o=Nl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Nh(e,c===void 0?new KE(a,n,t):new ZE(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new JE(a),Nh(e,f)),e=f}}}class ia{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);QE(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Oh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const tb=37297;let eb=0;function nb(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Fh=new Kt;function ib(n){ee._getMatrix(Fh,ee.workingColorSpace,n);const t=`mat3( ${Fh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case Ga:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Bh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+nb(n.getShaderSource(t),o)}else return s}function sb(n,t){const e=ib(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rb(n,t){let e;switch(t){case Jp:e="Linear";break;case Qp:e="Reinhard";break;case tm:e="Cineon";break;case Mu:e="ACESFilmic";break;case em:e="AgX";break;case nm:e="Neutral";break;case Rx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const zo=new $;function ob(){ee.getLuminanceCoefficients(zo);const n=zo.x.toFixed(4),t=zo.y.toFixed(4),e=zo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ab(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ir).join(`
`)}function lb(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function cb(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ir(n){return n!==""}function zh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ub=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xc(n){return n.replace(ub,hb)}const fb=new Map;function hb(n,t){let e=Jt[t];if(e===void 0){const i=fb.get(t);if(i!==void 0)e=Jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Xc(e)}const db=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(n){return n.replace(db,pb)}function pb(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function mb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Kp?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ax?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ni&&(t="SHADOWMAP_TYPE_VSM"),t}function gb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rr:case or:t="ENVMAP_TYPE_CUBE";break;case Va:t="ENVMAP_TYPE_CUBE_UV";break}return t}function _b(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case or:t="ENVMAP_MODE_REFRACTION";break}return t}function vb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Zp:t="ENVMAP_BLENDING_MULTIPLY";break;case Ax:t="ENVMAP_BLENDING_MIX";break;case wx:t="ENVMAP_BLENDING_ADD";break}return t}function xb(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function yb(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=mb(e),c=gb(e),u=_b(e),f=vb(e),h=xb(e),d=ab(e),g=lb(r),_=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ir).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ir).join(`
`),p.length>0&&(p+=`
`)):(m=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ir).join(`
`),p=[Vh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Oi?rb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,sb("linearToOutputTexel",e.outputColorSpace),ob(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ir).join(`
`)),o=Xc(o),o=zh(o,e),o=kh(o,e),a=Xc(a),a=zh(a,e),a=kh(a,e),o=Hh(o),a=Hh(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===eh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===eh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=S+m+o,M=S+p+a,G=Oh(s,s.VERTEX_SHADER,A),I=Oh(s,s.FRAGMENT_SHADER,M);s.attachShader(_,G),s.attachShader(_,I),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function D(P){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(_).trim(),O=s.getShaderInfoLog(G).trim(),Q=s.getShaderInfoLog(I).trim();let j=!0,U=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(j=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,G,I);else{const nt=Bh(s,G,"vertex"),X=Bh(s,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+nt+`
`+X)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||Q==="")&&(U=!1);U&&(P.diagnostics={runnable:j,programLog:N,vertexShader:{log:O,prefix:m},fragmentShader:{log:Q,prefix:p}})}s.deleteShader(G),s.deleteShader(I),L=new ia(s,_),b=cb(s,_)}let L;this.getUniforms=function(){return L===void 0&&D(this),L};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,tb)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=eb++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=G,this.fragmentShader=I,this}let Mb=0;class Sb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Eb(t),e.set(t,i)),i}}class Eb{constructor(t){this.id=Mb++,this.code=t,this.usedTimes=0}}function bb(n,t,e,i,s,r,o){const a=new Ru,l=new Sb,c=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,E,P,N,O){const Q=N.fog,j=O.geometry,U=b.isMeshStandardMaterial?N.environment:null,nt=(b.isMeshStandardMaterial?e:t).get(b.envMap||U),X=nt&&nt.mapping===Va?nt.image.height:null,pt=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Mt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,At=Mt!==void 0?Mt.length:0;let Ft=0;j.morphAttributes.position!==void 0&&(Ft=1),j.morphAttributes.normal!==void 0&&(Ft=2),j.morphAttributes.color!==void 0&&(Ft=3);let Qt,at,mt,yt;if(pt){const ie=zn[pt];Qt=ie.vertexShader,at=ie.fragmentShader}else Qt=b.vertexShader,at=b.fragmentShader,l.update(b),mt=l.getVertexShaderID(b),yt=l.getFragmentShaderID(b);const z=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),lt=O.isInstancedMesh===!0,gt=O.isBatchedMesh===!0,Dt=!!b.map,R=!!b.matcap,w=!!nt,y=!!b.aoMap,tt=!!b.lightMap,Z=!!b.bumpMap,V=!!b.normalMap,st=!!b.displacementMap,W=!!b.emissiveMap,F=!!b.metalnessMap,x=!!b.roughnessMap,v=b.anisotropy>0,C=b.clearcoat>0,B=b.dispersion>0,H=b.iridescence>0,q=b.sheen>0,_t=b.transmission>0,ct=v&&!!b.anisotropyMap,ht=C&&!!b.clearcoatMap,Ct=C&&!!b.clearcoatNormalMap,rt=C&&!!b.clearcoatRoughnessMap,dt=H&&!!b.iridescenceMap,Et=H&&!!b.iridescenceThicknessMap,Ht=q&&!!b.sheenColorMap,xt=q&&!!b.sheenRoughnessMap,kt=!!b.specularMap,Vt=!!b.specularColorMap,te=!!b.specularIntensityMap,k=_t&&!!b.transmissionMap,bt=_t&&!!b.thicknessMap,ot=!!b.gradientMap,ft=!!b.alphaMap,St=b.alphaTest>0,wt=!!b.alphaHash,Gt=!!b.extensions;let ve=Oi;b.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(ve=n.toneMapping);const Ie={shaderID:pt,shaderType:b.type,shaderName:b.name,vertexShader:Qt,fragmentShader:at,defines:b.defines,customVertexShaderID:mt,customFragmentShaderID:yt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:gt,batchingColor:gt&&O._colorsTexture!==null,instancing:lt,instancingColor:lt&&O.instanceColor!==null,instancingMorph:lt&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:z===null?n.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:fr,alphaToCoverage:!!b.alphaToCoverage,map:Dt,matcap:R,envMap:w,envMapMode:w&&nt.mapping,envMapCubeUVHeight:X,aoMap:y,lightMap:tt,bumpMap:Z,normalMap:V,displacementMap:h&&st,emissiveMap:W,normalMapObjectSpace:V&&b.normalMapType===Ix,normalMapTangentSpace:V&&b.normalMapType===pm,metalnessMap:F,roughnessMap:x,anisotropy:v,anisotropyMap:ct,clearcoat:C,clearcoatMap:ht,clearcoatNormalMap:Ct,clearcoatRoughnessMap:rt,dispersion:B,iridescence:H,iridescenceMap:dt,iridescenceThicknessMap:Et,sheen:q,sheenColorMap:Ht,sheenRoughnessMap:xt,specularMap:kt,specularColorMap:Vt,specularIntensityMap:te,transmission:_t,transmissionMap:k,thicknessMap:bt,gradientMap:ot,opaque:b.transparent===!1&&b.blending===$s&&b.alphaToCoverage===!1,alphaMap:ft,alphaTest:St,alphaHash:wt,combine:b.combine,mapUv:Dt&&_(b.map.channel),aoMapUv:y&&_(b.aoMap.channel),lightMapUv:tt&&_(b.lightMap.channel),bumpMapUv:Z&&_(b.bumpMap.channel),normalMapUv:V&&_(b.normalMap.channel),displacementMapUv:st&&_(b.displacementMap.channel),emissiveMapUv:W&&_(b.emissiveMap.channel),metalnessMapUv:F&&_(b.metalnessMap.channel),roughnessMapUv:x&&_(b.roughnessMap.channel),anisotropyMapUv:ct&&_(b.anisotropyMap.channel),clearcoatMapUv:ht&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(b.sheenRoughnessMap.channel),specularMapUv:kt&&_(b.specularMap.channel),specularColorMapUv:Vt&&_(b.specularColorMap.channel),specularIntensityMapUv:te&&_(b.specularIntensityMap.channel),transmissionMapUv:k&&_(b.transmissionMap.channel),thicknessMapUv:bt&&_(b.thicknessMap.channel),alphaMapUv:ft&&_(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(V||v),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!j.attributes.uv&&(Dt||ft),fog:!!Q,useFog:b.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:ut,skinning:O.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Ft,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:Dt&&b.map.isVideoTexture===!0&&ee.getTransfer(b.map.colorSpace)===ce,decodeVideoTextureEmissive:W&&b.emissiveMap.isVideoTexture===!0&&ee.getTransfer(b.emissiveMap.colorSpace)===ce,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===wn,flipSided:b.side===an,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Gt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&b.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)E.push(P),E.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(S(E,b),A(E,b),E.push(n.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function S(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function A(b,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),b.push(a.mask)}function M(b){const E=g[b.type];let P;if(E){const N=zn[E];P=Jr.clone(N.uniforms)}else P=b.uniforms;return P}function G(b,E){let P;for(let N=0,O=u.length;N<O;N++){const Q=u[N];if(Q.cacheKey===E){P=Q,++P.usedTimes;break}}return P===void 0&&(P=new yb(n,E,b,r),u.push(P)),P}function I(b){if(--b.usedTimes===0){const E=u.indexOf(b);u[E]=u[u.length-1],u.pop(),b.destroy()}}function D(b){l.remove(b)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:G,releaseProgram:I,releaseShaderCache:D,programs:u,dispose:L}}function Tb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Ab(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Gh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Wh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f,h,d,g,_,m){let p=n[t];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(f,h){e.length>1&&e.sort(f||Ab),i.length>1&&i.sort(h||Gh),s.length>1&&s.sort(h||Gh)}function u(){for(let f=t,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function wb(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Wh,n.set(i,[o])):s>=r.length?(o=new Wh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Rb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new $,color:new qt};break;case"SpotLight":e={position:new $,direction:new $,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new $,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new $,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new $,halfWidth:new $,halfHeight:new $};break}return n[t.id]=e,e}}}function Cb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Pb=0;function Db(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Ib(n){const t=new Rb,e=Cb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new $);const s=new $,r=new de,o=new de;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,S=0,A=0,M=0,G=0,I=0,D=0;c.sort(Db);for(let b=0,E=c.length;b<E;b++){const P=c[b],N=P.color,O=P.intensity,Q=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=N.r*O,f+=N.g*O,h+=N.b*O;else if(P.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(P.sh.coefficients[U],O);D++}else if(P.isDirectionalLight){const U=t.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const nt=P.shadow,X=e.get(P);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,i.directionalShadow[d]=X,i.directionalShadowMap[d]=j,i.directionalShadowMatrix[d]=P.shadow.matrix,S++}i.directional[d]=U,d++}else if(P.isSpotLight){const U=t.get(P);U.position.setFromMatrixPosition(P.matrixWorld),U.color.copy(N).multiplyScalar(O),U.distance=Q,U.coneCos=Math.cos(P.angle),U.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),U.decay=P.decay,i.spot[_]=U;const nt=P.shadow;if(P.map&&(i.spotLightMap[G]=P.map,G++,nt.updateMatrices(P),P.castShadow&&I++),i.spotLightMatrix[_]=nt.matrix,P.castShadow){const X=e.get(P);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,i.spotShadow[_]=X,i.spotShadowMap[_]=j,M++}_++}else if(P.isRectAreaLight){const U=t.get(P);U.color.copy(N).multiplyScalar(O),U.halfWidth.set(P.width*.5,0,0),U.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=U,m++}else if(P.isPointLight){const U=t.get(P);if(U.color.copy(P.color).multiplyScalar(P.intensity),U.distance=P.distance,U.decay=P.decay,P.castShadow){const nt=P.shadow,X=e.get(P);X.shadowIntensity=nt.intensity,X.shadowBias=nt.bias,X.shadowNormalBias=nt.normalBias,X.shadowRadius=nt.radius,X.shadowMapSize=nt.mapSize,X.shadowCameraNear=nt.camera.near,X.shadowCameraFar=nt.camera.far,i.pointShadow[g]=X,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=P.shadow.matrix,A++}i.point[g]=U,g++}else if(P.isHemisphereLight){const U=t.get(P);U.skyColor.copy(P.color).multiplyScalar(O),U.groundColor.copy(P.groundColor).multiplyScalar(O),i.hemi[p]=U,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==S||L.numPointShadows!==A||L.numSpotShadows!==M||L.numSpotMaps!==G||L.numLightProbes!==D)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=M+G-I,i.spotLightMap.length=G,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=D,L.directionalLength=d,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=S,L.numPointShadows=A,L.numSpotShadows=M,L.numSpotMaps=G,L.numLightProbes=D,i.version=Pb++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const A=c[p];if(A.isDirectionalLight){const M=i.directional[f];M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(A.isSpotLight){const M=i.spot[d];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(A.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(A.width*.5,0,0),M.halfHeight.set(0,A.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(A.isPointLight){const M=i.point[h];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Xh(n){const t=new Ib(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Lb(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Xh(n),t.set(s,[a])):r>=o.length?(a=new Xh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Ub extends _s{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Px,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nb extends _s{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fb=`uniform sampler2D shadow_pass;
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
}`;function Bb(n,t,e){let i=new Cu;const s=new zt,r=new zt,o=new Me,a=new Ub({depthPacking:Dx}),l=new Nb,c={},u=e.maxTextureSize,f={[Hi]:an,[an]:Hi,[wn]:wn},h=new ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new zt},radius:{value:4}},vertexShader:Ob,fragmentShader:Fb}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ve;g.setAttribute("position",new Sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Re(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kp;let p=this.type;this.render=function(I,D,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||I.length===0)return;const b=n.getRenderTarget(),E=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),N=n.state;N.setBlending(ci),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=p!==ni&&this.type===ni,Q=p===ni&&this.type!==ni;for(let j=0,U=I.length;j<U;j++){const nt=I[j],X=nt.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const pt=X.getFrameExtents();if(s.multiply(pt),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/pt.x),s.x=r.x*pt.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/pt.y),s.y=r.y*pt.y,X.mapSize.y=r.y)),X.map===null||O===!0||Q===!0){const At=this.type!==ni?{minFilter:pn,magFilter:pn}:{};X.map!==null&&X.map.dispose(),X.map=new Dn(s.x,s.y,At),X.map.texture.name=nt.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();const Mt=X.getViewportCount();for(let At=0;At<Mt;At++){const Ft=X.getViewport(At);o.set(r.x*Ft.x,r.y*Ft.y,r.x*Ft.z,r.y*Ft.w),N.viewport(o),X.updateMatrices(nt,At),i=X.getFrustum(),M(D,L,X.camera,nt,this.type)}X.isPointLightShadow!==!0&&this.type===ni&&S(X,L),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,E,P)};function S(I,D){const L=t.update(_);h.defines.VSM_SAMPLES!==I.blurSamples&&(h.defines.VSM_SAMPLES=I.blurSamples,d.defines.VSM_SAMPLES=I.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Dn(s.x,s.y)),h.uniforms.shadow_pass.value=I.map.texture,h.uniforms.resolution.value=I.mapSize,h.uniforms.radius.value=I.radius,n.setRenderTarget(I.mapPass),n.clear(),n.renderBufferDirect(D,null,L,h,_,null),d.uniforms.shadow_pass.value=I.mapPass.texture,d.uniforms.resolution.value=I.mapSize,d.uniforms.radius.value=I.radius,n.setRenderTarget(I.map),n.clear(),n.renderBufferDirect(D,null,L,d,_,null)}function A(I,D,L,b){let E=null;const P=L.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(P!==void 0)E=P;else if(E=L.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const N=E.uuid,O=D.uuid;let Q=c[N];Q===void 0&&(Q={},c[N]=Q);let j=Q[O];j===void 0&&(j=E.clone(),Q[O]=j,D.addEventListener("dispose",G)),E=j}if(E.visible=D.visible,E.wireframe=D.wireframe,b===ni?E.side=D.shadowSide!==null?D.shadowSide:D.side:E.side=D.shadowSide!==null?D.shadowSide:f[D.side],E.alphaMap=D.alphaMap,E.alphaTest=D.alphaTest,E.map=D.map,E.clipShadows=D.clipShadows,E.clippingPlanes=D.clippingPlanes,E.clipIntersection=D.clipIntersection,E.displacementMap=D.displacementMap,E.displacementScale=D.displacementScale,E.displacementBias=D.displacementBias,E.wireframeLinewidth=D.wireframeLinewidth,E.linewidth=D.linewidth,L.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const N=n.properties.get(E);N.light=L}return E}function M(I,D,L,b,E){if(I.visible===!1)return;if(I.layers.test(D.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&E===ni)&&(!I.frustumCulled||i.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,I.matrixWorld);const O=t.update(I),Q=I.material;if(Array.isArray(Q)){const j=O.groups;for(let U=0,nt=j.length;U<nt;U++){const X=j[U],pt=Q[X.materialIndex];if(pt&&pt.visible){const Mt=A(I,pt,b,E);I.onBeforeShadow(n,I,D,L,O,Mt,X),n.renderBufferDirect(L,null,O,Mt,I,X),I.onAfterShadow(n,I,D,L,O,Mt,X)}}}else if(Q.visible){const j=A(I,Q,b,E);I.onBeforeShadow(n,I,D,L,O,j,null),n.renderBufferDirect(L,null,O,j,I,null),I.onAfterShadow(n,I,D,L,O,j,null)}}const N=I.children;for(let O=0,Q=N.length;O<Q;O++)M(N[O],D,L,b,E)}function G(I){I.target.removeEventListener("dispose",G);for(const L in c){const b=c[L],E=I.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const zb={[lc]:cc,[uc]:dc,[fc]:pc,[sr]:hc,[cc]:lc,[dc]:uc,[pc]:fc,[hc]:sr};function kb(n,t){function e(){let k=!1;const bt=new Me;let ot=null;const ft=new Me(0,0,0,0);return{setMask:function(St){ot!==St&&!k&&(n.colorMask(St,St,St,St),ot=St)},setLocked:function(St){k=St},setClear:function(St,wt,Gt,ve,Ie){Ie===!0&&(St*=ve,wt*=ve,Gt*=ve),bt.set(St,wt,Gt,ve),ft.equals(bt)===!1&&(n.clearColor(St,wt,Gt,ve),ft.copy(bt))},reset:function(){k=!1,ot=null,ft.set(-1,0,0,0)}}}function i(){let k=!1,bt=!1,ot=null,ft=null,St=null;return{setReversed:function(wt){if(bt!==wt){const Gt=t.get("EXT_clip_control");bt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const ve=St;St=null,this.setClear(ve)}bt=wt},getReversed:function(){return bt},setTest:function(wt){wt?z(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(wt){ot!==wt&&!k&&(n.depthMask(wt),ot=wt)},setFunc:function(wt){if(bt&&(wt=zb[wt]),ft!==wt){switch(wt){case lc:n.depthFunc(n.NEVER);break;case cc:n.depthFunc(n.ALWAYS);break;case uc:n.depthFunc(n.LESS);break;case sr:n.depthFunc(n.LEQUAL);break;case fc:n.depthFunc(n.EQUAL);break;case hc:n.depthFunc(n.GEQUAL);break;case dc:n.depthFunc(n.GREATER);break;case pc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ft=wt}},setLocked:function(wt){k=wt},setClear:function(wt){St!==wt&&(bt&&(wt=1-wt),n.clearDepth(wt),St=wt)},reset:function(){k=!1,ot=null,ft=null,St=null,bt=!1}}}function s(){let k=!1,bt=null,ot=null,ft=null,St=null,wt=null,Gt=null,ve=null,Ie=null;return{setTest:function(ie){k||(ie?z(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(ie){bt!==ie&&!k&&(n.stencilMask(ie),bt=ie)},setFunc:function(ie,Ge,tn){(ot!==ie||ft!==Ge||St!==tn)&&(n.stencilFunc(ie,Ge,tn),ot=ie,ft=Ge,St=tn)},setOp:function(ie,Ge,tn){(wt!==ie||Gt!==Ge||ve!==tn)&&(n.stencilOp(ie,Ge,tn),wt=ie,Gt=Ge,ve=tn)},setLocked:function(ie){k=ie},setClear:function(ie){Ie!==ie&&(n.clearStencil(ie),Ie=ie)},reset:function(){k=!1,bt=null,ot=null,ft=null,St=null,wt=null,Gt=null,ve=null,Ie=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,A=null,M=null,G=null,I=null,D=new qt(0,0,0),L=0,b=!1,E=null,P=null,N=null,O=null,Q=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,nt=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(X)[1]),U=nt>=1):X.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),U=nt>=2);let pt=null,Mt={};const At=n.getParameter(n.SCISSOR_BOX),Ft=n.getParameter(n.VIEWPORT),Qt=new Me().fromArray(At),at=new Me().fromArray(Ft);function mt(k,bt,ot,ft){const St=new Uint8Array(4),wt=n.createTexture();n.bindTexture(k,wt),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Gt=0;Gt<ot;Gt++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(bt,0,n.RGBA,1,1,ft,0,n.RGBA,n.UNSIGNED_BYTE,St):n.texImage2D(bt+Gt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,St);return wt}const yt={};yt[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),yt[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),yt[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),z(n.DEPTH_TEST),o.setFunc(sr),Z(!1),V(Kf),z(n.CULL_FACE),y(ci);function z(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function ut(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function lt(k,bt){return f[k]!==bt?(n.bindFramebuffer(k,bt),f[k]=bt,k===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=bt),k===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=bt),!0):!1}function gt(k,bt){let ot=d,ft=!1;if(k){ot=h.get(bt),ot===void 0&&(ot=[],h.set(bt,ot));const St=k.textures;if(ot.length!==St.length||ot[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Gt=St.length;wt<Gt;wt++)ot[wt]=n.COLOR_ATTACHMENT0+wt;ot.length=St.length,ft=!0}}else ot[0]!==n.BACK&&(ot[0]=n.BACK,ft=!0);ft&&n.drawBuffers(ot)}function Dt(k){return g!==k?(n.useProgram(k),g=k,!0):!1}const R={[es]:n.FUNC_ADD,[cx]:n.FUNC_SUBTRACT,[ux]:n.FUNC_REVERSE_SUBTRACT};R[fx]=n.MIN,R[hx]=n.MAX;const w={[dx]:n.ZERO,[px]:n.ONE,[mx]:n.SRC_COLOR,[oc]:n.SRC_ALPHA,[Mx]:n.SRC_ALPHA_SATURATE,[xx]:n.DST_COLOR,[_x]:n.DST_ALPHA,[gx]:n.ONE_MINUS_SRC_COLOR,[ac]:n.ONE_MINUS_SRC_ALPHA,[yx]:n.ONE_MINUS_DST_COLOR,[vx]:n.ONE_MINUS_DST_ALPHA,[Sx]:n.CONSTANT_COLOR,[Ex]:n.ONE_MINUS_CONSTANT_COLOR,[bx]:n.CONSTANT_ALPHA,[Tx]:n.ONE_MINUS_CONSTANT_ALPHA};function y(k,bt,ot,ft,St,wt,Gt,ve,Ie,ie){if(k===ci){_===!0&&(ut(n.BLEND),_=!1);return}if(_===!1&&(z(n.BLEND),_=!0),k!==lx){if(k!==m||ie!==b){if((p!==es||M!==es)&&(n.blendEquation(n.FUNC_ADD),p=es,M=es),ie)switch(k){case $s:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ks:n.blendFunc(n.ONE,n.ONE);break;case Zf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case $s:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ks:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Zf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Jf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}S=null,A=null,G=null,I=null,D.set(0,0,0),L=0,m=k,b=ie}return}St=St||bt,wt=wt||ot,Gt=Gt||ft,(bt!==p||St!==M)&&(n.blendEquationSeparate(R[bt],R[St]),p=bt,M=St),(ot!==S||ft!==A||wt!==G||Gt!==I)&&(n.blendFuncSeparate(w[ot],w[ft],w[wt],w[Gt]),S=ot,A=ft,G=wt,I=Gt),(ve.equals(D)===!1||Ie!==L)&&(n.blendColor(ve.r,ve.g,ve.b,Ie),D.copy(ve),L=Ie),m=k,b=!1}function tt(k,bt){k.side===wn?ut(n.CULL_FACE):z(n.CULL_FACE);let ot=k.side===an;bt&&(ot=!ot),Z(ot),k.blending===$s&&k.transparent===!1?y(ci):y(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const ft=k.stencilWrite;a.setTest(ft),ft&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),W(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?z(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Z(k){E!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),E=k)}function V(k){k!==rx?(z(n.CULL_FACE),k!==P&&(k===Kf?n.cullFace(n.BACK):k===ox?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),P=k}function st(k){k!==N&&(U&&n.lineWidth(k),N=k)}function W(k,bt,ot){k?(z(n.POLYGON_OFFSET_FILL),(O!==bt||Q!==ot)&&(n.polygonOffset(bt,ot),O=bt,Q=ot)):ut(n.POLYGON_OFFSET_FILL)}function F(k){k?z(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function x(k){k===void 0&&(k=n.TEXTURE0+j-1),pt!==k&&(n.activeTexture(k),pt=k)}function v(k,bt,ot){ot===void 0&&(pt===null?ot=n.TEXTURE0+j-1:ot=pt);let ft=Mt[ot];ft===void 0&&(ft={type:void 0,texture:void 0},Mt[ot]=ft),(ft.type!==k||ft.texture!==bt)&&(pt!==ot&&(n.activeTexture(ot),pt=ot),n.bindTexture(k,bt||yt[k]),ft.type=k,ft.texture=bt)}function C(){const k=Mt[pt];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function B(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function H(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _t(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ct(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ht(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function rt(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function dt(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ht(k){Qt.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),Qt.copy(k))}function xt(k){at.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),at.copy(k))}function kt(k,bt){let ot=c.get(bt);ot===void 0&&(ot=new WeakMap,c.set(bt,ot));let ft=ot.get(k);ft===void 0&&(ft=n.getUniformBlockIndex(bt,k.name),ot.set(k,ft))}function Vt(k,bt){const ft=c.get(bt).get(k);l.get(bt)!==ft&&(n.uniformBlockBinding(bt,ft,k.__bindingPointIndex),l.set(bt,ft))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},pt=null,Mt={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,A=null,M=null,G=null,I=null,D=new qt(0,0,0),L=0,b=!1,E=null,P=null,N=null,O=null,Q=null,Qt.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:z,disable:ut,bindFramebuffer:lt,drawBuffers:gt,useProgram:Dt,setBlending:y,setMaterial:tt,setFlipSided:Z,setCullFace:V,setLineWidth:st,setPolygonOffset:W,setScissorTest:F,activeTexture:x,bindTexture:v,unbindTexture:C,compressedTexImage2D:B,compressedTexImage3D:H,texImage2D:dt,texImage3D:Et,updateUBOMapping:kt,uniformBlockBinding:Vt,texStorage2D:Ct,texStorage3D:rt,texSubImage2D:q,texSubImage3D:_t,compressedTexSubImage2D:ct,compressedTexSubImage3D:ht,scissor:Ht,viewport:xt,reset:te}}function jh(n,t,e,i){const s=Hb(i);switch(e){case am:return n*t;case cm:return n*t;case um:return n*t*2;case fm:return n*t/s.components*s.byteLength;case Tu:return n*t/s.components*s.byteLength;case hm:return n*t*2/s.components*s.byteLength;case Au:return n*t*2/s.components*s.byteLength;case lm:return n*t*3/s.components*s.byteLength;case xn:return n*t*4/s.components*s.byteLength;case wu:return n*t*4/s.components*s.byteLength;case Zo:case Jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Qo:case ta:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xc:case Mc:return Math.max(n,16)*Math.max(t,8)/4;case vc:case yc:return Math.max(n,8)*Math.max(t,8)/2;case Sc:case Ec:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case bc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Tc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case wc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Rc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Pc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Dc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Lc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Uc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Nc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Oc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Fc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Bc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case ea:case zc:case kc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case dm:case Hc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Vc:case Gc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hb(n){switch(n){case Wn:case sm:return{byteLength:1,components:1};case Zr:case rm:case ui:return{byteLength:2,components:1};case Eu:case bu:return{byteLength:2,components:4};case fs:case Su:case ai:return{byteLength:4,components:1};case om:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Vb(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new zt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,v){return d?new OffscreenCanvas(x,v):va("canvas")}function _(x,v,C){let B=1;const H=F(x);if((H.width>C||H.height>C)&&(B=C/Math.max(H.width,H.height)),B<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const q=Math.floor(B*H.width),_t=Math.floor(B*H.height);f===void 0&&(f=g(q,_t));const ct=v?g(q,_t):f;return ct.width=q,ct.height=_t,ct.getContext("2d").drawImage(x,0,0,q,_t),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+q+"x"+_t+")."),ct}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),x;return x}function m(x){return x.generateMipmaps}function p(x){n.generateMipmap(x)}function S(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(x,v,C,B,H=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let q=v;if(v===n.RED&&(C===n.FLOAT&&(q=n.R32F),C===n.HALF_FLOAT&&(q=n.R16F),C===n.UNSIGNED_BYTE&&(q=n.R8)),v===n.RED_INTEGER&&(C===n.UNSIGNED_BYTE&&(q=n.R8UI),C===n.UNSIGNED_SHORT&&(q=n.R16UI),C===n.UNSIGNED_INT&&(q=n.R32UI),C===n.BYTE&&(q=n.R8I),C===n.SHORT&&(q=n.R16I),C===n.INT&&(q=n.R32I)),v===n.RG&&(C===n.FLOAT&&(q=n.RG32F),C===n.HALF_FLOAT&&(q=n.RG16F),C===n.UNSIGNED_BYTE&&(q=n.RG8)),v===n.RG_INTEGER&&(C===n.UNSIGNED_BYTE&&(q=n.RG8UI),C===n.UNSIGNED_SHORT&&(q=n.RG16UI),C===n.UNSIGNED_INT&&(q=n.RG32UI),C===n.BYTE&&(q=n.RG8I),C===n.SHORT&&(q=n.RG16I),C===n.INT&&(q=n.RG32I)),v===n.RGB_INTEGER&&(C===n.UNSIGNED_BYTE&&(q=n.RGB8UI),C===n.UNSIGNED_SHORT&&(q=n.RGB16UI),C===n.UNSIGNED_INT&&(q=n.RGB32UI),C===n.BYTE&&(q=n.RGB8I),C===n.SHORT&&(q=n.RGB16I),C===n.INT&&(q=n.RGB32I)),v===n.RGBA_INTEGER&&(C===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),C===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),C===n.UNSIGNED_INT&&(q=n.RGBA32UI),C===n.BYTE&&(q=n.RGBA8I),C===n.SHORT&&(q=n.RGBA16I),C===n.INT&&(q=n.RGBA32I)),v===n.RGB&&C===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),v===n.RGBA){const _t=H?Ga:ee.getTransfer(B);C===n.FLOAT&&(q=n.RGBA32F),C===n.HALF_FLOAT&&(q=n.RGBA16F),C===n.UNSIGNED_BYTE&&(q=_t===ce?n.SRGB8_ALPHA8:n.RGBA8),C===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),C===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(x,v){let C;return x?v===null||v===fs||v===ar?C=n.DEPTH24_STENCIL8:v===ai?C=n.DEPTH32F_STENCIL8:v===Zr&&(C=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===fs||v===ar?C=n.DEPTH_COMPONENT24:v===ai?C=n.DEPTH_COMPONENT32F:v===Zr&&(C=n.DEPTH_COMPONENT16),C}function G(x,v){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==pn&&x.minFilter!==Cn?Math.log2(Math.max(v.width,v.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?v.mipmaps.length:1}function I(x){const v=x.target;v.removeEventListener("dispose",I),L(v),v.isVideoTexture&&u.delete(v)}function D(x){const v=x.target;v.removeEventListener("dispose",D),E(v)}function L(x){const v=i.get(x);if(v.__webglInit===void 0)return;const C=x.source,B=h.get(C);if(B){const H=B[v.__cacheKey];H.usedTimes--,H.usedTimes===0&&b(x),Object.keys(B).length===0&&h.delete(C)}i.remove(x)}function b(x){const v=i.get(x);n.deleteTexture(v.__webglTexture);const C=x.source,B=h.get(C);delete B[v.__cacheKey],o.memory.textures--}function E(x){const v=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(v.__webglFramebuffer[B]))for(let H=0;H<v.__webglFramebuffer[B].length;H++)n.deleteFramebuffer(v.__webglFramebuffer[B][H]);else n.deleteFramebuffer(v.__webglFramebuffer[B]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[B])}else{if(Array.isArray(v.__webglFramebuffer))for(let B=0;B<v.__webglFramebuffer.length;B++)n.deleteFramebuffer(v.__webglFramebuffer[B]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let B=0;B<v.__webglColorRenderbuffer.length;B++)v.__webglColorRenderbuffer[B]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[B]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const C=x.textures;for(let B=0,H=C.length;B<H;B++){const q=i.get(C[B]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(C[B])}i.remove(x)}let P=0;function N(){P=0}function O(){const x=P;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),P+=1,x}function Q(x){const v=[];return v.push(x.wrapS),v.push(x.wrapT),v.push(x.wrapR||0),v.push(x.magFilter),v.push(x.minFilter),v.push(x.anisotropy),v.push(x.internalFormat),v.push(x.format),v.push(x.type),v.push(x.generateMipmaps),v.push(x.premultiplyAlpha),v.push(x.flipY),v.push(x.unpackAlignment),v.push(x.colorSpace),v.join()}function j(x,v){const C=i.get(x);if(x.isVideoTexture&&st(x),x.isRenderTargetTexture===!1&&x.version>0&&C.__version!==x.version){const B=x.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(C,x,v);return}}e.bindTexture(n.TEXTURE_2D,C.__webglTexture,n.TEXTURE0+v)}function U(x,v){const C=i.get(x);if(x.version>0&&C.__version!==x.version){at(C,x,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,C.__webglTexture,n.TEXTURE0+v)}function nt(x,v){const C=i.get(x);if(x.version>0&&C.__version!==x.version){at(C,x,v);return}e.bindTexture(n.TEXTURE_3D,C.__webglTexture,n.TEXTURE0+v)}function X(x,v){const C=i.get(x);if(x.version>0&&C.__version!==x.version){mt(C,x,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+v)}const pt={[Kr]:n.REPEAT,[ss]:n.CLAMP_TO_EDGE,[_c]:n.MIRRORED_REPEAT},Mt={[pn]:n.NEAREST,[Cx]:n.NEAREST_MIPMAP_NEAREST,[xo]:n.NEAREST_MIPMAP_LINEAR,[Cn]:n.LINEAR,[ll]:n.LINEAR_MIPMAP_NEAREST,[Ui]:n.LINEAR_MIPMAP_LINEAR},At={[Lx]:n.NEVER,[zx]:n.ALWAYS,[Ux]:n.LESS,[mm]:n.LEQUAL,[Nx]:n.EQUAL,[Bx]:n.GEQUAL,[Ox]:n.GREATER,[Fx]:n.NOTEQUAL};function Ft(x,v){if(v.type===ai&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Cn||v.magFilter===ll||v.magFilter===xo||v.magFilter===Ui||v.minFilter===Cn||v.minFilter===ll||v.minFilter===xo||v.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,pt[v.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,pt[v.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,pt[v.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,Mt[v.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,Mt[v.minFilter]),v.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,At[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===pn||v.minFilter!==xo&&v.minFilter!==Ui||v.type===ai&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const C=t.get("EXT_texture_filter_anisotropic");n.texParameterf(x,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Qt(x,v){let C=!1;x.__webglInit===void 0&&(x.__webglInit=!0,v.addEventListener("dispose",I));const B=v.source;let H=h.get(B);H===void 0&&(H={},h.set(B,H));const q=Q(v);if(q!==x.__cacheKey){H[q]===void 0&&(H[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,C=!0),H[q].usedTimes++;const _t=H[x.__cacheKey];_t!==void 0&&(H[x.__cacheKey].usedTimes--,_t.usedTimes===0&&b(v)),x.__cacheKey=q,x.__webglTexture=H[q].texture}return C}function at(x,v,C){let B=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(B=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(B=n.TEXTURE_3D);const H=Qt(x,v),q=v.source;e.bindTexture(B,x.__webglTexture,n.TEXTURE0+C);const _t=i.get(q);if(q.version!==_t.__version||H===!0){e.activeTexture(n.TEXTURE0+C);const ct=ee.getPrimaries(ee.workingColorSpace),ht=v.colorSpace===Di?null:ee.getPrimaries(v.colorSpace),Ct=v.colorSpace===Di||ct===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let rt=_(v.image,!1,s.maxTextureSize);rt=W(v,rt);const dt=r.convert(v.format,v.colorSpace),Et=r.convert(v.type);let Ht=A(v.internalFormat,dt,Et,v.colorSpace,v.isVideoTexture);Ft(B,v);let xt;const kt=v.mipmaps,Vt=v.isVideoTexture!==!0,te=_t.__version===void 0||H===!0,k=q.dataReady,bt=G(v,rt);if(v.isDepthTexture)Ht=M(v.format===lr,v.type),te&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,Ht,rt.width,rt.height):e.texImage2D(n.TEXTURE_2D,0,Ht,rt.width,rt.height,0,dt,Et,null));else if(v.isDataTexture)if(kt.length>0){Vt&&te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,kt[0].width,kt[0].height);for(let ot=0,ft=kt.length;ot<ft;ot++)xt=kt[ot],Vt?k&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,xt.width,xt.height,dt,Et,xt.data):e.texImage2D(n.TEXTURE_2D,ot,Ht,xt.width,xt.height,0,dt,Et,xt.data);v.generateMipmaps=!1}else Vt?(te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,rt.width,rt.height),k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,rt.width,rt.height,dt,Et,rt.data)):e.texImage2D(n.TEXTURE_2D,0,Ht,rt.width,rt.height,0,dt,Et,rt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Vt&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Ht,kt[0].width,kt[0].height,rt.depth);for(let ot=0,ft=kt.length;ot<ft;ot++)if(xt=kt[ot],v.format!==xn)if(dt!==null)if(Vt){if(k)if(v.layerUpdates.size>0){const St=jh(xt.width,xt.height,v.format,v.type);for(const wt of v.layerUpdates){const Gt=xt.data.subarray(wt*St/xt.data.BYTES_PER_ELEMENT,(wt+1)*St/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,wt,xt.width,xt.height,1,dt,Gt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,xt.width,xt.height,rt.depth,dt,xt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ot,Ht,xt.width,xt.height,rt.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?k&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ot,0,0,0,xt.width,xt.height,rt.depth,dt,Et,xt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ot,Ht,xt.width,xt.height,rt.depth,0,dt,Et,xt.data)}else{Vt&&te&&e.texStorage2D(n.TEXTURE_2D,bt,Ht,kt[0].width,kt[0].height);for(let ot=0,ft=kt.length;ot<ft;ot++)xt=kt[ot],v.format!==xn?dt!==null?Vt?k&&e.compressedTexSubImage2D(n.TEXTURE_2D,ot,0,0,xt.width,xt.height,dt,xt.data):e.compressedTexImage2D(n.TEXTURE_2D,ot,Ht,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?k&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,xt.width,xt.height,dt,Et,xt.data):e.texImage2D(n.TEXTURE_2D,ot,Ht,xt.width,xt.height,0,dt,Et,xt.data)}else if(v.isDataArrayTexture)if(Vt){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,bt,Ht,rt.width,rt.height,rt.depth),k)if(v.layerUpdates.size>0){const ot=jh(rt.width,rt.height,v.format,v.type);for(const ft of v.layerUpdates){const St=rt.data.subarray(ft*ot/rt.data.BYTES_PER_ELEMENT,(ft+1)*ot/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ft,rt.width,rt.height,1,dt,Et,St)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,dt,Et,rt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ht,rt.width,rt.height,rt.depth,0,dt,Et,rt.data);else if(v.isData3DTexture)Vt?(te&&e.texStorage3D(n.TEXTURE_3D,bt,Ht,rt.width,rt.height,rt.depth),k&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,dt,Et,rt.data)):e.texImage3D(n.TEXTURE_3D,0,Ht,rt.width,rt.height,rt.depth,0,dt,Et,rt.data);else if(v.isFramebufferTexture){if(te)if(Vt)e.texStorage2D(n.TEXTURE_2D,bt,Ht,rt.width,rt.height);else{let ot=rt.width,ft=rt.height;for(let St=0;St<bt;St++)e.texImage2D(n.TEXTURE_2D,St,Ht,ot,ft,0,dt,Et,null),ot>>=1,ft>>=1}}else if(kt.length>0){if(Vt&&te){const ot=F(kt[0]);e.texStorage2D(n.TEXTURE_2D,bt,Ht,ot.width,ot.height)}for(let ot=0,ft=kt.length;ot<ft;ot++)xt=kt[ot],Vt?k&&e.texSubImage2D(n.TEXTURE_2D,ot,0,0,dt,Et,xt):e.texImage2D(n.TEXTURE_2D,ot,Ht,dt,Et,xt);v.generateMipmaps=!1}else if(Vt){if(te){const ot=F(rt);e.texStorage2D(n.TEXTURE_2D,bt,Ht,ot.width,ot.height)}k&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt,Et,rt)}else e.texImage2D(n.TEXTURE_2D,0,Ht,dt,Et,rt);m(v)&&p(B),_t.__version=q.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function mt(x,v,C){if(v.image.length!==6)return;const B=Qt(x,v),H=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+C);const q=i.get(H);if(H.version!==q.__version||B===!0){e.activeTexture(n.TEXTURE0+C);const _t=ee.getPrimaries(ee.workingColorSpace),ct=v.colorSpace===Di?null:ee.getPrimaries(v.colorSpace),ht=v.colorSpace===Di||_t===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Ct=v.isCompressedTexture||v.image[0].isCompressedTexture,rt=v.image[0]&&v.image[0].isDataTexture,dt=[];for(let ft=0;ft<6;ft++)!Ct&&!rt?dt[ft]=_(v.image[ft],!0,s.maxCubemapSize):dt[ft]=rt?v.image[ft].image:v.image[ft],dt[ft]=W(v,dt[ft]);const Et=dt[0],Ht=r.convert(v.format,v.colorSpace),xt=r.convert(v.type),kt=A(v.internalFormat,Ht,xt,v.colorSpace),Vt=v.isVideoTexture!==!0,te=q.__version===void 0||B===!0,k=H.dataReady;let bt=G(v,Et);Ft(n.TEXTURE_CUBE_MAP,v);let ot;if(Ct){Vt&&te&&e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,kt,Et.width,Et.height);for(let ft=0;ft<6;ft++){ot=dt[ft].mipmaps;for(let St=0;St<ot.length;St++){const wt=ot[St];v.format!==xn?Ht!==null?Vt?k&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,Ht,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,kt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,0,0,wt.width,wt.height,Ht,xt,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St,kt,wt.width,wt.height,0,Ht,xt,wt.data)}}}else{if(ot=v.mipmaps,Vt&&te){ot.length>0&&bt++;const ft=F(dt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,bt,kt,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(rt){Vt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,dt[ft].width,dt[ft].height,Ht,xt,dt[ft].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,kt,dt[ft].width,dt[ft].height,0,Ht,xt,dt[ft].data);for(let St=0;St<ot.length;St++){const Gt=ot[St].image[ft].image;Vt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Gt.width,Gt.height,Ht,xt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,kt,Gt.width,Gt.height,0,Ht,xt,Gt.data)}}else{Vt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Ht,xt,dt[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,kt,Ht,xt,dt[ft]);for(let St=0;St<ot.length;St++){const wt=ot[St];Vt?k&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,0,0,Ht,xt,wt.image[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,St+1,kt,Ht,xt,wt.image[ft])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),q.__version=H.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function yt(x,v,C,B,H,q){const _t=r.convert(C.format,C.colorSpace),ct=r.convert(C.type),ht=A(C.internalFormat,_t,ct,C.colorSpace),Ct=i.get(v),rt=i.get(C);if(rt.__renderTarget=v,!Ct.__hasExternalTextures){const dt=Math.max(1,v.width>>q),Et=Math.max(1,v.height>>q);H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?e.texImage3D(H,q,ht,dt,Et,v.depth,0,_t,ct,null):e.texImage2D(H,q,ht,dt,Et,0,_t,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,x),V(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,B,H,rt.__webglTexture,0,Z(v)):(H===n.TEXTURE_2D||H>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,B,H,rt.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function z(x,v,C){if(n.bindRenderbuffer(n.RENDERBUFFER,x),v.depthBuffer){const B=v.depthTexture,H=B&&B.isDepthTexture?B.type:null,q=M(v.stencilBuffer,H),_t=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=Z(v);V(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,q,v.width,v.height):C?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,q,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_t,n.RENDERBUFFER,x)}else{const B=v.textures;for(let H=0;H<B.length;H++){const q=B[H],_t=r.convert(q.format,q.colorSpace),ct=r.convert(q.type),ht=A(q.internalFormat,_t,ct,q.colorSpace),Ct=Z(v);C&&V(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,ht,v.width,v.height):V(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ct,ht,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ht,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(x,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,x),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const B=i.get(v.depthTexture);B.__renderTarget=v,(!B.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const H=B.__webglTexture,q=Z(v);if(v.depthTexture.format===Zs)V(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,H,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,H,0);else if(v.depthTexture.format===lr)V(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,H,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,H,0);else throw new Error("Unknown depthTexture format")}function lt(x){const v=i.get(x),C=x.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==x.depthTexture){const B=x.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),B){const H=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,B.removeEventListener("dispose",H)};B.addEventListener("dispose",H),v.__depthDisposeCallback=H}v.__boundDepthTexture=B}if(x.depthTexture&&!v.__autoAllocateDepthBuffer){if(C)throw new Error("target.depthTexture not supported in Cube render targets");ut(v.__webglFramebuffer,x)}else if(C){v.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[B]),v.__webglDepthbuffer[B]===void 0)v.__webglDepthbuffer[B]=n.createRenderbuffer(),z(v.__webglDepthbuffer[B],x,!1);else{const H=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[B];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),z(v.__webglDepthbuffer,x,!1);else{const B=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,H),n.framebufferRenderbuffer(n.FRAMEBUFFER,B,n.RENDERBUFFER,H)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(x,v,C){const B=i.get(x);v!==void 0&&yt(B.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),C!==void 0&&lt(x)}function Dt(x){const v=x.texture,C=i.get(x),B=i.get(v);x.addEventListener("dispose",D);const H=x.textures,q=x.isWebGLCubeRenderTarget===!0,_t=H.length>1;if(_t||(B.__webglTexture===void 0&&(B.__webglTexture=n.createTexture()),B.__version=v.version,o.memory.textures++),q){C.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0){C.__webglFramebuffer[ct]=[];for(let ht=0;ht<v.mipmaps.length;ht++)C.__webglFramebuffer[ct][ht]=n.createFramebuffer()}else C.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){C.__webglFramebuffer=[];for(let ct=0;ct<v.mipmaps.length;ct++)C.__webglFramebuffer[ct]=n.createFramebuffer()}else C.__webglFramebuffer=n.createFramebuffer();if(_t)for(let ct=0,ht=H.length;ct<ht;ct++){const Ct=i.get(H[ct]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=n.createTexture(),o.memory.textures++)}if(x.samples>0&&V(x)===!1){C.__webglMultisampledFramebuffer=n.createFramebuffer(),C.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let ct=0;ct<H.length;ct++){const ht=H[ct];C.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,C.__webglColorRenderbuffer[ct]);const Ct=r.convert(ht.format,ht.colorSpace),rt=r.convert(ht.type),dt=A(ht.internalFormat,Ct,rt,ht.colorSpace,x.isXRRenderTarget===!0),Et=Z(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,dt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,C.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(C.__webglDepthRenderbuffer=n.createRenderbuffer(),z(C.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture),Ft(n.TEXTURE_CUBE_MAP,v);for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0)for(let ht=0;ht<v.mipmaps.length;ht++)yt(C.__webglFramebuffer[ct][ht],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,ht);else yt(C.__webglFramebuffer[ct],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(v)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(_t){for(let ct=0,ht=H.length;ct<ht;ct++){const Ct=H[ct],rt=i.get(Ct);e.bindTexture(n.TEXTURE_2D,rt.__webglTexture),Ft(n.TEXTURE_2D,Ct),yt(C.__webglFramebuffer,x,Ct,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,0),m(Ct)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ct=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,B.__webglTexture),Ft(ct,v),v.mipmaps&&v.mipmaps.length>0)for(let ht=0;ht<v.mipmaps.length;ht++)yt(C.__webglFramebuffer[ht],x,v,n.COLOR_ATTACHMENT0,ct,ht);else yt(C.__webglFramebuffer,x,v,n.COLOR_ATTACHMENT0,ct,0);m(v)&&p(ct),e.unbindTexture()}x.depthBuffer&&lt(x)}function R(x){const v=x.textures;for(let C=0,B=v.length;C<B;C++){const H=v[C];if(m(H)){const q=S(x),_t=i.get(H).__webglTexture;e.bindTexture(q,_t),p(q),e.unbindTexture()}}}const w=[],y=[];function tt(x){if(x.samples>0){if(V(x)===!1){const v=x.textures,C=x.width,B=x.height;let H=n.COLOR_BUFFER_BIT;const q=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_t=i.get(x),ct=v.length>1;if(ct)for(let ht=0;ht<v.length;ht++)e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let ht=0;ht<v.length;ht++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(H|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(H|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_t.__webglColorRenderbuffer[ht]);const Ct=i.get(v[ht]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ct,0)}n.blitFramebuffer(0,0,C,B,0,0,C,B,H,n.NEAREST),l===!0&&(w.length=0,y.length=0,w.push(n.COLOR_ATTACHMENT0+ht),x.depthBuffer&&x.resolveDepthBuffer===!1&&(w.push(q),y.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,w))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let ht=0;ht<v.length;ht++){e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,_t.__webglColorRenderbuffer[ht]);const Ct=i.get(v[ht]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,_t.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,Ct,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const v=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Z(x){return Math.min(s.maxSamples,x.samples)}function V(x){const v=i.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function st(x){const v=o.render.frame;u.get(x)!==v&&(u.set(x,v),x.update())}function W(x,v){const C=x.colorSpace,B=x.format,H=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||C!==fr&&C!==Di&&(ee.getTransfer(C)===ce?(B!==xn||H!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",C)),v}function F(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.setTexture2D=j,this.setTexture2DArray=U,this.setTexture3D=nt,this.setTextureCube=X,this.rebindTextures=gt,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=R,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=V}function Gb(n,t){function e(i,s=Di){let r;const o=ee.getTransfer(s);if(i===Wn)return n.UNSIGNED_BYTE;if(i===Eu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===bu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===om)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===sm)return n.BYTE;if(i===rm)return n.SHORT;if(i===Zr)return n.UNSIGNED_SHORT;if(i===Su)return n.INT;if(i===fs)return n.UNSIGNED_INT;if(i===ai)return n.FLOAT;if(i===ui)return n.HALF_FLOAT;if(i===am)return n.ALPHA;if(i===lm)return n.RGB;if(i===xn)return n.RGBA;if(i===cm)return n.LUMINANCE;if(i===um)return n.LUMINANCE_ALPHA;if(i===Zs)return n.DEPTH_COMPONENT;if(i===lr)return n.DEPTH_STENCIL;if(i===fm)return n.RED;if(i===Tu)return n.RED_INTEGER;if(i===hm)return n.RG;if(i===Au)return n.RG_INTEGER;if(i===wu)return n.RGBA_INTEGER;if(i===Zo||i===Jo||i===Qo||i===ta)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Zo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Zo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Jo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Qo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vc||i===xc||i===yc||i===Mc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===yc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Sc||i===Ec||i===bc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Sc||i===Ec)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===bc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Tc||i===Ac||i===wc||i===Rc||i===Cc||i===Pc||i===Dc||i===Ic||i===Lc||i===Uc||i===Nc||i===Oc||i===Fc||i===Bc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Tc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ac)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Rc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Cc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Dc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ic)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Lc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Nc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Oc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Fc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Bc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ea||i===zc||i===kc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ea)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===kc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===dm||i===Hc||i===Vc||i===Gc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ea)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Hc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ar?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Wb extends vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vs extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xb={type:"move"};class Ol{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Vs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const jb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qb=`
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

}`;class Yb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ke({vertexShader:jb,fragmentShader:qb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Re(new Wa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $b extends gs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new Yb,m=e.getContextAttributes();let p=null,S=null;const A=[],M=[],G=new zt;let I=null;const D=new vn;D.viewport=new Me;const L=new vn;L.viewport=new Me;const b=[D,L],E=new Wb;let P=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let mt=A[at];return mt===void 0&&(mt=new Ol,A[at]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(at){let mt=A[at];return mt===void 0&&(mt=new Ol,A[at]=mt),mt.getGripSpace()},this.getHand=function(at){let mt=A[at];return mt===void 0&&(mt=new Ol,A[at]=mt),mt.getHandSpace()};function O(at){const mt=M.indexOf(at.inputSource);if(mt===-1)return;const yt=A[mt];yt!==void 0&&(yt.update(at.inputSource,at.frame,c||o),yt.dispatchEvent({type:at.type,data:at.inputSource}))}function Q(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",Q),s.removeEventListener("inputsourceschange",j);for(let at=0;at<A.length;at++){const mt=M[at];mt!==null&&(M[at]=null,A[at].disconnect(mt))}P=null,N=null,_.reset(),t.setRenderTarget(p),d=null,h=null,f=null,s=null,S=null,Qt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(G.width,G.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){r=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){a=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(at){c=at},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(at){if(s=at,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",Q),s.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(G),s.renderState.layers===void 0){const mt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Dn(d.framebufferWidth,d.framebufferHeight,{format:xn,type:Wn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let mt=null,yt=null,z=null;m.depth&&(z=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=m.stencil?lr:Zs,yt=m.stencil?ar:fs);const ut={colorFormat:e.RGBA8,depthFormat:z,scaleFactor:r};f=new XRWebGLBinding(s,e),h=f.createProjectionLayer(ut),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new Dn(h.textureWidth,h.textureHeight,{format:xn,type:Wn,depthTexture:new Am(h.textureWidth,h.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Qt.setContext(s),Qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(at){for(let mt=0;mt<at.removed.length;mt++){const yt=at.removed[mt],z=M.indexOf(yt);z>=0&&(M[z]=null,A[z].disconnect(yt))}for(let mt=0;mt<at.added.length;mt++){const yt=at.added[mt];let z=M.indexOf(yt);if(z===-1){for(let lt=0;lt<A.length;lt++)if(lt>=M.length){M.push(yt),z=lt;break}else if(M[lt]===null){M[lt]=yt,z=lt;break}if(z===-1)break}const ut=A[z];ut&&ut.connect(yt)}}const U=new $,nt=new $;function X(at,mt,yt){U.setFromMatrixPosition(mt.matrixWorld),nt.setFromMatrixPosition(yt.matrixWorld);const z=U.distanceTo(nt),ut=mt.projectionMatrix.elements,lt=yt.projectionMatrix.elements,gt=ut[14]/(ut[10]-1),Dt=ut[14]/(ut[10]+1),R=(ut[9]+1)/ut[5],w=(ut[9]-1)/ut[5],y=(ut[8]-1)/ut[0],tt=(lt[8]+1)/lt[0],Z=gt*y,V=gt*tt,st=z/(-y+tt),W=st*-y;if(mt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(W),at.translateZ(st),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),ut[10]===-1)at.projectionMatrix.copy(mt.projectionMatrix),at.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const F=gt+st,x=Dt+st,v=Z-W,C=V+(z-W),B=R*Dt/x*F,H=w*Dt/x*F;at.projectionMatrix.makePerspective(v,C,B,H,F,x),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function pt(at,mt){mt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(mt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(s===null)return;let mt=at.near,yt=at.far;_.texture!==null&&(_.depthNear>0&&(mt=_.depthNear),_.depthFar>0&&(yt=_.depthFar)),E.near=L.near=D.near=mt,E.far=L.far=D.far=yt,(P!==E.near||N!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),P=E.near,N=E.far),D.layers.mask=at.layers.mask|2,L.layers.mask=at.layers.mask|4,E.layers.mask=D.layers.mask|L.layers.mask;const z=at.parent,ut=E.cameras;pt(E,z);for(let lt=0;lt<ut.length;lt++)pt(ut[lt],z);ut.length===2?X(E,D,L):E.projectionMatrix.copy(D.projectionMatrix),Mt(at,E,z)};function Mt(at,mt,yt){yt===null?at.matrix.copy(mt.matrixWorld):(at.matrix.copy(yt.matrixWorld),at.matrix.invert(),at.matrix.multiply(mt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(mt.projectionMatrix),at.projectionMatrixInverse.copy(mt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=Wc*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(at){l=at,h!==null&&(h.fixedFoveation=at),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=at)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let At=null;function Ft(at,mt){if(u=mt.getViewerPose(c||o),g=mt,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let z=!1;yt.length!==E.cameras.length&&(E.cameras.length=0,z=!0);for(let lt=0;lt<yt.length;lt++){const gt=yt[lt];let Dt=null;if(d!==null)Dt=d.getViewport(gt);else{const w=f.getViewSubImage(h,gt);Dt=w.viewport,lt===0&&(t.setRenderTargetTextures(S,w.colorTexture,h.ignoreDepthValues?void 0:w.depthStencilTexture),t.setRenderTarget(S))}let R=b[lt];R===void 0&&(R=new vn,R.layers.enable(lt),R.viewport=new Me,b[lt]=R),R.matrix.fromArray(gt.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.projectionMatrix.fromArray(gt.projectionMatrix),R.projectionMatrixInverse.copy(R.projectionMatrix).invert(),R.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),lt===0&&(E.matrix.copy(R.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),z===!0&&E.cameras.push(R)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const lt=f.getDepthInformation(yt[0]);lt&&lt.isValid&&lt.texture&&_.init(t,lt,s.renderState)}}for(let yt=0;yt<A.length;yt++){const z=M[yt],ut=A[yt];z!==null&&ut!==void 0&&ut.update(z,mt,c||o)}At&&At(at,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),g=null}const Qt=new Tm;Qt.setAnimationLoop(Ft),this.setAnimationLoop=function(at){At=at},this.dispose=function(){}}}const Zi=new Xn,Kb=new de;function Zb(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Sm(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,A,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),A=S.envMap,M=S.envMapRotation;A&&(m.envMap.value=A,Zi.copy(M),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),m.envMapRotation.value.setFromMatrix4(Kb.makeRotationFromEuler(Zi)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=A*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Jb(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,A){const M=A.program;i.uniformBlockBinding(S,M)}function c(S,A){let M=s[S.id];M===void 0&&(g(S),M=u(S),s[S.id]=M,S.addEventListener("dispose",m));const G=A.program;i.updateUBOMapping(S,G);const I=t.render.frame;r[S.id]!==I&&(h(S),r[S.id]=I)}function u(S){const A=f();S.__bindingPointIndex=A;const M=n.createBuffer(),G=S.__size,I=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,G,I),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,M),M}function f(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const A=s[S.id],M=S.uniforms,G=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let I=0,D=M.length;I<D;I++){const L=Array.isArray(M[I])?M[I]:[M[I]];for(let b=0,E=L.length;b<E;b++){const P=L[b];if(d(P,I,b,G)===!0){const N=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let Q=0;for(let j=0;j<O.length;j++){const U=O[j],nt=_(U);typeof U=="number"||typeof U=="boolean"?(P.__data[0]=U,n.bufferSubData(n.UNIFORM_BUFFER,N+Q,P.__data)):U.isMatrix3?(P.__data[0]=U.elements[0],P.__data[1]=U.elements[1],P.__data[2]=U.elements[2],P.__data[3]=0,P.__data[4]=U.elements[3],P.__data[5]=U.elements[4],P.__data[6]=U.elements[5],P.__data[7]=0,P.__data[8]=U.elements[6],P.__data[9]=U.elements[7],P.__data[10]=U.elements[8],P.__data[11]=0):(U.toArray(P.__data,Q),Q+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,A,M,G){const I=S.value,D=A+"_"+M;if(G[D]===void 0)return typeof I=="number"||typeof I=="boolean"?G[D]=I:G[D]=I.clone(),!0;{const L=G[D];if(typeof I=="number"||typeof I=="boolean"){if(L!==I)return G[D]=I,!0}else if(L.equals(I)===!1)return L.copy(I),!0}return!1}function g(S){const A=S.uniforms;let M=0;const G=16;for(let D=0,L=A.length;D<L;D++){const b=Array.isArray(A[D])?A[D]:[A[D]];for(let E=0,P=b.length;E<P;E++){const N=b[E],O=Array.isArray(N.value)?N.value:[N.value];for(let Q=0,j=O.length;Q<j;Q++){const U=O[Q],nt=_(U),X=M%G,pt=X%nt.boundary,Mt=X+pt;M+=pt,Mt!==0&&G-Mt<nt.storage&&(M+=G-Mt),N.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=nt.storage}}}const I=M%G;return I>0&&(M+=G-I),S.__size=M,S.__cache={},this}function _(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),A}function m(S){const A=S.target;A.removeEventListener("dispose",m);const M=o.indexOf(A.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Qb{constructor(t={}){const{canvas:e=Vx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rn,this.toneMapping=Oi,this.toneMappingExposure=1;const M=this;let G=!1,I=0,D=0,L=null,b=-1,E=null;const P=new Me,N=new Me;let O=null;const Q=new qt(0);let j=0,U=e.width,nt=e.height,X=1,pt=null,Mt=null;const At=new Me(0,0,U,nt),Ft=new Me(0,0,U,nt);let Qt=!1;const at=new Cu;let mt=!1,yt=!1;const z=new de,ut=new de,lt=new $,gt=new Me,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let R=!1;function w(){return L===null?X:1}let y=i;function tt(T,Y){return e.getContext(T,Y)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${yu}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",wt,!1),y===null){const Y="webgl2";if(y=tt(Y,T),y===null)throw tt(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Z,V,st,W,F,x,v,C,B,H,q,_t,ct,ht,Ct,rt,dt,Et,Ht,xt,kt,Vt,te,k;function bt(){Z=new sE(y),Z.init(),Vt=new Gb(y,Z),V=new JS(y,Z,t,Vt),st=new kb(y,Z),V.reverseDepthBuffer&&h&&st.buffers.depth.setReversed(!0),W=new aE(y),F=new Tb,x=new Vb(y,Z,st,F,V,Vt,W),v=new tE(M),C=new iE(M),B=new py(y),te=new KS(y,B),H=new rE(y,B,W,te),q=new cE(y,H,B,W),Ht=new lE(y,V,x),rt=new QS(F),_t=new bb(M,v,C,Z,V,te,rt),ct=new Zb(M,F),ht=new wb,Ct=new Lb(Z),Et=new $S(M,v,C,st,q,d,l),dt=new Bb(M,q,V),k=new Jb(y,W,V,st),xt=new ZS(y,Z,W),kt=new oE(y,Z,W),W.programs=_t.programs,M.capabilities=V,M.extensions=Z,M.properties=F,M.renderLists=ht,M.shadowMap=dt,M.state=st,M.info=W}bt();const ot=new $b(M,y);this.xr=ot,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const T=Z.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Z.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(U,nt,!1))},this.getSize=function(T){return T.set(U,nt)},this.setSize=function(T,Y,et=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=T,nt=Y,e.width=Math.floor(T*X),e.height=Math.floor(Y*X),et===!0&&(e.style.width=T+"px",e.style.height=Y+"px"),this.setViewport(0,0,T,Y)},this.getDrawingBufferSize=function(T){return T.set(U*X,nt*X).floor()},this.setDrawingBufferSize=function(T,Y,et){U=T,nt=Y,X=et,e.width=Math.floor(T*et),e.height=Math.floor(Y*et),this.setViewport(0,0,T,Y)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(At)},this.setViewport=function(T,Y,et,it){T.isVector4?At.set(T.x,T.y,T.z,T.w):At.set(T,Y,et,it),st.viewport(P.copy(At).multiplyScalar(X).round())},this.getScissor=function(T){return T.copy(Ft)},this.setScissor=function(T,Y,et,it){T.isVector4?Ft.set(T.x,T.y,T.z,T.w):Ft.set(T,Y,et,it),st.scissor(N.copy(Ft).multiplyScalar(X).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(T){st.setScissorTest(Qt=T)},this.setOpaqueSort=function(T){pt=T},this.setTransparentSort=function(T){Mt=T},this.getClearColor=function(T){return T.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(T=!0,Y=!0,et=!0){let it=0;if(T){let K=!1;if(L!==null){const vt=L.texture.format;K=vt===wu||vt===Au||vt===Tu}if(K){const vt=L.texture.type,Rt=vt===Wn||vt===fs||vt===Zr||vt===ar||vt===Eu||vt===bu,Ut=Et.getClearColor(),Nt=Et.getClearAlpha(),jt=Ut.r,$t=Ut.g,Ot=Ut.b;Rt?(g[0]=jt,g[1]=$t,g[2]=Ot,g[3]=Nt,y.clearBufferuiv(y.COLOR,0,g)):(_[0]=jt,_[1]=$t,_[2]=Ot,_[3]=Nt,y.clearBufferiv(y.COLOR,0,_))}else it|=y.COLOR_BUFFER_BIT}Y&&(it|=y.DEPTH_BUFFER_BIT),et&&(it|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),ht.dispose(),Ct.dispose(),F.dispose(),v.dispose(),C.dispose(),q.dispose(),te.dispose(),k.dispose(),_t.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",co),ot.removeEventListener("sessionend",uo),jn.stop()};function ft(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const T=W.autoReset,Y=dt.enabled,et=dt.autoUpdate,it=dt.needsUpdate,K=dt.type;bt(),W.autoReset=T,dt.enabled=Y,dt.autoUpdate=et,dt.needsUpdate=it,dt.type=K}function wt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Gt(T){const Y=T.target;Y.removeEventListener("dispose",Gt),ve(Y)}function ve(T){Ie(T),F.remove(T)}function Ie(T){const Y=F.get(T).programs;Y!==void 0&&(Y.forEach(function(et){_t.releaseProgram(et)}),T.isShaderMaterial&&_t.releaseShaderCache(T))}this.renderBufferDirect=function(T,Y,et,it,K,vt){Y===null&&(Y=Dt);const Rt=K.isMesh&&K.matrixWorld.determinant()<0,Ut=Bm(T,Y,et,it,K);st.setMaterial(it,Rt);let Nt=et.index,jt=1;if(it.wireframe===!0){if(Nt=H.getWireframeAttribute(et),Nt===void 0)return;jt=2}const $t=et.drawRange,Ot=et.attributes.position;let ne=$t.start*jt,pe=($t.start+$t.count)*jt;vt!==null&&(ne=Math.max(ne,vt.start*jt),pe=Math.min(pe,(vt.start+vt.count)*jt)),Nt!==null?(ne=Math.max(ne,0),pe=Math.min(pe,Nt.count)):Ot!=null&&(ne=Math.max(ne,0),pe=Math.min(pe,Ot.count));const ge=pe-ne;if(ge<0||ge===1/0)return;te.setup(K,it,Ut,et,Nt);let en,se=xt;if(Nt!==null&&(en=B.get(Nt),se=kt,se.setIndex(en)),K.isMesh)it.wireframe===!0?(st.setLineWidth(it.wireframeLinewidth*w()),se.setMode(y.LINES)):se.setMode(y.TRIANGLES);else if(K.isLine){let Bt=it.linewidth;Bt===void 0&&(Bt=1),st.setLineWidth(Bt*w()),K.isLineSegments?se.setMode(y.LINES):K.isLineLoop?se.setMode(y.LINE_LOOP):se.setMode(y.LINE_STRIP)}else K.isPoints?se.setMode(y.POINTS):K.isSprite&&se.setMode(y.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)se.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))se.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Bt=K._multiDrawStarts,Yn=K._multiDrawCounts,re=K._multiDrawCount,En=Nt?B.get(Nt).bytesPerElement:1,xs=F.get(it).currentProgram.getUniforms();for(let ln=0;ln<re;ln++)xs.setValue(y,"_gl_DrawID",ln),se.render(Bt[ln]/En,Yn[ln])}else if(K.isInstancedMesh)se.renderInstances(ne,ge,K.count);else if(et.isInstancedBufferGeometry){const Bt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Yn=Math.min(et.instanceCount,Bt);se.renderInstances(ne,ge,Yn)}else se.render(ne,ge)};function ie(T,Y,et){T.transparent===!0&&T.side===wn&&T.forceSinglePass===!1?(T.side=an,T.needsUpdate=!0,po(T,Y,et),T.side=Hi,T.needsUpdate=!0,po(T,Y,et),T.side=wn):po(T,Y,et)}this.compile=function(T,Y,et=null){et===null&&(et=T),p=Ct.get(et),p.init(Y),A.push(p),et.traverseVisible(function(K){K.isLight&&K.layers.test(Y.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),T!==et&&T.traverseVisible(function(K){K.isLight&&K.layers.test(Y.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights();const it=new Set;return T.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const vt=K.material;if(vt)if(Array.isArray(vt))for(let Rt=0;Rt<vt.length;Rt++){const Ut=vt[Rt];ie(Ut,et,K),it.add(Ut)}else ie(vt,et,K),it.add(vt)}),A.pop(),p=null,it},this.compileAsync=function(T,Y,et=null){const it=this.compile(T,Y,et);return new Promise(K=>{function vt(){if(it.forEach(function(Rt){F.get(Rt).currentProgram.isReady()&&it.delete(Rt)}),it.size===0){K(T);return}setTimeout(vt,10)}Z.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let Ge=null;function tn(T){Ge&&Ge(T)}function co(){jn.stop()}function uo(){jn.start()}const jn=new Tm;jn.setAnimationLoop(tn),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(T){Ge=T,ot.setAnimationLoop(T),T===null?jn.stop():jn.start()},ot.addEventListener("sessionstart",co),ot.addEventListener("sessionend",uo),this.render=function(T,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(Y),Y=ot.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,Y,L),p=Ct.get(T,A.length),p.init(Y),A.push(p),ut.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),at.setFromProjectionMatrix(ut),yt=this.localClippingEnabled,mt=rt.init(this.clippingPlanes,yt),m=ht.get(T,S.length),m.init(),S.push(m),ot.enabled===!0&&ot.isPresenting===!0){const vt=M.xr.getDepthSensingMesh();vt!==null&&qn(vt,Y,-1/0,M.sortObjects)}qn(T,Y,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(pt,Mt),R=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,R&&Et.addToRenderList(m,T),this.info.render.frame++,mt===!0&&rt.beginShadows();const et=p.state.shadowsArray;dt.render(et,T,Y),mt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const it=m.opaque,K=m.transmissive;if(p.setupLights(),Y.isArrayCamera){const vt=Y.cameras;if(K.length>0)for(let Rt=0,Ut=vt.length;Rt<Ut;Rt++){const Nt=vt[Rt];ho(it,K,T,Nt)}R&&Et.render(T);for(let Rt=0,Ut=vt.length;Rt<Ut;Rt++){const Nt=vt[Rt];fo(m,T,Nt,Nt.viewport)}}else K.length>0&&ho(it,K,T,Y),R&&Et.render(T),fo(m,T,Y);L!==null&&(x.updateMultisampleRenderTarget(L),x.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(M,T,Y),te.resetDefaultState(),b=-1,E=null,A.pop(),A.length>0?(p=A[A.length-1],mt===!0&&rt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function qn(T,Y,et,it){if(T.visible===!1)return;if(T.layers.test(Y.layers)){if(T.isGroup)et=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(Y);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||at.intersectsSprite(T)){it&&gt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ut);const Rt=q.update(T),Ut=T.material;Ut.visible&&m.push(T,Rt,Ut,et,gt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||at.intersectsObject(T))){const Rt=q.update(T),Ut=T.material;if(it&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),gt.copy(T.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),gt.copy(Rt.boundingSphere.center)),gt.applyMatrix4(T.matrixWorld).applyMatrix4(ut)),Array.isArray(Ut)){const Nt=Rt.groups;for(let jt=0,$t=Nt.length;jt<$t;jt++){const Ot=Nt[jt],ne=Ut[Ot.materialIndex];ne&&ne.visible&&m.push(T,Rt,ne,et,gt.z,Ot)}}else Ut.visible&&m.push(T,Rt,Ut,et,gt.z,null)}}const vt=T.children;for(let Rt=0,Ut=vt.length;Rt<Ut;Rt++)qn(vt[Rt],Y,et,it)}function fo(T,Y,et,it){const K=T.opaque,vt=T.transmissive,Rt=T.transparent;p.setupLightsView(et),mt===!0&&rt.setGlobalState(M.clippingPlanes,et),it&&st.viewport(P.copy(it)),K.length>0&&vs(K,Y,et),vt.length>0&&vs(vt,Y,et),Rt.length>0&&vs(Rt,Y,et),st.buffers.depth.setTest(!0),st.buffers.depth.setMask(!0),st.buffers.color.setMask(!0),st.setPolygonOffset(!1)}function ho(T,Y,et,it){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[it.id]===void 0&&(p.state.transmissionRenderTarget[it.id]=new Dn(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?ui:Wn,minFilter:Ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const vt=p.state.transmissionRenderTarget[it.id],Rt=it.viewport||P;vt.setSize(Rt.z,Rt.w);const Ut=M.getRenderTarget();M.setRenderTarget(vt),M.getClearColor(Q),j=M.getClearAlpha(),j<1&&M.setClearColor(16777215,.5),M.clear(),R&&Et.render(et);const Nt=M.toneMapping;M.toneMapping=Oi;const jt=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),p.setupLightsView(it),mt===!0&&rt.setGlobalState(M.clippingPlanes,it),vs(T,et,it),x.updateMultisampleRenderTarget(vt),x.updateRenderTargetMipmap(vt),Z.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Ot=0,ne=Y.length;Ot<ne;Ot++){const pe=Y[Ot],ge=pe.object,en=pe.geometry,se=pe.material,Bt=pe.group;if(se.side===wn&&ge.layers.test(it.layers)){const Yn=se.side;se.side=an,se.needsUpdate=!0,zu(ge,et,it,en,se,Bt),se.side=Yn,se.needsUpdate=!0,$t=!0}}$t===!0&&(x.updateMultisampleRenderTarget(vt),x.updateRenderTargetMipmap(vt))}M.setRenderTarget(Ut),M.setClearColor(Q,j),jt!==void 0&&(it.viewport=jt),M.toneMapping=Nt}function vs(T,Y,et){const it=Y.isScene===!0?Y.overrideMaterial:null;for(let K=0,vt=T.length;K<vt;K++){const Rt=T[K],Ut=Rt.object,Nt=Rt.geometry,jt=it===null?Rt.material:it,$t=Rt.group;Ut.layers.test(et.layers)&&zu(Ut,Y,et,Nt,jt,$t)}}function zu(T,Y,et,it,K,vt){T.onBeforeRender(M,Y,et,it,K,vt),T.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),K.onBeforeRender(M,Y,et,it,T,vt),K.transparent===!0&&K.side===wn&&K.forceSinglePass===!1?(K.side=an,K.needsUpdate=!0,M.renderBufferDirect(et,Y,it,K,T,vt),K.side=Hi,K.needsUpdate=!0,M.renderBufferDirect(et,Y,it,K,T,vt),K.side=wn):M.renderBufferDirect(et,Y,it,K,T,vt),T.onAfterRender(M,Y,et,it,K,vt)}function po(T,Y,et){Y.isScene!==!0&&(Y=Dt);const it=F.get(T),K=p.state.lights,vt=p.state.shadowsArray,Rt=K.state.version,Ut=_t.getParameters(T,K.state,vt,Y,et),Nt=_t.getProgramCacheKey(Ut);let jt=it.programs;it.environment=T.isMeshStandardMaterial?Y.environment:null,it.fog=Y.fog,it.envMap=(T.isMeshStandardMaterial?C:v).get(T.envMap||it.environment),it.envMapRotation=it.environment!==null&&T.envMap===null?Y.environmentRotation:T.envMapRotation,jt===void 0&&(T.addEventListener("dispose",Gt),jt=new Map,it.programs=jt);let $t=jt.get(Nt);if($t!==void 0){if(it.currentProgram===$t&&it.lightsStateVersion===Rt)return Hu(T,Ut),$t}else Ut.uniforms=_t.getUniforms(T),T.onBeforeCompile(Ut,M),$t=_t.acquireProgram(Ut,Nt),jt.set(Nt,$t),it.uniforms=Ut.uniforms;const Ot=it.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ot.clippingPlanes=rt.uniform),Hu(T,Ut),it.needsLights=km(T),it.lightsStateVersion=Rt,it.needsLights&&(Ot.ambientLightColor.value=K.state.ambient,Ot.lightProbe.value=K.state.probe,Ot.directionalLights.value=K.state.directional,Ot.directionalLightShadows.value=K.state.directionalShadow,Ot.spotLights.value=K.state.spot,Ot.spotLightShadows.value=K.state.spotShadow,Ot.rectAreaLights.value=K.state.rectArea,Ot.ltc_1.value=K.state.rectAreaLTC1,Ot.ltc_2.value=K.state.rectAreaLTC2,Ot.pointLights.value=K.state.point,Ot.pointLightShadows.value=K.state.pointShadow,Ot.hemisphereLights.value=K.state.hemi,Ot.directionalShadowMap.value=K.state.directionalShadowMap,Ot.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ot.spotShadowMap.value=K.state.spotShadowMap,Ot.spotLightMatrix.value=K.state.spotLightMatrix,Ot.spotLightMap.value=K.state.spotLightMap,Ot.pointShadowMap.value=K.state.pointShadowMap,Ot.pointShadowMatrix.value=K.state.pointShadowMatrix),it.currentProgram=$t,it.uniformsList=null,$t}function ku(T){if(T.uniformsList===null){const Y=T.currentProgram.getUniforms();T.uniformsList=ia.seqWithValue(Y.seq,T.uniforms)}return T.uniformsList}function Hu(T,Y){const et=F.get(T);et.outputColorSpace=Y.outputColorSpace,et.batching=Y.batching,et.batchingColor=Y.batchingColor,et.instancing=Y.instancing,et.instancingColor=Y.instancingColor,et.instancingMorph=Y.instancingMorph,et.skinning=Y.skinning,et.morphTargets=Y.morphTargets,et.morphNormals=Y.morphNormals,et.morphColors=Y.morphColors,et.morphTargetsCount=Y.morphTargetsCount,et.numClippingPlanes=Y.numClippingPlanes,et.numIntersection=Y.numClipIntersection,et.vertexAlphas=Y.vertexAlphas,et.vertexTangents=Y.vertexTangents,et.toneMapping=Y.toneMapping}function Bm(T,Y,et,it,K){Y.isScene!==!0&&(Y=Dt),x.resetTextureUnits();const vt=Y.fog,Rt=it.isMeshStandardMaterial?Y.environment:null,Ut=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:fr,Nt=(it.isMeshStandardMaterial?C:v).get(it.envMap||Rt),jt=it.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,$t=!!et.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),Ot=!!et.morphAttributes.position,ne=!!et.morphAttributes.normal,pe=!!et.morphAttributes.color;let ge=Oi;it.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ge=M.toneMapping);const en=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,se=en!==void 0?en.length:0,Bt=F.get(it),Yn=p.state.lights;if(mt===!0&&(yt===!0||T!==E)){const mn=T===E&&it.id===b;rt.setState(it,T,mn)}let re=!1;it.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Yn.state.version||Bt.outputColorSpace!==Ut||K.isBatchedMesh&&Bt.batching===!1||!K.isBatchedMesh&&Bt.batching===!0||K.isBatchedMesh&&Bt.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Bt.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Bt.instancing===!1||!K.isInstancedMesh&&Bt.instancing===!0||K.isSkinnedMesh&&Bt.skinning===!1||!K.isSkinnedMesh&&Bt.skinning===!0||K.isInstancedMesh&&Bt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Bt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Bt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Bt.instancingMorph===!1&&K.morphTexture!==null||Bt.envMap!==Nt||it.fog===!0&&Bt.fog!==vt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==rt.numPlanes||Bt.numIntersection!==rt.numIntersection)||Bt.vertexAlphas!==jt||Bt.vertexTangents!==$t||Bt.morphTargets!==Ot||Bt.morphNormals!==ne||Bt.morphColors!==pe||Bt.toneMapping!==ge||Bt.morphTargetsCount!==se)&&(re=!0):(re=!0,Bt.__version=it.version);let En=Bt.currentProgram;re===!0&&(En=po(it,Y,K));let xs=!1,ln=!1,mr=!1;const _e=En.getUniforms(),Un=Bt.uniforms;if(st.useProgram(En.program)&&(xs=!0,ln=!0,mr=!0),it.id!==b&&(b=it.id,ln=!0),xs||E!==T){st.buffers.depth.getReversed()?(z.copy(T.projectionMatrix),Wx(z),Xx(z),_e.setValue(y,"projectionMatrix",z)):_e.setValue(y,"projectionMatrix",T.projectionMatrix),_e.setValue(y,"viewMatrix",T.matrixWorldInverse);const _i=_e.map.cameraPosition;_i!==void 0&&_i.setValue(y,lt.setFromMatrixPosition(T.matrixWorld)),V.logarithmicDepthBuffer&&_e.setValue(y,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&_e.setValue(y,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,ln=!0,mr=!0)}if(K.isSkinnedMesh){_e.setOptional(y,K,"bindMatrix"),_e.setOptional(y,K,"bindMatrixInverse");const mn=K.skeleton;mn&&(mn.boneTexture===null&&mn.computeBoneTexture(),_e.setValue(y,"boneTexture",mn.boneTexture,x))}K.isBatchedMesh&&(_e.setOptional(y,K,"batchingTexture"),_e.setValue(y,"batchingTexture",K._matricesTexture,x),_e.setOptional(y,K,"batchingIdTexture"),_e.setValue(y,"batchingIdTexture",K._indirectTexture,x),_e.setOptional(y,K,"batchingColorTexture"),K._colorsTexture!==null&&_e.setValue(y,"batchingColorTexture",K._colorsTexture,x));const gr=et.morphAttributes;if((gr.position!==void 0||gr.normal!==void 0||gr.color!==void 0)&&Ht.update(K,et,En),(ln||Bt.receiveShadow!==K.receiveShadow)&&(Bt.receiveShadow=K.receiveShadow,_e.setValue(y,"receiveShadow",K.receiveShadow)),it.isMeshGouraudMaterial&&it.envMap!==null&&(Un.envMap.value=Nt,Un.flipEnvMap.value=Nt.isCubeTexture&&Nt.isRenderTargetTexture===!1?-1:1),it.isMeshStandardMaterial&&it.envMap===null&&Y.environment!==null&&(Un.envMapIntensity.value=Y.environmentIntensity),ln&&(_e.setValue(y,"toneMappingExposure",M.toneMappingExposure),Bt.needsLights&&zm(Un,mr),vt&&it.fog===!0&&ct.refreshFogUniforms(Un,vt),ct.refreshMaterialUniforms(Un,it,X,nt,p.state.transmissionRenderTarget[T.id]),ia.upload(y,ku(Bt),Un,x)),it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(ia.upload(y,ku(Bt),Un,x),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&_e.setValue(y,"center",K.center),_e.setValue(y,"modelViewMatrix",K.modelViewMatrix),_e.setValue(y,"normalMatrix",K.normalMatrix),_e.setValue(y,"modelMatrix",K.matrixWorld),it.isShaderMaterial||it.isRawShaderMaterial){const mn=it.uniformsGroups;for(let _i=0,vi=mn.length;_i<vi;_i++){const Vu=mn[_i];k.update(Vu,En),k.bind(Vu,En)}}return En}function zm(T,Y){T.ambientLightColor.needsUpdate=Y,T.lightProbe.needsUpdate=Y,T.directionalLights.needsUpdate=Y,T.directionalLightShadows.needsUpdate=Y,T.pointLights.needsUpdate=Y,T.pointLightShadows.needsUpdate=Y,T.spotLights.needsUpdate=Y,T.spotLightShadows.needsUpdate=Y,T.rectAreaLights.needsUpdate=Y,T.hemisphereLights.needsUpdate=Y}function km(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,Y,et){F.get(T.texture).__webglTexture=Y,F.get(T.depthTexture).__webglTexture=et;const it=F.get(T);it.__hasExternalTextures=!0,it.__autoAllocateDepthBuffer=et===void 0,it.__autoAllocateDepthBuffer||Z.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),it.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,Y){const et=F.get(T);et.__webglFramebuffer=Y,et.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(T,Y=0,et=0){L=T,I=Y,D=et;let it=!0,K=null,vt=!1,Rt=!1;if(T){const Nt=F.get(T);if(Nt.__useDefaultFramebuffer!==void 0)st.bindFramebuffer(y.FRAMEBUFFER,null),it=!1;else if(Nt.__webglFramebuffer===void 0)x.setupRenderTarget(T);else if(Nt.__hasExternalTextures)x.rebindTextures(T,F.get(T.texture).__webglTexture,F.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ot=T.depthTexture;if(Nt.__boundDepthTexture!==Ot){if(Ot!==null&&F.has(Ot)&&(T.width!==Ot.image.width||T.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(T)}}const jt=T.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Rt=!0);const $t=F.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray($t[Y])?K=$t[Y][et]:K=$t[Y],vt=!0):T.samples>0&&x.useMultisampledRTT(T)===!1?K=F.get(T).__webglMultisampledFramebuffer:Array.isArray($t)?K=$t[et]:K=$t,P.copy(T.viewport),N.copy(T.scissor),O=T.scissorTest}else P.copy(At).multiplyScalar(X).floor(),N.copy(Ft).multiplyScalar(X).floor(),O=Qt;if(st.bindFramebuffer(y.FRAMEBUFFER,K)&&it&&st.drawBuffers(T,K),st.viewport(P),st.scissor(N),st.setScissorTest(O),vt){const Nt=F.get(T.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Nt.__webglTexture,et)}else if(Rt){const Nt=F.get(T.texture),jt=Y||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,Nt.__webglTexture,et||0,jt)}b=-1},this.readRenderTargetPixels=function(T,Y,et,it,K,vt,Rt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=F.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ut=Ut[Rt]),Ut){st.bindFramebuffer(y.FRAMEBUFFER,Ut);try{const Nt=T.texture,jt=Nt.format,$t=Nt.type;if(!V.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!V.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=T.width-it&&et>=0&&et<=T.height-K&&y.readPixels(Y,et,it,K,Vt.convert(jt),Vt.convert($t),vt)}finally{const Nt=L!==null?F.get(L).__webglFramebuffer:null;st.bindFramebuffer(y.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(T,Y,et,it,K,vt,Rt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=F.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ut=Ut[Rt]),Ut){const Nt=T.texture,jt=Nt.format,$t=Nt.type;if(!V.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!V.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Y>=0&&Y<=T.width-it&&et>=0&&et<=T.height-K){st.bindFramebuffer(y.FRAMEBUFFER,Ut);const Ot=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,Ot),y.bufferData(y.PIXEL_PACK_BUFFER,vt.byteLength,y.STREAM_READ),y.readPixels(Y,et,it,K,Vt.convert(jt),Vt.convert($t),0);const ne=L!==null?F.get(L).__webglFramebuffer:null;st.bindFramebuffer(y.FRAMEBUFFER,ne);const pe=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await Gx(y,pe,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,Ot),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,vt),y.deleteBuffer(Ot),y.deleteSync(pe),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,Y=null,et=0){T.isTexture!==!0&&(Dr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Y=arguments[0]||null,T=arguments[1]);const it=Math.pow(2,-et),K=Math.floor(T.image.width*it),vt=Math.floor(T.image.height*it),Rt=Y!==null?Y.x:0,Ut=Y!==null?Y.y:0;x.setTexture2D(T,0),y.copyTexSubImage2D(y.TEXTURE_2D,et,0,0,Rt,Ut,K,vt),st.unbindTexture()},this.copyTextureToTexture=function(T,Y,et=null,it=null,K=0){T.isTexture!==!0&&(Dr("WebGLRenderer: copyTextureToTexture function signature has changed."),it=arguments[0]||null,T=arguments[1],Y=arguments[2],K=arguments[3]||0,et=null);let vt,Rt,Ut,Nt,jt,$t,Ot,ne,pe;const ge=T.isCompressedTexture?T.mipmaps[K]:T.image;et!==null?(vt=et.max.x-et.min.x,Rt=et.max.y-et.min.y,Ut=et.isBox3?et.max.z-et.min.z:1,Nt=et.min.x,jt=et.min.y,$t=et.isBox3?et.min.z:0):(vt=ge.width,Rt=ge.height,Ut=ge.depth||1,Nt=0,jt=0,$t=0),it!==null?(Ot=it.x,ne=it.y,pe=it.z):(Ot=0,ne=0,pe=0);const en=Vt.convert(Y.format),se=Vt.convert(Y.type);let Bt;Y.isData3DTexture?(x.setTexture3D(Y,0),Bt=y.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(x.setTexture2DArray(Y,0),Bt=y.TEXTURE_2D_ARRAY):(x.setTexture2D(Y,0),Bt=y.TEXTURE_2D),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,Y.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,Y.unpackAlignment);const Yn=y.getParameter(y.UNPACK_ROW_LENGTH),re=y.getParameter(y.UNPACK_IMAGE_HEIGHT),En=y.getParameter(y.UNPACK_SKIP_PIXELS),xs=y.getParameter(y.UNPACK_SKIP_ROWS),ln=y.getParameter(y.UNPACK_SKIP_IMAGES);y.pixelStorei(y.UNPACK_ROW_LENGTH,ge.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,ge.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Nt),y.pixelStorei(y.UNPACK_SKIP_ROWS,jt),y.pixelStorei(y.UNPACK_SKIP_IMAGES,$t);const mr=T.isDataArrayTexture||T.isData3DTexture,_e=Y.isDataArrayTexture||Y.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Un=F.get(T),gr=F.get(Y),mn=F.get(Un.__renderTarget),_i=F.get(gr.__renderTarget);st.bindFramebuffer(y.READ_FRAMEBUFFER,mn.__webglFramebuffer),st.bindFramebuffer(y.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let vi=0;vi<Ut;vi++)mr&&y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,F.get(T).__webglTexture,K,$t+vi),T.isDepthTexture?(_e&&y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,F.get(Y).__webglTexture,K,pe+vi),y.blitFramebuffer(Nt,jt,vt,Rt,Ot,ne,vt,Rt,y.DEPTH_BUFFER_BIT,y.NEAREST)):_e?y.copyTexSubImage3D(Bt,K,Ot,ne,pe+vi,Nt,jt,vt,Rt):y.copyTexSubImage2D(Bt,K,Ot,ne,pe+vi,Nt,jt,vt,Rt);st.bindFramebuffer(y.READ_FRAMEBUFFER,null),st.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else _e?T.isDataTexture||T.isData3DTexture?y.texSubImage3D(Bt,K,Ot,ne,pe,vt,Rt,Ut,en,se,ge.data):Y.isCompressedArrayTexture?y.compressedTexSubImage3D(Bt,K,Ot,ne,pe,vt,Rt,Ut,en,ge.data):y.texSubImage3D(Bt,K,Ot,ne,pe,vt,Rt,Ut,en,se,ge):T.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,K,Ot,ne,vt,Rt,en,se,ge.data):T.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,K,Ot,ne,ge.width,ge.height,en,ge.data):y.texSubImage2D(y.TEXTURE_2D,K,Ot,ne,vt,Rt,en,se,ge);y.pixelStorei(y.UNPACK_ROW_LENGTH,Yn),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,re),y.pixelStorei(y.UNPACK_SKIP_PIXELS,En),y.pixelStorei(y.UNPACK_SKIP_ROWS,xs),y.pixelStorei(y.UNPACK_SKIP_IMAGES,ln),K===0&&Y.generateMipmaps&&y.generateMipmap(Bt),st.unbindTexture()},this.copyTextureToTexture3D=function(T,Y,et=null,it=null,K=0){return T.isTexture!==!0&&(Dr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),et=arguments[0]||null,it=arguments[1]||null,T=arguments[2],Y=arguments[3],K=arguments[4]||0),Dr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,Y,et,it,K)},this.initRenderTarget=function(T){F.get(T).__webglFramebuffer===void 0&&x.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?x.setTextureCube(T,0):T.isData3DTexture?x.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?x.setTexture2DArray(T,0):x.setTexture2D(T,0),st.unbindTexture()},this.resetState=function(){I=0,D=0,L=null,st.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class Iu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new Iu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tT extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class eT extends Qe{constructor(t=null,e=1,i=1,s,r,o,a,l,c=pn,u=pn,f,h){super(null,o,a,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jc extends _s{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xa=new $,ya=new $,qh=new de,Ar=new ao,ko=new hr,Fl=new $,Yh=new $;class nT extends Te{constructor(t=new Ve,e=new jc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)xa.fromBufferAttribute(e,s-1),ya.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=xa.distanceTo(ya);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(s),ko.radius+=r,t.ray.intersectsSphere(ko)===!1)return;qh.copy(s).invert(),Ar.copy(t.ray).applyMatrix4(qh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),S=u.getX(_+1),A=Ho(this,t,Ar,l,p,S);A&&e.push(A)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=Ho(this,t,Ar,l,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=Ho(this,t,Ar,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Ho(this,t,Ar,l,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ho(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(xa.fromBufferAttribute(o,s),ya.fromBufferAttribute(o,r),e.distanceSqToSegment(xa,ya,Fl,Yh)>i)return;Fl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Fl);if(!(l<t.near||l>t.far))return{distance:l,point:Yh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const $h=new $,Kh=new $;class Zh extends nT{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)$h.fromBufferAttribute(e,s),Kh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+$h.distanceTo(Kh);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class iT extends _s{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Jh=new de,qc=new ao,Vo=new hr,Go=new $;class sT extends Te{constructor(t=new Ve,e=new iT){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vo.copy(i.boundingSphere),Vo.applyMatrix4(s),Vo.radius+=r,t.ray.intersectsSphere(Vo)===!1)return;Jh.copy(s).invert(),qc.copy(t.ray).applyMatrix4(Jh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);Go.fromBufferAttribute(f,m),Qh(Go,m,l,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)Go.fromBufferAttribute(f,g),Qh(Go,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Qh(n,t,e,i,s,r,o){const a=qc.distanceSqToPoint(n);if(a<e){const l=new $;qc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Lu extends Ve{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let f=t;const h=(e-t)/s,d=new $,g=new zt;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=r+m/i*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const S=p+m,A=S,M=S+i+1,G=S+i+2,I=S+1;a.push(A,M,I),a.push(M,G,I)}}this.setIndex(a),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Gs extends Ve{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new $,h=new $,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const S=[],A=p/i;let M=0;p===0&&o===0?M=.5/e:p===i&&l===Math.PI&&(M=-.5/e);for(let G=0;G<=e;G++){const I=G/e;f.x=-t*Math.cos(s+I*r)*Math.sin(o+A*a),f.y=t*Math.cos(o+A*a),f.z=t*Math.sin(s+I*r)*Math.sin(o+A*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(I+M,1-A),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const A=u[p][S+1],M=u[p][S],G=u[p+1][S],I=u[p+1][S+1];(p!==0||o>0)&&d.push(A,M,I),(p!==i-1||l<Math.PI)&&d.push(M,G,I)}this.setIndex(d),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Uu extends Ve{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new $,f=new $,h=new $;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){const _=g/s*r,m=d/i*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,S=(s+1)*d+g;o.push(_,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Uu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class rT extends ke{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class td extends _s{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pm,this.normalScale=new zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Dm extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class oT extends Dm{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Bl=new de,ed=new $,nd=new $;class aT{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new zt(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cu,this._frameExtents=new zt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ed.setFromMatrixPosition(t.matrixWorld),e.position.copy(ed),nd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nd),e.updateMatrixWorld(),Bl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Bl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class lT extends aT{constructor(){super(new Pu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class id extends Dm{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new lT}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Im{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=sd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=sd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function sd(){return performance.now()}const rd=new de;class cT{constructor(t,e,i=0,s=1/0){this.ray=new ao(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ru,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return rd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rd),this}intersectObject(t,e=!0,i=[]){return Yc(t,this,i,e),i.sort(od),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Yc(t[s],this,i,e);return i.sort(od),i}}function od(n,t){return n.distance-t.distance}function Yc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Yc(r[o],t,e,!0)}}class ad{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ke(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class uT extends gs{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yu);const ld={type:"change"},Nu={type:"start"},Lm={type:"end"},Wo=new ao,cd=new Pi,fT=Math.cos(70*Hx.DEG2RAD),Ae=new $,sn=2*Math.PI,fe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zl=1e-6;class hT extends uT{constructor(t,e=null){super(t,e),this.state=fe.NONE,this.enabled=!0,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ys.ROTATE,MIDDLE:Ys.DOLLY,RIGHT:Ys.PAN},this.touches={ONE:ks.ROTATE,TWO:ks.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new $,this._lastQuaternion=new hs,this._lastTargetPosition=new $,this._quat=new hs().setFromUnitVectors(t.up,new $(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ad,this._sphericalDelta=new ad,this._scale=1,this._panOffset=new $,this._rotateStart=new zt,this._rotateEnd=new zt,this._rotateDelta=new zt,this._panStart=new zt,this._panEnd=new zt,this._panDelta=new zt,this._dollyStart=new zt,this._dollyEnd=new zt,this._dollyDelta=new zt,this._dollyDirection=new $,this._mouse=new zt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pT.bind(this),this._onPointerDown=dT.bind(this),this._onPointerUp=mT.bind(this),this._onContextMenu=ST.bind(this),this._onMouseWheel=vT.bind(this),this._onKeyDown=xT.bind(this),this._onTouchStart=yT.bind(this),this._onTouchMove=MT.bind(this),this._onMouseDown=gT.bind(this),this._onMouseMove=_T.bind(this),this._interceptControlDown=ET.bind(this),this._interceptControlUp=bT.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ld),this.update(),this.state=fe.NONE}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===fe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ae.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new $(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new $(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Wo.origin.copy(this.object.position),Wo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wo.direction))<fT?this.object.lookAt(this.target):(cd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wo.intersectPlane(cd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>zl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zl||this._lastTargetPosition.distanceToSquared(this.target)>zl?(this.dispatchEvent(ld),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new zt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function dT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function pT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function mT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lm),this.state=fe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function gT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ys.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=fe.DOLLY;break;case Ys.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}break;case Ys.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=fe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=fe.PAN}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(Nu)}function _T(n){switch(this.state){case fe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case fe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case fe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function vT(n){this.enabled===!1||this.enableZoom===!1||this.state!==fe.NONE||(n.preventDefault(),this.dispatchEvent(Nu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Lm))}function xT(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function yT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ks.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=fe.TOUCH_ROTATE;break;case ks.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=fe.TOUCH_PAN;break;default:this.state=fe.NONE}break;case 2:switch(this.touches.TWO){case ks.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=fe.TOUCH_DOLLY_PAN;break;case ks.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=fe.TOUCH_DOLLY_ROTATE;break;default:this.state=fe.NONE}break;default:this.state=fe.NONE}this.state!==fe.NONE&&this.dispatchEvent(Nu)}function MT(n){switch(this._trackPointer(n),this.state){case fe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case fe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case fe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case fe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=fe.NONE}}function ST(n){this.enabled!==!1&&n.preventDefault()}function ET(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function bT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Um={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class pr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const TT=new Pu(-1,1,1,-1,0,1);class AT extends Ve{constructor(){super(),this.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Se([0,2,0,0,2,0],2))}}const wT=new AT;class Ou{constructor(t){this._mesh=new Re(wT,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,TT)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class RT extends pr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ke?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Jr.clone(t.uniforms),this.material=new ke({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Ou(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ud extends pr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class CT extends pr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class PT{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new zt);this._width=i.width,this._height=i.height,e=new Dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ui}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new RT(Um),this.copyPass.material.blending=ci,this.clock=new Im}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ud!==void 0&&(o instanceof ud?i=!0:o instanceof CT&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new zt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const DT={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class IT extends pr{constructor(){super();const t=DT;this.uniforms=Jr.clone(t.uniforms),this.material=new rT({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Ou(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Jp?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Qp?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===tm?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Mu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===em?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===nm&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class LT extends pr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new qt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const UT={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ur extends pr{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new zt(t.x,t.y):new zt(256,256),this.clearColor=new qt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Dn(r,o,{type:ui}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const h=new Dn(r,o,{type:ui});h.texture.name="UnrealBloomPass.h"+f,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new Dn(r,o,{type:ui});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=UT;this.highPassUniforms=Jr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ke({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new zt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new $(1,1,1),new $(1,1,1),new $(1,1,1),new $(1,1,1),new $(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Um;this.copyUniforms=Jr.clone(u.uniforms),this.blendMaterial=new ke({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Ks,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new qt,this.oldClearAlpha=1,this.basic=new _n,this.fsQuad=new Ou(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new zt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ur.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ur.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new ke({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new zt(.5,.5)},direction:{value:new zt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}ur.BlurDirectionX=new zt(1,0);ur.BlurDirectionY=new zt(0,1);class wr extends Te{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new zt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Ns=new $,fd=new de,hd=new de,dd=new $,pd=new $;class NT{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),fd.copy(_.matrixWorldInverse),hd.multiplyMatrices(_.projectionMatrix,fd),u(g,g,_),d(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Ns.setFromMatrixPosition(g.matrixWorld),Ns.applyMatrix4(hd);const p=Ns.z>=-1&&Ns.z<=1&&g.layers.test(m.layers)===!0,S=g.element;S.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,m),S.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Ns.x*r+r)+"px,"+(-Ns.y*o+o)+"px)",S.parentNode!==l&&l.appendChild(S),g.onAfterRender(e,_,m));const A={distanceToCameraSquared:f(m,g)};a.objects.set(g,A)}for(let p=0,S=g.children.length;p<S;p++)u(g.children[p],_,m)}function f(g,_){return dd.setFromMatrixPosition(g.matrixWorld),pd.setFromMatrixPosition(_.matrixWorld),dd.distanceToSquared(pd)}function h(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function d(g){const _=h(g).sort(function(p,S){if(p.renderOrder!==S.renderOrder)return S.renderOrder-p.renderOrder;const A=a.objects.get(p).distanceToCameraSquared,M=a.objects.get(S).distanceToCameraSquared;return A-M}),m=_.length;for(let p=0,S=_.length;p<S;p++)_[p].element.style.zIndex=m-p}}}const OT="v5";function FT(n,t){return`${OT}-${n}-${t}`}const Ma=new Map;function md(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function BT(n){return n-Math.floor(n)}function Xo(n,t,e){return BT(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function $c(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=Xo(i,s,e),u=Xo(i+1,s,e),f=Xo(i,s+1,e),h=Xo(i+1,s+1,e);return c+(u-c)*a+(f-c)*l+(h-f-(u-c))*a*l}function zT(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*$c(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function kT(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function HT(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,f=zT(c*4.2+t*.002,u*4.2-t*.001,t),d=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,$c(c*14,u*14,t+11)-.38),1.4),_=$c(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*f)*d*(1-g*.55)*_;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[p,S,A]=kT(e,r,m),M=(a*n+l)*4;s[M]=p,s[M+1]=S,s[M+2]=A,s[M+3]=255}const o=new eT(s,n,n);return o.format=xn,o.type=Wn,o.colorSpace=rn,o.wrapS=Kr,o.wrapT=Kr,o.generateMipmaps=!0,o.minFilter=Ui,o.magFilter=Cn,o.flipY=!0,o.needsUpdate=!0,o}function VT(n,t){const e=md(n)%14,i=FT(t,e);let s=Ma.get(i);if(!s){const r=md(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=HT(256,r,o,t),Ma.set(i,s)}return{map:s}}function GT(){for(const n of Ma.values())n.dispose();Ma.clear()}function Ii(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>1}function WT(){if(typeof navigator>"u")return!1;const n=navigator.deviceMemory,t=navigator.hardwareConcurrency;return n&&n<=4||t&&t<=4?!0:Ii()}const XT=461586,jT=4874368,qT=9103615,gd=12101887,YT=4873336,$T=6091007,_d=13165823,KT=10205416,ZT=1.35,JT=4e3,We={pixelRatio:Ii()?1:Math.min(window.devicePixelRatio,2),starfieldCount:WT()?800:2e3,geometrySegments:Ii()?{major:24,fusion:16}:{major:48,fusion:36},enableBloom:!Ii(),bloomResolutionScale:(Ii(),.5),animationFrameSkip:Ii()?2:1},QT=["热度/年薪","强度/竞争","学历门槛","学科技能"];function Fu(n,t,e,i,s){const r=n.clientWidth||window.innerWidth,o=n.clientHeight||window.innerHeight,a=new tT;a.background=new qt(XT),a.fog=new Iu(jT,.032);const l=new vn(55,r/o,.1,200);l.position.set(12,10,16);const c=new Qb({antialias:!Ii(),alpha:!1,powerPreference:Ii()?"default":"high-performance"});c.setPixelRatio(We.pixelRatio),c.setSize(r,o),c.outputColorSpace=rn,c.toneMapping=Mu,c.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(c.domElement);const u=document.createElement("div");u.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(u);const f=new NT({element:u});f.setSize(r,o);const h=We.pixelRatio,d=new PT(c);d.setPixelRatio(h);const g=new LT(a,l);let _=null,m=null;if(We.enableBloom){const W=new zt(Math.max(128,Math.floor(r*h*We.bloomResolutionScale)),Math.max(128,Math.floor(o*h*We.bloomResolutionScale)));_=new ur(W,.34,.34,.88),m=new IT,d.addPass(g),d.addPass(_),d.addPass(m)}else d.addPass(g);const p=new oT(9088744,1382432,.62);a.add(p);const S=new id(15791871,.55);S.position.set(8,14,10),a.add(S);const A=new id(6324424,.22);A.position.set(-12,-2,-8),a.add(A);const M=new hT(l,c.domElement);M.enableDamping=!0,M.dampingFactor=.06,M.minDistance=4,M.maxDistance=48,M.autoRotate=!0,M.autoRotateSpeed=ZT;let G=null,I=!1;const D=()=>{G!==null&&(window.clearTimeout(G),G=null)},L=()=>{D(),G=window.setTimeout(()=>{I||(M.autoRotate=!0)},JT)},b=()=>{I=!0,M.autoRotate=!1,D()},E=()=>{I=!1,L()},P=()=>{M.autoRotate=!1,L()},N=Math.min(1,Math.max(0,(s==null?void 0:s.ambientStarBoost)??0)),O=new Map,Q=new Map;let j=null,U=null;const X=(()=>{const W=Math.min(We.starfieldCount,Math.floor(We.starfieldCount*.2+N*We.starfieldCount*.8)),F=new Float32Array(W*3),x=new Float32Array(W);for(let q=0;q<W;q++){const _t=Math.random(),ct=Math.random(),ht=2*Math.PI*_t,Ct=Math.acos(2*ct-1),rt=26+Math.random()*78,dt=Math.sin(Ct);F[q*3]=rt*dt*Math.cos(ht),F[q*3+1]=rt*dt*Math.sin(ht),F[q*3+2]=rt*Math.cos(Ct);const Et=.04+Math.random()*.12+N*.06;x[q]=Math.min(.26,Et)}const v=new Ve;v.setAttribute("position",new Sn(F,3)),v.setAttribute("size",new Sn(x,1));const C=.42+N*.58,B=new ke({uniforms:{uColor:{value:new qt(KT)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uAlphaMul:{value:C}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:Ks}),H=new sT(v,B);return H.frustumCulled=!1,a.add(H),H})(),pt=(W,F,x)=>{W.traverse(v=>{v instanceof wr||(v.userData.nodeId=F,v.userData.nodeType=x)})},Mt=(W,F)=>{const x=document.createElement("div");x.textContent=W,x.setAttribute("role","presentation");const v=F==="fusion",C=v?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",B=v?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",H=v?"#f4ecff":"#eaf6ff";return x.style.cssText=[`max-width:${v?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${H}`,`background:${C}`,`border:${B}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),x},At=W=>{const F=document.createElement("div");return F.textContent=W,F.setAttribute("role","presentation"),F.style.cssText=["max-width: 52px","padding: 2px 5px","border-radius: 5px","font-size: 8px","font-weight: 650","line-height: 1.2","text-align: center","letter-spacing: 0.01em","color: #ede6ff","background: rgba(28, 20, 42, 0.82)","border: 1px solid rgba(200, 170, 255, 0.42)","box-shadow: 0 1px 5px rgba(0,0,0,0.35)","text-shadow: 0 1px 2px rgba(0,0,0,0.7)","display: -webkit-box","-webkit-box-orient: vertical","-webkit-line-clamp: 2","overflow: hidden","word-break: break-all","overflow-wrap: anywhere","opacity: 0","visibility: hidden","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),F},Ft=(W,F,x)=>{const v=W==="major",C=new Vs,B=v?"major":"fusion",{map:H}=VT(F,B),q=v?.23:.15,_t=new Gs(q,v?We.geometrySegments.major:We.geometrySegments.fusion,Math.floor(v?We.geometrySegments.major*.67:We.geometrySegments.fusion*.72)),ct=new _n({map:H,color:new qt(16777215),transparent:!0,opacity:1,fog:!1}),ht=new Re(_t,ct);ht.userData.part="core",C.add(ht);const Ct=v?qT:gd,rt=new Gs(q*1.52,18,14),dt=new _n({color:Ct,transparent:!0,opacity:v?.045:.032,depthWrite:!1,blending:Ks,fog:!1}),Et=new Re(rt,dt);if(Et.renderOrder=-1,Et.userData.part="glow",C.add(Et),v){const kt=new _n({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:wn,fog:!1}),Vt=(k,bt,ot)=>{const ft=new Uu(k,bt,10,80),St=new Re(ft,kt.clone());return St.rotation.x=Math.PI/2,St.rotation.z=ot,St.userData.part="ring",St};C.add(Vt(.46,.014,Math.random()*Math.PI));const te=Vt(.38,.01,Math.PI/2.8);te.rotation.y=Math.PI/3.2,C.add(te)}else{const kt=Math.max(q*5.55,.78),Vt=kt*1.2,te=kt*.82,k=kt*1.22,bt=new Lu(te,k,80),ot=new _n({color:gd,transparent:!0,opacity:.5,depthWrite:!1,side:wn,fog:!1,blending:Ks}),ft=new Re(bt,ot);ft.rotation.x=Math.PI/2,ft.renderOrder=0,ft.userData.part="ring",C.add(ft);const St=Math.max(q*.34,.052),wt=[.02,.14,.55,.42];for(let Gt=0;Gt<4;Gt++){const ve=new Gs(St,14,12),Ie=new qt().setHSL(wt[Gt],.55,.62),ie=new _n({color:Ie,transparent:!0,opacity:.94,fog:!1}),Ge=new Re(ve,ie),tn=Gt/4*Math.PI*2-Math.PI/4,co=Math.cos(tn)*kt,uo=Math.sin(tn)*kt;Ge.position.set(co,0,uo),Ge.userData.part="satellite",C.add(Ge);const jn=At(QT[Gt]),qn=new wr(jn),fo=Math.cos(tn)*Vt,ho=Math.sin(tn)*Vt,vs=St*.55+Gt%2*.018;qn.position.set(fo,vs,ho),qn.center.set(.5,1),qn.renderOrder=8,qn.userData.isFusionQuadrantLabel=!0,C.add(qn)}}const Ht=Mt(x,W),xt=new wr(Ht);return xt.position.set(0,q*1.38,0),xt.center.set(.5,1),xt.renderOrder=10,xt.userData.isNodeLabel=!0,C.add(xt),C.userData.nodeVisual={core:ht,glow:Et},C};for(const W of t.nodes){const F=t.layout[W.id];if(!F)continue;const x=Ft(W.type,W.id,W.label);x.position.set(F.x,F.y,F.z),x.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),x.userData.nodeId=W.id,x.userData.nodeType=W.type,pt(x,W.id,W.type),a.add(x),O.set(W.id,x)}const Qt=(W,F)=>W<F?`${W}|${F}`:`${F}|${W}`,at=()=>{const W=[];for(const v of t.edges){const C=t.layout[v.u],B=t.layout[v.v];!C||!B||W.push(C.x,C.y,C.z,B.x,B.y,B.z)}const F=new Ve;F.setAttribute("position",new Se(W,3));const x=new jc({color:YT,transparent:!0,opacity:.32,depthWrite:!1});return new Zh(F,x)},mt=W=>{const F=[...W],x=[],v=new Set(t.edges.map(H=>Qt(H.u,H.v)));for(let H=0;H<F.length-1;H++){const q=F[H],_t=F[H+1];if(!v.has(Qt(q,_t)))continue;const ct=t.layout[q],ht=t.layout[_t];!ct||!ht||x.push(ct.x,ct.y,ct.z,ht.x,ht.y,ht.z)}const C=new Ve;C.setAttribute("position",new Se(x,3));const B=new jc({color:$T,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new Zh(C,B)};j=at(),a.add(j),U=mt(e.pathIds),a.add(U);const yt=new Vs;a.add(yt),(()=>{for(;yt.children.length;)yt.remove(yt.children[0]);Q.clear();const W=new Gs(1,20,20);for(const F of t.hyperedges){const x=[];for(const _t of F.member_node_ids){const ct=t.layout[_t];ct&&x.push(new $(ct.x,ct.y,ct.z))}if(!x.length)continue;const v=new ds().setFromPoints(x),C=new hr;v.getBoundingSphere(C);const B=new _n({color:_d,transparent:!0,opacity:.07,depthWrite:!1}),H=new Re(W,B);H.position.copy(C.center);const q=Math.max(C.radius*1.45,.65);H.scale.setScalar(q),H.userData.hyperedgeId=F.id,yt.add(H),Q.set(F.id,H)}})();const ut=new cT,lt=new zt,gt=(W,F)=>{const x=c.domElement.getBoundingClientRect();lt.x=(W-x.left)/x.width*2-1,lt.y=-((F-x.top)/x.height)*2+1,ut.setFromCamera(lt,l);const v=[...O.values()],B=ut.intersectObjects(v,!0).find(q=>q.object instanceof Re&&typeof q.object.userData.nodeId=="string");if(!B){i(null);return}const H=B.object.userData.nodeId;i(H??null)},Dt=W=>{W.button===0&&(b(),gt(W.clientX,W.clientY))};c.domElement.addEventListener("pointerdown",Dt),c.domElement.addEventListener("pointerup",E),c.domElement.addEventListener("wheel",P,{passive:!0}),c.domElement.addEventListener("touchstart",b,{passive:!0}),c.domElement.addEventListener("touchend",E,{passive:!0}),M.addEventListener("start",b),M.addEventListener("end",E);let R=0,w=0;const y=new Im,tt=()=>{w++;const W=y.getDelta(),F=y.getElapsedTime();if(M.update(),w%We.animationFrameSkip===0)for(const x of O.values())x.rotation.y+=W*.1*We.animationFrameSkip,x.rotation.z+=W*.02*Math.sin(F*.6+x.position.x*.2)*We.animationFrameSkip;d.render(),f.render(a,l),R=requestAnimationFrame(tt)};tt();const Z=()=>{const W=n.clientWidth||window.innerWidth,F=n.clientHeight||window.innerHeight;l.aspect=W/F,l.updateProjectionMatrix(),c.setSize(W,F),d.setSize(W,F),f.setSize(W,F),X.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",Z);const V=W=>{U&&(a.remove(U),U.geometry.dispose(),U.material.dispose(),U=mt(W.pathIds),a.add(U));const F=new Set([...W.pathIds,...W.hyperMemberIds]);for(const[x,v]of O){const C=W.pathIds.has(x),B=W.hyperMemberIds.has(x),H=W.selectedId===x,q=!F.has(x)&&(W.pathIds.size>0||W.hyperMemberIds.size>0),_t=q?.32:1,ct=v.userData.nodeType||"major";v.traverse(ht=>{if(ht instanceof wr&&ht.userData.isNodeLabel){const rt=ht.element;let dt=q?.36:.96;(C||B)&&(dt=Math.max(dt,.94)),H&&(dt=1),rt.style.opacity=String(dt),rt.style.filter=H?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":C||B?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",rt.style.fontWeight=H?"800":"650",ht.renderOrder=H?20:10;return}if(ht instanceof wr&&ht.userData.isFusionQuadrantLabel){const rt=ht.element;if(!(ct==="fusion"&&H)){rt.style.opacity="0",rt.style.visibility="hidden",ht.renderOrder=1;return}rt.style.visibility="visible";let Et=q?.3:.92;(C||B)&&(Et=Math.max(Et,.9)),H&&(Et=1),rt.style.opacity=String(Et),rt.style.filter=H?"drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))":C||B?"drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))":"none",ht.renderOrder=H?18:8;return}if(!(ht instanceof Re))return;const Ct=ht.material;if(Ct instanceof _n&&(ht.userData.part||"other")==="core"){let dt=q?.34:1;(C||B)&&(dt=Math.max(dt,.98)),H&&(dt=1),Ct.opacity=dt,Ct.transparent=dt<.999,Ct.color.set(H?16777215:C||B?15924223:16777215);return}if(Ct instanceof td){let rt=q?.38:1,dt=ct==="major"?.11:.09;(C||B)&&(rt=Math.max(rt,.98),dt=.26),H&&(dt=.38,rt=1),q&&(dt*=.55),Ct.transparent=rt<.999,Ct.opacity=rt,Ct.emissiveIntensity=dt}else if(Ct instanceof _n){const rt=ht.userData.part||"other";let dt=.42;rt==="glow"?dt=ct==="major"?.048:.036:rt==="shard"?dt=.36:rt==="ring"?dt=ct==="major"?.48:.52:rt==="satellite"&&(dt=.9);let Et=dt*_t;(C||B)&&(rt==="glow"||rt==="shard"?Et=Math.max(Et,.22):Et=Math.max(Et,.82)),H&&(rt==="glow"||rt==="shard"||rt==="satellite")&&(Et=Math.max(Et,.34)),H&&rt==="ring"&&ct==="fusion"&&(Et=Math.max(Et,.78)),Ct.opacity=Et,Ct.transparent=!0}})}for(const[x,v]of Q){const C=v.material,B=W.activeHyperedgeIds.has(x);C.opacity=B?.22:.06,C.color=new qt(B?14216447:_d)}};return V(e),{dispose(){D(),cancelAnimationFrame(R),window.removeEventListener("resize",Z),c.domElement.removeEventListener("pointerdown",Dt),c.domElement.removeEventListener("pointerup",E),c.domElement.removeEventListener("wheel",P),c.domElement.removeEventListener("touchstart",b),c.domElement.removeEventListener("touchend",E),M.removeEventListener("start",b),M.removeEventListener("end",E);for(const W of O.values())a.remove(W),W.traverse(F=>{var x;if(F instanceof Re){const v=Array.isArray(F.material)?F.material:[F.material];for(const C of v)C instanceof td?(C.map=null,C.bumpMap=null,C.roughnessMap=null):C instanceof _n&&(C.map=null),C==null||C.dispose();(x=F.geometry)==null||x.dispose()}});O.clear(),j&&(a.remove(j),j.geometry.dispose(),j.material.dispose(),j=null),U&&(a.remove(U),U.geometry.dispose(),U.material.dispose(),U=null);for(const W of Q.values())yt.remove(W),W.geometry.dispose(),W.material.dispose();Q.clear(),a.remove(yt),a.remove(X),X.geometry.dispose(),X.material.dispose(),_&&_.dispose(),m&&m.dispose(),d.dispose(),GT(),u.parentElement===n&&n.removeChild(u),M.dispose(),c.dispose(),c.domElement.parentElement&&c.domElement.parentElement.removeChild(c.domElement)},setVisualState(W){V(W)},frameBounds:W=>{const F=[];for(const H of W){const q=t.layout[H];q&&F.push(new $(q.x,q.y,q.z))}if(!F.length)return;const x=new ds().setFromPoints(F),v=new $;x.getCenter(v);const C=new $;x.getSize(C);const B=Math.max(C.length()*.65,4);M.target.copy(v),l.position.copy(v.clone().add(new $(B*.9,B*.55,B*.95))),M.update()},getCamera:()=>l}}function Bu(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const tA={class:"galaxy-page"},eA={key:0,class:"overlay center"},nA={key:1,class:"overlay center error-panel"},iA={class:"error-msg"},sA={class:"panel-card"},rA={class:"side-title"},oA={class:"side-desc"},aA={key:0,class:"block"},lA={class:"pill-list"},cA={class:"members"},uA={class:"panel-card rec"},fA={class:"rec-head"},hA={class:"block-label"},dA={key:0,class:"rec-list"},pA={class:"rec-node"},mA={class:"rec-reason"},gA={key:1,class:"rec-empty"},_A={key:2,class:"hint-promo",role:"note"},vA=mi({__name:"GalaxyView",setup(n){const t=io(),e=Wt("loading"),i=Wt(""),s=Wt(null),r=Wt([]),o=Wt(""),a=Wt(!1),l=Wt(!0),c=Wt(null),u=tr(null),f=Wt(new Set),h=tr(null),d=Zt(()=>{if(!s.value||!u.value)return"";const w=u.value.nodes.find(y=>y.id===s.value);return(w==null?void 0:w.label)??""}),g=Zt(()=>{var tt,Z;if(!s.value||!u.value)return"";const w=u.value.nodes.find(V=>V.id===s.value);if(!w)return"";if(w.type==="fusion"){const V=((tt=w.meta)==null?void 0:tt.subtitle)??"";return V?`交叉关卡 · ${V}`:"交叉学科关卡"}const y=((Z=w.meta)==null?void 0:Z.tagline)??"";return y?`专业入口 · ${y}`:"专业节点"}),_=Zt(()=>{if(!s.value||!u.value)return{ids:[],members:[]};const{hyperedgeIds:w,memberIds:y}=as(s.value,u.value.hyperedges),tt=[...y].map(Z=>{var V;return((V=u.value.nodes.find(st=>st.id===Z))==null?void 0:V.label)??Z}).filter(Z=>Z);return{ids:w,members:tt}}),m=Zt(()=>!s.value||!u.value?new Set:new Set(as(s.value,u.value.hyperedges).hyperedgeIds)),p=Zt(()=>!s.value||!u.value?new Set:as(s.value,u.value.hyperedges).memberIds),S=Zt(()=>({pathIds:f.value,selectedId:s.value,hyperMemberIds:p.value,activeHyperedgeIds:m.value}));on(S,w=>{var y;(y=h.value)==null||y.setVisualState(w)}),on(s,()=>{a.value=!1,mt(),e.value==="ready"&&A()});async function A(){try{const w=Hf(),y=await ol(w,s.value);r.value=y.suggestions??[],o.value=y.algorithm||y.note||""}catch{}}function M(){a.value=!a.value,a.value&&A()}function G(){try{const w=sessionStorage.getItem(pa);if(!w)return null;const y=JSON.parse(w);return!y.fromId||!y.toId||y.fromId===y.toId?null:y}catch{return null}}async function I(w,y,tt){const Z=new Promise((V,st)=>setTimeout(()=>st(new Error(tt)),y));return Promise.race([w,Z])}function D(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>1}async function L(){if(e.value="loading",i.value="",!Bu()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const w=G();if(!w){t.replace({name:"select"});return}c.value=w;const tt=D()?15e3:3e4;try{const Z=Hf();let V,st;try{V=await I(Vf(Z),tt,"加载星系数据超时，请检查网络连接"),st=await I(ol(Z),5e3,"加载推荐数据超时")}catch(F){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&Z!=="./mock")V=await Vf("./mock"),st=await ol("./mock");else throw F}r.value=st.suggestions??[],o.value=st.algorithm||st.note||"",u.value={nodes:V.nodes,edges:V.edges,hyperedges:V.hyperedges,layout:V.layout};const W=jv(u.value.edges,w.fromId,w.toId);f.value=new Set(W??[w.fromId,w.toId]),e.value="ready"}catch(Z){e.value="error",i.value=Z instanceof Error?Z.message:"加载失败",console.error("[GalaxyView] Bootstrap error:",Z)}}function b(w){var st;if((st=h.value)==null||st.dispose(),h.value=null,!w||!u.value||e.value!=="ready")return;const y={pathIds:f.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},tt=xu(u.value.nodes),Z=Fu(w,u.value,y,W=>{s.value=W},{ambientStarBoost:tt});h.value=Z,Z.setVisualState(S.value);const V=[...f.value];Z.frameBounds(V.length?V:[...u.value.nodes.map(W=>W.id)].slice(0,6))}const E=Wt(null),P=Wt(null),N=Wt(!0),O=Wt(null),Q=Wt(null);let j=!1,U=0,nt=0,X=0,pt=0;function Mt(w,y,tt){return Math.max(y,Math.min(tt,w))}function At(){j&&(j=!1,window.removeEventListener("pointermove",Ft),window.removeEventListener("pointerup",At))}function Ft(w){if(!j||!P.value)return;const y=P.value,tt=w.clientX-U,Z=w.clientY-nt,V=y.getBoundingClientRect(),st=V.width,W=V.height;let F=X+tt,x=pt+Z;F=Mt(F,8,window.innerWidth-st-8),x=Mt(x,8,window.innerHeight-W-8),O.value=F,Q.value=x}function Qt(w){if(w.button!==0||!P.value)return;At(),w.preventDefault();const y=P.value.getBoundingClientRect();j=!0,U=w.clientX,nt=w.clientY,X=y.left,pt=y.top,O.value=y.left,Q.value=y.top,window.addEventListener("pointermove",Ft),window.addEventListener("pointerup",At)}const at=Zt(()=>{if(!(O.value==null||Q.value==null))return{left:`${O.value}px`,top:`${Q.value}px`,right:"auto",bottom:"auto"}});function mt(){N.value=!0,O.value=null,Q.value=null,At()}La(async()=>{await L()}),on(e,async w=>{w==="ready"&&(await ls(),b(E.value))}),Ua(()=>{var w;At(),(w=h.value)==null||w.dispose()});function yt(){L()}function z(){t.push({name:"select"})}function ut(){try{sessionStorage.removeItem(pa)}catch{}kp(),t.replace({name:"select"})}function lt(w){var y,tt;return((tt=(y=u.value)==null?void 0:y.nodes.find(Z=>Z.id===w))==null?void 0:tt.label)??w}function gt(){Dt(),t.push({path:"/personal"})}function Dt(){l.value=!1}function R(){const w=s.value;if(!w||!u.value)return;const y=u.value.nodes.find(tt=>tt.id===w);!y||y.type!=="fusion"||t.push({name:"personalStarlit",query:{fusionId:w,title:y.label,source:"galaxy"}})}return(w,y)=>{var tt,Z;return Pt(),Lt("div",tA,[e.value==="loading"?(Pt(),Lt("div",eA,[...y[1]||(y[1]=[J("div",{class:"spinner","aria-hidden":"true"},null,-1),J("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(Pt(),Lt("div",nA,[y[2]||(y[2]=J("p",{class:"error-title"},"无法进入星系",-1)),J("p",iA,It(i.value),1),J("div",{class:"error-actions"},[J("button",{type:"button",class:"btn ghost",onClick:z},"返回选择"),J("button",{type:"button",class:"btn primary",onClick:yt},"重试")]),y[3]||(y[3]=J("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(Pt(),Lt(be,{key:2},[J("div",{ref_key:"canvasHost",ref:E,class:"canvas-host"},null,512),J("div",{class:"top-bar"},[y[4]||(y[4]=J("div",{class:"top-left-spacer"},null,-1)),y[5]||(y[5]=J("div",{class:"top-title"},"专业星系",-1)),J("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:ut},"×")]),s.value?(Pt(),Lt("button",{key:0,type:"button",class:"side-toggle",onClick:y[0]||(y[0]=V=>N.value=!N.value)},It(N.value?"隐藏":"显示"),1)):Ce("",!0),s.value?$d((Pt(),Lt("aside",{key:1,ref_key:"sidePanelEl",ref:P,class:"side",style:Ra(at.value)},[J("div",{class:"side-drag-handle",onPointerdown:Qt},"信息面板",32),J("section",sA,[y[8]||(y[8]=J("p",{class:"side-eyebrow"},"选中",-1)),J("h2",rA,It(d.value),1),J("p",oA,It(g.value),1),_.value.ids.length?(Pt(),Lt("section",aA,[y[6]||(y[6]=J("p",{class:"block-label"},"相关超边（融合域）",-1)),J("ul",lA,[(Pt(!0),Lt(be,null,Bi(_.value.ids,V=>(Pt(),Lt("li",{key:V,class:"pill"},It(V),1))),128))]),y[7]||(y[7]=J("p",{class:"block-label"},"成员节点",-1)),J("p",cA,It(_.value.members.join("、")),1)])):Ce("",!0),((Z=(tt=u.value)==null?void 0:tt.nodes.find(V=>V.id===s.value))==null?void 0:Z.type)==="fusion"?(Pt(),Lt("button",{key:1,type:"button",class:"btn primary full",onClick:R}," 去练 ")):Ce("",!0)]),J("section",uA,[J("div",fA,[J("p",hA,"推荐下一步"+It(o.value?`（${o.value}）`:""),1),J("button",{type:"button",class:"btn rec-toggle",onClick:M},It(a.value?"收起":"展开"),1)]),a.value?(Pt(),Lt(be,{key:0},[r.value&&r.value.length>0?(Pt(),Lt("ul",dA,[(Pt(!0),Lt(be,null,Bi(r.value,V=>(Pt(),Lt("li",{key:V.nodeId},[J("span",pA,It(lt(V.nodeId)),1),J("span",mA,It(V.reason),1)]))),128))])):(Pt(),Lt("div",gA,"暂无推荐信息"))],64)):Ce("",!0)])],4)),[[W_,N.value]]):l.value?(Pt(),Lt("div",_A,[J("button",{type:"button",class:"hint-dismiss","aria-label":"关闭",onClick:Ni(Dt,["stop"])},"×"),y[9]||(y[9]=J("p",{class:"promo-title"},"个人专业星图",-1)),J("button",{type:"button",class:"btn promo-cta",onClick:gt},"进入个人星图")])):Ce("",!0)],64))])}}}),xA=Gi(vA,[["__scopeId","data-v-3c284e53"]]),yA={class:"hub"},MA=mi({__name:"PersonalGalaxyHubView",setup(n){const t=Mn(no);if(!t)throw new Error("[PersonalGalaxyHubView] router inject failed");function e(){t.push({path:"/personal/design"})}function i(){t.push({path:"/personal/showcase"})}function s(){t.replace({path:"/galaxy"})}return(r,o)=>(Pt(),Lt("div",yA,[J("header",{class:"bar"},[J("button",{type:"button",class:"ghost",onClick:s},"← 大星图"),o[0]||(o[0]=J("div",{class:"bar-center"},[J("p",{class:"eyebrow"},"OfferCat · Galaxy"),J("h1",{class:"title"},"个人专业星图")],-1)),o[1]||(o[1]=J("span",{class:"spacer","aria-hidden":"true"},null,-1))]),J("main",{class:"main"},[o[4]||(o[4]=J("p",{class:"lead"}," 与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。 ",-1)),J("button",{type:"button",class:"card card--primary",onClick:e},[...o[2]||(o[2]=[J("span",{class:"card-kicker"},"编辑",-1),J("span",{class:"card-title"},"设计专属星图",-1),J("span",{class:"card-desc"},"添加大行星、连边、三选一岗位，保存到本机。",-1)])]),J("button",{type:"button",class:"card card--ghost",onClick:i},[...o[3]||(o[3]=[J("span",{class:"card-kicker"},"只读",-1),J("span",{class:"card-title"},"展示已保存星图",-1),J("span",{class:"card-desc"},"进入前请先在设计页保存至少一颗大行星或一条融合。",-1)])])])]))}}),SA=Gi(MA,[["__scopeId","data-v-6f79a23c"]]);function EA(){try{const n=sessionStorage.getItem(pa);if(!n)return!1;const t=JSON.parse(n);return!!(t!=null&&t.fromId&&(t!=null&&t.toId)&&t.fromId!==t.toId)}catch{return!1}}function bA(n){if(!EA()){n.replace({name:"select"});return}n.replace({name:"galaxy"})}function TA(n){n.push({name:"personalDesign"})}function AA(){try{const n=window.history.state;return n!=null&&n.back!=null&&n.back!==""}catch{return!1}}function Nm(n,t){if(AA()){n.back();return}n.replace(t)}function wA(n){bA(n)}const RA={class:"personal-root"},CA={key:0,class:"loading-overlay"},PA={key:1,class:"err-banner"},DA={key:2,class:"save-toast"},IA={class:"control-panel"},LA={class:"tb-block"},UA={class:"major-grid"},NA=["onClick"],OA=["disabled"],FA={class:"tb-block"},BA={key:0,class:"hint"},zA={key:0,class:"tb-block fusion-strip"},kA={class:"fusion-strip-title"},HA={key:1,class:"tb-block"},VA={class:"mono"},GA={key:2,class:"tb-block muted"},WA={id:"fusion-sheet-heading",class:"fusion-sheet-title"},XA={class:"fusion-sheet-dl"},jA={class:"modal"},qA=["onClick"],YA={class:"jt"},$A={class:"jd"},KA=mi({__name:"PersonalGalaxyView",setup(n){const t=io(),e=Wt("loading"),i=Wt(""),s=Wt(null),r=Wt(!1),o=Wt(null),a=Wt([]),l=Wt([]),c=Wt({open:!1,aId:"",bId:"",options:[]}),u=Wt(null),f=Wt(""),h=Wt(null),d=tr(null),g=Zt(()=>Xp(a.value,l.value)),_=Zt(()=>u.value?as(u.value,g.value.hyperedges).memberIds:new Set),m=Zt(()=>u.value?new Set(as(u.value,g.value.hyperedges).hyperedgeIds):new Set),p=Zt(()=>({pathIds:new Set,selectedId:u.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));on(p,P=>{var N;(N=d.value)==null||N.setVisualState(P)});const S=Zt(()=>u.value?l.value.find(P=>P.id===u.value)??null:null),A=Zt(()=>u.value?a.value.find(P=>P.id===u.value)??null:null);function M(){var Q;const P=h.value,N=g.value;if((Q=d.value)==null||Q.dispose(),d.value=null,!P||N.nodes.length===0)return;const O=xu(N.nodes);d.value=Fu(P,N,p.value,j=>{if(u.value=j,!j||!r.value||!a.value.some(pt=>pt.id===j))return;if(!o.value){o.value=j;return}if(o.value===j)return;const nt=a.value.find(pt=>pt.id===o.value),X=a.value.find(pt=>pt.id===j);!nt||!X||G(nt,X)},{ambientStarBoost:O}),d.value.setVisualState(p.value),d.value.frameBounds(N.nodes.map(j=>j.id))}on(g,async()=>{e.value==="ready"&&(await ls(),M())});async function G(P,N){try{const O=await ga(P.majorId,N.majorId);if(O.length===0){i.value=`《具体专业》表中暂无「${P.label}×${N.label}」组合的三岗数据，请换一对学科。`,o.value=null;return}c.value={open:!0,aId:P.id,bId:N.id,options:O}}catch(O){i.value=O instanceof Error?O.message:"加载岗位表失败"}finally{o.value=null}}function I(P){const{aId:N,bId:O,options:Q}=c.value,j=`f_${Date.now()}`,U=Q.findIndex(pt=>pt.idx===P.idx),nt={id:j,title:P.title,majorA:N,majorB:O,row:P,jobSlot:U>=0?U:void 0},X=ki(nt,a.value);l.value.push({...nt,packKey:X??void 0}),c.value.open=!1,c.value.options=[],r.value=!1,u.value=j}function D(){c.value.open=!1,c.value.options=[],o.value=null}function L(){if(!s.value)return;const P=Hr.find(O=>O.id===s.value);if(!P)return;const N=`m_${s.value}_${Date.now()}`;a.value.push({id:N,majorId:P.id,label:P.label}),s.value=null}async function b(){const P=Qv(a.value,l.value);jp(P),(await ex(P)).ok?f.value="已保存到本地，并已同步服务端。":so()?f.value="已保存到本地（同步服务端失败，请稍后重试）。":ms()?f.value="已保存到本机（星图 API 未注入，未同步云端）。":f.value="已保存到本机（未识别登录用户，未同步云端）。",window.setTimeout(()=>{f.value=""},3200)}function E(){Nm(t,{name:"personalHub"})}return La(async()=>{var N;if(!Bu()){e.value="error",i.value="当前环境不支持 WebGL";return}try{await ga("major_electrical","major_law")}catch(O){e.value="error",i.value=O instanceof Error?O.message:"预加载岗位表失败";return}const P=await $r();(N=P==null?void 0:P.majors)!=null&&N.length&&(a.value=[...P.majors],l.value=[...P.fusions]),e.value="ready",await ls(),M()}),Ua(()=>{var P;(P=d.value)==null||P.dispose(),d.value=null}),(P,N)=>(Pt(),Lt("div",RA,[e.value==="loading"?(Pt(),Lt("div",CA,"加载岗位数据…")):Ce("",!0),e.value==="error"?(Pt(),Lt("div",PA,It(i.value),1)):Ce("",!0),J("header",{class:"top-bar"},[J("button",{type:"button",class:"back-btn",onClick:E},"返回"),N[4]||(N[4]=J("div",{class:"top-titles"},[J("h1",{class:"title"},"设计专属星图"),J("p",{class:"subtitle"},"与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。")],-1)),J("button",{type:"button",class:"save-btn",onClick:b},"保存星系")]),f.value?(Pt(),Lt("p",DA,It(f.value),1)):Ce("",!0),J("div",{ref_key:"canvasHost",ref:h,class:"canvas-wrap"},null,512),J("div",IA,[J("section",LA,[N[5]||(N[5]=J("p",{class:"label"},"① 添加大行星（10 学科）",-1)),J("div",UA,[(Pt(!0),Lt(be,null,Bi(dn(Hr),O=>(Pt(),Lt("button",{key:O.id,type:"button",class:Fi(["chip",{active:s.value===O.id}]),onClick:Q=>s.value=O.id},It(O.label),11,NA))),128))]),J("button",{type:"button",class:"primary full",disabled:!s.value,onClick:L}," 放入星空 ",8,OA)]),J("section",FA,[N[6]||(N[6]=J("p",{class:"label"},"② 连边并生成交叉岗位",-1)),J("button",{type:"button",class:Fi(["secondary full",{on:r.value}]),onClick:N[0]||(N[0]=O=>{r.value=!r.value,o.value=null})},It(r.value?"连边模式已开 · 依次点两颗大行星":"开启连边模式"),3),r.value?(Pt(),Lt("p",BA,"在星空中先点一颗，再点另一颗；有数据则弹出三选一。")):Ce("",!0)]),S.value?(Pt(),Lt("section",zA,[N[7]||(N[7]=J("p",{class:"label"},"当前小行星",-1)),J("p",kA,It(S.value.title),1),N[8]||(N[8]=J("p",{class:"hint fusion-strip-hint"},"四象详情见下方弹层；点击星空空白处可取消选中。",-1))])):A.value?(Pt(),Lt("section",HA,[N[9]||(N[9]=J("p",{class:"label"},"当前选中",-1)),J("p",VA,"大行星 · "+It(A.value.label),1)])):(Pt(),Lt("section",GA,[...N[10]||(N[10]=[J("p",{class:"hint"},"提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。",-1)])]))]),(Pt(),cs(Xr,{to:"body"},[S.value?(Pt(),Lt("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"fusion-sheet-heading",onClick:N[3]||(N[3]=Ni(O=>u.value=null,["self"]))},[J("div",{class:"fusion-sheet",onClick:N[2]||(N[2]=Ni(()=>{},["stop"]))},[N[15]||(N[15]=J("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),J("h3",WA,It(S.value.title),1),N[16]||(N[16]=J("p",{class:"fusion-sheet-sub"},"四象属性（岗位表 · 完整）",-1)),J("dl",XA,[N[11]||(N[11]=J("dt",null,"热度/年薪",-1)),J("dd",null,It(S.value.row.heat)+" · 初级年薪 "+It(S.value.row.salaryJunior)+" · 中级年薪 "+It(S.value.row.salaryMid),1),N[12]||(N[12]=J("dt",null,"强度/竞争",-1)),J("dd",null,It(S.value.row.workIntensity)+"级 · "+It(S.value.row.competition),1),N[13]||(N[13]=J("dt",null,"学历门槛",-1)),J("dd",null,It(S.value.row.education),1),N[14]||(N[14]=J("dt",null,"学科技能",-1)),J("dd",null,It(S.value.row.skills),1)]),J("button",{type:"button",class:"fusion-sheet-close",onClick:N[1]||(N[1]=O=>u.value=null)},"收起")])])):Ce("",!0)])),(Pt(),cs(Xr,{to:"body"},[c.value.open?(Pt(),Lt("div",{key:0,class:"modal-mask",onClick:Ni(D,["self"])},[J("div",jA,[N[17]||(N[17]=J("h2",null,"三选一 · 确立小行星",-1)),N[18]||(N[18]=J("p",{class:"modal-sub"},"数据来源：《具体专业》岗位表（同组合前三条）",-1)),J("ul",null,[(Pt(!0),Lt(be,null,Bi(c.value.options,(O,Q)=>(Pt(),Lt("li",{key:Q},[J("button",{type:"button",class:"job-btn",onClick:j=>I(O)},[J("span",YA,It(O.title),1),J("span",$A,It(O.heat)+" · 中级年薪 "+It(O.salaryMid)+" · 竞争 "+It(O.competition),1)],8,qA)]))),128))]),J("button",{type:"button",class:"ghost full",onClick:D},"取消")])])):Ce("",!0)]))]))}}),ZA=Gi(KA,[["__scopeId","data-v-c1f0e97c"]]),Om="offercat_starlit_leaderboard_v1",Fm="offercat_starlit_self_name_v1";function kl(){return{v:1,entries:[]}}function JA(){try{const n=localStorage.getItem(Om);if(!n)return kl();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.entries)?kl():t}catch{return kl()}}function QA(n){try{localStorage.setItem(Om,JSON.stringify(n))}catch{}}function Kc(){var n;try{const t=(n=localStorage.getItem(Fm))==null?void 0:n.trim();if(t)return t}catch{}return"我"}function t1(n){try{localStorage.setItem(Fm,n.trim().slice(0,20)||"我")}catch{}}async function e1(n,t){const e=n??ms()??0;if(e>0)try{const{fetchStarlitLeaderboard:i}=await ps(async()=>{const{fetchStarlitLeaderboard:r}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchStarlitLeaderboard:r}},[],import.meta.url);return(await i(e,t)).rows.map(r=>({id:r.self?"__self__":`u_${r.userId}`,displayName:r.displayName,totalStars:r.totalStars,updatedAt:Date.now(),isSelf:r.self}))}catch{}return Zc()}function Zc(){const n=ix(),t=Kc(),e="__self__",i=Date.now();let r=JA().entries.filter(l=>l.id!==e);r.length||(r=[{id:"demo_1",displayName:"星尘旅人",totalStars:Math.max(0,n-12),updatedAt:i-864e5},{id:"demo_2",displayName:"交叉探索者",totalStars:Math.max(0,n-28),updatedAt:i-1728e5},{id:"demo_3",displayName:"轨道观测员",totalStars:Math.max(0,n-45),updatedAt:i-2592e5}]);const o={id:e,displayName:t,totalStars:n,updatedAt:i,isSelf:!0},a=[...r.filter(l=>l.id!==e),o];return a.sort((l,c)=>c.totalStars-l.totalStars||l.displayName.localeCompare(c.displayName,"zh")),QA({v:1,entries:a.map(({isSelf:l,...c})=>c)}),a.map(l=>({...l,isSelf:l.id===e}))}const n1={class:"lb-head"},i1={class:"lb-sub"},s1={class:"lb-name-row"},r1={class:"lb-hint"},o1={class:"lb-list"},a1={class:"lb-rank"},l1={class:"lb-name"},c1={class:"lb-stars"},u1=mi({__name:"StarlitLeaderboardPanel",props:{open:{type:Boolean},fusionIds:{},userId:{},packKeys:{}},emits:["close"],setup(n,{emit:t}){const e=n,i=t,s=Wt(Zc()),r=Wt(Kc()),o=Zt(()=>$p(e.fusionIds));async function a(){const c=e.userId??0;s.value=c>0?await e1(c,e.packKeys):Zc(),r.value=Kc()}function l(){t1(r.value),a()}return on(()=>e.open,c=>{c&&a()}),on(()=>e.fusionIds,()=>{e.open&&a()},{deep:!0}),(c,u)=>(Pt(),cs(Xr,{to:"body"},[n.open?(Pt(),Lt("div",{key:0,class:"lb-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"starlit-lb-title",onClick:u[3]||(u[3]=Ni(f=>i("close"),["self"]))},[J("div",{class:"lb-card",onClick:u[2]||(u[2]=Ni(()=>{},["stop"]))},[J("header",n1,[J("div",null,[u[4]||(u[4]=J("h2",{id:"starlit-lb-title",class:"lb-title"},"点亮排行榜",-1)),J("p",i1,"按已点亮星数排序 · 本星系合计 "+It(o.value)+" 星",1)]),J("button",{type:"button",class:"lb-close","aria-label":"关闭",onClick:u[0]||(u[0]=f=>i("close"))},"×")]),J("div",s1,[u[5]||(u[5]=J("label",{class:"lb-name-label",for:"lb-self-name"},"我的昵称",-1)),$d(J("input",{id:"lb-self-name","onUpdate:modelValue":u[1]||(u[1]=f=>r.value=f),class:"lb-name-input",maxlength:"20",placeholder:"展示在榜上",onChange:l,onKeydown:f0(l,["enter"])},null,544),[[a0,r.value]])]),J("p",r1," 总星数 = 各小行星点亮之和（每颗最多 "+It(dn(us))+"）。已配置网关时从服务端拉取全站排行。 ",1),J("ol",o1,[(Pt(!0),Lt(be,null,Bi(s.value,(f,h)=>(Pt(),Lt("li",{key:f.id,class:Fi(["lb-row",{self:f.isSelf}])},[J("span",a1,It(h+1),1),J("span",l1,It(f.displayName),1),J("span",c1,It(f.totalStars)+" 星",1)],2))),128))])])])):Ce("",!0)]))}}),f1=Gi(u1,[["__scopeId","data-v-d6ee7af2"]]);function h1(){if(typeof window>"u")return!1;if(window.plus)return!0;try{return/uni-app/i.test(navigator.userAgent)||/Html5Plus/i.test(navigator.userAgent)}catch{return!1}}const d1={class:"showcase-root"},p1={class:"bar"},m1={class:"mid"},g1={key:0,class:"sub"},_1={key:1,class:"sub muted"},v1={key:0,class:"overlay"},x1={key:1,class:"overlay err"},y1={key:2,class:"overlay empty"},M1={class:"lb-fab-sub"},S1={id:"showcase-fusion-title",class:"fusion-sheet-title"},E1={class:"fusion-sheet-dl"},b1={class:"starlit-hint"},T1=mi({__name:"PersonalGalaxyShowcaseView",setup(n){const t=io(),e=Bp(),i=Wt("loading"),s=Wt(""),r=tr(null),o=Wt(null),a=Wt(!1),l=Wt(0),c=Wt([]),u=Zt(()=>ms()),f=Zt(()=>!h1()),h=Wt(null),d=tr(null),g=Zt(()=>{const j=r.value;return j?Xp(j.majors,j.fusions):null}),_=Zt(()=>!o.value||!g.value?new Set:as(o.value,g.value.hyperedges).memberIds),m=Zt(()=>!o.value||!g.value?new Set:new Set(as(o.value,g.value.hyperedges).hyperedgeIds)),p=Zt(()=>({pathIds:new Set,selectedId:o.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));on(p,j=>{var U;(U=d.value)==null||U.setVisualState(j)});const S=Zt(()=>!o.value||!r.value?null:r.value.fusions.find(j=>j.id===o.value)??null),A=Zt(()=>{var j;return!o.value||!g.value?"":((j=g.value.nodes.find(U=>U.id===o.value))==null?void 0:j.label)??""}),M=Zt(()=>{var j;return l.value,((j=r.value)==null?void 0:j.fusions.map(U=>U.id))??[]}),G=Zt(()=>(l.value,$p(M.value)));function I(){l.value+=1,i.value==="ready"&&b()}async function D(){var U;I();const j=((U=r.value)==null?void 0:U.fusions)??[];c.value=j.map(nt=>{var X;return ki(nt,(X=r.value)==null?void 0:X.majors)}).filter(nt=>!!nt),a.value=!0}function L(j){(j.key===null||j.key==="offercat_personal_starlit_v1")&&I()}function b(){var X;const j=h.value,U=g.value;if((X=d.value)==null||X.dispose(),d.value=null,!j||!U||U.nodes.length===0)return;const nt=xu(U.nodes);d.value=Fu(j,U,p.value,pt=>{o.value=pt},{ambientStarBoost:nt}),d.value.setVisualState(p.value),d.value.frameBounds(U.nodes.map(pt=>pt.id))}function E(){TA(t)}function P(){Nm(t,{name:"personalHub"})}function N(){o.value=null}function O(){var nt;const j=S.value;if(!j)return;const U=j.packKey??ki(j,(nt=r.value)==null?void 0:nt.majors)??"";t.push({name:"personalStarlit",query:{fusionId:j.id,title:j.title,...U?{packKey:U}:{}}})}on(()=>e.fullPath,async()=>{var j,U;e.name==="personalShowcase"&&(I(),i.value==="ready"&&(r.value=await $r(),(U=(j=r.value)==null?void 0:j.fusions)!=null&&U.length&&await rc(r.value.fusions),I(),await ls(),b()))});const Q=()=>D();return La(async()=>{var U;if(window.addEventListener("storage",L),window.addEventListener("galaxy-open-leaderboard",Q),window.__GALAXY_OPEN_LEADERBOARD__=()=>window.dispatchEvent(new CustomEvent("galaxy-open-leaderboard")),da("personalShowcase"),!Bu()){i.value="error",s.value="当前环境不支持 WebGL";return}const j=await $r();if(r.value=j,(U=j==null?void 0:j.fusions)!=null&&U.length&&await rc(j.fusions),!j||j.majors.length===0&&j.fusions.length===0){i.value="empty";return}i.value="ready",await ls(),I(),b()}),Ua(()=>{var j;window.removeEventListener("storage",L),window.removeEventListener("galaxy-open-leaderboard",Q),delete window.__GALAXY_OPEN_LEADERBOARD__,da(e.name),(j=d.value)==null||j.dispose(),d.value=null}),(j,U)=>(Pt(),Lt("div",d1,[J("header",p1,[J("button",{type:"button",class:"ghost",onClick:P},"返回"),J("div",m1,[U[2]||(U[2]=J("h1",{class:"title"},"展示星图",-1)),A.value?(Pt(),Lt("p",g1,It(A.value),1)):(Pt(),Lt("p",_1,"点击小行星查看四象与点亮星辰"))]),f.value?(Pt(),Lt("button",{key:0,type:"button",class:"lb-trigger",onClick:D}," 排行榜 · "+It(G.value)+" 星 ",1)):Ce("",!0)]),i.value==="loading"?(Pt(),Lt("div",v1,"加载…")):i.value==="error"?(Pt(),Lt("div",x1,It(s.value),1)):i.value==="empty"?(Pt(),Lt("div",y1,[U[3]||(U[3]=J("p",null,"还没有已保存的个人星系。",-1)),J("button",{type:"button",class:"cta",onClick:E},"返回去设计")])):(Pt(),Lt("div",{key:3,ref_key:"canvasHost",ref:h,class:"canvas"},null,512)),(Pt(),cs(Xr,{to:"body"},[i.value==="ready"&&f.value?(Pt(),Lt("button",{key:0,type:"button",class:"lb-fab","aria-label":"打开点亮排行榜",onClick:D},[U[4]||(U[4]=J("span",{class:"lb-fab-title"},"排行榜",-1)),J("span",M1,It(G.value)+" 星",1)])):Ce("",!0)])),(Pt(),cs(Xr,{to:"body"},[S.value?(Pt(),Lt("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"showcase-fusion-title",onClick:Ni(N,["self"])},[J("div",{class:"fusion-sheet",onClick:U[0]||(U[0]=Ni(()=>{},["stop"]))},[U[10]||(U[10]=J("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),J("h2",S1,It(S.value.title),1),U[11]||(U[11]=J("p",{class:"fusion-sheet-sub"},"四象属性 · 已保存数据",-1)),J("dl",E1,[U[5]||(U[5]=J("dt",null,"热度/年薪",-1)),J("dd",null,It(S.value.row.heat)+" · 初级年薪 "+It(S.value.row.salaryJunior)+" · 中级年薪 "+It(S.value.row.salaryMid),1),U[6]||(U[6]=J("dt",null,"强度/竞争",-1)),J("dd",null,It(S.value.row.workIntensity)+"级 · "+It(S.value.row.competition),1),U[7]||(U[7]=J("dt",null,"学历门槛",-1)),J("dd",null,It(S.value.row.education),1),U[8]||(U[8]=J("dt",null,"学科技能",-1)),J("dd",null,It(S.value.row.skills),1)]),J("p",b1,[U[9]||(U[9]=Jl(" 已点亮 ",-1)),J("strong",null,It(dn(ro)(S.value.id)),1),Jl(" / "+It(dn(us))+" 颗星（本图合计 "+It(G.value)+" 星）；答题正确可继续点亮。 ",1)]),J("button",{type:"button",class:"fusion-sheet-primary",onClick:O},"点亮星辰 · 去答题"),J("button",{type:"button",class:"fusion-sheet-close",onClick:N},"收起")])])):Ce("",!0)])),Ze(f1,{open:a.value,"fusion-ids":M.value,"user-id":u.value??void 0,"pack-keys":c.value,onClose:U[1]||(U[1]=nt=>a.value=!1)},null,8,["open","fusion-ids","user-id","pack-keys"])]))}}),A1=Gi(T1,[["__scopeId","data-v-49b31dc5"]]),w1={class:"quiz-root"},R1={class:"bar"},C1={class:"mid"},P1={class:"sub"},D1={key:0,class:"sub api-tag"},I1={key:0,class:"empty"},L1={class:"star-strip","aria-label":"已点亮星数"},U1={class:"star-label"},N1={class:"star-dots",role:"list"},O1={key:0,class:"loading"},F1={key:1,class:"load-err"},B1={key:2,class:"done"},z1={key:3,class:"q-card"},k1={class:"q-text"},H1={class:"q-opts"},V1=["onClick"],G1={key:4,class:"toast",role:"status"},W1={class:"foot"},X1=mi({__name:"PersonalStarlitQuizView",setup(n){const t=Bp(),e=io(),i=Zt(()=>String(t.query.fusionId||"")),s=Zt(()=>{const L=t.query.packKey;return typeof L=="string"&&L.trim()?L.trim():""}),r=Zt(()=>{const L=t.query.title;if(typeof L=="string"&&L.trim())return L;const b=i.value;if(!b)return"小行星";const E=ka(),P=E==null?void 0:E.fusions.find(N=>N.id===b);return(P==null?void 0:P.title)??"小行星"});function o(L){const b=[],E=["正确","错误","视场景而定","以上皆非"];for(let P=0;P<$f;P++){const N=P%4,O=`【${L}】第 ${P+1} / ${$f} 题（占位）：与交叉岗位相关的表述，选项「${E[N]}」为本题预设答案。`;b.push({idx:P,text:O,options:[...E],correct:N})}return b}const a=Wt([]),l=Wt(0),c=Wt(0),u=Wt(""),f=Wt(!1),h=Wt(!1),d=Wt("mock"),g=Wt(""),_=Wt(""),m=Zt(()=>{const L=a.value.length;return L>0?Math.min(us,L):us});async function p(L,b){var O;let E=ki(L,b);if(E)return E;const P=Li(L.majorA,b),N=Li(L.majorB,b);if(!P||!N)return null;try{const Q=await ga(P,N);if(!Q.length)return null;let j=L.jobSlot??0,U=L.row;if((O=L.title)!=null&&O.trim()){const nt=Q.findIndex(X=>X.title===L.title);nt>=0&&(j=nt,U=Q[nt])}return U||(U=Q[j]??Q[0]),E=ki({...L,row:U,jobSlot:j},b),E}catch{return null}}async function S(L,b){var E;h.value=!0,g.value="",_.value="",a.value=[];try{const P=await $r();if(!(za().length>0))g.value="未注入星图 API（请从 App 星图入口进入并确认网关地址）";else if(!((E=P==null?void 0:P.fusions)!=null&&E.length))g.value="未找到个人星图数据，请先在「设计专属星图」保存后再答题";else{const O=P.fusions.find(Q=>Q.id===L);if(!O)g.value="当前小行星不在已保存星图中，请返回展示页重试";else{const Q=s.value||await p(O,P.majors)||"";if(Q){_.value=Q;const{fetchStarlitQuestions:j}=await ps(async()=>{const{fetchStarlitQuestions:nt}=await import("./galaxy-chunk-Bck2YTPA.js");return{fetchStarlitQuestions:nt}},[],import.meta.url),U=await j(Q);if(U.length>0){a.value=U.map(X=>({idx:X.questionNo-1,text:X.stem,options:X.options,correct:X.correctIndex})),d.value="api";const nt=m.value;c.value>nt&&(c.value=nt);return}g.value=`题库包「${Q}」暂无题目，请确认已导入 starlit_question_bank.sql`}else{const j=Li(O.majorA,P.majors),U=Li(O.majorB,P.majors);g.value=!j||!U?"无法识别两颗大行星学科，请回设计页重新放入星空并连边保存":"无法解析本题库 pack_key，请重新连边选择岗位后保存星系"}}}}catch(P){const N=P instanceof Error?P.message:"加载题库失败";g.value=_.value?`${N}（pack_key: ${_.value}）`:N}finally{a.value.length||(a.value=o(b),d.value="mock"),h.value=!1}}on([i,r],async([L])=>{var E;if(!L)return;const b=await $r();(E=b==null?void 0:b.fusions)!=null&&E.length&&await rc(b.fusions),c.value=ro(L),l.value=0,f.value=!1,await S(L,r.value)},{immediate:!0});const A=Zt(()=>a.value[l.value]??null);function M(L){u.value=L,window.setTimeout(()=>{u.value=""},1400)}function G(L){if(!i.value||f.value||!A.value)return;const b=A.value;if(L===b.correct){if(c.value=sx(i.value),M("点亮 +1 星"),l.value>=a.value.length-1||c.value>=m.value){f.value=!0;return}l.value+=1}else M("再想想看")}function I(){wA(e)}function D(){if(d.value==="api"){M("当前已是服务端题库");return}M(g.value||"题库未接通，请检查网关与 SQL 导入")}return(L,b)=>(Pt(),Lt("div",w1,[J("header",R1,[J("button",{type:"button",class:"ghost",onClick:I},"← 退出"),J("div",C1,[b[0]||(b[0]=J("h1",{class:"title"},"点亮星辰",-1)),J("p",P1,It(r.value),1),d.value==="api"?(Pt(),Lt("p",D1,"题库来自服务端")):Ce("",!0)]),b[1]||(b[1]=J("span",{class:"spacer"},null,-1))]),i.value?(Pt(),Lt(be,{key:1},[J("section",L1,[J("div",U1,"已点亮 "+It(c.value)+" / "+It(m.value)+" 星",1),J("div",N1,[(Pt(!0),Lt(be,null,Bi(m.value,E=>(Pt(),Lt("span",{key:E,class:Fi(["dot",{on:E<=c.value}]),role:"listitem"},null,2))),128))])]),h.value?(Pt(),Lt("div",O1,"加载题目…")):g.value&&d.value==="mock"?(Pt(),Lt("p",F1,It(g.value),1)):f.value?(Pt(),Lt("section",B1,[b[3]||(b[3]=J("p",null,"本套题目已完成或已达星数上限。",-1)),J("button",{type:"button",class:"cta",onClick:I},"返回展示星图")])):A.value?(Pt(),Lt("section",z1,[J("p",k1,It(A.value.text),1),J("div",H1,[(Pt(!0),Lt(be,null,Bi(A.value.options,(E,P)=>(Pt(),Lt("button",{key:P,type:"button",class:"q-opt",onClick:N=>G(P)},It(String.fromCharCode(65+P))+". "+It(E),9,V1))),128))])])):Ce("",!0),u.value?(Pt(),Lt("p",G1,It(u.value),1)):Ce("",!0),J("footer",W1,[J("button",{type:"button",class:"ghost wide",onClick:D},It(d.value==="api"?"题库已接通":"题库未接通 · 查看原因"),1)])],64)):(Pt(),Lt("div",I1,[b[2]||(b[2]=J("p",null,"缺少小行星参数。",-1)),J("button",{type:"button",class:"cta",onClick:I},"退出")]))]))}}),j1=Gi(X1,[["__scopeId","data-v-8b5b9be4"]]),q1=sv(void 0),Sa=Av({history:q1,routes:[{path:"/",name:"select",component:Vv},{path:"/galaxy",name:"galaxy",component:xA},{path:"/personal/design",name:"personalDesign",component:ZA},{path:"/personal/showcase",name:"personalShowcase",component:A1},{path:"/personal/starlit",name:"personalStarlit",component:j1},{path:"/personal",name:"personalHub",component:SA},{path:"/personal-galaxy",redirect:{name:"personalHub"}}]});Sa.afterEach(n=>{da(n.name)});Sa.isReady().then(()=>{da(Sa.currentRoute.value.name)});vu().catch(()=>{});p0(x0).use(Sa).mount("#app");export{za as a,Hp as g};
