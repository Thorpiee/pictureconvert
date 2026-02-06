import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Lock, Heart, ArrowRight } from "lucide-react"
import { SITE_URL } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "About Us - Free & Private Image Tools",
  description: "Learn about PictureConvert - a free, privacy-focused image converter that processes everything in your browser. Your files never leave your device. Fast, secure, and no signup required.",
  openGraph: {
    title: "About | PictureConvert",
    description: "Learn about PictureConvert - a free, privacy-focused image converter that processes everything in your browser.",
    url: `${SITE_URL}/about`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'About PictureConvert',
      },
    ],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your files never leave your device. All processing happens locally in your browser using modern web technologies."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "No uploads, no downloads from servers. Instant conversions powered by your device's processing power."
  },
  {
    icon: Lock,
    title: "No Sign-up Required",
    description: "Just use the tools. No accounts, no emails, no tracking. We believe in respecting your time and privacy."
  },
  {
    icon: Heart,
    title: "Free Forever",
    description: "All tools are completely free to use. We sustain the site through non-intrusive advertising."
  }
]

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            About PictureConvert
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-center leading-relaxed">
            PictureConvert is a free online tool for converting, compressing, and editing images.
            Our mission is simple: provide powerful image tools that respect your privacy.
          </p>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              We built PictureConvert because we were frustrated with existing image tools.
              Most require you to upload your files to unknown servers, create accounts, or pay for basic features.
              We believed there had to be a better way.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Using modern browser technologies like Canvas API and WebAssembly, we created a suite of image tools
              that work entirely in your browser. Your images never leave your device, ensuring complete privacy
              while delivering fast, reliable results.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you use PictureConvert, your image is processed entirely within your web browser.
              We use the HTML5 Canvas API to read, manipulate, and export images in different formats.
              For specialized formats like HEIC, we use optimized JavaScript libraries that run locally.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This approach means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your files are never uploaded to our servers</li>
              <li>Conversions happen instantly without network delays</li>
              <li>Your data remains completely private</li>
              <li>The tools work offline once the page is loaded</li>
            </ul>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Supported Formats</h2>
            <p className="text-muted-foreground leading-relaxed">
              PictureConvert supports all major image formats including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>JPG/JPEG</strong> - The most common format for photographs</li>
              <li><strong>PNG</strong> - Perfect for graphics and images needing transparency</li>
              <li><strong>WebP</strong> - Modern format with superior compression</li>
              <li><strong>HEIC/HEIF</strong> - Apple's format used on iPhones and iPads</li>
              <li><strong>AVIF</strong> - Next-generation format with excellent compression</li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Try our free image tools today - no sign-up required.
            </p>
            <Button asChild size="lg">
              <Link href="/tools">
                Browse All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
