import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		excerpt: z.string(),
		publishDate: z.coerce.date(),
		sourceDate: z.string(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		editorialSummary: z.string().default(''),
		heroImage: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
		supportImage: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
		references: z
			.array(
				z.object({
					label: z.string(),
					url: z.string().url(),
				}),
			)
			.default([]),
	}),
});

export const collections = { articles };
