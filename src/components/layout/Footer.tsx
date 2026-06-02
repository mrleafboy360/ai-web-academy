import Link from "next/link";
import { MapPin, Mail, Phone, MessageCircle, Sparkles } from "lucide-react";
import { MapEmbed } from "@/components/map/MapEmbed";
import type { SiteSettings } from "@/lib/types";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/batches", label: "Batches" },
  { href: "/contact", label: "Contact Us" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

const accountLinks = [
  { href: "/signup", label: "Sign Up" },
  { href: "/login", label: "Student Login" },
  { href: "/forgot-password", label: "Forgot Password" },
];

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const name = settings?.academy_name ?? "Ai & Web Academy";
  const address = settings?.address;
  const city = settings?.city;
  const email = settings?.contact_email;
  const phone = settings?.contact_phone;
  const whatsapp = settings?.whatsapp;

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-cyan-500/5" />

      <div className="relative mx-auto max-w-6xl px-3 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold sm:text-base">{name}</p>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-muted sm:text-xs">
              {settings?.tagline ??
                "Learn modern web development with AI-powered tools and real projects."}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {settings?.admissions_open ? (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  Admissions Open
                </span>
              ) : (
                <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-medium text-red-600 dark:text-red-400">
                  Admissions Closed
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent sm:text-xs">
                Quick Links
              </p>
              <ul className="space-y-1.5">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[10px] text-muted transition hover:text-accent sm:text-xs"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent sm:text-xs">
                Legal
              </p>
              <ul className="space-y-1.5">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[10px] text-muted transition hover:text-accent sm:text-xs"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent sm:text-xs">
                Students
              </p>
              <ul className="space-y-1.5">
                {accountLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[10px] text-muted transition hover:text-accent sm:text-xs"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent sm:text-xs">
              Contact
            </p>
            <ul className="space-y-1.5 text-[10px] sm:text-xs">
              {email && (
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 shrink-0 text-accent" />
                  <a href={`mailto:${email}`} className="truncate hover:text-accent">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 shrink-0 text-accent" />
                  <a href={`tel:${phone}`}>{phone}</a>
                </li>
              )}
              {whatsapp && (
                <li className="flex items-center gap-1.5">
                  <MessageCircle className="h-3 w-3 shrink-0 text-accent" />
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
              {(address || city) && (
                <li className="flex items-start gap-1.5">
                  <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                  <span>
                    {address}
                    {address && city ? ", " : ""}
                    {city}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Map full width */}
        <div className="mt-6 sm:mt-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
            Our Location
          </p>
          <MapEmbed
            mapEmbedUrl={settings?.map_embed_url}
            address={address}
            city={city}
            className="h-44 w-full sm:h-52"
          />
        </div>
      </div>

      <div className="relative border-t border-border/80 bg-surface/50 py-3 text-center">
        <p className="text-[10px] text-muted sm:text-xs">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
