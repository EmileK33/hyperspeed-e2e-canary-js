# Architecture — Canary Recipe Browser

Plain JavaScript (no TypeScript) · npm + Vitest (jsdom) · **no database, no
services**. A build-plan **fixture** shaped to decompose into a Phase 0
integration harness + 3 feature phases with disjoint file ownership. See
`../EXPECTED.md` for the session/wave contract.

## Stack

- **Runtime:** Node 20, ES modules, **plain JavaScript** (no TS, no type
  annotations) — this is the dynamic-JS cell.
- **UI:** DOM rendering tested under jsdom.
- **Datastore:** none. The catalog is a static in-memory array. **No
  `requirements.services[]`** — this fixture exercises the services-absent path
  and the preflight service skips.
- **Tests:** Vitest with the jsdom environment. Integration tests live under
  `tests/integration/`.

## Module layout (file ownership — one owner each)

| Area | Files | Phase |
|---|---|---|
| Integration harness | `tests/integration/smoke.test.js`, `package.json`, `vitest.workspace.js` | 0 |
| Catalog | `src/catalog.js` | 1 |
| Favorites | `src/favorites.js` | 1 |
| Search | `src/search.js` | 2 |
| Filter | `src/filter.js` | 2 |
| Render | `src/render.js` | 3 |
| Status badge | `src/status.js` | 3 |

## Shared resources

- **`vitest.workspace.js`** — glob-based single-owner registry; sessions never
  edit it (they add `tests/**/*.test.js` files the glob discovers).
- No shared mutable runtime substrate (no DB), so there is no coordination
  contract to declare — the "services absent" branch.

## Toolchain

- `package.json` (npm) owns deps: `lodash-es` (runtime); `vitest`, `jsdom` (dev).
- Integration command: `npm run test:integration` → `vitest run tests/integration`.
- CI declares **no** service block (nothing to provision).

## Contract-proof note (the #144 Decision B cell)

Because the code is plain JavaScript with no type annotations, the plan-time
TypeScript contract proof has nothing meaningful to check. Today it still runs
and reports a low-signal `mismatch`; after #144 Decision B it should degrade
honestly to ADVISORY "unverified for ecosystem: dynamic JS". The structural
BLOCKING checks (ownership, merge-sim) still run for every ecosystem.

## Cross-session contracts

- `src/render.js` consumes `listRecipes` from `src/catalog.js`; `src/search.js`
  and `src/filter.js` read the catalog (Phase 1 → Phase 2/3 dependency; producer
  phase precedes consumer phase).
