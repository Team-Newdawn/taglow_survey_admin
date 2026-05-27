import type { JsonRecord, LocalizedText } from "./common";

export type SectionType =
  | "general"
  | "profile"
  | "satisfaction"
  | "space_tagging"
  | "free_text"
  | "submitter";

export type SurveySection = Readonly<{
  id: string;
  surveyId: string;
  sectionKey: string;
  title: LocalizedText;
  description?: LocalizedText;
  orderIndex: number;
  sectionType: SectionType;
  settings: JsonRecord;
}>;
