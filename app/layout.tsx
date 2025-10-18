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
  title: "AI Text Summarizer - Smart Text Summarization Tool",
  description: "Free AI-powered text summarizer that creates concise summaries in multiple formats. Get short paragraphs, detailed summaries, or bulleted key points instantly. Created by Zhaka Hidayat Yasir (ZhakaZx).",
  keywords: ["AI text summarizer", "text summarization", "AI summary", "automatic summarization", "text analysis", "content summarization", "AI tools", "free summarizer"],
  authors: [{ name: "Zhaka Hidayat Yasir", url: "https://github.com/ZhakaZx" }],
  creator: "Zhaka Hidayat Yasir (ZhakaZx)",
  publisher: "Zhaka Hidayat Yasir (ZhakaZx)",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://text-summarizer.zhakazx.com",
    title: "AI Text Summarizer - Smart Text Summarization Tool",
    description: "Free AI-powered text summarizer that creates concise summaries in multiple formats. Get short paragraphs, detailed summaries, or bulleted key points instantly.",
    siteName: "AI Text Summarizer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Text Summarizer - Smart Text Summarization Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Text Summarizer - Smart Text Summarization Tool",
    description: "Free AI-powered text summarizer that creates concise summaries in multiple formats. Created by Zhaka Hidayat Yasir (ZhakaZx).",
    creator: "@ZhakaZx",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://text-summarizer.zhakazx.com",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Summarizer",
    "description": "Free AI-powered text summarizer that creates concise summaries in multiple formats. Get short paragraphs, detailed summaries, or bulleted key points instantly.",
    "url": "https://ai-text-summarizer.vercel.app",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Zhaka Hidayat Yasir",
      "alternateName": "ZhakaZx",
      "url": "https://github.com/ZhakaZx"
    },
    "creator": {
      "@type": "Person",
      "name": "Zhaka Hidayat Yasir",
      "alternateName": "ZhakaZx",
      "url": "https://github.com/ZhakaZx"
    },
    "featureList": [
      "AI-powered text summarization",
      "Multiple summary formats (Short Paragraph, Detailed Paragraph, Bulleted Key Points)",
      "Multi-language support",
      "Free to use",
      "No registration required"
    ],
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
