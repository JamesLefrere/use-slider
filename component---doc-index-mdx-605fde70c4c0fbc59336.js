(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{UXkz:function(n,e,i){"use strict";i.r(e),i.d(e,"_frontmatter",(function(){return v})),i.d(e,"default",(function(){return c}));var t=i("Fcif"),d=i("+I+c"),o=i("/FXl"),l=i("TjRS"),r=i("ZFoC"),a=i("3re2"),v=(i("KeMV"),i("aD51"),{});void 0!==v&&v&&v===Object(v)&&Object.isExtensible(v)&&!v.hasOwnProperty("__filemeta")&&Object.defineProperty(v,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"doc/index.mdx"}});var b={_frontmatter:v},u=l.a;function c(n){var e,i,c,s,f,p,O,j,_,y=n.components,m=Object(d.a)(n,["components"]);return Object(o.b)(u,Object(t.a)({},b,m,{components:y,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"basic"},"Basic"),Object(o.b)(r.c,{__position:0,__code:"() => {\n  const [ref] = useSlider()\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n      <div>6</div>\n    </div>\n  )\n}",__scope:(e={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},e.DefaultLayout=l.a,e._frontmatter=v,e),mdxType:"Playground"},(function(){var n=Object(a.a)()[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"),Object(o.b)("div",null,"6"))})),Object(o.b)("h1",{id:"multiple-slide"},"Multiple Slide"),Object(o.b)(r.c,{__position:1,__code:"() => {\n  const [ref] = useSlider({ slidesPerView: 3 })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(i={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},i.DefaultLayout=l.a,i._frontmatter=v,i),mdxType:"Playground"},(function(){var n=Object(a.a)({slidesPerView:3})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"loop"},"Loop"),Object(o.b)(r.c,{__position:2,__code:"() => {\n  const [ref] = useSlider({\n    loop: true,\n  })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(c={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},c.DefaultLayout=l.a,c._frontmatter=v,c),mdxType:"Playground"},(function(){var n=Object(a.a)({loop:!0})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"multiple-slide-with-loop"},"Multiple Slide With Loop"),Object(o.b)(r.c,{__position:3,__code:"() => {\n  const [ref] = useSlider({ slidesPerView: 3, loop: true })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(s={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},s.DefaultLayout=l.a,s._frontmatter=v,s),mdxType:"Playground"},(function(){var n=Object(a.a)({slidesPerView:3,loop:!0})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"pagination"},"Pagination"),Object(o.b)(r.c,{__position:4,__code:"() => {\n  const [ref] = useSlider({ pagination: true })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(f={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},f.DefaultLayout=l.a,f._frontmatter=v,f),mdxType:"Playground"},(function(){var n=Object(a.a)({pagination:!0})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"custom-pagination"},"Custom Pagination"),Object(o.b)(r.c,{__position:5,__code:"() => {\n  const [ref] = useSlider({ pagination: <span>X</span> })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(p={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},p.DefaultLayout=l.a,p._frontmatter=v,p),mdxType:"Playground"},(function(){var n=Object(a.a)({pagination:Object(o.b)("span",null,"X")})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"custom-pagination-with-index"},"Custom Pagination with index"),Object(o.b)(r.c,{__position:6,__code:"() => {\n  const [ref] = useSlider({ pagination: index => <span>{index + 1}</span> })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(O={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},O.DefaultLayout=l.a,O._frontmatter=v,O),mdxType:"Playground"},(function(){var n=Object(a.a)({pagination:function(n){return Object(o.b)("span",null,n+1)}})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"navigation"},"Navigation"),Object(o.b)(r.c,{__position:7,__code:"() => {\n  const [ref] = useSlider({ loop: true, navigation: true })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(j={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},j.DefaultLayout=l.a,j._frontmatter=v,j),mdxType:"Playground"},(function(){var n=Object(a.a)({loop:!0,navigation:!0})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})),Object(o.b)("h1",{id:"custom-navigation"},"Custom Navigation"),Object(o.b)(r.c,{__position:8,__code:"() => {\n  const [ref] = useSlider({\n    arrowLeft: <span style={{ fontSize: '50px' }}> {'<'} </span>,\n    arrowRight: <span style={{ fontSize: '50px' }}> {'>'} </span>,\n  })\n  return (\n    <div ref={ref}>\n      <div>1</div>\n      <div>2</div>\n      <div>3</div>\n      <div>4</div>\n      <div>5</div>\n    </div>\n  )\n}",__scope:(_={props:m,DefaultLayout:l.a,Playground:r.c,useSlider:a.a},_.DefaultLayout=l.a,_._frontmatter=v,_),mdxType:"Playground"},(function(){var n=Object(a.a)({arrowLeft:Object(o.b)("span",{style:{fontSize:"50px"}}," ","<"," "),arrowRight:Object(o.b)("span",{style:{fontSize:"50px"}}," ",">"," ")})[0];return Object(o.b)("div",{ref:n},Object(o.b)("div",null,"1"),Object(o.b)("div",null,"2"),Object(o.b)("div",null,"3"),Object(o.b)("div",null,"4"),Object(o.b)("div",null,"5"))})))}void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"doc/index.mdx"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---doc-index-mdx-605fde70c4c0fbc59336.js.map