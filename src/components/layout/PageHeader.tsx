import { Badge } from "@/components/ui/Badge";

export function PageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: { label: string; variant: "success" | "danger" | "default" | "warning" };
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <h1 className="text-lg font-bold sm:text-2xl lg:text-3xl">{title}</h1>
        {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
      </div>
      {description && (
        <p className="mt-1 text-[11px] leading-snug text-muted sm:mt-2 sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
