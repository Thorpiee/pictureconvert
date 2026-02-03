import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { TwitterResizerTool } from "@/components/tools/twitter-resizer-tool"
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

const tool = getToolBySlug("twitter-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function TwitterResizerPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Optimize Images for X (Twitter)</h2>
        <p className="text-muted-foreground mb-4">
          On X (formerly Twitter), images with the wrong aspect ratio get awkwardly cropped in the feed, hiding your key content.
          To stop users from scrolling past your posts, you need images that look perfect at a glance.
        </p>
        <p className="text-muted-foreground mb-4">
          Our Twitter Image Resizer instantly formats your photos, headers, and ads to the exact dimensions recommended by X,
          ensuring your visual content is fully visible and engaging.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Twitter / X Image Size Guide (2025)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image Type</TableHead>
                <TableHead>Dimensions (px)</TableHead>
                <TableHead>Aspect Ratio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">In-Stream Photo (Landscape)</TableCell>
                <TableCell>1600 x 900</TableCell>
                <TableCell>16:9</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">In-Stream Photo (Square)</TableCell>
                <TableCell>1080 x 1080</TableCell>
                <TableCell>1:1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">In-Stream Photo (Portrait)</TableCell>
                <TableCell>1080 x 1350</TableCell>
                <TableCell>4:5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Header / Banner</TableCell>
                <TableCell>1500 x 500</TableCell>
                <TableCell>3:1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Profile Picture</TableCell>
                <TableCell>400 x 400</TableCell>
                <TableCell>1:1 (Circle Crop)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Summary Card</TableCell>
                <TableCell>1200 x 628</TableCell>
                <TableCell>1.91:1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to resize for X</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Drag and drop your image or click to browse.</li>
          <li><strong>Choose Preset:</strong> Select "Post," "Header," or "Profile" to automatically set the correct dimensions.</li>
          <li><strong>Customize:</strong> Use the crop area to focus on the most important part of your image.</li>
          <li><strong>Download:</strong> Save your optimized image and tweet it with confidence.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Fast & Secure</h2>
        <p className="text-muted-foreground mb-4">
          This tool processes everything <strong>locally in your browser</strong>.
        </p>
        <p className="text-muted-foreground">
          We do not upload your images to any server. Whether you're resizing a personal photo or a confidential business graphic,
          your data remains 100% private and never leaves your device.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Social Media Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/linkedin-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> LinkedIn Resizer
                </Link>
              </li>
              <li>
                <Link href="/instagram-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Instagram Resizer
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Helpful Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-websites" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Format for Websites
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
      <TwitterResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
