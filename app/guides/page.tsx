import { Metadata } from "next"
import { BookOpen } from "lucide-react"
import { GuideIndexLayout, GuideItem, BreadcrumbItem } from "@/components/guide-index-layout"

export const metadata: Metadata = {
  title: "Guides & Tutorials | PictureConvert",
  description: "Expert guides on image formats, compression, and optimization. Learn how to get the best results for web, print, and social media.",
}

const categories: GuideItem[] = [
  {
    title: "Image Formats",
    description: "Deep dives into JPG, PNG, WebP, SVG, and more. Find the best format for every situation.",
    href: "/guides/image-formats",
    icon: BookOpen,
    meta: "5 Guides"
  }
]

const breadcrumbs: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Guides" },
]

export default function GuidesIndexPage() {
  return (
    <GuideIndexLayout
      title="Guides & Resources"
      description="Everything you need to know about digital imaging. From technical file formats to social media optimization. Browse our collection of expert guides and tutorials."
      breadcrumbs={breadcrumbs}
      items={categories}
    />
  )
}
