# Expected outputs — JS-no-DB canary build plan

This file documents what the JS-no-DB canary's source specs (`specs/`) should
produce when run through `hyperspeed --generate-build-plan` and then through
`agents/build-plan/runner-template/run-build.mjs` with `--fixture js-no-db`.

The harness (`tests/e2e/run-canary.mjs`) asserts against this contract. If the
build-plan agent legitimately changes its session naming, file ownership splits,
or wave ordering, **update this file in the same commit** so the contract stays
meaningful.

> **Status today: READY.** This cell is structurally supported (npm ecosystem).
> Its purpose is the **no-services** path and the **dynamic-JS contract proof**:
> the plan declares no `requirements.services[]`, and because the code is plain
> JavaScript the TS contract proof has nothing meaningful to check. The offline
> Tier 1 suite asserts READY + a `mismatch` contract status; after #144 Decision
> B the contract status should become `unverified` (honest degradation).

## Sessions

Seven sessions across four phases (phase 0 = integration harness + three feature
phases). Concrete IDs may shift if the agent renames them; assertions match by
*count per phase* and *file ownership* rather than literal IDs where possible.

| Phase | Expected sessions | What they own | Manual ACs |
| --- | --- | --- | --- |
| 0 | 1 (S0-A) | `package.json`, `vitest.workspace.js`, `tests/integration/smoke.test.js` | 0 |
| 1 | 2 (S1-A, S1-B) | `src/catalog.js` + `src/favorites.js` | 0 |
| 2 | 2 (S2-A, S2-B) | `src/search.js` + `src/filter.js` | 0 |
| 3 | 2 (S3-A, S3-B) | `src/render.js` + `src/status.js` | **1** (`US-006 AC-2`, brand `#ffbe0b`) |

Total sessions: **7**. Total PRs opened on a clean run: **7**.

## Waves

```
W0  feature      phase 0 — 1 session
W1  integration  integration-0  → npm run test:integration
W2  feature      phase 1 — 2 sessions
W3  integration  integration-1  → npm run test:integration
W4  feature      phase 2 — 2 sessions
W5  integration  integration-2  → npm run test:integration
W6  feature      phase 3 — 2 sessions
W7  integration  integration-3  → npm run test:integration
```

Integration command: `npm run test:integration`.

## Toolchain (requirements block)

- `requirements.runtimes[]` includes `{ name: "node", version: "20" }`.
- `requirements.workspaceInstall[]` includes an `npm ci` command.
- `projectManifestStub.path` is `package.json` (ecosystem node).
- **`requirements.services[]` is absent or `[]`** — the no-services path. The
  rendered `session-tests.yml` must contain **no** `services:` block and **no**
  `docker-compose.fixtures.yml`.

## Manual ACs

Exactly one session — the one owning `src/status.js` (US-006) — should carry a
`[MANUAL]` AC for the canary brand color `#ffbe0b`. The harness asserts that
*some* PR body contains a checkbox referencing `#ffbe0b`.

## Notes on robustness

- Match session count per phase, not exact session names.
- Match PR title pattern (`/^S\d+-[A-Z]: autonomous build$/`).
- Match the `[MANUAL]` AC by the literal `#ffbe0b` token (a unique amber chosen so
  it survives agent rewording).
- Tolerate the integration wave running `npm run test:integration` or
  `npm test -- tests/integration`.
