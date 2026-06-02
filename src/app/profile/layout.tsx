import { PublicLayout } from "@/components/layout/PublicLayout";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
