"use client"


import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ToolConfig } from "@/lib/tools-config"
import { cn } from "@/lib/utils"
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
}

interface ToolCardProps {
  tool: ToolConfig
  badges?: { label: string; variant: "default" | "secondary" | "outline" }[]
  index?: number
}

export function ToolCard({ tool, badges = [], index = 0 }: ToolCardProps) {
  const Icon = iconMap[tool.icon as keyof typeof iconMap]
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cardContent = (
    <Link href={`/${tool.slug}`}>
      <motion.div
        whileHover={prefersReducedMotion || !mounted ? {} : { y: -4 }}
        whileTap={prefersReducedMotion || !mounted ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={cn(
          "h-full cursor-pointer group transition-all duration-300",
          "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
          "bg-card"
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <motion.div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    "bg-primary/10 text-primary",
                    "group-hover:bg-primary group-hover:text-primary-foreground",
                    "transition-colors duration-300"
                  )}
                  whileHover={prefersReducedMotion || !mounted ? {} : { rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <CardTitle className="text-base font-semibold leading-tight">
                  {tool.shortName}
                </CardTitle>
              </div>
              {badges.length > 0 && (
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {badges.map((badge) => (
                    <Badge
                      key={badge.label}
                      variant={badge.variant}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm leading-relaxed line-clamp-2">
              {tool.description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )

  if (prefersReducedMotion || !mounted) {
    return <div>{cardContent}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
    >
      {cardContent}
    </motion.div>
  )
}
