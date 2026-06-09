import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const montserratHeading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ad.monde – Beyond Advertising",
    template: "%s | ad.monde",
  },
  description:
    "Admonde delivers carpentry & fabrication, interior fit-out, MEP contracting, and print production across the GCC since 1996.",
  keywords: [
    "interior fit-out",
    "carpentry fabrication",
    "MEP contracting",
    "print production",
    "exhibition booths",
    "fit-out contractor",
    "Admonde",
    "Saudi Arabia",
    "GCC",
  ],
  openGraph: {
    title: "Admonde – Carpentry, Fit-Out, MEP & Print",
    description:
      "Carpentry & fabrication, interior fit-out, MEP contracting, and precision printing for leading enterprises across the GCC since 1996.",
    type: "website",
    locale: "en_AE",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={montserratHeading.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        {!isAdmin && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <WhatsAppButton />}
      </body>
    </html>
  );
}
