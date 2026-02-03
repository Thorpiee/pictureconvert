import { Metadata } from "next"
import Link from "next/link"
import { ExifViewerTool } from "@/components/tools/exif-viewer-tool"
import { getToolBySlug } from "@/lib/tools-config"
import { ToolLayout } from "@/components/tool-layout"
import { generateToolMetadata } from "@/lib/seo-utils"
import { notFound } from "next/navigation"
import { Check, X } from "lucide-react"

const tool = getToolBySlug("exif-viewer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function ExifViewerPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is EXIF Data?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>EXIF</strong> (Exchangeable Image File Format) is hidden metadata stored inside your image files. Whenever you take a photo with a digital camera or smartphone,
          the device automatically records details about how the image was captured.
        </p>
        <p className="text-muted-foreground mb-4">
          This data can include the <strong>Camera Model</strong>, <strong>Shutter Speed</strong>, <strong>Aperture (F-stop)</strong>, <strong>ISO</strong>,
          <strong>Date & Time</strong>, and even the precise <strong>GPS Coordinates</strong> of where the photo was taken.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why use an EXIF Viewer?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>For Photographers:</strong> Analyze your settings to learn what worked. See the exact exposure settings (ISO, Aperture, Shutter) used for a specific shot.</li>
          <li><strong>For Privacy:</strong> Check if your photos contain hidden GPS location data before you share them on social media or upload them to public websites.</li>
          <li><strong>For Organization:</strong> Verify the original creation date of an image if the file timestamp has been modified.</li>
          <li><strong>For Debugging:</strong> Confirm technical details like color space, lens model, and software used for editing.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to view EXIF data online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload Photo:</strong> Select a JPG, PNG, or TIFF image from your device.</li>
          <li><strong>Analyze:</strong> The tool instantly reads the file header to extract metadata.</li>
          <li><strong>View Data:</strong> Scroll through the detailed list of tags, including Camera, Lens, Location, and Date.</li>
          <li><strong>Protect:</strong> If you find sensitive data (like GPS), use our <Link href="/remove-exif" className="text-primary hover:underline">EXIF Remover</Link> to clean the file.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to view EXIF data here?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>Yes, absolutely.</strong> Our EXIF Viewer runs entirely in your browser. Your photos are <strong>never uploaded to our servers</strong>.
          The analysis happens locally on your device, ensuring that your personal data and location information remain private.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Privacy</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Privacy Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/remove-exif" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Remove EXIF Data (Clean your photos)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Image Editing</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image
                </Link>
              </li>
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Crop Image
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
      <ExifViewerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
