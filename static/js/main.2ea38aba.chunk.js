(this["webpackJsonptoy-browser"]=this["webpackJsonptoy-browser"]||[]).push([[0],{100:function(e,t,n){},188:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(4),o=n.n(c),i=(n(100),n(90)),l=n(19),u=n(45),s=n(192),f=n(190),d=n(191),p=n(193),h=n(194),m="<html maaa=aa >\n<head>\n    <style>\n        body div #myid{\n            width:100px;\n            background-color: #ff5000;\n        }\n        body div.box1.box2#box { width:100px; height: 100px;  background-color: #ff0000; }\n        body .box1.box2#box{ background-color: #0000ff; }\n        img {\n            height: 30px;\n        }\n        body div img{\n            width:30px;\n            background-color: #ff1111;\n        }\n        h1 {\n            color: red;\n        }\n        body {\n            background: #f3f3f3;\n        }\n    </style>\n</head>\n<body>\n    <h1>hello world</h1>     \n    <div>\n        <div id='box' class='box1 box2'></div>\n        <img id=\"myid\" />\n        <img />\n    </div>\n</body>\n</html>\n",y=n(37),g=n(33),v=n(14),b=function(e){return/^[A-Za-z]$/.test(e)},x=function(e){return/^[A-Z]$/.test(e)},E=function(e){return/^[\n\t\f ]$/.test(e)},O=function(e){return"EOF"===e};var w=n(38),j=n(74),k=n(75),S=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"start";Object(j.a)(this,e),this.tag="",this.attrs=[],this.currentAttr=void 0,this.tagType=void 0,this.tagType=t}return Object(k.a)(e,[{key:"tagName",value:function(e){this.tag+=e}},{key:"createAttr",value:function(){this.currentAttr={name:"",value:""},this.attrs.push(this.currentAttr)}},{key:"attrName",value:function(e){this.currentAttr.name+=e}},{key:"attrValue",value:function(e){this.currentAttr.value+=e}},{key:"selfClosing",value:function(){this.tagType="selfClosing"}},{key:"create",value:function(){return{type:"element",tagType:this.tagType,tagName:this.tag,selectors:null,relatedCssRules:[],attrbutes:this.attrs.reduce((function(e,t){return Object(v.a)(Object(v.a)({},e),{},Object(w.a)({},t.name,t.value))}),{}),children:[]}}}]),e}();var N,A=n(76);function C(e,t){return e.every((function(e){return t.includes(e)}))}function F(e,t,n){var r=n.map((function(e){return e.selectors}));e.forEach((function(e){(function(e,t,n){var r=n.slice();if(C(r.pop(),e)){if(0===r.length)return!0;for(var a=t.slice().reverse(),c=r.pop(),o=0;o<a.length;o+=1){if(C(c,a[o])){if(0===r.length)return!0;c=r.pop()}}return!1}return!1})(t.selectors,r,e.selectorItems)&&t.relatedCssRules.push(e)}),[]),t.computedStyle=function(e){var t={},n={};return e.forEach((function(e){var r=e.specificity;e.declarations.forEach((function(e){var a=e.property,c=e.value;t[a]?function(e,t){for(var n=3;n>=0;n-=1){if(e[n]>t[n])return!0;if(e[n]<t[n])return!1}return!0}(r,n[a])&&(t[a]=c,n[a]=r):(t[a]=c,n[a]=r)}))})),t}(t.relatedCssRules)}var T=null,B=[];function M(e){var t,n,r=(t=N)[t.length-1];if("text"===e.type)null===T&&(T={type:"text",content:""},r.children.push(T)),T.content+=e.char;else if("element"===e.type){if(T=null,"start"===e.tagType||"selfClosing"===e.tagType)e.selectors=function(e){var t=[];t.push(e.tagName);var n=e.attrbutes.class;if(n){var r=n.trim().split(/[ ]+/).map((function(e){return".".concat(e)}));t.push.apply(t,Object(g.a)(r))}var a=e.attrbutes.id;return a&&t.push("#".concat(a)),t}(e),F(B,e,N.slice(1)),r.children.push(e),"start"===e.tagType&&N.push(e);else if("end"===e.tagType){if(r.tagName!==e.tagName)throw new Error("lose end tag ".concat(r.tagName));"style"===e.tagName&&B.push.apply(B,Object(g.a)((n=r.children[0].content,A.parse(n).stylesheet.rules.map((function(e){return{selectors:e.selectors,declarations:e.declarations.map((function(e){return{property:e.property,value:e.value}}))}})).reduce((function(e,t){var n=t.selectors.map((function(e){var n,r=function(e){return e.split(" ").map((function(e){return e.split(/(?=[.#])/)}))}(e);return{selector:e,selectorItems:r,specificity:(n=r.flat(),n.reduce((function(e,t){return t.startsWith("#")?e[2]+=1:t.startsWith(".")?e[1]+=1:e[0]+=1,e}),[0,0,0,0])),declarations:t.declarations}}));return e.push.apply(e,Object(g.a)(n)),e}),[])))),N.pop()}}else T=null}function L(e){N=[{type:"document",children:[]}];var t,n=function(e){var t=new S;function n(t){return"<"===t?r:O(t)?void e({type:"EOF"}):("\0"===t||e({type:"text",char:t}),n)}function r(e){return"/"===e?a:b(e)?(t=new S("start"),c(e)):n}function a(r){return b(r)?(t=new S("end"),c(r)):">"===r?n:O(r)?(e({type:"EOF"}),n):n}function c(r){return E(r)?i:"/"===r?o:">"===r?(e(t.create()),n):x(r)?(t.tagName(r.toLowerCase()),c):O(r)?(e({type:"EOF"}),n):(t.tagName(r),c)}function o(r){if(">"===r)return t.selfClosing(),e(t.create()),n;if(!O(r))throw new Error("parse error");e({type:"EOF"})}function i(e){if(E(e))return i;if("/"===e||">"===e||O(e))return u(e);if("="===e)throw new Error("parse error");return t.createAttr(),l(e)}function l(e){return E(e)||"/"===e||">"===e||O(e)?u(e):"="===e?s:x(e)?(t.attrName(e.toLowerCase()),l):['"',"'","<","\0"].includes(e)?n:(t.attrName(e),l)}function u(r){return E(r)?u:"/"===r?o:"="===r?s:">"===r?(e(t.create()),n):O(r)?(e({type:"EOF"}),n):(t.createAttr(),l(r))}function s(e){return E(e)?s:'"'===e?f:"'"===e?d:">"===e?n:p(e)}function f(r){return'"'===r?h:O(r)?(e({type:"EOF"}),n):(t.attrValue(r),f)}function d(r){return"'"===r?h:O(r)?(e({type:"EOF"}),n):(t.attrValue(r),d)}function p(r){return E(r)?i:">"===r?(e(t.create()),n):O(r)?(e({type:"EOF"}),n):['"',"'","<","=","`"].includes(r)?n:(t.attrValue(r),p)}function h(r){return E(r)?i:"/"===r?o:">"===r?(e(t.create()),n):O(r)?(e({type:"EOF"}),n):i(r)}return n}(M),r=Object(y.a)(e);try{for(r.s();!(t=r.n()).done;){n=n(t.value)}}catch(a){r.e(a)}finally{r.f()}return n("EOF"),N[0]}var z=n(53),V=n.n(z),R=function(e,t,n){return[["M",e,t],["a",n,n,0,1,0,2*n,0],["a",n,n,0,1,0,2*-n,0],["M",e+2,t],["L",e+2*n-2,t]]},W=function(e,t,n){return[["M",e,t],["a",n,n,0,1,0,2*n,0],["a",n,n,0,1,0,2*-n,0],["M",e+2,t],["L",e+2*n-2,t],["M",e+n,t-n+2],["L",e+n,t+n-2]]};V.a.registerNode("tree-node",{drawShape:function(e,t){var n,r,a=t.addShape("rect",{attrs:{fill:"#ffadd2",stroke:"#ffadd2",width:80},name:"rect-shape"});if(e.computedStyle){var c=Object.entries(e.computedStyle);n="".concat(e.name).concat(c.length?c.reduce((function(e,t){return"".concat(e,"\n").concat(t[0],":").concat(t[1])}),""):""),r="".concat(e.name).concat(c.length?c.reduce((function(e){return"".concat(e,"\n")}),""):"")}else r=n=e.name;var o=t.addShape("text",{attrs:{text:n,x:0,y:0,textAlign:"left",textBaseline:"middle",fill:"#c41d7f"},name:"rect-shape"});t.addShape("text",{attrs:{text:r,x:0,y:0,textAlign:"left",textBaseline:"middle",fill:"#0a0a0a"},name:"rect-shape"});var i=o.getBBox(),l=e.children&&e.children.length>0;return l&&t.addShape("marker",{attrs:{x:i.maxX+6,y:i.minX+i.height/2-6,r:6,symbol:R,stroke:"#666",lineWidth:2},name:"collapse-icon"}),a.attr({x:i.minX-4,y:i.minY-6,width:i.width+(l?26:10),height:i.height+12}),a}},"single-node");var I=function(e){var t=e.tree,n=e.hasStyle,c=void 0!==n&&n,o=a.a.useRef(null),i=Object(r.useState)(),l=Object(u.a)(i,2),s=l[0],f=l[1];return Object(r.useEffect)((function(){}),[]),Object(r.useEffect)((function(){if(s){var e=function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("document"===t.type)return{name:"document",children:t.children.map((function(t){return e(t,n)}))};if("element"===t.type){var r={name:t.tagName,children:t.children.map((function(t){return e(t,n)}))};return n?Object(v.a)(Object(v.a)({},r),{},{computedStyle:t.computedStyle}):r}return{name:"[text]:\n".concat(t.content.trim().replace("\n"," ").slice(0,20)).concat(t.content.length>20?"...":"")}}(t,c);s.data(e),s.render(),s.fitView()}else f((n=o.current,new V.a.TreeGraph({container:n,width:675,height:417.15,modes:{default:[{type:"collapse-expand",onChange:function(e,t){var n=e.get("model"),r=e.get("group").find((function(e){return"collapse-icon"===e.get("name")}));return t?r.attr("symbol",W):r.attr("symbol",R),n.collapsed=t,!0}},"drag-canvas","zoom-canvas"]},defaultNode:{type:"tree-node",anchorPoints:[[0,.5],[1,.5]]},defaultEdge:{type:"cubic-horizontal",style:{stroke:"#A3B1BF"}},layout:{type:"compactBox",direction:"LR",getId:function(e){return e.id},getHeight:function(){return 16},getWidth:function(){return 16},getVGap:function(){return 20},getHGap:function(){return 80}}})));var n}),[t,s,c]),a.a.createElement("div",{ref:o,style:{background:"#fff0f6"}})},$=s.a.Content,D=f.a.Title,G=f.a.Paragraph,H=f.a.Text,X=d.a.Step,J=function(){var e=Object(r.useState)(m),t=Object(u.a)(e,2),n=t[0],c=t[1],o=function e(t){var n,r,a=[],c=Object(y.a)(t.children);try{for(c.s();!(n=c.n()).done;){var o=n.value;"element"===o.type?a.push(e(o)):"text"===o.type&&(r=o.content,/^[\n\t\f ]*$/.test(r)||a.push(o))}}catch(i){c.e(i)}finally{c.f()}return Object(v.a)(Object(v.a)({},t),{},{children:a})}(L(m));return console.log("%c\u89e3\u6790\u7ed3\u679c","font-size: 1.8em"),console.log(o),a.a.createElement(s.a,null,a.a.createElement($,{style:{padding:"40px"}},a.a.createElement(p.a,{justify:"center",align:"top"},a.a.createElement(h.a,{span:18,style:{maxWidth:"750px",background:"#fff",padding:"24px"}},a.a.createElement(D,{level:2},"\u73a9\u5177\u6d4f\u89c8\u5668"),a.a.createElement(d.a,{progressDot:!0,current:1/0,direction:"vertical",size:"default"},a.a.createElement(X,{title:a.a.createElement(D,{level:3},"HTML"),style:{width:"100%"},description:a.a.createElement("div",{style:{padding:".5em",border:"1px solid #f0f2f6",boxSizing:"border-box"}},a.a.createElement(G,{editable:{onChange:c},style:{whiteSpace:"pre-wrap"}},n))}),a.a.createElement(X,{title:a.a.createElement(D,{level:3},"DOM tree"),style:{width:"100%"},description:a.a.createElement(a.a.Fragment,null,a.a.createElement(H,null,a.a.createElement(H,{strong:!0},"\u6ce8\u610f")," ","\u5c55\u793a\u7684\u7ed3\u679c\u7701\u7565\u4e86\u53ea\u6709\u7a7a\u767d\u7684\u6587\u672c\u8282\u70b9"),a.a.createElement(I,{tree:o}))}),a.a.createElement(X,{title:a.a.createElement(D,{level:3},"DOM tree with CSS"),style:{width:"100%"},description:a.a.createElement(I,{tree:o,hasStyle:!0})}))))))},P=function(){return a.a.createElement(i.a,null,a.a.createElement(l.c,null,a.a.createElement(l.a,{path:"/",component:J,exact:!0})))};o.a.render(a.a.createElement(P,null),document.getElementById("root"))},95:function(e,t,n){e.exports=n(188)}},[[95,1,2]]]);
//# sourceMappingURL=main.2ea38aba.chunk.js.map