import Link from "next/link"
import { ImageIcon, Twitter, Github, Mail, Shield } from "lucide-react"

const toolLinks = [
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/png-to-jpg", label: "PNG to JPG" },
  { href: "/webp-to-png", label: "WebP to PNG" },
  { href: "/png-to-webp", label: "PNG to WebP" },
  { href: "/compress-jpg", label: "Compress JPG" },
  { href: "/compress-png", label: "Compress PNG" },
]

const moreTools = [
  { href: "/jpg-to-webp", label: "JPG to WebP" },
  { href: "/heic-to-jpg", label: "HEIC to JPG" },
  { href: "/avif-to-jpg", label: "AVIF to JPG" },
  { href: "/resize-image", label: "Resize Image" },
  { href: "/crop-image", label: "Crop Image" },
  { href: "/remove-exif", label: "Remove EXIF" },
]

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
]

const socialLinks = [
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "GitHub", icon: Github },
  { href: "mailto:hello@pictureconvert.com", label: "Email", icon: Mail },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                <ImageIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">PictureConvert</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Convert, compress, and edit images right in your browser. Fast, free, and private.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              <span>Files never leave your device</span>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
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
                  href="/tools"
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
