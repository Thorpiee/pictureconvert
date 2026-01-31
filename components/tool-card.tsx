"use client"


import Link from "next/link"
import { Card, CardHeader } from "@/components/ui/card"
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

interface ToolCardProps {
  tool: ToolConfig
  badges?: { label: string; variant: "default" | "secondary" | "outline" }[]
  index?: number
}

export function ToolCard({ tool, badges = [], index = 0 }: ToolCardProps) {
  const Icon = iconMap[tool.icon as keyof typeof iconMap]

  const cardContent = (
    <Link href={`/${tool.slug}`}>
      <div>
        <Card className={cn(
          "h-full cursor-pointer group transition-all duration-300",
          "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
          "bg-card"
        )}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    "bg-primary/10 text-primary",
                    "group-hover:bg-primary group-hover:text-primary-foreground",
                    "transition-colors duration-300"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
              </div>
            </div>
          </CardHeader>
          <div className="px-6 pb-4">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
              {tool.description}
            </p>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <Badge
                    key={i}
                    variant={badge.variant}
                    className={cn(
                      "text-[10px] px-2 h-5 font-normal",
                      badge.label === "Popular" && "bg-gradient-to-r from-pink-500 to-violet-500 text-white border-0"
                    )}
                  >
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Link>
  )

  return cardContent
}
