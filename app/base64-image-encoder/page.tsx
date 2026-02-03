import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { Base64Tool } from "@/components/tools/base64-tool"
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

const tool = getToolBySlug("base64-image-encoder")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function Base64Page() {
  if (!tool) return null

  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is a Base64 Image Encoder?</h2>
        <p className="text-muted-foreground mb-4">
          <strong>Base64 encoding</strong> is a method of converting binary image data (like a PNG or JPG file) into a long string of text characters.
          This string can be embedded directly into HTML or CSS code using a "Data URI," eliminating the need for a separate image file request.
        </p>
        <p className="text-muted-foreground mb-4">
          A Base64 string looks like this: <code>data:image/png;base64,iVBORw0KGgo...</code>. When a browser sees this code, it renders the image immediately
          without having to fetch it from a server.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you use Base64 Images?</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Small Icons & Logos:</strong> Perfect for tiny UI elements. Embedding them reduces the number of HTTP requests your website makes, potentially speeding up initial page load.</li>
          <li><strong>Email Signatures:</strong> Many email clients block external images by default. Embedding your logo as Base64 ensures it displays immediately without the recipient having to click "Download Pictures."</li>
          <li><strong>Single-File Projects:</strong> If you are building a simple HTML page or a widget that needs to be contained in a single file, Base64 allows you to include images inline.</li>
          <li><strong>Database Storage:</strong> Sometimes it is easier to store a small user avatar as a text string in a database rather than managing a separate file storage system.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert Image to Base64 online</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li><strong>Select Image:</strong> Upload your PNG, JPG, or GIF. Keep in mind that Base64 strings are larger than binary files, so use small images.</li>
          <li><strong>Encode:</strong> The tool instantly converts the binary data into a text string.</li>
          <li><strong>Copy Code:</strong> Click to copy the generated <code>&lt;img src="..." /&gt;</code> tag or the CSS background-image code.</li>
          <li><strong>Paste:</strong> Insert the code directly into your HTML or CSS file.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Base64 vs. Image Files: Comparison</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Standard Image File</TableHead>
                <TableHead>Base64 Data URI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell className="text-green-600 font-bold">Standard</TableCell>
                <TableCell className="text-red-500 font-bold">~33% Larger</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">HTTP Requests</TableCell>
                <TableCell>1 Request per image</TableCell>
                <TableCell className="text-green-600 font-bold">0 Requests (Embedded)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Browser Caching</TableCell>
                <TableCell className="text-green-600 font-bold">Yes (Efficient)</TableCell>
                <TableCell className="text-red-500 font-bold">No (Unless inside cached CSS)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best For</TableCell>
                <TableCell>Photos, Large Graphics</TableCell>
                <TableCell>Tiny Icons, Placeholders</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="border-t pt-8 mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Optimize Before Encoding</h3>
            <p className="text-sm text-muted-foreground">Since Base64 increases file size, always compress your images first!</p>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-png" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Compress PNG
                </Link>
              </li>
              <li>
                <Link href="/resize-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Resize Image (Make it smaller)
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Web Performance</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/best-image-format-for-websites" className="text-primary hover:underline flex items-center gap-2">
                  <span className="text-muted-foreground">→</span> Best Image Formats for Web
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
      <Base64Tool toolName={tool!.name} />
    </ToolLayout>
  )
}
