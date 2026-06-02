import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Users" };

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (users as Profile[] | null) ?? [];

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description="All registered students and admins"
      />

      {/* Mobile: card list */}
      <div className="mt-3 space-y-2 md:hidden">
        {list.map((u) => (
          <Card key={u.id} className="!p-2.5">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium leading-tight">{u.full_name}</p>
              <Badge variant={u.role === "admin" ? "default" : "success"}>{u.role}</Badge>
            </div>
            <p className="mt-1 truncate text-[10px] text-muted">{u.email}</p>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted">
              <span>{u.phone}</span>
              <span>{u.city}</span>
              <span>{formatDate(u.created_at)}</span>
            </div>
          </Card>
        ))}
        {!list.length && <p className="text-xs text-muted">No users yet.</p>}
      </div>

      {/* Desktop: table */}
      <Card className="mt-4 hidden overflow-x-auto p-0 md:block lg:mt-6">
        <table className="w-full text-xs lg:text-sm">
          <thead>
            <tr className="border-b border-border bg-background/50 text-left text-muted">
              <th className="px-3 py-2 font-medium lg:px-4 lg:py-3">Name</th>
              <th className="px-3 py-2 font-medium lg:px-4 lg:py-3">Email</th>
              <th className="px-3 py-2 font-medium lg:px-4 lg:py-3">Phone</th>
              <th className="px-3 py-2 font-medium lg:px-4 lg:py-3">City</th>
              <th className="px-3 py-2 font-medium lg:px-4 lg:py-3">Role</th>
              <th className="px-3 py-2 font-medium lg:px-4 lg:py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {list.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-3 py-2 font-medium lg:px-4 lg:py-3">{u.full_name}</td>
                <td className="px-3 py-2 lg:px-4 lg:py-3">{u.email}</td>
                <td className="px-3 py-2 lg:px-4 lg:py-3">{u.phone}</td>
                <td className="px-3 py-2 lg:px-4 lg:py-3">{u.city}</td>
                <td className="px-3 py-2 lg:px-4 lg:py-3">
                  <Badge variant={u.role === "admin" ? "default" : "success"}>
                    {u.role}
                  </Badge>
                </td>
                <td className="px-3 py-2 text-muted lg:px-4 lg:py-3">
                  {formatDate(u.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <p className="p-4 text-sm text-muted">No users yet.</p>}
      </Card>
    </div>
  );
}
