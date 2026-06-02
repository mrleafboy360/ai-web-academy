import { cn } from "@/lib/utils";

export function Textarea({
  label,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <label className="block space-y-1 text-xs sm:space-y-1.5 sm:text-sm">
      {label && <span className="font-medium">{label}</span>}
      <textarea
        className={cn(
          "w-full min-h-[72px] rounded-md border border-border bg-background px-2.5 py-1.5 text-xs outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 sm:min-h-[100px] sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm",
          className
        )}
        {...props}
      />
    </label>
  );
}
