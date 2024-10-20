import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";
import react from '@astrojs/react';
import { shield } from '@kindspells/astro-shield';
import compressor from "astro-compressor";
import sitemap from "@astrojs/sitemap";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { remarkAlert } from 'remark-github-blockquote-alert';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://ekumenlabs.com',
  integrations: [
    astroImageTools,
    icon(
      {
        iconDir: "static/images/icons",
        include: {
          mdi: ["*"]
        }
      }
    ), 
    react(), 
    shield({}), 
    sitemap(), 
    compressor()
  ],
  outDir: 'public',
  publicDir: 'static',
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeKatex, 
    ]
  }
});
