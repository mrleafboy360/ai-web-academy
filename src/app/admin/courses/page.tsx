import { CoursesManager } from "@/components/admin/CoursesManager";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";

export const metadata = { title: "Courses" };

export default async function AdminCoursesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("courses").select("*").order("sort_order");

  return (
    <div>
      <AdminPageHeader title="Courses" description="Manage academy courses" />
      <div className="mt-3 sm:mt-6 lg:mt-8">
        <CoursesManager courses={(data as Course[]) ?? []} />
      </div>
    </div>
  );
}
