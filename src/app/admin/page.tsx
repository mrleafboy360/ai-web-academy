import { Users, UserCheck, Layers, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: usersCount },
    { count: admittedCount },
    { count: batchesCount },
    { count: coursesCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("admissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase.from("batches").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Students", value: usersCount ?? 0, icon: Users },
    { label: "Admitted", value: admittedCount ?? 0, icon: UserCheck },
    { label: "Batches", value: batchesCount ?? 0, icon: Layers },
    { label: "Courses", value: coursesCount ?? 0, icon: BookOpen },
  ];

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="Ai & Web Academy — overview" />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3 lg:mt-8 lg:grid-cols-4 lg:gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="!p-2.5 sm:!p-4">
            <s.icon className="h-4 w-4 text-accent sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
            <p className="mt-2 text-lg font-bold sm:mt-3 sm:text-xl lg:mt-4 lg:text-2xl">
              {s.value}
            </p>
            <p className="text-[10px] text-muted sm:text-xs lg:text-sm">{s.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
