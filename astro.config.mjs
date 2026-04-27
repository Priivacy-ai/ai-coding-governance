import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: process.env.SITE_URL || 'https://ai-coding-governance.com',
	integrations: [mdx(), sitemap()],
});
