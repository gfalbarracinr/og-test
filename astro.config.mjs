import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { astroImageTools } from "astro-imagetools";
import react from '@astrojs/react';
import { shield } from '@kindspells/astro-shield';
import compressor from "astro-compressor";
import sitemap from "@astrojs/sitemap";  
import icon from 'astro-icon';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
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
		mdx(), 
		shield({}), 
		sitemap(), 
		compressor()],
	outDir: 'public',
	publicDir: 'static',
	adapter: netlify(),
});
