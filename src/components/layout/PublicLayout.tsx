import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { getSiteSettings } from "@/lib/data";

export async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <FloatingWhatsApp phone={settings?.whatsapp} />
    </>
  );
}
