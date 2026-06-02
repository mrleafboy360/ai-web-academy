import Link from "next/link";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.academy_name ?? "Ai & Web Academy";
  const address = settings?.address;
  const city = settings?.city;
  const email = settings?.contact_email;
  const phone = settings?.contact_phone;
  const whatsapp = settings?.whatsapp;

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-5 px-3 py-6 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold sm:text-base">{name}</p>
          <p className="mt-1.5 text-[10px] leading-relaxed text-muted sm:mt-2 sm:text-xs">
            {settings?.tagline ??
              "Learn modern web development with AI-powered tools and hands-on projects."}
          </p>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted sm:mb-3 sm:text-xs">
            Contact
          </p>
          <ul className="space-y-1.5 text-[10px] sm:space-y-2 sm:text-xs">
            {email && (
              <li className="flex items-center gap-1.5 sm:gap-2">
                <Mail className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" />
                <a href={`mailto:${email}`} className="truncate hover:text-accent">
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" />
                <a href={`tel:${phone}`} className="hover:text-accent">
                  {phone}
                </a>
              </li>
            )}
            {whatsapp && (
              <li className="flex items-center gap-1.5 sm:gap-2">
                <MessageCircle className="h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" />
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted sm:mb-3 sm:text-xs">
            Location
          </p>
          {(address || city) && (
            <p className="flex items-start gap-1.5 text-[10px] sm:gap-2 sm:text-xs">
              <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-accent sm:h-3.5 sm:w-3.5" />
              <span>
                {address}
                {address && city ? ", " : ""}
                {city}
              </span>
            </p>
          )}
          {settings?.map_embed_url && (
            <div className="mt-3 overflow-hidden rounded-md border border-border sm:mt-4 sm:rounded-lg">
              <iframe
                title="Academy location"
                src={settings.map_embed_url}
                className="h-28 w-full sm:h-36"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border py-2.5 text-center text-[10px] text-muted sm:py-3 sm:text-xs">
        © {new Date().getFullYear()} {name}. ·{" "}
        <Link href="/login" className="hover:text-accent">
          Student Login
        </Link>
      </div>
    </footer>
  );
}
