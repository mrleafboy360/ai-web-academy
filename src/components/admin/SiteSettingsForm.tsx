"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/lib/types";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .update({
        academy_name: form.academy_name,
        tagline: form.tagline,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone,
        whatsapp: form.whatsapp,
        address: form.address,
        city: form.city,
        map_embed_url: form.map_embed_url,
        admissions_open: form.admissions_open,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    setLoading(false);
    setMessage(error ? error.message : "Settings saved successfully.");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-3 sm:space-y-4">
      <Input
        label="Academy Name"
        value={form.academy_name}
        onChange={(e) => update("academy_name", e.target.value)}
        required
      />
      <Input
        label="Tagline"
        value={form.tagline ?? ""}
        onChange={(e) => update("tagline", e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Contact Email"
          type="email"
          value={form.contact_email ?? ""}
          onChange={(e) => update("contact_email", e.target.value)}
        />
        <Input
          label="Contact Phone"
          value={form.contact_phone ?? ""}
          onChange={(e) => update("contact_phone", e.target.value)}
        />
      </div>
      <Input
        label="WhatsApp Number"
        value={form.whatsapp ?? ""}
        onChange={(e) => update("whatsapp", e.target.value)}
        placeholder="923001234567"
      />
      <Textarea
        label="Address"
        value={form.address ?? ""}
        onChange={(e) => update("address", e.target.value)}
      />
      <Input
        label="City"
        value={form.city ?? ""}
        onChange={(e) => update("city", e.target.value)}
      />
      <div className="space-y-1">
        <Input
          label="Google Maps Embed URL (optional)"
          value={form.map_embed_url ?? ""}
          onChange={(e) => update("map_embed_url", e.target.value)}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
        <p className="text-[10px] text-muted sm:text-xs">
          Google Maps → Share → Embed a map → copy the <strong>src</strong> URL only, or paste
          full iframe HTML. If empty, map uses Address + City above.
        </p>
      </div>
      <label className="flex items-center gap-2 text-xs sm:text-sm">
        <input
          type="checkbox"
          checked={form.admissions_open}
          onChange={(e) => update("admissions_open", e.target.checked)}
          className="rounded border-border"
        />
        Admissions Open
      </label>
      {message && (
        <p className={`text-xs sm:text-sm ${message.includes("success") ? "text-emerald-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
      <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
        {loading ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
