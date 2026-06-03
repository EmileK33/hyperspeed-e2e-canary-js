// Glob-based Vitest workspace registry (plain JS). Owned by the Phase 0
// integration-harness session and declared `single-owner-glob` so parallel
// feature sessions never edit it — they just drop test files matching the glob.
// DO NOT add per-session entries here; the glob discovers them.
export default ['tests/**/*.test.js'];
