import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { FaviconGeneratorTool } from "@/components/tools/favicon-generator-tool"
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

const tool = getToolBySlug("png-to-ico")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function FaviconGeneratorPage() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is a PNG to ICO converter?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>ICO</strong> (Icon) files are special image containers used by web browsers to display a website's "favicon"—the small icon you see in browser tabs,
          bookmarks, and shortcuts. Unlike standard images, ICO files can store multiple sizes (e.g., 16x16, 32x32, 48x48) in a single file.
        </p>
        <p className="text-muted-foreground mb-4">
          Converting <strong>PNG to ICO</strong> is essential for web developers and site owners. It takes your high-quality logo or graphic and packages it into the
          correct format that browsers expect, ensuring your brand looks sharp on every device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Why do I need an ICO file?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Browser Tabs:</strong> The tiny icon next to your page title is an .ico file.</li>
          <li><strong>Bookmarks:</strong> When users bookmark your site, the favicon helps them identify it quickly.</li>
          <li><strong>Desktop Shortcuts:</strong> Saving a website to a desktop creates a shortcut using the favicon.</li>
          <li><strong>Professionalism:</strong> A custom favicon is a standard requirement for any polished, professional website.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to create a Favicon online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Upload Image:</strong> Select your logo (PNG or JPG recommended). A square image works best.</li>
          <li><strong>Preview:</strong> See how your icon will look in a browser tab.</li>
          <li><strong>Convert:</strong> The tool automatically generates the .ico file with standard sizes (16x16, 32x32).</li>
          <li><strong>Download:</strong> Save the `favicon.ico` file and upload it to your website's root directory.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">PNG vs. ICO: What's the difference?</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>PNG</TableHead>
                <TableHead>ICO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Primary Use</TableCell>
                <TableCell>Web graphics, logos, photos</TableCell>
                <TableCell className="text-blue-600 font-bold">Browser Favicons</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Multi-size Support</TableCell>
                <TableCell className="text-red-500 font-bold flex items-center gap-2"><X className="h-4 w-4" /> No (One size only)</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes (16px, 32px, etc.)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes</TableCell>
                <TableCell className="text-green-600 font-bold flex items-center gap-2"><Check className="h-4 w-4" /> Yes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Image Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image (Make it square)
                </Link>
              </li>
              <li>
                <Link href="/png-to-webp" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Convert PNG to WebP
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
      <FaviconGeneratorTool toolName={tool!.name} />
    </ToolLayout>
  )
}
