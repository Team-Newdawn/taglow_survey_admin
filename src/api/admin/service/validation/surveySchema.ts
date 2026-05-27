import type { CreateSurveyCommand, UpdateSurveyCommand } from "../../model";

export function assertCreateSurveyCommand(command: CreateSurveyCommand): void {
  if (!command.title.trim()) {
    throw new Error("Survey title is required.");
  }
}

export function assertUpdateSurveyCommand(command: UpdateSurveyCommand): void {
  if (!command.surveyId) {
    throw new Error("surveyId is required.");
  }
}
