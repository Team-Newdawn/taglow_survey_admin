export type Locale = "ko" | "en";

export type LocalizedText = Readonly<{
  ko: string;
  en?: string;
}>;

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type JsonRecord = Record<string, JsonValue>;

export type Nullable<T> = T | null | undefined;

export function compactLocalizedText(ko: string, en?: Nullable<string>): LocalizedText {
  return en ? { ko, en } : { ko };
}
