"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Layers,
  BookOpen,
  UserPlus,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, short: "Home" },
  { href: "/admin/users", label: "Users", icon: Users, short: "Users" },
  { href: "/admin/admissions", label: "Admissions", icon: UserPlus, short: "Admit" },
  { href: "/admin/batches", label: "Batches", icon: Layers, short: "Batch" },
  { href: "/admin/courses", label: "Courses", icon: BookOpen, short: "Course" },
  { href: "/admin/settings", label: "Site Settings", icon: Settings, short: "Settings" },
];

export function AdminSidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    onClose?.();
    router.push("/");
    router.refresh();
  }

  function handleNavClick() {
    onClose?.();
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-48 shrink-0 flex-col border-r border-border bg-surface lg:flex xl:w-52">
        <SidebarContent pathname={pathname} onNavClick={handleNavClick} onLogout={logout} />
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(16rem,85vw)] flex-col border-r border-border bg-surface shadow-xl transition-transform duration-200 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold">Admin</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border"
            aria-label="Close menu"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <SidebarContent pathname={pathname} onNavClick={handleNavClick} onLogout={logout} compact />
      </aside>
    </>
  );
}

function SidebarContent({
  pathname,
  onNavClick,
  onLogout,
  compact = false,
}: {
  pathname: string;
  onNavClick: () => void;
  onLogout: () => void;
  compact?: boolean;
}) {
  if (!compact) {
    return (
      <>
        <div className="flex items-center gap-2 border-b border-border px-3 py-3">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-semibold xl:text-sm">Admin Panel</span>
        </div>
        <NavList pathname={pathname} onNavClick={onNavClick} compact={false} />
        <SidebarFooter onNavClick={onNavClick} onLogout={onLogout} compact={false} />
      </>
    );
  }

  return (
    <>
      <NavList pathname={pathname} onNavClick={onNavClick} compact />
      <SidebarFooter onNavClick={onNavClick} onLogout={onLogout} compact />
    </>
  );
}

function NavList({
  pathname,
  onNavClick,
  compact,
}: {
  pathname: string;
  onNavClick: () => void;
  compact: boolean;
}) {
  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavClick}
          className={cn(
            "flex items-center gap-2 rounded-md transition",
            compact ? "px-2 py-1.5 text-xs" : "px-2.5 py-2 text-xs xl:text-sm",
            pathname === item.href
              ? "bg-accent/15 text-accent"
              : "text-muted hover:bg-background hover:text-foreground"
          )}
        >
          <item.icon className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
          <span className="truncate">{compact ? item.short : item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function SidebarFooter({
  onNavClick,
  onLogout,
  compact,
}: {
  onNavClick: () => void;
  onLogout: () => void;
  compact: boolean;
}) {
  return (
    <div className="space-y-1 border-t border-border p-2">
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] text-muted sm:text-xs">Theme</span>
        <ThemeToggle />
      </div>
      <Link
        href="/"
        onClick={onNavClick}
        className={cn(
          "block rounded-md text-muted hover:text-foreground",
          compact ? "px-2 py-1.5 text-xs" : "px-2.5 py-2 text-xs"
        )}
      >
        ← Site
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md text-red-500 hover:bg-red-500/10",
          compact ? "px-2 py-1.5 text-xs" : "px-2.5 py-2 text-xs"
        )}
      >
        <LogOut className="h-3.5 w-3.5" />
        Logout
      </button>
    </div>
  );
}
