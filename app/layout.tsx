import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://qoala.in"),
  title: {
    default: "Qoala | Web Development & GenAI Solutions in India",
    template: "%s | Qoala — Web Dev & GenAI Services India",
  },
  description:
    "Qoala builds custom web apps, GenAI chatbots, RAG systems, and AI automation tools for startups and SMEs across India. Full-stack freelance team.",
  keywords: [
    "web development company India",
    "GenAI services India",
    "AI chatbot development",
    "RAG implementation",
    "freelance web developers India",
    "Next.js development",
    "AI automation India",
  ],
  authors: [{ name: "Qoala Intelligent Tech Solutions" }],
  openGraph: {
    type: "website",
    url: "https://qoala.in",
    siteName: "Qoala",
    title: "Qoala | Web Development & GenAI Solutions in India",
    description:
      "Qoala builds custom web apps, GenAI chatbots, and AI automation tools for startups and SMEs across India.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Qoala" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qoala | Web Development & GenAI Solutions in India",
    description: "Custom web apps, GenAI chatbots, and AI automation for startups across India.",
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://qoala.in" },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Qoala Intelligent Tech Solutions",
  url: "https://qoala.in",
  logo: "https://qoala.in/logo-transparent.png",
  areaServed: "IN",
  serviceType: ["Web Development", "GenAI Consulting", "AI Automation", "RAG Implementation"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "qoala.connect@gmail.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
