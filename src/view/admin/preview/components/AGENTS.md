# `src/view/admin/preview/components` Instructions

Owns preview toolbar, device frame, scenario selector, and simulation controls.

## Rules

- Components should make preview mode visually obvious.
- Do not call response-submission mutations.
- Keep device frames stable across viewport sizes.
- Validation items should link or navigate back to the relevant builder section/question when possible.
- Keep each preview component's CSS in `src/view/admin/preview/components/css`.
- Component CSS owns toolbar controls, device frame internals, validation item states, and simulation controls.
