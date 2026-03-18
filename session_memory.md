# Session Memory

Last updated: 2026-03-18 (Asia/Saigon)

## Project Snapshot
- Repo: `Arter2507/create-heyai-ruleset`
- Local branch: `main`
- Current published npm version: `0.1.2` (latest verified from npm view)
- Latest local package version: `0.1.5` (used for trusted publishing verification)
- Current state: all requested code/doc updates committed and pushed.

## Completed Before This Session
- CLI installer created and maintained.
- `HEYAI.agent.md` is generated at project root.
- Trigger bridge is injected into root `AGENTS.md`.
- Kit install behavior improved:
  - runs install commands inferred from kit README
  - avoids false `[OK]` by validating project changes/markers.
- Install report moved to root:
  - primary: `install-report.md`
  - legacy copy: `.heyai-ruleset/install-report.md`
- Publish workflows refactored to a single channel (tag `v*`) with OIDC-first + token fallback.

## Newly Completed In This Session
- Updated `WORKFLOWS.md` Step 1 context definition to 3 mandatory groups exactly as requested.
- Added bilingual (VI/EN) language-mode headers to core rule files:
  - `MAP.md`, `IDENTITY_SOUL.md`, `PROTOCOLS.md`, `RULES.md`, `WORKFLOWS.md`, `CODE_STANDARDS.md`, `SYSTEM_DESIGN.md`.
- Updated trigger behavior (`Hey, AI`) in generated templates:
  - detect user's primary language
  - ask `choose language` if ambiguous
  - respond in user's primary language.
- Added root install report output:
  - primary: `<project-root>/install-report.md`
  - legacy copy: `<project-root>/.heyai-ruleset/install-report.md`.
- Improved kit install validation:
  - no false `[OK]` when command exits successfully but no project changes detected.
- Kept only one publish channel:
  - `.github/workflows/publish.yml` (tag `v*` + workflow_dispatch).
- Updated publish workflow to prefer OIDC and fallback to `NPM_TOKEN` only if available.

## Trusted Publishing Verification Attempts
- Version bumps/tags tested: `v0.1.4`, `v0.1.5`.
- GitHub Actions runs reached publish step and failed:
  - OIDC publish step failed with `ENEEDAUTH`.
  - Fallback step failed because `NPM_TOKEN` secret is empty in repo.
- Conclusion: npm trusted publisher mapping is still incomplete/mismatched for this package/repo/workflow.

## New User Requests (Current Session)
1. Verify npm trusted publishing successfully end-to-end after npm-side configuration is fixed.

## Execution Plan For Next Session
1. User confirms npm trusted publisher mapping on npm package settings:
   - repository `Arter2507/create-heyai-ruleset`
   - workflow `.github/workflows/publish.yml`
   - tag trigger `v*` allowed.
2. Rerun publish verification:
   - bump patch version
   - push tag
   - confirm `Publish npm` workflow succeeds
   - verify npm version increments from `0.1.2`.
3. Optional cleanup:
   - add `NPM_TOKEN` secret as fallback safety net.

## Notes / Risks
- GitHub Actions publish currently fails because OIDC trusted publishing is not yet fully authorized on npm side.
- `RULES.md` appears to contain historical malformed content and should be cleaned in a dedicated pass.
