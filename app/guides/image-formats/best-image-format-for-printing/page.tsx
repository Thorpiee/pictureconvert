import Link from "next/link"
import { Metadata } from "next"
import { Check, X, Printer, AlertTriangle, FileImage, Layers, Palette, Monitor } from "lucide-react"
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
  title: "Best Image Format for Printing: TIFF vs PDF vs JPG (2025)",
  description: "Don't print blurry images. Learn the best image formats for printing (TIFF vs PDF), understand 300 DPI vs 72 DPI, and why CMYK color mode matters.",
}

const faqs = [
  {
    question: "What is the highest quality image format for printing?",
    answer: "TIFF (Tagged Image File Format) is the gold standard for high-quality professional printing. It is lossless, uncompressed, and preserves all image data, ensuring the sharpest possible print. For vectors (logos/text), PDF or EPS is best."
  },
  {
    question: "Can I print a JPG image?",
    answer: "Yes, but be careful. JPG is a lossy format. If you print a highly compressed JPG, you might see 'artifacts' or blocky pixels on paper. If you must print a JPG, ensure it is saved at maximum quality (100%) and has a resolution of at least 300 DPI."
  },
  {
    question: "What is 300 DPI and why do I need it?",
    answer: "DPI stands for Dots Per Inch. Screens only need 72 DPI to look good, but printers need much more detail—standard print resolution is 300 DPI. Printing a 72 DPI web image will result in a blurry, pixelated mess."
  },
  {
    question: "Should I use RGB or CMYK for printing?",
    answer: "Use CMYK (Cyan, Magenta, Yellow, Key/Black). Screens emit light using RGB, but printers use ink. If you send an RGB file to a printer, the colors might shift (bright neon greens and blues often turn dull). Convert to CMYK before sending to print."
  },
  {
    question: "Is PNG good for printing?",
    answer: "Generally, no. PNG is designed for screens (RGB). While it prints okay on home printers, professional printers often struggle with PNG color profiles and transparency. Use TIFF or PDF for professional results."
  }
]

export default function BestImageFormatForPrintingPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Image Formats", href: "/guides/image-formats" },
    { label: "Best Image Format for Printing" },
  ]

  const heroExtra = (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 dark:opacity-40"></div>
      <Card className="relative bg-card border-border shadow-xl">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Printer className="h-6 w-6 text-blue-600" />
            Print Ready Cheat Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resolution</span>
              <div className="font-bold text-lg md:text-xl text-blue-600">300 DPI</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Color Mode</span>
              <div className="font-bold text-lg md:text-xl">CMYK</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Photos</span>
              <div className="font-bold text-lg md:text-xl">TIFF</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vectors</span>
              <div className="font-bold text-lg md:text-xl">PDF / EPS</div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
            <span className="text-sm font-medium text-amber-900 dark:text-amber-200">
              Never print 72 DPI web images
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title="Best Image Format for Printing: The Professional Guide"
      subtitle={
        <>
          It looks great on your screen, but terrible on paper. Why? Printing is a completely different beast than the web.
          In this guide, we'll explain DPI, CMYK, and the <strong>best image formats for printing</strong> to ensure your hard work looks perfect in the real world.
        </>
      }
      breadcrumbs={breadcrumbs}
      faqItems={faqs}
      heroExtra={heroExtra}
      variant="split"
      schemaTitle="Best Image Format for Printing: TIFF vs PDF vs JPG (2025)"
      schemaDescription="Don't print blurry images. Learn the best image formats for printing (TIFF vs PDF), understand 300 DPI vs 72 DPI, and why CMYK color mode matters."
    >
      {/* 2. Quick Answer / TL;DR Section */}
      <section className="mb-16 not-prose">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Check className="h-6 w-6" />
            Quick Answer: What Should You Use?
          </h2>
          <p className="text-lg leading-relaxed text-foreground mb-4">
            For <strong>Professional Photos</strong>, use <strong>TIFF</strong>. It is uncompressed and preserves every detail.
          </p>
          <p className="text-lg leading-relaxed text-foreground mb-4">
            For <strong>Logos, Text, and Layouts</strong> (Brochures, Flyers), use <strong>PDF or EPS</strong>. These are vector formats that stay sharp at any size.
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            For <strong>Home Printing</strong>, high-quality <strong>JPG</strong> (100% quality) is usually fine, but avoid PNG as it can cause color shifts.
          </p>
        </div>
      </section>

      {/* 3. "What This Means" / Context Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">The Golden Rule: Print vs. Screen</h2>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          Screens are made of light; prints are made of ink. This fundamental difference dictates everything about file formats.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg text-blue-600">
                <Monitor className="h-5 w-5" />
                Computer Screen (Web)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded">
                    <Palette className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold">RGB Color Mode</div>
                    <div className="text-muted-foreground">Red, Green, Blue light</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded">
                    <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold">72 DPI Resolution</div>
                    <div className="text-muted-foreground">Standard for screens</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-1 rounded">
                    <FileImage className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold">WebP, JPG, SVG</div>
                    <div className="text-muted-foreground">Optimized for speed</div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg text-purple-600">
                <Printer className="h-5 w-5" />
                Physical Print
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded">
                    <Palette className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">CMYK Color Mode</div>
                    <div className="text-muted-foreground">Cyan, Magenta, Yellow, Black ink</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded">
                    <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">300 DPI Resolution</div>
                    <div className="text-muted-foreground">Standard for crisp ink dots</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded">
                    <FileImage className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-semibold">TIFF, PDF, EPS</div>
                    <div className="text-muted-foreground">Optimized for detail</div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Data / Benchmarks Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Comparison: Best Formats for Printing</h2>
        <p className="text-muted-foreground mb-6">
          Not all file extensions are created equal. Here is how the most common formats perform when sent to a professional printer.
        </p>
        <div className="not-prose overflow-hidden rounded-xl border shadow-sm bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[120px]">Format</TableHead>
                <TableHead>Best For</TableHead>
                <TableHead>Compression</TableHead>
                <TableHead className="text-right">Verdict</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/5">
                <TableCell className="font-bold">TIFF</TableCell>
                <TableCell>Professional Photos</TableCell>
                <TableCell>Lossless (Huge files)</TableCell>
                <TableCell className="text-right font-bold text-green-600">The Standard</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/5">
                <TableCell className="font-bold">PDF</TableCell>
                <TableCell>Documents, Flyers, Vector Logos</TableCell>
                <TableCell>Lossless (Scalable)</TableCell>
                <TableCell className="text-right font-bold text-green-600">Excellent</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/5">
                <TableCell className="font-bold">EPS</TableCell>
                <TableCell>Large Banners, Signage</TableCell>
                <TableCell>Vector (Infinite scaling)</TableCell>
                <TableCell className="text-right font-bold text-green-600">Great</TableCell>
              </TableRow>
              <TableRow className="hover:bg-muted/5">
                <TableCell className="font-bold text-muted-foreground">JPG</TableCell>
                <TableCell className="text-muted-foreground">Home Printing</TableCell>
                <TableCell className="text-muted-foreground">Lossy (Quality loss)</TableCell>
                <TableCell className="text-right text-amber-600">Okay (at 100%)</TableCell>
              </TableRow>
              <TableRow className="bg-red-50/50 hover:bg-red-50 dark:bg-red-950/10 dark:hover:bg-red-950/20">
                <TableCell className="font-bold text-red-600">PNG</TableCell>
                <TableCell className="text-red-600">Avoid for Print</TableCell>
                <TableCell className="text-red-600">Lossless</TableCell>
                <TableCell className="text-right font-bold text-red-600">Avoid</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 5. Factors That Affect Results */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Factors That Affect Print Quality</h2>

        <h3 className="text-2xl font-bold mb-4">1. DPI (Resolution)</h3>
        <p className="mb-4 text-muted-foreground">
          <strong>DPI = Dots Per Inch.</strong> Imagine filling a 1-inch square with dots of ink.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50">
            <div className="font-bold text-lg text-red-700 dark:text-red-400 mb-2">72 DPI</div>
            <p className="text-sm text-muted-foreground">
              72 dots across. Fine for screens, but looks like <strong>Lego blocks</strong> on paper. Images look blurry and pixelated.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50">
            <div className="font-bold text-lg text-green-700 dark:text-green-400 mb-2">300 DPI</div>
            <p className="text-sm text-muted-foreground">
              300 dots across. The industry standard for sharp magazines, brochures, and photos. Crisp edges and clear details.
            </p>
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm border-l-4 border-slate-500 mb-8">
          <strong>Mistake to Avoid:</strong> You cannot just change a 72 DPI image to 300 DPI in Photoshop. You need a high-resolution source file. If you download a 50KB image from Facebook, it will never look good in print.
        </div>

        <h3 className="text-2xl font-bold mb-4">2. Color Mode (CMYK vs RGB)</h3>
        <p className="mb-4 text-muted-foreground">
          Computer screens can create incredibly bright, neon colors (like pure cyan or electric lime) by mixing light (RGB).
          Printers mix physical pigments (Cyan, Magenta, Yellow, Black). Ink simply cannot be as bright as a lightbulb.
        </p>
        <p className="text-muted-foreground">
          If you design in RGB and print, your bright blues might turn muddy purple.
          <strong>Always convert your document to CMYK mode</strong> in your design software before exporting to check how the colors will actually look.
        </p>
      </section>

      {/* 6. How to Improve (Actionable) */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">How to Prepare Your Files for Print</h2>
        <Card className="not-prose bg-slate-900 text-slate-50 dark:bg-slate-950 border-slate-800">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Check className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold m-0 text-white">Pre-Print Checklist</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="font-medium">Resolution: 300 DPI minimum</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="font-medium">Color Mode: CMYK</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="font-medium">Format: PDF (Layouts) or TIFF (Photos)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="font-medium">Bleed: Include 1/8 inch (3mm)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <h3 className="text-xl font-bold mt-8 mb-4">Common Mistakes that Cause Blurry Prints</h3>
        <div className="grid gap-4 not-prose">
          <div className="flex gap-4 items-start p-4 rounded-lg border bg-muted/20">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full shrink-0">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Printing Web Images</h4>
              <p className="text-sm text-muted-foreground">Images saved from websites are almost always 72 DPI and compressed. They are useless for print.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-lg border bg-muted/20">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full shrink-0">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">Upscaling Small Images</h4>
              <p className="text-sm text-muted-foreground">Stretching a small image to fill a page just makes the pixels bigger (blurrier).</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Internal Links Section */}
      <section className="mb-12 border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <Link href="/guides/image-formats/best-image-format-for-logos" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">Best Format for Logos</h3>
            <p className="text-sm text-muted-foreground">Why you should use Vector (SVG/PDF) for logos.</p>
          </Link>
          <Link href="/guides/image-formats/png-vs-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG vs JPG Guide</h3>
            <p className="text-sm text-muted-foreground">Learn why JPG is risky for sharp edges.</p>
          </Link>
          <Link href="/compress-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">JPG Compressor</h3>
            <p className="text-sm text-muted-foreground">Ensure your JPGs are high quality before printing.</p>
          </Link>
          <Link href="/vectorizer" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">Image to Vector</h3>
            <p className="text-sm text-muted-foreground">Convert raster images to SVG/PDF for print.</p>
          </Link>
        </div>
      </section>

    </GuidePageLayout>
  )
}
