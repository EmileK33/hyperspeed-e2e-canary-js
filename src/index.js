// Canary recipe-browser entry point (plain JavaScript — no TypeScript).
//
// This file intentionally stays empty so sessions can introduce new top-level
// exports under src/<area>/ without merge conflicts on this stub. There is NO
// database in this fixture: the catalog is a static in-memory list, which is the
// whole point of the js-no-db cell — it exercises the "services absent" branch
// and the dynamic-JS contract-proof path where TS type-checking has nothing to
// prove (see ../specs and tests/build-plan-fixture-matrix.test.ts).

export {};
