import Link from "next/link"
import { Metadata } from "next"
import { Check, X, ArrowRight, Info, Zap, AlertTriangle } from "lucide-react"
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
  title: "PNG vs JPG: What's the Difference and Which Should You Use?",
  description: "Compare PNG vs JPG formats. Learn the key differences in file size, quality, transparency, and when to use each for web, photos, and graphics.",
}

const faqs = [
  {
    question: "What's the main difference between PNG and JPG?",
    answer: "PNG is a lossless format that preserves all image data and supports transparency, while JPG uses lossy compression that reduces file size but can lose quality. PNG files are typically larger but maintain perfect quality, making them ideal for graphics with sharp edges or transparency."
  },
  {
    question: "Which format is better for photos?",
    answer: "JPG is better for photographs and complex images where file size matters more than perfect quality. PNG creates much larger files for photos due to its lossless compression, which can slow down websites and waste storage space."
  },
  {
    question: "Can JPG files have transparent backgrounds?",
    answer: "No, JPG does not support transparency. If you need transparent backgrounds, you must use PNG. Attempting to use JPG for transparent images will result in a solid background color, usually white or black, replacing the transparent areas."
  },
  {
    question: "Why are PNG files so large?",
    answer: "PNG uses lossless compression, meaning it preserves every pixel of data without discarding any information. This results in larger files compared to JPG's lossy compression, which removes some data to reduce size. PNGs are ideal for images where quality is paramount."
  },
  {
    question: "Should I use PNG or JPG for web images?",
    answer: "For most web images, JPG is preferable due to smaller file sizes that load faster. Use PNG only for images requiring transparency, sharp text, or logos. Consider modern formats like WebP for even better compression while maintaining quality."
  },
  {
    question: "How do I convert between PNG and JPG?",
    answer: "Use our online converters: upload your image, select the desired format, and download the converted file. For PNG to JPG conversion, the tool automatically handles transparency by adding a white background. JPG to PNG preserves quality but increases file size."
  }
]

