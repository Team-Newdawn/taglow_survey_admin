export type AdminApiMode = "supabase" | "http";

export type EnvConfig = Readonly<{
  apiMode: AdminApiMode;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  apiBaseUrl?: string;
  storageBucket: string;
}>;

type ImportMetaEnvLike = Record<string, string | undefined>;

export function readEnvConfig(env: ImportMetaEnvLike = getDefaultEnv()): EnvConfig {
  const apiMode = normalizeApiMode(env.VITE_ADMIN_API_MODE);
  return {
    apiMode,
    supabaseUrl: env.VITE_SUPABASE_URL,
    supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY,
    apiBaseUrl: env.VITE_ADMIN_API_BASE_URL,
    storageBucket: env.VITE_SUPABASE_SURVEY_ASSETS_BUCKET ?? "survey-assets",
  };
}

function normalizeApiMode(value: string | undefined): AdminApiMode {
  return value === "http" ? "http" : "supabase";
}

function getDefaultEnv(): ImportMetaEnvLike {
  return (import.meta as unknown as { env?: ImportMetaEnvLike }).env ?? {};
}
