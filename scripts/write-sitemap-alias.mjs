import fs from 'node:fs/promises';
import path from 'node:path';

const distRoot = path.join(process.cwd(), 'dist');
const sitemapIndexPath = path.join(distRoot, 'sitemap-index.xml');
const firstSitemapChunkPath = path.join(distRoot, 'sitemap-0.xml');
const sitemapAliasPath = path.join(distRoot, 'sitemap.xml');

async function readRequired(filePath, label) {
	try {
		return await fs.readFile(filePath, 'utf8');
	} catch (error) {
		throw new Error(`Missing ${label} at ${filePath}: ${error.message}`);
	}
}

const sitemapIndex = await readRequired(sitemapIndexPath, 'Astro sitemap index');
const firstSitemapChunk = await readRequired(firstSitemapChunkPath, 'Astro sitemap chunk');

if (!sitemapIndex.includes('<sitemapindex')) {
	throw new Error(`${sitemapIndexPath} is not a sitemap index`);
}

if (!firstSitemapChunk.includes('<urlset')) {
	throw new Error(`${firstSitemapChunkPath} is not a sitemap URL set`);
}

await fs.writeFile(sitemapAliasPath, firstSitemapChunk, 'utf8');

console.log(
	JSON.stringify(
		{
			success: true,
			source: path.relative(process.cwd(), firstSitemapChunkPath),
			alias: path.relative(process.cwd(), sitemapAliasPath),
		},
		null,
		2,
	),
);
