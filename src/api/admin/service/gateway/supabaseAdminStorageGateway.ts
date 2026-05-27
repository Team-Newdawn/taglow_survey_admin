import type { JsonRecord } from "../../model";
import { AdminApiError, normalizeAdminApiError } from "./apiErrors";
import type { AdminStorageGateway, UploadedSurveyAsset } from "./adminStorageGateway";

type SupabaseStorageLike = {
  storage: {
    from(bucket: string): {
      upload(path: string, file: File, options?: Record<string, unknown>): Promise<{ data: unknown; error: unknown }>;
    };
  };
};

export type SupabaseAdminStorageGatewayOptions = Readonly<{
  supabase: SupabaseStorageLike;
  bucket?: string;
}>;

export class SupabaseAdminStorageGateway implements AdminStorageGateway {
  private readonly bucket: string;

  constructor(private readonly options: SupabaseAdminStorageGatewayOptions) {
    this.bucket = options.bucket ?? "survey-assets";
  }

  async uploadSurveyAsset(command: {
    surveyId: string;
    file: File;
    metadata?: JsonRecord;
  }): Promise<UploadedSurveyAsset> {
    const extension = getFileExtension(command.file.name);
    const assetId = crypto.randomUUID();
    const storagePath = `surveys/${command.surveyId}/images/${assetId}${extension}`;

    try {
      const { error } = await this.options.supabase.storage.from(this.bucket).upload(storagePath, command.file, {
        cacheControl: "3600",
        contentType: command.file.type || undefined,
        upsert: false,
      });

      if (error) {
        throw normalizeAdminApiError(error, "ASSET_UPLOAD_FAILED");
      }

      return {
        storageBucket: this.bucket,
        storagePath,
        metadata: {
          ...(command.metadata ?? {}),
          originalName: command.file.name,
          contentType: command.file.type,
          size: command.file.size,
        },
      };
    } catch (error) {
      if (error instanceof AdminApiError) throw error;
      throw normalizeAdminApiError(error, "ASSET_UPLOAD_FAILED");
    }
  }
}

function getFileExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex < 0) return "";
  return fileName.slice(dotIndex).toLowerCase();
}
