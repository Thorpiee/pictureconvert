import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { SvgConverterTool } from "@/components/tools/svg-converter-tool"
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

const tool = getToolBySlug("svg-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function SvgPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is SVG to PNG conversion?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>SVG</strong> (Scalable Vector Graphics) files are code-based images that look perfect at any size. They are standard for logos and icons in web design.
          However, SVGs are not supported everywhere—you can't upload them to Instagram, Facebook, or most email clients.
        </p>
        <p className="text-muted-foreground mb-4">
          Converting <strong>SVG to PNG</strong> transforms these vectors into a standard raster image format. This makes your graphics compatible with virtually
          every device, social media platform, and software application while preserving transparency.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert SVG to PNG?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Social Media:</strong> Platforms like Instagram, Twitter (X), and LinkedIn do not accept SVG files. You must convert them to PNG or JPG first.</li>
          <li><strong>Email Signatures:</strong> Most email clients block SVG images for security reasons. PNG is the standard for crisp, clear email logos.</li>
          <li><strong>Document Embedding:</strong> Word, PowerPoint, and Google Docs handle PNGs much better than SVGs, ensuring your graphics look the same for everyone.</li>
          <li><strong>Complex Rendering:</strong> If your SVG contains complex filters or fonts that might break on other devices, "baking" it into a PNG ensures it looks exactly as intended.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert SVG to PNG online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload SVG:</strong> Select your .svg file. Our tool handles even complex vector paths.</li>
          <li><strong>Set Resolution:</strong> SVGs have no fixed size. You can often choose how large you want the output PNG to be (e.g., 1024px wide).</li>
          <li><strong>Convert:</strong> The tool renders the vector code into pixels, preserving transparency.</li>
          <li><strong>Download:</strong> Save your high-quality PNG file.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Vector vs. Raster: What's the difference?</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>SVG (Vector)</TableHead>
                <TableHead>PNG (Raster)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Scalability</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Infinite</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> Pixelates on zoom</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Compatibility</TableCell>
                <TableCell>Web Browsers & Design Tools</TableCell>
                <TableCell>Universal (Everything opens PNG)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Tiny (Code based)</TableCell>
                <TableCell>Larger (Pixel based)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert SVG online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Yes.</strong> We use client-side processing to render your SVG into a PNG image. This conversion happens entirely within your web browser. <strong>Your files are never uploaded to our servers</strong>, ensuring that your logos, icons, and designs remain completely private and secure on your device.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Format Converters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/png-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert PNG to JPG
                </Link>
              </li>
              <li>
                <Link href="/webp-to-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert WebP to PNG
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Helpful Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-logos" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Format for Logos
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
      <SvgConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
