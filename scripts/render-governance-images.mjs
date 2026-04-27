import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

function usage() {
	console.error('usage: node render-governance-images.mjs --manifest <path>');
	process.exit(2);
}

const args = process.argv.slice(2);
const manifestIndex = args.indexOf('--manifest');
if (manifestIndex === -1 || !args[manifestIndex + 1]) {
	usage();
}

const manifestPath = path.resolve(args[manifestIndex + 1]);
const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const palette = manifest.palette ?? ['#11131A', '#D84E3D', '#D49D2F', '#2F98A5'];

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
	if (path.extname(outputPath).toLowerCase() === '.png') {
		await sharp(Buffer.from(svg)).png().toFile(outputPath);
		return 'png';
	}
	await fs.writeFile(outputPath, svg, 'utf8');
	return 'svg';
}

function modelSpace({ cyan, valueAt }) {
	const dust = Array.from({ length: 46 }, (_, index) => {
		const cx = 126 + valueAt(index * 3) * 574;
		const cy = 118 + valueAt(index * 3 + 1) * 664;
		const radius = 1.6 + valueAt(index * 3 + 2) * 5.8;
		const opacity = 0.16 + valueAt(index * 3 + 3) * 0.34;
		return `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${cyan}" fill-opacity="${opacity.toFixed(2)}" />`;
	}).join('');
	const attentionTraces = Array.from({ length: 12 }, (_, index) => {
		const y1 = 150 + valueAt(60 + index * 5) * 590;
		const y2 = 150 + valueAt(61 + index * 5) * 590;
		const x1 = 136 + valueAt(62 + index * 5) * 265;
		const x2 = 470 + valueAt(63 + index * 5) * 260;
		const c1 = x1 + 120 + valueAt(64 + index * 5) * 90;
		const c2 = x2 - 80 - valueAt(65 + index * 5) * 80;
		const width = 1.2 + valueAt(66 + index * 5) * 3.2;
		return `<path d="M${x1.toFixed(2)} ${y1.toFixed(2)} C${c1.toFixed(2)} ${(y1 - 120).toFixed(2)} ${c2.toFixed(2)} ${(y2 + 140).toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}" stroke="${cyan}" stroke-opacity=".34" stroke-width="${width.toFixed(2)}" stroke-linecap="round"/>`;
	}).join('');
	const contextShards = Array.from({ length: 11 }, (_, index) => {
		const x = 145 + valueAt(95 + index * 4) * 450;
		const y = 130 + valueAt(96 + index * 4) * 600;
		const width = 56 + valueAt(97 + index * 4) * 132;
		const height = 14 + valueAt(98 + index * 4) * 44;
		const rotate = -18 + valueAt(99 + index * 4) * 36;
		return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${width.toFixed(2)}" height="${height.toFixed(2)}" rx="5" fill="#F7FBFA" fill-opacity=".28" stroke="${cyan}" stroke-opacity=".28" transform="rotate(${rotate.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)})"/>`;
	}).join('');

	return `${dust}
  ${contextShards}
  ${attentionTraces}
  <path d="M186 666c118-94 212-34 316-86 86-44 102-140 210-164" stroke="${cyan}" stroke-opacity=".24" stroke-width="18" stroke-linecap="round"/>
  <path d="M246 238c104 42 214 10 318 72 86 52 94 132 178 172" stroke="${cyan}" stroke-opacity=".18" stroke-width="12" stroke-linecap="round"/>`;
}

function transferField({ amber, cyan, valueAt }) {
	return Array.from({ length: 9 }, (_, index) => {
		const y = 180 + valueAt(125 + index * 4) * 520;
		const targetY = 170 + valueAt(126 + index * 4) * 540;
		const opacity = 0.18 + valueAt(127 + index * 4) * 0.34;
		const color = index % 3 === 0 ? amber : cyan;
		return `<path d="M${(500 + valueAt(index) * 130).toFixed(2)} ${y.toFixed(2)} C700 ${(y - 60).toFixed(2)} 780 ${(targetY + 80).toFixed(2)} 915 ${targetY.toFixed(2)}" stroke="${color}" stroke-opacity="${opacity.toFixed(2)}" stroke-width="${(2 + valueAt(128 + index * 4) * 4).toFixed(2)}" stroke-linecap="round"/>`;
	}).join('');
}

