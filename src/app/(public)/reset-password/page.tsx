import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-10">
      <ResetPasswordForm />
    </div>
  );
}
