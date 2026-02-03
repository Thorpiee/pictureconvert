import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ResizeTool } from "@/components/tools/resize-tool"
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

const tool = getToolBySlug("resize-image")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function ResizeImagePage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is Image Resizing?</h2>
        <p className="text-muted-foreground mb-4">
          Image resizing is the process of changing the dimensions (width and height) of a digital image. Unlike cropping, which cuts out
          parts of the photo, resizing scales the entire image up or down to fit specific pixel requirements.
        </p>
        <p className="text-muted-foreground mb-4">
          Whether you need to shrink a massive 20MP photo to fit on a website or adjust a picture for a social media profile,
          our online image resizer ensures your images are the perfect size without needing complex software.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you resize an image?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Social Media:</strong> Instagram, Twitter, and LinkedIn have strict dimension limits (e.g., 1080x1080 for posts).</li>
          <li><strong>Website Performance:</strong> Large images slow down websites. Resizing them to the exact display size improves load speed.</li>
          <li><strong>Email Attachments:</strong> Many email providers limit attachment sizes. Resizing dimensions often reduces file size significantly.</li>
          <li><strong>Government Forms:</strong> Online applications often require passport photos to be exact pixel dimensions (e.g., 600x600 px).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to resize an image online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload Image:</strong> Drop your JPG, PNG, or WebP file into the box above.</li>
          <li><strong>Set Dimensions:</strong> Enter your desired width or height in pixels. Use the "Maintain Aspect Ratio" lock to prevent distortion.</li>
          <li><strong>Apply:</strong> The tool calculates the new dimensions instantly.</li>
          <li><strong>Download:</strong> Save your perfectly resized image to your device.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Resize vs Crop (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Resize</TableHead>
                <TableHead>Crop</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Action</TableCell>
                <TableCell>Scales entire image</TableCell>
                <TableCell>Cuts out part of image</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Content</TableCell>
                <TableCell className="text-green-600 font-bold">Keeps everything</TableCell>
                <TableCell>Removes edges/details</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Aspect Ratio</TableCell>
                <TableCell>Can change or stay same</TableCell>
                <TableCell>Usually changes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Fitting specific dimensions</TableCell>
                <TableCell>Improving composition</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to resize images online?</h2>
        <p className="text-muted-foreground mb-4">
          Privacy is built into PictureConvert. When you resize an image with our tool, the processing happens 100% inside your web browser.
        </p>
        <p className="text-muted-foreground">
          We do not upload your files to any server. This guarantees that your personal photos, documents, and designs remain completely private
          and never leave your device.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Crop Image
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG
                </Link>
              </li>
              <li>
                <Link href="/bulk-compressor" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Bulk Image Compressor
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
      <ResizeTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
