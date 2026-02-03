import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { WebsiteOptimizerTool } from "@/components/tools/website-optimizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, X } from "lucide-react"

const tool = getToolBySlug("website-optimizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function WebsiteOptimizerPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Website Image Optimizer</h2>
        <p className="text-muted-foreground mb-4">
          Images are often the heaviest part of a website. Large, unoptimized images slow down page load times, hurt your SEO rankings,
          and frustrate mobile users.
        </p>
        <p className="text-muted-foreground mb-4">
          Our <strong>Website Image Optimizer</strong> prepares your photos for the web. It automatically converts them to modern, efficient formats like <strong>WebP</strong> and applies aggressive (but visual-safe) compression to minimize file size without ruining the user experience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why optimize for the web?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Faster Loading:</strong> Smaller files mean your site loads instantly, even on 4G networks.</li>
          <li><strong>Better SEO:</strong> Google prioritizes fast-loading sites (Core Web Vitals).</li>
          <li><strong>Bandwidth Savings:</strong> Reduce hosting costs and data usage for your visitors.</li>
          <li><strong>Modern Formats:</strong> Automatically convert older JPGs/PNGs to next-gen WebP format.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to use this tool</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Select the images you want to put on your website.</li>
          <li><strong>Process:</strong> The tool automatically applies "Web-Ready" settings (balanced quality/size).</li>
          <li><strong>Download:</strong> Save the optimized files and upload them to your CMS (WordPress, Shopify, etc.).</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Optimized vs Original: The Impact</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Metric</TableHead>
                <TableHead className="font-bold">Original Image</TableHead>
                <TableHead className="font-bold">Optimized for Web</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Heavy (e.g., 2MB)</TableCell>
                <TableCell className="text-green-600 font-medium">Light (e.g., 200KB)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Load Time</TableCell>
                <TableCell className="text-red-500 flex items-center gap-2"><X className="h-4 w-4" /> Slow (Seconds)</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Instant (Milliseconds)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SEO Score</TableCell>
                <TableCell>Penalized</TableCell>
                <TableCell>Boosted</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Format</TableCell>
                <TableCell>JPG / PNG</TableCell>
                <TableCell>WebP (Modern)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to use?</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Yes.</strong> We use client-side processing technology. This means your images are optimized right inside your browser and are <strong>never uploaded to our servers</strong>. You can safely optimize images for client websites, confidential projects, or personal portfolios without any privacy risks.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Web Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Format Conversion</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jpg-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> JPG to WebP (Best for photos)
                </Link>
              </li>
              <li>
                <Link href="/png-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> PNG to WebP (Best for transparent images)
                </Link>
              </li>
              <li>
                <Link href="/guides/image-formats/best-image-format-for-websites" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Guide: Best Formats for Websites
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Utility Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resize-image-to-exact-pixels" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Exact Pixel Resizer (For banners/ads)
                </Link>
              </li>
              <li>
                <Link href="/smart-optimizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Smart Optimizer (Auto-balance)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )

  return (
    <ToolLayout tool={tool!} extraContent={content}>
      <WebsiteOptimizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
