import type { Metadata, Viewport } from "next";
import "./globals.css";
import SearchOverlay from "@/components/search/SearchOverlay";

export const metadata: Metadata = {
  title: "AI Inference, Agentic AI & Accelerator Engineering",
  description:
    "From silicon transistors to production agentic systems — the most interactive AI engineering course ever built.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <SearchOverlay />
      </body>
    </html>
  );
}
