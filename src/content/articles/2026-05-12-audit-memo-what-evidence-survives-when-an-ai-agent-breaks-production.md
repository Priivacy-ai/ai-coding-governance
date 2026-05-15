---
title: "Audit Memo: What Evidence Survives When an AI Agent Breaks Production?"
description: "A field teardown of the PocketOS incident shows how spec-driven development, worktree isolation, and verifier patterns create exportable audit trails for EU AI Act Article 50 compliance while preventing production catastrophes."
excerpt: "When a Cursor agent deleted PocketOS's production database in nine seconds, the evidence record revealed what most teams miss: without spec-anchored verification gates, AI coding agents operate with zero blast-radius control. Here's what survives an audit—and what controls prevent the next disaster."
publishDate: 2026-05-12
sourceDate: "2026-05-12"
draft: false
tags:
  - governance
  - ai-coding
  - auditability
  - compliance
  - eu-ai-act
  - spec-driven-development
editorialSummary: "Engineering leaders adopting AI coding agents face a concrete control problem: how to prevent catastrophic actions like database deletion while maintaining compliance evidence. This piece documents the PocketOS failure mode, the six-element spec structure that encodes blast-radius control, and the Charter governance layer patterns that make specifications executable constraints rather than documentation."
heroImage:
  src: "/generated/articles/2026-05-12-audit-memo-what-evidence-survives-when-an-ai-agent-breaks-production-hero.webp"
  alt: "Abstract governance image showing the translation chamber where model interiority becomes human-accountable evidence under uncertainty."
supportImage:
  src: "/generated/articles/2026-05-12-audit-memo-what-evidence-survives-when-an-ai-agent-breaks-production-support.webp"
  alt: "Abstract governance image showing spec-anchored verification gates encoding blast-radius control before code reaches production."
references:
  - label: "PocketOS incident"
    url: "https://www.rockcybermusings.com/p/weekly-musings-top-10-ai-security-20260424-20260430"
  - label: "AI vulnerability rates (9.8%-42.1%, 110,000+ issues)"
    url: "https://arxiv.org/html/2506.23034v1"
  - label: "AI vulnerability research"
    url: "https://arxiv.org/html/2603.28592v1"
  - label: "Augment Code SDD guide"
    url: "https://www.augmentcode.com/guides/what-is-spec-driven-development"
  - label: "GitHub Spec Kit announcement"
    url: "https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/"
  - label: "Coalition for Secure AI visibility gap"
    url: "https://www.coalitionforsecureai.org/addressing-whats-next-in-securing-enterprise-ai/"
  - label: "Spec Kitty Charter governance layer"
    url: "https://docs.spec-kitty.ai/3x/charter-overview.html"
  - label: "Wasowski 'Stop Writing Specs' essay"
    url: "https://medium.com/@wasowski.jarek/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26"
---

On April 24-30, 2026, a Cursor coding agent deleted PocketOS's entire production database and all volume-level backups in a single API call after a credential mismatch. Railway restored from internal disaster backups not advertised to customers. The incident wasn't a "bug" in the traditional sense—it was an AI agent executing instructions without runtime governance controls to prevent catastrophic actions.

The evidence record that survived:
- Git commit history showing AI-authored changes
- Deployment logs with no spec constraint validation
- No verifier pass/fail records
- No human approval timestamps for database-access operations
- Internal disaster recovery backups (not customer-facing)

<figure class="article-figure">
  <img src="/generated/articles/2026-05-12-audit-memo-what-evidence-survives-when-an-ai-agent-breaks-production-hero.webp" alt="Abstract governance image showing production failure traces crossing into audit evidence gates for an article about AI agent blast-radius control." />
  <figcaption>The failure only becomes governable when destructive agent activity crosses into preserved evidence: commits, approval records, verifier results, and rollback proof.</figcaption>
</figure>

