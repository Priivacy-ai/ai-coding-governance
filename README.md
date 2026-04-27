# Field Notes on AI Governance

Astro site for publishing reviewed AI-governance articles from the Obsidian source vault.

## Local commands

- `npm run dev`
- `npm run build`
- `npm run verify:local`

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
