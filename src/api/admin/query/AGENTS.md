# `src/api/admin/query` Instructions

Owns TanStack Query integration for admin data.

## Include

- `queryKeys.ts`
- `useAdminAuthQueries.ts`
- survey/builder/asset/preview/publish/analysis query hooks

## Rules

- Query hooks call `AdminApiController` only.
- Do not import gateways or mappers.
- Do not expose raw rows/DTOs.
- Query keys must include every argument that changes results, especially survey id and analysis filters.
- Include `currentAdmin`, `assets`, `filterOptions`, `sectionSummary`, `borich`, `heatmap`, and `textAnswers` keys as described by TDD v2.
- Mutations must invalidate the smallest relevant keys:
  - survey create/update/publish -> survey list/detail,
  - section/question changes -> builder data and preview validation,
  - asset upload/delete -> assets, questions, preview validation,
  - publish/close -> surveys and survey detail,
  - filter changes -> analysis queries through query key changes.
- Keep hooks thin; business behavior belongs in controller or validation.
