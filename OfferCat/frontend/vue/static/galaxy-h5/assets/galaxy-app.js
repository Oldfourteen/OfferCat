(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function oc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const ae={},ys=[],Nn=()=>{},ff=()=>!1,No=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Oo=n=>n.startsWith("onUpdate:"),Pe=Object.assign,ac=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Tp=Object.prototype.hasOwnProperty,ne=(n,t)=>Tp.call(n,t),Ht=Array.isArray,Es=n=>Ar(n)==="[object Map]",df=n=>Ar(n)==="[object Set]",Zc=n=>Ar(n)==="[object Date]",Gt=n=>typeof n=="function",ge=n=>typeof n=="string",Fn=n=>typeof n=="symbol",re=n=>n!==null&&typeof n=="object",pf=n=>(re(n)||Gt(n))&&Gt(n.then)&&Gt(n.catch),mf=Object.prototype.toString,Ar=n=>mf.call(n),Ap=n=>Ar(n).slice(8,-1),gf=n=>Ar(n)==="[object Object]",lc=n=>ge(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,lr=oc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Fo=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},wp=/-\w/g,qe=Fo(n=>n.replace(wp,t=>t.slice(1).toUpperCase())),Rp=/\B([A-Z])/g,Ki=Fo(n=>n.replace(Rp,"-$1").toLowerCase()),Bo=Fo(n=>n.charAt(0).toUpperCase()+n.slice(1)),ia=Fo(n=>n?`on${Bo(n)}`:""),In=(n,t)=>!Object.is(n,t),sa=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},_f=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Cp=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let Jc;const zo=()=>Jc||(Jc=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ho(n){if(Ht(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=ge(i)?Ip(i):Ho(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(ge(n)||re(n))return n}const Pp=/;(?![^(]*\))/g,Dp=/:([^]+)/,Lp=/\/\*[^]*?\*\//g;function Ip(n){const t={};return n.replace(Lp,"").split(Pp).forEach(e=>{if(e){const i=e.split(Dp);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Vo(n){let t="";if(ge(n))t=n;else if(Ht(n))for(let e=0;e<n.length;e++){const i=Vo(n[e]);i&&(t+=i+" ")}else if(re(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Up="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Np=oc(Up);function vf(n){return!!n||n===""}function Op(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=cc(n[i],t[i]);return e}function cc(n,t){if(n===t)return!0;let e=Zc(n),i=Zc(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=Fn(n),i=Fn(t),e||i)return n===t;if(e=Ht(n),i=Ht(t),e||i)return e&&i?Op(n,t):!1;if(e=re(n),i=re(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!cc(n[o],t[o]))return!1}}return String(n)===String(t)}const xf=n=>!!(n&&n.__v_isRef===!0),Ne=n=>ge(n)?n:n==null?"":Ht(n)||re(n)&&(n.toString===mf||!Gt(n.toString))?xf(n)?Ne(n.value):JSON.stringify(n,Mf,2):String(n),Mf=(n,t)=>xf(t)?Mf(n,t.value):Es(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[ra(i,r)+" =>"]=s,e),{})}:df(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>ra(e))}:Fn(t)?ra(t):re(t)&&!Ht(t)&&!gf(t)?String(t):t,ra=(n,t="")=>{var e;return Fn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ce;class Fp{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Ce&&(Ce.active?(this.parent=Ce,this.index=(Ce.scopes||(Ce.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Ce;try{return Ce=this,t()}finally{Ce=e}}}on(){++this._on===1&&(this.prevScope=Ce,Ce=this)}off(){if(this._on>0&&--this._on===0){if(Ce===this)Ce=this.prevScope;else{let t=Ce;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Bp(){return Ce}let ue;const oa=new WeakSet;class Sf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ce&&(Ce.active?Ce.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,oa.has(this)&&(oa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ef(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Qc(this),bf(this);const t=ue,e=En;ue=this,En=!0;try{return this.fn()}finally{Tf(this),ue=t,En=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)fc(t);this.deps=this.depsTail=void 0,Qc(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?oa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ja(this)&&this.run()}get dirty(){return Ja(this)}}let yf=0,cr,ur;function Ef(n,t=!1){if(n.flags|=8,t){n.next=ur,ur=n;return}n.next=cr,cr=n}function uc(){yf++}function hc(){if(--yf>0)return;if(ur){let t=ur;for(ur=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;cr;){let t=cr;for(cr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function bf(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Tf(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),fc(i),zp(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Ja(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Af(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function Af(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===_r)||(n.globalVersion=_r,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Ja(n))))return;n.flags|=2;const t=n.dep,e=ue,i=En;ue=n,En=!0;try{bf(n);const s=n.fn(n._value);(t.version===0||In(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ue=e,En=i,Tf(n),n.flags&=-3}}function fc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)fc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function zp(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let En=!0;const wf=[];function ai(){wf.push(En),En=!1}function li(){const n=wf.pop();En=n===void 0?!0:n}function Qc(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ue;ue=void 0;try{t()}finally{ue=e}}}let _r=0;class Hp{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class dc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ue||!En||ue===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ue)e=this.activeLink=new Hp(ue,this),ue.deps?(e.prevDep=ue.depsTail,ue.depsTail.nextDep=e,ue.depsTail=e):ue.deps=ue.depsTail=e,Rf(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ue.depsTail,e.nextDep=void 0,ue.depsTail.nextDep=e,ue.depsTail=e,ue.deps===e&&(ue.deps=i)}return e}trigger(t){this.version++,_r++,this.notify(t)}notify(t){uc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{hc()}}}function Rf(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)Rf(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const Qa=new WeakMap,ki=Symbol(""),tl=Symbol(""),vr=Symbol("");function Oe(n,t,e){if(En&&ue){let i=Qa.get(n);i||Qa.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new dc),s.map=i,s.key=e),s.track()}}function Qn(n,t,e,i,s,r){const o=Qa.get(n);if(!o){_r++;return}const a=l=>{l&&l.trigger()};if(uc(),t==="clear")o.forEach(a);else{const l=Ht(n),c=l&&lc(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===vr||!Fn(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(vr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(ki)),Es(n)&&a(o.get(tl)));break;case"delete":l||(a(o.get(ki)),Es(n)&&a(o.get(tl)));break;case"set":Es(n)&&a(o.get(ki));break}}hc()}function Qi(n){const t=ee(n);return t===n?t:(Oe(t,"iterate",vr),dn(n)?t:t.map(Tn))}function Go(n){return Oe(n=ee(n),"iterate",vr),n}function Pn(n,t){return ci(n)?Ds(Wi(n)?Tn(t):t):Tn(t)}const Vp={__proto__:null,[Symbol.iterator](){return aa(this,Symbol.iterator,n=>Pn(this,n))},concat(...n){return Qi(this).concat(...n.map(t=>Ht(t)?Qi(t):t))},entries(){return aa(this,"entries",n=>(n[1]=Pn(this,n[1]),n))},every(n,t){return kn(this,"every",n,t,void 0,arguments)},filter(n,t){return kn(this,"filter",n,t,e=>e.map(i=>Pn(this,i)),arguments)},find(n,t){return kn(this,"find",n,t,e=>Pn(this,e),arguments)},findIndex(n,t){return kn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return kn(this,"findLast",n,t,e=>Pn(this,e),arguments)},findLastIndex(n,t){return kn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return kn(this,"forEach",n,t,void 0,arguments)},includes(...n){return la(this,"includes",n)},indexOf(...n){return la(this,"indexOf",n)},join(n){return Qi(this).join(n)},lastIndexOf(...n){return la(this,"lastIndexOf",n)},map(n,t){return kn(this,"map",n,t,void 0,arguments)},pop(){return js(this,"pop")},push(...n){return js(this,"push",n)},reduce(n,...t){return tu(this,"reduce",n,t)},reduceRight(n,...t){return tu(this,"reduceRight",n,t)},shift(){return js(this,"shift")},some(n,t){return kn(this,"some",n,t,void 0,arguments)},splice(...n){return js(this,"splice",n)},toReversed(){return Qi(this).toReversed()},toSorted(n){return Qi(this).toSorted(n)},toSpliced(...n){return Qi(this).toSpliced(...n)},unshift(...n){return js(this,"unshift",n)},values(){return aa(this,"values",n=>Pn(this,n))}};function aa(n,t,e){const i=Go(n),s=i[t]();return i!==n&&!dn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const Gp=Array.prototype;function kn(n,t,e,i,s,r){const o=Go(n),a=o!==n&&!dn(n),l=o[t];if(l!==Gp[t]){const h=l.apply(n,r);return a?Tn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,Pn(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function tu(n,t,e,i){const s=Go(n),r=s!==n&&!dn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=Pn(n,c)),e.call(this,c,Pn(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?Pn(n,l):l}function la(n,t,e){const i=ee(n);Oe(i,"iterate",vr);const s=i[t](...e);return(s===-1||s===!1)&&gc(e[0])?(e[0]=ee(e[0]),i[t](...e)):s}function js(n,t,e=[]){ai(),uc();const i=ee(n)[t].apply(n,e);return hc(),li(),i}const kp=oc("__proto__,__v_isRef,__isVue"),Cf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Fn));function Wp(n){Fn(n)||(n=String(n));const t=ee(this);return Oe(t,"has",n),t.hasOwnProperty(n)}class Pf{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?tm:Uf:r?If:Lf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Ht(t);if(!s){let l;if(o&&(l=Vp[e]))return l;if(e==="hasOwnProperty")return Wp}const a=Reflect.get(t,e,ze(t)?t:i);if((Fn(e)?Cf.has(e):kp(e))||(s||Oe(t,"get",e),r))return a;if(ze(a)){const l=o&&lc(e)?a:a.value;return s&&re(l)?nl(l):l}return re(a)?s?nl(a):ko(a):a}}class Df extends Pf{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Ht(t)&&lc(e);if(!this._isShallow){const c=ci(r);if(!dn(i)&&!ci(i)&&(r=ee(r),i=ee(i)),!o&&ze(r)&&!ze(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:ne(t,e),l=Reflect.set(t,e,i,ze(t)?t:s);return t===ee(s)&&(a?In(i,r)&&Qn(t,"set",e,i):Qn(t,"add",e,i)),l}deleteProperty(t,e){const i=ne(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&Qn(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Fn(e)||!Cf.has(e))&&Oe(t,"has",e),i}ownKeys(t){return Oe(t,"iterate",Ht(t)?"length":ki),Reflect.ownKeys(t)}}class Xp extends Pf{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const qp=new Df,Yp=new Xp,jp=new Df(!0);const el=n=>n,Ur=n=>Reflect.getPrototypeOf(n);function Kp(n,t,e){return function(...i){const s=this.__v_raw,r=ee(s),o=Es(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?el:t?Ds:Tn;return!t&&Oe(r,"iterate",l?tl:ki),Pe(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function Nr(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function $p(n,t){const e={get(s){const r=this.__v_raw,o=ee(r),a=ee(s);n||(In(s,a)&&Oe(o,"get",s),Oe(o,"get",a));const{has:l}=Ur(o),c=t?el:n?Ds:Tn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Oe(ee(s),"iterate",ki),s.size},has(s){const r=this.__v_raw,o=ee(r),a=ee(s);return n||(In(s,a)&&Oe(o,"has",s),Oe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ee(a),c=t?el:n?Ds:Tn;return!n&&Oe(l,"iterate",ki),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Pe(e,n?{add:Nr("add"),set:Nr("set"),delete:Nr("delete"),clear:Nr("clear")}:{add(s){const r=ee(this),o=Ur(r),a=ee(s),l=!t&&!dn(s)&&!ci(s)?a:s;return o.has.call(r,l)||In(s,l)&&o.has.call(r,s)||In(a,l)&&o.has.call(r,a)||(r.add(l),Qn(r,"add",l,l)),this},set(s,r){!t&&!dn(r)&&!ci(r)&&(r=ee(r));const o=ee(this),{has:a,get:l}=Ur(o);let c=a.call(o,s);c||(s=ee(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?In(r,u)&&Qn(o,"set",s,r):Qn(o,"add",s,r),this},delete(s){const r=ee(this),{has:o,get:a}=Ur(r);let l=o.call(r,s);l||(s=ee(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Qn(r,"delete",s,void 0),c},clear(){const s=ee(this),r=s.size!==0,o=s.clear();return r&&Qn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Kp(s,n,t)}),e}function pc(n,t){const e=$p(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ne(e,s)&&s in i?e:i,s,r)}const Zp={get:pc(!1,!1)},Jp={get:pc(!1,!0)},Qp={get:pc(!0,!1)};const Lf=new WeakMap,If=new WeakMap,Uf=new WeakMap,tm=new WeakMap;function em(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function nm(n){return n.__v_skip||!Object.isExtensible(n)?0:em(Ap(n))}function ko(n){return ci(n)?n:mc(n,!1,qp,Zp,Lf)}function Nf(n){return mc(n,!1,jp,Jp,If)}function nl(n){return mc(n,!0,Yp,Qp,Uf)}function mc(n,t,e,i,s){if(!re(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=nm(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function Wi(n){return ci(n)?Wi(n.__v_raw):!!(n&&n.__v_isReactive)}function ci(n){return!!(n&&n.__v_isReadonly)}function dn(n){return!!(n&&n.__v_isShallow)}function gc(n){return n?!!n.__v_raw:!1}function ee(n){const t=n&&n.__v_raw;return t?ee(t):n}function im(n){return!ne(n,"__v_skip")&&Object.isExtensible(n)&&_f(n,"__v_skip",!0),n}const Tn=n=>re(n)?ko(n):n,Ds=n=>re(n)?nl(n):n;function ze(n){return n?n.__v_isRef===!0:!1}function Ue(n){return Of(n,!1)}function il(n){return Of(n,!0)}function Of(n,t){return ze(n)?n:new sm(n,t)}class sm{constructor(t,e){this.dep=new dc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ee(t),this._value=e?t:Tn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||dn(t)||ci(t);t=i?t:ee(t),In(t,e)&&(this._rawValue=t,this._value=i?t:Tn(t),this.dep.trigger())}}function ii(n){return ze(n)?n.value:n}const rm={get:(n,t,e)=>t==="__v_raw"?n:ii(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return ze(s)&&!ze(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function Ff(n){return Wi(n)?n:new Proxy(n,rm)}class om{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new dc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=_r-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ue!==this)return Ef(this,!0),!0}get value(){const t=this.dep.track();return Af(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function am(n,t,e=!1){let i,s;return Gt(n)?i=n:(i=n.get,s=n.set),new om(i,s,e)}const Or={},So=new WeakMap;let Fi;function lm(n,t=!1,e=Fi){if(e){let i=So.get(e);i||So.set(e,i=[]),i.push(n)}}function cm(n,t,e=ae){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:dn(M)||s===!1||s===0?ti(M,1):ti(M);let u,h,f,p,g=!1,v=!1;if(ze(n)?(h=()=>n.value,g=dn(n)):Wi(n)?(h=()=>c(n),g=!0):Ht(n)?(v=!0,g=n.some(M=>Wi(M)||dn(M)),h=()=>n.map(M=>{if(ze(M))return M.value;if(Wi(M))return c(M);if(Gt(M))return l?l(M,2):M()})):Gt(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){ai();try{f()}finally{li()}}const M=Fi;Fi=u;try{return l?l(n,3,[p]):n(p)}finally{Fi=M}}:h=Nn,t&&s){const M=h,F=s===!0?1/0:s;h=()=>ti(M(),F)}const m=Bp(),d=()=>{u.stop(),m&&m.active&&ac(m.effects,u)};if(r&&t){const M=t;t=(...F)=>{M(...F),d()}}let S=v?new Array(n.length).fill(Or):Or;const b=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const F=u.run();if(s||g||(v?F.some((L,D)=>In(L,S[D])):In(F,S))){f&&f();const L=Fi;Fi=u;try{const D=[F,S===Or?void 0:v&&S[0]===Or?[]:S,p];S=F,l?l(t,3,D):t(...D)}finally{Fi=L}}}else u.run()};return a&&a(b),u=new Sf(h),u.scheduler=o?()=>o(b,!1):b,p=M=>lm(M,!1,u),f=u.onStop=()=>{const M=So.get(u);if(M){if(l)l(M,4);else for(const F of M)F();So.delete(u)}},t?i?b(!0):S=u.run():o?o(b.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function ti(n,t=1/0,e){if(t<=0||!re(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,ze(n))ti(n.value,t,e);else if(Ht(n))for(let i=0;i<n.length;i++)ti(n[i],t,e);else if(df(n)||Es(n))n.forEach(i=>{ti(i,t,e)});else if(gf(n)){for(const i in n)ti(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ti(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wr(n,t,e,i){try{return i?n(...i):n()}catch(s){Wo(s,t,e)}}function Bn(n,t,e,i){if(Gt(n)){const s=wr(n,t,e,i);return s&&pf(s)&&s.catch(r=>{Wo(r,t,e)}),s}if(Ht(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Bn(n[r],t,e,i));return s}}function Wo(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||ae;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){ai(),wr(r,null,10,[n,l,c]),li();return}}um(n,e,s,i,o)}function um(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const We=[];let Cn=-1;const bs=[];let Mi=null,ms=0;const Bf=Promise.resolve();let yo=null;function _c(n){const t=yo||Bf;return n?t.then(this?n.bind(this):n):t}function hm(n){let t=Cn+1,e=We.length;for(;t<e;){const i=t+e>>>1,s=We[i],r=xr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function vc(n){if(!(n.flags&1)){const t=xr(n),e=We[We.length-1];!e||!(n.flags&2)&&t>=xr(e)?We.push(n):We.splice(hm(t),0,n),n.flags|=1,zf()}}function zf(){yo||(yo=Bf.then(Vf))}function fm(n){Ht(n)?bs.push(...n):Mi&&n.id===-1?Mi.splice(ms+1,0,n):n.flags&1||(bs.push(n),n.flags|=1),zf()}function eu(n,t,e=Cn+1){for(;e<We.length;e++){const i=We[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;We.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Hf(n){if(bs.length){const t=[...new Set(bs)].sort((e,i)=>xr(e)-xr(i));if(bs.length=0,Mi){Mi.push(...t);return}for(Mi=t,ms=0;ms<Mi.length;ms++){const e=Mi[ms];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Mi=null,ms=0}}const xr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Vf(n){try{for(Cn=0;Cn<We.length;Cn++){const t=We[Cn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),wr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Cn<We.length;Cn++){const t=We[Cn];t&&(t.flags&=-2)}Cn=-1,We.length=0,Hf(),yo=null,(We.length||bs.length)&&Vf()}}let on=null,Gf=null;function Eo(n){const t=on;return on=n,Gf=n&&n.type.__scopeId||null,t}function dm(n,t=on,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&Ao(-1);const r=Eo(t);let o;try{o=n(...s)}finally{Eo(r),i._d&&Ao(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function pm(n,t){if(on===null)return n;const e=Ko(on),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=ae]=t[s];r&&(Gt(r)&&(r={mounted:r,updated:r}),r.deep&&ti(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Ci(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(ai(),Bn(l,e,8,[n.el,a,n,t]),li())}}function uo(n,t){if(Fe){let e=Fe.provides;const i=Fe.parent&&Fe.parent.provides;i===e&&(e=Fe.provides=Object.create(i)),e[n]=t}}function On(n,t,e=!1){const i=gg();if(i||Ts){let s=Ts?Ts._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Gt(t)?t.call(i&&i.proxy):t}}const mm=Symbol.for("v-scx"),gm=()=>On(mm);function Xi(n,t,e){return kf(n,t,e)}function kf(n,t,e=ae){const{immediate:i,deep:s,flush:r,once:o}=e,a=Pe({},e),l=t&&i||!t&&r!=="post";let c;if(Sr){if(r==="sync"){const p=gm();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Nn,p.resume=Nn,p.pause=Nn,p}}const u=Fe;a.call=(p,g,v)=>Bn(p,u,g,v);let h=!1;r==="post"?a.scheduler=p=>{Ze(p,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(p,g)=>{g?p():vc(p)}),a.augmentJob=p=>{t&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=cm(n,t,a);return Sr&&(c?c.push(f):l&&f()),f}function _m(n,t,e){const i=this.proxy,s=ge(n)?n.includes(".")?Wf(i,n):()=>i[n]:n.bind(i,i);let r;Gt(t)?r=t:(r=t.handler,e=t);const o=Rr(this),a=kf(s,r.bind(i),e);return o(),a}function Wf(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const vm=Symbol("_vte"),xm=n=>n.__isTeleport,Mm=Symbol("_leaveCb");function xc(n,t){n.shapeFlag&6&&n.component?(n.transition=t,xc(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function Xo(n,t){return Gt(n)?Pe({name:n.name},t,{setup:n}):n}function Xf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function nu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const bo=new WeakMap;function hr(n,t,e,i,s=!1){if(Ht(n)){n.forEach((v,m)=>hr(v,t&&(Ht(t)?t[m]:t),e,i,s));return}if(fr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&hr(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?Ko(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===ae?a.refs={}:a.refs,h=a.setupState,f=ee(h),p=h===ae?ff:v=>nu(u,v)?!1:ne(f,v),g=(v,m)=>!(m&&nu(u,m));if(c!=null&&c!==l){if(iu(t),ge(c))u[c]=null,p(c)&&(h[c]=null);else if(ze(c)){const v=t;g(c,v.k)&&(c.value=null),v.k&&(u[v.k]=null)}}if(Gt(l))wr(l,a,12,[o,u]);else{const v=ge(l),m=ze(l);if(v||m){const d=()=>{if(n.f){const S=v?p(l)?h[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Ht(S)&&ac(S,r);else if(Ht(S))S.includes(r)||S.push(r);else if(v)u[l]=[r],p(l)&&(h[l]=u[l]);else{const b=[r];g(l,n.k)&&(l.value=b),n.k&&(u[n.k]=b)}}else v?(u[l]=o,p(l)&&(h[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{d(),bo.delete(n)};S.id=-1,bo.set(n,S),Ze(S,e)}else iu(n),d()}}}function iu(n){const t=bo.get(n);t&&(t.flags|=8,bo.delete(n))}zo().requestIdleCallback;zo().cancelIdleCallback;const fr=n=>!!n.type.__asyncLoader,qf=n=>n.type.__isKeepAlive;function Sm(n,t){Yf(n,"a",t)}function ym(n,t){Yf(n,"da",t)}function Yf(n,t,e=Fe){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(qo(t,i,e),e){let s=e.parent;for(;s&&s.parent;)qf(s.parent.vnode)&&Em(i,t,e,s),s=s.parent}}function Em(n,t,e,i){const s=qo(t,n,i,!0);$f(()=>{ac(i[t],s)},e)}function qo(n,t,e=Fe,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{ai();const a=Rr(e),l=Bn(t,e,n,o);return a(),li(),l});return i?s.unshift(r):s.push(r),r}}const ui=n=>(t,e=Fe)=>{(!Sr||n==="sp")&&qo(n,(...i)=>t(...i),e)},bm=ui("bm"),jf=ui("m"),Tm=ui("bu"),Am=ui("u"),Kf=ui("bum"),$f=ui("um"),wm=ui("sp"),Rm=ui("rtg"),Cm=ui("rtc");function Pm(n,t=Fe){qo("ec",n,t)}const Dm="components";function Lm(n,t){return Um(Dm,n,!0,t)||n}const Im=Symbol.for("v-ndc");function Um(n,t,e=!0,i=!1){const s=on||Fe;if(s){const r=s.type;{const a=Sg(r,!1);if(a&&(a===t||a===qe(t)||a===Bo(qe(t))))return r}const o=su(s[n]||r[n],t)||su(s.appContext[n],t);return!o&&i?r:o}}function su(n,t){return n&&(n[t]||n[qe(t)]||n[Bo(qe(t))])}function sl(n,t,e,i){let s;const r=e,o=Ht(n);if(o||ge(n)){const a=o&&Wi(n);let l=!1,c=!1;a&&(l=!dn(n),c=ci(n),n=Go(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Ds(Tn(n[u])):Tn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(re(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const rl=n=>n?_d(n)?Ko(n):rl(n.parent):null,dr=Pe(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>rl(n.parent),$root:n=>rl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Jf(n),$forceUpdate:n=>n.f||(n.f=()=>{vc(n.update)}),$nextTick:n=>n.n||(n.n=_c.bind(n.proxy)),$watch:n=>_m.bind(n)}),ca=(n,t)=>n!==ae&&!n.__isScriptSetup&&ne(n,t),Nm={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(ca(i,t))return o[t]=1,i[t];if(s!==ae&&ne(s,t))return o[t]=2,s[t];if(ne(r,t))return o[t]=3,r[t];if(e!==ae&&ne(e,t))return o[t]=4,e[t];ol&&(o[t]=0)}}const c=dr[t];let u,h;if(c)return t==="$attrs"&&Oe(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==ae&&ne(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,ne(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return ca(s,t)?(s[t]=e,!0):i!==ae&&ne(i,t)?(i[t]=e,!0):ne(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==ae&&a[0]!=="$"&&ne(n,a)||ca(t,a)||ne(r,a)||ne(i,a)||ne(dr,a)||ne(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ne(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function ru(n){return Ht(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let ol=!0;function Om(n){const t=Jf(n),e=n.proxy,i=n.ctx;ol=!1,t.beforeCreate&&ou(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:g,activated:v,deactivated:m,beforeDestroy:d,beforeUnmount:S,destroyed:b,unmounted:M,render:F,renderTracked:L,renderTriggered:D,errorCaptured:O,serverPrefetch:A,expose:E,inheritAttrs:I,components:tt,directives:j,filters:ut}=t;if(c&&Fm(c,i,null),o)for(const nt in o){const Y=o[nt];Gt(Y)&&(i[nt]=Y.bind(e))}if(s){const nt=s.call(e,e);re(nt)&&(n.data=ko(nt))}if(ol=!0,r)for(const nt in r){const Y=r[nt],gt=Gt(Y)?Y.bind(e,e):Gt(Y.get)?Y.get.bind(e,e):Nn,Mt=!Gt(Y)&&Gt(Y.set)?Y.set.bind(e):Nn,At=Me({get:gt,set:Mt});Object.defineProperty(i,nt,{enumerable:!0,configurable:!0,get:()=>At.value,set:Ut=>At.value=Ut})}if(a)for(const nt in a)Zf(a[nt],i,e,nt);if(l){const nt=Gt(l)?l.call(e):l;Reflect.ownKeys(nt).forEach(Y=>{uo(Y,nt[Y])})}u&&ou(u,n,"c");function et(nt,Y){Ht(Y)?Y.forEach(gt=>nt(gt.bind(e))):Y&&nt(Y.bind(e))}if(et(bm,h),et(jf,f),et(Tm,p),et(Am,g),et(Sm,v),et(ym,m),et(Pm,O),et(Cm,L),et(Rm,D),et(Kf,S),et($f,M),et(wm,A),Ht(E))if(E.length){const nt=n.exposed||(n.exposed={});E.forEach(Y=>{Object.defineProperty(nt,Y,{get:()=>e[Y],set:gt=>e[Y]=gt,enumerable:!0})})}else n.exposed||(n.exposed={});F&&n.render===Nn&&(n.render=F),I!=null&&(n.inheritAttrs=I),tt&&(n.components=tt),j&&(n.directives=j),A&&Xf(n)}function Fm(n,t,e=Nn){Ht(n)&&(n=al(n));for(const i in n){const s=n[i];let r;re(s)?"default"in s?r=On(s.from||i,s.default,!0):r=On(s.from||i):r=On(s),ze(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function ou(n,t,e){Bn(Ht(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Zf(n,t,e,i){let s=i.includes(".")?Wf(e,i):()=>e[i];if(ge(n)){const r=t[n];Gt(r)&&Xi(s,r)}else if(Gt(n))Xi(s,n.bind(e));else if(re(n))if(Ht(n))n.forEach(r=>Zf(r,t,e,i));else{const r=Gt(n.handler)?n.handler.bind(e):t[n.handler];Gt(r)&&Xi(s,r,n)}}function Jf(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>To(l,c,o,!0)),To(l,t,o)),re(t)&&r.set(t,l),l}function To(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&To(n,r,e,!0),s&&s.forEach(o=>To(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Bm[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Bm={data:au,props:lu,emits:lu,methods:sr,computed:sr,beforeCreate:Ve,created:Ve,beforeMount:Ve,mounted:Ve,beforeUpdate:Ve,updated:Ve,beforeDestroy:Ve,beforeUnmount:Ve,destroyed:Ve,unmounted:Ve,activated:Ve,deactivated:Ve,errorCaptured:Ve,serverPrefetch:Ve,components:sr,directives:sr,watch:Hm,provide:au,inject:zm};function au(n,t){return t?n?function(){return Pe(Gt(n)?n.call(this,this):n,Gt(t)?t.call(this,this):t)}:t:n}function zm(n,t){return sr(al(n),al(t))}function al(n){if(Ht(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Ve(n,t){return n?[...new Set([].concat(n,t))]:t}function sr(n,t){return n?Pe(Object.create(null),n,t):t}function lu(n,t){return n?Ht(n)&&Ht(t)?[...new Set([...n,...t])]:Pe(Object.create(null),ru(n),ru(t??{})):t}function Hm(n,t){if(!n)return t;if(!t)return n;const e=Pe(Object.create(null),n);for(const i in t)e[i]=Ve(n[i],t[i]);return e}function Qf(){return{app:null,config:{isNativeTag:ff,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Vm=0;function Gm(n,t){return function(i,s=null){Gt(i)||(i=Pe({},i)),s!=null&&!re(s)&&(s=null);const r=Qf(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Vm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Eg,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Gt(u.install)?(o.add(u),u.install(c,...h)):Gt(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||Qe(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,Ko(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Bn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Ts;Ts=c;try{return u()}finally{Ts=h}}};return c}}let Ts=null;const km=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${qe(t)}Modifiers`]||n[`${Ki(t)}Modifiers`];function Wm(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||ae;let s=e;const r=t.startsWith("update:"),o=r&&km(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>ge(u)?u.trim():u)),o.number&&(s=e.map(Cp)));let a,l=i[a=ia(t)]||i[a=ia(qe(t))];!l&&r&&(l=i[a=ia(Ki(t))]),l&&Bn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Bn(c,n,6,s)}}const Xm=new WeakMap;function td(n,t,e=!1){const i=e?Xm:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Gt(n)){const l=c=>{const u=td(c,t,!0);u&&(a=!0,Pe(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(re(n)&&i.set(n,null),null):(Ht(r)?r.forEach(l=>o[l]=null):Pe(o,r),re(n)&&i.set(n,o),o)}function Yo(n,t){return!n||!No(t)?!1:(t=t.slice(2).replace(/Once$/,""),ne(n,t[0].toLowerCase()+t.slice(1))||ne(n,Ki(t))||ne(n,t))}function cu(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:g,inheritAttrs:v}=n,m=Eo(n);let d,S;try{if(e.shapeFlag&4){const M=s||i,F=M;d=Dn(c.call(F,M,u,h,p,f,g)),S=a}else{const M=t;d=Dn(M.length>1?M(h,{attrs:a,slots:o,emit:l}):M(h,null)),S=t.props?a:qm(a)}}catch(M){pr.length=0,Wo(M,n,1),d=Qe(Ai)}let b=d;if(S&&v!==!1){const M=Object.keys(S),{shapeFlag:F}=b;M.length&&F&7&&(r&&M.some(Oo)&&(S=Ym(S,r)),b=Ls(b,S,!1,!0))}return e.dirs&&(b=Ls(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(e.dirs):e.dirs),e.transition&&xc(b,e.transition),d=b,Eo(m),d}const qm=n=>{let t;for(const e in n)(e==="class"||e==="style"||No(e))&&((t||(t={}))[e]=n[e]);return t},Ym=(n,t)=>{const e={};for(const i in n)(!Oo(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function jm(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?uu(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(ed(o,i,f)&&!Yo(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?uu(i,o,c):!0:!!o;return!1}function uu(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(ed(t,n,r)&&!Yo(e,r))return!0}return!1}function ed(n,t,e){const i=n[e],s=t[e];return e==="style"&&re(i)&&re(s)?!cc(i,s):i!==s}function Km({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const nd={},id=()=>Object.create(nd),sd=n=>Object.getPrototypeOf(n)===nd;function $m(n,t,e,i=!1){const s={},r=id();n.propsDefaults=Object.create(null),rd(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:Nf(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Zm(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ee(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Yo(n.emitsOptions,f))continue;const p=t[f];if(l)if(ne(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const g=qe(f);s[g]=ll(l,a,g,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{rd(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!ne(t,h)&&((u=Ki(h))===h||!ne(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=ll(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!ne(t,h))&&(delete r[h],c=!0)}c&&Qn(n.attrs,"set","")}function rd(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(lr(l))continue;const c=t[l];let u;s&&ne(s,u=qe(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Yo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ee(e),c=a||ae;for(let u=0;u<r.length;u++){const h=r[u];e[h]=ll(s,l,h,c[h],n,!ne(c,h))}}return o}function ll(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ne(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Gt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Rr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Ki(e))&&(i=!0))}return i}const Jm=new WeakMap;function od(n,t,e=!1){const i=e?Jm:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Gt(n)){const u=h=>{l=!0;const[f,p]=od(h,t,!0);Pe(o,f),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return re(n)&&i.set(n,ys),ys;if(Ht(r))for(let u=0;u<r.length;u++){const h=qe(r[u]);hu(h)&&(o[h]=ae)}else if(r)for(const u in r){const h=qe(u);if(hu(h)){const f=r[u],p=o[h]=Ht(f)||Gt(f)?{type:f}:Pe({},f),g=p.type;let v=!1,m=!0;if(Ht(g))for(let d=0;d<g.length;++d){const S=g[d],b=Gt(S)&&S.name;if(b==="Boolean"){v=!0;break}else b==="String"&&(m=!1)}else v=Gt(g)&&g.name==="Boolean";p[0]=v,p[1]=m,(v||ne(p,"default"))&&a.push(h)}}const c=[o,a];return re(n)&&i.set(n,c),c}function hu(n){return n[0]!=="$"&&!lr(n)}const Mc=n=>n==="_"||n==="_ctx"||n==="$stable",Sc=n=>Ht(n)?n.map(Dn):[Dn(n)],Qm=(n,t,e)=>{if(t._n)return t;const i=dm((...s)=>Sc(t(...s)),e);return i._c=!1,i},ad=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Mc(s))continue;const r=n[s];if(Gt(r))t[s]=Qm(s,r,i);else if(r!=null){const o=Sc(r);t[s]=()=>o}}},ld=(n,t)=>{const e=Sc(t);n.slots.default=()=>e},cd=(n,t,e)=>{for(const i in t)(e||!Mc(i))&&(n[i]=t[i])},tg=(n,t,e)=>{const i=n.slots=id();if(n.vnode.shapeFlag&32){const s=t._;s?(cd(i,t,e),e&&_f(i,"_",s,!0)):ad(t,i)}else t&&ld(n,t)},eg=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=ae;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:cd(s,t,e):(r=!t.$stable,ad(t,s)),o=t}else t&&(ld(n,t),o={default:1});if(r)for(const a in s)!Mc(a)&&o[a]==null&&delete s[a]},Ze=og;function ng(n){return ig(n)}function ig(n,t){const e=zo();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=Nn,insertStaticContent:g}=n,v=(w,C,y,it=null,U=null,N=null,k=void 0,K=null,H=!!C.dynamicChildren)=>{if(w===C)return;w&&!Ks(w,C)&&(it=R(w),Ut(w,U,N,!0),w=null),C.patchFlag===-2&&(H=!1,C.dynamicChildren=null);const{type:x,ref:_,shapeFlag:P}=C;switch(x){case jo:m(w,C,y,it);break;case Ai:d(w,C,y,it);break;case ho:w==null&&S(C,y,it,k);break;case rn:tt(w,C,y,it,U,N,k,K,H);break;default:P&1?F(w,C,y,it,U,N,k,K,H):P&6?j(w,C,y,it,U,N,k,K,H):(P&64||P&128)&&x.process(w,C,y,it,U,N,k,K,H,ot)}_!=null&&U?hr(_,w&&w.ref,N,C||w,!C):_==null&&w&&w.ref!=null&&hr(w.ref,null,N,w,!0)},m=(w,C,y,it)=>{if(w==null)i(C.el=a(C.children),y,it);else{const U=C.el=w.el;C.children!==w.children&&c(U,C.children)}},d=(w,C,y,it)=>{w==null?i(C.el=l(C.children||""),y,it):C.el=w.el},S=(w,C,y,it)=>{[w.el,w.anchor]=g(w.children,C,y,it,w.el,w.anchor)},b=({el:w,anchor:C},y,it)=>{let U;for(;w&&w!==C;)U=f(w),i(w,y,it),w=U;i(C,y,it)},M=({el:w,anchor:C})=>{let y;for(;w&&w!==C;)y=f(w),s(w),w=y;s(C)},F=(w,C,y,it,U,N,k,K,H)=>{if(C.type==="svg"?k="svg":C.type==="math"&&(k="mathml"),w==null)L(C,y,it,U,N,k,K,H);else{const x=w.el&&w.el._isVueCE?w.el:null;try{x&&x._beginPatch(),A(w,C,U,N,k,K,H)}finally{x&&x._endPatch()}}},L=(w,C,y,it,U,N,k,K)=>{let H,x;const{props:_,shapeFlag:P,transition:W,dirs:q}=w;if(H=w.el=o(w.type,N,_&&_.is,_),P&8?u(H,w.children):P&16&&O(w.children,H,null,it,U,ua(w,N),k,K),q&&Ci(w,null,it,"created"),D(H,w,w.scopeId,k,it),_){for(const dt in _)dt!=="value"&&!lr(dt)&&r(H,dt,null,_[dt],N,it);"value"in _&&r(H,"value",null,_.value,N),(x=_.onVnodeBeforeMount)&&Rn(x,it,w)}q&&Ci(w,null,it,"beforeMount");const X=sg(U,W);X&&W.beforeEnter(H),i(H,C,y),((x=_&&_.onVnodeMounted)||X||q)&&Ze(()=>{try{x&&Rn(x,it,w),X&&W.enter(H),q&&Ci(w,null,it,"mounted")}finally{}},U)},D=(w,C,y,it,U)=>{if(y&&p(w,y),it)for(let N=0;N<it.length;N++)p(w,it[N]);if(U){let N=U.subTree;if(C===N||dd(N.type)&&(N.ssContent===C||N.ssFallback===C)){const k=U.vnode;D(w,k,k.scopeId,k.slotScopeIds,U.parent)}}},O=(w,C,y,it,U,N,k,K,H=0)=>{for(let x=H;x<w.length;x++){const _=w[x]=K?Jn(w[x]):Dn(w[x]);v(null,_,C,y,it,U,N,k,K)}},A=(w,C,y,it,U,N,k)=>{const K=C.el=w.el;let{patchFlag:H,dynamicChildren:x,dirs:_}=C;H|=w.patchFlag&16;const P=w.props||ae,W=C.props||ae;let q;if(y&&Pi(y,!1),(q=W.onVnodeBeforeUpdate)&&Rn(q,y,C,w),_&&Ci(C,w,y,"beforeUpdate"),y&&Pi(y,!0),(P.innerHTML&&W.innerHTML==null||P.textContent&&W.textContent==null)&&u(K,""),x?E(w.dynamicChildren,x,K,y,it,ua(C,U),N):k||Y(w,C,K,null,y,it,ua(C,U),N,!1),H>0){if(H&16)I(K,P,W,y,U);else if(H&2&&P.class!==W.class&&r(K,"class",null,W.class,U),H&4&&r(K,"style",P.style,W.style,U),H&8){const X=C.dynamicProps;for(let dt=0;dt<X.length;dt++){const lt=X[dt],ht=P[lt],Rt=W[lt];(Rt!==ht||lt==="value")&&r(K,lt,ht,Rt,U,y)}}H&1&&w.children!==C.children&&u(K,C.children)}else!k&&x==null&&I(K,P,W,y,U);((q=W.onVnodeUpdated)||_)&&Ze(()=>{q&&Rn(q,y,C,w),_&&Ci(C,w,y,"updated")},it)},E=(w,C,y,it,U,N,k)=>{for(let K=0;K<C.length;K++){const H=w[K],x=C[K],_=H.el&&(H.type===rn||!Ks(H,x)||H.shapeFlag&198)?h(H.el):y;v(H,x,_,null,it,U,N,k,!0)}},I=(w,C,y,it,U)=>{if(C!==y){if(C!==ae)for(const N in C)!lr(N)&&!(N in y)&&r(w,N,C[N],null,U,it);for(const N in y){if(lr(N))continue;const k=y[N],K=C[N];k!==K&&N!=="value"&&r(w,N,K,k,U,it)}"value"in y&&r(w,"value",C.value,y.value,U)}},tt=(w,C,y,it,U,N,k,K,H)=>{const x=C.el=w?w.el:a(""),_=C.anchor=w?w.anchor:a("");let{patchFlag:P,dynamicChildren:W,slotScopeIds:q}=C;q&&(K=K?K.concat(q):q),w==null?(i(x,y,it),i(_,y,it),O(C.children||[],y,_,U,N,k,K,H)):P>0&&P&64&&W&&w.dynamicChildren&&w.dynamicChildren.length===W.length?(E(w.dynamicChildren,W,y,U,N,k,K),(C.key!=null||U&&C===U.subTree)&&ud(w,C,!0)):Y(w,C,y,_,U,N,k,K,H)},j=(w,C,y,it,U,N,k,K,H)=>{C.slotScopeIds=K,w==null?C.shapeFlag&512?U.ctx.activate(C,y,it,k,H):ut(C,y,it,U,N,k,H):at(w,C,H)},ut=(w,C,y,it,U,N,k)=>{const K=w.component=mg(w,it,U);if(qf(w)&&(K.ctx.renderer=ot),_g(K,!1,k),K.asyncDep){if(U&&U.registerDep(K,et,k),!w.el){const H=K.subTree=Qe(Ai);d(null,H,C,y),w.placeholder=H.el}}else et(K,w,C,y,U,N,k)},at=(w,C,y)=>{const it=C.component=w.component;if(jm(w,C,y))if(it.asyncDep&&!it.asyncResolved){nt(it,C,y);return}else it.next=C,it.update();else C.el=w.el,it.vnode=C},et=(w,C,y,it,U,N,k)=>{const K=()=>{if(w.isMounted){let{next:P,bu:W,u:q,parent:X,vnode:dt}=w;{const xt=hd(w);if(xt){P&&(P.el=dt.el,nt(w,P,k)),xt.asyncDep.then(()=>{Ze(()=>{w.isUnmounted||x()},U)});return}}let lt=P,ht;Pi(w,!1),P?(P.el=dt.el,nt(w,P,k)):P=dt,W&&sa(W),(ht=P.props&&P.props.onVnodeBeforeUpdate)&&Rn(ht,X,P,dt),Pi(w,!0);const Rt=cu(w),pt=w.subTree;w.subTree=Rt,v(pt,Rt,h(pt.el),R(pt),w,U,N),P.el=Rt.el,lt===null&&Km(w,Rt.el),q&&Ze(q,U),(ht=P.props&&P.props.onVnodeUpdated)&&Ze(()=>Rn(ht,X,P,dt),U)}else{let P;const{el:W,props:q}=C,{bm:X,m:dt,parent:lt,root:ht,type:Rt}=w,pt=fr(C);Pi(w,!1),X&&sa(X),!pt&&(P=q&&q.onVnodeBeforeMount)&&Rn(P,lt,C),Pi(w,!0);{ht.ce&&ht.ce._hasShadowRoot()&&ht.ce._injectChildStyle(Rt,w.parent?w.parent.type:void 0);const xt=w.subTree=cu(w);v(null,xt,y,it,w,U,N),C.el=xt.el}if(dt&&Ze(dt,U),!pt&&(P=q&&q.onVnodeMounted)){const xt=C;Ze(()=>Rn(P,lt,xt),U)}(C.shapeFlag&256||lt&&fr(lt.vnode)&&lt.vnode.shapeFlag&256)&&w.a&&Ze(w.a,U),w.isMounted=!0,C=y=it=null}};w.scope.on();const H=w.effect=new Sf(K);w.scope.off();const x=w.update=H.run.bind(H),_=w.job=H.runIfDirty.bind(H);_.i=w,_.id=w.uid,H.scheduler=()=>vc(_),Pi(w,!0),x()},nt=(w,C,y)=>{C.component=w;const it=w.vnode.props;w.vnode=C,w.next=null,Zm(w,C.props,it,y),eg(w,C.children,y),ai(),eu(w),li()},Y=(w,C,y,it,U,N,k,K,H=!1)=>{const x=w&&w.children,_=w?w.shapeFlag:0,P=C.children,{patchFlag:W,shapeFlag:q}=C;if(W>0){if(W&128){Mt(x,P,y,it,U,N,k,K,H);return}else if(W&256){gt(x,P,y,it,U,N,k,K,H);return}}q&8?(_&16&&ct(x,U,N),P!==x&&u(y,P)):_&16?q&16?Mt(x,P,y,it,U,N,k,K,H):ct(x,U,N,!0):(_&8&&u(y,""),q&16&&O(P,y,it,U,N,k,K,H))},gt=(w,C,y,it,U,N,k,K,H)=>{w=w||ys,C=C||ys;const x=w.length,_=C.length,P=Math.min(x,_);let W;for(W=0;W<P;W++){const q=C[W]=H?Jn(C[W]):Dn(C[W]);v(w[W],q,y,null,U,N,k,K,H)}x>_?ct(w,U,N,!0,!1,P):O(C,y,it,U,N,k,K,H,P)},Mt=(w,C,y,it,U,N,k,K,H)=>{let x=0;const _=C.length;let P=w.length-1,W=_-1;for(;x<=P&&x<=W;){const q=w[x],X=C[x]=H?Jn(C[x]):Dn(C[x]);if(Ks(q,X))v(q,X,y,null,U,N,k,K,H);else break;x++}for(;x<=P&&x<=W;){const q=w[P],X=C[W]=H?Jn(C[W]):Dn(C[W]);if(Ks(q,X))v(q,X,y,null,U,N,k,K,H);else break;P--,W--}if(x>P){if(x<=W){const q=W+1,X=q<_?C[q].el:it;for(;x<=W;)v(null,C[x]=H?Jn(C[x]):Dn(C[x]),y,X,U,N,k,K,H),x++}}else if(x>W)for(;x<=P;)Ut(w[x],U,N,!0),x++;else{const q=x,X=x,dt=new Map;for(x=X;x<=W;x++){const vt=C[x]=H?Jn(C[x]):Dn(C[x]);vt.key!=null&&dt.set(vt.key,x)}let lt,ht=0;const Rt=W-X+1;let pt=!1,xt=0;const Ct=new Array(Rt);for(x=0;x<Rt;x++)Ct[x]=0;for(x=q;x<=P;x++){const vt=w[x];if(ht>=Rt){Ut(vt,U,N,!0);continue}let Bt;if(vt.key!=null)Bt=dt.get(vt.key);else for(lt=X;lt<=W;lt++)if(Ct[lt-X]===0&&Ks(vt,C[lt])){Bt=lt;break}Bt===void 0?Ut(vt,U,N,!0):(Ct[Bt-X]=x+1,Bt>=xt?xt=Bt:pt=!0,v(vt,C[Bt],y,null,U,N,k,K,H),ht++)}const Ot=pt?rg(Ct):ys;for(lt=Ot.length-1,x=Rt-1;x>=0;x--){const vt=X+x,Bt=C[vt],zt=C[vt+1],Zt=vt+1<_?zt.el||fd(zt):it;Ct[x]===0?v(null,Bt,y,Zt,U,N,k,K,H):pt&&(lt<0||x!==Ot[lt]?At(Bt,y,Zt,2):lt--)}}},At=(w,C,y,it,U=null)=>{const{el:N,type:k,transition:K,children:H,shapeFlag:x}=w;if(x&6){At(w.component.subTree,C,y,it);return}if(x&128){w.suspense.move(C,y,it);return}if(x&64){k.move(w,C,y,ot);return}if(k===rn){i(N,C,y);for(let P=0;P<H.length;P++)At(H[P],C,y,it);i(w.anchor,C,y);return}if(k===ho){b(w,C,y);return}if(it!==2&&x&1&&K)if(it===0)K.beforeEnter(N),i(N,C,y),Ze(()=>K.enter(N),U);else{const{leave:P,delayLeave:W,afterLeave:q}=K,X=()=>{w.ctx.isUnmounted?s(N):i(N,C,y)},dt=()=>{N._isLeaving&&N[Mm](!0),P(N,()=>{X(),q&&q()})};W?W(N,X,dt):dt()}else i(N,C,y)},Ut=(w,C,y,it=!1,U=!1)=>{const{type:N,props:k,ref:K,children:H,dynamicChildren:x,shapeFlag:_,patchFlag:P,dirs:W,cacheIndex:q,memo:X}=w;if(P===-2&&(U=!1),K!=null&&(ai(),hr(K,null,y,w,!0),li()),q!=null&&(C.renderCache[q]=void 0),_&256){C.ctx.deactivate(w);return}const dt=_&1&&W,lt=!fr(w);let ht;if(lt&&(ht=k&&k.onVnodeBeforeUnmount)&&Rn(ht,C,w),_&6)mt(w.component,y,it);else{if(_&128){w.suspense.unmount(y,it);return}dt&&Ci(w,null,C,"beforeUnmount"),_&64?w.type.remove(w,C,y,ot,it):x&&!x.hasOnce&&(N!==rn||P>0&&P&64)?ct(x,C,y,!1,!0):(N===rn&&P&384||!U&&_&16)&&ct(H,C,y),it&&jt(w)}const Rt=X!=null&&q==null;(lt&&(ht=k&&k.onVnodeUnmounted)||dt||Rt)&&Ze(()=>{ht&&Rn(ht,C,w),dt&&Ci(w,null,C,"unmounted"),Rt&&(w.el=null)},y)},jt=w=>{const{type:C,el:y,anchor:it,transition:U}=w;if(C===rn){st(y,it);return}if(C===ho){M(w);return}const N=()=>{s(y),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(w.shapeFlag&1&&U&&!U.persisted){const{leave:k,delayLeave:K}=U,H=()=>k(y,N);K?K(w.el,N,H):H()}else N()},st=(w,C)=>{let y;for(;w!==C;)y=f(w),s(w),w=y;s(C)},mt=(w,C,y)=>{const{bum:it,scope:U,job:N,subTree:k,um:K,m:H,a:x}=w;fu(H),fu(x),it&&sa(it),U.stop(),N&&(N.flags|=8,Ut(k,w,C,y)),K&&Ze(K,C),Ze(()=>{w.isUnmounted=!0},C)},ct=(w,C,y,it=!1,U=!1,N=0)=>{for(let k=N;k<w.length;k++)Ut(w[k],C,y,it,U)},R=w=>{if(w.shapeFlag&6)return R(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const C=f(w.anchor||w.el),y=C&&C[vm];return y?f(y):C};let $=!1;const Z=(w,C,y)=>{let it;w==null?C._vnode&&(Ut(C._vnode,null,null,!0),it=C._vnode.component):v(C._vnode||null,w,C,null,null,null,y),C._vnode=w,$||($=!0,eu(it),Hf(),$=!1)},ot={p:v,um:Ut,m:At,r:jt,mt:ut,mc:O,pc:Y,pbc:E,n:R,o:n};return{render:Z,hydrate:void 0,createApp:Gm(Z)}}function ua({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Pi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function sg(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function ud(n,t,e=!1){const i=n.children,s=t.children;if(Ht(i)&&Ht(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=Jn(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&ud(o,a)),a.type===jo&&(a.patchFlag===-1&&(a=s[r]=Jn(a)),a.el=o.el),a.type===Ai&&!a.el&&(a.el=o.el)}}function rg(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function hd(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:hd(t)}function fu(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function fd(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?fd(t.subTree):null}const dd=n=>n.__isSuspense;function og(n,t){t&&t.pendingBranch?Ht(n)?t.effects.push(...n):t.effects.push(n):fm(n)}const rn=Symbol.for("v-fgt"),jo=Symbol.for("v-txt"),Ai=Symbol.for("v-cmt"),ho=Symbol.for("v-stc"),pr=[];let an=null;function ve(n=!1){pr.push(an=n?null:[])}function ag(){pr.pop(),an=pr[pr.length-1]||null}let Mr=1;function Ao(n,t=!1){Mr+=n,n<0&&an&&t&&(an.hasOnce=!0)}function pd(n){return n.dynamicChildren=Mr>0?an||ys:null,ag(),Mr>0&&an&&an.push(n),n}function be(n,t,e,i,s,r){return pd(Ft(n,t,e,i,s,r,!0))}function md(n,t,e,i,s){return pd(Qe(n,t,e,i,s,!0))}function wo(n){return n?n.__v_isVNode===!0:!1}function Ks(n,t){return n.type===t.type&&n.key===t.key}const gd=({key:n})=>n??null,fo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?ge(n)||ze(n)||Gt(n)?{i:on,r:n,k:t,f:!!e}:n:null);function Ft(n,t=null,e=null,i=0,s=null,r=n===rn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&gd(t),ref:t&&fo(t),scopeId:Gf,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:on};return a?(yc(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=ge(e)?8:16),Mr>0&&!o&&an&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&an.push(l),l}const Qe=lg;function lg(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Im)&&(n=Ai),wo(n)){const a=Ls(n,t,!0);return e&&yc(a,e),Mr>0&&!r&&an&&(a.shapeFlag&6?an[an.indexOf(n)]=a:an.push(a)),a.patchFlag=-2,a}if(yg(n)&&(n=n.__vccOpts),t){t=cg(t);let{class:a,style:l}=t;a&&!ge(a)&&(t.class=Vo(a)),re(l)&&(gc(l)&&!Ht(l)&&(l=Pe({},l)),t.style=Ho(l))}const o=ge(n)?1:dd(n)?128:xm(n)?64:re(n)?4:Gt(n)?2:0;return Ft(n,t,e,i,s,o,r,!0)}function cg(n){return n?gc(n)||sd(n)?Pe({},n):n:null}function Ls(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?fg(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&gd(c),ref:t&&t.ref?e&&r?Ht(r)?r.concat(fo(t)):[r,fo(t)]:fo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==rn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ls(n.ssContent),ssFallback:n.ssFallback&&Ls(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&xc(u,l.clone(u)),u}function ug(n=" ",t=0){return Qe(jo,null,n,t)}function hg(n,t){const e=Qe(ho,null,n);return e.staticCount=t,e}function gs(n="",t=!1){return t?(ve(),md(Ai,null,n)):Qe(Ai,null,n)}function Dn(n){return n==null||typeof n=="boolean"?Qe(Ai):Ht(n)?Qe(rn,null,n.slice()):wo(n)?Jn(n):Qe(jo,null,String(n))}function Jn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ls(n)}function yc(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Ht(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),yc(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!sd(t)?t._ctx=on:s===3&&on&&(on.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Gt(t)?(t={default:t,_ctx:on},e=32):(t=String(t),i&64?(e=16,t=[ug(t)]):e=8);n.children=t,n.shapeFlag|=e}function fg(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Vo([t.class,i.class]));else if(s==="style")t.style=Ho([t.style,i.style]);else if(No(s)){const r=t[s],o=i[s];o&&r!==o&&!(Ht(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!Oo(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Rn(n,t,e,i=null){Bn(n,t,7,[e,i])}const dg=Qf();let pg=0;function mg(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||dg,r={uid:pg++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Fp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:od(i,s),emitsOptions:td(i,s),emit:null,emitted:null,propsDefaults:ae,inheritAttrs:i.inheritAttrs,ctx:ae,data:ae,props:ae,attrs:ae,slots:ae,refs:ae,setupState:ae,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=Wm.bind(null,r),n.ce&&n.ce(r),r}let Fe=null;const gg=()=>Fe||on;let Ro,cl;{const n=zo(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};Ro=t("__VUE_INSTANCE_SETTERS__",e=>Fe=e),cl=t("__VUE_SSR_SETTERS__",e=>Sr=e)}const Rr=n=>{const t=Fe;return Ro(n),n.scope.on(),()=>{n.scope.off(),Ro(t)}},du=()=>{Fe&&Fe.scope.off(),Ro(null)};function _d(n){return n.vnode.shapeFlag&4}let Sr=!1;function _g(n,t=!1,e=!1){t&&cl(t);const{props:i,children:s}=n.vnode,r=_d(n);$m(n,i,r,t),tg(n,s,e||t);const o=r?vg(n,t):void 0;return t&&cl(!1),o}function vg(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Nm);const{setup:i}=e;if(i){ai();const s=n.setupContext=i.length>1?Mg(n):null,r=Rr(n),o=wr(i,n,0,[n.props,s]),a=pf(o);if(li(),r(),(a||n.sp)&&!fr(n)&&Xf(n),a){if(o.then(du,du),t)return o.then(l=>{pu(n,l)}).catch(l=>{Wo(l,n,0)});n.asyncDep=o}else pu(n,o)}else vd(n)}function pu(n,t,e){Gt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:re(t)&&(n.setupState=Ff(t)),vd(n)}function vd(n,t,e){const i=n.type;n.render||(n.render=i.render||Nn);{const s=Rr(n);ai();try{Om(n)}finally{li(),s()}}}const xg={get(n,t){return Oe(n,"get",""),n[t]}};function Mg(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,xg),slots:n.slots,emit:n.emit,expose:t}}function Ko(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ff(im(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in dr)return dr[e](n)},has(t,e){return e in t||e in dr}})):n.proxy}function Sg(n,t=!0){return Gt(n)?n.displayName||n.name:n.name||t&&n.__name}function yg(n){return Gt(n)&&"__vccOpts"in n}const Me=(n,t)=>am(n,t,Sr);function xd(n,t,e){try{Ao(-1);const i=arguments.length;return i===2?re(t)&&!Ht(t)?wo(t)?Qe(n,null,[t]):Qe(n,t):Qe(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&wo(e)&&(e=[e]),Qe(n,t,e))}finally{Ao(1)}}const Eg="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ul;const mu=typeof window<"u"&&window.trustedTypes;if(mu)try{ul=mu.createPolicy("vue",{createHTML:n=>n})}catch{}const Md=ul?n=>ul.createHTML(n):n=>n,bg="http://www.w3.org/2000/svg",Tg="http://www.w3.org/1998/Math/MathML",Zn=typeof document<"u"?document:null,gu=Zn&&Zn.createElement("template"),Ag={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?Zn.createElementNS(bg,n):t==="mathml"?Zn.createElementNS(Tg,n):e?Zn.createElement(n,{is:e}):Zn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Zn.createTextNode(n),createComment:n=>Zn.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Zn.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{gu.innerHTML=Md(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=gu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},wg=Symbol("_vtc");function Rg(n,t,e){const i=n[wg];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const Co=Symbol("_vod"),Sd=Symbol("_vsh"),Cg={name:"show",beforeMount(n,{value:t},{transition:e}){n[Co]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):$s(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),$s(n,!0),i.enter(n)):i.leave(n,()=>{$s(n,!1)}):$s(n,t))},beforeUnmount(n,{value:t}){$s(n,t)}};function $s(n,t){n.style.display=t?n[Co]:"none",n[Sd]=!t}const Pg=Symbol(""),Dg=/(?:^|;)\s*display\s*:/;function Lg(n,t,e){const i=n.style,s=ge(e);let r=!1;if(e&&!s){if(t)if(ge(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&rr(i,a,"")}else for(const o in t)e[o]==null&&rr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?Ug(n,o,!ge(t)&&t?t[o]:void 0,a)||rr(i,o,a):rr(i,o,"")}}else if(s){if(t!==e){const o=i[Pg];o&&(e+=";"+o),i.cssText=e,r=Dg.test(e)}}else t&&n.removeAttribute("style");Co in n&&(n[Co]=r?i.display:"",n[Sd]&&(i.display="none"))}const _u=/\s*!important$/;function rr(n,t,e){if(Ht(e))e.forEach(i=>rr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=Ig(n,t);_u.test(e)?n.setProperty(Ki(i),e.replace(_u,""),"important"):n[i]=e}}const vu=["Webkit","Moz","ms"],ha={};function Ig(n,t){const e=ha[t];if(e)return e;let i=qe(t);if(i!=="filter"&&i in n)return ha[t]=i;i=Bo(i);for(let s=0;s<vu.length;s++){const r=vu[s]+i;if(r in n)return ha[t]=r}return t}function Ug(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&ge(i)&&e===i}const xu="http://www.w3.org/1999/xlink";function Mu(n,t,e,i,s,r=Np(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(xu,t.slice(6,t.length)):n.setAttributeNS(xu,t,e):e==null||r&&!vf(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Fn(e)?String(e):e)}function Su(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?Md(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=vf(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Ng(n,t,e,i){n.addEventListener(t,e,i)}function Og(n,t,e,i){n.removeEventListener(t,e,i)}const yu=Symbol("_vei");function Fg(n,t,e,i,s=null){const r=n[yu]||(n[yu]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=Bg(t);if(i){const c=r[t]=Vg(i,s);Ng(n,a,c,l)}else o&&(Og(n,a,o,l),r[t]=void 0)}}const Eu=/(?:Once|Passive|Capture)$/;function Bg(n){let t;if(Eu.test(n)){t={};let i;for(;i=n.match(Eu);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ki(n.slice(2)),t]}let fa=0;const zg=Promise.resolve(),Hg=()=>fa||(zg.then(()=>fa=0),fa=Date.now());function Vg(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Bn(Gg(i,e.value),t,5,[i])};return e.value=n,e.attached=Hg(),e}function Gg(n,t){if(Ht(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const bu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,kg=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?Rg(n,i,o):t==="style"?Lg(n,e,i):No(t)?Oo(t)||Fg(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Wg(n,t,i,o))?(Su(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Mu(n,t,i,o,r,t!=="value")):n._isVueCE&&(Xg(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!ge(i)))?Su(n,qe(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Mu(n,t,i,o))};function Wg(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&bu(t)&&Gt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return bu(t)&&ge(e)?!1:t in n}function Xg(n,t){const e=n._def.props;if(!e)return!1;const i=qe(t);return Array.isArray(e)?e.some(s=>qe(s)===i):Object.keys(e).some(s=>qe(s)===i)}const qg=Pe({patchProp:kg},Ag);let Tu;function Yg(){return Tu||(Tu=ng(qg))}const jg=((...n)=>{const t=Yg().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=$g(i);if(!s)return;const r=t._component;!Gt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,Kg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function Kg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function $g(n){return ge(n)?document.querySelector(n):n}const Ec=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},Zg={};function Jg(n,t){const e=Lm("router-view");return ve(),md(e)}const Qg=Ec(Zg,[["render",Jg]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const _s=typeof document<"u";function yd(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function t_(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&yd(n.default)}const te=Object.assign;function da(n,t){const e={};for(const i in t){const s=t[i];e[i]=An(s)?s.map(n):n(s)}return e}const mr=()=>{},An=Array.isArray;function Au(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const Ed=/#/g,e_=/&/g,n_=/\//g,i_=/=/g,s_=/\?/g,bd=/\+/g,r_=/%5B/g,o_=/%5D/g,Td=/%5E/g,a_=/%60/g,Ad=/%7B/g,l_=/%7C/g,wd=/%7D/g,c_=/%20/g;function bc(n){return n==null?"":encodeURI(""+n).replace(l_,"|").replace(r_,"[").replace(o_,"]")}function u_(n){return bc(n).replace(Ad,"{").replace(wd,"}").replace(Td,"^")}function hl(n){return bc(n).replace(bd,"%2B").replace(c_,"+").replace(Ed,"%23").replace(e_,"%26").replace(a_,"`").replace(Ad,"{").replace(wd,"}").replace(Td,"^")}function h_(n){return hl(n).replace(i_,"%3D")}function f_(n){return bc(n).replace(Ed,"%23").replace(s_,"%3F")}function d_(n){return f_(n).replace(n_,"%2F")}function yr(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const p_=/\/$/,m_=n=>n.replace(p_,"");function pa(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=x_(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:yr(o)}}function g_(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function wu(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function __(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&Is(t.matched[i],e.matched[s])&&Rd(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function Is(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function Rd(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!v_(n[e],t[e]))return!1;return!0}function v_(n,t){return An(n)?Ru(n,t):An(t)?Ru(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function Ru(n,t){return An(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function x_(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const di={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let fl=(function(n){return n.pop="pop",n.push="push",n})({}),ma=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function M_(n){if(!n)if(_s){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),m_(n)}const S_=/^[^#]+#/;function y_(n,t){return n.replace(S_,"#")+t}function E_(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const $o=()=>({left:window.scrollX,top:window.scrollY});function b_(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=E_(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Cu(n,t){return(history.state?history.state.position-t:-1)+n}const dl=new Map;function T_(n,t){dl.set(n,t)}function A_(n){const t=dl.get(n);return dl.delete(n),t}function w_(n){return typeof n=="string"||n&&typeof n=="object"}function Cd(n){return typeof n=="string"||typeof n=="symbol"}let pe=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Pd=Symbol("");pe.MATCHER_NOT_FOUND+"",pe.NAVIGATION_GUARD_REDIRECT+"",pe.NAVIGATION_ABORTED+"",pe.NAVIGATION_CANCELLED+"",pe.NAVIGATION_DUPLICATED+"";function Us(n,t){return te(new Error,{type:n,[Pd]:!0},t)}function Wn(n,t){return n instanceof Error&&Pd in n&&(t==null||!!(n.type&t))}const R_=["params","query","hash"];function C_(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of R_)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function P_(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(bd," "),r=s.indexOf("="),o=yr(r<0?s:s.slice(0,r)),a=r<0?null:yr(s.slice(r+1));if(o in t){let l=t[o];An(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function Pu(n){let t="";for(let e in n){const i=n[e];if(e=h_(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(An(i)?i.map(s=>s&&hl(s)):[i&&hl(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function D_(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=An(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const L_=Symbol(""),Du=Symbol(""),Zo=Symbol(""),Dd=Symbol(""),pl=Symbol("");function Zs(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function Si(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=f=>{f===!1?l(Us(pe.NAVIGATION_ABORTED,{from:e,to:t})):f instanceof Error?l(f):w_(f)?l(Us(pe.NAVIGATION_GUARD_REDIRECT,{from:t,to:f})):(o&&i.enterCallbacks[s]===o&&typeof f=="function"&&o.push(f),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let h=Promise.resolve(u);n.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function ga(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(yd(l)){const c=(l.__vccOpts||l)[t];c&&r.push(Si(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=t_(u)?u.default:u;o.mods[a]=u,o.components[a]=h;const f=(h.__vccOpts||h)[t];return f&&Si(f,e,i,o,a,s)()}))}}return r}function I_(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>Is(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>Is(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let U_=()=>location.protocol+"//"+location.host;function Ld(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),wu(a,"")}return wu(e,n)+i+s}function N_(n,t,e,i){let s=[],r=[],o=null;const a=({state:f})=>{const p=Ld(n,location),g=e.value,v=t.value;let m=0;if(f){if(e.value=p,t.value=f,o&&o===g){o=null;return}m=v?f.position-v.position:0}else i(p);s.forEach(d=>{d(e.value,g,{delta:m,type:fl.pop,direction:m?m>0?ma.forward:ma.back:ma.unknown})})};function l(){o=e.value}function c(f){s.push(f);const p=()=>{const g=s.indexOf(f);g>-1&&s.splice(g,1)};return r.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(te({},f.state,{scroll:$o()}),"")}}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:h}}function Lu(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?$o():null}}function O_(n){const{history:t,location:e}=window,i={value:Ld(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const h=n.indexOf("#"),f=h>-1?(e.host&&document.querySelector("base")?n:n.slice(h))+l:U_()+n+l;try{t[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(p){console.error(p),e[u?"replace":"assign"](f)}}function o(l,c){r(l,te({},t.state,Lu(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=te({},s.value,t.state,{forward:l,scroll:$o()});r(u.current,u,!0),r(l,te({},Lu(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function F_(n){n=M_(n);const t=O_(n),e=N_(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=te({location:"",base:n,go:i,createHref:y_.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function B_(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),F_(n)}let Vi=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var Ee=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(Ee||{});const z_={type:Vi.Static,value:""},H_=/[a-zA-Z0-9_]/;function V_(n){if(!n)return[[]];if(n==="/")return[[z_]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(p){throw new Error(`ERR (${e})/"${c}": ${p}`)}let e=Ee.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function h(){c&&(e===Ee.Static?r.push({type:Vi.Static,value:c}):e===Ee.Param||e===Ee.ParamRegExp||e===Ee.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:Vi.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==Ee.ParamRegExp){i=e,e=Ee.EscapeNext;continue}switch(e){case Ee.Static:l==="/"?(c&&h(),o()):l===":"?(h(),e=Ee.Param):f();break;case Ee.EscapeNext:f(),e=i;break;case Ee.Param:l==="("?e=Ee.ParamRegExp:H_.test(l)?f():(h(),e=Ee.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case Ee.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=Ee.ParamRegExpEnd:u+=l;break;case Ee.ParamRegExpEnd:h(),e=Ee.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===Ee.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),h(),o(),s}const Iu="[^/]+?",G_={sensitive:!1,strict:!1,start:!0,end:!0};var ke=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(ke||{});const k_=/[.+*?^${}()[\]/\\]/g;function W_(n,t){const e=te({},G_,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[ke.Root];e.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=ke.Segment+(e.sensitive?ke.BonusCaseSensitive:0);if(f.type===Vi.Static)h||(s+="/"),s+=f.value.replace(k_,"\\$&"),p+=ke.Static;else if(f.type===Vi.Param){const{value:g,repeatable:v,optional:m,regexp:d}=f;r.push({name:g,repeatable:v,optional:m});const S=d||Iu;if(S!==Iu){p+=ke.BonusCustomRegExp;try{`${S}`}catch(M){throw new Error(`Invalid custom RegExp for param "${g}" (${S}): `+M.message)}}let b=v?`((?:${S})(?:/(?:${S}))*)`:`(${S})`;h||(b=m&&c.length<2?`(?:/${b})`:"/"+b),m&&(b+="?"),s+=b,p+=ke.Dynamic,m&&(p+=ke.BonusOptional),v&&(p+=ke.BonusRepeatable),S===".*"&&(p+=ke.BonusWildcard)}u.push(p)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=ke.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",g=r[f-1];h[g.name]=p&&g.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of n){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===Vi.Static)u+=p.value;else if(p.type===Vi.Param){const{value:g,repeatable:v,optional:m}=p,d=g in c?c[g]:"";if(An(d)&&!v)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const S=An(d)?d.join("/"):d;if(!S)if(m)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${g}"`);u+=S}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function X_(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===ke.Static+ke.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===ke.Static+ke.Segment?1:-1:0}function Id(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=X_(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(Uu(i))return 1;if(Uu(s))return-1}return s.length-i.length}function Uu(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const q_={strict:!1,end:!0,sensitive:!1};function Y_(n,t,e){const i=W_(V_(n.path),e),s=te(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function j_(n,t){const e=[],i=new Map;t=Au(q_,t);function s(h){return i.get(h)}function r(h,f,p){const g=!p,v=Ou(h);v.aliasOf=p&&p.record;const m=Au(t,h),d=[v];if("alias"in h){const M=typeof h.alias=="string"?[h.alias]:h.alias;for(const F of M)d.push(Ou(te({},v,{components:p?p.record.components:v.components,path:F,aliasOf:p?p.record:v})))}let S,b;for(const M of d){const{path:F}=M;if(f&&F[0]!=="/"){const L=f.record.path,D=L[L.length-1]==="/"?"":"/";M.path=f.record.path+(F&&D+F)}if(S=Y_(M,f,m),p?p.alias.push(S):(b=b||S,b!==S&&b.alias.push(S),g&&h.name&&!Fu(S)&&o(h.name)),Ud(S)&&l(S),v.children){const L=v.children;for(let D=0;D<L.length;D++)r(L[D],S,p&&p.children[D])}p=p||S}return b?()=>{o(b)}:mr}function o(h){if(Cd(h)){const f=i.get(h);f&&(i.delete(h),e.splice(e.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=e.indexOf(h);f>-1&&(e.splice(f,1),h.record.name&&i.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return e}function l(h){const f=Z_(h,e);e.splice(f,0,h),h.record.name&&!Fu(h)&&i.set(h.record.name,h)}function c(h,f){let p,g={},v,m;if("name"in h&&h.name){if(p=i.get(h.name),!p)throw Us(pe.MATCHER_NOT_FOUND,{location:h});m=p.record.name,g=te(Nu(f.params,p.keys.filter(b=>!b.optional).concat(p.parent?p.parent.keys.filter(b=>b.optional):[]).map(b=>b.name)),h.params&&Nu(h.params,p.keys.map(b=>b.name))),v=p.stringify(g)}else if(h.path!=null)v=h.path,p=e.find(b=>b.re.test(v)),p&&(g=p.parse(v),m=p.record.name);else{if(p=f.name?i.get(f.name):e.find(b=>b.re.test(f.path)),!p)throw Us(pe.MATCHER_NOT_FOUND,{location:h,currentLocation:f});m=p.record.name,g=te({},f.params,h.params),v=p.stringify(g)}const d=[];let S=p;for(;S;)d.unshift(S.record),S=S.parent;return{name:m,path:v,params:g,matched:d,meta:$_(d)}}n.forEach(h=>r(h));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Nu(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function Ou(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:K_(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function K_(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function Fu(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function $_(n){return n.reduce((t,e)=>te(t,e.meta),{})}function Z_(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Id(n,t[r])<0?i=r:e=r+1}const s=J_(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function J_(n){let t=n;for(;t=t.parent;)if(Ud(t)&&Id(n,t)===0)return t}function Ud({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Bu(n){const t=On(Zo),e=On(Dd),i=Me(()=>{const l=ii(n.to);return t.resolve(l)}),s=Me(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],h=e.matched;if(!u||!h.length)return-1;const f=h.findIndex(Is.bind(null,u));if(f>-1)return f;const p=zu(l[c-2]);return c>1&&zu(u)===p&&h[h.length-1].path!==p?h.findIndex(Is.bind(null,l[c-2])):f}),r=Me(()=>s.value>-1&&iv(e.params,i.value.params)),o=Me(()=>s.value>-1&&s.value===e.matched.length-1&&Rd(e.params,i.value.params));function a(l={}){if(nv(l)){const c=t[ii(n.replace)?"replace":"push"](ii(n.to)).catch(mr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Me(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function Q_(n){return n.length===1?n[0]:n}const tv=Xo({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Bu,setup(n,{slots:t}){const e=ko(Bu(n)),{options:i}=On(Zo),s=Me(()=>({[Hu(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[Hu(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&Q_(t.default(e));return n.custom?r:xd("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),ev=tv;function nv(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function iv(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!An(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function zu(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Hu=(n,t,e)=>n??t??e,sv=Xo({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=On(pl),s=Me(()=>n.route||i.value),r=On(Du,0),o=Me(()=>{let c=ii(r);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=Me(()=>s.value.matched[o.value]);uo(Du,Me(()=>o.value+1)),uo(L_,a),uo(pl,s);const l=Ue();return Xi(()=>[l.value,a.value,n.name],([c,u,h],[f,p,g])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Is(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(v=>v(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,h=a.value,f=h&&h.components[u];if(!f)return Vu(e.default,{Component:f,route:c});const p=h.props[u],g=p?p===!0?c.params:typeof p=="function"?p(c):p:null,m=xd(f,te({},g,t,{onVnodeUnmounted:d=>{d.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return Vu(e.default,{Component:m,route:c})||m}}});function Vu(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const rv=sv;function ov(n){const t=j_(n.routes,n),e=n.parseQuery||P_,i=n.stringifyQuery||Pu,s=n.history,r=Zs(),o=Zs(),a=Zs(),l=il(di);let c=di;_s&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=da.bind(null,R=>""+R),h=da.bind(null,d_),f=da.bind(null,yr);function p(R,$){let Z,ot;return Cd(R)?(Z=t.getRecordMatcher(R),ot=$):ot=R,t.addRoute(ot,Z)}function g(R){const $=t.getRecordMatcher(R);$&&t.removeRoute($)}function v(){return t.getRoutes().map(R=>R.record)}function m(R){return!!t.getRecordMatcher(R)}function d(R,$){if($=te({},$||l.value),typeof R=="string"){const y=pa(e,R,$.path),it=t.resolve({path:y.path},$),U=s.createHref(y.fullPath);return te(y,it,{params:f(it.params),hash:yr(y.hash),redirectedFrom:void 0,href:U})}let Z;if(R.path!=null)Z=te({},R,{path:pa(e,R.path,$.path).path});else{const y=te({},R.params);for(const it in y)y[it]==null&&delete y[it];Z=te({},R,{params:h(y)}),$.params=h($.params)}const ot=t.resolve(Z,$),Et=R.hash||"";ot.params=u(f(ot.params));const w=g_(i,te({},R,{hash:u_(Et),path:ot.path})),C=s.createHref(w);return te({fullPath:w,hash:Et,query:i===Pu?D_(R.query):R.query||{}},ot,{redirectedFrom:void 0,href:C})}function S(R){return typeof R=="string"?pa(e,R,l.value.path):te({},R)}function b(R,$){if(c!==R)return Us(pe.NAVIGATION_CANCELLED,{from:$,to:R})}function M(R){return D(R)}function F(R){return M(te(S(R),{replace:!0}))}function L(R,$){const Z=R.matched[R.matched.length-1];if(Z&&Z.redirect){const{redirect:ot}=Z;let Et=typeof ot=="function"?ot(R,$):ot;return typeof Et=="string"&&(Et=Et.includes("?")||Et.includes("#")?Et=S(Et):{path:Et},Et.params={}),te({query:R.query,hash:R.hash,params:Et.path!=null?{}:R.params},Et)}}function D(R,$){const Z=c=d(R),ot=l.value,Et=R.state,w=R.force,C=R.replace===!0,y=L(Z,ot);if(y)return D(te(S(y),{state:typeof y=="object"?te({},Et,y.state):Et,force:w,replace:C}),$||Z);const it=Z;it.redirectedFrom=$;let U;return!w&&__(i,ot,Z)&&(U=Us(pe.NAVIGATION_DUPLICATED,{to:it,from:ot}),At(ot,ot,!0,!1)),(U?Promise.resolve(U):E(it,ot)).catch(N=>Wn(N)?Wn(N,pe.NAVIGATION_GUARD_REDIRECT)?N:Mt(N):Y(N,it,ot)).then(N=>{if(N){if(Wn(N,pe.NAVIGATION_GUARD_REDIRECT))return D(te({replace:C},S(N.to),{state:typeof N.to=="object"?te({},Et,N.to.state):Et,force:w}),$||it)}else N=tt(it,ot,!0,C,Et);return I(it,ot,N),N})}function O(R,$){const Z=b(R,$);return Z?Promise.reject(Z):Promise.resolve()}function A(R){const $=st.values().next().value;return $&&typeof $.runWithContext=="function"?$.runWithContext(R):R()}function E(R,$){let Z;const[ot,Et,w]=I_(R,$);Z=ga(ot.reverse(),"beforeRouteLeave",R,$);for(const y of ot)y.leaveGuards.forEach(it=>{Z.push(Si(it,R,$))});const C=O.bind(null,R,$);return Z.push(C),ct(Z).then(()=>{Z=[];for(const y of r.list())Z.push(Si(y,R,$));return Z.push(C),ct(Z)}).then(()=>{Z=ga(Et,"beforeRouteUpdate",R,$);for(const y of Et)y.updateGuards.forEach(it=>{Z.push(Si(it,R,$))});return Z.push(C),ct(Z)}).then(()=>{Z=[];for(const y of w)if(y.beforeEnter)if(An(y.beforeEnter))for(const it of y.beforeEnter)Z.push(Si(it,R,$));else Z.push(Si(y.beforeEnter,R,$));return Z.push(C),ct(Z)}).then(()=>(R.matched.forEach(y=>y.enterCallbacks={}),Z=ga(w,"beforeRouteEnter",R,$,A),Z.push(C),ct(Z))).then(()=>{Z=[];for(const y of o.list())Z.push(Si(y,R,$));return Z.push(C),ct(Z)}).catch(y=>Wn(y,pe.NAVIGATION_CANCELLED)?y:Promise.reject(y))}function I(R,$,Z){a.list().forEach(ot=>A(()=>ot(R,$,Z)))}function tt(R,$,Z,ot,Et){const w=b(R,$);if(w)return w;const C=$===di,y=_s?history.state:{};Z&&(ot||C?s.replace(R.fullPath,te({scroll:C&&y&&y.scroll},Et)):s.push(R.fullPath,Et)),l.value=R,At(R,$,Z,C),Mt()}let j;function ut(){j||(j=s.listen((R,$,Z)=>{if(!mt.listening)return;const ot=d(R),Et=L(ot,mt.currentRoute.value);if(Et){D(te(Et,{replace:!0,force:!0}),ot).catch(mr);return}c=ot;const w=l.value;_s&&T_(Cu(w.fullPath,Z.delta),$o()),E(ot,w).catch(C=>Wn(C,pe.NAVIGATION_ABORTED|pe.NAVIGATION_CANCELLED)?C:Wn(C,pe.NAVIGATION_GUARD_REDIRECT)?(D(te(S(C.to),{force:!0}),ot).then(y=>{Wn(y,pe.NAVIGATION_ABORTED|pe.NAVIGATION_DUPLICATED)&&!Z.delta&&Z.type===fl.pop&&s.go(-1,!1)}).catch(mr),Promise.reject()):(Z.delta&&s.go(-Z.delta,!1),Y(C,ot,w))).then(C=>{C=C||tt(ot,w,!1),C&&(Z.delta&&!Wn(C,pe.NAVIGATION_CANCELLED)?s.go(-Z.delta,!1):Z.type===fl.pop&&Wn(C,pe.NAVIGATION_ABORTED|pe.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),I(ot,w,C)}).catch(mr)}))}let at=Zs(),et=Zs(),nt;function Y(R,$,Z){Mt(R);const ot=et.list();return ot.length?ot.forEach(Et=>Et(R,$,Z)):console.error(R),Promise.reject(R)}function gt(){return nt&&l.value!==di?Promise.resolve():new Promise((R,$)=>{at.add([R,$])})}function Mt(R){return nt||(nt=!R,ut(),at.list().forEach(([$,Z])=>R?Z(R):$()),at.reset()),R}function At(R,$,Z,ot){const{scrollBehavior:Et}=n;if(!_s||!Et)return Promise.resolve();const w=!Z&&A_(Cu(R.fullPath,0))||(ot||!Z)&&history.state&&history.state.scroll||null;return _c().then(()=>Et(R,$,w)).then(C=>C&&b_(C)).catch(C=>Y(C,R,$))}const Ut=R=>s.go(R);let jt;const st=new Set,mt={currentRoute:l,listening:!0,addRoute:p,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:v,resolve:d,options:n,push:M,replace:F,go:Ut,back:()=>Ut(-1),forward:()=>Ut(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:et.add,isReady:gt,install(R){R.component("RouterLink",ev),R.component("RouterView",rv),R.config.globalProperties.$router=mt,Object.defineProperty(R.config.globalProperties,"$route",{enumerable:!0,get:()=>ii(l)}),_s&&!jt&&l.value===di&&(jt=!0,M(s.location).catch(ot=>{}));const $={};for(const ot in di)Object.defineProperty($,ot,{get:()=>l.value[ot],enumerable:!0});R.provide(Zo,mt),R.provide(Dd,Nf($)),R.provide(pl,l);const Z=R.unmount;st.add(R),R.unmount=function(){st.delete(R),st.size<1&&(c=di,j&&j(),j=null,l.value=di,jt=!1,nt=!1),Z()}}};function ct(R){return R.reduce(($,Z)=>$.then(()=>A(Z)),Promise.resolve())}return mt}function Nd(){return On(Zo)}const _a=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],ml="galaxy_majors";function Od(){var e;const n={type:"close",source:"galaxy-h5"},t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}const av={class:"select-page"},lv={class:"picked","aria-live":"polite"},cv={class:"picked-row"},uv={class:"value"},hv={class:"picked-row"},fv={class:"value"},dv={class:"grid"},pv=["onClick"],mv={class:"card-title"},gv={class:"card-tag"},_v={class:"footer"},vv=["disabled"],xv={key:0,class:"toast",role:"status"},Mv=Xo({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=Nd(),i=Ue(null),s=Ue(null),r=Ue(""),o=Me(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(h){r.value=h,window.setTimeout(()=>{r.value=""},1800)}function l(h){if(h===i.value){i.value=null;return}if(h===s.value){s.value=null;return}if(!i.value){i.value=h;return}if(!s.value){if(h===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=h;return}s.value=h}function c(){if(!o.value)return;const h={fromId:i.value,toId:s.value};sessionStorage.setItem(ml,JSON.stringify(h)),e.push({name:"galaxy"})}function u(){Od()}return(h,f)=>{var p,g;return ve(),be("div",av,[f[4]||(f[4]=Ft("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),Ft("div",{class:"custom-nav"},[Ft("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[Ft("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),f[0]||(f[0]=Ft("div",{class:"nav-title"},"专业星系",-1)),f[1]||(f[1]=Ft("div",{class:"nav-right"},null,-1))]),f[5]||(f[5]=hg('<div class="nav-spacer" data-v-500dcac5></div><header class="header" data-v-500dcac5><p class="eyebrow" data-v-500dcac5>专业交叉星系</p><h1 class="title" data-v-500dcac5>选择你的星域</h1><p class="subtitle" data-v-500dcac5>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),Ft("section",lv,[Ft("div",cv,[f[2]||(f[2]=Ft("span",{class:"label"},"主修 / 起点",-1)),Ft("span",uv,Ne(i.value?(p=ii(_a).find(v=>v.id===i.value))==null?void 0:p.label:"未选择"),1)]),Ft("div",hv,[f[3]||(f[3]=Ft("span",{class:"label"},"交叉意向",-1)),Ft("span",fv,Ne(s.value?(g=ii(_a).find(v=>v.id===s.value))==null?void 0:g.label:"未选择"),1)])]),Ft("div",dv,[(ve(!0),be(rn,null,sl(ii(_a),v=>(ve(),be("button",{key:v.id,type:"button",class:Vo(["card",{"is-from":v.id===i.value,"is-to":v.id===s.value}]),onClick:m=>l(v.id)},[Ft("span",mv,Ne(v.label),1),Ft("span",gv,Ne(v.tagline),1)],10,pv))),128))]),Ft("footer",_v,[Ft("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,vv)]),r.value?(ve(),be("div",xv,Ne(r.value),1)):gs("",!0)])}}}),Sv=Ec(Mv,[["__scopeId","data-v-500dcac5"]]);function yv(){if(typeof window<"u"){const n=window.__GALAXY_API_BASE__;if(n!=null&&String(n).trim()!=="")return String(n).trim().replace(/\/+$/,"")}return"./mock"}function vs(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function Gu(n="/mock"){const t=vs("manifest.json",n),e=await fetch(t).then(h=>{if(!h.ok)throw new Error(`manifest ${h.status}`);return h.json()}),i=vs(e.nodes_url,n),s=vs(e.edges_url,n),r=vs(e.hyperedges_url,n),o=vs(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(h=>{if(!h.ok)throw new Error(`nodes ${h.status}`);return h.json()}),fetch(s).then(h=>{if(!h.ok)throw new Error(`edges ${h.status}`);return h.json()}),fetch(r).then(h=>{if(!h.ok)throw new Error(`hyperedges ${h.status}`);return h.json()}),fetch(o).then(h=>{if(!h.ok)throw new Error(`layout ${h.status}`);return h.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function ku(n="/mock"){const t=vs("recommend.json",n),e=await fetch(t);if(!e.ok)throw new Error(`recommend ${e.status}`);return e.json()}function Ev(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function va(n,t){const e=[],i=new Set;for(const s of t)if(s.member_node_ids.includes(n)){e.push(s.id);for(const r of s.member_node_ids)i.add(r)}return{hyperedgeIds:e,memberIds:i}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Tc="170",As={ROTATE:0,DOLLY:1,PAN:2},xs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bv=0,Wu=1,Tv=2,Fd=1,Av=2,$n=3,wi=0,tn=1,Un=2,si=0,ws=1,Rs=2,Xu=3,qu=4,wv=5,zi=100,Rv=101,Cv=102,Pv=103,Dv=104,Lv=200,Iv=201,Uv=202,Nv=203,gl=204,_l=205,Ov=206,Fv=207,Bv=208,zv=209,Hv=210,Vv=211,Gv=212,kv=213,Wv=214,vl=0,xl=1,Ml=2,Ns=3,Sl=4,yl=5,El=6,bl=7,Bd=0,Xv=1,qv=2,Ti=0,zd=1,Hd=2,Vd=3,Ac=4,Yv=5,Gd=6,kd=7,Wd=300,Os=301,Fs=302,Tl=303,Al=304,Jo=306,Er=1e3,Gi=1001,wl=1002,ln=1003,jv=1004,Fr=1005,yn=1006,xa=1007,bi=1008,zn=1009,Xd=1010,qd=1011,br=1012,wc=1013,qi=1014,ei=1015,ri=1016,Rc=1017,Cc=1018,Bs=1020,Yd=35902,jd=1021,Kd=1022,fn=1023,$d=1024,Zd=1025,Cs=1026,zs=1027,Jd=1028,Pc=1029,Qd=1030,Dc=1031,Lc=1033,po=33776,mo=33777,go=33778,_o=33779,Rl=35840,Cl=35841,Pl=35842,Dl=35843,Ll=36196,Il=37492,Ul=37496,Nl=37808,Ol=37809,Fl=37810,Bl=37811,zl=37812,Hl=37813,Vl=37814,Gl=37815,kl=37816,Wl=37817,Xl=37818,ql=37819,Yl=37820,jl=37821,vo=36492,Kl=36494,$l=36495,tp=36283,Zl=36284,Jl=36285,Ql=36286,Kv=3200,$v=3201,ep=0,Zv=1,Ei="",Je="srgb",Gs="srgb-linear",Qo="linear",se="srgb",ts=7680,Yu=519,Jv=512,Qv=513,t0=514,np=515,e0=516,n0=517,i0=518,s0=519,ju=35044,Ku="300 es",ni=2e3,Po=2001;class $i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xo=Math.PI/180,tc=180/Math.PI;function Cr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Xe(n,t,e){return Math.max(t,Math.min(e,n))}function r0(n,t){return(n%t+t)%t}function Ma(n,t,e){return(1-e)*n+e*t}function Js(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ke(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const o0={DEG2RAD:xo};class It{constructor(t=0,e=0){It.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,i,s,r,o,a,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],v=s[0],m=s[3],d=s[6],S=s[1],b=s[4],M=s[7],F=s[2],L=s[5],D=s[8];return r[0]=o*v+a*S+l*F,r[3]=o*m+a*b+l*L,r[6]=o*d+a*M+l*D,r[1]=c*v+u*S+h*F,r[4]=c*m+u*b+h*L,r[7]=c*d+u*M+h*D,r[2]=f*v+p*S+g*F,r[5]=f*m+p*b+g*L,r[8]=f*d+p*M+g*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,p=c*r-o*l,g=e*h+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=h*v,t[1]=(s*c-u*i)*v,t[2]=(a*i-s*o)*v,t[3]=f*v,t[4]=(u*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=p*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Sa.makeScale(t,e)),this}rotate(t){return this.premultiply(Sa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Sa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Sa=new qt;function ip(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Do(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function a0(){const n=Do("canvas");return n.style.display="block",n}const $u={};function or(n){n in $u||($u[n]=!0,console.warn(n))}function l0(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function c0(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function u0(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kt={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(n.r=oi(n.r),n.g=oi(n.g),n.b=oi(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(n.r=Ps(n.r),n.g=Ps(n.g),n.b=Ps(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ei?Qo:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function oi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ps(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Zu=[.64,.33,.3,.6,.15,.06],Ju=[.2126,.7152,.0722],Qu=[.3127,.329],th=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eh=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[Gs]:{primaries:Zu,whitePoint:Qu,transfer:Qo,toXYZ:th,fromXYZ:eh,luminanceCoefficients:Ju,workingColorSpaceConfig:{unpackColorSpace:Je},outputColorSpaceConfig:{drawingBufferColorSpace:Je}},[Je]:{primaries:Zu,whitePoint:Qu,transfer:se,toXYZ:th,fromXYZ:eh,luminanceCoefficients:Ju,outputColorSpaceConfig:{drawingBufferColorSpace:Je}}});let es;class h0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{es===void 0&&(es=Do("canvas")),es.width=t.width,es.height=t.height;const i=es.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=es}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Do("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(oi(e[i]/255)*255):e[i]=oi(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let f0=0;class sp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Cr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ya(s[o].image)):r.push(ya(s[o]))}else r=ya(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ya(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?h0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let d0=0;class Ye extends $i{constructor(t=Ye.DEFAULT_IMAGE,e=Ye.DEFAULT_MAPPING,i=Gi,s=Gi,r=yn,o=bi,a=fn,l=zn,c=Ye.DEFAULT_ANISOTROPY,u=Ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Cr(),this.name="",this.source=new sp(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Wd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Er:t.x=t.x-Math.floor(t.x);break;case Gi:t.x=t.x<0?0:1;break;case wl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Er:t.y=t.y-Math.floor(t.y);break;case Gi:t.y=t.y<0?0:1;break;case wl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ye.DEFAULT_IMAGE=null;Ye.DEFAULT_MAPPING=Wd;Ye.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,i=0,s=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],v=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,M=(p+1)/2,F=(d+1)/2,L=(u+f)/4,D=(h+v)/4,O=(g+m)/4;return b>M&&b>F?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=L/i,r=D/i):M>F?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=L/s,r=O/s):F<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),i=D/r,s=O/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-v)/S,this.z=(f-u)/S,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class p0 extends $i{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ye(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new sp(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends p0{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class rp extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class m0 extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=v;return}if(h!==v||l!==f||c!==p||u!==g){let m=1-a;const d=l*f+c*p+u*g+h*v,S=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const F=Math.sqrt(b),L=Math.atan2(F,d*S);m=Math.sin(m*L)/F,a=Math.sin(a*L)/F}const M=a*S;if(l=l*m+f*M,c=c*m+p*M,u=u*m+g*M,h=h*m+v*M,m===1-a){const F=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=F,c*=F,u*=F,h*=F}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-a*p,t[e+2]=c*g+u*p+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,i=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ea.copy(this).projectOnVector(t),this.sub(Ea)}reflect(t){return this.sub(Ea.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ea=new z,nh=new Yi;class ji{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(_n.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(_n.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=_n.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,_n):_n.fromBufferAttribute(r,o),_n.applyMatrix4(t.matrixWorld),this.expandByPoint(_n);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Br.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Br.copy(i.boundingBox)),Br.applyMatrix4(t.matrixWorld),this.union(Br)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,_n),_n.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qs),zr.subVectors(this.max,Qs),ns.subVectors(t.a,Qs),is.subVectors(t.b,Qs),ss.subVectors(t.c,Qs),pi.subVectors(is,ns),mi.subVectors(ss,is),Di.subVectors(ns,ss);let e=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Di.z,Di.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Di.z,0,-Di.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Di.y,Di.x,0];return!ba(e,ns,is,ss,zr)||(e=[1,0,0,0,1,0,0,0,1],!ba(e,ns,is,ss,zr))?!1:(Hr.crossVectors(pi,mi),e=[Hr.x,Hr.y,Hr.z],ba(e,ns,is,ss,zr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,_n).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(_n).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Xn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Xn=[new z,new z,new z,new z,new z,new z,new z,new z],_n=new z,Br=new ji,ns=new z,is=new z,ss=new z,pi=new z,mi=new z,Di=new z,Qs=new z,zr=new z,Hr=new z,Li=new z;function ba(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Li.fromArray(n,r);const a=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),l=t.dot(Li),c=e.dot(Li),u=i.dot(Li);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const g0=new ji,tr=new z,Ta=new z;class ks{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):g0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;tr.subVectors(t,this.center);const e=tr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(tr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ta.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(tr.copy(t.center).add(Ta)),this.expandByPoint(tr.copy(t.center).sub(Ta))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qn=new z,Aa=new z,Vr=new z,gi=new z,wa=new z,Gr=new z,Ra=new z;class Pr{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(qn.copy(this.origin).addScaledVector(this.direction,e),qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Aa.copy(t).add(e).multiplyScalar(.5),Vr.copy(e).sub(t).normalize(),gi.copy(this.origin).sub(Aa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Vr),a=gi.dot(this.direction),l=-gi.dot(Vr),c=gi.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const v=1/u;h*=v,f*=v,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Aa).addScaledVector(Vr,f),p}intersectSphere(t,e){qn.subVectors(t.center,this.origin);const i=qn.dot(this.direction),s=qn.dot(qn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,qn)!==null}intersectTriangle(t,e,i,s,r){wa.subVectors(e,t),Gr.subVectors(i,t),Ra.crossVectors(wa,Gr);let o=this.direction.dot(Ra),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gi.subVectors(this.origin,t);const l=a*this.direction.dot(Gr.crossVectors(gi,Gr));if(l<0)return null;const c=a*this.direction.dot(wa.cross(gi));if(c<0||l+c>o)return null;const u=-a*gi.dot(Ra);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class le{constructor(t,e,i,s,r,o,a,l,c,u,h,f,p,g,v,m){le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,v,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,v,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=v,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new le().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/rs.setFromMatrixColumn(t,0).length(),r=1/rs.setFromMatrixColumn(t,1).length(),o=1/rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*h,g=a*u,v=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-v*c,e[9]=-a*l,e[2]=v-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,v=c*h;e[0]=f+v*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=v+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,v=c*h;e[0]=f-v*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=v-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,g=a*u,v=a*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+v,e[1]=l*h,e[5]=v*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=v-f*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-v*h}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,v=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+v,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=v*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_0,t,v0)}lookAt(t,e,i){const s=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),_i.crossVectors(i,nn),_i.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),_i.crossVectors(i,nn)),_i.normalize(),kr.crossVectors(nn,_i),s[0]=_i.x,s[4]=kr.x,s[8]=nn.x,s[1]=_i.y,s[5]=kr.y,s[9]=nn.y,s[2]=_i.z,s[6]=kr.z,s[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],v=i[6],m=i[10],d=i[14],S=i[3],b=i[7],M=i[11],F=i[15],L=s[0],D=s[4],O=s[8],A=s[12],E=s[1],I=s[5],tt=s[9],j=s[13],ut=s[2],at=s[6],et=s[10],nt=s[14],Y=s[3],gt=s[7],Mt=s[11],At=s[15];return r[0]=o*L+a*E+l*ut+c*Y,r[4]=o*D+a*I+l*at+c*gt,r[8]=o*O+a*tt+l*et+c*Mt,r[12]=o*A+a*j+l*nt+c*At,r[1]=u*L+h*E+f*ut+p*Y,r[5]=u*D+h*I+f*at+p*gt,r[9]=u*O+h*tt+f*et+p*Mt,r[13]=u*A+h*j+f*nt+p*At,r[2]=g*L+v*E+m*ut+d*Y,r[6]=g*D+v*I+m*at+d*gt,r[10]=g*O+v*tt+m*et+d*Mt,r[14]=g*A+v*j+m*nt+d*At,r[3]=S*L+b*E+M*ut+F*Y,r[7]=S*D+b*I+M*at+F*gt,r[11]=S*O+b*tt+M*et+F*Mt,r[15]=S*A+b*j+M*nt+F*At,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],v=t[7],m=t[11],d=t[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*p-i*l*p)+v*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+e*c*h-e*a*p-r*o*h+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],v=t[13],m=t[14],d=t[15],S=h*m*c-v*f*c+v*l*p-a*m*p-h*l*d+a*f*d,b=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,M=u*v*c-g*h*c+g*a*p-o*v*p-u*a*d+o*h*d,F=g*h*l-u*v*l-g*a*f+o*v*f+u*a*m-o*h*m,L=e*S+i*b+s*M+r*F;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/L;return t[0]=S*D,t[1]=(v*f*r-h*m*r-v*s*p+i*m*p+h*s*d-i*f*d)*D,t[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*d+i*l*d)*D,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*p-i*l*p)*D,t[4]=b*D,t[5]=(u*m*r-g*f*r+g*s*p-e*m*p-u*s*d+e*f*d)*D,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*D,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*p+e*l*p)*D,t[8]=M*D,t[9]=(g*h*r-u*v*r-g*i*p+e*v*p+u*i*d-e*h*d)*D,t[10]=(o*v*r-g*a*r+g*i*c-e*v*c-o*i*d+e*a*d)*D,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*p-e*a*p)*D,t[12]=F*D,t[13]=(u*v*s-g*h*s+g*i*f-e*v*f-u*i*m+e*h*m)*D,t[14]=(g*a*s-o*v*s-g*i*l+e*v*l+o*i*m-e*a*m)*D,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*D,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,p=r*u,g=r*h,v=o*u,m=o*h,d=a*h,S=l*c,b=l*u,M=l*h,F=i.x,L=i.y,D=i.z;return s[0]=(1-(v+d))*F,s[1]=(p+M)*F,s[2]=(g-b)*F,s[3]=0,s[4]=(p-M)*L,s[5]=(1-(f+d))*L,s[6]=(m+S)*L,s[7]=0,s[8]=(g+b)*D,s[9]=(m-S)*D,s[10]=(1-(f+v))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=rs.set(s[0],s[1],s[2]).length();const o=rs.set(s[4],s[5],s[6]).length(),a=rs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],vn.copy(this);const c=1/r,u=1/o,h=1/a;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=h,vn.elements[9]*=h,vn.elements[10]*=h,e.setFromRotationMatrix(vn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ni){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let p,g;if(a===ni)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Po)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ni){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(o-r),f=(e+t)*c,p=(i+s)*u;let g,v;if(a===ni)g=(o+r)*h,v=-2*h;else if(a===Po)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const rs=new z,vn=new le,_0=new z(0,0,0),v0=new z(1,1,1),_i=new z,kr=new z,nn=new z,ih=new le,sh=new Yi;class Hn{constructor(t=0,e=0,i=0,s=Hn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ih.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ih,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sh.setFromEuler(this),this.setFromQuaternion(sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hn.DEFAULT_ORDER="XYZ";class Ic{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let x0=0;const rh=new z,os=new Yi,Yn=new le,Wr=new z,er=new z,M0=new z,S0=new Yi,oh=new z(1,0,0),ah=new z(0,1,0),lh=new z(0,0,1),ch={type:"added"},y0={type:"removed"},as={type:"childadded",child:null},Ca={type:"childremoved",child:null};class Se extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=Cr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Se.DEFAULT_UP.clone();const t=new z,e=new Hn,i=new Yi,s=new z(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new qt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=Se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.multiply(os),this}rotateOnWorldAxis(t,e){return os.setFromAxisAngle(t,e),this.quaternion.premultiply(os),this}rotateX(t){return this.rotateOnAxis(oh,t)}rotateY(t){return this.rotateOnAxis(ah,t)}rotateZ(t){return this.rotateOnAxis(lh,t)}translateOnAxis(t,e){return rh.copy(t).applyQuaternion(this.quaternion),this.position.add(rh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oh,t)}translateY(t){return this.translateOnAxis(ah,t)}translateZ(t){return this.translateOnAxis(lh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Wr.copy(t):Wr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(er,Wr,this.up):Yn.lookAt(Wr,er,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),os.setFromRotationMatrix(Yn),this.quaternion.premultiply(os.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ch),as.child=t,this.dispatchEvent(as),as.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(y0),Ca.child=t,this.dispatchEvent(Ca),Ca.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ch),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,t,M0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,S0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Se.DEFAULT_UP=new z(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new z,jn=new z,Pa=new z,Kn=new z,ls=new z,cs=new z,uh=new z,Da=new z,La=new z,Ia=new z,Ua=new me,Na=new me,Oa=new me;class Sn{constructor(t=new z,e=new z,i=new z){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),xn.subVectors(t,e),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){xn.subVectors(s,e),jn.subVectors(i,e),Pa.subVectors(t,e);const o=xn.dot(xn),a=xn.dot(jn),l=xn.dot(Pa),c=jn.dot(jn),u=jn.dot(Pa),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Kn.x),l.addScaledVector(o,Kn.y),l.addScaledVector(a,Kn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Ua.setScalar(0),Na.setScalar(0),Oa.setScalar(0),Ua.fromBufferAttribute(t,e),Na.fromBufferAttribute(t,i),Oa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ua,r.x),o.addScaledVector(Na,r.y),o.addScaledVector(Oa,r.z),o}static isFrontFacing(t,e,i,s){return xn.subVectors(i,e),jn.subVectors(t,e),xn.cross(jn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),xn.cross(jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Sn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ls.subVectors(s,i),cs.subVectors(r,i),Da.subVectors(t,i);const l=ls.dot(Da),c=cs.dot(Da);if(l<=0&&c<=0)return e.copy(i);La.subVectors(t,s);const u=ls.dot(La),h=cs.dot(La);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(ls,o);Ia.subVectors(t,r);const p=ls.dot(Ia),g=cs.dot(Ia);if(g>=0&&p<=g)return e.copy(r);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(cs,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return uh.subVectors(r,s),a=(h-u)/(h-u+(p-g)),e.copy(s).addScaledVector(uh,a);const d=1/(m+v+f);return o=v*d,a=f*d,e.copy(i).addScaledVector(ls,o).addScaledVector(cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function Fa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class kt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Je){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=r0(t,1),e=Xe(e,0,1),i=Xe(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Fa(o,r,t+1/3),this.g=Fa(o,r,t),this.b=Fa(o,r,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=Je){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Je){const i=op[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oi(t.r),this.g=oi(t.g),this.b=oi(t.b),this}copyLinearToSRGB(t){return this.r=Ps(t.r),this.g=Ps(t.g),this.b=Ps(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Je){return Kt.fromWorkingColorSpace(Ie.copy(this),t),Math.round(Xe(Ie.r*255,0,255))*65536+Math.round(Xe(Ie.g*255,0,255))*256+Math.round(Xe(Ie.b*255,0,255))}getHexString(t=Je){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Ie.copy(this),e);const i=Ie.r,s=Ie.g,r=Ie.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Je){Kt.fromWorkingColorSpace(Ie.copy(this),t);const e=Ie.r,i=Ie.g,s=Ie.b;return t!==Je?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(vi),this.setHSL(vi.h+t,vi.s+e,vi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(vi),t.getHSL(Xr);const i=Ma(vi.h,Xr.h,e),s=Ma(vi.s,Xr.s,e),r=Ma(vi.l,Xr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new kt;kt.NAMES=op;let E0=0;class Zi extends $i{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=Cr(),this.name="",this.blending=ws,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=gl,this.blendDst=_l,this.blendEquation=zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ts,this.stencilZFail=ts,this.stencilZPass=ts,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ws&&(i.blending=this.blending),this.side!==wi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==gl&&(i.blendSrc=this.blendSrc),this.blendDst!==_l&&(i.blendDst=this.blendDst),this.blendEquation!==zi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ts&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ts&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ts&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Mn extends Zi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=Bd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xe=new z,qr=new It;class pn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ju,this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)qr.fromBufferAttribute(this,e),qr.applyMatrix3(t),this.setXY(e,qr.x,qr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Js(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ke(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Js(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Js(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Js(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Js(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),i=Ke(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),i=Ke(i,this.array),s=Ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),i=Ke(i,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ju&&(t.usage=this.usage),t}}class ap extends pn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class lp extends pn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class _e extends pn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let b0=0;const un=new le,Ba=new Se,us=new z,sn=new ji,nr=new ji,we=new z;class He extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=Cr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ip(t)?lp:ap)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return un.makeRotationFromQuaternion(t),this.applyMatrix4(un),this}rotateX(t){return un.makeRotationX(t),this.applyMatrix4(un),this}rotateY(t){return un.makeRotationY(t),this.applyMatrix4(un),this}rotateZ(t){return un.makeRotationZ(t),this.applyMatrix4(un),this}translate(t,e,i){return un.makeTranslation(t,e,i),this.applyMatrix4(un),this}scale(t,e,i){return un.makeScale(t,e,i),this.applyMatrix4(un),this}lookAt(t){return Ba.lookAt(t),Ba.updateMatrix(),this.applyMatrix4(Ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new _e(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ks);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];nr.setFromBufferAttribute(a),this.morphTargetsRelative?(we.addVectors(sn.min,nr.min),sn.expandByPoint(we),we.addVectors(sn.max,nr.max),sn.expandByPoint(we)):(sn.expandByPoint(nr.min),sn.expandByPoint(nr.max))}sn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)we.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(we));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)we.fromBufferAttribute(a,c),l&&(us.fromBufferAttribute(t,c),we.add(us)),s=Math.max(s,i.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let O=0;O<i.count;O++)a[O]=new z,l[O]=new z;const c=new z,u=new z,h=new z,f=new It,p=new It,g=new It,v=new z,m=new z;function d(O,A,E){c.fromBufferAttribute(i,O),u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,E),f.fromBufferAttribute(r,O),p.fromBufferAttribute(r,A),g.fromBufferAttribute(r,E),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(I),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(I),a[O].add(v),a[A].add(v),a[E].add(v),l[O].add(m),l[A].add(m),l[E].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let O=0,A=S.length;O<A;++O){const E=S[O],I=E.start,tt=E.count;for(let j=I,ut=I+tt;j<ut;j+=3)d(t.getX(j+0),t.getX(j+1),t.getX(j+2))}const b=new z,M=new z,F=new z,L=new z;function D(O){F.fromBufferAttribute(s,O),L.copy(F);const A=a[O];b.copy(A),b.sub(F.multiplyScalar(F.dot(A))).normalize(),M.crossVectors(L,A);const I=M.dot(l[O])<0?-1:1;o.setXYZW(O,b.x,b.y,b.z,I)}for(let O=0,A=S.length;O<A;++O){const E=S[O],I=E.start,tt=E.count;for(let j=I,ut=I+tt;j<ut;j+=3)D(t.getX(j+0)),D(t.getX(j+1)),D(t.getX(j+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,u=new z,h=new z;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),v=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new pn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hh=new le,Ii=new Pr,Yr=new ks,fh=new z,jr=new z,Kr=new z,$r=new z,za=new z,Zr=new z,dh=new z,Jr=new z;class Re extends Se{constructor(t=new He,e=new Mn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Zr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(za.fromBufferAttribute(h,t),o?Zr.addScaledVector(za,u):Zr.addScaledVector(za.sub(e),u))}e.add(Zr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(r),Ii.copy(t.ray).recast(t.near),!(Yr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Yr,fh)===null||Ii.origin.distanceToSquared(fh)>(t.far-t.near)**2))&&(hh.copy(r).invert(),Ii.copy(t.ray).applyMatrix4(hh),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ii)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=o[m.materialIndex],S=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,F=b;M<F;M+=3){const L=a.getX(M),D=a.getX(M+1),O=a.getX(M+2);s=Qr(this,d,t,i,c,u,h,L,D,O),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const S=a.getX(m),b=a.getX(m+1),M=a.getX(m+2);s=Qr(this,o,t,i,c,u,h,S,b,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const m=f[g],d=o[m.materialIndex],S=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,F=b;M<F;M+=3){const L=M,D=M+1,O=M+2;s=Qr(this,d,t,i,c,u,h,L,D,O),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,d=v;m<d;m+=3){const S=m,b=m+1,M=m+2;s=Qr(this,o,t,i,c,u,h,S,b,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function T0(n,t,e,i,s,r,o,a){let l;if(t.side===tn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===wi,a),l===null)return null;Jr.copy(a),Jr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Jr);return c<e.near||c>e.far?null:{distance:c,point:Jr.clone(),object:n}}function Qr(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,jr),n.getVertexPosition(l,Kr),n.getVertexPosition(c,$r);const u=T0(n,t,e,i,jr,Kr,$r,dh);if(u){const h=new z;Sn.getBarycoord(dh,jr,Kr,$r,h),s&&(u.uv=Sn.getInterpolatedAttribute(s,a,l,c,h,new It)),r&&(u.uv1=Sn.getInterpolatedAttribute(r,a,l,c,h,new It)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,l,c,h,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new z,materialIndex:0};Sn.getNormal(jr,Kr,$r,f.normal),u.face=f,u.barycoord=h}return u}class Dr extends He{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(h,2));function g(v,m,d,S,b,M,F,L,D,O,A){const E=M/D,I=F/O,tt=M/2,j=F/2,ut=L/2,at=D+1,et=O+1;let nt=0,Y=0;const gt=new z;for(let Mt=0;Mt<et;Mt++){const At=Mt*I-j;for(let Ut=0;Ut<at;Ut++){const jt=Ut*E-tt;gt[v]=jt*S,gt[m]=At*b,gt[d]=ut,c.push(gt.x,gt.y,gt.z),gt[v]=0,gt[m]=0,gt[d]=L>0?1:-1,u.push(gt.x,gt.y,gt.z),h.push(Ut/D),h.push(1-Mt/O),nt+=1}}for(let Mt=0;Mt<O;Mt++)for(let At=0;At<D;At++){const Ut=f+At+at*Mt,jt=f+At+at*(Mt+1),st=f+(At+1)+at*(Mt+1),mt=f+(At+1)+at*Mt;l.push(Ut,jt,mt),l.push(jt,st,mt),Y+=6}a.addGroup(p,Y,A),p+=Y,f+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ge(n){const t={};for(let e=0;e<n.length;e++){const i=Hs(n[e]);for(const s in i)t[s]=i[s]}return t}function A0(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function cp(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const Tr={clone:Hs,merge:Ge};var w0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,R0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Be extends Zi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=w0,this.fragmentShader=R0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=A0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class up extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=ni}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xi=new z,ph=new It,mh=new It;class hn extends up{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=tc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(xo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return tc*2*Math.atan(Math.tan(xo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(xi.x,xi.y).multiplyScalar(-t/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xi.x,xi.y).multiplyScalar(-t/xi.z)}getViewSize(t,e){return this.getViewBounds(t,ph,mh),e.subVectors(mh,ph)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(xo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const hs=-90,fs=1;class C0 extends Se{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(hs,fs,t,e);s.layers=this.layers,this.add(s);const r=new hn(hs,fs,t,e);r.layers=this.layers,this.add(r);const o=new hn(hs,fs,t,e);o.layers=this.layers,this.add(o);const a=new hn(hs,fs,t,e);a.layers=this.layers,this.add(a);const l=new hn(hs,fs,t,e);l.layers=this.layers,this.add(l);const c=new hn(hs,fs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ni)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Po)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class hp extends Ye{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Os,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class P0 extends bn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new hp(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:yn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Dr(5,5,5),r=new Be({name:"CubemapFromEquirect",uniforms:Hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:si});r.uniforms.tEquirect.value=e;const o=new Re(s,r),a=e.minFilter;return e.minFilter===bi&&(e.minFilter=yn),new C0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Ha=new z,D0=new z,L0=new qt;class yi{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ha.subVectors(i,e).cross(D0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ha),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||L0.getNormalMatrix(t),s=this.coplanarPoint(Ha).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new ks,to=new z;class Uc{constructor(t=new yi,e=new yi,i=new yi,s=new yi,r=new yi,o=new yi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ni){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],p=s[8],g=s[9],v=s[10],m=s[11],d=s[12],S=s[13],b=s[14],M=s[15];if(i[0].setComponents(l-r,f-c,m-p,M-d).normalize(),i[1].setComponents(l+r,f+c,m+p,M+d).normalize(),i[2].setComponents(l+o,f+u,m+g,M+S).normalize(),i[3].setComponents(l-o,f-u,m-g,M-S).normalize(),i[4].setComponents(l-a,f-h,m-v,M-b).normalize(),e===ni)i[5].setComponents(l+a,f+h,m+v,M+b).normalize();else if(e===Po)i[5].setComponents(a,h,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(t){return Ui.center.set(0,0,0),Ui.radius=.7071067811865476,Ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(to.x=s.normal.x>0?t.max.x:t.min.x,to.y=s.normal.y>0?t.max.y:t.min.y,to.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(to)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function fp(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function I0(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,h[f]=v)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class ta extends He{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,p=[],g=[],v=[],m=[];for(let d=0;d<u;d++){const S=d*f-o;for(let b=0;b<c;b++){const M=b*h-r;g.push(M,-S,0),v.push(0,0,1),m.push(b/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<a;S++){const b=S+c*d,M=S+c*(d+1),F=S+1+c*(d+1),L=S+1+c*d;p.push(b,M,L),p.push(M,F,L)}this.setIndex(p),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ta(t.width,t.height,t.widthSegments,t.heightSegments)}}var U0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N0=`#ifdef USE_ALPHAHASH
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
#endif`,O0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,F0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,z0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H0=`#ifdef USE_AOMAP
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
#endif`,V0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G0=`#ifdef USE_BATCHING
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
#endif`,k0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,X0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Y0=`#ifdef USE_IRIDESCENCE
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
#endif`,j0=`#ifdef USE_BUMPMAP
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ex=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,nx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ix=`#define PI 3.141592653589793
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
} // validated`,sx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rx=`vec3 transformedNormal = objectNormal;
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
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ux="gl_FragColor = linearToOutputTexel( gl_FragColor );",hx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fx=`#ifdef USE_ENVMAP
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
#endif`,dx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
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
#endif`,_x=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sx=`#ifdef USE_GRADIENTMAP
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
}`,yx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ex=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tx=`uniform bool receiveShadow;
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
#endif`,Ax=`#ifdef USE_ENVMAP
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
#endif`,wx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dx=`PhysicalMaterial material;
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
#endif`,Lx=`struct PhysicalMaterial {
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
}`,Ix=`
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
#endif`,Ux=`#if defined( RE_IndirectDiffuse )
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
#endif`,Nx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ox=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Fx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kx=`#if defined( USE_POINTS_UV )
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
#endif`,Wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kx=`#ifdef USE_MORPHTARGETS
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
#endif`,$x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nM=`#ifdef USE_NORMALMAP
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
#endif`,iM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,aM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_M=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vM=`float getShadowMask() {
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
}`,xM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,MM=`#ifdef USE_SKINNING
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
#endif`,SM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yM=`#ifdef USE_SKINNING
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
#endif`,EM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,AM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wM=`#ifdef USE_TRANSMISSION
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
#endif`,RM=`#ifdef USE_TRANSMISSION
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
#endif`,CM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,DM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,LM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const IM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,UM=`uniform sampler2D t2D;
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
}`,NM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,FM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zM=`#include <common>
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
}`,HM=`#if DEPTH_PACKING == 3200
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
}`,VM=`#define DISTANCE
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
}`,GM=`#define DISTANCE
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
}`,kM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XM=`uniform float scale;
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
}`,qM=`uniform vec3 diffuse;
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
}`,YM=`#include <common>
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
}`,jM=`uniform vec3 diffuse;
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
}`,KM=`#define LAMBERT
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
}`,$M=`#define LAMBERT
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
}`,ZM=`#define MATCAP
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
}`,JM=`#define MATCAP
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
}`,QM=`#define NORMAL
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
}`,tS=`#define NORMAL
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
}`,eS=`#define PHONG
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
}`,nS=`#define PHONG
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
}`,iS=`#define STANDARD
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
}`,sS=`#define STANDARD
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
}`,rS=`#define TOON
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
}`,oS=`#define TOON
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
}`,aS=`uniform float size;
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
}`,lS=`uniform vec3 diffuse;
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
}`,cS=`#include <common>
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
}`,uS=`uniform vec3 color;
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
}`,hS=`uniform float rotation;
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
}`,fS=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:U0,alphahash_pars_fragment:N0,alphamap_fragment:O0,alphamap_pars_fragment:F0,alphatest_fragment:B0,alphatest_pars_fragment:z0,aomap_fragment:H0,aomap_pars_fragment:V0,batching_pars_vertex:G0,batching_vertex:k0,begin_vertex:W0,beginnormal_vertex:X0,bsdfs:q0,iridescence_fragment:Y0,bumpmap_pars_fragment:j0,clipping_planes_fragment:K0,clipping_planes_pars_fragment:$0,clipping_planes_pars_vertex:Z0,clipping_planes_vertex:J0,color_fragment:Q0,color_pars_fragment:tx,color_pars_vertex:ex,color_vertex:nx,common:ix,cube_uv_reflection_fragment:sx,defaultnormal_vertex:rx,displacementmap_pars_vertex:ox,displacementmap_vertex:ax,emissivemap_fragment:lx,emissivemap_pars_fragment:cx,colorspace_fragment:ux,colorspace_pars_fragment:hx,envmap_fragment:fx,envmap_common_pars_fragment:dx,envmap_pars_fragment:px,envmap_pars_vertex:mx,envmap_physical_pars_fragment:Ax,envmap_vertex:gx,fog_vertex:_x,fog_pars_vertex:vx,fog_fragment:xx,fog_pars_fragment:Mx,gradientmap_pars_fragment:Sx,lightmap_pars_fragment:yx,lights_lambert_fragment:Ex,lights_lambert_pars_fragment:bx,lights_pars_begin:Tx,lights_toon_fragment:wx,lights_toon_pars_fragment:Rx,lights_phong_fragment:Cx,lights_phong_pars_fragment:Px,lights_physical_fragment:Dx,lights_physical_pars_fragment:Lx,lights_fragment_begin:Ix,lights_fragment_maps:Ux,lights_fragment_end:Nx,logdepthbuf_fragment:Ox,logdepthbuf_pars_fragment:Fx,logdepthbuf_pars_vertex:Bx,logdepthbuf_vertex:zx,map_fragment:Hx,map_pars_fragment:Vx,map_particle_fragment:Gx,map_particle_pars_fragment:kx,metalnessmap_fragment:Wx,metalnessmap_pars_fragment:Xx,morphinstance_vertex:qx,morphcolor_vertex:Yx,morphnormal_vertex:jx,morphtarget_pars_vertex:Kx,morphtarget_vertex:$x,normal_fragment_begin:Zx,normal_fragment_maps:Jx,normal_pars_fragment:Qx,normal_pars_vertex:tM,normal_vertex:eM,normalmap_pars_fragment:nM,clearcoat_normal_fragment_begin:iM,clearcoat_normal_fragment_maps:sM,clearcoat_pars_fragment:rM,iridescence_pars_fragment:oM,opaque_fragment:aM,packing:lM,premultiplied_alpha_fragment:cM,project_vertex:uM,dithering_fragment:hM,dithering_pars_fragment:fM,roughnessmap_fragment:dM,roughnessmap_pars_fragment:pM,shadowmap_pars_fragment:mM,shadowmap_pars_vertex:gM,shadowmap_vertex:_M,shadowmask_pars_fragment:vM,skinbase_vertex:xM,skinning_pars_vertex:MM,skinning_vertex:SM,skinnormal_vertex:yM,specularmap_fragment:EM,specularmap_pars_fragment:bM,tonemapping_fragment:TM,tonemapping_pars_fragment:AM,transmission_fragment:wM,transmission_pars_fragment:RM,uv_pars_fragment:CM,uv_pars_vertex:PM,uv_vertex:DM,worldpos_vertex:LM,background_vert:IM,background_frag:UM,backgroundCube_vert:NM,backgroundCube_frag:OM,cube_vert:FM,cube_frag:BM,depth_vert:zM,depth_frag:HM,distanceRGBA_vert:VM,distanceRGBA_frag:GM,equirect_vert:kM,equirect_frag:WM,linedashed_vert:XM,linedashed_frag:qM,meshbasic_vert:YM,meshbasic_frag:jM,meshlambert_vert:KM,meshlambert_frag:$M,meshmatcap_vert:ZM,meshmatcap_frag:JM,meshnormal_vert:QM,meshnormal_frag:tS,meshphong_vert:eS,meshphong_frag:nS,meshphysical_vert:iS,meshphysical_frag:sS,meshtoon_vert:rS,meshtoon_frag:oS,points_vert:aS,points_frag:lS,shadow_vert:cS,shadow_frag:uS,sprite_vert:hS,sprite_frag:fS},yt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},Ln={basic:{uniforms:Ge([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ge([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ge([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ge([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ge([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ge([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ge([yt.points,yt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ge([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ge([yt.common,yt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ge([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ge([yt.sprite,yt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ge([yt.common,yt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ge([yt.lights,yt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};Ln.physical={uniforms:Ge([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const eo={r:0,b:0,g:0},Ni=new Hn,dS=new le;function pS(n,t,e,i,s,r,o){const a=new kt(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function g(S){let b=S.isScene===!0?S.background:null;return b&&b.isTexture&&(b=(S.backgroundBlurriness>0?e:t).get(b)),b}function v(S){let b=!1;const M=g(S);M===null?d(a,l):M&&M.isColor&&(d(M,1),b=!0);const F=n.xr.getEnvironmentBlendMode();F==="additive"?i.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,b){const M=g(b);M&&(M.isCubeTexture||M.mapping===Jo)?(u===void 0&&(u=new Re(new Dr(1,1,1),new Be({name:"BackgroundCubeMaterial",uniforms:Hs(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(F,L,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ni.copy(b.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dS.makeRotationFromEuler(Ni)),u.material.toneMapped=Kt.getTransfer(M.colorSpace)!==se,(h!==M||f!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Re(new ta(2,2),new Be({name:"BackgroundMaterial",uniforms:Hs(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(M.colorSpace)!==se,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function d(S,b){S.getRGB(eo,cp(n)),i.buffers.color.setClear(eo.r,eo.g,eo.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(S,b=1){a.set(S),l=b,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,d(a,l)},render:v,addToRenderList:m}}function mS(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(E,I,tt,j,ut){let at=!1;const et=h(j,tt,I);r!==et&&(r=et,c(r.object)),at=p(E,j,tt,ut),at&&g(E,j,tt,ut),ut!==null&&t.update(ut,n.ELEMENT_ARRAY_BUFFER),(at||o)&&(o=!1,M(E,I,tt,j),ut!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(ut).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function h(E,I,tt){const j=tt.wireframe===!0;let ut=i[E.id];ut===void 0&&(ut={},i[E.id]=ut);let at=ut[I.id];at===void 0&&(at={},ut[I.id]=at);let et=at[j];return et===void 0&&(et=f(l()),at[j]=et),et}function f(E){const I=[],tt=[],j=[];for(let ut=0;ut<e;ut++)I[ut]=0,tt[ut]=0,j[ut]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:tt,attributeDivisors:j,object:E,attributes:{},index:null}}function p(E,I,tt,j){const ut=r.attributes,at=I.attributes;let et=0;const nt=tt.getAttributes();for(const Y in nt)if(nt[Y].location>=0){const Mt=ut[Y];let At=at[Y];if(At===void 0&&(Y==="instanceMatrix"&&E.instanceMatrix&&(At=E.instanceMatrix),Y==="instanceColor"&&E.instanceColor&&(At=E.instanceColor)),Mt===void 0||Mt.attribute!==At||At&&Mt.data!==At.data)return!0;et++}return r.attributesNum!==et||r.index!==j}function g(E,I,tt,j){const ut={},at=I.attributes;let et=0;const nt=tt.getAttributes();for(const Y in nt)if(nt[Y].location>=0){let Mt=at[Y];Mt===void 0&&(Y==="instanceMatrix"&&E.instanceMatrix&&(Mt=E.instanceMatrix),Y==="instanceColor"&&E.instanceColor&&(Mt=E.instanceColor));const At={};At.attribute=Mt,Mt&&Mt.data&&(At.data=Mt.data),ut[Y]=At,et++}r.attributes=ut,r.attributesNum=et,r.index=j}function v(){const E=r.newAttributes;for(let I=0,tt=E.length;I<tt;I++)E[I]=0}function m(E){d(E,0)}function d(E,I){const tt=r.newAttributes,j=r.enabledAttributes,ut=r.attributeDivisors;tt[E]=1,j[E]===0&&(n.enableVertexAttribArray(E),j[E]=1),ut[E]!==I&&(n.vertexAttribDivisor(E,I),ut[E]=I)}function S(){const E=r.newAttributes,I=r.enabledAttributes;for(let tt=0,j=I.length;tt<j;tt++)I[tt]!==E[tt]&&(n.disableVertexAttribArray(tt),I[tt]=0)}function b(E,I,tt,j,ut,at,et){et===!0?n.vertexAttribIPointer(E,I,tt,ut,at):n.vertexAttribPointer(E,I,tt,j,ut,at)}function M(E,I,tt,j){v();const ut=j.attributes,at=tt.getAttributes(),et=I.defaultAttributeValues;for(const nt in at){const Y=at[nt];if(Y.location>=0){let gt=ut[nt];if(gt===void 0&&(nt==="instanceMatrix"&&E.instanceMatrix&&(gt=E.instanceMatrix),nt==="instanceColor"&&E.instanceColor&&(gt=E.instanceColor)),gt!==void 0){const Mt=gt.normalized,At=gt.itemSize,Ut=t.get(gt);if(Ut===void 0)continue;const jt=Ut.buffer,st=Ut.type,mt=Ut.bytesPerElement,ct=st===n.INT||st===n.UNSIGNED_INT||gt.gpuType===wc;if(gt.isInterleavedBufferAttribute){const R=gt.data,$=R.stride,Z=gt.offset;if(R.isInstancedInterleavedBuffer){for(let ot=0;ot<Y.locationSize;ot++)d(Y.location+ot,R.meshPerAttribute);E.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let ot=0;ot<Y.locationSize;ot++)m(Y.location+ot);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let ot=0;ot<Y.locationSize;ot++)b(Y.location+ot,At/Y.locationSize,st,Mt,$*mt,(Z+At/Y.locationSize*ot)*mt,ct)}else{if(gt.isInstancedBufferAttribute){for(let R=0;R<Y.locationSize;R++)d(Y.location+R,gt.meshPerAttribute);E.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let R=0;R<Y.locationSize;R++)m(Y.location+R);n.bindBuffer(n.ARRAY_BUFFER,jt);for(let R=0;R<Y.locationSize;R++)b(Y.location+R,At/Y.locationSize,st,Mt,At*mt,At/Y.locationSize*R*mt,ct)}}else if(et!==void 0){const Mt=et[nt];if(Mt!==void 0)switch(Mt.length){case 2:n.vertexAttrib2fv(Y.location,Mt);break;case 3:n.vertexAttrib3fv(Y.location,Mt);break;case 4:n.vertexAttrib4fv(Y.location,Mt);break;default:n.vertexAttrib1fv(Y.location,Mt)}}}}S()}function F(){O();for(const E in i){const I=i[E];for(const tt in I){const j=I[tt];for(const ut in j)u(j[ut].object),delete j[ut];delete I[tt]}delete i[E]}}function L(E){if(i[E.id]===void 0)return;const I=i[E.id];for(const tt in I){const j=I[tt];for(const ut in j)u(j[ut].object),delete j[ut];delete I[tt]}delete i[E.id]}function D(E){for(const I in i){const tt=i[I];if(tt[E.id]===void 0)continue;const j=tt[E.id];for(const ut in j)u(j[ut].object),delete j[ut];delete tt[E.id]}}function O(){A(),o=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:O,resetDefaultState:A,dispose:F,releaseStatesOfGeometry:L,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function gS(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*f[v];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _S(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==fn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const O=D===ri&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==zn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==ei&&!O)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),F=g>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:F,maxSamples:L}}function vS(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new yi,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,b=S*4;let M=d.clippingState||null;l.value=M,M=u(g,f,b,p);for(let F=0;F!==b;++F)M[F]=e[F];d.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const d=p+v*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,M=p;b!==v;++b,M+=4)o.copy(h[b]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function xS(n){let t=new WeakMap;function e(o,a){return a===Tl?o.mapping=Os:a===Al&&(o.mapping=Fs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Tl||a===Al)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new P0(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Nc extends up{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ms=4,gh=[.125,.215,.35,.446,.526,.582],Hi=20,Va=new Nc,_h=new kt;let Ga=null,ka=0,Wa=0,Xa=!1;const Bi=(1+Math.sqrt(5))/2,ds=1/Bi,vh=[new z(-Bi,ds,0),new z(Bi,ds,0),new z(-ds,0,Bi),new z(ds,0,Bi),new z(0,Bi,-ds),new z(0,Bi,ds),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)];class xh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Ga=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ga,ka,Wa),this._renderer.xr.enabled=Xa,t.scissorTest=!1,no(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Os||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ga=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:ri,format:fn,colorSpace:Gs,depthBuffer:!1},s=Mh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=MS(r)),this._blurMaterial=SS(r,t,e)}return s}_compileMaterial(t){const e=new Re(this._lodPlanes[0],t);this._renderer.compile(e,Va)}_sceneToCubeUV(t,e,i,s){const a=new hn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(_h),u.toneMapping=Ti,u.autoClear=!1;const p=new Mn({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new Re(new Dr,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(_h),v=!0);for(let d=0;d<6;d++){const S=d%3;S===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):S===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const b=this._cubeSize;no(s,S*b,d>2?b:0,b,b),u.setRenderTarget(s),v&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Os||t.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Re(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;no(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Va)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=vh[(s-r-1)%vh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Re(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Hi-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):Hi;m>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const d=[];let S=0;for(let D=0;D<Hi;++D){const O=D/v,A=Math.exp(-O*O/2);d.push(A),D===0?S+=A:D<m&&(S+=2*A)}for(let D=0;D<d.length;D++)d[D]=d[D]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-i;const M=this._sizeLods[s],F=3*M*(s>b-Ms?s-b+Ms:0),L=4*(this._cubeSize-M);no(e,F,L,3*M,2*M),l.setRenderTarget(e),l.render(h,Va)}}function MS(n){const t=[],e=[],i=[];let s=n;const r=n-Ms+1+gh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ms?l=gh[o-n+Ms-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,v=3,m=2,d=1,S=new Float32Array(v*g*p),b=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let L=0;L<p;L++){const D=L%3*2/3-1,O=L>2?0:-1,A=[D,O,0,D+2/3,O,0,D+2/3,O+1,0,D,O,0,D+2/3,O+1,0,D,O+1,0];S.set(A,v*g*L),b.set(f,m*g*L);const E=[L,L,L,L,L,L];M.set(E,d*g*L)}const F=new He;F.setAttribute("position",new pn(S,v)),F.setAttribute("uv",new pn(b,m)),F.setAttribute("faceIndex",new pn(M,d)),t.push(F),s>Ms&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Mh(n,t,e){const i=new bn(n,t,e);return i.texture.mapping=Jo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function no(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function SS(n,t,e){const i=new Float32Array(Hi),s=new z(0,1,0);return new Be({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Oc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function Sh(){return new Be({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oc(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function yh(){return new Be({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function Oc(){return`

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
	`}function yS(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Tl||l===Al,u=l===Os||l===Fs;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new xh(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new xh(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function ES(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&or("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function bS(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let m=0,d=v.length;m<d;m++)t.remove(v[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const v=p[g];for(let m=0,d=v.length;m<d;m++)t.update(v[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const S=p.array;v=p.version;for(let b=0,M=S.length;b<M;b+=3){const F=S[b+0],L=S[b+1],D=S[b+2];f.push(F,L,L,D,D,F)}}else if(g!==void 0){const S=g.array;v=g.version;for(let b=0,M=S.length/3-1;b<M;b+=3){const F=b+0,L=b+1,D=b+2;f.push(F,L,L,D,D,F)}}else return;const m=new(ip(f)?lp:ap)(f,1);m.version=v;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function TS(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),e.update(p,i,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function h(f,p,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],v[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,v,0,g);let d=0;for(let S=0;S<g;S++)d+=p[S]*v[S];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function AS(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function wS(n,t,e){const i=new WeakMap,s=new me;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let E=function(){O.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var p=E;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let F=a.attributes.position.count*M,L=1;F>t.maxTextureSize&&(L=Math.ceil(F/t.maxTextureSize),F=t.maxTextureSize);const D=new Float32Array(F*L*4*h),O=new rp(D,F,L,h);O.type=ei,O.needsUpdate=!0;const A=M*4;for(let I=0;I<h;I++){const tt=d[I],j=S[I],ut=b[I],at=F*L*4*I;for(let et=0;et<tt.count;et++){const nt=et*A;g===!0&&(s.fromBufferAttribute(tt,et),D[at+nt+0]=s.x,D[at+nt+1]=s.y,D[at+nt+2]=s.z,D[at+nt+3]=0),v===!0&&(s.fromBufferAttribute(j,et),D[at+nt+4]=s.x,D[at+nt+5]=s.y,D[at+nt+6]=s.z,D[at+nt+7]=0),m===!0&&(s.fromBufferAttribute(ut,et),D[at+nt+8]=s.x,D[at+nt+9]=s.y,D[at+nt+10]=s.z,D[at+nt+11]=ut.itemSize===4?s.w:1)}}f={count:h,texture:O,size:new It(F,L)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function RS(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class dp extends Ye{constructor(t,e,i,s,r,o,a,l,c,u=Cs){if(u!==Cs&&u!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Cs&&(i=qi),i===void 0&&u===zs&&(i=Bs),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ln,this.minFilter=l!==void 0?l:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const pp=new Ye,Eh=new dp(1,1),mp=new rp,gp=new m0,_p=new hp,bh=[],Th=[],Ah=new Float32Array(16),wh=new Float32Array(9),Rh=new Float32Array(4);function Ws(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=bh[s];if(r===void 0&&(r=new Float32Array(s),bh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Te(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ae(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ea(n,t){let e=Th[t];e===void 0&&(e=new Int32Array(t),Th[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function CS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function PS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2fv(this.addr,t),Ae(e,t)}}function DS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;n.uniform3fv(this.addr,t),Ae(e,t)}}function LS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4fv(this.addr,t),Ae(e,t)}}function IS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,i))return;Rh.set(i),n.uniformMatrix2fv(this.addr,!1,Rh),Ae(e,i)}}function US(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,i))return;wh.set(i),n.uniformMatrix3fv(this.addr,!1,wh),Ae(e,i)}}function NS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,i))return;Ah.set(i),n.uniformMatrix4fv(this.addr,!1,Ah),Ae(e,i)}}function OS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function FS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2iv(this.addr,t),Ae(e,t)}}function BS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3iv(this.addr,t),Ae(e,t)}}function zS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4iv(this.addr,t),Ae(e,t)}}function HS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function VS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;n.uniform2uiv(this.addr,t),Ae(e,t)}}function GS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;n.uniform3uiv(this.addr,t),Ae(e,t)}}function kS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;n.uniform4uiv(this.addr,t),Ae(e,t)}}function WS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Eh.compareFunction=np,r=Eh):r=pp,e.setTexture2D(t||r,s)}function XS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||gp,s)}function qS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||_p,s)}function YS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||mp,s)}function jS(n){switch(n){case 5126:return CS;case 35664:return PS;case 35665:return DS;case 35666:return LS;case 35674:return IS;case 35675:return US;case 35676:return NS;case 5124:case 35670:return OS;case 35667:case 35671:return FS;case 35668:case 35672:return BS;case 35669:case 35673:return zS;case 5125:return HS;case 36294:return VS;case 36295:return GS;case 36296:return kS;case 35678:case 36198:case 36298:case 36306:case 35682:return WS;case 35679:case 36299:case 36307:return XS;case 35680:case 36300:case 36308:case 36293:return qS;case 36289:case 36303:case 36311:case 36292:return YS}}function KS(n,t){n.uniform1fv(this.addr,t)}function $S(n,t){const e=Ws(t,this.size,2);n.uniform2fv(this.addr,e)}function ZS(n,t){const e=Ws(t,this.size,3);n.uniform3fv(this.addr,e)}function JS(n,t){const e=Ws(t,this.size,4);n.uniform4fv(this.addr,e)}function QS(n,t){const e=Ws(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function ty(n,t){const e=Ws(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function ey(n,t){const e=Ws(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function ny(n,t){n.uniform1iv(this.addr,t)}function iy(n,t){n.uniform2iv(this.addr,t)}function sy(n,t){n.uniform3iv(this.addr,t)}function ry(n,t){n.uniform4iv(this.addr,t)}function oy(n,t){n.uniform1uiv(this.addr,t)}function ay(n,t){n.uniform2uiv(this.addr,t)}function ly(n,t){n.uniform3uiv(this.addr,t)}function cy(n,t){n.uniform4uiv(this.addr,t)}function uy(n,t,e){const i=this.cache,s=t.length,r=ea(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||pp,r[o])}function hy(n,t,e){const i=this.cache,s=t.length,r=ea(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||gp,r[o])}function fy(n,t,e){const i=this.cache,s=t.length,r=ea(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||_p,r[o])}function dy(n,t,e){const i=this.cache,s=t.length,r=ea(e,s);Te(i,r)||(n.uniform1iv(this.addr,r),Ae(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||mp,r[o])}function py(n){switch(n){case 5126:return KS;case 35664:return $S;case 35665:return ZS;case 35666:return JS;case 35674:return QS;case 35675:return ty;case 35676:return ey;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return sy;case 35669:case 35673:return ry;case 5125:return oy;case 36294:return ay;case 36295:return ly;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return uy;case 35679:case 36299:case 36307:return hy;case 35680:case 36300:case 36308:case 36293:return fy;case 36289:case 36303:case 36311:case 36292:return dy}}class my{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=jS(e.type)}}class gy{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=py(e.type)}}class _y{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const qa=/(\w+)(\])?(\[|\.)?/g;function Ch(n,t){n.seq.push(t),n.map[t.id]=t}function vy(n,t,e){const i=n.name,s=i.length;for(qa.lastIndex=0;;){const r=qa.exec(i),o=qa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ch(e,c===void 0?new my(a,n,t):new gy(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new _y(a),Ch(e,h)),e=h}}}class Mo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);vy(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Ph(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const xy=37297;let My=0;function Sy(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Dh=new qt;function yy(n){Kt._getMatrix(Dh,Kt.workingColorSpace,n);const t=`mat3( ${Dh.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(n)){case Qo:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Lh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Sy(n.getShaderSource(t),o)}else return s}function Ey(n,t){const e=yy(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function by(n,t){let e;switch(t){case zd:e="Linear";break;case Hd:e="Reinhard";break;case Vd:e="Cineon";break;case Ac:e="ACESFilmic";break;case Gd:e="AgX";break;case kd:e="Neutral";break;case Yv:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const io=new z;function Ty(){Kt.getLuminanceCoefficients(io);const n=io.x.toFixed(4),t=io.y.toFixed(4),e=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ay(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function wy(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ry(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ar(n){return n!==""}function Ih(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cy=/^[ \t]*#include +<([\w\d./]+)>/gm;function ec(n){return n.replace(Cy,Dy)}const Py=new Map;function Dy(n,t){let e=Yt[t];if(e===void 0){const i=Py.get(t);if(i!==void 0)e=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ec(e)}const Ly=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nh(n){return n.replace(Ly,Iy)}function Iy(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Uy(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Fd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Av?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$n&&(t="SHADOWMAP_TYPE_VSM"),t}function Ny(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Os:case Fs:t="ENVMAP_TYPE_CUBE";break;case Jo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Oy(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Fs:t="ENVMAP_MODE_REFRACTION";break}return t}function Fy(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Bd:t="ENVMAP_BLENDING_MULTIPLY";break;case Xv:t="ENVMAP_BLENDING_MIX";break;case qv:t="ENVMAP_BLENDING_ADD";break}return t}function By(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function zy(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Uy(e),c=Ny(e),u=Oy(e),h=Fy(e),f=By(e),p=Ay(e),g=wy(r),v=s.createProgram();let m,d,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ar).join(`
`),d.length>0&&(d+=`
`)):(m=[Oh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),d=[Oh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ti?"#define TONE_MAPPING":"",e.toneMapping!==Ti?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Ti?by("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,Ey("linearToOutputTexel",e.outputColorSpace),Ty(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ar).join(`
`)),o=ec(o),o=Ih(o,e),o=Uh(o,e),a=ec(a),a=Ih(a,e),a=Uh(a,e),o=Nh(o),a=Nh(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Ku?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ku?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=S+m+o,M=S+d+a,F=Ph(s,s.VERTEX_SHADER,b),L=Ph(s,s.FRAGMENT_SHADER,M);s.attachShader(v,F),s.attachShader(v,L),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function D(I){if(n.debug.checkShaderErrors){const tt=s.getProgramInfoLog(v).trim(),j=s.getShaderInfoLog(F).trim(),ut=s.getShaderInfoLog(L).trim();let at=!0,et=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(at=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,F,L);else{const nt=Lh(s,F,"vertex"),Y=Lh(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+tt+`
`+nt+`
`+Y)}else tt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",tt):(j===""||ut==="")&&(et=!1);et&&(I.diagnostics={runnable:at,programLog:tt,vertexShader:{log:j,prefix:m},fragmentShader:{log:ut,prefix:d}})}s.deleteShader(F),s.deleteShader(L),O=new Mo(s,v),A=Ry(s,v)}let O;this.getUniforms=function(){return O===void 0&&D(this),O};let A;this.getAttributes=function(){return A===void 0&&D(this),A};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(v,xy)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=My++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=F,this.fragmentShader=L,this}let Hy=0;class Vy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Gy(t),e.set(t,i)),i}}class Gy{constructor(t){this.id=Hy++,this.code=t,this.usedTimes=0}}function ky(n,t,e,i,s,r,o){const a=new Ic,l=new Vy,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(A){return c.add(A),A===0?"uv":`uv${A}`}function m(A,E,I,tt,j){const ut=tt.fog,at=j.geometry,et=A.isMeshStandardMaterial?tt.environment:null,nt=(A.isMeshStandardMaterial?e:t).get(A.envMap||et),Y=nt&&nt.mapping===Jo?nt.image.height:null,gt=g[A.type];A.precision!==null&&(p=s.getMaxPrecision(A.precision),p!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",p,"instead."));const Mt=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,At=Mt!==void 0?Mt.length:0;let Ut=0;at.morphAttributes.position!==void 0&&(Ut=1),at.morphAttributes.normal!==void 0&&(Ut=2),at.morphAttributes.color!==void 0&&(Ut=3);let jt,st,mt,ct;if(gt){const ie=Ln[gt];jt=ie.vertexShader,st=ie.fragmentShader}else jt=A.vertexShader,st=A.fragmentShader,l.update(A),mt=l.getVertexShaderID(A),ct=l.getFragmentShaderID(A);const R=n.getRenderTarget(),$=n.state.buffers.depth.getReversed(),Z=j.isInstancedMesh===!0,ot=j.isBatchedMesh===!0,Et=!!A.map,w=!!A.matcap,C=!!nt,y=!!A.aoMap,it=!!A.lightMap,U=!!A.bumpMap,N=!!A.normalMap,k=!!A.displacementMap,K=!!A.emissiveMap,H=!!A.metalnessMap,x=!!A.roughnessMap,_=A.anisotropy>0,P=A.clearcoat>0,W=A.dispersion>0,q=A.iridescence>0,X=A.sheen>0,dt=A.transmission>0,lt=_&&!!A.anisotropyMap,ht=P&&!!A.clearcoatMap,Rt=P&&!!A.clearcoatNormalMap,pt=P&&!!A.clearcoatRoughnessMap,xt=q&&!!A.iridescenceMap,Ct=q&&!!A.iridescenceThicknessMap,Ot=X&&!!A.sheenColorMap,vt=X&&!!A.sheenRoughnessMap,Bt=!!A.specularMap,zt=!!A.specularColorMap,Zt=!!A.specularIntensityMap,B=dt&&!!A.transmissionMap,St=dt&&!!A.thicknessMap,rt=!!A.gradientMap,ft=!!A.alphaMap,wt=A.alphaTest>0,bt=!!A.alphaHash,Wt=!!A.extensions;let de=Ti;A.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(de=n.toneMapping);const De={shaderID:gt,shaderType:A.type,shaderName:A.name,vertexShader:jt,fragmentShader:st,defines:A.defines,customVertexShaderID:mt,customFragmentShaderID:ct,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:p,batching:ot,batchingColor:ot&&j._colorsTexture!==null,instancing:Z,instancingColor:Z&&j.instanceColor!==null,instancingMorph:Z&&j.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:R===null?n.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Gs,alphaToCoverage:!!A.alphaToCoverage,map:Et,matcap:w,envMap:C,envMapMode:C&&nt.mapping,envMapCubeUVHeight:Y,aoMap:y,lightMap:it,bumpMap:U,normalMap:N,displacementMap:f&&k,emissiveMap:K,normalMapObjectSpace:N&&A.normalMapType===Zv,normalMapTangentSpace:N&&A.normalMapType===ep,metalnessMap:H,roughnessMap:x,anisotropy:_,anisotropyMap:lt,clearcoat:P,clearcoatMap:ht,clearcoatNormalMap:Rt,clearcoatRoughnessMap:pt,dispersion:W,iridescence:q,iridescenceMap:xt,iridescenceThicknessMap:Ct,sheen:X,sheenColorMap:Ot,sheenRoughnessMap:vt,specularMap:Bt,specularColorMap:zt,specularIntensityMap:Zt,transmission:dt,transmissionMap:B,thicknessMap:St,gradientMap:rt,opaque:A.transparent===!1&&A.blending===ws&&A.alphaToCoverage===!1,alphaMap:ft,alphaTest:wt,alphaHash:bt,combine:A.combine,mapUv:Et&&v(A.map.channel),aoMapUv:y&&v(A.aoMap.channel),lightMapUv:it&&v(A.lightMap.channel),bumpMapUv:U&&v(A.bumpMap.channel),normalMapUv:N&&v(A.normalMap.channel),displacementMapUv:k&&v(A.displacementMap.channel),emissiveMapUv:K&&v(A.emissiveMap.channel),metalnessMapUv:H&&v(A.metalnessMap.channel),roughnessMapUv:x&&v(A.roughnessMap.channel),anisotropyMapUv:lt&&v(A.anisotropyMap.channel),clearcoatMapUv:ht&&v(A.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&v(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&v(A.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&v(A.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&v(A.iridescenceThicknessMap.channel),sheenColorMapUv:Ot&&v(A.sheenColorMap.channel),sheenRoughnessMapUv:vt&&v(A.sheenRoughnessMap.channel),specularMapUv:Bt&&v(A.specularMap.channel),specularColorMapUv:zt&&v(A.specularColorMap.channel),specularIntensityMapUv:Zt&&v(A.specularIntensityMap.channel),transmissionMapUv:B&&v(A.transmissionMap.channel),thicknessMapUv:St&&v(A.thicknessMap.channel),alphaMapUv:ft&&v(A.alphaMap.channel),vertexTangents:!!at.attributes.tangent&&(N||_),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!at.attributes.uv&&(Et||ft),fog:!!ut,useFog:A.fog===!0,fogExp2:!!ut&&ut.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:$,skinning:j.isSkinnedMesh===!0,morphTargets:at.morphAttributes.position!==void 0,morphNormals:at.morphAttributes.normal!==void 0,morphColors:at.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Ut,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:de,decodeVideoTexture:Et&&A.map.isVideoTexture===!0&&Kt.getTransfer(A.map.colorSpace)===se,decodeVideoTextureEmissive:K&&A.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(A.emissiveMap.colorSpace)===se,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Un,flipSided:A.side===tn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Wt&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wt&&A.extensions.multiDraw===!0||ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function d(A){const E=[];if(A.shaderID?E.push(A.shaderID):(E.push(A.customVertexShaderID),E.push(A.customFragmentShaderID)),A.defines!==void 0)for(const I in A.defines)E.push(I),E.push(A.defines[I]);return A.isRawShaderMaterial===!1&&(S(E,A),b(E,A),E.push(n.outputColorSpace)),E.push(A.customProgramCacheKey),E.join()}function S(A,E){A.push(E.precision),A.push(E.outputColorSpace),A.push(E.envMapMode),A.push(E.envMapCubeUVHeight),A.push(E.mapUv),A.push(E.alphaMapUv),A.push(E.lightMapUv),A.push(E.aoMapUv),A.push(E.bumpMapUv),A.push(E.normalMapUv),A.push(E.displacementMapUv),A.push(E.emissiveMapUv),A.push(E.metalnessMapUv),A.push(E.roughnessMapUv),A.push(E.anisotropyMapUv),A.push(E.clearcoatMapUv),A.push(E.clearcoatNormalMapUv),A.push(E.clearcoatRoughnessMapUv),A.push(E.iridescenceMapUv),A.push(E.iridescenceThicknessMapUv),A.push(E.sheenColorMapUv),A.push(E.sheenRoughnessMapUv),A.push(E.specularMapUv),A.push(E.specularColorMapUv),A.push(E.specularIntensityMapUv),A.push(E.transmissionMapUv),A.push(E.thicknessMapUv),A.push(E.combine),A.push(E.fogExp2),A.push(E.sizeAttenuation),A.push(E.morphTargetsCount),A.push(E.morphAttributeCount),A.push(E.numDirLights),A.push(E.numPointLights),A.push(E.numSpotLights),A.push(E.numSpotLightMaps),A.push(E.numHemiLights),A.push(E.numRectAreaLights),A.push(E.numDirLightShadows),A.push(E.numPointLightShadows),A.push(E.numSpotLightShadows),A.push(E.numSpotLightShadowsWithMaps),A.push(E.numLightProbes),A.push(E.shadowMapType),A.push(E.toneMapping),A.push(E.numClippingPlanes),A.push(E.numClipIntersection),A.push(E.depthPacking)}function b(A,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),A.push(a.mask)}function M(A){const E=g[A.type];let I;if(E){const tt=Ln[E];I=Tr.clone(tt.uniforms)}else I=A.uniforms;return I}function F(A,E){let I;for(let tt=0,j=u.length;tt<j;tt++){const ut=u[tt];if(ut.cacheKey===E){I=ut,++I.usedTimes;break}}return I===void 0&&(I=new zy(n,E,A,r),u.push(I)),I}function L(A){if(--A.usedTimes===0){const E=u.indexOf(A);u[E]=u[u.length-1],u.pop(),A.destroy()}}function D(A){l.remove(A)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:F,releaseProgram:L,releaseShaderCache:D,programs:u,dispose:O}}function Wy(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Xy(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Fh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Bh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,p,g,v,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=v,d.group=m),t++,d}function a(h,f,p,g,v,m){const d=o(h,f,p,g,v,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(h,f,p,g,v,m){const d=o(h,f,p,g,v,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||Xy),i.length>1&&i.sort(f||Fh),s.length>1&&s.sort(f||Fh)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function qy(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Bh,n.set(i,[o])):s>=r.length?(o=new Bh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Yy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new kt};break;case"SpotLight":e={position:new z,direction:new z,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new z,halfWidth:new z,halfHeight:new z};break}return n[t.id]=e,e}}}function jy(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Ky=0;function $y(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Zy(n){const t=new Yy,e=jy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const s=new z,r=new le,o=new le;function a(c){let u=0,h=0,f=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let p=0,g=0,v=0,m=0,d=0,S=0,b=0,M=0,F=0,L=0,D=0;c.sort($y);for(let A=0,E=c.length;A<E;A++){const I=c[A],tt=I.color,j=I.intensity,ut=I.distance,at=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=tt.r*j,h+=tt.g*j,f+=tt.b*j;else if(I.isLightProbe){for(let et=0;et<9;et++)i.probe[et].addScaledVector(I.sh.coefficients[et],j);D++}else if(I.isDirectionalLight){const et=t.get(I);if(et.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const nt=I.shadow,Y=e.get(I);Y.shadowIntensity=nt.intensity,Y.shadowBias=nt.bias,Y.shadowNormalBias=nt.normalBias,Y.shadowRadius=nt.radius,Y.shadowMapSize=nt.mapSize,i.directionalShadow[p]=Y,i.directionalShadowMap[p]=at,i.directionalShadowMatrix[p]=I.shadow.matrix,S++}i.directional[p]=et,p++}else if(I.isSpotLight){const et=t.get(I);et.position.setFromMatrixPosition(I.matrixWorld),et.color.copy(tt).multiplyScalar(j),et.distance=ut,et.coneCos=Math.cos(I.angle),et.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),et.decay=I.decay,i.spot[v]=et;const nt=I.shadow;if(I.map&&(i.spotLightMap[F]=I.map,F++,nt.updateMatrices(I),I.castShadow&&L++),i.spotLightMatrix[v]=nt.matrix,I.castShadow){const Y=e.get(I);Y.shadowIntensity=nt.intensity,Y.shadowBias=nt.bias,Y.shadowNormalBias=nt.normalBias,Y.shadowRadius=nt.radius,Y.shadowMapSize=nt.mapSize,i.spotShadow[v]=Y,i.spotShadowMap[v]=at,M++}v++}else if(I.isRectAreaLight){const et=t.get(I);et.color.copy(tt).multiplyScalar(j),et.halfWidth.set(I.width*.5,0,0),et.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=et,m++}else if(I.isPointLight){const et=t.get(I);if(et.color.copy(I.color).multiplyScalar(I.intensity),et.distance=I.distance,et.decay=I.decay,I.castShadow){const nt=I.shadow,Y=e.get(I);Y.shadowIntensity=nt.intensity,Y.shadowBias=nt.bias,Y.shadowNormalBias=nt.normalBias,Y.shadowRadius=nt.radius,Y.shadowMapSize=nt.mapSize,Y.shadowCameraNear=nt.camera.near,Y.shadowCameraFar=nt.camera.far,i.pointShadow[g]=Y,i.pointShadowMap[g]=at,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=et,g++}else if(I.isHemisphereLight){const et=t.get(I);et.skyColor.copy(I.color).multiplyScalar(j),et.groundColor.copy(I.groundColor).multiplyScalar(j),i.hemi[d]=et,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const O=i.hash;(O.directionalLength!==p||O.pointLength!==g||O.spotLength!==v||O.rectAreaLength!==m||O.hemiLength!==d||O.numDirectionalShadows!==S||O.numPointShadows!==b||O.numSpotShadows!==M||O.numSpotMaps!==F||O.numLightProbes!==D)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=M+F-L,i.spotLightMap.length=F,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=D,O.directionalLength=p,O.pointLength=g,O.spotLength=v,O.rectAreaLength=m,O.hemiLength=d,O.numDirectionalShadows=S,O.numPointShadows=b,O.numSpotShadows=M,O.numSpotMaps=F,O.numLightProbes=D,i.version=Ky++)}function l(c,u){let h=0,f=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let d=0,S=c.length;d<S;d++){const b=c[d];if(b.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(b.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function zh(n){const t=new Zy(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Jy(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new zh(n),t.set(s,[a])):r>=o.length?(a=new zh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class Qy extends Zi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Kv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class tE extends Zi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const eE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nE=`uniform sampler2D shadow_pass;
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
}`;function iE(n,t,e){let i=new Uc;const s=new It,r=new It,o=new me,a=new Qy({depthPacking:$v}),l=new tE,c={},u=e.maxTextureSize,h={[wi]:tn,[tn]:wi,[Un]:Un},f=new Be({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:eE,fragmentShader:nE}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new He;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Re(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fd;let d=this.type;this.render=function(L,D,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;const A=n.getRenderTarget(),E=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),tt=n.state;tt.setBlending(si),tt.buffers.color.setClear(1,1,1,1),tt.buffers.depth.setTest(!0),tt.setScissorTest(!1);const j=d!==$n&&this.type===$n,ut=d===$n&&this.type!==$n;for(let at=0,et=L.length;at<et;at++){const nt=L[at],Y=nt.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const gt=Y.getFrameExtents();if(s.multiply(gt),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/gt.x),s.x=r.x*gt.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/gt.y),s.y=r.y*gt.y,Y.mapSize.y=r.y)),Y.map===null||j===!0||ut===!0){const At=this.type!==$n?{minFilter:ln,magFilter:ln}:{};Y.map!==null&&Y.map.dispose(),Y.map=new bn(s.x,s.y,At),Y.map.texture.name=nt.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const Mt=Y.getViewportCount();for(let At=0;At<Mt;At++){const Ut=Y.getViewport(At);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),tt.viewport(o),Y.updateMatrices(nt,At),i=Y.getFrustum(),M(D,O,Y.camera,nt,this.type)}Y.isPointLightShadow!==!0&&this.type===$n&&S(Y,O),Y.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(A,E,I)};function S(L,D){const O=t.update(v);f.defines.VSM_SAMPLES!==L.blurSamples&&(f.defines.VSM_SAMPLES=L.blurSamples,p.defines.VSM_SAMPLES=L.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new bn(s.x,s.y)),f.uniforms.shadow_pass.value=L.map.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(D,null,O,f,v,null),p.uniforms.shadow_pass.value=L.mapPass.texture,p.uniforms.resolution.value=L.mapSize,p.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(D,null,O,p,v,null)}function b(L,D,O,A){let E=null;const I=O.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(I!==void 0)E=I;else if(E=O.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const tt=E.uuid,j=D.uuid;let ut=c[tt];ut===void 0&&(ut={},c[tt]=ut);let at=ut[j];at===void 0&&(at=E.clone(),ut[j]=at,D.addEventListener("dispose",F)),E=at}if(E.visible=D.visible,E.wireframe=D.wireframe,A===$n?E.side=D.shadowSide!==null?D.shadowSide:D.side:E.side=D.shadowSide!==null?D.shadowSide:h[D.side],E.alphaMap=D.alphaMap,E.alphaTest=D.alphaTest,E.map=D.map,E.clipShadows=D.clipShadows,E.clippingPlanes=D.clippingPlanes,E.clipIntersection=D.clipIntersection,E.displacementMap=D.displacementMap,E.displacementScale=D.displacementScale,E.displacementBias=D.displacementBias,E.wireframeLinewidth=D.wireframeLinewidth,E.linewidth=D.linewidth,O.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const tt=n.properties.get(E);tt.light=O}return E}function M(L,D,O,A,E){if(L.visible===!1)return;if(L.layers.test(D.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&E===$n)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,L.matrixWorld);const j=t.update(L),ut=L.material;if(Array.isArray(ut)){const at=j.groups;for(let et=0,nt=at.length;et<nt;et++){const Y=at[et],gt=ut[Y.materialIndex];if(gt&&gt.visible){const Mt=b(L,gt,A,E);L.onBeforeShadow(n,L,D,O,j,Mt,Y),n.renderBufferDirect(O,null,j,Mt,L,Y),L.onAfterShadow(n,L,D,O,j,Mt,Y)}}}else if(ut.visible){const at=b(L,ut,A,E);L.onBeforeShadow(n,L,D,O,j,at,null),n.renderBufferDirect(O,null,j,at,L,null),L.onAfterShadow(n,L,D,O,j,at,null)}}const tt=L.children;for(let j=0,ut=tt.length;j<ut;j++)M(tt[j],D,O,A,E)}function F(L){L.target.removeEventListener("dispose",F);for(const O in c){const A=c[O],E=L.target.uuid;E in A&&(A[E].dispose(),delete A[E])}}}const sE={[vl]:xl,[Ml]:El,[Sl]:bl,[Ns]:yl,[xl]:vl,[El]:Ml,[bl]:Sl,[yl]:Ns};function rE(n,t){function e(){let B=!1;const St=new me;let rt=null;const ft=new me(0,0,0,0);return{setMask:function(wt){rt!==wt&&!B&&(n.colorMask(wt,wt,wt,wt),rt=wt)},setLocked:function(wt){B=wt},setClear:function(wt,bt,Wt,de,De){De===!0&&(wt*=de,bt*=de,Wt*=de),St.set(wt,bt,Wt,de),ft.equals(St)===!1&&(n.clearColor(wt,bt,Wt,de),ft.copy(St))},reset:function(){B=!1,rt=null,ft.set(-1,0,0,0)}}}function i(){let B=!1,St=!1,rt=null,ft=null,wt=null;return{setReversed:function(bt){if(St!==bt){const Wt=t.get("EXT_clip_control");St?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT);const de=wt;wt=null,this.setClear(de)}St=bt},getReversed:function(){return St},setTest:function(bt){bt?R(n.DEPTH_TEST):$(n.DEPTH_TEST)},setMask:function(bt){rt!==bt&&!B&&(n.depthMask(bt),rt=bt)},setFunc:function(bt){if(St&&(bt=sE[bt]),ft!==bt){switch(bt){case vl:n.depthFunc(n.NEVER);break;case xl:n.depthFunc(n.ALWAYS);break;case Ml:n.depthFunc(n.LESS);break;case Ns:n.depthFunc(n.LEQUAL);break;case Sl:n.depthFunc(n.EQUAL);break;case yl:n.depthFunc(n.GEQUAL);break;case El:n.depthFunc(n.GREATER);break;case bl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ft=bt}},setLocked:function(bt){B=bt},setClear:function(bt){wt!==bt&&(St&&(bt=1-bt),n.clearDepth(bt),wt=bt)},reset:function(){B=!1,rt=null,ft=null,wt=null,St=!1}}}function s(){let B=!1,St=null,rt=null,ft=null,wt=null,bt=null,Wt=null,de=null,De=null;return{setTest:function(ie){B||(ie?R(n.STENCIL_TEST):$(n.STENCIL_TEST))},setMask:function(ie){St!==ie&&!B&&(n.stencilMask(ie),St=ie)},setFunc:function(ie,mn,Vn){(rt!==ie||ft!==mn||wt!==Vn)&&(n.stencilFunc(ie,mn,Vn),rt=ie,ft=mn,wt=Vn)},setOp:function(ie,mn,Vn){(bt!==ie||Wt!==mn||de!==Vn)&&(n.stencilOp(ie,mn,Vn),bt=ie,Wt=mn,de=Vn)},setLocked:function(ie){B=ie},setClear:function(ie){De!==ie&&(n.clearStencil(ie),De=ie)},reset:function(){B=!1,St=null,rt=null,ft=null,wt=null,bt=null,Wt=null,de=null,De=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,S=null,b=null,M=null,F=null,L=null,D=new kt(0,0,0),O=0,A=!1,E=null,I=null,tt=null,j=null,ut=null;const at=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let et=!1,nt=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),et=nt>=1):Y.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),et=nt>=2);let gt=null,Mt={};const At=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),jt=new me().fromArray(At),st=new me().fromArray(Ut);function mt(B,St,rt,ft){const wt=new Uint8Array(4),bt=n.createTexture();n.bindTexture(B,bt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Wt=0;Wt<rt;Wt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(St,0,n.RGBA,1,1,ft,0,n.RGBA,n.UNSIGNED_BYTE,wt):n.texImage2D(St+Wt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,wt);return bt}const ct={};ct[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),ct[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ct[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ct[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),R(n.DEPTH_TEST),o.setFunc(Ns),U(!1),N(Wu),R(n.CULL_FACE),y(si);function R(B){u[B]!==!0&&(n.enable(B),u[B]=!0)}function $(B){u[B]!==!1&&(n.disable(B),u[B]=!1)}function Z(B,St){return h[B]!==St?(n.bindFramebuffer(B,St),h[B]=St,B===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=St),B===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=St),!0):!1}function ot(B,St){let rt=p,ft=!1;if(B){rt=f.get(St),rt===void 0&&(rt=[],f.set(St,rt));const wt=B.textures;if(rt.length!==wt.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let bt=0,Wt=wt.length;bt<Wt;bt++)rt[bt]=n.COLOR_ATTACHMENT0+bt;rt.length=wt.length,ft=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,ft=!0);ft&&n.drawBuffers(rt)}function Et(B){return g!==B?(n.useProgram(B),g=B,!0):!1}const w={[zi]:n.FUNC_ADD,[Rv]:n.FUNC_SUBTRACT,[Cv]:n.FUNC_REVERSE_SUBTRACT};w[Pv]=n.MIN,w[Dv]=n.MAX;const C={[Lv]:n.ZERO,[Iv]:n.ONE,[Uv]:n.SRC_COLOR,[gl]:n.SRC_ALPHA,[Hv]:n.SRC_ALPHA_SATURATE,[Bv]:n.DST_COLOR,[Ov]:n.DST_ALPHA,[Nv]:n.ONE_MINUS_SRC_COLOR,[_l]:n.ONE_MINUS_SRC_ALPHA,[zv]:n.ONE_MINUS_DST_COLOR,[Fv]:n.ONE_MINUS_DST_ALPHA,[Vv]:n.CONSTANT_COLOR,[Gv]:n.ONE_MINUS_CONSTANT_COLOR,[kv]:n.CONSTANT_ALPHA,[Wv]:n.ONE_MINUS_CONSTANT_ALPHA};function y(B,St,rt,ft,wt,bt,Wt,de,De,ie){if(B===si){v===!0&&($(n.BLEND),v=!1);return}if(v===!1&&(R(n.BLEND),v=!0),B!==wv){if(B!==m||ie!==A){if((d!==zi||M!==zi)&&(n.blendEquation(n.FUNC_ADD),d=zi,M=zi),ie)switch(B){case ws:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rs:n.blendFunc(n.ONE,n.ONE);break;case Xu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ws:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rs:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Xu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}S=null,b=null,F=null,L=null,D.set(0,0,0),O=0,m=B,A=ie}return}wt=wt||St,bt=bt||rt,Wt=Wt||ft,(St!==d||wt!==M)&&(n.blendEquationSeparate(w[St],w[wt]),d=St,M=wt),(rt!==S||ft!==b||bt!==F||Wt!==L)&&(n.blendFuncSeparate(C[rt],C[ft],C[bt],C[Wt]),S=rt,b=ft,F=bt,L=Wt),(de.equals(D)===!1||De!==O)&&(n.blendColor(de.r,de.g,de.b,De),D.copy(de),O=De),m=B,A=!1}function it(B,St){B.side===Un?$(n.CULL_FACE):R(n.CULL_FACE);let rt=B.side===tn;St&&(rt=!rt),U(rt),B.blending===ws&&B.transparent===!1?y(si):y(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const ft=B.stencilWrite;a.setTest(ft),ft&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),K(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?R(n.SAMPLE_ALPHA_TO_COVERAGE):$(n.SAMPLE_ALPHA_TO_COVERAGE)}function U(B){E!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),E=B)}function N(B){B!==bv?(R(n.CULL_FACE),B!==I&&(B===Wu?n.cullFace(n.BACK):B===Tv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):$(n.CULL_FACE),I=B}function k(B){B!==tt&&(et&&n.lineWidth(B),tt=B)}function K(B,St,rt){B?(R(n.POLYGON_OFFSET_FILL),(j!==St||ut!==rt)&&(n.polygonOffset(St,rt),j=St,ut=rt)):$(n.POLYGON_OFFSET_FILL)}function H(B){B?R(n.SCISSOR_TEST):$(n.SCISSOR_TEST)}function x(B){B===void 0&&(B=n.TEXTURE0+at-1),gt!==B&&(n.activeTexture(B),gt=B)}function _(B,St,rt){rt===void 0&&(gt===null?rt=n.TEXTURE0+at-1:rt=gt);let ft=Mt[rt];ft===void 0&&(ft={type:void 0,texture:void 0},Mt[rt]=ft),(ft.type!==B||ft.texture!==St)&&(gt!==rt&&(n.activeTexture(rt),gt=rt),n.bindTexture(B,St||ct[B]),ft.type=B,ft.texture=St)}function P(){const B=Mt[gt];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function W(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function X(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function dt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ht(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Rt(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function pt(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ot(B){jt.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),jt.copy(B))}function vt(B){st.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),st.copy(B))}function Bt(B,St){let rt=c.get(St);rt===void 0&&(rt=new WeakMap,c.set(St,rt));let ft=rt.get(B);ft===void 0&&(ft=n.getUniformBlockIndex(St,B.name),rt.set(B,ft))}function zt(B,St){const ft=c.get(St).get(B);l.get(St)!==ft&&(n.uniformBlockBinding(St,ft,B.__bindingPointIndex),l.set(St,ft))}function Zt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},gt=null,Mt={},h={},f=new WeakMap,p=[],g=null,v=!1,m=null,d=null,S=null,b=null,M=null,F=null,L=null,D=new kt(0,0,0),O=0,A=!1,E=null,I=null,tt=null,j=null,ut=null,jt.set(0,0,n.canvas.width,n.canvas.height),st.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:R,disable:$,bindFramebuffer:Z,drawBuffers:ot,useProgram:Et,setBlending:y,setMaterial:it,setFlipSided:U,setCullFace:N,setLineWidth:k,setPolygonOffset:K,setScissorTest:H,activeTexture:x,bindTexture:_,unbindTexture:P,compressedTexImage2D:W,compressedTexImage3D:q,texImage2D:xt,texImage3D:Ct,updateUBOMapping:Bt,uniformBlockBinding:zt,texStorage2D:Rt,texStorage3D:pt,texSubImage2D:X,texSubImage3D:dt,compressedTexSubImage2D:lt,compressedTexSubImage3D:ht,scissor:Ot,viewport:vt,reset:Zt}}function Hh(n,t,e,i){const s=oE(i);switch(e){case jd:return n*t;case $d:return n*t;case Zd:return n*t*2;case Jd:return n*t/s.components*s.byteLength;case Pc:return n*t/s.components*s.byteLength;case Qd:return n*t*2/s.components*s.byteLength;case Dc:return n*t*2/s.components*s.byteLength;case Kd:return n*t*3/s.components*s.byteLength;case fn:return n*t*4/s.components*s.byteLength;case Lc:return n*t*4/s.components*s.byteLength;case po:case mo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case go:case _o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Cl:case Dl:return Math.max(n,16)*Math.max(t,8)/4;case Rl:case Pl:return Math.max(n,8)*Math.max(t,8)/2;case Ll:case Il:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Nl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ol:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Fl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Bl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case zl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Hl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Vl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Gl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case kl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Xl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ql:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Yl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case jl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case vo:case Kl:case $l:return Math.ceil(n/4)*Math.ceil(t/4)*16;case tp:case Zl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Jl:case Ql:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function oE(n){switch(n){case zn:case Xd:return{byteLength:1,components:1};case br:case qd:case ri:return{byteLength:2,components:1};case Rc:case Cc:return{byteLength:2,components:4};case qi:case wc:case ei:return{byteLength:4,components:1};case Yd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function aE(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,_){return p?new OffscreenCanvas(x,_):Do("canvas")}function v(x,_,P){let W=1;const q=H(x);if((q.width>P||q.height>P)&&(W=P/Math.max(q.width,q.height)),W<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const X=Math.floor(W*q.width),dt=Math.floor(W*q.height);h===void 0&&(h=g(X,dt));const lt=_?g(X,dt):h;return lt.width=X,lt.height=dt,lt.getContext("2d").drawImage(x,0,0,X,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+X+"x"+dt+")."),lt}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),x;return x}function m(x){return x.generateMipmaps}function d(x){n.generateMipmap(x)}function S(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(x,_,P,W,q=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let X=_;if(_===n.RED&&(P===n.FLOAT&&(X=n.R32F),P===n.HALF_FLOAT&&(X=n.R16F),P===n.UNSIGNED_BYTE&&(X=n.R8)),_===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(X=n.R8UI),P===n.UNSIGNED_SHORT&&(X=n.R16UI),P===n.UNSIGNED_INT&&(X=n.R32UI),P===n.BYTE&&(X=n.R8I),P===n.SHORT&&(X=n.R16I),P===n.INT&&(X=n.R32I)),_===n.RG&&(P===n.FLOAT&&(X=n.RG32F),P===n.HALF_FLOAT&&(X=n.RG16F),P===n.UNSIGNED_BYTE&&(X=n.RG8)),_===n.RG_INTEGER&&(P===n.UNSIGNED_BYTE&&(X=n.RG8UI),P===n.UNSIGNED_SHORT&&(X=n.RG16UI),P===n.UNSIGNED_INT&&(X=n.RG32UI),P===n.BYTE&&(X=n.RG8I),P===n.SHORT&&(X=n.RG16I),P===n.INT&&(X=n.RG32I)),_===n.RGB_INTEGER&&(P===n.UNSIGNED_BYTE&&(X=n.RGB8UI),P===n.UNSIGNED_SHORT&&(X=n.RGB16UI),P===n.UNSIGNED_INT&&(X=n.RGB32UI),P===n.BYTE&&(X=n.RGB8I),P===n.SHORT&&(X=n.RGB16I),P===n.INT&&(X=n.RGB32I)),_===n.RGBA_INTEGER&&(P===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),P===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),P===n.UNSIGNED_INT&&(X=n.RGBA32UI),P===n.BYTE&&(X=n.RGBA8I),P===n.SHORT&&(X=n.RGBA16I),P===n.INT&&(X=n.RGBA32I)),_===n.RGB&&P===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),_===n.RGBA){const dt=q?Qo:Kt.getTransfer(W);P===n.FLOAT&&(X=n.RGBA32F),P===n.HALF_FLOAT&&(X=n.RGBA16F),P===n.UNSIGNED_BYTE&&(X=dt===se?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function M(x,_){let P;return x?_===null||_===qi||_===Bs?P=n.DEPTH24_STENCIL8:_===ei?P=n.DEPTH32F_STENCIL8:_===br&&(P=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===qi||_===Bs?P=n.DEPTH_COMPONENT24:_===ei?P=n.DEPTH_COMPONENT32F:_===br&&(P=n.DEPTH_COMPONENT16),P}function F(x,_){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==ln&&x.minFilter!==yn?Math.log2(Math.max(_.width,_.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?_.mipmaps.length:1}function L(x){const _=x.target;_.removeEventListener("dispose",L),O(_),_.isVideoTexture&&u.delete(_)}function D(x){const _=x.target;_.removeEventListener("dispose",D),E(_)}function O(x){const _=i.get(x);if(_.__webglInit===void 0)return;const P=x.source,W=f.get(P);if(W){const q=W[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&A(x),Object.keys(W).length===0&&f.delete(P)}i.remove(x)}function A(x){const _=i.get(x);n.deleteTexture(_.__webglTexture);const P=x.source,W=f.get(P);delete W[_.__cacheKey],o.memory.textures--}function E(x){const _=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(_.__webglFramebuffer[W]))for(let q=0;q<_.__webglFramebuffer[W].length;q++)n.deleteFramebuffer(_.__webglFramebuffer[W][q]);else n.deleteFramebuffer(_.__webglFramebuffer[W]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[W])}else{if(Array.isArray(_.__webglFramebuffer))for(let W=0;W<_.__webglFramebuffer.length;W++)n.deleteFramebuffer(_.__webglFramebuffer[W]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let W=0;W<_.__webglColorRenderbuffer.length;W++)_.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[W]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const P=x.textures;for(let W=0,q=P.length;W<q;W++){const X=i.get(P[W]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),o.memory.textures--),i.remove(P[W])}i.remove(x)}let I=0;function tt(){I=0}function j(){const x=I;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),I+=1,x}function ut(x){const _=[];return _.push(x.wrapS),_.push(x.wrapT),_.push(x.wrapR||0),_.push(x.magFilter),_.push(x.minFilter),_.push(x.anisotropy),_.push(x.internalFormat),_.push(x.format),_.push(x.type),_.push(x.generateMipmaps),_.push(x.premultiplyAlpha),_.push(x.flipY),_.push(x.unpackAlignment),_.push(x.colorSpace),_.join()}function at(x,_){const P=i.get(x);if(x.isVideoTexture&&k(x),x.isRenderTargetTexture===!1&&x.version>0&&P.__version!==x.version){const W=x.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{st(P,x,_);return}}e.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+_)}function et(x,_){const P=i.get(x);if(x.version>0&&P.__version!==x.version){st(P,x,_);return}e.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+_)}function nt(x,_){const P=i.get(x);if(x.version>0&&P.__version!==x.version){st(P,x,_);return}e.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+_)}function Y(x,_){const P=i.get(x);if(x.version>0&&P.__version!==x.version){mt(P,x,_);return}e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+_)}const gt={[Er]:n.REPEAT,[Gi]:n.CLAMP_TO_EDGE,[wl]:n.MIRRORED_REPEAT},Mt={[ln]:n.NEAREST,[jv]:n.NEAREST_MIPMAP_NEAREST,[Fr]:n.NEAREST_MIPMAP_LINEAR,[yn]:n.LINEAR,[xa]:n.LINEAR_MIPMAP_NEAREST,[bi]:n.LINEAR_MIPMAP_LINEAR},At={[Jv]:n.NEVER,[s0]:n.ALWAYS,[Qv]:n.LESS,[np]:n.LEQUAL,[t0]:n.EQUAL,[i0]:n.GEQUAL,[e0]:n.GREATER,[n0]:n.NOTEQUAL};function Ut(x,_){if(_.type===ei&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===yn||_.magFilter===xa||_.magFilter===Fr||_.magFilter===bi||_.minFilter===yn||_.minFilter===xa||_.minFilter===Fr||_.minFilter===bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,gt[_.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,gt[_.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,gt[_.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,Mt[_.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,Mt[_.minFilter]),_.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,At[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===ln||_.minFilter!==Fr&&_.minFilter!==bi||_.type===ei&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const P=t.get("EXT_texture_filter_anisotropic");n.texParameterf(x,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function jt(x,_){let P=!1;x.__webglInit===void 0&&(x.__webglInit=!0,_.addEventListener("dispose",L));const W=_.source;let q=f.get(W);q===void 0&&(q={},f.set(W,q));const X=ut(_);if(X!==x.__cacheKey){q[X]===void 0&&(q[X]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,P=!0),q[X].usedTimes++;const dt=q[x.__cacheKey];dt!==void 0&&(q[x.__cacheKey].usedTimes--,dt.usedTimes===0&&A(_)),x.__cacheKey=X,x.__webglTexture=q[X].texture}return P}function st(x,_,P){let W=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(W=n.TEXTURE_3D);const q=jt(x,_),X=_.source;e.bindTexture(W,x.__webglTexture,n.TEXTURE0+P);const dt=i.get(X);if(X.version!==dt.__version||q===!0){e.activeTexture(n.TEXTURE0+P);const lt=Kt.getPrimaries(Kt.workingColorSpace),ht=_.colorSpace===Ei?null:Kt.getPrimaries(_.colorSpace),Rt=_.colorSpace===Ei||lt===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let pt=v(_.image,!1,s.maxTextureSize);pt=K(_,pt);const xt=r.convert(_.format,_.colorSpace),Ct=r.convert(_.type);let Ot=b(_.internalFormat,xt,Ct,_.colorSpace,_.isVideoTexture);Ut(W,_);let vt;const Bt=_.mipmaps,zt=_.isVideoTexture!==!0,Zt=dt.__version===void 0||q===!0,B=X.dataReady,St=F(_,pt);if(_.isDepthTexture)Ot=M(_.format===zs,_.type),Zt&&(zt?e.texStorage2D(n.TEXTURE_2D,1,Ot,pt.width,pt.height):e.texImage2D(n.TEXTURE_2D,0,Ot,pt.width,pt.height,0,xt,Ct,null));else if(_.isDataTexture)if(Bt.length>0){zt&&Zt&&e.texStorage2D(n.TEXTURE_2D,St,Ot,Bt[0].width,Bt[0].height);for(let rt=0,ft=Bt.length;rt<ft;rt++)vt=Bt[rt],zt?B&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,vt.width,vt.height,xt,Ct,vt.data):e.texImage2D(n.TEXTURE_2D,rt,Ot,vt.width,vt.height,0,xt,Ct,vt.data);_.generateMipmaps=!1}else zt?(Zt&&e.texStorage2D(n.TEXTURE_2D,St,Ot,pt.width,pt.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,pt.width,pt.height,xt,Ct,pt.data)):e.texImage2D(n.TEXTURE_2D,0,Ot,pt.width,pt.height,0,xt,Ct,pt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){zt&&Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,St,Ot,Bt[0].width,Bt[0].height,pt.depth);for(let rt=0,ft=Bt.length;rt<ft;rt++)if(vt=Bt[rt],_.format!==fn)if(xt!==null)if(zt){if(B)if(_.layerUpdates.size>0){const wt=Hh(vt.width,vt.height,_.format,_.type);for(const bt of _.layerUpdates){const Wt=vt.data.subarray(bt*wt/vt.data.BYTES_PER_ELEMENT,(bt+1)*wt/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,bt,vt.width,vt.height,1,xt,Wt)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,vt.width,vt.height,pt.depth,xt,vt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Ot,vt.width,vt.height,pt.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,vt.width,vt.height,pt.depth,xt,Ct,vt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Ot,vt.width,vt.height,pt.depth,0,xt,Ct,vt.data)}else{zt&&Zt&&e.texStorage2D(n.TEXTURE_2D,St,Ot,Bt[0].width,Bt[0].height);for(let rt=0,ft=Bt.length;rt<ft;rt++)vt=Bt[rt],_.format!==fn?xt!==null?zt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,vt.width,vt.height,xt,vt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Ot,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?B&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,vt.width,vt.height,xt,Ct,vt.data):e.texImage2D(n.TEXTURE_2D,rt,Ot,vt.width,vt.height,0,xt,Ct,vt.data)}else if(_.isDataArrayTexture)if(zt){if(Zt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,St,Ot,pt.width,pt.height,pt.depth),B)if(_.layerUpdates.size>0){const rt=Hh(pt.width,pt.height,_.format,_.type);for(const ft of _.layerUpdates){const wt=pt.data.subarray(ft*rt/pt.data.BYTES_PER_ELEMENT,(ft+1)*rt/pt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ft,pt.width,pt.height,1,xt,Ct,wt)}_.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,pt.width,pt.height,pt.depth,xt,Ct,pt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ot,pt.width,pt.height,pt.depth,0,xt,Ct,pt.data);else if(_.isData3DTexture)zt?(Zt&&e.texStorage3D(n.TEXTURE_3D,St,Ot,pt.width,pt.height,pt.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,pt.width,pt.height,pt.depth,xt,Ct,pt.data)):e.texImage3D(n.TEXTURE_3D,0,Ot,pt.width,pt.height,pt.depth,0,xt,Ct,pt.data);else if(_.isFramebufferTexture){if(Zt)if(zt)e.texStorage2D(n.TEXTURE_2D,St,Ot,pt.width,pt.height);else{let rt=pt.width,ft=pt.height;for(let wt=0;wt<St;wt++)e.texImage2D(n.TEXTURE_2D,wt,Ot,rt,ft,0,xt,Ct,null),rt>>=1,ft>>=1}}else if(Bt.length>0){if(zt&&Zt){const rt=H(Bt[0]);e.texStorage2D(n.TEXTURE_2D,St,Ot,rt.width,rt.height)}for(let rt=0,ft=Bt.length;rt<ft;rt++)vt=Bt[rt],zt?B&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,xt,Ct,vt):e.texImage2D(n.TEXTURE_2D,rt,Ot,xt,Ct,vt);_.generateMipmaps=!1}else if(zt){if(Zt){const rt=H(pt);e.texStorage2D(n.TEXTURE_2D,St,Ot,rt.width,rt.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,Ct,pt)}else e.texImage2D(n.TEXTURE_2D,0,Ot,xt,Ct,pt);m(_)&&d(W),dt.__version=X.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function mt(x,_,P){if(_.image.length!==6)return;const W=jt(x,_),q=_.source;e.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+P);const X=i.get(q);if(q.version!==X.__version||W===!0){e.activeTexture(n.TEXTURE0+P);const dt=Kt.getPrimaries(Kt.workingColorSpace),lt=_.colorSpace===Ei?null:Kt.getPrimaries(_.colorSpace),ht=_.colorSpace===Ei||dt===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Rt=_.isCompressedTexture||_.image[0].isCompressedTexture,pt=_.image[0]&&_.image[0].isDataTexture,xt=[];for(let ft=0;ft<6;ft++)!Rt&&!pt?xt[ft]=v(_.image[ft],!0,s.maxCubemapSize):xt[ft]=pt?_.image[ft].image:_.image[ft],xt[ft]=K(_,xt[ft]);const Ct=xt[0],Ot=r.convert(_.format,_.colorSpace),vt=r.convert(_.type),Bt=b(_.internalFormat,Ot,vt,_.colorSpace),zt=_.isVideoTexture!==!0,Zt=X.__version===void 0||W===!0,B=q.dataReady;let St=F(_,Ct);Ut(n.TEXTURE_CUBE_MAP,_);let rt;if(Rt){zt&&Zt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,St,Bt,Ct.width,Ct.height);for(let ft=0;ft<6;ft++){rt=xt[ft].mipmaps;for(let wt=0;wt<rt.length;wt++){const bt=rt[wt];_.format!==fn?Ot!==null?zt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt,0,0,bt.width,bt.height,Ot,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt,Bt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt,0,0,bt.width,bt.height,Ot,vt,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt,Bt,bt.width,bt.height,0,Ot,vt,bt.data)}}}else{if(rt=_.mipmaps,zt&&Zt){rt.length>0&&St++;const ft=H(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,St,Bt,ft.width,ft.height)}for(let ft=0;ft<6;ft++)if(pt){zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,xt[ft].width,xt[ft].height,Ot,vt,xt[ft].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,Bt,xt[ft].width,xt[ft].height,0,Ot,vt,xt[ft].data);for(let wt=0;wt<rt.length;wt++){const Wt=rt[wt].image[ft].image;zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt+1,0,0,Wt.width,Wt.height,Ot,vt,Wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt+1,Bt,Wt.width,Wt.height,0,Ot,vt,Wt.data)}}else{zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,0,0,Ot,vt,xt[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0,Bt,Ot,vt,xt[ft]);for(let wt=0;wt<rt.length;wt++){const bt=rt[wt];zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt+1,0,0,Ot,vt,bt.image[ft]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,wt+1,Bt,Ot,vt,bt.image[ft])}}}m(_)&&d(n.TEXTURE_CUBE_MAP),X.__version=q.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function ct(x,_,P,W,q,X){const dt=r.convert(P.format,P.colorSpace),lt=r.convert(P.type),ht=b(P.internalFormat,dt,lt,P.colorSpace),Rt=i.get(_),pt=i.get(P);if(pt.__renderTarget=_,!Rt.__hasExternalTextures){const xt=Math.max(1,_.width>>X),Ct=Math.max(1,_.height>>X);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?e.texImage3D(q,X,ht,xt,Ct,_.depth,0,dt,lt,null):e.texImage2D(q,X,ht,xt,Ct,0,dt,lt,null)}e.bindFramebuffer(n.FRAMEBUFFER,x),N(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,q,pt.__webglTexture,0,U(_)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,q,pt.__webglTexture,X),e.bindFramebuffer(n.FRAMEBUFFER,null)}function R(x,_,P){if(n.bindRenderbuffer(n.RENDERBUFFER,x),_.depthBuffer){const W=_.depthTexture,q=W&&W.isDepthTexture?W.type:null,X=M(_.stencilBuffer,q),dt=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=U(_);N(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt,X,_.width,_.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,X,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,X,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,dt,n.RENDERBUFFER,x)}else{const W=_.textures;for(let q=0;q<W.length;q++){const X=W[q],dt=r.convert(X.format,X.colorSpace),lt=r.convert(X.type),ht=b(X.internalFormat,dt,lt,X.colorSpace),Rt=U(_);P&&N(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,ht,_.width,_.height):N(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Rt,ht,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ht,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $(x,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,x),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=i.get(_.depthTexture);W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),at(_.depthTexture,0);const q=W.__webglTexture,X=U(_);if(_.depthTexture.format===Cs)N(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0);else if(_.depthTexture.format===zs)N(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function Z(x){const _=i.get(x),P=x.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==x.depthTexture){const W=x.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),W){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,W.removeEventListener("dispose",q)};W.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=W}if(x.depthTexture&&!_.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");$(_.__webglFramebuffer,x)}else if(P){_.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[W]),_.__webglDepthbuffer[W]===void 0)_.__webglDepthbuffer[W]=n.createRenderbuffer(),R(_.__webglDepthbuffer[W],x,!1);else{const q=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,X)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),R(_.__webglDepthbuffer,x,!1);else{const W=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,q)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ot(x,_,P){const W=i.get(x);_!==void 0&&ct(W.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&Z(x)}function Et(x){const _=x.texture,P=i.get(x),W=i.get(_);x.addEventListener("dispose",D);const q=x.textures,X=x.isWebGLCubeRenderTarget===!0,dt=q.length>1;if(dt||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=_.version,o.memory.textures++),X){P.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer[lt]=[];for(let ht=0;ht<_.mipmaps.length;ht++)P.__webglFramebuffer[lt][ht]=n.createFramebuffer()}else P.__webglFramebuffer[lt]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer=[];for(let lt=0;lt<_.mipmaps.length;lt++)P.__webglFramebuffer[lt]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(dt)for(let lt=0,ht=q.length;lt<ht;lt++){const Rt=i.get(q[lt]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=n.createTexture(),o.memory.textures++)}if(x.samples>0&&N(x)===!1){P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let lt=0;lt<q.length;lt++){const ht=q[lt];P.__webglColorRenderbuffer[lt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[lt]);const Rt=r.convert(ht.format,ht.colorSpace),pt=r.convert(ht.type),xt=b(ht.internalFormat,Rt,pt,ht.colorSpace,x.isXRRenderTarget===!0),Ct=U(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ct,xt,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+lt,n.RENDERBUFFER,P.__webglColorRenderbuffer[lt])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),R(P.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Ut(n.TEXTURE_CUBE_MAP,_);for(let lt=0;lt<6;lt++)if(_.mipmaps&&_.mipmaps.length>0)for(let ht=0;ht<_.mipmaps.length;ht++)ct(P.__webglFramebuffer[lt][ht],x,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ht);else ct(P.__webglFramebuffer[lt],x,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(_)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let lt=0,ht=q.length;lt<ht;lt++){const Rt=q[lt],pt=i.get(Rt);e.bindTexture(n.TEXTURE_2D,pt.__webglTexture),Ut(n.TEXTURE_2D,Rt),ct(P.__webglFramebuffer,x,Rt,n.COLOR_ATTACHMENT0+lt,n.TEXTURE_2D,0),m(Rt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let lt=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(lt=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(lt,W.__webglTexture),Ut(lt,_),_.mipmaps&&_.mipmaps.length>0)for(let ht=0;ht<_.mipmaps.length;ht++)ct(P.__webglFramebuffer[ht],x,_,n.COLOR_ATTACHMENT0,lt,ht);else ct(P.__webglFramebuffer,x,_,n.COLOR_ATTACHMENT0,lt,0);m(_)&&d(lt),e.unbindTexture()}x.depthBuffer&&Z(x)}function w(x){const _=x.textures;for(let P=0,W=_.length;P<W;P++){const q=_[P];if(m(q)){const X=S(x),dt=i.get(q).__webglTexture;e.bindTexture(X,dt),d(X),e.unbindTexture()}}}const C=[],y=[];function it(x){if(x.samples>0){if(N(x)===!1){const _=x.textures,P=x.width,W=x.height;let q=n.COLOR_BUFFER_BIT;const X=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=i.get(x),lt=_.length>1;if(lt)for(let ht=0;ht<_.length;ht++)e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let ht=0;ht<_.length;ht++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),lt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,dt.__webglColorRenderbuffer[ht]);const Rt=i.get(_[ht]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Rt,0)}n.blitFramebuffer(0,0,P,W,0,0,P,W,q,n.NEAREST),l===!0&&(C.length=0,y.length=0,C.push(n.COLOR_ATTACHMENT0+ht),x.depthBuffer&&x.resolveDepthBuffer===!1&&(C.push(X),y.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),lt)for(let ht=0;ht<_.length;ht++){e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,dt.__webglColorRenderbuffer[ht]);const Rt=i.get(_[ht]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,Rt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const _=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function U(x){return Math.min(s.maxSamples,x.samples)}function N(x){const _=i.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(x){const _=o.render.frame;u.get(x)!==_&&(u.set(x,_),x.update())}function K(x,_){const P=x.colorSpace,W=x.format,q=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||P!==Gs&&P!==Ei&&(Kt.getTransfer(P)===se?(W!==fn||q!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),_}function H(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=tt,this.setTexture2D=at,this.setTexture2DArray=et,this.setTexture3D=nt,this.setTextureCube=Y,this.rebindTextures=ot,this.setupRenderTarget=Et,this.updateRenderTargetMipmap=w,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=Z,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=N}function lE(n,t){function e(i,s=Ei){let r;const o=Kt.getTransfer(s);if(i===zn)return n.UNSIGNED_BYTE;if(i===Rc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Cc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xd)return n.BYTE;if(i===qd)return n.SHORT;if(i===br)return n.UNSIGNED_SHORT;if(i===wc)return n.INT;if(i===qi)return n.UNSIGNED_INT;if(i===ei)return n.FLOAT;if(i===ri)return n.HALF_FLOAT;if(i===jd)return n.ALPHA;if(i===Kd)return n.RGB;if(i===fn)return n.RGBA;if(i===$d)return n.LUMINANCE;if(i===Zd)return n.LUMINANCE_ALPHA;if(i===Cs)return n.DEPTH_COMPONENT;if(i===zs)return n.DEPTH_STENCIL;if(i===Jd)return n.RED;if(i===Pc)return n.RED_INTEGER;if(i===Qd)return n.RG;if(i===Dc)return n.RG_INTEGER;if(i===Lc)return n.RGBA_INTEGER;if(i===po||i===mo||i===go||i===_o)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===po)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===mo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===go)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===_o)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===po)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===mo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===go)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===_o)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Rl||i===Cl||i===Pl||i===Dl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Pl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ll||i===Il||i===Ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ll||i===Il)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ul)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Nl||i===Ol||i===Fl||i===Bl||i===zl||i===Hl||i===Vl||i===Gl||i===kl||i===Wl||i===Xl||i===ql||i===Yl||i===jl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Nl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ol)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===kl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Wl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ql)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Yl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jl)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===vo||i===Kl||i===$l)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===vo)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$l)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===tp||i===Zl||i===Jl||i===Ql)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===vo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ql)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Bs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class cE extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ss extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uE={type:"move"};class Ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ss,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ss,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ss,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),d=this._getHandJoint(c,v);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(uE)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Ss;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const hE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fE=`
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

}`;class dE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ye,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Be({vertexShader:hE,fragmentShader:fE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Re(new ta(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pE extends $i{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const v=new dE,m=e.getContextAttributes();let d=null,S=null;const b=[],M=[],F=new It;let L=null;const D=new hn;D.viewport=new me;const O=new hn;O.viewport=new me;const A=[D,O],E=new cE;let I=null,tt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(st){let mt=b[st];return mt===void 0&&(mt=new Ya,b[st]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(st){let mt=b[st];return mt===void 0&&(mt=new Ya,b[st]=mt),mt.getGripSpace()},this.getHand=function(st){let mt=b[st];return mt===void 0&&(mt=new Ya,b[st]=mt),mt.getHandSpace()};function j(st){const mt=M.indexOf(st.inputSource);if(mt===-1)return;const ct=b[mt];ct!==void 0&&(ct.update(st.inputSource,st.frame,c||o),ct.dispatchEvent({type:st.type,data:st.inputSource}))}function ut(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",ut),s.removeEventListener("inputsourceschange",at);for(let st=0;st<b.length;st++){const mt=M[st];mt!==null&&(M[st]=null,b[st].disconnect(mt))}I=null,tt=null,v.reset(),t.setRenderTarget(d),p=null,f=null,h=null,s=null,S=null,jt.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(st){r=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(st){a=st,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(st){c=st},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(st){if(s=st,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",ut),s.addEventListener("inputsourceschange",at),m.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const mt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new bn(p.framebufferWidth,p.framebufferHeight,{format:fn,type:zn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let mt=null,ct=null,R=null;m.depth&&(R=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=m.stencil?zs:Cs,ct=m.stencil?Bs:qi);const $={colorFormat:e.RGBA8,depthFormat:R,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer($),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new bn(f.textureWidth,f.textureHeight,{format:fn,type:zn,depthTexture:new dp(f.textureWidth,f.textureHeight,ct,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),jt.setContext(s),jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function at(st){for(let mt=0;mt<st.removed.length;mt++){const ct=st.removed[mt],R=M.indexOf(ct);R>=0&&(M[R]=null,b[R].disconnect(ct))}for(let mt=0;mt<st.added.length;mt++){const ct=st.added[mt];let R=M.indexOf(ct);if(R===-1){for(let Z=0;Z<b.length;Z++)if(Z>=M.length){M.push(ct),R=Z;break}else if(M[Z]===null){M[Z]=ct,R=Z;break}if(R===-1)break}const $=b[R];$&&$.connect(ct)}}const et=new z,nt=new z;function Y(st,mt,ct){et.setFromMatrixPosition(mt.matrixWorld),nt.setFromMatrixPosition(ct.matrixWorld);const R=et.distanceTo(nt),$=mt.projectionMatrix.elements,Z=ct.projectionMatrix.elements,ot=$[14]/($[10]-1),Et=$[14]/($[10]+1),w=($[9]+1)/$[5],C=($[9]-1)/$[5],y=($[8]-1)/$[0],it=(Z[8]+1)/Z[0],U=ot*y,N=ot*it,k=R/(-y+it),K=k*-y;if(mt.matrixWorld.decompose(st.position,st.quaternion,st.scale),st.translateX(K),st.translateZ(k),st.matrixWorld.compose(st.position,st.quaternion,st.scale),st.matrixWorldInverse.copy(st.matrixWorld).invert(),$[10]===-1)st.projectionMatrix.copy(mt.projectionMatrix),st.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const H=ot+k,x=Et+k,_=U-K,P=N+(R-K),W=w*Et/x*H,q=C*Et/x*H;st.projectionMatrix.makePerspective(_,P,W,q,H,x),st.projectionMatrixInverse.copy(st.projectionMatrix).invert()}}function gt(st,mt){mt===null?st.matrixWorld.copy(st.matrix):st.matrixWorld.multiplyMatrices(mt.matrixWorld,st.matrix),st.matrixWorldInverse.copy(st.matrixWorld).invert()}this.updateCamera=function(st){if(s===null)return;let mt=st.near,ct=st.far;v.texture!==null&&(v.depthNear>0&&(mt=v.depthNear),v.depthFar>0&&(ct=v.depthFar)),E.near=O.near=D.near=mt,E.far=O.far=D.far=ct,(I!==E.near||tt!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),I=E.near,tt=E.far),D.layers.mask=st.layers.mask|2,O.layers.mask=st.layers.mask|4,E.layers.mask=D.layers.mask|O.layers.mask;const R=st.parent,$=E.cameras;gt(E,R);for(let Z=0;Z<$.length;Z++)gt($[Z],R);$.length===2?Y(E,D,O):E.projectionMatrix.copy(D.projectionMatrix),Mt(st,E,R)};function Mt(st,mt,ct){ct===null?st.matrix.copy(mt.matrixWorld):(st.matrix.copy(ct.matrixWorld),st.matrix.invert(),st.matrix.multiply(mt.matrixWorld)),st.matrix.decompose(st.position,st.quaternion,st.scale),st.updateMatrixWorld(!0),st.projectionMatrix.copy(mt.projectionMatrix),st.projectionMatrixInverse.copy(mt.projectionMatrixInverse),st.isPerspectiveCamera&&(st.fov=tc*2*Math.atan(1/st.projectionMatrix.elements[5]),st.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(st){l=st,f!==null&&(f.fixedFoveation=st),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=st)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(E)};let At=null;function Ut(st,mt){if(u=mt.getViewerPose(c||o),g=mt,u!==null){const ct=u.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let R=!1;ct.length!==E.cameras.length&&(E.cameras.length=0,R=!0);for(let Z=0;Z<ct.length;Z++){const ot=ct[Z];let Et=null;if(p!==null)Et=p.getViewport(ot);else{const C=h.getViewSubImage(f,ot);Et=C.viewport,Z===0&&(t.setRenderTargetTextures(S,C.colorTexture,f.ignoreDepthValues?void 0:C.depthStencilTexture),t.setRenderTarget(S))}let w=A[Z];w===void 0&&(w=new hn,w.layers.enable(Z),w.viewport=new me,A[Z]=w),w.matrix.fromArray(ot.transform.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale),w.projectionMatrix.fromArray(ot.projectionMatrix),w.projectionMatrixInverse.copy(w.projectionMatrix).invert(),w.viewport.set(Et.x,Et.y,Et.width,Et.height),Z===0&&(E.matrix.copy(w.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),R===!0&&E.cameras.push(w)}const $=s.enabledFeatures;if($&&$.includes("depth-sensing")){const Z=h.getDepthInformation(ct[0]);Z&&Z.isValid&&Z.texture&&v.init(t,Z,s.renderState)}}for(let ct=0;ct<b.length;ct++){const R=M[ct],$=b[ct];R!==null&&$!==void 0&&$.update(R,mt,c||o)}At&&At(st,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),g=null}const jt=new fp;jt.setAnimationLoop(Ut),this.setAnimationLoop=function(st){At=st},this.dispose=function(){}}}const Oi=new Hn,mE=new le;function gE(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,cp(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,b,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),v(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,S,b):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===tn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===tn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=t.get(d),b=S.envMap,M=S.envMapRotation;b&&(m.envMap.value=b,Oi.copy(M),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),m.envMapRotation.value.setFromMatrix4(mE.makeRotationFromEuler(Oi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,S,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=b*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===tn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function v(m,d){const S=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function _E(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const M=b.program;i.uniformBlockBinding(S,M)}function c(S,b){let M=s[S.id];M===void 0&&(g(S),M=u(S),s[S.id]=M,S.addEventListener("dispose",m));const F=b.program;i.updateUBOMapping(S,F);const L=t.render.frame;r[S.id]!==L&&(f(S),r[S.id]=L)}function u(S){const b=h();S.__bindingPointIndex=b;const M=n.createBuffer(),F=S.__size,L=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,F,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,M),M}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const b=s[S.id],M=S.uniforms,F=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let L=0,D=M.length;L<D;L++){const O=Array.isArray(M[L])?M[L]:[M[L]];for(let A=0,E=O.length;A<E;A++){const I=O[A];if(p(I,L,A,F)===!0){const tt=I.__offset,j=Array.isArray(I.value)?I.value:[I.value];let ut=0;for(let at=0;at<j.length;at++){const et=j[at],nt=v(et);typeof et=="number"||typeof et=="boolean"?(I.__data[0]=et,n.bufferSubData(n.UNIFORM_BUFFER,tt+ut,I.__data)):et.isMatrix3?(I.__data[0]=et.elements[0],I.__data[1]=et.elements[1],I.__data[2]=et.elements[2],I.__data[3]=0,I.__data[4]=et.elements[3],I.__data[5]=et.elements[4],I.__data[6]=et.elements[5],I.__data[7]=0,I.__data[8]=et.elements[6],I.__data[9]=et.elements[7],I.__data[10]=et.elements[8],I.__data[11]=0):(et.toArray(I.__data,ut),ut+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,tt,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,b,M,F){const L=S.value,D=b+"_"+M;if(F[D]===void 0)return typeof L=="number"||typeof L=="boolean"?F[D]=L:F[D]=L.clone(),!0;{const O=F[D];if(typeof L=="number"||typeof L=="boolean"){if(O!==L)return F[D]=L,!0}else if(O.equals(L)===!1)return O.copy(L),!0}return!1}function g(S){const b=S.uniforms;let M=0;const F=16;for(let D=0,O=b.length;D<O;D++){const A=Array.isArray(b[D])?b[D]:[b[D]];for(let E=0,I=A.length;E<I;E++){const tt=A[E],j=Array.isArray(tt.value)?tt.value:[tt.value];for(let ut=0,at=j.length;ut<at;ut++){const et=j[ut],nt=v(et),Y=M%F,gt=Y%nt.boundary,Mt=Y+gt;M+=gt,Mt!==0&&F-Mt<nt.storage&&(M+=F-Mt),tt.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),tt.__offset=M,M+=nt.storage}}}const L=M%F;return L>0&&(M+=F-L),S.__size=M,S.__cache={},this}function v(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function m(S){const b=S.target;b.removeEventListener("dispose",m);const M=o.indexOf(b.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function d(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class vE{constructor(t={}){const{canvas:e=a0(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,d=null;const S=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Je,this.toneMapping=Ti,this.toneMappingExposure=1;const M=this;let F=!1,L=0,D=0,O=null,A=-1,E=null;const I=new me,tt=new me;let j=null;const ut=new kt(0);let at=0,et=e.width,nt=e.height,Y=1,gt=null,Mt=null;const At=new me(0,0,et,nt),Ut=new me(0,0,et,nt);let jt=!1;const st=new Uc;let mt=!1,ct=!1;const R=new le,$=new le,Z=new z,ot=new me,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let w=!1;function C(){return O===null?Y:1}let y=i;function it(T,V){return e.getContext(T,V)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Tc}`),e.addEventListener("webglcontextlost",ft,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",bt,!1),y===null){const V="webgl2";if(y=it(V,T),y===null)throw it(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let U,N,k,K,H,x,_,P,W,q,X,dt,lt,ht,Rt,pt,xt,Ct,Ot,vt,Bt,zt,Zt,B;function St(){U=new ES(y),U.init(),zt=new lE(y,U),N=new _S(y,U,t,zt),k=new rE(y,U),N.reverseDepthBuffer&&f&&k.buffers.depth.setReversed(!0),K=new AS(y),H=new Wy,x=new aE(y,U,k,H,N,zt,K),_=new xS(M),P=new yS(M),W=new I0(y),Zt=new mS(y,W),q=new bS(y,W,K,Zt),X=new RS(y,q,W,K),Ot=new wS(y,N,x),pt=new vS(H),dt=new ky(M,_,P,U,N,Zt,pt),lt=new gE(M,H),ht=new qy,Rt=new Jy(U),Ct=new pS(M,_,P,k,X,p,l),xt=new iE(M,X,N),B=new _E(y,K,N,k),vt=new gS(y,U,K),Bt=new TS(y,U,K),K.programs=dt.programs,M.capabilities=N,M.extensions=U,M.properties=H,M.renderLists=ht,M.shadowMap=xt,M.state=k,M.info=K}St();const rt=new pE(M,y);this.xr=rt,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const T=U.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=U.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(T){T!==void 0&&(Y=T,this.setSize(et,nt,!1))},this.getSize=function(T){return T.set(et,nt)},this.setSize=function(T,V,J=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}et=T,nt=V,e.width=Math.floor(T*Y),e.height=Math.floor(V*Y),J===!0&&(e.style.width=T+"px",e.style.height=V+"px"),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(et*Y,nt*Y).floor()},this.setDrawingBufferSize=function(T,V,J){et=T,nt=V,Y=J,e.width=Math.floor(T*J),e.height=Math.floor(V*J),this.setViewport(0,0,T,V)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(At)},this.setViewport=function(T,V,J,Q){T.isVector4?At.set(T.x,T.y,T.z,T.w):At.set(T,V,J,Q),k.viewport(I.copy(At).multiplyScalar(Y).round())},this.getScissor=function(T){return T.copy(Ut)},this.setScissor=function(T,V,J,Q){T.isVector4?Ut.set(T.x,T.y,T.z,T.w):Ut.set(T,V,J,Q),k.scissor(tt.copy(Ut).multiplyScalar(Y).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(T){k.setScissorTest(jt=T)},this.setOpaqueSort=function(T){gt=T},this.setTransparentSort=function(T){Mt=T},this.getClearColor=function(T){return T.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(T=!0,V=!0,J=!0){let Q=0;if(T){let G=!1;if(O!==null){const _t=O.texture.format;G=_t===Lc||_t===Dc||_t===Pc}if(G){const _t=O.texture.type,Tt=_t===zn||_t===qi||_t===br||_t===Bs||_t===Rc||_t===Cc,Pt=Ct.getClearColor(),Dt=Ct.getClearAlpha(),Vt=Pt.r,Xt=Pt.g,Lt=Pt.b;Tt?(g[0]=Vt,g[1]=Xt,g[2]=Lt,g[3]=Dt,y.clearBufferuiv(y.COLOR,0,g)):(v[0]=Vt,v[1]=Xt,v[2]=Lt,v[3]=Dt,y.clearBufferiv(y.COLOR,0,v))}else Q|=y.COLOR_BUFFER_BIT}V&&(Q|=y.DEPTH_BUFFER_BIT),J&&(Q|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ft,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),ht.dispose(),Rt.dispose(),H.dispose(),_.dispose(),P.dispose(),X.dispose(),Zt.dispose(),B.dispose(),dt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",kc),rt.removeEventListener("sessionend",Wc),Ri.stop()};function ft(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const T=K.autoReset,V=xt.enabled,J=xt.autoUpdate,Q=xt.needsUpdate,G=xt.type;St(),K.autoReset=T,xt.enabled=V,xt.autoUpdate=J,xt.needsUpdate=Q,xt.type=G}function bt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Wt(T){const V=T.target;V.removeEventListener("dispose",Wt),de(V)}function de(T){De(T),H.remove(T)}function De(T){const V=H.get(T).programs;V!==void 0&&(V.forEach(function(J){dt.releaseProgram(J)}),T.isShaderMaterial&&dt.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,J,Q,G,_t){V===null&&(V=Et);const Tt=G.isMesh&&G.matrixWorld.determinant()<0,Pt=yp(T,V,J,Q,G);k.setMaterial(Q,Tt);let Dt=J.index,Vt=1;if(Q.wireframe===!0){if(Dt=q.getWireframeAttribute(J),Dt===void 0)return;Vt=2}const Xt=J.drawRange,Lt=J.attributes.position;let $t=Xt.start*Vt,ce=(Xt.start+Xt.count)*Vt;_t!==null&&($t=Math.max($t,_t.start*Vt),ce=Math.min(ce,(_t.start+_t.count)*Vt)),Dt!==null?($t=Math.max($t,0),ce=Math.min(ce,Dt.count)):Lt!=null&&($t=Math.max($t,0),ce=Math.min(ce,Lt.count));const he=ce-$t;if(he<0||he===1/0)return;Zt.setup(G,Q,Pt,J,Dt);let je,Jt=vt;if(Dt!==null&&(je=W.get(Dt),Jt=Bt,Jt.setIndex(je)),G.isMesh)Q.wireframe===!0?(k.setLineWidth(Q.wireframeLinewidth*C()),Jt.setMode(y.LINES)):Jt.setMode(y.TRIANGLES);else if(G.isLine){let Nt=Q.linewidth;Nt===void 0&&(Nt=1),k.setLineWidth(Nt*C()),G.isLineSegments?Jt.setMode(y.LINES):G.isLineLoop?Jt.setMode(y.LINE_LOOP):Jt.setMode(y.LINE_STRIP)}else G.isPoints?Jt.setMode(y.POINTS):G.isSprite&&Jt.setMode(y.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Jt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(U.get("WEBGL_multi_draw"))Jt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Nt=G._multiDrawStarts,Gn=G._multiDrawCounts,Qt=G._multiDrawCount,gn=Dt?W.get(Dt).bytesPerElement:1,Ji=H.get(Q).currentProgram.getUniforms();for(let en=0;en<Qt;en++)Ji.setValue(y,"_gl_DrawID",en),Jt.render(Nt[en]/gn,Gn[en])}else if(G.isInstancedMesh)Jt.renderInstances($t,he,G.count);else if(J.isInstancedBufferGeometry){const Nt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Gn=Math.min(J.instanceCount,Nt);Jt.renderInstances($t,he,Gn)}else Jt.render($t,he)};function ie(T,V,J){T.transparent===!0&&T.side===Un&&T.forceSinglePass===!1?(T.side=tn,T.needsUpdate=!0,Ir(T,V,J),T.side=wi,T.needsUpdate=!0,Ir(T,V,J),T.side=Un):Ir(T,V,J)}this.compile=function(T,V,J=null){J===null&&(J=T),d=Rt.get(J),d.init(V),b.push(d),J.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),T!==J&&T.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const Q=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const _t=G.material;if(_t)if(Array.isArray(_t))for(let Tt=0;Tt<_t.length;Tt++){const Pt=_t[Tt];ie(Pt,J,G),Q.add(Pt)}else ie(_t,J,G),Q.add(_t)}),b.pop(),d=null,Q},this.compileAsync=function(T,V,J=null){const Q=this.compile(T,V,J);return new Promise(G=>{function _t(){if(Q.forEach(function(Tt){H.get(Tt).currentProgram.isReady()&&Q.delete(Tt)}),Q.size===0){G(T);return}setTimeout(_t,10)}U.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let mn=null;function Vn(T){mn&&mn(T)}function kc(){Ri.stop()}function Wc(){Ri.start()}const Ri=new fp;Ri.setAnimationLoop(Vn),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(T){mn=T,rt.setAnimationLoop(T),T===null?Ri.stop():Ri.start()},rt.addEventListener("sessionstart",kc),rt.addEventListener("sessionend",Wc),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(V),V=rt.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,V,O),d=Rt.get(T,b.length),d.init(V),b.push(d),$.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),st.setFromProjectionMatrix($),ct=this.localClippingEnabled,mt=pt.init(this.clippingPlanes,ct),m=ht.get(T,S.length),m.init(),S.push(m),rt.enabled===!0&&rt.isPresenting===!0){const _t=M.xr.getDepthSensingMesh();_t!==null&&na(_t,V,-1/0,M.sortObjects)}na(T,V,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(gt,Mt),w=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,w&&Ct.addToRenderList(m,T),this.info.render.frame++,mt===!0&&pt.beginShadows();const J=d.state.shadowsArray;xt.render(J,T,V),mt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=m.opaque,G=m.transmissive;if(d.setupLights(),V.isArrayCamera){const _t=V.cameras;if(G.length>0)for(let Tt=0,Pt=_t.length;Tt<Pt;Tt++){const Dt=_t[Tt];qc(Q,G,T,Dt)}w&&Ct.render(T);for(let Tt=0,Pt=_t.length;Tt<Pt;Tt++){const Dt=_t[Tt];Xc(m,T,Dt,Dt.viewport)}}else G.length>0&&qc(Q,G,T,V),w&&Ct.render(T),Xc(m,T,V);O!==null&&(x.updateMultisampleRenderTarget(O),x.updateRenderTargetMipmap(O)),T.isScene===!0&&T.onAfterRender(M,T,V),Zt.resetDefaultState(),A=-1,E=null,b.pop(),b.length>0?(d=b[b.length-1],mt===!0&&pt.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function na(T,V,J,Q){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||st.intersectsSprite(T)){Q&&ot.setFromMatrixPosition(T.matrixWorld).applyMatrix4($);const Tt=X.update(T),Pt=T.material;Pt.visible&&m.push(T,Tt,Pt,J,ot.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||st.intersectsObject(T))){const Tt=X.update(T),Pt=T.material;if(Q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ot.copy(T.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),ot.copy(Tt.boundingSphere.center)),ot.applyMatrix4(T.matrixWorld).applyMatrix4($)),Array.isArray(Pt)){const Dt=Tt.groups;for(let Vt=0,Xt=Dt.length;Vt<Xt;Vt++){const Lt=Dt[Vt],$t=Pt[Lt.materialIndex];$t&&$t.visible&&m.push(T,Tt,$t,J,ot.z,Lt)}}else Pt.visible&&m.push(T,Tt,Pt,J,ot.z,null)}}const _t=T.children;for(let Tt=0,Pt=_t.length;Tt<Pt;Tt++)na(_t[Tt],V,J,Q)}function Xc(T,V,J,Q){const G=T.opaque,_t=T.transmissive,Tt=T.transparent;d.setupLightsView(J),mt===!0&&pt.setGlobalState(M.clippingPlanes,J),Q&&k.viewport(I.copy(Q)),G.length>0&&Lr(G,V,J),_t.length>0&&Lr(_t,V,J),Tt.length>0&&Lr(Tt,V,J),k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function qc(T,V,J,Q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Q.id]===void 0&&(d.state.transmissionRenderTarget[Q.id]=new bn(1,1,{generateMipmaps:!0,type:U.has("EXT_color_buffer_half_float")||U.has("EXT_color_buffer_float")?ri:zn,minFilter:bi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const _t=d.state.transmissionRenderTarget[Q.id],Tt=Q.viewport||I;_t.setSize(Tt.z,Tt.w);const Pt=M.getRenderTarget();M.setRenderTarget(_t),M.getClearColor(ut),at=M.getClearAlpha(),at<1&&M.setClearColor(16777215,.5),M.clear(),w&&Ct.render(J);const Dt=M.toneMapping;M.toneMapping=Ti;const Vt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),d.setupLightsView(Q),mt===!0&&pt.setGlobalState(M.clippingPlanes,Q),Lr(T,J,Q),x.updateMultisampleRenderTarget(_t),x.updateRenderTargetMipmap(_t),U.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Lt=0,$t=V.length;Lt<$t;Lt++){const ce=V[Lt],he=ce.object,je=ce.geometry,Jt=ce.material,Nt=ce.group;if(Jt.side===Un&&he.layers.test(Q.layers)){const Gn=Jt.side;Jt.side=tn,Jt.needsUpdate=!0,Yc(he,J,Q,je,Jt,Nt),Jt.side=Gn,Jt.needsUpdate=!0,Xt=!0}}Xt===!0&&(x.updateMultisampleRenderTarget(_t),x.updateRenderTargetMipmap(_t))}M.setRenderTarget(Pt),M.setClearColor(ut,at),Vt!==void 0&&(Q.viewport=Vt),M.toneMapping=Dt}function Lr(T,V,J){const Q=V.isScene===!0?V.overrideMaterial:null;for(let G=0,_t=T.length;G<_t;G++){const Tt=T[G],Pt=Tt.object,Dt=Tt.geometry,Vt=Q===null?Tt.material:Q,Xt=Tt.group;Pt.layers.test(J.layers)&&Yc(Pt,V,J,Dt,Vt,Xt)}}function Yc(T,V,J,Q,G,_t){T.onBeforeRender(M,V,J,Q,G,_t),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(M,V,J,Q,T,_t),G.transparent===!0&&G.side===Un&&G.forceSinglePass===!1?(G.side=tn,G.needsUpdate=!0,M.renderBufferDirect(J,V,Q,G,T,_t),G.side=wi,G.needsUpdate=!0,M.renderBufferDirect(J,V,Q,G,T,_t),G.side=Un):M.renderBufferDirect(J,V,Q,G,T,_t),T.onAfterRender(M,V,J,Q,G,_t)}function Ir(T,V,J){V.isScene!==!0&&(V=Et);const Q=H.get(T),G=d.state.lights,_t=d.state.shadowsArray,Tt=G.state.version,Pt=dt.getParameters(T,G.state,_t,V,J),Dt=dt.getProgramCacheKey(Pt);let Vt=Q.programs;Q.environment=T.isMeshStandardMaterial?V.environment:null,Q.fog=V.fog,Q.envMap=(T.isMeshStandardMaterial?P:_).get(T.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,Vt===void 0&&(T.addEventListener("dispose",Wt),Vt=new Map,Q.programs=Vt);let Xt=Vt.get(Dt);if(Xt!==void 0){if(Q.currentProgram===Xt&&Q.lightsStateVersion===Tt)return Kc(T,Pt),Xt}else Pt.uniforms=dt.getUniforms(T),T.onBeforeCompile(Pt,M),Xt=dt.acquireProgram(Pt,Dt),Vt.set(Dt,Xt),Q.uniforms=Pt.uniforms;const Lt=Q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Lt.clippingPlanes=pt.uniform),Kc(T,Pt),Q.needsLights=bp(T),Q.lightsStateVersion=Tt,Q.needsLights&&(Lt.ambientLightColor.value=G.state.ambient,Lt.lightProbe.value=G.state.probe,Lt.directionalLights.value=G.state.directional,Lt.directionalLightShadows.value=G.state.directionalShadow,Lt.spotLights.value=G.state.spot,Lt.spotLightShadows.value=G.state.spotShadow,Lt.rectAreaLights.value=G.state.rectArea,Lt.ltc_1.value=G.state.rectAreaLTC1,Lt.ltc_2.value=G.state.rectAreaLTC2,Lt.pointLights.value=G.state.point,Lt.pointLightShadows.value=G.state.pointShadow,Lt.hemisphereLights.value=G.state.hemi,Lt.directionalShadowMap.value=G.state.directionalShadowMap,Lt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Lt.spotShadowMap.value=G.state.spotShadowMap,Lt.spotLightMatrix.value=G.state.spotLightMatrix,Lt.spotLightMap.value=G.state.spotLightMap,Lt.pointShadowMap.value=G.state.pointShadowMap,Lt.pointShadowMatrix.value=G.state.pointShadowMatrix),Q.currentProgram=Xt,Q.uniformsList=null,Xt}function jc(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=Mo.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function Kc(T,V){const J=H.get(T);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function yp(T,V,J,Q,G){V.isScene!==!0&&(V=Et),x.resetTextureUnits();const _t=V.fog,Tt=Q.isMeshStandardMaterial?V.environment:null,Pt=O===null?M.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Gs,Dt=(Q.isMeshStandardMaterial?P:_).get(Q.envMap||Tt),Vt=Q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Xt=!!J.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Lt=!!J.morphAttributes.position,$t=!!J.morphAttributes.normal,ce=!!J.morphAttributes.color;let he=Ti;Q.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(he=M.toneMapping);const je=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Jt=je!==void 0?je.length:0,Nt=H.get(Q),Gn=d.state.lights;if(mt===!0&&(ct===!0||T!==E)){const cn=T===E&&Q.id===A;pt.setState(Q,T,cn)}let Qt=!1;Q.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==Gn.state.version||Nt.outputColorSpace!==Pt||G.isBatchedMesh&&Nt.batching===!1||!G.isBatchedMesh&&Nt.batching===!0||G.isBatchedMesh&&Nt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Nt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Nt.instancing===!1||!G.isInstancedMesh&&Nt.instancing===!0||G.isSkinnedMesh&&Nt.skinning===!1||!G.isSkinnedMesh&&Nt.skinning===!0||G.isInstancedMesh&&Nt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Nt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Nt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Nt.instancingMorph===!1&&G.morphTexture!==null||Nt.envMap!==Dt||Q.fog===!0&&Nt.fog!==_t||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==pt.numPlanes||Nt.numIntersection!==pt.numIntersection)||Nt.vertexAlphas!==Vt||Nt.vertexTangents!==Xt||Nt.morphTargets!==Lt||Nt.morphNormals!==$t||Nt.morphColors!==ce||Nt.toneMapping!==he||Nt.morphTargetsCount!==Jt)&&(Qt=!0):(Qt=!0,Nt.__version=Q.version);let gn=Nt.currentProgram;Qt===!0&&(gn=Ir(Q,V,G));let Ji=!1,en=!1,qs=!1;const fe=gn.getUniforms(),wn=Nt.uniforms;if(k.useProgram(gn.program)&&(Ji=!0,en=!0,qs=!0),Q.id!==A&&(A=Q.id,en=!0),Ji||E!==T){k.buffers.depth.getReversed()?(R.copy(T.projectionMatrix),c0(R),u0(R),fe.setValue(y,"projectionMatrix",R)):fe.setValue(y,"projectionMatrix",T.projectionMatrix),fe.setValue(y,"viewMatrix",T.matrixWorldInverse);const hi=fe.map.cameraPosition;hi!==void 0&&hi.setValue(y,Z.setFromMatrixPosition(T.matrixWorld)),N.logarithmicDepthBuffer&&fe.setValue(y,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&fe.setValue(y,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,en=!0,qs=!0)}if(G.isSkinnedMesh){fe.setOptional(y,G,"bindMatrix"),fe.setOptional(y,G,"bindMatrixInverse");const cn=G.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),fe.setValue(y,"boneTexture",cn.boneTexture,x))}G.isBatchedMesh&&(fe.setOptional(y,G,"batchingTexture"),fe.setValue(y,"batchingTexture",G._matricesTexture,x),fe.setOptional(y,G,"batchingIdTexture"),fe.setValue(y,"batchingIdTexture",G._indirectTexture,x),fe.setOptional(y,G,"batchingColorTexture"),G._colorsTexture!==null&&fe.setValue(y,"batchingColorTexture",G._colorsTexture,x));const Ys=J.morphAttributes;if((Ys.position!==void 0||Ys.normal!==void 0||Ys.color!==void 0)&&Ot.update(G,J,gn),(en||Nt.receiveShadow!==G.receiveShadow)&&(Nt.receiveShadow=G.receiveShadow,fe.setValue(y,"receiveShadow",G.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(wn.envMap.value=Dt,wn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&V.environment!==null&&(wn.envMapIntensity.value=V.environmentIntensity),en&&(fe.setValue(y,"toneMappingExposure",M.toneMappingExposure),Nt.needsLights&&Ep(wn,qs),_t&&Q.fog===!0&&lt.refreshFogUniforms(wn,_t),lt.refreshMaterialUniforms(wn,Q,Y,nt,d.state.transmissionRenderTarget[T.id]),Mo.upload(y,jc(Nt),wn,x)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Mo.upload(y,jc(Nt),wn,x),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&fe.setValue(y,"center",G.center),fe.setValue(y,"modelViewMatrix",G.modelViewMatrix),fe.setValue(y,"normalMatrix",G.normalMatrix),fe.setValue(y,"modelMatrix",G.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const cn=Q.uniformsGroups;for(let hi=0,fi=cn.length;hi<fi;hi++){const $c=cn[hi];B.update($c,gn),B.bind($c,gn)}}return gn}function Ep(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function bp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(T,V,J){H.get(T.texture).__webglTexture=V,H.get(T.depthTexture).__webglTexture=J;const Q=H.get(T);Q.__hasExternalTextures=!0,Q.__autoAllocateDepthBuffer=J===void 0,Q.__autoAllocateDepthBuffer||U.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,V){const J=H.get(T);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(T,V=0,J=0){O=T,L=V,D=J;let Q=!0,G=null,_t=!1,Tt=!1;if(T){const Dt=H.get(T);if(Dt.__useDefaultFramebuffer!==void 0)k.bindFramebuffer(y.FRAMEBUFFER,null),Q=!1;else if(Dt.__webglFramebuffer===void 0)x.setupRenderTarget(T);else if(Dt.__hasExternalTextures)x.rebindTextures(T,H.get(T.texture).__webglTexture,H.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Lt=T.depthTexture;if(Dt.__boundDepthTexture!==Lt){if(Lt!==null&&H.has(Lt)&&(T.width!==Lt.image.width||T.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(T)}}const Vt=T.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Tt=!0);const Xt=H.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Xt[V])?G=Xt[V][J]:G=Xt[V],_t=!0):T.samples>0&&x.useMultisampledRTT(T)===!1?G=H.get(T).__webglMultisampledFramebuffer:Array.isArray(Xt)?G=Xt[J]:G=Xt,I.copy(T.viewport),tt.copy(T.scissor),j=T.scissorTest}else I.copy(At).multiplyScalar(Y).floor(),tt.copy(Ut).multiplyScalar(Y).floor(),j=jt;if(k.bindFramebuffer(y.FRAMEBUFFER,G)&&Q&&k.drawBuffers(T,G),k.viewport(I),k.scissor(tt),k.setScissorTest(j),_t){const Dt=H.get(T.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+V,Dt.__webglTexture,J)}else if(Tt){const Dt=H.get(T.texture),Vt=V||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,Dt.__webglTexture,J||0,Vt)}A=-1},this.readRenderTargetPixels=function(T,V,J,Q,G,_t,Tt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=H.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Pt=Pt[Tt]),Pt){k.bindFramebuffer(y.FRAMEBUFFER,Pt);try{const Dt=T.texture,Vt=Dt.format,Xt=Dt.type;if(!N.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!N.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-Q&&J>=0&&J<=T.height-G&&y.readPixels(V,J,Q,G,zt.convert(Vt),zt.convert(Xt),_t)}finally{const Dt=O!==null?H.get(O).__webglFramebuffer:null;k.bindFramebuffer(y.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(T,V,J,Q,G,_t,Tt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=H.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Tt!==void 0&&(Pt=Pt[Tt]),Pt){const Dt=T.texture,Vt=Dt.format,Xt=Dt.type;if(!N.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!N.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=T.width-Q&&J>=0&&J<=T.height-G){k.bindFramebuffer(y.FRAMEBUFFER,Pt);const Lt=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,Lt),y.bufferData(y.PIXEL_PACK_BUFFER,_t.byteLength,y.STREAM_READ),y.readPixels(V,J,Q,G,zt.convert(Vt),zt.convert(Xt),0);const $t=O!==null?H.get(O).__webglFramebuffer:null;k.bindFramebuffer(y.FRAMEBUFFER,$t);const ce=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await l0(y,ce,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,Lt),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,_t),y.deleteBuffer(Lt),y.deleteSync(ce),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,V=null,J=0){T.isTexture!==!0&&(or("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1]);const Q=Math.pow(2,-J),G=Math.floor(T.image.width*Q),_t=Math.floor(T.image.height*Q),Tt=V!==null?V.x:0,Pt=V!==null?V.y:0;x.setTexture2D(T,0),y.copyTexSubImage2D(y.TEXTURE_2D,J,0,0,Tt,Pt,G,_t),k.unbindTexture()},this.copyTextureToTexture=function(T,V,J=null,Q=null,G=0){T.isTexture!==!0&&(or("WebGLRenderer: copyTextureToTexture function signature has changed."),Q=arguments[0]||null,T=arguments[1],V=arguments[2],G=arguments[3]||0,J=null);let _t,Tt,Pt,Dt,Vt,Xt,Lt,$t,ce;const he=T.isCompressedTexture?T.mipmaps[G]:T.image;J!==null?(_t=J.max.x-J.min.x,Tt=J.max.y-J.min.y,Pt=J.isBox3?J.max.z-J.min.z:1,Dt=J.min.x,Vt=J.min.y,Xt=J.isBox3?J.min.z:0):(_t=he.width,Tt=he.height,Pt=he.depth||1,Dt=0,Vt=0,Xt=0),Q!==null?(Lt=Q.x,$t=Q.y,ce=Q.z):(Lt=0,$t=0,ce=0);const je=zt.convert(V.format),Jt=zt.convert(V.type);let Nt;V.isData3DTexture?(x.setTexture3D(V,0),Nt=y.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(x.setTexture2DArray(V,0),Nt=y.TEXTURE_2D_ARRAY):(x.setTexture2D(V,0),Nt=y.TEXTURE_2D),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,V.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,V.unpackAlignment);const Gn=y.getParameter(y.UNPACK_ROW_LENGTH),Qt=y.getParameter(y.UNPACK_IMAGE_HEIGHT),gn=y.getParameter(y.UNPACK_SKIP_PIXELS),Ji=y.getParameter(y.UNPACK_SKIP_ROWS),en=y.getParameter(y.UNPACK_SKIP_IMAGES);y.pixelStorei(y.UNPACK_ROW_LENGTH,he.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,he.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Dt),y.pixelStorei(y.UNPACK_SKIP_ROWS,Vt),y.pixelStorei(y.UNPACK_SKIP_IMAGES,Xt);const qs=T.isDataArrayTexture||T.isData3DTexture,fe=V.isDataArrayTexture||V.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const wn=H.get(T),Ys=H.get(V),cn=H.get(wn.__renderTarget),hi=H.get(Ys.__renderTarget);k.bindFramebuffer(y.READ_FRAMEBUFFER,cn.__webglFramebuffer),k.bindFramebuffer(y.DRAW_FRAMEBUFFER,hi.__webglFramebuffer);for(let fi=0;fi<Pt;fi++)qs&&y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,H.get(T).__webglTexture,G,Xt+fi),T.isDepthTexture?(fe&&y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,H.get(V).__webglTexture,G,ce+fi),y.blitFramebuffer(Dt,Vt,_t,Tt,Lt,$t,_t,Tt,y.DEPTH_BUFFER_BIT,y.NEAREST)):fe?y.copyTexSubImage3D(Nt,G,Lt,$t,ce+fi,Dt,Vt,_t,Tt):y.copyTexSubImage2D(Nt,G,Lt,$t,ce+fi,Dt,Vt,_t,Tt);k.bindFramebuffer(y.READ_FRAMEBUFFER,null),k.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else fe?T.isDataTexture||T.isData3DTexture?y.texSubImage3D(Nt,G,Lt,$t,ce,_t,Tt,Pt,je,Jt,he.data):V.isCompressedArrayTexture?y.compressedTexSubImage3D(Nt,G,Lt,$t,ce,_t,Tt,Pt,je,he.data):y.texSubImage3D(Nt,G,Lt,$t,ce,_t,Tt,Pt,je,Jt,he):T.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,G,Lt,$t,_t,Tt,je,Jt,he.data):T.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,G,Lt,$t,he.width,he.height,je,he.data):y.texSubImage2D(y.TEXTURE_2D,G,Lt,$t,_t,Tt,je,Jt,he);y.pixelStorei(y.UNPACK_ROW_LENGTH,Gn),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,Qt),y.pixelStorei(y.UNPACK_SKIP_PIXELS,gn),y.pixelStorei(y.UNPACK_SKIP_ROWS,Ji),y.pixelStorei(y.UNPACK_SKIP_IMAGES,en),G===0&&V.generateMipmaps&&y.generateMipmap(Nt),k.unbindTexture()},this.copyTextureToTexture3D=function(T,V,J=null,Q=null,G=0){return T.isTexture!==!0&&(or("WebGLRenderer: copyTextureToTexture3D function signature has changed."),J=arguments[0]||null,Q=arguments[1]||null,T=arguments[2],V=arguments[3],G=arguments[4]||0),or('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,V,J,Q,G)},this.initRenderTarget=function(T){H.get(T).__webglFramebuffer===void 0&&x.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?x.setTextureCube(T,0):T.isData3DTexture?x.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?x.setTexture2DArray(T,0):x.setTexture2D(T,0),k.unbindTexture()},this.resetState=function(){L=0,D=0,O=null,k.reset(),Zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class Fc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new kt(t),this.density=e}clone(){return new Fc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xE extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ME extends Ye{constructor(t=null,e=1,i=1,s,r,o,a,l,c=ln,u=ln,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nc extends Zi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Lo=new z,Io=new z,Vh=new le,ir=new Pr,so=new ks,ja=new z,Gh=new z;class SE extends Se{constructor(t=new He,e=new nc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Lo.fromBufferAttribute(e,s-1),Io.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Lo.distanceTo(Io);t.setAttribute("lineDistance",new _e(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),so.copy(i.boundingSphere),so.applyMatrix4(s),so.radius+=r,t.ray.intersectsSphere(so)===!1)return;Vh.copy(s).invert(),ir.copy(t.ray).applyMatrix4(Vh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=c){const d=u.getX(v),S=u.getX(v+1),b=ro(this,t,ir,l,d,S);b&&e.push(b)}if(this.isLineLoop){const v=u.getX(g-1),m=u.getX(p),d=ro(this,t,ir,l,v,m);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let v=p,m=g-1;v<m;v+=c){const d=ro(this,t,ir,l,v,v+1);d&&e.push(d)}if(this.isLineLoop){const v=ro(this,t,ir,l,g-1,p);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ro(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Lo.fromBufferAttribute(o,s),Io.fromBufferAttribute(o,r),e.distanceSqToSegment(Lo,Io,ja,Gh)>i)return;ja.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ja);if(!(l<t.near||l>t.far))return{distance:l,point:Gh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const kh=new z,Wh=new z;class Xh extends SE{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)kh.fromBufferAttribute(e,s),Wh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+kh.distanceTo(Wh);t.setAttribute("lineDistance",new _e(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yE extends Zi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const qh=new le,ic=new Pr,oo=new ks,ao=new z;class EE extends Se{constructor(t=new He,e=new yE){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),oo.copy(i.boundingSphere),oo.applyMatrix4(s),oo.radius+=r,t.ray.intersectsSphere(oo)===!1)return;qh.copy(s).invert(),ic.copy(t.ray).applyMatrix4(qh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,v=p;g<v;g++){const m=c.getX(g);ao.fromBufferAttribute(h,m),Yh(ao,m,l,s,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,v=p;g<v;g++)ao.fromBufferAttribute(h,g),Yh(ao,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Yh(n,t,e,i,s,r,o){const a=ic.distanceSqToPoint(n);if(a<e){const l=new z;ic.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Bc extends He{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],o=[];a(s),c(i),u(),this.setAttribute("position",new _e(r,3)),this.setAttribute("normal",new _e(r.slice(),3)),this.setAttribute("uv",new _e(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const b=new z,M=new z,F=new z;for(let L=0;L<e.length;L+=3)p(e[L+0],b),p(e[L+1],M),p(e[L+2],F),l(b,M,F,S)}function l(S,b,M,F){const L=F+1,D=[];for(let O=0;O<=L;O++){D[O]=[];const A=S.clone().lerp(M,O/L),E=b.clone().lerp(M,O/L),I=L-O;for(let tt=0;tt<=I;tt++)tt===0&&O===L?D[O][tt]=A:D[O][tt]=A.clone().lerp(E,tt/I)}for(let O=0;O<L;O++)for(let A=0;A<2*(L-O)-1;A++){const E=Math.floor(A/2);A%2===0?(f(D[O][E+1]),f(D[O+1][E]),f(D[O][E])):(f(D[O][E+1]),f(D[O+1][E+1]),f(D[O+1][E]))}}function c(S){const b=new z;for(let M=0;M<r.length;M+=3)b.x=r[M+0],b.y=r[M+1],b.z=r[M+2],b.normalize().multiplyScalar(S),r[M+0]=b.x,r[M+1]=b.y,r[M+2]=b.z}function u(){const S=new z;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const M=m(S)/2/Math.PI+.5,F=d(S)/Math.PI+.5;o.push(M,1-F)}g(),h()}function h(){for(let S=0;S<o.length;S+=6){const b=o[S+0],M=o[S+2],F=o[S+4],L=Math.max(b,M,F),D=Math.min(b,M,F);L>.9&&D<.1&&(b<.2&&(o[S+0]+=1),M<.2&&(o[S+2]+=1),F<.2&&(o[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function p(S,b){const M=S*3;b.x=t[M+0],b.y=t[M+1],b.z=t[M+2]}function g(){const S=new z,b=new z,M=new z,F=new z,L=new It,D=new It,O=new It;for(let A=0,E=0;A<r.length;A+=9,E+=6){S.set(r[A+0],r[A+1],r[A+2]),b.set(r[A+3],r[A+4],r[A+5]),M.set(r[A+6],r[A+7],r[A+8]),L.set(o[E+0],o[E+1]),D.set(o[E+2],o[E+3]),O.set(o[E+4],o[E+5]),F.copy(S).add(b).add(M).divideScalar(3);const I=m(F);v(L,E+0,S,I),v(D,E+2,b,I),v(O,E+4,M,I)}}function v(S,b,M,F){F<0&&S.x===1&&(o[b]=S.x-1),M.x===0&&M.z===0&&(o[b]=F/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function d(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bc(t.vertices,t.indices,t.radius,t.details)}}class zc extends Bc{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new zc(t.radius,t.detail)}}class gr extends He{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new z,f=new z,p=[],g=[],v=[],m=[];for(let d=0;d<=i;d++){const S=[],b=d/i;let M=0;d===0&&o===0?M=.5/e:d===i&&l===Math.PI&&(M=-.5/e);for(let F=0;F<=e;F++){const L=F/e;h.x=-t*Math.cos(s+L*r)*Math.sin(o+b*a),h.y=t*Math.cos(o+b*a),h.z=t*Math.sin(s+L*r)*Math.sin(o+b*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),v.push(f.x,f.y,f.z),m.push(L+M,1-b),S.push(c++)}u.push(S)}for(let d=0;d<i;d++)for(let S=0;S<e;S++){const b=u[d][S+1],M=u[d][S],F=u[d+1][S],L=u[d+1][S+1];(d!==0||o>0)&&p.push(b,M,L),(d!==i-1||l<Math.PI)&&p.push(M,F,L)}this.setIndex(p),this.setAttribute("position",new _e(g,3)),this.setAttribute("normal",new _e(v,3)),this.setAttribute("uv",new _e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hc extends He{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new z,h=new z,f=new z;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const v=g/s*r,m=p/i*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(v),h.y=(t+e*Math.cos(m))*Math.sin(v),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const v=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,S=(s+1)*p+g;o.push(v,m,S),o.push(m,d,S)}this.setIndex(o),this.setAttribute("position",new _e(a,3)),this.setAttribute("normal",new _e(l,3)),this.setAttribute("uv",new _e(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class bE extends Be{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class jh extends Zi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ep,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class vp extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class TE extends vp{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ka=new le,Kh=new z,$h=new z;class AE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uc,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Kh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kh),$h.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($h),e.updateMatrixWorld(),Ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ka),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ka)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class wE extends AE{constructor(){super(new Nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zh extends vp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new wE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class xp{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Jh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Jh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Jh(){return performance.now()}const Qh=new le;class RE{constructor(t,e,i=0,s=1/0){this.ray=new Pr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Qh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qh),this}intersectObject(t,e=!0,i=[]){return sc(t,this,i,e),i.sort(tf),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)sc(t[s],this,i,e);return i.sort(tf),i}}function tf(n,t){return n.distance-t.distance}function sc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)sc(r[o],t,e,!0)}}class ef{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class CE extends $i{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tc);const nf={type:"change"},Vc={type:"start"},Mp={type:"end"},lo=new Pr,sf=new yi,PE=Math.cos(70*o0.DEG2RAD),ye=new z,$e=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$a=1e-6;class DE extends CE{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.enabled=!0,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:As.ROTATE,MIDDLE:As.DOLLY,RIGHT:As.PAN},this.touches={ONE:xs.ROTATE,TWO:xs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new Yi,this._lastTargetPosition=new z,this._quat=new Yi().setFromUnitVectors(t.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ef,this._sphericalDelta=new ef,this._scale=1,this._panOffset=new z,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new z,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=IE.bind(this),this._onPointerDown=LE.bind(this),this._onPointerUp=UE.bind(this),this._onContextMenu=VE.bind(this),this._onMouseWheel=FE.bind(this),this._onKeyDown=BE.bind(this),this._onTouchStart=zE.bind(this),this._onTouchMove=HE.bind(this),this._onMouseDown=NE.bind(this),this._onMouseMove=OE.bind(this),this._interceptControlDown=GE.bind(this),this._interceptControlUp=kE.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nf),this.update(),this.state=oe.NONE}update(t=null){const e=this.object.position;ye.copy(e).sub(this.target),ye.applyQuaternion(this._quat),this._spherical.setFromVector3(ye),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=$e:i>Math.PI&&(i-=$e),s<-Math.PI?s+=$e:s>Math.PI&&(s-=$e),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(ye.setFromSpherical(this._spherical),ye.applyQuaternion(this._quatInverse),e.copy(this.target).add(ye),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=ye.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=ye.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(lo.origin.copy(this.object.position),lo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(lo.direction))<PE?this.object.lookAt(this.target):(sf.setFromNormalAndCoplanarPoint(this.object.up,this.target),lo.intersectPlane(sf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>$a||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$a||this._lastTargetPosition.distanceToSquared(this.target)>$a?(this.dispatchEvent(nf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?$e/60*this.autoRotateSpeed*t:$e/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ye.setFromMatrixColumn(e,0),ye.multiplyScalar(-t),this._panOffset.add(ye)}_panUp(t,e){this.screenSpacePanning===!0?ye.setFromMatrixColumn(e,1):(ye.setFromMatrixColumn(e,0),ye.crossVectors(this.object.up,ye)),ye.multiplyScalar(t),this._panOffset.add(ye)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ye.copy(s).sub(this.target);let r=ye.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp($e*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-$e*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft($e*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-$e*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function LE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function IE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function UE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Mp),this.state=oe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function NE(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case As.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=oe.DOLLY;break;case As.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=oe.ROTATE}break;case As.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Vc)}function OE(n){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function FE(n){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(n.preventDefault(),this.dispatchEvent(Vc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Mp))}function BE(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function zE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case xs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=oe.TOUCH_ROTATE;break;case xs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case xs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=oe.TOUCH_DOLLY_PAN;break;case xs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Vc)}function HE(n){switch(this._trackPointer(n),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=oe.NONE}}function VE(n){this.enabled!==!1&&n.preventDefault()}function GE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function kE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Sp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Xs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const WE=new Nc(-1,1,1,-1,0,1);class XE extends He{constructor(){super(),this.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _e([0,2,0,0,2,0],2))}}const qE=new XE;class Gc{constructor(t){this._mesh=new Re(qE,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,WE)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class YE extends Xs{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Be?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Tr.clone(t.uniforms),this.material=new Be({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Gc(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class rf extends Xs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class jE extends Xs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class KE{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new It);this._width=i.width,this._height=i.height,e=new bn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ri}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new YE(Sp),this.copyPass.material.blending=si,this.clock=new xp}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}rf!==void 0&&(o instanceof rf?i=!0:o instanceof jE&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new It);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const $E={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ZE extends Xs{constructor(){super();const t=$E;this.uniforms=Tr.clone(t.uniforms),this.material=new bE({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Gc(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Kt.getTransfer(this._outputColorSpace)===se&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===zd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Hd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vd?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ac?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Gd?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===kd&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class JE extends Xs{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new kt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const QE={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new kt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Vs extends Xs{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new It(t.x,t.y):new It(256,256),this.clearColor=new kt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new bn(r,o,{type:ri}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new bn(r,o,{type:ri});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new bn(r,o,{type:ri});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=QE;this.highPassUniforms=Tr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Be({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new It(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Sp;this.copyUniforms=Tr.clone(u.uniforms),this.blendMaterial=new Be({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Rs,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new kt,this.oldClearAlpha=1,this.basic=new Mn,this.fsQuad=new Gc(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new It(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Vs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Vs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Be({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new It(.5,.5)},direction:{value:new It(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Be({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Vs.BlurDirectionX=new It(1,0);Vs.BlurDirectionY=new It(0,1);class Za extends Se{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new It(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const ps=new z,of=new le,af=new le,lf=new z,cf=new z;class tb{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,v){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),of.copy(v.matrixWorldInverse),af.multiplyMatrices(v.projectionMatrix,of),u(g,g,v),p(g)},this.setSize=function(g,v){i=g,s=v,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=v+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let v=0,m=g.children.length;v<m;v++)c(g.children[v])}function u(g,v,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){ps.setFromMatrixPosition(g.matrixWorld),ps.applyMatrix4(af);const d=ps.z>=-1&&ps.z<=1&&g.layers.test(m.layers)===!0,S=g.element;S.style.display=d===!0?"":"none",d===!0&&(g.onBeforeRender(e,v,m),S.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(ps.x*r+r)+"px,"+(-ps.y*o+o)+"px)",S.parentNode!==l&&l.appendChild(S),g.onAfterRender(e,v,m));const b={distanceToCameraSquared:h(m,g)};a.objects.set(g,b)}for(let d=0,S=g.children.length;d<S;d++)u(g.children[d],v,m)}function h(g,v){return lf.setFromMatrixPosition(g.matrixWorld),cf.setFromMatrixPosition(v.matrixWorld),lf.distanceToSquared(cf)}function f(g){const v=[];return g.traverseVisible(function(m){m.isCSS2DObject&&v.push(m)}),v}function p(g){const v=f(g).sort(function(d,S){if(d.renderOrder!==S.renderOrder)return S.renderOrder-d.renderOrder;const b=a.objects.get(d).distanceToCameraSquared,M=a.objects.get(S).distanceToCameraSquared;return b-M}),m=v.length;for(let d=0,S=v.length;d<S;d++)v[d].element.style.zIndex=m-d}}}const eb="v5";function nb(n,t){return`${eb}-${n}-${t}`}const Uo=new Map;function uf(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function ib(n){return n-Math.floor(n)}function co(n,t,e){return ib(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function rc(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=co(i,s,e),u=co(i+1,s,e),h=co(i,s+1,e),f=co(i+1,s+1,e);return c+(u-c)*a+(h-c)*l+(f-h-(u-c))*a*l}function sb(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*rc(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function rb(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function ob(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,h=sb(c*4.2+t*.002,u*4.2-t*.001,t),p=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,rc(c*14,u*14,t+11)-.38),1.4),v=rc(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*h)*p*(1-g*.55)*v;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[d,S,b]=rb(e,r,m),M=(a*n+l)*4;s[M]=d,s[M+1]=S,s[M+2]=b,s[M+3]=255}const o=new ME(s,n,n);return o.format=fn,o.type=zn,o.colorSpace=Je,o.wrapS=Er,o.wrapT=Er,o.generateMipmaps=!0,o.minFilter=bi,o.magFilter=yn,o.flipY=!0,o.needsUpdate=!0,o}function ab(n,t){const e=uf(n)%14,i=nb(t,e);let s=Uo.get(i);if(!s){const r=uf(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=ob(256,r,o,t),Uo.set(i,s)}return{map:s}}function lb(){for(const n of Uo.values())n.dispose();Uo.clear()}const cb=461586,ub=4874368,hb=9103615,fb=12101887,db=4873336,pb=6091007,hf=13165823,mb=10205416,gb=1.35,_b=4e3;function vb(n,t,e,i){const s=n.clientWidth||window.innerWidth,r=n.clientHeight||window.innerHeight,o=new xE;o.background=new kt(cb),o.fog=new Fc(ub,.032);const a=new hn(55,s/r,.1,200);a.position.set(12,10,16);const l=new vE({antialias:!0,alpha:!1,powerPreference:"high-performance"});l.setPixelRatio(Math.min(window.devicePixelRatio,2)),l.setSize(s,r),l.outputColorSpace=Je,l.toneMapping=Ac,l.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(l.domElement);const c=document.createElement("div");c.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(c);const u=new tb({element:c});u.setSize(s,r);const h=Math.min(window.devicePixelRatio,2),f=new KE(l);f.setPixelRatio(h);const p=new JE(o,a),g=new It(Math.max(128,Math.floor(s*h/2)),Math.max(128,Math.floor(r*h/2))),v=new Vs(g,.34,.34,.88),m=new ZE;f.addPass(p),f.addPass(v),f.addPass(m);const d=new TE(9088744,1382432,.62);o.add(d);const S=new Zh(15791871,.55);S.position.set(8,14,10),o.add(S);const b=new Zh(6324424,.22);b.position.set(-12,-2,-8),o.add(b);const M=new DE(a,l.domElement);M.enableDamping=!0,M.dampingFactor=.06,M.minDistance=4,M.maxDistance=48,M.autoRotate=!0,M.autoRotateSpeed=gb;let F=null,L=!1;const D=()=>{F!==null&&(window.clearTimeout(F),F=null)},O=()=>{D(),F=window.setTimeout(()=>{L||(M.autoRotate=!0)},_b)},A=()=>{L=!0,M.autoRotate=!1,D()},E=()=>{L=!1,O()},I=()=>{M.autoRotate=!1,O()},tt=new Map,j=new Map;let ut=null,at=null;const nt=(()=>{const N=new Float32Array(4800),k=new Float32Array(1600);for(let _=0;_<1600;_++){const P=Math.random(),W=Math.random(),q=2*Math.PI*P,X=Math.acos(2*W-1),dt=28+Math.random()*72,lt=Math.sin(X);N[_*3]=dt*lt*Math.cos(q),N[_*3+1]=dt*lt*Math.sin(q),N[_*3+2]=dt*Math.cos(X),k[_]=.04+Math.random()*.12}const K=new He;K.setAttribute("position",new pn(N,3)),K.setAttribute("size",new pn(k,1));const H=new Be({uniforms:{uColor:{value:new kt(mb)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
        attribute float size;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vAlpha = 0.35 + 0.65 * (size - 0.04) / 0.12;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (220.0 * uPixelRatio) / (-mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          if (d > 0.5) discard;
          float soft = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uColor, soft * vAlpha * 0.55);
        }
      `,transparent:!0,depthWrite:!1,blending:Rs}),x=new EE(K,H);return x.frustumCulled=!1,o.add(x),x})(),Y=(U,N,k)=>{U.traverse(K=>{K instanceof Za||(K.userData.nodeId=N,K.userData.nodeType=k)})},gt=(U,N)=>{const k=document.createElement("div");k.textContent=U,k.setAttribute("role","presentation");const K=N==="fusion",H=K?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",x=K?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",_=K?"#f4ecff":"#eaf6ff";return k.style.cssText=[`max-width:${K?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${_}`,`background:${H}`,`border:${x}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),k},Mt=(U,N,k)=>{const K=U==="major",H=new Ss,x=K?"major":"fusion",{map:_}=ab(N,x),P=K?.23:.15,W=new gr(P,K?48:36,K?32:26),q=new Mn({map:_,color:new kt(16777215),transparent:!0,opacity:1,fog:!1}),X=new Re(W,q);X.userData.part="core",H.add(X);const dt=K?hb:fb,lt=new gr(P*1.52,18,14),ht=new Mn({color:dt,transparent:!0,opacity:K?.045:.032,depthWrite:!1,blending:Rs,fog:!1}),Rt=new Re(lt,ht);if(Rt.renderOrder=-1,Rt.userData.part="glow",H.add(Rt),K){const Ct=new Mn({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:Un,fog:!1}),Ot=(Bt,zt,Zt)=>{const B=new Hc(Bt,zt,10,80),St=new Re(B,Ct.clone());return St.rotation.x=Math.PI/2,St.rotation.z=Zt,St.userData.part="ring",St};H.add(Ot(.46,.014,Math.random()*Math.PI));const vt=Ot(.38,.01,Math.PI/2.8);vt.rotation.y=Math.PI/3.2,H.add(vt)}else{const Ct=new zc(P*.55,0),Ot=new Mn({color:15261951,transparent:!0,opacity:.35,depthWrite:!1,blending:Rs,fog:!1}),vt=new Re(Ct,Ot);vt.position.set(P*.9,P*.4,0),vt.userData.part="shard",H.add(vt)}const pt=gt(k,U),xt=new Za(pt);return xt.position.set(0,P*1.38,0),xt.center.set(.5,1),xt.renderOrder=10,xt.userData.isNodeLabel=!0,H.add(xt),H.userData.nodeVisual={core:X,glow:Rt},H};for(const U of t.nodes){const N=t.layout[U.id];if(!N)continue;const k=Mt(U.type,U.id,U.label);k.position.set(N.x,N.y,N.z),k.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),k.userData.nodeId=U.id,k.userData.nodeType=U.type,Y(k,U.id,U.type),o.add(k),tt.set(U.id,k)}const At=(U,N)=>U<N?`${U}|${N}`:`${N}|${U}`,Ut=()=>{const U=[];for(const K of t.edges){const H=t.layout[K.u],x=t.layout[K.v];!H||!x||U.push(H.x,H.y,H.z,x.x,x.y,x.z)}const N=new He;N.setAttribute("position",new _e(U,3));const k=new nc({color:db,transparent:!0,opacity:.32,depthWrite:!1});return new Xh(N,k)},jt=U=>{const N=[...U],k=[],K=new Set(t.edges.map(_=>At(_.u,_.v)));for(let _=0;_<N.length-1;_++){const P=N[_],W=N[_+1];if(!K.has(At(P,W)))continue;const q=t.layout[P],X=t.layout[W];!q||!X||k.push(q.x,q.y,q.z,X.x,X.y,X.z)}const H=new He;H.setAttribute("position",new _e(k,3));const x=new nc({color:pb,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new Xh(H,x)};ut=Ut(),o.add(ut),at=jt(e.pathIds),o.add(at);const st=new Ss;o.add(st),(()=>{for(;st.children.length;)st.remove(st.children[0]);j.clear();const U=new gr(1,20,20);for(const N of t.hyperedges){const k=[];for(const W of N.member_node_ids){const q=t.layout[W];q&&k.push(new z(q.x,q.y,q.z))}if(!k.length)continue;const K=new ji().setFromPoints(k),H=new ks;K.getBoundingSphere(H);const x=new Mn({color:hf,transparent:!0,opacity:.07,depthWrite:!1}),_=new Re(U,x);_.position.copy(H.center);const P=Math.max(H.radius*1.45,.65);_.scale.setScalar(P),_.userData.hyperedgeId=N.id,st.add(_),j.set(N.id,_)}})();const ct=new RE,R=new It,$=(U,N)=>{const k=l.domElement.getBoundingClientRect();R.x=(U-k.left)/k.width*2-1,R.y=-((N-k.top)/k.height)*2+1,ct.setFromCamera(R,a);const K=[...tt.values()],x=ct.intersectObjects(K,!0).find(P=>P.object instanceof Re&&typeof P.object.userData.nodeId=="string");if(!x){i(null);return}const _=x.object.userData.nodeId;i(_??null)},Z=U=>{U.button===0&&(A(),$(U.clientX,U.clientY))};l.domElement.addEventListener("pointerdown",Z),l.domElement.addEventListener("pointerup",E),l.domElement.addEventListener("wheel",I,{passive:!0}),l.domElement.addEventListener("touchstart",A,{passive:!0}),l.domElement.addEventListener("touchend",E,{passive:!0}),M.addEventListener("start",A),M.addEventListener("end",E);let ot=0;const Et=new xp,w=()=>{const U=Et.getDelta(),N=Et.getElapsedTime();M.update();for(const k of tt.values())k.rotation.y+=U*.1,k.rotation.z+=U*.02*Math.sin(N*.6+k.position.x*.2);f.render(),u.render(o,a),ot=requestAnimationFrame(w)};w();const C=()=>{const U=n.clientWidth||window.innerWidth,N=n.clientHeight||window.innerHeight;a.aspect=U/N,a.updateProjectionMatrix(),l.setSize(U,N),f.setSize(U,N),u.setSize(U,N),nt.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",C);const y=U=>{at&&(o.remove(at),at.geometry.dispose(),at.material.dispose(),at=jt(U.pathIds),o.add(at));const N=new Set([...U.pathIds,...U.hyperMemberIds]);for(const[k,K]of tt){const H=U.pathIds.has(k),x=U.hyperMemberIds.has(k),_=U.selectedId===k,P=!N.has(k)&&(U.pathIds.size>0||U.hyperMemberIds.size>0),W=P?.32:1,q=K.userData.nodeType||"major";K.traverse(X=>{if(X instanceof Za&&X.userData.isNodeLabel){const lt=X.element;let ht=P?.36:.96;(H||x)&&(ht=Math.max(ht,.94)),_&&(ht=1),lt.style.opacity=String(ht),lt.style.filter=_?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":H||x?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",lt.style.fontWeight=_?"800":"650",X.renderOrder=_?20:10;return}if(!(X instanceof Re))return;const dt=X.material;if(dt instanceof Mn&&(X.userData.part||"other")==="core"){let ht=P?.34:1;(H||x)&&(ht=Math.max(ht,.98)),_&&(ht=1),dt.opacity=ht,dt.transparent=ht<.999,dt.color.set(_?16777215:H||x?15924223:16777215);return}if(dt instanceof jh){let lt=P?.38:1,ht=q==="major"?.11:.09;(H||x)&&(lt=Math.max(lt,.98),ht=.26),_&&(ht=.38,lt=1),P&&(ht*=.55),dt.transparent=lt<.999,dt.opacity=lt,dt.emissiveIntensity=ht}else if(dt instanceof Mn){const lt=X.userData.part||"other";let ht=.42;lt==="glow"?ht=q==="major"?.048:.036:lt==="shard"?ht=.36:lt==="ring"&&(ht=.48);let Rt=ht*W;(H||x)&&(lt==="glow"||lt==="shard"?Rt=Math.max(Rt,.22):Rt=Math.max(Rt,.82)),_&&(lt==="glow"||lt==="shard")&&(Rt=Math.max(Rt,.34)),dt.opacity=Rt,dt.transparent=!0}})}for(const[k,K]of j){const H=K.material,x=U.activeHyperedgeIds.has(k);H.opacity=x?.22:.06,H.color=new kt(x?14216447:hf)}};return y(e),{dispose(){D(),cancelAnimationFrame(ot),window.removeEventListener("resize",C),l.domElement.removeEventListener("pointerdown",Z),l.domElement.removeEventListener("pointerup",E),l.domElement.removeEventListener("wheel",I),l.domElement.removeEventListener("touchstart",A),l.domElement.removeEventListener("touchend",E),M.removeEventListener("start",A),M.removeEventListener("end",E);for(const U of tt.values())o.remove(U),U.traverse(N=>{var k;if(N instanceof Re){const K=Array.isArray(N.material)?N.material:[N.material];for(const H of K)H instanceof jh?(H.map=null,H.bumpMap=null,H.roughnessMap=null):H instanceof Mn&&(H.map=null),H==null||H.dispose();(k=N.geometry)==null||k.dispose()}});tt.clear(),ut&&(o.remove(ut),ut.geometry.dispose(),ut.material.dispose(),ut=null),at&&(o.remove(at),at.geometry.dispose(),at.material.dispose(),at=null);for(const U of j.values())st.remove(U),U.geometry.dispose(),U.material.dispose();j.clear(),o.remove(st),o.remove(nt),nt.geometry.dispose(),nt.material.dispose(),v.dispose(),m.dispose(),f.dispose(),lb(),c.parentElement===n&&n.removeChild(c),M.dispose(),l.dispose(),l.domElement.parentElement&&l.domElement.parentElement.removeChild(l.domElement)},setVisualState(U){y(U)},frameBounds:U=>{const N=[];for(const _ of U){const P=t.layout[_];P&&N.push(new z(P.x,P.y,P.z))}if(!N.length)return;const k=new ji().setFromPoints(N),K=new z;k.getCenter(K);const H=new z;k.getSize(H);const x=Math.max(H.length()*.65,4);M.target.copy(K),a.position.copy(K.clone().add(new z(x*.9,x*.55,x*.95))),M.update()},getCamera:()=>a}}function xb(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const Mb={class:"galaxy-page"},Sb={key:0,class:"overlay center"},yb={key:1,class:"overlay center error-panel"},Eb={class:"error-msg"},bb={class:"panel-card"},Tb={class:"side-title"},Ab={class:"side-desc"},wb={key:0,class:"block"},Rb={class:"pill-list"},Cb={class:"members"},Pb={class:"panel-card rec"},Db={class:"rec-head"},Lb={key:0,class:"rec-list"},Ib={class:"rec-node"},Ub={class:"rec-reason"},Nb={key:2,class:"hint-chip"},Ob={key:0,class:"path-caption"},Fb=Xo({__name:"GalaxyView",setup(n){const t=Nd(),e=Ue("loading"),i=Ue(""),s=Ue(null),r=Ue([]),o=Ue(!1),a=Ue(null),l=il(null),c=Ue(new Set),u=il(null),h=Me(()=>{if(!s.value||!l.value)return"";const ct=l.value.nodes.find(R=>R.id===s.value);return(ct==null?void 0:ct.label)??""}),f=Me(()=>{var $,Z;if(!s.value||!l.value)return"";const ct=l.value.nodes.find(ot=>ot.id===s.value);if(!ct)return"";if(ct.type==="fusion"){const ot=(($=ct.meta)==null?void 0:$.subtitle)??"";return ot?`交叉关卡 · ${ot}`:"交叉学科关卡"}const R=((Z=ct.meta)==null?void 0:Z.tagline)??"";return R?`专业入口 · ${R}`:"专业节点"}),p=Me(()=>{if(!s.value||!l.value)return{ids:[],members:[]};const{hyperedgeIds:ct,memberIds:R}=va(s.value,l.value.hyperedges),$=[...R].map(Z=>{var ot;return((ot=l.value.nodes.find(Et=>Et.id===Z))==null?void 0:ot.label)??Z}).filter(Z=>Z);return{ids:ct,members:$}}),g=Me(()=>!s.value||!l.value?new Set:new Set(va(s.value,l.value.hyperedges).hyperedgeIds)),v=Me(()=>!s.value||!l.value?new Set:va(s.value,l.value.hyperedges).memberIds),m=Me(()=>({pathIds:c.value,selectedId:s.value,hyperMemberIds:v.value,activeHyperedgeIds:g.value})),d=Me(()=>{var $,Z;if(!a.value||!l.value)return"";const ct=($=l.value.nodes.find(ot=>ot.id===a.value.fromId))==null?void 0:$.label,R=(Z=l.value.nodes.find(ot=>ot.id===a.value.toId))==null?void 0:Z.label;return!ct||!R?"":`${ct} → ${R}`});Xi(m,ct=>{var R;(R=u.value)==null||R.setVisualState(ct)}),Xi(s,()=>{o.value=!1,Mt()});function S(){try{const ct=sessionStorage.getItem(ml);if(!ct)return null;const R=JSON.parse(ct);return!R.fromId||!R.toId||R.fromId===R.toId?null:R}catch{return null}}async function b(){if(e.value="loading",i.value="",!xb()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const ct=S();if(!ct){t.replace({name:"select"});return}a.value=ct;try{const R=yv();let $,Z;try{$=await Gu(R),Z=await ku(R)}catch(Et){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&R!=="./mock")$=await Gu("./mock"),Z=await ku("./mock");else throw Et}r.value=Z.suggestions??[],l.value={nodes:$.nodes,edges:$.edges,hyperedges:$.hyperedges,layout:$.layout};const ot=Ev(l.value.edges,ct.fromId,ct.toId);c.value=new Set(ot??[ct.fromId,ct.toId]),e.value="ready"}catch(R){e.value="error",i.value=R instanceof Error?R.message:"加载失败"}}function M(ct){var ot;if((ot=u.value)==null||ot.dispose(),u.value=null,!ct||!l.value||e.value!=="ready")return;const R={pathIds:c.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},$=vb(ct,l.value,R,Et=>{s.value=Et});u.value=$,$.setVisualState(m.value);const Z=[...c.value];$.frameBounds(Z.length?Z:[...l.value.nodes.map(Et=>Et.id)].slice(0,6))}const F=Ue(null),L=Ue(null),D=Ue(!0),O=Ue(null),A=Ue(null);let E=!1,I=0,tt=0,j=0,ut=0;function at(ct,R,$){return Math.max(R,Math.min($,ct))}function et(){E&&(E=!1,window.removeEventListener("pointermove",nt),window.removeEventListener("pointerup",et))}function nt(ct){if(!E||!L.value)return;const R=L.value,$=ct.clientX-I,Z=ct.clientY-tt,ot=R.getBoundingClientRect(),Et=ot.width,w=ot.height;let C=j+$,y=ut+Z;C=at(C,8,window.innerWidth-Et-8),y=at(y,8,window.innerHeight-w-8),O.value=C,A.value=y}function Y(ct){if(ct.button!==0||!L.value)return;et(),ct.preventDefault();const R=L.value.getBoundingClientRect();E=!0,I=ct.clientX,tt=ct.clientY,j=R.left,ut=R.top,O.value=R.left,A.value=R.top,window.addEventListener("pointermove",nt),window.addEventListener("pointerup",et)}const gt=Me(()=>{if(!(O.value==null||A.value==null))return{left:`${O.value}px`,top:`${A.value}px`,right:"auto",bottom:"auto"}});function Mt(){D.value=!0,O.value=null,A.value=null,et()}jf(async()=>{await b()}),Xi(e,async ct=>{ct==="ready"&&(await _c(),M(F.value))}),Kf(()=>{var ct;et(),(ct=u.value)==null||ct.dispose()});function At(){b()}function Ut(){t.push({name:"select"})}function jt(){try{sessionStorage.removeItem(ml)}catch{}Od(),t.replace({name:"select"})}function st(ct){var R,$;return(($=(R=l.value)==null?void 0:R.nodes.find(Z=>Z.id===ct))==null?void 0:$.label)??ct}function mt(){window.alert("「去练」将对接现有题库模块（占位）")}return(ct,R)=>{var $,Z;return ve(),be("div",Mb,[e.value==="loading"?(ve(),be("div",Sb,[...R[2]||(R[2]=[Ft("div",{class:"spinner","aria-hidden":"true"},null,-1),Ft("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(ve(),be("div",yb,[R[3]||(R[3]=Ft("p",{class:"error-title"},"无法进入星系",-1)),Ft("p",Eb,Ne(i.value),1),Ft("div",{class:"error-actions"},[Ft("button",{type:"button",class:"btn ghost",onClick:Ut},"返回选择"),Ft("button",{type:"button",class:"btn primary",onClick:At},"重试")]),R[4]||(R[4]=Ft("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(ve(),be(rn,{key:2},[Ft("div",{ref_key:"canvasHost",ref:F,class:"canvas-host"},null,512),Ft("div",{class:"top-bar"},[R[5]||(R[5]=Ft("div",{class:"top-left-spacer"},null,-1)),R[6]||(R[6]=Ft("div",{class:"top-title"},"专业星系",-1)),Ft("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:jt},"×")]),s.value?(ve(),be("button",{key:0,type:"button",class:"side-toggle",onClick:R[0]||(R[0]=ot=>D.value=!D.value)},Ne(D.value?"隐藏":"显示"),1)):gs("",!0),s.value?pm((ve(),be("aside",{key:1,ref_key:"sidePanelEl",ref:L,class:"side",style:Ho(gt.value)},[Ft("div",{class:"side-drag-handle",onPointerdown:Y},"信息面板",32),Ft("section",bb,[R[9]||(R[9]=Ft("p",{class:"side-eyebrow"},"选中",-1)),Ft("h2",Tb,Ne(h.value),1),Ft("p",Ab,Ne(f.value),1),p.value.ids.length?(ve(),be("section",wb,[R[7]||(R[7]=Ft("p",{class:"block-label"},"相关超边（融合域）",-1)),Ft("ul",Rb,[(ve(!0),be(rn,null,sl(p.value.ids,ot=>(ve(),be("li",{key:ot,class:"pill"},Ne(ot),1))),128))]),R[8]||(R[8]=Ft("p",{class:"block-label"},"成员节点",-1)),Ft("p",Cb,Ne(p.value.members.join("、")),1)])):gs("",!0),((Z=($=l.value)==null?void 0:$.nodes.find(ot=>ot.id===s.value))==null?void 0:Z.type)==="fusion"?(ve(),be("button",{key:1,type:"button",class:"btn primary full",onClick:mt}," 去练 ")):gs("",!0)]),Ft("section",Pb,[Ft("div",Db,[R[10]||(R[10]=Ft("p",{class:"block-label"},"推荐下一步（mock）",-1)),Ft("button",{type:"button",class:"btn rec-toggle",onClick:R[1]||(R[1]=ot=>o.value=!o.value)},Ne(o.value?"收起":"展开"),1)]),o.value?(ve(),be("ul",Lb,[(ve(!0),be(rn,null,sl(r.value,ot=>(ve(),be("li",{key:ot.nodeId},[Ft("span",Ib,Ne(st(ot.nodeId)),1),Ft("span",Ub,Ne(ot.reason),1)]))),128))])):gs("",!0)])],4)),[[Cg,D.value]]):(ve(),be("div",Nb,[R[11]||(R[11]=Ft("p",{class:"side-hint"},"星球上方有专业名称；点选后查看融合域与成员",-1)),d.value?(ve(),be("p",Ob,Ne(d.value),1)):gs("",!0)]))],64))])}}}),Bb=Ec(Fb,[["__scopeId","data-v-86dacb29"]]),zb=ov({history:B_(),routes:[{path:"/",name:"select",component:Sv},{path:"/galaxy",name:"galaxy",component:Bb}]});jg(Qg).use(zb).mount("#app");
