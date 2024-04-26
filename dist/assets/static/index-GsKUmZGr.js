import{g as L}from"./commonjsHelpers-DxDlwT5B.js";function B(e,r){for(var t=0;t<r.length;t++){const o=r[t];if(typeof o!="string"&&!Array.isArray(o)){for(const n in o)if(n!=="default"&&!(n in e)){const u=Object.getOwnPropertyDescriptor(o,n);u&&Object.defineProperty(e,n,u.get?u:{enumerable:!0,get:()=>o[n]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var E=Object.getOwnPropertySymbols,V=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;function G(e){if(e==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function J(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de",Object.getOwnPropertyNames(e)[0]==="5")return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;var o=Object.getOwnPropertyNames(r).map(function(u){return r[u]});if(o.join("")!=="0123456789")return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(u){n[u]=u}),Object.keys(Object.assign({},n)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}var K=J()?Object.assign:function(e,r){for(var t,o=G(e),n,u=1;u<arguments.length;u++){t=Object(arguments[u]);for(var c in t)V.call(t,c)&&(o[c]=t[c]);if(E){n=E(t);for(var f=0;f<n.length;f++)H.call(t,n[f])&&(o[n[f]]=t[n[f]])}}return o},w={exports:{}},i={};/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g=K,y=60103,P=60106;i.Fragment=60107;i.StrictMode=60108;i.Profiler=60114;var $=60109,R=60110,x=60112;i.Suspense=60113;var A=60115,I=60116;if(typeof Symbol=="function"&&Symbol.for){var a=Symbol.for;y=a("react.element"),P=a("react.portal"),i.Fragment=a("react.fragment"),i.StrictMode=a("react.strict_mode"),i.Profiler=a("react.profiler"),$=a("react.provider"),R=a("react.context"),x=a("react.forward_ref"),i.Suspense=a("react.suspense"),A=a("react.memo"),I=a("react.lazy")}var k=typeof Symbol=="function"&&Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=k&&e[k]||e["@@iterator"],typeof e=="function"?e:null)}function d(e){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)r+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},F={};function v(e,r,t){this.props=e,this.context=r,this.refs=F,this.updater=t||q}v.prototype.isReactComponent={};v.prototype.setState=function(e,r){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error(d(85));this.updater.enqueueSetState(this,e,r,"setState")};v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function M(){}M.prototype=v.prototype;function j(e,r,t){this.props=e,this.context=r,this.refs=F,this.updater=t||q}var O=j.prototype=new M;O.constructor=j;g(O,v.prototype);O.isPureReactComponent=!0;var S={current:null},N=Object.prototype.hasOwnProperty,U={key:!0,ref:!0,__self:!0,__source:!0};function D(e,r,t){var o,n={},u=null,c=null;if(r!=null)for(o in r.ref!==void 0&&(c=r.ref),r.key!==void 0&&(u=""+r.key),r)N.call(r,o)&&!U.hasOwnProperty(o)&&(n[o]=r[o]);var f=arguments.length-2;if(f===1)n.children=t;else if(1<f){for(var s=Array(f),l=0;l<f;l++)s[l]=arguments[l+2];n.children=s}if(e&&e.defaultProps)for(o in f=e.defaultProps,f)n[o]===void 0&&(n[o]=f[o]);return{$$typeof:y,type:e,key:u,ref:c,props:n,_owner:S.current}}function W(e,r){return{$$typeof:y,type:e.type,key:r,ref:e.ref,props:e.props,_owner:e._owner}}function b(e){return typeof e=="object"&&e!==null&&e.$$typeof===y}function Y(e){var r={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return r[t]})}var C=/\/+/g;function _(e,r){return typeof e=="object"&&e!==null&&e.key!=null?Y(""+e.key):r.toString(36)}function m(e,r,t,o,n){var u=typeof e;(u==="undefined"||u==="boolean")&&(e=null);var c=!1;if(e===null)c=!0;else switch(u){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case y:case P:c=!0}}if(c)return c=e,n=n(c),e=o===""?"."+_(c,0):o,Array.isArray(n)?(t="",e!=null&&(t=e.replace(C,"$&/")+"/"),m(n,r,t,"",function(l){return l})):n!=null&&(b(n)&&(n=W(n,t+(!n.key||c&&c.key===n.key?"":(""+n.key).replace(C,"$&/")+"/")+e)),r.push(n)),1;if(c=0,o=o===""?".":o+":",Array.isArray(e))for(var f=0;f<e.length;f++){u=e[f];var s=o+_(u,f);c+=m(u,r,t,s,n)}else if(s=Q(e),typeof s=="function")for(e=s.call(e),f=0;!(u=e.next()).done;)u=u.value,s=o+_(u,f++),c+=m(u,r,t,s,n);else if(u==="object")throw r=""+e,Error(d(31,r==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":r));return c}function h(e,r,t){if(e==null)return e;var o=[],n=0;return m(e,o,"","",function(u){return r.call(t,u,n++)}),o}function X(e){if(e._status===-1){var r=e._result;r=r(),e._status=0,e._result=r,r.then(function(t){e._status===0&&(t=t.default,e._status=1,e._result=t)},function(t){e._status===0&&(e._status=2,e._result=t)})}if(e._status===1)return e._result;throw e._result}var T={current:null};function p(){var e=T.current;if(e===null)throw Error(d(321));return e}var Z={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:S,IsSomeRendererActing:{current:!1},assign:g};i.Children={map:h,forEach:function(e,r,t){h(e,function(){r.apply(this,arguments)},t)},count:function(e){var r=0;return h(e,function(){r++}),r},toArray:function(e){return h(e,function(r){return r})||[]},only:function(e){if(!b(e))throw Error(d(143));return e}};i.Component=v;i.PureComponent=j;i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z;i.cloneElement=function(e,r,t){if(e==null)throw Error(d(267,e));var o=g({},e.props),n=e.key,u=e.ref,c=e._owner;if(r!=null){if(r.ref!==void 0&&(u=r.ref,c=S.current),r.key!==void 0&&(n=""+r.key),e.type&&e.type.defaultProps)var f=e.type.defaultProps;for(s in r)N.call(r,s)&&!U.hasOwnProperty(s)&&(o[s]=r[s]===void 0&&f!==void 0?f[s]:r[s])}var s=arguments.length-2;if(s===1)o.children=t;else if(1<s){f=Array(s);for(var l=0;l<s;l++)f[l]=arguments[l+2];o.children=f}return{$$typeof:y,type:e.type,key:n,ref:u,props:o,_owner:c}};i.createContext=function(e,r){return r===void 0&&(r=null),e={$$typeof:R,_calculateChangedBits:r,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider={$$typeof:$,_context:e},e.Consumer=e};i.createElement=D;i.createFactory=function(e){var r=D.bind(null,e);return r.type=e,r};i.createRef=function(){return{current:null}};i.forwardRef=function(e){return{$$typeof:x,render:e}};i.isValidElement=b;i.lazy=function(e){return{$$typeof:I,_payload:{_status:-1,_result:e},_init:X}};i.memo=function(e,r){return{$$typeof:A,type:e,compare:r===void 0?null:r}};i.useCallback=function(e,r){return p().useCallback(e,r)};i.useContext=function(e,r){return p().useContext(e,r)};i.useDebugValue=function(){};i.useEffect=function(e,r){return p().useEffect(e,r)};i.useImperativeHandle=function(e,r,t){return p().useImperativeHandle(e,r,t)};i.useLayoutEffect=function(e,r){return p().useLayoutEffect(e,r)};i.useMemo=function(e,r){return p().useMemo(e,r)};i.useReducer=function(e,r,t){return p().useReducer(e,r,t)};i.useRef=function(e){return p().useRef(e)};i.useState=function(e){return p().useState(e)};i.version="17.0.2";w.exports=i;var z=w.exports;const ee=L(z),te=B({__proto__:null,default:ee},[z]);export{te as R,K as o,z as r,ee as z};
