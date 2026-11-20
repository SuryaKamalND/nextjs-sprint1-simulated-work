import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// (app) group layout: logged-in product chrome. The group name never appears in URLs.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
