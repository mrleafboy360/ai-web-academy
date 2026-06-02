"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import { formatAuthError, getSupabaseEnv } from "@/lib/supabase/env";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const envIssue = getSupabaseEnv().issue;

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: form.fullName,
            phone: form.phone,
            cnic: form.cnic || null,
            address: form.address,
            city: form.city,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }
    } catch (err) {
      setError(formatAuthError(err));
      return;
    } finally {
      setLoading(false);
    }

    router.push("/login?registered=1");
    router.refresh();
  }

  return (
    <Card className="mx-auto w-full max-w-lg">
      <h1 className="text-base font-bold sm:text-xl">Student Sign Up</h1>
      <p className="mt-0.5 text-[11px] text-muted sm:mt-1 sm:text-sm">
        Register to apply for admission and view your profile.
      </p>
      {envIssue && (
        <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
          {envIssue}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
        <Input
          label="Full Name *"
          required
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
        <Input
          label="Email Address *"
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <Input
          label="Phone Number *"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          label="CNIC (optional)"
          value={form.cnic}
          onChange={(e) => update("cnic", e.target.value)}
          placeholder="xxxxx-xxxxxxx-x"
        />
        <Input
          label="Resident Address *"
          required
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
        />
        <Input
          label="City *"
          required
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <Input
          label="Password *"
          type="password"
          required
          value={form.password}
          onChange={(e) => update("password", e.target.value)}
        />
        <Input
          label="Confirm Password *"
          type="password"
          required
          value={form.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Creating account…" : "Sign Up"}
        </Button>
      </form>
      <p className="mt-3 text-center text-[11px] text-muted sm:mt-4 sm:text-sm">
        Already registered?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Login
        </Link>
      </p>
    </Card>
  );
}
