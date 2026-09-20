import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura Luxury Apparel | Headless Luxury Fashion Storefront",
  description: "Enterprise-grade headless fashion storefront with sub-second page loads (0.8s TTFB), optimistic cart drawer, size/color selectors, and 1-tap Apple Pay express checkout.",
  authors: [{ name: "Niall.M" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
