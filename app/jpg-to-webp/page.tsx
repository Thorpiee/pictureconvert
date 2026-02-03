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

const tool = getToolBySlug("jpg-to-webp")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function JpgToWebpPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is JPG to WebP conversion?</h2>
        <p className="text-muted-foreground mb-4">
          JPG to WebP conversion is the process of transforming traditional JPEG images into the modern WebP format.
          WebP is a next-generation image format developed by Google that provides superior compression for images on the web.
        </p>
        <p className="text-muted-foreground mb-4">
          Webmasters and developers convert JPG to WebP to significantly reduce image file sizes—often by 25-34%—without
          sacrificing visible quality. This makes websites load faster, improves SEO scores, and uses less bandwidth for visitors.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert JPG to WebP?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Website Optimization:</strong> When you want to improve your Google PageSpeed Insights score and Core Web Vitals.</li>
          <li><strong>Faster Loading:</strong> To ensure your images load instantly on mobile networks and slow connections.</li>
          <li><strong>Saving Storage:</strong> When you need to store thousands of product images or thumbnails and want to reduce server costs.</li>
          <li><strong>Modern Compatibility:</strong> WebP is now supported by all modern browsers, making it the standard choice for web images.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert JPG to WebP online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload your JPG:</strong> Drag and drop your image file into the PictureConvert tool above.</li>
          <li><strong>Adjust Settings (Optional):</strong> Select your desired quality level. Lower quality yields smaller files.</li>
          <li><strong>Convert:</strong> The tool will instantly change picture format from JPG to WebP.</li>
          <li><strong>Download:</strong> Save your optimized WebP image ready for your website.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">JPG vs WebP (Quick comparison)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>JPG (JPEG)</TableHead>
                <TableHead>WebP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Large</TableCell>
                <TableCell className="text-green-600 font-bold">Small (25-35% smaller)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Compression Efficiency</TableCell>
                <TableCell>Good</TableCell>
                <TableCell className="text-green-600 font-bold">Superior</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell><X className="h-4 w-4 text-red-500" /></TableCell>
                <TableCell><Check className="h-4 w-4 text-green-500" /></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Legacy Support, Photography</TableCell>
                <TableCell>Websites, Apps, Performance</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground mb-4">
          Yes, it is completely safe with PictureConvert. We prioritize your privacy by processing all images directly in your web browser.
        </p>
        <p className="text-muted-foreground">
          Unlike other online image converters that upload your photos to a remote server, our tool works locally on your device.
          Your images never leave your computer or phone, ensuring that your personal photos and data remain private and secure.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Popular Converters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/webp-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert WebP to JPG
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG Images
                </Link>
              </li>
              <li>
                <Link href="/website-optimizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Website Image Optimizer
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Learn More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-websites" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Image Format for Websites
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
