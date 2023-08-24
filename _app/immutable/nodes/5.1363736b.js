import{s as Re,m as fe,r as Fe,c as pe,o as Me,d as Z,b as Ce,h as ke,n as ie}from"../chunks/scheduler.2739a3c5.js";import{S as Pe,i as Ue,s as L,g as h,r as te,c as $,h as v,j as R,f as i,x as X,G as Oe,u as le,k as c,D as ne,a as _,y as k,v as se,z as de,t as Q,b as qe,d as W,w as ae,H as Se,e as De,F as Be,p as ze,C as ue,m as Ae,n as He}from"../chunks/index.2bd5a6d6.js";import{A as Ge,a as Ke,b as Ye,c as Je,S as Qe,j as We,e as _e,s as be,k as Xe,p as Ie,d as Ze,g as et,T as tt,f as he,h as lt,D as st}from"../chunks/tabulator_esm.e0381fef.js";import{p as at}from"../chunks/stores.180b5c60.js";import{a as J,c as Ne,t as me,b as nt}from"../chunks/lastParsedTable.ac909c7c.js";import{m as Te}from"../chunks/marked.esm.ed0f3e9f.js";import{f as ce}from"../chunks/index.9075ae21.js";const{document:Le}=et;function it(n){let e,t,l,a,p,C,d,E=n[2]&&!n[2].includes("404"),T,G,b,F,D,B=n[10]&&n[10].newLeaderboards.find(n[14])!=null,O,A,V,P,U,z="Double click on a row to see details",K,q=n[10]&&n[10].newColumns.find(n[13])!=null,M,x,Y,o;t=new st({props:{datasetName:null}});let f=n[1]&&n[0]&&$e(),u=E&&Ee(n);function I(r,y){return r[0]==null?dt:ot}let H=I(n),j=H(n),w=B&&Ve(n),g=q&&xe();return{c(){e=h("div"),te(t.$$.fragment),l=L(),f&&f.c(),a=L(),p=h("div"),C=L(),d=h("div"),u&&u.c(),G=L(),b=h("div"),F=h("div"),j.c(),D=L(),w&&w.c(),O=L(),A=h("div"),V=h("input"),P=L(),U=h("div"),U.textContent=z,K=L(),g&&g.c(),this.h()},l(r){e=v(r,"DIV",{class:!0});var y=R(e);le(t.$$.fragment,y),l=$(y),f&&f.l(y),a=$(y),p=v(y,"DIV",{class:!0}),R(p).forEach(i),C=$(y),d=v(y,"DIV",{class:!0});var re=R(d);u&&u.l(re),re.forEach(i),y.forEach(i),G=$(r),b=v(r,"DIV",{id:!0,class:!0});var S=R(b);F=v(S,"DIV",{class:!0});var oe=R(F);j.l(oe),oe.forEach(i),D=$(S),w&&w.l(S),O=$(S),A=v(S,"DIV",{class:!0});var N=R(A);V=v(N,"INPUT",{type:!0,class:!0,placeholder:!0,name:!0,id:!0}),P=$(N),U=v(N,"DIV",{class:!0,"data-svelte-h":!0}),X(U)!=="svelte-1lij4al"&&(U.textContent=z),N.forEach(i),K=$(S),g&&g.l(S),S.forEach(i),this.h()},h(){c(p,"class","divider w-[50%] mx-auto"),c(d,"class","prose text-justify mx-auto"),c(e,"class",""),c(F,"class","font-bold my-auto mx-20 text-2xl"),c(V,"type","text"),c(V,"class","input input-primary input-sm w-60 my-auto"),c(V,"placeholder","Filter 🔎"),c(V,"name","filter"),c(V,"id","filter"),ne(V,"hidden",n[0]==null),c(U,"class","text-xs my-auto text-gray-600"),c(A,"class","flex space-x-4"),c(b,"id","leaderboard-header"),c(b,"class","flex justify-center my-4")},m(r,y){_(r,e,y),se(t,e,null),k(e,l),f&&f.m(e,null),k(e,a),k(e,p),k(e,C),k(e,d),u&&u.m(d,null),_(r,G,y),_(r,b,y),k(b,F),j.m(F,null),k(b,D),w&&w.m(b,null),k(b,O),k(b,A),k(A,V),n[17](V),k(A,P),k(A,U),k(b,K),g&&g.m(b,null),x=!0,Y||(o=de(V,"input",n[18]),Y=!0)},p(r,y){r[1]&&r[0]?f||(f=$e(),f.c(),f.m(e,a)):f&&(f.d(1),f=null),y&4&&(E=r[2]&&!r[2].includes("404")),E?u?u.p(r,y):(u=Ee(r),u.c(),u.m(d,null)):u&&(u.d(1),u=null),H===(H=I(r))&&j?j.p(r,y):(j.d(1),j=H(r),j&&(j.c(),j.m(F,null))),y&1536&&(B=r[10]&&r[10].newLeaderboards.find(r[14])!=null),B?w?w.p(r,y):(w=Ve(r),w.c(),w.m(b,O)):w&&(w.d(1),w=null),(!x||y&1)&&ne(V,"hidden",r[0]==null),y&1536&&(q=r[10]&&r[10].newColumns.find(r[13])!=null),q?g||(g=xe(),g.c(),g.m(b,null)):g&&(g.d(1),g=null)},i(r){x||(W(t.$$.fragment,r),r&&ke(()=>{x&&(T||(T=ue(e,ce,{},!0)),T.run(1))}),r&&ke(()=>{x&&(M||(M=ue(b,ce,{},!0)),M.run(1))}),x=!0)},o(r){Q(t.$$.fragment,r),r&&(T||(T=ue(e,ce,{},!1)),T.run(0)),r&&(M||(M=ue(b,ce,{},!1)),M.run(0)),x=!1},d(r){r&&(i(e),i(G),i(b)),ae(t),f&&f.d(),u&&u.d(),r&&T&&T.end(),j.d(),w&&w.d(),n[17](null),g&&g.d(),r&&M&&M.end(),Y=!1,o()}}}function rt(n){let e,t='<div class="flex justify-center"><span class="loading loading-infinity loading-lg text-primary"></span></div>';return{c(){e=h("div"),e.innerHTML=t,this.h()},l(l){e=v(l,"DIV",{class:!0,"data-svelte-h":!0}),X(e)!=="svelte-rhkr8p"&&(e.innerHTML=t),this.h()},h(){c(e,"class","h-screen w-screen flex flex-col justify-center")},m(l,a){_(l,e,a)},p:ie,i:ie,o:ie,d(l){l&&i(e)}}}function $e(n){let e,t="<h1>Dataset: Systems</h1>";return{c(){e=h("main"),e.innerHTML=t,this.h()},l(l){e=v(l,"MAIN",{class:!0,"data-svelte-h":!0}),X(e)!=="svelte-1c21er8"&&(e.innerHTML=t),this.h()},h(){c(e,"class","prose text-justify mx-auto mt-16")},m(l,a){_(l,e,a)},d(l){l&&i(e)}}}function Ee(n){let e,t,l;return{c(){e=new Se(!1),t=L(),l=h("div"),this.h()},l(a){e=Be(a,!1),t=$(a),l=v(a,"DIV",{class:!0}),R(l).forEach(i),this.h()},h(){e.a=t,c(l,"class","divider w-[50%] mx-auto")},m(a,p){e.m(n[2],a,p),_(a,t,p),_(a,l,p)},p(a,p){p&4&&e.p(a[2])},d(a){a&&(e.d(),i(t),i(l))}}}function ot(n){let e;return{c(){e=Ae("Leaderboard")},l(t){e=He(t,"Leaderboard")},m(t,l){_(t,e,l)},p:ie,d(t){t&&i(e)}}}function dt(n){let e,t,l,a="Submit a new leaderboard",p,C;return{c(){e=Ae(`No Leaderboard for this dataset yet

				`),t=h("div"),l=h("button"),l.textContent=a,this.h()},l(d){e=He(d,`No Leaderboard for this dataset yet

				`),t=v(d,"DIV",{class:!0});var E=R(t);l=v(E,"BUTTON",{class:!0,"data-svelte-h":!0}),X(l)!=="svelte-o9blqd"&&(l.textContent=a),E.forEach(i),this.h()},h(){c(l,"class","btn btn-accent btn-wide"),c(t,"class","flex justify-center")},m(d,E){_(d,e,E),_(d,t,E),k(t,l),p||(C=de(l,"click",n[15]),p=!0)},p:ie,d(d){d&&(i(e),i(t)),p=!1,C()}}}function Ve(n){let e,t,l="Delete",a,p;return{c(){e=h("div"),t=h("button"),t.textContent=l,this.h()},l(C){e=v(C,"DIV",{class:!0});var d=R(e);t=v(d,"BUTTON",{class:!0,"data-svelte-h":!0}),X(t)!=="svelte-ive5qc"&&(t.textContent=l),d.forEach(i),this.h()},h(){c(t,"class","btn btn-warning"),c(e,"class","my-auto mx-4")},m(C,d){_(C,e,d),k(e,t),a||(p=de(t,"click",n[16]),a=!0)},p:ie,d(C){C&&i(e),a=!1,p()}}}function xe(n){let e,t="Right click on your new column to delete it";return{c(){e=h("div"),e.textContent=t,this.h()},l(l){e=v(l,"DIV",{class:!0,"data-svelte-h":!0}),X(e)!=="svelte-t5lca8"&&(e.textContent=t),this.h()},h(){c(e,"class","mx-4 italic text-xs my-auto text-gray-400")},m(l,a){_(l,e,a)},d(l){l&&i(e)}}}function je(n){let e,t;return{c(){e=new Se(!1),t=De(),this.h()},l(l){e=Be(l,!1),t=De(),this.h()},h(){e.a=t},m(l,a){e.m(n[3],l,a),_(l,t,a)},p(l,a){a&8&&e.p(l[3])},d(l){l&&(i(t),e.d())}}}function ft(n){let e,t,l,a,p,C,d,E,T,G="+",b,F,D,B,O="+",A,V,P,U,z,K,q,M,x,Y,o,f,u,I,H,j,w,g,r,y;const re=[rt,it],S=[];function oe(s,m){return s[6]?0:1}e=oe(n),t=S[e]=re[e](n);let N=n[3]&&je(n);return x=new Ge({props:{dataset:"systems"}}),o=new Ke({props:{dataset:"systems"}}),u=new Ye({props:{dataset:"systems"}}),H=new Je({props:{dataset:"systems"}}),w=new Qe({}),{c(){t.c(),l=L(),a=h("div"),p=h("div"),C=h("div"),d=L(),E=h("div"),T=h("button"),T.textContent=G,F=L(),D=h("div"),B=h("button"),B.textContent=O,V=L(),P=h("div"),N&&N.c(),U=L(),z=h("div"),K=L(),q=h("link"),M=L(),te(x.$$.fragment),Y=L(),te(o.$$.fragment),f=L(),te(u.$$.fragment),I=L(),te(H.$$.fragment),j=L(),te(w.$$.fragment),this.h()},l(s){t.l(s),l=$(s),a=v(s,"DIV",{id:!0,class:!0});var m=R(a);p=v(m,"DIV",{class:!0});var ee=R(p);C=v(ee,"DIV",{}),R(C).forEach(i),ee.forEach(i),d=$(m),E=v(m,"DIV",{class:!0});var ve=R(E);T=v(ve,"BUTTON",{class:!0,"data-svelte-h":!0}),X(T)!=="svelte-9l0pn5"&&(T.textContent=G),ve.forEach(i),m.forEach(i),F=$(s),D=v(s,"DIV",{class:!0});var we=R(D);B=v(we,"BUTTON",{class:!0,"data-svelte-h":!0}),X(B)!=="svelte-11yytkm"&&(B.textContent=O),we.forEach(i),V=$(s),P=v(s,"DIV",{class:!0});var ge=R(P);N&&N.l(ge),ge.forEach(i),U=$(s),z=v(s,"DIV",{class:!0}),R(z).forEach(i),K=$(s);const ye=Oe("svelte-1256386",Le.head);q=v(ye,"LINK",{href:!0,rel:!0}),ye.forEach(i),M=$(s),le(x.$$.fragment,s),Y=$(s),le(o.$$.fragment,s),f=$(s),le(u.$$.fragment,s),I=$(s),le(H.$$.fragment,s),j=$(s),le(w.$$.fragment,s),this.h()},h(){c(p,"class","overflow-x-scroll w-full"),c(T,"class","btn btn-secondary h-full"),c(E,"class","mx-2 flex items-center justify-center bg-reg-400"),c(a,"id","leaderboard-wrapper"),c(a,"class",b=fe(`w-[80%] mx-auto ${n[7]} flex`)+" svelte-1w85bai"),ne(a,"hidden",n[0]==null||n[8]==null),c(B,"class","btn btn-primary w-full"),c(D,"class",A=fe(`my-2 w-[80%] mx-auto ${n[7]}`)+" svelte-1w85bai"),ne(D,"hidden",n[0]==null),c(P,"class","prose text-justify mx-auto"),c(z,"class","my-20"),c(q,"href","https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_bootstrap5.min.css"),c(q,"rel","stylesheet")},m(s,m){S[e].m(s,m),_(s,l,m),_(s,a,m),k(a,p),k(p,C),n[19](C),k(a,d),k(a,E),k(E,T),_(s,F,m),_(s,D,m),k(D,B),_(s,V,m),_(s,P,m),N&&N.m(P,null),_(s,U,m),_(s,z,m),_(s,K,m),k(Le.head,q),_(s,M,m),se(x,s,m),_(s,Y,m),se(o,s,m),_(s,f,m),se(u,s,m),_(s,I,m),se(H,s,m),_(s,j,m),se(w,s,m),g=!0,r||(y=[de(T,"click",n[11]),de(B,"click",n[12])],r=!0)},p(s,[m]){let ee=e;e=oe(s),e===ee?S[e].p(s,m):(ze(),Q(S[ee],1,1,()=>{S[ee]=null}),qe(),t=S[e],t?t.p(s,m):(t=S[e]=re[e](s),t.c()),W(t,1),t.m(l.parentNode,l)),(!g||m&128&&b!==(b=fe(`w-[80%] mx-auto ${s[7]} flex`)+" svelte-1w85bai"))&&c(a,"class",b),(!g||m&385)&&ne(a,"hidden",s[0]==null||s[8]==null),(!g||m&128&&A!==(A=fe(`my-2 w-[80%] mx-auto ${s[7]}`)+" svelte-1w85bai"))&&c(D,"class",A),(!g||m&129)&&ne(D,"hidden",s[0]==null),s[3]?N?N.p(s,m):(N=je(s),N.c(),N.m(P,null)):N&&(N.d(1),N=null)},i(s){g||(W(t),W(x.$$.fragment,s),W(o.$$.fragment,s),W(u.$$.fragment,s),W(H.$$.fragment,s),W(w.$$.fragment,s),g=!0)},o(s){Q(t),Q(x.$$.fragment,s),Q(o.$$.fragment,s),Q(u.$$.fragment,s),Q(H.$$.fragment,s),Q(w.$$.fragment,s),g=!1},d(s){s&&(i(l),i(a),i(F),i(D),i(V),i(P),i(U),i(z),i(K),i(M),i(Y),i(f),i(I),i(j)),S[e].d(s),n[19](null),N&&N.d(),i(q),ae(x,s),ae(o,s),ae(u,s),ae(H,s),ae(w,s),r=!1,Fe(y)}}}function ut(n,e,t){let l,a,p;pe(n,J,o=>t(8,l=o)),pe(n,at,o=>t(9,a=o)),pe(n,Ne,o=>t(10,p=o));const C=tt;let d,E,T,G,b=!1,F=!1,D,B,O=!0,A="";Me(async()=>{document.body.onclick=f=>{let u=document.getElementsByClassName("delete-column-button");for(let I=0;I<u.length;I++)u[I].remove()},Z(J,l=null,l);const o=await We();if(t(0,d=o.parsedTable),t(1,E=o.prefaceData),t(2,T=o.parsedInfo),t(3,G=o.parsedFooter),t(7,A="fade-in"),d){let f=he();f=_e(d,f);let u=f.find(I=>I.field==="System Name");u&&(f=f.filter(I=>I.field!=="System Name"),f.unshift(u));try{Z(J,l=new C(D,{data:d,layout:"fitColumns",height:"500",reactiveData:!0,columns:f,movableColumns:!0}),l),be(a)}catch{console.log("some error occured while loading table's data; likely got cancelled"),Z(J,l=null,l)}}else if(p){let f=p;if(f.newLeaderboards.find(I=>I.dataset=="systems")){console.log("Leaderboard found in pr changes cookie");const I=Te.parse(f.newLeaderboards[f.newLeaderboards.length-1].data,{mangle:!1,headerIds:!1});if(t(0,d=Ie(I).results[0]),d!=null){console.log("Table found in pr changes cookie");let H=he();H=_e(d,H);try{Z(J,l=new C(D,{data:d,layout:"fitColumns",height:"500",reactiveData:!0,columns:H,movableColumns:!0}),l),be(a)}catch{console.log("some error occured while loading table's data; likely got cancelled"),Z(J,l=null,l)}}else console.log("No table found")}else{nt("No leaderboard found","There is no leaderboard for this dataset"),t(6,O=!1),b=!1,F=!1;return}t(6,O=!1)}else console.log("No table found");t(6,O=!1)});function V(){me("add-new-column-systems")}function P(){me("add-new-row-systems")}Ne.subscribe(o=>{if(o){if(o.lastChange==="column"){let f=o.newColumns[o.newColumns.length-1];console.log("Adding new column",f),Xe(f,a)}else if(o.lastChange==="leaderboard"){const f=Te.parse(o.newLeaderboards[o.newLeaderboards.length-1].data,{mangle:!1,headerIds:!1});if(t(0,d=Ie(f).results[0]),d){let u=he();u=_e(d,u);try{Z(J,l=new C(D,{data:d,layout:"fitColumns",height:"500",reactiveData:!0,columns:u,movableColumns:!0}),l),be(a)}catch{console.log("some error occured while loading table's data; likely got cancelled"),Z(J,l=null,l)}}else console.log("No table found - from currentPRChanges subscription");t(6,O=!1)}o.lastChange!==null&&Ze(o),F&&!b&&(l==null||l.redraw(!0)),J.set(l)}});const U=o=>o.dataset===`${a.params.db}/${a.params.dataset}`,z=o=>o.dataset===`${a.params.db}/${a.params.dataset}`,K=()=>{me(`add-new-leaderboard-${a.params.db}/${a.params.dataset}`)},q=()=>{me("delete-new-leaderboard-"+a.params.db+"/"+a.params.dataset)};function M(o){Ce[o?"unshift":"push"](()=>{B=o,t(5,B)})}const x=o=>{lt(o)};function Y(o){Ce[o?"unshift":"push"](()=>{D=o,t(4,D)})}return[d,E,T,G,D,B,O,A,l,a,p,V,P,U,z,K,q,M,x,Y]}class wt extends Pe{constructor(e){super(),Ue(this,e,ut,ft,Re,{})}}export{wt as component};
