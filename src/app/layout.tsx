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
  title: "KOKORO TERASU 破",
  description: "浄土真宗の真髄「歎異抄」の超訳や、マインドフルネスについて解説。古来の智慧と現代の心理学を融合させた心の豊かさを追求するサイトです。",
  keywords: "仏教, 歎異抄, マインドフルネス, 浄土真宗, 心, 智慧, 瞑想, 精神性",
  authors: [{ name: "KOKORO TERASU" }],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "KOKORO TERASU 破",
    description: "浄土真宗の真髄「歎異抄」の超訳や、マインドフルネスについて解説。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: '/icon.png', width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOKORO TERASU 破",
    description: "浄土真宗の真髄「歎異抄」の超訳や、マインドフルネスについて解説。",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-800 text-gray-100`}
        style={{ backgroundColor: '#1f2937', color: '#f9fafb' }}
      >
        <Header />
        <main className="flex-grow bg-gray-800">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
