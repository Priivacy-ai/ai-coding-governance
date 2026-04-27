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

await expectExists(path.join(distRoot, 'index.html'), 'home page');
await expectExists(path.join(distRoot, 'articles', 'index.html'), 'archive page');

if (slug) {
	await expectExists(path.join(distRoot, 'articles', slug, 'index.html'), 'article page');
}

const failed = checks.filter((check) => !check.ok);
console.log(JSON.stringify({ checks, success: failed.length === 0 }, null, 2));
process.exit(failed.length === 0 ? 0 : 1);
