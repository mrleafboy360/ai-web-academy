import Link from "next/link";
import { cn } from "@/lib/utils";

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition sm:gap-2 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm",
        variant === "primary" && "bg-accent text-white hover:opacity-90",
        variant === "secondary" &&
          "border border-border bg-surface hover:border-accent",
        variant === "ghost" && "text-accent hover:underline px-2 py-1",
        className
      )}
    >
      {children}
    </Link>
  );
}
