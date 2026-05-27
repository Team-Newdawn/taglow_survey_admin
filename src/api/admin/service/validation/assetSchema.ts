import type { UploadSurveyImageCommand } from "../../model";

export function assertUploadSurveyImageCommand(command: UploadSurveyImageCommand): void {
  if (!command.surveyId) throw new Error("surveyId is required.");
  if (!command.file) throw new Error("file is required.");
  if (!command.file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded as survey images.");
  }
}
