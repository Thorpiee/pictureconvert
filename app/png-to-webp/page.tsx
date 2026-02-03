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

const tool = getToolBySlug("png-to-webp")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function PngToWebpPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is PNG to WebP conversion?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong>PNG to WebP</strong> conversion is the process of upgrading your images from the traditional PNG format to Google's modern WebP format. WebP is designed specifically for the modern web, offering superior compression technology that makes images significantly lighter without sacrificing visual quality.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Like PNG, WebP fully supports transparency (alpha channel), making it the perfect replacement for logos, icons, and product images. The key difference is that WebP files are much smaller, helping websites load faster and perform better in search rankings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert PNG to WebP?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You should switch from PNG to WebP whenever website performance and user experience are priorities:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Faster Page Loads:</strong> WebP images are typically 26% smaller than PNGs. This means your website loads faster, which keeps visitors happy and reduces bounce rates.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Better SEO:</strong> Google considers page speed a critical ranking factor. Using WebP can help improve your Core Web Vitals scores and search visibility.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Bandwidth Savings:</strong> Smaller files mean less data transfer, which is crucial for mobile users on limited data plans and for reducing your hosting costs.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>App Development:</strong> Mobile apps use WebP to reduce the overall download size of the application, saving space on users' phones.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Transparent Graphics:</strong> If you have a heavy PNG with a transparent background, converting to WebP keeps the transparency but drastically cuts the file size.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert PNG to WebP online</h2>
        <ol className="space-y-4 text-muted-foreground list-decimal pl-5">
          <li className="pl-2">
            <strong>Upload PNG:</strong> Select your PNG image or drag it directly into the upload zone above.
          </li>
          <li className="pl-2">
            <strong>Convert:</strong> The tool processes the image instantly. You can adjust quality settings to choose between maximum compression or maximum quality.
          </li>
          <li className="pl-2">
            <strong>Download:</strong> Save your optimized WebP file ready for immediate use on your website.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">PNG vs WebP: Quick Comparison</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Feature</TableHead>
                <TableHead className="font-bold">PNG</TableHead>
                <TableHead className="font-bold">WebP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Large</TableCell>
                <TableCell>Small (Up to 30% smaller)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Compression</TableCell>
                <TableCell>Lossless Only</TableCell>
                <TableCell>Lossless & Lossy</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Supported</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Supported</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Editing & Archives</TableCell>
                <TableCell>Website Performance</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Absolutely. <strong>PictureConvert</strong> operates with a "privacy-first" architecture. The conversion from PNG to WebP happens <strong>100% within your browser</strong>. We do not upload your files to any cloud server, meaning your images remain private and secure on your own device throughout the entire process.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/webp-to-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Convert WebP to PNG
                </Link>
              </li>
              <li>
                <Link href="/website-optimizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Website Image Optimizer
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
        showQuality
      />
    </ToolLayout>
  )
}
