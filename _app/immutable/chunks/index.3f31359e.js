function $(){}function z(t,e){for(const n in e)t[n]=e[n];return t}function D(t){return t()}function C(){return Object.create(null)}function g(t){t.forEach(D)}function M(t){return typeof t=="function"}function ut(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function F(t){return Object.keys(t).length===0}function G(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function lt(t,e,n){t.$$.on_destroy.push(G(e,n))}function st(t,e,n,i){if(t){const r=B(t,e,n,i);return t[0](r)}}function B(t,e,n,i){return t[1]&&i?z(n.ctx.slice(),t[1](i(e))):n.ctx}function ot(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(e.dirty.length,r.length);for(let s=0;s<c;s+=1)o[s]=e.dirty[s]|r[s];return o}return e.dirty|r}return e.dirty}function ft(t,e,n,i,r,o){if(r){const c=B(e,n,i,o);t.p(c,r)}}function at(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let E=!1;function I(){E=!0}function J(){E=!1}function K(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function R(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const u=[];for(let l=0;l<e.length;l++){const a=e[l];a.claim_order!==void 0&&u.push(a)}e=u}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let u=0;u<e.length;u++){const l=e[u].claim_order,a=(r>0&&e[n[r]].claim_order<=l?r+1:K(1,r,x=>e[n[x]].claim_order,l))-1;i[u]=n[a]+1;const f=a+1;n[f]=u,r=Math.max(f,r)}const o=[],c=[];let s=e.length-1;for(let u=n[r]+1;u!=0;u=i[u-1]){for(o.push(e[u-1]);s>=u;s--)c.push(e[s]);s--}for(;s>=0;s--)c.push(e[s]);o.reverse(),c.sort((u,l)=>u.claim_order-l.claim_order);for(let u=0,l=0;u<c.length;u++){for(;l<o.length&&c[u].claim_order>=o[l].claim_order;)l++;const a=l<o.length?o[l]:null;t.insertBefore(c[u],a)}}function W(t,e){if(E){for(R(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function dt(t,e,n){E&&!n?W(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Q(t){t.parentNode&&t.parentNode.removeChild(t)}function _t(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function U(t){return document.createElement(t)}function A(t){return document.createTextNode(t)}function ht(){return A(" ")}function mt(){return A("")}function pt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function yt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function V(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function H(t,e,n,i,r=!1){X(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const s=t[c];if(e(s)){const u=n(s);return u===void 0?t.splice(c,1):t[c]=u,r||(t.claim_info.last_index=c),s}}for(let c=t.claim_info.last_index-1;c>=0;c--){const s=t[c];if(e(s)){const u=n(s);return u===void 0?t.splice(c,1):t[c]=u,r?u===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,s}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Y(t,e,n,i){return H(t,r=>r.nodeName===e,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const s=r.attributes[c];n[s.name]||o.push(s.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(e))}function gt(t,e,n){return Y(t,e,n,U)}function Z(t,e){return H(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>A(e),!0)}function xt(t){return Z(t," ")}function bt(t,e){e=""+e,t.data!==e&&(t.data=e)}function $t(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Et(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(r)):o===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function wt(t,e){return new t(e)}let y;function p(t){y=t}function L(){if(!y)throw new Error("Function called outside component initialization");return y}function vt(t){L().$$.on_mount.push(t)}function Nt(t){L().$$.after_update.push(t)}const h=[],T=[];let m=[];const k=[],O=Promise.resolve();let v=!1;function P(){v||(v=!0,O.then(q))}function At(){return P(),O}function N(t){m.push(t)}const w=new Set;let _=0;function q(){if(_!==0)return;const t=y;do{try{for(;_<h.length;){const e=h[_];_++,p(e),tt(e.$$)}}catch(e){throw h.length=0,_=0,e}for(p(null),h.length=0,_=0;T.length;)T.pop()();for(let e=0;e<m.length;e+=1){const n=m[e];w.has(n)||(w.add(n),n())}m.length=0}while(h.length);for(;k.length;)k.pop()();v=!1,w.clear(),p(t)}function tt(t){if(t.fragment!==null){t.update(),g(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}function et(t){const e=[],n=[];m.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),m=e}const b=new Set;let d;function St(){d={r:0,c:[],p:d}}function jt(){d.r||g(d.c),d=d.p}function nt(t,e){t&&t.i&&(b.delete(t),t.i(e))}function Ct(t,e,n,i){if(t&&t.o){if(b.has(t))return;b.add(t),d.c.push(()=>{b.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Tt(t){t&&t.c()}function kt(t,e){t&&t.l(e)}function it(t,e,n,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),i||N(()=>{const c=t.$$.on_mount.map(D).filter(M);t.$$.on_destroy?t.$$.on_destroy.push(...c):g(c),t.$$.on_mount=[]}),o.forEach(N)}function rt(t,e){const n=t.$$;n.fragment!==null&&(et(n.after_update),g(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ct(t,e){t.$$.dirty[0]===-1&&(h.push(t),P(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Dt(t,e,n,i,r,o,c,s=[-1]){const u=y;p(t);const l=t.$$={fragment:null,ctx:[],props:o,update:$,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:C(),dirty:s,skip_bound:!1,root:e.target||u.$$.root};c&&c(l.root);let a=!1;if(l.ctx=n?n(t,e.props||{},(f,x,...S)=>{const j=S.length?S[0]:x;return l.ctx&&r(l.ctx[f],l.ctx[f]=j)&&(!l.skip_bound&&l.bound[f]&&l.bound[f](j),a&&ct(t,f)),x}):[],l.update(),a=!0,g(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){I();const f=V(e.target);l.fragment&&l.fragment.l(f),f.forEach(Q)}else l.fragment&&l.fragment.c();e.intro&&nt(t.$$.fragment),it(t,e.target,e.anchor,e.customElement),J(),q()}p(u)}class Mt{$destroy(){rt(this,1),this.$destroy=$}$on(e,n){if(!M(n))return $;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!F(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{it as A,rt as B,st as C,ft as D,at as E,ot as F,W as G,$ as H,lt as I,_t as J,Et as K,pt as L,Mt as S,ht as a,dt as b,xt as c,Ct as d,mt as e,jt as f,nt as g,Q as h,Dt as i,Nt as j,U as k,gt as l,V as m,yt as n,vt as o,$t as p,A as q,Z as r,ut as s,At as t,bt as u,St as v,T as w,wt as x,Tt as y,kt as z};
