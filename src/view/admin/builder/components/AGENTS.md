# `src/view/admin/builder/components` Instructions

Owns builder panels and editors.

## Expected Components

- `SectionListPanel`
- `SectionEditorPanel`
- `QuestionListPanel`
- `QuestionEditorPanel`
- `ImageAssetPanel`
- `PublishChecklistPanel`

## Rules

- Components may use form context when scoped to one editor.
- Components should receive query data through props from the page unless a local hook keeps the component simpler without crossing boundaries.
- Keep question-type config editors small and testable.
- Show validation problems at the section/question that caused them.
- Keep each builder component's CSS in `src/view/admin/builder/components/css`.
- Component CSS owns editor controls, panel internals, selected/drag/validation states, and question-type-specific layouts.
- Do not reach into page shell classes from component CSS.
