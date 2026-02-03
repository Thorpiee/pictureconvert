import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { SmartOptimizerTool } from "@/components/tools/smart-optimizer-tool"
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

const tool = getToolBySlug("smart-optimizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function SmartOptimizerPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Smart Image Optimizer</h2>
        <p className="text-muted-foreground mb-4">
          Finding the perfect balance between file size and image quality can be tricky. Compress too much, and your image looks pixelated.
          Compress too little, and your website loads slowly.
        </p>
        <p className="text-muted-foreground mb-4">
          Our <strong>Smart Image Optimizer</strong> uses intelligent algorithms to analyze your image and apply the optimal level of compression.
          It reduces file size significantly (often by 70-80%) while keeping the visual quality high enough for professional use.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How it works</h2>
        <p className="text-muted-foreground mb-4">
          Unlike standard compressors that apply a fixed percentage reduction, our Smart Optimizer:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Analyzes:</strong> Scans the image for colors, patterns, and complexity.</li>
          <li><strong>Adjusts:</strong> Determines how much data can be removed without the human eye noticing.</li>
          <li><strong>Compresses:</strong> Applies the calculated compression profile.</li>
          <li><strong>Result:</strong> An image that looks identical to the original but is much lighter.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When to use Smart Optimization?</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[200px] font-bold">Scenario</TableHead>
                <TableHead className="font-bold">Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Websites & Blogs</TableCell>
                <TableCell className="text-green-600 font-medium flex items-center gap-2"><Check className="h-4 w-4" /> Highly Recommended</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Email Attachments</TableCell>
                <TableCell className="text-green-600 font-medium flex items-center gap-2"><Check className="h-4 w-4" /> Recommended</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Social Media Posts</TableCell>
                <TableCell className="text-green-600 font-medium flex items-center gap-2"><Check className="h-4 w-4" /> Recommended</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Professional Printing</TableCell>
                <TableCell className="text-yellow-600 flex items-center gap-2"><X className="h-4 w-4" /> Use Original (Lossless)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to optimize images here?</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Absolutely.</strong> Our Smart Optimizer processes your images directly in your browser. We do not upload your files to any cloud server for processing. This means your photos remain on your device at all times, ensuring complete privacy and security for your personal or business assets.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">More Optimization Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Specific Formats</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG
                </Link>
              </li>
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert to WebP (Best for Web)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Batch Processing</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bulk-compressor" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Bulk Compressor (Many files at once)
                </Link>
              </li>
              <li>
                <Link href="/website-optimizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Website Optimizer
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
      <SmartOptimizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
