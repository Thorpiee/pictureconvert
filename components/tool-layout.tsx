"use client"


import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { type ToolConfig, getToolBySlug } from "@/lib/tools-config"
import { trackToolView } from "@/lib/analytics"
import {
  ArrowRightLeft,
  FileImage,
  Minimize2,
  Crop,
  Maximize2,
  ShieldOff,
  Image,
  Code,
  Gauge,
  Share2,
  Layout,
  Layers,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Ratio,
  Maximize,
  Music2,
  ArrowRight,
  Home,
  ChevronRight,
  Shield,
  Zap,
  CheckCircle2,
  Compass,
  Info,
} from "lucide-react"

const iconMap = {
  ArrowRightLeft,
  FileImage,
  Minimize2,
  Crop,
  Maximize2,
  ShieldOff,
  Image,
  Code,
  Gauge,
  Share2,
  Layout,
  Layers,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Ratio,
  Maximize,
  Music2,
  TikTok: Music2,
  Compass,
  Info,
}

interface ToolLayoutProps {
  tool: ToolConfig
  children: React.ReactNode
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const pathname = usePathname()

  useEffect(() => {
    trackToolView(tool.slug, pathname)
  }, [tool.slug, pathname])

  const relatedTools = tool.relatedTools
    .map(slug => getToolBySlug(slug))
    .filter((t): t is ToolConfig => t !== undefined)
    .slice(0, 6)

  const Icon = iconMap[tool.icon as keyof typeof iconMap]


  const breadcrumbContent = (
    <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <li>
        <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
      </li>
      <li><ChevronRight className="h-3.5 w-3.5" /></li>
      <li>
        <Link href="/tools" className="hover:text-foreground transition-colors">
          Tools
        </Link>
      </li>
      <li><ChevronRight className="h-3.5 w-3.5" /></li>
      <li className="text-foreground font-medium truncate max-w-[200px]">{tool.shortName}</li>
    </ol>
  )

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pictureconvert.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://pictureconvert.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://pictureconvert.com/${tool.slug}`
      }
    ]
  }

  const headerContent = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex justify-center mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
        {tool.name}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
        {tool.longDescription}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Badge variant="outline" className="gap-1.5">
          <Shield className="h-3 w-3" />
          Private
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          <Zap className="h-3 w-3" />
          Instant
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          <CheckCircle2 className="h-3 w-3" />
          No Signup
        </Badge>
      </div>
    </>
  )

  function TextWithLinks({ text }: { text: string }) {
    if (!text) return null

    // Split by markdown link pattern [text](url)
    const parts = text.split(/(\[[^\]]+\]\(\/[^)]+\))/g)

    return (
      <>
        {parts.map((part, index) => {
          const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
          if (match) {
            return (
              <Link
                key={index}
                href={match[2]}
                className="text-primary hover:underline font-medium"
              >
                {match[1]}
              </Link>
            )
          }
          return part
        })}
      </>
    )
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="max-w-4xl mx-auto mb-6" aria-label="Breadcrumb">
          {breadcrumbContent}
        </nav>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          {headerContent}
        </div>

        {/* Main Tool Area */}
        <div className="max-w-4xl mx-auto">
          {children}
        </div>

        {/* SEO Content */}
        <div className="max-w-3xl mx-auto mt-12 space-y-12">
          {/* What It Does */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What This Tool Does</h2>
            <p className="text-muted-foreground leading-relaxed">
              <TextWithLinks text={tool.whatItDoes} />
            </p>
          </section>

          {/* When To Use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">When To Use It</h2>
            <p className="text-muted-foreground leading-relaxed">
              <TextWithLinks text={tool.whenToUse} />
            </p>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips for Best Results</h2>
            <ul className="space-y-3">
              {tool.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {tool.faq.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        {/* Related Tools */}
        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTools.map((relatedTool) => {
              const RelatedIcon = iconMap[relatedTool.icon as keyof typeof iconMap]
              return (
                <div key={relatedTool.slug}>
                  <Link href={`/${relatedTool.slug}`}>
                    <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            <RelatedIcon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-base font-semibold flex items-center gap-2">
                            {relatedTool.name}
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm leading-relaxed">
                          {relatedTool.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {/* Schema.org Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": tool.name,
            "description": tool.description,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  )
}
