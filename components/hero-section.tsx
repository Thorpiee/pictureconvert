"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Upload, Download, CheckCircle2, Sparkles } from "lucide-react"

// Static dropzone component for the hero mock
function HeroMockPanel() {
  return (
    <div className="relative">
      {/* Subtle glow behind the card */}
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />

      <div
        className="relative bg-card border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">JPG to PNG</span>
          <div className="w-12" />
        </div>

        <div className="p-5 space-y-4">
          {/* Dropzone */}
          <div
            className="relative border-2 border-dashed border-primary/30 rounded-xl p-6 bg-primary/5 flex flex-col items-center justify-center"
          >
            <div>
              <Upload className="h-8 w-8 text-primary/60" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Drop image here</p>
          </div>

          {/* Preview mock */}
          <div className="flex gap-3">
            <div className="flex-1 bg-muted rounded-lg h-16 flex items-center px-3 gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">photo.jpg</p>
                <p className="text-xs text-muted-foreground">2.4 MB</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Converting...</span>
              <span className="text-primary font-medium">75%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          {/* Action button */}
          <Button className="w-full" disabled>
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </Button>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div>
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                <Shield className="mr-1.5 h-3 w-3" />
                Private by design
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Image Converter{" "}
              <span className="text-primary">&</span>{" "}
              Compressor
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              Convert, compress, and edit images — right in your browser.
              Fast, free, and completely private. Files never leave your device.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base shadow-lg shadow-primary/25 group">
                <Link href="/tools">
                  Choose a Tool
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link href="#how-it-works">
                  How It Works
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No upload needed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No signup required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Works offline
              </span>
            </div>
          </div>

          {/* Right panel - Product mock */}
          <div className="hidden lg:block">
            <HeroMockPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
