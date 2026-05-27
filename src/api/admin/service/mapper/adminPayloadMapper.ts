import {
  compactLocalizedText,
  type AdminMember,
  type AdminRole,
  type BorichResult,
  type FilterOptions,
  type HeatmapPoint,
  type JsonRecord,
  type MetricType,
  type Question,
  type QuestionType,
  type SectionSummary,
  type SectionType,
  type Survey,
  type SurveyAsset,
  type SurveyAssetType,
  type SurveySection,
  type SurveyStatus,
  type TextAnswer,
} from "../../model";
import type {
  RawAdminMember,
  RawBorichResult,
  RawFilterOptions,
  RawHeatmapPoint,
  RawQuestion,
  RawSection,
  RawSectionSummary,
  RawSurvey,
  RawSurveyAsset,
  RawTextAnswer,
} from "../gateway/rawTypes";

export class AdminPayloadMapper {
  toAdminMember(row: RawAdminMember): AdminMember {
    return {
      id: row.id,
      userId: row.user_id,
      email: row.email,
      role: normalizeAdminRole(row.role),
      isActive: row.is_active,
      createdAt: row.created_at,
    };
  }

  toSurvey(row: RawSurvey): Survey {
    return {
      id: row.id,
      title: row.title,
      description: row.description ?? undefined,
      status: normalizeSurveyStatus(row.status),
      publicSlug: row.public_slug ?? undefined,
      versionGroupId: row.version_group_id,
      versionNumber: row.version_number,
      parentSurveyId: row.parent_survey_id ?? undefined,
      isLatestVersion: row.is_latest_version,
      settings: normalizeRecord(row.settings),
      createdBy: row.created_by,
      publishedAt: row.published_at ?? undefined,
      closedAt: row.closed_at ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  toSection(row: RawSection): SurveySection {
    return {
      id: row.id,
      surveyId: row.survey_id,
      sectionKey: row.section_key,
      title: compactLocalizedText(row.title_ko, row.title_en),
      description: row.description_ko ? compactLocalizedText(row.description_ko, row.description_en) : undefined,
      orderIndex: row.order_index,
      sectionType: normalizeSectionType(row.section_type),
      settings: normalizeRecord(row.settings),
    };
  }

  toQuestion(row: RawQuestion): Question {
    return {
      id: row.id,
      surveyId: row.survey_id,
      sectionId: row.section_id,
      questionKey: row.question_key,
      questionType: normalizeQuestionType(row.question_type),
      title: compactLocalizedText(row.title_ko, row.title_en),
      description: row.description_ko ? compactLocalizedText(row.description_ko, row.description_en) : undefined,
      orderIndex: row.order_index,
      isRequired: row.is_required,
      metricType: normalizeMetricType(row.metric_type),
      topicKey: row.topic_key ?? undefined,
      spaceKey: row.space_key ?? undefined,
      config: normalizeRecord(row.config),
      validation: normalizeRecord(row.validation),
    };
  }

  toAsset(row: RawSurveyAsset): SurveyAsset {
    return {
      id: row.id,
      surveyId: row.survey_id,
      sectionId: row.section_id ?? undefined,
      questionId: row.question_id ?? undefined,
      assetType: normalizeAssetType(row.asset_type),
      storageBucket: row.storage_bucket,
      storagePath: row.storage_path,
      metadata: normalizeRecord(row.metadata),
      createdAt: row.created_at,
    };
  }

  toFilterOptions(row: RawFilterOptions): FilterOptions {
    return {
      genders: normalizeStringArray(row.genders),
      semesterGroups: normalizeStringArray(row.semester_groups),
      departments: normalizeStringArray(row.departments),
      rcs: normalizeStringArray(row.rcs),
      dormitories: normalizeStringArray(row.dormitories),
      roomTypes: normalizeStringArray(row.room_types),
      dormExperiences: normalizeStringArray(row.dorm_experiences),
    };
  }

  toSectionSummary(row: RawSectionSummary): SectionSummary {
    return {
      sectionId: row.section_id,
      sectionTitle: row.section_title ?? "Untitled section",
      averageScore: row.average_score,
      n: row.n,
    };
  }

  toBorichResult(row: RawBorichResult): BorichResult {
    return {
      topicKey: row.topic_key,
      averageImportance: row.average_importance,
      averageSatisfaction: row.average_satisfaction,
      gap: row.gap,
      borichScore: row.borich_score,
      n: row.n,
    };
  }

  toHeatmapPoint(row: RawHeatmapPoint): HeatmapPoint {
    return {
      assetId: row.asset_id,
      xRatio: row.x_ratio,
      yRatio: row.y_ratio,
      tagType: row.tag_type ?? undefined,
      severity: row.severity ?? undefined,
      textValue: row.text_value ?? undefined,
      responseProfile: row.response_profile ?? undefined,
    };
  }

  toTextAnswer(row: RawTextAnswer): TextAnswer {
    return {
      id: row.id,
      responseId: row.response_id,
      sectionId: row.section_id ?? undefined,
      questionId: row.question_id ?? undefined,
      topicKey: row.topic_key ?? undefined,
      spaceKey: row.space_key ?? undefined,
      textValue: row.text_value ?? "",
      profile: row.profile ?? undefined,
      createdAt: row.created_at,
    };
  }
}

function normalizeRecord(value: JsonRecord | null | undefined): JsonRecord {
  return value ?? {};
}

function normalizeStringArray(value: string[] | null | undefined): string[] {
  return (value ?? []).filter(Boolean);
}

function normalizeAdminRole(value: string): AdminRole {
  if (value === "owner" || value === "admin" || value === "viewer") return value;
  return "viewer";
}

function normalizeSurveyStatus(value: string): SurveyStatus {
  if (value === "draft" || value === "published" || value === "closed" || value === "archived") return value;
  return "draft";
}

function normalizeSectionType(value: string): SectionType {
  const allowed: SectionType[] = ["general", "profile", "satisfaction", "space_tagging", "free_text", "submitter"];
  return allowed.includes(value as SectionType) ? (value as SectionType) : "general";
}

function normalizeQuestionType(value: string): QuestionType {
  const allowed: QuestionType[] = [
    "profile",
    "experience",
    "scale",
    "single_choice",
    "multi_select",
    "ranking",
    "text",
    "image_tag",
    "attention_check",
  ];
  return allowed.includes(value as QuestionType) ? (value as QuestionType) : "text";
}

function normalizeMetricType(value: string | null): MetricType {
  if (value === "satisfaction" || value === "importance" || value === "experience") return value;
  return "none";
}

function normalizeAssetType(value: string): SurveyAssetType {
  if (value === "image" || value === "export" || value === "attachment") return value;
  return "attachment";
}
