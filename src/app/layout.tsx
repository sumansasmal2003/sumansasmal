import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// Replace this with your actual production domain once you deploy
const SITE_URL = "https://sumansasmal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Suman Sasmal | Frontend Architect & Team Lead",
    template: "%s | Suman Sasmal", // Automatically appends your name to sub-pages like "Projects | Suman Sasmal"
  },
  description: "Professional portfolio of Suman Sasmal, a Team Lead and Frontend Architect specializing in React, Next.js, GSAP, and immersive web experiences.",
  keywords: ["Suman Sasmal", "Frontend Architect", "Team Lead", "React Developer", "Next.js", "GSAP", "Creative Developer", "Portfolio"],
  authors: [{ name: "Suman Sasmal" }],
  creator: "Suman Sasmal",

  // Open Graph (Used by LinkedIn, Discord, Facebook, Slack)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Suman Sasmal | Frontend Architect & Team Lead",
    description: "Explore the digital archive and interactive web experiences engineered by Suman Sasmal.",
    siteName: "Suman Sasmal Portfolio",
    images: [
      {
        url: "/suman.jpeg", // This references a file we will put in your public folder
        width: 1200,
        height: 630,
        alt: "Suman Sasmal - Frontend Architect Portfolio Preview",
      },
    ],
  },

  // Twitter Card (Used by X/Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Suman Sasmal | Frontend Architect & Team Lead",
    description: "Explore the digital archive and interactive web experiences engineered by Suman Sasmal.",
    images: ["/suman.jpeg"],
  },

  // Search Engine Crawling Rules
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex flex-col min-h-screen bg-charcoal-900 text-foreground font-sans selection:bg-accent selection:text-charcoal-900 relative">
        <SmoothScroll>
          <div className="relative z-10 flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1 w-full flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
