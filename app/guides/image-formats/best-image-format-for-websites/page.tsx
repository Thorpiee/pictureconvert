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
  title: "Best Image Format for Websites (2025): WebP vs AVIF vs JPG",
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
      schemaTitle="Best Image Format for Websites (2025): WebP vs AVIF vs JPG"
      schemaDescription="What is the best image format for websites? We compare WebP, AVIF, PNG, and JPG for speed, SEO, and quality. Boost your Core Web Vitals today."
    >
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">

        {/* Quick Answer Section */}
        <section className="mb-16 not-prose">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6" />
              Quick Answer: What Should You Use?
            </h2>
            <p className="text-lg leading-relaxed text-foreground">
              For <strong>95% of website images</strong> (photos, banners, product shots), use <strong>WebP</strong>. It offers the best balance of compression and compatibility. Use <strong>SVG</strong> for logos and icons. Only use <strong>PNG</strong> for screenshots or images requiring transparency that must be pixel-perfect.
            </p>
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Image Format Matters</h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            Images often account for over 50% of a web page's total file size. If you serve unoptimized images,
            your website loads slowly. Slow websites frustrate users and get penalized by Google.
          </p>
          <div className="bg-muted/30 border border-border rounded-xl p-6 not-prose">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Monitor className="h-5 w-5 text-blue-600" />
              Core Web Vitals Impact
            </h3>
            <p className="text-muted-foreground">
              Google's metrics, specifically <strong>Largest Contentful Paint (LCP)</strong>, measure how fast your main content loads.
              Using modern formats like WebP is a direct recommendation from PageSpeed Insights to improve your SEO score.
            </p>
          </div>
        </section>

        {/* Data/Benchmarks Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Image Formats Compared: The Big 5</h2>
          <div className="not-prose overflow-hidden rounded-xl border border-border shadow-sm">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[150px] py-4 text-base font-bold">Format</TableHead>
                  <TableHead className="py-4 text-base font-bold">Best For</TableHead>
                  <TableHead className="py-4 text-base font-bold">Compression</TableHead>
                  <TableHead className="py-4 text-base font-bold text-center">Transparency</TableHead>
                  <TableHead className="py-4 text-base font-bold">Browser Support</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-green-50/50 dark:bg-green-950/10 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors">
                  <TableCell className="font-bold text-lg">WebP</TableCell>
                  <TableCell>Everything (Photos & Graphics)</TableCell>
                  <TableCell className="text-green-600 font-bold">Excellent</TableCell>
                  <TableCell className="text-center"><div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-4 w-4" /></div></TableCell>
                  <TableCell>97% (All Modern)</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-lg">AVIF</TableCell>
                  <TableCell>Next-Gen Optimization</TableCell>
                  <TableCell className="text-green-600 font-bold">Superior</TableCell>
                  <TableCell className="text-center"><div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-4 w-4" /></div></TableCell>
                  <TableCell>93% (Growing)</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-lg text-muted-foreground">JPG/JPEG</TableCell>
                  <TableCell className="text-muted-foreground">Standard Photos</TableCell>
                  <TableCell className="text-yellow-600 font-medium">Good (Lossy)</TableCell>
                  <TableCell className="text-center"><div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500"><X className="h-4 w-4" /></div></TableCell>
                  <TableCell className="text-muted-foreground">100% (Universal)</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-lg text-muted-foreground">PNG</TableCell>
                  <TableCell className="text-muted-foreground">High-Detail Graphics</TableCell>
                  <TableCell className="text-red-500 font-medium">Poor (Lossless)</TableCell>
                  <TableCell className="text-center"><div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-4 w-4" /></div></TableCell>
                  <TableCell className="text-muted-foreground">100% (Universal)</TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-bold text-lg">SVG</TableCell>
                  <TableCell>Logos & Icons</TableCell>
                  <TableCell className="text-green-600 font-bold">Vector (Tiny)</TableCell>
                  <TableCell className="text-center"><div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600"><Check className="h-4 w-4" /></div></TableCell>
                  <TableCell>100% (Universal)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Factors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Factors That Affect Your Choice</h2>
          <div className="not-prose grid md:grid-cols-2 gap-8">
            {/* Card 1: Photos */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Photographs</h3>
                </div>
                <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400">
                  Winner: WebP
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Photographs contain millions of colors. JPG was the standard, but <Link href="/jpg-to-webp" className="text-primary hover:underline font-medium">WebP</Link> offers the same quality at 30% smaller sizes.
              </p>
            </div>

            {/* Card 2: Logos */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Icons & Logos</h3>
                </div>
                <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400">
                  Winner: SVG
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Never use JPG or PNG for logos. SVGs are scalable vectors that look sharp on any screen size with tiny file sizes.
              </p>
            </div>

            {/* Card 3: Screenshots */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">UI & Screenshots</h3>
                </div>
                <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400">
                  Winner: PNG / WebP
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Images with flat colors and text look blurry in JPG. PNG preserves sharp edges. Always run them through a <Link href="/compress-png" className="text-primary hover:underline font-medium">PNG Compressor</Link>.
              </p>
            </div>

            {/* Card 4: Documents */}
            <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Documents</h3>
                </div>
                <span className="rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1 text-xs font-bold text-green-700 dark:text-green-400">
                  Winner: PDF
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                For text-heavy documents meant for reading or printing, PDF is the standard. It ensures fonts and layout stay consistent.
              </p>
            </div>
          </div>
        </section>

        {/* Actionable Improvements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">How to Improve Your Site (Action Plan)</h2>
          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div className="bg-muted/30 border border-border rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">1. Audit Your Images</h3>
              <p className="text-muted-foreground mb-4">
                Open your website and check your largest images. If you see PNGs used for photos, or JPGs larger than 500KB, you have an easy win waiting.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" /> Check "Network" tab in DevTools
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" /> Look for files &gt; 200KB
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4">2. Convert to WebP</h3>
              <p className="text-muted-foreground mb-6">
                Use our free tools to convert your existing heavy images to optimized WebP.
              </p>
              <div className="grid gap-3">
                <Link href="/jpg-to-webp" className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <span className="font-medium">Convert JPG to WebP</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/png-to-webp" className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                  <span className="font-medium">Convert PNG to WebP</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="mb-12 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <Link href="/guides/image-formats/png-vs-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">PNG vs JPG Guide</h3>
              <p className="text-sm text-muted-foreground">Understand the difference between the two most common formats.</p>
            </Link>
            <Link href="/guides/image-formats/webp-vs-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">WebP vs PNG Guide</h3>
              <p className="text-sm text-muted-foreground">Deep dive into why WebP is the superior choice for web.</p>
            </Link>
            <Link href="/website-optimizer" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Website Image Optimizer</h3>
              <p className="text-sm text-muted-foreground">Analyze your site and find unoptimized images.</p>
            </Link>
            <Link href="/compress-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">PNG Compressor</h3>
              <p className="text-sm text-muted-foreground">Reduce PNG file size without losing quality.</p>
            </Link>
          </div>
        </section>

      </div>
    </GuidePageLayout>
  )
}
