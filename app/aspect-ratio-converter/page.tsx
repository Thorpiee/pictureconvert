import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { AspectRatioConverterTool } from "@/components/tools/aspect-ratio-converter-tool"
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

const tool = getToolBySlug("aspect-ratio-converter")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is an Aspect Ratio Calculator?</h2>
        <p className="text-muted-foreground mb-4">
          The <strong>aspect ratio</strong> of an image or video describes the proportional relationship between its width and its height.
          Common examples include <strong>16:9</strong> for widescreen TVs and YouTube, <strong>4:3</strong> for older monitors, and <strong>1:1</strong> for Instagram squares.
        </p>
        <p className="text-muted-foreground mb-4">
          Our <strong>Aspect Ratio Converter</strong> helps you calculate exact dimensions. If you know the width you want (e.g., 1920 pixels) and the ratio (16:9),
          this tool instantly tells you the required height (1080 pixels), ensuring your content fits perfectly without stretching or distortion.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why is Aspect Ratio important?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Social Media:</strong> Each platform has strict requirements (e.g., TikTok needs 9:16, Instagram Stories need 9:16). Uploading the wrong ratio results in black bars or cropped content.</li>
          <li><strong>Web Design:</strong> Responsive images need to maintain their ratio to look good on mobile and desktop screens.</li>
          <li><strong>Video Editing:</strong> Mixing footage with different aspect ratios can create ugly borders.</li>
          <li><strong>Photography:</strong> Printing requires specific ratios (like 3:2 for standard 4x6 prints).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Common Aspect Ratios Explained</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ratio</TableHead>
                <TableHead>Common Use Case</TableHead>
                <TableHead>Example Resolution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">16:9</TableCell>
                <TableCell>YouTube, HDTV, Modern Laptops</TableCell>
                <TableCell>1920 x 1080</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">9:16</TableCell>
                <TableCell>TikTok, Instagram Reels, Shorts</TableCell>
                <TableCell>1080 x 1920</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">4:3</TableCell>
                <TableCell>Old TVs, iPads, Digital Cameras</TableCell>
                <TableCell>1024 x 768</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">1:1</TableCell>
                <TableCell>Instagram Posts, Profile Pictures</TableCell>
                <TableCell>1080 x 1080</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">21:9</TableCell>
                <TableCell>Ultrawide Monitors, Cinematic Movies</TableCell>
                <TableCell>2560 x 1080</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resizing Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image (Free form)
                </Link>
              </li>
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Crop Image to Ratio
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Social Media Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/instagram-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Instagram Resizer
                </Link>
              </li>
              <li>
                <Link href="/tiktok-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> TikTok Resizer
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
      <AspectRatioConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
