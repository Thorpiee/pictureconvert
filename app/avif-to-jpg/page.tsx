import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
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

const tool = getToolBySlug("avif-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function AvifToJpgPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is AVIF to JPG conversion?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>AVIF</strong> (AV1 Image File Format) is one of the newest and most efficient image formats available, offering incredible quality at tiny file sizes.
          However, because it's so new, many older devices, photo editors, and websites don't know how to display it yet.
        </p>
        <p className="text-muted-foreground mb-4">
          Converting <strong>AVIF to JPG</strong> makes your image universally compatible again. It takes the advanced AVIF data and saves it as a standard JPEG,
          ensuring you can open, share, and edit the file on absolutely any computer or phone.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why convert AVIF files?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Compatibility:</strong> Fix "Format not supported" errors when trying to open images on Windows, Mac, or older browsers.</li>
          <li><strong>Editing:</strong> Most standard photo editors (like older Photoshop versions or Paint) cannot open AVIF files directly.</li>
          <li><strong>Social Sharing:</strong> Many social platforms and messaging apps will fail to upload or preview AVIF images.</li>
          <li><strong>Printing:</strong> Print shops and home printers generally require JPG or PDF formats to work correctly.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert AVIF to JPG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload AVIF:</strong> Drag your .avif file into the box above.</li>
          <li><strong>Adjust Quality:</strong> (Optional) Use the slider to balance file size vs. image clarity.</li>
          <li><strong>Convert:</strong> The tool instantly decodes the AVIF and re-encodes it as a JPG.</li>
          <li><strong>Download:</strong> Save your new, compatible image.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">AVIF vs. JPG: The Comparison</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>AVIF</TableHead>
                <TableHead>JPG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Compression Efficiency</TableCell>
                <TableCell className="text-green-600 font-bold">Excellent (Tiny files)</TableCell>
                <TableCell>Good (Standard files)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Compatibility</TableCell>
                <TableCell className="text-yellow-600 font-bold">Limited (Newer devices)</TableCell>
                <TableCell className="text-green-600 font-bold">Universal (Everywhere)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HDR Support</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> Limited</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert AVIF online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Yes.</strong> We use advanced browser-based technology. Your AVIF files are converted to JPG directly on your computer, inside your web browser. <strong>We never upload your photos to our servers.</strong> This guarantees that your images remain private and secure, as they never leave your device.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Format Converters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/webp-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert WebP to JPG
                </Link>
              </li>
              <li>
                <Link href="/heic-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert HEIC to JPG
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
      <ConverterTool
        toolName={tool!.name}
        acceptedTypes={tool!.acceptedTypes}
        outputType={tool!.outputType}
        showQuality
      />
    </ToolLayout>
  )
}
