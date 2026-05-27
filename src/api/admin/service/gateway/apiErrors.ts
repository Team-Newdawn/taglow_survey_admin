export type AdminApiErrorCode =
  | "UNAUTHENTICATED"
  | "NOT_HANDONG_EMAIL"
  | "ADMIN_ACCESS_DENIED"
  | "SURVEY_NOT_FOUND"
  | "SURVEY_LOCKED_AFTER_PUBLISH"
  | "VALIDATION_FAILED"
  | "ASSET_UPLOAD_FAILED"
  | "RPC_FAILED"
  | "UNKNOWN";

export class AdminApiError extends Error {
  readonly code: AdminApiErrorCode;
  readonly cause?: unknown;

  constructor(code: AdminApiErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = "AdminApiError";
    this.code = code;
    this.cause = cause;
  }
}

export function normalizeAdminApiError(error: unknown, fallbackCode: AdminApiErrorCode = "UNKNOWN"): AdminApiError {
  if (error instanceof AdminApiError) {
    return error;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = String((error as { message?: unknown }).message ?? "Unknown admin API error");
    return new AdminApiError(fallbackCode, message, error);
  }

  return new AdminApiError(fallbackCode, "Unknown admin API error", error);
}
