# `src/view/admin/surveys/components` Instructions

Owns survey list/dashboard widgets.

## Rules

- Keep cards and tables reusable within surveys screens.
- Receive domain models as props.
- No direct API calls.
- Keep status and warning badges consistent with shared components if available.
- Keep each survey component's CSS in `src/view/admin/surveys/components/css`.
- Component CSS should own card/table/badge internals and not depend on page CSS selectors.
