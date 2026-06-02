import { Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageShell } from "@/components/layout/PageShell";
import { LinkButton } from "@/components/ui/LinkButton";
import { getBatchStats, getSiteSettings } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Batches" };

export default async function BatchesPage() {
  const [batches, settings] = await Promise.all([getBatchStats(), getSiteSettings()]);
  const open = settings?.admissions_open ?? true;

  return (
    <PageShell>
      <PageHeader
        title="Batches"
        description="Enrollment counts and upcoming start dates."
      />

      <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
        {batches.length === 0 ? (
          <p className="text-xs text-muted sm:text-sm">No batches available right now.</p>
        ) : (
          batches.map((b) => {
            const seatsLeft = b.max_seats - b.enrolled_count;
            const pct = Math.min(100, Math.round((b.enrolled_count / b.max_seats) * 100));
            return (
              <Card key={b.id} className="!p-2.5 sm:!p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xs font-semibold sm:text-base">{b.name}</h2>
                  {seatsLeft <= 5 && seatsLeft > 0 && (
                    <Badge variant="warning">{seatsLeft} left</Badge>
                  )}
                  {seatsLeft <= 0 && <Badge variant="danger">Full</Badge>}
                </div>
                <div className="mt-2 space-y-1 text-[10px] text-muted sm:mt-3 sm:text-xs">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-accent" />
                    Starts: {formatDate(b.start_date)}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="h-3 w-3 text-accent" />
                    {b.enrolled_count}/{b.max_seats} enrolled
                  </p>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Card>
            );
          })
        )}
      </div>

      {open && (
        <Card className="mt-4 text-center sm:mt-8">
          <p className="text-xs font-medium sm:text-sm">Want to join a batch?</p>
          <div className="mt-2 sm:mt-3">
            <LinkButton href="/signup">Sign up now</LinkButton>
          </div>
        </Card>
      )}
    </PageShell>
  );
}
