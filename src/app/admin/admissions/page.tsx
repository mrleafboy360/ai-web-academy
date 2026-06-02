import { AdmissionsManager } from "@/components/admin/AdmissionsManager";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";
import type { Admission, Batch, Profile } from "@/lib/types";

export const metadata = { title: "Admissions" };

export default async function AdminAdmissionsPage() {
  const supabase = await createClient();
  const [{ data: admissions }, { data: students }, { data: batches }] =
    await Promise.all([
      supabase
        .from("admissions")
        .select("*, profiles(full_name, email), batches(name)")
        .order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").eq("role", "student").order("full_name"),
      supabase.from("batches").select("*").eq("is_active", true).order("name"),
    ]);

  return (
    <div>
      <AdminPageHeader title="Admissions" description="Approve students, assign batches" />
      <div className="mt-3 sm:mt-6 lg:mt-8">
        <AdmissionsManager
          admissions={
            (admissions as (Admission & {
              profiles: Pick<Profile, "full_name" | "email"> | null;
              batches: Pick<Batch, "name"> | null;
            })[]) ?? []
          }
          students={(students as Profile[]) ?? []}
          batches={(batches as Batch[]) ?? []}
        />
      </div>
    </div>
  );
}
