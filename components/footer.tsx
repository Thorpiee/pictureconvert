import Link from "next/link"
import { Shield } from "lucide-react"
import { Logo } from "@/components/logo"
import { SITE_URL } from "@/lib/site-url"

const toolLinks = [
  { href: `${SITE_URL}/jpg-to-png`, label: "JPG to PNG" },
  { href: `${SITE_URL}/png-to-jpg`, label: "PNG to JPG Converter" },
  { href: `${SITE_URL}/webp-to-png`, label: "WebP to PNG" },
  { href: `${SITE_URL}/png-to-webp`, label: "PNG to WebP" },
  { href: `${SITE_URL}/compress-jpg`, label: "Compress JPG" },
  { href: `${SITE_URL}/compress-png`, label: "Compress PNG" },
]

const moreTools = [
  { href: `${SITE_URL}/jpg-to-webp`, label: "JPG to WebP" },
  { href: `${SITE_URL}/heic-to-jpg`, label: "HEIC to JPG" },
  { href: `${SITE_URL}/avif-to-jpg`, label: "AVIF to JPG" },
  { href: `${SITE_URL}/resize-image`, label: "Resize Image" },
  { href: `${SITE_URL}/crop-image`, label: "Crop Image" },
  { href: `${SITE_URL}/remove-exif`, label: "Remove EXIF" },
]

const companyLinks = [
  { href: `${SITE_URL}/about`, label: "About" },
  { href: `${SITE_URL}/guides`, label: "Guides" },
  { href: `${SITE_URL}/privacy`, label: "Privacy Policy" },
  { href: `${SITE_URL}/terms`, label: "Terms of Service" },
  { href: `${SITE_URL}/contact`, label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href={SITE_URL} className="flex items-center gap-2.5 w-fit">
              <div className="relative flex items-center">
                <Logo iconClassName="h-10 w-auto" />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Convert, compress, and edit images right in your browser. Fast, free, and private.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Files never leave your device</span>
            </div>

          </div>

          {/* Convert Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Convert</h3>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Edit & Optimize</h3>
            <ul className="space-y-2.5">
              {moreTools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${SITE_URL}/tools`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  All Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PictureConvert. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right">
              All processing happens locally in your browser. No images are uploaded to any server.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
