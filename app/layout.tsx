import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Our Product",
  description: "SaaS product shell built with the Next.js App Router",
};

// Root layout: the only file that renders <html> and <body>.
// Surface-specific chrome now lives in each route group's own layout:
//   (marketing) -> big branded header + footer
//   (auth)      -> centred card, no chrome
//   (app)       -> global Header/Footer + dashboard sidebar
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
