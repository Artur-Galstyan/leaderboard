import{S as x,i as C,s as G,k as h,a as D,q as E,l as d,m as _,h as f,c as M,r as y,n as m,b as v,G as u,H as w,P as z,y as B,e as k,z as K,A as O,Q,g,d as R,B as J,R as W,o as X,v as N,f as F,N as L,O as I,M as Y,u as Z}from"../chunks/index.95d1d20a.js";import{p as ee}from"../chunks/stores.04634fec.js";import{f as A,g as te,m as ae,a as ne}from"../chunks/index.5a5c3d81.js";function le(o){let e,a,t,n,r,l,s;return{c(){e=h("nav"),a=h("div"),t=D(),n=h("div"),r=E("🏠 "),l=h("a"),s=E("Home"),this.h()},l(c){e=d(c,"NAV",{class:!0});var i=_(e);a=d(i,"DIV",{class:!0}),_(a).forEach(f),t=M(i),n=d(i,"DIV",{class:!0});var p=_(n);r=y(p,"🏠 "),l=d(p,"A",{href:!0});var $=_(l);s=y($,"Home"),$.forEach(f),p.forEach(f),i.forEach(f),this.h()},h(){m(a,"class","text-center flex-1"),m(l,"href","/"),m(n,"class",""),m(e,"class","my-4 flex w-[80%] mx-auto")},m(c,i){v(c,e,i),u(e,a),u(e,t),u(e,n),u(n,r),u(n,l),u(l,s)},p:w,i:w,o:w,d(c){c&&f(e)}}}function re(o){return[]}class se extends x{constructor(e){super(),C(this,e,re,le,G,{})}}function H(o,e,a){const t=o.slice();return t[5]=e[a],t}function ie(o){let e,a,t=o[8].message+"",n;return{c(){e=h("div"),a=E("Something went wrong while loading the data: "),n=E(t)},l(r){e=d(r,"DIV",{});var l=_(e);a=y(l,"Something went wrong while loading the data: "),n=y(l,t),l.forEach(f)},m(r,l){v(r,e,l),u(e,a),u(e,n)},p:w,d(r){r&&f(e)}}}function oe(o){let e,a,t=o[0]&&V(o),n=o[1]&&q(o);return{c(){t&&t.c(),e=D(),n&&n.c(),a=k()},l(r){t&&t.l(r),e=M(r),n&&n.l(r),a=k()},m(r,l){t&&t.m(r,l),v(r,e,l),n&&n.m(r,l),v(r,a,l)},p(r,l){r[0]?t?(t.p(r,l),l&1&&g(t,1)):(t=V(r),t.c(),g(t,1),t.m(e.parentNode,e)):t&&(N(),R(t,1,1,()=>{t=null}),F()),r[1]?n?(n.p(r,l),l&2&&g(n,1)):(n=q(r),n.c(),g(n,1),n.m(a.parentNode,a)):n&&(N(),R(n,1,1,()=>{n=null}),F())},d(r){t&&t.d(r),r&&f(e),n&&n.d(r),r&&f(a)}}}function V(o){let e,a,t;return{c(){e=h("article"),this.h()},l(n){e=d(n,"ARTICLE",{class:!0});var r=_(e);r.forEach(f),this.h()},h(){m(e,"class","prose text-justify mx-auto my-8")},m(n,r){v(n,e,r),e.innerHTML=o[0],t=!0},p(n,r){(!t||r&1)&&(e.innerHTML=n[0])},i(n){t||(n&&L(()=>{t&&(a||(a=I(e,A,{},!0)),a.run(1))}),t=!0)},o(n){n&&(a||(a=I(e,A,{},!1)),a.run(0)),t=!1},d(n){n&&f(e),n&&a&&a.end()}}}function q(o){let e,a,t,n,r=o[1],l=[];for(let s=0;s<r.length;s+=1)l[s]=j(H(o,r,s));return{c(){e=h("div"),a=h("ul");for(let s=0;s<l.length;s+=1)l[s].c();this.h()},l(s){e=d(s,"DIV",{class:!0});var c=_(e);a=d(c,"UL",{class:!0});var i=_(a);for(let p=0;p<l.length;p+=1)l[p].l(i);i.forEach(f),c.forEach(f),this.h()},h(){m(a,"class","list list-decimal"),m(e,"class","flex justify-center")},m(s,c){v(s,e,c),u(e,a);for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(a,null);n=!0},p(s,c){if(c&6){r=s[1];let i;for(i=0;i<r.length;i+=1){const p=H(s,r,i);l[i]?l[i].p(p,c):(l[i]=j(p),l[i].c(),l[i].m(a,null))}for(;i<l.length;i+=1)l[i].d(1);l.length=r.length}},i(s){n||(s&&L(()=>{n&&(t||(t=I(e,A,{},!0)),t.run(1))}),n=!0)},o(s){s&&(t||(t=I(e,A,{},!1)),t.run(0)),n=!1},d(s){s&&f(e),Y(l,s),s&&t&&t.end()}}}function T(o){let e,a,t=o[5]+"",n,r,l;return{c(){e=h("li"),a=h("a"),n=E(t),l=D(),this.h()},l(s){e=d(s,"LI",{});var c=_(e);a=d(c,"A",{href:!0});var i=_(a);n=y(i,t),i.forEach(f),l=M(c),c.forEach(f),this.h()},h(){m(a,"href",r=o[2].url.pathname+"/"+o[5])},m(s,c){v(s,e,c),u(e,a),u(a,n),u(e,l)},p(s,c){c&2&&t!==(t=s[5]+"")&&Z(n,t),c&6&&r!==(r=s[2].url.pathname+"/"+s[5])&&m(a,"href",r)},d(s){s&&f(e)}}}function j(o){let e,a=o[5]&&T(o);return{c(){a&&a.c(),e=k()},l(t){a&&a.l(t),e=k()},m(t,n){a&&a.m(t,n),v(t,e,n)},p(t,n){t[5]?a?a.p(t,n):(a=T(t),a.c(),a.m(e.parentNode,e)):a&&(a.d(1),a=null)},d(t){a&&a.d(t),t&&f(e)}}}function ce(o){let e,a,t;return{c(){e=h("div"),a=h("div"),t=h("span"),this.h()},l(n){e=d(n,"DIV",{class:!0});var r=_(e);a=d(r,"DIV",{class:!0});var l=_(a);t=d(l,"SPAN",{class:!0}),_(t).forEach(f),l.forEach(f),r.forEach(f),this.h()},h(){m(t,"class","loading loading-infinity loading-lg text-primary"),m(a,"class","flex justify-center"),m(e,"class","h-screen w-screen flex flex-col justify-center")},m(n,r){v(n,e,r),u(e,a),u(a,t)},p:w,d(n){n&&f(e)}}}function fe(o){let e,a,t,n;e=new se({});let r={ctx:o,current:null,token:null,hasCatch:!0,pending:ce,then:oe,catch:ie,error:8};return z(o[3](),r),{c(){B(e.$$.fragment),a=D(),t=k(),r.block.c()},l(l){K(e.$$.fragment,l),a=M(l),t=k(),r.block.l(l)},m(l,s){O(e,l,s),v(l,a,s),v(l,t,s),r.block.m(l,r.anchor=s),r.mount=()=>t.parentNode,r.anchor=t,n=!0},p(l,[s]){o=l,Q(r,o,s)},i(l){n||(g(e.$$.fragment,l),n=!0)},o(l){R(e.$$.fragment,l),n=!1},d(l){J(e,l),l&&f(a),l&&f(t),r.block.d(l),r.token=null,r=null}}}function ue(o,e,a){let t;W(o,ee,c=>a(2,t=c));let n,r;async function l(c){try{const i=te("Artur-Galstyan/leaderboard",`${c.db}/README.md`),$=await(await fetch(i)).text(),S=ae.parse($,{mangle:!1,headerIds:!1}),P=ne("leaderboard",`${c.db}`),U=(await(await fetch(P)).json()).map(b=>(b.name=b.name.replace(".md",""),b.name=="README"||b.name[0]=="^"||b.name[0]=="$"?void 0:b.name));return{content:S,files:U}}catch{return{status:404}}}async function s(){const c=await l(t.params);a(0,n=c.content),a(1,r=c.files)}return X(async()=>{}),[n,r,t,s]}class ve extends x{constructor(e){super(),C(this,e,ue,fe,G,{})}}export{ve as component};