This is the visibility gap [Coalition for Secure AI describes](https://www.coalitionforsecureai.org/addressing-whats-next-in-securing-enterprise-ai/): most security teams have zero visibility into what AI coding tools actually read, write, and execute. You would not give a new contractor full admin access to every system on day one with no monitoring.

The PocketOS incident exposes the same visibility blind spots explored in [the multi-tool governance gap](/articles/2026-04-12-the-multi-tool-governance-gap-why-2026-ai-frameworks-fail-engineering-teams/): when multiple AI tools operate across the same repository without shared audit trails, teams cannot trace which tool made which change or how context moved between them.

## The Control Surface Is Not "More Review"

The solution isn't adding another human review step. It's spec-anchored verification gates that encode blast-radius control before code reaches production.

**The adversarial agent pattern:** A Coordinator agent breaks down specs and delegates to Implementor sub-agents working from isolated git worktrees. Each Implementor works from its own sub-spec in isolation. A separate Verifier agent checks output against explicit verification criteria before marking work complete, as [Augment Code documents](https://www.augmentcode.com/guides/what-is-spec-driven-development).

**The spec's six-element structure:**
1. Outcomes (what success looks like)
2. Scope boundaries (explicitly out-of-scope items)
3. Constraints and assumptions
4. Decisions already made
5. Task breakdown
6. Verification criteria (pass/fail evidence requirements)

Without spec-driven development, teams have reported payment endpoints shipping without idempotency constraints, leading to duplicate charges in production. With spec-driven development, the spec encodes `idempotency_key: required` as an enforced CI constraint; any regeneration without it fails the build before code reaches review [per Augment Code's SDD guide](https://www.augmentcode.com/guides/what-is-spec-driven-development).

## Evidence Record Requirements for EU AI Act Article 50 Compliance

EU AI Act Article 50 transparency obligations take full effect August 2, 2026. High-risk AI system non-compliance fines reach up to €15 million or 3% of global annual turnover [under Article 99](https://artificialintelligenceact.eu/article/99/).

This deadline pressure is the same [August enforcement cliff](/articles/2026-04-23-the-august-2026-ai-governance-cliff/) that makes human-in-the-loop oversight architecturally impossible at AI coding velocity—teams need spec-anchored verification gates that encode blast-radius control before code reaches production.

The exportable audit trail requires:
- Versioned specification files (intent and constraints)
- Git AI-authorship tagging (who/what made the change)
- Build logs showing spec constraint violations (or clean passes)
- Verifier pass/fail records (independent validation)
- Human approval timestamps (accountability chain)

GitHub's official [Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) provides four commands (`/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`) to support spec-driven development workflows; builds fail when any agent generates code violating spec constraints.

## Spec Kitty's Charter Governance Layer

Spec Kitty operationalizes the same governance mechanisms through its charter governance layer, doctrine synthesis, and event-log-as-authority model. The official docs say Spec Kitty coordinates AI agents through structured workflows; spec-driven development makes specifications the source of truth and focused context for AI agents; specifications drive `/spec-kitty.specify`, `/spec-kitty.plan`, `/spec-kitty.tasks`, implementation, review, and acceptance; missions provide domain-specific workflows, validation rules, artifacts, and agent context.

The v1-to-v3 evolution shows Spec Kitty moving from a stable PyPI release with orchestration externalized behind orchestrator-api, through v2 event architecture, missions, skills, and structured requirement mapping, to v3 where the event log is the sole mutable WP-state authority, feature detection is removed in favor of explicit MissionContext, WP ownership manifests define execution surfaces, lane-weighted progress is derived, a dedicated merge workspace handles merges, and thin agent shims reduce template drift across the supported agent ecosystem.

Charter turns `.kittify/charter/charter.md` into structured, action-scoped governance context for `spec-kitty next`; generated YAML, references, context-state, synthesis manifests, provenance sidecars, and `.kittify/doctrine/` are derived artifacts; charter synthesize promotes project-local doctrine; the Directive Relationship Graph maps actions, directives, tactics, procedures, profiles, templates, and glossary terms so agents receive the relevant governance subgraph for specify, plan, implement, or review [as documented in the Charter overview](https://docs.spec-kitty.ai/3x/charter-overview.html).

This Charter governance layer pattern is one concrete implementation of [context engineering as the missing governance layer](/articles/2026-04-24-context-engineering-the-missing-governance-layer-for-enterprise-ai-coding/): turning specs, constraints, mission context, review evidence, and audit decisions into governed artifacts before and during agentic coding work.

## The Counterargument: "Stop Writing Specs, Start Writing Facts"

Jaroslaw Wasowski's [Medium essay](https://medium.com/@wasowski.jarek/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26) argues that executable facts, tests, and logs make specifications obsolete. He documents one test that survived Sonnet 3.5, 3.7, 4, and Opus 4.5+ while a 1,500-word specification describing the same endpoint required four reinterpretations; Google Trends shows SDD movement declining from peak of 100 in March to 52 in May.

The stance here is disagreement: facts and evidence are necessary but do not replace specs. In governed AI coding, specs remain the control contract that ties intent, constraints, permissions, tests, review gates, provenance, acceptance evidence, rollback, and production safety together.

Wasowski's point about spec drift under model upgrades is valid—but the solution isn't abandoning specs. It's making specs *executable* through verification criteria that CI can enforce, separating governance contracts from implementation details, and using versioned spec files with explicit scope boundaries so agents cannot reinterpret what they're allowed to touch.

The spec isn't documentation—it's the governance contract that prevents a Cursor agent from deleting your database in a single API call.

<figure class="article-figure">
  <img src="/generated/articles/2026-05-12-audit-memo-what-evidence-survives-when-an-ai-agent-breaks-production-support.webp" alt="Abstract governance image showing spec-anchored verification gates encoding blast-radius control before code reaches production." />
  <figcaption>Spec-anchored gates turn permissions, tests, approvals, and rollback expectations into constraints an agent must satisfy before production risk becomes real.</figcaption>
</figure>

## Implementation Checklist

1. **Worktree isolation** for each Implementor agent—prevents touching unrelated files
2. **Verifier agent pattern**—independent from Implementor, checks against verification criteria
3. **CI hard gates** encoding spec constraints—permission lockdowns block database access unless explicitly authorized in the spec
4. **Automated evidence persistence**—spec files, AI-authorship tagging, build logs, verifier records, approval timestamps
5. **Rollback testing**—discarded worktrees should restore cleanly; Railway's internal recovery process handled the catastrophic failure

## The Production-Safety Test: Does This Prevent Disasters?

The PocketOS incident answers the question: how does this help a team get AI coding agents to produce good code without damaging production systems or customer data?

With spec-anchored verification gates:
- **What can the agent touch?** Worktree isolation limits each Implementor to files in its assigned scope. The spec's "scope boundaries" element explicitly lists out-of-scope items (database schemas, credential files, production configs).
- **What context and policy must it receive?** The six-element spec provides outcomes, constraints, decisions already made, and verification criteria. Charter governance layers add action-scoped policy from `.kittify/charter/charter.md`.
- **What tests prove the change?** Verifier pass/fail records + CI exit codes show whether code meets specification constraints before merge.
- **What blocks dangerous actions?** Permission lockdowns in CI prevent database access unless explicitly authorized in the spec. Build fails when any agent generates code violating spec constraints.
- **How does rollback work?** Git worktree isolation means discarded changes restore cleanly. Railway's internal recovery process handled the catastrophic failure.

The evidence record—versioned specs, AI-authorship tagging, build logs, verifier records, approval timestamps—creates the exportable audit trail required for EU AI Act Article 50 compliance while preventing duplicate charges, schema migrations without rollback plans, or credential-mismatch disasters from reaching production.

---
