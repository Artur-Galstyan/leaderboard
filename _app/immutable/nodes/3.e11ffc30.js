import{i as z,j as J,k as $,l as Q,s as P,n as E,c as W,o as X,h as S}from"../chunks/scheduler.2739a3c5.js";import{p as M,t as x,b as R,d as b,S as V,i as G,g as _,h as m,x as B,k as d,a as f,f as u,r as Y,s as F,e as v,u as Z,c as I,v as ee,w as te,m as L,j as g,n as T,y as k,H as le,F as ae,C,B as ne,o as re}from"../chunks/index.2bd5a6d6.js";import{f as H,e as j,P as se}from"../chunks/constants.14aebf06.js";import{p as ce}from"../chunks/stores.e0987523.js";import{b as ie}from"../chunks/paths.05ab4cce.js";import{g as oe,m as ue,a as fe}from"../chunks/marked.esm.489300bf.js";function he(s,e){const a=e.token={};function t(r,l,n,c){if(e.token!==a)return;e.resolved=c;let o=e.ctx;n!==void 0&&(o=o.slice(),o[n]=c);const i=r&&(e.current=r)(o);let h=!1;e.block&&(e.blocks?e.blocks.forEach((w,y)=>{y!==l&&w&&(M(),x(w,1,1,()=>{e.blocks[y]===w&&(e.blocks[y]=null)}),R())}):e.block.d(1),i.c(),b(i,1),i.m(e.mount(),e.anchor),h=!0),e.block=i,e.blocks&&(e.blocks[l]=i),h&&Q()}if(z(s)){const r=J();if(s.then(l=>{$(r),t(e.then,1,e.value,l),$(null)},l=>{if($(r),t(e.catch,2,e.error,l),$(null),!e.hasCatch)throw l}),e.current!==e.pending)return t(e.pending,0),!0}else{if(e.current!==e.then)return t(e.then,1,e.value,s),!0;e.resolved=s}}function _e(s,e,a){const t=e.slice(),{resolved:r}=s;s.current===s.then&&(t[s.value]=r),s.current===s.catch&&(t[s.error]=r),s.block.p(t,a)}function me(s){let e,a=`<div class="text-center flex-1"></div> <div class="">🏠 <a href="${ie}">Home</a></div>`;return{c(){e=_("nav"),e.innerHTML=a,this.h()},l(t){e=m(t,"NAV",{class:!0,"data-svelte-h":!0}),B(e)!=="svelte-vrsws6"&&(e.innerHTML=a),this.h()},h(){d(e,"class","my-4 flex w-[80%] mx-auto")},m(t,r){f(t,e,r)},p:E,i:E,o:E,d(t){t&&u(e)}}}class de extends V{constructor(e){super(),G(this,e,null,me,P,{})}}function D(s,e,a){const t=s.slice();return t[5]=e[a],t}function pe(s){let e,a,t=s[8].message+"",r;return{c(){e=_("div"),a=L("Something went wrong while loading the data: "),r=L(t)},l(l){e=m(l,"DIV",{});var n=g(e);a=T(n,"Something went wrong while loading the data: "),r=T(n,t),n.forEach(u)},m(l,n){f(l,e,n),k(e,a),k(e,r)},p:E,d(l){l&&u(e)}}}function be(s){let e,a,t=s[0]&&N(s),r=s[1]&&q(s);return{c(){t&&t.c(),e=F(),r&&r.c(),a=v()},l(l){t&&t.l(l),e=I(l),r&&r.l(l),a=v()},m(l,n){t&&t.m(l,n),f(l,e,n),r&&r.m(l,n),f(l,a,n)},p(l,n){l[0]?t?(t.p(l,n),n&1&&b(t,1)):(t=N(l),t.c(),b(t,1),t.m(e.parentNode,e)):t&&(M(),x(t,1,1,()=>{t=null}),R()),l[1]?r?(r.p(l,n),n&2&&b(r,1)):(r=q(l),r.c(),b(r,1),r.m(a.parentNode,a)):r&&(M(),x(r,1,1,()=>{r=null}),R())},d(l){l&&(u(e),u(a)),t&&t.d(l),r&&r.d(l)}}}function N(s){let e,a,t,r;return{c(){e=_("article"),a=new le(!1),this.h()},l(l){e=m(l,"ARTICLE",{class:!0});var n=g(e);a=ae(n,!1),n.forEach(u),this.h()},h(){a.a=null,d(e,"class","prose text-justify mx-auto my-8")},m(l,n){f(l,e,n),a.m(s[0],e),r=!0},p(l,n){(!r||n&1)&&a.p(l[0])},i(l){r||(l&&S(()=>{r&&(t||(t=C(e,H,{},!0)),t.run(1))}),r=!0)},o(l){l&&(t||(t=C(e,H,{},!1)),t.run(0)),r=!1},d(l){l&&u(e),l&&t&&t.end()}}}function q(s){let e,a,t,r,l=j(s[1]),n=[];for(let c=0;c<l.length;c+=1)n[c]=U(D(s,l,c));return{c(){e=_("div"),a=_("ul");for(let c=0;c<n.length;c+=1)n[c].c();this.h()},l(c){e=m(c,"DIV",{class:!0});var o=g(e);a=m(o,"UL",{class:!0});var i=g(a);for(let h=0;h<n.length;h+=1)n[h].l(i);i.forEach(u),o.forEach(u),this.h()},h(){d(a,"class","list list-decimal"),d(e,"class","flex justify-center")},m(c,o){f(c,e,o),k(e,a);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(a,null);r=!0},p(c,o){if(o&6){l=j(c[1]);let i;for(i=0;i<l.length;i+=1){const h=D(c,l,i);n[i]?n[i].p(h,o):(n[i]=U(h),n[i].c(),n[i].m(a,null))}for(;i<n.length;i+=1)n[i].d(1);n.length=l.length}},i(c){r||(c&&S(()=>{r&&(t||(t=C(e,H,{},!0)),t.run(1))}),r=!0)},o(c){c&&(t||(t=C(e,H,{},!1)),t.run(0)),r=!1},d(c){c&&u(e),ne(n,c),c&&t&&t.end()}}}function A(s){let e,a,t=s[5]+"",r,l,n;return{c(){e=_("li"),a=_("a"),r=L(t),n=F(),this.h()},l(c){e=m(c,"LI",{});var o=g(e);a=m(o,"A",{href:!0});var i=g(a);r=T(i,t),i.forEach(u),n=I(o),o.forEach(u),this.h()},h(){d(a,"href",l=s[2].url.pathname+"/"+s[5])},m(c,o){f(c,e,o),k(e,a),k(a,r),k(e,n)},p(c,o){o&2&&t!==(t=c[5]+"")&&re(r,t),o&6&&l!==(l=c[2].url.pathname+"/"+c[5])&&d(a,"href",l)},d(c){c&&u(e)}}}function U(s){let e,a=s[5]&&A(s);return{c(){a&&a.c(),e=v()},l(t){a&&a.l(t),e=v()},m(t,r){a&&a.m(t,r),f(t,e,r)},p(t,r){t[5]?a?a.p(t,r):(a=A(t),a.c(),a.m(e.parentNode,e)):a&&(a.d(1),a=null)},d(t){t&&u(e),a&&a.d(t)}}}function ke(s){let e,a='<div class="flex justify-center"><span class="loading loading-infinity loading-lg text-primary"></span></div>';return{c(){e=_("div"),e.innerHTML=a,this.h()},l(t){e=m(t,"DIV",{class:!0,"data-svelte-h":!0}),B(e)!=="svelte-rhkr8p"&&(e.innerHTML=a),this.h()},h(){d(e,"class","h-screen w-screen flex flex-col justify-center")},m(t,r){f(t,e,r)},p:E,d(t){t&&u(e)}}}function ve(s){let e,a,t,r;e=new de({});let l={ctx:s,current:null,token:null,hasCatch:!0,pending:ke,then:be,catch:pe,error:8};return he(s[3](),l),{c(){Y(e.$$.fragment),a=F(),t=v(),l.block.c()},l(n){Z(e.$$.fragment,n),a=I(n),t=v(),l.block.l(n)},m(n,c){ee(e,n,c),f(n,a,c),f(n,t,c),l.block.m(n,l.anchor=c),l.mount=()=>t.parentNode,l.anchor=t,r=!0},p(n,[c]){s=n,_e(l,s,c)},i(n){r||(b(e.$$.fragment,n),r=!0)},o(n){x(e.$$.fragment,n),r=!1},d(n){n&&(u(a),u(t)),te(e,n),l.block.d(n),l.token=null,l=null}}}function ge(s,e,a){let t;W(s,ce,o=>a(2,t=o));let r,l;async function n(o){try{const i=oe(se,`${o.db}/README.md`),w=await(await fetch(i)).text(),y=ue.parse(w,{mangle:!1,headerIds:!1}),K=fe("leaderboard",`${o.db}`),O=(await(await fetch(K)).json()).map(p=>(p.name=p.name.replace(".md",""),p.name=="README"||p.name[0]=="^"||p.name[0]=="$"?void 0:p.name));return{content:y,files:O}}catch{return{status:404}}}async function c(){const o=await n(t.params);a(0,r=o.content),a(1,l=o.files)}return X(async()=>{}),[r,l,t,c]}class Re extends V{constructor(e){super(),G(this,e,ge,ve,P,{})}}export{Re as component};
