"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { getAllTools, toolCategories, getToolsByCategory, type ToolCategory } from "@/lib/tools-config"
import {
  Search, X, Shield, ArrowRight, ArrowRightLeft, FileImage, Minimize2, Crop, Maximize2,
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

export function ToolsPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all")

  const allTools = getAllTools()

  const filteredTools = useMemo(() => {
    let tools = activeCategory === "all"
      ? allTools
      : getToolsByCategory(activeCategory)

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      tools = tools.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.shortName.toLowerCase().includes(query)
      )
    }

    return tools
  }, [allTools, activeCategory, searchQuery])

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <div
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Shield className="mr-1.5 h-3 w-3" />
            100% Browser-Based
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            All Image Tools
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {allTools.length} free tools to convert, compress, and edit your images. All processing happens in your browser - files never leave your device.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                className="pl-9 bg-background/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                onClick={() => setActiveCategory("all")}
                className="whitespace-nowrap"
              >
                All
              </Button>
              {toolCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 max-w-[1600px] mx-auto"
        >
          {filteredTools.map((tool) => (
            <div
              key={tool.slug}
            >
              <Link href={`/${tool.slug}`}>
                <Card className="h-full hover:bg-accent/50 transition-colors border-border/50 bg-background/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                        {iconMap[tool.icon as keyof typeof iconMap] && React.createElement(iconMap[tool.icon as keyof typeof iconMap], { className: "h-6 w-6" })}
                      </div>
                      {tool.category === "privacy" && (
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5">Privacy</Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold leading-none">{tool.name}</h2>
                    <CardDescription className="line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Try Tool <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your search.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div >
  )
}
