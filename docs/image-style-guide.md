# Image Style Guide

## Core Thesis

Article images should bridge two perceptual worlds:

- The interior world an LLM might use to model itself: latent probability fields, recursive attention, memory fragments, context windows, tool-call paths, and distributed traces.
- The exterior world humans project onto it: a governed black box, audit artifact, compliance object, collaborator behind glass, or system that must become legible before it can be trusted.

The image should never answer "what does AI look like?" with a face, robot, glowing brain, or mystical oracle. It should answer "what does this article's governance problem make visible?"

## Article-First Storytelling

The article comes before the idiom. Read the article carefully, identify its governing tension, then decide what visual story will make that tension easier to feel.

Before writing image prompts, define:

- **Article tension:** the central pressure, conflict, or decision problem in the text.
- **Governance transformation:** what must become visible, auditable, bounded, slowed down, escalated, or made accountable.
- **Hero beat:** the first image's job. Usually this should establish the article's main pressure.
- **Support beat:** the second image's job. Usually this should develop the consequence, mechanism, failure mode, or governance response.
- **Continuity:** the two images should clearly belong to the same visual world.
- **Difference:** the second image must not be a near-repeat; it should add a second sentence to the visual story.
- **Site distinctness:** the pair must not repeat the same composition already used by another published article.

If the image concept could be attached unchanged to any article on the site, it is too generic.

For publication, the image agent must use the OpenAI image renderer with article-specific prompts. The deterministic local renderer is only draft scaffolding for layout testing when API auth fails; it must not be treated as final article imagery.

## Governance Idiom

Use **the translation chamber** as the recurring governance idiom, but do not treat it as a fixed left-to-right diagram.

The translation chamber is a liminal interface where nonhuman model-state becomes human-accountable evidence. It is not a room with people in it. It is a visual grammar:

- **Model-space side:** probability dust, attention filaments, context shards, recursive grids, token constellations, and tool-call paths.
- **Boundary:** glass membrane, vellum overlay, checksum seam, aperture, gate, or inspection plane.
- **Governance side:** paper dossier layers, audit cards, annotation pins, compliance gates, provenance rails, decision ledgers, and timestamp strips.
- **Control motion:** traces should move from ambiguous interior signal into more legible evidence surfaces, but never become perfectly clean. Governance is translation under uncertainty, not magic.
- **Accountability mark:** include a red or amber gate, seal, bracket, ledger notch, or interrupt line that suggests review authority without using literal warning icons.

The translation can be radial, vertical, layered, fractured, spiral, map-like, threshold-like, archival, or sequential. Use the composition that best fits the article.

Examples:

- **Deadline cliff:** narrowing apertures, stacked timestamp rails, pressure seams, or compressed evidence windows.
- **Context engineering:** nested context windows, retrieval paths, memory shards, compression artifacts, and boundary loss.
- **Code-level controls:** diff seams, provenance cards, test gates, repository-like ledgers, and tool-call traces.
- **Failure rates:** fractured model traces, unresolved fragments, broken evidence capture, and partial containment.
- **Market or investor signals:** external commentary as indexed signal cards feeding an accountable evidence surface.

## Prompt Pattern

For each article, adapt this pattern rather than copying it verbatim:

```text
Create an abstract editorial image about [article argument]. Show a translation chamber where [article-specific model behavior or risk] moves from interior LLM model-space into human-facing governance evidence. Include latent probability fields, attention traces, context shards, and tool-call paths crossing a translucent boundary into paper dossiers, audit cards, compliance gates, provenance rails, and annotation marks. Use warm ivory paper, charcoal ink, signal red, amber tabs, and muted cyan traces. The mood is calm, precise, uncanny, and accountable. No readable text.
```

Do not use this exact spatial layout for every article. Preserve the conceptual grammar, not the diagram.

## Article Mapping

- If the article is about deadlines, show pressure through gates, calendar-like rails, narrowing apertures, or stacked review timestamps.
- If the article is about code-level controls, show traces flowing into repository-like ledgers, diff seams, test gates, and provenance cards.
- If the article is about context engineering, show memory shards, context windows, retrieval paths, and compression artifacts crossing into a review dossier.
- If the article is about investor or market signals, show external commentary as indexed signal cards feeding the human-facing side, not as hype or crowd imagery.
- If the article is about failure rates or deployment risk, show fractured traces that are partially caught by evidence surfaces and partially left unresolved.

## Avoid

- No robots, androids, humanoid silhouettes, eyes, faces, glowing brains, or neural-network stock art.
- No neon cyberpunk, purple vapor, fantasy portals, or mystical oracle cues.
- No stock-photo boardrooms, handshakes, executives, laptops in conference rooms, or generic startup imagery.
- No readable words, logos, product marks, or fake UI text.

## Alt Text

Alt text should describe the argument, not the decorative mechanics. Prefer:

`Abstract governance image showing model-state traces crossing into human audit evidence for an article about [topic].`

Avoid alt text that claims the image depicts a literal AI mind, a robot, or a real interface.
