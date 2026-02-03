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

const tool = getToolBySlug("compress-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function CompressPngPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is PNG Compression?</h2>
        <p className="text-muted-foreground mb-4">
          PNG compression reduces the file size of Portable Network Graphics (PNG) images while preserving their transparency and quality.
          Unlike JPGs, PNGs are "lossless," meaning they retain all image data, which can result in large file sizes.
        </p>
        <p className="text-muted-foreground mb-4">
          Our smart PNG compressor uses advanced algorithms (like quantization) to significantly lower the file size—often by 50-80%—while
          keeping the image looking virtually identical to the original, including its transparent background.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you compress a PNG?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Website Logos & Icons:</strong> Ensure your branding elements load instantly without pixelation.</li>
          <li><strong>Screenshots:</strong> Screenshots are often saved as large PNGs. Compress them to share easily via Slack, Teams, or email.</li>
          <li><strong>App Development:</strong> Reduce the size of your app bundle by optimizing all UI assets and sprites.</li>
          <li><strong>Transparent Images:</strong> If you need transparency but want smaller files, compressing your PNGs is the best solution.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to compress PNG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload PNG:</strong> Drag and drop your PNG file into the tool above.</li>
          <li><strong>Analyze:</strong> The tool automatically scans the image to find the best compression strategy.</li>
          <li><strong>Compress:</strong> We reduce the file size while maintaining transparency and sharpness.</li>
          <li><strong>Download:</strong> Get your optimized PNG image instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Compressed PNG vs Original (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Original PNG</TableHead>
                <TableHead>Compressed PNG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Very Large</TableCell>
                <TableCell className="text-green-600 font-bold">Significantly Smaller</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Quality</TableCell>
                <TableCell>Lossless (100%)</TableCell>
                <TableCell>Perceptually Lossless</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Editing, Archiving</TableCell>
                <TableCell>Web, Apps, Sharing</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to compress images online?</h2>
        <p className="text-muted-foreground mb-4">
          Absolutely. We understand that your screenshots and designs may contain sensitive information.
        </p>
        <p className="text-muted-foreground">
          That's why PictureConvert processes all images locally in your browser. Your PNG files are never uploaded to a server,
          ensuring 100% data privacy and security. What happens on your device stays on your device.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG Images
                </Link>
              </li>
              <li>
                <Link href="/png-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert PNG to WebP
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
                <Link href="/guides/image-formats/webp-vs-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> WebP vs PNG Guide
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
