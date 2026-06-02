/**
 * Normalizes Google Maps embed input (URL or full iframe HTML) and falls back to address search.
 */
export function resolveMapEmbedSrc(
  mapEmbedUrl: string | null | undefined,
  address?: string | null,
  city?: string | null
): string | null {
  const raw = (mapEmbedUrl ?? "").trim();

  if (raw) {
    const iframeMatch = raw.match(/<iframe[^>]+src=["']([^"']+)["']/i);
    if (iframeMatch?.[1]) return iframeMatch[1];

    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      if (raw.includes("/maps/embed") || raw.includes("output=embed")) {
        return raw;
      }
      if (raw.includes("google.") && raw.includes("/maps")) {
        const qMatch = raw.match(/[?&]q=([^&]+)/);
        if (qMatch) {
          return `https://www.google.com/maps?q=${qMatch[1]}&output=embed`;
        }
      }
      return raw;
    }
  }

  const query = [address, city].filter(Boolean).join(", ");
  if (!query) return null;

  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=15&output=embed`;
}

export function getMapDirectionsUrl(
  address?: string | null,
  city?: string | null
): string | null {
  const query = [address, city].filter(Boolean).join(", ");
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
