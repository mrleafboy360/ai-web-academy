export function AdminPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className="text-base font-bold sm:text-xl lg:text-2xl">{title}</h1>
      {description && (
        <p className="mt-0.5 text-[11px] leading-snug text-muted sm:mt-1 sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
