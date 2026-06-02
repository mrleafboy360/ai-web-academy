"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import { formatAuthError } from "@/lib/supabase/env";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.updateUser({ password });
      if (authError) {
        setError(authError.message);
        return;
      }
      router.push("/login?reset=1");
      router.refresh();
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <Card className="mx-auto w-full max-w-md">
        <h1 className="text-base font-bold sm:text-xl">Reset Password</h1>
        <p className="mt-3 text-xs text-muted sm:text-sm">
          Invalid or expired link. Please request a new reset link.
        </p>
        <Link href="/forgot-password" className="mt-4 inline-block text-xs text-accent hover:underline sm:text-sm">
          Request new link →
        </Link>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <h1 className="text-base font-bold sm:text-xl">Set New Password</h1>
      <p className="mt-0.5 text-[11px] text-muted sm:mt-1 sm:text-sm">
        Choose a strong password for your account.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6">
        <Input
          label="New Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <Input
          label="Confirm Password"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />
        {error && <p className="text-xs text-red-500 sm:text-sm">{error}</p>}
        <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
          {loading ? "Updating…" : "Update Password"}
        </Button>
      </form>
    </Card>
  );
}
