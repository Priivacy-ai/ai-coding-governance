import { getCollection, type CollectionEntry } from 'astro:content';

const DRAFT_PREVIEW_VALUES = new Set(['1', 'true', 'yes']);

export const includeDraftArticles =
	import.meta.env.DEV ||
	DRAFT_PREVIEW_VALUES.has(String(process.env.SHOW_DRAFT_ARTICLES ?? '').toLowerCase());

export function isVisibleArticle(article: CollectionEntry<'articles'>) {
	if (article.id === 'pipeline-status' || article.data.tags.includes('system')) {
		return false;
	}

	return includeDraftArticles || !article.data.draft;
}

export async function getVisibleArticles() {
	return (await getCollection('articles'))
		.filter(isVisibleArticle)
		.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
