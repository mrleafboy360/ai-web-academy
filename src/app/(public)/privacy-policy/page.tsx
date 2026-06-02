import { PageHeader } from "@/components/layout/PageHeader";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Privacy Policy" };

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const name = settings?.academy_name ?? "Ai & Web Academy";

  return (
    <PageShell>
      <PageHeader
        title="Privacy Policy"
        description={`How ${name} collects and protects your information.`}
      />
      <Card className="mt-4 prose-policy sm:mt-6">
        <PolicySection title="Information we collect">
          When you register, we collect your name, email, phone number, address, city, and
          optional CNIC. This data is stored securely in our database (Supabase) for admission
          and academy administration.
        </PolicySection>
        <PolicySection title="How we use your data">
          Your information is used to process admissions, assign batches, communicate about
          classes, and improve our services. We do not sell your personal data to third parties.
        </PolicySection>
        <PolicySection title="Account security">
          Passwords are handled by Supabase Auth using industry-standard encryption. You are
          responsible for keeping your login credentials confidential.
        </PolicySection>
        <PolicySection title="Cookies & analytics">
          We may use essential cookies for authentication and site functionality. Optional
          analytics may be added in the future with notice on this page.
        </PolicySection>
        <PolicySection title="Your rights">
          You may request correction or deletion of your data by contacting us through the
          Contact page. Admin-processed admissions records may be retained as required for
          academy operations.
        </PolicySection>
        <PolicySection title="Contact">
          For privacy questions, reach us via the contact details on our Contact page or
          footer.
        </PolicySection>
        <p className="mt-4 text-[10px] text-muted sm:text-xs">
          Last updated: {new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </Card>
    </PageShell>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 border-b border-border/60 pb-4 last:mb-0 last:border-0 last:pb-0">
      <h2 className="text-xs font-semibold sm:text-sm">{title}</h2>
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted sm:text-xs">{children}</p>
    </div>
  );
}
