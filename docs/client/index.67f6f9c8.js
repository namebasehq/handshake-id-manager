import{S as t,i as e,s as n,c as a,a as r,e as s,b as o,d as i,f as l,g as c,t as u,h as $,l as m,u as f,j as d,k as h,m as g,n as p,o as v,p as w,q as x,r as b,v as y,w as C,x as k,y as E,z as N,A as H,B as I,C as V,D as j,E as D,F as L,G as S,H as F,I as T,J as P,K as U,L as O,M as A,N as _,O as M,P as R,Q as Y,R as B,T as Z}from"./client.5767e46d.js";function z(t){let e,n,p,v,w;const x=t[4].default,b=a(x,t,t[3],null);let y=[{class:n=t[2].class},t[2]],C={};for(let t=0;t<y.length;t+=1)C=r(C,y[t]);return{c(){e=s("div"),b&&b.c(),this.h()},l(t){e=o(t,"DIV",{class:!0});var n=i(e);b&&b.l(n),n.forEach(l),this.h()},h(){c(e,C),u(e,"svelte-txlu0g",!0)},m(n,a){$(n,e,a),b&&b.m(e,null),p=!0,v||(w=m(e,"click",t[5]),v=!0)},p(t,[a]){b&&b.p&&8&a&&f(b,x,t,t[3],a,null,null),c(e,C=d(y,[(!p||4&a&&n!==(n=t[2].class))&&{class:n},4&a&&t[2]])),u(e,"svelte-txlu0g",!0)},i(t){p||(h(b,t),p=!0)},o(t){g(b,t),p=!1},d(t){t&&l(e),b&&b.d(t),v=!1,w()}}}function J(t,e,n){let{$$slots:a={},$$scope:s}=e;const{goto:o}=p("router");let{to:i}=e;return t.$$set=t=>{n(2,e=r(r({},e),v(t))),"to"in t&&n(0,i=t.to),"$$scope"in t&&n(3,s=t.$$scope)},e=v(e),[i,o,e,s,a,()=>o(i)]}class q extends t{constructor(t){super(),e(this,t,J,z,n,{to:0})}}function K(t){let e;const n=t[4].default,r=a(n,t,t[3],null);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,n){r&&r.m(t,n),e=!0},p(t,e){r&&r.p&&8&e&&f(r,n,t,t[3],e,null,null)},i(t){e||(h(r,t),e=!0)},o(t){g(r,t),e=!1},d(t){r&&r.d(t)}}}function X(t){let e,n,a=t[0].substring(1)===t[1],r=a&&K(t);return{c(){r&&r.c(),e=w()},l(t){r&&r.l(t),e=w()},m(t,a){r&&r.m(t,a),$(t,e,a),n=!0},p(t,[n]){3&n&&(a=t[0].substring(1)===t[1]),a?r?(r.p(t,n),3&n&&h(r,1)):(r=K(t),r.c(),h(r,1),r.m(e.parentNode,e)):r&&(x(),g(r,1,1,(()=>{r=null})),b())},i(t){n||(h(r),n=!0)},o(t){g(r),n=!1},d(t){r&&r.d(t),t&&l(e)}}}function G(t,e,n){let a,{$$slots:r={},$$scope:s}=e;const{path:o}=p("router");y(t,o,(t=>n(1,a=t)));let{path:i}=e;return t.$$set=t=>{"path"in t&&n(0,i=t.path),"$$scope"in t&&n(3,s=t.$$scope)},[i,a,o,s,r]}class Q extends t{constructor(t){super(),e(this,t,G,X,n,{path:0})}}
/*! https://mths.be/punycode v1.4.1 by @mathias */var W=2147483647,tt=/^xn--/,et=/[^\x20-\x7E]/,nt=/[\x2E\u3002\uFF0E\uFF61]/g,at={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},rt=Math.floor,st=String.fromCharCode;function ot(t){throw new RangeError(at[t])}function it(t,e){for(var n=t.length,a=[];n--;)a[n]=e(t[n]);return a}function lt(t,e){var n=t.split("@"),a="";return n.length>1&&(a=n[0]+"@",t=n[1]),a+it((t=t.replace(nt,".")).split("."),e).join(".")}function ct(t){for(var e,n,a=[],r=0,s=t.length;r<s;)(e=t.charCodeAt(r++))>=55296&&e<=56319&&r<s?56320==(64512&(n=t.charCodeAt(r++)))?a.push(((1023&e)<<10)+(1023&n)+65536):(a.push(e),r--):a.push(e);return a}function ut(t){return it(t,(function(t){var e="";return t>65535&&(e+=st((t-=65536)>>>10&1023|55296),t=56320|1023&t),e+=st(t)})).join("")}function $t(t,e){return t+22+75*(t<26)-((0!=e)<<5)}function mt(t,e,n){var a=0;for(t=n?rt(t/700):t>>1,t+=rt(t/e);t>455;a+=36)t=rt(t/35);return rt(a+36*t/(t+38))}function ft(t){var e,n,a,r,s,o,i,l,c,u,$,m=[],f=t.length,d=0,h=128,g=72;for((n=t.lastIndexOf("-"))<0&&(n=0),a=0;a<n;++a)t.charCodeAt(a)>=128&&ot("not-basic"),m.push(t.charCodeAt(a));for(r=n>0?n+1:0;r<f;){for(s=d,o=1,i=36;r>=f&&ot("invalid-input"),((l=($=t.charCodeAt(r++))-48<10?$-22:$-65<26?$-65:$-97<26?$-97:36)>=36||l>rt((W-d)/o))&&ot("overflow"),d+=l*o,!(l<(c=i<=g?1:i>=g+26?26:i-g));i+=36)o>rt(W/(u=36-c))&&ot("overflow"),o*=u;g=mt(d-s,e=m.length+1,0==s),rt(d/e)>W-h&&ot("overflow"),h+=rt(d/e),d%=e,m.splice(d++,0,h)}return ut(m)}function dt(t){var e,n,a,r,s,o,i,l,c,u,$,m,f,d,h,g=[];for(m=(t=ct(t)).length,e=128,n=0,s=72,o=0;o<m;++o)($=t[o])<128&&g.push(st($));for(a=r=g.length,r&&g.push("-");a<m;){for(i=W,o=0;o<m;++o)($=t[o])>=e&&$<i&&(i=$);for(i-e>rt((W-n)/(f=a+1))&&ot("overflow"),n+=(i-e)*f,e=i,o=0;o<m;++o)if(($=t[o])<e&&++n>W&&ot("overflow"),$==e){for(l=n,c=36;!(l<(u=c<=s?1:c>=s+26?26:c-s));c+=36)h=l-u,d=36-u,g.push(st($t(u+h%d,0))),l=rt(h/d);g.push(st($t(l,0))),s=mt(n,f,a==r),n=0,++a}++n,++e}return g.join("")}var ht={version:"1.4.1",ucs2:{decode:ct,encode:ut},toASCII:function(t){return lt(t,(function(t){return et.test(t)?"xn--"+dt(t):t}))},toUnicode:function(t){return lt(t,(function(t){return tt.test(t)?ft(t.slice(4).toLowerCase()):t}))},encode:dt,decode:ft};function gt(t){let e,n=pt(t[0])+"";return{c(){e=C(n)},l(t){e=k(t,n)},m(t,n){$(t,e,n)},p(t,[a]){1&a&&n!==(n=pt(t[0])+"")&&E(e,n)},i:N,o:N,d(t){t&&l(e)}}}const pt=(t="")=>{const e=[];let n=!1;return t.split(".").forEach((t=>{try{const a=ht.toUnicode(t);t!==a?(n=!0,e.push(a)):e.push(t)}catch(n){e.push(t)}})),n?`${t}/ (${e.join(".")})`:`${t}/`};function vt(t,e,n){let{domainName:a}=e;return t.$$set=t=>{"domainName"in t&&n(0,a=t.domainName)},[a]}class wt extends t{constructor(t){super(),e(this,t,vt,gt,n,{domainName:0})}}function xt(t){let e,n,p,v,w;const x=t[8].default,b=a(x,t,t[7],null);let y=[{class:n=t[4].class+" "+t[0]+" "+t[1].classNames+" text-roboto-variable text-variant-small text-weight-medium"},t[4]],C={};for(let t=0;t<y.length;t+=1)C=r(C,y[t]);return{c(){e=s("button"),b&&b.c(),this.h()},l(t){e=o(t,"BUTTON",{class:!0});var n=i(e);b&&b.l(n),n.forEach(l),this.h()},h(){c(e,C),u(e,"svelte-v3459l",!0)},m(n,a){$(n,e,a),b&&b.m(e,null),p=!0,v||(w=m(e,"click",t[3]),v=!0)},p(t,[a]){b&&b.p&&128&a&&f(b,x,t,t[7],a,null,null),c(e,C=d(y,[(!p||19&a&&n!==(n=t[4].class+" "+t[0]+" "+t[1].classNames+" text-roboto-variable text-variant-small text-weight-medium"))&&{class:n},16&a&&t[4]])),u(e,"svelte-v3459l",!0)},i(t){p||(h(b,t),p=!0)},o(t){g(b,t),p=!1},d(t){t&&l(e),b&&b.d(t),v=!1,w()}}}function bt(t,e,n){let a,{$$slots:s={},$$scope:o}=e;const{media:i}=p("media");y(t,i,(t=>n(1,a=t)));let l,{variant:c}=e,{onClick:u}=e;"primary"===c?l="button-variant-primary":"transparent"===c?l="button-variant-transparent":"secondary"===c&&(l="button-variant-secondary");return t.$$set=t=>{n(4,e=r(r({},e),v(t))),"variant"in t&&n(5,c=t.variant),"onClick"in t&&n(6,u=t.onClick),"$$scope"in t&&n(7,o=t.$$scope)},e=v(e),[l,a,i,()=>u(),e,c,u,o,s]}class yt extends t{constructor(t){super(),e(this,t,bt,xt,n,{variant:5,onClick:6})}}function Ct(t){let e,n;return{c(){e=s("div"),n=C("One moment please..."),this.h()},l(t){e=o(t,"DIV",{class:!0});var a=i(e);n=k(a,"One moment please..."),a.forEach(l),this.h()},h(){D(e,"class","text-roboto-mono text-variant-medium text-weight-medium svelte-1judthm")},m(t,a){$(t,e,a),S(e,n)},p:N,i:N,o:N,d(t){t&&l(e)}}}function kt(t){let e,n,a,r,c,u,m,f;return{c(){e=s("div"),n=C("Your record might be cached. "),a=s("br"),r=C("\r\n      Please wait up to 1 minute or you can "),c=s("br"),u=H(),m=s("a"),f=C("recreate your identity here."),this.h()},l(t){e=o(t,"DIV",{class:!0});var s=i(e);n=k(s,"Your record might be cached. "),a=o(s,"BR",{}),r=k(s,"\r\n      Please wait up to 1 minute or you can "),c=o(s,"BR",{}),u=V(s),m=o(s,"A",{href:!0,class:!0});var $=i(m);f=k($,"recreate your identity here."),$.forEach(l),s.forEach(l),this.h()},h(){D(m,"href","/#/create/confirm"),D(m,"class","svelte-1judthm"),D(e,"class","text-roboto-mono text-variant-medium text-weight-medium svelte-1judthm")},m(t,s){$(t,e,s),S(e,n),S(e,a),S(e,r),S(e,c),S(e,u),S(e,m),S(m,f)},p:N,i:N,o:N,d(t){t&&l(e)}}}function Et(t){let e,n,a,r;return n=new yt({props:{variant:"primary",onClick:t[6],$$slots:{default:[Nt]},$$scope:{ctx:t}}}),{c(){e=s("div"),I(n.$$.fragment),this.h()},l(t){e=o(t,"DIV",{class:!0});var a=i(e);j(n.$$.fragment,a),a.forEach(l),this.h()},h(){D(e,"class",a="confirm "+t[3].classNames+" svelte-1judthm")},m(t,a){$(t,e,a),F(n,e,null),r=!0},p(t,s){const o={};4096&s&&(o.$$scope={dirty:s,ctx:t}),n.$set(o),(!r||8&s&&a!==(a="confirm "+t[3].classNames+" svelte-1judthm"))&&D(e,"class",a)},i(t){r||(h(n.$$.fragment,t),r=!0)},o(t){g(n.$$.fragment,t),r=!1},d(t){t&&l(e),T(n)}}}function Nt(t){let e;return{c(){e=C("Continue")},l(t){e=k(t,"Continue")},m(t,n){$(t,e,n)},d(t){t&&l(e)}}}function Ht(t){let e,n,a,r,c,u,m,f,d,p,v;u=new wt({props:{domainName:t[2].id}});const w=[Et,kt,Ct],y=[];function E(t,e){return t[0]?!0===t[1]?1:2:0}return d=E(t),p=y[d]=w[d](t),{c(){e=s("h1"),n=C("Log in"),a=H(),r=s("h2"),c=C("Your Handshake name: "),I(u.$$.fragment),m=H(),f=s("div"),p.c(),this.h()},l(t){e=o(t,"H1",{class:!0});var s=i(e);n=k(s,"Log in"),s.forEach(l),a=V(t),r=o(t,"H2",{class:!0});var $=i(r);c=k($,"Your Handshake name: "),j(u.$$.fragment,$),$.forEach(l),m=V(t),f=o(t,"DIV",{class:!0,style:!0});var d=i(f);p.l(d),d.forEach(l),this.h()},h(){D(e,"class","text-roboto-mono text-variant-huge text-weight-medium svelte-1judthm"),D(r,"class","text-roboto-mono text-variant-regular text-weight-medium svelte-1judthm"),D(f,"class","container svelte-1judthm"),L(f,"display","flex"),L(f,"align-items","center"),L(f,"justify-content","space-between")},m(t,s){$(t,e,s),S(e,n),$(t,a,s),$(t,r,s),S(r,c),F(u,r,null),$(t,m,s),$(t,f,s),y[d].m(f,null),v=!0},p(t,[e]){const n={};4&e&&(n.domainName=t[2].id),u.$set(n);let a=d;d=E(t),d===a?y[d].p(t,e):(x(),g(y[a],1,1,(()=>{y[a]=null})),b(),p=y[d],p?p.p(t,e):(p=y[d]=w[d](t),p.c()),h(p,1),p.m(f,null))},i(t){v||(h(u.$$.fragment,t),h(p),v=!0)},o(t){g(u.$$.fragment,t),g(p),v=!1},d(t){t&&l(e),t&&l(a),t&&l(r),T(u),t&&l(m),t&&l(f),y[d].d()}}}function It(t){return new Promise((e=>setTimeout(e,t)))}function Vt(t,e,n){let a,r;const s=p("identities"),o=p("loading"),{media:i}=p("media");y(t,i,(t=>n(3,r=t)));const l=p("loginFlow"),c=l.loginFlowData;y(t,c,(t=>n(2,a=t)));const{goto:u}=p("router");let $=!1,m=!1,f=!0;return P((async()=>{if(!a.state)return void u("/list");let t;try{t=await s.credentialsFor(a.id,a.state)}catch(t){console.warn(t)}t||u("/create")})),U((()=>{f=!1,o.stop()})),[$,m,a,r,i,c,async()=>{n(0,$=!0),f=!0,o.start(),setTimeout((()=>{n(1,m=!0)}),15e3);const t=async()=>{const t=await s.credentialsFor(a.id,a.state),e=new URL(a.callbackUrl),n=await s.getPrefix(t.name),r={signed:btoa(t.signed),domain:btoa(t.name),deviceId:btoa(n),publicKey:btoa(t.publicKey)};e.hash=btoa(JSON.stringify(r)),l.clear(),window.location.href=e.toString()};for(;f;){if(await s.verifyFingerprintFor(a.id)){o.stop(),await t();break}await It(2e3)}}]}class jt extends t{constructor(t){super(),e(this,t,Vt,Ht,n,{})}}function Dt(t){let e,n;return{c(){e=O("svg"),n=O("path"),this.h()},l(t){e=o(t,"svg",{width:!0,height:!0,viewBox:!0,fill:!0,xmlns:!0},1);var a=i(e);n=o(a,"path",{d:!0,fill:!0},1),i(n).forEach(l),a.forEach(l),this.h()},h(){D(n,"d","M10.4062 15.1875H10.9688C11.1094 15.1875 11.25 15.082 11.25 14.9062V5.34375C11.25 5.20312 11.1094 5.0625 10.9688 5.0625H10.4062C10.2305 5.0625 10.125 5.20312 10.125 5.34375V14.9062C10.125 15.082 10.2305 15.1875 10.4062 15.1875ZM4.78125 15.1875H5.34375C5.48438 15.1875 5.625 15.082 5.625 14.9062V5.34375C5.625 5.20312 5.48438 5.0625 5.34375 5.0625H4.78125C4.60547 5.0625 4.5 5.20312 4.5 5.34375V14.9062C4.5 15.082 4.60547 15.1875 4.78125 15.1875ZM15.4688 2.25H11.8125L10.6172 0.703125C10.3359 0.316406 9.73828 0 9.28125 0H6.46875C5.97656 0 5.37891 0.316406 5.09766 0.703125L3.9375 2.25H0.28125C0.105469 2.25 0 2.39062 0 2.53125V3.09375C0 3.26953 0.105469 3.375 0.28125 3.375H1.125V16.3125C1.125 17.2617 1.86328 18 2.8125 18H12.9375C13.8516 18 14.625 17.2617 14.625 16.3125V3.375H15.4688C15.6094 3.375 15.75 3.26953 15.75 3.09375V2.53125C15.75 2.39062 15.6094 2.25 15.4688 2.25ZM6.01172 1.37109C6.08203 1.23047 6.29297 1.16016 6.46875 1.125H9.28125C9.42188 1.16016 9.63281 1.23047 9.70312 1.37109L10.4062 2.25H5.34375L6.01172 1.37109ZM13.5 16.3125C13.5 16.6289 13.2188 16.875 12.9375 16.875H2.8125C2.49609 16.875 2.25 16.6289 2.25 16.3125V3.375H13.5V16.3125ZM7.59375 15.1875H8.15625C8.29688 15.1875 8.4375 15.082 8.4375 14.9062V5.34375C8.4375 5.20312 8.29688 5.0625 8.15625 5.0625H7.59375C7.41797 5.0625 7.3125 5.20312 7.3125 5.34375V14.9062C7.3125 15.082 7.41797 15.1875 7.59375 15.1875Z"),D(n,"fill","#676767"),D(e,"width","16"),D(e,"height","18"),D(e,"viewBox","0 0 16 18"),D(e,"fill","none"),D(e,"xmlns","http://www.w3.org/2000/svg")},m(t,a){$(t,e,a),S(e,n)},p:N,i:N,o:N,d(t){t&&l(e)}}}class Lt extends t{constructor(t){super(),e(this,t,null,Dt,n,{})}}function St(t,e,n){const a=t.slice();return a[16]=e[n],a}function Ft(t){let e,n,a,r,c;function u(){return t[9](t[16])}return n=new wt({props:{domainName:t[16].name}}),{c(){e=s("div"),I(n.$$.fragment),this.h()},l(t){e=o(t,"DIV",{class:!0});var a=i(e);j(n.$$.fragment,a),a.forEach(l),this.h()},h(){D(e,"class","existing-link color-white hover-color-brand text-roboto-variable text-variant-small text-weight-medium")},m(t,s){$(t,e,s),F(n,e,null),a=!0,r||(c=m(e,"click",u),r=!0)},p(e,a){t=e;const r={};1&a&&(r.domainName=t[16].name),n.$set(r)},i(t){a||(h(n.$$.fragment,t),a=!0)},o(t){g(n.$$.fragment,t),a=!1},d(t){t&&l(e),T(n),r=!1,c()}}}function Tt(t){let e,n,a,r,c;function u(){return t[8](t[16])}return n=new wt({props:{domainName:t[16].name}}),{c(){e=s("div"),I(n.$$.fragment),this.h()},l(t){e=o(t,"DIV",{class:!0});var a=i(e);j(n.$$.fragment,a),a.forEach(l),this.h()},h(){D(e,"class","color-white text-roboto-variable text-variant-small text-weight-medium")},m(t,s){$(t,e,s),F(n,e,null),a=!0,r||(c=m(e,"click",u),r=!0)},p(e,a){t=e;const r={};1&a&&(r.domainName=t[16].name),n.$set(r)},i(t){a||(h(n.$$.fragment,t),a=!0)},o(t){g(n.$$.fragment,t),a=!1},d(t){t&&l(e),T(n),r=!1,c()}}}function Pt(t){let e,n;return e=new Lt({}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function Ut(t){let e,n,a,r,c,u;const m=[Tt,Ft],f=[];function d(t,e){return t[1]&&t[1].state?1:0}function p(){return t[10](t[16])}return n=d(t),a=f[n]=m[n](t),c=new yt({props:{class:"delete-button",variant:"transparent",onClick:p,$$slots:{default:[Pt]},$$scope:{ctx:t}}}),{c(){e=s("li"),a.c(),r=H(),I(c.$$.fragment),this.h()},l(t){e=o(t,"LI",{class:!0});var n=i(e);a.l(n),r=V(n),j(c.$$.fragment,n),n.forEach(l),this.h()},h(){D(e,"class","svelte-1865il7")},m(t,a){$(t,e,a),f[n].m(e,null),S(e,r),F(c,e,null),u=!0},p(s,o){let i=n;n=d(t=s),n===i?f[n].p(t,o):(x(),g(f[i],1,1,(()=>{f[i]=null})),b(),a=f[n],a?a.p(t,o):(a=f[n]=m[n](t),a.c()),h(a,1),a.m(e,r));const l={};1&o&&(l.onClick=p),524288&o&&(l.$$scope={dirty:o,ctx:t}),c.$set(l)},i(t){u||(h(a),h(c.$$.fragment,t),u=!0)},o(t){g(a),g(c.$$.fragment,t),u=!1},d(t){t&&l(e),f[n].d(),T(c)}}}function Ot(t){let e,n="＋    Setup another identity";return{c(){e=C(n)},l(t){e=k(t,n)},m(t,n){$(t,e,n)},p:N,d(t){t&&l(e)}}}function At(t){let e,n,a,r,c,u,m,f,d=t[0],p=[];for(let e=0;e<d.length;e+=1)p[e]=Ut(St(t,d,e));const v=t=>g(p[t],1,1,(()=>{p[t]=null}));return m=new yt({props:{class:"color-white hover-color-brand text-roboto-variable text-variant-small text-weight-medium",onClick:t[11],$$slots:{default:[Ot]},$$scope:{ctx:t}}}),{c(){e=s("h1"),n=C("Your identities"),a=H(),r=s("ul");for(let t=0;t<p.length;t+=1)p[t].c();c=H(),u=s("li"),I(m.$$.fragment),this.h()},l(t){e=o(t,"H1",{class:!0});var s=i(e);n=k(s,"Your identities"),s.forEach(l),a=V(t),r=o(t,"UL",{class:!0});var $=i(r);for(let t=0;t<p.length;t+=1)p[t].l($);c=V($),u=o($,"LI",{class:!0});var f=i(u);j(m.$$.fragment,f),f.forEach(l),$.forEach(l),this.h()},h(){D(e,"class","text-roboto-mono text-variant-huge text-weight-medium svelte-1865il7"),D(u,"class","svelte-1865il7"),D(r,"class","svelte-1865il7")},m(t,s){$(t,e,s),S(e,n),$(t,a,s),$(t,r,s);for(let t=0;t<p.length;t+=1)p[t].m(r,null);S(r,c),S(r,u),F(m,u,null),f=!0},p(t,[e]){if(115&e){let n;for(d=t[0],n=0;n<d.length;n+=1){const a=St(t,d,n);p[n]?(p[n].p(a,e),h(p[n],1)):(p[n]=Ut(a),p[n].c(),h(p[n],1),p[n].m(r,c))}for(x(),n=d.length;n<p.length;n+=1)v(n);b()}const n={};524288&e&&(n.$$scope={dirty:e,ctx:t}),m.$set(n)},i(t){if(!f){for(let t=0;t<d.length;t+=1)h(p[t]);h(m.$$.fragment,t),f=!0}},o(t){p=p.filter(Boolean);for(let t=0;t<p.length;t+=1)g(p[t]);g(m.$$.fragment,t),f=!1},d(t){t&&l(e),t&&l(a),t&&l(r),A(p,t),T(m)}}}function _t(t,e,n){let a,r;const s=p("loginFlow"),o=s.loginFlowData;y(t,o,(t=>n(1,r=t)));const{deviceId:i}=p("media"),{goto:l}=p("router"),{delete:c,list:u}=p("identities");y(t,u,(t=>n(0,a=t)));const $=t=>{window.confirm("Would you like to delete this identity? You will still be able to use this name again later.")&&c(t)},m=async t=>{const e=`${t.name}`.split("."),n=[{host:[i,"_auth",...e].join("."),ttl:60,type:"TXT",value:`v=0;fingerprint=${t.fingerprint}`}];navigator.clipboard.writeText(JSON.stringify(n))},f=async t=>{s.setName(t),l("/#/login")},d=()=>{s.clearName(),l("/#/create")};return[a,r,o,u,$,m,f,d,t=>m(t),t=>f(t.name),t=>$(t.name),()=>d()]}class Mt extends t{constructor(t){super(),e(this,t,_t,At,n,{})}}function Rt(t){let e,n;return e=new q({props:{class:"list-link text-roboto-variable text-variant-tiny text-weight-medium",to:"/list",$$slots:{default:[Yt]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function Yt(t){let e;return{c(){e=C("Select a different identity")},l(t){e=k(t,"Select a different identity")},m(t,n){$(t,e,n)},d(t){t&&l(e)}}}function Bt(t){let e,n,a,r,c,u,m,f,d=t[0].length&&!t[1]&&Rt(t);return{c(){e=s("h1"),n=C("Set up a new identity"),a=H(),r=s("div"),c=s("label"),u=C("Your Handshake name"),m=H(),d&&d.c(),this.h()},l(t){e=o(t,"H1",{class:!0});var s=i(e);n=k(s,"Set up a new identity"),s.forEach(l),a=V(t),r=o(t,"DIV",{style:!0});var $=i(r);c=o($,"LABEL",{for:!0,class:!0});var f=i(c);u=k(f,"Your Handshake name"),f.forEach(l),m=V($),d&&d.l($),$.forEach(l),this.h()},h(){D(e,"class","text-roboto-mono text-variant-huge text-weight-medium svelte-176qmcc"),D(c,"for","new-id"),D(c,"class","text-roboto-mono text-variant-small text-weight-medium svelte-176qmcc"),L(r,"display","flex"),L(r,"align-items","center"),L(r,"justify-content","space-between")},m(t,s){$(t,e,s),S(e,n),$(t,a,s),$(t,r,s),S(r,c),S(c,u),S(r,m),d&&d.m(r,null),f=!0},p(t,[e]){t[0].length&&!t[1]?d?3&e&&h(d,1):(d=Rt(t),d.c(),h(d,1),d.m(r,null)):d&&(x(),g(d,1,1,(()=>{d=null})),b())},i(t){f||(h(d),f=!0)},o(t){g(d),f=!1},d(t){t&&l(e),t&&l(a),t&&l(r),d&&d.d()}}}function Zt(t,e,n){let a;const r=p("identities");let{list:s}=r;y(t,s,(t=>n(0,a=t)));let o=!0;return t.$$.update=()=>{1&t.$$.dirty&&0!==a.length&&n(1,o=!1)},[a,o,s]}class zt extends t{constructor(t){super(),e(this,t,Zt,Bt,n,{})}}function Jt(t){let e,n,a,i=[{class:"textinput text-variant-small text-roboto-variable color-white"},t[1]],f={};for(let t=0;t<i.length;t+=1)f=r(f,i[t]);return{c(){e=s("input"),this.h()},l(t){e=o(t,"INPUT",{class:!0}),this.h()},h(){c(e,f),u(e,"svelte-1kz53kh",!0)},m(r,s){$(r,e,s),_(e,t[0]),n||(a=m(e,"input",t[2]),n=!0)},p(t,[n]){c(e,f=d(i,[{class:"textinput text-variant-small text-roboto-variable color-white"},2&n&&t[1]])),1&n&&e.value!==t[0]&&_(e,t[0]),u(e,"svelte-1kz53kh",!0)},i:N,o:N,d(t){t&&l(e),n=!1,a()}}}function qt(t,e,n){let{value:a=""}=e;return t.$$set=t=>{n(1,e=r(r({},e),v(t))),"value"in t&&n(0,a=t.value)},e=v(e),[a,e,function(){a=this.value,n(0,a)}]}class Kt extends t{constructor(t){super(),e(this,t,qt,Jt,n,{value:0})}}function Xt(t){let e;return{c(){e=C("Continue")},l(t){e=k(t,"Continue")},m(t,n){$(t,e,n)},d(t){t&&l(e)}}}function Gt(t){let e,n,a,r,c,u,f,d,p,v,w,x,b;function y(e){t[5](e)}n=new zt({});let C={id:"new-id",name:"new-id",placeholder:"Enter a Handshake name that you own*"};return void 0!==t[0]&&(C.value=t[0]),c=new Kt({props:C}),M.push((()=>R(c,"value",y))),p=new yt({props:{variant:"primary",onClick:t[6],disabled:!t[0],$$slots:{default:[Xt]},$$scope:{ctx:t}}}),{c(){e=s("form"),I(n.$$.fragment),a=H(),r=s("div"),I(c.$$.fragment),f=H(),d=s("div"),I(p.$$.fragment),this.h()},l(t){e=o(t,"FORM",{});var s=i(e);j(n.$$.fragment,s),a=V(s),r=o(s,"DIV",{class:!0});var u=i(r);j(c.$$.fragment,u),u.forEach(l),f=V(s),d=o(s,"DIV",{class:!0});var $=i(d);j(p.$$.fragment,$),$.forEach(l),s.forEach(l),this.h()},h(){D(r,"class","input svelte-fnphpu"),D(d,"class",v="continue to-confirm "+t[1].classNames+" svelte-fnphpu")},m(s,o){$(s,e,o),F(n,e,null),S(e,a),S(e,r),F(c,r,null),S(e,f),S(e,d),F(p,d,null),w=!0,x||(b=m(e,"submit",t[4]),x=!0)},p(t,[e]){const n={};!u&&1&e&&(u=!0,n.value=t[0],Y((()=>u=!1))),c.$set(n);const a={};1&e&&(a.disabled=!t[0]),1024&e&&(a.$$scope={dirty:e,ctx:t}),p.$set(a),(!w||2&e&&v!==(v="continue to-confirm "+t[1].classNames+" svelte-fnphpu"))&&D(d,"class",v)},i(t){w||(h(n.$$.fragment,t),h(c.$$.fragment,t),h(p.$$.fragment,t),w=!0)},o(t){g(n.$$.fragment,t),g(c.$$.fragment,t),g(p.$$.fragment,t),w=!1},d(t){t&&l(e),T(n),T(c),T(p),x=!1,b()}}}function Qt(t,e,n){let a,r;const{goto:s}=p("router"),{media:o}=p("media");y(t,o,(t=>n(1,r=t)));const i=p("loginFlow"),l=i.loginFlowData;y(t,l,(t=>n(7,a=t)));let c=a.id;const u=async()=>{i.setName(c.toLowerCase().substring(0,63).replace(/[^a-z0-9-_\.]+/g,"").replace(/^[-_]+/g,"").replace(/[-_]+$/g,"")),s("/create/confirm")};return[c,r,o,l,u,function(t){c=t,n(0,c)},()=>u()]}class Wt extends t{constructor(t){super(),e(this,t,Qt,Gt,n,{})}}function te(t){let e;return{c(){e=C("Continue to Namebase")},l(t){e=k(t,"Continue to Namebase")},m(t,n){$(t,e,n)},d(t){t&&l(e)}}}function ee(t){let e,n;return e=new yt({props:{onClick:t[8],variant:"secondary",disabled:t[0],$$slots:{default:[ae]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},p(t,n){const a={};1&n&&(a.disabled=t[0]),16384&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function ne(t){let e,n;return e=new yt({props:{onClick:t[7],variant:"secondary",disabled:t[0],$$slots:{default:[re]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},p(t,n){const a={};1&n&&(a.disabled=t[0]),16384&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a)},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function ae(t){let e;return{c(){e=C("Copy my record")},l(t){e=k(t,"Copy my record")},m(t,n){$(t,e,n)},d(t){t&&l(e)}}}function re(t){let e;return{c(){e=C("I set my record")},l(t){e=k(t,"I set my record")},m(t,n){$(t,e,n)},d(t){t&&l(e)}}}function se(t){let e,n,a,r,c,u,m,f,d,p,v,w,y,E,N,L,P,U,O,A,_,M,R,Y,B;e=new zt({}),r=new wt({props:{domainName:t[5]}}),m=new yt({props:{variant:"primary",onClick:t[6],disabled:t[0],$$slots:{default:[te]},$$scope:{ctx:t}}});const Z=[ne,ee],z=[];function J(t,e){return t[1]?0:1}return M=J(t),R=z[M]=Z[M](t),{c(){I(e.$$.fragment),n=H(),a=s("div"),I(r.$$.fragment),c=H(),u=s("div"),I(m.$$.fragment),d=H(),p=s("div"),v=s("p"),w=C("Handshake name not in Namebase?"),y=H(),E=s("p"),N=C("See our "),L=s("a"),P=C("instructions for setting the record outside of Namebase."),U=H(),O=s("p"),A=C("Click the button below to copy your record, then click it again after you have set it."),_=H(),R.c(),this.h()},l(t){j(e.$$.fragment,t),n=V(t),a=o(t,"DIV",{class:!0});var s=i(a);j(r.$$.fragment,s),s.forEach(l),c=V(t),u=o(t,"DIV",{class:!0});var $=i(u);j(m.$$.fragment,$),$.forEach(l),d=V(t),p=o(t,"DIV",{class:!0});var f=i(p);v=o(f,"P",{class:!0});var h=i(v);w=k(h,"Handshake name not in Namebase?"),h.forEach(l),y=V(f),E=o(f,"P",{class:!0});var g=i(E);N=k(g,"See our "),L=o(g,"A",{rel:!0,href:!0,class:!0,target:!0});var x=i(L);P=k(x,"instructions for setting the record outside of Namebase."),x.forEach(l),g.forEach(l),U=V(f),O=o(f,"P",{class:!0});var b=i(O);A=k(b,"Click the button below to copy your record, then click it again after you have set it."),b.forEach(l),_=V(f),R.l(f),f.forEach(l),this.h()},h(){D(a,"class","input text-variant-small text-roboto-variable text-weight-regular svelte-16geiwa"),D(u,"class",f="continue to-namebase "+t[2].classNames+" svelte-16geiwa"),D(v,"class","text-variant-regular text-roboto-variable text-weight-medium svelte-16geiwa"),D(L,"rel","noopener noreferrer"),D(L,"href","https://docs.namebase.io/handshake-login/using-handshake-login"),D(L,"class","text-weight-medium svelte-16geiwa"),D(L,"target","_blank"),D(E,"class","text-variant-tiny text-roboto-variable text-weight-regular  svelte-16geiwa"),D(O,"class","text-variant-tiny text-roboto-variable text-weight-regular svelte-16geiwa"),D(p,"class",Y="set-manually "+t[2].classNames+" svelte-16geiwa")},m(t,s){F(e,t,s),$(t,n,s),$(t,a,s),F(r,a,null),$(t,c,s),$(t,u,s),F(m,u,null),$(t,d,s),$(t,p,s),S(p,v),S(v,w),S(p,y),S(p,E),S(E,N),S(E,L),S(L,P),S(p,U),S(p,O),S(O,A),S(p,_),z[M].m(p,null),B=!0},p(t,[e]){const n={};1&e&&(n.disabled=t[0]),16384&e&&(n.$$scope={dirty:e,ctx:t}),m.$set(n),(!B||4&e&&f!==(f="continue to-namebase "+t[2].classNames+" svelte-16geiwa"))&&D(u,"class",f);let a=M;M=J(t),M===a?z[M].p(t,e):(x(),g(z[a],1,1,(()=>{z[a]=null})),b(),R=z[M],R?R.p(t,e):(R=z[M]=Z[M](t),R.c()),h(R,1),R.m(p,null)),(!B||4&e&&Y!==(Y="set-manually "+t[2].classNames+" svelte-16geiwa"))&&D(p,"class",Y)},i(t){B||(h(e.$$.fragment,t),h(r.$$.fragment,t),h(m.$$.fragment,t),h(R),B=!0)},o(t){g(e.$$.fragment,t),g(r.$$.fragment,t),g(m.$$.fragment,t),g(R),B=!1},d(t){T(e,t),t&&l(n),t&&l(a),T(r),t&&l(c),t&&l(u),T(m),t&&l(d),t&&l(p),z[M].d()}}}function oe(t,e,n){let a,r;const{media:s}=p("media");y(t,s,(t=>n(2,r=t)));const o=p("identities"),i=p("loading"),l=p("loginFlow").loginFlowData;y(t,l,(t=>n(9,a=t)));let c=!1,u=!1,$=a.id;const m=(t,e,n)=>{let a=`${window.location.protocol}//${window.location.host}/#/login?id=${btoa(t)}`;return e&&(a+=`&state=${btoa(e)}`),n&&(a+=`&callbackUrl=${btoa(n)}`),a.toString()};return[c,u,r,s,l,$,async()=>{n(0,c=!0),i.start();const t=await o.generate(a.id),e=`${t.name}`.split("."),r=e.pop(),s=[{host:[await o.getPrefix(t.name),"_auth",...e].join("."),ttl:5,type:"TXT",value:`v=0;fingerprint=${t.fingerprint}`}],l=new URL(`${window.baseDomain||"https://www.namebase.io"}/next/domain-manager/${r}/records`),u=m(a.id,a.state,a.callbackUrl),$=encodeURIComponent(encodeURIComponent(u.toString()));l.searchParams.append("records",btoa(JSON.stringify(s))),l.searchParams.append("redirect",$),i.stop(),window.location.href=l.toString()},async()=>{const t=m(a.id,a.state,a.callbackUrl);window.location.href=t.toString()},async()=>{const t=await o.generate((e=$,e.toLowerCase().substring(0,63).replace(/[^a-z0-9-_\.]+/g,"").replace(/^[-_]+/g,"").replace(/[-_]+$/g,"")));var e;n(1,u=!0);const a=`${t.name}`.split("."),r=[{host:[await o.getPrefix(t.name),"_auth",...a].join("."),ttl:60,type:"TXT",value:`v=0;fingerprint=${t.fingerprint}`}];navigator.clipboard.writeText(JSON.stringify(r))}]}class ie extends t{constructor(t){super(),e(this,t,oe,se,n,{})}}function le(t){let e,n;return e=new jt({}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function ce(t){let e,n;return e=new Wt({}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function ue(t){let e,n;return e=new ie({}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function $e(t){let e,n;return e=new Mt({}),{c(){I(e.$$.fragment)},l(t){j(e.$$.fragment,t)},m(t,a){F(e,t,a),n=!0},i(t){n||(h(e.$$.fragment,t),n=!0)},o(t){g(e.$$.fragment,t),n=!1},d(t){T(e,t)}}}function me(t){let e,n,a,r,s,o,i,c;return e=new Q({props:{path:"/login",$$slots:{default:[le]},$$scope:{ctx:t}}}),a=new Q({props:{path:"/create",$$slots:{default:[ce]},$$scope:{ctx:t}}}),s=new Q({props:{path:"/create/confirm",$$slots:{default:[ue]},$$scope:{ctx:t}}}),i=new Q({props:{path:"/list",$$slots:{default:[$e]},$$scope:{ctx:t}}}),{c(){I(e.$$.fragment),n=H(),I(a.$$.fragment),r=H(),I(s.$$.fragment),o=H(),I(i.$$.fragment)},l(t){j(e.$$.fragment,t),n=V(t),j(a.$$.fragment,t),r=V(t),j(s.$$.fragment,t),o=V(t),j(i.$$.fragment,t)},m(t,l){F(e,t,l),$(t,n,l),F(a,t,l),$(t,r,l),F(s,t,l),$(t,o,l),F(i,t,l),c=!0},p(t,n){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r);const o={};1&n&&(o.$$scope={dirty:n,ctx:t}),a.$set(o);const l={};1&n&&(l.$$scope={dirty:n,ctx:t}),s.$set(l);const c={};1&n&&(c.$$scope={dirty:n,ctx:t}),i.$set(c)},i(t){c||(h(e.$$.fragment,t),h(a.$$.fragment,t),h(s.$$.fragment,t),h(i.$$.fragment,t),c=!0)},o(t){g(e.$$.fragment,t),g(a.$$.fragment,t),g(s.$$.fragment,t),g(i.$$.fragment,t),c=!1},d(t){T(e,t),t&&l(n),T(a,t),t&&l(r),T(s,t),t&&l(o),T(i,t)}}}function fe(t){let e,n,a;return n=new B({props:{default:"/list",$$slots:{default:[me]},$$scope:{ctx:t}}}),{c(){e=H(),I(n.$$.fragment),this.h()},l(t){Z('[data-svelte="svelte-1d0c6b9"]',document.head).forEach(l),e=V(t),j(n.$$.fragment,t),this.h()},h(){document.title="Login with Handshake | Namebase"},m(t,r){$(t,e,r),F(n,t,r),a=!0},p(t,[e]){const a={};1&e&&(a.$$scope={dirty:e,ctx:t}),n.$set(a)},i(t){a||(h(n.$$.fragment,t),a=!0)},o(t){g(n.$$.fragment,t),a=!1},d(t){t&&l(e),T(n,t)}}}console.info("Handhshake Login v1.0");export default class extends t{constructor(t){super(),e(this,t,null,fe,n,{})}}