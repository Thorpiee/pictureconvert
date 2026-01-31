import Link from "next/link"
import { Metadata } from "next"
import {
  Check,
  X,
  Smartphone,
  Image as ImageIcon,
  Maximize2,
  AlertTriangle,
  ArrowRight,
  Layers,
  Crop
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GuidePageLayout } from "@/components/guide-page-layout"

export const metadata: Metadata = {
  title: "Best Image Format for Instagram (2025) | JPG vs PNG & Sizes",
  description: "Stop your photos from looking blurry on Instagram. Discover the best image format, export settings, and exact dimensions for Posts, Stories, and Reels.",
}

const faqs = [
  {
    question: "What is the best image format for Instagram?",
    answer: "The best image format for Instagram is JPG (JPEG). While Instagram accepts PNG, it often converts them to JPG during upload, which can cause color shifts and compression artifacts. Uploading a high-quality JPG directly gives you the most control."
  },
  {
    question: "Why do my Instagram photos look blurry?",
    answer: "Blurry photos usually happen for two reasons: 1) Your image resolution is too low (under 1080px wide), or 2) Your image is too high (over 1350px) and Instagram's algorithm aggressively compresses it. Always resize your photos to exactly 1080px width before uploading."
  },
  {
    question: "Should I use PNG or JPG for Instagram?",
    answer: "Use JPG for photographs. Use PNG only for graphics with text or logos. However, be aware that Instagram may convert your PNG to JPG anyway. For photos, a high-quality (85-100%) JPG is the safest bet for consistent results."
  },
  {
    question: "What is the best aspect ratio for Instagram?",
    answer: "For feed posts, the 4:5 aspect ratio (1080x1350 pixels) is best because it takes up the most vertical screen space on mobile, grabbing more attention. For Stories and Reels, use 9:16 (1080x1920 pixels)."
  },
  {
    question: "Does Instagram support WebP?",
    answer: "As of 2025, Instagram's mobile apps primarily rely on JPG and HEIC uploads. While you might be able to select a WebP file, Instagram will convert it. Stick to JPG for the most predictable quality."
  }
]

export default function BestImageFormatForInstagramPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides" },
    { label: "Image Formats", href: "/guides/image-formats" },
    { label: "Best Format for Instagram" },
  ]

  const heroExtra = (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 dark:opacity-40"></div>
      <Card className="relative bg-card border-border shadow-xl">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
            <Smartphone className="h-6 w-6 text-purple-600" />
            Instagram Cheat Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format</span>
              <div className="font-bold text-lg md:text-xl">JPG (JPEG)</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Width</span>
              <div className="font-bold text-lg md:text-xl text-purple-600">1080px <span className="text-sm font-normal text-muted-foreground">(Exact)</span></div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Compression</span>
              <div className="font-bold text-lg md:text-xl">85% - 100%</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Color Profile</span>
              <div className="font-bold text-lg md:text-xl">sRGB</div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg flex items-center justify-between">
            <span className="font-medium text-purple-900 dark:text-purple-200">Need to resize?</span>
            <Link href="/instagram-image-resizer" className="text-sm font-bold text-purple-700 dark:text-purple-300 hover:underline flex items-center gap-1">
              Use Free Tool <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <GuidePageLayout
      title={
        <>Best Image Format for Instagram <span className="text-primary block text-2xl md:text-3xl font-bold mt-2 opacity-90">The Ultimate Quality Guide (2025)</span></>
      }
      subtitle="Stop your photos from looking blurry. We reveal the exact settings, formats, and dimensions to keep your Instagram posts crystal clear."
      breadcrumbs={breadcrumbs}
      heroExtra={heroExtra}
      faqs={faqs}
      variant="split"
    >
      {/* Section 1: The Problem (Split Layout) */}
      <section className="mb-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-bold mb-6">Why Your Photos Look Blurry</h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
              <p className="mb-4">
                Instagram has over 1 billion users. To keep the app fast, they use an <strong>aggressive compression algorithm</strong>.
              </p>
              <p>
                The golden rule is simple: If you don't resize your image, Instagram will do it for you. And their resizer is built for speed, not quality.
              </p>
            </div>
          </div>
          <div className="md:col-span-7">
            <Card className="bg-destructive/5 border-destructive/20 h-full">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  The Compression Trap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">The Wrong Way</h4>
                    <p className="text-sm text-muted-foreground mb-3">Uploading a huge 4000px wide image directly from your camera.</p>
                    <div className="text-destructive font-bold text-sm">Result: Instagram crushes it → Blurry details.</div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-green-600">The Right Way</h4>
                    <p className="text-sm text-muted-foreground mb-3">Resizing to exactly 1080px wide before upload.</p>
                    <div className="text-green-600 font-bold text-sm">Result: Instagram accepts it → Sharp details.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2: Best Formats Table */}
      <section className="mb-24">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Best Sizes by Post Type</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Different parts of Instagram require different dimensions. Use this definitive breakdown.
          </p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden shadow-sm bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-lg font-bold py-5">Post Type</TableHead>
                <TableHead className="text-lg font-bold py-5">Aspect Ratio</TableHead>
                <TableHead className="text-lg font-bold py-5">Size (Px)</TableHead>
                <TableHead className="text-lg font-bold py-5">Verdict</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                    Portrait
                  </div>
                </TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">4:5</TableCell>
                <TableCell className="text-lg py-6 font-mono font-bold text-green-600">1080 x 1350</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-1">
                    Recommended
                  </span>
                  <br />
                  Max screen space = More attention.
                </TableCell>
              </TableRow>

              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg text-pink-600 dark:text-pink-400">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    Stories / Reels
                  </div>
                </TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">9:16</TableCell>
                <TableCell className="text-lg py-6 font-mono font-bold text-green-600">1080 x 1920</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">
                  Essential for full-screen video content.
                </TableCell>
              </TableRow>

              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-600 dark:text-gray-400">
                      <Crop className="h-5 w-5" />
                    </div>
                    Square
                  </div>
                </TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">1:1</TableCell>
                <TableCell className="text-lg py-6 font-mono">1080 x 1080</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">
                  Classic, but takes up less space than portrait.
                </TableCell>
              </TableRow>

              <TableRow className="group hover:bg-muted/30 transition-colors bg-destructive/5">
                <TableCell className="font-bold text-lg py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg text-red-600 dark:text-red-400">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                    Landscape
                  </div>
                </TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">1.91:1</TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">1080 x 566</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 mb-1">
                    Avoid
                  </span>
                  <br />
                  Looks tiny on mobile screens.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Section 3: PNG vs JPG (Comparison Cards) */}
      <section className="mb-24">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">PNG vs JPG: The Verdict</h2>
          <p className="text-xl text-muted-foreground">
            Many creators think PNG is better because it's "lossless". On Instagram, that's often a trap.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* JPG Card */}
          <Card className="border-green-200 dark:border-green-900 bg-green-50/30 dark:bg-green-900/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-green-700 dark:text-green-400">
                <span>JPG (JPEG)</span>
                <Check className="h-6 w-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold text-lg">The Safe Choice</p>
              <p className="text-muted-foreground">
                You control the compression. Export at 85-100% quality, and Instagram will likely keep it as is.
              </p>
              <div className="py-2 px-4 bg-green-100 dark:bg-green-900/30 rounded text-green-800 dark:text-green-300 font-bold text-center mt-4">
                Recommended for Photos
              </div>
            </CardContent>
          </Card>

          {/* PNG Card */}
          <Card className="border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-900/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-red-700 dark:text-red-400">
                <span>PNG</span>
                <X className="h-6 w-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-bold text-lg">The Risky Choice</p>
              <p className="text-muted-foreground">
                Files are often too large (5MB+). Instagram's server aggressively crushes them to ~100KB, causing banding and color shifts.
              </p>
              <div className="py-2 px-4 bg-red-100 dark:bg-red-900/30 rounded text-red-800 dark:text-red-300 font-bold text-center mt-4">
                Avoid for Photos
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Section 4: Final Checklist & CTA */}
      <section className="mb-24 bg-muted/30 rounded-3xl p-8 md:p-16 border border-border/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Final Export Checklist</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Before you hit upload, double-check these four settings in Lightroom, Photoshop, or Canva.
            </p>

            <div className="space-y-4">
              {[
                { label: "Format", value: "JPG (JPEG)", desc: "Avoid PNG for photos" },
                { label: "Width", value: "1080px Exact", desc: "Don't upload 4000px files" },
                { label: "Aspect Ratio", value: "4:5 (1350px tall)", desc: "For feed posts" },
                { label: "Color Profile", value: "sRGB", desc: "Prevents dull colors" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
                  <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label} • {item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-8">
            <div className="bg-background p-8 rounded-2xl border border-border shadow-lg max-w-sm mx-auto">
              <Layers className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Fix Your Photos Now</h3>
              <p className="text-muted-foreground mb-8">
                Don't worry about the math. Our free tool resizes, crops, and converts your images to these exact Instagram standards automatically.
              </p>
              <Link href="/instagram-image-resizer">
                <div className="inline-flex items-center justify-center rounded-lg text-lg font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 w-full shadow-lg shadow-primary/20">
                  Open Instagram Resizer
                </div>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">
                100% Free • No Signup Required
              </p>
            </div>
          </div>
        </div>
      </section>
    </GuidePageLayout>
  )
}
