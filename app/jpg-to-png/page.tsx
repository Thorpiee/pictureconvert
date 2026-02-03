import { Metadata } from "next"
import Link from "next/link"
import { generateToolMetadata } from "@/lib/seo-utils"
import { ToolLayout } from "@/components/tool-layout"
import { JpgToPngConverterTool } from "@/components/tools/jpg-to-png-converter-tool"
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

const tool = getToolBySlug("jpg-to-png")

if (!tool) {
  notFound()
}

export const metadata: Metadata = generateToolMetadata(tool!)

export default function JpgToPngPage() {
  const content = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">What is JPG to PNG conversion?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Converting <strong>JPG</strong> to <strong>PNG</strong> transforms a compressed photo format into a high-quality, lossless format that supports transparency. JPGs are great for keeping file sizes small, but they suffer from "generation loss"—meaning they lose quality every time you edit and re-save them. They also do not support transparent backgrounds, which can be limiting for design work.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          <strong>PNG</strong> (Portable Network Graphics) is a lossless format, meaning it preserves every single pixel exactly as it is. When you convert a JPG to PNG, you stop any further quality loss. This makes it the preferred choice for editing, adding transparent backgrounds, or preserving text and sharp lines in graphics.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">When should you convert JPG to PNG?</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          You should change your image format from JPG to PNG when quality and editing flexibility are more important than file size:
        </p>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Need Transparency:</strong> If you want to remove the background from a logo or product photo, you must convert it to PNG first, as JPG does not support transparency (it will simply display white).</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Editing & Design:</strong> If you plan to edit an image repeatedly, converting to PNG prevents the quality degradation that happens with JPG compression.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Text & Graphics:</strong> Images with text, charts, or sharp lines look much crisper in PNG format. JPG compression often adds "noise" or artifacts around text.</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-foreground">•</span>
            <span><strong>Logo Work:</strong> Essential for brand assets that need to be placed over different colored backgrounds or watermarks.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How to convert JPG to PNG online</h2>
        <ol className="space-y-4 text-muted-foreground list-decimal pl-5">
          <li className="pl-2">
            <strong>Upload your JPG:</strong> Drag and drop your JPG/JPEG files into the tool above or click to select them from your device.
          </li>
          <li className="pl-2">
            <strong>Conversion:</strong> The tool automatically processes your image. Since PNG is lossless, the conversion focuses on preserving exact pixel data.
          </li>
          <li className="pl-2">
            <strong>Download:</strong> Save your new PNG file. Note that the file size will likely be larger than the original JPG because of the higher quality retention.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">JPG vs PNG: Quick Comparison</h2>
        <div className="border rounded-xl overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[150px] font-bold">Feature</TableHead>
                <TableHead className="font-bold">JPG</TableHead>
                <TableHead className="font-bold">PNG</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Quality</TableCell>
                <TableCell>Lossy (Good for photos)</TableCell>
                <TableCell>Lossless (Perfect fidelity)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Transparency</TableCell>
                <TableCell className="text-red-500 flex items-center gap-2"><X className="h-4 w-4" /> Not Supported</TableCell>
                <TableCell className="text-green-600 flex items-center gap-2"><Check className="h-4 w-4" /> Supported</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Size</TableCell>
                <TableCell>Small</TableCell>
                <TableCell>Large (Can be 5-10x larger)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Best Use Case</TableCell>
                <TableCell>Sharing Photos, Web</TableCell>
                <TableCell>Editing, Logos, Text, Graphics</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Is it safe to convert images online?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Using <strong>PictureConvert</strong> is 100% secure. We utilize advanced client-side technology, which means the conversion from JPG to PNG happens entirely within your web browser. Your images are <strong>never uploaded to our servers</strong>, never stored, and never seen by anyone else. You can convert sensitive documents, personal photos, or client work with complete peace of mind knowing your data stays on your device.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/remove-exif" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Remove EXIF Data
                </Link>
              </li>
              <li>
                <Link href="/crop-image" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Crop Image
                </Link>
              </li>
              <li>
                <Link href="/png-to-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Convert PNG to JPG
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Related Guides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/image-formats/png-vs-jpg" className="text-primary hover:underline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  PNG vs JPG: Which is Best?
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
      <JpgToPngConverterTool toolName={tool!.name} />
    </ToolLayout>
  )
}
