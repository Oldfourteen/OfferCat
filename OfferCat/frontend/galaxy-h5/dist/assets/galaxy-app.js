(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ec(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const fe={},Rs=[],Fn=()=>{},If=()=>!1,na=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ia=n=>n.startsWith("onUpdate:"),Ie=Object.assign,bc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Xp=Object.prototype.hasOwnProperty,ae=(n,t)=>Xp.call(n,t),Ht=Array.isArray,Cs=n=>Hr(n)==="[object Map]",Uf=n=>Hr(n)==="[object Set]",hu=n=>Hr(n)==="[object Date]",Xt=n=>typeof n=="function",xe=n=>typeof n=="string",kn=n=>typeof n=="symbol",ue=n=>n!==null&&typeof n=="object",Nf=n=>(ue(n)||Xt(n))&&Xt(n.then)&&Xt(n.catch),Of=Object.prototype.toString,Hr=n=>Of.call(n),jp=n=>Hr(n).slice(8,-1),Ff=n=>Hr(n)==="[object Object]",Tc=n=>xe(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,yr=Ec(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),sa=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},qp=/-\w/g,Ye=sa(n=>n.replace(qp,t=>t.slice(1).toUpperCase())),Yp=/\B([A-Z])/g,ts=sa(n=>n.replace(Yp,"-$1").toLowerCase()),ra=sa(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ea=sa(n=>n?`on${ra(n)}`:""),On=(n,t)=>!Object.is(n,t),ba=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},Bf=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},$p=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let fu;const oa=()=>fu||(fu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function aa(n){if(Ht(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=xe(i)?Qp(i):aa(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(xe(n)||ue(n))return n}const Kp=/;(?![^(]*\))/g,Zp=/:([^]+)/,Jp=/\/\*[^]*?\*\//g;function Qp(n){const t={};return n.replace(Jp,"").split(Kp).forEach(e=>{if(e){const i=e.split(Zp);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Fs(n){let t="";if(xe(n))t=n;else if(Ht(n))for(let e=0;e<n.length;e++){const i=Fs(n[e]);i&&(t+=i+" ")}else if(ue(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const tm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",em=Ec(tm);function zf(n){return!!n||n===""}function nm(n,t){if(n.length!==t.length)return!1;let e=!0;for(let i=0;e&&i<n.length;i++)e=Ac(n[i],t[i]);return e}function Ac(n,t){if(n===t)return!0;let e=hu(n),i=hu(t);if(e||i)return e&&i?n.getTime()===t.getTime():!1;if(e=kn(n),i=kn(t),e||i)return n===t;if(e=Ht(n),i=Ht(t),e||i)return e&&i?nm(n,t):!1;if(e=ue(n),i=ue(t),e||i){if(!e||!i)return!1;const s=Object.keys(n).length,r=Object.keys(t).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=t.hasOwnProperty(o);if(a&&!l||!a&&l||!Ac(n[o],t[o]))return!1}}return String(n)===String(t)}const Hf=n=>!!(n&&n.__v_isRef===!0),Zt=n=>xe(n)?n:n==null?"":Ht(n)||ue(n)&&(n.toString===Of||!Xt(n.toString))?Hf(n)?Zt(n.value):JSON.stringify(n,kf,2):String(n),kf=(n,t)=>Hf(t)?kf(n,t.value):Cs(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[i,s],r)=>(e[Ta(i,r)+" =>"]=s,e),{})}:Uf(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ta(e))}:kn(t)?Ta(t):ue(t)&&!Ht(t)&&!Ff(t)?String(t):t,Ta=(n,t="")=>{var e;return kn(n)?`Symbol(${(e=n.description)!=null?e:t})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Le;class im{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Le&&(Le.active?(this.parent=Le,this.index=(Le.scopes||(Le.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Le;try{return Le=this,t()}finally{Le=e}}}on(){++this._on===1&&(this.prevScope=Le,Le=this)}off(){if(this._on>0&&--this._on===0){if(Le===this)Le=this.prevScope;else{let t=Le;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function sm(){return Le}let me;const Aa=new WeakSet;class Vf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Le&&(Le.active?Le.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Aa.has(this)&&(Aa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Wf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,du(this),Xf(this);const t=me,e=An;me=this,An=!0;try{return this.fn()}finally{jf(this),me=t,An=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Cc(t);this.deps=this.depsTail=void 0,du(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Aa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ml(this)&&this.run()}get dirty(){return ml(this)}}let Gf=0,Sr,Er;function Wf(n,t=!1){if(n.flags|=8,t){n.next=Er,Er=n;return}n.next=Sr,Sr=n}function wc(){Gf++}function Rc(){if(--Gf>0)return;if(Er){let t=Er;for(Er=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;Sr;){let t=Sr;for(Sr=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function Xf(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function jf(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),Cc(i),rm(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function ml(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(qf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function qf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Pr)||(n.globalVersion=Pr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!ml(n))))return;n.flags|=2;const t=n.dep,e=me,i=An;me=n,An=!0;try{Xf(n);const s=n.fn(n._value);(t.version===0||On(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{me=e,An=i,jf(n),n.flags&=-3}}function Cc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)Cc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function rm(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let An=!0;const Yf=[];function ui(){Yf.push(An),An=!1}function hi(){const n=Yf.pop();An=n===void 0?!0:n}function du(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=me;me=void 0;try{t()}finally{me=e}}}let Pr=0;class om{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Pc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!me||!An||me===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==me)e=this.activeLink=new om(me,this),me.deps?(e.prevDep=me.depsTail,me.depsTail.nextDep=e,me.depsTail=e):me.deps=me.depsTail=e,$f(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=me.depsTail,e.nextDep=void 0,me.depsTail.nextDep=e,me.depsTail=e,me.deps===e&&(me.deps=i)}return e}trigger(t){this.version++,Pr++,this.notify(t)}notify(t){wc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Rc()}}}function $f(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)$f(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const gl=new WeakMap,Yi=Symbol(""),_l=Symbol(""),Dr=Symbol("");function Oe(n,t,e){if(An&&me){let i=gl.get(n);i||gl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new Pc),s.map=i,s.key=e),s.track()}}function ii(n,t,e,i,s,r){const o=gl.get(n);if(!o){Pr++;return}const a=l=>{l&&l.trigger()};if(wc(),t==="clear")o.forEach(a);else{const l=Ht(n),c=l&&Tc(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===Dr||!kn(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Dr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Yi)),Cs(n)&&a(o.get(_l)));break;case"delete":l||(a(o.get(Yi)),Cs(n)&&a(o.get(_l)));break;case"set":Cs(n)&&a(o.get(Yi));break}}Rc()}function rs(n){const t=oe(n);return t===n?t:(Oe(t,"iterate",Dr),gn(n)?t:t.map(Rn))}function la(n){return Oe(n=oe(n),"iterate",Dr),n}function In(n,t){return fi(n)?Bs($i(n)?Rn(t):t):Rn(t)}const am={__proto__:null,[Symbol.iterator](){return wa(this,Symbol.iterator,n=>In(this,n))},concat(...n){return rs(this).concat(...n.map(t=>Ht(t)?rs(t):t))},entries(){return wa(this,"entries",n=>(n[1]=In(this,n[1]),n))},every(n,t){return qn(this,"every",n,t,void 0,arguments)},filter(n,t){return qn(this,"filter",n,t,e=>e.map(i=>In(this,i)),arguments)},find(n,t){return qn(this,"find",n,t,e=>In(this,e),arguments)},findIndex(n,t){return qn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return qn(this,"findLast",n,t,e=>In(this,e),arguments)},findLastIndex(n,t){return qn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return qn(this,"forEach",n,t,void 0,arguments)},includes(...n){return Ra(this,"includes",n)},indexOf(...n){return Ra(this,"indexOf",n)},join(n){return rs(this).join(n)},lastIndexOf(...n){return Ra(this,"lastIndexOf",n)},map(n,t){return qn(this,"map",n,t,void 0,arguments)},pop(){return rr(this,"pop")},push(...n){return rr(this,"push",n)},reduce(n,...t){return pu(this,"reduce",n,t)},reduceRight(n,...t){return pu(this,"reduceRight",n,t)},shift(){return rr(this,"shift")},some(n,t){return qn(this,"some",n,t,void 0,arguments)},splice(...n){return rr(this,"splice",n)},toReversed(){return rs(this).toReversed()},toSorted(n){return rs(this).toSorted(n)},toSpliced(...n){return rs(this).toSpliced(...n)},unshift(...n){return rr(this,"unshift",n)},values(){return wa(this,"values",n=>In(this,n))}};function wa(n,t,e){const i=la(n),s=i[t]();return i!==n&&!gn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=e(r.value)),r}),s}const lm=Array.prototype;function qn(n,t,e,i,s,r){const o=la(n),a=o!==n&&!gn(n),l=o[t];if(l!==lm[t]){const h=l.apply(n,r);return a?Rn(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,In(n,h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function pu(n,t,e,i){const s=la(n),r=s!==n&&!gn(n);let o=e,a=!1;s!==n&&(r?(a=i.length===0,o=function(c,u,h){return a&&(a=!1,c=In(n,c)),e.call(this,c,In(n,u),h,n)}):e.length>3&&(o=function(c,u,h){return e.call(this,c,u,h,n)}));const l=s[t](o,...i);return a?In(n,l):l}function Ra(n,t,e){const i=oe(n);Oe(i,"iterate",Dr);const s=i[t](...e);return(s===-1||s===!1)&&Ic(e[0])?(e[0]=oe(e[0]),i[t](...e)):s}function rr(n,t,e=[]){ui(),wc();const i=oe(n)[t].apply(n,e);return Rc(),hi(),i}const cm=Ec("__proto__,__v_isRef,__isVue"),Kf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(kn));function um(n){kn(n)||(n=String(n));const t=oe(this);return Oe(t,"has",n),t.hasOwnProperty(n)}class Zf{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?Mm:ed:r?td:Qf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Ht(t);if(!s){let l;if(o&&(l=am[e]))return l;if(e==="hasOwnProperty")return um}const a=Reflect.get(t,e,ze(t)?t:i);if((kn(e)?Kf.has(e):cm(e))||(s||Oe(t,"get",e),r))return a;if(ze(a)){const l=o&&Tc(e)?a:a.value;return s&&ue(l)?xl(l):l}return ue(a)?s?xl(a):ca(a):a}}class Jf extends Zf{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];const o=Ht(t)&&Tc(e);if(!this._isShallow){const c=fi(r);if(!gn(i)&&!fi(i)&&(r=oe(r),i=oe(i)),!o&&ze(r)&&!ze(i))return c||(r.value=i),!0}const a=o?Number(e)<t.length:ae(t,e),l=Reflect.set(t,e,i,ze(t)?t:s);return t===oe(s)&&(a?On(i,r)&&ii(t,"set",e,i):ii(t,"add",e,i)),l}deleteProperty(t,e){const i=ae(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&ii(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!kn(e)||!Kf.has(e))&&Oe(t,"has",e),i}ownKeys(t){return Oe(t,"iterate",Ht(t)?"length":Yi),Reflect.ownKeys(t)}}class hm extends Zf{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const fm=new Jf,dm=new hm,pm=new Jf(!0);const vl=n=>n,Zr=n=>Reflect.getPrototypeOf(n);function mm(n,t,e){return function(...i){const s=this.__v_raw,r=oe(s),o=Cs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?vl:t?Bs:Rn;return!t&&Oe(r,"iterate",l?_l:Yi),Ie(Object.create(c),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}}})}}function Jr(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function gm(n,t){const e={get(s){const r=this.__v_raw,o=oe(r),a=oe(s);n||(On(s,a)&&Oe(o,"get",s),Oe(o,"get",a));const{has:l}=Zr(o),c=t?vl:n?Bs:Rn;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Oe(oe(s),"iterate",Yi),s.size},has(s){const r=this.__v_raw,o=oe(r),a=oe(s);return n||(On(s,a)&&Oe(o,"has",s),Oe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=oe(a),c=t?vl:n?Bs:Rn;return!n&&Oe(l,"iterate",Yi),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Ie(e,n?{add:Jr("add"),set:Jr("set"),delete:Jr("delete"),clear:Jr("clear")}:{add(s){const r=oe(this),o=Zr(r),a=oe(s),l=!t&&!gn(s)&&!fi(s)?a:s;return o.has.call(r,l)||On(s,l)&&o.has.call(r,s)||On(a,l)&&o.has.call(r,a)||(r.add(l),ii(r,"add",l,l)),this},set(s,r){!t&&!gn(r)&&!fi(r)&&(r=oe(r));const o=oe(this),{has:a,get:l}=Zr(o);let c=a.call(o,s);c||(s=oe(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?On(r,u)&&ii(o,"set",s,r):ii(o,"add",s,r),this},delete(s){const r=oe(this),{has:o,get:a}=Zr(r);let l=o.call(r,s);l||(s=oe(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&ii(r,"delete",s,void 0),c},clear(){const s=oe(this),r=s.size!==0,o=s.clear();return r&&ii(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=mm(s,n,t)}),e}function Dc(n,t){const e=gm(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ae(e,s)&&s in i?e:i,s,r)}const _m={get:Dc(!1,!1)},vm={get:Dc(!1,!0)},xm={get:Dc(!0,!1)};const Qf=new WeakMap,td=new WeakMap,ed=new WeakMap,Mm=new WeakMap;function ym(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Sm(n){return n.__v_skip||!Object.isExtensible(n)?0:ym(jp(n))}function ca(n){return fi(n)?n:Lc(n,!1,fm,_m,Qf)}function nd(n){return Lc(n,!1,pm,vm,td)}function xl(n){return Lc(n,!0,dm,xm,ed)}function Lc(n,t,e,i,s){if(!ue(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=Sm(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function $i(n){return fi(n)?$i(n.__v_raw):!!(n&&n.__v_isReactive)}function fi(n){return!!(n&&n.__v_isReadonly)}function gn(n){return!!(n&&n.__v_isShallow)}function Ic(n){return n?!!n.__v_raw:!1}function oe(n){const t=n&&n.__v_raw;return t?oe(t):n}function Em(n){return!ae(n,"__v_skip")&&Object.isExtensible(n)&&Bf(n,"__v_skip",!0),n}const Rn=n=>ue(n)?ca(n):n,Bs=n=>ue(n)?xl(n):n;function ze(n){return n?n.__v_isRef===!0:!1}function ne(n){return id(n,!1)}function zs(n){return id(n,!0)}function id(n,t){return ze(n)?n:new bm(n,t)}class bm{constructor(t,e){this.dep=new Pc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:oe(t),this._value=e?t:Rn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||gn(t)||fi(t);t=i?t:oe(t),On(t,e)&&(this._rawValue=t,this._value=i?t:Rn(t),this.dep.trigger())}}function Bn(n){return ze(n)?n.value:n}const Tm={get:(n,t,e)=>t==="__v_raw"?n:Bn(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return ze(s)&&!ze(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function sd(n){return $i(n)?n:new Proxy(n,Tm)}class Am{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Pc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Pr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return Wf(this,!0),!0}get value(){const t=this.dep.track();return qf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function wm(n,t,e=!1){let i,s;return Xt(n)?i=n:(i=n.get,s=n.set),new Am(i,s,e)}const Qr={},ko=new WeakMap;let ki;function Rm(n,t=!1,e=ki){if(e){let i=ko.get(e);i||ko.set(e,i=[]),i.push(n)}}function Cm(n,t,e=fe){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=M=>s?M:gn(M)||s===!1||s===0?si(M,1):si(M);let u,h,f,p,g=!1,_=!1;if(ze(n)?(h=()=>n.value,g=gn(n)):$i(n)?(h=()=>c(n),g=!0):Ht(n)?(_=!0,g=n.some(M=>$i(M)||gn(M)),h=()=>n.map(M=>{if(ze(M))return M.value;if($i(M))return c(M);if(Xt(M))return l?l(M,2):M()})):Xt(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){ui();try{f()}finally{hi()}}const M=ki;ki=u;try{return l?l(n,3,[p]):n(p)}finally{ki=M}}:h=Fn,t&&s){const M=h,k=s===!0?1/0:s;h=()=>si(M(),k)}const m=sm(),d=()=>{u.stop(),m&&m.active&&bc(m.effects,u)};if(r&&t){const M=t;t=(...k)=>{M(...k),d()}}let S=_?new Array(n.length).fill(Qr):Qr;const A=M=>{if(!(!(u.flags&1)||!u.dirty&&!M))if(t){const k=u.run();if(s||g||(_?k.some((L,P)=>On(L,S[P])):On(k,S))){f&&f();const L=ki;ki=u;try{const P=[k,S===Qr?void 0:_&&S[0]===Qr?[]:S,p];S=k,l?l(t,3,P):t(...P)}finally{ki=L}}}else u.run()};return a&&a(A),u=new Vf(h),u.scheduler=o?()=>o(A,!1):A,p=M=>Rm(M,!1,u),f=u.onStop=()=>{const M=ko.get(u);if(M){if(l)l(M,4);else for(const k of M)k();ko.delete(u)}},t?i?A(!0):S=u.run():o?o(A.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function si(n,t=1/0,e){if(t<=0||!ue(n)||n.__v_skip||(e=e||new Map,(e.get(n)||0)>=t))return n;if(e.set(n,t),t--,ze(n))si(n.value,t,e);else if(Ht(n))for(let i=0;i<n.length;i++)si(n[i],t,e);else if(Uf(n)||Cs(n))n.forEach(i=>{si(i,t,e)});else if(Ff(n)){for(const i in n)si(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&si(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kr(n,t,e,i){try{return i?n(...i):n()}catch(s){ua(s,t,e)}}function Vn(n,t,e,i){if(Xt(n)){const s=kr(n,t,e,i);return s&&Nf(s)&&s.catch(r=>{ua(r,t,e)}),s}if(Ht(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Vn(n[r],t,e,i));return s}}function ua(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||fe;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){ui(),kr(r,null,10,[n,l,c]),hi();return}}Pm(n,e,s,i,o)}function Pm(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const Xe=[];let Ln=-1;const Ps=[];let Ti=null,ys=0;const rd=Promise.resolve();let Vo=null;function Hs(n){const t=Vo||rd;return n?t.then(this?n.bind(this):n):t}function Dm(n){let t=Ln+1,e=Xe.length;for(;t<e;){const i=t+e>>>1,s=Xe[i],r=Lr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function Uc(n){if(!(n.flags&1)){const t=Lr(n),e=Xe[Xe.length-1];!e||!(n.flags&2)&&t>=Lr(e)?Xe.push(n):Xe.splice(Dm(t),0,n),n.flags|=1,od()}}function od(){Vo||(Vo=rd.then(ld))}function Lm(n){Ht(n)?Ps.push(...n):Ti&&n.id===-1?Ti.splice(ys+1,0,n):n.flags&1||(Ps.push(n),n.flags|=1),od()}function mu(n,t,e=Ln+1){for(;e<Xe.length;e++){const i=Xe[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Xe.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function ad(n){if(Ps.length){const t=[...new Set(Ps)].sort((e,i)=>Lr(e)-Lr(i));if(Ps.length=0,Ti){Ti.push(...t);return}for(Ti=t,ys=0;ys<Ti.length;ys++){const e=Ti[ys];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Ti=null,ys=0}}const Lr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function ld(n){try{for(Ln=0;Ln<Xe.length;Ln++){const t=Xe[Ln];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),kr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ln<Xe.length;Ln++){const t=Xe[Ln];t&&(t.flags&=-2)}Ln=-1,Xe.length=0,ad(),Vo=null,(Xe.length||Ps.length)&&ld()}}let an=null,cd=null;function Go(n){const t=an;return an=n,cd=n&&n.type.__scopeId||null,t}function Im(n,t=an,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&jo(-1);const r=Go(t);let o;try{o=n(...s)}finally{Go(r),i._d&&jo(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function Um(n,t){if(an===null)return n;const e=ga(an),i=n.dirs||(n.dirs=[]);for(let s=0;s<t.length;s++){let[r,o,a,l=fe]=t[s];r&&(Xt(r)&&(r={mounted:r,updated:r}),r.deep&&si(o),i.push({dir:r,instance:e,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function Ii(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(ui(),Vn(l,e,8,[n.el,a,n,t]),hi())}}function Po(n,t){if(Fe){let e=Fe.provides;const i=Fe.parent&&Fe.parent.provides;i===e&&(e=Fe.provides=Object.create(i)),e[n]=t}}function zn(n,t,e=!1){const i=Bg();if(i||Ds){let s=Ds?Ds._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&Xt(t)?t.call(i&&i.proxy):t}}const Nm=Symbol.for("v-scx"),Om=()=>zn(Nm);function Hn(n,t,e){return ud(n,t,e)}function ud(n,t,e=fe){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ie({},e),l=t&&i||!t&&r!=="post";let c;if(Nr){if(r==="sync"){const p=Om();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Fn,p.resume=Fn,p.pause=Fn,p}}const u=Fe;a.call=(p,g,_)=>Vn(p,u,g,_);let h=!1;r==="post"?a.scheduler=p=>{Ge(p,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(p,g)=>{g?p():Uc(p)}),a.augmentJob=p=>{t&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=Cm(n,t,a);return Nr&&(c?c.push(f):l&&f()),f}function Fm(n,t,e){const i=this.proxy,s=xe(n)?n.includes(".")?hd(i,n):()=>i[n]:n.bind(i,i);let r;Xt(t)?r=t:(r=t.handler,e=t);const o=Vr(this),a=ud(s,r.bind(i),e);return o(),a}function hd(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const bi=new WeakMap,fd=Symbol("_vte"),Bm=n=>n.__isTeleport,Gi=n=>n&&(n.disabled||n.disabled===""),zm=n=>n&&(n.defer||n.defer===""),gu=n=>typeof SVGElement<"u"&&n instanceof SVGElement,_u=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Ml=(n,t)=>{const e=n&&n.to;return xe(e)?t?t(e):null:e},Hm={name:"Teleport",__isTeleport:!0,process(n,t,e,i,s,r,o,a,l,c){const{mc:u,pc:h,pbc:f,o:{insert:p,querySelector:g,createText:_,createComment:m,parentNode:d}}=c,S=Gi(t.props);let{dynamicChildren:A}=t;const M=(P,N,w)=>{P.shapeFlag&16&&u(P.children,N,w,s,r,o,a,l)},k=(P=t)=>{const N=Gi(P.props),w=P.target=Ml(P.props,g),E=yl(w,P,_,p);w&&(o!=="svg"&&gu(w)?o="svg":o!=="mathml"&&_u(w)&&(o="mathml"),s&&s.isCE&&(s.ce._teleportTargets||(s.ce._teleportTargets=new Set)).add(w),N||(M(P,w,E),gr(P,!1)))},L=P=>{const N=()=>{if(bi.get(P)===N){if(bi.delete(P),Gi(P.props)){const w=d(P.el)||e;M(P,w,P.anchor),gr(P,!0)}k(P)}};bi.set(P,N),Ge(N,r)};if(n==null){const P=t.el=_(""),N=t.anchor=_("");if(p(P,e,i),p(N,e,i),zm(t.props)||r&&r.pendingBranch){L(t);return}S&&(M(t,e,N),gr(t,!0)),k()}else{t.el=n.el;const P=t.anchor=n.anchor,N=bi.get(n);if(N){N.flags|=8,bi.delete(n),L(t);return}t.targetStart=n.targetStart;const w=t.target=n.target,E=t.targetAnchor=n.targetAnchor,D=Gi(n.props),U=D?e:w,z=D?P:E;if(o==="svg"||gu(w)?o="svg":(o==="mathml"||_u(w))&&(o="mathml"),A?(f(n.dynamicChildren,A,U,s,r,o,a),Bc(n,t,!0)):l||h(n,t,U,z,s,r,o,a,!1),S)D?t.props&&n.props&&t.props.to!==n.props.to&&(t.props.to=n.props.to):to(t,e,P,c,1);else if((t.props&&t.props.to)!==(n.props&&n.props.to)){const nt=t.target=Ml(t.props,g);nt&&to(t,nt,null,c,0)}else D&&to(t,w,E,c,1);gr(t,S)}},remove(n,t,e,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:h,props:f}=n;let p=r||!Gi(f);const g=bi.get(n);if(g&&(g.flags|=8,bi.delete(n),p=!1),h&&(s(c),s(u)),r&&s(l),o&16)for(let _=0;_<a.length;_++){const m=a[_];i(m,t,e,p,!!m.dynamicChildren)}},move:to,hydrate:km};function to(n,t,e,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,t,e);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,h=r===2;if(h&&i(o,t,e),!bi.has(n)&&(!h||Gi(u))&&l&16)for(let f=0;f<c.length;f++)s(c[f],t,e,2);h&&i(a,t,e)}function km(n,t,e,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},h){function f(m,d){let S=d;for(;S;){if(S&&S.nodeType===8){if(S.data==="teleport start anchor")t.targetStart=S;else if(S.data==="teleport anchor"){t.targetAnchor=S,m._lpa=t.targetAnchor&&o(t.targetAnchor);break}}S=o(S)}}function p(m,d){d.anchor=h(o(m),d,a(m),e,i,s,r)}const g=t.target=Ml(t.props,l),_=Gi(t.props);if(g){const m=g._lpa||g.firstChild;t.shapeFlag&16&&(_?(p(n,t),f(g,m),t.targetAnchor||yl(g,t,u,c,a(n)===g?n:null)):(t.anchor=o(n),f(g,m),t.targetAnchor||yl(g,t,u,c),h(m&&o(m),t,g,e,i,s,r))),gr(t,_)}else _&&t.shapeFlag&16&&(p(n,t),t.targetStart=n,t.targetAnchor=o(n));return t.anchor&&o(t.anchor)}const vu=Hm;function gr(n,t){const e=n.ctx;if(e&&e.ut){let i,s;for(t?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",e.uid),i=i.nextSibling;e.ut()}}function yl(n,t,e,i,s=null){const r=t.targetStart=e(""),o=t.targetAnchor=e("");return r[fd]=o,n&&(i(r,n,s),i(o,n,s)),o}const Vm=Symbol("_leaveCb");function Nc(n,t){n.shapeFlag&6&&n.component?(n.transition=t,Nc(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function es(n,t){return Xt(n)?Ie({name:n.name},t,{setup:n}):n}function dd(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function xu(n,t){let e;return!!((e=Object.getOwnPropertyDescriptor(n,t))&&!e.configurable)}const Wo=new WeakMap;function br(n,t,e,i,s=!1){if(Ht(n)){n.forEach((_,m)=>br(_,t&&(Ht(t)?t[m]:t),e,i,s));return}if(Tr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&br(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?ga(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===fe?a.refs={}:a.refs,h=a.setupState,f=oe(h),p=h===fe?If:_=>xu(u,_)?!1:ae(f,_),g=(_,m)=>!(m&&xu(u,m));if(c!=null&&c!==l){if(Mu(t),xe(c))u[c]=null,p(c)&&(h[c]=null);else if(ze(c)){const _=t;g(c,_.k)&&(c.value=null),_.k&&(u[_.k]=null)}}if(Xt(l))kr(l,a,12,[o,u]);else{const _=xe(l),m=ze(l);if(_||m){const d=()=>{if(n.f){const S=_?p(l)?h[l]:u[l]:g()||!n.k?l.value:u[n.k];if(s)Ht(S)&&bc(S,r);else if(Ht(S))S.includes(r)||S.push(r);else if(_)u[l]=[r],p(l)&&(h[l]=u[l]);else{const A=[r];g(l,n.k)&&(l.value=A),n.k&&(u[n.k]=A)}}else _?(u[l]=o,p(l)&&(h[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(u[n.k]=o))};if(o){const S=()=>{d(),Wo.delete(n)};S.id=-1,Wo.set(n,S),Ge(S,e)}else Mu(n),d()}}}function Mu(n){const t=Wo.get(n);t&&(t.flags|=8,Wo.delete(n))}oa().requestIdleCallback;oa().cancelIdleCallback;const Tr=n=>!!n.type.__asyncLoader,pd=n=>n.type.__isKeepAlive;function Gm(n,t){md(n,"a",t)}function Wm(n,t){md(n,"da",t)}function md(n,t,e=Fe){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(ha(t,i,e),e){let s=e.parent;for(;s&&s.parent;)pd(s.parent.vnode)&&Xm(i,t,e,s),s=s.parent}}function Xm(n,t,e,i){const s=ha(t,n,i,!0);gd(()=>{bc(i[t],s)},e)}function ha(n,t,e=Fe,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{ui();const a=Vr(e),l=Vn(t,e,n,o);return a(),hi(),l});return i?s.unshift(r):s.push(r),r}}const di=n=>(t,e=Fe)=>{(!Nr||n==="sp")&&ha(n,(...i)=>t(...i),e)},jm=di("bm"),fa=di("m"),qm=di("bu"),Ym=di("u"),da=di("bum"),gd=di("um"),$m=di("sp"),Km=di("rtg"),Zm=di("rtc");function Jm(n,t=Fe){ha("ec",n,t)}const Qm="components";function tg(n,t){return ng(Qm,n,!0,t)||n}const eg=Symbol.for("v-ndc");function ng(n,t,e=!0,i=!1){const s=an||Fe;if(s){const r=s.type;{const a=Gg(r,!1);if(a&&(a===t||a===Ye(t)||a===ra(Ye(t))))return r}const o=yu(s[n]||r[n],t)||yu(s.appContext[n],t);return!o&&i?r:o}}function yu(n,t){return n&&(n[t]||n[Ye(t)]||n[ra(Ye(t))])}function Ir(n,t,e,i){let s;const r=e,o=Ht(n);if(o||xe(n)){const a=o&&$i(n);let l=!1,c=!1;a&&(l=!gn(n),c=fi(n),n=la(n)),s=new Array(n.length);for(let u=0,h=n.length;u<h;u++)s[u]=t(l?c?Bs(Rn(n[u])):Rn(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=t(a+1,a,void 0,r)}else if(ue(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>t(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=t(n[u],u,l,r)}}else s=[];return s}const Sl=n=>n?Nd(n)?ga(n):Sl(n.parent):null,Ar=Ie(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Sl(n.parent),$root:n=>Sl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>vd(n),$forceUpdate:n=>n.f||(n.f=()=>{Uc(n.update)}),$nextTick:n=>n.n||(n.n=Hs.bind(n.proxy)),$watch:n=>Fm.bind(n)}),Ca=(n,t)=>n!==fe&&!n.__isScriptSetup&&ae(n,t),ig={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(Ca(i,t))return o[t]=1,i[t];if(s!==fe&&ae(s,t))return o[t]=2,s[t];if(ae(r,t))return o[t]=3,r[t];if(e!==fe&&ae(e,t))return o[t]=4,e[t];El&&(o[t]=0)}}const c=Ar[t];let u,h;if(c)return t==="$attrs"&&Oe(n.attrs,"get",""),c(n);if((u=a.__cssModules)&&(u=u[t]))return u;if(e!==fe&&ae(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,ae(h,t))return h[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return Ca(s,t)?(s[t]=e,!0):i!==fe&&ae(i,t)?(i[t]=e,!0):ae(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(e[a]||n!==fe&&a[0]!=="$"&&ae(n,a)||Ca(t,a)||ae(r,a)||ae(i,a)||ae(Ar,a)||ae(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ae(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function Su(n){return Ht(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let El=!0;function sg(n){const t=vd(n),e=n.proxy,i=n.ctx;El=!1,t.beforeCreate&&Eu(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:g,activated:_,deactivated:m,beforeDestroy:d,beforeUnmount:S,destroyed:A,unmounted:M,render:k,renderTracked:L,renderTriggered:P,errorCaptured:N,serverPrefetch:w,expose:E,inheritAttrs:D,components:U,directives:z,filters:nt}=t;if(c&&rg(c,i,null),o)for(const it in o){const Y=o[it];Xt(Y)&&(i[it]=Y.bind(e))}if(s){const it=s.call(e,e);ue(it)&&(n.data=ca(it))}if(El=!0,r)for(const it in r){const Y=r[it],gt=Xt(Y)?Y.bind(e,e):Xt(Y.get)?Y.get.bind(e,e):Fn,yt=!Xt(Y)&&Xt(Y.set)?Y.set.bind(e):Fn,Ct=le({get:gt,set:yt});Object.defineProperty(i,it,{enumerable:!0,configurable:!0,get:()=>Ct.value,set:Ut=>Ct.value=Ut})}if(a)for(const it in a)_d(a[it],i,e,it);if(l){const it=Xt(l)?l.call(e):l;Reflect.ownKeys(it).forEach(Y=>{Po(Y,it[Y])})}u&&Eu(u,n,"c");function et(it,Y){Ht(Y)?Y.forEach(gt=>it(gt.bind(e))):Y&&it(Y.bind(e))}if(et(jm,h),et(fa,f),et(qm,p),et(Ym,g),et(Gm,_),et(Wm,m),et(Jm,N),et(Zm,L),et(Km,P),et(da,S),et(gd,M),et($m,w),Ht(E))if(E.length){const it=n.exposed||(n.exposed={});E.forEach(Y=>{Object.defineProperty(it,Y,{get:()=>e[Y],set:gt=>e[Y]=gt,enumerable:!0})})}else n.exposed||(n.exposed={});k&&n.render===Fn&&(n.render=k),D!=null&&(n.inheritAttrs=D),U&&(n.components=U),z&&(n.directives=z),w&&dd(n)}function rg(n,t,e=Fn){Ht(n)&&(n=bl(n));for(const i in n){const s=n[i];let r;ue(s)?"default"in s?r=zn(s.from||i,s.default,!0):r=zn(s.from||i):r=zn(s),ze(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function Eu(n,t,e){Vn(Ht(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function _d(n,t,e,i){let s=i.includes(".")?hd(e,i):()=>e[i];if(xe(n)){const r=t[n];Xt(r)&&Hn(s,r)}else if(Xt(n))Hn(s,n.bind(e));else if(ue(n))if(Ht(n))n.forEach(r=>_d(r,t,e,i));else{const r=Xt(n.handler)?n.handler.bind(e):t[n.handler];Xt(r)&&Hn(s,r,n)}}function vd(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>Xo(l,c,o,!0)),Xo(l,t,o)),ue(t)&&r.set(t,l),l}function Xo(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&Xo(n,r,e,!0),s&&s.forEach(o=>Xo(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=og[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const og={data:bu,props:Tu,emits:Tu,methods:_r,computed:_r,beforeCreate:ke,created:ke,beforeMount:ke,mounted:ke,beforeUpdate:ke,updated:ke,beforeDestroy:ke,beforeUnmount:ke,destroyed:ke,unmounted:ke,activated:ke,deactivated:ke,errorCaptured:ke,serverPrefetch:ke,components:_r,directives:_r,watch:lg,provide:bu,inject:ag};function bu(n,t){return t?n?function(){return Ie(Xt(n)?n.call(this,this):n,Xt(t)?t.call(this,this):t)}:t:n}function ag(n,t){return _r(bl(n),bl(t))}function bl(n){if(Ht(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function ke(n,t){return n?[...new Set([].concat(n,t))]:t}function _r(n,t){return n?Ie(Object.create(null),n,t):t}function Tu(n,t){return n?Ht(n)&&Ht(t)?[...new Set([...n,...t])]:Ie(Object.create(null),Su(n),Su(t??{})):t}function lg(n,t){if(!n)return t;if(!t)return n;const e=Ie(Object.create(null),n);for(const i in t)e[i]=ke(n[i],t[i]);return e}function xd(){return{app:null,config:{isNativeTag:If,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let cg=0;function ug(n,t){return function(i,s=null){Xt(i)||(i=Ie({},i)),s!=null&&!ue(s)&&(s=null);const r=xd(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:cg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Xg,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&Xt(u.install)?(o.add(u),u.install(c,...h)):Xt(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||tn(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,ga(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Vn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=Ds;Ds=c;try{return u()}finally{Ds=h}}};return c}}let Ds=null;const hg=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${Ye(t)}Modifiers`]||n[`${ts(t)}Modifiers`];function fg(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||fe;let s=e;const r=t.startsWith("update:"),o=r&&hg(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>xe(u)?u.trim():u)),o.number&&(s=e.map($p)));let a,l=i[a=Ea(t)]||i[a=Ea(Ye(t))];!l&&r&&(l=i[a=Ea(ts(t))]),l&&Vn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Vn(c,n,6,s)}}const dg=new WeakMap;function Md(n,t,e=!1){const i=e?dg:t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Xt(n)){const l=c=>{const u=Md(c,t,!0);u&&(a=!0,Ie(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ue(n)&&i.set(n,null),null):(Ht(r)?r.forEach(l=>o[l]=null):Ie(o,r),ue(n)&&i.set(n,o),o)}function pa(n,t){return!n||!na(t)?!1:(t=t.slice(2).replace(/Once$/,""),ae(n,t[0].toLowerCase()+t.slice(1))||ae(n,ts(t))||ae(n,t))}function Au(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:g,inheritAttrs:_}=n,m=Go(n);let d,S;try{if(e.shapeFlag&4){const M=s||i,k=M;d=Un(c.call(k,M,u,h,p,f,g)),S=a}else{const M=t;d=Un(M.length>1?M(h,{attrs:a,slots:o,emit:l}):M(h,null)),S=t.props?a:pg(a)}}catch(M){wr.length=0,ua(M,n,1),d=tn(Di)}let A=d;if(S&&_!==!1){const M=Object.keys(S),{shapeFlag:k}=A;M.length&&k&7&&(r&&M.some(ia)&&(S=mg(S,r)),A=ks(A,S,!1,!0))}return e.dirs&&(A=ks(A,null,!1,!0),A.dirs=A.dirs?A.dirs.concat(e.dirs):e.dirs),e.transition&&Nc(A,e.transition),d=A,Go(m),d}const pg=n=>{let t;for(const e in n)(e==="class"||e==="style"||na(e))&&((t||(t={}))[e]=n[e]);return t},mg=(n,t)=>{const e={};for(const i in n)(!ia(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function gg(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?wu(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(yd(o,i,f)&&!pa(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?wu(i,o,c):!0:!!o;return!1}function wu(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(yd(t,n,r)&&!pa(e,r))return!0}return!1}function yd(n,t,e){const i=n[e],s=t[e];return e==="style"&&ue(i)&&ue(s)?!Ac(i,s):i!==s}function _g({vnode:n,parent:t,suspense:e},i){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===n&&(s.suspense.vnode.el=s.el=i,n=s),s===n)(n=t.vnode).el=i,t=t.parent;else break}e&&e.activeBranch===n&&(e.vnode.el=i)}const Sd={},Ed=()=>Object.create(Sd),bd=n=>Object.getPrototypeOf(n)===Sd;function vg(n,t,e,i=!1){const s={},r=Ed();n.propsDefaults=Object.create(null),Td(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:nd(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function xg(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=oe(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(pa(n.emitsOptions,f))continue;const p=t[f];if(l)if(ae(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const g=Ye(f);s[g]=Tl(l,a,g,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{Td(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!ae(t,h)&&((u=ts(h))===h||!ae(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=Tl(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!ae(t,h))&&(delete r[h],c=!0)}c&&ii(n.attrs,"set","")}function Td(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(yr(l))continue;const c=t[l];let u;s&&ae(s,u=Ye(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:pa(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=oe(e),c=a||fe;for(let u=0;u<r.length;u++){const h=r[u];e[h]=Tl(s,l,h,c[h],n,!ae(c,h))}}return o}function Tl(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ae(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Xt(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Vr(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ts(e))&&(i=!0))}return i}const Mg=new WeakMap;function Ad(n,t,e=!1){const i=e?Mg:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Xt(n)){const u=h=>{l=!0;const[f,p]=Ad(h,t,!0);Ie(o,f),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ue(n)&&i.set(n,Rs),Rs;if(Ht(r))for(let u=0;u<r.length;u++){const h=Ye(r[u]);Ru(h)&&(o[h]=fe)}else if(r)for(const u in r){const h=Ye(u);if(Ru(h)){const f=r[u],p=o[h]=Ht(f)||Xt(f)?{type:f}:Ie({},f),g=p.type;let _=!1,m=!0;if(Ht(g))for(let d=0;d<g.length;++d){const S=g[d],A=Xt(S)&&S.name;if(A==="Boolean"){_=!0;break}else A==="String"&&(m=!1)}else _=Xt(g)&&g.name==="Boolean";p[0]=_,p[1]=m,(_||ae(p,"default"))&&a.push(h)}}const c=[o,a];return ue(n)&&i.set(n,c),c}function Ru(n){return n[0]!=="$"&&!yr(n)}const Oc=n=>n==="_"||n==="_ctx"||n==="$stable",Fc=n=>Ht(n)?n.map(Un):[Un(n)],yg=(n,t,e)=>{if(t._n)return t;const i=Im((...s)=>Fc(t(...s)),e);return i._c=!1,i},wd=(n,t,e)=>{const i=n._ctx;for(const s in n){if(Oc(s))continue;const r=n[s];if(Xt(r))t[s]=yg(s,r,i);else if(r!=null){const o=Fc(r);t[s]=()=>o}}},Rd=(n,t)=>{const e=Fc(t);n.slots.default=()=>e},Cd=(n,t,e)=>{for(const i in t)(e||!Oc(i))&&(n[i]=t[i])},Sg=(n,t,e)=>{const i=n.slots=Ed();if(n.vnode.shapeFlag&32){const s=t._;s?(Cd(i,t,e),e&&Bf(i,"_",s,!0)):wd(t,i)}else t&&Rd(n,t)},Eg=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=fe;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Cd(s,t,e):(r=!t.$stable,wd(t,s)),o=t}else t&&(Rd(n,t),o={default:1});if(r)for(const a in s)!Oc(a)&&o[a]==null&&delete s[a]},Ge=Rg;function bg(n){return Tg(n)}function Tg(n,t){const e=oa();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=Fn,insertStaticContent:g}=n,_=(T,C,y,st=null,J=null,I=null,H=void 0,Z=null,j=!!C.dynamicChildren)=>{if(T===C)return;T&&!or(T,C)&&(st=O(T),Ut(T,J,I,!0),T=null),C.patchFlag===-2&&(j=!1,C.dynamicChildren=null);const{type:x,ref:v,shapeFlag:R}=C;switch(x){case ma:m(T,C,y,st);break;case Di:d(T,C,y,st);break;case Do:T==null&&S(C,y,st,H);break;case je:U(T,C,y,st,J,I,H,Z,j);break;default:R&1?k(T,C,y,st,J,I,H,Z,j):R&6?z(T,C,y,st,J,I,H,Z,j):(R&64||R&128)&&x.process(T,C,y,st,J,I,H,Z,j,lt)}v!=null&&J?br(v,T&&T.ref,I,C||T,!C):v==null&&T&&T.ref!=null&&br(T.ref,null,I,T,!0)},m=(T,C,y,st)=>{if(T==null)i(C.el=a(C.children),y,st);else{const J=C.el=T.el;C.children!==T.children&&c(J,C.children)}},d=(T,C,y,st)=>{T==null?i(C.el=l(C.children||""),y,st):C.el=T.el},S=(T,C,y,st)=>{[T.el,T.anchor]=g(T.children,C,y,st,T.el,T.anchor)},A=({el:T,anchor:C},y,st)=>{let J;for(;T&&T!==C;)J=f(T),i(T,y,st),T=J;i(C,y,st)},M=({el:T,anchor:C})=>{let y;for(;T&&T!==C;)y=f(T),s(T),T=y;s(C)},k=(T,C,y,st,J,I,H,Z,j)=>{if(C.type==="svg"?H="svg":C.type==="math"&&(H="mathml"),T==null)L(C,y,st,J,I,H,Z,j);else{const x=T.el&&T.el._isVueCE?T.el:null;try{x&&x._beginPatch(),w(T,C,J,I,H,Z,j)}finally{x&&x._endPatch()}}},L=(T,C,y,st,J,I,H,Z)=>{let j,x;const{props:v,shapeFlag:R,transition:F,dirs:K}=T;if(j=T.el=o(T.type,I,v&&v.is,v),R&8?u(j,T.children):R&16&&N(T.children,j,null,st,J,Pa(T,I),H,Z),K&&Ii(T,null,st,"created"),P(j,T,T.scopeId,H,st),v){for(const dt in v)dt!=="value"&&!yr(dt)&&r(j,dt,null,v[dt],I,st);"value"in v&&r(j,"value",null,v.value,I),(x=v.onVnodeBeforeMount)&&Dn(x,st,T)}K&&Ii(T,null,st,"beforeMount");const q=Ag(J,F);q&&F.beforeEnter(j),i(j,C,y),((x=v&&v.onVnodeMounted)||q||K)&&Ge(()=>{try{x&&Dn(x,st,T),q&&F.enter(j),K&&Ii(T,null,st,"mounted")}finally{}},J)},P=(T,C,y,st,J)=>{if(y&&p(T,y),st)for(let I=0;I<st.length;I++)p(T,st[I]);if(J){let I=J.subTree;if(C===I||Ld(I.type)&&(I.ssContent===C||I.ssFallback===C)){const H=J.vnode;P(T,H,H.scopeId,H.slotScopeIds,J.parent)}}},N=(T,C,y,st,J,I,H,Z,j=0)=>{for(let x=j;x<T.length;x++){const v=T[x]=Z?ni(T[x]):Un(T[x]);_(null,v,C,y,st,J,I,H,Z)}},w=(T,C,y,st,J,I,H)=>{const Z=C.el=T.el;let{patchFlag:j,dynamicChildren:x,dirs:v}=C;j|=T.patchFlag&16;const R=T.props||fe,F=C.props||fe;let K;if(y&&Ui(y,!1),(K=F.onVnodeBeforeUpdate)&&Dn(K,y,C,T),v&&Ii(C,T,y,"beforeUpdate"),y&&Ui(y,!0),(R.innerHTML&&F.innerHTML==null||R.textContent&&F.textContent==null)&&u(Z,""),x?E(T.dynamicChildren,x,Z,y,st,Pa(C,J),I):H||Y(T,C,Z,null,y,st,Pa(C,J),I,!1),j>0){if(j&16)D(Z,R,F,y,J);else if(j&2&&R.class!==F.class&&r(Z,"class",null,F.class,J),j&4&&r(Z,"style",R.style,F.style,J),j&8){const q=C.dynamicProps;for(let dt=0;dt<q.length;dt++){const ft=q[dt],ct=R[ft],St=F[ft];(St!==ct||ft==="value")&&r(Z,ft,ct,St,J,y)}}j&1&&T.children!==C.children&&u(Z,C.children)}else!H&&x==null&&D(Z,R,F,y,J);((K=F.onVnodeUpdated)||v)&&Ge(()=>{K&&Dn(K,y,C,T),v&&Ii(C,T,y,"updated")},st)},E=(T,C,y,st,J,I,H)=>{for(let Z=0;Z<C.length;Z++){const j=T[Z],x=C[Z],v=j.el&&(j.type===je||!or(j,x)||j.shapeFlag&198)?h(j.el):y;_(j,x,v,null,st,J,I,H,!0)}},D=(T,C,y,st,J)=>{if(C!==y){if(C!==fe)for(const I in C)!yr(I)&&!(I in y)&&r(T,I,C[I],null,J,st);for(const I in y){if(yr(I))continue;const H=y[I],Z=C[I];H!==Z&&I!=="value"&&r(T,I,Z,H,J,st)}"value"in y&&r(T,"value",C.value,y.value,J)}},U=(T,C,y,st,J,I,H,Z,j)=>{const x=C.el=T?T.el:a(""),v=C.anchor=T?T.anchor:a("");let{patchFlag:R,dynamicChildren:F,slotScopeIds:K}=C;K&&(Z=Z?Z.concat(K):K),T==null?(i(x,y,st),i(v,y,st),N(C.children||[],y,v,J,I,H,Z,j)):R>0&&R&64&&F&&T.dynamicChildren&&T.dynamicChildren.length===F.length?(E(T.dynamicChildren,F,y,J,I,H,Z),(C.key!=null||J&&C===J.subTree)&&Bc(T,C,!0)):Y(T,C,y,v,J,I,H,Z,j)},z=(T,C,y,st,J,I,H,Z,j)=>{C.slotScopeIds=Z,T==null?C.shapeFlag&512?J.ctx.activate(C,y,st,H,j):nt(C,y,st,J,I,H,j):ot(T,C,j)},nt=(T,C,y,st,J,I,H)=>{const Z=T.component=Fg(T,st,J);if(pd(T)&&(Z.ctx.renderer=lt),zg(Z,!1,H),Z.asyncDep){if(J&&J.registerDep(Z,et,H),!T.el){const j=Z.subTree=tn(Di);d(null,j,C,y),T.placeholder=j.el}}else et(Z,T,C,y,J,I,H)},ot=(T,C,y)=>{const st=C.component=T.component;if(gg(T,C,y))if(st.asyncDep&&!st.asyncResolved){it(st,C,y);return}else st.next=C,st.update();else C.el=T.el,st.vnode=C},et=(T,C,y,st,J,I,H)=>{const Z=()=>{if(T.isMounted){let{next:R,bu:F,u:K,parent:q,vnode:dt}=T;{const Et=Pd(T);if(Et){R&&(R.el=dt.el,it(T,R,H)),Et.asyncDep.then(()=>{Ge(()=>{T.isUnmounted||x()},J)});return}}let ft=R,ct;Ui(T,!1),R?(R.el=dt.el,it(T,R,H)):R=dt,F&&ba(F),(ct=R.props&&R.props.onVnodeBeforeUpdate)&&Dn(ct,q,R,dt),Ui(T,!0);const St=Au(T),ut=T.subTree;T.subTree=St,_(ut,St,h(ut.el),O(ut),T,J,I),R.el=St.el,ft===null&&_g(T,St.el),K&&Ge(K,J),(ct=R.props&&R.props.onVnodeUpdated)&&Ge(()=>Dn(ct,q,R,dt),J)}else{let R;const{el:F,props:K}=C,{bm:q,m:dt,parent:ft,root:ct,type:St}=T,ut=Tr(C);Ui(T,!1),q&&ba(q),!ut&&(R=K&&K.onVnodeBeforeMount)&&Dn(R,ft,C),Ui(T,!0);{ct.ce&&ct.ce._hasShadowRoot()&&ct.ce._injectChildStyle(St,T.parent?T.parent.type:void 0);const Et=T.subTree=Au(T);_(null,Et,y,st,T,J,I),C.el=Et.el}if(dt&&Ge(dt,J),!ut&&(R=K&&K.onVnodeMounted)){const Et=C;Ge(()=>Dn(R,ft,Et),J)}(C.shapeFlag&256||ft&&Tr(ft.vnode)&&ft.vnode.shapeFlag&256)&&T.a&&Ge(T.a,J),T.isMounted=!0,C=y=st=null}};T.scope.on();const j=T.effect=new Vf(Z);T.scope.off();const x=T.update=j.run.bind(j),v=T.job=j.runIfDirty.bind(j);v.i=T,v.id=T.uid,j.scheduler=()=>Uc(v),Ui(T,!0),x()},it=(T,C,y)=>{C.component=T;const st=T.vnode.props;T.vnode=C,T.next=null,xg(T,C.props,st,y),Eg(T,C.children,y),ui(),mu(T),hi()},Y=(T,C,y,st,J,I,H,Z,j=!1)=>{const x=T&&T.children,v=T?T.shapeFlag:0,R=C.children,{patchFlag:F,shapeFlag:K}=C;if(F>0){if(F&128){yt(x,R,y,st,J,I,H,Z,j);return}else if(F&256){gt(x,R,y,st,J,I,H,Z,j);return}}K&8?(v&16&&At(x,J,I),R!==x&&u(y,R)):v&16?K&16?yt(x,R,y,st,J,I,H,Z,j):At(x,J,I,!0):(v&8&&u(y,""),K&16&&N(R,y,st,J,I,H,Z,j))},gt=(T,C,y,st,J,I,H,Z,j)=>{T=T||Rs,C=C||Rs;const x=T.length,v=C.length,R=Math.min(x,v);let F;for(F=0;F<R;F++){const K=C[F]=j?ni(C[F]):Un(C[F]);_(T[F],K,y,null,J,I,H,Z,j)}x>v?At(T,J,I,!0,!1,R):N(C,y,st,J,I,H,Z,j,R)},yt=(T,C,y,st,J,I,H,Z,j)=>{let x=0;const v=C.length;let R=T.length-1,F=v-1;for(;x<=R&&x<=F;){const K=T[x],q=C[x]=j?ni(C[x]):Un(C[x]);if(or(K,q))_(K,q,y,null,J,I,H,Z,j);else break;x++}for(;x<=R&&x<=F;){const K=T[R],q=C[F]=j?ni(C[F]):Un(C[F]);if(or(K,q))_(K,q,y,null,J,I,H,Z,j);else break;R--,F--}if(x>R){if(x<=F){const K=F+1,q=K<v?C[K].el:st;for(;x<=F;)_(null,C[x]=j?ni(C[x]):Un(C[x]),y,q,J,I,H,Z,j),x++}}else if(x>F)for(;x<=R;)Ut(T[x],J,I,!0),x++;else{const K=x,q=x,dt=new Map;for(x=q;x<=F;x++){const xt=C[x]=j?ni(C[x]):Un(C[x]);xt.key!=null&&dt.set(xt.key,x)}let ft,ct=0;const St=F-q+1;let ut=!1,Et=0;const Pt=new Array(St);for(x=0;x<St;x++)Pt[x]=0;for(x=K;x<=R;x++){const xt=T[x];if(ct>=St){Ut(xt,J,I,!0);continue}let Bt;if(xt.key!=null)Bt=dt.get(xt.key);else for(ft=q;ft<=F;ft++)if(Pt[ft-q]===0&&or(xt,C[ft])){Bt=ft;break}Bt===void 0?Ut(xt,J,I,!0):(Pt[Bt-q]=x+1,Bt>=Et?Et=Bt:ut=!0,_(xt,C[Bt],y,null,J,I,H,Z,j),ct++)}const Nt=ut?wg(Pt):Rs;for(ft=Nt.length-1,x=St-1;x>=0;x--){const xt=q+x,Bt=C[xt],zt=C[xt+1],te=xt+1<v?zt.el||Dd(zt):st;Pt[x]===0?_(null,Bt,y,te,J,I,H,Z,j):ut&&(ft<0||x!==Nt[ft]?Ct(Bt,y,te,2):ft--)}}},Ct=(T,C,y,st,J=null)=>{const{el:I,type:H,transition:Z,children:j,shapeFlag:x}=T;if(x&6){Ct(T.component.subTree,C,y,st);return}if(x&128){T.suspense.move(C,y,st);return}if(x&64){H.move(T,C,y,lt);return}if(H===je){i(I,C,y);for(let R=0;R<j.length;R++)Ct(j[R],C,y,st);i(T.anchor,C,y);return}if(H===Do){A(T,C,y);return}if(st!==2&&x&1&&Z)if(st===0)Z.beforeEnter(I),i(I,C,y),Ge(()=>Z.enter(I),J);else{const{leave:R,delayLeave:F,afterLeave:K}=Z,q=()=>{T.ctx.isUnmounted?s(I):i(I,C,y)},dt=()=>{I._isLeaving&&I[Vm](!0),R(I,()=>{q(),K&&K()})};F?F(I,q,dt):dt()}else i(I,C,y)},Ut=(T,C,y,st=!1,J=!1)=>{const{type:I,props:H,ref:Z,children:j,dynamicChildren:x,shapeFlag:v,patchFlag:R,dirs:F,cacheIndex:K,memo:q}=T;if(R===-2&&(J=!1),Z!=null&&(ui(),br(Z,null,y,T,!0),hi()),K!=null&&(C.renderCache[K]=void 0),v&256){C.ctx.deactivate(T);return}const dt=v&1&&F,ft=!Tr(T);let ct;if(ft&&(ct=H&&H.onVnodeBeforeUnmount)&&Dn(ct,C,T),v&6)mt(T.component,y,st);else{if(v&128){T.suspense.unmount(y,st);return}dt&&Ii(T,null,C,"beforeUnmount"),v&64?T.type.remove(T,C,y,lt,st):x&&!x.hasOnce&&(I!==je||R>0&&R&64)?At(x,C,y,!1,!0):(I===je&&R&384||!J&&v&16)&&At(j,C,y),st&&Kt(T)}const St=q!=null&&K==null;(ft&&(ct=H&&H.onVnodeUnmounted)||dt||St)&&Ge(()=>{ct&&Dn(ct,C,T),dt&&Ii(T,null,C,"unmounted"),St&&(T.el=null)},y)},Kt=T=>{const{type:C,el:y,anchor:st,transition:J}=T;if(C===je){at(y,st);return}if(C===Do){M(T);return}const I=()=>{s(y),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(T.shapeFlag&1&&J&&!J.persisted){const{leave:H,delayLeave:Z}=J,j=()=>H(y,I);Z?Z(T.el,I,j):j()}else I()},at=(T,C)=>{let y;for(;T!==C;)y=f(T),s(T),T=y;s(C)},mt=(T,C,y)=>{const{bum:st,scope:J,job:I,subTree:H,um:Z,m:j,a:x}=T;Cu(j),Cu(x),st&&ba(st),J.stop(),I&&(I.flags|=8,Ut(H,T,C,y)),Z&&Ge(Z,C),Ge(()=>{T.isUnmounted=!0},C)},At=(T,C,y,st=!1,J=!1,I=0)=>{for(let H=I;H<T.length;H++)Ut(T[H],C,y,st,J)},O=T=>{if(T.shapeFlag&6)return O(T.component.subTree);if(T.shapeFlag&128)return T.suspense.next();const C=f(T.anchor||T.el),y=C&&C[fd];return y?f(y):C};let $=!1;const V=(T,C,y)=>{let st;T==null?C._vnode&&(Ut(C._vnode,null,null,!0),st=C._vnode.component):_(C._vnode||null,T,C,null,null,null,y),C._vnode=T,$||($=!0,mu(st),ad(),$=!1)},lt={p:_,um:Ut,m:Ct,r:Kt,mt:nt,mc:N,pc:Y,pbc:E,n:O,o:n};return{render:V,hydrate:void 0,createApp:ug(V)}}function Pa({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function Ui({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function Ag(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function Bc(n,t,e=!1){const i=n.children,s=t.children;if(Ht(i)&&Ht(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ni(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&Bc(o,a)),a.type===ma&&(a.patchFlag===-1&&(a=s[r]=ni(a)),a.el=o.el),a.type===Di&&!a.el&&(a.el=o.el)}}function wg(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Pd(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Pd(t)}function Cu(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}function Dd(n){if(n.placeholder)return n.placeholder;const t=n.component;return t?Dd(t.subTree):null}const Ld=n=>n.__isSuspense;function Rg(n,t){t&&t.pendingBranch?Ht(n)?t.effects.push(...n):t.effects.push(n):Lm(n)}const je=Symbol.for("v-fgt"),ma=Symbol.for("v-txt"),Di=Symbol.for("v-cmt"),Do=Symbol.for("v-stc"),wr=[];let ln=null;function Vt(n=!1){wr.push(ln=n?null:[])}function Cg(){wr.pop(),ln=wr[wr.length-1]||null}let Ur=1;function jo(n,t=!1){Ur+=n,n<0&&ln&&t&&(ln.hasOnce=!0)}function Id(n){return n.dynamicChildren=Ur>0?ln||Rs:null,Cg(),Ur>0&&ln&&ln.push(n),n}function $t(n,t,e,i,s,r){return Id(ht(n,t,e,i,s,r,!0))}function qo(n,t,e,i,s){return Id(tn(n,t,e,i,s,!0))}function Yo(n){return n?n.__v_isVNode===!0:!1}function or(n,t){return n.type===t.type&&n.key===t.key}const Ud=({key:n})=>n??null,Lo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?xe(n)||ze(n)||Xt(n)?{i:an,r:n,k:t,f:!!e}:n:null);function ht(n,t=null,e=null,i=0,s=null,r=n===je?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&Ud(t),ref:t&&Lo(t),scopeId:cd,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:an};return a?(zc(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=xe(e)?8:16),Ur>0&&!o&&ln&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&ln.push(l),l}const tn=Pg;function Pg(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===eg)&&(n=Di),Yo(n)){const a=ks(n,t,!0);return e&&zc(a,e),Ur>0&&!r&&ln&&(a.shapeFlag&6?ln[ln.indexOf(n)]=a:ln.push(a)),a.patchFlag=-2,a}if(Wg(n)&&(n=n.__vccOpts),t){t=Dg(t);let{class:a,style:l}=t;a&&!xe(a)&&(t.class=Fs(a)),ue(l)&&(Ic(l)&&!Ht(l)&&(l=Ie({},l)),t.style=aa(l))}const o=xe(n)?1:Ld(n)?128:Bm(n)?64:ue(n)?4:Xt(n)?2:0;return ht(n,t,e,i,s,o,r,!0)}function Dg(n){return n?Ic(n)||bd(n)?Ie({},n):n:null}function ks(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?Ug(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Ud(c),ref:t&&t.ref?e&&r?Ht(r)?r.concat(Lo(t)):[r,Lo(t)]:Lo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==je?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ks(n.ssContent),ssFallback:n.ssFallback&&ks(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Nc(u,l.clone(u)),u}function Lg(n=" ",t=0){return tn(ma,null,n,t)}function Ig(n,t){const e=tn(Do,null,n);return e.staticCount=t,e}function dn(n="",t=!1){return t?(Vt(),qo(Di,null,n)):tn(Di,null,n)}function Un(n){return n==null||typeof n=="boolean"?tn(Di):Ht(n)?tn(je,null,n.slice()):Yo(n)?ni(n):tn(ma,null,String(n))}function ni(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ks(n)}function zc(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Ht(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),zc(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!bd(t)?t._ctx=an:s===3&&an&&(an.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else Xt(t)?(t={default:t,_ctx:an},e=32):(t=String(t),i&64?(e=16,t=[Lg(t)]):e=8);n.children=t,n.shapeFlag|=e}function Ug(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Fs([t.class,i.class]));else if(s==="style")t.style=aa([t.style,i.style]);else if(na(s)){const r=t[s],o=i[s];o&&r!==o&&!(Ht(r)&&r.includes(o))?t[s]=r?[].concat(r,o):o:o==null&&r==null&&!ia(s)&&(t[s]=o)}else s!==""&&(t[s]=i[s])}return t}function Dn(n,t,e,i=null){Vn(n,t,7,[e,i])}const Ng=xd();let Og=0;function Fg(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||Ng,r={uid:Og++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new im(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Ad(i,s),emitsOptions:Md(i,s),emit:null,emitted:null,propsDefaults:fe,inheritAttrs:i.inheritAttrs,ctx:fe,data:fe,props:fe,attrs:fe,slots:fe,refs:fe,setupState:fe,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=fg.bind(null,r),n.ce&&n.ce(r),r}let Fe=null;const Bg=()=>Fe||an;let $o,Al;{const n=oa(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};$o=t("__VUE_INSTANCE_SETTERS__",e=>Fe=e),Al=t("__VUE_SSR_SETTERS__",e=>Nr=e)}const Vr=n=>{const t=Fe;return $o(n),n.scope.on(),()=>{n.scope.off(),$o(t)}},Pu=()=>{Fe&&Fe.scope.off(),$o(null)};function Nd(n){return n.vnode.shapeFlag&4}let Nr=!1;function zg(n,t=!1,e=!1){t&&Al(t);const{props:i,children:s}=n.vnode,r=Nd(n);vg(n,i,r,t),Sg(n,s,e||t);const o=r?Hg(n,t):void 0;return t&&Al(!1),o}function Hg(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,ig);const{setup:i}=e;if(i){ui();const s=n.setupContext=i.length>1?Vg(n):null,r=Vr(n),o=kr(i,n,0,[n.props,s]),a=Nf(o);if(hi(),r(),(a||n.sp)&&!Tr(n)&&dd(n),a){if(o.then(Pu,Pu),t)return o.then(l=>{Du(n,l)}).catch(l=>{ua(l,n,0)});n.asyncDep=o}else Du(n,o)}else Od(n)}function Du(n,t,e){Xt(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ue(t)&&(n.setupState=sd(t)),Od(n)}function Od(n,t,e){const i=n.type;n.render||(n.render=i.render||Fn);{const s=Vr(n);ui();try{sg(n)}finally{hi(),s()}}}const kg={get(n,t){return Oe(n,"get",""),n[t]}};function Vg(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,kg),slots:n.slots,emit:n.emit,expose:t}}function ga(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(sd(Em(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in Ar)return Ar[e](n)},has(t,e){return e in t||e in Ar}})):n.proxy}function Gg(n,t=!0){return Xt(n)?n.displayName||n.name:n.name||t&&n.__name}function Wg(n){return Xt(n)&&"__vccOpts"in n}const le=(n,t)=>wm(n,t,Nr);function Fd(n,t,e){try{jo(-1);const i=arguments.length;return i===2?ue(t)&&!Ht(t)?Yo(t)?tn(n,null,[t]):tn(n,t):tn(n,null,t):(i>3?e=Array.prototype.slice.call(arguments,2):i===3&&Yo(e)&&(e=[e]),tn(n,t,e))}finally{jo(1)}}const Xg="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let wl;const Lu=typeof window<"u"&&window.trustedTypes;if(Lu)try{wl=Lu.createPolicy("vue",{createHTML:n=>n})}catch{}const Bd=wl?n=>wl.createHTML(n):n=>n,jg="http://www.w3.org/2000/svg",qg="http://www.w3.org/1998/Math/MathML",ei=typeof document<"u"?document:null,Iu=ei&&ei.createElement("template"),Yg={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?ei.createElementNS(jg,n):t==="mathml"?ei.createElementNS(qg,n):e?ei.createElement(n,{is:e}):ei.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>ei.createTextNode(n),createComment:n=>ei.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ei.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{Iu.innerHTML=Bd(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Iu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},$g=Symbol("_vtc");function Kg(n,t,e){const i=n[$g];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const Ko=Symbol("_vod"),zd=Symbol("_vsh"),Zg={name:"show",beforeMount(n,{value:t},{transition:e}){n[Ko]=n.style.display==="none"?"":n.style.display,e&&t?e.beforeEnter(n):ar(n,t)},mounted(n,{value:t},{transition:e}){e&&t&&e.enter(n)},updated(n,{value:t,oldValue:e},{transition:i}){!t!=!e&&(i?t?(i.beforeEnter(n),ar(n,!0),i.enter(n)):i.leave(n,()=>{ar(n,!1)}):ar(n,t))},beforeUnmount(n,{value:t}){ar(n,t)}};function ar(n,t){n.style.display=t?n[Ko]:"none",n[zd]=!t}const Jg=Symbol(""),Qg=/(?:^|;)\s*display\s*:/;function t_(n,t,e){const i=n.style,s=xe(e);let r=!1;if(e&&!s){if(t)if(xe(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&vr(i,a,"")}else for(const o in t)e[o]==null&&vr(i,o,"");for(const o in e){o==="display"&&(r=!0);const a=e[o];a!=null?n_(n,o,!xe(t)&&t?t[o]:void 0,a)||vr(i,o,a):vr(i,o,"")}}else if(s){if(t!==e){const o=i[Jg];o&&(e+=";"+o),i.cssText=e,r=Qg.test(e)}}else t&&n.removeAttribute("style");Ko in n&&(n[Ko]=r?i.display:"",n[zd]&&(i.display="none"))}const Uu=/\s*!important$/;function vr(n,t,e){if(Ht(e))e.forEach(i=>vr(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=e_(n,t);Uu.test(e)?n.setProperty(ts(i),e.replace(Uu,""),"important"):n[i]=e}}const Nu=["Webkit","Moz","ms"],Da={};function e_(n,t){const e=Da[t];if(e)return e;let i=Ye(t);if(i!=="filter"&&i in n)return Da[t]=i;i=ra(i);for(let s=0;s<Nu.length;s++){const r=Nu[s]+i;if(r in n)return Da[t]=r}return t}function n_(n,t,e,i){return n.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&xe(i)&&e===i}const Ou="http://www.w3.org/1999/xlink";function Fu(n,t,e,i,s,r=em(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Ou,t.slice(6,t.length)):n.setAttributeNS(Ou,t,e):e==null||r&&!zf(e)?n.removeAttribute(t):n.setAttribute(t,r?"":kn(e)?String(e):e)}function Bu(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?Bd(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=zf(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function i_(n,t,e,i){n.addEventListener(t,e,i)}function s_(n,t,e,i){n.removeEventListener(t,e,i)}const zu=Symbol("_vei");function r_(n,t,e,i,s=null){const r=n[zu]||(n[zu]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=o_(t);if(i){const c=r[t]=c_(i,s);i_(n,a,c,l)}else o&&(s_(n,a,o,l),r[t]=void 0)}}const Hu=/(?:Once|Passive|Capture)$/;function o_(n){let t;if(Hu.test(n)){t={};let i;for(;i=n.match(Hu);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ts(n.slice(2)),t]}let La=0;const a_=Promise.resolve(),l_=()=>La||(a_.then(()=>La=0),La=Date.now());function c_(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Vn(u_(i,e.value),t,5,[i])};return e.value=n,e.attached=l_(),e}function u_(n,t){if(Ht(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const ku=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,h_=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?Kg(n,i,o):t==="style"?t_(n,e,i):na(t)?ia(t)||r_(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):f_(n,t,i,o))?(Bu(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Fu(n,t,i,o,r,t!=="value")):n._isVueCE&&(d_(n,t)||n._def.__asyncLoader&&(/[A-Z]/.test(t)||!xe(i)))?Bu(n,Ye(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),Fu(n,t,i,o))};function f_(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&ku(t)&&Xt(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&n.tagName==="IFRAME"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return ku(t)&&xe(e)?!1:t in n}function d_(n,t){const e=n._def.props;if(!e)return!1;const i=Ye(t);return Array.isArray(e)?e.some(s=>Ye(s)===i):Object.keys(e).some(s=>Ye(s)===i)}const p_=["ctrl","shift","alt","meta"],m_={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,t)=>p_.some(e=>n[`${e}Key`]&&!t.includes(e))},Io=(n,t)=>{if(!n)return n;const e=n._withMods||(n._withMods={}),i=t.join(".");return e[i]||(e[i]=((s,...r)=>{for(let o=0;o<t.length;o++){const a=m_[t[o]];if(a&&a(s,t))return}return n(s,...r)}))},g_=Ie({patchProp:h_},Yg);let Vu;function __(){return Vu||(Vu=bg(g_))}const v_=((...n)=>{const t=__().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=M_(i);if(!s)return;const r=t._component;!Xt(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,x_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function x_(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function M_(n){return xe(n)?document.querySelector(n):n}const Zs=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},y_={};function S_(n,t){const e=tg("router-view");return Vt(),qo(e)}const E_=Zs(y_,[["render",S_]]);/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ss=typeof document<"u";function Hd(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function b_(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Hd(n.default)}const re=Object.assign;function Ia(n,t){const e={};for(const i in t){const s=t[i];e[i]=Cn(s)?s.map(n):n(s)}return e}const Rr=()=>{},Cn=Array.isArray;function Gu(n,t){const e={};for(const i in n)e[i]=i in t?t[i]:n[i];return e}const kd=/#/g,T_=/&/g,A_=/\//g,w_=/=/g,R_=/\?/g,Vd=/\+/g,C_=/%5B/g,P_=/%5D/g,Gd=/%5E/g,D_=/%60/g,Wd=/%7B/g,L_=/%7C/g,Xd=/%7D/g,I_=/%20/g;function Hc(n){return n==null?"":encodeURI(""+n).replace(L_,"|").replace(C_,"[").replace(P_,"]")}function U_(n){return Hc(n).replace(Wd,"{").replace(Xd,"}").replace(Gd,"^")}function Rl(n){return Hc(n).replace(Vd,"%2B").replace(I_,"+").replace(kd,"%23").replace(T_,"%26").replace(D_,"`").replace(Wd,"{").replace(Xd,"}").replace(Gd,"^")}function N_(n){return Rl(n).replace(w_,"%3D")}function O_(n){return Hc(n).replace(kd,"%23").replace(R_,"%3F")}function F_(n){return O_(n).replace(A_,"%2F")}function Or(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const B_=/\/$/,z_=n=>n.replace(B_,"");function Ua(n,t,e="/"){let i,s={},r="",o="";const a=t.indexOf("#");let l=t.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(i=t.slice(0,l),r=t.slice(l,a>0?a:t.length),s=n(r.slice(1))),a>=0&&(i=i||t.slice(0,a),o=t.slice(a,t.length)),i=G_(i??t,e),{fullPath:i+r+o,path:i,query:s,hash:Or(o)}}function H_(n,t){const e=t.query?n(t.query):"";return t.path+(e&&"?")+e+(t.hash||"")}function Wu(n,t){return!t||!n.toLowerCase().startsWith(t.toLowerCase())?n:n.slice(t.length)||"/"}function k_(n,t,e){const i=t.matched.length-1,s=e.matched.length-1;return i>-1&&i===s&&Vs(t.matched[i],e.matched[s])&&jd(t.params,e.params)&&n(t.query)===n(e.query)&&t.hash===e.hash}function Vs(n,t){return(n.aliasOf||n)===(t.aliasOf||t)}function jd(n,t){if(Object.keys(n).length!==Object.keys(t).length)return!1;for(var e in n)if(!V_(n[e],t[e]))return!1;return!0}function V_(n,t){return Cn(n)?Xu(n,t):Cn(t)?Xu(t,n):(n==null?void 0:n.valueOf())===(t==null?void 0:t.valueOf())}function Xu(n,t){return Cn(t)?n.length===t.length&&n.every((e,i)=>e===t[i]):n.length===1&&n[0]===t}function G_(n,t){if(n.startsWith("/"))return n;if(!n)return t;const e=t.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=e.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return e.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const _i={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Cl=(function(n){return n.pop="pop",n.push="push",n})({}),Na=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function W_(n){if(!n)if(Ss){const t=document.querySelector("base");n=t&&t.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),z_(n)}const X_=/^[^#]+#/;function j_(n,t){return n.replace(X_,"#")+t}function q_(n,t){const e=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:t.behavior,left:i.left-e.left-(t.left||0),top:i.top-e.top-(t.top||0)}}const _a=()=>({left:window.scrollX,top:window.scrollY});function Y_(n){let t;if("el"in n){const e=n.el,i=typeof e=="string"&&e.startsWith("#"),s=typeof e=="string"?i?document.getElementById(e.slice(1)):document.querySelector(e):e;if(!s)return;t=q_(s,n)}else t=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function ju(n,t){return(history.state?history.state.position-t:-1)+n}const Pl=new Map;function $_(n,t){Pl.set(n,t)}function K_(n){const t=Pl.get(n);return Pl.delete(n),t}function Z_(n){return typeof n=="string"||n&&typeof n=="object"}function qd(n){return typeof n=="string"||typeof n=="symbol"}let Me=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const Yd=Symbol("");Me.MATCHER_NOT_FOUND+"",Me.NAVIGATION_GUARD_REDIRECT+"",Me.NAVIGATION_ABORTED+"",Me.NAVIGATION_CANCELLED+"",Me.NAVIGATION_DUPLICATED+"";function Gs(n,t){return re(new Error,{type:n,[Yd]:!0},t)}function Yn(n,t){return n instanceof Error&&Yd in n&&(t==null||!!(n.type&t))}const J_=["params","query","hash"];function Q_(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const t={};for(const e of J_)e in n&&(t[e]=n[e]);return JSON.stringify(t,null,2)}function tv(n){const t={};if(n===""||n==="?")return t;const e=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<e.length;++i){const s=e[i].replace(Vd," "),r=s.indexOf("="),o=Or(r<0?s:s.slice(0,r)),a=r<0?null:Or(s.slice(r+1));if(o in t){let l=t[o];Cn(l)||(l=t[o]=[l]),l.push(a)}else t[o]=a}return t}function qu(n){let t="";for(let e in n){const i=n[e];if(e=N_(e),i==null){i!==void 0&&(t+=(t.length?"&":"")+e);continue}(Cn(i)?i.map(s=>s&&Rl(s)):[i&&Rl(i)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+e,s!=null&&(t+="="+s))})}return t}function ev(n){const t={};for(const e in n){const i=n[e];i!==void 0&&(t[e]=Cn(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return t}const nv=Symbol(""),Yu=Symbol(""),va=Symbol(""),$d=Symbol(""),Dl=Symbol("");function lr(){let n=[];function t(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function e(){n=[]}return{add:t,list:()=>n.slice(),reset:e}}function Ai(n,t,e,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=f=>{f===!1?l(Gs(Me.NAVIGATION_ABORTED,{from:e,to:t})):f instanceof Error?l(f):Z_(f)?l(Gs(Me.NAVIGATION_GUARD_REDIRECT,{from:t,to:f})):(o&&i.enterCallbacks[s]===o&&typeof f=="function"&&o.push(f),a())},u=r(()=>n.call(i&&i.instances[s],t,e,c));let h=Promise.resolve(u);n.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function Oa(n,t,e,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(t!=="beforeRouteEnter"&&!o.instances[a]))if(Hd(l)){const c=(l.__vccOpts||l)[t];c&&r.push(Ai(c,e,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=b_(u)?u.default:u;o.mods[a]=u,o.components[a]=h;const f=(h.__vccOpts||h)[t];return f&&Ai(f,e,i,o,a,s)()}))}}return r}function iv(n,t){const e=[],i=[],s=[],r=Math.max(t.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=t.matched[o];a&&(n.matched.find(c=>Vs(c,a))?i.push(a):e.push(a));const l=n.matched[o];l&&(t.matched.find(c=>Vs(c,l))||s.push(l))}return[e,i,s]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let sv=()=>location.protocol+"//"+location.host;function Kd(n,t){const{pathname:e,search:i,hash:s}=t,r=n.indexOf("#");if(r>-1){let o=s.includes(n.slice(r))?n.slice(r).length:1,a=s.slice(o);return a[0]!=="/"&&(a="/"+a),Wu(a,"")}return Wu(e,n)+i+s}function rv(n,t,e,i){let s=[],r=[],o=null;const a=({state:f})=>{const p=Kd(n,location),g=e.value,_=t.value;let m=0;if(f){if(e.value=p,t.value=f,o&&o===g){o=null;return}m=_?f.position-_.position:0}else i(p);s.forEach(d=>{d(e.value,g,{delta:m,type:Cl.pop,direction:m?m>0?Na.forward:Na.back:Na.unknown})})};function l(){o=e.value}function c(f){s.push(f);const p=()=>{const g=s.indexOf(f);g>-1&&s.splice(g,1)};return r.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(re({},f.state,{scroll:_a()}),"")}}function h(){for(const f of r)f();r=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:h}}function $u(n,t,e,i=!1,s=!1){return{back:n,current:t,forward:e,replaced:i,position:window.history.length,scroll:s?_a():null}}function ov(n){const{history:t,location:e}=window,i={value:Kd(n,e)},s={value:t.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const h=n.indexOf("#"),f=h>-1?(e.host&&document.querySelector("base")?n:n.slice(h))+l:sv()+n+l;try{t[u?"replaceState":"pushState"](c,"",f),s.value=c}catch(p){console.error(p),e[u?"replace":"assign"](f)}}function o(l,c){r(l,re({},t.state,$u(s.value.back,l,s.value.forward,!0),c,{position:s.value.position}),!0),i.value=l}function a(l,c){const u=re({},s.value,t.state,{forward:l,scroll:_a()});r(u.current,u,!0),r(l,re({},$u(i.value,l,null),{position:u.position+1},c),!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function av(n){n=W_(n);const t=ov(n),e=rv(n,t.state,t.location,t.replace);function i(r,o=!0){o||e.pauseListeners(),history.go(r)}const s=re({location:"",base:n,go:i,createHref:j_.bind(null,n)},t,e);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>t.state.value}),s}function lv(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),av(n)}let ji=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var we=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(we||{});const cv={type:ji.Static,value:""},uv=/[a-zA-Z0-9_]/;function hv(n){if(!n)return[[]];if(n==="/")return[[cv]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function t(p){throw new Error(`ERR (${e})/"${c}": ${p}`)}let e=we.Static,i=e;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function h(){c&&(e===we.Static?r.push({type:ji.Static,value:c}):e===we.Param||e===we.ParamRegExp||e===we.ParamRegExpEnd?(r.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:ji.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&e!==we.ParamRegExp){i=e,e=we.EscapeNext;continue}switch(e){case we.Static:l==="/"?(c&&h(),o()):l===":"?(h(),e=we.Param):f();break;case we.EscapeNext:f(),e=i;break;case we.Param:l==="("?e=we.ParamRegExp:uv.test(l)?f():(h(),e=we.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case we.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:e=we.ParamRegExpEnd:u+=l;break;case we.ParamRegExpEnd:h(),e=we.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:t("Unknown state");break}}return e===we.ParamRegExp&&t(`Unfinished custom RegExp for param "${c}"`),h(),o(),s}const Ku="[^/]+?",fv={sensitive:!1,strict:!1,start:!0,end:!0};var We=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(We||{});const dv=/[.+*?^${}()[\]/\\]/g;function pv(n,t){const e=re({},fv,t),i=[];let s=e.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[We.Root];e.strict&&!c.length&&(s+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=We.Segment+(e.sensitive?We.BonusCaseSensitive:0);if(f.type===ji.Static)h||(s+="/"),s+=f.value.replace(dv,"\\$&"),p+=We.Static;else if(f.type===ji.Param){const{value:g,repeatable:_,optional:m,regexp:d}=f;r.push({name:g,repeatable:_,optional:m});const S=d||Ku;if(S!==Ku){p+=We.BonusCustomRegExp;try{`${S}`}catch(M){throw new Error(`Invalid custom RegExp for param "${g}" (${S}): `+M.message)}}let A=_?`((?:${S})(?:/(?:${S}))*)`:`(${S})`;h||(A=m&&c.length<2?`(?:/${A})`:"/"+A),m&&(A+="?"),s+=A,p+=We.Dynamic,m&&(p+=We.BonusOptional),_&&(p+=We.BonusRepeatable),S===".*"&&(p+=We.BonusWildcard)}u.push(p)}i.push(u)}if(e.strict&&e.end){const c=i.length-1;i[c][i[c].length-1]+=We.BonusStrict}e.strict||(s+="/?"),e.end?s+="$":e.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,e.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",g=r[f-1];h[g.name]=p&&g.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of n){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===ji.Static)u+=p.value;else if(p.type===ji.Param){const{value:g,repeatable:_,optional:m}=p,d=g in c?c[g]:"";if(Cn(d)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const S=Cn(d)?d.join("/"):d;if(!S)if(m)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${g}"`);u+=S}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function mv(n,t){let e=0;for(;e<n.length&&e<t.length;){const i=t[e]-n[e];if(i)return i;e++}return n.length<t.length?n.length===1&&n[0]===We.Static+We.Segment?-1:1:n.length>t.length?t.length===1&&t[0]===We.Static+We.Segment?1:-1:0}function Zd(n,t){let e=0;const i=n.score,s=t.score;for(;e<i.length&&e<s.length;){const r=mv(i[e],s[e]);if(r)return r;e++}if(Math.abs(s.length-i.length)===1){if(Zu(i))return 1;if(Zu(s))return-1}return s.length-i.length}function Zu(n){const t=n[n.length-1];return n.length>0&&t[t.length-1]<0}const gv={strict:!1,end:!0,sensitive:!1};function _v(n,t,e){const i=pv(hv(n.path),e),s=re(i,{record:n,parent:t,children:[],alias:[]});return t&&!s.record.aliasOf==!t.record.aliasOf&&t.children.push(s),s}function vv(n,t){const e=[],i=new Map;t=Gu(gv,t);function s(h){return i.get(h)}function r(h,f,p){const g=!p,_=Qu(h);_.aliasOf=p&&p.record;const m=Gu(t,h),d=[_];if("alias"in h){const M=typeof h.alias=="string"?[h.alias]:h.alias;for(const k of M)d.push(Qu(re({},_,{components:p?p.record.components:_.components,path:k,aliasOf:p?p.record:_})))}let S,A;for(const M of d){const{path:k}=M;if(f&&k[0]!=="/"){const L=f.record.path,P=L[L.length-1]==="/"?"":"/";M.path=f.record.path+(k&&P+k)}if(S=_v(M,f,m),p?p.alias.push(S):(A=A||S,A!==S&&A.alias.push(S),g&&h.name&&!th(S)&&o(h.name)),Jd(S)&&l(S),_.children){const L=_.children;for(let P=0;P<L.length;P++)r(L[P],S,p&&p.children[P])}p=p||S}return A?()=>{o(A)}:Rr}function o(h){if(qd(h)){const f=i.get(h);f&&(i.delete(h),e.splice(e.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=e.indexOf(h);f>-1&&(e.splice(f,1),h.record.name&&i.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return e}function l(h){const f=yv(h,e);e.splice(f,0,h),h.record.name&&!th(h)&&i.set(h.record.name,h)}function c(h,f){let p,g={},_,m;if("name"in h&&h.name){if(p=i.get(h.name),!p)throw Gs(Me.MATCHER_NOT_FOUND,{location:h});m=p.record.name,g=re(Ju(f.params,p.keys.filter(A=>!A.optional).concat(p.parent?p.parent.keys.filter(A=>A.optional):[]).map(A=>A.name)),h.params&&Ju(h.params,p.keys.map(A=>A.name))),_=p.stringify(g)}else if(h.path!=null)_=h.path,p=e.find(A=>A.re.test(_)),p&&(g=p.parse(_),m=p.record.name);else{if(p=f.name?i.get(f.name):e.find(A=>A.re.test(f.path)),!p)throw Gs(Me.MATCHER_NOT_FOUND,{location:h,currentLocation:f});m=p.record.name,g=re({},f.params,h.params),_=p.stringify(g)}const d=[];let S=p;for(;S;)d.unshift(S.record),S=S.parent;return{name:m,path:_,params:g,matched:d,meta:Mv(d)}}n.forEach(h=>r(h));function u(){e.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Ju(n,t){const e={};for(const i of t)i in n&&(e[i]=n[i]);return e}function Qu(n){const t={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:xv(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function xv(n){const t={},e=n.props||!1;if("component"in n)t.default=e;else for(const i in n.components)t[i]=typeof e=="object"?e[i]:e;return t}function th(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function Mv(n){return n.reduce((t,e)=>re(t,e.meta),{})}function yv(n,t){let e=0,i=t.length;for(;e!==i;){const r=e+i>>1;Zd(n,t[r])<0?i=r:e=r+1}const s=Sv(n);return s&&(i=t.lastIndexOf(s,i-1)),i}function Sv(n){let t=n;for(;t=t.parent;)if(Jd(t)&&Zd(n,t)===0)return t}function Jd({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function eh(n){const t=zn(va),e=zn($d),i=le(()=>{const l=Bn(n.to);return t.resolve(l)}),s=le(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],h=e.matched;if(!u||!h.length)return-1;const f=h.findIndex(Vs.bind(null,u));if(f>-1)return f;const p=nh(l[c-2]);return c>1&&nh(u)===p&&h[h.length-1].path!==p?h.findIndex(Vs.bind(null,l[c-2])):f}),r=le(()=>s.value>-1&&wv(e.params,i.value.params)),o=le(()=>s.value>-1&&s.value===e.matched.length-1&&jd(e.params,i.value.params));function a(l={}){if(Av(l)){const c=t[Bn(n.replace)?"replace":"push"](Bn(n.to)).catch(Rr);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:le(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function Ev(n){return n.length===1?n[0]:n}const bv=es({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:eh,setup(n,{slots:t}){const e=ca(eh(n)),{options:i}=zn(va),s=le(()=>({[ih(n.activeClass,i.linkActiveClass,"router-link-active")]:e.isActive,[ih(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:e.isExactActive}));return()=>{const r=t.default&&Ev(t.default(e));return n.custom?r:Fd("a",{"aria-current":e.isExactActive?n.ariaCurrentValue:null,href:e.href,onClick:e.navigate,class:s.value},r)}}}),Tv=bv;function Av(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const t=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return n.preventDefault&&n.preventDefault(),!0}}function wv(n,t){for(const e in t){const i=t[e],s=n[e];if(typeof i=="string"){if(i!==s)return!1}else if(!Cn(s)||s.length!==i.length||i.some((r,o)=>r.valueOf()!==s[o].valueOf()))return!1}return!0}function nh(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const ih=(n,t,e)=>n??t??e,Rv=es({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:t,slots:e}){const i=zn(Dl),s=le(()=>n.route||i.value),r=zn(Yu,0),o=le(()=>{let c=Bn(r);const{matched:u}=s.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=le(()=>s.value.matched[o.value]);Po(Yu,le(()=>o.value+1)),Po(nv,a),Po(Dl,s);const l=ne();return Hn(()=>[l.value,a.value,n.name],([c,u,h],[f,p,g])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!Vs(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,h=a.value,f=h&&h.components[u];if(!f)return sh(e.default,{Component:f,route:c});const p=h.props[u],g=p?p===!0?c.params:typeof p=="function"?p(c):p:null,m=Fd(f,re({},g,t,{onVnodeUnmounted:d=>{d.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return sh(e.default,{Component:m,route:c})||m}}});function sh(n,t){if(!n)return null;const e=n(t);return e.length===1?e[0]:e}const Cv=Rv;function Pv(n){const t=vv(n.routes,n),e=n.parseQuery||tv,i=n.stringifyQuery||qu,s=n.history,r=lr(),o=lr(),a=lr(),l=zs(_i);let c=_i;Ss&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Ia.bind(null,O=>""+O),h=Ia.bind(null,F_),f=Ia.bind(null,Or);function p(O,$){let V,lt;return qd(O)?(V=t.getRecordMatcher(O),lt=$):lt=O,t.addRoute(lt,V)}function g(O){const $=t.getRecordMatcher(O);$&&t.removeRoute($)}function _(){return t.getRoutes().map(O=>O.record)}function m(O){return!!t.getRecordMatcher(O)}function d(O,$){if($=re({},$||l.value),typeof O=="string"){const y=Ua(e,O,$.path),st=t.resolve({path:y.path},$),J=s.createHref(y.fullPath);return re(y,st,{params:f(st.params),hash:Or(y.hash),redirectedFrom:void 0,href:J})}let V;if(O.path!=null)V=re({},O,{path:Ua(e,O.path,$.path).path});else{const y=re({},O.params);for(const st in y)y[st]==null&&delete y[st];V=re({},O,{params:h(y)}),$.params=h($.params)}const lt=t.resolve(V,$),vt=O.hash||"";lt.params=u(f(lt.params));const T=H_(i,re({},O,{hash:U_(vt),path:lt.path})),C=s.createHref(T);return re({fullPath:T,hash:vt,query:i===qu?ev(O.query):O.query||{}},lt,{redirectedFrom:void 0,href:C})}function S(O){return typeof O=="string"?Ua(e,O,l.value.path):re({},O)}function A(O,$){if(c!==O)return Gs(Me.NAVIGATION_CANCELLED,{from:$,to:O})}function M(O){return P(O)}function k(O){return M(re(S(O),{replace:!0}))}function L(O,$){const V=O.matched[O.matched.length-1];if(V&&V.redirect){const{redirect:lt}=V;let vt=typeof lt=="function"?lt(O,$):lt;return typeof vt=="string"&&(vt=vt.includes("?")||vt.includes("#")?vt=S(vt):{path:vt},vt.params={}),re({query:O.query,hash:O.hash,params:vt.path!=null?{}:O.params},vt)}}function P(O,$){const V=c=d(O),lt=l.value,vt=O.state,T=O.force,C=O.replace===!0,y=L(V,lt);if(y)return P(re(S(y),{state:typeof y=="object"?re({},vt,y.state):vt,force:T,replace:C}),$||V);const st=V;st.redirectedFrom=$;let J;return!T&&k_(i,lt,V)&&(J=Gs(Me.NAVIGATION_DUPLICATED,{to:st,from:lt}),Ct(lt,lt,!0,!1)),(J?Promise.resolve(J):E(st,lt)).catch(I=>Yn(I)?Yn(I,Me.NAVIGATION_GUARD_REDIRECT)?I:yt(I):Y(I,st,lt)).then(I=>{if(I){if(Yn(I,Me.NAVIGATION_GUARD_REDIRECT))return P(re({replace:C},S(I.to),{state:typeof I.to=="object"?re({},vt,I.to.state):vt,force:T}),$||st)}else I=U(st,lt,!0,C,vt);return D(st,lt,I),I})}function N(O,$){const V=A(O,$);return V?Promise.reject(V):Promise.resolve()}function w(O){const $=at.values().next().value;return $&&typeof $.runWithContext=="function"?$.runWithContext(O):O()}function E(O,$){let V;const[lt,vt,T]=iv(O,$);V=Oa(lt.reverse(),"beforeRouteLeave",O,$);for(const y of lt)y.leaveGuards.forEach(st=>{V.push(Ai(st,O,$))});const C=N.bind(null,O,$);return V.push(C),At(V).then(()=>{V=[];for(const y of r.list())V.push(Ai(y,O,$));return V.push(C),At(V)}).then(()=>{V=Oa(vt,"beforeRouteUpdate",O,$);for(const y of vt)y.updateGuards.forEach(st=>{V.push(Ai(st,O,$))});return V.push(C),At(V)}).then(()=>{V=[];for(const y of T)if(y.beforeEnter)if(Cn(y.beforeEnter))for(const st of y.beforeEnter)V.push(Ai(st,O,$));else V.push(Ai(y.beforeEnter,O,$));return V.push(C),At(V)}).then(()=>(O.matched.forEach(y=>y.enterCallbacks={}),V=Oa(T,"beforeRouteEnter",O,$,w),V.push(C),At(V))).then(()=>{V=[];for(const y of o.list())V.push(Ai(y,O,$));return V.push(C),At(V)}).catch(y=>Yn(y,Me.NAVIGATION_CANCELLED)?y:Promise.reject(y))}function D(O,$,V){a.list().forEach(lt=>w(()=>lt(O,$,V)))}function U(O,$,V,lt,vt){const T=A(O,$);if(T)return T;const C=$===_i,y=Ss?history.state:{};V&&(lt||C?s.replace(O.fullPath,re({scroll:C&&y&&y.scroll},vt)):s.push(O.fullPath,vt)),l.value=O,Ct(O,$,V,C),yt()}let z;function nt(){z||(z=s.listen((O,$,V)=>{if(!mt.listening)return;const lt=d(O),vt=L(lt,mt.currentRoute.value);if(vt){P(re(vt,{replace:!0,force:!0}),lt).catch(Rr);return}c=lt;const T=l.value;Ss&&$_(ju(T.fullPath,V.delta),_a()),E(lt,T).catch(C=>Yn(C,Me.NAVIGATION_ABORTED|Me.NAVIGATION_CANCELLED)?C:Yn(C,Me.NAVIGATION_GUARD_REDIRECT)?(P(re(S(C.to),{force:!0}),lt).then(y=>{Yn(y,Me.NAVIGATION_ABORTED|Me.NAVIGATION_DUPLICATED)&&!V.delta&&V.type===Cl.pop&&s.go(-1,!1)}).catch(Rr),Promise.reject()):(V.delta&&s.go(-V.delta,!1),Y(C,lt,T))).then(C=>{C=C||U(lt,T,!1),C&&(V.delta&&!Yn(C,Me.NAVIGATION_CANCELLED)?s.go(-V.delta,!1):V.type===Cl.pop&&Yn(C,Me.NAVIGATION_ABORTED|Me.NAVIGATION_DUPLICATED)&&s.go(-1,!1)),D(lt,T,C)}).catch(Rr)}))}let ot=lr(),et=lr(),it;function Y(O,$,V){yt(O);const lt=et.list();return lt.length?lt.forEach(vt=>vt(O,$,V)):console.error(O),Promise.reject(O)}function gt(){return it&&l.value!==_i?Promise.resolve():new Promise((O,$)=>{ot.add([O,$])})}function yt(O){return it||(it=!O,nt(),ot.list().forEach(([$,V])=>O?V(O):$()),ot.reset()),O}function Ct(O,$,V,lt){const{scrollBehavior:vt}=n;if(!Ss||!vt)return Promise.resolve();const T=!V&&K_(ju(O.fullPath,0))||(lt||!V)&&history.state&&history.state.scroll||null;return Hs().then(()=>vt(O,$,T)).then(C=>C&&Y_(C)).catch(C=>Y(C,O,$))}const Ut=O=>s.go(O);let Kt;const at=new Set,mt={currentRoute:l,listening:!0,addRoute:p,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:m,getRoutes:_,resolve:d,options:n,push:M,replace:k,go:Ut,back:()=>Ut(-1),forward:()=>Ut(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:et.add,isReady:gt,install(O){O.component("RouterLink",Tv),O.component("RouterView",Cv),O.config.globalProperties.$router=mt,Object.defineProperty(O.config.globalProperties,"$route",{enumerable:!0,get:()=>Bn(l)}),Ss&&!Kt&&l.value===_i&&(Kt=!0,M(s.location).catch(lt=>{}));const $={};for(const lt in _i)Object.defineProperty($,lt,{get:()=>l.value[lt],enumerable:!0});O.provide(va,mt),O.provide($d,nd($)),O.provide(Dl,l);const V=O.unmount;at.add(O),O.unmount=function(){at.delete(O),at.size<1&&(c=_i,z&&z(),z=null,l.value=_i,Kt=!1,it=!1),V()}}};function At(O){return O.reduce(($,V)=>$.then(()=>w(V)),Promise.resolve())}return mt}function Gr(){return zn(va)}const Cr=[{id:"major_electrical",label:"电气",tagline:"能源与自动化"},{id:"major_law",label:"法学",tagline:"合规与证据"},{id:"major_accounting",label:"会计",tagline:"财报与内控"},{id:"major_cs",label:"计科",tagline:"算法与系统"},{id:"major_finance",label:"金融",tagline:"定价与风险"},{id:"major_clinical",label:"临床",tagline:"诊疗路径"},{id:"major_swe",label:"软工",tagline:"交付与质量"},{id:"major_marketing",label:"市场",tagline:"增长与品牌"},{id:"major_ds",label:"数据科学",tagline:"推断与实验"},{id:"major_english",label:"英语",tagline:"跨文化沟通"}],Ll="galaxy_majors";function Qd(){var e;const n={type:"close",source:"galaxy-h5"},t=window;try{if(t.plus&&((e=t.uni)!=null&&e.postMessage)){t.uni.postMessage({data:n});return}}catch{}try{window.parent&&window.parent!==window&&window.parent.postMessage(n,"*")}catch{}}const Dv={class:"select-page"},Lv={class:"picked","aria-live":"polite"},Iv={class:"picked-row"},Uv={class:"value"},Nv={class:"picked-row"},Ov={class:"value"},Fv={class:"grid"},Bv=["onClick"],zv={class:"card-title"},Hv={class:"card-tag"},kv={class:"footer"},Vv=["disabled"],Gv={key:0,class:"toast",role:"status"},Wv=es({__name:"MajorSelectView",setup(n){const t="data:image/svg+xml;charset=utf-8,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M14.5 6.5 9 12l5.5 5.5" stroke="#171A1F" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/></svg>'),e=Gr(),i=ne(null),s=ne(null),r=ne(""),o=le(()=>!!i.value&&!!s.value&&i.value!==s.value);function a(h){r.value=h,window.setTimeout(()=>{r.value=""},1800)}function l(h){if(h===i.value){i.value=null;return}if(h===s.value){s.value=null;return}if(!i.value){i.value=h;return}if(!s.value){if(h===i.value){a("请选择与起点不同的交叉意向专业");return}s.value=h;return}s.value=h}function c(){if(!o.value)return;const h={fromId:i.value,toId:s.value};sessionStorage.setItem(Ll,JSON.stringify(h)),e.push({name:"galaxy"})}function u(){Qd()}return(h,f)=>{var p,g;return Vt(),$t("div",Dv,[f[4]||(f[4]=ht("div",{class:"bg-gradient","aria-hidden":"true"},null,-1)),ht("div",{class:"custom-nav"},[ht("button",{type:"button",class:"nav-btn","aria-label":"返回",onClick:u},[ht("img",{class:"nav-btn-img",src:t,alt:"",width:"19",height:"19",decoding:"async",draggable:"false"})]),f[0]||(f[0]=ht("div",{class:"nav-title"},"专业星系",-1)),f[1]||(f[1]=ht("div",{class:"nav-right"},null,-1))]),f[5]||(f[5]=Ig('<div class="nav-spacer" data-v-500dcac5></div><header class="header" data-v-500dcac5><p class="eyebrow" data-v-500dcac5>专业交叉星系</p><h1 class="title" data-v-500dcac5>选择你的星域</h1><p class="subtitle" data-v-500dcac5>先选起点专业，再选交叉意向；进入星系后会高亮两专业之间的路径与融合关卡。</p></header>',2)),ht("section",Lv,[ht("div",Iv,[f[2]||(f[2]=ht("span",{class:"label"},"主修 / 起点",-1)),ht("span",Uv,Zt(i.value?(p=Bn(Cr).find(_=>_.id===i.value))==null?void 0:p.label:"未选择"),1)]),ht("div",Nv,[f[3]||(f[3]=ht("span",{class:"label"},"交叉意向",-1)),ht("span",Ov,Zt(s.value?(g=Bn(Cr).find(_=>_.id===s.value))==null?void 0:g.label:"未选择"),1)])]),ht("div",Fv,[(Vt(!0),$t(je,null,Ir(Bn(Cr),_=>(Vt(),$t("button",{key:_.id,type:"button",class:Fs(["card",{"is-from":_.id===i.value,"is-to":_.id===s.value}]),onClick:m=>l(_.id)},[ht("span",zv,Zt(_.label),1),ht("span",Hv,Zt(_.tagline),1)],10,Bv))),128))]),ht("footer",kv,[ht("button",{type:"button",class:"btn primary",disabled:!o.value,onClick:c},"进入星系",8,Vv)]),r.value?(Vt(),$t("div",Gv,Zt(r.value),1)):dn("",!0)])}}}),Xv=Zs(Wv,[["__scopeId","data-v-500dcac5"]]);function jv(){if(typeof window<"u"){const n=window.__GALAXY_API_BASE__;if(n!=null&&String(n).trim()!=="")return String(n).trim().replace(/\/+$/,"")}return"./mock"}function Es(n,t){return n.startsWith("http")||n.startsWith("/")?n:`${t.replace(/\/$/,"")}/${n}`}async function rh(n="/mock"){const t=Es("manifest.json",n),e=await fetch(t).then(h=>{if(!h.ok)throw new Error(`manifest ${h.status}`);return h.json()}),i=Es(e.nodes_url,n),s=Es(e.edges_url,n),r=Es(e.hyperedges_url,n),o=Es(e.layout_url,n),[a,l,c,u]=await Promise.all([fetch(i).then(h=>{if(!h.ok)throw new Error(`nodes ${h.status}`);return h.json()}),fetch(s).then(h=>{if(!h.ok)throw new Error(`edges ${h.status}`);return h.json()}),fetch(r).then(h=>{if(!h.ok)throw new Error(`hyperedges ${h.status}`);return h.json()}),fetch(o).then(h=>{if(!h.ok)throw new Error(`layout ${h.status}`);return h.json()})]);return{manifest:e,nodes:a,edges:l,hyperedges:c,layout:u}}async function oh(n="/mock"){const t=Es("recommend.json",n),e=await fetch(t);if(!e.ok)throw new Error(`recommend ${e.status}`);return e.json()}function qv(n,t,e){if(t===e)return[t];const i=new Map;for(const l of n)i.has(l.u)||i.set(l.u,[]),i.has(l.v)||i.set(l.v,[]),i.get(l.u).push(l.v),i.get(l.v).push(l.u);const s=[t],r=new Map;for(r.set(t,null);s.length;){const l=s.shift();if(l===e)break;for(const c of i.get(l)??[])r.has(c)||(r.set(c,l),s.push(c))}if(!r.has(e))return null;const o=[];let a=e;for(;a;)o.push(a),a=r.get(a)??null;return o.reverse(),o}function Ki(n,t){const e=[],i=new Set;for(const s of t)if(s.member_node_ids.includes(n)){e.push(s.id);for(const r of s.member_node_ids)i.add(r)}return{hyperedgeIds:e,memberIds:i}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const kc="170",Ls={ROTATE:0,DOLLY:1,PAN:2},bs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yv=0,ah=1,$v=2,tp=1,Kv=2,ti=3,Li=0,en=1,En=2,ai=0,Is=1,Us=2,lh=3,ch=4,Zv=5,Wi=100,Jv=101,Qv=102,t0=103,e0=104,n0=200,i0=201,s0=202,r0=203,Il=204,Ul=205,o0=206,a0=207,l0=208,c0=209,u0=210,h0=211,f0=212,d0=213,p0=214,Nl=0,Ol=1,Fl=2,Ws=3,Bl=4,zl=5,Hl=6,kl=7,ep=0,m0=1,g0=2,Pi=0,np=1,ip=2,sp=3,Vc=4,_0=5,rp=6,op=7,ap=300,Xs=301,js=302,Vl=303,Gl=304,xa=306,Fr=1e3,qi=1001,Wl=1002,cn=1003,v0=1004,eo=1005,Tn=1006,Fa=1007,Ci=1008,Gn=1009,lp=1010,cp=1011,Br=1012,Gc=1013,Zi=1014,ri=1015,li=1016,Wc=1017,Xc=1018,qs=1020,up=35902,hp=1021,fp=1022,mn=1023,dp=1024,pp=1025,Ns=1026,Ys=1027,mp=1028,jc=1029,gp=1030,qc=1031,Yc=1033,Uo=33776,No=33777,Oo=33778,Fo=33779,Xl=35840,jl=35841,ql=35842,Yl=35843,$l=36196,Kl=37492,Zl=37496,Jl=37808,Ql=37809,tc=37810,ec=37811,nc=37812,ic=37813,sc=37814,rc=37815,oc=37816,ac=37817,lc=37818,cc=37819,uc=37820,hc=37821,Bo=36492,fc=36494,dc=36495,_p=36283,pc=36284,mc=36285,gc=36286,x0=3200,M0=3201,vp=0,y0=1,Ri="",Qe="srgb",Js="srgb-linear",Ma="linear",ce="srgb",os=7680,uh=519,S0=512,E0=513,b0=514,xp=515,T0=516,A0=517,w0=518,R0=519,hh=35044,fh="300 es",oi=2e3,Zo=2001;class ns{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zo=Math.PI/180,_c=180/Math.PI;function Wr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]).toLowerCase()}function qe(n,t,e){return Math.max(t,Math.min(e,n))}function C0(n,t){return(n%t+t)%t}function Ba(n,t,e){return(1-e)*n+e*t}function cr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const P0={DEG2RAD:zo};class Ft{constructor(t=0,e=0){Ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,i,s,r,o,a,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=s[0],m=s[3],d=s[6],S=s[1],A=s[4],M=s[7],k=s[2],L=s[5],P=s[8];return r[0]=o*_+a*S+l*k,r[3]=o*m+a*A+l*L,r[6]=o*d+a*M+l*P,r[1]=c*_+u*S+h*k,r[4]=c*m+u*A+h*L,r[7]=c*d+u*M+h*P,r[2]=f*_+p*S+g*k,r[5]=f*m+p*A+g*L,r[8]=f*d+p*M+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,p=c*r-o*l,g=e*h+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=f*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(za.makeScale(t,e)),this}rotate(t){return this.premultiply(za.makeRotation(-t)),this}translate(t,e){return this.premultiply(za.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const za=new qt;function Mp(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Jo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function D0(){const n=Jo("canvas");return n.style.display="block",n}const dh={};function xr(n){n in dh||(dh[n]=!0,console.warn(n))}function L0(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function I0(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function U0(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:Js,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(n.r=ci(n.r),n.g=ci(n.g),n.b=ci(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(n.r=Os(n.r),n.g=Os(n.g),n.b=Os(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ri?Ma:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function ci(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Os(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ph=[.64,.33,.3,.6,.15,.06],mh=[.2126,.7152,.0722],gh=[.3127,.329],_h=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vh=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[Js]:{primaries:ph,whitePoint:gh,transfer:Ma,toXYZ:_h,fromXYZ:vh,luminanceCoefficients:mh,workingColorSpaceConfig:{unpackColorSpace:Qe},outputColorSpaceConfig:{drawingBufferColorSpace:Qe}},[Qe]:{primaries:ph,whitePoint:gh,transfer:ce,toXYZ:_h,fromXYZ:vh,luminanceCoefficients:mh,outputColorSpaceConfig:{drawingBufferColorSpace:Qe}}});let as;class N0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{as===void 0&&(as=Jo("canvas")),as.width=t.width,as.height=t.height;const i=as.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=as}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Jo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ci(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ci(e[i]/255)*255):e[i]=ci(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let O0=0;class yp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=Wr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ha(s[o].image)):r.push(Ha(s[o]))}else r=Ha(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Ha(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?N0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let F0=0;class $e extends ns{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,i=qi,s=qi,r=Tn,o=Ci,a=mn,l=Gn,c=$e.DEFAULT_ANISOTROPY,u=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=Wr(),this.name="",this.source=new yp(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ap)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Fr:t.x=t.x-Math.floor(t.x);break;case qi:t.x=t.x<0?0:1;break;case Wl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Fr:t.y=t.y-Math.floor(t.y);break;case qi:t.y=t.y<0?0:1;break;case Wl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=ap;$e.DEFAULT_ANISOTROPY=1;class ye{constructor(t=0,e=0,i=0,s=1){ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(c+1)/2,M=(p+1)/2,k=(d+1)/2,L=(u+f)/4,P=(h+_)/4,N=(g+m)/4;return A>M&&A>k?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=L/i,r=P/i):M>k?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=L/s,r=N/s):k<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(k),i=P/r,s=N/r),this.set(i,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-_)/S,this.z=(f-u)/S,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class B0 extends ns{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ye(0,0,t,e),this.scissorTest=!1,this.viewport=new ye(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new $e(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new yp(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends B0{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Sp extends $e{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class z0 extends $e{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=qi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ji{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let m=1-a;const d=l*f+c*p+u*g+h*_,S=d>=0?1:-1,A=1-d*d;if(A>Number.EPSILON){const k=Math.sqrt(A),L=Math.atan2(k,d*S);m=Math.sin(m*L)/k,a=Math.sin(a*L)/k}const M=a*S;if(l=l*m+f*M,c=c*m+p*M,u=u*m+g*M,h=h*m+_*M,m===1-a){const k=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=k,c*=k,u*=k,h*=k}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-a*p,t[e+2]=c*g+u*p+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qe(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(t=0,e=0,i=0){W.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ka.copy(this).projectOnVector(t),this.sub(ka)}reflect(t){return this.sub(ka.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ka=new W,xh=new Ji;class Qi{constructor(t=new W(1/0,1/0,1/0),e=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(t.matrixWorld),this.expandByPoint(Mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),no.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),no.copy(i.boundingBox)),no.applyMatrix4(t.matrixWorld),this.union(no)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Mn),Mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ur),io.subVectors(this.max,ur),ls.subVectors(t.a,ur),cs.subVectors(t.b,ur),us.subVectors(t.c,ur),vi.subVectors(cs,ls),xi.subVectors(us,cs),Ni.subVectors(ls,us);let e=[0,-vi.z,vi.y,0,-xi.z,xi.y,0,-Ni.z,Ni.y,vi.z,0,-vi.x,xi.z,0,-xi.x,Ni.z,0,-Ni.x,-vi.y,vi.x,0,-xi.y,xi.x,0,-Ni.y,Ni.x,0];return!Va(e,ls,cs,us,io)||(e=[1,0,0,0,1,0,0,0,1],!Va(e,ls,cs,us,io))?!1:(so.crossVectors(vi,xi),e=[so.x,so.y,so.z],Va(e,ls,cs,us,io))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const $n=[new W,new W,new W,new W,new W,new W,new W,new W],Mn=new W,no=new Qi,ls=new W,cs=new W,us=new W,vi=new W,xi=new W,Ni=new W,ur=new W,io=new W,so=new W,Oi=new W;function Va(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Oi.fromArray(n,r);const a=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),l=t.dot(Oi),c=e.dot(Oi),u=i.dot(Oi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const H0=new Qi,hr=new W,Ga=new W;class Qs{constructor(t=new W,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):H0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;hr.subVectors(t,this.center);const e=hr.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(hr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ga.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(hr.copy(t.center).add(Ga)),this.expandByPoint(hr.copy(t.center).sub(Ga))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Kn=new W,Wa=new W,ro=new W,Mi=new W,Xa=new W,oo=new W,ja=new W;class Xr{constructor(t=new W,e=new W(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Wa.copy(t).add(e).multiplyScalar(.5),ro.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(Wa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ro),a=Mi.dot(this.direction),l=-Mi.dot(ro),c=Mi.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Wa).addScaledVector(ro,f),p}intersectSphere(t,e){Kn.subVectors(t.center,this.origin);const i=Kn.dot(this.direction),s=Kn.dot(Kn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,i,s,r){Xa.subVectors(e,t),oo.subVectors(i,t),ja.crossVectors(Xa,oo);let o=this.direction.dot(ja),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Mi.subVectors(this.origin,t);const l=a*this.direction.dot(oo.crossVectors(Mi,oo));if(l<0)return null;const c=a*this.direction.dot(Xa.cross(Mi));if(c<0||l+c>o)return null;const u=-a*Mi.dot(ja);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/hs.setFromMatrixColumn(t,0).length(),r=1/hs.setFromMatrixColumn(t,1).length(),o=1/hs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(k0,t,V0)}lookAt(t,e,i){const s=this.elements;return rn.subVectors(t,e),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),yi.crossVectors(i,rn),yi.lengthSq()===0&&(Math.abs(i.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),yi.crossVectors(i,rn)),yi.normalize(),ao.crossVectors(rn,yi),s[0]=yi.x,s[4]=ao.x,s[8]=rn.x,s[1]=yi.y,s[5]=ao.y,s[9]=rn.y,s[2]=yi.z,s[6]=ao.z,s[10]=rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],S=i[3],A=i[7],M=i[11],k=i[15],L=s[0],P=s[4],N=s[8],w=s[12],E=s[1],D=s[5],U=s[9],z=s[13],nt=s[2],ot=s[6],et=s[10],it=s[14],Y=s[3],gt=s[7],yt=s[11],Ct=s[15];return r[0]=o*L+a*E+l*nt+c*Y,r[4]=o*P+a*D+l*ot+c*gt,r[8]=o*N+a*U+l*et+c*yt,r[12]=o*w+a*z+l*it+c*Ct,r[1]=u*L+h*E+f*nt+p*Y,r[5]=u*P+h*D+f*ot+p*gt,r[9]=u*N+h*U+f*et+p*yt,r[13]=u*w+h*z+f*it+p*Ct,r[2]=g*L+_*E+m*nt+d*Y,r[6]=g*P+_*D+m*ot+d*gt,r[10]=g*N+_*U+m*et+d*yt,r[14]=g*w+_*z+m*it+d*Ct,r[3]=S*L+A*E+M*nt+k*Y,r[7]=S*P+A*D+M*ot+k*gt,r[11]=S*N+A*U+M*et+k*yt,r[15]=S*w+A*z+M*it+k*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*p-i*l*p)+_*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+e*c*h-e*a*p-r*o*h+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],S=h*m*c-_*f*c+_*l*p-a*m*p-h*l*d+a*f*d,A=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,M=u*_*c-g*h*c+g*a*p-o*_*p-u*a*d+o*h*d,k=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,L=e*S+i*A+s*M+r*k;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return t[0]=S*P,t[1]=(_*f*r-h*m*r-_*s*p+i*m*p+h*s*d-i*f*d)*P,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*d+i*l*d)*P,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*p-i*l*p)*P,t[4]=A*P,t[5]=(u*m*r-g*f*r+g*s*p-e*m*p-u*s*d+e*f*d)*P,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*P,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*p+e*l*p)*P,t[8]=M*P,t[9]=(g*h*r-u*_*r-g*i*p+e*_*p+u*i*d-e*h*d)*P,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*d+e*a*d)*P,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*p-e*a*p)*P,t[12]=k*P,t[13]=(u*_*s-g*h*s+g*i*f-e*_*f-u*i*m+e*h*m)*P,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*P,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*P,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,p=r*u,g=r*h,_=o*u,m=o*h,d=a*h,S=l*c,A=l*u,M=l*h,k=i.x,L=i.y,P=i.z;return s[0]=(1-(_+d))*k,s[1]=(p+M)*k,s[2]=(g-A)*k,s[3]=0,s[4]=(p-M)*L,s[5]=(1-(f+d))*L,s[6]=(m+S)*L,s[7]=0,s[8]=(g+A)*P,s[9]=(m-S)*P,s[10]=(1-(f+_))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=hs.set(s[0],s[1],s[2]).length();const o=hs.set(s[4],s[5],s[6]).length(),a=hs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],yn.copy(this);const c=1/r,u=1/o,h=1/a;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=u,yn.elements[5]*=u,yn.elements[6]*=u,yn.elements[8]*=h,yn.elements[9]*=h,yn.elements[10]*=h,e.setFromRotationMatrix(yn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=oi){const l=this.elements,c=2*r/(e-t),u=2*r/(i-s),h=(e+t)/(e-t),f=(i+s)/(i-s);let p,g;if(a===oi)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Zo)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=oi){const l=this.elements,c=1/(e-t),u=1/(i-s),h=1/(o-r),f=(e+t)*c,p=(i+s)*u;let g,_;if(a===oi)g=(o+r)*h,_=-2*h;else if(a===Zo)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const hs=new W,yn=new de,k0=new W(0,0,0),V0=new W(1,1,1),yi=new W,ao=new W,rn=new W,Mh=new de,yh=new Ji;class Wn{constructor(t=0,e=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Mh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yh.setFromEuler(this),this.setFromQuaternion(yh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class $c{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let G0=0;const Sh=new W,fs=new Ji,Zn=new de,lo=new W,fr=new W,W0=new W,X0=new Ji,Eh=new W(1,0,0),bh=new W(0,1,0),Th=new W(0,0,1),Ah={type:"added"},j0={type:"removed"},ds={type:"childadded",child:null},qa={type:"childremoved",child:null};class Te extends ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=Wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new W,e=new Wn,i=new Ji,s=new W(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new qt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $c,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(Eh,t)}rotateY(t){return this.rotateOnAxis(bh,t)}rotateZ(t){return this.rotateOnAxis(Th,t)}translateOnAxis(t,e){return Sh.copy(t).applyQuaternion(this.quaternion),this.position.add(Sh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Eh,t)}translateY(t){return this.translateOnAxis(bh,t)}translateZ(t){return this.translateOnAxis(Th,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?lo.copy(t):lo.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(fr,lo,this.up):Zn.lookAt(lo,fr,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(Zn),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ah),ds.child=t,this.dispatchEvent(ds),ds.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(j0),qa.child=t,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ah),ds.child=t,this.dispatchEvent(ds),ds.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,t,W0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,X0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Te.DEFAULT_UP=new W(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Sn=new W,Jn=new W,Ya=new W,Qn=new W,ps=new W,ms=new W,wh=new W,$a=new W,Ka=new W,Za=new W,Ja=new ye,Qa=new ye,tl=new ye;class bn{constructor(t=new W,e=new W,i=new W){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Sn.subVectors(t,e),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Sn.subVectors(s,e),Jn.subVectors(i,e),Ya.subVectors(t,e);const o=Sn.dot(Sn),a=Sn.dot(Jn),l=Sn.dot(Ya),c=Jn.dot(Jn),u=Jn.dot(Ya),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Qn.x),l.addScaledVector(o,Qn.y),l.addScaledVector(a,Qn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Ja.setScalar(0),Qa.setScalar(0),tl.setScalar(0),Ja.fromBufferAttribute(t,e),Qa.fromBufferAttribute(t,i),tl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ja,r.x),o.addScaledVector(Qa,r.y),o.addScaledVector(tl,r.z),o}static isFrontFacing(t,e,i,s){return Sn.subVectors(i,e),Jn.subVectors(t,e),Sn.cross(Jn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Sn.cross(Jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return bn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return bn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return bn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return bn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return bn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ps.subVectors(s,i),ms.subVectors(r,i),$a.subVectors(t,i);const l=ps.dot($a),c=ms.dot($a);if(l<=0&&c<=0)return e.copy(i);Ka.subVectors(t,s);const u=ps.dot(Ka),h=ms.dot(Ka);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(ps,o);Za.subVectors(t,r);const p=ps.dot(Za),g=ms.dot(Za);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(ms,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return wh.subVectors(r,s),a=(h-u)/(h-u+(p-g)),e.copy(s).addScaledVector(wh,a);const d=1/(m+_+f);return o=_*d,a=f*d,e.copy(i).addScaledVector(ps,o).addScaledVector(ms,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ep={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},co={h:0,s:0,l:0};function el(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Gt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Qt.workingColorSpace){if(t=C0(t,1),e=qe(e,0,1),i=qe(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=el(o,r,t+1/3),this.g=el(o,r,t),this.b=el(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Qe){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qe){const i=Ep[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ci(t.r),this.g=ci(t.g),this.b=ci(t.b),this}copyLinearToSRGB(t){return this.r=Os(t.r),this.g=Os(t.g),this.b=Os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qe){return Qt.fromWorkingColorSpace(Ne.copy(this),t),Math.round(qe(Ne.r*255,0,255))*65536+Math.round(qe(Ne.g*255,0,255))*256+Math.round(qe(Ne.b*255,0,255))}getHexString(t=Qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Ne.copy(this),e);const i=Ne.r,s=Ne.g,r=Ne.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Qe){Qt.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,i=Ne.g,s=Ne.b;return t!==Qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Si),this.setHSL(Si.h+t,Si.s+e,Si.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Si),t.getHSL(co);const i=Ba(Si.h,co.h,e),s=Ba(Si.s,co.s,e),r=Ba(Si.l,co.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Gt;Gt.NAMES=Ep;let q0=0;class is extends ns{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=Wr(),this.name="",this.blending=Is,this.side=Li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Il,this.blendDst=Ul,this.blendEquation=Wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(i.blending=this.blending),this.side!==Li&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Il&&(i.blendSrc=this.blendSrc),this.blendDst!==Ul&&(i.blendDst=this.blendDst),this.blendEquation!==Wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class fn extends is{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=ep,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new W,uo=new Ft;class _n{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=hh,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)uo.fromBufferAttribute(this,e),uo.applyMatrix3(t),this.setXY(e,uo.x,uo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=cr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array),s=Ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ze(e,this.array),i=Ze(i,this.array),s=Ze(s,this.array),r=Ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hh&&(t.usage=this.usage),t}}class bp extends _n{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Tp extends _n{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Se extends _n{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Y0=0;const hn=new de,nl=new Te,gs=new W,on=new Qi,dr=new Qi,De=new W;class He extends ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=Wr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mp(t)?Tp:bp)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,i){return hn.makeTranslation(t,e,i),this.applyMatrix4(hn),this}scale(t,e,i){return hn.makeScale(t,e,i),this.applyMatrix4(hn),this}lookAt(t){return nl.lookAt(t),nl.updateMatrix(),this.applyMatrix4(nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Se(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];on.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(t){const i=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];dr.setFromBufferAttribute(a),this.morphTargetsRelative?(De.addVectors(on.min,dr.min),on.expandByPoint(De),De.addVectors(on.max,dr.max),on.expandByPoint(De)):(on.expandByPoint(dr.min),on.expandByPoint(dr.max))}on.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)De.fromBufferAttribute(a,c),l&&(gs.fromBufferAttribute(t,c),De.add(gs)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _n(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new W,l[N]=new W;const c=new W,u=new W,h=new W,f=new Ft,p=new Ft,g=new Ft,_=new W,m=new W;function d(N,w,E){c.fromBufferAttribute(i,N),u.fromBufferAttribute(i,w),h.fromBufferAttribute(i,E),f.fromBufferAttribute(r,N),p.fromBufferAttribute(r,w),g.fromBufferAttribute(r,E),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(D),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),a[N].add(_),a[w].add(_),a[E].add(_),l[N].add(m),l[w].add(m),l[E].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let N=0,w=S.length;N<w;++N){const E=S[N],D=E.start,U=E.count;for(let z=D,nt=D+U;z<nt;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const A=new W,M=new W,k=new W,L=new W;function P(N){k.fromBufferAttribute(s,N),L.copy(k);const w=a[N];A.copy(w),A.sub(k.multiplyScalar(k.dot(w))).normalize(),M.crossVectors(L,w);const D=M.dot(l[N])<0?-1:1;o.setXYZW(N,A.x,A.y,A.z,D)}for(let N=0,w=S.length;N<w;++N){const E=S[N],D=E.start,U=E.count;for(let z=D,nt=D+U;z<nt;z+=3)P(t.getX(z+0)),P(t.getX(z+1)),P(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _n(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new W,r=new W,o=new W,a=new W,l=new W,c=new W,u=new W,h=new W;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new _n(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rh=new de,Fi=new Xr,ho=new Qs,Ch=new W,fo=new W,po=new W,mo=new W,il=new W,go=new W,Ph=new W,_o=new W;class Re extends Te{constructor(t=new He,e=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){go.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(il.fromBufferAttribute(h,t),o?go.addScaledVector(il,u):go.addScaledVector(il.sub(e),u))}e.add(go)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ho.copy(i.boundingSphere),ho.applyMatrix4(r),Fi.copy(t.ray).recast(t.near),!(ho.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(ho,Ch)===null||Fi.origin.distanceToSquared(Ch)>(t.far-t.near)**2))&&(Rh.copy(r).invert(),Fi.copy(t.ray).applyMatrix4(Rh),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Fi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],S=Math.max(m.start,p.start),A=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,k=A;M<k;M+=3){const L=a.getX(M),P=a.getX(M+1),N=a.getX(M+2);s=vo(this,d,t,i,c,u,h,L,P,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const S=a.getX(m),A=a.getX(m+1),M=a.getX(m+2);s=vo(this,o,t,i,c,u,h,S,A,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],S=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=S,k=A;M<k;M+=3){const L=M,P=M+1,N=M+2;s=vo(this,d,t,i,c,u,h,L,P,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const S=m,A=m+1,M=m+2;s=vo(this,o,t,i,c,u,h,S,A,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function $0(n,t,e,i,s,r,o,a){let l;if(t.side===en?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Li,a),l===null)return null;_o.copy(a),_o.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(_o);return c<e.near||c>e.far?null:{distance:c,point:_o.clone(),object:n}}function vo(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,fo),n.getVertexPosition(l,po),n.getVertexPosition(c,mo);const u=$0(n,t,e,i,fo,po,mo,Ph);if(u){const h=new W;bn.getBarycoord(Ph,fo,po,mo,h),s&&(u.uv=bn.getInterpolatedAttribute(s,a,l,c,h,new Ft)),r&&(u.uv1=bn.getInterpolatedAttribute(r,a,l,c,h,new Ft)),o&&(u.normal=bn.getInterpolatedAttribute(o,a,l,c,h,new W),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new W,materialIndex:0};bn.getNormal(fo,po,mo,f.normal),u.face=f,u.barycoord=h}return u}class jr extends He{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(u,3)),this.setAttribute("uv",new Se(h,2));function g(_,m,d,S,A,M,k,L,P,N,w){const E=M/P,D=k/N,U=M/2,z=k/2,nt=L/2,ot=P+1,et=N+1;let it=0,Y=0;const gt=new W;for(let yt=0;yt<et;yt++){const Ct=yt*D-z;for(let Ut=0;Ut<ot;Ut++){const Kt=Ut*E-U;gt[_]=Kt*S,gt[m]=Ct*A,gt[d]=nt,c.push(gt.x,gt.y,gt.z),gt[_]=0,gt[m]=0,gt[d]=L>0?1:-1,u.push(gt.x,gt.y,gt.z),h.push(Ut/P),h.push(1-yt/N),it+=1}}for(let yt=0;yt<N;yt++)for(let Ct=0;Ct<P;Ct++){const Ut=f+Ct+ot*yt,Kt=f+Ct+ot*(yt+1),at=f+(Ct+1)+ot*(yt+1),mt=f+(Ct+1)+ot*yt;l.push(Ut,Kt,mt),l.push(Kt,at,mt),Y+=6}a.addGroup(p,Y,w),p+=Y,f+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function $s(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ve(n){const t={};for(let e=0;e<n.length;e++){const i=$s(n[e]);for(const s in i)t[s]=i[s]}return t}function K0(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Ap(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const zr={clone:$s,merge:Ve};var Z0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Be extends is{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z0,this.fragmentShader=J0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$s(t.uniforms),this.uniformsGroups=K0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class wp extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=oi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new W,Dh=new Ft,Lh=new Ft;class pn extends wp{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_c*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(zo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _c*2*Math.atan(Math.tan(zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ei.x,Ei.y).multiplyScalar(-t/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ei.x,Ei.y).multiplyScalar(-t/Ei.z)}getViewSize(t,e){return this.getViewBounds(t,Dh,Lh),e.subVectors(Lh,Dh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(zo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _s=-90,vs=1;class Q0 extends Te{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(_s,vs,t,e);s.layers=this.layers,this.add(s);const r=new pn(_s,vs,t,e);r.layers=this.layers,this.add(r);const o=new pn(_s,vs,t,e);o.layers=this.layers,this.add(o);const a=new pn(_s,vs,t,e);a.layers=this.layers,this.add(a);const l=new pn(_s,vs,t,e);l.layers=this.layers,this.add(l);const c=new pn(_s,vs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===oi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Rp extends $e{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Xs,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tx extends wn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Rp(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new jr(5,5,5),r=new Be({name:"CubemapFromEquirect",uniforms:$s(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:en,blending:ai});r.uniforms.tEquirect.value=e;const o=new Re(s,r),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=Tn),new Q0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const sl=new W,ex=new W,nx=new qt;class wi{constructor(t=new W(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=sl.subVectors(i,e).cross(ex.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(sl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||nx.getNormalMatrix(t),s=this.coplanarPoint(sl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new Qs,xo=new W;class Kc{constructor(t=new wi,e=new wi,i=new wi,s=new wi,r=new wi,o=new wi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=oi){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],h=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],S=s[13],A=s[14],M=s[15];if(i[0].setComponents(l-r,f-c,m-p,M-d).normalize(),i[1].setComponents(l+r,f+c,m+p,M+d).normalize(),i[2].setComponents(l+o,f+u,m+g,M+S).normalize(),i[3].setComponents(l-o,f-u,m-g,M-S).normalize(),i[4].setComponents(l-a,f-h,m-_,M-A).normalize(),e===oi)i[5].setComponents(l+a,f+h,m+_,M+A).normalize();else if(e===Zo)i[5].setComponents(a,h,_,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(t){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476,Bi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(xo.x=s.normal.x>0?t.max.x:t.min.x,xo.y=s.normal.y>0?t.max.y:t.min.y,xo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(xo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cp(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function ix(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class ya extends He{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const S=d*f-o;for(let A=0;A<c;A++){const M=A*h-r;g.push(M,-S,0),_.push(0,0,1),m.push(A/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<a;S++){const A=S+c*d,M=S+c*(d+1),k=S+1+c*(d+1),L=S+1+c*d;p.push(A,M,L),p.push(M,k,L)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ya(t.width,t.height,t.widthSegments,t.heightSegments)}}var sx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rx=`#ifdef USE_ALPHAHASH
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
#endif`,ox=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ax=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ux=`#ifdef USE_AOMAP
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
#endif`,hx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fx=`#ifdef USE_BATCHING
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
#endif`,dx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,px=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_x=`#ifdef USE_IRIDESCENCE
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
#endif`,vx=`#ifdef USE_BUMPMAP
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
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ex=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ax=`#if defined( USE_COLOR_ALPHA )
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
#endif`,wx=`#define PI 3.141592653589793
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
} // validated`,Rx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Cx=`vec3 transformedNormal = objectNormal;
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
#endif`,Px=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ix=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ux="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ox=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bx=`#ifdef USE_ENVMAP
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
#endif`,zx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hx=`#ifdef USE_ENVMAP
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
#endif`,kx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xx=`#ifdef USE_GRADIENTMAP
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
}`,jx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$x=`uniform bool receiveShadow;
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
#endif`,Kx=`#ifdef USE_ENVMAP
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
#endif`,Zx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eM=`PhysicalMaterial material;
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
#endif`,nM=`struct PhysicalMaterial {
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
}`,iM=`
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
#endif`,sM=`#if defined( RE_IndirectDiffuse )
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
#endif`,rM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,aM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dM=`#if defined( USE_POINTS_UV )
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
#endif`,pM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_M=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xM=`#ifdef USE_MORPHTARGETS
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
#endif`,MM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,SM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,EM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,AM=`#ifdef USE_NORMALMAP
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
#endif`,wM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,RM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,CM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,PM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,DM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,LM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,IM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,NM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,FM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,BM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,HM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,VM=`float getShadowMask() {
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
}`,GM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WM=`#ifdef USE_SKINNING
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
#endif`,XM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jM=`#ifdef USE_SKINNING
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
#endif`,qM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,YM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$M=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,KM=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZM=`#ifdef USE_TRANSMISSION
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
#endif`,JM=`#ifdef USE_TRANSMISSION
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
#endif`,QM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ty=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ey=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ny=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sy=`uniform sampler2D t2D;
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
}`,ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ly=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cy=`#include <common>
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
}`,uy=`#if DEPTH_PACKING == 3200
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
}`,hy=`#define DISTANCE
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
}`,fy=`#define DISTANCE
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
}`,dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,py=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,my=`uniform float scale;
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
}`,gy=`uniform vec3 diffuse;
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
}`,_y=`#include <common>
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
}`,vy=`uniform vec3 diffuse;
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
}`,xy=`#define LAMBERT
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
}`,My=`#define LAMBERT
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
}`,yy=`#define MATCAP
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
}`,Sy=`#define MATCAP
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
}`,Ey=`#define NORMAL
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
}`,by=`#define NORMAL
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
}`,Ty=`#define PHONG
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
}`,Ay=`#define PHONG
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
}`,wy=`#define STANDARD
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
}`,Ry=`#define STANDARD
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
}`,Cy=`#define TOON
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
}`,Py=`#define TOON
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
}`,Dy=`uniform float size;
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
}`,Ly=`uniform vec3 diffuse;
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
}`,Iy=`#include <common>
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
}`,Uy=`uniform vec3 color;
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
}`,Ny=`uniform float rotation;
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
}`,Oy=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:sx,alphahash_pars_fragment:rx,alphamap_fragment:ox,alphamap_pars_fragment:ax,alphatest_fragment:lx,alphatest_pars_fragment:cx,aomap_fragment:ux,aomap_pars_fragment:hx,batching_pars_vertex:fx,batching_vertex:dx,begin_vertex:px,beginnormal_vertex:mx,bsdfs:gx,iridescence_fragment:_x,bumpmap_pars_fragment:vx,clipping_planes_fragment:xx,clipping_planes_pars_fragment:Mx,clipping_planes_pars_vertex:yx,clipping_planes_vertex:Sx,color_fragment:Ex,color_pars_fragment:bx,color_pars_vertex:Tx,color_vertex:Ax,common:wx,cube_uv_reflection_fragment:Rx,defaultnormal_vertex:Cx,displacementmap_pars_vertex:Px,displacementmap_vertex:Dx,emissivemap_fragment:Lx,emissivemap_pars_fragment:Ix,colorspace_fragment:Ux,colorspace_pars_fragment:Nx,envmap_fragment:Ox,envmap_common_pars_fragment:Fx,envmap_pars_fragment:Bx,envmap_pars_vertex:zx,envmap_physical_pars_fragment:Kx,envmap_vertex:Hx,fog_vertex:kx,fog_pars_vertex:Vx,fog_fragment:Gx,fog_pars_fragment:Wx,gradientmap_pars_fragment:Xx,lightmap_pars_fragment:jx,lights_lambert_fragment:qx,lights_lambert_pars_fragment:Yx,lights_pars_begin:$x,lights_toon_fragment:Zx,lights_toon_pars_fragment:Jx,lights_phong_fragment:Qx,lights_phong_pars_fragment:tM,lights_physical_fragment:eM,lights_physical_pars_fragment:nM,lights_fragment_begin:iM,lights_fragment_maps:sM,lights_fragment_end:rM,logdepthbuf_fragment:oM,logdepthbuf_pars_fragment:aM,logdepthbuf_pars_vertex:lM,logdepthbuf_vertex:cM,map_fragment:uM,map_pars_fragment:hM,map_particle_fragment:fM,map_particle_pars_fragment:dM,metalnessmap_fragment:pM,metalnessmap_pars_fragment:mM,morphinstance_vertex:gM,morphcolor_vertex:_M,morphnormal_vertex:vM,morphtarget_pars_vertex:xM,morphtarget_vertex:MM,normal_fragment_begin:yM,normal_fragment_maps:SM,normal_pars_fragment:EM,normal_pars_vertex:bM,normal_vertex:TM,normalmap_pars_fragment:AM,clearcoat_normal_fragment_begin:wM,clearcoat_normal_fragment_maps:RM,clearcoat_pars_fragment:CM,iridescence_pars_fragment:PM,opaque_fragment:DM,packing:LM,premultiplied_alpha_fragment:IM,project_vertex:UM,dithering_fragment:NM,dithering_pars_fragment:OM,roughnessmap_fragment:FM,roughnessmap_pars_fragment:BM,shadowmap_pars_fragment:zM,shadowmap_pars_vertex:HM,shadowmap_vertex:kM,shadowmask_pars_fragment:VM,skinbase_vertex:GM,skinning_pars_vertex:WM,skinning_vertex:XM,skinnormal_vertex:jM,specularmap_fragment:qM,specularmap_pars_fragment:YM,tonemapping_fragment:$M,tonemapping_pars_fragment:KM,transmission_fragment:ZM,transmission_pars_fragment:JM,uv_pars_fragment:QM,uv_pars_vertex:ty,uv_vertex:ey,worldpos_vertex:ny,background_vert:iy,background_frag:sy,backgroundCube_vert:ry,backgroundCube_frag:oy,cube_vert:ay,cube_frag:ly,depth_vert:cy,depth_frag:uy,distanceRGBA_vert:hy,distanceRGBA_frag:fy,equirect_vert:dy,equirect_frag:py,linedashed_vert:my,linedashed_frag:gy,meshbasic_vert:_y,meshbasic_frag:vy,meshlambert_vert:xy,meshlambert_frag:My,meshmatcap_vert:yy,meshmatcap_frag:Sy,meshnormal_vert:Ey,meshnormal_frag:by,meshphong_vert:Ty,meshphong_frag:Ay,meshphysical_vert:wy,meshphysical_frag:Ry,meshtoon_vert:Cy,meshtoon_frag:Py,points_vert:Dy,points_frag:Ly,shadow_vert:Iy,shadow_frag:Uy,sprite_vert:Ny,sprite_frag:Oy},Tt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},Nn={basic:{uniforms:Ve([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ve([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ve([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ve([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ve([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ve([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ve([Tt.points,Tt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ve([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ve([Tt.common,Tt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ve([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ve([Tt.sprite,Tt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ve([Tt.common,Tt.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ve([Tt.lights,Tt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};Nn.physical={uniforms:Ve([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Mo={r:0,b:0,g:0},zi=new Wn,Fy=new de;function By(n,t,e,i,s,r,o){const a=new Gt(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function g(S){let A=S.isScene===!0?S.background:null;return A&&A.isTexture&&(A=(S.backgroundBlurriness>0?e:t).get(A)),A}function _(S){let A=!1;const M=g(S);M===null?d(a,l):M&&M.isColor&&(d(M,1),A=!0);const k=n.xr.getEnvironmentBlendMode();k==="additive"?i.buffers.color.setClear(0,0,0,1,o):k==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,A){const M=g(A);M&&(M.isCubeTexture||M.mapping===xa)?(u===void 0&&(u=new Re(new jr(1,1,1),new Be({name:"BackgroundCubeMaterial",uniforms:$s(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(k,L,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),zi.copy(A.backgroundRotation),zi.x*=-1,zi.y*=-1,zi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fy.makeRotationFromEuler(zi)),u.material.toneMapped=Qt.getTransfer(M.colorSpace)!==ce,(h!==M||f!==M.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Re(new ya(2,2),new Be({name:"BackgroundMaterial",uniforms:$s(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:Li,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(M.colorSpace)!==ce,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,f=M.version,p=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function d(S,A){S.getRGB(Mo,Ap(n)),i.buffers.color.setClear(Mo.r,Mo.g,Mo.b,A,o)}return{getClearColor:function(){return a},setClearColor:function(S,A=1){a.set(S),l=A,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,d(a,l)},render:_,addToRenderList:m}}function zy(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(E,D,U,z,nt){let ot=!1;const et=h(z,U,D);r!==et&&(r=et,c(r.object)),ot=p(E,z,U,nt),ot&&g(E,z,U,nt),nt!==null&&t.update(nt,n.ELEMENT_ARRAY_BUFFER),(ot||o)&&(o=!1,M(E,D,U,z),nt!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(nt).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function h(E,D,U){const z=U.wireframe===!0;let nt=i[E.id];nt===void 0&&(nt={},i[E.id]=nt);let ot=nt[D.id];ot===void 0&&(ot={},nt[D.id]=ot);let et=ot[z];return et===void 0&&(et=f(l()),ot[z]=et),et}function f(E){const D=[],U=[],z=[];for(let nt=0;nt<e;nt++)D[nt]=0,U[nt]=0,z[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:z,object:E,attributes:{},index:null}}function p(E,D,U,z){const nt=r.attributes,ot=D.attributes;let et=0;const it=U.getAttributes();for(const Y in it)if(it[Y].location>=0){const yt=nt[Y];let Ct=ot[Y];if(Ct===void 0&&(Y==="instanceMatrix"&&E.instanceMatrix&&(Ct=E.instanceMatrix),Y==="instanceColor"&&E.instanceColor&&(Ct=E.instanceColor)),yt===void 0||yt.attribute!==Ct||Ct&&yt.data!==Ct.data)return!0;et++}return r.attributesNum!==et||r.index!==z}function g(E,D,U,z){const nt={},ot=D.attributes;let et=0;const it=U.getAttributes();for(const Y in it)if(it[Y].location>=0){let yt=ot[Y];yt===void 0&&(Y==="instanceMatrix"&&E.instanceMatrix&&(yt=E.instanceMatrix),Y==="instanceColor"&&E.instanceColor&&(yt=E.instanceColor));const Ct={};Ct.attribute=yt,yt&&yt.data&&(Ct.data=yt.data),nt[Y]=Ct,et++}r.attributes=nt,r.attributesNum=et,r.index=z}function _(){const E=r.newAttributes;for(let D=0,U=E.length;D<U;D++)E[D]=0}function m(E){d(E,0)}function d(E,D){const U=r.newAttributes,z=r.enabledAttributes,nt=r.attributeDivisors;U[E]=1,z[E]===0&&(n.enableVertexAttribArray(E),z[E]=1),nt[E]!==D&&(n.vertexAttribDivisor(E,D),nt[E]=D)}function S(){const E=r.newAttributes,D=r.enabledAttributes;for(let U=0,z=D.length;U<z;U++)D[U]!==E[U]&&(n.disableVertexAttribArray(U),D[U]=0)}function A(E,D,U,z,nt,ot,et){et===!0?n.vertexAttribIPointer(E,D,U,nt,ot):n.vertexAttribPointer(E,D,U,z,nt,ot)}function M(E,D,U,z){_();const nt=z.attributes,ot=U.getAttributes(),et=D.defaultAttributeValues;for(const it in ot){const Y=ot[it];if(Y.location>=0){let gt=nt[it];if(gt===void 0&&(it==="instanceMatrix"&&E.instanceMatrix&&(gt=E.instanceMatrix),it==="instanceColor"&&E.instanceColor&&(gt=E.instanceColor)),gt!==void 0){const yt=gt.normalized,Ct=gt.itemSize,Ut=t.get(gt);if(Ut===void 0)continue;const Kt=Ut.buffer,at=Ut.type,mt=Ut.bytesPerElement,At=at===n.INT||at===n.UNSIGNED_INT||gt.gpuType===Gc;if(gt.isInterleavedBufferAttribute){const O=gt.data,$=O.stride,V=gt.offset;if(O.isInstancedInterleavedBuffer){for(let lt=0;lt<Y.locationSize;lt++)d(Y.location+lt,O.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let lt=0;lt<Y.locationSize;lt++)m(Y.location+lt);n.bindBuffer(n.ARRAY_BUFFER,Kt);for(let lt=0;lt<Y.locationSize;lt++)A(Y.location+lt,Ct/Y.locationSize,at,yt,$*mt,(V+Ct/Y.locationSize*lt)*mt,At)}else{if(gt.isInstancedBufferAttribute){for(let O=0;O<Y.locationSize;O++)d(Y.location+O,gt.meshPerAttribute);E.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let O=0;O<Y.locationSize;O++)m(Y.location+O);n.bindBuffer(n.ARRAY_BUFFER,Kt);for(let O=0;O<Y.locationSize;O++)A(Y.location+O,Ct/Y.locationSize,at,yt,Ct*mt,Ct/Y.locationSize*O*mt,At)}}else if(et!==void 0){const yt=et[it];if(yt!==void 0)switch(yt.length){case 2:n.vertexAttrib2fv(Y.location,yt);break;case 3:n.vertexAttrib3fv(Y.location,yt);break;case 4:n.vertexAttrib4fv(Y.location,yt);break;default:n.vertexAttrib1fv(Y.location,yt)}}}}S()}function k(){N();for(const E in i){const D=i[E];for(const U in D){const z=D[U];for(const nt in z)u(z[nt].object),delete z[nt];delete D[U]}delete i[E]}}function L(E){if(i[E.id]===void 0)return;const D=i[E.id];for(const U in D){const z=D[U];for(const nt in z)u(z[nt].object),delete z[nt];delete D[U]}delete i[E.id]}function P(E){for(const D in i){const U=i[D];if(U[E.id]===void 0)continue;const z=U[E.id];for(const nt in z)u(z[nt].object),delete z[nt];delete U[E.id]}}function N(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:w,dispose:k,releaseStatesOfGeometry:L,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Hy(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ky(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==mn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const N=P===li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Gn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ri&&!N)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),k=g>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:S,maxVaryings:A,maxFragmentUniforms:M,vertexTextures:k,maxSamples:L}}function Vy(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new wi,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:i,A=S*4;let M=d.clippingState||null;l.value=M,M=u(g,f,A,p);for(let k=0;k!==A;++k)M[k]=e[k];d.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<d)&&(m=new Float32Array(d));for(let A=0,M=p;A!==_;++A,M+=4)o.copy(h[A]).applyMatrix4(S,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Gy(n){let t=new WeakMap;function e(o,a){return a===Vl?o.mapping=Xs:a===Gl&&(o.mapping=js),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Vl||a===Gl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new tx(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Zc extends wp{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ts=4,Ih=[.125,.215,.35,.446,.526,.582],Xi=20,rl=new Zc,Uh=new Gt;let ol=null,al=0,ll=0,cl=!1;const Vi=(1+Math.sqrt(5))/2,xs=1/Vi,Nh=[new W(-Vi,xs,0),new W(Vi,xs,0),new W(-xs,0,Vi),new W(xs,0,Vi),new W(0,Vi,-xs),new W(0,Vi,xs),new W(-1,1,-1),new W(1,1,-1),new W(-1,1,1),new W(1,1,1)];class Oh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ol,al,ll),this._renderer.xr.enabled=cl,t.scissorTest=!1,yo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xs||t.mapping===js?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),ll=this._renderer.getActiveMipmapLevel(),cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:li,format:mn,colorSpace:Js,depthBuffer:!1},s=Fh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wy(r)),this._blurMaterial=Xy(r,t,e)}return s}_compileMaterial(t){const e=new Re(this._lodPlanes[0],t);this._renderer.compile(e,rl)}_sceneToCubeUV(t,e,i,s){const a=new pn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Uh),u.toneMapping=Pi,u.autoClear=!1;const p=new fn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new Re(new jr,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Uh),_=!0);for(let d=0;d<6;d++){const S=d%3;S===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):S===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const A=this._cubeSize;yo(s,S*A,d>2?A:0,A,A),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Xs||t.mapping===js;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Re(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;yo(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,rl)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Nh[(s-r-1)%Nh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Re(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Xi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Xi;m>Xi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Xi}`);const d=[];let S=0;for(let P=0;P<Xi;++P){const N=P/_,w=Math.exp(-N*N/2);d.push(w),P===0?S+=w:P<m&&(S+=2*w)}for(let P=0;P<d.length;P++)d[P]=d[P]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:A}=this;f.dTheta.value=g,f.mipInt.value=A-i;const M=this._sizeLods[s],k=3*M*(s>A-Ts?s-A+Ts:0),L=4*(this._cubeSize-M);yo(e,k,L,3*M,2*M),l.setRenderTarget(e),l.render(h,rl)}}function Wy(n){const t=[],e=[],i=[];let s=n;const r=n-Ts+1+Ih.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Ts?l=Ih[o-n+Ts-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,S=new Float32Array(_*g*p),A=new Float32Array(m*g*p),M=new Float32Array(d*g*p);for(let L=0;L<p;L++){const P=L%3*2/3-1,N=L>2?0:-1,w=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];S.set(w,_*g*L),A.set(f,m*g*L);const E=[L,L,L,L,L,L];M.set(E,d*g*L)}const k=new He;k.setAttribute("position",new _n(S,_)),k.setAttribute("uv",new _n(A,m)),k.setAttribute("faceIndex",new _n(M,d)),t.push(k),s>Ts&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Fh(n,t,e){const i=new wn(n,t,e);return i.texture.mapping=xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Xy(n,t,e){const i=new Float32Array(Xi),s=new W(0,1,0);return new Be({name:"SphericalGaussianBlur",defines:{n:Xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Jc(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Bh(){return new Be({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jc(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function zh(){return new Be({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Jc(){return`

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
	`}function jy(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Vl||l===Gl,u=l===Xs||l===js;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Oh(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new Oh(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function qy(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&xr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Yy(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let A=0,M=S.length;A<M;A+=3){const k=S[A+0],L=S[A+1],P=S[A+2];f.push(k,L,L,P,P,k)}}else if(g!==void 0){const S=g.array;_=g.version;for(let A=0,M=S.length/3-1;A<M;A+=3){const k=A+0,L=A+1,P=A+2;f.push(k,L,L,P,P,k)}}else return;const m=new(Mp(f)?Tp:bp)(f,1);m.version=_;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function $y(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),e.update(p,i,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function h(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,_,0,g);let d=0;for(let S=0;S<g;S++)d+=p[S]*_[S];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ky(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Zy(n,t,e){const i=new WeakMap,s=new ye;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let E=function(){N.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var p=E;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],A=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let k=a.attributes.position.count*M,L=1;k>t.maxTextureSize&&(L=Math.ceil(k/t.maxTextureSize),k=t.maxTextureSize);const P=new Float32Array(k*L*4*h),N=new Sp(P,k,L,h);N.type=ri,N.needsUpdate=!0;const w=M*4;for(let D=0;D<h;D++){const U=d[D],z=S[D],nt=A[D],ot=k*L*4*D;for(let et=0;et<U.count;et++){const it=et*w;g===!0&&(s.fromBufferAttribute(U,et),P[ot+it+0]=s.x,P[ot+it+1]=s.y,P[ot+it+2]=s.z,P[ot+it+3]=0),_===!0&&(s.fromBufferAttribute(z,et),P[ot+it+4]=s.x,P[ot+it+5]=s.y,P[ot+it+6]=s.z,P[ot+it+7]=0),m===!0&&(s.fromBufferAttribute(nt,et),P[ot+it+8]=s.x,P[ot+it+9]=s.y,P[ot+it+10]=s.z,P[ot+it+11]=nt.itemSize===4?s.w:1)}}f={count:h,texture:N,size:new Ft(k,L)},i.set(a,f),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Jy(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Pp extends $e{constructor(t,e,i,s,r,o,a,l,c,u=Ns){if(u!==Ns&&u!==Ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ns&&(i=Zi),i===void 0&&u===Ys&&(i=qs),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:cn,this.minFilter=l!==void 0?l:cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Dp=new $e,Hh=new Pp(1,1),Lp=new Sp,Ip=new z0,Up=new Rp,kh=[],Vh=[],Gh=new Float32Array(16),Wh=new Float32Array(9),Xh=new Float32Array(4);function tr(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=kh[s];if(r===void 0&&(r=new Float32Array(s),kh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ce(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Pe(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Sa(n,t){let e=Vh[t];e===void 0&&(e=new Int32Array(t),Vh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Qy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function tS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2fv(this.addr,t),Pe(e,t)}}function eS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;n.uniform3fv(this.addr,t),Pe(e,t)}}function nS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4fv(this.addr,t),Pe(e,t)}}function iS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;Xh.set(i),n.uniformMatrix2fv(this.addr,!1,Xh),Pe(e,i)}}function sS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;Wh.set(i),n.uniformMatrix3fv(this.addr,!1,Wh),Pe(e,i)}}function rS(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,i))return;Gh.set(i),n.uniformMatrix4fv(this.addr,!1,Gh),Pe(e,i)}}function oS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function aS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2iv(this.addr,t),Pe(e,t)}}function lS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3iv(this.addr,t),Pe(e,t)}}function cS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4iv(this.addr,t),Pe(e,t)}}function uS(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function hS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2uiv(this.addr,t),Pe(e,t)}}function fS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3uiv(this.addr,t),Pe(e,t)}}function dS(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4uiv(this.addr,t),Pe(e,t)}}function pS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Hh.compareFunction=xp,r=Hh):r=Dp,e.setTexture2D(t||r,s)}function mS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Ip,s)}function gS(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Up,s)}function _S(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Lp,s)}function vS(n){switch(n){case 5126:return Qy;case 35664:return tS;case 35665:return eS;case 35666:return nS;case 35674:return iS;case 35675:return sS;case 35676:return rS;case 5124:case 35670:return oS;case 35667:case 35671:return aS;case 35668:case 35672:return lS;case 35669:case 35673:return cS;case 5125:return uS;case 36294:return hS;case 36295:return fS;case 36296:return dS;case 35678:case 36198:case 36298:case 36306:case 35682:return pS;case 35679:case 36299:case 36307:return mS;case 35680:case 36300:case 36308:case 36293:return gS;case 36289:case 36303:case 36311:case 36292:return _S}}function xS(n,t){n.uniform1fv(this.addr,t)}function MS(n,t){const e=tr(t,this.size,2);n.uniform2fv(this.addr,e)}function yS(n,t){const e=tr(t,this.size,3);n.uniform3fv(this.addr,e)}function SS(n,t){const e=tr(t,this.size,4);n.uniform4fv(this.addr,e)}function ES(n,t){const e=tr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function bS(n,t){const e=tr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function TS(n,t){const e=tr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function AS(n,t){n.uniform1iv(this.addr,t)}function wS(n,t){n.uniform2iv(this.addr,t)}function RS(n,t){n.uniform3iv(this.addr,t)}function CS(n,t){n.uniform4iv(this.addr,t)}function PS(n,t){n.uniform1uiv(this.addr,t)}function DS(n,t){n.uniform2uiv(this.addr,t)}function LS(n,t){n.uniform3uiv(this.addr,t)}function IS(n,t){n.uniform4uiv(this.addr,t)}function US(n,t,e){const i=this.cache,s=t.length,r=Sa(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Dp,r[o])}function NS(n,t,e){const i=this.cache,s=t.length,r=Sa(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ip,r[o])}function OS(n,t,e){const i=this.cache,s=t.length,r=Sa(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Up,r[o])}function FS(n,t,e){const i=this.cache,s=t.length,r=Sa(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Pe(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Lp,r[o])}function BS(n){switch(n){case 5126:return xS;case 35664:return MS;case 35665:return yS;case 35666:return SS;case 35674:return ES;case 35675:return bS;case 35676:return TS;case 5124:case 35670:return AS;case 35667:case 35671:return wS;case 35668:case 35672:return RS;case 35669:case 35673:return CS;case 5125:return PS;case 36294:return DS;case 36295:return LS;case 36296:return IS;case 35678:case 36198:case 36298:case 36306:case 35682:return US;case 35679:case 36299:case 36307:return NS;case 35680:case 36300:case 36308:case 36293:return OS;case 36289:case 36303:case 36311:case 36292:return FS}}class zS{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=vS(e.type)}}class HS{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=BS(e.type)}}class kS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ul=/(\w+)(\])?(\[|\.)?/g;function jh(n,t){n.seq.push(t),n.map[t.id]=t}function VS(n,t,e){const i=n.name,s=i.length;for(ul.lastIndex=0;;){const r=ul.exec(i),o=ul.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){jh(e,c===void 0?new zS(a,n,t):new HS(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new kS(a),jh(e,h)),e=h}}}class Ho{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);VS(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function qh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const GS=37297;let WS=0;function XS(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Yh=new qt;function jS(n){Qt._getMatrix(Yh,Qt.workingColorSpace,n);const t=`mat3( ${Yh.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(n)){case Ma:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function $h(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+XS(n.getShaderSource(t),o)}else return s}function qS(n,t){const e=jS(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function YS(n,t){let e;switch(t){case np:e="Linear";break;case ip:e="Reinhard";break;case sp:e="Cineon";break;case Vc:e="ACESFilmic";break;case rp:e="AgX";break;case op:e="Neutral";break;case _0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const So=new W;function $S(){Qt.getLuminanceCoefficients(So);const n=So.x.toFixed(4),t=So.y.toFixed(4),e=So.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function KS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function ZS(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function JS(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Mr(n){return n!==""}function Kh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const QS=/^[ \t]*#include +<([\w\d./]+)>/gm;function vc(n){return n.replace(QS,eE)}const tE=new Map;function eE(n,t){let e=Yt[t];if(e===void 0){const i=tE.get(t);if(i!==void 0)e=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return vc(e)}const nE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jh(n){return n.replace(nE,iE)}function iE(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qh(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function sE(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===tp?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Kv?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ti&&(t="SHADOWMAP_TYPE_VSM"),t}function rE(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Xs:case js:t="ENVMAP_TYPE_CUBE";break;case xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function oE(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case js:t="ENVMAP_MODE_REFRACTION";break}return t}function aE(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ep:t="ENVMAP_BLENDING_MULTIPLY";break;case m0:t="ENVMAP_BLENDING_MIX";break;case g0:t="ENVMAP_BLENDING_ADD";break}return t}function lE(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function cE(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=sE(e),c=rE(e),u=oE(e),h=aE(e),f=lE(e),p=KS(e),g=ZS(r),_=s.createProgram();let m,d,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Mr).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Mr).join(`
`),d.length>0&&(d+=`
`)):(m=[Qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),d=[Qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pi?"#define TONE_MAPPING":"",e.toneMapping!==Pi?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Pi?YS("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,qS("linearToOutputTexel",e.outputColorSpace),$S(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Mr).join(`
`)),o=vc(o),o=Kh(o,e),o=Zh(o,e),a=vc(a),a=Kh(a,e),a=Zh(a,e),o=Jh(o),a=Jh(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===fh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const A=S+m+o,M=S+d+a,k=qh(s,s.VERTEX_SHADER,A),L=qh(s,s.FRAGMENT_SHADER,M);s.attachShader(_,k),s.attachShader(_,L),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(D){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),z=s.getShaderInfoLog(k).trim(),nt=s.getShaderInfoLog(L).trim();let ot=!0,et=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ot=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,k,L);else{const it=$h(s,k,"vertex"),Y=$h(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+it+`
`+Y)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(z===""||nt==="")&&(et=!1);et&&(D.diagnostics={runnable:ot,programLog:U,vertexShader:{log:z,prefix:m},fragmentShader:{log:nt,prefix:d}})}s.deleteShader(k),s.deleteShader(L),N=new Ho(s,_),w=JS(s,_)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,GS)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=WS++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=k,this.fragmentShader=L,this}let uE=0;class hE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new fE(t),e.set(t,i)),i}}class fE{constructor(t){this.id=uE++,this.code=t,this.usedTimes=0}}function dE(n,t,e,i,s,r,o){const a=new $c,l=new hE,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,E,D,U,z){const nt=U.fog,ot=z.geometry,et=w.isMeshStandardMaterial?U.environment:null,it=(w.isMeshStandardMaterial?e:t).get(w.envMap||et),Y=it&&it.mapping===xa?it.image.height:null,gt=g[w.type];w.precision!==null&&(p=s.getMaxPrecision(w.precision),p!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",p,"instead."));const yt=ot.morphAttributes.position||ot.morphAttributes.normal||ot.morphAttributes.color,Ct=yt!==void 0?yt.length:0;let Ut=0;ot.morphAttributes.position!==void 0&&(Ut=1),ot.morphAttributes.normal!==void 0&&(Ut=2),ot.morphAttributes.color!==void 0&&(Ut=3);let Kt,at,mt,At;if(gt){const Jt=Nn[gt];Kt=Jt.vertexShader,at=Jt.fragmentShader}else Kt=w.vertexShader,at=w.fragmentShader,l.update(w),mt=l.getVertexShaderID(w),At=l.getFragmentShaderID(w);const O=n.getRenderTarget(),$=n.state.buffers.depth.getReversed(),V=z.isInstancedMesh===!0,lt=z.isBatchedMesh===!0,vt=!!w.map,T=!!w.matcap,C=!!it,y=!!w.aoMap,st=!!w.lightMap,J=!!w.bumpMap,I=!!w.normalMap,H=!!w.displacementMap,Z=!!w.emissiveMap,j=!!w.metalnessMap,x=!!w.roughnessMap,v=w.anisotropy>0,R=w.clearcoat>0,F=w.dispersion>0,K=w.iridescence>0,q=w.sheen>0,dt=w.transmission>0,ft=v&&!!w.anisotropyMap,ct=R&&!!w.clearcoatMap,St=R&&!!w.clearcoatNormalMap,ut=R&&!!w.clearcoatRoughnessMap,Et=K&&!!w.iridescenceMap,Pt=K&&!!w.iridescenceThicknessMap,Nt=q&&!!w.sheenColorMap,xt=q&&!!w.sheenRoughnessMap,Bt=!!w.specularMap,zt=!!w.specularColorMap,te=!!w.specularIntensityMap,B=dt&&!!w.transmissionMap,Mt=dt&&!!w.thicknessMap,rt=!!w.gradientMap,pt=!!w.alphaMap,bt=w.alphaTest>0,wt=!!w.alphaHash,Wt=!!w.extensions;let ve=Pi;w.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(ve=n.toneMapping);const Ee={shaderID:gt,shaderType:w.type,shaderName:w.name,vertexShader:Kt,fragmentShader:at,defines:w.defines,customVertexShaderID:mt,customFragmentShaderID:At,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:p,batching:lt,batchingColor:lt&&z._colorsTexture!==null,instancing:V,instancingColor:V&&z.instanceColor!==null,instancingMorph:V&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:O===null?n.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Js,alphaToCoverage:!!w.alphaToCoverage,map:vt,matcap:T,envMap:C,envMapMode:C&&it.mapping,envMapCubeUVHeight:Y,aoMap:y,lightMap:st,bumpMap:J,normalMap:I,displacementMap:f&&H,emissiveMap:Z,normalMapObjectSpace:I&&w.normalMapType===y0,normalMapTangentSpace:I&&w.normalMapType===vp,metalnessMap:j,roughnessMap:x,anisotropy:v,anisotropyMap:ft,clearcoat:R,clearcoatMap:ct,clearcoatNormalMap:St,clearcoatRoughnessMap:ut,dispersion:F,iridescence:K,iridescenceMap:Et,iridescenceThicknessMap:Pt,sheen:q,sheenColorMap:Nt,sheenRoughnessMap:xt,specularMap:Bt,specularColorMap:zt,specularIntensityMap:te,transmission:dt,transmissionMap:B,thicknessMap:Mt,gradientMap:rt,opaque:w.transparent===!1&&w.blending===Is&&w.alphaToCoverage===!1,alphaMap:pt,alphaTest:bt,alphaHash:wt,combine:w.combine,mapUv:vt&&_(w.map.channel),aoMapUv:y&&_(w.aoMap.channel),lightMapUv:st&&_(w.lightMap.channel),bumpMapUv:J&&_(w.bumpMap.channel),normalMapUv:I&&_(w.normalMap.channel),displacementMapUv:H&&_(w.displacementMap.channel),emissiveMapUv:Z&&_(w.emissiveMap.channel),metalnessMapUv:j&&_(w.metalnessMap.channel),roughnessMapUv:x&&_(w.roughnessMap.channel),anisotropyMapUv:ft&&_(w.anisotropyMap.channel),clearcoatMapUv:ct&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:St&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(w.sheenRoughnessMap.channel),specularMapUv:Bt&&_(w.specularMap.channel),specularColorMapUv:zt&&_(w.specularColorMap.channel),specularIntensityMapUv:te&&_(w.specularIntensityMap.channel),transmissionMapUv:B&&_(w.transmissionMap.channel),thicknessMapUv:Mt&&_(w.thicknessMap.channel),alphaMapUv:pt&&_(w.alphaMap.channel),vertexTangents:!!ot.attributes.tangent&&(I||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ot.attributes.color&&ot.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!ot.attributes.uv&&(vt||pt),fog:!!nt,useFog:w.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:$,skinning:z.isSkinnedMesh===!0,morphTargets:ot.morphAttributes.position!==void 0,morphNormals:ot.morphAttributes.normal!==void 0,morphColors:ot.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Ut,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:vt&&w.map.isVideoTexture===!0&&Qt.getTransfer(w.map.colorSpace)===ce,decodeVideoTextureEmissive:Z&&w.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(w.emissiveMap.colorSpace)===ce,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===En,flipSided:w.side===en,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Wt&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wt&&w.extensions.multiDraw===!0||lt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function d(w){const E=[];if(w.shaderID?E.push(w.shaderID):(E.push(w.customVertexShaderID),E.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)E.push(D),E.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(S(E,w),A(E,w),E.push(n.outputColorSpace)),E.push(w.customProgramCacheKey),E.join()}function S(w,E){w.push(E.precision),w.push(E.outputColorSpace),w.push(E.envMapMode),w.push(E.envMapCubeUVHeight),w.push(E.mapUv),w.push(E.alphaMapUv),w.push(E.lightMapUv),w.push(E.aoMapUv),w.push(E.bumpMapUv),w.push(E.normalMapUv),w.push(E.displacementMapUv),w.push(E.emissiveMapUv),w.push(E.metalnessMapUv),w.push(E.roughnessMapUv),w.push(E.anisotropyMapUv),w.push(E.clearcoatMapUv),w.push(E.clearcoatNormalMapUv),w.push(E.clearcoatRoughnessMapUv),w.push(E.iridescenceMapUv),w.push(E.iridescenceThicknessMapUv),w.push(E.sheenColorMapUv),w.push(E.sheenRoughnessMapUv),w.push(E.specularMapUv),w.push(E.specularColorMapUv),w.push(E.specularIntensityMapUv),w.push(E.transmissionMapUv),w.push(E.thicknessMapUv),w.push(E.combine),w.push(E.fogExp2),w.push(E.sizeAttenuation),w.push(E.morphTargetsCount),w.push(E.morphAttributeCount),w.push(E.numDirLights),w.push(E.numPointLights),w.push(E.numSpotLights),w.push(E.numSpotLightMaps),w.push(E.numHemiLights),w.push(E.numRectAreaLights),w.push(E.numDirLightShadows),w.push(E.numPointLightShadows),w.push(E.numSpotLightShadows),w.push(E.numSpotLightShadowsWithMaps),w.push(E.numLightProbes),w.push(E.shadowMapType),w.push(E.toneMapping),w.push(E.numClippingPlanes),w.push(E.numClipIntersection),w.push(E.depthPacking)}function A(w,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),w.push(a.mask)}function M(w){const E=g[w.type];let D;if(E){const U=Nn[E];D=zr.clone(U.uniforms)}else D=w.uniforms;return D}function k(w,E){let D;for(let U=0,z=u.length;U<z;U++){const nt=u[U];if(nt.cacheKey===E){D=nt,++D.usedTimes;break}}return D===void 0&&(D=new cE(n,E,w,r),u.push(D)),D}function L(w){if(--w.usedTimes===0){const E=u.indexOf(w);u[E]=u[u.length-1],u.pop(),w.destroy()}}function P(w){l.remove(w)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:M,acquireProgram:k,releaseProgram:L,releaseShaderCache:P,programs:u,dispose:N}}function pE(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function mE(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function tf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ef(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,p,g,_,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),t++,d}function a(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||mE),i.length>1&&i.sort(f||tf),s.length>1&&s.sort(f||tf)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function gE(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new ef,n.set(i,[o])):s>=r.length?(o=new ef,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function _E(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new W,color:new Gt};break;case"SpotLight":e={position:new W,direction:new W,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new W,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new W,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new W,halfWidth:new W,halfHeight:new W};break}return n[t.id]=e,e}}}function vE(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let xE=0;function ME(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function yE(n){const t=new _E,e=vE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const s=new W,r=new de,o=new de;function a(c){let u=0,h=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,S=0,A=0,M=0,k=0,L=0,P=0;c.sort(ME);for(let w=0,E=c.length;w<E;w++){const D=c[w],U=D.color,z=D.intensity,nt=D.distance,ot=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=U.r*z,h+=U.g*z,f+=U.b*z;else if(D.isLightProbe){for(let et=0;et<9;et++)i.probe[et].addScaledVector(D.sh.coefficients[et],z);P++}else if(D.isDirectionalLight){const et=t.get(D);if(et.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const it=D.shadow,Y=e.get(D);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,i.directionalShadow[p]=Y,i.directionalShadowMap[p]=ot,i.directionalShadowMatrix[p]=D.shadow.matrix,S++}i.directional[p]=et,p++}else if(D.isSpotLight){const et=t.get(D);et.position.setFromMatrixPosition(D.matrixWorld),et.color.copy(U).multiplyScalar(z),et.distance=nt,et.coneCos=Math.cos(D.angle),et.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),et.decay=D.decay,i.spot[_]=et;const it=D.shadow;if(D.map&&(i.spotLightMap[k]=D.map,k++,it.updateMatrices(D),D.castShadow&&L++),i.spotLightMatrix[_]=it.matrix,D.castShadow){const Y=e.get(D);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,i.spotShadow[_]=Y,i.spotShadowMap[_]=ot,M++}_++}else if(D.isRectAreaLight){const et=t.get(D);et.color.copy(U).multiplyScalar(z),et.halfWidth.set(D.width*.5,0,0),et.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=et,m++}else if(D.isPointLight){const et=t.get(D);if(et.color.copy(D.color).multiplyScalar(D.intensity),et.distance=D.distance,et.decay=D.decay,D.castShadow){const it=D.shadow,Y=e.get(D);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,Y.shadowCameraNear=it.camera.near,Y.shadowCameraFar=it.camera.far,i.pointShadow[g]=Y,i.pointShadowMap[g]=ot,i.pointShadowMatrix[g]=D.shadow.matrix,A++}i.point[g]=et,g++}else if(D.isHemisphereLight){const et=t.get(D);et.skyColor.copy(D.color).multiplyScalar(z),et.groundColor.copy(D.groundColor).multiplyScalar(z),i.hemi[d]=et,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const N=i.hash;(N.directionalLength!==p||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==d||N.numDirectionalShadows!==S||N.numPointShadows!==A||N.numSpotShadows!==M||N.numSpotMaps!==k||N.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=M+k-L,i.spotLightMap.length=k,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=P,N.directionalLength=p,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=d,N.numDirectionalShadows=S,N.numPointShadows=A,N.numSpotShadows=M,N.numSpotMaps=k,N.numLightProbes=P,i.version=xE++)}function l(c,u){let h=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,S=c.length;d<S;d++){const A=c[d];if(A.isDirectionalLight){const M=i.directional[h];M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),h++}else if(A.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(A.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(A.width*.5,0,0),M.halfHeight.set(0,A.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(A.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),f++}else if(A.isHemisphereLight){const M=i.hemi[_];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function nf(n){const t=new yE(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function SE(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new nf(n),t.set(s,[a])):r>=o.length?(a=new nf(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class EE extends is{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=x0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bE extends is{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const TE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AE=`uniform sampler2D shadow_pass;
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
}`;function wE(n,t,e){let i=new Kc;const s=new Ft,r=new Ft,o=new ye,a=new EE({depthPacking:M0}),l=new bE,c={},u=e.maxTextureSize,h={[Li]:en,[en]:Li,[En]:En},f=new Be({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:TE,fragmentShader:AE}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new He;g.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Re(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tp;let d=this.type;this.render=function(L,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;const w=n.getRenderTarget(),E=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),U=n.state;U.setBlending(ai),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const z=d!==ti&&this.type===ti,nt=d===ti&&this.type!==ti;for(let ot=0,et=L.length;ot<et;ot++){const it=L[ot],Y=it.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const gt=Y.getFrameExtents();if(s.multiply(gt),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/gt.x),s.x=r.x*gt.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/gt.y),s.y=r.y*gt.y,Y.mapSize.y=r.y)),Y.map===null||z===!0||nt===!0){const Ct=this.type!==ti?{minFilter:cn,magFilter:cn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new wn(s.x,s.y,Ct),Y.map.texture.name=it.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const yt=Y.getViewportCount();for(let Ct=0;Ct<yt;Ct++){const Ut=Y.getViewport(Ct);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),U.viewport(o),Y.updateMatrices(it,Ct),i=Y.getFrustum(),M(P,N,Y.camera,it,this.type)}Y.isPointLightShadow!==!0&&this.type===ti&&S(Y,N),Y.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(w,E,D)};function S(L,P){const N=t.update(_);f.defines.VSM_SAMPLES!==L.blurSamples&&(f.defines.VSM_SAMPLES=L.blurSamples,p.defines.VSM_SAMPLES=L.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new wn(s.x,s.y)),f.uniforms.shadow_pass.value=L.map.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(P,null,N,f,_,null),p.uniforms.shadow_pass.value=L.mapPass.texture,p.uniforms.resolution.value=L.mapSize,p.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(P,null,N,p,_,null)}function A(L,P,N,w){let E=null;const D=N.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(D!==void 0)E=D;else if(E=N.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const U=E.uuid,z=P.uuid;let nt=c[U];nt===void 0&&(nt={},c[U]=nt);let ot=nt[z];ot===void 0&&(ot=E.clone(),nt[z]=ot,P.addEventListener("dispose",k)),E=ot}if(E.visible=P.visible,E.wireframe=P.wireframe,w===ti?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:h[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,N.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const U=n.properties.get(E);U.light=N}return E}function M(L,P,N,w,E){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&E===ti)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,L.matrixWorld);const z=t.update(L),nt=L.material;if(Array.isArray(nt)){const ot=z.groups;for(let et=0,it=ot.length;et<it;et++){const Y=ot[et],gt=nt[Y.materialIndex];if(gt&&gt.visible){const yt=A(L,gt,w,E);L.onBeforeShadow(n,L,P,N,z,yt,Y),n.renderBufferDirect(N,null,z,yt,L,Y),L.onAfterShadow(n,L,P,N,z,yt,Y)}}}else if(nt.visible){const ot=A(L,nt,w,E);L.onBeforeShadow(n,L,P,N,z,ot,null),n.renderBufferDirect(N,null,z,ot,L,null),L.onAfterShadow(n,L,P,N,z,ot,null)}}const U=L.children;for(let z=0,nt=U.length;z<nt;z++)M(U[z],P,N,w,E)}function k(L){L.target.removeEventListener("dispose",k);for(const N in c){const w=c[N],E=L.target.uuid;E in w&&(w[E].dispose(),delete w[E])}}}const RE={[Nl]:Ol,[Fl]:Hl,[Bl]:kl,[Ws]:zl,[Ol]:Nl,[Hl]:Fl,[kl]:Bl,[zl]:Ws};function CE(n,t){function e(){let B=!1;const Mt=new ye;let rt=null;const pt=new ye(0,0,0,0);return{setMask:function(bt){rt!==bt&&!B&&(n.colorMask(bt,bt,bt,bt),rt=bt)},setLocked:function(bt){B=bt},setClear:function(bt,wt,Wt,ve,Ee){Ee===!0&&(bt*=ve,wt*=ve,Wt*=ve),Mt.set(bt,wt,Wt,ve),pt.equals(Mt)===!1&&(n.clearColor(bt,wt,Wt,ve),pt.copy(Mt))},reset:function(){B=!1,rt=null,pt.set(-1,0,0,0)}}}function i(){let B=!1,Mt=!1,rt=null,pt=null,bt=null;return{setReversed:function(wt){if(Mt!==wt){const Wt=t.get("EXT_clip_control");Mt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT);const ve=bt;bt=null,this.setClear(ve)}Mt=wt},getReversed:function(){return Mt},setTest:function(wt){wt?O(n.DEPTH_TEST):$(n.DEPTH_TEST)},setMask:function(wt){rt!==wt&&!B&&(n.depthMask(wt),rt=wt)},setFunc:function(wt){if(Mt&&(wt=RE[wt]),pt!==wt){switch(wt){case Nl:n.depthFunc(n.NEVER);break;case Ol:n.depthFunc(n.ALWAYS);break;case Fl:n.depthFunc(n.LESS);break;case Ws:n.depthFunc(n.LEQUAL);break;case Bl:n.depthFunc(n.EQUAL);break;case zl:n.depthFunc(n.GEQUAL);break;case Hl:n.depthFunc(n.GREATER);break;case kl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pt=wt}},setLocked:function(wt){B=wt},setClear:function(wt){bt!==wt&&(Mt&&(wt=1-wt),n.clearDepth(wt),bt=wt)},reset:function(){B=!1,rt=null,pt=null,bt=null,Mt=!1}}}function s(){let B=!1,Mt=null,rt=null,pt=null,bt=null,wt=null,Wt=null,ve=null,Ee=null;return{setTest:function(Jt){B||(Jt?O(n.STENCIL_TEST):$(n.STENCIL_TEST))},setMask:function(Jt){Mt!==Jt&&!B&&(n.stencilMask(Jt),Mt=Jt)},setFunc:function(Jt,nn,vn){(rt!==Jt||pt!==nn||bt!==vn)&&(n.stencilFunc(Jt,nn,vn),rt=Jt,pt=nn,bt=vn)},setOp:function(Jt,nn,vn){(wt!==Jt||Wt!==nn||ve!==vn)&&(n.stencilOp(Jt,nn,vn),wt=Jt,Wt=nn,ve=vn)},setLocked:function(Jt){B=Jt},setClear:function(Jt){Ee!==Jt&&(n.clearStencil(Jt),Ee=Jt)},reset:function(){B=!1,Mt=null,rt=null,pt=null,bt=null,wt=null,Wt=null,ve=null,Ee=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,S=null,A=null,M=null,k=null,L=null,P=new Gt(0,0,0),N=0,w=!1,E=null,D=null,U=null,z=null,nt=null;const ot=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let et=!1,it=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(Y)[1]),et=it>=1):Y.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),et=it>=2);let gt=null,yt={};const Ct=n.getParameter(n.SCISSOR_BOX),Ut=n.getParameter(n.VIEWPORT),Kt=new ye().fromArray(Ct),at=new ye().fromArray(Ut);function mt(B,Mt,rt,pt){const bt=new Uint8Array(4),wt=n.createTexture();n.bindTexture(B,wt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Wt=0;Wt<rt;Wt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(Mt,0,n.RGBA,1,1,pt,0,n.RGBA,n.UNSIGNED_BYTE,bt):n.texImage2D(Mt+Wt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,bt);return wt}const At={};At[n.TEXTURE_2D]=mt(n.TEXTURE_2D,n.TEXTURE_2D,1),At[n.TEXTURE_CUBE_MAP]=mt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[n.TEXTURE_2D_ARRAY]=mt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),At[n.TEXTURE_3D]=mt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),O(n.DEPTH_TEST),o.setFunc(Ws),J(!1),I(ah),O(n.CULL_FACE),y(ai);function O(B){u[B]!==!0&&(n.enable(B),u[B]=!0)}function $(B){u[B]!==!1&&(n.disable(B),u[B]=!1)}function V(B,Mt){return h[B]!==Mt?(n.bindFramebuffer(B,Mt),h[B]=Mt,B===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=Mt),B===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=Mt),!0):!1}function lt(B,Mt){let rt=p,pt=!1;if(B){rt=f.get(Mt),rt===void 0&&(rt=[],f.set(Mt,rt));const bt=B.textures;if(rt.length!==bt.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Wt=bt.length;wt<Wt;wt++)rt[wt]=n.COLOR_ATTACHMENT0+wt;rt.length=bt.length,pt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,pt=!0);pt&&n.drawBuffers(rt)}function vt(B){return g!==B?(n.useProgram(B),g=B,!0):!1}const T={[Wi]:n.FUNC_ADD,[Jv]:n.FUNC_SUBTRACT,[Qv]:n.FUNC_REVERSE_SUBTRACT};T[t0]=n.MIN,T[e0]=n.MAX;const C={[n0]:n.ZERO,[i0]:n.ONE,[s0]:n.SRC_COLOR,[Il]:n.SRC_ALPHA,[u0]:n.SRC_ALPHA_SATURATE,[l0]:n.DST_COLOR,[o0]:n.DST_ALPHA,[r0]:n.ONE_MINUS_SRC_COLOR,[Ul]:n.ONE_MINUS_SRC_ALPHA,[c0]:n.ONE_MINUS_DST_COLOR,[a0]:n.ONE_MINUS_DST_ALPHA,[h0]:n.CONSTANT_COLOR,[f0]:n.ONE_MINUS_CONSTANT_COLOR,[d0]:n.CONSTANT_ALPHA,[p0]:n.ONE_MINUS_CONSTANT_ALPHA};function y(B,Mt,rt,pt,bt,wt,Wt,ve,Ee,Jt){if(B===ai){_===!0&&($(n.BLEND),_=!1);return}if(_===!1&&(O(n.BLEND),_=!0),B!==Zv){if(B!==m||Jt!==w){if((d!==Wi||M!==Wi)&&(n.blendEquation(n.FUNC_ADD),d=Wi,M=Wi),Jt)switch(B){case Is:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Us:n.blendFunc(n.ONE,n.ONE);break;case lh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ch:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Is:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Us:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case lh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ch:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}S=null,A=null,k=null,L=null,P.set(0,0,0),N=0,m=B,w=Jt}return}bt=bt||Mt,wt=wt||rt,Wt=Wt||pt,(Mt!==d||bt!==M)&&(n.blendEquationSeparate(T[Mt],T[bt]),d=Mt,M=bt),(rt!==S||pt!==A||wt!==k||Wt!==L)&&(n.blendFuncSeparate(C[rt],C[pt],C[wt],C[Wt]),S=rt,A=pt,k=wt,L=Wt),(ve.equals(P)===!1||Ee!==N)&&(n.blendColor(ve.r,ve.g,ve.b,Ee),P.copy(ve),N=Ee),m=B,w=!1}function st(B,Mt){B.side===En?$(n.CULL_FACE):O(n.CULL_FACE);let rt=B.side===en;Mt&&(rt=!rt),J(rt),B.blending===Is&&B.transparent===!1?y(ai):y(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const pt=B.stencilWrite;a.setTest(pt),pt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Z(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?O(n.SAMPLE_ALPHA_TO_COVERAGE):$(n.SAMPLE_ALPHA_TO_COVERAGE)}function J(B){E!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),E=B)}function I(B){B!==Yv?(O(n.CULL_FACE),B!==D&&(B===ah?n.cullFace(n.BACK):B===$v?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):$(n.CULL_FACE),D=B}function H(B){B!==U&&(et&&n.lineWidth(B),U=B)}function Z(B,Mt,rt){B?(O(n.POLYGON_OFFSET_FILL),(z!==Mt||nt!==rt)&&(n.polygonOffset(Mt,rt),z=Mt,nt=rt)):$(n.POLYGON_OFFSET_FILL)}function j(B){B?O(n.SCISSOR_TEST):$(n.SCISSOR_TEST)}function x(B){B===void 0&&(B=n.TEXTURE0+ot-1),gt!==B&&(n.activeTexture(B),gt=B)}function v(B,Mt,rt){rt===void 0&&(gt===null?rt=n.TEXTURE0+ot-1:rt=gt);let pt=yt[rt];pt===void 0&&(pt={type:void 0,texture:void 0},yt[rt]=pt),(pt.type!==B||pt.texture!==Mt)&&(gt!==rt&&(n.activeTexture(rt),gt=rt),n.bindTexture(B,Mt||At[B]),pt.type=B,pt.texture=Mt)}function R(){const B=yt[gt];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function F(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function dt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ft(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function St(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Et(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Nt(B){Kt.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),Kt.copy(B))}function xt(B){at.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),at.copy(B))}function Bt(B,Mt){let rt=c.get(Mt);rt===void 0&&(rt=new WeakMap,c.set(Mt,rt));let pt=rt.get(B);pt===void 0&&(pt=n.getUniformBlockIndex(Mt,B.name),rt.set(B,pt))}function zt(B,Mt){const pt=c.get(Mt).get(B);l.get(Mt)!==pt&&(n.uniformBlockBinding(Mt,pt,B.__bindingPointIndex),l.set(Mt,pt))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},gt=null,yt={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,S=null,A=null,M=null,k=null,L=null,P=new Gt(0,0,0),N=0,w=!1,E=null,D=null,U=null,z=null,nt=null,Kt.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:O,disable:$,bindFramebuffer:V,drawBuffers:lt,useProgram:vt,setBlending:y,setMaterial:st,setFlipSided:J,setCullFace:I,setLineWidth:H,setPolygonOffset:Z,setScissorTest:j,activeTexture:x,bindTexture:v,unbindTexture:R,compressedTexImage2D:F,compressedTexImage3D:K,texImage2D:Et,texImage3D:Pt,updateUBOMapping:Bt,uniformBlockBinding:zt,texStorage2D:St,texStorage3D:ut,texSubImage2D:q,texSubImage3D:dt,compressedTexSubImage2D:ft,compressedTexSubImage3D:ct,scissor:Nt,viewport:xt,reset:te}}function sf(n,t,e,i){const s=PE(i);switch(e){case hp:return n*t;case dp:return n*t;case pp:return n*t*2;case mp:return n*t/s.components*s.byteLength;case jc:return n*t/s.components*s.byteLength;case gp:return n*t*2/s.components*s.byteLength;case qc:return n*t*2/s.components*s.byteLength;case fp:return n*t*3/s.components*s.byteLength;case mn:return n*t*4/s.components*s.byteLength;case Yc:return n*t*4/s.components*s.byteLength;case Uo:case No:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Oo:case Fo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case jl:case Yl:return Math.max(n,16)*Math.max(t,8)/4;case Xl:case ql:return Math.max(n,8)*Math.max(t,8)/2;case $l:case Kl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Zl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Jl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ql:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case tc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ec:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case nc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ic:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case sc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case rc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case oc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ac:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case lc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case cc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case uc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case hc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Bo:case fc:case dc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case _p:case pc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case mc:case gc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function PE(n){switch(n){case Gn:case lp:return{byteLength:1,components:1};case Br:case cp:case li:return{byteLength:2,components:1};case Wc:case Xc:return{byteLength:2,components:4};case Zi:case Gc:case ri:return{byteLength:4,components:1};case up:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function DE(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ft,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,v){return p?new OffscreenCanvas(x,v):Jo("canvas")}function _(x,v,R){let F=1;const K=j(x);if((K.width>R||K.height>R)&&(F=R/Math.max(K.width,K.height)),F<1)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap||typeof VideoFrame<"u"&&x instanceof VideoFrame){const q=Math.floor(F*K.width),dt=Math.floor(F*K.height);h===void 0&&(h=g(q,dt));const ft=v?g(q,dt):h;return ft.width=q,ft.height=dt,ft.getContext("2d").drawImage(x,0,0,q,dt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+q+"x"+dt+")."),ft}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),x;return x}function m(x){return x.generateMipmaps}function d(x){n.generateMipmap(x)}function S(x){return x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:x.isWebGL3DRenderTarget?n.TEXTURE_3D:x.isWebGLArrayRenderTarget||x.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function A(x,v,R,F,K=!1){if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let q=v;if(v===n.RED&&(R===n.FLOAT&&(q=n.R32F),R===n.HALF_FLOAT&&(q=n.R16F),R===n.UNSIGNED_BYTE&&(q=n.R8)),v===n.RED_INTEGER&&(R===n.UNSIGNED_BYTE&&(q=n.R8UI),R===n.UNSIGNED_SHORT&&(q=n.R16UI),R===n.UNSIGNED_INT&&(q=n.R32UI),R===n.BYTE&&(q=n.R8I),R===n.SHORT&&(q=n.R16I),R===n.INT&&(q=n.R32I)),v===n.RG&&(R===n.FLOAT&&(q=n.RG32F),R===n.HALF_FLOAT&&(q=n.RG16F),R===n.UNSIGNED_BYTE&&(q=n.RG8)),v===n.RG_INTEGER&&(R===n.UNSIGNED_BYTE&&(q=n.RG8UI),R===n.UNSIGNED_SHORT&&(q=n.RG16UI),R===n.UNSIGNED_INT&&(q=n.RG32UI),R===n.BYTE&&(q=n.RG8I),R===n.SHORT&&(q=n.RG16I),R===n.INT&&(q=n.RG32I)),v===n.RGB_INTEGER&&(R===n.UNSIGNED_BYTE&&(q=n.RGB8UI),R===n.UNSIGNED_SHORT&&(q=n.RGB16UI),R===n.UNSIGNED_INT&&(q=n.RGB32UI),R===n.BYTE&&(q=n.RGB8I),R===n.SHORT&&(q=n.RGB16I),R===n.INT&&(q=n.RGB32I)),v===n.RGBA_INTEGER&&(R===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),R===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),R===n.UNSIGNED_INT&&(q=n.RGBA32UI),R===n.BYTE&&(q=n.RGBA8I),R===n.SHORT&&(q=n.RGBA16I),R===n.INT&&(q=n.RGBA32I)),v===n.RGB&&R===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),v===n.RGBA){const dt=K?Ma:Qt.getTransfer(F);R===n.FLOAT&&(q=n.RGBA32F),R===n.HALF_FLOAT&&(q=n.RGBA16F),R===n.UNSIGNED_BYTE&&(q=dt===ce?n.SRGB8_ALPHA8:n.RGBA8),R===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),R===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function M(x,v){let R;return x?v===null||v===Zi||v===qs?R=n.DEPTH24_STENCIL8:v===ri?R=n.DEPTH32F_STENCIL8:v===Br&&(R=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Zi||v===qs?R=n.DEPTH_COMPONENT24:v===ri?R=n.DEPTH_COMPONENT32F:v===Br&&(R=n.DEPTH_COMPONENT16),R}function k(x,v){return m(x)===!0||x.isFramebufferTexture&&x.minFilter!==cn&&x.minFilter!==Tn?Math.log2(Math.max(v.width,v.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?v.mipmaps.length:1}function L(x){const v=x.target;v.removeEventListener("dispose",L),N(v),v.isVideoTexture&&u.delete(v)}function P(x){const v=x.target;v.removeEventListener("dispose",P),E(v)}function N(x){const v=i.get(x);if(v.__webglInit===void 0)return;const R=x.source,F=f.get(R);if(F){const K=F[v.__cacheKey];K.usedTimes--,K.usedTimes===0&&w(x),Object.keys(F).length===0&&f.delete(R)}i.remove(x)}function w(x){const v=i.get(x);n.deleteTexture(v.__webglTexture);const R=x.source,F=f.get(R);delete F[v.__cacheKey],o.memory.textures--}function E(x){const v=i.get(x);if(x.depthTexture&&(x.depthTexture.dispose(),i.remove(x.depthTexture)),x.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(v.__webglFramebuffer[F]))for(let K=0;K<v.__webglFramebuffer[F].length;K++)n.deleteFramebuffer(v.__webglFramebuffer[F][K]);else n.deleteFramebuffer(v.__webglFramebuffer[F]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[F])}else{if(Array.isArray(v.__webglFramebuffer))for(let F=0;F<v.__webglFramebuffer.length;F++)n.deleteFramebuffer(v.__webglFramebuffer[F]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let F=0;F<v.__webglColorRenderbuffer.length;F++)v.__webglColorRenderbuffer[F]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[F]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const R=x.textures;for(let F=0,K=R.length;F<K;F++){const q=i.get(R[F]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(R[F])}i.remove(x)}let D=0;function U(){D=0}function z(){const x=D;return x>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+s.maxTextures),D+=1,x}function nt(x){const v=[];return v.push(x.wrapS),v.push(x.wrapT),v.push(x.wrapR||0),v.push(x.magFilter),v.push(x.minFilter),v.push(x.anisotropy),v.push(x.internalFormat),v.push(x.format),v.push(x.type),v.push(x.generateMipmaps),v.push(x.premultiplyAlpha),v.push(x.flipY),v.push(x.unpackAlignment),v.push(x.colorSpace),v.join()}function ot(x,v){const R=i.get(x);if(x.isVideoTexture&&H(x),x.isRenderTargetTexture===!1&&x.version>0&&R.__version!==x.version){const F=x.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(R,x,v);return}}e.bindTexture(n.TEXTURE_2D,R.__webglTexture,n.TEXTURE0+v)}function et(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){at(R,x,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,R.__webglTexture,n.TEXTURE0+v)}function it(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){at(R,x,v);return}e.bindTexture(n.TEXTURE_3D,R.__webglTexture,n.TEXTURE0+v)}function Y(x,v){const R=i.get(x);if(x.version>0&&R.__version!==x.version){mt(R,x,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+v)}const gt={[Fr]:n.REPEAT,[qi]:n.CLAMP_TO_EDGE,[Wl]:n.MIRRORED_REPEAT},yt={[cn]:n.NEAREST,[v0]:n.NEAREST_MIPMAP_NEAREST,[eo]:n.NEAREST_MIPMAP_LINEAR,[Tn]:n.LINEAR,[Fa]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},Ct={[S0]:n.NEVER,[R0]:n.ALWAYS,[E0]:n.LESS,[xp]:n.LEQUAL,[b0]:n.EQUAL,[w0]:n.GEQUAL,[T0]:n.GREATER,[A0]:n.NOTEQUAL};function Ut(x,v){if(v.type===ri&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Tn||v.magFilter===Fa||v.magFilter===eo||v.magFilter===Ci||v.minFilter===Tn||v.minFilter===Fa||v.minFilter===eo||v.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(x,n.TEXTURE_WRAP_S,gt[v.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,gt[v.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,gt[v.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,yt[v.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,yt[v.minFilter]),v.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,Ct[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===cn||v.minFilter!==eo&&v.minFilter!==Ci||v.type===ri&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const R=t.get("EXT_texture_filter_anisotropic");n.texParameterf(x,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Kt(x,v){let R=!1;x.__webglInit===void 0&&(x.__webglInit=!0,v.addEventListener("dispose",L));const F=v.source;let K=f.get(F);K===void 0&&(K={},f.set(F,K));const q=nt(v);if(q!==x.__cacheKey){K[q]===void 0&&(K[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,R=!0),K[q].usedTimes++;const dt=K[x.__cacheKey];dt!==void 0&&(K[x.__cacheKey].usedTimes--,dt.usedTimes===0&&w(v)),x.__cacheKey=q,x.__webglTexture=K[q].texture}return R}function at(x,v,R){let F=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(F=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(F=n.TEXTURE_3D);const K=Kt(x,v),q=v.source;e.bindTexture(F,x.__webglTexture,n.TEXTURE0+R);const dt=i.get(q);if(q.version!==dt.__version||K===!0){e.activeTexture(n.TEXTURE0+R);const ft=Qt.getPrimaries(Qt.workingColorSpace),ct=v.colorSpace===Ri?null:Qt.getPrimaries(v.colorSpace),St=v.colorSpace===Ri||ft===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let ut=_(v.image,!1,s.maxTextureSize);ut=Z(v,ut);const Et=r.convert(v.format,v.colorSpace),Pt=r.convert(v.type);let Nt=A(v.internalFormat,Et,Pt,v.colorSpace,v.isVideoTexture);Ut(F,v);let xt;const Bt=v.mipmaps,zt=v.isVideoTexture!==!0,te=dt.__version===void 0||K===!0,B=q.dataReady,Mt=k(v,ut);if(v.isDepthTexture)Nt=M(v.format===Ys,v.type),te&&(zt?e.texStorage2D(n.TEXTURE_2D,1,Nt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,Nt,ut.width,ut.height,0,Et,Pt,null));else if(v.isDataTexture)if(Bt.length>0){zt&&te&&e.texStorage2D(n.TEXTURE_2D,Mt,Nt,Bt[0].width,Bt[0].height);for(let rt=0,pt=Bt.length;rt<pt;rt++)xt=Bt[rt],zt?B&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,xt.width,xt.height,Et,Pt,xt.data):e.texImage2D(n.TEXTURE_2D,rt,Nt,xt.width,xt.height,0,Et,Pt,xt.data);v.generateMipmaps=!1}else zt?(te&&e.texStorage2D(n.TEXTURE_2D,Mt,Nt,ut.width,ut.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,Et,Pt,ut.data)):e.texImage2D(n.TEXTURE_2D,0,Nt,ut.width,ut.height,0,Et,Pt,ut.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){zt&&te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,Nt,Bt[0].width,Bt[0].height,ut.depth);for(let rt=0,pt=Bt.length;rt<pt;rt++)if(xt=Bt[rt],v.format!==mn)if(Et!==null)if(zt){if(B)if(v.layerUpdates.size>0){const bt=sf(xt.width,xt.height,v.format,v.type);for(const wt of v.layerUpdates){const Wt=xt.data.subarray(wt*bt/xt.data.BYTES_PER_ELEMENT,(wt+1)*bt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,wt,xt.width,xt.height,1,Et,Wt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,xt.width,xt.height,ut.depth,Et,xt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,Nt,xt.width,xt.height,ut.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,xt.width,xt.height,ut.depth,Et,Pt,xt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,Nt,xt.width,xt.height,ut.depth,0,Et,Pt,xt.data)}else{zt&&te&&e.texStorage2D(n.TEXTURE_2D,Mt,Nt,Bt[0].width,Bt[0].height);for(let rt=0,pt=Bt.length;rt<pt;rt++)xt=Bt[rt],v.format!==mn?Et!==null?zt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,xt.width,xt.height,Et,xt.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,Nt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?B&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,xt.width,xt.height,Et,Pt,xt.data):e.texImage2D(n.TEXTURE_2D,rt,Nt,xt.width,xt.height,0,Et,Pt,xt.data)}else if(v.isDataArrayTexture)if(zt){if(te&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Mt,Nt,ut.width,ut.height,ut.depth),B)if(v.layerUpdates.size>0){const rt=sf(ut.width,ut.height,v.format,v.type);for(const pt of v.layerUpdates){const bt=ut.data.subarray(pt*rt/ut.data.BYTES_PER_ELEMENT,(pt+1)*rt/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pt,ut.width,ut.height,1,Et,Pt,bt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Et,Pt,ut.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Nt,ut.width,ut.height,ut.depth,0,Et,Pt,ut.data);else if(v.isData3DTexture)zt?(te&&e.texStorage3D(n.TEXTURE_3D,Mt,Nt,ut.width,ut.height,ut.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Et,Pt,ut.data)):e.texImage3D(n.TEXTURE_3D,0,Nt,ut.width,ut.height,ut.depth,0,Et,Pt,ut.data);else if(v.isFramebufferTexture){if(te)if(zt)e.texStorage2D(n.TEXTURE_2D,Mt,Nt,ut.width,ut.height);else{let rt=ut.width,pt=ut.height;for(let bt=0;bt<Mt;bt++)e.texImage2D(n.TEXTURE_2D,bt,Nt,rt,pt,0,Et,Pt,null),rt>>=1,pt>>=1}}else if(Bt.length>0){if(zt&&te){const rt=j(Bt[0]);e.texStorage2D(n.TEXTURE_2D,Mt,Nt,rt.width,rt.height)}for(let rt=0,pt=Bt.length;rt<pt;rt++)xt=Bt[rt],zt?B&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,Et,Pt,xt):e.texImage2D(n.TEXTURE_2D,rt,Nt,Et,Pt,xt);v.generateMipmaps=!1}else if(zt){if(te){const rt=j(ut);e.texStorage2D(n.TEXTURE_2D,Mt,Nt,rt.width,rt.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Et,Pt,ut)}else e.texImage2D(n.TEXTURE_2D,0,Nt,Et,Pt,ut);m(v)&&d(F),dt.__version=q.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function mt(x,v,R){if(v.image.length!==6)return;const F=Kt(x,v),K=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+R);const q=i.get(K);if(K.version!==q.__version||F===!0){e.activeTexture(n.TEXTURE0+R);const dt=Qt.getPrimaries(Qt.workingColorSpace),ft=v.colorSpace===Ri?null:Qt.getPrimaries(v.colorSpace),ct=v.colorSpace===Ri||dt===ft?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);const St=v.isCompressedTexture||v.image[0].isCompressedTexture,ut=v.image[0]&&v.image[0].isDataTexture,Et=[];for(let pt=0;pt<6;pt++)!St&&!ut?Et[pt]=_(v.image[pt],!0,s.maxCubemapSize):Et[pt]=ut?v.image[pt].image:v.image[pt],Et[pt]=Z(v,Et[pt]);const Pt=Et[0],Nt=r.convert(v.format,v.colorSpace),xt=r.convert(v.type),Bt=A(v.internalFormat,Nt,xt,v.colorSpace),zt=v.isVideoTexture!==!0,te=q.__version===void 0||F===!0,B=K.dataReady;let Mt=k(v,Pt);Ut(n.TEXTURE_CUBE_MAP,v);let rt;if(St){zt&&te&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Bt,Pt.width,Pt.height);for(let pt=0;pt<6;pt++){rt=Et[pt].mipmaps;for(let bt=0;bt<rt.length;bt++){const wt=rt[bt];v.format!==mn?Nt!==null?zt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt,0,0,wt.width,wt.height,Nt,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt,Bt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt,0,0,wt.width,wt.height,Nt,xt,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt,Bt,wt.width,wt.height,0,Nt,xt,wt.data)}}}else{if(rt=v.mipmaps,zt&&te){rt.length>0&&Mt++;const pt=j(Et[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Mt,Bt,pt.width,pt.height)}for(let pt=0;pt<6;pt++)if(ut){zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Et[pt].width,Et[pt].height,Nt,xt,Et[pt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,Bt,Et[pt].width,Et[pt].height,0,Nt,xt,Et[pt].data);for(let bt=0;bt<rt.length;bt++){const Wt=rt[bt].image[pt].image;zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt+1,0,0,Wt.width,Wt.height,Nt,xt,Wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt+1,Bt,Wt.width,Wt.height,0,Nt,xt,Wt.data)}}else{zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,0,0,Nt,xt,Et[pt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0,Bt,Nt,xt,Et[pt]);for(let bt=0;bt<rt.length;bt++){const wt=rt[bt];zt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt+1,0,0,Nt,xt,wt.image[pt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,bt+1,Bt,Nt,xt,wt.image[pt])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),q.__version=K.version,v.onUpdate&&v.onUpdate(v)}x.__version=v.version}function At(x,v,R,F,K,q){const dt=r.convert(R.format,R.colorSpace),ft=r.convert(R.type),ct=A(R.internalFormat,dt,ft,R.colorSpace),St=i.get(v),ut=i.get(R);if(ut.__renderTarget=v,!St.__hasExternalTextures){const Et=Math.max(1,v.width>>q),Pt=Math.max(1,v.height>>q);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?e.texImage3D(K,q,ct,Et,Pt,v.depth,0,dt,ft,null):e.texImage2D(K,q,ct,Et,Pt,0,dt,ft,null)}e.bindFramebuffer(n.FRAMEBUFFER,x),I(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,K,ut.__webglTexture,0,J(v)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,F,K,ut.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function O(x,v,R){if(n.bindRenderbuffer(n.RENDERBUFFER,x),v.depthBuffer){const F=v.depthTexture,K=F&&F.isDepthTexture?F.type:null,q=M(v.stencilBuffer,K),dt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ft=J(v);I(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ft,q,v.width,v.height):R?n.renderbufferStorageMultisample(n.RENDERBUFFER,ft,q,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,q,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,dt,n.RENDERBUFFER,x)}else{const F=v.textures;for(let K=0;K<F.length;K++){const q=F[K],dt=r.convert(q.format,q.colorSpace),ft=r.convert(q.type),ct=A(q.internalFormat,dt,ft,q.colorSpace),St=J(v);R&&I(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,St,ct,v.width,v.height):I(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,St,ct,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ct,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $(x,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,x),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const F=i.get(v.depthTexture);F.__renderTarget=v,(!F.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),ot(v.depthTexture,0);const K=F.__webglTexture,q=J(v);if(v.depthTexture.format===Ns)I(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(v.depthTexture.format===Ys)I(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function V(x){const v=i.get(x),R=x.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==x.depthTexture){const F=x.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),F){const K=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,F.removeEventListener("dispose",K)};F.addEventListener("dispose",K),v.__depthDisposeCallback=K}v.__boundDepthTexture=F}if(x.depthTexture&&!v.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");$(v.__webglFramebuffer,x)}else if(R){v.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[F]),v.__webglDepthbuffer[F]===void 0)v.__webglDepthbuffer[F]=n.createRenderbuffer(),O(v.__webglDepthbuffer[F],x,!1);else{const K=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=v.__webglDepthbuffer[F];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),O(v.__webglDepthbuffer,x,!1);else{const F=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,F,n.RENDERBUFFER,K)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(x,v,R){const F=i.get(x);v!==void 0&&At(F.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),R!==void 0&&V(x)}function vt(x){const v=x.texture,R=i.get(x),F=i.get(v);x.addEventListener("dispose",P);const K=x.textures,q=x.isWebGLCubeRenderTarget===!0,dt=K.length>1;if(dt||(F.__webglTexture===void 0&&(F.__webglTexture=n.createTexture()),F.__version=v.version,o.memory.textures++),q){R.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(v.mipmaps&&v.mipmaps.length>0){R.__webglFramebuffer[ft]=[];for(let ct=0;ct<v.mipmaps.length;ct++)R.__webglFramebuffer[ft][ct]=n.createFramebuffer()}else R.__webglFramebuffer[ft]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){R.__webglFramebuffer=[];for(let ft=0;ft<v.mipmaps.length;ft++)R.__webglFramebuffer[ft]=n.createFramebuffer()}else R.__webglFramebuffer=n.createFramebuffer();if(dt)for(let ft=0,ct=K.length;ft<ct;ft++){const St=i.get(K[ft]);St.__webglTexture===void 0&&(St.__webglTexture=n.createTexture(),o.memory.textures++)}if(x.samples>0&&I(x)===!1){R.__webglMultisampledFramebuffer=n.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let ft=0;ft<K.length;ft++){const ct=K[ft];R.__webglColorRenderbuffer[ft]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,R.__webglColorRenderbuffer[ft]);const St=r.convert(ct.format,ct.colorSpace),ut=r.convert(ct.type),Et=A(ct.internalFormat,St,ut,ct.colorSpace,x.isXRRenderTarget===!0),Pt=J(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Pt,Et,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ft,n.RENDERBUFFER,R.__webglColorRenderbuffer[ft])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(R.__webglDepthRenderbuffer=n.createRenderbuffer(),O(R.__webglDepthRenderbuffer,x,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture),Ut(n.TEXTURE_CUBE_MAP,v);for(let ft=0;ft<6;ft++)if(v.mipmaps&&v.mipmaps.length>0)for(let ct=0;ct<v.mipmaps.length;ct++)At(R.__webglFramebuffer[ft][ct],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,ct);else At(R.__webglFramebuffer[ft],x,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);m(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(dt){for(let ft=0,ct=K.length;ft<ct;ft++){const St=K[ft],ut=i.get(St);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),Ut(n.TEXTURE_2D,St),At(R.__webglFramebuffer,x,St,n.COLOR_ATTACHMENT0+ft,n.TEXTURE_2D,0),m(St)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let ft=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(ft=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ft,F.__webglTexture),Ut(ft,v),v.mipmaps&&v.mipmaps.length>0)for(let ct=0;ct<v.mipmaps.length;ct++)At(R.__webglFramebuffer[ct],x,v,n.COLOR_ATTACHMENT0,ft,ct);else At(R.__webglFramebuffer,x,v,n.COLOR_ATTACHMENT0,ft,0);m(v)&&d(ft),e.unbindTexture()}x.depthBuffer&&V(x)}function T(x){const v=x.textures;for(let R=0,F=v.length;R<F;R++){const K=v[R];if(m(K)){const q=S(x),dt=i.get(K).__webglTexture;e.bindTexture(q,dt),d(q),e.unbindTexture()}}}const C=[],y=[];function st(x){if(x.samples>0){if(I(x)===!1){const v=x.textures,R=x.width,F=x.height;let K=n.COLOR_BUFFER_BIT;const q=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=i.get(x),ft=v.length>1;if(ft)for(let ct=0;ct<v.length;ct++)e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,dt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglFramebuffer);for(let ct=0;ct<v.length;ct++){if(x.resolveDepthBuffer&&(x.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&x.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),ft){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,dt.__webglColorRenderbuffer[ct]);const St=i.get(v[ct]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,St,0)}n.blitFramebuffer(0,0,R,F,0,0,R,F,K,n.NEAREST),l===!0&&(C.length=0,y.length=0,C.push(n.COLOR_ATTACHMENT0+ct),x.depthBuffer&&x.resolveDepthBuffer===!1&&(C.push(q),y.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,y)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ft)for(let ct=0;ct<v.length;ct++){e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,dt.__webglColorRenderbuffer[ct]);const St=i.get(v[ct]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,dt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,St,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,dt.__webglMultisampledFramebuffer)}else if(x.depthBuffer&&x.resolveDepthBuffer===!1&&l){const v=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function J(x){return Math.min(s.maxSamples,x.samples)}function I(x){const v=i.get(x);return x.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function H(x){const v=o.render.frame;u.get(x)!==v&&(u.set(x,v),x.update())}function Z(x,v){const R=x.colorSpace,F=x.format,K=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||R!==Js&&R!==Ri&&(Qt.getTransfer(R)===ce?(F!==mn||K!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),v}function j(x){return typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement?(c.width=x.naturalWidth||x.width,c.height=x.naturalHeight||x.height):typeof VideoFrame<"u"&&x instanceof VideoFrame?(c.width=x.displayWidth,c.height=x.displayHeight):(c.width=x.width,c.height=x.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.setTexture2D=ot,this.setTexture2DArray=et,this.setTexture3D=it,this.setTextureCube=Y,this.rebindTextures=lt,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=T,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=V,this.setupFrameBufferTexture=At,this.useMultisampledRTT=I}function LE(n,t){function e(i,s=Ri){let r;const o=Qt.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===Wc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Xc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===up)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===lp)return n.BYTE;if(i===cp)return n.SHORT;if(i===Br)return n.UNSIGNED_SHORT;if(i===Gc)return n.INT;if(i===Zi)return n.UNSIGNED_INT;if(i===ri)return n.FLOAT;if(i===li)return n.HALF_FLOAT;if(i===hp)return n.ALPHA;if(i===fp)return n.RGB;if(i===mn)return n.RGBA;if(i===dp)return n.LUMINANCE;if(i===pp)return n.LUMINANCE_ALPHA;if(i===Ns)return n.DEPTH_COMPONENT;if(i===Ys)return n.DEPTH_STENCIL;if(i===mp)return n.RED;if(i===jc)return n.RED_INTEGER;if(i===gp)return n.RG;if(i===qc)return n.RG_INTEGER;if(i===Yc)return n.RGBA_INTEGER;if(i===Uo||i===No||i===Oo||i===Fo)if(o===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Uo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Uo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===No)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Oo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xl||i===jl||i===ql||i===Yl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Xl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===jl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ql)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$l||i===Kl||i===Zl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===$l||i===Kl)return o===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Zl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Jl||i===Ql||i===tc||i===ec||i===nc||i===ic||i===sc||i===rc||i===oc||i===ac||i===lc||i===cc||i===uc||i===hc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Jl)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ql)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===tc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ec)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ic)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===sc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===rc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===oc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ac)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===lc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===cc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===uc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===hc)return o===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bo||i===fc||i===dc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Bo)return o===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_p||i===pc||i===mc||i===gc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Bo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===pc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===mc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===qs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class IE extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class As extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const UE={type:"move"};class hl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new As,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new As,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new As,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(UE)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new As;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const NE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OE=`
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

}`;class FE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new $e,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Be({vertexShader:NE,fragmentShader:OE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Re(new ya(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class BE extends ns{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=new FE,m=e.getContextAttributes();let d=null,S=null;const A=[],M=[],k=new Ft;let L=null;const P=new pn;P.viewport=new ye;const N=new pn;N.viewport=new ye;const w=[P,N],E=new IE;let D=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(at){let mt=A[at];return mt===void 0&&(mt=new hl,A[at]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(at){let mt=A[at];return mt===void 0&&(mt=new hl,A[at]=mt),mt.getGripSpace()},this.getHand=function(at){let mt=A[at];return mt===void 0&&(mt=new hl,A[at]=mt),mt.getHandSpace()};function z(at){const mt=M.indexOf(at.inputSource);if(mt===-1)return;const At=A[mt];At!==void 0&&(At.update(at.inputSource,at.frame,c||o),At.dispatchEvent({type:at.type,data:at.inputSource}))}function nt(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",nt),s.removeEventListener("inputsourceschange",ot);for(let at=0;at<A.length;at++){const mt=M[at];mt!==null&&(M[at]=null,A[at].disconnect(mt))}D=null,U=null,_.reset(),t.setRenderTarget(d),p=null,f=null,h=null,s=null,S=null,Kt.stop(),i.isPresenting=!1,t.setPixelRatio(L),t.setSize(k.width,k.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(at){r=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(at){a=at,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(at){c=at},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(at){if(s=at,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",nt),s.addEventListener("inputsourceschange",ot),m.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(k),s.renderState.layers===void 0){const mt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new wn(p.framebufferWidth,p.framebufferHeight,{format:mn,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let mt=null,At=null,O=null;m.depth&&(O=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=m.stencil?Ys:Ns,At=m.stencil?qs:Zi);const $={colorFormat:e.RGBA8,depthFormat:O,scaleFactor:r};h=new XRWebGLBinding(s,e),f=h.createProjectionLayer($),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new wn(f.textureWidth,f.textureHeight,{format:mn,type:Gn,depthTexture:new Pp(f.textureWidth,f.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Kt.setContext(s),Kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ot(at){for(let mt=0;mt<at.removed.length;mt++){const At=at.removed[mt],O=M.indexOf(At);O>=0&&(M[O]=null,A[O].disconnect(At))}for(let mt=0;mt<at.added.length;mt++){const At=at.added[mt];let O=M.indexOf(At);if(O===-1){for(let V=0;V<A.length;V++)if(V>=M.length){M.push(At),O=V;break}else if(M[V]===null){M[V]=At,O=V;break}if(O===-1)break}const $=A[O];$&&$.connect(At)}}const et=new W,it=new W;function Y(at,mt,At){et.setFromMatrixPosition(mt.matrixWorld),it.setFromMatrixPosition(At.matrixWorld);const O=et.distanceTo(it),$=mt.projectionMatrix.elements,V=At.projectionMatrix.elements,lt=$[14]/($[10]-1),vt=$[14]/($[10]+1),T=($[9]+1)/$[5],C=($[9]-1)/$[5],y=($[8]-1)/$[0],st=(V[8]+1)/V[0],J=lt*y,I=lt*st,H=O/(-y+st),Z=H*-y;if(mt.matrixWorld.decompose(at.position,at.quaternion,at.scale),at.translateX(Z),at.translateZ(H),at.matrixWorld.compose(at.position,at.quaternion,at.scale),at.matrixWorldInverse.copy(at.matrixWorld).invert(),$[10]===-1)at.projectionMatrix.copy(mt.projectionMatrix),at.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const j=lt+H,x=vt+H,v=J-Z,R=I+(O-Z),F=T*vt/x*j,K=C*vt/x*j;at.projectionMatrix.makePerspective(v,R,F,K,j,x),at.projectionMatrixInverse.copy(at.projectionMatrix).invert()}}function gt(at,mt){mt===null?at.matrixWorld.copy(at.matrix):at.matrixWorld.multiplyMatrices(mt.matrixWorld,at.matrix),at.matrixWorldInverse.copy(at.matrixWorld).invert()}this.updateCamera=function(at){if(s===null)return;let mt=at.near,At=at.far;_.texture!==null&&(_.depthNear>0&&(mt=_.depthNear),_.depthFar>0&&(At=_.depthFar)),E.near=N.near=P.near=mt,E.far=N.far=P.far=At,(D!==E.near||U!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),D=E.near,U=E.far),P.layers.mask=at.layers.mask|2,N.layers.mask=at.layers.mask|4,E.layers.mask=P.layers.mask|N.layers.mask;const O=at.parent,$=E.cameras;gt(E,O);for(let V=0;V<$.length;V++)gt($[V],O);$.length===2?Y(E,P,N):E.projectionMatrix.copy(P.projectionMatrix),yt(at,E,O)};function yt(at,mt,At){At===null?at.matrix.copy(mt.matrixWorld):(at.matrix.copy(At.matrixWorld),at.matrix.invert(),at.matrix.multiply(mt.matrixWorld)),at.matrix.decompose(at.position,at.quaternion,at.scale),at.updateMatrixWorld(!0),at.projectionMatrix.copy(mt.projectionMatrix),at.projectionMatrixInverse.copy(mt.projectionMatrixInverse),at.isPerspectiveCamera&&(at.fov=_c*2*Math.atan(1/at.projectionMatrix.elements[5]),at.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(at){l=at,f!==null&&(f.fixedFoveation=at),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=at)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(E)};let Ct=null;function Ut(at,mt){if(u=mt.getViewerPose(c||o),g=mt,u!==null){const At=u.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let O=!1;At.length!==E.cameras.length&&(E.cameras.length=0,O=!0);for(let V=0;V<At.length;V++){const lt=At[V];let vt=null;if(p!==null)vt=p.getViewport(lt);else{const C=h.getViewSubImage(f,lt);vt=C.viewport,V===0&&(t.setRenderTargetTextures(S,C.colorTexture,f.ignoreDepthValues?void 0:C.depthStencilTexture),t.setRenderTarget(S))}let T=w[V];T===void 0&&(T=new pn,T.layers.enable(V),T.viewport=new ye,w[V]=T),T.matrix.fromArray(lt.transform.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale),T.projectionMatrix.fromArray(lt.projectionMatrix),T.projectionMatrixInverse.copy(T.projectionMatrix).invert(),T.viewport.set(vt.x,vt.y,vt.width,vt.height),V===0&&(E.matrix.copy(T.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),O===!0&&E.cameras.push(T)}const $=s.enabledFeatures;if($&&$.includes("depth-sensing")){const V=h.getDepthInformation(At[0]);V&&V.isValid&&V.texture&&_.init(t,V,s.renderState)}}for(let At=0;At<A.length;At++){const O=M[At],$=A[At];O!==null&&$!==void 0&&$.update(O,mt,c||o)}Ct&&Ct(at,mt),mt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:mt}),g=null}const Kt=new Cp;Kt.setAnimationLoop(Ut),this.setAnimationLoop=function(at){Ct=at},this.dispose=function(){}}}const Hi=new Wn,zE=new de;function HE(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ap(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,S,A,M){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,M)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,S,A):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===en&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===en&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const S=t.get(d),A=S.envMap,M=S.envMapRotation;A&&(m.envMap.value=A,Hi.copy(M),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),m.envMapRotation.value.setFromMatrix4(zE.makeRotationFromEuler(Hi)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,S,A){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*S,m.scale.value=A*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,S){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===en&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const S=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function kE(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,A){const M=A.program;i.uniformBlockBinding(S,M)}function c(S,A){let M=s[S.id];M===void 0&&(g(S),M=u(S),s[S.id]=M,S.addEventListener("dispose",m));const k=A.program;i.updateUBOMapping(S,k);const L=t.render.frame;r[S.id]!==L&&(f(S),r[S.id]=L)}function u(S){const A=h();S.__bindingPointIndex=A;const M=n.createBuffer(),k=S.__size,L=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,k,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,M),M}function h(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const A=s[S.id],M=S.uniforms,k=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let L=0,P=M.length;L<P;L++){const N=Array.isArray(M[L])?M[L]:[M[L]];for(let w=0,E=N.length;w<E;w++){const D=N[w];if(p(D,L,w,k)===!0){const U=D.__offset,z=Array.isArray(D.value)?D.value:[D.value];let nt=0;for(let ot=0;ot<z.length;ot++){const et=z[ot],it=_(et);typeof et=="number"||typeof et=="boolean"?(D.__data[0]=et,n.bufferSubData(n.UNIFORM_BUFFER,U+nt,D.__data)):et.isMatrix3?(D.__data[0]=et.elements[0],D.__data[1]=et.elements[1],D.__data[2]=et.elements[2],D.__data[3]=0,D.__data[4]=et.elements[3],D.__data[5]=et.elements[4],D.__data[6]=et.elements[5],D.__data[7]=0,D.__data[8]=et.elements[6],D.__data[9]=et.elements[7],D.__data[10]=et.elements[8],D.__data[11]=0):(et.toArray(D.__data,nt),nt+=it.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,A,M,k){const L=S.value,P=A+"_"+M;if(k[P]===void 0)return typeof L=="number"||typeof L=="boolean"?k[P]=L:k[P]=L.clone(),!0;{const N=k[P];if(typeof L=="number"||typeof L=="boolean"){if(N!==L)return k[P]=L,!0}else if(N.equals(L)===!1)return N.copy(L),!0}return!1}function g(S){const A=S.uniforms;let M=0;const k=16;for(let P=0,N=A.length;P<N;P++){const w=Array.isArray(A[P])?A[P]:[A[P]];for(let E=0,D=w.length;E<D;E++){const U=w[E],z=Array.isArray(U.value)?U.value:[U.value];for(let nt=0,ot=z.length;nt<ot;nt++){const et=z[nt],it=_(et),Y=M%k,gt=Y%it.boundary,yt=Y+gt;M+=gt,yt!==0&&k-yt<it.storage&&(M+=k-yt),U.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=M,M+=it.storage}}}const L=M%k;return L>0&&(M+=k-L),S.__size=M,S.__cache={},this}function _(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),A}function m(S){const A=S.target;A.removeEventListener("dispose",m);const M=o.indexOf(A.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function d(){for(const S in s)n.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class VE{constructor(t={}){const{canvas:e=D0(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const S=[],A=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qe,this.toneMapping=Pi,this.toneMappingExposure=1;const M=this;let k=!1,L=0,P=0,N=null,w=-1,E=null;const D=new ye,U=new ye;let z=null;const nt=new Gt(0);let ot=0,et=e.width,it=e.height,Y=1,gt=null,yt=null;const Ct=new ye(0,0,et,it),Ut=new ye(0,0,et,it);let Kt=!1;const at=new Kc;let mt=!1,At=!1;const O=new de,$=new de,V=new W,lt=new ye,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let T=!1;function C(){return N===null?Y:1}let y=i;function st(b,G){return e.getContext(b,G)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${kc}`),e.addEventListener("webglcontextlost",pt,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",wt,!1),y===null){const G="webgl2";if(y=st(G,b),y===null)throw st(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let J,I,H,Z,j,x,v,R,F,K,q,dt,ft,ct,St,ut,Et,Pt,Nt,xt,Bt,zt,te,B;function Mt(){J=new qy(y),J.init(),zt=new LE(y,J),I=new ky(y,J,t,zt),H=new CE(y,J),I.reverseDepthBuffer&&f&&H.buffers.depth.setReversed(!0),Z=new Ky(y),j=new pE,x=new DE(y,J,H,j,I,zt,Z),v=new Gy(M),R=new jy(M),F=new ix(y),te=new zy(y,F),K=new Yy(y,F,Z,te),q=new Jy(y,K,F,Z),Nt=new Zy(y,I,x),ut=new Vy(j),dt=new dE(M,v,R,J,I,te,ut),ft=new HE(M,j),ct=new gE,St=new SE(J),Pt=new By(M,v,R,H,q,p,l),Et=new wE(M,q,I),B=new kE(y,Z,I,H),xt=new Hy(y,J,Z),Bt=new $y(y,J,Z),Z.programs=dt.programs,M.capabilities=I,M.extensions=J,M.properties=j,M.renderLists=ct,M.shadowMap=Et,M.state=H,M.info=Z}Mt();const rt=new BE(M,y);this.xr=rt,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const b=J.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=J.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(et,it,!1))},this.getSize=function(b){return b.set(et,it)},this.setSize=function(b,G,Q=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}et=b,it=G,e.width=Math.floor(b*Y),e.height=Math.floor(G*Y),Q===!0&&(e.style.width=b+"px",e.style.height=G+"px"),this.setViewport(0,0,b,G)},this.getDrawingBufferSize=function(b){return b.set(et*Y,it*Y).floor()},this.setDrawingBufferSize=function(b,G,Q){et=b,it=G,Y=Q,e.width=Math.floor(b*Q),e.height=Math.floor(G*Q),this.setViewport(0,0,b,G)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(Ct)},this.setViewport=function(b,G,Q,tt){b.isVector4?Ct.set(b.x,b.y,b.z,b.w):Ct.set(b,G,Q,tt),H.viewport(D.copy(Ct).multiplyScalar(Y).round())},this.getScissor=function(b){return b.copy(Ut)},this.setScissor=function(b,G,Q,tt){b.isVector4?Ut.set(b.x,b.y,b.z,b.w):Ut.set(b,G,Q,tt),H.scissor(U.copy(Ut).multiplyScalar(Y).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(b){H.setScissorTest(Kt=b)},this.setOpaqueSort=function(b){gt=b},this.setTransparentSort=function(b){yt=b},this.getClearColor=function(b){return b.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(b=!0,G=!0,Q=!0){let tt=0;if(b){let X=!1;if(N!==null){const _t=N.texture.format;X=_t===Yc||_t===qc||_t===jc}if(X){const _t=N.texture.type,Rt=_t===Gn||_t===Zi||_t===Br||_t===qs||_t===Wc||_t===Xc,Dt=Pt.getClearColor(),Lt=Pt.getClearAlpha(),kt=Dt.r,jt=Dt.g,It=Dt.b;Rt?(g[0]=kt,g[1]=jt,g[2]=It,g[3]=Lt,y.clearBufferuiv(y.COLOR,0,g)):(_[0]=kt,_[1]=jt,_[2]=It,_[3]=Lt,y.clearBufferiv(y.COLOR,0,_))}else tt|=y.COLOR_BUFFER_BIT}G&&(tt|=y.DEPTH_BUFFER_BIT),Q&&(tt|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear(tt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",pt,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),ct.dispose(),St.dispose(),j.dispose(),v.dispose(),R.dispose(),q.dispose(),te.dispose(),B.dispose(),dt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",qr),rt.removeEventListener("sessionend",pi),Xn.stop()};function pt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const b=Z.autoReset,G=Et.enabled,Q=Et.autoUpdate,tt=Et.needsUpdate,X=Et.type;Mt(),Z.autoReset=b,Et.enabled=G,Et.autoUpdate=Q,Et.needsUpdate=tt,Et.type=X}function wt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Wt(b){const G=b.target;G.removeEventListener("dispose",Wt),ve(G)}function ve(b){Ee(b),j.remove(b)}function Ee(b){const G=j.get(b).programs;G!==void 0&&(G.forEach(function(Q){dt.releaseProgram(Q)}),b.isShaderMaterial&&dt.releaseShaderCache(b))}this.renderBufferDirect=function(b,G,Q,tt,X,_t){G===null&&(G=vt);const Rt=X.isMesh&&X.matrixWorld.determinant()<0,Dt=Vp(b,G,Q,tt,X);H.setMaterial(tt,Rt);let Lt=Q.index,kt=1;if(tt.wireframe===!0){if(Lt=K.getWireframeAttribute(Q),Lt===void 0)return;kt=2}const jt=Q.drawRange,It=Q.attributes.position;let ee=jt.start*kt,pe=(jt.start+jt.count)*kt;_t!==null&&(ee=Math.max(ee,_t.start*kt),pe=Math.min(pe,(_t.start+_t.count)*kt)),Lt!==null?(ee=Math.max(ee,0),pe=Math.min(pe,Lt.count)):It!=null&&(ee=Math.max(ee,0),pe=Math.min(pe,It.count));const ge=pe-ee;if(ge<0||ge===1/0)return;te.setup(X,tt,Dt,Q,Lt);let Ke,ie=xt;if(Lt!==null&&(Ke=F.get(Lt),ie=Bt,ie.setIndex(Ke)),X.isMesh)tt.wireframe===!0?(H.setLineWidth(tt.wireframeLinewidth*C()),ie.setMode(y.LINES)):ie.setMode(y.TRIANGLES);else if(X.isLine){let Ot=tt.linewidth;Ot===void 0&&(Ot=1),H.setLineWidth(Ot*C()),X.isLineSegments?ie.setMode(y.LINES):X.isLineLoop?ie.setMode(y.LINE_LOOP):ie.setMode(y.LINE_STRIP)}else X.isPoints?ie.setMode(y.POINTS):X.isSprite&&ie.setMode(y.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)ie.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))ie.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Ot=X._multiDrawStarts,jn=X._multiDrawCounts,se=X._multiDrawCount,xn=Lt?F.get(Lt).bytesPerElement:1,ss=j.get(tt).currentProgram.getUniforms();for(let sn=0;sn<se;sn++)ss.setValue(y,"_gl_DrawID",sn),ie.render(Ot[sn]/xn,jn[sn])}else if(X.isInstancedMesh)ie.renderInstances(ee,ge,X.count);else if(Q.isInstancedBufferGeometry){const Ot=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,jn=Math.min(Q.instanceCount,Ot);ie.renderInstances(ee,ge,jn)}else ie.render(ee,ge)};function Jt(b,G,Q){b.transparent===!0&&b.side===En&&b.forceSinglePass===!1?(b.side=en,b.needsUpdate=!0,Kr(b,G,Q),b.side=Li,b.needsUpdate=!0,Kr(b,G,Q),b.side=En):Kr(b,G,Q)}this.compile=function(b,G,Q=null){Q===null&&(Q=b),d=St.get(Q),d.init(G),A.push(d),Q.traverseVisible(function(X){X.isLight&&X.layers.test(G.layers)&&(d.pushLight(X),X.castShadow&&d.pushShadow(X))}),b!==Q&&b.traverseVisible(function(X){X.isLight&&X.layers.test(G.layers)&&(d.pushLight(X),X.castShadow&&d.pushShadow(X))}),d.setupLights();const tt=new Set;return b.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const _t=X.material;if(_t)if(Array.isArray(_t))for(let Rt=0;Rt<_t.length;Rt++){const Dt=_t[Rt];Jt(Dt,Q,X),tt.add(Dt)}else Jt(_t,Q,X),tt.add(_t)}),A.pop(),d=null,tt},this.compileAsync=function(b,G,Q=null){const tt=this.compile(b,G,Q);return new Promise(X=>{function _t(){if(tt.forEach(function(Rt){j.get(Rt).currentProgram.isReady()&&tt.delete(Rt)}),tt.size===0){X(b);return}setTimeout(_t,10)}J.get("KHR_parallel_shader_compile")!==null?_t():setTimeout(_t,10)})};let nn=null;function vn(b){nn&&nn(b)}function qr(){Xn.stop()}function pi(){Xn.start()}const Xn=new Cp;Xn.setAnimationLoop(vn),typeof self<"u"&&Xn.setContext(self),this.setAnimationLoop=function(b){nn=b,rt.setAnimationLoop(b),b===null?Xn.stop():Xn.start()},rt.addEventListener("sessionstart",qr),rt.addEventListener("sessionend",pi),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(G),G=rt.getCamera()),b.isScene===!0&&b.onBeforeRender(M,b,G,N),d=St.get(b,A.length),d.init(G),A.push(d),$.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),at.setFromProjectionMatrix($),At=this.localClippingEnabled,mt=ut.init(this.clippingPlanes,At),m=ct.get(b,S.length),m.init(),S.push(m),rt.enabled===!0&&rt.isPresenting===!0){const _t=M.xr.getDepthSensingMesh();_t!==null&&nr(_t,G,-1/0,M.sortObjects)}nr(b,G,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(gt,yt),T=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,T&&Pt.addToRenderList(m,b),this.info.render.frame++,mt===!0&&ut.beginShadows();const Q=d.state.shadowsArray;Et.render(Q,b,G),mt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const tt=m.opaque,X=m.transmissive;if(d.setupLights(),G.isArrayCamera){const _t=G.cameras;if(X.length>0)for(let Rt=0,Dt=_t.length;Rt<Dt;Rt++){const Lt=_t[Rt];ou(tt,X,b,Lt)}T&&Pt.render(b);for(let Rt=0,Dt=_t.length;Rt<Dt;Rt++){const Lt=_t[Rt];Yr(m,b,Lt,Lt.viewport)}}else X.length>0&&ou(tt,X,b,G),T&&Pt.render(b),Yr(m,b,G);N!==null&&(x.updateMultisampleRenderTarget(N),x.updateRenderTargetMipmap(N)),b.isScene===!0&&b.onAfterRender(M,b,G),te.resetDefaultState(),w=-1,E=null,A.pop(),A.length>0?(d=A[A.length-1],mt===!0&&ut.setGlobalState(M.clippingPlanes,d.state.camera)):d=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function nr(b,G,Q,tt){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)Q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||at.intersectsSprite(b)){tt&&lt.setFromMatrixPosition(b.matrixWorld).applyMatrix4($);const Rt=q.update(b),Dt=b.material;Dt.visible&&m.push(b,Rt,Dt,Q,lt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||at.intersectsObject(b))){const Rt=q.update(b),Dt=b.material;if(tt&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),lt.copy(b.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),lt.copy(Rt.boundingSphere.center)),lt.applyMatrix4(b.matrixWorld).applyMatrix4($)),Array.isArray(Dt)){const Lt=Rt.groups;for(let kt=0,jt=Lt.length;kt<jt;kt++){const It=Lt[kt],ee=Dt[It.materialIndex];ee&&ee.visible&&m.push(b,Rt,ee,Q,lt.z,It)}}else Dt.visible&&m.push(b,Rt,Dt,Q,lt.z,null)}}const _t=b.children;for(let Rt=0,Dt=_t.length;Rt<Dt;Rt++)nr(_t[Rt],G,Q,tt)}function Yr(b,G,Q,tt){const X=b.opaque,_t=b.transmissive,Rt=b.transparent;d.setupLightsView(Q),mt===!0&&ut.setGlobalState(M.clippingPlanes,Q),tt&&H.viewport(D.copy(tt)),X.length>0&&$r(X,G,Q),_t.length>0&&$r(_t,G,Q),Rt.length>0&&$r(Rt,G,Q),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function ou(b,G,Q,tt){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[tt.id]===void 0&&(d.state.transmissionRenderTarget[tt.id]=new wn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?li:Gn,minFilter:Ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const _t=d.state.transmissionRenderTarget[tt.id],Rt=tt.viewport||D;_t.setSize(Rt.z,Rt.w);const Dt=M.getRenderTarget();M.setRenderTarget(_t),M.getClearColor(nt),ot=M.getClearAlpha(),ot<1&&M.setClearColor(16777215,.5),M.clear(),T&&Pt.render(Q);const Lt=M.toneMapping;M.toneMapping=Pi;const kt=tt.viewport;if(tt.viewport!==void 0&&(tt.viewport=void 0),d.setupLightsView(tt),mt===!0&&ut.setGlobalState(M.clippingPlanes,tt),$r(b,Q,tt),x.updateMultisampleRenderTarget(_t),x.updateRenderTargetMipmap(_t),J.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let It=0,ee=G.length;It<ee;It++){const pe=G[It],ge=pe.object,Ke=pe.geometry,ie=pe.material,Ot=pe.group;if(ie.side===En&&ge.layers.test(tt.layers)){const jn=ie.side;ie.side=en,ie.needsUpdate=!0,au(ge,Q,tt,Ke,ie,Ot),ie.side=jn,ie.needsUpdate=!0,jt=!0}}jt===!0&&(x.updateMultisampleRenderTarget(_t),x.updateRenderTargetMipmap(_t))}M.setRenderTarget(Dt),M.setClearColor(nt,ot),kt!==void 0&&(tt.viewport=kt),M.toneMapping=Lt}function $r(b,G,Q){const tt=G.isScene===!0?G.overrideMaterial:null;for(let X=0,_t=b.length;X<_t;X++){const Rt=b[X],Dt=Rt.object,Lt=Rt.geometry,kt=tt===null?Rt.material:tt,jt=Rt.group;Dt.layers.test(Q.layers)&&au(Dt,G,Q,Lt,kt,jt)}}function au(b,G,Q,tt,X,_t){b.onBeforeRender(M,G,Q,tt,X,_t),b.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),X.onBeforeRender(M,G,Q,tt,b,_t),X.transparent===!0&&X.side===En&&X.forceSinglePass===!1?(X.side=en,X.needsUpdate=!0,M.renderBufferDirect(Q,G,tt,X,b,_t),X.side=Li,X.needsUpdate=!0,M.renderBufferDirect(Q,G,tt,X,b,_t),X.side=En):M.renderBufferDirect(Q,G,tt,X,b,_t),b.onAfterRender(M,G,Q,tt,X,_t)}function Kr(b,G,Q){G.isScene!==!0&&(G=vt);const tt=j.get(b),X=d.state.lights,_t=d.state.shadowsArray,Rt=X.state.version,Dt=dt.getParameters(b,X.state,_t,G,Q),Lt=dt.getProgramCacheKey(Dt);let kt=tt.programs;tt.environment=b.isMeshStandardMaterial?G.environment:null,tt.fog=G.fog,tt.envMap=(b.isMeshStandardMaterial?R:v).get(b.envMap||tt.environment),tt.envMapRotation=tt.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,kt===void 0&&(b.addEventListener("dispose",Wt),kt=new Map,tt.programs=kt);let jt=kt.get(Lt);if(jt!==void 0){if(tt.currentProgram===jt&&tt.lightsStateVersion===Rt)return cu(b,Dt),jt}else Dt.uniforms=dt.getUniforms(b),b.onBeforeCompile(Dt,M),jt=dt.acquireProgram(Dt,Lt),kt.set(Lt,jt),tt.uniforms=Dt.uniforms;const It=tt.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(It.clippingPlanes=ut.uniform),cu(b,Dt),tt.needsLights=Wp(b),tt.lightsStateVersion=Rt,tt.needsLights&&(It.ambientLightColor.value=X.state.ambient,It.lightProbe.value=X.state.probe,It.directionalLights.value=X.state.directional,It.directionalLightShadows.value=X.state.directionalShadow,It.spotLights.value=X.state.spot,It.spotLightShadows.value=X.state.spotShadow,It.rectAreaLights.value=X.state.rectArea,It.ltc_1.value=X.state.rectAreaLTC1,It.ltc_2.value=X.state.rectAreaLTC2,It.pointLights.value=X.state.point,It.pointLightShadows.value=X.state.pointShadow,It.hemisphereLights.value=X.state.hemi,It.directionalShadowMap.value=X.state.directionalShadowMap,It.directionalShadowMatrix.value=X.state.directionalShadowMatrix,It.spotShadowMap.value=X.state.spotShadowMap,It.spotLightMatrix.value=X.state.spotLightMatrix,It.spotLightMap.value=X.state.spotLightMap,It.pointShadowMap.value=X.state.pointShadowMap,It.pointShadowMatrix.value=X.state.pointShadowMatrix),tt.currentProgram=jt,tt.uniformsList=null,jt}function lu(b){if(b.uniformsList===null){const G=b.currentProgram.getUniforms();b.uniformsList=Ho.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function cu(b,G){const Q=j.get(b);Q.outputColorSpace=G.outputColorSpace,Q.batching=G.batching,Q.batchingColor=G.batchingColor,Q.instancing=G.instancing,Q.instancingColor=G.instancingColor,Q.instancingMorph=G.instancingMorph,Q.skinning=G.skinning,Q.morphTargets=G.morphTargets,Q.morphNormals=G.morphNormals,Q.morphColors=G.morphColors,Q.morphTargetsCount=G.morphTargetsCount,Q.numClippingPlanes=G.numClippingPlanes,Q.numIntersection=G.numClipIntersection,Q.vertexAlphas=G.vertexAlphas,Q.vertexTangents=G.vertexTangents,Q.toneMapping=G.toneMapping}function Vp(b,G,Q,tt,X){G.isScene!==!0&&(G=vt),x.resetTextureUnits();const _t=G.fog,Rt=tt.isMeshStandardMaterial?G.environment:null,Dt=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Js,Lt=(tt.isMeshStandardMaterial?R:v).get(tt.envMap||Rt),kt=tt.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,jt=!!Q.attributes.tangent&&(!!tt.normalMap||tt.anisotropy>0),It=!!Q.morphAttributes.position,ee=!!Q.morphAttributes.normal,pe=!!Q.morphAttributes.color;let ge=Pi;tt.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(ge=M.toneMapping);const Ke=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ie=Ke!==void 0?Ke.length:0,Ot=j.get(tt),jn=d.state.lights;if(mt===!0&&(At===!0||b!==E)){const un=b===E&&tt.id===w;ut.setState(tt,b,un)}let se=!1;tt.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==jn.state.version||Ot.outputColorSpace!==Dt||X.isBatchedMesh&&Ot.batching===!1||!X.isBatchedMesh&&Ot.batching===!0||X.isBatchedMesh&&Ot.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ot.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ot.instancing===!1||!X.isInstancedMesh&&Ot.instancing===!0||X.isSkinnedMesh&&Ot.skinning===!1||!X.isSkinnedMesh&&Ot.skinning===!0||X.isInstancedMesh&&Ot.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ot.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ot.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ot.instancingMorph===!1&&X.morphTexture!==null||Ot.envMap!==Lt||tt.fog===!0&&Ot.fog!==_t||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==ut.numPlanes||Ot.numIntersection!==ut.numIntersection)||Ot.vertexAlphas!==kt||Ot.vertexTangents!==jt||Ot.morphTargets!==It||Ot.morphNormals!==ee||Ot.morphColors!==pe||Ot.toneMapping!==ge||Ot.morphTargetsCount!==ie)&&(se=!0):(se=!0,Ot.__version=tt.version);let xn=Ot.currentProgram;se===!0&&(xn=Kr(tt,G,X));let ss=!1,sn=!1,ir=!1;const _e=xn.getUniforms(),Pn=Ot.uniforms;if(H.useProgram(xn.program)&&(ss=!0,sn=!0,ir=!0),tt.id!==w&&(w=tt.id,sn=!0),ss||E!==b){H.buffers.depth.getReversed()?(O.copy(b.projectionMatrix),I0(O),U0(O),_e.setValue(y,"projectionMatrix",O)):_e.setValue(y,"projectionMatrix",b.projectionMatrix),_e.setValue(y,"viewMatrix",b.matrixWorldInverse);const mi=_e.map.cameraPosition;mi!==void 0&&mi.setValue(y,V.setFromMatrixPosition(b.matrixWorld)),I.logarithmicDepthBuffer&&_e.setValue(y,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(tt.isMeshPhongMaterial||tt.isMeshToonMaterial||tt.isMeshLambertMaterial||tt.isMeshBasicMaterial||tt.isMeshStandardMaterial||tt.isShaderMaterial)&&_e.setValue(y,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,sn=!0,ir=!0)}if(X.isSkinnedMesh){_e.setOptional(y,X,"bindMatrix"),_e.setOptional(y,X,"bindMatrixInverse");const un=X.skeleton;un&&(un.boneTexture===null&&un.computeBoneTexture(),_e.setValue(y,"boneTexture",un.boneTexture,x))}X.isBatchedMesh&&(_e.setOptional(y,X,"batchingTexture"),_e.setValue(y,"batchingTexture",X._matricesTexture,x),_e.setOptional(y,X,"batchingIdTexture"),_e.setValue(y,"batchingIdTexture",X._indirectTexture,x),_e.setOptional(y,X,"batchingColorTexture"),X._colorsTexture!==null&&_e.setValue(y,"batchingColorTexture",X._colorsTexture,x));const sr=Q.morphAttributes;if((sr.position!==void 0||sr.normal!==void 0||sr.color!==void 0)&&Nt.update(X,Q,xn),(sn||Ot.receiveShadow!==X.receiveShadow)&&(Ot.receiveShadow=X.receiveShadow,_e.setValue(y,"receiveShadow",X.receiveShadow)),tt.isMeshGouraudMaterial&&tt.envMap!==null&&(Pn.envMap.value=Lt,Pn.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),tt.isMeshStandardMaterial&&tt.envMap===null&&G.environment!==null&&(Pn.envMapIntensity.value=G.environmentIntensity),sn&&(_e.setValue(y,"toneMappingExposure",M.toneMappingExposure),Ot.needsLights&&Gp(Pn,ir),_t&&tt.fog===!0&&ft.refreshFogUniforms(Pn,_t),ft.refreshMaterialUniforms(Pn,tt,Y,it,d.state.transmissionRenderTarget[b.id]),Ho.upload(y,lu(Ot),Pn,x)),tt.isShaderMaterial&&tt.uniformsNeedUpdate===!0&&(Ho.upload(y,lu(Ot),Pn,x),tt.uniformsNeedUpdate=!1),tt.isSpriteMaterial&&_e.setValue(y,"center",X.center),_e.setValue(y,"modelViewMatrix",X.modelViewMatrix),_e.setValue(y,"normalMatrix",X.normalMatrix),_e.setValue(y,"modelMatrix",X.matrixWorld),tt.isShaderMaterial||tt.isRawShaderMaterial){const un=tt.uniformsGroups;for(let mi=0,gi=un.length;mi<gi;mi++){const uu=un[mi];B.update(uu,xn),B.bind(uu,xn)}}return xn}function Gp(b,G){b.ambientLightColor.needsUpdate=G,b.lightProbe.needsUpdate=G,b.directionalLights.needsUpdate=G,b.directionalLightShadows.needsUpdate=G,b.pointLights.needsUpdate=G,b.pointLightShadows.needsUpdate=G,b.spotLights.needsUpdate=G,b.spotLightShadows.needsUpdate=G,b.rectAreaLights.needsUpdate=G,b.hemisphereLights.needsUpdate=G}function Wp(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(b,G,Q){j.get(b.texture).__webglTexture=G,j.get(b.depthTexture).__webglTexture=Q;const tt=j.get(b);tt.__hasExternalTextures=!0,tt.__autoAllocateDepthBuffer=Q===void 0,tt.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),tt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,G){const Q=j.get(b);Q.__webglFramebuffer=G,Q.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,Q=0){N=b,L=G,P=Q;let tt=!0,X=null,_t=!1,Rt=!1;if(b){const Lt=j.get(b);if(Lt.__useDefaultFramebuffer!==void 0)H.bindFramebuffer(y.FRAMEBUFFER,null),tt=!1;else if(Lt.__webglFramebuffer===void 0)x.setupRenderTarget(b);else if(Lt.__hasExternalTextures)x.rebindTextures(b,j.get(b.texture).__webglTexture,j.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const It=b.depthTexture;if(Lt.__boundDepthTexture!==It){if(It!==null&&j.has(It)&&(b.width!==It.image.width||b.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(b)}}const kt=b.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Rt=!0);const jt=j.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(jt[G])?X=jt[G][Q]:X=jt[G],_t=!0):b.samples>0&&x.useMultisampledRTT(b)===!1?X=j.get(b).__webglMultisampledFramebuffer:Array.isArray(jt)?X=jt[Q]:X=jt,D.copy(b.viewport),U.copy(b.scissor),z=b.scissorTest}else D.copy(Ct).multiplyScalar(Y).floor(),U.copy(Ut).multiplyScalar(Y).floor(),z=Kt;if(H.bindFramebuffer(y.FRAMEBUFFER,X)&&tt&&H.drawBuffers(b,X),H.viewport(D),H.scissor(U),H.setScissorTest(z),_t){const Lt=j.get(b.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+G,Lt.__webglTexture,Q)}else if(Rt){const Lt=j.get(b.texture),kt=G||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,Lt.__webglTexture,Q||0,kt)}w=-1},this.readRenderTargetPixels=function(b,G,Q,tt,X,_t,Rt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=j.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Dt=Dt[Rt]),Dt){H.bindFramebuffer(y.FRAMEBUFFER,Dt);try{const Lt=b.texture,kt=Lt.format,jt=Lt.type;if(!I.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!I.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=b.width-tt&&Q>=0&&Q<=b.height-X&&y.readPixels(G,Q,tt,X,zt.convert(kt),zt.convert(jt),_t)}finally{const Lt=N!==null?j.get(N).__webglFramebuffer:null;H.bindFramebuffer(y.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(b,G,Q,tt,X,_t,Rt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=j.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Dt=Dt[Rt]),Dt){const Lt=b.texture,kt=Lt.format,jt=Lt.type;if(!I.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!I.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=b.width-tt&&Q>=0&&Q<=b.height-X){H.bindFramebuffer(y.FRAMEBUFFER,Dt);const It=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,It),y.bufferData(y.PIXEL_PACK_BUFFER,_t.byteLength,y.STREAM_READ),y.readPixels(G,Q,tt,X,zt.convert(kt),zt.convert(jt),0);const ee=N!==null?j.get(N).__webglFramebuffer:null;H.bindFramebuffer(y.FRAMEBUFFER,ee);const pe=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await L0(y,pe,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,It),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,_t),y.deleteBuffer(It),y.deleteSync(pe),_t}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,G=null,Q=0){b.isTexture!==!0&&(xr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,b=arguments[1]);const tt=Math.pow(2,-Q),X=Math.floor(b.image.width*tt),_t=Math.floor(b.image.height*tt),Rt=G!==null?G.x:0,Dt=G!==null?G.y:0;x.setTexture2D(b,0),y.copyTexSubImage2D(y.TEXTURE_2D,Q,0,0,Rt,Dt,X,_t),H.unbindTexture()},this.copyTextureToTexture=function(b,G,Q=null,tt=null,X=0){b.isTexture!==!0&&(xr("WebGLRenderer: copyTextureToTexture function signature has changed."),tt=arguments[0]||null,b=arguments[1],G=arguments[2],X=arguments[3]||0,Q=null);let _t,Rt,Dt,Lt,kt,jt,It,ee,pe;const ge=b.isCompressedTexture?b.mipmaps[X]:b.image;Q!==null?(_t=Q.max.x-Q.min.x,Rt=Q.max.y-Q.min.y,Dt=Q.isBox3?Q.max.z-Q.min.z:1,Lt=Q.min.x,kt=Q.min.y,jt=Q.isBox3?Q.min.z:0):(_t=ge.width,Rt=ge.height,Dt=ge.depth||1,Lt=0,kt=0,jt=0),tt!==null?(It=tt.x,ee=tt.y,pe=tt.z):(It=0,ee=0,pe=0);const Ke=zt.convert(G.format),ie=zt.convert(G.type);let Ot;G.isData3DTexture?(x.setTexture3D(G,0),Ot=y.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(x.setTexture2DArray(G,0),Ot=y.TEXTURE_2D_ARRAY):(x.setTexture2D(G,0),Ot=y.TEXTURE_2D),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,G.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,G.unpackAlignment);const jn=y.getParameter(y.UNPACK_ROW_LENGTH),se=y.getParameter(y.UNPACK_IMAGE_HEIGHT),xn=y.getParameter(y.UNPACK_SKIP_PIXELS),ss=y.getParameter(y.UNPACK_SKIP_ROWS),sn=y.getParameter(y.UNPACK_SKIP_IMAGES);y.pixelStorei(y.UNPACK_ROW_LENGTH,ge.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,ge.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,Lt),y.pixelStorei(y.UNPACK_SKIP_ROWS,kt),y.pixelStorei(y.UNPACK_SKIP_IMAGES,jt);const ir=b.isDataArrayTexture||b.isData3DTexture,_e=G.isDataArrayTexture||G.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const Pn=j.get(b),sr=j.get(G),un=j.get(Pn.__renderTarget),mi=j.get(sr.__renderTarget);H.bindFramebuffer(y.READ_FRAMEBUFFER,un.__webglFramebuffer),H.bindFramebuffer(y.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let gi=0;gi<Dt;gi++)ir&&y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,j.get(b).__webglTexture,X,jt+gi),b.isDepthTexture?(_e&&y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,j.get(G).__webglTexture,X,pe+gi),y.blitFramebuffer(Lt,kt,_t,Rt,It,ee,_t,Rt,y.DEPTH_BUFFER_BIT,y.NEAREST)):_e?y.copyTexSubImage3D(Ot,X,It,ee,pe+gi,Lt,kt,_t,Rt):y.copyTexSubImage2D(Ot,X,It,ee,pe+gi,Lt,kt,_t,Rt);H.bindFramebuffer(y.READ_FRAMEBUFFER,null),H.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else _e?b.isDataTexture||b.isData3DTexture?y.texSubImage3D(Ot,X,It,ee,pe,_t,Rt,Dt,Ke,ie,ge.data):G.isCompressedArrayTexture?y.compressedTexSubImage3D(Ot,X,It,ee,pe,_t,Rt,Dt,Ke,ge.data):y.texSubImage3D(Ot,X,It,ee,pe,_t,Rt,Dt,Ke,ie,ge):b.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,X,It,ee,_t,Rt,Ke,ie,ge.data):b.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,X,It,ee,ge.width,ge.height,Ke,ge.data):y.texSubImage2D(y.TEXTURE_2D,X,It,ee,_t,Rt,Ke,ie,ge);y.pixelStorei(y.UNPACK_ROW_LENGTH,jn),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,se),y.pixelStorei(y.UNPACK_SKIP_PIXELS,xn),y.pixelStorei(y.UNPACK_SKIP_ROWS,ss),y.pixelStorei(y.UNPACK_SKIP_IMAGES,sn),X===0&&G.generateMipmaps&&y.generateMipmap(Ot),H.unbindTexture()},this.copyTextureToTexture3D=function(b,G,Q=null,tt=null,X=0){return b.isTexture!==!0&&(xr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,tt=arguments[1]||null,b=arguments[2],G=arguments[3],X=arguments[4]||0),xr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,G,Q,tt,X)},this.initRenderTarget=function(b){j.get(b).__webglFramebuffer===void 0&&x.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?x.setTextureCube(b,0):b.isData3DTexture?x.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?x.setTexture2DArray(b,0):x.setTexture2D(b,0),H.unbindTexture()},this.resetState=function(){L=0,P=0,N=null,H.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class Qc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Gt(t),this.density=e}clone(){return new Qc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class GE extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class WE extends $e{constructor(t=null,e=1,i=1,s,r,o,a,l,c=cn,u=cn,h,f){super(null,o,a,l,c,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xc extends is{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qo=new W,ta=new W,rf=new de,pr=new Xr,Eo=new Qs,fl=new W,of=new W;class XE extends Te{constructor(t=new He,e=new xc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Qo.fromBufferAttribute(e,s-1),ta.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Qo.distanceTo(ta);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Eo.copy(i.boundingSphere),Eo.applyMatrix4(s),Eo.radius+=r,t.ray.intersectsSphere(Eo)===!1)return;rf.copy(s).invert(),pr.copy(t.ray).applyMatrix4(rf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=u.getX(_),S=u.getX(_+1),A=bo(this,t,pr,l,d,S);A&&e.push(A)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),d=bo(this,t,pr,l,_,m);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=bo(this,t,pr,l,_,_+1);d&&e.push(d)}if(this.isLineLoop){const _=bo(this,t,pr,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function bo(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Qo.fromBufferAttribute(o,s),ta.fromBufferAttribute(o,r),e.distanceSqToSegment(Qo,ta,fl,of)>i)return;fl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(fl);if(!(l<t.near||l>t.far))return{distance:l,point:of.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const af=new W,lf=new W;class cf extends XE{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)af.fromBufferAttribute(e,s),lf.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+af.distanceTo(lf);t.setAttribute("lineDistance",new Se(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jE extends is{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const uf=new de,Mc=new Xr,To=new Qs,Ao=new W;class qE extends Te{constructor(t=new He,e=new jE){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(s),To.radius+=r,t.ray.intersectsSphere(To)===!1)return;uf.copy(s).invert(),Mc.copy(t.ray).applyMatrix4(uf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);Ao.fromBufferAttribute(h,m),hf(Ao,m,l,s,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let g=f,_=p;g<_;g++)Ao.fromBufferAttribute(h,g),hf(Ao,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function hf(n,t,e,i,s,r,o){const a=Mc.distanceSqToPoint(n);if(a<e){const l=new W;Mc.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class tu extends He{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let h=t;const f=(e-t)/s,p=new W,g=new Ft;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const d=r+m/i*o;p.x=h*Math.cos(d),p.y=h*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,u.push(g.x,g.y)}h+=f}for(let _=0;_<s;_++){const m=_*(i+1);for(let d=0;d<i;d++){const S=d+m,A=S,M=S+i+1,k=S+i+2,L=S+1;a.push(A,M,L),a.push(M,k,L)}}this.setIndex(a),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ws extends He{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],h=new W,f=new W,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const S=[],A=d/i;let M=0;d===0&&o===0?M=.5/e:d===i&&l===Math.PI&&(M=-.5/e);for(let k=0;k<=e;k++){const L=k/e;h.x=-t*Math.cos(s+L*r)*Math.sin(o+A*a),h.y=t*Math.cos(o+A*a),h.z=t*Math.sin(s+L*r)*Math.sin(o+A*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(L+M,1-A),S.push(c++)}u.push(S)}for(let d=0;d<i;d++)for(let S=0;S<e;S++){const A=u[d][S+1],M=u[d][S],k=u[d+1][S],L=u[d+1][S+1];(d!==0||o>0)&&p.push(A,M,L),(d!==i-1||l<Math.PI)&&p.push(M,k,L)}this.setIndex(p),this.setAttribute("position",new Se(g,3)),this.setAttribute("normal",new Se(_,3)),this.setAttribute("uv",new Se(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class eu extends He{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new W,h=new W,f=new W;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/i*Math.PI*2;h.x=(t+e*Math.cos(m))*Math.cos(_),h.y=(t+e*Math.cos(m))*Math.sin(_),h.z=e*Math.sin(m),a.push(h.x,h.y,h.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),f.subVectors(h,u).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,S=(s+1)*p+g;o.push(_,m,S),o.push(m,d,S)}this.setIndex(o),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class YE extends Be{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class ff extends is{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vp,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Np extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class $E extends Np{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const dl=new de,df=new W,pf=new W;class KE{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kc,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;df.setFromMatrixPosition(t.matrixWorld),e.position.copy(df),pf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pf),e.updateMatrixWorld(),dl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(dl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class ZE extends KE{constructor(){super(new Zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mf extends Np{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new ZE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Op{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gf(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=gf();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function gf(){return performance.now()}const _f=new de;class JE{constructor(t,e,i=0,s=1/0){this.ray=new Xr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new $c,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return _f.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_f),this}intersectObject(t,e=!0,i=[]){return yc(t,this,i,e),i.sort(vf),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)yc(t[s],this,i,e);return i.sort(vf),i}}function vf(n,t){return n.distance-t.distance}function yc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)yc(r[o],t,e,!0)}}class xf{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(qe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class QE extends ns{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kc);const Mf={type:"change"},nu={type:"start"},Fp={type:"end"},wo=new Xr,yf=new wi,tb=Math.cos(70*P0.DEG2RAD),Ae=new W,Je=2*Math.PI,he={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pl=1e-6;class eb extends QE{constructor(t,e=null){super(t,e),this.state=he.NONE,this.enabled=!0,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ls.ROTATE,MIDDLE:Ls.DOLLY,RIGHT:Ls.PAN},this.touches={ONE:bs.ROTATE,TWO:bs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new Ji,this._lastTargetPosition=new W,this._quat=new Ji().setFromUnitVectors(t.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new xf,this._sphericalDelta=new xf,this._scale=1,this._panOffset=new W,this._rotateStart=new Ft,this._rotateEnd=new Ft,this._rotateDelta=new Ft,this._panStart=new Ft,this._panEnd=new Ft,this._panDelta=new Ft,this._dollyStart=new Ft,this._dollyEnd=new Ft,this._dollyDelta=new Ft,this._dollyDirection=new W,this._mouse=new Ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ib.bind(this),this._onPointerDown=nb.bind(this),this._onPointerUp=sb.bind(this),this._onContextMenu=hb.bind(this),this._onMouseWheel=ab.bind(this),this._onKeyDown=lb.bind(this),this._onTouchStart=cb.bind(this),this._onTouchMove=ub.bind(this),this._onMouseDown=rb.bind(this),this._onMouseMove=ob.bind(this),this._interceptControlDown=fb.bind(this),this._interceptControlUp=db.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Mf),this.update(),this.state=he.NONE}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===he.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Je:i>Math.PI&&(i-=Je),s<-Math.PI?s+=Je:s>Math.PI&&(s-=Je),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ae.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new W(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new W(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(wo.origin.copy(this.object.position),wo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(wo.direction))<tb?this.object.lookAt(this.target):(yf.setFromNormalAndCoplanarPoint(this.object.up,this.target),wo.intersectPlane(yf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>pl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pl||this._lastTargetPosition.distanceToSquared(this.target)>pl?(this.dispatchEvent(Mf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function nb(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function ib(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function sb(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Fp),this.state=he.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function rb(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ls.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=he.DOLLY;break;case Ls.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}break;case Ls.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=he.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=he.PAN}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(nu)}function ob(n){switch(this.state){case he.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case he.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case he.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function ab(n){this.enabled===!1||this.enableZoom===!1||this.state!==he.NONE||(n.preventDefault(),this.dispatchEvent(nu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Fp))}function lb(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function cb(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case bs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=he.TOUCH_ROTATE;break;case bs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=he.TOUCH_PAN;break;default:this.state=he.NONE}break;case 2:switch(this.touches.TWO){case bs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=he.TOUCH_DOLLY_PAN;break;case bs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=he.TOUCH_DOLLY_ROTATE;break;default:this.state=he.NONE}break;default:this.state=he.NONE}this.state!==he.NONE&&this.dispatchEvent(nu)}function ub(n){switch(this._trackPointer(n),this.state){case he.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case he.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case he.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case he.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=he.NONE}}function hb(n){this.enabled!==!1&&n.preventDefault()}function fb(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function db(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Bp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class er{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const pb=new Zc(-1,1,1,-1,0,1);class mb extends He{constructor(){super(),this.setAttribute("position",new Se([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Se([0,2,0,0,2,0],2))}}const gb=new mb;class iu{constructor(t){this._mesh=new Re(gb,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,pb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class _b extends er{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Be?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=zr.clone(t.uniforms),this.material=new Be({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new iu(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Sf extends er{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class vb extends er{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class xb{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new Ft);this._width=i.width,this._height=i.height,e=new wn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:li}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new _b(Bp),this.copyPass.material.blending=ai,this.clock=new Op}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Sf!==void 0&&(o instanceof Sf?i=!0:o instanceof vb&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Ft);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Mb={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class yb extends er{constructor(){super();const t=Mb;this.uniforms=zr.clone(t.uniforms),this.material=new YE({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new iu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Qt.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===np?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===ip?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===sp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===rp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===op&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Sb extends er{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Gt}render(t,e,i){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const Eb={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Gt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ks extends er{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new Ft(t.x,t.y):new Ft(256,256),this.clearColor=new Gt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new wn(r,o,{type:li}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const f=new wn(r,o,{type:li});f.texture.name="UnrealBloomPass.h"+h,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new wn(r,o,{type:li});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=Eb;this.highPassUniforms=zr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Be({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ft(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Bp;this.copyUniforms=zr.clone(u.uniforms),this.blendMaterial=new Be({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Us,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Gt,this.oldClearAlpha=1,this.basic=new fn,this.fsQuad=new iu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ft(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ks.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ks.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Be({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Ft(.5,.5)},direction:{value:new Ft(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}Ks.BlurDirectionX=new Ft(1,0);Ks.BlurDirectionY=new Ft(0,1);class mr extends Te{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Ft(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Ms=new W,Ef=new de,bf=new de,Tf=new W,Af=new W;class bb{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Ef.copy(_.matrixWorldInverse),bf.multiplyMatrices(_.projectionMatrix,Ef),u(g,g,_),p(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Ms.setFromMatrixPosition(g.matrixWorld),Ms.applyMatrix4(bf);const d=Ms.z>=-1&&Ms.z<=1&&g.layers.test(m.layers)===!0,S=g.element;S.style.display=d===!0?"":"none",d===!0&&(g.onBeforeRender(e,_,m),S.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Ms.x*r+r)+"px,"+(-Ms.y*o+o)+"px)",S.parentNode!==l&&l.appendChild(S),g.onAfterRender(e,_,m));const A={distanceToCameraSquared:h(m,g)};a.objects.set(g,A)}for(let d=0,S=g.children.length;d<S;d++)u(g.children[d],_,m)}function h(g,_){return Tf.setFromMatrixPosition(g.matrixWorld),Af.setFromMatrixPosition(_.matrixWorld),Tf.distanceToSquared(Af)}function f(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function p(g){const _=f(g).sort(function(d,S){if(d.renderOrder!==S.renderOrder)return S.renderOrder-d.renderOrder;const A=a.objects.get(d).distanceToCameraSquared,M=a.objects.get(S).distanceToCameraSquared;return A-M}),m=_.length;for(let d=0,S=_.length;d<S;d++)_[d].element.style.zIndex=m-d}}}const Tb="v5";function Ab(n,t){return`${Tb}-${n}-${t}`}const ea=new Map;function wf(n){let t=2166136261;for(let e=0;e<n.length;e++)t^=n.charCodeAt(e),t=Math.imul(t,16777619);return t>>>0}function wb(n){return n-Math.floor(n)}function Ro(n,t,e){return wb(Math.sin(n*127.1+t*311.7+e*.001)*43758.5453)}function Sc(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=Ro(i,s,e),u=Ro(i+1,s,e),h=Ro(i,s+1,e),f=Ro(i+1,s+1,e);return c+(u-c)*a+(h-c)*l+(f-h-(u-c))*a*l}function Rb(n,t,e){let i=0,s=.5,r=1;for(let o=0;o<5;o++)i+=s*Sc(n*r,t*r,e+o*17),r*=2,s*=.5;return i}function Cb(n,t,e){const i=(n%360+360)%360/360,s=Math.max(0,Math.min(1,t)),r=Math.max(0,Math.min(1,e)),o=s*Math.min(r,1-r),a=l=>{const c=(l+i*12)%12;return r-o*Math.max(-1,Math.min(c-3,9-c,1))};return[a(0)*255,a(8)*255,a(4)*255]}function Pb(n,t,e,i){const s=new Uint8Array(n*n*4),r=i==="fusion"?.58:.52;for(let a=0;a<n;a++)for(let l=0;l<n;l++){const c=l/n,u=a/n,h=Rb(c*4.2+t*.002,u*4.2-t*.001,t),p=.38+.62*Math.abs(Math.sin((c*26+u*18+t*7e-4)*Math.PI*2)),g=Math.pow(Math.max(0,Sc(c*14,u*14,t+11)-.38),1.4),_=Sc(c*36,u*36,t+73)>.82?.72:1;let m=(.22+.58*h)*p*(1-g*.55)*_;m=Math.min(.88,Math.max(.12,m)),i==="fusion"&&(m=m*.92+.04);const[d,S,A]=Cb(e,r,m),M=(a*n+l)*4;s[M]=d,s[M+1]=S,s[M+2]=A,s[M+3]=255}const o=new WE(s,n,n);return o.format=mn,o.type=Gn,o.colorSpace=Qe,o.wrapS=Fr,o.wrapT=Fr,o.generateMipmaps=!0,o.minFilter=Ci,o.magFilter=Tn,o.flipY=!0,o.needsUpdate=!0,o}function Db(n,t){const e=wf(n)%14,i=Ab(t,e);let s=ea.get(i);if(!s){const r=wf(`${n}-${t}`)+e*104729,o=t==="major"?198+e%5*5:265+e%5*4;s=Pb(256,r,o,t),ea.set(i,s)}return{map:s}}function Lb(){for(const n of ea.values())n.dispose();ea.clear()}const Ib=461586,Ub=4874368,Nb=9103615,Rf=12101887,Ob=4873336,Fb=6091007,Cf=13165823,Bb=10205416,zb=1.35,Hb=4e3,kb=["热度/年薪","强度/竞争","学历门槛","学科技能"];function su(n,t,e,i){const s=n.clientWidth||window.innerWidth,r=n.clientHeight||window.innerHeight,o=new GE;o.background=new Gt(Ib),o.fog=new Qc(Ub,.032);const a=new pn(55,s/r,.1,200);a.position.set(12,10,16);const l=new VE({antialias:!0,alpha:!1,powerPreference:"high-performance"});l.setPixelRatio(Math.min(window.devicePixelRatio,2)),l.setSize(s,r),l.outputColorSpace=Qe,l.toneMapping=Vc,l.toneMappingExposure=1.12,n.style.position||(n.style.position="relative"),n.appendChild(l.domElement);const c=document.createElement("div");c.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:3;touch-action:none;",n.appendChild(c);const u=new bb({element:c});u.setSize(s,r);const h=Math.min(window.devicePixelRatio,2),f=new xb(l);f.setPixelRatio(h);const p=new Sb(o,a),g=new Ft(Math.max(128,Math.floor(s*h/2)),Math.max(128,Math.floor(r*h/2))),_=new Ks(g,.34,.34,.88),m=new yb;f.addPass(p),f.addPass(_),f.addPass(m);const d=new $E(9088744,1382432,.62);o.add(d);const S=new mf(15791871,.55);S.position.set(8,14,10),o.add(S);const A=new mf(6324424,.22);A.position.set(-12,-2,-8),o.add(A);const M=new eb(a,l.domElement);M.enableDamping=!0,M.dampingFactor=.06,M.minDistance=4,M.maxDistance=48,M.autoRotate=!0,M.autoRotateSpeed=zb;let k=null,L=!1;const P=()=>{k!==null&&(window.clearTimeout(k),k=null)},N=()=>{P(),k=window.setTimeout(()=>{L||(M.autoRotate=!0)},Hb)},w=()=>{L=!0,M.autoRotate=!1,P()},E=()=>{L=!1,N()},D=()=>{M.autoRotate=!1,N()},U=new Map,z=new Map;let nt=null,ot=null;const it=(()=>{const H=new Float32Array(4800),Z=new Float32Array(1600);for(let R=0;R<1600;R++){const F=Math.random(),K=Math.random(),q=2*Math.PI*F,dt=Math.acos(2*K-1),ft=28+Math.random()*72,ct=Math.sin(dt);H[R*3]=ft*ct*Math.cos(q),H[R*3+1]=ft*ct*Math.sin(q),H[R*3+2]=ft*Math.cos(dt),Z[R]=.04+Math.random()*.12}const j=new He;j.setAttribute("position",new _n(H,3)),j.setAttribute("size",new _n(Z,1));const x=new Be({uniforms:{uColor:{value:new Gt(Bb)},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
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
      `,transparent:!0,depthWrite:!1,blending:Us}),v=new qE(j,x);return v.frustumCulled=!1,o.add(v),v})(),Y=(I,H,Z)=>{I.traverse(j=>{j instanceof mr||(j.userData.nodeId=H,j.userData.nodeType=Z)})},gt=(I,H)=>{const Z=document.createElement("div");Z.textContent=I,Z.setAttribute("role","presentation");const j=H==="fusion",x=j?"rgba(36, 24, 52, 0.82)":"rgba(10, 16, 30, 0.82)",v=j?"1px solid rgba(210, 180, 255, 0.5)":"1px solid rgba(120, 200, 255, 0.45)",R=j?"#f4ecff":"#eaf6ff";return Z.style.cssText=[`max-width:${j?108:96}px`,"padding: 3px 8px","border-radius: 8px","font-size: 11px","font-weight: 650","line-height: 1.25","text-align: center","letter-spacing: 0.02em",`color:${R}`,`background:${x}`,`border:${v}`,"box-shadow: 0 2px 10px rgba(0,0,0,0.35)","text-shadow: 0 1px 4px rgba(0,0,0,0.85)","white-space: nowrap","overflow: hidden","text-overflow: ellipsis","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),Z},yt=I=>{const H=document.createElement("div");return H.textContent=I,H.setAttribute("role","presentation"),H.style.cssText=["max-width: 52px","padding: 2px 5px","border-radius: 5px","font-size: 8px","font-weight: 650","line-height: 1.2","text-align: center","letter-spacing: 0.01em","color: #ede6ff","background: rgba(28, 20, 42, 0.82)","border: 1px solid rgba(200, 170, 255, 0.42)","box-shadow: 0 1px 5px rgba(0,0,0,0.35)","text-shadow: 0 1px 2px rgba(0,0,0,0.7)","display: -webkit-box","-webkit-box-orient: vertical","-webkit-line-clamp: 2","overflow: hidden","word-break: break-all","overflow-wrap: anywhere","opacity: 0","visibility: hidden","pointer-events: none","user-select: none","-webkit-user-select: none"].join(";"),H},Ct=(I,H,Z)=>{const j=I==="major",x=new As,v=j?"major":"fusion",{map:R}=Db(H,v),F=j?.23:.15,K=new ws(F,j?48:36,j?32:26),q=new fn({map:R,color:new Gt(16777215),transparent:!0,opacity:1,fog:!1}),dt=new Re(K,q);dt.userData.part="core",x.add(dt);const ft=j?Nb:Rf,ct=new ws(F*1.52,18,14),St=new fn({color:ft,transparent:!0,opacity:j?.045:.032,depthWrite:!1,blending:Us,fog:!1}),ut=new Re(ct,St);if(ut.renderOrder=-1,ut.userData.part="glow",x.add(ut),j){const Nt=new fn({color:8244984,transparent:!0,opacity:.45,depthWrite:!1,side:En,fog:!1}),xt=(zt,te,B)=>{const Mt=new eu(zt,te,10,80),rt=new Re(Mt,Nt.clone());return rt.rotation.x=Math.PI/2,rt.rotation.z=B,rt.userData.part="ring",rt};x.add(xt(.46,.014,Math.random()*Math.PI));const Bt=xt(.38,.01,Math.PI/2.8);Bt.rotation.y=Math.PI/3.2,x.add(Bt)}else{const Nt=Math.max(F*5.55,.78),xt=Nt*1.2,Bt=Nt*.82,zt=Nt*1.22,te=new tu(Bt,zt,80),B=new fn({color:Rf,transparent:!0,opacity:.5,depthWrite:!1,side:En,fog:!1,blending:Us}),Mt=new Re(te,B);Mt.rotation.x=Math.PI/2,Mt.renderOrder=0,Mt.userData.part="ring",x.add(Mt);const rt=Math.max(F*.34,.052),pt=[.02,.14,.55,.42];for(let bt=0;bt<4;bt++){const wt=new ws(rt,14,12),Wt=new Gt().setHSL(pt[bt],.55,.62),ve=new fn({color:Wt,transparent:!0,opacity:.94,fog:!1}),Ee=new Re(wt,ve),Jt=bt/4*Math.PI*2-Math.PI/4,nn=Math.cos(Jt)*Nt,vn=Math.sin(Jt)*Nt;Ee.position.set(nn,0,vn),Ee.userData.part="satellite",x.add(Ee);const qr=yt(kb[bt]),pi=new mr(qr),Xn=Math.cos(Jt)*xt,nr=Math.sin(Jt)*xt,Yr=rt*.55+bt%2*.018;pi.position.set(Xn,Yr,nr),pi.center.set(.5,1),pi.renderOrder=8,pi.userData.isFusionQuadrantLabel=!0,x.add(pi)}}const Et=gt(Z,I),Pt=new mr(Et);return Pt.position.set(0,F*1.38,0),Pt.center.set(.5,1),Pt.renderOrder=10,Pt.userData.isNodeLabel=!0,x.add(Pt),x.userData.nodeVisual={core:dt,glow:ut},x};for(const I of t.nodes){const H=t.layout[I.id];if(!H)continue;const Z=Ct(I.type,I.id,I.label);Z.position.set(H.x,H.y,H.z),Z.rotation.set(Math.random()*.8,Math.random()*Math.PI*2,Math.random()*.5),Z.userData.nodeId=I.id,Z.userData.nodeType=I.type,Y(Z,I.id,I.type),o.add(Z),U.set(I.id,Z)}const Ut=(I,H)=>I<H?`${I}|${H}`:`${H}|${I}`,Kt=()=>{const I=[];for(const j of t.edges){const x=t.layout[j.u],v=t.layout[j.v];!x||!v||I.push(x.x,x.y,x.z,v.x,v.y,v.z)}const H=new He;H.setAttribute("position",new Se(I,3));const Z=new xc({color:Ob,transparent:!0,opacity:.32,depthWrite:!1});return new cf(H,Z)},at=I=>{const H=[...I],Z=[],j=new Set(t.edges.map(R=>Ut(R.u,R.v)));for(let R=0;R<H.length-1;R++){const F=H[R],K=H[R+1];if(!j.has(Ut(F,K)))continue;const q=t.layout[F],dt=t.layout[K];!q||!dt||Z.push(q.x,q.y,q.z,dt.x,dt.y,dt.z)}const x=new He;x.setAttribute("position",new Se(Z,3));const v=new xc({color:Fb,transparent:!0,opacity:.85,linewidth:1,depthWrite:!1});return new cf(x,v)};nt=Kt(),o.add(nt),ot=at(e.pathIds),o.add(ot);const mt=new As;o.add(mt),(()=>{for(;mt.children.length;)mt.remove(mt.children[0]);z.clear();const I=new ws(1,20,20);for(const H of t.hyperedges){const Z=[];for(const K of H.member_node_ids){const q=t.layout[K];q&&Z.push(new W(q.x,q.y,q.z))}if(!Z.length)continue;const j=new Qi().setFromPoints(Z),x=new Qs;j.getBoundingSphere(x);const v=new fn({color:Cf,transparent:!0,opacity:.07,depthWrite:!1}),R=new Re(I,v);R.position.copy(x.center);const F=Math.max(x.radius*1.45,.65);R.scale.setScalar(F),R.userData.hyperedgeId=H.id,mt.add(R),z.set(H.id,R)}})();const O=new JE,$=new Ft,V=(I,H)=>{const Z=l.domElement.getBoundingClientRect();$.x=(I-Z.left)/Z.width*2-1,$.y=-((H-Z.top)/Z.height)*2+1,O.setFromCamera($,a);const j=[...U.values()],v=O.intersectObjects(j,!0).find(F=>F.object instanceof Re&&typeof F.object.userData.nodeId=="string");if(!v){i(null);return}const R=v.object.userData.nodeId;i(R??null)},lt=I=>{I.button===0&&(w(),V(I.clientX,I.clientY))};l.domElement.addEventListener("pointerdown",lt),l.domElement.addEventListener("pointerup",E),l.domElement.addEventListener("wheel",D,{passive:!0}),l.domElement.addEventListener("touchstart",w,{passive:!0}),l.domElement.addEventListener("touchend",E,{passive:!0}),M.addEventListener("start",w),M.addEventListener("end",E);let vt=0;const T=new Op,C=()=>{const I=T.getDelta(),H=T.getElapsedTime();M.update();for(const Z of U.values())Z.rotation.y+=I*.1,Z.rotation.z+=I*.02*Math.sin(H*.6+Z.position.x*.2);f.render(),u.render(o,a),vt=requestAnimationFrame(C)};C();const y=()=>{const I=n.clientWidth||window.innerWidth,H=n.clientHeight||window.innerHeight;a.aspect=I/H,a.updateProjectionMatrix(),l.setSize(I,H),f.setSize(I,H),u.setSize(I,H),it.material.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,2)};window.addEventListener("resize",y);const st=I=>{ot&&(o.remove(ot),ot.geometry.dispose(),ot.material.dispose(),ot=at(I.pathIds),o.add(ot));const H=new Set([...I.pathIds,...I.hyperMemberIds]);for(const[Z,j]of U){const x=I.pathIds.has(Z),v=I.hyperMemberIds.has(Z),R=I.selectedId===Z,F=!H.has(Z)&&(I.pathIds.size>0||I.hyperMemberIds.size>0),K=F?.32:1,q=j.userData.nodeType||"major";j.traverse(dt=>{if(dt instanceof mr&&dt.userData.isNodeLabel){const ct=dt.element;let St=F?.36:.96;(x||v)&&(St=Math.max(St,.94)),R&&(St=1),ct.style.opacity=String(St),ct.style.filter=R?"drop-shadow(0 0 8px rgba(120, 210, 255, 0.85))":x||v?"drop-shadow(0 0 4px rgba(100, 180, 255, 0.45))":"none",ct.style.fontWeight=R?"800":"650",dt.renderOrder=R?20:10;return}if(dt instanceof mr&&dt.userData.isFusionQuadrantLabel){const ct=dt.element;if(!(q==="fusion"&&R)){ct.style.opacity="0",ct.style.visibility="hidden",dt.renderOrder=1;return}ct.style.visibility="visible";let ut=F?.3:.92;(x||v)&&(ut=Math.max(ut,.9)),R&&(ut=1),ct.style.opacity=String(ut),ct.style.filter=R?"drop-shadow(0 0 6px rgba(200, 160, 255, 0.75))":x||v?"drop-shadow(0 0 3px rgba(180, 140, 255, 0.4))":"none",dt.renderOrder=R?18:8;return}if(!(dt instanceof Re))return;const ft=dt.material;if(ft instanceof fn&&(dt.userData.part||"other")==="core"){let St=F?.34:1;(x||v)&&(St=Math.max(St,.98)),R&&(St=1),ft.opacity=St,ft.transparent=St<.999,ft.color.set(R?16777215:x||v?15924223:16777215);return}if(ft instanceof ff){let ct=F?.38:1,St=q==="major"?.11:.09;(x||v)&&(ct=Math.max(ct,.98),St=.26),R&&(St=.38,ct=1),F&&(St*=.55),ft.transparent=ct<.999,ft.opacity=ct,ft.emissiveIntensity=St}else if(ft instanceof fn){const ct=dt.userData.part||"other";let St=.42;ct==="glow"?St=q==="major"?.048:.036:ct==="shard"?St=.36:ct==="ring"?St=q==="major"?.48:.52:ct==="satellite"&&(St=.9);let ut=St*K;(x||v)&&(ct==="glow"||ct==="shard"?ut=Math.max(ut,.22):ut=Math.max(ut,.82)),R&&(ct==="glow"||ct==="shard"||ct==="satellite")&&(ut=Math.max(ut,.34)),R&&ct==="ring"&&q==="fusion"&&(ut=Math.max(ut,.78)),ft.opacity=ut,ft.transparent=!0}})}for(const[Z,j]of z){const x=j.material,v=I.activeHyperedgeIds.has(Z);x.opacity=v?.22:.06,x.color=new Gt(v?14216447:Cf)}};return st(e),{dispose(){P(),cancelAnimationFrame(vt),window.removeEventListener("resize",y),l.domElement.removeEventListener("pointerdown",lt),l.domElement.removeEventListener("pointerup",E),l.domElement.removeEventListener("wheel",D),l.domElement.removeEventListener("touchstart",w),l.domElement.removeEventListener("touchend",E),M.removeEventListener("start",w),M.removeEventListener("end",E);for(const I of U.values())o.remove(I),I.traverse(H=>{var Z;if(H instanceof Re){const j=Array.isArray(H.material)?H.material:[H.material];for(const x of j)x instanceof ff?(x.map=null,x.bumpMap=null,x.roughnessMap=null):x instanceof fn&&(x.map=null),x==null||x.dispose();(Z=H.geometry)==null||Z.dispose()}});U.clear(),nt&&(o.remove(nt),nt.geometry.dispose(),nt.material.dispose(),nt=null),ot&&(o.remove(ot),ot.geometry.dispose(),ot.material.dispose(),ot=null);for(const I of z.values())mt.remove(I),I.geometry.dispose(),I.material.dispose();z.clear(),o.remove(mt),o.remove(it),it.geometry.dispose(),it.material.dispose(),_.dispose(),m.dispose(),f.dispose(),Lb(),c.parentElement===n&&n.removeChild(c),M.dispose(),l.dispose(),l.domElement.parentElement&&l.domElement.parentElement.removeChild(l.domElement)},setVisualState(I){st(I)},frameBounds:I=>{const H=[];for(const R of I){const F=t.layout[R];F&&H.push(new W(F.x,F.y,F.z))}if(!H.length)return;const Z=new Qi().setFromPoints(H),j=new W;Z.getCenter(j);const x=new W;Z.getSize(x);const v=Math.max(x.length()*.65,4);M.target.copy(j),a.position.copy(j.clone().add(new W(v*.9,v*.55,v*.95))),M.update()},getCamera:()=>a}}function ru(){try{const n=document.createElement("canvas");return!!(n.getContext("webgl2")||n.getContext("webgl"))}catch{return!1}}const Vb={class:"galaxy-page"},Gb={key:0,class:"overlay center"},Wb={key:1,class:"overlay center error-panel"},Xb={class:"error-msg"},jb={class:"panel-card"},qb={class:"side-title"},Yb={class:"side-desc"},$b={key:0,class:"block"},Kb={class:"pill-list"},Zb={class:"members"},Jb={class:"panel-card rec"},Qb={class:"rec-head"},tT={key:0,class:"rec-list"},eT={class:"rec-node"},nT={class:"rec-reason"},iT={key:2,class:"hint-promo",role:"note"},sT=es({__name:"GalaxyView",setup(n){const t=Gr(),e=ne("loading"),i=ne(""),s=ne(null),r=ne([]),o=ne(!1),a=ne(!0),l=ne(null),c=zs(null),u=ne(new Set),h=zs(null),f=le(()=>{if(!s.value||!c.value)return"";const $=c.value.nodes.find(V=>V.id===s.value);return($==null?void 0:$.label)??""}),p=le(()=>{var lt,vt;if(!s.value||!c.value)return"";const $=c.value.nodes.find(T=>T.id===s.value);if(!$)return"";if($.type==="fusion"){const T=((lt=$.meta)==null?void 0:lt.subtitle)??"";return T?`交叉关卡 · ${T}`:"交叉学科关卡"}const V=((vt=$.meta)==null?void 0:vt.tagline)??"";return V?`专业入口 · ${V}`:"专业节点"}),g=le(()=>{if(!s.value||!c.value)return{ids:[],members:[]};const{hyperedgeIds:$,memberIds:V}=Ki(s.value,c.value.hyperedges),lt=[...V].map(vt=>{var T;return((T=c.value.nodes.find(C=>C.id===vt))==null?void 0:T.label)??vt}).filter(vt=>vt);return{ids:$,members:lt}}),_=le(()=>!s.value||!c.value?new Set:new Set(Ki(s.value,c.value.hyperedges).hyperedgeIds)),m=le(()=>!s.value||!c.value?new Set:Ki(s.value,c.value.hyperedges).memberIds),d=le(()=>({pathIds:u.value,selectedId:s.value,hyperMemberIds:m.value,activeHyperedgeIds:_.value}));Hn(d,$=>{var V;(V=h.value)==null||V.setVisualState($)}),Hn(s,()=>{o.value=!1,yt()});function S(){try{const $=sessionStorage.getItem(Ll);if(!$)return null;const V=JSON.parse($);return!V.fromId||!V.toId||V.fromId===V.toId?null:V}catch{return null}}async function A(){if(e.value="loading",i.value="",!ru()){e.value="error",i.value="当前环境不支持 WebGL，无法展示 3D 星系。";return}const $=S();if(!$){t.replace({name:"select"});return}l.value=$;try{const V=jv();let lt,vt;try{lt=await rh(V),vt=await oh(V)}catch(C){if(typeof window<"u"&&window.__GALAXY_API_BASE__&&String(window.__GALAXY_API_BASE__).trim()!==""&&V!=="./mock")lt=await rh("./mock"),vt=await oh("./mock");else throw C}r.value=vt.suggestions??[],c.value={nodes:lt.nodes,edges:lt.edges,hyperedges:lt.hyperedges,layout:lt.layout};const T=qv(c.value.edges,$.fromId,$.toId);u.value=new Set(T??[$.fromId,$.toId]),e.value="ready"}catch(V){e.value="error",i.value=V instanceof Error?V.message:"加载失败"}}function M($){var T;if((T=h.value)==null||T.dispose(),h.value=null,!$||!c.value||e.value!=="ready")return;const V={pathIds:u.value,selectedId:null,hyperMemberIds:new Set,activeHyperedgeIds:new Set},lt=su($,c.value,V,C=>{s.value=C});h.value=lt,lt.setVisualState(d.value);const vt=[...u.value];lt.frameBounds(vt.length?vt:[...c.value.nodes.map(C=>C.id)].slice(0,6))}const k=ne(null),L=ne(null),P=ne(!0),N=ne(null),w=ne(null);let E=!1,D=0,U=0,z=0,nt=0;function ot($,V,lt){return Math.max(V,Math.min(lt,$))}function et(){E&&(E=!1,window.removeEventListener("pointermove",it),window.removeEventListener("pointerup",et))}function it($){if(!E||!L.value)return;const V=L.value,lt=$.clientX-D,vt=$.clientY-U,T=V.getBoundingClientRect(),C=T.width,y=T.height;let st=z+lt,J=nt+vt;st=ot(st,8,window.innerWidth-C-8),J=ot(J,8,window.innerHeight-y-8),N.value=st,w.value=J}function Y($){if($.button!==0||!L.value)return;et(),$.preventDefault();const V=L.value.getBoundingClientRect();E=!0,D=$.clientX,U=$.clientY,z=V.left,nt=V.top,N.value=V.left,w.value=V.top,window.addEventListener("pointermove",it),window.addEventListener("pointerup",et)}const gt=le(()=>{if(!(N.value==null||w.value==null))return{left:`${N.value}px`,top:`${w.value}px`,right:"auto",bottom:"auto"}});function yt(){P.value=!0,N.value=null,w.value=null,et()}fa(async()=>{await A()}),Hn(e,async $=>{$==="ready"&&(await Hs(),M(k.value))}),da(()=>{var $;et(),($=h.value)==null||$.dispose()});function Ct(){A()}function Ut(){t.push({name:"select"})}function Kt(){try{sessionStorage.removeItem(Ll)}catch{}Qd(),t.replace({name:"select"})}function at($){var V,lt;return((lt=(V=c.value)==null?void 0:V.nodes.find(vt=>vt.id===$))==null?void 0:lt.label)??$}function mt(){t.push({name:"personalHub"})}function At(){a.value=!1}function O(){window.alert("「去练」将对接现有题库模块（占位）")}return($,V)=>{var lt,vt;return Vt(),$t("div",Vb,[e.value==="loading"?(Vt(),$t("div",Gb,[...V[2]||(V[2]=[ht("div",{class:"spinner","aria-hidden":"true"},null,-1),ht("p",{class:"loading-text"},"正在载入星系…",-1)])])):e.value==="error"?(Vt(),$t("div",Wb,[V[3]||(V[3]=ht("p",{class:"error-title"},"无法进入星系",-1)),ht("p",Xb,Zt(i.value),1),ht("div",{class:"error-actions"},[ht("button",{type:"button",class:"btn ghost",onClick:Ut},"返回选择"),ht("button",{type:"button",class:"btn primary",onClick:Ct},"重试")]),V[4]||(V[4]=ht("p",{class:"hint"},"2D 降级与离线包将在后续里程碑接入。",-1))])):(Vt(),$t(je,{key:2},[ht("div",{ref_key:"canvasHost",ref:k,class:"canvas-host"},null,512),ht("div",{class:"top-bar"},[V[5]||(V[5]=ht("div",{class:"top-left-spacer"},null,-1)),V[6]||(V[6]=ht("div",{class:"top-title"},"专业星系",-1)),ht("button",{type:"button",class:"icon-btn","aria-label":"关闭",onClick:Kt},"×")]),s.value?(Vt(),$t("button",{key:0,type:"button",class:"side-toggle",onClick:V[0]||(V[0]=T=>P.value=!P.value)},Zt(P.value?"隐藏":"显示"),1)):dn("",!0),s.value?Um((Vt(),$t("aside",{key:1,ref_key:"sidePanelEl",ref:L,class:"side",style:aa(gt.value)},[ht("div",{class:"side-drag-handle",onPointerdown:Y},"信息面板",32),ht("section",jb,[V[9]||(V[9]=ht("p",{class:"side-eyebrow"},"选中",-1)),ht("h2",qb,Zt(f.value),1),ht("p",Yb,Zt(p.value),1),g.value.ids.length?(Vt(),$t("section",$b,[V[7]||(V[7]=ht("p",{class:"block-label"},"相关超边（融合域）",-1)),ht("ul",Kb,[(Vt(!0),$t(je,null,Ir(g.value.ids,T=>(Vt(),$t("li",{key:T,class:"pill"},Zt(T),1))),128))]),V[8]||(V[8]=ht("p",{class:"block-label"},"成员节点",-1)),ht("p",Zb,Zt(g.value.members.join("、")),1)])):dn("",!0),((vt=(lt=c.value)==null?void 0:lt.nodes.find(T=>T.id===s.value))==null?void 0:vt.type)==="fusion"?(Vt(),$t("button",{key:1,type:"button",class:"btn primary full",onClick:O}," 去练 ")):dn("",!0)]),ht("section",Jb,[ht("div",Qb,[V[10]||(V[10]=ht("p",{class:"block-label"},"推荐下一步（mock）",-1)),ht("button",{type:"button",class:"btn rec-toggle",onClick:V[1]||(V[1]=T=>o.value=!o.value)},Zt(o.value?"收起":"展开"),1)]),o.value?(Vt(),$t("ul",tT,[(Vt(!0),$t(je,null,Ir(r.value,T=>(Vt(),$t("li",{key:T.nodeId},[ht("span",eT,Zt(at(T.nodeId)),1),ht("span",nT,Zt(T.reason),1)]))),128))])):dn("",!0)])],4)),[[Zg,P.value]]):a.value?(Vt(),$t("div",iT,[ht("button",{type:"button",class:"hint-dismiss","aria-label":"关闭",onClick:Io(At,["stop"])},"×"),V[11]||(V[11]=ht("p",{class:"promo-title"},"个人专业星图",-1)),ht("button",{type:"button",class:"btn promo-cta",onClick:mt},"进入个人星图")])):dn("",!0)],64))])}}}),rT=Zs(sT,[["__scopeId","data-v-98435cb1"]]),oT={class:"hub"},aT=es({__name:"PersonalGalaxyHubView",setup(n){const t=Gr();function e(){t.push({name:"personalDesign"})}function i(){t.push({name:"personalShowcase"})}function s(){t.push({name:"galaxy"})}return(r,o)=>(Vt(),$t("div",oT,[ht("header",{class:"bar"},[ht("button",{type:"button",class:"ghost",onClick:s},"← 大星图"),o[0]||(o[0]=ht("div",{class:"bar-center"},[ht("p",{class:"eyebrow"},"OfferCat · Galaxy"),ht("h1",{class:"title"},"个人专业星图")],-1)),o[1]||(o[1]=ht("span",{class:"spacer","aria-hidden":"true"},null,-1))]),ht("main",{class:"main"},[o[4]||(o[4]=ht("p",{class:"lead"}," 与大星图同一套 3D 渲染与岗位数据：在「设计」里摆放学科大行星并连边生成交叉岗位小行星；在「展示」里只读浏览已保存星系。 ",-1)),ht("button",{type:"button",class:"card card--primary",onClick:e},[...o[2]||(o[2]=[ht("span",{class:"card-kicker"},"编辑",-1),ht("span",{class:"card-title"},"设计专属星图",-1),ht("span",{class:"card-desc"},"添加大行星、连边、三选一岗位，保存到本机。",-1)])]),ht("button",{type:"button",class:"card card--ghost",onClick:i},[...o[3]||(o[3]=[ht("span",{class:"card-kicker"},"只读",-1),ht("span",{class:"card-title"},"展示已保存星图",-1),ht("span",{class:"card-desc"},"进入前请先在设计页保存至少一颗大行星或一条融合。",-1)])])])]))}}),lT=Zs(aT,[["__scopeId","data-v-a020a077"]]),Pf={major_electrical:"电气工程",major_law:"法学",major_accounting:"会计学",major_cs:"计算机科学",major_finance:"金融学",major_clinical:"临床医学",major_swe:"软件工程",major_marketing:"市场营销",major_ds:"数据科学",major_english:"英语"};function cT(n,t){const e=Pf[n],i=Pf[t];return!e||!i?["",""]:[`${e}×${i}`,`${i}×${e}`]}function uT(n){const t=n.split(/\r?\n/).filter(i=>i.trim().length>0),e=[];for(let i=0;i<t.length;i++){const s=t[i];if(s.startsWith("序号")||s.startsWith("	序号"))continue;const r=s.split("	");if(r.length<11)continue;const o=Number.parseInt(r[0],10);Number.isFinite(o)&&e.push({idx:o,pair:r[1].trim(),title:r[2].trim(),heat:r[3].trim(),salaryJunior:r[4].trim(),salaryMid:r[5].trim(),salarySenior:r[6].trim(),workIntensity:r[7].trim(),competition:r[8].trim(),education:r[9].trim(),skills:r[10].trim()})}return e}let Co=null;async function hT(){if(Co)return Co;const n="./data/cross_job_catalog.tsv".replace(/\/{2,}/g,"/"),t=await fetch(n);if(!t.ok)throw new Error(`无法加载岗位表: ${t.status}`);const e=await t.text();return Co=uT(e),Co}async function Df(n,t){const[e,i]=cT(n,t);if(!e)return[];const r=(await hT()).filter(o=>o.pair===e||o.pair===i);return r.length>=3?r.slice(0,3):r}const zp="offercat_personal_galaxy_v1",Lf=6;function fT(n,t){const e={},i=n.length;for(let s=0;s<i;s++){const r=n[s],o=2*Math.PI*s/Math.max(i,1);e[r.id]={x:Lf*Math.cos(o),y:.25,z:Lf*Math.sin(o)}}for(const s of t){const r=e[s.majorA],o=e[s.majorB];if(!r||!o)continue;const a={x:(r.x+o.x)*.5,y:(r.y+o.y)*.5+.6,z:(r.z+o.z)*.5};e[s.id]=a}return e}function dT(n){return{subtitle:`${n.heat} · 初${n.salaryJunior} / 中${n.salaryMid} / 高${n.salarySenior}`,tagline:`${n.workIntensity}级强度 · 竞争${n.competition}`,heat:n.heat,salaryJunior:n.salaryJunior,salaryMid:n.salaryMid,salarySenior:n.salarySenior,workIntensity:n.workIntensity,competition:n.competition,education:n.education,skills:n.skills,catalogIdx:String(n.idx),pair:n.pair}}function Hp(n,t){const e=fT(n,t),i=[];for(const o of n)i.push({id:o.id,type:"major",label:o.label,meta:{tagline:"个人星系 · 大行星"}});for(const o of t)i.push({id:o.id,type:"fusion",label:o.title,meta:dT(o.row)});const s=[];for(const o of t)s.push({u:o.id,v:o.majorA,kind:"fusion-major"}),s.push({u:o.id,v:o.majorB,kind:"fusion-major"});const r=t.map(o=>({id:`he_${o.id}`,member_node_ids:[o.id,o.majorA,o.majorB],style_hint:"personal"}));return{nodes:i,edges:s,hyperedges:r,layout:e}}function pT(n,t){return{v:1,majors:[...n],fusions:[...t],updatedAt:Date.now()}}function kp(){try{const n=localStorage.getItem(zp);if(!n)return null;const t=JSON.parse(n);return(t==null?void 0:t.v)!==1||!Array.isArray(t.majors)||!Array.isArray(t.fusions)?null:t}catch{return null}}function mT(n){try{localStorage.setItem(zp,JSON.stringify(n))}catch{}}async function gT(n){return{ok:!1}}const _T={class:"personal-root"},vT={key:0,class:"loading-overlay"},xT={key:1,class:"err-banner"},MT={key:2,class:"save-toast"},yT={class:"control-panel"},ST={class:"tb-block"},ET={class:"major-grid"},bT=["onClick"],TT=["disabled"],AT={class:"tb-block"},wT={key:0,class:"hint"},RT={key:0,class:"tb-block fusion-strip"},CT={class:"fusion-strip-title"},PT={key:1,class:"tb-block"},DT={class:"mono"},LT={key:2,class:"tb-block muted"},IT={id:"fusion-sheet-heading",class:"fusion-sheet-title"},UT={class:"fusion-sheet-dl"},NT={class:"modal"},OT=["onClick"],FT={class:"jt"},BT={class:"jd"},zT=es({__name:"PersonalGalaxyView",setup(n){const t=Gr(),e=ne("loading"),i=ne(""),s=ne(null),r=ne(!1),o=ne(null),a=ne([]),l=ne([]),c=ne({open:!1,aId:"",bId:"",options:[]}),u=ne(null),h=ne(""),f=ne(null),p=zs(null),g=le(()=>Hp(a.value,l.value)),_=le(()=>u.value?Ki(u.value,g.value.hyperedges).memberIds:new Set),m=le(()=>u.value?new Set(Ki(u.value,g.value.hyperedges).hyperedgeIds):new Set),d=le(()=>({pathIds:new Set,selectedId:u.value,hyperMemberIds:_.value,activeHyperedgeIds:m.value}));Hn(d,D=>{var U;(U=p.value)==null||U.setVisualState(D)});const S=le(()=>u.value?l.value.find(D=>D.id===u.value)??null:null),A=le(()=>u.value?a.value.find(D=>D.id===u.value)??null:null);function M(){var z;const D=f.value,U=g.value;(z=p.value)==null||z.dispose(),p.value=null,!(!D||U.nodes.length===0)&&(p.value=su(D,U,d.value,nt=>{if(u.value=nt,!nt||!r.value||!a.value.some(Y=>Y.id===nt))return;if(!o.value){o.value=nt;return}if(o.value===nt)return;const et=a.value.find(Y=>Y.id===o.value),it=a.value.find(Y=>Y.id===nt);!et||!it||k(et,it)}),p.value.setVisualState(d.value),p.value.frameBounds(U.nodes.map(nt=>nt.id)))}Hn(g,async()=>{e.value==="ready"&&(await Hs(),M())});async function k(D,U){try{const z=await Df(D.majorId,U.majorId);if(z.length===0){i.value=`《具体专业》表中暂无「${D.label}×${U.label}」组合的三岗数据，请换一对学科。`,o.value=null;return}c.value={open:!0,aId:D.id,bId:U.id,options:z}}catch(z){i.value=z instanceof Error?z.message:"加载岗位表失败"}finally{o.value=null}}function L(D){const{aId:U,bId:z}=c.value,nt=`f_${Date.now()}`;l.value.push({id:nt,title:D.title,majorA:U,majorB:z,row:D}),c.value.open=!1,c.value.options=[],r.value=!1,u.value=nt}function P(){c.value.open=!1,c.value.options=[],o.value=null}function N(){if(!s.value)return;const D=Cr.find(z=>z.id===s.value);if(!D)return;const U=`m_${s.value}_${Date.now()}`;a.value.push({id:U,majorId:D.id,label:D.label}),s.value=null}async function w(){const D=pT(a.value,l.value);mT(D);const U=await gT();h.value=U.ok?"已保存到本地，并已尝试同步服务端。":"已保存到本机（服务端同步接口待接入）。",window.setTimeout(()=>{h.value=""},3200)}function E(){t.push({name:"personalHub"})}return fa(async()=>{var U;if(!ru()){e.value="error",i.value="当前环境不支持 WebGL";return}try{await Df("major_electrical","major_law")}catch(z){e.value="error",i.value=z instanceof Error?z.message:"预加载岗位表失败";return}const D=kp();(U=D==null?void 0:D.majors)!=null&&U.length&&(a.value=[...D.majors],l.value=[...D.fusions]),e.value="ready",await Hs(),M()}),da(()=>{var D;(D=p.value)==null||D.dispose(),p.value=null}),(D,U)=>(Vt(),$t("div",_T,[e.value==="loading"?(Vt(),$t("div",vT,"加载岗位数据…")):dn("",!0),e.value==="error"?(Vt(),$t("div",xT,Zt(i.value),1)):dn("",!0),ht("header",{class:"top-bar"},[ht("button",{type:"button",class:"back-btn",onClick:E},"返回"),U[4]||(U[4]=ht("div",{class:"top-titles"},[ht("h1",{class:"title"},"设计专属星图"),ht("p",{class:"subtitle"},"与大星图相同的 3D 星球与材质；小行星四维来自岗位表，随图保存。")],-1)),ht("button",{type:"button",class:"save-btn",onClick:w},"保存星系")]),h.value?(Vt(),$t("p",MT,Zt(h.value),1)):dn("",!0),ht("div",{ref_key:"canvasHost",ref:f,class:"canvas-wrap"},null,512),ht("div",yT,[ht("section",ST,[U[5]||(U[5]=ht("p",{class:"label"},"① 添加大行星（10 学科）",-1)),ht("div",ET,[(Vt(!0),$t(je,null,Ir(Bn(Cr),z=>(Vt(),$t("button",{key:z.id,type:"button",class:Fs(["chip",{active:s.value===z.id}]),onClick:nt=>s.value=z.id},Zt(z.label),11,bT))),128))]),ht("button",{type:"button",class:"primary full",disabled:!s.value,onClick:N}," 放入星空 ",8,TT)]),ht("section",AT,[U[6]||(U[6]=ht("p",{class:"label"},"② 连边并生成交叉岗位",-1)),ht("button",{type:"button",class:Fs(["secondary full",{on:r.value}]),onClick:U[0]||(U[0]=z=>{r.value=!r.value,o.value=null})},Zt(r.value?"连边模式已开 · 依次点两颗大行星":"开启连边模式"),3),r.value?(Vt(),$t("p",wT,"在星空中先点一颗，再点另一颗；有数据则弹出三选一。")):dn("",!0)]),S.value?(Vt(),$t("section",RT,[U[7]||(U[7]=ht("p",{class:"label"},"当前小行星",-1)),ht("p",CT,Zt(S.value.title),1),U[8]||(U[8]=ht("p",{class:"hint fusion-strip-hint"},"四象详情见下方弹层；点击星空空白处可取消选中。",-1))])):A.value?(Vt(),$t("section",PT,[U[9]||(U[9]=ht("p",{class:"label"},"当前选中",-1)),ht("p",DT,"大行星 · "+Zt(A.value.label),1)])):(Vt(),$t("section",LT,[...U[10]||(U[10]=[ht("p",{class:"hint"},"提示：单指旋转视角；空闲时自动公转。连边模式下依次点击两颗大行星。",-1)])]))]),(Vt(),qo(vu,{to:"body"},[S.value?(Vt(),$t("div",{key:0,class:"fusion-sheet-backdrop",role:"dialog","aria-modal":"true","aria-labelledby":"fusion-sheet-heading",onClick:U[3]||(U[3]=Io(z=>u.value=null,["self"]))},[ht("div",{class:"fusion-sheet",onClick:U[2]||(U[2]=Io(()=>{},["stop"]))},[U[15]||(U[15]=ht("div",{class:"fusion-sheet-handle","aria-hidden":"true"},null,-1)),ht("h3",IT,Zt(S.value.title),1),U[16]||(U[16]=ht("p",{class:"fusion-sheet-sub"},"四象属性（岗位表 · 完整）",-1)),ht("dl",UT,[U[11]||(U[11]=ht("dt",null,"热度/年薪",-1)),ht("dd",null,Zt(S.value.row.heat)+" · 初级年薪 "+Zt(S.value.row.salaryJunior)+" · 中级年薪 "+Zt(S.value.row.salaryMid),1),U[12]||(U[12]=ht("dt",null,"强度/竞争",-1)),ht("dd",null,Zt(S.value.row.workIntensity)+"级 · "+Zt(S.value.row.competition),1),U[13]||(U[13]=ht("dt",null,"学历门槛",-1)),ht("dd",null,Zt(S.value.row.education),1),U[14]||(U[14]=ht("dt",null,"学科技能",-1)),ht("dd",null,Zt(S.value.row.skills),1)]),ht("button",{type:"button",class:"fusion-sheet-close",onClick:U[1]||(U[1]=z=>u.value=null)},"收起")])])):dn("",!0)])),(Vt(),qo(vu,{to:"body"},[c.value.open?(Vt(),$t("div",{key:0,class:"modal-mask",onClick:Io(P,["self"])},[ht("div",NT,[U[17]||(U[17]=ht("h2",null,"三选一 · 确立小行星",-1)),U[18]||(U[18]=ht("p",{class:"modal-sub"},"数据来源：《具体专业》岗位表（同组合前三条）",-1)),ht("ul",null,[(Vt(!0),$t(je,null,Ir(c.value.options,(z,nt)=>(Vt(),$t("li",{key:nt},[ht("button",{type:"button",class:"job-btn",onClick:ot=>L(z)},[ht("span",FT,Zt(z.title),1),ht("span",BT,Zt(z.heat)+" · 中级年薪 "+Zt(z.salaryMid)+" · 竞争 "+Zt(z.competition),1)],8,OT)]))),128))]),ht("button",{type:"button",class:"ghost full",onClick:P},"取消")])])):dn("",!0)]))]))}}),HT=Zs(zT,[["__scopeId","data-v-273b443e"]]),kT={class:"showcase-root"},VT={class:"bar"},GT={class:"mid"},WT={key:0,class:"sub"},XT={key:1,class:"sub muted"},jT={key:0,class:"overlay"},qT={key:1,class:"overlay err"},YT={key:2,class:"overlay empty"},$T=es({__name:"PersonalGalaxyShowcaseView",setup(n){const t=Gr(),e=ne("loading"),i=ne(""),s=zs(null),r=ne(null),o=ne(null),a=zs(null),l=le(()=>{const _=s.value;return _?Hp(_.majors,_.fusions):null}),c=le(()=>!r.value||!l.value?new Set:Ki(r.value,l.value.hyperedges).memberIds),u=le(()=>!r.value||!l.value?new Set:new Set(Ki(r.value,l.value.hyperedges).hyperedgeIds)),h=le(()=>({pathIds:new Set,selectedId:r.value,hyperMemberIds:c.value,activeHyperedgeIds:u.value}));Hn(h,_=>{var m;(m=a.value)==null||m.setVisualState(_)});function f(){var d;const _=o.value,m=l.value;(d=a.value)==null||d.dispose(),a.value=null,!(!_||!m||m.nodes.length===0)&&(a.value=su(_,m,h.value,S=>{r.value=S}),a.value.setVisualState(h.value),a.value.frameBounds(m.nodes.map(S=>S.id)))}function p(){t.push({name:"personalHub"})}fa(async()=>{if(!ru()){e.value="error",i.value="当前环境不支持 WebGL";return}const _=kp();if(s.value=_,!_||_.majors.length===0&&_.fusions.length===0){e.value="empty";return}e.value="ready",await Hs(),f()}),da(()=>{var _;(_=a.value)==null||_.dispose(),a.value=null});const g=le(()=>{var _;return!r.value||!l.value?"":((_=l.value.nodes.find(m=>m.id===r.value))==null?void 0:_.label)??""});return(_,m)=>(Vt(),$t("div",kT,[ht("header",VT,[ht("button",{type:"button",class:"ghost",onClick:p},"返回"),ht("div",GT,[m[0]||(m[0]=ht("h1",{class:"title"},"展示星图",-1)),g.value?(Vt(),$t("p",WT,Zt(g.value),1)):(Vt(),$t("p",XT,"单指旋转 · 空闲时自动公转"))]),m[1]||(m[1]=ht("span",{class:"spacer","aria-hidden":"true"},null,-1))]),e.value==="loading"?(Vt(),$t("div",jT,"加载…")):e.value==="error"?(Vt(),$t("div",qT,Zt(i.value),1)):e.value==="empty"?(Vt(),$t("div",YT,[m[2]||(m[2]=ht("p",null,"还没有已保存的个人星系。",-1)),ht("button",{type:"button",class:"cta",onClick:p},"返回去设计")])):(Vt(),$t("div",{key:3,ref_key:"canvasHost",ref:o,class:"canvas"},null,512))]))}}),KT=Zs($T,[["__scopeId","data-v-6af28b0a"]]),ZT=Pv({history:lv(),routes:[{path:"/",name:"select",component:Xv},{path:"/galaxy",name:"galaxy",component:rT},{path:"/personal",name:"personalHub",component:lT},{path:"/personal/design",name:"personalDesign",component:HT},{path:"/personal/showcase",name:"personalShowcase",component:KT},{path:"/personal-galaxy",redirect:{name:"personalHub"}}]});v_(E_).use(ZT).mount("#app");
