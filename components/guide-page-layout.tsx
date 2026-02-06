import React from 'react'
import Link from 'next/link'
import { Faq } from "@/components/Faq"
import { FaqItem } from "@/lib/faq"

export interface GuidePageLayoutProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  breadcrumbs: { label: string; href?: string }[]
  heroExtra?: React.ReactNode // For the side card (Instagram) or null
  children: React.ReactNode
  faqItems?: FaqItem[]
  variant?: 'split' | 'centered' // Split for Instagram, Centered for Websites
  publishedDate?: string
  author?: string
  schemaTitle?: string
  schemaDescription?: string
}

export function GuidePageLayout({
  title,
  subtitle,
  breadcrumbs,
  heroExtra,
  children,
  faqItems,
  variant = 'centered',
  publishedDate = "2025-01-01",
  author = "PictureConvert Team",
  schemaTitle,
  schemaDescription
}: GuidePageLayoutProps) {
  const articleTitle = schemaTitle || (typeof title === 'string' ? title : "Guide");
  const articleDescription = schemaDescription || (typeof subtitle === 'string' ? subtitle : "Guide description");

  return (
    <article className="min-h-screen bg-background text-foreground pb-20">
      <div className="container mx-auto px-4 md:px-6 pt-12 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <ol className="flex items-center gap-2 flex-wrap">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <li>/</li>}
                <li>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        {/* Hero Section */}
        {variant === 'split' ? (
          <header className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance leading-[1.15]">
                {title}
              </h1>
              <div className="text-xl text-muted-foreground leading-relaxed text-balance max-w-xl font-light">
                {subtitle}
              </div>
            </div>
            {heroExtra && (
              <div className="relative">
                {heroExtra}
              </div>
            )}
          </header>
        ) : (
          <header className="max-w-4xl mb-16 md:mb-24">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-balance leading-[1.15]">
                {title}
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance max-w-3xl font-light">
                {subtitle}
              </div>
            </div>
            {heroExtra && <div className="mt-12">{heroExtra}</div>}
          </header>
        )}

        <div className="mt-12 h-px w-full bg-gradient-to-r from-border to-transparent mb-16" />

        {/* Main Content */}
        {children}

        {/* FAQ Section */}
        {faqItems && faqItems.length > 0 && (
          <div className="max-w-3xl mx-auto mt-24">
            <Faq items={faqItems} />
          </div>
        )}

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": articleTitle,
              "description": articleDescription,
              "author": {
                "@type": "Organization",
                "name": author,
              },
              "datePublished": publishedDate,
              "dateModified": new Date().toISOString().split('T')[0],
            }),
          }}
        />
      </div>
    </article>
  )
}
