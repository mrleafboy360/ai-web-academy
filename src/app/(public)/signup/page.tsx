import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = { title: "Sign Up" };

export default function SignupPage() {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-10">
      <SignupForm />
    </div>
  );
}
