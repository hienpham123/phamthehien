import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import ServiceWorker from "@/components/ServiceWorker";
import TerminalBackgroundWrapper from "@/components/ui/TerminalBackgroundWrapper";

export const metadata: Metadata = {
  title: "Pham The Hien - Developer Portfolio",
  description: "Portfolio of Pham The Hien - Full Stack Developer specializing in web development, mobile apps and modern technologies.",
  keywords: ["Pham The Hien", "Developer", "Portfolio", "Web Development", "Full Stack", "React", "Next.js"],
  authors: [{ name: "Pham The Hien" }],
  creator: "Pham The Hien",
  openGraph: {
    title: "Pham The Hien - Developer Portfolio",
    description: "Portfolio of Pham The Hien - Full Stack Developer specializing in web development, mobile apps and modern technologies.",
    type: "website",
    locale: "en_US",
    siteName: "Pham The Hien Portfolio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://phamthehien.netlify.app",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://phamthehien.netlify.app"}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Pham The Hien - Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pham The Hien - Developer Portfolio",
    description: "Portfolio of Pham The Hien - Full Stack Developer specializing in web development, mobile apps and modern technologies.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "https://phamthehien.netlify.app"}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="font-display antialiased relative">
        <TerminalBackgroundWrapper />
        <div className="relative z-[10]">
          {children}
        </div>
        <ServiceWorker />
      </body>
    </html>
  );
}
