import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("webp-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function WebpToPngPage() {
  const content = (
    <>
      <section aria-label="Guide Content" className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Tool Does</h2>
          <p className="text-muted-foreground leading-relaxed">
            This WebP to PNG converter takes a .webp image and exports it as a PNG. WebP is common on modern websites because it can be
            small and fast to load. PNG is a widely supported, lossless format that’s easier to work with in a broader set of apps and
            workflows, especially when you need consistent results across devices.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Converting to PNG is most useful when you’re editing, repurposing, or uploading an image somewhere that expects PNG. PNG also
            supports transparency, which makes it a safer target when you’re working with icons, stickers, or design elements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">When to Use It</h2>
          <p className="text-muted-foreground leading-relaxed">
            Use WebP to PNG when a website download gives you a WebP file but your editor or workflow prefers PNG, or when a platform
            rejects WebP uploads. It’s also handy for quickly extracting a PNG version for design comps, documentation, or product listings
            where you want stable rendering.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If your goal is simply to make a WebP usable in more places (without needing transparency), converting to JPG can be a better
            size/compatibility trade-off. In that case, try WebP to JPG.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Format Tips</h2>
          <p className="text-muted-foreground leading-relaxed">
            PNG is lossless and great for sharp edges and transparency, but it can be larger than WebP. If you’re converting for editing and
            then publishing back to the web, you may want to finish by converting the PNG back to WebP using PNG to WebP to keep pages fast.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For large PNG exports, reduce byte size after conversion with Compress PNG.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Issues</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong>File size increase:</strong> PNG exports can be bigger than the original WebP, especially for photos.</li>
            <li><strong>Transparency expectations:</strong> Transparency is preserved when it exists, but not all WebP images actually have an alpha channel.</li>
            <li><strong>Quality assumptions:</strong> PNG won’t “improve” a heavily compressed source; it prevents additional loss during further edits.</li>
            <li><strong>Metadata:</strong> Some images include metadata; remove it before sharing if privacy matters.</li>
            <li><strong>Color shifts:</strong> Different color profiles can look slightly different in different viewers; compare before/after in the same app.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
          <p className="text-muted-foreground leading-relaxed">
            Convert back for web delivery with <Link href="/png-to-webp" className="text-primary hover:underline font-medium">PNG to WebP</Link>, or
            switch to a photo-friendly format using <Link href="/webp-to-jpg" className="text-primary hover:underline font-medium">WebP to JPG</Link>.
            If your new PNG is too large, run <Link href="/compress-png" className="text-primary hover:underline font-medium">Compress PNG</Link>, and
            if you need exact pixel dimensions, use <Link href="/resize-image" className="text-primary hover:underline font-medium">Resize Image</Link>.
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
      />
    </ToolLayout>
  )
}
