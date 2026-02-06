import Link from "next/link"
import { LucideIcon, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SITE_URL } from "@/lib/site-url"

export interface GuideItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
  meta?: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface GuideIndexLayoutProps {
  title: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  items: GuideItem[]
  children?: React.ReactNode
}

export function GuideIndexLayout({
  title,
  description,
  breadcrumbs,
  items,
  children
}: GuideIndexLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      {/* 1. Hero Section */}
      <nav className="mb-8 md:mb-12 text-sm text-muted-foreground">
        <ol className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-muted-foreground/50">/</span>}
              {crumb.href ? (
                <Link href={`${SITE_URL}${crumb.href}`} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <header className="max-w-4xl mb-16 md:mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-balance leading-[1.15]">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-balance max-w-3xl font-light">
          {description}
        </p>
        <div className="mt-12 h-px w-full bg-gradient-to-r from-border to-transparent" />
      </header>

      {/* 2. Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <Link key={item.href} href={`${SITE_URL}${item.href}`} className="group h-full block">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 bg-card">
              <CardHeader>
                <div className="mb-6 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <item.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  {item.title}
                  <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base md:text-lg leading-relaxed mb-4 text-muted-foreground/90">
                  {item.description}
                </CardDescription>
                {item.meta && (
                  <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                    {item.meta}
                  </span>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Optional Extra Content */}
      {children && (
        <>
          <Separator className="my-20 md:my-24" />
          <section className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            {children}
          </section>
        </>
      )}
    </div>
  )
}
