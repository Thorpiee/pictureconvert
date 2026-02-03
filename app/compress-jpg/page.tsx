import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { CompressorTool } from "@/components/tools/compressor-tool"
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

const tool = getToolBySlug("compress-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function CompressJpgPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is JPG Compression?</h2>
        <p className="text-muted-foreground mb-4">
          JPG compression is a technique used to reduce the file size of JPEG images without significantly degrading their visual quality.
          It works by selectively discarding data that the human eye is less likely to notice, a process known as "lossy" compression.
        </p>
        <p className="text-muted-foreground mb-4">
          By compressing your JPG files, you can make them load much faster on websites, send them easily via email, and save storage space
          on your devices, all while keeping the image looking sharp and professional.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you compress a JPG?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Web Optimization:</strong> Uncompressed photos are the #1 cause of slow websites. Compressing them boosts SEO and user experience.</li>
          <li><strong>Emailing Photos:</strong> Reduce file sizes to bypass attachment limits (e.g., 25MB) when sending high-resolution photos.</li>
          <li><strong>Saving Disk Space:</strong> Shrink your photo library to store more memories without buying extra cloud storage.</li>
          <li><strong>Mobile Data:</strong> Smaller images consume less data, making your content more accessible to users on mobile networks.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to compress JPG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload JPG:</strong> Select or drag and drop your JPEG image into the compressor tool.</li>
          <li><strong>Select Quality:</strong> Use the slider to balance size vs. quality (e.g., 80% is a great sweet spot).</li>
          <li><strong>Compress:</strong> The tool instantly processes the image to reduce its file size.</li>
          <li><strong>Download:</strong> Save your optimized, lightweight JPG file.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Original vs Compressed (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Original JPG</TableHead>
                <TableHead>Compressed JPG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Heavy (e.g., 5MB)</TableCell>
                <TableCell className="text-green-600 font-bold">Light (e.g., 500KB)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Visual Quality</TableCell>
                <TableCell>Maximum</TableCell>
                <TableCell>Nearly Identical</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Load Time</TableCell>
                <TableCell>Slow</TableCell>
                <TableCell className="text-green-600 font-bold">Instant</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">SEO Score</TableCell>
                <TableCell>Poor</TableCell>
                <TableCell className="text-green-600 font-bold">Excellent</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to compress images online?</h2>
        <p className="text-muted-foreground mb-4">
          Yes, your security is our priority. PictureConvert uses client-side technology, which means the compression process happens
          entirely within your web browser.
        </p>
        <p className="text-muted-foreground">
          We do not upload your photos to any external server. Your images stay on your device throughout the entire process,
          ensuring complete privacy for your personal data.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG Images
                </Link>
              </li>
              <li>
                <Link href="/bulk-compressor" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Bulk Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Helpful Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/png-vs-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> PNG vs JPG Guide
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
      <CompressorTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
