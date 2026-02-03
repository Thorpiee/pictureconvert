import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { TiktokResizerTool } from "@/components/tools/tiktok-resizer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { notFound } from "next/navigation"

const tool = getToolBySlug("tiktok-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">TikTok Image Resizer</h2>
        <p className="text-muted-foreground mb-4">
          TikTok is a full-screen mobile experience. To get the best engagement, your content needs to fill the entire phone screen.
          Our <strong>TikTok Image Resizer</strong> automatically crops and resizes your photos to the perfect <strong>9:16 aspect ratio</strong>,
          ensuring they look professional and high-quality on every device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Best Image Size for TikTok (2025)</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>TikTok Video / Photo Mode:</strong> 1080 x 1920 pixels (9:16 ratio).</li>
          <li><strong>Profile Picture:</strong> 200 x 200 pixels (1:1 ratio).</li>
          <li><strong>Ads:</strong> 720 x 1280 pixels or greater.</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Using the wrong size (like a landscape 16:9 image) will result in ugly black bars above and below your content, or important parts being cropped out.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to resize images for TikTok</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Select your photo or graphic.</li>
          <li><strong>Auto-Crop:</strong> The tool automatically sets the crop area to 9:16. You can move and scale the selection to frame your subject perfectly.</li>
          <li><strong>Resize:</strong> We automatically scale the output to 1080x1920 pixels, the native resolution for TikTok.</li>
          <li><strong>Download:</strong> Save the optimized image and upload it directly to TikTok Photo Mode or use it in your video edits.</li>
        </ol>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">More Social Media Tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Platform Resizers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/instagram-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Instagram Resizer
                </Link>
              </li>
              <li>
                <Link href="/twitter-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Twitter / X Resizer
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Editing Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Free Crop Tool
                </Link>
              </li>
              <li>
                <Link href="/base64-image-encoder" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Base64 Encoder
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
      <TiktokResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
