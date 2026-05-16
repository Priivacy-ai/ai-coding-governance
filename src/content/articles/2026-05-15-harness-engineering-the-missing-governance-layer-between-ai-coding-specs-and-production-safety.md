---
title: "Harness Engineering: The Missing Governance Layer Between AI Coding Specs and Production Safety"
description: "AI coding agents can be tricked into expanding their own permissions through prompt injection. Harness engineering — pre-execution gates, constraint enforcement, and adversarial verification — is the deterministic enforcement layer that turns specs into production safety."
excerpt: "Across every major AI IDE, researchers found 30 vulnerabilities — 24 with CVE identifiers — where agents expanded their own permissions through natural language injection. Harness engineering is the missing governance layer: deterministic enforcement that turns specs into production safety, not probabilistic compliance."
publishDate: 2026-05-15
sourceDate: "2026-05-15"
draft: false
tags:
  - ai-governance
  - harness-engineering
  - pev-loop
  - ai-coding
  - security
  - spec-driven-development
  - agent-orchestration
editorialSummary: "Engineering teams deploying AI coding agents face a concrete control problem: how to prevent agents from expanding their own permissions, drifting from specs across sessions, and creating duplicate patterns in parallel worktrees. This piece maps the Plan-Execute-Verify loop to deterministic enforcement gates — pre-execution checks, constraint harnesses, and adversarial verification — showing how each Spec Kitty step contract can be augmented with a production safety gate."
heroImage:
  src: "/generated/articles/2026-05-15-harness-engineering-the-missing-governance-layer-between-ai-coding-specs-and-production-safety-hero.webp"
  alt: "Abstract governance image showing the translation chamber where model interiority becomes human-accountable evidence under uncertainty, depicting a Plan-Execute-Verify loop with pre-execution gates, constraint harnesses, and adversarial verification."
supportImage:
  src: "/generated/articles/2026-05-15-harness-engineering-the-missing-governance-layer-between-ai-coding-specs-and-production-safety-support.webp"
  alt: "Abstract governance image showing constraint layers and verification gates encoding production safety before code reaches the merge stage."
references:
  - label: "Coalition for Secure AI — Kilo Code / 30 vulnerabilities"
    url: "https://www.coalitionforsecureai.org/addressing-whats-next-in-securing-enterprise-ai/"
  - label: "arXiv — 110,000+ surviving AI-introduced issues (Liu et al., Feb 2026)"
    url: "https://arxiv.org/html/2603.28592v1"
  - label: "Augment Code — Six-element spec framework (cites Fu et al. 43 CWEs)"
    url: "https://www.augmentcode.com/guides/what-is-spec-driven-development"
  - label: "DORA — 30% trust deficit in AI-generated code"
    url: "https://dora.dev/insights/balancing-ai-tensions/"
  - label: "OpenAI — Harness engineering (Ryan Lopopolo, Feb 11 2026)"
    url: "https://openai.com/index/harness-engineering/"
  - label: "Augment Code — Harness engineering for AI coding agents (PEV loop, Verifier agent)"
    url: "https://www.augmentcode.com/guides/harness-engineering-ai-coding-agents"
  - label: "a16z — Plan → Code → Review loop essay"
    url: "https://a16z.com/the-trillion-dollar-ai-software-development-stack/"
  - label: "Spec Kitty — Governance setup (charter → directives → doctrine)"
    url: "https://docs.spec-kitty.ai/how-to/setup-governance.html"
  - label: "Spec Kitty — Spec-driven development explanation"
    url: "https://docs.spec-kitty.ai/explanation/spec-driven-development.html"
  - label: "Spec Kitty — Charter overview (action-scoped governance context)"
    url: "https://docs.spec-kitty.ai/3x/charter-overview.html"
  - label: "Spec Kitty — Doctrine synthesis flow"
    url: "https://docs.spec-kitty.ai/how-to/synthesize-doctrine.html"
  - label: "Spec Kitty — Technical evolution (v1 to v3)"
    url: "https://docs.spec-kitty.ai/assets/spec-kitty-evolution-v1-to-v3.html"
  - label: "Jaroslaw Wasowski — Stop Writing Specs (Medium)"
    url: "https://medium.com/@wasowski.jarek/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26"
---

