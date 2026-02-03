import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { InstagramResizerTool } from "@/components/tools/instagram-resizer-tool"
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

const tool = getToolBySlug("instagram-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why resize for Instagram?</h2>
        <p className="text-muted-foreground mb-4">
          Instagram is strict about image ratios. If your photo doesn't fit their standard dimensions (like square 1:1 or portrait 4:5),
          the app will automatically crop or zoom into your image, often cutting off important details.
        </p>
        <p className="text-muted-foreground mb-4">
          Our Instagram Image Resizer helps you prepare your photos perfectly <em>before</em> you upload. This ensures your entire image
          is visible, high-quality, and professionally framed without any awkward automatic cropping.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Best Instagram Image Sizes (2025)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post Type</TableHead>
                <TableHead>Aspect Ratio</TableHead>
                <TableHead>Recommended Size (px)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Square Post</TableCell>
                <TableCell>1:1</TableCell>
                <TableCell>1080 x 1080</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Portrait Post (Best for Reach)</TableCell>
                <TableCell>4:5</TableCell>
                <TableCell>1080 x 1350</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Landscape Post</TableCell>
                <TableCell>1.91:1</TableCell>
                <TableCell>1080 x 566</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Story / Reel</TableCell>
                <TableCell>9:16</TableCell>
                <TableCell>1080 x 1920</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Profile Picture</TableCell>
                <TableCell>1:1</TableCell>
                <TableCell>320 x 320</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to resize photos for Instagram</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Select the photo you want to post.</li>
          <li><strong>Select Format:</strong> Choose "Square," "Portrait," "Landscape," or "Story" from the presets.</li>
          <li><strong>Adjust:</strong> Drag and position your image to fit the frame perfectly. Background blur is added automatically for non-fitting images.</li>
          <li><strong>Download:</strong> Save the optimized image and upload it directly to Instagram.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Safe & Private Processing</h2>
        <p className="text-muted-foreground mb-4">
          We believe your photos belong to you. That's why our Instagram resizer runs entirely in your web browser.
        </p>
        <p className="text-muted-foreground">
          Your images are <strong>never uploaded to our servers</strong>. All resizing and processing happens locally on your device,
          guaranteeing 100% privacy and security.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Social Media Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Crop Image
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress for Upload
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Helpful Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-instagram" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Format for Instagram
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
      <InstagramResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
