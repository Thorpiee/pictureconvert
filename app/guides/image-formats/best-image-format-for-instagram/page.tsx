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
  Crop,
  Zap,
  Info,
  Settings,
  Monitor
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
      {/* 2. Quick Answer Section */}
      <section className="mb-16 not-prose">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Quick Answer: What Should You Use?
          </h2>
          <p className="text-lg leading-relaxed text-foreground mb-4">
            For <strong>Instagram posts</strong>, always upload <strong>JPG</strong> images resized to exactly <strong>1080 pixels wide</strong> with a <strong>4:5 aspect ratio</strong> (1080x1350).
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            While Instagram accepts PNGs, it converts them to JPGs during upload, often causing color shifts and artifacting. By uploading a high-quality JPG yourself, you control the compression rather than letting Instagram's algorithm decide for you.
          </p>
        </div>
      </section>

      {/* 3. Context Section */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            <Info className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold m-0">Why It Matters for Creators</h2>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Instagram processes over 95 million photos every single day. To keep the app fast for billions of users, they use an incredibly aggressive compression algorithm.
          </p>
          <p className="text-lg leading-relaxed">
            If you upload a massive 20MB file from your professional camera, Instagram sees it as "wasteful" and crushes it down to a few hundred kilobytes. This process destroys fine details, creates "muddy" pixels, and introduces banding in gradients (like skies or studio backdrops).
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  The "Let Instagram Handle It" Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Uploading a 4000px wide PNG directly.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-destructive"><X className="h-4 w-4" /> Massive file size compression</li>
                  <li className="flex items-center gap-2 text-destructive"><X className="h-4 w-4" /> Loss of sharpness</li>
                  <li className="flex items-center gap-2 text-destructive"><X className="h-4 w-4" /> Unpredictable color shifts</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900">
              <CardHeader>
                <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  The "Optimized" Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Uploading a 1080px wide JPG.</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-green-700 dark:text-green-400"><Check className="h-4 w-4" /> Minimal server-side processing</li>
                  <li className="flex items-center gap-2 text-green-700 dark:text-green-400"><Check className="h-4 w-4" /> 1:1 pixel mapping on most phones</li>
                  <li className="flex items-center gap-2 text-green-700 dark:text-green-400"><Check className="h-4 w-4" /> Consistent colors</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Data / Benchmarks Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">Best Sizes by Post Type</h2>
        <div className="rounded-xl border border-border overflow-hidden shadow-sm bg-card not-prose">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px] text-lg font-bold py-5">Post Type</TableHead>
                <TableHead className="text-lg font-bold py-5">Aspect Ratio</TableHead>
                <TableHead className="text-lg font-bold py-5">Exact Size (Px)</TableHead>
                <TableHead className="text-lg font-bold py-5">Why Use It</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                    Portrait Post
                  </div>
                </TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">4:5</TableCell>
                <TableCell className="text-lg py-6 font-mono font-bold text-green-600">1080 x 1350</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 mb-2">
                    Highly Recommended
                  </span>
                  <div className="text-sm">Takes up the most vertical screen space in the feed, increasing engagement.</div>
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
                  <div className="text-sm">Essential for full-screen immersive content. Anything smaller will have black bars added.</div>
                </TableCell>
              </TableRow>

              <TableRow className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-bold text-lg py-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-gray-600 dark:text-gray-400">
                      <Crop className="h-5 w-5" />
                    </div>
                    Square Post
                  </div>
                </TableCell>
                <TableCell className="text-lg py-6 font-mono text-muted-foreground">1:1</TableCell>
                <TableCell className="text-lg py-6 font-mono">1080 x 1080</TableCell>
                <TableCell className="text-lg py-6 text-muted-foreground">
                  <div className="text-sm">The classic format. Good, but you lose valuable vertical screen real estate compared to 4:5.</div>
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 mb-2">
                    Avoid
                  </span>
                  <div className="text-sm">Looks tiny on mobile screens. Easy to scroll past without noticing.</div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 5. Factors That Affect Results */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
            <Settings className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold m-0">Factors That Affect Quality</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 not-prose">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-primary" />
                Resolution Limits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Instagram's maximum width is 1080 pixels. If you upload a 4000 pixel image, it doesn't look "better"—it forces the server to downscale it. This automated downscaling is often rougher than doing it yourself in Photoshop or our free tool.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Color Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Browsers and apps operate in <strong>sRGB</strong>. If you export your photos in AdobeRGB or ProPhoto RGB (common for print), your colors will look washed out or gray when posted to Instagram. Always convert to sRGB before saving.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                File Type Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While PNG is lossless, Instagram converts it to JPG upon upload to save space. This conversion happens on their end, giving you zero control over the quality setting. Uploading a JPG ensures what you see is what you get.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Actionable Improvements */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">How to Fix Your Instagram Photos</h2>
        <div className="bg-muted/30 rounded-2xl p-8 border border-border">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Crop to 4:5 Aspect Ratio</h3>
                <p className="text-muted-foreground mb-3">
                  Don't post landscape photos if you can avoid it. Crop your image to a vertical 4:5 ratio (or 8:10) to maximize screen real estate.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Resize to 1080px Width</h3>
                <p className="text-muted-foreground mb-3">
                  Resize your image so the width is exactly 1080 pixels. The height should be 1350 pixels for a 4:5 crop.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Convert to sRGB & Save as JPG</h3>
                <p className="text-muted-foreground mb-3">
                  Ensure your color profile is set to sRGB. Save the file as a JPG with 85-100% quality.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-bold mb-4">Don't want to do this manually?</h4>
              <Link href="/instagram-image-resizer" className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                Use Our Free Instagram Resizer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Internal Links Section */}
      <section className="mb-12 border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-6">Related Guides & Tools</h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <Link href="/instagram-image-resizer" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">Instagram Image Resizer</h3>
            <p className="text-sm text-muted-foreground">Automatically crop and resize your photos for Instagram.</p>
          </Link>
          <Link href="/compress-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">JPG Compressor</h3>
            <p className="text-sm text-muted-foreground">Reduce JPG file size without losing quality.</p>
          </Link>
          <Link href="/guides/image-formats/png-vs-jpg" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">PNG vs JPG Guide</h3>
            <p className="text-sm text-muted-foreground">Deep dive into when to use each format.</p>
          </Link>
          <Link href="/guides/image-formats/best-image-format-for-websites" className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all">
            <h3 className="font-semibold text-lg mb-1 text-primary">Best Format for Websites</h3>
            <p className="text-sm text-muted-foreground">How to optimize images for your own website.</p>
          </Link>
        </div>
      </section>

    </GuidePageLayout>
  )
}

