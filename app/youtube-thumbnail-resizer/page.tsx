import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { YoutubeResizerTool } from "@/components/tools/youtube-resizer-tool"
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

const tool = getToolBySlug("youtube-thumbnail-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function YoutubeResizerPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">YouTube Thumbnail Resizer</h2>
        <p className="text-muted-foreground mb-4">
          A captivating thumbnail is the single most important factor in getting clicks on YouTube. However, YouTube has strict requirements: your thumbnail must be
          exactly <strong>1280 x 720 pixels</strong>, have a <strong>16:9 aspect ratio</strong>, and remain under <strong>2MB</strong> in size.
        </p>
        <p className="text-muted-foreground mb-4">
          Our <strong>YouTube Thumbnail Resizer</strong> ensures your custom graphics fit these specs perfectly. Whether you are uploading a screenshot, a photo, or a complex design, our tool automatically adjusts the dimensions to meet YouTube's standards, preventing upload errors and ensuring your image looks crisp on everything from mobile phones to 4K TVs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">YouTube Thumbnail Specs (2025)</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Resolution:</strong> 1280 x 720 pixels (Minimum width 640 pixels).</li>
          <li><strong>Aspect Ratio:</strong> 16:9 (Standard widescreen).</li>
          <li><strong>File Size:</strong> Maximum 2MB.</li>
          <li><strong>Format:</strong> JPG, GIF, BMP, or PNG.</li>
          <li><strong>Color Model:</strong> RGB (CMYK may cause color distortion).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to create a perfect thumbnail</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Choose your image. It can be a screenshot, a photo, or a design.</li>
          <li><strong>Crop:</strong> Use our tool to select the best 16:9 area of your image. Focus on faces and large text.</li>
          <li><strong>Resize:</strong> We automatically force the output to 1280x720 pixels, ensuring it fills the player frame.</li>
          <li><strong>Download:</strong> Save the file. If it's over 2MB, use our <Link href="/compress-jpg" className="text-primary hover:underline">Compressor</Link> to fix it.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Why Size Matters: YouTube vs Standard</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Feature</TableHead>
                <TableHead className="font-bold">Standard Image</TableHead>
                <TableHead className="font-bold">YouTube Optimized</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Dimensions</TableCell>
                <TableCell>Random / Camera Size</TableCell>
                <TableCell>Exact 1280x720 (16:9)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Often 5MB+</TableCell>
                <TableCell className="text-green-600 font-medium">Under 2MB (Required)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Player Fit</TableCell>
                <TableCell className="text-red-500 flex items-center gap-2"><X className="h-4 w-4" /> Black Bars</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Perfect Fill</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Visibility</TableCell>
                <TableCell>May be cropped awkwardly</TableCell>
                <TableCell>Centered & Clear</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to resize images online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong>Yes, 100%.</strong> Our YouTube Thumbnail Resizer runs entirely in your web browser. Unlike other tools that upload your images to a remote server, we process your files locally on your device. This means your thumbnail designs, which might contain sensitive content or embargoed information, never leave your computer. You get the speed of a web tool with the privacy of offline software.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools for Creators</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Fix File Issues</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG (If thumbnail is &gt; 2MB)
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert JPG to PNG (Better quality)
                </Link>
              </li>
              <li>
                <Link href="/png-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert PNG to JPG (Smaller size)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Other Social Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tiktok-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> TikTok Resizer (9:16)
                </Link>
              </li>
              <li>
                <Link href="/twitter-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Twitter Header Resizer
                </Link>
              </li>
              <li>
                <Link href="/aspect-ratio-converter" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Check Aspect Ratio
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
      <YoutubeResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
