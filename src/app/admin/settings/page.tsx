import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/types";

export const metadata = { title: "Site Settings" };

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  if (!data) {
    return <p className="text-xs sm:text-sm">Site settings not found. Run supabase/schema.sql first.</p>;
  }

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        description="Contact, address, admissions, footer"
      />
      <div className="mt-3 sm:mt-6 lg:mt-8">
        <SiteSettingsForm settings={data as SiteSettings} />
      </div>
    </div>
  );
}
