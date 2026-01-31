import Link from "next/link"
import { Metadata } from "next"
import { Check, X, ArrowRight, Info, Zap, Smartphone, Image as ImageIcon, FileText, Monitor, AlertTriangle } from "lucide-react"
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
  title: "Best Image Format for Websites (2025 Guide) | WebP vs AVIF vs JPG",
  description: "What is the best image format for websites? We compare WebP, AVIF, PNG, and JPG for speed, SEO, and quality. Boost your Core Web Vitals today.",
}

const faqs = [
  {
    question: "What is the single best image format for websites in 2025?",
    answer: "For most websites, WebP is the best all-around format. It offers excellent compression (30% smaller than JPG), supports transparency, and works in all modern browsers. AVIF is technically superior but has slightly less support. SVG is best for logos and icons."
  },
  {
    question: "Is WebP better than PNG for websites?",
    answer: "Yes, for almost all use cases. WebP images are typically 26% smaller than PNGs while maintaining transparency. You should only use PNG if you need to support very old browsers (Internet Explorer) or require 100% lossless quality for complex graphics."
  },
  {
    question: "Should I use JPG or PNG for website photos?",
    answer: "Use JPG (or better yet, WebP) for photos. PNGs are lossless and produce massive file sizes for photographs, which will slow down your site. Only use PNG for images with sharp edges, text, or transparent backgrounds."
  },
  {
    question: "Does image format affect SEO rankings?",
    answer: "Yes, significantly. Google uses Core Web Vitals to measure page experience. Large images slow down Largest Contentful Paint (LCP), hurting your rank. Using next-gen formats like WebP or AVIF is a direct recommendation from Google PageSpeed Insights."
  },
  {
    question: "When should I use SVG on my website?",
    answer: "Use SVG for logos, icons, and simple illustrations. SVGs are vector-based, meaning they are infinitely scalable and look crisp on any screen size (from mobile to retina displays) with very small file sizes."
  }
]

export default function BestImageFormatForWebsitesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Image Formats", href: "/guides/image-formats" },
    { label: "Best Format for Websites" },
  ]

  const heroExtra = (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25 dark:opacity-40"></div>
      <Card className="relative bg-card border-border shadow-xl">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Zap className="h-6 w-6 text-green-600" />
            Web Speed Cheat Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Photos</span>
              <div className="font-bold text-lg md:text-xl text-green-600">WebP</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Logos</span>
              <div className="font-bold text-lg md:text-xl">SVG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Screenshots</span>
              <div className="font-bold text-lg md:text-xl">WebP / PNG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Docs</span>
              <div className="font-bold text-lg md:text-xl">PDF</div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
              Avoid heavy PNGs for photos
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title="Best Image Format for Websites: The Ultimate Guide (2025)"
      subtitle={
        <>
          Choosing the right image format is one of the easiest ways to speed up your website.
          We compare WebP, AVIF, JPG, and PNG to find the perfect balance of quality and speed.
        </>
      }
      breadcrumbs={breadcrumbs}
      heroExtra={heroExtra}
      variant="split"
      faqs={faqs}
    >
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">

        <h2 className="text-3xl font-bold mb-8">Why Image Format Matters for Website Performance</h2>
        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
          Images often account for over 50% of a web page's total file size. If you serve unoptimized images,
          your website loads slowly. Slow websites frustrate users and get penalized by Google.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground mb-12">
          Google's <strong>Core Web Vitals</strong> metrics, specifically <em>Largest Contentful Paint (LCP)</em>,
          measure how fast your main content loads. Using modern image formats is one of Google's top recommendations
          for improving LCP.
        </p>

        <h2 className="text-3xl font-bold mb-8">Image Formats Compared: The Big 5</h2>
        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
          Not all formats are created equal. Here is how the major players stack up for web use.
        </p>

        {/* Comparison Table */}
        <div className="not-prose mb-20 overflow-hidden rounded-xl border border-border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[150px] py-6 text-base font-bold">Format</TableHead>
                <TableHead className="py-6 text-base font-bold">Best For</TableHead>
                <TableHead className="py-6 text-base font-bold">Compression</TableHead>
                <TableHead className="py-6 text-base font-bold text-center">Transparency</TableHead>
                <TableHead className="py-6 text-base font-bold">Browser Support</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="h-20 bg-green-50/50 dark:bg-green-950/10 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors">
                <TableCell className="font-bold text-lg">WebP</TableCell>
                <TableCell>Everything (Photos & Graphics)</TableCell>
                <TableCell className="text-green-600 font-bold">Excellent</TableCell>
                <TableCell className="text-center"><div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-5 w-5" /></div></TableCell>
                <TableCell>97% (All Modern)</TableCell>
              </TableRow>
              <TableRow className="h-20 hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg">AVIF</TableCell>
                <TableCell>Next-Gen Optimization</TableCell>
                <TableCell className="text-green-600 font-bold">Superior</TableCell>
                <TableCell className="text-center"><div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-5 w-5" /></div></TableCell>
                <TableCell>93% (Growing)</TableCell>
              </TableRow>
              <TableRow className="h-20 hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg text-muted-foreground">JPG/JPEG</TableCell>
                <TableCell className="text-muted-foreground">Standard Photos</TableCell>
                <TableCell className="text-yellow-600 font-medium">Good (Lossy)</TableCell>
                <TableCell className="text-center"><div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500"><X className="h-5 w-5" /></div></TableCell>
                <TableCell className="text-muted-foreground">100% (Universal)</TableCell>
              </TableRow>
              <TableRow className="h-20 hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg text-muted-foreground">PNG</TableCell>
                <TableCell className="text-muted-foreground">High-Detail Graphics</TableCell>
                <TableCell className="text-red-500 font-medium">Poor (Lossless)</TableCell>
                <TableCell className="text-center"><div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-5 w-5" /></div></TableCell>
                <TableCell className="text-muted-foreground">100% (Universal)</TableCell>
              </TableRow>
              <TableRow className="h-20 hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg">SVG</TableCell>
                <TableCell>Logos & Icons</TableCell>
                <TableCell className="text-green-600 font-bold">Vector (Tiny)</TableCell>
                <TableCell className="text-center"><div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-5 w-5" /></div></TableCell>
                <TableCell>100% (Universal)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <h2 className="text-3xl font-bold mb-12">Best Format by Use Case</h2>

        {/* Use Case Cards Grid */}
        <div className="not-prose grid md:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Photos */}
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Photographs</h3>
              <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-bold text-green-700 dark:text-green-400">
                Winner: WebP
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Photographs contain millions of colors and complex gradients. JPG was the standard for decades,
              but <Link href="/jpg-to-webp" className="text-primary hover:underline font-medium">WebP</Link> offers the same quality at 25-35% smaller file sizes.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <Info className="h-4 w-4" />
              <span>WordPress users: Use a plugin to serve WebP automatically.</span>
            </div>
          </div>

          {/* Card 2: Logos */}
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600">
              <Zap className="h-6 w-6" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Icons & Logos</h3>
              <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-bold text-green-700 dark:text-green-400">
                Winner: SVG
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Never use JPG or PNG for logos. SVGs are scalable vectors, meaning they look
              sharp on any screen size with tiny file sizes.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <Info className="h-4 w-4" />
              <span>Need a favicon? Use our <Link href="/png-to-ico" className="text-primary hover:underline">PNG to ICO converter</Link>.</span>
            </div>
          </div>

          {/* Card 3: Screenshots */}
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600">
              <Monitor className="h-6 w-6" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">UI & Screenshots</h3>
              <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-bold text-green-700 dark:text-green-400">
                Winner: PNG / WebP
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Images with flat colors and text look blurry in JPG. PNG preserves sharp edges.
              Always run them through a <Link href="/compress-png" className="text-primary hover:underline font-medium">PNG Compressor</Link>.
            </p>
          </div>

          {/* Card 4: Documents */}
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Documents</h3>
              <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-sm font-bold text-green-700 dark:text-green-400">
                Winner: PDF
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For text-heavy documents meant for reading or printing, PDF is the standard. It ensures fonts and layout stay consistent across all devices.
            </p>
          </div>
        </div>

        {/* Next Gen Section - Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 mt-0">WebP vs AVIF: The Battle of Next-Gen Formats</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              You might hear about AVIF, the newest kid on the block. Should you use it?
            </p>
            <div className="space-y-4 not-prose">
              <div className="p-4 rounded-lg border border-border bg-background">
                <h4 className="font-bold text-foreground mb-1">WebP</h4>
                <p className="text-muted-foreground text-sm">The safe, modern standard. Supported by Safari, Chrome, Firefox, and Edge. Massive upgrade over JPG/PNG.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <h4 className="font-bold text-foreground mb-1">AVIF</h4>
                <p className="text-muted-foreground text-sm">The bleeding edge. Better compression (20% smaller than WebP) but slower to encode and less support.</p>
              </div>
            </div>
          </div>
          <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
            <h3 className="text-xl font-bold mb-4 mt-0">Our Recommendation</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Use <strong>WebP</strong> for now for maximum compatibility and ease of use.
            </p>
            <p className="text-base text-muted-foreground">
              If you have an advanced setup, serve AVIF with a WebP fallback. For 99% of website owners, converting everything to WebP is the single most effective optimization you can make.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Common Mistakes to Avoid</h2>
        <div className="grid md:grid-cols-3 gap-6 not-prose mb-20">
          <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/20">
            <span className="text-red-600 font-bold text-sm uppercase tracking-wide mb-2 block">Mistake #1</span>
            <h4 className="font-bold text-lg mb-2">Using PNG for Photos</h4>
            <p className="text-muted-foreground text-sm">This is the #1 speed killer. A photo saved as PNG might be 3MB. The same photo as WebP is 200KB.</p>
          </div>
          <div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/20">
            <span className="text-orange-600 font-bold text-sm uppercase tracking-wide mb-2 block">Mistake #2</span>
            <h4 className="font-bold text-lg mb-2">Ignoring Compression</h4>
            <p className="text-muted-foreground text-sm">Even the right format needs compression. Always process images through a <Link href="/smart-optimizer" className="underline decoration-orange-300">Smart Optimizer</Link>.</p>
          </div>
          <div className="p-6 rounded-xl bg-yellow-50 dark:bg-yellow-950/10 border border-yellow-100 dark:border-yellow-900/20">
            <span className="text-yellow-600 font-bold text-sm uppercase tracking-wide mb-2 block">Mistake #3</span>
            <h4 className="font-bold text-lg mb-2">Wrong Dimensions</h4>
            <p className="text-muted-foreground text-sm">Don't upload a 4000px wide image if it will only display at 800px. Resize it first.</p>
          </div>
        </div>

      </div>
    </GuidePageLayout>
  )
}
