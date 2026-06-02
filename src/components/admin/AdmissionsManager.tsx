"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/client";
import type { Admission, Batch, Profile } from "@/lib/types";
import { formatDate, admissionStatusLabel } from "@/lib/utils";

type AdmissionRow = Admission & {
  profiles: Pick<Profile, "full_name" | "email"> | null;
  batches: Pick<Batch, "name"> | null;
};

export function AdmissionsManager({
  admissions: initial,
  students,
  batches,
}: {
  admissions: AdmissionRow[];
  students: Profile[];
  batches: Batch[];
}) {
  const router = useRouter();
  const [admissions, setAdmissions] = useState(initial);
  const [userId, setUserId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [classStart, setClassStart] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const studentsWithoutAdmission = students.filter(
    (s) => s.role === "student" && !admissions.some((a) => a.user_id === s.id)
  );

  async function admitStudent(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("admissions")
      .insert({
        user_id: userId,
        batch_id: batchId || null,
        status: "approved",
        admitted_at: new Date().toISOString(),
        class_start_date: classStart || null,
        notes: notes || null,
      })
      .select("*, profiles(full_name, email), batches(name)")
      .single();
    setLoading(false);
    if (!error && data) {
      setAdmissions((a) => [data, ...a]);
      setUserId("");
      setBatchId("");
      setClassStart("");
      setNotes("");
      router.refresh();
    }
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("admissions").update({ status }).eq("id", id);
    setAdmissions((list) =>
      list.map((a) => (a.id === id ? { ...a, status: status as Admission["status"] } : a))
    );
    router.refresh();
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <Card>
        <h2 className="text-xs font-semibold sm:text-sm lg:text-base">Admit New Student</h2>
        <form onSubmit={admitStudent} className="mt-3 grid gap-2 sm:mt-4 sm:gap-3 sm:grid-cols-2">
          <label className="block space-y-1 text-xs sm:col-span-2 sm:space-y-1.5 sm:text-sm">
            <span className="font-medium">Student *</span>
            <select
              required
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="">— Select student —</option>
              {studentsWithoutAdmission.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.full_name} ({s.email})
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1 text-xs sm:space-y-1.5 sm:text-sm">
            <span className="font-medium">Batch</span>
            <select
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
            >
              <option value="">— Select —</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Class Start Date"
            type="date"
            value={classStart}
            onChange={(e) => setClassStart(e.target.value)}
          />
          <Textarea
            label="Notes"
            className="sm:col-span-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="sm:col-span-2">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={loading || !studentsWithoutAdmission.length}
            >
              {loading ? "Saving…" : "Approve"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-2 sm:space-y-3">
        {admissions.map((a) => (
          <Card key={a.id} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium sm:text-sm">{a.profiles?.full_name}</p>
              <p className="truncate text-[10px] text-muted sm:text-xs">{a.profiles?.email}</p>
              <p className="mt-1 text-[10px] sm:text-xs">
                Batch: {a.batches?.name ?? "—"} · Class start:{" "}
                {formatDate(a.class_start_date)}
              </p>
              <div className="mt-2">
                <Badge variant={a.status === "approved" ? "success" : a.status === "rejected" ? "danger" : "warning"}>
                  {admissionStatusLabel[a.status]}
                </Badge>
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5 sm:gap-2">
              {a.status !== "approved" && (
                <Button type="button" onClick={() => updateStatus(a.id, "approved")}>
                  OK
                </Button>
              )}
              {a.status !== "rejected" && (
                <Button type="button" variant="secondary" onClick={() => updateStatus(a.id, "rejected")}>
                  No
                </Button>
              )}
            </div>
          </Card>
        ))}
        {!admissions.length && <p className="text-xs text-muted sm:text-sm">No admissions yet.</p>}
      </div>
    </div>
  );
}
