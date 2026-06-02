import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-10">
      <ForgotPasswordForm />
    </div>
  );
}
