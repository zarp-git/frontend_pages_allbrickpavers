import { Metadata } from "next";
import MaintenancePage from "@/presentation/pages/maintance/MaintenancePage";

export const metadata: Metadata = {
  title: "Site Under Maintenance | AllBricks Pavers",
  description:
    "Our website is currently undergoing scheduled maintenance. We'll be back soon!",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Maintenance() {
  return <MaintenancePage />;
}
