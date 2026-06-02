import { redirect } from "next/navigation";
import { Calendar, User, MapPin, Phone, Mail, IdCard } from "lucide-react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { createClient } from "@/lib/supabase/server";
import { formatDate, admissionStatusLabel } from "@/lib/utils";
import type { Admission, Profile } from "@/lib/types";

export const metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/profile");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  const { data: admission } = await supabase
    .from("admissions")
    .select("*, batches(name, start_date)")
    .eq("user_id", user.id)
    .maybeSingle<Admission & { batches: { name: string; start_date: string | null } | null }>();

  const statusVariant =
    admission?.status === "approved"
      ? "success"
      : admission?.status === "rejected"
        ? "danger"
        : "warning";

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-lg font-bold sm:text-2xl">My Profile</h1>
          <p className="mt-0.5 text-[11px] text-muted sm:text-sm">
            Your account and admission information
          </p>
        </div>
        <LogoutButton />
      </div>

      <Card className="mt-4 sm:mt-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent sm:h-12 sm:w-12">
            <User className="h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h2 className="text-base font-semibold sm:text-xl">{profile?.full_name}</h2>
            <p className="text-[10px] text-muted sm:text-sm">Student account</p>
          </div>
        </div>

        <dl className="mt-4 grid gap-3 text-xs sm:mt-6 sm:grid-cols-2 sm:gap-4 sm:text-sm">
          <div className="flex gap-2">
            <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <div>
              <dt className="text-muted">Email</dt>
              <dd>{profile?.email}</dd>
            </div>
          </div>
          <div className="flex gap-2">
            <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <div>
              <dt className="text-muted">Phone</dt>
              <dd>{profile?.phone}</dd>
            </div>
          </div>
          {profile?.cnic && (
            <div className="flex gap-2">
              <IdCard className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <dt className="text-muted">CNIC</dt>
                <dd>{profile.cnic}</dd>
              </div>
            </div>
          )}
          <div className="flex gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <div>
              <dt className="text-muted">Address</dt>
              <dd>
                {profile?.address}, {profile?.city}
              </dd>
            </div>
          </div>
        </dl>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <h3 className="text-sm font-semibold sm:text-lg">Admission Status</h3>
        {!admission ? (
          <p className="mt-3 text-sm text-muted">
            You are not admitted yet. Our team will assign your batch after review. Contact
            the academy if you have questions.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            <Badge variant={statusVariant}>
              {admissionStatusLabel[admission.status] ?? admission.status}
            </Badge>
            {admission.status === "approved" && (
              <>
                <p className="text-sm">
                  <strong>Admitted on:</strong> {formatDate(admission.admitted_at)}
                </p>
                {admission.batches?.name && (
                  <p className="text-sm">
                    <strong>Batch:</strong> {admission.batches.name}
                  </p>
                )}
                <p className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>
                    <strong>Class starts:</strong>{" "}
                    {formatDate(admission.class_start_date ?? admission.batches?.start_date)}
                  </span>
                </p>
              </>
            )}
            {admission.status === "pending" && (
              <p className="text-sm text-muted">
                Your application is under review. You will see your class start date here once
                approved.
              </p>
            )}
            {admission.notes && (
              <p className="rounded-md border border-border bg-background p-2 text-[11px] sm:rounded-lg sm:p-3 sm:text-sm">
                <strong>Note:</strong> {admission.notes}
              </p>
            )}
          </div>
        )}
      </Card>
      </div>
    </PageShell>
  );
}
