import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { JpgToPngConverterTool } from "@/components/tools/jpg-to-png-converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("jpg-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function JpgToPngPage() {
  const content = (
    <>
      <section aria-label="Guide Content" className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Tool Does</h2>
          <p className="text-muted-foreground leading-relaxed">
            This JPG to PNG converter changes a JPEG/JPG file into a PNG. The main reason to do this is workflow safety: PNG is lossless,
            so once your image is in PNG you can edit and re-export without adding another round of JPG compression artifacts.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Converting to PNG doesn’t magically “improve” a low-quality JPG. It preserves the pixels you already have, then stores them in a
            format that won’t degrade further. That makes PNG a better choice for screenshots, UI assets, diagrams, and images that contain
            crisp edges or text.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">When to Use It</h2>
          <p className="text-muted-foreground leading-relaxed">
            Use JPG to PNG when you plan to edit an image multiple times, when you need cleaner edges around text, or when a platform asks
            for a PNG upload (common for app stores, design tools, and some CMS fields).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            It’s also useful when you’re preparing a photo for layout work. After converting, you can crop precisely with Crop Image or resize to exact dimensions with Resize Image.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Format Tips</h2>
          <p className="text-muted-foreground leading-relaxed">
            PNG is great for sharp details and lossless editing, but it’s usually larger than JPG. If your goal is smaller file size for the web,
            converting PNG back to JPG with PNG to JPG is often the better final step. For a modern alternative, WebP can be smaller than both in many cases.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Issues</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong>Transparency expectations:</strong> PNG supports transparency, but converting a JPG won’t create a transparent background automatically.</li>
            <li><strong>File size jump:</strong> PNG files can be much larger than JPG, especially for photographs.</li>
            <li><strong>Quality misconceptions:</strong> PNG preserves existing detail; it can’t recover detail lost to JPG compression.</li>
            <li><strong>Metadata:</strong> If you’re sharing images publicly, strip location/camera metadata with Remove EXIF.</li>
            <li><strong>Color shifts:</strong> Some viewers treat color profiles differently; compare exports in the same app.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
          <p className="text-muted-foreground leading-relaxed">
            For the reverse workflow, use <Link href="/png-to-jpg" className="text-primary hover:underline font-medium">PNG to JPG</Link>.
            If you’re preparing an image for posting or design layout, follow up with{" "}
            <Link href="/crop-image" className="text-primary hover:underline font-medium">Crop Image</Link> and{" "}
            <Link href="/resize-image" className="text-primary hover:underline font-medium">Resize Image</Link>.
            For privacy-sensitive images, run <Link href="/remove-exif" className="text-primary hover:underline font-medium">Remove EXIF</Link> before sharing.
          </p>
        </section>
      </section>
    </>
  )

  return (
    <ToolLayout tool={tool!} extraContent={content}>
      <JpgToPngConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