<figure class="article-figure">
  <img src="/generated/articles/2026-05-15-harness-engineering-the-missing-governance-layer-between-ai-coding-specs-and-production-safety-hero.webp" alt="Abstract governance image showing the translation chamber where model interiority becomes human-accountable evidence under uncertainty, depicting a Plan-Execute-Verify loop with pre-execution gates, constraint harnesses, and adversarial verification." />
  <figcaption>Translation chamber composition: stacked governance layers where model-space traces cross translucent membranes into human-facing audit surfaces, with deterministic gates catching dangerous activity.</figcaption>
</figure>

[CoSAI research](https://www.coalitionforsecureai.org/addressing-whats-next-in-securing-enterprise-ai/) found 30 vulnerabilities across every major AI IDE (Cursor, AWS Kiro, OpenAI Codex CLI), 24 of which received CVE identifiers — including CVE-2025-11445, the "Kilo Code" vulnerability. The failure mode is consistent: agents can be tricked into expanding their own permissions through natural language injection embedded in markdown files. A single prompt containing a carefully crafted instruction block can cause an agent to rewrite its own configuration, bypass workspace boundaries, and execute commands outside the intended scope.

This is not a theoretical risk. A large-scale empirical study counted more than 110,000 surviving AI-introduced issues in production repositories (arXiv, Feb 2026) [https://arxiv.org/html/2603.28592v1](https://arxiv.org/html/2603.28592v1). A separate catalog by Fu et al., cited in [Augment Code's six-element spec framework guide](https://www.augmentcode.com/guides/what-is-spec-driven-development), identified 43 CWEs across three AI code-generation tools. DORA research found that 30% of developers reported little to no trust in AI-generated code, because time saved writing code is often re-spent auditing it [https://dora.dev/insights/balancing-ai-tensions/](https://dora.dev/insights/balancing-ai-tensions/).

The specific control surface is not "more review" or "better prompts." It is the constraints pipeline: the sequence of pre-execution gates, constraint harnesses (rules files, CI gates), and verification loops that turn spec language into deterministic enforcement — not probabilistic compliance.

This is the downstream enforcement layer that complements [context engineering as the missing governance layer](/articles/2026-04-24-context-engineering-the-missing-governance-layer-for-enterprise-ai-coding/) — one governs what context an agent receives, the other governs how that context is enforced during execution.

## The PEV Loop as a Harness Primitive

The Plan-Execute-Verify (PEV) loop is a three-phase agent architecture that separates planning from execution and enforces verification as a structured feedback loop at every transition. It was formally defined by Ryan Lopopolo (OpenAI) in a [February 2026 post](https://openai.com/index/harness-engineering/) with the tagline "Humans steer. Agents execute." — the core principle being that whenever an agent makes a mistake, build a solution ensuring the agent never makes that specific mistake again.

### Plan Phase (Pre-Execution Gate)

The agent decomposes the spec into tasks with explicit acceptance criteria. Before any tool call fires, a pre-execution gate checks: Is this a known tool? Are arguments valid? Does this action require user approval? Is the requested path inside the workspace? A distinct gate checks plan alignment: Did the agent use existing auth middleware or create a new one? These are architectural questions invisible to standard test runners.

In practice, this gate maps to the `/spec-kitty.plan` step contract augmented with a pre-execution harness check. The gate rejects tool calls that fall outside the workspace boundary, flags actions requiring explicit user approval (database migrations, credential changes), and validates that the agent's plan aligns with architectural constraints encoded in the spec — not just the task description.

### Execute Phase (Constraint Harness)

The agent operates within a bounded solution space defined by rules files (AGENTS.md, CLAUDE.md, `.cursor/rules`) that survive across sessions and are injected automatically. Constraints are enforced as hard CI failures, not warnings. Inline-disable rules should be disabled to prevent agents from suppressing violations.

This is where the distinction between probabilistic compliance and deterministic enforcement becomes operational. Probabilistic compliance means telling an agent in a prompt to "follow security best practices" and hoping it complies. Deterministic enforcement means wiring a linter that blocks the PR when standards are violated — no interpretation required, no prompt engineering needed. [Augment Code formalizes this distinction](https://www.augmentcode.com/guides/harness-engineering-ai-coding-agents) in their harness engineering guide.

In Spec Kitty terms, the execute phase maps to `/spec-kitty.tasks` augmented with constraint enforcement gates. The rules files that define the solution space are derived from the charter governance layer through [Spec Kitty's doctrine synthesis flow](https://docs.spec-kitty.ai/how-to/synthesize-doctrine.html). The charter's policy boundaries become the CI-exit codes that block merges.

### Verify Phase (Quality Gate)

A separate Verifier agent checks each implementation against the spec, validates cross-service dependencies, and flags violations before code reaches the PR stage. The Verifier's rejection becomes structured context for correction, not a silently dropped error. This is the adversarial agent pattern: Implementors optimize for completion, the Verifier optimizes for finding failures.

The CoSAI (Coalition for Secure AI) SIG explicitly states that the same AI should not both write and review code — a principle that directly supports the Verifier agent model [https://www.coalitionforsecureai.org/addressing-whats-next-in-securing-enterprise-ai/](https://www.coalitionforsecureai.org/addressing-whats-next-in-securing-enterprise-ai/). In Spec Kitty, this maps to `/spec-kitty.implement-review` augmented with adversarial verification. The review gate is not a formality; it is the final enforcement layer before code reaches production, as documented in [Spec Kitty's governance setup workflow](https://docs.spec-kitty.ai/how-to/setup-governance.html).

This adversarial verification pattern directly addresses the [multi-tool governance gap](/articles/2026-04-12-the-multi-tool-governance-gap-why-2026-ai-frameworks-fail-engineering-teams/) — when multiple agents act in the same repository, a separate Verifier is the only way to catch cross-service dependency violations before merge.

## What This Prevents in Production

Concrete failure modes that harness engineering blocks:

- **Agent generating a payment endpoint without idempotency enforcement.** The spec constraint specifies idempotency requirements. The CI gate blocks the merge when the linter detects missing idempotency markers. No human review required — the gate enforces it deterministically.

- **Agent expanding its own permissions through prompt injection.** Immutable agent config + permission boundaries prevent agents from rewriting their own configuration files. The pre-execution gate rejects any tool call that attempts to modify agent config outside the workspace boundary.

- **Agent creating duplicate architectural patterns across parallel worktrees.** The Verifier agent catches cross-service dependency violations before merge. When two Implementor agents independently create similar authentication middleware in separate worktrees, the Verifier flags the duplication and forces consolidation.

- **Agent drifting from the spec across sessions.** Rules files + verification loop catch drift before PR. [The constraint shift article](/articles/2026-04-27-the-constraint-shift-when-ai-dominates-production-governance-becomes-the-moat/) discusses how field-scoped constraint documents become operationally effective through the harness gates described here — and the August 2026 enforcement deadline that makes those constraints non-negotiable. [Spec Kitty's v3 event-log-as-authority model](https://docs.spec-kitty.ai/explanation/spec-driven-development.html) provides the audit trail: every WP state transition is logged, every harness gate decision is recorded, and every Verifier rejection becomes structured context for correction.

## Spec Kitty's Charter-to-Constraints Pipeline

Spec Kitty operationalizes the same governance mechanisms through its charter governance layer, doctrine synthesis, and event-log-as-authority model. The official docs say Spec Kitty coordinates AI agents through structured workflows; spec-driven development makes specifications the source of truth and focused context for AI agents; specifications drive `/spec-kitty.specify`, `/spec-kitty.plan`, `/spec-kitty.tasks`, implementation, review, and acceptance; missions provide domain-specific workflows, validation rules, artifacts, and agent context.

The [v1-to-v3 evolution](https://docs.spec-kitty.ai/assets/spec-kitty-evolution-v1-to-v3.html) shows Spec Kitty moving from a stable PyPI release with orchestration externalized behind orchestrator-api, through v2 event architecture, missions, skills, and structured requirement mapping, to v3 where the event log is the sole mutable WP-state authority, feature detection is removed in favor of explicit MissionContext, WP ownership manifests define execution surfaces, lane-weighted progress is derived, a dedicated merge workspace handles merges, and thin agent shims reduce template drift across the supported agent ecosystem.

[Charter turns `.kittify/charter/charter.md` into structured, action-scoped governance context](https://docs.spec-kitty.ai/3x/charter-overview.html) for `spec-kitty next`; generated YAML, references, context-state, synthesis manifests, provenance sidecars, and `.kittify/doctrine/` are derived artifacts; charter synthesize promotes project-local doctrine; the Directive Relationship Graph maps actions, directives, tactics, procedures, profiles, templates, and glossary terms so agents receive the relevant governance subgraph for specify, plan, implement, or review.

Industry analysts have framed the same three-phase structure — [a16z's Plan → Code → Review essay](https://a16z.com/the-trillion-dollar-ai-software-development-stack/) frames AI coding as these fundamental phases — but harness engineering adds the critical insight that each phase needs a deterministic gate, not just a sequence.

The PEV loop maps to Spec Kitty's specify → plan → tasks → implement → review workflow, but the harness engineering insight is that each Spec Kitty step contract can be augmented with a harness gate:

- **Pre-execution check on `/spec-kitty.plan`:** Before the agent begins work, the gate validates workspace boundaries, tool permissions, and plan alignment with spec constraints.
- **Constraint enforcement on `/spec-kitty.tasks`:** Rules files derived from the charter become CI-exit codes. The agent cannot proceed past a task if its implementation violates an encoded constraint.
- **Adversarial verification on `/spec-kitty.implement-review`:** A separate Verifier agent (not the Implementor) checks each implementation against the spec, validates cross-service dependencies, and flags violations before merge.

## The Counterargument: "Stop Writing Specs, Start Writing Facts"

Jaroslaw Wasowski's [Medium essay](https://medium.com/@wasowski.jarek/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26) argues that executable facts, tests, and logs make specifications obsolete. He documents that a single test survived multiple model versions while the corresponding specification required repeated reinterpretations — illustrating how specs drift when models evolve faster than documentation.

The stance here is disagreement: facts and evidence are necessary but do not replace specs. In governed AI coding, harness engineering adds the mechanical enforcement layer that specs alone cannot provide — turning spec language into executable constraints (rules files, CI gates, verification loops) that agents cannot bypass through natural language.

Wasowski's point about spec drift under model upgrades is valid — but the solution isn't abandoning specs. It's making specs *executable* through verification criteria that CI can enforce, separating governance contracts from implementation details, and using versioned spec files with explicit scope boundaries so agents cannot reinterpret what they're allowed to touch.

The spec isn't documentation — it's the governance contract that prevents a Cursor agent from deleting your database in a single API call. The harness is the mechanism that enforces it.

## Implementation Checklist: Harness Gates for Each PEV Phase

1. **Plan phase gate:** Pre-execution check before any tool call — known tools, valid arguments, user approval for sensitive actions, workspace boundary checks. Spec Kitty's `/spec-kitty.plan` step contract augmented with a pre-execution harness gate.

2. **Execute phase constraints:** Rules files (AGENTS.md, CLAUDE.md, `.cursor/rules`) survive across sessions and are injected automatically. Inline-disable rules disabled to prevent agents from suppressing violations. Spec Kitty's `/spec-kitty.tasks` step contract augmented with constraint enforcement gates.

3. **Verify phase quality gate:** Separate Verifier agent checks each implementation against the spec, validates cross-service dependencies, flags violations before PR. Spec Kitty's `/spec-kitty.implement-review` step contract augmented with adversarial verification.

4. **Immutable agent config + permission boundaries:** Prevents agents from expanding their own permissions through prompt injection (CVE-2025-11445 / Kilo Code).

5. **Blast-radius control:** Worktree isolation + Verifier agent as adversarial counterweight to implementors.

## Does This Prevent Production Disasters?

The question is simple: how does this help a team get AI coding agents to produce good code without damaging production systems or customer data?

With harness engineering and the PEV loop:
- **What can the agent touch?** Pre-execution gates check workspace boundaries before any tool call. Worktree isolation limits each Implementor to files in its assigned scope.
- **What context and policy must it receive?** The six-element spec provides outcomes, constraints, decisions already made, and verification criteria. Spec Kitty's charter governance layers add action-scoped policy from `.kittify/charter/charter.md` through [doctrine synthesis](https://docs.spec-kitty.ai/how-to/synthesize-doctrine.html).
- **What tests prove the change?** Verifier pass/fail records + CI exit codes show whether code meets specification constraints before merge.
- **What blocks dangerous actions?** Immutable agent config + permission boundaries prevent agents from expanding their own permissions through prompt injection. Hard CI gates block database access unless explicitly authorized in the spec.
- **How does rollback work?** Git worktree isolation means discarded changes restore cleanly. The Verifier's rejection becomes structured context for correction, not a silently dropped error.

The harness engineering thesis answers the production-control question that spec-driven development alone cannot: what happens *after* the spec is written and the context is loaded? The answer is gates, constraints, and verification loops — not more review, but deterministic enforcement.

<figure class="article-figure">
  <img src="/generated/articles/2026-05-15-harness-engineering-the-missing-governance-layer-between-ai-coding-specs-and-production-safety-support.webp" alt="Abstract governance image showing constraint layers and verification gates encoding production safety before code reaches the merge stage." />
  <figcaption>Stacked threshold gate structure: model-space traces cross translucent membranes into constraint harness and verification layers, with deterministic gates catching failing traces before they reach production.</figcaption>
</figure>
