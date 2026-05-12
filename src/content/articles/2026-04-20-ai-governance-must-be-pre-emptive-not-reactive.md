---
title: "AI Governance Must Be Pre-emptive, Not Reactive"
description: "The Red Hat case study that changes everything: governance lives in the context window."
excerpt: "Red Hat's engineering team formalized architectural boundaries into machine-readable constraints placed directly in the AI coding assistant's context window. Commit throughput rose sharply — proving governance-as-code is a productivity multiplier, not just a compliance cost."
publishDate: 2026-04-20
sourceDate: "2026-04-20"
draft: false
tags:
  - ai-governance
  - governance-as-code
  - context-engineering
  - agentic-coding
  - enterprise-ai
editorialSummary: "Red Hat's quantified results show that embedding governance in the agent's context window — via AGENTS.md files and machine-readable constraints — can dramatically increase commit throughput while reducing AI miss rates."
heroImage:
  src: "/generated/articles/2026-04-20-ai-governance-must-be-pre-emptive-not-reactive-hero.webp"
  alt: "Abstract governance image showing architectural boundaries encoded as machine-readable constraints collapsing into an AI context window, with throughput metrics rising on warm paper evidence."
supportImage:
  src: "/generated/articles/2026-04-20-ai-governance-must-be-pre-emptive-not-reactive-support.webp"
  alt: "Abstract translation chamber showing passive governance rules always present in the agent environment versus on-demand lookup failure points."
references:
  - label: "Red Hat Developers — Governance lessons from Hybrid Cloud Console (Riccardo Forina)"
    url: "https://developers.redhat.com/articles/2026/04/15/governance-lessons-red-hat-hybrid-cloud-console"
  - label: "Sonatype Press Release — Open Source Malware Grows 75%"
    url: "https://www.sonatype.com/press-releases/sonatype-research-reveals-open-malware-grows-75-percent"
  - label: "Vercel Blog — AGENTS.md outperforms skills in agent evals"
    url: "https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals"
  - label: "Latham & Watkins — Texas Signs Responsible AI Governance Act Into Law"
    url: "https://www.lw.com/en/insights/texas-signs-responsible-ai-governance-act-into-law"
  - label: "White House National Policy Framework for AI"
    url: "https://cset.georgetown.edu/article/unpacking-the-white-house-national-policy-framework-for-ai/"
  - label: "Spec Kitty Docs — Spec-Driven Development"
    url: "https://docs.spec-kitty.ai/explanation/spec-driven-development.html"
  - label: "The Multi-Tool Governance Gap Field Note"
    url: "https://ai-coding-governance.com/articles/2026-04-12-the-multi-tool-governance-gap-why-2026-ai-frameworks-fail-engineering-teams/"
---

