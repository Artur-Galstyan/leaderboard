import{S as I,i as R,s as x,k as _,q as A,a as M,e as k,l as p,m,r as q,h as c,c as C,n as b,b as d,G as h,g,d as v,f as K,I as T,o as N,J as Q,K as w,L as S,v as U,u as V}from"../chunks/index.d87aa0dd.js";import{p as $}from"../chunks/stores.a305d468.js";import{g as j,f as D}from"../chunks/index.bc16b50d.js";import{m as F}from"../chunks/index.d11ea5b9.js";function G(f,r,a){const l=f.slice();return l[3]=r[a],l}function E(f){let r,a,l,i,s=f[0].knowledgeGraphs,e=[];for(let t=0;t<s.length;t+=1)e[t]=L(G(f,s,t));return{c(){r=_("div"),a=_("ul");for(let t=0;t<e.length;t+=1)e[t].c();this.h()},l(t){r=p(t,"DIV",{class:!0});var n=m(r);a=p(n,"UL",{class:!0});var o=m(a);for(let u=0;u<e.length;u+=1)e[u].l(o);o.forEach(c),n.forEach(c),this.h()},h(){b(a,"class","list list-decimal"),b(r,"class","flex justify-center")},m(t,n){d(t,r,n),h(r,a);for(let o=0;o<e.length;o+=1)e[o]&&e[o].m(a,null);i=!0},p(t,n){if(n&3){s=t[0].knowledgeGraphs;let o;for(o=0;o<s.length;o+=1){const u=G(t,s,o);e[o]?e[o].p(u,n):(e[o]=L(u),e[o].c(),e[o].m(a,null))}for(;o<e.length;o+=1)e[o].d(1);e.length=s.length}},i(t){i||(t&&Q(()=>{i&&(l||(l=w(r,D,{},!0)),l.run(1))}),i=!0)},o(t){t&&(l||(l=w(r,D,{},!1)),l.run(0)),i=!1},d(t){t&&c(r),S(e,t),t&&l&&l.end()}}}function y(f){let r,a,l=f[3]+"",i,s,e;return{c(){r=_("li"),a=_("a"),i=A(l),e=M(),this.h()},l(t){r=p(t,"LI",{});var n=m(r);a=p(n,"A",{href:!0});var o=m(a);i=q(o,l),o.forEach(c),e=C(n),n.forEach(c),this.h()},h(){b(a,"href",s=f[1].url.origin+"/datasets/"+f[3].toLowerCase())},m(t,n){d(t,r,n),h(r,a),h(a,i),h(r,e)},p(t,n){n&1&&l!==(l=t[3]+"")&&V(i,l),n&3&&s!==(s=t[1].url.origin+"/datasets/"+t[3].toLowerCase())&&b(a,"href",s)},d(t){t&&c(r)}}}function L(f){let r,a=f[3]&&y(f);return{c(){a&&a.c(),r=k()},l(l){a&&a.l(l),r=k()},m(l,i){a&&a.m(l,i),d(l,r,i)},p(l,i){l[3]?a?a.p(l,i):(a=y(l),a.c(),a.m(r.parentNode,r)):a&&(a.d(1),a=null)},d(l){a&&a.d(l),l&&c(r)}}}function H(f){let r,a,l,i,s=f[0]&&E(f);return{c(){r=_("div"),a=A("KGQA Leaderboard"),l=M(),s&&s.c(),i=k(),this.h()},l(e){r=p(e,"DIV",{class:!0});var t=m(r);a=q(t,"KGQA Leaderboard"),t.forEach(c),l=C(e),s&&s.l(e),i=k(),this.h()},h(){b(r,"class","text-center my-12 text-5xl")},m(e,t){d(e,r,t),h(r,a),d(e,l,t),s&&s.m(e,t),d(e,i,t)},p(e,[t]){e[0]?s?(s.p(e,t),t&1&&g(s,1)):(s=E(e),s.c(),g(s,1),s.m(i.parentNode,i)):s&&(U(),v(s,1,1,()=>{s=null}),K())},i(e){g(s)},o(e){v(s)},d(e){e&&c(r),e&&c(l),s&&s.d(e),e&&c(i)}}}function J(f,r,a){let l;T(f,$,e=>a(1,l=e));let i;async function s(){try{const e=j("Artur-Galstyan/leaderboard/","README.md"),n=await(await fetch(e)).text();return{prefaceData:{knowledgeGraphs:F(n).data.knowledgeGraphs}}}catch(e){throw new Error(`Failed to load, error ${e}`)}}return N(async()=>{const e=await s();a(0,i=e.prefaceData)}),[i,l]}class W extends I{constructor(r){super(),R(this,r,J,H,x,{})}}export{W as component};
