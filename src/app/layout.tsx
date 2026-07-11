import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { siteUrl, contactEmail } from "@content/site-url";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Staff Software Engineer at eBay. Builder of Arabic & Islamic tools. UI/UX designer and street photographer in Berlin.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ahmed Elshahawy",
    template: "%s | Ahmed Elshahawy",
  },
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ahmed Elshahawy",
    description,
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
    description,
    images: ["/og.jpg"],
    creator: "@shahawi_",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmed Elshahawy",
  url: siteUrl,
  image: `${siteUrl}/avatar.jpg`,
  jobTitle: "Staff Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "eBay",
  },
  email: contactEmail,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  sameAs: [
    "https://www.linkedin.com/in/shahawi",
    "https://github.com/kazaky",
    "https://x.com/shahawi_",
    "https://medium.com/@shahawi",
    "https://www.xing.com/profile/Ahmed_Elshahawy066996",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
