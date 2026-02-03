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

const tool = getToolBySlug("png-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function PngToJpgPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is PNG to JPG conversion?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Converting <strong>PNG</strong> (Portable Network Graphics) to <strong>JPG</strong> (Joint Photographic Experts Group) is the process of transforming a lossless image format into a compressed, lossy format. PNGs are renowned for their ability to handle transparency and preserve sharp edge details, making them the standard choice for logos, icons, and digital graphics. However, this quality comes at a cost: PNG files can be significantly larger than necessary for standard photographs.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          JPGs (or JPEGs) are designed specifically for photography and complex images with millions of colors. By using intelligent compression, JPGs can significantly reduce file size while maintaining acceptable visual quality. This conversion is essential when you need to share photos online, send email attachments, or optimize websites for faster loading speeds without consuming excessive bandwidth.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert PNG to JPG?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You should consider changing your picture format from PNG to JPG in several specific scenarios where efficiency matters more than perfect pixel fidelity:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Reducing File Size:</strong> If your PNG photo is 5MB, converting it to JPG can often reduce it to 500KB or less, saving huge amounts of storage and bandwidth.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Web Performance:</strong> Smaller images load faster. Using JPGs for blog posts, product photos, and galleries improves your site's SEO and user experience.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Platform Compatibility:</strong> Some older systems, government portals, or specific upload forms strictly require JPG/JPEG format and will reject PNGs.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Email Attachments:</strong> Email providers have file size limits. Converting heavy PNG screenshots or scans to JPG makes them easier to send and faster to download.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Printing Photos:</strong> Most photo printing services and kiosks prefer or require JPG format for standard 4x6 or 5x7 prints.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert PNG to JPG online</h2>
        <ol className="space-y-4 text-muted-foreground list-decimal pl-5">
          <li className="pl-2">
            <strong>Upload your PNG:</strong> Click the "Select Image" button or drag and drop your PNG files directly into the tool area above.
          </li>
          <li className="pl-2">
            <strong>Adjust Settings (Optional):</strong> Use the quality slider to find the right balance between file size and image clarity. Lower quality means smaller file size.
          </li>
          <li className="pl-2">
            <strong>Convert:</strong> The tool will instantly process your image in the browser. You can see the new file size before downloading.
          </li>
          <li className="pl-2">
            <strong>Download:</strong> Save your new JPG file to your device. You can convert multiple images at once for bulk processing.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">PNG vs JPG: Quick Comparison</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Feature</TableHead>
                <TableHead className="font-bold">PNG</TableHead>
                <TableHead className="font-bold">JPG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Compression</TableCell>
                <TableCell>Lossless (High Quality)</TableCell>
                <TableCell>Lossy (High Efficiency)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Supported</TableCell>
                <TableCell className="text-red-500 flex items-center gap-2"><X className="h-4 w-4" /> Not Supported</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Large</TableCell>
                <TableCell>Small</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best Use Case</TableCell>
                <TableCell>Logos, Graphics, Text</TableCell>
                <TableCell>Photos, Web Images, Social Media</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Yes, it is completely safe when using <strong>PictureConvert</strong>. Unlike many other online converters that upload your photos to a remote server, our tool processes your files <strong>locally in your browser</strong>. This means your personal photos, documents, and screenshots never leave your device. There is no risk of data breaches, privacy leaks, or server-side snooping because the conversion happens entirely on your own computer or phone.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Compress JPG
                </Link>
              </li>
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Resize Image
                </Link>
              </li>
              <li>
                <Link href="/webp-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  WebP to JPG Converter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/png-vs-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  PNG vs JPG: Which is Best?
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
