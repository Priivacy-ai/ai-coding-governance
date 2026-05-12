import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const articlesRoot = path.join(root, 'src', 'content', 'articles');
const publicRoot = path.join(root, 'public');
const includeDrafts =
	process.argv.includes('--include-drafts') ||
	['1', 'true', 'yes'].includes(String(process.env.SHOW_DRAFT_ARTICLES ?? '').toLowerCase());

function stripQuotes(value) {
	return value?.trim().replace(/^['"]|['"]$/g, '') ?? '';
}

function splitFrontmatter(markdown) {
	if (!markdown.startsWith('---\n')) {
		return { frontmatter: '', body: markdown };
	}

	const end = markdown.indexOf('\n---', 4);
	if (end === -1) {
		return { frontmatter: '', body: markdown };
	}

	return {
		frontmatter: markdown.slice(4, end),
		body: markdown.slice(end + 4),
	};
}

function readScalar(frontmatter, key) {
	const pattern = new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm');
	return stripQuotes(frontmatter.match(pattern)?.[1]);
}

function readBlock(frontmatter, key) {
	const lines = frontmatter.split(/\r?\n/);
	const start = lines.findIndex((line) => line.trim() === `${key}:`);
	if (start === -1) {
		return '';
	}

	const block = [];
	for (const line of lines.slice(start + 1)) {
		if (/^[A-Za-z][A-Za-z0-9_-]*:/.test(line)) {
			break;
		}
		block.push(line);
	}

	return block.join('\n');
}

function readBlockScalar(frontmatter, blockKey, valueKey) {
	const block = readBlock(frontmatter, blockKey);
	const pattern = new RegExp(`^\\s+${valueKey}:\\s*(.+?)\\s*$`, 'm');
	return stripQuotes(block.match(pattern)?.[1]);
}

function readTags(frontmatter) {
	const inline = frontmatter.match(/^tags:\s*\[(.*?)\]\s*$/m)?.[1];
	if (inline) {
		return inline.split(',').map(stripQuotes);
	}

	return readBlock(frontmatter, 'tags')
		.split(/\r?\n/)
		.map((line) => stripQuotes(line.replace(/^\s*-\s*/, '')))
		.filter(Boolean);
}

function isLocalImageSource(src) {
	return Boolean(src) && !/^(?:https?:|data:|mailto:|#)/i.test(src);
}

function publicPathFor(src, sourceFile) {
	if (src.startsWith('/')) {
		return path.join(publicRoot, src.slice(1));
	}

	return path.resolve(path.dirname(sourceFile), src);
}

function collectBodyImageSources(body) {
	const sources = [];
	const htmlImagePattern = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
	const markdownImagePattern = /!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;

	for (const match of body.matchAll(htmlImagePattern)) {
		sources.push({ label: 'body image', src: match[1] });
	}

	for (const match of body.matchAll(markdownImagePattern)) {
		sources.push({ label: 'body image', src: match[1] });
	}

	return sources;
}

async function listMarkdownFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				return listMarkdownFiles(entryPath);
			}
			return /\.(?:md|mdx)$/.test(entry.name) ? [entryPath] : [];
		}),
	);

	return files.flat().sort();
}

async function exists(filePath) {
	try {
		const stat = await fs.stat(filePath);
		return stat.isFile();
	} catch {
		return false;
	}
}

const failures = [];
const checked = [];

for (const filePath of await listMarkdownFiles(articlesRoot)) {
	const markdown = await fs.readFile(filePath, 'utf8');
	const { frontmatter, body } = splitFrontmatter(markdown);
	const articleId = path.relative(articlesRoot, filePath).replace(/\.(?:md|mdx)$/, '');
	const title = readScalar(frontmatter, 'title') || articleId;
	const draft = readScalar(frontmatter, 'draft') === 'true';
	const tags = readTags(frontmatter);

	if (articleId === 'pipeline-status' || tags.includes('system') || (draft && !includeDrafts)) {
		continue;
	}

	const requiredImages = [
		{ label: 'heroImage.src', src: readBlockScalar(frontmatter, 'heroImage', 'src') },
		{ label: 'supportImage.src', src: readBlockScalar(frontmatter, 'supportImage', 'src') },
		...collectBodyImageSources(body),
	];

	for (const image of requiredImages) {
		if (!image.src) {
			failures.push({
				article: title,
				file: path.relative(root, filePath),
				image: image.label,
				reason: 'missing image src',
			});
			continue;
		}

		if (!isLocalImageSource(image.src)) {
			continue;
		}

		const target = publicPathFor(image.src, filePath);
		const ok = await exists(target);
		checked.push({ article: title, image: image.label, src: image.src, ok });

		if (!ok) {
			failures.push({
				article: title,
				file: path.relative(root, filePath),
				image: image.label,
				src: image.src,
				expected: path.relative(root, target),
				reason: 'referenced image file does not exist',
			});
		}
	}
}

if (failures.length > 0) {
	console.error('Article image verification failed. Published articles must not build without image assets.');
	console.error(JSON.stringify({ failures, checked: checked.length }, null, 2));
	process.exit(1);
}

console.log(JSON.stringify({ success: true, checked: checked.length }, null, 2));
