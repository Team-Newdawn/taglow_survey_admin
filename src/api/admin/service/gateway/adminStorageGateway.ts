import type { JsonRecord } from "../../model";

export type UploadedSurveyAsset = Readonly<{
  storageBucket: string;
  storagePath: string;
  metadata: JsonRecord;
}>;

export interface AdminStorageGateway {
  uploadSurveyAsset(command: {
    surveyId: string;
    file: File;
    metadata?: JsonRecord;
  }): Promise<UploadedSurveyAsset>;
}
