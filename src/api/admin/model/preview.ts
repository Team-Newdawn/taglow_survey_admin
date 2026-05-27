import type { Locale } from "./common";
import type { SurveyDetail } from "./survey";

export type PreviewDevice = "mobile" | "desktop";

export type PreviewOptions = Readonly<{
  locale: Locale;
  device?: PreviewDevice;
  sectionId?: string;
  scenarioAnswers?: Record<string, unknown>;
}>;

export type PreviewSurveyCommand = Readonly<{
  surveyId: string;
  options: PreviewOptions;
}>;

export type PreviewSurvey = SurveyDetail & Readonly<{
  previewMode: true;
  options: PreviewOptions;
}>;

export type PublishValidationSeverity = "error" | "warning";

export type PublishValidationIssue = Readonly<{
  severity: PublishValidationSeverity;
  code: string;
  message: string;
  sectionId?: string;
  questionId?: string;
}>;

export type PublishValidationResult = Readonly<{
  canPublish: boolean;
  issues: PublishValidationIssue[];
}>;
