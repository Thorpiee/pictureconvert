import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ExactPixelResizerTool } from "@/components/tools/exact-pixel-resizer-tool"
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

const tool = getToolBySlug("resize-image-to-exact-pixels")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Resize Image to Exact Pixels</h2>
        <p className="text-muted-foreground mb-4">
          Sometimes, "about 50% smaller" isn't precise enough. When you are building a website, creating an app icon, or designing a banner ad, you need
          <strong>exact dimensions</strong> down to the last pixel.
        </p>
        <p className="text-muted-foreground mb-4">
          Our <strong>Exact Pixel Resizer</strong> gives you total control. Simply enter your target Width and Height values (e.g., 300x250, 800x600), and we will
          scale your image to match perfectly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Common Exact Dimensions</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>App Icons:</strong> 1024x1024 (iOS), 512x512 (Google Play).</li>
          <li><strong>Web Banners:</strong> 728x90 (Leaderboard), 300x250 (Medium Rectangle).</li>
          <li><strong>Favicons:</strong> 32x32, 16x16 (ICO/PNG).</li>
          <li><strong>Social Covers:</strong> 1500x500 (Twitter), 820x312 (Facebook).</li>
          <li><strong>YouTube Thumbnails:</strong> 1280x720.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to resize to specific dimensions</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Drag your image into the box.</li>
          <li><strong>Set Dimensions:</strong> Type your desired Width and Height in pixels.</li>
          <li><strong>Lock Aspect Ratio:</strong> (Optional) Check the box to keep the image from looking squashed or stretched. If unchecked, the image will stretch to fit your exact numbers.</li>
          <li><strong>Resize & Download:</strong> Get your perfectly sized image instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Exact vs Standard Resizing</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Feature</TableHead>
                <TableHead className="font-bold">Standard Resizer</TableHead>
                <TableHead className="font-bold">Exact Pixel Resizer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Method</TableCell>
                <TableCell>Percentage (50%, 75%)</TableCell>
                <TableCell>Pixel Count (e.g., 500px)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Precision</TableCell>
                <TableCell>Approximate</TableCell>
                <TableCell className="text-green-600 font-medium flex items-center gap-2"><Check className="h-4 w-4" /> Pixel-Perfect</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Aspect Ratio</TableCell>
                <TableCell>Always Locked</TableCell>
                <TableCell>Optional (Unlock to stretch)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Saving Space</TableCell>
                <TableCell>Web Design, Ads, Apps</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe?</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Yes.</strong> Like all our tools, the Exact Pixel Resizer runs locally in your browser. Your images are never sent to a server. This is especially important if you are resizing sensitive design assets or client materials—they stay on your computer.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Precision Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resizing & Cropping</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Standard Resizer (Easier for % scaling)
                </Link>
              </li>
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Crop Image (Select a specific part)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Format Conversion</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/png-to-ico" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Create Favicon (ICO)
                </Link>
              </li>
              <li>
                <Link href="/aspect-ratio-converter" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Aspect Ratio Calculator
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
      <ExactPixelResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
