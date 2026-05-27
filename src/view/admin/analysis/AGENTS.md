# `src/view/admin/analysis` Instructions

Owns the analysis workbench.

## Responsibilities

- Global Filter Bar.
- Response summary.
- Section averages.
- Group comparisons.
- Borich and Locus cards.
- Image tagging heatmap.
- Text answer table.

## Rules

- Use `adminFilterStore` for active UI filters.
- Use analysis query hooks for computed data.
- Do not run SQL or statistical formulas in page components.
- Every card should display N, active filters, and low-N warnings when available.
- Heatmap rendering must use normalized `x_ratio/y_ratio`.
- AI summaries must show representative original evidence.
- Use the v2 analysis query set: filter options, section satisfaction summary, Borich summary, heatmap points, and text answers.
- Keep page-level CSS in `src/view/admin/analysis/css`, for example `SurveyAnalysisPage.css`.
- Page CSS owns workbench grid, sticky Global Filter Bar position, tab layout, and card region spacing.
