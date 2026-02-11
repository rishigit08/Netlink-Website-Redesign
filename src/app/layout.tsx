import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netlink — Engineering AI-first Enterprises",
  description:
    "Breaking silos. Connecting systems. Driving tangible outcomes. Netlink partners with enterprises to architect AI-first connected operations across cloud, data, ERP, automation, and governance.",
  keywords: [
    "AI enterprise",
    "digital transformation",
    "connected enterprise",
    "data intelligence",
    "ERP modernization",
    "cloud infrastructure",
    "enterprise automation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
