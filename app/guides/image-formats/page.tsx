import { Metadata } from "next"
import { FileImage, Instagram, Mail, Printer, PenTool } from "lucide-react"
import { GuideIndexLayout, GuideItem, BreadcrumbItem } from "@/components/guide-index-layout"

export const metadata: Metadata = {
  title: "Best Image Formats Guide | Web, Social, Print & Email",
  description: "Complete guide to the best image formats for every use case. Learn when to use JPG, PNG, WebP, AVIF, or SVG for websites, Instagram, email, and printing.",
}

const guides: GuideItem[] = [
  {
    title: "Best Image Format for Websites",
    description: "Boost your Core Web Vitals with the right next-gen formats. Compare WebP, AVIF, PNG, and JPG for speed and quality.",
    href: "/guides/image-formats/best-image-format-for-websites",
    icon: FileImage,
  },
  {
    title: "Best Image Format for Instagram",
    description: "Stop your photos from getting blurry. Learn the exact resolutions, aspect ratios, and export settings for Instagram.",
    href: "/guides/image-formats/best-image-format-for-instagram",
    icon: Instagram,
  },
  {
    title: "Best Image Format for Email",
    description: "Ensure your images load in Gmail, Outlook, and Apple Mail. Master file sizes and formats for email marketing.",
    href: "/guides/image-formats/best-image-format-for-email",
    icon: Mail,
  },
  {
    title: "Best Image Format for Printing",
    description: "Don't print pixelated images. Understand DPI, CMYK vs RGB, and why TIFF and PDF are the pro standards.",
    href: "/guides/image-formats/best-image-format-for-printing",
    icon: Printer,
  },
  {
    title: "Best Image Format for Logos",
    description: "Vector vs Raster explained. Why SVG is king for responsive logos and when to use PNG for fallbacks.",
    href: "/guides/image-formats/best-image-format-for-logos",
    icon: PenTool,
  },
]

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Image Formats" },
]

export default function ImageFormatsIndexPage() {
  return (
    <GuideIndexLayout
      title="Mastering Image Formats"
      description="Choosing the best image format isn't just about quality—it's about performance, compatibility, and user experience. Whether you're building a website, posting to social media, or sending a newsletter, using the wrong format can hurt your results."
      breadcrumbs={breadcrumbs}
      items={guides}
    >
      <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Why Image Formats Matter</h2>
        <div className="grid md:grid-cols-2 gap-8 text-lg text-muted-foreground">
          <p>
            In the digital world, images account for the majority of bandwidth on most websites.
            Choosing the <strong className="text-foreground">best image format</strong> (like WebP or AVIF) can reduce file sizes by up to 80% without visible quality loss,
            dramatically improving page load speeds and SEO rankings.
          </p>
          <p>
            For print and branding, formats like SVG and TIFF ensure your visuals remain crisp at any size.
            Our comprehensive guides break down the technical details into simple, actionable advice for every scenario.
          </p>
        </div>
      </div>
    </GuideIndexLayout>
  )
}
