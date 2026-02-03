import Link from "next/link"
import { Metadata } from "next"
import { Check, X, PenTool, Monitor, Printer, Smartphone, FileText, ArrowRight, Image as ImageIcon, Layers, Maximize2 } from "lucide-react"
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
  title: "Best Image Format for Logos (SVG vs PNG vs PDF) | 2025 Guide",
  description: "Stop using JPG logos. Learn the best image formats for logos on websites, business cards, and social media. When to use SVG, PNG, EPS, and PDF.",
}

const faqs = [
  {
    question: "What is the best file format for a logo?",
    answer: "SVG (Scalable Vector Graphics) is the best format for logos on the web because it's scalable, tiny in file size, and crisp on any screen. For print, EPS or PDF is the standard. For social media, use a transparent PNG."
  },
  {
    question: "Why does my logo have a white background?",
    answer: "You probably saved it as a JPG. JPG does not support transparency, so it fills transparent areas with white. To fix this, convert your logo to PNG or SVG, which both support transparent backgrounds."
  },
  {
    question: "Should I use PNG or JPG for my logo?",
    answer: "Always use PNG over JPG for logos. PNG supports transparency and is lossless, meaning lines and text stay sharp. JPG uses compression that creates 'noise' around text and sharp edges."
  },
  {
    question: "What format should I ask my designer for?",
    answer: "Ask for a 'Master Vector File' (usually .AI, .EPS, or .SVG). This is the source code of your logo. From this file, you can create any other format (PNG, JPG, PDF) at any size without losing quality."
  },
  {
    question: "Is PDF good for logos?",
    answer: "Yes, PDF is excellent for sharing logos, especially for print. A high-quality PDF from a designer usually contains vector data, meaning it can be scaled infinitely just like an EPS file."
  }
]

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Image Formats", href: "/guides/image-formats" },
  { label: "Best Format for Logos" },
]

