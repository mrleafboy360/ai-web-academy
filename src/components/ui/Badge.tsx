import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs",
        variant === "success" && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        variant === "warning" && "bg-amber-500/15 text-amber-600 dark:text-amber-400",
        variant === "danger" && "bg-red-500/15 text-red-600 dark:text-red-400",
        variant === "default" && "bg-accent/15 text-accent"
      )}
    >
      {children}
    </span>
  );
}
