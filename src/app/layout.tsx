import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pham The Hien - Developer Portfolio",
  description: "Portfolio of Pham The Hien - Full Stack Developer specializing in web development, mobile apps and modern technologies.",
  keywords: ["Pham The Hien", "Developer", "Portfolio", "Web Development", "Full Stack", "React", "Next.js"],
  authors: [{ name: "Pham The Hien" }],
  creator: "Pham The Hien",
  openGraph: {
    title: "Pham The Hien - Developer Portfolio",
    description: "Portfolio of Pham The Hien - Full Stack Developer",
    type: "website",
    locale: "en_US",
    siteName: "Pham The Hien Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pham The Hien - Developer Portfolio",
    description: "Portfolio of Pham The Hien - Full Stack Developer",
  },
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
      </head>
      <body className="font-display antialiased">
        {children}
      </body>
    </html>
  );
}
