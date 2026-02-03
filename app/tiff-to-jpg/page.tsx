import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { TiffConverterTool } from "@/components/tools/tiff-converter-tool"
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

const tool = getToolBySlug("tiff-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function TiffPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is TIFF to JPG conversion?</h2>
        <p className="text-muted-foreground mb-4">
          TIFF to JPG conversion transforms large, uncompressed Tagged Image File Format (TIFF) files into the widely supported, compressed JPEG format.
          TIFFs are standard in photography and printing but are often too large and incompatible for standard web use.
        </p>
        <p className="text-muted-foreground mb-4">
          By converting to JPG, you make your images easily shareable via email, social media, and websites, reducing file sizes
          dramatically while maintaining acceptable visual quality for screen viewing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert TIFF to JPG?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Sharing Photos:</strong> TIFF files are often 50MB+, making them impossible to email. JPGs are much smaller.</li>
          <li><strong>Web Compatibility:</strong> Most web browsers and social media platforms do not display TIFF files.</li>
          <li><strong>Previewing Scans:</strong> If you've scanned documents as high-quality TIFFs, convert copies to JPG for easy viewing.</li>
          <li><strong>Saving Space:</strong> Archiving thousands of TIFFs takes massive storage; JPG copies take up a fraction of the space.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert TIFF to JPG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload TIFF:</strong> Select your .tiff or .tif file. We support large files from scanners and cameras.</li>
          <li><strong>Automatic Processing:</strong> The tool reads the complex TIFF data and prepares it for conversion.</li>
          <li><strong>Convert:</strong> Click to change picture format to a standard JPG image.</li>
          <li><strong>Download:</strong> Get your compatible JPG file instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">TIFF vs JPG (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>TIFF</TableHead>
                <TableHead>JPG (JPEG)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Massive (Uncompressed)</TableCell>
                <TableCell className="text-green-600 font-bold">Compact (Compressed)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Web Support</TableCell>
                <TableCell><X className="h-4 w-4 text-red-500" /></TableCell>
                <TableCell className="text-green-600 font-bold">Universal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Quality</TableCell>
                <TableCell className="text-green-600 font-bold">Lossless (Best for Print)</TableCell>
                <TableCell>Lossy (Best for Screen)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Use Case</TableCell>
                <TableCell>Archiving, Printing</TableCell>
                <TableCell>Sharing, Web, Email</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground mb-4">
          Your privacy is paramount. Unlike other services that upload your large TIFF files to a server (which can take a long time),
          PictureConvert processes everything in your browser.
        </p>
        <p className="text-muted-foreground">
          This means your sensitive documents and high-resolution photos never leave your computer. The conversion is faster
          because there is no upload time, and it is completely secure.
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
                <Link href="/heic-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert HEIC to JPG
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
                <Link href="/guides/image-formats/best-image-format-for-printing" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Format for Printing
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
      <TiffConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
