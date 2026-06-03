# UX Design — Canary Recipe Browser

A static single-page browser. Kept deliberately small (build-plan fixture). No
backend — everything renders from the in-memory catalog.

## Screens

### S1 — Recipe list
A grid of recipe cards (name, tags, favorite star). Searching filters the grid
via `searchRecipes`; clicking a tag filters via `filterByTag`.

### S2 — Favorites
The favorited subset, toggled by the star control on each card.

### S3 — Status badge
A small footer badge rendered by `renderStatus`:

- `version` — the app version.
- accent — the canary brand color, used as the badge background.
  **The brand color is exactly `#ffbe0b`** (canary amber). This precise hex is
  load-bearing: it is the manual-AC token the e2e harness asserts in the PR body,
  so it must survive verbatim into the badge styling.

## Accessibility

- The badge amber (`#ffbe0b`) must meet WCAG AA against its label; pair it with
  `#3a2c00` text where used as a background fill.
- All controls are keyboard-reachable; the star toggle has an aria-pressed state.
