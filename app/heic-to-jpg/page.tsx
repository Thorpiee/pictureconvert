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

const tool = getToolBySlug("heic-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function HeicToJpgPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is HEIC to JPG conversion?</h2>
        <p className="text-muted-foreground mb-4">
          HEIC to JPG conversion transforms High Efficiency Image Container (HEIC) files—the standard format for iPhone photos—into
          widely compatible JPEG images. While HEIC offers great quality at small sizes, it isn't supported by many non-Apple devices or websites.
        </p>
        <p className="text-muted-foreground mb-4">
          Converting to JPG ensures your iPhone photos can be opened on Windows computers, Android phones, and uploaded to any website
          without compatibility errors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert HEIC to JPG?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Sharing with Windows Users:</strong> Most Windows PCs cannot open HEIC files by default. JPG works everywhere.</li>
          <li><strong>Website Uploads:</strong> Many forms, profile picture uploaders, and CMS platforms do not accept HEIC format.</li>
          <li><strong>Editing Software:</strong> Older photo editors (like Photoshop CS6) do not support HEIC files.</li>
          <li><strong>Printing:</strong> Online printing services and photo kiosks often require standard JPG files.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert HEIC to JPG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload HEIC:</strong> Drag your .heic photos from your computer or phone into the converter.</li>
          <li><strong>Adjust Quality (Optional):</strong> Choose your output quality. High quality preserves details; lower quality saves space.</li>
          <li><strong>Convert:</strong> The tool instantly processes the file to change picture format to JPG.</li>
          <li><strong>Download:</strong> Save your new compatible JPG images.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">HEIC vs JPG (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>HEIC (Apple)</TableHead>
                <TableHead>JPG (Standard)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Compatibility</TableCell>
                <TableCell>Apple Devices Only</TableCell>
                <TableCell className="text-green-600 font-bold">Universal (All Devices)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell className="text-green-600 font-bold">Smallest</TableCell>
                <TableCell>Small</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Image Quality</TableCell>
                <TableCell>High (16-bit color)</TableCell>
                <TableCell>Good (8-bit color)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Web Support</TableCell>
                <TableCell><X className="h-4 w-4 text-red-500" /></TableCell>
                <TableCell className="text-green-600 font-bold">Supported Everywhere</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground mb-4">
          Yes, especially with PictureConvert. Unlike many other HEIC converters, our tool works <strong>locally in your browser</strong>.
        </p>
        <p className="text-muted-foreground">
          Your personal photos are never uploaded to our servers. The conversion happens directly on your device, ensuring that your
          memories stay private and secure.
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
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image
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
