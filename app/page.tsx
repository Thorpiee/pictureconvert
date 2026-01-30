import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { getAllTools, type ToolConfig } from "@/lib/tools-config"
import { Shield, Zap, Lock, Upload, Settings, Download, ArrowRight, Smartphone, Globe, Sparkles, CheckCircle2 } from "lucide-react"
import { AdPlaceholder } from "@/components/ad-placeholder"
import { HeroSection } from "@/components/hero-section"
import { ToolCard } from "@/components/tool-card"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  {
    icon: Shield,
    title: "Runs Locally",
    description: "All processing happens in your browser. Your files never leave your device - 100% private."
  },
  {
    icon: Zap,
    title: "Fast Exports",
    description: "No uploading, no server processing. Instant conversions powered by modern browser technology."
  },
  {
    icon: Globe,
    title: "Modern Formats",
    description: "Support for all modern formats including WebP, AVIF, and HEIC from iPhones."
  },
  {
    icon: Smartphone,
    title: "Works on Mobile",
    description: "Fully responsive design. Convert images directly on your phone or tablet."
  }
]

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload Your Image",
    description: "Drag and drop or click to select your image file"
  },
  {
    icon: Settings,
    step: "2",
    title: "Choose Your Settings",
    description: "Select output format, quality, or dimensions"
  },
  {
    icon: Download,
    step: "3",
    title: "Download Result",
    description: "Get your converted image instantly - no waiting"
  }
]

const faqs = [
  {
    question: "Is PictureConvert really free?",
    answer: "Yes, completely free! We don't charge for any conversions or features. The site is supported by non-intrusive advertising."
  },
  {
    question: "Are my images uploaded to your servers?",
    answer: "No, never. All image processing happens entirely in your browser using modern web technologies. Your files never leave your device, ensuring complete privacy."
  },
  {
    question: "What image formats are supported?",
    answer: "We support all common image formats including JPG/JPEG, PNG, WebP, HEIC (from iPhones), and AVIF. You can convert between these formats and compress or edit them."
  },
  {
    question: "Is there a file size limit?",
    answer: "There's no strict limit, but very large files may be slower to process depending on your device's capabilities. For best performance, we recommend images under 50MB."
  },
  {
    question: "Can I convert multiple images at once?",
    answer: "Yes! Use our Bulk Image Compression tool to process up to 30 images at once. For other tools, we focus on single-image precision, but you can process them one after another quickly."
  },
  {
    question: "Why should I use WebP format?",
    answer: "WebP offers superior compression compared to JPG and PNG, resulting in smaller file sizes while maintaining quality. It's ideal for web use and is supported by all modern browsers."
  },
  {
    question: "How does metadata removal work?",
    answer: "Our Remove EXIF tool strips all metadata from your images including GPS location, camera info, and timestamps. This protects your privacy when sharing photos online."
  },
  {
    question: "Is there a desktop app available?",
    answer: "PictureConvert works entirely in your browser - no installation needed. You can use it on any device with a modern web browser."
  }
]

// Helper to determine badges
function getToolBadges(tool: ToolConfig): { label: string; variant: "default" | "secondary" | "outline" }[] {
  const badges: { label: string; variant: "default" | "secondary" | "outline" }[] = []
  const popularTools = ["jpg-to-png", "png-to-jpg", "compress-jpg", "heic-to-jpg", "resize-image", "png-to-ico", "smart-optimizer"]
  const newTools = ["avif-to-jpg", "base64-image-encoder", "webp-to-jpg", "smart-optimizer", "social-media-compressor", "website-optimizer", "bulk-compressor"]
  const fastTools = ["compress-jpg", "compress-png", "resize-image"]

  if (popularTools.includes(tool.slug)) badges.push({ label: "Popular", variant: "default" })
  if (newTools.includes(tool.slug)) badges.push({ label: "New", variant: "secondary" })
  if (fastTools.includes(tool.slug) && !popularTools.includes(tool.slug)) badges.push({ label: "Fast", variant: "outline" })

  return badges
}

export default function HomePage() {
  const tools = getAllTools()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Tools Grid */}
      <AnimatedSection id="tools" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">12 Free Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              Popular Tools
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              Convert, compress, resize, and edit your images with our collection of powerful browser-based tools.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                badges={getToolBadges(tool)}
                index={index}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="bg-transparent group">
              <Link href="/tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Convert images in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                  )}
                  <div className="relative inline-flex">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-lg">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4">Why PictureConvert</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Built for Privacy & Speed
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Unlike other converters, your files never leave your device. Everything runs locally in your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center border bg-card hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-2">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Privacy Callout */}
      <AnimatedSection className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-8 md:p-12 relative">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shrink-0 shadow-xl shadow-primary/25">
                    <Lock className="h-10 w-10" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Private by Design
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Your images are processed entirely in your browser using modern Web APIs.
                      No server uploads, no data collection, no tracking. Your files stay on your device.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        No server uploads
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        EXIF removal available
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Works offline
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* Ad Placeholder */}
      <AdPlaceholder className="my-4" />

      {/* FAQ Section */}
      <AnimatedSection id="faq" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Everything you need to know about PictureConvert
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-base font-medium hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 bg-primary text-primary-foreground shadow-2xl shadow-primary/25">
              <CardContent className="p-8 md:p-12 text-center">
                <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-80" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Start Converting in Seconds
                </h2>
                <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
                  No signup required. Just pick a tool and drop your image. It's that simple.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="text-base shadow-lg group">
                    <Link href="/tools">
                      Browse All Tools
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-base border-primary-foreground/30 hover:bg-primary-foreground/10 bg-transparent text-primary-foreground">
                    <Link href="/about">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
