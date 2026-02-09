import type { Metadata } from "next";
import { Rubik, Hanken_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Header from "@/presentation/components/organisms/header/Header";
import Footer from "@/presentation/components/organisms/footer/Footer";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Allbrick Pavers - Central Florida Pavers Installation",
  description: "Allbrick Pavers - Premium Pavers for Your Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${hankenGrotesk.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
