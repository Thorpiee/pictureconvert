import Link from "next/link"
import { Metadata } from "next"
import { Check, X, ArrowRight, Info, Zap, AlertTriangle, Smartphone } from "lucide-react"
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
  title: "WebP vs PNG: Which Image Format Is Better for Websites?",
  description: "Compare WebP vs PNG for web performance, quality, and compatibility. Learn which format is best for your site and how to convert with PictureConvert tools.",
}

const faqs = [
  {
    question: "Is WebP better than PNG for websites?",
    answer: "For most websites, yes. WebP offers smaller file sizes and fast loading, which improves SEO and user experience. PNG is only better when you need perfect, lossless quality or legacy browser support."
  },
  {
    question: "Does WebP support transparency and animation?",
    answer: "WebP supports full alpha transparency and animation. However, animation support is not universal—some browsers may not display animated WebP correctly. PNG supports transparency but only limited animation (APNG)."
  },
  {
    question: "Will WebP images work in all browsers?",
    answer: "WebP is supported by all major browsers (Chrome, Firefox, Edge, Safari). For older browsers (IE, legacy Safari), provide PNG fallbacks to ensure compatibility."
  },
  {
    question: "Can I convert PNG to WebP without losing quality?",
    answer: "Yes. Use lossless WebP conversion for graphics and logos. For photos, lossy WebP at 80–90% quality offers excellent results with much smaller file sizes."
  },
  {
    question: "Is WebP good for print or logos?",
    answer: "No. PNG is preferred for print and logos due to perfect, lossless quality and universal support. WebP is designed for web use and may not be suitable for professional printing."
  },
  {
    question: "How do I convert WebP to PNG?",
    answer: "Use the WebP to PNG converter on PictureConvert. Upload your WebP image, click convert, and download the PNG file instantly."
  }
]

export default function WebpVsPngPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Image Formats", href: "/guides/image-formats" },
    { label: "WebP vs PNG" },
  ]

  const heroExtra = (
    <div className="relative opacity-90">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-600 rounded-2xl blur opacity-20 dark:opacity-30"></div>
      <Card className="relative bg-card border-border/50 shadow-lg rounded-xl">
        <CardHeader className="pb-4 border-b bg-muted/20">
          <CardTitle className="text-lg font-semibold mb-4">Format Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">File Size:</span>
              <span className="font-medium text-green-600">WebP is 30% smaller</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Transparency:</span>
              <span className="font-medium">Both Supported</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Support:</span>
              <span className="font-medium">WebP 96% / PNG 100%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Best For:</span>
              <span className="font-medium">Web vs Print</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title="WebP vs PNG: Which Image Format Is Better?"
      subtitle="Choosing the right image format is critical for website speed, quality, and compatibility. This guide compares WebP and PNG so you can make the best decision for your project."
      breadcrumbs={breadcrumbs}
      faqItems={faqs}
      heroExtra={heroExtra}
      variant="split"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* 2. Quick Answer / TL;DR */}
        <section className="not-prose mb-16">
          <div className="bg-muted/30 border border-border rounded-xl p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Zap className="h-6 w-6 text-primary" />
              Quick Answer (TL;DR)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0" />
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Use WebP for Websites</strong>
                    <p className="text-muted-foreground">WebP images are 25-35% smaller than PNGs, making your site load much faster.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0" />
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Use PNG for Logos & Print</strong>
                    <p className="text-muted-foreground">PNG is lossless and universally supported, making it safer for branding and printing.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Info className="h-6 w-6 text-blue-600 shrink-0" />
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Both Support Transparency</strong>
                    <p className="text-muted-foreground">Unlike JPG, both formats support transparent backgrounds (alpha channel).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Format Choice Matters</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            In the world of web performance, <strong>every kilobyte counts</strong>. Large images are the primary reason for slow websites.
          </p>
          <p className="text-lg leading-relaxed">
            Google's Core Web Vitals metrics penalize slow sites. Using modern formats like WebP is one of the easiest ways to improve your Largest Contentful Paint (LCP) score.
            However, compatibility still matters—if your users are on very old devices, they might not see WebP images at all.
          </p>
        </section>

        {/* 4. Data / Benchmarks Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">WebP vs PNG: The Data</h2>
          <div className="not-prose overflow-hidden rounded-xl border border-border shadow-sm">
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="py-4 font-bold text-lg">Feature</TableHead>
                  <TableHead className="py-4 font-bold text-lg">WebP</TableHead>
                  <TableHead className="py-4 font-bold text-lg">PNG</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">Compression</TableCell>
                  <TableCell>Lossy & Lossless</TableCell>
                  <TableCell>Lossless Only</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">File Size</TableCell>
                  <TableCell className="text-green-600 font-medium">Small (30% smaller than PNG)</TableCell>
                  <TableCell className="text-red-600 font-medium">Large</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">Browser Support</TableCell>
                  <TableCell>96%+ (Modern Browsers)</TableCell>
                  <TableCell>100% (Universal)</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">Best For</TableCell>
                  <TableCell>Web Photos & Graphics</TableCell>
                  <TableCell>Print, Editing, Archiving</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* 5. Factors That Affect Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Factors That Affect Your Choice</h2>
          <div className="grid md:grid-cols-2 gap-8 not-prose">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                Browser Support
              </h3>
              <p className="text-muted-foreground mb-4">
                <strong>WebP</strong> works in Chrome, Firefox, Edge, and Safari (iOS 14+).
                If you have significant traffic from very old devices (like iPhone 6 or IE11), you might need a PNG fallback.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-600" />
                Editing vs Publishing
              </h3>
              <p className="text-muted-foreground mb-4">
                <strong>PNG</strong> is better for <em>editing</em> because it loses no quality when saved repeatedly.
                <strong>WebP</strong> is better for <em>publishing</em> because it is optimized for delivery speed.
              </p>
            </div>
          </div>
        </section>

        {/* 6. How to Improve (Actionable) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How to Convert</h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Make the switch today</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Modernize your website images by converting PNG to WebP, or ensure compatibility by converting WebP back to PNG.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/png-to-webp"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
              >
                Convert PNG to WebP
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/webp-to-png"
                className="inline-flex items-center gap-2 bg-background border border-input hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto justify-center"
              >
                Convert WebP to PNG
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Internal Link Section */}
        <section className="mb-12 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <Link href="/guides/image-formats/png-vs-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">PNG vs JPG Guide</h3>
              <p className="text-sm text-muted-foreground">See how the two most popular formats compare.</p>
            </Link>
            <Link href="/guides/image-formats/best-image-format-for-websites" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Best Format for Websites</h3>
              <p className="text-sm text-muted-foreground">The ultimate guide to web image optimization.</p>
            </Link>
            <Link href="/compress-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Compress PNG Tool</h3>
              <p className="text-sm text-muted-foreground">Reduce PNG file size without losing quality.</p>
            </Link>
            <Link href="/website-optimizer" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Website Image Optimizer</h3>
              <p className="text-sm text-muted-foreground">Analyze your site's images and find savings.</p>
            </Link>
          </div>
        </section>

      </div>
    </GuidePageLayout>
  )
}
