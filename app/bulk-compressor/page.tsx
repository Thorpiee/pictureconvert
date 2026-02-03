import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { BulkCompressorTool } from "@/components/tools/bulk-compressor-tool"
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

const tool = getToolBySlug("bulk-compressor")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function BulkCompressorPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is Bulk Image Compression?</h2>
        <p className="text-muted-foreground mb-4">
          Bulk Image Compression is the process of optimizing multiple image files simultaneously. Instead of processing photos one by one,
          our tool allows you to upload a batch of JPG, PNG, or WebP images and compress them all at once.
        </p>
        <p className="text-muted-foreground mb-4">
          This is essential for web developers, photographers, and content creators who need to prepare large collections of images
          for the web, ensuring they take up less storage space and load faster without significant quality loss.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you use a Bulk Compressor?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Website Launches:</strong> Optimize all your site's assets (banners, icons, product photos) in a single go before deployment.</li>
          <li><strong>Email Campaigns:</strong> Ensure your newsletters load quickly by compressing all embedded images at once.</li>
          <li><strong>Storage Management:</strong> Free up gigabytes of space on your hard drive or cloud storage by reducing the footprint of your photo archives.</li>
          <li><strong>Social Media Albums:</strong> Prepare dozens of event photos for upload without hitting file size limits or enduring long upload times.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to compress multiple images online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Select Images:</strong> Drag and drop up to 50 images or select multiple files from your folder.</li>
          <li><strong>Choose Settings:</strong> Set your desired compression level (Aggressive, Balanced, or Light) for the entire batch.</li>
          <li><strong>Process:</strong> The tool will compress every image in the queue automatically.</li>
          <li><strong>Download All:</strong> Download individual optimized images or grab them all in a single ZIP file.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Bulk vs Single Compression</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Bulk Compression</TableHead>
                <TableHead>Single Image Compression</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Speed</TableCell>
                <TableCell className="text-green-600 font-bold">Fastest (Batch Processing)</TableCell>
                <TableCell>Slower (One by one)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Control</TableCell>
                <TableCell>Uniform Settings</TableCell>
                <TableCell className="text-green-600 font-bold">Precise per-image control</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Convenience</TableCell>
                <TableCell className="text-green-600 font-bold">High (Set and forget)</TableCell>
                <TableCell>Low (Repetitive)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Project Assets, Albums</TableCell>
                <TableCell>Hero Images, Logos</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to compress images online?</h2>
        <p className="text-muted-foreground mb-4">
          Yes. PictureConvert is designed with privacy as the #1 priority. Even when processing bulk batches of 50+ images,
          everything happens locally in your browser.
        </p>
        <p className="text-muted-foreground">
          Your photos are never sent to a backend server. This not only keeps your data 100% private but also makes the bulk compression
          incredibly fast since there's no network latency for uploading and downloading huge files.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Specific Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG (Single)
                </Link>
              </li>
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG (Single)
                </Link>
              </li>
              <li>
                <Link href="/website-optimizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Website Image Optimizer
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Learn More</h3>
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
      <BulkCompressorTool toolName={tool!.name} />
    </ToolLayout>
  )
}
