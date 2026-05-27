(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function au(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const de={},Ks=[],jn=()=>{},Ed=()=>!1,Ta=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Aa=n=>n.startsWith("onUpdate:"),Ne=Object.assign,lu=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Gm=Object.prototype.hasOwnProperty,le=(n,t)=>Gm.call(n,t),Wt=Array.isArray,Zs=n=>ro(n)==="[object Map]",bd=n=>ro(n)==="[object Set]",Ku=n=>ro(n)==="[object Date]",Yt=n=>typeof n=="function",ye=n=>typeof n=="string",qn=n=>typeof n=="symbol",fe=n=>n!==null&&typeof n=="object",Td=n=>(fe(n)||Yt(n))&&Yt(n.then)&&Yt(n.catch),Ad=Object.prototype.toString,ro=n=>Ad.call(n),Wm=n=>ro(n).slice(8,-1),wd=n=>ro(n)==="[object Object]",cu=n=>ye(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,zr=au(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),wa=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Xm=/-\w/g,Je=wa(n=>n.replace(Xm,t=>t.slice(1).toUpperCase())),jm=/\B([A-Z])/g,ji=wa(n=>n.replace(jm,"-$1").toLowerCase()),Ra=wa(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ja=wa(n=>n?`on${Ra(n)}`:""),Xn=(n,t)=>!Object.is(n,t),$o=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Rd=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},uu=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Zu;const Ca=()=>Zu||(Zu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Pa(n){if(Wt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=ye(i)?Km(i):Pa(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(ye(n)||fe(n))return n}const qm=/;(?![^(]*\))/g,Ym=/:([^]+)/,$m=/\/\*[^]*?\*\//g;function Km(n){const t={};return n.replace($m,"").split(qm).forEach(e=>{if(e){const i=e.split(Ym);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Hi(n){let t="";if(ye(n))t=n;else if(Wt(n))for(let e=0;e<n.length;e++){const i=Hi(n[e]);i&&(t+=i+" ")}else if(fe(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Zm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Jm=au(Zm);function Cd(n){return!!n||n===""}function Qm(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=fu(n[i],t[i]);return e}function fu(n,t){if(n===t)return!0;let e=Ku(n),i=Ku(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=qn(n),i=qn(t),e||i)return n===t;if(e=Wt(n),i=Wt(t),e||i)return e&&i?Qm(n,t):!1;if(e=fe(n),i=fe(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!fu(n[o],t[o]))return!1}}return String(n)===String(t)}const Pd=n=>!!(n&&n.__v_isRef===!0),Nt=n=>ye(n)?n:n==null?"":Wt(n)||fe(n)&&(n.toString===Ad||!Yt(n.toString))?Pd(n)?Nt(n.value):JSON.stringify(n,Dd,2):String(n),Dd=(n,t)=>Pd(t)?Dd(n,t.value):Zs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Qa(i,r)+" =>"]=s,e),{})}:bd(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Qa(e))}:qn(t)?Qa(t):fe(t)&&!Wt(t)&&!wd(t)?String(t):t,Qa=(n,t="")=>{var e;return qn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ue;class tg{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ue&&(Ue.active?(this.parent=Ue,this.index=(Ue.scopes||(Ue.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Ue;try{return Ue=this,t()}finally{Ue=e}}}on(){++this._on===1&&(this.prevScope=Ue,Ue=this)}off(){if(this._on>0&&--this._on===0){if(Ue===this)Ue=this.prevScope;else{let t=Ue;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function eg(){return Ue}let ge;const tl=new WeakSet;class Ld{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ue&&(Ue.active?Ue.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,tl.has(this)&&(tl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ud(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Ju(this),Nd(this);const t=ge,e=Nn;ge=this,Nn=!0;try{return this.fn()}finally{Od(this),ge=t,Nn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)pu(t);this.deps=this.depsTail=void 0,Ju(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?tl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ql(this)&&this.run()}get dirty(){return ql(this)}}let Id=0,kr,Hr;function Ud(n,t=!1){if(n.flags|=8,t){n.next=Hr,Hr=n;return}n.next=kr,kr=n}function hu(){Id++}function du(){if(--Id>0)return;if(Hr){let t=Hr;for(Hr=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;kr;){let t=kr;for(kr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function Nd(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Od(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),pu(i),ng(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function ql(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Fd(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Fd(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Yr)||(n.globalVersion=Yr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ql(n))))return;n.flags|=2;const t=n.dep,e=ge,i=Nn;ge=n,Nn=!0;try{Nd(n);const s=n.fn(n._value);(t.version===0||Xn(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ge=e,Nn=i,Od(n),n.flags&=-3}}function pu(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)pu(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function ng(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let Nn=!0;const Bd=[];function mi(){Bd.push(Nn),Nn=!1}function gi(){const n=Bd.pop();Nn=n===void 0?!0:n}function Ju(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ge;ge=void 0;try{t()}finally{ge=e}}}let Yr=0;class ig{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class mu{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ge||!Nn||ge===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ge)e=this.activeLink=new ig(ge,this),ge.deps?(e.prevDep=ge.depsTail,ge.depsTail.nextDep=e,ge.depsTail=e):ge.deps=ge.depsTail=e,zd(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ge.depsTail,e.nextDep=void 0,ge.depsTail.nextDep=e,ge.depsTail=e,ge.deps===e&&(ge.deps=i)}return e}trigger(t){this.version++,Yr++,this.notify(t)}notify(t){hu();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{du()}}}function zd(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)zd(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Yl=new WeakMap,hs=Symbol(""),$l=Symbol(""),$r=Symbol("");function Be(n,t,e){if(Nn&&ge){let i=Yl.get(n);i||Yl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new mu),s.map=i,s.key=e),s.track()}}function li(n,t,e,i,s,r){const o=Yl.get(n);if(!o){Yr++;return}const a=l=>{l&&l.trigger()};if(hu(),t==="clear")o.forEach(a);else{const l=Wt(n),c=l&&cu(e);if(l&&e==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===$r||!qn(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get($r)),t){case"add":l?c&&a(o.get("length")):(a(o.get(hs)),Zs(n)&&a(o.get($l)));break;case"delete":l||(a(o.get(hs)),Zs(n)&&a(o.get($l)));break;case"set":Zs(n)&&a(o.get(hs));break}}du()}function ws(n){const t=ae(n);return t===n?t:(Be(t,"iterate",$r),En(n)?t:t.map(Fn))}function Da(n){return Be(n=ae(n),"iterate",$r),n}function Vn(n,t){return _i(n)?sr(ds(n)?Fn(t):t):Fn(t)}const sg={__proto__:null,[Symbol.iterator](){return el(this,Symbol.iterator,n=>Vn(this,n))},concat(...n){return ws(this).concat(...n.map(t=>Wt(t)?ws(t):t))},entries(){return el(this,"entries",n=>(n[1]=Vn(this,n[1]),n))},every(n,t){return Jn(this,"every",n,t,void 0,arguments)},filter(n,t){return Jn(this,"filter",n,t,e=>e.map(i=>Vn(this,i)),arguments)},find(n,t){return Jn(this,"find",n,t,e=>Vn(this,e),arguments)},findIndex(n,t){return Jn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Jn(this,"findLast",n,t,e=>Vn(this,e),arguments)},findLastIndex(n,t){return Jn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Jn(this,"forEach",n,t,void 0,arguments)},includes(...n){return nl(this,"includes",n)},indexOf(...n){return nl(this,"indexOf",n)},join(n){return ws(this).join(n)},lastIndexOf(...n){return nl(this,"lastIndexOf",n)},map(n,t){return Jn(this,"map",n,t,void 0,arguments)},pop(){return Er(this,"pop")},push(...n){return Er(this,"push",n)},reduce(n,...t){return Qu(this,"reduce",n,t)},reduceRight(n,...t){return Qu(this,"reduceRight",n,t)},shift(){return Er(this,"shift")},some(n,t){return Jn(this,"some",n,t,void 0,arguments)},splice(...n){return Er(this,"splice",n)},toReversed(){return ws(this).toReversed()},toSorted(n){return ws(this).toSorted(n)},toSpliced(...n){return ws(this).toSpliced(...n)},unshift(...n){return Er(this,"unshift",n)},values(){return el(this,"values",n=>Vn(this,n))}};function el(n,t,e){const i=Da(n),s=i[t]();return i!==n&&!En(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const rg=Array.prototype;function Jn(n,t,e,i,s,r){const o=Da(n),a=o!==n&&!En(n),l=o[t];if(l!==rg[t]){const f=l.apply(n,r);return a?Fn(f):f}let c=e;o!==n&&(a?c=function(f,h){return e.call(this,Vn(n,f),h,n)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Qu(n,t,e,i){const s=Da(n),r=s!==n&&!En(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,f){return a&&(a=!1,c=Vn(n,c)),e.call(this,c,Vn(n,u),f,n)}):e.length>3&&(o=function(c,u,f){return e.call(this,c,u,f,n)}));const l=s[t](o,...i);return a?Vn(n,l):l}function nl(n,t,e){const i=ae(n);Be(i,"iterate",$r);const s=i[t](...e);return(s===-1||s===!1)&&vu(e[0])?(e[0]=ae(e[0]),i[t](...e)):s}function Er(n,t,e=[]){mi(),hu();const i=ae(n)[t].apply(n,e);return du(),gi(),i}const og=au("__proto__,__v_isRef,__isVue"),kd=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(qn));function ag(n){qn(n)||(n=String(n));const t=ae(this);return Be(t,"has",n),t.hasOwnProperty(n)}class Hd{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?_g:Xd:r?Wd:Gd).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Wt(t);if(!s){let l;if(o&&(l=sg[e]))return l;if(e==="hasOwnProperty")return ag}const a=Reflect.get(t,e,He(t)?t:i);if((qn(e)?kd.has(e):og(e))||(s||Be(t,"get",e),r))return a;if(He(a)){const l=o&&cu(e)?a:a.value;return s&&fe(l)?Zl(l):l}return fe(a)?s?Zl(a):La(a):a}}class Vd extends Hd{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Wt(t)&&cu(e);if(!this._isShallow){const c=_i(r);if(!En(i)&&!_i(i)&&(r=ae(r),i=ae(i)),!o&&He(r)&&!He(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:le(t,e),l=Reflect.set(t,e,i,He(t)?t:s);return t===ae(s)&&(a?Xn(i,r)&&li(t,"set",e,i):li(t,"add",e,i)),l}deleteProperty(t,e){const i=le(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&li(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!qn(e)||!kd.has(e))&&Be(t,"has",e),i}ownKeys(t){return Be(t,"iterate",Wt(t)?"length":hs),Reflect.ownKeys(t)}}class lg extends Hd{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const cg=new Vd,ug=new lg,fg=new Vd(!0);const Kl=n=>n,vo=n=>Reflect.getPrototypeOf(n);function hg(n,t,e){return function(...i){const s=this.__v_raw,r=ae(s),o=Zs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?Kl:t?sr:Fn;return!t&&Be(r,"iterate",l?$l:hs),Ne(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function xo(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function dg(n,t){const e={get(s){const r=this.__v_raw,o=ae(r),a=ae(s);n||(Xn(s,a)&&Be(o,"get",s),Be(o,"get",a));const{has:l}=vo(o),c=t?Kl:n?sr:Fn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Be(ae(s),"iterate",hs),s.size},has(s){const r=this.__v_raw,o=ae(r),a=ae(s);return n||(Xn(s,a)&&Be(o,"has",s),Be(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ae(a),c=t?Kl:n?sr:Fn;return!n&&Be(l,"iterate",hs),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return Ne(e,n?{add:xo("add"),set:xo("set"),delete:xo("delete"),clear:xo("clear")}:{add(s){const r=ae(this),o=vo(r),a=ae(s),l=!t&&!En(s)&&!_i(s)?a:s;return o.has.call(r,l)||Xn(s,l)&&o.has.call(r,s)||Xn(a,l)&&o.has.call(r,a)||(r.add(l),li(r,"add",l,l)),this},set(s,r){!t&&!En(r)&&!_i(r)&&(r=ae(r));const o=ae(this),{has:a,get:l}=vo(o);let c=a.call(o,s);c||(s=ae(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?Xn(r,u)&&li(o,"set",s,r):li(o,"add",s,r),this},delete(s){const r=ae(this),{has:o,get:a}=vo(r);let l=o.call(r,s);l||(s=ae(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&li(r,"delete",s,void 0),c},clear(){const s=ae(this),r=s.size!==0,o=s.clear();return r&&li(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=hg(s,n,t)}),e}function gu(n,t){const e=dg(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(le(e,s)&&s in i?e:i,s,r)}const pg={get:gu(!1,!1)},mg={get:gu(!1,!0)},gg={get:gu(!0,!1)};const Gd=new WeakMap,Wd=new WeakMap,Xd=new WeakMap,_g=new WeakMap;function vg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function xg(n){return n.__v_skip||!Object.isExtensible(n)?0:vg(Wm(n))}function La(n){return _i(n)?n:_u(n,!1,cg,pg,Gd)}function jd(n){return _u(n,!1,fg,mg,Wd)}function Zl(n){return _u(n,!0,ug,gg,Xd)}function _u(n,t,e,i,s){if(!fe(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=xg(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function ds(n){return _i(n)?ds(n.__v_raw):!!(n&&n.__v_isReactive)}function _i(n){return!!(n&&n.__v_isReadonly)}function En(n){return!!(n&&n.__v_isShallow)}function vu(n){return n?!!n.__v_raw:!1}function ae(n){const t=n&&n.__v_raw;return t?ae(t):n}function yg(n){return!le(n,"__v_skip")&&Object.isExtensible(n)&&Rd(n,"__v_skip",!0),n}const Fn=n=>fe(n)?La(n):n,sr=n=>fe(n)?Zl(n):n;function He(n){return n?n.__v_isRef===!0:!1}function Gt(n){return qd(n,!1)}function rr(n){return qd(n,!0)}function qd(n,t){return He(n)?n:new Mg(n,t)}class Mg{constructor(t,e){this.dep=new mu,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ae(t),this._value=e?t:Fn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||En(t)||_i(t);t=i?t:ae(t),Xn(t,e)&&(this._rawValue=t,this._value=i?t:Fn(t),this.dep.trigger())}}function pn(n){return He(n)?n.value:n}const Sg={get:(n,t,e)=>t==="__v_raw"?n:pn(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return He(s)&&!He(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Yd(n){return ds(n)?n:new Proxy(n,Sg)}class Eg{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new mu(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Yr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ge!==this)return Ud(this,!0),!0}get value(){const t=this.dep.track();return Fd(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function bg(n,t,e=!1){let i,s;return Yt(n)?i=n:(i=n.get,s=n.set),new Eg(i,s,e)}const yo={},aa=new WeakMap;let is;function Tg(n,t=!1,e=is){if(e){let i=aa.get(e);i||aa.set(e,i=[]),i.push(n)}}function Ag(n,t,e=de){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=y=>s?y:En(y)||s===!1||s===0?ci(y,1):ci(y);let u,f,h,d,g=!1,_=!1;if(He(n)?(f=()=>n.value,g=En(n)):ds(n)?(f=()=>c(n),g=!0):Wt(n)?(_=!0,g=n.some(y=>ds(y)||En(y)),f=()=>n.map(y=>{if(He(y))return y.value;if(ds(y))return c(y);if(Yt(y))return l?l(y,2):y()})):Yt(n)?t?f=l?()=>l(n,2):n:f=()=>{if(h){mi();try{h()}finally{gi()}}const y=is;is=u;try{return l?l(n,3,[d]):n(d)}finally{is=y}}:f=jn,t&&s){const y=f,G=s===!0?1/0:s;f=()=>ci(y(),G)}const m=eg(),p=()=>{u.stop(),m&&m.active&&lu(m.effects,u)};if(r&&t){const y=t;t=(...G)=>{y(...G),p()}}let S=_?new Array(n.length).fill(yo):yo;const A=y=>{if(!(!(u.flags&1)||!u.dirty&&!y))if(t){const G=u.run();if(s||g||(_?G.some((L,D)=>Xn(L,S[D])):Xn(G,S))){h&&h();const L=is;is=u;try{const D=[G,S===yo?void 0:_&&S[0]===yo?[]:S,d];S=G,l?l(t,3,D):t(...D)}finally{is=L}}}else u.run()};return a&&a(A),u=new Ld(f),u.scheduler=o?()=>o(A,!1):A,d=y=>Tg(y,!1,u),h=u.onStop=()=>{const y=aa.get(u);if(y){if(l)l(y,4);else for(const G of y)G();aa.delete(u)}},t?i?A(!0):S=u.run():o?o(A.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function ci(n,t=1/0,e){if(t<=0||!fe(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,He(n))ci(n.value,t,e);else if(Wt(n))for(let i=0;i<n.length;i++)ci(n[i],t,e);else if(bd(n)||Zs(n))n.forEach(i=>{ci(i,t,e)});else if(wd(n)){for(const i in n)ci(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ci(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function oo(n,t,e,i){try{return i?n(...i):n()}catch(s){Ia(s,t,e)}}function Yn(n,t,e,i){if(Yt(n)){const s=oo(n,t,e,i);return s&&Td(s)&&s.catch(r=>{Ia(r,t,e)}),s}if(Wt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Yn(n[r],t,e,i));return s}}function Ia(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||de;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){mi(),oo(r,null,10,[n,l,c]),gi();return}}wg(n,e,s,i,o)}function wg(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const $e=[];let Hn=-1;const Js=[];let Li=null,Gs=0;const $d=Promise.resolve();let la=null;function ms(n){const t=la||$d;return n?t.then(this?n.bind(this):n):t}function Rg(n){let t=Hn+1,e=$e.length;for(;t<e;){const i=t+e>>>1,s=$e[i],r=Kr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function xu(n){if(!(n.flags&1)){const t=Kr(n),e=$e[$e.length-1];!e||!(n.flags&2)&&t>=Kr(e)?$e.push(n):$e.splice(Rg(t),0,n),n.flags|=1,Kd()}}function Kd(){la||(la=$d.then(Jd))}function Cg(n){Wt(n)?Js.push(...n):Li&&n.id===-1?Li.splice(Gs+1,0,n):n.flags&1||(Js.push(n),n.flags|=1),Kd()}function tf(n,t,e=Hn+1){for(;e<$e.length;e++){const i=$e[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;$e.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Zd(n){if(Js.length){const t=[...new Set(Js)].sort((e,i)=>Kr(e)-Kr(i));if(Js.length=0,Li){Li.push(...t);return}for(Li=t,Gs=0;Gs<Li.length;Gs++){const e=Li[Gs];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Li=null,Gs=0}}const Kr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Jd(n){try{for(Hn=0;Hn<$e.length;Hn++){const t=$e[Hn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),oo(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Hn<$e.length;Hn++){const t=$e[Hn];t&&(t.flags&=-2)}Hn=-1,$e.length=0,Zd(),la=null,($e.length||Js.length)&&Jd()}}let hn=null,Qd=null;function ca(n){const t=hn;return hn=n,Qd=n&&n.type.__scopeId||null,t}function Pg(n,t=hn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&ha(-1);const r=ca(t);let o;try{o=n(...s)}finally{ca(r),i._d&&ha(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function tp(n,t){if(hn===null)return n;const e=za(hn),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=de]=t[s];r&&(Yt(r)&&(r={mounted:r,updated:r}),r.deep&&ci(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function $i(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(mi(),Yn(l,e,8,[n.el,a,n,t]),gi())}}function Ko(n,t){if(ze){let e=ze.provides;const i=ze.parent&&ze.parent.provides;i===e&&(e=ze.provides=Object.create(i)),e[n]=t}}function bn(n,t,e=!1){const i=I_();if(i||Qs){let s=Qs?Qs._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Yt(t)?t.call(i&&i.proxy):t}}const Dg=Symbol.for("v-scx"),Lg=()=>bn(Dg);function on(n,t,e){return ep(n,t,e)}function ep(n,t,e=de){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ne({},e),l=t&&i||!t&&r!=="post";let c;if(Qr){if(r==="sync"){const d=Lg();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=jn,d.resume=jn,d.pause=jn,d}}const u=ze;a.call=(d,g,_)=>Yn(d,u,g,_);let f=!1;r==="post"?a.scheduler=d=>{qe(d,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():xu(d)}),a.augmentJob=d=>{t&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=Ag(n,t,a);return Qr&&(c?c.push(h):l&&h()),h}function Ig(n,t,e){const i=this.proxy,s=ye(n)?n.includes(".")?np(i,n):()=>i[n]:n.bind(i,i);let r;Yt(t)?r=t:(r=t.handler,e=t);const o=ao(this),a=ep(s,r.bind(i),e);return o(),a}function np(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const Di=new WeakMap,ip=Symbol("_vte"),Ug=n=>n.__isTeleport,rs=n=>n&&(n.disabled||n.disabled===""),Ng=n=>n&&(n.defer||n.defer===""),ef=n=>typeof SVGElement<"u"&&n instanceof SVGElement,nf=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Jl=(n,t)=>{const e=n&&n.to;return ye(e)?t?t(e):null:e},Og={name:"Teleport",__isTeleport:!0,process(n,t,e,i,s,r,o,a,l,c){const{mc:u,pc:f,pbc:h,o:{insert:d,querySelector:g,createText:_,createComment:m,parentNode:p}}=c,S=rs(t.props);let{dynamicChildren:A}=t;const y=(D,U,b)=>{D.shapeFlag&16&&u(D.children,U,b,s,r,o,a,l)},G=(D=t)=>{const U=rs(D.props),b=D.target=Jl(D.props,g),E=Ql(b,D,_,d);b&&(o!=="svg"&&ef(b)?o="svg":o!=="mathml"&&nf(b)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(b),U||(y(D,b,E),Ur(D,!1)))},L=D=>{const U=()=>{if(Di.get(D)===U){if(Di.delete(D),rs(D.props)){const b=p(D.el)||e;y(D,b,D.anchor),Ur(D,!0)}G(D)}};Di.set(D,U),qe(U,r)};if(n==null){const D=t.el=_(""),U=t.anchor=_("");if(d(D,e,i),d(U,e,i),Ng(t.props)||r&&r.pendingBranch){L(t);return}S&&(y(t,e,U),Ur(t,!0)),G()}else{t.el=n.el;const D=t.anchor=n.anchor,U=Di.get(n);if(U){U.flags|=8,Di.delete(n),L(t);return}t.targetStart=n.targetStart;const b=t.target=n.target,E=t.targetAnchor=n.targetAnchor,P=rs(n.props),O=P?e:b,B=P?D:E;if(o==="svg"||ef(b)?o="svg":(o==="mathml"||nf(b))&&(o="mathml"),A?(h(n.dynamicChildren,A,O,s,r,o,a),Eu(n,t,!0)):l||f(n,t,O,B,s,r,o,a,!1),S)P?t.props&&n.props&&t.props.to!==n.props.to&&(t.props.to=n.props.to):Mo(t,e,D,c,1);else if((t.props&&t.props.to)!==(n.props&&n.props.to)){const K=t.target=Jl(t.props,g);K&&Mo(t,K,null,c,0)}else P&&Mo(t,b,E,c,1);Ur(t,S)}},remove(n,t,e,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:f,props:h}=n;let d=r||!rs(h);const g=Di.get(n);if(g&&(g.flags|=8,Di.delete(n),d=!1),f&&(s(c),s(u)),r&&s(l),o&16)for(let _=0;_<a.length;_++){const m=a[_];i(m,t,e,d,!!m.dynamicChildren)}},move:Mo,hydrate:Fg};function Mo(n,t,e,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,t,e);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=r===2;if(f&&i(o,t,e),!Di.has(n)&&(!f||rs(u))&&l&16)for(let h=0;h<c.length;h++)s(c[h],t,e,2);f&&i(a,t,e)}function Fg(n,t,e,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},f){function h(m,p){let S=p;for(;S;){if(S&&S.nodeType===8){if(S.data==="teleport start anchor")t.targetStart=S;else if(S.data==="teleport anchor"){t.targetAnchor=S,m._lpa=t.targetAnchor&&o(t.targetAnchor);break}}S=o(S)}}function d(m,p){p.anchor=f(o(m),p,a(m),e,i,s,r)}const g=t.target=Jl(t.props,l),_=rs(t.props);if(g){const m=g._lpa||g.firstChild;t.shapeFlag&16&&(_?(d(n,t),h(g,m),t.targetAnchor||Ql(g,t,u,c,a(n)===g?n:null)):(t.anchor=o(n),h(g,m),t.targetAnchor||Ql(g,t,u,c),f(m&&o(m),t,g,e,i,s,r))),Ur(t,_)}else _&&t.shapeFlag&16&&(d(n,t),t.targetStart=n,t.targetAnchor=o(n));return t.anchor&&o(t.anchor)}const Zr=Og;function Ur(n,t){const e=n.ctx;if(e&&e.ut){let i,s;for(t?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",e.uid),i=i.nextSibling;e.ut()}}function Ql(n,t,e,i,s=null){const r=t.targetStart=e(""),o=t.targetAnchor=e("");return r[ip]=o,n&&(i(r,n,s),i(o,n,s)),o}const Bg=Symbol("_leaveCb");function yu(n,t){n.shapeFlag&6&&n.component?(n.transition=t,yu(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function xi(n,t){return Yt(n)?Ne({name:n.name},t,{setup:n}):n}function sp(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function sf(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const ua=new WeakMap;function Vr(n,t,e,i,s=!1){if(Wt(n)){n.forEach((_,m)=>Vr(_,t&&(Wt(t)?t[m]:t),e,i,s));return}if(Gr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Vr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?za(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===de?a.refs={}:a.refs,f=a.setupState,h=ae(f),d=f===de?Ed:_=>sf(u,_)?!1:le(h,_),g=(_,m)=>!(m&&sf(u,m));if(c!=null&&c!==l){if(rf(t),ye(c))u[c]=null,d(c)&&(f[c]=null);else if(He(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(Yt(l))oo(l,a,12,[o,u]);else{const _=ye(l),m=He(l);if(_||m){const p=()=>{if(n.f){const S=_?d(l)?f[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Wt(S)&&lu(S,r);else if(Wt(S))S.includes(r)||S.push(r);else if(_)u[l]=[r],d(l)&&(f[l]=u[l]);else{const A=[r];g(l,n.k)&&(l.value=A),n.k&&(u[n.k]=A)}}else _?(u[l]=o,d(l)&&(f[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{p(),ua.delete(n)};S.id=-1,ua.set(n,S),qe(S,e)}else rf(n),p()}}}function rf(n){const t=ua.get(n);t&&(t.flags|=8,ua.delete(n))}Ca().requestIdleCallback;Ca().cancelIdleCallback;const Gr=n=>!!n.type.__asyncLoader,rp=n=>n.type.__isKeepAlive;function zg(n,t){op(n,"a",t)}function kg(n,t){op(n,"da",t)}function op(n,t,e=ze){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ua(t,i,e),e){let s=e.parent;for(;s&&s.parent;)rp(s.parent.vnode)&&Hg(i,t,e,s),s=s.parent}}function Hg(n,t,e,i){const s=Ua(t,n,i,!0);ap(()=>{lu(i[t],s)},e)}function Ua(n,t,e=ze,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{mi();const a=ao(e),l=Yn(t,e,n,o);return a(),gi(),l});return i?s.unshift(r):s.push(r),r}}const yi=n=>(t,e=ze)=>{(!Qr||n==="sp")&&Ua(n,(...i)=>t(...i),e)},Vg=yi("bm"),Na=yi("m"),Gg=yi("bu"),Wg=yi("u"),Oa=yi("bum"),ap=yi("um"),Xg=yi("sp"),jg=yi("rtg"),qg=yi("rtc");function Yg(n,t=ze){Ua("ec",n,t)}const $g="components";function Kg(n,t){return Jg($g,n,!0,t)||n}const Zg=Symbol.for("v-ndc");function Jg(n,t,e=!0,i=!1){const s=hn||ze;if(s){const r=s.type;{const a=B_(r,!1);if(a&&(a===t||a===Je(t)||a===Ra(Je(t))))return r}const o=of(s[n]||r[n],t)||of(s.appContext[n],t);return!o&&i?r:o}}function of(n,t){return n&&(n[t]||n[Je(t)]||n[Ra(Je(t))])}function Vi(n,t,e,i){let s;const r=e,o=Wt(n);if(o||ye(n)){const a=o&&ds(n);let l=!1,c=!1;a&&(l=!En(n),c=_i(n),n=Da(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=t(l?c?sr(Fn(n[u])):Fn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(fe(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const tc=n=>n?Ap(n)?za(n):tc(n.parent):null,Wr=Ne(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>tc(n.parent),$root:n=>tc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>cp(n),$forceUpdate:n=>n.f||(n.f=()=>{xu(n.update)}),$nextTick:n=>n.n||(n.n=ms.bind(n.proxy)),$watch:n=>Ig.bind(n)}),il=(n,t)=>n!==de&&!n.__isScriptSetup&&le(n,t),Qg={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(il(i,t))return o[t]=1,i[t];if(s!==de&&le(s,t))return o[t]=2,s[t];if(le(r,t))return o[t]=3,r[t];if(e!==de&&le(e,t))return o[t]=4,e[t];ec&&(o[t]=0)}}const c=Wr[t];let u,f;if(c)return t==="$attrs"&&Be(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==de&&le(e,t))return o[t]=4,e[t];if(f=l.config.globalProperties,le(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return il(s,t)?(s[t]=e,!0):i!==de&&le(i,t)?(i[t]=e,!0):le(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==de&&a[0]!=="$"&&le(n,a)||il(t,a)||le(r,a)||le(i,a)||le(Wr,a)||le(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:le(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function af(n){return Wt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let ec=!0;function t_(n){const t=cp(n),e=n.proxy,i=n.ctx;ec=!1,t.beforeCreate&&lf(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:S,destroyed:A,unmounted:y,render:G,renderTracked:L,renderTriggered:D,errorCaptured:U,serverPrefetch:b,expose:E,inheritAttrs:P,components:O,directives:B,filters:K}=t;if(c&&e_(c,i,null),o)for(const J in o){const N=o[J];Yt(N)&&(i[J]=N.bind(e))}if(s){const J=s.call(e,e);fe(J)&&(n.data=La(J))}if(ec=!0,r)for(const J in r){const N=r[J],Q=Yt(N)?N.bind(e,e):Yt(N.get)?N.get.bind(e,e):jn,vt=!Yt(N)&&Yt(N.set)?N.set.bind(e):jn,bt=Zt({get:Q,set:vt});Object.defineProperty(i,J,{enumerable:!0,configurable:!0,get:()=>bt.value,set:Ot=>bt.value=Ot})}if(a)for(const J in a)lp(a[J],i,e,J);if(l){const J=Yt(l)?l.call(e):l;Reflect.ownKeys(J).forEach(N=>{Ko(N,J[N])})}u&&lf(u,n,"c");function Y(J,N){Wt(N)?N.forEach(Q=>J(Q.bind(e))):N&&J(N.bind(e))}if(Y(Vg,f),Y(Na,h),Y(Gg,d),Y(Wg,g),Y(zg,_),Y(kg,m),Y(Yg,U),Y(qg,L),Y(jg,D),Y(Oa,S),Y(ap,y),Y(Xg,b),Wt(E))if(E.length){const J=n.exposed||(n.exposed={});E.forEach(N=>{Object.defineProperty(J,N,{get:()=>e[N],set:Q=>e[N]=Q,enumerable:!0})})}else n.exposed||(n.exposed={});G&&n.render===jn&&(n.render=G),P!=null&&(n.inheritAttrs=P),O&&(n.components=O),B&&(n.directives=B),b&&sp(n)}function e_(n,t,e=jn){Wt(n)&&(n=nc(n));for(const i in n){const s=n[i];let r;fe(s)?"default"in s?r=bn(s.from||i,s.default,!0):r=bn(s.from||i):r=bn(s),He(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function lf(n,t,e){Yn(Wt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function lp(n,t,e,i){let s=i.includes(".")?np(e,i):()=>e[i];if(ye(n)){const r=t[n];Yt(r)&&on(s,r)}else if(Yt(n))on(s,n.bind(e));else if(fe(n))if(Wt(n))n.forEach(r=>lp(r,t,e,i));else{const r=Yt(n.handler)?n.handler.bind(e):t[n.handler];Yt(r)&&on(s,r,n)}}function cp(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>fa(l,c,o,!0)),fa(l,t,o)),fe(t)&&r.set(t,l),l}function fa(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&fa(n,r,e,!0),s&&s.forEach(o=>fa(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=n_[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const n_={data:cf,props:uf,emits:uf,methods:Nr,computed:Nr,beforeCreate:Xe,created:Xe,beforeMount:Xe,mounted:Xe,beforeUpdate:Xe,updated:Xe,beforeDestroy:Xe,beforeUnmount:Xe,destroyed:Xe,unmounted:Xe,activated:Xe,deactivated:Xe,errorCaptured:Xe,serverPrefetch:Xe,components:Nr,directives:Nr,watch:s_,provide:cf,inject:i_};function cf(n,t){return t?n?function(){return Ne(Yt(n)?n.call(this,this):n,Yt(t)?t.call(this,this):t)}:t:n}function i_(n,t){return Nr(nc(n),nc(t))}function nc(n){if(Wt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Xe(n,t){return n?[...new Set([].concat(n,t))]:t}function Nr(n,t){return n?Ne(Object.create(null),n,t):t}function uf(n,t){return n?Wt(n)&&Wt(t)?[...new Set([...n,...t])]:Ne(Object.create(null),af(n),af(t??{})):t}function s_(n,t){if(!n)return t;if(!t)return n;const e=Ne(Object.create(null),n);for(const i in t)e[i]=Xe(n[i],t[i]);return e}function up(){return{app:null,config:{isNativeTag:Ed,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let r_=0;function o_(n,t){return function(i,s=null){Yt(i)||(i=Ne({},i)),s!=null&&!fe(s)&&(s=null);const r=up(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:r_++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:k_,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&Yt(u.install)?(o.add(u),u.install(c,...f)):Yt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||Ze(i,s);return d.appContext=r,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,za(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Yn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=Qs;Qs=c;try{return u()}finally{Qs=f}}};return c}}let Qs=null;const a_=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Je(t)}Modifiers`]||n[`${ji(t)}Modifiers`];function l_(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||de;let s=e;const r=t.startsWith("update:"),o=r&&a_(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>ye(u)?u.trim():u)),o.number&&(s=e.map(uu)));let a,l=i[a=Ja(t)]||i[a=Ja(Je(t))];!l&&r&&(l=i[a=Ja(ji(t))]),l&&Yn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Yn(c,n,6,s)}}const c_=new WeakMap;function fp(n,t,e=!1){const i=e?c_:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Yt(n)){const l=c=>{const u=fp(c,t,!0);u&&(a=!0,Ne(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(fe(n)&&i.set(n,null),null):(Wt(r)?r.forEach(l=>o[l]=null):Ne(o,r),fe(n)&&i.set(n,o),o)}function Fa(n,t){return!n||!Ta(t)?!1:(t=t.slice(2).replace(/Once$/,""),le(n,t[0].toLowerCase()+t.slice(1))||le(n,ji(t))||le(n,t))}function ff(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=n,m=ca(n);let p,S;try{if(e.shapeFlag&4){const y=s||i,G=y;p=Gn(c.call(G,y,u,f,d,h,g)),S=a}else{const y=t;p=Gn(y.length>1?y(f,{attrs:a,slots:o,emit:l}):y(f,null)),S=t.props?a:u_(a)}}catch(y){Xr.length=0,Ia(y,n,1),p=Ze(Gi)}let A=p;if(S&&_!==!1){const y=Object.keys(S),{shapeFlag:G}=A;y.length&&G&7&&(r&&y.some(Aa)&&(S=f_(S,r)),A=or(A,S,!1,!0))}return e.dirs&&(A=or(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(e.dirs):e.dirs),e.transition&&yu(A,e.transition),p=A,ca(m),p}const u_=n=>{let t;for(const e in n)(e==="class"||e==="style"||Ta(e))&&((t||(t={}))[e]=n[e]);return t},f_=(n,t)=>{const e={};for(const i in n)(!Aa(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function h_(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?hf(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(hp(o,i,h)&&!Fa(c,h))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?hf(i,o,c):!0:!!o;return!1}function hf(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(hp(t,n,r)&&!Fa(e,r))return!0}return!1}function hp(n,t,e){const i=n[e],s=t[e];return e==="style"&&fe(i)&&fe(s)?!fu(i,s):i!==s}function d_({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const dp={},pp=()=>Object.create(dp),mp=n=>Object.getPrototypeOf(n)===dp;function p_(n,t,e,i=!1){const s={},r=pp();n.propsDefaults=Object.create(null),gp(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:jd(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function m_(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ae(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Fa(n.emitsOptions,h))continue;const d=t[h];if(l)if(le(r,h))d!==r[h]&&(r[h]=d,c=!0);else{const g=Je(h);s[g]=ic(l,a,g,d,n,!1)}else d!==r[h]&&(r[h]=d,c=!0)}}}else{gp(n,t,s,r)&&(c=!0);let u;for(const f in a)(!t||!le(t,f)&&((u=ji(f))===f||!le(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(s[f]=ic(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!t||!le(t,f))&&(delete r[f],c=!0)}c&&li(n.attrs,"set","")}function gp(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(zr(l))continue;const c=t[l];let u;s&&le(s,u=Je(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Fa(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ae(e),c=a||de;for(let u=0;u<r.length;u++){const f=r[u];e[f]=ic(s,l,f,c[f],n,!le(c,f))}}return o}function ic(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=le(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Yt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=ao(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ji(e))&&(i=!0))}return i}const g_=new WeakMap;function _p(n,t,e=!1){const i=e?g_:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Yt(n)){const u=f=>{l=!0;const[h,d]=_p(f,t,!0);Ne(o,h),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return fe(n)&&i.set(n,Ks),Ks;if(Wt(r))for(let u=0;u<r.length;u++){const f=Je(r[u]);df(f)&&(o[f]=de)}else if(r)for(const u in r){const f=Je(u);if(df(f)){const h=r[u],d=o[f]=Wt(h)||Yt(h)?{type:h}:Ne({},h),g=d.type;let _=!1,m=!0;if(Wt(g))for(let p=0;p<g.length;++p){const S=g[p],A=Yt(S)&&S.name;if(A==="Boolean"){_=!0;break}else A==="String"&&(m=!1)}else _=Yt(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||le(d,"default"))&&a.push(f)}}const c=[o,a];return fe(n)&&i.set(n,c),c}function df(n){return n[0]!=="$"&&!zr(n)}const Mu=n=>n==="_"||n==="_ctx"||n==="$stable",Su=n=>Wt(n)?n.map(Gn):[Gn(n)],__=(n,t,e)=>{if(t._n)return t;const i=Pg((...s)=>Su(t(...s)),e);return i._c=!1,i},vp=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Mu(s))continue;const r=n[s];if(Yt(r))t[s]=__(s,r,i);else if(r!=null){const o=Su(r);t[s]=()=>o}}},xp=(n,t)=>{const e=Su(t);n.slots.default=()=>e},yp=(n,t,e)=>{for(const i in t)(e||!Mu(i))&&(n[i]=t[i])},v_=(n,t,e)=>{const i=n.slots=pp();if(n.vnode.shapeFlag&32){const s=t._;s?(yp(i,t,e),e&&Rd(i,"_",s,!0)):vp(t,i)}else t&&xp(n,t)},x_=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=de;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:yp(s,t,e):(r=!t.$stable,vp(t,s)),o=t}else t&&(xp(n,t),o={default:1});if(r)for(const a in s)!Mu(a)&&o[a]==null&&delete s[a]},qe=b_;function y_(n){return M_(n)}function M_(n,t){const e=Ca();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=jn,insertStaticContent:g}=n,_=(C,R,v,Z=null,q=null,V=null,st=void 0,ht=null,nt=!!R.dynamicChildren)=>{if(C===R)return;C&&!br(C,R)&&(Z=k(C),Ot(C,q,V,!0),C=null),R.patchFlag===-2&&(nt=!1,R.dynamicChildren=null);const{type:M,ref:x,shapeFlag:w}=R;switch(M){case Ba:m(C,R,v,Z);break;case Gi:p(C,R,v,Z);break;case Zo:C==null&&S(R,v,Z,st);break;case Ae:O(C,R,v,Z,q,V,st,ht,nt);break;default:w&1?G(C,R,v,Z,q,V,st,ht,nt):w&6?B(C,R,v,Z,q,V,st,ht,nt):(w&64||w&128)&&M.process(C,R,v,Z,q,V,st,ht,nt,gt)}x!=null&&q?Vr(x,C&&C.ref,V,R||C,!R):x==null&&C&&C.ref!=null&&Vr(C.ref,null,V,C,!0)},m=(C,R,v,Z)=>{if(C==null)i(R.el=a(R.children),v,Z);else{const q=R.el=C.el;R.children!==C.children&&c(q,R.children)}},p=(C,R,v,Z)=>{C==null?i(R.el=l(R.children||""),v,Z):R.el=C.el},S=(C,R,v,Z)=>{[C.el,C.anchor]=g(C.children,R,v,Z,C.el,C.anchor)},A=({el:C,anchor:R},v,Z)=>{let q;for(;C&&C!==R;)q=h(C),i(C,v,Z),C=q;i(R,v,Z)},y=({el:C,anchor:R})=>{let v;for(;C&&C!==R;)v=h(C),s(C),C=v;s(R)},G=(C,R,v,Z,q,V,st,ht,nt)=>{if(R.type==="svg"?st="svg":R.type==="math"&&(st="mathml"),C==null)L(R,v,Z,q,V,st,ht,nt);else{const M=C.el&&C.el._isVueCE?C.el:null;try{M&&M._beginPatch(),b(C,R,q,V,st,ht,nt)}finally{M&&M._endPatch()}}},L=(C,R,v,Z,q,V,st,ht)=>{let nt,M;const{props:x,shapeFlag:w,transition:I,dirs:F}=C;if(nt=C.el=o(C.type,V,x&&x.is,x),w&8?u(nt,C.children):w&16&&U(C.children,nt,null,Z,q,sl(C,V),st,ht),F&&$i(C,null,Z,"created"),D(nt,C,C.scopeId,st,Z),x){for(const tt in x)tt!=="value"&&!zr(tt)&&r(nt,tt,null,x[tt],V,Z);"value"in x&&r(nt,"value",null,x.value,V),(M=x.onVnodeBeforeMount)&&kn(M,Z,C)}F&&$i(C,null,Z,"beforeMount");const z=S_(q,I);z&&I.beforeEnter(nt),i(nt,R,v),((M=x&&x.onVnodeMounted)||z||F)&&qe(()=>{try{M&&kn(M,Z,C),z&&I.enter(nt),F&&$i(C,null,Z,"mounted")}finally{}},q)},D=(C,R,v,Z,q)=>{if(v&&d(C,v),Z)for(let V=0;V<Z.length;V++)d(C,Z[V]);if(q){let V=q.subTree;if(R===V||Ep(V.type)&&(V.ssContent===R||V.ssFallback===R)){const st=q.vnode;D(C,st,st.scopeId,st.slotScopeIds,q.parent)}}},U=(C,R,v,Z,q,V,st,ht,nt=0)=>{for(let M=nt;M<C.length;M++){const x=C[M]=ht?ai(C[M]):Gn(C[M]);_(null,x,R,v,Z,q,V,st,ht)}},b=(C,R,v,Z,q,V,st)=>{const ht=R.el=C.el;let{patchFlag:nt,dynamicChildren:M,dirs:x}=R;nt|=C.patchFlag&16;const w=C.props||de,I=R.props||de;let F;if(v&&Ki(v,!1),(F=I.onVnodeBeforeUpdate)&&kn(F,v,R,C),x&&$i(R,C,v,"beforeUpdate"),v&&Ki(v,!0),(w.innerHTML&&I.innerHTML==null||w.textContent&&I.textContent==null)&&u(ht,""),M?E(C.dynamicChildren,M,ht,v,Z,sl(R,q),V):st||N(C,R,ht,null,v,Z,sl(R,q),V,!1),nt>0){if(nt&16)P(ht,w,I,v,q);else if(nt&2&&w.class!==I.class&&r(ht,"class",null,I.class,q),nt&4&&r(ht,"style",w.style,I.style,q),nt&8){const z=R.dynamicProps;for(let tt=0;tt<z.length;tt++){const ot=z[tt],at=w[ot],Mt=I[ot];(Mt!==at||ot==="value")&&r(ht,ot,at,Mt,q,v)}}nt&1&&C.children!==R.children&&u(ht,R.children)}else!st&&M==null&&P(ht,w,I,v,q);((F=I.onVnodeUpdated)||x)&&qe(()=>{F&&kn(F,v,R,C),x&&$i(R,C,v,"updated")},Z)},E=(C,R,v,Z,q,V,st)=>{for(let ht=0;ht<R.length;ht++){const nt=C[ht],M=R[ht],x=nt.el&&(nt.type===Ae||!br(nt,M)||nt.shapeFlag&198)?f(nt.el):v;_(nt,M,x,null,Z,q,V,st,!0)}},P=(C,R,v,Z,q)=>{if(R!==v){if(R!==de)for(const V in R)!zr(V)&&!(V in v)&&r(C,V,R[V],null,q,Z);for(const V in v){if(zr(V))continue;const st=v[V],ht=R[V];st!==ht&&V!=="value"&&r(C,V,ht,st,q,Z)}"value"in v&&r(C,"value",R.value,v.value,q)}},O=(C,R,v,Z,q,V,st,ht,nt)=>{const M=R.el=C?C.el:a(""),x=R.anchor=C?C.anchor:a("");let{patchFlag:w,dynamicChildren:I,slotScopeIds:F}=R;F&&(ht=ht?ht.concat(F):F),C==null?(i(M,v,Z),i(x,v,Z),U(R.children||[],v,x,q,V,st,ht,nt)):w>0&&w&64&&I&&C.dynamicChildren&&C.dynamicChildren.length===I.length?(E(C.dynamicChildren,I,v,q,V,st,ht),(R.key!=null||q&&R===q.subTree)&&Eu(C,R,!0)):N(C,R,v,x,q,V,st,ht,nt)},B=(C,R,v,Z,q,V,st,ht,nt)=>{R.slotScopeIds=ht,C==null?R.shapeFlag&512?q.ctx.activate(R,v,Z,st,nt):K(R,v,Z,q,V,st,nt):lt(C,R,nt)},K=(C,R,v,Z,q,V,st)=>{const ht=C.component=L_(C,Z,q);if(rp(C)&&(ht.ctx.renderer=gt),U_(ht,!1,st),ht.asyncDep){if(q&&q.registerDep(ht,Y,st),!C.el){const nt=ht.subTree=Ze(Gi);p(null,nt,R,v),C.placeholder=nt.el}}else Y(ht,C,R,v,q,V,st)},lt=(C,R,v)=>{const Z=R.component=C.component;if(h_(C,R,v))if(Z.asyncDep&&!Z.asyncResolved){J(Z,R,v);return}else Z.next=R,Z.update();else R.el=C.el,Z.vnode=R},Y=(C,R,v,Z,q,V,st)=>{const ht=()=>{if(C.isMounted){let{next:w,bu:I,u:F,parent:z,vnode:tt}=C;{const xt=Mp(C);if(xt){w&&(w.el=tt.el,J(C,w,st)),xt.asyncDep.then(()=>{qe(()=>{C.isUnmounted||M()},q)});return}}let ot=w,at;Ki(C,!1),w?(w.el=tt.el,J(C,w,st)):w=tt,I&&$o(I),(at=w.props&&w.props.onVnodeBeforeUpdate)&&kn(at,z,w,tt),Ki(C,!0);const Mt=ff(C),mt=C.subTree;C.subTree=Mt,_(mt,Mt,f(mt.el),k(mt),C,q,V),w.el=Mt.el,ot===null&&d_(C,Mt.el),F&&qe(F,q),(at=w.props&&w.props.onVnodeUpdated)&&qe(()=>kn(at,z,w,tt),q)}else{let w;const{el:I,props:F}=R,{bm:z,m:tt,parent:ot,root:at,type:Mt}=C,mt=Gr(R);Ki(C,!1),z&&$o(z),!mt&&(w=F&&F.onVnodeBeforeMount)&&kn(w,ot,R),Ki(C,!0);{at.ce&&at.ce._hasShadowRoot()&&at.ce._injectChildStyle(Mt,C.parent?C.parent.type:void 0);const xt=C.subTree=ff(C);_(null,xt,v,Z,C,q,V),R.el=xt.el}if(tt&&qe(tt,q),!mt&&(w=F&&F.onVnodeMounted)){const xt=R;qe(()=>kn(w,ot,xt),q)}(R.shapeFlag&256||ot&&Gr(ot.vnode)&&ot.vnode.shapeFlag&256)&&C.a&&qe(C.a,q),C.isMounted=!0,R=v=Z=null}};C.scope.on();const nt=C.effect=new Ld(ht);C.scope.off();const M=C.update=nt.run.bind(nt),x=C.job=nt.runIfDirty.bind(nt);x.i=C,x.id=C.uid,nt.scheduler=()=>xu(x),Ki(C,!0),M()},J=(C,R,v)=>{R.component=C;const Z=C.vnode.props;C.vnode=R,C.next=null,m_(C,R.props,Z,v),x_(C,R.children,v),mi(),tf(C),gi()},N=(C,R,v,Z,q,V,st,ht,nt=!1)=>{const M=C&&C.children,x=C?C.shapeFlag:0,w=R.children,{patchFlag:I,shapeFlag:F}=R;if(I>0){if(I&128){vt(M,w,v,Z,q,V,st,ht,nt);return}else if(I&256){Q(M,w,v,Z,q,V,st,ht,nt);return}}F&8?(x&16&&Tt(M,q,V),w!==M&&u(v,w)):x&16?F&16?vt(M,w,v,Z,q,V,st,ht,nt):Tt(M,q,V,!0):(x&8&&u(v,""),F&16&&U(w,v,Z,q,V,st,ht,nt))},Q=(C,R,v,Z,q,V,st,ht,nt)=>{C=C||Ks,R=R||Ks;const M=C.length,x=R.length,w=Math.min(M,x);let I;for(I=0;I<w;I++){const F=R[I]=nt?ai(R[I]):Gn(R[I]);_(C[I],F,v,null,q,V,st,ht,nt)}M>x?Tt(C,q,V,!0,!1,w):U(R,v,Z,q,V,st,ht,nt,w)},vt=(C,R,v,Z,q,V,st,ht,nt)=>{let M=0;const x=R.length;let w=C.length-1,I=x-1;for(;M<=w&&M<=I;){const F=C[M],z=R[M]=nt?ai(R[M]):Gn(R[M]);if(br(F,z))_(F,z,v,null,q,V,st,ht,nt);else break;M++}for(;M<=w&&M<=I;){const F=C[w],z=R[I]=nt?ai(R[I]):Gn(R[I]);if(br(F,z))_(F,z,v,null,q,V,st,ht,nt);else break;w--,I--}if(M>w){if(M<=I){const F=I+1,z=F<x?R[F].el:Z;for(;M<=I;)_(null,R[M]=nt?ai(R[M]):Gn(R[M]),v,z,q,V,st,ht,nt),M++}}else if(M>I)for(;M<=w;)Ot(C[M],q,V,!0),M++;else{const F=M,z=M,tt=new Map;for(M=z;M<=I;M++){const dt=R[M]=nt?ai(R[M]):Gn(R[M]);dt.key!=null&&tt.set(dt.key,M)}let ot,at=0;const Mt=I-z+1;let mt=!1,xt=0;const Et=new Array(Mt);for(M=0;M<Mt;M++)Et[M]=0;for(M=F;M<=w;M++){const dt=C[M];if(at>=Mt){Ot(dt,q,V,!0);continue}let Rt;if(dt.key!=null)Rt=tt.get(dt.key);else for(ot=z;ot<=I;ot++)if(Et[ot-z]===0&&br(dt,R[ot])){Rt=ot;break}Rt===void 0?Ot(dt,q,V,!0):(Et[Rt-z]=M+1,Rt>=xt?xt=Rt:mt=!0,_(dt,R[Rt],v,null,q,V,st,ht,nt),at++)}const Dt=mt?E_(Et):Ks;for(ot=Dt.length-1,M=Mt-1;M>=0;M--){const dt=z+M,Rt=R[dt],It=R[dt+1],ee=dt+1<x?It.el||Sp(It):Z;Et[M]===0?_(null,Rt,v,ee,q,V,st,ht,nt):mt&&(ot<0||M!==Dt[ot]?bt(Rt,v,ee,2):ot--)}}},bt=(C,R,v,Z,q=null)=>{const{el:V,type:st,transition:ht,children:nt,shapeFlag:M}=C;if(M&6){bt(C.component.subTree,R,v,Z);return}if(M&128){C.suspense.move(R,v,Z);return}if(M&64){st.move(C,R,v,gt);return}if(st===Ae){i(V,R,v);for(let w=0;w<nt.length;w++)bt(nt[w],R,v,Z);i(C.anchor,R,v);return}if(st===Zo){A(C,R,v);return}if(Z!==2&&M&1&&ht)if(Z===0)ht.beforeEnter(V),i(V,R,v),qe(()=>ht.enter(V),q);else{const{leave:w,delayLeave:I,afterLeave:F}=ht,z=()=>{C.ctx.isUnmounted?s(V):i(V,R,v)},tt=()=>{V._isLeaving&&V[Bg](!0),w(V,()=>{z(),F&&F()})};I?I(V,z,tt):tt()}else i(V,R,v)},Ot=(C,R,v,Z=!1,q=!1)=>{const{type:V,props:st,ref:ht,children:nt,dynamicChildren:M,shapeFlag:x,patchFlag:w,dirs:I,cacheIndex:F,memo:z}=C;if(w===-2&&(q=!1),ht!=null&&(mi(),Vr(ht,null,v,C,!0),gi()),F!=null&&(R.renderCache[F]=void 0),x&256){R.ctx.deactivate(C);return}const tt=x&1&&I,ot=!Gr(C);let at;if(ot&&(at=st&&st.onVnodeBeforeUnmount)&&kn(at,R,C),x&6)_t(C.component,v,Z);else{if(x&128){C.suspense.unmount(v,Z);return}tt&&$i(C,null,R,"beforeUnmount"),x&64?C.type.remove(C,R,v,gt,Z):M&&!M.hasOnce&&(V!==Ae||w>0&&w&64)?Tt(M,R,v,!1,!0):(V===Ae&&w&384||!q&&x&16)&&Tt(nt,R,v),Z&&Qt(C)}const Mt=z!=null&&F==null;(ot&&(at=st&&st.onVnodeUnmounted)||tt||Mt)&&qe(()=>{at&&kn(at,R,C),tt&&$i(C,null,R,"unmounted"),Mt&&(C.el=null)},v)},Qt=C=>{const{type:R,el:v,anchor:Z,transition:q}=C;if(R===Ae){ct(v,Z);return}if(R===Zo){y(C);return}const V=()=>{s(v),q&&!q.persisted&&q.afterLeave&&q.afterLeave()};if(C.shapeFlag&1&&q&&!q.persisted){const{leave:st,delayLeave:ht}=q,nt=()=>st(v,V);ht?ht(C.el,V,nt):nt()}else V()},ct=(C,R)=>{let v;for(;C!==R;)v=h(C),s(C),C=v;s(R)},_t=(C,R,v)=>{const{bum:Z,scope:q,job:V,subTree:st,um:ht,m:nt,a:M}=C;pf(nt),pf(M),Z&&$o(Z),q.stop(),V&&(V.flags|=8,Ot(st,C,R,v)),ht&&qe(ht,R),qe(()=>{C.isUnmounted=!0},R)},Tt=(C,R,v,Z=!1,q=!1,V=0)=>{for(let st=V;st<C.length;st++)Ot(C[st],R,v,Z,q)},k=C=>{if(C.shapeFlag&6)return k(C.component.subTree);if(C.shapeFlag&128)return C.suspense.next();const R=h(C.anchor||C.el),v=R&&R[ip];return v?h(v):R};let ft=!1;const ut=(C,R,v)=>{let Z;C==null?R._vnode&&(Ot(R._vnode,null,null,!0),Z=R._vnode.component):_(R._vnode||null,C,R,null,null,null,v),R._vnode=C,ft||(ft=!0,tf(Z),Zd(),ft=!1)},gt={p:_,um:Ot,m:bt,r:Qt,mt:K,mc:U,pc:N,pbc:E,n:k,o:n};return{render:ut,hydrate:void 0,createApp:o_(ut)}}function sl({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Ki({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function S_(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Eu(n,t,e=!1){const i=n.children,s=t.children;if(Wt(i)&&Wt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ai(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Eu(o,a)),a.type===Ba&&(a.patchFlag===-1&&(a=s[r]=ai(a)),a.el=o.el),a.type===Gi&&!a.el&&(a.el=o.el)}}function E_(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Mp(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Mp(t)}function pf(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function Sp(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?Sp(t.subTree):null}const Ep=n=>n.__isSuspense;function b_(n,t){t&&t.pendingBranch?Wt(n)?t.effects.push(...n):t.effects.push(n):Cg(n)}const Ae=Symbol.for("v-fgt"),Ba=Symbol.for("v-txt"),Gi=Symbol.for("v-cmt"),Zo=Symbol.for("v-stc"),Xr=[];let dn=null;function Lt(n=!1){Xr.push(dn=n?null:[])}function T_(){Xr.pop(),dn=Xr[Xr.length-1]||null}let Jr=1;function ha(n,t=!1){Jr+=n,n<0&&dn&&t&&(dn.hasOnce=!0)}function bp(n){return n.dynamicChildren=Jr>0?dn||Ks:null,T_(),Jr>0&&dn&&dn.push(n),n}function Ft(n,t,e,i,s,r){return bp($(n,t,e,i,s,r,!0))}function gs(n,t,e,i,s){return bp(Ze(n,t,e,i,s,!0))}function da(n){return n?n.__v_isVNode===!0:!1}function br(n,t){return n.type===t.type&&n.key===t.key}const Tp=({key:n})=>n??null,Jo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?ye(n)||He(n)||Yt(n)?{i:hn,r:n,k:t,f:!!e}:n:null);function $(n,t=null,e=null,i=0,s=null,r=n===Ae?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&Tp(t),ref:t&&Jo(t),scopeId:Qd,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:hn};return a?(bu(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=ye(e)?8:16),Jr>0&&!o&&dn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&dn.push(l),l}const Ze=A_;function A_(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Zg)&&(n=Gi),da(n)){const a=or(n,t,!0);return e&&bu(a,e),Jr>0&&!r&&dn&&(a.shapeFlag&6?dn[dn.indexOf(n)]=a:dn.push(a)),a.patchFlag=-2,a}if(z_(n)&&(n=n.__vccOpts),t){t=w_(t);let{class:a,style:l}=t;a&&!ye(a)&&(t.class=Hi(a)),fe(l)&&(vu(l)&&!Wt(l)&&(l=Ne({},l)),t.style=Pa(l))}const o=ye(n)?1:Ep(n)?128:Ug(n)?64:fe(n)?4:Yt(n)?2:0;return $(n,t,e,i,s,o,r,!0)}function w_(n){return n?vu(n)||mp(n)?Ne({},n):n:null}function or(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?C_(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Tp(c),ref:t&&t.ref?e&&r?Wt(r)?r.concat(Jo(t)):[r,Jo(t)]:Jo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Ae?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&or(n.ssContent),ssFallback:n.ssFallback&&or(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&yu(u,l.clone(u)),u}function sc(n=" ",t=0){return Ze(Ba,null,n,t)}function R_(n,t){const e=Ze(Zo,null,n);return e.staticCount=t,e}function Ie(n="",t=!1){return t?(Lt(),gs(Gi,null,n)):Ze(Gi,null,n)}function Gn(n){return n==null||typeof n=="boolean"?Ze(Gi):Wt(n)?Ze(Ae,null,n.slice()):da(n)?ai(n):Ze(Ba,null,String(n))}function ai(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:or(n)}function bu(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Wt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),bu(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!mp(t)?t._ctx=hn:s===3&&hn&&(hn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Yt(t)?(t={default:t,_ctx:hn},e=32):(t=String(t),i&64?(e=16,t=[sc(t)]):e=8);n.children=t,n.shapeFlag|=e}function C_(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Hi([t.class,i.class]));else if(s==="style")t.style=Pa([t.style,i.style]);else if(Ta(s)){const r=t[s],o=i[s];o&&r!==o&&!(Wt(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!Aa(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function kn(n,t,e,i=null){Yn(n,t,7,[e,i])}const P_=up();let D_=0;function L_(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||P_,r={uid:D_++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new tg(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:_p(i,s),emitsOptions:fp(i,s),emit:null,emitted:null,propsDefaults:de,inheritAttrs:i.inheritAttrs,ctx:de,data:de,props:de,attrs:de,slots:de,refs:de,setupState:de,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=l_.bind(null,r),n.ce&&n.ce(r),r}let ze=null;const I_=()=>ze||hn;let pa,rc;{const n=Ca(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};pa=t("__VUE_INSTANCE_SETTERS__",e=>ze=e),rc=t("__VUE_SSR_SETTERS__",e=>Qr=e)}const ao=n=>{const t=ze;return pa(n),n.scope.on(),()=>{n.scope.off(),pa(t)}},mf=()=>{ze&&ze.scope.off(),pa(null)};function Ap(n){return n.vnode.shapeFlag&4}let Qr=!1;function U_(n,t=!1,e=!1){t&&rc(t);const{props:i,children:s}=n.vnode,r=Ap(n);p_(n,i,r,t),v_(n,s,e||t);const o=r?N_(n,t):void 0;return t&&rc(!1),o}function N_(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Qg);const{setup:i}=e;if(i){mi();const s=n.setupContext=i.length>1?F_(n):null,r=ao(n),o=oo(i,n,0,[n.props,s]),a=Td(o);if(gi(),r(),(a||n.sp)&&!Gr(n)&&sp(n),a){if(o.then(mf,mf),t)return o.then(l=>{gf(n,l)}).catch(l=>{Ia(l,n,0)});n.asyncDep=o}else gf(n,o)}else wp(n)}function gf(n,t,e){Yt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:fe(t)&&(n.setupState=Yd(t)),wp(n)}function wp(n,t,e){const i=n.type;n.render||(n.render=i.render||jn);{const s=ao(n);mi();try{t_(n)}finally{gi(),s()}}}const O_={get(n,t){return Be(n,"get",""),n[t]}};function F_(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,O_),slots:n.slots,emit:n.emit,expose:t}}function za(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Yd(yg(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Wr)return Wr[e](n)},has(t,e){return e in t||e in Wr}})):n.proxy}function B_(n,t=!0){return Yt(n)?n.displayName||n.name:n.name||t&&n.__name}function z_(n){return Yt(n)&&"__vccOpts"in n}const Zt=(n,t)=>bg(n,t,Qr);function Rp(n,t,e){try{ha(-1);const i=arguments.length;return i===2?fe(t)&&!Wt(t)?da(t)?Ze(n,null,[t]):Ze(n,t):Ze(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&da(e)&&(e=[e]),Ze(n,t,e))}finally{ha(1)}}const k_="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let oc;const _f=typeof window<"u"&&window.trustedTypes;if(_f)try{oc=_f.createPolicy("vue",{createHTML:n=>n})}catch{}const Cp=oc?n=>oc.createHTML(n):n=>n,H_="http://www.w3.org/2000/svg",V_="http://www.w3.org/1998/Math/MathML",oi=typeof document<"u"?document:null,vf=oi&&oi.createElement("template"),G_={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?oi.createElementNS(H_,n):t==="mathml"?oi.createElementNS(V_,n):e?oi.createElement(n,{is:e}):oi.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>oi.createTextNode(n),createComment:n=>oi.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>oi.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{vf.innerHTML=Cp(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=vf.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},W_=Symbol("_vtc");function X_(n,t,e){const i=n[W_];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const ma=Symbol("_vod"),Pp=Symbol("_vsh"),j_={name:"show",beforeMount(n,{value:t},{transition:e}){n[ma]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):Tr(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),Tr(n,!0),i.enter(n)):i.leave(n,()=>{Tr(n,!1)}):Tr(n,t))},beforeUnmount(n,{value:t}){Tr(n,t)}};function Tr(n,t){n.style.display=t?n[ma]:"none",n[Pp]=!t}const q_=Symbol(""),Y_=/(?:^|;)\s*display\s*:/;function $_(n,t,e){const i=n.style,s=ye(e);let r=!1;if(e&&!s){if(t)if(ye(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&Or(i,a,"")}else for(const o in t)e[o]==null&&Or(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?Z_(n,o,!ye(t)&&t?t[o]:void 0,a)||Or(i,o,a):Or(i,o,"")}}else if(s){if(t!==e){const o=i[q_];o&&(e+=";"+o),i.cssText=e,r=Y_.test(e)}}else t&&n.removeAttribute("style");ma in n&&(n[ma]=r?i.display:"",n[Pp]&&(i.display="none"))}const xf=/\s*!important$/;function Or(n,t,e){if(Wt(e))e.forEach(i=>Or(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=K_(n,t);xf.test(e)?n.setProperty(ji(i),e.replace(xf,""),"important"):n[i]=e}}const yf=["Webkit","Moz","ms"],rl={};function K_(n,t){const e=rl[t];if(e)return e;let i=Je(t);if(i!=="filter"&&i in n)return rl[t]=i;i=Ra(i);for(let s=0;s<yf.length;s++){const r=yf[s]+i;if(r in n)return rl[t]=r}return t}function Z_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ye(i)&&e===i}const Mf="http://www.w3.org/1999/xlink";function Sf(n,t,e,i,s,r=Jm(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Mf,t.slice(6,t.length)):n.setAttributeNS(Mf,t,e):e==null||r&&!Cd(e)?n.removeAttribute(t):n.setAttribute(t,r?"":qn(e)?String(e):e)}function Ef(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?Cp(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=Cd(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Ws(n,t,e,i){n.addEventListener(t,e,i)}function J_(n,t,e,i){n.removeEventListener(t,e,i)}const bf=Symbol("_vei");function Q_(n,t,e,i,s=null){const r=n[bf]||(n[bf]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=t0(t);if(i){const c=r[t]=i0(i,s);Ws(n,a,c,l)}else o&&(J_(n,a,o,l),r[t]=void 0)}}const Tf=/(?:Once|Passive|Capture)$/;function t0(n){let t;if(Tf.test(n)){t={};let i;for(;i=n.match(Tf);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ji(n.slice(2)),t]}let ol=0;const e0=Promise.resolve(),n0=()=>ol||(e0.then(()=>ol=0),ol=Date.now());function i0(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Yn(s0(i,e.value),t,5,[i])};return e.value=n,e.attached=n0(),e}function s0(n,t){if(Wt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const Af=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,r0=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?X_(n,i,o):t==="style"?$_(n,e,i):Ta(t)?Aa(t)||Q_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):o0(n,t,i,o))?(Ef(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Sf(n,t,i,o,r,t!=="value")):n._isVueCE&&(a0(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!ye(i)))?Ef(n,Je(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Sf(n,t,i,o))};function o0(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&Af(t)&&Yt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Af(t)&&ye(e)?!1:t in n}function a0(n,t){const e=n._def.props;if(!e)return!1;const i=Je(t);return Array.isArray(e)?e.some(s=>Je(s)===i):Object.keys(e).some(s=>Je(s)===i)}const wf=n=>{const t=n.props["onUpdate:modelValue"]||!1;return Wt(t)?e=>$o(t,e):t};function l0(n){n.target.composing=!0}function Rf(n){const t=n.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const al=Symbol("_assign");function Cf(n,t,e){return t&&(n=n.trim()),e&&(n=uu(n)),n}const c0={created(n,{modifiers:{lazy:t,trim:e,number:i}},s){n[al]=wf(s);const r=i||s.props&&s.props.type==="number";Ws(n,t?"change":"input",o=>{o.target.composing||n[al](Cf(n.value,e,r))}),(e||r)&&Ws(n,"change",()=>{n.value=Cf(n.value,e,r)}),t||(Ws(n,"compositionstart",l0),Ws(n,"compositionend",Rf),Ws(n,"change",Rf))},mounted(n,{value:t}){n.value=t??""},beforeUpdate(n,{value:t,oldValue:e,modifiers:{lazy:i,trim:s,number:r}},o){if(n[al]=wf(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?uu(n.value):n.value,l=t??"";if(a===l)return;const c=n.getRootNode();(c instanceof Document||c instanceof ShadowRoot)&&c.activeElement===n&&n.type!=="range"&&(i&&t===e||s&&n.value.trim()===l)||(n.value=l)}},u0=["ctrl","shift","alt","meta"],f0={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>u0.some(e=>n[`${e}Key`]&&!t.includes(e))},zi=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=f0[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},h0={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},d0=(n,t)=>{const e=n._withKeys||(n._withKeys={}),i=t.join(".");return e[i]||(e[i]=(s=>{if(!("key"in s))return;const r=ji(s.key);if(t.some(o=>o===r||h0[o]===r))return n(s)}))},p0=Ne({patchProp:r0},G_);let Pf;function m0(){return Pf||(Pf=y_(p0))}const g0=((...n)=>{const t=m0().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=v0(i);if(!s)return;const r=t._component;!Yt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,_0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function _0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function v0(n){return ye(n)?document.querySelector(n):n}const qi=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},x0={};function y0(n,t){const e=Kg("router-view");return Lt(),gs(e)}const M0=qi(x0,[["render",y0]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Xs=typeof document<"u";function Dp(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function S0(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Dp(n.default)}const oe=Object.assign;function ll(n,t){const e={};for(const i in t){const s=t[i];e[i]=Bn(s)?s.map(n):n(s)}return e}const jr=()=>{},Bn=Array.isArray;function Df(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const Lp=/#/g,E0=/&/g,b0=/\//g,T0=/=/g,A0=/\?/g,Ip=/\+/g,w0=/%5B/g,R0=/%5D/g,Up=/%5E/g,C0=/%60/g,Np=/%7B/g,P0=/%7C/g,Op=/%7D/g,D0=/%20/g;function Tu(n){return n==null?"":encodeURI(""+n).replace(P0,"|").replace(w0,"[").replace(R0,"]")}function L0(n){return Tu(n).replace(Np,"{").replace(Op,"}").replace(Up,"^")}function ac(n){return Tu(n).replace(Ip,"%2B").replace(D0,"+").replace(Lp,"%23").replace(E0,"%26").replace(C0,"`").replace(Np,"{").replace(Op,"}").replace(Up,"^")}function I0(n){return ac(n).replace(T0,"%3D")}function U0(n){return Tu(n).replace(Lp,"%23").replace(A0,"%3F")}function N0(n){return U0(n).replace(b0,"%2F")}function to(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const O0=/\/$/,F0=n=>n.replace(O0,"");function cl(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=H0(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:to(o)}}function B0(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function Lf(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function z0(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&ar(t.matched[i],e.matched[s])&&Fp(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function ar(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function Fp(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!k0(n[e],t[e]))return!1;return!0}function k0(n,t){return Bn(n)?If(n,t):Bn(t)?If(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function If(n,t){return Bn(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function H0(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const bi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let lc=(function(n){return n.pop="pop",n.push="push",n})({}),ul=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function V0(n){if(!n)if(Xs){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),F0(n)}const G0=/^[^#]+#/;function W0(n,t){return n.replace(G0,"#")+t}function X0(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const ka=()=>({left:window.scrollX,top:window.scrollY});function j0(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=X0(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Uf(n,t){return(history.state?history.state.position-t:-1)+n}const cc=new Map;function q0(n,t){cc.set(n,t)}function Y0(n){const t=cc.get(n);return cc.delete(n),t}function $0(n){return typeof n=="string"||n&&typeof n=="object"}function Bp(n){return typeof n=="string"||typeof n=="symbol"}let Me=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const zp=Symbol("");Me.MATCHER_NOT_FOUND+"",Me.NAVIGATION_GUARD_REDIRECT+"",Me.NAVIGATION_ABORTED+"",Me.NAVIGATION_CANCELLED+"",Me.NAVIGATION_DUPLICATED+"";function lr(n,t){return oe(new Error,{type:n,[zp]:!0},t)}function Qn(n,t){return n instanceof Error&&zp in n&&(t==null||!!(n.type&t))}const K0=["params","query","hash"];function Z0(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of K0)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function J0(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(Ip," "),r=s.indexOf("="),o=to(r<0?s:s.slice(0,r)),a=r<0?null:to(s.slice(r+1));if(o in t){let l=t[o];Bn(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function Nf(n){let t="";for(let e in n){const i=n[e];if(e=I0(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(Bn(i)?i.map(s=>s&&ac(s)):[i&&ac(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function Q0(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=Bn(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const tv=Symbol(""),Of=Symbol(""),lo=Symbol(""),Au=Symbol(""),uc=Symbol("");function Ar(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function Ii(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(lr(Me.NAVIGATION_ABORTED,{from:e,to:t})):h instanceof Error?l(h):$0(h)?l(lr(Me.NAVIGATION_GUARD_REDIRECT,{from:t,to:h})):(o&&i.enterCallbacks[s]===o&&typeof h=="function"&&o.push(h),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function fl(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Dp(l)){const c=(l.__vccOpts||l)[t];c&&r.push(Ii(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=S0(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[t];return h&&Ii(h,e,i,o,a,s)()}))}}return r}function ev(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>ar(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>ar(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let nv=()=>location.protocol+"//"+location.host;function kp(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),Lf(a,"")}return Lf(e,n)+i+s}function iv(n,t,e,i){let s=[],r=[],o=null;const a=({state:h})=>{const d=kp(n,location),g=e.value,_=t.value;let m=0;if(h){if(e.value=d,t.value=h,o&&o===g){o=null;return}m=_?h.position-_.position:0}else i(d);s.forEach(p=>{p(e.value,g,{delta:m,type:lc.pop,direction:m?m>0?ul.forward:ul.back:ul.unknown})})};function l(){o=e.value}function c(h){s.push(h);const d=()=>{const g=s.indexOf(h);g>-1&&s.splice(g,1)};return r.push(d),d}function u(){if(document.visibilityState==="hidden"){const{history:h}=window;if(!h.state)return;h.replaceState(oe({},h.state,{scroll:ka()}),"")}}function f(){for(const h of r)h();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:f}}function Ff(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?ka():null}}function sv(n){const{history:t,location:e}=window,i={value:kp(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const f=n.indexOf("#"),h=f>-1?(e.host&&document.querySelector("base")?n:n.slice(f))+l:nv()+n+l;try{t[u?"replaceState":"pushState"](c,"",h),s.value=c}catch(d){console.error(d),e[u?"replace":"assign"](h)}}function o(l,c){r(l,oe({},t.state,Ff(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=oe({},s.value,t.state,{forward:l,scroll:ka()});r(u.current,u,!0),r(l,oe({},Ff(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function rv(n){n=V0(n);const t=sv(n),e=iv(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=oe({location:"",base:n,go:i,createHref:W0.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function ov(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),rv(n)}let cs=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Ce=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Ce||{});const av={type:cs.Static,value:""},lv=/[a-zA-Z0-9_]/;function cv(n){if(!n)return[[]];if(n==="/")return[[av]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(d){throw new Error(`ERR (${e})/"${c}": ${d}`)}let e=Ce.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function f(){c&&(e===Ce.Static?r.push({type:cs.Static,value:c}):e===Ce.Param||e===Ce.ParamRegExp||e===Ce.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:cs.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==Ce.ParamRegExp){i=e,e=Ce.EscapeNext;continue}switch(e){case Ce.Static:l==="/"?(c&&f(),o()):l===":"?(f(),e=Ce.Param):h();break;case Ce.EscapeNext:h(),e=i;break;case Ce.Param:l==="("?e=Ce.ParamRegExp:lv.test(l)?h():(f(),e=Ce.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Ce.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=Ce.ParamRegExpEnd:u+=l;break;case Ce.ParamRegExpEnd:f(),e=Ce.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===Ce.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),f(),o(),s}const Bf="[^/]+?",uv={sensitive:!1,strict:!1,start:!0,end:!0};var Ye=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(Ye||{});const fv=/[.+*?^${}()[\]/\\]/g;function hv(n,t){const e=oe({},uv,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[Ye.Root];e.strict&&!c.length&&(s+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=Ye.Segment+(e.sensitive?Ye.BonusCaseSensitive:0);if(h.type===cs.Static)f||(s+="/"),s+=h.value.replace(fv,"\\$&"),d+=Ye.Static;else if(h.type===cs.Param){const{value:g,repeatable:_,optional:m,regexp:p}=h;r.push({name:g,repeatable:_,optional:m});const S=p||Bf;if(S!==Bf){d+=Ye.BonusCustomRegExp;try{`${S}`}catch(y){throw new Error(`Invalid custom RegExp for param "${g}" (${S}): `+y.message)}}let A=_?`((?:${S})(?:/(?:${S}))*)`:`(${S})`;f||(A=m&&c.length<2?`(?:/${A})`:"/"+A),m&&(A+="?"),s+=A,d+=Ye.Dynamic,m&&(d+=Ye.BonusOptional),_&&(d+=Ye.BonusRepeatable),S===".*"&&(d+=Ye.BonusWildcard)}u.push(d)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=Ye.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=r[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===cs.Static)u+=d.value;else if(d.type===cs.Param){const{value:g,repeatable:_,optional:m}=d,p=g in c?c[g]:"";if(Bn(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const S=Bn(p)?p.join("/"):p;if(!S)if(m)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=S}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function dv(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===Ye.Static+Ye.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===Ye.Static+Ye.Segment?1:-1:0}function Hp(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=dv(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(zf(i))return 1;if(zf(s))return-1}return s.length-i.length}function zf(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const pv={strict:!1,end:!0,sensitive:!1};function mv(n,t,e){const i=hv(cv(n.path),e),s=oe(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function gv(n,t){const e=[],i=new Map;t=Df(pv,t);function s(f){return i.get(f)}function r(f,h,d){const g=!d,_=Hf(f);_.aliasOf=d&&d.record;const m=Df(t,f),p=[_];if("alias"in f){const y=typeof f.alias=="string"?[f.alias]:f.alias;for(const G of y)p.push(Hf(oe({},_,{components:d?d.record.components:_.components,path:G,aliasOf:d?d.record:_})))}let S,A;for(const y of p){const{path:G}=y;if(h&&G[0]!=="/"){const L=h.record.path,D=L[L.length-1]==="/"?"":"/";y.path=h.record.path+(G&&D+G)}if(S=mv(y,h,m),d?d.alias.push(S):(A=A||S,A!==S&&A.alias.push(S),g&&f.name&&!Vf(S)&&o(f.name)),Vp(S)&&l(S),_.children){const L=_.children;for(let D=0;D<L.length;D++)r(L[D],S,d&&d.children[D])}d=d||S}return A?()=>{o(A)}:jr}function o(f){if(Bp(f)){const h=i.get(f);h&&(i.delete(f),e.splice(e.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=e.indexOf(f);h>-1&&(e.splice(h,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return e}function l(f){const h=xv(f,e);e.splice(h,0,f),f.record.name&&!Vf(f)&&i.set(f.record.name,f)}function c(f,h){let d,g={},_,m;if("name"in f&&f.name){if(d=i.get(f.name),!d)throw lr(Me.MATCHER_NOT_FOUND,{location:f});m=d.record.name,g=oe(kf(h.params,d.keys.filter(A=>!A.optional).concat(d.parent?d.parent.keys.filter(A=>A.optional):[]).map(A=>A.name)),f.params&&kf(f.params,d.keys.map(A=>A.name))),_=d.stringify(g)}else if(f.path!=null)_=f.path,d=e.find(A=>A.re.test(_)),d&&(g=d.parse(_),m=d.record.name);else{if(d=h.name?i.get(h.name):e.find(A=>A.re.test(h.path)),!d)throw lr(Me.MATCHER_NOT_FOUND,{location:f,currentLocation:h});m=d.record.name,g=oe({},h.params,f.params),_=d.stringify(g)}const p=[];let S=d;for(;S;)p.unshift(S.record),S=S.parent;return{name:m,path:_,params:g,matched:p,meta:vv(p)}}n.forEach(f=>r(f));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function kf(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function Hf(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:_v(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function _v(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function Vf(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function vv(n){return n.reduce((t,e)=>oe(t,e.meta),{})}function xv(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Hp(n,t[r])<0?i=r:e=r+1}const s=yv(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function yv(n){let t=n;for(;t=t.parent;)if(Vp(t)&&Hp(n,t)===0)return t}function Vp({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Gf(n){const t=bn(lo),e=bn(Au),i=Zt(()=>{const l=pn(n.to);return t.resolve(l)}),s=Zt(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=e.matched;if(!u||!f.length)return-1;const h=f.findIndex(ar.bind(null,u));if(h>-1)return h;const d=Wf(l[c-2]);return c>1&&Wf(u)===d&&f[f.length-1].path!==d?f.findIndex(ar.bind(null,l[c-2])):h}),r=Zt(()=>s.value>-1&&Tv(e.params,i.value.params)),o=Zt(()=>s.value>-1&&s.value===e.matched.length-1&&Fp(e.params,i.value.params));function a(l={}){if(bv(l)){const c=t[pn(n.replace)?"replace":"push"](pn(n.to)).catch(jr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Zt(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function Mv(n){return n.length===1?n[0]:n}const Sv=xi({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Gf,setup(n,{slots:t}){const e=La(Gf(n)),{options:i}=bn(lo),s=Zt(()=>({[Xf(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[Xf(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&Mv(t.default(e));return n.custom?r:Rp("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),Ev=Sv;function bv(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function Tv(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!Bn(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function Wf(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Xf=(n,t,e)=>n??t??e,Av=xi({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=bn(uc),s=Zt(()=>n.route||i.value),r=bn(Of,0),o=Zt(()=>{let c=pn(r);const{matched:u}=s.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Zt(()=>s.value.matched[o.value]);Ko(Of,Zt(()=>o.value+1)),Ko(tv,a),Ko(uc,s);const l=Gt();return on(()=>[l.value,a.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!ar(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return jf(e.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,m=Rp(h,oe({},g,t,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return jf(e.default,{Component:m,route:c})||m}}});function jf(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const wv=Av;function Rv(n){const t=gv(n.routes,n),e=n.parseQuery||J0,i=n.stringifyQuery||Nf,s=n.history,r=Ar(),o=Ar(),a=Ar(),l=rr(bi);let c=bi;Xs&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=ll.bind(null,k=>""+k),f=ll.bind(null,N0),h=ll.bind(null,to);function d(k,ft){let ut,gt;return Bp(k)?(ut=t.getRecordMatcher(k),gt=ft):gt=k,t.addRoute(gt,ut)}function g(k){const ft=t.getRecordMatcher(k);ft&&t.removeRoute(ft)}function _(){return t.getRoutes().map(k=>k.record)}function m(k){return!!t.getRecordMatcher(k)}function p(k,ft){if(ft=oe({},ft||l.value),typeof k=="string"){const v=cl(e,k,ft.path),Z=t.resolve({path:v.path},ft),q=s.createHref(v.fullPath);return oe(v,Z,{params:h(Z.params),hash:to(v.hash),redirectedFrom:void 0,href:q})}let ut;if(k.path!=null)ut=oe({},k,{path:cl(e,k.path,ft.path).path});else{const v=oe({},k.params);for(const Z in v)v[Z]==null&&delete v[Z];ut=oe({},k,{params:f(v)}),ft.params=f(ft.params)}const gt=t.resolve(ut,ft),Ut=k.hash||"";gt.params=u(h(gt.params));const C=B0(i,oe({},k,{hash:L0(Ut),path:gt.path})),R=s.createHref(C);return oe({fullPath:C,hash:Ut,query:i===Nf?Q0(k.query):k.query||{}},gt,{redirectedFrom:void 0,href:R})}function S(k){return typeof k=="string"?cl(e,k,l.value.path):oe({},k)}function A(k,ft){if(c!==k)return lr(Me.NAVIGATION_CANCELLED,{from:ft,to:k})}function y(k){return D(k)}function G(k){return y(oe(S(k),{replace:!0}))}function L(k,ft){const ut=k.matched[k.matched.length-1];if(ut&&ut.redirect){const{redirect:gt}=ut;let Ut=typeof gt=="function"?gt(k,ft):gt;return typeof Ut=="string"&&(Ut=Ut.includes("?")||Ut.includes("#")?Ut=S(Ut):{path:Ut},Ut.params={}),oe({query:k.query,hash:k.hash,params:Ut.path!=null?{}:k.params},Ut)}}function D(k,ft){const ut=c=p(k),gt=l.value,Ut=k.state,C=k.force,R=k.replace===!0,v=L(ut,gt);if(v)return D(oe(S(v),{state:typeof v=="object"?oe({},Ut,v.state):Ut,force:C,replace:R}),ft||ut);const Z=ut;Z.redirectedFrom=ft;let q;return!C&&z0(i,gt,ut)&&(q=lr(Me.NAVIGATION_DUPLICATED,{to:Z,from:gt}),bt(gt,gt,!0,!1)),(q?Promise.resolve(q):E(Z,gt)).catch(V=>Qn(V)?Qn(V,Me.NAVIGATION_GUARD_REDIRECT)?V:vt(V):N(V,Z,gt)).then(V=>{if(V){if(Qn(V,Me.NAVIGATION_GUARD_REDIRECT))return D(oe({replace:R},S(V.to),{state:typeof V.to=="object"?oe({},Ut,V.to.state):Ut,force:C}),ft||Z)}else V=O(Z,gt,!0,R,Ut);return P(Z,gt,V),V})}function U(k,ft){const ut=A(k,ft);return ut?Promise.reject(ut):Promise.resolve()}function b(k){const ft=ct.values().next().value;return ft&&typeof ft.runWithContext=="function"?ft.runWithContext(k):k()}function E(k,ft){let ut;const[gt,Ut,C]=ev(k,ft);ut=fl(gt.reverse(),"beforeRouteLeave",k,ft);for(const v of gt)v.leaveGuards.forEach(Z=>{ut.push(Ii(Z,k,ft))});const R=U.bind(null,k,ft);return ut.push(R),Tt(ut).then(()=>{ut=[];for(const v of r.list())ut.push(Ii(v,k,ft));return ut.push(R),Tt(ut)}).then(()=>{ut=fl(Ut,"beforeRouteUpdate",k,ft);for(const v of Ut)v.updateGuards.forEach(Z=>{ut.push(Ii(Z,k,ft))});return ut.push(R),Tt(ut)}).then(()=>{ut=[];for(const v of C)if(v.beforeEnter)if(Bn(v.beforeEnter))for(const Z of v.beforeEnter)ut.push(Ii(Z,k,ft));else ut.push(Ii(v.beforeEnter,k,ft));return ut.push(R),Tt(ut)}).then(()=>(k.matched.forEach(v=>v.enterCallbacks={}),ut=fl(C,"beforeRouteEnter",k,ft,b),ut.push(R),Tt(ut))).then(()=>{ut=[];for(const v of o.list())ut.push(Ii(v,k,ft));return ut.push(R),Tt(ut)}).catch(v=>Qn(v,Me.NAVIGATION_CANCELLED)?v:Promise.reject(v))}function P(k,ft,ut){a.list().forEach(gt=>b(()=>gt(k,ft,ut)))}function O(k,ft,ut,gt,Ut){const C=A(k,ft);if(C)return C;const R=ft===bi,v=Xs?history.state:{};ut&&(gt||R?s.replace(k.fullPath,oe({scroll:R&&v&&v.scroll},Ut)):s.push(k.fullPath,Ut)),l.value=k,bt(k,ft,ut,R),vt()}let B;function K(){B||(B=s.listen((k,ft,ut)=>{if(!_t.listening)return;const gt=p(k),Ut=L(gt,_t.currentRoute.value);if(Ut){D(oe(Ut,{replace:!0,force:!0}),gt).catch(jr);return}c=gt;const C=l.value;Xs&&q0(Uf(C.fullPath,ut.delta),ka()),E(gt,C).catch(R=>Qn(R,Me.NAVIGATION_ABORTED|Me.NAVIGATION_CANCELLED)?R:Qn(R,Me.NAVIGATION_GUARD_REDIRECT)?(D(oe(S(R.to),{force:!0}),gt).then(v=>{Qn(v,Me.NAVIGATION_ABORTED|Me.NAVIGATION_DUPLICATED)&&!ut.delta&&ut.type===lc.pop&&s.go(-1,!1)}).catch(jr),Promise.reject()):(ut.delta&&s.go(-ut.delta,!1),N(R,gt,C))).then(R=>{R=R||O(gt,C,!1),R&&(ut.delta&&!Qn(R,Me.NAVIGATION_CANCELLED)?s.go(-ut.delta,!1):ut.type===lc.pop&&Qn(R,Me.NAVIGATION_ABORTED|Me.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),P(gt,C,R)}).catch(jr)}))}let lt=Ar(),Y=Ar(),J;function N(k,ft,ut){vt(k);const gt=Y.list();return gt.length?gt.forEach(Ut=>Ut(k,ft,ut)):console.error(k),Promise.reject(k)}function Q(){return J&&l.value!==bi?Promise.resolve():new Promise((k,ft)=>{lt.add([k,ft])})}function vt(k){return J||(J=!k,K(),lt.list().forEach(([ft,ut])=>k?ut(k):ft()),lt.reset()),k}function bt(k,ft,ut,gt){const{scrollBehavior:Ut}=n;if(!Xs||!Ut)return Promise.resolve();const C=!ut&&Y0(Uf(k.fullPath,0))||(gt||!ut)&&history.state&&history.state.scroll||null;return ms().then(()=>Ut(k,ft,C)).then(R=>R&&j0(R)).catch(R=>N(R,k,ft))}const Ot=k=>s.go(k);let Qt;const ct=new Set,_t={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:_,resolve:p,options:n,push:y,replace:G,go:Ot,back:()=>Ot(-1),forward:()=>Ot(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:Y.add,isReady:Q,install(k){k.component("RouterLink",Ev),k.component("RouterView",wv),k.config.globalProperties.$router=_t,Object.defineProperty(k.config.globalProperties,"$route",{enumerable:!0,get:()=>pn(l)}),Xs&&!Qt&&l.value===bi&&(Qt=!0,y(s.location).catch(gt=>{}));const ft={};for(const gt in bi)Object.defineProperty(ft,gt,{get:()=>l.value[gt],enumerable:!0});k.provide(lo,_t),k.provide(Au,jd(ft)),k.provide(uc,l);const ut=k.unmount;ct.add(k),k.unmount=function(){ct.delete(k),ct.size<1&&(c=bi,B&&B(),B=null,l.value=bi,Qt=!1,J=!1),ut()}}};function Tt(k){return k.reduce((ft,ut)=>ft.then(()=>b(ut)),Promise.resolve())}return _t}function co(){return bn(lo)}function Gp(n){return bn(Au)}function Wp(n){var e;const t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}function Xp(){Wp({type:"close",source:"galaxy-h5"})}function Cv(n){if(typeof window>"u")return;const t=n==null?"":String(n);window.__GALAXY_ROUTE_NAME__=t}function ga(n){const t=n==null?"":String(n);Cv(t),Wp({type:"galaxy-route",source:"galaxy-h5",name:t})}const qr=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],_a="galaxy_majors",Pv={class:"select-page"},Dv={class:"picked","aria-live":"polite"},Lv={class:"picked-row"},Iv={class:"value"},Uv={class:"picked-row"},Nv={class:"value"},Ov={class:"grid"},Fv=["onClick"],Bv={class:"card-title"},zv={class:"card-tag"},kv={class:"footer"},Hv=["disabled"],Vv={key:0,class:"toast",role:"status"},Gv=xi({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=co(),i=Gt(null),s=Gt(null),r=Gt(""),o=Zt(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(f){r.value=f,window.setTimeout(()=>{r.value=""},1800)}function l(f){if(f===i.value){i.value=null;return}if(f===s.value){s.value=null;return}if(!i.value){i.value=f;return}if(!s.value){if(f===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=f;return}s.value=f}function c(){if(!o.value)return;const f={fromId:i.value,toId:s.value};sessionStorage.setItem(_a,JSON.stringify(f)),e.push({name:"galaxy"})}function u(){Xp()}return(f,h)=>{var d,g;return Lt(),Ft("div",Pv,[h[4]||(h[4]=$("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),$("div",{class:"custom-nav"},[$("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[$("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),h[0]||(h[0]=$("div",{class:"nav-title"},"专业星系",-1)),h[1]||(h[1]=$("div",{class:"nav-right"},null,-1))]),h[5]||(h[5]=R_('<div class="nav-spacer" data-v-ea557b8b></div><header class="header" data-v-ea557b8b><p class="eyebrow" data-v-ea557b8b>专业交叉星系</p><h1 class="title" data-v-ea557b8b>选择你的星域</h1><p class="subtitle" data-v-ea557b8b>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),$("section",Dv,[$("div",Lv,[h[2]||(h[2]=$("span",{class:"label"},"主修 / 起点",-1)),$("span",Iv,Nt(i.value?(d=pn(qr).find(_=>_.id===i.value))==null?void 0:d.label:"未选择"),1)]),$("div",Uv,[h[3]||(h[3]=$("span",{class:"label"},"交叉意向",-1)),$("span",Nv,Nt(s.value?(g=pn(qr).find(_=>_.id===s.value))==null?void 0:g.label:"未选择"),1)])]),$("div",Ov,[(Lt(!0),Ft(Ae,null,Vi(pn(qr),_=>(Lt(),Ft("button",{key:_.id,type:"button",class:Hi(["card",{"is-from":_.id===i.value,"is-to":_.id===s.value}]),onClick:m=>l(_.id)},[$("span",Bv,Nt(_.label),1),$("span",zv,Nt(_.tagline),1)],10,Fv))),128))]),$("footer",kv,[$("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,Hv)]),r.value?(Lt(),Ft("div",Vv,Nt(r.value),1)):Ie("",!0)])}}}),Wv=qi(Gv,[["__scopeId","data-v-ea557b8b"]]),Xv="modulepreload",jv=function(n,t){return new URL(n,t).href},qf={},ys=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let o=function(u){return Promise.all(u.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=o(e.map(u=>{if(u=jv(u,i),u in qf)return;qf[u]=!0;const f=u.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(!!i)for(let _=a.length-1;_>=0;_--){const m=a[_];if(m.href===u&&(!f||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const g=document.createElement("link");if(g.rel=f?"stylesheet":Xv,f||(g.as="script"),g.crossOrigin="",g.href=u,c&&g.setAttribute("nonce",c),document.head.appendChild(g),f)return new Promise((_,m)=>{g.addEventListener("load",_),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function Ha(){if(typeof window>"u")return"";const n=window.__GALAXY_API_BASE__;return n!=null&&String(n).trim()!==""?String(n).trim().replace(/\/+$/,""):""}function jp(){if(typeof window>"u")return null;const n=window.__GALAXY_USER_ID__;if(n===""||n==null)return null;const t=typeof n=="number"?n:Number(n);return!Number.isFinite(t)||t<=0?null:t}function qv(){return Ha().length>0&&jp()!=null}const uo=qv,Ms=jp;function Yf(){return Ha()||"./mock"}function js(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function $f(n="/mock"){const t=js("manifest.json",n),e=await fetch(t).then(f=>{if(!f.ok)throw new Error(`manifest ${f.status}`);return f.json()}),i=js(e.nodes_url,n),s=js(e.edges_url,n),r=js(e.hyperedges_url,n),o=js(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(f=>{if(!f.ok)throw new Error(`nodes ${f.status}`);return f.json()}),fetch(s).then(f=>{if(!f.ok)throw new Error(`edges ${f.status}`);return f.json()}),fetch(r).then(f=>{if(!f.ok)throw new Error(`hyperedges ${f.status}`);return f.json()}),fetch(o).then(f=>{if(!f.ok)throw new Error(`layout ${f.status}`);return f.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function hl(n="/mock",t){const e=Ha();if(e&&n===e)try{const{fetchRecommend:o}=await ys(async()=>{const{fetchRecommend:a}=await import("./galaxy-chunk-CPt_plr0.js");return{fetchRecommend:a}},[],import.meta.url);return o(t)}catch{}const i=t?`?selectedNodeId=${encodeURIComponent(t)}`:"",s=js(`recommend.json${i}`,n),r=await fetch(s);if(!r.ok)throw new Error(`recommend ${r.status}`);return r.json()}function Yv(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function ps(n,t){const e=[],i=new Set;for(const s of t){const r=s.member_node_ids;if(r!=null&&r.length&&r.includes(n)){e.push(s.id);for(const o of r)i.add(o)}}return{hyperedgeIds:e,memberIds:i}}const va={major_electrical:"电气工程",major_law:"法学",major_accounting:"会计学",major_cs:"计算机科学",major_finance:"金融学",major_clinical:"临床医学",major_swe:"软件工程",major_marketing:"市场营销",major_ds:"数据科学",major_english:"英语"};function $v(n,t){const e=va[n],i=va[t];return!e||!i?["",""]:[`${e}×${i}`,`${i}×${e}`]}const Kf=Object.fromEntries(Object.entries(va).map(([n,t])=>[t,n]));function qp(n){const t=n.split("×").map(s=>s.trim());if(t.length!==2)return null;const e=Kf[t[0]],i=Kf[t[1]];return!e||!i?null:[e,i]}function Yp(n,t){return n<=t?`${n}|${t}`:`${t}|${n}`}const fc=`\r
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
135	数据科学×英语	双语数据报告撰写	中	12-18	22-32	40-55	1	8:1	本科70% 硕士30%	数据可视化,商务英语,报告写作`;function hc(n){const t=n.split(/\r?\n/).filter(i=>i.trim().length>0),e=[];for(let i=0;i<t.length;i++){const s=t[i];if(s.startsWith("序号")||s.startsWith("	序号"))continue;const r=s.split("	");if(r.length<11)continue;const o=Number.parseInt(r[0],10);Number.isFinite(o)&&e.push({idx:o,pair:r[1].trim(),title:r[2].trim(),heat:r[3].trim(),salaryJunior:r[4].trim(),salaryMid:r[5].trim(),salarySenior:r[6].trim(),workIntensity:r[7].trim(),competition:r[8].trim(),education:r[9].trim(),skills:r[10].trim()})}return e}let Dn=null;const Qo=new Map;function dc(n){Qo.clear();for(const t of n){const e=qp(t.pair);if(!e)continue;const i=Yp(e[0],e[1]);Qo.has(i)||Qo.set(i,e)}}function Kv(){if(Dn)return;const n=String(fc).trim();n&&(Dn=hc(n),dc(Dn))}Kv();function Zv(n,t,e){if(e){const s=qp(e);if(s)return s}const i=Qo.get(Yp(n,t));return i||(n<=t?[n,t]:[t,n])}async function Va(){if(Dn)return Dn;if(String(fc).trim().length>0)return Dn=hc(String(fc)),dc(Dn),Dn;const n="./data/cross_job_catalog.tsv".replace(/\/{2,}/g,"/");try{const t=await fetch(n);if(!t.ok)throw new Error(`无法加载岗位表: ${t.status}`);Dn=hc(await t.text())}catch(t){const e=t instanceof Error?t.message:"网络异常";throw new Error(`无法加载岗位表（${e}）`)}return dc(Dn),Dn}async function wu(n,t){const[e,i]=$v(n,t);if(!e)return[];const r=(await Va()).filter(o=>o.pair===e||o.pair===i);return r.length>=3?r.slice(0,3):r}function Fi(n,t){var o;const e=(n??"").trim();if(!e)return"";const i=t==null?void 0:t.find(a=>a.id===e);if(i!=null&&i.majorId)return i.majorId;const s=t==null?void 0:t.find(a=>a.label===e);if(s!=null&&s.majorId)return s.majorId;if(e.startsWith("m_")){const a=/^m_(.+)_\d+$/.exec(e);if(a!=null&&a[1])return a[1]}return e.startsWith("major_")?e:((o=Object.entries(va).find(([,a])=>a===e))==null?void 0:o[0])??""}function Jv(n){var t;return n.jobSlot!=null&&n.jobSlot>=0&&n.jobSlot<=2?n.jobSlot:((t=n.row)==null?void 0:t.idx)!=null?((n.row.idx-1)%3+3)%3:0}function Wi(n,t){var a,l;if((a=n.packKey)!=null&&a.trim())return n.packKey.trim();const e=Fi(n.majorA,t),i=Fi(n.majorB,t);if(!e||!i)return null;const[s,r]=Zv(e,i,(l=n.row)==null?void 0:l.pair),o=Jv(n);return`${s}__${r}:${o}`}function Qv(n,t,e){const i=t.find(s=>s.id===n);return i?Wi(i,e):null}const $p="offercat_personal_galaxy_v1",Zf=6;function tx(n,t){const e={},i=n.length;for(let s=0;s<i;s++){const r=n[s],o=2*Math.PI*s/Math.max(i,1);e[r.id]={x:Zf*Math.cos(o),y:.25,z:Zf*Math.sin(o)}}for(const s of t){const r=e[s.majorA],o=e[s.majorB];if(!r||!o)continue;const a={x:(r.x+o.x)*.5,y:(r.y+o.y)*.5+.6,z:(r.z+o.z)*.5};e[s.id]=a}return e}function ex(n){return{subtitle:`${n.heat} · 初${n.salaryJunior} / 中${n.salaryMid} / 高${n.salarySenior}`,tagline:`${n.workIntensity}级强度 · 竞争${n.competition}`,heat:n.heat,salaryJunior:n.salaryJunior,salaryMid:n.salaryMid,salarySenior:n.salarySenior,workIntensity:n.workIntensity,competition:n.competition,education:n.education,skills:n.skills,catalogIdx:String(n.idx),pair:n.pair}}function Kp(n,t){const e=tx(n,t),i=[];for(const o of n)i.push({id:o.id,type:"major",label:o.label,meta:{tagline:"个人星系 · 大行星"}});for(const o of t)i.push({id:o.id,type:"fusion",label:o.title,meta:o.row?ex(o.row):{tagline:"个人星系 · 小行星"}});const s=t.flatMap(o=>[{u:o.id,v:o.majorA},{u:o.id,v:o.majorB}]),r=t.map(o=>({id:`he_${o.id}`,member_node_ids:[o.majorA,o.majorB,o.id],style_hint:"personal"}));return{nodes:i,edges:s,hyperedges:r,layout:e}}function nx(n,t){return{v:1,majors:[...n],fusions:[...t],updatedAt:Date.now()}}function Ga(){try{const n=localStorage.getItem($p);if(!n)return null;const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.majors)||!Array.isArray(t.fusions)?null:t}catch{return null}}function Zp(n){try{localStorage.setItem($p,JSON.stringify(n))}catch{}}function ix(n){const t=n;return!!t&&t.v===1&&Array.isArray(t.majors)&&Array.isArray(t.fusions)}async function Jf(n){var s;try{await Va()}catch{}const t=n.majors;let e=!1;const i=[];for(const r of n.fusions){let o=r;const a=Fi(r.majorA,t),l=Fi(r.majorB,t);if(a&&l&&(!r.row||r.jobSlot==null||!r.packKey))try{const u=await wu(a,l);if(u.length>0){let f=r.jobSlot??0,h=r.row;if((s=r.title)!=null&&s.trim()){const d=u.findIndex(g=>g.title===r.title);d>=0&&(f=d,h=u[d])}h||(h=u[f]??u[0]),o={...o,row:h,jobSlot:f},e=!0}}catch{}const c=Wi(o,t)??o.packKey;c&&c!==o.packKey&&(o={...o,packKey:c},e=!0),i.push(o)}return e?{...n,fusions:i,updatedAt:Date.now()}:n}async function eo(){const n=Ga(),t=async i=>i?Jf(i):null;if(!uo())return t(n);const e=Ms();if(!e)return t(n);try{const{loadPersonalGalaxy:i}=await ys(async()=>{const{loadPersonalGalaxy:r}=await import("./galaxy-chunk-CPt_plr0.js");return{loadPersonalGalaxy:r}},[],import.meta.url),s=await i(e);if(s&&ix(s)){const r={...s,updatedAt:s.updatedAt??Date.now()};if(!n||(r.updatedAt??0)>=(n.updatedAt??0)){const o=await Jf(r);return Zp(o),o}}}catch{}return t(n)}async function sx(n,t){const e=Ms();if(e==null||e<=0)return{ok:!1};if(!uo())return{ok:!1};try{const{savePersonalGalaxy:i}=await ys(async()=>{const{savePersonalGalaxy:s}=await import("./galaxy-chunk-CPt_plr0.js");return{savePersonalGalaxy:s}},[],import.meta.url);return await i(e,n),{ok:!0}}catch{return{ok:!1}}}const Jp="offercat_personal_starlit_v1",vi=50,Qf=50;function dl(){return{v:1,byFusionId:{},updatedAt:Date.now()}}function Wa(){try{const n=localStorage.getItem(Jp);if(!n)return dl();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||typeof t.byFusionId!="object"?dl():t}catch{return dl()}}function Qp(n){n.updatedAt=Date.now();try{localStorage.setItem(Jp,JSON.stringify(n))}catch{}}async function rx(n,t){if(!uo())return;const e=Ms();if(!e)return;const i=Ga();if(!i)return;const s=Qv(n,i.fusions,i.majors);if(s)try{const{upsertStarlitProgress:r}=await ys(async()=>{const{upsertStarlitProgress:o}=await import("./galaxy-chunk-CPt_plr0.js");return{upsertStarlitProgress:o}},[],import.meta.url);await r(e,s,t.starsLit,t.lastQuestionIndex)}catch{}}async function pc(n){var o,a;if(!uo())return;const t=Ms();if(!t)return;const e=Ga(),i=n??(e==null?void 0:e.fusions)??[],s=(e==null?void 0:e.majors)??[];if(!i.length)return;const r=new Map;for(const l of i){const c=Wi(l,s);c&&r.set(c,l.id)}try{const{fetchStarlitProgress:l}=await ys(async()=>{const{fetchStarlitProgress:h}=await import("./galaxy-chunk-CPt_plr0.js");return{fetchStarlitProgress:h}},[],import.meta.url),c=await l(t),u=Wa();let f=!1;for(const h of c){const d=r.get(h.packKey);if(!d)continue;const g=Math.max(0,Math.floor(h.starsLit)),_=((o=u.byFusionId[d])==null?void 0:o.starsLit)??0,m=Math.max(_,g);(m!==_||!u.byFusionId[d])&&(u.byFusionId[d]={starsLit:m,lastQuestionIndex:h.lastQuestionNo??((a=u.byFusionId[d])==null?void 0:a.lastQuestionIndex)??0,updatedAt:Date.now()},f=!0)}f&&Qp(u)}catch{}}function gr(n,t=vi){var s;const e=((s=Wa().byFusionId[n])==null?void 0:s.starsLit)??0,i=Math.max(1,Math.floor(t));return Math.min(i,Math.max(0,Math.floor(e)))}function ox(){const n=Wa();return Object.keys(n.byFusionId).reduce((t,e)=>t+gr(e),0)}function tm(n){return n.reduce((t,e)=>t+gr(e),0)}function em(n){const t={};for(const e of n)t[e]=gr(e);return t}function Ru(n){const t=n.filter(i=>i.type==="fusion");if(!t.length)return 0;const e=t.reduce((i,s)=>i+gr(s.id),0);return Math.min(1,e/(t.length*vi))}function ax(n){const t=Wa(),e=t.byFusionId[n],i=(e==null?void 0:e.starsLit)??0,s=Math.min(vi,i+1),r={starsLit:s,lastQuestionIndex:((e==null?void 0:e.lastQuestionIndex)??0)+1,updatedAt:Date.now()};return t.byFusionId[n]=r,Qp(t),rx(n,r),typeof window<"u"&&window.dispatchEvent(new CustomEvent("offercat-starlit-updated",{detail:{fusionId:n,starsLit:s}})),s}const th="offercat-starlit-updated";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cu="170",tr={ROTATE:0,DOLLY:1,PAN:2},qs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lx=0,eh=1,cx=2,nm=1,ux=2,ri=3,Xi=0,an=1,Ln=2,hi=0,er=1,us=2,nh=3,ih=4,fx=5,os=100,hx=101,dx=102,px=103,mx=104,gx=200,_x=201,vx=202,xx=203,mc=204,gc=205,yx=206,Mx=207,Sx=208,Ex=209,bx=210,Tx=211,Ax=212,wx=213,Rx=214,_c=0,vc=1,xc=2,cr=3,yc=4,Mc=5,Sc=6,Ec=7,im=0,Cx=1,Px=2,ki=0,sm=1,rm=2,om=3,Pu=4,Dx=5,am=6,lm=7,cm=300,ur=301,fr=302,bc=303,Tc=304,Xa=306,no=1e3,fs=1001,Ac=1002,mn=1003,Lx=1004,So=1005,Un=1006,pl=1007,Bi=1008,$n=1009,um=1010,fm=1011,io=1012,Du=1013,_s=1014,ui=1015,di=1016,Lu=1017,Iu=1018,hr=1020,hm=35902,dm=1021,pm=1022,Sn=1023,mm=1024,gm=1025,nr=1026,dr=1027,_m=1028,Uu=1029,vm=1030,Nu=1031,Ou=1033,ta=33776,ea=33777,na=33778,ia=33779,wc=35840,Rc=35841,Cc=35842,Pc=35843,Dc=36196,Lc=37492,Ic=37496,Uc=37808,Nc=37809,Oc=37810,Fc=37811,Bc=37812,zc=37813,kc=37814,Hc=37815,Vc=37816,Gc=37817,Wc=37818,Xc=37819,jc=37820,qc=37821,sa=36492,Yc=36494,$c=36495,xm=36283,Kc=36284,Zc=36285,Jc=36286,Ix=3200,Ux=3201,ym=0,Nx=1,Ni="",rn="srgb",_r="srgb-linear",ja="linear",ue="srgb",Rs=7680,sh=519,Ox=512,Fx=513,Bx=514,Mm=515,zx=516,kx=517,Hx=518,Vx=519,rh=35044,oh="300 es",fi=2e3,xa=2001;class Ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ra=Math.PI/180,Qc=180/Math.PI;function fo(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Ke(n,t,e){return Math.max(t,Math.min(e,n))}function Gx(n,t){return(n%t+t)%t}function ml(n,t,e){return(1-e)*n+e*t}function wr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Wx={DEG2RAD:ra};class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,i,s,r,o,a,l,c){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],g=i[8],_=s[0],m=s[3],p=s[6],S=s[1],A=s[4],y=s[7],G=s[2],L=s[5],D=s[8];return r[0]=o*_+a*S+l*G,r[3]=o*m+a*A+l*L,r[6]=o*p+a*y+l*D,r[1]=c*_+u*S+f*G,r[4]=c*m+u*A+f*L,r[7]=c*p+u*y+f*D,r[2]=h*_+d*S+g*G,r[5]=h*m+d*A+g*L,r[8]=h*p+d*y+g*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*r,d=c*r-o*l,g=e*f+i*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=h*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(gl.makeScale(t,e)),this}rotate(t){return this.premultiply(gl.makeRotation(-t)),this}translate(t,e){return this.premultiply(gl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const gl=new Kt;function Sm(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ya(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Xx(){const n=ya("canvas");return n.style.display="block",n}const ah={};function Fr(n){n in ah||(ah[n]=!0,console.warn(n))}function jx(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function qx(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Yx(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const te={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ue&&(n.r=pi(n.r),n.g=pi(n.g),n.b=pi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ue&&(n.r=ir(n.r),n.g=ir(n.g),n.b=ir(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ni?ja:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function pi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ir(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const lh=[.64,.33,.3,.6,.15,.06],ch=[.2126,.7152,.0722],uh=[.3127,.329],fh=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hh=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);te.define({[_r]:{primaries:lh,whitePoint:uh,transfer:ja,toXYZ:fh,fromXYZ:hh,luminanceCoefficients:ch,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:lh,whitePoint:uh,transfer:ue,toXYZ:fh,fromXYZ:hh,luminanceCoefficients:ch,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}});let Cs;class $x{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Cs===void 0&&(Cs=ya("canvas")),Cs.width=t.width,Cs.height=t.height;const i=Cs.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Cs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ya("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=pi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(pi(e[i]/255)*255):e[i]=pi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kx=0;class Em{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=fo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(_l(s[o].image)):r.push(_l(s[o]))}else r=_l(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function _l(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?$x.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zx=0;class Qe extends Ss{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,i=fs,s=fs,r=Un,o=Bi,a=Sn,l=$n,c=Qe.DEFAULT_ANISOTROPY,u=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zx++}),this.uuid=fo(),this.name="",this.source=new Em(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==cm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case no:t.x=t.x-Math.floor(t.x);break;case fs:t.x=t.x<0?0:1;break;case Ac:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case no:t.y=t.y-Math.floor(t.y);break;case fs:t.y=t.y<0?0:1;break;case Ac:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=cm;Qe.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,i=0,s=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,y=(d+1)/2,G=(p+1)/2,L=(u+h)/4,D=(f+_)/4,U=(g+m)/4;return A>y&&A>G?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=L/i,r=D/i):y>G?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=L/s,r=U/s):G<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(G),i=D/r,s=U/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(f-_)/S,this.z=(h-u)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jx extends Ss{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Qe(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Em(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class On extends Jx{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class bm extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qx extends Qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vs{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const h=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,S=p>=0?1:-1,A=1-p*p;if(A>Number.EPSILON){const G=Math.sqrt(A),L=Math.atan2(G,p*S);m=Math.sin(m*L)/G,a=Math.sin(a*L)/G}const y=a*S;if(l=l*m+h*y,c=c*m+d*y,u=u*m+g*y,f=f*m+_*y,m===1-a){const G=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=G,c*=G,u*=G,f*=G}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],h=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-a*d,t[e+2]=c*g+u*d+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),h=l(i/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ke(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=s*f+this._y*h,this._z=r*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(t=0,e=0,i=0){X.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(dh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(dh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),f=2*(r*i-o*e);return this.x=e+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return vl.copy(this).projectOnVector(t),this.sub(vl)}reflect(t){return this.sub(vl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ke(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vl=new X,dh=new vs;class xs{constructor(t=new X(1/0,1/0,1/0),e=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Rn):Rn.fromBufferAttribute(r,o),Rn.applyMatrix4(t.matrixWorld),this.expandByPoint(Rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Eo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Eo.copy(i.boundingBox)),Eo.applyMatrix4(t.matrixWorld),this.union(Eo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Rn),Rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rr),bo.subVectors(this.max,Rr),Ps.subVectors(t.a,Rr),Ds.subVectors(t.b,Rr),Ls.subVectors(t.c,Rr),Ti.subVectors(Ds,Ps),Ai.subVectors(Ls,Ds),Zi.subVectors(Ps,Ls);let e=[0,-Ti.z,Ti.y,0,-Ai.z,Ai.y,0,-Zi.z,Zi.y,Ti.z,0,-Ti.x,Ai.z,0,-Ai.x,Zi.z,0,-Zi.x,-Ti.y,Ti.x,0,-Ai.y,Ai.x,0,-Zi.y,Zi.x,0];return!xl(e,Ps,Ds,Ls,bo)||(e=[1,0,0,0,1,0,0,0,1],!xl(e,Ps,Ds,Ls,bo))?!1:(To.crossVectors(Ti,Ai),e=[To.x,To.y,To.z],xl(e,Ps,Ds,Ls,bo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ti=[new X,new X,new X,new X,new X,new X,new X,new X],Rn=new X,Eo=new xs,Ps=new X,Ds=new X,Ls=new X,Ti=new X,Ai=new X,Zi=new X,Rr=new X,bo=new X,To=new X,Ji=new X;function xl(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ji.fromArray(n,r);const a=s.x*Math.abs(Ji.x)+s.y*Math.abs(Ji.y)+s.z*Math.abs(Ji.z),l=t.dot(Ji),c=e.dot(Ji),u=i.dot(Ji);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const ty=new xs,Cr=new X,yl=new X;class vr{constructor(t=new X,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ty.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Cr.subVectors(t,this.center);const e=Cr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Cr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Cr.copy(t.center).add(yl)),this.expandByPoint(Cr.copy(t.center).sub(yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ei=new X,Ml=new X,Ao=new X,wi=new X,Sl=new X,wo=new X,El=new X;class ho{constructor(t=new X,e=new X(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ei.copy(this.origin).addScaledVector(this.direction,e),ei.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ml.copy(t).add(e).multiplyScalar(.5),Ao.copy(e).sub(t).normalize(),wi.copy(this.origin).sub(Ml);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ao),a=wi.dot(this.direction),l=-wi.dot(Ao),c=wi.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=r*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*r+a)),h=f>0?-r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-r,-l),r),d=h*(h+2*l)+c):(f=Math.max(0,-(o*r+a)),h=f>0?r:Math.min(Math.max(-r,-l),r),d=-f*f+h*(h+2*l)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ml).addScaledVector(Ao,h),d}intersectSphere(t,e){ei.subVectors(t.center,this.origin);const i=ei.dot(this.direction),s=ei.dot(ei)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,ei)!==null}intersectTriangle(t,e,i,s,r){Sl.subVectors(e,t),wo.subVectors(i,t),El.crossVectors(Sl,wo);let o=this.direction.dot(El),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wi.subVectors(this.origin,t);const l=a*this.direction.dot(wo.crossVectors(wi,wo));if(l<0)return null;const c=a*this.direction.dot(Sl.cross(wi));if(c<0||l+c>o)return null;const u=-a*wi.dot(El);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class pe{constructor(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m){pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new pe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Is.setFromMatrixColumn(t,0).length(),r=1/Is.setFromMatrixColumn(t,1).length(),o=1/Is.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ey,t,ny)}lookAt(t,e,i){const s=this.elements;return cn.subVectors(t,e),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),Ri.crossVectors(i,cn),Ri.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),Ri.crossVectors(i,cn)),Ri.normalize(),Ro.crossVectors(cn,Ri),s[0]=Ri.x,s[4]=Ro.x,s[8]=cn.x,s[1]=Ri.y,s[5]=Ro.y,s[9]=cn.y,s[2]=Ri.z,s[6]=Ro.z,s[10]=cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],S=i[3],A=i[7],y=i[11],G=i[15],L=s[0],D=s[4],U=s[8],b=s[12],E=s[1],P=s[5],O=s[9],B=s[13],K=s[2],lt=s[6],Y=s[10],J=s[14],N=s[3],Q=s[7],vt=s[11],bt=s[15];return r[0]=o*L+a*E+l*K+c*N,r[4]=o*D+a*P+l*lt+c*Q,r[8]=o*U+a*O+l*Y+c*vt,r[12]=o*b+a*B+l*J+c*bt,r[1]=u*L+f*E+h*K+d*N,r[5]=u*D+f*P+h*lt+d*Q,r[9]=u*U+f*O+h*Y+d*vt,r[13]=u*b+f*B+h*J+d*bt,r[2]=g*L+_*E+m*K+p*N,r[6]=g*D+_*P+m*lt+p*Q,r[10]=g*U+_*O+m*Y+p*vt,r[14]=g*b+_*B+m*J+p*bt,r[3]=S*L+A*E+y*K+G*N,r[7]=S*D+A*P+y*lt+G*Q,r[11]=S*U+A*O+y*Y+G*vt,r[15]=S*b+A*B+y*J+G*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*f-s*c*f-r*a*h+i*c*h+s*a*d-i*l*d)+_*(+e*l*d-e*c*h+r*o*h-s*o*d+s*c*u-r*l*u)+m*(+e*c*f-e*a*d-r*o*f+i*o*d+r*a*u-i*c*u)+p*(-s*a*u-e*l*f+e*a*h+s*o*f-i*o*h+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,A=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,y=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,G=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,L=e*S+i*A+s*y+r*G;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/L;return t[0]=S*D,t[1]=(_*h*r-f*m*r-_*s*d+i*m*d+f*s*p-i*h*p)*D,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*D,t[3]=(f*l*r-a*h*r-f*s*c+i*h*c+a*s*d-i*l*d)*D,t[4]=A*D,t[5]=(u*m*r-g*h*r+g*s*d-e*m*d-u*s*p+e*h*p)*D,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*D,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*d+e*l*d)*D,t[8]=y*D,t[9]=(g*f*r-u*_*r-g*i*d+e*_*d+u*i*p-e*f*p)*D,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*p+e*a*p)*D,t[11]=(u*a*r-o*f*r-u*i*c+e*f*c+o*i*d-e*a*d)*D,t[12]=G*D,t[13]=(u*_*s-g*f*s+g*i*h-e*_*h-u*i*m+e*f*m)*D,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*D,t[15]=(o*f*s-u*a*s+u*i*l-e*f*l-o*i*h+e*a*h)*D,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,f=a+a,h=r*c,d=r*u,g=r*f,_=o*u,m=o*f,p=a*f,S=l*c,A=l*u,y=l*f,G=i.x,L=i.y,D=i.z;return s[0]=(1-(_+p))*G,s[1]=(d+y)*G,s[2]=(g-A)*G,s[3]=0,s[4]=(d-y)*L,s[5]=(1-(h+p))*L,s[6]=(m+S)*L,s[7]=0,s[8]=(g+A)*D,s[9]=(m-S)*D,s[10]=(1-(h+_))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Is.set(s[0],s[1],s[2]).length();const o=Is.set(s[4],s[5],s[6]).length(),a=Is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Cn.copy(this);const c=1/r,u=1/o,f=1/a;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=f,Cn.elements[9]*=f,Cn.elements[10]*=f,e.setFromRotationMatrix(Cn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=fi){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),h=(i+s)/(i-s);let d,g;if(a===fi)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===xa)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=fi){const l=this.elements,c=1/(e-t),u=1/(i-s),f=1/(o-r),h=(e+t)*c,d=(i+s)*u;let g,_;if(a===fi)g=(o+r)*f,_=-2*f;else if(a===xa)g=r*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Is=new X,Cn=new pe,ey=new X(0,0,0),ny=new X(1,1,1),Ri=new X,Ro=new X,cn=new X,ph=new pe,mh=new vs;class Kn{constructor(t=0,e=0,i=0,s=Kn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],h=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ph.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ph,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return mh.setFromEuler(this),this.setFromQuaternion(mh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kn.DEFAULT_ORDER="XYZ";class Fu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let iy=0;const gh=new X,Us=new vs,ni=new pe,Co=new X,Pr=new X,sy=new X,ry=new vs,_h=new X(1,0,0),vh=new X(0,1,0),xh=new X(0,0,1),yh={type:"added"},oy={type:"removed"},Ns={type:"childadded",child:null},bl={type:"childremoved",child:null};class we extends Ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iy++}),this.uuid=fo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new X,e=new Kn,i=new vs,s=new X(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Kt}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Us.setFromAxisAngle(t,e),this.quaternion.multiply(Us),this}rotateOnWorldAxis(t,e){return Us.setFromAxisAngle(t,e),this.quaternion.premultiply(Us),this}rotateX(t){return this.rotateOnAxis(_h,t)}rotateY(t){return this.rotateOnAxis(vh,t)}rotateZ(t){return this.rotateOnAxis(xh,t)}translateOnAxis(t,e){return gh.copy(t).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(_h,t)}translateY(t){return this.translateOnAxis(vh,t)}translateZ(t){return this.translateOnAxis(xh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Co.copy(t):Co.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(Pr,Co,this.up):ni.lookAt(Co,Pr,this.up),this.quaternion.setFromRotationMatrix(ni),s&&(ni.extractRotation(s.matrixWorld),Us.setFromRotationMatrix(ni),this.quaternion.premultiply(Us.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(yh),Ns.child=t,this.dispatchEvent(Ns),Ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(oy),bl.child=t,this.dispatchEvent(bl),bl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ni.multiply(t.parent.matrixWorld)),t.applyMatrix4(ni),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(yh),Ns.child=t,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,t,sy),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,ry,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}we.DEFAULT_UP=new X(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new X,ii=new X,Tl=new X,si=new X,Os=new X,Fs=new X,Mh=new X,Al=new X,wl=new X,Rl=new X,Cl=new Se,Pl=new Se,Dl=new Se;class In{constructor(t=new X,e=new X,i=new X){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Pn.subVectors(t,e),s.cross(Pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Pn.subVectors(s,e),ii.subVectors(i,e),Tl.subVectors(t,e);const o=Pn.dot(Pn),a=Pn.dot(ii),l=Pn.dot(Tl),c=ii.dot(ii),u=ii.dot(Tl),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,si.x),l.addScaledVector(o,si.y),l.addScaledVector(a,si.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Cl.setScalar(0),Pl.setScalar(0),Dl.setScalar(0),Cl.fromBufferAttribute(t,e),Pl.fromBufferAttribute(t,i),Dl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Cl,r.x),o.addScaledVector(Pl,r.y),o.addScaledVector(Dl,r.z),o}static isFrontFacing(t,e,i,s){return Pn.subVectors(i,e),ii.subVectors(t,e),Pn.cross(ii).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),Pn.cross(ii).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return In.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return In.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return In.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return In.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return In.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Os.subVectors(s,i),Fs.subVectors(r,i),Al.subVectors(t,i);const l=Os.dot(Al),c=Fs.dot(Al);if(l<=0&&c<=0)return e.copy(i);wl.subVectors(t,s);const u=Os.dot(wl),f=Fs.dot(wl);if(u>=0&&f<=u)return e.copy(s);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Os,o);Rl.subVectors(t,r);const d=Os.dot(Rl),g=Fs.dot(Rl);if(g>=0&&d<=g)return e.copy(r);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Fs,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return Mh.subVectors(r,s),a=(f-u)/(f-u+(d-g)),e.copy(s).addScaledVector(Mh,a);const p=1/(m+_+h);return o=_*p,a=h*p,e.copy(i).addScaledVector(Os,o).addScaledVector(Fs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Tm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Po={h:0,s:0,l:0};function Ll(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class qt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=i,te.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=te.workingColorSpace){if(t=Gx(t,1),e=Ke(e,0,1),i=Ke(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Ll(o,r,t+1/3),this.g=Ll(o,r,t),this.b=Ll(o,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=rn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){const i=Tm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pi(t.r),this.g=pi(t.g),this.b=pi(t.b),this}copyLinearToSRGB(t){return this.r=ir(t.r),this.g=ir(t.g),this.b=ir(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return te.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Ke(Fe.r*255,0,255))*65536+Math.round(Ke(Fe.g*255,0,255))*256+Math.round(Ke(Fe.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=rn){te.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ci),this.setHSL(Ci.h+t,Ci.s+e,Ci.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ci),t.getHSL(Po);const i=ml(Ci.h,Po.h,e),s=ml(Ci.s,Po.s,e),r=ml(Ci.l,Po.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new qt;qt.NAMES=Tm;let ay=0;class Es extends Ss{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ay++}),this.uuid=fo(),this.name="",this.blending=er,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mc,this.blendDst=gc,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rs,this.stencilZFail=Rs,this.stencilZPass=Rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==Xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==mc&&(i.blendSrc=this.blendSrc),this.blendDst!==gc&&(i.blendDst=this.blendDst),this.blendEquation!==os&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class fn extends Es{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=im,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new X,Do=new Vt;class Tn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=rh,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Do.fromBufferAttribute(this,e),Do.applyMatrix3(t),this.setXY(e,Do.x,Do.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=wr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=nn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wr(e,this.array)),e}setX(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wr(e,this.array)),e}setY(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wr(e,this.array)),e}setW(t,e){return this.normalized&&(e=nn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=nn(e,this.array),i=nn(i,this.array),s=nn(s,this.array),r=nn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==rh&&(t.usage=this.usage),t}}class Am extends Tn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class wm extends Tn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ee extends Tn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ly=0;const yn=new pe,Il=new we,Bs=new X,un=new xs,Dr=new xs,Le=new X;class Ve extends Ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ly++}),this.uuid=fo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Sm(t)?wm:Am)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Kt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return yn.makeRotationFromQuaternion(t),this.applyMatrix4(yn),this}rotateX(t){return yn.makeRotationX(t),this.applyMatrix4(yn),this}rotateY(t){return yn.makeRotationY(t),this.applyMatrix4(yn),this}rotateZ(t){return yn.makeRotationZ(t),this.applyMatrix4(yn),this}translate(t,e,i){return yn.makeTranslation(t,e,i),this.applyMatrix4(yn),this}scale(t,e,i){return yn.makeScale(t,e,i),this.applyMatrix4(yn),this}lookAt(t){return Il.lookAt(t),Il.updateMatrix(),this.applyMatrix4(Il.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ee(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(t){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(un.min,Dr.min),un.expandByPoint(Le),Le.addVectors(un.max,Dr.max),un.expandByPoint(Le)):(un.expandByPoint(Dr.min),un.expandByPoint(Dr.max))}un.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Le.fromBufferAttribute(a,c),l&&(Bs.fromBufferAttribute(t,c),Le.add(Bs)),s=Math.max(s,i.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<i.count;U++)a[U]=new X,l[U]=new X;const c=new X,u=new X,f=new X,h=new Vt,d=new Vt,g=new Vt,_=new X,m=new X;function p(U,b,E){c.fromBufferAttribute(i,U),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,E),h.fromBufferAttribute(r,U),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,E),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[U].add(_),a[b].add(_),a[E].add(_),l[U].add(m),l[b].add(m),l[E].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let U=0,b=S.length;U<b;++U){const E=S[U],P=E.start,O=E.count;for(let B=P,K=P+O;B<K;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const A=new X,y=new X,G=new X,L=new X;function D(U){G.fromBufferAttribute(s,U),L.copy(G);const b=a[U];A.copy(b),A.sub(G.multiplyScalar(G.dot(b))).normalize(),y.crossVectors(L,b);const P=y.dot(l[U])<0?-1:1;o.setXYZW(U,A.x,A.y,A.z,P)}for(let U=0,b=S.length;U<b;++U){const E=S[U],P=E.start,O=E.count;for(let B=P,K=P+O;B<K;B+=3)D(t.getX(B+0)),D(t.getX(B+1)),D(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new X,r=new X,o=new X,a=new X,l=new X,c=new X,u=new X,f=new X;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new Tn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ve,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,i);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],f=r[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sh=new pe,Qi=new ho,Lo=new vr,Eh=new X,Io=new X,Uo=new X,No=new X,Ul=new X,Oo=new X,bh=new X,Fo=new X;class Te extends we{constructor(t=new Ve,e=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Oo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(Ul.fromBufferAttribute(f,t),o?Oo.addScaledVector(Ul,u):Oo.addScaledVector(Ul.sub(e),u))}e.add(Oo)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Lo.copy(i.boundingSphere),Lo.applyMatrix4(r),Qi.copy(t.ray).recast(t.near),!(Lo.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(Lo,Eh)===null||Qi.origin.distanceToSquared(Eh)>(t.far-t.near)**2))&&(Sh.copy(r).invert(),Qi.copy(t.ray).applyMatrix4(Sh),!(i.boundingBox!==null&&Qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Qi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),A=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let y=S,G=A;y<G;y+=3){const L=a.getX(y),D=a.getX(y+1),U=a.getX(y+2);s=Bo(this,p,t,i,c,u,f,L,D,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),A=a.getX(m+1),y=a.getX(m+2);s=Bo(this,o,t,i,c,u,f,S,A,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),A=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let y=S,G=A;y<G;y+=3){const L=y,D=y+1,U=y+2;s=Bo(this,p,t,i,c,u,f,L,D,U),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=m,A=m+1,y=m+2;s=Bo(this,o,t,i,c,u,f,S,A,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function cy(n,t,e,i,s,r,o,a){let l;if(t.side===an?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Xi,a),l===null)return null;Fo.copy(a),Fo.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Fo);return c<e.near||c>e.far?null:{distance:c,point:Fo.clone(),object:n}}function Bo(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Io),n.getVertexPosition(l,Uo),n.getVertexPosition(c,No);const u=cy(n,t,e,i,Io,Uo,No,bh);if(u){const f=new X;In.getBarycoord(bh,Io,Uo,No,f),s&&(u.uv=In.getInterpolatedAttribute(s,a,l,c,f,new Vt)),r&&(u.uv1=In.getInterpolatedAttribute(r,a,l,c,f,new Vt)),o&&(u.normal=In.getInterpolatedAttribute(o,a,l,c,f,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new X,materialIndex:0};In.getNormal(Io,Uo,No,h.normal),u.face=h,u.barycoord=f}return u}class po extends Ve{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ee(c,3)),this.setAttribute("normal",new Ee(u,3)),this.setAttribute("uv",new Ee(f,2));function g(_,m,p,S,A,y,G,L,D,U,b){const E=y/D,P=G/U,O=y/2,B=G/2,K=L/2,lt=D+1,Y=U+1;let J=0,N=0;const Q=new X;for(let vt=0;vt<Y;vt++){const bt=vt*P-B;for(let Ot=0;Ot<lt;Ot++){const Qt=Ot*E-O;Q[_]=Qt*S,Q[m]=bt*A,Q[p]=K,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[p]=L>0?1:-1,u.push(Q.x,Q.y,Q.z),f.push(Ot/D),f.push(1-vt/U),J+=1}}for(let vt=0;vt<U;vt++)for(let bt=0;bt<D;bt++){const Ot=h+bt+lt*vt,Qt=h+bt+lt*(vt+1),ct=h+(bt+1)+lt*(vt+1),_t=h+(bt+1)+lt*vt;l.push(Ot,Qt,_t),l.push(Qt,ct,_t),N+=6}a.addGroup(d,N,b),d+=N,h+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new po(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function pr(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function je(n){const t={};for(let e=0;e<n.length;e++){const i=pr(n[e]);for(const s in i)t[s]=i[s]}return t}function uy(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Rm(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const so={clone:pr,merge:je};var fy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ke extends Es{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fy,this.fragmentShader=hy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=pr(t.uniforms),this.uniformsGroups=uy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Cm extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=fi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pi=new X,Th=new Vt,Ah=new Vt;class Mn extends Cm{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Qc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ra*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qc*2*Math.atan(Math.tan(ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z),Pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pi.x,Pi.y).multiplyScalar(-t/Pi.z)}getViewSize(t,e){return this.getViewBounds(t,Th,Ah),e.subVectors(Ah,Th)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ra*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zs=-90,ks=1;class dy extends we{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(zs,ks,t,e);s.layers=this.layers,this.add(s);const r=new Mn(zs,ks,t,e);r.layers=this.layers,this.add(r);const o=new Mn(zs,ks,t,e);o.layers=this.layers,this.add(o);const a=new Mn(zs,ks,t,e);a.layers=this.layers,this.add(a);const l=new Mn(zs,ks,t,e);l.layers=this.layers,this.add(l);const c=new Mn(zs,ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===fi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===xa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Pm extends Qe{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:ur,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class py extends On{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Pm(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new po(5,5,5),r=new ke({name:"CubemapFromEquirect",uniforms:pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:an,blending:hi});r.uniforms.tEquirect.value=e;const o=new Te(s,r),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Un),new dy(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Nl=new X,my=new X,gy=new Kt;class Ui{constructor(t=new X(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Nl.subVectors(i,e).cross(my.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Nl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||gy.getNormalMatrix(t),s=this.coplanarPoint(Nl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ts=new vr,zo=new X;class Bu{constructor(t=new Ui,e=new Ui,i=new Ui,s=new Ui,r=new Ui,o=new Ui){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=fi){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],f=s[6],h=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],S=s[13],A=s[14],y=s[15];if(i[0].setComponents(l-r,h-c,m-d,y-p).normalize(),i[1].setComponents(l+r,h+c,m+d,y+p).normalize(),i[2].setComponents(l+o,h+u,m+g,y+S).normalize(),i[3].setComponents(l-o,h-u,m-g,y-S).normalize(),i[4].setComponents(l-a,h-f,m-_,y-A).normalize(),e===fi)i[5].setComponents(l+a,h+f,m+_,y+A).normalize();else if(e===xa)i[5].setComponents(a,f,_,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ts.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ts.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ts)}intersectsSprite(t){return ts.center.set(0,0,0),ts.radius=.7071067811865476,ts.applyMatrix4(t.matrixWorld),this.intersectsSphere(ts)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(zo.x=s.normal.x>0?t.max.x:t.min.x,zo.y=s.normal.y>0?t.max.y:t.min.y,zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function _y(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class qa extends Ve{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=t/a,h=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const S=p*h-o;for(let A=0;A<c;A++){const y=A*f-r;g.push(y,-S,0),_.push(0,0,1),m.push(A/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const A=S+c*p,y=S+c*(p+1),G=S+1+c*(p+1),L=S+1+c*p;d.push(A,y,L),d.push(y,G,L)}this.setIndex(d),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(_,3)),this.setAttribute("uv",new Ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qa(t.width,t.height,t.widthSegments,t.heightSegments)}}var vy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xy=`#ifdef USE_ALPHAHASH
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
#endif`,yy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,My=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ey=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,by=`#ifdef USE_AOMAP
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
#endif`,Ty=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ay=`#ifdef USE_BATCHING
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
#endif`,wy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ry=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Py=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dy=`#ifdef USE_IRIDESCENCE
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
#endif`,Ly=`#ifdef USE_BUMPMAP
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
#endif`,Iy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Uy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ny=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Oy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,By=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ky=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Hy=`#define PI 3.141592653589793
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
} // validated`,Vy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gy=`vec3 transformedNormal = objectNormal;
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
#endif`,Wy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yy="gl_FragColor = linearToOutputTexel( gl_FragColor );",$y=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ky=`#ifdef USE_ENVMAP
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
#endif`,Zy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jy=`#ifdef USE_ENVMAP
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
#endif`,Qy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tM=`#ifdef USE_ENVMAP
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
#endif`,eM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rM=`#ifdef USE_GRADIENTMAP
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
}`,oM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,aM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cM=`uniform bool receiveShadow;
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
#endif`,uM=`#ifdef USE_ENVMAP
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
#endif`,fM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mM=`PhysicalMaterial material;
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
#endif`,gM=`struct PhysicalMaterial {
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
}`,_M=`
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
#endif`,vM=`#if defined( RE_IndirectDiffuse )
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
#endif`,xM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,MM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,SM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,EM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,bM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,TM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,AM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wM=`#if defined( USE_POINTS_UV )
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
#endif`,RM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,CM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,PM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,DM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,LM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IM=`#ifdef USE_MORPHTARGETS
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
#endif`,UM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,NM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,OM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,FM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kM=`#ifdef USE_NORMALMAP
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
#endif`,HM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,VM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,GM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,WM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,XM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,YM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$M=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,KM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,JM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,QM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nS=`float getShadowMask() {
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
}`,iS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sS=`#ifdef USE_SKINNING
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
#endif`,rS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,oS=`#ifdef USE_SKINNING
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
#endif`,aS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fS=`#ifdef USE_TRANSMISSION
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
#endif`,hS=`#ifdef USE_TRANSMISSION
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
#endif`,dS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _S=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vS=`uniform sampler2D t2D;
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
}`,xS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,MS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,SS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ES=`#include <common>
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
}`,bS=`#if DEPTH_PACKING == 3200
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
}`,TS=`#define DISTANCE
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
}`,AS=`#define DISTANCE
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
}`,wS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,RS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CS=`uniform float scale;
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
}`,PS=`uniform vec3 diffuse;
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
}`,DS=`#include <common>
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
}`,LS=`uniform vec3 diffuse;
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
}`,IS=`#define LAMBERT
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
}`,US=`#define LAMBERT
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
}`,NS=`#define MATCAP
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
}`,OS=`#define MATCAP
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
}`,FS=`#define NORMAL
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
}`,BS=`#define NORMAL
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
}`,zS=`#define PHONG
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
}`,kS=`#define PHONG
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
}`,HS=`#define STANDARD
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
}`,VS=`#define STANDARD
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
}`,GS=`#define TOON
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
}`,WS=`#define TOON
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
}`,XS=`uniform float size;
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
}`,jS=`uniform vec3 diffuse;
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
}`,qS=`#include <common>
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
}`,YS=`uniform vec3 color;
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
}`,$S=`uniform float rotation;
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
}`,KS=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:vy,alphahash_pars_fragment:xy,alphamap_fragment:yy,alphamap_pars_fragment:My,alphatest_fragment:Sy,alphatest_pars_fragment:Ey,aomap_fragment:by,aomap_pars_fragment:Ty,batching_pars_vertex:Ay,batching_vertex:wy,begin_vertex:Ry,beginnormal_vertex:Cy,bsdfs:Py,iridescence_fragment:Dy,bumpmap_pars_fragment:Ly,clipping_planes_fragment:Iy,clipping_planes_pars_fragment:Uy,clipping_planes_pars_vertex:Ny,clipping_planes_vertex:Oy,color_fragment:Fy,color_pars_fragment:By,color_pars_vertex:zy,color_vertex:ky,common:Hy,cube_uv_reflection_fragment:Vy,defaultnormal_vertex:Gy,displacementmap_pars_vertex:Wy,displacementmap_vertex:Xy,emissivemap_fragment:jy,emissivemap_pars_fragment:qy,colorspace_fragment:Yy,colorspace_pars_fragment:$y,envmap_fragment:Ky,envmap_common_pars_fragment:Zy,envmap_pars_fragment:Jy,envmap_pars_vertex:Qy,envmap_physical_pars_fragment:uM,envmap_vertex:tM,fog_vertex:eM,fog_pars_vertex:nM,fog_fragment:iM,fog_pars_fragment:sM,gradientmap_pars_fragment:rM,lightmap_pars_fragment:oM,lights_lambert_fragment:aM,lights_lambert_pars_fragment:lM,lights_pars_begin:cM,lights_toon_fragment:fM,lights_toon_pars_fragment:hM,lights_phong_fragment:dM,lights_phong_pars_fragment:pM,lights_physical_fragment:mM,lights_physical_pars_fragment:gM,lights_fragment_begin:_M,lights_fragment_maps:vM,lights_fragment_end:xM,logdepthbuf_fragment:yM,logdepthbuf_pars_fragment:MM,logdepthbuf_pars_vertex:SM,logdepthbuf_vertex:EM,map_fragment:bM,map_pars_fragment:TM,map_particle_fragment:AM,map_particle_pars_fragment:wM,metalnessmap_fragment:RM,metalnessmap_pars_fragment:CM,morphinstance_vertex:PM,morphcolor_vertex:DM,morphnormal_vertex:LM,morphtarget_pars_vertex:IM,morphtarget_vertex:UM,normal_fragment_begin:NM,normal_fragment_maps:OM,normal_pars_fragment:FM,normal_pars_vertex:BM,normal_vertex:zM,normalmap_pars_fragment:kM,clearcoat_normal_fragment_begin:HM,clearcoat_normal_fragment_maps:VM,clearcoat_pars_fragment:GM,iridescence_pars_fragment:WM,opaque_fragment:XM,packing:jM,premultiplied_alpha_fragment:qM,project_vertex:YM,dithering_fragment:$M,dithering_pars_fragment:KM,roughnessmap_fragment:ZM,roughnessmap_pars_fragment:JM,shadowmap_pars_fragment:QM,shadowmap_pars_vertex:tS,shadowmap_vertex:eS,shadowmask_pars_fragment:nS,skinbase_vertex:iS,skinning_pars_vertex:sS,skinning_vertex:rS,skinnormal_vertex:oS,specularmap_fragment:aS,specularmap_pars_fragment:lS,tonemapping_fragment:cS,tonemapping_pars_fragment:uS,transmission_fragment:fS,transmission_pars_fragment:hS,uv_pars_fragment:dS,uv_pars_vertex:pS,uv_vertex:mS,worldpos_vertex:gS,background_vert:_S,background_frag:vS,backgroundCube_vert:xS,backgroundCube_frag:yS,cube_vert:MS,cube_frag:SS,depth_vert:ES,depth_frag:bS,distanceRGBA_vert:TS,distanceRGBA_frag:AS,equirect_vert:wS,equirect_frag:RS,linedashed_vert:CS,linedashed_frag:PS,meshbasic_vert:DS,meshbasic_frag:LS,meshlambert_vert:IS,meshlambert_frag:US,meshmatcap_vert:NS,meshmatcap_frag:OS,meshnormal_vert:FS,meshnormal_frag:BS,meshphong_vert:zS,meshphong_frag:kS,meshphysical_vert:HS,meshphysical_frag:VS,meshtoon_vert:GS,meshtoon_frag:WS,points_vert:XS,points_frag:jS,shadow_vert:qS,shadow_frag:YS,sprite_vert:$S,sprite_frag:KS},At={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Wn={basic:{uniforms:je([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:je([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new qt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:je([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:je([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:je([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new qt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:je([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:je([At.points,At.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:je([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:je([At.common,At.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:je([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:je([At.sprite,At.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:je([At.common,At.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:je([At.lights,At.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Wn.physical={uniforms:je([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const ko={r:0,b:0,g:0},es=new Kn,ZS=new pe;function JS(n,t,e,i,s,r,o){const a=new qt(0);let l=r===!0?0:1,c,u,f=null,h=0,d=null;function g(S){let A=S.isScene===!0?S.background:null;return A&&A.isTexture&&(A=(S.backgroundBlurriness>0?e:t).get(A)),A}function _(S){let A=!1;const y=g(S);y===null?p(a,l):y&&y.isColor&&(p(y,1),A=!0);const G=n.xr.getEnvironmentBlendMode();G==="additive"?i.buffers.color.setClear(0,0,0,1,o):G==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,A){const y=g(A);y&&(y.isCubeTexture||y.mapping===Xa)?(u===void 0&&(u=new Te(new po(1,1,1),new ke({name:"BackgroundCubeMaterial",uniforms:pr(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(G,L,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),es.copy(A.backgroundRotation),es.x*=-1,es.y*=-1,es.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(es.y*=-1,es.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ZS.makeRotationFromEuler(es)),u.material.toneMapped=te.getTransfer(y.colorSpace)!==ue,(f!==y||h!==y.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=y,h=y.version,d=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Te(new qa(2,2),new ke({name:"BackgroundMaterial",uniforms:pr(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=te.getTransfer(y.colorSpace)!==ue,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||h!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=y,h=y.version,d=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,A){S.getRGB(ko,Rm(n)),i.buffers.color.setClear(ko.r,ko.g,ko.b,A,o)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),l=A,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m}}function QS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,o=!1;function a(E,P,O,B,K){let lt=!1;const Y=f(B,O,P);r!==Y&&(r=Y,c(r.object)),lt=d(E,B,O,K),lt&&g(E,B,O,K),K!==null&&t.update(K,n.ELEMENT_ARRAY_BUFFER),(lt||o)&&(o=!1,y(E,P,O,B),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function f(E,P,O){const B=O.wireframe===!0;let K=i[E.id];K===void 0&&(K={},i[E.id]=K);let lt=K[P.id];lt===void 0&&(lt={},K[P.id]=lt);let Y=lt[B];return Y===void 0&&(Y=h(l()),lt[B]=Y),Y}function h(E){const P=[],O=[],B=[];for(let K=0;K<e;K++)P[K]=0,O[K]=0,B[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:B,object:E,attributes:{},index:null}}function d(E,P,O,B){const K=r.attributes,lt=P.attributes;let Y=0;const J=O.getAttributes();for(const N in J)if(J[N].location>=0){const vt=K[N];let bt=lt[N];if(bt===void 0&&(N==="instanceMatrix"&&E.instanceMatrix&&(bt=E.instanceMatrix),N==="instanceColor"&&E.instanceColor&&(bt=E.instanceColor)),vt===void 0||vt.attribute!==bt||bt&&vt.data!==bt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==B}function g(E,P,O,B){const K={},lt=P.attributes;let Y=0;const J=O.getAttributes();for(const N in J)if(J[N].location>=0){let vt=lt[N];vt===void 0&&(N==="instanceMatrix"&&E.instanceMatrix&&(vt=E.instanceMatrix),N==="instanceColor"&&E.instanceColor&&(vt=E.instanceColor));const bt={};bt.attribute=vt,vt&&vt.data&&(bt.data=vt.data),K[N]=bt,Y++}r.attributes=K,r.attributesNum=Y,r.index=B}function _(){const E=r.newAttributes;for(let P=0,O=E.length;P<O;P++)E[P]=0}function m(E){p(E,0)}function p(E,P){const O=r.newAttributes,B=r.enabledAttributes,K=r.attributeDivisors;O[E]=1,B[E]===0&&(n.enableVertexAttribArray(E),B[E]=1),K[E]!==P&&(n.vertexAttribDivisor(E,P),K[E]=P)}function S(){const E=r.newAttributes,P=r.enabledAttributes;for(let O=0,B=P.length;O<B;O++)P[O]!==E[O]&&(n.disableVertexAttribArray(O),P[O]=0)}function A(E,P,O,B,K,lt,Y){Y===!0?n.vertexAttribIPointer(E,P,O,K,lt):n.vertexAttribPointer(E,P,O,B,K,lt)}function y(E,P,O,B){_();const K=B.attributes,lt=O.getAttributes(),Y=P.defaultAttributeValues;for(const J in lt){const N=lt[J];if(N.location>=0){let Q=K[J];if(Q===void 0&&(J==="instanceMatrix"&&E.instanceMatrix&&(Q=E.instanceMatrix),J==="instanceColor"&&E.instanceColor&&(Q=E.instanceColor)),Q!==void 0){const vt=Q.normalized,bt=Q.itemSize,Ot=t.get(Q);if(Ot===void 0)continue;const Qt=Ot.buffer,ct=Ot.type,_t=Ot.bytesPerElement,Tt=ct===n.INT||ct===n.UNSIGNED_INT||Q.gpuType===Du;if(Q.isInterleavedBufferAttribute){const k=Q.data,ft=k.stride,ut=Q.offset;if(k.isInstancedInterleavedBuffer){for(let gt=0;gt<N.locationSize;gt++)p(N.location+gt,k.meshPerAttribute);E.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let gt=0;gt<N.locationSize;gt++)m(N.location+gt);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let gt=0;gt<N.locationSize;gt++)A(N.location+gt,bt/N.locationSize,ct,vt,ft*_t,(ut+bt/N.locationSize*gt)*_t,Tt)}else{if(Q.isInstancedBufferAttribute){for(let k=0;k<N.locationSize;k++)p(N.location+k,Q.meshPerAttribute);E.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let k=0;k<N.locationSize;k++)m(N.location+k);n.bindBuffer(n.ARRAY_BUFFER,Qt);for(let k=0;k<N.locationSize;k++)A(N.location+k,bt/N.locationSize,ct,vt,bt*_t,bt/N.locationSize*k*_t,Tt)}}else if(Y!==void 0){const vt=Y[J];if(vt!==void 0)switch(vt.length){case 2:n.vertexAttrib2fv(N.location,vt);break;case 3:n.vertexAttrib3fv(N.location,vt);break;case 4:n.vertexAttrib4fv(N.location,vt);break;default:n.vertexAttrib1fv(N.location,vt)}}}}S()}function G(){U();for(const E in i){const P=i[E];for(const O in P){const B=P[O];for(const K in B)u(B[K].object),delete B[K];delete P[O]}delete i[E]}}function L(E){if(i[E.id]===void 0)return;const P=i[E.id];for(const O in P){const B=P[O];for(const K in B)u(B[K].object),delete B[K];delete P[O]}delete i[E.id]}function D(E){for(const P in i){const O=i[P];if(O[E.id]===void 0)continue;const B=O[E.id];for(const K in B)u(B[K].object),delete B[K];delete O[E.id]}}function U(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:U,resetDefaultState:b,dispose:G,releaseStatesOfGeometry:L,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function tE(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),e.update(u,i,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,i,1)}function l(c,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function eE(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==Sn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const U=D===di&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==$n&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==ui&&!U)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),G=g>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:y,vertexTextures:G,maxSamples:L}}function nE(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new Ui,a=new Kt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||s;return s=h,i=f.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,A=S*4;let y=p.clippingState||null;l.value=y,y=u(g,h,A,d);for(let G=0;G!==A;++G)y[G]=e[G];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,S=h.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,y=d;A!==_;++A,y+=4)o.copy(f[A]).applyMatrix4(S,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function iE(n){let t=new WeakMap;function e(o,a){return a===bc?o.mapping=ur:a===Tc&&(o.mapping=fr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===bc||a===Tc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new py(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class zu extends Cm{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ys=4,wh=[.125,.215,.35,.446,.526,.582],as=20,Ol=new zu,Rh=new qt;let Fl=null,Bl=0,zl=0,kl=!1;const ss=(1+Math.sqrt(5))/2,Hs=1/ss,Ch=[new X(-ss,Hs,0),new X(ss,Hs,0),new X(-Hs,0,ss),new X(Hs,0,ss),new X(0,ss,-Hs),new X(0,ss,Hs),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)];class Ph{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Fl=this._renderer.getRenderTarget(),Bl=this._renderer.getActiveCubeFace(),zl=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fl,Bl,zl),this._renderer.xr.enabled=kl,t.scissorTest=!1,Ho(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ur||t.mapping===fr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fl=this._renderer.getRenderTarget(),Bl=this._renderer.getActiveCubeFace(),zl=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Un,minFilter:Un,generateMipmaps:!1,type:di,format:Sn,colorSpace:_r,depthBuffer:!1},s=Dh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sE(r)),this._blurMaterial=rE(r,t,e)}return s}_compileMaterial(t){const e=new Te(this._lodPlanes[0],t);this._renderer.compile(e,Ol)}_sceneToCubeUV(t,e,i,s){const a=new Mn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Rh),u.toneMapping=ki,u.autoClear=!1;const d=new fn({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),g=new Te(new po,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Rh),_=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):S===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const A=this._cubeSize;Ho(s,S*A,p>2?A:0,A,A),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===ur||t.mapping===fr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Te(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Ho(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Ol)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ch[(s-r-1)%Ch.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Te(this._lodPlanes[s],c),h=c.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*as-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):as;m>as&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${as}`);const p=[];let S=0;for(let D=0;D<as;++D){const U=D/_,b=Math.exp(-U*U/2);p.push(b),D===0?S+=b:D<m&&(S+=2*b)}for(let D=0;D<p.length;D++)p[D]=p[D]/S;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:A}=this;h.dTheta.value=g,h.mipInt.value=A-i;const y=this._sizeLods[s],G=3*y*(s>A-Ys?s-A+Ys:0),L=4*(this._cubeSize-y);Ho(e,G,L,3*y,2*y),l.setRenderTarget(e),l.render(f,Ol)}}function sE(n){const t=[],e=[],i=[];let s=n;const r=n-Ys+1+wh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ys?l=wh[o-n+Ys-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*d),A=new Float32Array(m*g*d),y=new Float32Array(p*g*d);for(let L=0;L<d;L++){const D=L%3*2/3-1,U=L>2?0:-1,b=[D,U,0,D+2/3,U,0,D+2/3,U+1,0,D,U,0,D+2/3,U+1,0,D,U+1,0];S.set(b,_*g*L),A.set(h,m*g*L);const E=[L,L,L,L,L,L];y.set(E,p*g*L)}const G=new Ve;G.setAttribute("position",new Tn(S,_)),G.setAttribute("uv",new Tn(A,m)),G.setAttribute("faceIndex",new Tn(y,p)),t.push(G),s>Ys&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Dh(n,t,e){const i=new On(n,t,e);return i.texture.mapping=Xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ho(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function rE(n,t,e){const i=new Float32Array(as),s=new X(0,1,0);return new ke({name:"SphericalGaussianBlur",defines:{n:as,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ku(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Lh(){return new ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ku(),fragmentShader:`

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
		`,blending:hi,depthTest:!1,depthWrite:!1})}function Ih(){return new ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hi,depthTest:!1,depthWrite:!1})}function ku(){return`

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
	`}function oE(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===bc||l===Tc,u=l===ur||l===fr;if(c||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Ph(n)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&s(d)?(e===null&&(e=new Ph(n)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function aE(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Fr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function lE(n,t,e,i){const s={},r=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete s[h.id];const d=r.get(h);d&&(t.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const S=d.array;_=d.version;for(let A=0,y=S.length;A<y;A+=3){const G=S[A+0],L=S[A+1],D=S[A+2];h.push(G,L,L,D,D,G)}}else if(g!==void 0){const S=g.array;_=g.version;for(let A=0,y=S.length/3-1;A<y;A+=3){const G=A+0,L=A+1,D=A+2;h.push(G,L,L,D,D,G)}}else return;const m=new(Sm(h)?wm:Am)(h,1);m.version=_;const p=r.get(f);p&&t.remove(p),r.set(f,m)}function u(f){const h=r.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function cE(n,t,e){let i;function s(h){i=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,r,h*o),e.update(d,i,1)}function c(h,d,g){g!==0&&(n.drawElementsInstanced(i,d,r,h*o,g),e.update(d,i,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,i,1)}function f(h,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,h,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=d[S]*_[S];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function uE(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function fE(n,t,e){const i=new WeakMap,s=new Se;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let b=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let A=0;d===!0&&(A=1),g===!0&&(A=2),_===!0&&(A=3);let y=a.attributes.position.count*A,G=1;y>t.maxTextureSize&&(G=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);const L=new Float32Array(y*G*4*f),D=new bm(L,y,G,f);D.type=ui,D.needsUpdate=!0;const U=A*4;for(let E=0;E<f;E++){const P=m[E],O=p[E],B=S[E],K=y*G*4*E;for(let lt=0;lt<P.count;lt++){const Y=lt*U;d===!0&&(s.fromBufferAttribute(P,lt),L[K+Y+0]=s.x,L[K+Y+1]=s.y,L[K+Y+2]=s.z,L[K+Y+3]=0),g===!0&&(s.fromBufferAttribute(O,lt),L[K+Y+4]=s.x,L[K+Y+5]=s.y,L[K+Y+6]=s.z,L[K+Y+7]=0),_===!0&&(s.fromBufferAttribute(B,lt),L[K+Y+8]=s.x,L[K+Y+9]=s.y,L[K+Y+10]=s.z,L[K+Y+11]=B.itemSize===4?s.w:1)}}h={count:f,texture:D,size:new Vt(y,G)},i.set(a,h),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function hE(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=t.get(l,u);if(s.get(f)!==c&&(t.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return f}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Lm extends Qe{constructor(t,e,i,s,r,o,a,l,c,u=nr){if(u!==nr&&u!==dr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===nr&&(i=_s),i===void 0&&u===dr&&(i=hr),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:mn,this.minFilter=l!==void 0?l:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Im=new Qe,Uh=new Lm(1,1),Um=new bm,Nm=new Qx,Om=new Pm,Nh=[],Oh=[],Fh=new Float32Array(16),Bh=new Float32Array(9),zh=new Float32Array(4);function xr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Nh[s];if(r===void 0&&(r=new Float32Array(s),Nh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function De(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ya(n,t){let e=Oh[t];e===void 0&&(e=new Int32Array(t),Oh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function dE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function pE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),De(e,t)}}function mE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),De(e,t)}}function gE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),De(e,t)}}function _E(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Pe(e,i))return;zh.set(i),n.uniformMatrix2fv(this.addr,!1,zh),De(e,i)}}function vE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Pe(e,i))return;Bh.set(i),n.uniformMatrix3fv(this.addr,!1,Bh),De(e,i)}}function xE(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Pe(e,i))return;Fh.set(i),n.uniformMatrix4fv(this.addr,!1,Fh),De(e,i)}}function yE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ME(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),De(e,t)}}function SE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),De(e,t)}}function EE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),De(e,t)}}function bE(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function TE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),De(e,t)}}function AE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),De(e,t)}}function wE(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),De(e,t)}}function RE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Uh.compareFunction=Mm,r=Uh):r=Im,e.setTexture2D(t||r,s)}function CE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Nm,s)}function PE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Om,s)}function DE(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Um,s)}function LE(n){switch(n){case 5126:return dE;case 35664:return pE;case 35665:return mE;case 35666:return gE;case 35674:return _E;case 35675:return vE;case 35676:return xE;case 5124:case 35670:return yE;case 35667:case 35671:return ME;case 35668:case 35672:return SE;case 35669:case 35673:return EE;case 5125:return bE;case 36294:return TE;case 36295:return AE;case 36296:return wE;case 35678:case 36198:case 36298:case 36306:case 35682:return RE;case 35679:case 36299:case 36307:return CE;case 35680:case 36300:case 36308:case 36293:return PE;case 36289:case 36303:case 36311:case 36292:return DE}}function IE(n,t){n.uniform1fv(this.addr,t)}function UE(n,t){const e=xr(t,this.size,2);n.uniform2fv(this.addr,e)}function NE(n,t){const e=xr(t,this.size,3);n.uniform3fv(this.addr,e)}function OE(n,t){const e=xr(t,this.size,4);n.uniform4fv(this.addr,e)}function FE(n,t){const e=xr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function BE(n,t){const e=xr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function zE(n,t){const e=xr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function kE(n,t){n.uniform1iv(this.addr,t)}function HE(n,t){n.uniform2iv(this.addr,t)}function VE(n,t){n.uniform3iv(this.addr,t)}function GE(n,t){n.uniform4iv(this.addr,t)}function WE(n,t){n.uniform1uiv(this.addr,t)}function XE(n,t){n.uniform2uiv(this.addr,t)}function jE(n,t){n.uniform3uiv(this.addr,t)}function qE(n,t){n.uniform4uiv(this.addr,t)}function YE(n,t,e){const i=this.cache,s=t.length,r=Ya(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Im,r[o])}function $E(n,t,e){const i=this.cache,s=t.length,r=Ya(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Nm,r[o])}function KE(n,t,e){const i=this.cache,s=t.length,r=Ya(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Om,r[o])}function ZE(n,t,e){const i=this.cache,s=t.length,r=Ya(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Um,r[o])}function JE(n){switch(n){case 5126:return IE;case 35664:return UE;case 35665:return NE;case 35666:return OE;case 35674:return FE;case 35675:return BE;case 35676:return zE;case 5124:case 35670:return kE;case 35667:case 35671:return HE;case 35668:case 35672:return VE;case 35669:case 35673:return GE;case 5125:return WE;case 36294:return XE;case 36295:return jE;case 36296:return qE;case 35678:case 36198:case 36298:case 36306:case 35682:return YE;case 35679:case 36299:case 36307:return $E;case 35680:case 36300:case 36308:case 36293:return KE;case 36289:case 36303:case 36311:case 36292:return ZE}}class QE{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=LE(e.type)}}class tb{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=JE(e.type)}}class eb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Hl=/(\w+)(\])?(\[|\.)?/g;function kh(n,t){n.seq.push(t),n.map[t.id]=t}function nb(n,t,e){const i=n.name,s=i.length;for(Hl.lastIndex=0;;){const r=Hl.exec(i),o=Hl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){kh(e,c===void 0?new QE(a,n,t):new tb(a,n,t));break}else{let f=e.map[a];f===void 0&&(f=new eb(a),kh(e,f)),e=f}}}class oa{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);nb(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Hh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const ib=37297;let sb=0;function rb(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Vh=new Kt;function ob(n){te._getMatrix(Vh,te.workingColorSpace,n);const t=`mat3( ${Vh.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(n)){case ja:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Gh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+rb(n.getShaderSource(t),o)}else return s}function ab(n,t){const e=ob(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function lb(n,t){let e;switch(t){case sm:e="Linear";break;case rm:e="Reinhard";break;case om:e="Cineon";break;case Pu:e="ACESFilmic";break;case am:e="AgX";break;case lm:e="Neutral";break;case Dx:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vo=new X;function cb(){te.getLuminanceCoefficients(Vo);const n=Vo.x.toFixed(4),t=Vo.y.toFixed(4),e=Vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ub(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Br).join(`
`)}function fb(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function hb(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Br(n){return n!==""}function Wh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const db=/^[ \t]*#include +<([\w\d./]+)>/gm;function tu(n){return n.replace(db,mb)}const pb=new Map;function mb(n,t){let e=Jt[t];if(e===void 0){const i=pb.get(t);if(i!==void 0)e=Jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return tu(e)}const gb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jh(n){return n.replace(gb,_b)}function _b(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function vb(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===nm?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===ux?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ri&&(t="SHADOWMAP_TYPE_VSM"),t}function xb(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ur:case fr:t="ENVMAP_TYPE_CUBE";break;case Xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yb(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case fr:t="ENVMAP_MODE_REFRACTION";break}return t}function Mb(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case im:t="ENVMAP_BLENDING_MULTIPLY";break;case Cx:t="ENVMAP_BLENDING_MIX";break;case Px:t="ENVMAP_BLENDING_ADD";break}return t}function Sb(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Eb(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=vb(e),c=xb(e),u=yb(e),f=Mb(e),h=Sb(e),d=ub(e),g=fb(r),_=s.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Br).join(`
`),p.length>0&&(p+=`
`)):(m=[qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Br).join(`
`),p=[qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ki?"#define TONE_MAPPING":"",e.toneMapping!==ki?Jt.tonemapping_pars_fragment:"",e.toneMapping!==ki?lb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,ab("linearToOutputTexel",e.outputColorSpace),cb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Br).join(`
`)),o=tu(o),o=Wh(o,e),o=Xh(o,e),a=tu(a),a=Wh(a,e),a=Xh(a,e),o=jh(o),a=jh(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===oh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===oh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=S+m+o,y=S+p+a,G=Hh(s,s.VERTEX_SHADER,A),L=Hh(s,s.FRAGMENT_SHADER,y);s.attachShader(_,G),s.attachShader(_,L),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function D(P){if(n.debug.checkShaderErrors){const O=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(G).trim(),K=s.getShaderInfoLog(L).trim();let lt=!0,Y=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(lt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,G,L);else{const J=Gh(s,G,"vertex"),N=Gh(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+J+`
`+N)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||K==="")&&(Y=!1);Y&&(P.diagnostics={runnable:lt,programLog:O,vertexShader:{log:B,prefix:m},fragmentShader:{log:K,prefix:p}})}s.deleteShader(G),s.deleteShader(L),U=new oa(s,_),b=hb(s,_)}let U;this.getUniforms=function(){return U===void 0&&D(this),U};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,ib)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sb++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=G,this.fragmentShader=L,this}let bb=0;class Tb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Ab(t),e.set(t,i)),i}}class Ab{constructor(t){this.id=bb++,this.code=t,this.usedTimes=0}}function wb(n,t,e,i,s,r,o){const a=new Fu,l=new Tb,c=new Set,u=[],f=s.logarithmicDepthBuffer,h=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,E,P,O,B){const K=O.fog,lt=B.geometry,Y=b.isMeshStandardMaterial?O.environment:null,J=(b.isMeshStandardMaterial?e:t).get(b.envMap||Y),N=J&&J.mapping===Xa?J.image.height:null,Q=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const vt=lt.morphAttributes.position||lt.morphAttributes.normal||lt.morphAttributes.color,bt=vt!==void 0?vt.length:0;let Ot=0;lt.morphAttributes.position!==void 0&&(Ot=1),lt.morphAttributes.normal!==void 0&&(Ot=2),lt.morphAttributes.color!==void 0&&(Ot=3);let Qt,ct,_t,Tt;if(Q){const ie=Wn[Q];Qt=ie.vertexShader,ct=ie.fragmentShader}else Qt=b.vertexShader,ct=b.fragmentShader,l.update(b),_t=l.getVertexShaderID(b),Tt=l.getFragmentShaderID(b);const k=n.getRenderTarget(),ft=n.state.buffers.depth.getReversed(),ut=B.isInstancedMesh===!0,gt=B.isBatchedMesh===!0,Ut=!!b.map,C=!!b.matcap,R=!!J,v=!!b.aoMap,Z=!!b.lightMap,q=!!b.bumpMap,V=!!b.normalMap,st=!!b.displacementMap,ht=!!b.emissiveMap,nt=!!b.metalnessMap,M=!!b.roughnessMap,x=b.anisotropy>0,w=b.clearcoat>0,I=b.dispersion>0,F=b.iridescence>0,z=b.sheen>0,tt=b.transmission>0,ot=x&&!!b.anisotropyMap,at=w&&!!b.clearcoatMap,Mt=w&&!!b.clearcoatNormalMap,mt=w&&!!b.clearcoatRoughnessMap,xt=F&&!!b.iridescenceMap,Et=F&&!!b.iridescenceThicknessMap,Dt=z&&!!b.sheenColorMap,dt=z&&!!b.sheenRoughnessMap,Rt=!!b.specularMap,It=!!b.specularColorMap,ee=!!b.specularIntensityMap,H=tt&&!!b.transmissionMap,yt=tt&&!!b.thicknessMap,rt=!!b.gradientMap,pt=!!b.alphaMap,Ct=b.alphaTest>0,wt=!!b.alphaHash,Xt=!!b.extensions;let ce=ki;b.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(ce=n.toneMapping);const xe={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:Qt,fragmentShader:ct,defines:b.defines,customVertexShaderID:_t,customFragmentShaderID:Tt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:gt,batchingColor:gt&&B._colorsTexture!==null,instancing:ut,instancingColor:ut&&B.instanceColor!==null,instancingMorph:ut&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:k===null?n.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:_r,alphaToCoverage:!!b.alphaToCoverage,map:Ut,matcap:C,envMap:R,envMapMode:R&&J.mapping,envMapCubeUVHeight:N,aoMap:v,lightMap:Z,bumpMap:q,normalMap:V,displacementMap:h&&st,emissiveMap:ht,normalMapObjectSpace:V&&b.normalMapType===Nx,normalMapTangentSpace:V&&b.normalMapType===ym,metalnessMap:nt,roughnessMap:M,anisotropy:x,anisotropyMap:ot,clearcoat:w,clearcoatMap:at,clearcoatNormalMap:Mt,clearcoatRoughnessMap:mt,dispersion:I,iridescence:F,iridescenceMap:xt,iridescenceThicknessMap:Et,sheen:z,sheenColorMap:Dt,sheenRoughnessMap:dt,specularMap:Rt,specularColorMap:It,specularIntensityMap:ee,transmission:tt,transmissionMap:H,thicknessMap:yt,gradientMap:rt,opaque:b.transparent===!1&&b.blending===er&&b.alphaToCoverage===!1,alphaMap:pt,alphaTest:Ct,alphaHash:wt,combine:b.combine,mapUv:Ut&&_(b.map.channel),aoMapUv:v&&_(b.aoMap.channel),lightMapUv:Z&&_(b.lightMap.channel),bumpMapUv:q&&_(b.bumpMap.channel),normalMapUv:V&&_(b.normalMap.channel),displacementMapUv:st&&_(b.displacementMap.channel),emissiveMapUv:ht&&_(b.emissiveMap.channel),metalnessMapUv:nt&&_(b.metalnessMap.channel),roughnessMapUv:M&&_(b.roughnessMap.channel),anisotropyMapUv:ot&&_(b.anisotropyMap.channel),clearcoatMapUv:at&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:Mt&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:dt&&_(b.sheenRoughnessMap.channel),specularMapUv:Rt&&_(b.specularMap.channel),specularColorMapUv:It&&_(b.specularColorMap.channel),specularIntensityMapUv:ee&&_(b.specularIntensityMap.channel),transmissionMapUv:H&&_(b.transmissionMap.channel),thicknessMapUv:yt&&_(b.thicknessMap.channel),alphaMapUv:pt&&_(b.alphaMap.channel),vertexTangents:!!lt.attributes.tangent&&(V||x),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!lt.attributes.color&&lt.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!lt.attributes.uv&&(Ut||pt),fog:!!K,useFog:b.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:ft,skinning:B.isSkinnedMesh===!0,morphTargets:lt.morphAttributes.position!==void 0,morphNormals:lt.morphAttributes.normal!==void 0,morphColors:lt.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ot,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ce,decodeVideoTexture:Ut&&b.map.isVideoTexture===!0&&te.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:ht&&b.emissiveMap.isVideoTexture===!0&&te.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ln,flipSided:b.side===an,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Xt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&b.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return xe.vertexUv1s=c.has(1),xe.vertexUv2s=c.has(2),xe.vertexUv3s=c.has(3),c.clear(),xe}function p(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)E.push(P),E.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(S(E,b),A(E,b),E.push(n.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function S(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function A(b,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),b.push(a.mask)}function y(b){const E=g[b.type];let P;if(E){const O=Wn[E];P=so.clone(O.uniforms)}else P=b.uniforms;return P}function G(b,E){let P;for(let O=0,B=u.length;O<B;O++){const K=u[O];if(K.cacheKey===E){P=K,++P.usedTimes;break}}return P===void 0&&(P=new Eb(n,E,b,r),u.push(P)),P}function L(b){if(--b.usedTimes===0){const E=u.indexOf(b);u[E]=u[u.length-1],u.pop(),b.destroy()}}function D(b){l.remove(b)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:G,releaseProgram:L,releaseShaderCache:D,programs:u,dispose:U}}function Rb(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Cb(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Yh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function $h(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(f,h,d,g,_,m){let p=n[t];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[t]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?i.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(f,h){e.length>1&&e.sort(f||Cb),i.length>1&&i.sort(h||Yh),s.length>1&&s.sort(h||Yh)}function u(){for(let f=t,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function Pb(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new $h,n.set(i,[o])):s>=r.length?(o=new $h,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Db(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new X,color:new qt};break;case"SpotLight":e={position:new X,direction:new X,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new X,halfWidth:new X,halfHeight:new X};break}return n[t.id]=e,e}}}function Lb(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Ib=0;function Ub(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Nb(n){const t=new Db,e=Lb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new X);const s=new X,r=new pe,o=new pe;function a(c){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,S=0,A=0,y=0,G=0,L=0,D=0;c.sort(Ub);for(let b=0,E=c.length;b<E;b++){const P=c[b],O=P.color,B=P.intensity,K=P.distance,lt=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*B,f+=O.g*B,h+=O.b*B;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],B);D++}else if(P.isDirectionalLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const J=P.shadow,N=e.get(P);N.shadowIntensity=J.intensity,N.shadowBias=J.bias,N.shadowNormalBias=J.normalBias,N.shadowRadius=J.radius,N.shadowMapSize=J.mapSize,i.directionalShadow[d]=N,i.directionalShadowMap[d]=lt,i.directionalShadowMatrix[d]=P.shadow.matrix,S++}i.directional[d]=Y,d++}else if(P.isSpotLight){const Y=t.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(O).multiplyScalar(B),Y.distance=K,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[_]=Y;const J=P.shadow;if(P.map&&(i.spotLightMap[G]=P.map,G++,J.updateMatrices(P),P.castShadow&&L++),i.spotLightMatrix[_]=J.matrix,P.castShadow){const N=e.get(P);N.shadowIntensity=J.intensity,N.shadowBias=J.bias,N.shadowNormalBias=J.normalBias,N.shadowRadius=J.radius,N.shadowMapSize=J.mapSize,i.spotShadow[_]=N,i.spotShadowMap[_]=lt,y++}_++}else if(P.isRectAreaLight){const Y=t.get(P);Y.color.copy(O).multiplyScalar(B),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=Y,m++}else if(P.isPointLight){const Y=t.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const J=P.shadow,N=e.get(P);N.shadowIntensity=J.intensity,N.shadowBias=J.bias,N.shadowNormalBias=J.normalBias,N.shadowRadius=J.radius,N.shadowMapSize=J.mapSize,N.shadowCameraNear=J.camera.near,N.shadowCameraFar=J.camera.far,i.pointShadow[g]=N,i.pointShadowMap[g]=lt,i.pointShadowMatrix[g]=P.shadow.matrix,A++}i.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=t.get(P);Y.skyColor.copy(P.color).multiplyScalar(B),Y.groundColor.copy(P.groundColor).multiplyScalar(B),i.hemi[p]=Y,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const U=i.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==S||U.numPointShadows!==A||U.numSpotShadows!==y||U.numSpotMaps!==G||U.numLightProbes!==D)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=y+G-L,i.spotLightMap.length=G,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=D,U.directionalLength=d,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=S,U.numPointShadows=A,U.numSpotShadows=y,U.numSpotMaps=G,U.numLightProbes=D,i.version=Ib++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const A=c[p];if(A.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(A.isSpotLight){const y=i.spot[d];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(A.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(A.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Kh(n){const t=new Nb(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ob(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Kh(n),t.set(s,[a])):r>=o.length?(a=new Kh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Fb extends Es{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ix,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bb extends Es{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const zb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kb=`uniform sampler2D shadow_pass;
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
}`;function Hb(n,t,e){let i=new Bu;const s=new Vt,r=new Vt,o=new Se,a=new Fb({depthPacking:Ux}),l=new Bb,c={},u=e.maxTextureSize,f={[Xi]:an,[an]:Xi,[Ln]:Ln},h=new ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:zb,fragmentShader:kb}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ve;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Te(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nm;let p=this.type;this.render=function(L,D,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;const b=n.getRenderTarget(),E=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),O=n.state;O.setBlending(hi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const B=p!==ri&&this.type===ri,K=p===ri&&this.type!==ri;for(let lt=0,Y=L.length;lt<Y;lt++){const J=L[lt],N=J.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const Q=N.getFrameExtents();if(s.multiply(Q),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,N.mapSize.y=r.y)),N.map===null||B===!0||K===!0){const bt=this.type!==ri?{minFilter:mn,magFilter:mn}:{};N.map!==null&&N.map.dispose(),N.map=new On(s.x,s.y,bt),N.map.texture.name=J.name+".shadowMap",N.camera.updateProjectionMatrix()}n.setRenderTarget(N.map),n.clear();const vt=N.getViewportCount();for(let bt=0;bt<vt;bt++){const Ot=N.getViewport(bt);o.set(r.x*Ot.x,r.y*Ot.y,r.x*Ot.z,r.y*Ot.w),O.viewport(o),N.updateMatrices(J,bt),i=N.getFrustum(),y(D,U,N.camera,J,this.type)}N.isPointLightShadow!==!0&&this.type===ri&&S(N,U),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,E,P)};function S(L,D){const U=t.update(_);h.defines.VSM_SAMPLES!==L.blurSamples&&(h.defines.VSM_SAMPLES=L.blurSamples,d.defines.VSM_SAMPLES=L.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new On(s.x,s.y)),h.uniforms.shadow_pass.value=L.map.texture,h.uniforms.resolution.value=L.mapSize,h.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(D,null,U,h,_,null),d.uniforms.shadow_pass.value=L.mapPass.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(D,null,U,d,_,null)}function A(L,D,U,b){let E=null;const P=U.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(P!==void 0)E=P;else if(E=U.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const O=E.uuid,B=D.uuid;let K=c[O];K===void 0&&(K={},c[O]=K);let lt=K[B];lt===void 0&&(lt=E.clone(),K[B]=lt,D.addEventListener("dispose",G)),E=lt}if(E.visible=D.visible,E.wireframe=D.wireframe,b===ri?E.side=D.shadowSide!==null?D.shadowSide:D.side:E.side=D.shadowSide!==null?D.shadowSide:f[D.side],E.alphaMap=D.alphaMap,E.alphaTest=D.alphaTest,E.map=D.map,E.clipShadows=D.clipShadows,E.clippingPlanes=D.clippingPlanes,E.clipIntersection=D.clipIntersection,E.displacementMap=D.displacementMap,E.displacementScale=D.displacementScale,E.displacementBias=D.displacementBias,E.wireframeLinewidth=D.wireframeLinewidth,E.linewidth=D.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const O=n.properties.get(E);O.light=U}return E}function y(L,D,U,b,E){if(L.visible===!1)return;if(L.layers.test(D.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&E===ri)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,L.matrixWorld);const B=t.update(L),K=L.material;if(Array.isArray(K)){const lt=B.groups;for(let Y=0,J=lt.length;Y<J;Y++){const N=lt[Y],Q=K[N.materialIndex];if(Q&&Q.visible){const vt=A(L,Q,b,E);L.onBeforeShadow(n,L,D,U,B,vt,N),n.renderBufferDirect(U,null,B,vt,L,N),L.onAfterShadow(n,L,D,U,B,vt,N)}}}else if(K.visible){const lt=A(L,K,b,E);L.onBeforeShadow(n,L,D,U,B,lt,null),n.renderBufferDirect(U,null,B,lt,L,null),L.onAfterShadow(n,L,D,U,B,lt,null)}}const O=L.children;for(let B=0,K=O.length;B<K;B++)y(O[B],D,U,b,E)}function G(L){L.target.removeEventListener("dispose",G);for(const U in c){const b=c[U],E=L.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const Vb={[_c]:vc,[xc]:Sc,[yc]:Ec,[cr]:Mc,[vc]:_c,[Sc]:xc,[Ec]:yc,[Mc]:cr};function Gb(n,t){function e(){let H=!1;const yt=new Se;let rt=null;const pt=new Se(0,0,0,0);return{setMask:function(Ct){rt!==Ct&&!H&&(n.colorMask(Ct,Ct,Ct,Ct),rt=Ct)},setLocked:function(Ct){H=Ct},setClear:function(Ct,wt,Xt,ce,xe){xe===!0&&(Ct*=ce,wt*=ce,Xt*=ce),yt.set(Ct,wt,Xt,ce),pt.equals(yt)===!1&&(n.clearColor(Ct,wt,Xt,ce),pt.copy(yt))},reset:function(){H=!1,rt=null,pt.set(-1,0,0,0)}}}function i(){let H=!1,yt=!1,rt=null,pt=null,Ct=null;return{setReversed:function(wt){if(yt!==wt){const Xt=t.get("EXT_clip_control");yt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const ce=Ct;Ct=null,this.setClear(ce)}yt=wt},getReversed:function(){return yt},setTest:function(wt){wt?k(n.DEPTH_TEST):ft(n.DEPTH_TEST)},setMask:function(wt){rt!==wt&&!H&&(n.depthMask(wt),rt=wt)},setFunc:function(wt){if(yt&&(wt=Vb[wt]),pt!==wt){switch(wt){case _c:n.depthFunc(n.NEVER);break;case vc:n.depthFunc(n.ALWAYS);break;case xc:n.depthFunc(n.LESS);break;case cr:n.depthFunc(n.LEQUAL);break;case yc:n.depthFunc(n.EQUAL);break;case Mc:n.depthFunc(n.GEQUAL);break;case Sc:n.depthFunc(n.GREATER);break;case Ec:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pt=wt}},setLocked:function(wt){H=wt},setClear:function(wt){Ct!==wt&&(yt&&(wt=1-wt),n.clearDepth(wt),Ct=wt)},reset:function(){H=!1,rt=null,pt=null,Ct=null,yt=!1}}}function s(){let H=!1,yt=null,rt=null,pt=null,Ct=null,wt=null,Xt=null,ce=null,xe=null;return{setTest:function(ie){H||(ie?k(n.STENCIL_TEST):ft(n.STENCIL_TEST))},setMask:function(ie){yt!==ie&&!H&&(n.stencilMask(ie),yt=ie)},setFunc:function(ie,tn,gn){(rt!==ie||pt!==tn||Ct!==gn)&&(n.stencilFunc(ie,tn,gn),rt=ie,pt=tn,Ct=gn)},setOp:function(ie,tn,gn){(wt!==ie||Xt!==tn||ce!==gn)&&(n.stencilOp(ie,tn,gn),wt=ie,Xt=tn,ce=gn)},setLocked:function(ie){H=ie},setClear:function(ie){xe!==ie&&(n.clearStencil(ie),xe=ie)},reset:function(){H=!1,yt=null,rt=null,pt=null,Ct=null,wt=null,Xt=null,ce=null,xe=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,A=null,y=null,G=null,L=null,D=new qt(0,0,0),U=0,b=!1,E=null,P=null,O=null,B=null,K=null;const lt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,J=0;const N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(N)[1]),Y=J>=1):N.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),Y=J>=2);let Q=null,vt={};const bt=n.getParameter(n.SCISSOR_BOX),Ot=n.getParameter(n.VIEWPORT),Qt=new Se().fromArray(bt),ct=new Se().fromArray(Ot);function _t(H,yt,rt,pt){const Ct=new Uint8Array(4),wt=n.createTexture();n.bindTexture(H,wt),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xt=0;Xt<rt;Xt++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(yt,0,n.RGBA,1,1,pt,0,n.RGBA,n.UNSIGNED_BYTE,Ct):n.texImage2D(yt+Xt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ct);return wt}const Tt={};Tt[n.TEXTURE_2D]=_t(n.TEXTURE_2D,n.TEXTURE_2D,1),Tt[n.TEXTURE_CUBE_MAP]=_t(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[n.TEXTURE_2D_ARRAY]=_t(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Tt[n.TEXTURE_3D]=_t(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),k(n.DEPTH_TEST),o.setFunc(cr),q(!1),V(eh),k(n.CULL_FACE),v(hi);function k(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function ft(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function ut(H,yt){return f[H]!==yt?(n.bindFramebuffer(H,yt),f[H]=yt,H===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=yt),H===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=yt),!0):!1}function gt(H,yt){let rt=d,pt=!1;if(H){rt=h.get(yt),rt===void 0&&(rt=[],h.set(yt,rt));const Ct=H.textures;if(rt.length!==Ct.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Xt=Ct.length;wt<Xt;wt++)rt[wt]=n.COLOR_ATTACHMENT0+wt;rt.length=Ct.length,pt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,pt=!0);pt&&n.drawBuffers(rt)}function Ut(H){return g!==H?(n.useProgram(H),g=H,!0):!1}const C={[os]:n.FUNC_ADD,[hx]:n.FUNC_SUBTRACT,[dx]:n.FUNC_REVERSE_SUBTRACT};C[px]=n.MIN,C[mx]=n.MAX;const R={[gx]:n.ZERO,[_x]:n.ONE,[vx]:n.SRC_COLOR,[mc]:n.SRC_ALPHA,[bx]:n.SRC_ALPHA_SATURATE,[Sx]:n.DST_COLOR,[yx]:n.DST_ALPHA,[xx]:n.ONE_MINUS_SRC_COLOR,[gc]:n.ONE_MINUS_SRC_ALPHA,[Ex]:n.ONE_MINUS_DST_COLOR,[Mx]:n.ONE_MINUS_DST_ALPHA,[Tx]:n.CONSTANT_COLOR,[Ax]:n.ONE_MINUS_CONSTANT_COLOR,[wx]:n.CONSTANT_ALPHA,[Rx]:n.ONE_MINUS_CONSTANT_ALPHA};function v(H,yt,rt,pt,Ct,wt,Xt,ce,xe,ie){if(H===hi){_===!0&&(ft(n.BLEND),_=!1);return}if(_===!1&&(k(n.BLEND),_=!0),H!==fx){if(H!==m||ie!==b){if((p!==os||y!==os)&&(n.blendEquation(n.FUNC_ADD),p=os,y=os),ie)switch(H){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case us:n.blendFunc(n.ONE,n.ONE);break;case nh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ih:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case us:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case nh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ih:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}S=null,A=null,G=null,L=null,D.set(0,0,0),U=0,m=H,b=ie}return}Ct=Ct||yt,wt=wt||rt,Xt=Xt||pt,(yt!==p||Ct!==y)&&(n.blendEquationSeparate(C[yt],C[Ct]),p=yt,y=Ct),(rt!==S||pt!==A||wt!==G||Xt!==L)&&(n.blendFuncSeparate(R[rt],R[pt],R[wt],R[Xt]),S=rt,A=pt,G=wt,L=Xt),(ce.equals(D)===!1||xe!==U)&&(n.blendColor(ce.r,ce.g,ce.b,xe),D.copy(ce),U=xe),m=H,b=!1}function Z(H,yt){H.side===Ln?ft(n.CULL_FACE):k(n.CULL_FACE);let rt=H.side===an;yt&&(rt=!rt),q(rt),H.blending===er&&H.transparent===!1?v(hi):v(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);const pt=H.stencilWrite;a.setTest(pt),pt&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ht(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?k(n.SAMPLE_ALPHA_TO_COVERAGE):ft(n.SAMPLE_ALPHA_TO_COVERAGE)}function q(H){E!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),E=H)}function V(H){H!==lx?(k(n.CULL_FACE),H!==P&&(H===eh?n.cullFace(n.BACK):H===cx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ft(n.CULL_FACE),P=H}function st(H){H!==O&&(Y&&n.lineWidth(H),O=H)}function ht(H,yt,rt){H?(k(n.POLYGON_OFFSET_FILL),(B!==yt||K!==rt)&&(n.polygonOffset(yt,rt),B=yt,K=rt)):ft(n.POLYGON_OFFSET_FILL)}function nt(H){H?k(n.SCISSOR_TEST):ft(n.SCISSOR_TEST)}function M(H){H===void 0&&(H=n.TEXTURE0+lt-1),Q!==H&&(n.activeTexture(H),Q=H)}function x(H,yt,rt){rt===void 0&&(Q===null?rt=n.TEXTURE0+lt-1:rt=Q);let pt=vt[rt];pt===void 0&&(pt={type:void 0,texture:void 0},vt[rt]=pt),(pt.type!==H||pt.texture!==yt)&&(Q!==rt&&(n.activeTexture(rt),Q=rt),n.bindTexture(H,yt||Tt[H]),pt.type=H,pt.texture=yt)}function w(){const H=vt[Q];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function I(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function F(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function z(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function tt(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ot(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function at(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Mt(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function mt(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function xt(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Dt(H){Qt.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Qt.copy(H))}function dt(H){ct.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),ct.copy(H))}function Rt(H,yt){let rt=c.get(yt);rt===void 0&&(rt=new WeakMap,c.set(yt,rt));let pt=rt.get(H);pt===void 0&&(pt=n.getUniformBlockIndex(yt,H.name),rt.set(H,pt))}function It(H,yt){const pt=c.get(yt).get(H);l.get(yt)!==pt&&(n.uniformBlockBinding(yt,pt,H.__bindingPointIndex),l.set(yt,pt))}function ee(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Q=null,vt={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,A=null,y=null,G=null,L=null,D=new qt(0,0,0),U=0,b=!1,E=null,P=null,O=null,B=null,K=null,Qt.set(0,0,n.canvas.width,n.canvas.height),ct.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:k,disable:ft,bindFramebuffer:ut,drawBuffers:gt,useProgram:Ut,setBlending:v,setMaterial:Z,setFlipSided:q,setCullFace:V,setLineWidth:st,setPolygonOffset:ht,setScissorTest:nt,activeTexture:M,bindTexture:x,unbindTexture:w,compressedTexImage2D:I,compressedTexImage3D:F,texImage2D:xt,texImage3D:Et,updateUBOMapping:Rt,uniformBlockBinding:It,texStorage2D:Mt,texStorage3D:mt,texSubImage2D:z,texSubImage3D:tt,compressedTexSubImage2D:ot,compressedTexSubImage3D:at,scissor:Dt,viewport:dt,reset:ee}}function Zh(n,t,e,i){const s=Wb(i);switch(e){case dm:return n*t;case mm:return n*t;case gm:return n*t*2;case _m:return n*t/s.components*s.byteLength;case Uu:return n*t/s.components*s.byteLength;case vm:return n*t*2/s.components*s.byteLength;case Nu:return n*t*2/s.components*s.byteLength;case pm:return n*t*3/s.components*s.byteLength;case Sn:return n*t*4/s.components*s.byteLength;case Ou:return n*t*4/s.components*s.byteLength;case ta:case ea:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case na:case ia:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Rc:case Pc:return Math.max(n,16)*Math.max(t,8)/4;case wc:case Cc:return Math.max(n,8)*Math.max(t,8)/2;case Dc:case Lc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ic:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Uc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Nc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Oc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Bc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case zc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case kc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Hc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Vc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Gc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Xc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case jc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case qc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case sa:case Yc:case $c:return Math.ceil(n/4)*Math.ceil(t/4)*16;case xm:case Kc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Zc:case Jc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Wb(n){switch(n){case $n:case um:return{byteLength:1,components:1};case io:case fm:case di:return{byteLength:2,components:1};case Lu:case Iu:return{byteLength:2,components:4};case _s:case Du:case ui:return{byteLength:4,components:1};case hm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Xb(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,x){return d?new OffscreenCanvas(M,x):ya("canvas")}function _(M,x,w){let I=1;const F=nt(M);if((F.width>w||F.height>w)&&(I=w/Math.max(F.width,F.height)),I<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const z=Math.floor(I*F.width),tt=Math.floor(I*F.height);f===void 0&&(f=g(z,tt));const ot=x?g(z,tt):f;return ot.width=z,ot.height=tt,ot.getContext("2d").drawImage(M,0,0,z,tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+F.width+"x"+F.height+") to ("+z+"x"+tt+")."),ot}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+F.width+"x"+F.height+")."),M;return M}function m(M){return M.generateMipmaps}function p(M){n.generateMipmap(M)}function S(M){return M.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?n.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(M,x,w,I,F=!1){if(M!==null){if(n[M]!==void 0)return n[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let z=x;if(x===n.RED&&(w===n.FLOAT&&(z=n.R32F),w===n.HALF_FLOAT&&(z=n.R16F),w===n.UNSIGNED_BYTE&&(z=n.R8)),x===n.RED_INTEGER&&(w===n.UNSIGNED_BYTE&&(z=n.R8UI),w===n.UNSIGNED_SHORT&&(z=n.R16UI),w===n.UNSIGNED_INT&&(z=n.R32UI),w===n.BYTE&&(z=n.R8I),w===n.SHORT&&(z=n.R16I),w===n.INT&&(z=n.R32I)),x===n.RG&&(w===n.FLOAT&&(z=n.RG32F),w===n.HALF_FLOAT&&(z=n.RG16F),w===n.UNSIGNED_BYTE&&(z=n.RG8)),x===n.RG_INTEGER&&(w===n.UNSIGNED_BYTE&&(z=n.RG8UI),w===n.UNSIGNED_SHORT&&(z=n.RG16UI),w===n.UNSIGNED_INT&&(z=n.RG32UI),w===n.BYTE&&(z=n.RG8I),w===n.SHORT&&(z=n.RG16I),w===n.INT&&(z=n.RG32I)),x===n.RGB_INTEGER&&(w===n.UNSIGNED_BYTE&&(z=n.RGB8UI),w===n.UNSIGNED_SHORT&&(z=n.RGB16UI),w===n.UNSIGNED_INT&&(z=n.RGB32UI),w===n.BYTE&&(z=n.RGB8I),w===n.SHORT&&(z=n.RGB16I),w===n.INT&&(z=n.RGB32I)),x===n.RGBA_INTEGER&&(w===n.UNSIGNED_BYTE&&(z=n.RGBA8UI),w===n.UNSIGNED_SHORT&&(z=n.RGBA16UI),w===n.UNSIGNED_INT&&(z=n.RGBA32UI),w===n.BYTE&&(z=n.RGBA8I),w===n.SHORT&&(z=n.RGBA16I),w===n.INT&&(z=n.RGBA32I)),x===n.RGB&&w===n.UNSIGNED_INT_5_9_9_9_REV&&(z=n.RGB9_E5),x===n.RGBA){const tt=F?ja:te.getTransfer(I);w===n.FLOAT&&(z=n.RGBA32F),w===n.HALF_FLOAT&&(z=n.RGBA16F),w===n.UNSIGNED_BYTE&&(z=tt===ue?n.SRGB8_ALPHA8:n.RGBA8),w===n.UNSIGNED_SHORT_4_4_4_4&&(z=n.RGBA4),w===n.UNSIGNED_SHORT_5_5_5_1&&(z=n.RGB5_A1)}return(z===n.R16F||z===n.R32F||z===n.RG16F||z===n.RG32F||z===n.RGBA16F||z===n.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function y(M,x){let w;return M?x===null||x===_s||x===hr?w=n.DEPTH24_STENCIL8:x===ui?w=n.DEPTH32F_STENCIL8:x===io&&(w=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===_s||x===hr?w=n.DEPTH_COMPONENT24:x===ui?w=n.DEPTH_COMPONENT32F:x===io&&(w=n.DEPTH_COMPONENT16),w}function G(M,x){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==mn&&M.minFilter!==Un?Math.log2(Math.max(x.width,x.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?x.mipmaps.length:1}function L(M){const x=M.target;x.removeEventListener("dispose",L),U(x),x.isVideoTexture&&u.delete(x)}function D(M){const x=M.target;x.removeEventListener("dispose",D),E(x)}function U(M){const x=i.get(M);if(x.__webglInit===void 0)return;const w=M.source,I=h.get(w);if(I){const F=I[x.__cacheKey];F.usedTimes--,F.usedTimes===0&&b(M),Object.keys(I).length===0&&h.delete(w)}i.remove(M)}function b(M){const x=i.get(M);n.deleteTexture(x.__webglTexture);const w=M.source,I=h.get(w);delete I[x.__cacheKey],o.memory.textures--}function E(M){const x=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(x.__webglFramebuffer[I]))for(let F=0;F<x.__webglFramebuffer[I].length;F++)n.deleteFramebuffer(x.__webglFramebuffer[I][F]);else n.deleteFramebuffer(x.__webglFramebuffer[I]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[I])}else{if(Array.isArray(x.__webglFramebuffer))for(let I=0;I<x.__webglFramebuffer.length;I++)n.deleteFramebuffer(x.__webglFramebuffer[I]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let I=0;I<x.__webglColorRenderbuffer.length;I++)x.__webglColorRenderbuffer[I]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[I]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const w=M.textures;for(let I=0,F=w.length;I<F;I++){const z=i.get(w[I]);z.__webglTexture&&(n.deleteTexture(z.__webglTexture),o.memory.textures--),i.remove(w[I])}i.remove(M)}let P=0;function O(){P=0}function B(){const M=P;return M>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+s.maxTextures),P+=1,M}function K(M){const x=[];return x.push(M.wrapS),x.push(M.wrapT),x.push(M.wrapR||0),x.push(M.magFilter),x.push(M.minFilter),x.push(M.anisotropy),x.push(M.internalFormat),x.push(M.format),x.push(M.type),x.push(M.generateMipmaps),x.push(M.premultiplyAlpha),x.push(M.flipY),x.push(M.unpackAlignment),x.push(M.colorSpace),x.join()}function lt(M,x){const w=i.get(M);if(M.isVideoTexture&&st(M),M.isRenderTargetTexture===!1&&M.version>0&&w.__version!==M.version){const I=M.image;if(I===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ct(w,M,x);return}}e.bindTexture(n.TEXTURE_2D,w.__webglTexture,n.TEXTURE0+x)}function Y(M,x){const w=i.get(M);if(M.version>0&&w.__version!==M.version){ct(w,M,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,w.__webglTexture,n.TEXTURE0+x)}function J(M,x){const w=i.get(M);if(M.version>0&&w.__version!==M.version){ct(w,M,x);return}e.bindTexture(n.TEXTURE_3D,w.__webglTexture,n.TEXTURE0+x)}function N(M,x){const w=i.get(M);if(M.version>0&&w.__version!==M.version){_t(w,M,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+x)}const Q={[no]:n.REPEAT,[fs]:n.CLAMP_TO_EDGE,[Ac]:n.MIRRORED_REPEAT},vt={[mn]:n.NEAREST,[Lx]:n.NEAREST_MIPMAP_NEAREST,[So]:n.NEAREST_MIPMAP_LINEAR,[Un]:n.LINEAR,[pl]:n.LINEAR_MIPMAP_NEAREST,[Bi]:n.LINEAR_MIPMAP_LINEAR},bt={[Ox]:n.NEVER,[Vx]:n.ALWAYS,[Fx]:n.LESS,[Mm]:n.LEQUAL,[Bx]:n.EQUAL,[Hx]:n.GEQUAL,[zx]:n.GREATER,[kx]:n.NOTEQUAL};function Ot(M,x){if(x.type===ui&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===Un||x.magFilter===pl||x.magFilter===So||x.magFilter===Bi||x.minFilter===Un||x.minFilter===pl||x.minFilter===So||x.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(M,n.TEXTURE_WRAP_S,Q[x.wrapS]),n.texParameteri(M,n.TEXTURE_WRAP_T,Q[x.wrapT]),(M===n.TEXTURE_3D||M===n.TEXTURE_2D_ARRAY)&&n.texParameteri(M,n.TEXTURE_WRAP_R,Q[x.wrapR]),n.texParameteri(M,n.TEXTURE_MAG_FILTER,vt[x.magFilter]),n.texParameteri(M,n.TEXTURE_MIN_FILTER,vt[x.minFilter]),x.compareFunction&&(n.texParameteri(M,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(M,n.TEXTURE_COMPARE_FUNC,bt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===mn||x.minFilter!==So&&x.minFilter!==Bi||x.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const w=t.get("EXT_texture_filter_anisotropic");n.texParameterf(M,w.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Qt(M,x){let w=!1;M.__webglInit===void 0&&(M.__webglInit=!0,x.addEventListener("dispose",L));const I=x.source;let F=h.get(I);F===void 0&&(F={},h.set(I,F));const z=K(x);if(z!==M.__cacheKey){F[z]===void 0&&(F[z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,w=!0),F[z].usedTimes++;const tt=F[M.__cacheKey];tt!==void 0&&(F[M.__cacheKey].usedTimes--,tt.usedTimes===0&&b(x)),M.__cacheKey=z,M.__webglTexture=F[z].texture}return w}function ct(M,x,w){let I=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(I=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(I=n.TEXTURE_3D);const F=Qt(M,x),z=x.source;e.bindTexture(I,M.__webglTexture,n.TEXTURE0+w);const tt=i.get(z);if(z.version!==tt.__version||F===!0){e.activeTexture(n.TEXTURE0+w);const ot=te.getPrimaries(te.workingColorSpace),at=x.colorSpace===Ni?null:te.getPrimaries(x.colorSpace),Mt=x.colorSpace===Ni||ot===at?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let mt=_(x.image,!1,s.maxTextureSize);mt=ht(x,mt);const xt=r.convert(x.format,x.colorSpace),Et=r.convert(x.type);let Dt=A(x.internalFormat,xt,Et,x.colorSpace,x.isVideoTexture);Ot(I,x);let dt;const Rt=x.mipmaps,It=x.isVideoTexture!==!0,ee=tt.__version===void 0||F===!0,H=z.dataReady,yt=G(x,mt);if(x.isDepthTexture)Dt=y(x.format===dr,x.type),ee&&(It?e.texStorage2D(n.TEXTURE_2D,1,Dt,mt.width,mt.height):e.texImage2D(n.TEXTURE_2D,0,Dt,mt.width,mt.height,0,xt,Et,null));else if(x.isDataTexture)if(Rt.length>0){It&&ee&&e.texStorage2D(n.TEXTURE_2D,yt,Dt,Rt[0].width,Rt[0].height);for(let rt=0,pt=Rt.length;rt<pt;rt++)dt=Rt[rt],It?H&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,dt.width,dt.height,xt,Et,dt.data):e.texImage2D(n.TEXTURE_2D,rt,Dt,dt.width,dt.height,0,xt,Et,dt.data);x.generateMipmaps=!1}else It?(ee&&e.texStorage2D(n.TEXTURE_2D,yt,Dt,mt.width,mt.height),H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt.width,mt.height,xt,Et,mt.data)):e.texImage2D(n.TEXTURE_2D,0,Dt,mt.width,mt.height,0,xt,Et,mt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){It&&ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,Dt,Rt[0].width,Rt[0].height,mt.depth);for(let rt=0,pt=Rt.length;rt<pt;rt++)if(dt=Rt[rt],x.format!==Sn)if(xt!==null)if(It){if(H)if(x.layerUpdates.size>0){const Ct=Zh(dt.width,dt.height,x.format,x.type);for(const wt of x.layerUpdates){const Xt=dt.data.subarray(wt*Ct/dt.data.BYTES_PER_ELEMENT,(wt+1)*Ct/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,wt,dt.width,dt.height,1,xt,Xt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,dt.width,dt.height,mt.depth,xt,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Dt,dt.width,dt.height,mt.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else It?H&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,dt.width,dt.height,mt.depth,xt,Et,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Dt,dt.width,dt.height,mt.depth,0,xt,Et,dt.data)}else{It&&ee&&e.texStorage2D(n.TEXTURE_2D,yt,Dt,Rt[0].width,Rt[0].height);for(let rt=0,pt=Rt.length;rt<pt;rt++)dt=Rt[rt],x.format!==Sn?xt!==null?It?H&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,dt.width,dt.height,xt,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Dt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):It?H&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,dt.width,dt.height,xt,Et,dt.data):e.texImage2D(n.TEXTURE_2D,rt,Dt,dt.width,dt.height,0,xt,Et,dt.data)}else if(x.isDataArrayTexture)if(It){if(ee&&e.texStorage3D(n.TEXTURE_2D_ARRAY,yt,Dt,mt.width,mt.height,mt.depth),H)if(x.layerUpdates.size>0){const rt=Zh(mt.width,mt.height,x.format,x.type);for(const pt of x.layerUpdates){const Ct=mt.data.subarray(pt*rt/mt.data.BYTES_PER_ELEMENT,(pt+1)*rt/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pt,mt.width,mt.height,1,xt,Et,Ct)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,xt,Et,mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Dt,mt.width,mt.height,mt.depth,0,xt,Et,mt.data);else if(x.isData3DTexture)It?(ee&&e.texStorage3D(n.TEXTURE_3D,yt,Dt,mt.width,mt.height,mt.depth),H&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,xt,Et,mt.data)):e.texImage3D(n.TEXTURE_3D,0,Dt,mt.width,mt.height,mt.depth,0,xt,Et,mt.data);else if(x.isFramebufferTexture){if(ee)if(It)e.texStorage2D(n.TEXTURE_2D,yt,Dt,mt.width,mt.height);else{let rt=mt.width,pt=mt.height;for(let Ct=0;Ct<yt;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,Dt,rt,pt,0,xt,Et,null),rt>>=1,pt>>=1}}else if(Rt.length>0){if(It&&ee){const rt=nt(Rt[0]);e.texStorage2D(n.TEXTURE_2D,yt,Dt,rt.width,rt.height)}for(let rt=0,pt=Rt.length;rt<pt;rt++)dt=Rt[rt],It?H&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,xt,Et,dt):e.texImage2D(n.TEXTURE_2D,rt,Dt,xt,Et,dt);x.generateMipmaps=!1}else if(It){if(ee){const rt=nt(mt);e.texStorage2D(n.TEXTURE_2D,yt,Dt,rt.width,rt.height)}H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,Et,mt)}else e.texImage2D(n.TEXTURE_2D,0,Dt,xt,Et,mt);m(x)&&p(I),tt.__version=z.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function _t(M,x,w){if(x.image.length!==6)return;const I=Qt(M,x),F=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,M.__webglTexture,n.TEXTURE0+w);const z=i.get(F);if(F.version!==z.__version||I===!0){e.activeTexture(n.TEXTURE0+w);const tt=te.getPrimaries(te.workingColorSpace),ot=x.colorSpace===Ni?null:te.getPrimaries(x.colorSpace),at=x.colorSpace===Ni||tt===ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,at);const Mt=x.isCompressedTexture||x.image[0].isCompressedTexture,mt=x.image[0]&&x.image[0].isDataTexture,xt=[];for(let pt=0;pt<6;pt++)!Mt&&!mt?xt[pt]=_(x.image[pt],!0,s.maxCubemapSize):xt[pt]=mt?x.image[pt].image:x.image[pt],xt[pt]=ht(x,xt[pt]);const Et=xt[0],Dt=r.convert(x.format,x.colorSpace),dt=r.convert(x.type),Rt=A(x.internalFormat,Dt,dt,x.colorSpace),It=x.isVideoTexture!==!0,ee=z.__version===void 0||I===!0,H=F.dataReady;let yt=G(x,Et);Ot(n.TEXTURE_CUBE_MAP,x);let rt;if(Mt){It&&ee&&e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Rt,Et.width,Et.height);for(let pt=0;pt<6;pt++){rt=xt[pt].mipmaps;for(let Ct=0;Ct<rt.length;Ct++){const wt=rt[Ct];x.format!==Sn?Dt!==null?It?H&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct,0,0,wt.width,wt.height,Dt,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct,Rt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):It?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct,0,0,wt.width,wt.height,Dt,dt,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct,Rt,wt.width,wt.height,0,Dt,dt,wt.data)}}}else{if(rt=x.mipmaps,It&&ee){rt.length>0&&yt++;const pt=nt(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Rt,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(mt){It?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,xt[pt].width,xt[pt].height,Dt,dt,xt[pt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,Rt,xt[pt].width,xt[pt].height,0,Dt,dt,xt[pt].data);for(let Ct=0;Ct<rt.length;Ct++){const Xt=rt[Ct].image[pt].image;It?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct+1,0,0,Xt.width,Xt.height,Dt,dt,Xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct+1,Rt,Xt.width,Xt.height,0,Dt,dt,Xt.data)}}else{It?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Dt,dt,xt[pt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,Rt,Dt,dt,xt[pt]);for(let Ct=0;Ct<rt.length;Ct++){const wt=rt[Ct];It?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct+1,0,0,Dt,dt,wt.image[pt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Ct+1,Rt,Dt,dt,wt.image[pt])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),z.__version=F.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function Tt(M,x,w,I,F,z){const tt=r.convert(w.format,w.colorSpace),ot=r.convert(w.type),at=A(w.internalFormat,tt,ot,w.colorSpace),Mt=i.get(x),mt=i.get(w);if(mt.__renderTarget=x,!Mt.__hasExternalTextures){const xt=Math.max(1,x.width>>z),Et=Math.max(1,x.height>>z);F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?e.texImage3D(F,z,at,xt,Et,x.depth,0,tt,ot,null):e.texImage2D(F,z,at,xt,Et,0,tt,ot,null)}e.bindFramebuffer(n.FRAMEBUFFER,M),V(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,I,F,mt.__webglTexture,0,q(x)):(F===n.TEXTURE_2D||F>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&F<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,I,F,mt.__webglTexture,z),e.bindFramebuffer(n.FRAMEBUFFER,null)}function k(M,x,w){if(n.bindRenderbuffer(n.RENDERBUFFER,M),x.depthBuffer){const I=x.depthTexture,F=I&&I.isDepthTexture?I.type:null,z=y(x.stencilBuffer,F),tt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=q(x);V(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot,z,x.width,x.height):w?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,z,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,z,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,M)}else{const I=x.textures;for(let F=0;F<I.length;F++){const z=I[F],tt=r.convert(z.format,z.colorSpace),ot=r.convert(z.type),at=A(z.internalFormat,tt,ot,z.colorSpace),Mt=q(x);w&&V(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,at,x.width,x.height):V(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Mt,at,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,at,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ft(M,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,M),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const I=i.get(x.depthTexture);I.__renderTarget=x,(!I.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),lt(x.depthTexture,0);const F=I.__webglTexture,z=q(x);if(x.depthTexture.format===nr)V(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,F,0,z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,F,0);else if(x.depthTexture.format===dr)V(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,F,0,z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,F,0);else throw new Error("Unknown depthTexture format")}function ut(M){const x=i.get(M),w=M.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==M.depthTexture){const I=M.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),I){const F=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,I.removeEventListener("dispose",F)};I.addEventListener("dispose",F),x.__depthDisposeCallback=F}x.__boundDepthTexture=I}if(M.depthTexture&&!x.__autoAllocateDepthBuffer){if(w)throw new Error("target.depthTexture not supported in Cube render targets");ft(x.__webglFramebuffer,M)}else if(w){x.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[I]),x.__webglDepthbuffer[I]===void 0)x.__webglDepthbuffer[I]=n.createRenderbuffer(),k(x.__webglDepthbuffer[I],M,!1);else{const F=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,z=x.__webglDepthbuffer[I];n.bindRenderbuffer(n.RENDERBUFFER,z),n.framebufferRenderbuffer(n.FRAMEBUFFER,F,n.RENDERBUFFER,z)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),k(x.__webglDepthbuffer,M,!1);else{const I=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,F=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,F),n.framebufferRenderbuffer(n.FRAMEBUFFER,I,n.RENDERBUFFER,F)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function gt(M,x,w){const I=i.get(M);x!==void 0&&Tt(I.__webglFramebuffer,M,M.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),w!==void 0&&ut(M)}function Ut(M){const x=M.texture,w=i.get(M),I=i.get(x);M.addEventListener("dispose",D);const F=M.textures,z=M.isWebGLCubeRenderTarget===!0,tt=F.length>1;if(tt||(I.__webglTexture===void 0&&(I.__webglTexture=n.createTexture()),I.__version=x.version,o.memory.textures++),z){w.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(x.mipmaps&&x.mipmaps.length>0){w.__webglFramebuffer[ot]=[];for(let at=0;at<x.mipmaps.length;at++)w.__webglFramebuffer[ot][at]=n.createFramebuffer()}else w.__webglFramebuffer[ot]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){w.__webglFramebuffer=[];for(let ot=0;ot<x.mipmaps.length;ot++)w.__webglFramebuffer[ot]=n.createFramebuffer()}else w.__webglFramebuffer=n.createFramebuffer();if(tt)for(let ot=0,at=F.length;ot<at;ot++){const Mt=i.get(F[ot]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=n.createTexture(),o.memory.textures++)}if(M.samples>0&&V(M)===!1){w.__webglMultisampledFramebuffer=n.createFramebuffer(),w.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,w.__webglMultisampledFramebuffer);for(let ot=0;ot<F.length;ot++){const at=F[ot];w.__webglColorRenderbuffer[ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,w.__webglColorRenderbuffer[ot]);const Mt=r.convert(at.format,at.colorSpace),mt=r.convert(at.type),xt=A(at.internalFormat,Mt,mt,at.colorSpace,M.isXRRenderTarget===!0),Et=q(M);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,xt,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,w.__webglColorRenderbuffer[ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),M.depthBuffer&&(w.__webglDepthRenderbuffer=n.createRenderbuffer(),k(w.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(z){e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture),Ot(n.TEXTURE_CUBE_MAP,x);for(let ot=0;ot<6;ot++)if(x.mipmaps&&x.mipmaps.length>0)for(let at=0;at<x.mipmaps.length;at++)Tt(w.__webglFramebuffer[ot][at],M,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,at);else Tt(w.__webglFramebuffer[ot],M,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(x)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){for(let ot=0,at=F.length;ot<at;ot++){const Mt=F[ot],mt=i.get(Mt);e.bindTexture(n.TEXTURE_2D,mt.__webglTexture),Ot(n.TEXTURE_2D,Mt),Tt(w.__webglFramebuffer,M,Mt,n.COLOR_ATTACHMENT0+ot,n.TEXTURE_2D,0),m(Mt)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let ot=n.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(ot=M.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,I.__webglTexture),Ot(ot,x),x.mipmaps&&x.mipmaps.length>0)for(let at=0;at<x.mipmaps.length;at++)Tt(w.__webglFramebuffer[at],M,x,n.COLOR_ATTACHMENT0,ot,at);else Tt(w.__webglFramebuffer,M,x,n.COLOR_ATTACHMENT0,ot,0);m(x)&&p(ot),e.unbindTexture()}M.depthBuffer&&ut(M)}function C(M){const x=M.textures;for(let w=0,I=x.length;w<I;w++){const F=x[w];if(m(F)){const z=S(M),tt=i.get(F).__webglTexture;e.bindTexture(z,tt),p(z),e.unbindTexture()}}}const R=[],v=[];function Z(M){if(M.samples>0){if(V(M)===!1){const x=M.textures,w=M.width,I=M.height;let F=n.COLOR_BUFFER_BIT;const z=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=i.get(M),ot=x.length>1;if(ot)for(let at=0;at<x.length;at++)e.bindFramebuffer(n.FRAMEBUFFER,tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,tt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,tt.__webglFramebuffer);for(let at=0;at<x.length;at++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(F|=n.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(F|=n.STENCIL_BUFFER_BIT)),ot){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,tt.__webglColorRenderbuffer[at]);const Mt=i.get(x[at]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Mt,0)}n.blitFramebuffer(0,0,w,I,0,0,w,I,F,n.NEAREST),l===!0&&(R.length=0,v.length=0,R.push(n.COLOR_ATTACHMENT0+at),M.depthBuffer&&M.resolveDepthBuffer===!1&&(R.push(z),v.push(z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,v)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,R))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ot)for(let at=0;at<x.length;at++){e.bindFramebuffer(n.FRAMEBUFFER,tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,tt.__webglColorRenderbuffer[at]);const Mt=i.get(x[at]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,Mt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,tt.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const x=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function q(M){return Math.min(s.maxSamples,M.samples)}function V(M){const x=i.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function st(M){const x=o.render.frame;u.get(M)!==x&&(u.set(M,x),M.update())}function ht(M,x){const w=M.colorSpace,I=M.format,F=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||w!==_r&&w!==Ni&&(te.getTransfer(w)===ue?(I!==Sn||F!==$n)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",w)),x}function nt(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.setTexture2D=lt,this.setTexture2DArray=Y,this.setTexture3D=J,this.setTextureCube=N,this.rebindTextures=gt,this.setupRenderTarget=Ut,this.updateRenderTargetMipmap=C,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=ut,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=V}function jb(n,t){function e(i,s=Ni){let r;const o=te.getTransfer(s);if(i===$n)return n.UNSIGNED_BYTE;if(i===Lu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Iu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===hm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===um)return n.BYTE;if(i===fm)return n.SHORT;if(i===io)return n.UNSIGNED_SHORT;if(i===Du)return n.INT;if(i===_s)return n.UNSIGNED_INT;if(i===ui)return n.FLOAT;if(i===di)return n.HALF_FLOAT;if(i===dm)return n.ALPHA;if(i===pm)return n.RGB;if(i===Sn)return n.RGBA;if(i===mm)return n.LUMINANCE;if(i===gm)return n.LUMINANCE_ALPHA;if(i===nr)return n.DEPTH_COMPONENT;if(i===dr)return n.DEPTH_STENCIL;if(i===_m)return n.RED;if(i===Uu)return n.RED_INTEGER;if(i===vm)return n.RG;if(i===Nu)return n.RG_INTEGER;if(i===Ou)return n.RGBA_INTEGER;if(i===ta||i===ea||i===na||i===ia)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ta)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ta)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===wc||i===Rc||i===Cc||i===Pc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===wc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Rc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Cc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dc||i===Lc||i===Ic)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Dc||i===Lc)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ic)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Uc||i===Nc||i===Oc||i===Fc||i===Bc||i===zc||i===kc||i===Hc||i===Vc||i===Gc||i===Wc||i===Xc||i===jc||i===qc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Uc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Nc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Oc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Xc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===jc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sa||i===Yc||i===$c)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===sa)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===xm||i===Kc||i===Zc||i===Jc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===sa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Zc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Jc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class qb extends Mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class $s extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yb={type:"move"};class Vl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $s,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $s,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $s,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new $s;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const $b=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kb=`
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

}`;class Zb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new ke({vertexShader:$b,fragmentShader:Kb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Te(new qa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Jb extends Ss{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new Zb,m=e.getContextAttributes();let p=null,S=null;const A=[],y=[],G=new Vt;let L=null;const D=new Mn;D.viewport=new Se;const U=new Mn;U.viewport=new Se;const b=[D,U],E=new qb;let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ct){let _t=A[ct];return _t===void 0&&(_t=new Vl,A[ct]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(ct){let _t=A[ct];return _t===void 0&&(_t=new Vl,A[ct]=_t),_t.getGripSpace()},this.getHand=function(ct){let _t=A[ct];return _t===void 0&&(_t=new Vl,A[ct]=_t),_t.getHandSpace()};function B(ct){const _t=y.indexOf(ct.inputSource);if(_t===-1)return;const Tt=A[_t];Tt!==void 0&&(Tt.update(ct.inputSource,ct.frame,c||o),Tt.dispatchEvent({type:ct.type,data:ct.inputSource}))}function K(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",lt);for(let ct=0;ct<A.length;ct++){const _t=y[ct];_t!==null&&(y[ct]=null,A[ct].disconnect(_t))}P=null,O=null,_.reset(),t.setRenderTarget(p),d=null,h=null,f=null,s=null,S=null,Qt.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(G.width,G.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ct){r=ct,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ct){a=ct,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ct){c=ct},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ct){if(s=ct,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",K),s.addEventListener("inputsourceschange",lt),m.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(G),s.renderState.layers===void 0){const _t={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new On(d.framebufferWidth,d.framebufferHeight,{format:Sn,type:$n,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let _t=null,Tt=null,k=null;m.depth&&(k=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=m.stencil?dr:nr,Tt=m.stencil?hr:_s);const ft={colorFormat:e.RGBA8,depthFormat:k,scaleFactor:r};f=new XRWebGLBinding(s,e),h=f.createProjectionLayer(ft),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),S=new On(h.textureWidth,h.textureHeight,{format:Sn,type:$n,depthTexture:new Lm(h.textureWidth,h.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Qt.setContext(s),Qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function lt(ct){for(let _t=0;_t<ct.removed.length;_t++){const Tt=ct.removed[_t],k=y.indexOf(Tt);k>=0&&(y[k]=null,A[k].disconnect(Tt))}for(let _t=0;_t<ct.added.length;_t++){const Tt=ct.added[_t];let k=y.indexOf(Tt);if(k===-1){for(let ut=0;ut<A.length;ut++)if(ut>=y.length){y.push(Tt),k=ut;break}else if(y[ut]===null){y[ut]=Tt,k=ut;break}if(k===-1)break}const ft=A[k];ft&&ft.connect(Tt)}}const Y=new X,J=new X;function N(ct,_t,Tt){Y.setFromMatrixPosition(_t.matrixWorld),J.setFromMatrixPosition(Tt.matrixWorld);const k=Y.distanceTo(J),ft=_t.projectionMatrix.elements,ut=Tt.projectionMatrix.elements,gt=ft[14]/(ft[10]-1),Ut=ft[14]/(ft[10]+1),C=(ft[9]+1)/ft[5],R=(ft[9]-1)/ft[5],v=(ft[8]-1)/ft[0],Z=(ut[8]+1)/ut[0],q=gt*v,V=gt*Z,st=k/(-v+Z),ht=st*-v;if(_t.matrixWorld.decompose(ct.position,ct.quaternion,ct.scale),ct.translateX(ht),ct.translateZ(st),ct.matrixWorld.compose(ct.position,ct.quaternion,ct.scale),ct.matrixWorldInverse.copy(ct.matrixWorld).invert(),ft[10]===-1)ct.projectionMatrix.copy(_t.projectionMatrix),ct.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const nt=gt+st,M=Ut+st,x=q-ht,w=V+(k-ht),I=C*Ut/M*nt,F=R*Ut/M*nt;ct.projectionMatrix.makePerspective(x,w,I,F,nt,M),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert()}}function Q(ct,_t){_t===null?ct.matrixWorld.copy(ct.matrix):ct.matrixWorld.multiplyMatrices(_t.matrixWorld,ct.matrix),ct.matrixWorldInverse.copy(ct.matrixWorld).invert()}this.updateCamera=function(ct){if(s===null)return;let _t=ct.near,Tt=ct.far;_.texture!==null&&(_.depthNear>0&&(_t=_.depthNear),_.depthFar>0&&(Tt=_.depthFar)),E.near=U.near=D.near=_t,E.far=U.far=D.far=Tt,(P!==E.near||O!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),P=E.near,O=E.far),D.layers.mask=ct.layers.mask|2,U.layers.mask=ct.layers.mask|4,E.layers.mask=D.layers.mask|U.layers.mask;const k=ct.parent,ft=E.cameras;Q(E,k);for(let ut=0;ut<ft.length;ut++)Q(ft[ut],k);ft.length===2?N(E,D,U):E.projectionMatrix.copy(D.projectionMatrix),vt(ct,E,k)};function vt(ct,_t,Tt){Tt===null?ct.matrix.copy(_t.matrixWorld):(ct.matrix.copy(Tt.matrixWorld),ct.matrix.invert(),ct.matrix.multiply(_t.matrixWorld)),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.updateMatrixWorld(!0),ct.projectionMatrix.copy(_t.projectionMatrix),ct.projectionMatrixInverse.copy(_t.projectionMatrixInverse),ct.isPerspectiveCamera&&(ct.fov=Qc*2*Math.atan(1/ct.projectionMatrix.elements[5]),ct.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(ct){l=ct,h!==null&&(h.fixedFoveation=ct),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ct)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let bt=null;function Ot(ct,_t){if(u=_t.getViewerPose(c||o),g=_t,u!==null){const Tt=u.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let k=!1;Tt.length!==E.cameras.length&&(E.cameras.length=0,k=!0);for(let ut=0;ut<Tt.length;ut++){const gt=Tt[ut];let Ut=null;if(d!==null)Ut=d.getViewport(gt);else{const R=f.getViewSubImage(h,gt);Ut=R.viewport,ut===0&&(t.setRenderTargetTextures(S,R.colorTexture,h.ignoreDepthValues?void 0:R.depthStencilTexture),t.setRenderTarget(S))}let C=b[ut];C===void 0&&(C=new Mn,C.layers.enable(ut),C.viewport=new Se,b[ut]=C),C.matrix.fromArray(gt.transform.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale),C.projectionMatrix.fromArray(gt.projectionMatrix),C.projectionMatrixInverse.copy(C.projectionMatrix).invert(),C.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),ut===0&&(E.matrix.copy(C.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),k===!0&&E.cameras.push(C)}const ft=s.enabledFeatures;if(ft&&ft.includes("depth-sensing")){const ut=f.getDepthInformation(Tt[0]);ut&&ut.isValid&&ut.texture&&_.init(t,ut,s.renderState)}}for(let Tt=0;Tt<A.length;Tt++){const k=y[Tt],ft=A[Tt];k!==null&&ft!==void 0&&ft.update(k,_t,c||o)}bt&&bt(ct,_t),_t.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_t}),g=null}const Qt=new Dm;Qt.setAnimationLoop(Ot),this.setAnimationLoop=function(ct){bt=ct},this.dispose=function(){}}}const ns=new Kn,Qb=new pe;function tT(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Rm(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,A,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,A):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===an&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===an&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),A=S.envMap,y=S.envMapRotation;A&&(m.envMap.value=A,ns.copy(y),ns.x*=-1,ns.y*=-1,ns.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),m.envMapRotation.value.setFromMatrix4(Qb.makeRotationFromEuler(ns)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=A*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===an&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function eT(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,A){const y=A.program;i.uniformBlockBinding(S,y)}function c(S,A){let y=s[S.id];y===void 0&&(g(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",m));const G=A.program;i.updateUBOMapping(S,G);const L=t.render.frame;r[S.id]!==L&&(h(S),r[S.id]=L)}function u(S){const A=f();S.__bindingPointIndex=A;const y=n.createBuffer(),G=S.__size,L=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,G,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,y),y}function f(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const A=s[S.id],y=S.uniforms,G=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let L=0,D=y.length;L<D;L++){const U=Array.isArray(y[L])?y[L]:[y[L]];for(let b=0,E=U.length;b<E;b++){const P=U[b];if(d(P,L,b,G)===!0){const O=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let K=0;for(let lt=0;lt<B.length;lt++){const Y=B[lt],J=_(Y);typeof Y=="number"||typeof Y=="boolean"?(P.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,O+K,P.__data)):Y.isMatrix3?(P.__data[0]=Y.elements[0],P.__data[1]=Y.elements[1],P.__data[2]=Y.elements[2],P.__data[3]=0,P.__data[4]=Y.elements[3],P.__data[5]=Y.elements[4],P.__data[6]=Y.elements[5],P.__data[7]=0,P.__data[8]=Y.elements[6],P.__data[9]=Y.elements[7],P.__data[10]=Y.elements[8],P.__data[11]=0):(Y.toArray(P.__data,K),K+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,A,y,G){const L=S.value,D=A+"_"+y;if(G[D]===void 0)return typeof L=="number"||typeof L=="boolean"?G[D]=L:G[D]=L.clone(),!0;{const U=G[D];if(typeof L=="number"||typeof L=="boolean"){if(U!==L)return G[D]=L,!0}else if(U.equals(L)===!1)return U.copy(L),!0}return!1}function g(S){const A=S.uniforms;let y=0;const G=16;for(let D=0,U=A.length;D<U;D++){const b=Array.isArray(A[D])?A[D]:[A[D]];for(let E=0,P=b.length;E<P;E++){const O=b[E],B=Array.isArray(O.value)?O.value:[O.value];for(let K=0,lt=B.length;K<lt;K++){const Y=B[K],J=_(Y),N=y%G,Q=N%J.boundary,vt=N+Q;y+=Q,vt!==0&&G-vt<J.storage&&(y+=G-vt),O.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=J.storage}}}const L=y%G;return L>0&&(y+=G-L),S.__size=y,S.__cache={},this}function _(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),A}function m(S){const A=S.target;A.removeEventListener("dispose",m);const y=o.indexOf(A.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function p(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class nT{constructor(t={}){const{canvas:e=Xx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rn,this.toneMapping=ki,this.toneMappingExposure=1;const y=this;let G=!1,L=0,D=0,U=null,b=-1,E=null;const P=new Se,O=new Se;let B=null;const K=new qt(0);let lt=0,Y=e.width,J=e.height,N=1,Q=null,vt=null;const bt=new Se(0,0,Y,J),Ot=new Se(0,0,Y,J);let Qt=!1;const ct=new Bu;let _t=!1,Tt=!1;const k=new pe,ft=new pe,ut=new X,gt=new Se,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let C=!1;function R(){return U===null?N:1}let v=i;function Z(T,W){return e.getContext(T,W)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Cu}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",wt,!1),v===null){const W="webgl2";if(v=Z(W,T),v===null)throw Z(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let q,V,st,ht,nt,M,x,w,I,F,z,tt,ot,at,Mt,mt,xt,Et,Dt,dt,Rt,It,ee,H;function yt(){q=new aE(v),q.init(),It=new jb(v,q),V=new eE(v,q,t,It),st=new Gb(v,q),V.reverseDepthBuffer&&h&&st.buffers.depth.setReversed(!0),ht=new uE(v),nt=new Rb,M=new Xb(v,q,st,nt,V,It,ht),x=new iE(y),w=new oE(y),I=new _y(v),ee=new QS(v,I),F=new lE(v,I,ht,ee),z=new hE(v,F,I,ht),Dt=new fE(v,V,M),mt=new nE(nt),tt=new wb(y,x,w,q,V,ee,mt),ot=new tT(y,nt),at=new Pb,Mt=new Ob(q),Et=new JS(y,x,w,st,z,d,l),xt=new Hb(y,z,V),H=new eT(v,ht,V,st),dt=new tE(v,q,ht),Rt=new cE(v,q,ht),ht.programs=tt.programs,y.capabilities=V,y.extensions=q,y.properties=nt,y.renderLists=at,y.shadowMap=xt,y.state=st,y.info=ht}yt();const rt=new Jb(y,v);this.xr=rt,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){const T=q.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=q.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(T){T!==void 0&&(N=T,this.setSize(Y,J,!1))},this.getSize=function(T){return T.set(Y,J)},this.setSize=function(T,W,et=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=T,J=W,e.width=Math.floor(T*N),e.height=Math.floor(W*N),et===!0&&(e.style.width=T+"px",e.style.height=W+"px"),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set(Y*N,J*N).floor()},this.setDrawingBufferSize=function(T,W,et){Y=T,J=W,N=et,e.width=Math.floor(T*et),e.height=Math.floor(W*et),this.setViewport(0,0,T,W)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(bt)},this.setViewport=function(T,W,et,it){T.isVector4?bt.set(T.x,T.y,T.z,T.w):bt.set(T,W,et,it),st.viewport(P.copy(bt).multiplyScalar(N).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,W,et,it){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,W,et,it),st.scissor(O.copy(Ot).multiplyScalar(N).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(T){st.setScissorTest(Qt=T)},this.setOpaqueSort=function(T){Q=T},this.setTransparentSort=function(T){vt=T},this.getClearColor=function(T){return T.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(T=!0,W=!0,et=!0){let it=0;if(T){let j=!1;if(U!==null){const St=U.texture.format;j=St===Ou||St===Nu||St===Uu}if(j){const St=U.texture.type,Pt=St===$n||St===_s||St===io||St===hr||St===Lu||St===Iu,Bt=Et.getClearColor(),zt=Et.getClearAlpha(),jt=Bt.r,$t=Bt.g,kt=Bt.b;Pt?(g[0]=jt,g[1]=$t,g[2]=kt,g[3]=zt,v.clearBufferuiv(v.COLOR,0,g)):(_[0]=jt,_[1]=$t,_[2]=kt,_[3]=zt,v.clearBufferiv(v.COLOR,0,_))}else it|=v.COLOR_BUFFER_BIT}W&&(it|=v.DEPTH_BUFFER_BIT),et&&(it|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),at.dispose(),Mt.dispose(),nt.dispose(),x.dispose(),w.dispose(),z.dispose(),ee.dispose(),H.dispose(),tt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",mo),rt.removeEventListener("sessionend",Ge),_n.stop()};function pt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),G=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),G=!1;const T=ht.autoReset,W=xt.enabled,et=xt.autoUpdate,it=xt.needsUpdate,j=xt.type;yt(),ht.autoReset=T,xt.enabled=W,xt.autoUpdate=et,xt.needsUpdate=it,xt.type=j}function wt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Xt(T){const W=T.target;W.removeEventListener("dispose",Xt),ce(W)}function ce(T){xe(T),nt.remove(T)}function xe(T){const W=nt.get(T).programs;W!==void 0&&(W.forEach(function(et){tt.releaseProgram(et)}),T.isShaderMaterial&&tt.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,et,it,j,St){W===null&&(W=Ut);const Pt=j.isMesh&&j.matrixWorld.determinant()<0,Bt=$a(T,W,et,it,j);st.setMaterial(it,Pt);let zt=et.index,jt=1;if(it.wireframe===!0){if(zt=F.getWireframeAttribute(et),zt===void 0)return;jt=2}const $t=et.drawRange,kt=et.attributes.position;let ne=$t.start*jt,me=($t.start+$t.count)*jt;St!==null&&(ne=Math.max(ne,St.start*jt),me=Math.min(me,(St.start+St.count)*jt)),zt!==null?(ne=Math.max(ne,0),me=Math.min(me,zt.count)):kt!=null&&(ne=Math.max(ne,0),me=Math.min(me,kt.count));const _e=me-ne;if(_e<0||_e===1/0)return;ee.setup(j,it,Bt,et,zt);let en,se=dt;if(zt!==null&&(en=I.get(zt),se=Rt,se.setIndex(en)),j.isMesh)it.wireframe===!0?(st.setLineWidth(it.wireframeLinewidth*R()),se.setMode(v.LINES)):se.setMode(v.TRIANGLES);else if(j.isLine){let Ht=it.linewidth;Ht===void 0&&(Ht=1),st.setLineWidth(Ht*R()),j.isLineSegments?se.setMode(v.LINES):j.isLineLoop?se.setMode(v.LINE_LOOP):se.setMode(v.LINE_STRIP)}else j.isPoints?se.setMode(v.POINTS):j.isSprite&&se.setMode(v.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)se.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(q.get("WEBGL_multi_draw"))se.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Ht=j._multiDrawStarts,Zn=j._multiDrawCounts,re=j._multiDrawCount,wn=zt?I.get(zt).bytesPerElement:1,As=nt.get(it).currentProgram.getUniforms();for(let ln=0;ln<re;ln++)As.setValue(v,"_gl_DrawID",ln),se.render(Ht[ln]/wn,Zn[ln])}else if(j.isInstancedMesh)se.renderInstances(ne,_e,j.count);else if(et.isInstancedBufferGeometry){const Ht=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Zn=Math.min(et.instanceCount,Ht);se.renderInstances(ne,_e,Zn)}else se.render(ne,_e)};function ie(T,W,et){T.transparent===!0&&T.side===Ln&&T.forceSinglePass===!1?(T.side=an,T.needsUpdate=!0,Ts(T,W,et),T.side=Xi,T.needsUpdate=!0,Ts(T,W,et),T.side=Ln):Ts(T,W,et)}this.compile=function(T,W,et=null){et===null&&(et=T),p=Mt.get(et),p.init(W),A.push(p),et.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),T!==et&&T.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights();const it=new Set;return T.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const St=j.material;if(St)if(Array.isArray(St))for(let Pt=0;Pt<St.length;Pt++){const Bt=St[Pt];ie(Bt,et,j),it.add(Bt)}else ie(St,et,j),it.add(St)}),A.pop(),p=null,it},this.compileAsync=function(T,W,et=null){const it=this.compile(T,W,et);return new Promise(j=>{function St(){if(it.forEach(function(Pt){nt.get(Pt).currentProgram.isReady()&&it.delete(Pt)}),it.size===0){j(T);return}setTimeout(St,10)}q.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let tn=null;function gn(T){tn&&tn(T)}function mo(){_n.stop()}function Ge(){_n.start()}const _n=new Dm;_n.setAnimationLoop(gn),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(T){tn=T,rt.setAnimationLoop(T),T===null?_n.stop():_n.start()},rt.addEventListener("sessionstart",mo),rt.addEventListener("sessionend",Ge),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(W),W=rt.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,W,U),p=Mt.get(T,A.length),p.init(W),A.push(p),ft.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ct.setFromProjectionMatrix(ft),Tt=this.localClippingEnabled,_t=mt.init(this.clippingPlanes,Tt),m=at.get(T,S.length),m.init(),S.push(m),rt.enabled===!0&&rt.isPresenting===!0){const St=y.xr.getDepthSensingMesh();St!==null&&Yi(St,W,-1/0,y.sortObjects)}Yi(T,W,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Q,vt),C=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,C&&Et.addToRenderList(m,T),this.info.render.frame++,_t===!0&&mt.beginShadows();const et=p.state.shadowsArray;xt.render(et,T,W),_t===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const it=m.opaque,j=m.transmissive;if(p.setupLights(),W.isArrayCamera){const St=W.cameras;if(j.length>0)for(let Pt=0,Bt=St.length;Pt<Bt;Pt++){const zt=St[Pt];vn(it,j,T,zt)}C&&Et.render(T);for(let Pt=0,Bt=St.length;Pt<Bt;Pt++){const zt=St[Pt];bs(m,T,zt,zt.viewport)}}else j.length>0&&vn(it,j,T,W),C&&Et.render(T),bs(m,T,W);U!==null&&(M.updateMultisampleRenderTarget(U),M.updateRenderTargetMipmap(U)),T.isScene===!0&&T.onAfterRender(y,T,W),ee.resetDefaultState(),b=-1,E=null,A.pop(),A.length>0?(p=A[A.length-1],_t===!0&&mt.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Yi(T,W,et,it){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)et=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ct.intersectsSprite(T)){it&&gt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ft);const Pt=z.update(T),Bt=T.material;Bt.visible&&m.push(T,Pt,Bt,et,gt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ct.intersectsObject(T))){const Pt=z.update(T),Bt=T.material;if(it&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),gt.copy(T.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),gt.copy(Pt.boundingSphere.center)),gt.applyMatrix4(T.matrixWorld).applyMatrix4(ft)),Array.isArray(Bt)){const zt=Pt.groups;for(let jt=0,$t=zt.length;jt<$t;jt++){const kt=zt[jt],ne=Bt[kt.materialIndex];ne&&ne.visible&&m.push(T,Pt,ne,et,gt.z,kt)}}else Bt.visible&&m.push(T,Pt,Bt,et,gt.z,null)}}const St=T.children;for(let Pt=0,Bt=St.length;Pt<Bt;Pt++)Yi(St[Pt],W,et,it)}function bs(T,W,et,it){const j=T.opaque,St=T.transmissive,Pt=T.transparent;p.setupLightsView(et),_t===!0&&mt.setGlobalState(y.clippingPlanes,et),it&&st.viewport(P.copy(it)),j.length>0&&An(j,W,et),St.length>0&&An(St,W,et),Pt.length>0&&An(Pt,W,et),st.buffers.depth.setTest(!0),st.buffers.depth.setMask(!0),st.buffers.color.setMask(!0),st.setPolygonOffset(!1)}function vn(T,W,et,it){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[it.id]===void 0&&(p.state.transmissionRenderTarget[it.id]=new On(1,1,{generateMipmaps:!0,type:q.has("EXT_color_buffer_half_float")||q.has("EXT_color_buffer_float")?di:$n,minFilter:Bi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const St=p.state.transmissionRenderTarget[it.id],Pt=it.viewport||P;St.setSize(Pt.z,Pt.w);const Bt=y.getRenderTarget();y.setRenderTarget(St),y.getClearColor(K),lt=y.getClearAlpha(),lt<1&&y.setClearColor(16777215,.5),y.clear(),C&&Et.render(et);const zt=y.toneMapping;y.toneMapping=ki;const jt=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),p.setupLightsView(it),_t===!0&&mt.setGlobalState(y.clippingPlanes,it),An(T,et,it),M.updateMultisampleRenderTarget(St),M.updateRenderTargetMipmap(St),q.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let kt=0,ne=W.length;kt<ne;kt++){const me=W[kt],_e=me.object,en=me.geometry,se=me.material,Ht=me.group;if(se.side===Ln&&_e.layers.test(it.layers)){const Zn=se.side;se.side=an,se.needsUpdate=!0,go(_e,et,it,en,se,Ht),se.side=Zn,se.needsUpdate=!0,$t=!0}}$t===!0&&(M.updateMultisampleRenderTarget(St),M.updateRenderTargetMipmap(St))}y.setRenderTarget(Bt),y.setClearColor(K,lt),jt!==void 0&&(it.viewport=jt),y.toneMapping=zt}function An(T,W,et){const it=W.isScene===!0?W.overrideMaterial:null;for(let j=0,St=T.length;j<St;j++){const Pt=T[j],Bt=Pt.object,zt=Pt.geometry,jt=it===null?Pt.material:it,$t=Pt.group;Bt.layers.test(et.layers)&&go(Bt,W,et,zt,jt,$t)}}function go(T,W,et,it,j,St){T.onBeforeRender(y,W,et,it,j,St),T.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),j.onBeforeRender(y,W,et,it,T,St),j.transparent===!0&&j.side===Ln&&j.forceSinglePass===!1?(j.side=an,j.needsUpdate=!0,y.renderBufferDirect(et,W,it,j,T,St),j.side=Xi,j.needsUpdate=!0,y.renderBufferDirect(et,W,it,j,T,St),j.side=Ln):y.renderBufferDirect(et,W,it,j,T,St),T.onAfterRender(y,W,et,it,j,St)}function Ts(T,W,et){W.isScene!==!0&&(W=Ut);const it=nt.get(T),j=p.state.lights,St=p.state.shadowsArray,Pt=j.state.version,Bt=tt.getParameters(T,j.state,St,W,et),zt=tt.getProgramCacheKey(Bt);let jt=it.programs;it.environment=T.isMeshStandardMaterial?W.environment:null,it.fog=W.fog,it.envMap=(T.isMeshStandardMaterial?w:x).get(T.envMap||it.environment),it.envMapRotation=it.environment!==null&&T.envMap===null?W.environmentRotation:T.envMapRotation,jt===void 0&&(T.addEventListener("dispose",Xt),jt=new Map,it.programs=jt);let $t=jt.get(zt);if($t!==void 0){if(it.currentProgram===$t&&it.lightsStateVersion===Pt)return Mi(T,Bt),$t}else Bt.uniforms=tt.getUniforms(T),T.onBeforeCompile(Bt,y),$t=tt.acquireProgram(Bt,zt),jt.set(zt,$t),it.uniforms=Bt.uniforms;const kt=it.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(kt.clippingPlanes=mt.uniform),Mi(T,Bt),it.needsLights=Za(T),it.lightsStateVersion=Pt,it.needsLights&&(kt.ambientLightColor.value=j.state.ambient,kt.lightProbe.value=j.state.probe,kt.directionalLights.value=j.state.directional,kt.directionalLightShadows.value=j.state.directionalShadow,kt.spotLights.value=j.state.spot,kt.spotLightShadows.value=j.state.spotShadow,kt.rectAreaLights.value=j.state.rectArea,kt.ltc_1.value=j.state.rectAreaLTC1,kt.ltc_2.value=j.state.rectAreaLTC2,kt.pointLights.value=j.state.point,kt.pointLightShadows.value=j.state.pointShadow,kt.hemisphereLights.value=j.state.hemi,kt.directionalShadowMap.value=j.state.directionalShadowMap,kt.directionalShadowMatrix.value=j.state.directionalShadowMatrix,kt.spotShadowMap.value=j.state.spotShadowMap,kt.spotLightMatrix.value=j.state.spotLightMatrix,kt.spotLightMap.value=j.state.spotLightMap,kt.pointShadowMap.value=j.state.pointShadowMap,kt.pointShadowMatrix.value=j.state.pointShadowMatrix),it.currentProgram=$t,it.uniformsList=null,$t}function _o(T){if(T.uniformsList===null){const W=T.currentProgram.getUniforms();T.uniformsList=oa.seqWithValue(W.seq,T.uniforms)}return T.uniformsList}function Mi(T,W){const et=nt.get(T);et.outputColorSpace=W.outputColorSpace,et.batching=W.batching,et.batchingColor=W.batchingColor,et.instancing=W.instancing,et.instancingColor=W.instancingColor,et.instancingMorph=W.instancingMorph,et.skinning=W.skinning,et.morphTargets=W.morphTargets,et.morphNormals=W.morphNormals,et.morphColors=W.morphColors,et.morphTargetsCount=W.morphTargetsCount,et.numClippingPlanes=W.numClippingPlanes,et.numIntersection=W.numClipIntersection,et.vertexAlphas=W.vertexAlphas,et.vertexTangents=W.vertexTangents,et.toneMapping=W.toneMapping}function $a(T,W,et,it,j){W.isScene!==!0&&(W=Ut),M.resetTextureUnits();const St=W.fog,Pt=it.isMeshStandardMaterial?W.environment:null,Bt=U===null?y.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:_r,zt=(it.isMeshStandardMaterial?w:x).get(it.envMap||Pt),jt=it.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,$t=!!et.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),kt=!!et.morphAttributes.position,ne=!!et.morphAttributes.normal,me=!!et.morphAttributes.color;let _e=ki;it.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(_e=y.toneMapping);const en=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,se=en!==void 0?en.length:0,Ht=nt.get(it),Zn=p.state.lights;if(_t===!0&&(Tt===!0||T!==E)){const xn=T===E&&it.id===b;mt.setState(it,T,xn)}let re=!1;it.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==Zn.state.version||Ht.outputColorSpace!==Bt||j.isBatchedMesh&&Ht.batching===!1||!j.isBatchedMesh&&Ht.batching===!0||j.isBatchedMesh&&Ht.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Ht.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Ht.instancing===!1||!j.isInstancedMesh&&Ht.instancing===!0||j.isSkinnedMesh&&Ht.skinning===!1||!j.isSkinnedMesh&&Ht.skinning===!0||j.isInstancedMesh&&Ht.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Ht.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Ht.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Ht.instancingMorph===!1&&j.morphTexture!==null||Ht.envMap!==zt||it.fog===!0&&Ht.fog!==St||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==mt.numPlanes||Ht.numIntersection!==mt.numIntersection)||Ht.vertexAlphas!==jt||Ht.vertexTangents!==$t||Ht.morphTargets!==kt||Ht.morphNormals!==ne||Ht.morphColors!==me||Ht.toneMapping!==_e||Ht.morphTargetsCount!==se)&&(re=!0):(re=!0,Ht.__version=it.version);let wn=Ht.currentProgram;re===!0&&(wn=Ts(it,W,j));let As=!1,ln=!1,Mr=!1;const ve=wn.getUniforms(),zn=Ht.uniforms;if(st.useProgram(wn.program)&&(As=!0,ln=!0,Mr=!0),it.id!==b&&(b=it.id,ln=!0),As||E!==T){st.buffers.depth.getReversed()?(k.copy(T.projectionMatrix),qx(k),Yx(k),ve.setValue(v,"projectionMatrix",k)):ve.setValue(v,"projectionMatrix",T.projectionMatrix),ve.setValue(v,"viewMatrix",T.matrixWorldInverse);const Si=ve.map.cameraPosition;Si!==void 0&&Si.setValue(v,ut.setFromMatrixPosition(T.matrixWorld)),V.logarithmicDepthBuffer&&ve.setValue(v,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&ve.setValue(v,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,ln=!0,Mr=!0)}if(j.isSkinnedMesh){ve.setOptional(v,j,"bindMatrix"),ve.setOptional(v,j,"bindMatrixInverse");const xn=j.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),ve.setValue(v,"boneTexture",xn.boneTexture,M))}j.isBatchedMesh&&(ve.setOptional(v,j,"batchingTexture"),ve.setValue(v,"batchingTexture",j._matricesTexture,M),ve.setOptional(v,j,"batchingIdTexture"),ve.setValue(v,"batchingIdTexture",j._indirectTexture,M),ve.setOptional(v,j,"batchingColorTexture"),j._colorsTexture!==null&&ve.setValue(v,"batchingColorTexture",j._colorsTexture,M));const Sr=et.morphAttributes;if((Sr.position!==void 0||Sr.normal!==void 0||Sr.color!==void 0)&&Dt.update(j,et,wn),(ln||Ht.receiveShadow!==j.receiveShadow)&&(Ht.receiveShadow=j.receiveShadow,ve.setValue(v,"receiveShadow",j.receiveShadow)),it.isMeshGouraudMaterial&&it.envMap!==null&&(zn.envMap.value=zt,zn.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),it.isMeshStandardMaterial&&it.envMap===null&&W.environment!==null&&(zn.envMapIntensity.value=W.environmentIntensity),ln&&(ve.setValue(v,"toneMappingExposure",y.toneMappingExposure),Ht.needsLights&&Ka(zn,Mr),St&&it.fog===!0&&ot.refreshFogUniforms(zn,St),ot.refreshMaterialUniforms(zn,it,N,J,p.state.transmissionRenderTarget[T.id]),oa.upload(v,_o(Ht),zn,M)),it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(oa.upload(v,_o(Ht),zn,M),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&ve.setValue(v,"center",j.center),ve.setValue(v,"modelViewMatrix",j.modelViewMatrix),ve.setValue(v,"normalMatrix",j.normalMatrix),ve.setValue(v,"modelMatrix",j.matrixWorld),it.isShaderMaterial||it.isRawShaderMaterial){const xn=it.uniformsGroups;for(let Si=0,Ei=xn.length;Si<Ei;Si++){const $u=xn[Si];H.update($u,wn),H.bind($u,wn)}}return wn}function Ka(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function Za(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(T,W,et){nt.get(T.texture).__webglTexture=W,nt.get(T.depthTexture).__webglTexture=et;const it=nt.get(T);it.__hasExternalTextures=!0,it.__autoAllocateDepthBuffer=et===void 0,it.__autoAllocateDepthBuffer||q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),it.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,W){const et=nt.get(T);et.__webglFramebuffer=W,et.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(T,W=0,et=0){U=T,L=W,D=et;let it=!0,j=null,St=!1,Pt=!1;if(T){const zt=nt.get(T);if(zt.__useDefaultFramebuffer!==void 0)st.bindFramebuffer(v.FRAMEBUFFER,null),it=!1;else if(zt.__webglFramebuffer===void 0)M.setupRenderTarget(T);else if(zt.__hasExternalTextures)M.rebindTextures(T,nt.get(T.texture).__webglTexture,nt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const kt=T.depthTexture;if(zt.__boundDepthTexture!==kt){if(kt!==null&&nt.has(kt)&&(T.width!==kt.image.width||T.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(T)}}const jt=T.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Pt=!0);const $t=nt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray($t[W])?j=$t[W][et]:j=$t[W],St=!0):T.samples>0&&M.useMultisampledRTT(T)===!1?j=nt.get(T).__webglMultisampledFramebuffer:Array.isArray($t)?j=$t[et]:j=$t,P.copy(T.viewport),O.copy(T.scissor),B=T.scissorTest}else P.copy(bt).multiplyScalar(N).floor(),O.copy(Ot).multiplyScalar(N).floor(),B=Qt;if(st.bindFramebuffer(v.FRAMEBUFFER,j)&&it&&st.drawBuffers(T,j),st.viewport(P),st.scissor(O),st.setScissorTest(B),St){const zt=nt.get(T.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+W,zt.__webglTexture,et)}else if(Pt){const zt=nt.get(T.texture),jt=W||0;v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,zt.__webglTexture,et||0,jt)}b=-1},this.readRenderTargetPixels=function(T,W,et,it,j,St,Pt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=nt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pt!==void 0&&(Bt=Bt[Pt]),Bt){st.bindFramebuffer(v.FRAMEBUFFER,Bt);try{const zt=T.texture,jt=zt.format,$t=zt.type;if(!V.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!V.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-it&&et>=0&&et<=T.height-j&&v.readPixels(W,et,it,j,It.convert(jt),It.convert($t),St)}finally{const zt=U!==null?nt.get(U).__webglFramebuffer:null;st.bindFramebuffer(v.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(T,W,et,it,j,St,Pt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=nt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pt!==void 0&&(Bt=Bt[Pt]),Bt){const zt=T.texture,jt=zt.format,$t=zt.type;if(!V.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!V.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=T.width-it&&et>=0&&et<=T.height-j){st.bindFramebuffer(v.FRAMEBUFFER,Bt);const kt=v.createBuffer();v.bindBuffer(v.PIXEL_PACK_BUFFER,kt),v.bufferData(v.PIXEL_PACK_BUFFER,St.byteLength,v.STREAM_READ),v.readPixels(W,et,it,j,It.convert(jt),It.convert($t),0);const ne=U!==null?nt.get(U).__webglFramebuffer:null;st.bindFramebuffer(v.FRAMEBUFFER,ne);const me=v.fenceSync(v.SYNC_GPU_COMMANDS_COMPLETE,0);return v.flush(),await jx(v,me,4),v.bindBuffer(v.PIXEL_PACK_BUFFER,kt),v.getBufferSubData(v.PIXEL_PACK_BUFFER,0,St),v.deleteBuffer(kt),v.deleteSync(me),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,W=null,et=0){T.isTexture!==!0&&(Fr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1]);const it=Math.pow(2,-et),j=Math.floor(T.image.width*it),St=Math.floor(T.image.height*it),Pt=W!==null?W.x:0,Bt=W!==null?W.y:0;M.setTexture2D(T,0),v.copyTexSubImage2D(v.TEXTURE_2D,et,0,0,Pt,Bt,j,St),st.unbindTexture()},this.copyTextureToTexture=function(T,W,et=null,it=null,j=0){T.isTexture!==!0&&(Fr("WebGLRenderer: copyTextureToTexture function signature has changed."),it=arguments[0]||null,T=arguments[1],W=arguments[2],j=arguments[3]||0,et=null);let St,Pt,Bt,zt,jt,$t,kt,ne,me;const _e=T.isCompressedTexture?T.mipmaps[j]:T.image;et!==null?(St=et.max.x-et.min.x,Pt=et.max.y-et.min.y,Bt=et.isBox3?et.max.z-et.min.z:1,zt=et.min.x,jt=et.min.y,$t=et.isBox3?et.min.z:0):(St=_e.width,Pt=_e.height,Bt=_e.depth||1,zt=0,jt=0,$t=0),it!==null?(kt=it.x,ne=it.y,me=it.z):(kt=0,ne=0,me=0);const en=It.convert(W.format),se=It.convert(W.type);let Ht;W.isData3DTexture?(M.setTexture3D(W,0),Ht=v.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(M.setTexture2DArray(W,0),Ht=v.TEXTURE_2D_ARRAY):(M.setTexture2D(W,0),Ht=v.TEXTURE_2D),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,W.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,W.unpackAlignment);const Zn=v.getParameter(v.UNPACK_ROW_LENGTH),re=v.getParameter(v.UNPACK_IMAGE_HEIGHT),wn=v.getParameter(v.UNPACK_SKIP_PIXELS),As=v.getParameter(v.UNPACK_SKIP_ROWS),ln=v.getParameter(v.UNPACK_SKIP_IMAGES);v.pixelStorei(v.UNPACK_ROW_LENGTH,_e.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,_e.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,zt),v.pixelStorei(v.UNPACK_SKIP_ROWS,jt),v.pixelStorei(v.UNPACK_SKIP_IMAGES,$t);const Mr=T.isDataArrayTexture||T.isData3DTexture,ve=W.isDataArrayTexture||W.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const zn=nt.get(T),Sr=nt.get(W),xn=nt.get(zn.__renderTarget),Si=nt.get(Sr.__renderTarget);st.bindFramebuffer(v.READ_FRAMEBUFFER,xn.__webglFramebuffer),st.bindFramebuffer(v.DRAW_FRAMEBUFFER,Si.__webglFramebuffer);for(let Ei=0;Ei<Bt;Ei++)Mr&&v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,nt.get(T).__webglTexture,j,$t+Ei),T.isDepthTexture?(ve&&v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,nt.get(W).__webglTexture,j,me+Ei),v.blitFramebuffer(zt,jt,St,Pt,kt,ne,St,Pt,v.DEPTH_BUFFER_BIT,v.NEAREST)):ve?v.copyTexSubImage3D(Ht,j,kt,ne,me+Ei,zt,jt,St,Pt):v.copyTexSubImage2D(Ht,j,kt,ne,me+Ei,zt,jt,St,Pt);st.bindFramebuffer(v.READ_FRAMEBUFFER,null),st.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else ve?T.isDataTexture||T.isData3DTexture?v.texSubImage3D(Ht,j,kt,ne,me,St,Pt,Bt,en,se,_e.data):W.isCompressedArrayTexture?v.compressedTexSubImage3D(Ht,j,kt,ne,me,St,Pt,Bt,en,_e.data):v.texSubImage3D(Ht,j,kt,ne,me,St,Pt,Bt,en,se,_e):T.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,j,kt,ne,St,Pt,en,se,_e.data):T.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,j,kt,ne,_e.width,_e.height,en,_e.data):v.texSubImage2D(v.TEXTURE_2D,j,kt,ne,St,Pt,en,se,_e);v.pixelStorei(v.UNPACK_ROW_LENGTH,Zn),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,re),v.pixelStorei(v.UNPACK_SKIP_PIXELS,wn),v.pixelStorei(v.UNPACK_SKIP_ROWS,As),v.pixelStorei(v.UNPACK_SKIP_IMAGES,ln),j===0&&W.generateMipmaps&&v.generateMipmap(Ht),st.unbindTexture()},this.copyTextureToTexture3D=function(T,W,et=null,it=null,j=0){return T.isTexture!==!0&&(Fr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),et=arguments[0]||null,it=arguments[1]||null,T=arguments[2],W=arguments[3],j=arguments[4]||0),Fr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,W,et,it,j)},this.initRenderTarget=function(T){nt.get(T).__webglFramebuffer===void 0&&M.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?M.setTextureCube(T,0):T.isData3DTexture?M.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?M.setTexture2DArray(T,0):M.setTexture2D(T,0),st.unbindTexture()},this.resetState=function(){L=0,D=0,U=null,st.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class Hu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new Hu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class iT extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class sT extends Qe{constructor(t=null,e=1,i=1,s,r,o,a,l,c=mn,u=mn,f,h){super(null,o,a,l,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class eu extends Es{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ma=new X,Sa=new X,Jh=new pe,Lr=new ho,Go=new vr,Gl=new X,Qh=new X;class rT extends we{constructor(t=new Ve,e=new eu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Ma.fromBufferAttribute(e,s-1),Sa.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Ma.distanceTo(Sa);t.setAttribute("lineDistance",new Ee(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Go.copy(i.boundingSphere),Go.applyMatrix4(s),Go.radius+=r,t.ray.intersectsSphere(Go)===!1)return;Jh.copy(s).invert(),Lr.copy(t.ray).applyMatrix4(Jh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=u.getX(_),S=u.getX(_+1),A=Wo(this,t,Lr,l,p,S);A&&e.push(A)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=Wo(this,t,Lr,l,_,m);p&&e.push(p)}}else{const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=d,m=g-1;_<m;_+=c){const p=Wo(this,t,Lr,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Wo(this,t,Lr,l,g-1,d);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Wo(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Ma.fromBufferAttribute(o,s),Sa.fromBufferAttribute(o,r),e.distanceSqToSegment(Ma,Sa,Gl,Qh)>i)return;Gl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Gl);if(!(l<t.near||l>t.far))return{distance:l,point:Qh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const td=new X,ed=new X;class nd extends rT{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)td.fromBufferAttribute(e,s),ed.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+td.distanceTo(ed);t.setAttribute("lineDistance",new Ee(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class oT extends Es{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const id=new pe,nu=new ho,Xo=new vr,jo=new X;class aT extends we{constructor(t=new Ve,e=new oT){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xo.copy(i.boundingSphere),Xo.applyMatrix4(s),Xo.radius+=r,t.ray.intersectsSphere(Xo)===!1)return;id.copy(s).invert(),nu.copy(t.ray).applyMatrix4(id);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);jo.fromBufferAttribute(f,m),sd(jo,m,l,s,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)jo.fromBufferAttribute(f,g),sd(jo,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function sd(n,t,e,i,s,r,o){const a=nu.distanceSqToPoint(n);if(a<e){const l=new X;nu.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Vu extends Ve{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let f=t;const h=(e-t)/s,d=new X,g=new Vt;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=r+m/i*o;d.x=f*Math.cos(p),d.y=f*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const S=p+m,A=S,y=S+i+1,G=S+i+2,L=S+1;a.push(A,y,L),a.push(y,G,L)}}this.setIndex(a),this.setAttribute("position",new Ee(l,3)),this.setAttribute("normal",new Ee(c,3)),this.setAttribute("uv",new Ee(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ls extends Ve{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new X,h=new X,d=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const S=[],A=p/i;let y=0;p===0&&o===0?y=.5/e:p===i&&l===Math.PI&&(y=-.5/e);for(let G=0;G<=e;G++){const L=G/e;f.x=-t*Math.cos(s+L*r)*Math.sin(o+A*a),f.y=t*Math.cos(o+A*a),f.z=t*Math.sin(s+L*r)*Math.sin(o+A*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(L+y,1-A),S.push(c++)}u.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const A=u[p][S+1],y=u[p][S],G=u[p+1][S],L=u[p+1][S+1];(p!==0||o>0)&&d.push(A,y,L),(p!==i-1||l<Math.PI)&&d.push(y,G,L)}this.setIndex(d),this.setAttribute("position",new Ee(g,3)),this.setAttribute("normal",new Ee(_,3)),this.setAttribute("uv",new Ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Gu extends Ve{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new X,f=new X,h=new X;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){const _=g/s*r,m=d/i*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(_),f.y=(t+e*Math.cos(m))*Math.sin(_),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){const _=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,S=(s+1)*d+g;o.push(_,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new Ee(a,3)),this.setAttribute("normal",new Ee(l,3)),this.setAttribute("uv",new Ee(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class lT extends ke{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class rd extends Es{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ym,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fm extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class cT extends Fm{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Wl=new pe,od=new X,ad=new X;class uT{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bu,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;od.setFromMatrixPosition(t.matrixWorld),e.position.copy(od),ad.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ad),e.updateMatrixWorld(),Wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class fT extends uT{constructor(){super(new zu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ld extends Fm{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new fT}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Bm{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=cd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=cd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function cd(){return performance.now()}const ud=new pe;class hT{constructor(t,e,i=0,s=1/0){this.ray=new ho(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Fu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ud.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ud),this}intersectObject(t,e=!0,i=[]){return iu(t,this,i,e),i.sort(fd),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)iu(t[s],this,i,e);return i.sort(fd),i}}function fd(n,t){return n.distance-t.distance}function iu(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)iu(r[o],t,e,!0)}}class hd{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ke(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dT extends Ss{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cu);const dd={type:"change"},Wu={type:"start"},zm={type:"end"},qo=new ho,pd=new Ui,pT=Math.cos(70*Wx.DEG2RAD),Re=new X,sn=2*Math.PI,he={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Xl=1e-6;class mT extends dT{constructor(t,e=null){super(t,e),this.state=he.NONE,this.enabled=!0,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:tr.ROTATE,MIDDLE:tr.DOLLY,RIGHT:tr.PAN},this.touches={ONE:qs.ROTATE,TWO:qs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new X,this._lastQuaternion=new vs,this._lastTargetPosition=new X,this._quat=new vs().setFromUnitVectors(t.up,new X(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new hd,this._sphericalDelta=new hd,this._scale=1,this._panOffset=new X,this._rotateStart=new Vt,this._rotateEnd=new Vt,this._rotateDelta=new Vt,this._panStart=new Vt,this._panEnd=new Vt,this._panDelta=new Vt,this._dollyStart=new Vt,this._dollyEnd=new Vt,this._dollyDelta=new Vt,this._dollyDirection=new X,this._mouse=new Vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=_T.bind(this),this._onPointerDown=gT.bind(this),this._onPointerUp=vT.bind(this),this._onContextMenu=TT.bind(this),this._onMouseWheel=MT.bind(this),this._onKeyDown=ST.bind(this),this._onTouchStart=ET.bind(this),this._onTouchMove=bT.bind(this),this._onMouseDown=xT.bind(this),this._onMouseMove=yT.bind(this),this._interceptControlDown=AT.bind(this),this._interceptControlUp=wT.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(dd),this.update(),this.state=he.NONE}update(t=null){const e=this.object.position;Re.copy(e).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===he.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=sn:i>Math.PI&&(i-=sn),s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),e.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Re.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new X(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new X(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(qo.origin.copy(this.object.position),qo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(qo.direction))<pT?this.object.lookAt(this.target):(pd.setFromNormalAndCoplanarPoint(this.object.up,this.target),qo.intersectPlane(pd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Xl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Xl||this._lastTargetPosition.distanceToSquared(this.target)>Xl?(this.dispatchEvent(dd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?sn/60*this.autoRotateSpeed*t:sn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Re.setFromMatrixColumn(e,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,e){this.screenSpacePanning===!0?Re.setFromMatrixColumn(e,1):(Re.setFromMatrixColumn(e,0),Re.crossVectors(this.object.up,Re)),Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Re.copy(s).sub(this.target);let r=Re.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-sn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/e.clientHeight),this._rotateUp(sn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function gT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function _T(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function vT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zm),this.state=he.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function xT(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case tr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=he.DOLLY;break;case tr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}break;case tr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(Wu)}function yT(n){switch(this.state){case he.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case he.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case he.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function MT(n){this.enabled===!1||this.enableZoom===!1||this.state!==he.NONE||(n.preventDefault(),this.dispatchEvent(Wu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(zm))}function ST(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function ET(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case qs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=he.TOUCH_ROTATE;break;case qs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=he.TOUCH_PAN;break;default:this.state=he.NONE}break;case 2:switch(this.touches.TWO){case qs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=he.TOUCH_DOLLY_PAN;break;case qs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=he.TOUCH_DOLLY_ROTATE;break;default:this.state=he.NONE}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(Wu)}function bT(n){switch(this._trackPointer(n),this.state){case he.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case he.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case he.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case he.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=he.NONE}}function TT(n){this.enabled!==!1&&n.preventDefault()}function AT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const km={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class yr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const RT=new zu(-1,1,1,-1,0,1);class CT extends Ve{constructor(){super(),this.setAttribute("position",new Ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ee([0,2,0,0,2,0],2))}}const PT=new CT;class Xu{constructor(t){this._mesh=new Te(PT,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,RT)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class DT extends yr{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ke?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=so.clone(t.uniforms),this.material=new ke({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Xu(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class md extends yr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class LT extends yr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class IT{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Vt);this._width=i.width,this._height=i.height,e=new On(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:di}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new DT(km),this.copyPass.material.blending=hi,this.clock=new Bm}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}md!==void 0&&(o instanceof md?i=!0:o instanceof LT&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Vt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const UT={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class NT extends yr{constructor(){super();const t=UT;this.uniforms=so.clone(t.uniforms),this.material=new lT({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Xu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},te.getTransfer(this._outputColorSpace)===ue&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===sm?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===rm?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===om?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Pu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===am?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===lm&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class OT extends yr{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new qt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const FT={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class mr extends yr{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Vt(t.x,t.y):new Vt(256,256),this.clearColor=new qt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new On(r,o,{type:di}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const h=new On(r,o,{type:di});h.texture.name="UnrealBloomPass.h"+f,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new On(r,o,{type:di});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),o=Math.round(o/2)}const a=FT;this.highPassUniforms=so.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ke({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new Vt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new X(1,1,1),new X(1,1,1),new X(1,1,1),new X(1,1,1),new X(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=km;this.copyUniforms=so.clone(u.uniforms),this.blendMaterial=new ke({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:us,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new qt,this.oldClearAlpha=1,this.basic=new fn,this.fsQuad=new Xu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Vt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=mr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=mr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new ke({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Vt(.5,.5)},direction:{value:new Vt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}mr.BlurDirectionX=new Vt(1,0);mr.BlurDirectionY=new Vt(0,1);class Ir extends we{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Vt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Vs=new X,gd=new pe,_d=new pe,vd=new X,xd=new X;class BT{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),gd.copy(_.matrixWorldInverse),_d.multiplyMatrices(_.projectionMatrix,gd),u(g,g,_),d(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Vs.setFromMatrixPosition(g.matrixWorld),Vs.applyMatrix4(_d);const p=Vs.z>=-1&&Vs.z<=1&&g.layers.test(m.layers)===!0,S=g.element;S.style.display=p===!0?"":"none",p===!0&&(g.onBeforeRender(e,_,m),S.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Vs.x*r+r)+"px,"+(-Vs.y*o+o)+"px)",S.parentNode!==l&&l.appendChild(S),g.onAfterRender(e,_,m));const A={distanceToCameraSquared:f(m,g)};a.objects.set(g,A)}for(let p=0,S=g.children.length;p<S;p++)u(g.children[p],_,m)}function f(g,_){return vd.setFromMatrixPosition(g.matrixWorld),xd.setFromMatrixPosition(_.matrixWorld),vd.distanceToSquared(xd)}function h(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function d(g){const _=h(g).sort(function(p,S){if(p.renderOrder!==S.renderOrder)return S.renderOrder-p.renderOrder;const A=a.objects.get(p).distanceToCameraSquared,y=a.objects.get(S).distanceToCameraSquared;return A-y}),m=_.length;for(let p=0,S=_.length;p<S;p++)_[p].element.style.zIndex=m-p}}}const zT="v5";function kT(n,t){return`${zT}-${n}-${t}`}const Ea=new Map;function yd(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function HT(n){return n-Math.floor(n)}function Yo(n,t,e){return HT(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function su(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=Yo(i,s,e),u=Yo(i+1,s,e),f=Yo(i,s+1,e),h=Yo(i+1,s+1,e);return c+(u-c)*a+(f-c)*l+(h-f-(u-c))*a*l}function VT(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*su(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function GT(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function WT(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,f=VT(c*4.2+t*.002,u*4.2-t*.001,t),d=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,su(c*14,u*14,t+11)-.38),1.4),_=su(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*f)*d*(1-g*.55)*_;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[p,S,A]=GT(e,r,m),y=(a*n+l)*4;s[y]=p,s[y+1]=S,s[y+2]=A,s[y+3]=255}const o=new sT(s,n,n);return o.format=Sn,o.type=$n,o.colorSpace=rn,o.wrapS=no,o.wrapT=no,o.generateMipmaps=!0,o.minFilter=Bi,o.magFilter=Un,o.flipY=!0,o.needsUpdate=!0,o}function XT(n,t){const e=yd(n)%14,i=kT(t,e);let s=Ea.get(i);if(!s){const r=yd(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=WT(256,r,o,t),Ea.set(i,s)}return{map:s}}function jT(){for(const n of Ea.values())n.dispose();Ea.clear()}function Oi(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>1}function qT(){if(typeof navigator>"u")return!1;const n=navigator.deviceMemory,t=navigator.hardwareConcurrency;return n&&n<=4||t&&t<=4?!0:Oi()}const YT=461586,$T=4874368,KT=9103615,Md=12101887,ZT=4873336,JT=6091007,Sd=13165823,QT=10205416,tA=1.35,eA=4e3,We={pixelRatio:Oi()?1:Math.min(window.devicePixelRatio,2),starfieldCount:qT()?800:2e3,geometrySegments:Oi()?{major:24,fusion:16}:{major:48,fusion:36},enableBloom:!Oi(),bloomResolutionScale:(Oi(),.5),animationFrameSkip:Oi()?2:1},nA=["热度/年薪","强度/竞争","学历门槛","学科技能"];function ju(n,t,e,i,s){const r=n.clientWidth||window.innerWidth,o=n.clientHeight||window.innerHeight,a=new iT;a.background=new qt(YT),a.fog=new Hu($T,.032);const l=new Mn(55,r/o,.1,200);l.position.set(12,10,16);const c=new nT({antialias:!Oi(),alpha:!1,powerPreference:Oi()?"default":"high-performance"});c.setPixelRatio(We.pixelRatio),c.setSize(r,o),c.outputColorSpace=rn,c.toneMapping=Pu,c.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(c.domElement);const u=document.createElement("div");u.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(u);const f=new BT({element:u});f.setSize(r,o);const h=We.pixelRatio,d=new IT(c);d.setPixelRatio(h);const g=new OT(a,l);let _=null,m=null;if(We.enableBloom){const w=new Vt(Math.max(128,Math.floor(r*h*We.bloomResolutionScale)),Math.max(128,Math.floor(o*h*We.bloomResolutionScale)));_=new mr(w,.34,.34,.88),m=new NT,d.addPass(g),d.addPass(_),d.addPass(m)}else d.addPass(g);const p=new cT(9088744,1382432,.62);a.add(p);const S=new ld(15791871,.55);S.position.set(8,14,10),a.add(S);const A=new ld(6324424,.22);A.position.set(-12,-2,-8),a.add(A);const y=new mT(l,c.domElement);y.enableDamping=!0,y.dampingFactor=.06,y.minDistance=4,y.maxDistance=48,y.autoRotate=!0,y.autoRotateSpeed=tA;let G=null,L=!1;const D=()=>{G!==null&&(window.clearTimeout(G),G=null)},U=()=>{D(),G=window.setTimeout(()=>{L||(y.autoRotate=!0)},eA)},b=()=>{L=!0,y.autoRotate=!1,D()},E=()=>{L=!1,U()},P=()=>{y.autoRotate=!1,U()},O=Math.min(1,Math.max(0,(s==null?void 0:s.ambientStarBoost)??0)),B=Math.min(50,Math.max(1,Math.floor((s==null?void 0:s.maxStarsPerFusion)??50))),K=new Map,lt=new Map;let Y=null,J=null;const Q=(()=>{const w=Math.min(We.starfieldCount,Math.floor(We.starfieldCount*.2+O*We.starfieldCount*.8)),I=new Float32Array(w*3),F=new Float32Array(w);for(let Mt=0;Mt<w;Mt++){const mt=Math.random(),xt=Math.random(),Et=2*Math.PI*mt,Dt=Math.acos(2*xt-1),dt=26+Math.random()*78,Rt=Math.sin(Dt);I[Mt*3]=dt*Rt*Math.cos(Et),I[Mt*3+1]=dt*Rt*Math.sin(Et),I[Mt*3+2]=dt*Math.cos(Dt);const It=.04+Math.random()*.12+O*.06;F[Mt]=Math.min(.26,It)}const z=new Ve;z.setAttribute("position",new Tn(I,3)),z.setAttribute("size",new Tn(F,1));const tt=.42+O*.58,ot=new ke({uniforms:{uColor:{value:new qt(QT)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uAlphaMul:{value:tt}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:us}),at=new aT(z,ot);return at.frustumCulled=!1,a.add(at),at})(),vt=(w,I,F)=>{w.traverse(z=>{z instanceof Ir||(z.userData.nodeId=I,z.userData.nodeType=F)})},bt=(w,I)=>{const F=document.createElement("div");F.textContent=w,F.setAttribute("role","presentation");const z=I==="fusion",tt=z?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",ot=z?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",at=z?"#f4ecff":"#eaf6ff";return F.style.cssText=[`max-width:${z?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${at}`,`background:${tt}`,`border:${ot}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),F},Ot=w=>{const I=document.createElement("div");return I.textContent=w,I.setAttribute("role","presentation"),I.style.cssText=["max-width: 52px","padding: 2px 5px","border-radius: 5px","font-size: 8px","font-weight: 650","line-height: 1.2","text-align: center","letter-spacing: 0.01em","color: #ede6ff","background: rgba(28, 20, 42, 0.82)","border: 1px solid rgba(200, 170, 255, 0.42)","box-shadow: 0 1px 5px rgba(0,0,0,0.35)","text-shadow: 0 1px 2px rgba(0,0,0,0.7)","display: -webkit-box","-webkit-box-orient: vertical","-webkit-line-clamp: 2","overflow: hidden","word-break: break-all","overflow-wrap: anywhere","opacity: 0","visibility: hidden","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),I},Qt=(w,I,F)=>{const z=w==="major",tt=new $s,ot=z?"major":"fusion",{map:at}=XT(I,ot),Mt=z?.23:.15,mt=new ls(Mt,z?We.geometrySegments.major:We.geometrySegments.fusion,Math.floor(z?We.geometrySegments.major*.67:We.geometrySegments.fusion*.72)),xt=new fn({map:at,color:new qt(16777215),transparent:!0,opacity:1,fog:!1}),Et=new Te(mt,xt);Et.userData.part="core",tt.add(Et);const Dt=z?KT:Md,dt=new ls(Mt*1.52,18,14),Rt=new fn({color:Dt,transparent:!0,opacity:z?.045:.032,depthWrite:!1,blending:us,fog:!1}),It=new Te(dt,Rt);if(It.renderOrder=-1,It.userData.part="glow",tt.add(It),z){const yt=new fn({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:Ln,fog:!1}),rt=(Ct,wt,Xt)=>{const ce=new Gu(Ct,wt,10,80),xe=new Te(ce,yt.clone());return xe.rotation.x=Math.PI/2,xe.rotation.z=Xt,xe.userData.part="ring",xe};tt.add(rt(.46,.014,Math.random()*Math.PI));const pt=rt(.38,.01,Math.PI/2.8);pt.rotation.y=Math.PI/3.2,tt.add(pt)}else{const yt=Math.max(Mt*5.55,.78),rt=yt*1.2,pt=yt*.82,Ct=yt*1.22,wt=new Vu(pt,Ct,80),Xt=new fn({color:Md,transparent:!0,opacity:.5,depthWrite:!1,side:Ln,fog:!1,blending:us}),ce=new Te(wt,Xt);ce.rotation.x=Math.PI/2,ce.renderOrder=0,ce.userData.part="ring",tt.add(ce);const xe=Math.max(Mt*.34,.052),ie=[.02,.14,.55,.42];for(let Ge=0;Ge<4;Ge++){const _n=new ls(xe,14,12),Yi=new qt().setHSL(ie[Ge],.55,.62),bs=new fn({color:Yi,transparent:!0,opacity:.94,fog:!1}),vn=new Te(_n,bs),An=Ge/4*Math.PI*2-Math.PI/4,go=Math.cos(An)*yt,Ts=Math.sin(An)*yt;vn.position.set(go,0,Ts),vn.userData.part="satellite",tt.add(vn);const _o=Ot(nA[Ge]),Mi=new Ir(_o),$a=Math.cos(An)*rt,Ka=Math.sin(An)*rt,Za=xe*.55+Ge%2*.018;Mi.position.set($a,Za,Ka),Mi.center.set(.5,1),Mi.renderOrder=8,Mi.userData.isFusionQuadrantLabel=!0,tt.add(Mi)}const tn=[],gn=yt*1.38,mo=Math.max(Mt*.2,.026);for(let Ge=0;Ge<B;Ge++){const _n=Ge/B*Math.PI*2-Math.PI/2,Yi=new ls(mo,8,6),bs=new fn({color:10135752,transparent:!0,opacity:.14,depthWrite:!1,fog:!1,blending:us}),vn=new Te(Yi,bs),An=.015*(Ge%4);vn.position.set(Math.cos(_n)*gn,An,Math.sin(_n)*gn),vn.userData.part="starlit",vn.userData.starIndex=Ge,tt.add(vn),tn.push(vn)}tt.userData.starlitStars=tn,tt.userData.currentStarsLit=0}const ee=bt(F,w),H=new Ir(ee);return H.position.set(0,Mt*1.38,0),H.center.set(.5,1),H.renderOrder=10,H.userData.isNodeLabel=!0,tt.add(H),tt.userData.nodeVisual={core:Et,glow:It},tt};for(const w of t.nodes){const I=t.layout[w.id];if(!I)continue;const F=Qt(w.type,w.id,w.label);F.position.set(I.x,I.y,I.z),F.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),F.userData.nodeId=w.id,F.userData.nodeType=w.type,vt(F,w.id,w.type),a.add(F),K.set(w.id,F)}const ct=(w,I)=>w<I?`${w}|${I}`:`${I}|${w}`,_t=()=>{const w=[];for(const z of t.edges){const tt=t.layout[z.u],ot=t.layout[z.v];!tt||!ot||w.push(tt.x,tt.y,tt.z,ot.x,ot.y,ot.z)}const I=new Ve;I.setAttribute("position",new Ee(w,3));const F=new eu({color:ZT,transparent:!0,opacity:.32,depthWrite:!1});return new nd(I,F)},Tt=w=>{const I=[...w],F=[],z=new Set(t.edges.map(at=>ct(at.u,at.v)));for(let at=0;at<I.length-1;at++){const Mt=I[at],mt=I[at+1];if(!z.has(ct(Mt,mt)))continue;const xt=t.layout[Mt],Et=t.layout[mt];!xt||!Et||F.push(xt.x,xt.y,xt.z,Et.x,Et.y,Et.z)}const tt=new Ve;tt.setAttribute("position",new Ee(F,3));const ot=new eu({color:JT,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new nd(tt,ot)};Y=_t(),a.add(Y),J=Tt(e.pathIds),a.add(J);const k=new $s;a.add(k),(()=>{for(;k.children.length;)k.remove(k.children[0]);lt.clear();const w=new ls(1,20,20);for(const I of t.hyperedges){const F=[];for(const mt of I.member_node_ids){const xt=t.layout[mt];xt&&F.push(new X(xt.x,xt.y,xt.z))}if(!F.length)continue;const z=new xs().setFromPoints(F),tt=new vr;z.getBoundingSphere(tt);const ot=new fn({color:Sd,transparent:!0,opacity:.07,depthWrite:!1}),at=new Te(w,ot);at.position.copy(tt.center);const Mt=Math.max(tt.radius*1.45,.65);at.scale.setScalar(Mt),at.userData.hyperedgeId=I.id,k.add(at),lt.set(I.id,at)}})();const ut=new hT,gt=new Vt,Ut=(w,I)=>{const F=c.domElement.getBoundingClientRect();gt.x=(w-F.left)/F.width*2-1,gt.y=-((I-F.top)/F.height)*2+1,ut.setFromCamera(gt,l);const z=[...K.values()],ot=ut.intersectObjects(z,!0).find(Mt=>Mt.object instanceof Te&&typeof Mt.object.userData.nodeId=="string");if(!ot){i(null);return}const at=ot.object.userData.nodeId;i(at??null)},C=w=>{w.button===0&&(b(),Ut(w.clientX,w.clientY))};c.domElement.addEventListener("pointerdown",C),c.domElement.addEventListener("pointerup",E),c.domElement.addEventListener("wheel",P,{passive:!0}),c.domElement.addEventListener("touchstart",b,{passive:!0}),c.domElement.addEventListener("touchend",E,{passive:!0}),y.addEventListener("start",b),y.addEventListener("end",E);let R=0,v=0;const Z=new Bm,q=()=>{v++;const w=Z.getDelta(),I=Z.getElapsedTime();if(y.update(),v%We.animationFrameSkip===0)for(const F of K.values())F.rotation.y+=w*.1*We.animationFrameSkip,F.rotation.z+=w*.02*Math.sin(I*.6+F.position.x*.2)*We.animationFrameSkip;d.render(),f.render(a,l),R=requestAnimationFrame(q)};q();const V=()=>{const w=n.clientWidth||window.innerWidth,I=n.clientHeight||window.innerHeight;l.aspect=w/I,l.updateProjectionMatrix(),c.setSize(w,I),d.setSize(w,I),f.setSize(w,I),Q.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",V);const st=(w,I)=>{const F=K.get(w);if(!F)return;const z=F.userData.starlitStars;if(!(z!=null&&z.length))return;const tt=Math.max(0,Math.min(z.length,Math.floor(I)));F.userData.currentStarsLit=tt;for(let ot=0;ot<z.length;ot++){const at=z[ot].material;ot<tt?(at.color.setHex(16771240),at.opacity=.94):(at.color.setHex(9083576),at.opacity=.12)}},ht=w=>{for(const I of t.nodes)I.type==="fusion"&&st(I.id,w[I.id]??0)};ht((s==null?void 0:s.starsLitByNodeId)??{});let nt=e;const M=w=>{nt=w,J&&(a.remove(J),J.geometry.dispose(),J.material.dispose(),J=Tt(w.pathIds),a.add(J));const I=new Set([...w.pathIds,...w.hyperMemberIds]);for(const[F,z]of K){const tt=w.pathIds.has(F),ot=w.hyperMemberIds.has(F),at=w.selectedId===F,Mt=!I.has(F)&&(w.pathIds.size>0||w.hyperMemberIds.size>0),mt=Mt?.32:1,xt=z.userData.nodeType||"major";z.traverse(Et=>{if(Et instanceof Ir&&Et.userData.isNodeLabel){const dt=Et.element;let Rt=Mt?.36:.96;(tt||ot)&&(Rt=Math.max(Rt,.94)),at&&(Rt=1),dt.style.opacity=String(Rt),dt.style.filter=at?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":tt||ot?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",dt.style.fontWeight=at?"800":"650",Et.renderOrder=at?20:10;return}if(Et instanceof Ir&&Et.userData.isFusionQuadrantLabel){const dt=Et.element;if(!(xt==="fusion"&&at)){dt.style.opacity="0",dt.style.visibility="hidden",Et.renderOrder=1;return}dt.style.visibility="visible";let It=Mt?.3:.92;(tt||ot)&&(It=Math.max(It,.9)),at&&(It=1),dt.style.opacity=String(It),dt.style.filter=at?"drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))":tt||ot?"drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))":"none",Et.renderOrder=at?18:8;return}if(!(Et instanceof Te))return;const Dt=Et.material;if(Dt instanceof fn&&(Et.userData.part||"other")==="core"){let Rt=Mt?.34:1;(tt||ot)&&(Rt=Math.max(Rt,.98)),at&&(Rt=1),Dt.opacity=Rt,Dt.transparent=Rt<.999,Dt.color.set(at?16777215:tt||ot?15924223:16777215);return}if(Dt instanceof rd){let dt=Mt?.38:1,Rt=xt==="major"?.11:.09;(tt||ot)&&(dt=Math.max(dt,.98),Rt=.26),at&&(Rt=.38,dt=1),Mt&&(Rt*=.55),Dt.transparent=dt<.999,Dt.opacity=dt,Dt.emissiveIntensity=Rt}else if(Dt instanceof fn){const dt=Et.userData.part||"other";let Rt=.42;if(dt==="glow")Rt=xt==="major"?.048:.036;else if(dt==="shard")Rt=.36;else if(dt==="ring")Rt=xt==="major"?.48:.52;else if(dt==="satellite")Rt=.9;else if(dt==="starlit"){const ee=Et.userData.starIndex??0,H=z.userData.currentStarsLit??0,yt=ee<H;let rt=yt?.92:.1;Mt&&!yt?rt=.05:Mt&&yt&&(rt=.55),at&&yt&&(rt=1),(tt||ot)&&(rt=yt?Math.max(rt,.88):Math.max(rt,.14)),Dt.opacity=rt,Dt.transparent=!0,Dt.color.set(yt?16771240:9083576);return}let It=Rt*mt;(tt||ot)&&(dt==="glow"||dt==="shard"?It=Math.max(It,.22):It=Math.max(It,.82)),at&&(dt==="glow"||dt==="shard"||dt==="satellite")&&(It=Math.max(It,.34)),at&&dt==="ring"&&xt==="fusion"&&(It=Math.max(It,.78)),Dt.opacity=It,Dt.transparent=!0}})}for(const[F,z]of lt){const tt=z.material,ot=w.activeHyperedgeIds.has(F);tt.opacity=ot?.22:.06,tt.color=new qt(ot?14216447:Sd)}};return M(e),{dispose(){D(),cancelAnimationFrame(R),window.removeEventListener("resize",V),c.domElement.removeEventListener("pointerdown",C),c.domElement.removeEventListener("pointerup",E),c.domElement.removeEventListener("wheel",P),c.domElement.removeEventListener("touchstart",b),c.domElement.removeEventListener("touchend",E),y.removeEventListener("start",b),y.removeEventListener("end",E);for(const w of K.values())a.remove(w),w.traverse(I=>{var F;if(I instanceof Te){const z=Array.isArray(I.material)?I.material:[I.material];for(const tt of z)tt instanceof rd?(tt.map=null,tt.bumpMap=null,tt.roughnessMap=null):tt instanceof fn&&(tt.map=null),tt==null||tt.dispose();(F=I.geometry)==null||F.dispose()}});K.clear(),Y&&(a.remove(Y),Y.geometry.dispose(),Y.material.dispose(),Y=null),J&&(a.remove(J),J.geometry.dispose(),J.material.dispose(),J=null);for(const w of lt.values())k.remove(w),w.geometry.dispose(),w.material.dispose();lt.clear(),a.remove(k),a.remove(Q),Q.geometry.dispose(),Q.material.dispose(),_&&_.dispose(),m&&m.dispose(),d.dispose(),jT(),u.parentElement===n&&n.removeChild(u),y.dispose(),c.dispose(),c.domElement.parentElement&&c.domElement.parentElement.removeChild(c.domElement)},setVisualState(w){M(w)},setStarsLitByNodeId(w){ht(w),M(nt)},frameBounds:w=>{const I=[];for(const at of w){const Mt=t.layout[at];Mt&&I.push(new X(Mt.x,Mt.y,Mt.z))}if(!I.length)return;const F=new xs().setFromPoints(I),z=new X;F.getCenter(z);const tt=new X;F.getSize(tt);const ot=Math.max(tt.length()*.65,4);y.target.copy(z),l.position.copy(z.clone().add(new X(ot*.9,ot*.55,ot*.95))),y.update()},getCamera:()=>l}}function qu(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const iA={class:"galaxy-page"},sA={key:0,class:"overlay center"},rA={key:1,class:"overlay center error-panel"},oA={class:"error-msg"},aA={class:"panel-card"},lA={class:"side-title"},cA={class:"side-desc"},uA={key:0,class:"block"},fA={class:"pill-list"},hA={class:"members"},dA={class:"panel-card rec"},pA={class:"rec-head"},mA={class:"block-label"},gA={key:0,class:"rec-list"},_A={class:"rec-node"},vA={class:"rec-reason"},xA={key:1,class:"rec-empty"},yA={key:2,class:"hint-promo",role:"note"},MA=xi({__name:"GalaxyView",setup(n){const t=co(),e=Gt("loading"),i=Gt(""),s=Gt(null),r=Gt([]),o=Gt(""),a=Gt(!1),l=Gt(!0),c=Gt(null),u=rr(null),f=Gt(new Set),h=rr(null),d=Zt(()=>{if(!s.value||!u.value)return"";const R=u.value.nodes.find(v=>v.id===s.value);return(R==null?void 0:R.label)??""}),g=Zt(()=>{var Z,q;if(!s.value||!u.value)return"";const R=u.value.nodes.find(V=>V.id===s.value);if(!R)return"";if(R.type==="fusion"){const V=((Z=R.meta)==null?void 0:Z.subtitle)??"";return V?`交叉关卡 · ${V}`:"交叉学科关卡"}const v=((q=R.meta)==null?void 0:q.tagline)??"";return v?`专业入口 · ${v}`:"专业节点"}),_=Zt(()=>{if(!s.value||!u.value)return{ids:[],members:[]};const{hyperedgeIds:R,memberIds:v}=ps(s.value,u.value.hyperedges),Z=[...v].map(q=>{var V;return((V=u.value.nodes.find(st=>st.id===q))==null?void 0:V.label)??q}).filter(q=>q);return{ids:R,members:Z}}),m=Zt(()=>!s.value||!u.value?new Set:new Set(ps(s.value,u.value.hyperedges).hyperedgeIds)),p=Zt(()=>!s.value||!u.value?new Set:ps(s.value,u.value.hyperedges).memberIds),S=Zt(()=>({pathIds:f.value,selectedId:s.value,hyperMemberIds:p.value,activeHyperedgeIds:m.value}));on(S,R=>{var v;(v=h.value)==null||v.setVisualState(R)}),on(s,()=>{a.value=!1,_t(),e.value==="ready"&&A()});async function A(){try{const R=Yf(),v=await hl(R,s.value);r.value=v.suggestions??[],o.value=v.algorithm||v.note||""}catch{}}function y(){a.value=!a.value,a.value&&A()}function G(){try{const R=sessionStorage.getItem(_a);if(!R)return null;const v=JSON.parse(R);return!v.fromId||!v.toId||v.fromId===v.toId?null:v}catch{return null}}async function L(R,v,Z){const q=new Promise((V,st)=>setTimeout(()=>st(new Error(Z)),v));return Promise.race([R,q])}function D(){return typeof navigator>"u"?!1:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>1}async function U(){if(e.value="loading",i.value="",!qu()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const R=G();if(!R){t.replace({name:"select"});return}c.value=R;const Z=D()?15e3:3e4;try{const q=Yf();let V,st;try{V=await L($f(q),Z,"加载星系数据超时，请检查网络连接"),st=await L(hl(q),5e3,"加载推荐数据超时")}catch(nt){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&q!=="./mock")V=await $f("./mock"),st=await hl("./mock");else throw nt}r.value=st.suggestions??[],o.value=st.algorithm||st.note||"",u.value={nodes:V.nodes,edges:V.edges,hyperedges:V.hyperedges,layout:V.layout};const ht=Yv(u.value.edges,R.fromId,R.toId);f.value=new Set(ht??[R.fromId,R.toId]),e.value="ready"}catch(q){e.value="error",i.value=q instanceof Error?q.message:"加载失败",console.error("[GalaxyView] Bootstrap error:",q)}}function b(R){var st;if((st=h.value)==null||st.dispose(),h.value=null,!R||!u.value||e.value!=="ready")return;const v={pathIds:f.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},Z=Ru(u.value.nodes),q=ju(R,u.value,v,ht=>{s.value=ht},{ambientStarBoost:Z});h.value=q,q.setVisualState(S.value);const V=[...f.value];q.frameBounds(V.length?V:[...u.value.nodes.map(ht=>ht.id)].slice(0,6))}const E=Gt(null),P=Gt(null),O=Gt(!0),B=Gt(null),K=Gt(null);let lt=!1,Y=0,J=0,N=0,Q=0;function vt(R,v,Z){return Math.max(v,Math.min(Z,R))}function bt(){lt&&(lt=!1,window.removeEventListener("pointermove",Ot),window.removeEventListener("pointerup",bt))}function Ot(R){if(!lt||!P.value)return;const v=P.value,Z=R.clientX-Y,q=R.clientY-J,V=v.getBoundingClientRect(),st=V.width,ht=V.height;let nt=N+Z,M=Q+q;nt=vt(nt,8,window.innerWidth-st-8),M=vt(M,8,window.innerHeight-ht-8),B.value=nt,K.value=M}function Qt(R){if(R.button!==0||!P.value)return;bt(),R.preventDefault();const v=P.value.getBoundingClientRect();lt=!0,Y=R.clientX,J=R.clientY,N=v.left,Q=v.top,B.value=v.left,K.value=v.top,window.addEventListener("pointermove",Ot),window.addEventListener("pointerup",bt)}const ct=Zt(()=>{if(!(B.value==null||K.value==null))return{left:`${B.value}px`,top:`${K.value}px`,right:"auto",bottom:"auto"}});function _t(){O.value=!0,B.value=null,K.value=null,bt()}Na(async()=>{await U()}),on(e,async R=>{R==="ready"&&(await ms(),b(E.value))}),Oa(()=>{var R;bt(),(R=h.value)==null||R.dispose()});function Tt(){U()}function k(){t.push({name:"select"})}function ft(){try{sessionStorage.removeItem(_a)}catch{}Xp(),t.replace({name:"select"})}function ut(R){var v,Z;return((Z=(v=u.value)==null?void 0:v.nodes.find(q=>q.id===R))==null?void 0:Z.label)??R}function gt(){Ut(),t.push({path:"/personal"})}function Ut(){l.value=!1}function C(){const R=s.value;if(!R||!u.value)return;const v=u.value.nodes.find(Z=>Z.id===R);!v||v.type!=="fusion"||t.push({name:"personalStarlit",query:{fusionId:R,title:v.label,source:"galaxy"}})}return(R,v)=>{var Z,q;return Lt(),Ft("div",iA,[e.value==="loading"?(Lt(),Ft("div",sA,[...v[1]||(v[1]=[$("div",{class:"spinner","aria-hidden":"true"},null,-1),$("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(Lt(),Ft("div",rA,[v[2]||(v[2]=$("p",{class:"error-title"},"无法进入星系",-1)),$("p",oA,Nt(i.value),1),$("div",{class:"error-actions"},[$("button",{type:"button",class:"btn ghost",onClick:k},"返回选择"),$("button",{type:"button",class:"btn primary",onClick:Tt},"重试")]),v[3]||(v[3]=$("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(Lt(),Ft(Ae,{key:2},[$("div",{ref_key:"canvasHost",ref:E,class:"canvas-host"},null,512),$("div",{class:"top-bar"},[v[4]||(v[4]=$("div",{class:"top-left-spacer"},null,-1)),v[5]||(v[5]=$("div",{class:"top-title"},"专业星系",-1)),$("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:ft},"×")]),s.value?(Lt(),Ft("button",{key:0,type:"button",class:"side-toggle",onClick:v[0]||(v[0]=V=>O.value=!O.value)},Nt(O.value?"隐藏":"显示"),1)):Ie("",!0),s.value?tp((Lt(),Ft("aside",{key:1,ref_key:"sidePanelEl",ref:P,class:"side",style:Pa(ct.value)},[$("div",{class:"side-drag-handle",onPointerdown:Qt},"信息面板",32),$("section",aA,[v[8]||(v[8]=$("p",{class:"side-eyebrow"},"选中",-1)),$("h2",lA,Nt(d.value),1),$("p",cA,Nt(g.value),1),_.value.ids.length?(Lt(),Ft("section",uA,[v[6]||(v[6]=$("p",{class:"block-label"},"相关超边（融合域）",-1)),$("ul",fA,[(Lt(!0),Ft(Ae,null,Vi(_.value.ids,V=>(Lt(),Ft("li",{key:V,class:"pill"},Nt(V),1))),128))]),v[7]||(v[7]=$("p",{class:"block-label"},"成员节点",-1)),$("p",hA,Nt(_.value.members.join("、")),1)])):Ie("",!0),((q=(Z=u.value)==null?void 0:Z.nodes.find(V=>V.id===s.value))==null?void 0:q.type)==="fusion"?(Lt(),Ft("button",{key:1,type:"button",class:"btn primary full",onClick:C}," 去练 ")):Ie("",!0)]),$("section",dA,[$("div",pA,[$("p",mA,"推荐下一步"+Nt(o.value?`（${o.value}）`:""),1),$("button",{type:"button",class:"btn rec-toggle",onClick:y},Nt(a.value?"收起":"展开"),1)]),a.value?(Lt(),Ft(Ae,{key:0},[r.value&&r.value.length>0?(Lt(),Ft("ul",gA,[(Lt(!0),Ft(Ae,null,Vi(r.value,V=>(Lt(),Ft("li",{key:V.nodeId},[$("span",_A,Nt(ut(V.nodeId)),1),$("span",vA,Nt(V.reason),1)]))),128))])):(Lt(),Ft("div",xA,"暂无推荐信息"))],64)):Ie("",!0)])],4)),[[j_,O.value]]):l.value?(Lt(),Ft("div",yA,[$("button",{type:"button",class:"hint-dismiss","aria-label":"关闭",onClick:zi(Ut,["stop"])},"×"),v[9]||(v[9]=$("p",{class:"promo-title"},"个人专业星图",-1)),$("button",{type:"button",class:"btn promo-cta",onClick:gt},"进入个人星图")])):Ie("",!0)],64))])}}}),SA=qi(MA,[["__scopeId","data-v-3c284e53"]]),EA={class:"hub"},bA=xi({__name:"PersonalGalaxyHubView",setup(n){const t=bn(lo);if(!t)throw new Error("[PersonalGalaxyHubView] router inject failed");function e(){t.push({path:"/personal/design"})}function i(){t.push({path:"/personal/showcase"})}function s(){t.replace({path:"/galaxy"})}return(r,o)=>(Lt(),Ft("div",EA,[$("header",{class:"bar"},[$("button",{type:"button",class:"ghost",onClick:s},"← 大星图"),o[0]||(o[0]=$("div",{class:"bar-center"},[$("p",{class:"eyebrow"},"OfferCat · Galaxy"),$("h1",{class:"title"},"个人专业星图")],-1)),o[1]||(o[1]=$("span",{class:"spacer","aria-hidden":"true"},null,-1))]),$("main",{class:"main"},[o[4]||(o[4]=$("p",{class:"lead"}," 与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。 ",-1)),$("button",{type:"button",class:"card card--primary",onClick:e},[...o[2]||(o[2]=[$("span",{class:"card-kicker"},"编辑",-1),$("span",{class:"card-title"},"设计专属星图",-1),$("span",{class:"card-desc"},"添加大行星、连边、三选一岗位，保存到本机。",-1)])]),$("button",{type:"button",class:"card card--ghost",onClick:i},[...o[3]||(o[3]=[$("span",{class:"card-kicker"},"只读",-1),$("span",{class:"card-title"},"展示已保存星图",-1),$("span",{class:"card-desc"},"进入前请先在设计页保存至少一颗大行星或一条融合。",-1)])])])]))}}),TA=qi(bA,[["__scopeId","data-v-02210880"]]);function AA(){try{const n=sessionStorage.getItem(_a);if(!n)return!1;const t=JSON.parse(n);return!!(t!=null&&t.fromId&&(t!=null&&t.toId)&&t.fromId!==t.toId)}catch{return!1}}function wA(n){if(!AA()){n.replace({name:"select"});return}n.replace({name:"galaxy"})}function RA(n){n.push({name:"personalDesign"})}function CA(){try{const n=window.history.state;return n!=null&&n.back!=null&&n.back!==""}catch{return!1}}function Yu(n,t){if(CA()){n.back();return}n.replace(t)}function PA(n,t){const e=(t||"").trim().toLowerCase();if(e==="showcase"){n.replace({name:"personalShowcase"});return}if(e==="galaxy"){wA(n);return}Yu(n,{name:"personalShowcase"})}const DA={class:"personal-root"},LA={key:0,class:"loading-overlay"},IA={key:1,class:"err-banner",role:"alert"},UA={key:2,class:"save-toast"},NA={class:"control-panel"},OA={class:"tb-block"},FA={class:"major-grid"},BA=["onClick"],zA=["disabled"],kA={class:"tb-block"},HA={key:0,class:"hint"},VA={key:0,class:"tb-block fusion-strip"},GA={class:"fusion-strip-title"},WA={key:1,class:"tb-block"},XA={class:"mono"},jA={key:2,class:"tb-block muted"},qA={id:"fusion-sheet-heading",class:"fusion-sheet-title"},YA={class:"fusion-sheet-dl"},$A={class:"modal"},KA=["onClick"],ZA={class:"jt"},JA={class:"jd"},QA=xi({__name:"PersonalGalaxyView",setup(n){const t=co(),e=Gt("loading"),i=Gt(""),s=Gt(null),r=Gt(!1),o=Gt(null),a=Gt([]),l=Gt([]),c=Gt({open:!1,aId:"",bId:"",options:[]}),u=Gt(null),f=Gt(""),h=Gt(null),d=rr(null),g=Zt(()=>Kp(a.value,l.value)),_=Zt(()=>u.value?ps(u.value,g.value.hyperedges).memberIds:new Set),m=Zt(()=>u.value?new Set(ps(u.value,g.value.hyperedges).hyperedgeIds):new Set),p=Zt(()=>({pathIds:new Set,selectedId:u.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));on(p,P=>{var O;(O=d.value)==null||O.setVisualState(P)});const S=Zt(()=>u.value?l.value.find(P=>P.id===u.value)??null:null),A=Zt(()=>u.value?a.value.find(P=>P.id===u.value)??null:null);function y(){var lt;const P=h.value,O=g.value;if((lt=d.value)==null||lt.dispose(),d.value=null,!P||O.nodes.length===0)return;const B=Ru(O.nodes),K=em(l.value.map(Y=>Y.id));d.value=ju(P,O,p.value,Y=>{if(u.value=Y,!Y||!r.value||!a.value.some(vt=>vt.id===Y))return;if(!o.value){o.value=Y;return}if(o.value===Y)return;const N=a.value.find(vt=>vt.id===o.value),Q=a.value.find(vt=>vt.id===Y);!N||!Q||G(N,Q)},{ambientStarBoost:B,starsLitByNodeId:K,maxStarsPerFusion:vi}),d.value.setVisualState(p.value),d.value.frameBounds(O.nodes.map(Y=>Y.id))}on(g,async()=>{e.value==="ready"&&(await ms(),y())});async function G(P,O){try{const B=await wu(P.majorId,O.majorId);if(B.length===0){i.value=`《具体专业》表中暂无「${P.label}×${O.label}」组合的三岗数据，请换一对学科。`,o.value=null;return}c.value={open:!0,aId:P.id,bId:O.id,options:B}}catch(B){i.value=B instanceof Error?B.message:"加载岗位表失败"}finally{o.value=null}}function L(P){const{aId:O,bId:B,options:K}=c.value,lt=`f_${Date.now()}`,Y=K.findIndex(Q=>Q.idx===P.idx),J={id:lt,title:P.title,majorA:O,majorB:B,row:P,jobSlot:Y>=0?Y:void 0},N=Wi(J,a.value);l.value.push({...J,packKey:N??void 0}),c.value.open=!1,c.value.options=[],r.value=!1,u.value=lt}function D(){c.value.open=!1,c.value.options=[],o.value=null}function U(){if(!s.value)return;const P=qr.find(B=>B.id===s.value);if(!P)return;const O=`m_${s.value}_${Date.now()}`;a.value.push({id:O,majorId:P.id,label:P.label}),s.value=null}async function b(){const P=nx(a.value,l.value);Zp(P),(await sx(P)).ok?f.value="已保存到本地，并已同步服务端。":uo()?f.value="已保存到本地（同步服务端失败，请稍后重试）。":Ms()?f.value="已保存到本机（星图 API 未注入，未同步云端）。":f.value="已保存到本机（未识别登录用户，未同步云端）。",window.setTimeout(()=>{f.value=""},3200)}function E(){Yu(t,{name:"personalHub"})}return Na(async()=>{var O;if(!qu()){e.value="error",i.value="当前环境不支持 WebGL";return}try{await Va(),i.value=""}catch(B){i.value=B instanceof Error&&/failed to fetch/i.test(B.message)?"岗位表加载失败（请重新安装含最新星图资源的 APK）":B instanceof Error?B.message:"岗位表加载失败"}const P=await eo();(O=P==null?void 0:P.majors)!=null&&O.length&&(a.value=[...P.majors],l.value=[...P.fusions]),e.value="ready",await ms(),y()}),Oa(()=>{var P;(P=d.value)==null||P.dispose(),d.value=null}),(P,O)=>(Lt(),Ft("div",DA,[e.value==="loading"?(Lt(),Ft("div",LA,"加载岗位数据…")):Ie("",!0),i.value?(Lt(),Ft("div",IA,Nt(i.value),1)):Ie("",!0),$("header",{class:"top-bar"},[$("button",{type:"button",class:"back-btn",onClick:E},"返回"),O[4]||(O[4]=$("div",{class:"top-titles"},[$("h1",{class:"title"},"设计专属星图"),$("p",{class:"subtitle"},"与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。")],-1)),$("button",{type:"button",class:"save-btn",onClick:b},"保存星系")]),f.value?(Lt(),Ft("p",UA,Nt(f.value),1)):Ie("",!0),$("div",{ref_key:"canvasHost",ref:h,class:"canvas-wrap"},null,512),$("div",NA,[$("section",OA,[O[5]||(O[5]=$("p",{class:"label"},"① 添加大行星（10 学科）",-1)),$("div",FA,[(Lt(!0),Ft(Ae,null,Vi(pn(qr),B=>(Lt(),Ft("button",{key:B.id,type:"button",class:Hi(["chip",{active:s.value===B.id}]),onClick:K=>s.value=B.id},Nt(B.label),11,BA))),128))]),$("button",{type:"button",class:"primary full",disabled:!s.value,onClick:U}," 放入星空 ",8,zA)]),$("section",kA,[O[6]||(O[6]=$("p",{class:"label"},"② 连边并生成交叉岗位",-1)),$("button",{type:"button",class:Hi(["secondary full",{on:r.value}]),onClick:O[0]||(O[0]=B=>{r.value=!r.value,o.value=null})},Nt(r.value?"连边模式已开 · 依次点两颗大行星":"开启连边模式"),3),r.value?(Lt(),Ft("p",HA,"在星空中先点一颗，再点另一颗；有数据则弹出三选一。")):Ie("",!0)]),S.value?(Lt(),Ft("section",VA,[O[7]||(O[7]=$("p",{class:"label"},"当前小行星",-1)),$("p",GA,Nt(S.value.title),1),O[8]||(O[8]=$("p",{class:"hint fusion-strip-hint"},"四象详情见下方弹层；点击星空空白处可取消选中。",-1))])):A.value?(Lt(),Ft("section",WA,[O[9]||(O[9]=$("p",{class:"label"},"当前选中",-1)),$("p",XA,"大行星 · "+Nt(A.value.label),1)])):(Lt(),Ft("section",jA,[...O[10]||(O[10]=[$("p",{class:"hint"},"提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。",-1)])]))]),(Lt(),gs(Zr,{to:"body"},[S.value?(Lt(),Ft("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"fusion-sheet-heading",onClick:O[3]||(O[3]=zi(B=>u.value=null,["self"]))},[$("div",{class:"fusion-sheet",onClick:O[2]||(O[2]=zi(()=>{},["stop"]))},[O[15]||(O[15]=$("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),$("h3",qA,Nt(S.value.title),1),O[16]||(O[16]=$("p",{class:"fusion-sheet-sub"},"四象属性（岗位表 · 完整）",-1)),$("dl",YA,[O[11]||(O[11]=$("dt",null,"热度/年薪",-1)),$("dd",null,Nt(S.value.row.heat)+" · 初级年薪 "+Nt(S.value.row.salaryJunior)+" · 中级年薪 "+Nt(S.value.row.salaryMid),1),O[12]||(O[12]=$("dt",null,"强度/竞争",-1)),$("dd",null,Nt(S.value.row.workIntensity)+"级 · "+Nt(S.value.row.competition),1),O[13]||(O[13]=$("dt",null,"学历门槛",-1)),$("dd",null,Nt(S.value.row.education),1),O[14]||(O[14]=$("dt",null,"学科技能",-1)),$("dd",null,Nt(S.value.row.skills),1)]),$("button",{type:"button",class:"fusion-sheet-close",onClick:O[1]||(O[1]=B=>u.value=null)},"收起")])])):Ie("",!0)])),(Lt(),gs(Zr,{to:"body"},[c.value.open?(Lt(),Ft("div",{key:0,class:"modal-mask",onClick:zi(D,["self"])},[$("div",$A,[O[17]||(O[17]=$("h2",null,"三选一 · 确立小行星",-1)),O[18]||(O[18]=$("p",{class:"modal-sub"},"数据来源：《具体专业》岗位表（同组合前三条）",-1)),$("ul",null,[(Lt(!0),Ft(Ae,null,Vi(c.value.options,(B,K)=>(Lt(),Ft("li",{key:K},[$("button",{type:"button",class:"job-btn",onClick:lt=>L(B)},[$("span",ZA,Nt(B.title),1),$("span",JA,Nt(B.heat)+" · 中级年薪 "+Nt(B.salaryMid)+" · 竞争 "+Nt(B.competition),1)],8,KA)]))),128))]),$("button",{type:"button",class:"ghost full",onClick:D},"取消")])])):Ie("",!0)]))]))}}),t1=qi(QA,[["__scopeId","data-v-594cd0a7"]]),Hm="offercat_starlit_leaderboard_v1",Vm="offercat_starlit_self_name_v1";function jl(){return{v:1,entries:[]}}function e1(){try{const n=localStorage.getItem(Hm);if(!n)return jl();const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.entries)?jl():t}catch{return jl()}}function n1(n){try{localStorage.setItem(Hm,JSON.stringify(n))}catch{}}function ru(){var n;try{const t=(n=localStorage.getItem(Vm))==null?void 0:n.trim();if(t)return t}catch{}return"我"}function i1(n){try{localStorage.setItem(Vm,n.trim().slice(0,20)||"我")}catch{}}async function s1(n,t){const e=n??Ms()??0;if(e>0)try{const{fetchStarlitLeaderboard:i}=await ys(async()=>{const{fetchStarlitLeaderboard:r}=await import("./galaxy-chunk-CPt_plr0.js");return{fetchStarlitLeaderboard:r}},[],import.meta.url);return(await i(e,t)).rows.map(r=>({id:r.self?"__self__":`u_${r.userId}`,displayName:r.displayName,totalStars:r.totalStars,updatedAt:Date.now(),isSelf:r.self}))}catch{}return ou()}function ou(){const n=ox(),t=ru(),e="__self__",i=Date.now();let r=e1().entries.filter(l=>l.id!==e);r.length||(r=[{id:"demo_1",displayName:"星尘旅人",totalStars:Math.max(0,n-12),updatedAt:i-864e5},{id:"demo_2",displayName:"交叉探索者",totalStars:Math.max(0,n-28),updatedAt:i-1728e5},{id:"demo_3",displayName:"轨道观测员",totalStars:Math.max(0,n-45),updatedAt:i-2592e5}]);const o={id:e,displayName:t,totalStars:n,updatedAt:i,isSelf:!0},a=[...r.filter(l=>l.id!==e),o];return a.sort((l,c)=>c.totalStars-l.totalStars||l.displayName.localeCompare(c.displayName,"zh")),n1({v:1,entries:a.map(({isSelf:l,...c})=>c)}),a.map(l=>({...l,isSelf:l.id===e}))}const r1={class:"lb-head"},o1={class:"lb-sub"},a1={class:"lb-name-row"},l1={class:"lb-hint"},c1={class:"lb-list"},u1={class:"lb-rank"},f1={class:"lb-name"},h1={class:"lb-stars"},d1=xi({__name:"StarlitLeaderboardPanel",props:{open:{type:Boolean},fusionIds:{},userId:{},packKeys:{}},emits:["close"],setup(n,{emit:t}){const e=n,i=t,s=Gt(ou()),r=Gt(ru()),o=Zt(()=>tm(e.fusionIds));async function a(){const c=e.userId??0;s.value=c>0?await s1(c,e.packKeys):ou(),r.value=ru()}function l(){i1(r.value),a()}return on(()=>e.open,c=>{c&&a()}),on(()=>e.fusionIds,()=>{e.open&&a()},{deep:!0}),(c,u)=>(Lt(),gs(Zr,{to:"body"},[n.open?(Lt(),Ft("div",{key:0,class:"lb-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"starlit-lb-title",onClick:u[3]||(u[3]=zi(f=>i("close"),["self"]))},[$("div",{class:"lb-card",onClick:u[2]||(u[2]=zi(()=>{},["stop"]))},[$("header",r1,[$("div",null,[u[4]||(u[4]=$("h2",{id:"starlit-lb-title",class:"lb-title"},"点亮排行榜",-1)),$("p",o1,"按已点亮星数排序 · 本星系合计 "+Nt(o.value)+" 星",1)]),$("button",{type:"button",class:"lb-close","aria-label":"关闭",onClick:u[0]||(u[0]=f=>i("close"))},"×")]),$("div",a1,[u[5]||(u[5]=$("label",{class:"lb-name-label",for:"lb-self-name"},"我的昵称",-1)),tp($("input",{id:"lb-self-name","onUpdate:modelValue":u[1]||(u[1]=f=>r.value=f),class:"lb-name-input",maxlength:"20",placeholder:"展示在榜上",onChange:l,onKeydown:d0(l,["enter"])},null,544),[[c0,r.value]])]),$("p",l1," 总星数 = 各小行星点亮之和（每颗最多 "+Nt(pn(vi))+"）。已配置网关时从服务端拉取全站排行。 ",1),$("ol",c1,[(Lt(!0),Ft(Ae,null,Vi(s.value,(f,h)=>(Lt(),Ft("li",{key:f.id,class:Hi(["lb-row",{self:f.isSelf}])},[$("span",u1,Nt(h+1),1),$("span",f1,Nt(f.displayName),1),$("span",h1,Nt(f.totalStars)+" 星",1)],2))),128))])])])):Ie("",!0)]))}}),p1=qi(d1,[["__scopeId","data-v-d6ee7af2"]]),m1={class:"showcase-root"},g1={class:"bar"},_1={class:"mid"},v1={key:0,class:"sub"},x1={key:1,class:"sub muted"},y1={key:0,class:"overlay"},M1={key:1,class:"overlay err"},S1={key:2,class:"overlay empty"},E1={class:"lb-fab-sub"},b1={id:"showcase-fusion-title",class:"fusion-sheet-title"},T1={class:"fusion-sheet-dl"},A1={class:"starlit-hint"},w1=xi({__name:"PersonalGalaxyShowcaseView",setup(n){const t=co(),e=Gp(),i=Gt("loading"),s=Gt(""),r=rr(null),o=Gt(null),a=Gt(!1),l=Gt(0),c=Gt([]),u=Zt(()=>Ms()),f=Zt(()=>!0),h=Gt(null),d=rr(null),g=Zt(()=>{const N=r.value;return N?Kp(N.majors,N.fusions):null}),_=Zt(()=>!o.value||!g.value?new Set:ps(o.value,g.value.hyperedges).memberIds),m=Zt(()=>!o.value||!g.value?new Set:new Set(ps(o.value,g.value.hyperedges).hyperedgeIds)),p=Zt(()=>({pathIds:new Set,selectedId:o.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));on(p,N=>{var Q;(Q=d.value)==null||Q.setVisualState(N)});const S=Zt(()=>!o.value||!r.value?null:r.value.fusions.find(N=>N.id===o.value)??null),A=Zt(()=>{var N;return!o.value||!g.value?"":((N=g.value.nodes.find(Q=>Q.id===o.value))==null?void 0:N.label)??""}),y=Zt(()=>{var N;return l.value,((N=r.value)==null?void 0:N.fusions.map(Q=>Q.id))??[]}),G=Zt(()=>(l.value,tm(y.value)));async function L(){var Q;P();const N=((Q=r.value)==null?void 0:Q.fusions)??[];c.value=N.map(vt=>{var bt;return Wi(vt,(bt=r.value)==null?void 0:bt.majors)}).filter(vt=>!!vt),a.value=!0}function D(N){(N.key===null||N.key==="offercat_personal_starlit_v1")&&P()}function U(){return em(y.value)}function b(){var N;(N=d.value)==null||N.setStarsLitByNodeId(U())}function E(){var bt;const N=h.value,Q=g.value;if((bt=d.value)==null||bt.dispose(),d.value=null,!N||!Q||Q.nodes.length===0)return;const vt=Ru(Q.nodes);d.value=ju(N,Q,p.value,Ot=>{o.value=Ot},{ambientStarBoost:vt,starsLitByNodeId:U(),maxStarsPerFusion:vi}),d.value.setVisualState(p.value),d.value.frameBounds(Q.nodes.map(Ot=>Ot.id))}function P(){if(l.value+=1,i.value==="ready"&&d.value){b();return}i.value==="ready"&&E()}function O(){RA(t)}function B(){Yu(t,{name:"personalHub"})}function K(){o.value=null}function lt(){var vt;const N=S.value;if(!N)return;const Q=N.packKey??Wi(N,(vt=r.value)==null?void 0:vt.majors)??"";t.push({name:"personalStarlit",query:{fusionId:N.id,title:N.title,source:"showcase",...Q?{packKey:Q}:{}}})}on(()=>e.fullPath,async()=>{var N,Q;e.name==="personalShowcase"&&(P(),i.value==="ready"&&(r.value=await eo(),(Q=(N=r.value)==null?void 0:N.fusions)!=null&&Q.length&&await pc(r.value.fusions),P(),await ms(),E()))});const Y=()=>L();function J(){P()}return Na(async()=>{var Q;if(window.addEventListener("storage",D),window.addEventListener(th,J),window.addEventListener("galaxy-open-leaderboard",Y),window.__GALAXY_OPEN_LEADERBOARD__=()=>window.dispatchEvent(new CustomEvent("galaxy-open-leaderboard")),ga("personalShowcase"),!qu()){i.value="error",s.value="当前环境不支持 WebGL";return}const N=await eo();if(r.value=N,(Q=N==null?void 0:N.fusions)!=null&&Q.length&&await pc(N.fusions),!N||N.majors.length===0&&N.fusions.length===0){i.value="empty";return}i.value="ready",await ms(),P(),E()}),Oa(()=>{var N;window.removeEventListener("storage",D),window.removeEventListener(th,J),window.removeEventListener("galaxy-open-leaderboard",Y),delete window.__GALAXY_OPEN_LEADERBOARD__,ga(e.name),(N=d.value)==null||N.dispose(),d.value=null}),(N,Q)=>(Lt(),Ft("div",m1,[$("header",g1,[$("button",{type:"button",class:"ghost",onClick:B},"返回"),$("div",_1,[Q[2]||(Q[2]=$("h1",{class:"title"},"展示星图",-1)),A.value?(Lt(),Ft("p",v1,Nt(A.value),1)):(Lt(),Ft("p",x1,"点击小行星查看四象与点亮星辰"))])]),i.value==="loading"?(Lt(),Ft("div",y1,"加载…")):i.value==="error"?(Lt(),Ft("div",M1,Nt(s.value),1)):i.value==="empty"?(Lt(),Ft("div",S1,[Q[3]||(Q[3]=$("p",null,"还没有已保存的个人星系。",-1)),$("button",{type:"button",class:"cta",onClick:O},"返回去设计")])):(Lt(),Ft("div",{key:3,ref_key:"canvasHost",ref:h,class:"canvas"},null,512)),(Lt(),gs(Zr,{to:"body"},[i.value==="ready"&&f.value?(Lt(),Ft("button",{key:0,type:"button",class:"lb-fab","aria-label":"打开点亮排行榜",onClick:L},[Q[4]||(Q[4]=$("span",{class:"lb-fab-title"},"排行榜",-1)),$("span",E1,Nt(G.value)+" 星",1)])):Ie("",!0)])),(Lt(),gs(Zr,{to:"body"},[S.value?(Lt(),Ft("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"showcase-fusion-title",onClick:zi(K,["self"])},[$("div",{class:"fusion-sheet",onClick:Q[0]||(Q[0]=zi(()=>{},["stop"]))},[Q[10]||(Q[10]=$("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),$("h2",b1,Nt(S.value.title),1),Q[11]||(Q[11]=$("p",{class:"fusion-sheet-sub"},"四象属性 · 已保存数据",-1)),$("dl",T1,[Q[5]||(Q[5]=$("dt",null,"热度/年薪",-1)),$("dd",null,Nt(S.value.row.heat)+" · 初级年薪 "+Nt(S.value.row.salaryJunior)+" · 中级年薪 "+Nt(S.value.row.salaryMid),1),Q[6]||(Q[6]=$("dt",null,"强度/竞争",-1)),$("dd",null,Nt(S.value.row.workIntensity)+"级 · "+Nt(S.value.row.competition),1),Q[7]||(Q[7]=$("dt",null,"学历门槛",-1)),$("dd",null,Nt(S.value.row.education),1),Q[8]||(Q[8]=$("dt",null,"学科技能",-1)),$("dd",null,Nt(S.value.row.skills),1)]),$("p",A1,[Q[9]||(Q[9]=sc(" 已点亮 ",-1)),$("strong",null,Nt(pn(gr)(S.value.id)),1),sc(" / "+Nt(pn(vi))+" 颗星（本图合计 "+Nt(G.value)+" 星）；答题正确可继续点亮。 ",1)]),$("button",{type:"button",class:"fusion-sheet-primary",onClick:lt},"点亮星辰 · 去答题"),$("button",{type:"button",class:"fusion-sheet-close",onClick:K},"收起")])])):Ie("",!0)])),Ze(p1,{open:a.value,"fusion-ids":y.value,"user-id":u.value??void 0,"pack-keys":c.value,onClose:Q[1]||(Q[1]=vt=>a.value=!1)},null,8,["open","fusion-ids","user-id","pack-keys"])]))}}),R1=qi(w1,[["__scopeId","data-v-5404b290"]]),C1={class:"quiz-root"},P1={class:"bar"},D1={class:"mid"},L1={class:"sub"},I1={key:0,class:"sub api-tag"},U1={key:0,class:"empty"},N1={class:"star-strip","aria-label":"已点亮星数"},O1={class:"star-label"},F1={class:"star-dots",role:"list"},B1={key:0,class:"loading"},z1={key:1,class:"load-err"},k1={key:2,class:"done"},H1={key:3,class:"q-card"},V1={class:"q-text"},G1={class:"q-opts"},W1=["onClick"],X1={key:4,class:"toast",role:"status"},j1={class:"foot"},q1=xi({__name:"PersonalStarlitQuizView",setup(n){const t=Gp(),e=co(),i=Zt(()=>String(t.query.fusionId||"")),s=Zt(()=>{const U=t.query.packKey;return typeof U=="string"&&U.trim()?U.trim():""}),r=Zt(()=>{const U=t.query.title;if(typeof U=="string"&&U.trim())return U;const b=i.value;if(!b)return"小行星";const E=Ga(),P=E==null?void 0:E.fusions.find(O=>O.id===b);return(P==null?void 0:P.title)??"小行星"});function o(U){const b=[],E=["正确","错误","视场景而定","以上皆非"];for(let P=0;P<Qf;P++){const O=P%4,B=`【${U}】第 ${P+1} / ${Qf} 题（占位）：与交叉岗位相关的表述，选项「${E[O]}」为本题预设答案。`;b.push({idx:P,text:B,options:[...E],correct:O})}return b}const a=Gt([]),l=Gt(0),c=Gt(0),u=Gt(""),f=Gt(!1),h=Gt(!1),d=Gt("mock"),g=Gt(""),_=Gt(""),m=Zt(()=>{const U=a.value.length;return U>0?Math.min(vi,U):vi});async function p(U,b){var B;let E=Wi(U,b);if(E)return E;const P=Fi(U.majorA,b),O=Fi(U.majorB,b);if(!P||!O)return null;try{const K=await wu(P,O);if(!K.length)return null;let lt=U.jobSlot??0,Y=U.row;if((B=U.title)!=null&&B.trim()){const J=K.findIndex(N=>N.title===U.title);J>=0&&(lt=J,Y=K[J])}return Y||(Y=K[lt]??K[0]),E=Wi({...U,row:Y,jobSlot:lt},b),E}catch{return null}}async function S(U,b){var E;h.value=!0,g.value="",_.value="",a.value=[];try{const P=await eo();if(!(Ha().length>0))g.value="未注入星图 API（请从 App 星图入口进入并确认网关地址）";else if(!((E=P==null?void 0:P.fusions)!=null&&E.length))g.value="未找到个人星图数据，请先在「设计专属星图」保存后再答题";else{const B=P.fusions.find(K=>K.id===U);if(!B)g.value="当前小行星不在已保存星图中，请返回展示页重试";else{const K=s.value||await p(B,P.majors)||"";if(K){_.value=K;const{fetchStarlitQuestions:lt}=await ys(async()=>{const{fetchStarlitQuestions:J}=await import("./galaxy-chunk-CPt_plr0.js");return{fetchStarlitQuestions:J}},[],import.meta.url),Y=await lt(K);if(Y.length>0){a.value=Y.map(N=>({idx:N.questionNo-1,text:N.stem,options:N.options,correct:N.correctIndex})),d.value="api";const J=m.value;c.value>J&&(c.value=J);return}g.value=`题库包「${K}」暂无题目，请确认已导入 starlit_question_bank.sql`}else{const lt=Fi(B.majorA,P.majors),Y=Fi(B.majorB,P.majors);g.value=!lt||!Y?"无法识别两颗大行星学科，请回设计页重新放入星空并连边保存":"无法解析本题库 pack_key，请重新连边选择岗位后保存星系"}}}}catch(P){const O=P instanceof Error?P.message:"加载题库失败";g.value=_.value?`${O}（pack_key: ${_.value}）`:O}finally{a.value.length||(a.value=o(b),d.value="mock"),h.value=!1}}on([i,r],async([U])=>{var E;if(!U)return;const b=await eo();(E=b==null?void 0:b.fusions)!=null&&E.length&&await pc(b.fusions),c.value=gr(U),l.value=0,f.value=!1,await S(U,r.value)},{immediate:!0});const A=Zt(()=>a.value[l.value]??null);function y(U){u.value=U,window.setTimeout(()=>{u.value=""},1400)}function G(U){if(!i.value||f.value||!A.value)return;const b=A.value;if(U===b.correct){if(c.value=ax(i.value),y("点亮 +1 星"),l.value>=a.value.length-1||c.value>=m.value){f.value=!0;return}l.value+=1}else y("再想想看")}function L(){const U=typeof t.query.source=="string"?t.query.source:"showcase";PA(e,U)}function D(){if(d.value==="api"){y("当前已是服务端题库");return}y(g.value||"题库未接通，请检查网关与 SQL 导入")}return(U,b)=>(Lt(),Ft("div",C1,[$("header",P1,[$("button",{type:"button",class:"ghost",onClick:L},"← 退出"),$("div",D1,[b[0]||(b[0]=$("h1",{class:"title"},"点亮星辰",-1)),$("p",L1,Nt(r.value),1),d.value==="api"?(Lt(),Ft("p",I1,"题库来自服务端")):Ie("",!0)]),b[1]||(b[1]=$("span",{class:"spacer"},null,-1))]),i.value?(Lt(),Ft(Ae,{key:1},[$("section",N1,[$("div",O1,"已点亮 "+Nt(c.value)+" / "+Nt(m.value)+" 星",1),$("div",F1,[(Lt(!0),Ft(Ae,null,Vi(m.value,E=>(Lt(),Ft("span",{key:E,class:Hi(["dot",{on:E<=c.value}]),role:"listitem"},null,2))),128))])]),h.value?(Lt(),Ft("div",B1,"加载题目…")):g.value&&d.value==="mock"?(Lt(),Ft("p",z1,Nt(g.value),1)):f.value?(Lt(),Ft("section",k1,[b[3]||(b[3]=$("p",null,"本套题目已完成或已达星数上限。",-1)),$("button",{type:"button",class:"cta",onClick:L},"返回展示星图")])):A.value?(Lt(),Ft("section",H1,[$("p",V1,Nt(A.value.text),1),$("div",G1,[(Lt(!0),Ft(Ae,null,Vi(A.value.options,(E,P)=>(Lt(),Ft("button",{key:P,type:"button",class:"q-opt",onClick:O=>G(P)},Nt(String.fromCharCode(65+P))+". "+Nt(E),9,W1))),128))])])):Ie("",!0),u.value?(Lt(),Ft("p",X1,Nt(u.value),1)):Ie("",!0),$("footer",j1,[$("button",{type:"button",class:"ghost wide",onClick:D},Nt(d.value==="api"?"题库已接通":"题库未接通 · 查看原因"),1)])],64)):(Lt(),Ft("div",U1,[b[2]||(b[2]=$("p",null,"缺少小行星参数。",-1)),$("button",{type:"button",class:"cta",onClick:L},"退出")]))]))}}),Y1=qi(q1,[["__scopeId","data-v-59a04444"]]),$1=ov(void 0),ba=Rv({history:$1,routes:[{path:"/",name:"select",component:Wv},{path:"/galaxy",name:"galaxy",component:SA},{path:"/personal/design",name:"personalDesign",component:t1},{path:"/personal/showcase",name:"personalShowcase",component:R1},{path:"/personal/starlit",name:"personalStarlit",component:Y1},{path:"/personal",name:"personalHub",component:TA},{path:"/personal-galaxy",redirect:{name:"personalHub"}}]});ba.afterEach(n=>{ga(n.name)});ba.isReady().then(()=>{ga(ba.currentRoute.value.name)});Va().catch(()=>{});g0(M0).use(ba).mount("#app");export{Ha as a,jp as g};
