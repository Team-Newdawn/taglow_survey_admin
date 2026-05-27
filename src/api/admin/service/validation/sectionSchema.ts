import type { CreateSectionCommand, UpdateSectionCommand } from "../../model";

export function assertCreateSectionCommand(command: CreateSectionCommand): void {
  if (!command.surveyId) throw new Error("surveyId is required.");
  if (!command.sectionKey.trim()) throw new Error("sectionKey is required.");
  if (!command.title.ko.trim()) throw new Error("Korean section title is required.");
}

export function assertUpdateSectionCommand(command: UpdateSectionCommand): void {
  if (!command.sectionId) throw new Error("sectionId is required.");
}