function auditSpace({ amber, ink, red, valueAt }) {
	const ledgerRails = Array.from({ length: 6 }, (_, index) => {
		const y = 175 + index * 96;
		return `<path d="M855 ${y}h565" stroke="${ink}" stroke-opacity="${index % 2 === 0 ? '.07' : '.045'}" stroke-width="2"/>`;
	}).join('');
	const auditCards = Array.from({ length: 7 }, (_, index) => {
		const x = 900 + (index % 2) * 230 + valueAt(145 + index) * 70;
		const y = 142 + index * 82 + valueAt(152 + index) * 20;
		const width = 305 - (index % 2) * 36;
		const height = 56 + valueAt(160 + index) * 42;
		const ruleY = y + 20 + valueAt(168 + index) * 12;
		return `<g>
  <rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${width.toFixed(2)}" height="${height.toFixed(2)}" rx="10" fill="#FFFDFC" fill-opacity=".74" stroke="${ink}" stroke-opacity=".12"/>
  <path d="M${(x + 20).toFixed(2)} ${ruleY.toFixed(2)}h${(width * 0.56).toFixed(2)}" stroke="${ink}" stroke-opacity=".18" stroke-width="3" stroke-linecap="round"/>
  <path d="M${(x + 20).toFixed(2)} ${(ruleY + 18).toFixed(2)}h${(width * 0.38).toFixed(2)}" stroke="${ink}" stroke-opacity=".10" stroke-width="3" stroke-linecap="round"/>
  <rect x="${(x + width - 46).toFixed(2)}" y="${(y + 15).toFixed(2)}" width="22" height="${(height - 30).toFixed(2)}" rx="4" fill="${index % 2 === 0 ? red : amber}" fill-opacity=".68"/>
</g>`;
	}).join('');
	const glyphs = Array.from({ length: 20 }, (_, index) => {
		const x = 890 + valueAt(30 + index) * 545;
		const y = 122 + valueAt(50 + index) * 620;
		const height = 6 + valueAt(70 + index) * 26;
		return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(2 + valueAt(80 + index) * 5).toFixed(2)}" height="${height.toFixed(2)}" rx="2" fill="${ink}" fill-opacity=".12"/>`;
	}).join('');

	return `${ledgerRails}
  ${auditCards}
  ${glyphs}`;
}

