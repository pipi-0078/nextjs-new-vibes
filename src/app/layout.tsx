import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New Vibes - 最新のテクノロジーとライフスタイル",
  description: "最新のテクノロジーとライフスタイルについて発信するブログサイトです。",
  keywords: "ブログ, テクノロジー, ライフスタイル, プログラミング",
  authors: [{ name: "New Vibes" }],
  openGraph: {
    title: "New Vibes - 最新のテクノロジーとライフスタイル",
    description: "最新のテクノロジーとライフスタイルについて発信するブログサイトです。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Vibes - 最新のテクノロジーとライフスタイル",
    description: "最新のテクノロジーとライフスタイルについて発信するブログサイトです。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
