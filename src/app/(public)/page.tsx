import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  Users,
  Calendar,
  GraduationCap,
  Sparkles,
  Zap,
  Layout,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getSiteSettings, getActiveCourses, getBatchStats } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [settings, courses, batches] = await Promise.all([
    getSiteSettings(),
    getActiveCourses(),
    getBatchStats(),
  ]);

  const admissionsOpen = settings?.admissions_open ?? true;
  const featuredCourse = courses[0];
  const totalEnrolled = batches.reduce((sum, b) => sum + b.enrolled_count, 0);

  return (
    <>
      {/* Hero — centered on mobile */}
      <section className="hero-glow relative overflow-hidden border-b border-border/60">
        <div className="mx-auto max-w-6xl px-3 pb-8 pt-8 text-center sm:px-6 sm:pb-14 sm:pt-14 sm:text-left lg:pt-20">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-start">
              <Badge variant={admissionsOpen ? "success" : "danger"}>
                Admissions {admissionsOpen ? "Open" : "Closed"}
              </Badge>
              <Badge>AI + Web Dev</Badge>
            </div>

            <div className="mt-4 flex flex-col items-center sm:mt-6 sm:flex-row sm:items-start sm:gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white sm:h-11 sm:w-11">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="mt-3 sm:mt-0">
                <h1 className="text-xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-5xl">
                  {settings?.academy_name ?? "Ai & Web Academy"}
                </h1>
                <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted sm:mx-0 sm:mt-3 sm:text-base lg:text-lg">
                  {settings?.tagline ??
                    "Master modern web development using AI-powered tools. Build real websites, apps, and your portfolio."}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:justify-start sm:gap-3">
              <LinkButton href={admissionsOpen ? "/signup" : "/contact"}>
                {admissionsOpen ? "Apply Now" : "Contact"}
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </LinkButton>
              <LinkButton href="/courses" variant="secondary">
                Courses
              </LinkButton>
              <LinkButton href="/batches" variant="secondary">
                Batches
              </LinkButton>
            </div>

            <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-2 sm:mx-0 sm:mt-10 sm:max-w-none sm:gap-4">
              {[
                { icon: GraduationCap, label: "Courses", value: courses.length },
                { icon: Layout, label: "Batches", value: batches.length },
                { icon: Users, label: "Enrolled", value: totalEnrolled },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border/80 bg-surface/60 px-2 py-2 backdrop-blur sm:rounded-xl sm:px-4 sm:py-3"
                >
                  <s.icon className="mx-auto h-3.5 w-3.5 text-accent sm:mx-0 sm:h-5 sm:w-5" />
                  <p className="mt-1 text-base font-bold sm:mt-2 sm:text-2xl">{s.value}</p>
                  <p className="text-[10px] text-muted sm:text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <section className="border-b border-border bg-surface/40 px-3 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl text-center sm:text-left">
            <p className="text-[10px] font-medium uppercase tracking-wider text-accent sm:text-xs">
              Why learn with us
            </p>
            <h2 className="mt-1 text-base font-bold sm:text-xl">Built for modern developers</h2>
            <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-4">
              {[
                {
                  icon: Bot,
                  title: "AI-Assisted",
                  text: "ChatGPT, Copilot & AI tools for faster coding.",
                },
                {
                  icon: Code2,
                  title: "Full-Stack Web",
                  text: "HTML, CSS, JS, React, Next.js & deploy.",
                },
                {
                  icon: Zap,
                  title: "Job-Ready",
                  text: "Portfolio projects & batch support.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <Card className="!p-2.5 text-center sm:!p-4 sm:text-left">
                    <item.icon className="mx-auto h-5 w-5 text-accent sm:mx-0 sm:h-7 sm:w-7" />
                    <h3 className="mt-2 text-xs font-semibold sm:mt-3 sm:text-sm">{item.title}</h3>
                    <p className="mt-1 text-[10px] leading-snug text-muted sm:text-xs">{item.text}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {featuredCourse && (
        <ScrollReveal>
          <section className="px-3 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-center text-base font-bold sm:text-left sm:text-xl">
                Featured Course
              </h2>
              <Card className="mt-3 sm:mt-5">
                <h3 className="text-sm font-semibold gradient-text sm:text-lg">
                  {featuredCourse.title}
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
                  {featuredCourse.description}
                </p>
                {featuredCourse.duration_weeks && (
                  <p className="mt-2 text-[10px] sm:text-xs">
                    <span className="text-muted">Duration:</span>{" "}
                    <strong>{featuredCourse.duration_weeks} weeks</strong>
                  </p>
                )}
                {featuredCourse.highlights?.length > 0 && (
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 sm:gap-2">
                    {featuredCourse.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-1.5 text-[10px] sm:text-xs">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href="/courses"
                  className="mt-3 inline-block text-[10px] text-accent hover:underline sm:mt-4 sm:text-xs"
                >
                  All courses →
                </Link>
              </Card>
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <section className="bg-surface/40 px-3 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div className="text-center sm:text-left">
                <h2 className="text-base font-bold sm:text-xl">Active Batches</h2>
                <p className="mt-0.5 text-[10px] text-muted sm:text-xs">Seats & start dates</p>
              </div>
              <Link
                href="/batches"
                className="text-[10px] text-accent hover:underline sm:text-xs"
              >
                View all
              </Link>
            </div>
            <div className="mt-3 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
              {batches.length === 0 ? (
                <p className="col-span-full text-center text-xs text-muted sm:text-left">
                  No active batches yet.
                </p>
              ) : (
                batches.slice(0, 3).map((b, i) => {
                  const pct = Math.min(
                    100,
                    Math.round((b.enrolled_count / b.max_seats) * 100)
                  );
                  return (
                    <ScrollReveal key={b.id} delay={i * 100}>
                      <Card className="!p-2.5 sm:!p-4">
                        <h3 className="text-xs font-semibold sm:text-sm">{b.name}</h3>
                        <div className="mt-2 space-y-1.5 text-[10px] text-muted sm:mt-3 sm:text-xs">
                          <p className="flex items-center justify-center gap-1.5 sm:justify-start">
                            <Calendar className="h-3 w-3 shrink-0 text-accent" />
                            {formatDate(b.start_date)}
                          </p>
                          <p className="flex items-center justify-center gap-1.5 sm:justify-start">
                            <Users className="h-3 w-3 shrink-0 text-accent" />
                            {b.enrolled_count}/{b.max_seats} enrolled
                          </p>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-border sm:mt-3">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-1000"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </Card>
                    </ScrollReveal>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="px-3 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl rounded-xl border border-border bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-4 text-center sm:rounded-2xl sm:p-8 lg:p-10">
            <h2 className="text-sm font-bold sm:text-xl lg:text-2xl">
              Start your web dev journey
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-[10px] text-muted sm:mt-2 sm:text-sm">
              Sign up, apply for admission, and track your batch from your profile.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 sm:mt-5">
              <LinkButton href="/signup">
                Create Account
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </LinkButton>
              <LinkButton href="/login" variant="secondary">
                Login
              </LinkButton>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
