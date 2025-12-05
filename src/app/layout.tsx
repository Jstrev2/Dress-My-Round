import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from '@/components/Navigation';
import StructuredData from '@/components/StructuredData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dressmyround.com'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Dress My Round | Golf Weather & Clothing Recommendations",
    template: "%s | Dress My Round"
  },
  description: "Get personalized golf attire recommendations based on real-time weather forecasts. Perfect clothing choices for your entire 4.5-hour golf round, whether walking or riding.",
  keywords: "golf weather, golf clothing, golf attire, weather forecast, golf outfit, golf fashion, golf gear, weather recommendations",
  authors: [{ name: "Dress My Round" }],
  creator: "Dress My Round",
  publisher: "Dress My Round",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Dress My Round | Golf Weather & Clothing Recommendations',
    description: 'Get personalized golf attire recommendations based on real-time weather forecasts. Perfect clothing choices for your entire golf round.',
    siteName: 'Dress My Round',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dress My Round | Golf Weather & Clothing Recommendations',
    description: 'Get personalized golf attire recommendations based on real-time weather forecasts.',
    creator: '@dressmyround',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#059669" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* TODO: Replace with actual Google Search Console verification code */}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'your-google-verification-code'} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}