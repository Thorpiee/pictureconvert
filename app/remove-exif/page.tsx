import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { ExifRemoverTool } from "@/components/tools/exif-remover-tool"
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

const tool = getToolBySlug("remove-exif")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function RemoveExifPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is EXIF Data?</h2>
        <p className="text-muted-foreground mb-4">
          EXIF (Exchangeable Image File Format) data is hidden information stored inside your photos by cameras and smartphones. This metadata
          often includes details like the date and time the photo was taken, camera settings (ISO, aperture), and most importantly,
          <strong>GPS coordinates</strong> showing exactly where you were.
        </p>
        <p className="text-muted-foreground mb-4">
          While useful for photographers, this hidden data can be a major privacy risk when sharing images online. Our EXIF remover tool
          strips away this invisible information while keeping your image quality intact.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you remove EXIF data?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Posting on Social Media:</strong> Prevent strangers from finding your home or workplace location via embedded GPS tags.</li>
          <li><strong>Sharing Privately:</strong> Send photos to friends or colleagues without revealing device details or timestamps.</li>
          <li><strong>Selling Online:</strong> Upload product photos to marketplaces like eBay or Craigslist without exposing your location.</li>
          <li><strong>Reducing File Size:</strong> EXIF data takes up space. Removing it can slightly reduce file size for faster loading.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to remove EXIF data online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload Image:</strong> Select your photo (JPG, PNG, WebP, etc.) to clean.</li>
          <li><strong>Process:</strong> The tool automatically scans and strips all metadata from the file.</li>
          <li><strong>Verify (Optional):</strong> Our tool will confirm that the metadata has been successfully removed.</li>
          <li><strong>Download:</strong> Save your clean, privacy-safe image.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What data is removed?</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data Type</TableHead>
                <TableHead>Example Content</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">GPS Location</TableCell>
                <TableCell>Latitude, Longitude (e.g., 40.7128° N, 74.0060° W)</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> Removed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Device Info</TableCell>
                <TableCell>iPhone 14 Pro, Canon EOS R5</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> Removed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Settings</TableCell>
                <TableCell>f/1.8, 1/120s, ISO 100, Flash</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> Removed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Timestamps</TableCell>
                <TableCell>2023:10:25 14:30:05</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> Removed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Visual Image</TableCell>
                <TableCell>The photo itself (Pixels)</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Kept 100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to use this tool?</h2>
        <p className="text-muted-foreground mb-4">
          Absolutely. This is a <strong>client-side tool</strong>.
        </p>
        <p className="text-muted-foreground">
          The EXIF removal process happens entirely in your browser. Your sensitive photos are never uploaded to any server, so there is zero risk
          of data interception or storage. Once you close the tab, the data is gone.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress JPG Images
                </Link>
              </li>
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image
                </Link>
              </li>
              <li>
                <Link href="/heic-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert HEIC to JPG
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Helpful Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-privacy" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Format for Privacy
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
      <ExifRemoverTool acceptedTypes={tool!.acceptedTypes} toolName={tool!.name} />
    </ToolLayout>
  )
}
