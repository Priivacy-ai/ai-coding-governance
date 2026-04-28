import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const slugIndex = args.indexOf('--slug');
const slug = slugIndex === -1 ? '' : args[slugIndex + 1];
const root = process.cwd();
const distRoot = path.join(root, 'dist');
const checks = [];

async function expectExists(target, label) {
	try {
		await fs.access(target);
		checks.push({ label, path: target, ok: true });
	} catch {
		checks.push({ label, path: target, ok: false });
	}
}

async function expectIncludes(target, label, expectedText) {
	try {
		const content = await fs.readFile(target, 'utf8');
		checks.push({ label, path: target, ok: content.includes(expectedText), expectedText });
	} catch {
		checks.push({ label, path: target, ok: false, expectedText });
	}
}

await expectExists(path.join(distRoot, 'index.html'), 'home page');
await expectExists(path.join(distRoot, 'articles', 'index.html'), 'archive page');
await expectExists(path.join(distRoot, 'sitemap-index.xml'), 'sitemap index');
await expectExists(path.join(distRoot, 'sitemap-0.xml'), 'sitemap chunk');
await expectExists(path.join(distRoot, 'sitemap.xml'), 'sitemap alias');
await expectExists(path.join(distRoot, 'robots.txt'), 'robots file');

if (slug) {
	await expectExists(path.join(distRoot, 'articles', slug, 'index.html'), 'article page');
}

let sitemapAliasOk = false;
try {
	const sitemapAlias = await fs.readFile(path.join(distRoot, 'sitemap.xml'), 'utf8');
	sitemapAliasOk = sitemapAlias.includes('<urlset');
	checks.push({ label: 'sitemap alias content', path: path.join(distRoot, 'sitemap.xml'), ok: sitemapAliasOk });
} catch {
	checks.push({ label: 'sitemap alias content', path: path.join(distRoot, 'sitemap.xml'), ok: false });
}

if (slug) {
	await expectIncludes(path.join(distRoot, 'sitemap.xml'), 'sitemap alias includes requested article', `/articles/${slug}/`);
	await expectIncludes(path.join(distRoot, 'sitemap-0.xml'), 'sitemap chunk includes requested article', `/articles/${slug}/`);
	await expectIncludes(path.join(distRoot, 'rss.xml'), 'rss includes requested article', `/articles/${slug}/`);
}

try {
	const articleEntries = await fs.readdir(path.join(distRoot, 'articles'), { withFileTypes: true });
	const articleSlugs = articleEntries
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

	for (const articleSlug of articleSlugs) {
		await expectIncludes(
			path.join(distRoot, 'sitemap.xml'),
			`sitemap alias includes article ${articleSlug}`,
			`/articles/${articleSlug}/`,
		);
	}
} catch {
	checks.push({ label: 'article sitemap coverage', path: path.join(distRoot, 'articles'), ok: false });
}

const allFailed = checks.filter((check) => !check.ok);
console.log(JSON.stringify({ checks, success: allFailed.length === 0 }, null, 2));
process.exit(allFailed.length === 0 ? 0 : 1);
