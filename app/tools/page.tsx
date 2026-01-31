import { Metadata } from "next"
import { ToolsPageClient } from "./tools-client"

export const metadata: Metadata = {
  title: "All Image Tools | PictureConvert",
  description: "Browse our complete collection of free online image tools. Convert, compress, resize, crop, and edit images in your browser. Secure, fast, and no signup required.",
  alternates: {
    canonical: "https://pictureconvert.com/tools",
  },
  openGraph: {
    title: "All Image Tools | PictureConvert",
    description: "Browse our complete collection of free online image tools. Convert, compress, resize, crop, and edit images in your browser.",
    url: "https://pictureconvert.com/tools",
  },
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
