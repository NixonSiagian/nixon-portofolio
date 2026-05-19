import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MouseGlow from "@/components/MouseGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://nixon-portofolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nixon Siagian — DevOps Engineer & Software Developer",
    template: "%s — Nixon Siagian",
  },
  description:
    "Portfolio of Nixon Siagian — DevOps Engineer and Software Developer. Building reliable infrastructure, automation, and clean backend systems.",
  keywords: [
    "Nixon Siagian",
    "DevOps Engineer",
    "Software Developer",
    "Portfolio",
    "Docker",
    "Linux",
    "Node.js",
    "TypeScript",
    "GitHub Actions",
  ],
  authors: [{ name: "Nixon Siagian", url: "https://github.com/NixonSiagian" }],
  creator: "Nixon Siagian",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Nixon Siagian — DevOps Engineer & Software Developer",
    description:
      "Building reliable infrastructure, automation, and clean backend systems.",
    siteName: "Nixon Siagian",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nixon Siagian — DevOps Engineer & Software Developer",
    description:
      "Building reliable infrastructure, automation, and clean backend systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06070A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="relative min-h-screen bg-background text-white antialiased">
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}
