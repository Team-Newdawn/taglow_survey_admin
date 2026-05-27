# `src/api/admin/controller` Instructions

Owns admin use-case contracts and implementations.

## Include

- `adminApiController.ts`
- `gatewayBackedAdminApiController.ts`
- `adminApiControllerProvider.tsx`

## Rules

- Controllers expose domain-model methods used by query hooks.
- Controllers compose gateways, mappers, and validators.
- Do not return raw rows/DTOs.
- Do not import TanStack Query.
- Avoid UI decisions. Return enough structured data for views to render states.
- Keep method names aligned with the TDD v2 contract: current admin, surveys, section/question reorder, image upload, publish validation, next version, preview survey, filter options, section satisfaction summary, Borich, heatmap, and text answers.
