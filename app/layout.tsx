import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'PictureConvert - Free Online Image Converter & Compressor',
    template: '%s | PictureConvert'
  },
  description: 'Convert, compress, and edit images right in your browser. Free, fast, and private - files never leave your device.',
  keywords: ['image converter', 'image compressor', 'jpg to png', 'png to jpg', 'webp converter', 'heic to jpg', 'resize image', 'crop image', 'remove exif'],
  authors: [{ name: 'PictureConvert' }],
  creator: 'PictureConvert',
  metadataBase: new URL('https://pictureconvert.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pictureconvert.com',
    siteName: 'PictureConvert',
    title: 'PictureConvert - Free Online Image Converter & Compressor',
    description: 'Convert, compress, and edit images right in your browser. Free, fast, and private - files never leave your device.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PictureConvert - Free Online Image Converter & Compressor',
    description: 'Convert, compress, and edit images right in your browser. Free, fast, and private.',
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
