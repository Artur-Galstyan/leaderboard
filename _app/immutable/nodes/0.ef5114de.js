import{S as A,i as G,s as H,k as g,q as w,a as R,l as v,m as b,r as C,h as m,c as O,n as $,b as N,C as h,D as S,E as J,F as M,G as K,H as W,u as L,w as Q,I as X,y as Z,z as x,A as ee,g as D,d as y,f as te,J as le,K as ne,L as ae,B as se,o as oe,M as ie,N as U,v as re}from"../chunks/index.62b51d1e.js";import{c as T,S as ue,t as ce}from"../chunks/sweetalert2.all.bbf349c4.js";import{f as B}from"../chunks/index.58403619.js";const fe=!0,we=Object.freeze(Object.defineProperty({__proto__:null,prerender:fe},Symbol.toStringTag,{value:"Module"}));function F(f,e,r){const s=f.slice();return s[4]=e[r],s}function P(f,e,r){const s=f.slice();return s[7]=e[r],s}function Y(f){let e,r,s,_,c,o,i,a=f[1].newRows,l=[];for(let t=0;t<a.length;t+=1)l[t]=j(P(f,a,t));let d=f[1].newColumns,n=[];for(let t=0;t<d.length;t+=1)n[t]=q(F(f,d,t));return{c(){e=g("div"),r=w(`New Rows:
					`),s=g("ul");for(let t=0;t<l.length;t+=1)l[t].c();_=R(),c=g("div"),o=w(`New Columns:
					`),i=g("ul");for(let t=0;t<n.length;t+=1)n[t].c()},l(t){e=v(t,"DIV",{});var p=b(e);r=C(p,`New Rows:
					`),s=v(p,"UL",{});var u=b(s);for(let E=0;E<l.length;E+=1)l[E].l(u);u.forEach(m),p.forEach(m),_=O(t),c=v(t,"DIV",{});var k=b(c);o=C(k,`New Columns:
					`),i=v(k,"UL",{});var I=b(i);for(let E=0;E<n.length;E+=1)n[E].l(I);I.forEach(m),k.forEach(m)},m(t,p){N(t,e,p),h(e,r),h(e,s);for(let u=0;u<l.length;u+=1)l[u]&&l[u].m(s,null);N(t,_,p),N(t,c,p),h(c,o),h(c,i);for(let u=0;u<n.length;u+=1)n[u]&&n[u].m(i,null)},p(t,p){if(p&3){a=t[1].newRows;let u;for(u=0;u<a.length;u+=1){const k=P(t,a,u);l[u]?l[u].p(k,p):(l[u]=j(k),l[u].c(),l[u].m(s,null))}for(;u<l.length;u+=1)l[u].d(1);l.length=a.length}if(p&2){d=t[1].newColumns;let u;for(u=0;u<d.length;u+=1){const k=F(t,d,u);n[u]?n[u].p(k,p):(n[u]=q(k),n[u].c(),n[u].m(i,null))}for(;u<n.length;u+=1)n[u].d(1);n.length=d.length}},d(t){t&&m(e),M(l,t),t&&m(_),t&&m(c),M(n,t)}}}function j(f){let e,r=f[7].dataset+"",s,_,c,o,i,a,l;function d(){return f[2](f[7])}return{c(){e=g("li"),s=w(r),_=w(` -
								`),c=g("button"),o=w("Expand"),i=R(),this.h()},l(n){e=v(n,"LI",{});var t=b(e);s=C(t,r),_=C(t,` -
								`),c=v(t,"BUTTON",{class:!0});var p=b(c);o=C(p,"Expand"),p.forEach(m),i=O(t),t.forEach(m),this.h()},h(){$(c,"class","btn btn-info btn-xs")},m(n,t){N(n,e,t),h(e,s),h(e,_),h(e,c),h(c,o),h(e,i),a||(l=K(c,"click",W(d)),a=!0)},p(n,t){f=n,t&2&&r!==(r=f[7].dataset+"")&&L(s,r)},d(n){n&&m(e),a=!1,l()}}}function q(f){let e,r=f[4].dataset+"",s,_,c=f[4].column+"",o,i,a=f[4].numerical?"Numerical":"Non-Numerical",l,d;return{c(){e=g("li"),s=w(r),_=w(" - "),o=w(c),i=w(" - "),l=w(a),d=R()},l(n){e=v(n,"LI",{});var t=b(e);s=C(t,r),_=C(t," - "),o=C(t,c),i=C(t," - "),l=C(t,a),d=O(t),t.forEach(m)},m(n,t){N(n,e,t),h(e,s),h(e,_),h(e,o),h(e,i),h(e,l),h(e,d)},p(n,t){t&2&&r!==(r=n[4].dataset+"")&&L(s,r),t&2&&c!==(c=n[4].column+"")&&L(o,c),t&2&&a!==(a=n[4].numerical?"Numerical":"Non-Numerical")&&L(l,a)},d(n){n&&m(e)}}}function _e(f){let e,r,s,_,c,o,i,a,l,d,n=f[1]&&Y(f);return{c(){e=g("dialog"),r=g("form"),s=g("h3"),_=w("Your Changes"),c=R(),o=g("div"),n&&n.c(),i=R(),a=g("form"),l=g("button"),d=w("close"),this.h()},l(t){e=v(t,"DIALOG",{id:!0,class:!0});var p=b(e);r=v(p,"FORM",{method:!0,class:!0});var u=b(r);s=v(u,"H3",{class:!0});var k=b(s);_=C(k,"Your Changes"),k.forEach(m),c=O(u),o=v(u,"DIV",{});var I=b(o);n&&n.l(I),I.forEach(m),u.forEach(m),i=O(p),a=v(p,"FORM",{method:!0,class:!0});var E=b(a);l=v(E,"BUTTON",{});var V=b(l);d=C(V,"close"),V.forEach(m),E.forEach(m),p.forEach(m),this.h()},h(){$(s,"class","font-bold text-lg"),$(r,"method","dialog"),$(r,"class","modal-box"),$(a,"method","dialog"),$(a,"class","modal-backdrop"),$(e,"id","your-changes-dialog"),$(e,"class","modal")},m(t,p){N(t,e,p),h(e,r),h(r,s),h(s,_),h(r,c),h(r,o),n&&n.m(o,null),h(e,i),h(e,a),h(a,l),h(l,d),f[3](e)},p(t,[p]){t[1]?n?n.p(t,p):(n=Y(t),n.c(),n.m(o,null)):n&&(n.d(1),n=null)},i:S,o:S,d(t){t&&m(e),n&&n.d(),f[3](null)}}}function de(f,e,r){let s;J(f,T,i=>r(1,s=i));let _;const c=async i=>{await ue.fire({title:"Row",html:`<div class="grid grid-cols-2">
												${i.row.getCells().map(a=>`<div>${a.getField()}</div> <div>${a.getValue()}</div>`)}</div>`.replace(/,/g,""),target:_,showClass:{popup:"animate__animated animate__fadeIn animate__faster"},hideClass:{popup:"animate__animated animate__fadeOut animate__faster"},position:"top"})};function o(i){Q[i?"unshift":"push"](()=>{_=i,r(0,_)})}return[_,s,c,o]}class he extends A{constructor(e){super(),G(this,e,de,_e,H,{})}}function z(f){let e,r,s,_,c,o;return{c(){e=g("button"),r=w("Your Changes"),this.h()},l(i){e=v(i,"BUTTON",{class:!0});var a=b(e);r=C(a,"Your Changes"),a.forEach(m),this.h()},h(){$(e,"class","btn")},m(i,a){N(i,e,a),h(e,r),_=!0,c||(o=K(e,"click",f[3]),c=!0)},p:S,i(i){_||(ie(()=>{_&&(s||(s=U(e,B,{},!0)),s.run(1))}),_=!0)},o(i){s||(s=U(e,B,{},!1)),s.run(0),_=!1},d(i){i&&m(e),i&&s&&s.end(),c=!1,o()}}}function me(f){let e,r,s,_,c,o=f[0]&&(f[0].newColumns.length>0||f[0].newRows.length>0)&&z(f);const i=f[2].default,a=X(i,f,f[1],null);return _=new he({}),{c(){e=g("div"),o&&o.c(),r=R(),a&&a.c(),s=R(),Z(_.$$.fragment),this.h()},l(l){e=v(l,"DIV",{class:!0});var d=b(e);o&&o.l(d),d.forEach(m),r=O(l),a&&a.l(l),s=O(l),x(_.$$.fragment,l),this.h()},h(){$(e,"class","absolute top-10 right-10")},m(l,d){N(l,e,d),o&&o.m(e,null),N(l,r,d),a&&a.m(l,d),N(l,s,d),ee(_,l,d),c=!0},p(l,[d]){l[0]&&(l[0].newColumns.length>0||l[0].newRows.length>0)?o?(o.p(l,d),d&1&&D(o,1)):(o=z(l),o.c(),D(o,1),o.m(e,null)):o&&(re(),y(o,1,1,()=>{o=null}),te()),a&&a.p&&(!c||d&2)&&le(a,i,l,l[1],c?ae(i,l[1],d,null):ne(l[1]),null)},i(l){c||(D(o),D(a,l),D(_.$$.fragment,l),c=!0)},o(l){y(o),y(a,l),y(_.$$.fragment,l),c=!1},d(l){l&&m(e),o&&o.d(),l&&m(r),a&&a.d(l),l&&m(s),se(_,l)}}}function pe(f,e,r){let s;J(f,T,i=>r(0,s=i));let{$$slots:_={},$$scope:c}=e;oe(()=>{const i=document.cookie.split("; ").find(a=>a.startsWith("pr-changes="));if(i){const a=i.split("=")[1];let l=JSON.parse(a);l.lastChange=null,T.set(l)}});const o=()=>{ce("your-changes-dialog")};return f.$$set=i=>{"$$scope"in i&&r(1,c=i.$$scope)},[s,c,_,o]}class Ce extends A{constructor(e){super(),G(this,e,pe,me,H,{})}}export{Ce as component,we as universal};
