# Tools Image Style Guide

## Core Thesis

Weekly tools-report images should feel related to the governance site's house system, but they should make a different argument.

The standard governance images translate ambiguous model-state into human-accountable evidence. Tools-report images should instead show the working surface where people, LLM agents, specifications, reviews, releases, and operating evidence coordinate around shared work.

The recurring idiom is **the collaboration lattice**: a structured field of handoffs, gates, traces, and evidence cards that makes tool-mediated cooperation legible without turning the market into a leaderboard or logo collage.

## Article-First Storytelling

Read the article first and identify:

- **Category tension:** what changed across the tool landscape this week.
- **Collaboration problem:** what humans and LLM agents are trying to coordinate.
- **Governance mechanism:** what turns tool activity into reviewable evidence.
- **Hero beat:** the primary market or category movement.
- **Support beat:** the second-order implication for teams adopting these tools.
- **Continuity:** both images should belong to the same collaboration lattice.
- **Difference:** the support image must develop the story rather than repeating the hero.
- **Site distinctness:** the pair should not reuse the same composition as prior Field Notes.

If the image could be attached unchanged to any weekly roundup, it is too generic.

For publication, use the OpenAI image renderer with article-specific prompts. The deterministic local renderer is only draft scaffolding for layout testing when API auth fails.

## Collaboration Lattice Idiom

Use **the collaboration lattice** as the recurring tools-report idiom.

It is not a product grid, a ranking board, or a set of company logos. It is a visual grammar:

- **Tool nodes:** abstract workbench modules, spec sheets, release cards, test gates, MCP/tool-call rails, terminal-like panes without readable text, and version tabs.
- **Human decision surfaces:** annotation pins, review brackets, handoff gates, approval marks, audit tabs, and steering lanes.
- **LLM activity surfaces:** token traces, context threads, planning paths, execution loops, and agent handoff arcs.
- **Governance connectors:** evidence rails, provenance links, release signal ribbons, comparison bands, and checkpoint notches.
- **Control motion:** activity should move through the lattice toward clearer shared decisions, but not toward perfect automation. The point is governed collaboration, not autonomous magic.
- **Accountability mark:** include an amber or red review gate, interrupt line, ledger tab, or checksum mark that suggests human authority without using literal warning icons.

The collaboration lattice can be radial, matrix-like, layered, diagonal, orbital, archival, or bench-like. Choose the composition that fits the weekly story.

## Canonical Reference Set

Treat the following files as the canonical examples of the tools-report idiom:

- `/public/generated/tools/2026-04-27-the-constraint-shift-when-ai-writes-90-of-code-governance-becomes-the-moat-hero.webp`
- `/public/generated/tools/2026-04-27-the-constraint-shift-when-ai-writes-90-of-code-governance-becomes-the-moat-support.webp`
- `/public/generated/tools/2026-04-28-weekly-tools-field-report-weekly-tools-field-report-compliance-pressure-meets-agent-coordination-hero.webp`
- `/public/generated/tools/2026-04-28-weekly-tools-field-report-weekly-tools-field-report-compliance-pressure-meets-agent-coordination-support.webp`

These belong in `/public/generated/tools/`, not `/public/generated/articles/`, because they define the distinct weekly-tools lane rather than the governance house lane.

## Exact Visual Idiom

When repeating this idiom, preserve these structural cues:

- **Flat editorial geometry:** broad, clean fields with minimal depth cues and almost no volumetric shading.
- **Paper-ground warmth:** a warm ivory background with subtle grain, as if printed on lightly textured stock.
- **Charcoal outlines:** dark charcoal or near-black stroke work that defines the primary shapes.
- **Muted teal routing lines:** thick and thin teal paths that read as data flow, handoff routes, or coordination lanes.
- **Amber document blocks:** small ochre or amber cards, tabs, folders, or inset modules standing in for specs, releases, or evidence packets.
- **Signal-red controls:** red brackets, gates, bars, corner marks, or interrupt rails that imply review authority and checkpoints.
- **Sparse UI symbolism:** boxes, tabs, sliders, brackets, folders, and ledger-like lines, but no readable interface text.
- **Poster-like composition:** strong negative space, crisp silhouette shapes, and a restrained number of elements.

For subject matter, keep the scene centered on **human/LLM collaboration surfaces**:

- houses, workbenches, rails, folders, brackets, ladders, gates, and path junctions are all acceptable metaphors
- avoid anthropomorphic agents, robot bodies, dashboards full of fake text, and glossy product mockups
- show collaboration as routing, staging, filtering, checkpointing, and bundling rather than as conversation bubbles or sci-fi beams

The images should feel like:

- a mid-century editorial systems diagram
- a spec-routing poster
- a governance-aware toolchain map

They should not feel like:

- the darker governance-house “translation chamber” images
- photoreal product marketing
- vector logo collages
- generic AI futurism

## Prompt Pattern

Adapt this pattern rather than copying it verbatim:

```text
Create an abstract editorial image about [weekly tool-landscape argument]. Show a collaboration lattice where human reviewers and LLM agents coordinate through specification sheets, release signal cards, review gates, evidence rails, and tool handoff paths. Make the image feel like a governed workbench for spec-driven development tools, not a leaderboard. Use warm ivory paper, charcoal ink, signal red, amber tabs, muted teal traces, and restrained steel-blue structure. No readable text, no logos, no robots.
```

Each hero/support prompt must include the phrase `collaboration lattice`.

## Article Mapping

- If the report is about integration breadth, show many tool handoff paths converging into a small number of reviewable operating surfaces.
- If the report is about compliance or regulation, show specification cards becoming audit evidence through gated review paths.
- If the report is about orchestration, show multiple agent loops routed through human steering lanes and checkpoint notches.
- If the report is about release velocity, show release signal ribbons entering a comparison lattice with evidence tabs.
- If the report is about funding or market momentum, show public signal cards being filtered through evidence rails, not hype graphics.
- If the report is about safety incidents, show interrupted execution paths caught by review gates and provenance ledgers.

## Avoid

- No logos, product marks, readable brand names, rankings, trophy imagery, or top-ten scoreboards.
- No robots, androids, humanoid silhouettes, eyes, faces, glowing brains, or neural-network stock art.
- No neon cyberpunk, purple vapor, fantasy portals, mystical oracle cues, or generic AI icons.
- No stock-photo boardrooms, handshakes, executives, laptop closeups, or startup collage imagery.
- No fake UI text or readable tool names.

## Alt Text

Alt text should describe the analyst argument:

`Abstract tools-landscape image showing human review gates and LLM agent traces coordinating through a collaboration lattice for spec-driven development tools.`

Avoid alt text that describes a literal product interface, ranking chart, or real tool logo.
