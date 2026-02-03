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

const tool = getToolBySlug("webp-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function WebpToPngPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is WebP to PNG conversion?</h2>
        <p className="text-muted-foreground mb-4">
          WebP to PNG conversion is the process of changing a WebP image file back into the Portable Network Graphics (PNG) format.
          While WebP is excellent for websites, PNG is the gold standard for lossless image editing and broad compatibility.
        </p>
        <p className="text-muted-foreground mb-4">
          Users often convert WebP to PNG when they need to edit images in software that doesn't fully support WebP, or when
          they require a format that works flawlessly across every device and operating system without exception.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert WebP to PNG?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Image Editing:</strong> Many older image editors (like older versions of Photoshop) do not natively open WebP files.</li>
          <li><strong>Universal Compatibility:</strong> If you are sharing images with people who might use older computers or software.</li>
          <li><strong>Lossless Quality:</strong> When you need to ensure absolutely no data is lost during further edits or processing.</li>
          <li><strong>Transparent Backgrounds:</strong> Both formats support transparency, making the switch seamless for logos and icons.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert WebP to PNG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Select your WebP:</strong> Click to upload or drag your WebP file into the conversion box.</li>
          <li><strong>Start Conversion:</strong> The tool automatically processes the file to change picture format to PNG.</li>
          <li><strong>Wait a Moment:</strong> Our local converter processes the image instantly in your browser.</li>
          <li><strong>Download PNG:</strong> Save the high-quality PNG file to your device.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">WebP vs PNG (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>WebP</TableHead>
                <TableHead>PNG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Compatibility</TableCell>
                <TableCell>Modern Browsers</TableCell>
                <TableCell className="text-green-600 font-bold">Universal (All Devices)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell className="text-green-600 font-bold">Smallest</TableCell>
                <TableCell>Larger (Lossless)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Editability</TableCell>
                <TableCell>Limited Support</TableCell>
                <TableCell className="text-green-600 font-bold">Supported Everywhere</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground mb-4">
          Absolutely. At PictureConvert, we believe your images are your property. That's why we built a tool that runs entirely in your browser.
        </p>
        <p className="text-muted-foreground">
          When you use our online image converter, your files are never uploaded to the cloud. Conversion happens locally on your machine,
          guaranteeing 100% privacy and security for your personal or professional images.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/png-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert PNG to WebP
                </Link>
              </li>
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG Images
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
      <ConverterTool
        toolName={tool!.name}
        acceptedTypes={tool!.acceptedTypes}
        outputType={tool!.outputType}
      />
    </ToolLayout>
  )
}