export default function PngVsJpgPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Image Formats", href: "/guides/image-formats" },
    { label: "PNG vs JPG" },
  ]

  const heroExtra = (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-25 dark:opacity-40"></div>
      <Card className="relative bg-card border-border shadow-xl">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Zap className="h-6 w-6 text-blue-600" />
            Format Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Photos</span>
              <div className="font-bold text-lg md:text-xl text-blue-600">JPG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Graphics</span>
              <div className="font-bold text-lg md:text-xl">PNG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Web</span>
              <div className="font-bold text-lg md:text-xl">WebP</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Logos</span>
              <div className="font-bold text-lg md:text-xl">PNG/SVG</div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
              JPG doesn't support transparency
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title="PNG vs JPG: What's the Difference and Which Should You Use?"
      subtitle="Compare PNG vs JPG formats. Learn the key differences in file size, quality, transparency, and when to use each for web, photos, and graphics."
      breadcrumbs={breadcrumbs}
      heroExtra={heroExtra}
      faqItems={faqs}
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
                    <strong className="block text-foreground text-lg mb-1">Use JPG for Photos</strong>
                    <p className="text-muted-foreground">Best for photographs, portraits, and complex scenes. Small file size, good quality.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Check className="h-6 w-6 text-green-600 shrink-0" />
                  <div>
                    <strong className="block text-foreground text-lg mb-1">Use PNG for Graphics</strong>
                    <p className="text-muted-foreground">Best for logos, screenshots, and text. Supports transparency and sharp edges.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Info className="h-6 w-6 text-blue-600 shrink-0" />
                  <div>
                    <strong className="block text-foreground text-lg mb-1">WebP is Often Better</strong>
                    <p className="text-muted-foreground">For websites, WebP offers better compression than both PNG and JPG.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Context Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Image Format Matters</h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Selecting the wrong image format is one of the most common mistakes in web design and digital photography.
            It affects everything from <strong>website loading speed</strong> to <strong>visual quality</strong>.
          </p>
          <p className="text-lg leading-relaxed">
            A photograph saved as a PNG can be <strong>5 to 10 times larger</strong> than the same image saved as a JPG, with no visible difference in quality.
            On the other hand, saving a logo with a transparent background as a JPG will replace the transparency with a solid white box, ruining the design.
            Understanding the "PNG vs JPG" debate ensures you get the best performance and quality for every image.
          </p>
        </section>

        {/* 4. Data / Benchmarks Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">PNG vs JPG: The Data</h2>
          <div className="not-prose overflow-hidden rounded-xl border border-border shadow-sm">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[150px] py-4 font-bold text-lg">Feature</TableHead>
                  <TableHead className="py-4 font-bold text-lg">PNG</TableHead>
                  <TableHead className="py-4 font-bold text-lg">JPG</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">Compression</TableCell>
                  <TableCell>Lossless (No quality loss)</TableCell>
                  <TableCell>Lossy (Quality reduced for size)</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">File Size</TableCell>
                  <TableCell className="text-red-600 font-medium">Large (2-5MB for photos)</TableCell>
                  <TableCell className="text-green-600 font-medium">Small (200-500KB for photos)</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">Transparency</TableCell>
                  <TableCell className="text-green-600 font-medium">✅ Yes (Alpha Channel)</TableCell>
                  <TableCell className="text-red-600 font-medium">❌ No (Solid Background)</TableCell>
                </TableRow>
                <TableRow className="even:bg-muted/10 hover:bg-muted/20">
                  <TableCell className="font-semibold">Best Use Case</TableCell>
                  <TableCell>Logos, Text, Screenshots</TableCell>
                  <TableCell>Photographs, Complex Images</TableCell>
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
                <ImageIcon className="h-5 w-5 text-blue-600" />
                Image Content
              </h3>
              <p className="text-muted-foreground mb-4">
                <strong>High Complexity (Photos):</strong> Use JPG. The human eye cannot perceive the data discarded by JPG compression in complex photos.
              </p>
              <p className="text-muted-foreground">
                <strong>Low Complexity (Graphics):</strong> Use PNG. Solid colors and sharp lines look blurry in JPG due to compression artifacts.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Transparency Needs
              </h3>
              <p className="text-muted-foreground mb-4">
                If you need to place the image over a different background (like a logo on a colored header), <strong>you must use PNG</strong>.
              </p>
              <p className="text-muted-foreground">
                JPG will always fill the transparent area with a solid color (usually white), which looks unprofessional on non-white backgrounds.
              </p>
            </div>
          </div>
        </section>

        {/* 6. How to Improve (Actionable) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How to Optimize & Convert</h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need to switch formats?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              You can easily convert between PNG and JPG using our free browser-based tools. No software installation required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/png-to-jpg"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
              >
                Convert PNG to JPG
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jpg-to-png"
                className="inline-flex items-center gap-2 bg-background border border-input hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto justify-center"
              >
                Convert JPG to PNG
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Internal Link Section */}
        <section className="mb-12 border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <Link href="/guides/image-formats/webp-vs-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">WebP vs PNG Guide</h3>
              <p className="text-sm text-muted-foreground">Learn about the modern WebP format and how it beats PNG.</p>
            </Link>
            <Link href="/guides/image-formats/best-image-format-for-websites" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Best Format for Websites</h3>
              <p className="text-sm text-muted-foreground">The ultimate guide to web image optimization.</p>
            </Link>
            <Link href="/compress-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Compress PNG Tool</h3>
              <p className="text-sm text-muted-foreground">Reduce PNG file size without losing quality.</p>
            </Link>
            <Link href="/remove-exif" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
              <h3 className="font-semibold text-lg mb-1 text-primary">Remove EXIF Data</h3>
              <p className="text-sm text-muted-foreground">Clean your photos before publishing online.</p>
            </Link>
          </div>
        </section>

      </div>
    </GuidePageLayout>
  )
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
