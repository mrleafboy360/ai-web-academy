import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="px-3 py-6 sm:px-6 sm:py-10">
      <Suspense
        fallback={
          <div className="mx-auto h-48 max-w-md animate-pulse rounded-xl bg-surface sm:h-64 sm:rounded-2xl" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
