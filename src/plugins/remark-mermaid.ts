import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

export const remarkMermaid: RemarkPlugin<[]> = () => tree => {
 visit(tree, "code", node => {
   if (node.lang !== "mermaid") return

   // @ts-ignore
   node.type = "html"
   node.value = `
     <div class="mermaid">
       <p>Loading graph...</p>
       <pre class="mermaid-src">${node.value}</pre>
       </div>
   `
 });
};
