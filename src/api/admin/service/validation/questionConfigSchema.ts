import type { Question, QuestionConfig } from "../../model";

export function validateQuestionConfig(question: Question): string[] {
  const config = question.config as QuestionConfig & Record<string, unknown>;
  const issues: string[] = [];

  if (question.questionType === "scale") {
    if (typeof config.scaleMin !== "number" || typeof config.scaleMax !== "number") {
      issues.push("Scale questions require scaleMin and scaleMax.");
    }
    if (!Array.isArray(config.labelsKo) || config.labelsKo.length === 0) {
      issues.push("Scale questions require labelsKo.");
    }
  }

  if (question.questionType === "single_choice" && !Array.isArray(config.options)) {
    issues.push("Single choice questions require options.");
  }

  if (question.questionType === "multi_select" && !Array.isArray(config.options)) {
    issues.push("Multi select questions require options.");
  }

  if (question.questionType === "image_tag" && !config.assetId) {
    issues.push("Image tag questions require assetId.");
  }

  if (question.questionType === "attention_check" && !config.expectedValue) {
    issues.push("Attention check questions require expectedValue.");
  }

  return issues;
}
