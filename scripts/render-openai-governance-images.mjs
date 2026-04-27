import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

function usage() {
	console.error('usage: node render-openai-governance-images.mjs --manifest <path>');
	process.exit(2);
}

const args = process.argv.slice(2);
const manifestIndex = args.indexOf('--manifest');
if (manifestIndex === -1 || !args[manifestIndex + 1]) {
	usage();
}

const manifestPath = path.resolve(args[manifestIndex + 1]);
const defaultControllerEnvFile = path.resolve(
	path.dirname(new URL(import.meta.url).pathname),
	'..',
	'..',
	'..',
	'controller',
	'.env.local',
);

function parseEnvLine(line) {
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
		return null;
	}
	const [rawKey, ...rawValueParts] = trimmed.split('=');
	const key = rawKey.trim();
	if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
		return null;
	}
	let value = rawValueParts.join('=').trim();
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		value = value.slice(1, -1);
	}
	return { key, value };
}

async function loadEnvFile(envPath) {
	try {
		const text = await fs.readFile(envPath, 'utf8');
		for (const line of text.split(/\r?\n/)) {
			const parsed = parseEnvLine(line);
			if (parsed && process.env[parsed.key] === undefined) {
				process.env[parsed.key] = parsed.value;
			}
		}
		return true;
	} catch (error) {
		if (error?.code === 'ENOENT') {
			return false;
		}
		throw error;
	}
}

await loadEnvFile(path.resolve(process.env.CONTROLLER_ENV_FILE ?? defaultControllerEnvFile));
await loadEnvFile(path.resolve(process.env.SITE_ENV_FILE ?? path.join(path.dirname(manifestPath), '..', '..', '.env.local')));
if (!process.env.OPENAI_API_KEY && process.env.OPENAI_KEY) {
	process.env.OPENAI_API_KEY = process.env.OPENAI_KEY;
}

const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
const openai = manifest.openai ?? {};
const statusPath = path.resolve(openai.statusPath ?? path.join(path.dirname(manifestPath), 'openai-image-render.json'));
const endpoint = process.env.OPENAI_IMAGE_ENDPOINT ?? openai.endpoint ?? 'https://api.openai.com/v1/images/generations';
const model = process.env.OPENAI_IMAGE_MODEL ?? openai.model ?? 'gpt-image-2';
const outputFormat = process.env.OPENAI_IMAGE_OUTPUT_FORMAT ?? openai.outputFormat ?? 'png';
const size = process.env.OPENAI_IMAGE_SIZE ?? openai.size ?? '1024x1024';
const enabled = String(process.env.OPENAI_IMAGE_ENABLED ?? openai.enabled ?? '1').toLowerCase();

async function writeStatus(status) {
	const payload = {
		generatedAt: new Date().toISOString(),
		model,
		endpoint,
		manifest: manifestPath,
		...status,
	};
	await fs.mkdir(path.dirname(statusPath), { recursive: true });
	await fs.writeFile(statusPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
	console.log(JSON.stringify(payload, null, 2));
}

function buildFallbackPrompt(kind) {
	const label = kind === 'hero' ? (manifest.heroLabel ?? 'Primary plate') : (manifest.supportLabel ?? 'Support plate');
	const subtitle = kind === 'hero' ? manifest.heroSubtitle : manifest.supportSubtitle;
	const palette = (manifest.palette ?? []).join(', ');
	return [
		`Create an abstract editorial image for an AI governance article titled "${manifest.title}".`,
		`Use the label "${label}" and reflect this article-specific cue: ${subtitle}.`,
		`House style: a translation chamber where interior LLM model-space becomes human-accountable evidence.`,
		`Show latent probability fields, attention traces, memory shards, and tool-call paths crossing a translucent boundary into dossiers, audit cards, compliance gates, and provenance rails.`,
		`Palette cues: ${palette}.`,
		'Do not include robots, glowing brains, neon cyberpunk, stock photography, logos, or readable brand names.',
	].join(' ');
}

function requestBody(prompt) {
	const body = {
		model,
		prompt,
		n: 1,
		size,
		output_format: outputFormat,
	};
	const quality = process.env.OPENAI_IMAGE_QUALITY ?? openai.quality;
	if (quality) {
		body.quality = quality;
	}
	const background = process.env.OPENAI_IMAGE_BACKGROUND ?? openai.background;
	if (background) {
		body.background = background;
	}
	const moderation = process.env.OPENAI_IMAGE_MODERATION ?? openai.moderation;
	if (moderation) {
		body.moderation = moderation;
	}
	return body;
}

async function writeImageBytes(outputPath, bytes, imageConfig) {
	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	const normalize = imageConfig.normalize ?? manifest.imageNormalize ?? {
		width: 1600,
		height: 900,
		fit: 'cover',
	};
	const ext = path.extname(outputPath).toLowerCase();
	if (normalize !== false) {
		const pipeline = sharp(bytes).resize(normalize.width ?? 1600, normalize.height ?? 900, {
			fit: normalize.fit ?? 'cover',
			position: normalize.position ?? 'center',
		});
		if (ext === '.webp') {
			await pipeline.webp({ quality: normalize.quality ?? 92 }).toFile(outputPath);
			return;
		}
		if (ext === '.jpg' || ext === '.jpeg') {
			await pipeline.jpeg({ quality: normalize.quality ?? 92 }).toFile(outputPath);
			return;
		}
		await pipeline.png().toFile(outputPath);
		return;
	}
	await fs.writeFile(outputPath, bytes);
}

async function imageBytesFromResult(result) {
	if (result?.b64_json) {
		return Buffer.from(result.b64_json, 'base64');
	}
	if (result?.url) {
		const response = await fetch(result.url);
		if (!response.ok) {
			throw new Error(`image URL fetch failed: HTTP ${response.status}`);
		}
		return Buffer.from(await response.arrayBuffer());
	}
	throw new Error('OpenAI response did not include b64_json or url image data');
}

async function generateImage(kind, imageConfig) {
	const prompt = imageConfig.prompt ?? buildFallbackPrompt(kind);
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody(prompt)),
	});
	const bodyText = await response.text();
	let body;
	try {
		body = JSON.parse(bodyText);
	} catch {
		body = { raw: bodyText };
	}
	if (!response.ok) {
		const message = body?.error?.message ?? bodyText.slice(0, 400);
		throw new Error(`OpenAI image generation failed for ${kind}: HTTP ${response.status}: ${message}`);
	}
	const bytes = await imageBytesFromResult(body?.data?.[0]);
	const outputPath = path.resolve(imageConfig.outputPath);
	await writeImageBytes(outputPath, bytes, imageConfig);
	return {
		kind,
		outputPath,
		promptLength: prompt.length,
		revisedPrompt: body?.data?.[0]?.revised_prompt ?? null,
	};
}

if (enabled === '0' || enabled === 'false' || enabled === 'no') {
	await writeStatus({ status: 'skipped-disabled', assets: [] });
	process.exit(0);
}

if (!process.env.OPENAI_API_KEY) {
	await writeStatus({ status: 'skipped-auth', assets: [], error: 'OPENAI_API_KEY or OPENAI_KEY is not configured' });
	process.exit(0);
}

try {
	const assets = [];
	assets.push(await generateImage('hero', manifest.hero));
	assets.push(await generateImage('support', manifest.support));
	await writeStatus({ status: 'complete', assets });
} catch (error) {
	await writeStatus({
		status: 'failed',
		assets: [],
		error: error instanceof Error ? error.message : String(error),
	});
}
