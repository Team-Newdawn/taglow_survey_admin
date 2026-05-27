# `src/api/admin/model` Instructions

Owns pure Taglow Admin domain types and commands.

## Include

- `Survey`, `SurveySection`, `Question`, `SurveyAsset`
- `AdminMember`, `AdminRole`, current-admin/session models
- `Answer` and preview models
- response summary and analysis result models
- command types such as `CreateSurveyCommand`, `UpdateQuestionCommand`, `AnalysisFilterCommand`
- enums/unions: survey status, locale, question type, metric type

## Rules

- No React imports.
- No Supabase imports.
- No TanStack Query imports.
- No raw row types unless they are clearly internal and not exported to views.
- Prefer stable ids and stable option values over translated labels.
- Model analysis metadata explicitly: `topicKey`, `spaceKey`, `metricType`, `answerType`.
- Survey assets include `storageBucket` and `storagePath`; do not assume a public URL is stored in the row.
- Localized text uses the TDD v2 `LocalizedText` shape rather than leaking `title_ko/title_en` into views.
