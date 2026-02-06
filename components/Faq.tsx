import React from "react"
import { FaqItem } from "@/lib/faq"
import { FaqJsonLd } from "@/components/jsonld/FaqJsonLd"
import { cn } from "@/lib/utils"

interface FaqProps {
  items: FaqItem[]
  title?: string | null
  className?: string
}

export function Faq({ items, title = "Frequently Asked Questions", className }: FaqProps) {
  if (!items || items.length === 0) return null

  return (
    <>
      <FaqJsonLd items={items} />
      <section className={cn("mt-12 space-y-6", className)} aria-labelledby={title ? "faq-heading" : undefined}>
        {title && (
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight">
            {title}
          </h2>
        )}
        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group border rounded-lg bg-card text-card-foreground shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between p-4 font-medium hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group-open:rounded-b-none group-open:bg-muted/50 transition-colors">
                {item.question}
                <span className="ml-2 transition-transform duration-200 group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="p-4 pt-0 text-muted-foreground border-t group-open:border-border/50">
                <p className="leading-7 mt-4">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
