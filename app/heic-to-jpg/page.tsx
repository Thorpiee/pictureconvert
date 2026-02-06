import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ConverterTool } from "@/components/tools/converter-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("heic-to-jpg")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function HeicToJpgPage() {
  const content = (
    <>
      <section aria-label="Guide Content" className="space-y-10">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">What This Tool Does</h2>
          <p className="text-muted-foreground leading-relaxed">
            This HEIC to JPG converter turns iPhone-style .heic photos into standard JPG files. HEIC is efficient and looks great on Apple
            devices, but it can fail on older Windows installs, some Android apps, and many upload forms. Converting to JPG is the quickest
            way to make an iPhone photo “just work” everywhere.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            JPG is a universal photo format supported by browsers, email clients, printers, and most editing tools. Once you convert, you can
            share photos, attach them to tickets, upload to websites, or drop them into documents without worrying about HEIC compatibility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">When to Use It</h2>
          <p className="text-muted-foreground leading-relaxed">
            Use HEIC to JPG when you’re sending photos to someone on Windows, submitting an image to a website that rejects HEIC, or preparing
            pictures for printing services that expect JPEG/JPG. It’s also useful when a third‑party editor won’t open HEIC reliably.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            After converting, it’s common to reduce the file size for web or email. For that, run Compress JPG, or
            resize first using Resize Image if you only need a smaller resolution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Format Tips</h2>
          <p className="text-muted-foreground leading-relaxed">
            HEIC often packs more information into a smaller file than JPG, especially on newer iPhones. When you convert, you’re prioritizing
            compatibility over maximum efficiency. If you need lossless edits or transparency, JPG isn’t the right target—PNG is. In that case,
            convert to JPG first for compatibility, then use JPG to PNG for a lossless editing workflow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Common Issues</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li><strong>Orientation problems:</strong> Some apps rely on rotation metadata; if a photo looks rotated, re-open it in a modern viewer and export again.</li>
            <li><strong>Quality vs size:</strong> Higher quality preserves detail but increases file size—compress afterward if needed.</li>
            <li><strong>Metadata privacy:</strong> Photos may include GPS/camera data; remove it with Remove EXIF before sharing.</li>
            <li><strong>Color shifts:</strong> HDR/advanced color from HEIC can look different after conversion depending on the viewer.</li>
            <li><strong>Large uploads:</strong> If an upload form has strict limits, resize first, then compress.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
          <p className="text-muted-foreground leading-relaxed">
            For faster uploads, run <Link href="/compress-jpg" className="text-primary hover:underline font-medium">Compress JPG</Link>.
            To match exact size requirements, use <Link href="/resize-image" className="text-primary hover:underline font-medium">Resize Image</Link>.
            If you need a lossless editing format after converting, use <Link href="/jpg-to-png" className="text-primary hover:underline font-medium">JPG to PNG</Link>, and for privacy cleanup, use{" "}
            <Link href="/remove-exif" className="text-primary hover:underline font-medium">Remove EXIF</Link>.
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
