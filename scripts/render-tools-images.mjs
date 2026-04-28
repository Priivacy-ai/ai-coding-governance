import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

function usage() {
	console.error('usage: node render-tools-images.mjs --manifest <path>');
	process.exit(2);
}

const args = process.argv.slice(2);
const manifestIndex = args.indexOf('--manifest');
if (manifestIndex === -1 || !args[manifestIndex + 1]) {
	usage();
}

const manifestPath = path.resolve(args[manifestIndex + 1]);
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const palette = manifest.palette ?? ['#121417', '#B84A3A', '#D8AD4C', '#2F8A86', '#496581'];

function hashSeed(value) {
	return crypto.createHash('sha256').update(value).digest().readUInt32BE(0);
}

function randomValues(seed, count) {
	const values = [];
	let state = seed;
	for (let index = 0; index < count; index += 1) {
		state = (state * 1664525 + 1013904223) % 4294967296;
		values.push(state / 4294967296);
	}
	return values;
}

function escapeXml(value) {
	return String(value ?? '')
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

async function writeImage(outputPath, svg) {
	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	const ext = path.extname(outputPath).toLowerCase();
	const image = sharp(Buffer.from(svg)).resize(1600, 900, { fit: 'cover', position: 'center' });
	if (ext === '.webp') {
		await image.webp({ quality: 92 }).toFile(outputPath);
		return 'webp';
	}
	if (ext === '.png') {
		await image.png().toFile(outputPath);
		return 'png';
	}
	if (ext === '.jpg' || ext === '.jpeg') {
		await image.jpeg({ quality: 92 }).toFile(outputPath);
		return 'jpg';
	}
	await fs.writeFile(outputPath, svg, 'utf8');
	return 'svg';
}

function latticePaths({ valueAt, teal, amber, steel }) {
	return Array.from({ length: 16 }, (_, index) => {
		const x1 = 180 + valueAt(index * 7) * 420;
		const y1 = 150 + valueAt(index * 7 + 1) * 560;
		const x2 = 840 + valueAt(index * 7 + 2) * 520;
		const y2 = 150 + valueAt(index * 7 + 3) * 560;
		const c1 = 560 + valueAt(index * 7 + 4) * 180;
		const c2 = 700 + valueAt(index * 7 + 5) * 220;
		const color = index % 4 === 0 ? amber : index % 3 === 0 ? steel : teal;
		const width = 1.4 + valueAt(index * 7 + 6) * 3.8;
		return `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} C${c1.toFixed(2)} ${(y1 - 90).toFixed(2)} ${c2.toFixed(2)} ${(y2 + 90).toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="${color}" stroke-opacity=".34" stroke-width="${width.toFixed(2)}" stroke-linecap="round"/>`;
	}).join('');
}

function toolNodes({ valueAt, ink, red, amber, teal, steel, secondary }) {
	return Array.from({ length: secondary ? 12 : 10 }, (_, index) => {
		const column = index % 3;
		const row = Math.floor(index / 3);
		const x = 166 + column * 204 + valueAt(40 + index) * 34;
		const y = 142 + row * 142 + valueAt(60 + index) * 32;
		const width = 142 + valueAt(80 + index) * 72;
		const height = 64 + valueAt(100 + index) * 34;
		const accent = index % 4 === 0 ? red : index % 3 === 0 ? amber : index % 2 === 0 ? teal : steel;
		return `<g>
  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${width.toFixed(2)}" height="${height.toFixed(2)}" rx="12" fill="#FFFDFC" fill-opacity=".78" stroke="${ink}" stroke-opacity=".12"/>
  <rect x="${(x + 14).toFixed(2)}" y="${(y + 14).toFixed(2)}" width="${(width * 0.24).toFixed(2)}" height="10" rx="4" fill="${accent}" fill-opacity=".62"/>
  <path d="M${(x + 14).toFixed(2)} ${(y + 38).toFixed(2)}h${(width * 0.62).toFixed(2)}M${(x + 14).toFixed(2)} ${(y + 56).toFixed(2)}h${(width * 0.42).toFixed(2)}" stroke="${ink}" stroke-opacity=".13" stroke-width="4" stroke-linecap="round"/>
</g>`;
	}).join('');
}

function evidencePlane({ valueAt, ink, red, amber, teal, steel, secondary }) {
	const rails = Array.from({ length: 6 }, (_, index) => {
		const y = 168 + index * 92;
		return `<path d="M840 ${y}h590" stroke="${ink}" stroke-opacity="${index % 2 === 0 ? '.08' : '.045'}" stroke-width="2"/>`;
	}).join('');
	const gates = Array.from({ length: secondary ? 7 : 5 }, (_, index) => {
		const x = 880 + (index % 2) * 250 + valueAt(130 + index) * 48;
		const y = 148 + index * 86 + valueAt(150 + index) * 22;
		const width = 260 - (index % 2) * 34;
		const height = 54 + valueAt(170 + index) * 28;
		const accent = index % 3 === 0 ? red : index % 2 === 0 ? amber : teal;
		return `<g>
  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${width.toFixed(2)}" height="${height.toFixed(2)}" rx="11" fill="#F8F4EC" fill-opacity=".86" stroke="${ink}" stroke-opacity=".12"/>
  <path d="M${(x + 18).toFixed(2)} ${(y + 26).toFixed(2)}h${(width * 0.52).toFixed(2)}M${(x + 18).toFixed(2)} ${(y + 44).toFixed(2)}h${(width * 0.34).toFixed(2)}" stroke="${ink}" stroke-opacity=".16" stroke-width="4" stroke-linecap="round"/>
  <path d="M${(x + width - 42).toFixed(2)} ${(y + 12).toFixed(2)}v${(height - 24).toFixed(2)}" stroke="${accent}" stroke-opacity=".62" stroke-width="8" stroke-linecap="round"/>
</g>`;
	}).join('');
	const reviewGate = secondary
		? `<g>
  <rect x="1050" y="628" width="318" height="82" rx="18" fill="${steel}" fill-opacity=".12" stroke="${steel}" stroke-opacity=".34"/>
  <path d="M1090 668h198M1090 690h132" stroke="${ink}" stroke-opacity=".18" stroke-width="5" stroke-linecap="round"/>
  <circle cx="1324" cy="670" r="28" fill="${amber}" fill-opacity=".22" stroke="${amber}" stroke-opacity=".62" stroke-width="4"/>
</g>`
		: `<g>
  <circle cx="1076" cy="654" r="86" fill="${amber}" fill-opacity=".18" stroke="${amber}" stroke-opacity=".44" stroke-width="4"/>
  <path d="M1018 654h116M1076 596v116" stroke="${amber}" stroke-opacity=".54" stroke-width="6" stroke-linecap="round"/>
</g>`;
	return `${rails}${gates}${reviewGate}`;
}

function backgroundSignals({ valueAt, teal, amber, steel }) {
	return Array.from({ length: 54 }, (_, index) => {
		const cx = 120 + valueAt(200 + index * 3) * 1360;
		const cy = 112 + valueAt(201 + index * 3) * 668;
		const radius = 1.2 + valueAt(202 + index * 3) * 4.8;
		const color = index % 5 === 0 ? amber : index % 2 === 0 ? teal : steel;
		return `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${color}" fill-opacity=".16"/>`;
	}).join('');
}

async function buildSvg({ title, subtitle, outputPath, label, secondary }) {
	const seed = hashSeed(`${title}:${label}:${secondary}`);
	const values = randomValues(seed, 280);
	const valueAt = (index) => values[index % values.length];
	const ink = palette[0] ?? '#121417';
	const red = palette[1] ?? '#B84A3A';
	const amber = palette[2] ?? '#D8AD4C';
	const teal = palette[3] ?? '#2F8A86';
	const steel = palette[4] ?? '#496581';
	const safeTitle = escapeXml(title);
	const safeSubtitle = escapeXml(subtitle);
	const safeLabel = escapeXml(label);
	const diagonalBand = secondary
		? `<path d="M124 746C404 592 560 706 778 532C1002 354 1194 386 1464 180" stroke="${steel}" stroke-opacity=".22" stroke-width="64" stroke-linecap="round"/>`
		: `<path d="M164 210C410 352 584 248 778 400C970 550 1150 510 1418 652" stroke="${teal}" stroke-opacity=".18" stroke-width="58" stroke-linecap="round"/>`;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" fill="none">
  <desc>${safeLabel}: ${safeTitle}. ${safeSubtitle}</desc>
  <rect width="1600" height="900" rx="36" fill="#F5F1E8"/>
  <rect x="30" y="30" width="1540" height="840" rx="28" fill="#FBF8F2" stroke="${ink}" stroke-opacity=".10" stroke-width="2"/>
  <rect x="92" y="88" width="1416" height="724" rx="24" fill="url(#paper)" stroke="${ink}" stroke-opacity=".08"/>
  ${backgroundSignals({ valueAt, teal, amber, steel })}
  ${diagonalBand}
  <rect x="132" y="124" width="586" height="648" rx="24" fill="#FFFDFC" fill-opacity=".72" stroke="${ink}" stroke-opacity=".08"/>
  <rect x="812" y="124" width="652" height="648" rx="24" fill="#FFFDFC" fill-opacity=".62" stroke="${ink}" stroke-opacity=".08"/>
  <path d="M758 126v646" stroke="${ink}" stroke-opacity=".10" stroke-width="3"/>
  <path d="M774 172c52 82 52 176 0 276c52 96 52 172 0 266" stroke="${red}" stroke-opacity=".30" stroke-width="5" stroke-linecap="round"/>
  ${toolNodes({ valueAt, ink, red, amber, teal, steel, secondary })}
  ${latticePaths({ valueAt, teal, amber, steel })}
  ${evidencePlane({ valueAt, ink, red, amber, teal, steel, secondary })}
  <path d="M162 760h390" stroke="${teal}" stroke-opacity=".24" stroke-width="3" stroke-linecap="round"/>
  <path d="M848 760h430" stroke="${ink}" stroke-opacity=".12" stroke-width="3" stroke-linecap="round"/>
  <path d="M848 730h300" stroke="${red}" stroke-opacity=".34" stroke-width="4" stroke-linecap="round"/>
  <defs>
    <linearGradient id="paper" x1="92" y1="88" x2="1508" y2="812" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFDFC"/>
      <stop offset=".62" stop-color="#F8F1E7"/>
      <stop offset="1" stop-color="#ECE6DD"/>
    </linearGradient>
  </defs>
</svg>`;

	return writeImage(outputPath, svg);
}

const heroFormat = await buildSvg({
	title: manifest.title,
	subtitle: manifest.heroSubtitle,
	label: manifest.heroLabel ?? 'Primary tools plate',
	outputPath: path.resolve(manifest.hero.outputPath),
	secondary: false,
});

const supportFormat = await buildSvg({
	title: manifest.title,
	subtitle: manifest.supportSubtitle,
	label: manifest.supportLabel ?? 'Support tools plate',
	outputPath: path.resolve(manifest.support.outputPath),
	secondary: true,
});

console.log(
	JSON.stringify(
		{
			manifest: manifestPath,
			hero: path.resolve(manifest.hero.outputPath),
			support: path.resolve(manifest.support.outputPath),
			format: {
				hero: heroFormat,
				support: supportFormat,
			},
			idiom: 'collaboration-lattice',
		},
		null,
		2,
	),
);