export default function BestImageFormatForLogosPage() {
  const heroExtra = (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 dark:opacity-40"></div>
      <Card className="relative bg-card border-border shadow-xl">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <PenTool className="h-6 w-6 text-blue-600" />
            Logo Cheat Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Web (Header)</span>
              <div className="font-bold text-lg md:text-xl text-blue-600">SVG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Social Media</span>
              <div className="font-bold text-lg md:text-xl">PNG</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Print</span>
              <div className="font-bold text-lg md:text-xl">EPS / PDF</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transparency</span>
              <div className="font-bold text-lg md:text-xl text-green-600">Yes (PNG/SVG)</div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg flex items-center justify-between">
            <span className="font-medium text-blue-900 dark:text-blue-200">Need a favicon?</span>
            <Link href="/png-to-ico" className="text-sm font-bold text-blue-700 dark:text-blue-300 hover:underline flex items-center gap-1">
              Make ICO <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title={
        <>Best Image Format for Logos <span className="text-primary block text-2xl md:text-3xl font-bold mt-2 opacity-90">SVG vs PNG vs PDF (2025 Guide)</span></>
      }
      subtitle={
        <>
          Your logo is the face of your brand. Using the wrong format makes your business look unprofessional.
          In this guide, we'll explain why <strong className="text-foreground">JPG is the enemy of logos</strong> and help you choose the best image format for websites, social media, and print.
        </>
      }
      breadcrumbs={breadcrumbs}
      heroExtra={heroExtra}
      faqs={faqs}
      variant="split"
    >
      {/* 2. Quick Answer Section */}
      <section className="mb-16 not-prose">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Check className="h-6 w-6" />
            Quick Answer: What Should You Use?
          </h2>
          <p className="text-lg leading-relaxed text-foreground mb-4">
            For <strong>Websites</strong> (headers, footers), always use <strong>SVG</strong>. It's scalable, tiny, and sharp on all screens.
          </p>
          <p className="text-lg leading-relaxed text-foreground mb-4">
            For <strong>Social Media</strong> (profile pics), use <strong>PNG</strong>. It supports transparency and doesn't have the compression artifacts of JPG.
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            For <strong>Print</strong> (business cards, banners), use <strong>EPS or PDF</strong>. These are vector formats that can be scaled infinitely without losing quality.
          </p>
        </div>
      </section>

      {/* 3. Context Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Monitor className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold m-0">Why It Matters</h2>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Unlike a photograph, a logo is made of simple shapes, sharp lines, and solid colors. Standard photo formats (like JPG) are designed to blur pixels slightly to smooth out gradients in photos.
          </p>
          <p className="text-lg leading-relaxed">
            When you apply this photo compression to a logo, you get "fuzziness" or "artifacts" around the text. This makes your brand look cheap and unprofessional, especially on high-resolution Retina displays.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <X className="h-5 w-5" />
                  The "Amateur" Approach (JPG)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Saving a logo as a standard JPG.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-destructive"><X className="h-4 w-4" /> No transparency (white box background)</li>
                  <li className="flex items-center gap-2 text-destructive"><X className="h-4 w-4" /> Fuzzy text edges (artifacts)</li>
                  <li className="flex items-center gap-2 text-destructive"><X className="h-4 w-4" /> Blurry when zoomed in</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  The "Pro" Approach (SVG/PNG)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Using Vector (SVG) or Lossless (PNG).</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-700 dark:text-green-400"><Check className="h-4 w-4" /> Perfect transparency</li>
                  <li className="flex items-center gap-2 text-green-700 dark:text-green-400"><Check className="h-4 w-4" /> Crisp, sharp edges</li>
                  <li className="flex items-center gap-2 text-green-700 dark:text-green-400"><Check className="h-4 w-4" /> Infinite scaling (SVG only)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Data / Benchmarks Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">Format Comparison Table</h2>
        <div className="rounded-xl border border-border overflow-hidden shadow-sm bg-card not-prose">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[150px] text-lg font-bold py-5">Format</TableHead>
                <TableHead className="text-lg font-bold py-5">Type</TableHead>
                <TableHead className="text-lg font-bold py-5">Scalability</TableHead>
                <TableHead className="text-lg font-bold py-5">Transparency</TableHead>
                <TableHead className="text-lg font-bold py-5">Best For</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6 text-primary">SVG</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">Vector</TableCell>
                <TableCell className="text-lg py-6 font-bold text-green-600">Infinite</TableCell>
                <TableCell className="text-lg py-6 text-green-600">Yes</TableCell>
                <TableCell className="text-lg py-6 font-medium">Websites, Icons</TableCell>
              </TableRow>
              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6 text-primary">PNG</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">Raster</TableCell>
                <TableCell className="text-lg py-6 text-amber-600">Limited</TableCell>
                <TableCell className="text-lg py-6 text-green-600">Yes</TableCell>
                <TableCell className="text-lg py-6 font-medium">Social Media, Email</TableCell>
              </TableRow>
              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6 text-primary">PDF/EPS</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">Vector</TableCell>
                <TableCell className="text-lg py-6 font-bold text-green-600">Infinite</TableCell>
                <TableCell className="text-lg py-6 text-green-600">Yes</TableCell>
                <TableCell className="text-lg py-6 font-medium">Professional Print</TableCell>
              </TableRow>
              <TableRow className="group hover:bg-muted/30 transition-colors bg-destructive/5">
                <TableCell className="font-bold text-lg py-6 text-destructive">JPG</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">Raster</TableCell>
                <TableCell className="text-lg py-6 text-destructive">Poor</TableCell>
                <TableCell className="text-lg py-6 text-destructive">No</TableCell>
                <TableCell className="text-lg py-6 font-medium">Photos Only (Avoid for Logos)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 5. Factors That Affect Results */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
            <Layers className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold m-0">Key Factors to Consider</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-primary" />
                Scalability (Vector vs Raster)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Vector files (SVG, EPS, AI)</strong> use math to draw lines. You can print them on a business card or a billboard, and they will look identical. <strong>Raster files (PNG, JPG)</strong> use pixels. If you enlarge them, they become blocky and blurry.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Background Transparency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your logo often needs to sit on top of other things (colored headers, photos, dark mode). <strong>JPG does not support transparency</strong>—it will always have a white box around it. <strong>PNG and SVG</strong> allow the background to show through.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PenTool className="h-5 w-5 text-primary" />
                Editability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A "Master File" (usually AI or EPS) allows a designer to change colors, move elements, or adjust text later. A flattened file like a JPG or PNG cannot be easily edited without recreating the logo from scratch.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                File Size & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For websites, SVGs are often incredibly small (1-5KB) because they are just text code. A high-res PNG might be 100KB+. Using SVG ensures your website loads faster, improving your SEO and user experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Actionable Improvements */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">How to Get the Right Logo Format</h2>
        <div className="bg-muted/30 rounded-2xl p-8 border border-border">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ask Your Designer for the "Source File"</h3>
                <p className="text-muted-foreground mb-3">
                  If you hired a designer, they owe you the source file. Ask for the <strong>.AI (Adobe Illustrator)</strong>, <strong>.EPS</strong>, or <strong>.SVG</strong> file. This is your "Master Key."
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Create Web Versions</h3>
                <p className="text-muted-foreground mb-3">
                  Use the source file to export an <strong>SVG</strong> for your website header. If you can't use SVG, export a <strong>PNG</strong> at 2x resolution (Retina) with a transparent background.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Create Social Media Versions</h3>
                <p className="text-muted-foreground mb-3">
                  Export a <strong>PNG</strong> file. Avoid JPG unless the platform absolutely requires it (like Instagram posts), but even then, start with a high-quality source.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-bold mb-4">Need to fix a logo?</h4>
              <div className="flex flex-wrap gap-4">
                <Link href="/svg-to-png" className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                  Convert SVG to PNG
                </Link>
                <Link href="/png-to-ico" className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8">
                  Make a Favicon (ICO)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Internal Links Section */}
      <section className="mb-12 border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <Link href="/png-to-ico" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG to ICO Converter</h3>
            <p className="text-sm text-muted-foreground">Create a favicon for your website from your logo.</p>
          </Link>
          <Link href="/compress-png" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG Compressor</h3>
            <p className="text-sm text-muted-foreground">Shrink your PNG logos so they load faster.</p>
          </Link>
          <Link href="/guides/image-formats/png-vs-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG vs JPG Guide</h3>
            <p className="text-sm text-muted-foreground">Why PNG is better for graphics and logos.</p>
          </Link>
          <Link href="/guides/image-formats/best-image-format-for-websites" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">Best Format for Websites</h3>
            <p className="text-sm text-muted-foreground">Comprehensive guide to web images.</p>
          </Link>
        </div>
      </section>
    </GuidePageLayout>
  )
}
