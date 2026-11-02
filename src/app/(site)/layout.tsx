import { InstallBanner } from "@/components/layout/InstallBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <InstallBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
