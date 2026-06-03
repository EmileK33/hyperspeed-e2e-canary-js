# User Stories — Canary Recipe Browser

A tiny **plain-JavaScript** (no TypeScript) static recipe browser. A build-plan
**fixture** (issue #143) for the no-DB / dynamic-JS cell: **no database, no
services**, an in-memory static catalog. Shaped to decompose into ~7 sessions
across 4 phases (Phase 0 integration harness + 3 feature phases) with disjoint
file ownership.

## Epic 1 — Catalog

### US-001 — Static recipe catalog
**As a** developer **I want** a static catalog module **so that** the UI reads
recipes without a backend.

- AC-1: `listRecipes()` and `getRecipe(id)` are exported from `src/catalog.js`.
- AC-2: The catalog is a static in-memory array — **no network, no database**.

### US-002 — Favorites
**As a** user **I want** to favorite recipes **so that** I can find them later.

- AC-1: `addFavorite`, `removeFavorite`, `listFavorites` exported from
  `src/favorites.js`, backed by an in-memory set.

## Epic 2 — Discovery

### US-003 — Search
**As a** user **I want** to search recipes by name **so that** I can find one
fast.

- AC-1: `searchRecipes(query)` in `src/search.js` returns matching recipes
  (case-insensitive substring match).

### US-004 — Filter by tag
**As a** user **I want** to filter recipes by tag **so that** I can browse a
category.

- AC-1: `filterByTag(tag)` in `src/filter.js` returns recipes carrying the tag.

## Epic 3 — Rendering

### US-005 — Render the list
**As a** user **I want** the recipe list rendered to the DOM **so that** I can
see it.

- AC-1: `renderList(recipes, el)` in `src/render.js` renders cards into a jsdom
  element; an integration test asserts the card count.

### US-006 — Status badge
**As a** user **I want** a status badge **so that** I can see the app version +
brand.

- AC-1: `renderStatus(el)` in `src/status.js` renders a badge with the version.
- AC-2 **[MANUAL]**: The status badge accent color is exactly the canary brand
  color `#ffbe0b`. *(Human sign-off required — verify the exact amber hex renders
  in the badge and matches the brand guideline.)*
