import Link from "next/link"
import { Metadata } from "next"
import { Check, X, AlertTriangle, Mail, Smartphone, Zap, Image as ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { GuidePageLayout } from "@/components/guide-page-layout"

export const metadata: Metadata = {
  title: "Best Image Format for Email (2025): Gmail & Outlook Guide",
  description: "Why are your images not loading in email? Learn the best image formats for email marketing. Compare JPG, PNG, and GIF compatibility across Gmail and Outlook.",
}

const faqs = [
  {
    question: "What is the safest image format for email?",
    answer: "JPG (JPEG) is the safest, most compatible format for email. It works in 100% of email clients (Gmail, Outlook, Yahoo, Apple Mail) and offers the best balance of small file size and good quality."
  },
  {
    question: "Can I use WebP in email newsletters?",
    answer: "It's risky. While Apple Mail and some web clients support WebP, older versions of Outlook and Gmail do not. If you use WebP, you must provide a JPG fallback in your HTML code, otherwise, many subscribers will see a broken image."
  },
  {
    question: "Why is my GIF not moving in Outlook?",
    answer: "Older versions of Microsoft Outlook (2007-2019) do not support animated GIFs. They will only display the first frame of the animation. Ensure your first frame contains the most important visual information."
  },
  {
    question: "What is the best width for email images?",
    answer: "The standard width for email newsletters is 600px to 640px. For Retina displays (high density), you should upload images at 2x size (1200px wide) and scale them down using HTML attributes (width='600')."
  },
  {
    question: "How do I fix 'images not loading' in email?",
    answer: "This often happens if your file size is too large (keep it under 1MB), your image server is slow, or the user has 'block images' turned on. Always include 'ALT text' so users know what the image is even if it doesn't load."
  }
]

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Image Formats", href: "/guides/image-formats" },
  { label: "Best Format for Email" },
]

