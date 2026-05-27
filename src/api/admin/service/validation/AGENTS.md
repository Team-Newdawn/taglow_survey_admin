# `src/api/admin/service/validation` Instructions

Owns Zod schemas and pure validation routines.

## Include

- question config schemas,
- survey schema,
- section schema,
- asset schema,
- publish validation,
- preview validation,
- filter schema,
- analysis command validation.

## Rules

- Validation should return actionable errors with survey/section/question context when possible.
- Publish validation must cover survey title, public slug uniqueness, missing sections, questions, duplicate question keys, Korean titles, English warnings, image assets, attention-check expected values, profile-column mapping, options, and branch targets.
- Keep validation pure. Do not call Supabase or React APIs here.
