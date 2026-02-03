import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { BmpConverterTool } from "@/components/tools/bmp-converter-tool"
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

const tool = getToolBySlug("bmp-converter")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function BmpPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is a BMP file?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>BMP</strong> (Bitmap) is one of the oldest image formats. It stores color data for every single pixel without any compression.
          While this ensures perfect quality, it results in massive file sizes that are impractical for the modern web.
        </p>
        <p className="text-muted-foreground mb-4">
          Our BMP Converter allows you to transform these heavy files into modern, efficient formats like <strong>JPG, PNG, or WebP</strong>.
          This drastically reduces file size while maintaining the visual quality you need.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why convert BMP files?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Reduce File Size:</strong> A BMP file can easily be 10x or 20x larger than a JPG of the same image. Converting saves huge amounts of space.</li>
          <li><strong>Web Compatibility:</strong> Browsers can display BMPs, but they load very slowly. WebP or JPG is standard for websites.</li>
          <li><strong>Email Attachments:</strong> Because BMPs are so large, you can often only send one or two per email. Converting lets you send dozens.</li>
          <li><strong>Upload Limits:</strong> Many websites have file size limits (e.g., 5MB) that a high-resolution BMP will easily exceed.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert BMP online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload BMP:</strong> Drag and drop your .bmp file into the tool.</li>
          <li><strong>Select Format:</strong> Choose your target format:
            <ul className="list-disc list-inside ml-6 mt-1">
              <li><strong>JPG:</strong> Best for photos and smallest file size.</li>
              <li><strong>PNG:</strong> Best for graphics, text, and screenshots (lossless).</li>
              <li><strong>WebP:</strong> Best for websites (modern compression).</li>
            </ul>
          </li>
          <li><strong>Convert:</strong> The tool processes the image instantly in your browser.</li>
          <li><strong>Download:</strong> Save your optimized image.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">BMP vs. Modern Formats</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>BMP</TableHead>
                <TableHead>JPG / WebP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Compression</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> None (Uncompressed)</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> High Efficiency</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Massive</TableCell>
                <TableCell>Small / Tiny</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Web Ready</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> No (Too slow)</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Format Converters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tiff-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert TIFF to JPG
                </Link>
              </li>
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG Images
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
      <BmpConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