export default function BestImageFormatForEmailPage() {
  const heroExtra = (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-25 dark:opacity-40"></div>
      <Card className="relative bg-card border-border shadow-xl">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Mail className="h-6 w-6 text-orange-500" />
            Email Cheat Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Photos</span>
              <div className="font-bold text-lg md:text-xl text-orange-600">JPG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Logos</span>
              <div className="font-bold text-lg md:text-xl">PNG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Animation</span>
              <div className="font-bold text-lg md:text-xl">GIF</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Width</span>
              <div className="font-bold text-lg md:text-xl">600px <span className="text-sm font-normal text-muted-foreground">(1200 Retina)</span></div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
            <span className="text-sm font-medium text-red-900 dark:text-red-200">
              Avoid WebP & SVG (Poor Support)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title={
        <>Best Image Format for Email <span className="text-primary block text-2xl md:text-3xl font-bold mt-2 opacity-90">The Complete Guide</span></>
      }
      subtitle={
        <>
          Email is a time machine. While the web uses modern tech, email clients like Outlook are stuck in the past.
          Choosing the wrong <strong>image format for email</strong> can result in broken images and lost sales.
          Here is how to ensure your newsletter looks perfect in every inbox.
        </>
      }
      breadcrumbs={breadcrumbs}
      heroExtra={heroExtra}
      faqItems={faqs}
      variant="split"
      schemaTitle="Best Image Format for Email (2025): Gmail & Outlook Guide"
      schemaDescription="Why are your images not loading in email? Learn the best image formats for email marketing. Compare JPG, PNG, and GIF compatibility across Gmail and Outlook."
    >

      {/* Quick Answer Section */}
      <section className="mb-16 not-prose">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Quick Answer: What Should You Use?
          </h2>
          <p className="text-lg leading-relaxed text-foreground">
            For <strong>photos</strong>, always use <strong>JPG</strong>. For <strong>logos and icons</strong>, use <strong>PNG</strong>. If you need animation, use <strong>GIF</strong>. Avoid WebP and SVG entirely as they are blocked by Gmail and Outlook. Keep all images under 1MB (optimally 200KB) and 600px wide (1200px for Retina).
          </p>
        </div>
      </section>

      {/* Context Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Why Email is Different from the Web</h2>
        <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            On a website, you control the browser environment. In email marketing, you are at the mercy of dozens of different clients:
            Gmail, Outlook (desktop, mobile, web), Apple Mail, Yahoo, and more.
          </p>
          <div className="flex items-start gap-4 bg-background p-4 rounded-xl border border-border">
            <AlertTriangle className="h-6 w-6 text-orange-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold mb-1">The Challenge</h4>
              <p className="text-muted-foreground">
                Microsoft Outlook (especially older desktop versions) uses Microsoft Word's rendering engine to display emails.
                This means it doesn't understand modern web standards like WebP, SVG, or even some CSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data/Benchmarks Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Format Compatibility Data</h2>
        <p className="text-lg text-muted-foreground mb-8">Stick to these three formats to ensure 100% deliverability.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12 not-prose">
          {/* JPG */}
          <Card className="border-t-4 border-t-blue-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                JPG (JPEG)
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">Safe</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold mb-2 text-sm uppercase text-muted-foreground">Best For</div>
              <p className="font-medium mb-4">Photos, Banners, Backgrounds</p>
              <div className="font-bold mb-2 text-sm uppercase text-muted-foreground">Why?</div>
              <p className="text-sm text-muted-foreground mb-4">Smallest file size. 100% compatible.</p>
              <Link href="/compress-jpg" className="text-sm font-bold text-primary hover:underline">Compress JPG &rarr;</Link>
            </CardContent>
          </Card>

          {/* PNG */}
          <Card className="border-t-4 border-t-purple-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                PNG
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">Safe</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold mb-2 text-sm uppercase text-muted-foreground">Best For</div>
              <p className="font-medium mb-4">Logos, Icons, Text</p>
              <div className="font-bold mb-2 text-sm uppercase text-muted-foreground">Why?</div>
              <p className="text-sm text-muted-foreground mb-4">Sharp edges, transparency support.</p>
              <Link href="/compress-png" className="text-sm font-bold text-primary hover:underline">Compress PNG &rarr;</Link>
            </CardContent>
          </Card>

          {/* GIF */}
          <Card className="border-t-4 border-t-orange-500 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                GIF
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">Caution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-bold mb-2 text-sm uppercase text-muted-foreground">Best For</div>
              <p className="font-medium mb-4">Simple Animations</p>
              <div className="font-bold mb-2 text-sm uppercase text-muted-foreground">Why?</div>
              <p className="text-sm text-muted-foreground mb-4">Only way to show motion. Outlook shows frame 1 only.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Factors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Factors That Affect Your Results</h2>

        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6">1. Formats to Avoid</h3>
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <Card className="border-red-100 bg-red-50 dark:bg-red-950/20 dark:border-red-900 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <X className="h-5 w-5" /> WebP
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-900 dark:text-red-200 leading-relaxed">
                  Supported by Apple Mail and some web clients, but fails in Outlook and Gmail on some devices.
                  Only use if you have a developer who can code a fallback.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-100 bg-red-50 dark:bg-red-950/20 dark:border-red-900 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <X className="h-5 w-5" /> SVG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-900 dark:text-red-200 leading-relaxed">
                  Security risks mean most email clients block SVG entirely. Never use SVG in email.
                  Convert your logos to <Link href="/svg-to-png" className="underline font-bold">PNG</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-6">2. Best Practices for Retina Displays</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Most smartphones have "Retina" or high-density screens. A standard 600px wide image will look blurry on an iPhone.
              </p>
              <div className="bg-muted/50 p-6 rounded-xl border border-border not-prose">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Smartphone className="h-5 w-5 text-primary" /> The Trick</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your image at <strong>2x size</strong> (e.g., 1200px wide) but set the width in the HTML to 600px.
                </p>
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{`<img src="photo-1200px.jpg" \n     width="600" \n     alt="Product Name">`}</code>
                </pre>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 not-prose">
              <h3 className="text-xl font-bold mb-4">Accessibility: The Alt Text Rule</h3>
              <p className="text-muted-foreground mb-6">
                Many people have images blocked by default. If you send an email that is just one big image, they will see a blank box.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Always add <code>alt="Description"</code> to every image tag.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Never hide key info (dates, codes) in images.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Actionable Improvements Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">How to Optimize Your Email Images</h2>
        <div className="bg-card border border-border rounded-xl shadow-sm p-8 not-prose">
          <ul className="grid md:grid-cols-2 gap-6">
            <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <strong className="block text-lg">1. Choose the Right Format</strong>
                <span className="text-muted-foreground">Photos = JPG. Logos = PNG.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <strong className="block text-lg">2. Compress Everything</strong>
                <span className="text-muted-foreground">Aim for under 200KB per image to ensure fast loading on 4G/5G.</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <strong className="block text-lg">3. Size for Retina</strong>
                <span className="text-muted-foreground">Upload at 1200px width, but set HTML width="600".</span>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <strong className="block text-lg">4. Add Alt Text</strong>
                <span className="text-muted-foreground">Crucial for accessibility and when images are blocked.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="mb-12 border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <Link href="/compress-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">JPG Compressor</h3>
            <p className="text-sm text-muted-foreground">Compress your JPGs for email without losing quality.</p>
          </Link>
          <Link href="/compress-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG Compressor</h3>
            <p className="text-sm text-muted-foreground">Shrink your PNG logos before sending.</p>
          </Link>
          <Link href="/guides/image-formats/png-vs-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG vs JPG Guide</h3>
            <p className="text-sm text-muted-foreground">Detailed comparison of the two main formats.</p>
          </Link>
          <Link href="/svg-to-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">SVG to PNG Converter</h3>
            <p className="text-sm text-muted-foreground">Convert unsafe SVGs to email-safe PNGs.</p>
          </Link>
        </div>
      </section>

    </GuidePageLayout>
  )
}
