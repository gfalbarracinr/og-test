import{_ as e,l as o,F as i,k as n,G as p}from"./mermaid.core.D1usf7N0.js";import{p as g}from"./gitGraph-YCYPL57B.lCIGKSVz.js";import"./hoisted.CSSvMWlj.js";import"./_commonjsHelpers.Cpj98o6Y.js";import"./_baseUniq.CcZnF8G-.js";import"./_basePickBy.CgOR9I-C.js";import"./clone.DozELk-z.js";var m={parse:e(async r=>{const a=await g("info",r);o.debug(a)},"parse")},v={version:p},d=e(()=>v.version,"getVersion"),c={getVersion:d},l=e((r,a,s)=>{o.debug(`rendering info diagram
`+r);const t=i(a);n(t,100,400,!0),t.append("g").append("text").attr("x",100).attr("y",40).attr("class","version").attr("font-size",32).style("text-anchor","middle").text(`v${s}`)},"draw"),f={draw:l},z={parser:m,db:c,renderer:f};export{z as diagram};
