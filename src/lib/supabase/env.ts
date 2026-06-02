export function getSupabaseEnv(): {
  url: string;
  anonKey: string;
  configured: boolean;
  issue?: string;
} {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

  if (!url || !anonKey) {
    return {
      url: "",
      anonKey: "",
      configured: false,
      issue:
        "Supabase keys missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart: npm run dev",
    };
  }

  if (
    url.includes("placeholder") ||
    url === "https://your-project.supabase.co"
  ) {
    return {
      url,
      anonKey,
      configured: false,
      issue: "Replace placeholder Supabase URL in .env.local with your real project URL.",
    };
  }

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith(".supabase.co")) {
      return {
        url,
        anonKey,
        configured: false,
        issue: "NEXT_PUBLIC_SUPABASE_URL should look like https://xxxxx.supabase.co",
      };
    }
  } catch {
    return {
      url,
      anonKey,
      configured: false,
      issue: "NEXT_PUBLIC_SUPABASE_URL is not a valid URL.",
    };
  }

  return { url, anonKey, configured: true };
}

export function formatAuthError(error: unknown): string {
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return (
      "Cannot reach Supabase (network error). Check: (1) internet connection, " +
      "(2) Supabase project is not paused in dashboard, (3) ad-blocker off for supabase.co, " +
      "(4) .env.local has correct keys, (5) restart dev server after editing .env.local."
    );
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}
