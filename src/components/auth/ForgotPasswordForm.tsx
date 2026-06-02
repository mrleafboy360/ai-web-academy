"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import { formatAuthError } from "@/lib/supabase/env";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=/reset-password`;
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="text-base font-bold sm:text-xl">Forgot Password</h1>
      <p className="mt-0.5 text-[11px] text-muted sm:mt-1 sm:text-sm">
        Enter your email. We will send a link to reset your password.
      </p>

      {success ? (
        <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 sm:text-sm">
          Check your email for the reset link. If you do not see it, check spam folder.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {error && <p className="text-xs text-red-500 sm:text-sm">{error}</p>}
          <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
            {loading ? "Sending…" : "Send Reset Link"}
          </Button>
        </form>
      )}

      <p className="mt-3 text-center text-[11px] text-muted sm:mt-4 sm:text-sm">
        <Link href="/login" className="text-accent hover:underline">
          ← Back to login
        </Link>
      </p>
    </Card>
  );
}
