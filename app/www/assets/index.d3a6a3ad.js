var e=Object.defineProperty,a=Object.defineProperties,l=Object.getOwnPropertyDescriptors,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(a,l,t)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[l]=t;import{M as s,a9 as i,aa as c,c as u,af as p,g as f,o as d,j as m,i as v,e as y,w as b,u as g,t as _,h as j,ag as O,v as w,x as q}from"./vendor.75a2e4ba.js";import{_ as k}from"./index.cf835189.js";const P=e=>(w("data-v-26ee882e"),e=e(),q(),e),x={class:"control"},h={class:"menu mini"},I=P((()=>v("span",{class:"iconfont icon-codelibrary"},null,-1))),C=P((()=>v("span",null,"gitmars工作流",-1))),D=P((()=>v("span",{class:"iconfont icon-control"},null,-1))),E=P((()=>v("span",null,"任务",-1))),M=P((()=>v("span",{class:"iconfont icon-left-circle"},null,-1))),S=P((()=>v("span",null,"返回项目列表",-1))),V={key:0,class:"loading"},z=P((()=>v("div",{class:"loading"},"loading...",-1)));const A=s((B=((e,a)=>{for(var l in a||(a={}))r.call(a,l)&&n(e,l,a[l]);if(t)for(var l of t(a))o.call(a,l)&&n(e,l,a[l]);return e})({},{name:"Control"}),a(B,l({setup:function(e,{expose:a}){const l=i(),t=c(),r=u(null);return"control"===t.name&&l.replace({name:"control_gitmars",query:t.query}),p((e=>(r.value=e,!0))),a({router:l,route:t,error:r}),(e,a)=>{const l=f("router-link"),o=f("router-view");return d(),m("div",x,[v("div",h,[v("ul",null,[v("li",null,[y(l,{to:{name:"control_gitmars",query:g(t).query},title:"gitmars工作流"},{default:b((()=>[I,C])),_:1},8,["to"])]),v("li",null,[y(l,{to:{name:"control_tasks",query:g(t).query},title:"任务"},{default:b((()=>[D,E])),_:1},8,["to"])])]),v("ul",null,[v("li",null,[y(l,{to:{name:"project_list"},title:"返回项目列表"},{default:b((()=>[M,S])),_:1})])])]),r.value?(d(),m("div",V,_(r.value),1)):(d(),j(O,{key:1},{default:b((()=>[y(o,{class:"routerView"})])),fallback:b((()=>[z])),_:1}))])}}}))));var B,F=k(A,[["__scopeId","data-v-26ee882e"]]);export{F as default};
