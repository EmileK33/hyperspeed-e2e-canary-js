# JS-no-DB canary project — `canary-recipes`

Tiny **plain-JavaScript** (no TypeScript) static recipe browser with **no
database and no services**. Exists **only** as the no-DB / dynamic-JS target
project that `tests/e2e/run-canary.mjs --fixture js-no-db` exercises the Track B
Node runner against (issue #143).

This is not a published package. It is a fixture. Treat it like one:

- `package.json`, `npm ci`, `npm run test:integration` are the real commands a
  generated plan drives — they must work.
- `src/` is intentionally near-empty. The committed source specs in `../specs/`
  describe what sessions should build; the fixture's starting state is "fresh npm
  init + vitest/jsdom + one passing integration smoke test".
- Session output never lands here. The harness copies this dir into a scratch
  checkout of the throwaway test repo on every run.

## Why this fixture exists

The node and python fixtures both declare a backing database. This one
deliberately does **not** — it is the cell that exercises two paths nothing else
does:

1. **Services absent.** The plan declares no `requirements.services[]`, so the
   rendered CI workflow must contain no `services:` block and no
   `docker-compose.fixtures.yml`, and the runner/preflight must take the
   service-skip branches without false failures.
2. **Dynamic JS contract proof.** The code is plain JavaScript with no type
   annotations, so the plan-time TypeScript contract proof has nothing meaningful
   to check. Today it reports a low-signal `mismatch`; #144 Decision B should
   degrade it honestly to ADVISORY "unverified". The offline Tier 1 suite
   (`tests/build-plan-fixture-matrix.test.ts`) locks the current `mismatch`
   baseline so the #144 change is a visible diff.

Unlike the Ruby fixture, this cell is **READY** on the current generator — npm is
fully supported. It just stresses the no-DB and dynamic-typing branches.
