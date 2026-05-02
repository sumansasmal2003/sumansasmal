import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
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
  title: "Suman Sasmal | Portfolio",
  description: "Professional portfolio of Suman Sasmal, Team Lead and Frontend Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-charcoal-900 text-foreground selection:bg-accent selection:text-charcoal-900">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-5xl p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
