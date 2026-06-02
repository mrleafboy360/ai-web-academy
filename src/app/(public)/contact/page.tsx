import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageShell } from "@/components/layout/PageShell";
import { MapEmbed } from "@/components/map/MapEmbed";
import { LinkButton } from "@/components/ui/LinkButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const open = settings?.admissions_open ?? true;

  return (
    <PageShell>
      <ScrollReveal>
        <PageHeader
          title="Contact Us"
          description="Reach the academy team — we are happy to help."
          badge={{
            label: `Admissions ${open ? "Open" : "Closed"}`,
            variant: open ? "success" : "danger",
          }}
        />
      </ScrollReveal>

      <div className="mt-4 grid gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-2">
        <ScrollReveal delay={80}>
          <Card className="!p-2.5 sm:!p-4">
            <h2 className="text-xs font-semibold sm:text-sm">Get in touch</h2>
            <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
              {settings?.contact_email && (
                <li className="flex items-center gap-2 text-[10px] sm:text-xs">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
                  <a href={`mailto:${settings.contact_email}`} className="truncate hover:text-accent">
                    {settings.contact_email}
                  </a>
                </li>
              )}
              {settings?.contact_phone && (
                <li className="flex items-center gap-2 text-[10px] sm:text-xs">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
                  <a href={`tel:${settings.contact_phone}`}>{settings.contact_phone}</a>
                </li>
              )}
              {settings?.whatsapp && (
                <li className="flex items-center gap-2 text-[10px] sm:text-xs">
                  <MessageCircle className="h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent"
                  >
                    WhatsApp: {settings.whatsapp}
                  </a>
                </li>
              )}
              {(settings?.address || settings?.city) && (
                <li className="flex items-start gap-2 text-[10px] sm:text-xs">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
                  <span>
                    {settings.address}
                    {settings.address && settings.city ? ", " : ""}
                    {settings.city}
                  </span>
                </li>
              )}
            </ul>
            {open && (
              <div className="mt-4 border-t border-border pt-3">
                <LinkButton href="/signup">Apply for admission</LinkButton>
              </div>
            )}
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div>
            <h2 className="mb-2 text-xs font-semibold text-muted sm:text-sm">Find us on the map</h2>
            <MapEmbed
              mapEmbedUrl={settings?.map_embed_url}
              address={settings?.address}
              city={settings?.city}
              className="h-56 w-full sm:h-64"
            />
          </div>
        </ScrollReveal>
      </div>
    </PageShell>
  );
}
