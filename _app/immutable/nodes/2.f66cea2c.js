import{s as Ye,r as Qe,o as Xe,h as Je}from"../chunks/scheduler.2739a3c5.js";import{S as Ze,i as qe,g as k,s as P,e as W,h as A,x as q,c as F,j as $,f as _,k as E,D as ve,a as b,y as B,E as be,z as se,d as ne,t as ye,b as et,B as ue,C as xe,H as tt,F as st,p as nt,m as fe,n as de,o as pe}from"../chunks/index.2bd5a6d6.js";import{e as J,P as rt,f as Ee}from"../chunks/constants.14aebf06.js";import{b as Q}from"../chunks/paths.06052caa.js";import{m as it,n as ct}from"../chunks/index.194e901b.js";import{g as ot,m as lt}from"../chunks/marked.esm.489300bf.js";function G(n){return Array.isArray?Array.isArray(n):Ke(n)==="[object Array]"}const at=1/0;function ht(n){if(typeof n=="string")return n;let e=n+"";return e=="0"&&1/n==-at?"-0":e}function ut(n){return n==null?"":ht(n)}function V(n){return typeof n=="string"}function Fe(n){return typeof n=="number"}function ft(n){return n===!0||n===!1||dt(n)&&Ke(n)=="[object Boolean]"}function Ve(n){return typeof n=="object"}function dt(n){return Ve(n)&&n!==null}function D(n){return n!=null}function re(n){return!n.trim().length}function Ke(n){return n==null?n===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(n)}const pt="Incorrect 'index' type",gt=n=>`Invalid value for key ${n}`,_t=n=>`Pattern length exceeds max of ${n}.`,mt=n=>`Missing ${n} property in key`,Mt=n=>`Property 'weight' in key '${n}' must be a positive integer`,we=Object.prototype.hasOwnProperty;class vt{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(s=>{let r=He(s);t+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,t+=r.weight}),this._keys.forEach(s=>{s.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function He(n){let e=null,t=null,s=null,r=1,c=null;if(V(n)||G(n))s=n,e=Ie(n),t=ie(n);else{if(!we.call(n,"name"))throw new Error(mt("name"));const i=n.name;if(s=i,we.call(n,"weight")&&(r=n.weight,r<=0))throw new Error(Mt(i));e=Ie(i),t=ie(i),c=n.getFn}return{path:e,id:t,weight:r,src:s,getFn:c}}function Ie(n){return G(n)?n:n.split(".")}function ie(n){return G(n)?n.join("."):n}function bt(n,e){let t=[],s=!1;const r=(c,i,o)=>{if(D(c))if(!i[o])t.push(c);else{let l=i[o];const a=c[l];if(!D(a))return;if(o===i.length-1&&(V(a)||Fe(a)||ft(a)))t.push(ut(a));else if(G(a)){s=!0;for(let h=0,f=a.length;h<f;h+=1)r(a[h],i,o+1)}else i.length&&r(a,i,o+1)}};return r(n,V(e)?e.split("."):e,0),s?t:t[0]}const yt={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},xt={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(n,e)=>n.score===e.score?n.idx<e.idx?-1:1:n.score<e.score?-1:1},Et={location:0,threshold:.6,distance:100},wt={useExtendedSearch:!1,getFn:bt,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var p={...xt,...yt,...Et,...wt};const It=/[^ ]+/g;function kt(n=1,e=3){const t=new Map,s=Math.pow(10,e);return{get(r){const c=r.match(It).length;if(t.has(c))return t.get(c);const i=1/Math.pow(c,.5*n),o=parseFloat(Math.round(i*s)/s);return t.set(c,o),o},clear(){t.clear()}}}class ge{constructor({getFn:e=p.getFn,fieldNormWeight:t=p.fieldNormWeight}={}){this.norm=kt(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((t,s)=>{this._keysMap[t.id]=s})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,V(this.docs[0])?this.docs.forEach((e,t)=>{this._addString(e,t)}):this.docs.forEach((e,t)=>{this._addObject(e,t)}),this.norm.clear())}add(e){const t=this.size();V(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,s=this.size();t<s;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!D(e)||re(e))return;let s={v:e,i:t,n:this.norm.get(e)};this.records.push(s)}_addObject(e,t){let s={i:t,$:{}};this.keys.forEach((r,c)=>{let i=r.getFn?r.getFn(e):this.getFn(e,r.path);if(D(i)){if(G(i)){let o=[];const l=[{nestedArrIndex:-1,value:i}];for(;l.length;){const{nestedArrIndex:a,value:h}=l.pop();if(D(h))if(V(h)&&!re(h)){let f={v:h,i:a,n:this.norm.get(h)};o.push(f)}else G(h)&&h.forEach((f,d)=>{l.push({nestedArrIndex:d,value:f})})}s.$[c]=o}else if(V(i)&&!re(i)){let o={v:i,n:this.norm.get(i)};s.$[c]=o}}}),this.records.push(s)}toJSON(){return{keys:this.keys,records:this.records}}}function Ge(n,e,{getFn:t=p.getFn,fieldNormWeight:s=p.fieldNormWeight}={}){const r=new ge({getFn:t,fieldNormWeight:s});return r.setKeys(n.map(He)),r.setSources(e),r.create(),r}function At(n,{getFn:e=p.getFn,fieldNormWeight:t=p.fieldNormWeight}={}){const{keys:s,records:r}=n,c=new ge({getFn:e,fieldNormWeight:t});return c.setKeys(s),c.setIndexRecords(r),c}function ee(n,{errors:e=0,currentLocation:t=0,expectedLocation:s=0,distance:r=p.distance,ignoreLocation:c=p.ignoreLocation}={}){const i=e/n.length;if(c)return i;const o=Math.abs(s-t);return r?i+o/r:o?1:i}function St(n=[],e=p.minMatchCharLength){let t=[],s=-1,r=-1,c=0;for(let i=n.length;c<i;c+=1){let o=n[c];o&&s===-1?s=c:!o&&s!==-1&&(r=c-1,r-s+1>=e&&t.push([s,r]),s=-1)}return n[c-1]&&c-s>=e&&t.push([s,c-1]),t}const Y=32;function Lt(n,e,t,{location:s=p.location,distance:r=p.distance,threshold:c=p.threshold,findAllMatches:i=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,includeMatches:l=p.includeMatches,ignoreLocation:a=p.ignoreLocation}={}){if(e.length>Y)throw new Error(_t(Y));const h=e.length,f=n.length,d=Math.max(0,Math.min(s,f));let M=c,g=d;const x=o>1||l,w=x?Array(f):[];let y;for(;(y=n.indexOf(e,g))>-1;){let S=ee(e,{currentLocation:y,expectedLocation:d,distance:r,ignoreLocation:a});if(M=Math.min(S,M),g=y+h,x){let N=0;for(;N<h;)w[y+N]=1,N+=1}}g=-1;let R=[],C=1,T=h+f;const j=1<<h-1;for(let S=0;S<h;S+=1){let N=0,O=T;for(;N<O;)ee(e,{errors:S,currentLocation:d+O,expectedLocation:d,distance:r,ignoreLocation:a})<=M?N=O:T=O,O=Math.floor((T-N)/2+N);T=O;let K=Math.max(1,d-O+1),U=i?f:Math.min(d+O,f)+h,H=Array(U+2);H[U+1]=(1<<S)-1;for(let m=U;m>=K;m-=1){let I=m-1,u=t[n.charAt(I)];if(x&&(w[I]=+!!u),H[m]=(H[m+1]<<1|1)&u,S&&(H[m]|=(R[m+1]|R[m])<<1|1|R[m+1]),H[m]&j&&(C=ee(e,{errors:S,currentLocation:I,expectedLocation:d,distance:r,ignoreLocation:a}),C<=M)){if(M=C,g=I,g<=d)break;K=Math.max(1,2*d-g)}}if(ee(e,{errors:S+1,currentLocation:d,expectedLocation:d,distance:r,ignoreLocation:a})>M)break;R=H}const X={isMatch:g>=0,score:Math.max(.001,C)};if(x){const S=St(w,o);S.length?l&&(X.indices=S):X.isMatch=!1}return X}function Ct(n){let e={};for(let t=0,s=n.length;t<s;t+=1){const r=n.charAt(t);e[r]=(e[r]||0)|1<<s-t-1}return e}class Be{constructor(e,{location:t=p.location,threshold:s=p.threshold,distance:r=p.distance,includeMatches:c=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,isCaseSensitive:l=p.isCaseSensitive,ignoreLocation:a=p.ignoreLocation}={}){if(this.options={location:t,threshold:s,distance:r,includeMatches:c,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:a},this.pattern=l?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const h=(d,M)=>{this.chunks.push({pattern:d,alphabet:Ct(d),startIndex:M})},f=this.pattern.length;if(f>Y){let d=0;const M=f%Y,g=f-M;for(;d<g;)h(this.pattern.substr(d,Y),d),d+=Y;if(M){const x=f-Y;h(this.pattern.substr(x),x)}}else h(this.pattern,0)}searchIn(e){const{isCaseSensitive:t,includeMatches:s}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let g={isMatch:!0,score:0};return s&&(g.indices=[[0,e.length-1]]),g}const{location:r,distance:c,threshold:i,findAllMatches:o,minMatchCharLength:l,ignoreLocation:a}=this.options;let h=[],f=0,d=!1;this.chunks.forEach(({pattern:g,alphabet:x,startIndex:w})=>{const{isMatch:y,score:R,indices:C}=Lt(e,g,x,{location:r+w,distance:c,threshold:i,findAllMatches:o,minMatchCharLength:l,includeMatches:s,ignoreLocation:a});y&&(d=!0),f+=R,y&&C&&(h=[...h,...C])});let M={isMatch:d,score:d?f/this.chunks.length:1};return d&&s&&(M.indices=h),M}}class z{constructor(e){this.pattern=e}static isMultiMatch(e){return ke(e,this.multiRegex)}static isSingleMatch(e){return ke(e,this.singleRegex)}search(){}}function ke(n,e){const t=n.match(e);return t?t[1]:null}class Rt extends z{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}}class Nt extends z{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const s=e.indexOf(this.pattern)===-1;return{isMatch:s,score:s?0:1,indices:[0,e.length-1]}}}class Tt extends z{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}}class Ot extends z{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}}class Dt extends z{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}}class $t extends z{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}}class We extends z{constructor(e,{location:t=p.location,threshold:s=p.threshold,distance:r=p.distance,includeMatches:c=p.includeMatches,findAllMatches:i=p.findAllMatches,minMatchCharLength:o=p.minMatchCharLength,isCaseSensitive:l=p.isCaseSensitive,ignoreLocation:a=p.ignoreLocation}={}){super(e),this._bitapSearch=new Be(e,{location:t,threshold:s,distance:r,includeMatches:c,findAllMatches:i,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:a})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class ze extends z{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t=0,s;const r=[],c=this.pattern.length;for(;(s=e.indexOf(this.pattern,t))>-1;)t=s+c,r.push([s,t-1]);const i=!!r.length;return{isMatch:i,score:i?0:1,indices:r}}}const ce=[Rt,ze,Tt,Ot,$t,Dt,Nt,We],Ae=ce.length,jt=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,Pt="|";function Ft(n,e={}){return n.split(Pt).map(t=>{let s=t.trim().split(jt).filter(c=>c&&!!c.trim()),r=[];for(let c=0,i=s.length;c<i;c+=1){const o=s[c];let l=!1,a=-1;for(;!l&&++a<Ae;){const h=ce[a];let f=h.isMultiMatch(o);f&&(r.push(new h(f,e)),l=!0)}if(!l)for(a=-1;++a<Ae;){const h=ce[a];let f=h.isSingleMatch(o);if(f){r.push(new h(f,e));break}}}return r})}const Vt=new Set([We.type,ze.type]);class Kt{constructor(e,{isCaseSensitive:t=p.isCaseSensitive,includeMatches:s=p.includeMatches,minMatchCharLength:r=p.minMatchCharLength,ignoreLocation:c=p.ignoreLocation,findAllMatches:i=p.findAllMatches,location:o=p.location,threshold:l=p.threshold,distance:a=p.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:s,minMatchCharLength:r,findAllMatches:i,ignoreLocation:c,location:o,threshold:l,distance:a},this.pattern=t?e:e.toLowerCase(),this.query=Ft(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){const t=this.query;if(!t)return{isMatch:!1,score:1};const{includeMatches:s,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let c=0,i=[],o=0;for(let l=0,a=t.length;l<a;l+=1){const h=t[l];i.length=0,c=0;for(let f=0,d=h.length;f<d;f+=1){const M=h[f],{isMatch:g,indices:x,score:w}=M.search(e);if(g){if(c+=1,o+=w,s){const y=M.constructor.type;Vt.has(y)?i=[...i,...x]:i.push(x)}}else{o=0,c=0,i.length=0;break}}if(c){let f={isMatch:!0,score:o/c};return s&&(f.indices=i),f}}return{isMatch:!1,score:1}}}const oe=[];function Ht(...n){oe.push(...n)}function le(n,e){for(let t=0,s=oe.length;t<s;t+=1){let r=oe[t];if(r.condition(n,e))return new r(n,e)}return new Be(n,e)}const te={AND:"$and",OR:"$or"},ae={PATH:"$path",PATTERN:"$val"},he=n=>!!(n[te.AND]||n[te.OR]),Gt=n=>!!n[ae.PATH],Bt=n=>!G(n)&&Ve(n)&&!he(n),Se=n=>({[te.AND]:Object.keys(n).map(e=>({[e]:n[e]}))});function Ue(n,e,{auto:t=!0}={}){const s=r=>{let c=Object.keys(r);const i=Gt(r);if(!i&&c.length>1&&!he(r))return s(Se(r));if(Bt(r)){const l=i?r[ae.PATH]:c[0],a=i?r[ae.PATTERN]:r[l];if(!V(a))throw new Error(gt(l));const h={keyId:ie(l),pattern:a};return t&&(h.searcher=le(a,e)),h}let o={children:[],operator:c[0]};return c.forEach(l=>{const a=r[l];G(a)&&a.forEach(h=>{o.children.push(s(h))})}),o};return he(n)||(n=Se(n)),s(n)}function Wt(n,{ignoreFieldNorm:e=p.ignoreFieldNorm}){n.forEach(t=>{let s=1;t.matches.forEach(({key:r,norm:c,score:i})=>{const o=r?r.weight:null;s*=Math.pow(i===0&&o?Number.EPSILON:i,(o||1)*(e?1:c))}),t.score=s})}function zt(n,e){const t=n.matches;e.matches=[],D(t)&&t.forEach(s=>{if(!D(s.indices)||!s.indices.length)return;const{indices:r,value:c}=s;let i={indices:r,value:c};s.key&&(i.key=s.key.src),s.idx>-1&&(i.refIndex=s.idx),e.matches.push(i)})}function Ut(n,e){e.score=n.score}function Yt(n,e,{includeMatches:t=p.includeMatches,includeScore:s=p.includeScore}={}){const r=[];return t&&r.push(zt),s&&r.push(Ut),n.map(c=>{const{idx:i}=c,o={item:e[i],refIndex:i};return r.length&&r.forEach(l=>{l(c,o)}),o})}class Z{constructor(e,t={},s){this.options={...p,...t},this.options.useExtendedSearch,this._keyStore=new vt(this.options.keys),this.setCollection(e,s)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof ge))throw new Error(pt);this._myIndex=t||Ge(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){D(e)&&(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){const t=[];for(let s=0,r=this._docs.length;s<r;s+=1){const c=this._docs[s];e(c,s)&&(this.removeAt(s),s-=1,r-=1,t.push(c))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){const{includeMatches:s,includeScore:r,shouldSort:c,sortFn:i,ignoreFieldNorm:o}=this.options;let l=V(e)?V(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return Wt(l,{ignoreFieldNorm:o}),c&&l.sort(i),Fe(t)&&t>-1&&(l=l.slice(0,t)),Yt(l,this._docs,{includeMatches:s,includeScore:r})}_searchStringList(e){const t=le(e,this.options),{records:s}=this._myIndex,r=[];return s.forEach(({v:c,i,n:o})=>{if(!D(c))return;const{isMatch:l,score:a,indices:h}=t.searchIn(c);l&&r.push({item:c,idx:i,matches:[{score:a,value:c,norm:o,indices:h}]})}),r}_searchLogical(e){const t=Ue(e,this.options),s=(o,l,a)=>{if(!o.children){const{keyId:f,searcher:d}=o,M=this._findMatches({key:this._keyStore.get(f),value:this._myIndex.getValueForItemAtKeyId(l,f),searcher:d});return M&&M.length?[{idx:a,item:l,matches:M}]:[]}const h=[];for(let f=0,d=o.children.length;f<d;f+=1){const M=o.children[f],g=s(M,l,a);if(g.length)h.push(...g);else if(o.operator===te.AND)return[]}return h},r=this._myIndex.records,c={},i=[];return r.forEach(({$:o,i:l})=>{if(D(o)){let a=s(t,o,l);a.length&&(c[l]||(c[l]={idx:l,item:o,matches:[]},i.push(c[l])),a.forEach(({matches:h})=>{c[l].matches.push(...h)}))}}),i}_searchObjectList(e){const t=le(e,this.options),{keys:s,records:r}=this._myIndex,c=[];return r.forEach(({$:i,i:o})=>{if(!D(i))return;let l=[];s.forEach((a,h)=>{l.push(...this._findMatches({key:a,value:i[h],searcher:t}))}),l.length&&c.push({idx:o,item:i,matches:l})}),c}_findMatches({key:e,value:t,searcher:s}){if(!D(t))return[];let r=[];if(G(t))t.forEach(({v:c,i,n:o})=>{if(!D(c))return;const{isMatch:l,score:a,indices:h}=s.searchIn(c);l&&r.push({score:a,key:e,value:c,idx:i,norm:o,indices:h})});else{const{v:c,n:i}=t,{isMatch:o,score:l,indices:a}=s.searchIn(c);o&&r.push({score:l,key:e,value:c,norm:i,indices:a})}return r}}Z.version="6.6.2";Z.createIndex=Ge;Z.parseIndex=At;Z.config=p;Z.parseQuery=Ue;Ht(Kt);function Le(n,e,t){const s=n.slice();return s[11]=e[t],s}function Ce(n,e,t){const s=n.slice();return s[14]=e[t],s}function Re(n,e,t){const s=n.slice();return s[17]=e[t],s}function Ne(n){let e,t=J(n[2]),s=[];for(let r=0;r<t.length;r+=1)s[r]=Oe(Ce(n,t,r));return{c(){for(let r=0;r<s.length;r+=1)s[r].c();e=W()},l(r){for(let c=0;c<s.length;c+=1)s[c].l(r);e=W()},m(r,c){for(let i=0;i<s.length;i+=1)s[i]&&s[i].m(r,c);b(r,e,c)},p(r,c){if(c&12){t=J(r[2]);let i;for(i=0;i<t.length;i+=1){const o=Ce(r,t,i);s[i]?s[i].p(o,c):(s[i]=Oe(o),s[i].c(),s[i].m(e.parentNode,e))}for(;i<s.length;i+=1)s[i].d(1);s.length=t.length}},d(r){r&&_(e),ue(s,r)}}}function Qt(n){let e=n[17]+"",t;return{c(){t=fe(e)},l(s){t=de(s,e)},m(s,r){b(s,t,r)},p(s,r){r&4&&e!==(e=s[17]+"")&&pe(t,e)},d(s){s&&_(t)}}}function Xt(n){let e,t=n[17]+"",s;return{c(){e=k("span"),s=fe(t),this.h()},l(r){e=A(r,"SPAN",{class:!0});var c=$(e);s=de(c,t),c.forEach(_),this.h()},h(){E(e,"class","text-info")},m(r,c){b(r,e,c),B(e,s)},p(r,c){c&4&&t!==(t=r[17]+"")&&pe(s,t)},d(r){r&&_(e)}}}function Te(n){let e,t;function s(i,o){return o&12&&(e=null),e==null&&(e=!!i[3].toLowerCase().includes(i[17].toLowerCase())),e?Xt:Qt}let r=s(n,-1),c=r(n);return{c(){c.c(),t=W()},l(i){c.l(i),t=W()},m(i,o){c.m(i,o),b(i,t,o)},p(i,o){r===(r=s(i,o))&&c?c.p(i,o):(c.d(1),c=r(i),c&&(c.c(),c.m(t.parentNode,t)))},d(i){i&&_(t),c.d(i)}}}function Oe(n){let e,t,s,r,c=J(n[14].item.dbName),i=[];for(let o=0;o<c.length;o+=1)i[o]=Te(Re(n,c,o));return{c(){e=k("div"),t=k("a");for(let o=0;o<i.length;o+=1)i[o].c();r=P(),this.h()},l(o){e=A(o,"DIV",{class:!0});var l=$(e);t=A(l,"A",{href:!0});var a=$(t);for(let h=0;h<i.length;h+=1)i[h].l(a);a.forEach(_),r=F(l),l.forEach(_),this.h()},h(){E(t,"href",s=Q+"/"+n[14].item.url),E(e,"class","flex justify-center")},m(o,l){b(o,e,l),B(e,t);for(let a=0;a<i.length;a+=1)i[a]&&i[a].m(t,null);B(e,r)},p(o,l){if(l&12){c=J(o[14].item.dbName);let a;for(a=0;a<c.length;a+=1){const h=Re(o,c,a);i[a]?i[a].p(h,l):(i[a]=Te(h),i[a].c(),i[a].m(t,null))}for(;a<i.length;a+=1)i[a].d(1);i.length=c.length}l&4&&s!==(s=Q+"/"+o[14].item.url)&&E(t,"href",s)},d(o){o&&_(e),ue(i,o)}}}function De(n){let e,t,s,r=J(n[0].knowledgeGraphs),c=[];for(let i=0;i<r.length;i+=1)c[i]=je(Le(n,r,i));return{c(){e=k("div");for(let i=0;i<c.length;i+=1)c[i].c();this.h()},l(i){e=A(i,"DIV",{class:!0});var o=$(e);for(let l=0;l<c.length;l+=1)c[l].l(o);o.forEach(_),this.h()},h(){E(e,"class","flex justify-center space-x-4")},m(i,o){b(i,e,o);for(let l=0;l<c.length;l+=1)c[l]&&c[l].m(e,null);s=!0},p(i,o){if(o&1){r=J(i[0].knowledgeGraphs);let l;for(l=0;l<r.length;l+=1){const a=Le(i,r,l);c[l]?c[l].p(a,o):(c[l]=je(a),c[l].c(),c[l].m(e,null))}for(;l<c.length;l+=1)c[l].d(1);c.length=r.length}},i(i){s||(i&&Je(()=>{s&&(t||(t=xe(e,Ee,{},!0)),t.run(1))}),s=!0)},o(i){i&&(t||(t=xe(e,Ee,{},!1)),t.run(0)),s=!1},d(i){i&&_(e),ue(c,i),i&&t&&t.end()}}}function $e(n){let e,t=n[11]+"",s,r;return{c(){e=k("a"),s=fe(t),this.h()},l(c){e=A(c,"A",{href:!0});var i=$(e);s=de(i,t),i.forEach(_),this.h()},h(){E(e,"href",r=Q+"/datasets/"+n[11].toLowerCase())},m(c,i){b(c,e,i),B(e,s)},p(c,i){i&1&&t!==(t=c[11]+"")&&pe(s,t),i&1&&r!==(r=Q+"/datasets/"+c[11].toLowerCase())&&E(e,"href",r)},d(c){c&&_(e)}}}function je(n){let e,t=n[11]&&$e(n);return{c(){t&&t.c(),e=W()},l(s){t&&t.l(s),e=W()},m(s,r){t&&t.m(s,r),b(s,e,r)},p(s,r){s[11]?t?t.p(s,r):(t=$e(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(s){s&&_(e),t&&t.d(s)}}}function Pe(n){let e,t,s;return{c(){e=k("div"),t=k("div"),s=new tt(!1),this.h()},l(r){e=A(r,"DIV",{class:!0});var c=$(e);t=A(c,"DIV",{class:!0});var i=$(t);s=st(i,!1),i.forEach(_),c.forEach(_),this.h()},h(){s.a=null,E(t,"class","prose text-justify mx-auto w-[95%]"),E(e,"class","flex justify-center")},m(r,c){b(r,e,c),B(e,t),s.m(n[1],t)},p(r,c){c&2&&s.p(r[1])},d(r){r&&_(e)}}}function Jt(n){let e,t=`<img src="${Q}/logo-min.png" alt="The wisest koala" class="w-64 my-auto"/>`,s,r,c="KGQA Leaderboard",i,o,l,a="Copy Citation",h,f,d,M,g,x,w,y,R="Or select Knowledge Graph from the list below",C,T,j,X=`<a class="" href="${Q+"/systems"}">Systems</a>`,S,N,O,K,U,H,L=n[2]&&Ne(n),m=n[0]&&De(n),I=n[1]&&Pe(n);return{c(){e=k("div"),e.innerHTML=t,s=P(),r=k("div"),r.textContent=c,i=P(),o=k("div"),l=k("button"),l.textContent=a,h=P(),f=k("div"),d=k("input"),M=P(),g=k("div"),x=k("div"),L&&L.c(),w=P(),y=k("div"),y.textContent=R,C=P(),m&&m.c(),T=P(),j=k("div"),j.innerHTML=X,S=P(),N=k("div"),O=P(),I&&I.c(),K=W(),this.h()},l(u){e=A(u,"DIV",{class:!0,"data-svelte-h":!0}),q(e)!=="svelte-8ha45"&&(e.innerHTML=t),s=F(u),r=A(u,"DIV",{class:!0,"data-svelte-h":!0}),q(r)!=="svelte-2bv6n2"&&(r.textContent=c),i=F(u),o=A(u,"DIV",{class:!0});var v=$(o);l=A(v,"BUTTON",{id:!0,class:!0,"data-svelte-h":!0}),q(l)!=="svelte-6clxnd"&&(l.textContent=a),v.forEach(_),h=F(u),f=A(u,"DIV",{class:!0});var _e=$(f);d=A(_e,"INPUT",{type:!0,class:!0,placeholder:!0,name:!0,id:!0}),_e.forEach(_),M=F(u),g=A(u,"DIV",{class:!0});var me=$(g);x=A(me,"DIV",{});var Me=$(x);L&&L.l(Me),Me.forEach(_),me.forEach(_),w=F(u),y=A(u,"DIV",{class:!0,"data-svelte-h":!0}),q(y)!=="svelte-hrt7vc"&&(y.textContent=R),C=F(u),m&&m.l(u),T=F(u),j=A(u,"DIV",{class:!0,"data-svelte-h":!0}),q(j)!=="svelte-4na04n"&&(j.innerHTML=X),S=F(u),N=A(u,"DIV",{class:!0}),$(N).forEach(_),O=F(u),I&&I.l(u),K=W(),this.h()},h(){E(e,"class","flex justify-center mt-12"),E(r,"class","text-center mt-4 text-5xl"),E(l,"id","copy-citation-button"),E(l,"class","btn btn-secondary btn-sm btn-wide mb-12"),E(o,"class","flex justify-center"),E(d,"type","text"),E(d,"class","input input-primary input-sm md:w-[25%] w-[400px]"),E(d,"placeholder","🔎 Search Datasets"),E(d,"name","filter"),E(d,"id","filter"),E(f,"class","flex justify-center mt-[3rem]"),E(g,"class","flex justify-center my-2 border border-opacity-10 border-accent w-[70%] mx-auto rounded-xl"),ve(g,"hidden",!n[2]||n[2].length===0),E(y,"class","w-[70%] mx-auto divider mt-[2rem]"),E(j,"class","flex justify-center my-2"),E(N,"class","my-10")},m(u,v){b(u,e,v),b(u,s,v),b(u,r,v),b(u,i,v),b(u,o,v),B(o,l),b(u,h,v),b(u,f,v),B(f,d),be(d,n[3]),b(u,M,v),b(u,g,v),B(g,x),L&&L.m(x,null),b(u,w,v),b(u,y,v),b(u,C,v),m&&m.m(u,v),b(u,T,v),b(u,j,v),b(u,S,v),b(u,N,v),b(u,O,v),I&&I.m(u,v),b(u,K,v),U||(H=[se(l,"click",n[5]),se(d,"input",n[4]),se(d,"input",n[6])],U=!0)},p(u,[v]){v&8&&d.value!==u[3]&&be(d,u[3]),u[2]?L?L.p(u,v):(L=Ne(u),L.c(),L.m(x,null)):L&&(L.d(1),L=null),v&4&&ve(g,"hidden",!u[2]||u[2].length===0),u[0]?m?(m.p(u,v),v&1&&ne(m,1)):(m=De(u),m.c(),ne(m,1),m.m(T.parentNode,T)):m&&(nt(),ye(m,1,1,()=>{m=null}),et()),u[1]?I?I.p(u,v):(I=Pe(u),I.c(),I.m(K.parentNode,K)):I&&(I.d(1),I=null)},i(u){ne(m)},o(u){ye(m)},d(u){u&&(_(e),_(s),_(r),_(i),_(o),_(h),_(f),_(M),_(g),_(w),_(y),_(C),_(T),_(j),_(S),_(N),_(O),_(K)),L&&L.d(),m&&m.d(u),I&&I.d(u),U=!1,Qe(H)}}}function Zt(n,e,t){let s,r,c=[],i,o;async function l(){try{const g=ot(rt,"README.md"),w=await(await fetch(g)).text(),y=it(w),R=lt.parse(y.content,{mangle:!1,headerIds:!1});return{prefaceData:{knowledgeGraphs:y.data.knowledgeGraphs},content:R}}catch(g){throw new Error(`Failed to load, error ${g}`)}}Xe(async()=>{const g=await l();t(0,s=g.prefaceData),t(1,r=g.content);const x=await fetch(Q+"/entries.txt");let w=[];x.ok&&(w=(await x.text()).split(`
`));for(let y=0;y<w.length;y++){let R=w[y].slice(1),C=R.split("/"),T=C[C.length-1];T&&R&&c.push({dbName:T,url:R})}i=new Z(c,a)});const a={minMatchCharLength:1,location:0,threshold:.1,keys:["dbName"]};function h(g){const w=g.target.value;w?t(2,o=i.search(w)):t(2,o=[])}let f="";const d=()=>{let g="[Knowledge Graph Question Answering Leaderboard: A Community Resource to Prevent a Replication Crisis](https://aclanthology.org/2022.lrec-1.321) (Perevalov et al., LREC 2022)";navigator.clipboard.writeText(g),ct("Copied!","Citation copied to clipboard")};function M(){f=this.value,t(3,f)}return[s,r,o,f,h,d,M]}class is extends Ze{constructor(e){super(),qe(this,e,Zt,Jt,Ye,{})}}export{is as component};
