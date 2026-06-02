"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/batches", label: "Batches" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()
          .then(({ data: p }) => setIsAdmin(p?.role === "admin"));
      }
    });
  }, [pathname]);

  const btnSm =
    "rounded-md px-2 py-1 text-[11px] font-medium sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-xs lg:px-3 lg:py-2 lg:text-sm";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-2.5">
        <Link href="/" className="flex min-w-0 items-center gap-1.5 font-semibold sm:gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-500 text-white sm:h-8 sm:w-8 sm:rounded-lg">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="truncate text-[11px] sm:text-sm">
            Ai & <span className="text-accent">Web</span>
            <span className="hidden min-[400px]:inline"> Academy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-2 py-1.5 text-xs transition lg:rounded-lg lg:px-3 lg:py-2 lg:text-sm",
                pathname === l.href
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <ThemeToggle />
          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className={cn(
                    "hidden border border-border hover:border-accent sm:inline-block",
                    btnSm
                  )}
                >
                  Admin
                </Link>
              )}
              <Link
                href="/profile"
                className={cn("bg-accent text-white hover:opacity-90", btnSm)}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn("hidden text-muted hover:text-foreground sm:inline-block", btnSm)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={cn("bg-accent text-white hover:opacity-90", btnSm)}
              >
                Sign Up
              </Link>
            </>
          )}
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border md:hidden sm:h-8 sm:w-8"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-3 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-2 py-1.5 text-xs",
                pathname === l.href ? "bg-accent/10 text-accent" : ""
              )}
            >
              {l.label}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-1.5 text-xs text-muted"
            >
              Login
            </Link>
          )}
          {user && isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-1.5 text-xs"
            >
              Admin Panel
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
