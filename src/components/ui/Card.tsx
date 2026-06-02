import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-3 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
