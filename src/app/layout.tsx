import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://ahmed-portfolio-mmi.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ahmed Elshahawy",
    template: "%s | Ahmed Elshahawy",
  },
  description:
    "Staff Software Engineer at eBay. Builder of Arabic & Islamic tools. UI/UX designer and street photographer in Berlin.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ahmed Elshahawy",
    description:
      "Staff Software Engineer at eBay. Builder of Arabic & Islamic tools. Designer and street photographer in Berlin.",
    type: "website",
    url: siteUrl,
    siteName: "Ahmed Elshahawy",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Elshahawy — Staff Software Engineer, Designer, Photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Elshahawy",
    description:
      "Staff Software Engineer at eBay. Builder of Arabic & Islamic tools. Designer and street photographer in Berlin.",
    images: ["/og.jpg"],
    creator: "@shahawi_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
