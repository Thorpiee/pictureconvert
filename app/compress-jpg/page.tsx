import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { CompressorTool } from "@/components/tools/compressor-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("compress-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function CompressJpgPage() {
  if (!tool) return null

  const content = (
    <>
      <section aria-label="Guide Content" className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Tool Does</h2>
          <p className="text-muted-foreground leading-relaxed">
            This tool compresses JPG images to reduce file size while keeping the picture visually close to the original. JPG is already a
            compressed photo format, but camera exports and “high quality” saves can still be heavier than they need to be for websites,
            emails, and messaging apps.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A good JPG compressor lets you choose a quality level so you can hit practical limits (like upload caps) without introducing
            obvious artifacts. The best results come from compressing once, then reusing the compressed output rather than repeatedly
            re-saving the same image.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">When to Use It</h2>
          <p className="text-muted-foreground leading-relaxed">
            Compress a JPG when a page feels slow because of large photos, when an upload form has a strict size limit, or when you’re
            sending images over email/mobile and want faster downloads. If you’re publishing a gallery or product images, compressing helps
            reduce bandwidth and improves load performance.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If your JPG is also oversized in dimensions (for example, 6000px wide for a 1200px layout), resize first using Resize Image, then compress. That usually produces a
            much smaller file with fewer artifacts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Format Tips</h2>
          <p className="text-muted-foreground leading-relaxed">
            JPG is best for photos and gradients. PNG is better for sharp UI assets and transparency, but it can be much larger. If your end
            goal is “smallest possible for the web,” converting JPG to WebP can beat JPG compression in many cases—use JPG to WebP after you’ve confirmed the image is final.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Issues</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong>Quality loss:</strong> Over-compressing can cause blockiness, banding in gradients, and smeared fine detail.</li>
            <li><strong>Double compression:</strong> Compressing an already-compressed JPG can compound artifacts; try a lighter setting.</li>
            <li><strong>File size not shrinking much:</strong> Some images are already optimized; resize dimensions for bigger wins.</li>
            <li><strong>Metadata:</strong> JPGs may retain EXIF data; remove it before sharing if privacy matters.</li>
            <li><strong>Color shifts:</strong> Different apps handle profiles differently—compare in the same browser/viewer.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
          <p className="text-muted-foreground leading-relaxed">
            If your images are the wrong dimensions, use <Link href="/resize-image" className="text-primary hover:underline font-medium">Resize Image</Link> first.
            For a modern web format, try <Link href="/jpg-to-webp" className="text-primary hover:underline font-medium">JPG to WebP</Link>.
            If you’re compressing many files, use <Link href="/bulk-compressor" className="text-primary hover:underline font-medium">Bulk Image Compressor</Link>,
            and if you’re optimizing PNG assets instead, use <Link href="/compress-png" className="text-primary hover:underline font-medium">Compress PNG</Link>.
          </p>
        </section>
      </section>
    </>
  )

  return (
    <ToolLayout tool={tool!} extraContent={content}>
      <CompressorTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
