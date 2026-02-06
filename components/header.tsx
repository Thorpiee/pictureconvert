"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { SITE_URL } from "@/lib/site-url"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

const navLinks = [
  { href: `${SITE_URL}/tools`, label: "Tools" },
  { href: `${SITE_URL}/guides`, label: "Guides" },
  { href: `${SITE_URL}/#features`, label: "Features" },
  { href: `${SITE_URL}/privacy`, label: "Privacy" },
  { href: `${SITE_URL}/#faq-list`, label: "FAQ" },
  { href: `${SITE_URL}/contact`, label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-background/50 backdrop-blur-md border-b border-transparent"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={SITE_URL} className="flex items-center gap-2.5 group">
            <div
              className="relative flex items-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Logo iconClassName="h-10 w-auto" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button asChild size="sm" className="hidden sm:flex group">
              <Link href={`${SITE_URL}/tools`}>
                Open Tools
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                  suppressHydrationWarning
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <Logo iconClassName="h-9 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 px-4">
                    <Button asChild size="lg" className="w-full">
                      <Link href={`${SITE_URL}/tools`} onClick={() => setMobileMenuOpen(false)}>
                        Open Tools
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
