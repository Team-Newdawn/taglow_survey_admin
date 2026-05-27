# `src/view/admin/settings` Instructions

Owns survey settings screens for the v2 `/admin/surveys/:surveyId/settings` route.

## Responsibilities

- Survey metadata and access settings.
- Publish/close/archive controls when not handled in builder.
- Version and lock status display.
- Future admin-member management only if explicitly scoped.

## Rules

- Use admin query hooks and controller-backed mutations.
- Do not bypass publish validation or DB structure locks.
- Keep owner/admin/viewer permissions visible through domain models, not raw `admin_members` rows.
- Keep page-level CSS in `src/view/admin/settings/css`.
- Do not recreate report/export workflows here.
