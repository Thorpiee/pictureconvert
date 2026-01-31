import Link from "next/link"
import { Metadata } from "next"
import { Check, X, PenTool, Monitor, Printer, Smartphone, FileText, ArrowRight, Image as ImageIcon } from "lucide-react"
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
        <>Best Image Format for Logos <span className="text-primary block text-2xl md:text-3xl font-bold mt-2 opacity-90">SVG vs PNG vs PDF</span></>
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
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Why Logos Are Unique</h2>
        <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
          <p className="text-lg leading-relaxed text-muted-foreground mb-0">
            Unlike a photograph, a logo is made of simple shapes, sharp lines, and solid colors.
            Standard photo formats (like JPG) are designed to blur pixels slightly to smooth out gradients in photos.
            When you apply this to a logo, you get "fuzziness" or "artifacts" around the text.
          </p>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Vector vs. Raster: The Most Important Concept</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <PenTool className="h-6 w-6" /> Vector (The Hero)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Made of math (points and lines). Can be scaled to the size of the moon and stay sharp.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 bg-white dark:bg-black/20 p-3 rounded-lg border border-green-100 dark:border-green-900/50">
                  <Check className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Formats: <strong>SVG, EPS, AI, PDF</strong></span>
                </li>
                <li className="flex items-center gap-3 bg-white dark:bg-black/20 p-3 rounded-lg border border-green-100 dark:border-green-900/50">
                  <Check className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Best for: <strong>Master file, Web, Print</strong></span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-6 w-6" /> Raster (The Sidekick)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Made of pixels (little squares). If you zoom in, it gets blocky/pixelated.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border border-border/50">
                  <Check className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span>Formats: <strong>PNG, JPG, WebP</strong></span>
                </li>
                <li className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg border border-border/50">
                  <Check className="h-5 w-5 text-muted-foreground shrink-0" />
                  <span>Best for: <strong>Social Media, Email</strong></span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Best Formats by Use Case</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Use Case 1 */}
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600">
                  <Monitor className="h-6 w-6" />
                </div>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                  Winner: SVG
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Websites (Header, Footer)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                SVG is code, not an image. It is incredibly lightweight (often under 2KB) and looks perfect on 4K monitors and mobile phones alike.
              </p>
              <div className="text-sm bg-muted p-3 rounded border border-border/50">
                <strong>Fallback:</strong> Use a <Link href="/compress-png" className="text-primary hover:underline">Compressed PNG</Link> with transparent background.
              </div>
            </CardContent>
          </Card>

          {/* Use Case 2 */}
          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl text-purple-600">
                  <Smartphone className="h-6 w-6" />
                </div>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                  Winner: PNG
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Social Media Profiles</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Most platforms convert uploads to JPG. Upload a high-quality <strong>PNG</strong> to ensure the best starting quality.
              </p>
              <div className="text-sm bg-muted p-3 rounded border border-border/50">
                <strong>Tip:</strong> Put your logo on a white/colored circle background yourself to control Dark Mode looks.
              </div>
            </CardContent>
          </Card>

          {/* Use Case 3 */}
          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-orange-600">
                  <Printer className="h-6 w-6" />
                </div>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                  Winner: EPS / PDF
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Print (Cards, Brochures)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Printers need vector data. Send them an EPS or a vector PDF to allow infinite scaling without pixelation.
              </p>
              <div className="text-sm bg-muted p-3 rounded border border-border/50">
                <strong>Warning:</strong> Never send a JPG logo to a printer. It will look blurry.
              </div>
            </CardContent>
          </Card>

          {/* Use Case 4 */}
          <Card className="border-l-4 border-l-slate-500 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-slate-600">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                  Winner: PNG
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Microsoft Office (Word/PPT)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Office apps often struggle with SVGs. A high-res PNG with transparent background is the safest bet.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">The Transparency Issue</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-border bg-muted/10">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Does your logo look like it's inside a white box? That's because you used a format that doesn't support transparency.
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[150px] font-bold">Format</TableHead>
                  <TableHead className="font-bold">Transparency?</TableHead>
                  <TableHead className="font-bold">Verdict</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="h-16 hover:bg-red-50/50 dark:hover:bg-red-950/10">
                  <TableCell className="font-bold text-lg">JPG</TableCell>
                  <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-5 w-5" /> No</TableCell>
                  <TableCell className="text-muted-foreground">Never use for logos</TableCell>
                </TableRow>
                <TableRow className="h-16 hover:bg-green-50/50 dark:hover:bg-green-950/10">
                  <TableCell className="font-bold text-lg">PNG</TableCell>
                  <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-5 w-5" /> Yes</TableCell>
                  <TableCell className="font-medium">Excellent for Social/Web</TableCell>
                </TableRow>
                <TableRow className="h-16 hover:bg-green-50/50 dark:hover:bg-green-950/10">
                  <TableCell className="font-bold text-lg">SVG</TableCell>
                  <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-5 w-5" /> Yes</TableCell>
                  <TableCell className="font-medium">Best for Website Layouts</TableCell>
                </TableRow>
                <TableRow className="h-16 hover:bg-green-50/50 dark:hover:bg-green-950/10">
                  <TableCell className="font-bold text-lg">WebP</TableCell>
                  <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-5 w-5" /> Yes</TableCell>
                  <TableCell className="font-medium">Good Modern Alternative</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-8">What to Ask Your Designer For</h2>
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-4">The Logo Deliverables Checklist</h4>
              <p className="text-muted-foreground mb-6">
                If you are getting a logo designed, ensure your contract states you will receive the following files.
                If you only get a JPG, you have been ripped off.
              </p>
              <ul className="grid gap-3">
                <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span><strong>Master Vector File:</strong> .AI or .EPS (For future edits and print)</span>
                </li>
                <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span><strong>Web Vector:</strong> .SVG (For your website header)</span>
                </li>
                <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span><strong>High-Res Raster:</strong> .PNG with transparent background</span>
                </li>
                <li className="flex items-center gap-3 bg-white dark:bg-black/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span><strong>Social Versions:</strong> Square JPGs/PNGs optimized for profile pics</span>
                </li>
              </ul>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-4">
              <div className="bg-white dark:bg-black/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center md:text-left md:w-64">
                <h5 className="font-bold mb-2">Need to convert?</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  Have a PNG but need a different format?
                </p>
                <Link href="/" className="inline-flex w-full justify-center items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium text-sm transition-colors">
                  Open Converter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GuidePageLayout>
  )
}
