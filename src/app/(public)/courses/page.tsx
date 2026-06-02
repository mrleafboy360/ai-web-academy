import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageShell } from "@/components/layout/PageShell";
import { LinkButton } from "@/components/ui/LinkButton";
import { getActiveCourses, getSiteSettings } from "@/lib/data";

export const metadata = { title: "Courses" };

export default async function CoursesPage() {
  const [courses, settings] = await Promise.all([getActiveCourses(), getSiteSettings()]);
  const open = settings?.admissions_open ?? true;

  return (
    <PageShell>
      <PageHeader
        title="Our Courses"
        description={`Learn web development with AI at ${settings?.academy_name ?? "Ai & Web Academy"}.`}
        badge={{
          label: `Admissions ${open ? "Open" : "Closed"}`,
          variant: open ? "success" : "danger",
        }}
      />

      <div className="mt-4 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-4">
        {courses.length === 0 ? (
          <p className="text-xs text-muted sm:text-sm">Courses will be listed here soon.</p>
        ) : (
          courses.map((c) => (
            <Card key={c.id} className="!p-2.5 sm:!p-4">
              <h2 className="text-sm font-semibold sm:text-lg">{c.title}</h2>
              <p className="mt-1 text-[10px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
                {c.description}
              </p>
              {c.duration_weeks && (
                <p className="mt-2 text-[10px] sm:text-xs">
                  <span className="text-muted">Duration:</span>{" "}
                  <strong>{c.duration_weeks} weeks</strong>
                </p>
              )}
              {c.highlights?.length > 0 && (
                <ul className="mt-2 space-y-1 sm:mt-3">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-1.5 text-[10px] sm:text-xs">
                      <span className="text-accent">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))
        )}
      </div>

      {open && (
        <div className="mt-6 text-center sm:mt-10">
          <LinkButton href="/signup">Apply for admission</LinkButton>
        </div>
      )}
    </PageShell>
  );
}
