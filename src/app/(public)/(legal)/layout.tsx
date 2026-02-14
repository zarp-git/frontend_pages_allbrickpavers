import SiteLayout from "@/presentation/components/templates/SiteTemplate";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
