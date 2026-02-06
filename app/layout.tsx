import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SITE_URL } from "@/lib/site-url"
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'PictureConvert - Free Online Image Converter & Compressor',
    template: '%s | PictureConvert'
  },
  description: 'Convert, compress, and edit images right in your browser. Free, fast, and private - files never leave your device. Supports JPG, PNG, WebP, HEIC, AVIF, and more.',
  keywords: ['image converter', 'image compressor', 'jpg to png', 'png to jpg', 'webp converter', 'heic to jpg', 'resize image', 'crop image', 'remove exif'],
  authors: [{ name: 'PictureConvert' }],
  creator: 'PictureConvert',
  metadataBase: new URL('https://pictureconvert.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'PictureConvert',
    title: 'PictureConvert - Free Online Image Converter & Compressor',
    description: 'Convert, compress, and edit images right in your browser. Free, fast, and private - files never leave your device. Supports JPG, PNG, WebP, HEIC, AVIF, and more.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'PictureConvert - Free Online Image Converter & Compressor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PictureConvert - Free Online Image Converter & Compressor',
    description: 'Convert, compress, and edit images right in your browser. Free, fast, and private.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <JsonLd />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  )
}
