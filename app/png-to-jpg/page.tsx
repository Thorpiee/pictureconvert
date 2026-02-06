import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("png-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function PngToJpgPage() {
  const content = (
    <>
      <section aria-label="Guide Content" className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Tool Does</h2>
          <p className="text-muted-foreground leading-relaxed">
            This PNG to JPG converter turns a PNG image into a JPEG file you can share, upload, or publish more easily. PNG is a
            lossless format, so it tends to be bigger than it needs to be for photos. JPG uses lossy compression, which usually makes
            photo-heavy images dramatically smaller while still looking “good enough” for the web.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The key trade-off is that JPG doesn’t support transparency. If your PNG has a transparent background (common with logos and
            UI assets), converting to JPG will flatten it onto a solid background. For photographs, screenshots without transparency, and
            scanned documents, converting to JPG is often the fastest way to reduce file size.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">When to Use It</h2>
          <p className="text-muted-foreground leading-relaxed">
            Use PNG to JPG when you’re dealing with large PNG files and you care more about download speed than perfect pixel fidelity.
            Typical scenarios include product photos, blog images, email attachments, and photo galleries where a smaller file helps pages
            load faster.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you’re converting a graphic with sharp edges (icons, line art, text overlays), test a higher quality setting first. JPG
            compression can introduce small artifacts around high-contrast edges that are more noticeable on graphics than on photos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Format Tips</h2>
          <p className="text-muted-foreground leading-relaxed">
            PNG is best for transparency and crisp UI elements. JPG is best for photographs and complex gradients. If you want a modern
            web format that can be smaller than JPG while staying sharp, consider converting PNG to WebP using PNG to WebP.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you need the reverse conversion (for example, to keep a flat background but avoid repeated JPG re-saves), try JPG to PNG.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Issues</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong>Transparency:</strong> Transparent PNG areas become a solid background in JPG.</li>
            <li><strong>Quality loss:</strong> Very low quality can create blocky artifacts and “halo” edges around text.</li>
            <li><strong>File size surprises:</strong> Converting a simple flat-color graphic may not shrink much (PNG can already be efficient).</li>
            <li><strong>Metadata:</strong> Some images carry EXIF data; remove it before sharing if privacy matters.</li>
            <li><strong>Color shifts:</strong> Different color profiles can look slightly different after export; compare in the same viewer.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you need a smaller modern web format, use <Link href="/png-to-webp" className="text-primary hover:underline font-medium">PNG to WebP</Link>.
            If you’re editing and want lossless saves, switch back with <Link href="/jpg-to-png" className="text-primary hover:underline font-medium">JPG to PNG</Link>.
            For faster pages, finish by running <Link href="/compress-jpg" className="text-primary hover:underline font-medium">Compress JPG</Link> or adjusting dimensions in{" "}
            <Link href="/resize-image" className="text-primary hover:underline font-medium">Resize Image</Link>.
          </p>
        </section>
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
