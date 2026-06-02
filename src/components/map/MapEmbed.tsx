import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { resolveMapEmbedSrc, getMapDirectionsUrl } from "@/lib/map";

export function MapEmbed({
  mapEmbedUrl,
  address,
  city,
  title = "Location map",
  className = "h-52 w-full sm:h-64 lg:h-72",
}: {
  mapEmbedUrl?: string | null;
  address?: string | null;
  city?: string | null;
  title?: string;
  className?: string;
}) {
  const src = resolveMapEmbedSrc(mapEmbedUrl, address, city);
  const directionsUrl = getMapDirectionsUrl(address, city);

  if (!src) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background/50 p-6 text-center ${className}`}
      >
        <MapPin className="h-8 w-8 text-muted" />
        <p className="mt-2 text-xs text-muted sm:text-sm">
          Map not configured. Add address in admin settings or paste a Google Maps embed URL.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <iframe
        title={title}
        src={src}
        className={className}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
      />
      {directionsUrl && (
        <div className="border-t border-border px-3 py-2 text-center">
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-accent hover:underline sm:text-xs"
          >
            Open in Google Maps
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
