# `src/view/admin` Instructions

Owns Taglow Admin feature screens.

## Feature Areas

- `auth`
- `surveys`
- `builder`
- `preview`
- `analysis`
- `settings`
- `system`

## Rules

- Admin pages use `src/api/admin/query` hooks for data.
- Admin pages use `src/store` for UI-only state.
- Keep route-specific orchestration in page files.
- Keep repeated widgets in each feature's `components` folder or promote them to `src/components` only when truly generic.
- All analysis-facing UI must display N and low-sample warnings when provided by the API.
- Response status summary now belongs in `analysis` as `ResponseSummaryCard`; do not recreate a separate `/responses` route.
- Report/poster draft remains PRD future scope unless the user explicitly asks for it; TDD v2 does not define a `report` route.

## CSS Layout

- Each admin page keeps page-level CSS in the feature's `css` directory.
- Each admin feature component keeps component CSS in that feature's `components/css` directory.
- Import page CSS from the page file only.
- Import component CSS from the component file only.
- Use page CSS for route composition and component CSS for reusable feature widgets.
