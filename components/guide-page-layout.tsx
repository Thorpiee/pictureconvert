import React from 'react'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface GuidePageLayoutProps {
  title: React.ReactNode
  subtitle: React.ReactNode
  breadcrumbs: { label: string; href?: string }[]
  heroExtra?: React.ReactNode // For the side card (Instagram) or null
  children: React.ReactNode
  faqs?: { question: string; answer: string }[]
  variant?: 'split' | 'centered' // Split for Instagram, Centered for Websites
}

export function GuidePageLayout({
  title,
  subtitle,
  breadcrumbs,
  heroExtra,
  children,
  faqs,
  variant = 'centered'
}: GuidePageLayoutProps) {
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
        {faqs && faqs.length > 0 && (
          <section className="max-w-3xl mx-auto mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Common questions answered.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-xl px-6 bg-card">
                  <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
        
        {/* JSON-LD Schema */}
        {faqs && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer,
                  },
                })),
              }),
            }}
          />
        )}
      </div>
    </article>
  )
}
