import type { AnalysisFilters, HeatmapFilters, JsonRecord, TextAnswerFilters } from "../../model";

export function toAnalysisFilterPayload(filters: AnalysisFilters | HeatmapFilters | TextAnswerFilters): JsonRecord {
  return {
    gender: filters.gender ?? null,
    semester_group: filters.semesterGroup ?? null,
    department: filters.department ?? null,
    rc: filters.rc ?? null,
    dormitory: filters.dormitory ?? null,
    room_type: filters.roomType ?? null,
    dorm_experience: filters.dormExperience ?? null,
    section_id: filters.sectionId ?? null,
    topic_key: filters.topicKey ?? null,
    space_key: filters.spaceKey ?? null,
    asset_id: "assetId" in filters ? filters.assetId ?? null : null,
    tag_type: "tagType" in filters ? filters.tagType ?? null : null,
    keyword: "keyword" in filters ? filters.keyword ?? null : null,
  };
}
