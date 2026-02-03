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

const tool = getToolBySlug("webp-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function WebpToJpgPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is WebP to JPG conversion?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>WebP to JPG</strong> conversion changes a modern, highly efficient image format (WebP) back into the universally compatible JPEG format. While WebP offers superior compression and quality for the web, it is not yet supported by every older image viewer, email client, or operating system.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Converting to JPG ensures your image can be opened, viewed, and edited on any device, from an old Windows PC to the latest smartphone, without requiring special software or plugins. It bridges the gap between modern web performance and legacy software compatibility.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert WebP to JPG?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You typically need to convert WebP images to JPG for compatibility reasons:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Software Incompatibility:</strong> Older versions of Photoshop, Microsoft Office, or default image viewers on Windows 7/8 often cannot open WebP files.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Email Sharing:</strong> Some email clients (like older Outlook versions) might not display embedded WebP images correctly to the recipient.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Printing Services:</strong> Most photo printing kiosks and online print labs do not accept WebP files; they require standard JPGs.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Uploading to Portals:</strong> Many government sites, job application forms, and legacy CMS platforms strictly accept JPG or PNG uploads.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Universal Sharing:</strong> When sending a photo to someone and you aren't sure what device they are using, JPG is the safest, most reliable format.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert WebP to JPG online</h2>
        <ol className="space-y-4 text-muted-foreground list-decimal pl-5">
          <li className="pl-2">
            <strong>Select WebP File:</strong> Click to upload or drag your WebP image directly into the conversion box above.
          </li>
          <li className="pl-2">
            <strong>Process:</strong> The converter will immediately decode the WebP file and re-encode it as a high-quality JPG.
          </li>
          <li className="pl-2">
            <strong>Download:</strong> Save the compatible JPG file to your computer or mobile device.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">WebP vs JPG: Quick Comparison</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Feature</TableHead>
                <TableHead className="font-bold">WebP</TableHead>
                <TableHead className="font-bold">JPG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Compression</TableCell>
                <TableCell>Superior (Smaller files)</TableCell>
                <TableCell>Standard (Larger files)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Compatibility</TableCell>
                <TableCell>Modern Browsers & Apps</TableCell>
                <TableCell>Universal (Everything opens it)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Supported</TableCell>
                <TableCell className="text-red-500 flex items-center gap-2"><X className="h-4 w-4" /> Not Supported</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Website Speed</TableCell>
                <TableCell>Sharing & Compatibility</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Yes. <strong>PictureConvert</strong> uses a secure, client-side processing engine. When you convert WebP to JPG, the operation is performed by your own browser's code. The image file is <strong>never transmitted over the internet</strong> to our servers. This ensures 100% privacy for your personal photos and sensitive documents—they never leave your device.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jpg-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Convert JPG to WebP
                </Link>
              </li>
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
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/webp-vs-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  WebP vs PNG: Full Comparison
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
        showQuality={false}
      />
    </ToolLayout>
  )
}
