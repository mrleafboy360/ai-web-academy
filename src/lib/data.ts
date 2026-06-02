import { createClient } from "@/lib/supabase/server";
import type { BatchStat, Course, SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  return data;
}

export async function getActiveCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getBatchStats(): Promise<BatchStat[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("batch_stats")
    .select("*")
    .eq("is_active", true)
    .order("start_date", { ascending: true });
  return data ?? [];
}
