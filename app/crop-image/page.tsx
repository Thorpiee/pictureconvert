import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { CropTool } from "@/components/tools/crop-tool"
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

const tool = getToolBySlug("crop-image")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function CropImagePage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is Image Cropping?</h2>
        <p className="text-muted-foreground mb-4">
          Image cropping is the process of removing unwanted outer areas from a photograph or graphic. It is one of the most fundamental
          photo editing techniques, used to improve framing, change aspect ratios, or focus attention on a specific subject.
        </p>
        <p className="text-muted-foreground mb-4">
          Unlike resizing (which shrinks the whole image), cropping cuts out pixels. Our online crop tool lets you easily select the perfect
          area of your image to keep, discarding the rest to create a clean, professional composition.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you crop an image?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Improving Composition:</strong> Remove distracting background elements or empty space to make your subject pop.</li>
          <li><strong>Social Media Aspect Ratios:</strong> Create perfect squares (1:1) for Instagram posts or 16:9 shots for YouTube thumbnails.</li>
          <li><strong>Profile Pictures:</strong> Crop a group photo or a full-body shot into a focused headshot for LinkedIn or Twitter.</li>
          <li><strong>Printing:</strong> Ensure your photo fits standard frame sizes (like 4x6 or 8x10) without being stretched or distorted.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to crop images online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload Photo:</strong> Drop your image file into the crop tool area.</li>
          <li><strong>Select Area:</strong> Drag the handles of the crop box to choose the part you want to keep.</li>
          <li><strong>Choose Ratio (Optional):</strong> Select a preset like "Square," "16:9," or "4:3" for precise dimensions.</li>
          <li><strong>Crop & Download:</strong> Click the button to apply the crop and save your new image instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Crop vs Resize (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Resize</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Method</TableCell>
                <TableCell>Removes pixels (Cuts)</TableCell>
                <TableCell>Scales pixels (Shrinks/Stretches)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Image Content</TableCell>
                <TableCell>Changes (Shows less)</TableCell>
                <TableCell>Same (Shows everything)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Aspect Ratio</TableCell>
                <TableCell className="text-green-600 font-bold">Adjustable (e.g., to Square)</TableCell>
                <TableCell>Usually Maintained</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Framing, Composition</TableCell>
                <TableCell>File Size, Dimensions</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to crop images online?</h2>
        <p className="text-muted-foreground mb-4">
          Yes, it is completely safe. PictureConvert operates with a strict privacy-first policy.
        </p>
        <p className="text-muted-foreground">
          When you use our crop tool, the image processing happens entirely within your browser. Your photos are never uploaded to our servers,
          meaning no one else can ever see, store, or access your personal images.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG Images
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
      <CropTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
