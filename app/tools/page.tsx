"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSafeReducedMotion } from "@/components/motion"

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
}

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all")
  const prefersReducedMotion = useSafeReducedMotion()

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
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4">
            <Shield className="mr-1.5 h-3 w-3" />
            100% Browser-Based
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            All Image Tools
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            12 free tools to convert, compress, and edit your images. All processing happens in your browser - files never leave your device.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
            >
              All Tools
            </Button>
            {toolCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          {filteredTools.length > 0 ? (
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredTools.map((tool, index) => {
                const Icon = iconMap[tool.icon as keyof typeof iconMap]
                return (
                  <motion.div
                    key={tool.slug}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
                  >
                    <Link href={`/${tool.slug}`}>
                      <motion.div
                        whileHover={prefersReducedMotion ? {} : { y: -4 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                          <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div>
                                <CardTitle className="text-base font-semibold">{tool.shortName}</CardTitle>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 mt-1 capitalize">
                                  {tool.category}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-sm leading-relaxed line-clamp-2">
                              {tool.description}
                            </CardDescription>
                            <div className="mt-3 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Use tool <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-muted-foreground text-lg">No tools found matching your search.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Sections */}
        {!searchQuery && activeCategory === "all" && (
          <div className="mt-20 space-y-16 max-w-6xl mx-auto">
            {toolCategories.map((category, catIndex) => {
              const categoryTools = getToolsByCategory(category.id)
              return (
                <motion.section
                  key={category.id}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-1 bg-primary rounded-full" />
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryTools.map((tool, toolIndex) => {
                      const Icon = iconMap[tool.icon as keyof typeof iconMap]
                      return (
                        <motion.div
                          key={tool.slug}
                          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: toolIndex * 0.05, duration: 0.3 }}
                        >
                          <Link href={`/${tool.slug}`}>
                            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                              <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  <CardTitle className="text-base font-semibold">{tool.shortName}</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <CardDescription className="text-sm leading-relaxed">
                                  {tool.description}
                                </CardDescription>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.section>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
