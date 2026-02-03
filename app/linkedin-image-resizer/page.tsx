import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { LinkedinResizerTool } from "@/components/tools/linkedin-resizer-tool"
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

const tool = getToolBySlug("linkedin-image-resizer")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Page() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Professional Images Matter</h2>
        <p className="text-muted-foreground mb-4">
          On LinkedIn, your visual presence is your first impression. A blurry profile picture or a cropped-off banner can make your profile look unprofessional.
          LinkedIn has specific dimension requirements for every type of image, from company logos to shared posts.
        </p>
        <p className="text-muted-foreground mb-4">
          Our LinkedIn Image Resizer ensures your graphics are perfectly sized, so you look sharp, professional, and ready for business on any device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">LinkedIn Image Size Cheat Sheet (2025)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image Type</TableHead>
                <TableHead>Dimensions (px)</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Profile Picture</TableCell>
                <TableCell>400 x 400</TableCell>
                <TableCell>Circular crop applied automatically</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Personal Background (Banner)</TableCell>
                <TableCell>1584 x 396</TableCell>
                <TableCell>Visible area varies by device</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Company Logo</TableCell>
                <TableCell>300 x 300</TableCell>
                <TableCell>Square format</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Shared Post Image</TableCell>
                <TableCell>1200 x 627</TableCell>
                <TableCell>Standard link share size</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Article Cover</TableCell>
                <TableCell>1920 x 1080</TableCell>
                <TableCell>For LinkedIn Pulse articles</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to resize for LinkedIn</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload:</strong> Choose your professional photo or graphic.</li>
          <li><strong>Select Type:</strong> Pick a preset like "Profile Photo," "Banner," or "Post" to get the exact dimensions.</li>
          <li><strong>Adjust:</strong> Use the crop tool to center your subject. For banners, ensure key text is in the safe zone.</li>
          <li><strong>Download:</strong> Get your professionally optimized image instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Secure & Private</h2>
        <p className="text-muted-foreground mb-4">
          We respect your professional data. This tool runs <strong>100% in your browser</strong>.
        </p>
        <p className="text-muted-foreground">
          Your corporate headshots, company logos, and marketing assets are never sent to our servers. All processing is local, ensuring
          complete confidentiality and security for your business assets.
        </p>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Social Media Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/instagram-image-resizer" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Instagram Resizer
                </Link>
              </li>
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Crop Image
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Helpful Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-websites" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Format for Websites
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
      <LinkedinResizerTool toolName={tool!.name} />
    </ToolLayout>
  )
}
