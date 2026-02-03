import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { FormatRecommenderTool } from "@/components/tools/format-recommender-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("best-image-format-for-web")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function BestImageFormatPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Finding the Best Image Format</h2>
        <p className="text-muted-foreground mb-4">
          Choosing the right image format is one of the most important decisions for web performance. The wrong format can make your website slow,
          eat up bandwidth, or look blurry. The right format ensures your images are crisp, load instantly, and rank higher on Google.
        </p>
        <p className="text-muted-foreground mb-4">
          Our <strong>Image Format Recommender</strong> analyzes your specific needs—whether it's for a photograph, a logo, a screenshot, or an animation—and
          tells you exactly which modern file type (WebP, AVIF, JPG, PNG, or SVG) will give you the best results.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Common Web Formats Explained</h2>
        <div className="grid gap-4 md:grid-cols-2 text-muted-foreground">
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold text-foreground mb-2">WebP</h3>
            <p>The modern standard. Developed by Google, it offers superior compression for both photos and graphics. It supports transparency and animation. Supported by all modern browsers.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold text-foreground mb-2">JPG / JPEG</h3>
            <p>The classic choice for photographs. Great for complex colors but does not support transparency. Best for backward compatibility.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold text-foreground mb-2">PNG</h3>
            <p>Lossless quality. Essential for images requiring transparency (like logos) or sharp text/lines. Files can be heavy.</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold text-foreground mb-2">SVG</h3>
            <p>Vector format. Infinite scalability without quality loss. Perfect for icons, logos, and simple illustrations. Extremely small file size.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Recommendations</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>For Photos:</strong> Use <Link href="/jpg-to-webp" className="text-primary hover:underline">WebP</Link> or JPG.</li>
          <li><strong>For Logos/Icons:</strong> Use SVG (best) or <Link href="/png-to-webp" className="text-primary hover:underline">WebP/PNG</Link>.</li>
          <li><strong>For Screenshots:</strong> Use PNG or WebP to keep text sharp.</li>
          <li><strong>For Website Speed:</strong> Always prefer WebP or AVIF over older formats.</li>
        </ul>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Tools to Optimize Your Images</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Convert to Modern Formats</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jpg-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert JPG to WebP
                </Link>
              </li>
              <li>
                <Link href="/png-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert PNG to WebP
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Optimize Existing Files</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/website-optimizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Website Image Optimizer
                </Link>
              </li>
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG Files
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
      <FormatRecommenderTool />
    </ToolLayout>
  )
}
