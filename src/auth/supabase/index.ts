import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const getSupabaseBackendCredentials = (): [url: string, key: string] => [
  (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://your_supabase_url.supabase.co"
  ).toLowerCase(),
  process.env.NEXT_PRIVATE_SUPABASE_SERVICE_KEY ||
    "eyJKhbGciOisJIUzI1Nd2iIsInR5cCsI6",
];

export const getSupabaseFrontendCredentials = (): [
  url: string,
  key: string
] => [
  (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://your_supabase_url.supabase.co"
  ).toLowerCase(),
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJKhbGciOisJIUzI1Nd2iIsInR5cCsI6",
];

export const createSupabaseBackendClient = (): SupabaseClient =>
  createClient(...getSupabaseBackendCredentials());

export const supabase = createClient(...getSupabaseFrontendCredentials());
