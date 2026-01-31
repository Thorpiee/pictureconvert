"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Upload, Download, Settings, CheckCircle2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSafeReducedMotion } from "@/components/motion"

// Animated dropzone component for the hero mock
function HeroMockPanel() {
  const prefersReducedMotion = useSafeReducedMotion()

  return (
    <div className="relative">
      {/* Subtle glow behind the card */}
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />

      <motion.div
        className="relative bg-card border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
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
          <motion.div
            className="relative border-2 border-dashed border-primary/30 rounded-xl p-6 bg-primary/5 flex flex-col items-center justify-center"
            animate={prefersReducedMotion ? {} : {
              borderColor: ["hsl(var(--primary) / 0.3)", "hsl(var(--primary) / 0.6)", "hsl(var(--primary) / 0.3)"]
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Upload className="h-8 w-8 text-primary/60" />
            </motion.div>
            <p className="mt-2 text-sm text-muted-foreground">Drop image here</p>
          </motion.div>

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
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Action button */}
          <Button className="w-full" disabled>
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const prefersReducedMotion = useSafeReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR, render without animations to avoid hydration mismatch
  if (!mounted) {
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

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                <Shield className="mr-1.5 h-3 w-3" />
                Private by design
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground text-balance"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Image Converter{" "}
              <span className="text-primary">&</span>{" "}
              Compressor
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl xl:text-2xl text-muted-foreground leading-relaxed text-balance"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Convert, compress, and edit images — right in your browser.
              Fast, free, and completely private. Files never leave your device.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
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
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-muted-foreground"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
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
            </motion.div>
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
