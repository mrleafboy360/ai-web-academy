"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import type { Batch, Course } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type BatchWithCourse = Batch & { courses?: { title: string } | null };

export function BatchesManager({
  batches: initial,
  courses,
}: {
  batches: BatchWithCourse[];
  courses: Course[];
}) {
  const router = useRouter();
  const [batches, setBatches] = useState(initial);
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [maxSeats, setMaxSeats] = useState("30");
  const [loading, setLoading] = useState(false);

  async function addBatch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("batches")
      .insert({
        name,
        course_id: courseId || null,
        start_date: startDate || null,
        max_seats: parseInt(maxSeats, 10) || 30,
      })
      .select("*, courses(title)")
      .single();
    setLoading(false);
    if (!error && data) {
      setBatches((b) => [...b, data]);
      setName("");
      setStartDate("");
      router.refresh();
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <Card>
        <h2 className="text-xs font-semibold sm:text-sm lg:text-base">Add Batch</h2>
        <form onSubmit={addBatch} className="mt-3 grid gap-2 sm:mt-4 sm:gap-3 sm:grid-cols-2">
          <Input label="Batch Name" required value={name} onChange={(e) => setName(e.target.value)} />
          <label className="block space-y-1 text-xs sm:col-span-2 sm:space-y-1.5 sm:text-sm">
            <span className="font-medium">Course</span>
            <select
              className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-xs sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              <option value="">— Select —</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="Max Seats"
            type="number"
            value={maxSeats}
            onChange={(e) => setMaxSeats(e.target.value)}
          />
          <div className="sm:col-span-2">
            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
              {loading ? "Adding…" : "Add"}
            </Button>
          </div>
        </form>
      </Card>

      <div className="space-y-2 sm:space-y-3">
        {batches.map((b) => (
          <Card key={b.id}>
            <p className="text-xs font-medium sm:text-sm">{b.name}</p>
            <p className="mt-1 text-[10px] leading-snug text-muted sm:text-xs">
              {b.courses?.title && `Course: ${b.courses.title} · `}
              Starts: {formatDate(b.start_date)} · Max seats: {b.max_seats}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
