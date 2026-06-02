"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface sm:h-9 sm:w-9 sm:rounded-lg" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-foreground transition hover:border-accent hover:text-accent sm:h-9 sm:w-9 sm:rounded-lg"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
    </button>
  );
}
