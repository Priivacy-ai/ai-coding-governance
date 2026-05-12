# Field Notes on AI Governance

Astro site for publishing reviewed AI-governance articles from the Obsidian source vault.

## Local commands

- `npm run dev`
- `npm run build`
- `npm run verify:local`

## Source vs Build Output

This repo uses the normal Astro split:

- `src/`: site source code and authored content
  - pages, components, layouts, styles
  - article content entries such as `src/content/articles/...`
- `public/`: static source assets copied through unchanged at build time
  - canonical generated image assets live here, for example:
    - `public/generated/articles/` for the governance-house image lane
    - `public/generated/tools/` for the weekly tools image lane
- `dist/`: generated build output from Astro
  - this is disposable and should not be treated as the source of truth

In practice:

- edit article markdown in `src/content/articles/`
- keep tracked image assets and local design briefs in `public/generated/...`
- expect Astro to copy those assets into `dist/generated/...` during `npm run build`

If a file exists only in `dist/`, it is a build artifact, not the canonical file agents should edit.

## Operational files

- `publication.config.json`: repo and Pages settings used by the controller-managed publishing workflow
- `docs/style-guide.md`: tone and voice source of truth
- `docs/design-system.md`: visual house style
- `docs/image-style-guide.md`: article image motif and governance visual idiom
- `docs/publishing-checklist.md`: release gate
- `scripts/render-openai-governance-images.mjs`: optional OpenAI GPT Image renderer for article visuals
- `scripts/render-governance-images.mjs`: local house-style fallback image renderer
- `scripts/verify-local-dist.mjs`: post-build verification helper
- `/Users/robert/CoWork/controller/scripts/gemini_design_review.sh`: optional Gemini CLI visual review helper used by the controller design agent
