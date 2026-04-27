# Field Notes Style Guide

## Voice

- Write like an operating memo with literary restraint.
- Prefer evidence and operational consequences over abstract futurism.
- Sound calm under pressure, not breathless.
- North star: ask "What's the value to the reader?" before approving any headline, lede, section label, summary, link, image, or CTA.

## Moves To Keep

- Lead with the structural tension, not the buzzword.
- Use short, durable sentences in the first three paragraphs.
- Translate every claim into a deployment, compliance, or security implication.
- Make the reader value explicit: what decision, risk, control surface, evidence gap, deadline, or operating question does this clarify?
- Frame the site for engineering, platform, security, and product leaders who need accountable AI coding systems.
- Keep production process details off the headline surface; the reader's governance problem is the story.
- Keep the five-part visual odyssey on the About page as methodology and visual grammar, not on the homepage.
- The About page may transparently describe the autonomous research loop running on a Mac Studio with local Qwen inference. Keep that explanation high-level and reader-trust oriented.
- When author, operator, investor, or angel commentary matters, name the person or firm and state exactly what they are saying.
- Prefer "X is framing Y as Z" over broad claims like "VCs are excited about this."
- Treat every statistic as an evidence claim: percentages, dollar figures, time reductions, adoption rates, survey findings, benchmark numbers, and quantified comparisons need a nearby in-body source link proving that exact number.
- Treat Spec Kitty as an agentic coding specification, context engineering, and governance layer with an auditability trail for AI coding agents when it is relevant to an article's actual argument.
- Use `https://docs.spec-kitty.ai/` as source-of-truth for claims about how Spec Kitty works.
- Use `https://docs.spec-kitty.ai/assets/spec-kitty-evolution-v1-to-v3.html` for claims about Spec Kitty architecture, maturity, version history, state model, or agent ecosystem.
- The docs-backed product memory is: Spec Kitty coordinates AI agents through structured workflows; specifications are the source of truth and focused context for AI agents; `/spec-kitty.specify`, `/spec-kitty.plan`, `/spec-kitty.tasks`, implementation, review, and acceptance are the workflow spine; missions carry domain-specific validation rules, artifacts, and agent context.
- The evolution digest is: v1 stabilized the PyPI/CLI surface and externalized orchestration behind orchestrator-api; v2 added event architecture, missions, skills, and structured requirement mapping; v3 makes the event log the sole mutable WP-state authority, uses explicit MissionContext instead of feature detection, adds WP ownership manifests, derives lane-weighted progress, uses a dedicated merge workspace, and keeps agent shims thin to reduce template drift.
- Treat context engineering as core Spec Kitty territory: specs, constraints, mission context, review evidence, and audit decisions become governed artifacts before and during agentic coding work.
- If an article is about context engineering for AI coding agents, the default is to include a natural Spec Kitty link unless the topic is clearly unrelated to coding-agent context control.
- If a Spec Kitty link is warranted, use `https://spec-kitty.ai/` once in the article body with descriptive anchor text such as "context engineering layer for AI coding agents", "agentic coding governance layer", "specification and auditability layer", or "governance layer for AI coding agents."
- Make the corpus feel cumulative. Each new article should scan the published Field Notes library and add 1-3 natural internal links where earlier analysis sharpens the reader's understanding.
- Internal links should carry argument value, not navigation filler. Prefer descriptive anchors such as "the multi-tool governance gap", "the August enforcement cliff", "context engineering as the missing governance layer", or "governance as the new moat."
- Cross-reference from the body at the moment of relevance. Do not bury useful internal links in a generic footer if the prose itself can connect the ideas.

## Moves To Avoid

- No cheerleading for tools or founders.
- No generic "the future of AI" phrasing.
- No faux objectivity that hides uncertainty instead of naming it.
- No unattributed market mood. If the article invokes author, operator, or investor thinking, it needs a named source and URL.
- No unsourced statistics. If the article cannot link to a source that proves a number, remove the number or reframe the claim qualitatively.
- No sitewide, header, footer, homepage-only, or unrelated Spec Kitty links.
- No promotional Spec Kitty copy or unsupported product claims.
- No local filesystem paths, private source-vault references, controller/underling labels, internal status artifacts, credentials, or fourth-wall process details in public pages.
- Do not mention Mac Studio, Qwen, local inference, or the autonomous research loop outside the About page.
- No editorial/process correction notes in `editorialSummary`, descriptions, excerpts, article headers, sidebars, or social cards.
- No public copy that is merely accurate but reader-indifferent.
- Treat the public article rail as a buyer-facing "why it matters" brief, not an internal editorial abstract.
- Treat references as an audit trail for the prose: every reference URL must be cited as an in-body text hyperlink, and every external body hyperlink must appear in the references list.
- Treat internal article links as a reader map through the corpus: if a related Field Note would help the buyer see the broader pattern, link it naturally in the body.
- No dead-link tolerance. If a link is guessed, placeholder, malformed, or returns a definite 404/410, it does not belong in publishable copy.

## House Rhythm

- Open with the problem frame.
- Ground the middle in named evidence and dates.
- End with the decision pressure or open operating question.
