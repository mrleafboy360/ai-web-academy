import { BatchesManager } from "@/components/admin/BatchesManager";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";
import type { Batch, Course } from "@/lib/types";

export const metadata = { title: "Batches" };

export default async function AdminBatchesPage() {
  const supabase = await createClient();
  const [{ data: batches }, { data: courses }] = await Promise.all([
    supabase.from("batches").select("*, courses(title)").order("created_at", { ascending: false }),
    supabase.from("courses").select("*").eq("is_active", true),
  ]);

  return (
    <div>
      <AdminPageHeader title="Batches" description="Start dates and seat limits" />
      <div className="mt-3 sm:mt-6 lg:mt-8">
        <BatchesManager
          batches={(batches as (Batch & { courses?: { title: string } })[]) ?? []}
          courses={(courses as Course[]) ?? []}
        />
      </div>
    </div>
  );
}