async function buildSvg({ title, subtitle, accent, outputPath, label, secondary }) {
	const seed = hashSeed(`${title}:${label}:${secondary}`);
	const values = randomValues(seed, 180);
	const safeTitle = escapeXml(title);
	const safeSubtitle = escapeXml(subtitle);
	const safeLabel = escapeXml(label);
	const ink = palette[0] ?? '#11131A';
	const red = palette[1] ?? '#D84E3D';
	const amber = palette[2] ?? '#D49D2F';
	const cyan = palette[3] ?? '#2F98A5';
	const valueAt = (index) => values[index % values.length];
	const gateY = secondary ? 520 : 350;
	const gateColor = secondary ? amber : red;
	const membraneShift = secondary ? 22 : -8;
	const secondaryOverlay = secondary
		? `<g opacity=".88">
    <path d="M1450 142C1248 210 1240 394 1088 488C982 554 894 612 850 744" stroke="${amber}" stroke-opacity=".34" stroke-width="58" stroke-linecap="round"/>
    <path d="M1426 210C1252 260 1250 402 1116 492C1012 562 934 616 904 718" stroke="${red}" stroke-opacity=".26" stroke-width="22" stroke-linecap="round"/>
    <rect x="930" y="154" width="456" height="492" rx="30" fill="${amber}" fill-opacity=".18" stroke="${amber}" stroke-opacity=".42"/>
    <path d="M990 246h304M990 306h244M990 366h330M990 426h206M990 486h278" stroke="${ink}" stroke-opacity=".22" stroke-width="6" stroke-linecap="round"/>
    <path d="M1016 184v428M1080 184v428M1144 184v428M1208 184v428M1272 184v428M1336 184v428" stroke="${ink}" stroke-opacity=".055" stroke-width="2"/>
    <rect x="1160" y="650" width="246" height="74" rx="18" fill="${red}" fill-opacity=".12" stroke="${red}" stroke-opacity=".34"/>
    <circle cx="1008" cy="676" r="64" fill="${amber}" fill-opacity=".20" stroke="${amber}" stroke-opacity=".44" stroke-width="4"/>
    <path d="M970 676h76M1008 638v76" stroke="${amber}" stroke-opacity=".52" stroke-width="5" stroke-linecap="round"/>
  </g>`
		: `<g opacity=".78">
    <circle cx="316" cy="316" r="168" fill="${cyan}" fill-opacity=".10"/>
    <path d="M168 314c96-88 196-88 300 0s206 88 306 0" stroke="${cyan}" stroke-opacity=".22" stroke-width="22" stroke-linecap="round"/>
  </g>`;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" fill="none">
  <desc>${safeLabel}: ${safeTitle}. ${safeSubtitle}</desc>
  <rect width="1600" height="900" rx="36" fill="#F5F1E8"/>
  <rect x="28" y="28" width="1544" height="844" rx="28" fill="#FBF8F2" stroke="${ink}" stroke-opacity=".10" stroke-width="2"/>
  <rect x="86" y="88" width="1428" height="724" rx="24" fill="url(#panel)"/>
  <rect x="112" y="112" width="642" height="676" rx="24" fill="url(#modelSpace)" stroke="${cyan}" stroke-opacity=".10"/>
  <rect x="846" y="112" width="642" height="676" rx="24" fill="#FFFDFC" fill-opacity=".62" stroke="${ink}" stroke-opacity=".08"/>
  ${modelSpace({ cyan, valueAt })}
  <g opacity=".82">
    <rect x="${(760 + membraneShift).toFixed(2)}" y="104" width="86" height="692" rx="28" fill="url(#membrane)" stroke="${ink}" stroke-opacity=".12"/>
    <path d="M${(803 + membraneShift).toFixed(2)} 138v624" stroke="#FFFFFF" stroke-opacity=".65" stroke-width="2"/>
    <path d="M${(781 + membraneShift).toFixed(2)} 160c42 80 42 170 0 252 42 80 42 174 0 268" stroke="${cyan}" stroke-opacity=".30" stroke-width="3"/>
  </g>
  ${transferField({ amber, cyan, valueAt })}
  ${auditSpace({ amber, ink, red, valueAt })}
  ${secondaryOverlay}
  <g>
    <path d="M872 ${gateY - 104}v208" stroke="${gateColor}" stroke-opacity=".78" stroke-width="10" stroke-linecap="round"/>
    <path d="M872 ${gateY - 104}h82" stroke="${gateColor}" stroke-opacity=".78" stroke-width="10" stroke-linecap="round"/>
    <path d="M872 ${gateY + 104}h82" stroke="${gateColor}" stroke-opacity=".78" stroke-width="10" stroke-linecap="round"/>
    <circle cx="966" cy="${gateY}" r="42" fill="${gateColor}" fill-opacity=".10" stroke="${gateColor}" stroke-opacity=".45" stroke-width="3"/>
    <path d="M943 ${gateY}h46M966 ${gateY - 23}v46" stroke="${gateColor}" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>
  </g>
  <path d="M130 760h380" stroke="${cyan}" stroke-opacity=".24" stroke-width="3" stroke-linecap="round"/>
  <path d="M910 760h420" stroke="${ink}" stroke-opacity=".12" stroke-width="3" stroke-linecap="round"/>
  <path d="M910 730h300" stroke="${accent}" stroke-opacity=".42" stroke-width="4" stroke-linecap="round"/>
  <defs>
    <linearGradient id="panel" x1="86" y1="88" x2="1514" y2="812" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFDFC"/>
      <stop offset="1" stop-color="#F2EBDF"/>
    </linearGradient>
    <linearGradient id="modelSpace" x1="112" y1="112" x2="754" y2="788" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18222A"/>
      <stop offset=".52" stop-color="#233139"/>
      <stop offset="1" stop-color="#F3EDE3"/>
    </linearGradient>
    <linearGradient id="membrane" x1="760" y1="104" x2="846" y2="796" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF" stop-opacity=".72"/>
      <stop offset=".5" stop-color="#DCECEA" stop-opacity=".44"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity=".66"/>
    </linearGradient>
  </defs>
</svg>`;

	return writeImage(outputPath, svg);
}

const heroFormat = await buildSvg({
	title: manifest.title,
	subtitle: manifest.heroSubtitle,
	accent: palette[1] ?? '#D84E3D',
	label: manifest.heroLabel ?? 'Primary plate',
	outputPath: path.resolve(manifest.hero.outputPath),
	secondary: false,
});

const supportFormat = await buildSvg({
	title: manifest.title,
	subtitle: manifest.supportSubtitle,
	accent: palette[2] ?? '#D49D2F',
	label: manifest.supportLabel ?? 'Support plate',
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
			idiom: 'translation-chamber',
		},
		null,
		2,
	),
);
