"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import type { Course } from "@/lib/types";

export function CoursesManager({ courses: initial }: { courses: Course[] }) {
  const router = useRouter();
  const [courses, setCourses] = useState(initial);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [highlights, setHighlights] = useState("");
  const [loading, setLoading] = useState(false);

  async function addCourse(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        duration_weeks: duration ? parseInt(duration, 10) : null,
        highlights: highlights
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      })
      .select()
      .single();
    setLoading(false);
    if (!error && data) {
      setCourses((c) => [...c, data]);
      setTitle("");
      setDescription("");
      setDuration("");
      setHighlights("");
      router.refresh();
    }
  }

  async function toggleActive(id: string, isActive: boolean) {
    const supabase = createClient();
    await supabase.from("courses").update({ is_active: !isActive }).eq("id", id);
    setCourses((list) =>
      list.map((c) => (c.id === id ? { ...c, is_active: !isActive } : c))
    );
    router.refresh();
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <Card>
        <h2 className="text-xs font-semibold sm:text-sm lg:text-base">Add Course</h2>
        <form onSubmit={addCourse} className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
          <Input label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Duration (weeks)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Textarea
            label="Highlights (one per line)"
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
          />
          <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
            {loading ? "Adding…" : "Add"}
          </Button>
        </form>
      </Card>

      <div className="space-y-2 sm:space-y-3">
        {courses.map((c) => (
          <Card key={c.id} className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium sm:text-sm">{c.title}</p>
              <p className="text-[10px] text-muted sm:text-xs">
                {c.is_active ? "Active" : "Inactive"}
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="shrink-0"
              onClick={() => toggleActive(c.id, c.is_active)}
            >
              {c.is_active ? "Off" : "On"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
