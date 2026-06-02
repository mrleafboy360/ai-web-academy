import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function createClient() {
  const { url, anonKey, configured, issue } = getSupabaseEnv();
  if (!configured) {
    throw new Error(issue ?? "Supabase is not configured.");
  }
  return createBrowserClient(url, anonKey);
}