Riccardo Forina, an engineer at Red Hat, published a rare first-hand engineering account of what happens when you treat governance as code. The Red Hat Hybrid Cloud Console team didn't just add lint rules or write a policy document. They formalized architectural boundaries into machine-readable constraints — AGENTS.md files, custom lint rules, structured documentation — and placed them directly in the AI coding assistant's context window [first-hand engineering account](https://developers.redhat.com/articles/2026/04/15/governance-lessons-red-hat-hybrid-cloud-console).

The results were not incremental. Commit throughput jumped from approximately 12 per month to 53 per month. One commit touched 840 files. Another removed 216 files of legacy state management. All structurally verified by test suite. The AI's miss rate dropped dramatically.

This is the first quantified ROI showing that governance-as-code is a productivity multiplier, not just a compliance cost.

<figure class="article-figure">
  <img src="/generated/articles/2026-04-20-ai-governance-must-be-pre-emptive-not-reactive-hero.webp" alt="Abstract governance image showing architectural boundaries encoded as machine-readable constraints collapsing into an AI context window, with throughput metrics rising on warm paper evidence." />
  <figcaption>Pre-emptive governance turns architectural rules into the agent's working environment before code is generated, making control part of throughput rather than a review tax.</figcaption>
</figure>

## The Supply-Chain Gap AI Can't Self-Correct

But there's a darker side to AI coding at scale. Sonatype's 2026 analysis of 36,780 dependency upgrade suggestions from leading AI coding tools found that 27.8% pointed to non-existent, deprecated, or unsafe versions [Sonatype's 2026 analysis](https://www.sonatype.com/press-releases/sonatype-research-reveals-open-malware-grows-75-percent). Nearly one in three recommendations was wrong — and critically, these errors won't be caught by compilers.

This is not a model-quality problem. It's a structural governance gap. AI coding tools are recommending dependencies they cannot verify, and the errors are in ways that automated tooling cannot detect. Human review alone cannot close this gap at the scale that AI-generated code demands — as explored in [the multi-tool governance gap](/articles/2026-04-12-the-multi-tool-governance-gap-why-2026-ai-frameworks-fail-engineering-teams/), where fragmented tooling creates blind spots no single reviewer can track.

The math is unforgiving: if commit throughput jumps from about 12 per month to 53 per month, traditional human review processes become the bottleneck. Governance must become automated or hybrid to keep pace.

## The Pattern That Works: Passive Context Over On-Demand Lookup

Vercel's research provides the mechanism behind why Red Hat's approach worked [Vercel's research](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals). Their benchmark compared AGENTS.md passive context against on-demand lookup for AI coding tasks. The passive context approach achieved a 100% pass rate on framework-specific tasks, compared to a maximum of 79% for on-demand lookup.

The difference is subtle but profound. On-demand lookup requires the AI to make a decision: "Should I look this up?" That decision point introduces failure. Passive context removes it entirely — the governance rules are always present, always visible, always applied. The AI doesn't need to remember to consult them. They're simply part of the environment.

This is the key insight: governance embedded *before* AI touches the codebase is more effective than governance applied *after*. The boundary must exist before the agent acts, not as a checkpoint it passes through.

Organizations looking to operationalize this pattern at scale need an [agentic coding governance layer](https://docs.spec-kitty.ai/explanation/spec-driven-development.html) that treats specifications, constraints, and audit evidence as governed artifacts — turning pre-emptive governance from a team practice into a repeatable infrastructure pattern.

This approach aligns with the broader argument for [context engineering as the missing governance layer](/articles/2026-04-24-context-engineering-the-missing-governance-layer-for-enterprise-ai-coding/): if you cannot control and version the context an agent receives, you cannot explain why generated code changed or prove the right constraints were applied.

<figure class="article-figure">
  <img src="/generated/articles/2026-04-20-ai-governance-must-be-pre-emptive-not-reactive-support.webp" alt="Abstract translation chamber showing passive governance rules always present in the agent environment versus on-demand lookup failure points." />
  <figcaption>Passive context removes the failure point where an agent has to decide whether to look up the rule; the constraint is already in the chamber.</figcaption>
</figure>

## The Regulatory Backdrop Is Converging

This is no longer just an engineering question. Regulatory frameworks are creating real incentives for pre-emptive governance:

**Texas' Responsible AI Governance Act** took effect January 1, 2026 [Texas TRAIGA](https://www.lw.com/en/insights/texas-signs-responsible-ai-governance-act-into-law). It includes disclosure duties, use-case limits, and safety measures for AI deployment. Critically, it offers an affirmative defense for entities showing strong governance, effective testing, or ability to fix harmful outcomes. The law creates a legal incentive for proactive governance structures.

**The White House National Policy Framework for AI** (March 20, 2026) [White House framework](https://cset.georgetown.edu/article/unpacking-the-white-house-national-policy-framework-for-ai/) includes Section III on "protecting individuals from commercial uses of their identity and violations of intellectual property rights." As commercial deployment scales, questions about ownership and accountability when AI generates implementation details will need resolution.

Together, these frameworks suggest regulators recognize AI coding as a governance challenge requiring structural solutions — not just individual accountability. This regulatory convergence reinforces the urgency explored in [the August enforcement cliff](/articles/2026-04-23-the-august-2026-ai-governance-cliff/), where compliance deadlines meet architectural constraints on human oversight.

## Open Questions

The data points to a clear direction, but several questions remain unresolved:

1. **Ownership and accountability**: If AI generates implementation details under human-specified constraints, who owns the output and bears responsibility? The White House IP protection language signals this is coming, but no jurisdiction has answered it yet.

2. **Scaling governance**: What specific governance models can keep pace with the kind of commit throughput increase Red Hat reported? The Red Hat case study proves the approach works for one team migrating one codebase. Generalizing it remains an open engineering challenge.

3. **Defense-sector compatibility**: How do defense IL5 requirements (continuous ATO evidence, air-gapped deployment) intersect with commercial AI coding tool data policies? Will defense require entirely separate toolchains?

The shift from post-hoc code review to pre-emptive architectural constraints is already underway. Organizations that treat governance as infrastructure — not documentation — will be the ones that survive the scale that AI-generated code demands.

---

*Sources: Red Hat Developers (Riccardo Forina, April 15, 2026); Sonatype (2026 State of the Software Supply Chain); Vercel Blog; Texas Responsible AI Governance Act (2026); White House National Policy Framework for AI (March 20, 2026).*
