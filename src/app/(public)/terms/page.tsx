import { PageHeader } from "@/components/layout/PageHeader";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Terms & Conditions" };

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const name = settings?.academy_name ?? "Ai & Web Academy";

  return (
    <PageShell>
      <PageHeader
        title="Terms & Conditions"
        description={`Rules and guidelines for students of ${name}.`}
      />
      <Card className="mt-4 sm:mt-6">
        <TermSection title="Enrollment & admission">
          Admission is subject to academy approval. Batch assignment, start dates, and seat
          availability are determined by administration. Admissions may open or close at any
          time as shown on the website.
        </TermSection>
        <TermSection title="Fees & payments">
          Course fees, payment schedules, and refund policies will be communicated separately
          by the academy. Failure to meet payment terms may result in suspension from classes.
        </TermSection>
        <TermSection title="Conduct">
          Students must attend classes regularly, respect instructors and peers, and use AI
          tools responsibly. Cheating, harassment, or misuse of academy resources may lead to
          removal.
        </TermSection>
        <TermSection title="Intellectual property">
          Course materials belong to {name}. You may use them for learning and portfolio work
          unless otherwise stated. Do not redistribute paid content without permission.
        </TermSection>
        <TermSection title="Website accounts">
          You must provide accurate registration information. One account per student. Sharing
          login credentials is not allowed.
        </TermSection>
        <TermSection title="Limitation of liability">
          {name} strives for quality education but does not guarantee employment outcomes.
          We are not liable for indirect damages arising from use of the website or services.
        </TermSection>
        <TermSection title="Changes">
          We may update these terms. Continued use of the site after changes constitutes
          acceptance. Check this page periodically.
        </TermSection>
        <p className="mt-4 text-[10px] text-muted sm:text-xs">
          Last updated: {new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </Card>
    </PageShell>
  );
}

function TermSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 border-b border-border/60 pb-4 last:mb-0 last:border-0 last:pb-0">
      <h2 className="text-xs font-semibold sm:text-sm">{title}</h2>
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted sm:text-xs">{children}</p>
    </div>
  );
}
