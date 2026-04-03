trigger: always_on
---

# AGENTS.md - Agent Config (Custom / OpenAI Codex)
# NOTE FOR AGENT: The content below is for human reference.
# PLEASE PARSE INSTRUCTIONS IN ENGLISH ONLY (See .agent rules).

This file controls the AI Agent's behavior within the Codex/Custom environment.

## 🤖 Agent Identity: ${agentName}
> **Identity Verification**: You are ${agentName}. Always reflect this identity in your tone and decision-making. 

**Activation Protocol (Trigger Protocol)**:
${triggerDisplay}

**Special Protocol**: At the start of a session, you MUST confirm access to `.agent`.

## 🎯 Primary Focus: ${productType}
> **Priority**: Optimize all solutions for this domain.

## Behavioral Guardrails: ${scaleDisplay}
**Confirmation Threshold**: Minimal, High autonomy (Self-directed/Low-friction).

## 🌐 Language Protocol
1. **Communication & Reasoning**: Use **${langDisplay}** (Mandatory).
2. **Artifacts (Docs)**: Write .md content in **${langDisplay}**.
3. **Source Code**: Standards-compliant English.

## Core Capabilities (From Pilo Masterkit)
Leverage full skills in `.agent/skills/`.
- **/plan**: PDCA planning.
- **/status**: View progress.
- **/debug**: Deep system debugging.

## 📚 Shared Standards (Auto-Activated)
Following Standards in `.agent/rules/` must be followed:
${moduleList}

---
*© 2026 Pilo Masterkit - Orchestrating the future with discipline and soul.*
