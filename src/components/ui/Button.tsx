import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-xs font-medium transition disabled:opacity-50 sm:rounded-lg sm:px-4 sm:py-2 sm:text-sm",
        variant === "primary" && "bg-accent text-white hover:opacity-90",
        variant === "secondary" &&
          "border border-border bg-surface hover:border-accent",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
